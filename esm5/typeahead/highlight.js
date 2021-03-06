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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaGlnaGxpZ2h0LmpzIiwic291cmNlUm9vdCI6Im5nOi8vQG5nLWJvb3RzdHJhcC9uZy1ib290c3RyYXAvIiwic291cmNlcyI6WyJ0eXBlYWhlYWQvaGlnaGxpZ2h0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUMsU0FBUyxFQUFFLEtBQUssRUFBYSx1QkFBdUIsRUFBZ0IsTUFBTSxlQUFlLENBQUM7QUFDbEcsT0FBTyxFQUFDLFlBQVksRUFBRSxRQUFRLEVBQUMsTUFBTSxjQUFjLENBQUM7Ozs7Ozs7Ozs7OEJBd0J4QixlQUFlOzs7Ozs7SUFZekMsa0NBQVc7Ozs7SUFBWCxVQUFZLE9BQXNCOztRQUNoQyxJQUFNLFNBQVMsR0FBRyxRQUFRLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDOztRQUN4QyxJQUFNLFFBQVEsR0FBRyxTQUFTLENBQUMsV0FBVyxFQUFFLENBQUM7O1FBQ3pDLElBQU0sTUFBTSxHQUFHLFFBQVEsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsV0FBVyxFQUFFLENBQUM7O1FBQ2pELElBQUksVUFBVSxHQUFHLENBQUMsQ0FBQztRQUVuQixFQUFFLENBQUMsQ0FBQyxNQUFNLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDdEIsSUFBSSxDQUFDLEtBQUssR0FBRyxRQUFRLENBQUMsS0FBSyxDQUFDLElBQUksTUFBTSxDQUFDLE1BQUksWUFBWSxDQUFDLE1BQU0sQ0FBQyxNQUFHLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxVQUFDLElBQUk7O2dCQUM1RSxJQUFNLFlBQVksR0FBRyxTQUFTLENBQUMsTUFBTSxDQUFDLFVBQVUsRUFBRSxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7Z0JBQy9ELFVBQVUsSUFBSSxJQUFJLENBQUMsTUFBTSxDQUFDO2dCQUMxQixNQUFNLENBQUMsWUFBWSxDQUFDO2FBQ3JCLENBQUMsQ0FBQztTQUNKO1FBQUMsSUFBSSxDQUFDLENBQUM7WUFDTixJQUFJLENBQUMsS0FBSyxHQUFHLENBQUMsU0FBUyxDQUFDLENBQUM7U0FDMUI7S0FDRjs7Z0JBN0NGLFNBQVMsU0FBQztvQkFDVCxRQUFRLEVBQUUsZUFBZTtvQkFDekIsZUFBZSxFQUFFLHVCQUF1QixDQUFDLE1BQU07b0JBQy9DLFFBQVEsRUFBRSxvRUFBZ0U7d0JBQ3RFLHNIQUFrSDt3QkFDbEgsZ0JBQWdCOztvQkFDcEIsTUFBTSxFQUFFLENBQUMsNkRBSVIsQ0FBQztpQkFDSDs7O2lDQU9FLEtBQUs7eUJBS0wsS0FBSzt1QkFLTCxLQUFLOzt1QkFuQ1I7O1NBbUJhLFlBQVkiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge0NvbXBvbmVudCwgSW5wdXQsIE9uQ2hhbmdlcywgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksIFNpbXBsZUNoYW5nZXN9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtyZWdFeHBFc2NhcGUsIHRvU3RyaW5nfSBmcm9tICcuLi91dGlsL3V0aWwnO1xuXG4vKipcbiAqIEEgY29tcG9uZW50IHRoYXQgY2FuIGJlIHVzZWQgaW5zaWRlIGEgY3VzdG9tIHJlc3VsdCB0ZW1wbGF0ZSBpbiBvcmRlciB0byBoaWdobGlnaHQgdGhlIHRlcm0gaW5zaWRlIHRoZSB0ZXh0IG9mIHRoZVxuICogcmVzdWx0XG4gKi9cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ25nYi1oaWdobGlnaHQnLFxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaCxcbiAgdGVtcGxhdGU6IGA8bmctdGVtcGxhdGUgbmdGb3IgW25nRm9yT2ZdPVwicGFydHNcIiBsZXQtcGFydCBsZXQtaXNPZGQ9XCJvZGRcIj5gICtcbiAgICAgIGA8c3BhbiAqbmdJZj1cImlzT2RkOyBlbHNlIGV2ZW5cIiBbY2xhc3NdPVwiaGlnaGxpZ2h0Q2xhc3NcIj57e3BhcnR9fTwvc3Bhbj48bmctdGVtcGxhdGUgI2V2ZW4+e3twYXJ0fX08L25nLXRlbXBsYXRlPmAgK1xuICAgICAgYDwvbmctdGVtcGxhdGU+YCwgIC8vIHRlbXBsYXRlIG5lZWRzIHRvIGJlIGZvcm1hdHRlZCBpbiBhIGNlcnRhaW4gd2F5IHNvIHdlIGRvbid0IGFkZCBlbXB0eSB0ZXh0IG5vZGVzXG4gIHN0eWxlczogW2BcbiAgICAubmdiLWhpZ2hsaWdodCB7XG4gICAgICBmb250LXdlaWdodDogYm9sZDtcbiAgICB9XG4gIGBdXG59KVxuZXhwb3J0IGNsYXNzIE5nYkhpZ2hsaWdodCBpbXBsZW1lbnRzIE9uQ2hhbmdlcyB7XG4gIHBhcnRzOiBzdHJpbmdbXTtcblxuICAvKipcbiAgICogVGhlIENTUyBjbGFzcyBvZiB0aGUgc3BhbiBlbGVtZW50cyB3cmFwcGluZyB0aGUgdGVybSBpbnNpZGUgdGhlIHJlc3VsdFxuICAgKi9cbiAgQElucHV0KCkgaGlnaGxpZ2h0Q2xhc3MgPSAnbmdiLWhpZ2hsaWdodCc7XG5cbiAgLyoqXG4gICAqIFRoZSByZXN1bHQgdGV4dCB0byBkaXNwbGF5LiBJZiB0aGUgdGVybSBpcyBmb3VuZCBpbnNpZGUgdGhpcyB0ZXh0LCBpdCdzIGhpZ2hsaWdodGVkXG4gICAqL1xuICBASW5wdXQoKSByZXN1bHQ6IHN0cmluZztcblxuICAvKipcbiAgICogVGhlIHNlYXJjaGVkIHRlcm1cbiAgICovXG4gIEBJbnB1dCgpIHRlcm06IHN0cmluZztcblxuICBuZ09uQ2hhbmdlcyhjaGFuZ2VzOiBTaW1wbGVDaGFuZ2VzKSB7XG4gICAgY29uc3QgcmVzdWx0U3RyID0gdG9TdHJpbmcodGhpcy5yZXN1bHQpO1xuICAgIGNvbnN0IHJlc3VsdExDID0gcmVzdWx0U3RyLnRvTG93ZXJDYXNlKCk7XG4gICAgY29uc3QgdGVybUxDID0gdG9TdHJpbmcodGhpcy50ZXJtKS50b0xvd2VyQ2FzZSgpO1xuICAgIGxldCBjdXJyZW50SWR4ID0gMDtcblxuICAgIGlmICh0ZXJtTEMubGVuZ3RoID4gMCkge1xuICAgICAgdGhpcy5wYXJ0cyA9IHJlc3VsdExDLnNwbGl0KG5ldyBSZWdFeHAoYCgke3JlZ0V4cEVzY2FwZSh0ZXJtTEMpfSlgKSkubWFwKChwYXJ0KSA9PiB7XG4gICAgICAgIGNvbnN0IG9yaWdpbmFsUGFydCA9IHJlc3VsdFN0ci5zdWJzdHIoY3VycmVudElkeCwgcGFydC5sZW5ndGgpO1xuICAgICAgICBjdXJyZW50SWR4ICs9IHBhcnQubGVuZ3RoO1xuICAgICAgICByZXR1cm4gb3JpZ2luYWxQYXJ0O1xuICAgICAgfSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMucGFydHMgPSBbcmVzdWx0U3RyXTtcbiAgICB9XG4gIH1cbn1cbiJdfQ==