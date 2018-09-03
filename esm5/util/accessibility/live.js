/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { Injectable, Inject, InjectionToken } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common";
/** @typedef {?} */
var ARIA_LIVE_DELAY_TYPE;
export { ARIA_LIVE_DELAY_TYPE };
/** @type {?} */
export var ARIA_LIVE_DELAY = new InjectionToken('live announcer delay', { providedIn: 'root', factory: ARIA_LIVE_DELAY_FACTORY });
/**
 * @return {?}
 */
export function ARIA_LIVE_DELAY_FACTORY() {
    return 100;
}
/**
 * @param {?} document
 * @param {?=} lazyCreate
 * @return {?}
 */
function getLiveElement(document, lazyCreate) {
    if (lazyCreate === void 0) { lazyCreate = false; }
    /** @type {?} */
    var element = /** @type {?} */ (document.body.querySelector('#ngb-live'));
    if (element == null && lazyCreate) {
        element = document.createElement('div');
        element.setAttribute('id', 'ngb-live');
        element.setAttribute('aria-live', 'polite');
        element.setAttribute('aria-atomic', 'true');
        element.classList.add('sr-only');
        document.body.appendChild(element);
    }
    return element;
}
var Live = /** @class */ (function () {
    function Live(_document, _delay) {
        this._document = _document;
        this._delay = _delay;
    }
    /**
     * @return {?}
     */
    Live.prototype.ngOnDestroy = /**
     * @return {?}
     */
    function () {
        /** @type {?} */
        var element = getLiveElement(this._document);
        if (element) {
            element.parentElement.removeChild(element);
        }
    };
    /**
     * @param {?} message
     * @return {?}
     */
    Live.prototype.say = /**
     * @param {?} message
     * @return {?}
     */
    function (message) {
        /** @type {?} */
        var element = getLiveElement(this._document, true);
        /** @type {?} */
        var delay = this._delay;
        element.textContent = '';
        /** @type {?} */
        var setText = function () { return element.textContent = message; };
        if (delay === null) {
            setText();
        }
        else {
            setTimeout(setText, delay);
        }
    };
    Live.decorators = [
        { type: Injectable, args: [{ providedIn: 'root' },] },
    ];
    /** @nocollapse */
    Live.ctorParameters = function () { return [
        { type: undefined, decorators: [{ type: Inject, args: [DOCUMENT,] }] },
        { type: undefined, decorators: [{ type: Inject, args: [ARIA_LIVE_DELAY,] }] }
    ]; };
    /** @nocollapse */ Live.ngInjectableDef = i0.defineInjectable({ factory: function Live_Factory() { return new Live(i0.inject(i1.DOCUMENT), i0.inject(ARIA_LIVE_DELAY)); }, token: Live, providedIn: "root" });
    return Live;
}());
export { Live };
if (false) {
    /** @type {?} */
    Live.prototype._document;
    /** @type {?} */
    Live.prototype._delay;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGl2ZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BuZy1ib290c3RyYXAvbmctYm9vdHN0cmFwLyIsInNvdXJjZXMiOlsidXRpbC9hY2Nlc3NpYmlsaXR5L2xpdmUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBQyxVQUFVLEVBQUUsTUFBTSxFQUFFLGNBQWMsRUFBWSxNQUFNLGVBQWUsQ0FBQztBQUM1RSxPQUFPLEVBQUMsUUFBUSxFQUFDLE1BQU0saUJBQWlCLENBQUM7Ozs7Ozs7QUFPekMsV0FBYSxlQUFlLEdBQUcsSUFBSSxjQUFjLENBQzdDLHNCQUFzQixFQUFFLEVBQUMsVUFBVSxFQUFFLE1BQU0sRUFBRSxPQUFPLEVBQUUsdUJBQXVCLEVBQUMsQ0FBQyxDQUFDOzs7O0FBQ3BGLE1BQU07SUFDSixNQUFNLENBQUMsR0FBRyxDQUFDO0NBQ1o7Ozs7OztBQUdELHdCQUF3QixRQUFhLEVBQUUsVUFBa0I7SUFBbEIsMkJBQUEsRUFBQSxrQkFBa0I7O0lBQ3ZELElBQUksT0FBTyxxQkFBRyxRQUFRLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxXQUFXLENBQWdCLEVBQUM7SUFFdEUsRUFBRSxDQUFDLENBQUMsT0FBTyxJQUFJLElBQUksSUFBSSxVQUFVLENBQUMsQ0FBQyxDQUFDO1FBQ2xDLE9BQU8sR0FBRyxRQUFRLENBQUMsYUFBYSxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBRXhDLE9BQU8sQ0FBQyxZQUFZLENBQUMsSUFBSSxFQUFFLFVBQVUsQ0FBQyxDQUFDO1FBQ3ZDLE9BQU8sQ0FBQyxZQUFZLENBQUMsV0FBVyxFQUFFLFFBQVEsQ0FBQyxDQUFDO1FBQzVDLE9BQU8sQ0FBQyxZQUFZLENBQUMsYUFBYSxFQUFFLE1BQU0sQ0FBQyxDQUFDO1FBRTVDLE9BQU8sQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLFNBQVMsQ0FBQyxDQUFDO1FBRWpDLFFBQVEsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLE9BQU8sQ0FBQyxDQUFDO0tBQ3BDO0lBRUQsTUFBTSxDQUFDLE9BQU8sQ0FBQztDQUNoQjs7SUFNQyxjQUFzQyxTQUFjLEVBQW1DLE1BQVc7UUFBNUQsY0FBUyxHQUFULFNBQVMsQ0FBSztRQUFtQyxXQUFNLEdBQU4sTUFBTSxDQUFLO0tBQUk7Ozs7SUFFdEcsMEJBQVc7OztJQUFYOztRQUNFLElBQU0sT0FBTyxHQUFHLGNBQWMsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUM7UUFDL0MsRUFBRSxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQztZQUNaLE9BQU8sQ0FBQyxhQUFhLENBQUMsV0FBVyxDQUFDLE9BQU8sQ0FBQyxDQUFDO1NBQzVDO0tBQ0Y7Ozs7O0lBRUQsa0JBQUc7Ozs7SUFBSCxVQUFJLE9BQWU7O1FBQ2pCLElBQU0sT0FBTyxHQUFHLGNBQWMsQ0FBQyxJQUFJLENBQUMsU0FBUyxFQUFFLElBQUksQ0FBQyxDQUFDOztRQUNyRCxJQUFNLEtBQUssR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDO1FBRTFCLE9BQU8sQ0FBQyxXQUFXLEdBQUcsRUFBRSxDQUFDOztRQUN6QixJQUFNLE9BQU8sR0FBRyxjQUFNLE9BQUEsT0FBTyxDQUFDLFdBQVcsR0FBRyxPQUFPLEVBQTdCLENBQTZCLENBQUM7UUFDcEQsRUFBRSxDQUFDLENBQUMsS0FBSyxLQUFLLElBQUksQ0FBQyxDQUFDLENBQUM7WUFDbkIsT0FBTyxFQUFFLENBQUM7U0FDWDtRQUFDLElBQUksQ0FBQyxDQUFDO1lBQ04sVUFBVSxDQUFDLE9BQU8sRUFBRSxLQUFLLENBQUMsQ0FBQztTQUM1QjtLQUNGOztnQkF0QkYsVUFBVSxTQUFDLEVBQUMsVUFBVSxFQUFFLE1BQU0sRUFBQzs7OztnREFFakIsTUFBTSxTQUFDLFFBQVE7Z0RBQTJCLE1BQU0sU0FBQyxlQUFlOzs7ZUFyQy9FOztTQW9DYSxJQUFJIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtJbmplY3RhYmxlLCBJbmplY3QsIEluamVjdGlvblRva2VuLCBPbkRlc3Ryb3l9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQge0RPQ1VNRU5UfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xyXG5cclxuXHJcblxyXG4vLyB1c2VmdWxuZXNzIChhbmQgZGVmYXVsdCB2YWx1ZSkgb2YgZGVsYXkgZG9jdW1lbnRlZCBpbiBNYXRlcmlhbCdzIENES1xyXG4vLyBodHRwczovL2dpdGh1Yi5jb20vYW5ndWxhci9tYXRlcmlhbDIvYmxvYi82NDA1ZGE5YjhlODUzMmE3ZTVjODU0YzkyMGVlMTgxNWMyNzVkNzM0L3NyYy9jZGsvYTExeS9saXZlLWFubm91bmNlci9saXZlLWFubm91bmNlci50cyNMNTBcclxuZXhwb3J0IHR5cGUgQVJJQV9MSVZFX0RFTEFZX1RZUEUgPSBudW1iZXIgfCBudWxsO1xyXG5leHBvcnQgY29uc3QgQVJJQV9MSVZFX0RFTEFZID0gbmV3IEluamVjdGlvblRva2VuPEFSSUFfTElWRV9ERUxBWV9UWVBFPihcclxuICAgICdsaXZlIGFubm91bmNlciBkZWxheScsIHtwcm92aWRlZEluOiAncm9vdCcsIGZhY3Rvcnk6IEFSSUFfTElWRV9ERUxBWV9GQUNUT1JZfSk7XHJcbmV4cG9ydCBmdW5jdGlvbiBBUklBX0xJVkVfREVMQVlfRkFDVE9SWSgpOiBudW1iZXIge1xyXG4gIHJldHVybiAxMDA7XHJcbn1cclxuXHJcblxyXG5mdW5jdGlvbiBnZXRMaXZlRWxlbWVudChkb2N1bWVudDogYW55LCBsYXp5Q3JlYXRlID0gZmFsc2UpOiBIVE1MRWxlbWVudCB8IG51bGwge1xyXG4gIGxldCBlbGVtZW50ID0gZG9jdW1lbnQuYm9keS5xdWVyeVNlbGVjdG9yKCcjbmdiLWxpdmUnKSBhcyBIVE1MRWxlbWVudDtcclxuXHJcbiAgaWYgKGVsZW1lbnQgPT0gbnVsbCAmJiBsYXp5Q3JlYXRlKSB7XHJcbiAgICBlbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XHJcblxyXG4gICAgZWxlbWVudC5zZXRBdHRyaWJ1dGUoJ2lkJywgJ25nYi1saXZlJyk7XHJcbiAgICBlbGVtZW50LnNldEF0dHJpYnV0ZSgnYXJpYS1saXZlJywgJ3BvbGl0ZScpO1xyXG4gICAgZWxlbWVudC5zZXRBdHRyaWJ1dGUoJ2FyaWEtYXRvbWljJywgJ3RydWUnKTtcclxuXHJcbiAgICBlbGVtZW50LmNsYXNzTGlzdC5hZGQoJ3NyLW9ubHknKTtcclxuXHJcbiAgICBkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKGVsZW1lbnQpO1xyXG4gIH1cclxuXHJcbiAgcmV0dXJuIGVsZW1lbnQ7XHJcbn1cclxuXHJcblxyXG5cclxuQEluamVjdGFibGUoe3Byb3ZpZGVkSW46ICdyb290J30pXHJcbmV4cG9ydCBjbGFzcyBMaXZlIGltcGxlbWVudHMgT25EZXN0cm95IHtcclxuICBjb25zdHJ1Y3RvcihASW5qZWN0KERPQ1VNRU5UKSBwcml2YXRlIF9kb2N1bWVudDogYW55LCBASW5qZWN0KEFSSUFfTElWRV9ERUxBWSkgcHJpdmF0ZSBfZGVsYXk6IGFueSkge31cclxuXHJcbiAgbmdPbkRlc3Ryb3koKSB7XHJcbiAgICBjb25zdCBlbGVtZW50ID0gZ2V0TGl2ZUVsZW1lbnQodGhpcy5fZG9jdW1lbnQpO1xyXG4gICAgaWYgKGVsZW1lbnQpIHtcclxuICAgICAgZWxlbWVudC5wYXJlbnRFbGVtZW50LnJlbW92ZUNoaWxkKGVsZW1lbnQpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgc2F5KG1lc3NhZ2U6IHN0cmluZykge1xyXG4gICAgY29uc3QgZWxlbWVudCA9IGdldExpdmVFbGVtZW50KHRoaXMuX2RvY3VtZW50LCB0cnVlKTtcclxuICAgIGNvbnN0IGRlbGF5ID0gdGhpcy5fZGVsYXk7XHJcblxyXG4gICAgZWxlbWVudC50ZXh0Q29udGVudCA9ICcnO1xyXG4gICAgY29uc3Qgc2V0VGV4dCA9ICgpID0+IGVsZW1lbnQudGV4dENvbnRlbnQgPSBtZXNzYWdlO1xyXG4gICAgaWYgKGRlbGF5ID09PSBudWxsKSB7XHJcbiAgICAgIHNldFRleHQoKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHNldFRpbWVvdXQoc2V0VGV4dCwgZGVsYXkpO1xyXG4gICAgfVxyXG4gIH1cclxufVxyXG4iXX0=