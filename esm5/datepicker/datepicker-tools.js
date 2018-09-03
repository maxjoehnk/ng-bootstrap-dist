/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { NgbDate } from './ngb-date';
import { isDefined } from '../util/util';
/**
 * @param {?} prev
 * @param {?} next
 * @return {?}
 */
export function isChangedDate(prev, next) {
    return !dateComparator(prev, next);
}
/**
 * @param {?} prev
 * @param {?} next
 * @return {?}
 */
export function dateComparator(prev, next) {
    return (!prev && !next) || (!!prev && !!next && prev.equals(next));
}
/**
 * @param {?} minDate
 * @param {?} maxDate
 * @return {?}
 */
export function checkMinBeforeMax(minDate, maxDate) {
    if (maxDate && minDate && maxDate.before(minDate)) {
        throw new Error("'maxDate' " + maxDate + " should be greater than 'minDate' " + minDate);
    }
}
/**
 * @param {?} date
 * @param {?} minDate
 * @param {?} maxDate
 * @return {?}
 */
export function checkDateInRange(date, minDate, maxDate) {
    if (date && minDate && date.before(minDate)) {
        return minDate;
    }
    if (date && maxDate && date.after(maxDate)) {
        return maxDate;
    }
    return date;
}
/**
 * @param {?} date
 * @param {?} state
 * @return {?}
 */
export function isDateSelectable(date, state) {
    var minDate = state.minDate, maxDate = state.maxDate, disabled = state.disabled, markDisabled = state.markDisabled;
    // clang-format off
    return !(!isDefined(date) ||
        disabled ||
        (markDisabled && markDisabled(date, { year: date.year, month: date.month })) ||
        (minDate && date.before(minDate)) ||
        (maxDate && date.after(maxDate)));
    // clang-format on
}
/**
 * @param {?} calendar
 * @param {?} date
 * @param {?} minDate
 * @param {?} maxDate
 * @return {?}
 */
export function generateSelectBoxMonths(calendar, date, minDate, maxDate) {
    if (!date) {
        return [];
    }
    /** @type {?} */
    var months = calendar.getMonths(date.year);
    if (minDate && date.year === minDate.year) {
        /** @type {?} */
        var index = months.findIndex(function (month) { return month === minDate.month; });
        months = months.slice(index);
    }
    if (maxDate && date.year === maxDate.year) {
        /** @type {?} */
        var index = months.findIndex(function (month) { return month === maxDate.month; });
        months = months.slice(0, index + 1);
    }
    return months;
}
/**
 * @param {?} date
 * @param {?} minDate
 * @param {?} maxDate
 * @return {?}
 */
export function generateSelectBoxYears(date, minDate, maxDate) {
    if (!date) {
        return [];
    }
    /** @type {?} */
    var start = minDate && minDate.year || date.year - 10;
    /** @type {?} */
    var end = maxDate && maxDate.year || date.year + 10;
    return Array.from({ length: end - start + 1 }, function (e, i) { return start + i; });
}
/**
 * @param {?} calendar
 * @param {?} date
 * @param {?} maxDate
 * @return {?}
 */
export function nextMonthDisabled(calendar, date, maxDate) {
    return maxDate && calendar.getNext(date, 'm').after(maxDate);
}
/**
 * @param {?} calendar
 * @param {?} date
 * @param {?} minDate
 * @return {?}
 */
export function prevMonthDisabled(calendar, date, minDate) {
    /** @type {?} */
    var prevDate = calendar.getPrev(date, 'm');
    return minDate && (prevDate.year === minDate.year && prevDate.month < minDate.month ||
        prevDate.year < minDate.year && minDate.month === 1);
}
/**
 * @param {?} calendar
 * @param {?} date
 * @param {?} state
 * @param {?} i18n
 * @param {?} force
 * @return {?}
 */
