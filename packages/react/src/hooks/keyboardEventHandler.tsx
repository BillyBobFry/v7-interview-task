import { useEffect, useMemo } from 'react';

/**
 * Custom Hook to add global keybindings.
 * @param {Object} params - The parameters for the hook.
 * @param {Function} params.callback - The function to execute when the key combo is pressed.
 * @param {string[]} params.keys - An array of keys for the combination (e.g., ['Ctrl', 'k']).
 * @param {HTMLElement|React.RefObject<HTMLElement>} [params.element] - The element to listen for key events on.
 */
export type UseKeybindingParams = {
  action: () => void;
  keys: string[];
  element: HTMLElement | React.RefObject<HTMLElement>;
}


export const useKeybinding = ({ action: callback, keys, element }: UseKeybindingParams) => {
  const allKeysMatch = (event: KeyboardEvent) => {
    return keys.every(key =>
    ((key === 'Ctrl' && event.ctrlKey)
      || (key === 'Cmd' && event.metaKey)
      || (key === 'Shift' && event.shiftKey)
      || (key === 'Alt' && event.altKey)
      || event.key.toLowerCase() === key.toLowerCase())
    );
  };

  const handleKeyDown = (event: KeyboardEvent) => {
    if (allKeysMatch(event)) {
      event.preventDefault();
      callback();
    }
  };

  const target = useMemo(() => {
    if (!element) return document.body;
    if ('current' in element) return element.current;
    return element;
  }, [element, 'current' in element ? (element as React.RefObject<HTMLElement>).current : null]);

  useEffect(() => {
    if (!target) return;
    target.addEventListener('keydown', handleKeyDown);
    return () => {
      target.removeEventListener('keydown', handleKeyDown);
    };
  }, [callback, keys, target]);
};