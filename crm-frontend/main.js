import HeaderPage from "./HeaderPage.js";
import TableController from './conrollers/TableController.js';
import list from "./variables.js";

(() => {
   function createApp(container) {
       const header = new HeaderPage();
       container.append(header.createHeader());
       const table = new TableController('Клиенты', list.listTitleTable, container);
       table.createTable();
    }
    window.createApp = createApp;
})();
