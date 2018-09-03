/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ContentChildren, Directive, EventEmitter, Inject, Input, NgZone, Output, PLATFORM_ID, QueryList, TemplateRef } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { NgbCarouselConfig } from './carousel-config';
import { Subject, timer } from 'rxjs';
import { filter, map, switchMap, takeUntil } from 'rxjs/operators';
/** @type {?} */
let nextId = 0;
/**
 * Represents an individual slide to be used within a carousel.
 */
export class NgbSlide {
    /**
     * @param {?} tplRef
     */
    constructor(tplRef) {
        this.tplRef = tplRef;
        /**
         * Unique slide identifier. Must be unique for the entire document for proper accessibility support.
         * Will be auto-generated if not provided.
         */
        this.id = `ngb-slide-${nextId++}`;
    }
}
NgbSlide.decorators = [
    { type: Directive, args: [{ selector: 'ng-template[ngbSlide]' },] },
];
/** @nocollapse */
NgbSlide.ctorParameters = () => [
    { type: TemplateRef }
];
NgbSlide.propDecorators = {
    id: [{ type: Input }]
};
if (false) {
    /**
     * Unique slide identifier. Must be unique for the entire document for proper accessibility support.
     * Will be auto-generated if not provided.
     * @type {?}
     */
    NgbSlide.prototype.id;
    /** @type {?} */
    NgbSlide.prototype.tplRef;
}
/**
 * Directive to easily create carousels based on Bootstrap's markup.
 */
