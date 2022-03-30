import Handlers from './Handlers.js';
import Helper from './Helper.js';

export default class TableHeader {
    constructor(title,listTitleTable) {
        this.title = title;
        this.listTitleTable = listTitleTable;
    }

    createTitleTable() {
        const caption = document.createElement('caption');
        caption.textContent = this.title;
        caption.style.captionSide = 'top';
        caption.style.color = '#333';
        caption.style.fontSize = '24px';
        caption.style.lineHeight = '33px';
        caption.style.fontWeight = '700';
        caption.style.paddingBottom = '31px';
        return caption;
    }

    addArrowIcon(el,icon) {
        const span = document.createElement('span');
        span.style.minWidth = '8px';
        span.style.height = '8px';
        span.style.margin = '0px 5px';
        span.style.backgroundImage = icon;
        span.style.backgroundRepeat = 'no-repeat';
        span.style.display = 'block';
        el.append(span);
    }

    addAlphabetIcon(el,icon) {
        const span = document.createElement('span');
        span.style.display = 'block';
        span.style.minWidth = '17px';
        span.style.height = '14px';
        span.style.backgroundImage = icon;
        span.style.backgroundRepeat = 'no-repeat';
        span.style.backgroundPositionY = 'center';
        el.append(span);
    }

    checkIconArrow(text) {
        switch (text) {
            case 'Контакты':
                return false;
            case 'Действия':
                return false;
            default:
                return true
        }
    }

    createCellTable(text) {
        const th = document.createElement('th');
        const btnHeader = document.createElement('button');
        const wrap = document.createElement('div');
        btnHeader.classList.add('d-flex', 'align-items-center', 'justify-content-center', 'flex-nowrap', 'table-header-btn');
        wrap.classList.add('d-flex', 'align-items-center', 'justify-content-center', 'flex-nowrap', 'table-header-wrap');
        btnHeader.textContent = text;
        wrap.textContent = text;
        th.style.color = '#B0B0B0';
        if (text === 'Контакты' || text === 'Действия') {
            th.append(wrap);
            th.style.pointerEvents = 'none';
        } else {
            th.append(btnHeader);
        }
        if (this.checkIconArrow(text)) {
            this.addArrowIcon(btnHeader, 'url(./assets/img/arrow.svg)');
            btnHeader.firstElementChild.id = 'arrow-sort';
            btnHeader.firstElementChild.style.transition = '300ms';
        }
        if (text === 'Фамилия Имя Отчество') {
            this.addAlphabetIcon(btnHeader,'url(./assets/img/alphabet.svg)');
            th.id = 'client-fio-td';
        }
        if (text === 'ID') {
            th.id = 'client-id-td';
        }
        if (text === 'Дата и время создания') {
            th.id = 'client-createdAt-td';
        }
        if (text === 'Последние изменения') {
            th.id = 'client-updatedAt-td';
        }
        return th;
    }

    createTrTable() {
        return document.createElement('tr');
    }

    createTableHeader() {
        const thead = document.createElement('thead');
        thead.id = 'client-thead';
        const tr = this.createTrTable();

        this.listTitleTable.forEach((el) => tr.append(this.createCellTable(el)))
        thead.append(tr);
        Handlers.clickTableSort(thead);
        return thead;
    }
}
