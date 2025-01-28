import { isMac } from '../utils/os';

export const KEY_BINDINGS = {
    'COMMAND_CENTER': isMac() ? ['Cmd', 'k'] : ['Ctrl', 'k'],
    'ESCAPE': ['Escape'],
    'ARROW_UP': ['ArrowUp'],
    'ARROW_DOWN': ['ArrowDown'],
    'ENTER': ['Enter'],
    'TAB': ['Tab'],
    'SHIFT_TAB': ['Shift', 'Tab'],
    'BACKSPACE': ['Backspace'],
};