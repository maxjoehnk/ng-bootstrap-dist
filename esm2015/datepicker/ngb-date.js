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
export class NgbDate {
    /**
     * Static method. Creates a new date object from the NgbDateStruct, ex. NgbDate.from({year: 2000,
     * month: 5, day: 1}). If the 'date' is already of NgbDate, the method will return the same object
     * @param {?} date
     * @return {?}
     */
    static from(date) {
        if (date instanceof NgbDate) {
            return date;
        }
        return date ? new NgbDate(date.year, date.month, date.day) : null;
    }
    /**
     * @param {?} year
     * @param {?} month
     * @param {?} day
     */
    constructor(year, month, day) {
        this.year = isInteger(year) ? year : null;
        this.month = isInteger(month) ? month : null;
        this.day = isInteger(day) ? day : null;
    }
    /**
     * Checks if current date is equal to another date
     * @param {?} other
     * @return {?}
     */
    equals(other) {
        return other && this.year === other.year && this.month === other.month && this.day === other.day;
    }
    /**
     * Checks if current date is before another date
     * @param {?} other
     * @return {?}
     */
    before(other) {
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
    }
    /**
     * Checks if current date is after another date
     * @param {?} other
     * @return {?}
     */
    after(other) {
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
    }
}
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmdiLWRhdGUuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AbmctYm9vdHN0cmFwL25nLWJvb3RzdHJhcC8iLCJzb3VyY2VzIjpbImRhdGVwaWNrZXIvbmdiLWRhdGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUNBLE9BQU8sRUFBQyxTQUFTLEVBQUMsTUFBTSxjQUFjLENBQUM7Ozs7OztBQU92QyxNQUFNOzs7Ozs7O0lBb0JKLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBbUI7UUFDN0IsRUFBRSxDQUFDLENBQUMsSUFBSSxZQUFZLE9BQU8sQ0FBQyxDQUFDLENBQUM7WUFDNUIsTUFBTSxDQUFDLElBQUksQ0FBQztTQUNiO1FBQ0QsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsSUFBSSxPQUFPLENBQUMsSUFBSSxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsS0FBSyxFQUFFLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDO0tBQ25FOzs7Ozs7SUFFRCxZQUFZLElBQVksRUFBRSxLQUFhLEVBQUUsR0FBVztRQUNsRCxJQUFJLENBQUMsSUFBSSxHQUFHLFNBQVMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUM7UUFDMUMsSUFBSSxDQUFDLEtBQUssR0FBRyxTQUFTLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDO1FBQzdDLElBQUksQ0FBQyxHQUFHLEdBQUcsU0FBUyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQztLQUN4Qzs7Ozs7O0lBS0QsTUFBTSxDQUFDLEtBQWM7UUFDbkIsTUFBTSxDQUFDLEtBQUssSUFBSSxJQUFJLENBQUMsSUFBSSxLQUFLLEtBQUssQ0FBQyxJQUFJLElBQUksSUFBSSxDQUFDLEtBQUssS0FBSyxLQUFLLENBQUMsS0FBSyxJQUFJLElBQUksQ0FBQyxHQUFHLEtBQUssS0FBSyxDQUFDLEdBQUcsQ0FBQztLQUNsRzs7Ozs7O0lBS0QsTUFBTSxDQUFDLEtBQWM7UUFDbkIsRUFBRSxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO1lBQ1gsTUFBTSxDQUFDLEtBQUssQ0FBQztTQUNkO1FBRUQsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksS0FBSyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztZQUM3QixFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsS0FBSyxLQUFLLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO2dCQUMvQixNQUFNLENBQUMsSUFBSSxDQUFDLEdBQUcsS0FBSyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLEdBQUcsS0FBSyxDQUFDLEdBQUcsQ0FBQzthQUM5RDtZQUFDLElBQUksQ0FBQyxDQUFDO2dCQUNOLE1BQU0sQ0FBQyxJQUFJLENBQUMsS0FBSyxHQUFHLEtBQUssQ0FBQyxLQUFLLENBQUM7YUFDakM7U0FDRjtRQUFDLElBQUksQ0FBQyxDQUFDO1lBQ04sTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLEdBQUcsS0FBSyxDQUFDLElBQUksQ0FBQztTQUMvQjtLQUNGOzs7Ozs7SUFLRCxLQUFLLENBQUMsS0FBYztRQUNsQixFQUFFLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7WUFDWCxNQUFNLENBQUMsS0FBSyxDQUFDO1NBQ2Q7UUFDRCxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxLQUFLLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO1lBQzdCLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxLQUFLLEtBQUssS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7Z0JBQy9CLE1BQU0sQ0FBQyxJQUFJLENBQUMsR0FBRyxLQUFLLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsR0FBRyxLQUFLLENBQUMsR0FBRyxDQUFDO2FBQzlEO1lBQUMsSUFBSSxDQUFDLENBQUM7Z0JBQ04sTUFBTSxDQUFDLElBQUksQ0FBQyxLQUFLLEdBQUcsS0FBSyxDQUFDLEtBQUssQ0FBQzthQUNqQztTQUNGO1FBQUMsSUFBSSxDQUFDLENBQUM7WUFDTixNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksR0FBRyxLQUFLLENBQUMsSUFBSSxDQUFDO1NBQy9CO0tBQ0Y7Q0FDRiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7TmdiRGF0ZVN0cnVjdH0gZnJvbSAnLi9uZ2ItZGF0ZS1zdHJ1Y3QnO1xyXG5pbXBvcnQge2lzSW50ZWdlcn0gZnJvbSAnLi4vdXRpbC91dGlsJztcclxuXHJcbi8qKlxyXG4gKiBTaW1wbGUgY2xhc3MgdXNlZCBmb3IgYSBkYXRlIHJlcHJlc2VudGF0aW9uIHRoYXQgZGF0ZXBpY2tlciBhbHNvIHVzZXMgaW50ZXJuYWxseVxyXG4gKlxyXG4gKiBAc2luY2UgMy4wLjBcclxuICovXHJcbmV4cG9ydCBjbGFzcyBOZ2JEYXRlIGltcGxlbWVudHMgTmdiRGF0ZVN0cnVjdCB7XHJcbiAgLyoqXHJcbiAgICogVGhlIHllYXIsIGZvciBleGFtcGxlIDIwMTZcclxuICAgKi9cclxuICB5ZWFyOiBudW1iZXI7XHJcblxyXG4gIC8qKlxyXG4gICAqIFRoZSBtb250aCwgZm9yIGV4YW1wbGUgMT1KYW4gLi4uIDEyPURlYyBhcyBpbiBJU08gODYwMVxyXG4gICAqL1xyXG4gIG1vbnRoOiBudW1iZXI7XHJcblxyXG4gIC8qKlxyXG4gICAqIFRoZSBkYXkgb2YgbW9udGgsIHN0YXJ0aW5nIHdpdGggMVxyXG4gICAqL1xyXG4gIGRheTogbnVtYmVyO1xyXG5cclxuICAvKipcclxuICAgKiBTdGF0aWMgbWV0aG9kLiBDcmVhdGVzIGEgbmV3IGRhdGUgb2JqZWN0IGZyb20gdGhlIE5nYkRhdGVTdHJ1Y3QsIGV4LiBOZ2JEYXRlLmZyb20oe3llYXI6IDIwMDAsXHJcbiAgICogbW9udGg6IDUsIGRheTogMX0pLiBJZiB0aGUgJ2RhdGUnIGlzIGFscmVhZHkgb2YgTmdiRGF0ZSwgdGhlIG1ldGhvZCB3aWxsIHJldHVybiB0aGUgc2FtZSBvYmplY3RcclxuICAgKi9cclxuICBzdGF0aWMgZnJvbShkYXRlOiBOZ2JEYXRlU3RydWN0KTogTmdiRGF0ZSB7XHJcbiAgICBpZiAoZGF0ZSBpbnN0YW5jZW9mIE5nYkRhdGUpIHtcclxuICAgICAgcmV0dXJuIGRhdGU7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gZGF0ZSA/IG5ldyBOZ2JEYXRlKGRhdGUueWVhciwgZGF0ZS5tb250aCwgZGF0ZS5kYXkpIDogbnVsbDtcclxuICB9XHJcblxyXG4gIGNvbnN0cnVjdG9yKHllYXI6IG51bWJlciwgbW9udGg6IG51bWJlciwgZGF5OiBudW1iZXIpIHtcclxuICAgIHRoaXMueWVhciA9IGlzSW50ZWdlcih5ZWFyKSA/IHllYXIgOiBudWxsO1xyXG4gICAgdGhpcy5tb250aCA9IGlzSW50ZWdlcihtb250aCkgPyBtb250aCA6IG51bGw7XHJcbiAgICB0aGlzLmRheSA9IGlzSW50ZWdlcihkYXkpID8gZGF5IDogbnVsbDtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIENoZWNrcyBpZiBjdXJyZW50IGRhdGUgaXMgZXF1YWwgdG8gYW5vdGhlciBkYXRlXHJcbiAgICovXHJcbiAgZXF1YWxzKG90aGVyOiBOZ2JEYXRlKTogYm9vbGVhbiB7XHJcbiAgICByZXR1cm4gb3RoZXIgJiYgdGhpcy55ZWFyID09PSBvdGhlci55ZWFyICYmIHRoaXMubW9udGggPT09IG90aGVyLm1vbnRoICYmIHRoaXMuZGF5ID09PSBvdGhlci5kYXk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBDaGVja3MgaWYgY3VycmVudCBkYXRlIGlzIGJlZm9yZSBhbm90aGVyIGRhdGVcclxuICAgKi9cclxuICBiZWZvcmUob3RoZXI6IE5nYkRhdGUpOiBib29sZWFuIHtcclxuICAgIGlmICghb3RoZXIpIHtcclxuICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgfVxyXG5cclxuICAgIGlmICh0aGlzLnllYXIgPT09IG90aGVyLnllYXIpIHtcclxuICAgICAgaWYgKHRoaXMubW9udGggPT09IG90aGVyLm1vbnRoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuZGF5ID09PSBvdGhlci5kYXkgPyBmYWxzZSA6IHRoaXMuZGF5IDwgb3RoZXIuZGF5O1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIHJldHVybiB0aGlzLm1vbnRoIDwgb3RoZXIubW9udGg7XHJcbiAgICAgIH1cclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHJldHVybiB0aGlzLnllYXIgPCBvdGhlci55ZWFyO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogQ2hlY2tzIGlmIGN1cnJlbnQgZGF0ZSBpcyBhZnRlciBhbm90aGVyIGRhdGVcclxuICAgKi9cclxuICBhZnRlcihvdGhlcjogTmdiRGF0ZSk6IGJvb2xlYW4ge1xyXG4gICAgaWYgKCFvdGhlcikge1xyXG4gICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9XHJcbiAgICBpZiAodGhpcy55ZWFyID09PSBvdGhlci55ZWFyKSB7XHJcbiAgICAgIGlmICh0aGlzLm1vbnRoID09PSBvdGhlci5tb250aCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmRheSA9PT0gb3RoZXIuZGF5ID8gZmFsc2UgOiB0aGlzLmRheSA+IG90aGVyLmRheTtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5tb250aCA+IG90aGVyLm1vbnRoO1xyXG4gICAgICB9XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICByZXR1cm4gdGhpcy55ZWFyID4gb3RoZXIueWVhcjtcclxuICAgIH1cclxuICB9XHJcbn1cclxuIl19