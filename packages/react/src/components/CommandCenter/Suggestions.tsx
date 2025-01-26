import { memo } from 'react';
import styles from './styles.module.css';
import { Suggestion } from '@/constants/commandTypes';

type CommandCenterSuggestionsProps = {
  suggestions: Suggestion[];
  onSuggestionClick: (suggestion: Suggestion) => void;
  highlightedSuggestionCommand?: Suggestion;
  setHighlightedSuggestionCommand: (command: Suggestion) => void;
}

export const CommandCenterSuggestions = memo(({ suggestions, onSuggestionClick, highlightedSuggestionCommand, setHighlightedSuggestionCommand }: CommandCenterSuggestionsProps) => {

  return (
    <ul className={styles.commandList} role="listbox" aria-label="Command list">
      {suggestions.map((suggestion) => (
        <li onMouseEnter={() => setHighlightedSuggestionCommand(suggestion)} key={suggestion.command} onClick={() => onSuggestionClick(suggestion)} tabIndex={0} className={highlightedSuggestionCommand === suggestion ? styles.highlighted : ''}>
          {suggestion.label}
        </li>
      ))}
    </ul>
  )
});