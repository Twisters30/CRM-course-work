export default class UiEffects {

    static hoverTooltip(iconsContainer) {
        iconsContainer.addEventListener('mouseover', e => {
            if (e.target.tagName !== 'SPAN' && e.target.classList !== 'icon__contact') return
            if (!e.target.nextSibling) return;
            e.target.nextSibling.style.opacity = '1'
            e.target.addEventListener('mouseout', function() {
                this.nextSibling.style.opacity = '0';
            })
        })
    }

    static slideOut(modal) {
        if (!modal) return;
        modal.style.transition = '500ms';
        setTimeout(() => {
            modal.style.top = '50%';
            modal.style.opacity = '1';
        },100)
    }

    static onHoverScale(icon, bgColor) {
        icon.addEventListener('mouseover', () => {
            icon.style.transform = 'scale(1.2)';
            icon.parentElement.classList.add(bgColor);
            icon.parentElement.style.transition = '500ms';
            icon.addEventListener('mouseleave', function () {
                icon.style.transform = 'scale(1)';
                icon.parentElement.classList.remove(bgColor);
            })
        })
    }

    static btnSuccess(btn) {
        btn.classList.add('bg-success');
        setTimeout(() => {
            btn.classList.remove('bg-success');
        },500);
    }

    static btnError(btn) {
        btn.classList.add('bg-danger');
        setTimeout(() => {
            btn.classList.remove('bg-danger');
        },500);
    }

    static highlightInput(input) {
        input.style.transition = '300ms';
        input.classList.add('bg-danger');
        setTimeout(() => {
            input.classList.remove('bg-danger');
        },500)
    }

    static highlightTableRow(arr) {
        arr.forEach((el) => el.classList.add('highlight-sort'));
    }

    static loader(container = document.querySelector('#app')) {
        const loaderWrap = document.createElement('div');
        const div1 = document.createElement('div');
        const div2 = document.createElement('div');
        const div3 = document.createElement('div');
        const div4 = document.createElement('div');

        loaderWrap.classList.add('lds-ring');
        loaderWrap.append(div1, div2, div3, div4);
        container.append(loaderWrap);
    }

    static removeLoader() {
        document.querySelector('.lds-ring').remove();
    }

    static inputActive(element) {
        const titles = element.querySelectorAll('span');
        titles.forEach((el) => {
            el.style.transform = 'translateY(0px)';
        })
    }
}
