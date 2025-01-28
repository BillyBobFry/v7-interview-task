import { IReactionDisposer, makeAutoObservable, reaction } from "mobx";
import { isEqual } from "lodash";
import { Suggestion } from "@/actions/commandTypes";


export class SuggestionsStore {
    private _suggestions: Suggestion[] = [];
    private _highlightedSuggestion?: Suggestion;
    private _disposers: IReactionDisposer[] = [];

    constructor() {
        makeAutoObservable(this);
    }

    get suggestions() {
        return this._suggestions;
    }

    set suggestions(suggestions: Suggestion[]) {
        this._suggestions = suggestions;
    }

    get highlightedSuggestion() {
        return this._highlightedSuggestion;
    }

    set highlightedSuggestion(suggestion: Suggestion | undefined) {
        this._highlightedSuggestion = suggestion;
    }

    highlightNextSuggestion() {
        if (!this.suggestions.length) return;
        const currentIndex = this.suggestions.findIndex(s => s === this._highlightedSuggestion);
        const nextIndex = (currentIndex + 1) % this.suggestions.length;
        this._highlightedSuggestion = this.suggestions[nextIndex];
    }

    highlightPreviousSuggestion() {
        if (!this.suggestions.length) return;
        const currentIndex = this.suggestions.findIndex(s => s === this._highlightedSuggestion);
        const previousIndex = (currentIndex - 1 + this.suggestions.length) % this.suggestions.length;
        this._highlightedSuggestion = this.suggestions[previousIndex];
    }

    reset() {
        this._highlightedSuggestion = undefined;
        this._suggestions = [];
    }

    init() {
        this._disposers.push(
            reaction(
                () => this._suggestions,
                (newSuggestions, oldSuggestions) => {
                    if (!isEqual(newSuggestions, oldSuggestions)) {
                        this.highlightedSuggestion = newSuggestions?.[0];
                    }
                }
            )
        );
    }


    dispose() {
        this._disposers.forEach((disposer) => disposer());
    }
}