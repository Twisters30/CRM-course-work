import TableSort from './TableSort.js';
import CreateClient from './CreateClient.js';
import Helper from './Helper.js';
import FormHandlers from './FormHandlers.js';
import Fetch from './Fetch.js';
import TableController from './conrollers/TableController.js';
import UiEffects from './Ui-effects.js';
import Modal from './Modal.js';

export default class Handlers {
    static async clickEditClient(bodyTable) {
        bodyTable.addEventListener('click', async (e) => {
            const target = e.target;
            if (target.closest('.btn-edit')) {
                const clientId = target.parentElement.parentElement.parentElement.querySelector('.id-client').id;
                const { status , clientData} = await Fetch.getClientData(clientId);
                const app = document.querySelector('#app')
                if (status === 200 || status === 201) {
                    const modalClient = new CreateClient(clientData);
                    const modalWrap = modalClient.createForm(app);
                    UiEffects.slideOut(modalWrap);
                    Modal.createOverlayModal(app);
                }
            }
        })
    }

    static closeModal(wrapModal) {
        wrapModal.style.transform = 'translate(-50%, -200%)';
        setTimeout(() => {
            wrapModal.remove();
        },200)
        Modal.closeOverlay();
    }

    static clickConfirmDelete(wrapModal, btnDeleteModal, clientId) {
        wrapModal.addEventListener('click', async (e) => {
            const target = e.target;
            const idBtnDelete = `${ '#' + btnDeleteModal.id}`;
            if (target.closest(idBtnDelete)) {
                const status = await Fetch.deleteClient(clientId);
                const modalClient = document.querySelector('.modal-form');
                if (status === 200 || status === 201) {
                    const clients = await Fetch.getClients(true);
                    TableController.refreshTable(clients);
                    TableController.hideTable();
                    Helper.titlePlugPage();
                    Handlers.closeModal(wrapModal);

                } else {
                    console.log(status, 'Ошибка при удалении');
                }
                if (modalClient) {
                    Handlers.closeModal(modalClient);
                }
                Modal.closeOverlay();
            }
        })
    }

    static deleteClientInTable(id) {
        const { wrapModal, btnDeleteModal } = TableController.createModalConfirm();
        UiEffects.slideOut(wrapModal);
        Handlers.clickConfirmDelete(wrapModal, btnDeleteModal.querySelector('button'),id);
        Modal.createOverlayModal(document.querySelector('#app'));
    }

    static clickDeleteClient(handlerContainer, identificator) {
        handlerContainer.addEventListener('click', async (e) => {
            const target = e.target;
            if (target.closest(identificator)) {
                const clientModal = document.querySelector('.modal-form');
                if (clientModal) {
                    clientModal.style.left = '20%';
                    clientModal.style.pointerEvents = 'none';
                }
                const id = target.parentElement.parentElement.parentElement.querySelector('.id-client').id;
                this.deleteClientInTable(id);
            }
        })
    }

    static async clickSaveClientData(btnSubmit,id) {
        btnSubmit.addEventListener('click', async () => {
            const clientId = id.id;
            const clientData = FormHandlers.submitFormClient();
            if (clientId) {
                const statusCode = await Fetch.updateClient(clientData, clientId);
                if (statusCode === 201 || statusCode  === 200) {
                    UiEffects.btnSuccess(btnSubmit);
                } else {
                    UiEffects.btnError(btnSubmit);
                }
            } else {
                const statusCode = await Fetch.postClient(clientData);
                if (statusCode === 201 || statusCode  === 200) {
                    FormHandlers.clearForm();
                    UiEffects.btnSuccess(btnSubmit);

                } else {
                    console.log('Error status code', statusCode);
                    UiEffects.btnError(btnSubmit);
                }
            }
            const clients = await Fetch.getClients(true);
            TableController.refreshTable(clients);
            TableController.hideTable();
            Helper.titlePlugPage();
        })
    }

    static clickDeleteContact(btn) {
        btn.addEventListener('click', () => {
            btn.parentElement.remove();
            Helper.checkLimitContacts();
        })
    }

    static clickOutElement(dropdown) {
        document.addEventListener('click', e => {
            const target = e.target;
            const itsMenu = target === dropdown || dropdown.contains(target);
            if (!itsMenu && target.tagName !== 'LI') {
                dropdown.firstChild.nextSibling.style.display = 'none';
                dropdown.firstChild.nextSibling.nextSibling.style.transform = 'rotate(0deg)'
            }
        })
    }

    static clickCreateClient(btn) {
        const modal = new CreateClient();
        btn.addEventListener('click', () => {
            const containerApp = document.querySelector('#app');
            const modalWrap = modal.createForm(containerApp);
            Modal.createOverlayModal(document.querySelector('#app'));
            UiEffects.slideOut(modalWrap);
        })
    }

