/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
import { fromEvent } from 'rxjs';
import { filter, map, takeUntil, withLatestFrom } from 'rxjs/operators';
import { Key } from '../util/key';
/** @type {?} */
var FOCUSABLE_ELEMENTS_SELECTOR = [
    'a[href]', 'button:not([disabled])', 'input:not([disabled]):not([type="hidden"])', 'select:not([disabled])',
    'textarea:not([disabled])', '[contenteditable]', '[tabindex]:not([tabindex="-1"])'
].join(', ');
/**
 * Returns first and last focusable elements inside of a given element based on specific CSS selector
 * @param {?} element
 * @return {?}
 */
function getFocusableBoundaryElements(element) {
    /** @type {?} */
    var list = element.querySelectorAll(FOCUSABLE_ELEMENTS_SELECTOR);
    return [list[0], list[list.length - 1]];
}
/** *
 * Function that enforces browser focus to be trapped inside a DOM element.
 *
 * Works only for clicks inside the element and navigation with 'Tab', ignoring clicks outside of the element
 *
 * \@param element The element around which focus will be trapped inside
 * \@param stopFocusTrap$ The observable stream. When completed the focus trap will clean up listeners
 * and free internal resources
  @type {?} */
export var ngbFocusTrap = function (element, stopFocusTrap$) {
    /** @type {?} */
    var lastFocusedElement$ = fromEvent(element, 'focusin').pipe(takeUntil(stopFocusTrap$), map(function (e) { return e.target; }));
    // 'tab' / 'shift+tab' stream
    fromEvent(element, 'keydown')
        .pipe(takeUntil(stopFocusTrap$), filter(function (e) { return e.which === Key.Tab; }), withLatestFrom(lastFocusedElement$))
        .subscribe(function (_a) {
        var _b = tslib_1.__read(_a, 2), tabEvent = _b[0], focusedElement = _b[1];
        var _c = tslib_1.__read(getFocusableBoundaryElements(element), 2), first = _c[0], last = _c[1];
        if (focusedElement === first && tabEvent.shiftKey) {
            last.focus();
            tabEvent.preventDefault();
        }
        if (focusedElement === last && !tabEvent.shiftKey) {
            first.focus();
            tabEvent.preventDefault();
        }
    });
    // inside click
    fromEvent(element, 'click')
        .pipe(takeUntil(stopFocusTrap$), withLatestFrom(lastFocusedElement$), map(function (arr) { return (arr[1]); }))
        .subscribe(function (lastFocusedElement) { return lastFocusedElement.focus(); });
};

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZm9jdXMtdHJhcC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BuZy1ib290c3RyYXAvbmctYm9vdHN0cmFwLyIsInNvdXJjZXMiOlsidXRpbC9mb2N1cy10cmFwLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsT0FBTyxFQUFDLFNBQVMsRUFBYSxNQUFNLE1BQU0sQ0FBQztBQUMzQyxPQUFPLEVBQUMsTUFBTSxFQUFFLEdBQUcsRUFBRSxTQUFTLEVBQUUsY0FBYyxFQUFDLE1BQU0sZ0JBQWdCLENBQUM7QUFDdEUsT0FBTyxFQUFDLEdBQUcsRUFBQyxNQUFNLGFBQWEsQ0FBQzs7QUFFaEMsSUFBTSwyQkFBMkIsR0FBRztJQUNsQyxTQUFTLEVBQUUsd0JBQXdCLEVBQUUsNENBQTRDLEVBQUUsd0JBQXdCO0lBQzNHLDBCQUEwQixFQUFFLG1CQUFtQixFQUFFLGlDQUFpQztDQUNuRixDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQzs7Ozs7O0FBS2Isc0NBQXNDLE9BQW9COztJQUN4RCxJQUFNLElBQUksR0FBNEIsT0FBTyxDQUFDLGdCQUFnQixDQUFDLDJCQUEyQixDQUFDLENBQUM7SUFDNUYsTUFBTSxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7Q0FDekM7Ozs7Ozs7Ozs7QUFXRCxXQUFhLFlBQVksR0FBRyxVQUFDLE9BQW9CLEVBQUUsY0FBK0I7O0lBRWhGLElBQU0sbUJBQW1CLEdBQ3JCLFNBQVMsQ0FBYSxPQUFPLEVBQUUsU0FBUyxDQUFDLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxjQUFjLENBQUMsRUFBRSxHQUFHLENBQUMsVUFBQSxDQUFDLElBQUksT0FBQSxDQUFDLENBQUMsTUFBTSxFQUFSLENBQVEsQ0FBQyxDQUFDLENBQUM7O0lBR2xHLFNBQVMsQ0FBZ0IsT0FBTyxFQUFFLFNBQVMsQ0FBQztTQUN2QyxJQUFJLENBQUMsU0FBUyxDQUFDLGNBQWMsQ0FBQyxFQUFFLE1BQU0sQ0FBQyxVQUFBLENBQUMsSUFBSSxPQUFBLENBQUMsQ0FBQyxLQUFLLEtBQUssR0FBRyxDQUFDLEdBQUcsRUFBbkIsQ0FBbUIsQ0FBQyxFQUFFLGNBQWMsQ0FBQyxtQkFBbUIsQ0FBQyxDQUFDO1NBQ3RHLFNBQVMsQ0FBQyxVQUFDLEVBQTBCO1lBQTFCLDBCQUEwQixFQUF6QixnQkFBUSxFQUFFLHNCQUFjO1FBQ25DLG1FQUFNLGFBQUssRUFBRSxZQUFJLENBQTBDO1FBRTNELEVBQUUsQ0FBQyxDQUFDLGNBQWMsS0FBSyxLQUFLLElBQUksUUFBUSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUM7WUFDbEQsSUFBSSxDQUFDLEtBQUssRUFBRSxDQUFDO1lBQ2IsUUFBUSxDQUFDLGNBQWMsRUFBRSxDQUFDO1NBQzNCO1FBRUQsRUFBRSxDQUFDLENBQUMsY0FBYyxLQUFLLElBQUksSUFBSSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDO1lBQ2xELEtBQUssQ0FBQyxLQUFLLEVBQUUsQ0FBQztZQUNkLFFBQVEsQ0FBQyxjQUFjLEVBQUUsQ0FBQztTQUMzQjtLQUNGLENBQUMsQ0FBQzs7SUFHUCxTQUFTLENBQUMsT0FBTyxFQUFFLE9BQU8sQ0FBQztTQUN0QixJQUFJLENBQUMsU0FBUyxDQUFDLGNBQWMsQ0FBQyxFQUFFLGNBQWMsQ0FBQyxtQkFBbUIsQ0FBQyxFQUFFLEdBQUcsQ0FBQyxVQUFBLEdBQUcsWUFBSSxHQUFHLENBQUMsQ0FBQyxDQUFnQixJQUFBLENBQUMsQ0FBQztTQUN2RyxTQUFTLENBQUMsVUFBQSxrQkFBa0IsSUFBSSxPQUFBLGtCQUFrQixDQUFDLEtBQUssRUFBRSxFQUExQixDQUEwQixDQUFDLENBQUM7Q0FDbEUsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7ZnJvbUV2ZW50LCBPYnNlcnZhYmxlfSBmcm9tICdyeGpzJztcclxuaW1wb3J0IHtmaWx0ZXIsIG1hcCwgdGFrZVVudGlsLCB3aXRoTGF0ZXN0RnJvbX0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xyXG5pbXBvcnQge0tleX0gZnJvbSAnLi4vdXRpbC9rZXknO1xyXG5cclxuY29uc3QgRk9DVVNBQkxFX0VMRU1FTlRTX1NFTEVDVE9SID0gW1xyXG4gICdhW2hyZWZdJywgJ2J1dHRvbjpub3QoW2Rpc2FibGVkXSknLCAnaW5wdXQ6bm90KFtkaXNhYmxlZF0pOm5vdChbdHlwZT1cImhpZGRlblwiXSknLCAnc2VsZWN0Om5vdChbZGlzYWJsZWRdKScsXHJcbiAgJ3RleHRhcmVhOm5vdChbZGlzYWJsZWRdKScsICdbY29udGVudGVkaXRhYmxlXScsICdbdGFiaW5kZXhdOm5vdChbdGFiaW5kZXg9XCItMVwiXSknXHJcbl0uam9pbignLCAnKTtcclxuXHJcbi8qKlxyXG4gKiBSZXR1cm5zIGZpcnN0IGFuZCBsYXN0IGZvY3VzYWJsZSBlbGVtZW50cyBpbnNpZGUgb2YgYSBnaXZlbiBlbGVtZW50IGJhc2VkIG9uIHNwZWNpZmljIENTUyBzZWxlY3RvclxyXG4gKi9cclxuZnVuY3Rpb24gZ2V0Rm9jdXNhYmxlQm91bmRhcnlFbGVtZW50cyhlbGVtZW50OiBIVE1MRWxlbWVudCk6IEhUTUxFbGVtZW50W10ge1xyXG4gIGNvbnN0IGxpc3Q6IE5vZGVMaXN0T2Y8SFRNTEVsZW1lbnQ+ID0gZWxlbWVudC5xdWVyeVNlbGVjdG9yQWxsKEZPQ1VTQUJMRV9FTEVNRU5UU19TRUxFQ1RPUik7XHJcbiAgcmV0dXJuIFtsaXN0WzBdLCBsaXN0W2xpc3QubGVuZ3RoIC0gMV1dO1xyXG59XHJcblxyXG4vKipcclxuICogRnVuY3Rpb24gdGhhdCBlbmZvcmNlcyBicm93c2VyIGZvY3VzIHRvIGJlIHRyYXBwZWQgaW5zaWRlIGEgRE9NIGVsZW1lbnQuXHJcbiAqXHJcbiAqIFdvcmtzIG9ubHkgZm9yIGNsaWNrcyBpbnNpZGUgdGhlIGVsZW1lbnQgYW5kIG5hdmlnYXRpb24gd2l0aCAnVGFiJywgaWdub3JpbmcgY2xpY2tzIG91dHNpZGUgb2YgdGhlIGVsZW1lbnRcclxuICpcclxuICogQHBhcmFtIGVsZW1lbnQgVGhlIGVsZW1lbnQgYXJvdW5kIHdoaWNoIGZvY3VzIHdpbGwgYmUgdHJhcHBlZCBpbnNpZGVcclxuICogQHBhcmFtIHN0b3BGb2N1c1RyYXAkIFRoZSBvYnNlcnZhYmxlIHN0cmVhbS4gV2hlbiBjb21wbGV0ZWQgdGhlIGZvY3VzIHRyYXAgd2lsbCBjbGVhbiB1cCBsaXN0ZW5lcnNcclxuICogYW5kIGZyZWUgaW50ZXJuYWwgcmVzb3VyY2VzXHJcbiAqL1xyXG5leHBvcnQgY29uc3QgbmdiRm9jdXNUcmFwID0gKGVsZW1lbnQ6IEhUTUxFbGVtZW50LCBzdG9wRm9jdXNUcmFwJDogT2JzZXJ2YWJsZTxhbnk+KSA9PiB7XHJcbiAgLy8gbGFzdCBmb2N1c2VkIGVsZW1lbnRcclxuICBjb25zdCBsYXN0Rm9jdXNlZEVsZW1lbnQkID1cclxuICAgICAgZnJvbUV2ZW50PEZvY3VzRXZlbnQ+KGVsZW1lbnQsICdmb2N1c2luJykucGlwZSh0YWtlVW50aWwoc3RvcEZvY3VzVHJhcCQpLCBtYXAoZSA9PiBlLnRhcmdldCkpO1xyXG5cclxuICAvLyAndGFiJyAvICdzaGlmdCt0YWInIHN0cmVhbVxyXG4gIGZyb21FdmVudDxLZXlib2FyZEV2ZW50PihlbGVtZW50LCAna2V5ZG93bicpXHJcbiAgICAgIC5waXBlKHRha2VVbnRpbChzdG9wRm9jdXNUcmFwJCksIGZpbHRlcihlID0+IGUud2hpY2ggPT09IEtleS5UYWIpLCB3aXRoTGF0ZXN0RnJvbShsYXN0Rm9jdXNlZEVsZW1lbnQkKSlcclxuICAgICAgLnN1YnNjcmliZSgoW3RhYkV2ZW50LCBmb2N1c2VkRWxlbWVudF0pID0+IHtcclxuICAgICAgICBjb25zdFtmaXJzdCwgbGFzdF0gPSBnZXRGb2N1c2FibGVCb3VuZGFyeUVsZW1lbnRzKGVsZW1lbnQpO1xyXG5cclxuICAgICAgICBpZiAoZm9jdXNlZEVsZW1lbnQgPT09IGZpcnN0ICYmIHRhYkV2ZW50LnNoaWZ0S2V5KSB7XHJcbiAgICAgICAgICBsYXN0LmZvY3VzKCk7XHJcbiAgICAgICAgICB0YWJFdmVudC5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKGZvY3VzZWRFbGVtZW50ID09PSBsYXN0ICYmICF0YWJFdmVudC5zaGlmdEtleSkge1xyXG4gICAgICAgICAgZmlyc3QuZm9jdXMoKTtcclxuICAgICAgICAgIHRhYkV2ZW50LnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9KTtcclxuXHJcbiAgLy8gaW5zaWRlIGNsaWNrXHJcbiAgZnJvbUV2ZW50KGVsZW1lbnQsICdjbGljaycpXHJcbiAgICAgIC5waXBlKHRha2VVbnRpbChzdG9wRm9jdXNUcmFwJCksIHdpdGhMYXRlc3RGcm9tKGxhc3RGb2N1c2VkRWxlbWVudCQpLCBtYXAoYXJyID0+IGFyclsxXSBhcyBIVE1MRWxlbWVudCkpXHJcbiAgICAgIC5zdWJzY3JpYmUobGFzdEZvY3VzZWRFbGVtZW50ID0+IGxhc3RGb2N1c2VkRWxlbWVudC5mb2N1cygpKTtcclxufTtcclxuIl19