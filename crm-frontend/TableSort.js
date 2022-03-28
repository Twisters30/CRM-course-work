export default class TableSort {
    constructor(client) {
        this.client = client;
    }

     sort(field, reversSort) {
        this.client.sort((a, b) => a[field] > b[field] ? 1 : -1);
        if (reversSort) this.client.reverse();
    }

    static markByDefaultSort(container) {
        container.firstChild.classList.add('sorted');
    }
}
