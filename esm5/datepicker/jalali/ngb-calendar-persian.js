/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { NgbDate } from '../ngb-date';
import { NgbCalendar } from '../ngb-calendar';
import { isInteger } from '../../util/util';
import { fromGregorian, setJalaliDay, setJalaliMonth, setJalaliYear, toGregorian } from './jalali';
var NgbCalendarPersian = /** @class */ (function (_super) {
    tslib_1.__extends(NgbCalendarPersian, _super);
    function NgbCalendarPersian() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     * @return {?}
     */
    NgbCalendarPersian.prototype.getDaysPerWeek = /**
     * @return {?}
     */
    function () { return 7; };
    /**
     * @return {?}
     */
    NgbCalendarPersian.prototype.getMonths = /**
     * @return {?}
     */
    function () { return [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]; };
    /**
     * @return {?}
     */
    NgbCalendarPersian.prototype.getWeeksPerMonth = /**
     * @return {?}
     */
    function () { return 6; };
    /**
     * @param {?} date
     * @param {?=} period
     * @param {?=} number
     * @return {?}
     */
    NgbCalendarPersian.prototype.getNext = /**
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
                date = setJalaliYear(date, date.year + number);
                date.month = 1;
                date.day = 1;
                return date;
            case 'm':
                date = setJalaliMonth(date, date.month + number);
                date.day = 1;
                return date;
            case 'd':
                return setJalaliDay(date, date.day + number);
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
    NgbCalendarPersian.prototype.getPrev = /**
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
    NgbCalendarPersian.prototype.getWeekday = /**
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
    NgbCalendarPersian.prototype.getWeekNumber = /**
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
        var jsDate = toGregorian(date);
        jsDate.setDate(jsDate.getDate() + 4 - (jsDate.getDay() || 7));
        /** @type {?} */
        var time = jsDate.getTime();
        /** @type {?} */
        var startDate = toGregorian(new NgbDate(date.year, 1, 1));
        return Math.floor(Math.round((time - startDate.getTime()) / 86400000) / 7) + 1;
    };
    /**
     * @return {?}
     */
    NgbCalendarPersian.prototype.getToday = /**
     * @return {?}
     */
    function () { return fromGregorian(new Date()); };
    /**
     * @param {?} date
     * @return {?}
     */
    NgbCalendarPersian.prototype.isValid = /**
     * @param {?} date
     * @return {?}
     */
    function (date) {
        return date && isInteger(date.year) && isInteger(date.month) && isInteger(date.day) &&
            !isNaN(toGregorian(date).getTime());
    };
    NgbCalendarPersian.decorators = [
        { type: Injectable },
    ];
    return NgbCalendarPersian;
}(NgbCalendar));
export { NgbCalendarPersian };

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmdiLWNhbGVuZGFyLXBlcnNpYW4uanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AbmctYm9vdHN0cmFwL25nLWJvb3RzdHJhcC8iLCJzb3VyY2VzIjpbImRhdGVwaWNrZXIvamFsYWxpL25nYi1jYWxlbmRhci1wZXJzaWFuLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsT0FBTyxFQUFDLFVBQVUsRUFBQyxNQUFNLGVBQWUsQ0FBQztBQUN6QyxPQUFPLEVBQUMsT0FBTyxFQUFDLE1BQU0sYUFBYSxDQUFDO0FBQ3BDLE9BQU8sRUFBQyxXQUFXLEVBQVksTUFBTSxpQkFBaUIsQ0FBQztBQUN2RCxPQUFPLEVBQUMsU0FBUyxFQUFDLE1BQU0saUJBQWlCLENBQUM7QUFFMUMsT0FBTyxFQUFDLGFBQWEsRUFBRSxZQUFZLEVBQUUsY0FBYyxFQUFFLGFBQWEsRUFBRSxXQUFXLEVBQUMsTUFBTSxVQUFVLENBQUM7O0lBR3pELDhDQUFXOzs7Ozs7O0lBQ2pELDJDQUFjOzs7SUFBZCxjQUFtQixNQUFNLENBQUMsQ0FBQyxDQUFDLEVBQUU7Ozs7SUFFOUIsc0NBQVM7OztJQUFULGNBQWMsTUFBTSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLENBQUMsQ0FBQyxFQUFFOzs7O0lBRS9ELDZDQUFnQjs7O0lBQWhCLGNBQXFCLE1BQU0sQ0FBQyxDQUFDLENBQUMsRUFBRTs7Ozs7OztJQUVoQyxvQ0FBTzs7Ozs7O0lBQVAsVUFBUSxJQUFhLEVBQUUsTUFBdUIsRUFBRSxNQUFVO1FBQW5DLHVCQUFBLEVBQUEsWUFBdUI7UUFBRSx1QkFBQSxFQUFBLFVBQVU7UUFDeEQsSUFBSSxHQUFHLElBQUksT0FBTyxDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLEtBQUssRUFBRSxJQUFJ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QUFJLENBQUMsR0FBRyxDQUFDO1lBQy9FLENBQUMsS0FBSyxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsQ0FBQyxPQUFPLEVBQUUsQ0FBQyxDQUFDO0tBQ3pDOztnQkF6REYsVUFBVTs7NkJBUFg7RUFRd0MsV0FBVztTQUF0QyxrQkFBa0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge0luamVjdGFibGV9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQge05nYkRhdGV9IGZyb20gJy4uL25nYi1kYXRlJztcclxuaW1wb3J0IHtOZ2JDYWxlbmRhciwgTmdiUGVyaW9kfSBmcm9tICcuLi9uZ2ItY2FsZW5kYXInO1xyXG5pbXBvcnQge2lzSW50ZWdlcn0gZnJvbSAnLi4vLi4vdXRpbC91dGlsJztcclxuXHJcbmltcG9ydCB7ZnJvbUdyZWdvcmlhbiwgc2V0SmFsYWxpRGF5LCBzZXRKYWxhbGlNb250aCwgc2V0SmFsYWxpWWVhciwgdG9HcmVnb3JpYW59IGZyb20gJy4vamFsYWxpJztcclxuXHJcbkBJbmplY3RhYmxlKClcclxuZXhwb3J0IGNsYXNzIE5nYkNhbGVuZGFyUGVyc2lhbiBleHRlbmRzIE5nYkNhbGVuZGFyIHtcclxuICBnZXREYXlzUGVyV2VlaygpIHsgcmV0dXJuIDc7IH1cclxuXHJcbiAgZ2V0TW9udGhzKCkgeyByZXR1cm4gWzEsIDIsIDMsIDQsIDUsIDYsIDcsIDgsIDksIDEwLCAxMSwgMTJdOyB9XHJcblxyXG4gIGdldFdlZWtzUGVyTW9udGgoKSB7IHJldHVybiA2OyB9XHJcblxyXG4gIGdldE5leHQoZGF0ZTogTmdiRGF0ZSwgcGVyaW9kOiBOZ2JQZXJpb2QgPSAnZCcsIG51bWJlciA9IDEpIHtcclxuICAgIGRhdGUgPSBuZXcgTmdiRGF0ZShkYXRlLnllYXIsIGRhdGUubW9udGgsIGRhdGUuZGF5KTtcclxuXHJcbiAgICBzd2l0Y2ggKHBlcmlvZCkge1xyXG4gICAgICBjYXNlICd5JzpcclxuICAgICAgICBkYXRlID0gc2V0SmFsYWxpWWVhcihkYXRlLCBkYXRlLnllYXIgKyBudW1iZXIpO1xyXG4gICAgICAgIGRhdGUubW9udGggPSAxO1xyXG4gICAgICAgIGRhdGUuZGF5ID0gMTtcclxuICAgICAgICByZXR1cm4gZGF0ZTtcclxuICAgICAgY2FzZSAnbSc6XHJcbiAgICAgICAgZGF0ZSA9IHNldEphbGFsaU1vbnRoKGRhdGUsIGRhdGUubW9udGggKyBudW1iZXIpO1xyXG4gICAgICAgIGRhdGUuZGF5ID0gMTtcclxuICAgICAgICByZXR1cm4gZGF0ZTtcclxuICAgICAgY2FzZSAnZCc6XHJcbiAgICAgICAgcmV0dXJuIHNldEphbGFsaURheShkYXRlLCBkYXRlLmRheSArIG51bWJlcik7XHJcbiAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgcmV0dXJuIGRhdGU7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBnZXRQcmV2KGRhdGU6IE5nYkRhdGUsIHBlcmlvZDogTmdiUGVyaW9kID0gJ2QnLCBudW1iZXIgPSAxKSB7IHJldHVybiB0aGlzLmdldE5leHQoZGF0ZSwgcGVyaW9kLCAtbnVtYmVyKTsgfVxyXG5cclxuICBnZXRXZWVrZGF5KGRhdGU6IE5nYkRhdGUpIHtcclxuICAgIGNvbnN0IGRheSA9IHRvR3JlZ29yaWFuKGRhdGUpLmdldERheSgpO1xyXG4gICAgLy8gaW4gSlMgRGF0ZSBTdW49MCwgaW4gSVNPIDg2MDEgU3VuPTdcclxuICAgIHJldHVybiBkYXkgPT09IDAgPyA3IDogZGF5O1xyXG4gIH1cclxuXHJcbiAgZ2V0V2Vla051bWJlcih3ZWVrOiBOZ2JEYXRlW10sIGZpcnN0RGF5T2ZXZWVrOiBudW1iZXIpIHtcclxuICAgIC8vIGluIEpTIERhdGUgU3VuPTAsIGluIElTTyA4NjAxIFN1bj03XHJcbiAgICBpZiAoZmlyc3REYXlPZldlZWsgPT09IDcpIHtcclxuICAgICAgZmlyc3REYXlPZldlZWsgPSAwO1xyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0IHRodXJzZGF5SW5kZXggPSAoNCArIDcgLSBmaXJzdERheU9mV2VlaykgJSA3O1xyXG4gICAgY29uc3QgZGF0ZSA9IHdlZWtbdGh1cnNkYXlJbmRleF07XHJcblxyXG4gICAgY29uc3QganNEYXRlID0gdG9HcmVnb3JpYW4oZGF0ZSk7XHJcbiAgICBqc0RhdGUuc2V0RGF0ZShqc0RhdGUuZ2V0RGF0ZSgpICsgNCAtIChqc0RhdGUuZ2V0RGF5KCkgfHwgNykpOyAgLy8gVGh1cnNkYXlcclxuICAgIGNvbnN0IHRpbWUgPSBqc0RhdGUuZ2V0VGltZSgpO1xyXG4gICAgY29uc3Qgc3RhcnREYXRlID0gdG9HcmVnb3JpYW4obmV3IE5nYkRhdGUoZGF0ZS55ZWFyLCAxLCAxKSk7XHJcbiAgICByZXR1cm4gTWF0aC5mbG9vcihNYXRoLnJvdW5kKCh0aW1lIC0gc3RhcnREYXRlLmdldFRpbWUoKSkgLyA4NjQwMDAwMCkgLyA3KSArIDE7XHJcbiAgfVxyXG5cclxuICBnZXRUb2RheSgpOiBOZ2JEYXRlIHsgcmV0dXJuIGZyb21HcmVnb3JpYW4obmV3IERhdGUoKSk7IH1cclxuXHJcbiAgaXNWYWxpZChkYXRlOiBOZ2JEYXRlKTogYm9vbGVhbiB7XHJcbiAgICByZXR1cm4gZGF0ZSAmJiBpc0ludGVnZXIoZGF0ZS55ZWFyKSAmJiBpc0ludGVnZXIoZGF0ZS5tb250aCkgJiYgaXNJbnRlZ2VyKGRhdGUuZGF5KSAmJlxyXG4gICAgICAgICFpc05hTih0b0dyZWdvcmlhbihkYXRlKS5nZXRUaW1lKCkpO1xyXG4gIH1cclxufVxyXG4iXX0=