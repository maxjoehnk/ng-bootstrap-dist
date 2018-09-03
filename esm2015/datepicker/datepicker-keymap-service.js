/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { Injectable } from '@angular/core';
import { NgbDatepickerService } from './datepicker-service';
import { NgbCalendar } from './ngb-calendar';
import { toString } from '../util/util';
import { Key } from '../util/key';
export class NgbDatepickerKeyMapService {
    /**
     * @param {?} _service
     * @param {?} _calendar
     */
    constructor(_service, _calendar) {
        this._service = _service;
        this._calendar = _calendar;
        _service.model$.subscribe(model => {
            this._minDate = model.minDate;
            this._maxDate = model.maxDate;
            this._firstViewDate = model.firstDate;
            this._lastViewDate = model.lastDate;
        });
    }
    /**
     * @param {?} event
     * @return {?}
     */
    processKey(event) {
        if (Key[toString(event.which)]) {
            switch (event.which) {
                case Key.PageUp:
                    this._service.focusMove(event.shiftKey ? 'y' : 'm', -1);
                    break;
                case Key.PageDown:
                    this._service.focusMove(event.shiftKey ? 'y' : 'm', 1);
                    break;
                case Key.End:
                    this._service.focus(event.shiftKey ? this._maxDate : this._lastViewDate);
                    break;
                case Key.Home:
                    this._service.focus(event.shiftKey ? this._minDate : this._firstViewDate);
                    break;
                case Key.ArrowLeft:
                    this._service.focusMove('d', -1);
                    break;
                case Key.ArrowUp:
                    this._service.focusMove('d', -this._calendar.getDaysPerWeek());
                    break;
                case Key.ArrowRight:
                    this._service.focusMove('d', 1);
                    break;
                case Key.ArrowDown:
                    this._service.focusMove('d', this._calendar.getDaysPerWeek());
                    break;
                case Key.Enter:
                case Key.Space:
                    this._service.focusSelect();
                    break;
                default:
                    return;
            }
            event.preventDefault();
            event.stopPropagation();
        }
    }
}
NgbDatepickerKeyMapService.decorators = [
    { type: Injectable },
];
/** @nocollapse */
NgbDatepickerKeyMapService.ctorParameters = () => [
    { type: NgbDatepickerService },
    { type: NgbCalendar }
];
if (false) {
    /** @type {?} */
    NgbDatepickerKeyMapService.prototype._minDate;
    /** @type {?} */
    NgbDatepickerKeyMapService.prototype._maxDate;
    /** @type {?} */
    NgbDatepickerKeyMapService.prototype._firstViewDate;
    /** @type {?} */
    NgbDatepickerKeyMapService.prototype._lastViewDate;
    /** @type {?} */
    NgbDatepickerKeyMapService.prototype._service;
    /** @type {?} */
    NgbDatepickerKeyMapService.prototype._calendar;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0ZXBpY2tlci1rZXltYXAtc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BuZy1ib290c3RyYXAvbmctYm9vdHN0cmFwLyIsInNvdXJjZXMiOlsiZGF0ZXBpY2tlci9kYXRlcGlja2VyLWtleW1hcC1zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUMsVUFBVSxFQUFDLE1BQU0sZUFBZSxDQUFDO0FBQ3pDLE9BQU8sRUFBQyxvQkFBb0IsRUFBQyxNQUFNLHNCQUFzQixDQUFDO0FBQzFELE9BQU8sRUFBQyxXQUFXLEVBQUMsTUFBTSxnQkFBZ0IsQ0FBQztBQUMzQyxPQUFPLEVBQUMsUUFBUSxFQUFDLE1BQU0sY0FBYyxDQUFDO0FBQ3RDLE9BQU8sRUFBQyxHQUFHLEVBQUMsTUFBTSxhQUFhLENBQUM7QUFJaEMsTUFBTTs7Ozs7SUFNSixZQUFvQixRQUE4QixFQUFVLFNBQXNCO1FBQTlELGFBQVEsR0FBUixRQUFRLENBQXNCO1FBQVUsY0FBUyxHQUFULFNBQVMsQ0FBYTtRQUNoRixRQUFRLENBQUMsTUFBTSxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUMsRUFBRTtZQUNoQyxJQUFJLENBQUMsUUFBUSxHQUFHLEtBQUssQ0FBQyxPQUFPLENBQUM7WUFDOUIsSUFBSSxDQUFDLFFBQVEsR0FBRyxLQUFLLENBQUMsT0FBTyxDQUFDO1lBQzlCLElBQUksQ0FBQyxjQUFjLEdBQUcsS0FBSyxDQUFDLFNBQVMsQ0FBQztZQUN0QyxJQUFJLENBQUMsYUFBYSxHQUFHLEtBQUssQ0FBQyxRQUFRLENBQUM7U0FDckMsQ0FBQyxDQUFDO0tBQ0o7Ozs7O0lBRUQsVUFBVSxDQUFDLEtBQW9CO1FBQzdCLEVBQUUsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQy9CLE1BQU0sQ0FBQyxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO2dCQUNwQixLQUFLLEdBQUcsQ0FBQyxNQUFNO29CQUNiLElBQUksQ0FBQyxRQUFRLENBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUM7b0JBQ3hELEtBQUssQ0FBQztnQkFDUixLQUFLLEdBQUcsQ0FBQyxRQUFRO29CQUNmLElBQUksQ0FBQyxRQUFRLENBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQyxDQUFDO29CQUN2RCxLQUFLLENBQUM7Z0JBQ1IsS0FBSyxHQUFHLENBQUMsR0FBRztvQkFDVixJQUFJLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLENBQUM7b0JBQ3pFLEtBQUssQ0FBQztnQkFDUixLQUFLLEdBQUcsQ0FBQyxJQUFJO29CQUNYLElBQUksQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxjQUFjLENBQUMsQ0FBQztvQkFDMUUsS0FBSyxDQUFDO2dCQUNSLEtBQUssR0FBRyxDQUFDLFNBQVM7b0JBQ2hCLElBQUksQ0FBQyxRQUFRLENBQUMsU0FBUyxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDO29CQUNqQyxLQUFLLENBQUM7Z0JBQ1IsS0FBSyxHQUFHLENBQUMsT0FBTztvQkFDZCxJQUFJLENBQUMsUUFBUSxDQUFDLFNBQVMsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLGNBQWMsRUFBRSxDQUFDLENBQUM7b0JBQy9ELEtBQUssQ0FBQztnQkFDUixLQUFLLEdBQUcsQ0FBQyxVQUFVO29CQUNqQixJQUFJLENBQUMsUUFBUSxDQUFDLFNBQVMsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDLENBQUM7b0JBQ2hDLEtBQUssQ0FBQztnQkFDUixLQUFLLEdBQUcsQ0FBQyxTQUFTO29CQUNoQixJQUFJLENBQUMsUUFBUSxDQUFDLFNBQVMsQ0FBQyxHQUFHLEVBQUUsSUFBSSxDQUFDLFNBQVMsQ0FBQyxjQUFjLEVBQUUsQ0FBQyxDQUFDO29CQUM5RCxLQUFLLENBQUM7Z0JBQ1IsS0FBSyxHQUFHLENBQUMsS0FBSyxDQUFDO2dCQUNmLEtBQUssR0FBRyxDQUFDLEtBQUs7b0JBQ1osSUFBSSxDQUFDLFFBQVEsQ0FBQyxXQUFXLEVBQUUsQ0FBQztvQkFDNUIsS0FBSyxDQUFDO2dCQUNSO29CQUNFLE1BQU0sQ0FBQzthQUNWO1lBRUQsS0FBSyxDQUFDLGNBQWMsRUFBRSxDQUFDO1lBQ3ZCLEtBQUssQ0FBQyxlQUFlLEVBQUUsQ0FBQztTQUN6QjtLQUNGOzs7WUF0REYsVUFBVTs7OztZQU5ILG9CQUFvQjtZQUNwQixXQUFXIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtJbmplY3RhYmxlfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHtOZ2JEYXRlcGlja2VyU2VydmljZX0gZnJvbSAnLi9kYXRlcGlja2VyLXNlcnZpY2UnO1xyXG5pbXBvcnQge05nYkNhbGVuZGFyfSBmcm9tICcuL25nYi1jYWxlbmRhcic7XHJcbmltcG9ydCB7dG9TdHJpbmd9IGZyb20gJy4uL3V0aWwvdXRpbCc7XHJcbmltcG9ydCB7S2V5fSBmcm9tICcuLi91dGlsL2tleSc7XHJcbmltcG9ydCB7TmdiRGF0ZX0gZnJvbSAnLi9uZ2ItZGF0ZSc7XHJcblxyXG5ASW5qZWN0YWJsZSgpXHJcbmV4cG9ydCBjbGFzcyBOZ2JEYXRlcGlja2VyS2V5TWFwU2VydmljZSB7XHJcbiAgcHJpdmF0ZSBfbWluRGF0ZTogTmdiRGF0ZTtcclxuICBwcml2YXRlIF9tYXhEYXRlOiBOZ2JEYXRlO1xyXG4gIHByaXZhdGUgX2ZpcnN0Vmlld0RhdGU6IE5nYkRhdGU7XHJcbiAgcHJpdmF0ZSBfbGFzdFZpZXdEYXRlOiBOZ2JEYXRlO1xyXG5cclxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIF9zZXJ2aWNlOiBOZ2JEYXRlcGlja2VyU2VydmljZSwgcHJpdmF0ZSBfY2FsZW5kYXI6IE5nYkNhbGVuZGFyKSB7XHJcbiAgICBfc2VydmljZS5tb2RlbCQuc3Vic2NyaWJlKG1vZGVsID0+IHtcclxuICAgICAgdGhpcy5fbWluRGF0ZSA9IG1vZGVsLm1pbkRhdGU7XHJcbiAgICAgIHRoaXMuX21heERhdGUgPSBtb2RlbC5tYXhEYXRlO1xyXG4gICAgICB0aGlzLl9maXJzdFZpZXdEYXRlID0gbW9kZWwuZmlyc3REYXRlO1xyXG4gICAgICB0aGlzLl9sYXN0Vmlld0RhdGUgPSBtb2RlbC5sYXN0RGF0ZTtcclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgcHJvY2Vzc0tleShldmVudDogS2V5Ym9hcmRFdmVudCkge1xyXG4gICAgaWYgKEtleVt0b1N0cmluZyhldmVudC53aGljaCldKSB7XHJcbiAgICAgIHN3aXRjaCAoZXZlbnQud2hpY2gpIHtcclxuICAgICAgICBjYXNlIEtleS5QYWdlVXA6XHJcbiAgICAgICAgICB0aGlzLl9zZXJ2aWNlLmZvY3VzTW92ZShldmVudC5zaGlmdEtleSA/ICd5JyA6ICdtJywgLTEpO1xyXG4gICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgY2FzZSBLZXkuUGFnZURvd246XHJcbiAgICAgICAgICB0aGlzLl9zZXJ2aWNlLmZvY3VzTW92ZShldmVudC5zaGlmdEtleSA/ICd5JyA6ICdtJywgMSk7XHJcbiAgICAgICAgICBicmVhaztcclxuICAgICAgICBjYXNlIEtleS5FbmQ6XHJcbiAgICAgICAgICB0aGlzLl9zZXJ2aWNlLmZvY3VzKGV2ZW50LnNoaWZ0S2V5ID8gdGhpcy5fbWF4RGF0ZSA6IHRoaXMuX2xhc3RWaWV3RGF0ZSk7XHJcbiAgICAgICAgICBicmVhaztcclxuICAgICAgICBjYXNlIEtleS5Ib21lOlxyXG4gICAgICAgICAgdGhpcy5fc2VydmljZS5mb2N1cyhldmVudC5zaGlmdEtleSA/IHRoaXMuX21pbkRhdGUgOiB0aGlzLl9maXJzdFZpZXdEYXRlKTtcclxuICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIGNhc2UgS2V5LkFycm93TGVmdDpcclxuICAgICAgICAgIHRoaXMuX3NlcnZpY2UuZm9jdXNNb3ZlKCdkJywgLTEpO1xyXG4gICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgY2FzZSBLZXkuQXJyb3dVcDpcclxuICAgICAgICAgIHRoaXMuX3NlcnZpY2UuZm9jdXNNb3ZlKCdkJywgLXRoaXMuX2NhbGVuZGFyLmdldERheXNQZXJXZWVrKCkpO1xyXG4gICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgY2FzZSBLZXkuQXJyb3dSaWdodDpcclxuICAgICAgICAgIHRoaXMuX3NlcnZpY2UuZm9jdXNNb3ZlKCdkJywgMSk7XHJcbiAgICAgICAgICBicmVhaztcclxuICAgICAgICBjYXNlIEtleS5BcnJvd0Rvd246XHJcbiAgICAgICAgICB0aGlzLl9zZXJ2aWNlLmZvY3VzTW92ZSgnZCcsIHRoaXMuX2NhbGVuZGFyLmdldERheXNQZXJXZWVrKCkpO1xyXG4gICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgY2FzZSBLZXkuRW50ZXI6XHJcbiAgICAgICAgY2FzZSBLZXkuU3BhY2U6XHJcbiAgICAgICAgICB0aGlzLl9zZXJ2aWNlLmZvY3VzU2VsZWN0KCk7XHJcbiAgICAgICAgICBicmVhaztcclxuICAgICAgICBkZWZhdWx0OlxyXG4gICAgICAgICAgcmV0dXJuO1xyXG4gICAgICB9XHJcblxyXG4gICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcclxuICAgIH1cclxuICB9XHJcbn1cclxuIl19