/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy, Renderer2, ElementRef } from '@angular/core';
import { NgbAlertConfig } from './alert-config';
/**
 * Alerts can be used to provide feedback messages.
 */
export class NgbAlert {
    /**
     * @param {?} config
     * @param {?} _renderer
     * @param {?} _element
     */
    constructor(config, _renderer, _element) {
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
    closeHandler() { this.close.emit(null); }
    /**
     * @param {?} changes
     * @return {?}
     */
    ngOnChanges(changes) {
        /** @type {?} */
        const typeChange = changes['type'];
        if (typeChange && !typeChange.firstChange) {
            this._renderer.removeClass(this._element.nativeElement, `alert-${typeChange.previousValue}`);
            this._renderer.addClass(this._element.nativeElement, `alert-${typeChange.currentValue}`);
        }
    }
    /**
     * @return {?}
     */
    ngOnInit() { this._renderer.addClass(this._element.nativeElement, `alert-${this.type}`); }
}
NgbAlert.decorators = [
    { type: Component, args: [{
                selector: 'ngb-alert',
                changeDetection: ChangeDetectionStrategy.OnPush,
                host: { 'role': 'alert', 'class': 'alert', '[class.alert-dismissible]': 'dismissible' },
                template: `
    <button *ngIf="dismissible" type="button" class="close" aria-label="Close" i18n-aria-label="@@ngb.alert.close"
      (click)="closeHandler()">
      <span aria-hidden="true">&times;</span>
    </button>
    <ng-content></ng-content>
    `,
                styles: [`
    :host {
      display: block;
    }
  `]
            },] },
];
/** @nocollapse */
NgbAlert.ctorParameters = () => [
    { type: NgbAlertConfig },
    { type: Renderer2 },
    { type: ElementRef }
];
NgbAlert.propDecorators = {
    dismissible: [{ type: Input }],
    type: [{ type: Input }],
    close: [{ type: Output }]
};
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWxlcnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AbmctYm9vdHN0cmFwL25nLWJvb3RzdHJhcC8iLCJzb3VyY2VzIjpbImFsZXJ0L2FsZXJ0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQ0wsU0FBUyxFQUNULEtBQUssRUFDTCxNQUFNLEVBQ04sWUFBWSxFQUNaLHVCQUF1QixFQUN2QixTQUFTLEVBQ1QsVUFBVSxFQUlYLE1BQU0sZUFBZSxDQUFDO0FBRXZCLE9BQU8sRUFBQyxjQUFjLEVBQUMsTUFBTSxnQkFBZ0IsQ0FBQzs7OztBQXNCOUMsTUFBTTs7Ozs7O0lBaUJKLFlBQVksTUFBc0IsRUFBVSxTQUFvQixFQUFVLFFBQW9CO1FBQWxELGNBQVMsR0FBVCxTQUFTLENBQVc7UUFBVSxhQUFRLEdBQVIsUUFBUSxDQUFZOzs7O3FCQUY1RSxJQUFJLFlBQVksRUFBUTtRQUd4QyxJQUFJLENBQUMsV0FBVyxHQUFHLE1BQU0sQ0FBQyxXQUFXLENBQUM7UUFDdEMsSUFBSSxDQUFDLElBQUksR0FBRyxNQUFNLENBQUMsSUFBSSxDQUFDO0tBQ3pCOzs7O0lBRUQsWUFBWSxLQUFLLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLEVBQUU7Ozs7O0lBRXpDLFdBQVcsQ0FBQyxPQUFzQjs7UUFDaEMsTUFBTSxVQUFVLEdBQUcsT0FBTyxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQ25DLEVBQUUsQ0FBQyxDQUFDLFVBQVUsSUFBSSxDQUFDLFVBQVUsQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDO1lBQzFDLElBQUksQ0FBQyxTQUFTLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsYUFBYSxFQUFFLFNBQVMsVUFBVSxDQUFDLGFBQWEsRUFBRSxDQUFDLENBQUM7WUFDN0YsSUFBSSxDQUFDLFNBQVMsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxhQUFhLEVBQUUsU0FBUyxVQUFVLENBQUMsWUFBWSxFQUFFLENBQUMsQ0FBQztTQUMxRjtLQUNGOzs7O0lBRUQsUUFBUSxLQUFLLElBQUksQ0FBQyxTQUFTLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsYUFBYSxFQUFFLFNBQVMsSUFBSSxDQUFDLElBQUksRUFBRSxDQUFDLENBQUMsRUFBRTs7O1lBakQzRixTQUFTLFNBQUM7Z0JBQ1QsUUFBUSxFQUFFLFdBQVc7Z0JBQ3JCLGVBQWUsRUFBRSx1QkFBdUIsQ0FBQyxNQUFNO2dCQUMvQyxJQUFJLEVBQUUsRUFBQyxNQUFNLEVBQUUsT0FBTyxFQUFFLE9BQU8sRUFBRSxPQUFPLEVBQUUsMkJBQTJCLEVBQUUsYUFBYSxFQUFDO2dCQUNyRixRQUFRLEVBQUU7Ozs7OztLQU1QO2dCQUNILE1BQU0sRUFBRSxDQUFDOzs7O0dBSVIsQ0FBQzthQUNIOzs7O1lBckJPLGNBQWM7WUFQcEIsU0FBUztZQUNULFVBQVU7OzswQkFrQ1QsS0FBSzttQkFLTCxLQUFLO29CQUlMLE1BQU0iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xuICBDb21wb25lbnQsXG4gIElucHV0LFxuICBPdXRwdXQsXG4gIEV2ZW50RW1pdHRlcixcbiAgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksXG4gIFJlbmRlcmVyMixcbiAgRWxlbWVudFJlZixcbiAgT25DaGFuZ2VzLFxuICBPbkluaXQsXG4gIFNpbXBsZUNoYW5nZXNcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbmltcG9ydCB7TmdiQWxlcnRDb25maWd9IGZyb20gJy4vYWxlcnQtY29uZmlnJztcblxuLyoqXG4gKiBBbGVydHMgY2FuIGJlIHVzZWQgdG8gcHJvdmlkZSBmZWVkYmFjayBtZXNzYWdlcy5cbiAqL1xuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnbmdiLWFsZXJ0JyxcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2gsXG4gIGhvc3Q6IHsncm9sZSc6ICdhbGVydCcsICdjbGFzcyc6ICdhbGVydCcsICdbY2xhc3MuYWxlcnQtZGlzbWlzc2libGVdJzogJ2Rpc21pc3NpYmxlJ30sXG4gIHRlbXBsYXRlOiBgXG4gICAgPGJ1dHRvbiAqbmdJZj1cImRpc21pc3NpYmxlXCIgdHlwZT1cImJ1dHRvblwiIGNsYXNzPVwiY2xvc2VcIiBhcmlhLWxhYmVsPVwiQ2xvc2VcIiBpMThuLWFyaWEtbGFiZWw9XCJAQG5nYi5hbGVydC5jbG9zZVwiXG4gICAgICAoY2xpY2spPVwiY2xvc2VIYW5kbGVyKClcIj5cbiAgICAgIDxzcGFuIGFyaWEtaGlkZGVuPVwidHJ1ZVwiPiZ0aW1lczs8L3NwYW4+XG4gICAgPC9idXR0b24+XG4gICAgPG5nLWNvbnRlbnQ+PC9uZy1jb250ZW50PlxuICAgIGAsXG4gIHN0eWxlczogW2BcbiAgICA6aG9zdCB7XG4gICAgICBkaXNwbGF5OiBibG9jaztcbiAgICB9XG4gIGBdXG59KVxuZXhwb3J0IGNsYXNzIE5nYkFsZXJ0IGltcGxlbWVudHMgT25Jbml0LFxuICAgIE9uQ2hhbmdlcyB7XG4gIC8qKlxuICAgKiBBIGZsYWcgaW5kaWNhdGluZyBpZiBhIGdpdmVuIGFsZXJ0IGNhbiBiZSBkaXNtaXNzZWQgKGNsb3NlZCkgYnkgYSB1c2VyLiBJZiB0aGlzIGZsYWcgaXMgc2V0LCBhIGNsb3NlIGJ1dHRvbiAoaW4gYVxuICAgKiBmb3JtIG9mIGFuIMOXKSB3aWxsIGJlIGRpc3BsYXllZC5cbiAgICovXG4gIEBJbnB1dCgpIGRpc21pc3NpYmxlOiBib29sZWFuO1xuICAvKipcbiAgICogQWxlcnQgdHlwZSAoQ1NTIGNsYXNzKS4gQm9vdHN0cmFwIDQgcmVjb2duaXplcyB0aGUgZm9sbG93aW5nIHR5cGVzOiBcInN1Y2Nlc3NcIiwgXCJpbmZvXCIsIFwid2FybmluZ1wiLCBcImRhbmdlclwiLFxuICAgKiBcInByaW1hcnlcIiwgXCJzZWNvbmRhcnlcIiwgXCJsaWdodFwiLCBcImRhcmtcIi5cbiAgICovXG4gIEBJbnB1dCgpIHR5cGU6IHN0cmluZztcbiAgLyoqXG4gICAqIEFuIGV2ZW50IGVtaXR0ZWQgd2hlbiB0aGUgY2xvc2UgYnV0dG9uIGlzIGNsaWNrZWQuIFRoaXMgZXZlbnQgaGFzIG5vIHBheWxvYWQuIE9ubHkgcmVsZXZhbnQgZm9yIGRpc21pc3NpYmxlIGFsZXJ0cy5cbiAgICovXG4gIEBPdXRwdXQoKSBjbG9zZSA9IG5ldyBFdmVudEVtaXR0ZXI8dm9pZD4oKTtcblxuICBjb25zdHJ1Y3Rvcihjb25maWc6IE5nYkFsZXJ0Q29uZmlnLCBwcml2YXRlIF9yZW5kZXJlcjogUmVuZGVyZXIyLCBwcml2YXRlIF9lbGVtZW50OiBFbGVtZW50UmVmKSB7XG4gICAgdGhpcy5kaXNtaXNzaWJsZSA9IGNvbmZpZy5kaXNtaXNzaWJsZTtcbiAgICB0aGlzLnR5cGUgPSBjb25maWcudHlwZTtcbiAgfVxuXG4gIGNsb3NlSGFuZGxlcigpIHsgdGhpcy5jbG9zZS5lbWl0KG51bGwpOyB9XG5cbiAgbmdPbkNoYW5nZXMoY2hhbmdlczogU2ltcGxlQ2hhbmdlcykge1xuICAgIGNvbnN0IHR5cGVDaGFuZ2UgPSBjaGFuZ2VzWyd0eXBlJ107XG4gICAgaWYgKHR5cGVDaGFuZ2UgJiYgIXR5cGVDaGFuZ2UuZmlyc3RDaGFuZ2UpIHtcbiAgICAgIHRoaXMuX3JlbmRlcmVyLnJlbW92ZUNsYXNzKHRoaXMuX2VsZW1lbnQubmF0aXZlRWxlbWVudCwgYGFsZXJ0LSR7dHlwZUNoYW5nZS5wcmV2aW91c1ZhbHVlfWApO1xuICAgICAgdGhpcy5fcmVuZGVyZXIuYWRkQ2xhc3ModGhpcy5fZWxlbWVudC5uYXRpdmVFbGVtZW50LCBgYWxlcnQtJHt0eXBlQ2hhbmdlLmN1cnJlbnRWYWx1ZX1gKTtcbiAgICB9XG4gIH1cblxuICBuZ09uSW5pdCgpIHsgdGhpcy5fcmVuZGVyZXIuYWRkQ2xhc3ModGhpcy5fZWxlbWVudC5uYXRpdmVFbGVtZW50LCBgYWxlcnQtJHt0aGlzLnR5cGV9YCk7IH1cbn1cbiJdfQ==