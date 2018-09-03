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
export const ARIA_LIVE_DELAY = new InjectionToken('live announcer delay', { providedIn: 'root', factory: ARIA_LIVE_DELAY_FACTORY });
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
function getLiveElement(document, lazyCreate = false) {
    /** @type {?} */
    let element = /** @type {?} */ (document.body.querySelector('#ngb-live'));
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
export class Live {
    /**
     * @param {?} _document
     * @param {?} _delay
     */
    constructor(_document, _delay) {
        this._document = _document;
        this._delay = _delay;
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        /** @type {?} */
        const element = getLiveElement(this._document);
        if (element) {
            element.parentElement.removeChild(element);
        }
    }
    /**
     * @param {?} message
     * @return {?}
     */
    say(message) {
        /** @type {?} */
        const element = getLiveElement(this._document, true);
        /** @type {?} */
        const delay = this._delay;
        element.textContent = '';
        /** @type {?} */
        const setText = () => element.textContent = message;
        if (delay === null) {
            setText();
        }
        else {
            setTimeout(setText, delay);
        }
    }
}
Live.decorators = [
    { type: Injectable, args: [{ providedIn: 'root' },] },
];
/** @nocollapse */
Live.ctorParameters = () => [
    { type: undefined, decorators: [{ type: Inject, args: [DOCUMENT,] }] },
    { type: undefined, decorators: [{ type: Inject, args: [ARIA_LIVE_DELAY,] }] }
];
/** @nocollapse */ Live.ngInjectableDef = i0.defineInjectable({ factory: function Live_Factory() { return new Live(i0.inject(i1.DOCUMENT), i0.inject(ARIA_LIVE_DELAY)); }, token: Live, providedIn: "root" });
if (false) {
    /** @type {?} */
    Live.prototype._document;
    /** @type {?} */
    Live.prototype._delay;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGl2ZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BuZy1ib290c3RyYXAvbmctYm9vdHN0cmFwLyIsInNvdXJjZXMiOlsidXRpbC9hY2Nlc3NpYmlsaXR5L2xpdmUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBQyxVQUFVLEVBQUUsTUFBTSxFQUFFLGNBQWMsRUFBWSxNQUFNLGVBQWUsQ0FBQztBQUM1RSxPQUFPLEVBQUMsUUFBUSxFQUFDLE1BQU0saUJBQWlCLENBQUM7Ozs7Ozs7QUFPekMsYUFBYSxlQUFlLEdBQUcsSUFBSSxjQUFjLENBQzdDLHNCQUFzQixFQUFFLEVBQUMsVUFBVSxFQUFFLE1BQU0sRUFBRSxPQUFPLEVBQUUsdUJBQXVCLEVBQUMsQ0FBQyxDQUFDOzs7O0FBQ3BGLE1BQU07SUFDSixNQUFNLENBQUMsR0FBRyxDQUFDO0NBQ1o7Ozs7OztBQUdELHdCQUF3QixRQUFhLEVBQUUsVUFBVSxHQUFHLEtBQUs7O0lBQ3ZELElBQUksT0FBTyxxQkFBRyxRQUFRLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxXQUFXLENBQWdCLEVBQUM7SUFFdEUsRUFBRSxDQUFDLENBQUMsT0FBTyxJQUFJLElBQUksSUFBSSxVQUFVLENBQUMsQ0FBQyxDQUFDO1FBQ2xDLE9BQU8sR0FBRyxRQUFRLENBQUMsYUFBYSxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBRXhDLE9BQU8sQ0FBQyxZQUFZLENBQUMsSUFBSSxFQUFFLFVBQVUsQ0FBQyxDQUFDO1FBQ3ZDLE9BQU8sQ0FBQyxZQUFZLENBQUMsV0FBVyxFQUFFLFFBQVEsQ0FBQyxDQUFDO1FBQzVDLE9BQU8sQ0FBQyxZQUFZLENBQUMsYUFBYSxFQUFFLE1BQU0sQ0FBQyxDQUFDO1FBRTVDLE9BQU8sQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLFNBQVMsQ0FBQyxDQUFDO1FBRWpDLFFBQVEsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLE9BQU8sQ0FBQyxDQUFDO0tBQ3BDO0lBRUQsTUFBTSxDQUFDLE9BQU8sQ0FBQztDQUNoQjtBQUtELE1BQU07Ozs7O0lBQ0osWUFBc0MsU0FBYyxFQUFtQyxNQUFXO1FBQTVELGNBQVMsR0FBVCxTQUFTLENBQUs7UUFBbUMsV0FBTSxHQUFOLE1BQU0sQ0FBSztLQUFJOzs7O0lBRXRHLFdBQVc7O1FBQ1QsTUFBTSxPQUFPLEdBQUcsY0FBYyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQztRQUMvQyxFQUFFLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDO1lBQ1osT0FBTyxDQUFDLGFBQWEsQ0FBQyxXQUFXLENBQUMsT0FBTyxDQUFDLENBQUM7U0FDNUM7S0FDRjs7Ozs7SUFFRCxHQUFHLENBQUMsT0FBZTs7UUFDakIsTUFBTSxPQUFPLEdBQUcsY0FBYyxDQUFDLElBQUksQ0FBQyxTQUFTLEVBQUUsSUFBSSxDQUFDLENBQUM7O1FBQ3JELE1BQU0sS0FBSyxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUM7UUFFMUIsT0FBTyxDQUFDLFdBQVcsR0FBRyxFQUFFLENBQUM7O1FBQ3pCLE1BQU0sT0FBTyxHQUFHLEdBQUcsRUFBRSxDQUFDLE9BQU8sQ0FBQyxXQUFXLEdBQUcsT0FBTyxDQUFDO1FBQ3BELEVBQUUsQ0FBQyxDQUFDLEtBQUssS0FBSyxJQUFJLENBQUMsQ0FBQyxDQUFDO1lBQ25CLE9BQU8sRUFBRSxDQUFDO1NBQ1g7UUFBQyxJQUFJLENBQUMsQ0FBQztZQUNOLFVBQVUsQ0FBQyxPQUFPLEVBQUUsS0FBSyxDQUFDLENBQUM7U0FDNUI7S0FDRjs7O1lBdEJGLFVBQVUsU0FBQyxFQUFDLFVBQVUsRUFBRSxNQUFNLEVBQUM7Ozs7NENBRWpCLE1BQU0sU0FBQyxRQUFROzRDQUEyQixNQUFNLFNBQUMsZUFBZSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7SW5qZWN0YWJsZSwgSW5qZWN0LCBJbmplY3Rpb25Ub2tlbiwgT25EZXN0cm95fSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHtET0NVTUVOVH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcclxuXHJcblxyXG5cclxuLy8gdXNlZnVsbmVzcyAoYW5kIGRlZmF1bHQgdmFsdWUpIG9mIGRlbGF5IGRvY3VtZW50ZWQgaW4gTWF0ZXJpYWwncyBDREtcclxuLy8gaHR0cHM6Ly9naXRodWIuY29tL2FuZ3VsYXIvbWF0ZXJpYWwyL2Jsb2IvNjQwNWRhOWI4ZTg1MzJhN2U1Yzg1NGM5MjBlZTE4MTVjMjc1ZDczNC9zcmMvY2RrL2ExMXkvbGl2ZS1hbm5vdW5jZXIvbGl2ZS1hbm5vdW5jZXIudHMjTDUwXHJcbmV4cG9ydCB0eXBlIEFSSUFfTElWRV9ERUxBWV9UWVBFID0gbnVtYmVyIHwgbnVsbDtcclxuZXhwb3J0IGNvbnN0IEFSSUFfTElWRV9ERUxBWSA9IG5ldyBJbmplY3Rpb25Ub2tlbjxBUklBX0xJVkVfREVMQVlfVFlQRT4oXHJcbiAgICAnbGl2ZSBhbm5vdW5jZXIgZGVsYXknLCB7cHJvdmlkZWRJbjogJ3Jvb3QnLCBmYWN0b3J5OiBBUklBX0xJVkVfREVMQVlfRkFDVE9SWX0pO1xyXG5leHBvcnQgZnVuY3Rpb24gQVJJQV9MSVZFX0RFTEFZX0ZBQ1RPUlkoKTogbnVtYmVyIHtcclxuICByZXR1cm4gMTAwO1xyXG59XHJcblxyXG5cclxuZnVuY3Rpb24gZ2V0TGl2ZUVsZW1lbnQoZG9jdW1lbnQ6IGFueSwgbGF6eUNyZWF0ZSA9IGZhbHNlKTogSFRNTEVsZW1lbnQgfCBudWxsIHtcclxuICBsZXQgZWxlbWVudCA9IGRvY3VtZW50LmJvZHkucXVlcnlTZWxlY3RvcignI25nYi1saXZlJykgYXMgSFRNTEVsZW1lbnQ7XHJcblxyXG4gIGlmIChlbGVtZW50ID09IG51bGwgJiYgbGF6eUNyZWF0ZSkge1xyXG4gICAgZWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xyXG5cclxuICAgIGVsZW1lbnQuc2V0QXR0cmlidXRlKCdpZCcsICduZ2ItbGl2ZScpO1xyXG4gICAgZWxlbWVudC5zZXRBdHRyaWJ1dGUoJ2FyaWEtbGl2ZScsICdwb2xpdGUnKTtcclxuICAgIGVsZW1lbnQuc2V0QXR0cmlidXRlKCdhcmlhLWF0b21pYycsICd0cnVlJyk7XHJcblxyXG4gICAgZWxlbWVudC5jbGFzc0xpc3QuYWRkKCdzci1vbmx5Jyk7XHJcblxyXG4gICAgZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZChlbGVtZW50KTtcclxuICB9XHJcblxyXG4gIHJldHVybiBlbGVtZW50O1xyXG59XHJcblxyXG5cclxuXHJcbkBJbmplY3RhYmxlKHtwcm92aWRlZEluOiAncm9vdCd9KVxyXG5leHBvcnQgY2xhc3MgTGl2ZSBpbXBsZW1lbnRzIE9uRGVzdHJveSB7XHJcbiAgY29uc3RydWN0b3IoQEluamVjdChET0NVTUVOVCkgcHJpdmF0ZSBfZG9jdW1lbnQ6IGFueSwgQEluamVjdChBUklBX0xJVkVfREVMQVkpIHByaXZhdGUgX2RlbGF5OiBhbnkpIHt9XHJcblxyXG4gIG5nT25EZXN0cm95KCkge1xyXG4gICAgY29uc3QgZWxlbWVudCA9IGdldExpdmVFbGVtZW50KHRoaXMuX2RvY3VtZW50KTtcclxuICAgIGlmIChlbGVtZW50KSB7XHJcbiAgICAgIGVsZW1lbnQucGFyZW50RWxlbWVudC5yZW1vdmVDaGlsZChlbGVtZW50KTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHNheShtZXNzYWdlOiBzdHJpbmcpIHtcclxuICAgIGNvbnN0IGVsZW1lbnQgPSBnZXRMaXZlRWxlbWVudCh0aGlzLl9kb2N1bWVudCwgdHJ1ZSk7XHJcbiAgICBjb25zdCBkZWxheSA9IHRoaXMuX2RlbGF5O1xyXG5cclxuICAgIGVsZW1lbnQudGV4dENvbnRlbnQgPSAnJztcclxuICAgIGNvbnN0IHNldFRleHQgPSAoKSA9PiBlbGVtZW50LnRleHRDb250ZW50ID0gbWVzc2FnZTtcclxuICAgIGlmIChkZWxheSA9PT0gbnVsbCkge1xyXG4gICAgICBzZXRUZXh0KCk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBzZXRUaW1lb3V0KHNldFRleHQsIGRlbGF5KTtcclxuICAgIH1cclxuICB9XHJcbn1cclxuIl19