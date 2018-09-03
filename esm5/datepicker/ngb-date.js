/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { isInteger } from '../util/util';
/**
 * Simple class used for a date representation that datepicker also uses internally
 *
 * \@since 3.0.0
 */
var /**
 * Simple class used for a date representation that datepicker also uses internally
 *
 * \@since 3.0.0
 */
NgbDate = /** @class */ (function () {
    function NgbDate(year, month, day) {
        this.year = isInteger(year) ? year : null;
        this.month = isInteger(month) ? month : null;
        this.day = isInteger(day) ? day : null;
    }
    /**
     * Static method. Creates a new date object from the NgbDateStruct, ex. NgbDate.from({year: 2000,
     * month: 5, day: 1}). If the 'date' is already of NgbDate, the method will return the same object
     */
    /**
     * Static method. Creates a new date object from the NgbDateStruct, ex. NgbDate.from({year: 2000,
     * month: 5, day: 1}). If the 'date' is already of NgbDate, the method will return the same object
     * @param {?} date
     * @return {?}
     */
    NgbDate.from = /**
     * Static method. Creates a new date object from the NgbDateStruct, ex. NgbDate.from({year: 2000,
     * month: 5, day: 1}). If the 'date' is already of NgbDate, the method will return the same object
     * @param {?} date
     * @return {?}
     */
    function (date) {
        if (date instanceof NgbDate) {
            return date;
        }
        return date ? new NgbDate(date.year, date.month, date.day) : null;
    };
    /**
     * Checks if current date is equal to another date
     */
    /**
     * Checks if current date is equal to another date
     * @param {?} other
     * @return {?}
     */
    NgbDate.prototype.equals = /**
     * Checks if current date is equal to another date
     * @param {?} other
     * @return {?}
     */
    function (other) {
        return other && this.year === other.year && this.month === other.month && this.day === other.day;
    };
    /**
     * Checks if current date is before another date
     */
    /**
     * Checks if current date is before another date
     * @param {?} other
     * @return {?}
     */
    NgbDate.prototype.before = /**
     * Checks if current date is before another date
     * @param {?} other
     * @return {?}
     */
    function (other) {
        if (!other) {
            return false;
        }
        if (this.year === other.year) {
            if (this.month === other.month) {
                return this.day === other.day ? false : this.day < other.day;
            }
            else {
                return this.month < other.month;
            }
        }
        else {
            return this.year < other.year;
        }
    };
    /**
     * Checks if current date is after another date
     */
    /**
     * Checks if current date is after another date
     * @param {?} other
     * @return {?}
     */
    NgbDate.prototype.after = /**
     * Checks if current date is after another date
     * @param {?} other
     * @return {?}
     */
    function (other) {
        if (!other) {
            return false;
        }
        if (this.year === other.year) {
            if (this.month === other.month) {
                return this.day === other.day ? false : this.day > other.day;
            }
            else {
                return this.month > other.month;
            }
        }
        else {
            return this.year > other.year;
        }
    };
    return NgbDate;
}());
/**
 * Simple class used for a date representation that datepicker also uses internally
 *
 * \@since 3.0.0
 */
