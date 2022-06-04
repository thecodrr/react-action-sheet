import { useEffect, useLayoutEffect, useState } from 'react';
export var isSSR = typeof window === 'undefined';
export var getClosest = function (nums, goal) {
    return nums.reduce(function (prev, curr) {
        return Math.abs(curr - goal) < Math.abs(prev - goal) ? curr : prev;
    });
};
var highlightId = 'react-modal-sheet-highlight';
export function applyRootStyles(rootId) {
    var body = document.querySelector('body');
    var root = document.querySelector("#".concat(rootId));
    if (root) {
        var p = 24;
        var h = window.innerHeight;
        var s = (h - p) / h;
        body.style.backgroundColor = '#000';
        root.style.overflow = 'hidden';
        root.style.willChange = 'transform';
        root.style.transition = 'transform 200ms linear';
        root.style.transform = "translateY(calc(env(safe-area-inset-top) + ".concat(p / 2, "px)) scale(").concat(s, ")"); // prettier-ignore
        root.style.borderTopRightRadius = '10px';
        root.style.borderTopLeftRadius = '10px';
        // Add highlighed overlay to emphasize the modality effect
        var highlight_1 = document.createElement('div');
        highlight_1.setAttribute('aria-hidden', 'true');
        highlight_1.id = highlightId;
        highlight_1.style.position = 'absolute';
        highlight_1.style.top = '0px';
        highlight_1.style.left = '0px';
        highlight_1.style.bottom = '0px';
        highlight_1.style.right = '0px';
        highlight_1.style.opacity = '0';
        highlight_1.style.transition = 'opacity 200ms linear';
        highlight_1.style.backgroundColor = 'rgba(150, 150, 150, 0.1)';
        root.appendChild(highlight_1);
        requestAnimationFrame(function () { return (highlight_1.style.opacity = '1'); });
    }
}
export function cleanupRootStyles(rootId) {
    var body = document.querySelector('body');
    var root = document.getElementById(rootId);
    var highlight = document.getElementById(highlightId);
    function onTransitionEnd() {
        var _a;
        root.style.removeProperty('overflow');
        root.style.removeProperty('will-change');
        root.style.removeProperty('transition');
        body.style.removeProperty('background-color');
        root.removeEventListener('transitionend', onTransitionEnd);
        (_a = highlight.parentNode) === null || _a === void 0 ? void 0 : _a.removeChild(highlight);
    }
    if (root && highlight) {
        // Start animating back
        root.style.removeProperty('border-top-right-radius');
        root.style.removeProperty('border-top-left-radius');
        root.style.removeProperty('transform');
        highlight.style.opacity = '0';
        // Remove temp properties after animation is finished
        root.addEventListener('transitionend', onTransitionEnd);
    }
}
var useIsomorphicLayoutEffect = isSSR ? useEffect : useLayoutEffect;
export function useWindowHeight() {
    var _a = useState(0), windowHeight = _a[0], setWindowHeight = _a[1];
    useIsomorphicLayoutEffect(function () {
        var updateHeight = function () { return setWindowHeight(window.innerHeight); };
        window.addEventListener('resize', updateHeight);
        updateHeight();
        return function () { return window.removeEventListener('resize', updateHeight); };
    }, []);
    return windowHeight;
}
export var inDescendingOrder = function (arr) {
    for (var i = 0; i < arr.length; i++) {
        if (arr[i + 1] > arr[i])
            return false;
    }
    return true;
};
//# sourceMappingURL=utils.js.map