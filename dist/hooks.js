import * as React from 'react';
import { applyRootStyles, cleanupRootStyles } from './utils';
export var useModalEffect = function (isOpen, rootId) {
    var prevOpen = usePrevious(isOpen);
    // Automatically apply the iOS modal effect to the body when sheet opens/closes
    React.useEffect(function () {
        if (rootId && !prevOpen && isOpen) {
            applyRootStyles(rootId);
        }
        else if (rootId && !isOpen && prevOpen) {
            cleanupRootStyles(rootId);
        }
    }, [isOpen, prevOpen]); // eslint-disable-line
    // Make sure to cleanup modal styles on unmount
    React.useEffect(function () {
        return function () {
            if (rootId && isOpen)
                cleanupRootStyles(rootId);
        };
    }, [isOpen]); // eslint-disable-line
};
export var useEventCallbacks = function (isOpen, callbacks) {
    var prevOpen = usePrevious(isOpen);
    var didOpen = React.useRef(false);
    // Because of AnimatePrecence we don't have access to latest isOpen value
    // so we need to read and write to a ref to determine if we are
    // opening or closing the sheet
    var handleAnimationComplete = React.useCallback(function () {
        var _a, _b, _c, _d;
        if (!didOpen.current) {
            (_b = (_a = callbacks.current).onOpenEnd) === null || _b === void 0 ? void 0 : _b.call(_a);
            didOpen.current = true;
        }
        else {
            (_d = (_c = callbacks.current).onCloseEnd) === null || _d === void 0 ? void 0 : _d.call(_c);
            didOpen.current = false;
        }
    }, [isOpen, prevOpen]); // eslint-disable-line
    React.useEffect(function () {
        var _a, _b, _c, _d;
        if (!prevOpen && isOpen) {
            (_b = (_a = callbacks.current).onOpenStart) === null || _b === void 0 ? void 0 : _b.call(_a);
        }
        else if (!isOpen && prevOpen) {
            (_d = (_c = callbacks.current).onCloseStart) === null || _d === void 0 ? void 0 : _d.call(_c);
        }
    }, [isOpen, prevOpen]); // eslint-disable-line
    return { handleAnimationComplete: handleAnimationComplete };
};
var usePrevious = function (state) {
    var ref = React.useRef();
    React.useEffect(function () {
        ref.current = state;
    });
    return ref.current;
};
//# sourceMappingURL=hooks.js.map