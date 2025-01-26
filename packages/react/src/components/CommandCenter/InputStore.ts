import { makeAutoObservable } from "mobx";


const DEFAULT_INPUT = {
    placeholder: 'What would you like to do?',
    label: 'Command',
    value: ''
};

export class InputStore {
    private _value: string = '';
    private _placeholder: string = '';
    private _label: string = '';

    constructor() {
        makeAutoObservable(this);
    }

    get value() {
        return this._value;
    }

    get placeholder() {
        return this._placeholder;
    }

    get label() {
        return this._label;
    }

    set value(value: string) {
        this._value = value;
    }

    reset() {
        this._value = DEFAULT_INPUT.value;
        this._placeholder = DEFAULT_INPUT.placeholder;
        this._label = DEFAULT_INPUT.label;
    }
}