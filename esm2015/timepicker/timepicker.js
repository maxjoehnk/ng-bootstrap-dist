/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { Component, forwardRef, Input } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { isNumber, padNumber, toInteger } from '../util/util';
import { NgbTime } from './ngb-time';
import { NgbTimepickerConfig } from './timepicker-config';
import { NgbTimeAdapter } from './ngb-time-adapter';
/** @type {?} */
const NGB_TIMEPICKER_VALUE_ACCESSOR = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => NgbTimepicker),
    multi: true
};
/**
 * A lightweight & configurable timepicker directive.
 */
export class NgbTimepicker {
    /**
     * @param {?} config
     * @param {?} _ngbTimeAdapter
     */
    constructor(config, _ngbTimeAdapter) {
        this._ngbTimeAdapter = _ngbTimeAdapter;
        this.onChange = (_) => { };
        this.onTouched = () => { };
        this.meridian = config.meridian;
        this.spinners = config.spinners;
        this.seconds = config.seconds;
        this.hourStep = config.hourStep;
        this.minuteStep = config.minuteStep;
        this.secondStep = config.secondStep;
        this.disabled = config.disabled;
        this.readonlyInputs = config.readonlyInputs;
        this.size = config.size;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    writeValue(value) {
        /** @type {?} */
        const structValue = this._ngbTimeAdapter.fromModel(value);
        this.model = structValue ? new NgbTime(structValue.hour, structValue.minute, structValue.second) : new NgbTime();
        if (!this.seconds && (!structValue || !isNumber(structValue.second))) {
            this.model.second = 0;
        }
    }
    /**
     * @param {?} fn
     * @return {?}
     */
    registerOnChange(fn) { this.onChange = fn; }
    /**
     * @param {?} fn
     * @return {?}
     */
    registerOnTouched(fn) { this.onTouched = fn; }
    /**
     * @param {?} isDisabled
     * @return {?}
     */
    setDisabledState(isDisabled) { this.disabled = isDisabled; }
    /**
     * @param {?} step
     * @return {?}
     */
    changeHour(step) {
        this.model.changeHour(step);
        this.propagateModelChange();
    }
    /**
     * @param {?} step
     * @return {?}
     */
    changeMinute(step) {
        this.model.changeMinute(step);
        this.propagateModelChange();
    }
    /**
     * @param {?} step
     * @return {?}
     */
    changeSecond(step) {
        this.model.changeSecond(step);
        this.propagateModelChange();
    }
    /**
     * @param {?} newVal
     * @return {?}
     */
    updateHour(newVal) {
        /** @type {?} */
        const isPM = this.model.hour >= 12;
        /** @type {?} */
        const enteredHour = toInteger(newVal);
        if (this.meridian && (isPM && enteredHour < 12 || !isPM && enteredHour === 12)) {
            this.model.updateHour(enteredHour + 12);
        }
        else {
            this.model.updateHour(enteredHour);
        }
        this.propagateModelChange();
    }
    /**
     * @param {?} newVal
     * @return {?}
     */
    updateMinute(newVal) {
        this.model.updateMinute(toInteger(newVal));
        this.propagateModelChange();
    }
    /**
     * @param {?} newVal
     * @return {?}
     */
    updateSecond(newVal) {
        this.model.updateSecond(toInteger(newVal));
        this.propagateModelChange();
    }
    /**
     * @return {?}
     */
    toggleMeridian() {
        if (this.meridian) {
            this.changeHour(12);
        }
    }
    /**
     * @param {?} value
     * @return {?}
     */
    formatHour(value) {
        if (isNumber(value)) {
            if (this.meridian) {
                return padNumber(value % 12 === 0 ? 12 : value % 12);
            }
            else {
                return padNumber(value % 24);
            }
        }
        else {
            return padNumber(NaN);
        }
    }
    /**
     * @param {?} value
     * @return {?}
     */
    formatMinSec(value) { return padNumber(value); }
    /**
     * @return {?}
     */
    get isSmallSize() { return this.size === 'small'; }
    /**
     * @return {?}
     */
    get isLargeSize() { return this.size === 'large'; }
    /**
     * @param {?} changes
     * @return {?}
     */
    ngOnChanges(changes) {
        if (changes['seconds'] && !this.seconds && this.model && !isNumber(this.model.second)) {
            this.model.second = 0;
            this.propagateModelChange(false);
        }
    }
    /**
     * @param {?=} touched
     * @return {?}
     */
    propagateModelChange(touched = true) {
        if (touched) {
            this.onTouched();
        }
        if (this.model.isValid(this.seconds)) {
            this.onChange(this._ngbTimeAdapter.toModel({ hour: this.model.hour, minute: this.model.minute, second: this.model.second }));
        }
        else {
            this.onChange(this._ngbTimeAdapter.toModel(null));
        }
    }
}
NgbTimepicker.decorators = [
    { type: Component, args: [{
                selector: 'ngb-timepicker',
                styles: [`

    :host {
      font-size: 1rem;
    }

    .ngb-tp {
      display: -ms-flexbox;
      display: flex;
      -ms-flex-align: center;
      align-items: center;
    }

    .ngb-tp-input-container {
      width: 4em;
    }

    .ngb-tp-hour, .ngb-tp-minute, .ngb-tp-second, .ngb-tp-meridian {
      display: -ms-flexbox;
      display: flex;
      -ms-flex-direction: column;
      flex-direction: column;
      -ms-flex-align: center;
      align-items: center;
      -ms-flex-pack: distribute;
      justify-content: space-around;
    }

    .ngb-tp-spacer {
      width: 1em;
      text-align: center;
    }

    .chevron::before {
      border-style: solid;
      border-width: 0.29em 0.29em 0 0;
      content: '';
      display: inline-block;
      height: 0.69em;
      left: 0.05em;
      position: relative;
      top: 0.15em;
      transform: rotate(-45deg);
      -webkit-transform: rotate(-45deg);
      -ms-transform: rotate(-45deg);
      vertical-align: middle;
      width: 0.71em;
    }

    .chevron.bottom:before {
      top: -.3em;
      -webkit-transform: rotate(135deg);
      -ms-transform: rotate(135deg);
      transform: rotate(135deg);
    }

    input {
      text-align: center;
    }
  `],
                template: `
    <fieldset [disabled]="disabled" [class.disabled]="disabled">
      <div class="ngb-tp">
        <div class="ngb-tp-input-container ngb-tp-hour">
          <button *ngIf="spinners" type="button" (click)="changeHour(hourStep)"
            class="btn btn-link" [class.btn-sm]="isSmallSize" [class.btn-lg]="isLargeSize" [class.disabled]="disabled"
            [disabled]="disabled">
            <span class="chevron"></span>
            <span class="sr-only" i18n="@@ngb.timepicker.increment-hours">Increment hours</span>
          </button>
          <input type="text" class="form-control" [class.form-control-sm]="isSmallSize" [class.form-control-lg]="isLargeSize" maxlength="2"
            placeholder="HH" i18n-placeholder="@@ngb.timepicker.HH"
            [value]="formatHour(model?.hour)" (change)="updateHour($event.target.value)"
            [readonly]="readonlyInputs" [disabled]="disabled" aria-label="Hours" i18n-aria-label="@@ngb.timepicker.hours">
          <button *ngIf="spinners" type="button" (click)="changeHour(-hourStep)"
            class="btn btn-link" [class.btn-sm]="isSmallSize" [class.btn-lg]="isLargeSize" [class.disabled]="disabled"
            [disabled]="disabled">
            <span class="chevron bottom"></span>
            <span class="sr-only" i18n="@@ngb.timepicker.decrement-hours">Decrement hours</span>
          </button>
        </div>
        <div class="ngb-tp-spacer">:</div>
        <div class="ngb-tp-input-container ngb-tp-minute">
          <button *ngIf="spinners" type="button" (click)="changeMinute(minuteStep)"
            class="btn btn-link" [class.btn-sm]="isSmallSize" [class.btn-lg]="isLargeSize" [class.disabled]="disabled"
            [disabled]="disabled">
            <span class="chevron"></span>
            <span class="sr-only" i18n="@@ngb.timepicker.increment-minutes">Increment minutes</span>
          </button>
          <input type="text" class="form-control" [class.form-control-sm]="isSmallSize" [class.form-control-lg]="isLargeSize" maxlength="2"
            placeholder="MM" i18n-placeholder="@@ngb.timepicker.MM"
            [value]="formatMinSec(model?.minute)" (change)="updateMinute($event.target.value)"
            [readonly]="readonlyInputs" [disabled]="disabled" aria-label="Minutes" i18n-aria-label="@@ngb.timepicker.minutes">
          <button *ngIf="spinners" type="button" (click)="changeMinute(-minuteStep)"
            class="btn btn-link" [class.btn-sm]="isSmallSize" [class.btn-lg]="isLargeSize"  [class.disabled]="disabled"
            [disabled]="disabled">
            <span class="chevron bottom"></span>
            <span class="sr-only"  i18n="@@ngb.timepicker.decrement-minutes">Decrement minutes</span>
          </button>
        </div>
        <div *ngIf="seconds" class="ngb-tp-spacer">:</div>
        <div *ngIf="seconds" class="ngb-tp-input-container ngb-tp-second">
          <button *ngIf="spinners" type="button" (click)="changeSecond(secondStep)"
            class="btn btn-link" [class.btn-sm]="isSmallSize" [class.btn-lg]="isLargeSize" [class.disabled]="disabled"
            [disabled]="disabled">
            <span class="chevron"></span>
            <span class="sr-only" i18n="@@ngb.timepicker.increment-seconds">Increment seconds</span>
          </button>
          <input type="text" class="form-control" [class.form-control-sm]="isSmallSize" [class.form-control-lg]="isLargeSize" maxlength="2"
            placeholder="SS" i18n-placeholder="@@ngb.timepicker.SS"
            [value]="formatMinSec(model?.second)" (change)="updateSecond($event.target.value)"
            [readonly]="readonlyInputs" [disabled]="disabled" aria-label="Seconds" i18n-aria-label="@@ngb.timepicker.seconds">
          <button *ngIf="spinners" type="button" (click)="changeSecond(-secondStep)"
            class="btn btn-link" [class.btn-sm]="isSmallSize" [class.btn-lg]="isLargeSize"  [class.disabled]="disabled"
            [disabled]="disabled">
            <span class="chevron bottom"></span>
            <span class="sr-only" i18n="@@ngb.timepicker.decrement-seconds">Decrement seconds</span>
          </button>
        </div>
        <div *ngIf="meridian" class="ngb-tp-spacer"></div>
        <div *ngIf="meridian" class="ngb-tp-meridian">
          <button type="button" class="btn btn-outline-primary" [class.btn-sm]="isSmallSize" [class.btn-lg]="isLargeSize"
            [disabled]="disabled" [class.disabled]="disabled"
                  (click)="toggleMeridian()">
            <ng-container *ngIf="model?.hour >= 12; else am" i18n="@@ngb.timepicker.PM">PM</ng-container>
            <ng-template #am i18n="@@ngb.timepicker.AM">AM</ng-template>
          </button>
        </div>
      </div>
    </fieldset>
  `,
                providers: [NGB_TIMEPICKER_VALUE_ACCESSOR]
            },] },
];
/** @nocollapse */
NgbTimepicker.ctorParameters = () => [
    { type: NgbTimepickerConfig },
    { type: NgbTimeAdapter }
];
NgbTimepicker.propDecorators = {
    meridian: [{ type: Input }],
    spinners: [{ type: Input }],
    seconds: [{ type: Input }],
    hourStep: [{ type: Input }],
    minuteStep: [{ type: Input }],
    secondStep: [{ type: Input }],
    readonlyInputs: [{ type: Input }],
    size: [{ type: Input }]
};
if (false) {
    /** @type {?} */
    NgbTimepicker.prototype.disabled;
    /** @type {?} */
    NgbTimepicker.prototype.model;
    /**
     * Whether to display 12H or 24H mode.
     * @type {?}
     */
    NgbTimepicker.prototype.meridian;
    /**
     * Whether to display the spinners above and below the inputs.
     * @type {?}
     */
    NgbTimepicker.prototype.spinners;
    /**
     * Whether to display seconds input.
     * @type {?}
     */
    NgbTimepicker.prototype.seconds;
    /**
     * Number of hours to increase or decrease when using a button.
     * @type {?}
     */
    NgbTimepicker.prototype.hourStep;
    /**
     * Number of minutes to increase or decrease when using a button.
     * @type {?}
     */
    NgbTimepicker.prototype.minuteStep;
    /**
     * Number of seconds to increase or decrease when using a button.
     * @type {?}
     */
    NgbTimepicker.prototype.secondStep;
    /**
     * To make timepicker readonly
     * @type {?}
     */
    NgbTimepicker.prototype.readonlyInputs;
    /**
     * To set the size of the inputs and button
     * @type {?}
     */
    NgbTimepicker.prototype.size;
    /** @type {?} */
    NgbTimepicker.prototype.onChange;
    /** @type {?} */
    NgbTimepicker.prototype.onTouched;
    /** @type {?} */
    NgbTimepicker.prototype._ngbTimeAdapter;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGltZXBpY2tlci5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BuZy1ib290c3RyYXAvbmctYm9vdHN0cmFwLyIsInNvdXJjZXMiOlsidGltZXBpY2tlci90aW1lcGlja2VyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUMsU0FBUyxFQUFFLFVBQVUsRUFBRSxLQUFLLEVBQTJCLE1BQU0sZUFBZSxDQUFDO0FBQ3JGLE9BQU8sRUFBdUIsaUJBQWlCLEVBQUMsTUFBTSxnQkFBZ0IsQ0FBQztBQUV2RSxPQUFPLEVBQUMsUUFBUSxFQUFFLFNBQVMsRUFBRSxTQUFTLEVBQUMsTUFBTSxjQUFjLENBQUM7QUFDNUQsT0FBTyxFQUFDLE9BQU8sRUFBQyxNQUFNLFlBQVksQ0FBQztBQUNuQyxPQUFPLEVBQUMsbUJBQW1CLEVBQUMsTUFBTSxxQkFBcUIsQ0FBQztBQUN4RCxPQUFPLEVBQUMsY0FBYyxFQUFDLE1BQU0sb0JBQW9CLENBQUM7O0FBRWxELE1BQU0sNkJBQTZCLEdBQUc7SUFDcEMsT0FBTyxFQUFFLGlCQUFpQjtJQUMxQixXQUFXLEVBQUUsVUFBVSxDQUFDLEdBQUcsRUFBRSxDQUFDLGFBQWEsQ0FBQztJQUM1QyxLQUFLLEVBQUUsSUFBSTtDQUNaLENBQUM7Ozs7QUE0SUYsTUFBTTs7Ozs7SUE2Q0osWUFBWSxNQUEyQixFQUFVLGVBQW9DO1FBQXBDLG9CQUFlLEdBQWYsZUFBZSxDQUFxQjt3QkFZMUUsQ0FBQyxDQUFNLEVBQUUsRUFBRSxJQUFHO3lCQUNiLEdBQUcsRUFBRSxJQUFHO1FBWmxCLElBQUksQ0FBQyxRQUFRLEdBQUcsTUFBTSxDQUFDLFFBQVEsQ0FBQztRQUNoQyxJQUFJLENBQUMsUUFBUSxHQUFHLE1BQU0sQ0FBQyxRQUFRLENBQUM7UUFDaEMsSUFBSSxDQUFDLE9BQU8sR0FBRyxNQUFNLENBQUMsT0FBTyxDQUFDO1FBQzlCLElBQUksQ0FBQyxRQUFRLEdBQUcsTUFBTSxDQUFDLFFBQVEsQ0FBQztRQUNoQyxJQUFJLENB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Ozs7Ozs7Ozs7O0dBc0VUO2dCQUNELFNBQVMsRUFBRSxDQUFDLDZCQUE2QixDQUFDO2FBQzNDOzs7O1lBbEpPLG1CQUFtQjtZQUNuQixjQUFjOzs7dUJBMEpuQixLQUFLO3VCQUtMLEtBQUs7c0JBS0wsS0FBSzt1QkFLTCxLQUFLO3lCQUtMLEtBQUs7eUJBS0wsS0FBSzs2QkFLTCxLQUFLO21CQUtMLEtBQUsiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge0NvbXBvbmVudCwgZm9yd2FyZFJlZiwgSW5wdXQsIE9uQ2hhbmdlcywgU2ltcGxlQ2hhbmdlc30gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge0NvbnRyb2xWYWx1ZUFjY2Vzc29yLCBOR19WQUxVRV9BQ0NFU1NPUn0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuXG5pbXBvcnQge2lzTnVtYmVyLCBwYWROdW1iZXIsIHRvSW50ZWdlcn0gZnJvbSAnLi4vdXRpbC91dGlsJztcbmltcG9ydCB7TmdiVGltZX0gZnJvbSAnLi9uZ2ItdGltZSc7XG5pbXBvcnQge05nYlRpbWVwaWNrZXJDb25maWd9IGZyb20gJy4vdGltZXBpY2tlci1jb25maWcnO1xuaW1wb3J0IHtOZ2JUaW1lQWRhcHRlcn0gZnJvbSAnLi9uZ2ItdGltZS1hZGFwdGVyJztcblxuY29uc3QgTkdCX1RJTUVQSUNLRVJfVkFMVUVfQUNDRVNTT1IgPSB7XG4gIHByb3ZpZGU6IE5HX1ZBTFVFX0FDQ0VTU09SLFxuICB1c2VFeGlzdGluZzogZm9yd2FyZFJlZigoKSA9PiBOZ2JUaW1lcGlja2VyKSxcbiAgbXVsdGk6IHRydWVcbn07XG5cbi8qKlxuICogQSBsaWdodHdlaWdodCAmIGNvbmZpZ3VyYWJsZSB0aW1lcGlja2VyIGRpcmVjdGl2ZS5cbiAqL1xuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnbmdiLXRpbWVwaWNrZXInLFxuICBzdHlsZXM6IFtgXG5cbiAgICA6aG9zdCB7XG4gICAgICBmb250LXNpemU6IDFyZW07XG4gICAgfVxuXG4gICAgLm5nYi10cCB7XG4gICAgICBkaXNwbGF5OiAtbXMtZmxleGJveDtcbiAgICAgIGRpc3BsYXk6IGZsZXg7XG4gICAgICAtbXMtZmxleC1hbGlnbjogY2VudGVyO1xuICAgICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAgICB9XG5cbiAgICAubmdiLXRwLWlucHV0LWNvbnRhaW5lciB7XG4gICAgICB3aWR0aDogNGVtO1xuICAgIH1cblxuICAgIC5uZ2ItdHAtaG91ciwgLm5nYi10cC1taW51dGUsIC5uZ2ItdHAtc2Vjb25kLCAubmdiLXRwLW1lcmlkaWFuIHtcbiAgICAgIGRpc3BsYXk6IC1tcy1mbGV4Ym94O1xuICAgICAgZGlzcGxheTogZmxleDtcbiAgICAgIC1tcy1mbGV4LWRpcmVjdGlvbjogY29sdW1uO1xuICAgICAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcbiAgICAgIC1tcy1mbGV4LWFsaWduOiBjZW50ZXI7XG4gICAgICBhbGlnbi1pdGVtczogY2VudGVyO1xuICAgICAgLW1zLWZsZXgtcGFjazogZGlzdHJpYnV0ZTtcbiAgICAgIGp1c3RpZnktY29udGVudDogc3BhY2UtYXJvdW5kO1xuICAgIH1cblxuICAgIC5uZ2ItdHAtc3BhY2VyIHtcbiAgICAgIHdpZHRoOiAxZW07XG4gICAgICB0ZXh0LWFsaWduOiBjZW50ZXI7XG4gICAgfVxuXG4gICAgLmNoZXZyb246OmJlZm9yZSB7XG4gICAgICBib3JkZXItc3R5bGU6IHNvbGlkO1xuICAgICAgYm9yZGVyLXdpZHRoOiAwLjI5ZW0gMC4yOWVtIDAgMDtcbiAgICAgIGNvbnRlbnQ6ICcnO1xuICAgICAgZGlzcGxheTogaW5saW5lLWJsb2NrO1xuICAgICAgaGVpZ2h0OiAwLjY5ZW07XG4gICAgICBsZWZ0OiAwLjA1ZW07XG4gICAgICBwb3NpdGlvbjogcmVsYXRpdmU7XG4gICAgICB0b3A6IDAuMTVlbTtcbiAgICAgIHRyYW5zZm9ybTogcm90YXRlKC00NWRlZyk7XG4gICAgICAtd2Via2l0LXRyYW5zZm9ybTogcm90YXRlKC00NWRlZyk7XG4gICAgICAtbXMtdHJhbnNmb3JtOiByb3RhdGUoLTQ1ZGVnKTtcbiAgICAgIHZlcnRpY2FsLWFsaWduOiBtaWRkbGU7XG4gICAgICB3aWR0aDogMC43MWVtO1xuICAgIH1cblxuICAgIC5jaGV2cm9uLmJvdHRvbTpiZWZvcmUge1xuICAgICAgdG9wOiAtLjNlbTtcbiAgICAgIC13ZWJraXQtdHJhbnNmb3JtOiByb3RhdGUoMTM1ZGVnKTtcbiAgICAgIC1tcy10cmFuc2Zvcm06IHJvdGF0ZSgxMzVkZWcpO1xuICAgICAgdHJhbnNmb3JtOiByb3RhdGUoMTM1ZGVnKTtcbiAgICB9XG5cbiAgICBpbnB1dCB7XG4gICAgICB0ZXh0LWFsaWduOiBjZW50ZXI7XG4gICAgfVxuICBgXSxcbiAgdGVtcGxhdGU6IGBcbiAgICA8ZmllbGRzZXQgW2Rpc2FibGVkXT1cImRpc2FibGVkXCIgW2NsYXNzLmRpc2FibGVkXT1cImRpc2FibGVkXCI+XG4gICAgICA8ZGl2IGNsYXNzPVwibmdiLXRwXCI+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJuZ2ItdHAtaW5wdXQtY29udGFpbmVyIG5nYi10cC1ob3VyXCI+XG4gICAgICAgICAgPGJ1dHRvbiAqbmdJZj1cInNwaW5uZXJzXCIgdHlwZT1cImJ1dHRvblwiIChjbGljayk9XCJjaGFuZ2VIb3VyKGhvdXJTdGVwKVwiXG4gICAgICAgICAgICBjbGFzcz1cImJ0biBidG4tbGlua1wiIFtjbGFzcy5idG4tc21dPVwiaXNTbWFsbFNpemVcIiBbY2xhc3MuYnRuLWxnXT1cImlzTGFyZ2VTaXplXCIgW2NsYXNzLmRpc2FibGVkXT1cImRpc2FibGVkXCJcbiAgICAgICAgICAgIFtkaXNhYmxlZF09XCJkaXNhYmxlZFwiPlxuICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJjaGV2cm9uXCI+PC9zcGFuPlxuICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJzci1vbmx5XCIgaTE4bj1cIkBAbmdiLnRpbWVwaWNrZXIuaW5jcmVtZW50LWhvdXJzXCI+SW5jcmVtZW50IGhvdXJzPC9zcGFuPlxuICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgIDxpbnB1dCB0eXBlPVwidGV4dFwiIGNsYXNzPVwiZm9ybS1jb250cm9sXCIgW2NsYXNzLmZvcm0tY29udHJvbC1zbV09XCJpc1NtYWxsU2l6ZVwiIFtjbGFzcy5mb3JtLWNvbnRyb2wtbGddPVwiaXNMYXJnZVNpemVcIiBtYXhsZW5ndGg9XCIyXCJcbiAgICAgICAgICAgIHBsYWNlaG9sZGVyPVwiSEhcIiBpMThuLXBsYWNlaG9sZGVyPVwiQEBuZ2IudGltZXBpY2tlci5ISFwiXG4gICAgICAgICAgICBbdmFsdWVdPVwiZm9ybWF0SG91cihtb2RlbD8uaG91cilcIiAoY2hhbmdlKT1cInVwZGF0ZUhvdXIoJGV2ZW50LnRhcmdldC52YWx1ZSlcIlxuICAgICAgICAgICAgW3JlYWRvbmx5XT1cInJlYWRvbmx5SW5wdXRzXCIgW2Rpc2FibGVkXT1cImRpc2FibGVkXCIgYXJpYS1sYWJlbD1cIkhvdXJzXCIgaTE4bi1hcmlhLWxhYmVsPVwiQEBuZ2IudGltZXBpY2tlci5ob3Vyc1wiPlxuICAgICAgICAgIDxidXR0b24gKm5nSWY9XCJzcGlubmVyc1wiIHR5cGU9XCJidXR0b25cIiAoY2xpY2spPVwiY2hhbmdlSG91cigtaG91clN0ZXApXCJcbiAgICAgICAgICAgIGNsYXNzPVwiYnRuIGJ0bi1saW5rXCIgW2NsYXNzLmJ0bi1zbV09XCJpc1NtYWxsU2l6ZVwiIFtjbGFzcy5idG4tbGddPVwiaXNMYXJnZVNpemVcIiBbY2xhc3MuZGlzYWJsZWRdPVwiZGlzYWJsZWRcIlxuICAgICAgICAgICAgW2Rpc2FibGVkXT1cImRpc2FibGVkXCI+XG4gICAgICAgICAgICA8c3BhbiBjbGFzcz1cImNoZXZyb24gYm90dG9tXCI+PC9zcGFuPlxuICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJzci1vbmx5XCIgaTE4bj1cIkBAbmdiLnRpbWVwaWNrZXIuZGVjcmVtZW50LWhvdXJzXCI+RGVjcmVtZW50IGhvdXJzPC9zcGFuPlxuICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICA8L2Rpdj5cbiAgICAgICAgPGRpdiBjbGFzcz1cIm5nYi10cC1zcGFjZXJcIj46PC9kaXY+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJuZ2ItdHAtaW5wdXQtY29udGFpbmVyIG5nYi10cC1taW51dGVcIj5cbiAgICAgICAgICA8YnV0dG9uICpuZ0lmPVwic3Bpbm5lcnNcIiB0eXBlPVwiYnV0dG9uXCIgKGNsaWNrKT1cImNoYW5nZU1pbnV0ZShtaW51dGVTdGVwKVwiXG4gICAgICAgICAgICBjbGFzcz1cImJ0biBidG4tbGlua1wiIFtjbGFzcy5idG4tc21dPVwiaXNTbWFsbFNpemVcIiBbY2xhc3MuYnRuLWxnXT1cImlzTGFyZ2VTaXplXCIgW2NsYXNzLmRpc2FibGVkXT1cImRpc2FibGVkXCJcbiAgICAgICAgICAgIFtkaXNhYmxlZF09XCJkaXNhYmxlZFwiPlxuICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJjaGV2cm9uXCI+PC9zcGFuPlxuICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJzci1vbmx5XCIgaTE4bj1cIkBAbmdiLnRpbWVwaWNrZXIuaW5jcmVtZW50LW1pbnV0ZXNcIj5JbmNyZW1lbnQgbWludXRlczwvc3Bhbj5cbiAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICA8aW5wdXQgdHlwZT1cInRleHRcIiBjbGFzcz1cImZvcm0tY29udHJvbFwiIFtjbGFzcy5mb3JtLWNvbnRyb2wtc21dPVwiaXNTbWFsbFNpemVcIiBbY2xhc3MuZm9ybS1jb250cm9sLWxnXT1cImlzTGFyZ2VTaXplXCIgbWF4bGVuZ3RoPVwiMlwiXG4gICAgICAgICAgICBwbGFjZWhvbGRlcj1cIk1NXCIgaTE4bi1wbGFjZWhvbGRlcj1cIkBAbmdiLnRpbWVwaWNrZXIuTU1cIlxuICAgICAgICAgICAgW3ZhbHVlXT1cImZvcm1hdE1pblNlYyhtb2RlbD8ubWludXRlKVwiIChjaGFuZ2UpPVwidXBkYXRlTWludXRlKCRldmVudC50YXJnZXQudmFsdWUpXCJcbiAgICAgICAgICAgIFtyZWFkb25seV09XCJyZWFkb25seUlucHV0c1wiIFtkaXNhYmxlZF09XCJkaXNhYmxlZFwiIGFyaWEtbGFiZWw9XCJNaW51dGVzXCIgaTE4bi1hcmlhLWxhYmVsPVwiQEBuZ2IudGltZXBpY2tlci5taW51dGVzXCI+XG4gICAgICAgICAgPGJ1dHRvbiAqbmdJZj1cInNwaW5uZXJzXCIgdHlwZT1cImJ1dHRvblwiIChjbGljayk9XCJjaGFuZ2VNaW51dGUoLW1pbnV0ZVN0ZXApXCJcbiAgICAgICAgICAgIGNsYXNzPVwiYnRuIGJ0bi1saW5rXCIgW2NsYXNzLmJ0bi1zbV09XCJpc1NtYWxsU2l6ZVwiIFtjbGFzcy5idG4tbGddPVwiaXNMYXJnZVNpemVcIiAgW2NsYXNzLmRpc2FibGVkXT1cImRpc2FibGVkXCJcbiAgICAgICAgICAgIFtkaXNhYmxlZF09XCJkaXNhYmxlZFwiPlxuICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJjaGV2cm9uIGJvdHRvbVwiPjwvc3Bhbj5cbiAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwic3Itb25seVwiICBpMThuPVwiQEBuZ2IudGltZXBpY2tlci5kZWNyZW1lbnQtbWludXRlc1wiPkRlY3JlbWVudCBtaW51dGVzPC9zcGFuPlxuICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICA8L2Rpdj5cbiAgICAgICAgPGRpdiAqbmdJZj1cInNlY29uZHNcIiBjbGFzcz1cIm5nYi10cC1zcGFjZXJcIj46PC9kaXY+XG4gICAgICAgIDxkaXYgKm5nSWY9XCJzZWNvbmRzXCIgY2xhc3M9XCJuZ2ItdHAtaW5wdXQtY29udGFpbmVyIG5nYi10cC1zZWNvbmRcIj5cbiAgICAgICAgICA8YnV0dG9uICpuZ0lmPVwic3Bpbm5lcnNcIiB0eXBlPVwiYnV0dG9uXCIgKGNsaWNrKT1cImNoYW5nZVNlY29uZChzZWNvbmRTdGVwKVwiXG4gICAgICAgICAgICBjbGFzcz1cImJ0biBidG4tbGlua1wiIFtjbGFzcy5idG4tc21dPVwiaXNTbWFsbFNpemVcIiBbY2xhc3MuYnRuLWxnXT1cImlzTGFyZ2VTaXplXCIgW2NsYXNzLmRpc2FibGVkXT1cImRpc2FibGVkXCJcbiAgICAgICAgICAgIFtkaXNhYmxlZF09XCJkaXNhYmxlZFwiPlxuICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJjaGV2cm9uXCI+PC9zcGFuPlxuICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJzci1vbmx5XCIgaTE4bj1cIkBAbmdiLnRpbWVwaWNrZXIuaW5jcmVtZW50LXNlY29uZHNcIj5JbmNyZW1lbnQgc2Vjb25kczwvc3Bhbj5cbiAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICA8aW5wdXQgdHlwZT1cInRleHRcIiBjbGFzcz1cImZvcm0tY29udHJvbFwiIFtjbGFzcy5mb3JtLWNvbnRyb2wtc21dPVwiaXNTbWFsbFNpemVcIiBbY2xhc3MuZm9ybS1jb250cm9sLWxnXT1cImlzTGFyZ2VTaXplXCIgbWF4bGVuZ3RoPVwiMlwiXG4gICAgICAgICAgICBwbGFjZWhvbGRlcj1cIlNTXCIgaTE4bi1wbGFjZWhvbGRlcj1cIkBAbmdiLnRpbWVwaWNrZXIuU1NcIlxuICAgICAgICAgICAgW3ZhbHVlXT1cImZvcm1hdE1pblNlYyhtb2RlbD8uc2Vjb25kKVwiIChjaGFuZ2UpPVwidXBkYXRlU2Vjb25kKCRldmVudC50YXJnZXQudmFsdWUpXCJcbiAgICAgICAgICAgIFtyZWFkb25seV09XCJyZWFkb25seUlucHV0c1wiIFtkaXNhYmxlZF09XCJkaXNhYmxlZFwiIGFyaWEtbGFiZWw9XCJTZWNvbmRzXCIgaTE4bi1hcmlhLWxhYmVsPVwiQEBuZ2IudGltZXBpY2tlci5zZWNvbmRzXCI+XG4gICAgICAgICAgPGJ1dHRvbiAqbmdJZj1cInNwaW5uZXJzXCIgdHlwZT1cImJ1dHRvblwiIChjbGljayk9XCJjaGFuZ2VTZWNvbmQoLXNlY29uZFN0ZXApXCJcbiAgICAgICAgICAgIGNsYXNzPVwiYnRuIGJ0bi1saW5rXCIgW2NsYXNzLmJ0bi1zbV09XCJpc1NtYWxsU2l6ZVwiIFtjbGFzcy5idG4tbGddPVwiaXNMYXJnZVNpemVcIiAgW2NsYXNzLmRpc2FibGVkXT1cImRpc2FibGVkXCJcbiAgICAgICAgICAgIFtkaXNhYmxlZF09XCJkaXNhYmxlZFwiPlxuICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJjaGV2cm9uIGJvdHRvbVwiPjwvc3Bhbj5cbiAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwic3Itb25seVwiIGkxOG49XCJAQG5nYi50aW1lcGlja2VyLmRlY3JlbWVudC1zZWNvbmRzXCI+RGVjcmVtZW50IHNlY29uZHM8L3NwYW4+XG4gICAgICAgICAgPC9idXR0b24+XG4gICAgICAgIDwvZGl2PlxuICAgICAgICA8ZGl2ICpuZ0lmPVwibWVyaWRpYW5cIiBjbGFzcz1cIm5nYi10cC1zcGFjZXJcIj48L2Rpdj5cbiAgICAgICAgPGRpdiAqbmdJZj1cIm1lcmlkaWFuXCIgY2xhc3M9XCJuZ2ItdHAtbWVyaWRpYW5cIj5cbiAgICAgICAgICA8YnV0dG9uIHR5cGU9XCJidXR0b25cIiBjbGFzcz1cImJ0biBidG4tb3V0bGluZS1wcmltYXJ5XCIgW2NsYXNzLmJ0bi1zbV09XCJpc1NtYWxsU2l6ZVwiIFtjbGFzcy5idG4tbGddPVwiaXNMYXJnZVNpemVcIlxuICAgICAgICAgICAgW2Rpc2FibGVkXT1cImRpc2FibGVkXCIgW2NsYXNzLmRpc2FibGVkXT1cImRpc2FibGVkXCJcbiAgICAgICAgICAgICAgICAgIChjbGljayk9XCJ0b2dnbGVNZXJpZGlhbigpXCI+XG4gICAgICAgICAgICA8bmctY29udGFpbmVyICpuZ0lmPVwibW9kZWw/LmhvdXIgPj0gMTI7IGVsc2UgYW1cIiBpMThuPVwiQEBuZ2IudGltZXBpY2tlci5QTVwiPlBNPC9uZy1jb250YWluZXI+XG4gICAgICAgICAgICA8bmctdGVtcGxhdGUgI2FtIGkxOG49XCJAQG5nYi50aW1lcGlja2VyLkFNXCI+QU08L25nLXRlbXBsYXRlPlxuICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvZGl2PlxuICAgIDwvZmllbGRzZXQ+XG4gIGAsXG4gIHByb3ZpZGVyczogW05HQl9USU1FUElDS0VSX1ZBTFVFX0FDQ0VTU09SXVxufSlcbmV4cG9ydCBjbGFzcyBOZ2JUaW1lcGlja2VyIGltcGxlbWVudHMgQ29udHJvbFZhbHVlQWNjZXNzb3IsXG4gICAgT25DaGFuZ2VzIHtcbiAgZGlzYWJsZWQ6IGJvb2xlYW47XG4gIG1vZGVsOiBOZ2JUaW1lO1xuXG4gIC8qKlxuICAgKiBXaGV0aGVyIHRvIGRpc3BsYXkgMTJIIG9yIDI0SCBtb2RlLlxuICAgKi9cbiAgQElucHV0KCkgbWVyaWRpYW46IGJvb2xlYW47XG5cbiAgLyoqXG4gICAqIFdoZXRoZXIgdG8gZGlzcGxheSB0aGUgc3Bpbm5lcnMgYWJvdmUgYW5kIGJlbG93IHRoZSBpbnB1dHMuXG4gICAqL1xuICBASW5wdXQoKSBzcGlubmVyczogYm9vbGVhbjtcblxuICAvKipcbiAgICogV2hldGhlciB0byBkaXNwbGF5IHNlY29uZHMgaW5wdXQuXG4gICAqL1xuICBASW5wdXQoKSBzZWNvbmRzOiBib29sZWFuO1xuXG4gIC8qKlxuICAgKiBOdW1iZXIgb2YgaG91cnMgdG8gaW5jcmVhc2Ugb3IgZGVjcmVhc2Ugd2hlbiB1c2luZyBhIGJ1dHRvbi5cbiAgICovXG4gIEBJbnB1dCgpIGhvdXJTdGVwOiBudW1iZXI7XG5cbiAgLyoqXG4gICAqIE51bWJlciBvZiBtaW51dGVzIHRvIGluY3JlYXNlIG9yIGRlY3JlYXNlIHdoZW4gdXNpbmcgYSBidXR0b24uXG4gICAqL1xuICBASW5wdXQoKSBtaW51dGVTdGVwOiBudW1iZXI7XG5cbiAgLyoqXG4gICAqIE51bWJlciBvZiBzZWNvbmRzIHRvIGluY3JlYXNlIG9yIGRlY3JlYXNlIHdoZW4gdXNpbmcgYSBidXR0b24uXG4gICAqL1xuICBASW5wdXQoKSBzZWNvbmRTdGVwOiBudW1iZXI7XG5cbiAgLyoqXG4gICAqIFRvIG1ha2UgdGltZXBpY2tlciByZWFkb25seVxuICAgKi9cbiAgQElucHV0KCkgcmVhZG9ubHlJbnB1dHM6IGJvb2xlYW47XG5cbiAgLyoqXG4gICAqIFRvIHNldCB0aGUgc2l6ZSBvZiB0aGUgaW5wdXRzIGFuZCBidXR0b25cbiAgICovXG4gIEBJbnB1dCgpIHNpemU6ICdzbWFsbCcgfCAnbWVkaXVtJyB8ICdsYXJnZSc7XG5cbiAgY29uc3RydWN0b3IoY29uZmlnOiBOZ2JUaW1lcGlja2VyQ29uZmlnLCBwcml2YXRlIF9uZ2JUaW1lQWRhcHRlcjogTmdiVGltZUFkYXB0ZXI8YW55Pikge1xuICAgIHRoaXMubWVyaWRpYW4gPSBjb25maWcubWVyaWRpYW47XG4gICAgdGhpcy5zcGlubmVycyA9IGNvbmZpZy5zcGlubmVycztcbiAgICB0aGlzLnNlY29uZHMgPSBjb25maWcuc2Vjb25kcztcbiAgICB0aGlzLmhvdXJTdGVwID0gY29uZmlnLmhvdXJTdGVwO1xuICAgIHRoaXMubWludXRlU3RlcCA9IGNvbmZpZy5taW51dGVTdGVwO1xuICAgIHRoaXMuc2Vjb25kU3RlcCA9IGNvbmZpZy5zZWNvbmRTdGVwO1xuICAgIHRoaXMuZGlzYWJsZWQgPSBjb25maWcuZGlzYWJsZWQ7XG4gICAgdGhpcy5yZWFkb25seUlucHV0cyA9IGNvbmZpZy5yZWFkb25seUlucHV0cztcbiAgICB0aGlzLnNpemUgPSBjb25maWcuc2l6ZTtcbiAgfVxuXG4gIG9uQ2hhbmdlID0gKF86IGFueSkgPT4ge307XG4gIG9uVG91Y2hlZCA9ICgpID0+IHt9O1xuXG4gIHdyaXRlVmFsdWUodmFsdWUpIHtcbiAgICBjb25zdCBzdHJ1Y3RWYWx1ZSA9IHRoaXMuX25nYlRpbWVBZGFwdGVyLmZyb21Nb2RlbCh2YWx1ZSk7XG4gICAgdGhpcy5tb2RlbCA9IHN0cnVjdFZhbHVlID8gbmV3IE5nYlRpbWUoc3RydWN0VmFsdWUuaG91ciwgc3RydWN0VmFsdWUubWludXRlLCBzdHJ1Y3RWYWx1ZS5zZWNvbmQpIDogbmV3IE5nYlRpbWUoKTtcbiAgICBpZiAoIXRoaXMuc2Vjb25kcyAmJiAoIXN0cnVjdFZhbHVlIHx8ICFpc051bWJlcihzdHJ1Y3RWYWx1ZS5zZWNvbmQpKSkge1xuICAgICAgdGhpcy5tb2RlbC5zZWNvbmQgPSAwO1xuICAgIH1cbiAgfVxuXG4gIHJlZ2lzdGVyT25DaGFuZ2UoZm46ICh2YWx1ZTogYW55KSA9PiBhbnkpOiB2b2lkIHsgdGhpcy5vbkNoYW5nZSA9IGZuOyB9XG5cbiAgcmVnaXN0ZXJPblRvdWNoZWQoZm46ICgpID0+IGFueSk6IHZvaWQgeyB0aGlzLm9uVG91Y2hlZCA9IGZuOyB9XG5cbiAgc2V0RGlzYWJsZWRTdGF0ZShpc0Rpc2FibGVkOiBib29sZWFuKSB7IHRoaXMuZGlzYWJsZWQgPSBpc0Rpc2FibGVkOyB9XG5cbiAgY2hhbmdlSG91cihzdGVwOiBudW1iZXIpIHtcbiAgICB0aGlzLm1vZGVsLmNoYW5nZUhvdXIoc3RlcCk7XG4gICAgdGhpcy5wcm9wYWdhdGVNb2RlbENoYW5nZSgpO1xuICB9XG5cbiAgY2hhbmdlTWludXRlKHN0ZXA6IG51bWJlcikge1xuICAgIHRoaXMubW9kZWwuY2hhbmdlTWludXRlKHN0ZXApO1xuICAgIHRoaXMucHJvcGFnYXRlTW9kZWxDaGFuZ2UoKTtcbiAgfVxuXG4gIGNoYW5nZVNlY29uZChzdGVwOiBudW1iZXIpIHtcbiAgICB0aGlzLm1vZGVsLmNoYW5nZVNlY29uZChzdGVwKTtcbiAgICB0aGlzLnByb3BhZ2F0ZU1vZGVsQ2hhbmdlKCk7XG4gIH1cblxuICB1cGRhdGVIb3VyKG5ld1ZhbDogc3RyaW5nKSB7XG4gICAgY29uc3QgaXNQTSA9IHRoaXMubW9kZWwuaG91ciA+PSAxMjtcbiAgICBjb25zdCBlbnRlcmVkSG91ciA9IHRvSW50ZWdlcihuZXdWYWwpO1xuICAgIGlmICh0aGlzLm1lcmlkaWFuICYmIChpc1BNICYmIGVudGVyZWRIb3VyIDwgMTIgfHwgIWlzUE0gJiYgZW50ZXJlZEhvdXIgPT09IDEyKSkge1xuICAgICAgdGhpcy5tb2RlbC51cGRhdGVIb3VyKGVudGVyZWRIb3VyICsgMTIpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLm1vZGVsLnVwZGF0ZUhvdXIoZW50ZXJlZEhvdXIpO1xuICAgIH1cbiAgICB0aGlzLnByb3BhZ2F0ZU1vZGVsQ2hhbmdlKCk7XG4gIH1cblxuICB1cGRhdGVNaW51dGUobmV3VmFsOiBzdHJpbmcpIHtcbiAgICB0aGlzLm1vZGVsLnVwZGF0ZU1pbnV0ZSh0b0ludGVnZXIobmV3VmFsKSk7XG4gICAgdGhpcy5wcm9wYWdhdGVNb2RlbENoYW5nZSgpO1xuICB9XG5cbiAgdXBkYXRlU2Vjb25kKG5ld1ZhbDogc3RyaW5nKSB7XG4gICAgdGhpcy5tb2RlbC51cGRhdGVTZWNvbmQodG9JbnRlZ2VyKG5ld1ZhbCkpO1xuICAgIHRoaXMucHJvcGFnYXRlTW9kZWxDaGFuZ2UoKTtcbiAgfVxuXG4gIHRvZ2dsZU1lcmlkaWFuKCkge1xuICAgIGlmICh0aGlzLm1lcmlkaWFuKSB7XG4gICAgICB0aGlzLmNoYW5nZUhvdXIoMTIpO1xuICAgIH1cbiAgfVxuXG4gIGZvcm1hdEhvdXIodmFsdWU6IG51bWJlcikge1xuICAgIGlmIChpc051bWJlcih2YWx1ZSkpIHtcbiAgICAgIGlmICh0aGlzLm1lcmlkaWFuKSB7XG4gICAgICAgIHJldHVybiBwYWROdW1iZXIodmFsdWUgJSAxMiA9PT0gMCA/IDEyIDogdmFsdWUgJSAxMik7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZXR1cm4gcGFkTnVtYmVyKHZhbHVlICUgMjQpO1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gcGFkTnVtYmVyKE5hTik7XG4gICAgfVxuICB9XG5cbiAgZm9ybWF0TWluU2VjKHZhbHVlOiBudW1iZXIpIHsgcmV0dXJuIHBhZE51bWJlcih2YWx1ZSk7IH1cblxuICBnZXQgaXNTbWFsbFNpemUoKTogYm9vbGVhbiB7IHJldHVybiB0aGlzLnNpemUgPT09ICdzbWFsbCc7IH1cblxuICBnZXQgaXNMYXJnZVNpemUoKTogYm9vbGVhbiB7IHJldHVybiB0aGlzLnNpemUgPT09ICdsYXJnZSc7IH1cblxuICBuZ09uQ2hhbmdlcyhjaGFuZ2VzOiBTaW1wbGVDaGFuZ2VzKTogdm9pZCB7XG4gICAgaWYgKGNoYW5nZXNbJ3NlY29uZHMnXSAmJiAhdGhpcy5zZWNvbmRzICYmIHRoaXMubW9kZWwgJiYgIWlzTnVtYmVyKHRoaXMubW9kZWwuc2Vjb25kKSkge1xuICAgICAgdGhpcy5tb2RlbC5zZWNvbmQgPSAwO1xuICAgICAgdGhpcy5wcm9wYWdhdGVNb2RlbENoYW5nZShmYWxzZSk7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBwcm9wYWdhdGVNb2RlbENoYW5nZSh0b3VjaGVkID0gdHJ1ZSkge1xuICAgIGlmICh0b3VjaGVkKSB7XG4gICAgICB0aGlzLm9uVG91Y2hlZCgpO1xuICAgIH1cbiAgICBpZiAodGhpcy5tb2RlbC5pc1ZhbGlkKHRoaXMuc2Vjb25kcykpIHtcbiAgICAgIHRoaXMub25DaGFuZ2UoXG4gICAgICAgICAgdGhpcy5fbmdiVGltZUFkYXB0ZXIudG9Nb2RlbCh7aG91cjogdGhpcy5tb2RlbC5ob3VyLCBtaW51dGU6IHRoaXMubW9kZWwubWludXRlLCBzZWNvbmQ6IHRoaXMubW9kZWwuc2Vjb25kfSkpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLm9uQ2hhbmdlKHRoaXMuX25nYlRpbWVBZGFwdGVyLnRvTW9kZWwobnVsbCkpO1xuICAgIH1cbiAgfVxufVxuIl19