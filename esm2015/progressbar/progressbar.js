/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { getValueInRange } from '../util/util';
import { NgbProgressbarConfig } from './progressbar-config';
/**
 * Directive that can be used to provide feedback on the progress of a workflow or an action.
 */
export class NgbProgressbar {
    /**
     * @param {?} config
     */
    constructor(config) {
        /**
         * Current value to be displayed in the progressbar. Should be smaller or equal to "max" value.
         */
        this.value = 0;
        this.max = config.max;
        this.animated = config.animated;
        this.striped = config.striped;
        this.type = config.type;
        this.showValue = config.showValue;
        this.height = config.height;
    }
    /**
     * @return {?}
     */
    getValue() { return getValueInRange(this.value, this.max); }
    /**
     * @return {?}
     */
    getPercentValue() { return 100 * this.getValue() / this.max; }
}
NgbProgressbar.decorators = [
    { type: Component, args: [{
                selector: 'ngb-progressbar',
                changeDetection: ChangeDetectionStrategy.OnPush,
                template: `
    <div class="progress" [style.height]="height">
      <div class="progress-bar{{type ? ' bg-' + type : ''}}{{animated ? ' progress-bar-animated' : ''}}{{striped ?
    ' progress-bar-striped' : ''}}" role="progressbar" [style.width.%]="getPercentValue()"
    [attr.aria-valuenow]="getValue()" aria-valuemin="0" [attr.aria-valuemax]="max">
        <span *ngIf="showValue" i18n="@@ngb.progressbar.value">{{getPercentValue()}}%</span><ng-content></ng-content>
      </div>
    </div>
  `
            },] },
];
/** @nocollapse */
NgbProgressbar.ctorParameters = () => [
    { type: NgbProgressbarConfig }
];
NgbProgressbar.propDecorators = {
    max: [{ type: Input }],
    animated: [{ type: Input }],
    striped: [{ type: Input }],
    showValue: [{ type: Input }],
    type: [{ type: Input }],
    value: [{ type: Input }],
    height: [{ type: Input }]
};
if (false) {
    /**
     * Maximal value to be displayed in the progressbar.
     * @type {?}
     */
    NgbProgressbar.prototype.max;
    /**
     * A flag indicating if the stripes of the progress bar should be animated. Takes effect only for browsers
     * supporting CSS3 animations, and if striped is true.
     * @type {?}
     */
    NgbProgressbar.prototype.animated;
    /**
     * A flag indicating if a progress bar should be displayed as striped.
     * @type {?}
     */
    NgbProgressbar.prototype.striped;
    /**
     * A flag indicating if the current percentage value should be shown.
     * @type {?}
     */
    NgbProgressbar.prototype.showValue;
    /**
     * Type of progress bar, can be one of "success", "info", "warning" or "danger".
     * @type {?}
     */
    NgbProgressbar.prototype.type;
    /**
     * Current value to be displayed in the progressbar. Should be smaller or equal to "max" value.
     * @type {?}
     */
    NgbProgressbar.prototype.value;
    /**
     * Height of the progress bar. Accepts any valid CSS height values, ex. '2rem'
     * @type {?}
     */
    NgbProgressbar.prototype.height;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJvZ3Jlc3NiYXIuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AbmctYm9vdHN0cmFwL25nLWJvb3RzdHJhcC8iLCJzb3VyY2VzIjpbInByb2dyZXNzYmFyL3Byb2dyZXNzYmFyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUMsU0FBUyxFQUFFLEtBQUssRUFBRSx1QkFBdUIsRUFBQyxNQUFNLGVBQWUsQ0FBQztBQUN4RSxPQUFPLEVBQUMsZUFBZSxFQUFDLE1BQU0sY0FBYyxDQUFDO0FBQzdDLE9BQU8sRUFBQyxvQkFBb0IsRUFBQyxNQUFNLHNCQUFzQixDQUFDOzs7O0FBa0IxRCxNQUFNOzs7O0lBcUNKLFlBQVksTUFBNEI7Ozs7cUJBUHZCLENBQUM7UUFRaEIsSUFBSSxDQUFDLEdBQUcsR0FBRyxNQUFNLENBQUMsR0FBRyxDQUFDO1FBQ3RCLElBQUksQ0FBQyxRQUFRLEdBQUcsTUFBTSxDQUFDLFFBQVEsQ0FBQztRQUNoQyxJQUFJLENBQUMsT0FBTyxHQUFHLE1BQU0sQ0FBQyxPQUFPLENBQUM7UUFDOUIsSUFBSSxDQUFDLElBQUksR0FBRyxNQUFNLENBQUMsSUFBSSxDQUFDO1FBQ3hCLElBQUksQ0FBQyxTQUFTLEdBQUcsTUFBTSxDQUFDLFNBQVMsQ0FBQztRQUNsQyxJQUFJLENBQUMsTUFBTSxHQUFHLE1BQU0sQ0FBQyxNQUFNLENBQUM7S0FDN0I7Ozs7SUFFRCxRQUFRLEtBQUssTUFBTSxDQUFDLGVBQWUsQ0FBQyxJQUFJLENBQUMsS0FBSyxFQUFFLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxFQUFFOzs7O0lBRTVELGVBQWUsS0FBSyxNQUFNLENBQUMsR0FBRyxHQUFHLElBQUksQ0FBQyxRQUFRLEVBQUUsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUU7OztZQTdEL0QsU0FBUyxTQUFDO2dCQUNULFFBQVEsRUFBRSxpQkFBaUI7Z0JBQzNCLGVBQWUsRUFBRSx1QkFBdUIsQ0FBQyxNQUFNO2dCQUMvQyxRQUFRLEVBQUU7Ozs7Ozs7O0dBUVQ7YUFDRjs7OztZQWpCTyxvQkFBb0I7OztrQkFzQnpCLEtBQUs7dUJBTUwsS0FBSztzQkFLTCxLQUFLO3dCQUtMLEtBQUs7bUJBS0wsS0FBSztvQkFLTCxLQUFLO3FCQUtMLEtBQUsiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge0NvbXBvbmVudCwgSW5wdXQsIENoYW5nZURldGVjdGlvblN0cmF0ZWd5fSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHtnZXRWYWx1ZUluUmFuZ2V9IGZyb20gJy4uL3V0aWwvdXRpbCc7XHJcbmltcG9ydCB7TmdiUHJvZ3Jlc3NiYXJDb25maWd9IGZyb20gJy4vcHJvZ3Jlc3NiYXItY29uZmlnJztcclxuXHJcbi8qKlxyXG4gKiBEaXJlY3RpdmUgdGhhdCBjYW4gYmUgdXNlZCB0byBwcm92aWRlIGZlZWRiYWNrIG9uIHRoZSBwcm9ncmVzcyBvZiBhIHdvcmtmbG93IG9yIGFuIGFjdGlvbi5cclxuICovXHJcbkBDb21wb25lbnQoe1xyXG4gIHNlbGVjdG9yOiAnbmdiLXByb2dyZXNzYmFyJyxcclxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaCxcclxuICB0ZW1wbGF0ZTogYFxyXG4gICAgPGRpdiBjbGFzcz1cInByb2dyZXNzXCIgW3N0eWxlLmhlaWdodF09XCJoZWlnaHRcIj5cclxuICAgICAgPGRpdiBjbGFzcz1cInByb2dyZXNzLWJhcnt7dHlwZSA/ICcgYmctJyArIHR5cGUgOiAnJ319e3thbmltYXRlZCA/ICcgcHJvZ3Jlc3MtYmFyLWFuaW1hdGVkJyA6ICcnfX17e3N0cmlwZWQgP1xyXG4gICAgJyBwcm9ncmVzcy1iYXItc3RyaXBlZCcgOiAnJ319XCIgcm9sZT1cInByb2dyZXNzYmFyXCIgW3N0eWxlLndpZHRoLiVdPVwiZ2V0UGVyY2VudFZhbHVlKClcIlxyXG4gICAgW2F0dHIuYXJpYS12YWx1ZW5vd109XCJnZXRWYWx1ZSgpXCIgYXJpYS12YWx1ZW1pbj1cIjBcIiBbYXR0ci5hcmlhLXZhbHVlbWF4XT1cIm1heFwiPlxyXG4gICAgICAgIDxzcGFuICpuZ0lmPVwic2hvd1ZhbHVlXCIgaTE4bj1cIkBAbmdiLnByb2dyZXNzYmFyLnZhbHVlXCI+e3tnZXRQZXJjZW50VmFsdWUoKX19JTwvc3Bhbj48bmctY29udGVudD48L25nLWNvbnRlbnQ+XHJcbiAgICAgIDwvZGl2PlxyXG4gICAgPC9kaXY+XHJcbiAgYFxyXG59KVxyXG5leHBvcnQgY2xhc3MgTmdiUHJvZ3Jlc3NiYXIge1xyXG4gIC8qKlxyXG4gICAqIE1heGltYWwgdmFsdWUgdG8gYmUgZGlzcGxheWVkIGluIHRoZSBwcm9ncmVzc2Jhci5cclxuICAgKi9cclxuICBASW5wdXQoKSBtYXg6IG51bWJlcjtcclxuXHJcbiAgLyoqXHJcbiAgICogQSBmbGFnIGluZGljYXRpbmcgaWYgdGhlIHN0cmlwZXMgb2YgdGhlIHByb2dyZXNzIGJhciBzaG91bGQgYmUgYW5pbWF0ZWQuIFRha2VzIGVmZmVjdCBvbmx5IGZvciBicm93c2Vyc1xyXG4gICAqIHN1cHBvcnRpbmcgQ1NTMyBhbmltYXRpb25zLCBhbmQgaWYgc3RyaXBlZCBpcyB0cnVlLlxyXG4gICAqL1xyXG4gIEBJbnB1dCgpIGFuaW1hdGVkOiBib29sZWFuO1xyXG5cclxuICAvKipcclxuICAgKiBBIGZsYWcgaW5kaWNhdGluZyBpZiBhIHByb2dyZXNzIGJhciBzaG91bGQgYmUgZGlzcGxheWVkIGFzIHN0cmlwZWQuXHJcbiAgICovXHJcbiAgQElucHV0KCkgc3RyaXBlZDogYm9vbGVhbjtcclxuXHJcbiAgLyoqXHJcbiAgICogQSBmbGFnIGluZGljYXRpbmcgaWYgdGhlIGN1cnJlbnQgcGVyY2VudGFnZSB2YWx1ZSBzaG91bGQgYmUgc2hvd24uXHJcbiAgICovXHJcbiAgQElucHV0KCkgc2hvd1ZhbHVlOiBib29sZWFuO1xyXG5cclxuICAvKipcclxuICAgKiBUeXBlIG9mIHByb2dyZXNzIGJhciwgY2FuIGJlIG9uZSBvZiBcInN1Y2Nlc3NcIiwgXCJpbmZvXCIsIFwid2FybmluZ1wiIG9yIFwiZGFuZ2VyXCIuXHJcbiAgICovXHJcbiAgQElucHV0KCkgdHlwZTogc3RyaW5nO1xyXG5cclxuICAvKipcclxuICAgKiBDdXJyZW50IHZhbHVlIHRvIGJlIGRpc3BsYXllZCBpbiB0aGUgcHJvZ3Jlc3NiYXIuIFNob3VsZCBiZSBzbWFsbGVyIG9yIGVxdWFsIHRvIFwibWF4XCIgdmFsdWUuXHJcbiAgICovXHJcbiAgQElucHV0KCkgdmFsdWUgPSAwO1xyXG5cclxuICAvKipcclxuICAgKiBIZWlnaHQgb2YgdGhlIHByb2dyZXNzIGJhci4gQWNjZXB0cyBhbnkgdmFsaWQgQ1NTIGhlaWdodCB2YWx1ZXMsIGV4LiAnMnJlbSdcclxuICAgKi9cclxuICBASW5wdXQoKSBoZWlnaHQ6IHN0cmluZztcclxuXHJcbiAgY29uc3RydWN0b3IoY29uZmlnOiBOZ2JQcm9ncmVzc2JhckNvbmZpZykge1xyXG4gICAgdGhpcy5tYXggPSBjb25maWcubWF4O1xyXG4gICAgdGhpcy5hbmltYXRlZCA9IGNvbmZpZy5hbmltYXRlZDtcclxuICAgIHRoaXMuc3RyaXBlZCA9IGNvbmZpZy5zdHJpcGVkO1xyXG4gICAgdGhpcy50eXBlID0gY29uZmlnLnR5cGU7XHJcbiAgICB0aGlzLnNob3dWYWx1ZSA9IGNvbmZpZy5zaG93VmFsdWU7XHJcbiAgICB0aGlzLmhlaWdodCA9IGNvbmZpZy5oZWlnaHQ7XHJcbiAgfVxyXG5cclxuICBnZXRWYWx1ZSgpIHsgcmV0dXJuIGdldFZhbHVlSW5SYW5nZSh0aGlzLnZhbHVlLCB0aGlzLm1heCk7IH1cclxuXHJcbiAgZ2V0UGVyY2VudFZhbHVlKCkgeyByZXR1cm4gMTAwICogdGhpcy5nZXRWYWx1ZSgpIC8gdGhpcy5tYXg7IH1cclxufVxyXG4iXX0=