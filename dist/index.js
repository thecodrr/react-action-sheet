import Sheet from './sheet';
import SheetContainer from './SheetContainer';
import SheetContent from './SheetContent';
import SheetHeader from './SheetHeader';
import SheetBackdrop from './SheetBackdrop';
// HACK: this is needed to get the typing to work properly...
var _Sheet = Sheet;
_Sheet.Container = SheetContainer;
_Sheet.Header = SheetHeader;
_Sheet.Content = SheetContent;
_Sheet.Backdrop = SheetBackdrop;
var SheetCompound = _Sheet;
export default SheetCompound;
//# sourceMappingURL=index.js.map