/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { DOCUMENT } from '@angular/common';
import { Component, Output, EventEmitter, Input, Inject, ElementRef } from '@angular/core';
import { ModalDismissReasons } from './modal-dismiss-reasons';
export class NgbModalWindow {
    /**
     * @param {?} _document
     * @param {?} _elRef
     */
    constructor(_document, _elRef) {
        this._document = _document;
        this._elRef = _elRef;
        this.backdrop = true;
        this.keyboard = true;
        this.dismissEvent = new EventEmitter();
    }
    /**
     * @param {?} $event
     * @return {?}
     */
    backdropClick($event) {
        if (this.backdrop === true && this._elRef.nativeElement === $event.target) {
            this.dismiss(ModalDismissReasons.BACKDROP_CLICK);
        }
    }
    /**
     * @param {?} $event
     * @return {?}
     */
    escKey($event) {
        if (this.keyboard && !$event.defaultPrevented) {
            this.dismiss(ModalDismissReasons.ESC);
        }
    }
    /**
     * @param {?} reason
     * @return {?}
     */
    dismiss(reason) { this.dismissEvent.emit(reason); }
    /**
     * @return {?}
     */
    ngOnInit() { this._elWithFocus = this._document.activeElement; }
    /**
     * @return {?}
     */
    ngAfterViewInit() {
        if (!this._elRef.nativeElement.contains(document.activeElement)) {
            this._elRef.nativeElement['focus'].apply(this._elRef.nativeElement, []);
        }
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        /** @type {?} */
        const body = this._document.body;
        /** @type {?} */
        const elWithFocus = this._elWithFocus;
        /** @type {?} */
        let elementToFocus;
        if (elWithFocus && elWithFocus['focus'] && body.contains(elWithFocus)) {
            elementToFocus = elWithFocus;
        }
        else {
            elementToFocus = body;
        }
        elementToFocus['focus'].apply(elementToFocus, []);
        this._elWithFocus = null;
    }
}
NgbModalWindow.decorators = [
    { type: Component, args: [{
                selector: 'ngb-modal-window',
                host: {
                    '[class]': '"modal fade show d-block" + (windowClass ? " " + windowClass : "")',
                    'role': 'dialog',
                    'tabindex': '-1',
                    '(keyup.esc)': 'escKey($event)',
                    '(click)': 'backdropClick($event)',
                    '[attr.aria-labelledby]': 'ariaLabelledBy',
                },
                template: `
    <div [class]="'modal-dialog' + (size ? ' modal-' + size : '') + (centered ? ' modal-dialog-centered' : '')" role="document">
        <div class="modal-content"><ng-content></ng-content></div>
    </div>
    `
            },] },
];
/** @nocollapse */
NgbModalWindow.ctorParameters = () => [
    { type: undefined, decorators: [{ type: Inject, args: [DOCUMENT,] }] },
    { type: ElementRef }
];
NgbModalWindow.propDecorators = {
    ariaLabelledBy: [{ type: Input }],
    backdrop: [{ type: Input }],
    centered: [{ type: Input }],
    keyboard: [{ type: Input }],
    size: [{ type: Input }],
    windowClass: [{ type: Input }],
    dismissEvent: [{ type: Output, args: ['dismiss',] }]
};
if (false) {
    /** @type {?} */
    NgbModalWindow.prototype._elWithFocus;
    /** @type {?} */
    NgbModalWindow.prototype.ariaLabelledBy;
    /** @type {?} */
    NgbModalWindow.prototype.backdrop;
    /** @type {?} */
    NgbModalWindow.prototype.centered;
    /** @type {?} */
    NgbModalWindow.prototype.keyboard;
    /** @type {?} */
    NgbModalWindow.prototype.size;
    /** @type {?} */
    NgbModalWindow.prototype.windowClass;
    /** @type {?} */
    NgbModalWindow.prototype.dismissEvent;
    /** @type {?} */
    NgbModalWindow.prototype._document;
    /** @type {?} */
    NgbModalWindow.prototype._elRef;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kYWwtd2luZG93LmpzIiwic291cmNlUm9vdCI6Im5nOi8vQG5nLWJvb3RzdHJhcC9uZy1ib290c3RyYXAvIiwic291cmNlcyI6WyJtb2RhbC9tb2RhbC13aW5kb3cudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBQyxRQUFRLEVBQUMsTUFBTSxpQkFBaUIsQ0FBQztBQUN6QyxPQUFPLEVBQ0wsU0FBUyxFQUNULE1BQU0sRUFDTixZQUFZLEVBQ1osS0FBSyxFQUNMLE1BQU0sRUFDTixVQUFVLEVBSVgsTUFBTSxlQUFlLENBQUM7QUFFdkIsT0FBTyxFQUFDLG1CQUFtQixFQUFDLE1BQU0seUJBQXlCLENBQUM7QUFrQjVELE1BQU07Ozs7O0lBYUosWUFBc0MsU0FBYyxFQUFVLE1BQStCO1FBQXZELGNBQVMsR0FBVCxTQUFTLENBQUs7UUFBVSxXQUFNLEdBQU4sTUFBTSxDQUF5Qjt3QkFSdkQsSUFBSTt3QkFFdEIsSUFBSTs0QkFJVSxJQUFJLFlBQVksRUFBRTtLQUU2Qzs7Ozs7SUFFakcsYUFBYSxDQUFDLE1BQU07UUFDbEIsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLFFBQVEsS0FBSyxJQUFJLElBQUksSUFBSSxDQUFDLE1BQU0sQ0FBQyxhQUFhLEtBQUssTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUM7WUFDMUUsSUFBSSxDQUFDLE9BQU8sQ0FBQyxtQkFBbUIsQ0FBQyxjQUFjLENBQUMsQ0FBQztTQUNsRDtLQUNGOzs7OztJQUVELE1BQU0sQ0FBQyxNQUFNO1FBQ1gsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLFFBQVEsSUFBSSxDQUFDLE1BQU0sQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDLENBQUM7WUFDOUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxtQkFBbUIsQ0FBQyxHQUFHLENBQUMsQ0FBQztTQUN2QztLQUNGOzs7OztJQUVELE9BQU8sQ0FBQyxNQUFNLElBQVUsSUFBSSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsRUFBRTs7OztJQUV6RCxRQUFRLEtBQUssSUFBSSxDQUFDLFlBQVksR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLGFBQWEsQ0FBQyxFQUFFOzs7O0lBRWhFLGVBQWU7UUFDYixFQUFFLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsYUFBYSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsYUFBYSxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ2hFLElBQUksQ0FBQyxNQUFNLENBQUMsYUFBYSxDQUFDLE9BQU8sQ0FBQyxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLGFBQWEsRUFBRSxFQUFFLENBQUMsQ0FBQztTQUN6RTtLQUNGOzs7O0lBRUQsV0FBVzs7UUFDVCxNQUFNLElBQUksR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQzs7UUFDakMsTUFBTSxXQUFXLEdBQUcsSUFBSSxDQUFDLFlBQVksQ0FBQzs7UUFFdEMsSUFBSSxjQUFjLENBQUM7UUFDbkIsRUFBRSxDQUFDLENBQUMsV0FBVyxJQUFJLFdBQVcsQ0FBQyxPQUFPLENBQUMsSUFBSSxJQUFJLENBQUMsUUFBUSxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUN0RSxjQUFjLEdBQUcsV0FBVyxDQUFDO1NBQzlCO1FBQUMsSUFBSSxDQUFDLENBQUM7WUFDTixjQUFjLEdBQUcsSUFBSSxDQUFDO1NBQ3ZCO1FBQ0QsY0FBYyxDQUFDLE9BQU8sQ0FBQyxDQUFDLEtBQUssQ0FBQyxjQUFjLEVBQUUsRUFBRSxDQUFDLENBQUM7UUFFbEQsSUFBSSxDQUFDLFlBQVksR0FBRyxJQUFJLENBQUM7S0FDMUI7OztZQWxFRixTQUFTLFNBQUM7Z0JBQ1QsUUFBUSxFQUFFLGtCQUFrQjtnQkFDNUIsSUFBSSxFQUFFO29CQUNKLFNBQVMsRUFBRSxvRUFBb0U7b0JBQy9FLE1BQU0sRUFBRSxRQUFRO29CQUNoQixVQUFVLEVBQUUsSUFBSTtvQkFDaEIsYUFBYSxFQUFFLGdCQUFnQjtvQkFDL0IsU0FBUyxFQUFFLHVCQUF1QjtvQkFDbEMsd0JBQXdCLEVBQUUsZ0JBQWdCO2lCQUMzQztnQkFDRCxRQUFRLEVBQUU7Ozs7S0FJUDthQUNKOzs7OzRDQWNjLE1BQU0sU0FBQyxRQUFRO1lBckM1QixVQUFVOzs7NkJBNEJULEtBQUs7dUJBQ0wsS0FBSzt1QkFDTCxLQUFLO3VCQUNMLEtBQUs7bUJBQ0wsS0FBSzswQkFDTCxLQUFLOzJCQUVMLE1BQU0sU0FBQyxTQUFTIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtET0NVTUVOVH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcclxuaW1wb3J0IHtcclxuICBDb21wb25lbnQsXHJcbiAgT3V0cHV0LFxyXG4gIEV2ZW50RW1pdHRlcixcclxuICBJbnB1dCxcclxuICBJbmplY3QsXHJcbiAgRWxlbWVudFJlZixcclxuICBPbkluaXQsXHJcbiAgQWZ0ZXJWaWV3SW5pdCxcclxuICBPbkRlc3Ryb3lcclxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuXHJcbmltcG9ydCB7TW9kYWxEaXNtaXNzUmVhc29uc30gZnJvbSAnLi9tb2RhbC1kaXNtaXNzLXJlYXNvbnMnO1xyXG5cclxuQENvbXBvbmVudCh7XHJcbiAgc2VsZWN0b3I6ICduZ2ItbW9kYWwtd2luZG93JyxcclxuICBob3N0OiB7XHJcbiAgICAnW2NsYXNzXSc6ICdcIm1vZGFsIGZhZGUgc2hvdyBkLWJsb2NrXCIgKyAod2luZG93Q2xhc3MgPyBcIiBcIiArIHdpbmRvd0NsYXNzIDogXCJcIiknLFxyXG4gICAgJ3JvbGUnOiAnZGlhbG9nJyxcclxuICAgICd0YWJpbmRleCc6ICctMScsXHJcbiAgICAnKGtleXVwLmVzYyknOiAnZXNjS2V5KCRldmVudCknLFxyXG4gICAgJyhjbGljayknOiAnYmFja2Ryb3BDbGljaygkZXZlbnQpJyxcclxuICAgICdbYXR0ci5hcmlhLWxhYmVsbGVkYnldJzogJ2FyaWFMYWJlbGxlZEJ5JyxcclxuICB9LFxyXG4gIHRlbXBsYXRlOiBgXHJcbiAgICA8ZGl2IFtjbGFzc109XCInbW9kYWwtZGlhbG9nJyArIChzaXplID8gJyBtb2RhbC0nICsgc2l6ZSA6ICcnKSArIChjZW50ZXJlZCA/ICcgbW9kYWwtZGlhbG9nLWNlbnRlcmVkJyA6ICcnKVwiIHJvbGU9XCJkb2N1bWVudFwiPlxyXG4gICAgICAgIDxkaXYgY2xhc3M9XCJtb2RhbC1jb250ZW50XCI+PG5nLWNvbnRlbnQ+PC9uZy1jb250ZW50PjwvZGl2PlxyXG4gICAgPC9kaXY+XHJcbiAgICBgXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBOZ2JNb2RhbFdpbmRvdyBpbXBsZW1lbnRzIE9uSW5pdCxcclxuICAgIEFmdGVyVmlld0luaXQsIE9uRGVzdHJveSB7XHJcbiAgcHJpdmF0ZSBfZWxXaXRoRm9jdXM6IEVsZW1lbnQ7ICAvLyBlbGVtZW50IHRoYXQgaXMgZm9jdXNlZCBwcmlvciB0byBtb2RhbCBvcGVuaW5nXHJcblxyXG4gIEBJbnB1dCgpIGFyaWFMYWJlbGxlZEJ5OiBzdHJpbmc7XHJcbiAgQElucHV0KCkgYmFja2Ryb3A6IGJvb2xlYW4gfCBzdHJpbmcgPSB0cnVlO1xyXG4gIEBJbnB1dCgpIGNlbnRlcmVkOiBzdHJpbmc7XHJcbiAgQElucHV0KCkga2V5Ym9hcmQgPSB0cnVlO1xyXG4gIEBJbnB1dCgpIHNpemU6IHN0cmluZztcclxuICBASW5wdXQoKSB3aW5kb3dDbGFzczogc3RyaW5nO1xyXG5cclxuICBAT3V0cHV0KCdkaXNtaXNzJykgZGlzbWlzc0V2ZW50ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xyXG5cclxuICBjb25zdHJ1Y3RvcihASW5qZWN0KERPQ1VNRU5UKSBwcml2YXRlIF9kb2N1bWVudDogYW55LCBwcml2YXRlIF9lbFJlZjogRWxlbWVudFJlZjxIVE1MRWxlbWVudD4pIHt9XHJcblxyXG4gIGJhY2tkcm9wQ2xpY2soJGV2ZW50KTogdm9pZCB7XHJcbiAgICBpZiAodGhpcy5iYWNrZHJvcCA9PT0gdHJ1ZSAmJiB0aGlzLl9lbFJlZi5uYXRpdmVFbGVtZW50ID09PSAkZXZlbnQudGFyZ2V0KSB7XHJcbiAgICAgIHRoaXMuZGlzbWlzcyhNb2RhbERpc21pc3NSZWFzb25zLkJBQ0tEUk9QX0NMSUNLKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIGVzY0tleSgkZXZlbnQpOiB2b2lkIHtcclxuICAgIGlmICh0aGlzLmtleWJvYXJkICYmICEkZXZlbnQuZGVmYXVsdFByZXZlbnRlZCkge1xyXG4gICAgICB0aGlzLmRpc21pc3MoTW9kYWxEaXNtaXNzUmVhc29ucy5FU0MpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgZGlzbWlzcyhyZWFzb24pOiB2b2lkIHsgdGhpcy5kaXNtaXNzRXZlbnQuZW1pdChyZWFzb24pOyB9XHJcblxyXG4gIG5nT25Jbml0KCkgeyB0aGlzLl9lbFdpdGhGb2N1cyA9IHRoaXMuX2RvY3VtZW50LmFjdGl2ZUVsZW1lbnQ7IH1cclxuXHJcbiAgbmdBZnRlclZpZXdJbml0KCkge1xyXG4gICAgaWYgKCF0aGlzLl9lbFJlZi5uYXRpdmVFbGVtZW50LmNvbnRhaW5zKGRvY3VtZW50LmFjdGl2ZUVsZW1lbnQpKSB7XHJcbiAgICAgIHRoaXMuX2VsUmVmLm5hdGl2ZUVsZW1lbnRbJ2ZvY3VzJ10uYXBwbHkodGhpcy5fZWxSZWYubmF0aXZlRWxlbWVudCwgW10pO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgbmdPbkRlc3Ryb3koKSB7XHJcbiAgICBjb25zdCBib2R5ID0gdGhpcy5fZG9jdW1lbnQuYm9keTtcclxuICAgIGNvbnN0IGVsV2l0aEZvY3VzID0gdGhpcy5fZWxXaXRoRm9jdXM7XHJcblxyXG4gICAgbGV0IGVsZW1lbnRUb0ZvY3VzO1xyXG4gICAgaWYgKGVsV2l0aEZvY3VzICYmIGVsV2l0aEZvY3VzWydmb2N1cyddICYmIGJvZHkuY29udGFpbnMoZWxXaXRoRm9jdXMpKSB7XHJcbiAgICAgIGVsZW1lbnRUb0ZvY3VzID0gZWxXaXRoRm9jdXM7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBlbGVtZW50VG9Gb2N1cyA9IGJvZHk7XHJcbiAgICB9XHJcbiAgICBlbGVtZW50VG9Gb2N1c1snZm9jdXMnXS5hcHBseShlbGVtZW50VG9Gb2N1cywgW10pO1xyXG5cclxuICAgIHRoaXMuX2VsV2l0aEZvY3VzID0gbnVsbDtcclxuICB9XHJcbn1cclxuIl19