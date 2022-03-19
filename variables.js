const listTitleTable = [
    'ID',
    'Фамилия Имя Отчество',
    'Дата и время создания',
    'Последние изменения',
    'Контакты',
    'Действия'
]

const testClients = [
    {
        id: 1,
        fio: 'Максимов Александр Сергеевич',
        dateOfCreation: '14.03.2022-20:22',
        dateOfRefactor: '15.04.2022-22:32',
        contacts :
            [
                { vk: 'https://vk.com/twisters30'},
                { tg: 'https://t.me/Twisters30'},
                { phone: '+79212585685'},
                { email: 'tvist821@mail.ru'},
                { fb: 'fb@123.en'},
                { subtract: 'info'}
            ],
        btns: 'Изменить-Удалить'
    }
]

const icons = {
    vk: 'vk.svg',
    fb: 'fb.svg',
    phone: 'phone.svg',
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

const folder = './assets/contacts/';
const folderBtns = './assets/img/';

export default { listTitleTable, testClients, icons, folder, folderBtns,dropdownContacts };
