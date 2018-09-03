/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
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
export class NgbDateParserFormatter {
}
NgbDateParserFormatter.decorators = [
    { type: Injectable, args: [{ providedIn: 'root', useFactory: NGB_DATEPICKER_PARSER_FORMATTER_FACTORY },] },
];
/** @nocollapse */ NgbDateParserFormatter.ngInjectableDef = i0.defineInjectable({ factory: NGB_DATEPICKER_PARSER_FORMATTER_FACTORY, token: NgbDateParserFormatter, providedIn: "root" });
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
export class NgbDateISOParserFormatter extends NgbDateParserFormatter {
    /**
     * @param {?} value
     * @return {?}
     */
    parse(value) {
        if (value) {
            /** @type {?} */
            const dateParts = value.trim().split('-');
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
    }
    /**
     * @param {?} date
     * @return {?}
     */
    format(date) {
        return date ?
            `${date.year}-${isNumber(date.month) ? padNumber(date.month) : ''}-${isNumber(date.day) ? padNumber(date.day) : ''}` :
            '';
    }
}
NgbDateISOParserFormatter.decorators = [
    { type: Injectable },
];

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmdiLWRhdGUtcGFyc2VyLWZvcm1hdHRlci5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BuZy1ib290c3RyYXAvbmctYm9vdHN0cmFwLyIsInNvdXJjZXMiOlsiZGF0ZXBpY2tlci9uZ2ItZGF0ZS1wYXJzZXItZm9ybWF0dGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUMsU0FBUyxFQUFFLFNBQVMsRUFBRSxRQUFRLEVBQUMsTUFBTSxjQUFjLENBQUM7QUFFNUQsT0FBTyxFQUFDLFVBQVUsRUFBQyxNQUFNLGVBQWUsQ0FBQzs7Ozs7QUFFekMsTUFBTTtJQUNKLE1BQU0sQ0FBQyxJQUFJLHlCQUF5QixFQUFFLENBQUM7Q0FDeEM7Ozs7Ozs7QUFRRCxNQUFNOzs7WUFETCxVQUFVLFNBQUMsRUFBQyxVQUFVLEVBQUUsTUFBTSxFQUFFLFVBQVUsRUFBRSx1Q0FBdUMsRUFBQzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBa0JyRixNQUFNLGdDQUFpQyxTQUFRLHNCQUFzQjs7Ozs7SUFDbkUsS0FBSyxDQUFDLEtBQWE7UUFDakIsRUFBRSxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQzs7WUFDVixNQUFNLFNBQVMsR0FBRyxLQUFLLENBQUMsSUFBSSxFQUFFLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1lBQzFDLEVBQUUsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxNQUFNLEtBQUssQ0FBQyxJQUFJLFFBQVEsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQ3JELE1BQU0sQ0FBQyxFQUFDLElBQUksRUFBRSxTQUFTLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsS0FBSyxFQUFFLElBQUksRUFBRSxHQUFHLEVBQUUsSUFBSSxFQUFDLENBQUM7YUFDaEU7WUFBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUMsU0FBUyxDQUFDLE1BQU0sS0FBSyxDQUFDLElBQUksUUFBUSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLFFBQVEsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQ3RGLE1BQU0sQ0FBQyxFQUFDLElBQUksRUFBRSxTQUFTLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsS0FBSyxFQUFFLFNBQVMsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxHQUFHLEVBQUUsSUFBSSxFQUFDLENBQUM7YUFDbkY7WUFBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUMsU0FBUyxDQUFDLE1BQU0sS0FBSyxDQUFDLElBQUksUUFBUSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLFFBQVEsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxRQUFRLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUNoSCxNQUFNLENBQUMsRUFBQyxJQUFJLEVBQUUsU0FBUyxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLEtBQUssRUFBRSxTQUFTLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsR0FBRyxFQUFFLFNBQVMsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBQyxDQUFDO2FBQ3RHO1NBQ0Y7UUFDRCxNQUFNLENBQUMsSUFBSSxDQUFDO0tBQ2I7Ozs7O0lBRUQsTUFBTSxDQUFDLElBQW1CO1FBQ3hCLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUNULEdBQUcsSUFBSSxDQUFDLElBQUksSUFBSSxRQUFRLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLElBQUksUUFBUSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQztZQUN0SCxFQUFFLENBQUM7S0FDUjs7O1lBcEJGLFVBQVUiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge3BhZE51bWJlciwgdG9JbnRlZ2VyLCBpc051bWJlcn0gZnJvbSAnLi4vdXRpbC91dGlsJztcclxuaW1wb3J0IHtOZ2JEYXRlU3RydWN0fSBmcm9tICcuL25nYi1kYXRlLXN0cnVjdCc7XHJcbmltcG9ydCB7SW5qZWN0YWJsZX0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gTkdCX0RBVEVQSUNLRVJfUEFSU0VSX0ZPUk1BVFRFUl9GQUNUT1JZKCkge1xyXG4gIHJldHVybiBuZXcgTmdiRGF0ZUlTT1BhcnNlckZvcm1hdHRlcigpO1xyXG59XHJcblxyXG4vKipcclxuICogQWJzdHJhY3QgdHlwZSBzZXJ2aW5nIGFzIGEgREkgdG9rZW4gZm9yIHRoZSBzZXJ2aWNlIHBhcnNpbmcgYW5kIGZvcm1hdHRpbmcgZGF0ZXMgZm9yIHRoZSBOZ2JJbnB1dERhdGVwaWNrZXJcclxuICogZGlyZWN0aXZlLiBBIGRlZmF1bHQgaW1wbGVtZW50YXRpb24gdXNpbmcgdGhlIElTTyA4NjAxIGZvcm1hdCBpcyBwcm92aWRlZCwgYnV0IHlvdSBjYW4gcHJvdmlkZSBhbm90aGVyIGltcGxlbWVudGF0aW9uXHJcbiAqIHRvIHVzZSBhbiBhbHRlcm5hdGl2ZSBmb3JtYXQuXHJcbiAqL1xyXG5ASW5qZWN0YWJsZSh7cHJvdmlkZWRJbjogJ3Jvb3QnLCB1c2VGYWN0b3J5OiBOR0JfREFURVBJQ0tFUl9QQVJTRVJfRk9STUFUVEVSX0ZBQ1RPUll9KVxyXG5leHBvcnQgYWJzdHJhY3QgY2xhc3MgTmdiRGF0ZVBhcnNlckZvcm1hdHRlciB7XHJcbiAgLyoqXHJcbiAgICogUGFyc2VzIHRoZSBnaXZlbiB2YWx1ZSB0byBhbiBOZ2JEYXRlU3RydWN0LiBJbXBsZW1lbnRhdGlvbnMgc2hvdWxkIHRyeSB0aGVpciBiZXN0IHRvIHByb3ZpZGUgYSByZXN1bHQsIGV2ZW5cclxuICAgKiBwYXJ0aWFsLiBUaGV5IG11c3QgcmV0dXJuIG51bGwgaWYgdGhlIHZhbHVlIGNhbid0IGJlIHBhcnNlZC5cclxuICAgKiBAcGFyYW0gdmFsdWUgdGhlIHZhbHVlIHRvIHBhcnNlXHJcbiAgICovXHJcbiAgYWJzdHJhY3QgcGFyc2UodmFsdWU6IHN0cmluZyk6IE5nYkRhdGVTdHJ1Y3Q7XHJcblxyXG4gIC8qKlxyXG4gICAqIEZvcm1hdHMgdGhlIGdpdmVuIGRhdGUgdG8gYSBzdHJpbmcuIEltcGxlbWVudGF0aW9ucyBzaG91bGQgcmV0dXJuIGFuIGVtcHR5IHN0cmluZyBpZiB0aGUgZ2l2ZW4gZGF0ZSBpcyBudWxsLFxyXG4gICAqIGFuZCB0cnkgdGhlaXIgYmVzdCB0byBwcm92aWRlIGEgcGFydGlhbCByZXN1bHQgaWYgdGhlIGdpdmVuIGRhdGUgaXMgaW5jb21wbGV0ZSBvciBpbnZhbGlkLlxyXG4gICAqIEBwYXJhbSBkYXRlIHRoZSBkYXRlIHRvIGZvcm1hdCBhcyBhIHN0cmluZ1xyXG4gICAqL1xyXG4gIGFic3RyYWN0IGZvcm1hdChkYXRlOiBOZ2JEYXRlU3RydWN0KTogc3RyaW5nO1xyXG59XHJcblxyXG5ASW5qZWN0YWJsZSgpXHJcbmV4cG9ydCBjbGFzcyBOZ2JEYXRlSVNPUGFyc2VyRm9ybWF0dGVyIGV4dGVuZHMgTmdiRGF0ZVBhcnNlckZvcm1hdHRlciB7XHJcbiAgcGFyc2UodmFsdWU6IHN0cmluZyk6IE5nYkRhdGVTdHJ1Y3Qge1xyXG4gICAgaWYgKHZhbHVlKSB7XHJcbiAgICAgIGNvbnN0IGRhdGVQYXJ0cyA9IHZhbHVlLnRyaW0oKS5zcGxpdCgnLScpO1xyXG4gICAgICBpZiAoZGF0ZVBhcnRzLmxlbmd0aCA9PT0gMSAmJiBpc051bWJlcihkYXRlUGFydHNbMF0pKSB7XHJcbiAgICAgICAgcmV0dXJuIHt5ZWFyOiB0b0ludGVnZXIoZGF0ZVBhcnRzWzBdKSwgbW9udGg6IG51bGwsIGRheTogbnVsbH07XHJcbiAgICAgIH0gZWxzZSBpZiAoZGF0ZVBhcnRzLmxlbmd0aCA9PT0gMiAmJiBpc051bWJlcihkYXRlUGFydHNbMF0pICYmIGlzTnVtYmVyKGRhdGVQYXJ0c1sxXSkpIHtcclxuICAgICAgICByZXR1cm4ge3llYXI6IHRvSW50ZWdlcihkYXRlUGFydHNbMF0pLCBtb250aDogdG9JbnRlZ2VyKGRhdGVQYXJ0c1sxXSksIGRheTogbnVsbH07XHJcbiAgICAgIH0gZWxzZSBpZiAoZGF0ZVBhcnRzLmxlbmd0aCA9PT0gMyAmJiBpc051bWJlcihkYXRlUGFydHNbMF0pICYmIGlzTnVtYmVyKGRhdGVQYXJ0c1sxXSkgJiYgaXNOdW1iZXIoZGF0ZVBhcnRzWzJdKSkge1xyXG4gICAgICAgIHJldHVybiB7eWVhcjogdG9JbnRlZ2VyKGRhdGVQYXJ0c1swXSksIG1vbnRoOiB0b0ludGVnZXIoZGF0ZVBhcnRzWzFdKSwgZGF5OiB0b0ludGVnZXIoZGF0ZVBhcnRzWzJdKX07XHJcbiAgICAgIH1cclxuICAgIH1cclxuICAgIHJldHVybiBudWxsO1xyXG4gIH1cclxuXHJcbiAgZm9ybWF0KGRhdGU6IE5nYkRhdGVTdHJ1Y3QpOiBzdHJpbmcge1xyXG4gICAgcmV0dXJuIGRhdGUgP1xyXG4gICAgICAgIGAke2RhdGUueWVhcn0tJHtpc051bWJlcihkYXRlLm1vbnRoKSA/IHBhZE51bWJlcihkYXRlLm1vbnRoKSA6ICcnfS0ke2lzTnVtYmVyKGRhdGUuZGF5KSA/IHBhZE51bWJlcihkYXRlLmRheSkgOiAnJ31gIDpcclxuICAgICAgICAnJztcclxuICB9XHJcbn1cclxuIl19