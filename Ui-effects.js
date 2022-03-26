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
}
