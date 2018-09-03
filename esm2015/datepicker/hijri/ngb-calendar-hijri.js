/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { NgbDate } from '../ngb-date';
import { NgbCalendar } from '../ngb-calendar';
import { Injectable } from '@angular/core';
import { isNumber } from '../../util/util';
/**
 * @abstract
 */
export class NgbCalendarHijri extends NgbCalendar {
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
        date = new NgbDate(date.year, date.month, date.day);
        switch (period) {
            case 'y':
                date = this._setYear(date, date.year + number);
                date.month = 1;
                date.day = 1;
                return date;
            case 'm':
                date = this._setMonth(date, date.month + number);
                date.day = 1;
                return date;
            case 'd':
                return this._setDay(date, date.day + number);
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
        const day = this.toGregorian(date).getDay();
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
        const date = week[thursdayIndex];
        /** @type {?} */
        const jsDate = this.toGregorian(date);
        jsDate.setDate(jsDate.getDate() + 4 - (jsDate.getDay() || 7));
        /** @type {?} */
        const time = jsDate.getTime();
        /** @type {?} */
        const MuhDate = this.toGregorian(new NgbDate(date.year, 1, 1)); // Compare with Muharram 1
        return Math.floor(Math.round((time - MuhDate.getTime()) / 86400000) / 7) + 1;
    }
    /**
     * @return {?}
     */
    getToday() { return this.fromGregorian(new Date()); }
    /**
     * @param {?} date
     * @return {?}
     */
    isValid(date) {
        return date && isNumber(date.year) && isNumber(date.month) && isNumber(date.day) &&
            !isNaN(this.toGregorian(date).getTime());
    }
    /**
     * @param {?} date
     * @param {?} day
     * @return {?}
     */
    _setDay(date, day) {
        day = +day;
        /** @type {?} */
        let mDays = this.getDaysPerMonth(date.month, date.year);
        if (day <= 0) {
            while (day <= 0) {
                date = this._setMonth(date, date.month - 1);
                mDays = this.getDaysPerMonth(date.month, date.year);
                day += mDays;
            }
        }
        else if (day > mDays) {
            while (day > mDays) {
                day -= mDays;
                date = this._setMonth(date, date.month + 1);
                mDays = this.getDaysPerMonth(date.month, date.year);
            }
        }
        date.day = day;
        return date;
    }
    /**
     * @param {?} date
     * @param {?} month
     * @return {?}
     */
    _setMonth(date, month) {
        month = +month;
        date.year = date.year + Math.floor((month - 1) / 12);
        date.month = Math.floor(((month - 1) % 12 + 12) % 12) + 1;
        return date;
    }
    /**
     * @param {?} date
     * @param {?} year
     * @return {?}
     */
    _setYear(date, year) {
        date.year = +year;
        return date;
    }
}
NgbCalendarHijri.decorators = [
    { type: Injectable },
];
if (false) {
    /**
     * Returns the number of days in a specific Hijri month.
     * `month` is 1 for Muharram, 2 for Safar, etc.
     * `year` is any Hijri year.
     * @abstract
     * @param {?} month
     * @param {?} year
     * @return {?}
     */
    NgbCalendarHijri.prototype.getDaysPerMonth = function (month, year) { };
    /**
     * Returns the equivalent Hijri date value for a give input Gregorian date.
     * `gDate` is s JS Date to be converted to Hijri.
     * @abstract
     * @param {?} gDate
     * @return {?}
     */
    NgbCalendarHijri.prototype.fromGregorian = function (gDate) { };
    /**
     * Converts the current Hijri date to Gregorian.
     * @abstract
     * @param {?} hDate
     * @return {?}
     */
    NgbCalendarHijri.prototype.toGregorian = function (hDate) { };
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmdiLWNhbGVuZGFyLWhpanJpLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQG5nLWJvb3RzdHJhcC9uZy1ib290c3RyYXAvIiwic291cmNlcyI6WyJkYXRlcGlja2VyL2hpanJpL25nYi1jYWxlbmRhci1oaWpyaS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFDLE9BQU8sRUFBQyxNQUFNLGFBQWEsQ0FBQztBQUNwQyxPQUFPLEVBQVksV0FBVyxFQUFDLE1BQU0saUJBQWlCLENBQUM7QUFDdkQsT0FBTyxFQUFDLFVBQVUsRUFBQyxNQUFNLGVBQWUsQ0FBQztBQUN6QyxPQUFPLEVBQUMsUUFBUSxFQUFDLE1BQU0saUJBQWlCLENBQUM7Ozs7QUFHekMsTUFBTSx1QkFBaUMsU0FBUSxXQUFXOzs7O0lBbUJ4RCxjQUFjLEtBQUssTUFBTSxDQUFDLENBQUMsQ0FBQyxFQUFFOzs7O0lBRTlCLFNBQVMsS0FBSyxNQUFNLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsQ0FBQyxDQUFDLEVBQUU7Ozs7SUFFL0QsZ0JBQWdCLEtBQUssTUFBTSxDQUFDLENBQUMsQ0FBQyxFQUFFOzs7Ozs7O0lBRWhDLE9BQU8sQ0FBQyxJQUFhLEVBQUUsU0FBb0IsR0FBRyxFQUFFLE1BQU0sR0FBRyxDQUFDO1FBQ3hELElBQUksR0FBRyxJQUFJLE9BQU8sQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxLQUFLLEVBQUUsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBRXBELE1BQU0sQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUM7WUFDZixLQUFLLEdBQUc7Z0JBQ04sSUFBSSxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxJQUFJ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Q0FBQyxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUM7UUFDckQsSUFBSSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxLQUFLLEdBQUcsQ0FBQyxDQUFDLEdBQUcsRUFBRSxHQUFHLEVBQUUsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUMxRCxNQUFNLENBQUMsSUFBSSxDQUFDOzs7Ozs7O0lBR04sUUFBUSxDQUFDLElBQWEsRUFBRSxJQUFZO1FBQzFDLElBQUksQ0FBQyxJQUFJLEdBQUcsQ0FBQyxJQUFJLENBQUM7UUFDbEIsTUFBTSxDQUFDLElBQUksQ0FBQzs7OztZQTNHZixVQUFVIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtOZ2JEYXRlfSBmcm9tICcuLi9uZ2ItZGF0ZSc7XHJcbmltcG9ydCB7TmdiUGVyaW9kLCBOZ2JDYWxlbmRhcn0gZnJvbSAnLi4vbmdiLWNhbGVuZGFyJztcclxuaW1wb3J0IHtJbmplY3RhYmxlfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHtpc051bWJlcn0gZnJvbSAnLi4vLi4vdXRpbC91dGlsJztcclxuXHJcbkBJbmplY3RhYmxlKClcclxuZXhwb3J0IGFic3RyYWN0IGNsYXNzIE5nYkNhbGVuZGFySGlqcmkgZXh0ZW5kcyBOZ2JDYWxlbmRhciB7XHJcbiAgLyoqXHJcbiAgICogUmV0dXJucyB0aGUgbnVtYmVyIG9mIGRheXMgaW4gYSBzcGVjaWZpYyBIaWpyaSBtb250aC5cclxuICAgKiBgbW9udGhgIGlzIDEgZm9yIE11aGFycmFtLCAyIGZvciBTYWZhciwgZXRjLlxyXG4gICAqIGB5ZWFyYCBpcyBhbnkgSGlqcmkgeWVhci5cclxuICAgKi9cclxuICBhYnN0cmFjdCBnZXREYXlzUGVyTW9udGgobW9udGg6IG51bWJlciwgeWVhcjogbnVtYmVyKTogbnVtYmVyO1xyXG5cclxuICAvKipcclxuICAgKiBSZXR1cm5zIHRoZSBlcXVpdmFsZW50IEhpanJpIGRhdGUgdmFsdWUgZm9yIGEgZ2l2ZSBpbnB1dCBHcmVnb3JpYW4gZGF0ZS5cclxuICAgKiBgZ0RhdGVgIGlzIHMgSlMgRGF0ZSB0byBiZSBjb252ZXJ0ZWQgdG8gSGlqcmkuXHJcbiAgICovXHJcbiAgYWJzdHJhY3QgZnJvbUdyZWdvcmlhbihnRGF0ZTogRGF0ZSk6IE5nYkRhdGU7XHJcblxyXG4gIC8qKlxyXG4gICAqIENvbnZlcnRzIHRoZSBjdXJyZW50IEhpanJpIGRhdGUgdG8gR3JlZ29yaWFuLlxyXG4gICAqL1xyXG4gIGFic3RyYWN0IHRvR3JlZ29yaWFuKGhEYXRlOiBOZ2JEYXRlKTogRGF0ZTtcclxuXHJcbiAgZ2V0RGF5c1BlcldlZWsoKSB7IHJldHVybiA3OyB9XHJcblxyXG4gIGdldE1vbnRocygpIHsgcmV0dXJuIFsxLCAyLCAzLCA0LCA1LCA2LCA3LCA4LCA5LCAxMCwgMTEsIDEyXTsgfVxyXG5cclxuICBnZXRXZWVrc1Blck1vbnRoKCkgeyByZXR1cm4gNjsgfVxyXG5cclxuICBnZXROZXh0KGRhdGU6IE5nYkRhdGUsIHBlcmlvZDogTmdiUGVyaW9kID0gJ2QnLCBudW1iZXIgPSAxKSB7XHJcbiAgICBkYXRlID0gbmV3IE5nYkRhdGUoZGF0ZS55ZWFyLCBkYXRlLm1vbnRoLCBkYXRlLmRheSk7XHJcblxyXG4gICAgc3dpdGNoIChwZXJpb2QpIHtcclxuICAgICAgY2FzZSAneSc6XHJcbiAgICAgICAgZGF0ZSA9IHRoaXMuX3NldFllYXIoZGF0ZSwgZGF0ZS55ZWFyICsgbnVtYmVyKTtcclxuICAgICAgICBkYXRlLm1vbnRoID0gMTtcclxuICAgICAgICBkYXRlLmRheSA9IDE7XHJcbiAgICAgICAgcmV0dXJuIGRhdGU7XHJcbiAgICAgIGNhc2UgJ20nOlxyXG4gICAgICAgIGRhdGUgPSB0aGlzLl9zZXRNb250aChkYXRlLCBkYXRlLm1vbnRoICsgbnVtYmVyKTtcclxuICAgICAgICBkYXRlLmRheSA9IDE7XHJcbiAgICAgICAgcmV0dXJuIGRhdGU7XHJcbiAgICAgIGNhc2UgJ2QnOlxyXG4gICAgICAgIHJldHVybiB0aGlzLl9zZXREYXkoZGF0ZSwgZGF0ZS5kYXkgKyBudW1iZXIpO1xyXG4gICAgICBkZWZhdWx0OlxyXG4gICAgICAgIHJldHVybiBkYXRlO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgZ2V0UHJldihkYXRlOiBOZ2JEYXRlLCBwZXJpb2Q6IE5nYlBlcmlvZCA9ICdkJywgbnVtYmVyID0gMSkgeyByZXR1cm4gdGhpcy5nZXROZXh0KGRhdGUsIHBlcmlvZCwgLW51bWJlcik7IH1cclxuXHJcbiAgZ2V0V2Vla2RheShkYXRlOiBOZ2JEYXRlKSB7XHJcbiAgICBjb25zdCBkYXkgPSB0aGlzLnRvR3JlZ29yaWFuKGRhdGUpLmdldERheSgpO1xyXG4gICAgLy8gaW4gSlMgRGF0ZSBTdW49MCwgaW4gSVNPIDg2MDEgU3VuPTdcclxuICAgIHJldHVybiBkYXkgPT09IDAgPyA3IDogZGF5O1xyXG4gIH1cclxuXHJcbiAgZ2V0V2Vla051bWJlcih3ZWVrOiBOZ2JEYXRlW10sIGZpcnN0RGF5T2ZXZWVrOiBudW1iZXIpIHtcclxuICAgIC8vIGluIEpTIERhdGUgU3VuPTAsIGluIElTTyA4NjAxIFN1bj03XHJcbiAgICBpZiAoZmlyc3REYXlPZldlZWsgPT09IDcpIHtcclxuICAgICAgZmlyc3REYXlPZldlZWsgPSAwO1xyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0IHRodXJzZGF5SW5kZXggPSAoNCArIDcgLSBmaXJzdERheU9mV2VlaykgJSA3O1xyXG4gICAgY29uc3QgZGF0ZSA9IHdlZWtbdGh1cnNkYXlJbmRleF07XHJcblxyXG4gICAgY29uc3QganNEYXRlID0gdGhpcy50b0dyZWdvcmlhbihkYXRlKTtcclxuICAgIGpzRGF0ZS5zZXREYXRlKGpzRGF0ZS5nZXREYXRlKCkgKyA0IC0gKGpzRGF0ZS5nZXREYXkoKSB8fCA3KSk7ICAvLyBUaHVyc2RheVxyXG4gICAgY29uc3QgdGltZSA9IGpzRGF0ZS5nZXRUaW1lKCk7XHJcbiAgICBjb25zdCBNdWhEYXRlID0gdGhpcy50b0dyZWdvcmlhbihuZXcgTmdiRGF0ZShkYXRlLnllYXIsIDEsIDEpKTsgIC8vIENvbXBhcmUgd2l0aCBNdWhhcnJhbSAxXHJcbiAgICByZXR1cm4gTWF0aC5mbG9vcihNYXRoLnJvdW5kKCh0aW1lIC0gTXVoRGF0ZS5nZXRUaW1lKCkpIC8gODY0MDAwMDApIC8gNykgKyAxO1xyXG4gIH1cclxuXHJcbiAgZ2V0VG9kYXkoKTogTmdiRGF0ZSB7IHJldHVybiB0aGlzLmZyb21HcmVnb3JpYW4obmV3IERhdGUoKSk7IH1cclxuXHJcblxyXG4gIGlzVmFsaWQoZGF0ZTogTmdiRGF0ZSk6IGJvb2xlYW4ge1xyXG4gICAgcmV0dXJuIGRhdGUgJiYgaXNOdW1iZXIoZGF0ZS55ZWFyKSAmJiBpc051bWJlcihkYXRlLm1vbnRoKSAmJiBpc051bWJlcihkYXRlLmRheSkgJiZcclxuICAgICAgICAhaXNOYU4odGhpcy50b0dyZWdvcmlhbihkYXRlKS5nZXRUaW1lKCkpO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBfc2V0RGF5KGRhdGU6IE5nYkRhdGUsIGRheTogbnVtYmVyKTogTmdiRGF0ZSB7XHJcbiAgICBkYXkgPSArZGF5O1xyXG4gICAgbGV0IG1EYXlzID0gdGhpcy5nZXREYXlzUGVyTW9udGgoZGF0ZS5tb250aCwgZGF0ZS55ZWFyKTtcclxuICAgIGlmIChkYXkgPD0gMCkge1xyXG4gICAgICB3aGlsZSAoZGF5IDw9IDApIHtcclxuICAgICAgICBkYXRlID0gdGhpcy5fc2V0TW9udGgoZGF0ZSwgZGF0ZS5tb250aCAtIDEpO1xyXG4gICAgICAgIG1EYXlzID0gdGhpcy5nZXREYXlzUGVyTW9udGgoZGF0ZS5tb250aCwgZGF0ZS55ZWFyKTtcclxuICAgICAgICBkYXkgKz0gbURheXM7XHJcbiAgICAgIH1cclxuICAgIH0gZWxzZSBpZiAoZGF5ID4gbURheXMpIHtcclxuICAgICAgd2hpbGUgKGRheSA+IG1EYXlzKSB7XHJcbiAgICAgICAgZGF5IC09IG1EYXlzO1xyXG4gICAgICAgIGRhdGUgPSB0aGlzLl9zZXRNb250aChkYXRlLCBkYXRlLm1vbnRoICsgMSk7XHJcbiAgICAgICAgbURheXMgPSB0aGlzLmdldERheXNQZXJNb250aChkYXRlLm1vbnRoLCBkYXRlLnllYXIpO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgICBkYXRlLmRheSA9IGRheTtcclxuICAgIHJldHVybiBkYXRlO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBfc2V0TW9udGgoZGF0ZTogTmdiRGF0ZSwgbW9udGg6IG51bWJlcik6IE5nYkRhdGUge1xyXG4gICAgbW9udGggPSArbW9udGg7XHJcbiAgICBkYXRlLnllYXIgPSBkYXRlLnllYXIgKyBNYXRoLmZsb29yKChtb250aCAtIDEpIC8gMTIpO1xyXG4gICAgZGF0ZS5tb250aCA9IE1hdGguZmxvb3IoKChtb250aCAtIDEpICUgMTIgKyAxMikgJSAxMikgKyAxO1xyXG4gICAgcmV0dXJuIGRhdGU7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIF9zZXRZZWFyKGRhdGU6IE5nYkRhdGUsIHllYXI6IG51bWJlcik6IE5nYkRhdGUge1xyXG4gICAgZGF0ZS55ZWFyID0gK3llYXI7XHJcbiAgICByZXR1cm4gZGF0ZTtcclxuICB9XHJcbn1cclxuIl19