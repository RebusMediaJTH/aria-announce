import "./main.scss";
import DEFAULTS from "./defaults";

let node, timeoutId;

const stripHTMLTags = html => {
    const tmp = document.createElement("div");
    tmp.innerHTML = html;
    return tmp.innerText;
};

const reset = () => {
    if (!node) {
        return;
    }
    node.innerHTML = "";
    if (DEFAULTS.test) {
        node.classList.remove("has-text");
    }
    if (DEFAULTS.assertive !== node.getAttribute("aria-live")) {
        node.setAttribute("aria-live", DEFAULTS.assertive ? "assertive" : "polite");
    }
    if (DEFAULTS.atomic !== node.getAttribute("aria-atomic")) {
        node.setAttribute("aria-atomic", DEFAULTS.atomic);
    }
};

const clear = () => {
    window.clearTimeout(timeoutId);
    reset();
};

const announce = (text, options) => {
    options = options || {};
    if (undefined !== options.assertive && options.assertive !== DEFAULTS.assertive) {
        node.setAttribute("aria-live", options.assertive ? "assertive" : "polite");
    }
    if (undefined !== options.atomic && options.atomic !== DEFAULTS.atomic) {
        node.setAttribute("aria-atomic", options.atomic);
    }
    options = Object.assign({}, DEFAULTS, options);
    text = options.stripHTMLTags ? stripHTMLTags(text) : text;
    const sameContent = text === node.innerHTML;
    window.clearTimeout(timeoutId);
    if (text && DEFAULTS.test) {
        node.classList.add("has-text");
    }
    if (sameContent) {
        node.innerHTML = "";
        if (DEFAULTS.test) {
            node.classList.remove("has-text");
        }
    }
    timeoutId = window.setTimeout(
        function () {
            node.innerHTML = text;
            if (DEFAULTS.test) {
                node.classList.add("has-text");
            }
            if (options.clearAfter !== -1 && text !== "") {
                timeoutId = window.setTimeout(reset, options.clearAfter * 1000);
            }
        },
        sameContent ? 100 : 0
    );
};

announce.init = options => {
    Object.assign(DEFAULTS, options);
    const appendTo = document.querySelector(DEFAULTS.appendTo || "body");
    if (!appendTo) {
        console.error(`aria-announce attempted to access non-existent DOM node: "${options.appendTo}"`);
        return;
    }
    node = document.createElement("div");
    node.setAttribute("id", "aria-alerts-container");
    node.setAttribute("aria-live", options.assertive ? "assertive" : "polite");
    node.setAttribute("aria-atomic", options.atomic ? "true" : "false");
    if (DEFAULTS.test) {
        node.classList.add("testing");
        node.addEventListener("click", clear);
    }
    appendTo.append(node);
};

export default announce;
