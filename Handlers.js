import path from './variables.js';
import CreateClient from './CreateClient.js';
import Helper from './Helper.js';
import FormHandlers from './FormHandlers.js';

export default class Handlers {

    static clickSaveClientData(btn) {
        btn.addEventListener('click', () => {
            FormHandlers.submitFormClient();
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

    static handlerTooltip() {
        let icons = document.querySelector('.icons__list');
        icons.addEventListener('mouseover', e => {
            if (e.target.tagName !== 'SPAN' && e.target.classList !== 'icon__contact') return
            if (!e.target.nextSibling) return;
            e.target.nextSibling.style.opacity = '1'
            e.target.addEventListener('mouseout', function() {
                this.nextSibling.style.opacity = '0';
            })
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

    static clickDropdown(btn) {
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
            if (target.closest('li')) {
                let btnDropdown = target.parentElement.previousSibling;
                let input = btnDropdown.parentElement.nextSibling;
                btnDropdown.textContent = target.textContent;
                const dataText = Helper.parseAttributeInput(btnDropdown);
                if (input.hasAttributes()) {
                    const attributes = input.attributes;
                    for (let i = 0; i < attributes.length;i++) {
                        if (attributes[i].name === 'style') {
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
