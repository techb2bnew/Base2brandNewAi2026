/**
 * Hand-off point between the builder (CmsPages) and the preview tab
 * (CmsPagePreview), so they can share data despite being separate browser
 * tabs with no direct React state connection.
 *
 * Uses localStorage, not sessionStorage: sessionStorage only gets CLONED
 * into a new tab at the moment window.open() creates it — after that the
 * two tabs' sessionStorage are independent, so edits made in the builder
 * after the preview tab was opened never reach it, even on reload.
 * localStorage is genuinely shared across every same-origin tab, so a
 * reload in the preview tab always reads whatever the builder wrote most
 * recently. CmsPages also writes on every edit (not just on the Preview
 * button click) so this stays current; see its `useEffect`.
 */
export const PREVIEW_STORAGE_KEY = "cms-preview-payload";

export function writePreviewPayload(payload) {
    try {
        localStorage.setItem(PREVIEW_STORAGE_KEY, JSON.stringify(payload));
        return true;
    } catch {
        return false;
    }
}

export function readPreviewPayload() {
    try {
        const raw = localStorage.getItem(PREVIEW_STORAGE_KEY);
        return raw ? JSON.parse(raw) : null;
    } catch {
        return null;
    }
}
