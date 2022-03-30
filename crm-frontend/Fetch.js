import path from './variables.js';
import Helper from './Helper.js';
import UiEffects from './Ui-effects.js';

export default class Fetch {

    static async updateClient(client, id) {
        const requestOptions = {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(client)
        };
        try {
            const response = await fetch(path.api + path.patchClient + id, requestOptions);
            const status = response.status;
            return status;
        } catch (error) {
            console.log(error, 'Не удалось обновить данные клиента');
        }
    }

    static async getClientData(id) {
        const requestOptions = {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
        };
        try {
            UiEffects.loader();
            const response = await fetch(path.api + path.getClient + id, requestOptions);
            const clientData = await response.json();
            const status = response.status;
            if (response.status === (200 || 201)) {
                UiEffects.removeLoader();
            }
            return { status, clientData }
        } catch (error) {
            UiEffects.removeLoader();
            console.log(error, 'Не удалось получить данные клиента');
        }
    }

    static async deleteClient(id) {
        const requestOptions = {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(id)
        };
        try {
            const response = await fetch(path.api + path.deleteClient + id, requestOptions);
            const status = response.status;
            return status;
        } catch (error) {
            console.log(error, 'Не удалось удалить клиента');
        }
    }

    static async postClient(client) {
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(client)
        };
        try {
            const response = await fetch(path.api + path.postClient, requestOptions);
            const status = response.status;
            return status;
        } catch (error) {
            console.log(error, 'Не удалось добавить клиента');
        }
    }

    static async getClients(parse = false) {
        const requestOptions = {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
        };
        try {
            UiEffects.loader();
            const response = await fetch(path.api + path.getListClient, requestOptions);
            if (response.status === (200 || 201)) {
                UiEffects.removeLoader();
                const data = await response.json();
                if (parse) {
                    return Helper.parseResponseClientList(data);
                } else {
                    return data;
                }

            }
        } catch (error) {
            UiEffects.removeLoader();
            console.log(error, 'Не удалось добавить клиента');
        }
    }

    static async searchClients(inputValue) {
        const requestOptions = {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        };
        try {
            const response = await fetch(path.api + path.getListClient + path.search + inputValue, requestOptions);
            const data = await response.json();
            return Helper.parseResponseClientList(data);
        } catch (error) {
            console.log(error, 'Не удалось добавить клиента');
        }
    }
}
