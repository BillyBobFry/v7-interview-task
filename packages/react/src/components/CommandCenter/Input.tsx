import { useCallback, useEffect, useState, forwardRef } from 'react';
import styles from './styles.module.css';

type InputProps = {
    value: string;
    onChange: (value: string) => void;
    placeholder: string;
    label: string;
};

export const Input = forwardRef<HTMLInputElement, InputProps>(function Input({
    value,
    onChange,
    placeholder,
    label
}, ref) {
    const [isInputFocused, setIsInputFocused] = useState(false);

    const handleInputFocus = useCallback(() => setIsInputFocused(true), []);
    const handleInputBlur = useCallback(() => setIsInputFocused(false), []);
    const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => onChange(e.target.value), []);

    useEffect(() => {
        if (ref && 'current' in ref) {
            ref.current?.focus();
        }
    }, [placeholder]); // Re-focus when placeholder changes (new step)

    return <div className={`${styles.inputContainer} ${isInputFocused ? styles.focused : ''}`}>
        <input
            name={label.toLowerCase()}
            type="text"
            value={value}
            onChange={handleInputChange}
            placeholder={placeholder}
            className={styles.input}
            aria-label={label}
            ref={ref}
            onFocus={handleInputFocus}
            onBlur={handleInputBlur}
        />
        <div className={styles.subtextContainer}>
            <span className={styles.subtext}>
                Press&nbsp;
                <span className={styles.keyboardKey}>enter</span>
                &nbsp;to continue,&nbsp;
                <span className={styles.keyboardKey}>esc</span>
                &nbsp;to close
            </span>
        </div>
    </div>
});
