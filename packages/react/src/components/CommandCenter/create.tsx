import { observer } from "mobx-react-lite";
import { CommandCenter as CommandCenterComponent } from "./CommandCenter";
import { SuggestionsStore } from "./SuggestionsStore";
import { CommandCenterSuggestions as CommandCenterSuggestionsComponent } from "./Suggestions";
import { useEffect, useRef } from "react";
import { Input } from "./Input";
import { useKeybinding } from "@/hooks/keyboardEventHandler";
import { KEY_BINDINGS } from "@/constants/keybindings";
import { Suggestion } from "@/constants/commandTypes";
import { ProjectContextType, useProjectContext } from "@/contexts/Project/useProjectContext";
import { InputStore } from "./InputStore";
import { CommandCenterStore } from "./CommandCenterStore";


const createCommandCenterInput = ({ suggestionsStore, inputStore, onSuggestionSelect }: {
    suggestionsStore: SuggestionsStore,
    inputStore: InputStore,
    onSuggestionSelect: (suggestion?: Suggestion) => void
}) => {
    const handleInputChange = (value: string) => {
        inputStore.value = value;
    }

    const CommandCenterInput = observer(() => {
        const inputRef = useRef<HTMLInputElement>(null);

        useKeybinding({
            action: () => {
                onSuggestionSelect(suggestionsStore.highlightedSuggestion);
            },
            keys: KEY_BINDINGS.ENTER,
            element: inputRef
        });

        useKeybinding({
            action: () => suggestionsStore.highlightNextSuggestion(),
            keys: KEY_BINDINGS.ARROW_DOWN,
            element: inputRef
        });

        useKeybinding({
            action: () => suggestionsStore.highlightPreviousSuggestion(),
            keys: KEY_BINDINGS.ARROW_UP,
            element: inputRef
        });

        return <Input
            ref={inputRef}
            value={inputStore.value}
            onChange={handleInputChange}
            placeholder={inputStore.placeholder}
            label={inputStore.label}
        />;
    });

    return CommandCenterInput;
}

const createCommandCenterSuggestions = ({ suggestionsStore, onSuggestionSelect }: {
    suggestionsStore: SuggestionsStore,
    onSuggestionSelect: (suggestion: Suggestion) => void
}) => {
    const setHighlightedSuggestionCommand = (command: Suggestion) => {
        suggestionsStore.highlightedSuggestion = command;
    }

    const CommandCenterSuggestions = observer(() => {
        useEffect(() => {
            suggestionsStore.init();
            return () => {
                suggestionsStore.dispose();
            };
        }, []);

        if (!suggestionsStore.suggestions?.length) return null;

        return <CommandCenterSuggestionsComponent
            setHighlightedSuggestionCommand={setHighlightedSuggestionCommand}
            suggestions={suggestionsStore.suggestions}
            onSuggestionClick={onSuggestionSelect}
            highlightedSuggestionCommand={suggestionsStore.highlightedSuggestion}
        />;
    });

    return CommandCenterSuggestions;
}

export type CommandCenterProps = {
    fetchSuggestions: (input: string, projectContext?: ProjectContextType) => Promise<Suggestion[]>;
}

export const createCommandCenter = ({
    fetchSuggestions,
}: CommandCenterProps) => {
    const inputStore = new InputStore();
    const suggestionsStore = new SuggestionsStore();
    const commandCenterStore = new CommandCenterStore(
        inputStore,
        suggestionsStore,
        fetchSuggestions
    );

    const onSuggestionSelect = (suggestion?: Suggestion) => {
        if (!suggestion) return;
        commandCenterStore.handleSuggestion(suggestion);
    }

    const handleClose = () => {
        commandCenterStore.isOpen = false;
    }

    const CommandCenterSuggestions = createCommandCenterSuggestions({ suggestionsStore, onSuggestionSelect });

    const CommandCenterInput = createCommandCenterInput({ suggestionsStore, inputStore, onSuggestionSelect });

    const CommandCenter = observer(() => {
        useEffect(() => {
            commandCenterStore.init();
            return () => {
                commandCenterStore.dispose();
            };
        }, []);

        // Syncing between react context and mobx store. 
        // Wouldn't be needed if we used a global store for the project context data. 
        const projectContext = useProjectContext();
        useEffect(() => {
            commandCenterStore.syncProjectContext(projectContext);
        }, [projectContext]);

        return <CommandCenterComponent
            isOpen={commandCenterStore.isOpen}
            onClose={handleClose}
            CommandCenterSuggestions={CommandCenterSuggestions}
            CommandCenterInput={CommandCenterInput}
        />
    });

    return {
        toggleCommandCenter: () => commandCenterStore.isOpen = !commandCenterStore.isOpen,
        closeCommandCenter: handleClose,
        CommandCenter,
    };
}