export { NgbDate };
if (false) {
    /**
     * The year, for example 2016
     * @type {?}
     */
    NgbDate.prototype.year;
    /**
     * The month, for example 1=Jan ... 12=Dec as in ISO 8601
     * @type {?}
     */
    NgbDate.prototype.month;
    /**
     * The day of month, starting with 1
     * @type {?}
     */
    NgbDate.prototype.day;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmdiLWRhdGUuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AbmctYm9vdHN0cmFwL25nLWJvb3RzdHJhcC8iLCJzb3VyY2VzIjpbImRhdGVwaWNrZXIvbmdiLWRhdGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUNBLE9BQU8sRUFBQyxTQUFTLEVBQUMsTUFBTSxjQUFjLENBQUM7Ozs7OztBQU92Qzs7Ozs7QUFBQTtJQTJCRSxpQkFBWSxJQUFZLEVBQUUsS0FBYSxFQUFFLEdBQVc7UUFDbEQsSUFBSSxDQUFDLElBQUksR0FBRyxTQUFTLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDO1FBQzFDLElBQUksQ0FBQyxLQUFLLEdBQUcsU0FBUyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQztRQUM3QyxJQUFJLENBQUMsR0FBRyxHQUFHLFNBQVMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUM7S0FDeEM7SUFmRDs7O09BR0c7Ozs7Ozs7SUFDSSxZQUFJOzs7Ozs7SUFBWCxVQUFZLElBQW1CO1FBQzdCLEVBQUUsQ0FBQyxDQUFDLElBQUksWUFBWSxPQUFPLENBQUMsQ0FBQyxDQUFDO1lBQzVCLE1BQU0sQ0FBQyxJQUFJLENBQUM7U0FDYjtRQUNELE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLElBQUksT0FBTyxDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLEtBQUssRUFBRSxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQztLQUNuRTtJQVFEOztPQUVHOzs7Ozs7SUFDSCx3QkFBTTs7Ozs7SUFBTixVQUFPLEtBQWM7UUFDbkIsTUFBTSxDQUFDLEtBQUssSUFBSSxJQUFJLENBQUMsSUFBSSxLQUFLLEtBQUssQ0FBQyxJQUFJLElBQUksSUFBSSxDQUFDLEtBQUssS0FBSyxLQUFLLENBQUMsS0FBSyxJQUFJLElBQUksQ0FBQyxHQUFHLEtBQUssS0FBSyxDQUFDLEdBQUcsQ0FBQztLQUNsRztJQUVEOztPQUVHOzs7Ozs7SUFDSCx3QkFBTTs7Ozs7SUFBTixVQUFPLEtBQWM7UUFDbkIsRUFBRSxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO1lBQ1gsTUFBTSxDQUFDLEtBQUssQ0FBQztTQUNkO1FBRUQsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksS0FBSyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztZQUM3QixFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsS0FBSyxLQUFLLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO2dCQUMvQixNQUFNLENBQUMsSUFBSSxDQUFDLEdBQUcsS0FBSyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLEdBQUcsS0FBSyxDQUFDLEdBQUcsQ0FBQzthQUM5RDtZQUFDLElBQUksQ0FBQyxDQUFDO2dCQUNOLE1BQU0sQ0FBQyxJQUFJLENBQUMsS0FBSyxHQUFHLEtBQUssQ0FBQyxLQUFLLENBQUM7YUFDakM7U0FDRjtRQUFDLElBQUksQ0FBQyxDQUFDO1lBQ04sTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLEdBQUcsS0FBSyxDQUFDLElBQUksQ0FBQztTQUMvQjtLQUNGO0lBRUQ7O09BRUc7Ozs7OztJQUNILHVCQUFLOzs7OztJQUFMLFVBQU0sS0FBYztRQUNsQixFQUFFLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7WUFDWCxNQUFNLENBQUMsS0FBSyxDQUFDO1NBQ2Q7UUFDRCxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxLQUFLLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO1lBQzdCLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxLQUFLLEtBQUssS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7Z0JBQy9CLE1BQU0sQ0FBQyxJQUFJLENBQUMsR0FBRyxLQUFLLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsR0FBRyxLQUFLLENBQUMsR0FBRyxDQUFDO2FBQzlEO1lBQUMsSUFBSSxDQUFDLENBQUM7Z0JBQ04sTUFBTSxDQUFDLElBQUksQ0FBQyxLQUFLLEdBQUcsS0FBSyxDQUFDLEtBQUssQ0FBQzthQUNqQztTQUNGO1FBQUMsSUFBSSxDQUFDLENBQUM7WUFDTixNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksR0FBRyxLQUFLLENBQUMsSUFBSSxDQUFDO1NBQy9CO0tBQ0Y7a0JBbkZIO0lBb0ZDLENBQUE7Ozs7OztBQTVFRCxtQkE0RUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge05nYkRhdGVTdHJ1Y3R9IGZyb20gJy4vbmdiLWRhdGUtc3RydWN0JztcclxuaW1wb3J0IHtpc0ludGVnZXJ9IGZyb20gJy4uL3V0aWwvdXRpbCc7XHJcblxyXG4vKipcclxuICogU2ltcGxlIGNsYXNzIHVzZWQgZm9yIGEgZGF0ZSByZXByZXNlbnRhdGlvbiB0aGF0IGRhdGVwaWNrZXIgYWxzbyB1c2VzIGludGVybmFsbHlcclxuICpcclxuICogQHNpbmNlIDMuMC4wXHJcbiAqL1xyXG5leHBvcnQgY2xhc3MgTmdiRGF0ZSBpbXBsZW1lbnRzIE5nYkRhdGVTdHJ1Y3Qge1xyXG4gIC8qKlxyXG4gICAqIFRoZSB5ZWFyLCBmb3IgZXhhbXBsZSAyMDE2XHJcbiAgICovXHJcbiAgeWVhcjogbnVtYmVyO1xyXG5cclxuICAvKipcclxuICAgKiBUaGUgbW9udGgsIGZvciBleGFtcGxlIDE9SmFuIC4uLiAxMj1EZWMgYXMgaW4gSVNPIDg2MDFcclxuICAgKi9cclxuICBtb250aDogbnVtYmVyO1xyXG5cclxuICAvKipcclxuICAgKiBUaGUgZGF5IG9mIG1vbnRoLCBzdGFydGluZyB3aXRoIDFcclxuICAgKi9cclxuICBkYXk6IG51bWJlcjtcclxuXHJcbiAgLyoqXHJcbiAgICogU3RhdGljIG1ldGhvZC4gQ3JlYXRlcyBhIG5ldyBkYXRlIG9iamVjdCBmcm9tIHRoZSBOZ2JEYXRlU3RydWN0LCBleC4gTmdiRGF0ZS5mcm9tKHt5ZWFyOiAyMDAwLFxyXG4gICAqIG1vbnRoOiA1LCBkYXk6IDF9KS4gSWYgdGhlICdkYXRlJyBpcyBhbHJlYWR5IG9mIE5nYkRhdGUsIHRoZSBtZXRob2Qgd2lsbCByZXR1cm4gdGhlIHNhbWUgb2JqZWN0XHJcbiAgICovXHJcbiAgc3RhdGljIGZyb20oZGF0ZTogTmdiRGF0ZVN0cnVjdCk6IE5nYkRhdGUge1xyXG4gICAgaWYgKGRhdGUgaW5zdGFuY2VvZiBOZ2JEYXRlKSB7XHJcbiAgICAgIHJldHVybiBkYXRlO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIGRhdGUgPyBuZXcgTmdiRGF0ZShkYXRlLnllYXIsIGRhdGUubW9udGgsIGRhdGUuZGF5KSA6IG51bGw7XHJcbiAgfVxyXG5cclxuICBjb25zdHJ1Y3Rvcih5ZWFyOiBudW1iZXIsIG1vbnRoOiBudW1iZXIsIGRheTogbnVtYmVyKSB7XHJcbiAgICB0aGlzLnllYXIgPSBpc0ludGVnZXIoeWVhcikgPyB5ZWFyIDogbnVsbDtcclxuICAgIHRoaXMubW9udGggPSBpc0ludGVnZXIobW9udGgpID8gbW9udGggOiBudWxsO1xyXG4gICAgdGhpcy5kYXkgPSBpc0ludGVnZXIoZGF5KSA/IGRheSA6IG51bGw7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBDaGVja3MgaWYgY3VycmVudCBkYXRlIGlzIGVxdWFsIHRvIGFub3RoZXIgZGF0ZVxyXG4gICAqL1xyXG4gIGVxdWFscyhvdGhlcjogTmdiRGF0ZSk6IGJvb2xlYW4ge1xyXG4gICAgcmV0dXJuIG90aGVyICYmIHRoaXMueWVhciA9PT0gb3RoZXIueWVhciAmJiB0aGlzLm1vbnRoID09PSBvdGhlci5tb250aCAmJiB0aGlzLmRheSA9PT0gb3RoZXIuZGF5O1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogQ2hlY2tzIGlmIGN1cnJlbnQgZGF0ZSBpcyBiZWZvcmUgYW5vdGhlciBkYXRlXHJcbiAgICovXHJcbiAgYmVmb3JlKG90aGVyOiBOZ2JEYXRlKTogYm9vbGVhbiB7XHJcbiAgICBpZiAoIW90aGVyKSB7XHJcbiAgICAgIHJldHVybiBmYWxzZTtcclxuICAgIH1cclxuXHJcbiAgICBpZiAodGhpcy55ZWFyID09PSBvdGhlci55ZWFyKSB7XHJcbiAgICAgIGlmICh0aGlzLm1vbnRoID09PSBvdGhlci5tb250aCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmRheSA9PT0gb3RoZXIuZGF5ID8gZmFsc2UgOiB0aGlzLmRheSA8IG90aGVyLmRheTtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5tb250aCA8IG90aGVyLm1vbnRoO1xyXG4gICAgICB9XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICByZXR1cm4gdGhpcy55ZWFyIDwgb3RoZXIueWVhcjtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIENoZWNrcyBpZiBjdXJyZW50IGRhdGUgaXMgYWZ0ZXIgYW5vdGhlciBkYXRlXHJcbiAgICovXHJcbiAgYWZ0ZXIob3RoZXI6IE5nYkRhdGUpOiBib29sZWFuIHtcclxuICAgIGlmICghb3RoZXIpIHtcclxuICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgfVxyXG4gICAgaWYgKHRoaXMueWVhciA9PT0gb3RoZXIueWVhcikge1xyXG4gICAgICBpZiAodGhpcy5tb250aCA9PT0gb3RoZXIubW9udGgpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5kYXkgPT09IG90aGVyLmRheSA/IGZhbHNlIDogdGhpcy5kYXkgPiBvdGhlci5kYXk7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMubW9udGggPiBvdGhlci5tb250aDtcclxuICAgICAgfVxyXG4gICAgfSBlbHNlIHtcclxuICAgICAgcmV0dXJuIHRoaXMueWVhciA+IG90aGVyLnllYXI7XHJcbiAgICB9XHJcbiAgfVxyXG59XHJcbiJdfQ==