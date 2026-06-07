const AUTH_TOKEN_STORAGE_KEY = 'sb.auth_token';

export function getAuthToken(): string | null {
    return localStorage.getItem(AUTH_TOKEN_STORAGE_KEY);
}

export function setAuthToken(token: string): void {
    localStorage.setItem(AUTH_TOKEN_STORAGE_KEY, token);
}

export function clearAuthToken(): void {
    localStorage.removeItem(AUTH_TOKEN_STORAGE_KEY);
}

export function captureAuthTokenFromUrl(): string | null {
    const url = new URL(window.location.href);
    const token = url.searchParams.get('auth_token');

    if (!token) {
        return null;
    }

    setAuthToken(token);
    url.searchParams.delete('auth_token');
    window.history.replaceState({}, document.title, url.toString());

    return token;
}
