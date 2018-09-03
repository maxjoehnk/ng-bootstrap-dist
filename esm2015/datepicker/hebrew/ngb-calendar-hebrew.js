/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
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
export class NgbCalendarHebrew extends NgbCalendar {
    /**
     * @return {?}
     */
    getDaysPerWeek() { return 7; }
    /**
     * @param {?=} year
     * @return {?}
     */
    getMonths(year) {
        if (year && isHebrewLeapYear(year)) {
            return [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13];
        }
        else {
            return [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
        }
    }
    /**
     * @return {?}
     */
    getWeeksPerMonth() { return 6; }
    /**
     * @param {?} date
     * @return {?}
     */
    isValid(date) {
        /** @type {?} */
        let b = date && isNumber(date.year) && isNumber(date.month) && isNumber(date.day);
        b = b && date.month > 0 && date.month <= (isHebrewLeapYear(date.year) ? 13 : 12);
        b = b && date.day > 0 && date.day <= getDaysInHebrewMonth(date.month, date.year);
        return b && !isNaN(toGregorian(date).getTime());
    }
    /**
     * @param {?} date
     * @param {?=} period
     * @param {?=} number
     * @return {?}
     */
    getNext(date, period = 'd', number = 1) {
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
        const day = toGregorian(date).getDay();
        // in JS Date Sun=0, in ISO 8601 Sun=7
        return day === 0 ? 7 : day;
    }
    /**
     * @param {?} week
     * @param {?} firstDayOfWeek
     * @return {?}
     */
    getWeekNumber(week, firstDayOfWeek) {
        /** @type {?} */
        const date = week[week.length - 1];
        return Math.ceil(getDayNumberInHebrewYear(date) / 7);
    }
    /**
     * @return {?}
     */
    getToday() { return fromGregorian(new Date()); }
}
NgbCalendarHebrew.decorators = [
    { type: Injectable },
];

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmdiLWNhbGVuZGFyLWhlYnJldy5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BuZy1ib290c3RyYXAvbmctYm9vdHN0cmFwLyIsInNvdXJjZXMiOlsiZGF0ZXBpY2tlci9oZWJyZXcvbmdiLWNhbGVuZGFyLWhlYnJldy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFDLE9BQU8sRUFBQyxNQUFNLGFBQWEsQ0FBQztBQUNwQyxPQUFPLEVBQUMsV0FBVyxFQUFZLE1BQU0saUJBQWlCLENBQUM7QUFDdkQsT0FBTyxFQUFDLFVBQVUsRUFBQyxNQUFNLGVBQWUsQ0FBQztBQUN6QyxPQUFPLEVBQUMsUUFBUSxFQUFDLE1BQU0saUJBQWlCLENBQUM7QUFDekMsT0FBTyxFQUNMLGFBQWEsRUFDYix3QkFBd0IsRUFDeEIsb0JBQW9CLEVBQ3BCLGdCQUFnQixFQUNoQixXQUFXLEVBQ1gsWUFBWSxFQUNaLGNBQWMsRUFDZixNQUFNLFVBQVUsQ0FBQzs7Ozs7OztBQVNsQixNQUFNLHdCQUF5QixTQUFRLFdBQVc7Ozs7SUFDaEQsY0FBYyxLQUFLLE1BQU0sQ0FBQyxDQUFDLENBQUMsRUFBRTs7Ozs7SUFFOUIsU0FBUyxDQUFDLElBQWE7UUFDckIsRUFBRSxDQUFDLENBQUMsSUFBSSxJQUFJLGdCQUFnQixDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUNuQyxNQUFNLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLENBQUMsQ0FBQztTQUNwRDtRQUFDLElBQUksQ0FBQyxDQUFDO1lBQ04sTUFBTSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMs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QUFDLEVBQUU7OztZQXREMUQsVUFBVSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7TmdiRGF0ZX0gZnJvbSAnLi4vbmdiLWRhdGUnO1xyXG5pbXBvcnQge05nYkNhbGVuZGFyLCBOZ2JQZXJpb2R9IGZyb20gJy4uL25nYi1jYWxlbmRhcic7XHJcbmltcG9ydCB7SW5qZWN0YWJsZX0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7aXNOdW1iZXJ9IGZyb20gJy4uLy4uL3V0aWwvdXRpbCc7XHJcbmltcG9ydCB7XHJcbiAgZnJvbUdyZWdvcmlhbixcclxuICBnZXREYXlOdW1iZXJJbkhlYnJld1llYXIsXHJcbiAgZ2V0RGF5c0luSGVicmV3TW9udGgsXHJcbiAgaXNIZWJyZXdMZWFwWWVhcixcclxuICB0b0dyZWdvcmlhbixcclxuICBzZXRIZWJyZXdEYXksXHJcbiAgc2V0SGVicmV3TW9udGhcclxufSBmcm9tICcuL2hlYnJldyc7XHJcblxyXG4vKipcclxuICogVGhlIEhlYnJldyBvciBKZXdpc2ggY2FsZW5kYXIgaXMgYSBsdW5pc29sYXIgY2FsZW5kYXIuXHJcbiAqIEluIElzcmFlbCwgaXQgaXMgdXNlZCBmb3IgcmVsaWdpb3VzIHB1cnBvc2VzIGFuZCBmcmVxdWVudGx5IC0gYXMgYW4gb2ZmaWNpYWwgY2FsZW5kYXIgZm9yIGNpdmlsIHB1cnBvc2VzLlxyXG4gKlxyXG4gKiBAc2luY2UgMy4yLjBcclxuICovXHJcbkBJbmplY3RhYmxlKClcclxuZXhwb3J0IGNsYXNzIE5nYkNhbGVuZGFySGVicmV3IGV4dGVuZHMgTmdiQ2FsZW5kYXIge1xyXG4gIGdldERheXNQZXJXZWVrKCkgeyByZXR1cm4gNzsgfVxyXG5cclxuICBnZXRNb250aHMoeWVhcj86IG51bWJlcikge1xyXG4gICAgaWYgKHllYXIgJiYgaXNIZWJyZXdMZWFwWWVhcih5ZWFyKSkge1xyXG4gICAgICByZXR1cm4gWzEsIDIsIDMsIDQsIDUsIDYsIDcsIDgsIDksIDEwLCAxMSwgMTIsIDEzXTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHJldHVybiBbMSwgMiwgMywgNCwgNSwgNiwgNywgOCwgOSwgMTAsIDExLCAxMl07XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBnZXRXZWVrc1Blck1vbnRoKCkgeyByZXR1cm4gNjsgfVxyXG5cclxuICBpc1ZhbGlkKGRhdGU6IE5nYkRhdGUpOiBib29sZWFuIHtcclxuICAgIGxldCBiID0gZGF0ZSAmJiBpc051bWJlcihkYXRlLnllYXIpICYmIGlzTnVtYmVyKGRhdGUubW9udGgpICYmIGlzTnVtYmVyKGRhdGUuZGF5KTtcclxuICAgIGIgPSBiICYmIGRhdGUubW9udGggPiAwICYmIGRhdGUubW9udGggPD0gKGlzSGVicmV3TGVhcFllYXIoZGF0ZS55ZWFyKSA/IDEzIDogMTIpO1xyXG4gICAgYiA9IGIgJiYgZGF0ZS5kYXkgPiAwICYmIGRhdGUuZGF5IDw9IGdldERheXNJbkhlYnJld01vbnRoKGRhdGUubW9udGgsIGRhdGUueWVhcik7XHJcbiAgICByZXR1cm4gYiAmJiAhaXNOYU4odG9HcmVnb3JpYW4oZGF0ZSkuZ2V0VGltZSgpKTtcclxuICB9XHJcblxyXG4gIGdldE5leHQoZGF0ZTogTmdiRGF0ZSwgcGVyaW9kOiBOZ2JQZXJpb2QgPSAnZCcsIG51bWJlciA9IDEpIHtcclxuICAgIGRhdGUgPSBuZXcgTmdiRGF0ZShkYXRlLnllYXIsIGRhdGUubW9udGgsIGRhdGUuZGF5KTtcclxuXHJcbiAgICBzd2l0Y2ggKHBlcmlvZCkge1xyXG4gICAgICBjYXNlICd5JzpcclxuICAgICAgICBkYXRlLnllYXIgKz0gbnVtYmVyO1xyXG4gICAgICAgIGRhdGUubW9udGggPSAxO1xyXG4gICAgICAgIGRhdGUuZGF5ID0gMTtcclxuICAgICAgICByZXR1cm4gZGF0ZTtcclxuICAgICAgY2FzZSAnbSc6XHJcbiAgICAgICAgZGF0ZSA9IHNldEhlYnJld01vbnRoKGRhdGUsIG51bWJlcik7XHJcbiAgICAgICAgZGF0ZS5kYXkgPSAxO1xyXG4gICAgICAgIHJldHVybiBkYXRlO1xyXG4gICAgICBjYXNlICdkJzpcclxuICAgICAgICByZXR1cm4gc2V0SGVicmV3RGF5KGRhdGUsIG51bWJlcik7XHJcbiAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgcmV0dXJuIGRhdGU7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBnZXRQcmV2KGRhdGU6IE5nYkRhdGUsIHBlcmlvZDogTmdiUGVyaW9kID0gJ2QnLCBudW1iZXIgPSAxKSB7IHJldHVybiB0aGlzLmdldE5leHQoZGF0ZSwgcGVyaW9kLCAtbnVtYmVyKTsgfVxyXG5cclxuICBnZXRXZWVrZGF5KGRhdGU6IE5nYkRhdGUpIHtcclxuICAgIGNvbnN0IGRheSA9IHRvR3JlZ29yaWFuKGRhdGUpLmdldERheSgpO1xyXG4gICAgLy8gaW4gSlMgRGF0ZSBTdW49MCwgaW4gSVNPIDg2MDEgU3VuPTdcclxuICAgIHJldHVybiBkYXkgPT09IDAgPyA3IDogZGF5O1xyXG4gIH1cclxuXHJcbiAgZ2V0V2Vla051bWJlcih3ZWVrOiBOZ2JEYXRlW10sIGZpcnN0RGF5T2ZXZWVrOiBudW1iZXIpIHtcclxuICAgIGNvbnN0IGRhdGUgPSB3ZWVrW3dlZWsubGVuZ3RoIC0gMV07XHJcbiAgICByZXR1cm4gTWF0aC5jZWlsKGdldERheU51bWJlckluSGVicmV3WWVhcihkYXRlKSAvIDcpO1xyXG4gIH1cclxuXHJcbiAgZ2V0VG9kYXkoKTogTmdiRGF0ZSB7IHJldHVybiBmcm9tR3JlZ29yaWFuKG5ldyBEYXRlKCkpOyB9XHJcbn1cclxuIl19