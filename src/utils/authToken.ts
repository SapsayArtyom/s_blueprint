const AUTH_TOKEN_STORAGE_KEY = 'sb.auth_token';

function readStorage(storage: Storage): string | null {
    try {
        return storage.getItem(AUTH_TOKEN_STORAGE_KEY);
    } catch {
        return null;
    }
}

function writeStorage(storage: Storage, token: string): boolean {
    try {
        storage.setItem(AUTH_TOKEN_STORAGE_KEY, token);
        return true;
    } catch {
        return false;
    }
}

function removeStorage(storage: Storage): void {
    try {
        storage.removeItem(AUTH_TOKEN_STORAGE_KEY);
    } catch {
        // Ignore storage access errors in restricted browser modes.
    }
}

export function getAuthToken(): string | null {
    return readStorage(localStorage) ?? readStorage(sessionStorage);
}

export function setAuthToken(token: string): void {
    const normalizedToken = token.trim();
    if (!normalizedToken) {
        return;
    }

    const writtenToLocal = writeStorage(localStorage, normalizedToken);
    if (!writtenToLocal) {
        writeStorage(sessionStorage, normalizedToken);
    }
}

export function clearAuthToken(): void {
    removeStorage(localStorage);
    removeStorage(sessionStorage);
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
