
export default class Helper {

    static parseDate(ell) {
        const date = new Date(ell)
        const day = `${(date.getDate() + 1) < 10 ? '0' +(date.getDate() + 1) : (date.getDate() + 1)}`;
        const month = `${(date.getMonth() + 1) < 10 ? '0' +(date.getMonth() + 1) : (date.getMonth() + 1)}`;
        const year = date.getFullYear();
        const hours = `${date.getHours() < 10 ? '0' + date.getHours() : date.getHours()}`;
        const minutes =`${(date.getMinutes() + 1) < 10 ? '0' +(date.getMinutes() + 1) : (date.getMinutes() + 1)}`;
        const time = hours + '.' + minutes;
        const parseDate = day + '.' + month + '.' + year + '-' + time;
        return parseDate;
    }

    static parseResponseClientList(responseClients) {
        const clients = [];
        responseClients.forEach((ell) => {
            const client = {
                id: ell.id,
                fio: `${ell.surname + ' ' + ell.name + ' ' + ell.lastName}` ,
                createdAt: Helper.parseDate(ell.createdAt),
                updatedAt: Helper.parseDate(ell.updatedAt),
                contacts : ell.contacts

            }
            clients.push(client);
        })
        return clients;
    }

    static parseAttributeInput(btn) {
        switch (btn.textContent) {
            case 'Телефон': {
                return 'phone';
            }
            case 'Доп. телефон': {
                return 'addphone';
            }
            case 'Email': {
                return 'email';
            }
            case 'Vk': {
                return 'vk';
            }
            case 'Facebook': {
                return 'facebook';
            }
            default : return 'subtract';
        }
    }

    static parseForBtnText(type) {
        switch (type) {
            case 'phone': {
                return 'Телефон';
            }
            case 'addphone': {
                return 'Доп. телефон';
            }
            case 'email': {
                return 'Email';
            }
            case 'vk': {
                return ' Vk';
            }
            case 'facebook': {
                return ' Facebook';
            }
            default : return 'subtract';
        }
    }

    static checkLimitContacts() {
        const btnAddContact = document.querySelector('#btn-wrap-contacts');
        const contactsWrapper = document.querySelector('#contacts-list');
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
            },100)
        }
    }

    static titlePlugPage() {
        const title = document.createElement('h2');
        const table = document.querySelector('#table-client');
        const tableBody = document.querySelector('#table-body');
        const app =document.querySelector('#app');
        title.id = 'title-plug';
        title.classList.add('text-center', 'mb-5');
        title.textContent = 'Сдесь пока ничего нет';
        if (tableBody.children.length === 0) {
            table.insertAdjacentElement('beforebegin', title)
        } else if (app.querySelector('#title-plug')) {
            app.querySelector('#title-plug').remove();
        }
    }

    static arrowSortControl() {
        const thArr = document.querySelectorAll('th');
        thArr.forEach((th) => {
            if (th.querySelector('#arrow-sort')) {
                th.querySelector('#arrow-sort').style.transform = 'rotate(0deg)';
            }
            if (th.firstElementChild.classList.contains('sorted')) {
                th.querySelector('#arrow-sort').style.transform = 'rotate(180deg)';
            }
        })
    }

}
