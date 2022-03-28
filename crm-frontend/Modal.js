import CreateClient from './CreateClient.js';
import Handlers from './Handlers.js';
import path from './variables.js';

export default class Modal {
    createConfirmModal(container) {
        if (document.querySelector('#modal-confirm')) return;
        const createClient = new CreateClient();
        const wrapModal = document.createElement('div');
        const titleModal = document.createElement('h3');
        const messageModal = document.createElement('p');
        const btnDeleteModal = createClient.createMainBtnClient('Удалить', 'btn-confirm-delete');
        const btnConfirmCancel = createClient.createBtnClient('Отмена', 'btn-confirm-cancel');
        const btnCloseModal = Modal.closeModalBtn();

        wrapModal.classList.add('d-flex', 'flex-column', 'bg-white', 'position-fixed', 'text-center');
        wrapModal.style.top = '-50%';
        wrapModal.style.left = '50%';
        wrapModal.style.transform = 'translate(-50%, -50%)';
        wrapModal.style.padding = '22px 20px 27px 22px';
        wrapModal.style.transition = '300ms';
        wrapModal.style.opacity = '0';
        wrapModal.id = 'modal-confirm';
        titleModal.style.marginBottom = '11px';
        messageModal.style.margin = '0 auto 25px';
        messageModal.style.maxWidth = '270px';
        wrapModal.style.zIndex = '999';
        wrapModal.style.width = '450px';
        titleModal.textContent = 'Удалить клиента';
        messageModal.textContent = 'Вы действительно хотите удалить данного клиента?';
        Handlers.clickCloseModal(btnCloseModal, wrapModal);
        wrapModal.append(titleModal, messageModal, btnDeleteModal, btnConfirmCancel, btnCloseModal);
        container.append(wrapModal);
        Handlers.clickCloseModal(btnConfirmCancel, wrapModal);
        return {
            wrapModal,
            btnDeleteModal,
            btnConfirmCancel
        };
    }

    static createOverlayModal(container) {
        const overlay = document.createElement('div');
        overlay.classList.add('position-fixed');
        overlay.style.height = '100%';
        overlay.style.width = '100%';
        overlay.style.zIndex = '900';
        overlay.style.top = '0';
        overlay.style.opacity = '.8';
        overlay.style.backgroundColor = '#333';
        overlay.id = 'modal-overlay';
        container.append(overlay);
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
}
