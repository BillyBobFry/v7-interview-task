import { IReactionDisposer, makeAutoObservable, reaction } from "mobx";
import { InputStore } from "./InputStore";
import { SuggestionsStore } from "./SuggestionsStore";
import { Suggestion } from "@/actions/commandTypes";
import { ProjectContextType } from "@/contexts/Project/useProjectContext";
import { debounce } from "lodash";


export class CommandCenterStore {
  private _isOpen: boolean = false;
  private _disposers: IReactionDisposer[] = [];
  private _projectContext?: ProjectContextType;
  private _onInputChange: () => void;

  constructor(
    private readonly _inputStore: InputStore,
    private readonly _suggestionsStore: SuggestionsStore,
    private readonly _fetchSuggestions: (input: string, projectContext?: ProjectContextType) => Promise<Suggestion[]>
  ) {
    makeAutoObservable(this);
    this._onInputChange = debounce(this._fetchAndUpdateSuggestions, 200);
  }

  private readonly _fetchAndUpdateSuggestions = async () => {
    if (!this._projectContext) return;
    const suggestions = await this._fetchSuggestions(
      this._inputStore.value,
      this._projectContext
    );
    this._suggestionsStore.suggestions = suggestions;
  }

  handleSuggestion(suggestion: Suggestion) {
    if (!this._projectContext) return;
    suggestion.onSubmit(this._projectContext);
    this.isOpen = false;
  }

  syncProjectContext(projectContext: ProjectContextType) {
    this._projectContext = projectContext;
  }

  get projectContext() {
    return this._projectContext;
  }

  init() {
    this._disposers.push(
      reaction(
        () => this._inputStore.value,
        () => {
          this._onInputChange();
        }
      )
    );

    this._disposers.push(
      reaction(
        () => this._isOpen,
        (isOpen) => {
          if (isOpen && this._projectContext) {
            this._onInputChange();
          } else {
            this.reset();
          }
        }
      )
    );
  }

  get isOpen() {
    return this._isOpen;
  }

  set isOpen(value: boolean) {
    this._isOpen = value;
  }

  reset() {
    this._inputStore.reset();
    this._suggestionsStore.reset();
  }

  dispose() {
    this._disposers.forEach(disposer => disposer());
  }
}   