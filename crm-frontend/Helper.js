
export default class Helper {

    static createElement(options, parent) {
        const element = document.createElement(options.element ? options.element : 'div');
        for(const [key, value] of Object.entries(options)) {
            if (key === 'classList') {
                for (const className of value) {
                    element[key].add(value);
                }
            } else if (key === 'style') {
                for (const [nameStyle, valueStyle] of Object.entries(value)) {
                    element[key][nameStyle] = valueStyle;
                }
            } else if (key === 'attributes') {
                for (const [nameXlink, valueXlink] of Object.entries(value)) {
                    element.setAttribute(`${nameXlink}:href`, valueXlink);
                }
            } else {
                element[key] = value;
            }
        }
        if (parent) {
            parent.append(element);
        } else {
            return element;
        }
    }

    static createSvg(path) {
        const svg = this.createElement({
            element: 'svg',
            classList: ['svg-icon']
        })
        this.createElement({
            element: 'use',
            attributes: {
                xlink: path
            }
        },svg)
        return svg
    }

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

    static parseAttributeInput(value) {
        const btn = {
            'Телефон': 'phone',
            'Доп. телефон': 'addphone',
            'Email': 'email',
            'Vk' : 'vk',
            'Facebook': 'facebook'
        };
        return value ? btn[value] : 'subtract';
    }

    static parseForBtnText(value) {
        const type = {
            'phone': 'Телефон',
            'addphone': 'Доп. телефон',
            'email': 'Email',
            'vk': 'Vk',
            'facebook': 'Facebook'
        }
        return value ? type[value] : 'subtract';
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
        const app = document.querySelector('#app');
        title.id = 'title-plug';
        title.classList.add('text-center', 'mb-5');
        title.textContent = 'Сдесь пока ничего нет';
        if (tableBody.children.length === 0) {
            if (document.querySelector('#title-plug')) return;
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

    static switchSortClass(target, thNodes) {
        for (let i = 0; i < thNodes.length;i++) {
            if (thNodes[i].firstChild === target) {
                target.classList.toggle('sorted');
            } else {
                thNodes[i].firstChild.classList.remove('sorted');
            }
        }
    }
}
