export function sanitizeTwitterHandle(handle: string): string {
    let h1: string = handle.trim();
    if (h1[0] == '@') {
        return h1.substring(1);
    }
    return h1;
}