export class NgbCarousel {
    /**
     * @param {?} config
     * @param {?} _platformId
     * @param {?} _ngZone
     * @param {?} _cd
     */
    constructor(config, _platformId, _ngZone, _cd) {
        this._platformId = _platformId;
        this._ngZone = _ngZone;
        this._cd = _cd;
        this._start$ = new Subject();
        this._stop$ = new Subject();
        /**
         * A carousel slide event fired when the slide transition is completed.
         * See NgbSlideEvent for payload details
         */
        this.slide = new EventEmitter();
        this.interval = config.interval;
        this.wrap = config.wrap;
        this.keyboard = config.keyboard;
        this.pauseOnHover = config.pauseOnHover;
        this.showNavigationArrows = config.showNavigationArrows;
        this.showNavigationIndicators = config.showNavigationIndicators;
    }
    /**
     * @return {?}
     */
    ngAfterContentInit() {
        // setInterval() doesn't play well with SSR and protractor,
        // so we should run it in the browser and outside Angular
        if (isPlatformBrowser(this._platformId)) {
            this._ngZone.runOutsideAngular(() => {
                this._start$
                    .pipe(map(() => this.interval), filter(interval => interval > 0), switchMap(interval => timer(interval).pipe(takeUntil(this._stop$))))
                    .subscribe(() => this._ngZone.run(() => {
                    this.next();
                    this._cd.detectChanges();
                }));
                this._start$.next();
            });
        }
    }
    /**
     * @return {?}
     */
    ngAfterContentChecked() {
        /** @type {?} */
        let activeSlide = this._getSlideById(this.activeId);
        this.activeId = activeSlide ? activeSlide.id : (this.slides.length ? this.slides.first.id : null);
    }
    /**
     * @return {?}
     */
    ngOnDestroy() { this._stop$.next(); }
    /**
     * @param {?} changes
     * @return {?}
     */
    ngOnChanges(changes) {
        if ('interval' in changes && !changes['interval'].isFirstChange()) {
            this._start$.next();
        }
    }
    /**
     * Navigate to a slide with the specified identifier.
     * @param {?} slideId
     * @return {?}
     */
    select(slideId) { this._cycleToSelected(slideId, this._getSlideEventDirection(this.activeId, slideId)); }
    /**
     * Navigate to the next slide.
     * @return {?}
     */
    prev() { this._cycleToSelected(this._getPrevSlide(this.activeId), NgbSlideEventDirection.RIGHT); }
    /**
     * Navigate to the next slide.
     * @return {?}
     */
    next() { this._cycleToSelected(this._getNextSlide(this.activeId), NgbSlideEventDirection.LEFT); }
    /**
     * Stops the carousel from cycling through items.
     * @return {?}
     */
    pause() { this._stop$.next(); }
    /**
     * Restarts cycling through the carousel slides from left to right.
     * @return {?}
     */
    cycle() { this._start$.next(); }
    /**
     * @param {?} slideIdx
     * @param {?} direction
     * @return {?}
     */
    _cycleToSelected(slideIdx, direction) {
        /** @type {?} */
        let selectedSlide = this._getSlideById(slideIdx);
        if (selectedSlide && selectedSlide.id !== this.activeId) {
            this.slide.emit({ prev: this.activeId, current: selectedSlide.id, direction: direction });
            this._start$.next();
            this.activeId = selectedSlide.id;
        }
    }
    /**
     * @param {?} currentActiveSlideId
     * @param {?} nextActiveSlideId
     * @return {?}
     */
    _getSlideEventDirection(currentActiveSlideId, nextActiveSlideId) {
        /** @type {?} */
        const currentActiveSlideIdx = this._getSlideIdxById(currentActiveSlideId);
        /** @type {?} */
        const nextActiveSlideIdx = this._getSlideIdxById(nextActiveSlideId);
        return currentActiveSlideIdx > nextActiveSlideIdx ? NgbSlideEventDirection.RIGHT : NgbSlideEventDirection.LEFT;
    }
    /**
     * @param {?} slideId
     * @return {?}
     */
    _getSlideById(slideId) { return this.slides.find(slide => slide.id === slideId); }
    /**
     * @param {?} slideId
     * @return {?}
     */
    _getSlideIdxById(slideId) {
        return this.slides.toArray().indexOf(this._getSlideById(slideId));
    }
    /**
     * @param {?} currentSlideId
     * @return {?}
     */
    _getNextSlide(currentSlideId) {
        /** @type {?} */
        const slideArr = this.slides.toArray();
        /** @type {?} */
        const currentSlideIdx = this._getSlideIdxById(currentSlideId);
        /** @type {?} */
        const isLastSlide = currentSlideIdx === slideArr.length - 1;
        return isLastSlide ? (this.wrap ? slideArr[0].id : slideArr[slideArr.length - 1].id) :
            slideArr[currentSlideIdx + 1].id;
    }
    /**
     * @param {?} currentSlideId
     * @return {?}
     */
    _getPrevSlide(currentSlideId) {
        /** @type {?} */
        const slideArr = this.slides.toArray();
        /** @type {?} */
        const currentSlideIdx = this._getSlideIdxById(currentSlideId);
        /** @type {?} */
        const isFirstSlide = currentSlideIdx === 0;
        return isFirstSlide ? (this.wrap ? slideArr[slideArr.length - 1].id : slideArr[0].id) :
            slideArr[currentSlideIdx - 1].id;
    }
}
NgbCarousel.decorators = [
    { type: Component, args: [{
                selector: 'ngb-carousel',
                exportAs: 'ngbCarousel',
                changeDetection: ChangeDetectionStrategy.OnPush,
                host: {
                    'class': 'carousel slide',
                    '[style.display]': '"block"',
                    'tabIndex': '0',
                    '(mouseenter)': 'pauseOnHover && pause()',
                    '(mouseleave)': 'pauseOnHover && cycle()',
                    '(keydown.arrowLeft)': 'keyboard && prev()',
                    '(keydown.arrowRight)': 'keyboard && next()'
                },
                template: `
    <ol class="carousel-indicators" *ngIf="showNavigationIndicators">
      <li *ngFor="let slide of slides" [id]="slide.id" [class.active]="slide.id === activeId"
          (click)="select(slide.id); pauseOnHover && pause()"></li>
    </ol>
    <div class="carousel-inner">
      <div *ngFor="let slide of slides" class="carousel-item" [class.active]="slide.id === activeId">
        <ng-template [ngTemplateOutlet]="slide.tplRef"></ng-template>
      </div>
    </div>
    <a class="carousel-control-prev" role="button" (click)="prev()" *ngIf="showNavigationArrows">
      <span class="carousel-control-prev-icon" aria-hidden="true"></span>
      <span class="sr-only" i18n="@@ngb.carousel.previous">Previous</span>
    </a>
    <a class="carousel-control-next" role="button" (click)="next()" *ngIf="showNavigationArrows">
      <span class="carousel-control-next-icon" aria-hidden="true"></span>
      <span class="sr-only" i18n="@@ngb.carousel.next">Next</span>
    </a>
  `
            },] },
];
/** @nocollapse */
NgbCarousel.ctorParameters = () => [
    { type: NgbCarouselConfig },
    { type: undefined, decorators: [{ type: Inject, args: [PLATFORM_ID,] }] },
    { type: NgZone },
    { type: ChangeDetectorRef }
];
NgbCarousel.propDecorators = {
    slides: [{ type: ContentChildren, args: [NgbSlide,] }],
    activeId: [{ type: Input }],
    interval: [{ type: Input }],
    wrap: [{ type: Input }],
    keyboard: [{ type: Input }],
    pauseOnHover: [{ type: Input }],
    showNavigationArrows: [{ type: Input }],
    showNavigationIndicators: [{ type: Input }],
    slide: [{ type: Output }]
};
if (false) {
    /** @type {?} */
    NgbCarousel.prototype.slides;
    /** @type {?} */
    NgbCarousel.prototype._start$;
    /** @type {?} */
    NgbCarousel.prototype._stop$;
    /**
     * The active slide id.
     * @type {?}
     */
    NgbCarousel.prototype.activeId;
    /**
     * Amount of time in milliseconds before next slide is shown.
     * @type {?}
     */
    NgbCarousel.prototype.interval;
    /**
     * Whether can wrap from the last to the first slide.
     * @type {?}
     */
    NgbCarousel.prototype.wrap;
    /**
     * A flag for allowing navigation via keyboard
     * @type {?}
     */
    NgbCarousel.prototype.keyboard;
    /**
     * A flag to enable slide cycling pause/resume on mouseover.
     * \@since 2.2.0
     * @type {?}
     */
    NgbCarousel.prototype.pauseOnHover;
    /**
     * A flag to show / hide navigation arrows.
     * \@since 2.2.0
     * @type {?}
     */
    NgbCarousel.prototype.showNavigationArrows;
    /**
     * A flag to show / hide navigation indicators.
     * \@since 2.2.0
     * @type {?}
     */
    NgbCarousel.prototype.showNavigationIndicators;
    /**
     * A carousel slide event fired when the slide transition is completed.
     * See NgbSlideEvent for payload details
     * @type {?}
     */
    NgbCarousel.prototype.slide;
    /** @type {?} */
    NgbCarousel.prototype._platformId;
    /** @type {?} */
    NgbCarousel.prototype._ngZone;
    /** @type {?} */
    NgbCarousel.prototype._cd;
}
/**
 * The payload of the slide event fired when the slide transition is completed
 * @record
 */
