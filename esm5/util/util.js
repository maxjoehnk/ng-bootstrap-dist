/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
/**
 * @param {?} value
 * @return {?}
 */
export function toInteger(value) {
    return parseInt("" + value, 10);
}
/**
 * @param {?} value
 * @return {?}
 */
export function toString(value) {
    return (value !== undefined && value !== null) ? "" + value : '';
}
/**
 * @param {?} value
 * @param {?} max
 * @param {?=} min
 * @return {?}
 */
export function getValueInRange(value, max, min) {
    if (min === void 0) { min = 0; }
    return Math.max(Math.min(value, max), min);
}
/**
 * @param {?} value
 * @return {?}
 */
export function isString(value) {
    return typeof value === 'string';
}
/**
 * @param {?} value
 * @return {?}
 */
export function isNumber(value) {
    return !isNaN(toInteger(value));
}
/**
 * @param {?} value
 * @return {?}
 */
export function isInteger(value) {
    return typeof value === 'number' && isFinite(value) && Math.floor(value) === value;
}
/**
 * @param {?} value
 * @return {?}
 */
export function isDefined(value) {
    return value !== undefined && value !== null;
}
/**
 * @param {?} value
 * @return {?}
 */
export function padNumber(value) {
    if (isNumber(value)) {
        return ("0" + value).slice(-2);
    }
    else {
        return '';
    }
}
/**
 * @param {?} text
 * @return {?}
 */
export function regExpEscape(text) {
    return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&');
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXRpbC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BuZy1ib290c3RyYXAvbmctYm9vdHN0cmFwLyIsInNvdXJjZXMiOlsidXRpbC91dGlsLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7O0FBQUEsTUFBTSxvQkFBb0IsS0FBVTtJQUNsQyxNQUFNLENBQUMsUUFBUSxDQUFDLEtBQUcsS0FBTyxFQUFFLEVBQUUsQ0FBQyxDQUFDO0NBQ2pDOzs7OztBQUVELE1BQU0sbUJBQW1CLEtBQVU7SUFDakMsTUFBTSxDQUFDLENBQUMsS0FBSyxLQUFLLFNBQVMsSUFBSSxLQUFLLEtBQUssSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUcsS0FBTyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUM7Q0FDbEU7Ozs7Ozs7QUFFRCxNQUFNLDBCQUEwQixLQUFhLEVBQUUsR0FBVyxFQUFFLEdBQU87SUFBUCxvQkFBQSxFQUFBLE9BQU87SUFDakUsTUFBTSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxLQUFLLEVBQUUsR0FBRyxDQUFDLEVBQUUsR0FBRyxDQUFDLENBQUM7Q0FDNUM7Ozs7O0FBRUQsTUFBTSxtQkFBbUIsS0FBVTtJQUNqQyxNQUFNLENBQUMsT0FBTyxLQUFLLEtBQUssUUFBUSxDQUFDO0NBQ2xDOzs7OztBQUVELE1BQU0sbUJBQW1CLEtBQVU7SUFDakMsTUFBTSxDQUFDLENBQUMsS0FBSyxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO0NBQ2pDOzs7OztBQUVELE1BQU0sb0JBQW9CLEtBQVU7SUFDbEMsTUFBTSxDQUFDLE9BQU8sS0FBSyxLQUFLLFFBQVEsSUFBSSxRQUFRLENBQUMsS0FBSyxDQUFDLElBQUksSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsS0FBSyxLQUFLLENBQUM7Q0FDcEY7Ozs7O0FBRUQsTUFBTSxvQkFBb0IsS0FBVTtJQUNsQyxNQUFNLENBQUMsS0FBSyxLQUFLLFNBQVMsSUFBSSxLQUFLLEtBQUssSUFBSSxDQUFDO0NBQzlDOzs7OztBQUVELE1BQU0sb0JBQW9CLEtBQWE7SUFDckMsRUFBRSxDQUFDLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUNwQixNQUFNLENBQUMsQ0FBQSxNQUFJLEtBQU8sQ0FBQSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0tBQzlCO0lBQUMsSUFBSSxDQUFDLENBQUM7UUFDTixNQUFNLENBQUMsRUFBRSxDQUFDO0tBQ1g7Q0FDRjs7Ozs7QUFFRCxNQUFNLHVCQUF1QixJQUFJO0lBQy9CLE1BQU0sQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLDBCQUEwQixFQUFFLE1BQU0sQ0FBQyxDQUFDO0NBQ3pEIiwic291cmNlc0NvbnRlbnQiOlsiZXhwb3J0IGZ1bmN0aW9uIHRvSW50ZWdlcih2YWx1ZTogYW55KTogbnVtYmVyIHtcclxuICByZXR1cm4gcGFyc2VJbnQoYCR7dmFsdWV9YCwgMTApO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gdG9TdHJpbmcodmFsdWU6IGFueSk6IHN0cmluZyB7XHJcbiAgcmV0dXJuICh2YWx1ZSAhPT0gdW5kZWZpbmVkICYmIHZhbHVlICE9PSBudWxsKSA/IGAke3ZhbHVlfWAgOiAnJztcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGdldFZhbHVlSW5SYW5nZSh2YWx1ZTogbnVtYmVyLCBtYXg6IG51bWJlciwgbWluID0gMCk6IG51bWJlciB7XHJcbiAgcmV0dXJuIE1hdGgubWF4KE1hdGgubWluKHZhbHVlLCBtYXgpLCBtaW4pO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gaXNTdHJpbmcodmFsdWU6IGFueSk6IHZhbHVlIGlzIHN0cmluZyB7XHJcbiAgcmV0dXJuIHR5cGVvZiB2YWx1ZSA9PT0gJ3N0cmluZyc7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBpc051bWJlcih2YWx1ZTogYW55KTogdmFsdWUgaXMgbnVtYmVyIHtcclxuICByZXR1cm4gIWlzTmFOKHRvSW50ZWdlcih2YWx1ZSkpO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gaXNJbnRlZ2VyKHZhbHVlOiBhbnkpOiB2YWx1ZSBpcyBudW1iZXIge1xyXG4gIHJldHVybiB0eXBlb2YgdmFsdWUgPT09ICdudW1iZXInICYmIGlzRmluaXRlKHZhbHVlKSAmJiBNYXRoLmZsb29yKHZhbHVlKSA9PT0gdmFsdWU7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBpc0RlZmluZWQodmFsdWU6IGFueSk6IGJvb2xlYW4ge1xyXG4gIHJldHVybiB2YWx1ZSAhPT0gdW5kZWZpbmVkICYmIHZhbHVlICE9PSBudWxsO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gcGFkTnVtYmVyKHZhbHVlOiBudW1iZXIpIHtcclxuICBpZiAoaXNOdW1iZXIodmFsdWUpKSB7XHJcbiAgICByZXR1cm4gYDAke3ZhbHVlfWAuc2xpY2UoLTIpO1xyXG4gIH0gZWxzZSB7XHJcbiAgICByZXR1cm4gJyc7XHJcbiAgfVxyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gcmVnRXhwRXNjYXBlKHRleHQpIHtcclxuICByZXR1cm4gdGV4dC5yZXBsYWNlKC9bLVtcXF17fSgpKis/LixcXFxcXiR8I1xcc10vZywgJ1xcXFwkJicpO1xyXG59XHJcbiJdfQ==