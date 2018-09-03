/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
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
    const jsDate = new Date(date.year, date.month - 1, date.day, 12);
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
export class NgbCalendar {
}
NgbCalendar.decorators = [
    { type: Injectable, args: [{ providedIn: 'root', useFactory: NGB_DATEPICKER_CALENDAR_FACTORY },] },
];
/** @nocollapse */ NgbCalendar.ngInjectableDef = i0.defineInjectable({ factory: NGB_DATEPICKER_CALENDAR_FACTORY, token: NgbCalendar, providedIn: "root" });
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
export class NgbCalendarGregorian extends NgbCalendar {
    /**
     * @return {?}
     */
    getDaysPerWeek() { return 7; }
    /**
     * @return {?}
     */
    getMonths() { return [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]; }
    /**
     * @return {?}
     */
    getWeeksPerMonth() { return 6; }
    /**
     * @param {?} date
     * @param {?=} period
     * @param {?=} number
     * @return {?}
     */
    getNext(date, period = 'd', number = 1) {
        /** @type {?} */
        let jsDate = toJSDate(date);
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
    }
    /**
     * @param {?} date
     * @param {?=} period
     * @param {?=} number
     * @return {?}
     */
    getPrev(date, period = 'd', number = 1) { return this.getNext(date, period, -number); }
    /**
     * @param {?} date
     * @return {?}
     */
    getWeekday(date) {
        /** @type {?} */
        let jsDate = toJSDate(date);
        /** @type {?} */
        let day = jsDate.getDay();
        // in JS Date Sun=0, in ISO 8601 Sun=7
        return day === 0 ? 7 : day;
    }
    /**
     * @param {?} week
     * @param {?} firstDayOfWeek
     * @return {?}
     */
    getWeekNumber(week, firstDayOfWeek) {
        // in JS Date Sun=0, in ISO 8601 Sun=7
        if (firstDayOfWeek === 7) {
            firstDayOfWeek = 0;
        }
        /** @type {?} */
        const thursdayIndex = (4 + 7 - firstDayOfWeek) % 7;
        /** @type {?} */
        let date = week[thursdayIndex];
        /** @type {?} */
        const jsDate = toJSDate(date);
        jsDate.setDate(jsDate.getDate() + 4 - (jsDate.getDay() || 7));
        /** @type {?} */
        const time = jsDate.getTime();
        jsDate.setMonth(0); // Compare with Jan 1
        jsDate.setDate(1);
        return Math.floor(Math.round((time - jsDate.getTime()) / 86400000) / 7) + 1;
    }
    /**
     * @return {?}
     */
    getToday() { return fromJSDate(new Date()); }
    /**
     * @param {?} date
     * @return {?}
     */
    isValid(date) {
        if (!date || !isInteger(date.year) || !isInteger(date.month) || !isInteger(date.day)) {
            return false;
        }
        /** @type {?} */
        const jsDate = toJSDate(date);
        return !isNaN(jsDate.getTime()) && jsDate.getFullYear() === date.year && jsDate.getMonth() + 1 === date.month &&
            jsDate.getDate() === date.day;
    }
}
NgbCalendarGregorian.decorators = [
    { type: Injectable },
];

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmdiLWNhbGVuZGFyLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQG5nLWJvb3RzdHJhcC9uZy1ib290c3RyYXAvIiwic291cmNlcyI6WyJkYXRlcGlja2VyL25nYi1jYWxlbmRhci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFDLE9BQU8sRUFBQyxNQUFNLFlBQVksQ0FBQztBQUNuQyxPQUFPLEVBQUMsVUFBVSxFQUFDLE1BQU0sZUFBZSxDQUFDO0FBQ3pDLE9BQU8sRUFBQyxTQUFTLEVBQUMsTUFBTSxjQUFjLENBQUM7Ozs7OztBQUV2QyxvQkFBb0IsTUFBWTtJQUM5QixNQUFNLENBQUMsSUFBSSxPQUFPLENBQUMsTUFBTSxDQUFDLFdBQVcsRUFBRSxFQUFFLE1BQU0sQ0FBQyxRQUFRLEVBQUUsR0FBRyxDQUFDLEVBQUUsTUFBTSxDQUFDLE9BQU8sRUFBRSxDQUFDLENBQUM7Q0FDbkY7Ozs7O0FBQ0Qsa0JBQWtCLElBQWE7O0lBQzdCLE1BQU0sTUFBTSxHQUFHLElBQUksSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLEtBQUssR0FBRyxDQUFDLEVBQUUsSUFBSSxDQUFDLEdBQUcsRUFBRSxFQUFFLENBQUMsQ0FBQzs7SUFFakUsRUFBRSxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLE9BQU8sRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQzdCLE1BQU0sQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO0tBQy9CO0lBQ0QsTUFBTSxDQUFDLE1BQU0sQ0FBQztDQUNmOzs7Ozs7O0FBSUQsTUFBTTtJQUNKLE1BQU0sQ0FBQyxJQUFJLG9CQUFvQixFQUFFLENBQUM7Q0FDbkM7Ozs7OztBQU9ELE1BQU07OztZQURMLFVBQVUsU0FBQyxFQUFDLFVBQVUsRUFBRSxNQUFNLEVBQUUsVUFBVSxFQUFFLCtCQUErQixFQUFDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7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Q0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLElBQUksR0FBRyxNQUFNLENBQUMsT0FBTyxFQUFFLENBQUMsR0FBRyxRQUFRLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUM7S0FDN0U7Ozs7SUFFRCxRQUFRLEtBQWMsTUFBTSxDQUFDLFVBQVUsQ0FBQyxJQUFJLElBQUksRUFBRSxDQUFDLENBQUMsRUFBRTs7Ozs7SUFFdEQsT0FBTyxDQUFDLElBQWE7UUFDbkIsRUFBRSxDQUFDLENBQUMsQ0FBQyxJQUFJLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ3JGLE1BQU0sQ0FBQyxLQUFLLENBQUM7U0FDZDs7UUFFRCxNQUFNLE1BQU0sR0FBRyxRQUFRLENBQUMsSUFBSSxDQUFDLENBQUM7UUFFOUIsTUFBTSxDQUFDLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxPQUFPLEVBQUUsQ0FBQyxJQUFJLE1BQU0sQ0FBQyxXQUFXLEVBQUUsS0FBSyxJQUFJLENBQUMsSUFBSSxJQUFJLE1BQU0sQ0FBQyxRQUFRLEVBQUUsR0FBRyxDQUFDLEtBQUssSUFBSSxDQUFDLEtBQUs7WUFDekcsTUFBTSxDQUFDLE9BQU8sRUFBRSxLQUFLLElBQUksQ0FBQyxHQUFHLENBQUM7S0FDbkM7OztZQWhFRixVQUFVIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtOZ2JEYXRlfSBmcm9tICcuL25nYi1kYXRlJztcclxuaW1wb3J0IHtJbmplY3RhYmxlfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHtpc0ludGVnZXJ9IGZyb20gJy4uL3V0aWwvdXRpbCc7XHJcblxyXG5mdW5jdGlvbiBmcm9tSlNEYXRlKGpzRGF0ZTogRGF0ZSkge1xyXG4gIHJldHVybiBuZXcgTmdiRGF0ZShqc0RhdGUuZ2V0RnVsbFllYXIoKSwganNEYXRlLmdldE1vbnRoKCkgKyAxLCBqc0RhdGUuZ2V0RGF0ZSgpKTtcclxufVxyXG5mdW5jdGlvbiB0b0pTRGF0ZShkYXRlOiBOZ2JEYXRlKSB7XHJcbiAgY29uc3QganNEYXRlID0gbmV3IERhdGUoZGF0ZS55ZWFyLCBkYXRlLm1vbnRoIC0gMSwgZGF0ZS5kYXksIDEyKTtcclxuICAvLyB0aGlzIGlzIGRvbmUgYXZvaWQgMzAgLT4gMTkzMCBjb252ZXJzaW9uXHJcbiAgaWYgKCFpc05hTihqc0RhdGUuZ2V0VGltZSgpKSkge1xyXG4gICAganNEYXRlLnNldEZ1bGxZZWFyKGRhdGUueWVhcik7XHJcbiAgfVxyXG4gIHJldHVybiBqc0RhdGU7XHJcbn1cclxuXHJcbmV4cG9ydCB0eXBlIE5nYlBlcmlvZCA9ICd5JyB8ICdtJyB8ICdkJztcclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBOR0JfREFURVBJQ0tFUl9DQUxFTkRBUl9GQUNUT1JZKCkge1xyXG4gIHJldHVybiBuZXcgTmdiQ2FsZW5kYXJHcmVnb3JpYW4oKTtcclxufVxyXG5cclxuLyoqXHJcbiAqIENhbGVuZGFyIHVzZWQgYnkgdGhlIGRhdGVwaWNrZXIuXHJcbiAqIERlZmF1bHQgaW1wbGVtZW50YXRpb24gdXNlcyBHcmVnb3JpYW4gY2FsZW5kYXIuXHJcbiAqL1xyXG5ASW5qZWN0YWJsZSh7cHJvdmlkZWRJbjogJ3Jvb3QnLCB1c2VGYWN0b3J5OiBOR0JfREFURVBJQ0tFUl9DQUxFTkRBUl9GQUNUT1JZfSlcclxuZXhwb3J0IGFic3RyYWN0IGNsYXNzIE5nYkNhbGVuZGFyIHtcclxuICAvKipcclxuICAgKiBSZXR1cm5zIG51bWJlciBvZiBkYXlzIHBlciB3ZWVrLlxyXG4gICAqL1xyXG4gIGFic3RyYWN0IGdldERheXNQZXJXZWVrKCk6IG51bWJlcjtcclxuXHJcbiAgLyoqXHJcbiAgICogUmV0dXJucyBhbiBhcnJheSBvZiBtb250aHMgcGVyIHllYXIuXHJcbiAgICogV2l0aCBkZWZhdWx0IGNhbGVuZGFyIHdlIHVzZSBJU08gODYwMSBhbmQgcmV0dXJuIFsxLCAyLCAuLi4sIDEyXTtcclxuICAgKi9cclxuICBhYnN0cmFjdCBnZXRNb250aHMoeWVhcj86IG51bWJlcik6IG51bWJlcltdO1xyXG5cclxuICAvKipcclxuICAgKiBSZXR1cm5zIG51bWJlciBvZiB3ZWVrcyBwZXIgbW9udGguXHJcbiAgICovXHJcbiAgYWJzdHJhY3QgZ2V0V2Vla3NQZXJNb250aCgpOiBudW1iZXI7XHJcblxyXG4gIC8qKlxyXG4gICAqIFJldHVybnMgd2Vla2RheSBudW1iZXIgZm9yIGEgZ2l2ZW4gZGF5LlxyXG4gICAqIFdpdGggZGVmYXVsdCBjYWxlbmRhciB3ZSB1c2UgSVNPIDg2MDE6ICd3ZWVrZGF5JyBpcyAxPU1vbiAuLi4gNz1TdW5cclxuICAgKi9cclxuICBhYnN0cmFjdCBnZXRXZWVrZGF5KGRhdGU6IE5nYkRhdGUpOiBudW1iZXI7XHJcblxyXG4gIC8qKlxyXG4gICAqIEFkZHMgYSBudW1iZXIgb2YgeWVhcnMsIG1vbnRocyBvciBkYXlzIHRvIGEgZ2l2ZW4gZGF0ZS5cclxuICAgKiBQZXJpb2QgY2FuIGJlICd5JywgJ20nIG9yICdkJyBhbmQgZGVmYXVsdHMgdG8gZGF5LlxyXG4gICAqIE51bWJlciBkZWZhdWx0cyB0byAxLlxyXG4gICAqL1xyXG4gIGFic3RyYWN0IGdldE5leHQoZGF0ZTogTmdiRGF0ZSwgcGVyaW9kPzogTmdiUGVyaW9kLCBudW1iZXI/OiBudW1iZXIpOiBOZ2JEYXRlO1xyXG5cclxuICAvKipcclxuICAgKiBTdWJ0cmFjdHMgYSBudW1iZXIgb2YgeWVhcnMsIG1vbnRocyBvciBkYXlzIGZyb20gYSBnaXZlbiBkYXRlLlxyXG4gICAqIFBlcmlvZCBjYW4gYmUgJ3knLCAnbScgb3IgJ2QnIGFuZCBkZWZhdWx0cyB0byBkYXkuXHJcbiAgICogTnVtYmVyIGRlZmF1bHRzIHRvIDEuXHJcbiAgICovXHJcbiAgYWJzdHJhY3QgZ2V0UHJldihkYXRlOiBOZ2JEYXRlLCBwZXJpb2Q/OiBOZ2JQZXJpb2QsIG51bWJlcj86IG51bWJlcik6IE5nYkRhdGU7XHJcblxyXG4gIC8qKlxyXG4gICAqIFJldHVybnMgd2VlayBudW1iZXIgZm9yIGEgZ2l2ZW4gd2Vlay5cclxuICAgKi9cclxuICBhYnN0cmFjdCBnZXRXZWVrTnVtYmVyKHdlZWs6IE5nYkRhdGVbXSwgZmlyc3REYXlPZldlZWs6IG51bWJlcik6IG51bWJlcjtcclxuXHJcbiAgLyoqXHJcbiAgICogUmV0dXJucyB0b2RheSdzIGRhdGUuXHJcbiAgICovXHJcbiAgYWJzdHJhY3QgZ2V0VG9kYXkoKTogTmdiRGF0ZTtcclxuXHJcbiAgLyoqXHJcbiAgICogQ2hlY2tzIGlmIGEgZGF0ZSBpcyB2YWxpZCBmb3IgYSBjdXJyZW50IGNhbGVuZGFyLlxyXG4gICAqL1xyXG4gIGFic3RyYWN0IGlzVmFsaWQoZGF0ZTogTmdiRGF0ZSk6IGJvb2xlYW47XHJcbn1cclxuXHJcbkBJbmplY3RhYmxlKClcclxuZXhwb3J0IGNsYXNzIE5nYkNhbGVuZGFyR3JlZ29yaWFuIGV4dGVuZHMgTmdiQ2FsZW5kYXIge1xyXG4gIGdldERheXNQZXJXZWVrKCkgeyByZXR1cm4gNzsgfVxyXG5cclxuICBnZXRNb250aHMoKSB7IHJldHVybiBbMSwgMiwgMywgNCwgNSwgNiwgNywgOCwgOSwgMTAsIDExLCAxMl07IH1cclxuXHJcbiAgZ2V0V2Vla3NQZXJNb250aCgpIHsgcmV0dXJuIDY7IH1cclxuXHJcbiAgZ2V0TmV4dChkYXRlOiBOZ2JEYXRlLCBwZXJpb2Q6IE5nYlBlcmlvZCA9ICdkJywgbnVtYmVyID0gMSkge1xyXG4gICAgbGV0IGpzRGF0ZSA9IHRvSlNEYXRlKGRhdGUpO1xyXG5cclxuICAgIHN3aXRjaCAocGVyaW9kKSB7XHJcbiAgICAgIGNhc2UgJ3knOlxyXG4gICAgICAgIHJldHVybiBuZXcgTmdiRGF0ZShkYXRlLnllYXIgKyBudW1iZXIsIDEsIDEpO1xyXG4gICAgICBjYXNlICdtJzpcclxuICAgICAgICBqc0RhdGUgPSBuZXcgRGF0ZShkYXRlLnllYXIsIGRhdGUubW9udGggKyBudW1iZXIgLSAxLCAxLCAxMik7XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICAgIGNhc2UgJ2QnOlxyXG4gICAgICAgIGpzRGF0ZS5zZXREYXRlKGpzRGF0ZS5nZXREYXRlKCkgKyBudW1iZXIpO1xyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgICBkZWZhdWx0OlxyXG4gICAgICAgIHJldHVybiBkYXRlO1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiBmcm9tSlNEYXRlKGpzRGF0ZSk7XHJcbiAgfVxyXG5cclxuICBnZXRQcmV2KGRhdGU6IE5nYkRhdGUsIHBlcmlvZDogTmdiUGVyaW9kID0gJ2QnLCBudW1iZXIgPSAxKSB7IHJldHVybiB0aGlzLmdldE5leHQoZGF0ZSwgcGVyaW9kLCAtbnVtYmVyKTsgfVxyXG5cclxuICBnZXRXZWVrZGF5KGRhdGU6IE5nYkRhdGUpIHtcclxuICAgIGxldCBqc0RhdGUgPSB0b0pTRGF0ZShkYXRlKTtcclxuICAgIGxldCBkYXkgPSBqc0RhdGUuZ2V0RGF5KCk7XHJcbiAgICAvLyBpbiBKUyBEYXRlIFN1bj0wLCBpbiBJU08gODYwMSBTdW49N1xyXG4gICAgcmV0dXJuIGRheSA9PT0gMCA/IDcgOiBkYXk7XHJcbiAgfVxyXG5cclxuICBnZXRXZWVrTnVtYmVyKHdlZWs6IE5nYkRhdGVbXSwgZmlyc3REYXlPZldlZWs6IG51bWJlcikge1xyXG4gICAgLy8gaW4gSlMgRGF0ZSBTdW49MCwgaW4gSVNPIDg2MDEgU3VuPTdcclxuICAgIGlmIChmaXJzdERheU9mV2VlayA9PT0gNykge1xyXG4gICAgICBmaXJzdERheU9mV2VlayA9IDA7XHJcbiAgICB9XHJcblxyXG4gICAgY29uc3QgdGh1cnNkYXlJbmRleCA9ICg0ICsgNyAtIGZpcnN0RGF5T2ZXZWVrKSAlIDc7XHJcbiAgICBsZXQgZGF0ZSA9IHdlZWtbdGh1cnNkYXlJbmRleF07XHJcblxyXG4gICAgY29uc3QganNEYXRlID0gdG9KU0RhdGUoZGF0ZSk7XHJcbiAgICBqc0RhdGUuc2V0RGF0ZShqc0RhdGUuZ2V0RGF0ZSgpICsgNCAtIChqc0RhdGUuZ2V0RGF5KCkgfHwgNykpOyAgLy8gVGh1cnNkYXlcclxuICAgIGNvbnN0IHRpbWUgPSBqc0RhdGUuZ2V0VGltZSgpO1xyXG4gICAganNEYXRlLnNldE1vbnRoKDApOyAgLy8gQ29tcGFyZSB3aXRoIEphbiAxXHJcbiAgICBqc0RhdGUuc2V0RGF0ZSgxKTtcclxuICAgIHJldHVybiBNYXRoLmZsb29yKE1hdGgucm91bmQoKHRpbWUgLSBqc0RhdGUuZ2V0VGltZSgpKSAvIDg2NDAwMDAwKSAvIDcpICsgMTtcclxuICB9XHJcblxyXG4gIGdldFRvZGF5KCk6IE5nYkRhdGUgeyByZXR1cm4gZnJvbUpTRGF0ZShuZXcgRGF0ZSgpKTsgfVxyXG5cclxuICBpc1ZhbGlkKGRhdGU6IE5nYkRhdGUpOiBib29sZWFuIHtcclxuICAgIGlmICghZGF0ZSB8fCAhaXNJbnRlZ2VyKGRhdGUueWVhcikgfHwgIWlzSW50ZWdlcihkYXRlLm1vbnRoKSB8fCAhaXNJbnRlZ2VyKGRhdGUuZGF5KSkge1xyXG4gICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9XHJcblxyXG4gICAgY29uc3QganNEYXRlID0gdG9KU0RhdGUoZGF0ZSk7XHJcblxyXG4gICAgcmV0dXJuICFpc05hTihqc0RhdGUuZ2V0VGltZSgpKSAmJiBqc0RhdGUuZ2V0RnVsbFllYXIoKSA9PT0gZGF0ZS55ZWFyICYmIGpzRGF0ZS5nZXRNb250aCgpICsgMSA9PT0gZGF0ZS5tb250aCAmJlxyXG4gICAgICAgIGpzRGF0ZS5nZXREYXRlKCkgPT09IGRhdGUuZGF5O1xyXG4gIH1cclxufVxyXG4iXX0=