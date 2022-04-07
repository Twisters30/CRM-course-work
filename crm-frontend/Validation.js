import UiEffects from './Ui-effects.js';
import Helper from './Helper.js';

export default class Validation {
    static checkForm() {
        const inputs = document.querySelector('#form-client').querySelectorAll('input');
        const validationContainer = document.querySelector('.validation');
        let arrError = [];
        inputs.forEach((el) => {
            const resultCheckFio = Validation.checkValueFio(el);
            if (resultCheckFio) arrError.push(resultCheckFio);
        })
        const resultCheckContacts = Validation.checkContactsInput();
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

    static checkValueFio(el) {
        if (!el.getAttribute('data')) return null;
        const validationContainer = document.querySelector('.validation');
        if (el.value === '' && el.id !== 'input-middleName') {
            validationContainer.textContent = `заполните ${el.parentElement.textContent.split('*')[0]}`;
            return el;
        }
        if (el.value.search(/\d/) !== -1 && el.id === 'input-family') {
            validationContainer.textContent =  `${el.parentElement.textContent.split('*')[0]} не должна содержать цифры`;
            return el
        } else if (el.value.search(/\d/) !== -1 &&  el.id === 'input-name') {
            validationContainer.textContent = `${el.parentElement.textContent.split('*')[0]} не должно содержать цифры`;
            return el
        }
        if (el.value.length > 20) {
            validationContainer.textContent = `${el.parentElement.textContent.split('*')[0]} превышает кол-во символов (20)`;
            return false
        }
        if (!el.value.includes('@') && el.dataset === 'email') {
            return el
        }
        return null;
    }

    static checkContactsInput() {
        const contactsInputs = document.querySelector('#contacts-list').querySelectorAll("input");
        contactsInputs.forEach((el) => {
            console.log(el.value)
            if (el.dataset.email) {
                console.log(el.dataset)
            } else if (el.dataset.phone) {
                // this.phoneMask(el)
                console.log(el.dataset)
            }
        })
        // if (!el.getAttribute('data')) return null;
        // const validationContainer = document.querySelector('.validation');
        // if (el.getAttribute('data') === 'email') {
        //
        // }
    }

    static phoneMask(input) {
        input.addEventListener('focus', this.maskOutput)
        input.addEventListener('input', this.maskInput)

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
    static maskOutput() {
        if ((this.value.length - 7) < 11) {
            this.value = '';
        }
    }
}