export function buildMonths(calendar, date, state, i18n, force) {
    var displayMonths = state.displayMonths, months = state.months;
    /** @type {?} */
    var monthsToReuse = months.splice(0, months.length);
    /** @type {?} */
    var firstDates = Array.from({ length: displayMonths }, function (_, i) {
        /** @type {?} */
        var firstDate = calendar.getNext(date, 'm', i);
        months[i] = null;
        if (!force) {
            /** @type {?} */
            var reusedIndex = monthsToReuse.findIndex(function (month) { return month.firstDate.equals(firstDate); });
            // move reused month back to months
            if (reusedIndex !== -1) {
                months[i] = monthsToReuse.splice(reusedIndex, 1)[0];
            }
        }
        return firstDate;
    });
    // rebuild nullified months
    firstDates.forEach(function (firstDate, i) {
        if (months[i] === null) {
            months[i] = buildMonth(calendar, firstDate, state, i18n, monthsToReuse.shift() || /** @type {?} */ ({}));
        }
    });
    return months;
}
/**
 * @param {?} calendar
 * @param {?} date
 * @param {?} state
 * @param {?} i18n
 * @param {?=} month
 * @return {?}
 */
export function buildMonth(calendar, date, state, i18n, month) {
    if (month === void 0) { month = /** @type {?} */ ({}); }
    var minDate = state.minDate, maxDate = state.maxDate, firstDayOfWeek = state.firstDayOfWeek, markDisabled = state.markDisabled, outsideDays = state.outsideDays;
    month.firstDate = null;
    month.lastDate = null;
    month.number = date.month;
    month.year = date.year;
    month.weeks = month.weeks || [];
    month.weekdays = month.weekdays || [];
    date = getFirstViewDate(calendar, date, firstDayOfWeek);
    // month has weeks
    for (var week = 0; week < calendar.getWeeksPerMonth(); week++) {
        /** @type {?} */
        var weekObject = month.weeks[week];
        if (!weekObject) {
            weekObject = month.weeks[week] = { number: 0, days: [], collapsed: true };
        }
        /** @type {?} */
        var days = weekObject.days;
        // week has days
        for (var day = 0; day < calendar.getDaysPerWeek(); day++) {
            if (week === 0) {
                month.weekdays[day] = calendar.getWeekday(date);
            }
            /** @type {?} */
            var newDate = new NgbDate(date.year, date.month, date.day);
            /** @type {?} */
            var nextDate = calendar.getNext(newDate);
            /** @type {?} */
            var ariaLabel = i18n.getDayAriaLabel(newDate);
            /** @type {?} */
            var disabled = !!((minDate && newDate.before(minDate)) || (maxDate && newDate.after(maxDate)));
            if (!disabled && markDisabled) {
                disabled = markDisabled(newDate, { month: month.number, year: month.year });
            }
            // saving first date of the month
            if (month.firstDate === null && newDate.month === month.number) {
                month.firstDate = newDate;
            }
            // saving last date of the month
            if (newDate.month === month.number && nextDate.month !== month.number) {
                month.lastDate = newDate;
            }
            /** @type {?} */
            var dayObject = days[day];
            if (!dayObject) {
                dayObject = days[day] = /** @type {?} */ ({});
            }
            dayObject.date = newDate;
            dayObject.context = Object.assign(dayObject.context || {}, { date: newDate, currentMonth: month.number, disabled: disabled, focused: false, selected: false });
            dayObject.tabindex = -1;
            dayObject.ariaLabel = ariaLabel;
            dayObject.hidden = false;
            date = nextDate;
        }
        weekObject.number = calendar.getWeekNumber(days.map(function (day) { return day.date; }), firstDayOfWeek);
        // marking week as collapsed
        weekObject.collapsed = outsideDays === 'collapsed' && days[0].date.month !== month.number &&
            days[days.length - 1].date.month !== month.number;
    }
    return month;
}
/**
 * @param {?} calendar
 * @param {?} date
 * @param {?} firstDayOfWeek
 * @return {?}
 */
