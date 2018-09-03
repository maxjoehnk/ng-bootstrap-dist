/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { NgbDatepickerI18n } from '../datepicker-i18n';
import { hebrewNumerals, isHebrewLeapYear } from './hebrew';
import { Injectable } from '@angular/core';
/** @type {?} */
const WEEKDAYS = ['ב׳', 'ג׳', 'ד׳', 'ה׳', 'ו׳', 'ש׳', 'א׳'];
/** @type {?} */
const MONTHS = ['תשרי', 'חשון', 'כסלו', 'טבת', 'שבט', 'אדר', 'ניסן', 'אייר', 'סיון', 'תמוז', 'אב', 'אלול'];
/** @type {?} */
const MONTHS_LEAP = ['תשרי', 'חשון', 'כסלו', 'טבת', 'שבט', 'אדר א׳', 'אדר ב׳', 'ניסן', 'אייר', 'סיון', 'תמוז', 'אב', 'אלול'];
/**
 * \@since 3.2.0
 */
export class NgbDatepickerI18nHebrew extends NgbDatepickerI18n {
    /**
     * @param {?} month
     * @param {?=} year
     * @return {?}
     */
    getMonthShortName(month, year) { return this.getMonthFullName(month, year); }
    /**
     * @param {?} month
     * @param {?=} year
     * @return {?}
     */
    getMonthFullName(month, year) {
        return isHebrewLeapYear(year) ? MONTHS_LEAP[month - 1] : MONTHS[month - 1];
    }
    /**
     * @param {?} weekday
     * @return {?}
     */
    getWeekdayShortName(weekday) { return WEEKDAYS[weekday - 1]; }
    /**
     * @param {?} date
     * @return {?}
     */
    getDayAriaLabel(date) {
        return `${hebrewNumerals(date.day)} ${this.getMonthFullName(date.month, date.year)} ${hebrewNumerals(date.year)}`;
    }
    /**
     * @param {?} date
     * @return {?}
     */
    getDayNumerals(date) { return hebrewNumerals(date.day); }
    /**
     * @param {?} weekNumber
     * @return {?}
     */
    getWeekNumerals(weekNumber) { return hebrewNumerals(weekNumber); }
    /**
     * @param {?} year
     * @return {?}
     */
    getYearNumerals(year) { return hebrewNumerals(year); }
}
NgbDatepickerI18nHebrew.decorators = [
    { type: Injectable },
];

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0ZXBpY2tlci1pMThuLWhlYnJldy5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BuZy1ib290c3RyYXAvbmctYm9vdHN0cmFwLyIsInNvdXJjZXMiOlsiZGF0ZXBpY2tlci9oZWJyZXcvZGF0ZXBpY2tlci1pMThuLWhlYnJldy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFDLGlCQUFpQixFQUFDLE1BQU0sb0JBQW9CLENBQUM7QUFFckQsT0FBTyxFQUFDLGNBQWMsRUFBRSxnQkFBZ0IsRUFBQyxNQUFNLFVBQVUsQ0FBQztBQUMxRCxPQUFPLEVBQUMsVUFBVSxFQUFDLE1BQU0sZUFBZSxDQUFDOztBQUd6QyxNQUFNLFFBQVEsR0FBRyxDQUFDLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksQ0FBQyxDQUFDOztBQUM1RCxNQUFNLE1BQU0sR0FBRyxDQUFDLE1BQU0sRUFBRSxNQUFNLEVBQUUsTUFBTSxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLE1BQU0sRUFBRSxNQUFNLEVBQUUsTUFBTSxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsTUFBTSxDQUFDLENBQUM7O0FBQzNHLE1BQU0sV0FBVyxHQUNiLENBQUMsTUFBTSxFQUFFLE1BQU0sRUFBRSxNQUFNLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRSxRQUFRLEVBQUUsUUFBUSxFQUFFLE1BQU0sRUFBRSxNQUFNLEVBQUUsTUFBTSxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsTUFBTSxDQUFDLENBQUM7Ozs7QUFNN0csTUFBTSw4QkFBK0IsU0FBUSxpQkFBaUI7Ozs7OztJQUM1RCxpQkFBaUIsQ0FBQyxLQUFhLEVBQUUsSUFBYSxJQUFZLE1BQU0sQ0FBQyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsS0FBSyxFQUFFLElBQUksQ0FBQyxDQUFDLEVBQUU7Ozs7OztJQUV0RyxnQkFBZ0IsQ0FBQyxLQUFhLEVBQUUsSUFBYTtRQUMzQyxNQUFNLENBQUMsZ0JBQWdCLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLFdBQVcsQ0FBQyxLQUFLLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxLQUFLLEdBQUcsQ0FBQyxDQUFDLENBQUM7S0FDNUU7Ozs7O0lBRUQsbUJBQW1CLENBQUMsT0FBZSxJQUFZLE1BQU0sQ0FBQyxRQUFRLENBQUMsT0FBTyxHQUFHLENBQUMsQ0FBQyxDQUFDLEVBQUU7Ozs7O0lBRTlFLGVBQWUsQ0FBQyxJQUFtQjtRQUNqQyxNQUFNLENBQUMsR0FBRyxjQUFjLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxJQUFJLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxJQUFJLENBQUMsS0FBSyxFQUFFLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxjQUFjLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUM7S0FDbkg7Ozs7O0lBRUQsY0FBYyxDQUFDLElBQW1CLElBQVksTUFBTSxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsRUFBRTs7Ozs7SUFFaEYsZUFBZSxDQUFDLFVBQWtCLElBQVksTUFBTSxDQUFDLGNBQWMsQ0FBQyxVQUFVLENBQUMsQ0FBQyxFQUFFOzs7OztJQUVsRixlQUFlLENBQUMsSUFBWSxJQUFZLE1BQU0sQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLENBQUMsRUFBRTs7O1lBbEJ2RSxVQUFVIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtOZ2JEYXRlcGlja2VySTE4bn0gZnJvbSAnLi4vZGF0ZXBpY2tlci1pMThuJztcclxuaW1wb3J0IHtOZ2JEYXRlU3RydWN0fSBmcm9tICcuLi8uLi9pbmRleCc7XHJcbmltcG9ydCB7aGVicmV3TnVtZXJhbHMsIGlzSGVicmV3TGVhcFllYXJ9IGZyb20gJy4vaGVicmV3JztcclxuaW1wb3J0IHtJbmplY3RhYmxlfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuXHJcblxyXG5jb25zdCBXRUVLREFZUyA9IFsn15HXsycsICfXktezJywgJ9eT17MnLCAn15TXsycsICfXldezJywgJ9ep17MnLCAn15DXsyddO1xyXG5jb25zdCBNT05USFMgPSBbJ9eq16nXqNeZJywgJ9eX16nXldefJywgJ9eb16HXnNeVJywgJ9eY15HXqicsICfXqdeR15gnLCAn15DXk9eoJywgJ9eg15nXodefJywgJ9eQ15nXmdeoJywgJ9eh15nXldefJywgJ9eq157XldeWJywgJ9eQ15EnLCAn15DXnNeV15wnXTtcclxuY29uc3QgTU9OVEhTX0xFQVAgPVxyXG4gICAgWyfXqtep16jXmScsICfXl9ep15XXnycsICfXm9eh15zXlScsICfXmNeR16onLCAn16nXkdeYJywgJ9eQ15PXqCDXkNezJywgJ9eQ15PXqCDXkdezJywgJ9eg15nXodefJywgJ9eQ15nXmdeoJywgJ9eh15nXldefJywgJ9eq157XldeWJywgJ9eQ15EnLCAn15DXnNeV15wnXTtcclxuXHJcbi8qKlxyXG4gKiBAc2luY2UgMy4yLjBcclxuICovXHJcbkBJbmplY3RhYmxlKClcclxuZXhwb3J0IGNsYXNzIE5nYkRhdGVwaWNrZXJJMThuSGVicmV3IGV4dGVuZHMgTmdiRGF0ZXBpY2tlckkxOG4ge1xyXG4gIGdldE1vbnRoU2hvcnROYW1lKG1vbnRoOiBudW1iZXIsIHllYXI/OiBudW1iZXIpOiBzdHJpbmcgeyByZXR1cm4gdGhpcy5nZXRNb250aEZ1bGxOYW1lKG1vbnRoLCB5ZWFyKTsgfVxyXG5cclxuICBnZXRNb250aEZ1bGxOYW1lKG1vbnRoOiBudW1iZXIsIHllYXI/OiBudW1iZXIpOiBzdHJpbmcge1xyXG4gICAgcmV0dXJuIGlzSGVicmV3TGVhcFllYXIoeWVhcikgPyBNT05USFNfTEVBUFttb250aCAtIDFdIDogTU9OVEhTW21vbnRoIC0gMV07XHJcbiAgfVxyXG5cclxuICBnZXRXZWVrZGF5U2hvcnROYW1lKHdlZWtkYXk6IG51bWJlcik6IHN0cmluZyB7IHJldHVybiBXRUVLREFZU1t3ZWVrZGF5IC0gMV07IH1cclxuXHJcbiAgZ2V0RGF5QXJpYUxhYmVsKGRhdGU6IE5nYkRhdGVTdHJ1Y3QpOiBzdHJpbmcge1xyXG4gICAgcmV0dXJuIGAke2hlYnJld051bWVyYWxzKGRhdGUuZGF5KX0gJHt0aGlzLmdldE1vbnRoRnVsbE5hbWUoZGF0ZS5tb250aCwgZGF0ZS55ZWFyKX0gJHtoZWJyZXdOdW1lcmFscyhkYXRlLnllYXIpfWA7XHJcbiAgfVxyXG5cclxuICBnZXREYXlOdW1lcmFscyhkYXRlOiBOZ2JEYXRlU3RydWN0KTogc3RyaW5nIHsgcmV0dXJuIGhlYnJld051bWVyYWxzKGRhdGUuZGF5KTsgfVxyXG5cclxuICBnZXRXZWVrTnVtZXJhbHMod2Vla051bWJlcjogbnVtYmVyKTogc3RyaW5nIHsgcmV0dXJuIGhlYnJld051bWVyYWxzKHdlZWtOdW1iZXIpOyB9XHJcblxyXG4gIGdldFllYXJOdW1lcmFscyh5ZWFyOiBudW1iZXIpOiBzdHJpbmcgeyByZXR1cm4gaGVicmV3TnVtZXJhbHMoeWVhcik7IH1cclxufVxyXG4iXX0=