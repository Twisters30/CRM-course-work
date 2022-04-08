import UiEffects from './Ui-effects.js';
import Helper from './Helper.js';

export default class Validation {
    static checkForm() {
        const validationContainer = document.querySelector('.validation');
        let arrError = [];
        const resultCheckFio = Validation.checkValueFio();
        const resultCheckContacts = Validation.checkContactsInput();
        arrError = [...resultCheckFio, ...resultCheckContacts];
        if (arrError.length) {
            arrError.forEach((el) => UiEffects.highlightInput(el));
            return false;
        } else {
            validationContainer.textContent = '';
            return true;
        }
    }
    static createNotice() {
        const validation = Helper.createElement({
            element: 'span',
            classList: ['validation']
        })
        return validation;
    }

    static checkValueFio() {
        const inputs = document.querySelector('#form-client').querySelectorAll('input');
        let contactInputs = [];
            inputs.forEach((el) => {
                if (!el.classList.contains('input-contact')) {
                    contactInputs.push(el)
                }
        })
        const error = [];
        contactInputs.forEach((el) => {
            const validationContainer = document.querySelector('.validation');
            if (el.value === '' && el.id !== 'input-middleName') {
                validationContainer.textContent = `заполните поле имя`;
                error.push(el);
            }
            if (el.value.search(/\d/) !== -1 && el.id === 'input-family') {
                validationContainer.textContent =  `фамилия не должна содержать цифры`;
                error.push(el);
            }
            if (el.value.search(/\d/) !== -1 &&  el.id === 'input-name') {
                validationContainer.textContent = `отчество не должно содержать цифры`;
                error.push(el);
            }
            if (el.value.length > 20) {
                validationContainer.textContent = `${el.parentElement.textContent.split('*')[0].toLowerCase()} превышает кол-во символов (20)`;
                error.push(el);
            }
        })
        return error;
    }

    static checkContactsInput() {
        const contactsInputs = document.querySelector('#contacts-list').querySelectorAll("input");
        const validationContainer = document.querySelector('.validation');
        const error = [];
        contactsInputs.forEach((el) => {
            if (el.dataset.email) {
                const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!el.value.match(pattern)) {
                    error.push(el);
                    validationContainer.textContent = `ошибка email`;
                }
            }
            if (el.dataset.phone || el.dataset.addphone) {
                if (el.value.length < 18) {
                    console.log('err', el)
                    validationContainer.textContent = `короткий номер`;
                    error.push(el);
                }
            }
        })
        return error;
    }

    static phoneMask(input, isRemove) {
        if (isRemove) {
            input.removeEventListener('input', this.maskInput)
        } else {
            input.addEventListener('input', this.maskInput)
        }
    }
    static maskInput() {
        let literalPattern = /[0\*]/;
        let numberPattern = /[0-9]/;
        let newValue = '';
        let valueIndex = 0;
        let maskIndex = 0;
        while (maskIndex < this.dataset.mask.length) {
            if (maskIndex >= this.value.length) {
                break;
            }
            if (this.dataset.mask[maskIndex] === '0' && this.value[valueIndex].match(numberPattern) === null) {
                break;
            }
            while (this.dataset.mask[maskIndex].match(literalPattern) === null) {
                if (this.value[valueIndex] === this.dataset.mask[maskIndex]) {
                    break;
                }
                newValue += this.dataset.mask[maskIndex++];
            }
            newValue += this.value[valueIndex++];
            maskIndex++;
        }

        this.value = newValue;
    }
}
