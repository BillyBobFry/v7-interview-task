// packages/react/src/components/CommandCenter.tsx

import React, { useCallback, useEffect, useRef } from 'react';
import styles from './styles.module.css';

type CommandCenterProps = {
  isOpen: boolean;
  onClose: () => void;
  CommandCenterInput: React.ComponentType;
  CommandCenterSuggestions: React.ComponentType;
};

export const CommandCenter: React.FC<CommandCenterProps> = ({ isOpen, onClose, CommandCenterSuggestions, CommandCenterInput }) => {

  if (!isOpen) return null;
  // Should probably use a `dialog` element here instead of div, but would have to add polyfill for it. 
  return (
    <div className={styles.overlay} onClick={onClose} role="dialog" aria-modal="true" aria-labelledby="command-center-title">
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <CommandCenterInput />
        <CommandCenterSuggestions />
      </div>
    </div>
  );
};