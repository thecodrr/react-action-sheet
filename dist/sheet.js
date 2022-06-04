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
import * as ReactDOM from 'react-dom';
import { animate, useMotionValue, AnimatePresence, } from 'framer-motion';
import { getClosest, inDescendingOrder, isSSR, useWindowHeight } from './utils';
import { SheetContext } from './context';
import { useModalEffect } from './hooks';
import styles from './styles';
var Sheet = React.forwardRef(function (_a, ref) {
    var children = _a.children, isOpen = _a.isOpen, onClose = _a.onClose, onOpenStart = _a.onOpenStart, onOpenEnd = _a.onOpenEnd, onCloseStart = _a.onCloseStart, onCloseEnd = _a.onCloseEnd, onSnap = _a.onSnap, snapPoints = _a.snapPoints, _b = _a.initialSnap, initialSnap = _b === void 0 ? 0 : _b, rootId = _a.rootId, _c = _a.springConfig, springConfig = _c === void 0 ? { stiffness: 300, damping: 30, mass: 0.2 } : _c, _d = _a.disableDrag, disableDrag = _d === void 0 ? false : _d, rest = __rest(_a, ["children", "isOpen", "onClose", "onOpenStart", "onOpenEnd", "onCloseStart", "onCloseEnd", "onSnap", "snapPoints", "initialSnap", "rootId", "springConfig", "disableDrag"]);
    var sheetRef = React.useRef(null);
    var callbacks = React.useRef({ onOpenStart: onOpenStart, onOpenEnd: onOpenEnd, onCloseStart: onCloseStart, onCloseEnd: onCloseEnd }); // prettier-ignore
    var indicatorRotation = useMotionValue(0);
    var windowHeight = useWindowHeight();
    // NOTE: the inital value for `y` doesn't matter since it is overwritten by
    // the value driven by the `AnimatePresence` component when the sheet is opened
    // and after that it is driven by the gestures and/or snapping
    var y = useMotionValue(0);
    if (snapPoints) {
        // Convert negative / percentage snap points to absolute values
        snapPoints = snapPoints.map(function (point) {
            if (point > 0 && point <= 1)
                return point * windowHeight; // percentage values e.g. between 0.0 and 1.0
            return point < 0 ? windowHeight + point : point; // negative values
        });
        console.assert(inDescendingOrder(snapPoints) || windowHeight === 0, "Snap points need to be in descending order got: [".concat(snapPoints, "]"));
    }
    var handleDrag = React.useCallback(function (_, _a) {
        var delta = _a.delta;
        // Update drag indicator rotation based on drag velocity
        var velocity = y.getVelocity();
        if (velocity > 0)
            indicatorRotation.set(10);
        if (velocity < 0)
            indicatorRotation.set(-10);
        // Make sure user cannot drag beyond the top of the sheet
        y.set(Math.max(y.get() + delta.y, 0));
    }, []); // eslint-disable-line
    var handleDragEnd = React.useCallback(function (_, _a) {
        var velocity = _a.velocity;
        if (velocity.y > 500) {
            // User flicked the sheet down
            onClose();
        }
        else {
            var sheetEl = sheetRef.current;
            var contentHeight_1 = sheetEl.getBoundingClientRect().height;
            var snapTo = snapPoints
                ? getClosest(snapPoints.map(function (p) { return contentHeight_1 - p; }), y.get()) // prettier-ignore
                : y.get() / contentHeight_1 > 0.6 // Close if dragged over 60%
                    ? contentHeight_1
                    : 0;
            // Update the spring value so that the sheet is animated to the snap point
            animate(y, snapTo, __assign({ type: 'spring' }, springConfig));
            if (snapPoints && onSnap) {
                var snapValue = Math.abs(Math.round(snapPoints[0] - snapTo));
                var snapIndex = snapPoints.indexOf(snapValue);
                onSnap(snapIndex);
            }
            if (snapTo >= contentHeight_1)
                onClose();
        }
        // Reset indicator rotation after dragging
        indicatorRotation.set(0);
    }, [onClose, onSnap] // eslint-disable-line
    );
    // Keep the callback fns up-to-date so that they can be accessed inside
    // the effect without including them to the dependencies array
    React.useEffect(function () {
        callbacks.current = { onOpenStart: onOpenStart, onOpenEnd: onOpenEnd, onCloseStart: onCloseStart, onCloseEnd: onCloseEnd };
    });
    // Trigger onSnap callback when sheet is opened or closed
    React.useEffect(function () {
        if (!snapPoints || !onSnap)
            return;
        var snapIndex = isOpen ? initialSnap : snapPoints.length - 1;
        onSnap(snapIndex);
    }, [isOpen]); // eslint-disable-line
    React.useImperativeHandle(ref, function () { return ({
        y: y,
        snapTo: function (snapIndex) {
            var sheetEl = sheetRef.current;
            if (snapPoints &&
                snapPoints[snapIndex] !== undefined &&
                sheetEl !== null) {
                var contentHeight = sheetEl.getBoundingClientRect().height;
                var snapTo = contentHeight - snapPoints[snapIndex];
                animate(y, snapTo, __assign({ type: 'spring' }, springConfig));
                if (onSnap)
                    onSnap(snapIndex);
                if (snapTo >= contentHeight)
                    onClose();
            }
        }
    }); });
    useModalEffect(isOpen, rootId);
    var dragProps = disableDrag
        ? {}
        : {
            drag: 'y',
            dragElastic: 0,
            dragConstraints: { top: 0, bottom: 0 },
            dragMomentum: false,
            onDrag: handleDrag,
            onDragEnd: handleDragEnd
        };
    var context = {
        y: y,
        sheetRef: sheetRef,
        isOpen: isOpen,
        initialSnap: initialSnap,
        snapPoints: snapPoints,
        indicatorRotation: indicatorRotation,
        callbacks: callbacks,
        dragProps: dragProps,
        windowHeight: windowHeight,
        springConfig: springConfig
    };
    var wrapperProps = __assign(__assign({}, rest), { ref: ref, style: styles.wrapper });
    var sheet = (React.createElement(SheetContext.Provider, { value: context },
        React.createElement("div", __assign({}, wrapperProps),
            React.createElement(AnimatePresence, null, isOpen
                ? React.Children.map(children, function (child, i) {
                    return React.cloneElement(child, { key: "sheet-child-".concat(i) });
                })
                : null))));
    if (isSSR)
        return sheet;
    return ReactDOM.createPortal(sheet, document.body);
});
export default Sheet;
//# sourceMappingURL=sheet.js.map