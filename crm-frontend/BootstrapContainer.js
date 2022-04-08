export default class BootstrapContainer {
    static createContainer() {
        const container = document.createElement('div');
        const row = document.createElement('div');
        const col = document.createElement('div');
        row.classList.add('row');
        col.classList.add('col-ld-12','col', 'wrapper-content');
        container.classList.add('container');
        container.append(row);
        row.append(col);
        return container;
    }
}
