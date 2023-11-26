export function menuFade(node) {
    return {
        duration: 200,
        css: t => {
            return `
                margin-top: ${(1 - t * 1) + 0.5}rem;
                opacity: ${t};
            `;
        }
    };
}