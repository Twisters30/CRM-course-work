export default class UiEffects {
    static slideOut(modal) {
        modal.style.top = '50%';
        modal.style.opacity = '1';
        modal.style.transition = '500ms';
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
}
