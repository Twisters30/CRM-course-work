import BootstrapContainer from './BootstrapContainer.js';
import Handlers from './Handlers.js';
import UiEffects from './Ui-effects.js';
import path from './variables.js';
import TableBody from './TableBody.js';

export default class CreateClient {
    constructor(client) {
        this.client = client;
    }

    createInput(value, idInput) {
        const label = document.createElement('label');
        const title = document.createElement('span');
        const input = document.createElement('input');

        input.id = idInput;
        input.style.width = '390px';
        input.style.border = 'none';
        input.style.borderBottom = '1px solid #C8C5D1';
        label.classList.add('d-flex', 'flex-column');
        label.style.marginBottom = '15px';
        title.style.paddingBottom = '2px';
        title.textContent = value;
        label.append(title,input);
        return label;
    }

    createBtnSaveClient() {
        const wrap = document.createElement('div');
        const btnSave = document.createElement('button');
        wrap.classList.add('d-flex', 'justify-content-center');
        btnSave.type = 'submit';
        btnSave.classList.add('btn');
        btnSave.textContent = 'Сохранить';
        btnSave.style.color = '#fff';
        btnSave.style.backgroundColor = '#9873FF';
        btnSave.style.padding = '12.5px 35px';
        btnSave.style.marginBottom = '5px';
        Handlers.clickSaveClientData(btnSave);
        wrap.append(btnSave);
        return wrap;
    }

    createBtnDeleteClient() {
        const wrap = document.createElement('div');
        const btnDelete = document.createElement('button');
        wrap.classList.add('d-flex', 'justify-content-center');
        btnDelete.classList.add('btn');
        btnDelete.textContent = 'Удалить клиента';
        btnDelete.style.color = '#333';
        btnDelete.style.marginBottom = '5px';
        wrap.append(btnDelete);
        return wrap;
    }

    createBtnAddContacts() {
        const wrapBtnIcon = document.createElement('div');
        const btnAddContact = document.createElement('button');
        const icon = document.createElement('span');
        wrapBtnIcon.classList.add('d-flex', 'align-items-center', 'justify-content-center', 'position-relative');
        wrapBtnIcon.style.transition = '300ms';
        icon.classList.add('d-block', 'position-absolute');
        icon.style.width = '15px';
        icon.style.height = '15px';
        icon.style.left = '30%';
        icon.style.backgroundImage = `url(${path.folderBtns + path.icons.circleCross })`;
        btnAddContact.classList.add('btn');
        btnAddContact.textContent = 'Добавить контакт';
        btnAddContact.style.transition = '300ms';
        wrapBtnIcon.append(icon, btnAddContact);
        return wrapBtnIcon;
    }

    createLi(text) {
        const li = document.createElement('li');
        li.classList.add('dropdown-item');
        li.style.cursor = 'pointer';
        li.style.padding = '10px 12px';
        li.textContent = text;
        return li;
    }

    crateSelectorDropdown(container, list) {
        list.forEach(el => container.append(this.createLi(el)));
    }

    createDropdown() {
        const wrapDropdownBtn = document.createElement('div');
        const btnOpenDropdown = document.createElement('button');
        const selectorDropdown = document.createElement('ul');
        const iconСhevron = TableBody.createIcon('10', '6', path.icons.chevron);
        selectorDropdown.classList.add('flex-column', 'd-flex', 'position-absolute', 'dropdown-menu');
        wrapDropdownBtn.classList.add('d-flex', 'align-items-center', 'justify-content-between', 'position-relative');
        btnOpenDropdown.classList.add('btn', 'text-left');
        iconСhevron.classList.add('position-absolute')
        iconСhevron.style.right = '5%';
        iconСhevron.style.pointerEvents = 'none';
        wrapDropdownBtn.style.backgroundColor = '#e7e5eb';
        wrapDropdownBtn.style.maxHeight = '37px';
        btnOpenDropdown.style.width = '123px';
        btnOpenDropdown.style.padding = '10px 12px';
        btnOpenDropdown.textContent = 'Телефон';
        selectorDropdown.style.top = '93%';
        selectorDropdown.style.left = '-1%';
        selectorDropdown.style.backgroundColor = '#F4F3F6';
        selectorDropdown.style.width = '102%';
        selectorDropdown.style.border = '1px solid #C8C5D1';
        selectorDropdown.style.opacity = '0';
        selectorDropdown.style.transition = '300ms';
        selectorDropdown.style.minWidth = '100%';
        selectorDropdown.style.padding = '0';
        iconСhevron.style.transition = '300ms';
        wrapDropdownBtn.append(btnOpenDropdown, selectorDropdown, iconСhevron);
        this.crateSelectorDropdown(selectorDropdown, path.dropdownContacts);
        Handlers.clickDropdown(wrapDropdownBtn);
        Handlers.clickSelectContact(selectorDropdown);
        return wrapDropdownBtn;
    }

