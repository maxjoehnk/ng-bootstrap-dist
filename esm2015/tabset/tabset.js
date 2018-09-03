/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { Component, Input, ContentChildren, QueryList, Directive, TemplateRef, Output, EventEmitter } from '@angular/core';
import { NgbTabsetConfig } from './tabset-config';
/** @type {?} */
let nextId = 0;
/**
 * This directive should be used to wrap tab titles that need to contain HTML markup or other directives.
 */
export class NgbTabTitle {
    /**
     * @param {?} templateRef
     */
    constructor(templateRef) {
        this.templateRef = templateRef;
    }
}
NgbTabTitle.decorators = [
    { type: Directive, args: [{ selector: 'ng-template[ngbTabTitle]' },] },
];
/** @nocollapse */
NgbTabTitle.ctorParameters = () => [
    { type: TemplateRef }
];
if (false) {
    /** @type {?} */
    NgbTabTitle.prototype.templateRef;
}
/**
 * This directive must be used to wrap content to be displayed in a tab.
 */
export class NgbTabContent {
    /**
     * @param {?} templateRef
     */
    constructor(templateRef) {
        this.templateRef = templateRef;
    }
}
NgbTabContent.decorators = [
    { type: Directive, args: [{ selector: 'ng-template[ngbTabContent]' },] },
];
/** @nocollapse */
NgbTabContent.ctorParameters = () => [
    { type: TemplateRef }
];
if (false) {
    /** @type {?} */
    NgbTabContent.prototype.templateRef;
}
/**
 * A directive representing an individual tab.
 */
export class NgbTab {
    constructor() {
        /**
         * Unique tab identifier. Must be unique for the entire document for proper accessibility support.
         */
        this.id = `ngb-tab-${nextId++}`;
        /**
         * Allows toggling disabled state of a given state. Disabled tabs can't be selected.
         */
        this.disabled = false;
    }
    /**
     * @return {?}
     */
    ngAfterContentChecked() {
        // We are using @ContentChildren instead of @ContentChild as in the Angular version being used
        // only @ContentChildren allows us to specify the {descendants: false} option.
        // Without {descendants: false} we are hitting bugs described in:
        // https://github.com/ng-bootstrap/ng-bootstrap/issues/2240
        this.titleTpl = this.titleTpls.first;
        this.contentTpl = this.contentTpls.first;
    }
}
NgbTab.decorators = [
    { type: Directive, args: [{ selector: 'ngb-tab' },] },
];
NgbTab.propDecorators = {
    id: [{ type: Input }],
    title: [{ type: Input }],
    disabled: [{ type: Input }],
    titleTpls: [{ type: ContentChildren, args: [NgbTabTitle, { descendants: false },] }],
    contentTpls: [{ type: ContentChildren, args: [NgbTabContent, { descendants: false },] }]
};
if (false) {
    /**
     * Unique tab identifier. Must be unique for the entire document for proper accessibility support.
     * @type {?}
     */
    NgbTab.prototype.id;
    /**
     * Simple (string only) title. Use the "NgbTabTitle" directive for more complex use-cases.
     * @type {?}
     */
    NgbTab.prototype.title;
    /**
     * Allows toggling disabled state of a given state. Disabled tabs can't be selected.
     * @type {?}
     */
    NgbTab.prototype.disabled;
    /** @type {?} */
    NgbTab.prototype.titleTpl;
    /** @type {?} */
    NgbTab.prototype.contentTpl;
    /** @type {?} */
    NgbTab.prototype.titleTpls;
    /** @type {?} */
    NgbTab.prototype.contentTpls;
}
/**
 * The payload of the change event fired right before the tab change
 * @record
 */
export function NgbTabChangeEvent() { }
/**
 * Id of the currently active tab
 * @type {?}
 */
NgbTabChangeEvent.prototype.activeId;
/**
 * Id of the newly selected tab
 * @type {?}
 */
NgbTabChangeEvent.prototype.nextId;
/**
 * Function that will prevent tab switch if called
 * @type {?}
 */
NgbTabChangeEvent.prototype.preventDefault;
/**
 * A component that makes it easy to create tabbed interface.
 */
