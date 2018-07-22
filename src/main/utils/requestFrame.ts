export function requestFrame(callback: () => void): void {
    if (typeof window.requestAnimationFrame === 'function') {
        window.requestAnimationFrame(callback)

    } else {
        setTimeout(callback, (1000 / 60))
    }
}
