/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { Injectable } from '@angular/core';
import { NgbDateAdapter } from './ngb-date-adapter';
export class NgbDateNativeAdapter extends NgbDateAdapter {
    /**
     * @param {?} date
     * @return {?}
     */
    fromModel(date) {
        return (date instanceof Date) ? { year: date.getFullYear(), month: date.getMonth() + 1, day: date.getDate() } : null;
    }
    /**
     * @param {?} date
     * @return {?}
     */
    toModel(date) {
        return date && date.year && date.month ? new Date(date.year, date.month - 1, date.day, 12) : null;
    }
}
NgbDateNativeAdapter.decorators = [
    { type: Injectable },
];

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmdiLWRhdGUtbmF0aXZlLWFkYXB0ZXIuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AbmctYm9vdHN0cmFwL25nLWJvb3RzdHJhcC8iLCJzb3VyY2VzIjpbImRhdGVwaWNrZXIvYWRhcHRlcnMvbmdiLWRhdGUtbmF0aXZlLWFkYXB0ZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBQyxVQUFVLEVBQUMsTUFBTSxlQUFlLENBQUM7QUFDekMsT0FBTyxFQUFDLGNBQWMsRUFBQyxNQUFNLG9CQUFvQixDQUFDO0FBSWxELE1BQU0sMkJBQTRCLFNBQVEsY0FBb0I7Ozs7O0lBQzVELFNBQVMsQ0FBQyxJQUFVO1FBQ2xCLE1BQU0sQ0FBQyxDQUFDLElBQUksWUFBWSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLFdBQVcsRUFBRSxFQUFFLEtBQUssRUFBRSxJQUFJLENBQUMsUUFBUSxFQUFFLEdBQUcsQ0FBQyxFQUFFLEdBQUcsRUFBRSxJQUFJLENBQUMsT0FBTyxFQUFFLEVBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDO0tBQ3BIOzs7OztJQUVELE9BQU8sQ0FBQyxJQUFtQjtRQUN6QixNQUFNLENBQUMsSUFBSSxJQUFJLElBQUksQ0FBQyxJQUFJLElBQUksSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsSUFBSSxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsS0FBSyxHQUFHLENBQUMsRUFBRSxJQUFJLENBQUMsR0FBRyxFQUFFLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUM7S0FDbkc7OztZQVJGLFVBQVUiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge0luamVjdGFibGV9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQge05nYkRhdGVBZGFwdGVyfSBmcm9tICcuL25nYi1kYXRlLWFkYXB0ZXInO1xyXG5pbXBvcnQge05nYkRhdGVTdHJ1Y3R9IGZyb20gJy4uL25nYi1kYXRlLXN0cnVjdCc7XHJcblxyXG5ASW5qZWN0YWJsZSgpXHJcbmV4cG9ydCBjbGFzcyBOZ2JEYXRlTmF0aXZlQWRhcHRlciBleHRlbmRzIE5nYkRhdGVBZGFwdGVyPERhdGU+IHtcclxuICBmcm9tTW9kZWwoZGF0ZTogRGF0ZSk6IE5nYkRhdGVTdHJ1Y3Qge1xyXG4gICAgcmV0dXJuIChkYXRlIGluc3RhbmNlb2YgRGF0ZSkgPyB7eWVhcjogZGF0ZS5nZXRGdWxsWWVhcigpLCBtb250aDogZGF0ZS5nZXRNb250aCgpICsgMSwgZGF5OiBkYXRlLmdldERhdGUoKX0gOiBudWxsO1xyXG4gIH1cclxuXHJcbiAgdG9Nb2RlbChkYXRlOiBOZ2JEYXRlU3RydWN0KTogRGF0ZSB7XHJcbiAgICByZXR1cm4gZGF0ZSAmJiBkYXRlLnllYXIgJiYgZGF0ZS5tb250aCA/IG5ldyBEYXRlKGRhdGUueWVhciwgZGF0ZS5tb250aCAtIDEsIGRhdGUuZGF5LCAxMikgOiBudWxsO1xyXG4gIH1cclxufVxyXG4iXX0=