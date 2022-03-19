import Helper from './Helper.js';

export default class FormHandlers {
    constructor(client) {
        this.client = client;
    }

    static submitFormClient() {
        const inputName = document.querySelector('#input-name');
        const inputMiddleName = document.querySelector('#input-middleName');
        const inputFamily = document.querySelector('#input-family');
        const inputContacts = document.querySelectorAll('.input-contact');
        const contacts = [];

        for(let i = 0; i < inputContacts.length;i++) {
            const attr = inputContacts[i].attributes;
            if (attr === 'style') {
                continue;
            } else {
                contacts.push({attr:inputContacts[i].value})
            }
        }

        const formData = {
            id: Helper.createIdClient(false),
            fio: inputFamily.value + inputName.value + inputMiddleName.value,
            dateOfCreation: Helper.createDate(),
            dateOfRefactor: 'не редактировалось',
            contacts: contacts,
            btns: 'Изменить-Удалить'
        }
        console.log(formData)
    }
}
