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
import styles from './styles';
var isClickable = function (props) { return !!props.onClick || !!props.onTap; };
var SheetBackdrop = React.forwardRef(function (_a, ref) {
    var _b = _a.style, style = _b === void 0 ? {} : _b, rest = __rest(_a, ["style"]);
    var Comp = isClickable(rest) ? motion.button : motion.div;
    var pointerEvents = isClickable(rest) ? 'auto' : 'none';
    return (React.createElement(Comp, __assign({}, rest, { ref: ref, className: "react-modal-sheet-backdrop", style: __assign(__assign(__assign({}, styles.backdrop), style), { pointerEvents: pointerEvents }), initial: { opacity: 0 }, animate: { opacity: 1 }, exit: { opacity: 0 } })));
});
export default SheetBackdrop;
//# sourceMappingURL=SheetBackdrop.js.map