    static clickCloseModal(btn,modal) {
        btn.addEventListener('click', function () {
            const clientModal = document.querySelector('.modal-form');
            if (clientModal) {
                clientModal.style.left = '50%';
                clientModal.style.pointerEvents = 'visible';
            }
            Handlers.closeModal(modal);
        })
    }

    static clickShowDropdown(btn) {
        btn.addEventListener('click', function (e) {
            if (e.target.closest('button') && this.querySelector('UL').style.display === 'none') {
                this.querySelector('UL').style.display = 'flex';
                e.target.nextSibling.nextSibling.style.transform = 'rotate(180deg)';
            } else if (e.target.closest('button') && this.querySelector('UL').style.display === 'flex') {
                e.target.nextSibling.nextSibling.style.transform = 'rotate(0deg)';
                this.querySelector('UL').style.display = 'none';
            } else if (e.target.tagName === 'LI') {
                this.querySelector('UL').style.display = 'none';
                e.target.parentElement.parentElement.lastChild.style.transform = 'rotate(0deg)';
            }
        })
        Handlers.clickOutElement(btn)
    }

    static clickAddContact(btn, container) {
        const createClient = new CreateClient();
        btn.addEventListener('click', () => {
            createClient.createContact(container);
            Helper.checkLimitContacts();
        })
    }

    static clickSelectContact(ul) {
        ul.addEventListener('click', function (e) {
            const target = e.target;
            if (target.tagName === 'UL') return;
            if (target.closest('li')) {
                let btnDropdown = target.parentElement.previousSibling;
                let input = btnDropdown.parentElement.nextSibling;
                btnDropdown.textContent = target.textContent;
                const dataText = Helper.parseAttributeInput(btnDropdown.textContent);
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

    static clickTableSort(tableHeader) {
        tableHeader.addEventListener('click', async (e) => {
            const clients = await Fetch.getClients(true);
            const tableSort = new TableSort(clients);
            const target = e.target;
            const thNodes = tableHeader.firstChild.childNodes;
            if (target.closest('#client-id-td')) {
                tableSort.sort('id',target.classList.contains('sorted'));
                Helper.switchSortClass(target, thNodes);
                Helper.arrowSortControl();
            } else if (target.closest('#client-fio-td')) {
                tableSort.sort('fio',target.classList.contains('sorted'));
                Helper.switchSortClass(target, thNodes);
                Helper.arrowSortControl();
            } else  if (target.closest('#client-createdAt-td')) {
                tableSort.sort('createdAt', target.classList.contains('sorted'));
                Helper.switchSortClass(target, thNodes);
                Helper.arrowSortControl();
            } else if (target.closest('#client-updatedAt-td')) {
                tableSort.sort('updatedAt', target.classList.contains('sorted'));
                Helper.switchSortClass(target, thNodes);
                Helper.arrowSortControl();
            }
            TableController.refreshTable(clients);
        })
    }

    static clickCancelBtn(btn,modal) {
        btn.addEventListener('click', () => {
            Handlers.closeModal(modal);
        })
    }

    static clickCopyLink(button, textField) {
        button.addEventListener('click', function () {
            textField.focus();
            textField.select();
            document.execCommand("copy");
            button.nextSibling.classList.add('click');
            setTimeout(() => {
                button.nextSibling.classList.remove('click');
            },300)
            // location.hash = `#${textField.textContent}`;
            // Handlers.locationHashChanged(textField.textContent);
        })
    }

    static addListenerHashChanged() {
        window.addEventListener('hashchange', async () => {
            const clients = await Fetch.getClients(false);
            const app = document.querySelector('#app');
            clients.forEach((client) => {
                if (location.hash === `#${client.id}`) {
                    const modalClient = new CreateClient(client);
                    const modalWrap = modalClient.createForm(app);
                    UiEffects.slideOut(modalWrap);
                    Modal.createOverlayModal(app);
                }
            })
        })
    }

    static locationHashChanged(clientId) {
        window.addEventListener('hashchange', async function hashListener ()  {
            const app = document.querySelector('#app');
            if (clientId) {
                if (location.hash === `#${clientId}`) {
                    const { clientData } = await Fetch.getClientData(clientId);
                    const modalClient = new CreateClient(clientData);
                    const modalWrap = modalClient.createForm(app);
                    UiEffects.slideOut(modalWrap);
                    Modal.createOverlayModal(app);
                    window.removeEventListener('hashchange', hashListener);
                }
            } else {
                console.log('Пустой id');
            }
        });
    }
}
