import Validation from './Validation.js';
import Fetch from './Fetch.js';

export default class FormHandlers {
    static submitFormClient() {
        Validation.clientForm();
        const inputName = document.querySelector('#input-name');
        const inputMiddleName = document.querySelector('#input-middleName');
        const inputFamily = document.querySelector('#input-family');
        const inputContacts = document.querySelectorAll('.input-contact');
        const contacts = [];

        for(let i = 0; i < inputContacts.length;i++) {
            const attr = inputContacts[i].attributes;
            for(let k = 0; k < attr.length; k++) {
                if (attr[k].name === 'style' || attr[k].name === 'class') {
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
        input.addEventListener('input', function () {
            if(timer) {
                clearTimeout(timer);
            }
            timer = setTimeout(async () => {
                const tableBody = document.querySelector('#table-body');
                const tableRow = tableBody.querySelectorAll('tr');
                if (!this.value) {
                    tableRow.forEach((el) => {
                        el.style.display = 'table-row';
                    })
                    return;
                }
                const clientData = await Fetch.searchClients(this.value);
                if (clientData.length) {
                    tableRow.forEach((row) => {
                        const idCell = row.firstChild.firstChild.textContent;
                        clientData.forEach((clientId, i) => {
                            if (idCell === clientData[i].id) {
                                row.style.display = 'table-row';
                                console.log(row)
                            } else {
                                row.style.display = 'none';
                            }
                        })
                        console.log(clientData)
                    })
                } else {
                    tableRow.forEach((el) => {
                        el.style.display = 'table-row';
                    })
                }
            },500);
        })
    }
}
