import path from './variables.js';
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
                const id = target.parentElement.parentElement.parentElement.querySelector('.id-client');
                const { status , clientData} = await Fetch.getClientData(id.id);
                const app = document.querySelector('#app')
                if (status === 200 || status === 201) {
                    const modalClient = new CreateClient(clientData);
                    const modalWrap = modalClient.createForm(app);
                    UiEffects.slideOut(modalWrap);
                    Modal.createOverlayModal(app)
                }
            }
        })
    }
    static closeOverlay() {
        const modalOverlay = document.querySelector('#modal-overlay');
        if (modalOverlay) modalOverlay.remove();
    }

    static closeModal(wrapModal) {
        wrapModal.style.transform = 'translate(-50%, -200%)';
        setTimeout(() => {
            wrapModal.remove();
        },200)
        Handlers.closeOverlay();
    }

    static clickConfirmDelete(wrapModal, btnDeleteModal) {
        wrapModal.addEventListener('click', async (e) => {
            const target = e.target;
            const idBtnDelete = `${ '#' + btnDeleteModal.id}`
            if (target.closest(idBtnDelete)) {
                const id = target.parentElement.parentElement.parentElement.querySelector('.id-client');
                const status = await Fetch.deleteClient(id.id);
                if (status === 200 || status === 201) {
                    const clients = await Fetch.getClients();
                    TableController.refreshTable(clients);
                    TableController.hideTable();
                    Helper.titlePlugPage();
                    Handlers.closeModal(wrapModal);
                } else {
                    console.log(status, 'Ошибка при удалении');
                }
                Handlers.closeOverlay();
            }
        })
    }

    static clickDeleteClientInTable(bodyTable) {
        bodyTable.addEventListener('click', async (e) => {
            const target = e.target;
            if (target.closest('.btn-delete')) {
                const { wrapModal, btnDeleteModal } = TableController.createModalConfirm();
                UiEffects.slideOut(wrapModal);
                Handlers.clickConfirmDelete(wrapModal, btnDeleteModal.querySelector('button'));
                Modal.createOverlayModal(document.querySelector('#app'));
            }
        })
    }

    static async clickSaveClientData(btnSubmit) {
        btnSubmit.addEventListener('click', async () => {
            const id = document.querySelector('#id-client').textContent.split(':')[1];
            const clientData = FormHandlers.submitFormClient();
            if (id) {
                const statusCode = await Fetch.updateClient(clientData, id);
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
            const clients = await Fetch.getClients();
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
            const containerApp = document.querySelector('#app');
            const modalWrap = modal.createForm(containerApp);
            Modal.createOverlayModal(document.querySelector('#app'));
            UiEffects.slideOut(modalWrap);
        })
    }

    static clickCloseModal(btn,modal) {
        btn.addEventListener('click', function () {
            Handlers.closeModal(modal);
            Handlers.closeOverlay();
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
