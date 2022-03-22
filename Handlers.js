import path from './variables.js';
import CreateClient from './CreateClient.js';
import Helper from './Helper.js';
import FormHandlers from './FormHandlers.js';
import Fetch from './Fetch.js';
import TableController from './conrollers/TableController.js';
import UiEffects from './Ui-effects.js';

export default class Handlers {
    static async clickEditClient(bodyTable) {
        bodyTable.addEventListener('click', async (e) => {
            const target = e.target;
            if (target.closest('.btn-edit')) {
                const id = target.parentElement.parentElement.parentElement.querySelector('.id-client');
                const { status , dataClient} = await Fetch.getClientData(id.id);
                if (status === 200 || status === 201) {
                    const modalClient = new CreateClient(dataClient);
                    modalClient.createForm(document.querySelector('#app'));
                    setTimeout(() => {
                        document.querySelector('.modal-form').style.transform = 'translate(-50%, -50%)';
                    },100)
                }
            }
        })
    }

    static async clickDeleteClientInTable(bodyTable) {
        bodyTable.addEventListener('click', async (e) => {
            const target = e.target;
            if (target.closest('.btn-delete')) {
                const id = target.parentElement.parentElement.parentElement.querySelector('.id-client');
                const status = await Fetch.deleteClient(id.id);
                if (status === 200 || status === 201) {
                    const clients = await Fetch.getClients();
                    TableController.refreshTable(clients);
                    TableController.hideTable();
                    Helper.titlePlugPage();
                } else {
                    console.log(status, 'Ошибка при удалении');
                }
            }
        })
    }

    static async clickSaveClientData(btn) {
        btn.addEventListener('click', async () => {
            const id = document.querySelector('#id-client').textContent.split(':')[1];
            const client = FormHandlers.submitFormClient();
            const btnSubmit = document.querySelector('#btn-save');
            if (id) {
                const statusCode = await Fetch.updateClient(client, id);
                if (statusCode === 201 || statusCode  === 200) {
                    UiEffects.btnSuccess(btnSubmit);
                } else {
                    UiEffects.btnError(btnSubmit);
                }
            } else {
                const statusCode = await Fetch.postClient(client);
                if (statusCode === 201 || statusCode  === 200) {
                    TableController.hideTable();
                    FormHandlers.clearForm();
                    UiEffects.btnSuccess(btnSubmit);
                    Helper.titlePlugPage();
                } else {
                    console.log('Error status code', statusCode);
                    UiEffects.btnError(btnSubmit);
                }
            }
            const clients = await Fetch.getClients();
            TableController.refreshTable(clients);
        })
    }

    static clickDeleteContact(btn, containerContacts) {
        btn.addEventListener('click', () => {
            const btnAddContacts = containerContacts.nextSibling;
            btn.parentElement.remove();
            Helper.checkLimitContacts(btnAddContacts, containerContacts);
        })
    }

    static clickOutElement(dropdown) {
        document.addEventListener('click', e => {
            const target = e.target;
            const itsMenu = target === dropdown || dropdown.contains(target);
            if (!itsMenu && target.tagName !== 'LI') {
                dropdown.firstChild.nextSibling.style.opacity = '0';
                dropdown.firstChild.nextSibling.style.pointerEvents = 'none';
                dropdown.firstChild.nextSibling.nextSibling.style.transform = 'rotate(0deg)'
            }
        })
        return close;
    }

    static clickCreateClient(btn) {
        const modal = new CreateClient();
        btn.addEventListener('click', () => {
            modal.createForm(document.querySelector('#app'))
            setTimeout(() => {
                document.querySelector('.modal-form').style.transform = 'translate(-50%, -50%)';
            },100)
        })
    }

    static clickCloseModalBtn(btn) {
        btn.addEventListener('click', function () {
            document.querySelector('.modal-form').style.transform = 'translate(-50%, -200%)';
            setTimeout(() => {
                this.parentElement.parentElement.parentElement.parentNode.remove();
            },200)
        })
    }

    static clickShowDropdown(btn) {
        btn.addEventListener('click', function (e) {
            if (e.target.tagName === 'BUTTON' && e.target.nextSibling.style.opacity === '0') {
                e.target.nextSibling.style.opacity = '1';
                e.target.nextSibling.style.pointerEvents = 'visible';
                e.target.nextSibling.nextSibling.style.transform = 'rotate(180deg)';
            } else if (e.target.tagName === 'BUTTON' && e.target.nextSibling.style.opacity === '1') {
                e.target.nextSibling.nextSibling.style.transform = 'rotate(0deg)';
                e.target.nextSibling.style.opacity = '0';
                e.target.nextSibling.style.pointerEvents = 'none';
            } else if (e.target.tagName === 'LI') {
                e.target.parentElement.style.opacity = '0';
                e.target.parentElement.style.pointerEvents = 'none';
                e.target.parentElement.parentElement.lastChild.style.transform = 'rotate(0deg)';
            }
        })
        Handlers.clickOutElement(btn)
    }

    static closeModalBtn() {
        const closeBtn = document.createElement('button');
        closeBtn.classList.add('btn', 'position-absolute');
        closeBtn.style.top = '5%';
        closeBtn.style.right = '5%';
        closeBtn.style.width = '15px';
        closeBtn.style.height = '15px';
        closeBtn.style.backgroundRepeat = 'no-repeat';
        closeBtn.style.backgroundPositionY = 'center';
        closeBtn.style.backgroundImage = `url(${path.folderBtns + path.icons.close})`;

        return closeBtn;
    }

    static clickAddContact(btn, container) {
        const createClient = new CreateClient();
        btn.addEventListener('click', () => {
            createClient.createContact(container);
            Helper.checkLimitContacts(btn, container);
        })
    }

    static clickSelectContact(ul) {
        ul.addEventListener('click', function (e) {
            const target = e.target;
            if (target.tagName === 'UL') return;
            if (target.closest('li')) {
                let btnDropdown = target.parentElement.previousSibling;
                console.log(btnDropdown)
                let input = btnDropdown.parentElement.nextSibling;
                btnDropdown.textContent = target.textContent;
                const dataText = Helper.parseAttributeInput(btnDropdown);
                if (input.hasAttributes()) {
                    const attributes = input.attributes;
                    for (let i = 0; i < attributes.length;i++) {
                        if (attributes[i].name === 'style' || attributes[i].name === 'class') {
                            continue;
                        } else {
                            input.removeAttribute(attributes[i].name)
                        }
                    }
                }
                input.setAttribute(`data-${dataText}`, `${input.value}`);
            }
        })
    }
}
