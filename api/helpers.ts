import { TOKEN_LOCALSTORAGE_KEY } from '@/api/constants';

const getCsrfToken = async () => {
    const response = await fetch(`${process.env.API_URL}/csrf/`, {
        method: 'GET',
        credentials: 'include',
    });

    const csrfObject = await response.json();
    const csrf = csrfObject.csrfToken;

    return { csrf };
};

export const getRequest = async (path: string, queryParams?: any) => {
    let url = `${process.env.API_URL}${path}`;

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

export const postRequest = async (path: string, data: any) => {
    const { csrf } = await getCsrfToken();

    let url = `${process.env.API_URL}${path}`;
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
