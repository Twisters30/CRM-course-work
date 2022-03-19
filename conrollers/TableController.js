import TableHeader from '../TableHeader.js';
import TableBody from '../TableBody.js';
import variable from "../variables.js";
import BootstrapContainer from '../BootstrapContainer.js';
import Handlers from '../Handlers.js';

export default class TableController {
    constructor(titleTable, list, container) {
        this.titleTable = titleTable;
        this.listsHeader = list;
        this.container = container;
    }

    createBtnAddClient(btnText) {
        const btn = document.createElement('button');
        const icon = TableBody.createIcon('22', '16', variable.icons.addClient)
        icon.classList.add('mr-2')
        btn.classList.add('btn', 'btn-outline-primary', 'd-flex', 'align-items-center', 'flex-row-reverse', 'm-auto');
        btn.textContent = btnText;
        btn.style.borderColor = '#9873FF';
        btn.style.padding = '12.5px 26.5px';
        btn.style.color = '#9873FF';
        btn.append(icon);
        Handlers.clickCreateClient(btn);
        return btn;
    }

    createTable() {
        const container = BootstrapContainer.createContainer();
        const section = document.createElement('section');
        const icon = this.createBtnAddClient('Добавить клиента');
        const table = document.createElement('table');
        const tableHeader = new TableHeader(this.titleTable, this.listsHeader);
        const tableBody = new TableBody(variable.testClients);

        table.classList.add('table', 'table-xl-responsive');
        section.style.padding = '40px 0px';
        table.style.paddingBottom = '40px';

        table.append(tableHeader.createTitleTable(), tableHeader.createTableHeader(), tableBody.createTableBody());
        container.querySelector('.col').append(table,icon);
        section.append(container);
        this.container.append(section);
        Handlers.handlerTooltip();
    }
}
