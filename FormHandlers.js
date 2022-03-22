
export default class FormHandlers {
    static submitFormClient() {
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
                    console.log(typeAttr, inputContacts[i].value)
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
        const contactList = document.querySelector('#contact-list');
        inputsForm.forEach((el) => el.value = '');
        contactList.innerHTML = '';
    }
}
