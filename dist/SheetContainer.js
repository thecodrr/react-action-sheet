var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
import * as React from 'react';
import { motion } from 'framer-motion';
import mergeRefs from 'react-merge-refs';
import { useSheetContext } from './context';
import { useEventCallbacks } from './hooks';
import styles from './styles';
var MAX_HEIGHT = 'calc(100% - env(safe-area-inset-top) - 34px)';
var SheetContainer = React.forwardRef(function (_a, ref) {
    var children = _a.children, _b = _a.style, style = _b === void 0 ? {} : _b, rest = __rest(_a, ["children", "style"]);
    var _c = useSheetContext(), y = _c.y, isOpen = _c.isOpen, callbacks = _c.callbacks, snapPoints = _c.snapPoints, _d = _c.initialSnap, initialSnap = _d === void 0 ? 0 : _d, sheetRef = _c.sheetRef, windowHeight = _c.windowHeight, springConfig = _c.springConfig;
    var handleAnimationComplete = useEventCallbacks(isOpen, callbacks).handleAnimationComplete;
    var initialY = snapPoints ? snapPoints[0] - snapPoints[initialSnap] : 0;
    var h = (snapPoints === null || snapPoints === void 0 ? void 0 : snapPoints.length) ? "".concat(snapPoints[0], "px") : 'auto';
    var sheetHeight = h ? "min(".concat(h, ", ").concat(MAX_HEIGHT, ")") : MAX_HEIGHT;
    return (React.createElement(motion.div, __assign({}, rest, { ref: mergeRefs([sheetRef, ref]), className: "react-modal-sheet-container", style: __assign(__assign(__assign(__assign({}, styles.container), { height: sheetHeight }), style), { y: y }), initial: { y: windowHeight }, animate: {
            y: initialY,
            transition: __assign({ type: 'spring' }, springConfig)
        }, exit: { y: windowHeight }, onAnimationComplete: handleAnimationComplete }), children));
});
export default SheetContainer;
//# sourceMappingURL=SheetContainer.js.map