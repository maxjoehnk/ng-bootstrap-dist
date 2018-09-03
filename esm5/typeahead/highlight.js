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
var NgbHighlight = /** @class */ (function () {
    function NgbHighlight() {
        /**
         * The CSS class of the span elements wrapping the term inside the result
         */
        this.highlightClass = 'ngb-highlight';
    }
    /**
     * @param {?} changes
     * @return {?}
     */
    NgbHighlight.prototype.ngOnChanges = /**
     * @param {?} changes
     * @return {?}
     */
    function (changes) {
        /** @type {?} */
        var resultStr = toString(this.result);
        /** @type {?} */
        var resultLC = resultStr.toLowerCase();
        /** @type {?} */
        var termLC = toString(this.term).toLowerCase();
        /** @type {?} */
        var currentIdx = 0;
        if (termLC.length > 0) {
            this.parts = resultLC.split(new RegExp("(" + regExpEscape(termLC) + ")")).map(function (part) {
                /** @type {?} */
                var originalPart = resultStr.substr(currentIdx, part.length);
                currentIdx += part.length;
                return originalPart;
            });
        }
        else {
            this.parts = [resultStr];
        }
    };
    NgbHighlight.decorators = [
        { type: Component, args: [{
                    selector: 'ngb-highlight',
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    template: "<ng-template ngFor [ngForOf]=\"parts\" let-part let-isOdd=\"odd\">" +
                        "<span *ngIf=\"isOdd; else even\" [class]=\"highlightClass\">{{part}}</span><ng-template #even>{{part}}</ng-template>" +
                        "</ng-template>",
                    // template needs to be formatted in a certain way so we don't add empty text nodes
                    styles: ["\n    .ngb-highlight {\n      font-weight: bold;\n    }\n  "]
                },] },
    ];
    NgbHighlight.propDecorators = {
        highlightClass: [{ type: Input }],
        result: [{ type: Input }],
        term: [{ type: Input }]
    };
    return NgbHighlight;
}());
export { NgbHighlight };
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaGlnaGxpZ2h0LmpzIiwic291cmNlUm9vdCI6Im5nOi8vQG5nLWJvb3RzdHJhcC9uZy1ib290c3RyYXAvIiwic291cmNlcyI6WyJ0eXBlYWhlYWQvaGlnaGxpZ2h0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUMsU0FBUyxFQUFFLEtBQUssRUFBYSx1QkFBdUIsRUFBZ0IsTUFBTSxlQUFlLENBQUM7QUFDbEcsT0FBTyxFQUFDLFlBQVksRUFBRSxRQUFRLEVBQUMsTUFBTSxjQUFjLENBQUM7Ozs7Ozs7Ozs7OEJBd0J4QixlQUFlOzs7Ozs7SUFZekMsa0NBQVc7Ozs7SUFBWCxVQUFZLE9BQXNCOztRQUNoQyxJQUFNLFNBQVMsR0FBRyxRQUFRLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDOztRQUN4QyxJQUFNLFFBQVEsR0FBRyxTQUFTLENBQUMsV0FBVyxFQUFFLENBQUM7O1FBQ3pDLElBQU0sTUFBTSxHQUFHLFFBQVEsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsV0FBVyxFQUFFLENBQUM7O1FBQ2pELElBQUksVUFBVSxHQUFHLENBQUMsQ0FBQztRQUVuQixFQUFFLENBQUMsQ0FBQyxNQUFNLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDdEIsSUFBSSxDQUFDLEtBQUssR0FBRyxRQUFRLENBQUMsS0FBSyxDQUFDLElBQUksTUFBTSxDQUFDLE1BQUksWUFBWSxDQUFDLE1BQU0sQ0FBQyxNQUFHLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxVQUFDLElBQUk7O2dCQUM1RSxJQUFNLFlBQVksR0FBRyxTQUFTLENBQUMsTUFBTSxDQUFDLFVBQVUsRUFBRSxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7Z0JBQy9ELFVBQVUsSUFBSSxJQUFJLENBQUMsTUFBTSxDQUFDO2dCQUMxQixNQUFNLENBQUMsWUFBWSxDQUFDO2FBQ3JCLENBQUMsQ0FBQztTQUNKO1FBQUMsSUFBSSxDQUFDLENBQUM7WUFDTixJQUFJLENBQUMsS0FBSyxHQUFHLENBQUMsU0FBUyxDQUFDLENBQUM7U0FDMUI7S0FDRjs7Z0JBN0NGLFNBQVMsU0FBQztvQkFDVCxRQUFRLEVBQUUsZUFBZTtvQkFDekIsZUFBZSxFQUFFLHVCQUF1QixDQUFDLE1BQU07b0JBQy9DLFFBQVEsRUFBRSxvRUFBZ0U7d0JBQ3RFLHNIQUFrSDt3QkFDbEgsZ0JBQWdCOztvQkFDcEIsTUFBTSxFQUFFLENBQUMsNkRBSVIsQ0FBQztpQkFDSDs7O2lDQU9FLEtBQUs7eUJBS0wsS0FBSzt1QkFLTCxLQUFLOzt1QkFuQ1I7O1NBbUJhLFlBQVkiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge0NvbXBvbmVudCwgSW5wdXQsIE9uQ2hhbmdlcywgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksIFNpbXBsZUNoYW5nZXN9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQge3JlZ0V4cEVzY2FwZSwgdG9TdHJpbmd9IGZyb20gJy4uL3V0aWwvdXRpbCc7XHJcblxyXG4vKipcclxuICogQSBjb21wb25lbnQgdGhhdCBjYW4gYmUgdXNlZCBpbnNpZGUgYSBjdXN0b20gcmVzdWx0IHRlbXBsYXRlIGluIG9yZGVyIHRvIGhpZ2hsaWdodCB0aGUgdGVybSBpbnNpZGUgdGhlIHRleHQgb2YgdGhlXHJcbiAqIHJlc3VsdFxyXG4gKi9cclxuQENvbXBvbmVudCh7XHJcbiAgc2VsZWN0b3I6ICduZ2ItaGlnaGxpZ2h0JyxcclxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaCxcclxuICB0ZW1wbGF0ZTogYDxuZy10ZW1wbGF0ZSBuZ0ZvciBbbmdGb3JPZl09XCJwYXJ0c1wiIGxldC1wYXJ0IGxldC1pc09kZD1cIm9kZFwiPmAgK1xyXG4gICAgICBgPHNwYW4gKm5nSWY9XCJpc09kZDsgZWxzZSBldmVuXCIgW2NsYXNzXT1cImhpZ2hsaWdodENsYXNzXCI+e3twYXJ0fX08L3NwYW4+PG5nLXRlbXBsYXRlICNldmVuPnt7cGFydH19PC9uZy10ZW1wbGF0ZT5gICtcclxuICAgICAgYDwvbmctdGVtcGxhdGU+YCwgIC8vIHRlbXBsYXRlIG5lZWRzIHRvIGJlIGZvcm1hdHRlZCBpbiBhIGNlcnRhaW4gd2F5IHNvIHdlIGRvbid0IGFkZCBlbXB0eSB0ZXh0IG5vZGVzXHJcbiAgc3R5bGVzOiBbYFxyXG4gICAgLm5nYi1oaWdobGlnaHQge1xyXG4gICAgICBmb250LXdlaWdodDogYm9sZDtcclxuICAgIH1cclxuICBgXVxyXG59KVxyXG5leHBvcnQgY2xhc3MgTmdiSGlnaGxpZ2h0IGltcGxlbWVudHMgT25DaGFuZ2VzIHtcclxuICBwYXJ0czogc3RyaW5nW107XHJcblxyXG4gIC8qKlxyXG4gICAqIFRoZSBDU1MgY2xhc3Mgb2YgdGhlIHNwYW4gZWxlbWVudHMgd3JhcHBpbmcgdGhlIHRlcm0gaW5zaWRlIHRoZSByZXN1bHRcclxuICAgKi9cclxuICBASW5wdXQoKSBoaWdobGlnaHRDbGFzcyA9ICduZ2ItaGlnaGxpZ2h0JztcclxuXHJcbiAgLyoqXHJcbiAgICogVGhlIHJlc3VsdCB0ZXh0IHRvIGRpc3BsYXkuIElmIHRoZSB0ZXJtIGlzIGZvdW5kIGluc2lkZSB0aGlzIHRleHQsIGl0J3MgaGlnaGxpZ2h0ZWRcclxuICAgKi9cclxuICBASW5wdXQoKSByZXN1bHQ6IHN0cmluZztcclxuXHJcbiAgLyoqXHJcbiAgICogVGhlIHNlYXJjaGVkIHRlcm1cclxuICAgKi9cclxuICBASW5wdXQoKSB0ZXJtOiBzdHJpbmc7XHJcblxyXG4gIG5nT25DaGFuZ2VzKGNoYW5nZXM6IFNpbXBsZUNoYW5nZXMpIHtcclxuICAgIGNvbnN0IHJlc3VsdFN0ciA9IHRvU3RyaW5nKHRoaXMucmVzdWx0KTtcclxuICAgIGNvbnN0IHJlc3VsdExDID0gcmVzdWx0U3RyLnRvTG93ZXJDYXNlKCk7XHJcbiAgICBjb25zdCB0ZXJtTEMgPSB0b1N0cmluZyh0aGlzLnRlcm0pLnRvTG93ZXJDYXNlKCk7XHJcbiAgICBsZXQgY3VycmVudElkeCA9IDA7XHJcblxyXG4gICAgaWYgKHRlcm1MQy5sZW5ndGggPiAwKSB7XHJcbiAgICAgIHRoaXMucGFydHMgPSByZXN1bHRMQy5zcGxpdChuZXcgUmVnRXhwKGAoJHtyZWdFeHBFc2NhcGUodGVybUxDKX0pYCkpLm1hcCgocGFydCkgPT4ge1xyXG4gICAgICAgIGNvbnN0IG9yaWdpbmFsUGFydCA9IHJlc3VsdFN0ci5zdWJzdHIoY3VycmVudElkeCwgcGFydC5sZW5ndGgpO1xyXG4gICAgICAgIGN1cnJlbnRJZHggKz0gcGFydC5sZW5ndGg7XHJcbiAgICAgICAgcmV0dXJuIG9yaWdpbmFsUGFydDtcclxuICAgICAgfSk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB0aGlzLnBhcnRzID0gW3Jlc3VsdFN0cl07XHJcbiAgICB9XHJcbiAgfVxyXG59XHJcbiJdfQ==