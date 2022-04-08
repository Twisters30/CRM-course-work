import TableHeader from '../TableHeader.js';
import TableBody from '../TableBody.js';
import BootstrapContainer from '../BootstrapContainer.js';
import Handlers from '../Handlers.js';
import Fetch from '../Fetch.js';
import Helper from '../Helper.js';
import Modal from '../Modal.js';
import TableSort from '../TableSort.js';
import UiEffects from '../Ui-effects.js';

export default class TableController {
    constructor(titleTable, list, container) {
        this.titleTable = titleTable;
        this.listsHeader = list;
        this.container = container;
    }

    createBtnAddClient(btnText) {
        const btn = document.createElement('button');
        const icon = document.createElement('span');
        icon.classList.add('icon-add-client','mr-2')
        btn.classList.add('btn', 'main-btn', 'd-flex', 'align-items-center', 'flex-row-reverse', 'm-auto');
        btn.textContent = btnText;
        btn.append(icon);
        Handlers.clickCreateClient(btn);
        return btn;
    }

    async createTable() {
        const clients = await Fetch.getClients(true);
        const container = BootstrapContainer.createContainer();
        const tagMain = document.createElement('main');
        const section = document.createElement('section');
        const icon = this.createBtnAddClient('Добавить клиента');
        const table = document.createElement('table');
        const tableHeader = new TableHeader(this.titleTable, this.listsHeader);
        const tableBody = new TableBody(clients);

        table.classList.add('table', 'table-xl-responsive');
        table.id = 'table-client';
        section.style.padding = '40px 0px';
        table.style.paddingBottom = '40px';

        table.append(tableHeader.createTitleTable(), tableHeader.createTableHeader(), tableBody.createTableBody());
        container.querySelector('.wrapper-content').append(table,icon);
        tagMain.append(section);
        section.append(container);
        this.container.append(tagMain);
        TableController.hideTable();
        Helper.titlePlugPage();
        TableSort.markByDefaultSort(document.querySelector('#client-id-td'));
        Helper.arrowSortControl();
        await Fetch.searchClients();
    }

    static refreshTable(clients, isHighlight) {
        const tableBodyOld = document.querySelector('#table-body');
        const table = document.querySelector('#table-client');
        tableBodyOld.remove();
        const tableBody = new TableBody(clients);
        table.append(tableBody.createTableBody());
        if (isHighlight) {
            UiEffects.highlightTableRow(table.querySelector("tbody").querySelectorAll('tr'));
        }
    }

    static hideTable() {
        const table = document.querySelector('#table-client');
        const tableBody = document.querySelector('#table-body');
        if (tableBody.children.length === 0) {
            table.classList.add('d-none');
        } else {
            table.classList.remove('d-none');
        }
    }

    static createModalConfirm() {
        const modal = new Modal();
        return modal.createConfirmModal(document.querySelector('#app'));
    }

}
