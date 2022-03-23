import CreateClient from './CreateClient.js';
import Handlers from './Handlers.js';

export default class Modal {
    createConfirmModal(container) {
        if (document.querySelector('#modal-confirm')) return;
        const createClient = new CreateClient();
        const wrapModal = document.createElement('div');
        const titleModal = document.createElement('h3');
        const messageModal = document.createElement('p');
        const btnDeleteModal = createClient.createMainBtnClient('Удалить', 'btn-confirm-delete');
        const btnConfirmCancel = createClient.createBtnClient('Отмена', 'btn-confirm-cancel');
        const btnCloseModal = Handlers.closeModalBtn();

        wrapModal.classList.add('d-flex', 'flex-column', 'bg-white', 'position-absolute', 'text-center');
        wrapModal.style.top = '-100%';
        wrapModal.style.left = '50%';
        wrapModal.style.transform = 'translate(-50%, -50%)';
        wrapModal.style.padding = '22px 20px 27px 22px';
        wrapModal.style.transition = '300ms';
        wrapModal.style.opacity = '0';
        wrapModal.id = 'modal-confirm';
        titleModal.style.marginBottom = '11px';
        messageModal.style.marginBottom = '25px';
        titleModal.textContent = 'Удалить клиента';
        messageModal.textContent = 'Вы действительно хотите удалить данного клиента?';
        Handlers.clickCloseModalBtn(btnCloseModal, wrapModal);
        wrapModal.append(titleModal, messageModal, btnDeleteModal, btnConfirmCancel, btnCloseModal);
        container.append(wrapModal);
        return {
            wrapModal,
            btnDeleteModal,
            btnConfirmCancel
        };
    }
}
