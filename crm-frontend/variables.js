const listTitleTable = [
    'ID',
    'Фамилия Имя Отчество',
    'Дата и время создания',
    'Последние изменения',
    'Контакты',
    'Действия'
]

const icons = {
    vk: 'vk.svg',
    fb: 'fb.svg',
    phone: 'phone.svg',
    addPhone: 'phone.svg',
    subtract: 'subtract.svg',
    email: 'mail.svg',
    edit: 'edit.svg',
    delete: 'cancel.svg',
    addClient: 'addClient.svg',
    close: 'cross.svg',
    circleCross: 'add-contacts.svg',
    cancelContacts: 'cancel-contacts.svg',
    chevron: 'сhevron.svg'
}

const dropdownContacts = ['Телефон', 'Доп. телефон', 'Email', 'Vk', 'Facebook']
// Path for root icons
const folder = './assets/contacts/';
const folderBtns = './assets/img/';

// request
const api = 'http://localhost:3000/';
const getListClient = 'api/clients';
const postClient = 'api/clients';
const deleteClient = 'api/clients/';
const getClient = 'api/clients/';
const patchClient = 'api/clients/';
const search = `?search=`;

export default {
    listTitleTable,
    icons,
    folder,
    folderBtns,
    dropdownContacts,
    api,
    getListClient,
    postClient,
    deleteClient,
    getClient,
    patchClient,
    search
};
