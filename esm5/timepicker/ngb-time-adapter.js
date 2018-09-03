/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { isInteger } from '../util/util';
import * as i0 from "@angular/core";
/**
 * @return {?}
 */
export function NGB_DATEPICKER_TIME_ADAPTER_FACTORY() {
    return new NgbTimeStructAdapter();
}
/**
 * Abstract type serving as a DI token for the service converting from your application Time model to internal
 * NgbTimeStruct model.
 * A default implementation converting from and to NgbTimeStruct is provided for retro-compatibility,
 * but you can provide another implementation to use an alternative format, ie for using with native Date Object.
 *
 * \@since 2.2.0
 * @abstract
 * @template T
 */
var NgbTimeAdapter = /** @class */ (function () {
    function NgbTimeAdapter() {
    }
    NgbTimeAdapter.decorators = [
        { type: Injectable, args: [{ providedIn: 'root', useFactory: NGB_DATEPICKER_TIME_ADAPTER_FACTORY },] },
    ];
    /** @nocollapse */ NgbTimeAdapter.ngInjectableDef = i0.defineInjectable({ factory: NGB_DATEPICKER_TIME_ADAPTER_FACTORY, token: NgbTimeAdapter, providedIn: "root" });
    return NgbTimeAdapter;
}());
export { NgbTimeAdapter };
if (false) {
    /**
     * Converts user-model date into an NgbTimeStruct for internal use in the library
     * @abstract
     * @param {?} value
     * @return {?}
     */
    NgbTimeAdapter.prototype.fromModel = function (value) { };
    /**
     * Converts internal time value NgbTimeStruct to user-model date
     * The returned type is supposed to be of the same type as fromModel() input-value param
     * @abstract
     * @param {?} time
     * @return {?}
     */
    NgbTimeAdapter.prototype.toModel = function (time) { };
}
var NgbTimeStructAdapter = /** @class */ (function (_super) {
    tslib_1.__extends(NgbTimeStructAdapter, _super);
    function NgbTimeStructAdapter() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     * Converts a NgbTimeStruct value into NgbTimeStruct value
     */
    /**
     * Converts a NgbTimeStruct value into NgbTimeStruct value
     * @param {?} time
     * @return {?}
     */
    NgbTimeStructAdapter.prototype.fromModel = /**
     * Converts a NgbTimeStruct value into NgbTimeStruct value
     * @param {?} time
     * @return {?}
     */
    function (time) {
        return (time && isInteger(time.hour) && isInteger(time.minute)) ?
            { hour: time.hour, minute: time.minute, second: isInteger(time.second) ? time.second : null } :
            null;
    };
    /**
     * Converts a NgbTimeStruct value into NgbTimeStruct value
     */
    /**
     * Converts a NgbTimeStruct value into NgbTimeStruct value
     * @param {?} time
     * @return {?}
     */
    NgbTimeStructAdapter.prototype.toModel = /**
     * Converts a NgbTimeStruct value into NgbTimeStruct value
     * @param {?} time
     * @return {?}
     */
    function (time) {
        return (time && isInteger(time.hour) && isInteger(time.minute)) ?
            { hour: time.hour, minute: time.minute, second: isInteger(time.second) ? time.second : null } :
            null;
    };
    NgbTimeStructAdapter.decorators = [
        { type: Injectable },
    ];
    return NgbTimeStructAdapter;
}(NgbTimeAdapter));
export { NgbTimeStructAdapter };

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmdiLXRpbWUtYWRhcHRlci5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BuZy1ib290c3RyYXAvbmctYm9vdHN0cmFwLyIsInNvdXJjZXMiOlsidGltZXBpY2tlci9uZ2ItdGltZS1hZGFwdGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsT0FBTyxFQUFDLFVBQVUsRUFBQyxNQUFNLGVBQWUsQ0FBQztBQUV6QyxPQUFPLEVBQUMsU0FBUyxFQUFDLE1BQU0sY0FBYyxDQUFDOzs7OztBQUV2QyxNQUFNO0lBQ0osTUFBTSxDQUFDLElBQUksb0JBQW9CLEVBQUUsQ0FBQztDQUNuQzs7Ozs7Ozs7Ozs7Ozs7O2dCQVVBLFVBQVUsU0FBQyxFQUFDLFVBQVUsRUFBRSxNQUFNLEVBQUUsVUFBVSxFQUFFLG1DQUFtQyxFQUFDOzs7eUJBaEJqRjs7U0FpQnNCLGNBQWM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7SUFjTSxnREFBNkI7Ozs7SUFDckU7O09BRUc7Ozs7OztJQUNILHdDQUFTOzs7OztJQUFULFVBQVUsSUFBbUI7UUFDM0IsTUFBTSxDQUFDLENBQUMsSUFBSSxJQUFJLFNBQVMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksU0FBUyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDN0QsRUFBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLElBQUksRUFBRSxNQUFNLEVBQUUsSUFBSSxDQUFDLE1BQU0sRUFBRSxNQUFNLEVBQUUsU0FBUyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsSUFBSSxFQUFDLENBQUMsQ0FBQztZQUM3RixJQUFJLENBQUM7S0FDVjtJQUVEOztPQUVHOzs7Ozs7SUFDSCxzQ0FBTzs7Ozs7SUFBUCxVQUFRLElBQW1CO1FBQ3pCLE1BQU0sQ0FBQyxDQUFDLElBQUksSUFBSSxTQUFTLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLFNBQVMsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQzdELEVBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxJQUFJLEVBQUUsTUFBTSxFQUFFLElBQUksQ0FBQyxNQUFNLEVBQUUsTUFBTSxFQUFFLFNBQVMsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLElBQUksRUFBQyxDQUFDLENBQUM7WUFDN0YsSUFBSSxDQUFDO0tBQ1Y7O2dCQWxCRixVQUFVOzsrQkE5Qlg7RUErQjBDLGNBQWM7U0FBM0Msb0JBQW9CIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtJbmplY3RhYmxlfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHtOZ2JUaW1lU3RydWN0fSBmcm9tICcuL25nYi10aW1lLXN0cnVjdCc7XHJcbmltcG9ydCB7aXNJbnRlZ2VyfSBmcm9tICcuLi91dGlsL3V0aWwnO1xyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIE5HQl9EQVRFUElDS0VSX1RJTUVfQURBUFRFUl9GQUNUT1JZKCkge1xyXG4gIHJldHVybiBuZXcgTmdiVGltZVN0cnVjdEFkYXB0ZXIoKTtcclxufVxyXG5cclxuLyoqXHJcbiAqIEFic3RyYWN0IHR5cGUgc2VydmluZyBhcyBhIERJIHRva2VuIGZvciB0aGUgc2VydmljZSBjb252ZXJ0aW5nIGZyb20geW91ciBhcHBsaWNhdGlvbiBUaW1lIG1vZGVsIHRvIGludGVybmFsXHJcbiAqIE5nYlRpbWVTdHJ1Y3QgbW9kZWwuXHJcbiAqIEEgZGVmYXVsdCBpbXBsZW1lbnRhdGlvbiBjb252ZXJ0aW5nIGZyb20gYW5kIHRvIE5nYlRpbWVTdHJ1Y3QgaXMgcHJvdmlkZWQgZm9yIHJldHJvLWNvbXBhdGliaWxpdHksXHJcbiAqIGJ1dCB5b3UgY2FuIHByb3ZpZGUgYW5vdGhlciBpbXBsZW1lbnRhdGlvbiB0byB1c2UgYW4gYWx0ZXJuYXRpdmUgZm9ybWF0LCBpZSBmb3IgdXNpbmcgd2l0aCBuYXRpdmUgRGF0ZSBPYmplY3QuXHJcbiAqXHJcbiAqIEBzaW5jZSAyLjIuMFxyXG4gKi9cclxuQEluamVjdGFibGUoe3Byb3ZpZGVkSW46ICdyb290JywgdXNlRmFjdG9yeTogTkdCX0RBVEVQSUNLRVJfVElNRV9BREFQVEVSX0ZBQ1RPUll9KVxyXG5leHBvcnQgYWJzdHJhY3QgY2xhc3MgTmdiVGltZUFkYXB0ZXI8VD4ge1xyXG4gIC8qKlxyXG4gICAqIENvbnZlcnRzIHVzZXItbW9kZWwgZGF0ZSBpbnRvIGFuIE5nYlRpbWVTdHJ1Y3QgZm9yIGludGVybmFsIHVzZSBpbiB0aGUgbGlicmFyeVxyXG4gICAqL1xyXG4gIGFic3RyYWN0IGZyb21Nb2RlbCh2YWx1ZTogVCk6IE5nYlRpbWVTdHJ1Y3Q7XHJcblxyXG4gIC8qKlxyXG4gICAqIENvbnZlcnRzIGludGVybmFsIHRpbWUgdmFsdWUgTmdiVGltZVN0cnVjdCB0byB1c2VyLW1vZGVsIGRhdGVcclxuICAgKiBUaGUgcmV0dXJuZWQgdHlwZSBpcyBzdXBwb3NlZCB0byBiZSBvZiB0aGUgc2FtZSB0eXBlIGFzIGZyb21Nb2RlbCgpIGlucHV0LXZhbHVlIHBhcmFtXHJcbiAgICovXHJcbiAgYWJzdHJhY3QgdG9Nb2RlbCh0aW1lOiBOZ2JUaW1lU3RydWN0KTogVDtcclxufVxyXG5cclxuQEluamVjdGFibGUoKVxyXG5leHBvcnQgY2xhc3MgTmdiVGltZVN0cnVjdEFkYXB0ZXIgZXh0ZW5kcyBOZ2JUaW1lQWRhcHRlcjxOZ2JUaW1lU3RydWN0PiB7XHJcbiAgLyoqXHJcbiAgICogQ29udmVydHMgYSBOZ2JUaW1lU3RydWN0IHZhbHVlIGludG8gTmdiVGltZVN0cnVjdCB2YWx1ZVxyXG4gICAqL1xyXG4gIGZyb21Nb2RlbCh0aW1lOiBOZ2JUaW1lU3RydWN0KTogTmdiVGltZVN0cnVjdCB7XHJcbiAgICByZXR1cm4gKHRpbWUgJiYgaXNJbnRlZ2VyKHRpbWUuaG91cikgJiYgaXNJbnRlZ2VyKHRpbWUubWludXRlKSkgP1xyXG4gICAgICAgIHtob3VyOiB0aW1lLmhvdXIsIG1pbnV0ZTogdGltZS5taW51dGUsIHNlY29uZDogaXNJbnRlZ2VyKHRpbWUuc2Vjb25kKSA/IHRpbWUuc2Vjb25kIDogbnVsbH0gOlxyXG4gICAgICAgIG51bGw7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBDb252ZXJ0cyBhIE5nYlRpbWVTdHJ1Y3QgdmFsdWUgaW50byBOZ2JUaW1lU3RydWN0IHZhbHVlXHJcbiAgICovXHJcbiAgdG9Nb2RlbCh0aW1lOiBOZ2JUaW1lU3RydWN0KTogTmdiVGltZVN0cnVjdCB7XHJcbiAgICByZXR1cm4gKHRpbWUgJiYgaXNJbnRlZ2VyKHRpbWUuaG91cikgJiYgaXNJbnRlZ2VyKHRpbWUubWludXRlKSkgP1xyXG4gICAgICAgIHtob3VyOiB0aW1lLmhvdXIsIG1pbnV0ZTogdGltZS5taW51dGUsIHNlY29uZDogaXNJbnRlZ2VyKHRpbWUuc2Vjb25kKSA/IHRpbWUuc2Vjb25kIDogbnVsbH0gOlxyXG4gICAgICAgIG51bGw7XHJcbiAgfVxyXG59XHJcbiJdfQ==