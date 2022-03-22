import path from './variables.js';
import UiEffects from './Ui-effects.js';
import Handlers from './Handlers.js';

export default class TableBody {
    constructor(clients) {
        this.clients = clients;
    }

    createTableRow() {
        const tr = document.createElement('tr');
        tr.classList.add('text-center');
        return tr;
    }

    createIconContact(iconPath,value,type) {
        const link = document.createElement('a');
        const icon = document.createElement('span');
        const tooltip = document.createElement('span');
        link.classList.add('icon__contact');
        tooltip.classList.add('text-tooltip');
        icon.classList.add('icon-tooltip')
        tooltip.textContent = value;
        if (type === 'phone') {
            link.href = `tel:${value}`;
        } else if (type === 'email') {
            link.href = `mailto:${value}`;
        } else {
            link.href = value;
        }
        link.target = '_blank';
        icon.style.backgroundImage = iconPath;
        icon.style.width = '16px';
        icon.style.height = '16px';
        icon.style.display = 'block';
        icon.style.backgroundImage = `url(${iconPath})`;
        icon.style.backgroundSize = '16px';
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

    createBtnControl(btnEditText,btnDeleteText) {
        const td = document.createElement('td');
        const btnEdit = document.createElement('button');
        const btnDelete = document.createElement('button');
        const wrap = document.createElement('div');
        td.classList.add('align-middle', 'bg-white');
        btnEdit.classList.add('btn', 'd-flex', 'flex-row-reverse', 'align-items-center', 'btn-edit');
        btnDelete.classList.add('btn', 'd-flex', 'flex-row-reverse', 'align-items-center', 'btn-delete');
        wrap.classList.add('d-flex')
        btnEdit.textContent = btnEditText;
        btnDelete.textContent = btnDeleteText;
        btnEdit.append(TableBody.createIcon('14','12', path.icons.edit));
        btnDelete.append(TableBody.createIcon('14','12', path.icons.delete));
        wrap.append(btnEdit,btnDelete);
        td.append(wrap);
        return td;
    }

    createContactsCell(value, ul) {
        value.forEach((el) => {
            if (el.type === 'vk') {
                const iconPath = `${ path.folder + path.icons.vk }`;
                this.createListItem(ul, this.createIconContact(iconPath, el.value))
            } else if (el.type === 'facebook') {
                const iconPath = `${ path.folder + path.icons.fb }`;
                this.createListItem(ul, this.createIconContact(iconPath, el.value))
            } else if (el.type === 'phone') {
                const iconPath = `${ path.folder + path.icons.phone }`;
                this.createListItem(ul, this.createIconContact(iconPath, el.value, 'phone'))
            } else if (el.type === 'email') {
                const iconPath = `${ path.folder + path.icons.email }`;
                this.createListItem(ul, this.createIconContact(iconPath, el.value, 'email'))
            } else if (el.type === 'subtract') {
                const iconPath = `${ path.folder + path.icons.subtract }`;
                this.createListItem(ul, this.createIconContact(iconPath, el.value))
            }
        })
        UiEffects.hoverTooltip(ul);
    }

    createCell(key,value,container) {
        const td = document.createElement('td');
        const span = document.createElement('span');
        const ul = document.createElement('ul');
        const wrap = document.createElement('div');
        wrap.classList.add('d-flex');
        ul.classList.add('icons__list', 'd-flex');
        ul.id = 'contact-list';
        ul.style.listStyleType = 'none';
        td.classList.add('align-middle', 'bg-white');

        if (key === 'id') {
            wrap.textContent = value;
            td.id = value;
            td.classList.add('id-client');
        } ;
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
        container.append(this.createBtnControl('Изменить', 'Удалить'));
    }

    createTableBody() {
        const tBody = document.createElement('tbody');
        tBody.id = 'table-body';
        this.clients.forEach(el => {
            const tr = this.createTableRow();
            this.fillDataClient(el,tr);
            tBody.append(tr)
        })
        Handlers.clickDeleteClientInTable(tBody);
        Handlers.clickEditClient(tBody);
        return tBody;
    }
}
