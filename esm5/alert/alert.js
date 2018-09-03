/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy, Renderer2, ElementRef } from '@angular/core';
import { NgbAlertConfig } from './alert-config';
/**
 * Alerts can be used to provide feedback messages.
 */
var NgbAlert = /** @class */ (function () {
    function NgbAlert(config, _renderer, _element) {
        this._renderer = _renderer;
        this._element = _element;
        /**
         * An event emitted when the close button is clicked. This event has no payload. Only relevant for dismissible alerts.
         */
        this.close = new EventEmitter();
        this.dismissible = config.dismissible;
        this.type = config.type;
    }
    /**
     * @return {?}
     */
    NgbAlert.prototype.closeHandler = /**
     * @return {?}
     */
    function () { this.close.emit(null); };
    /**
     * @param {?} changes
     * @return {?}
     */
    NgbAlert.prototype.ngOnChanges = /**
     * @param {?} changes
     * @return {?}
     */
    function (changes) {
        /** @type {?} */
        var typeChange = changes['type'];
        if (typeChange && !typeChange.firstChange) {
            this._renderer.removeClass(this._element.nativeElement, "alert-" + typeChange.previousValue);
            this._renderer.addClass(this._element.nativeElement, "alert-" + typeChange.currentValue);
        }
    };
    /**
     * @return {?}
     */
    NgbAlert.prototype.ngOnInit = /**
     * @return {?}
     */
    function () { this._renderer.addClass(this._element.nativeElement, "alert-" + this.type); };
    NgbAlert.decorators = [
        { type: Component, args: [{
                    selector: 'ngb-alert',
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    host: { 'role': 'alert', 'class': 'alert', '[class.alert-dismissible]': 'dismissible' },
                    template: "\n    <button *ngIf=\"dismissible\" type=\"button\" class=\"close\" aria-label=\"Close\" i18n-aria-label=\"@@ngb.alert.close\"\n      (click)=\"closeHandler()\">\n      <span aria-hidden=\"true\">&times;</span>\n    </button>\n    <ng-content></ng-content>\n    ",
                    styles: ["\n    :host {\n      display: block;\n    }\n  "]
                },] },
    ];
    /** @nocollapse */
    NgbAlert.ctorParameters = function () { return [
        { type: NgbAlertConfig },
        { type: Renderer2 },
        { type: ElementRef }
    ]; };
    NgbAlert.propDecorators = {
        dismissible: [{ type: Input }],
        type: [{ type: Input }],
        close: [{ type: Output }]
    };
    return NgbAlert;
}());
export { NgbAlert };
if (false) {
    /**
     * A flag indicating if a given alert can be dismissed (closed) by a user. If this flag is set, a close button (in a
     * form of an ×) will be displayed.
     * @type {?}
     */
    NgbAlert.prototype.dismissible;
    /**
     * Alert type (CSS class). Bootstrap 4 recognizes the following types: "success", "info", "warning", "danger",
     * "primary", "secondary", "light", "dark".
     * @type {?}
     */
    NgbAlert.prototype.type;
    /**
     * An event emitted when the close button is clicked. This event has no payload. Only relevant for dismissible alerts.
     * @type {?}
     */
    NgbAlert.prototype.close;
    /** @type {?} */
    NgbAlert.prototype._renderer;
    /** @type {?} */
    NgbAlert.prototype._element;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWxlcnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AbmctYm9vdHN0cmFwL25nLWJvb3RzdHJhcC8iLCJzb3VyY2VzIjpbImFsZXJ0L2FsZXJ0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQ0wsU0FBUyxFQUNULEtBQUssRUFDTCxNQUFNLEVBQ04sWUFBWSxFQUNaLHVCQUF1QixFQUN2QixTQUFTLEVBQ1QsVUFBVSxFQUlYLE1BQU0sZUFBZSxDQUFDO0FBRXZCLE9BQU8sRUFBQyxjQUFjLEVBQUMsTUFBTSxnQkFBZ0IsQ0FBQzs7Ozs7SUF1QzVDLGtCQUFZLE1BQXNCLEVBQVUsU0FBb0IsRUFBVSxRQUFvQjtRQUFsRCxjQUFTLEdBQVQsU0FBUyxDQUFXO1FBQVUsYUFBUSxHQUFSLFFBQVEsQ0FBWTs7OztxQkFGNUUsSUFBSSxZQUFZLEVBQVE7UUFHeEMsSUFBSSxDQUFDLFdBQVcsR0FBRyxNQUFNLENBQUMsV0FBVyxDQUFDO1FBQ3RDLElBQUksQ0FBQyxJQUFJLEdBQUcsTUFBTSxDQUFDLElBQUksQ0FBQztLQUN6Qjs7OztJQUVELCtCQUFZOzs7SUFBWixjQUFpQixJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxFQUFFOzs7OztJQUV6Qyw4QkFBVzs7OztJQUFYLFVBQVksT0FBc0I7O1FBQ2hDLElBQU0sVUFBVSxHQUFHLE9BQU8sQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUNuQyxFQUFFLENBQUMsQ0FBQyxVQUFVLElBQUksQ0FBQyxVQUFVLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQztZQUMxQyxJQUFJLENBQUMsU0FBUyxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLGFBQWEsRUFBRSxXQUFTLFVBQVUsQ0FBQyxhQUFlLENBQUMsQ0FBQztZQUM3RixJQUFJLENBQUMsU0FBUyxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLGFBQWEsRUFBRSxXQUFTLFVBQVUsQ0FBQyxZQUFjLENBQUMsQ0FBQztTQUMxRjtLQUNGOzs7O0lBRUQsMkJBQVE7OztJQUFSLGNBQWEsSUFBSSxDQUFDLFNBQVMsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxhQUFhLEVBQUUsV0FBUyxJQUFJLENBQUMsSUFBTSxDQUFDLENBQUMsRUFBRTs7Z0JBakQzRixTQUFTLFNBQUM7b0JBQ1QsUUFBUSxFQUFFLFdBQVc7b0JBQ3JCLGVBQWUsRUFBRSx1QkFBdUIsQ0FBQyxNQUFNO29CQUMvQyxJQUFJLEVBQUUsRUFBQyxNQUFNLEVBQUUsT0FBTyxFQUFFLE9BQU8sRUFBRSxPQUFPLEVBQUUsMkJBQTJCLEVBQUUsYUFBYSxFQUFDO29CQUNyRixRQUFRLEVBQUUsd1FBTVA7b0JBQ0gsTUFBTSxFQUFFLENBQUMsaURBSVIsQ0FBQztpQkFDSDs7OztnQkFyQk8sY0FBYztnQkFQcEIsU0FBUztnQkFDVCxVQUFVOzs7OEJBa0NULEtBQUs7dUJBS0wsS0FBSzt3QkFJTCxNQUFNOzttQkFsRFQ7O1NBbUNhLFFBQVEiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xyXG4gIENvbXBvbmVudCxcclxuICBJbnB1dCxcclxuICBPdXRwdXQsXHJcbiAgRXZlbnRFbWl0dGVyLFxyXG4gIENoYW5nZURldGVjdGlvblN0cmF0ZWd5LFxyXG4gIFJlbmRlcmVyMixcclxuICBFbGVtZW50UmVmLFxyXG4gIE9uQ2hhbmdlcyxcclxuICBPbkluaXQsXHJcbiAgU2ltcGxlQ2hhbmdlc1xyXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5cclxuaW1wb3J0IHtOZ2JBbGVydENvbmZpZ30gZnJvbSAnLi9hbGVydC1jb25maWcnO1xyXG5cclxuLyoqXHJcbiAqIEFsZXJ0cyBjYW4gYmUgdXNlZCB0byBwcm92aWRlIGZlZWRiYWNrIG1lc3NhZ2VzLlxyXG4gKi9cclxuQENvbXBvbmVudCh7XHJcbiAgc2VsZWN0b3I6ICduZ2ItYWxlcnQnLFxyXG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoLFxyXG4gIGhvc3Q6IHsncm9sZSc6ICdhbGVydCcsICdjbGFzcyc6ICdhbGVydCcsICdbY2xhc3MuYWxlcnQtZGlzbWlzc2libGVdJzogJ2Rpc21pc3NpYmxlJ30sXHJcbiAgdGVtcGxhdGU6IGBcclxuICAgIDxidXR0b24gKm5nSWY9XCJkaXNtaXNzaWJsZVwiIHR5cGU9XCJidXR0b25cIiBjbGFzcz1cImNsb3NlXCIgYXJpYS1sYWJlbD1cIkNsb3NlXCIgaTE4bi1hcmlhLWxhYmVsPVwiQEBuZ2IuYWxlcnQuY2xvc2VcIlxyXG4gICAgICAoY2xpY2spPVwiY2xvc2VIYW5kbGVyKClcIj5cclxuICAgICAgPHNwYW4gYXJpYS1oaWRkZW49XCJ0cnVlXCI+JnRpbWVzOzwvc3Bhbj5cclxuICAgIDwvYnV0dG9uPlxyXG4gICAgPG5nLWNvbnRlbnQ+PC9uZy1jb250ZW50PlxyXG4gICAgYCxcclxuICBzdHlsZXM6IFtgXHJcbiAgICA6aG9zdCB7XHJcbiAgICAgIGRpc3BsYXk6IGJsb2NrO1xyXG4gICAgfVxyXG4gIGBdXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBOZ2JBbGVydCBpbXBsZW1lbnRzIE9uSW5pdCxcclxuICAgIE9uQ2hhbmdlcyB7XHJcbiAgLyoqXHJcbiAgICogQSBmbGFnIGluZGljYXRpbmcgaWYgYSBnaXZlbiBhbGVydCBjYW4gYmUgZGlzbWlzc2VkIChjbG9zZWQpIGJ5IGEgdXNlci4gSWYgdGhpcyBmbGFnIGlzIHNldCwgYSBjbG9zZSBidXR0b24gKGluIGFcclxuICAgKiBmb3JtIG9mIGFuIMOXKSB3aWxsIGJlIGRpc3BsYXllZC5cclxuICAgKi9cclxuICBASW5wdXQoKSBkaXNtaXNzaWJsZTogYm9vbGVhbjtcclxuICAvKipcclxuICAgKiBBbGVydCB0eXBlIChDU1MgY2xhc3MpLiBCb290c3RyYXAgNCByZWNvZ25pemVzIHRoZSBmb2xsb3dpbmcgdHlwZXM6IFwic3VjY2Vzc1wiLCBcImluZm9cIiwgXCJ3YXJuaW5nXCIsIFwiZGFuZ2VyXCIsXHJcbiAgICogXCJwcmltYXJ5XCIsIFwic2Vjb25kYXJ5XCIsIFwibGlnaHRcIiwgXCJkYXJrXCIuXHJcbiAgICovXHJcbiAgQElucHV0KCkgdHlwZTogc3RyaW5nO1xyXG4gIC8qKlxyXG4gICAqIEFuIGV2ZW50IGVtaXR0ZWQgd2hlbiB0aGUgY2xvc2UgYnV0dG9uIGlzIGNsaWNrZWQuIFRoaXMgZXZlbnQgaGFzIG5vIHBheWxvYWQuIE9ubHkgcmVsZXZhbnQgZm9yIGRpc21pc3NpYmxlIGFsZXJ0cy5cclxuICAgKi9cclxuICBAT3V0cHV0KCkgY2xvc2UgPSBuZXcgRXZlbnRFbWl0dGVyPHZvaWQ+KCk7XHJcblxyXG4gIGNvbnN0cnVjdG9yKGNvbmZpZzogTmdiQWxlcnRDb25maWcsIHByaXZhdGUgX3JlbmRlcmVyOiBSZW5kZXJlcjIsIHByaXZhdGUgX2VsZW1lbnQ6IEVsZW1lbnRSZWYpIHtcclxuICAgIHRoaXMuZGlzbWlzc2libGUgPSBjb25maWcuZGlzbWlzc2libGU7XHJcbiAgICB0aGlzLnR5cGUgPSBjb25maWcudHlwZTtcclxuICB9XHJcblxyXG4gIGNsb3NlSGFuZGxlcigpIHsgdGhpcy5jbG9zZS5lbWl0KG51bGwpOyB9XHJcblxyXG4gIG5nT25DaGFuZ2VzKGNoYW5nZXM6IFNpbXBsZUNoYW5nZXMpIHtcclxuICAgIGNvbnN0IHR5cGVDaGFuZ2UgPSBjaGFuZ2VzWyd0eXBlJ107XHJcbiAgICBpZiAodHlwZUNoYW5nZSAmJiAhdHlwZUNoYW5nZS5maXJzdENoYW5nZSkge1xyXG4gICAgICB0aGlzLl9yZW5kZXJlci5yZW1vdmVDbGFzcyh0aGlzLl9lbGVtZW50Lm5hdGl2ZUVsZW1lbnQsIGBhbGVydC0ke3R5cGVDaGFuZ2UucHJldmlvdXNWYWx1ZX1gKTtcclxuICAgICAgdGhpcy5fcmVuZGVyZXIuYWRkQ2xhc3ModGhpcy5fZWxlbWVudC5uYXRpdmVFbGVtZW50LCBgYWxlcnQtJHt0eXBlQ2hhbmdlLmN1cnJlbnRWYWx1ZX1gKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIG5nT25Jbml0KCkgeyB0aGlzLl9yZW5kZXJlci5hZGRDbGFzcyh0aGlzLl9lbGVtZW50Lm5hdGl2ZUVsZW1lbnQsIGBhbGVydC0ke3RoaXMudHlwZX1gKTsgfVxyXG59XHJcbiJdfQ==