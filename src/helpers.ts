export function sanitizeTwitterHandle(handle: string) {
    return handle.trim().replace('@', '');
}