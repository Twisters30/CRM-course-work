export default class Helper {
    static parseAttributeInput(btn) {
        switch (btn.textContent) {
            case 'Телефон': {
                return 'phone';
                break;
            }
            case 'Доп. телефон': {
                return 'addPhone';
                break;
            }
            case 'Email': {
                return 'email';
                break;
            }
            case 'Vk': {
                return 'vk';
                break;
            }
            case 'Facebook': {
                return 'facebook';
                break;
            }
            default : return 'subtract';
        }
    }

    static createIdClient(idContainer) {
        if (idContainer) {
            return
        } else {
            return new Date().valueOf();
        }
    }

    static createDate() {
        const date = new Date();
        const day = `${date.getDate() < 10 ?  '0' + date.getDate() :date.getDate()}`;
        const month = `${(date.getMonth() + 1) < 10 ? '0' + (date.getMonth() + 1) : (date.getMonth() + 1)}`;
        const year = date.getFullYear();
        const time = date.getHours() + '.' + date.getMinutes();
        const dateOfCreation = `${day + '.' + month + '.' + year + '-' + time}`
        return dateOfCreation;
    }


    static checkLimitContacts(btnAddContact, contactsWrapper) {
        let i = contactsWrapper.children.length;
        if (i >= 10) {
            btnAddContact.style.opacity = '0';
            setTimeout(() => {
                btnAddContact.classList.add('d-none');
                btnAddContact.classList.remove('d-flex');
            },300)

        } else if (i < 10) {
            btnAddContact.classList.add('d-flex');
            btnAddContact.classList.remove('d-none');
            setTimeout(() => {
                btnAddContact.style.opacity = '1';
            },300)
        }
    }
}
