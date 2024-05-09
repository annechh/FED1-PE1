
export function fontawsomeScript() {
    let head = document.querySelector('head')
    let fontScript = document.createElement('script');
        fontScript.src = 'https://kit.fontawesome.com/aacfbda896.js';
        fontScript.crossorigin = 'anonymous';


    head.appendChild(fontScript)
}

fontawsomeScript()