    crateBtnDeleteContact() {
        const wrapCloseBtn = document.createElement('div');
        const iconClose = TableBody.createIcon('16', '16', path.icons.cancelContacts);
        iconClose.classList.add('btn', 'scale');
        iconClose.classList.remove('mr-1');
        iconClose.type = 'button';
        iconClose.style.transition = '500ms';
        wrapCloseBtn.classList.add('d-flex', 'align-items-center');
        wrapCloseBtn.style.cursor = 'pointer';
        wrapCloseBtn.style.backgroundColor = '#e7e5eb';
        iconClose.style.padding = '13px 8px';
        iconClose.style.minHeight = '37px';
        UiEffects.onHoverScale(iconClose, 'bg-danger');
        wrapCloseBtn.append(iconClose);
        return wrapCloseBtn;
    }

    createContact(sectionContacts) {
        const wrapContact = document.createElement('li');
        const deleteContactBtn = this.crateBtnDeleteContact();
        const input = document.createElement('input');
        const dropdown = this.createDropdown();
        input.classList.add('input-contact');
        wrapContact.classList.add('d-flex', 'align-items-center', 'justify-content-between');
        wrapContact.style.marginBottom = '25px';
        wrapContact.style.border = '1px solid #C8C5D1';
        input.setAttribute('data-phone', '+79215778900');
        input.style.padding = '8px 12px';
        input.style.backgroundColor = '#f4f3f6';
        input.style.width = '100%';
        input.style.height = '100%';
        input.style.border = '1px solid #C8C5D1';
        Handlers.clickDeleteContact(deleteContactBtn, sectionContacts);
        wrapContact.append(dropdown, input, deleteContactBtn);
        sectionContacts.prepend(wrapContact);
    }

    createSectionContacts() {
        const containerContacts = document.createElement('div')
        const listContacts = document.createElement('ul');
        const btnAddContacts = this.createBtnAddContacts();
        listContacts.classList.add('d-flex', 'flex-column', 'm-0');
        containerContacts.classList.add('d-flex', 'justify-content-center', 'flex-column')
        containerContacts.style.backgroundColor = 'rgb(244,243,246)';
        containerContacts.style.padding = '25px 0'
        containerContacts.style.margin = '25px 0';
        containerContacts.style.transition = '300ms';
        containerContacts.append(listContacts,btnAddContacts)
        return {
            containerContacts,
            btnAddContacts,
            listContacts
        };
    }

    createForm(box) {
        if (document.querySelector('.modal-form')) return;
        const container = BootstrapContainer.createContainer();
        const form = document.createElement('form');
        const title = document.createElement('h2');
        const titleWrap = document.createElement('div');
        const id = document.createElement('span');
        const familyInput = this.createInput('Фамилия*', 'input-family');
        const nameInput = this.createInput('Имя*', 'input-name');
        const middleNameInput = this.createInput('Отчество', 'input-middleName');
        const closeBtn = Handlers.closeModalBtn();
        const { containerContacts, btnAddContacts , listContacts} = this.createSectionContacts();
        const btnSave = this.createBtnSaveClient();
        const btnDelete = this.createBtnDeleteClient();

        container.classList.add('position-absolute', 'modal-form');
        container.style.top = '50%';
        container.style.left = '50%';
        container.style.transform = 'translate(-50%, -200%)';
        container.classList.remove('container');
        container.style.zIndex = '999';
        container.querySelector('.col').style.flexGrow = '0';
        titleWrap.style.marginBottom = '16px';
        form.classList.add('bg-white');
        form.style.padding = '24px 30px 25px 30px';
        id.classList.add('d-block');
        titleWrap.classList.add('d-flex', 'align-items-center');
        title.classList.add('mr-2');
        title.textContent = 'Изменить данные';
        id.textContent = 'id: test123';
        id.style.color = '#B0B0B0';
        form.addEventListener('submit', e => e.preventDefault());
        titleWrap.append(title,id)
        container.querySelector('.col').append(form);
        form.append(titleWrap, familyInput, nameInput, middleNameInput, closeBtn, containerContacts, btnSave, btnDelete);
        Handlers.clickCloseModalBtn(closeBtn);
        Handlers.clickAddContact(btnAddContacts, listContacts);
        UiEffects.slideOut(container);
        box.append(container);
    }
}
