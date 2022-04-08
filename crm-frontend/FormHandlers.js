import Validation from './Validation.js';
import Fetch from './Fetch.js';
import TableController from './conrollers/TableController.js';

export default class FormHandlers {
    static submitFormClient() {
        if (!Validation.checkForm()) {
            return null
        }
        const inputName = document.querySelector('#input-name');
        const inputMiddleName = document.querySelector('#input-middleName');
        const inputFamily = document.querySelector('#input-family');
        const inputContacts = document.querySelectorAll('.input-contact');
        const contacts = [];

        for(let i = 0; i < inputContacts.length;i++) {
            const attr = inputContacts[i].attributes;
            for(let k = 0; k < attr.length; k++) {
                if (attr[k].name === 'style' || attr[k].name === 'class' || attr[k].name === 'data-mask'|| attr[k].name === 'placeholder') {
                    continue;
                } else {
                    const typeAttr = attr[k].name.split('-')[1];
                    contacts.push({ type: typeAttr, value: inputContacts[i].value })
                }
            }
        }

        const formData = {
            name: inputName.value,
            surname: inputFamily.value,
            lastName: inputMiddleName.value,
            contacts: contacts
        }
        return formData;
    }

    static clearForm() {
        const formCreateClient = document.querySelector('#form-client');
        const inputsForm = formCreateClient.querySelectorAll('input');
        inputsForm.forEach((el) => el.value = '');
    }

    static eventsInputActive(form) {
        const inputs = form.querySelectorAll('input');
        inputs.forEach((el) => {
            el.addEventListener('blur', (e) => {
                const title = e.target.previousSibling;
                if (e.target.value) {
                    title.style.transform = 'translateY(0px)';
                } else {
                    title.style.transform = 'translateY(20px)';
                }
            })
            el.addEventListener('focus', (e) => {
                const title = e.target.previousSibling;
                if (e.target.value && title.style.transform === 'translateY(0px)') {
                    return;
                }
                title.style.transform = 'translateY(0px)';
            })
        })
    }

    static searchClient(input) {
        let timer;
        input.addEventListener('input', async function () {
            clearTimeout(timer);
            timer = setTimeout(async () => {
                if (!this.value) {
                    TableController.refreshTable(await Fetch.getClients(true));
                    return;
                }
                const clients = await Fetch.searchClients(this.value);
                if (clients.length) {
                    TableController.refreshTable(clients,true);
                } else {
                    TableController.refreshTable(await Fetch.getClients(true));
                }
            },500);
        })
    }
}
