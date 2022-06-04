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
import { motion, useTransform } from 'framer-motion';
import { useSheetContext } from './context';
import styles from './styles';
var SheetHeader = React.forwardRef(function (_a, ref) {
    var children = _a.children, _b = _a.disableDrag, disableDrag = _b === void 0 ? false : _b, _c = _a.style, style = _c === void 0 ? {} : _c, rest = __rest(_a, ["children", "disableDrag", "style"]);
    var _d = useSheetContext(), indicatorRotation = _d.indicatorRotation, dragProps = _d.dragProps;
    var indicator1Transform = useTransform(indicatorRotation, function (r) { return "translateX(2px) rotate(".concat(r, "deg)"); });
    var indicator2Transform = useTransform(indicatorRotation, function (r) { return "translateX(-2px) rotate(".concat(-1 * r, "deg)"); });
    return (React.createElement(motion.div, __assign({}, rest, { ref: ref, style: __assign(__assign({}, styles.headerWrapper), style) }, (disableDrag ? {} : dragProps)), children || (React.createElement("div", { className: "react-modal-sheet-header", style: styles.header },
        React.createElement(motion.span, { className: "react-modal-sheet-drag-indicator", style: __assign(__assign({}, styles.indicator), { transform: indicator1Transform }) }),
        React.createElement(motion.span, { className: "react-modal-sheet-drag-indicator", style: __assign(__assign({}, styles.indicator), { transform: indicator2Transform }) })))));
});
export default SheetHeader;
//# sourceMappingURL=SheetHeader.js.map