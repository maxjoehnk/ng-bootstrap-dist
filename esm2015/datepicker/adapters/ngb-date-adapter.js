/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { Injectable } from '@angular/core';
import * as i0 from "@angular/core";
/**
 * @return {?}
 */
export function NGB_DATEPICKER_DATE_ADAPTER_FACTORY() {
    return new NgbDateStructAdapter();
}
/**
 * Abstract type serving as a DI token for the service converting from your application Date model to internal
 * NgbDateStruct model.
 * A default implementation converting from and to NgbDateStruct is provided for retro-compatibility,
 * but you can provide another implementation to use an alternative format, ie for using with native Date Object.
 * @abstract
 * @template D
 */
export class NgbDateAdapter {
}
NgbDateAdapter.decorators = [
    { type: Injectable, args: [{ providedIn: 'root', useFactory: NGB_DATEPICKER_DATE_ADAPTER_FACTORY },] },
];
/** @nocollapse */ NgbDateAdapter.ngInjectableDef = i0.defineInjectable({ factory: NGB_DATEPICKER_DATE_ADAPTER_FACTORY, token: NgbDateAdapter, providedIn: "root" });
if (false) {
    /**
     * Converts user-model date into an NgbDateStruct for internal use in the library
     * @abstract
     * @param {?} value
     * @return {?}
     */
    NgbDateAdapter.prototype.fromModel = function (value) { };
    /**
     * Converts internal date value NgbDateStruct to user-model date
     * The returned type is supposed to be of the same type as fromModel() input-value param
     * @abstract
     * @param {?} date
     * @return {?}
     */
    NgbDateAdapter.prototype.toModel = function (date) { };
}
export class NgbDateStructAdapter extends NgbDateAdapter {
    /**
     * Converts a NgbDateStruct value into NgbDateStruct value
     * @param {?} date
     * @return {?}
     */
    fromModel(date) {
        return (date && date.year && date.month && date.day) ? { year: date.year, month: date.month, day: date.day } : null;
    }
    /**
     * Converts a NgbDateStruct value into NgbDateStruct value
     * @param {?} date
     * @return {?}
     */
    toModel(date) {
        return (date && date.year && date.month && date.day) ? { year: date.year, month: date.month, day: date.day } : null;
    }
}
NgbDateStructAdapter.decorators = [
    { type: Injectable },
];

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmdiLWRhdGUtYWRhcHRlci5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BuZy1ib290c3RyYXAvbmctYm9vdHN0cmFwLyIsInNvdXJjZXMiOlsiZGF0ZXBpY2tlci9hZGFwdGVycy9uZ2ItZGF0ZS1hZGFwdGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUMsVUFBVSxFQUFDLE1BQU0sZUFBZSxDQUFDOzs7OztBQUd6QyxNQUFNO0lBQ0osTUFBTSxDQUFDLElBQUksb0JBQW9CLEVBQUUsQ0FBQztDQUNuQzs7Ozs7Ozs7O0FBU0QsTUFBTTs7O1lBREwsVUFBVSxTQUFDLEVBQUMsVUFBVSxFQUFFLE1BQU0sRUFBRSxVQUFVLEVBQUUsbUNBQW1DLEVBQUM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBZWpGLE1BQU0sMkJBQTRCLFNBQVEsY0FBNkI7Ozs7OztJQUlyRSxTQUFTLENBQUMsSUFBbUI7UUFDM0IsTUFBTSxDQUFDLENBQUMsSUFBSSxJQUFJLElBQUksQ0FBQyxJQUFJLElBQUksSUFBSSxDQUFDLEtBQUssSUFBSSxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxJQUFJLEVBQUUsS0FBSyxFQUFFLElBQUksQ0FBQyxLQUFLLEVBQUUsR0FBRyxFQUFFLElBQUksQ0FBQyxHQUFHLEVBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDO0tBQ25IOzs7Ozs7SUFLRCxPQUFPLENBQUMsSUFBbUI7UUFDekIsTUFBTSxDQUFDLENBQUMsSUFBSSxJQUFJLElBQUksQ0FBQyxJQUFJLElBQUksSUFBSSxDQUFDLEtBQUssSUFBSSxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxJQUFJLEVBQUUsS0FBSyxFQUFFLElBQUksQ0FBQyxLQUFLLEVBQUUsR0FBRyxFQUFFLElBQUksQ0FBQyxHQUFHLEVBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDO0tBQ25IOzs7WUFkRixVQUFVIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtJbmplY3RhYmxlfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHtOZ2JEYXRlU3RydWN0fSBmcm9tICcuLi9uZ2ItZGF0ZS1zdHJ1Y3QnO1xyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIE5HQl9EQVRFUElDS0VSX0RBVEVfQURBUFRFUl9GQUNUT1JZKCkge1xyXG4gIHJldHVybiBuZXcgTmdiRGF0ZVN0cnVjdEFkYXB0ZXIoKTtcclxufVxyXG5cclxuLyoqXHJcbiAqIEFic3RyYWN0IHR5cGUgc2VydmluZyBhcyBhIERJIHRva2VuIGZvciB0aGUgc2VydmljZSBjb252ZXJ0aW5nIGZyb20geW91ciBhcHBsaWNhdGlvbiBEYXRlIG1vZGVsIHRvIGludGVybmFsXHJcbiAqIE5nYkRhdGVTdHJ1Y3QgbW9kZWwuXHJcbiAqIEEgZGVmYXVsdCBpbXBsZW1lbnRhdGlvbiBjb252ZXJ0aW5nIGZyb20gYW5kIHRvIE5nYkRhdGVTdHJ1Y3QgaXMgcHJvdmlkZWQgZm9yIHJldHJvLWNvbXBhdGliaWxpdHksXHJcbiAqIGJ1dCB5b3UgY2FuIHByb3ZpZGUgYW5vdGhlciBpbXBsZW1lbnRhdGlvbiB0byB1c2UgYW4gYWx0ZXJuYXRpdmUgZm9ybWF0LCBpZSBmb3IgdXNpbmcgd2l0aCBuYXRpdmUgRGF0ZSBPYmplY3QuXHJcbiAqL1xyXG5ASW5qZWN0YWJsZSh7cHJvdmlkZWRJbjogJ3Jvb3QnLCB1c2VGYWN0b3J5OiBOR0JfREFURVBJQ0tFUl9EQVRFX0FEQVBURVJfRkFDVE9SWX0pXHJcbmV4cG9ydCBhYnN0cmFjdCBjbGFzcyBOZ2JEYXRlQWRhcHRlcjxEPiB7XHJcbiAgLyoqXHJcbiAgICogQ29udmVydHMgdXNlci1tb2RlbCBkYXRlIGludG8gYW4gTmdiRGF0ZVN0cnVjdCBmb3IgaW50ZXJuYWwgdXNlIGluIHRoZSBsaWJyYXJ5XHJcbiAgICovXHJcbiAgYWJzdHJhY3QgZnJvbU1vZGVsKHZhbHVlOiBEKTogTmdiRGF0ZVN0cnVjdDtcclxuXHJcbiAgLyoqXHJcbiAgICogQ29udmVydHMgaW50ZXJuYWwgZGF0ZSB2YWx1ZSBOZ2JEYXRlU3RydWN0IHRvIHVzZXItbW9kZWwgZGF0ZVxyXG4gICAqIFRoZSByZXR1cm5lZCB0eXBlIGlzIHN1cHBvc2VkIHRvIGJlIG9mIHRoZSBzYW1lIHR5cGUgYXMgZnJvbU1vZGVsKCkgaW5wdXQtdmFsdWUgcGFyYW1cclxuICAgKi9cclxuICBhYnN0cmFjdCB0b01vZGVsKGRhdGU6IE5nYkRhdGVTdHJ1Y3QpOiBEO1xyXG59XHJcblxyXG5ASW5qZWN0YWJsZSgpXHJcbmV4cG9ydCBjbGFzcyBOZ2JEYXRlU3RydWN0QWRhcHRlciBleHRlbmRzIE5nYkRhdGVBZGFwdGVyPE5nYkRhdGVTdHJ1Y3Q+IHtcclxuICAvKipcclxuICAgKiBDb252ZXJ0cyBhIE5nYkRhdGVTdHJ1Y3QgdmFsdWUgaW50byBOZ2JEYXRlU3RydWN0IHZhbHVlXHJcbiAgICovXHJcbiAgZnJvbU1vZGVsKGRhdGU6IE5nYkRhdGVTdHJ1Y3QpOiBOZ2JEYXRlU3RydWN0IHtcclxuICAgIHJldHVybiAoZGF0ZSAmJiBkYXRlLnllYXIgJiYgZGF0ZS5tb250aCAmJiBkYXRlLmRheSkgPyB7eWVhcjogZGF0ZS55ZWFyLCBtb250aDogZGF0ZS5tb250aCwgZGF5OiBkYXRlLmRheX0gOiBudWxsO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogQ29udmVydHMgYSBOZ2JEYXRlU3RydWN0IHZhbHVlIGludG8gTmdiRGF0ZVN0cnVjdCB2YWx1ZVxyXG4gICAqL1xyXG4gIHRvTW9kZWwoZGF0ZTogTmdiRGF0ZVN0cnVjdCk6IE5nYkRhdGVTdHJ1Y3Qge1xyXG4gICAgcmV0dXJuIChkYXRlICYmIGRhdGUueWVhciAmJiBkYXRlLm1vbnRoICYmIGRhdGUuZGF5KSA/IHt5ZWFyOiBkYXRlLnllYXIsIG1vbnRoOiBkYXRlLm1vbnRoLCBkYXk6IGRhdGUuZGF5fSA6IG51bGw7XHJcbiAgfVxyXG59XHJcbiJdfQ==