export function getFirstViewDate(calendar, date, firstDayOfWeek) {
    /** @type {?} */
    var daysPerWeek = calendar.getDaysPerWeek();
    /** @type {?} */
    var firstMonthDate = new NgbDate(date.year, date.month, 1);
    /** @type {?} */
    var dayOfWeek = calendar.getWeekday(firstMonthDate) % daysPerWeek;
    return calendar.getPrev(firstMonthDate, 'd', (daysPerWeek + dayOfWeek - firstDayOfWeek) % daysPerWeek);
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0ZXBpY2tlci10b29scy5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BuZy1ib290c3RyYXAvbmctYm9vdHN0cmFwLyIsInNvdXJjZXMiOlsiZGF0ZXBpY2tlci9kYXRlcGlja2VyLXRvb2xzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUMsT0FBTyxFQUFDLE1BQU0sWUFBWSxDQUFDO0FBR25DLE9BQU8sRUFBQyxTQUFTLEVBQUMsTUFBTSxjQUFjLENBQUM7Ozs7OztBQUd2QyxNQUFNLHdCQUF3QixJQUFhLEVBQUUsSUFBYTtJQUN4RCxNQUFNLENBQUMsQ0FBQyxjQUFjLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxDQUFDO0NBQ3BDOzs7Ozs7QUFFRCxNQUFNLHlCQUF5QixJQUFhLEVBQUUsSUFBYTtJQUN6RCxNQUFNLENBQUMsQ0FBQyxDQUFDLElBQUksSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLElBQUksSUFBSSxDQUFDLENBQUMsSUFBSSxJQUFJLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztDQUNwRTs7Ozs7O0FBRUQsTUFBTSw0QkFBNEIsT0FBZ0IsRUFBRSxPQUFnQjtJQUNsRSxFQUFFLENBQUMsQ0FBQyxPQUFPLElBQUksT0FBTyxJQUFJLE9BQU8sQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ2xELE1BQU0sSUFBSSxLQUFLLENBQUMsZUFBYSxPQUFPLDBDQUFxQyxPQUFTLENBQUMsQ0FBQztLQUNyRjtDQUNGOzs7Ozs7O0FBRUQsTUFBTSwyQkFBMkIsSUFBYSxFQUFFLE9BQWdCLEVBQUUsT0FBZ0I7SUFDaEYsRUFBRSxDQUFDLENBQUMsSUFBSSxJQUFJLE9BQU8sSUFBSSxJQUFJLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUM1QyxNQUFNLENBQUMsT0FBTyxDQUFDO0tBQ2hCO0lBQ0QsRUFBRSxD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SUFDN0QsSUFBTSxTQUFTLEdBQUcsUUFBUSxDQUFDLFVBQVUsQ0FBQyxjQUFjLENBQUMsR0FBRyxXQUFXLENBQUM7SUFDcEUsTUFBTSxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsY0FBYyxFQUFFLEdBQUcsRUFBRSxDQUFDLFdBQVcsR0FBRyxTQUFTLEdBQUcsY0FBYyxDQUFDLEdBQUcsV0FBVyxDQUFDLENBQUM7Q0FDeEciLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge05nYkRhdGV9IGZyb20gJy4vbmdiLWRhdGUnO1xyXG5pbXBvcnQge0RhdGVwaWNrZXJWaWV3TW9kZWwsIERheVZpZXdNb2RlbCwgTW9udGhWaWV3TW9kZWx9IGZyb20gJy4vZGF0ZXBpY2tlci12aWV3LW1vZGVsJztcclxuaW1wb3J0IHtOZ2JDYWxlbmRhcn0gZnJvbSAnLi9uZ2ItY2FsZW5kYXInO1xyXG5pbXBvcnQge2lzRGVmaW5lZH0gZnJvbSAnLi4vdXRpbC91dGlsJztcclxuaW1wb3J0IHtOZ2JEYXRlcGlja2VySTE4bn0gZnJvbSAnLi9kYXRlcGlja2VyLWkxOG4nO1xyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGlzQ2hhbmdlZERhdGUocHJldjogTmdiRGF0ZSwgbmV4dDogTmdiRGF0ZSkge1xyXG4gIHJldHVybiAhZGF0ZUNvbXBhcmF0b3IocHJldiwgbmV4dCk7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBkYXRlQ29tcGFyYXRvcihwcmV2OiBOZ2JEYXRlLCBuZXh0OiBOZ2JEYXRlKSB7XHJcbiAgcmV0dXJuICghcHJldiAmJiAhbmV4dCkgfHwgKCEhcHJldiAmJiAhIW5leHQgJiYgcHJldi5lcXVhbHMobmV4dCkpO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gY2hlY2tNaW5CZWZvcmVNYXgobWluRGF0ZTogTmdiRGF0ZSwgbWF4RGF0ZTogTmdiRGF0ZSkge1xyXG4gIGlmIChtYXhEYXRlICYmIG1pbkRhdGUgJiYgbWF4RGF0ZS5iZWZvcmUobWluRGF0ZSkpIHtcclxuICAgIHRocm93IG5ldyBFcnJvcihgJ21heERhdGUnICR7bWF4RGF0ZX0gc2hvdWxkIGJlIGdyZWF0ZXIgdGhhbiAnbWluRGF0ZScgJHttaW5EYXRlfWApO1xyXG4gIH1cclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGNoZWNrRGF0ZUluUmFuZ2UoZGF0ZTogTmdiRGF0ZSwgbWluRGF0ZTogTmdiRGF0ZSwgbWF4RGF0ZTogTmdiRGF0ZSk6IE5nYkRhdGUge1xyXG4gIGlmIChkYXRlICYmIG1pbkRhdGUgJiYgZGF0ZS5iZWZvcmUobWluRGF0ZSkpIHtcclxuICAgIHJldHVybiBtaW5EYXRlO1xyXG4gIH1cclxuICBpZiAoZGF0ZSAmJiBtYXhEYXRlICYmIGRhdGUuYWZ0ZXIobWF4RGF0ZSkpIHtcclxuICAgIHJldHVybiBtYXhEYXRlO1xyXG4gIH1cclxuXHJcbiAgcmV0dXJuIGRhdGU7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBpc0RhdGVTZWxlY3RhYmxlKGRhdGU6IE5nYkRhdGUsIHN0YXRlOiBEYXRlcGlja2VyVmlld01vZGVsKSB7XHJcbiAgY29uc3Qge21pbkRhdGUsIG1heERhdGUsIGRpc2FibGVkLCBtYXJrRGlzYWJsZWR9ID0gc3RhdGU7XHJcbiAgLy8gY2xhbmctZm9ybWF0IG9mZlxyXG4gIHJldHVybiAhKFxyXG4gICAgIWlzRGVmaW5lZChkYXRlKSB8fFxyXG4gICAgZGlzYWJsZWQgfHxcclxuICAgIChtYXJrRGlzYWJsZWQgJiYgbWFya0Rpc2FibGVkKGRhdGUsIHt5ZWFyOiBkYXRlLnllYXIsIG1vbnRoOiBkYXRlLm1vbnRofSkpIHx8XHJcbiAgICAobWluRGF0ZSAmJiBkYXRlLmJlZm9yZShtaW5EYXRlKSkgfHxcclxuICAgIChtYXhEYXRlICYmIGRhdGUuYWZ0ZXIobWF4RGF0ZSkpXHJcbiAgKTtcclxuICAvLyBjbGFuZy1mb3JtYXQgb25cclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGdlbmVyYXRlU2VsZWN0Qm94TW9udGhzKGNhbGVuZGFyOiBOZ2JDYWxlbmRhciwgZGF0ZTogTmdiRGF0ZSwgbWluRGF0ZTogTmdiRGF0ZSwgbWF4RGF0ZTogTmdiRGF0ZSkge1xyXG4gIGlmICghZGF0ZSkge1xyXG4gICAgcmV0dXJuIFtdO1xyXG4gIH1cclxuXHJcbiAgbGV0IG1vbnRocyA9IGNhbGVuZGFyLmdldE1vbnRocyhkYXRlLnllYXIpO1xyXG5cclxuICBpZiAobWluRGF0ZSAmJiBkYXRlLnllYXIgPT09IG1pbkRhdGUueWVhcikge1xyXG4gICAgY29uc3QgaW5kZXggPSBtb250aHMuZmluZEluZGV4KG1vbnRoID0+IG1vbnRoID09PSBtaW5EYXRlLm1vbnRoKTtcclxuICAgIG1vbnRocyA9IG1vbnRocy5zbGljZShpbmRleCk7XHJcbiAgfVxyXG5cclxuICBpZiAobWF4RGF0ZSAmJiBkYXRlLnllYXIgPT09IG1heERhdGUueWVhcikge1xyXG4gICAgY29uc3QgaW5kZXggPSBtb250aHMuZmluZEluZGV4KG1vbnRoID0+IG1vbnRoID09PSBtYXhEYXRlLm1vbnRoKTtcclxuICAgIG1vbnRocyA9IG1vbnRocy5zbGljZSgwLCBpbmRleCArIDEpO1xyXG4gIH1cclxuXHJcbiAgcmV0dXJuIG1vbnRocztcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGdlbmVyYXRlU2VsZWN0Qm94WWVhcnMoZGF0ZTogTmdiRGF0ZSwgbWluRGF0ZTogTmdiRGF0ZSwgbWF4RGF0ZTogTmdiRGF0ZSkge1xyXG4gIGlmICghZGF0ZSkge1xyXG4gICAgcmV0dXJuIFtdO1xyXG4gIH1cclxuXHJcbiAgY29uc3Qgc3RhcnQgPSBtaW5EYXRlICYmIG1pbkRhdGUueWVhciB8fCBkYXRlLnllYXIgLSAxMDtcclxuICBjb25zdCBlbmQgPSBtYXhEYXRlICYmIG1heERhdGUueWVhciB8fCBkYXRlLnllYXIgKyAxMDtcclxuXHJcbiAgcmV0dXJuIEFycmF5LmZyb20oe2xlbmd0aDogZW5kIC0gc3RhcnQgKyAxfSwgKGUsIGkpID0+IHN0YXJ0ICsgaSk7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBuZXh0TW9udGhEaXNhYmxlZChjYWxlbmRhcjogTmdiQ2FsZW5kYXIsIGRhdGU6IE5nYkRhdGUsIG1heERhdGU6IE5nYkRhdGUpIHtcclxuICByZXR1cm4gbWF4RGF0ZSAmJiBjYWxlbmRhci5nZXROZXh0KGRhdGUsICdtJykuYWZ0ZXIobWF4RGF0ZSk7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBwcmV2TW9udGhEaXNhYmxlZChjYWxlbmRhcjogTmdiQ2FsZW5kYXIsIGRhdGU6IE5nYkRhdGUsIG1pbkRhdGU6IE5nYkRhdGUpIHtcclxuICBjb25zdCBwcmV2RGF0ZSA9IGNhbGVuZGFyLmdldFByZXYoZGF0ZSwgJ20nKTtcclxuICByZXR1cm4gbWluRGF0ZSAmJiAocHJldkRhdGUueWVhciA9PT0gbWluRGF0ZS55ZWFyICYmIHByZXZEYXRlLm1vbnRoIDwgbWluRGF0ZS5tb250aCB8fFxyXG4gICAgICAgICAgICAgICAgICAgICBwcmV2RGF0ZS55ZWFyIDwgbWluRGF0ZS55ZWFyICYmIG1pbkRhdGUubW9udGggPT09IDEpO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gYnVpbGRNb250aHMoXHJcbiAgICBjYWxlbmRhcjogTmdiQ2FsZW5kYXIsIGRhdGU6IE5nYkRhdGUsIHN0YXRlOiBEYXRlcGlja2VyVmlld01vZGVsLCBpMThuOiBOZ2JEYXRlcGlja2VySTE4bixcclxuICAgIGZvcmNlOiBib29sZWFuKTogTW9udGhWaWV3TW9kZWxbXSB7XHJcbiAgY29uc3Qge2Rpc3BsYXlNb250aHMsIG1vbnRoc30gPSBzdGF0ZTtcclxuICAvLyBtb3ZlIG9sZCBtb250aHMgdG8gYSB0ZW1wb3JhcnkgYXJyYXlcclxuICBjb25zdCBtb250aHNUb1JldXNlID0gbW9udGhzLnNwbGljZSgwLCBtb250aHMubGVuZ3RoKTtcclxuXHJcbiAgLy8gZ2VuZXJhdGUgbmV3IGZpcnN0IGRhdGVzLCBudWxsaWZ5IG9yIHJldXNlIG1vbnRoc1xyXG4gIGNvbnN0IGZpcnN0RGF0ZXMgPSBBcnJheS5mcm9tKHtsZW5ndGg6IGRpc3BsYXlNb250aHN9LCAoXywgaSkgPT4ge1xyXG4gICAgY29uc3QgZmlyc3REYXRlID0gY2FsZW5kYXIuZ2V0TmV4dChkYXRlLCAnbScsIGkpO1xyXG4gICAgbW9udGhzW2ldID0gbnVsbDtcclxuXHJcbiAgICBpZiAoIWZvcmNlKSB7XHJcbiAgICAgIGNvbnN0IHJldXNlZEluZGV4ID0gbW9udGhzVG9SZXVzZS5maW5kSW5kZXgobW9udGggPT4gbW9udGguZmlyc3REYXRlLmVxdWFscyhmaXJzdERhdGUpKTtcclxuICAgICAgLy8gbW92ZSByZXVzZWQgbW9udGggYmFjayB0byBtb250aHNcclxuICAgICAgaWYgKHJldXNlZEluZGV4ICE9PSAtMSkge1xyXG4gICAgICAgIG1vbnRoc1tpXSA9IG1vbnRoc1RvUmV1c2Uuc3BsaWNlKHJldXNlZEluZGV4LCAxKVswXTtcclxuICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiBmaXJzdERhdGU7XHJcbiAgfSk7XHJcblxyXG4gIC8vIHJlYnVpbGQgbnVsbGlmaWVkIG1vbnRoc1xyXG4gIGZpcnN0RGF0ZXMuZm9yRWFjaCgoZmlyc3REYXRlLCBpKSA9PiB7XHJcbiAgICBpZiAobW9udGhzW2ldID09PSBudWxsKSB7XHJcbiAgICAgIG1vbnRoc1tpXSA9IGJ1aWxkTW9udGgoY2FsZW5kYXIsIGZpcnN0RGF0ZSwgc3RhdGUsIGkxOG4sIG1vbnRoc1RvUmV1c2Uuc2hpZnQoKSB8fCB7fSBhcyBNb250aFZpZXdNb2RlbCk7XHJcbiAgICB9XHJcbiAgfSk7XHJcblxyXG4gIHJldHVybiBtb250aHM7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBidWlsZE1vbnRoKFxyXG4gICAgY2FsZW5kYXI6IE5nYkNhbGVuZGFyLCBkYXRlOiBOZ2JEYXRlLCBzdGF0ZTogRGF0ZXBpY2tlclZpZXdNb2RlbCwgaTE4bjogTmdiRGF0ZXBpY2tlckkxOG4sXHJcbiAgICBtb250aDogTW9udGhWaWV3TW9kZWwgPSB7fSBhcyBNb250aFZpZXdNb2RlbCk6IE1vbnRoVmlld01vZGVsIHtcclxuICBjb25zdCB7bWluRGF0ZSwgbWF4RGF0ZSwgZmlyc3REYXlPZldlZWssIG1hcmtEaXNhYmxlZCwgb3V0c2lkZURheXN9ID0gc3RhdGU7XHJcblxyXG4gIG1vbnRoLmZpcnN0RGF0ZSA9IG51bGw7XHJcbiAgbW9udGgubGFzdERhdGUgPSBudWxsO1xyXG4gIG1vbnRoLm51bWJlciA9IGRhdGUubW9udGg7XHJcbiAgbW9udGgueWVhciA9IGRhdGUueWVhcjtcclxuICBtb250aC53ZWVrcyA9IG1vbnRoLndlZWtzIHx8IFtdO1xyXG4gIG1vbnRoLndlZWtkYXlzID0gbW9udGgud2Vla2RheXMgfHwgW107XHJcblxyXG4gIGRhdGUgPSBnZXRGaXJzdFZpZXdEYXRlKGNhbGVuZGFyLCBkYXRlLCBmaXJzdERheU9mV2Vlayk7XHJcblxyXG4gIC8vIG1vbnRoIGhhcyB3ZWVrc1xyXG4gIGZvciAobGV0IHdlZWsgPSAwOyB3ZWVrIDwgY2FsZW5kYXIuZ2V0V2Vla3NQZXJNb250aCgpOyB3ZWVrKyspIHtcclxuICAgIGxldCB3ZWVrT2JqZWN0ID0gbW9udGgud2Vla3Nbd2Vla107XHJcbiAgICBpZiAoIXdlZWtPYmplY3QpIHtcclxuICAgICAgd2Vla09iamVjdCA9IG1vbnRoLndlZWtzW3dlZWtdID0ge251bWJlcjogMCwgZGF5czogW10sIGNvbGxhcHNlZDogdHJ1ZX07XHJcbiAgICB9XHJcbiAgICBjb25zdCBkYXlzID0gd2Vla09iamVjdC5kYXlzO1xyXG5cclxuICAgIC8vIHdlZWsgaGFzIGRheXNcclxuICAgIGZvciAobGV0IGRheSA9IDA7IGRheSA8IGNhbGVuZGFyLmdldERheXNQZXJXZWVrKCk7IGRheSsrKSB7XHJcbiAgICAgIGlmICh3ZWVrID09PSAwKSB7XHJcbiAgICAgICAgbW9udGgud2Vla2RheXNbZGF5XSA9IGNhbGVuZGFyLmdldFdlZWtkYXkoZGF0ZSk7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGNvbnN0IG5ld0RhdGUgPSBuZXcgTmdiRGF0ZShkYXRlLnllYXIsIGRhdGUubW9udGgsIGRhdGUuZGF5KTtcclxuICAgICAgY29uc3QgbmV4dERhdGUgPSBjYWxlbmRhci5nZXROZXh0KG5ld0RhdGUpO1xyXG5cclxuICAgICAgY29uc3QgYXJpYUxhYmVsID0gaTE4bi5nZXREYXlBcmlhTGFiZWwobmV3RGF0ZSk7XHJcblxyXG4gICAgICAvLyBtYXJraW5nIGRhdGUgYXMgZGlzYWJsZWRcclxuICAgICAgbGV0IGRpc2FibGVkID0gISEoKG1pbkRhdGUgJiYgbmV3RGF0ZS5iZWZvcmUobWluRGF0ZSkpIHx8IChtYXhEYXRlICYmIG5ld0RhdGUuYWZ0ZXIobWF4RGF0ZSkpKTtcclxuICAgICAgaWYgKCFkaXNhYmxlZCAmJiBtYXJrRGlzYWJsZWQpIHtcclxuICAgICAgICBkaXNhYmxlZCA9IG1hcmtEaXNhYmxlZChuZXdEYXRlLCB7bW9udGg6IG1vbnRoLm51bWJlciwgeWVhcjogbW9udGgueWVhcn0pO1xyXG4gICAgICB9XHJcblxyXG4gICAgICAvLyBzYXZpbmcgZmlyc3QgZGF0ZSBvZiB0aGUgbW9udGhcclxuICAgICAgaWYgKG1vbnRoLmZpcnN0RGF0ZSA9PT0gbnVsbCAmJiBuZXdEYXRlLm1vbnRoID09PSBtb250aC5udW1iZXIpIHtcclxuICAgICAgICBtb250aC5maXJzdERhdGUgPSBuZXdEYXRlO1xyXG4gICAgICB9XHJcblxyXG4gICAgICAvLyBzYXZpbmcgbGFzdCBkYXRlIG9mIHRoZSBtb250aFxyXG4gICAgICBpZiAobmV3RGF0ZS5tb250aCA9PT0gbW9udGgubnVtYmVyICYmIG5leHREYXRlLm1vbnRoICE9PSBtb250aC5udW1iZXIpIHtcclxuICAgICAgICBtb250aC5sYXN0RGF0ZSA9IG5ld0RhdGU7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGxldCBkYXlPYmplY3QgPSBkYXlzW2RheV07XHJcbiAgICAgIGlmICghZGF5T2JqZWN0KSB7XHJcbiAgICAgICAgZGF5T2JqZWN0ID0gZGF5c1tkYXldID0ge30gYXMgRGF5Vmlld01vZGVsO1xyXG4gICAgICB9XHJcbiAgICAgIGRheU9iamVjdC5kYXRlID0gbmV3RGF0ZTtcclxuICAgICAgZGF5T2JqZWN0LmNvbnRleHQgPSBPYmplY3QuYXNzaWduKFxyXG4gICAgICAgICAgZGF5T2JqZWN0LmNvbnRleHQgfHwge30sXHJcbiAgICAgICAgICB7ZGF0ZTogbmV3RGF0ZSwgY3VycmVudE1vbnRoOiBtb250aC5udW1iZXIsIGRpc2FibGVkLCBmb2N1c2VkOiBmYWxzZSwgc2VsZWN0ZWQ6IGZhbHNlfSk7XHJcbiAgICAgIGRheU9iamVjdC50YWJpbmRleCA9IC0xO1xyXG4gICAgICBkYXlPYmplY3QuYXJpYUxhYmVsID0gYXJpYUxhYmVsO1xyXG4gICAgICBkYXlPYmplY3QuaGlkZGVuID0gZmFsc2U7XHJcblxyXG4gICAgICBkYXRlID0gbmV4dERhdGU7XHJcbiAgICB9XHJcblxyXG4gICAgd2Vla09iamVjdC5udW1iZXIgPSBjYWxlbmRhci5nZXRXZWVrTnVtYmVyKGRheXMubWFwKGRheSA9PiBkYXkuZGF0ZSksIGZpcnN0RGF5T2ZXZWVrKTtcclxuXHJcbiAgICAvLyBtYXJraW5nIHdlZWsgYXMgY29sbGFwc2VkXHJcbiAgICB3ZWVrT2JqZWN0LmNvbGxhcHNlZCA9IG91dHNpZGVEYXlzID09PSAnY29sbGFwc2VkJyAmJiBkYXlzWzBdLmRhdGUubW9udGggIT09IG1vbnRoLm51bWJlciAmJlxyXG4gICAgICAgIGRheXNbZGF5cy5sZW5ndGggLSAxXS5kYXRlLm1vbnRoICE9PSBtb250aC5udW1iZXI7XHJcbiAgfVxyXG5cclxuICByZXR1cm4gbW9udGg7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBnZXRGaXJzdFZpZXdEYXRlKGNhbGVuZGFyOiBOZ2JDYWxlbmRhciwgZGF0ZTogTmdiRGF0ZSwgZmlyc3REYXlPZldlZWs6IG51bWJlcik6IE5nYkRhdGUge1xyXG4gIGNvbnN0IGRheXNQZXJXZWVrID0gY2FsZW5kYXIuZ2V0RGF5c1BlcldlZWsoKTtcclxuICBjb25zdCBmaXJzdE1vbnRoRGF0ZSA9IG5ldyBOZ2JEYXRlKGRhdGUueWVhciwgZGF0ZS5tb250aCwgMSk7XHJcbiAgY29uc3QgZGF5T2ZXZWVrID0gY2FsZW5kYXIuZ2V0V2Vla2RheShmaXJzdE1vbnRoRGF0ZSkgJSBkYXlzUGVyV2VlaztcclxuICByZXR1cm4gY2FsZW5kYXIuZ2V0UHJldihmaXJzdE1vbnRoRGF0ZSwgJ2QnLCAoZGF5c1BlcldlZWsgKyBkYXlPZldlZWsgLSBmaXJzdERheU9mV2VlaykgJSBkYXlzUGVyV2Vlayk7XHJcbn1cclxuIl19