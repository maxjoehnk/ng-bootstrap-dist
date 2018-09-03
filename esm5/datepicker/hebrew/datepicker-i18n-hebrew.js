/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
import { NgbDatepickerI18n } from '../datepicker-i18n';
import { hebrewNumerals, isHebrewLeapYear } from './hebrew';
import { Injectable } from '@angular/core';
/** @type {?} */
var WEEKDAYS = ['ב׳', 'ג׳', 'ד׳', 'ה׳', 'ו׳', 'ש׳', 'א׳'];
/** @type {?} */
var MONTHS = ['תשרי', 'חשון', 'כסלו', 'טבת', 'שבט', 'אדר', 'ניסן', 'אייר', 'סיון', 'תמוז', 'אב', 'אלול'];
/** @type {?} */
var MONTHS_LEAP = ['תשרי', 'חשון', 'כסלו', 'טבת', 'שבט', 'אדר א׳', 'אדר ב׳', 'ניסן', 'אייר', 'סיון', 'תמוז', 'אב', 'אלול'];
/**
 * \@since 3.2.0
 */
var NgbDatepickerI18nHebrew = /** @class */ (function (_super) {
    tslib_1.__extends(NgbDatepickerI18nHebrew, _super);
    function NgbDatepickerI18nHebrew() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     * @param {?} month
     * @param {?=} year
     * @return {?}
     */
    NgbDatepickerI18nHebrew.prototype.getMonthShortName = /**
     * @param {?} month
     * @param {?=} year
     * @return {?}
     */
    function (month, year) { return this.getMonthFullName(month, year); };
    /**
     * @param {?} month
     * @param {?=} year
     * @return {?}
     */
    NgbDatepickerI18nHebrew.prototype.getMonthFullName = /**
     * @param {?} month
     * @param {?=} year
     * @return {?}
     */
    function (month, year) {
        return isHebrewLeapYear(year) ? MONTHS_LEAP[month - 1] : MONTHS[month - 1];
    };
    /**
     * @param {?} weekday
     * @return {?}
     */
    NgbDatepickerI18nHebrew.prototype.getWeekdayShortName = /**
     * @param {?} weekday
     * @return {?}
     */
    function (weekday) { return WEEKDAYS[weekday - 1]; };
    /**
     * @param {?} date
     * @return {?}
     */
    NgbDatepickerI18nHebrew.prototype.getDayAriaLabel = /**
     * @param {?} date
     * @return {?}
     */
    function (date) {
        return hebrewNumerals(date.day) + " " + this.getMonthFullName(date.month, date.year) + " " + hebrewNumerals(date.year);
    };
    /**
     * @param {?} date
     * @return {?}
     */
    NgbDatepickerI18nHebrew.prototype.getDayNumerals = /**
     * @param {?} date
     * @return {?}
     */
    function (date) { return hebrewNumerals(date.day); };
    /**
     * @param {?} weekNumber
     * @return {?}
     */
    NgbDatepickerI18nHebrew.prototype.getWeekNumerals = /**
     * @param {?} weekNumber
     * @return {?}
     */
    function (weekNumber) { return hebrewNumerals(weekNumber); };
    /**
     * @param {?} year
     * @return {?}
     */
    NgbDatepickerI18nHebrew.prototype.getYearNumerals = /**
     * @param {?} year
     * @return {?}
     */
    function (year) { return hebrewNumerals(year); };
    NgbDatepickerI18nHebrew.decorators = [
        { type: Injectable },
    ];
    return NgbDatepickerI18nHebrew;
}(NgbDatepickerI18n));
export { NgbDatepickerI18nHebrew };

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0ZXBpY2tlci1pMThuLWhlYnJldy5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BuZy1ib290c3RyYXAvbmctYm9vdHN0cmFwLyIsInNvdXJjZXMiOlsiZGF0ZXBpY2tlci9oZWJyZXcvZGF0ZXBpY2tlci1pMThuLWhlYnJldy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLE9BQU8sRUFBQyxpQkFBaUIsRUFBQyxNQUFNLG9CQUFvQixDQUFDO0FBRXJELE9BQU8sRUFBQyxjQUFjLEVBQUUsZ0JBQWdCLEVBQUMsTUFBTSxVQUFVLENBQUM7QUFDMUQsT0FBTyxFQUFDLFVBQVUsRUFBQyxNQUFNLGVBQWUsQ0FBQzs7QUFHekMsSUFBTSxRQUFRLEdBQUcsQ0FBQyxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLENBQUMsQ0FBQzs7QUFDNUQsSUFBTSxNQUFNLEdBQUcsQ0FBQyxNQUFNLEVBQUUsTUFBTSxFQUFFLE1BQU0sRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRSxNQUFNLEVBQUUsTUFBTSxFQUFFLE1BQU0sRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLE1BQU0sQ0FBQyxDQUFDOztBQUMzRyxJQUFNLFdBQVcsR0FDYixDQUFDLE1BQU0sRUFBRSxNQUFNLEVBQUUsTUFBTSxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUUsUUFBUSxFQUFFLFFBQVEsRUFBRSxNQUFNLEVBQUUsTUFBTSxFQUFFLE1BQU0sRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLE1BQU0sQ0FBQyxDQUFDOzs7OztJQU1oRSxtREFBaUI7Ozs7Ozs7OztJQUM1RCxtREFBaUI7Ozs7O0lBQWpCLFVBQWtCLEtBQWEsRUFBRSxJQUFhLElBQVksTUFBTSxDQUFDLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxLQUFLLEVBQUUsSUFBSSxDQUFDLENBQUMsRUFBRTs7Ozs7O0lBRXRHLGtEQUFnQjs7Ozs7SUFBaEIsVUFBaUIsS0FBYSxFQUFFLElBQWE7UUFDM0MsTUFBTSxDQUFDLGdCQUFnQixDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxXQUFXLENBQUMsS0FBSyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsS0FBSyxHQUFHLENBQUMsQ0FBQyxDQUFDO0tBQzVFOzs7OztJQUVELHFEQUFtQjs7OztJQUFuQixVQUFvQixPQUFlLElBQVksTUFBTSxDQUFDLFFBQVEsQ0FBQyxPQUFPLEdBQUcsQ0FBQyxDQUFDLENBQUMsRUFBRTs7Ozs7SUFFOUUsaURBQWU7Ozs7SUFBZixVQUFnQixJQUFtQjtRQUNqQyxNQUFNLENBQUksY0FBYyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsU0FBSSxJQUFJLENBQUMsZ0JBQWdCLENBQUMsSUFBSSxDQUFDLEtBQUssRUFBRSxJQUFJLENBQUMsSUFBSSxDQUFDLFNBQUksY0FBYyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUcsQ0FBQztLQUNuSDs7Ozs7SUFFRCxnREFBYzs7OztJQUFkLFVBQWUsSUFBbUIsSUFBWSxNQUFNLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxFQUFFOzs7OztJQUVoRixpREFBZTs7OztJQUFmLFVBQWdCLFVBQWtCLElBQVksTUFBTSxDQUFDLGNBQWMsQ0FBQyxVQUFVLENBQUMsQ0FBQyxFQUFFOzs7OztJQUVsRixpREFBZTs7OztJQUFmLFVBQWdCLElBQVksSUFBWSxNQUFNLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxDQUFDLEVBQUU7O2dCQWxCdkUsVUFBVTs7a0NBZFg7RUFlNkMsaUJBQWlCO1NBQWpELHVCQUF1QiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7TmdiRGF0ZXBpY2tlckkxOG59IGZyb20gJy4uL2RhdGVwaWNrZXItaTE4bic7XHJcbmltcG9ydCB7TmdiRGF0ZVN0cnVjdH0gZnJvbSAnLi4vLi4vaW5kZXgnO1xyXG5pbXBvcnQge2hlYnJld051bWVyYWxzLCBpc0hlYnJld0xlYXBZZWFyfSBmcm9tICcuL2hlYnJldyc7XHJcbmltcG9ydCB7SW5qZWN0YWJsZX0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcblxyXG5cclxuY29uc3QgV0VFS0RBWVMgPSBbJ9eR17MnLCAn15LXsycsICfXk9ezJywgJ9eU17MnLCAn15XXsycsICfXqdezJywgJ9eQ17MnXTtcclxuY29uc3QgTU9OVEhTID0gWyfXqtep16jXmScsICfXl9ep15XXnycsICfXm9eh15zXlScsICfXmNeR16onLCAn16nXkdeYJywgJ9eQ15PXqCcsICfXoNeZ16HXnycsICfXkNeZ15nXqCcsICfXodeZ15XXnycsICfXqtee15XXlicsICfXkNeRJywgJ9eQ15zXldecJ107XHJcbmNvbnN0IE1PTlRIU19MRUFQID1cclxuICAgIFsn16rXqdeo15knLCAn15fXqdeV158nLCAn15vXodec15UnLCAn15jXkdeqJywgJ9ep15HXmCcsICfXkNeT16gg15DXsycsICfXkNeT16gg15HXsycsICfXoNeZ16HXnycsICfXkNeZ15nXqCcsICfXodeZ15XXnycsICfXqtee15XXlicsICfXkNeRJywgJ9eQ15zXldecJ107XHJcblxyXG4vKipcclxuICogQHNpbmNlIDMuMi4wXHJcbiAqL1xyXG5ASW5qZWN0YWJsZSgpXHJcbmV4cG9ydCBjbGFzcyBOZ2JEYXRlcGlja2VySTE4bkhlYnJldyBleHRlbmRzIE5nYkRhdGVwaWNrZXJJMThuIHtcclxuICBnZXRNb250aFNob3J0TmFtZShtb250aDogbnVtYmVyLCB5ZWFyPzogbnVtYmVyKTogc3RyaW5nIHsgcmV0dXJuIHRoaXMuZ2V0TW9udGhGdWxsTmFtZShtb250aCwgeWVhcik7IH1cclxuXHJcbiAgZ2V0TW9udGhGdWxsTmFtZShtb250aDogbnVtYmVyLCB5ZWFyPzogbnVtYmVyKTogc3RyaW5nIHtcclxuICAgIHJldHVybiBpc0hlYnJld0xlYXBZZWFyKHllYXIpID8gTU9OVEhTX0xFQVBbbW9udGggLSAxXSA6IE1PTlRIU1ttb250aCAtIDFdO1xyXG4gIH1cclxuXHJcbiAgZ2V0V2Vla2RheVNob3J0TmFtZSh3ZWVrZGF5OiBudW1iZXIpOiBzdHJpbmcgeyByZXR1cm4gV0VFS0RBWVNbd2Vla2RheSAtIDFdOyB9XHJcblxyXG4gIGdldERheUFyaWFMYWJlbChkYXRlOiBOZ2JEYXRlU3RydWN0KTogc3RyaW5nIHtcclxuICAgIHJldHVybiBgJHtoZWJyZXdOdW1lcmFscyhkYXRlLmRheSl9ICR7dGhpcy5nZXRNb250aEZ1bGxOYW1lKGRhdGUubW9udGgsIGRhdGUueWVhcil9ICR7aGVicmV3TnVtZXJhbHMoZGF0ZS55ZWFyKX1gO1xyXG4gIH1cclxuXHJcbiAgZ2V0RGF5TnVtZXJhbHMoZGF0ZTogTmdiRGF0ZVN0cnVjdCk6IHN0cmluZyB7IHJldHVybiBoZWJyZXdOdW1lcmFscyhkYXRlLmRheSk7IH1cclxuXHJcbiAgZ2V0V2Vla051bWVyYWxzKHdlZWtOdW1iZXI6IG51bWJlcik6IHN0cmluZyB7IHJldHVybiBoZWJyZXdOdW1lcmFscyh3ZWVrTnVtYmVyKTsgfVxyXG5cclxuICBnZXRZZWFyTnVtZXJhbHMoeWVhcjogbnVtYmVyKTogc3RyaW5nIHsgcmV0dXJuIGhlYnJld051bWVyYWxzKHllYXIpOyB9XHJcbn1cclxuIl19