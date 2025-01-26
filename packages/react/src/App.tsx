import "./assets/main.css";
import { KEY_BINDINGS } from "./constants/keybindings";
import { useKeybinding } from "./hooks/keyboardEventHandler";
import React, { memo } from "react";
import { createCommandCenter } from "./components/CommandCenter";
import { AppRoutes, type AppRoutesProps } from "./routes";
import { defaultSuggestions, InputAction, Suggestion } from "./constants/commandTypes";
import { ProjectContextType } from "./contexts/Project/useProjectContext";

const AppComponent = React.memo(function AppComponent({
  AppRoutes,
  CommandCenter
}: {
  AppRoutes: React.ComponentType<AppRoutesProps>,
  CommandCenter: React.ComponentType
}) {
  return (
    <>
      <AppRoutes CommandCenter={CommandCenter} />
    </>
  );
});

export const createApp = () => {

  const fetchSuggestions = async (input: string, projectContext?: ProjectContextType): Promise<Suggestion[]> => {
    if (!projectContext) return [];

    /**
     * We should add keywords and descriptions to each action
     * Then we can use NLP here to find best matches
     */

    if (!input.trim()) {
      return defaultSuggestions.filter(suggestion =>
        suggestion.shouldShow(projectContext)
      );
    }

    return defaultSuggestions.filter(suggestion =>
      suggestion.shouldShow(projectContext) &&
      suggestion.label.toLowerCase().includes(input.toLowerCase())
    );
  };

  const { CommandCenter, toggleCommandCenter, closeCommandCenter } = createCommandCenter({
    fetchSuggestions,
  });

  return memo(() => {
    useKeybinding({ action: toggleCommandCenter, keys: KEY_BINDINGS.COMMAND_CENTER, element: document.body });

    /* 
      NOTE: This would catch the escape keypress and prevent default on it in all cases, even when the command center isn't open. Don't think it is an issue for us for now, but something to be mindful of. 
    */
    useKeybinding({ action: closeCommandCenter, keys: KEY_BINDINGS.ESCAPE, element: document.body });

    return (
      <AppComponent AppRoutes={AppRoutes} CommandCenter={CommandCenter} />
    );
  });
} 