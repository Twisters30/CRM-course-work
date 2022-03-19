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
        const navBar = document.createElement('nav');

        logoImg.src = './assets/img/logo-skb.svg';
        logoWrapper.style.width = '50px';
        logoWrapper.style.height = '50px';
        navBar.style.width = '100%';
        navBar.style.padding = '23px 20px'
        searchInput.style.width = '100%';
        searchInput.placeholder = 'Введите текст';
        searchInput.style.padding = '12px 16px 13px';
        searchInput.style.border = '1px solid rgba(51, 51, 51, 0.2)';
        header.style.backgroundColor = '#fff';
        header.style.boxShadow = `0px 9.03012px 27.0904px rgba(176, 190, 197, 0.32),
                                  0px 3.38629px 5.64383px rgba(176, 190, 197, 0.32)`;

        searchInput.classList.add('input-search');
        container.classList.add('container');
        row.classList.add('row');
        colLogo.classList.add('col-2');
        colSearch.classList.add('col');
        logoImg.classList.add('img-fluid');
        navBar.classList.add('navbar', 'd-flex', 'justify-content-start');

        logoWrapper.append(logoImg);
        colLogo.append(logoWrapper);
        colSearch.append(searchInput);
        navBar.append(colLogo, colSearch)
        row.append(navBar)

        header.append(container);
        container.append(row);

        return header;
    }
}
