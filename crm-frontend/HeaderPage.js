import FormHandlers from './FormHandlers.js';

export default class HeaderPage {
    createHeader() {
        const header = document.createElement('header');
        const container = document.createElement('div')
        const row = document.createElement('div');
        const colLogo = document.createElement('div');
        const colSearch = document.createElement('div');
        const logoImg = document.createElement('img');
        const logoWrapper = document.createElement('div');
        const searchInput = document.createElement('input');
        const wrapHeaderContent = document.createElement('div');
        const formHeaderPage = document.createElement('form');

        logoImg.src = './assets/img/logo-skb.svg';
        logoWrapper.style.width = '50px';
        logoWrapper.style.height = '50px';
        wrapHeaderContent.style.width = '100%';
        wrapHeaderContent.style.height = '100%';
        wrapHeaderContent.style.padding = '23px 20px'
        searchInput.style.width = '100%';
        searchInput.placeholder = 'Введите текст';
        searchInput.style.padding = '12px 16px 13px';
        searchInput.style.border = '1px solid rgba(51, 51, 51, 0.2)';
        header.style.backgroundColor = '#fff';
        header.style.boxShadow = `0px 9.03012px 27.0904px rgba(176, 190, 197, 0.32),
                                  0px 3.38629px 5.64383px rgba(176, 190, 197, 0.32)`;

        formHeaderPage.classList.add('header-form');
        searchInput.classList.add('input-search');
        container.classList.add('container');
        row.classList.add('row');
        colLogo.classList.add('col');
        colSearch.classList.add('col-sm-10');
        logoImg.classList.add('img-fluid');
        wrapHeaderContent.classList.add('d-flex', 'justify-content-start', 'align-items-center');

        formHeaderPage.append(searchInput)
        logoWrapper.append(logoImg);
        colLogo.append(logoWrapper);
        colSearch.append(formHeaderPage);
        wrapHeaderContent.append(colLogo, colSearch)
        row.append(wrapHeaderContent)

        header.append(container);
        container.append(row);

        FormHandlers.searchClient(searchInput);

        return header;
    }
}
