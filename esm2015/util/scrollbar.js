/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { Injectable, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common";
/** @type {?} */
const noop = () => { };
const ɵ0 = noop;
/** @typedef {?} */
var CompensationReverter;
export { CompensationReverter };
/**
 * Utility to handle the scrollbar.
 *
 * It allows to compensate the lack of a vertical scrollbar by adding an
 * equivalent padding on the right of the body, and to remove this compensation.
 */
export class ScrollBar {
    /**
     * @param {?} _document
     */
    constructor(_document) {
        this._document = _document;
    }
    /**
     * Detects if a scrollbar is present and if yes, already compensates for its
     * removal by adding an equivalent padding on the right of the body.
     *
     * @return {?} a callback used to revert the compensation (noop if there was none,
     * otherwise a function removing the padding)
     */
    compensate() { return !this._isPresent() ? noop : this._adjustBody(this._getWidth()); }
    /**
     * Adds a padding of the given width on the right of the body.
     *
     * @param {?} width
     * @return {?} a callback used to revert the padding to its previous value
     */
    _adjustBody(width) {
        /** @type {?} */
        const body = this._document.body;
        /** @type {?} */
        const userSetPadding = body.style.paddingRight;
        /** @type {?} */
        const paddingAmount = parseFloat(window.getComputedStyle(body)['padding-right']);
        body.style['padding-right'] = `${paddingAmount + width}px`;
        return () => body.style['padding-right'] = userSetPadding;
    }
    /**
     * Tells whether a scrollbar is currently present on the body.
     *
     * @return {?} true if scrollbar is present, false otherwise
     */
    _isPresent() {
        /** @type {?} */
        const rect = this._document.body.getBoundingClientRect();
        return rect.left + rect.right < window.innerWidth;
    }
    /**
     * Calculates and returns the width of a scrollbar.
     *
     * @return {?} the width of a scrollbar on this page
     */
    _getWidth() {
        /** @type {?} */
        const measurer = this._document.createElement('div');
        measurer.className = 'modal-scrollbar-measure';
        /** @type {?} */
        const body = this._document.body;
        body.appendChild(measurer);
        /** @type {?} */
        const width = measurer.getBoundingClientRect().width - measurer.clientWidth;
        body.removeChild(measurer);
        return width;
    }
}
ScrollBar.decorators = [
    { type: Injectable, args: [{ providedIn: 'root' },] },
];
/** @nocollapse */
ScrollBar.ctorParameters = () => [
    { type: undefined, decorators: [{ type: Inject, args: [DOCUMENT,] }] }
];
/** @nocollapse */ ScrollBar.ngInjectableDef = i0.defineInjectable({ factory: function ScrollBar_Factory() { return new ScrollBar(i0.inject(i1.DOCUMENT)); }, token: ScrollBar, providedIn: "root" });
if (false) {
    /** @type {?} */
    ScrollBar.prototype._document;
}
export { ɵ0 };

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2Nyb2xsYmFyLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQG5nLWJvb3RzdHJhcC9uZy1ib290c3RyYXAvIiwic291cmNlcyI6WyJ1dGlsL3Njcm9sbGJhci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFDLFVBQVUsRUFBRSxNQUFNLEVBQUMsTUFBTSxlQUFlLENBQUM7QUFDakQsT0FBTyxFQUFDLFFBQVEsRUFBQyxNQUFNLGlCQUFpQixDQUFDOzs7O0FBR3pDLE1BQU0sSUFBSSxHQUFHLEdBQUcsRUFBRSxJQUFHLENBQUM7Ozs7Ozs7Ozs7O0FBZ0J0QixNQUFNOzs7O0lBQ0osWUFBc0MsU0FBYztRQUFkLGNBQVMsR0FBVCxTQUFTLENBQUs7S0FBSTs7Ozs7Ozs7SUFTeEQsVUFBVSxLQUEyQixNQUFNLENBQUMsQ0FBQyxJQUFJLENBQUMsVUFBVSxFQUFFLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsU0FBUyxFQUFFLENBQUMsQ0FBQyxFQUFFOzs7Ozs7O0lBT3JHLFdBQVcsQ0FBQyxLQUFhOztRQUMvQixNQUFNLElBQUksR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQzs7UUFDakMsTUFBTSxjQUFjLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxZQUFZLENBQUM7O1FBQy9DLE1BQU0sYUFBYSxHQUFHLFVBQVUsQ0FBQyxNQUFNLENBQUMsZ0JBQWdCLENBQUMsSUFBSSxDQUFDLENBQUMsZUFBZSxDQUFDLENBQUMsQ0FBQztRQUNqRixJQUFJLENBQUMsS0FBSyxDQUFDLGVBQWUsQ0FBQyxHQUFHLEdBQUcsYUFBYSxHQUFHLEtBQUssSUFBSSxDQUFDO1FBQzNELE1BQU0sQ0FBQyxHQUFHLEVBQUUsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLGVBQWUsQ0FBQyxHQUFHLGNBQWMsQ0FBQzs7Ozs7OztJQVFwRCxVQUFVOztRQUNoQixNQUFNLElBQUksR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxxQkFBcUIsRUFBRSxDQUFDO1FBQ3pELE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQyxLQUFLLEdBQUcsTUFBTSxDQUFDLFVBQVUsQ0FBQzs7Ozs7OztJQVE1QyxTQUFTOztRQUNmLE1BQU0sUUFBUSxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsYUFBYSxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQ3JELFFBQVEsQ0FBQyxTQUFTLEdBQUcseUJBQXlCLENBQUM7O1FBRS9DLE1BQU0sSUFBSSxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDO1FBQ2pDLElBQUksQ0FBQyxXQUFXLENBQUMsUUFBUSxDQUFDLENBQUM7O1FBQzNCLE1BQU0sS0FBSyxHQUFHLFFBQVEsQ0FBQyxxQkFBcUIsRUFBRSxDQUFDLEtBQUssR0FBRyxRQUFRLENBQUMsV0FBVyxDQUFDO1FBQzVFLElBQUksQ0FBQyxXQUFXLENBQUMsUUFBUSxDQUFDLENBQUM7UUFFM0IsTUFBTSxDQUFDLEtBQUssQ0FBQzs7OztZQWxEaEIsVUFBVSxTQUFDLEVBQUMsVUFBVSxFQUFFLE1BQU0sRUFBQzs7Ozs0Q0FFakIsTUFBTSxTQUFDLFFBQVEiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge0luamVjdGFibGUsIEluamVjdH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7RE9DVU1FTlR9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XHJcblxyXG5cclxuY29uc3Qgbm9vcCA9ICgpID0+IHt9O1xyXG5cclxuXHJcblxyXG4vKiogVHlwZSBmb3IgdGhlIGNhbGxiYWNrIHVzZWQgdG8gcmV2ZXJ0IHRoZSBzY3JvbGxiYXIgY29tcGVuc2F0aW9uLiAqL1xyXG5leHBvcnQgdHlwZSBDb21wZW5zYXRpb25SZXZlcnRlciA9ICgpID0+IHZvaWQ7XHJcblxyXG5cclxuXHJcbi8qKlxyXG4gKiBVdGlsaXR5IHRvIGhhbmRsZSB0aGUgc2Nyb2xsYmFyLlxyXG4gKlxyXG4gKiBJdCBhbGxvd3MgdG8gY29tcGVuc2F0ZSB0aGUgbGFjayBvZiBhIHZlcnRpY2FsIHNjcm9sbGJhciBieSBhZGRpbmcgYW5cclxuICogZXF1aXZhbGVudCBwYWRkaW5nIG9uIHRoZSByaWdodCBvZiB0aGUgYm9keSwgYW5kIHRvIHJlbW92ZSB0aGlzIGNvbXBlbnNhdGlvbi5cclxuICovXHJcbkBJbmplY3RhYmxlKHtwcm92aWRlZEluOiAncm9vdCd9KVxyXG5leHBvcnQgY2xhc3MgU2Nyb2xsQmFyIHtcclxuICBjb25zdHJ1Y3RvcihASW5qZWN0KERPQ1VNRU5UKSBwcml2YXRlIF9kb2N1bWVudDogYW55KSB7fVxyXG5cclxuICAvKipcclxuICAgKiBEZXRlY3RzIGlmIGEgc2Nyb2xsYmFyIGlzIHByZXNlbnQgYW5kIGlmIHllcywgYWxyZWFkeSBjb21wZW5zYXRlcyBmb3IgaXRzXHJcbiAgICogcmVtb3ZhbCBieSBhZGRpbmcgYW4gZXF1aXZhbGVudCBwYWRkaW5nIG9uIHRoZSByaWdodCBvZiB0aGUgYm9keS5cclxuICAgKlxyXG4gICAqIEByZXR1cm4gYSBjYWxsYmFjayB1c2VkIHRvIHJldmVydCB0aGUgY29tcGVuc2F0aW9uIChub29wIGlmIHRoZXJlIHdhcyBub25lLFxyXG4gICAqIG90aGVyd2lzZSBhIGZ1bmN0aW9uIHJlbW92aW5nIHRoZSBwYWRkaW5nKVxyXG4gICAqL1xyXG4gIGNvbXBlbnNhdGUoKTogQ29tcGVuc2F0aW9uUmV2ZXJ0ZXIgeyByZXR1cm4gIXRoaXMuX2lzUHJlc2VudCgpID8gbm9vcCA6IHRoaXMuX2FkanVzdEJvZHkodGhpcy5fZ2V0V2lkdGgoKSk7IH1cclxuXHJcbiAgLyoqXHJcbiAgICogQWRkcyBhIHBhZGRpbmcgb2YgdGhlIGdpdmVuIHdpZHRoIG9uIHRoZSByaWdodCBvZiB0aGUgYm9keS5cclxuICAgKlxyXG4gICAqIEByZXR1cm4gYSBjYWxsYmFjayB1c2VkIHRvIHJldmVydCB0aGUgcGFkZGluZyB0byBpdHMgcHJldmlvdXMgdmFsdWVcclxuICAgKi9cclxuICBwcml2YXRlIF9hZGp1c3RCb2R5KHdpZHRoOiBudW1iZXIpOiBDb21wZW5zYXRpb25SZXZlcnRlciB7XHJcbiAgICBjb25zdCBib2R5ID0gdGhpcy5fZG9jdW1lbnQuYm9keTtcclxuICAgIGNvbnN0IHVzZXJTZXRQYWRkaW5nID0gYm9keS5zdHlsZS5wYWRkaW5nUmlnaHQ7XHJcbiAgICBjb25zdCBwYWRkaW5nQW1vdW50ID0gcGFyc2VGbG9hdCh3aW5kb3cuZ2V0Q29tcHV0ZWRTdHlsZShib2R5KVsncGFkZGluZy1yaWdodCddKTtcclxuICAgIGJvZHkuc3R5bGVbJ3BhZGRpbmctcmlnaHQnXSA9IGAke3BhZGRpbmdBbW91bnQgKyB3aWR0aH1weGA7XHJcbiAgICByZXR1cm4gKCkgPT4gYm9keS5zdHlsZVsncGFkZGluZy1yaWdodCddID0gdXNlclNldFBhZGRpbmc7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBUZWxscyB3aGV0aGVyIGEgc2Nyb2xsYmFyIGlzIGN1cnJlbnRseSBwcmVzZW50IG9uIHRoZSBib2R5LlxyXG4gICAqXHJcbiAgICogQHJldHVybiB0cnVlIGlmIHNjcm9sbGJhciBpcyBwcmVzZW50LCBmYWxzZSBvdGhlcndpc2VcclxuICAgKi9cclxuICBwcml2YXRlIF9pc1ByZXNlbnQoKTogYm9vbGVhbiB7XHJcbiAgICBjb25zdCByZWN0ID0gdGhpcy5fZG9jdW1lbnQuYm9keS5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcclxuICAgIHJldHVybiByZWN0LmxlZnQgKyByZWN0LnJpZ2h0IDwgd2luZG93LmlubmVyV2lkdGg7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBDYWxjdWxhdGVzIGFuZCByZXR1cm5zIHRoZSB3aWR0aCBvZiBhIHNjcm9sbGJhci5cclxuICAgKlxyXG4gICAqIEByZXR1cm4gdGhlIHdpZHRoIG9mIGEgc2Nyb2xsYmFyIG9uIHRoaXMgcGFnZVxyXG4gICAqL1xyXG4gIHByaXZhdGUgX2dldFdpZHRoKCk6IG51bWJlciB7XHJcbiAgICBjb25zdCBtZWFzdXJlciA9IHRoaXMuX2RvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xyXG4gICAgbWVhc3VyZXIuY2xhc3NOYW1lID0gJ21vZGFsLXNjcm9sbGJhci1tZWFzdXJlJztcclxuXHJcbiAgICBjb25zdCBib2R5ID0gdGhpcy5fZG9jdW1lbnQuYm9keTtcclxuICAgIGJvZHkuYXBwZW5kQ2hpbGQobWVhc3VyZXIpO1xyXG4gICAgY29uc3Qgd2lkdGggPSBtZWFzdXJlci5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKS53aWR0aCAtIG1lYXN1cmVyLmNsaWVudFdpZHRoO1xyXG4gICAgYm9keS5yZW1vdmVDaGlsZChtZWFzdXJlcik7XHJcblxyXG4gICAgcmV0dXJuIHdpZHRoO1xyXG4gIH1cclxufVxyXG4iXX0=