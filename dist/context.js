import * as React from 'react';
export var SheetContext = React.createContext(undefined);
export var useSheetContext = function () {
    var context = React.useContext(SheetContext);
    if (!context)
        throw Error('Sheet context error');
    return context;
};
//# sourceMappingURL=context.js.map