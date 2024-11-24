import { TOKEN_LOCALSTORAGE_KEY } from '@/api/constants';

export const useApi = (apiUrl: string) => {
    const getCsrfToken = async () => {
        const response = await fetch(`${apiUrl}/csrf/`, {
            method: 'GET',
            credentials: 'include',
        });

        const csrfObject = await response.json();
        const csrf = csrfObject.csrfToken;

        return { csrf };
    };

    const GET = async (path: string, queryParams?: any) => {
        let url = `${apiUrl}${path}`;

        const token = localStorage.getItem(TOKEN_LOCALSTORAGE_KEY) || '';

        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': token ? `Bearer ${token}` : '',
            },
        });

        return await response.json();
    };

    const POST = async (path: string, data: any) => {
        const { csrf } = await getCsrfToken();

        let url = `${apiUrl}${path}`;
        const token = localStorage.getItem(TOKEN_LOCALSTORAGE_KEY) || '';

        if (!url.endsWith('/')) {
            url += '/';
        }

        const response = await fetch(url, {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json',
                'X-CSRF-Token': csrf,
                'Authorization': token ? `Bearer ${token}` : '',
            },
        });

        return await response.json();
    };

    return {
        GET,
        POST
    }
}
