/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
import { NgbDate } from './ngb-date';
import { Injectable } from '@angular/core';
import { isInteger } from '../util/util';
import * as i0 from "@angular/core";
/**
 * @param {?} jsDate
 * @return {?}
 */
function fromJSDate(jsDate) {
    return new NgbDate(jsDate.getFullYear(), jsDate.getMonth() + 1, jsDate.getDate());
}
/**
 * @param {?} date
 * @return {?}
 */
function toJSDate(date) {
    /** @type {?} */
    var jsDate = new Date(date.year, date.month - 1, date.day, 12);
    // this is done avoid 30 -> 1930 conversion
    if (!isNaN(jsDate.getTime())) {
        jsDate.setFullYear(date.year);
    }
    return jsDate;
}
/** @typedef {?} */
var NgbPeriod;
export { NgbPeriod };
/**
 * @return {?}
 */
export function NGB_DATEPICKER_CALENDAR_FACTORY() {
    return new NgbCalendarGregorian();
}
/**
 * Calendar used by the datepicker.
 * Default implementation uses Gregorian calendar.
 * @abstract
 */
var NgbCalendar = /** @class */ (function () {
    function NgbCalendar() {
    }
    NgbCalendar.decorators = [
        { type: Injectable, args: [{ providedIn: 'root', useFactory: NGB_DATEPICKER_CALENDAR_FACTORY },] },
    ];
    /** @nocollapse */ NgbCalendar.ngInjectableDef = i0.defineInjectable({ factory: NGB_DATEPICKER_CALENDAR_FACTORY, token: NgbCalendar, providedIn: "root" });
    return NgbCalendar;
}());
export { NgbCalendar };
if (false) {
    /**
     * Returns number of days per week.
     * @abstract
     * @return {?}
     */
    NgbCalendar.prototype.getDaysPerWeek = function () { };
    /**
     * Returns an array of months per year.
     * With default calendar we use ISO 8601 and return [1, 2, ..., 12];
     * @abstract
     * @param {?=} year
     * @return {?}
     */
    NgbCalendar.prototype.getMonths = function (year) { };
    /**
     * Returns number of weeks per month.
     * @abstract
     * @return {?}
     */
    NgbCalendar.prototype.getWeeksPerMonth = function () { };
    /**
     * Returns weekday number for a given day.
     * With default calendar we use ISO 8601: 'weekday' is 1=Mon ... 7=Sun
     * @abstract
     * @param {?} date
     * @return {?}
     */
    NgbCalendar.prototype.getWeekday = function (date) { };
    /**
     * Adds a number of years, months or days to a given date.
     * Period can be 'y', 'm' or 'd' and defaults to day.
     * Number defaults to 1.
     * @abstract
     * @param {?} date
     * @param {?=} period
     * @param {?=} number
     * @return {?}
     */
    NgbCalendar.prototype.getNext = function (date, period, number) { };
    /**
     * Subtracts a number of years, months or days from a given date.
     * Period can be 'y', 'm' or 'd' and defaults to day.
     * Number defaults to 1.
     * @abstract
     * @param {?} date
     * @param {?=} period
     * @param {?=} number
     * @return {?}
     */
    NgbCalendar.prototype.getPrev = function (date, period, number) { };
    /**
     * Returns week number for a given week.
     * @abstract
     * @param {?} week
     * @param {?} firstDayOfWeek
     * @return {?}
     */
    NgbCalendar.prototype.getWeekNumber = function (week, firstDayOfWeek) { };
    /**
     * Returns today's date.
     * @abstract
     * @return {?}
     */
    NgbCalendar.prototype.getToday = function () { };
    /**
     * Checks if a date is valid for a current calendar.
     * @abstract
     * @param {?} date
     * @return {?}
     */
    NgbCalendar.prototype.isValid = function (date) { };
}
var NgbCalendarGregorian = /** @class */ (function (_super) {
    tslib_1.__extends(NgbCalendarGregorian, _super);
    function NgbCalendarGregorian() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     * @return {?}
     */
    NgbCalendarGregorian.prototype.getDaysPerWeek = /**
     * @return {?}
     */
    function () { return 7; };
    /**
     * @return {?}
     */
    NgbCalendarGregorian.prototype.getMonths = /**
     * @return {?}
     */
    function () { return [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]; };
    /**
     * @return {?}
     */
    NgbCalendarGregorian.prototype.getWeeksPerMonth = /**
     * @return {?}
     */
    function () { return 6; };
    /**
     * @param {?} date
     * @param {?=} period
     * @param {?=} number
     * @return {?}
     */
    NgbCalendarGregorian.prototype.getNext = /**
     * @param {?} date
     * @param {?=} period
     * @param {?=} number
     * @return {?}
     */
    function (date, period, number) {
        if (period === void 0) { period = 'd'; }
        if (number === void 0) { number = 1; }
        /** @type {?} */
        var jsDate = toJSDate(date);
        switch (period) {
            case 'y':
                return new NgbDate(date.year + number, 1, 1);
            case 'm':
                jsDate = new Date(date.year, date.month + number - 1, 1, 12);
                break;
            case 'd':
                jsDate.setDate(jsDate.getDate() + number);
                break;
            default:
                return date;
        }
        return fromJSDate(jsDate);
    };
    /**
     * @param {?} date
     * @param {?=} period
     * @param {?=} number
     * @return {?}
     */
    NgbCalendarGregorian.prototype.getPrev = /**
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
    NgbCalendarGregorian.prototype.getWeekday = /**
     * @param {?} date
     * @return {?}
     */
    function (date) {
        /** @type {?} */
        var jsDate = toJSDate(date);
        /** @type {?} */
        var day = jsDate.getDay();
        // in JS Date Sun=0, in ISO 8601 Sun=7
        return day === 0 ? 7 : day;
    };
    /**
     * @param {?} week
     * @param {?} firstDayOfWeek
     * @return {?}
     */
    NgbCalendarGregorian.prototype.getWeekNumber = /**
     * @param {?} week
     * @param {?} firstDayOfWeek
     * @return {?}
     */
    function (week, firstDayOfWeek) {
        // in JS Date Sun=0, in ISO 8601 Sun=7
        if (firstDayOfWeek === 7) {
            firstDayOfWeek = 0;
        }
        /** @type {?} */
        var thursdayIndex = (4 + 7 - firstDayOfWeek) % 7;
        /** @type {?} */
        var date = week[thursdayIndex];
        /** @type {?} */
        var jsDate = toJSDate(date);
        jsDate.setDate(jsDate.getDate() + 4 - (jsDate.getDay() || 7));
        /** @type {?} */
        var time = jsDate.getTime();
        jsDate.setMonth(0); // Compare with Jan 1
        jsDate.setDate(1);
        return Math.floor(Math.round((time - jsDate.getTime()) / 86400000) / 7) + 1;
    };
    /**
     * @return {?}
     */
    NgbCalendarGregorian.prototype.getToday = /**
     * @return {?}
     */
    function () { return fromJSDate(new Date()); };
    /**
     * @param {?} date
     * @return {?}
     */
    NgbCalendarGregorian.prototype.isValid = /**
     * @param {?} date
     * @return {?}
     */
    function (date) {
        if (!date || !isInteger(date.year) || !isInteger(date.month) || !isInteger(date.day)) {
            return false;
        }
        /** @type {?} */
        var jsDate = toJSDate(date);
        return !isNaN(jsDate.getTime()) && jsDate.getFullYear() === date.year && jsDate.getMonth() + 1 === date.month &&
            jsDate.getDate() === date.day;
    };
    NgbCalendarGregorian.decorators = [
        { type: Injectable },
    ];
    return NgbCalendarGregorian;
}(NgbCalendar));
export { NgbCalendarGregorian };

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmdiLWNhbGVuZGFyLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQG5nLWJvb3RzdHJhcC9uZy1ib290c3RyYXAvIiwic291cmNlcyI6WyJkYXRlcGlja2VyL25nYi1jYWxlbmRhci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLE9BQU8sRUFBQyxPQUFPLEVBQUMsTUFBTSxZQUFZLENBQUM7QUFDbkMsT0FBTyxFQUFDLFVBQVUsRUFBQyxNQUFNLGVBQWUsQ0FBQztBQUN6QyxPQUFPLEVBQUMsU0FBUyxFQUFDLE1BQU0sY0FBYyxDQUFDOzs7Ozs7QUFFdkMsb0JBQW9CLE1BQVk7SUFDOUIsTUFBTSxDQUFDLElBQUksT0FBTyxDQUFDLE1BQU0sQ0FBQyxXQUFXLEVBQUUsRUFBRSxNQUFNLENBQUMsUUFBUSxFQUFFLEdBQUcsQ0FBQyxFQUFFLE1BQU0sQ0FBQyxPQUFPLEVBQUUsQ0FBQyxDQUFDO0NBQ25GOzs7OztBQUNELGtCQUFrQixJQUFhOztJQUM3QixJQUFNLE1BQU0sR0FBRyxJQUFJLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxLQUFLLEdBQUcsQ0FBQyxFQUFFLElBQUksQ0FBQyxHQUFHLEVBQUUsRUFBRSxDQUFDLENBQUM7O0lBRWpFLEVBQUUsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxPQUFPLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUM3QixNQUFNLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztLQUMvQjtJQUNELE1BQU0sQ0FBQyxNQUFNLENBQUM7Q0FDZjs7Ozs7OztBQUlELE1BQU07SUFDSixNQUFNLENBQUMsSUFBSSxvQkFBb0IsRUFBRSxDQUFDO0NBQ25DOzs7Ozs7Ozs7O2dCQU1BLFVBQVUsU0FBQyxFQUFDLFVBQVUsRUFBRSxNQUFNLEVBQUUsVUFBVSxFQUFFLCtCQUErQixFQUFDOzs7c0JBMUI3RTs7U0EyQnNCLFdBQVc7Ozs7Ozs7Ozs7Ozs7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ZX0gZnJvbSAnLi9uZ2ItZGF0ZSc7XHJcbmltcG9ydCB7SW5qZWN0YWJsZX0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7aXNJbnRlZ2VyfSBmcm9tICcuLi91dGlsL3V0aWwnO1xyXG5cclxuZnVuY3Rpb24gZnJvbUpTRGF0ZShqc0RhdGU6IERhdGUpIHtcclxuICByZXR1cm4gbmV3IE5nYkRhdGUoanNEYXRlLmdldEZ1bGxZZWFyKCksIGpzRGF0ZS5nZXRNb250aCgpICsgMSwganNEYXRlLmdldERhdGUoKSk7XHJcbn1cclxuZnVuY3Rpb24gdG9KU0RhdGUoZGF0ZTogTmdiRGF0ZSkge1xyXG4gIGNvbnN0IGpzRGF0ZSA9IG5ldyBEYXRlKGRhdGUueWVhciwgZGF0ZS5tb250aCAtIDEsIGRhdGUuZGF5LCAxMik7XHJcbiAgLy8gdGhpcyBpcyBkb25lIGF2b2lkIDMwIC0+IDE5MzAgY29udmVyc2lvblxyXG4gIGlmICghaXNOYU4oanNEYXRlLmdldFRpbWUoKSkpIHtcclxuICAgIGpzRGF0ZS5zZXRGdWxsWWVhcihkYXRlLnllYXIpO1xyXG4gIH1cclxuICByZXR1cm4ganNEYXRlO1xyXG59XHJcblxyXG5leHBvcnQgdHlwZSBOZ2JQZXJpb2QgPSAneScgfCAnbScgfCAnZCc7XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gTkdCX0RBVEVQSUNLRVJfQ0FMRU5EQVJfRkFDVE9SWSgpIHtcclxuICByZXR1cm4gbmV3IE5nYkNhbGVuZGFyR3JlZ29yaWFuKCk7XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBDYWxlbmRhciB1c2VkIGJ5IHRoZSBkYXRlcGlja2VyLlxyXG4gKiBEZWZhdWx0IGltcGxlbWVudGF0aW9uIHVzZXMgR3JlZ29yaWFuIGNhbGVuZGFyLlxyXG4gKi9cclxuQEluamVjdGFibGUoe3Byb3ZpZGVkSW46ICdyb290JywgdXNlRmFjdG9yeTogTkdCX0RBVEVQSUNLRVJfQ0FMRU5EQVJfRkFDVE9SWX0pXHJcbmV4cG9ydCBhYnN0cmFjdCBjbGFzcyBOZ2JDYWxlbmRhciB7XHJcbiAgLyoqXHJcbiAgICogUmV0dXJucyBudW1iZXIgb2YgZGF5cyBwZXIgd2Vlay5cclxuICAgKi9cclxuICBhYnN0cmFjdCBnZXREYXlzUGVyV2VlaygpOiBudW1iZXI7XHJcblxyXG4gIC8qKlxyXG4gICAqIFJldHVybnMgYW4gYXJyYXkgb2YgbW9udGhzIHBlciB5ZWFyLlxyXG4gICAqIFdpdGggZGVmYXVsdCBjYWxlbmRhciB3ZSB1c2UgSVNPIDg2MDEgYW5kIHJldHVybiBbMSwgMiwgLi4uLCAxMl07XHJcbiAgICovXHJcbiAgYWJzdHJhY3QgZ2V0TW9udGhzKHllYXI/OiBudW1iZXIpOiBudW1iZXJbXTtcclxuXHJcbiAgLyoqXHJcbiAgICogUmV0dXJucyBudW1iZXIgb2Ygd2Vla3MgcGVyIG1vbnRoLlxyXG4gICAqL1xyXG4gIGFic3RyYWN0IGdldFdlZWtzUGVyTW9udGgoKTogbnVtYmVyO1xyXG5cclxuICAvKipcclxuICAgKiBSZXR1cm5zIHdlZWtkYXkgbnVtYmVyIGZvciBhIGdpdmVuIGRheS5cclxuICAgKiBXaXRoIGRlZmF1bHQgY2FsZW5kYXIgd2UgdXNlIElTTyA4NjAxOiAnd2Vla2RheScgaXMgMT1Nb24gLi4uIDc9U3VuXHJcbiAgICovXHJcbiAgYWJzdHJhY3QgZ2V0V2Vla2RheShkYXRlOiBOZ2JEYXRlKTogbnVtYmVyO1xyXG5cclxuICAvKipcclxuICAgKiBBZGRzIGEgbnVtYmVyIG9mIHllYXJzLCBtb250aHMgb3IgZGF5cyB0byBhIGdpdmVuIGRhdGUuXHJcbiAgICogUGVyaW9kIGNhbiBiZSAneScsICdtJyBvciAnZCcgYW5kIGRlZmF1bHRzIHRvIGRheS5cclxuICAgKiBOdW1iZXIgZGVmYXVsdHMgdG8gMS5cclxuICAgKi9cclxuICBhYnN0cmFjdCBnZXROZXh0KGRhdGU6IE5nYkRhdGUsIHBlcmlvZD86IE5nYlBlcmlvZCwgbnVtYmVyPzogbnVtYmVyKTogTmdiRGF0ZTtcclxuXHJcbiAgLyoqXHJcbiAgICogU3VidHJhY3RzIGEgbnVtYmVyIG9mIHllYXJzLCBtb250aHMgb3IgZGF5cyBmcm9tIGEgZ2l2ZW4gZGF0ZS5cclxuICAgKiBQZXJpb2QgY2FuIGJlICd5JywgJ20nIG9yICdkJyBhbmQgZGVmYXVsdHMgdG8gZGF5LlxyXG4gICAqIE51bWJlciBkZWZhdWx0cyB0byAxLlxyXG4gICAqL1xyXG4gIGFic3RyYWN0IGdldFByZXYoZGF0ZTogTmdiRGF0ZSwgcGVyaW9kPzogTmdiUGVyaW9kLCBudW1iZXI/OiBudW1iZXIpOiBOZ2JEYXRlO1xyXG5cclxuICAvKipcclxuICAgKiBSZXR1cm5zIHdlZWsgbnVtYmVyIGZvciBhIGdpdmVuIHdlZWsuXHJcbiAgICovXHJcbiAgYWJzdHJhY3QgZ2V0V2Vla051bWJlcih3ZWVrOiBOZ2JEYXRlW10sIGZpcnN0RGF5T2ZXZWVrOiBudW1iZXIpOiBudW1iZXI7XHJcblxyXG4gIC8qKlxyXG4gICAqIFJldHVybnMgdG9kYXkncyBkYXRlLlxyXG4gICAqL1xyXG4gIGFic3RyYWN0IGdldFRvZGF5KCk6IE5nYkRhdGU7XHJcblxyXG4gIC8qKlxyXG4gICAqIENoZWNrcyBpZiBhIGRhdGUgaXMgdmFsaWQgZm9yIGEgY3VycmVudCBjYWxlbmRhci5cclxuICAgKi9cclxuICBhYnN0cmFjdCBpc1ZhbGlkKGRhdGU6IE5nYkRhdGUpOiBib29sZWFuO1xyXG59XHJcblxyXG5ASW5qZWN0YWJsZSgpXHJcbmV4cG9ydCBjbGFzcyBOZ2JDYWxlbmRhckdyZWdvcmlhbiBleHRlbmRzIE5nYkNhbGVuZGFyIHtcclxuICBnZXREYXlzUGVyV2VlaygpIHsgcmV0dXJuIDc7IH1cclxuXHJcbiAgZ2V0TW9udGhzKCkgeyByZXR1cm4gWzEsIDIsIDMsIDQsIDUsIDYsIDcsIDgsIDksIDEwLCAxMSwgMTJdOyB9XHJcblxyXG4gIGdldFdlZWtzUGVyTW9udGgoKSB7IHJldHVybiA2OyB9XHJcblxyXG4gIGdldE5leHQoZGF0ZTogTmdiRGF0ZSwgcGVyaW9kOiBOZ2JQZXJpb2QgPSAnZCcsIG51bWJlciA9IDEpIHtcclxuICAgIGxldCBqc0RhdGUgPSB0b0pTRGF0ZShkYXRlKTtcclxuXHJcbiAgICBzd2l0Y2ggKHBlcmlvZCkge1xyXG4gICAgICBjYXNlICd5JzpcclxuICAgICAgICByZXR1cm4gbmV3IE5nYkRhdGUoZGF0ZS55ZWFyICsgbnVtYmVyLCAxLCAxKTtcclxuICAgICAgY2FzZSAnbSc6XHJcbiAgICAgICAganNEYXRlID0gbmV3IERhdGUoZGF0ZS55ZWFyLCBkYXRlLm1vbnRoICsgbnVtYmVyIC0gMSwgMSwgMTIpO1xyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgICBjYXNlICdkJzpcclxuICAgICAgICBqc0RhdGUuc2V0RGF0ZShqc0RhdGUuZ2V0RGF0ZSgpICsgbnVtYmVyKTtcclxuICAgICAgICBicmVhaztcclxuICAgICAgZGVmYXVsdDpcclxuICAgICAgICByZXR1cm4gZGF0ZTtcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gZnJvbUpTRGF0ZShqc0RhdGUpO1xyXG4gIH1cclxuXHJcbiAgZ2V0UHJldihkYXRlOiBOZ2JEYXRlLCBwZXJpb2Q6IE5nYlBlcmlvZCA9ICdkJywgbnVtYmVyID0gMSkgeyByZXR1cm4gdGhpcy5nZXROZXh0KGRhdGUsIHBlcmlvZCwgLW51bWJlcik7IH1cclxuXHJcbiAgZ2V0V2Vla2RheShkYXRlOiBOZ2JEYXRlKSB7XHJcbiAgICBsZXQganNEYXRlID0gdG9KU0RhdGUoZGF0ZSk7XHJcbiAgICBsZXQgZGF5ID0ganNEYXRlLmdldERheSgpO1xyXG4gICAgLy8gaW4gSlMgRGF0ZSBTdW49MCwgaW4gSVNPIDg2MDEgU3VuPTdcclxuICAgIHJldHVybiBkYXkgPT09IDAgPyA3IDogZGF5O1xyXG4gIH1cclxuXHJcbiAgZ2V0V2Vla051bWJlcih3ZWVrOiBOZ2JEYXRlW10sIGZpcnN0RGF5T2ZXZWVrOiBudW1iZXIpIHtcclxuICAgIC8vIGluIEpTIERhdGUgU3VuPTAsIGluIElTTyA4NjAxIFN1bj03XHJcbiAgICBpZiAoZmlyc3REYXlPZldlZWsgPT09IDcpIHtcclxuICAgICAgZmlyc3REYXlPZldlZWsgPSAwO1xyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0IHRodXJzZGF5SW5kZXggPSAoNCArIDcgLSBmaXJzdERheU9mV2VlaykgJSA3O1xyXG4gICAgbGV0IGRhdGUgPSB3ZWVrW3RodXJzZGF5SW5kZXhdO1xyXG5cclxuICAgIGNvbnN0IGpzRGF0ZSA9IHRvSlNEYXRlKGRhdGUpO1xyXG4gICAganNEYXRlLnNldERhdGUoanNEYXRlLmdldERhdGUoKSArIDQgLSAoanNEYXRlLmdldERheSgpIHx8IDcpKTsgIC8vIFRodXJzZGF5XHJcbiAgICBjb25zdCB0aW1lID0ganNEYXRlLmdldFRpbWUoKTtcclxuICAgIGpzRGF0ZS5zZXRNb250aCgwKTsgIC8vIENvbXBhcmUgd2l0aCBKYW4gMVxyXG4gICAganNEYXRlLnNldERhdGUoMSk7XHJcbiAgICByZXR1cm4gTWF0aC5mbG9vcihNYXRoLnJvdW5kKCh0aW1lIC0ganNEYXRlLmdldFRpbWUoKSkgLyA4NjQwMDAwMCkgLyA3KSArIDE7XHJcbiAgfVxyXG5cclxuICBnZXRUb2RheSgpOiBOZ2JEYXRlIHsgcmV0dXJuIGZyb21KU0RhdGUobmV3IERhdGUoKSk7IH1cclxuXHJcbiAgaXNWYWxpZChkYXRlOiBOZ2JEYXRlKTogYm9vbGVhbiB7XHJcbiAgICBpZiAoIWRhdGUgfHwgIWlzSW50ZWdlcihkYXRlLnllYXIpIHx8ICFpc0ludGVnZXIoZGF0ZS5tb250aCkgfHwgIWlzSW50ZWdlcihkYXRlLmRheSkpIHtcclxuICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0IGpzRGF0ZSA9IHRvSlNEYXRlKGRhdGUpO1xyXG5cclxuICAgIHJldHVybiAhaXNOYU4oanNEYXRlLmdldFRpbWUoKSkgJiYganNEYXRlLmdldEZ1bGxZZWFyKCkgPT09IGRhdGUueWVhciAmJiBqc0RhdGUuZ2V0TW9udGgoKSArIDEgPT09IGRhdGUubW9udGggJiZcclxuICAgICAgICBqc0RhdGUuZ2V0RGF0ZSgpID09PSBkYXRlLmRheTtcclxuICB9XHJcbn1cclxuIl19