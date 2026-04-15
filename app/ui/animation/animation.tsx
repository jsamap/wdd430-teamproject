import { request } from "http";

export function flyToCart(imageEl: HTMLImageElement, cartIconEl: HTMLElement) {
    const imageReact = imageEl.getBoundingClientRect();
    const cartReact = cartIconEl.getBoundingClientRect();

    const clone = imageEl.cloneNode(true) as HTMLImageElement;
    clone.style.position = "fixed";
    clone.style.left = `${imageReact.left}px`;
    clone.style.top = `${imageReact.top}px`;
    clone.style.width = `${imageReact.width}px`;
    clone.style.height = `${imageReact.height}px`;
    clone.style.transition = "all 1.5s cubic-bezier(0.4, 0, 0.2, 1)";
    clone.style.zIndex = "1000";
    clone.style.pointerEvents = "none";
    document.body.appendChild(clone);

    requestAnimationFrame(() => {
        clone.style.left = cartReact.left + "px";
        clone.style.top = cartReact.top + "px";
        clone.style.width = "20px";
        clone.style.height = "20px";
        clone.style.opacity = "0.5";

    });

    clone.addEventListener("transitionend", () => {
        clone.remove();
    });
}