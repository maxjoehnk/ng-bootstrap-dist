/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
import { NgbDate } from '../ngb-date';
import { NgbCalendar } from '../ngb-calendar';
import { Injectable } from '@angular/core';
import { isNumber } from '../../util/util';
import { fromGregorian, getDayNumberInHebrewYear, getDaysInHebrewMonth, isHebrewLeapYear, toGregorian, setHebrewDay, setHebrewMonth } from './hebrew';
/**
 * The Hebrew or Jewish calendar is a lunisolar calendar.
 * In Israel, it is used for religious purposes and frequently - as an official calendar for civil purposes.
 *
 * \@since 3.2.0
 */
var NgbCalendarHebrew = /** @class */ (function (_super) {
    tslib_1.__extends(NgbCalendarHebrew, _super);
    function NgbCalendarHebrew() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     * @return {?}
     */
    NgbCalendarHebrew.prototype.getDaysPerWeek = /**
     * @return {?}
     */
    function () { return 7; };
    /**
     * @param {?=} year
     * @return {?}
     */
    NgbCalendarHebrew.prototype.getMonths = /**
     * @param {?=} year
     * @return {?}
     */
    function (year) {
        if (year && isHebrewLeapYear(year)) {
            return [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13];
        }
        else {
            return [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
        }
    };
    /**
     * @return {?}
     */
    NgbCalendarHebrew.prototype.getWeeksPerMonth = /**
     * @return {?}
     */
    function () { return 6; };
    /**
     * @param {?} date
     * @return {?}
     */
    NgbCalendarHebrew.prototype.isValid = /**
     * @param {?} date
     * @return {?}
     */
    function (date) {
        /** @type {?} */
        var b = date && isNumber(date.year) && isNumber(date.month) && isNumber(date.day);
        b = b && date.month > 0 && date.month <= (isHebrewLeapYear(date.year) ? 13 : 12);
        b = b && date.day > 0 && date.day <= getDaysInHebrewMonth(date.month, date.year);
        return b && !isNaN(toGregorian(date).getTime());
    };
    /**
     * @param {?} date
     * @param {?=} period
     * @param {?=} number
     * @return {?}
     */
    NgbCalendarHebrew.prototype.getNext = /**
     * @param {?} date
     * @param {?=} period
     * @param {?=} number
     * @return {?}
     */
    function (date, period, number) {
        if (period === void 0) { period = 'd'; }
        if (number === void 0) { number = 1; }
        date = new NgbDate(date.year, date.month, date.day);
        switch (period) {
            case 'y':
                date.year += number;
                date.month = 1;
                date.day = 1;
                return date;
            case 'm':
                date = setHebrewMonth(date, number);
                date.day = 1;
                return date;
            case 'd':
                return setHebrewDay(date, number);
            default:
                return date;
        }
    };
    /**
     * @param {?} date
     * @param {?=} period
     * @param {?=} number
     * @return {?}
     */
    NgbCalendarHebrew.prototype.getPrev = /**
     * @param {?} date
     * @param {?=} period
     * @param {?=} number
     * @return {?}
     */
    function (date, period, number) {
        if (period === void 0) { period = 'd'; }
        if (number === void 0) { number = 1; }
        return this.getNext(date, period, -number);
    };
    /**
     * @param {?} date
     * @return {?}
     */
    NgbCalendarHebrew.prototype.getWeekday = /**
     * @param {?} date
     * @return {?}
     */
    function (date) {
        /** @type {?} */
        var day = toGregorian(date).getDay();
        // in JS Date Sun=0, in ISO 8601 Sun=7
        return day === 0 ? 7 : day;
    };
    /**
     * @param {?} week
     * @param {?} firstDayOfWeek
     * @return {?}
     */
    NgbCalendarHebrew.prototype.getWeekNumber = /**
     * @param {?} week
     * @param {?} firstDayOfWeek
     * @return {?}
     */
    function (week, firstDayOfWeek) {
        /** @type {?} */
        var date = week[week.length - 1];
        return Math.ceil(getDayNumberInHebrewYear(date) / 7);
    };
    /**
     * @return {?}
     */
    NgbCalendarHebrew.prototype.getToday = /**
     * @return {?}
     */
    function () { return fromGregorian(new Date()); };
    NgbCalendarHebrew.decorators = [
        { type: Injectable },
    ];
    return NgbCalendarHebrew;
}(NgbCalendar));
export { NgbCalendarHebrew };

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmdiLWNhbGVuZGFyLWhlYnJldy5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BuZy1ib290c3RyYXAvbmctYm9vdHN0cmFwLyIsInNvdXJjZXMiOlsiZGF0ZXBpY2tlci9oZWJyZXcvbmdiLWNhbGVuZGFyLWhlYnJldy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLE9BQU8sRUFBQyxPQUFPLEVBQUMsTUFBTSxhQUFhLENBQUM7QUFDcEMsT0FBTyxFQUFDLFdBQVcsRUFBWSxNQUFNLGlCQUFpQixDQUFDO0FBQ3ZELE9BQU8sRUFBQyxVQUFVLEVBQUMsTUFBTSxlQUFlLENBQUM7QUFDekMsT0FBTyxFQUFDLFFBQVEsRUFBQyxNQUFNLGlCQUFpQixDQUFDO0FBQ3pDLE9BQU8sRUFDTCxhQUFhLEVBQ2Isd0JBQXdCLEVBQ3hCLG9CQUFvQixFQUNwQixnQkFBZ0IsRUFDaEIsV0FBVyxFQUNYLFlBQVksRUFDWixjQUFjLEVBQ2YsTUFBTSxVQUFVLENBQUM7Ozs7Ozs7O0lBU3FCLDZDQUFXOzs7Ozs7O0lBQ2hELDBDQUFjOzs7SUFBZCxjQUFtQixNQUFNLENBQUMsQ0FBQyxDQUFDLEVBQUU7Ozs7O0lBRTlCLHFDQUFTOzs7O0lBQVQsVUFBVSxJQUFhO1FBQ3JCLEVBQUUsQ0FBQyxDQUFDLElBQUksSUFBSSxnQkFBZ0IsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDbkMsTUFBTSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxDQUFDLENBQUM7U0FDcEQ7UUFBQyxJQUFJLENBQUMsQ0FBQztZQUNOLE1BQU0sQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxDQUFDLENBQUM7U0FDaEQ7S0FDRjs7OztJQUVELDRDQUFnQjs7O0lBQWhCLGNBQXFCLE1BQU0sQ0FBQyxDQUFDLENBQUMsRUFBRTs7Ozs7SUFFaEMsbUNBQU87Ozs7SUFBUCxVQUFRLElBQWE7O1FBQ25CLElBQUksQ0FBQyxHQUFHLElBQUksSUFBSSxRQUFRLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLFFBQVEsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksUUFBUSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUNsRixDQUFDLEdBQUcsQ0FBQyxJQUFJLElBQUksQ0FBQyxLQUFLLEdBQUcsQ0FBQyxJQUFJLElBQUksQ0FBQyxLQUFLLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUM7UUFDakYsQ0FBQyxHQUFHLENBQUMsSUFBSSxJQUFJLENBQUMsR0FBRyxHQUFHLENBQUMsSUFBSSxJQUFJLENBQUMsR0FBRyxJQUFJLG9CQUFvQixDQUFDLElBQUksQ0FBQyxLQUFLLEVBQUUsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ2pGLE1BQU0sQ0FBQyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxDQUFDLE9BQU8sRUFBRSxDQUFDLENBQUM7S0FDakQ7Ozs7Ozs7SUFFRCxtQ0FBTzs7Ozs7O0lBQVAsVUFBUSxJQUFhLEVBQUUsTUFBdUIsRUFBRSxNQUFVO1FBQW5DLHVCQUFBLEVBQUEsWUFBdUI7UUFBRSx1QkFBQSxFQUFBLFVBQVU7UUFDeEQsSUFBSSxHQUFHLElBQUksT0FBTyxDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLEtBQUssRUFBRSxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7UUFFcEQsTUFBTSxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQztZQUNmLEtBQUssR0FBRztnQkFDTixJQUFJLENBQUMsSUFBSSxJQUFJLE1BQU0sQ0FBQztnQkFDcEIsSUFBSSxDQUFDLEtBQUssR0FBRyxDQUFDLENBQUM7Z0JBQ2YsSUFBSSxDQUFDLEdBQUcsR0FBRyxDQUFDLENBQUM7Z0JBQ2IsTUFBTSxDQUFDLElBQUksQ0FBQztZQUNkLEtBQUssR0FBRztnQkFDTixJQUFJLEdBQUcsY0FBYyxDQUFDLElBQUksRUFBRSxNQUFNLENBQUMsQ0FBQztnQkFDcEMsSUFBSSxDQUFDLEdBQUcsR0FBRyxDQUFDLENBQUM7Z0JBQ2IsTUFBTSxDQUFDLElBQUksQ0FBQztZQUNkLEtBQUssR0FBRztnQkFDTixNQUFNLENBQUMsWUFBWSxDQUFDLElBQUksRUFBRSxNQUFNLENBQUMsQ0FBQztZQUNwQztnQkFDRSxNQUFNLENBQUMsSUFBSSxDQUFDO1NBQ2Y7S0FDRjs7Ozs7OztJQUVELG1DQUFPOzs7Ozs7SUFBUCxVQUFRLElBQWEsRUFBRSxNQUF1QixFQUFFLE1BQVU7UUFBbkMsdUJBQUEsRUFBQSxZQUF1QjtRQUFFLHVCQUFBLEVBQUEsVUFBVTtRQUFJLE1BQU0sQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksRUFBRSxNQUFNLEVBQUUsQ0FBQyxNQUFNLENBQUMsQ0FBQztLQUFFOzs7OztJQUUzRyxzQ0FBVTs7OztJQUFWLFVBQVcsSUFBYTs7UUFDdEIsSUFBTSxHQUFHLEdBQUcsV0FBVyxDQUFDLElBQUksQ0FBQyxDQUFDLE1BQU0sRUFBRSxDQUFDOztRQUV2QyxNQUFNLENBQUMsR0FBRyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUM7S0FDNUI7Ozs7OztJQUVELHlDQUFhOzs7OztJQUFiLFVBQWMsSUFBZSxFQUFFLGNBQXNCOztRQUNuRCxJQUFNLElBQUksR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUMsQ0FBQztRQUNuQyxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyx3QkFBd0IsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztLQUN0RDs7OztJQUVELG9DQUFROzs7SUFBUixjQUFzQixNQUFNLENBQUMsYUFBYSxDQUFDLElBQUksSUFBSSxFQUFFLENBQUMsQ0FBQyxFQUFFOztnQkF0RDFELFVBQVU7OzRCQXBCWDtFQXFCdUMsV0FBVztTQUFyQyxpQkFBaUIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge05nYkRhdGV9IGZyb20gJy4uL25nYi1kYXRlJztcclxuaW1wb3J0IHtOZ2JDYWxlbmRhciwgTmdiUGVyaW9kfSBmcm9tICcuLi9uZ2ItY2FsZW5kYXInO1xyXG5pbXBvcnQge0luamVjdGFibGV9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQge2lzTnVtYmVyfSBmcm9tICcuLi8uLi91dGlsL3V0aWwnO1xyXG5pbXBvcnQge1xyXG4gIGZyb21HcmVnb3JpYW4sXHJcbiAgZ2V0RGF5TnVtYmVySW5IZWJyZXdZZWFyLFxyXG4gIGdldERheXNJbkhlYnJld01vbnRoLFxyXG4gIGlzSGVicmV3TGVhcFllYXIsXHJcbiAgdG9HcmVnb3JpYW4sXHJcbiAgc2V0SGVicmV3RGF5LFxyXG4gIHNldEhlYnJld01vbnRoXHJcbn0gZnJvbSAnLi9oZWJyZXcnO1xyXG5cclxuLyoqXHJcbiAqIFRoZSBIZWJyZXcgb3IgSmV3aXNoIGNhbGVuZGFyIGlzIGEgbHVuaXNvbGFyIGNhbGVuZGFyLlxyXG4gKiBJbiBJc3JhZWwsIGl0IGlzIHVzZWQgZm9yIHJlbGlnaW91cyBwdXJwb3NlcyBhbmQgZnJlcXVlbnRseSAtIGFzIGFuIG9mZmljaWFsIGNhbGVuZGFyIGZvciBjaXZpbCBwdXJwb3Nlcy5cclxuICpcclxuICogQHNpbmNlIDMuMi4wXHJcbiAqL1xyXG5ASW5qZWN0YWJsZSgpXHJcbmV4cG9ydCBjbGFzcyBOZ2JDYWxlbmRhckhlYnJldyBleHRlbmRzIE5nYkNhbGVuZGFyIHtcclxuICBnZXREYXlzUGVyV2VlaygpIHsgcmV0dXJuIDc7IH1cclxuXHJcbiAgZ2V0TW9udGhzKHllYXI/OiBudW1iZXIpIHtcclxuICAgIGlmICh5ZWFyICYmIGlzSGVicmV3TGVhcFllYXIoeWVhcikpIHtcclxuICAgICAgcmV0dXJuIFsxLCAyLCAzLCA0LCA1LCA2LCA3LCA4LCA5LCAxMCwgMTEsIDEyLCAxM107XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICByZXR1cm4gWzEsIDIsIDMsIDQsIDUsIDYsIDcsIDgsIDksIDEwLCAxMSwgMTJdO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgZ2V0V2Vla3NQZXJNb250aCgpIHsgcmV0dXJuIDY7IH1cclxuXHJcbiAgaXNWYWxpZChkYXRlOiBOZ2JEYXRlKTogYm9vbGVhbiB7XHJcbiAgICBsZXQgYiA9IGRhdGUgJiYgaXNOdW1iZXIoZGF0ZS55ZWFyKSAmJiBpc051bWJlcihkYXRlLm1vbnRoKSAmJiBpc051bWJlcihkYXRlLmRheSk7XHJcbiAgICBiID0gYiAmJiBkYXRlLm1vbnRoID4gMCAmJiBkYXRlLm1vbnRoIDw9IChpc0hlYnJld0xlYXBZZWFyKGRhdGUueWVhcikgPyAxMyA6IDEyKTtcclxuICAgIGIgPSBiICYmIGRhdGUuZGF5ID4gMCAmJiBkYXRlLmRheSA8PSBnZXREYXlzSW5IZWJyZXdNb250aChkYXRlLm1vbnRoLCBkYXRlLnllYXIpO1xyXG4gICAgcmV0dXJuIGIgJiYgIWlzTmFOKHRvR3JlZ29yaWFuKGRhdGUpLmdldFRpbWUoKSk7XHJcbiAgfVxyXG5cclxuICBnZXROZXh0KGRhdGU6IE5nYkRhdGUsIHBlcmlvZDogTmdiUGVyaW9kID0gJ2QnLCBudW1iZXIgPSAxKSB7XHJcbiAgICBkYXRlID0gbmV3IE5nYkRhdGUoZGF0ZS55ZWFyLCBkYXRlLm1vbnRoLCBkYXRlLmRheSk7XHJcblxyXG4gICAgc3dpdGNoIChwZXJpb2QpIHtcclxuICAgICAgY2FzZSAneSc6XHJcbiAgICAgICAgZGF0ZS55ZWFyICs9IG51bWJlcjtcclxuICAgICAgICBkYXRlLm1vbnRoID0gMTtcclxuICAgICAgICBkYXRlLmRheSA9IDE7XHJcbiAgICAgICAgcmV0dXJuIGRhdGU7XHJcbiAgICAgIGNhc2UgJ20nOlxyXG4gICAgICAgIGRhdGUgPSBzZXRIZWJyZXdNb250aChkYXRlLCBudW1iZXIpO1xyXG4gICAgICAgIGRhdGUuZGF5ID0gMTtcclxuICAgICAgICByZXR1cm4gZGF0ZTtcclxuICAgICAgY2FzZSAnZCc6XHJcbiAgICAgICAgcmV0dXJuIHNldEhlYnJld0RheShkYXRlLCBudW1iZXIpO1xyXG4gICAgICBkZWZhdWx0OlxyXG4gICAgICAgIHJldHVybiBkYXRlO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgZ2V0UHJldihkYXRlOiBOZ2JEYXRlLCBwZXJpb2Q6IE5nYlBlcmlvZCA9ICdkJywgbnVtYmVyID0gMSkgeyByZXR1cm4gdGhpcy5nZXROZXh0KGRhdGUsIHBlcmlvZCwgLW51bWJlcik7IH1cclxuXHJcbiAgZ2V0V2Vla2RheShkYXRlOiBOZ2JEYXRlKSB7XHJcbiAgICBjb25zdCBkYXkgPSB0b0dyZWdvcmlhbihkYXRlKS5nZXREYXkoKTtcclxuICAgIC8vIGluIEpTIERhdGUgU3VuPTAsIGluIElTTyA4NjAxIFN1bj03XHJcbiAgICByZXR1cm4gZGF5ID09PSAwID8gNyA6IGRheTtcclxuICB9XHJcblxyXG4gIGdldFdlZWtOdW1iZXIod2VlazogTmdiRGF0ZVtdLCBmaXJzdERheU9mV2VlazogbnVtYmVyKSB7XHJcbiAgICBjb25zdCBkYXRlID0gd2Vla1t3ZWVrLmxlbmd0aCAtIDFdO1xyXG4gICAgcmV0dXJuIE1hdGguY2VpbChnZXREYXlOdW1iZXJJbkhlYnJld1llYXIoZGF0ZSkgLyA3KTtcclxuICB9XHJcblxyXG4gIGdldFRvZGF5KCk6IE5nYkRhdGUgeyByZXR1cm4gZnJvbUdyZWdvcmlhbihuZXcgRGF0ZSgpKTsgfVxyXG59XHJcbiJdfQ==