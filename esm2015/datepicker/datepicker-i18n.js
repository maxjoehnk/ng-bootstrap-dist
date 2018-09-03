/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { Inject, Injectable, LOCALE_ID } from '@angular/core';
import { FormStyle, getLocaleDayNames, getLocaleMonthNames, TranslationWidth, formatDate } from '@angular/common';
import * as i0 from "@angular/core";
/**
 * @param {?} locale
 * @return {?}
 */
export function NGB_DATEPICKER_18N_FACTORY(locale) {
    return new NgbDatepickerI18nDefault(locale);
}
/**
 * Type of the service supplying month and weekday names to to NgbDatepicker component.
 * The default implementation of this service honors the Angular locale, and uses the registered locale data,
 * as explained in the Angular i18n guide.
 * See the i18n demo for how to extend this class and define a custom provider for i18n.
 * @abstract
 */
export class NgbDatepickerI18n {
    /**
     * Returns the textual representation of a day that is rendered in a day cell
     *
     * \@since 3.0.0
     * @param {?} date
     * @return {?}
     */
    getDayNumerals(date) { return `${date.day}`; }
    /**
     * Returns the textual representation of a week number rendered by date picker
     *
     * \@since 3.0.0
     * @param {?} weekNumber
     * @return {?}
     */
    getWeekNumerals(weekNumber) { return `${weekNumber}`; }
    /**
     * Returns the textual representation of a year that is rendered
     * in date picker year select box
     *
     * \@since 3.0.0
     * @param {?} year
     * @return {?}
     */
    getYearNumerals(year) { return `${year}`; }
}
NgbDatepickerI18n.decorators = [
    { type: Injectable, args: [{ providedIn: 'root', useFactory: NGB_DATEPICKER_18N_FACTORY, deps: [LOCALE_ID] },] },
];
/** @nocollapse */ NgbDatepickerI18n.ngInjectableDef = i0.defineInjectable({ factory: function NgbDatepickerI18n_Factory() { return NGB_DATEPICKER_18N_FACTORY(i0.inject(i0.LOCALE_ID)); }, token: NgbDatepickerI18n, providedIn: "root" });
if (false) {
    /**
     * Returns the short weekday name to display in the heading of the month view.
     * With default calendar we use ISO 8601: 'weekday' is 1=Mon ... 7=Sun
     * @abstract
     * @param {?} weekday
     * @return {?}
     */
    NgbDatepickerI18n.prototype.getWeekdayShortName = function (weekday) { };
    /**
     * Returns the short month name to display in the date picker navigation.
     * With default calendar we use ISO 8601: 'month' is 1=Jan ... 12=Dec
     * @abstract
     * @param {?} month
     * @param {?=} year
     * @return {?}
     */
    NgbDatepickerI18n.prototype.getMonthShortName = function (month, year) { };
    /**
     * Returns the full month name to display in the date picker navigation.
     * With default calendar we use ISO 8601: 'month' is 1=January ... 12=December
     * @abstract
     * @param {?} month
     * @param {?=} year
     * @return {?}
     */
    NgbDatepickerI18n.prototype.getMonthFullName = function (month, year) { };
    /**
     * Returns the value of the 'aria-label' attribute for a specific date
     *
     * \@since 2.0.0
     * @abstract
     * @param {?} date
     * @return {?}
     */
    NgbDatepickerI18n.prototype.getDayAriaLabel = function (date) { };
}
export class NgbDatepickerI18nDefault extends NgbDatepickerI18n {
    /**
     * @param {?} _locale
     */
    constructor(_locale) {
        super();
        this._locale = _locale;
        /** @type {?} */
        const weekdaysStartingOnSunday = getLocaleDayNames(_locale, FormStyle.Standalone, TranslationWidth.Short);
        this._weekdaysShort = weekdaysStartingOnSunday.map((day, index) => weekdaysStartingOnSunday[(index + 1) % 7]);
        this._monthsShort = getLocaleMonthNames(_locale, FormStyle.Standalone, TranslationWidth.Abbreviated);
        this._monthsFull = getLocaleMonthNames(_locale, FormStyle.Standalone, TranslationWidth.Wide);
    }
    /**
     * @param {?} weekday
     * @return {?}
     */
    getWeekdayShortName(weekday) { return this._weekdaysShort[weekday - 1]; }
    /**
     * @param {?} month
     * @return {?}
     */
    getMonthShortName(month) { return this._monthsShort[month - 1]; }
    /**
     * @param {?} month
     * @return {?}
     */
    getMonthFullName(month) { return this._monthsFull[month - 1]; }
    /**
     * @param {?} date
     * @return {?}
     */
    getDayAriaLabel(date) {
        /** @type {?} */
        const jsDate = new Date(date.year, date.month - 1, date.day);
        return formatDate(jsDate, 'fullDate', this._locale);
    }
}
NgbDatepickerI18nDefault.decorators = [
    { type: Injectable },
];
/** @nocollapse */
NgbDatepickerI18nDefault.ctorParameters = () => [
    { type: String, decorators: [{ type: Inject, args: [LOCALE_ID,] }] }
];
if (false) {
    /** @type {?} */
    NgbDatepickerI18nDefault.prototype._weekdaysShort;
    /** @type {?} */
    NgbDatepickerI18nDefault.prototype._monthsShort;
    /** @type {?} */
    NgbDatepickerI18nDefault.prototype._monthsFull;
    /** @type {?} */
    NgbDatepickerI18nDefault.prototype._locale;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0ZXBpY2tlci1pMThuLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQG5nLWJvb3RzdHJhcC9uZy1ib290c3RyYXAvIiwic291cmNlcyI6WyJkYXRlcGlja2VyL2RhdGVwaWNrZXItaTE4bi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFDLE1BQU0sRUFBRSxVQUFVLEVBQUUsU0FBUyxFQUFDLE1BQU0sZUFBZSxDQUFDO0FBQzVELE9BQU8sRUFBQyxTQUFTLEVBQUUsaUJBQWlCLEVBQUUsbUJBQW1CLEVBQUUsZ0JBQWdCLEVBQUUsVUFBVSxFQUFDLE1BQU0saUJBQWlCLENBQUM7Ozs7OztBQUdoSCxNQUFNLHFDQUFxQyxNQUFNO0lBQy9DLE1BQU0sQ0FBQyxJQUFJLHdCQUF3QixDQUFDLE1BQU0sQ0FBQyxDQUFDO0NBQzdDOzs7Ozs7OztBQVNELE1BQU07Ozs7Ozs7O0lBK0JKLGNBQWMsQ0FBQyxJQUFtQixJQUFZLE1BQU0sQ0FBQyxHQUFHLElBQUksQ0FBQyxHQUFHLEVBQUUsQ0FBQyxFQUFFOzs7Ozs7OztJQU9yRSxlQUFlLENBQUMsVUFBa0IsSUFBWSxNQUFNLENBQUMsR0FBRyxVQUFVLEVBQUUsQ0FBQyxFQUFFOzs7Ozs7Ozs7SUFRdkUsZUFBZSxDQUFDLElBQVksSUFBWSxNQUFNLENBQUMsR0FBRyxJQUFJLEVBQUUsQ0FBQyxFQUFFOzs7WUEvQzVELFVBQVUsU0FBQyxFQUFDLFVBQVUsRUFBRSxNQUFNLEVBQUUsVUFBVSxFQUFFLDBCQUEwQixFQUFFLElBQUksRUFBRSxDQUFDLFNBQVMsQ0FBQyxFQUFDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBbUQzRixNQUFNLCtCQUFnQyxTQUFRLGlCQUFpQjs7OztJQUs3RCxZQUF1QyxPQUFlO1FBQ3BELEtBQUssRUFBRSxDQUFDO1FBRDZCLFlBQU8sR0FBUCxPQUFPLENBQVE7O1FBR3BELE1BQU0sd0JBQXdCLEdBQUcsaUJBQWlCLENBQUMsT0FBTyxFQUFFLFNBQVMsQ0FBQyxVQUFVLEVBQUUsZ0JBQWdCLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDMUcsSUFBSSxDQUFDLGNBQWMsR0FBRyx3QkFBd0IsQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFHLEVBQUUsS0FBSyxFQUFFLEVBQUUsQ0FBQyx3QkFBd0IsQ0FBQyxDQUFDLEtBQUssR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBRTlHLElBQUksQ0FBQyxZQUFZLEdBQUcsbUJBQW1CLENBQUMsT0FBTyxFQUFFLFNBQVMsQ0FBQyxVQUFVLEVBQUUsZ0JBQWdCLENBQUMsV0FBVyxDQUFDLENBQUM7UUFDckcsSUFBSSxDQUFDLFdBQVcsR0FBRyxtQkFBbUIsQ0FBQyxPQUFPLEVBQUUsU0FBUyxDQUFDLFVBQVUsRUFBRSxnQkFBZ0IsQ0FBQyxJQUFJLENBQUMsQ0FBQztLQUM5Rjs7Ozs7SUFFRCxtQkFBbUIsQ0FBQyxPQUFlLElBQVksTUFBTSxDQUFDLElBQUksQ0FBQyxjQUFjLENBQUMsT0FBTyxHQUFHLENBQUMsQ0FBQyxDQUFDLEVBQUU7Ozs7O0lBRXpGLGlCQUFpQixDQUFDLEtBQWEsSUFBWSxNQUFNLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxLQUFLLEdBQUcsQ0FBQyxDQUFDLENBQUMsRUFBRTs7Ozs7SUFFakYsZ0JBQWdCLENBQUMsS0FBYSxJQUFZLE1BQU0sQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLEtBQUssR0FBRyxDQUFDLENBQUMsQ0FBQyxFQUFFOzs7OztJQUUvRSxlQUFlLENBQUMsSUFBbUI7O1FBQ2pDLE1BQU0sTUFBTSxHQUFHLElBQUksSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLEtBQUssR0FBRyxDQUFDLEVBQUUsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQzdELE1BQU0sQ0FBQyxVQUFVLENBQUMsTUFBTSxFQUFFLFVBQVUsRUFBRSxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUM7S0FDckQ7OztZQXpCRixVQUFVOzs7O3lDQU1JLE1BQU0sU0FBQyxTQUFTIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtJbmplY3QsIEluamVjdGFibGUsIExPQ0FMRV9JRH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7Rm9ybVN0eWxlLCBnZXRMb2NhbGVEYXlOYW1lcywgZ2V0TG9jYWxlTW9udGhOYW1lcywgVHJhbnNsYXRpb25XaWR0aCwgZm9ybWF0RGF0ZX0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcclxuaW1wb3J0IHtOZ2JEYXRlU3RydWN0fSBmcm9tICcuL25nYi1kYXRlLXN0cnVjdCc7XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gTkdCX0RBVEVQSUNLRVJfMThOX0ZBQ1RPUlkobG9jYWxlKSB7XHJcbiAgcmV0dXJuIG5ldyBOZ2JEYXRlcGlja2VySTE4bkRlZmF1bHQobG9jYWxlKTtcclxufVxyXG5cclxuLyoqXHJcbiAqIFR5cGUgb2YgdGhlIHNlcnZpY2Ugc3VwcGx5aW5nIG1vbnRoIGFuZCB3ZWVrZGF5IG5hbWVzIHRvIHRvIE5nYkRhdGVwaWNrZXIgY29tcG9uZW50LlxyXG4gKiBUaGUgZGVmYXVsdCBpbXBsZW1lbnRhdGlvbiBvZiB0aGlzIHNlcnZpY2UgaG9ub3JzIHRoZSBBbmd1bGFyIGxvY2FsZSwgYW5kIHVzZXMgdGhlIHJlZ2lzdGVyZWQgbG9jYWxlIGRhdGEsXHJcbiAqIGFzIGV4cGxhaW5lZCBpbiB0aGUgQW5ndWxhciBpMThuIGd1aWRlLlxyXG4gKiBTZWUgdGhlIGkxOG4gZGVtbyBmb3IgaG93IHRvIGV4dGVuZCB0aGlzIGNsYXNzIGFuZCBkZWZpbmUgYSBjdXN0b20gcHJvdmlkZXIgZm9yIGkxOG4uXHJcbiAqL1xyXG5ASW5qZWN0YWJsZSh7cHJvdmlkZWRJbjogJ3Jvb3QnLCB1c2VGYWN0b3J5OiBOR0JfREFURVBJQ0tFUl8xOE5fRkFDVE9SWSwgZGVwczogW0xPQ0FMRV9JRF19KVxyXG5leHBvcnQgYWJzdHJhY3QgY2xhc3MgTmdiRGF0ZXBpY2tlckkxOG4ge1xyXG4gIC8qKlxyXG4gICAqIFJldHVybnMgdGhlIHNob3J0IHdlZWtkYXkgbmFtZSB0byBkaXNwbGF5IGluIHRoZSBoZWFkaW5nIG9mIHRoZSBtb250aCB2aWV3LlxyXG4gICAqIFdpdGggZGVmYXVsdCBjYWxlbmRhciB3ZSB1c2UgSVNPIDg2MDE6ICd3ZWVrZGF5JyBpcyAxPU1vbiAuLi4gNz1TdW5cclxuICAgKi9cclxuICBhYnN0cmFjdCBnZXRXZWVrZGF5U2hvcnROYW1lKHdlZWtkYXk6IG51bWJlcik6IHN0cmluZztcclxuXHJcbiAgLyoqXHJcbiAgICogUmV0dXJucyB0aGUgc2hvcnQgbW9udGggbmFtZSB0byBkaXNwbGF5IGluIHRoZSBkYXRlIHBpY2tlciBuYXZpZ2F0aW9uLlxyXG4gICAqIFdpdGggZGVmYXVsdCBjYWxlbmRhciB3ZSB1c2UgSVNPIDg2MDE6ICdtb250aCcgaXMgMT1KYW4gLi4uIDEyPURlY1xyXG4gICAqL1xyXG4gIGFic3RyYWN0IGdldE1vbnRoU2hvcnROYW1lKG1vbnRoOiBudW1iZXIsIHllYXI/OiBudW1iZXIpOiBzdHJpbmc7XHJcblxyXG4gIC8qKlxyXG4gICAqIFJldHVybnMgdGhlIGZ1bGwgbW9udGggbmFtZSB0byBkaXNwbGF5IGluIHRoZSBkYXRlIHBpY2tlciBuYXZpZ2F0aW9uLlxyXG4gICAqIFdpdGggZGVmYXVsdCBjYWxlbmRhciB3ZSB1c2UgSVNPIDg2MDE6ICdtb250aCcgaXMgMT1KYW51YXJ5IC4uLiAxMj1EZWNlbWJlclxyXG4gICAqL1xyXG4gIGFic3RyYWN0IGdldE1vbnRoRnVsbE5hbWUobW9udGg6IG51bWJlciwgeWVhcj86IG51bWJlcik6IHN0cmluZztcclxuXHJcbiAgLyoqXHJcbiAgICogUmV0dXJucyB0aGUgdmFsdWUgb2YgdGhlICdhcmlhLWxhYmVsJyBhdHRyaWJ1dGUgZm9yIGEgc3BlY2lmaWMgZGF0ZVxyXG4gICAqXHJcbiAgICogQHNpbmNlIDIuMC4wXHJcbiAgICovXHJcbiAgYWJzdHJhY3QgZ2V0RGF5QXJpYUxhYmVsKGRhdGU6IE5nYkRhdGVTdHJ1Y3QpOiBzdHJpbmc7XHJcblxyXG4gIC8qKlxyXG4gICAqIFJldHVybnMgdGhlIHRleHR1YWwgcmVwcmVzZW50YXRpb24gb2YgYSBkYXkgdGhhdCBpcyByZW5kZXJlZCBpbiBhIGRheSBjZWxsXHJcbiAgICpcclxuICAgKiBAc2luY2UgMy4wLjBcclxuICAgKi9cclxuICBnZXREYXlOdW1lcmFscyhkYXRlOiBOZ2JEYXRlU3RydWN0KTogc3RyaW5nIHsgcmV0dXJuIGAke2RhdGUuZGF5fWA7IH1cclxuXHJcbiAgLyoqXHJcbiAgICogUmV0dXJucyB0aGUgdGV4dHVhbCByZXByZXNlbnRhdGlvbiBvZiBhIHdlZWsgbnVtYmVyIHJlbmRlcmVkIGJ5IGRhdGUgcGlja2VyXHJcbiAgICpcclxuICAgKiBAc2luY2UgMy4wLjBcclxuICAgKi9cclxuICBnZXRXZWVrTnVtZXJhbHMod2Vla051bWJlcjogbnVtYmVyKTogc3RyaW5nIHsgcmV0dXJuIGAke3dlZWtOdW1iZXJ9YDsgfVxyXG5cclxuICAvKipcclxuICAgKiBSZXR1cm5zIHRoZSB0ZXh0dWFsIHJlcHJlc2VudGF0aW9uIG9mIGEgeWVhciB0aGF0IGlzIHJlbmRlcmVkXHJcbiAgICogaW4gZGF0ZSBwaWNrZXIgeWVhciBzZWxlY3QgYm94XHJcbiAgICpcclxuICAgKiBAc2luY2UgMy4wLjBcclxuICAgKi9cclxuICBnZXRZZWFyTnVtZXJhbHMoeWVhcjogbnVtYmVyKTogc3RyaW5nIHsgcmV0dXJuIGAke3llYXJ9YDsgfVxyXG59XHJcblxyXG5ASW5qZWN0YWJsZSgpXHJcbmV4cG9ydCBjbGFzcyBOZ2JEYXRlcGlja2VySTE4bkRlZmF1bHQgZXh0ZW5kcyBOZ2JEYXRlcGlja2VySTE4biB7XHJcbiAgcHJpdmF0ZSBfd2Vla2RheXNTaG9ydDogQXJyYXk8c3RyaW5nPjtcclxuICBwcml2YXRlIF9tb250aHNTaG9ydDogQXJyYXk8c3RyaW5nPjtcclxuICBwcml2YXRlIF9tb250aHNGdWxsOiBBcnJheTxzdHJpbmc+O1xyXG5cclxuICBjb25zdHJ1Y3RvcihASW5qZWN0KExPQ0FMRV9JRCkgcHJpdmF0ZSBfbG9jYWxlOiBzdHJpbmcpIHtcclxuICAgIHN1cGVyKCk7XHJcblxyXG4gICAgY29uc3Qgd2Vla2RheXNTdGFydGluZ09uU3VuZGF5ID0gZ2V0TG9jYWxlRGF5TmFtZXMoX2xvY2FsZSwgRm9ybVN0eWxlLlN0YW5kYWxvbmUsIFRyYW5zbGF0aW9uV2lkdGguU2hvcnQpO1xyXG4gICAgdGhpcy5fd2Vla2RheXNTaG9ydCA9IHdlZWtkYXlzU3RhcnRpbmdPblN1bmRheS5tYXAoKGRheSwgaW5kZXgpID0+IHdlZWtkYXlzU3RhcnRpbmdPblN1bmRheVsoaW5kZXggKyAxKSAlIDddKTtcclxuXHJcbiAgICB0aGlzLl9tb250aHNTaG9ydCA9IGdldExvY2FsZU1vbnRoTmFtZXMoX2xvY2FsZSwgRm9ybVN0eWxlLlN0YW5kYWxvbmUsIFRyYW5zbGF0aW9uV2lkdGguQWJicmV2aWF0ZWQpO1xyXG4gICAgdGhpcy5fbW9udGhzRnVsbCA9IGdldExvY2FsZU1vbnRoTmFtZXMoX2xvY2FsZSwgRm9ybVN0eWxlLlN0YW5kYWxvbmUsIFRyYW5zbGF0aW9uV2lkdGguV2lkZSk7XHJcbiAgfVxyXG5cclxuICBnZXRXZWVrZGF5U2hvcnROYW1lKHdlZWtkYXk6IG51bWJlcik6IHN0cmluZyB7IHJldHVybiB0aGlzLl93ZWVrZGF5c1Nob3J0W3dlZWtkYXkgLSAxXTsgfVxyXG5cclxuICBnZXRNb250aFNob3J0TmFtZShtb250aDogbnVtYmVyKTogc3RyaW5nIHsgcmV0dXJuIHRoaXMuX21vbnRoc1Nob3J0W21vbnRoIC0gMV07IH1cclxuXHJcbiAgZ2V0TW9udGhGdWxsTmFtZShtb250aDogbnVtYmVyKTogc3RyaW5nIHsgcmV0dXJuIHRoaXMuX21vbnRoc0Z1bGxbbW9udGggLSAxXTsgfVxyXG5cclxuICBnZXREYXlBcmlhTGFiZWwoZGF0ZTogTmdiRGF0ZVN0cnVjdCk6IHN0cmluZyB7XHJcbiAgICBjb25zdCBqc0RhdGUgPSBuZXcgRGF0ZShkYXRlLnllYXIsIGRhdGUubW9udGggLSAxLCBkYXRlLmRheSk7XHJcbiAgICByZXR1cm4gZm9ybWF0RGF0ZShqc0RhdGUsICdmdWxsRGF0ZScsIHRoaXMuX2xvY2FsZSk7XHJcbiAgfVxyXG59XHJcbiJdfQ==