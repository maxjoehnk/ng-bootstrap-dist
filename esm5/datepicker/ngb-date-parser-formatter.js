/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
import { padNumber, toInteger, isNumber } from '../util/util';
import { Injectable } from '@angular/core';
import * as i0 from "@angular/core";
/**
 * @return {?}
 */
export function NGB_DATEPICKER_PARSER_FORMATTER_FACTORY() {
    return new NgbDateISOParserFormatter();
}
/**
 * Abstract type serving as a DI token for the service parsing and formatting dates for the NgbInputDatepicker
 * directive. A default implementation using the ISO 8601 format is provided, but you can provide another implementation
 * to use an alternative format.
 * @abstract
 */
var NgbDateParserFormatter = /** @class */ (function () {
    function NgbDateParserFormatter() {
    }
    NgbDateParserFormatter.decorators = [
        { type: Injectable, args: [{ providedIn: 'root', useFactory: NGB_DATEPICKER_PARSER_FORMATTER_FACTORY },] },
    ];
    /** @nocollapse */ NgbDateParserFormatter.ngInjectableDef = i0.defineInjectable({ factory: NGB_DATEPICKER_PARSER_FORMATTER_FACTORY, token: NgbDateParserFormatter, providedIn: "root" });
    return NgbDateParserFormatter;
}());
export { NgbDateParserFormatter };
if (false) {
    /**
     * Parses the given value to an NgbDateStruct. Implementations should try their best to provide a result, even
     * partial. They must return null if the value can't be parsed.
     * @abstract
     * @param {?} value the value to parse
     * @return {?}
     */
    NgbDateParserFormatter.prototype.parse = function (value) { };
    /**
     * Formats the given date to a string. Implementations should return an empty string if the given date is null,
     * and try their best to provide a partial result if the given date is incomplete or invalid.
     * @abstract
     * @param {?} date the date to format as a string
     * @return {?}
     */
    NgbDateParserFormatter.prototype.format = function (date) { };
}
var NgbDateISOParserFormatter = /** @class */ (function (_super) {
    tslib_1.__extends(NgbDateISOParserFormatter, _super);
    function NgbDateISOParserFormatter() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    NgbDateISOParserFormatter.prototype.parse = /**
     * @param {?} value
     * @return {?}
     */
    function (value) {
        if (value) {
            /** @type {?} */
            var dateParts = value.trim().split('-');
            if (dateParts.length === 1 && isNumber(dateParts[0])) {
                return { year: toInteger(dateParts[0]), month: null, day: null };
            }
            else if (dateParts.length === 2 && isNumber(dateParts[0]) && isNumber(dateParts[1])) {
                return { year: toInteger(dateParts[0]), month: toInteger(dateParts[1]), day: null };
            }
            else if (dateParts.length === 3 && isNumber(dateParts[0]) && isNumber(dateParts[1]) && isNumber(dateParts[2])) {
                return { year: toInteger(dateParts[0]), month: toInteger(dateParts[1]), day: toInteger(dateParts[2]) };
            }
        }
        return null;
    };
    /**
     * @param {?} date
     * @return {?}
     */
    NgbDateISOParserFormatter.prototype.format = /**
     * @param {?} date
     * @return {?}
     */
    function (date) {
        return date ?
            date.year + "-" + (isNumber(date.month) ? padNumber(date.month) : '') + "-" + (isNumber(date.day) ? padNumber(date.day) : '') :
            '';
    };
    NgbDateISOParserFormatter.decorators = [
        { type: Injectable },
    ];
    return NgbDateISOParserFormatter;
}(NgbDateParserFormatter));
export { NgbDateISOParserFormatter };

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmdiLWRhdGUtcGFyc2VyLWZvcm1hdHRlci5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BuZy1ib290c3RyYXAvbmctYm9vdHN0cmFwLyIsInNvdXJjZXMiOlsiZGF0ZXBpY2tlci9uZ2ItZGF0ZS1wYXJzZXItZm9ybWF0dGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsT0FBTyxFQUFDLFNBQVMsRUFBRSxTQUFTLEVBQUUsUUFBUSxFQUFDLE1BQU0sY0FBYyxDQUFDO0FBRTVELE9BQU8sRUFBQyxVQUFVLEVBQUMsTUFBTSxlQUFlLENBQUM7Ozs7O0FBRXpDLE1BQU07SUFDSixNQUFNLENBQUMsSUFBSSx5QkFBeUIsRUFBRSxDQUFDO0NBQ3hDOzs7Ozs7Ozs7OztnQkFPQSxVQUFVLFNBQUMsRUFBQyxVQUFVLEVBQUUsTUFBTSxFQUFFLFVBQVUsRUFBRSx1Q0FBdUMsRUFBQzs7O2lDQWJyRjs7U0Fjc0Isc0JBQXNCOzs7Ozs7Ozs7Ozs7Ozs7Ozs7OztJQWlCRyxxREFBc0I7Ozs7Ozs7O0lBQ25FLHlDQUFLOzs7O0lBQUwsVUFBTSxLQUFhO1FBQ2pCLEVBQUUsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7O1lBQ1YsSUFBTSxTQUFTLEdBQUcsS0FBSyxDQUFDLElBQUksRUFBRSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQztZQUMxQyxFQUFFLENBQUMsQ0FBQyxTQUFTLENBQUMsTUFBTSxLQUFLLENBQUMsSUFBSSxRQUFRLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUNyRCxNQUFNLENBQUMsRUFBQyxJQUFJLEVBQUUsU0FBUyxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLEtBQUssRUFBRSxJQUFJLEVBQUUsR0FBRyxFQUFFLElBQUksRUFBQyxDQUFDO2FBQ2hFO1lBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxNQUFNLEtBQUssQ0FBQyxJQUFJLFFBQVEsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxRQUFRLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUN0RixNQUFNLENBQUMsRUFBQyxJQUFJLEVBQUUsU0FBUyxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLEtBQUssRUFBRSxTQUFTLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsR0FBRyxFQUFFLElBQUksRUFBQyxDQUFDO2FBQ25GO1lBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxNQUFNLEtBQUssQ0FBQyxJQUFJLFFBQVEsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxRQUFRLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksUUFBUSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDaEgsTUFBTSxDQUFDLEVBQUMsSUFBSSxFQUFFLFNBQVMsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxLQUFLLEVBQUUsU0FBUyxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLEdBQUcsRUFBRSxTQUFTLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUMsQ0FBQzthQUN0RztTQUNGO1FBQ0QsTUFBTSxDQUFDLElBQUksQ0FBQztLQUNiOzs7OztJQUVELDBDQUFNOzs7O0lBQU4sVUFBTyxJQUFtQjtRQUN4QixNQUFNLENBQUMsSUFBSSxDQUFDLENBQUM7WUFDTixJQUFJLENBQUMsSUFBSSxVQUFJLFFBQVEsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsV0FBSSxRQUFRLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUUsQ0FBQyxDQUFDO1lBQ3RILEVBQUUsQ0FBQztLQUNSOztnQkFwQkYsVUFBVTs7b0NBOUJYO0VBK0IrQyxzQkFBc0I7U0FBeEQseUJBQXlCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtwYWROdW1iZXIsIHRvSW50ZWdlciwgaXNOdW1iZXJ9IGZyb20gJy4uL3V0aWwvdXRpbCc7XHJcbmltcG9ydCB7TmdiRGF0ZVN0cnVjdH0gZnJvbSAnLi9uZ2ItZGF0ZS1zdHJ1Y3QnO1xyXG5pbXBvcnQge0luamVjdGFibGV9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIE5HQl9EQVRFUElDS0VSX1BBUlNFUl9GT1JNQVRURVJfRkFDVE9SWSgpIHtcclxuICByZXR1cm4gbmV3IE5nYkRhdGVJU09QYXJzZXJGb3JtYXR0ZXIoKTtcclxufVxyXG5cclxuLyoqXHJcbiAqIEFic3RyYWN0IHR5cGUgc2VydmluZyBhcyBhIERJIHRva2VuIGZvciB0aGUgc2VydmljZSBwYXJzaW5nIGFuZCBmb3JtYXR0aW5nIGRhdGVzIGZvciB0aGUgTmdiSW5wdXREYXRlcGlja2VyXHJcbiAqIGRpcmVjdGl2ZS4gQSBkZWZhdWx0IGltcGxlbWVudGF0aW9uIHVzaW5nIHRoZSBJU08gODYwMSBmb3JtYXQgaXMgcHJvdmlkZWQsIGJ1dCB5b3UgY2FuIHByb3ZpZGUgYW5vdGhlciBpbXBsZW1lbnRhdGlvblxyXG4gKiB0byB1c2UgYW4gYWx0ZXJuYXRpdmUgZm9ybWF0LlxyXG4gKi9cclxuQEluamVjdGFibGUoe3Byb3ZpZGVkSW46ICdyb290JywgdXNlRmFjdG9yeTogTkdCX0RBVEVQSUNLRVJfUEFSU0VSX0ZPUk1BVFRFUl9GQUNUT1JZfSlcclxuZXhwb3J0IGFic3RyYWN0IGNsYXNzIE5nYkRhdGVQYXJzZXJGb3JtYXR0ZXIge1xyXG4gIC8qKlxyXG4gICAqIFBhcnNlcyB0aGUgZ2l2ZW4gdmFsdWUgdG8gYW4gTmdiRGF0ZVN0cnVjdC4gSW1wbGVtZW50YXRpb25zIHNob3VsZCB0cnkgdGhlaXIgYmVzdCB0byBwcm92aWRlIGEgcmVzdWx0LCBldmVuXHJcbiAgICogcGFydGlhbC4gVGhleSBtdXN0IHJldHVybiBudWxsIGlmIHRoZSB2YWx1ZSBjYW4ndCBiZSBwYXJzZWQuXHJcbiAgICogQHBhcmFtIHZhbHVlIHRoZSB2YWx1ZSB0byBwYXJzZVxyXG4gICAqL1xyXG4gIGFic3RyYWN0IHBhcnNlKHZhbHVlOiBzdHJpbmcpOiBOZ2JEYXRlU3RydWN0O1xyXG5cclxuICAvKipcclxuICAgKiBGb3JtYXRzIHRoZSBnaXZlbiBkYXRlIHRvIGEgc3RyaW5nLiBJbXBsZW1lbnRhdGlvbnMgc2hvdWxkIHJldHVybiBhbiBlbXB0eSBzdHJpbmcgaWYgdGhlIGdpdmVuIGRhdGUgaXMgbnVsbCxcclxuICAgKiBhbmQgdHJ5IHRoZWlyIGJlc3QgdG8gcHJvdmlkZSBhIHBhcnRpYWwgcmVzdWx0IGlmIHRoZSBnaXZlbiBkYXRlIGlzIGluY29tcGxldGUgb3IgaW52YWxpZC5cclxuICAgKiBAcGFyYW0gZGF0ZSB0aGUgZGF0ZSB0byBmb3JtYXQgYXMgYSBzdHJpbmdcclxuICAgKi9cclxuICBhYnN0cmFjdCBmb3JtYXQoZGF0ZTogTmdiRGF0ZVN0cnVjdCk6IHN0cmluZztcclxufVxyXG5cclxuQEluamVjdGFibGUoKVxyXG5leHBvcnQgY2xhc3MgTmdiRGF0ZUlTT1BhcnNlckZvcm1hdHRlciBleHRlbmRzIE5nYkRhdGVQYXJzZXJGb3JtYXR0ZXIge1xyXG4gIHBhcnNlKHZhbHVlOiBzdHJpbmcpOiBOZ2JEYXRlU3RydWN0IHtcclxuICAgIGlmICh2YWx1ZSkge1xyXG4gICAgICBjb25zdCBkYXRlUGFydHMgPSB2YWx1ZS50cmltKCkuc3BsaXQoJy0nKTtcclxuICAgICAgaWYgKGRhdGVQYXJ0cy5sZW5ndGggPT09IDEgJiYgaXNOdW1iZXIoZGF0ZVBhcnRzWzBdKSkge1xyXG4gICAgICAgIHJldHVybiB7eWVhcjogdG9JbnRlZ2VyKGRhdGVQYXJ0c1swXSksIG1vbnRoOiBudWxsLCBkYXk6IG51bGx9O1xyXG4gICAgICB9IGVsc2UgaWYgKGRhdGVQYXJ0cy5sZW5ndGggPT09IDIgJiYgaXNOdW1iZXIoZGF0ZVBhcnRzWzBdKSAmJiBpc051bWJlcihkYXRlUGFydHNbMV0pKSB7XHJcbiAgICAgICAgcmV0dXJuIHt5ZWFyOiB0b0ludGVnZXIoZGF0ZVBhcnRzWzBdKSwgbW9udGg6IHRvSW50ZWdlcihkYXRlUGFydHNbMV0pLCBkYXk6IG51bGx9O1xyXG4gICAgICB9IGVsc2UgaWYgKGRhdGVQYXJ0cy5sZW5ndGggPT09IDMgJiYgaXNOdW1iZXIoZGF0ZVBhcnRzWzBdKSAmJiBpc051bWJlcihkYXRlUGFydHNbMV0pICYmIGlzTnVtYmVyKGRhdGVQYXJ0c1syXSkpIHtcclxuICAgICAgICByZXR1cm4ge3llYXI6IHRvSW50ZWdlcihkYXRlUGFydHNbMF0pLCBtb250aDogdG9JbnRlZ2VyKGRhdGVQYXJ0c1sxXSksIGRheTogdG9JbnRlZ2VyKGRhdGVQYXJ0c1syXSl9O1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgICByZXR1cm4gbnVsbDtcclxuICB9XHJcblxyXG4gIGZvcm1hdChkYXRlOiBOZ2JEYXRlU3RydWN0KTogc3RyaW5nIHtcclxuICAgIHJldHVybiBkYXRlID9cclxuICAgICAgICBgJHtkYXRlLnllYXJ9LSR7aXNOdW1iZXIoZGF0ZS5tb250aCkgPyBwYWROdW1iZXIoZGF0ZS5tb250aCkgOiAnJ30tJHtpc051bWJlcihkYXRlLmRheSkgPyBwYWROdW1iZXIoZGF0ZS5kYXkpIDogJyd9YCA6XHJcbiAgICAgICAgJyc7XHJcbiAgfVxyXG59XHJcbiJdfQ==