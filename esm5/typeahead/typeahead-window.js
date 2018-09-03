/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { Component, Input, Output, EventEmitter, TemplateRef } from '@angular/core';
import { toString } from '../util/util';
/**
 * Context for the typeahead result template in case you want to override the default one
 * @record
 */
export function ResultTemplateContext() { }
/**
 * Your typeahead result data model
 * @type {?}
 */
ResultTemplateContext.prototype.result;
/**
 * Search term from the input used to get current result
 * @type {?}
 */
ResultTemplateContext.prototype.term;
var NgbTypeaheadWindow = /** @class */ (function () {
    function NgbTypeaheadWindow() {
        this.activeIdx = 0;
        /**
         * Flag indicating if the first row should be active initially
         */
        this.focusFirst = true;
        /**
         * A function used to format a given result before display. This function should return a formatted string without any
         * HTML markup
         */
        this.formatter = toString;
        /**
         * Event raised when user selects a particular result row
         */
        this.selectEvent = new EventEmitter();
        this.activeChangeEvent = new EventEmitter();
    }
    /**
     * @return {?}
     */
    NgbTypeaheadWindow.prototype.hasActive = /**
     * @return {?}
     */
    function () { return this.activeIdx > -1 && this.activeIdx < this.results.length; };
    /**
     * @return {?}
     */
    NgbTypeaheadWindow.prototype.getActive = /**
     * @return {?}
     */
    function () { return this.results[this.activeIdx]; };
    /**
     * @param {?} activeIdx
     * @return {?}
     */
    NgbTypeaheadWindow.prototype.markActive = /**
     * @param {?} activeIdx
     * @return {?}
     */
    function (activeIdx) {
        this.activeIdx = activeIdx;
        this._activeChanged();
    };
    /**
     * @return {?}
     */
    NgbTypeaheadWindow.prototype.next = /**
     * @return {?}
     */
    function () {
        if (this.activeIdx === this.results.length - 1) {
            this.activeIdx = this.focusFirst ? (this.activeIdx + 1) % this.results.length : -1;
        }
        else {
            this.activeIdx++;
        }
        this._activeChanged();
    };
    /**
     * @return {?}
     */
    NgbTypeaheadWindow.prototype.prev = /**
     * @return {?}
     */
    function () {
        if (this.activeIdx < 0) {
            this.activeIdx = this.results.length - 1;
        }
        else if (this.activeIdx === 0) {
            this.activeIdx = this.focusFirst ? this.results.length - 1 : -1;
        }
        else {
            this.activeIdx--;
        }
        this._activeChanged();
    };
    /**
     * @return {?}
     */
    NgbTypeaheadWindow.prototype.resetActive = /**
     * @return {?}
     */
    function () {
        this.activeIdx = this.focusFirst ? 0 : -1;
        this._activeChanged();
    };
    /**
     * @param {?} item
     * @return {?}
     */
    NgbTypeaheadWindow.prototype.select = /**
     * @param {?} item
     * @return {?}
     */
    function (item) { this.selectEvent.emit(item); };
    /**
     * @return {?}
     */
    NgbTypeaheadWindow.prototype.ngOnInit = /**
     * @return {?}
     */
    function () { this.resetActive(); };
    /**
     * @return {?}
     */
    NgbTypeaheadWindow.prototype._activeChanged = /**
     * @return {?}
     */
    function () {
        this.activeChangeEvent.emit(this.activeIdx >= 0 ? this.id + '-' + this.activeIdx : undefined);
    };
    NgbTypeaheadWindow.decorators = [
        { type: Component, args: [{
                    selector: 'ngb-typeahead-window',
                    exportAs: 'ngbTypeaheadWindow',
                    host: { 'class': 'dropdown-menu show', 'role': 'listbox', '[id]': 'id' },
                    template: "\n    <ng-template #rt let-result=\"result\" let-term=\"term\" let-formatter=\"formatter\">\n      <ngb-highlight [result]=\"formatter(result)\" [term]=\"term\"></ngb-highlight>\n    </ng-template>\n    <ng-template ngFor [ngForOf]=\"results\" let-result let-idx=\"index\">\n      <button type=\"button\" class=\"dropdown-item\" role=\"option\"\n        [id]=\"id + '-' + idx\"\n        [class.active]=\"idx === activeIdx\"\n        (mouseenter)=\"markActive(idx)\"\n        (click)=\"select(result)\">\n          <ng-template [ngTemplateOutlet]=\"resultTemplate || rt\"\n          [ngTemplateOutletContext]=\"{result: result, term: term, formatter: formatter}\"></ng-template>\n      </button>\n    </ng-template>\n  "
                },] },
    ];
    NgbTypeaheadWindow.propDecorators = {
        id: [{ type: Input }],
        focusFirst: [{ type: Input }],
        results: [{ type: Input }],
        term: [{ type: Input }],
        formatter: [{ type: Input }],
        resultTemplate: [{ type: Input }],
        selectEvent: [{ type: Output, args: ['select',] }],
        activeChangeEvent: [{ type: Output, args: ['activeChange',] }]
    };
    return NgbTypeaheadWindow;
}());
export { NgbTypeaheadWindow };
if (false) {
    /** @type {?} */
    NgbTypeaheadWindow.prototype.activeIdx;
    /**
     *  The id for the typeahead window. The id should be unique and the same
     *  as the associated typeahead's id.
     * @type {?}
     */
    NgbTypeaheadWindow.prototype.id;
    /**
     * Flag indicating if the first row should be active initially
     * @type {?}
     */
    NgbTypeaheadWindow.prototype.focusFirst;
    /**
     * Typeahead match results to be displayed
     * @type {?}
     */
    NgbTypeaheadWindow.prototype.results;
    /**
     * Search term used to get current results
     * @type {?}
     */
    NgbTypeaheadWindow.prototype.term;
    /**
     * A function used to format a given result before display. This function should return a formatted string without any
     * HTML markup
     * @type {?}
     */
    NgbTypeaheadWindow.prototype.formatter;
    /**
     * A template to override a matching result default display
     * @type {?}
     */
    NgbTypeaheadWindow.prototype.resultTemplate;
    /**
     * Event raised when user selects a particular result row
     * @type {?}
     */
    NgbTypeaheadWindow.prototype.selectEvent;
    /** @type {?} */
    NgbTypeaheadWindow.prototype.activeChangeEvent;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHlwZWFoZWFkLXdpbmRvdy5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BuZy1ib290c3RyYXAvbmctYm9vdHN0cmFwLyIsInNvdXJjZXMiOlsidHlwZWFoZWFkL3R5cGVhaGVhZC13aW5kb3cudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBQyxTQUFTLEVBQUUsS0FBSyxFQUFFLE1BQU0sRUFBRSxZQUFZLEVBQUUsV0FBVyxFQUFTLE1BQU0sZUFBZSxDQUFDO0FBRTFGLE9BQU8sRUFBQyxRQUFRLEVBQUMsTUFBTSxjQUFjLENBQUM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozt5QkFzQ3hCLENBQUM7Ozs7MEJBV1MsSUFBSTs7Ozs7eUJBZ0JMLFFBQVE7Ozs7MkJBVUcsSUFBSSxZQUFZLEVBQUU7aUNBRU4sSUFBSSxZQUFZLEVBQUU7Ozs7O0lBRTlELHNDQUFTOzs7SUFBVCxjQUFjLE1BQU0sQ0FBQyxJQUFJLENBQUMsU0FBUyxHQUFHLENBQUMsQ0FBQyxJQUFJLElBQUksQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsRUFBRTs7OztJQUVuRixzQ0FBUzs7O0lBQVQsY0FBYyxNQUFNLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUMsRUFBRTs7Ozs7SUFFcEQsdUNBQVU7Ozs7SUFBVixVQUFXLFNBQWlCO1FBQzFCLElBQUksQ0FBQyxTQUFTLEdBQUcsU0FBUyxDQUFDO1FBQzNCLElBQUksQ0FBQyxjQUFjLEVBQUUsQ0FBQztLQUN2Qjs7OztJQUVELGlDQUFJOzs7SUFBSjtRQUNFLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxTQUFTLEtBQUssSUFBSSxDQUFDLE9BQU8sQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUMvQyxJQUFJLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLFNBQVMsR0FBRyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7U0FDcEY7UUFBQyxJQUFJLENBQUMsQ0FBQztZQUNOLElBQUksQ0FBQyxTQUFTLEVBQUUsQ0FBQztTQUNsQjtRQUNELElBQUksQ0FBQyxjQUFjLEVBQUUsQ0FBQztLQUN2Qjs7OztJQUVELGlDQUFJOzs7SUFBSjtRQUNFLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxTQUFTLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUN2QixJQUFJLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQztTQUMxQztRQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsU0FBUyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDaEMsSUFBSSxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1NBQ2pFO1FBQUMsSUFBSSxDQUFDLENBQUM7WUFDTixJQUFJLENBQUMsU0FBUyxFQUFFLENBQUM7U0FDbEI7UUFDRCxJQUFJLENBQUMsY0FBYyxFQUFFLENBQUM7S0FDdkI7Ozs7SUFFRCx3Q0FBVzs7O0lBQVg7UUFDRSxJQUFJLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDMUMsSUFBSSxDQUFDLGNBQWMsRUFBRSxDQUFDO0tBQ3ZCOzs7OztJQUVELG1DQUFNOzs7O0lBQU4sVUFBTyxJQUFJLElBQUksSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsRUFBRTs7OztJQUU3QyxxQ0FBUTs7O0lBQVIsY0FBYSxJQUFJLENBQUMsV0FBVyxFQUFFLENBQUMsRUFBRTs7OztJQUUxQiwyQ0FBYzs7OztRQUNwQixJQUFJLENBQUMsaUJBQWlCLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxTQUFTLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsRUFBRSxHQUFHLEdBQUcsR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUMsQ0FBQzs7O2dCQXJHakcsU0FBUyxTQUFDO29CQUNULFFBQVEsRUFBRSxzQkFBc0I7b0JBQ2hDLFFBQVEsRUFBRSxvQkFBb0I7b0JBQzlCLElBQUksRUFBRSxFQUFDLE9BQU8sRUFBRSxvQkFBb0IsRUFBRSxNQUFNLEVBQUUsU0FBUyxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUM7b0JBQ3RFLFFBQVEsRUFBRSxndEJBY1Q7aUJBQ0Y7OztxQkFRRSxLQUFLOzZCQUtMLEtBQUs7MEJBS0wsS0FBSzt1QkFLTCxLQUFLOzRCQU1MLEtBQUs7aUNBS0wsS0FBSzs4QkFLTCxNQUFNLFNBQUMsUUFBUTtvQ0FFZixNQUFNLFNBQUMsY0FBYzs7NkJBL0V4Qjs7U0F1Q2Esa0JBQWtCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtDb21wb25lbnQsIElucHV0LCBPdXRwdXQsIEV2ZW50RW1pdHRlciwgVGVtcGxhdGVSZWYsIE9uSW5pdH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcblxyXG5pbXBvcnQge3RvU3RyaW5nfSBmcm9tICcuLi91dGlsL3V0aWwnO1xyXG5cclxuLyoqXHJcbiAqIENvbnRleHQgZm9yIHRoZSB0eXBlYWhlYWQgcmVzdWx0IHRlbXBsYXRlIGluIGNhc2UgeW91IHdhbnQgdG8gb3ZlcnJpZGUgdGhlIGRlZmF1bHQgb25lXHJcbiAqL1xyXG5leHBvcnQgaW50ZXJmYWNlIFJlc3VsdFRlbXBsYXRlQ29udGV4dCB7XHJcbiAgLyoqXHJcbiAgICogWW91ciB0eXBlYWhlYWQgcmVzdWx0IGRhdGEgbW9kZWxcclxuICAgKi9cclxuICByZXN1bHQ6IGFueTtcclxuXHJcbiAgLyoqXHJcbiAgICogU2VhcmNoIHRlcm0gZnJvbSB0aGUgaW5wdXQgdXNlZCB0byBnZXQgY3VycmVudCByZXN1bHRcclxuICAgKi9cclxuICB0ZXJtOiBzdHJpbmc7XHJcbn1cclxuXHJcbkBDb21wb25lbnQoe1xyXG4gIHNlbGVjdG9yOiAnbmdiLXR5cGVhaGVhZC13aW5kb3cnLFxyXG4gIGV4cG9ydEFzOiAnbmdiVHlwZWFoZWFkV2luZG93JyxcclxuICBob3N0OiB7J2NsYXNzJzogJ2Ryb3Bkb3duLW1lbnUgc2hvdycsICdyb2xlJzogJ2xpc3Rib3gnLCAnW2lkXSc6ICdpZCd9LFxyXG4gIHRlbXBsYXRlOiBgXHJcbiAgICA8bmctdGVtcGxhdGUgI3J0IGxldC1yZXN1bHQ9XCJyZXN1bHRcIiBsZXQtdGVybT1cInRlcm1cIiBsZXQtZm9ybWF0dGVyPVwiZm9ybWF0dGVyXCI+XHJcbiAgICAgIDxuZ2ItaGlnaGxpZ2h0IFtyZXN1bHRdPVwiZm9ybWF0dGVyKHJlc3VsdClcIiBbdGVybV09XCJ0ZXJtXCI+PC9uZ2ItaGlnaGxpZ2h0PlxyXG4gICAgPC9uZy10ZW1wbGF0ZT5cclxuICAgIDxuZy10ZW1wbGF0ZSBuZ0ZvciBbbmdGb3JPZl09XCJyZXN1bHRzXCIgbGV0LXJlc3VsdCBsZXQtaWR4PVwiaW5kZXhcIj5cclxuICAgICAgPGJ1dHRvbiB0eXBlPVwiYnV0dG9uXCIgY2xhc3M9XCJkcm9wZG93bi1pdGVtXCIgcm9sZT1cIm9wdGlvblwiXHJcbiAgICAgICAgW2lkXT1cImlkICsgJy0nICsgaWR4XCJcclxuICAgICAgICBbY2xhc3MuYWN0aXZlXT1cImlkeCA9PT0gYWN0aXZlSWR4XCJcclxuICAgICAgICAobW91c2VlbnRlcik9XCJtYXJrQWN0aXZlKGlkeClcIlxyXG4gICAgICAgIChjbGljayk9XCJzZWxlY3QocmVzdWx0KVwiPlxyXG4gICAgICAgICAgPG5nLXRlbXBsYXRlIFtuZ1RlbXBsYXRlT3V0bGV0XT1cInJlc3VsdFRlbXBsYXRlIHx8IHJ0XCJcclxuICAgICAgICAgIFtuZ1RlbXBsYXRlT3V0bGV0Q29udGV4dF09XCJ7cmVzdWx0OiByZXN1bHQsIHRlcm06IHRlcm0sIGZvcm1hdHRlcjogZm9ybWF0dGVyfVwiPjwvbmctdGVtcGxhdGU+XHJcbiAgICAgIDwvYnV0dG9uPlxyXG4gICAgPC9uZy10ZW1wbGF0ZT5cclxuICBgXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBOZ2JUeXBlYWhlYWRXaW5kb3cgaW1wbGVtZW50cyBPbkluaXQge1xyXG4gIGFjdGl2ZUlkeCA9IDA7XHJcblxyXG4gIC8qKlxyXG4gICAqICBUaGUgaWQgZm9yIHRoZSB0eXBlYWhlYWQgd2luZG93LiBUaGUgaWQgc2hvdWxkIGJlIHVuaXF1ZSBhbmQgdGhlIHNhbWVcclxuICAgKiAgYXMgdGhlIGFzc29jaWF0ZWQgdHlwZWFoZWFkJ3MgaWQuXHJcbiAgICovXHJcbiAgQElucHV0KCkgaWQ6IHN0cmluZztcclxuXHJcbiAgLyoqXHJcbiAgICogRmxhZyBpbmRpY2F0aW5nIGlmIHRoZSBmaXJzdCByb3cgc2hvdWxkIGJlIGFjdGl2ZSBpbml0aWFsbHlcclxuICAgKi9cclxuICBASW5wdXQoKSBmb2N1c0ZpcnN0ID0gdHJ1ZTtcclxuXHJcbiAgLyoqXHJcbiAgICogVHlwZWFoZWFkIG1hdGNoIHJlc3VsdHMgdG8gYmUgZGlzcGxheWVkXHJcbiAgICovXHJcbiAgQElucHV0KCkgcmVzdWx0cztcclxuXHJcbiAgLyoqXHJcbiAgICogU2VhcmNoIHRlcm0gdXNlZCB0byBnZXQgY3VycmVudCByZXN1bHRzXHJcbiAgICovXHJcbiAgQElucHV0KCkgdGVybTogc3RyaW5nO1xyXG5cclxuICAvKipcclxuICAgKiBBIGZ1bmN0aW9uIHVzZWQgdG8gZm9ybWF0IGEgZ2l2ZW4gcmVzdWx0IGJlZm9yZSBkaXNwbGF5LiBUaGlzIGZ1bmN0aW9uIHNob3VsZCByZXR1cm4gYSBmb3JtYXR0ZWQgc3RyaW5nIHdpdGhvdXQgYW55XHJcbiAgICogSFRNTCBtYXJrdXBcclxuICAgKi9cclxuICBASW5wdXQoKSBmb3JtYXR0ZXIgPSB0b1N0cmluZztcclxuXHJcbiAgLyoqXHJcbiAgICogQSB0ZW1wbGF0ZSB0byBvdmVycmlkZSBhIG1hdGNoaW5nIHJlc3VsdCBkZWZhdWx0IGRpc3BsYXlcclxuICAgKi9cclxuICBASW5wdXQoKSByZXN1bHRUZW1wbGF0ZTogVGVtcGxhdGVSZWY8UmVzdWx0VGVtcGxhdGVDb250ZXh0PjtcclxuXHJcbiAgLyoqXHJcbiAgICogRXZlbnQgcmFpc2VkIHdoZW4gdXNlciBzZWxlY3RzIGEgcGFydGljdWxhciByZXN1bHQgcm93XHJcbiAgICovXHJcbiAgQE91dHB1dCgnc2VsZWN0Jykgc2VsZWN0RXZlbnQgPSBuZXcgRXZlbnRFbWl0dGVyKCk7XHJcblxyXG4gIEBPdXRwdXQoJ2FjdGl2ZUNoYW5nZScpIGFjdGl2ZUNoYW5nZUV2ZW50ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xyXG5cclxuICBoYXNBY3RpdmUoKSB7IHJldHVybiB0aGlzLmFjdGl2ZUlkeCA+IC0xICYmIHRoaXMuYWN0aXZlSWR4IDwgdGhpcy5yZXN1bHRzLmxlbmd0aDsgfVxyXG5cclxuICBnZXRBY3RpdmUoKSB7IHJldHVybiB0aGlzLnJlc3VsdHNbdGhpcy5hY3RpdmVJZHhdOyB9XHJcblxyXG4gIG1hcmtBY3RpdmUoYWN0aXZlSWR4OiBudW1iZXIpIHtcclxuICAgIHRoaXMuYWN0aXZlSWR4ID0gYWN0aXZlSWR4O1xyXG4gICAgdGhpcy5fYWN0aXZlQ2hhbmdlZCgpO1xyXG4gIH1cclxuXHJcbiAgbmV4dCgpIHtcclxuICAgIGlmICh0aGlzLmFjdGl2ZUlkeCA9PT0gdGhpcy5yZXN1bHRzLmxlbmd0aCAtIDEpIHtcclxuICAgICAgdGhpcy5hY3RpdmVJZHggPSB0aGlzLmZvY3VzRmlyc3QgPyAodGhpcy5hY3RpdmVJZHggKyAxKSAlIHRoaXMucmVzdWx0cy5sZW5ndGggOiAtMTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHRoaXMuYWN0aXZlSWR4Kys7XHJcbiAgICB9XHJcbiAgICB0aGlzLl9hY3RpdmVDaGFuZ2VkKCk7XHJcbiAgfVxyXG5cclxuICBwcmV2KCkge1xyXG4gICAgaWYgKHRoaXMuYWN0aXZlSWR4IDwgMCkge1xyXG4gICAgICB0aGlzLmFjdGl2ZUlkeCA9IHRoaXMucmVzdWx0cy5sZW5ndGggLSAxO1xyXG4gICAgfSBlbHNlIGlmICh0aGlzLmFjdGl2ZUlkeCA9PT0gMCkge1xyXG4gICAgICB0aGlzLmFjdGl2ZUlkeCA9IHRoaXMuZm9jdXNGaXJzdCA/IHRoaXMucmVzdWx0cy5sZW5ndGggLSAxIDogLTE7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB0aGlzLmFjdGl2ZUlkeC0tO1xyXG4gICAgfVxyXG4gICAgdGhpcy5fYWN0aXZlQ2hhbmdlZCgpO1xyXG4gIH1cclxuXHJcbiAgcmVzZXRBY3RpdmUoKSB7XHJcbiAgICB0aGlzLmFjdGl2ZUlkeCA9IHRoaXMuZm9jdXNGaXJzdCA/IDAgOiAtMTtcclxuICAgIHRoaXMuX2FjdGl2ZUNoYW5nZWQoKTtcclxuICB9XHJcblxyXG4gIHNlbGVjdChpdGVtKSB7IHRoaXMuc2VsZWN0RXZlbnQuZW1pdChpdGVtKTsgfVxyXG5cclxuICBuZ09uSW5pdCgpIHsgdGhpcy5yZXNldEFjdGl2ZSgpOyB9XHJcblxyXG4gIHByaXZhdGUgX2FjdGl2ZUNoYW5nZWQoKSB7XHJcbiAgICB0aGlzLmFjdGl2ZUNoYW5nZUV2ZW50LmVtaXQodGhpcy5hY3RpdmVJZHggPj0gMCA/IHRoaXMuaWQgKyAnLScgKyB0aGlzLmFjdGl2ZUlkeCA6IHVuZGVmaW5lZCk7XHJcbiAgfVxyXG59XHJcbiJdfQ==