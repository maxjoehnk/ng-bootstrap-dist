/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { regExpEscape, toString } from '../util/util';
/**
 * A component that can be used inside a custom result template in order to highlight the term inside the text of the
 * result
 */
export class NgbHighlight {
    constructor() {
        /**
         * The CSS class of the span elements wrapping the term inside the result
         */
        this.highlightClass = 'ngb-highlight';
    }
    /**
     * @param {?} changes
     * @return {?}
     */
    ngOnChanges(changes) {
        /** @type {?} */
        const resultStr = toString(this.result);
        /** @type {?} */
        const resultLC = resultStr.toLowerCase();
        /** @type {?} */
        const termLC = toString(this.term).toLowerCase();
        /** @type {?} */
        let currentIdx = 0;
        if (termLC.length > 0) {
            this.parts = resultLC.split(new RegExp(`(${regExpEscape(termLC)})`)).map((part) => {
                /** @type {?} */
                const originalPart = resultStr.substr(currentIdx, part.length);
                currentIdx += part.length;
                return originalPart;
            });
        }
        else {
            this.parts = [resultStr];
        }
    }
}
NgbHighlight.decorators = [
    { type: Component, args: [{
                selector: 'ngb-highlight',
                changeDetection: ChangeDetectionStrategy.OnPush,
                template: `<ng-template ngFor [ngForOf]="parts" let-part let-isOdd="odd">` +
                    `<span *ngIf="isOdd; else even" [class]="highlightClass">{{part}}</span><ng-template #even>{{part}}</ng-template>` +
                    `</ng-template>`,
                // template needs to be formatted in a certain way so we don't add empty text nodes
                styles: [`
    .ngb-highlight {
      font-weight: bold;
    }
  `]
            },] },
];
NgbHighlight.propDecorators = {
    highlightClass: [{ type: Input }],
    result: [{ type: Input }],
    term: [{ type: Input }]
};
if (false) {
    /** @type {?} */
    NgbHighlight.prototype.parts;
    /**
     * The CSS class of the span elements wrapping the term inside the result
     * @type {?}
     */
    NgbHighlight.prototype.highlightClass;
    /**
     * The result text to display. If the term is found inside this text, it's highlighted
     * @type {?}
     */
    NgbHighlight.prototype.result;
    /**
     * The searched term
     * @type {?}
     */
    NgbHighlight.prototype.term;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaGlnaGxpZ2h0LmpzIiwic291cmNlUm9vdCI6Im5nOi8vQG5nLWJvb3RzdHJhcC9uZy1ib290c3RyYXAvIiwic291cmNlcyI6WyJ0eXBlYWhlYWQvaGlnaGxpZ2h0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUMsU0FBUyxFQUFFLEtBQUssRUFBYSx1QkFBdUIsRUFBZ0IsTUFBTSxlQUFlLENBQUM7QUFDbEcsT0FBTyxFQUFDLFlBQVksRUFBRSxRQUFRLEVBQUMsTUFBTSxjQUFjLENBQUM7Ozs7O0FBa0JwRCxNQUFNOzs7Ozs4QkFNc0IsZUFBZTs7Ozs7O0lBWXpDLFdBQVcsQ0FBQyxPQUFzQjs7UUFDaEMsTUFBTSxTQUFTLEdBQUcsUUFBUSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQzs7UUFDeEMsTUFBTSxRQUFRLEdBQUcsU0FBUyxDQUFDLFdBQVcsRUFBRSxDQUFDOztRQUN6QyxNQUFNLE1BQU0sR0FBRyxRQUFRLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLFdBQVcsRUFBRSxDQUFDOztRQUNqRCxJQUFJLFVBQVUsR0FBRyxDQUFDLENBQUM7UUFFbkIsRUFBRSxDQUFDLENBQUMsTUFBTSxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ3RCLElBQUksQ0FBQyxLQUFLLEdBQUcsUUFBUSxDQUFDLEtBQUssQ0FBQyxJQUFJLE1BQU0sQ0FBQyxJQUFJLFlBQVksQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFJLEVBQUUsRUFBRTs7Z0JBQ2hGLE1BQU0sWUFBWSxHQUFHLFNBQVMsQ0FBQyxNQUFNLENBQUMsVUFBVSxFQUFFLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztnQkFDL0QsVUFBVSxJQUFJLElBQUksQ0FBQyxNQUFNLENBQUM7Z0JBQzFCLE1BQU0sQ0FBQyxZQUFZLENBQUM7YUFDckIsQ0FBQyxDQUFDO1NBQ0o7UUFBQyxJQUFJLENBQUMsQ0FBQztZQUNOLElBQUksQ0FBQyxLQUFLLEdBQUcsQ0FBQyxTQUFTLENBQUMsQ0FBQztTQUMxQjtLQUNGOzs7WUE3Q0YsU0FBUyxTQUFDO2dCQUNULFFBQVEsRUFBRSxlQUFlO2dCQUN6QixlQUFlLEVBQUUsdUJBQXVCLENBQUMsTUFBTTtnQkFDL0MsUUFBUSxFQUFFLGdFQUFnRTtvQkFDdEUsa0hBQWtIO29CQUNsSCxnQkFBZ0I7O2dCQUNwQixNQUFNLEVBQUUsQ0FBQzs7OztHQUlSLENBQUM7YUFDSDs7OzZCQU9FLEtBQUs7cUJBS0wsS0FBSzttQkFLTCxLQUFLIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtDb21wb25lbnQsIElucHV0LCBPbkNoYW5nZXMsIENoYW5nZURldGVjdGlvblN0cmF0ZWd5LCBTaW1wbGVDaGFuZ2VzfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHtyZWdFeHBFc2NhcGUsIHRvU3RyaW5nfSBmcm9tICcuLi91dGlsL3V0aWwnO1xyXG5cclxuLyoqXHJcbiAqIEEgY29tcG9uZW50IHRoYXQgY2FuIGJlIHVzZWQgaW5zaWRlIGEgY3VzdG9tIHJlc3VsdCB0ZW1wbGF0ZSBpbiBvcmRlciB0byBoaWdobGlnaHQgdGhlIHRlcm0gaW5zaWRlIHRoZSB0ZXh0IG9mIHRoZVxyXG4gKiByZXN1bHRcclxuICovXHJcbkBDb21wb25lbnQoe1xyXG4gIHNlbGVjdG9yOiAnbmdiLWhpZ2hsaWdodCcsXHJcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2gsXHJcbiAgdGVtcGxhdGU6IGA8bmctdGVtcGxhdGUgbmdGb3IgW25nRm9yT2ZdPVwicGFydHNcIiBsZXQtcGFydCBsZXQtaXNPZGQ9XCJvZGRcIj5gICtcclxuICAgICAgYDxzcGFuICpuZ0lmPVwiaXNPZGQ7IGVsc2UgZXZlblwiIFtjbGFzc109XCJoaWdobGlnaHRDbGFzc1wiPnt7cGFydH19PC9zcGFuPjxuZy10ZW1wbGF0ZSAjZXZlbj57e3BhcnR9fTwvbmctdGVtcGxhdGU+YCArXHJcbiAgICAgIGA8L25nLXRlbXBsYXRlPmAsICAvLyB0ZW1wbGF0ZSBuZWVkcyB0byBiZSBmb3JtYXR0ZWQgaW4gYSBjZXJ0YWluIHdheSBzbyB3ZSBkb24ndCBhZGQgZW1wdHkgdGV4dCBub2Rlc1xyXG4gIHN0eWxlczogW2BcclxuICAgIC5uZ2ItaGlnaGxpZ2h0IHtcclxuICAgICAgZm9udC13ZWlnaHQ6IGJvbGQ7XHJcbiAgICB9XHJcbiAgYF1cclxufSlcclxuZXhwb3J0IGNsYXNzIE5nYkhpZ2hsaWdodCBpbXBsZW1lbnRzIE9uQ2hhbmdlcyB7XHJcbiAgcGFydHM6IHN0cmluZ1tdO1xyXG5cclxuICAvKipcclxuICAgKiBUaGUgQ1NTIGNsYXNzIG9mIHRoZSBzcGFuIGVsZW1lbnRzIHdyYXBwaW5nIHRoZSB0ZXJtIGluc2lkZSB0aGUgcmVzdWx0XHJcbiAgICovXHJcbiAgQElucHV0KCkgaGlnaGxpZ2h0Q2xhc3MgPSAnbmdiLWhpZ2hsaWdodCc7XHJcblxyXG4gIC8qKlxyXG4gICAqIFRoZSByZXN1bHQgdGV4dCB0byBkaXNwbGF5LiBJZiB0aGUgdGVybSBpcyBmb3VuZCBpbnNpZGUgdGhpcyB0ZXh0LCBpdCdzIGhpZ2hsaWdodGVkXHJcbiAgICovXHJcbiAgQElucHV0KCkgcmVzdWx0OiBzdHJpbmc7XHJcblxyXG4gIC8qKlxyXG4gICAqIFRoZSBzZWFyY2hlZCB0ZXJtXHJcbiAgICovXHJcbiAgQElucHV0KCkgdGVybTogc3RyaW5nO1xyXG5cclxuICBuZ09uQ2hhbmdlcyhjaGFuZ2VzOiBTaW1wbGVDaGFuZ2VzKSB7XHJcbiAgICBjb25zdCByZXN1bHRTdHIgPSB0b1N0cmluZyh0aGlzLnJlc3VsdCk7XHJcbiAgICBjb25zdCByZXN1bHRMQyA9IHJlc3VsdFN0ci50b0xvd2VyQ2FzZSgpO1xyXG4gICAgY29uc3QgdGVybUxDID0gdG9TdHJpbmcodGhpcy50ZXJtKS50b0xvd2VyQ2FzZSgpO1xyXG4gICAgbGV0IGN1cnJlbnRJZHggPSAwO1xyXG5cclxuICAgIGlmICh0ZXJtTEMubGVuZ3RoID4gMCkge1xyXG4gICAgICB0aGlzLnBhcnRzID0gcmVzdWx0TEMuc3BsaXQobmV3IFJlZ0V4cChgKCR7cmVnRXhwRXNjYXBlKHRlcm1MQyl9KWApKS5tYXAoKHBhcnQpID0+IHtcclxuICAgICAgICBjb25zdCBvcmlnaW5hbFBhcnQgPSByZXN1bHRTdHIuc3Vic3RyKGN1cnJlbnRJZHgsIHBhcnQubGVuZ3RoKTtcclxuICAgICAgICBjdXJyZW50SWR4ICs9IHBhcnQubGVuZ3RoO1xyXG4gICAgICAgIHJldHVybiBvcmlnaW5hbFBhcnQ7XHJcbiAgICAgIH0pO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdGhpcy5wYXJ0cyA9IFtyZXN1bHRTdHJdO1xyXG4gICAgfVxyXG4gIH1cclxufVxyXG4iXX0=