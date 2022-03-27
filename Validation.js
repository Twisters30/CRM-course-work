import UiEffects from './Ui-effects.js';

export default class Validation {
    static clientForm() {
        const inputs = document.querySelector('#form-client').querySelectorAll('input');
        inputs.forEach((el) => {
            if (el.value === '' && el.id !== 'input-middleName') {
                UiEffects.highlightInput(el);
                return null;
            };
        })
    }
}
