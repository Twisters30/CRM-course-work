import path from './variables.js';
import UiEffects from './Ui-effects.js';
import Handlers from './Handlers.js';

export default class TableBody {
    constructor(clients) {
        this.clients = clients;
    }

    createTableRow() {
        const tr = document.createElement('tr');
        tr.classList.add('table-row');
        return tr;
    }

    createTooltipCopy(options, parent) {
        const icon = document.createElement('span');
        const message = document.createElement('span');
        const wrapTooltip = document.createElement('div');
        const textArea = this.createTextArea(options.id);
        message.textContent = options.message;
        message.classList.add('tooltip-copy-message');
        wrapTooltip.classList.add('tooltip-copy-wrapper');
        wrapTooltip.append(icon, message,textArea);
        Handlers.clickCopyLink(icon, textArea);

        for (const [key, value] of Object.entries(options)) {
            if (key === 'style') {
                for (const [nameStyle, valueStyle] of Object.entries(value)) {
                    icon[key][nameStyle] = valueStyle;
                }
            }
            if (key === 'classList') {
                console.log(key)
                icon[key].add(value);
            }
        }
        if (parent) {
            parent.append(wrapTooltip);
        } else {
            return wrapTooltip;
        }
    }

    createIconContact(iconPath,value,type) {
        const link = document.createElement('a');
        const icon = document.createElement('span');
        const tooltip = document.createElement('span');
        link.classList.add('icon__contact');
        tooltip.classList.add('text-tooltip');
        icon.classList.add('icon-tooltip')
        tooltip.textContent = value;
        if (type === 'phone' || type === 'addphone') {
            link.href = `tel:${value}`;
        } else if (type === 'email') {
            link.href = `mailto:${value}`;
        } else {
            link.href = value;
        }
        link.target = '_blank';
        icon.style.width = '16px';
        icon.style.height = '16px';
        icon.style.display = 'block';
        icon.style.backgroundImage = `url(${iconPath})`;
        icon.style.backgroundSize = '16px';
        tooltip.style.transition = 'opacity 100ms';
        link.append(icon,tooltip);
        return link;
    }

    createListItem(ul,link) {
        const li = document.createElement('li');
        li.classList.add('item-icon', 'mr-2');
        li.append(link);
        ul.append(li);
    }

    static createIcon(width,height,pathIcon) {
        const icon = document.createElement('span');
        icon.style.display = 'block';
        icon.style.width = `${ width }px`;
        icon.style.height = `${ height }px`;
        icon.style.backgroundPositionY = 'center';
        icon.style.backgroundRepeat = 'no-repeat';
        icon.style.backgroundImage = `url(${ path.folderBtns + pathIcon })`;
        icon.classList.add('mr-1');
        return icon;
    }

    createBtnControl(btnEditText,btnDeleteText, clientId) {
        const td = document.createElement('td');
        const btnEdit = document.createElement('button');
        const btnDelete = document.createElement('button');
        const wrap = document.createElement('div');
        td.classList.add('align-middle', 'bg-white', 'position-relative');
        btnEdit.classList.add('btn', 'd-flex', 'flex-row-reverse', 'align-items-center', 'btn-edit');
        btnDelete.classList.add('btn', 'd-flex', 'flex-row-reverse', 'align-items-center', 'btn-delete');
        wrap.classList.add('d-flex', 'justify-content-center');
        btnEdit.textContent = btnEditText;
        btnDelete.textContent = btnDeleteText;
        btnEdit.append(TableBody.createIcon('14','12', path.icons.edit));
        btnDelete.append(TableBody.createIcon('14','12', path.icons.delete));
        wrap.append(btnEdit,btnDelete);
        td.append(wrap);
        this.createTooltipCopy({
            message: 'Скопирован',
            id: location.href + clientId,
            classList: ['tooltip-icon-copy'],
            style:{
                width: '16px',
                height: '16px',
                backgroundImage: 'Url(./assets/img/copy-icon.svg)',
                backgroundRepeat: 'no-repeat',
                backgroundSize: '16px',
                display: 'block'
            },
        }, td)
        return td;
    }

    createContactsCell(value, ul) {
        value.forEach((el) => {
            if (el.type === 'vk') {
                const iconPath = `${ path.folder + path.icons.vk }`;
                this.createListItem(ul, this.createIconContact(iconPath, el.value))
            } else if (el.type === 'facebook') {
                console.log(el.type)
                const iconPath = `${ path.folder + path.icons.fb }`;
                this.createListItem(ul, this.createIconContact(iconPath, el.value))
            } else if (el.type === 'phone') {
                const iconPath = `${ path.folder + path.icons.phone }`;
                this.createListItem(ul, this.createIconContact(iconPath, el.value, 'phone'));
            } else if (el.type === 'email') {
                const iconPath = `${ path.folder + path.icons.email }`;
                this.createListItem(ul, this.createIconContact(iconPath, el.value, 'email'));
            } else if (el.type === 'subtract') {
                const iconPath = `${ path.folder + path.icons.subtract }`;
                this.createListItem(ul, this.createIconContact(iconPath, el.value));
            } else if (el.type === 'addphone') {
                const iconPath = `${ path.folder + path.icons.addPhone }`;
                this.createListItem(ul, this.createIconContact(iconPath, el.value, 'addphone'));
            }
        })
        UiEffects.hoverTooltip(ul);
    }

    createTextArea(value) {
        const textArea = document.createElement('textarea');
        textArea.classList.add('d-flex', 'justify-content-center');
        textArea.id = 'id-client-field';
        textArea.textContent = value;
        return textArea
    }

    createCell(key,value,container) {
        const td = document.createElement('td');
        const span = document.createElement('span');
        const ul = document.createElement('ul');
        const wrap = document.createElement('div');
        wrap.classList.add('d-flex', 'justify-content-center');

        ul.classList.add('icons__list', 'd-flex');
        ul.id = 'contact-list';
        ul.style.listStyleType = 'none';
        td.classList.add('align-middle', 'bg-white');

        if (key === 'id') {
            wrap.textContent = value;
            td.id = value;
            td.classList.add('id-client');
        }
        if (key === 'fio') wrap.textContent = value;
        if (key === 'createdAt' || key === 'updatedAt') {
            const time = value.split('-')[1];
            span.textContent = time;
            span.style.color = '#B0B0B0';
            wrap.textContent = value.split('-')[0];
            span.classList.add('ml-2');
            wrap.append(span);
        }
        if (key === 'contacts') {
            this.createContactsCell(value,ul);
            wrap.append(ul);
        }
        td.append(wrap);
        container.append(td);
    }

    fillDataClient(client,container) {
        for (const [key, value] of Object.entries(client)) {
            this.createCell(key,value,container);
        }
        container.append(this.createBtnControl('Изменить', 'Удалить',client.id));
    }

    createTableBody() {
        const tBody = document.createElement('tbody');
        tBody.id = 'table-body';
        this.clients.forEach(el => {
            const tr = this.createTableRow();
            this.fillDataClient(el,tr);
            tBody.append(tr)
        })
        Handlers.clickDeleteClient(tBody,'.btn-delete');
        Handlers.clickEditClient(tBody);
        Handlers.addListenerHashChanged();
        return tBody;
    }
}
