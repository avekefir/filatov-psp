class FetchService {
    /**
     * GET запрос
     * @param {string} url - Адрес запроса
     * @returns {Promise<any>}
     */
    async get(url) {
        try {
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            return { data, status: response.status };
        } catch (error) {
            console.error('GET request failed:', error);
            throw error;
        }
    }

    /**
     * POST запрос
     * @param {string} url - Адрес запроса
     * @param {object} data - Данные для отправки
     * @returns {Promise<any>}
     */
    async post(url, data) {
        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data)
            });
            const responseData = response.status !== 204 ? await response.json() : null;
            return { data: responseData, status: response.status };
        } catch (error) {
            console.error('POST request failed:', error);
            throw error;
        }
    }

    /**
     * PUT запрос
     * @param {string} url - Адрес запроса
     * @param {object} data - Данные для обновления
     * @returns {Promise<any>}
     */
    async put(url, data) {
        try {
            const response = await fetch(url, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data)
            });
            const responseData = response.status !== 204 ? await response.json() : null;
            return { data: responseData, status: response.status };
        } catch (error) {
            console.error('PUT request failed:', error);
            throw error;
        }
    }

    /**
     * DELETE запрос
     * @param {string} url - Адрес запроса
     * @returns {Promise<any>}
     */
    async delete(url) {
        try {
            const response = await fetch(url, {
                method: 'DELETE'
            });
            const responseData = response.status !== 204 ? await response.json() : null;
            return { data: responseData, status: response.status };
        } catch (error) {
            console.error('DELETE request failed:', error);
            throw error;
        }
    }
}

export const fetchService = new FetchService();