export class NgbTabset {
    /**
     * @param {?} config
     */
    constructor(config) {
        /**
         * Whether the closed tabs should be hidden without destroying them
         */
        this.destroyOnHide = true;
        /**
         * A tab change event fired right before the tab selection happens. See NgbTabChangeEvent for payload details
         */
        this.tabChange = new EventEmitter();
        this.type = config.type;
        this.justify = config.justify;
        this.orientation = config.orientation;
    }
    /**
     * The horizontal alignment of the nav with flexbox utilities. Can be one of 'start', 'center', 'end', 'fill' or
     * 'justified'
     * The default value is 'start'.
     * @param {?} className
     * @return {?}
     */
    set justify(className) {
        if (className === 'fill' || className === 'justified') {
            this.justifyClass = `nav-${className}`;
        }
        else {
            this.justifyClass = `justify-content-${className}`;
        }
    }
    /**
     * Selects the tab with the given id and shows its associated pane.
     * Any other tab that was previously selected becomes unselected and its associated pane is hidden.
     * @param {?} tabId
     * @return {?}
     */
    select(tabId) {
        /** @type {?} */
        let selectedTab = this._getTabById(tabId);
        if (selectedTab && !selectedTab.disabled && this.activeId !== selectedTab.id) {
            /** @type {?} */
            let defaultPrevented = false;
            this.tabChange.emit({ activeId: this.activeId, nextId: selectedTab.id, preventDefault: () => { defaultPrevented = true; } });
            if (!defaultPrevented) {
                this.activeId = selectedTab.id;
            }
        }
    }
    /**
     * @return {?}
     */
    ngAfterContentChecked() {
        /** @type {?} */
        let activeTab = this._getTabById(this.activeId);
        this.activeId = activeTab ? activeTab.id : (this.tabs.length ? this.tabs.first.id : null);
    }
    /**
     * @param {?} id
     * @return {?}
     */
    _getTabById(id) {
        /** @type {?} */
        let tabsWithId = this.tabs.filter(tab => tab.id === id);
        return tabsWithId.length ? tabsWithId[0] : null;
    }
}
NgbTabset.decorators = [
    { type: Component, args: [{
                selector: 'ngb-tabset',
                exportAs: 'ngbTabset',
                template: `
    <ul [class]="'nav nav-' + type + (orientation == 'horizontal'?  ' ' + justifyClass : ' flex-column')" role="tablist">
      <li class="nav-item" *ngFor="let tab of tabs">
        <a [id]="tab.id" class="nav-link" [class.active]="tab.id === activeId" [class.disabled]="tab.disabled"
          href (click)="!!select(tab.id)" role="tab" [attr.tabindex]="(tab.disabled ? '-1': undefined)"
          [attr.aria-controls]="(!destroyOnHide || tab.id === activeId ? tab.id + '-panel' : null)"
          [attr.aria-expanded]="tab.id === activeId" [attr.aria-disabled]="tab.disabled">
          {{tab.title}}<ng-template [ngTemplateOutlet]="tab.titleTpl?.templateRef"></ng-template>
        </a>
      </li>
    </ul>
    <div class="tab-content">
      <ng-template ngFor let-tab [ngForOf]="tabs">
        <div
          class="tab-pane {{tab.id === activeId ? 'active' : null}}"
          *ngIf="!destroyOnHide || tab.id === activeId"
          role="tabpanel"
          [attr.aria-labelledby]="tab.id" id="{{tab.id}}-panel"
          [attr.aria-expanded]="tab.id === activeId">
          <ng-template [ngTemplateOutlet]="tab.contentTpl?.templateRef"></ng-template>
        </div>
      </ng-template>
    </div>
  `
            },] },
];
/** @nocollapse */
NgbTabset.ctorParameters = () => [
    { type: NgbTabsetConfig }
];
NgbTabset.propDecorators = {
    tabs: [{ type: ContentChildren, args: [NgbTab,] }],
    activeId: [{ type: Input }],
    destroyOnHide: [{ type: Input }],
    justify: [{ type: Input }],
    orientation: [{ type: Input }],
    type: [{ type: Input }],
    tabChange: [{ type: Output }]
};
if (false) {
    /** @type {?} */
    NgbTabset.prototype.justifyClass;
    /** @type {?} */
    NgbTabset.prototype.tabs;
    /**
     * An identifier of an initially selected (active) tab. Use the "select" method to switch a tab programmatically.
     * @type {?}
     */
    NgbTabset.prototype.activeId;
    /**
     * Whether the closed tabs should be hidden without destroying them
     * @type {?}
     */
    NgbTabset.prototype.destroyOnHide;
    /**
     * The orientation of the nav (horizontal or vertical).
     * The default value is 'horizontal'.
     * @type {?}
     */
    NgbTabset.prototype.orientation;
    /**
     * Type of navigation to be used for tabs. Can be one of Bootstrap defined types ('tabs' or 'pills').
     * Since 3.0.0 can also be an arbitrary string (for custom themes).
     * @type {?}
     */
    NgbTabset.prototype.type;
    /**
     * A tab change event fired right before the tab selection happens. See NgbTabChangeEvent for payload details
     * @type {?}
     */
    NgbTabset.prototype.tabChange;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGFic2V0LmpzIiwic291cmNlUm9vdCI6Im5nOi8vQG5nLWJvb3RzdHJhcC9uZy1ib290c3RyYXAvIiwic291cmNlcyI6WyJ0YWJzZXQvdGFic2V0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQ0wsU0FBUyxFQUNULEtBQUssRUFDTCxlQUFlLEVBQ2YsU0FBUyxFQUNULFNBQVMsRUFDVCxXQUFXLEVBR1gsTUFBTSxFQUNOLFlBQVksRUFDYixNQUFNLGVBQWUsQ0FBQztBQUN2QixPQUFPLEVBQUMsZUFBZSxFQUFDLE1BQU0saUJBQWlCLENBQUM7O0FBRWhELElBQUksTUFBTSxHQUFHLENBQUMsQ0FBQzs7OztBQU1mLE1BQU07Ozs7SUFDSixZQUFtQixXQUE2QjtRQUE3QixnQkFBVyxHQUFYLFdBQVcsQ0FBa0I7S0FBSTs7O1lBRnJELFNBQVMsU0FBQyxFQUFDLFFBQVEsRUFBRSwwQkFBMEIsRUFBQzs7OztZQWIvQyxXQUFXOzs7Ozs7Ozs7QUFzQmIsTUFBTTs7OztJQUNKLFlBQW1CLFdBQTZCO1FBQTdCLGdCQUFXLEdBQVgsV0FBVyxDQUFrQjtLQUFJOzs7WUFGckQsU0FBUyxTQUFDLEVBQUMsUUFBUSxFQUFFLDRCQUE0QixFQUFDOzs7O1lBckJqRCxXQUFXOzs7Ozs7Ozs7QUE4QmIsTUFBTTs7Ozs7a0JBSVUsV0FBVyxNQUFNLEVBQUUsRUFBRTs7Ozt3QkFRZixLQUFLOzs7OztJQVF6QixxQkFBcUI7Ozs7O1FBS25CLElBQUksQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUM7UUFDckMsSUFBSSxDQUFDLFVBQVUsR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDLEtBQUssQ0FBQztLQUMxQzs7O1lBNUJGLFNBQVMsU0FBQyxFQUFDLFFBQVEsRUFBRSxTQUFTLEVBQUM7OztpQkFLN0IsS0FBSztvQkFJTCxLQUFLO3VCQUlMLEtBQUs7d0JBS0wsZUFBZSxTQUFDLFdBQVcsRUFBRSxFQUFDLFdBQVcsRUFB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OlsiaW1wb3J0IHtcclxuICBDb21wb25lbnQsXHJcbiAgSW5wdXQsXHJcbiAgQ29udGVudENoaWxkcmVuLFxyXG4gIFF1ZXJ5TGlzdCxcclxuICBEaXJlY3RpdmUsXHJcbiAgVGVtcGxhdGVSZWYsXHJcbiAgQ29udGVudENoaWxkLFxyXG4gIEFmdGVyQ29udGVudENoZWNrZWQsXHJcbiAgT3V0cHV0LFxyXG4gIEV2ZW50RW1pdHRlclxyXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQge05nYlRhYnNldENvbmZpZ30gZnJvbSAnLi90YWJzZXQtY29uZmlnJztcclxuXHJcbmxldCBuZXh0SWQgPSAwO1xyXG5cclxuLyoqXHJcbiAqIFRoaXMgZGlyZWN0aXZlIHNob3VsZCBiZSB1c2VkIHRvIHdyYXAgdGFiIHRpdGxlcyB0aGF0IG5lZWQgdG8gY29udGFpbiBIVE1MIG1hcmt1cCBvciBvdGhlciBkaXJlY3RpdmVzLlxyXG4gKi9cclxuQERpcmVjdGl2ZSh7c2VsZWN0b3I6ICduZy10ZW1wbGF0ZVtuZ2JUYWJUaXRsZV0nfSlcclxuZXhwb3J0IGNsYXNzIE5nYlRhYlRpdGxlIHtcclxuICBjb25zdHJ1Y3RvcihwdWJsaWMgdGVtcGxhdGVSZWY6IFRlbXBsYXRlUmVmPGFueT4pIHt9XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBUaGlzIGRpcmVjdGl2ZSBtdXN0IGJlIHVzZWQgdG8gd3JhcCBjb250ZW50IHRvIGJlIGRpc3BsYXllZCBpbiBhIHRhYi5cclxuICovXHJcbkBEaXJlY3RpdmUoe3NlbGVjdG9yOiAnbmctdGVtcGxhdGVbbmdiVGFiQ29udGVudF0nfSlcclxuZXhwb3J0IGNsYXNzIE5nYlRhYkNvbnRlbnQge1xyXG4gIGNvbnN0cnVjdG9yKHB1YmxpYyB0ZW1wbGF0ZVJlZjogVGVtcGxhdGVSZWY8YW55Pikge31cclxufVxyXG5cclxuLyoqXHJcbiAqIEEgZGlyZWN0aXZlIHJlcHJlc2VudGluZyBhbiBpbmRpdmlkdWFsIHRhYi5cclxuICovXHJcbkBEaXJlY3RpdmUoe3NlbGVjdG9yOiAnbmdiLXRhYid9KVxyXG5leHBvcnQgY2xhc3MgTmdiVGFiIHtcclxuICAvKipcclxuICAgKiBVbmlxdWUgdGFiIGlkZW50aWZpZXIuIE11c3QgYmUgdW5pcXVlIGZvciB0aGUgZW50aXJlIGRvY3VtZW50IGZvciBwcm9wZXIgYWNjZXNzaWJpbGl0eSBzdXBwb3J0LlxyXG4gICAqL1xyXG4gIEBJbnB1dCgpIGlkID0gYG5nYi10YWItJHtuZXh0SWQrK31gO1xyXG4gIC8qKlxyXG4gICAqIFNpbXBsZSAoc3RyaW5nIG9ubHkpIHRpdGxlLiBVc2UgdGhlIFwiTmdiVGFiVGl0bGVcIiBkaXJlY3RpdmUgZm9yIG1vcmUgY29tcGxleCB1c2UtY2FzZXMuXHJcbiAgICovXHJcbiAgQElucHV0KCkgdGl0bGU6IHN0cmluZztcclxuICAvKipcclxuICAgKiBBbGxvd3MgdG9nZ2xpbmcgZGlzYWJsZWQgc3RhdGUgb2YgYSBnaXZlbiBzdGF0ZS4gRGlzYWJsZWQgdGFicyBjYW4ndCBiZSBzZWxlY3RlZC5cclxuICAgKi9cclxuICBASW5wdXQoKSBkaXNhYmxlZCA9IGZhbHNlO1xyXG5cclxuICB0aXRsZVRwbDogTmdiVGFiVGl0bGUgfCBudWxsO1xyXG4gIGNvbnRlbnRUcGw6IE5nYlRhYkNvbnRlbnQgfCBudWxsO1xyXG5cclxuICBAQ29udGVudENoaWxkcmVuKE5nYlRhYlRpdGxlLCB7ZGVzY2VuZGFudHM6IGZhbHNlfSkgdGl0bGVUcGxzOiBRdWVyeUxpc3Q8TmdiVGFiVGl0bGU+O1xyXG4gIEBDb250ZW50Q2hpbGRyZW4oTmdiVGFiQ29udGVudCwge2Rlc2NlbmRhbnRzOiBmYWxzZX0pIGNvbnRlbnRUcGxzOiBRdWVyeUxpc3Q8TmdiVGFiQ29udGVudD47XHJcblxyXG4gIG5nQWZ0ZXJDb250ZW50Q2hlY2tlZCgpIHtcclxuICAgIC8vIFdlIGFyZSB1c2luZyBAQ29udGVudENoaWxkcmVuIGluc3RlYWQgb2YgQENvbnRlbnRDaGlsZCBhcyBpbiB0aGUgQW5ndWxhciB2ZXJzaW9uIGJlaW5nIHVzZWRcclxuICAgIC8vIG9ubHkgQENvbnRlbnRDaGlsZHJlbiBhbGxvd3MgdXMgdG8gc3BlY2lmeSB0aGUge2Rlc2NlbmRhbnRzOiBmYWxzZX0gb3B0aW9uLlxyXG4gICAgLy8gV2l0aG91dCB7ZGVzY2VuZGFudHM6IGZhbHNlfSB3ZSBhcmUgaGl0dGluZyBidWdzIGRlc2NyaWJlZCBpbjpcclxuICAgIC8vIGh0dHBzOi8vZ2l0aHViLmNvbS9uZy1ib290c3RyYXAvbmctYm9vdHN0cmFwL2lzc3Vlcy8yMjQwXHJcbiAgICB0aGlzLnRpdGxlVHBsID0gdGhpcy50aXRsZVRwbHMuZmlyc3Q7XHJcbiAgICB0aGlzLmNvbnRlbnRUcGwgPSB0aGlzLmNvbnRlbnRUcGxzLmZpcnN0O1xyXG4gIH1cclxufVxyXG5cclxuLyoqXHJcbiAqIFRoZSBwYXlsb2FkIG9mIHRoZSBjaGFuZ2UgZXZlbnQgZmlyZWQgcmlnaHQgYmVmb3JlIHRoZSB0YWIgY2hhbmdlXHJcbiAqL1xyXG5leHBvcnQgaW50ZXJmYWNlIE5nYlRhYkNoYW5nZUV2ZW50IHtcclxuICAvKipcclxuICAgKiBJZCBvZiB0aGUgY3VycmVudGx5IGFjdGl2ZSB0YWJcclxuICAgKi9cclxuICBhY3RpdmVJZDogc3RyaW5nO1xyXG5cclxuICAvKipcclxuICAgKiBJZCBvZiB0aGUgbmV3bHkgc2VsZWN0ZWQgdGFiXHJcbiAgICovXHJcbiAgbmV4dElkOiBzdHJpbmc7XHJcblxyXG4gIC8qKlxyXG4gICAqIEZ1bmN0aW9uIHRoYXQgd2lsbCBwcmV2ZW50IHRhYiBzd2l0Y2ggaWYgY2FsbGVkXHJcbiAgICovXHJcbiAgcHJldmVudERlZmF1bHQ6ICgpID0+IHZvaWQ7XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBBIGNvbXBvbmVudCB0aGF0IG1ha2VzIGl0IGVhc3kgdG8gY3JlYXRlIHRhYmJlZCBpbnRlcmZhY2UuXHJcbiAqL1xyXG5AQ29tcG9uZW50KHtcclxuICBzZWxlY3RvcjogJ25nYi10YWJzZXQnLFxyXG4gIGV4cG9ydEFzOiAnbmdiVGFic2V0JyxcclxuICB0ZW1wbGF0ZTogYFxyXG4gICAgPHVsIFtjbGFzc109XCInbmF2IG5hdi0nICsgdHlwZSArIChvcmllbnRhdGlvbiA9PSAnaG9yaXpvbnRhbCc/ICAnICcgKyBqdXN0aWZ5Q2xhc3MgOiAnIGZsZXgtY29sdW1uJylcIiByb2xlPVwidGFibGlzdFwiPlxyXG4gICAgICA8bGkgY2xhc3M9XCJuYXYtaXRlbVwiICpuZ0Zvcj1cImxldCB0YWIgb2YgdGFic1wiPlxyXG4gICAgICAgIDxhIFtpZF09XCJ0YWIuaWRcIiBjbGFzcz1cIm5hdi1saW5rXCIgW2NsYXNzLmFjdGl2ZV09XCJ0YWIuaWQgPT09IGFjdGl2ZUlkXCIgW2NsYXNzLmRpc2FibGVkXT1cInRhYi5kaXNhYmxlZFwiXHJcbiAgICAgICAgICBocmVmIChjbGljayk9XCIhIXNlbGVjdCh0YWIuaWQpXCIgcm9sZT1cInRhYlwiIFthdHRyLnRhYmluZGV4XT1cIih0YWIuZGlzYWJsZWQgPyAnLTEnOiB1bmRlZmluZWQpXCJcclxuICAgICAgICAgIFthdHRyLmFyaWEtY29udHJvbHNdPVwiKCFkZXN0cm95T25IaWRlIHx8IHRhYi5pZCA9PT0gYWN0aXZlSWQgPyB0YWIuaWQgKyAnLXBhbmVsJyA6IG51bGwpXCJcclxuICAgICAgICAgIFthdHRyLmFyaWEtZXhwYW5kZWRdPVwidGFiLmlkID09PSBhY3RpdmVJZFwiIFthdHRyLmFyaWEtZGlzYWJsZWRdPVwidGFiLmRpc2FibGVkXCI+XHJcbiAgICAgICAgICB7e3RhYi50aXRsZX19PG5nLXRlbXBsYXRlIFtuZ1RlbXBsYXRlT3V0bGV0XT1cInRhYi50aXRsZVRwbD8udGVtcGxhdGVSZWZcIj48L25nLXRlbXBsYXRlPlxyXG4gICAgICAgIDwvYT5cclxuICAgICAgPC9saT5cclxuICAgIDwvdWw+XHJcbiAgICA8ZGl2IGNsYXNzPVwidGFiLWNvbnRlbnRcIj5cclxuICAgICAgPG5nLXRlbXBsYXRlIG5nRm9yIGxldC10YWIgW25nRm9yT2ZdPVwidGFic1wiPlxyXG4gICAgICAgIDxkaXZcclxuICAgICAgICAgIGNsYXNzPVwidGFiLXBhbmUge3t0YWIuaWQgPT09IGFjdGl2ZUlkID8gJ2FjdGl2ZScgOiBudWxsfX1cIlxyXG4gICAgICAgICAgKm5nSWY9XCIhZGVzdHJveU9uSGlkZSB8fCB0YWIuaWQgPT09IGFjdGl2ZUlkXCJcclxuICAgICAgICAgIHJvbGU9XCJ0YWJwYW5lbFwiXHJcbiAgICAgICAgICBbYXR0ci5hcmlhLWxhYmVsbGVkYnldPVwidGFiLmlkXCIgaWQ9XCJ7e3RhYi5pZH19LXBhbmVsXCJcclxuICAgICAgICAgIFthdHRyLmFyaWEtZXhwYW5kZWRdPVwidGFiLmlkID09PSBhY3RpdmVJZFwiPlxyXG4gICAgICAgICAgPG5nLXRlbXBsYXRlIFtuZ1RlbXBsYXRlT3V0bGV0XT1cInRhYi5jb250ZW50VHBsPy50ZW1wbGF0ZVJlZlwiPjwvbmctdGVtcGxhdGU+XHJcbiAgICAgICAgPC9kaXY+XHJcbiAgICAgIDwvbmctdGVtcGxhdGU+XHJcbiAgICA8L2Rpdj5cclxuICBgXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBOZ2JUYWJzZXQgaW1wbGVtZW50cyBBZnRlckNvbnRlbnRDaGVja2VkIHtcclxuICBqdXN0aWZ5Q2xhc3M6IHN0cmluZztcclxuXHJcbiAgQENvbnRlbnRDaGlsZHJlbihOZ2JUYWIpIHRhYnM6IFF1ZXJ5TGlzdDxOZ2JUYWI+O1xyXG5cclxuICAvKipcclxuICAgKiBBbiBpZGVudGlmaWVyIG9mIGFuIGluaXRpYWxseSBzZWxlY3RlZCAoYWN0aXZlKSB0YWIuIFVzZSB0aGUgXCJzZWxlY3RcIiBtZXRob2QgdG8gc3dpdGNoIGEgdGFiIHByb2dyYW1tYXRpY2FsbHkuXHJcbiAgICovXHJcbiAgQElucHV0KCkgYWN0aXZlSWQ6IHN0cmluZztcclxuXHJcbiAgLyoqXHJcbiAgICogV2hldGhlciB0aGUgY2xvc2VkIHRhYnMgc2hvdWxkIGJlIGhpZGRlbiB3aXRob3V0IGRlc3Ryb3lpbmcgdGhlbVxyXG4gICAqL1xyXG4gIEBJbnB1dCgpIGRlc3Ryb3lPbkhpZGUgPSB0cnVlO1xyXG5cclxuICAvKipcclxuICAgKiBUaGUgaG9yaXpvbnRhbCBhbGlnbm1lbnQgb2YgdGhlIG5hdiB3aXRoIGZsZXhib3ggdXRpbGl0aWVzLiBDYW4gYmUgb25lIG9mICdzdGFydCcsICdjZW50ZXInLCAnZW5kJywgJ2ZpbGwnIG9yXHJcbiAgICogJ2p1c3RpZmllZCdcclxuICAgKiBUaGUgZGVmYXVsdCB2YWx1ZSBpcyAnc3RhcnQnLlxyXG4gICAqL1xyXG4gIEBJbnB1dCgpXHJcbiAgc2V0IGp1c3RpZnkoY2xhc3NOYW1lOiAnc3RhcnQnIHwgJ2NlbnRlcicgfCAnZW5kJyB8ICdmaWxsJyB8ICdqdXN0aWZpZWQnKSB7XHJcbiAgICBpZiAoY2xhc3NOYW1lID09PSAnZmlsbCcgfHwgY2xhc3NOYW1lID09PSAnanVzdGlmaWVkJykge1xyXG4gICAgICB0aGlzLmp1c3RpZnlDbGFzcyA9IGBuYXYtJHtjbGFzc05hbWV9YDtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHRoaXMuanVzdGlmeUNsYXNzID0gYGp1c3RpZnktY29udGVudC0ke2NsYXNzTmFtZX1gO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogVGhlIG9yaWVudGF0aW9uIG9mIHRoZSBuYXYgKGhvcml6b250YWwgb3IgdmVydGljYWwpLlxyXG4gICAqIFRoZSBkZWZhdWx0IHZhbHVlIGlzICdob3Jpem9udGFsJy5cclxuICAgKi9cclxuICBASW5wdXQoKSBvcmllbnRhdGlvbjogJ2hvcml6b250YWwnIHwgJ3ZlcnRpY2FsJztcclxuXHJcbiAgLyoqXHJcbiAgICogVHlwZSBvZiBuYXZpZ2F0aW9uIHRvIGJlIHVzZWQgZm9yIHRhYnMuIENhbiBiZSBvbmUgb2YgQm9vdHN0cmFwIGRlZmluZWQgdHlwZXMgKCd0YWJzJyBvciAncGlsbHMnKS5cclxuICAgKiBTaW5jZSAzLjAuMCBjYW4gYWxzbyBiZSBhbiBhcmJpdHJhcnkgc3RyaW5nIChmb3IgY3VzdG9tIHRoZW1lcykuXHJcbiAgICovXHJcbiAgQElucHV0KCkgdHlwZTogJ3RhYnMnIHwgJ3BpbGxzJyB8IHN0cmluZztcclxuXHJcbiAgLyoqXHJcbiAgICogQSB0YWIgY2hhbmdlIGV2ZW50IGZpcmVkIHJpZ2h0IGJlZm9yZSB0aGUgdGFiIHNlbGVjdGlvbiBoYXBwZW5zLiBTZWUgTmdiVGFiQ2hhbmdlRXZlbnQgZm9yIHBheWxvYWQgZGV0YWlsc1xyXG4gICAqL1xyXG4gIEBPdXRwdXQoKSB0YWJDaGFuZ2UgPSBuZXcgRXZlbnRFbWl0dGVyPE5nYlRhYkNoYW5nZUV2ZW50PigpO1xyXG5cclxuICBjb25zdHJ1Y3Rvcihjb25maWc6IE5nYlRhYnNldENvbmZpZykge1xyXG4gICAgdGhpcy50eXBlID0gY29uZmlnLnR5cGU7XHJcbiAgICB0aGlzLmp1c3RpZnkgPSBjb25maWcuanVzdGlmeTtcclxuICAgIHRoaXMub3JpZW50YXRpb24gPSBjb25maWcub3JpZW50YXRpb247XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBTZWxlY3RzIHRoZSB0YWIgd2l0aCB0aGUgZ2l2ZW4gaWQgYW5kIHNob3dzIGl0cyBhc3NvY2lhdGVkIHBhbmUuXHJcbiAgICogQW55IG90aGVyIHRhYiB0aGF0IHdhcyBwcmV2aW91c2x5IHNlbGVjdGVkIGJlY29tZXMgdW5zZWxlY3RlZCBhbmQgaXRzIGFzc29jaWF0ZWQgcGFuZSBpcyBoaWRkZW4uXHJcbiAgICovXHJcbiAgc2VsZWN0KHRhYklkOiBzdHJpbmcpIHtcclxuICAgIGxldCBzZWxlY3RlZFRhYiA9IHRoaXMuX2dldFRhYkJ5SWQodGFiSWQpO1xyXG4gICAgaWYgKHNlbGVjdGVkVGFiICYmICFzZWxlY3RlZFRhYi5kaXNhYmxlZCAmJiB0aGlzLmFjdGl2ZUlkICE9PSBzZWxlY3RlZFRhYi5pZCkge1xyXG4gICAgICBsZXQgZGVmYXVsdFByZXZlbnRlZCA9IGZhbHNlO1xyXG5cclxuICAgICAgdGhpcy50YWJDaGFuZ2UuZW1pdChcclxuICAgICAgICAgIHthY3RpdmVJZDogdGhpcy5hY3RpdmVJZCwgbmV4dElkOiBzZWxlY3RlZFRhYi5pZCwgcHJldmVudERlZmF1bHQ6ICgpID0+IHsgZGVmYXVsdFByZXZlbnRlZCA9IHRydWU7IH19KTtcclxuXHJcbiAgICAgIGlmICghZGVmYXVsdFByZXZlbnRlZCkge1xyXG4gICAgICAgIHRoaXMuYWN0aXZlSWQgPSBzZWxlY3RlZFRhYi5pZDtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgbmdBZnRlckNvbnRlbnRDaGVja2VkKCkge1xyXG4gICAgLy8gYXV0by1jb3JyZWN0IGFjdGl2ZUlkIHRoYXQgbWlnaHQgaGF2ZSBiZWVuIHNldCBpbmNvcnJlY3RseSBhcyBpbnB1dFxyXG4gICAgbGV0IGFjdGl2ZVRhYiA9IHRoaXMuX2dldFRhYkJ5SWQodGhpcy5hY3RpdmVJZCk7XHJcbiAgICB0aGlzLmFjdGl2ZUlkID0gYWN0aXZlVGFiID8gYWN0aXZlVGFiLmlkIDogKHRoaXMudGFicy5sZW5ndGggPyB0aGlzLnRhYnMuZmlyc3QuaWQgOiBudWxsKTtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgX2dldFRhYkJ5SWQoaWQ6IHN0cmluZyk6IE5nYlRhYiB7XHJcbiAgICBsZXQgdGFic1dpdGhJZDogTmdiVGFiW10gPSB0aGlzLnRhYnMuZmlsdGVyKHRhYiA9PiB0YWIuaWQgPT09IGlkKTtcclxuICAgIHJldHVybiB0YWJzV2l0aElkLmxlbmd0aCA/IHRhYnNXaXRoSWRbMF0gOiBudWxsO1xyXG4gIH1cclxufVxyXG4iXX0=