export function NgbSlideEvent() { }
/**
 * Previous slide id
 * @type {?}
 */
NgbSlideEvent.prototype.prev;
/**
 * New slide ids
 * @type {?}
 */
NgbSlideEvent.prototype.current;
/**
 * Slide event direction
 * @type {?}
 */
NgbSlideEvent.prototype.direction;
/** @enum {string} */
var NgbSlideEventDirection = {
    LEFT: /** @type {?} */ ('left'),
    RIGHT: /** @type {?} */ ('right'),
};
export { NgbSlideEventDirection };
/** @type {?} */
export const NGB_CAROUSEL_DIRECTIVES = [NgbCarousel, NgbSlide];

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2Fyb3VzZWwuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AbmctYm9vdHN0cmFwL25nLWJvb3RzdHJhcC8iLCJzb3VyY2VzIjpbImNhcm91c2VsL2Nhcm91c2VsLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBR0wsdUJBQXVCLEVBQ3ZCLGlCQUFpQixFQUNqQixTQUFTLEVBQ1QsZUFBZSxFQUNmLFNBQVMsRUFDVCxZQUFZLEVBQ1osTUFBTSxFQUNOLEtBQUssRUFDTCxNQUFNLEVBR04sTUFBTSxFQUNOLFdBQVcsRUFDWCxTQUFTLEVBQ1QsV0FBVyxFQUNaLE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFBQyxpQkFBaUIsRUFBQyxNQUFNLGlCQUFpQixDQUFDO0FBRWxELE9BQU8sRUFBQyxpQkFBaUIsRUFBQyxNQUFNLG1CQUFtQixDQUFDO0FBRXBELE9BQU8sRUFBQyxPQUFPLEVBQUUsS0FBSyxFQUFDLE1BQU0sTUFBTSxDQUFDO0FBQ3BDLE9BQU8sRUFBQyxNQUFNLEVBQUUsR0FBRyxFQUFFLFNBQVMsRUFBRSxTQUFTLEVBQUMsTUFBTSxnQkFBZ0IsQ0FBQzs7QUFFakUsSUFBSSxNQUFNLEdBQUcsQ0FBQyxDQUFDOzs7O0FBTWYsTUFBTTs7OztJQU1KLFlBQW1CLE1BQXdCO1FBQXhCLFdBQU0sR0FBTixNQUFNLENBQWtCOzs7OztrQkFEN0IsYUFBYSxNQUFNLEVBQUUsRUFBRTtLQUNVOzs7WUFQaEQsU0FBUyxTQUFDLEVBQUMsUUFBUSxFQUFFLHVCQUF1QixFQUFDOzs7O1lBZDVDLFdBQVc7OztpQkFvQlYsS0FBSzs7Ozs7Ozs7Ozs7Ozs7O0FBd0NSLE1BQU07Ozs7Ozs7SUFvREosWUFDSSxNQUF5QixFQUErQixXQUFXLEVBQVUsT0FBZSxFQUNwRjtRQURnRCxnQkFBVyxHQUFYLFdBQVcsQ0FBQTtRQUFVLFlBQU8sR0FBUCxPQUFPLENBQVE7UUFDcEYsUUFBRyxHQUFILEdBQUc7dUJBbERHLElBQUksT0FBTyxFQUFRO3NCQUNw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QUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO1lBQ2pFLFFBQVEsQ0FBQyxlQUFlLEdBQUcsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDOzs7O1lBOUwxRCxTQUFTLFNBQUM7Z0JBQ1QsUUFBUSxFQUFFLGNBQWM7Z0JBQ3hCLFFBQVEsRUFBRSxhQUFhO2dCQUN2QixlQUFlLEVBQUUsdUJBQXVCLENBQUMsTUFBTTtnQkFDL0MsSUFBSSxFQUFFO29CQUNKLE9BQU8sRUFBRSxnQkFBZ0I7b0JBQ3pCLGlCQUFpQixFQUFFLFNBQVM7b0JBQzVCLFVBQVUsRUFBRSxHQUFHO29CQUNmLGNBQWMsRUFBRSx5QkFBeUI7b0JBQ3pDLGNBQWMsRUFBRSx5QkFBeUI7b0JBQ3pDLHFCQUFxQixFQUFFLG9CQUFvQjtvQkFDM0Msc0JBQXNCLEVBQUUsb0JBQW9CO2lCQUM3QztnQkFDRCxRQUFRLEVBQUU7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQWtCVDthQUNGOzs7O1lBdkRPLGlCQUFpQjs0Q0E2R1MsTUFBTSxTQUFDLFdBQVc7WUF2SGxELE1BQU07WUFQTixpQkFBaUI7OztxQkEyRWhCLGVBQWUsU0FBQyxRQUFRO3VCQVF4QixLQUFLO3VCQU1MLEtBQUs7bUJBS0wsS0FBSzt1QkFLTCxLQUFLOzJCQU1MLEtBQUs7bUNBTUwsS0FBSzt1Q0FNTCxLQUFLO29CQU1MLE1BQU07Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7SUF1SVAsd0JBQVksTUFBTSxDQUFBO0lBQ2xCLHlCQUFhLE9BQU8sQ0FBQTs7OztBQUd0QixhQUFhLHVCQUF1QixHQUFHLENBQUMsV0FBVyxFQUFFLFFBQVEsQ0FBQyxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcclxuICBBZnRlckNvbnRlbnRDaGVja2VkLFxyXG4gIEFmdGVyQ29udGVudEluaXQsXHJcbiAgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksXHJcbiAgQ2hhbmdlRGV0ZWN0b3JSZWYsXHJcbiAgQ29tcG9uZW50LFxyXG4gIENvbnRlbnRDaGlsZHJlbixcclxuICBEaXJlY3RpdmUsXHJcbiAgRXZlbnRFbWl0dGVyLFxyXG4gIEluamVjdCxcclxuICBJbnB1dCxcclxuICBOZ1pvbmUsXHJcbiAgT25DaGFuZ2VzLFxyXG4gIE9uRGVzdHJveSxcclxuICBPdXRwdXQsXHJcbiAgUExBVEZPUk1fSUQsXHJcbiAgUXVlcnlMaXN0LFxyXG4gIFRlbXBsYXRlUmVmXHJcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7aXNQbGF0Zm9ybUJyb3dzZXJ9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XHJcblxyXG5pbXBvcnQge05nYkNhcm91c2VsQ29uZmlnfSBmcm9tICcuL2Nhcm91c2VsLWNvbmZpZyc7XHJcblxyXG5pbXBvcnQge1N1YmplY3QsIHRpbWVyfSBmcm9tICdyeGpzJztcclxuaW1wb3J0IHtmaWx0ZXIsIG1hcCwgc3dpdGNoTWFwLCB0YWtlVW50aWx9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcclxuXHJcbmxldCBuZXh0SWQgPSAwO1xyXG5cclxuLyoqXHJcbiAqIFJlcHJlc2VudHMgYW4gaW5kaXZpZHVhbCBzbGlkZSB0byBiZSB1c2VkIHdpdGhpbiBhIGNhcm91c2VsLlxyXG4gKi9cclxuQERpcmVjdGl2ZSh7c2VsZWN0b3I6ICduZy10ZW1wbGF0ZVtuZ2JTbGlkZV0nfSlcclxuZXhwb3J0IGNsYXNzIE5nYlNsaWRlIHtcclxuICAvKipcclxuICAgKiBVbmlxdWUgc2xpZGUgaWRlbnRpZmllci4gTXVzdCBiZSB1bmlxdWUgZm9yIHRoZSBlbnRpcmUgZG9jdW1lbnQgZm9yIHByb3BlciBhY2Nlc3NpYmlsaXR5IHN1cHBvcnQuXHJcbiAgICogV2lsbCBiZSBhdXRvLWdlbmVyYXRlZCBpZiBub3QgcHJvdmlkZWQuXHJcbiAgICovXHJcbiAgQElucHV0KCkgaWQgPSBgbmdiLXNsaWRlLSR7bmV4dElkKyt9YDtcclxuICBjb25zdHJ1Y3RvcihwdWJsaWMgdHBsUmVmOiBUZW1wbGF0ZVJlZjxhbnk+KSB7fVxyXG59XHJcblxyXG4vKipcclxuICogRGlyZWN0aXZlIHRvIGVhc2lseSBjcmVhdGUgY2Fyb3VzZWxzIGJhc2VkIG9uIEJvb3RzdHJhcCdzIG1hcmt1cC5cclxuICovXHJcbkBDb21wb25lbnQoe1xyXG4gIHNlbGVjdG9yOiAnbmdiLWNhcm91c2VsJyxcclxuICBleHBvcnRBczogJ25nYkNhcm91c2VsJyxcclxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaCxcclxuICBob3N0OiB7XHJcbiAgICAnY2xhc3MnOiAnY2Fyb3VzZWwgc2xpZGUnLFxyXG4gICAgJ1tzdHlsZS5kaXNwbGF5XSc6ICdcImJsb2NrXCInLFxyXG4gICAgJ3RhYkluZGV4JzogJzAnLFxyXG4gICAgJyhtb3VzZWVudGVyKSc6ICdwYXVzZU9uSG92ZXIgJiYgcGF1c2UoKScsXHJcbiAgICAnKG1vdXNlbGVhdmUpJzogJ3BhdXNlT25Ib3ZlciAmJiBjeWNsZSgpJyxcclxuICAgICcoa2V5ZG93bi5hcnJvd0xlZnQpJzogJ2tleWJvYXJkICYmIHByZXYoKScsXHJcbiAgICAnKGtleWRvd24uYXJyb3dSaWdodCknOiAna2V5Ym9hcmQgJiYgbmV4dCgpJ1xyXG4gIH0sXHJcbiAgdGVtcGxhdGU6IGBcclxuICAgIDxvbCBjbGFzcz1cImNhcm91c2VsLWluZGljYXRvcnNcIiAqbmdJZj1cInNob3dOYXZpZ2F0aW9uSW5kaWNhdG9yc1wiPlxyXG4gICAgICA8bGkgKm5nRm9yPVwibGV0IHNsaWRlIG9mIHNsaWRlc1wiIFtpZF09XCJzbGlkZS5pZFwiIFtjbGFzcy5hY3RpdmVdPVwic2xpZGUuaWQgPT09IGFjdGl2ZUlkXCJcclxuICAgICAgICAgIChjbGljayk9XCJzZWxlY3Qoc2xpZGUuaWQpOyBwYXVzZU9uSG92ZXIgJiYgcGF1c2UoKVwiPjwvbGk+XHJcbiAgICA8L29sPlxyXG4gICAgPGRpdiBjbGFzcz1cImNhcm91c2VsLWlubmVyXCI+XHJcbiAgICAgIDxkaXYgKm5nRm9yPVwibGV0IHNsaWRlIG9mIHNsaWRlc1wiIGNsYXNzPVwiY2Fyb3VzZWwtaXRlbVwiIFtjbGFzcy5hY3RpdmVdPVwic2xpZGUuaWQgPT09IGFjdGl2ZUlkXCI+XHJcbiAgICAgICAgPG5nLXRlbXBsYXRlIFtuZ1RlbXBsYXRlT3V0bGV0XT1cInNsaWRlLnRwbFJlZlwiPjwvbmctdGVtcGxhdGU+XHJcbiAgICAgIDwvZGl2PlxyXG4gICAgPC9kaXY+XHJcbiAgICA8YSBjbGFzcz1cImNhcm91c2VsLWNvbnRyb2wtcHJldlwiIHJvbGU9XCJidXR0b25cIiAoY2xpY2spPVwicHJldigpXCIgKm5nSWY9XCJzaG93TmF2aWdhdGlvbkFycm93c1wiPlxyXG4gICAgICA8c3BhbiBjbGFzcz1cImNhcm91c2VsLWNvbnRyb2wtcHJldi1pY29uXCIgYXJpYS1oaWRkZW49XCJ0cnVlXCI+PC9zcGFuPlxyXG4gICAgICA8c3BhbiBjbGFzcz1cInNyLW9ubHlcIiBpMThuPVwiQEBuZ2IuY2Fyb3VzZWwucHJldmlvdXNcIj5QcmV2aW91czwvc3Bhbj5cclxuICAgIDwvYT5cclxuICAgIDxhIGNsYXNzPVwiY2Fyb3VzZWwtY29udHJvbC1uZXh0XCIgcm9sZT1cImJ1dHRvblwiIChjbGljayk9XCJuZXh0KClcIiAqbmdJZj1cInNob3dOYXZpZ2F0aW9uQXJyb3dzXCI+XHJcbiAgICAgIDxzcGFuIGNsYXNzPVwiY2Fyb3VzZWwtY29udHJvbC1uZXh0LWljb25cIiBhcmlhLWhpZGRlbj1cInRydWVcIj48L3NwYW4+XHJcbiAgICAgIDxzcGFuIGNsYXNzPVwic3Itb25seVwiIGkxOG49XCJAQG5nYi5jYXJvdXNlbC5uZXh0XCI+TmV4dDwvc3Bhbj5cclxuICAgIDwvYT5cclxuICBgXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBOZ2JDYXJvdXNlbCBpbXBsZW1lbnRzIEFmdGVyQ29udGVudENoZWNrZWQsXHJcbiAgICBBZnRlckNvbnRlbnRJbml0LCBPbkNoYW5nZXMsIE9uRGVzdHJveSB7XHJcbiAgQENvbnRlbnRDaGlsZHJlbihOZ2JTbGlkZSkgc2xpZGVzOiBRdWVyeUxpc3Q8TmdiU2xpZGU+O1xyXG5cclxuICBwcml2YXRlIF9zdGFydCQgPSBuZXcgU3ViamVjdDx2b2lkPigpO1xyXG4gIHByaXZhdGUgX3N0b3AkID0gbmV3IFN1YmplY3Q8dm9pZD4oKTtcclxuXHJcbiAgLyoqXHJcbiAgICogVGhlIGFjdGl2ZSBzbGlkZSBpZC5cclxuICAgKi9cclxuICBASW5wdXQoKSBhY3RpdmVJZDogc3RyaW5nO1xyXG5cclxuXHJcbiAgLyoqXHJcbiAgICogQW1vdW50IG9mIHRpbWUgaW4gbWlsbGlzZWNvbmRzIGJlZm9yZSBuZXh0IHNsaWRlIGlzIHNob3duLlxyXG4gICAqL1xyXG4gIEBJbnB1dCgpIGludGVydmFsOiBudW1iZXI7XHJcblxyXG4gIC8qKlxyXG4gICAqIFdoZXRoZXIgY2FuIHdyYXAgZnJvbSB0aGUgbGFzdCB0byB0aGUgZmlyc3Qgc2xpZGUuXHJcbiAgICovXHJcbiAgQElucHV0KCkgd3JhcDogYm9vbGVhbjtcclxuXHJcbiAgLyoqXHJcbiAgICogQSBmbGFnIGZvciBhbGxvd2luZyBuYXZpZ2F0aW9uIHZpYSBrZXlib2FyZFxyXG4gICAqL1xyXG4gIEBJbnB1dCgpIGtleWJvYXJkOiBib29sZWFuO1xyXG5cclxuICAvKipcclxuICAgKiBBIGZsYWcgdG8gZW5hYmxlIHNsaWRlIGN5Y2xpbmcgcGF1c2UvcmVzdW1lIG9uIG1vdXNlb3Zlci5cclxuICAgKiBAc2luY2UgMi4yLjBcclxuICAgKi9cclxuICBASW5wdXQoKSBwYXVzZU9uSG92ZXI6IGJvb2xlYW47XHJcblxyXG4gIC8qKlxyXG4gICAqIEEgZmxhZyB0byBzaG93IC8gaGlkZSBuYXZpZ2F0aW9uIGFycm93cy5cclxuICAgKiBAc2luY2UgMi4yLjBcclxuICAgKi9cclxuICBASW5wdXQoKSBzaG93TmF2aWdhdGlvbkFycm93czogYm9vbGVhbjtcclxuXHJcbiAgLyoqXHJcbiAgICogQSBmbGFnIHRvIHNob3cgLyBoaWRlIG5hdmlnYXRpb24gaW5kaWNhdG9ycy5cclxuICAgKiBAc2luY2UgMi4yLjBcclxuICAgKi9cclxuICBASW5wdXQoKSBzaG93TmF2aWdhdGlvbkluZGljYXRvcnM6IGJvb2xlYW47XHJcblxyXG4gIC8qKlxyXG4gICAqIEEgY2Fyb3VzZWwgc2xpZGUgZXZlbnQgZmlyZWQgd2hlbiB0aGUgc2xpZGUgdHJhbnNpdGlvbiBpcyBjb21wbGV0ZWQuXHJcbiAgICogU2VlIE5nYlNsaWRlRXZlbnQgZm9yIHBheWxvYWQgZGV0YWlsc1xyXG4gICAqL1xyXG4gIEBPdXRwdXQoKSBzbGlkZSA9IG5ldyBFdmVudEVtaXR0ZXI8TmdiU2xpZGVFdmVudD4oKTtcclxuXHJcbiAgY29uc3RydWN0b3IoXHJcbiAgICAgIGNvbmZpZzogTmdiQ2Fyb3VzZWxDb25maWcsIEBJbmplY3QoUExBVEZPUk1fSUQpIHByaXZhdGUgX3BsYXRmb3JtSWQsIHByaXZhdGUgX25nWm9uZTogTmdab25lLFxyXG4gICAgICBwcml2YXRlIF9jZDogQ2hhbmdlRGV0ZWN0b3JSZWYpIHtcclxuICAgIHRoaXMuaW50ZXJ2YWwgPSBjb25maWcuaW50ZXJ2YWw7XHJcbiAgICB0aGlzLndyYXAgPSBjb25maWcud3JhcDtcclxuICAgIHRoaXMua2V5Ym9hcmQgPSBjb25maWcua2V5Ym9hcmQ7XHJcbiAgICB0aGlzLnBhdXNlT25Ib3ZlciA9IGNvbmZpZy5wYXVzZU9uSG92ZXI7XHJcbiAgICB0aGlzLnNob3dOYXZpZ2F0aW9uQXJyb3dzID0gY29uZmlnLnNob3dOYXZpZ2F0aW9uQXJyb3dzO1xyXG4gICAgdGhpcy5zaG93TmF2aWdhdGlvbkluZGljYXRvcnMgPSBjb25maWcuc2hvd05hdmlnYXRpb25JbmRpY2F0b3JzO1xyXG4gIH1cclxuXHJcbiAgbmdBZnRlckNvbnRlbnRJbml0KCkge1xyXG4gICAgLy8gc2V0SW50ZXJ2YWwoKSBkb2Vzbid0IHBsYXkgd2VsbCB3aXRoIFNTUiBhbmQgcHJvdHJhY3RvcixcclxuICAgIC8vIHNvIHdlIHNob3VsZCBydW4gaXQgaW4gdGhlIGJyb3dzZXIgYW5kIG91dHNpZGUgQW5ndWxhclxyXG4gICAgaWYgKGlzUGxhdGZvcm1Ccm93c2VyKHRoaXMuX3BsYXRmb3JtSWQpKSB7XHJcbiAgICAgIHRoaXMuX25nWm9uZS5ydW5PdXRzaWRlQW5ndWxhcigoKSA9PiB7XHJcbiAgICAgICAgdGhpcy5fc3RhcnQkXHJcbiAgICAgICAgICAgIC5waXBlKFxyXG4gICAgICAgICAgICAgICAgbWFwKCgpID0+IHRoaXMuaW50ZXJ2YWwpLCBmaWx0ZXIoaW50ZXJ2YWwgPT4gaW50ZXJ2YWwgPiAwKSxcclxuICAgICAgICAgICAgICAgIHN3aXRjaE1hcChpbnRlcnZhbCA9PiB0aW1lcihpbnRlcnZhbCkucGlwZSh0YWtlVW50aWwodGhpcy5fc3RvcCQpKSkpXHJcbiAgICAgICAgICAgIC5zdWJzY3JpYmUoKCkgPT4gdGhpcy5fbmdab25lLnJ1bigoKSA9PiB7XHJcbiAgICAgICAgICAgICAgdGhpcy5uZXh0KCk7XHJcbiAgICAgICAgICAgICAgdGhpcy5fY2QuZGV0ZWN0Q2hhbmdlcygpO1xyXG4gICAgICAgICAgICB9KSk7XHJcblxyXG4gICAgICAgIHRoaXMuX3N0YXJ0JC5uZXh0KCk7XHJcbiAgICAgIH0pO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgbmdBZnRlckNvbnRlbnRDaGVja2VkKCkge1xyXG4gICAgbGV0IGFjdGl2ZVNsaWRlID0gdGhpcy5fZ2V0U2xpZGVCeUlkKHRoaXMuYWN0aXZlSWQpO1xyXG4gICAgdGhpcy5hY3RpdmVJZCA9IGFjdGl2ZVNsaWRlID8gYWN0aXZlU2xpZGUuaWQgOiAodGhpcy5zbGlkZXMubGVuZ3RoID8gdGhpcy5zbGlkZXMuZmlyc3QuaWQgOiBudWxsKTtcclxuICB9XHJcblxyXG4gIG5nT25EZXN0cm95KCkgeyB0aGlzLl9zdG9wJC5uZXh0KCk7IH1cclxuXHJcbiAgbmdPbkNoYW5nZXMoY2hhbmdlcykge1xyXG4gICAgaWYgKCdpbnRlcnZhbCcgaW4gY2hhbmdlcyAmJiAhY2hhbmdlc1snaW50ZXJ2YWwnXS5pc0ZpcnN0Q2hhbmdlKCkpIHtcclxuICAgICAgdGhpcy5fc3RhcnQkLm5leHQoKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIE5hdmlnYXRlIHRvIGEgc2xpZGUgd2l0aCB0aGUgc3BlY2lmaWVkIGlkZW50aWZpZXIuXHJcbiAgICovXHJcbiAgc2VsZWN0KHNsaWRlSWQ6IHN0cmluZykgeyB0aGlzLl9jeWNsZVRvU2VsZWN0ZWQoc2xpZGVJZCwgdGhpcy5fZ2V0U2xpZGVFdmVudERpcmVjdGlvbih0aGlzLmFjdGl2ZUlkLCBzbGlkZUlkKSk7IH1cclxuXHJcbiAgLyoqXHJcbiAgICogTmF2aWdhdGUgdG8gdGhlIG5leHQgc2xpZGUuXHJcbiAgICovXHJcbiAgcHJldigpIHsgdGhpcy5fY3ljbGVUb1NlbGVjdGVkKHRoaXMuX2dldFByZXZTbGlkZSh0aGlzLmFjdGl2ZUlkKSwgTmdiU2xpZGVFdmVudERpcmVjdGlvbi5SSUdIVCk7IH1cclxuXHJcbiAgLyoqXHJcbiAgICogTmF2aWdhdGUgdG8gdGhlIG5leHQgc2xpZGUuXHJcbiAgICovXHJcbiAgbmV4dCgpIHsgdGhpcy5fY3ljbGVUb1NlbGVjdGVkKHRoaXMuX2dldE5leHRTbGlkZSh0aGlzLmFjdGl2ZUlkKSwgTmdiU2xpZGVFdmVudERpcmVjdGlvbi5MRUZUKTsgfVxyXG5cclxuICAvKipcclxuICAgKiBTdG9wcyB0aGUgY2Fyb3VzZWwgZnJvbSBjeWNsaW5nIHRocm91Z2ggaXRlbXMuXHJcbiAgICovXHJcbiAgcGF1c2UoKSB7IHRoaXMuX3N0b3AkLm5leHQoKTsgfVxyXG5cclxuICAvKipcclxuICAgKiBSZXN0YXJ0cyBjeWNsaW5nIHRocm91Z2ggdGhlIGNhcm91c2VsIHNsaWRlcyBmcm9tIGxlZnQgdG8gcmlnaHQuXHJcbiAgICovXHJcbiAgY3ljbGUoKSB7IHRoaXMuX3N0YXJ0JC5uZXh0KCk7IH1cclxuXHJcbiAgcHJpdmF0ZSBfY3ljbGVUb1NlbGVjdGVkKHNsaWRlSWR4OiBzdHJpbmcsIGRpcmVjdGlvbjogTmdiU2xpZGVFdmVudERpcmVjdGlvbikge1xyXG4gICAgbGV0IHNlbGVjdGVkU2xpZGUgPSB0aGlzLl9nZXRTbGlkZUJ5SWQoc2xpZGVJZHgpO1xyXG4gICAgaWYgKHNlbGVjdGVkU2xpZGUgJiYgc2VsZWN0ZWRTbGlkZS5pZCAhPT0gdGhpcy5hY3RpdmVJZCkge1xyXG4gICAgICB0aGlzLnNsaWRlLmVtaXQoe3ByZXY6IHRoaXMuYWN0aXZlSWQsIGN1cnJlbnQ6IHNlbGVjdGVkU2xpZGUuaWQsIGRpcmVjdGlvbjogZGlyZWN0aW9ufSk7XHJcbiAgICAgIHRoaXMuX3N0YXJ0JC5uZXh0KCk7XHJcbiAgICAgIHRoaXMuYWN0aXZlSWQgPSBzZWxlY3RlZFNsaWRlLmlkO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBfZ2V0U2xpZGVFdmVudERpcmVjdGlvbihjdXJyZW50QWN0aXZlU2xpZGVJZDogc3RyaW5nLCBuZXh0QWN0aXZlU2xpZGVJZDogc3RyaW5nKTogTmdiU2xpZGVFdmVudERpcmVjdGlvbiB7XHJcbiAgICBjb25zdCBjdXJyZW50QWN0aXZlU2xpZGVJZHggPSB0aGlzLl9nZXRTbGlkZUlkeEJ5SWQoY3VycmVudEFjdGl2ZVNsaWRlSWQpO1xyXG4gICAgY29uc3QgbmV4dEFjdGl2ZVNsaWRlSWR4ID0gdGhpcy5fZ2V0U2xpZGVJZHhCeUlkKG5leHRBY3RpdmVTbGlkZUlkKTtcclxuXHJcbiAgICByZXR1cm4gY3VycmVudEFjdGl2ZVNsaWRlSWR4ID4gbmV4dEFjdGl2ZVNsaWRlSWR4ID8gTmdiU2xpZGVFdmVudERpcmVjdGlvbi5SSUdIVCA6IE5nYlNsaWRlRXZlbnREaXJlY3Rpb24uTEVGVDtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgX2dldFNsaWRlQnlJZChzbGlkZUlkOiBzdHJpbmcpOiBOZ2JTbGlkZSB7IHJldHVybiB0aGlzLnNsaWRlcy5maW5kKHNsaWRlID0+IHNsaWRlLmlkID09PSBzbGlkZUlkKTsgfVxyXG5cclxuICBwcml2YXRlIF9nZXRTbGlkZUlkeEJ5SWQoc2xpZGVJZDogc3RyaW5nKTogbnVtYmVyIHtcclxuICAgIHJldHVybiB0aGlzLnNsaWRlcy50b0FycmF5KCkuaW5kZXhPZih0aGlzLl9nZXRTbGlkZUJ5SWQoc2xpZGVJZCkpO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBfZ2V0TmV4dFNsaWRlKGN1cnJlbnRTbGlkZUlkOiBzdHJpbmcpOiBzdHJpbmcge1xyXG4gICAgY29uc3Qgc2xpZGVBcnIgPSB0aGlzLnNsaWRlcy50b0FycmF5KCk7XHJcbiAgICBjb25zdCBjdXJyZW50U2xpZGVJZHggPSB0aGlzLl9nZXRTbGlkZUlkeEJ5SWQoY3VycmVudFNsaWRlSWQpO1xyXG4gICAgY29uc3QgaXNMYXN0U2xpZGUgPSBjdXJyZW50U2xpZGVJZHggPT09IHNsaWRlQXJyLmxlbmd0aCAtIDE7XHJcblxyXG4gICAgcmV0dXJuIGlzTGFzdFNsaWRlID8gKHRoaXMud3JhcCA/IHNsaWRlQXJyWzBdLmlkIDogc2xpZGVBcnJbc2xpZGVBcnIubGVuZ3RoIC0gMV0uaWQpIDpcclxuICAgICAgICAgICAgICAgICAgICAgICAgIHNsaWRlQXJyW2N1cnJlbnRTbGlkZUlkeCArIDFdLmlkO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBfZ2V0UHJldlNsaWRlKGN1cnJlbnRTbGlkZUlkOiBzdHJpbmcpOiBzdHJpbmcge1xyXG4gICAgY29uc3Qgc2xpZGVBcnIgPSB0aGlzLnNsaWRlcy50b0FycmF5KCk7XHJcbiAgICBjb25zdCBjdXJyZW50U2xpZGVJZHggPSB0aGlzLl9nZXRTbGlkZUlkeEJ5SWQoY3VycmVudFNsaWRlSWQpO1xyXG4gICAgY29uc3QgaXNGaXJzdFNsaWRlID0gY3VycmVudFNsaWRlSWR4ID09PSAwO1xyXG5cclxuICAgIHJldHVybiBpc0ZpcnN0U2xpZGUgPyAodGhpcy53cmFwID8gc2xpZGVBcnJbc2xpZGVBcnIubGVuZ3RoIC0gMV0uaWQgOiBzbGlkZUFyclswXS5pZCkgOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgIHNsaWRlQXJyW2N1cnJlbnRTbGlkZUlkeCAtIDFdLmlkO1xyXG4gIH1cclxufVxyXG5cclxuLyoqXHJcbiAqIFRoZSBwYXlsb2FkIG9mIHRoZSBzbGlkZSBldmVudCBmaXJlZCB3aGVuIHRoZSBzbGlkZSB0cmFuc2l0aW9uIGlzIGNvbXBsZXRlZFxyXG4gKi9cclxuZXhwb3J0IGludGVyZmFjZSBOZ2JTbGlkZUV2ZW50IHtcclxuICAvKipcclxuICAgKiBQcmV2aW91cyBzbGlkZSBpZFxyXG4gICAqL1xyXG4gIHByZXY6IHN0cmluZztcclxuXHJcbiAgLyoqXHJcbiAgICogTmV3IHNsaWRlIGlkc1xyXG4gICAqL1xyXG4gIGN1cnJlbnQ6IHN0cmluZztcclxuXHJcbiAgLyoqXHJcbiAgICogU2xpZGUgZXZlbnQgZGlyZWN0aW9uXHJcbiAgICovXHJcbiAgZGlyZWN0aW9uOiBOZ2JTbGlkZUV2ZW50RGlyZWN0aW9uO1xyXG59XHJcblxyXG4vKipcclxuICogRW51bSB0byBkZWZpbmUgdGhlIGNhcm91c2VsIHNsaWRlIGV2ZW50IGRpcmVjdGlvblxyXG4gKi9cclxuZXhwb3J0IGVudW0gTmdiU2xpZGVFdmVudERpcmVjdGlvbiB7XHJcbiAgTEVGVCA9IDxhbnk+J2xlZnQnLFxyXG4gIFJJR0hUID0gPGFueT4ncmlnaHQnXHJcbn1cclxuXHJcbmV4cG9ydCBjb25zdCBOR0JfQ0FST1VTRUxfRElSRUNUSVZFUyA9IFtOZ2JDYXJvdXNlbCwgTmdiU2xpZGVdO1xyXG4iXX0=