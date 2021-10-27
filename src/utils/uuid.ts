function generateUUID(): string {
    return Math.random().toString(36).slice(-6);
}

export {generateUUID}