import path from './variables.js';

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
        const btnEdit = document.createElement('button');
        const btnDelete = document.createElement('button');
        const wrap = document.createElement('div');
        btnEdit.classList.add('btn', 'd-flex', 'flex-row-reverse', 'align-items-center');
        btnDelete.classList.add('btn', 'd-flex', 'flex-row-reverse', 'align-items-center');
        wrap.classList.add('d-flex')
        btnEdit.textContent = btnEditText;
        btnDelete.textContent = btnDeleteText;
        btnEdit.append(TableBody.createIcon('14','12', path.icons.edit));
        btnDelete.append(TableBody.createIcon('14','12', path.icons.delete));
        wrap.append(btnEdit,btnDelete);
        return wrap;
    }

    createContactsCell(value, ul) {
        value.forEach((el) => {
            for(const [icon,val] of Object.entries(el)) {
                if (icon === 'vk') {
                    const iconPath = `${ path.folder + path.icons.vk }`;
                    this.createListItem(ul, this.createIconContact(iconPath, val))
                } else if (icon === 'fb') {
                    const iconPath = `${ path.folder + path.icons.fb }`;
                    this.createListItem(ul, this.createIconContact(iconPath, val))
                } else if (icon === 'phone') {
                    const iconPath = `${ path.folder + path.icons.phone }`;
                    this.createListItem(ul, this.createIconContact(iconPath, val, 'phone'))
                } else if (icon === 'email') {
                    const iconPath = `${ path.folder + path.icons.email }`;
                    this.createListItem(ul, this.createIconContact(iconPath, val, 'email'))
                } else if (icon === 'subtract') {
                    const iconPath = `${ path.folder + path.icons.subtract }`;
                    this.createListItem(ul, this.createIconContact(iconPath, val))
                }
            }
        })
    }

    createCell(key,value,container) {
        const td = document.createElement('td');
        const span = document.createElement('span');
        const ul = document.createElement('ul');
        const wrap = document.createElement('div');
        wrap.classList.add('d-flex');
        ul.classList.add('icons__list', 'd-flex');
        ul.style.listStyleType = 'none';
        td.classList.add('align-middle', 'bg-white');

        if (key === 'id') wrap.textContent = value;
        if (key === 'fio') wrap.textContent = value;
        if (key === 'dateOfCreation' || key === 'dateOfRefactor') {
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
        if (key === 'btns') {
            td.append(this.createBtnControl(value.split('-')[0], value.split('-')[1]));
        }
        td.append(wrap);
        container.append(td);
    }

    fillDataClient(client,container) {
        for (const [key, value] of Object.entries(client)) {
            this.createCell(key,value,container);
        }
    }

    createTableBody() {
        const tBody = document.createElement('tbody');
        this.clients.forEach(el => {
            const tr = this.createTableRow();
            this.fillDataClient(el,tr);
            tBody.append(tr)
        })
        return tBody;
    }
}
