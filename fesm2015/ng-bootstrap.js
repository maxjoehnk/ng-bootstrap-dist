import { Injectable, Directive, NgModule, ElementRef, forwardRef, Input, Renderer2, ChangeDetectionStrategy, ChangeDetectorRef, Component, ContentChildren, EventEmitter, Inject, NgZone, Output, PLATFORM_ID, TemplateRef, LOCALE_ID, ContentChild, Injector, ViewContainerRef, ComponentFactoryResolver, InjectionToken, defineInjectable, inject, ApplicationRef, RendererFactory2, INJECTOR } from '@angular/core';
import { CommonModule, isPlatformBrowser, FormStyle, getLocaleDayNames, getLocaleMonthNames, TranslationWidth, formatDate, DOCUMENT } from '@angular/common';
import { NG_VALUE_ACCESSOR, NG_VALIDATORS, FormsModule } from '@angular/forms';
import { Subject, timer, fromEvent, race, NEVER, merge, BehaviorSubject } from 'rxjs';
import { filter, map, switchMap, takeUntil, take, withLatestFrom, tap } from 'rxjs/operators';

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
/**
 * @param {?} value
 * @return {?}
 */
function toInteger(value) {
    return parseInt(`${value}`, 10);
}
/**
 * @param {?} value
 * @return {?}
 */
function toString(value) {
    return (value !== undefined && value !== null) ? `${value}` : '';
}
/**
 * @param {?} value
 * @param {?} max
 * @param {?=} min
 * @return {?}
 */
function getValueInRange(value, max, min = 0) {
    return Math.max(Math.min(value, max), min);
}
/**
 * @param {?} value
 * @return {?}
 */
function isString(value) {
    return typeof value === 'string';
}
/**
 * @param {?} value
 * @return {?}
 */
function isNumber(value) {
    return !isNaN(toInteger(value));
}
/**
 * @param {?} value
 * @return {?}
 */
function isInteger(value) {
    return typeof value === 'number' && isFinite(value) && Math.floor(value) === value;
}
/**
 * @param {?} value
 * @return {?}
 */
function isDefined(value) {
    return value !== undefined && value !== null;
}
/**
 * @param {?} value
 * @return {?}
 */
function padNumber(value) {
    if (isNumber(value)) {
        return `0${value}`.slice(-2);
    }
    else {
        return '';
    }
}
/**
 * @param {?} text
 * @return {?}
 */
function regExpEscape(text) {
    return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&');
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
/**
 * Configuration service for the NgbAccordion component.
 * You can inject this service, typically in your root component, and customize the values of its properties in
 * order to provide default values for all the accordions used in the application.
 */
class NgbAccordionConfig {
    constructor() {
        this.closeOthers = false;
    }
}
NgbAccordionConfig.decorators = [
    { type: Injectable, args: [{ providedIn: 'root' },] },
];
/** @nocollapse */ NgbAccordionConfig.ngInjectableDef = defineInjectable({ factory: function NgbAccordionConfig_Factory() { return new NgbAccordionConfig(); }, token: NgbAccordionConfig, providedIn: "root" });

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
/** @type {?} */
let nextId = 0;
/**
 * This directive should be used to wrap accordion panel titles that need to contain HTML markup or other directives.
 */
class NgbPanelTitle {
    /**
     * @param {?} templateRef
     */
    constructor(templateRef) {
        this.templateRef = templateRef;
    }
}
NgbPanelTitle.decorators = [
    { type: Directive, args: [{ selector: 'ng-template[ngbPanelTitle]' },] },
];
/** @nocollapse */
NgbPanelTitle.ctorParameters = () => [
    { type: TemplateRef }
];
/**
 * This directive must be used to wrap accordion panel content.
 */
class NgbPanelContent {
    /**
     * @param {?} templateRef
     */
    constructor(templateRef) {
        this.templateRef = templateRef;
    }
}
NgbPanelContent.decorators = [
    { type: Directive, args: [{ selector: 'ng-template[ngbPanelContent]' },] },
];
/** @nocollapse */
NgbPanelContent.ctorParameters = () => [
    { type: TemplateRef }
];
/**
 * The NgbPanel directive represents an individual panel with the title and collapsible
 * content
 */
class NgbPanel {
    constructor() {
        /**
         *  A flag determining whether the panel is disabled or not.
         *  When disabled, the panel cannot be toggled.
         */
        this.disabled = false;
        /**
         *  An optional id for the panel. The id should be unique.
         *  If not provided, it will be auto-generated.
         */
        this.id = `ngb-panel-${nextId++}`;
        /**
         * A flag telling if the panel is currently open
         */
        this.isOpen = false;
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
NgbPanel.decorators = [
    { type: Directive, args: [{ selector: 'ngb-panel' },] },
];
NgbPanel.propDecorators = {
    disabled: [{ type: Input }],
    id: [{ type: Input }],
    title: [{ type: Input }],
    type: [{ type: Input }],
    titleTpls: [{ type: ContentChildren, args: [NgbPanelTitle, { descendants: false },] }],
    contentTpls: [{ type: ContentChildren, args: [NgbPanelContent, { descendants: false },] }]
};
/**
 * The NgbAccordion directive is a collection of panels.
 * It can assure that only one panel can be opened at a time.
 */
class NgbAccordion {
    /**
     * @param {?} config
     */
    constructor(config) {
        /**
         * An array or comma separated strings of panel identifiers that should be opened
         */
        this.activeIds = [];
        /**
         * Whether the closed panels should be hidden without destroying them
         */
        this.destroyOnHide = true;
        /**
         * A panel change event fired right before the panel toggle happens. See NgbPanelChangeEvent for payload details
         */
        this.panelChange = new EventEmitter();
        this.type = config.type;
        this.closeOtherPanels = config.closeOthers;
    }
    /**
     * Checks if a panel with a given id is expanded or not.
     * @param {?} panelId
     * @return {?}
     */
    isExpanded(panelId) { return this.activeIds.indexOf(panelId) > -1; }
    /**
     * Expands a panel with a given id. Has no effect if the panel is already expanded or disabled.
     * @param {?} panelId
     * @return {?}
     */
    expand(panelId) { this._changeOpenState(this._findPanelById(panelId), true); }
    /**
     * Expands all panels if [closeOthers]="false". For the [closeOthers]="true" case will have no effect if there is an
     * open panel, otherwise the first panel will be expanded.
     * @return {?}
     */
    expandAll() {
        if (this.closeOtherPanels) {
            if (this.activeIds.length === 0 && this.panels.length) {
                this._changeOpenState(this.panels.first, true);
            }
        }
        else {
            this.panels.forEach(panel => this._changeOpenState(panel, true));
        }
    }
    /**
     * Collapses a panel with a given id. Has no effect if the panel is already collapsed or disabled.
     * @param {?} panelId
     * @return {?}
     */
    collapse(panelId) { this._changeOpenState(this._findPanelById(panelId), false); }
    /**
     * Collapses all open panels.
     * @return {?}
     */
    collapseAll() {
        this.panels.forEach((panel) => { this._changeOpenState(panel, false); });
    }
    /**
     * Programmatically toggle a panel with a given id. Has no effect if the panel is disabled.
     * @param {?} panelId
     * @return {?}
     */
    toggle(panelId) {
        /** @type {?} */
        const panel = this._findPanelById(panelId);
        if (panel) {
            this._changeOpenState(panel, !panel.isOpen);
        }
    }
    /**
     * @return {?}
     */
    ngAfterContentChecked() {
        // active id updates
        if (isString(this.activeIds)) {
            this.activeIds = this.activeIds.split(/\s*,\s*/);
        }
        // update panels open states
        this.panels.forEach(panel => panel.isOpen = !panel.disabled && this.activeIds.indexOf(panel.id) > -1);
        // closeOthers updates
        if (this.activeIds.length > 1 && this.closeOtherPanels) {
            this._closeOthers(this.activeIds[0]);
            this._updateActiveIds();
        }
    }
    /**
     * @param {?} panel
     * @param {?} nextState
     * @return {?}
     */
    _changeOpenState(panel, nextState) {
        if (panel && !panel.disabled && panel.isOpen !== nextState) {
            /** @type {?} */
            let defaultPrevented = false;
            this.panelChange.emit({ panelId: panel.id, nextState: nextState, preventDefault: () => { defaultPrevented = true; } });
            if (!defaultPrevented) {
                panel.isOpen = nextState;
                if (nextState && this.closeOtherPanels) {
                    this._closeOthers(panel.id);
                }
                this._updateActiveIds();
            }
        }
    }
    /**
     * @param {?} panelId
     * @return {?}
     */
    _closeOthers(panelId) {
        this.panels.forEach(panel => {
            if (panel.id !== panelId) {
                panel.isOpen = false;
            }
        });
    }
    /**
     * @param {?} panelId
     * @return {?}
     */
    _findPanelById(panelId) { return this.panels.find(p => p.id === panelId); }
    /**
     * @return {?}
     */
    _updateActiveIds() {
        this.activeIds = this.panels.filter(panel => panel.isOpen && !panel.disabled).map(panel => panel.id);
    }
}
NgbAccordion.decorators = [
    { type: Component, args: [{
                selector: 'ngb-accordion',
                exportAs: 'ngbAccordion',
                host: { 'class': 'accordion', 'role': 'tablist', '[attr.aria-multiselectable]': '!closeOtherPanels' },
                template: `
    <ng-template ngFor let-panel [ngForOf]="panels">
      <div class="card">
        <div role="tab" id="{{panel.id}}-header" [class]="'card-header ' + (panel.type ? 'bg-'+panel.type: type ? 'bg-'+type : '')">
          <h5 class="mb-0">
            <button class="btn btn-link" (click)="!!toggle(panel.id)" [disabled]="panel.disabled" [class.collapsed]="!panel.isOpen"
              [attr.aria-expanded]="panel.isOpen" [attr.aria-controls]="panel.id">
              {{panel.title}}<ng-template [ngTemplateOutlet]="panel.titleTpl?.templateRef"></ng-template>
            </button>
          </h5>
        </div>
        <div id="{{panel.id}}" role="tabpanel" [attr.aria-labelledby]="panel.id + '-header'"
             class="collapse" [class.show]="panel.isOpen" *ngIf="!destroyOnHide || panel.isOpen">
          <div class="card-body">
               <ng-template [ngTemplateOutlet]="panel.contentTpl?.templateRef"></ng-template>
          </div>
        </div>
      </div>
    </ng-template>
  `
            },] },
];
/** @nocollapse */
NgbAccordion.ctorParameters = () => [
    { type: NgbAccordionConfig }
];
NgbAccordion.propDecorators = {
    panels: [{ type: ContentChildren, args: [NgbPanel,] }],
    activeIds: [{ type: Input }],
    closeOtherPanels: [{ type: Input, args: ['closeOthers',] }],
    destroyOnHide: [{ type: Input }],
    type: [{ type: Input }],
    panelChange: [{ type: Output }]
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
/** @type {?} */
const NGB_ACCORDION_DIRECTIVES = [NgbAccordion, NgbPanel, NgbPanelTitle, NgbPanelContent];
class NgbAccordionModule {
    /**
     * Importing with '.forRoot()' is no longer necessary, you can simply import the module.
     * Will be removed in 4.0.0.
     *
     * @deprecated 3.0.0
     * @return {?}
     */
    static forRoot() { return { ngModule: NgbAccordionModule }; }
}
NgbAccordionModule.decorators = [
    { type: NgModule, args: [{ declarations: NGB_ACCORDION_DIRECTIVES, exports: NGB_ACCORDION_DIRECTIVES, imports: [CommonModule] },] },
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
/**
 * Configuration service for the NgbAlert component.
 * You can inject this service, typically in your root component, and customize the values of its properties in
 * order to provide default values for all the alerts used in the application.
 */
class NgbAlertConfig {
    constructor() {
        this.dismissible = true;
        this.type = 'warning';
    }
}
NgbAlertConfig.decorators = [
    { type: Injectable, args: [{ providedIn: 'root' },] },
];
/** @nocollapse */ NgbAlertConfig.ngInjectableDef = defineInjectable({ factory: function NgbAlertConfig_Factory() { return new NgbAlertConfig(); }, token: NgbAlertConfig, providedIn: "root" });

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
/**
 * Alerts can be used to provide feedback messages.
 */
class NgbAlert {
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

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
class NgbAlertModule {
    /**
     * Importing with '.forRoot()' is no longer necessary, you can simply import the module.
     * Will be removed in 4.0.0.
     *
     * @deprecated 3.0.0
     * @return {?}
     */
    static forRoot() { return { ngModule: NgbAlertModule }; }
}
NgbAlertModule.decorators = [
    { type: NgModule, args: [{ declarations: [NgbAlert], exports: [NgbAlert], imports: [CommonModule], entryComponents: [NgbAlert] },] },
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
class NgbButtonLabel {
}
NgbButtonLabel.decorators = [
    { type: Directive, args: [{
                selector: '[ngbButtonLabel]',
                host: { '[class.btn]': 'true', '[class.active]': 'active', '[class.disabled]': 'disabled', '[class.focus]': 'focused' }
            },] },
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
/** @type {?} */
const NGB_CHECKBOX_VALUE_ACCESSOR = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => NgbCheckBox),
    multi: true
};
/**
 * Easily create Bootstrap-style checkbox buttons. A value of a checked button is bound to a variable
 * specified via ngModel.
 */
class NgbCheckBox {
    /**
     * @param {?} _label
     */
    constructor(_label) {
        this._label = _label;
        /**
         * A flag indicating if a given checkbox button is disabled.
         */
        this.disabled = false;
        /**
         * Value to be propagated as model when the checkbox is checked.
         */
        this.valueChecked = true;
        /**
         * Value to be propagated as model when the checkbox is unchecked.
         */
        this.valueUnChecked = false;
        this.onChange = (_) => { };
        this.onTouched = () => { };
    }
    /**
     * @param {?} isFocused
     * @return {?}
     */
    set focused(isFocused) {
        this._label.focused = isFocused;
        if (!isFocused) {
            this.onTouched();
        }
    }
    /**
     * @param {?} $event
     * @return {?}
     */
    onInputChange($event) {
        /** @type {?} */
        const modelToPropagate = $event.target.checked ? this.valueChecked : this.valueUnChecked;
        this.onChange(modelToPropagate);
        this.onTouched();
        this.writeValue(modelToPropagate);
    }
    /**
     * @param {?} fn
     * @return {?}
     */
    registerOnChange(fn) { this.onChange = fn; }
    /**
     * @param {?} fn
     * @return {?}
     */
    registerOnTouched(fn) { this.onTouched = fn; }
    /**
     * @param {?} isDisabled
     * @return {?}
     */
    setDisabledState(isDisabled) {
        this.disabled = isDisabled;
        this._label.disabled = isDisabled;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    writeValue(value) {
        this.checked = value === this.valueChecked;
        this._label.active = this.checked;
    }
}
NgbCheckBox.decorators = [
    { type: Directive, args: [{
                selector: '[ngbButton][type=checkbox]',
                host: {
                    'autocomplete': 'off',
                    '[checked]': 'checked',
                    '[disabled]': 'disabled',
                    '(change)': 'onInputChange($event)',
                    '(focus)': 'focused = true',
                    '(blur)': 'focused = false'
                },
                providers: [NGB_CHECKBOX_VALUE_ACCESSOR]
            },] },
];
/** @nocollapse */
NgbCheckBox.ctorParameters = () => [
    { type: NgbButtonLabel }
];
NgbCheckBox.propDecorators = {
    disabled: [{ type: Input }],
    valueChecked: [{ type: Input }],
    valueUnChecked: [{ type: Input }]
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
/** @type {?} */
const NGB_RADIO_VALUE_ACCESSOR = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => NgbRadioGroup),
    multi: true
};
/** @type {?} */
let nextId$1 = 0;
/**
 * Easily create Bootstrap-style radio buttons. A value of a selected button is bound to a variable
 * specified via ngModel.
 */
class NgbRadioGroup {
    constructor() {
        this._radios = new Set();
        this._value = null;
        /**
         * The name of the group. Unless enclosed inputs specify a name, this name is used as the name of the
         * enclosed inputs. If not specified, a name is generated automatically.
         */
        this.name = `ngb-radio-${nextId$1++}`;
        this.onChange = (_) => { };
        this.onTouched = () => { };
    }
    /**
     * @return {?}
     */
    get disabled() { return this._disabled; }
    /**
     * @param {?} isDisabled
     * @return {?}
     */
    set disabled(isDisabled) { this.setDisabledState(isDisabled); }
    /**
     * @param {?} radio
     * @return {?}
     */
    onRadioChange(radio) {
        this.writeValue(radio.value);
        this.onChange(radio.value);
    }
    /**
     * @return {?}
     */
    onRadioValueUpdate() { this._updateRadiosValue(); }
    /**
     * @param {?} radio
     * @return {?}
     */
    register(radio) { this._radios.add(radio); }
    /**
     * @param {?} fn
     * @return {?}
     */
    registerOnChange(fn) { this.onChange = fn; }
    /**
     * @param {?} fn
     * @return {?}
     */
    registerOnTouched(fn) { this.onTouched = fn; }
    /**
     * @param {?} isDisabled
     * @return {?}
     */
    setDisabledState(isDisabled) {
        this._disabled = isDisabled;
        this._updateRadiosDisabled();
    }
    /**
     * @param {?} radio
     * @return {?}
     */
    unregister(radio) { this._radios.delete(radio); }
    /**
     * @param {?} value
     * @return {?}
     */
    writeValue(value) {
        this._value = value;
        this._updateRadiosValue();
    }
    /**
     * @return {?}
     */
    _updateRadiosValue() { this._radios.forEach((radio) => radio.updateValue(this._value)); }
    /**
     * @return {?}
     */
    _updateRadiosDisabled() { this._radios.forEach((radio) => radio.updateDisabled()); }
}
NgbRadioGroup.decorators = [
    { type: Directive, args: [{ selector: '[ngbRadioGroup]', host: { 'role': 'group' }, providers: [NGB_RADIO_VALUE_ACCESSOR] },] },
];
NgbRadioGroup.propDecorators = {
    name: [{ type: Input }]
};
/**
 * Marks an input of type "radio" as part of the NgbRadioGroup.
 */
class NgbRadio {
    /**
     * @param {?} _group
     * @param {?} _label
     * @param {?} _renderer
     * @param {?} _element
     */
    constructor(_group, _label, _renderer, _element) {
        this._group = _group;
        this._label = _label;
        this._renderer = _renderer;
        this._element = _element;
        this._value = null;
        this._group.register(this);
        this.updateDisabled();
    }
    /**
     * You can specify model value of a given radio by binding to the value property.
     * @param {?} value
     * @return {?}
     */
    set value(value) {
        this._value = value;
        /** @type {?} */
        const stringValue = value ? value.toString() : '';
        this._renderer.setProperty(this._element.nativeElement, 'value', stringValue);
        this._group.onRadioValueUpdate();
    }
    /**
     * A flag indicating if a given radio button is disabled.
     * @param {?} isDisabled
     * @return {?}
     */
    set disabled(isDisabled) {
        this._disabled = isDisabled !== false;
        this.updateDisabled();
    }
    /**
     * @param {?} isFocused
     * @return {?}
     */
    set focused(isFocused) {
        if (this._label) {
            this._label.focused = isFocused;
        }
        if (!isFocused) {
            this._group.onTouched();
        }
    }
    /**
     * @return {?}
     */
    get checked() { return this._checked; }
    /**
     * @return {?}
     */
    get disabled() { return this._group.disabled || this._disabled; }
    /**
     * @return {?}
     */
    get value() { return this._value; }
    /**
     * @return {?}
     */
    get nameAttr() { return this.name || this._group.name; }
    /**
     * @return {?}
     */
    ngOnDestroy() { this._group.unregister(this); }
    /**
     * @return {?}
     */
    onChange() { this._group.onRadioChange(this); }
    /**
     * @param {?} value
     * @return {?}
     */
    updateValue(value) {
        this._checked = this.value === value;
        this._label.active = this._checked;
    }
    /**
     * @return {?}
     */
    updateDisabled() { this._label.disabled = this.disabled; }
}
NgbRadio.decorators = [
    { type: Directive, args: [{
                selector: '[ngbButton][type=radio]',
                host: {
                    '[checked]': 'checked',
                    '[disabled]': 'disabled',
                    '[name]': 'nameAttr',
                    '(change)': 'onChange()',
                    '(focus)': 'focused = true',
                    '(blur)': 'focused = false'
                }
            },] },
];
/** @nocollapse */
NgbRadio.ctorParameters = () => [
    { type: NgbRadioGroup },
    { type: NgbButtonLabel },
    { type: Renderer2 },
    { type: ElementRef }
];
NgbRadio.propDecorators = {
    name: [{ type: Input }],
    value: [{ type: Input, args: ['value',] }],
    disabled: [{ type: Input, args: ['disabled',] }]
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
/** @type {?} */
const NGB_BUTTON_DIRECTIVES = [NgbButtonLabel, NgbCheckBox, NgbRadioGroup, NgbRadio];
class NgbButtonsModule {
    /**
     * Importing with '.forRoot()' is no longer necessary, you can simply import the module.
     * Will be removed in 4.0.0.
     *
     * @deprecated 3.0.0
     * @return {?}
     */
    static forRoot() { return { ngModule: NgbButtonsModule }; }
}
NgbButtonsModule.decorators = [
    { type: NgModule, args: [{ declarations: NGB_BUTTON_DIRECTIVES, exports: NGB_BUTTON_DIRECTIVES },] },
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
/**
 * Configuration service for the NgbCarousel component.
 * You can inject this service, typically in your root component, and customize the values of its properties in
 * order to provide default values for all the carousels used in the application.
 */
class NgbCarouselConfig {
    constructor() {
        this.interval = 5000;
        this.wrap = true;
        this.keyboard = true;
        this.pauseOnHover = true;
        this.showNavigationArrows = true;
        this.showNavigationIndicators = true;
    }
}
NgbCarouselConfig.decorators = [
    { type: Injectable, args: [{ providedIn: 'root' },] },
];
/** @nocollapse */ NgbCarouselConfig.ngInjectableDef = defineInjectable({ factory: function NgbCarouselConfig_Factory() { return new NgbCarouselConfig(); }, token: NgbCarouselConfig, providedIn: "root" });

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
/** @type {?} */
let nextId$2 = 0;
/**
 * Represents an individual slide to be used within a carousel.
 */
class NgbSlide {
    /**
     * @param {?} tplRef
     */
    constructor(tplRef) {
        this.tplRef = tplRef;
        /**
         * Unique slide identifier. Must be unique for the entire document for proper accessibility support.
         * Will be auto-generated if not provided.
         */
        this.id = `ngb-slide-${nextId$2++}`;
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
/**
 * Directive to easily create carousels based on Bootstrap's markup.
 */
class NgbCarousel {
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
/** @enum {string} */
var NgbSlideEventDirection = {
    LEFT: /** @type {?} */ ('left'),
    RIGHT: /** @type {?} */ ('right'),
};
/** @type {?} */
const NGB_CAROUSEL_DIRECTIVES = [NgbCarousel, NgbSlide];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
class NgbCarouselModule {
    /**
     * Importing with '.forRoot()' is no longer necessary, you can simply import the module.
     * Will be removed in 4.0.0.
     *
     * @deprecated 3.0.0
     * @return {?}
     */
    static forRoot() { return { ngModule: NgbCarouselModule }; }
}
NgbCarouselModule.decorators = [
    { type: NgModule, args: [{ declarations: NGB_CAROUSEL_DIRECTIVES, exports: NGB_CAROUSEL_DIRECTIVES, imports: [CommonModule] },] },
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
/**
 * The NgbCollapse directive provides a simple way to hide and show an element with animations.
 */
class NgbCollapse {
    constructor() {
        /**
         * A flag indicating collapsed (true) or open (false) state.
         */
        this.collapsed = false;
    }
}
NgbCollapse.decorators = [
    { type: Directive, args: [{
                selector: '[ngbCollapse]',
                exportAs: 'ngbCollapse',
                host: { '[class.collapse]': 'true', '[class.show]': '!collapsed' }
            },] },
];
NgbCollapse.propDecorators = {
    collapsed: [{ type: Input, args: ['ngbCollapse',] }]
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
class NgbCollapseModule {
    /**
     * Importing with '.forRoot()' is no longer necessary, you can simply import the module.
     * Will be removed in 4.0.0.
     *
     * @deprecated 3.0.0
     * @return {?}
     */
    static forRoot() { return { ngModule: NgbCollapseModule }; }
}
NgbCollapseModule.decorators = [
    { type: NgModule, args: [{ declarations: [NgbCollapse], exports: [NgbCollapse] },] },
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
/**
 * Simple class used for a date representation that datepicker also uses internally
 *
 * \@since 3.0.0
 */
class NgbDate {
    /**
     * Static method. Creates a new date object from the NgbDateStruct, ex. NgbDate.from({year: 2000,
     * month: 5, day: 1}). If the 'date' is already of NgbDate, the method will return the same object
     * @param {?} date
     * @return {?}
     */
    static from(date) {
        if (date instanceof NgbDate) {
            return date;
        }
        return date ? new NgbDate(date.year, date.month, date.day) : null;
    }
    /**
     * @param {?} year
     * @param {?} month
     * @param {?} day
     */
    constructor(year, month, day) {
        this.year = isInteger(year) ? year : null;
        this.month = isInteger(month) ? month : null;
        this.day = isInteger(day) ? day : null;
    }
    /**
     * Checks if current date is equal to another date
     * @param {?} other
     * @return {?}
     */
    equals(other) {
        return other && this.year === other.year && this.month === other.month && this.day === other.day;
    }
    /**
     * Checks if current date is before another date
     * @param {?} other
     * @return {?}
     */
    before(other) {
        if (!other) {
            return false;
        }
        if (this.year === other.year) {
            if (this.month === other.month) {
                return this.day === other.day ? false : this.day < other.day;
            }
            else {
                return this.month < other.month;
            }
        }
        else {
            return this.year < other.year;
        }
    }
    /**
     * Checks if current date is after another date
     * @param {?} other
     * @return {?}
     */
    after(other) {
        if (!other) {
            return false;
        }
        if (this.year === other.year) {
            if (this.month === other.month) {
                return this.day === other.day ? false : this.day > other.day;
            }
            else {
                return this.month > other.month;
            }
        }
        else {
            return this.year > other.year;
        }
    }
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
/**
 * @param {?} jsDate
 * @return {?}
 */
function fromJSDate(jsDate) {
    return new NgbDate(jsDate.getFullYear(), jsDate.getMonth() + 1, jsDate.getDate());
}
/**
 * @param {?} date
 * @return {?}
 */
function toJSDate(date) {
    /** @type {?} */
    const jsDate = new Date(date.year, date.month - 1, date.day, 12);
    // this is done avoid 30 -> 1930 conversion
    if (!isNaN(jsDate.getTime())) {
        jsDate.setFullYear(date.year);
    }
    return jsDate;
}
/**
 * @return {?}
 */
function NGB_DATEPICKER_CALENDAR_FACTORY() {
    return new NgbCalendarGregorian();
}
/**
 * Calendar used by the datepicker.
 * Default implementation uses Gregorian calendar.
 * @abstract
 */
class NgbCalendar {
}
NgbCalendar.decorators = [
    { type: Injectable, args: [{ providedIn: 'root', useFactory: NGB_DATEPICKER_CALENDAR_FACTORY },] },
];
/** @nocollapse */ NgbCalendar.ngInjectableDef = defineInjectable({ factory: NGB_DATEPICKER_CALENDAR_FACTORY, token: NgbCalendar, providedIn: "root" });
class NgbCalendarGregorian extends NgbCalendar {
    /**
     * @return {?}
     */
    getDaysPerWeek() { return 7; }
    /**
     * @return {?}
     */
    getMonths() { return [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]; }
    /**
     * @return {?}
     */
    getWeeksPerMonth() { return 6; }
    /**
     * @param {?} date
     * @param {?=} period
     * @param {?=} number
     * @return {?}
     */
    getNext(date, period = 'd', number = 1) {
        /** @type {?} */
        let jsDate = toJSDate(date);
        switch (period) {
            case 'y':
                return new NgbDate(date.year + number, 1, 1);
            case 'm':
                jsDate = new Date(date.year, date.month + number - 1, 1, 12);
                break;
            case 'd':
                jsDate.setDate(jsDate.getDate() + number);
                break;
            default:
                return date;
        }
        return fromJSDate(jsDate);
    }
    /**
     * @param {?} date
     * @param {?=} period
     * @param {?=} number
     * @return {?}
     */
    getPrev(date, period = 'd', number = 1) { return this.getNext(date, period, -number); }
    /**
     * @param {?} date
     * @return {?}
     */
    getWeekday(date) {
        /** @type {?} */
        let jsDate = toJSDate(date);
        /** @type {?} */
        let day = jsDate.getDay();
        // in JS Date Sun=0, in ISO 8601 Sun=7
        return day === 0 ? 7 : day;
    }
    /**
     * @param {?} week
     * @param {?} firstDayOfWeek
     * @return {?}
     */
    getWeekNumber(week, firstDayOfWeek) {
        // in JS Date Sun=0, in ISO 8601 Sun=7
        if (firstDayOfWeek === 7) {
            firstDayOfWeek = 0;
        }
        /** @type {?} */
        const thursdayIndex = (4 + 7 - firstDayOfWeek) % 7;
        /** @type {?} */
        let date = week[thursdayIndex];
        /** @type {?} */
        const jsDate = toJSDate(date);
        jsDate.setDate(jsDate.getDate() + 4 - (jsDate.getDay() || 7));
        /** @type {?} */
        const time = jsDate.getTime();
        jsDate.setMonth(0); // Compare with Jan 1
        jsDate.setDate(1);
        return Math.floor(Math.round((time - jsDate.getTime()) / 86400000) / 7) + 1;
    }
    /**
     * @return {?}
     */
    getToday() { return fromJSDate(new Date()); }
    /**
     * @param {?} date
     * @return {?}
     */
    isValid(date) {
        if (!date || !isInteger(date.year) || !isInteger(date.month) || !isInteger(date.day)) {
            return false;
        }
        /** @type {?} */
        const jsDate = toJSDate(date);
        return !isNaN(jsDate.getTime()) && jsDate.getFullYear() === date.year && jsDate.getMonth() + 1 === date.month &&
            jsDate.getDate() === date.day;
    }
}
NgbCalendarGregorian.decorators = [
    { type: Injectable },
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
/**
 * @param {?} prev
 * @param {?} next
 * @return {?}
 */
function isChangedDate(prev, next) {
    return !dateComparator(prev, next);
}
/**
 * @param {?} prev
 * @param {?} next
 * @return {?}
 */
function dateComparator(prev, next) {
    return (!prev && !next) || (!!prev && !!next && prev.equals(next));
}
/**
 * @param {?} minDate
 * @param {?} maxDate
 * @return {?}
 */
function checkMinBeforeMax(minDate, maxDate) {
    if (maxDate && minDate && maxDate.before(minDate)) {
        throw new Error(`'maxDate' ${maxDate} should be greater than 'minDate' ${minDate}`);
    }
}
/**
 * @param {?} date
 * @param {?} minDate
 * @param {?} maxDate
 * @return {?}
 */
function checkDateInRange(date, minDate, maxDate) {
    if (date && minDate && date.before(minDate)) {
        return minDate;
    }
    if (date && maxDate && date.after(maxDate)) {
        return maxDate;
    }
    return date;
}
/**
 * @param {?} date
 * @param {?} state
 * @return {?}
 */
function isDateSelectable(date, state) {
    const { minDate, maxDate, disabled, markDisabled } = state;
    // clang-format off
    return !(!isDefined(date) ||
        disabled ||
        (markDisabled && markDisabled(date, { year: date.year, month: date.month })) ||
        (minDate && date.before(minDate)) ||
        (maxDate && date.after(maxDate)));
    // clang-format on
}
/**
 * @param {?} calendar
 * @param {?} date
 * @param {?} minDate
 * @param {?} maxDate
 * @return {?}
 */
function generateSelectBoxMonths(calendar, date, minDate, maxDate) {
    if (!date) {
        return [];
    }
    /** @type {?} */
    let months = calendar.getMonths(date.year);
    if (minDate && date.year === minDate.year) {
        /** @type {?} */
        const index = months.findIndex(month => month === minDate.month);
        months = months.slice(index);
    }
    if (maxDate && date.year === maxDate.year) {
        /** @type {?} */
        const index = months.findIndex(month => month === maxDate.month);
        months = months.slice(0, index + 1);
    }
    return months;
}
/**
 * @param {?} date
 * @param {?} minDate
 * @param {?} maxDate
 * @return {?}
 */
function generateSelectBoxYears(date, minDate, maxDate) {
    if (!date) {
        return [];
    }
    /** @type {?} */
    const start = minDate && minDate.year || date.year - 10;
    /** @type {?} */
    const end = maxDate && maxDate.year || date.year + 10;
    return Array.from({ length: end - start + 1 }, (e, i) => start + i);
}
/**
 * @param {?} calendar
 * @param {?} date
 * @param {?} maxDate
 * @return {?}
 */
function nextMonthDisabled(calendar, date, maxDate) {
    return maxDate && calendar.getNext(date, 'm').after(maxDate);
}
/**
 * @param {?} calendar
 * @param {?} date
 * @param {?} minDate
 * @return {?}
 */
function prevMonthDisabled(calendar, date, minDate) {
    /** @type {?} */
    const prevDate = calendar.getPrev(date, 'm');
    return minDate && (prevDate.year === minDate.year && prevDate.month < minDate.month ||
        prevDate.year < minDate.year && minDate.month === 1);
}
/**
 * @param {?} calendar
 * @param {?} date
 * @param {?} state
 * @param {?} i18n
 * @param {?} force
 * @return {?}
 */
function buildMonths(calendar, date, state, i18n, force) {
    const { displayMonths, months } = state;
    /** @type {?} */
    const monthsToReuse = months.splice(0, months.length);
    /** @type {?} */
    const firstDates = Array.from({ length: displayMonths }, (_, i) => {
        /** @type {?} */
        const firstDate = calendar.getNext(date, 'm', i);
        months[i] = null;
        if (!force) {
            /** @type {?} */
            const reusedIndex = monthsToReuse.findIndex(month => month.firstDate.equals(firstDate));
            // move reused month back to months
            if (reusedIndex !== -1) {
                months[i] = monthsToReuse.splice(reusedIndex, 1)[0];
            }
        }
        return firstDate;
    });
    // rebuild nullified months
    firstDates.forEach((firstDate, i) => {
        if (months[i] === null) {
            months[i] = buildMonth(calendar, firstDate, state, i18n, monthsToReuse.shift() || /** @type {?} */ ({}));
        }
    });
    return months;
}
/**
 * @param {?} calendar
 * @param {?} date
 * @param {?} state
 * @param {?} i18n
 * @param {?=} month
 * @return {?}
 */
function buildMonth(calendar, date, state, i18n, month = /** @type {?} */ ({})) {
    const { minDate, maxDate, firstDayOfWeek, markDisabled, outsideDays } = state;
    month.firstDate = null;
    month.lastDate = null;
    month.number = date.month;
    month.year = date.year;
    month.weeks = month.weeks || [];
    month.weekdays = month.weekdays || [];
    date = getFirstViewDate(calendar, date, firstDayOfWeek);
    // month has weeks
    for (let week = 0; week < calendar.getWeeksPerMonth(); week++) {
        /** @type {?} */
        let weekObject = month.weeks[week];
        if (!weekObject) {
            weekObject = month.weeks[week] = { number: 0, days: [], collapsed: true };
        }
        /** @type {?} */
        const days = weekObject.days;
        // week has days
        for (let day = 0; day < calendar.getDaysPerWeek(); day++) {
            if (week === 0) {
                month.weekdays[day] = calendar.getWeekday(date);
            }
            /** @type {?} */
            const newDate = new NgbDate(date.year, date.month, date.day);
            /** @type {?} */
            const nextDate = calendar.getNext(newDate);
            /** @type {?} */
            const ariaLabel = i18n.getDayAriaLabel(newDate);
            /** @type {?} */
            let disabled = !!((minDate && newDate.before(minDate)) || (maxDate && newDate.after(maxDate)));
            if (!disabled && markDisabled) {
                disabled = markDisabled(newDate, { month: month.number, year: month.year });
            }
            // saving first date of the month
            if (month.firstDate === null && newDate.month === month.number) {
                month.firstDate = newDate;
            }
            // saving last date of the month
            if (newDate.month === month.number && nextDate.month !== month.number) {
                month.lastDate = newDate;
            }
            /** @type {?} */
            let dayObject = days[day];
            if (!dayObject) {
                dayObject = days[day] = /** @type {?} */ ({});
            }
            dayObject.date = newDate;
            dayObject.context = Object.assign(dayObject.context || {}, { date: newDate, currentMonth: month.number, disabled, focused: false, selected: false });
            dayObject.tabindex = -1;
            dayObject.ariaLabel = ariaLabel;
            dayObject.hidden = false;
            date = nextDate;
        }
        weekObject.number = calendar.getWeekNumber(days.map(day => day.date), firstDayOfWeek);
        // marking week as collapsed
        weekObject.collapsed = outsideDays === 'collapsed' && days[0].date.month !== month.number &&
            days[days.length - 1].date.month !== month.number;
    }
    return month;
}
/**
 * @param {?} calendar
 * @param {?} date
 * @param {?} firstDayOfWeek
 * @return {?}
 */
function getFirstViewDate(calendar, date, firstDayOfWeek) {
    /** @type {?} */
    const daysPerWeek = calendar.getDaysPerWeek();
    /** @type {?} */
    const firstMonthDate = new NgbDate(date.year, date.month, 1);
    /** @type {?} */
    const dayOfWeek = calendar.getWeekday(firstMonthDate) % daysPerWeek;
    return calendar.getPrev(firstMonthDate, 'd', (daysPerWeek + dayOfWeek - firstDayOfWeek) % daysPerWeek);
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
/**
 * @param {?} locale
 * @return {?}
 */
function NGB_DATEPICKER_18N_FACTORY(locale) {
    return new NgbDatepickerI18nDefault(locale);
}
/**
 * Type of the service supplying month and weekday names to to NgbDatepicker component.
 * The default implementation of this service honors the Angular locale, and uses the registered locale data,
 * as explained in the Angular i18n guide.
 * See the i18n demo for how to extend this class and define a custom provider for i18n.
 * @abstract
 */
class NgbDatepickerI18n {
    /**
     * Returns the textual representation of a day that is rendered in a day cell
     *
     * \@since 3.0.0
     * @param {?} date
     * @return {?}
     */
    getDayNumerals(date) { return `${date.day}`; }
    /**
     * Returns the textual representation of a week number rendered by date picker
     *
     * \@since 3.0.0
     * @param {?} weekNumber
     * @return {?}
     */
    getWeekNumerals(weekNumber) { return `${weekNumber}`; }
    /**
     * Returns the textual representation of a year that is rendered
     * in date picker year select box
     *
     * \@since 3.0.0
     * @param {?} year
     * @return {?}
     */
    getYearNumerals(year) { return `${year}`; }
}
NgbDatepickerI18n.decorators = [
    { type: Injectable, args: [{ providedIn: 'root', useFactory: NGB_DATEPICKER_18N_FACTORY, deps: [LOCALE_ID] },] },
];
/** @nocollapse */ NgbDatepickerI18n.ngInjectableDef = defineInjectable({ factory: function NgbDatepickerI18n_Factory() { return NGB_DATEPICKER_18N_FACTORY(inject(LOCALE_ID)); }, token: NgbDatepickerI18n, providedIn: "root" });
class NgbDatepickerI18nDefault extends NgbDatepickerI18n {
    /**
     * @param {?} _locale
     */
    constructor(_locale) {
        super();
        this._locale = _locale;
        /** @type {?} */
        const weekdaysStartingOnSunday = getLocaleDayNames(_locale, FormStyle.Standalone, TranslationWidth.Short);
        this._weekdaysShort = weekdaysStartingOnSunday.map((day, index) => weekdaysStartingOnSunday[(index + 1) % 7]);
        this._monthsShort = getLocaleMonthNames(_locale, FormStyle.Standalone, TranslationWidth.Abbreviated);
        this._monthsFull = getLocaleMonthNames(_locale, FormStyle.Standalone, TranslationWidth.Wide);
    }
    /**
     * @param {?} weekday
     * @return {?}
     */
    getWeekdayShortName(weekday) { return this._weekdaysShort[weekday - 1]; }
    /**
     * @param {?} month
     * @return {?}
     */
    getMonthShortName(month) { return this._monthsShort[month - 1]; }
    /**
     * @param {?} month
     * @return {?}
     */
    getMonthFullName(month) { return this._monthsFull[month - 1]; }
    /**
     * @param {?} date
     * @return {?}
     */
    getDayAriaLabel(date) {
        /** @type {?} */
        const jsDate = new Date(date.year, date.month - 1, date.day);
        return formatDate(jsDate, 'fullDate', this._locale);
    }
}
NgbDatepickerI18nDefault.decorators = [
    { type: Injectable },
];
/** @nocollapse */
NgbDatepickerI18nDefault.ctorParameters = () => [
    { type: String, decorators: [{ type: Inject, args: [LOCALE_ID,] }] }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
class NgbDatepickerService {
    /**
     * @param {?} _calendar
     * @param {?} _i18n
     */
    constructor(_calendar, _i18n) {
        this._calendar = _calendar;
        this._i18n = _i18n;
        this._model$ = new Subject();
        this._select$ = new Subject();
        this._state = {
            disabled: false,
            displayMonths: 1,
            firstDayOfWeek: 1,
            focusVisible: false,
            months: [],
            navigation: 'select',
            outsideDays: 'visible',
            prevDisabled: false,
            nextDisabled: false,
            selectBoxes: { years: [], months: [] },
            selectedDate: null
        };
    }
    /**
     * @return {?}
     */
    get model$() { return this._model$.pipe(filter(model => model.months.length > 0)); }
    /**
     * @return {?}
     */
    get select$() { return this._select$.pipe(filter(date => date !== null)); }
    /**
     * @param {?} disabled
     * @return {?}
     */
    set disabled(disabled) {
        if (this._state.disabled !== disabled) {
            this._nextState({ disabled });
        }
    }
    /**
     * @param {?} displayMonths
     * @return {?}
     */
    set displayMonths(displayMonths) {
        displayMonths = toInteger(displayMonths);
        if (isInteger(displayMonths) && displayMonths > 0 && this._state.displayMonths !== displayMonths) {
            this._nextState({ displayMonths });
        }
    }
    /**
     * @param {?} firstDayOfWeek
     * @return {?}
     */
    set firstDayOfWeek(firstDayOfWeek) {
        firstDayOfWeek = toInteger(firstDayOfWeek);
        if (isInteger(firstDayOfWeek) && firstDayOfWeek >= 0 && this._state.firstDayOfWeek !== firstDayOfWeek) {
            this._nextState({ firstDayOfWeek });
        }
    }
    /**
     * @param {?} focusVisible
     * @return {?}
     */
    set focusVisible(focusVisible) {
        if (this._state.focusVisible !== focusVisible && !this._state.disabled) {
            this._nextState({ focusVisible });
        }
    }
    /**
     * @param {?} date
     * @return {?}
     */
    set maxDate(date) {
        /** @type {?} */
        const maxDate = this.toValidDate(date, null);
        if (isChangedDate(this._state.maxDate, maxDate)) {
            this._nextState({ maxDate });
        }
    }
    /**
     * @param {?} markDisabled
     * @return {?}
     */
    set markDisabled(markDisabled) {
        if (this._state.markDisabled !== markDisabled) {
            this._nextState({ markDisabled });
        }
    }
    /**
     * @param {?} date
     * @return {?}
     */
    set minDate(date) {
        /** @type {?} */
        const minDate = this.toValidDate(date, null);
        if (isChangedDate(this._state.minDate, minDate)) {
            this._nextState({ minDate });
        }
    }
    /**
     * @param {?} navigation
     * @return {?}
     */
    set navigation(navigation) {
        if (this._state.navigation !== navigation) {
            this._nextState({ navigation });
        }
    }
    /**
     * @param {?} outsideDays
     * @return {?}
     */
    set outsideDays(outsideDays) {
        if (this._state.outsideDays !== outsideDays) {
            this._nextState({ outsideDays });
        }
    }
    /**
     * @param {?} date
     * @return {?}
     */
    focus(date) {
        if (!this._state.disabled && this._calendar.isValid(date) && isChangedDate(this._state.focusDate, date)) {
            this._nextState({ focusDate: date });
        }
    }
    /**
     * @param {?=} period
     * @param {?=} number
     * @return {?}
     */
    focusMove(period, number) {
        this.focus(this._calendar.getNext(this._state.focusDate, period, number));
    }
    /**
     * @return {?}
     */
    focusSelect() {
        if (isDateSelectable(this._state.focusDate, this._state)) {
            this.select(this._state.focusDate, { emitEvent: true });
        }
    }
    /**
     * @param {?} date
     * @return {?}
     */
    open(date) {
        /** @type {?} */
        const firstDate = this.toValidDate(date, this._calendar.getToday());
        if (!this._state.disabled) {
            this._nextState({ firstDate });
        }
    }
    /**
     * @param {?} date
     * @param {?=} options
     * @return {?}
     */
    select(date, options = {}) {
        /** @type {?} */
        const selectedDate = this.toValidDate(date, null);
        if (!this._state.disabled) {
            if (isChangedDate(this._state.selectedDate, selectedDate)) {
                this._nextState({ selectedDate });
            }
            if (options.emitEvent && isDateSelectable(selectedDate, this._state)) {
                this._select$.next(selectedDate);
            }
        }
    }
    /**
     * @param {?} date
     * @param {?=} defaultValue
     * @return {?}
     */
    toValidDate(date, defaultValue) {
        /** @type {?} */
        const ngbDate = NgbDate.from(date);
        if (defaultValue === undefined) {
            defaultValue = this._calendar.getToday();
        }
        return this._calendar.isValid(ngbDate) ? ngbDate : defaultValue;
    }
    /**
     * @param {?} patch
     * @return {?}
     */
    _nextState(patch) {
        /** @type {?} */
        const newState = this._updateState(patch);
        this._patchContexts(newState);
        this._state = newState;
        this._model$.next(this._state);
    }
    /**
     * @param {?} state
     * @return {?}
     */
    _patchContexts(state) {
        const { months, displayMonths, selectedDate, focusDate, focusVisible, disabled, outsideDays } = state;
        state.months.forEach(month => {
            month.weeks.forEach(week => {
                week.days.forEach(day => {
                    // patch focus flag
                    if (focusDate) {
                        day.context.focused = focusDate.equals(day.date) && focusVisible;
                    }
                    // calculating tabindex
                    day.tabindex = !disabled && day.date.equals(focusDate) && focusDate.month === month.number ? 0 : -1;
                    // override context disabled
                    if (disabled === true) {
                        day.context.disabled = true;
                    }
                    // patch selection flag
                    if (selectedDate !== undefined) {
                        day.context.selected = selectedDate !== null && selectedDate.equals(day.date);
                    }
                    // visibility
                    if (month.number !== day.date.month) {
                        day.hidden = outsideDays === 'hidden' || outsideDays === 'collapsed' ||
                            (displayMonths > 1 && day.date.after(months[0].firstDate) &&
                                day.date.before(months[displayMonths - 1].lastDate));
                    }
                });
            });
        });
    }
    /**
     * @param {?} patch
     * @return {?}
     */
    _updateState(patch) {
        /** @type {?} */
        const state = Object.assign({}, this._state, patch);
        /** @type {?} */
        let startDate = state.firstDate;
        // min/max dates changed
        if ('minDate' in patch || 'maxDate' in patch) {
            checkMinBeforeMax(state.minDate, state.maxDate);
            state.focusDate = checkDateInRange(state.focusDate, state.minDate, state.maxDate);
            state.firstDate = checkDateInRange(state.firstDate, state.minDate, state.maxDate);
            startDate = state.focusDate;
        }
        // disabled
        if ('disabled' in patch) {
            state.focusVisible = false;
        }
        // initial rebuild via 'select()'
        if ('selectedDate' in patch && this._state.months.length === 0) {
            startDate = state.selectedDate;
        }
        // focus date changed
        if ('focusDate' in patch) {
            state.focusDate = checkDateInRange(state.focusDate, state.minDate, state.maxDate);
            startDate = state.focusDate;
            // nothing to rebuild if only focus changed and it is still visible
            if (state.months.length !== 0 && !state.focusDate.before(state.firstDate) &&
                !state.focusDate.after(state.lastDate)) {
                return state;
            }
        }
        // first date changed
        if ('firstDate' in patch) {
            state.firstDate = checkDateInRange(state.firstDate, state.minDate, state.maxDate);
            startDate = state.firstDate;
        }
        // rebuilding months
        if (startDate) {
            /** @type {?} */
            const forceRebuild = 'firstDayOfWeek' in patch || 'markDisabled' in patch || 'minDate' in patch ||
                'maxDate' in patch || 'disabled' in patch || 'outsideDays' in patch;
            /** @type {?} */
            const months = buildMonths(this._calendar, startDate, state, this._i18n, forceRebuild);
            // updating months and boundary dates
            state.months = months;
            state.firstDate = months.length > 0 ? months[0].firstDate : undefined;
            state.lastDate = months.length > 0 ? months[months.length - 1].lastDate : undefined;
            // reset selected date if 'markDisabled' returns true
            if ('selectedDate' in patch && !isDateSelectable(state.selectedDate, state)) {
                state.selectedDate = null;
            }
            // adjusting focus after months were built
            if ('firstDate' in patch) {
                if (state.focusDate === undefined || state.focusDate.before(state.firstDate) ||
                    state.focusDate.after(state.lastDate)) {
                    state.focusDate = startDate;
                }
            }
            /** @type {?} */
            const yearChanged = !this._state.firstDate || this._state.firstDate.year !== state.firstDate.year;
            /** @type {?} */
            const monthChanged = !this._state.firstDate || this._state.firstDate.month !== state.firstDate.month;
            if (state.navigation === 'select') {
                // years ->  boundaries (min/max were changed)
                if ('minDate' in patch || 'maxDate' in patch || state.selectBoxes.years.length === 0 || yearChanged) {
                    state.selectBoxes.years = generateSelectBoxYears(state.firstDate, state.minDate, state.maxDate);
                }
                // months -> when current year or boundaries change
                if ('minDate' in patch || 'maxDate' in patch || state.selectBoxes.months.length === 0 || yearChanged) {
                    state.selectBoxes.months =
                        generateSelectBoxMonths(this._calendar, state.firstDate, state.minDate, state.maxDate);
                }
            }
            else {
                state.selectBoxes = { years: [], months: [] };
            }
            // updating navigation arrows -> boundaries change (min/max) or month/year changes
            if ((state.navigation === 'arrows' || state.navigation === 'select') &&
                (monthChanged || yearChanged || 'minDate' in patch || 'maxDate' in patch || 'disabled' in patch)) {
                state.prevDisabled = state.disabled || prevMonthDisabled(this._calendar, state.firstDate, state.minDate);
                state.nextDisabled = state.disabled || nextMonthDisabled(this._calendar, state.lastDate, state.maxDate);
            }
        }
        return state;
    }
}
NgbDatepickerService.decorators = [
    { type: Injectable },
];
/** @nocollapse */
NgbDatepickerService.ctorParameters = () => [
    { type: NgbCalendar },
    { type: NgbDatepickerI18n }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
/** @enum {number} */
const Key = {
    Tab: 9,
    Enter: 13,
    Escape: 27,
    Space: 32,
    PageUp: 33,
    PageDown: 34,
    End: 35,
    Home: 36,
    ArrowLeft: 37,
    ArrowUp: 38,
    ArrowRight: 39,
    ArrowDown: 40,
};
Key[Key.Tab] = 'Tab';
Key[Key.Enter] = 'Enter';
Key[Key.Escape] = 'Escape';
Key[Key.Space] = 'Space';
Key[Key.PageUp] = 'PageUp';
Key[Key.PageDown] = 'PageDown';
Key[Key.End] = 'End';
Key[Key.Home] = 'Home';
Key[Key.ArrowLeft] = 'ArrowLeft';
Key[Key.ArrowUp] = 'ArrowUp';
Key[Key.ArrowRight] = 'ArrowRight';
Key[Key.ArrowDown] = 'ArrowDown';

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
class NgbDatepickerKeyMapService {
    /**
     * @param {?} _service
     * @param {?} _calendar
     */
    constructor(_service, _calendar) {
        this._service = _service;
        this._calendar = _calendar;
        _service.model$.subscribe(model => {
            this._minDate = model.minDate;
            this._maxDate = model.maxDate;
            this._firstViewDate = model.firstDate;
            this._lastViewDate = model.lastDate;
        });
    }
    /**
     * @param {?} event
     * @return {?}
     */
    processKey(event) {
        if (Key[toString(event.which)]) {
            switch (event.which) {
                case Key.PageUp:
                    this._service.focusMove(event.shiftKey ? 'y' : 'm', -1);
                    break;
                case Key.PageDown:
                    this._service.focusMove(event.shiftKey ? 'y' : 'm', 1);
                    break;
                case Key.End:
                    this._service.focus(event.shiftKey ? this._maxDate : this._lastViewDate);
                    break;
                case Key.Home:
                    this._service.focus(event.shiftKey ? this._minDate : this._firstViewDate);
                    break;
                case Key.ArrowLeft:
                    this._service.focusMove('d', -1);
                    break;
                case Key.ArrowUp:
                    this._service.focusMove('d', -this._calendar.getDaysPerWeek());
                    break;
                case Key.ArrowRight:
                    this._service.focusMove('d', 1);
                    break;
                case Key.ArrowDown:
                    this._service.focusMove('d', this._calendar.getDaysPerWeek());
                    break;
                case Key.Enter:
                case Key.Space:
                    this._service.focusSelect();
                    break;
                default:
                    return;
            }
            event.preventDefault();
            event.stopPropagation();
        }
    }
}
NgbDatepickerKeyMapService.decorators = [
    { type: Injectable },
];
/** @nocollapse */
NgbDatepickerKeyMapService.ctorParameters = () => [
    { type: NgbDatepickerService },
    { type: NgbCalendar }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
/** @enum {number} */
const NavigationEvent = {
    PREV: 0,
    NEXT: 1,
};
NavigationEvent[NavigationEvent.PREV] = 'PREV';
NavigationEvent[NavigationEvent.NEXT] = 'NEXT';

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
/**
 * Configuration service for the NgbDatepicker component.
 * You can inject this service, typically in your root component, and customize the values of its properties in
 * order to provide default values for all the datepickers used in the application.
 */
class NgbDatepickerConfig {
    constructor() {
        this.displayMonths = 1;
        this.firstDayOfWeek = 1;
        this.navigation = 'select';
        this.outsideDays = 'visible';
        this.showWeekdays = true;
        this.showWeekNumbers = false;
    }
}
NgbDatepickerConfig.decorators = [
    { type: Injectable, args: [{ providedIn: 'root' },] },
];
/** @nocollapse */ NgbDatepickerConfig.ngInjectableDef = defineInjectable({ factory: function NgbDatepickerConfig_Factory() { return new NgbDatepickerConfig(); }, token: NgbDatepickerConfig, providedIn: "root" });

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
/**
 * @return {?}
 */
function NGB_DATEPICKER_DATE_ADAPTER_FACTORY() {
    return new NgbDateStructAdapter();
}
/**
 * Abstract type serving as a DI token for the service converting from your application Date model to internal
 * NgbDateStruct model.
 * A default implementation converting from and to NgbDateStruct is provided for retro-compatibility,
 * but you can provide another implementation to use an alternative format, ie for using with native Date Object.
 * @abstract
 * @template D
 */
class NgbDateAdapter {
}
NgbDateAdapter.decorators = [
    { type: Injectable, args: [{ providedIn: 'root', useFactory: NGB_DATEPICKER_DATE_ADAPTER_FACTORY },] },
];
/** @nocollapse */ NgbDateAdapter.ngInjectableDef = defineInjectable({ factory: NGB_DATEPICKER_DATE_ADAPTER_FACTORY, token: NgbDateAdapter, providedIn: "root" });
class NgbDateStructAdapter extends NgbDateAdapter {
    /**
     * Converts a NgbDateStruct value into NgbDateStruct value
     * @param {?} date
     * @return {?}
     */
    fromModel(date) {
        return (date && date.year && date.month && date.day) ? { year: date.year, month: date.month, day: date.day } : null;
    }
    /**
     * Converts a NgbDateStruct value into NgbDateStruct value
     * @param {?} date
     * @return {?}
     */
    toModel(date) {
        return (date && date.year && date.month && date.day) ? { year: date.year, month: date.month, day: date.day } : null;
    }
}
NgbDateStructAdapter.decorators = [
    { type: Injectable },
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
/** @type {?} */
const NGB_DATEPICKER_VALUE_ACCESSOR = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => NgbDatepicker),
    multi: true
};
/**
 * A lightweight and highly configurable datepicker directive
 */
class NgbDatepicker {
    /**
     * @param {?} _keyMapService
     * @param {?} _service
     * @param {?} _calendar
     * @param {?} i18n
     * @param {?} config
     * @param {?} _cd
     * @param {?} _elementRef
     * @param {?} _ngbDateAdapter
     * @param {?} _ngZone
     */
    constructor(_keyMapService, _service, _calendar, i18n, config, _cd, _elementRef, _ngbDateAdapter, _ngZone) {
        this._keyMapService = _keyMapService;
        this._service = _service;
        this._calendar = _calendar;
        this.i18n = i18n;
        this._cd = _cd;
        this._elementRef = _elementRef;
        this._ngbDateAdapter = _ngbDateAdapter;
        this._ngZone = _ngZone;
        /**
         * An event fired when navigation happens and currently displayed month changes.
         * See NgbDatepickerNavigateEvent for the payload info.
         */
        this.navigate = new EventEmitter();
        /**
         * An event fired when user selects a date using keyboard or mouse.
         * The payload of the event is currently selected NgbDate.
         */
        this.select = new EventEmitter();
        this.onChange = (_) => { };
        this.onTouched = () => { };
        ['dayTemplate', 'displayMonths', 'firstDayOfWeek', 'markDisabled', 'minDate', 'maxDate', 'navigation',
            'outsideDays', 'showWeekdays', 'showWeekNumbers', 'startDate']
            .forEach(input => this[input] = config[input]);
        this._selectSubscription = _service.select$.subscribe(date => { this.select.emit(date); });
        this._subscription = _service.model$.subscribe(model => {
            /** @type {?} */
            const newDate = model.firstDate;
            /** @type {?} */
            const oldDate = this.model ? this.model.firstDate : null;
            /** @type {?} */
            const newSelectedDate = model.selectedDate;
            /** @type {?} */
            const oldSelectedDate = this.model ? this.model.selectedDate : null;
            /** @type {?} */
            const newFocusedDate = model.focusDate;
            /** @type {?} */
            const oldFocusedDate = this.model ? this.model.focusDate : null;
            this.model = model;
            // handling selection change
            if (isChangedDate(newSelectedDate, oldSelectedDate)) {
                this.onTouched();
                this.onChange(this._ngbDateAdapter.toModel(newSelectedDate));
            }
            // handling focus change
            if (isChangedDate(newFocusedDate, oldFocusedDate) && oldFocusedDate && model.focusVisible) {
                this.focus();
            }
            // emitting navigation event if the first month changes
            if (!newDate.equals(oldDate)) {
                this.navigate.emit({
                    current: oldDate ? { year: oldDate.year, month: oldDate.month } : null,
                    next: { year: newDate.year, month: newDate.month }
                });
            }
            _cd.markForCheck();
        });
    }
    /**
     * Manually focus the focusable day in the datepicker
     * @return {?}
     */
    focus() {
        this._ngZone.onStable.asObservable().pipe(take(1)).subscribe(() => {
            /** @type {?} */
            const elementToFocus = this._elementRef.nativeElement.querySelector('div.ngb-dp-day[tabindex="0"]');
            if (elementToFocus) {
                elementToFocus.focus();
            }
        });
    }
    /**
     * Navigates current view to provided date.
     * With default calendar we use ISO 8601: 'month' is 1=Jan ... 12=Dec.
     * If nothing or invalid date provided calendar will open current month.
     * Use 'startDate' input as an alternative
     * @param {?=} date
     * @return {?}
     */
    navigateTo(date) {
        this._service.open(NgbDate.from(date ? Object.assign({}, date, { day: 1 }) : null));
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        this._subscription.unsubscribe();
        this._selectSubscription.unsubscribe();
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        if (this.model === undefined) {
            ['displayMonths', 'markDisabled', 'firstDayOfWeek', 'navigation', 'minDate', 'maxDate', 'outsideDays'].forEach(input => this._service[input] = this[input]);
            this.navigateTo(this.startDate);
        }
    }
    /**
     * @param {?} changes
     * @return {?}
     */
    ngOnChanges(changes) {
        ['displayMonths', 'markDisabled', 'firstDayOfWeek', 'navigation', 'minDate', 'maxDate', 'outsideDays']
            .filter(input => input in changes)
            .forEach(input => this._service[input] = this[input]);
        if ('startDate' in changes) {
            this.navigateTo(this.startDate);
        }
    }
    /**
     * @param {?} date
     * @return {?}
     */
    onDateSelect(date) {
        this._service.focus(date);
        this._service.select(date, { emitEvent: true });
    }
    /**
     * @param {?} event
     * @return {?}
     */
    onKeyDown(event) { this._keyMapService.processKey(event); }
    /**
     * @param {?} date
     * @return {?}
     */
    onNavigateDateSelect(date) { this._service.open(date); }
    /**
     * @param {?} event
     * @return {?}
     */
    onNavigateEvent(event) {
        switch (event) {
            case NavigationEvent.PREV:
                this._service.open(this._calendar.getPrev(this.model.firstDate, 'm', 1));
                break;
            case NavigationEvent.NEXT:
                this._service.open(this._calendar.getNext(this.model.firstDate, 'm', 1));
                break;
        }
    }
    /**
     * @param {?} fn
     * @return {?}
     */
    registerOnChange(fn) { this.onChange = fn; }
    /**
     * @param {?} fn
     * @return {?}
     */
    registerOnTouched(fn) { this.onTouched = fn; }
    /**
     * @param {?} isDisabled
     * @return {?}
     */
    setDisabledState(isDisabled) { this._service.disabled = isDisabled; }
    /**
     * @param {?} focusVisible
     * @return {?}
     */
    showFocus(focusVisible) { this._service.focusVisible = focusVisible; }
    /**
     * @param {?} value
     * @return {?}
     */
    writeValue(value) { this._service.select(NgbDate.from(this._ngbDateAdapter.fromModel(value))); }
}
NgbDatepicker.decorators = [
    { type: Component, args: [{
                exportAs: 'ngbDatepicker',
                selector: 'ngb-datepicker',
                changeDetection: ChangeDetectionStrategy.OnPush,
                styles: [`
    :host {
      border: 1px solid #dfdfdf;
      border-radius: 0.25rem;
      display: inline-block;
    }
    .ngb-dp-month {
      pointer-events: none;
    }
    .ngb-dp-header {
      border-bottom: 0;
      border-radius: 0.25rem 0.25rem 0 0;
      padding-top: 0.25rem;
    }
    ngb-datepicker-month-view {
      pointer-events: auto;
    }
    .ngb-dp-month-name {
      font-size: larger;
      height: 2rem;
      line-height: 2rem;
      text-align: center;
    }
    /deep/ .ngb-dp-month + .ngb-dp-month > ngb-datepicker-month-view > .ngb-dp-week {
      padding-left: 1rem;
    }
    /deep/ .ngb-dp-month + .ngb-dp-month > .ngb-dp-month-name {
      padding-left: 1rem;
    }
    /deep/ .ngb-dp-month:last-child .ngb-dp-week {
      padding-right: .25rem;
    }
    /deep/ .ngb-dp-month:first-child .ngb-dp-week {
      padding-left: .25rem;
    }
    /deep/ .ngb-dp-month > ngb-datepicker-month-view > .ngb-dp-week:last-child {
      padding-bottom: .25rem;
    }
    .ngb-dp-months {
      display: -ms-flexbox;
      display: flex;
    }
  `],
                template: `
    <ng-template #dt let-date="date" let-currentMonth="currentMonth" let-selected="selected" let-disabled="disabled" let-focused="focused">
      <div ngbDatepickerDayView
        [date]="date"
        [currentMonth]="currentMonth"
        [selected]="selected"
        [disabled]="disabled"
        [focused]="focused">
      </div>
    </ng-template>

    <div class="ngb-dp-header bg-light">
      <ngb-datepicker-navigation *ngIf="navigation !== 'none'"
        [date]="model.firstDate"
        [months]="model.months"
        [disabled]="model.disabled"
        [showSelect]="model.navigation === 'select'"
        [prevDisabled]="model.prevDisabled"
        [nextDisabled]="model.nextDisabled"
        [selectBoxes]="model.selectBoxes"
        (navigate)="onNavigateEvent($event)"
        (select)="onNavigateDateSelect($event)">
      </ngb-datepicker-navigation>
    </div>

    <div class="ngb-dp-months" (keydown)="onKeyDown($event)" (focusin)="showFocus(true)" (focusout)="showFocus(false)">
      <ng-template ngFor let-month [ngForOf]="model.months" let-i="index">
        <div class="ngb-dp-month">
          <div *ngIf="navigation === 'none' || (displayMonths > 1 && navigation === 'select')"
                class="ngb-dp-month-name bg-light">
            {{ i18n.getMonthFullName(month.number, month.year) }} {{ i18n.getYearNumerals(month.year) }}
          </div>
          <ngb-datepicker-month-view
            [month]="month"
            [dayTemplate]="dayTemplate || dt"
            [showWeekdays]="showWeekdays"
            [showWeekNumbers]="showWeekNumbers"
            (select)="onDateSelect($event)">
          </ngb-datepicker-month-view>
        </div>
      </ng-template>
    </div>
  `,
                providers: [NGB_DATEPICKER_VALUE_ACCESSOR, NgbDatepickerService, NgbDatepickerKeyMapService]
            },] },
];
/** @nocollapse */
NgbDatepicker.ctorParameters = () => [
    { type: NgbDatepickerKeyMapService },
    { type: NgbDatepickerService },
    { type: NgbCalendar },
    { type: NgbDatepickerI18n },
    { type: NgbDatepickerConfig },
    { type: ChangeDetectorRef },
    { type: ElementRef },
    { type: NgbDateAdapter },
    { type: NgZone }
];
NgbDatepicker.propDecorators = {
    dayTemplate: [{ type: Input }],
    displayMonths: [{ type: Input }],
    firstDayOfWeek: [{ type: Input }],
    markDisabled: [{ type: Input }],
    maxDate: [{ type: Input }],
    minDate: [{ type: Input }],
    navigation: [{ type: Input }],
    outsideDays: [{ type: Input }],
    showWeekdays: [{ type: Input }],
    showWeekNumbers: [{ type: Input }],
    startDate: [{ type: Input }],
    navigate: [{ type: Output }],
    select: [{ type: Output }]
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
class NgbDatepickerMonthView {
    /**
     * @param {?} i18n
     */
    constructor(i18n) {
        this.i18n = i18n;
        this.select = new EventEmitter();
    }
    /**
     * @param {?} day
     * @return {?}
     */
    doSelect(day) {
        if (!day.context.disabled && !day.hidden) {
            this.select.emit(day.date);
        }
    }
}
NgbDatepickerMonthView.decorators = [
    { type: Component, args: [{
                selector: 'ngb-datepicker-month-view',
                host: { 'role': 'grid' },
                styles: [`
    :host {
      display: block;
    }
    .ngb-dp-weekday, .ngb-dp-week-number {
      line-height: 2rem;
      text-align: center;
      font-style: italic;
    }
    .ngb-dp-weekday {
      color: #5bc0de;
      color: var(--info);
    }
    .ngb-dp-week {
      border-radius: 0.25rem;
      display: -ms-flexbox;
      display: flex;
    }
    .ngb-dp-weekdays {
      border-bottom: 1px solid rgba(0, 0, 0, 0.125);
      border-radius: 0;
    }
    .ngb-dp-day, .ngb-dp-weekday, .ngb-dp-week-number {
      width: 2rem;
      height: 2rem;
    }
    .ngb-dp-day {
      cursor: pointer;
    }
    .ngb-dp-day.disabled, .ngb-dp-day.hidden {
      cursor: default;
    }
  `],
                template: `
    <div *ngIf="showWeekdays" class="ngb-dp-week ngb-dp-weekdays bg-light">
      <div *ngIf="showWeekNumbers" class="ngb-dp-weekday ngb-dp-showweek"></div>
      <div *ngFor="let w of month.weekdays" class="ngb-dp-weekday small">
        {{ i18n.getWeekdayShortName(w) }}
      </div>
    </div>
    <ng-template ngFor let-week [ngForOf]="month.weeks">
      <div *ngIf="!week.collapsed" class="ngb-dp-week" role="row">
        <div *ngIf="showWeekNumbers" class="ngb-dp-week-number small text-muted">{{ i18n.getWeekNumerals(week.number) }}</div>
        <div *ngFor="let day of week.days" (click)="doSelect(day)" class="ngb-dp-day" role="gridcell"
          [class.disabled]="day.context.disabled"
          [tabindex]="day.tabindex"
          [class.hidden]="day.hidden"
          [attr.aria-label]="day.ariaLabel">
          <ng-template [ngIf]="!day.hidden">
            <ng-template [ngTemplateOutlet]="dayTemplate" [ngTemplateOutletContext]="day.context"></ng-template>
          </ng-template>
        </div>
      </div>
    </ng-template>
  `
            },] },
];
/** @nocollapse */
NgbDatepickerMonthView.ctorParameters = () => [
    { type: NgbDatepickerI18n }
];
NgbDatepickerMonthView.propDecorators = {
    dayTemplate: [{ type: Input }],
    month: [{ type: Input }],
    showWeekdays: [{ type: Input }],
    showWeekNumbers: [{ type: Input }],
    select: [{ type: Output }]
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
class NgbDatepickerNavigation {
    /**
     * @param {?} i18n
     */
    constructor(i18n) {
        this.i18n = i18n;
        this.navigation = NavigationEvent;
        this.months = [];
        this.navigate = new EventEmitter();
        this.select = new EventEmitter();
    }
}
NgbDatepickerNavigation.decorators = [
    { type: Component, args: [{
                selector: 'ngb-datepicker-navigation',
                changeDetection: ChangeDetectionStrategy.OnPush,
                styles: [`
    :host {
      display: -ms-flexbox;
      display: flex;
      align-items: center;
    }
    .ngb-dp-navigation-chevron {
      border-style: solid;
      border-width: 0.2em 0.2em 0 0;
      display: inline-block;
      width: 0.75em;
      height: 0.75em;
      margin-left: 0.25em;
      margin-right: 0.15em;
      transform: rotate(-135deg);
      -ms-transform: rotate(-135deg);
    }
    .right .ngb-dp-navigation-chevron {
      -ms-transform: rotate(45deg);
      transform: rotate(45deg);
      margin-left: 0.15em;
      margin-right: 0.25em;
    }
    .ngb-dp-arrow {
      display: -ms-flexbox;
      display: flex;
      -ms-flex: 1 1 auto;
      flex-grow: 1;
      padding-right: 0;
      padding-left: 0;
      margin: 0;
      width: 2rem;
      height: 2rem;
    }
    .ngb-dp-arrow.right {
      -ms-flex-pack: end;
      justify-content: flex-end;
    }
    .ngb-dp-arrow-btn {
      padding: 0 0.25rem;
      margin: 0 0.5rem;
      border: none;
      background-color: transparent;
      z-index: 1;
    }
    .ngb-dp-arrow-btn:focus {
      outline: auto 1px;
    }
    .ngb-dp-month-name {
      font-size: larger;
      height: 2rem;
      line-height: 2rem;
      text-align: center;
    }
    .ngb-dp-navigation-select {
      display: -ms-flexbox;
      display: flex;
      -ms-flex: 1 1 9rem;
      flex-grow: 1;
      flex-basis: 9rem;
    }
  `],
                template: `
    <div class="ngb-dp-arrow">
      <button type="button" class="btn btn-link ngb-dp-arrow-btn" (click)="!!navigate.emit(navigation.PREV)" [disabled]="prevDisabled"
              i18n-aria-label="@@ngb.datepicker.previous-month" aria-label="Previous month"
              i18n-title="@@ngb.datepicker.previous-month" title="Previous month">
        <span class="ngb-dp-navigation-chevron"></span>
      </button>
    </div>
    <ngb-datepicker-navigation-select *ngIf="showSelect" class="ngb-dp-navigation-select"
      [date]="date"
      [disabled] = "disabled"
      [months]="selectBoxes.months"
      [years]="selectBoxes.years"
      (select)="select.emit($event)">
    </ngb-datepicker-navigation-select>

    <ng-template *ngIf="!showSelect" ngFor let-month [ngForOf]="months" let-i="index">
      <div class="ngb-dp-arrow" *ngIf="i > 0"></div>
      <div class="ngb-dp-month-name">
        {{ i18n.getMonthFullName(month.number, month.year) }} {{ i18n.getYearNumerals(month.year) }}
      </div>
      <div class="ngb-dp-arrow" *ngIf="i !== months.length - 1"></div>
    </ng-template>
    <div class="ngb-dp-arrow right">
      <button type="button" class="btn btn-link ngb-dp-arrow-btn" (click)="!!navigate.emit(navigation.NEXT)" [disabled]="nextDisabled"
              i18n-aria-label="@@ngb.datepicker.next-month" aria-label="Next month"
              i18n-title="@@ngb.datepicker.next-month" title="Next month">
        <span class="ngb-dp-navigation-chevron"></span>
      </button>
    </div>
    `
            },] },
];
/** @nocollapse */
NgbDatepickerNavigation.ctorParameters = () => [
    { type: NgbDatepickerI18n }
];
NgbDatepickerNavigation.propDecorators = {
    date: [{ type: Input }],
    disabled: [{ type: Input }],
    months: [{ type: Input }],
    showSelect: [{ type: Input }],
    prevDisabled: [{ type: Input }],
    nextDisabled: [{ type: Input }],
    selectBoxes: [{ type: Input }],
    navigate: [{ type: Output }],
    select: [{ type: Output }]
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
/**
 * @return {?}
 */
function NGB_DATEPICKER_PARSER_FORMATTER_FACTORY() {
    return new NgbDateISOParserFormatter();
}
/**
 * Abstract type serving as a DI token for the service parsing and formatting dates for the NgbInputDatepicker
 * directive. A default implementation using the ISO 8601 format is provided, but you can provide another implementation
 * to use an alternative format.
 * @abstract
 */
class NgbDateParserFormatter {
}
NgbDateParserFormatter.decorators = [
    { type: Injectable, args: [{ providedIn: 'root', useFactory: NGB_DATEPICKER_PARSER_FORMATTER_FACTORY },] },
];
/** @nocollapse */ NgbDateParserFormatter.ngInjectableDef = defineInjectable({ factory: NGB_DATEPICKER_PARSER_FORMATTER_FACTORY, token: NgbDateParserFormatter, providedIn: "root" });
class NgbDateISOParserFormatter extends NgbDateParserFormatter {
    /**
     * @param {?} value
     * @return {?}
     */
    parse(value) {
        if (value) {
            /** @type {?} */
            const dateParts = value.trim().split('-');
            if (dateParts.length === 1 && isNumber(dateParts[0])) {
                return { year: toInteger(dateParts[0]), month: null, day: null };
            }
            else if (dateParts.length === 2 && isNumber(dateParts[0]) && isNumber(dateParts[1])) {
                return { year: toInteger(dateParts[0]), month: toInteger(dateParts[1]), day: null };
            }
            else if (dateParts.length === 3 && isNumber(dateParts[0]) && isNumber(dateParts[1]) && isNumber(dateParts[2])) {
                return { year: toInteger(dateParts[0]), month: toInteger(dateParts[1]), day: toInteger(dateParts[2]) };
            }
        }
        return null;
    }
    /**
     * @param {?} date
     * @return {?}
     */
    format(date) {
        return date ?
            `${date.year}-${isNumber(date.month) ? padNumber(date.month) : ''}-${isNumber(date.day) ? padNumber(date.day) : ''}` :
            '';
    }
}
NgbDateISOParserFormatter.decorators = [
    { type: Injectable },
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
class Positioning {
    /**
     * @param {?} element
     * @return {?}
     */
    getAllStyles(element) { return window.getComputedStyle(element); }
    /**
     * @param {?} element
     * @param {?} prop
     * @return {?}
     */
    getStyle(element, prop) { return this.getAllStyles(element)[prop]; }
    /**
     * @param {?} element
     * @return {?}
     */
    isStaticPositioned(element) {
        return (this.getStyle(element, 'position') || 'static') === 'static';
    }
    /**
     * @param {?} element
     * @return {?}
     */
    offsetParent(element) {
        /** @type {?} */
        let offsetParentEl = /** @type {?} */ (element.offsetParent) || document.documentElement;
        while (offsetParentEl && offsetParentEl !== document.documentElement && this.isStaticPositioned(offsetParentEl)) {
            offsetParentEl = /** @type {?} */ (offsetParentEl.offsetParent);
        }
        return offsetParentEl || document.documentElement;
    }
    /**
     * @param {?} element
     * @param {?=} round
     * @return {?}
     */
    position(element, round = true) {
        /** @type {?} */
        let elPosition;
        /** @type {?} */
        let parentOffset = { width: 0, height: 0, top: 0, bottom: 0, left: 0, right: 0 };
        if (this.getStyle(element, 'position') === 'fixed') {
            elPosition = element.getBoundingClientRect();
        }
        else {
            /** @type {?} */
            const offsetParentEl = this.offsetParent(element);
            elPosition = this.offset(element, false);
            if (offsetParentEl !== document.documentElement) {
                parentOffset = this.offset(offsetParentEl, false);
            }
            parentOffset.top += offsetParentEl.clientTop;
            parentOffset.left += offsetParentEl.clientLeft;
        }
        elPosition.top -= parentOffset.top;
        elPosition.bottom -= parentOffset.top;
        elPosition.left -= parentOffset.left;
        elPosition.right -= parentOffset.left;
        if (round) {
            elPosition.top = Math.round(elPosition.top);
            elPosition.bottom = Math.round(elPosition.bottom);
            elPosition.left = Math.round(elPosition.left);
            elPosition.right = Math.round(elPosition.right);
        }
        return elPosition;
    }
    /**
     * @param {?} element
     * @param {?=} round
     * @return {?}
     */
    offset(element, round = true) {
        /** @type {?} */
        const elBcr = element.getBoundingClientRect();
        /** @type {?} */
        const viewportOffset = {
            top: window.pageYOffset - document.documentElement.clientTop,
            left: window.pageXOffset - document.documentElement.clientLeft
        };
        /** @type {?} */
        let elOffset = {
            height: elBcr.height || element.offsetHeight,
            width: elBcr.width || element.offsetWidth,
            top: elBcr.top + viewportOffset.top,
            bottom: elBcr.bottom + viewportOffset.top,
            left: elBcr.left + viewportOffset.left,
            right: elBcr.right + viewportOffset.left
        };
        if (round) {
            elOffset.height = Math.round(elOffset.height);
            elOffset.width = Math.round(elOffset.width);
            elOffset.top = Math.round(elOffset.top);
            elOffset.bottom = Math.round(elOffset.bottom);
            elOffset.left = Math.round(elOffset.left);
            elOffset.right = Math.round(elOffset.right);
        }
        return elOffset;
    }
    /**
     * @param {?} hostElement
     * @param {?} targetElement
     * @param {?} placement
     * @param {?=} appendToBody
     * @return {?}
     */
    positionElements(hostElement, targetElement, placement, appendToBody) {
        /** @type {?} */
        const hostElPosition = appendToBody ? this.offset(hostElement, false) : this.position(hostElement, false);
        /** @type {?} */
        const targetElStyles = this.getAllStyles(targetElement);
        /** @type {?} */
        const targetElBCR = targetElement.getBoundingClientRect();
        /** @type {?} */
        const placementPrimary = placement.split('-')[0] || 'top';
        /** @type {?} */
        const placementSecondary = placement.split('-')[1] || 'center';
        /** @type {?} */
        let targetElPosition = {
            'height': targetElBCR.height || targetElement.offsetHeight,
            'width': targetElBCR.width || targetElement.offsetWidth,
            'top': 0,
            'bottom': targetElBCR.height || targetElement.offsetHeight,
            'left': 0,
            'right': targetElBCR.width || targetElement.offsetWidth
        };
        switch (placementPrimary) {
            case 'top':
                targetElPosition.top =
                    hostElPosition.top - (targetElement.offsetHeight + parseFloat(targetElStyles.marginBottom));
                break;
            case 'bottom':
                targetElPosition.top = hostElPosition.top + hostElPosition.height;
                break;
            case 'left':
                targetElPosition.left =
                    hostElPosition.left - (targetElement.offsetWidth + parseFloat(targetElStyles.marginRight));
                break;
            case 'right':
                targetElPosition.left = hostElPosition.left + hostElPosition.width;
                break;
        }
        switch (placementSecondary) {
            case 'top':
                targetElPosition.top = hostElPosition.top;
                break;
            case 'bottom':
                targetElPosition.top = hostElPosition.top + hostElPosition.height - targetElement.offsetHeight;
                break;
            case 'left':
                targetElPosition.left = hostElPosition.left;
                break;
            case 'right':
                targetElPosition.left = hostElPosition.left + hostElPosition.width - targetElement.offsetWidth;
                break;
            case 'center':
                if (placementPrimary === 'top' || placementPrimary === 'bottom') {
                    targetElPosition.left = hostElPosition.left + hostElPosition.width / 2 - targetElement.offsetWidth / 2;
                }
                else {
                    targetElPosition.top = hostElPosition.top + hostElPosition.height / 2 - targetElement.offsetHeight / 2;
                }
                break;
        }
        targetElPosition.top = Math.round(targetElPosition.top);
        targetElPosition.bottom = Math.round(targetElPosition.bottom);
        targetElPosition.left = Math.round(targetElPosition.left);
        targetElPosition.right = Math.round(targetElPosition.right);
        return targetElPosition;
    }
    /**
     * @param {?} hostElement
     * @param {?} targetElement
     * @return {?}
     */
    getAvailablePlacements(hostElement, targetElement) {
        /** @type {?} */
        let availablePlacements = [];
        /** @type {?} */
        let hostElemClientRect = hostElement.getBoundingClientRect();
        /** @type {?} */
        let targetElemClientRect = targetElement.getBoundingClientRect();
        /** @type {?} */
        let html = document.documentElement;
        /** @type {?} */
        let windowHeight = window.innerHeight || html.clientHeight;
        /** @type {?} */
        let windowWidth = window.innerWidth || html.clientWidth;
        /** @type {?} */
        let hostElemClientRectHorCenter = hostElemClientRect.left + hostElemClientRect.width / 2;
        /** @type {?} */
        let hostElemClientRectVerCenter = hostElemClientRect.top + hostElemClientRect.height / 2;
        // left: check if target width can be placed between host left and viewport start and also height of target is
        // inside viewport
        if (targetElemClientRect.width < hostElemClientRect.left) {
            // check for left only
            if (hostElemClientRectVerCenter > targetElemClientRect.height / 2 &&
                windowHeight - hostElemClientRectVerCenter > targetElemClientRect.height / 2) {
                availablePlacements.splice(availablePlacements.length, 1, 'left');
            }
            // check for left-top and left-bottom
            this.setSecondaryPlacementForLeftRight(hostElemClientRect, targetElemClientRect, 'left', availablePlacements);
        }
        // top: target height is less than host top
        if (targetElemClientRect.height < hostElemClientRect.top) {
            if (hostElemClientRectHorCenter > targetElemClientRect.width / 2 &&
                windowWidth - hostElemClientRectHorCenter > targetElemClientRect.width / 2) {
                availablePlacements.splice(availablePlacements.length, 1, 'top');
            }
            this.setSecondaryPlacementForTopBottom(hostElemClientRect, targetElemClientRect, 'top', availablePlacements);
        }
        // right: check if target width can be placed between host right and viewport end and also height of target is
        // inside viewport
        if (windowWidth - hostElemClientRect.right > targetElemClientRect.width) {
            // check for right only
            if (hostElemClientRectVerCenter > targetElemClientRect.height / 2 &&
                windowHeight - hostElemClientRectVerCenter > targetElemClientRect.height / 2) {
                availablePlacements.splice(availablePlacements.length, 1, 'right');
            }
            // check for right-top and right-bottom
            this.setSecondaryPlacementForLeftRight(hostElemClientRect, targetElemClientRect, 'right', availablePlacements);
        }
        // bottom: check if there is enough space between host bottom and viewport end for target height
        if (windowHeight - hostElemClientRect.bottom > targetElemClientRect.height) {
            if (hostElemClientRectHorCenter > targetElemClientRect.width / 2 &&
                windowWidth - hostElemClientRectHorCenter > targetElemClientRect.width / 2) {
                availablePlacements.splice(availablePlacements.length, 1, 'bottom');
            }
            this.setSecondaryPlacementForTopBottom(hostElemClientRect, targetElemClientRect, 'bottom', availablePlacements);
        }
        return availablePlacements;
    }
    /**
     * check if secondary placement for left and right are available i.e. left-top, left-bottom, right-top, right-bottom
     * primaryplacement: left|right
     * availablePlacementArr: array in which available placements to be set
     * @param {?} hostElemClientRect
     * @param {?} targetElemClientRect
     * @param {?} primaryPlacement
     * @param {?} availablePlacementArr
     * @return {?}
     */
    setSecondaryPlacementForLeftRight(hostElemClientRect, targetElemClientRect, primaryPlacement, availablePlacementArr) {
        /** @type {?} */
        let html = document.documentElement;
        // check for left-bottom
        if (targetElemClientRect.height <= hostElemClientRect.bottom) {
            availablePlacementArr.splice(availablePlacementArr.length, 1, primaryPlacement + '-bottom');
        }
        if ((window.innerHeight || html.clientHeight) - hostElemClientRect.top >= targetElemClientRect.height) {
            availablePlacementArr.splice(availablePlacementArr.length, 1, primaryPlacement + '-top');
        }
    }
    /**
     * check if secondary placement for top and bottom are available i.e. top-left, top-right, bottom-left, bottom-right
     * primaryplacement: top|bottom
     * availablePlacementArr: array in which available placements to be set
     * @param {?} hostElemClientRect
     * @param {?} targetElemClientRect
     * @param {?} primaryPlacement
     * @param {?} availablePlacementArr
     * @return {?}
     */
    setSecondaryPlacementForTopBottom(hostElemClientRect, targetElemClientRect, primaryPlacement, availablePlacementArr) {
        /** @type {?} */
        let html = document.documentElement;
        // check for left-bottom
        if ((window.innerWidth || html.clientWidth) - hostElemClientRect.left >= targetElemClientRect.width) {
            availablePlacementArr.splice(availablePlacementArr.length, 1, primaryPlacement + '-left');
        }
        if (targetElemClientRect.width <= hostElemClientRect.right) {
            availablePlacementArr.splice(availablePlacementArr.length, 1, primaryPlacement + '-right');
        }
    }
}
/** @type {?} */
const positionService = new Positioning();
/**
 * @param {?} hostElement
 * @param {?} targetElement
 * @param {?} placement
 * @param {?=} appendToBody
 * @return {?}
 */
function positionElements(hostElement, targetElement, placement, appendToBody) {
    /** @type {?} */
    let placementVals = Array.isArray(placement) ? placement : [/** @type {?} */ (placement)];
    /** @type {?} */
    let hasAuto = placementVals.findIndex(val => val === 'auto');
    if (hasAuto >= 0) {
        ['top', 'bottom', 'left', 'right', 'top-left', 'top-right', 'bottom-left', 'bottom-right', 'left-top',
            'left-bottom', 'right-top', 'right-bottom',
        ].forEach(function (obj) {
            if (placementVals.find(val => val.search('^' + obj) !== -1) == null) {
                placementVals.splice(hasAuto++, 1, /** @type {?} */ (obj));
            }
        });
    }
    /** @type {?} */
    let topVal = 0;
    /** @type {?} */
    let leftVal = 0;
    /** @type {?} */
    let appliedPlacement;
    /** @type {?} */
    let availablePlacements = positionService.getAvailablePlacements(hostElement, targetElement);
    // iterate over all the passed placements
    for (let { item, index } of toItemIndexes(placementVals)) {
        // check if passed placement is present in the available placement or otherwise apply the last placement in the
        // passed placement list
        if ((availablePlacements.find(val => val === item) != null) || (placementVals.length === index + 1)) {
            appliedPlacement = /** @type {?} */ (item);
            /** @type {?} */
            const pos = positionService.positionElements(hostElement, targetElement, item, appendToBody);
            topVal = pos.top;
            leftVal = pos.left;
            break;
        }
    }
    targetElement.style.top = `${topVal}px`;
    targetElement.style.left = `${leftVal}px`;
    return appliedPlacement;
}
/**
 * @template T
 * @param {?} a
 * @return {?}
 */
function toItemIndexes(a) {
    return a.map((item, index) => ({ item, index }));
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
/** @type {?} */
const FOCUSABLE_ELEMENTS_SELECTOR = [
    'a[href]', 'button:not([disabled])', 'input:not([disabled]):not([type="hidden"])', 'select:not([disabled])',
    'textarea:not([disabled])', '[contenteditable]', '[tabindex]:not([tabindex="-1"])'
].join(', ');
/**
 * Returns first and last focusable elements inside of a given element based on specific CSS selector
 * @param {?} element
 * @return {?}
 */
function getFocusableBoundaryElements(element) {
    /** @type {?} */
    const list = element.querySelectorAll(FOCUSABLE_ELEMENTS_SELECTOR);
    return [list[0], list[list.length - 1]];
}
/** *
 * Function that enforces browser focus to be trapped inside a DOM element.
 *
 * Works only for clicks inside the element and navigation with 'Tab', ignoring clicks outside of the element
 *
 * \@param element The element around which focus will be trapped inside
 * \@param stopFocusTrap$ The observable stream. When completed the focus trap will clean up listeners
 * and free internal resources
  @type {?} */
const ngbFocusTrap = (element, stopFocusTrap$) => {
    /** @type {?} */
    const lastFocusedElement$ = fromEvent(element, 'focusin').pipe(takeUntil(stopFocusTrap$), map(e => e.target));
    // 'tab' / 'shift+tab' stream
    fromEvent(element, 'keydown')
        .pipe(takeUntil(stopFocusTrap$), filter(e => e.which === Key.Tab), withLatestFrom(lastFocusedElement$))
        .subscribe(([tabEvent, focusedElement]) => {
        const [first, last] = getFocusableBoundaryElements(element);
        if (focusedElement === first && tabEvent.shiftKey) {
            last.focus();
            tabEvent.preventDefault();
        }
        if (focusedElement === last && !tabEvent.shiftKey) {
            first.focus();
            tabEvent.preventDefault();
        }
    });
    // inside click
    fromEvent(element, 'click')
        .pipe(takeUntil(stopFocusTrap$), withLatestFrom(lastFocusedElement$), map(arr => /** @type {?} */ (arr[1])))
        .subscribe(lastFocusedElement => lastFocusedElement.focus());
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
/** @type {?} */
const NGB_DATEPICKER_VALUE_ACCESSOR$1 = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => NgbInputDatepicker),
    multi: true
};
/** @type {?} */
const NGB_DATEPICKER_VALIDATOR = {
    provide: NG_VALIDATORS,
    useExisting: forwardRef(() => NgbInputDatepicker),
    multi: true
};
/**
 * A directive that makes it possible to have datepickers on input fields.
 * Manages integration with the input field itself (data entry) and ngModel (validation etc.).
 */
class NgbInputDatepicker {
    /**
     * @param {?} _parserFormatter
     * @param {?} _elRef
     * @param {?} _vcRef
     * @param {?} _renderer
     * @param {?} _cfr
     * @param {?} _ngZone
     * @param {?} _service
     * @param {?} _calendar
     * @param {?} _dateAdapter
     * @param {?} _document
     */
    constructor(_parserFormatter, _elRef, _vcRef, _renderer, _cfr, _ngZone, _service, _calendar, _dateAdapter, _document) {
        this._parserFormatter = _parserFormatter;
        this._elRef = _elRef;
        this._vcRef = _vcRef;
        this._renderer = _renderer;
        this._cfr = _cfr;
        this._ngZone = _ngZone;
        this._service = _service;
        this._calendar = _calendar;
        this._dateAdapter = _dateAdapter;
        this._document = _document;
        this._closed$ = new Subject();
        this._cRef = null;
        this._disabled = false;
        /**
         * Indicates whether the datepicker popup should be closed automatically after date selection / outside click or not.
         *
         * By default the popup will close on both date selection and outside click. If the value is 'false' the popup has to
         * be closed manually via '.close()' or '.toggle()' methods. If the value is set to 'inside' the popup will close on
         * date selection only. For the 'outside' the popup will close only on the outside click.
         *
         * \@since 3.0.0
         */
        this.autoClose = true;
        /**
         * Placement of a datepicker popup accepts:
         *    "top", "top-left", "top-right", "bottom", "bottom-left", "bottom-right",
         *    "left", "left-top", "left-bottom", "right", "right-top", "right-bottom"
         * and array of above values.
         */
        this.placement = 'bottom-left';
        /**
         * An event fired when user selects a date using keyboard or mouse.
         * The payload of the event is currently selected NgbDate.
         *
         * \@since 1.1.1
         */
        this.dateSelect = new EventEmitter();
        /**
         * An event fired when navigation happens and currently displayed month changes.
         * See NgbDatepickerNavigateEvent for the payload info.
         */
        this.navigate = new EventEmitter();
        this._onChange = (_) => { };
        this._onTouched = () => { };
        this._validatorChange = () => { };
        this._zoneSubscription = _ngZone.onStable.subscribe(() => {
            if (this._cRef) {
                positionElements(this._elRef.nativeElement, this._cRef.location.nativeElement, this.placement, this.container === 'body');
            }
        });
    }
    /**
     * @return {?}
     */
    get disabled() {
        return this._disabled;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set disabled(value) {
        this._disabled = value === '' || (value && value !== 'false');
        if (this.isOpen()) {
            this._cRef.instance.setDisabledState(this._disabled);
        }
    }
    /**
     * @param {?} fn
     * @return {?}
     */
    registerOnChange(fn) { this._onChange = fn; }
    /**
     * @param {?} fn
     * @return {?}
     */
    registerOnTouched(fn) { this._onTouched = fn; }
    /**
     * @param {?} fn
     * @return {?}
     */
    registerOnValidatorChange(fn) { this._validatorChange = fn; }
    /**
     * @param {?} isDisabled
     * @return {?}
     */
    setDisabledState(isDisabled) { this.disabled = isDisabled; }
    /**
     * @param {?} c
     * @return {?}
     */
    validate(c) {
        /** @type {?} */
        const value = c.value;
        if (value === null || value === undefined) {
            return null;
        }
        /** @type {?} */
        const ngbDate = this._fromDateStruct(this._dateAdapter.fromModel(value));
        if (!this._calendar.isValid(ngbDate)) {
            return { 'ngbDate': { invalid: c.value } };
        }
        if (this.minDate && ngbDate.before(NgbDate.from(this.minDate))) {
            return { 'ngbDate': { requiredBefore: this.minDate } };
        }
        if (this.maxDate && ngbDate.after(NgbDate.from(this.maxDate))) {
            return { 'ngbDate': { requiredAfter: this.maxDate } };
        }
    }
    /**
     * @param {?} value
     * @return {?}
     */
    writeValue(value) {
        this._model = this._fromDateStruct(this._dateAdapter.fromModel(value));
        this._writeModelValue(this._model);
    }
    /**
     * @param {?} value
     * @param {?=} updateView
     * @return {?}
     */
    manualDateChange(value, updateView = false) {
        this._model = this._fromDateStruct(this._parserFormatter.parse(value));
        this._onChange(this._model ? this._dateAdapter.toModel(this._model) : (value === '' ? null : value));
        if (updateView && this._model) {
            this._writeModelValue(this._model);
        }
    }
    /**
     * @return {?}
     */
    isOpen() { return !!this._cRef; }
    /**
     * Opens the datepicker with the selected date indicated by the ngModel value.
     * @return {?}
     */
    open() {
        if (!this.isOpen()) {
            /** @type {?} */
            const cf = this._cfr.resolveComponentFactory(NgbDatepicker);
            this._cRef = this._vcRef.createComponent(cf);
            this._applyPopupStyling(this._cRef.location.nativeElement);
            this._applyDatepickerInputs(this._cRef.instance);
            this._subscribeForDatepickerOutputs(this._cRef.instance);
            this._cRef.instance.ngOnInit();
            this._cRef.instance.writeValue(this._dateAdapter.toModel(this._model));
            // date selection event handling
            this._cRef.instance.registerOnChange((selectedDate) => {
                this.writeValue(selectedDate);
                this._onChange(selectedDate);
            });
            this._cRef.changeDetectorRef.detectChanges();
            this._cRef.instance.setDisabledState(this.disabled);
            if (this.container === 'body') {
                window.document.querySelector(this.container).appendChild(this._cRef.location.nativeElement);
            }
            // focus handling
            ngbFocusTrap(this._cRef.location.nativeElement, this._closed$);
            this._cRef.instance.focus();
            // closing on ESC and outside clicks
            this._ngZone.runOutsideAngular(() => {
                /** @type {?} */
                const escapes$ = fromEvent(this._document, 'keyup')
                    .pipe(takeUntil(this._closed$), filter(e => e.which === Key.Escape));
                /** @type {?} */
                let outsideClicks$;
                if (this.autoClose === true || this.autoClose === 'outside') {
                    /** @type {?} */
                    let isOpening = true;
                    requestAnimationFrame(() => isOpening = false);
                    outsideClicks$ =
                        fromEvent(this._document, 'click')
                            .pipe(takeUntil(this._closed$), filter(event => !isOpening && this._shouldCloseOnOutsideClick(event)));
                }
                else {
                    outsideClicks$ = NEVER;
                }
                race([escapes$, outsideClicks$]).subscribe(() => this._ngZone.run(() => this.close()));
            });
        }
    }
    /**
     * Closes the datepicker popup.
     * @return {?}
     */
    close() {
        if (this.isOpen()) {
            this._vcRef.remove(this._vcRef.indexOf(this._cRef.hostView));
            this._cRef = null;
            this._closed$.next();
        }
    }
    /**
     * Toggles the datepicker popup (opens when closed and closes when opened).
     * @return {?}
     */
    toggle() {
        if (this.isOpen()) {
            this.close();
        }
        else {
            this.open();
        }
    }
    /**
     * Navigates current view to provided date.
     * With default calendar we use ISO 8601: 'month' is 1=Jan ... 12=Dec.
     * If nothing or invalid date provided calendar will open current month.
     * Use 'startDate' input as an alternative
     * @param {?=} date
     * @return {?}
     */
    navigateTo(date) {
        if (this.isOpen()) {
            this._cRef.instance.navigateTo(date);
        }
    }
    /**
     * @return {?}
     */
    onBlur() { this._onTouched(); }
    /**
     * @param {?} changes
     * @return {?}
     */
    ngOnChanges(changes) {
        if (changes['minDate'] || changes['maxDate']) {
            this._validatorChange();
        }
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        this.close();
        this._zoneSubscription.unsubscribe();
    }
    /**
     * @param {?} datepickerInstance
     * @return {?}
     */
    _applyDatepickerInputs(datepickerInstance) {
        ['dayTemplate', 'displayMonths', 'firstDayOfWeek', 'markDisabled', 'minDate', 'maxDate', 'navigation',
            'outsideDays', 'showNavigation', 'showWeekdays', 'showWeekNumbers']
            .forEach((optionName) => {
            if (this[optionName] !== undefined) {
                datepickerInstance[optionName] = this[optionName];
            }
        });
        datepickerInstance.startDate = this.startDate || this._model;
    }
    /**
     * @param {?} nativeElement
     * @return {?}
     */
    _applyPopupStyling(nativeElement) {
        this._renderer.addClass(nativeElement, 'dropdown-menu');
        this._renderer.setStyle(nativeElement, 'padding', '0');
        this._renderer.addClass(nativeElement, 'show');
    }
    /**
     * @param {?} event
     * @return {?}
     */
    _shouldCloseOnOutsideClick(event) {
        return ![this._elRef.nativeElement, this._cRef.location.nativeElement].some(el => el.contains(event.target));
    }
    /**
     * @param {?} datepickerInstance
     * @return {?}
     */
    _subscribeForDatepickerOutputs(datepickerInstance) {
        datepickerInstance.navigate.subscribe(date => this.navigate.emit(date));
        datepickerInstance.select.subscribe(date => {
            this.dateSelect.emit(date);
            if (this.autoClose === true || this.autoClose === 'inside') {
                this.close();
            }
        });
    }
    /**
     * @param {?} model
     * @return {?}
     */
    _writeModelValue(model) {
        this._renderer.setProperty(this._elRef.nativeElement, 'value', this._parserFormatter.format(model));
        if (this.isOpen()) {
            this._cRef.instance.writeValue(this._dateAdapter.toModel(model));
            this._onTouched();
        }
    }
    /**
     * @param {?} date
     * @return {?}
     */
    _fromDateStruct(date) {
        /** @type {?} */
        const ngbDate = date ? new NgbDate(date.year, date.month, date.day) : null;
        return this._calendar.isValid(ngbDate) ? ngbDate : null;
    }
}
NgbInputDatepicker.decorators = [
    { type: Directive, args: [{
                selector: 'input[ngbDatepicker]',
                exportAs: 'ngbDatepicker',
                host: {
                    '(input)': 'manualDateChange($event.target.value)',
                    '(change)': 'manualDateChange($event.target.value, true)',
                    '(blur)': 'onBlur()',
                    '[disabled]': 'disabled'
                },
                providers: [NGB_DATEPICKER_VALUE_ACCESSOR$1, NGB_DATEPICKER_VALIDATOR, NgbDatepickerService]
            },] },
];
/** @nocollapse */
NgbInputDatepicker.ctorParameters = () => [
    { type: NgbDateParserFormatter },
    { type: ElementRef },
    { type: ViewContainerRef },
    { type: Renderer2 },
    { type: ComponentFactoryResolver },
    { type: NgZone },
    { type: NgbDatepickerService },
    { type: NgbCalendar },
    { type: NgbDateAdapter },
    { type: undefined, decorators: [{ type: Inject, args: [DOCUMENT,] }] }
];
NgbInputDatepicker.propDecorators = {
    autoClose: [{ type: Input }],
    dayTemplate: [{ type: Input }],
    displayMonths: [{ type: Input }],
    firstDayOfWeek: [{ type: Input }],
    markDisabled: [{ type: Input }],
    minDate: [{ type: Input }],
    maxDate: [{ type: Input }],
    navigation: [{ type: Input }],
    outsideDays: [{ type: Input }],
    placement: [{ type: Input }],
    showWeekdays: [{ type: Input }],
    showWeekNumbers: [{ type: Input }],
    startDate: [{ type: Input }],
    container: [{ type: Input }],
    dateSelect: [{ type: Output }],
    navigate: [{ type: Output }],
    disabled: [{ type: Input }]
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
class NgbDatepickerDayView {
    /**
     * @param {?} i18n
     */
    constructor(i18n) {
        this.i18n = i18n;
    }
    /**
     * @return {?}
     */
    isMuted() { return !this.selected && (this.date.month !== this.currentMonth || this.disabled); }
}
NgbDatepickerDayView.decorators = [
    { type: Component, args: [{
                selector: '[ngbDatepickerDayView]',
                changeDetection: ChangeDetectionStrategy.OnPush,
                styles: [`
    :host {
      text-align: center;
      width: 2rem;
      height: 2rem;
      line-height: 2rem;
      border-radius: 0.25rem;
      background: transparent;
    }
    :host.outside {
      opacity: 0.5;
    }
  `],
                host: {
                    'class': 'btn-light',
                    '[class.bg-primary]': 'selected',
                    '[class.text-white]': 'selected',
                    '[class.text-muted]': 'isMuted()',
                    '[class.outside]': 'isMuted()',
                    '[class.active]': 'focused'
                },
                template: `{{ i18n.getDayNumerals(date) }}`
            },] },
];
/** @nocollapse */
NgbDatepickerDayView.ctorParameters = () => [
    { type: NgbDatepickerI18n }
];
NgbDatepickerDayView.propDecorators = {
    currentMonth: [{ type: Input }],
    date: [{ type: Input }],
    disabled: [{ type: Input }],
    focused: [{ type: Input }],
    selected: [{ type: Input }]
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
class NgbDatepickerNavigationSelect {
    /**
     * @param {?} i18n
     */
    constructor(i18n) {
        this.i18n = i18n;
        this.select = new EventEmitter();
    }
    /**
     * @param {?} month
     * @return {?}
     */
    changeMonth(month) { this.select.emit(new NgbDate(this.date.year, toInteger(month), 1)); }
    /**
     * @param {?} year
     * @return {?}
     */
    changeYear(year) { this.select.emit(new NgbDate(toInteger(year), this.date.month, 1)); }
}
NgbDatepickerNavigationSelect.decorators = [
    { type: Component, args: [{
                selector: 'ngb-datepicker-navigation-select',
                changeDetection: ChangeDetectionStrategy.OnPush,
                styles: [`
    :host>select {
      display: flex;
      display: -ms-flexbox;
      -ms-flex: 1 1 auto;
      width: 100%;
      padding: 0 0.5rem;
      font-size: 0.875rem;
      height: 1.85rem;
    }
  `],
                template: `
    <select
      [disabled]="disabled"
      class="custom-select"
      [value]="date?.month"
      i18n-aria-label="@@ngb.datepicker.select-month" aria-label="Select month"
      i18n-title="@@ngb.datepicker.select-month" title="Select month"
      (change)="changeMonth($event.target.value)">
        <option *ngFor="let m of months" [attr.aria-label]="i18n.getMonthFullName(m, date?.year)"
                [value]="m">{{ i18n.getMonthShortName(m, date?.year) }}</option>
    </select><select
      [disabled]="disabled"
      class="custom-select"
      [value]="date?.year"
      i18n-aria-label="@@ngb.datepicker.select-year" aria-label="Select year"
      i18n-title="@@ngb.datepicker.select-year" title="Select year"
      (change)="changeYear($event.target.value)">
        <option *ngFor="let y of years" [value]="y">{{ i18n.getYearNumerals(y) }}</option>
    </select>
  `
            },] },
];
/** @nocollapse */
NgbDatepickerNavigationSelect.ctorParameters = () => [
    { type: NgbDatepickerI18n }
];
NgbDatepickerNavigationSelect.propDecorators = {
    date: [{ type: Input }],
    disabled: [{ type: Input }],
    months: [{ type: Input }],
    years: [{ type: Input }],
    select: [{ type: Output }]
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
/**
 * @abstract
 */
class NgbCalendarHijri extends NgbCalendar {
    /**
     * @return {?}
     */
    getDaysPerWeek() { return 7; }
    /**
     * @return {?}
     */
    getMonths() { return [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]; }
    /**
     * @return {?}
     */
    getWeeksPerMonth() { return 6; }
    /**
     * @param {?} date
     * @param {?=} period
     * @param {?=} number
     * @return {?}
     */
    getNext(date, period = 'd', number = 1) {
        date = new NgbDate(date.year, date.month, date.day);
        switch (period) {
            case 'y':
                date = this._setYear(date, date.year + number);
                date.month = 1;
                date.day = 1;
                return date;
            case 'm':
                date = this._setMonth(date, date.month + number);
                date.day = 1;
                return date;
            case 'd':
                return this._setDay(date, date.day + number);
            default:
                return date;
        }
    }
    /**
     * @param {?} date
     * @param {?=} period
     * @param {?=} number
     * @return {?}
     */
    getPrev(date, period = 'd', number = 1) { return this.getNext(date, period, -number); }
    /**
     * @param {?} date
     * @return {?}
     */
    getWeekday(date) {
        /** @type {?} */
        const day = this.toGregorian(date).getDay();
        // in JS Date Sun=0, in ISO 8601 Sun=7
        return day === 0 ? 7 : day;
    }
    /**
     * @param {?} week
     * @param {?} firstDayOfWeek
     * @return {?}
     */
    getWeekNumber(week, firstDayOfWeek) {
        // in JS Date Sun=0, in ISO 8601 Sun=7
        if (firstDayOfWeek === 7) {
            firstDayOfWeek = 0;
        }
        /** @type {?} */
        const thursdayIndex = (4 + 7 - firstDayOfWeek) % 7;
        /** @type {?} */
        const date = week[thursdayIndex];
        /** @type {?} */
        const jsDate = this.toGregorian(date);
        jsDate.setDate(jsDate.getDate() + 4 - (jsDate.getDay() || 7));
        /** @type {?} */
        const time = jsDate.getTime();
        /** @type {?} */
        const MuhDate = this.toGregorian(new NgbDate(date.year, 1, 1)); // Compare with Muharram 1
        return Math.floor(Math.round((time - MuhDate.getTime()) / 86400000) / 7) + 1;
    }
    /**
     * @return {?}
     */
    getToday() { return this.fromGregorian(new Date()); }
    /**
     * @param {?} date
     * @return {?}
     */
    isValid(date) {
        return date && isNumber(date.year) && isNumber(date.month) && isNumber(date.day) &&
            !isNaN(this.toGregorian(date).getTime());
    }
    /**
     * @param {?} date
     * @param {?} day
     * @return {?}
     */
    _setDay(date, day) {
        day = +day;
        /** @type {?} */
        let mDays = this.getDaysPerMonth(date.month, date.year);
        if (day <= 0) {
            while (day <= 0) {
                date = this._setMonth(date, date.month - 1);
                mDays = this.getDaysPerMonth(date.month, date.year);
                day += mDays;
            }
        }
        else if (day > mDays) {
            while (day > mDays) {
                day -= mDays;
                date = this._setMonth(date, date.month + 1);
                mDays = this.getDaysPerMonth(date.month, date.year);
            }
        }
        date.day = day;
        return date;
    }
    /**
     * @param {?} date
     * @param {?} month
     * @return {?}
     */
    _setMonth(date, month) {
        month = +month;
        date.year = date.year + Math.floor((month - 1) / 12);
        date.month = Math.floor(((month - 1) % 12 + 12) % 12) + 1;
        return date;
    }
    /**
     * @param {?} date
     * @param {?} year
     * @return {?}
     */
    _setYear(date, year) {
        date.year = +year;
        return date;
    }
}
NgbCalendarHijri.decorators = [
    { type: Injectable },
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
/**
 * Checks if islamic year is a leap year
 * @param {?} hYear
 * @return {?}
 */
function isIslamicLeapYear(hYear) {
    return (14 + 11 * hYear) % 30 < 11;
}
/**
 * Checks if gregorian years is a leap year
 * @param {?} gDate
 * @return {?}
 */
function isGregorianLeapYear(gDate) {
    /** @type {?} */
    const year = gDate.getFullYear();
    return year % 4 === 0 && year % 100 !== 0 || year % 400 === 0;
}
/**
 * Returns the start of Hijri Month.
 * `hMonth` is 0 for Muharram, 1 for Safar, etc.
 * `hYear` is any Hijri hYear.
 * @param {?} hYear
 * @param {?} hMonth
 * @return {?}
 */
function getIslamicMonthStart(hYear, hMonth) {
    return Math.ceil(29.5 * hMonth) + (hYear - 1) * 354 + Math.floor((3 + 11 * hYear) / 30.0);
}
/**
 * Returns the start of Hijri year.
 * `year` is any Hijri year.
 * @param {?} year
 * @return {?}
 */
function getIslamicYearStart(year) {
    return (year - 1) * 354 + Math.floor((3 + 11 * year) / 30.0);
}
/**
 * @param {?} a
 * @param {?} b
 * @return {?}
 */
function mod(a, b) {
    return a - b * Math.floor(a / b);
}
/** *
 * The civil calendar is one type of Hijri calendars used in islamic countries.
 * Uses a fixed cycle of alternating 29- and 30-day months,
 * with a leap day added to the last month of 11 out of every 30 years.
 * http://cldr.unicode.org/development/development-process/design-proposals/islamic-calendar-types
 * All the calculations here are based on the equations from "Calendrical Calculations" By Edward M. Reingold, Nachum
 * Dershowitz.
  @type {?} */
const GREGORIAN_EPOCH = 1721425.5;
/** @type {?} */
const ISLAMIC_EPOCH = 1948439.5;
class NgbCalendarIslamicCivil extends NgbCalendarHijri {
    /**
     * Returns the equivalent islamic(civil) date value for a give input Gregorian date.
     * `gDate` is a JS Date to be converted to Hijri.
     * @param {?} gDate
     * @return {?}
     */
    fromGregorian(gDate) {
        /** @type {?} */
        const gYear = gDate.getFullYear();
        /** @type {?} */
        const gMonth = gDate.getMonth();
        /** @type {?} */
        const gDay = gDate.getDate();
        /** @type {?} */
        let julianDay = GREGORIAN_EPOCH - 1 + 365 * (gYear - 1) + Math.floor((gYear - 1) / 4) +
            -Math.floor((gYear - 1) / 100) + Math.floor((gYear - 1) / 400) +
            Math.floor((367 * (gMonth + 1) - 362) / 12 + (gMonth + 1 <= 2 ? 0 : isGregorianLeapYear(gDate) ? -1 : -2) + gDay);
        julianDay = Math.floor(julianDay) + 0.5;
        /** @type {?} */
        const days = julianDay - ISLAMIC_EPOCH;
        /** @type {?} */
        const hYear = Math.floor((30 * days + 10646) / 10631.0);
        /** @type {?} */
        let hMonth = Math.ceil((days - 29 - getIslamicYearStart(hYear)) / 29.5);
        hMonth = Math.min(hMonth, 11);
        /** @type {?} */
        const hDay = Math.ceil(days - getIslamicMonthStart(hYear, hMonth)) + 1;
        return new NgbDate(hYear, hMonth + 1, hDay);
    }
    /**
     * Returns the equivalent JS date value for a give input islamic(civil) date.
     * `hDate` is an islamic(civil) date to be converted to Gregorian.
     * @param {?} hDate
     * @return {?}
     */
    toGregorian(hDate) {
        /** @type {?} */
        const hYear = hDate.year;
        /** @type {?} */
        const hMonth = hDate.month - 1;
        /** @type {?} */
        const hDay = hDate.day;
        /** @type {?} */
        const julianDay = hDay + Math.ceil(29.5 * hMonth) + (hYear - 1) * 354 + Math.floor((3 + 11 * hYear) / 30) + ISLAMIC_EPOCH - 1;
        /** @type {?} */
        const wjd = Math.floor(julianDay - 0.5) + 0.5;
        /** @type {?} */
        const depoch = wjd - GREGORIAN_EPOCH;
        /** @type {?} */
        const quadricent = Math.floor(depoch / 146097);
        /** @type {?} */
        const dqc = mod(depoch, 146097);
        /** @type {?} */
        const cent = Math.floor(dqc / 36524);
        /** @type {?} */
        const dcent = mod(dqc, 36524);
        /** @type {?} */
        const quad = Math.floor(dcent / 1461);
        /** @type {?} */
        const dquad = mod(dcent, 1461);
        /** @type {?} */
        const yindex = Math.floor(dquad / 365);
        /** @type {?} */
        let year = quadricent * 400 + cent * 100 + quad * 4 + yindex;
        if (!(cent === 4 || yindex === 4)) {
            year++;
        }
        /** @type {?} */
        const gYearStart = GREGORIAN_EPOCH + 365 * (year - 1) + Math.floor((year - 1) / 4) - Math.floor((year - 1) / 100) +
            Math.floor((year - 1) / 400);
        /** @type {?} */
        const yearday = wjd - gYearStart;
        /** @type {?} */
        const tjd = GREGORIAN_EPOCH - 1 + 365 * (year - 1) + Math.floor((year - 1) / 4) - Math.floor((year - 1) / 100) +
            Math.floor((year - 1) / 400) + Math.floor(739 / 12 + (isGregorianLeapYear(new Date(year, 3, 1)) ? -1 : -2) + 1);
        /** @type {?} */
        const leapadj = wjd < tjd ? 0 : isGregorianLeapYear(new Date(year, 3, 1)) ? 1 : 2;
        /** @type {?} */
        const month = Math.floor(((yearday + leapadj) * 12 + 373) / 367);
        /** @type {?} */
        const tjd2 = GREGORIAN_EPOCH - 1 + 365 * (year - 1) + Math.floor((year - 1) / 4) - Math.floor((year - 1) / 100) +
            Math.floor((year - 1) / 400) +
            Math.floor((367 * month - 362) / 12 + (month <= 2 ? 0 : isGregorianLeapYear(new Date(year, month - 1, 1)) ? -1 : -2) +
                1);
        /** @type {?} */
        const day = wjd - tjd2 + 1;
        return new Date(year, month - 1, day);
    }
    /**
     * Returns the number of days in a specific Hijri month.
     * `month` is 1 for Muharram, 2 for Safar, etc.
     * `year` is any Hijri year.
     * @param {?} month
     * @param {?} year
     * @return {?}
     */
    getDaysPerMonth(month, year) {
        year = year + Math.floor(month / 13);
        month = ((month - 1) % 12) + 1;
        /** @type {?} */
        let length = 29 + month % 2;
        if (month === 12 && isIslamicLeapYear(year)) {
            length++;
        }
        return length;
    }
}
NgbCalendarIslamicCivil.decorators = [
    { type: Injectable },
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
/** *
 * Umalqura calendar is one type of Hijri calendars used in islamic countries.
 * This Calendar is used by Saudi Arabia for administrative purpose.
 * Unlike tabular calendars, the algorithm involves astronomical calculation, but it's still deterministic.
 * http://cldr.unicode.org/development/development-process/design-proposals/islamic-calendar-types
  @type {?} */
const GREGORIAN_FIRST_DATE = new Date(1882, 10, 12);
/** @type {?} */
const GREGORIAN_LAST_DATE = new Date(2174, 10, 25);
/** @type {?} */
const HIJRI_BEGIN = 1300;
/** @type {?} */
const HIJRI_END = 1600;
/** @type {?} */
const ONE_DAY = 1000 * 60 * 60 * 24;
/** @type {?} */
const MONTH_LENGTH = [
    '101010101010', '110101010100', '111011001001', '011011010100', '011011101010',
    '001101101100', '101010101101', '010101010101', '011010101001', '011110010010',
    '101110101001', '010111010100', '101011011010', '010101011100', '110100101101',
    '011010010101', '011101001010', '101101010100', '101101101010', '010110101101',
    '010010101110', '101001001111', '010100010111', '011010001011', '011010100101',
    '101011010101', '001011010110', '100101011011', '010010011101', '101001001101',
    '110100100110', '110110010101', '010110101100', '100110110110', '001010111010',
    '101001011011', '010100101011', '101010010101', '011011001010', '101011101001',
    '001011110100', '100101110110', '001010110110', '100101010110', '101011001010',
    '101110100100', '101111010010', '010111011001', '001011011100', '100101101101',
    '010101001101', '101010100101', '101101010010', '101110100101', '010110110100',
    '100110110110', '010101010111', '001010010111', '010101001011', '011010100011',
    '011101010010', '101101100101', '010101101010', '101010101011', '010100101011',
    '110010010101', '110101001010', '110110100101', '010111001010', '101011010110',
    '100101010111', '010010101011', '100101001011', '101010100101', '101101010010',
    '101101101010', '010101110101', '001001110110', '100010110111', '010001011011',
    '010101010101', '010110101001', '010110110100', '100111011010', '010011011101',
    '001001101110', '100100110110', '101010101010', '110101010100', '110110110010',
    '010111010101', '001011011010', '100101011011', '010010101011', '101001010101',
    '101101001001', '101101100100', '101101110001', '010110110100', '101010110101',
    '101001010101', '110100100101', '111010010010', '111011001001', '011011010100',
    '101011101001', '100101101011', '010010101011', '101010010011', '110101001001',
    '110110100100', '110110110010', '101010111001', '010010111010', '101001011011',
    '010100101011', '101010010101', '101100101010', '101101010101', '010101011100',
    '010010111101', '001000111101', '100100011101', '101010010101', '101101001010',
    '101101011010', '010101101101', '001010110110', '100100111011', '010010011011',
    '011001010101', '011010101001', '011101010100', '101101101010', '010101101100',
    '101010101101', '010101010101', '101100101001', '101110010010', '101110101001',
    '010111010100', '101011011010', '010101011010', '101010101011', '010110010101',
    '011101001001', '011101100100', '101110101010', '010110110101', '001010110110',
    '101001010110', '111001001101', '101100100101', '101101010010', '101101101010',
    '010110101101', '001010101110', '100100101111', '010010010111', '011001001011',
    '011010100101', '011010101100', '101011010110', '010101011101', '010010011101',
    '101001001101', '110100010110', '110110010101', '010110101010', '010110110101',
    '001011011010', '100101011011', '010010101101', '010110010101', '011011001010',
    '011011100100', '101011101010', '010011110101', '001010110110', '100101010110',
    '101010101010', '101101010100', '101111010010', '010111011001', '001011101010',
    '100101101101', '010010101101', '101010010101', '101101001010', '101110100101',
    '010110110010', '100110110101', '010011010110', '101010010111', '010101000111',
    '011010010011', '011101001001', '101101010101', '010101101010', '101001101011',
    '010100101011', '101010001011', '110101000110', '110110100011', '010111001010',
    '101011010110', '010011011011', '001001101011', '100101001011', '101010100101',
    '101101010010', '101101101001', '010101110101', '000101110110', '100010110111',
    '001001011011', '010100101011', '010101100101', '010110110100', '100111011010',
    '010011101101', '000101101101', '100010110110', '101010100110', '110101010010',
    '110110101001', '010111010100', '101011011010', '100101011011', '010010101011',
    '011001010011', '011100101001', '011101100010', '101110101001', '010110110010',
    '101010110101', '010101010101', '101100100101', '110110010010', '111011001001',
    '011011010010', '101011101001', '010101101011', '010010101011', '101001010101',
    '110100101001', '110101010100', '110110101010', '100110110101', '010010111010',
    '101000111011', '010010011011', '101001001101', '101010101010', '101011010101',
    '001011011010', '100101011101', '010001011110', '101000101110', '110010011010',
    '110101010101', '011010110010', '011010111001', '010010111010', '101001011101',
    '010100101101', '101010010101', '101101010010', '101110101000', '101110110100',
    '010110111001', '001011011010', '100101011010', '101101001010', '110110100100',
    '111011010001', '011011101000', '101101101010', '010101101101', '010100110101',
    '011010010101', '110101001010', '110110101000', '110111010100', '011011011010',
    '010101011011', '001010011101', '011000101011', '101100010101', '101101001010',
    '101110010101', '010110101010', '101010101110', '100100101110', '110010001111',
    '010100100111', '011010010101', '011010101010', '101011010110', '010101011101',
    '001010011101'
];
/**
 * @param {?} date1
 * @param {?} date2
 * @return {?}
 */
function getDaysDiff(date1, date2) {
    /** @type {?} */
    const diff = Math.abs(date1.getTime() - date2.getTime());
    return Math.round(diff / ONE_DAY);
}
class NgbCalendarIslamicUmalqura extends NgbCalendarIslamicCivil {
    /**
     * Returns the equivalent islamic(Umalqura) date value for a give input Gregorian date.
     * `gdate` is s JS Date to be converted to Hijri.
     * @param {?} gDate
     * @return {?}
     */
    fromGregorian(gDate) {
        /** @type {?} */
        let hDay = 1;
        /** @type {?} */
        let hMonth = 0;
        /** @type {?} */
        let hYear = 1300;
        /** @type {?} */
        let daysDiff = getDaysDiff(gDate, GREGORIAN_FIRST_DATE);
        if (gDate.getTime() - GREGORIAN_FIRST_DATE.getTime() >= 0 && gDate.getTime() - GREGORIAN_LAST_DATE.getTime() <= 0) {
            /** @type {?} */
            let year = 1300;
            for (let i = 0; i < MONTH_LENGTH.length; i++, year++) {
                for (let j = 0; j < 12; j++) {
                    /** @type {?} */
                    let numOfDays = +MONTH_LENGTH[i][j] + 29;
                    if (daysDiff <= numOfDays) {
                        hDay = daysDiff + 1;
                        if (hDay > numOfDays) {
                            hDay = 1;
                            j++;
                        }
                        if (j > 11) {
                            j = 0;
                            year++;
                        }
                        hMonth = j;
                        hYear = year;
                        return new NgbDate(hYear, hMonth + 1, hDay);
                    }
                    daysDiff = daysDiff - numOfDays;
                }
            }
        }
        else {
            return super.fromGregorian(gDate);
        }
    }
    /**
     * Converts the current Hijri date to Gregorian.
     * @param {?} hDate
     * @return {?}
     */
    toGregorian(hDate) {
        /** @type {?} */
        const hYear = hDate.year;
        /** @type {?} */
        const hMonth = hDate.month - 1;
        /** @type {?} */
        const hDay = hDate.day;
        /** @type {?} */
        let gDate = new Date(GREGORIAN_FIRST_DATE);
        /** @type {?} */
        let dayDiff = hDay - 1;
        if (hYear >= HIJRI_BEGIN && hYear <= HIJRI_END) {
            for (let y = 0; y < hYear - HIJRI_BEGIN; y++) {
                for (let m = 0; m < 12; m++) {
                    dayDiff += +MONTH_LENGTH[y][m] + 29;
                }
            }
            for (let m = 0; m < hMonth; m++) {
                dayDiff += +MONTH_LENGTH[hYear - HIJRI_BEGIN][m] + 29;
            }
            gDate.setDate(GREGORIAN_FIRST_DATE.getDate() + dayDiff);
        }
        else {
            gDate = super.toGregorian(hDate);
        }
        return gDate;
    }
    /**
     * Returns the number of days in a specific Hijri hMonth.
     * `hMonth` is 1 for Muharram, 2 for Safar, etc.
     * `hYear` is any Hijri hYear.
     * @param {?} hMonth
     * @param {?} hYear
     * @return {?}
     */
    getDaysPerMonth(hMonth, hYear) {
        if (hYear >= HIJRI_BEGIN && hYear <= HIJRI_END) {
            /** @type {?} */
            const pos = hYear - HIJRI_BEGIN;
            return +MONTH_LENGTH[pos][hMonth - 1] + 29;
        }
        return super.getDaysPerMonth(hMonth, hYear);
    }
}
NgbCalendarIslamicUmalqura.decorators = [
    { type: Injectable },
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
/**
 * Returns the equivalent JS date value for a give input Jalali date.
 * `jalaliDate` is an Jalali date to be converted to Gregorian.
 * @param {?} jalaliDate
 * @return {?}
 */
function toGregorian(jalaliDate) {
    /** @type {?} */
    let jdn = jalaliToJulian(jalaliDate.year, jalaliDate.month, jalaliDate.day);
    /** @type {?} */
    let date = julianToGregorian(jdn);
    date.setHours(6, 30, 3, 200);
    return date;
}
/**
 * Returns the equivalent jalali date value for a give input Gregorian date.
 * `gdate` is a JS Date to be converted to jalali.
 * utc to local
 * @param {?} gdate
 * @return {?}
 */
function fromGregorian(gdate) {
    /** @type {?} */
    let g2d = gregorianToJulian(gdate.getFullYear(), gdate.getMonth() + 1, gdate.getDate());
    return julianToJalali(g2d);
}
/**
 * @param {?} date
 * @param {?} yearValue
 * @return {?}
 */
function setJalaliYear(date, yearValue) {
    date.year = +yearValue;
    return date;
}
/**
 * @param {?} date
 * @param {?} month
 * @return {?}
 */
function setJalaliMonth(date, month) {
    month = +month;
    date.year = date.year + Math.floor((month - 1) / 12);
    date.month = Math.floor(((month - 1) % 12 + 12) % 12) + 1;
    return date;
}
/**
 * @param {?} date
 * @param {?} day
 * @return {?}
 */
function setJalaliDay(date, day) {
    /** @type {?} */
    let mDays = getDaysPerMonth(date.month, date.year);
    if (day <= 0) {
        while (day <= 0) {
            date = setJalaliMonth(date, date.month - 1);
            mDays = getDaysPerMonth(date.month, date.year);
            day += mDays;
        }
    }
    else if (day > mDays) {
        while (day > mDays) {
            day -= mDays;
            date = setJalaliMonth(date, date.month + 1);
            mDays = getDaysPerMonth(date.month, date.year);
        }
    }
    date.day = day;
    return date;
}
/**
 * @param {?} a
 * @param {?} b
 * @return {?}
 */
function mod$1(a, b) {
    return a - b * Math.floor(a / b);
}
/**
 * @param {?} a
 * @param {?} b
 * @return {?}
 */
function div(a, b) {
    return Math.trunc(a / b);
}
/**
 * @param {?} jalaliYear
 * @return {?}
 */
function jalCal(jalaliYear) {
    /** @type {?} */
    let breaks = [-61, 9, 38, 199, 426, 686, 756, 818, 1111, 1181, 1210, 1635, 2060, 2097, 2192, 2262, 2324, 2394, 2456, 3178];
    /** @type {?} */
    const breaksLength = breaks.length;
    /** @type {?} */
    const gYear = jalaliYear + 621;
    /** @type {?} */
    let leapJ = -14;
    /** @type {?} */
    let jp = breaks[0];
    if (jalaliYear < jp || jalaliYear >= breaks[breaksLength - 1]) {
        throw new Error('Invalid Jalali year ' + jalaliYear);
    }
    /** @type {?} */
    let jump;
    for (let i = 1; i < breaksLength; i += 1) {
        /** @type {?} */
        const jm = breaks[i];
        jump = jm - jp;
        if (jalaliYear < jm) {
            break;
        }
        leapJ = leapJ + div(jump, 33) * 8 + div(mod$1(jump, 33), 4);
        jp = jm;
    }
    /** @type {?} */
    let n = jalaliYear - jp;
    // Find the number of leap years from AD 621 to the beginning
    // of the current Jalali year in the Persian calendar.
    leapJ = leapJ + div(n, 33) * 8 + div(mod$1(n, 33) + 3, 4);
    if (mod$1(jump, 33) === 4 && jump - n === 4) {
        leapJ += 1;
    }
    /** @type {?} */
    const leapG = div(gYear, 4) - div((div(gYear, 100) + 1) * 3, 4) - 150;
    /** @type {?} */
    const march = 20 + leapJ - leapG;
    // Find how many years have passed since the last leap year.
    if (jump - n < 6) {
        n = n - jump + div(jump + 4, 33) * 33;
    }
    /** @type {?} */
    let leap = mod$1(mod$1(n + 1, 33) - 1, 4);
    if (leap === -1) {
        leap = 4;
    }
    return { leap: leap, gy: gYear, march: march };
}
/**
 * @param {?} julianDayNumber
 * @return {?}
 */
function julianToGregorian(julianDayNumber) {
    /** @type {?} */
    let j = 4 * julianDayNumber + 139361631;
    j = j + div(div(4 * julianDayNumber + 183187720, 146097) * 3, 4) * 4 - 3908;
    /** @type {?} */
    const i = div(mod$1(j, 1461), 4) * 5 + 308;
    /** @type {?} */
    const gDay = div(mod$1(i, 153), 5) + 1;
    /** @type {?} */
    const gMonth = mod$1(div(i, 153), 12) + 1;
    /** @type {?} */
    const gYear = div(j, 1461) - 100100 + div(8 - gMonth, 6);
    return new Date(gYear, gMonth - 1, gDay);
}
/**
 * @param {?} gy
 * @param {?} gm
 * @param {?} gd
 * @return {?}
 */
function gregorianToJulian(gy, gm, gd) {
    /** @type {?} */
    let d = div((gy + div(gm - 8, 6) + 100100) * 1461, 4) + div(153 * mod$1(gm + 9, 12) + 2, 5) + gd - 34840408;
    d = d - div(div(gy + 100100 + div(gm - 8, 6), 100) * 3, 4) + 752;
    return d;
}
/**
 * @param {?} julianDayNumber
 * @return {?}
 */
function julianToJalali(julianDayNumber) {
    /** @type {?} */
    let gy = julianToGregorian(julianDayNumber).getFullYear();
    /** @type {?} */
    let jalaliYear = gy - 621;
    /** @type {?} */
    let r = jalCal(jalaliYear);
    /** @type {?} */
    let gregorianDay = gregorianToJulian(gy, 3, r.march);
    /** @type {?} */
    let jalaliDay;
    /** @type {?} */
    let jalaliMonth;
    /** @type {?} */
    let numberOfDays;
    // Find number of days that passed since 1 Farvardin.
    numberOfDays = julianDayNumber - gregorianDay;
    if (numberOfDays >= 0) {
        if (numberOfDays <= 185) {
            // The first 6 months.
            jalaliMonth = 1 + div(numberOfDays, 31);
            jalaliDay = mod$1(numberOfDays, 31) + 1;
            return new NgbDate(jalaliYear, jalaliMonth, jalaliDay);
        }
        else {
            // The remaining months.
            numberOfDays -= 186;
        }
    }
    else {
        // Previous Jalali year.
        jalaliYear -= 1;
        numberOfDays += 179;
        if (r.leap === 1) {
            numberOfDays += 1;
        }
    }
    jalaliMonth = 7 + div(numberOfDays, 30);
    jalaliDay = mod$1(numberOfDays, 30) + 1;
    return new NgbDate(jalaliYear, jalaliMonth, jalaliDay);
}
/**
 * @param {?} jYear
 * @param {?} jMonth
 * @param {?} jDay
 * @return {?}
 */
function jalaliToJulian(jYear, jMonth, jDay) {
    /** @type {?} */
    let r = jalCal(jYear);
    return gregorianToJulian(r.gy, 3, r.march) + (jMonth - 1) * 31 - div(jMonth, 7) * (jMonth - 7) + jDay - 1;
}
/**
 * Returns the number of days in a specific jalali month.
 * @param {?} month
 * @param {?} year
 * @return {?}
 */
function getDaysPerMonth(month, year) {
    if (month <= 6) {
        return 31;
    }
    if (month <= 11) {
        return 30;
    }
    if (jalCal(year).leap === 0) {
        return 30;
    }
    return 29;
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
class NgbCalendarPersian extends NgbCalendar {
    /**
     * @return {?}
     */
    getDaysPerWeek() { return 7; }
    /**
     * @return {?}
     */
    getMonths() { return [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]; }
    /**
     * @return {?}
     */
    getWeeksPerMonth() { return 6; }
    /**
     * @param {?} date
     * @param {?=} period
     * @param {?=} number
     * @return {?}
     */
    getNext(date, period = 'd', number = 1) {
        date = new NgbDate(date.year, date.month, date.day);
        switch (period) {
            case 'y':
                date = setJalaliYear(date, date.year + number);
                date.month = 1;
                date.day = 1;
                return date;
            case 'm':
                date = setJalaliMonth(date, date.month + number);
                date.day = 1;
                return date;
            case 'd':
                return setJalaliDay(date, date.day + number);
            default:
                return date;
        }
    }
    /**
     * @param {?} date
     * @param {?=} period
     * @param {?=} number
     * @return {?}
     */
    getPrev(date, period = 'd', number = 1) { return this.getNext(date, period, -number); }
    /**
     * @param {?} date
     * @return {?}
     */
    getWeekday(date) {
        /** @type {?} */
        const day = toGregorian(date).getDay();
        // in JS Date Sun=0, in ISO 8601 Sun=7
        return day === 0 ? 7 : day;
    }
    /**
     * @param {?} week
     * @param {?} firstDayOfWeek
     * @return {?}
     */
    getWeekNumber(week, firstDayOfWeek) {
        // in JS Date Sun=0, in ISO 8601 Sun=7
        if (firstDayOfWeek === 7) {
            firstDayOfWeek = 0;
        }
        /** @type {?} */
        const thursdayIndex = (4 + 7 - firstDayOfWeek) % 7;
        /** @type {?} */
        const date = week[thursdayIndex];
        /** @type {?} */
        const jsDate = toGregorian(date);
        jsDate.setDate(jsDate.getDate() + 4 - (jsDate.getDay() || 7));
        /** @type {?} */
        const time = jsDate.getTime();
        /** @type {?} */
        const startDate = toGregorian(new NgbDate(date.year, 1, 1));
        return Math.floor(Math.round((time - startDate.getTime()) / 86400000) / 7) + 1;
    }
    /**
     * @return {?}
     */
    getToday() { return fromGregorian(new Date()); }
    /**
     * @param {?} date
     * @return {?}
     */
    isValid(date) {
        return date && isInteger(date.year) && isInteger(date.month) && isInteger(date.day) &&
            !isNaN(toGregorian(date).getTime());
    }
}
NgbCalendarPersian.decorators = [
    { type: Injectable },
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
/** @type {?} */
const PARTS_PER_HOUR = 1080;
/** @type {?} */
const PARTS_PER_DAY = 24 * PARTS_PER_HOUR;
/** @type {?} */
const PARTS_FRACTIONAL_MONTH = 12 * PARTS_PER_HOUR + 793;
/** @type {?} */
const PARTS_PER_MONTH = 29 * PARTS_PER_DAY + PARTS_FRACTIONAL_MONTH;
/** @type {?} */
const BAHARAD = 11 * PARTS_PER_HOUR + 204;
/** @type {?} */
const HEBREW_DAY_ON_JAN_1_1970 = 2092591;
/** @type {?} */
const GREGORIAN_EPOCH$1 = 1721425.5;
/**
 * @param {?} year
 * @return {?}
 */
function isGregorianLeapYear$1(year) {
    return year % 4 === 0 && year % 100 !== 0 || year % 400 === 0;
}
/**
 * @param {?} year
 * @return {?}
 */
function numberOfFirstDayInYear(year) {
    /** @type {?} */
    let monthsBeforeYear = Math.floor((235 * year - 234) / 19);
    /** @type {?} */
    let fractionalMonthsBeforeYear = monthsBeforeYear * PARTS_FRACTIONAL_MONTH + BAHARAD;
    /** @type {?} */
    let dayNumber = monthsBeforeYear * 29 + Math.floor(fractionalMonthsBeforeYear / PARTS_PER_DAY);
    /** @type {?} */
    let timeOfDay = fractionalMonthsBeforeYear % PARTS_PER_DAY;
    /** @type {?} */
    let dayOfWeek = dayNumber % 7; // 0 == Monday
    if (dayOfWeek === 2 || dayOfWeek === 4 || dayOfWeek === 6) {
        dayNumber++;
        dayOfWeek = dayNumber % 7;
    }
    if (dayOfWeek === 1 && timeOfDay > 15 * PARTS_PER_HOUR + 204 && !isHebrewLeapYear(year)) {
        dayNumber += 2;
    }
    else if (dayOfWeek === 0 && timeOfDay > 21 * PARTS_PER_HOUR + 589 && isHebrewLeapYear(year - 1)) {
        dayNumber++;
    }
    return dayNumber;
}
/**
 * @param {?} month
 * @param {?} year
 * @return {?}
 */
function getDaysInGregorianMonth(month, year) {
    /** @type {?} */
    let days = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    if (isGregorianLeapYear$1(year)) {
        days[1]++;
    }
    return days[month - 1];
}
/**
 * @param {?} year
 * @return {?}
 */
function getHebrewMonths(year) {
    return isHebrewLeapYear(year) ? 13 : 12;
}
/**
 * Returns the number of days in a specific Hebrew year.
 * `year` is any Hebrew year.
 * @param {?} year
 * @return {?}
 */
function getDaysInHebrewYear(year) {
    return numberOfFirstDayInYear(year + 1) - numberOfFirstDayInYear(year);
}
/**
 * @param {?} year
 * @return {?}
 */
function isHebrewLeapYear(year) {
    /** @type {?} */
    let b = (year * 12 + 17) % 19;
    return b >= ((b < 0) ? -7 : 12);
}
/**
 * Returns the number of days in a specific Hebrew month.
 * `month` is 1 for Nisan, 2 for Iyar etc. Note: Hebrew leap year contains 13 months.
 * `year` is any Hebrew year.
 * @param {?} month
 * @param {?} year
 * @return {?}
 */
function getDaysInHebrewMonth(month, year) {
    /** @type {?} */
    let yearLength = numberOfFirstDayInYear(year + 1) - numberOfFirstDayInYear(year);
    /** @type {?} */
    let yearType = (yearLength <= 380 ? yearLength : (yearLength - 30)) - 353;
    /** @type {?} */
    let leapYear = isHebrewLeapYear(year);
    /** @type {?} */
    let daysInMonth = leapYear ? [30, 29, 29, 29, 30, 30, 29, 30, 29, 30, 29, 30, 29] :
        [30, 29, 29, 29, 30, 29, 30, 29, 30, 29, 30, 29];
    if (yearType > 0) {
        daysInMonth[2]++; // Kislev gets an extra day in normal or complete years.
    }
    if (yearType > 1) {
        daysInMonth[1]++; // Heshvan gets an extra day in complete years only.
    }
    return daysInMonth[month - 1];
}
/**
 * @param {?} date
 * @return {?}
 */
function getDayNumberInHebrewYear(date) {
    /** @type {?} */
    let numberOfDay = 0;
    for (let i = 1; i < date.month; i++) {
        numberOfDay += getDaysInHebrewMonth(i, date.year);
    }
    return numberOfDay + date.day;
}
/**
 * @param {?} date
 * @param {?} val
 * @return {?}
 */
function setHebrewMonth(date, val) {
    /** @type {?} */
    let after = val >= 0;
    if (!after) {
        val = -val;
    }
    while (val > 0) {
        if (after) {
            if (val > getHebrewMonths(date.year) - date.month) {
                val -= getHebrewMonths(date.year) - date.month + 1;
                date.year++;
                date.month = 1;
            }
            else {
                date.month += val;
                val = 0;
            }
        }
        else {
            if (val >= date.month) {
                date.year--;
                val -= date.month;
                date.month = getHebrewMonths(date.year);
            }
            else {
                date.month -= val;
                val = 0;
            }
        }
    }
    return date;
}
/**
 * @param {?} date
 * @param {?} val
 * @return {?}
 */
function setHebrewDay(date, val) {
    /** @type {?} */
    let after = val >= 0;
    if (!after) {
        val = -val;
    }
    while (val > 0) {
        if (after) {
            if (val > getDaysInHebrewYear(date.year) - getDayNumberInHebrewYear(date)) {
                val -= getDaysInHebrewYear(date.year) - getDayNumberInHebrewYear(date) + 1;
                date.year++;
                date.month = 1;
                date.day = 1;
            }
            else if (val > getDaysInHebrewMonth(date.month, date.year) - date.day) {
                val -= getDaysInHebrewMonth(date.month, date.year) - date.day + 1;
                date.month++;
                date.day = 1;
            }
            else {
                date.day += val;
                val = 0;
            }
        }
        else {
            if (val >= date.day) {
                val -= date.day;
                date.month--;
                if (date.month === 0) {
                    date.year--;
                    date.month = getHebrewMonths(date.year);
                }
                date.day = getDaysInHebrewMonth(date.month, date.year);
            }
            else {
                date.day -= val;
                val = 0;
            }
        }
    }
    return date;
}
/**
 * Returns the equivalent Hebrew date value for a give input Gregorian date.
 * `gdate` is a JS Date to be converted to Hebrew date.
 * @param {?} gdate
 * @return {?}
 */
function fromGregorian$1(gdate) {
    /** @type {?} */
    const date = new Date(gdate);
    /** @type {?} */
    const gYear = date.getFullYear();
    /** @type {?} */
    const gMonth = date.getMonth();
    /** @type {?} */
    const gDay = date.getDate();
    /** @type {?} */
    let julianDay = GREGORIAN_EPOCH$1 - 1 + 365 * (gYear - 1) + Math.floor((gYear - 1) / 4) -
        Math.floor((gYear - 1) / 100) + Math.floor((gYear - 1) / 400) +
        Math.floor((367 * (gMonth + 1) - 362) / 12 + (gMonth + 1 <= 2 ? 0 : isGregorianLeapYear$1(gYear) ? -1 : -2) + gDay);
    julianDay = Math.floor(julianDay + 0.5);
    /** @type {?} */
    let daysSinceHebEpoch = julianDay - 347997;
    /** @type {?} */
    let monthsSinceHebEpoch = Math.floor(daysSinceHebEpoch * PARTS_PER_DAY / PARTS_PER_MONTH);
    /** @type {?} */
    let hYear = Math.floor((monthsSinceHebEpoch * 19 + 234) / 235) + 1;
    /** @type {?} */
    let firstDayOfThisYear = numberOfFirstDayInYear(hYear);
    /** @type {?} */
    let dayOfYear = daysSinceHebEpoch - firstDayOfThisYear;
    while (dayOfYear < 1) {
        hYear--;
        firstDayOfThisYear = numberOfFirstDayInYear(hYear);
        dayOfYear = daysSinceHebEpoch - firstDayOfThisYear;
    }
    /** @type {?} */
    let hMonth = 1;
    /** @type {?} */
    let hDay = dayOfYear;
    while (hDay > getDaysInHebrewMonth(hMonth, hYear)) {
        hDay -= getDaysInHebrewMonth(hMonth, hYear);
        hMonth++;
    }
    return new NgbDate(hYear, hMonth, hDay);
}
/**
 * Returns the equivalent JS date value for a given Hebrew date.
 * `hebrewDate` is an Hebrew date to be converted to Gregorian.
 * @param {?} hebrewDate
 * @return {?}
 */
function toGregorian$1(hebrewDate) {
    /** @type {?} */
    const hYear = hebrewDate.year;
    /** @type {?} */
    const hMonth = hebrewDate.month;
    /** @type {?} */
    const hDay = hebrewDate.day;
    /** @type {?} */
    let days = numberOfFirstDayInYear(hYear);
    for (let i = 1; i < hMonth; i++) {
        days += getDaysInHebrewMonth(i, hYear);
    }
    days += hDay;
    /** @type {?} */
    let diffDays = days - HEBREW_DAY_ON_JAN_1_1970;
    /** @type {?} */
    let after = diffDays >= 0;
    if (!after) {
        diffDays = -diffDays;
    }
    /** @type {?} */
    let gYear = 1970;
    /** @type {?} */
    let gMonth = 1;
    /** @type {?} */
    let gDay = 1;
    while (diffDays > 0) {
        if (after) {
            if (diffDays >= (isGregorianLeapYear$1(gYear) ? 366 : 365)) {
                diffDays -= isGregorianLeapYear$1(gYear) ? 366 : 365;
                gYear++;
            }
            else if (diffDays >= getDaysInGregorianMonth(gMonth, gYear)) {
                diffDays -= getDaysInGregorianMonth(gMonth, gYear);
                gMonth++;
            }
            else {
                gDay += diffDays;
                diffDays = 0;
            }
        }
        else {
            if (diffDays >= (isGregorianLeapYear$1(gYear - 1) ? 366 : 365)) {
                diffDays -= isGregorianLeapYear$1(gYear - 1) ? 366 : 365;
                gYear--;
            }
            else {
                if (gMonth > 1) {
                    gMonth--;
                }
                else {
                    gMonth = 12;
                    gYear--;
                }
                if (diffDays >= getDaysInGregorianMonth(gMonth, gYear)) {
                    diffDays -= getDaysInGregorianMonth(gMonth, gYear);
                }
                else {
                    gDay = getDaysInGregorianMonth(gMonth, gYear) - diffDays + 1;
                    diffDays = 0;
                }
            }
        }
    }
    return new Date(gYear, gMonth - 1, gDay);
}
/**
 * @param {?} numerals
 * @return {?}
 */
function hebrewNumerals(numerals) {
    if (!numerals) {
        return '';
    }
    /** @type {?} */
    const hArray0_9 = ['', 'א', 'ב', 'ג', 'ד', 'ה', 'ו', 'ז', 'ח', 'ט'];
    /** @type {?} */
    const hArray10_19 = ['י', 'יא‬', 'יב‬', 'יג‬', 'יד‬', 'טו', 'טז‬', 'יז‬', 'יח‬', 'יט‬'];
    /** @type {?} */
    const hArray20_90 = ['', '', 'כ', 'ל', 'מ', 'נ', 'ס', 'ע', 'פ', 'צ'];
    /** @type {?} */
    const hArray100_900 = ['', 'ק', 'ר', 'ש', 'ת', 'תק', 'תר', 'תש', 'תת', 'תתק'];
    /** @type {?} */
    const hArray1000_9000 = ['', 'א', 'ב', 'אב', 'בב', 'ה', 'אה', 'בה', 'אבה', 'בבה'];
    /** @type {?} */
    const geresh = '׳';
    /** @type {?} */
    const gershaim = '״';
    /** @type {?} */
    let mem = 0;
    /** @type {?} */
    let result = [];
    /** @type {?} */
    let step = 0;
    while (numerals > 0) {
        /** @type {?} */
        let m = numerals % 10;
        if (step === 0) {
            mem = m;
        }
        else if (step === 1) {
            if (m !== 1) {
                result.unshift(hArray20_90[m], hArray0_9[mem]);
            }
            else {
                result.unshift(hArray10_19[mem]);
            }
        }
        else if (step === 2) {
            result.unshift(hArray100_900[m]);
        }
        else {
            if (m !== 5) {
                result.unshift(hArray1000_9000[m], geresh, ' ');
            }
            break;
        }
        numerals = Math.floor(numerals / 10);
        if (step === 0 && numerals === 0) {
            result.unshift(hArray0_9[m]);
        }
        step++;
    }
    result = result.join('').split('');
    if (result.length === 1) {
        result.push(geresh);
    }
    else if (result.length > 1) {
        result.splice(result.length - 1, 0, gershaim);
    }
    return result.join('');
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
/**
 * The Hebrew or Jewish calendar is a lunisolar calendar.
 * In Israel, it is used for religious purposes and frequently - as an official calendar for civil purposes.
 *
 * \@since 3.2.0
 */
class NgbCalendarHebrew extends NgbCalendar {
    /**
     * @return {?}
     */
    getDaysPerWeek() { return 7; }
    /**
     * @param {?=} year
     * @return {?}
     */
    getMonths(year) {
        if (year && isHebrewLeapYear(year)) {
            return [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13];
        }
        else {
            return [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
        }
    }
    /**
     * @return {?}
     */
    getWeeksPerMonth() { return 6; }
    /**
     * @param {?} date
     * @return {?}
     */
    isValid(date) {
        /** @type {?} */
        let b = date && isNumber(date.year) && isNumber(date.month) && isNumber(date.day);
        b = b && date.month > 0 && date.month <= (isHebrewLeapYear(date.year) ? 13 : 12);
        b = b && date.day > 0 && date.day <= getDaysInHebrewMonth(date.month, date.year);
        return b && !isNaN(toGregorian$1(date).getTime());
    }
    /**
     * @param {?} date
     * @param {?=} period
     * @param {?=} number
     * @return {?}
     */
    getNext(date, period = 'd', number = 1) {
        date = new NgbDate(date.year, date.month, date.day);
        switch (period) {
            case 'y':
                date.year += number;
                date.month = 1;
                date.day = 1;
                return date;
            case 'm':
                date = setHebrewMonth(date, number);
                date.day = 1;
                return date;
            case 'd':
                return setHebrewDay(date, number);
            default:
                return date;
        }
    }
    /**
     * @param {?} date
     * @param {?=} period
     * @param {?=} number
     * @return {?}
     */
    getPrev(date, period = 'd', number = 1) { return this.getNext(date, period, -number); }
    /**
     * @param {?} date
     * @return {?}
     */
    getWeekday(date) {
        /** @type {?} */
        const day = toGregorian$1(date).getDay();
        // in JS Date Sun=0, in ISO 8601 Sun=7
        return day === 0 ? 7 : day;
    }
    /**
     * @param {?} week
     * @param {?} firstDayOfWeek
     * @return {?}
     */
    getWeekNumber(week, firstDayOfWeek) {
        /** @type {?} */
        const date = week[week.length - 1];
        return Math.ceil(getDayNumberInHebrewYear(date) / 7);
    }
    /**
     * @return {?}
     */
    getToday() { return fromGregorian$1(new Date()); }
}
NgbCalendarHebrew.decorators = [
    { type: Injectable },
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
/** @type {?} */
const WEEKDAYS = ['ב׳', 'ג׳', 'ד׳', 'ה׳', 'ו׳', 'ש׳', 'א׳'];
/** @type {?} */
const MONTHS = ['תשרי', 'חשון', 'כסלו', 'טבת', 'שבט', 'אדר', 'ניסן', 'אייר', 'סיון', 'תמוז', 'אב', 'אלול'];
/** @type {?} */
const MONTHS_LEAP = ['תשרי', 'חשון', 'כסלו', 'טבת', 'שבט', 'אדר א׳', 'אדר ב׳', 'ניסן', 'אייר', 'סיון', 'תמוז', 'אב', 'אלול'];
/**
 * \@since 3.2.0
 */
class NgbDatepickerI18nHebrew extends NgbDatepickerI18n {
    /**
     * @param {?} month
     * @param {?=} year
     * @return {?}
     */
    getMonthShortName(month, year) { return this.getMonthFullName(month, year); }
    /**
     * @param {?} month
     * @param {?=} year
     * @return {?}
     */
    getMonthFullName(month, year) {
        return isHebrewLeapYear(year) ? MONTHS_LEAP[month - 1] : MONTHS[month - 1];
    }
    /**
     * @param {?} weekday
     * @return {?}
     */
    getWeekdayShortName(weekday) { return WEEKDAYS[weekday - 1]; }
    /**
     * @param {?} date
     * @return {?}
     */
    getDayAriaLabel(date) {
        return `${hebrewNumerals(date.day)} ${this.getMonthFullName(date.month, date.year)} ${hebrewNumerals(date.year)}`;
    }
    /**
     * @param {?} date
     * @return {?}
     */
    getDayNumerals(date) { return hebrewNumerals(date.day); }
    /**
     * @param {?} weekNumber
     * @return {?}
     */
    getWeekNumerals(weekNumber) { return hebrewNumerals(weekNumber); }
    /**
     * @param {?} year
     * @return {?}
     */
    getYearNumerals(year) { return hebrewNumerals(year); }
}
NgbDatepickerI18nHebrew.decorators = [
    { type: Injectable },
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
class NgbDateNativeAdapter extends NgbDateAdapter {
    /**
     * @param {?} date
     * @return {?}
     */
    fromModel(date) {
        return (date instanceof Date) ? { year: date.getFullYear(), month: date.getMonth() + 1, day: date.getDate() } : null;
    }
    /**
     * @param {?} date
     * @return {?}
     */
    toModel(date) {
        return date && date.year && date.month ? new Date(date.year, date.month - 1, date.day, 12) : null;
    }
}
NgbDateNativeAdapter.decorators = [
    { type: Injectable },
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
/**
 * \@since 3.2.0
 */
class NgbDateNativeUTCAdapter extends NgbDateAdapter {
    /**
     * @param {?} date
     * @return {?}
     */
    fromModel(date) {
        return (date instanceof Date) ?
            { year: date.getUTCFullYear(), month: date.getUTCMonth() + 1, day: date.getUTCDate() } :
            null;
    }
    /**
     * @param {?} date
     * @return {?}
     */
    toModel(date) {
        return date && date.year && date.month ? new Date(Date.UTC(date.year, date.month - 1, date.day)) : null;
    }
}
NgbDateNativeUTCAdapter.decorators = [
    { type: Injectable },
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
class NgbDatepickerModule {
    /**
     * Importing with '.forRoot()' is no longer necessary, you can simply import the module.
     * Will be removed in 4.0.0.
     *
     * @deprecated 3.0.0
     * @return {?}
     */
    static forRoot() { return { ngModule: NgbDatepickerModule }; }
}
NgbDatepickerModule.decorators = [
    { type: NgModule, args: [{
                declarations: [
                    NgbDatepicker, NgbDatepickerMonthView, NgbDatepickerNavigation, NgbDatepickerNavigationSelect, NgbDatepickerDayView,
                    NgbInputDatepicker
                ],
                exports: [NgbDatepicker, NgbInputDatepicker],
                imports: [CommonModule, FormsModule],
                entryComponents: [NgbDatepicker]
            },] },
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
/**
 * Configuration service for the NgbDropdown directive.
 * You can inject this service, typically in your root component, and customize the values of its properties in
 * order to provide default values for all the dropdowns used in the application.
 */
class NgbDropdownConfig {
    constructor() {
        this.autoClose = true;
        this.placement = 'bottom-left';
    }
}
NgbDropdownConfig.decorators = [
    { type: Injectable, args: [{ providedIn: 'root' },] },
];
/** @nocollapse */ NgbDropdownConfig.ngInjectableDef = defineInjectable({ factory: function NgbDropdownConfig_Factory() { return new NgbDropdownConfig(); }, token: NgbDropdownConfig, providedIn: "root" });

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
/**
 *
 */
class NgbDropdownItem {
    /**
     * @param {?} _elementRef
     */
    constructor(_elementRef) {
        this._elementRef = _elementRef;
        this.dropdownItemEl = _elementRef.nativeElement;
    }
    /**
     * @return {?}
     */
    get disabled() { return this._disabled != null; }
}
NgbDropdownItem.decorators = [
    { type: Directive, args: [{ selector: '.dropdown-item:not(.disabled)' },] },
];
/** @nocollapse */
NgbDropdownItem.ctorParameters = () => [
    { type: ElementRef }
];
NgbDropdownItem.propDecorators = {
    _disabled: [{ type: Input, args: ['disabled',] }]
};
/**
 *
 */
class NgbDropdownMenu {
    /**
     * @param {?} dropdown
     * @param {?} _elementRef
     * @param {?} _renderer
     */
    constructor(dropdown, _elementRef, _renderer) {
        this.dropdown = dropdown;
        this._elementRef = _elementRef;
        this._renderer = _renderer;
        this.placement = 'bottom';
        this.isOpen = false;
    }
    /**
     * @param {?} $event
     * @return {?}
     */
    isEventFrom($event) { return this._elementRef.nativeElement.contains($event.target); }
    /**
     * @param {?} triggerEl
     * @param {?} placement
     * @return {?}
     */
    position(triggerEl, placement) {
        this.applyPlacement(positionElements(triggerEl, this._elementRef.nativeElement, placement));
    }
    /**
     * @param {?} _placement
     * @return {?}
     */
    applyPlacement(_placement) {
        // remove the current placement classes
        this._renderer.removeClass(this._elementRef.nativeElement.parentNode, 'dropup');
        this._renderer.removeClass(this._elementRef.nativeElement.parentNode, 'dropdown');
        this.placement = _placement;
        /**
             * apply the new placement
             * in case of top use up-arrow or down-arrow otherwise
             */
        if (_placement.search('^top') !== -1) {
            this._renderer.addClass(this._elementRef.nativeElement.parentNode, 'dropup');
        }
        else {
            this._renderer.addClass(this._elementRef.nativeElement.parentNode, 'dropdown');
        }
    }
}
NgbDropdownMenu.decorators = [
    { type: Directive, args: [{
                selector: '[ngbDropdownMenu]',
                host: { '[class.dropdown-menu]': 'true', '[class.show]': 'dropdown.isOpen()', '[attr.x-placement]': 'placement' }
            },] },
];
/** @nocollapse */
NgbDropdownMenu.ctorParameters = () => [
    { type: undefined, decorators: [{ type: Inject, args: [forwardRef(() => NgbDropdown),] }] },
    { type: ElementRef },
    { type: Renderer2 }
];
NgbDropdownMenu.propDecorators = {
    menuItems: [{ type: ContentChildren, args: [NgbDropdownItem,] }]
};
/**
 * Marks an element to which dropdown menu will be anchored. This is a simple version
 * of the NgbDropdownToggle directive. It plays the same role as NgbDropdownToggle but
 * doesn't listen to click events to toggle dropdown menu thus enabling support for
 * events other than click.
 *
 * \@since 1.1.0
 */
class NgbDropdownAnchor {
    /**
     * @param {?} dropdown
     * @param {?} _elementRef
     */
    constructor(dropdown, _elementRef) {
        this.dropdown = dropdown;
        this._elementRef = _elementRef;
        this.anchorEl = _elementRef.nativeElement;
    }
    /**
     * @param {?} $event
     * @return {?}
     */
    isEventFrom($event) { return this._elementRef.nativeElement.contains($event.target); }
}
NgbDropdownAnchor.decorators = [
    { type: Directive, args: [{
                selector: '[ngbDropdownAnchor]',
                host: { 'class': 'dropdown-toggle', 'aria-haspopup': 'true', '[attr.aria-expanded]': 'dropdown.isOpen()' }
            },] },
];
/** @nocollapse */
NgbDropdownAnchor.ctorParameters = () => [
    { type: undefined, decorators: [{ type: Inject, args: [forwardRef(() => NgbDropdown),] }] },
    { type: ElementRef }
];
/**
 * Allows the dropdown to be toggled via click. This directive is optional: you can use NgbDropdownAnchor as an
 * alternative.
 */
class NgbDropdownToggle extends NgbDropdownAnchor {
    /**
     * @param {?} dropdown
     * @param {?} elementRef
     */
    constructor(dropdown, elementRef) {
        super(dropdown, elementRef);
    }
    /**
     * @return {?}
     */
    toggleOpen() { this.dropdown.toggle(); }
}
NgbDropdownToggle.decorators = [
    { type: Directive, args: [{
                selector: '[ngbDropdownToggle]',
                host: {
                    'class': 'dropdown-toggle',
                    'aria-haspopup': 'true',
                    '[attr.aria-expanded]': 'dropdown.isOpen()',
                    '(click)': 'toggleOpen()'
                },
                providers: [{ provide: NgbDropdownAnchor, useExisting: forwardRef(() => NgbDropdownToggle) }]
            },] },
];
/** @nocollapse */
NgbDropdownToggle.ctorParameters = () => [
    { type: undefined, decorators: [{ type: Inject, args: [forwardRef(() => NgbDropdown),] }] },
    { type: ElementRef }
];
/**
 * Transforms a node into a dropdown.
 */
class NgbDropdown {
    /**
     * @param {?} _changeDetector
     * @param {?} config
     * @param {?} _document
     * @param {?} _ngZone
     */
    constructor(_changeDetector, config, _document, _ngZone) {
        this._changeDetector = _changeDetector;
        this._document = _document;
        this._ngZone = _ngZone;
        this._closed$ = new Subject();
        /**
         *  Defines whether or not the dropdown-menu is open initially.
         */
        this._open = false;
        /**
         *  An event fired when the dropdown is opened or closed.
         *  Event's payload equals whether dropdown is open.
         */
        this.openChange = new EventEmitter();
        this.placement = config.placement;
        this.autoClose = config.autoClose;
        this._zoneSubscription = _ngZone.onStable.subscribe(() => { this._positionMenu(); });
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        if (this._menu) {
            this._menu.applyPlacement(Array.isArray(this.placement) ? (this.placement[0]) : /** @type {?} */ (this.placement));
        }
        if (this._open) {
            this._setCloseHandlers();
        }
    }
    /**
     * @return {?}
     */
    ngAfterViewInit() { this._setKeyboardHandlers(); }
    /**
     * Checks if the dropdown menu is open or not.
     * @return {?}
     */
    isOpen() { return this._open; }
    /**
     * Opens the dropdown menu of a given navbar or tabbed navigation.
     * @return {?}
     */
    open() {
        if (!this._open) {
            this._open = true;
            this._positionMenu();
            this.openChange.emit(true);
            this._setCloseHandlers();
        }
    }
    /**
     * @return {?}
     */
    _setCloseHandlers() {
        if (this.autoClose) {
            this._ngZone.runOutsideAngular(() => {
                /** @type {?} */
                const escapes$ = fromEvent(this._document, 'keyup')
                    .pipe(takeUntil(this._closed$), filter(event => event.which === Key.Escape));
                /** @type {?} */
                const clicks$ = fromEvent(this._document, 'click')
                    .pipe(takeUntil(this._closed$), filter(event => this._shouldCloseFromClick(event)));
                race([escapes$, clicks$]).pipe(takeUntil(this._closed$)).subscribe(() => this._ngZone.run(() => {
                    this.close();
                    this._changeDetector.markForCheck();
                }));
            });
        }
    }
    /**
     * Closes the dropdown menu of a given navbar or tabbed navigation.
     * @return {?}
     */
    close() {
        if (this._open) {
            this._open = false;
            this._closed$.next();
            this.openChange.emit(false);
        }
    }
    /**
     * Toggles the dropdown menu of a given navbar or tabbed navigation.
     * @return {?}
     */
    toggle() {
        if (this.isOpen()) {
            this.close();
        }
        else {
            this.open();
        }
    }
    /**
     * @param {?} event
     * @return {?}
     */
    _shouldCloseFromClick(event) {
        if (event.button !== 2 && !this._isEventFromToggle(event)) {
            if (this.autoClose === true) {
                return true;
            }
            else if (this.autoClose === 'inside' && this._isEventFromMenu(event)) {
                return true;
            }
            else if (this.autoClose === 'outside' && !this._isEventFromMenu(event)) {
                return true;
            }
        }
        return false;
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        this._closed$.next();
        this._zoneSubscription.unsubscribe();
    }
    /**
     * @param {?} $event
     * @return {?}
     */
    _isEventFromToggle($event) { return this._anchor.isEventFrom($event); }
    /**
     * @param {?} $event
     * @return {?}
     */
    _isEventFromMenu($event) { return this._menu ? this._menu.isEventFrom($event) : false; }
    /**
     * @return {?}
     */
    _positionMenu() {
        if (this.isOpen() && this._menu) {
            this._menu.position(this._anchor.anchorEl, this.placement);
        }
    }
    /**
     * @return {?}
     */
    _setKeyboardHandlers() {
        /** @type {?} */
        const listeners = [];
        if (this._anchor) {
            /** @type {?} */
            const anchor$ = fromEvent(this._anchor.anchorEl, 'keydown').pipe(filter(filterKeyboardEvents));
            listeners.push(anchor$);
        }
        if (this._menu) {
            /** @type {?} */
            const items$ = merge(...this._menu.menuItems.map(item => fromEvent(item.dropdownItemEl, 'keydown')))
                .pipe(filter(filterKeyboardEvents));
            listeners.push(items$);
        }
        merge(...listeners).subscribe(this.onKeyDown.bind(this));
    }
    /**
     * @param {?} event
     * @return {?}
     */
    onKeyDown(event) {
        if (!this.isOpen()) {
            this.open();
        }
        /** @type {?} */
        const list = this._getMenuElements();
        if (list.length === 0) {
            return;
        }
        /** @type {?} */
        let position = list.findIndex(element => element === this._document.activeElement);
        switch (event.which) {
            case Key.ArrowDown:
                position = Math.min(position + 1, list.length - 1);
                break;
            case Key.ArrowUp:
                position = Math.max(position - 1, 0);
                break;
            case Key.Home:
                position = 0;
                break;
            case Key.End:
                position = list.length - 1;
                break;
        }
        /** @type {?} */
        const elm = list[position];
        elm.focus();
        event.preventDefault();
    }
    /**
     * @return {?}
     */
    _getMenuElements() {
        if (this._menu == null) {
            return [];
        }
        return this._menu.menuItems.filter(item => !item.disabled).map(item => item.dropdownItemEl);
    }
}
NgbDropdown.decorators = [
    { type: Directive, args: [{ selector: '[ngbDropdown]', exportAs: 'ngbDropdown', host: { '[class.show]': 'isOpen()' } },] },
];
/** @nocollapse */
NgbDropdown.ctorParameters = () => [
    { type: ChangeDetectorRef },
    { type: NgbDropdownConfig },
    { type: undefined, decorators: [{ type: Inject, args: [DOCUMENT,] }] },
    { type: NgZone }
];
NgbDropdown.propDecorators = {
    _menu: [{ type: ContentChild, args: [NgbDropdownMenu,] }],
    _menuElementRef: [{ type: ContentChild, args: [NgbDropdownMenu, { read: ElementRef },] }],
    _anchor: [{ type: ContentChild, args: [NgbDropdownAnchor,] }],
    autoClose: [{ type: Input }],
    _open: [{ type: Input, args: ['open',] }],
    placement: [{ type: Input }],
    openChange: [{ type: Output }]
};
/**
 * @param {?} event
 * @return {?}
 */
function filterKeyboardEvents(event) {
    return event.which === Key.ArrowDown || event.which === Key.ArrowUp || event.which === Key.Home ||
        event.which === Key.End;
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
/** @type {?} */
const NGB_DROPDOWN_DIRECTIVES = [NgbDropdown, NgbDropdownAnchor, NgbDropdownToggle, NgbDropdownMenu, NgbDropdownItem];
class NgbDropdownModule {
    /**
     * Importing with '.forRoot()' is no longer necessary, you can simply import the module.
     * Will be removed in 4.0.0.
     *
     * @deprecated 3.0.0
     * @return {?}
     */
    static forRoot() { return { ngModule: NgbDropdownModule }; }
}
NgbDropdownModule.decorators = [
    { type: NgModule, args: [{ declarations: NGB_DROPDOWN_DIRECTIVES, exports: NGB_DROPDOWN_DIRECTIVES },] },
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
class NgbModalBackdrop {
}
NgbModalBackdrop.decorators = [
    { type: Component, args: [{
                selector: 'ngb-modal-backdrop',
                template: '',
                host: { '[class]': '"modal-backdrop fade show" + (backdropClass ? " " + backdropClass : "")', 'style': 'z-index: 1050' }
            },] },
];
NgbModalBackdrop.propDecorators = {
    backdropClass: [{ type: Input }]
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
/** @enum {number} */
const ModalDismissReasons = {
    BACKDROP_CLICK: 0,
    ESC: 1,
};
ModalDismissReasons[ModalDismissReasons.BACKDROP_CLICK] = 'BACKDROP_CLICK';
ModalDismissReasons[ModalDismissReasons.ESC] = 'ESC';

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
class NgbModalWindow {
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

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
/**
 * Configuration object token for the NgbModal service.
 * You can provide this configuration, typically in your root module in order to provide default option values for every
 * modal.
 *
 * \@since 3.1.0
 */
class NgbModalConfig {
    constructor() {
        this.backdrop = true;
        this.keyboard = true;
    }
}
NgbModalConfig.decorators = [
    { type: Injectable, args: [{ providedIn: 'root' },] },
];
/** @nocollapse */ NgbModalConfig.ngInjectableDef = defineInjectable({ factory: function NgbModalConfig_Factory() { return new NgbModalConfig(); }, token: NgbModalConfig, providedIn: "root" });

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
class ContentRef {
    /**
     * @param {?} nodes
     * @param {?=} viewRef
     * @param {?=} componentRef
     */
    constructor(nodes, viewRef, componentRef) {
        this.nodes = nodes;
        this.viewRef = viewRef;
        this.componentRef = componentRef;
    }
}
/**
 * @template T
 */
class PopupService {
    /**
     * @param {?} _type
     * @param {?} _injector
     * @param {?} _viewContainerRef
     * @param {?} _renderer
     * @param {?} _componentFactoryResolver
     */
    constructor(_type, _injector, _viewContainerRef, _renderer, _componentFactoryResolver) {
        this._type = _type;
        this._injector = _injector;
        this._viewContainerRef = _viewContainerRef;
        this._renderer = _renderer;
        this._componentFactoryResolver = _componentFactoryResolver;
    }
    /**
     * @param {?=} content
     * @param {?=} context
     * @return {?}
     */
    open(content, context) {
        if (!this._windowRef) {
            this._contentRef = this._getContentRef(content, context);
            this._windowRef = this._viewContainerRef.createComponent(this._componentFactoryResolver.resolveComponentFactory(this._type), 0, this._injector, this._contentRef.nodes);
        }
        return this._windowRef;
    }
    /**
     * @return {?}
     */
    close() {
        if (this._windowRef) {
            this._viewContainerRef.remove(this._viewContainerRef.indexOf(this._windowRef.hostView));
            this._windowRef = null;
            if (this._contentRef.viewRef) {
                this._viewContainerRef.remove(this._viewContainerRef.indexOf(this._contentRef.viewRef));
                this._contentRef = null;
            }
        }
    }
    /**
     * @param {?} content
     * @param {?=} context
     * @return {?}
     */
    _getContentRef(content, context) {
        if (!content) {
            return new ContentRef([]);
        }
        else if (content instanceof TemplateRef) {
            /** @type {?} */
            const viewRef = this._viewContainerRef.createEmbeddedView(/** @type {?} */ (content), context);
            return new ContentRef([viewRef.rootNodes], viewRef);
        }
        else {
            return new ContentRef([[this._renderer.createText(`${content}`)]]);
        }
    }
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
/** @type {?} */
const noop = () => { };
/**
 * Utility to handle the scrollbar.
 *
 * It allows to compensate the lack of a vertical scrollbar by adding an
 * equivalent padding on the right of the body, and to remove this compensation.
 */
class ScrollBar {
    /**
     * @param {?} _document
     */
    constructor(_document) {
        this._document = _document;
    }
    /**
     * Detects if a scrollbar is present and if yes, already compensates for its
     * removal by adding an equivalent padding on the right of the body.
     *
     * @return {?} a callback used to revert the compensation (noop if there was none,
     * otherwise a function removing the padding)
     */
    compensate() { return !this._isPresent() ? noop : this._adjustBody(this._getWidth()); }
    /**
     * Adds a padding of the given width on the right of the body.
     *
     * @param {?} width
     * @return {?} a callback used to revert the padding to its previous value
     */
    _adjustBody(width) {
        /** @type {?} */
        const body = this._document.body;
        /** @type {?} */
        const userSetPadding = body.style.paddingRight;
        /** @type {?} */
        const paddingAmount = parseFloat(window.getComputedStyle(body)['padding-right']);
        body.style['padding-right'] = `${paddingAmount + width}px`;
        return () => body.style['padding-right'] = userSetPadding;
    }
    /**
     * Tells whether a scrollbar is currently present on the body.
     *
     * @return {?} true if scrollbar is present, false otherwise
     */
    _isPresent() {
        /** @type {?} */
        const rect = this._document.body.getBoundingClientRect();
        return rect.left + rect.right < window.innerWidth;
    }
    /**
     * Calculates and returns the width of a scrollbar.
     *
     * @return {?} the width of a scrollbar on this page
     */
    _getWidth() {
        /** @type {?} */
        const measurer = this._document.createElement('div');
        measurer.className = 'modal-scrollbar-measure';
        /** @type {?} */
        const body = this._document.body;
        body.appendChild(measurer);
        /** @type {?} */
        const width = measurer.getBoundingClientRect().width - measurer.clientWidth;
        body.removeChild(measurer);
        return width;
    }
}
ScrollBar.decorators = [
    { type: Injectable, args: [{ providedIn: 'root' },] },
];
/** @nocollapse */
ScrollBar.ctorParameters = () => [
    { type: undefined, decorators: [{ type: Inject, args: [DOCUMENT,] }] }
];
/** @nocollapse */ ScrollBar.ngInjectableDef = defineInjectable({ factory: function ScrollBar_Factory() { return new ScrollBar(inject(DOCUMENT)); }, token: ScrollBar, providedIn: "root" });

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
/**
 * A reference to an active (currently opened) modal. Instances of this class
 * can be injected into components passed as modal content.
 */
class NgbActiveModal {
    /**
     * Can be used to close a modal, passing an optional result.
     * @param {?=} result
     * @return {?}
     */
    close(result) { }
    /**
     * Can be used to dismiss a modal, passing an optional reason.
     * @param {?=} reason
     * @return {?}
     */
    dismiss(reason) { }
}
/**
 * A reference to a newly opened modal.
 */
class NgbModalRef {
    /**
     * @param {?} _windowCmptRef
     * @param {?} _contentRef
     * @param {?=} _backdropCmptRef
     * @param {?=} _beforeDismiss
     */
    constructor(_windowCmptRef, _contentRef, _backdropCmptRef, _beforeDismiss) {
        this._windowCmptRef = _windowCmptRef;
        this._contentRef = _contentRef;
        this._backdropCmptRef = _backdropCmptRef;
        this._beforeDismiss = _beforeDismiss;
        _windowCmptRef.instance.dismissEvent.subscribe((reason) => { this.dismiss(reason); });
        this.result = new Promise((resolve, reject) => {
            this._resolve = resolve;
            this._reject = reject;
        });
        this.result.then(null, () => { });
    }
    /**
     * The instance of component used as modal's content.
     * Undefined when a TemplateRef is used as modal's content.
     * @return {?}
     */
    get componentInstance() {
        if (this._contentRef.componentRef) {
            return this._contentRef.componentRef.instance;
        }
    }
    /**
     * Can be used to close a modal, passing an optional result.
     * @param {?=} result
     * @return {?}
     */
    close(result) {
        if (this._windowCmptRef) {
            this._resolve(result);
            this._removeModalElements();
        }
    }
    /**
     * @param {?=} reason
     * @return {?}
     */
    _dismiss(reason) {
        this._reject(reason);
        this._removeModalElements();
    }
    /**
     * Can be used to dismiss a modal, passing an optional reason.
     * @param {?=} reason
     * @return {?}
     */
    dismiss(reason) {
        if (this._windowCmptRef) {
            if (!this._beforeDismiss) {
                this._dismiss(reason);
            }
            else {
                /** @type {?} */
                const dismiss = this._beforeDismiss();
                if (dismiss && dismiss.then) {
                    dismiss.then(result => {
                        if (result !== false) {
                            this._dismiss(reason);
                        }
                    }, () => { });
                }
                else if (dismiss !== false) {
                    this._dismiss(reason);
                }
            }
        }
    }
    /**
     * @return {?}
     */
    _removeModalElements() {
        /** @type {?} */
        const windowNativeEl = this._windowCmptRef.location.nativeElement;
        windowNativeEl.parentNode.removeChild(windowNativeEl);
        this._windowCmptRef.destroy();
        if (this._backdropCmptRef) {
            /** @type {?} */
            const backdropNativeEl = this._backdropCmptRef.location.nativeElement;
            backdropNativeEl.parentNode.removeChild(backdropNativeEl);
            this._backdropCmptRef.destroy();
        }
        if (this._contentRef && this._contentRef.viewRef) {
            this._contentRef.viewRef.destroy();
        }
        this._windowCmptRef = null;
        this._backdropCmptRef = null;
        this._contentRef = null;
    }
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
class NgbModalStack {
    /**
     * @param {?} _applicationRef
     * @param {?} _injector
     * @param {?} _document
     * @param {?} _scrollBar
     * @param {?} _rendererFactory
     */
    constructor(_applicationRef, _injector, _document, _scrollBar, _rendererFactory) {
        this._applicationRef = _applicationRef;
        this._injector = _injector;
        this._document = _document;
        this._scrollBar = _scrollBar;
        this._rendererFactory = _rendererFactory;
        this._windowAttributes = ['ariaLabelledBy', 'backdrop', 'centered', 'keyboard', 'size', 'windowClass'];
        this._backdropAttributes = ['backdropClass'];
        this._modalRefs = [];
        this._windowCmpts = [];
        this._activeWindowCmptHasChanged = new Subject();
        // Trap focus on active WindowCmpt
        this._activeWindowCmptHasChanged.subscribe(() => {
            if (this._windowCmpts.length) {
                /** @type {?} */
                const activeWindowCmpt = this._windowCmpts[this._windowCmpts.length - 1];
                ngbFocusTrap(activeWindowCmpt.location.nativeElement, this._activeWindowCmptHasChanged);
            }
        });
    }
    /**
     * @param {?} moduleCFR
     * @param {?} contentInjector
     * @param {?} content
     * @param {?} options
     * @return {?}
     */
    open(moduleCFR, contentInjector, content, options) {
        /** @type {?} */
        const containerEl = isDefined(options.container) ? this._document.querySelector(options.container) : this._document.body;
        /** @type {?} */
        const renderer = this._rendererFactory.createRenderer(null, null);
        /** @type {?} */
        const revertPaddingForScrollBar = this._scrollBar.compensate();
        /** @type {?} */
        const removeBodyClass = () => {
            if (!this._modalRefs.length) {
                renderer.removeClass(this._document.body, 'modal-open');
            }
        };
        if (!containerEl) {
            throw new Error(`The specified modal container "${options.container || 'body'}" was not found in the DOM.`);
        }
        /** @type {?} */
        const activeModal = new NgbActiveModal();
        /** @type {?} */
        const contentRef = this._getContentRef(moduleCFR, options.injector || contentInjector, content, activeModal);
        /** @type {?} */
        let backdropCmptRef = options.backdrop !== false ? this._attachBackdrop(moduleCFR, containerEl) : null;
        /** @type {?} */
        let windowCmptRef = this._attachWindowComponent(moduleCFR, containerEl, contentRef);
        /** @type {?} */
        let ngbModalRef = new NgbModalRef(windowCmptRef, contentRef, backdropCmptRef, options.beforeDismiss);
        this._registerModalRef(ngbModalRef);
        this._registerWindowCmpt(windowCmptRef);
        ngbModalRef.result.then(revertPaddingForScrollBar, revertPaddingForScrollBar);
        ngbModalRef.result.then(removeBodyClass, removeBodyClass);
        activeModal.close = (result) => { ngbModalRef.close(result); };
        activeModal.dismiss = (reason) => { ngbModalRef.dismiss(reason); };
        this._applyWindowOptions(windowCmptRef.instance, options);
        if (this._modalRefs.length === 1) {
            renderer.addClass(this._document.body, 'modal-open');
        }
        if (backdropCmptRef && backdropCmptRef.instance) {
            this._applyBackdropOptions(backdropCmptRef.instance, options);
        }
        return ngbModalRef;
    }
    /**
     * @param {?=} reason
     * @return {?}
     */
    dismissAll(reason) { this._modalRefs.forEach(ngbModalRef => ngbModalRef.dismiss(reason)); }
    /**
     * @param {?} moduleCFR
     * @param {?} containerEl
     * @return {?}
     */
    _attachBackdrop(moduleCFR, containerEl) {
        /** @type {?} */
        let backdropFactory = moduleCFR.resolveComponentFactory(NgbModalBackdrop);
        /** @type {?} */
        let backdropCmptRef = backdropFactory.create(this._injector);
        this._applicationRef.attachView(backdropCmptRef.hostView);
        containerEl.appendChild(backdropCmptRef.location.nativeElement);
        return backdropCmptRef;
    }
    /**
     * @param {?} moduleCFR
     * @param {?} containerEl
     * @param {?} contentRef
     * @return {?}
     */
    _attachWindowComponent(moduleCFR, containerEl, contentRef) {
        /** @type {?} */
        let windowFactory = moduleCFR.resolveComponentFactory(NgbModalWindow);
        /** @type {?} */
        let windowCmptRef = windowFactory.create(this._injector, contentRef.nodes);
        this._applicationRef.attachView(windowCmptRef.hostView);
        containerEl.appendChild(windowCmptRef.location.nativeElement);
        return windowCmptRef;
    }
    /**
     * @param {?} windowInstance
     * @param {?} options
     * @return {?}
     */
    _applyWindowOptions(windowInstance, options) {
        this._windowAttributes.forEach((optionName) => {
            if (isDefined(options[optionName])) {
                windowInstance[optionName] = options[optionName];
            }
        });
    }
    /**
     * @param {?} backdropInstance
     * @param {?} options
     * @return {?}
     */
    _applyBackdropOptions(backdropInstance, options) {
        this._backdropAttributes.forEach((optionName) => {
            if (isDefined(options[optionName])) {
                backdropInstance[optionName] = options[optionName];
            }
        });
    }
    /**
     * @param {?} moduleCFR
     * @param {?} contentInjector
     * @param {?} content
     * @param {?} activeModal
     * @return {?}
     */
    _getContentRef(moduleCFR, contentInjector, content, activeModal) {
        if (!content) {
            return new ContentRef([]);
        }
        else if (content instanceof TemplateRef) {
            return this._createFromTemplateRef(content, activeModal);
        }
        else if (isString(content)) {
            return this._createFromString(content);
        }
        else {
            return this._createFromComponent(moduleCFR, contentInjector, content, activeModal);
        }
    }
    /**
     * @param {?} content
     * @param {?} activeModal
     * @return {?}
     */
    _createFromTemplateRef(content, activeModal) {
        /** @type {?} */
        const context = {
            $implicit: activeModal,
            /**
             * @param {?} result
             * @return {?}
             */
            close(result) { activeModal.close(result); },
            /**
             * @param {?} reason
             * @return {?}
             */
            dismiss(reason) { activeModal.dismiss(reason); }
        };
        /** @type {?} */
        const viewRef = content.createEmbeddedView(context);
        this._applicationRef.attachView(viewRef);
        return new ContentRef([viewRef.rootNodes], viewRef);
    }
    /**
     * @param {?} content
     * @return {?}
     */
    _createFromString(content) {
        /** @type {?} */
        const component = this._document.createTextNode(`${content}`);
        return new ContentRef([[component]]);
    }
    /**
     * @param {?} moduleCFR
     * @param {?} contentInjector
     * @param {?} content
     * @param {?} context
     * @return {?}
     */
    _createFromComponent(moduleCFR, contentInjector, content, context) {
        /** @type {?} */
        const contentCmptFactory = moduleCFR.resolveComponentFactory(content);
        /** @type {?} */
        const modalContentInjector = Injector.create({ providers: [{ provide: NgbActiveModal, useValue: context }], parent: contentInjector });
        /** @type {?} */
        const componentRef = contentCmptFactory.create(modalContentInjector);
        this._applicationRef.attachView(componentRef.hostView);
        return new ContentRef([[componentRef.location.nativeElement]], componentRef.hostView, componentRef);
    }
    /**
     * @param {?} ngbModalRef
     * @return {?}
     */
    _registerModalRef(ngbModalRef) {
        /** @type {?} */
        const unregisterModalRef = () => {
            /** @type {?} */
            const index = this._modalRefs.indexOf(ngbModalRef);
            if (index > -1) {
                this._modalRefs.splice(index, 1);
            }
        };
        this._modalRefs.push(ngbModalRef);
        ngbModalRef.result.then(unregisterModalRef, unregisterModalRef);
    }
    /**
     * @param {?} ngbWindowCmpt
     * @return {?}
     */
    _registerWindowCmpt(ngbWindowCmpt) {
        this._windowCmpts.push(ngbWindowCmpt);
        this._activeWindowCmptHasChanged.next();
        ngbWindowCmpt.onDestroy(() => {
            /** @type {?} */
            const index = this._windowCmpts.indexOf(ngbWindowCmpt);
            if (index > -1) {
                this._windowCmpts.splice(index, 1);
                this._activeWindowCmptHasChanged.next();
            }
        });
    }
}
NgbModalStack.decorators = [
    { type: Injectable, args: [{ providedIn: 'root' },] },
];
/** @nocollapse */
NgbModalStack.ctorParameters = () => [
    { type: ApplicationRef },
    { type: Injector },
    { type: undefined, decorators: [{ type: Inject, args: [DOCUMENT,] }] },
    { type: ScrollBar },
    { type: RendererFactory2 }
];
/** @nocollapse */ NgbModalStack.ngInjectableDef = defineInjectable({ factory: function NgbModalStack_Factory() { return new NgbModalStack(inject(ApplicationRef), inject(INJECTOR), inject(DOCUMENT), inject(ScrollBar), inject(RendererFactory2)); }, token: NgbModalStack, providedIn: "root" });

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
/**
 * A service to open modal windows. Creating a modal is straightforward: create a template and pass it as an argument to
 * the "open" method!
 */
class NgbModal {
    /**
     * @param {?} _moduleCFR
     * @param {?} _injector
     * @param {?} _modalStack
     * @param {?} _config
     */
    constructor(_moduleCFR, _injector, _modalStack, _config) {
        this._moduleCFR = _moduleCFR;
        this._injector = _injector;
        this._modalStack = _modalStack;
        this._config = _config;
    }
    /**
     * Opens a new modal window with the specified content and using supplied options. Content can be provided
     * as a TemplateRef or a component type. If you pass a component type as content than instances of those
     * components can be injected with an instance of the NgbActiveModal class. You can use methods on the
     * NgbActiveModal class to close / dismiss modals from "inside" of a component.
     * @param {?} content
     * @param {?=} options
     * @return {?}
     */
    open(content, options = {}) {
        /** @type {?} */
        const combinedOptions = Object.assign({}, this._config, options);
        return this._modalStack.open(this._moduleCFR, this._injector, content, combinedOptions);
    }
    /**
     * Dismiss all currently displayed modal windows with the supplied reason.
     *
     * \@since 3.1.0
     * @param {?=} reason
     * @return {?}
     */
    dismissAll(reason) { this._modalStack.dismissAll(reason); }
}
NgbModal.decorators = [
    { type: Injectable, args: [{ providedIn: 'root' },] },
];
/** @nocollapse */
NgbModal.ctorParameters = () => [
    { type: ComponentFactoryResolver },
    { type: Injector },
    { type: NgbModalStack },
    { type: NgbModalConfig }
];
/** @nocollapse */ NgbModal.ngInjectableDef = defineInjectable({ factory: function NgbModal_Factory() { return new NgbModal(inject(ComponentFactoryResolver), inject(INJECTOR), inject(NgbModalStack), inject(NgbModalConfig)); }, token: NgbModal, providedIn: "root" });

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
class NgbModalModule {
    /**
     * Importing with '.forRoot()' is no longer necessary, you can simply import the module.
     * Will be removed in 4.0.0.
     *
     * @deprecated 3.0.0
     * @return {?}
     */
    static forRoot() { return { ngModule: NgbModalModule }; }
}
NgbModalModule.decorators = [
    { type: NgModule, args: [{
                declarations: [NgbModalBackdrop, NgbModalWindow],
                entryComponents: [NgbModalBackdrop, NgbModalWindow],
                providers: [NgbModal]
            },] },
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
/**
 * Configuration service for the NgbPagination component.
 * You can inject this service, typically in your root component, and customize the values of its properties in
 * order to provide default values for all the paginations used in the application.
 */
class NgbPaginationConfig {
    constructor() {
        this.disabled = false;
        this.boundaryLinks = false;
        this.directionLinks = true;
        this.ellipses = true;
        this.maxSize = 0;
        this.pageSize = 10;
        this.rotate = false;
    }
}
NgbPaginationConfig.decorators = [
    { type: Injectable, args: [{ providedIn: 'root' },] },
];
/** @nocollapse */ NgbPaginationConfig.ngInjectableDef = defineInjectable({ factory: function NgbPaginationConfig_Factory() { return new NgbPaginationConfig(); }, token: NgbPaginationConfig, providedIn: "root" });

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
/**
 * A directive that will take care of visualising a pagination bar and enable / disable buttons correctly!
 */
class NgbPagination {
    /**
     * @param {?} config
     */
    constructor(config) {
        this.pageCount = 0;
        this.pages = [];
        /**
         *  Current page. Page numbers start with 1
         */
        this.page = 1;
        /**
         *  An event fired when the page is changed.
         *  Event's payload equals to the newly selected page.
         *  Will fire only if collection size is set and all values are valid.
         *  Page numbers start with 1
         */
        this.pageChange = new EventEmitter(true);
        this.disabled = config.disabled;
        this.boundaryLinks = config.boundaryLinks;
        this.directionLinks = config.directionLinks;
        this.ellipses = config.ellipses;
        this.maxSize = config.maxSize;
        this.pageSize = config.pageSize;
        this.rotate = config.rotate;
        this.size = config.size;
    }
    /**
     * @return {?}
     */
    hasPrevious() { return this.page > 1; }
    /**
     * @return {?}
     */
    hasNext() { return this.page < this.pageCount; }
    /**
     * @param {?} pageNumber
     * @return {?}
     */
    selectPage(pageNumber) { this._updatePages(pageNumber); }
    /**
     * @param {?} changes
     * @return {?}
     */
    ngOnChanges(changes) { this._updatePages(this.page); }
    /**
     * @param {?} pageNumber
     * @return {?}
     */
    isEllipsis(pageNumber) { return pageNumber === -1; }
    /**
     * Appends ellipses and first/last page number to the displayed pages
     * @param {?} start
     * @param {?} end
     * @return {?}
     */
    _applyEllipses(start, end) {
        if (this.ellipses) {
            if (start > 0) {
                if (start > 1) {
                    this.pages.unshift(-1);
                }
                this.pages.unshift(1);
            }
            if (end < this.pageCount) {
                if (end < (this.pageCount - 1)) {
                    this.pages.push(-1);
                }
                this.pages.push(this.pageCount);
            }
        }
    }
    /**
     * Rotates page numbers based on maxSize items visible.
     * Currently selected page stays in the middle:
     *
     * Ex. for selected page = 6:
     * [5,*6*,7] for maxSize = 3
     * [4,5,*6*,7] for maxSize = 4
     * @return {?}
     */
    _applyRotation() {
        /** @type {?} */
        let start = 0;
        /** @type {?} */
        let end = this.pageCount;
        /** @type {?} */
        let leftOffset = Math.floor(this.maxSize / 2);
        /** @type {?} */
        let rightOffset = this.maxSize % 2 === 0 ? leftOffset - 1 : leftOffset;
        if (this.page <= leftOffset) {
            // very beginning, no rotation -> [0..maxSize]
            end = this.maxSize;
        }
        else if (this.pageCount - this.page < leftOffset) {
            // very end, no rotation -> [len-maxSize..len]
            start = this.pageCount - this.maxSize;
        }
        else {
            // rotate
            start = this.page - leftOffset - 1;
            end = this.page + rightOffset;
        }
        return [start, end];
    }
    /**
     * Paginates page numbers based on maxSize items per page
     * @return {?}
     */
    _applyPagination() {
        /** @type {?} */
        let page = Math.ceil(this.page / this.maxSize) - 1;
        /** @type {?} */
        let start = page * this.maxSize;
        /** @type {?} */
        let end = start + this.maxSize;
        return [start, end];
    }
    /**
     * @param {?} newPageNo
     * @return {?}
     */
    _setPageInRange(newPageNo) {
        /** @type {?} */
        const prevPageNo = this.page;
        this.page = getValueInRange(newPageNo, this.pageCount, 1);
        if (this.page !== prevPageNo && isNumber(this.collectionSize)) {
            this.pageChange.emit(this.page);
        }
    }
    /**
     * @param {?} newPage
     * @return {?}
     */
    _updatePages(newPage) {
        this.pageCount = Math.ceil(this.collectionSize / this.pageSize);
        if (!isNumber(this.pageCount)) {
            this.pageCount = 0;
        }
        // fill-in model needed to render pages
        this.pages.length = 0;
        for (let i = 1; i <= this.pageCount; i++) {
            this.pages.push(i);
        }
        // set page within 1..max range
        this._setPageInRange(newPage);
        // apply maxSize if necessary
        if (this.maxSize > 0 && this.pageCount > this.maxSize) {
            /** @type {?} */
            let start = 0;
            /** @type {?} */
            let end = this.pageCount;
            // either paginating or rotating page numbers
            if (this.rotate) {
                [start, end] = this._applyRotation();
            }
            else {
                [start, end] = this._applyPagination();
            }
            this.pages = this.pages.slice(start, end);
            // adding ellipses
            this._applyEllipses(start, end);
        }
    }
}
NgbPagination.decorators = [
    { type: Component, args: [{
                selector: 'ngb-pagination',
                changeDetection: ChangeDetectionStrategy.OnPush,
                host: { 'role': 'navigation' },
                template: `
    <ul [class]="'pagination' + (size ? ' pagination-' + size : '')">
      <li *ngIf="boundaryLinks" class="page-item"
        [class.disabled]="!hasPrevious() || disabled">
        <a aria-label="First" i18n-aria-label="@@ngb.pagination.first-aria" class="page-link" href
          (click)="!!selectPage(1)" [attr.tabindex]="(hasPrevious() ? null : '-1')">
          <span aria-hidden="true" i18n="@@ngb.pagination.first">&laquo;&laquo;</span>
        </a>
      </li>

      <li *ngIf="directionLinks" class="page-item"
        [class.disabled]="!hasPrevious() || disabled">
        <a aria-label="Previous" i18n-aria-label="@@ngb.pagination.previous-aria" class="page-link" href
          (click)="!!selectPage(page-1)" [attr.tabindex]="(hasPrevious() ? null : '-1')">
          <span aria-hidden="true" i18n="@@ngb.pagination.previous">&laquo;</span>
        </a>
      </li>
      <li *ngFor="let pageNumber of pages" class="page-item" [class.active]="pageNumber === page"
        [class.disabled]="isEllipsis(pageNumber) || disabled">
        <a *ngIf="isEllipsis(pageNumber)" class="page-link">...</a>
        <a *ngIf="!isEllipsis(pageNumber)" class="page-link" href (click)="!!selectPage(pageNumber)">
          {{pageNumber}}
          <span *ngIf="pageNumber === page" class="sr-only">(current)</span>
        </a>
      </li>
      <li *ngIf="directionLinks" class="page-item" [class.disabled]="!hasNext() || disabled">
        <a aria-label="Next" i18n-aria-label="@@ngb.pagination.next-aria" class="page-link" href
          (click)="!!selectPage(page+1)" [attr.tabindex]="(hasNext() ? null : '-1')">
          <span aria-hidden="true" i18n="@@ngb.pagination.next">&raquo;</span>
        </a>
      </li>

      <li *ngIf="boundaryLinks" class="page-item" [class.disabled]="!hasNext() || disabled">
        <a aria-label="Last" i18n-aria-label="@@ngb.pagination.last-aria" class="page-link" href
          (click)="!!selectPage(pageCount)" [attr.tabindex]="(hasNext() ? null : '-1')">
          <span aria-hidden="true" i18n="@@ngb.pagination.last">&raquo;&raquo;</span>
        </a>
      </li>
    </ul>
  `
            },] },
];
/** @nocollapse */
NgbPagination.ctorParameters = () => [
    { type: NgbPaginationConfig }
];
NgbPagination.propDecorators = {
    disabled: [{ type: Input }],
    boundaryLinks: [{ type: Input }],
    directionLinks: [{ type: Input }],
    ellipses: [{ type: Input }],
    rotate: [{ type: Input }],
    collectionSize: [{ type: Input }],
    maxSize: [{ type: Input }],
    page: [{ type: Input }],
    pageSize: [{ type: Input }],
    pageChange: [{ type: Output }],
    size: [{ type: Input }]
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
class NgbPaginationModule {
    /**
     * Importing with '.forRoot()' is no longer necessary, you can simply import the module.
     * Will be removed in 4.0.0.
     *
     * @deprecated 3.0.0
     * @return {?}
     */
    static forRoot() { return { ngModule: NgbPaginationModule }; }
}
NgbPaginationModule.decorators = [
    { type: NgModule, args: [{ declarations: [NgbPagination], exports: [NgbPagination], imports: [CommonModule] },] },
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
class Trigger {
    /**
     * @param {?} open
     * @param {?=} close
     */
    constructor(open, close) {
        this.open = open;
        this.close = close;
        if (!close) {
            this.close = open;
        }
    }
    /**
     * @return {?}
     */
    isManual() { return this.open === 'manual' || this.close === 'manual'; }
}
/** @type {?} */
const DEFAULT_ALIASES = {
    'hover': ['mouseenter', 'mouseleave']
};
/**
 * @param {?} triggers
 * @param {?=} aliases
 * @return {?}
 */
function parseTriggers(triggers, aliases = DEFAULT_ALIASES) {
    /** @type {?} */
    const trimmedTriggers = (triggers || '').trim();
    if (trimmedTriggers.length === 0) {
        return [];
    }
    /** @type {?} */
    const parsedTriggers = trimmedTriggers.split(/\s+/).map(trigger => trigger.split(':')).map((triggerPair) => {
        /** @type {?} */
        let alias = aliases[triggerPair[0]] || triggerPair;
        return new Trigger(alias[0], alias[1]);
    });
    /** @type {?} */
    const manualTriggers = parsedTriggers.filter(triggerPair => triggerPair.isManual());
    if (manualTriggers.length > 1) {
        throw 'Triggers parse error: only one manual trigger is allowed';
    }
    if (manualTriggers.length === 1 && parsedTriggers.length > 1) {
        throw 'Triggers parse error: manual trigger can\'t be mixed with other triggers';
    }
    return parsedTriggers;
}
/** @type {?} */
const noopFn = () => { };
/**
 * @param {?} renderer
 * @param {?} nativeElement
 * @param {?} triggers
 * @param {?} openFn
 * @param {?} closeFn
 * @param {?} toggleFn
 * @return {?}
 */
function listenToTriggers(renderer, nativeElement, triggers, openFn, closeFn, toggleFn) {
    /** @type {?} */
    const parsedTriggers = parseTriggers(triggers);
    /** @type {?} */
    const listeners = [];
    if (parsedTriggers.length === 1 && parsedTriggers[0].isManual()) {
        return noopFn;
    }
    parsedTriggers.forEach((trigger) => {
        if (trigger.open === trigger.close) {
            listeners.push(renderer.listen(nativeElement, trigger.open, toggleFn));
        }
        else {
            listeners.push(renderer.listen(nativeElement, trigger.open, openFn), renderer.listen(nativeElement, trigger.close, closeFn));
        }
    });
    return () => { listeners.forEach(unsubscribeFn => unsubscribeFn()); };
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
/**
 * Configuration service for the NgbPopover directive.
 * You can inject this service, typically in your root component, and customize the values of its properties in
 * order to provide default values for all the popovers used in the application.
 */
class NgbPopoverConfig {
    constructor() {
        this.autoClose = true;
        this.placement = 'top';
        this.triggers = 'click';
        this.disablePopover = false;
    }
}
NgbPopoverConfig.decorators = [
    { type: Injectable, args: [{ providedIn: 'root' },] },
];
/** @nocollapse */ NgbPopoverConfig.ngInjectableDef = defineInjectable({ factory: function NgbPopoverConfig_Factory() { return new NgbPopoverConfig(); }, token: NgbPopoverConfig, providedIn: "root" });

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
/** @type {?} */
let nextId$3 = 0;
class NgbPopoverWindow {
    /**
     * @param {?} _element
     * @param {?} _renderer
     */
    constructor(_element, _renderer) {
        this._element = _element;
        this._renderer = _renderer;
        this.placement = 'top';
    }
    /**
     * @return {?}
     */
    isTitleTemplate() { return this.title instanceof TemplateRef; }
    /**
     * @param {?} _placement
     * @return {?}
     */
    applyPlacement(_placement) {
        // remove the current placement classes
        this._renderer.removeClass(this._element.nativeElement, 'bs-popover-' + this.placement.toString().split('-')[0]);
        this._renderer.removeClass(this._element.nativeElement, 'bs-popover-' + this.placement.toString());
        // set the new placement classes
        this.placement = _placement;
        // apply the new placement
        this._renderer.addClass(this._element.nativeElement, 'bs-popover-' + this.placement.toString().split('-')[0]);
        this._renderer.addClass(this._element.nativeElement, 'bs-popover-' + this.placement.toString());
    }
    /**
     * Tells whether the event has been triggered from this component's subtree or not.
     *
     * @param {?} event the event to check
     *
     * @return {?} whether the event has been triggered from this component's subtree or not.
     */
    isEventFrom(event) { return this._element.nativeElement.contains(/** @type {?} */ (event.target)); }
}
NgbPopoverWindow.decorators = [
    { type: Component, args: [{
                selector: 'ngb-popover-window',
                changeDetection: ChangeDetectionStrategy.OnPush,
                host: {
                    '[class]': '"popover bs-popover-" + placement.split("-")[0]+" bs-popover-" + placement + (popoverClass ? " " + popoverClass : "")',
                    'role': 'tooltip',
                    '[id]': 'id'
                },
                template: `
    <div class="arrow"></div>
    <h3 class="popover-header" *ngIf="title != null">
      <ng-template #simpleTitle>{{title}}</ng-template>
      <ng-template [ngTemplateOutlet]="isTitleTemplate() ? title : simpleTitle" [ngTemplateOutletContext]="context"></ng-template>
    </h3>
    <div class="popover-body"><ng-content></ng-content></div>`,
                styles: [`
    :host.bs-popover-top .arrow, :host.bs-popover-bottom .arrow {
      left: 50%;
      margin-left: -5px;
    }

    :host.bs-popover-top-left .arrow, :host.bs-popover-bottom-left .arrow {
      left: 2em;
    }

    :host.bs-popover-top-right .arrow, :host.bs-popover-bottom-right .arrow {
      left: auto;
      right: 2em;
    }

    :host.bs-popover-left .arrow, :host.bs-popover-right .arrow {
      top: 50%;
      margin-top: -5px;
    }

    :host.bs-popover-left-top .arrow, :host.bs-popover-right-top .arrow {
      top: 0.7em;
    }

    :host.bs-popover-left-bottom .arrow, :host.bs-popover-right-bottom .arrow {
      top: auto;
      bottom: 0.7em;
    }
  `]
            },] },
];
/** @nocollapse */
NgbPopoverWindow.ctorParameters = () => [
    { type: ElementRef },
    { type: Renderer2 }
];
NgbPopoverWindow.propDecorators = {
    placement: [{ type: Input }],
    title: [{ type: Input }],
    id: [{ type: Input }],
    popoverClass: [{ type: Input }],
    context: [{ type: Input }]
};
/**
 * A lightweight, extensible directive for fancy popover creation.
 */
class NgbPopover {
    /**
     * @param {?} _elementRef
     * @param {?} _renderer
     * @param {?} injector
     * @param {?} componentFactoryResolver
     * @param {?} viewContainerRef
     * @param {?} config
     * @param {?} _ngZone
     * @param {?} _document
     */
    constructor(_elementRef, _renderer, injector, componentFactoryResolver, viewContainerRef, config, _ngZone, _document) {
        this._elementRef = _elementRef;
        this._renderer = _renderer;
        this._ngZone = _ngZone;
        this._document = _document;
        /**
         * Emits an event when the popover is shown
         */
        this.shown = new EventEmitter();
        /**
         * Emits an event when the popover is hidden
         */
        this.hidden = new EventEmitter();
        this._ngbPopoverWindowId = `ngb-popover-${nextId$3++}`;
        this.autoClose = config.autoClose;
        this.placement = config.placement;
        this.triggers = config.triggers;
        this.container = config.container;
        this.disablePopover = config.disablePopover;
        this.popoverClass = config.popoverClass;
        this._popupService = new PopupService(NgbPopoverWindow, injector, viewContainerRef, _renderer, componentFactoryResolver);
        this._zoneSubscription = _ngZone.onStable.subscribe(() => {
            if (this._windowRef) {
                this._windowRef.instance.applyPlacement(positionElements(this._elementRef.nativeElement, this._windowRef.location.nativeElement, this.placement, this.container === 'body'));
            }
        });
    }
    /**
     * @return {?}
     */
    _isDisabled() {
        if (this.disablePopover) {
            return true;
        }
        if (!this.ngbPopover && !this.popoverTitle) {
            return true;
        }
        return false;
    }
    /**
     * Opens an element’s popover. This is considered a “manual” triggering of the popover.
     * The context is an optional value to be injected into the popover template when it is created.
     * @param {?=} context
     * @return {?}
     */
    open(context) {
        if (!this._windowRef && !this._isDisabled()) {
            this._windowRef = this._popupService.open(this.ngbPopover, context);
            this._windowRef.instance.title = this.popoverTitle;
            this._windowRef.instance.context = context;
            this._windowRef.instance.popoverClass = this.popoverClass;
            this._windowRef.instance.id = this._ngbPopoverWindowId;
            this._renderer.setAttribute(this._elementRef.nativeElement, 'aria-describedby', this._ngbPopoverWindowId);
            if (this.container === 'body') {
                this._document.querySelector(this.container).appendChild(this._windowRef.location.nativeElement);
            }
            // apply styling to set basic css-classes on target element, before going for positioning
            this._windowRef.changeDetectorRef.detectChanges();
            this._windowRef.changeDetectorRef.markForCheck();
            // position popover along the element
            this._windowRef.instance.applyPlacement(positionElements(this._elementRef.nativeElement, this._windowRef.location.nativeElement, this.placement, this.container === 'body'));
            if (this.autoClose) {
                this._ngZone.runOutsideAngular(() => {
                    /** @type {?} */
                    let justOpened = true;
                    requestAnimationFrame(() => justOpened = false);
                    /** @type {?} */
                    const escapes$ = fromEvent(this._document, 'keyup')
                        .pipe(takeUntil(this.hidden), filter(event => event.which === Key.Escape));
                    /** @type {?} */
                    const clicks$ = fromEvent(this._document, 'click')
                        .pipe(takeUntil(this.hidden), filter(() => !justOpened), filter(event => this._shouldCloseFromClick(event)));
                    race([escapes$, clicks$]).subscribe(() => this._ngZone.run(() => this.close()));
                });
            }
            this.shown.emit();
        }
    }
    /**
     * Closes an element’s popover. This is considered a “manual” triggering of the popover.
     * @return {?}
     */
    close() {
        if (this._windowRef) {
            this._renderer.removeAttribute(this._elementRef.nativeElement, 'aria-describedby');
            this._popupService.close();
            this._windowRef = null;
            this.hidden.emit();
        }
    }
    /**
     * Toggles an element’s popover. This is considered a “manual” triggering of the popover.
     * @return {?}
     */
    toggle() {
        if (this._windowRef) {
            this.close();
        }
        else {
            this.open();
        }
    }
    /**
     * Returns whether or not the popover is currently being shown
     * @return {?}
     */
    isOpen() { return this._windowRef != null; }
    /**
     * @return {?}
     */
    ngOnInit() {
        this._unregisterListenersFn = listenToTriggers(this._renderer, this._elementRef.nativeElement, this.triggers, this.open.bind(this), this.close.bind(this), this.toggle.bind(this));
    }
    /**
     * @param {?} changes
     * @return {?}
     */
    ngOnChanges(changes) {
        // close popover if title and content become empty, or disablePopover set to true
        if ((changes['ngbPopover'] || changes['popoverTitle'] || changes['disablePopover']) && this._isDisabled()) {
            this.close();
        }
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        this.close();
        this._unregisterListenersFn();
        this._zoneSubscription.unsubscribe();
    }
    /**
     * @param {?} event
     * @return {?}
     */
    _shouldCloseFromClick(event) {
        if (event.button !== 2) {
            if (this.autoClose === true) {
                return true;
            }
            else if (this.autoClose === 'inside' && this._isEventFromPopover(event)) {
                return true;
            }
            else if (this.autoClose === 'outside' && !this._isEventFromPopover(event)) {
                return true;
            }
        }
        return false;
    }
    /**
     * @param {?} event
     * @return {?}
     */
    _isEventFromPopover(event) {
        /** @type {?} */
        const popup = this._windowRef.instance;
        return popup ? popup.isEventFrom(event) : false;
    }
}
NgbPopover.decorators = [
    { type: Directive, args: [{ selector: '[ngbPopover]', exportAs: 'ngbPopover' },] },
];
/** @nocollapse */
NgbPopover.ctorParameters = () => [
    { type: ElementRef },
    { type: Renderer2 },
    { type: Injector },
    { type: ComponentFactoryResolver },
    { type: ViewContainerRef },
    { type: NgbPopoverConfig },
    { type: NgZone },
    { type: undefined, decorators: [{ type: Inject, args: [DOCUMENT,] }] }
];
NgbPopover.propDecorators = {
    autoClose: [{ type: Input }],
    ngbPopover: [{ type: Input }],
    popoverTitle: [{ type: Input }],
    placement: [{ type: Input }],
    triggers: [{ type: Input }],
    container: [{ type: Input }],
    disablePopover: [{ type: Input }],
    popoverClass: [{ type: Input }],
    shown: [{ type: Output }],
    hidden: [{ type: Output }]
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
class NgbPopoverModule {
    /**
     * Importing with '.forRoot()' is no longer necessary, you can simply import the module.
     * Will be removed in 4.0.0.
     *
     * @deprecated 3.0.0
     * @return {?}
     */
    static forRoot() { return { ngModule: NgbPopoverModule }; }
}
NgbPopoverModule.decorators = [
    { type: NgModule, args: [{
                declarations: [NgbPopover, NgbPopoverWindow],
                exports: [NgbPopover],
                imports: [CommonModule],
                entryComponents: [NgbPopoverWindow]
            },] },
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
/**
 * Configuration service for the NgbProgressbar component.
 * You can inject this service, typically in your root component, and customize the values of its properties in
 * order to provide default values for all the progress bars used in the application.
 */
class NgbProgressbarConfig {
    constructor() {
        this.max = 100;
        this.animated = false;
        this.striped = false;
        this.showValue = false;
    }
}
NgbProgressbarConfig.decorators = [
    { type: Injectable, args: [{ providedIn: 'root' },] },
];
/** @nocollapse */ NgbProgressbarConfig.ngInjectableDef = defineInjectable({ factory: function NgbProgressbarConfig_Factory() { return new NgbProgressbarConfig(); }, token: NgbProgressbarConfig, providedIn: "root" });

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
/**
 * Directive that can be used to provide feedback on the progress of a workflow or an action.
 */
class NgbProgressbar {
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

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
class NgbProgressbarModule {
    /**
     * Importing with '.forRoot()' is no longer necessary, you can simply import the module.
     * Will be removed in 4.0.0.
     *
     * @deprecated 3.0.0
     * @return {?}
     */
    static forRoot() { return { ngModule: NgbProgressbarModule }; }
}
NgbProgressbarModule.decorators = [
    { type: NgModule, args: [{ declarations: [NgbProgressbar], exports: [NgbProgressbar], imports: [CommonModule] },] },
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
/**
 * Configuration service for the NgbRating component.
 * You can inject this service, typically in your root component, and customize the values of its properties in
 * order to provide default values for all the ratings used in the application.
 */
class NgbRatingConfig {
    constructor() {
        this.max = 10;
        this.readonly = false;
        this.resettable = false;
    }
}
NgbRatingConfig.decorators = [
    { type: Injectable, args: [{ providedIn: 'root' },] },
];
/** @nocollapse */ NgbRatingConfig.ngInjectableDef = defineInjectable({ factory: function NgbRatingConfig_Factory() { return new NgbRatingConfig(); }, token: NgbRatingConfig, providedIn: "root" });

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
/** @type {?} */
const NGB_RATING_VALUE_ACCESSOR = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => NgbRating),
    multi: true
};
/**
 * Rating directive that will take care of visualising a star rating bar.
 */
class NgbRating {
    /**
     * @param {?} config
     * @param {?} _changeDetectorRef
     */
    constructor(config, _changeDetectorRef) {
        this._changeDetectorRef = _changeDetectorRef;
        this.contexts = [];
        this.disabled = false;
        /**
         * An event fired when a user is hovering over a given rating.
         * Event's payload equals to the rating being hovered over.
         */
        this.hover = new EventEmitter();
        /**
         * An event fired when a user stops hovering over a given rating.
         * Event's payload equals to the rating of the last item being hovered over.
         */
        this.leave = new EventEmitter();
        /**
         * An event fired when a user selects a new rating.
         * Event's payload equals to the newly selected rating.
         */
        this.rateChange = new EventEmitter(true);
        this.onChange = (_) => { };
        this.onTouched = () => { };
        this.max = config.max;
        this.readonly = config.readonly;
    }
    /**
     * @return {?}
     */
    ariaValueText() { return `${this.nextRate} out of ${this.max}`; }
    /**
     * @param {?} value
     * @return {?}
     */
    enter(value) {
        if (!this.readonly && !this.disabled) {
            this._updateState(value);
        }
        this.hover.emit(value);
    }
    /**
     * @return {?}
     */
    handleBlur() { this.onTouched(); }
    /**
     * @param {?} value
     * @return {?}
     */
    handleClick(value) { this.update(this.resettable && this.rate === value ? 0 : value); }
    /**
     * @param {?} event
     * @return {?}
     */
    handleKeyDown(event) {
        if (Key[toString(event.which)]) {
            event.preventDefault();
            switch (event.which) {
                case Key.ArrowDown:
                case Key.ArrowLeft:
                    this.update(this.rate - 1);
                    break;
                case Key.ArrowUp:
                case Key.ArrowRight:
                    this.update(this.rate + 1);
                    break;
                case Key.Home:
                    this.update(0);
                    break;
                case Key.End:
                    this.update(this.max);
                    break;
            }
        }
    }
    /**
     * @param {?} changes
     * @return {?}
     */
    ngOnChanges(changes) {
        if (changes['rate']) {
            this.update(this.rate);
        }
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        this.contexts = Array.from({ length: this.max }, (v, k) => ({ fill: 0, index: k }));
        this._updateState(this.rate);
    }
    /**
     * @param {?} fn
     * @return {?}
     */
    registerOnChange(fn) { this.onChange = fn; }
    /**
     * @param {?} fn
     * @return {?}
     */
    registerOnTouched(fn) { this.onTouched = fn; }
    /**
     * @return {?}
     */
    reset() {
        this.leave.emit(this.nextRate);
        this._updateState(this.rate);
    }
    /**
     * @param {?} isDisabled
     * @return {?}
     */
    setDisabledState(isDisabled) { this.disabled = isDisabled; }
    /**
     * @param {?} value
     * @param {?=} internalChange
     * @return {?}
     */
    update(value, internalChange = true) {
        /** @type {?} */
        const newRate = getValueInRange(value, this.max, 0);
        if (!this.readonly && !this.disabled && this.rate !== newRate) {
            this.rate = newRate;
            this.rateChange.emit(this.rate);
        }
        if (internalChange) {
            this.onChange(this.rate);
            this.onTouched();
        }
        this._updateState(this.rate);
    }
    /**
     * @param {?} value
     * @return {?}
     */
    writeValue(value) {
        this.update(value, false);
        this._changeDetectorRef.markForCheck();
    }
    /**
     * @param {?} index
     * @return {?}
     */
    _getFillValue(index) {
        /** @type {?} */
        const diff = this.nextRate - index;
        if (diff >= 1) {
            return 100;
        }
        if (diff < 1 && diff > 0) {
            return Number.parseInt((diff * 100).toFixed(2));
        }
        return 0;
    }
    /**
     * @param {?} nextValue
     * @return {?}
     */
    _updateState(nextValue) {
        this.nextRate = nextValue;
        this.contexts.forEach((context, index) => context.fill = this._getFillValue(index));
    }
}
NgbRating.decorators = [
    { type: Component, args: [{
                selector: 'ngb-rating',
                changeDetection: ChangeDetectionStrategy.OnPush,
                host: {
                    'class': 'd-inline-flex',
                    'tabindex': '0',
                    'role': 'slider',
                    'aria-valuemin': '0',
                    '[attr.aria-valuemax]': 'max',
                    '[attr.aria-valuenow]': 'nextRate',
                    '[attr.aria-valuetext]': 'ariaValueText()',
                    '[attr.aria-disabled]': 'readonly ? true : null',
                    '(blur)': 'handleBlur()',
                    '(keydown)': 'handleKeyDown($event)',
                    '(mouseleave)': 'reset()'
                },
                template: `
    <ng-template #t let-fill="fill">{{ fill === 100 ? '&#9733;' : '&#9734;' }}</ng-template>
    <ng-template ngFor [ngForOf]="contexts" let-index="index">
      <span class="sr-only">({{ index < nextRate ? '*' : ' ' }})</span>
      <span (mouseenter)="enter(index + 1)" (click)="handleClick(index + 1)" [style.cursor]="readonly || disabled ? 'default' : 'pointer'">
        <ng-template [ngTemplateOutlet]="starTemplate || t" [ngTemplateOutletContext]="contexts[index]"></ng-template>
      </span>
    </ng-template>
  `,
                providers: [NGB_RATING_VALUE_ACCESSOR]
            },] },
];
/** @nocollapse */
NgbRating.ctorParameters = () => [
    { type: NgbRatingConfig },
    { type: ChangeDetectorRef }
];
NgbRating.propDecorators = {
    max: [{ type: Input }],
    rate: [{ type: Input }],
    readonly: [{ type: Input }],
    resettable: [{ type: Input }],
    starTemplate: [{ type: Input }, { type: ContentChild, args: [TemplateRef,] }],
    hover: [{ type: Output }],
    leave: [{ type: Output }],
    rateChange: [{ type: Output }]
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
class NgbRatingModule {
    /**
     * Importing with '.forRoot()' is no longer necessary, you can simply import the module.
     * Will be removed in 4.0.0.
     *
     * @deprecated 3.0.0
     * @return {?}
     */
    static forRoot() { return { ngModule: NgbRatingModule }; }
}
NgbRatingModule.decorators = [
    { type: NgModule, args: [{ declarations: [NgbRating], exports: [NgbRating], imports: [CommonModule] },] },
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
/**
 * Configuration service for the NgbTabset component.
 * You can inject this service, typically in your root component, and customize the values of its properties in
 * order to provide default values for all the tabsets used in the application.
 */
class NgbTabsetConfig {
    constructor() {
        this.justify = 'start';
        this.orientation = 'horizontal';
        this.type = 'tabs';
    }
}
NgbTabsetConfig.decorators = [
    { type: Injectable, args: [{ providedIn: 'root' },] },
];
/** @nocollapse */ NgbTabsetConfig.ngInjectableDef = defineInjectable({ factory: function NgbTabsetConfig_Factory() { return new NgbTabsetConfig(); }, token: NgbTabsetConfig, providedIn: "root" });

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
/** @type {?} */
let nextId$4 = 0;
/**
 * This directive should be used to wrap tab titles that need to contain HTML markup or other directives.
 */
class NgbTabTitle {
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
/**
 * This directive must be used to wrap content to be displayed in a tab.
 */
class NgbTabContent {
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
/**
 * A directive representing an individual tab.
 */
class NgbTab {
    constructor() {
        /**
         * Unique tab identifier. Must be unique for the entire document for proper accessibility support.
         */
        this.id = `ngb-tab-${nextId$4++}`;
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
/**
 * A component that makes it easy to create tabbed interface.
 */
class NgbTabset {
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

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
/** @type {?} */
const NGB_TABSET_DIRECTIVES = [NgbTabset, NgbTab, NgbTabContent, NgbTabTitle];
class NgbTabsetModule {
    /**
     * Importing with '.forRoot()' is no longer necessary, you can simply import the module.
     * Will be removed in 4.0.0.
     *
     * @deprecated 3.0.0
     * @return {?}
     */
    static forRoot() { return { ngModule: NgbTabsetModule }; }
}
NgbTabsetModule.decorators = [
    { type: NgModule, args: [{ declarations: NGB_TABSET_DIRECTIVES, exports: NGB_TABSET_DIRECTIVES, imports: [CommonModule] },] },
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
class NgbTime {
    /**
     * @param {?=} hour
     * @param {?=} minute
     * @param {?=} second
     */
    constructor(hour, minute, second) {
        this.hour = toInteger(hour);
        this.minute = toInteger(minute);
        this.second = toInteger(second);
    }
    /**
     * @param {?=} step
     * @return {?}
     */
    changeHour(step = 1) { this.updateHour((isNaN(this.hour) ? 0 : this.hour) + step); }
    /**
     * @param {?} hour
     * @return {?}
     */
    updateHour(hour) {
        if (isNumber(hour)) {
            this.hour = (hour < 0 ? 24 + hour : hour) % 24;
        }
        else {
            this.hour = NaN;
        }
    }
    /**
     * @param {?=} step
     * @return {?}
     */
    changeMinute(step = 1) { this.updateMinute((isNaN(this.minute) ? 0 : this.minute) + step); }
    /**
     * @param {?} minute
     * @return {?}
     */
    updateMinute(minute) {
        if (isNumber(minute)) {
            this.minute = minute % 60 < 0 ? 60 + minute % 60 : minute % 60;
            this.changeHour(Math.floor(minute / 60));
        }
        else {
            this.minute = NaN;
        }
    }
    /**
     * @param {?=} step
     * @return {?}
     */
    changeSecond(step = 1) { this.updateSecond((isNaN(this.second) ? 0 : this.second) + step); }
    /**
     * @param {?} second
     * @return {?}
     */
    updateSecond(second) {
        if (isNumber(second)) {
            this.second = second < 0 ? 60 + second % 60 : second % 60;
            this.changeMinute(Math.floor(second / 60));
        }
        else {
            this.second = NaN;
        }
    }
    /**
     * @param {?=} checkSecs
     * @return {?}
     */
    isValid(checkSecs = true) {
        return isNumber(this.hour) && isNumber(this.minute) && (checkSecs ? isNumber(this.second) : true);
    }
    /**
     * @return {?}
     */
    toString() { return `${this.hour || 0}:${this.minute || 0}:${this.second || 0}`; }
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
/**
 * Configuration service for the NgbTimepicker component.
 * You can inject this service, typically in your root component, and customize the values of its properties in
 * order to provide default values for all the timepickers used in the application.
 */
class NgbTimepickerConfig {
    constructor() {
        this.meridian = false;
        this.spinners = true;
        this.seconds = false;
        this.hourStep = 1;
        this.minuteStep = 1;
        this.secondStep = 1;
        this.disabled = false;
        this.readonlyInputs = false;
        this.size = 'medium';
    }
}
NgbTimepickerConfig.decorators = [
    { type: Injectable, args: [{ providedIn: 'root' },] },
];
/** @nocollapse */ NgbTimepickerConfig.ngInjectableDef = defineInjectable({ factory: function NgbTimepickerConfig_Factory() { return new NgbTimepickerConfig(); }, token: NgbTimepickerConfig, providedIn: "root" });

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
/**
 * @return {?}
 */
function NGB_DATEPICKER_TIME_ADAPTER_FACTORY() {
    return new NgbTimeStructAdapter();
}
/**
 * Abstract type serving as a DI token for the service converting from your application Time model to internal
 * NgbTimeStruct model.
 * A default implementation converting from and to NgbTimeStruct is provided for retro-compatibility,
 * but you can provide another implementation to use an alternative format, ie for using with native Date Object.
 *
 * \@since 2.2.0
 * @abstract
 * @template T
 */
class NgbTimeAdapter {
}
NgbTimeAdapter.decorators = [
    { type: Injectable, args: [{ providedIn: 'root', useFactory: NGB_DATEPICKER_TIME_ADAPTER_FACTORY },] },
];
/** @nocollapse */ NgbTimeAdapter.ngInjectableDef = defineInjectable({ factory: NGB_DATEPICKER_TIME_ADAPTER_FACTORY, token: NgbTimeAdapter, providedIn: "root" });
class NgbTimeStructAdapter extends NgbTimeAdapter {
    /**
     * Converts a NgbTimeStruct value into NgbTimeStruct value
     * @param {?} time
     * @return {?}
     */
    fromModel(time) {
        return (time && isInteger(time.hour) && isInteger(time.minute)) ?
            { hour: time.hour, minute: time.minute, second: isInteger(time.second) ? time.second : null } :
            null;
    }
    /**
     * Converts a NgbTimeStruct value into NgbTimeStruct value
     * @param {?} time
     * @return {?}
     */
    toModel(time) {
        return (time && isInteger(time.hour) && isInteger(time.minute)) ?
            { hour: time.hour, minute: time.minute, second: isInteger(time.second) ? time.second : null } :
            null;
    }
}
NgbTimeStructAdapter.decorators = [
    { type: Injectable },
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
/** @type {?} */
const NGB_TIMEPICKER_VALUE_ACCESSOR = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => NgbTimepicker),
    multi: true
};
/**
 * A lightweight & configurable timepicker directive.
 */
class NgbTimepicker {
    /**
     * @param {?} config
     * @param {?} _ngbTimeAdapter
     */
    constructor(config, _ngbTimeAdapter) {
        this._ngbTimeAdapter = _ngbTimeAdapter;
        this.onChange = (_) => { };
        this.onTouched = () => { };
        this.meridian = config.meridian;
        this.spinners = config.spinners;
        this.seconds = config.seconds;
        this.hourStep = config.hourStep;
        this.minuteStep = config.minuteStep;
        this.secondStep = config.secondStep;
        this.disabled = config.disabled;
        this.readonlyInputs = config.readonlyInputs;
        this.size = config.size;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    writeValue(value) {
        /** @type {?} */
        const structValue = this._ngbTimeAdapter.fromModel(value);
        this.model = structValue ? new NgbTime(structValue.hour, structValue.minute, structValue.second) : new NgbTime();
        if (!this.seconds && (!structValue || !isNumber(structValue.second))) {
            this.model.second = 0;
        }
    }
    /**
     * @param {?} fn
     * @return {?}
     */
    registerOnChange(fn) { this.onChange = fn; }
    /**
     * @param {?} fn
     * @return {?}
     */
    registerOnTouched(fn) { this.onTouched = fn; }
    /**
     * @param {?} isDisabled
     * @return {?}
     */
    setDisabledState(isDisabled) { this.disabled = isDisabled; }
    /**
     * @param {?} step
     * @return {?}
     */
    changeHour(step) {
        this.model.changeHour(step);
        this.propagateModelChange();
    }
    /**
     * @param {?} step
     * @return {?}
     */
    changeMinute(step) {
        this.model.changeMinute(step);
        this.propagateModelChange();
    }
    /**
     * @param {?} step
     * @return {?}
     */
    changeSecond(step) {
        this.model.changeSecond(step);
        this.propagateModelChange();
    }
    /**
     * @param {?} newVal
     * @return {?}
     */
    updateHour(newVal) {
        /** @type {?} */
        const isPM = this.model.hour >= 12;
        /** @type {?} */
        const enteredHour = toInteger(newVal);
        if (this.meridian && (isPM && enteredHour < 12 || !isPM && enteredHour === 12)) {
            this.model.updateHour(enteredHour + 12);
        }
        else {
            this.model.updateHour(enteredHour);
        }
        this.propagateModelChange();
    }
    /**
     * @param {?} newVal
     * @return {?}
     */
    updateMinute(newVal) {
        this.model.updateMinute(toInteger(newVal));
        this.propagateModelChange();
    }
    /**
     * @param {?} newVal
     * @return {?}
     */
    updateSecond(newVal) {
        this.model.updateSecond(toInteger(newVal));
        this.propagateModelChange();
    }
    /**
     * @return {?}
     */
    toggleMeridian() {
        if (this.meridian) {
            this.changeHour(12);
        }
    }
    /**
     * @param {?} value
     * @return {?}
     */
    formatHour(value) {
        if (isNumber(value)) {
            if (this.meridian) {
                return padNumber(value % 12 === 0 ? 12 : value % 12);
            }
            else {
                return padNumber(value % 24);
            }
        }
        else {
            return padNumber(NaN);
        }
    }
    /**
     * @param {?} value
     * @return {?}
     */
    formatMinSec(value) { return padNumber(value); }
    /**
     * @return {?}
     */
    get isSmallSize() { return this.size === 'small'; }
    /**
     * @return {?}
     */
    get isLargeSize() { return this.size === 'large'; }
    /**
     * @param {?} changes
     * @return {?}
     */
    ngOnChanges(changes) {
        if (changes['seconds'] && !this.seconds && this.model && !isNumber(this.model.second)) {
            this.model.second = 0;
            this.propagateModelChange(false);
        }
    }
    /**
     * @param {?=} touched
     * @return {?}
     */
    propagateModelChange(touched = true) {
        if (touched) {
            this.onTouched();
        }
        if (this.model.isValid(this.seconds)) {
            this.onChange(this._ngbTimeAdapter.toModel({ hour: this.model.hour, minute: this.model.minute, second: this.model.second }));
        }
        else {
            this.onChange(this._ngbTimeAdapter.toModel(null));
        }
    }
}
NgbTimepicker.decorators = [
    { type: Component, args: [{
                selector: 'ngb-timepicker',
                styles: [`

    :host {
      font-size: 1rem;
    }

    .ngb-tp {
      display: -ms-flexbox;
      display: flex;
      -ms-flex-align: center;
      align-items: center;
    }

    .ngb-tp-input-container {
      width: 4em;
    }

    .ngb-tp-hour, .ngb-tp-minute, .ngb-tp-second, .ngb-tp-meridian {
      display: -ms-flexbox;
      display: flex;
      -ms-flex-direction: column;
      flex-direction: column;
      -ms-flex-align: center;
      align-items: center;
      -ms-flex-pack: distribute;
      justify-content: space-around;
    }

    .ngb-tp-spacer {
      width: 1em;
      text-align: center;
    }

    .chevron::before {
      border-style: solid;
      border-width: 0.29em 0.29em 0 0;
      content: '';
      display: inline-block;
      height: 0.69em;
      left: 0.05em;
      position: relative;
      top: 0.15em;
      transform: rotate(-45deg);
      -webkit-transform: rotate(-45deg);
      -ms-transform: rotate(-45deg);
      vertical-align: middle;
      width: 0.71em;
    }

    .chevron.bottom:before {
      top: -.3em;
      -webkit-transform: rotate(135deg);
      -ms-transform: rotate(135deg);
      transform: rotate(135deg);
    }

    input {
      text-align: center;
    }
  `],
                template: `
    <fieldset [disabled]="disabled" [class.disabled]="disabled">
      <div class="ngb-tp">
        <div class="ngb-tp-input-container ngb-tp-hour">
          <button *ngIf="spinners" type="button" (click)="changeHour(hourStep)"
            class="btn btn-link" [class.btn-sm]="isSmallSize" [class.btn-lg]="isLargeSize" [class.disabled]="disabled"
            [disabled]="disabled">
            <span class="chevron"></span>
            <span class="sr-only" i18n="@@ngb.timepicker.increment-hours">Increment hours</span>
          </button>
          <input type="text" class="form-control" [class.form-control-sm]="isSmallSize" [class.form-control-lg]="isLargeSize" maxlength="2"
            placeholder="HH" i18n-placeholder="@@ngb.timepicker.HH"
            [value]="formatHour(model?.hour)" (change)="updateHour($event.target.value)"
            [readonly]="readonlyInputs" [disabled]="disabled" aria-label="Hours" i18n-aria-label="@@ngb.timepicker.hours">
          <button *ngIf="spinners" type="button" (click)="changeHour(-hourStep)"
            class="btn btn-link" [class.btn-sm]="isSmallSize" [class.btn-lg]="isLargeSize" [class.disabled]="disabled"
            [disabled]="disabled">
            <span class="chevron bottom"></span>
            <span class="sr-only" i18n="@@ngb.timepicker.decrement-hours">Decrement hours</span>
          </button>
        </div>
        <div class="ngb-tp-spacer">:</div>
        <div class="ngb-tp-input-container ngb-tp-minute">
          <button *ngIf="spinners" type="button" (click)="changeMinute(minuteStep)"
            class="btn btn-link" [class.btn-sm]="isSmallSize" [class.btn-lg]="isLargeSize" [class.disabled]="disabled"
            [disabled]="disabled">
            <span class="chevron"></span>
            <span class="sr-only" i18n="@@ngb.timepicker.increment-minutes">Increment minutes</span>
          </button>
          <input type="text" class="form-control" [class.form-control-sm]="isSmallSize" [class.form-control-lg]="isLargeSize" maxlength="2"
            placeholder="MM" i18n-placeholder="@@ngb.timepicker.MM"
            [value]="formatMinSec(model?.minute)" (change)="updateMinute($event.target.value)"
            [readonly]="readonlyInputs" [disabled]="disabled" aria-label="Minutes" i18n-aria-label="@@ngb.timepicker.minutes">
          <button *ngIf="spinners" type="button" (click)="changeMinute(-minuteStep)"
            class="btn btn-link" [class.btn-sm]="isSmallSize" [class.btn-lg]="isLargeSize"  [class.disabled]="disabled"
            [disabled]="disabled">
            <span class="chevron bottom"></span>
            <span class="sr-only"  i18n="@@ngb.timepicker.decrement-minutes">Decrement minutes</span>
          </button>
        </div>
        <div *ngIf="seconds" class="ngb-tp-spacer">:</div>
        <div *ngIf="seconds" class="ngb-tp-input-container ngb-tp-second">
          <button *ngIf="spinners" type="button" (click)="changeSecond(secondStep)"
            class="btn btn-link" [class.btn-sm]="isSmallSize" [class.btn-lg]="isLargeSize" [class.disabled]="disabled"
            [disabled]="disabled">
            <span class="chevron"></span>
            <span class="sr-only" i18n="@@ngb.timepicker.increment-seconds">Increment seconds</span>
          </button>
          <input type="text" class="form-control" [class.form-control-sm]="isSmallSize" [class.form-control-lg]="isLargeSize" maxlength="2"
            placeholder="SS" i18n-placeholder="@@ngb.timepicker.SS"
            [value]="formatMinSec(model?.second)" (change)="updateSecond($event.target.value)"
            [readonly]="readonlyInputs" [disabled]="disabled" aria-label="Seconds" i18n-aria-label="@@ngb.timepicker.seconds">
          <button *ngIf="spinners" type="button" (click)="changeSecond(-secondStep)"
            class="btn btn-link" [class.btn-sm]="isSmallSize" [class.btn-lg]="isLargeSize"  [class.disabled]="disabled"
            [disabled]="disabled">
            <span class="chevron bottom"></span>
            <span class="sr-only" i18n="@@ngb.timepicker.decrement-seconds">Decrement seconds</span>
          </button>
        </div>
        <div *ngIf="meridian" class="ngb-tp-spacer"></div>
        <div *ngIf="meridian" class="ngb-tp-meridian">
          <button type="button" class="btn btn-outline-primary" [class.btn-sm]="isSmallSize" [class.btn-lg]="isLargeSize"
            [disabled]="disabled" [class.disabled]="disabled"
                  (click)="toggleMeridian()">
            <ng-container *ngIf="model?.hour >= 12; else am" i18n="@@ngb.timepicker.PM">PM</ng-container>
            <ng-template #am i18n="@@ngb.timepicker.AM">AM</ng-template>
          </button>
        </div>
      </div>
    </fieldset>
  `,
                providers: [NGB_TIMEPICKER_VALUE_ACCESSOR]
            },] },
];
/** @nocollapse */
NgbTimepicker.ctorParameters = () => [
    { type: NgbTimepickerConfig },
    { type: NgbTimeAdapter }
];
NgbTimepicker.propDecorators = {
    meridian: [{ type: Input }],
    spinners: [{ type: Input }],
    seconds: [{ type: Input }],
    hourStep: [{ type: Input }],
    minuteStep: [{ type: Input }],
    secondStep: [{ type: Input }],
    readonlyInputs: [{ type: Input }],
    size: [{ type: Input }]
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
class NgbTimepickerModule {
    /**
     * Importing with '.forRoot()' is no longer necessary, you can simply import the module.
     * Will be removed in 4.0.0.
     *
     * @deprecated 3.0.0
     * @return {?}
     */
    static forRoot() { return { ngModule: NgbTimepickerModule }; }
}
NgbTimepickerModule.decorators = [
    { type: NgModule, args: [{ declarations: [NgbTimepicker], exports: [NgbTimepicker], imports: [CommonModule] },] },
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
/**
 * Configuration service for the NgbTooltip directive.
 * You can inject this service, typically in your root component, and customize the values of its properties in
 * order to provide default values for all the tooltips used in the application.
 */
class NgbTooltipConfig {
    constructor() {
        this.autoClose = true;
        this.placement = 'top';
        this.triggers = 'hover';
        this.disableTooltip = false;
    }
}
NgbTooltipConfig.decorators = [
    { type: Injectable, args: [{ providedIn: 'root' },] },
];
/** @nocollapse */ NgbTooltipConfig.ngInjectableDef = defineInjectable({ factory: function NgbTooltipConfig_Factory() { return new NgbTooltipConfig(); }, token: NgbTooltipConfig, providedIn: "root" });

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
/** @type {?} */
let nextId$5 = 0;
class NgbTooltipWindow {
    /**
     * @param {?} _element
     * @param {?} _renderer
     */
    constructor(_element, _renderer) {
        this._element = _element;
        this._renderer = _renderer;
        this.placement = 'top';
    }
    /**
     * @param {?} _placement
     * @return {?}
     */
    applyPlacement(_placement) {
        // remove the current placement classes
        this._renderer.removeClass(this._element.nativeElement, 'bs-tooltip-' + this.placement.toString().split('-')[0]);
        this._renderer.removeClass(this._element.nativeElement, 'bs-tooltip-' + this.placement.toString());
        // set the new placement classes
        this.placement = _placement;
        // apply the new placement
        this._renderer.addClass(this._element.nativeElement, 'bs-tooltip-' + this.placement.toString().split('-')[0]);
        this._renderer.addClass(this._element.nativeElement, 'bs-tooltip-' + this.placement.toString());
    }
    /**
     * Tells whether the event has been triggered from this component's subtree or not.
     *
     * @param {?} event the event to check
     *
     * @return {?} whether the event has been triggered from this component's subtree or not.
     */
    isEventFrom(event) { return this._element.nativeElement.contains(/** @type {?} */ (event.target)); }
}
NgbTooltipWindow.decorators = [
    { type: Component, args: [{
                selector: 'ngb-tooltip-window',
                changeDetection: ChangeDetectionStrategy.OnPush,
                host: {
                    '[class]': '"tooltip show bs-tooltip-" + placement.split("-")[0]+" bs-tooltip-" + placement + (tooltipClass ? " " + tooltipClass : "")',
                    'role': 'tooltip',
                    '[id]': 'id'
                },
                template: `<div class="arrow"></div><div class="tooltip-inner"><ng-content></ng-content></div>`,
                styles: [`
    :host.bs-tooltip-top .arrow, :host.bs-tooltip-bottom .arrow {
      left: calc(50% - 0.4rem);
    }

    :host.bs-tooltip-top-left .arrow, :host.bs-tooltip-bottom-left .arrow {
      left: 1em;
    }

    :host.bs-tooltip-top-right .arrow, :host.bs-tooltip-bottom-right .arrow {
      left: auto;
      right: 0.8rem;
    }

    :host.bs-tooltip-left .arrow, :host.bs-tooltip-right .arrow {
      top: calc(50% - 0.4rem);
    }

    :host.bs-tooltip-left-top .arrow, :host.bs-tooltip-right-top .arrow {
      top: 0.4rem;
    }

    :host.bs-tooltip-left-bottom .arrow, :host.bs-tooltip-right-bottom .arrow {
      top: auto;
      bottom: 0.4rem;
    }
  `]
            },] },
];
/** @nocollapse */
NgbTooltipWindow.ctorParameters = () => [
    { type: ElementRef },
    { type: Renderer2 }
];
NgbTooltipWindow.propDecorators = {
    placement: [{ type: Input }],
    id: [{ type: Input }],
    tooltipClass: [{ type: Input }]
};
/**
 * A lightweight, extensible directive for fancy tooltip creation.
 */
class NgbTooltip {
    /**
     * @param {?} _elementRef
     * @param {?} _renderer
     * @param {?} injector
     * @param {?} componentFactoryResolver
     * @param {?} viewContainerRef
     * @param {?} config
     * @param {?} _ngZone
     * @param {?} _document
     */
    constructor(_elementRef, _renderer, injector, componentFactoryResolver, viewContainerRef, config, _ngZone, _document) {
        this._elementRef = _elementRef;
        this._renderer = _renderer;
        this._ngZone = _ngZone;
        this._document = _document;
        /**
         * Emits an event when the tooltip is shown
         */
        this.shown = new EventEmitter();
        /**
         * Emits an event when the tooltip is hidden
         */
        this.hidden = new EventEmitter();
        this._ngbTooltipWindowId = `ngb-tooltip-${nextId$5++}`;
        this.autoClose = config.autoClose;
        this.placement = config.placement;
        this.triggers = config.triggers;
        this.container = config.container;
        this.disableTooltip = config.disableTooltip;
        this.tooltipClass = config.tooltipClass;
        this._popupService = new PopupService(NgbTooltipWindow, injector, viewContainerRef, _renderer, componentFactoryResolver);
        this._zoneSubscription = _ngZone.onStable.subscribe(() => {
            if (this._windowRef) {
                this._windowRef.instance.applyPlacement(positionElements(this._elementRef.nativeElement, this._windowRef.location.nativeElement, this.placement, this.container === 'body'));
            }
        });
    }
    /**
     * Content to be displayed as tooltip. If falsy, the tooltip won't open.
     * @param {?} value
     * @return {?}
     */
    set ngbTooltip(value) {
        this._ngbTooltip = value;
        if (!value && this._windowRef) {
            this.close();
        }
    }
    /**
     * @return {?}
     */
    get ngbTooltip() { return this._ngbTooltip; }
    /**
     * Opens an element’s tooltip. This is considered a “manual” triggering of the tooltip.
     * The context is an optional value to be injected into the tooltip template when it is created.
     * @param {?=} context
     * @return {?}
     */
    open(context) {
        if (!this._windowRef && this._ngbTooltip && !this.disableTooltip) {
            this._windowRef = this._popupService.open(this._ngbTooltip, context);
            this._windowRef.instance.tooltipClass = this.tooltipClass;
            this._windowRef.instance.id = this._ngbTooltipWindowId;
            this._renderer.setAttribute(this._elementRef.nativeElement, 'aria-describedby', this._ngbTooltipWindowId);
            if (this.container === 'body') {
                this._document.querySelector(this.container).appendChild(this._windowRef.location.nativeElement);
            }
            this._windowRef.instance.placement = Array.isArray(this.placement) ? this.placement[0] : this.placement;
            // apply styling to set basic css-classes on target element, before going for positioning
            this._windowRef.changeDetectorRef.detectChanges();
            this._windowRef.changeDetectorRef.markForCheck();
            // position tooltip along the element
            this._windowRef.instance.applyPlacement(positionElements(this._elementRef.nativeElement, this._windowRef.location.nativeElement, this.placement, this.container === 'body'));
            if (this.autoClose) {
                this._ngZone.runOutsideAngular(() => {
                    /** @type {?} */
                    let justOpened = true;
                    requestAnimationFrame(() => justOpened = false);
                    /** @type {?} */
                    const escapes$ = fromEvent(this._document, 'keyup')
                        .pipe(takeUntil(this.hidden), filter(event => event.which === Key.Escape));
                    /** @type {?} */
                    const clicks$ = fromEvent(this._document, 'click')
                        .pipe(takeUntil(this.hidden), filter(() => !justOpened), filter(event => this._shouldCloseFromClick(event)));
                    race([escapes$, clicks$]).subscribe(() => this._ngZone.run(() => this.close()));
                });
            }
            this.shown.emit();
        }
    }
    /**
     * Closes an element’s tooltip. This is considered a “manual” triggering of the tooltip.
     * @return {?}
     */
    close() {
        if (this._windowRef != null) {
            this._renderer.removeAttribute(this._elementRef.nativeElement, 'aria-describedby');
            this._popupService.close();
            this._windowRef = null;
            this.hidden.emit();
        }
    }
    /**
     * Toggles an element’s tooltip. This is considered a “manual” triggering of the tooltip.
     * @return {?}
     */
    toggle() {
        if (this._windowRef) {
            this.close();
        }
        else {
            this.open();
        }
    }
    /**
     * Returns whether or not the tooltip is currently being shown
     * @return {?}
     */
    isOpen() { return this._windowRef != null; }
    /**
     * @return {?}
     */
    ngOnInit() {
        this._unregisterListenersFn = listenToTriggers(this._renderer, this._elementRef.nativeElement, this.triggers, this.open.bind(this), this.close.bind(this), this.toggle.bind(this));
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        this.close();
        // This check is needed as it might happen that ngOnDestroy is called before ngOnInit
        // under certain conditions, see: https://github.com/ng-bootstrap/ng-bootstrap/issues/2199
        if (this._unregisterListenersFn) {
            this._unregisterListenersFn();
        }
        this._zoneSubscription.unsubscribe();
    }
    /**
     * @param {?} event
     * @return {?}
     */
    _shouldCloseFromClick(event) {
        if (event.button !== 2) {
            if (this.autoClose === true) {
                return true;
            }
            else if (this.autoClose === 'inside' && this._isEventFromTooltip(event)) {
                return true;
            }
            else if (this.autoClose === 'outside' && !this._isEventFromTooltip(event)) {
                return true;
            }
        }
        return false;
    }
    /**
     * @param {?} event
     * @return {?}
     */
    _isEventFromTooltip(event) {
        /** @type {?} */
        const popup = this._windowRef.instance;
        return popup ? popup.isEventFrom(event) : false;
    }
}
NgbTooltip.decorators = [
    { type: Directive, args: [{ selector: '[ngbTooltip]', exportAs: 'ngbTooltip' },] },
];
/** @nocollapse */
NgbTooltip.ctorParameters = () => [
    { type: ElementRef },
    { type: Renderer2 },
    { type: Injector },
    { type: ComponentFactoryResolver },
    { type: ViewContainerRef },
    { type: NgbTooltipConfig },
    { type: NgZone },
    { type: undefined, decorators: [{ type: Inject, args: [DOCUMENT,] }] }
];
NgbTooltip.propDecorators = {
    autoClose: [{ type: Input }],
    placement: [{ type: Input }],
    triggers: [{ type: Input }],
    container: [{ type: Input }],
    disableTooltip: [{ type: Input }],
    tooltipClass: [{ type: Input }],
    shown: [{ type: Output }],
    hidden: [{ type: Output }],
    ngbTooltip: [{ type: Input }]
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
class NgbTooltipModule {
    /**
     * No need in forRoot anymore with tree-shakeable services
     *
     * @deprecated 3.0.0
     * @return {?}
     */
    static forRoot() { return { ngModule: NgbTooltipModule }; }
}
NgbTooltipModule.decorators = [
    { type: NgModule, args: [{ declarations: [NgbTooltip, NgbTooltipWindow], exports: [NgbTooltip], entryComponents: [NgbTooltipWindow] },] },
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
/**
 * A component that can be used inside a custom result template in order to highlight the term inside the text of the
 * result
 */
class NgbHighlight {
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

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
class NgbTypeaheadWindow {
    constructor() {
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
    hasActive() { return this.activeIdx > -1 && this.activeIdx < this.results.length; }
    /**
     * @return {?}
     */
    getActive() { return this.results[this.activeIdx]; }
    /**
     * @param {?} activeIdx
     * @return {?}
     */
    markActive(activeIdx) {
        this.activeIdx = activeIdx;
        this._activeChanged();
    }
    /**
     * @return {?}
     */
    next() {
        if (this.activeIdx === this.results.length - 1) {
            this.activeIdx = this.focusFirst ? (this.activeIdx + 1) % this.results.length : -1;
        }
        else {
            this.activeIdx++;
        }
        this._activeChanged();
    }
    /**
     * @return {?}
     */
    prev() {
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
    }
    /**
     * @return {?}
     */
    resetActive() {
        this.activeIdx = this.focusFirst ? 0 : -1;
        this._activeChanged();
    }
    /**
     * @param {?} item
     * @return {?}
     */
    select(item) { this.selectEvent.emit(item); }
    /**
     * @return {?}
     */
    ngOnInit() { this.resetActive(); }
    /**
     * @return {?}
     */
    _activeChanged() {
        this.activeChangeEvent.emit(this.activeIdx >= 0 ? this.id + '-' + this.activeIdx : undefined);
    }
}
NgbTypeaheadWindow.decorators = [
    { type: Component, args: [{
                selector: 'ngb-typeahead-window',
                exportAs: 'ngbTypeaheadWindow',
                host: { 'class': 'dropdown-menu show', 'role': 'listbox', '[id]': 'id' },
                template: `
    <ng-template #rt let-result="result" let-term="term" let-formatter="formatter">
      <ngb-highlight [result]="formatter(result)" [term]="term"></ngb-highlight>
    </ng-template>
    <ng-template ngFor [ngForOf]="results" let-result let-idx="index">
      <button type="button" class="dropdown-item" role="option"
        [id]="id + '-' + idx"
        [class.active]="idx === activeIdx"
        (mouseenter)="markActive(idx)"
        (click)="select(result)">
          <ng-template [ngTemplateOutlet]="resultTemplate || rt"
          [ngTemplateOutletContext]="{result: result, term: term, formatter: formatter}"></ng-template>
      </button>
    </ng-template>
  `
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

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
/** @type {?} */
const ARIA_LIVE_DELAY = new InjectionToken('live announcer delay', { providedIn: 'root', factory: ARIA_LIVE_DELAY_FACTORY });
/**
 * @return {?}
 */
function ARIA_LIVE_DELAY_FACTORY() {
    return 100;
}
/**
 * @param {?} document
 * @param {?=} lazyCreate
 * @return {?}
 */
function getLiveElement(document, lazyCreate = false) {
    /** @type {?} */
    let element = /** @type {?} */ (document.body.querySelector('#ngb-live'));
    if (element == null && lazyCreate) {
        element = document.createElement('div');
        element.setAttribute('id', 'ngb-live');
        element.setAttribute('aria-live', 'polite');
        element.setAttribute('aria-atomic', 'true');
        element.classList.add('sr-only');
        document.body.appendChild(element);
    }
    return element;
}
class Live {
    /**
     * @param {?} _document
     * @param {?} _delay
     */
    constructor(_document, _delay) {
        this._document = _document;
        this._delay = _delay;
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        /** @type {?} */
        const element = getLiveElement(this._document);
        if (element) {
            element.parentElement.removeChild(element);
        }
    }
    /**
     * @param {?} message
     * @return {?}
     */
    say(message) {
        /** @type {?} */
        const element = getLiveElement(this._document, true);
        /** @type {?} */
        const delay = this._delay;
        element.textContent = '';
        /** @type {?} */
        const setText = () => element.textContent = message;
        if (delay === null) {
            setText();
        }
        else {
            setTimeout(setText, delay);
        }
    }
}
Live.decorators = [
    { type: Injectable, args: [{ providedIn: 'root' },] },
];
/** @nocollapse */
Live.ctorParameters = () => [
    { type: undefined, decorators: [{ type: Inject, args: [DOCUMENT,] }] },
    { type: undefined, decorators: [{ type: Inject, args: [ARIA_LIVE_DELAY,] }] }
];
/** @nocollapse */ Live.ngInjectableDef = defineInjectable({ factory: function Live_Factory() { return new Live(inject(DOCUMENT), inject(ARIA_LIVE_DELAY)); }, token: Live, providedIn: "root" });

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
/**
 * Configuration service for the NgbTypeahead component.
 * You can inject this service, typically in your root component, and customize the values of its properties in
 * order to provide default values for all the typeaheads used in the application.
 */
class NgbTypeaheadConfig {
    constructor() {
        this.editable = true;
        this.focusFirst = true;
        this.showHint = false;
        this.placement = 'bottom-left';
    }
}
NgbTypeaheadConfig.decorators = [
    { type: Injectable, args: [{ providedIn: 'root' },] },
];
/** @nocollapse */ NgbTypeaheadConfig.ngInjectableDef = defineInjectable({ factory: function NgbTypeaheadConfig_Factory() { return new NgbTypeaheadConfig(); }, token: NgbTypeaheadConfig, providedIn: "root" });

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
/** @type {?} */
const NGB_TYPEAHEAD_VALUE_ACCESSOR = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => NgbTypeahead),
    multi: true
};
/** @type {?} */
let nextWindowId = 0;
/**
 * NgbTypeahead directive provides a simple way of creating powerful typeaheads from any text input
 */
class NgbTypeahead {
    /**
     * @param {?} _elementRef
     * @param {?} _viewContainerRef
     * @param {?} _renderer
     * @param {?} _injector
     * @param {?} componentFactoryResolver
     * @param {?} config
     * @param {?} ngZone
     * @param {?} _live
     */
    constructor(_elementRef, _viewContainerRef, _renderer, _injector, componentFactoryResolver, config, ngZone, _live) {
        this._elementRef = _elementRef;
        this._viewContainerRef = _viewContainerRef;
        this._renderer = _renderer;
        this._injector = _injector;
        this._live = _live;
        /**
         * Value for the configurable autocomplete attribute.
         * Defaults to 'off' to disable the native browser autocomplete, but this standard value does not seem
         * to be always correctly taken into account.
         *
         * \@since 2.1.0
         */
        this.autocomplete = 'off';
        /**
         * Placement of a typeahead accepts:
         *    "top", "top-left", "top-right", "bottom", "bottom-left", "bottom-right",
         *    "left", "left-top", "left-bottom", "right", "right-top", "right-bottom"
         * and array of above values.
         */
        this.placement = 'bottom-left';
        /**
         * An event emitted when a match is selected. Event payload is of type NgbTypeaheadSelectItemEvent.
         */
        this.selectItem = new EventEmitter();
        this.popupId = `ngb-typeahead-${nextWindowId++}`;
        this._onTouched = () => { };
        this._onChange = (_) => { };
        this.container = config.container;
        this.editable = config.editable;
        this.focusFirst = config.focusFirst;
        this.showHint = config.showHint;
        this.placement = config.placement;
        this._valueChanges = fromEvent(_elementRef.nativeElement, 'input')
            .pipe(map($event => (/** @type {?} */ ($event.target)).value));
        this._resubscribeTypeahead = new BehaviorSubject(null);
        this._popupService = new PopupService(NgbTypeaheadWindow, _injector, _viewContainerRef, _renderer, componentFactoryResolver);
        this._zoneSubscription = ngZone.onStable.subscribe(() => {
            if (this.isPopupOpen()) {
                positionElements(this._elementRef.nativeElement, this._windowRef.location.nativeElement, this.placement, this.container === 'body');
            }
        });
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        /** @type {?} */
        const inputValues$ = this._valueChanges.pipe(tap(value => {
            this._inputValueBackup = value;
            if (this.editable) {
                this._onChange(value);
            }
        }));
        /** @type {?} */
        const results$ = inputValues$.pipe(this.ngbTypeahead);
        /** @type {?} */
        const processedResults$ = results$.pipe(tap(() => {
            if (!this.editable) {
                this._onChange(undefined);
            }
        }));
        /** @type {?} */
        const userInput$ = this._resubscribeTypeahead.pipe(switchMap(() => processedResults$));
        this._subscription = this._subscribeToUserInput(userInput$);
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        this._closePopup();
        this._unsubscribeFromUserInput();
        this._zoneSubscription.unsubscribe();
    }
    /**
     * @param {?} fn
     * @return {?}
     */
    registerOnChange(fn) { this._onChange = fn; }
    /**
     * @param {?} fn
     * @return {?}
     */
    registerOnTouched(fn) { this._onTouched = fn; }
    /**
     * @param {?} value
     * @return {?}
     */
    writeValue(value) { this._writeInputValue(this._formatItemForInput(value)); }
    /**
     * @param {?} isDisabled
     * @return {?}
     */
    setDisabledState(isDisabled) {
        this._renderer.setProperty(this._elementRef.nativeElement, 'disabled', isDisabled);
    }
    /**
     * @param {?} event
     * @return {?}
     */
    onDocumentClick(event) {
        if (event.target !== this._elementRef.nativeElement) {
            this.dismissPopup();
        }
    }
    /**
     * Dismisses typeahead popup window
     * @return {?}
     */
    dismissPopup() {
        if (this.isPopupOpen()) {
            this._closePopup();
            this._writeInputValue(this._inputValueBackup);
        }
    }
    /**
     * Returns true if the typeahead popup window is displayed
     * @return {?}
     */
    isPopupOpen() { return this._windowRef != null; }
    /**
     * @return {?}
     */
    handleBlur() {
        this._resubscribeTypeahead.next(null);
        this._onTouched();
    }
    /**
     * @param {?} event
     * @return {?}
     */
    handleKeyDown(event) {
        if (!this.isPopupOpen()) {
            return;
        }
        if (Key[toString(event.which)]) {
            switch (event.which) {
                case Key.ArrowDown:
                    event.preventDefault();
                    this._windowRef.instance.next();
                    this._showHint();
                    break;
                case Key.ArrowUp:
                    event.preventDefault();
                    this._windowRef.instance.prev();
                    this._showHint();
                    break;
                case Key.Enter:
                case Key.Tab:
                    /** @type {?} */
                    const result = this._windowRef.instance.getActive();
                    if (isDefined(result)) {
                        event.preventDefault();
                        event.stopPropagation();
                        this._selectResult(result);
                    }
                    this._closePopup();
                    break;
                case Key.Escape:
                    event.preventDefault();
                    this._resubscribeTypeahead.next(null);
                    this.dismissPopup();
                    break;
            }
        }
    }
    /**
     * @return {?}
     */
    _openPopup() {
        if (!this.isPopupOpen()) {
            this._inputValueBackup = this._elementRef.nativeElement.value;
            this._windowRef = this._popupService.open();
            this._windowRef.instance.id = this.popupId;
            this._windowRef.instance.selectEvent.subscribe((result) => this._selectResultClosePopup(result));
            this._windowRef.instance.activeChangeEvent.subscribe((activeId) => this.activeDescendant = activeId);
            if (this.container === 'body') {
                window.document.querySelector(this.container).appendChild(this._windowRef.location.nativeElement);
            }
        }
    }
    /**
     * @return {?}
     */
    _closePopup() {
        this._popupService.close();
        this._windowRef = null;
        this.activeDescendant = undefined;
    }
    /**
     * @param {?} result
     * @return {?}
     */
    _selectResult(result) {
        /** @type {?} */
        let defaultPrevented = false;
        this.selectItem.emit({ item: result, preventDefault: () => { defaultPrevented = true; } });
        this._resubscribeTypeahead.next(null);
        if (!defaultPrevented) {
            this.writeValue(result);
            this._onChange(result);
        }
    }
    /**
     * @param {?} result
     * @return {?}
     */
    _selectResultClosePopup(result) {
        this._selectResult(result);
        this._closePopup();
    }
    /**
     * @return {?}
     */
    _showHint() {
        if (this.showHint && this._windowRef.instance.hasActive() && this._inputValueBackup != null) {
            /** @type {?} */
            const userInputLowerCase = this._inputValueBackup.toLowerCase();
            /** @type {?} */
            const formattedVal = this._formatItemForInput(this._windowRef.instance.getActive());
            if (userInputLowerCase === formattedVal.substr(0, this._inputValueBackup.length).toLowerCase()) {
                this._writeInputValue(this._inputValueBackup + formattedVal.substr(this._inputValueBackup.length));
                this._elementRef.nativeElement['setSelectionRange'].apply(this._elementRef.nativeElement, [this._inputValueBackup.length, formattedVal.length]);
            }
            else {
                this.writeValue(this._windowRef.instance.getActive());
            }
        }
    }
    /**
     * @param {?} item
     * @return {?}
     */
    _formatItemForInput(item) {
        return item != null && this.inputFormatter ? this.inputFormatter(item) : toString(item);
    }
    /**
     * @param {?} value
     * @return {?}
     */
    _writeInputValue(value) {
        this._renderer.setProperty(this._elementRef.nativeElement, 'value', toString(value));
    }
    /**
     * @param {?} userInput$
     * @return {?}
     */
    _subscribeToUserInput(userInput$) {
        return userInput$.subscribe((results) => {
            if (!results || results.length === 0) {
                this._closePopup();
            }
            else {
                this._openPopup();
                this._windowRef.instance.focusFirst = this.focusFirst;
                this._windowRef.instance.results = results;
                this._windowRef.instance.term = this._elementRef.nativeElement.value;
                if (this.resultFormatter) {
                    this._windowRef.instance.formatter = this.resultFormatter;
                }
                if (this.resultTemplate) {
                    this._windowRef.instance.resultTemplate = this.resultTemplate;
                }
                this._windowRef.instance.resetActive();
                // The observable stream we are subscribing to might have async steps
                // and if a component containing typeahead is using the OnPush strategy
                // the change detection turn wouldn't be invoked automatically.
                this._windowRef.changeDetectorRef.detectChanges();
                this._showHint();
            }
            /** @type {?} */
            const count = results ? results.length : 0;
            this._live.say(count === 0 ? 'No results available' : `${count} result${count === 1 ? '' : 's'} available`);
        });
    }
    /**
     * @return {?}
     */
    _unsubscribeFromUserInput() {
        if (this._subscription) {
            this._subscription.unsubscribe();
        }
        this._subscription = null;
    }
}
NgbTypeahead.decorators = [
    { type: Directive, args: [{
                selector: 'input[ngbTypeahead]',
                exportAs: 'ngbTypeahead',
                host: {
                    '(blur)': 'handleBlur()',
                    '[class.open]': 'isPopupOpen()',
                    '(document:click)': 'onDocumentClick($event)',
                    '(keydown)': 'handleKeyDown($event)',
                    '[autocomplete]': 'autocomplete',
                    'autocapitalize': 'off',
                    'autocorrect': 'off',
                    'role': 'combobox',
                    'aria-multiline': 'false',
                    '[attr.aria-autocomplete]': 'showHint ? "both" : "list"',
                    '[attr.aria-activedescendant]': 'activeDescendant',
                    '[attr.aria-owns]': 'isPopupOpen() ? popupId : null',
                    '[attr.aria-expanded]': 'isPopupOpen()'
                },
                providers: [NGB_TYPEAHEAD_VALUE_ACCESSOR]
            },] },
];
/** @nocollapse */
NgbTypeahead.ctorParameters = () => [
    { type: ElementRef },
    { type: ViewContainerRef },
    { type: Renderer2 },
    { type: Injector },
    { type: ComponentFactoryResolver },
    { type: NgbTypeaheadConfig },
    { type: NgZone },
    { type: Live }
];
NgbTypeahead.propDecorators = {
    autocomplete: [{ type: Input }],
    container: [{ type: Input }],
    editable: [{ type: Input }],
    focusFirst: [{ type: Input }],
    inputFormatter: [{ type: Input }],
    ngbTypeahead: [{ type: Input }],
    resultFormatter: [{ type: Input }],
    resultTemplate: [{ type: Input }],
    showHint: [{ type: Input }],
    placement: [{ type: Input }],
    selectItem: [{ type: Output }]
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
class NgbTypeaheadModule {
    /**
     * Importing with '.forRoot()' is no longer necessary, you can simply import the module.
     * Will be removed in 4.0.0.
     *
     * @deprecated 3.0.0
     * @return {?}
     */
    static forRoot() { return { ngModule: NgbTypeaheadModule }; }
}
NgbTypeaheadModule.decorators = [
    { type: NgModule, args: [{
                declarations: [NgbTypeahead, NgbHighlight, NgbTypeaheadWindow],
                exports: [NgbTypeahead, NgbHighlight],
                imports: [CommonModule],
                entryComponents: [NgbTypeaheadWindow]
            },] },
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
/** @type {?} */
const NGB_MODULES = [
    NgbAccordionModule, NgbAlertModule, NgbButtonsModule, NgbCarouselModule, NgbCollapseModule, NgbDatepickerModule,
    NgbDropdownModule, NgbModalModule, NgbPaginationModule, NgbPopoverModule, NgbProgressbarModule, NgbRatingModule,
    NgbTabsetModule, NgbTimepickerModule, NgbTooltipModule, NgbTypeaheadModule
];
class NgbModule {
    /**
     * Importing with '.forRoot()' is no longer necessary, you can simply import the module.
     * Will be removed in 4.0.0.
     *
     * @deprecated 3.0.0
     * @return {?}
     */
    static forRoot() { return { ngModule: NgbModule }; }
}
NgbModule.decorators = [
    { type: NgModule, args: [{ imports: NGB_MODULES, exports: NGB_MODULES },] },
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */

export { NgbAccordionModule, NgbAccordionConfig, NgbAccordion, NgbPanel, NgbPanelTitle, NgbPanelContent, NgbAlertModule, NgbAlertConfig, NgbAlert, NgbButtonsModule, NgbCheckBox, NgbRadioGroup, NgbCarouselModule, NgbCarouselConfig, NgbCarousel, NgbSlide, NgbCollapseModule, NgbCollapse, NgbCalendar, NgbCalendarIslamicCivil, NgbCalendarIslamicUmalqura, NgbCalendarHebrew, NgbCalendarPersian, NgbDatepickerModule, NgbDatepickerI18n, NgbDatepickerI18nHebrew, NgbDatepickerConfig, NgbDate, NgbDateParserFormatter, NgbDateAdapter, NgbDateNativeAdapter, NgbDateNativeUTCAdapter, NgbDatepicker, NgbInputDatepicker, NgbDropdownModule, NgbDropdownConfig, NgbDropdown, NgbModalModule, NgbModal, NgbModalConfig, NgbActiveModal, NgbModalRef, ModalDismissReasons, NgbPaginationModule, NgbPaginationConfig, NgbPagination, NgbPopoverModule, NgbPopoverConfig, NgbPopover, NgbProgressbarModule, NgbProgressbarConfig, NgbProgressbar, NgbRatingModule, NgbRatingConfig, NgbRating, NgbTabsetModule, NgbTabsetConfig, NgbTabset, NgbTab, NgbTabContent, NgbTabTitle, NgbTimepickerModule, NgbTimepickerConfig, NgbTimepicker, NgbTimeAdapter, NgbTooltipModule, NgbTooltipConfig, NgbTooltip, NgbHighlight, NgbTypeaheadModule, NgbTypeaheadConfig, NgbTypeahead, NgbModule, NgbButtonLabel as ɵa, NgbRadio as ɵb, NGB_CAROUSEL_DIRECTIVES as ɵc, NGB_DATEPICKER_DATE_ADAPTER_FACTORY as ɵl, NgbDateStructAdapter as ɵm, NgbDatepickerDayView as ɵg, NGB_DATEPICKER_18N_FACTORY as ɵj, NgbDatepickerI18nDefault as ɵk, NgbDatepickerKeyMapService as ɵz, NgbDatepickerMonthView as ɵf, NgbDatepickerNavigation as ɵh, NgbDatepickerNavigationSelect as ɵi, NgbDatepickerService as ɵy, NgbCalendarHijri as ɵbh, NGB_DATEPICKER_CALENDAR_FACTORY as ɵd, NgbCalendarGregorian as ɵe, NGB_DATEPICKER_PARSER_FORMATTER_FACTORY as ɵn, NgbDateISOParserFormatter as ɵo, NgbDropdownAnchor as ɵr, NgbDropdownItem as ɵp, NgbDropdownMenu as ɵq, NgbDropdownToggle as ɵs, NgbModalBackdrop as ɵba, NgbModalStack as ɵbc, NgbModalWindow as ɵbb, NgbPopoverWindow as ɵt, NGB_DATEPICKER_TIME_ADAPTER_FACTORY as ɵu, NgbTimeStructAdapter as ɵv, NgbTooltipWindow as ɵw, NgbTypeaheadWindow as ɵx, ARIA_LIVE_DELAY as ɵbe, ARIA_LIVE_DELAY_FACTORY as ɵbf, Live as ɵbg, ContentRef as ɵbi, ScrollBar as ɵbd };

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmctYm9vdHN0cmFwLmpzLm1hcCIsInNvdXJjZXMiOlsibmc6Ly9AbmctYm9vdHN0cmFwL25nLWJvb3RzdHJhcC91dGlsL3V0aWwudHMiLCJuZzovL0BuZy1ib290c3RyYXAvbmctYm9vdHN0cmFwL2FjY29yZGlvbi9hY2NvcmRpb24tY29uZmlnLnRzIiwibmc6Ly9AbmctYm9vdHN0cmFwL25nLWJvb3RzdHJhcC9hY2NvcmRpb24vYWNjb3JkaW9uLnRzIiwibmc6Ly9AbmctYm9vdHN0cmFwL25nLWJvb3RzdHJhcC9hY2NvcmRpb24vYWNjb3JkaW9uLm1vZHVsZS50cyIsIm5nOi8vQG5nLWJvb3RzdHJhcC9uZy1ib290c3RyYXAvYWxlcnQvYWxlcnQtY29uZmlnLnRzIiwibmc6Ly9AbmctYm9vdHN0cmFwL25nLWJvb3RzdHJhcC9hbGVydC9hbGVydC50cyIsIm5nOi8vQG5nLWJvb3RzdHJhcC9uZy1ib290c3RyYXAvYWxlcnQvYWxlcnQubW9kdWxlLnRzIiwibmc6Ly9AbmctYm9vdHN0cmFwL25nLWJvb3RzdHJhcC9idXR0b25zL2xhYmVsLnRzIiwibmc6Ly9AbmctYm9vdHN0cmFwL25nLWJvb3RzdHJhcC9idXR0b25zL2NoZWNrYm94LnRzIiwibmc6Ly9AbmctYm9vdHN0cmFwL25nLWJvb3RzdHJhcC9idXR0b25zL3JhZGlvLnRzIiwibmc6Ly9AbmctYm9vdHN0cmFwL25nLWJvb3RzdHJhcC9idXR0b25zL2J1dHRvbnMubW9kdWxlLnRzIiwibmc6Ly9AbmctYm9vdHN0cmFwL25nLWJvb3RzdHJhcC9jYXJvdXNlbC9jYXJvdXNlbC1jb25maWcudHMiLCJuZzovL0BuZy1ib290c3RyYXAvbmctYm9vdHN0cmFwL2Nhcm91c2VsL2Nhcm91c2VsLnRzIiwibmc6Ly9AbmctYm9vdHN0cmFwL25nLWJvb3RzdHJhcC9jYXJvdXNlbC9jYXJvdXNlbC5tb2R1bGUudHMiLCJuZzovL0BuZy1ib290c3RyYXAvbmctYm9vdHN0cmFwL2NvbGxhcHNlL2NvbGxhcHNlLnRzIiwibmc6Ly9AbmctYm9vdHN0cmFwL25nLWJvb3RzdHJhcC9jb2xsYXBzZS9jb2xsYXBzZS5tb2R1bGUudHMiLCJuZzovL0BuZy1ib290c3RyYXAvbmctYm9vdHN0cmFwL2RhdGVwaWNrZXIvbmdiLWRhdGUudHMiLCJuZzovL0BuZy1ib290c3RyYXAvbmctYm9vdHN0cmFwL2RhdGVwaWNrZXIvbmdiLWNhbGVuZGFyLnRzIiwibmc6Ly9AbmctYm9vdHN0cmFwL25nLWJvb3RzdHJhcC9kYXRlcGlja2VyL2RhdGVwaWNrZXItdG9vbHMudHMiLCJuZzovL0BuZy1ib290c3RyYXAvbmctYm9vdHN0cmFwL2RhdGVwaWNrZXIvZGF0ZXBpY2tlci1pMThuLnRzIiwibmc6Ly9AbmctYm9vdHN0cmFwL25nLWJvb3RzdHJhcC9kYXRlcGlja2VyL2RhdGVwaWNrZXItc2VydmljZS50cyIsIm5nOi8vQG5nLWJvb3RzdHJhcC9uZy1ib290c3RyYXAvdXRpbC9rZXkudHMiLCJuZzovL0BuZy1ib290c3RyYXAvbmctYm9vdHN0cmFwL2RhdGVwaWNrZXIvZGF0ZXBpY2tlci1rZXltYXAtc2VydmljZS50cyIsIm5nOi8vQG5nLWJvb3RzdHJhcC9uZy1ib290c3RyYXAvZGF0ZXBpY2tlci9kYXRlcGlja2VyLXZpZXctbW9kZWwudHMiLCJuZzovL0BuZy1ib290c3RyYXAvbmctYm9vdHN0cmFwL2RhdGVwaWNrZXIvZGF0ZXBpY2tlci1jb25maWcudHMiLCJuZzovL0BuZy1ib290c3RyYXAvbmctYm9vdHN0cmFwL2RhdGVwaWNrZXIvYWRhcHRlcnMvbmdiLWRhdGUtYWRhcHRlci50cyIsIm5nOi8vQG5nLWJvb3RzdHJhcC9uZy1ib290c3RyYXAvZGF0ZXBpY2tlci9kYXRlcGlja2VyLnRzIiwibmc6Ly9AbmctYm9vdHN0cmFwL25nLWJvb3RzdHJhcC9kYXRlcGlja2VyL2RhdGVwaWNrZXItbW9udGgtdmlldy50cyIsIm5nOi8vQG5nLWJvb3RzdHJhcC9uZy1ib290c3RyYXAvZGF0ZXBpY2tlci9kYXRlcGlja2VyLW5hdmlnYXRpb24udHMiLCJuZzovL0BuZy1ib290c3RyYXAvbmctYm9vdHN0cmFwL2RhdGVwaWNrZXIvbmdiLWRhdGUtcGFyc2VyLWZvcm1hdHRlci50cyIsIm5nOi8vQG5nLWJvb3RzdHJhcC9uZy1ib290c3RyYXAvdXRpbC9wb3NpdGlvbmluZy50cyIsIm5nOi8vQG5nLWJvb3RzdHJhcC9uZy1ib290c3RyYXAvdXRpbC9mb2N1cy10cmFwLnRzIiwibmc6Ly9AbmctYm9vdHN0cmFwL25nLWJvb3RzdHJhcC9kYXRlcGlja2VyL2RhdGVwaWNrZXItaW5wdXQudHMiLCJuZzovL0BuZy1ib290c3RyYXAvbmctYm9vdHN0cmFwL2RhdGVwaWNrZXIvZGF0ZXBpY2tlci1kYXktdmlldy50cyIsIm5nOi8vQG5nLWJvb3RzdHJhcC9uZy1ib290c3RyYXAvZGF0ZXBpY2tlci9kYXRlcGlja2VyLW5hdmlnYXRpb24tc2VsZWN0LnRzIiwibmc6Ly9AbmctYm9vdHN0cmFwL25nLWJvb3RzdHJhcC9kYXRlcGlja2VyL2hpanJpL25nYi1jYWxlbmRhci1oaWpyaS50cyIsIm5nOi8vQG5nLWJvb3RzdHJhcC9uZy1ib290c3RyYXAvZGF0ZXBpY2tlci9oaWpyaS9uZ2ItY2FsZW5kYXItaXNsYW1pYy1jaXZpbC50cyIsIm5nOi8vQG5nLWJvb3RzdHJhcC9uZy1ib290c3RyYXAvZGF0ZXBpY2tlci9oaWpyaS9uZ2ItY2FsZW5kYXItaXNsYW1pYy11bWFscXVyYS50cyIsIm5nOi8vQG5nLWJvb3RzdHJhcC9uZy1ib290c3RyYXAvZGF0ZXBpY2tlci9qYWxhbGkvamFsYWxpLnRzIiwibmc6Ly9AbmctYm9vdHN0cmFwL25nLWJvb3RzdHJhcC9kYXRlcGlja2VyL2phbGFsaS9uZ2ItY2FsZW5kYXItcGVyc2lhbi50cyIsIm5nOi8vQG5nLWJvb3RzdHJhcC9uZy1ib290c3RyYXAvZGF0ZXBpY2tlci9oZWJyZXcvaGVicmV3LnRzIiwibmc6Ly9AbmctYm9vdHN0cmFwL25nLWJvb3RzdHJhcC9kYXRlcGlja2VyL2hlYnJldy9uZ2ItY2FsZW5kYXItaGVicmV3LnRzIiwibmc6Ly9AbmctYm9vdHN0cmFwL25nLWJvb3RzdHJhcC9kYXRlcGlja2VyL2hlYnJldy9kYXRlcGlja2VyLWkxOG4taGVicmV3LnRzIiwibmc6Ly9AbmctYm9vdHN0cmFwL25nLWJvb3RzdHJhcC9kYXRlcGlja2VyL2FkYXB0ZXJzL25nYi1kYXRlLW5hdGl2ZS1hZGFwdGVyLnRzIiwibmc6Ly9AbmctYm9vdHN0cmFwL25nLWJvb3RzdHJhcC9kYXRlcGlja2VyL2FkYXB0ZXJzL25nYi1kYXRlLW5hdGl2ZS11dGMtYWRhcHRlci50cyIsIm5nOi8vQG5nLWJvb3RzdHJhcC9uZy1ib290c3RyYXAvZGF0ZXBpY2tlci9kYXRlcGlja2VyLm1vZHVsZS50cyIsIm5nOi8vQG5nLWJvb3RzdHJhcC9uZy1ib290c3RyYXAvZHJvcGRvd24vZHJvcGRvd24tY29uZmlnLnRzIiwibmc6Ly9AbmctYm9vdHN0cmFwL25nLWJvb3RzdHJhcC9kcm9wZG93bi9kcm9wZG93bi50cyIsIm5nOi8vQG5nLWJvb3RzdHJhcC9uZy1ib290c3RyYXAvZHJvcGRvd24vZHJvcGRvd24ubW9kdWxlLnRzIiwibmc6Ly9AbmctYm9vdHN0cmFwL25nLWJvb3RzdHJhcC9tb2RhbC9tb2RhbC1iYWNrZHJvcC50cyIsIm5nOi8vQG5nLWJvb3RzdHJhcC9uZy1ib290c3RyYXAvbW9kYWwvbW9kYWwtZGlzbWlzcy1yZWFzb25zLnRzIiwibmc6Ly9AbmctYm9vdHN0cmFwL25nLWJvb3RzdHJhcC9tb2RhbC9tb2RhbC13aW5kb3cudHMiLCJuZzovL0BuZy1ib290c3RyYXAvbmctYm9vdHN0cmFwL21vZGFsL21vZGFsLWNvbmZpZy50cyIsIm5nOi8vQG5nLWJvb3RzdHJhcC9uZy1ib290c3RyYXAvdXRpbC9wb3B1cC50cyIsIm5nOi8vQG5nLWJvb3RzdHJhcC9uZy1ib290c3RyYXAvdXRpbC9zY3JvbGxiYXIudHMiLCJuZzovL0BuZy1ib290c3RyYXAvbmctYm9vdHN0cmFwL21vZGFsL21vZGFsLXJlZi50cyIsIm5nOi8vQG5nLWJvb3RzdHJhcC9uZy1ib290c3RyYXAvbW9kYWwvbW9kYWwtc3RhY2sudHMiLCJuZzovL0BuZy1ib290c3RyYXAvbmctYm9vdHN0cmFwL21vZGFsL21vZGFsLnRzIiwibmc6Ly9AbmctYm9vdHN0cmFwL25nLWJvb3RzdHJhcC9tb2RhbC9tb2RhbC5tb2R1bGUudHMiLCJuZzovL0BuZy1ib290c3RyYXAvbmctYm9vdHN0cmFwL3BhZ2luYXRpb24vcGFnaW5hdGlvbi1jb25maWcudHMiLCJuZzovL0BuZy1ib290c3RyYXAvbmctYm9vdHN0cmFwL3BhZ2luYXRpb24vcGFnaW5hdGlvbi50cyIsIm5nOi8vQG5nLWJvb3RzdHJhcC9uZy1ib290c3RyYXAvcGFnaW5hdGlvbi9wYWdpbmF0aW9uLm1vZHVsZS50cyIsIm5nOi8vQG5nLWJvb3RzdHJhcC9uZy1ib290c3RyYXAvdXRpbC90cmlnZ2Vycy50cyIsIm5nOi8vQG5nLWJvb3RzdHJhcC9uZy1ib290c3RyYXAvcG9wb3Zlci9wb3BvdmVyLWNvbmZpZy50cyIsIm5nOi8vQG5nLWJvb3RzdHJhcC9uZy1ib290c3RyYXAvcG9wb3Zlci9wb3BvdmVyLnRzIiwibmc6Ly9AbmctYm9vdHN0cmFwL25nLWJvb3RzdHJhcC9wb3BvdmVyL3BvcG92ZXIubW9kdWxlLnRzIiwibmc6Ly9AbmctYm9vdHN0cmFwL25nLWJvb3RzdHJhcC9wcm9ncmVzc2Jhci9wcm9ncmVzc2Jhci1jb25maWcudHMiLCJuZzovL0BuZy1ib290c3RyYXAvbmctYm9vdHN0cmFwL3Byb2dyZXNzYmFyL3Byb2dyZXNzYmFyLnRzIiwibmc6Ly9AbmctYm9vdHN0cmFwL25nLWJvb3RzdHJhcC9wcm9ncmVzc2Jhci9wcm9ncmVzc2Jhci5tb2R1bGUudHMiLCJuZzovL0BuZy1ib290c3RyYXAvbmctYm9vdHN0cmFwL3JhdGluZy9yYXRpbmctY29uZmlnLnRzIiwibmc6Ly9AbmctYm9vdHN0cmFwL25nLWJvb3RzdHJhcC9yYXRpbmcvcmF0aW5nLnRzIiwibmc6Ly9AbmctYm9vdHN0cmFwL25nLWJvb3RzdHJhcC9yYXRpbmcvcmF0aW5nLm1vZHVsZS50cyIsIm5nOi8vQG5nLWJvb3RzdHJhcC9uZy1ib290c3RyYXAvdGFic2V0L3RhYnNldC1jb25maWcudHMiLCJuZzovL0BuZy1ib290c3RyYXAvbmctYm9vdHN0cmFwL3RhYnNldC90YWJzZXQudHMiLCJuZzovL0BuZy1ib290c3RyYXAvbmctYm9vdHN0cmFwL3RhYnNldC90YWJzZXQubW9kdWxlLnRzIiwibmc6Ly9AbmctYm9vdHN0cmFwL25nLWJvb3RzdHJhcC90aW1lcGlja2VyL25nYi10aW1lLnRzIiwibmc6Ly9AbmctYm9vdHN0cmFwL25nLWJvb3RzdHJhcC90aW1lcGlja2VyL3RpbWVwaWNrZXItY29uZmlnLnRzIiwibmc6Ly9AbmctYm9vdHN0cmFwL25nLWJvb3RzdHJhcC90aW1lcGlja2VyL25nYi10aW1lLWFkYXB0ZXIudHMiLCJuZzovL0BuZy1ib290c3RyYXAvbmctYm9vdHN0cmFwL3RpbWVwaWNrZXIvdGltZXBpY2tlci50cyIsIm5nOi8vQG5nLWJvb3RzdHJhcC9uZy1ib290c3RyYXAvdGltZXBpY2tlci90aW1lcGlja2VyLm1vZHVsZS50cyIsIm5nOi8vQG5nLWJvb3RzdHJhcC9uZy1ib290c3RyYXAvdG9vbHRpcC90b29sdGlwLWNvbmZpZy50cyIsIm5nOi8vQG5nLWJvb3RzdHJhcC9uZy1ib290c3RyYXAvdG9vbHRpcC90b29sdGlwLnRzIiwibmc6Ly9AbmctYm9vdHN0cmFwL25nLWJvb3RzdHJhcC90b29sdGlwL3Rvb2x0aXAubW9kdWxlLnRzIiwibmc6Ly9AbmctYm9vdHN0cmFwL25nLWJvb3RzdHJhcC90eXBlYWhlYWQvaGlnaGxpZ2h0LnRzIiwibmc6Ly9AbmctYm9vdHN0cmFwL25nLWJvb3RzdHJhcC90eXBlYWhlYWQvdHlwZWFoZWFkLXdpbmRvdy50cyIsIm5nOi8vQG5nLWJvb3RzdHJhcC9uZy1ib290c3RyYXAvdXRpbC9hY2Nlc3NpYmlsaXR5L2xpdmUudHMiLCJuZzovL0BuZy1ib290c3RyYXAvbmctYm9vdHN0cmFwL3R5cGVhaGVhZC90eXBlYWhlYWQtY29uZmlnLnRzIiwibmc6Ly9AbmctYm9vdHN0cmFwL25nLWJvb3RzdHJhcC90eXBlYWhlYWQvdHlwZWFoZWFkLnRzIiwibmc6Ly9AbmctYm9vdHN0cmFwL25nLWJvb3RzdHJhcC90eXBlYWhlYWQvdHlwZWFoZWFkLm1vZHVsZS50cyIsIm5nOi8vQG5nLWJvb3RzdHJhcC9uZy1ib290c3RyYXAvaW5kZXgudHMiXSwic291cmNlc0NvbnRlbnQiOlsiZXhwb3J0IGZ1bmN0aW9uIHRvSW50ZWdlcih2YWx1ZTogYW55KTogbnVtYmVyIHtcclxuICByZXR1cm4gcGFyc2VJbnQoYCR7dmFsdWV9YCwgMTApO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gdG9TdHJpbmcodmFsdWU6IGFueSk6IHN0cmluZyB7XHJcbiAgcmV0dXJuICh2YWx1ZSAhPT0gdW5kZWZpbmVkICYmIHZhbHVlICE9PSBudWxsKSA/IGAke3ZhbHVlfWAgOiAnJztcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGdldFZhbHVlSW5SYW5nZSh2YWx1ZTogbnVtYmVyLCBtYXg6IG51bWJlciwgbWluID0gMCk6IG51bWJlciB7XHJcbiAgcmV0dXJuIE1hdGgubWF4KE1hdGgubWluKHZhbHVlLCBtYXgpLCBtaW4pO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gaXNTdHJpbmcodmFsdWU6IGFueSk6IHZhbHVlIGlzIHN0cmluZyB7XHJcbiAgcmV0dXJuIHR5cGVvZiB2YWx1ZSA9PT0gJ3N0cmluZyc7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBpc051bWJlcih2YWx1ZTogYW55KTogdmFsdWUgaXMgbnVtYmVyIHtcclxuICByZXR1cm4gIWlzTmFOKHRvSW50ZWdlcih2YWx1ZSkpO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gaXNJbnRlZ2VyKHZhbHVlOiBhbnkpOiB2YWx1ZSBpcyBudW1iZXIge1xyXG4gIHJldHVybiB0eXBlb2YgdmFsdWUgPT09ICdudW1iZXInICYmIGlzRmluaXRlKHZhbHVlKSAmJiBNYXRoLmZsb29yKHZhbHVlKSA9PT0gdmFsdWU7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBpc0RlZmluZWQodmFsdWU6IGFueSk6IGJvb2xlYW4ge1xyXG4gIHJldHVybiB2YWx1ZSAhPT0gdW5kZWZpbmVkICYmIHZhbHVlICE9PSBudWxsO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gcGFkTnVtYmVyKHZhbHVlOiBudW1iZXIpIHtcclxuICBpZiAoaXNOdW1iZXIodmFsdWUpKSB7XHJcbiAgICByZXR1cm4gYDAke3ZhbHVlfWAuc2xpY2UoLTIpO1xyXG4gIH0gZWxzZSB7XHJcbiAgICByZXR1cm4gJyc7XHJcbiAgfVxyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gcmVnRXhwRXNjYXBlKHRleHQpIHtcclxuICByZXR1cm4gdGV4dC5yZXBsYWNlKC9bLVtcXF17fSgpKis/LixcXFxcXiR8I1xcc10vZywgJ1xcXFwkJicpO1xyXG59XHJcbiIsImltcG9ydCB7SW5qZWN0YWJsZX0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcblxyXG4vKipcclxuICogQ29uZmlndXJhdGlvbiBzZXJ2aWNlIGZvciB0aGUgTmdiQWNjb3JkaW9uIGNvbXBvbmVudC5cclxuICogWW91IGNhbiBpbmplY3QgdGhpcyBzZXJ2aWNlLCB0eXBpY2FsbHkgaW4geW91ciByb290IGNvbXBvbmVudCwgYW5kIGN1c3RvbWl6ZSB0aGUgdmFsdWVzIG9mIGl0cyBwcm9wZXJ0aWVzIGluXHJcbiAqIG9yZGVyIHRvIHByb3ZpZGUgZGVmYXVsdCB2YWx1ZXMgZm9yIGFsbCB0aGUgYWNjb3JkaW9ucyB1c2VkIGluIHRoZSBhcHBsaWNhdGlvbi5cclxuICovXHJcbkBJbmplY3RhYmxlKHtwcm92aWRlZEluOiAncm9vdCd9KVxyXG5leHBvcnQgY2xhc3MgTmdiQWNjb3JkaW9uQ29uZmlnIHtcclxuICBjbG9zZU90aGVycyA9IGZhbHNlO1xyXG4gIHR5cGU6IHN0cmluZztcclxufVxyXG4iLCJpbXBvcnQge1xyXG4gIEFmdGVyQ29udGVudENoZWNrZWQsXHJcbiAgQ29tcG9uZW50LFxyXG4gIENvbnRlbnRDaGlsZHJlbixcclxuICBEaXJlY3RpdmUsXHJcbiAgRXZlbnRFbWl0dGVyLFxyXG4gIElucHV0LFxyXG4gIE91dHB1dCxcclxuICBRdWVyeUxpc3QsXHJcbiAgVGVtcGxhdGVSZWZcclxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuXHJcbmltcG9ydCB7aXNTdHJpbmd9IGZyb20gJy4uL3V0aWwvdXRpbCc7XHJcblxyXG5pbXBvcnQge05nYkFjY29yZGlvbkNvbmZpZ30gZnJvbSAnLi9hY2NvcmRpb24tY29uZmlnJztcclxuXHJcbmxldCBuZXh0SWQgPSAwO1xyXG5cclxuLyoqXHJcbiAqIFRoaXMgZGlyZWN0aXZlIHNob3VsZCBiZSB1c2VkIHRvIHdyYXAgYWNjb3JkaW9uIHBhbmVsIHRpdGxlcyB0aGF0IG5lZWQgdG8gY29udGFpbiBIVE1MIG1hcmt1cCBvciBvdGhlciBkaXJlY3RpdmVzLlxyXG4gKi9cclxuQERpcmVjdGl2ZSh7c2VsZWN0b3I6ICduZy10ZW1wbGF0ZVtuZ2JQYW5lbFRpdGxlXSd9KVxyXG5leHBvcnQgY2xhc3MgTmdiUGFuZWxUaXRsZSB7XHJcbiAgY29uc3RydWN0b3IocHVibGljIHRlbXBsYXRlUmVmOiBUZW1wbGF0ZVJlZjxhbnk+KSB7fVxyXG59XHJcblxyXG4vKipcclxuICogVGhpcyBkaXJlY3RpdmUgbXVzdCBiZSB1c2VkIHRvIHdyYXAgYWNjb3JkaW9uIHBhbmVsIGNvbnRlbnQuXHJcbiAqL1xyXG5ARGlyZWN0aXZlKHtzZWxlY3RvcjogJ25nLXRlbXBsYXRlW25nYlBhbmVsQ29udGVudF0nfSlcclxuZXhwb3J0IGNsYXNzIE5nYlBhbmVsQ29udGVudCB7XHJcbiAgY29uc3RydWN0b3IocHVibGljIHRlbXBsYXRlUmVmOiBUZW1wbGF0ZVJlZjxhbnk+KSB7fVxyXG59XHJcblxyXG4vKipcclxuICogVGhlIE5nYlBhbmVsIGRpcmVjdGl2ZSByZXByZXNlbnRzIGFuIGluZGl2aWR1YWwgcGFuZWwgd2l0aCB0aGUgdGl0bGUgYW5kIGNvbGxhcHNpYmxlXHJcbiAqIGNvbnRlbnRcclxuICovXHJcbkBEaXJlY3RpdmUoe3NlbGVjdG9yOiAnbmdiLXBhbmVsJ30pXHJcbmV4cG9ydCBjbGFzcyBOZ2JQYW5lbCBpbXBsZW1lbnRzIEFmdGVyQ29udGVudENoZWNrZWQge1xyXG4gIC8qKlxyXG4gICAqICBBIGZsYWcgZGV0ZXJtaW5pbmcgd2hldGhlciB0aGUgcGFuZWwgaXMgZGlzYWJsZWQgb3Igbm90LlxyXG4gICAqICBXaGVuIGRpc2FibGVkLCB0aGUgcGFuZWwgY2Fubm90IGJlIHRvZ2dsZWQuXHJcbiAgICovXHJcbiAgQElucHV0KCkgZGlzYWJsZWQgPSBmYWxzZTtcclxuXHJcbiAgLyoqXHJcbiAgICogIEFuIG9wdGlvbmFsIGlkIGZvciB0aGUgcGFuZWwuIFRoZSBpZCBzaG91bGQgYmUgdW5pcXVlLlxyXG4gICAqICBJZiBub3QgcHJvdmlkZWQsIGl0IHdpbGwgYmUgYXV0by1nZW5lcmF0ZWQuXHJcbiAgICovXHJcbiAgQElucHV0KCkgaWQgPSBgbmdiLXBhbmVsLSR7bmV4dElkKyt9YDtcclxuXHJcbiAgLyoqXHJcbiAgICogQSBmbGFnIHRlbGxpbmcgaWYgdGhlIHBhbmVsIGlzIGN1cnJlbnRseSBvcGVuXHJcbiAgICovXHJcbiAgaXNPcGVuID0gZmFsc2U7XHJcblxyXG4gIC8qKlxyXG4gICAqICBUaGUgdGl0bGUgZm9yIHRoZSBwYW5lbC5cclxuICAgKi9cclxuICBASW5wdXQoKSB0aXRsZTogc3RyaW5nO1xyXG5cclxuICAvKipcclxuICAgKiAgQWNjb3JkaW9uJ3MgdHlwZXMgb2YgcGFuZWxzIHRvIGJlIGFwcGxpZWQgcGVyIHBhbmVsIGJhc2lzLlxyXG4gICAqICBCb290c3RyYXAgcmVjb2duaXplcyB0aGUgZm9sbG93aW5nIHR5cGVzOiBcInByaW1hcnlcIiwgXCJzZWNvbmRhcnlcIiwgXCJzdWNjZXNzXCIsIFwiZGFuZ2VyXCIsIFwid2FybmluZ1wiLCBcImluZm9cIiwgXCJsaWdodFwiXHJcbiAgICogYW5kIFwiZGFya1wiXHJcbiAgICovXHJcbiAgQElucHV0KCkgdHlwZTogc3RyaW5nO1xyXG5cclxuICB0aXRsZVRwbDogTmdiUGFuZWxUaXRsZSB8IG51bGw7XHJcbiAgY29udGVudFRwbDogTmdiUGFuZWxDb250ZW50IHwgbnVsbDtcclxuXHJcbiAgQENvbnRlbnRDaGlsZHJlbihOZ2JQYW5lbFRpdGxlLCB7ZGVzY2VuZGFudHM6IGZhbHNlfSkgdGl0bGVUcGxzOiBRdWVyeUxpc3Q8TmdiUGFuZWxUaXRsZT47XHJcbiAgQENvbnRlbnRDaGlsZHJlbihOZ2JQYW5lbENvbnRlbnQsIHtkZXNjZW5kYW50czogZmFsc2V9KSBjb250ZW50VHBsczogUXVlcnlMaXN0PE5nYlBhbmVsQ29udGVudD47XHJcblxyXG4gIG5nQWZ0ZXJDb250ZW50Q2hlY2tlZCgpIHtcclxuICAgIC8vIFdlIGFyZSB1c2luZyBAQ29udGVudENoaWxkcmVuIGluc3RlYWQgb2YgQENvbnRlbnRDaGlsZCBhcyBpbiB0aGUgQW5ndWxhciB2ZXJzaW9uIGJlaW5nIHVzZWRcclxuICAgIC8vIG9ubHkgQENvbnRlbnRDaGlsZHJlbiBhbGxvd3MgdXMgdG8gc3BlY2lmeSB0aGUge2Rlc2NlbmRhbnRzOiBmYWxzZX0gb3B0aW9uLlxyXG4gICAgLy8gV2l0aG91dCB7ZGVzY2VuZGFudHM6IGZhbHNlfSB3ZSBhcmUgaGl0dGluZyBidWdzIGRlc2NyaWJlZCBpbjpcclxuICAgIC8vIGh0dHBzOi8vZ2l0aHViLmNvbS9uZy1ib290c3RyYXAvbmctYm9vdHN0cmFwL2lzc3Vlcy8yMjQwXHJcbiAgICB0aGlzLnRpdGxlVHBsID0gdGhpcy50aXRsZVRwbHMuZmlyc3Q7XHJcbiAgICB0aGlzLmNvbnRlbnRUcGwgPSB0aGlzLmNvbnRlbnRUcGxzLmZpcnN0O1xyXG4gIH1cclxufVxyXG5cclxuLyoqXHJcbiAqIFRoZSBwYXlsb2FkIG9mIHRoZSBjaGFuZ2UgZXZlbnQgZmlyZWQgcmlnaHQgYmVmb3JlIHRvZ2dsaW5nIGFuIGFjY29yZGlvbiBwYW5lbFxyXG4gKi9cclxuZXhwb3J0IGludGVyZmFjZSBOZ2JQYW5lbENoYW5nZUV2ZW50IHtcclxuICAvKipcclxuICAgKiBJZCBvZiB0aGUgYWNjb3JkaW9uIHBhbmVsIHRoYXQgaXMgdG9nZ2xlZFxyXG4gICAqL1xyXG4gIHBhbmVsSWQ6IHN0cmluZztcclxuXHJcbiAgLyoqXHJcbiAgICogV2hldGhlciB0aGUgcGFuZWwgd2lsbCBiZSBvcGVuZWQgKHRydWUpIG9yIGNsb3NlZCAoZmFsc2UpXHJcbiAgICovXHJcbiAgbmV4dFN0YXRlOiBib29sZWFuO1xyXG5cclxuICAvKipcclxuICAgKiBGdW5jdGlvbiB0aGF0IHdpbGwgcHJldmVudCBwYW5lbCB0b2dnbGluZyBpZiBjYWxsZWRcclxuICAgKi9cclxuICBwcmV2ZW50RGVmYXVsdDogKCkgPT4gdm9pZDtcclxufVxyXG5cclxuLyoqXHJcbiAqIFRoZSBOZ2JBY2NvcmRpb24gZGlyZWN0aXZlIGlzIGEgY29sbGVjdGlvbiBvZiBwYW5lbHMuXHJcbiAqIEl0IGNhbiBhc3N1cmUgdGhhdCBvbmx5IG9uZSBwYW5lbCBjYW4gYmUgb3BlbmVkIGF0IGEgdGltZS5cclxuICovXHJcbkBDb21wb25lbnQoe1xyXG4gIHNlbGVjdG9yOiAnbmdiLWFjY29yZGlvbicsXHJcbiAgZXhwb3J0QXM6ICduZ2JBY2NvcmRpb24nLFxyXG4gIGhvc3Q6IHsnY2xhc3MnOiAnYWNjb3JkaW9uJywgJ3JvbGUnOiAndGFibGlzdCcsICdbYXR0ci5hcmlhLW11bHRpc2VsZWN0YWJsZV0nOiAnIWNsb3NlT3RoZXJQYW5lbHMnfSxcclxuICB0ZW1wbGF0ZTogYFxyXG4gICAgPG5nLXRlbXBsYXRlIG5nRm9yIGxldC1wYW5lbCBbbmdGb3JPZl09XCJwYW5lbHNcIj5cclxuICAgICAgPGRpdiBjbGFzcz1cImNhcmRcIj5cclxuICAgICAgICA8ZGl2IHJvbGU9XCJ0YWJcIiBpZD1cInt7cGFuZWwuaWR9fS1oZWFkZXJcIiBbY2xhc3NdPVwiJ2NhcmQtaGVhZGVyICcgKyAocGFuZWwudHlwZSA/ICdiZy0nK3BhbmVsLnR5cGU6IHR5cGUgPyAnYmctJyt0eXBlIDogJycpXCI+XHJcbiAgICAgICAgICA8aDUgY2xhc3M9XCJtYi0wXCI+XHJcbiAgICAgICAgICAgIDxidXR0b24gY2xhc3M9XCJidG4gYnRuLWxpbmtcIiAoY2xpY2spPVwiISF0b2dnbGUocGFuZWwuaWQpXCIgW2Rpc2FibGVkXT1cInBhbmVsLmRpc2FibGVkXCIgW2NsYXNzLmNvbGxhcHNlZF09XCIhcGFuZWwuaXNPcGVuXCJcclxuICAgICAgICAgICAgICBbYXR0ci5hcmlhLWV4cGFuZGVkXT1cInBhbmVsLmlzT3BlblwiIFthdHRyLmFyaWEtY29udHJvbHNdPVwicGFuZWwuaWRcIj5cclxuICAgICAgICAgICAgICB7e3BhbmVsLnRpdGxlfX08bmctdGVtcGxhdGUgW25nVGVtcGxhdGVPdXRsZXRdPVwicGFuZWwudGl0bGVUcGw/LnRlbXBsYXRlUmVmXCI+PC9uZy10ZW1wbGF0ZT5cclxuICAgICAgICAgICAgPC9idXR0b24+XHJcbiAgICAgICAgICA8L2g1PlxyXG4gICAgICAgIDwvZGl2PlxyXG4gICAgICAgIDxkaXYgaWQ9XCJ7e3BhbmVsLmlkfX1cIiByb2xlPVwidGFicGFuZWxcIiBbYXR0ci5hcmlhLWxhYmVsbGVkYnldPVwicGFuZWwuaWQgKyAnLWhlYWRlcidcIlxyXG4gICAgICAgICAgICAgY2xhc3M9XCJjb2xsYXBzZVwiIFtjbGFzcy5zaG93XT1cInBhbmVsLmlzT3BlblwiICpuZ0lmPVwiIWRlc3Ryb3lPbkhpZGUgfHwgcGFuZWwuaXNPcGVuXCI+XHJcbiAgICAgICAgICA8ZGl2IGNsYXNzPVwiY2FyZC1ib2R5XCI+XHJcbiAgICAgICAgICAgICAgIDxuZy10ZW1wbGF0ZSBbbmdUZW1wbGF0ZU91dGxldF09XCJwYW5lbC5jb250ZW50VHBsPy50ZW1wbGF0ZVJlZlwiPjwvbmctdGVtcGxhdGU+XHJcbiAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICA8L2Rpdj5cclxuICAgICAgPC9kaXY+XHJcbiAgICA8L25nLXRlbXBsYXRlPlxyXG4gIGBcclxufSlcclxuZXhwb3J0IGNsYXNzIE5nYkFjY29yZGlvbiBpbXBsZW1lbnRzIEFmdGVyQ29udGVudENoZWNrZWQge1xyXG4gIEBDb250ZW50Q2hpbGRyZW4oTmdiUGFuZWwpIHBhbmVsczogUXVlcnlMaXN0PE5nYlBhbmVsPjtcclxuXHJcbiAgLyoqXHJcbiAgICogQW4gYXJyYXkgb3IgY29tbWEgc2VwYXJhdGVkIHN0cmluZ3Mgb2YgcGFuZWwgaWRlbnRpZmllcnMgdGhhdCBzaG91bGQgYmUgb3BlbmVkXHJcbiAgICovXHJcbiAgQElucHV0KCkgYWN0aXZlSWRzOiBzdHJpbmcgfCBzdHJpbmdbXSA9IFtdO1xyXG5cclxuICAvKipcclxuICAgKiAgV2hldGhlciB0aGUgb3RoZXIgcGFuZWxzIHNob3VsZCBiZSBjbG9zZWQgd2hlbiBhIHBhbmVsIGlzIG9wZW5lZFxyXG4gICAqL1xyXG4gIEBJbnB1dCgnY2xvc2VPdGhlcnMnKSBjbG9zZU90aGVyUGFuZWxzOiBib29sZWFuO1xyXG5cclxuICAvKipcclxuICAgKiBXaGV0aGVyIHRoZSBjbG9zZWQgcGFuZWxzIHNob3VsZCBiZSBoaWRkZW4gd2l0aG91dCBkZXN0cm95aW5nIHRoZW1cclxuICAgKi9cclxuICBASW5wdXQoKSBkZXN0cm95T25IaWRlID0gdHJ1ZTtcclxuXHJcbiAgLyoqXHJcbiAgICogIEFjY29yZGlvbidzIHR5cGVzIG9mIHBhbmVscyB0byBiZSBhcHBsaWVkIGdsb2JhbGx5LlxyXG4gICAqICBCb290c3RyYXAgcmVjb2duaXplcyB0aGUgZm9sbG93aW5nIHR5cGVzOiBcInByaW1hcnlcIiwgXCJzZWNvbmRhcnlcIiwgXCJzdWNjZXNzXCIsIFwiZGFuZ2VyXCIsIFwid2FybmluZ1wiLCBcImluZm9cIiwgXCJsaWdodFwiXHJcbiAgICogYW5kIFwiZGFya1xyXG4gICAqL1xyXG4gIEBJbnB1dCgpIHR5cGU6IHN0cmluZztcclxuXHJcbiAgLyoqXHJcbiAgICogQSBwYW5lbCBjaGFuZ2UgZXZlbnQgZmlyZWQgcmlnaHQgYmVmb3JlIHRoZSBwYW5lbCB0b2dnbGUgaGFwcGVucy4gU2VlIE5nYlBhbmVsQ2hhbmdlRXZlbnQgZm9yIHBheWxvYWQgZGV0YWlsc1xyXG4gICAqL1xyXG4gIEBPdXRwdXQoKSBwYW5lbENoYW5nZSA9IG5ldyBFdmVudEVtaXR0ZXI8TmdiUGFuZWxDaGFuZ2VFdmVudD4oKTtcclxuXHJcbiAgY29uc3RydWN0b3IoY29uZmlnOiBOZ2JBY2NvcmRpb25Db25maWcpIHtcclxuICAgIHRoaXMudHlwZSA9IGNvbmZpZy50eXBlO1xyXG4gICAgdGhpcy5jbG9zZU90aGVyUGFuZWxzID0gY29uZmlnLmNsb3NlT3RoZXJzO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogQ2hlY2tzIGlmIGEgcGFuZWwgd2l0aCBhIGdpdmVuIGlkIGlzIGV4cGFuZGVkIG9yIG5vdC5cclxuICAgKi9cclxuICBpc0V4cGFuZGVkKHBhbmVsSWQ6IHN0cmluZyk6IGJvb2xlYW4geyByZXR1cm4gdGhpcy5hY3RpdmVJZHMuaW5kZXhPZihwYW5lbElkKSA+IC0xOyB9XHJcblxyXG4gIC8qKlxyXG4gICAqIEV4cGFuZHMgYSBwYW5lbCB3aXRoIGEgZ2l2ZW4gaWQuIEhhcyBubyBlZmZlY3QgaWYgdGhlIHBhbmVsIGlzIGFscmVhZHkgZXhwYW5kZWQgb3IgZGlzYWJsZWQuXHJcbiAgICovXHJcbiAgZXhwYW5kKHBhbmVsSWQ6IHN0cmluZyk6IHZvaWQgeyB0aGlzLl9jaGFuZ2VPcGVuU3RhdGUodGhpcy5fZmluZFBhbmVsQnlJZChwYW5lbElkKSwgdHJ1ZSk7IH1cclxuXHJcbiAgLyoqXHJcbiAgICogRXhwYW5kcyBhbGwgcGFuZWxzIGlmIFtjbG9zZU90aGVyc109XCJmYWxzZVwiLiBGb3IgdGhlIFtjbG9zZU90aGVyc109XCJ0cnVlXCIgY2FzZSB3aWxsIGhhdmUgbm8gZWZmZWN0IGlmIHRoZXJlIGlzIGFuXHJcbiAgICogb3BlbiBwYW5lbCwgb3RoZXJ3aXNlIHRoZSBmaXJzdCBwYW5lbCB3aWxsIGJlIGV4cGFuZGVkLlxyXG4gICAqL1xyXG4gIGV4cGFuZEFsbCgpOiB2b2lkIHtcclxuICAgIGlmICh0aGlzLmNsb3NlT3RoZXJQYW5lbHMpIHtcclxuICAgICAgaWYgKHRoaXMuYWN0aXZlSWRzLmxlbmd0aCA9PT0gMCAmJiB0aGlzLnBhbmVscy5sZW5ndGgpIHtcclxuICAgICAgICB0aGlzLl9jaGFuZ2VPcGVuU3RhdGUodGhpcy5wYW5lbHMuZmlyc3QsIHRydWUpO1xyXG4gICAgICB9XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB0aGlzLnBhbmVscy5mb3JFYWNoKHBhbmVsID0+IHRoaXMuX2NoYW5nZU9wZW5TdGF0ZShwYW5lbCwgdHJ1ZSkpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogQ29sbGFwc2VzIGEgcGFuZWwgd2l0aCBhIGdpdmVuIGlkLiBIYXMgbm8gZWZmZWN0IGlmIHRoZSBwYW5lbCBpcyBhbHJlYWR5IGNvbGxhcHNlZCBvciBkaXNhYmxlZC5cclxuICAgKi9cclxuICBjb2xsYXBzZShwYW5lbElkOiBzdHJpbmcpIHsgdGhpcy5fY2hhbmdlT3BlblN0YXRlKHRoaXMuX2ZpbmRQYW5lbEJ5SWQocGFuZWxJZCksIGZhbHNlKTsgfVxyXG5cclxuICAvKipcclxuICAgKiBDb2xsYXBzZXMgYWxsIG9wZW4gcGFuZWxzLlxyXG4gICAqL1xyXG4gIGNvbGxhcHNlQWxsKCkge1xyXG4gICAgdGhpcy5wYW5lbHMuZm9yRWFjaCgocGFuZWwpID0+IHsgdGhpcy5fY2hhbmdlT3BlblN0YXRlKHBhbmVsLCBmYWxzZSk7IH0pO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogUHJvZ3JhbW1hdGljYWxseSB0b2dnbGUgYSBwYW5lbCB3aXRoIGEgZ2l2ZW4gaWQuIEhhcyBubyBlZmZlY3QgaWYgdGhlIHBhbmVsIGlzIGRpc2FibGVkLlxyXG4gICAqL1xyXG4gIHRvZ2dsZShwYW5lbElkOiBzdHJpbmcpIHtcclxuICAgIGNvbnN0IHBhbmVsID0gdGhpcy5fZmluZFBhbmVsQnlJZChwYW5lbElkKTtcclxuICAgIGlmIChwYW5lbCkge1xyXG4gICAgICB0aGlzLl9jaGFuZ2VPcGVuU3RhdGUocGFuZWwsICFwYW5lbC5pc09wZW4pO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgbmdBZnRlckNvbnRlbnRDaGVja2VkKCkge1xyXG4gICAgLy8gYWN0aXZlIGlkIHVwZGF0ZXNcclxuICAgIGlmIChpc1N0cmluZyh0aGlzLmFjdGl2ZUlkcykpIHtcclxuICAgICAgdGhpcy5hY3RpdmVJZHMgPSB0aGlzLmFjdGl2ZUlkcy5zcGxpdCgvXFxzKixcXHMqLyk7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gdXBkYXRlIHBhbmVscyBvcGVuIHN0YXRlc1xyXG4gICAgdGhpcy5wYW5lbHMuZm9yRWFjaChwYW5lbCA9PiBwYW5lbC5pc09wZW4gPSAhcGFuZWwuZGlzYWJsZWQgJiYgdGhpcy5hY3RpdmVJZHMuaW5kZXhPZihwYW5lbC5pZCkgPiAtMSk7XHJcblxyXG4gICAgLy8gY2xvc2VPdGhlcnMgdXBkYXRlc1xyXG4gICAgaWYgKHRoaXMuYWN0aXZlSWRzLmxlbmd0aCA+IDEgJiYgdGhpcy5jbG9zZU90aGVyUGFuZWxzKSB7XHJcbiAgICAgIHRoaXMuX2Nsb3NlT3RoZXJzKHRoaXMuYWN0aXZlSWRzWzBdKTtcclxuICAgICAgdGhpcy5fdXBkYXRlQWN0aXZlSWRzKCk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIF9jaGFuZ2VPcGVuU3RhdGUocGFuZWw6IE5nYlBhbmVsLCBuZXh0U3RhdGU6IGJvb2xlYW4pIHtcclxuICAgIGlmIChwYW5lbCAmJiAhcGFuZWwuZGlzYWJsZWQgJiYgcGFuZWwuaXNPcGVuICE9PSBuZXh0U3RhdGUpIHtcclxuICAgICAgbGV0IGRlZmF1bHRQcmV2ZW50ZWQgPSBmYWxzZTtcclxuXHJcbiAgICAgIHRoaXMucGFuZWxDaGFuZ2UuZW1pdChcclxuICAgICAgICAgIHtwYW5lbElkOiBwYW5lbC5pZCwgbmV4dFN0YXRlOiBuZXh0U3RhdGUsIHByZXZlbnREZWZhdWx0OiAoKSA9PiB7IGRlZmF1bHRQcmV2ZW50ZWQgPSB0cnVlOyB9fSk7XHJcblxyXG4gICAgICBpZiAoIWRlZmF1bHRQcmV2ZW50ZWQpIHtcclxuICAgICAgICBwYW5lbC5pc09wZW4gPSBuZXh0U3RhdGU7XHJcblxyXG4gICAgICAgIGlmIChuZXh0U3RhdGUgJiYgdGhpcy5jbG9zZU90aGVyUGFuZWxzKSB7XHJcbiAgICAgICAgICB0aGlzLl9jbG9zZU90aGVycyhwYW5lbC5pZCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuX3VwZGF0ZUFjdGl2ZUlkcygpO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIF9jbG9zZU90aGVycyhwYW5lbElkOiBzdHJpbmcpIHtcclxuICAgIHRoaXMucGFuZWxzLmZvckVhY2gocGFuZWwgPT4ge1xyXG4gICAgICBpZiAocGFuZWwuaWQgIT09IHBhbmVsSWQpIHtcclxuICAgICAgICBwYW5lbC5pc09wZW4gPSBmYWxzZTtcclxuICAgICAgfVxyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIF9maW5kUGFuZWxCeUlkKHBhbmVsSWQ6IHN0cmluZyk6IE5nYlBhbmVsIHwgbnVsbCB7IHJldHVybiB0aGlzLnBhbmVscy5maW5kKHAgPT4gcC5pZCA9PT0gcGFuZWxJZCk7IH1cclxuXHJcbiAgcHJpdmF0ZSBfdXBkYXRlQWN0aXZlSWRzKCkge1xyXG4gICAgdGhpcy5hY3RpdmVJZHMgPSB0aGlzLnBhbmVscy5maWx0ZXIocGFuZWwgPT4gcGFuZWwuaXNPcGVuICYmICFwYW5lbC5kaXNhYmxlZCkubWFwKHBhbmVsID0+IHBhbmVsLmlkKTtcclxuICB9XHJcbn1cclxuIiwiaW1wb3J0IHtOZ01vZHVsZSwgTW9kdWxlV2l0aFByb3ZpZGVyc30gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7Q29tbW9uTW9kdWxlfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xyXG5cclxuaW1wb3J0IHtOZ2JBY2NvcmRpb24sIE5nYlBhbmVsLCBOZ2JQYW5lbFRpdGxlLCBOZ2JQYW5lbENvbnRlbnR9IGZyb20gJy4vYWNjb3JkaW9uJztcclxuXHJcbmV4cG9ydCB7TmdiQWNjb3JkaW9uLCBOZ2JQYW5lbCwgTmdiUGFuZWxUaXRsZSwgTmdiUGFuZWxDb250ZW50LCBOZ2JQYW5lbENoYW5nZUV2ZW50fSBmcm9tICcuL2FjY29yZGlvbic7XHJcbmV4cG9ydCB7TmdiQWNjb3JkaW9uQ29uZmlnfSBmcm9tICcuL2FjY29yZGlvbi1jb25maWcnO1xyXG5cclxuY29uc3QgTkdCX0FDQ09SRElPTl9ESVJFQ1RJVkVTID0gW05nYkFjY29yZGlvbiwgTmdiUGFuZWwsIE5nYlBhbmVsVGl0bGUsIE5nYlBhbmVsQ29udGVudF07XHJcblxyXG5ATmdNb2R1bGUoe2RlY2xhcmF0aW9uczogTkdCX0FDQ09SRElPTl9ESVJFQ1RJVkVTLCBleHBvcnRzOiBOR0JfQUNDT1JESU9OX0RJUkVDVElWRVMsIGltcG9ydHM6IFtDb21tb25Nb2R1bGVdfSlcclxuZXhwb3J0IGNsYXNzIE5nYkFjY29yZGlvbk1vZHVsZSB7XHJcbiAgLyoqXHJcbiAgICogSW1wb3J0aW5nIHdpdGggJy5mb3JSb290KCknIGlzIG5vIGxvbmdlciBuZWNlc3NhcnksIHlvdSBjYW4gc2ltcGx5IGltcG9ydCB0aGUgbW9kdWxlLlxyXG4gICAqIFdpbGwgYmUgcmVtb3ZlZCBpbiA0LjAuMC5cclxuICAgKlxyXG4gICAqIEBkZXByZWNhdGVkIDMuMC4wXHJcbiAgICovXHJcbiAgc3RhdGljIGZvclJvb3QoKTogTW9kdWxlV2l0aFByb3ZpZGVycyB7IHJldHVybiB7bmdNb2R1bGU6IE5nYkFjY29yZGlvbk1vZHVsZX07IH1cclxufVxyXG4iLCJpbXBvcnQge0luamVjdGFibGV9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5cclxuLyoqXHJcbiAqIENvbmZpZ3VyYXRpb24gc2VydmljZSBmb3IgdGhlIE5nYkFsZXJ0IGNvbXBvbmVudC5cclxuICogWW91IGNhbiBpbmplY3QgdGhpcyBzZXJ2aWNlLCB0eXBpY2FsbHkgaW4geW91ciByb290IGNvbXBvbmVudCwgYW5kIGN1c3RvbWl6ZSB0aGUgdmFsdWVzIG9mIGl0cyBwcm9wZXJ0aWVzIGluXHJcbiAqIG9yZGVyIHRvIHByb3ZpZGUgZGVmYXVsdCB2YWx1ZXMgZm9yIGFsbCB0aGUgYWxlcnRzIHVzZWQgaW4gdGhlIGFwcGxpY2F0aW9uLlxyXG4gKi9cclxuQEluamVjdGFibGUoe3Byb3ZpZGVkSW46ICdyb290J30pXHJcbmV4cG9ydCBjbGFzcyBOZ2JBbGVydENvbmZpZyB7XHJcbiAgZGlzbWlzc2libGUgPSB0cnVlO1xyXG4gIHR5cGUgPSAnd2FybmluZyc7XHJcbn1cclxuIiwiaW1wb3J0IHtcclxuICBDb21wb25lbnQsXHJcbiAgSW5wdXQsXHJcbiAgT3V0cHV0LFxyXG4gIEV2ZW50RW1pdHRlcixcclxuICBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSxcclxuICBSZW5kZXJlcjIsXHJcbiAgRWxlbWVudFJlZixcclxuICBPbkNoYW5nZXMsXHJcbiAgT25Jbml0LFxyXG4gIFNpbXBsZUNoYW5nZXNcclxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuXHJcbmltcG9ydCB7TmdiQWxlcnRDb25maWd9IGZyb20gJy4vYWxlcnQtY29uZmlnJztcclxuXHJcbi8qKlxyXG4gKiBBbGVydHMgY2FuIGJlIHVzZWQgdG8gcHJvdmlkZSBmZWVkYmFjayBtZXNzYWdlcy5cclxuICovXHJcbkBDb21wb25lbnQoe1xyXG4gIHNlbGVjdG9yOiAnbmdiLWFsZXJ0JyxcclxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaCxcclxuICBob3N0OiB7J3JvbGUnOiAnYWxlcnQnLCAnY2xhc3MnOiAnYWxlcnQnLCAnW2NsYXNzLmFsZXJ0LWRpc21pc3NpYmxlXSc6ICdkaXNtaXNzaWJsZSd9LFxyXG4gIHRlbXBsYXRlOiBgXHJcbiAgICA8YnV0dG9uICpuZ0lmPVwiZGlzbWlzc2libGVcIiB0eXBlPVwiYnV0dG9uXCIgY2xhc3M9XCJjbG9zZVwiIGFyaWEtbGFiZWw9XCJDbG9zZVwiIGkxOG4tYXJpYS1sYWJlbD1cIkBAbmdiLmFsZXJ0LmNsb3NlXCJcclxuICAgICAgKGNsaWNrKT1cImNsb3NlSGFuZGxlcigpXCI+XHJcbiAgICAgIDxzcGFuIGFyaWEtaGlkZGVuPVwidHJ1ZVwiPiZ0aW1lczs8L3NwYW4+XHJcbiAgICA8L2J1dHRvbj5cclxuICAgIDxuZy1jb250ZW50PjwvbmctY29udGVudD5cclxuICAgIGAsXHJcbiAgc3R5bGVzOiBbYFxyXG4gICAgOmhvc3Qge1xyXG4gICAgICBkaXNwbGF5OiBibG9jaztcclxuICAgIH1cclxuICBgXVxyXG59KVxyXG5leHBvcnQgY2xhc3MgTmdiQWxlcnQgaW1wbGVtZW50cyBPbkluaXQsXHJcbiAgICBPbkNoYW5nZXMge1xyXG4gIC8qKlxyXG4gICAqIEEgZmxhZyBpbmRpY2F0aW5nIGlmIGEgZ2l2ZW4gYWxlcnQgY2FuIGJlIGRpc21pc3NlZCAoY2xvc2VkKSBieSBhIHVzZXIuIElmIHRoaXMgZmxhZyBpcyBzZXQsIGEgY2xvc2UgYnV0dG9uIChpbiBhXHJcbiAgICogZm9ybSBvZiBhbiDDg8KXKSB3aWxsIGJlIGRpc3BsYXllZC5cclxuICAgKi9cclxuICBASW5wdXQoKSBkaXNtaXNzaWJsZTogYm9vbGVhbjtcclxuICAvKipcclxuICAgKiBBbGVydCB0eXBlIChDU1MgY2xhc3MpLiBCb290c3RyYXAgNCByZWNvZ25pemVzIHRoZSBmb2xsb3dpbmcgdHlwZXM6IFwic3VjY2Vzc1wiLCBcImluZm9cIiwgXCJ3YXJuaW5nXCIsIFwiZGFuZ2VyXCIsXHJcbiAgICogXCJwcmltYXJ5XCIsIFwic2Vjb25kYXJ5XCIsIFwibGlnaHRcIiwgXCJkYXJrXCIuXHJcbiAgICovXHJcbiAgQElucHV0KCkgdHlwZTogc3RyaW5nO1xyXG4gIC8qKlxyXG4gICAqIEFuIGV2ZW50IGVtaXR0ZWQgd2hlbiB0aGUgY2xvc2UgYnV0dG9uIGlzIGNsaWNrZWQuIFRoaXMgZXZlbnQgaGFzIG5vIHBheWxvYWQuIE9ubHkgcmVsZXZhbnQgZm9yIGRpc21pc3NpYmxlIGFsZXJ0cy5cclxuICAgKi9cclxuICBAT3V0cHV0KCkgY2xvc2UgPSBuZXcgRXZlbnRFbWl0dGVyPHZvaWQ+KCk7XHJcblxyXG4gIGNvbnN0cnVjdG9yKGNvbmZpZzogTmdiQWxlcnRDb25maWcsIHByaXZhdGUgX3JlbmRlcmVyOiBSZW5kZXJlcjIsIHByaXZhdGUgX2VsZW1lbnQ6IEVsZW1lbnRSZWYpIHtcclxuICAgIHRoaXMuZGlzbWlzc2libGUgPSBjb25maWcuZGlzbWlzc2libGU7XHJcbiAgICB0aGlzLnR5cGUgPSBjb25maWcudHlwZTtcclxuICB9XHJcblxyXG4gIGNsb3NlSGFuZGxlcigpIHsgdGhpcy5jbG9zZS5lbWl0KG51bGwpOyB9XHJcblxyXG4gIG5nT25DaGFuZ2VzKGNoYW5nZXM6IFNpbXBsZUNoYW5nZXMpIHtcclxuICAgIGNvbnN0IHR5cGVDaGFuZ2UgPSBjaGFuZ2VzWyd0eXBlJ107XHJcbiAgICBpZiAodHlwZUNoYW5nZSAmJiAhdHlwZUNoYW5nZS5maXJzdENoYW5nZSkge1xyXG4gICAgICB0aGlzLl9yZW5kZXJlci5yZW1vdmVDbGFzcyh0aGlzLl9lbGVtZW50Lm5hdGl2ZUVsZW1lbnQsIGBhbGVydC0ke3R5cGVDaGFuZ2UucHJldmlvdXNWYWx1ZX1gKTtcclxuICAgICAgdGhpcy5fcmVuZGVyZXIuYWRkQ2xhc3ModGhpcy5fZWxlbWVudC5uYXRpdmVFbGVtZW50LCBgYWxlcnQtJHt0eXBlQ2hhbmdlLmN1cnJlbnRWYWx1ZX1gKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIG5nT25Jbml0KCkgeyB0aGlzLl9yZW5kZXJlci5hZGRDbGFzcyh0aGlzLl9lbGVtZW50Lm5hdGl2ZUVsZW1lbnQsIGBhbGVydC0ke3RoaXMudHlwZX1gKTsgfVxyXG59XHJcbiIsImltcG9ydCB7TmdNb2R1bGUsIE1vZHVsZVdpdGhQcm92aWRlcnN9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQge0NvbW1vbk1vZHVsZX0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcclxuXHJcbmltcG9ydCB7TmdiQWxlcnR9IGZyb20gJy4vYWxlcnQnO1xyXG5cclxuZXhwb3J0IHtOZ2JBbGVydH0gZnJvbSAnLi9hbGVydCc7XHJcbmV4cG9ydCB7TmdiQWxlcnRDb25maWd9IGZyb20gJy4vYWxlcnQtY29uZmlnJztcclxuXHJcbkBOZ01vZHVsZSh7ZGVjbGFyYXRpb25zOiBbTmdiQWxlcnRdLCBleHBvcnRzOiBbTmdiQWxlcnRdLCBpbXBvcnRzOiBbQ29tbW9uTW9kdWxlXSwgZW50cnlDb21wb25lbnRzOiBbTmdiQWxlcnRdfSlcclxuZXhwb3J0IGNsYXNzIE5nYkFsZXJ0TW9kdWxlIHtcclxuICAvKipcclxuICAgKiBJbXBvcnRpbmcgd2l0aCAnLmZvclJvb3QoKScgaXMgbm8gbG9uZ2VyIG5lY2Vzc2FyeSwgeW91IGNhbiBzaW1wbHkgaW1wb3J0IHRoZSBtb2R1bGUuXHJcbiAgICogV2lsbCBiZSByZW1vdmVkIGluIDQuMC4wLlxyXG4gICAqXHJcbiAgICogQGRlcHJlY2F0ZWQgMy4wLjBcclxuICAgKi9cclxuICBzdGF0aWMgZm9yUm9vdCgpOiBNb2R1bGVXaXRoUHJvdmlkZXJzIHsgcmV0dXJuIHtuZ01vZHVsZTogTmdiQWxlcnRNb2R1bGV9OyB9XHJcbn1cclxuIiwiaW1wb3J0IHtEaXJlY3RpdmV9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5cclxuQERpcmVjdGl2ZSh7XHJcbiAgc2VsZWN0b3I6ICdbbmdiQnV0dG9uTGFiZWxdJyxcclxuICBob3N0OlxyXG4gICAgICB7J1tjbGFzcy5idG5dJzogJ3RydWUnLCAnW2NsYXNzLmFjdGl2ZV0nOiAnYWN0aXZlJywgJ1tjbGFzcy5kaXNhYmxlZF0nOiAnZGlzYWJsZWQnLCAnW2NsYXNzLmZvY3VzXSc6ICdmb2N1c2VkJ31cclxufSlcclxuZXhwb3J0IGNsYXNzIE5nYkJ1dHRvbkxhYmVsIHtcclxuICBhY3RpdmU6IGJvb2xlYW47XHJcbiAgZGlzYWJsZWQ6IGJvb2xlYW47XHJcbiAgZm9jdXNlZDogYm9vbGVhbjtcclxufVxyXG4iLCJpbXBvcnQge0RpcmVjdGl2ZSwgZm9yd2FyZFJlZiwgSW5wdXR9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQge0NvbnRyb2xWYWx1ZUFjY2Vzc29yLCBOR19WQUxVRV9BQ0NFU1NPUn0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xyXG5cclxuaW1wb3J0IHtOZ2JCdXR0b25MYWJlbH0gZnJvbSAnLi9sYWJlbCc7XHJcblxyXG5jb25zdCBOR0JfQ0hFQ0tCT1hfVkFMVUVfQUNDRVNTT1IgPSB7XHJcbiAgcHJvdmlkZTogTkdfVkFMVUVfQUNDRVNTT1IsXHJcbiAgdXNlRXhpc3Rpbmc6IGZvcndhcmRSZWYoKCkgPT4gTmdiQ2hlY2tCb3gpLFxyXG4gIG11bHRpOiB0cnVlXHJcbn07XHJcblxyXG5cclxuLyoqXHJcbiAqIEVhc2lseSBjcmVhdGUgQm9vdHN0cmFwLXN0eWxlIGNoZWNrYm94IGJ1dHRvbnMuIEEgdmFsdWUgb2YgYSBjaGVja2VkIGJ1dHRvbiBpcyBib3VuZCB0byBhIHZhcmlhYmxlXHJcbiAqIHNwZWNpZmllZCB2aWEgbmdNb2RlbC5cclxuICovXHJcbkBEaXJlY3RpdmUoe1xyXG4gIHNlbGVjdG9yOiAnW25nYkJ1dHRvbl1bdHlwZT1jaGVja2JveF0nLFxyXG4gIGhvc3Q6IHtcclxuICAgICdhdXRvY29tcGxldGUnOiAnb2ZmJyxcclxuICAgICdbY2hlY2tlZF0nOiAnY2hlY2tlZCcsXHJcbiAgICAnW2Rpc2FibGVkXSc6ICdkaXNhYmxlZCcsXHJcbiAgICAnKGNoYW5nZSknOiAnb25JbnB1dENoYW5nZSgkZXZlbnQpJyxcclxuICAgICcoZm9jdXMpJzogJ2ZvY3VzZWQgPSB0cnVlJyxcclxuICAgICcoYmx1ciknOiAnZm9jdXNlZCA9IGZhbHNlJ1xyXG4gIH0sXHJcbiAgcHJvdmlkZXJzOiBbTkdCX0NIRUNLQk9YX1ZBTFVFX0FDQ0VTU09SXVxyXG59KVxyXG5leHBvcnQgY2xhc3MgTmdiQ2hlY2tCb3ggaW1wbGVtZW50cyBDb250cm9sVmFsdWVBY2Nlc3NvciB7XHJcbiAgY2hlY2tlZDtcclxuXHJcbiAgLyoqXHJcbiAgICogQSBmbGFnIGluZGljYXRpbmcgaWYgYSBnaXZlbiBjaGVja2JveCBidXR0b24gaXMgZGlzYWJsZWQuXHJcbiAgICovXHJcbiAgQElucHV0KCkgZGlzYWJsZWQgPSBmYWxzZTtcclxuXHJcbiAgLyoqXHJcbiAgICogVmFsdWUgdG8gYmUgcHJvcGFnYXRlZCBhcyBtb2RlbCB3aGVuIHRoZSBjaGVja2JveCBpcyBjaGVja2VkLlxyXG4gICAqL1xyXG4gIEBJbnB1dCgpIHZhbHVlQ2hlY2tlZCA9IHRydWU7XHJcblxyXG4gIC8qKlxyXG4gICAqIFZhbHVlIHRvIGJlIHByb3BhZ2F0ZWQgYXMgbW9kZWwgd2hlbiB0aGUgY2hlY2tib3ggaXMgdW5jaGVja2VkLlxyXG4gICAqL1xyXG4gIEBJbnB1dCgpIHZhbHVlVW5DaGVja2VkID0gZmFsc2U7XHJcblxyXG4gIG9uQ2hhbmdlID0gKF86IGFueSkgPT4ge307XHJcbiAgb25Ub3VjaGVkID0gKCkgPT4ge307XHJcblxyXG4gIHNldCBmb2N1c2VkKGlzRm9jdXNlZDogYm9vbGVhbikge1xyXG4gICAgdGhpcy5fbGFiZWwuZm9jdXNlZCA9IGlzRm9jdXNlZDtcclxuICAgIGlmICghaXNGb2N1c2VkKSB7XHJcbiAgICAgIHRoaXMub25Ub3VjaGVkKCk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIF9sYWJlbDogTmdiQnV0dG9uTGFiZWwpIHt9XHJcblxyXG4gIG9uSW5wdXRDaGFuZ2UoJGV2ZW50KSB7XHJcbiAgICBjb25zdCBtb2RlbFRvUHJvcGFnYXRlID0gJGV2ZW50LnRhcmdldC5jaGVja2VkID8gdGhpcy52YWx1ZUNoZWNrZWQgOiB0aGlzLnZhbHVlVW5DaGVja2VkO1xyXG4gICAgdGhpcy5vbkNoYW5nZShtb2RlbFRvUHJvcGFnYXRlKTtcclxuICAgIHRoaXMub25Ub3VjaGVkKCk7XHJcbiAgICB0aGlzLndyaXRlVmFsdWUobW9kZWxUb1Byb3BhZ2F0ZSk7XHJcbiAgfVxyXG5cclxuICByZWdpc3Rlck9uQ2hhbmdlKGZuOiAodmFsdWU6IGFueSkgPT4gYW55KTogdm9pZCB7IHRoaXMub25DaGFuZ2UgPSBmbjsgfVxyXG5cclxuICByZWdpc3Rlck9uVG91Y2hlZChmbjogKCkgPT4gYW55KTogdm9pZCB7IHRoaXMub25Ub3VjaGVkID0gZm47IH1cclxuXHJcbiAgc2V0RGlzYWJsZWRTdGF0ZShpc0Rpc2FibGVkOiBib29sZWFuKTogdm9pZCB7XHJcbiAgICB0aGlzLmRpc2FibGVkID0gaXNEaXNhYmxlZDtcclxuICAgIHRoaXMuX2xhYmVsLmRpc2FibGVkID0gaXNEaXNhYmxlZDtcclxuICB9XHJcblxyXG4gIHdyaXRlVmFsdWUodmFsdWUpIHtcclxuICAgIHRoaXMuY2hlY2tlZCA9IHZhbHVlID09PSB0aGlzLnZhbHVlQ2hlY2tlZDtcclxuICAgIHRoaXMuX2xhYmVsLmFjdGl2ZSA9IHRoaXMuY2hlY2tlZDtcclxuICB9XHJcbn1cclxuIiwiaW1wb3J0IHtEaXJlY3RpdmUsIEVsZW1lbnRSZWYsIGZvcndhcmRSZWYsIElucHV0LCBPbkRlc3Ryb3ksIFJlbmRlcmVyMn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7Q29udHJvbFZhbHVlQWNjZXNzb3IsIE5HX1ZBTFVFX0FDQ0VTU09SfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XHJcblxyXG5pbXBvcnQge05nYkJ1dHRvbkxhYmVsfSBmcm9tICcuL2xhYmVsJztcclxuXHJcbmNvbnN0IE5HQl9SQURJT19WQUxVRV9BQ0NFU1NPUiA9IHtcclxuICBwcm92aWRlOiBOR19WQUxVRV9BQ0NFU1NPUixcclxuICB1c2VFeGlzdGluZzogZm9yd2FyZFJlZigoKSA9PiBOZ2JSYWRpb0dyb3VwKSxcclxuICBtdWx0aTogdHJ1ZVxyXG59O1xyXG5cclxubGV0IG5leHRJZCA9IDA7XHJcblxyXG4vKipcclxuICogRWFzaWx5IGNyZWF0ZSBCb290c3RyYXAtc3R5bGUgcmFkaW8gYnV0dG9ucy4gQSB2YWx1ZSBvZiBhIHNlbGVjdGVkIGJ1dHRvbiBpcyBib3VuZCB0byBhIHZhcmlhYmxlXHJcbiAqIHNwZWNpZmllZCB2aWEgbmdNb2RlbC5cclxuICovXHJcbkBEaXJlY3RpdmUoe3NlbGVjdG9yOiAnW25nYlJhZGlvR3JvdXBdJywgaG9zdDogeydyb2xlJzogJ2dyb3VwJ30sIHByb3ZpZGVyczogW05HQl9SQURJT19WQUxVRV9BQ0NFU1NPUl19KVxyXG5leHBvcnQgY2xhc3MgTmdiUmFkaW9Hcm91cCBpbXBsZW1lbnRzIENvbnRyb2xWYWx1ZUFjY2Vzc29yIHtcclxuICBwcml2YXRlIF9yYWRpb3M6IFNldDxOZ2JSYWRpbz4gPSBuZXcgU2V0PE5nYlJhZGlvPigpO1xyXG4gIHByaXZhdGUgX3ZhbHVlID0gbnVsbDtcclxuICBwcml2YXRlIF9kaXNhYmxlZDogYm9vbGVhbjtcclxuXHJcbiAgZ2V0IGRpc2FibGVkKCkgeyByZXR1cm4gdGhpcy5fZGlzYWJsZWQ7IH1cclxuICBzZXQgZGlzYWJsZWQoaXNEaXNhYmxlZDogYm9vbGVhbikgeyB0aGlzLnNldERpc2FibGVkU3RhdGUoaXNEaXNhYmxlZCk7IH1cclxuXHJcbiAgLyoqXHJcbiAgICogVGhlIG5hbWUgb2YgdGhlIGdyb3VwLiBVbmxlc3MgZW5jbG9zZWQgaW5wdXRzIHNwZWNpZnkgYSBuYW1lLCB0aGlzIG5hbWUgaXMgdXNlZCBhcyB0aGUgbmFtZSBvZiB0aGVcclxuICAgKiBlbmNsb3NlZCBpbnB1dHMuIElmIG5vdCBzcGVjaWZpZWQsIGEgbmFtZSBpcyBnZW5lcmF0ZWQgYXV0b21hdGljYWxseS5cclxuICAgKi9cclxuICBASW5wdXQoKSBuYW1lID0gYG5nYi1yYWRpby0ke25leHRJZCsrfWA7XHJcblxyXG4gIG9uQ2hhbmdlID0gKF86IGFueSkgPT4ge307XHJcbiAgb25Ub3VjaGVkID0gKCkgPT4ge307XHJcblxyXG4gIG9uUmFkaW9DaGFuZ2UocmFkaW86IE5nYlJhZGlvKSB7XHJcbiAgICB0aGlzLndyaXRlVmFsdWUocmFkaW8udmFsdWUpO1xyXG4gICAgdGhpcy5vbkNoYW5nZShyYWRpby52YWx1ZSk7XHJcbiAgfVxyXG5cclxuICBvblJhZGlvVmFsdWVVcGRhdGUoKSB7IHRoaXMuX3VwZGF0ZVJhZGlvc1ZhbHVlKCk7IH1cclxuXHJcbiAgcmVnaXN0ZXIocmFkaW86IE5nYlJhZGlvKSB7IHRoaXMuX3JhZGlvcy5hZGQocmFkaW8pOyB9XHJcblxyXG4gIHJlZ2lzdGVyT25DaGFuZ2UoZm46ICh2YWx1ZTogYW55KSA9PiBhbnkpOiB2b2lkIHsgdGhpcy5vbkNoYW5nZSA9IGZuOyB9XHJcblxyXG4gIHJlZ2lzdGVyT25Ub3VjaGVkKGZuOiAoKSA9PiBhbnkpOiB2b2lkIHsgdGhpcy5vblRvdWNoZWQgPSBmbjsgfVxyXG5cclxuICBzZXREaXNhYmxlZFN0YXRlKGlzRGlzYWJsZWQ6IGJvb2xlYW4pOiB2b2lkIHtcclxuICAgIHRoaXMuX2Rpc2FibGVkID0gaXNEaXNhYmxlZDtcclxuICAgIHRoaXMuX3VwZGF0ZVJhZGlvc0Rpc2FibGVkKCk7XHJcbiAgfVxyXG5cclxuICB1bnJlZ2lzdGVyKHJhZGlvOiBOZ2JSYWRpbykgeyB0aGlzLl9yYWRpb3MuZGVsZXRlKHJhZGlvKTsgfVxyXG5cclxuICB3cml0ZVZhbHVlKHZhbHVlKSB7XHJcbiAgICB0aGlzLl92YWx1ZSA9IHZhbHVlO1xyXG4gICAgdGhpcy5fdXBkYXRlUmFkaW9zVmFsdWUoKTtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgX3VwZGF0ZVJhZGlvc1ZhbHVlKCkgeyB0aGlzLl9yYWRpb3MuZm9yRWFjaCgocmFkaW8pID0+IHJhZGlvLnVwZGF0ZVZhbHVlKHRoaXMuX3ZhbHVlKSk7IH1cclxuICBwcml2YXRlIF91cGRhdGVSYWRpb3NEaXNhYmxlZCgpIHsgdGhpcy5fcmFkaW9zLmZvckVhY2goKHJhZGlvKSA9PiByYWRpby51cGRhdGVEaXNhYmxlZCgpKTsgfVxyXG59XHJcblxyXG5cclxuLyoqXHJcbiAqIE1hcmtzIGFuIGlucHV0IG9mIHR5cGUgXCJyYWRpb1wiIGFzIHBhcnQgb2YgdGhlIE5nYlJhZGlvR3JvdXAuXHJcbiAqL1xyXG5ARGlyZWN0aXZlKHtcclxuICBzZWxlY3RvcjogJ1tuZ2JCdXR0b25dW3R5cGU9cmFkaW9dJyxcclxuICBob3N0OiB7XHJcbiAgICAnW2NoZWNrZWRdJzogJ2NoZWNrZWQnLFxyXG4gICAgJ1tkaXNhYmxlZF0nOiAnZGlzYWJsZWQnLFxyXG4gICAgJ1tuYW1lXSc6ICduYW1lQXR0cicsXHJcbiAgICAnKGNoYW5nZSknOiAnb25DaGFuZ2UoKScsXHJcbiAgICAnKGZvY3VzKSc6ICdmb2N1c2VkID0gdHJ1ZScsXHJcbiAgICAnKGJsdXIpJzogJ2ZvY3VzZWQgPSBmYWxzZSdcclxuICB9XHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBOZ2JSYWRpbyBpbXBsZW1lbnRzIE9uRGVzdHJveSB7XHJcbiAgcHJpdmF0ZSBfY2hlY2tlZDogYm9vbGVhbjtcclxuICBwcml2YXRlIF9kaXNhYmxlZDogYm9vbGVhbjtcclxuICBwcml2YXRlIF92YWx1ZTogYW55ID0gbnVsbDtcclxuXHJcbiAgLyoqXHJcbiAgICogVGhlIG5hbWUgb2YgdGhlIGlucHV0LiBBbGwgaW5wdXRzIG9mIGEgZ3JvdXAgc2hvdWxkIGhhdmUgdGhlIHNhbWUgbmFtZS4gSWYgbm90IHNwZWNpZmllZCxcclxuICAgKiB0aGUgbmFtZSBvZiB0aGUgZW5jbG9zaW5nIGdyb3VwIGlzIHVzZWQuXHJcbiAgICovXHJcbiAgQElucHV0KCkgbmFtZTogc3RyaW5nO1xyXG5cclxuICAvKipcclxuICAgKiBZb3UgY2FuIHNwZWNpZnkgbW9kZWwgdmFsdWUgb2YgYSBnaXZlbiByYWRpbyBieSBiaW5kaW5nIHRvIHRoZSB2YWx1ZSBwcm9wZXJ0eS5cclxuICAgKi9cclxuICBASW5wdXQoJ3ZhbHVlJylcclxuICBzZXQgdmFsdWUodmFsdWU6IGFueSkge1xyXG4gICAgdGhpcy5fdmFsdWUgPSB2YWx1ZTtcclxuICAgIGNvbnN0IHN0cmluZ1ZhbHVlID0gdmFsdWUgPyB2YWx1ZS50b1N0cmluZygpIDogJyc7XHJcbiAgICB0aGlzLl9yZW5kZXJlci5zZXRQcm9wZXJ0eSh0aGlzLl9lbGVtZW50Lm5hdGl2ZUVsZW1lbnQsICd2YWx1ZScsIHN0cmluZ1ZhbHVlKTtcclxuICAgIHRoaXMuX2dyb3VwLm9uUmFkaW9WYWx1ZVVwZGF0ZSgpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogQSBmbGFnIGluZGljYXRpbmcgaWYgYSBnaXZlbiByYWRpbyBidXR0b24gaXMgZGlzYWJsZWQuXHJcbiAgICovXHJcbiAgQElucHV0KCdkaXNhYmxlZCcpXHJcbiAgc2V0IGRpc2FibGVkKGlzRGlzYWJsZWQ6IGJvb2xlYW4pIHtcclxuICAgIHRoaXMuX2Rpc2FibGVkID0gaXNEaXNhYmxlZCAhPT0gZmFsc2U7XHJcbiAgICB0aGlzLnVwZGF0ZURpc2FibGVkKCk7XHJcbiAgfVxyXG5cclxuICBzZXQgZm9jdXNlZChpc0ZvY3VzZWQ6IGJvb2xlYW4pIHtcclxuICAgIGlmICh0aGlzLl9sYWJlbCkge1xyXG4gICAgICB0aGlzLl9sYWJlbC5mb2N1c2VkID0gaXNGb2N1c2VkO1xyXG4gICAgfVxyXG4gICAgaWYgKCFpc0ZvY3VzZWQpIHtcclxuICAgICAgdGhpcy5fZ3JvdXAub25Ub3VjaGVkKCk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBnZXQgY2hlY2tlZCgpIHsgcmV0dXJuIHRoaXMuX2NoZWNrZWQ7IH1cclxuXHJcbiAgZ2V0IGRpc2FibGVkKCkgeyByZXR1cm4gdGhpcy5fZ3JvdXAuZGlzYWJsZWQgfHwgdGhpcy5fZGlzYWJsZWQ7IH1cclxuXHJcbiAgZ2V0IHZhbHVlKCkgeyByZXR1cm4gdGhpcy5fdmFsdWU7IH1cclxuXHJcbiAgZ2V0IG5hbWVBdHRyKCkgeyByZXR1cm4gdGhpcy5uYW1lIHx8IHRoaXMuX2dyb3VwLm5hbWU7IH1cclxuXHJcbiAgY29uc3RydWN0b3IoXHJcbiAgICAgIHByaXZhdGUgX2dyb3VwOiBOZ2JSYWRpb0dyb3VwLCBwcml2YXRlIF9sYWJlbDogTmdiQnV0dG9uTGFiZWwsIHByaXZhdGUgX3JlbmRlcmVyOiBSZW5kZXJlcjIsXHJcbiAgICAgIHByaXZhdGUgX2VsZW1lbnQ6IEVsZW1lbnRSZWY8SFRNTElucHV0RWxlbWVudD4pIHtcclxuICAgIHRoaXMuX2dyb3VwLnJlZ2lzdGVyKHRoaXMpO1xyXG4gICAgdGhpcy51cGRhdGVEaXNhYmxlZCgpO1xyXG4gIH1cclxuXHJcbiAgbmdPbkRlc3Ryb3koKSB7IHRoaXMuX2dyb3VwLnVucmVnaXN0ZXIodGhpcyk7IH1cclxuXHJcbiAgb25DaGFuZ2UoKSB7IHRoaXMuX2dyb3VwLm9uUmFkaW9DaGFuZ2UodGhpcyk7IH1cclxuXHJcbiAgdXBkYXRlVmFsdWUodmFsdWUpIHtcclxuICAgIHRoaXMuX2NoZWNrZWQgPSB0aGlzLnZhbHVlID09PSB2YWx1ZTtcclxuICAgIHRoaXMuX2xhYmVsLmFjdGl2ZSA9IHRoaXMuX2NoZWNrZWQ7XHJcbiAgfVxyXG5cclxuICB1cGRhdGVEaXNhYmxlZCgpIHsgdGhpcy5fbGFiZWwuZGlzYWJsZWQgPSB0aGlzLmRpc2FibGVkOyB9XHJcbn1cclxuIiwiaW1wb3J0IHtOZ01vZHVsZSwgTW9kdWxlV2l0aFByb3ZpZGVyc30gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7TmdiQnV0dG9uTGFiZWx9IGZyb20gJy4vbGFiZWwnO1xyXG5pbXBvcnQge05nYkNoZWNrQm94fSBmcm9tICcuL2NoZWNrYm94JztcclxuaW1wb3J0IHtOZ2JSYWRpbywgTmdiUmFkaW9Hcm91cH0gZnJvbSAnLi9yYWRpbyc7XHJcblxyXG5leHBvcnQge05nYkJ1dHRvbkxhYmVsfSBmcm9tICcuL2xhYmVsJztcclxuZXhwb3J0IHtOZ2JDaGVja0JveH0gZnJvbSAnLi9jaGVja2JveCc7XHJcbmV4cG9ydCB7TmdiUmFkaW8sIE5nYlJhZGlvR3JvdXB9IGZyb20gJy4vcmFkaW8nO1xyXG5cclxuXHJcbmNvbnN0IE5HQl9CVVRUT05fRElSRUNUSVZFUyA9IFtOZ2JCdXR0b25MYWJlbCwgTmdiQ2hlY2tCb3gsIE5nYlJhZGlvR3JvdXAsIE5nYlJhZGlvXTtcclxuXHJcbkBOZ01vZHVsZSh7ZGVjbGFyYXRpb25zOiBOR0JfQlVUVE9OX0RJUkVDVElWRVMsIGV4cG9ydHM6IE5HQl9CVVRUT05fRElSRUNUSVZFU30pXHJcbmV4cG9ydCBjbGFzcyBOZ2JCdXR0b25zTW9kdWxlIHtcclxuICAvKipcclxuICAgKiBJbXBvcnRpbmcgd2l0aCAnLmZvclJvb3QoKScgaXMgbm8gbG9uZ2VyIG5lY2Vzc2FyeSwgeW91IGNhbiBzaW1wbHkgaW1wb3J0IHRoZSBtb2R1bGUuXHJcbiAgICogV2lsbCBiZSByZW1vdmVkIGluIDQuMC4wLlxyXG4gICAqXHJcbiAgICogQGRlcHJlY2F0ZWQgMy4wLjBcclxuICAgKi9cclxuICBzdGF0aWMgZm9yUm9vdCgpOiBNb2R1bGVXaXRoUHJvdmlkZXJzIHsgcmV0dXJuIHtuZ01vZHVsZTogTmdiQnV0dG9uc01vZHVsZX07IH1cclxufVxyXG4iLCJpbXBvcnQge0luamVjdGFibGV9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5cclxuLyoqXHJcbiAqIENvbmZpZ3VyYXRpb24gc2VydmljZSBmb3IgdGhlIE5nYkNhcm91c2VsIGNvbXBvbmVudC5cclxuICogWW91IGNhbiBpbmplY3QgdGhpcyBzZXJ2aWNlLCB0eXBpY2FsbHkgaW4geW91ciByb290IGNvbXBvbmVudCwgYW5kIGN1c3RvbWl6ZSB0aGUgdmFsdWVzIG9mIGl0cyBwcm9wZXJ0aWVzIGluXHJcbiAqIG9yZGVyIHRvIHByb3ZpZGUgZGVmYXVsdCB2YWx1ZXMgZm9yIGFsbCB0aGUgY2Fyb3VzZWxzIHVzZWQgaW4gdGhlIGFwcGxpY2F0aW9uLlxyXG4gKi9cclxuQEluamVjdGFibGUoe3Byb3ZpZGVkSW46ICdyb290J30pXHJcbmV4cG9ydCBjbGFzcyBOZ2JDYXJvdXNlbENvbmZpZyB7XHJcbiAgaW50ZXJ2YWwgPSA1MDAwO1xyXG4gIHdyYXAgPSB0cnVlO1xyXG4gIGtleWJvYXJkID0gdHJ1ZTtcclxuICBwYXVzZU9uSG92ZXIgPSB0cnVlO1xyXG4gIHNob3dOYXZpZ2F0aW9uQXJyb3dzID0gdHJ1ZTtcclxuICBzaG93TmF2aWdhdGlvbkluZGljYXRvcnMgPSB0cnVlO1xyXG59XHJcbiIsImltcG9ydCB7XHJcbiAgQWZ0ZXJDb250ZW50Q2hlY2tlZCxcclxuICBBZnRlckNvbnRlbnRJbml0LFxyXG4gIENoYW5nZURldGVjdGlvblN0cmF0ZWd5LFxyXG4gIENoYW5nZURldGVjdG9yUmVmLFxyXG4gIENvbXBvbmVudCxcclxuICBDb250ZW50Q2hpbGRyZW4sXHJcbiAgRGlyZWN0aXZlLFxyXG4gIEV2ZW50RW1pdHRlcixcclxuICBJbmplY3QsXHJcbiAgSW5wdXQsXHJcbiAgTmdab25lLFxyXG4gIE9uQ2hhbmdlcyxcclxuICBPbkRlc3Ryb3ksXHJcbiAgT3V0cHV0LFxyXG4gIFBMQVRGT1JNX0lELFxyXG4gIFF1ZXJ5TGlzdCxcclxuICBUZW1wbGF0ZVJlZlxyXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQge2lzUGxhdGZvcm1Ccm93c2VyfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xyXG5cclxuaW1wb3J0IHtOZ2JDYXJvdXNlbENvbmZpZ30gZnJvbSAnLi9jYXJvdXNlbC1jb25maWcnO1xyXG5cclxuaW1wb3J0IHtTdWJqZWN0LCB0aW1lcn0gZnJvbSAncnhqcyc7XHJcbmltcG9ydCB7ZmlsdGVyLCBtYXAsIHN3aXRjaE1hcCwgdGFrZVVudGlsfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XHJcblxyXG5sZXQgbmV4dElkID0gMDtcclxuXHJcbi8qKlxyXG4gKiBSZXByZXNlbnRzIGFuIGluZGl2aWR1YWwgc2xpZGUgdG8gYmUgdXNlZCB3aXRoaW4gYSBjYXJvdXNlbC5cclxuICovXHJcbkBEaXJlY3RpdmUoe3NlbGVjdG9yOiAnbmctdGVtcGxhdGVbbmdiU2xpZGVdJ30pXHJcbmV4cG9ydCBjbGFzcyBOZ2JTbGlkZSB7XHJcbiAgLyoqXHJcbiAgICogVW5pcXVlIHNsaWRlIGlkZW50aWZpZXIuIE11c3QgYmUgdW5pcXVlIGZvciB0aGUgZW50aXJlIGRvY3VtZW50IGZvciBwcm9wZXIgYWNjZXNzaWJpbGl0eSBzdXBwb3J0LlxyXG4gICAqIFdpbGwgYmUgYXV0by1nZW5lcmF0ZWQgaWYgbm90IHByb3ZpZGVkLlxyXG4gICAqL1xyXG4gIEBJbnB1dCgpIGlkID0gYG5nYi1zbGlkZS0ke25leHRJZCsrfWA7XHJcbiAgY29uc3RydWN0b3IocHVibGljIHRwbFJlZjogVGVtcGxhdGVSZWY8YW55Pikge31cclxufVxyXG5cclxuLyoqXHJcbiAqIERpcmVjdGl2ZSB0byBlYXNpbHkgY3JlYXRlIGNhcm91c2VscyBiYXNlZCBvbiBCb290c3RyYXAncyBtYXJrdXAuXHJcbiAqL1xyXG5AQ29tcG9uZW50KHtcclxuICBzZWxlY3RvcjogJ25nYi1jYXJvdXNlbCcsXHJcbiAgZXhwb3J0QXM6ICduZ2JDYXJvdXNlbCcsXHJcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2gsXHJcbiAgaG9zdDoge1xyXG4gICAgJ2NsYXNzJzogJ2Nhcm91c2VsIHNsaWRlJyxcclxuICAgICdbc3R5bGUuZGlzcGxheV0nOiAnXCJibG9ja1wiJyxcclxuICAgICd0YWJJbmRleCc6ICcwJyxcclxuICAgICcobW91c2VlbnRlciknOiAncGF1c2VPbkhvdmVyICYmIHBhdXNlKCknLFxyXG4gICAgJyhtb3VzZWxlYXZlKSc6ICdwYXVzZU9uSG92ZXIgJiYgY3ljbGUoKScsXHJcbiAgICAnKGtleWRvd24uYXJyb3dMZWZ0KSc6ICdrZXlib2FyZCAmJiBwcmV2KCknLFxyXG4gICAgJyhrZXlkb3duLmFycm93UmlnaHQpJzogJ2tleWJvYXJkICYmIG5leHQoKSdcclxuICB9LFxyXG4gIHRlbXBsYXRlOiBgXHJcbiAgICA8b2wgY2xhc3M9XCJjYXJvdXNlbC1pbmRpY2F0b3JzXCIgKm5nSWY9XCJzaG93TmF2aWdhdGlvbkluZGljYXRvcnNcIj5cclxuICAgICAgPGxpICpuZ0Zvcj1cImxldCBzbGlkZSBvZiBzbGlkZXNcIiBbaWRdPVwic2xpZGUuaWRcIiBbY2xhc3MuYWN0aXZlXT1cInNsaWRlLmlkID09PSBhY3RpdmVJZFwiXHJcbiAgICAgICAgICAoY2xpY2spPVwic2VsZWN0KHNsaWRlLmlkKTsgcGF1c2VPbkhvdmVyICYmIHBhdXNlKClcIj48L2xpPlxyXG4gICAgPC9vbD5cclxuICAgIDxkaXYgY2xhc3M9XCJjYXJvdXNlbC1pbm5lclwiPlxyXG4gICAgICA8ZGl2ICpuZ0Zvcj1cImxldCBzbGlkZSBvZiBzbGlkZXNcIiBjbGFzcz1cImNhcm91c2VsLWl0ZW1cIiBbY2xhc3MuYWN0aXZlXT1cInNsaWRlLmlkID09PSBhY3RpdmVJZFwiPlxyXG4gICAgICAgIDxuZy10ZW1wbGF0ZSBbbmdUZW1wbGF0ZU91dGxldF09XCJzbGlkZS50cGxSZWZcIj48L25nLXRlbXBsYXRlPlxyXG4gICAgICA8L2Rpdj5cclxuICAgIDwvZGl2PlxyXG4gICAgPGEgY2xhc3M9XCJjYXJvdXNlbC1jb250cm9sLXByZXZcIiByb2xlPVwiYnV0dG9uXCIgKGNsaWNrKT1cInByZXYoKVwiICpuZ0lmPVwic2hvd05hdmlnYXRpb25BcnJvd3NcIj5cclxuICAgICAgPHNwYW4gY2xhc3M9XCJjYXJvdXNlbC1jb250cm9sLXByZXYtaWNvblwiIGFyaWEtaGlkZGVuPVwidHJ1ZVwiPjwvc3Bhbj5cclxuICAgICAgPHNwYW4gY2xhc3M9XCJzci1vbmx5XCIgaTE4bj1cIkBAbmdiLmNhcm91c2VsLnByZXZpb3VzXCI+UHJldmlvdXM8L3NwYW4+XHJcbiAgICA8L2E+XHJcbiAgICA8YSBjbGFzcz1cImNhcm91c2VsLWNvbnRyb2wtbmV4dFwiIHJvbGU9XCJidXR0b25cIiAoY2xpY2spPVwibmV4dCgpXCIgKm5nSWY9XCJzaG93TmF2aWdhdGlvbkFycm93c1wiPlxyXG4gICAgICA8c3BhbiBjbGFzcz1cImNhcm91c2VsLWNvbnRyb2wtbmV4dC1pY29uXCIgYXJpYS1oaWRkZW49XCJ0cnVlXCI+PC9zcGFuPlxyXG4gICAgICA8c3BhbiBjbGFzcz1cInNyLW9ubHlcIiBpMThuPVwiQEBuZ2IuY2Fyb3VzZWwubmV4dFwiPk5leHQ8L3NwYW4+XHJcbiAgICA8L2E+XHJcbiAgYFxyXG59KVxyXG5leHBvcnQgY2xhc3MgTmdiQ2Fyb3VzZWwgaW1wbGVtZW50cyBBZnRlckNvbnRlbnRDaGVja2VkLFxyXG4gICAgQWZ0ZXJDb250ZW50SW5pdCwgT25DaGFuZ2VzLCBPbkRlc3Ryb3kge1xyXG4gIEBDb250ZW50Q2hpbGRyZW4oTmdiU2xpZGUpIHNsaWRlczogUXVlcnlMaXN0PE5nYlNsaWRlPjtcclxuXHJcbiAgcHJpdmF0ZSBfc3RhcnQkID0gbmV3IFN1YmplY3Q8dm9pZD4oKTtcclxuICBwcml2YXRlIF9zdG9wJCA9IG5ldyBTdWJqZWN0PHZvaWQ+KCk7XHJcblxyXG4gIC8qKlxyXG4gICAqIFRoZSBhY3RpdmUgc2xpZGUgaWQuXHJcbiAgICovXHJcbiAgQElucHV0KCkgYWN0aXZlSWQ6IHN0cmluZztcclxuXHJcblxyXG4gIC8qKlxyXG4gICAqIEFtb3VudCBvZiB0aW1lIGluIG1pbGxpc2Vjb25kcyBiZWZvcmUgbmV4dCBzbGlkZSBpcyBzaG93bi5cclxuICAgKi9cclxuICBASW5wdXQoKSBpbnRlcnZhbDogbnVtYmVyO1xyXG5cclxuICAvKipcclxuICAgKiBXaGV0aGVyIGNhbiB3cmFwIGZyb20gdGhlIGxhc3QgdG8gdGhlIGZpcnN0IHNsaWRlLlxyXG4gICAqL1xyXG4gIEBJbnB1dCgpIHdyYXA6IGJvb2xlYW47XHJcblxyXG4gIC8qKlxyXG4gICAqIEEgZmxhZyBmb3IgYWxsb3dpbmcgbmF2aWdhdGlvbiB2aWEga2V5Ym9hcmRcclxuICAgKi9cclxuICBASW5wdXQoKSBrZXlib2FyZDogYm9vbGVhbjtcclxuXHJcbiAgLyoqXHJcbiAgICogQSBmbGFnIHRvIGVuYWJsZSBzbGlkZSBjeWNsaW5nIHBhdXNlL3Jlc3VtZSBvbiBtb3VzZW92ZXIuXHJcbiAgICogQHNpbmNlIDIuMi4wXHJcbiAgICovXHJcbiAgQElucHV0KCkgcGF1c2VPbkhvdmVyOiBib29sZWFuO1xyXG5cclxuICAvKipcclxuICAgKiBBIGZsYWcgdG8gc2hvdyAvIGhpZGUgbmF2aWdhdGlvbiBhcnJvd3MuXHJcbiAgICogQHNpbmNlIDIuMi4wXHJcbiAgICovXHJcbiAgQElucHV0KCkgc2hvd05hdmlnYXRpb25BcnJvd3M6IGJvb2xlYW47XHJcblxyXG4gIC8qKlxyXG4gICAqIEEgZmxhZyB0byBzaG93IC8gaGlkZSBuYXZpZ2F0aW9uIGluZGljYXRvcnMuXHJcbiAgICogQHNpbmNlIDIuMi4wXHJcbiAgICovXHJcbiAgQElucHV0KCkgc2hvd05hdmlnYXRpb25JbmRpY2F0b3JzOiBib29sZWFuO1xyXG5cclxuICAvKipcclxuICAgKiBBIGNhcm91c2VsIHNsaWRlIGV2ZW50IGZpcmVkIHdoZW4gdGhlIHNsaWRlIHRyYW5zaXRpb24gaXMgY29tcGxldGVkLlxyXG4gICAqIFNlZSBOZ2JTbGlkZUV2ZW50IGZvciBwYXlsb2FkIGRldGFpbHNcclxuICAgKi9cclxuICBAT3V0cHV0KCkgc2xpZGUgPSBuZXcgRXZlbnRFbWl0dGVyPE5nYlNsaWRlRXZlbnQ+KCk7XHJcblxyXG4gIGNvbnN0cnVjdG9yKFxyXG4gICAgICBjb25maWc6IE5nYkNhcm91c2VsQ29uZmlnLCBASW5qZWN0KFBMQVRGT1JNX0lEKSBwcml2YXRlIF9wbGF0Zm9ybUlkLCBwcml2YXRlIF9uZ1pvbmU6IE5nWm9uZSxcclxuICAgICAgcHJpdmF0ZSBfY2Q6IENoYW5nZURldGVjdG9yUmVmKSB7XHJcbiAgICB0aGlzLmludGVydmFsID0gY29uZmlnLmludGVydmFsO1xyXG4gICAgdGhpcy53cmFwID0gY29uZmlnLndyYXA7XHJcbiAgICB0aGlzLmtleWJvYXJkID0gY29uZmlnLmtleWJvYXJkO1xyXG4gICAgdGhpcy5wYXVzZU9uSG92ZXIgPSBjb25maWcucGF1c2VPbkhvdmVyO1xyXG4gICAgdGhpcy5zaG93TmF2aWdhdGlvbkFycm93cyA9IGNvbmZpZy5zaG93TmF2aWdhdGlvbkFycm93cztcclxuICAgIHRoaXMuc2hvd05hdmlnYXRpb25JbmRpY2F0b3JzID0gY29uZmlnLnNob3dOYXZpZ2F0aW9uSW5kaWNhdG9ycztcclxuICB9XHJcblxyXG4gIG5nQWZ0ZXJDb250ZW50SW5pdCgpIHtcclxuICAgIC8vIHNldEludGVydmFsKCkgZG9lc24ndCBwbGF5IHdlbGwgd2l0aCBTU1IgYW5kIHByb3RyYWN0b3IsXHJcbiAgICAvLyBzbyB3ZSBzaG91bGQgcnVuIGl0IGluIHRoZSBicm93c2VyIGFuZCBvdXRzaWRlIEFuZ3VsYXJcclxuICAgIGlmIChpc1BsYXRmb3JtQnJvd3Nlcih0aGlzLl9wbGF0Zm9ybUlkKSkge1xyXG4gICAgICB0aGlzLl9uZ1pvbmUucnVuT3V0c2lkZUFuZ3VsYXIoKCkgPT4ge1xyXG4gICAgICAgIHRoaXMuX3N0YXJ0JFxyXG4gICAgICAgICAgICAucGlwZShcclxuICAgICAgICAgICAgICAgIG1hcCgoKSA9PiB0aGlzLmludGVydmFsKSwgZmlsdGVyKGludGVydmFsID0+IGludGVydmFsID4gMCksXHJcbiAgICAgICAgICAgICAgICBzd2l0Y2hNYXAoaW50ZXJ2YWwgPT4gdGltZXIoaW50ZXJ2YWwpLnBpcGUodGFrZVVudGlsKHRoaXMuX3N0b3AkKSkpKVxyXG4gICAgICAgICAgICAuc3Vic2NyaWJlKCgpID0+IHRoaXMuX25nWm9uZS5ydW4oKCkgPT4ge1xyXG4gICAgICAgICAgICAgIHRoaXMubmV4dCgpO1xyXG4gICAgICAgICAgICAgIHRoaXMuX2NkLmRldGVjdENoYW5nZXMoKTtcclxuICAgICAgICAgICAgfSkpO1xyXG5cclxuICAgICAgICB0aGlzLl9zdGFydCQubmV4dCgpO1xyXG4gICAgICB9KTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIG5nQWZ0ZXJDb250ZW50Q2hlY2tlZCgpIHtcclxuICAgIGxldCBhY3RpdmVTbGlkZSA9IHRoaXMuX2dldFNsaWRlQnlJZCh0aGlzLmFjdGl2ZUlkKTtcclxuICAgIHRoaXMuYWN0aXZlSWQgPSBhY3RpdmVTbGlkZSA/IGFjdGl2ZVNsaWRlLmlkIDogKHRoaXMuc2xpZGVzLmxlbmd0aCA/IHRoaXMuc2xpZGVzLmZpcnN0LmlkIDogbnVsbCk7XHJcbiAgfVxyXG5cclxuICBuZ09uRGVzdHJveSgpIHsgdGhpcy5fc3RvcCQubmV4dCgpOyB9XHJcblxyXG4gIG5nT25DaGFuZ2VzKGNoYW5nZXMpIHtcclxuICAgIGlmICgnaW50ZXJ2YWwnIGluIGNoYW5nZXMgJiYgIWNoYW5nZXNbJ2ludGVydmFsJ10uaXNGaXJzdENoYW5nZSgpKSB7XHJcbiAgICAgIHRoaXMuX3N0YXJ0JC5uZXh0KCk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBOYXZpZ2F0ZSB0byBhIHNsaWRlIHdpdGggdGhlIHNwZWNpZmllZCBpZGVudGlmaWVyLlxyXG4gICAqL1xyXG4gIHNlbGVjdChzbGlkZUlkOiBzdHJpbmcpIHsgdGhpcy5fY3ljbGVUb1NlbGVjdGVkKHNsaWRlSWQsIHRoaXMuX2dldFNsaWRlRXZlbnREaXJlY3Rpb24odGhpcy5hY3RpdmVJZCwgc2xpZGVJZCkpOyB9XHJcblxyXG4gIC8qKlxyXG4gICAqIE5hdmlnYXRlIHRvIHRoZSBuZXh0IHNsaWRlLlxyXG4gICAqL1xyXG4gIHByZXYoKSB7IHRoaXMuX2N5Y2xlVG9TZWxlY3RlZCh0aGlzLl9nZXRQcmV2U2xpZGUodGhpcy5hY3RpdmVJZCksIE5nYlNsaWRlRXZlbnREaXJlY3Rpb24uUklHSFQpOyB9XHJcblxyXG4gIC8qKlxyXG4gICAqIE5hdmlnYXRlIHRvIHRoZSBuZXh0IHNsaWRlLlxyXG4gICAqL1xyXG4gIG5leHQoKSB7IHRoaXMuX2N5Y2xlVG9TZWxlY3RlZCh0aGlzLl9nZXROZXh0U2xpZGUodGhpcy5hY3RpdmVJZCksIE5nYlNsaWRlRXZlbnREaXJlY3Rpb24uTEVGVCk7IH1cclxuXHJcbiAgLyoqXHJcbiAgICogU3RvcHMgdGhlIGNhcm91c2VsIGZyb20gY3ljbGluZyB0aHJvdWdoIGl0ZW1zLlxyXG4gICAqL1xyXG4gIHBhdXNlKCkgeyB0aGlzLl9zdG9wJC5uZXh0KCk7IH1cclxuXHJcbiAgLyoqXHJcbiAgICogUmVzdGFydHMgY3ljbGluZyB0aHJvdWdoIHRoZSBjYXJvdXNlbCBzbGlkZXMgZnJvbSBsZWZ0IHRvIHJpZ2h0LlxyXG4gICAqL1xyXG4gIGN5Y2xlKCkgeyB0aGlzLl9zdGFydCQubmV4dCgpOyB9XHJcblxyXG4gIHByaXZhdGUgX2N5Y2xlVG9TZWxlY3RlZChzbGlkZUlkeDogc3RyaW5nLCBkaXJlY3Rpb246IE5nYlNsaWRlRXZlbnREaXJlY3Rpb24pIHtcclxuICAgIGxldCBzZWxlY3RlZFNsaWRlID0gdGhpcy5fZ2V0U2xpZGVCeUlkKHNsaWRlSWR4KTtcclxuICAgIGlmIChzZWxlY3RlZFNsaWRlICYmIHNlbGVjdGVkU2xpZGUuaWQgIT09IHRoaXMuYWN0aXZlSWQpIHtcclxuICAgICAgdGhpcy5zbGlkZS5lbWl0KHtwcmV2OiB0aGlzLmFjdGl2ZUlkLCBjdXJyZW50OiBzZWxlY3RlZFNsaWRlLmlkLCBkaXJlY3Rpb246IGRpcmVjdGlvbn0pO1xyXG4gICAgICB0aGlzLl9zdGFydCQubmV4dCgpO1xyXG4gICAgICB0aGlzLmFjdGl2ZUlkID0gc2VsZWN0ZWRTbGlkZS5pZDtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHByaXZhdGUgX2dldFNsaWRlRXZlbnREaXJlY3Rpb24oY3VycmVudEFjdGl2ZVNsaWRlSWQ6IHN0cmluZywgbmV4dEFjdGl2ZVNsaWRlSWQ6IHN0cmluZyk6IE5nYlNsaWRlRXZlbnREaXJlY3Rpb24ge1xyXG4gICAgY29uc3QgY3VycmVudEFjdGl2ZVNsaWRlSWR4ID0gdGhpcy5fZ2V0U2xpZGVJZHhCeUlkKGN1cnJlbnRBY3RpdmVTbGlkZUlkKTtcclxuICAgIGNvbnN0IG5leHRBY3RpdmVTbGlkZUlkeCA9IHRoaXMuX2dldFNsaWRlSWR4QnlJZChuZXh0QWN0aXZlU2xpZGVJZCk7XHJcblxyXG4gICAgcmV0dXJuIGN1cnJlbnRBY3RpdmVTbGlkZUlkeCA+IG5leHRBY3RpdmVTbGlkZUlkeCA/IE5nYlNsaWRlRXZlbnREaXJlY3Rpb24uUklHSFQgOiBOZ2JTbGlkZUV2ZW50RGlyZWN0aW9uLkxFRlQ7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIF9nZXRTbGlkZUJ5SWQoc2xpZGVJZDogc3RyaW5nKTogTmdiU2xpZGUgeyByZXR1cm4gdGhpcy5zbGlkZXMuZmluZChzbGlkZSA9PiBzbGlkZS5pZCA9PT0gc2xpZGVJZCk7IH1cclxuXHJcbiAgcHJpdmF0ZSBfZ2V0U2xpZGVJZHhCeUlkKHNsaWRlSWQ6IHN0cmluZyk6IG51bWJlciB7XHJcbiAgICByZXR1cm4gdGhpcy5zbGlkZXMudG9BcnJheSgpLmluZGV4T2YodGhpcy5fZ2V0U2xpZGVCeUlkKHNsaWRlSWQpKTtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgX2dldE5leHRTbGlkZShjdXJyZW50U2xpZGVJZDogc3RyaW5nKTogc3RyaW5nIHtcclxuICAgIGNvbnN0IHNsaWRlQXJyID0gdGhpcy5zbGlkZXMudG9BcnJheSgpO1xyXG4gICAgY29uc3QgY3VycmVudFNsaWRlSWR4ID0gdGhpcy5fZ2V0U2xpZGVJZHhCeUlkKGN1cnJlbnRTbGlkZUlkKTtcclxuICAgIGNvbnN0IGlzTGFzdFNsaWRlID0gY3VycmVudFNsaWRlSWR4ID09PSBzbGlkZUFyci5sZW5ndGggLSAxO1xyXG5cclxuICAgIHJldHVybiBpc0xhc3RTbGlkZSA/ICh0aGlzLndyYXAgPyBzbGlkZUFyclswXS5pZCA6IHNsaWRlQXJyW3NsaWRlQXJyLmxlbmd0aCAtIDFdLmlkKSA6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICBzbGlkZUFycltjdXJyZW50U2xpZGVJZHggKyAxXS5pZDtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgX2dldFByZXZTbGlkZShjdXJyZW50U2xpZGVJZDogc3RyaW5nKTogc3RyaW5nIHtcclxuICAgIGNvbnN0IHNsaWRlQXJyID0gdGhpcy5zbGlkZXMudG9BcnJheSgpO1xyXG4gICAgY29uc3QgY3VycmVudFNsaWRlSWR4ID0gdGhpcy5fZ2V0U2xpZGVJZHhCeUlkKGN1cnJlbnRTbGlkZUlkKTtcclxuICAgIGNvbnN0IGlzRmlyc3RTbGlkZSA9IGN1cnJlbnRTbGlkZUlkeCA9PT0gMDtcclxuXHJcbiAgICByZXR1cm4gaXNGaXJzdFNsaWRlID8gKHRoaXMud3JhcCA/IHNsaWRlQXJyW3NsaWRlQXJyLmxlbmd0aCAtIDFdLmlkIDogc2xpZGVBcnJbMF0uaWQpIDpcclxuICAgICAgICAgICAgICAgICAgICAgICAgICBzbGlkZUFycltjdXJyZW50U2xpZGVJZHggLSAxXS5pZDtcclxuICB9XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBUaGUgcGF5bG9hZCBvZiB0aGUgc2xpZGUgZXZlbnQgZmlyZWQgd2hlbiB0aGUgc2xpZGUgdHJhbnNpdGlvbiBpcyBjb21wbGV0ZWRcclxuICovXHJcbmV4cG9ydCBpbnRlcmZhY2UgTmdiU2xpZGVFdmVudCB7XHJcbiAgLyoqXHJcbiAgICogUHJldmlvdXMgc2xpZGUgaWRcclxuICAgKi9cclxuICBwcmV2OiBzdHJpbmc7XHJcblxyXG4gIC8qKlxyXG4gICAqIE5ldyBzbGlkZSBpZHNcclxuICAgKi9cclxuICBjdXJyZW50OiBzdHJpbmc7XHJcblxyXG4gIC8qKlxyXG4gICAqIFNsaWRlIGV2ZW50IGRpcmVjdGlvblxyXG4gICAqL1xyXG4gIGRpcmVjdGlvbjogTmdiU2xpZGVFdmVudERpcmVjdGlvbjtcclxufVxyXG5cclxuLyoqXHJcbiAqIEVudW0gdG8gZGVmaW5lIHRoZSBjYXJvdXNlbCBzbGlkZSBldmVudCBkaXJlY3Rpb25cclxuICovXHJcbmV4cG9ydCBlbnVtIE5nYlNsaWRlRXZlbnREaXJlY3Rpb24ge1xyXG4gIExFRlQgPSA8YW55PidsZWZ0JyxcclxuICBSSUdIVCA9IDxhbnk+J3JpZ2h0J1xyXG59XHJcblxyXG5leHBvcnQgY29uc3QgTkdCX0NBUk9VU0VMX0RJUkVDVElWRVMgPSBbTmdiQ2Fyb3VzZWwsIE5nYlNsaWRlXTtcclxuIiwiaW1wb3J0IHtOZ01vZHVsZSwgTW9kdWxlV2l0aFByb3ZpZGVyc30gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7Q29tbW9uTW9kdWxlfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xyXG5cclxuaW1wb3J0IHtOR0JfQ0FST1VTRUxfRElSRUNUSVZFU30gZnJvbSAnLi9jYXJvdXNlbCc7XHJcblxyXG5leHBvcnQge05nYkNhcm91c2VsLCBOZ2JTbGlkZSwgTmdiU2xpZGVFdmVudH0gZnJvbSAnLi9jYXJvdXNlbCc7XHJcbmV4cG9ydCB7TmdiQ2Fyb3VzZWxDb25maWd9IGZyb20gJy4vY2Fyb3VzZWwtY29uZmlnJztcclxuXHJcbkBOZ01vZHVsZSh7ZGVjbGFyYXRpb25zOiBOR0JfQ0FST1VTRUxfRElSRUNUSVZFUywgZXhwb3J0czogTkdCX0NBUk9VU0VMX0RJUkVDVElWRVMsIGltcG9ydHM6IFtDb21tb25Nb2R1bGVdfSlcclxuZXhwb3J0IGNsYXNzIE5nYkNhcm91c2VsTW9kdWxlIHtcclxuICAvKipcclxuICAgKiBJbXBvcnRpbmcgd2l0aCAnLmZvclJvb3QoKScgaXMgbm8gbG9uZ2VyIG5lY2Vzc2FyeSwgeW91IGNhbiBzaW1wbHkgaW1wb3J0IHRoZSBtb2R1bGUuXHJcbiAgICogV2lsbCBiZSByZW1vdmVkIGluIDQuMC4wLlxyXG4gICAqXHJcbiAgICogQGRlcHJlY2F0ZWQgMy4wLjBcclxuICAgKi9cclxuICBzdGF0aWMgZm9yUm9vdCgpOiBNb2R1bGVXaXRoUHJvdmlkZXJzIHsgcmV0dXJuIHtuZ01vZHVsZTogTmdiQ2Fyb3VzZWxNb2R1bGV9OyB9XHJcbn1cclxuIiwiaW1wb3J0IHtEaXJlY3RpdmUsIElucHV0fSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuXHJcbi8qKlxyXG4gKiBUaGUgTmdiQ29sbGFwc2UgZGlyZWN0aXZlIHByb3ZpZGVzIGEgc2ltcGxlIHdheSB0byBoaWRlIGFuZCBzaG93IGFuIGVsZW1lbnQgd2l0aCBhbmltYXRpb25zLlxyXG4gKi9cclxuQERpcmVjdGl2ZSh7XHJcbiAgc2VsZWN0b3I6ICdbbmdiQ29sbGFwc2VdJyxcclxuICBleHBvcnRBczogJ25nYkNvbGxhcHNlJyxcclxuICBob3N0OiB7J1tjbGFzcy5jb2xsYXBzZV0nOiAndHJ1ZScsICdbY2xhc3Muc2hvd10nOiAnIWNvbGxhcHNlZCd9XHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBOZ2JDb2xsYXBzZSB7XHJcbiAgLyoqXHJcbiAgICogQSBmbGFnIGluZGljYXRpbmcgY29sbGFwc2VkICh0cnVlKSBvciBvcGVuIChmYWxzZSkgc3RhdGUuXHJcbiAgICovXHJcbiAgQElucHV0KCduZ2JDb2xsYXBzZScpIGNvbGxhcHNlZCA9IGZhbHNlO1xyXG59XHJcbiIsImltcG9ydCB7TmdNb2R1bGUsIE1vZHVsZVdpdGhQcm92aWRlcnN9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQge05nYkNvbGxhcHNlfSBmcm9tICcuL2NvbGxhcHNlJztcclxuXHJcbmV4cG9ydCB7TmdiQ29sbGFwc2V9IGZyb20gJy4vY29sbGFwc2UnO1xyXG5cclxuQE5nTW9kdWxlKHtkZWNsYXJhdGlvbnM6IFtOZ2JDb2xsYXBzZV0sIGV4cG9ydHM6IFtOZ2JDb2xsYXBzZV19KVxyXG5leHBvcnQgY2xhc3MgTmdiQ29sbGFwc2VNb2R1bGUge1xyXG4gIC8qKlxyXG4gICAqIEltcG9ydGluZyB3aXRoICcuZm9yUm9vdCgpJyBpcyBubyBsb25nZXIgbmVjZXNzYXJ5LCB5b3UgY2FuIHNpbXBseSBpbXBvcnQgdGhlIG1vZHVsZS5cclxuICAgKiBXaWxsIGJlIHJlbW92ZWQgaW4gNC4wLjAuXHJcbiAgICpcclxuICAgKiBAZGVwcmVjYXRlZCAzLjAuMFxyXG4gICAqL1xyXG4gIHN0YXRpYyBmb3JSb290KCk6IE1vZHVsZVdpdGhQcm92aWRlcnMgeyByZXR1cm4ge25nTW9kdWxlOiBOZ2JDb2xsYXBzZU1vZHVsZX07IH1cclxufVxyXG4iLCJpbXBvcnQge05nYkRhdGVTdHJ1Y3R9IGZyb20gJy4vbmdiLWRhdGUtc3RydWN0JztcclxuaW1wb3J0IHtpc0ludGVnZXJ9IGZyb20gJy4uL3V0aWwvdXRpbCc7XHJcblxyXG4vKipcclxuICogU2ltcGxlIGNsYXNzIHVzZWQgZm9yIGEgZGF0ZSByZXByZXNlbnRhdGlvbiB0aGF0IGRhdGVwaWNrZXIgYWxzbyB1c2VzIGludGVybmFsbHlcclxuICpcclxuICogQHNpbmNlIDMuMC4wXHJcbiAqL1xyXG5leHBvcnQgY2xhc3MgTmdiRGF0ZSBpbXBsZW1lbnRzIE5nYkRhdGVTdHJ1Y3Qge1xyXG4gIC8qKlxyXG4gICAqIFRoZSB5ZWFyLCBmb3IgZXhhbXBsZSAyMDE2XHJcbiAgICovXHJcbiAgeWVhcjogbnVtYmVyO1xyXG5cclxuICAvKipcclxuICAgKiBUaGUgbW9udGgsIGZvciBleGFtcGxlIDE9SmFuIC4uLiAxMj1EZWMgYXMgaW4gSVNPIDg2MDFcclxuICAgKi9cclxuICBtb250aDogbnVtYmVyO1xyXG5cclxuICAvKipcclxuICAgKiBUaGUgZGF5IG9mIG1vbnRoLCBzdGFydGluZyB3aXRoIDFcclxuICAgKi9cclxuICBkYXk6IG51bWJlcjtcclxuXHJcbiAgLyoqXHJcbiAgICogU3RhdGljIG1ldGhvZC4gQ3JlYXRlcyBhIG5ldyBkYXRlIG9iamVjdCBmcm9tIHRoZSBOZ2JEYXRlU3RydWN0LCBleC4gTmdiRGF0ZS5mcm9tKHt5ZWFyOiAyMDAwLFxyXG4gICAqIG1vbnRoOiA1LCBkYXk6IDF9KS4gSWYgdGhlICdkYXRlJyBpcyBhbHJlYWR5IG9mIE5nYkRhdGUsIHRoZSBtZXRob2Qgd2lsbCByZXR1cm4gdGhlIHNhbWUgb2JqZWN0XHJcbiAgICovXHJcbiAgc3RhdGljIGZyb20oZGF0ZTogTmdiRGF0ZVN0cnVjdCk6IE5nYkRhdGUge1xyXG4gICAgaWYgKGRhdGUgaW5zdGFuY2VvZiBOZ2JEYXRlKSB7XHJcbiAgICAgIHJldHVybiBkYXRlO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIGRhdGUgPyBuZXcgTmdiRGF0ZShkYXRlLnllYXIsIGRhdGUubW9udGgsIGRhdGUuZGF5KSA6IG51bGw7XHJcbiAgfVxyXG5cclxuICBjb25zdHJ1Y3Rvcih5ZWFyOiBudW1iZXIsIG1vbnRoOiBudW1iZXIsIGRheTogbnVtYmVyKSB7XHJcbiAgICB0aGlzLnllYXIgPSBpc0ludGVnZXIoeWVhcikgPyB5ZWFyIDogbnVsbDtcclxuICAgIHRoaXMubW9udGggPSBpc0ludGVnZXIobW9udGgpID8gbW9udGggOiBudWxsO1xyXG4gICAgdGhpcy5kYXkgPSBpc0ludGVnZXIoZGF5KSA/IGRheSA6IG51bGw7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBDaGVja3MgaWYgY3VycmVudCBkYXRlIGlzIGVxdWFsIHRvIGFub3RoZXIgZGF0ZVxyXG4gICAqL1xyXG4gIGVxdWFscyhvdGhlcjogTmdiRGF0ZSk6IGJvb2xlYW4ge1xyXG4gICAgcmV0dXJuIG90aGVyICYmIHRoaXMueWVhciA9PT0gb3RoZXIueWVhciAmJiB0aGlzLm1vbnRoID09PSBvdGhlci5tb250aCAmJiB0aGlzLmRheSA9PT0gb3RoZXIuZGF5O1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogQ2hlY2tzIGlmIGN1cnJlbnQgZGF0ZSBpcyBiZWZvcmUgYW5vdGhlciBkYXRlXHJcbiAgICovXHJcbiAgYmVmb3JlKG90aGVyOiBOZ2JEYXRlKTogYm9vbGVhbiB7XHJcbiAgICBpZiAoIW90aGVyKSB7XHJcbiAgICAgIHJldHVybiBmYWxzZTtcclxuICAgIH1cclxuXHJcbiAgICBpZiAodGhpcy55ZWFyID09PSBvdGhlci55ZWFyKSB7XHJcbiAgICAgIGlmICh0aGlzLm1vbnRoID09PSBvdGhlci5tb250aCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmRheSA9PT0gb3RoZXIuZGF5ID8gZmFsc2UgOiB0aGlzLmRheSA8IG90aGVyLmRheTtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5tb250aCA8IG90aGVyLm1vbnRoO1xyXG4gICAgICB9XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICByZXR1cm4gdGhpcy55ZWFyIDwgb3RoZXIueWVhcjtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIENoZWNrcyBpZiBjdXJyZW50IGRhdGUgaXMgYWZ0ZXIgYW5vdGhlciBkYXRlXHJcbiAgICovXHJcbiAgYWZ0ZXIob3RoZXI6IE5nYkRhdGUpOiBib29sZWFuIHtcclxuICAgIGlmICghb3RoZXIpIHtcclxuICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgfVxyXG4gICAgaWYgKHRoaXMueWVhciA9PT0gb3RoZXIueWVhcikge1xyXG4gICAgICBpZiAodGhpcy5tb250aCA9PT0gb3RoZXIubW9udGgpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5kYXkgPT09IG90aGVyLmRheSA/IGZhbHNlIDogdGhpcy5kYXkgPiBvdGhlci5kYXk7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMubW9udGggPiBvdGhlci5tb250aDtcclxuICAgICAgfVxyXG4gICAgfSBlbHNlIHtcclxuICAgICAgcmV0dXJuIHRoaXMueWVhciA+IG90aGVyLnllYXI7XHJcbiAgICB9XHJcbiAgfVxyXG59XHJcbiIsImltcG9ydCB7TmdiRGF0ZX0gZnJvbSAnLi9uZ2ItZGF0ZSc7XHJcbmltcG9ydCB7SW5qZWN0YWJsZX0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7aXNJbnRlZ2VyfSBmcm9tICcuLi91dGlsL3V0aWwnO1xyXG5cclxuZnVuY3Rpb24gZnJvbUpTRGF0ZShqc0RhdGU6IERhdGUpIHtcclxuICByZXR1cm4gbmV3IE5nYkRhdGUoanNEYXRlLmdldEZ1bGxZZWFyKCksIGpzRGF0ZS5nZXRNb250aCgpICsgMSwganNEYXRlLmdldERhdGUoKSk7XHJcbn1cclxuZnVuY3Rpb24gdG9KU0RhdGUoZGF0ZTogTmdiRGF0ZSkge1xyXG4gIGNvbnN0IGpzRGF0ZSA9IG5ldyBEYXRlKGRhdGUueWVhciwgZGF0ZS5tb250aCAtIDEsIGRhdGUuZGF5LCAxMik7XHJcbiAgLy8gdGhpcyBpcyBkb25lIGF2b2lkIDMwIC0+IDE5MzAgY29udmVyc2lvblxyXG4gIGlmICghaXNOYU4oanNEYXRlLmdldFRpbWUoKSkpIHtcclxuICAgIGpzRGF0ZS5zZXRGdWxsWWVhcihkYXRlLnllYXIpO1xyXG4gIH1cclxuICByZXR1cm4ganNEYXRlO1xyXG59XHJcblxyXG5leHBvcnQgdHlwZSBOZ2JQZXJpb2QgPSAneScgfCAnbScgfCAnZCc7XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gTkdCX0RBVEVQSUNLRVJfQ0FMRU5EQVJfRkFDVE9SWSgpIHtcclxuICByZXR1cm4gbmV3IE5nYkNhbGVuZGFyR3JlZ29yaWFuKCk7XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBDYWxlbmRhciB1c2VkIGJ5IHRoZSBkYXRlcGlja2VyLlxyXG4gKiBEZWZhdWx0IGltcGxlbWVudGF0aW9uIHVzZXMgR3JlZ29yaWFuIGNhbGVuZGFyLlxyXG4gKi9cclxuQEluamVjdGFibGUoe3Byb3ZpZGVkSW46ICdyb290JywgdXNlRmFjdG9yeTogTkdCX0RBVEVQSUNLRVJfQ0FMRU5EQVJfRkFDVE9SWX0pXHJcbmV4cG9ydCBhYnN0cmFjdCBjbGFzcyBOZ2JDYWxlbmRhciB7XHJcbiAgLyoqXHJcbiAgICogUmV0dXJucyBudW1iZXIgb2YgZGF5cyBwZXIgd2Vlay5cclxuICAgKi9cclxuICBhYnN0cmFjdCBnZXREYXlzUGVyV2VlaygpOiBudW1iZXI7XHJcblxyXG4gIC8qKlxyXG4gICAqIFJldHVybnMgYW4gYXJyYXkgb2YgbW9udGhzIHBlciB5ZWFyLlxyXG4gICAqIFdpdGggZGVmYXVsdCBjYWxlbmRhciB3ZSB1c2UgSVNPIDg2MDEgYW5kIHJldHVybiBbMSwgMiwgLi4uLCAxMl07XHJcbiAgICovXHJcbiAgYWJzdHJhY3QgZ2V0TW9udGhzKHllYXI/OiBudW1iZXIpOiBudW1iZXJbXTtcclxuXHJcbiAgLyoqXHJcbiAgICogUmV0dXJucyBudW1iZXIgb2Ygd2Vla3MgcGVyIG1vbnRoLlxyXG4gICAqL1xyXG4gIGFic3RyYWN0IGdldFdlZWtzUGVyTW9udGgoKTogbnVtYmVyO1xyXG5cclxuICAvKipcclxuICAgKiBSZXR1cm5zIHdlZWtkYXkgbnVtYmVyIGZvciBhIGdpdmVuIGRheS5cclxuICAgKiBXaXRoIGRlZmF1bHQgY2FsZW5kYXIgd2UgdXNlIElTTyA4NjAxOiAnd2Vla2RheScgaXMgMT1Nb24gLi4uIDc9U3VuXHJcbiAgICovXHJcbiAgYWJzdHJhY3QgZ2V0V2Vla2RheShkYXRlOiBOZ2JEYXRlKTogbnVtYmVyO1xyXG5cclxuICAvKipcclxuICAgKiBBZGRzIGEgbnVtYmVyIG9mIHllYXJzLCBtb250aHMgb3IgZGF5cyB0byBhIGdpdmVuIGRhdGUuXHJcbiAgICogUGVyaW9kIGNhbiBiZSAneScsICdtJyBvciAnZCcgYW5kIGRlZmF1bHRzIHRvIGRheS5cclxuICAgKiBOdW1iZXIgZGVmYXVsdHMgdG8gMS5cclxuICAgKi9cclxuICBhYnN0cmFjdCBnZXROZXh0KGRhdGU6IE5nYkRhdGUsIHBlcmlvZD86IE5nYlBlcmlvZCwgbnVtYmVyPzogbnVtYmVyKTogTmdiRGF0ZTtcclxuXHJcbiAgLyoqXHJcbiAgICogU3VidHJhY3RzIGEgbnVtYmVyIG9mIHllYXJzLCBtb250aHMgb3IgZGF5cyBmcm9tIGEgZ2l2ZW4gZGF0ZS5cclxuICAgKiBQZXJpb2QgY2FuIGJlICd5JywgJ20nIG9yICdkJyBhbmQgZGVmYXVsdHMgdG8gZGF5LlxyXG4gICAqIE51bWJlciBkZWZhdWx0cyB0byAxLlxyXG4gICAqL1xyXG4gIGFic3RyYWN0IGdldFByZXYoZGF0ZTogTmdiRGF0ZSwgcGVyaW9kPzogTmdiUGVyaW9kLCBudW1iZXI/OiBudW1iZXIpOiBOZ2JEYXRlO1xyXG5cclxuICAvKipcclxuICAgKiBSZXR1cm5zIHdlZWsgbnVtYmVyIGZvciBhIGdpdmVuIHdlZWsuXHJcbiAgICovXHJcbiAgYWJzdHJhY3QgZ2V0V2Vla051bWJlcih3ZWVrOiBOZ2JEYXRlW10sIGZpcnN0RGF5T2ZXZWVrOiBudW1iZXIpOiBudW1iZXI7XHJcblxyXG4gIC8qKlxyXG4gICAqIFJldHVybnMgdG9kYXkncyBkYXRlLlxyXG4gICAqL1xyXG4gIGFic3RyYWN0IGdldFRvZGF5KCk6IE5nYkRhdGU7XHJcblxyXG4gIC8qKlxyXG4gICAqIENoZWNrcyBpZiBhIGRhdGUgaXMgdmFsaWQgZm9yIGEgY3VycmVudCBjYWxlbmRhci5cclxuICAgKi9cclxuICBhYnN0cmFjdCBpc1ZhbGlkKGRhdGU6IE5nYkRhdGUpOiBib29sZWFuO1xyXG59XHJcblxyXG5ASW5qZWN0YWJsZSgpXHJcbmV4cG9ydCBjbGFzcyBOZ2JDYWxlbmRhckdyZWdvcmlhbiBleHRlbmRzIE5nYkNhbGVuZGFyIHtcclxuICBnZXREYXlzUGVyV2VlaygpIHsgcmV0dXJuIDc7IH1cclxuXHJcbiAgZ2V0TW9udGhzKCkgeyByZXR1cm4gWzEsIDIsIDMsIDQsIDUsIDYsIDcsIDgsIDksIDEwLCAxMSwgMTJdOyB9XHJcblxyXG4gIGdldFdlZWtzUGVyTW9udGgoKSB7IHJldHVybiA2OyB9XHJcblxyXG4gIGdldE5leHQoZGF0ZTogTmdiRGF0ZSwgcGVyaW9kOiBOZ2JQZXJpb2QgPSAnZCcsIG51bWJlciA9IDEpIHtcclxuICAgIGxldCBqc0RhdGUgPSB0b0pTRGF0ZShkYXRlKTtcclxuXHJcbiAgICBzd2l0Y2ggKHBlcmlvZCkge1xyXG4gICAgICBjYXNlICd5JzpcclxuICAgICAgICByZXR1cm4gbmV3IE5nYkRhdGUoZGF0ZS55ZWFyICsgbnVtYmVyLCAxLCAxKTtcclxuICAgICAgY2FzZSAnbSc6XHJcbiAgICAgICAganNEYXRlID0gbmV3IERhdGUoZGF0ZS55ZWFyLCBkYXRlLm1vbnRoICsgbnVtYmVyIC0gMSwgMSwgMTIpO1xyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgICBjYXNlICdkJzpcclxuICAgICAgICBqc0RhdGUuc2V0RGF0ZShqc0RhdGUuZ2V0RGF0ZSgpICsgbnVtYmVyKTtcclxuICAgICAgICBicmVhaztcclxuICAgICAgZGVmYXVsdDpcclxuICAgICAgICByZXR1cm4gZGF0ZTtcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gZnJvbUpTRGF0ZShqc0RhdGUpO1xyXG4gIH1cclxuXHJcbiAgZ2V0UHJldihkYXRlOiBOZ2JEYXRlLCBwZXJpb2Q6IE5nYlBlcmlvZCA9ICdkJywgbnVtYmVyID0gMSkgeyByZXR1cm4gdGhpcy5nZXROZXh0KGRhdGUsIHBlcmlvZCwgLW51bWJlcik7IH1cclxuXHJcbiAgZ2V0V2Vla2RheShkYXRlOiBOZ2JEYXRlKSB7XHJcbiAgICBsZXQganNEYXRlID0gdG9KU0RhdGUoZGF0ZSk7XHJcbiAgICBsZXQgZGF5ID0ganNEYXRlLmdldERheSgpO1xyXG4gICAgLy8gaW4gSlMgRGF0ZSBTdW49MCwgaW4gSVNPIDg2MDEgU3VuPTdcclxuICAgIHJldHVybiBkYXkgPT09IDAgPyA3IDogZGF5O1xyXG4gIH1cclxuXHJcbiAgZ2V0V2Vla051bWJlcih3ZWVrOiBOZ2JEYXRlW10sIGZpcnN0RGF5T2ZXZWVrOiBudW1iZXIpIHtcclxuICAgIC8vIGluIEpTIERhdGUgU3VuPTAsIGluIElTTyA4NjAxIFN1bj03XHJcbiAgICBpZiAoZmlyc3REYXlPZldlZWsgPT09IDcpIHtcclxuICAgICAgZmlyc3REYXlPZldlZWsgPSAwO1xyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0IHRodXJzZGF5SW5kZXggPSAoNCArIDcgLSBmaXJzdERheU9mV2VlaykgJSA3O1xyXG4gICAgbGV0IGRhdGUgPSB3ZWVrW3RodXJzZGF5SW5kZXhdO1xyXG5cclxuICAgIGNvbnN0IGpzRGF0ZSA9IHRvSlNEYXRlKGRhdGUpO1xyXG4gICAganNEYXRlLnNldERhdGUoanNEYXRlLmdldERhdGUoKSArIDQgLSAoanNEYXRlLmdldERheSgpIHx8IDcpKTsgIC8vIFRodXJzZGF5XHJcbiAgICBjb25zdCB0aW1lID0ganNEYXRlLmdldFRpbWUoKTtcclxuICAgIGpzRGF0ZS5zZXRNb250aCgwKTsgIC8vIENvbXBhcmUgd2l0aCBKYW4gMVxyXG4gICAganNEYXRlLnNldERhdGUoMSk7XHJcbiAgICByZXR1cm4gTWF0aC5mbG9vcihNYXRoLnJvdW5kKCh0aW1lIC0ganNEYXRlLmdldFRpbWUoKSkgLyA4NjQwMDAwMCkgLyA3KSArIDE7XHJcbiAgfVxyXG5cclxuICBnZXRUb2RheSgpOiBOZ2JEYXRlIHsgcmV0dXJuIGZyb21KU0RhdGUobmV3IERhdGUoKSk7IH1cclxuXHJcbiAgaXNWYWxpZChkYXRlOiBOZ2JEYXRlKTogYm9vbGVhbiB7XHJcbiAgICBpZiAoIWRhdGUgfHwgIWlzSW50ZWdlcihkYXRlLnllYXIpIHx8ICFpc0ludGVnZXIoZGF0ZS5tb250aCkgfHwgIWlzSW50ZWdlcihkYXRlLmRheSkpIHtcclxuICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0IGpzRGF0ZSA9IHRvSlNEYXRlKGRhdGUpO1xyXG5cclxuICAgIHJldHVybiAhaXNOYU4oanNEYXRlLmdldFRpbWUoKSkgJiYganNEYXRlLmdldEZ1bGxZZWFyKCkgPT09IGRhdGUueWVhciAmJiBqc0RhdGUuZ2V0TW9udGgoKSArIDEgPT09IGRhdGUubW9udGggJiZcclxuICAgICAgICBqc0RhdGUuZ2V0RGF0ZSgpID09PSBkYXRlLmRheTtcclxuICB9XHJcbn1cclxuIiwiaW1wb3J0IHtOZ2JEYXRlfSBmcm9tICcuL25nYi1kYXRlJztcclxuaW1wb3J0IHtEYXRlcGlja2VyVmlld01vZGVsLCBEYXlWaWV3TW9kZWwsIE1vbnRoVmlld01vZGVsfSBmcm9tICcuL2RhdGVwaWNrZXItdmlldy1tb2RlbCc7XHJcbmltcG9ydCB7TmdiQ2FsZW5kYXJ9IGZyb20gJy4vbmdiLWNhbGVuZGFyJztcclxuaW1wb3J0IHtpc0RlZmluZWR9IGZyb20gJy4uL3V0aWwvdXRpbCc7XHJcbmltcG9ydCB7TmdiRGF0ZXBpY2tlckkxOG59IGZyb20gJy4vZGF0ZXBpY2tlci1pMThuJztcclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBpc0NoYW5nZWREYXRlKHByZXY6IE5nYkRhdGUsIG5leHQ6IE5nYkRhdGUpIHtcclxuICByZXR1cm4gIWRhdGVDb21wYXJhdG9yKHByZXYsIG5leHQpO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gZGF0ZUNvbXBhcmF0b3IocHJldjogTmdiRGF0ZSwgbmV4dDogTmdiRGF0ZSkge1xyXG4gIHJldHVybiAoIXByZXYgJiYgIW5leHQpIHx8ICghIXByZXYgJiYgISFuZXh0ICYmIHByZXYuZXF1YWxzKG5leHQpKTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGNoZWNrTWluQmVmb3JlTWF4KG1pbkRhdGU6IE5nYkRhdGUsIG1heERhdGU6IE5nYkRhdGUpIHtcclxuICBpZiAobWF4RGF0ZSAmJiBtaW5EYXRlICYmIG1heERhdGUuYmVmb3JlKG1pbkRhdGUpKSB7XHJcbiAgICB0aHJvdyBuZXcgRXJyb3IoYCdtYXhEYXRlJyAke21heERhdGV9IHNob3VsZCBiZSBncmVhdGVyIHRoYW4gJ21pbkRhdGUnICR7bWluRGF0ZX1gKTtcclxuICB9XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBjaGVja0RhdGVJblJhbmdlKGRhdGU6IE5nYkRhdGUsIG1pbkRhdGU6IE5nYkRhdGUsIG1heERhdGU6IE5nYkRhdGUpOiBOZ2JEYXRlIHtcclxuICBpZiAoZGF0ZSAmJiBtaW5EYXRlICYmIGRhdGUuYmVmb3JlKG1pbkRhdGUpKSB7XHJcbiAgICByZXR1cm4gbWluRGF0ZTtcclxuICB9XHJcbiAgaWYgKGRhdGUgJiYgbWF4RGF0ZSAmJiBkYXRlLmFmdGVyKG1heERhdGUpKSB7XHJcbiAgICByZXR1cm4gbWF4RGF0ZTtcclxuICB9XHJcblxyXG4gIHJldHVybiBkYXRlO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gaXNEYXRlU2VsZWN0YWJsZShkYXRlOiBOZ2JEYXRlLCBzdGF0ZTogRGF0ZXBpY2tlclZpZXdNb2RlbCkge1xyXG4gIGNvbnN0IHttaW5EYXRlLCBtYXhEYXRlLCBkaXNhYmxlZCwgbWFya0Rpc2FibGVkfSA9IHN0YXRlO1xyXG4gIC8vIGNsYW5nLWZvcm1hdCBvZmZcclxuICByZXR1cm4gIShcclxuICAgICFpc0RlZmluZWQoZGF0ZSkgfHxcclxuICAgIGRpc2FibGVkIHx8XHJcbiAgICAobWFya0Rpc2FibGVkICYmIG1hcmtEaXNhYmxlZChkYXRlLCB7eWVhcjogZGF0ZS55ZWFyLCBtb250aDogZGF0ZS5tb250aH0pKSB8fFxyXG4gICAgKG1pbkRhdGUgJiYgZGF0ZS5iZWZvcmUobWluRGF0ZSkpIHx8XHJcbiAgICAobWF4RGF0ZSAmJiBkYXRlLmFmdGVyKG1heERhdGUpKVxyXG4gICk7XHJcbiAgLy8gY2xhbmctZm9ybWF0IG9uXHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBnZW5lcmF0ZVNlbGVjdEJveE1vbnRocyhjYWxlbmRhcjogTmdiQ2FsZW5kYXIsIGRhdGU6IE5nYkRhdGUsIG1pbkRhdGU6IE5nYkRhdGUsIG1heERhdGU6IE5nYkRhdGUpIHtcclxuICBpZiAoIWRhdGUpIHtcclxuICAgIHJldHVybiBbXTtcclxuICB9XHJcblxyXG4gIGxldCBtb250aHMgPSBjYWxlbmRhci5nZXRNb250aHMoZGF0ZS55ZWFyKTtcclxuXHJcbiAgaWYgKG1pbkRhdGUgJiYgZGF0ZS55ZWFyID09PSBtaW5EYXRlLnllYXIpIHtcclxuICAgIGNvbnN0IGluZGV4ID0gbW9udGhzLmZpbmRJbmRleChtb250aCA9PiBtb250aCA9PT0gbWluRGF0ZS5tb250aCk7XHJcbiAgICBtb250aHMgPSBtb250aHMuc2xpY2UoaW5kZXgpO1xyXG4gIH1cclxuXHJcbiAgaWYgKG1heERhdGUgJiYgZGF0ZS55ZWFyID09PSBtYXhEYXRlLnllYXIpIHtcclxuICAgIGNvbnN0IGluZGV4ID0gbW9udGhzLmZpbmRJbmRleChtb250aCA9PiBtb250aCA9PT0gbWF4RGF0ZS5tb250aCk7XHJcbiAgICBtb250aHMgPSBtb250aHMuc2xpY2UoMCwgaW5kZXggKyAxKTtcclxuICB9XHJcblxyXG4gIHJldHVybiBtb250aHM7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBnZW5lcmF0ZVNlbGVjdEJveFllYXJzKGRhdGU6IE5nYkRhdGUsIG1pbkRhdGU6IE5nYkRhdGUsIG1heERhdGU6IE5nYkRhdGUpIHtcclxuICBpZiAoIWRhdGUpIHtcclxuICAgIHJldHVybiBbXTtcclxuICB9XHJcblxyXG4gIGNvbnN0IHN0YXJ0ID0gbWluRGF0ZSAmJiBtaW5EYXRlLnllYXIgfHwgZGF0ZS55ZWFyIC0gMTA7XHJcbiAgY29uc3QgZW5kID0gbWF4RGF0ZSAmJiBtYXhEYXRlLnllYXIgfHwgZGF0ZS55ZWFyICsgMTA7XHJcblxyXG4gIHJldHVybiBBcnJheS5mcm9tKHtsZW5ndGg6IGVuZCAtIHN0YXJ0ICsgMX0sIChlLCBpKSA9PiBzdGFydCArIGkpO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gbmV4dE1vbnRoRGlzYWJsZWQoY2FsZW5kYXI6IE5nYkNhbGVuZGFyLCBkYXRlOiBOZ2JEYXRlLCBtYXhEYXRlOiBOZ2JEYXRlKSB7XHJcbiAgcmV0dXJuIG1heERhdGUgJiYgY2FsZW5kYXIuZ2V0TmV4dChkYXRlLCAnbScpLmFmdGVyKG1heERhdGUpO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gcHJldk1vbnRoRGlzYWJsZWQoY2FsZW5kYXI6IE5nYkNhbGVuZGFyLCBkYXRlOiBOZ2JEYXRlLCBtaW5EYXRlOiBOZ2JEYXRlKSB7XHJcbiAgY29uc3QgcHJldkRhdGUgPSBjYWxlbmRhci5nZXRQcmV2KGRhdGUsICdtJyk7XHJcbiAgcmV0dXJuIG1pbkRhdGUgJiYgKHByZXZEYXRlLnllYXIgPT09IG1pbkRhdGUueWVhciAmJiBwcmV2RGF0ZS5tb250aCA8IG1pbkRhdGUubW9udGggfHxcclxuICAgICAgICAgICAgICAgICAgICAgcHJldkRhdGUueWVhciA8IG1pbkRhdGUueWVhciAmJiBtaW5EYXRlLm1vbnRoID09PSAxKTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGJ1aWxkTW9udGhzKFxyXG4gICAgY2FsZW5kYXI6IE5nYkNhbGVuZGFyLCBkYXRlOiBOZ2JEYXRlLCBzdGF0ZTogRGF0ZXBpY2tlclZpZXdNb2RlbCwgaTE4bjogTmdiRGF0ZXBpY2tlckkxOG4sXHJcbiAgICBmb3JjZTogYm9vbGVhbik6IE1vbnRoVmlld01vZGVsW10ge1xyXG4gIGNvbnN0IHtkaXNwbGF5TW9udGhzLCBtb250aHN9ID0gc3RhdGU7XHJcbiAgLy8gbW92ZSBvbGQgbW9udGhzIHRvIGEgdGVtcG9yYXJ5IGFycmF5XHJcbiAgY29uc3QgbW9udGhzVG9SZXVzZSA9IG1vbnRocy5zcGxpY2UoMCwgbW9udGhzLmxlbmd0aCk7XHJcblxyXG4gIC8vIGdlbmVyYXRlIG5ldyBmaXJzdCBkYXRlcywgbnVsbGlmeSBvciByZXVzZSBtb250aHNcclxuICBjb25zdCBmaXJzdERhdGVzID0gQXJyYXkuZnJvbSh7bGVuZ3RoOiBkaXNwbGF5TW9udGhzfSwgKF8sIGkpID0+IHtcclxuICAgIGNvbnN0IGZpcnN0RGF0ZSA9IGNhbGVuZGFyLmdldE5leHQoZGF0ZSwgJ20nLCBpKTtcclxuICAgIG1vbnRoc1tpXSA9IG51bGw7XHJcblxyXG4gICAgaWYgKCFmb3JjZSkge1xyXG4gICAgICBjb25zdCByZXVzZWRJbmRleCA9IG1vbnRoc1RvUmV1c2UuZmluZEluZGV4KG1vbnRoID0+IG1vbnRoLmZpcnN0RGF0ZS5lcXVhbHMoZmlyc3REYXRlKSk7XHJcbiAgICAgIC8vIG1vdmUgcmV1c2VkIG1vbnRoIGJhY2sgdG8gbW9udGhzXHJcbiAgICAgIGlmIChyZXVzZWRJbmRleCAhPT0gLTEpIHtcclxuICAgICAgICBtb250aHNbaV0gPSBtb250aHNUb1JldXNlLnNwbGljZShyZXVzZWRJbmRleCwgMSlbMF07XHJcbiAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gZmlyc3REYXRlO1xyXG4gIH0pO1xyXG5cclxuICAvLyByZWJ1aWxkIG51bGxpZmllZCBtb250aHNcclxuICBmaXJzdERhdGVzLmZvckVhY2goKGZpcnN0RGF0ZSwgaSkgPT4ge1xyXG4gICAgaWYgKG1vbnRoc1tpXSA9PT0gbnVsbCkge1xyXG4gICAgICBtb250aHNbaV0gPSBidWlsZE1vbnRoKGNhbGVuZGFyLCBmaXJzdERhdGUsIHN0YXRlLCBpMThuLCBtb250aHNUb1JldXNlLnNoaWZ0KCkgfHwge30gYXMgTW9udGhWaWV3TW9kZWwpO1xyXG4gICAgfVxyXG4gIH0pO1xyXG5cclxuICByZXR1cm4gbW9udGhzO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gYnVpbGRNb250aChcclxuICAgIGNhbGVuZGFyOiBOZ2JDYWxlbmRhciwgZGF0ZTogTmdiRGF0ZSwgc3RhdGU6IERhdGVwaWNrZXJWaWV3TW9kZWwsIGkxOG46IE5nYkRhdGVwaWNrZXJJMThuLFxyXG4gICAgbW9udGg6IE1vbnRoVmlld01vZGVsID0ge30gYXMgTW9udGhWaWV3TW9kZWwpOiBNb250aFZpZXdNb2RlbCB7XHJcbiAgY29uc3Qge21pbkRhdGUsIG1heERhdGUsIGZpcnN0RGF5T2ZXZWVrLCBtYXJrRGlzYWJsZWQsIG91dHNpZGVEYXlzfSA9IHN0YXRlO1xyXG5cclxuICBtb250aC5maXJzdERhdGUgPSBudWxsO1xyXG4gIG1vbnRoLmxhc3REYXRlID0gbnVsbDtcclxuICBtb250aC5udW1iZXIgPSBkYXRlLm1vbnRoO1xyXG4gIG1vbnRoLnllYXIgPSBkYXRlLnllYXI7XHJcbiAgbW9udGgud2Vla3MgPSBtb250aC53ZWVrcyB8fCBbXTtcclxuICBtb250aC53ZWVrZGF5cyA9IG1vbnRoLndlZWtkYXlzIHx8IFtdO1xyXG5cclxuICBkYXRlID0gZ2V0Rmlyc3RWaWV3RGF0ZShjYWxlbmRhciwgZGF0ZSwgZmlyc3REYXlPZldlZWspO1xyXG5cclxuICAvLyBtb250aCBoYXMgd2Vla3NcclxuICBmb3IgKGxldCB3ZWVrID0gMDsgd2VlayA8IGNhbGVuZGFyLmdldFdlZWtzUGVyTW9udGgoKTsgd2VlaysrKSB7XHJcbiAgICBsZXQgd2Vla09iamVjdCA9IG1vbnRoLndlZWtzW3dlZWtdO1xyXG4gICAgaWYgKCF3ZWVrT2JqZWN0KSB7XHJcbiAgICAgIHdlZWtPYmplY3QgPSBtb250aC53ZWVrc1t3ZWVrXSA9IHtudW1iZXI6IDAsIGRheXM6IFtdLCBjb2xsYXBzZWQ6IHRydWV9O1xyXG4gICAgfVxyXG4gICAgY29uc3QgZGF5cyA9IHdlZWtPYmplY3QuZGF5cztcclxuXHJcbiAgICAvLyB3ZWVrIGhhcyBkYXlzXHJcbiAgICBmb3IgKGxldCBkYXkgPSAwOyBkYXkgPCBjYWxlbmRhci5nZXREYXlzUGVyV2VlaygpOyBkYXkrKykge1xyXG4gICAgICBpZiAod2VlayA9PT0gMCkge1xyXG4gICAgICAgIG1vbnRoLndlZWtkYXlzW2RheV0gPSBjYWxlbmRhci5nZXRXZWVrZGF5KGRhdGUpO1xyXG4gICAgICB9XHJcblxyXG4gICAgICBjb25zdCBuZXdEYXRlID0gbmV3IE5nYkRhdGUoZGF0ZS55ZWFyLCBkYXRlLm1vbnRoLCBkYXRlLmRheSk7XHJcbiAgICAgIGNvbnN0IG5leHREYXRlID0gY2FsZW5kYXIuZ2V0TmV4dChuZXdEYXRlKTtcclxuXHJcbiAgICAgIGNvbnN0IGFyaWFMYWJlbCA9IGkxOG4uZ2V0RGF5QXJpYUxhYmVsKG5ld0RhdGUpO1xyXG5cclxuICAgICAgLy8gbWFya2luZyBkYXRlIGFzIGRpc2FibGVkXHJcbiAgICAgIGxldCBkaXNhYmxlZCA9ICEhKChtaW5EYXRlICYmIG5ld0RhdGUuYmVmb3JlKG1pbkRhdGUpKSB8fCAobWF4RGF0ZSAmJiBuZXdEYXRlLmFmdGVyKG1heERhdGUpKSk7XHJcbiAgICAgIGlmICghZGlzYWJsZWQgJiYgbWFya0Rpc2FibGVkKSB7XHJcbiAgICAgICAgZGlzYWJsZWQgPSBtYXJrRGlzYWJsZWQobmV3RGF0ZSwge21vbnRoOiBtb250aC5udW1iZXIsIHllYXI6IG1vbnRoLnllYXJ9KTtcclxuICAgICAgfVxyXG5cclxuICAgICAgLy8gc2F2aW5nIGZpcnN0IGRhdGUgb2YgdGhlIG1vbnRoXHJcbiAgICAgIGlmIChtb250aC5maXJzdERhdGUgPT09IG51bGwgJiYgbmV3RGF0ZS5tb250aCA9PT0gbW9udGgubnVtYmVyKSB7XHJcbiAgICAgICAgbW9udGguZmlyc3REYXRlID0gbmV3RGF0ZTtcclxuICAgICAgfVxyXG5cclxuICAgICAgLy8gc2F2aW5nIGxhc3QgZGF0ZSBvZiB0aGUgbW9udGhcclxuICAgICAgaWYgKG5ld0RhdGUubW9udGggPT09IG1vbnRoLm51bWJlciAmJiBuZXh0RGF0ZS5tb250aCAhPT0gbW9udGgubnVtYmVyKSB7XHJcbiAgICAgICAgbW9udGgubGFzdERhdGUgPSBuZXdEYXRlO1xyXG4gICAgICB9XHJcblxyXG4gICAgICBsZXQgZGF5T2JqZWN0ID0gZGF5c1tkYXldO1xyXG4gICAgICBpZiAoIWRheU9iamVjdCkge1xyXG4gICAgICAgIGRheU9iamVjdCA9IGRheXNbZGF5XSA9IHt9IGFzIERheVZpZXdNb2RlbDtcclxuICAgICAgfVxyXG4gICAgICBkYXlPYmplY3QuZGF0ZSA9IG5ld0RhdGU7XHJcbiAgICAgIGRheU9iamVjdC5jb250ZXh0ID0gT2JqZWN0LmFzc2lnbihcclxuICAgICAgICAgIGRheU9iamVjdC5jb250ZXh0IHx8IHt9LFxyXG4gICAgICAgICAge2RhdGU6IG5ld0RhdGUsIGN1cnJlbnRNb250aDogbW9udGgubnVtYmVyLCBkaXNhYmxlZCwgZm9jdXNlZDogZmFsc2UsIHNlbGVjdGVkOiBmYWxzZX0pO1xyXG4gICAgICBkYXlPYmplY3QudGFiaW5kZXggPSAtMTtcclxuICAgICAgZGF5T2JqZWN0LmFyaWFMYWJlbCA9IGFyaWFMYWJlbDtcclxuICAgICAgZGF5T2JqZWN0LmhpZGRlbiA9IGZhbHNlO1xyXG5cclxuICAgICAgZGF0ZSA9IG5leHREYXRlO1xyXG4gICAgfVxyXG5cclxuICAgIHdlZWtPYmplY3QubnVtYmVyID0gY2FsZW5kYXIuZ2V0V2Vla051bWJlcihkYXlzLm1hcChkYXkgPT4gZGF5LmRhdGUpLCBmaXJzdERheU9mV2Vlayk7XHJcblxyXG4gICAgLy8gbWFya2luZyB3ZWVrIGFzIGNvbGxhcHNlZFxyXG4gICAgd2Vla09iamVjdC5jb2xsYXBzZWQgPSBvdXRzaWRlRGF5cyA9PT0gJ2NvbGxhcHNlZCcgJiYgZGF5c1swXS5kYXRlLm1vbnRoICE9PSBtb250aC5udW1iZXIgJiZcclxuICAgICAgICBkYXlzW2RheXMubGVuZ3RoIC0gMV0uZGF0ZS5tb250aCAhPT0gbW9udGgubnVtYmVyO1xyXG4gIH1cclxuXHJcbiAgcmV0dXJuIG1vbnRoO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gZ2V0Rmlyc3RWaWV3RGF0ZShjYWxlbmRhcjogTmdiQ2FsZW5kYXIsIGRhdGU6IE5nYkRhdGUsIGZpcnN0RGF5T2ZXZWVrOiBudW1iZXIpOiBOZ2JEYXRlIHtcclxuICBjb25zdCBkYXlzUGVyV2VlayA9IGNhbGVuZGFyLmdldERheXNQZXJXZWVrKCk7XHJcbiAgY29uc3QgZmlyc3RNb250aERhdGUgPSBuZXcgTmdiRGF0ZShkYXRlLnllYXIsIGRhdGUubW9udGgsIDEpO1xyXG4gIGNvbnN0IGRheU9mV2VlayA9IGNhbGVuZGFyLmdldFdlZWtkYXkoZmlyc3RNb250aERhdGUpICUgZGF5c1BlcldlZWs7XHJcbiAgcmV0dXJuIGNhbGVuZGFyLmdldFByZXYoZmlyc3RNb250aERhdGUsICdkJywgKGRheXNQZXJXZWVrICsgZGF5T2ZXZWVrIC0gZmlyc3REYXlPZldlZWspICUgZGF5c1BlcldlZWspO1xyXG59XHJcbiIsImltcG9ydCB7SW5qZWN0LCBJbmplY3RhYmxlLCBMT0NBTEVfSUR9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQge0Zvcm1TdHlsZSwgZ2V0TG9jYWxlRGF5TmFtZXMsIGdldExvY2FsZU1vbnRoTmFtZXMsIFRyYW5zbGF0aW9uV2lkdGgsIGZvcm1hdERhdGV9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XHJcbmltcG9ydCB7TmdiRGF0ZVN0cnVjdH0gZnJvbSAnLi9uZ2ItZGF0ZS1zdHJ1Y3QnO1xyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIE5HQl9EQVRFUElDS0VSXzE4Tl9GQUNUT1JZKGxvY2FsZSkge1xyXG4gIHJldHVybiBuZXcgTmdiRGF0ZXBpY2tlckkxOG5EZWZhdWx0KGxvY2FsZSk7XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBUeXBlIG9mIHRoZSBzZXJ2aWNlIHN1cHBseWluZyBtb250aCBhbmQgd2Vla2RheSBuYW1lcyB0byB0byBOZ2JEYXRlcGlja2VyIGNvbXBvbmVudC5cclxuICogVGhlIGRlZmF1bHQgaW1wbGVtZW50YXRpb24gb2YgdGhpcyBzZXJ2aWNlIGhvbm9ycyB0aGUgQW5ndWxhciBsb2NhbGUsIGFuZCB1c2VzIHRoZSByZWdpc3RlcmVkIGxvY2FsZSBkYXRhLFxyXG4gKiBhcyBleHBsYWluZWQgaW4gdGhlIEFuZ3VsYXIgaTE4biBndWlkZS5cclxuICogU2VlIHRoZSBpMThuIGRlbW8gZm9yIGhvdyB0byBleHRlbmQgdGhpcyBjbGFzcyBhbmQgZGVmaW5lIGEgY3VzdG9tIHByb3ZpZGVyIGZvciBpMThuLlxyXG4gKi9cclxuQEluamVjdGFibGUoe3Byb3ZpZGVkSW46ICdyb290JywgdXNlRmFjdG9yeTogTkdCX0RBVEVQSUNLRVJfMThOX0ZBQ1RPUlksIGRlcHM6IFtMT0NBTEVfSURdfSlcclxuZXhwb3J0IGFic3RyYWN0IGNsYXNzIE5nYkRhdGVwaWNrZXJJMThuIHtcclxuICAvKipcclxuICAgKiBSZXR1cm5zIHRoZSBzaG9ydCB3ZWVrZGF5IG5hbWUgdG8gZGlzcGxheSBpbiB0aGUgaGVhZGluZyBvZiB0aGUgbW9udGggdmlldy5cclxuICAgKiBXaXRoIGRlZmF1bHQgY2FsZW5kYXIgd2UgdXNlIElTTyA4NjAxOiAnd2Vla2RheScgaXMgMT1Nb24gLi4uIDc9U3VuXHJcbiAgICovXHJcbiAgYWJzdHJhY3QgZ2V0V2Vla2RheVNob3J0TmFtZSh3ZWVrZGF5OiBudW1iZXIpOiBzdHJpbmc7XHJcblxyXG4gIC8qKlxyXG4gICAqIFJldHVybnMgdGhlIHNob3J0IG1vbnRoIG5hbWUgdG8gZGlzcGxheSBpbiB0aGUgZGF0ZSBwaWNrZXIgbmF2aWdhdGlvbi5cclxuICAgKiBXaXRoIGRlZmF1bHQgY2FsZW5kYXIgd2UgdXNlIElTTyA4NjAxOiAnbW9udGgnIGlzIDE9SmFuIC4uLiAxMj1EZWNcclxuICAgKi9cclxuICBhYnN0cmFjdCBnZXRNb250aFNob3J0TmFtZShtb250aDogbnVtYmVyLCB5ZWFyPzogbnVtYmVyKTogc3RyaW5nO1xyXG5cclxuICAvKipcclxuICAgKiBSZXR1cm5zIHRoZSBmdWxsIG1vbnRoIG5hbWUgdG8gZGlzcGxheSBpbiB0aGUgZGF0ZSBwaWNrZXIgbmF2aWdhdGlvbi5cclxuICAgKiBXaXRoIGRlZmF1bHQgY2FsZW5kYXIgd2UgdXNlIElTTyA4NjAxOiAnbW9udGgnIGlzIDE9SmFudWFyeSAuLi4gMTI9RGVjZW1iZXJcclxuICAgKi9cclxuICBhYnN0cmFjdCBnZXRNb250aEZ1bGxOYW1lKG1vbnRoOiBudW1iZXIsIHllYXI/OiBudW1iZXIpOiBzdHJpbmc7XHJcblxyXG4gIC8qKlxyXG4gICAqIFJldHVybnMgdGhlIHZhbHVlIG9mIHRoZSAnYXJpYS1sYWJlbCcgYXR0cmlidXRlIGZvciBhIHNwZWNpZmljIGRhdGVcclxuICAgKlxyXG4gICAqIEBzaW5jZSAyLjAuMFxyXG4gICAqL1xyXG4gIGFic3RyYWN0IGdldERheUFyaWFMYWJlbChkYXRlOiBOZ2JEYXRlU3RydWN0KTogc3RyaW5nO1xyXG5cclxuICAvKipcclxuICAgKiBSZXR1cm5zIHRoZSB0ZXh0dWFsIHJlcHJlc2VudGF0aW9uIG9mIGEgZGF5IHRoYXQgaXMgcmVuZGVyZWQgaW4gYSBkYXkgY2VsbFxyXG4gICAqXHJcbiAgICogQHNpbmNlIDMuMC4wXHJcbiAgICovXHJcbiAgZ2V0RGF5TnVtZXJhbHMoZGF0ZTogTmdiRGF0ZVN0cnVjdCk6IHN0cmluZyB7IHJldHVybiBgJHtkYXRlLmRheX1gOyB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFJldHVybnMgdGhlIHRleHR1YWwgcmVwcmVzZW50YXRpb24gb2YgYSB3ZWVrIG51bWJlciByZW5kZXJlZCBieSBkYXRlIHBpY2tlclxyXG4gICAqXHJcbiAgICogQHNpbmNlIDMuMC4wXHJcbiAgICovXHJcbiAgZ2V0V2Vla051bWVyYWxzKHdlZWtOdW1iZXI6IG51bWJlcik6IHN0cmluZyB7IHJldHVybiBgJHt3ZWVrTnVtYmVyfWA7IH1cclxuXHJcbiAgLyoqXHJcbiAgICogUmV0dXJucyB0aGUgdGV4dHVhbCByZXByZXNlbnRhdGlvbiBvZiBhIHllYXIgdGhhdCBpcyByZW5kZXJlZFxyXG4gICAqIGluIGRhdGUgcGlja2VyIHllYXIgc2VsZWN0IGJveFxyXG4gICAqXHJcbiAgICogQHNpbmNlIDMuMC4wXHJcbiAgICovXHJcbiAgZ2V0WWVhck51bWVyYWxzKHllYXI6IG51bWJlcik6IHN0cmluZyB7IHJldHVybiBgJHt5ZWFyfWA7IH1cclxufVxyXG5cclxuQEluamVjdGFibGUoKVxyXG5leHBvcnQgY2xhc3MgTmdiRGF0ZXBpY2tlckkxOG5EZWZhdWx0IGV4dGVuZHMgTmdiRGF0ZXBpY2tlckkxOG4ge1xyXG4gIHByaXZhdGUgX3dlZWtkYXlzU2hvcnQ6IEFycmF5PHN0cmluZz47XHJcbiAgcHJpdmF0ZSBfbW9udGhzU2hvcnQ6IEFycmF5PHN0cmluZz47XHJcbiAgcHJpdmF0ZSBfbW9udGhzRnVsbDogQXJyYXk8c3RyaW5nPjtcclxuXHJcbiAgY29uc3RydWN0b3IoQEluamVjdChMT0NBTEVfSUQpIHByaXZhdGUgX2xvY2FsZTogc3RyaW5nKSB7XHJcbiAgICBzdXBlcigpO1xyXG5cclxuICAgIGNvbnN0IHdlZWtkYXlzU3RhcnRpbmdPblN1bmRheSA9IGdldExvY2FsZURheU5hbWVzKF9sb2NhbGUsIEZvcm1TdHlsZS5TdGFuZGFsb25lLCBUcmFuc2xhdGlvbldpZHRoLlNob3J0KTtcclxuICAgIHRoaXMuX3dlZWtkYXlzU2hvcnQgPSB3ZWVrZGF5c1N0YXJ0aW5nT25TdW5kYXkubWFwKChkYXksIGluZGV4KSA9PiB3ZWVrZGF5c1N0YXJ0aW5nT25TdW5kYXlbKGluZGV4ICsgMSkgJSA3XSk7XHJcblxyXG4gICAgdGhpcy5fbW9udGhzU2hvcnQgPSBnZXRMb2NhbGVNb250aE5hbWVzKF9sb2NhbGUsIEZvcm1TdHlsZS5TdGFuZGFsb25lLCBUcmFuc2xhdGlvbldpZHRoLkFiYnJldmlhdGVkKTtcclxuICAgIHRoaXMuX21vbnRoc0Z1bGwgPSBnZXRMb2NhbGVNb250aE5hbWVzKF9sb2NhbGUsIEZvcm1TdHlsZS5TdGFuZGFsb25lLCBUcmFuc2xhdGlvbldpZHRoLldpZGUpO1xyXG4gIH1cclxuXHJcbiAgZ2V0V2Vla2RheVNob3J0TmFtZSh3ZWVrZGF5OiBudW1iZXIpOiBzdHJpbmcgeyByZXR1cm4gdGhpcy5fd2Vla2RheXNTaG9ydFt3ZWVrZGF5IC0gMV07IH1cclxuXHJcbiAgZ2V0TW9udGhTaG9ydE5hbWUobW9udGg6IG51bWJlcik6IHN0cmluZyB7IHJldHVybiB0aGlzLl9tb250aHNTaG9ydFttb250aCAtIDFdOyB9XHJcblxyXG4gIGdldE1vbnRoRnVsbE5hbWUobW9udGg6IG51bWJlcik6IHN0cmluZyB7IHJldHVybiB0aGlzLl9tb250aHNGdWxsW21vbnRoIC0gMV07IH1cclxuXHJcbiAgZ2V0RGF5QXJpYUxhYmVsKGRhdGU6IE5nYkRhdGVTdHJ1Y3QpOiBzdHJpbmcge1xyXG4gICAgY29uc3QganNEYXRlID0gbmV3IERhdGUoZGF0ZS55ZWFyLCBkYXRlLm1vbnRoIC0gMSwgZGF0ZS5kYXkpO1xyXG4gICAgcmV0dXJuIGZvcm1hdERhdGUoanNEYXRlLCAnZnVsbERhdGUnLCB0aGlzLl9sb2NhbGUpO1xyXG4gIH1cclxufVxyXG4iLCJpbXBvcnQge05nYkNhbGVuZGFyLCBOZ2JQZXJpb2R9IGZyb20gJy4vbmdiLWNhbGVuZGFyJztcclxuaW1wb3J0IHtOZ2JEYXRlfSBmcm9tICcuL25nYi1kYXRlJztcclxuaW1wb3J0IHtOZ2JEYXRlU3RydWN0fSBmcm9tICcuL25nYi1kYXRlLXN0cnVjdCc7XHJcbmltcG9ydCB7RGF0ZXBpY2tlclZpZXdNb2RlbCwgTmdiTWFya0Rpc2FibGVkfSBmcm9tICcuL2RhdGVwaWNrZXItdmlldy1tb2RlbCc7XHJcbmltcG9ydCB7SW5qZWN0YWJsZX0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7aXNJbnRlZ2VyLCB0b0ludGVnZXJ9IGZyb20gJy4uL3V0aWwvdXRpbCc7XHJcbmltcG9ydCB7T2JzZXJ2YWJsZSwgU3ViamVjdH0gZnJvbSAncnhqcyc7XHJcbmltcG9ydCB7XHJcbiAgYnVpbGRNb250aHMsXHJcbiAgY2hlY2tEYXRlSW5SYW5nZSxcclxuICBjaGVja01pbkJlZm9yZU1heCxcclxuICBpc0NoYW5nZWREYXRlLFxyXG4gIGlzRGF0ZVNlbGVjdGFibGUsXHJcbiAgZ2VuZXJhdGVTZWxlY3RCb3hZZWFycyxcclxuICBnZW5lcmF0ZVNlbGVjdEJveE1vbnRocyxcclxuICBwcmV2TW9udGhEaXNhYmxlZCxcclxuICBuZXh0TW9udGhEaXNhYmxlZFxyXG59IGZyb20gJy4vZGF0ZXBpY2tlci10b29scyc7XHJcblxyXG5pbXBvcnQge2ZpbHRlcn0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xyXG5pbXBvcnQge05nYkRhdGVwaWNrZXJJMThufSBmcm9tICcuL2RhdGVwaWNrZXItaTE4bic7XHJcblxyXG5ASW5qZWN0YWJsZSgpXHJcbmV4cG9ydCBjbGFzcyBOZ2JEYXRlcGlja2VyU2VydmljZSB7XHJcbiAgcHJpdmF0ZSBfbW9kZWwkID0gbmV3IFN1YmplY3Q8RGF0ZXBpY2tlclZpZXdNb2RlbD4oKTtcclxuXHJcbiAgcHJpdmF0ZSBfc2VsZWN0JCA9IG5ldyBTdWJqZWN0PE5nYkRhdGU+KCk7XHJcblxyXG4gIHByaXZhdGUgX3N0YXRlOiBEYXRlcGlja2VyVmlld01vZGVsID0ge1xyXG4gICAgZGlzYWJsZWQ6IGZhbHNlLFxyXG4gICAgZGlzcGxheU1vbnRoczogMSxcclxuICAgIGZpcnN0RGF5T2ZXZWVrOiAxLFxyXG4gICAgZm9jdXNWaXNpYmxlOiBmYWxzZSxcclxuICAgIG1vbnRoczogW10sXHJcbiAgICBuYXZpZ2F0aW9uOiAnc2VsZWN0JyxcclxuICAgIG91dHNpZGVEYXlzOiAndmlzaWJsZScsXHJcbiAgICBwcmV2RGlzYWJsZWQ6IGZhbHNlLFxyXG4gICAgbmV4dERpc2FibGVkOiBmYWxzZSxcclxuICAgIHNlbGVjdEJveGVzOiB7eWVhcnM6IFtdLCBtb250aHM6IFtdfSxcclxuICAgIHNlbGVjdGVkRGF0ZTogbnVsbFxyXG4gIH07XHJcblxyXG4gIGdldCBtb2RlbCQoKTogT2JzZXJ2YWJsZTxEYXRlcGlja2VyVmlld01vZGVsPiB7IHJldHVybiB0aGlzLl9tb2RlbCQucGlwZShmaWx0ZXIobW9kZWwgPT4gbW9kZWwubW9udGhzLmxlbmd0aCA+IDApKTsgfVxyXG5cclxuICBnZXQgc2VsZWN0JCgpOiBPYnNlcnZhYmxlPE5nYkRhdGU+IHsgcmV0dXJuIHRoaXMuX3NlbGVjdCQucGlwZShmaWx0ZXIoZGF0ZSA9PiBkYXRlICE9PSBudWxsKSk7IH1cclxuXHJcbiAgc2V0IGRpc2FibGVkKGRpc2FibGVkOiBib29sZWFuKSB7XHJcbiAgICBpZiAodGhpcy5fc3RhdGUuZGlzYWJsZWQgIT09IGRpc2FibGVkKSB7XHJcbiAgICAgIHRoaXMuX25leHRTdGF0ZSh7ZGlzYWJsZWR9KTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHNldCBkaXNwbGF5TW9udGhzKGRpc3BsYXlNb250aHM6IG51bWJlcikge1xyXG4gICAgZGlzcGxheU1vbnRocyA9IHRvSW50ZWdlcihkaXNwbGF5TW9udGhzKTtcclxuICAgIGlmIChpc0ludGVnZXIoZGlzcGxheU1vbnRocykgJiYgZGlzcGxheU1vbnRocyA+IDAgJiYgdGhpcy5fc3RhdGUuZGlzcGxheU1vbnRocyAhPT0gZGlzcGxheU1vbnRocykge1xyXG4gICAgICB0aGlzLl9uZXh0U3RhdGUoe2Rpc3BsYXlNb250aHN9KTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHNldCBmaXJzdERheU9mV2VlayhmaXJzdERheU9mV2VlazogbnVtYmVyKSB7XHJcbiAgICBmaXJzdERheU9mV2VlayA9IHRvSW50ZWdlcihmaXJzdERheU9mV2Vlayk7XHJcbiAgICBpZiAoaXNJbnRlZ2VyKGZpcnN0RGF5T2ZXZWVrKSAmJiBmaXJzdERheU9mV2VlayA+PSAwICYmIHRoaXMuX3N0YXRlLmZpcnN0RGF5T2ZXZWVrICE9PSBmaXJzdERheU9mV2Vlaykge1xyXG4gICAgICB0aGlzLl9uZXh0U3RhdGUoe2ZpcnN0RGF5T2ZXZWVrfSk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBzZXQgZm9jdXNWaXNpYmxlKGZvY3VzVmlzaWJsZTogYm9vbGVhbikge1xyXG4gICAgaWYgKHRoaXMuX3N0YXRlLmZvY3VzVmlzaWJsZSAhPT0gZm9jdXNWaXNpYmxlICYmICF0aGlzLl9zdGF0ZS5kaXNhYmxlZCkge1xyXG4gICAgICB0aGlzLl9uZXh0U3RhdGUoe2ZvY3VzVmlzaWJsZX0pO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgc2V0IG1heERhdGUoZGF0ZTogTmdiRGF0ZSkge1xyXG4gICAgY29uc3QgbWF4RGF0ZSA9IHRoaXMudG9WYWxpZERhdGUoZGF0ZSwgbnVsbCk7XHJcbiAgICBpZiAoaXNDaGFuZ2VkRGF0ZSh0aGlzLl9zdGF0ZS5tYXhEYXRlLCBtYXhEYXRlKSkge1xyXG4gICAgICB0aGlzLl9uZXh0U3RhdGUoe21heERhdGV9KTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHNldCBtYXJrRGlzYWJsZWQobWFya0Rpc2FibGVkOiBOZ2JNYXJrRGlzYWJsZWQpIHtcclxuICAgIGlmICh0aGlzLl9zdGF0ZS5tYXJrRGlzYWJsZWQgIT09IG1hcmtEaXNhYmxlZCkge1xyXG4gICAgICB0aGlzLl9uZXh0U3RhdGUoe21hcmtEaXNhYmxlZH0pO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgc2V0IG1pbkRhdGUoZGF0ZTogTmdiRGF0ZSkge1xyXG4gICAgY29uc3QgbWluRGF0ZSA9IHRoaXMudG9WYWxpZERhdGUoZGF0ZSwgbnVsbCk7XHJcbiAgICBpZiAoaXNDaGFuZ2VkRGF0ZSh0aGlzLl9zdGF0ZS5taW5EYXRlLCBtaW5EYXRlKSkge1xyXG4gICAgICB0aGlzLl9uZXh0U3RhdGUoe21pbkRhdGV9KTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHNldCBuYXZpZ2F0aW9uKG5hdmlnYXRpb246ICdzZWxlY3QnIHwgJ2Fycm93cycgfCAnbm9uZScpIHtcclxuICAgIGlmICh0aGlzLl9zdGF0ZS5uYXZpZ2F0aW9uICE9PSBuYXZpZ2F0aW9uKSB7XHJcbiAgICAgIHRoaXMuX25leHRTdGF0ZSh7bmF2aWdhdGlvbn0pO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgc2V0IG91dHNpZGVEYXlzKG91dHNpZGVEYXlzOiAndmlzaWJsZScgfCAnY29sbGFwc2VkJyB8ICdoaWRkZW4nKSB7XHJcbiAgICBpZiAodGhpcy5fc3RhdGUub3V0c2lkZURheXMgIT09IG91dHNpZGVEYXlzKSB7XHJcbiAgICAgIHRoaXMuX25leHRTdGF0ZSh7b3V0c2lkZURheXN9KTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgX2NhbGVuZGFyOiBOZ2JDYWxlbmRhciwgcHJpdmF0ZSBfaTE4bjogTmdiRGF0ZXBpY2tlckkxOG4pIHt9XHJcblxyXG4gIGZvY3VzKGRhdGU6IE5nYkRhdGUpIHtcclxuICAgIGlmICghdGhpcy5fc3RhdGUuZGlzYWJsZWQgJiYgdGhpcy5fY2FsZW5kYXIuaXNWYWxpZChkYXRlKSAmJiBpc0NoYW5nZWREYXRlKHRoaXMuX3N0YXRlLmZvY3VzRGF0ZSwgZGF0ZSkpIHtcclxuICAgICAgdGhpcy5fbmV4dFN0YXRlKHtmb2N1c0RhdGU6IGRhdGV9KTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIGZvY3VzTW92ZShwZXJpb2Q/OiBOZ2JQZXJpb2QsIG51bWJlcj86IG51bWJlcikge1xyXG4gICAgdGhpcy5mb2N1cyh0aGlzLl9jYWxlbmRhci5nZXROZXh0KHRoaXMuX3N0YXRlLmZvY3VzRGF0ZSwgcGVyaW9kLCBudW1iZXIpKTtcclxuICB9XHJcblxyXG4gIGZvY3VzU2VsZWN0KCkge1xyXG4gICAgaWYgKGlzRGF0ZVNlbGVjdGFibGUodGhpcy5fc3RhdGUuZm9jdXNEYXRlLCB0aGlzLl9zdGF0ZSkpIHtcclxuICAgICAgdGhpcy5zZWxlY3QodGhpcy5fc3RhdGUuZm9jdXNEYXRlLCB7ZW1pdEV2ZW50OiB0cnVlfSk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBvcGVuKGRhdGU6IE5nYkRhdGUpIHtcclxuICAgIGNvbnN0IGZpcnN0RGF0ZSA9IHRoaXMudG9WYWxpZERhdGUoZGF0ZSwgdGhpcy5fY2FsZW5kYXIuZ2V0VG9kYXkoKSk7XHJcbiAgICBpZiAoIXRoaXMuX3N0YXRlLmRpc2FibGVkKSB7XHJcbiAgICAgIHRoaXMuX25leHRTdGF0ZSh7Zmlyc3REYXRlfSk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBzZWxlY3QoZGF0ZTogTmdiRGF0ZSwgb3B0aW9uczoge2VtaXRFdmVudD86IGJvb2xlYW59ID0ge30pIHtcclxuICAgIGNvbnN0IHNlbGVjdGVkRGF0ZSA9IHRoaXMudG9WYWxpZERhdGUoZGF0ZSwgbnVsbCk7XHJcbiAgICBpZiAoIXRoaXMuX3N0YXRlLmRpc2FibGVkKSB7XHJcbiAgICAgIGlmIChpc0NoYW5nZWREYXRlKHRoaXMuX3N0YXRlLnNlbGVjdGVkRGF0ZSwgc2VsZWN0ZWREYXRlKSkge1xyXG4gICAgICAgIHRoaXMuX25leHRTdGF0ZSh7c2VsZWN0ZWREYXRlfSk7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGlmIChvcHRpb25zLmVtaXRFdmVudCAmJiBpc0RhdGVTZWxlY3RhYmxlKHNlbGVjdGVkRGF0ZSwgdGhpcy5fc3RhdGUpKSB7XHJcbiAgICAgICAgdGhpcy5fc2VsZWN0JC5uZXh0KHNlbGVjdGVkRGF0ZSk7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9XHJcblxyXG4gIHRvVmFsaWREYXRlKGRhdGU6IE5nYkRhdGVTdHJ1Y3QsIGRlZmF1bHRWYWx1ZT86IE5nYkRhdGUpOiBOZ2JEYXRlIHtcclxuICAgIGNvbnN0IG5nYkRhdGUgPSBOZ2JEYXRlLmZyb20oZGF0ZSk7XHJcbiAgICBpZiAoZGVmYXVsdFZhbHVlID09PSB1bmRlZmluZWQpIHtcclxuICAgICAgZGVmYXVsdFZhbHVlID0gdGhpcy5fY2FsZW5kYXIuZ2V0VG9kYXkoKTtcclxuICAgIH1cclxuICAgIHJldHVybiB0aGlzLl9jYWxlbmRhci5pc1ZhbGlkKG5nYkRhdGUpID8gbmdiRGF0ZSA6IGRlZmF1bHRWYWx1ZTtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgX25leHRTdGF0ZShwYXRjaDogUGFydGlhbDxEYXRlcGlja2VyVmlld01vZGVsPikge1xyXG4gICAgY29uc3QgbmV3U3RhdGUgPSB0aGlzLl91cGRhdGVTdGF0ZShwYXRjaCk7XHJcbiAgICB0aGlzLl9wYXRjaENvbnRleHRzKG5ld1N0YXRlKTtcclxuICAgIHRoaXMuX3N0YXRlID0gbmV3U3RhdGU7XHJcbiAgICB0aGlzLl9tb2RlbCQubmV4dCh0aGlzLl9zdGF0ZSk7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIF9wYXRjaENvbnRleHRzKHN0YXRlOiBEYXRlcGlja2VyVmlld01vZGVsKSB7XHJcbiAgICBjb25zdCB7bW9udGhzLCBkaXNwbGF5TW9udGhzLCBzZWxlY3RlZERhdGUsIGZvY3VzRGF0ZSwgZm9jdXNWaXNpYmxlLCBkaXNhYmxlZCwgb3V0c2lkZURheXN9ID0gc3RhdGU7XHJcbiAgICBzdGF0ZS5tb250aHMuZm9yRWFjaChtb250aCA9PiB7XHJcbiAgICAgIG1vbnRoLndlZWtzLmZvckVhY2god2VlayA9PiB7XHJcbiAgICAgICAgd2Vlay5kYXlzLmZvckVhY2goZGF5ID0+IHtcclxuXHJcbiAgICAgICAgICAvLyBwYXRjaCBmb2N1cyBmbGFnXHJcbiAgICAgICAgICBpZiAoZm9jdXNEYXRlKSB7XHJcbiAgICAgICAgICAgIGRheS5jb250ZXh0LmZvY3VzZWQgPSBmb2N1c0RhdGUuZXF1YWxzKGRheS5kYXRlKSAmJiBmb2N1c1Zpc2libGU7XHJcbiAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgLy8gY2FsY3VsYXRpbmcgdGFiaW5kZXhcclxuICAgICAgICAgIGRheS50YWJpbmRleCA9ICFkaXNhYmxlZCAmJiBkYXkuZGF0ZS5lcXVhbHMoZm9jdXNEYXRlKSAmJiBmb2N1c0RhdGUubW9udGggPT09IG1vbnRoLm51bWJlciA/IDAgOiAtMTtcclxuXHJcbiAgICAgICAgICAvLyBvdmVycmlkZSBjb250ZXh0IGRpc2FibGVkXHJcbiAgICAgICAgICBpZiAoZGlzYWJsZWQgPT09IHRydWUpIHtcclxuICAgICAgICAgICAgZGF5LmNvbnRleHQuZGlzYWJsZWQgPSB0cnVlO1xyXG4gICAgICAgICAgfVxyXG5cclxuICAgICAgICAgIC8vIHBhdGNoIHNlbGVjdGlvbiBmbGFnXHJcbiAgICAgICAgICBpZiAoc2VsZWN0ZWREYXRlICE9PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgZGF5LmNvbnRleHQuc2VsZWN0ZWQgPSBzZWxlY3RlZERhdGUgIT09IG51bGwgJiYgc2VsZWN0ZWREYXRlLmVxdWFscyhkYXkuZGF0ZSk7XHJcbiAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgLy8gdmlzaWJpbGl0eVxyXG4gICAgICAgICAgaWYgKG1vbnRoLm51bWJlciAhPT0gZGF5LmRhdGUubW9udGgpIHtcclxuICAgICAgICAgICAgZGF5LmhpZGRlbiA9IG91dHNpZGVEYXlzID09PSAnaGlkZGVuJyB8fCBvdXRzaWRlRGF5cyA9PT0gJ2NvbGxhcHNlZCcgfHxcclxuICAgICAgICAgICAgICAgIChkaXNwbGF5TW9udGhzID4gMSAmJiBkYXkuZGF0ZS5hZnRlcihtb250aHNbMF0uZmlyc3REYXRlKSAmJlxyXG4gICAgICAgICAgICAgICAgIGRheS5kYXRlLmJlZm9yZShtb250aHNbZGlzcGxheU1vbnRocyAtIDFdLmxhc3REYXRlKSk7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICAgIH0pO1xyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIF91cGRhdGVTdGF0ZShwYXRjaDogUGFydGlhbDxEYXRlcGlja2VyVmlld01vZGVsPik6IERhdGVwaWNrZXJWaWV3TW9kZWwge1xyXG4gICAgLy8gcGF0Y2hpbmcgZmllbGRzXHJcbiAgICBjb25zdCBzdGF0ZSA9IE9iamVjdC5hc3NpZ24oe30sIHRoaXMuX3N0YXRlLCBwYXRjaCk7XHJcblxyXG4gICAgbGV0IHN0YXJ0RGF0ZSA9IHN0YXRlLmZpcnN0RGF0ZTtcclxuXHJcbiAgICAvLyBtaW4vbWF4IGRhdGVzIGNoYW5nZWRcclxuICAgIGlmICgnbWluRGF0ZScgaW4gcGF0Y2ggfHwgJ21heERhdGUnIGluIHBhdGNoKSB7XHJcbiAgICAgIGNoZWNrTWluQmVmb3JlTWF4KHN0YXRlLm1pbkRhdGUsIHN0YXRlLm1heERhdGUpO1xyXG4gICAgICBzdGF0ZS5mb2N1c0RhdGUgPSBjaGVja0RhdGVJblJhbmdlKHN0YXRlLmZvY3VzRGF0ZSwgc3RhdGUubWluRGF0ZSwgc3RhdGUubWF4RGF0ZSk7XHJcbiAgICAgIHN0YXRlLmZpcnN0RGF0ZSA9IGNoZWNrRGF0ZUluUmFuZ2Uoc3RhdGUuZmlyc3REYXRlLCBzdGF0ZS5taW5EYXRlLCBzdGF0ZS5tYXhEYXRlKTtcclxuICAgICAgc3RhcnREYXRlID0gc3RhdGUuZm9jdXNEYXRlO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIGRpc2FibGVkXHJcbiAgICBpZiAoJ2Rpc2FibGVkJyBpbiBwYXRjaCkge1xyXG4gICAgICBzdGF0ZS5mb2N1c1Zpc2libGUgPSBmYWxzZTtcclxuICAgIH1cclxuXHJcbiAgICAvLyBpbml0aWFsIHJlYnVpbGQgdmlhICdzZWxlY3QoKSdcclxuICAgIGlmICgnc2VsZWN0ZWREYXRlJyBpbiBwYXRjaCAmJiB0aGlzLl9zdGF0ZS5tb250aHMubGVuZ3RoID09PSAwKSB7XHJcbiAgICAgIHN0YXJ0RGF0ZSA9IHN0YXRlLnNlbGVjdGVkRGF0ZTtcclxuICAgIH1cclxuXHJcbiAgICAvLyBmb2N1cyBkYXRlIGNoYW5nZWRcclxuICAgIGlmICgnZm9jdXNEYXRlJyBpbiBwYXRjaCkge1xyXG4gICAgICBzdGF0ZS5mb2N1c0RhdGUgPSBjaGVja0RhdGVJblJhbmdlKHN0YXRlLmZvY3VzRGF0ZSwgc3RhdGUubWluRGF0ZSwgc3RhdGUubWF4RGF0ZSk7XHJcbiAgICAgIHN0YXJ0RGF0ZSA9IHN0YXRlLmZvY3VzRGF0ZTtcclxuXHJcbiAgICAgIC8vIG5vdGhpbmcgdG8gcmVidWlsZCBpZiBvbmx5IGZvY3VzIGNoYW5nZWQgYW5kIGl0IGlzIHN0aWxsIHZpc2libGVcclxuICAgICAgaWYgKHN0YXRlLm1vbnRocy5sZW5ndGggIT09IDAgJiYgIXN0YXRlLmZvY3VzRGF0ZS5iZWZvcmUoc3RhdGUuZmlyc3REYXRlKSAmJlxyXG4gICAgICAgICAgIXN0YXRlLmZvY3VzRGF0ZS5hZnRlcihzdGF0ZS5sYXN0RGF0ZSkpIHtcclxuICAgICAgICByZXR1cm4gc3RhdGU7XHJcbiAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvLyBmaXJzdCBkYXRlIGNoYW5nZWRcclxuICAgIGlmICgnZmlyc3REYXRlJyBpbiBwYXRjaCkge1xyXG4gICAgICBzdGF0ZS5maXJzdERhdGUgPSBjaGVja0RhdGVJblJhbmdlKHN0YXRlLmZpcnN0RGF0ZSwgc3RhdGUubWluRGF0ZSwgc3RhdGUubWF4RGF0ZSk7XHJcbiAgICAgIHN0YXJ0RGF0ZSA9IHN0YXRlLmZpcnN0RGF0ZTtcclxuICAgIH1cclxuXHJcbiAgICAvLyByZWJ1aWxkaW5nIG1vbnRoc1xyXG4gICAgaWYgKHN0YXJ0RGF0ZSkge1xyXG4gICAgICBjb25zdCBmb3JjZVJlYnVpbGQgPSAnZmlyc3REYXlPZldlZWsnIGluIHBhdGNoIHx8ICdtYXJrRGlzYWJsZWQnIGluIHBhdGNoIHx8ICdtaW5EYXRlJyBpbiBwYXRjaCB8fFxyXG4gICAgICAgICAgJ21heERhdGUnIGluIHBhdGNoIHx8ICdkaXNhYmxlZCcgaW4gcGF0Y2ggfHwgJ291dHNpZGVEYXlzJyBpbiBwYXRjaDtcclxuXHJcbiAgICAgIGNvbnN0IG1vbnRocyA9IGJ1aWxkTW9udGhzKHRoaXMuX2NhbGVuZGFyLCBzdGFydERhdGUsIHN0YXRlLCB0aGlzLl9pMThuLCBmb3JjZVJlYnVpbGQpO1xyXG5cclxuICAgICAgLy8gdXBkYXRpbmcgbW9udGhzIGFuZCBib3VuZGFyeSBkYXRlc1xyXG4gICAgICBzdGF0ZS5tb250aHMgPSBtb250aHM7XHJcbiAgICAgIHN0YXRlLmZpcnN0RGF0ZSA9IG1vbnRocy5sZW5ndGggPiAwID8gbW9udGhzWzBdLmZpcnN0RGF0ZSA6IHVuZGVmaW5lZDtcclxuICAgICAgc3RhdGUubGFzdERhdGUgPSBtb250aHMubGVuZ3RoID4gMCA/IG1vbnRoc1ttb250aHMubGVuZ3RoIC0gMV0ubGFzdERhdGUgOiB1bmRlZmluZWQ7XHJcblxyXG4gICAgICAvLyByZXNldCBzZWxlY3RlZCBkYXRlIGlmICdtYXJrRGlzYWJsZWQnIHJldHVybnMgdHJ1ZVxyXG4gICAgICBpZiAoJ3NlbGVjdGVkRGF0ZScgaW4gcGF0Y2ggJiYgIWlzRGF0ZVNlbGVjdGFibGUoc3RhdGUuc2VsZWN0ZWREYXRlLCBzdGF0ZSkpIHtcclxuICAgICAgICBzdGF0ZS5zZWxlY3RlZERhdGUgPSBudWxsO1xyXG4gICAgICB9XHJcblxyXG4gICAgICAvLyBhZGp1c3RpbmcgZm9jdXMgYWZ0ZXIgbW9udGhzIHdlcmUgYnVpbHRcclxuICAgICAgaWYgKCdmaXJzdERhdGUnIGluIHBhdGNoKSB7XHJcbiAgICAgICAgaWYgKHN0YXRlLmZvY3VzRGF0ZSA9PT0gdW5kZWZpbmVkIHx8IHN0YXRlLmZvY3VzRGF0ZS5iZWZvcmUoc3RhdGUuZmlyc3REYXRlKSB8fFxyXG4gICAgICAgICAgICBzdGF0ZS5mb2N1c0RhdGUuYWZ0ZXIoc3RhdGUubGFzdERhdGUpKSB7XHJcbiAgICAgICAgICBzdGF0ZS5mb2N1c0RhdGUgPSBzdGFydERhdGU7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcblxyXG4gICAgICAvLyBhZGp1c3RpbmcgbW9udGhzL3llYXJzIGZvciB0aGUgc2VsZWN0IGJveCBuYXZpZ2F0aW9uXHJcbiAgICAgIGNvbnN0IHllYXJDaGFuZ2VkID0gIXRoaXMuX3N0YXRlLmZpcnN0RGF0ZSB8fCB0aGlzLl9zdGF0ZS5maXJzdERhdGUueWVhciAhPT0gc3RhdGUuZmlyc3REYXRlLnllYXI7XHJcbiAgICAgIGNvbnN0IG1vbnRoQ2hhbmdlZCA9ICF0aGlzLl9zdGF0ZS5maXJzdERhdGUgfHwgdGhpcy5fc3RhdGUuZmlyc3REYXRlLm1vbnRoICE9PSBzdGF0ZS5maXJzdERhdGUubW9udGg7XHJcbiAgICAgIGlmIChzdGF0ZS5uYXZpZ2F0aW9uID09PSAnc2VsZWN0Jykge1xyXG4gICAgICAgIC8vIHllYXJzIC0+ICBib3VuZGFyaWVzIChtaW4vbWF4IHdlcmUgY2hhbmdlZClcclxuICAgICAgICBpZiAoJ21pbkRhdGUnIGluIHBhdGNoIHx8ICdtYXhEYXRlJyBpbiBwYXRjaCB8fCBzdGF0ZS5zZWxlY3RCb3hlcy55ZWFycy5sZW5ndGggPT09IDAgfHwgeWVhckNoYW5nZWQpIHtcclxuICAgICAgICAgIHN0YXRlLnNlbGVjdEJveGVzLnllYXJzID0gZ2VuZXJhdGVTZWxlY3RCb3hZZWFycyhzdGF0ZS5maXJzdERhdGUsIHN0YXRlLm1pbkRhdGUsIHN0YXRlLm1heERhdGUpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8gbW9udGhzIC0+IHdoZW4gY3VycmVudCB5ZWFyIG9yIGJvdW5kYXJpZXMgY2hhbmdlXHJcbiAgICAgICAgaWYgKCdtaW5EYXRlJyBpbiBwYXRjaCB8fCAnbWF4RGF0ZScgaW4gcGF0Y2ggfHwgc3RhdGUuc2VsZWN0Qm94ZXMubW9udGhzLmxlbmd0aCA9PT0gMCB8fCB5ZWFyQ2hhbmdlZCkge1xyXG4gICAgICAgICAgc3RhdGUuc2VsZWN0Qm94ZXMubW9udGhzID1cclxuICAgICAgICAgICAgICBnZW5lcmF0ZVNlbGVjdEJveE1vbnRocyh0aGlzLl9jYWxlbmRhciwgc3RhdGUuZmlyc3REYXRlLCBzdGF0ZS5taW5EYXRlLCBzdGF0ZS5tYXhEYXRlKTtcclxuICAgICAgICB9XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgc3RhdGUuc2VsZWN0Qm94ZXMgPSB7eWVhcnM6IFtdLCBtb250aHM6IFtdfTtcclxuICAgICAgfVxyXG5cclxuICAgICAgLy8gdXBkYXRpbmcgbmF2aWdhdGlvbiBhcnJvd3MgLT4gYm91bmRhcmllcyBjaGFuZ2UgKG1pbi9tYXgpIG9yIG1vbnRoL3llYXIgY2hhbmdlc1xyXG4gICAgICBpZiAoKHN0YXRlLm5hdmlnYXRpb24gPT09ICdhcnJvd3MnIHx8IHN0YXRlLm5hdmlnYXRpb24gPT09ICdzZWxlY3QnKSAmJlxyXG4gICAgICAgICAgKG1vbnRoQ2hhbmdlZCB8fCB5ZWFyQ2hhbmdlZCB8fCAnbWluRGF0ZScgaW4gcGF0Y2ggfHwgJ21heERhdGUnIGluIHBhdGNoIHx8ICdkaXNhYmxlZCcgaW4gcGF0Y2gpKSB7XHJcbiAgICAgICAgc3RhdGUucHJldkRpc2FibGVkID0gc3RhdGUuZGlzYWJsZWQgfHwgcHJldk1vbnRoRGlzYWJsZWQodGhpcy5fY2FsZW5kYXIsIHN0YXRlLmZpcnN0RGF0ZSwgc3RhdGUubWluRGF0ZSk7XHJcbiAgICAgICAgc3RhdGUubmV4dERpc2FibGVkID0gc3RhdGUuZGlzYWJsZWQgfHwgbmV4dE1vbnRoRGlzYWJsZWQodGhpcy5fY2FsZW5kYXIsIHN0YXRlLmxhc3REYXRlLCBzdGF0ZS5tYXhEYXRlKTtcclxuICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiBzdGF0ZTtcclxuICB9XHJcbn1cclxuIiwiZXhwb3J0IGVudW0gS2V5IHtcclxuICBUYWIgPSA5LFxyXG4gIEVudGVyID0gMTMsXHJcbiAgRXNjYXBlID0gMjcsXHJcbiAgU3BhY2UgPSAzMixcclxuICBQYWdlVXAgPSAzMyxcclxuICBQYWdlRG93biA9IDM0LFxyXG4gIEVuZCA9IDM1LFxyXG4gIEhvbWUgPSAzNixcclxuICBBcnJvd0xlZnQgPSAzNyxcclxuICBBcnJvd1VwID0gMzgsXHJcbiAgQXJyb3dSaWdodCA9IDM5LFxyXG4gIEFycm93RG93biA9IDQwXHJcbn1cclxuIiwiaW1wb3J0IHtJbmplY3RhYmxlfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHtOZ2JEYXRlcGlja2VyU2VydmljZX0gZnJvbSAnLi9kYXRlcGlja2VyLXNlcnZpY2UnO1xyXG5pbXBvcnQge05nYkNhbGVuZGFyfSBmcm9tICcuL25nYi1jYWxlbmRhcic7XHJcbmltcG9ydCB7dG9TdHJpbmd9IGZyb20gJy4uL3V0aWwvdXRpbCc7XHJcbmltcG9ydCB7S2V5fSBmcm9tICcuLi91dGlsL2tleSc7XHJcbmltcG9ydCB7TmdiRGF0ZX0gZnJvbSAnLi9uZ2ItZGF0ZSc7XHJcblxyXG5ASW5qZWN0YWJsZSgpXHJcbmV4cG9ydCBjbGFzcyBOZ2JEYXRlcGlja2VyS2V5TWFwU2VydmljZSB7XHJcbiAgcHJpdmF0ZSBfbWluRGF0ZTogTmdiRGF0ZTtcclxuICBwcml2YXRlIF9tYXhEYXRlOiBOZ2JEYXRlO1xyXG4gIHByaXZhdGUgX2ZpcnN0Vmlld0RhdGU6IE5nYkRhdGU7XHJcbiAgcHJpdmF0ZSBfbGFzdFZpZXdEYXRlOiBOZ2JEYXRlO1xyXG5cclxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIF9zZXJ2aWNlOiBOZ2JEYXRlcGlja2VyU2VydmljZSwgcHJpdmF0ZSBfY2FsZW5kYXI6IE5nYkNhbGVuZGFyKSB7XHJcbiAgICBfc2VydmljZS5tb2RlbCQuc3Vic2NyaWJlKG1vZGVsID0+IHtcclxuICAgICAgdGhpcy5fbWluRGF0ZSA9IG1vZGVsLm1pbkRhdGU7XHJcbiAgICAgIHRoaXMuX21heERhdGUgPSBtb2RlbC5tYXhEYXRlO1xyXG4gICAgICB0aGlzLl9maXJzdFZpZXdEYXRlID0gbW9kZWwuZmlyc3REYXRlO1xyXG4gICAgICB0aGlzLl9sYXN0Vmlld0RhdGUgPSBtb2RlbC5sYXN0RGF0ZTtcclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgcHJvY2Vzc0tleShldmVudDogS2V5Ym9hcmRFdmVudCkge1xyXG4gICAgaWYgKEtleVt0b1N0cmluZyhldmVudC53aGljaCldKSB7XHJcbiAgICAgIHN3aXRjaCAoZXZlbnQud2hpY2gpIHtcclxuICAgICAgICBjYXNlIEtleS5QYWdlVXA6XHJcbiAgICAgICAgICB0aGlzLl9zZXJ2aWNlLmZvY3VzTW92ZShldmVudC5zaGlmdEtleSA/ICd5JyA6ICdtJywgLTEpO1xyXG4gICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgY2FzZSBLZXkuUGFnZURvd246XHJcbiAgICAgICAgICB0aGlzLl9zZXJ2aWNlLmZvY3VzTW92ZShldmVudC5zaGlmdEtleSA/ICd5JyA6ICdtJywgMSk7XHJcbiAgICAgICAgICBicmVhaztcclxuICAgICAgICBjYXNlIEtleS5FbmQ6XHJcbiAgICAgICAgICB0aGlzLl9zZXJ2aWNlLmZvY3VzKGV2ZW50LnNoaWZ0S2V5ID8gdGhpcy5fbWF4RGF0ZSA6IHRoaXMuX2xhc3RWaWV3RGF0ZSk7XHJcbiAgICAgICAgICBicmVhaztcclxuICAgICAgICBjYXNlIEtleS5Ib21lOlxyXG4gICAgICAgICAgdGhpcy5fc2VydmljZS5mb2N1cyhldmVudC5zaGlmdEtleSA/IHRoaXMuX21pbkRhdGUgOiB0aGlzLl9maXJzdFZpZXdEYXRlKTtcclxuICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIGNhc2UgS2V5LkFycm93TGVmdDpcclxuICAgICAgICAgIHRoaXMuX3NlcnZpY2UuZm9jdXNNb3ZlKCdkJywgLTEpO1xyXG4gICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgY2FzZSBLZXkuQXJyb3dVcDpcclxuICAgICAgICAgIHRoaXMuX3NlcnZpY2UuZm9jdXNNb3ZlKCdkJywgLXRoaXMuX2NhbGVuZGFyLmdldERheXNQZXJXZWVrKCkpO1xyXG4gICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgY2FzZSBLZXkuQXJyb3dSaWdodDpcclxuICAgICAgICAgIHRoaXMuX3NlcnZpY2UuZm9jdXNNb3ZlKCdkJywgMSk7XHJcbiAgICAgICAgICBicmVhaztcclxuICAgICAgICBjYXNlIEtleS5BcnJvd0Rvd246XHJcbiAgICAgICAgICB0aGlzLl9zZXJ2aWNlLmZvY3VzTW92ZSgnZCcsIHRoaXMuX2NhbGVuZGFyLmdldERheXNQZXJXZWVrKCkpO1xyXG4gICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgY2FzZSBLZXkuRW50ZXI6XHJcbiAgICAgICAgY2FzZSBLZXkuU3BhY2U6XHJcbiAgICAgICAgICB0aGlzLl9zZXJ2aWNlLmZvY3VzU2VsZWN0KCk7XHJcbiAgICAgICAgICBicmVhaztcclxuICAgICAgICBkZWZhdWx0OlxyXG4gICAgICAgICAgcmV0dXJuO1xyXG4gICAgICB9XHJcblxyXG4gICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcclxuICAgIH1cclxuICB9XHJcbn1cclxuIiwiaW1wb3J0IHtOZ2JEYXRlfSBmcm9tICcuL25nYi1kYXRlJztcclxuaW1wb3J0IHtOZ2JEYXRlU3RydWN0fSBmcm9tICcuL25nYi1kYXRlLXN0cnVjdCc7XHJcbmltcG9ydCB7RGF5VGVtcGxhdGVDb250ZXh0fSBmcm9tICcuL2RhdGVwaWNrZXItZGF5LXRlbXBsYXRlLWNvbnRleHQnO1xyXG5cclxuZXhwb3J0IHR5cGUgTmdiTWFya0Rpc2FibGVkID0gKGRhdGU6IE5nYkRhdGVTdHJ1Y3QsIGN1cnJlbnQ6IHt5ZWFyOiBudW1iZXIsIG1vbnRoOiBudW1iZXJ9KSA9PiBib29sZWFuO1xyXG5cclxuZXhwb3J0IHR5cGUgRGF5Vmlld01vZGVsID0ge1xyXG4gIGRhdGU6IE5nYkRhdGUsXHJcbiAgY29udGV4dDogRGF5VGVtcGxhdGVDb250ZXh0LFxyXG4gIHRhYmluZGV4OiBudW1iZXIsXHJcbiAgYXJpYUxhYmVsOiBzdHJpbmcsXHJcbiAgaGlkZGVuOiBib29sZWFuXHJcbn07XHJcblxyXG5leHBvcnQgdHlwZSBXZWVrVmlld01vZGVsID0ge1xyXG4gIG51bWJlcjogbnVtYmVyLFxyXG4gIGRheXM6IERheVZpZXdNb2RlbFtdLFxyXG4gIGNvbGxhcHNlZDogYm9vbGVhblxyXG59O1xyXG5cclxuZXhwb3J0IHR5cGUgTW9udGhWaWV3TW9kZWwgPSB7XHJcbiAgZmlyc3REYXRlOiBOZ2JEYXRlLFxyXG4gIGxhc3REYXRlOiBOZ2JEYXRlLFxyXG4gIG51bWJlcjogbnVtYmVyLFxyXG4gIHllYXI6IG51bWJlcixcclxuICB3ZWVrczogV2Vla1ZpZXdNb2RlbFtdLFxyXG4gIHdlZWtkYXlzOiBudW1iZXJbXVxyXG59O1xyXG5cclxuLy8gY2xhbmctZm9ybWF0IG9mZlxyXG5leHBvcnQgdHlwZSBEYXRlcGlja2VyVmlld01vZGVsID0ge1xyXG4gIGRpc2FibGVkOiBib29sZWFuLFxyXG4gIGRpc3BsYXlNb250aHM6IG51bWJlcixcclxuICBmaXJzdERhdGU/OiBOZ2JEYXRlLFxyXG4gIGZpcnN0RGF5T2ZXZWVrOiBudW1iZXIsXHJcbiAgZm9jdXNEYXRlPzogTmdiRGF0ZSxcclxuICBmb2N1c1Zpc2libGU6IGJvb2xlYW4sXHJcbiAgbGFzdERhdGU/OiBOZ2JEYXRlLFxyXG4gIG1hcmtEaXNhYmxlZD86IE5nYk1hcmtEaXNhYmxlZCxcclxuICBtYXhEYXRlPzogTmdiRGF0ZSxcclxuICBtaW5EYXRlPzogTmdiRGF0ZSxcclxuICBtb250aHM6IE1vbnRoVmlld01vZGVsW10sXHJcbiAgbmF2aWdhdGlvbjogJ3NlbGVjdCcgfCAnYXJyb3dzJyB8ICdub25lJyxcclxuICBvdXRzaWRlRGF5czogJ3Zpc2libGUnIHwgJ2NvbGxhcHNlZCcgfCAnaGlkZGVuJyxcclxuICBwcmV2RGlzYWJsZWQ6IGJvb2xlYW4sXHJcbiAgbmV4dERpc2FibGVkOiBib29sZWFuLFxyXG4gIHNlbGVjdEJveGVzOiB7XHJcbiAgICB5ZWFyczogbnVtYmVyW10sXHJcbiAgICBtb250aHM6IG51bWJlcltdXHJcbiAgfSxcclxuICBzZWxlY3RlZERhdGU6IE5nYkRhdGVcclxufTtcclxuLy8gY2xhbmctZm9ybWF0IG9uXHJcblxyXG5leHBvcnQgZW51bSBOYXZpZ2F0aW9uRXZlbnQge1xyXG4gIFBSRVYsXHJcbiAgTkVYVFxyXG59XHJcbiIsImltcG9ydCB7SW5qZWN0YWJsZSwgVGVtcGxhdGVSZWZ9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQge0RheVRlbXBsYXRlQ29udGV4dH0gZnJvbSAnLi9kYXRlcGlja2VyLWRheS10ZW1wbGF0ZS1jb250ZXh0JztcclxuaW1wb3J0IHtOZ2JEYXRlU3RydWN0fSBmcm9tICcuL25nYi1kYXRlLXN0cnVjdCc7XHJcblxyXG4vKipcclxuICogQ29uZmlndXJhdGlvbiBzZXJ2aWNlIGZvciB0aGUgTmdiRGF0ZXBpY2tlciBjb21wb25lbnQuXHJcbiAqIFlvdSBjYW4gaW5qZWN0IHRoaXMgc2VydmljZSwgdHlwaWNhbGx5IGluIHlvdXIgcm9vdCBjb21wb25lbnQsIGFuZCBjdXN0b21pemUgdGhlIHZhbHVlcyBvZiBpdHMgcHJvcGVydGllcyBpblxyXG4gKiBvcmRlciB0byBwcm92aWRlIGRlZmF1bHQgdmFsdWVzIGZvciBhbGwgdGhlIGRhdGVwaWNrZXJzIHVzZWQgaW4gdGhlIGFwcGxpY2F0aW9uLlxyXG4gKi9cclxuQEluamVjdGFibGUoe3Byb3ZpZGVkSW46ICdyb290J30pXHJcbmV4cG9ydCBjbGFzcyBOZ2JEYXRlcGlja2VyQ29uZmlnIHtcclxuICBkYXlUZW1wbGF0ZTogVGVtcGxhdGVSZWY8RGF5VGVtcGxhdGVDb250ZXh0PjtcclxuICBkaXNwbGF5TW9udGhzID0gMTtcclxuICBmaXJzdERheU9mV2VlayA9IDE7XHJcbiAgbWFya0Rpc2FibGVkOiAoZGF0ZTogTmdiRGF0ZVN0cnVjdCwgY3VycmVudDoge3llYXI6IG51bWJlciwgbW9udGg6IG51bWJlcn0pID0+IGJvb2xlYW47XHJcbiAgbWluRGF0ZTogTmdiRGF0ZVN0cnVjdDtcclxuICBtYXhEYXRlOiBOZ2JEYXRlU3RydWN0O1xyXG4gIG5hdmlnYXRpb246ICdzZWxlY3QnIHwgJ2Fycm93cycgfCAnbm9uZScgPSAnc2VsZWN0JztcclxuICBvdXRzaWRlRGF5czogJ3Zpc2libGUnIHwgJ2NvbGxhcHNlZCcgfCAnaGlkZGVuJyA9ICd2aXNpYmxlJztcclxuICBzaG93V2Vla2RheXMgPSB0cnVlO1xyXG4gIHNob3dXZWVrTnVtYmVycyA9IGZhbHNlO1xyXG4gIHN0YXJ0RGF0ZToge3llYXI6IG51bWJlciwgbW9udGg6IG51bWJlcn07XHJcbn1cclxuIiwiaW1wb3J0IHtJbmplY3RhYmxlfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHtOZ2JEYXRlU3RydWN0fSBmcm9tICcuLi9uZ2ItZGF0ZS1zdHJ1Y3QnO1xyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIE5HQl9EQVRFUElDS0VSX0RBVEVfQURBUFRFUl9GQUNUT1JZKCkge1xyXG4gIHJldHVybiBuZXcgTmdiRGF0ZVN0cnVjdEFkYXB0ZXIoKTtcclxufVxyXG5cclxuLyoqXHJcbiAqIEFic3RyYWN0IHR5cGUgc2VydmluZyBhcyBhIERJIHRva2VuIGZvciB0aGUgc2VydmljZSBjb252ZXJ0aW5nIGZyb20geW91ciBhcHBsaWNhdGlvbiBEYXRlIG1vZGVsIHRvIGludGVybmFsXHJcbiAqIE5nYkRhdGVTdHJ1Y3QgbW9kZWwuXHJcbiAqIEEgZGVmYXVsdCBpbXBsZW1lbnRhdGlvbiBjb252ZXJ0aW5nIGZyb20gYW5kIHRvIE5nYkRhdGVTdHJ1Y3QgaXMgcHJvdmlkZWQgZm9yIHJldHJvLWNvbXBhdGliaWxpdHksXHJcbiAqIGJ1dCB5b3UgY2FuIHByb3ZpZGUgYW5vdGhlciBpbXBsZW1lbnRhdGlvbiB0byB1c2UgYW4gYWx0ZXJuYXRpdmUgZm9ybWF0LCBpZSBmb3IgdXNpbmcgd2l0aCBuYXRpdmUgRGF0ZSBPYmplY3QuXHJcbiAqL1xyXG5ASW5qZWN0YWJsZSh7cHJvdmlkZWRJbjogJ3Jvb3QnLCB1c2VGYWN0b3J5OiBOR0JfREFURVBJQ0tFUl9EQVRFX0FEQVBURVJfRkFDVE9SWX0pXHJcbmV4cG9ydCBhYnN0cmFjdCBjbGFzcyBOZ2JEYXRlQWRhcHRlcjxEPiB7XHJcbiAgLyoqXHJcbiAgICogQ29udmVydHMgdXNlci1tb2RlbCBkYXRlIGludG8gYW4gTmdiRGF0ZVN0cnVjdCBmb3IgaW50ZXJuYWwgdXNlIGluIHRoZSBsaWJyYXJ5XHJcbiAgICovXHJcbiAgYWJzdHJhY3QgZnJvbU1vZGVsKHZhbHVlOiBEKTogTmdiRGF0ZVN0cnVjdDtcclxuXHJcbiAgLyoqXHJcbiAgICogQ29udmVydHMgaW50ZXJuYWwgZGF0ZSB2YWx1ZSBOZ2JEYXRlU3RydWN0IHRvIHVzZXItbW9kZWwgZGF0ZVxyXG4gICAqIFRoZSByZXR1cm5lZCB0eXBlIGlzIHN1cHBvc2VkIHRvIGJlIG9mIHRoZSBzYW1lIHR5cGUgYXMgZnJvbU1vZGVsKCkgaW5wdXQtdmFsdWUgcGFyYW1cclxuICAgKi9cclxuICBhYnN0cmFjdCB0b01vZGVsKGRhdGU6IE5nYkRhdGVTdHJ1Y3QpOiBEO1xyXG59XHJcblxyXG5ASW5qZWN0YWJsZSgpXHJcbmV4cG9ydCBjbGFzcyBOZ2JEYXRlU3RydWN0QWRhcHRlciBleHRlbmRzIE5nYkRhdGVBZGFwdGVyPE5nYkRhdGVTdHJ1Y3Q+IHtcclxuICAvKipcclxuICAgKiBDb252ZXJ0cyBhIE5nYkRhdGVTdHJ1Y3QgdmFsdWUgaW50byBOZ2JEYXRlU3RydWN0IHZhbHVlXHJcbiAgICovXHJcbiAgZnJvbU1vZGVsKGRhdGU6IE5nYkRhdGVTdHJ1Y3QpOiBOZ2JEYXRlU3RydWN0IHtcclxuICAgIHJldHVybiAoZGF0ZSAmJiBkYXRlLnllYXIgJiYgZGF0ZS5tb250aCAmJiBkYXRlLmRheSkgPyB7eWVhcjogZGF0ZS55ZWFyLCBtb250aDogZGF0ZS5tb250aCwgZGF5OiBkYXRlLmRheX0gOiBudWxsO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogQ29udmVydHMgYSBOZ2JEYXRlU3RydWN0IHZhbHVlIGludG8gTmdiRGF0ZVN0cnVjdCB2YWx1ZVxyXG4gICAqL1xyXG4gIHRvTW9kZWwoZGF0ZTogTmdiRGF0ZVN0cnVjdCk6IE5nYkRhdGVTdHJ1Y3Qge1xyXG4gICAgcmV0dXJuIChkYXRlICYmIGRhdGUueWVhciAmJiBkYXRlLm1vbnRoICYmIGRhdGUuZGF5KSA/IHt5ZWFyOiBkYXRlLnllYXIsIG1vbnRoOiBkYXRlLm1vbnRoLCBkYXk6IGRhdGUuZGF5fSA6IG51bGw7XHJcbiAgfVxyXG59XHJcbiIsImltcG9ydCB7U3Vic2NyaXB0aW9ufSBmcm9tICdyeGpzJztcclxuaW1wb3J0IHt0YWtlfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XHJcbmltcG9ydCB7XHJcbiAgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksXHJcbiAgQ2hhbmdlRGV0ZWN0b3JSZWYsXHJcbiAgQ29tcG9uZW50LFxyXG4gIElucHV0LFxyXG4gIE9uQ2hhbmdlcyxcclxuICBUZW1wbGF0ZVJlZixcclxuICBmb3J3YXJkUmVmLFxyXG4gIE9uSW5pdCxcclxuICBTaW1wbGVDaGFuZ2VzLFxyXG4gIEV2ZW50RW1pdHRlcixcclxuICBPdXRwdXQsXHJcbiAgT25EZXN0cm95LFxyXG4gIEVsZW1lbnRSZWYsXHJcbiAgTmdab25lXHJcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7TkdfVkFMVUVfQUNDRVNTT1IsIENvbnRyb2xWYWx1ZUFjY2Vzc29yfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XHJcbmltcG9ydCB7TmdiQ2FsZW5kYXJ9IGZyb20gJy4vbmdiLWNhbGVuZGFyJztcclxuaW1wb3J0IHtOZ2JEYXRlfSBmcm9tICcuL25nYi1kYXRlJztcclxuaW1wb3J0IHtOZ2JEYXRlcGlja2VyU2VydmljZX0gZnJvbSAnLi9kYXRlcGlja2VyLXNlcnZpY2UnO1xyXG5pbXBvcnQge05nYkRhdGVwaWNrZXJLZXlNYXBTZXJ2aWNlfSBmcm9tICcuL2RhdGVwaWNrZXIta2V5bWFwLXNlcnZpY2UnO1xyXG5pbXBvcnQge0RhdGVwaWNrZXJWaWV3TW9kZWwsIE5hdmlnYXRpb25FdmVudH0gZnJvbSAnLi9kYXRlcGlja2VyLXZpZXctbW9kZWwnO1xyXG5pbXBvcnQge0RheVRlbXBsYXRlQ29udGV4dH0gZnJvbSAnLi9kYXRlcGlja2VyLWRheS10ZW1wbGF0ZS1jb250ZXh0JztcclxuaW1wb3J0IHtOZ2JEYXRlcGlja2VyQ29uZmlnfSBmcm9tICcuL2RhdGVwaWNrZXItY29uZmlnJztcclxuaW1wb3J0IHtOZ2JEYXRlQWRhcHRlcn0gZnJvbSAnLi9hZGFwdGVycy9uZ2ItZGF0ZS1hZGFwdGVyJztcclxuaW1wb3J0IHtOZ2JEYXRlU3RydWN0fSBmcm9tICcuL25nYi1kYXRlLXN0cnVjdCc7XHJcbmltcG9ydCB7TmdiRGF0ZXBpY2tlckkxOG59IGZyb20gJy4vZGF0ZXBpY2tlci1pMThuJztcclxuaW1wb3J0IHtpc0NoYW5nZWREYXRlfSBmcm9tICcuL2RhdGVwaWNrZXItdG9vbHMnO1xyXG5cclxuY29uc3QgTkdCX0RBVEVQSUNLRVJfVkFMVUVfQUNDRVNTT1IgPSB7XHJcbiAgcHJvdmlkZTogTkdfVkFMVUVfQUNDRVNTT1IsXHJcbiAgdXNlRXhpc3Rpbmc6IGZvcndhcmRSZWYoKCkgPT4gTmdiRGF0ZXBpY2tlciksXHJcbiAgbXVsdGk6IHRydWVcclxufTtcclxuXHJcbi8qKlxyXG4gKiBUaGUgcGF5bG9hZCBvZiB0aGUgZGF0ZXBpY2tlciBuYXZpZ2F0aW9uIGV2ZW50XHJcbiAqL1xyXG5leHBvcnQgaW50ZXJmYWNlIE5nYkRhdGVwaWNrZXJOYXZpZ2F0ZUV2ZW50IHtcclxuICAvKipcclxuICAgKiBDdXJyZW50bHkgZGlzcGxheWVkIG1vbnRoXHJcbiAgICovXHJcbiAgY3VycmVudDoge3llYXI6IG51bWJlciwgbW9udGg6IG51bWJlcn07XHJcblxyXG4gIC8qKlxyXG4gICAqIE1vbnRoIHdlJ3JlIG5hdmlnYXRpbmcgdG9cclxuICAgKi9cclxuICBuZXh0OiB7eWVhcjogbnVtYmVyLCBtb250aDogbnVtYmVyfTtcclxufVxyXG5cclxuLyoqXHJcbiAqIEEgbGlnaHR3ZWlnaHQgYW5kIGhpZ2hseSBjb25maWd1cmFibGUgZGF0ZXBpY2tlciBkaXJlY3RpdmVcclxuICovXHJcbkBDb21wb25lbnQoe1xyXG4gIGV4cG9ydEFzOiAnbmdiRGF0ZXBpY2tlcicsXHJcbiAgc2VsZWN0b3I6ICduZ2ItZGF0ZXBpY2tlcicsXHJcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2gsXHJcbiAgc3R5bGVzOiBbYFxyXG4gICAgOmhvc3Qge1xyXG4gICAgICBib3JkZXI6IDFweCBzb2xpZCAjZGZkZmRmO1xyXG4gICAgICBib3JkZXItcmFkaXVzOiAwLjI1cmVtO1xyXG4gICAgICBkaXNwbGF5OiBpbmxpbmUtYmxvY2s7XHJcbiAgICB9XHJcbiAgICAubmdiLWRwLW1vbnRoIHtcclxuICAgICAgcG9pbnRlci1ldmVudHM6IG5vbmU7XHJcbiAgICB9XHJcbiAgICAubmdiLWRwLWhlYWRlciB7XHJcbiAgICAgIGJvcmRlci1ib3R0b206IDA7XHJcbiAgICAgIGJvcmRlci1yYWRpdXM6IDAuMjVyZW0gMC4yNXJlbSAwIDA7XHJcbiAgICAgIHBhZGRpbmctdG9wOiAwLjI1cmVtO1xyXG4gICAgfVxyXG4gICAgbmdiLWRhdGVwaWNrZXItbW9udGgtdmlldyB7XHJcbiAgICAgIHBvaW50ZXItZXZlbnRzOiBhdXRvO1xyXG4gICAgfVxyXG4gICAgLm5nYi1kcC1tb250aC1uYW1lIHtcclxuICAgICAgZm9udC1zaXplOiBsYXJnZXI7XHJcbiAgICAgIGhlaWdodDogMnJlbTtcclxuICAgICAgbGluZS1oZWlnaHQ6IDJyZW07XHJcbiAgICAgIHRleHQtYWxpZ246IGNlbnRlcjtcclxuICAgIH1cclxuICAgIC9kZWVwLyAubmdiLWRwLW1vbnRoICsgLm5nYi1kcC1tb250aCA+IG5nYi1kYXRlcGlja2VyLW1vbnRoLXZpZXcgPiAubmdiLWRwLXdlZWsge1xyXG4gICAgICBwYWRkaW5nLWxlZnQ6IDFyZW07XHJcbiAgICB9XHJcbiAgICAvZGVlcC8gLm5nYi1kcC1tb250aCArIC5uZ2ItZHAtbW9udGggPiAubmdiLWRwLW1vbnRoLW5hbWUge1xyXG4gICAgICBwYWRkaW5nLWxlZnQ6IDFyZW07XHJcbiAgICB9XHJcbiAgICAvZGVlcC8gLm5nYi1kcC1tb250aDpsYXN0LWNoaWxkIC5uZ2ItZHAtd2VlayB7XHJcbiAgICAgIHBhZGRpbmctcmlnaHQ6IC4yNXJlbTtcclxuICAgIH1cclxuICAgIC9kZWVwLyAubmdiLWRwLW1vbnRoOmZpcnN0LWNoaWxkIC5uZ2ItZHAtd2VlayB7XHJcbiAgICAgIHBhZGRpbmctbGVmdDogLjI1cmVtO1xyXG4gICAgfVxyXG4gICAgL2RlZXAvIC5uZ2ItZHAtbW9udGggPiBuZ2ItZGF0ZXBpY2tlci1tb250aC12aWV3ID4gLm5nYi1kcC13ZWVrOmxhc3QtY2hpbGQge1xyXG4gICAgICBwYWRkaW5nLWJvdHRvbTogLjI1cmVtO1xyXG4gICAgfVxyXG4gICAgLm5nYi1kcC1tb250aHMge1xyXG4gICAgICBkaXNwbGF5OiAtbXMtZmxleGJveDtcclxuICAgICAgZGlzcGxheTogZmxleDtcclxuICAgIH1cclxuICBgXSxcclxuICB0ZW1wbGF0ZTogYFxyXG4gICAgPG5nLXRlbXBsYXRlICNkdCBsZXQtZGF0ZT1cImRhdGVcIiBsZXQtY3VycmVudE1vbnRoPVwiY3VycmVudE1vbnRoXCIgbGV0LXNlbGVjdGVkPVwic2VsZWN0ZWRcIiBsZXQtZGlzYWJsZWQ9XCJkaXNhYmxlZFwiIGxldC1mb2N1c2VkPVwiZm9jdXNlZFwiPlxyXG4gICAgICA8ZGl2IG5nYkRhdGVwaWNrZXJEYXlWaWV3XHJcbiAgICAgICAgW2RhdGVdPVwiZGF0ZVwiXHJcbiAgICAgICAgW2N1cnJlbnRNb250aF09XCJjdXJyZW50TW9udGhcIlxyXG4gICAgICAgIFtzZWxlY3RlZF09XCJzZWxlY3RlZFwiXHJcbiAgICAgICAgW2Rpc2FibGVkXT1cImRpc2FibGVkXCJcclxuICAgICAgICBbZm9jdXNlZF09XCJmb2N1c2VkXCI+XHJcbiAgICAgIDwvZGl2PlxyXG4gICAgPC9uZy10ZW1wbGF0ZT5cclxuXHJcbiAgICA8ZGl2IGNsYXNzPVwibmdiLWRwLWhlYWRlciBiZy1saWdodFwiPlxyXG4gICAgICA8bmdiLWRhdGVwaWNrZXItbmF2aWdhdGlvbiAqbmdJZj1cIm5hdmlnYXRpb24gIT09ICdub25lJ1wiXHJcbiAgICAgICAgW2RhdGVdPVwibW9kZWwuZmlyc3REYXRlXCJcclxuICAgICAgICBbbW9udGhzXT1cIm1vZGVsLm1vbnRoc1wiXHJcbiAgICAgICAgW2Rpc2FibGVkXT1cIm1vZGVsLmRpc2FibGVkXCJcclxuICAgICAgICBbc2hvd1NlbGVjdF09XCJtb2RlbC5uYXZpZ2F0aW9uID09PSAnc2VsZWN0J1wiXHJcbiAgICAgICAgW3ByZXZEaXNhYmxlZF09XCJtb2RlbC5wcmV2RGlzYWJsZWRcIlxyXG4gICAgICAgIFtuZXh0RGlzYWJsZWRdPVwibW9kZWwubmV4dERpc2FibGVkXCJcclxuICAgICAgICBbc2VsZWN0Qm94ZXNdPVwibW9kZWwuc2VsZWN0Qm94ZXNcIlxyXG4gICAgICAgIChuYXZpZ2F0ZSk9XCJvbk5hdmlnYXRlRXZlbnQoJGV2ZW50KVwiXHJcbiAgICAgICAgKHNlbGVjdCk9XCJvbk5hdmlnYXRlRGF0ZVNlbGVjdCgkZXZlbnQpXCI+XHJcbiAgICAgIDwvbmdiLWRhdGVwaWNrZXItbmF2aWdhdGlvbj5cclxuICAgIDwvZGl2PlxyXG5cclxuICAgIDxkaXYgY2xhc3M9XCJuZ2ItZHAtbW9udGhzXCIgKGtleWRvd24pPVwib25LZXlEb3duKCRldmVudClcIiAoZm9jdXNpbik9XCJzaG93Rm9jdXModHJ1ZSlcIiAoZm9jdXNvdXQpPVwic2hvd0ZvY3VzKGZhbHNlKVwiPlxyXG4gICAgICA8bmctdGVtcGxhdGUgbmdGb3IgbGV0LW1vbnRoIFtuZ0Zvck9mXT1cIm1vZGVsLm1vbnRoc1wiIGxldC1pPVwiaW5kZXhcIj5cclxuICAgICAgICA8ZGl2IGNsYXNzPVwibmdiLWRwLW1vbnRoXCI+XHJcbiAgICAgICAgICA8ZGl2ICpuZ0lmPVwibmF2aWdhdGlvbiA9PT0gJ25vbmUnIHx8IChkaXNwbGF5TW9udGhzID4gMSAmJiBuYXZpZ2F0aW9uID09PSAnc2VsZWN0JylcIlxyXG4gICAgICAgICAgICAgICAgY2xhc3M9XCJuZ2ItZHAtbW9udGgtbmFtZSBiZy1saWdodFwiPlxyXG4gICAgICAgICAgICB7eyBpMThuLmdldE1vbnRoRnVsbE5hbWUobW9udGgubnVtYmVyLCBtb250aC55ZWFyKSB9fSB7eyBpMThuLmdldFllYXJOdW1lcmFscyhtb250aC55ZWFyKSB9fVxyXG4gICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICA8bmdiLWRhdGVwaWNrZXItbW9udGgtdmlld1xyXG4gICAgICAgICAgICBbbW9udGhdPVwibW9udGhcIlxyXG4gICAgICAgICAgICBbZGF5VGVtcGxhdGVdPVwiZGF5VGVtcGxhdGUgfHwgZHRcIlxyXG4gICAgICAgICAgICBbc2hvd1dlZWtkYXlzXT1cInNob3dXZWVrZGF5c1wiXHJcbiAgICAgICAgICAgIFtzaG93V2Vla051bWJlcnNdPVwic2hvd1dlZWtOdW1iZXJzXCJcclxuICAgICAgICAgICAgKHNlbGVjdCk9XCJvbkRhdGVTZWxlY3QoJGV2ZW50KVwiPlxyXG4gICAgICAgICAgPC9uZ2ItZGF0ZXBpY2tlci1tb250aC12aWV3PlxyXG4gICAgICAgIDwvZGl2PlxyXG4gICAgICA8L25nLXRlbXBsYXRlPlxyXG4gICAgPC9kaXY+XHJcbiAgYCxcclxuICBwcm92aWRlcnM6IFtOR0JfREFURVBJQ0tFUl9WQUxVRV9BQ0NFU1NPUiwgTmdiRGF0ZXBpY2tlclNlcnZpY2UsIE5nYkRhdGVwaWNrZXJLZXlNYXBTZXJ2aWNlXVxyXG59KVxyXG5leHBvcnQgY2xhc3MgTmdiRGF0ZXBpY2tlciBpbXBsZW1lbnRzIE9uRGVzdHJveSxcclxuICAgIE9uQ2hhbmdlcywgT25Jbml0LCBDb250cm9sVmFsdWVBY2Nlc3NvciB7XHJcbiAgbW9kZWw6IERhdGVwaWNrZXJWaWV3TW9kZWw7XHJcblxyXG4gIHByaXZhdGUgX3N1YnNjcmlwdGlvbjogU3Vic2NyaXB0aW9uO1xyXG4gIHByaXZhdGUgX3NlbGVjdFN1YnNjcmlwdGlvbjogU3Vic2NyaXB0aW9uO1xyXG4gIC8qKlxyXG4gICAqIFJlZmVyZW5jZSBmb3IgdGhlIGN1c3RvbSB0ZW1wbGF0ZSBmb3IgdGhlIGRheSBkaXNwbGF5XHJcbiAgICovXHJcbiAgQElucHV0KCkgZGF5VGVtcGxhdGU6IFRlbXBsYXRlUmVmPERheVRlbXBsYXRlQ29udGV4dD47XHJcblxyXG4gIC8qKlxyXG4gICAqIE51bWJlciBvZiBtb250aHMgdG8gZGlzcGxheVxyXG4gICAqL1xyXG4gIEBJbnB1dCgpIGRpc3BsYXlNb250aHM6IG51bWJlcjtcclxuXHJcbiAgLyoqXHJcbiAgICogRmlyc3QgZGF5IG9mIHRoZSB3ZWVrLiBXaXRoIGRlZmF1bHQgY2FsZW5kYXIgd2UgdXNlIElTTyA4NjAxOiAnd2Vla2RheScgaXMgMT1Nb24gLi4uIDc9U3VuXHJcbiAgICovXHJcbiAgQElucHV0KCkgZmlyc3REYXlPZldlZWs6IG51bWJlcjtcclxuXHJcbiAgLyoqXHJcbiAgICogQ2FsbGJhY2sgdG8gbWFyayBhIGdpdmVuIGRhdGUgYXMgZGlzYWJsZWQuXHJcbiAgICogJ0N1cnJlbnQnIGNvbnRhaW5zIHRoZSBtb250aCB0aGF0IHdpbGwgYmUgZGlzcGxheWVkIGluIHRoZSB2aWV3XHJcbiAgICovXHJcbiAgQElucHV0KCkgbWFya0Rpc2FibGVkOiAoZGF0ZTogTmdiRGF0ZSwgY3VycmVudDoge3llYXI6IG51bWJlciwgbW9udGg6IG51bWJlcn0pID0+IGJvb2xlYW47XHJcblxyXG4gIC8qKlxyXG4gICAqIE1heCBkYXRlIGZvciB0aGUgbmF2aWdhdGlvbi4gSWYgbm90IHByb3ZpZGVkLCAneWVhcicgc2VsZWN0IGJveCB3aWxsIGRpc3BsYXkgMTAgeWVhcnMgYWZ0ZXIgY3VycmVudCBtb250aFxyXG4gICAqL1xyXG4gIEBJbnB1dCgpIG1heERhdGU6IE5nYkRhdGVTdHJ1Y3Q7XHJcblxyXG4gIC8qKlxyXG4gICAqIE1pbiBkYXRlIGZvciB0aGUgbmF2aWdhdGlvbi4gSWYgbm90IHByb3ZpZGVkLCAneWVhcicgc2VsZWN0IGJveCB3aWxsIGRpc3BsYXkgMTAgeWVhcnMgYmVmb3JlIGN1cnJlbnQgbW9udGhcclxuICAgKi9cclxuICBASW5wdXQoKSBtaW5EYXRlOiBOZ2JEYXRlU3RydWN0O1xyXG5cclxuICAvKipcclxuICAgKiBOYXZpZ2F0aW9uIHR5cGU6IGBzZWxlY3RgIChkZWZhdWx0IHdpdGggc2VsZWN0IGJveGVzIGZvciBtb250aCBhbmQgeWVhciksIGBhcnJvd3NgXHJcbiAgICogKHdpdGhvdXQgc2VsZWN0IGJveGVzLCBvbmx5IG5hdmlnYXRpb24gYXJyb3dzKSBvciBgbm9uZWAgKG5vIG5hdmlnYXRpb24gYXQgYWxsKVxyXG4gICAqL1xyXG4gIEBJbnB1dCgpIG5hdmlnYXRpb246ICdzZWxlY3QnIHwgJ2Fycm93cycgfCAnbm9uZSc7XHJcblxyXG4gIC8qKlxyXG4gICAqIFRoZSB3YXkgdG8gZGlzcGxheSBkYXlzIHRoYXQgZG9uJ3QgYmVsb25nIHRvIGN1cnJlbnQgbW9udGg6IGB2aXNpYmxlYCAoZGVmYXVsdCksXHJcbiAgICogYGhpZGRlbmAgKG5vdCBkaXNwbGF5ZWQpIG9yIGBjb2xsYXBzZWRgIChub3QgZGlzcGxheWVkIHdpdGggZW1wdHkgc3BhY2UgY29sbGFwc2VkKVxyXG4gICAqL1xyXG4gIEBJbnB1dCgpIG91dHNpZGVEYXlzOiAndmlzaWJsZScgfCAnY29sbGFwc2VkJyB8ICdoaWRkZW4nO1xyXG5cclxuICAvKipcclxuICAgKiBXaGV0aGVyIHRvIGRpc3BsYXkgZGF5cyBvZiB0aGUgd2Vla1xyXG4gICAqL1xyXG4gIEBJbnB1dCgpIHNob3dXZWVrZGF5czogYm9vbGVhbjtcclxuXHJcbiAgLyoqXHJcbiAgICogV2hldGhlciB0byBkaXNwbGF5IHdlZWsgbnVtYmVyc1xyXG4gICAqL1xyXG4gIEBJbnB1dCgpIHNob3dXZWVrTnVtYmVyczogYm9vbGVhbjtcclxuXHJcbiAgLyoqXHJcbiAgICogRGF0ZSB0byBvcGVuIGNhbGVuZGFyIHdpdGguXHJcbiAgICogV2l0aCBkZWZhdWx0IGNhbGVuZGFyIHdlIHVzZSBJU08gODYwMTogJ21vbnRoJyBpcyAxPUphbiAuLi4gMTI9RGVjLlxyXG4gICAqIElmIG5vdGhpbmcgb3IgaW52YWxpZCBkYXRlIHByb3ZpZGVkLCBjYWxlbmRhciB3aWxsIG9wZW4gd2l0aCBjdXJyZW50IG1vbnRoLlxyXG4gICAqIFVzZSAnbmF2aWdhdGVUbyhkYXRlKScgYXMgYW4gYWx0ZXJuYXRpdmVcclxuICAgKi9cclxuICBASW5wdXQoKSBzdGFydERhdGU6IHt5ZWFyOiBudW1iZXIsIG1vbnRoOiBudW1iZXJ9O1xyXG5cclxuICAvKipcclxuICAgKiBBbiBldmVudCBmaXJlZCB3aGVuIG5hdmlnYXRpb24gaGFwcGVucyBhbmQgY3VycmVudGx5IGRpc3BsYXllZCBtb250aCBjaGFuZ2VzLlxyXG4gICAqIFNlZSBOZ2JEYXRlcGlja2VyTmF2aWdhdGVFdmVudCBmb3IgdGhlIHBheWxvYWQgaW5mby5cclxuICAgKi9cclxuICBAT3V0cHV0KCkgbmF2aWdhdGUgPSBuZXcgRXZlbnRFbWl0dGVyPE5nYkRhdGVwaWNrZXJOYXZpZ2F0ZUV2ZW50PigpO1xyXG5cclxuICAvKipcclxuICAgKiBBbiBldmVudCBmaXJlZCB3aGVuIHVzZXIgc2VsZWN0cyBhIGRhdGUgdXNpbmcga2V5Ym9hcmQgb3IgbW91c2UuXHJcbiAgICogVGhlIHBheWxvYWQgb2YgdGhlIGV2ZW50IGlzIGN1cnJlbnRseSBzZWxlY3RlZCBOZ2JEYXRlLlxyXG4gICAqL1xyXG4gIEBPdXRwdXQoKSBzZWxlY3QgPSBuZXcgRXZlbnRFbWl0dGVyPE5nYkRhdGU+KCk7XHJcblxyXG4gIG9uQ2hhbmdlID0gKF86IGFueSkgPT4ge307XHJcbiAgb25Ub3VjaGVkID0gKCkgPT4ge307XHJcblxyXG4gIGNvbnN0cnVjdG9yKFxyXG4gICAgICBwcml2YXRlIF9rZXlNYXBTZXJ2aWNlOiBOZ2JEYXRlcGlja2VyS2V5TWFwU2VydmljZSwgcHVibGljIF9zZXJ2aWNlOiBOZ2JEYXRlcGlja2VyU2VydmljZSxcclxuICAgICAgcHJpdmF0ZSBfY2FsZW5kYXI6IE5nYkNhbGVuZGFyLCBwdWJsaWMgaTE4bjogTmdiRGF0ZXBpY2tlckkxOG4sIGNvbmZpZzogTmdiRGF0ZXBpY2tlckNvbmZpZyxcclxuICAgICAgcHJpdmF0ZSBfY2Q6IENoYW5nZURldGVjdG9yUmVmLCBwcml2YXRlIF9lbGVtZW50UmVmOiBFbGVtZW50UmVmPEhUTUxFbGVtZW50PixcclxuICAgICAgcHJpdmF0ZSBfbmdiRGF0ZUFkYXB0ZXI6IE5nYkRhdGVBZGFwdGVyPGFueT4sIHByaXZhdGUgX25nWm9uZTogTmdab25lKSB7XHJcbiAgICBbJ2RheVRlbXBsYXRlJywgJ2Rpc3BsYXlNb250aHMnLCAnZmlyc3REYXlPZldlZWsnLCAnbWFya0Rpc2FibGVkJywgJ21pbkRhdGUnLCAnbWF4RGF0ZScsICduYXZpZ2F0aW9uJyxcclxuICAgICAnb3V0c2lkZURheXMnLCAnc2hvd1dlZWtkYXlzJywgJ3Nob3dXZWVrTnVtYmVycycsICdzdGFydERhdGUnXVxyXG4gICAgICAgIC5mb3JFYWNoKGlucHV0ID0+IHRoaXNbaW5wdXRdID0gY29uZmlnW2lucHV0XSk7XHJcblxyXG4gICAgdGhpcy5fc2VsZWN0U3Vic2NyaXB0aW9uID0gX3NlcnZpY2Uuc2VsZWN0JC5zdWJzY3JpYmUoZGF0ZSA9PiB7IHRoaXMuc2VsZWN0LmVtaXQoZGF0ZSk7IH0pO1xyXG5cclxuICAgIHRoaXMuX3N1YnNjcmlwdGlvbiA9IF9zZXJ2aWNlLm1vZGVsJC5zdWJzY3JpYmUobW9kZWwgPT4ge1xyXG4gICAgICBjb25zdCBuZXdEYXRlID0gbW9kZWwuZmlyc3REYXRlO1xyXG4gICAgICBjb25zdCBvbGREYXRlID0gdGhpcy5tb2RlbCA/IHRoaXMubW9kZWwuZmlyc3REYXRlIDogbnVsbDtcclxuICAgICAgY29uc3QgbmV3U2VsZWN0ZWREYXRlID0gbW9kZWwuc2VsZWN0ZWREYXRlO1xyXG4gICAgICBjb25zdCBvbGRTZWxlY3RlZERhdGUgPSB0aGlzLm1vZGVsID8gdGhpcy5tb2RlbC5zZWxlY3RlZERhdGUgOiBudWxsO1xyXG4gICAgICBjb25zdCBuZXdGb2N1c2VkRGF0ZSA9IG1vZGVsLmZvY3VzRGF0ZTtcclxuICAgICAgY29uc3Qgb2xkRm9jdXNlZERhdGUgPSB0aGlzLm1vZGVsID8gdGhpcy5tb2RlbC5mb2N1c0RhdGUgOiBudWxsO1xyXG5cclxuICAgICAgdGhpcy5tb2RlbCA9IG1vZGVsO1xyXG5cclxuICAgICAgLy8gaGFuZGxpbmcgc2VsZWN0aW9uIGNoYW5nZVxyXG4gICAgICBpZiAoaXNDaGFuZ2VkRGF0ZShuZXdTZWxlY3RlZERhdGUsIG9sZFNlbGVjdGVkRGF0ZSkpIHtcclxuICAgICAgICB0aGlzLm9uVG91Y2hlZCgpO1xyXG4gICAgICAgIHRoaXMub25DaGFuZ2UodGhpcy5fbmdiRGF0ZUFkYXB0ZXIudG9Nb2RlbChuZXdTZWxlY3RlZERhdGUpKTtcclxuICAgICAgfVxyXG5cclxuICAgICAgLy8gaGFuZGxpbmcgZm9jdXMgY2hhbmdlXHJcbiAgICAgIGlmIChpc0NoYW5nZWREYXRlKG5ld0ZvY3VzZWREYXRlLCBvbGRGb2N1c2VkRGF0ZSkgJiYgb2xkRm9jdXNlZERhdGUgJiYgbW9kZWwuZm9jdXNWaXNpYmxlKSB7XHJcbiAgICAgICAgdGhpcy5mb2N1cygpO1xyXG4gICAgICB9XHJcblxyXG4gICAgICAvLyBlbWl0dGluZyBuYXZpZ2F0aW9uIGV2ZW50IGlmIHRoZSBmaXJzdCBtb250aCBjaGFuZ2VzXHJcbiAgICAgIGlmICghbmV3RGF0ZS5lcXVhbHMob2xkRGF0ZSkpIHtcclxuICAgICAgICB0aGlzLm5hdmlnYXRlLmVtaXQoe1xyXG4gICAgICAgICAgY3VycmVudDogb2xkRGF0ZSA/IHt5ZWFyOiBvbGREYXRlLnllYXIsIG1vbnRoOiBvbGREYXRlLm1vbnRofSA6IG51bGwsXHJcbiAgICAgICAgICBuZXh0OiB7eWVhcjogbmV3RGF0ZS55ZWFyLCBtb250aDogbmV3RGF0ZS5tb250aH1cclxuICAgICAgICB9KTtcclxuICAgICAgfVxyXG4gICAgICBfY2QubWFya0ZvckNoZWNrKCk7XHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIE1hbnVhbGx5IGZvY3VzIHRoZSBmb2N1c2FibGUgZGF5IGluIHRoZSBkYXRlcGlja2VyXHJcbiAgICovXHJcbiAgZm9jdXMoKSB7XHJcbiAgICB0aGlzLl9uZ1pvbmUub25TdGFibGUuYXNPYnNlcnZhYmxlKCkucGlwZSh0YWtlKDEpKS5zdWJzY3JpYmUoKCkgPT4ge1xyXG4gICAgICBjb25zdCBlbGVtZW50VG9Gb2N1cyA9XHJcbiAgICAgICAgICB0aGlzLl9lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQucXVlcnlTZWxlY3RvcjxIVE1MRGl2RWxlbWVudD4oJ2Rpdi5uZ2ItZHAtZGF5W3RhYmluZGV4PVwiMFwiXScpO1xyXG4gICAgICBpZiAoZWxlbWVudFRvRm9jdXMpIHtcclxuICAgICAgICBlbGVtZW50VG9Gb2N1cy5mb2N1cygpO1xyXG4gICAgICB9XHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIE5hdmlnYXRlcyBjdXJyZW50IHZpZXcgdG8gcHJvdmlkZWQgZGF0ZS5cclxuICAgKiBXaXRoIGRlZmF1bHQgY2FsZW5kYXIgd2UgdXNlIElTTyA4NjAxOiAnbW9udGgnIGlzIDE9SmFuIC4uLiAxMj1EZWMuXHJcbiAgICogSWYgbm90aGluZyBvciBpbnZhbGlkIGRhdGUgcHJvdmlkZWQgY2FsZW5kYXIgd2lsbCBvcGVuIGN1cnJlbnQgbW9udGguXHJcbiAgICogVXNlICdzdGFydERhdGUnIGlucHV0IGFzIGFuIGFsdGVybmF0aXZlXHJcbiAgICovXHJcbiAgbmF2aWdhdGVUbyhkYXRlPzoge3llYXI6IG51bWJlciwgbW9udGg6IG51bWJlcn0pIHtcclxuICAgIHRoaXMuX3NlcnZpY2Uub3BlbihOZ2JEYXRlLmZyb20oZGF0ZSA/IHsuLi5kYXRlLCBkYXk6IDF9IDogbnVsbCkpO1xyXG4gIH1cclxuXHJcbiAgbmdPbkRlc3Ryb3koKSB7XHJcbiAgICB0aGlzLl9zdWJzY3JpcHRpb24udW5zdWJzY3JpYmUoKTtcclxuICAgIHRoaXMuX3NlbGVjdFN1YnNjcmlwdGlvbi51bnN1YnNjcmliZSgpO1xyXG4gIH1cclxuXHJcbiAgbmdPbkluaXQoKSB7XHJcbiAgICBpZiAodGhpcy5tb2RlbCA9PT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgIFsnZGlzcGxheU1vbnRocycsICdtYXJrRGlzYWJsZWQnLCAnZmlyc3REYXlPZldlZWsnLCAnbmF2aWdhdGlvbicsICdtaW5EYXRlJywgJ21heERhdGUnLCAnb3V0c2lkZURheXMnXS5mb3JFYWNoKFxyXG4gICAgICAgICAgaW5wdXQgPT4gdGhpcy5fc2VydmljZVtpbnB1dF0gPSB0aGlzW2lucHV0XSk7XHJcbiAgICAgIHRoaXMubmF2aWdhdGVUbyh0aGlzLnN0YXJ0RGF0ZSk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBuZ09uQ2hhbmdlcyhjaGFuZ2VzOiBTaW1wbGVDaGFuZ2VzKSB7XHJcbiAgICBbJ2Rpc3BsYXlNb250aHMnLCAnbWFya0Rpc2FibGVkJywgJ2ZpcnN0RGF5T2ZXZWVrJywgJ25hdmlnYXRpb24nLCAnbWluRGF0ZScsICdtYXhEYXRlJywgJ291dHNpZGVEYXlzJ11cclxuICAgICAgICAuZmlsdGVyKGlucHV0ID0+IGlucHV0IGluIGNoYW5nZXMpXHJcbiAgICAgICAgLmZvckVhY2goaW5wdXQgPT4gdGhpcy5fc2VydmljZVtpbnB1dF0gPSB0aGlzW2lucHV0XSk7XHJcblxyXG4gICAgaWYgKCdzdGFydERhdGUnIGluIGNoYW5nZXMpIHtcclxuICAgICAgdGhpcy5uYXZpZ2F0ZVRvKHRoaXMuc3RhcnREYXRlKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIG9uRGF0ZVNlbGVjdChkYXRlOiBOZ2JEYXRlKSB7XHJcbiAgICB0aGlzLl9zZXJ2aWNlLmZvY3VzKGRhdGUpO1xyXG4gICAgdGhpcy5fc2VydmljZS5zZWxlY3QoZGF0ZSwge2VtaXRFdmVudDogdHJ1ZX0pO1xyXG4gIH1cclxuXHJcbiAgb25LZXlEb3duKGV2ZW50OiBLZXlib2FyZEV2ZW50KSB7IHRoaXMuX2tleU1hcFNlcnZpY2UucHJvY2Vzc0tleShldmVudCk7IH1cclxuXHJcbiAgb25OYXZpZ2F0ZURhdGVTZWxlY3QoZGF0ZTogTmdiRGF0ZSkgeyB0aGlzLl9zZXJ2aWNlLm9wZW4oZGF0ZSk7IH1cclxuXHJcbiAgb25OYXZpZ2F0ZUV2ZW50KGV2ZW50OiBOYXZpZ2F0aW9uRXZlbnQpIHtcclxuICAgIHN3aXRjaCAoZXZlbnQpIHtcclxuICAgICAgY2FzZSBOYXZpZ2F0aW9uRXZlbnQuUFJFVjpcclxuICAgICAgICB0aGlzLl9zZXJ2aWNlLm9wZW4odGhpcy5fY2FsZW5kYXIuZ2V0UHJldih0aGlzLm1vZGVsLmZpcnN0RGF0ZSwgJ20nLCAxKSk7XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICAgIGNhc2UgTmF2aWdhdGlvbkV2ZW50Lk5FWFQ6XHJcbiAgICAgICAgdGhpcy5fc2VydmljZS5vcGVuKHRoaXMuX2NhbGVuZGFyLmdldE5leHQodGhpcy5tb2RlbC5maXJzdERhdGUsICdtJywgMSkpO1xyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgcmVnaXN0ZXJPbkNoYW5nZShmbjogKHZhbHVlOiBhbnkpID0+IGFueSk6IHZvaWQgeyB0aGlzLm9uQ2hhbmdlID0gZm47IH1cclxuXHJcbiAgcmVnaXN0ZXJPblRvdWNoZWQoZm46ICgpID0+IGFueSk6IHZvaWQgeyB0aGlzLm9uVG91Y2hlZCA9IGZuOyB9XHJcblxyXG4gIHNldERpc2FibGVkU3RhdGUoaXNEaXNhYmxlZDogYm9vbGVhbikgeyB0aGlzLl9zZXJ2aWNlLmRpc2FibGVkID0gaXNEaXNhYmxlZDsgfVxyXG5cclxuICBzaG93Rm9jdXMoZm9jdXNWaXNpYmxlOiBib29sZWFuKSB7IHRoaXMuX3NlcnZpY2UuZm9jdXNWaXNpYmxlID0gZm9jdXNWaXNpYmxlOyB9XHJcblxyXG4gIHdyaXRlVmFsdWUodmFsdWUpIHsgdGhpcy5fc2VydmljZS5zZWxlY3QoTmdiRGF0ZS5mcm9tKHRoaXMuX25nYkRhdGVBZGFwdGVyLmZyb21Nb2RlbCh2YWx1ZSkpKTsgfVxyXG59XHJcbiIsImltcG9ydCB7Q29tcG9uZW50LCBJbnB1dCwgVGVtcGxhdGVSZWYsIE91dHB1dCwgRXZlbnRFbWl0dGVyfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHtNb250aFZpZXdNb2RlbCwgRGF5Vmlld01vZGVsfSBmcm9tICcuL2RhdGVwaWNrZXItdmlldy1tb2RlbCc7XHJcbmltcG9ydCB7TmdiRGF0ZX0gZnJvbSAnLi9uZ2ItZGF0ZSc7XHJcbmltcG9ydCB7TmdiRGF0ZXBpY2tlckkxOG59IGZyb20gJy4vZGF0ZXBpY2tlci1pMThuJztcclxuaW1wb3J0IHtEYXlUZW1wbGF0ZUNvbnRleHR9IGZyb20gJy4vZGF0ZXBpY2tlci1kYXktdGVtcGxhdGUtY29udGV4dCc7XHJcblxyXG5AQ29tcG9uZW50KHtcclxuICBzZWxlY3RvcjogJ25nYi1kYXRlcGlja2VyLW1vbnRoLXZpZXcnLFxyXG4gIGhvc3Q6IHsncm9sZSc6ICdncmlkJ30sXHJcbiAgc3R5bGVzOiBbYFxyXG4gICAgOmhvc3Qge1xyXG4gICAgICBkaXNwbGF5OiBibG9jaztcclxuICAgIH1cclxuICAgIC5uZ2ItZHAtd2Vla2RheSwgLm5nYi1kcC13ZWVrLW51bWJlciB7XHJcbiAgICAgIGxpbmUtaGVpZ2h0OiAycmVtO1xyXG4gICAgICB0ZXh0LWFsaWduOiBjZW50ZXI7XHJcbiAgICAgIGZvbnQtc3R5bGU6IGl0YWxpYztcclxuICAgIH1cclxuICAgIC5uZ2ItZHAtd2Vla2RheSB7XHJcbiAgICAgIGNvbG9yOiAjNWJjMGRlO1xyXG4gICAgICBjb2xvcjogdmFyKC0taW5mbyk7XHJcbiAgICB9XHJcbiAgICAubmdiLWRwLXdlZWsge1xyXG4gICAgICBib3JkZXItcmFkaXVzOiAwLjI1cmVtO1xyXG4gICAgICBkaXNwbGF5OiAtbXMtZmxleGJveDtcclxuICAgICAgZGlzcGxheTogZmxleDtcclxuICAgIH1cclxuICAgIC5uZ2ItZHAtd2Vla2RheXMge1xyXG4gICAgICBib3JkZXItYm90dG9tOiAxcHggc29saWQgcmdiYSgwLCAwLCAwLCAwLjEyNSk7XHJcbiAgICAgIGJvcmRlci1yYWRpdXM6IDA7XHJcbiAgICB9XHJcbiAgICAubmdiLWRwLWRheSwgLm5nYi1kcC13ZWVrZGF5LCAubmdiLWRwLXdlZWstbnVtYmVyIHtcclxuICAgICAgd2lkdGg6IDJyZW07XHJcbiAgICAgIGhlaWdodDogMnJlbTtcclxuICAgIH1cclxuICAgIC5uZ2ItZHAtZGF5IHtcclxuICAgICAgY3Vyc29yOiBwb2ludGVyO1xyXG4gICAgfVxyXG4gICAgLm5nYi1kcC1kYXkuZGlzYWJsZWQsIC5uZ2ItZHAtZGF5LmhpZGRlbiB7XHJcbiAgICAgIGN1cnNvcjogZGVmYXVsdDtcclxuICAgIH1cclxuICBgXSxcclxuICB0ZW1wbGF0ZTogYFxyXG4gICAgPGRpdiAqbmdJZj1cInNob3dXZWVrZGF5c1wiIGNsYXNzPVwibmdiLWRwLXdlZWsgbmdiLWRwLXdlZWtkYXlzIGJnLWxpZ2h0XCI+XHJcbiAgICAgIDxkaXYgKm5nSWY9XCJzaG93V2Vla051bWJlcnNcIiBjbGFzcz1cIm5nYi1kcC13ZWVrZGF5IG5nYi1kcC1zaG93d2Vla1wiPjwvZGl2PlxyXG4gICAgICA8ZGl2ICpuZ0Zvcj1cImxldCB3IG9mIG1vbnRoLndlZWtkYXlzXCIgY2xhc3M9XCJuZ2ItZHAtd2Vla2RheSBzbWFsbFwiPlxyXG4gICAgICAgIHt7IGkxOG4uZ2V0V2Vla2RheVNob3J0TmFtZSh3KSB9fVxyXG4gICAgICA8L2Rpdj5cclxuICAgIDwvZGl2PlxyXG4gICAgPG5nLXRlbXBsYXRlIG5nRm9yIGxldC13ZWVrIFtuZ0Zvck9mXT1cIm1vbnRoLndlZWtzXCI+XHJcbiAgICAgIDxkaXYgKm5nSWY9XCIhd2Vlay5jb2xsYXBzZWRcIiBjbGFzcz1cIm5nYi1kcC13ZWVrXCIgcm9sZT1cInJvd1wiPlxyXG4gICAgICAgIDxkaXYgKm5nSWY9XCJzaG93V2Vla051bWJlcnNcIiBjbGFzcz1cIm5nYi1kcC13ZWVrLW51bWJlciBzbWFsbCB0ZXh0LW11dGVkXCI+e3sgaTE4bi5nZXRXZWVrTnVtZXJhbHMod2Vlay5udW1iZXIpIH19PC9kaXY+XHJcbiAgICAgICAgPGRpdiAqbmdGb3I9XCJsZXQgZGF5IG9mIHdlZWsuZGF5c1wiIChjbGljayk9XCJkb1NlbGVjdChkYXkpXCIgY2xhc3M9XCJuZ2ItZHAtZGF5XCIgcm9sZT1cImdyaWRjZWxsXCJcclxuICAgICAgICAgIFtjbGFzcy5kaXNhYmxlZF09XCJkYXkuY29udGV4dC5kaXNhYmxlZFwiXHJcbiAgICAgICAgICBbdGFiaW5kZXhdPVwiZGF5LnRhYmluZGV4XCJcclxuICAgICAgICAgIFtjbGFzcy5oaWRkZW5dPVwiZGF5LmhpZGRlblwiXHJcbiAgICAgICAgICBbYXR0ci5hcmlhLWxhYmVsXT1cImRheS5hcmlhTGFiZWxcIj5cclxuICAgICAgICAgIDxuZy10ZW1wbGF0ZSBbbmdJZl09XCIhZGF5LmhpZGRlblwiPlxyXG4gICAgICAgICAgICA8bmctdGVtcGxhdGUgW25nVGVtcGxhdGVPdXRsZXRdPVwiZGF5VGVtcGxhdGVcIiBbbmdUZW1wbGF0ZU91dGxldENvbnRleHRdPVwiZGF5LmNvbnRleHRcIj48L25nLXRlbXBsYXRlPlxyXG4gICAgICAgICAgPC9uZy10ZW1wbGF0ZT5cclxuICAgICAgICA8L2Rpdj5cclxuICAgICAgPC9kaXY+XHJcbiAgICA8L25nLXRlbXBsYXRlPlxyXG4gIGBcclxufSlcclxuZXhwb3J0IGNsYXNzIE5nYkRhdGVwaWNrZXJNb250aFZpZXcge1xyXG4gIEBJbnB1dCgpIGRheVRlbXBsYXRlOiBUZW1wbGF0ZVJlZjxEYXlUZW1wbGF0ZUNvbnRleHQ+O1xyXG4gIEBJbnB1dCgpIG1vbnRoOiBNb250aFZpZXdNb2RlbDtcclxuICBASW5wdXQoKSBzaG93V2Vla2RheXM7XHJcbiAgQElucHV0KCkgc2hvd1dlZWtOdW1iZXJzO1xyXG5cclxuICBAT3V0cHV0KCkgc2VsZWN0ID0gbmV3IEV2ZW50RW1pdHRlcjxOZ2JEYXRlPigpO1xyXG5cclxuICBjb25zdHJ1Y3RvcihwdWJsaWMgaTE4bjogTmdiRGF0ZXBpY2tlckkxOG4pIHt9XHJcblxyXG4gIGRvU2VsZWN0KGRheTogRGF5Vmlld01vZGVsKSB7XHJcbiAgICBpZiAoIWRheS5jb250ZXh0LmRpc2FibGVkICYmICFkYXkuaGlkZGVuKSB7XHJcbiAgICAgIHRoaXMuc2VsZWN0LmVtaXQoZGF5LmRhdGUpO1xyXG4gICAgfVxyXG4gIH1cclxufVxyXG4iLCJpbXBvcnQge0NvbXBvbmVudCwgSW5wdXQsIE91dHB1dCwgRXZlbnRFbWl0dGVyLCBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneX0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7TmF2aWdhdGlvbkV2ZW50LCBNb250aFZpZXdNb2RlbH0gZnJvbSAnLi9kYXRlcGlja2VyLXZpZXctbW9kZWwnO1xyXG5pbXBvcnQge05nYkRhdGV9IGZyb20gJy4vbmdiLWRhdGUnO1xyXG5pbXBvcnQge05nYkRhdGVwaWNrZXJJMThufSBmcm9tICcuL2RhdGVwaWNrZXItaTE4bic7XHJcblxyXG4vLyBUaGUgLW1zLSBhbmQgLXdlYmtpdC0gZWxlbWVudCBmb3IgdGhlIENTUyBjYW4gYmUgcmVtb3ZlZCBpZiB3ZSBhcmUgZ2VuZXJhdGluZyB0aGUgQ1NTIHVzaW5nIFNBU1MuXHJcbkBDb21wb25lbnQoe1xyXG4gIHNlbGVjdG9yOiAnbmdiLWRhdGVwaWNrZXItbmF2aWdhdGlvbicsXHJcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2gsXHJcbiAgc3R5bGVzOiBbYFxyXG4gICAgOmhvc3Qge1xyXG4gICAgICBkaXNwbGF5OiAtbXMtZmxleGJveDtcclxuICAgICAgZGlzcGxheTogZmxleDtcclxuICAgICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcclxuICAgIH1cclxuICAgIC5uZ2ItZHAtbmF2aWdhdGlvbi1jaGV2cm9uIHtcclxuICAgICAgYm9yZGVyLXN0eWxlOiBzb2xpZDtcclxuICAgICAgYm9yZGVyLXdpZHRoOiAwLjJlbSAwLjJlbSAwIDA7XHJcbiAgICAgIGRpc3BsYXk6IGlubGluZS1ibG9jaztcclxuICAgICAgd2lkdGg6IDAuNzVlbTtcclxuICAgICAgaGVpZ2h0OiAwLjc1ZW07XHJcbiAgICAgIG1hcmdpbi1sZWZ0OiAwLjI1ZW07XHJcbiAgICAgIG1hcmdpbi1yaWdodDogMC4xNWVtO1xyXG4gICAgICB0cmFuc2Zvcm06IHJvdGF0ZSgtMTM1ZGVnKTtcclxuICAgICAgLW1zLXRyYW5zZm9ybTogcm90YXRlKC0xMzVkZWcpO1xyXG4gICAgfVxyXG4gICAgLnJpZ2h0IC5uZ2ItZHAtbmF2aWdhdGlvbi1jaGV2cm9uIHtcclxuICAgICAgLW1zLXRyYW5zZm9ybTogcm90YXRlKDQ1ZGVnKTtcclxuICAgICAgdHJhbnNmb3JtOiByb3RhdGUoNDVkZWcpO1xyXG4gICAgICBtYXJnaW4tbGVmdDogMC4xNWVtO1xyXG4gICAgICBtYXJnaW4tcmlnaHQ6IDAuMjVlbTtcclxuICAgIH1cclxuICAgIC5uZ2ItZHAtYXJyb3cge1xyXG4gICAgICBkaXNwbGF5OiAtbXMtZmxleGJveDtcclxuICAgICAgZGlzcGxheTogZmxleDtcclxuICAgICAgLW1zLWZsZXg6IDEgMSBhdXRvO1xyXG4gICAgICBmbGV4LWdyb3c6IDE7XHJcbiAgICAgIHBhZGRpbmctcmlnaHQ6IDA7XHJcbiAgICAgIHBhZGRpbmctbGVmdDogMDtcclxuICAgICAgbWFyZ2luOiAwO1xyXG4gICAgICB3aWR0aDogMnJlbTtcclxuICAgICAgaGVpZ2h0OiAycmVtO1xyXG4gICAgfVxyXG4gICAgLm5nYi1kcC1hcnJvdy5yaWdodCB7XHJcbiAgICAgIC1tcy1mbGV4LXBhY2s6IGVuZDtcclxuICAgICAganVzdGlmeS1jb250ZW50OiBmbGV4LWVuZDtcclxuICAgIH1cclxuICAgIC5uZ2ItZHAtYXJyb3ctYnRuIHtcclxuICAgICAgcGFkZGluZzogMCAwLjI1cmVtO1xyXG4gICAgICBtYXJnaW46IDAgMC41cmVtO1xyXG4gICAgICBib3JkZXI6IG5vbmU7XHJcbiAgICAgIGJhY2tncm91bmQtY29sb3I6IHRyYW5zcGFyZW50O1xyXG4gICAgICB6LWluZGV4OiAxO1xyXG4gICAgfVxyXG4gICAgLm5nYi1kcC1hcnJvdy1idG46Zm9jdXMge1xyXG4gICAgICBvdXRsaW5lOiBhdXRvIDFweDtcclxuICAgIH1cclxuICAgIC5uZ2ItZHAtbW9udGgtbmFtZSB7XHJcbiAgICAgIGZvbnQtc2l6ZTogbGFyZ2VyO1xyXG4gICAgICBoZWlnaHQ6IDJyZW07XHJcbiAgICAgIGxpbmUtaGVpZ2h0OiAycmVtO1xyXG4gICAgICB0ZXh0LWFsaWduOiBjZW50ZXI7XHJcbiAgICB9XHJcbiAgICAubmdiLWRwLW5hdmlnYXRpb24tc2VsZWN0IHtcclxuICAgICAgZGlzcGxheTogLW1zLWZsZXhib3g7XHJcbiAgICAgIGRpc3BsYXk6IGZsZXg7XHJcbiAgICAgIC1tcy1mbGV4OiAxIDEgOXJlbTtcclxuICAgICAgZmxleC1ncm93OiAxO1xyXG4gICAgICBmbGV4LWJhc2lzOiA5cmVtO1xyXG4gICAgfVxyXG4gIGBdLFxyXG4gIHRlbXBsYXRlOiBgXHJcbiAgICA8ZGl2IGNsYXNzPVwibmdiLWRwLWFycm93XCI+XHJcbiAgICAgIDxidXR0b24gdHlwZT1cImJ1dHRvblwiIGNsYXNzPVwiYnRuIGJ0bi1saW5rIG5nYi1kcC1hcnJvdy1idG5cIiAoY2xpY2spPVwiISFuYXZpZ2F0ZS5lbWl0KG5hdmlnYXRpb24uUFJFVilcIiBbZGlzYWJsZWRdPVwicHJldkRpc2FibGVkXCJcclxuICAgICAgICAgICAgICBpMThuLWFyaWEtbGFiZWw9XCJAQG5nYi5kYXRlcGlja2VyLnByZXZpb3VzLW1vbnRoXCIgYXJpYS1sYWJlbD1cIlByZXZpb3VzIG1vbnRoXCJcclxuICAgICAgICAgICAgICBpMThuLXRpdGxlPVwiQEBuZ2IuZGF0ZXBpY2tlci5wcmV2aW91cy1tb250aFwiIHRpdGxlPVwiUHJldmlvdXMgbW9udGhcIj5cclxuICAgICAgICA8c3BhbiBjbGFzcz1cIm5nYi1kcC1uYXZpZ2F0aW9uLWNoZXZyb25cIj48L3NwYW4+XHJcbiAgICAgIDwvYnV0dG9uPlxyXG4gICAgPC9kaXY+XHJcbiAgICA8bmdiLWRhdGVwaWNrZXItbmF2aWdhdGlvbi1zZWxlY3QgKm5nSWY9XCJzaG93U2VsZWN0XCIgY2xhc3M9XCJuZ2ItZHAtbmF2aWdhdGlvbi1zZWxlY3RcIlxyXG4gICAgICBbZGF0ZV09XCJkYXRlXCJcclxuICAgICAgW2Rpc2FibGVkXSA9IFwiZGlzYWJsZWRcIlxyXG4gICAgICBbbW9udGhzXT1cInNlbGVjdEJveGVzLm1vbnRoc1wiXHJcbiAgICAgIFt5ZWFyc109XCJzZWxlY3RCb3hlcy55ZWFyc1wiXHJcbiAgICAgIChzZWxlY3QpPVwic2VsZWN0LmVtaXQoJGV2ZW50KVwiPlxyXG4gICAgPC9uZ2ItZGF0ZXBpY2tlci1uYXZpZ2F0aW9uLXNlbGVjdD5cclxuXHJcbiAgICA8bmctdGVtcGxhdGUgKm5nSWY9XCIhc2hvd1NlbGVjdFwiIG5nRm9yIGxldC1tb250aCBbbmdGb3JPZl09XCJtb250aHNcIiBsZXQtaT1cImluZGV4XCI+XHJcbiAgICAgIDxkaXYgY2xhc3M9XCJuZ2ItZHAtYXJyb3dcIiAqbmdJZj1cImkgPiAwXCI+PC9kaXY+XHJcbiAgICAgIDxkaXYgY2xhc3M9XCJuZ2ItZHAtbW9udGgtbmFtZVwiPlxyXG4gICAgICAgIHt7IGkxOG4uZ2V0TW9udGhGdWxsTmFtZShtb250aC5udW1iZXIsIG1vbnRoLnllYXIpIH19IHt7IGkxOG4uZ2V0WWVhck51bWVyYWxzKG1vbnRoLnllYXIpIH19XHJcbiAgICAgIDwvZGl2PlxyXG4gICAgICA8ZGl2IGNsYXNzPVwibmdiLWRwLWFycm93XCIgKm5nSWY9XCJpICE9PSBtb250aHMubGVuZ3RoIC0gMVwiPjwvZGl2PlxyXG4gICAgPC9uZy10ZW1wbGF0ZT5cclxuICAgIDxkaXYgY2xhc3M9XCJuZ2ItZHAtYXJyb3cgcmlnaHRcIj5cclxuICAgICAgPGJ1dHRvbiB0eXBlPVwiYnV0dG9uXCIgY2xhc3M9XCJidG4gYnRuLWxpbmsgbmdiLWRwLWFycm93LWJ0blwiIChjbGljayk9XCIhIW5hdmlnYXRlLmVtaXQobmF2aWdhdGlvbi5ORVhUKVwiIFtkaXNhYmxlZF09XCJuZXh0RGlzYWJsZWRcIlxyXG4gICAgICAgICAgICAgIGkxOG4tYXJpYS1sYWJlbD1cIkBAbmdiLmRhdGVwaWNrZXIubmV4dC1tb250aFwiIGFyaWEtbGFiZWw9XCJOZXh0IG1vbnRoXCJcclxuICAgICAgICAgICAgICBpMThuLXRpdGxlPVwiQEBuZ2IuZGF0ZXBpY2tlci5uZXh0LW1vbnRoXCIgdGl0bGU9XCJOZXh0IG1vbnRoXCI+XHJcbiAgICAgICAgPHNwYW4gY2xhc3M9XCJuZ2ItZHAtbmF2aWdhdGlvbi1jaGV2cm9uXCI+PC9zcGFuPlxyXG4gICAgICA8L2J1dHRvbj5cclxuICAgIDwvZGl2PlxyXG4gICAgYFxyXG59KVxyXG5leHBvcnQgY2xhc3MgTmdiRGF0ZXBpY2tlck5hdmlnYXRpb24ge1xyXG4gIG5hdmlnYXRpb24gPSBOYXZpZ2F0aW9uRXZlbnQ7XHJcblxyXG4gIEBJbnB1dCgpIGRhdGU6IE5nYkRhdGU7XHJcbiAgQElucHV0KCkgZGlzYWJsZWQ6IGJvb2xlYW47XHJcbiAgQElucHV0KCkgbW9udGhzOiBNb250aFZpZXdNb2RlbFtdID0gW107XHJcbiAgQElucHV0KCkgc2hvd1NlbGVjdDogYm9vbGVhbjtcclxuICBASW5wdXQoKSBwcmV2RGlzYWJsZWQ6IGJvb2xlYW47XHJcbiAgQElucHV0KCkgbmV4dERpc2FibGVkOiBib29sZWFuO1xyXG4gIEBJbnB1dCgpIHNlbGVjdEJveGVzOiB7eWVhcnM6IG51bWJlcltdLCBtb250aHM6IG51bWJlcltdfTtcclxuXHJcbiAgQE91dHB1dCgpIG5hdmlnYXRlID0gbmV3IEV2ZW50RW1pdHRlcjxOYXZpZ2F0aW9uRXZlbnQ+KCk7XHJcbiAgQE91dHB1dCgpIHNlbGVjdCA9IG5ldyBFdmVudEVtaXR0ZXI8TmdiRGF0ZT4oKTtcclxuXHJcbiAgY29uc3RydWN0b3IocHVibGljIGkxOG46IE5nYkRhdGVwaWNrZXJJMThuKSB7fVxyXG59XHJcbiIsImltcG9ydCB7cGFkTnVtYmVyLCB0b0ludGVnZXIsIGlzTnVtYmVyfSBmcm9tICcuLi91dGlsL3V0aWwnO1xyXG5pbXBvcnQge05nYkRhdGVTdHJ1Y3R9IGZyb20gJy4vbmdiLWRhdGUtc3RydWN0JztcclxuaW1wb3J0IHtJbmplY3RhYmxlfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBOR0JfREFURVBJQ0tFUl9QQVJTRVJfRk9STUFUVEVSX0ZBQ1RPUlkoKSB7XHJcbiAgcmV0dXJuIG5ldyBOZ2JEYXRlSVNPUGFyc2VyRm9ybWF0dGVyKCk7XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBBYnN0cmFjdCB0eXBlIHNlcnZpbmcgYXMgYSBESSB0b2tlbiBmb3IgdGhlIHNlcnZpY2UgcGFyc2luZyBhbmQgZm9ybWF0dGluZyBkYXRlcyBmb3IgdGhlIE5nYklucHV0RGF0ZXBpY2tlclxyXG4gKiBkaXJlY3RpdmUuIEEgZGVmYXVsdCBpbXBsZW1lbnRhdGlvbiB1c2luZyB0aGUgSVNPIDg2MDEgZm9ybWF0IGlzIHByb3ZpZGVkLCBidXQgeW91IGNhbiBwcm92aWRlIGFub3RoZXIgaW1wbGVtZW50YXRpb25cclxuICogdG8gdXNlIGFuIGFsdGVybmF0aXZlIGZvcm1hdC5cclxuICovXHJcbkBJbmplY3RhYmxlKHtwcm92aWRlZEluOiAncm9vdCcsIHVzZUZhY3Rvcnk6IE5HQl9EQVRFUElDS0VSX1BBUlNFUl9GT1JNQVRURVJfRkFDVE9SWX0pXHJcbmV4cG9ydCBhYnN0cmFjdCBjbGFzcyBOZ2JEYXRlUGFyc2VyRm9ybWF0dGVyIHtcclxuICAvKipcclxuICAgKiBQYXJzZXMgdGhlIGdpdmVuIHZhbHVlIHRvIGFuIE5nYkRhdGVTdHJ1Y3QuIEltcGxlbWVudGF0aW9ucyBzaG91bGQgdHJ5IHRoZWlyIGJlc3QgdG8gcHJvdmlkZSBhIHJlc3VsdCwgZXZlblxyXG4gICAqIHBhcnRpYWwuIFRoZXkgbXVzdCByZXR1cm4gbnVsbCBpZiB0aGUgdmFsdWUgY2FuJ3QgYmUgcGFyc2VkLlxyXG4gICAqIEBwYXJhbSB2YWx1ZSB0aGUgdmFsdWUgdG8gcGFyc2VcclxuICAgKi9cclxuICBhYnN0cmFjdCBwYXJzZSh2YWx1ZTogc3RyaW5nKTogTmdiRGF0ZVN0cnVjdDtcclxuXHJcbiAgLyoqXHJcbiAgICogRm9ybWF0cyB0aGUgZ2l2ZW4gZGF0ZSB0byBhIHN0cmluZy4gSW1wbGVtZW50YXRpb25zIHNob3VsZCByZXR1cm4gYW4gZW1wdHkgc3RyaW5nIGlmIHRoZSBnaXZlbiBkYXRlIGlzIG51bGwsXHJcbiAgICogYW5kIHRyeSB0aGVpciBiZXN0IHRvIHByb3ZpZGUgYSBwYXJ0aWFsIHJlc3VsdCBpZiB0aGUgZ2l2ZW4gZGF0ZSBpcyBpbmNvbXBsZXRlIG9yIGludmFsaWQuXHJcbiAgICogQHBhcmFtIGRhdGUgdGhlIGRhdGUgdG8gZm9ybWF0IGFzIGEgc3RyaW5nXHJcbiAgICovXHJcbiAgYWJzdHJhY3QgZm9ybWF0KGRhdGU6IE5nYkRhdGVTdHJ1Y3QpOiBzdHJpbmc7XHJcbn1cclxuXHJcbkBJbmplY3RhYmxlKClcclxuZXhwb3J0IGNsYXNzIE5nYkRhdGVJU09QYXJzZXJGb3JtYXR0ZXIgZXh0ZW5kcyBOZ2JEYXRlUGFyc2VyRm9ybWF0dGVyIHtcclxuICBwYXJzZSh2YWx1ZTogc3RyaW5nKTogTmdiRGF0ZVN0cnVjdCB7XHJcbiAgICBpZiAodmFsdWUpIHtcclxuICAgICAgY29uc3QgZGF0ZVBhcnRzID0gdmFsdWUudHJpbSgpLnNwbGl0KCctJyk7XHJcbiAgICAgIGlmIChkYXRlUGFydHMubGVuZ3RoID09PSAxICYmIGlzTnVtYmVyKGRhdGVQYXJ0c1swXSkpIHtcclxuICAgICAgICByZXR1cm4ge3llYXI6IHRvSW50ZWdlcihkYXRlUGFydHNbMF0pLCBtb250aDogbnVsbCwgZGF5OiBudWxsfTtcclxuICAgICAgfSBlbHNlIGlmIChkYXRlUGFydHMubGVuZ3RoID09PSAyICYmIGlzTnVtYmVyKGRhdGVQYXJ0c1swXSkgJiYgaXNOdW1iZXIoZGF0ZVBhcnRzWzFdKSkge1xyXG4gICAgICAgIHJldHVybiB7eWVhcjogdG9JbnRlZ2VyKGRhdGVQYXJ0c1swXSksIG1vbnRoOiB0b0ludGVnZXIoZGF0ZVBhcnRzWzFdKSwgZGF5OiBudWxsfTtcclxuICAgICAgfSBlbHNlIGlmIChkYXRlUGFydHMubGVuZ3RoID09PSAzICYmIGlzTnVtYmVyKGRhdGVQYXJ0c1swXSkgJiYgaXNOdW1iZXIoZGF0ZVBhcnRzWzFdKSAmJiBpc051bWJlcihkYXRlUGFydHNbMl0pKSB7XHJcbiAgICAgICAgcmV0dXJuIHt5ZWFyOiB0b0ludGVnZXIoZGF0ZVBhcnRzWzBdKSwgbW9udGg6IHRvSW50ZWdlcihkYXRlUGFydHNbMV0pLCBkYXk6IHRvSW50ZWdlcihkYXRlUGFydHNbMl0pfTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gICAgcmV0dXJuIG51bGw7XHJcbiAgfVxyXG5cclxuICBmb3JtYXQoZGF0ZTogTmdiRGF0ZVN0cnVjdCk6IHN0cmluZyB7XHJcbiAgICByZXR1cm4gZGF0ZSA/XHJcbiAgICAgICAgYCR7ZGF0ZS55ZWFyfS0ke2lzTnVtYmVyKGRhdGUubW9udGgpID8gcGFkTnVtYmVyKGRhdGUubW9udGgpIDogJyd9LSR7aXNOdW1iZXIoZGF0ZS5kYXkpID8gcGFkTnVtYmVyKGRhdGUuZGF5KSA6ICcnfWAgOlxyXG4gICAgICAgICcnO1xyXG4gIH1cclxufVxyXG4iLCIvLyBwcmV2aW91cyB2ZXJzaW9uOlxyXG4vLyBodHRwczovL2dpdGh1Yi5jb20vYW5ndWxhci11aS9ib290c3RyYXAvYmxvYi8wN2MzMWQwNzMxZjdjYjA2OGExOTMyYjhlMDFkMjMxMmI3OTZiNGVjL3NyYy9wb3NpdGlvbi9wb3NpdGlvbi5qc1xyXG5leHBvcnQgY2xhc3MgUG9zaXRpb25pbmcge1xyXG4gIHByaXZhdGUgZ2V0QWxsU3R5bGVzKGVsZW1lbnQ6IEhUTUxFbGVtZW50KSB7IHJldHVybiB3aW5kb3cuZ2V0Q29tcHV0ZWRTdHlsZShlbGVtZW50KTsgfVxyXG5cclxuICBwcml2YXRlIGdldFN0eWxlKGVsZW1lbnQ6IEhUTUxFbGVtZW50LCBwcm9wOiBzdHJpbmcpOiBzdHJpbmcgeyByZXR1cm4gdGhpcy5nZXRBbGxTdHlsZXMoZWxlbWVudClbcHJvcF07IH1cclxuXHJcbiAgcHJpdmF0ZSBpc1N0YXRpY1Bvc2l0aW9uZWQoZWxlbWVudDogSFRNTEVsZW1lbnQpOiBib29sZWFuIHtcclxuICAgIHJldHVybiAodGhpcy5nZXRTdHlsZShlbGVtZW50LCAncG9zaXRpb24nKSB8fCAnc3RhdGljJykgPT09ICdzdGF0aWMnO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBvZmZzZXRQYXJlbnQoZWxlbWVudDogSFRNTEVsZW1lbnQpOiBIVE1MRWxlbWVudCB7XHJcbiAgICBsZXQgb2Zmc2V0UGFyZW50RWwgPSA8SFRNTEVsZW1lbnQ+ZWxlbWVudC5vZmZzZXRQYXJlbnQgfHwgZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50O1xyXG5cclxuICAgIHdoaWxlIChvZmZzZXRQYXJlbnRFbCAmJiBvZmZzZXRQYXJlbnRFbCAhPT0gZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50ICYmIHRoaXMuaXNTdGF0aWNQb3NpdGlvbmVkKG9mZnNldFBhcmVudEVsKSkge1xyXG4gICAgICBvZmZzZXRQYXJlbnRFbCA9IDxIVE1MRWxlbWVudD5vZmZzZXRQYXJlbnRFbC5vZmZzZXRQYXJlbnQ7XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIG9mZnNldFBhcmVudEVsIHx8IGRvY3VtZW50LmRvY3VtZW50RWxlbWVudDtcclxuICB9XHJcblxyXG4gIHBvc2l0aW9uKGVsZW1lbnQ6IEhUTUxFbGVtZW50LCByb3VuZCA9IHRydWUpOiBDbGllbnRSZWN0IHtcclxuICAgIGxldCBlbFBvc2l0aW9uOiBDbGllbnRSZWN0O1xyXG4gICAgbGV0IHBhcmVudE9mZnNldDogQ2xpZW50UmVjdCA9IHt3aWR0aDogMCwgaGVpZ2h0OiAwLCB0b3A6IDAsIGJvdHRvbTogMCwgbGVmdDogMCwgcmlnaHQ6IDB9O1xyXG5cclxuICAgIGlmICh0aGlzLmdldFN0eWxlKGVsZW1lbnQsICdwb3NpdGlvbicpID09PSAnZml4ZWQnKSB7XHJcbiAgICAgIGVsUG9zaXRpb24gPSBlbGVtZW50LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgY29uc3Qgb2Zmc2V0UGFyZW50RWwgPSB0aGlzLm9mZnNldFBhcmVudChlbGVtZW50KTtcclxuXHJcbiAgICAgIGVsUG9zaXRpb24gPSB0aGlzLm9mZnNldChlbGVtZW50LCBmYWxzZSk7XHJcblxyXG4gICAgICBpZiAob2Zmc2V0UGFyZW50RWwgIT09IGRvY3VtZW50LmRvY3VtZW50RWxlbWVudCkge1xyXG4gICAgICAgIHBhcmVudE9mZnNldCA9IHRoaXMub2Zmc2V0KG9mZnNldFBhcmVudEVsLCBmYWxzZSk7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIHBhcmVudE9mZnNldC50b3AgKz0gb2Zmc2V0UGFyZW50RWwuY2xpZW50VG9wO1xyXG4gICAgICBwYXJlbnRPZmZzZXQubGVmdCArPSBvZmZzZXRQYXJlbnRFbC5jbGllbnRMZWZ0O1xyXG4gICAgfVxyXG5cclxuICAgIGVsUG9zaXRpb24udG9wIC09IHBhcmVudE9mZnNldC50b3A7XHJcbiAgICBlbFBvc2l0aW9uLmJvdHRvbSAtPSBwYXJlbnRPZmZzZXQudG9wO1xyXG4gICAgZWxQb3NpdGlvbi5sZWZ0IC09IHBhcmVudE9mZnNldC5sZWZ0O1xyXG4gICAgZWxQb3NpdGlvbi5yaWdodCAtPSBwYXJlbnRPZmZzZXQubGVmdDtcclxuXHJcbiAgICBpZiAocm91bmQpIHtcclxuICAgICAgZWxQb3NpdGlvbi50b3AgPSBNYXRoLnJvdW5kKGVsUG9zaXRpb24udG9wKTtcclxuICAgICAgZWxQb3NpdGlvbi5ib3R0b20gPSBNYXRoLnJvdW5kKGVsUG9zaXRpb24uYm90dG9tKTtcclxuICAgICAgZWxQb3NpdGlvbi5sZWZ0ID0gTWF0aC5yb3VuZChlbFBvc2l0aW9uLmxlZnQpO1xyXG4gICAgICBlbFBvc2l0aW9uLnJpZ2h0ID0gTWF0aC5yb3VuZChlbFBvc2l0aW9uLnJpZ2h0KTtcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gZWxQb3NpdGlvbjtcclxuICB9XHJcblxyXG4gIG9mZnNldChlbGVtZW50OiBIVE1MRWxlbWVudCwgcm91bmQgPSB0cnVlKTogQ2xpZW50UmVjdCB7XHJcbiAgICBjb25zdCBlbEJjciA9IGVsZW1lbnQuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XHJcbiAgICBjb25zdCB2aWV3cG9ydE9mZnNldCA9IHtcclxuICAgICAgdG9wOiB3aW5kb3cucGFnZVlPZmZzZXQgLSBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuY2xpZW50VG9wLFxyXG4gICAgICBsZWZ0OiB3aW5kb3cucGFnZVhPZmZzZXQgLSBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuY2xpZW50TGVmdFxyXG4gICAgfTtcclxuXHJcbiAgICBsZXQgZWxPZmZzZXQgPSB7XHJcbiAgICAgIGhlaWdodDogZWxCY3IuaGVpZ2h0IHx8IGVsZW1lbnQub2Zmc2V0SGVpZ2h0LFxyXG4gICAgICB3aWR0aDogZWxCY3Iud2lkdGggfHwgZWxlbWVudC5vZmZzZXRXaWR0aCxcclxuICAgICAgdG9wOiBlbEJjci50b3AgKyB2aWV3cG9ydE9mZnNldC50b3AsXHJcbiAgICAgIGJvdHRvbTogZWxCY3IuYm90dG9tICsgdmlld3BvcnRPZmZzZXQudG9wLFxyXG4gICAgICBsZWZ0OiBlbEJjci5sZWZ0ICsgdmlld3BvcnRPZmZzZXQubGVmdCxcclxuICAgICAgcmlnaHQ6IGVsQmNyLnJpZ2h0ICsgdmlld3BvcnRPZmZzZXQubGVmdFxyXG4gICAgfTtcclxuXHJcbiAgICBpZiAocm91bmQpIHtcclxuICAgICAgZWxPZmZzZXQuaGVpZ2h0ID0gTWF0aC5yb3VuZChlbE9mZnNldC5oZWlnaHQpO1xyXG4gICAgICBlbE9mZnNldC53aWR0aCA9IE1hdGgucm91bmQoZWxPZmZzZXQud2lkdGgpO1xyXG4gICAgICBlbE9mZnNldC50b3AgPSBNYXRoLnJvdW5kKGVsT2Zmc2V0LnRvcCk7XHJcbiAgICAgIGVsT2Zmc2V0LmJvdHRvbSA9IE1hdGgucm91bmQoZWxPZmZzZXQuYm90dG9tKTtcclxuICAgICAgZWxPZmZzZXQubGVmdCA9IE1hdGgucm91bmQoZWxPZmZzZXQubGVmdCk7XHJcbiAgICAgIGVsT2Zmc2V0LnJpZ2h0ID0gTWF0aC5yb3VuZChlbE9mZnNldC5yaWdodCk7XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIGVsT2Zmc2V0O1xyXG4gIH1cclxuXHJcbiAgcG9zaXRpb25FbGVtZW50cyhob3N0RWxlbWVudDogSFRNTEVsZW1lbnQsIHRhcmdldEVsZW1lbnQ6IEhUTUxFbGVtZW50LCBwbGFjZW1lbnQ6IHN0cmluZywgYXBwZW5kVG9Cb2R5PzogYm9vbGVhbik6XHJcbiAgICAgIENsaWVudFJlY3Qge1xyXG4gICAgY29uc3QgaG9zdEVsUG9zaXRpb24gPSBhcHBlbmRUb0JvZHkgPyB0aGlzLm9mZnNldChob3N0RWxlbWVudCwgZmFsc2UpIDogdGhpcy5wb3NpdGlvbihob3N0RWxlbWVudCwgZmFsc2UpO1xyXG4gICAgY29uc3QgdGFyZ2V0RWxTdHlsZXMgPSB0aGlzLmdldEFsbFN0eWxlcyh0YXJnZXRFbGVtZW50KTtcclxuICAgIGNvbnN0IHRhcmdldEVsQkNSID0gdGFyZ2V0RWxlbWVudC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcclxuICAgIGNvbnN0IHBsYWNlbWVudFByaW1hcnkgPSBwbGFjZW1lbnQuc3BsaXQoJy0nKVswXSB8fCAndG9wJztcclxuICAgIGNvbnN0IHBsYWNlbWVudFNlY29uZGFyeSA9IHBsYWNlbWVudC5zcGxpdCgnLScpWzFdIHx8ICdjZW50ZXInO1xyXG5cclxuICAgIGxldCB0YXJnZXRFbFBvc2l0aW9uOiBDbGllbnRSZWN0ID0ge1xyXG4gICAgICAnaGVpZ2h0JzogdGFyZ2V0RWxCQ1IuaGVpZ2h0IHx8IHRhcmdldEVsZW1lbnQub2Zmc2V0SGVpZ2h0LFxyXG4gICAgICAnd2lkdGgnOiB0YXJnZXRFbEJDUi53aWR0aCB8fCB0YXJnZXRFbGVtZW50Lm9mZnNldFdpZHRoLFxyXG4gICAgICAndG9wJzogMCxcclxuICAgICAgJ2JvdHRvbSc6IHRhcmdldEVsQkNSLmhlaWdodCB8fCB0YXJnZXRFbGVtZW50Lm9mZnNldEhlaWdodCxcclxuICAgICAgJ2xlZnQnOiAwLFxyXG4gICAgICAncmlnaHQnOiB0YXJnZXRFbEJDUi53aWR0aCB8fCB0YXJnZXRFbGVtZW50Lm9mZnNldFdpZHRoXHJcbiAgICB9O1xyXG5cclxuICAgIHN3aXRjaCAocGxhY2VtZW50UHJpbWFyeSkge1xyXG4gICAgICBjYXNlICd0b3AnOlxyXG4gICAgICAgIHRhcmdldEVsUG9zaXRpb24udG9wID1cclxuICAgICAgICAgICAgaG9zdEVsUG9zaXRpb24udG9wIC0gKHRhcmdldEVsZW1lbnQub2Zmc2V0SGVpZ2h0ICsgcGFyc2VGbG9hdCh0YXJnZXRFbFN0eWxlcy5tYXJnaW5Cb3R0b20pKTtcclxuICAgICAgICBicmVhaztcclxuICAgICAgY2FzZSAnYm90dG9tJzpcclxuICAgICAgICB0YXJnZXRFbFBvc2l0aW9uLnRvcCA9IGhvc3RFbFBvc2l0aW9uLnRvcCArIGhvc3RFbFBvc2l0aW9uLmhlaWdodDtcclxuICAgICAgICBicmVhaztcclxuICAgICAgY2FzZSAnbGVmdCc6XHJcbiAgICAgICAgdGFyZ2V0RWxQb3NpdGlvbi5sZWZ0ID1cclxuICAgICAgICAgICAgaG9zdEVsUG9zaXRpb24ubGVmdCAtICh0YXJnZXRFbGVtZW50Lm9mZnNldFdpZHRoICsgcGFyc2VGbG9hdCh0YXJnZXRFbFN0eWxlcy5tYXJnaW5SaWdodCkpO1xyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgICBjYXNlICdyaWdodCc6XHJcbiAgICAgICAgdGFyZ2V0RWxQb3NpdGlvbi5sZWZ0ID0gaG9zdEVsUG9zaXRpb24ubGVmdCArIGhvc3RFbFBvc2l0aW9uLndpZHRoO1xyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgfVxyXG5cclxuICAgIHN3aXRjaCAocGxhY2VtZW50U2Vjb25kYXJ5KSB7XHJcbiAgICAgIGNhc2UgJ3RvcCc6XHJcbiAgICAgICAgdGFyZ2V0RWxQb3NpdGlvbi50b3AgPSBob3N0RWxQb3NpdGlvbi50b3A7XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICAgIGNhc2UgJ2JvdHRvbSc6XHJcbiAgICAgICAgdGFyZ2V0RWxQb3NpdGlvbi50b3AgPSBob3N0RWxQb3NpdGlvbi50b3AgKyBob3N0RWxQb3NpdGlvbi5oZWlnaHQgLSB0YXJnZXRFbGVtZW50Lm9mZnNldEhlaWdodDtcclxuICAgICAgICBicmVhaztcclxuICAgICAgY2FzZSAnbGVmdCc6XHJcbiAgICAgICAgdGFyZ2V0RWxQb3NpdGlvbi5sZWZ0ID0gaG9zdEVsUG9zaXRpb24ubGVmdDtcclxuICAgICAgICBicmVhaztcclxuICAgICAgY2FzZSAncmlnaHQnOlxyXG4gICAgICAgIHRhcmdldEVsUG9zaXRpb24ubGVmdCA9IGhvc3RFbFBvc2l0aW9uLmxlZnQgKyBob3N0RWxQb3NpdGlvbi53aWR0aCAtIHRhcmdldEVsZW1lbnQub2Zmc2V0V2lkdGg7XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICAgIGNhc2UgJ2NlbnRlcic6XHJcbiAgICAgICAgaWYgKHBsYWNlbWVudFByaW1hcnkgPT09ICd0b3AnIHx8IHBsYWNlbWVudFByaW1hcnkgPT09ICdib3R0b20nKSB7XHJcbiAgICAgICAgICB0YXJnZXRFbFBvc2l0aW9uLmxlZnQgPSBob3N0RWxQb3NpdGlvbi5sZWZ0ICsgaG9zdEVsUG9zaXRpb24ud2lkdGggLyAyIC0gdGFyZ2V0RWxlbWVudC5vZmZzZXRXaWR0aCAvIDI7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIHRhcmdldEVsUG9zaXRpb24udG9wID0gaG9zdEVsUG9zaXRpb24udG9wICsgaG9zdEVsUG9zaXRpb24uaGVpZ2h0IC8gMiAtIHRhcmdldEVsZW1lbnQub2Zmc2V0SGVpZ2h0IC8gMjtcclxuICAgICAgICB9XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICB9XHJcblxyXG4gICAgdGFyZ2V0RWxQb3NpdGlvbi50b3AgPSBNYXRoLnJvdW5kKHRhcmdldEVsUG9zaXRpb24udG9wKTtcclxuICAgIHRhcmdldEVsUG9zaXRpb24uYm90dG9tID0gTWF0aC5yb3VuZCh0YXJnZXRFbFBvc2l0aW9uLmJvdHRvbSk7XHJcbiAgICB0YXJnZXRFbFBvc2l0aW9uLmxlZnQgPSBNYXRoLnJvdW5kKHRhcmdldEVsUG9zaXRpb24ubGVmdCk7XHJcbiAgICB0YXJnZXRFbFBvc2l0aW9uLnJpZ2h0ID0gTWF0aC5yb3VuZCh0YXJnZXRFbFBvc2l0aW9uLnJpZ2h0KTtcclxuXHJcbiAgICByZXR1cm4gdGFyZ2V0RWxQb3NpdGlvbjtcclxuICB9XHJcblxyXG4gIC8vIGdldCB0aGUgYXZhaWxhYmxlIHBsYWNlbWVudHMgb2YgdGhlIHRhcmdldCBlbGVtZW50IGluIHRoZSB2aWV3cG9ydCBkZXBlbmRpbmcgb24gdGhlIGhvc3QgZWxlbWVudFxyXG4gIGdldEF2YWlsYWJsZVBsYWNlbWVudHMoaG9zdEVsZW1lbnQ6IEhUTUxFbGVtZW50LCB0YXJnZXRFbGVtZW50OiBIVE1MRWxlbWVudCk6IHN0cmluZ1tdIHtcclxuICAgIGxldCBhdmFpbGFibGVQbGFjZW1lbnRzOiBBcnJheTxzdHJpbmc+ID0gW107XHJcbiAgICBsZXQgaG9zdEVsZW1DbGllbnRSZWN0ID0gaG9zdEVsZW1lbnQuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XHJcbiAgICBsZXQgdGFyZ2V0RWxlbUNsaWVudFJlY3QgPSB0YXJnZXRFbGVtZW50LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xyXG4gICAgbGV0IGh0bWwgPSBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQ7XHJcbiAgICBsZXQgd2luZG93SGVpZ2h0ID0gd2luZG93LmlubmVySGVpZ2h0IHx8IGh0bWwuY2xpZW50SGVpZ2h0O1xyXG4gICAgbGV0IHdpbmRvd1dpZHRoID0gd2luZG93LmlubmVyV2lkdGggfHwgaHRtbC5jbGllbnRXaWR0aDtcclxuICAgIGxldCBob3N0RWxlbUNsaWVudFJlY3RIb3JDZW50ZXIgPSBob3N0RWxlbUNsaWVudFJlY3QubGVmdCArIGhvc3RFbGVtQ2xpZW50UmVjdC53aWR0aCAvIDI7XHJcbiAgICBsZXQgaG9zdEVsZW1DbGllbnRSZWN0VmVyQ2VudGVyID0gaG9zdEVsZW1DbGllbnRSZWN0LnRvcCArIGhvc3RFbGVtQ2xpZW50UmVjdC5oZWlnaHQgLyAyO1xyXG5cclxuICAgIC8vIGxlZnQ6IGNoZWNrIGlmIHRhcmdldCB3aWR0aCBjYW4gYmUgcGxhY2VkIGJldHdlZW4gaG9zdCBsZWZ0IGFuZCB2aWV3cG9ydCBzdGFydCBhbmQgYWxzbyBoZWlnaHQgb2YgdGFyZ2V0IGlzXHJcbiAgICAvLyBpbnNpZGUgdmlld3BvcnRcclxuICAgIGlmICh0YXJnZXRFbGVtQ2xpZW50UmVjdC53aWR0aCA8IGhvc3RFbGVtQ2xpZW50UmVjdC5sZWZ0KSB7XHJcbiAgICAgIC8vIGNoZWNrIGZvciBsZWZ0IG9ubHlcclxuICAgICAgaWYgKGhvc3RFbGVtQ2xpZW50UmVjdFZlckNlbnRlciA+IHRhcmdldEVsZW1DbGllbnRSZWN0LmhlaWdodCAvIDIgJiZcclxuICAgICAgICAgIHdpbmRvd0hlaWdodCAtIGhvc3RFbGVtQ2xpZW50UmVjdFZlckNlbnRlciA+IHRhcmdldEVsZW1DbGllbnRSZWN0LmhlaWdodCAvIDIpIHtcclxuICAgICAgICBhdmFpbGFibGVQbGFjZW1lbnRzLnNwbGljZShhdmFpbGFibGVQbGFjZW1lbnRzLmxlbmd0aCwgMSwgJ2xlZnQnKTtcclxuICAgICAgfVxyXG4gICAgICAvLyBjaGVjayBmb3IgbGVmdC10b3AgYW5kIGxlZnQtYm90dG9tXHJcbiAgICAgIHRoaXMuc2V0U2Vjb25kYXJ5UGxhY2VtZW50Rm9yTGVmdFJpZ2h0KGhvc3RFbGVtQ2xpZW50UmVjdCwgdGFyZ2V0RWxlbUNsaWVudFJlY3QsICdsZWZ0JywgYXZhaWxhYmxlUGxhY2VtZW50cyk7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gdG9wOiB0YXJnZXQgaGVpZ2h0IGlzIGxlc3MgdGhhbiBob3N0IHRvcFxyXG4gICAgaWYgKHRhcmdldEVsZW1DbGllbnRSZWN0LmhlaWdodCA8IGhvc3RFbGVtQ2xpZW50UmVjdC50b3ApIHtcclxuICAgICAgaWYgKGhvc3RFbGVtQ2xpZW50UmVjdEhvckNlbnRlciA+IHRhcmdldEVsZW1DbGllbnRSZWN0LndpZHRoIC8gMiAmJlxyXG4gICAgICAgICAgd2luZG93V2lkdGggLSBob3N0RWxlbUNsaWVudFJlY3RIb3JDZW50ZXIgPiB0YXJnZXRFbGVtQ2xpZW50UmVjdC53aWR0aCAvIDIpIHtcclxuICAgICAgICBhdmFpbGFibGVQbGFjZW1lbnRzLnNwbGljZShhdmFpbGFibGVQbGFjZW1lbnRzLmxlbmd0aCwgMSwgJ3RvcCcpO1xyXG4gICAgICB9XHJcbiAgICAgIHRoaXMuc2V0U2Vjb25kYXJ5UGxhY2VtZW50Rm9yVG9wQm90dG9tKGhvc3RFbGVtQ2xpZW50UmVjdCwgdGFyZ2V0RWxlbUNsaWVudFJlY3QsICd0b3AnLCBhdmFpbGFibGVQbGFjZW1lbnRzKTtcclxuICAgIH1cclxuXHJcbiAgICAvLyByaWdodDogY2hlY2sgaWYgdGFyZ2V0IHdpZHRoIGNhbiBiZSBwbGFjZWQgYmV0d2VlbiBob3N0IHJpZ2h0IGFuZCB2aWV3cG9ydCBlbmQgYW5kIGFsc28gaGVpZ2h0IG9mIHRhcmdldCBpc1xyXG4gICAgLy8gaW5zaWRlIHZpZXdwb3J0XHJcbiAgICBpZiAod2luZG93V2lkdGggLSBob3N0RWxlbUNsaWVudFJlY3QucmlnaHQgPiB0YXJnZXRFbGVtQ2xpZW50UmVjdC53aWR0aCkge1xyXG4gICAgICAvLyBjaGVjayBmb3IgcmlnaHQgb25seVxyXG4gICAgICBpZiAoaG9zdEVsZW1DbGllbnRSZWN0VmVyQ2VudGVyID4gdGFyZ2V0RWxlbUNsaWVudFJlY3QuaGVpZ2h0IC8gMiAmJlxyXG4gICAgICAgICAgd2luZG93SGVpZ2h0IC0gaG9zdEVsZW1DbGllbnRSZWN0VmVyQ2VudGVyID4gdGFyZ2V0RWxlbUNsaWVudFJlY3QuaGVpZ2h0IC8gMikge1xyXG4gICAgICAgIGF2YWlsYWJsZVBsYWNlbWVudHMuc3BsaWNlKGF2YWlsYWJsZVBsYWNlbWVudHMubGVuZ3RoLCAxLCAncmlnaHQnKTtcclxuICAgICAgfVxyXG4gICAgICAvLyBjaGVjayBmb3IgcmlnaHQtdG9wIGFuZCByaWdodC1ib3R0b21cclxuICAgICAgdGhpcy5zZXRTZWNvbmRhcnlQbGFjZW1lbnRGb3JMZWZ0UmlnaHQoaG9zdEVsZW1DbGllbnRSZWN0LCB0YXJnZXRFbGVtQ2xpZW50UmVjdCwgJ3JpZ2h0JywgYXZhaWxhYmxlUGxhY2VtZW50cyk7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gYm90dG9tOiBjaGVjayBpZiB0aGVyZSBpcyBlbm91Z2ggc3BhY2UgYmV0d2VlbiBob3N0IGJvdHRvbSBhbmQgdmlld3BvcnQgZW5kIGZvciB0YXJnZXQgaGVpZ2h0XHJcbiAgICBpZiAod2luZG93SGVpZ2h0IC0gaG9zdEVsZW1DbGllbnRSZWN0LmJvdHRvbSA+IHRhcmdldEVsZW1DbGllbnRSZWN0LmhlaWdodCkge1xyXG4gICAgICBpZiAoaG9zdEVsZW1DbGllbnRSZWN0SG9yQ2VudGVyID4gdGFyZ2V0RWxlbUNsaWVudFJlY3Qud2lkdGggLyAyICYmXHJcbiAgICAgICAgICB3aW5kb3dXaWR0aCAtIGhvc3RFbGVtQ2xpZW50UmVjdEhvckNlbnRlciA+IHRhcmdldEVsZW1DbGllbnRSZWN0LndpZHRoIC8gMikge1xyXG4gICAgICAgIGF2YWlsYWJsZVBsYWNlbWVudHMuc3BsaWNlKGF2YWlsYWJsZVBsYWNlbWVudHMubGVuZ3RoLCAxLCAnYm90dG9tJyk7XHJcbiAgICAgIH1cclxuICAgICAgdGhpcy5zZXRTZWNvbmRhcnlQbGFjZW1lbnRGb3JUb3BCb3R0b20oaG9zdEVsZW1DbGllbnRSZWN0LCB0YXJnZXRFbGVtQ2xpZW50UmVjdCwgJ2JvdHRvbScsIGF2YWlsYWJsZVBsYWNlbWVudHMpO1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiBhdmFpbGFibGVQbGFjZW1lbnRzO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogY2hlY2sgaWYgc2Vjb25kYXJ5IHBsYWNlbWVudCBmb3IgbGVmdCBhbmQgcmlnaHQgYXJlIGF2YWlsYWJsZSBpLmUuIGxlZnQtdG9wLCBsZWZ0LWJvdHRvbSwgcmlnaHQtdG9wLCByaWdodC1ib3R0b21cclxuICAgKiBwcmltYXJ5cGxhY2VtZW50OiBsZWZ0fHJpZ2h0XHJcbiAgICogYXZhaWxhYmxlUGxhY2VtZW50QXJyOiBhcnJheSBpbiB3aGljaCBhdmFpbGFibGUgcGxhY2VtZW50cyB0byBiZSBzZXRcclxuICAgKi9cclxuICBwcml2YXRlIHNldFNlY29uZGFyeVBsYWNlbWVudEZvckxlZnRSaWdodChcclxuICAgICAgaG9zdEVsZW1DbGllbnRSZWN0OiBDbGllbnRSZWN0LCB0YXJnZXRFbGVtQ2xpZW50UmVjdDogQ2xpZW50UmVjdCwgcHJpbWFyeVBsYWNlbWVudDogc3RyaW5nLFxyXG4gICAgICBhdmFpbGFibGVQbGFjZW1lbnRBcnI6IEFycmF5PHN0cmluZz4pIHtcclxuICAgIGxldCBodG1sID0gZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50O1xyXG4gICAgLy8gY2hlY2sgZm9yIGxlZnQtYm90dG9tXHJcbiAgICBpZiAodGFyZ2V0RWxlbUNsaWVudFJlY3QuaGVpZ2h0IDw9IGhvc3RFbGVtQ2xpZW50UmVjdC5ib3R0b20pIHtcclxuICAgICAgYXZhaWxhYmxlUGxhY2VtZW50QXJyLnNwbGljZShhdmFpbGFibGVQbGFjZW1lbnRBcnIubGVuZ3RoLCAxLCBwcmltYXJ5UGxhY2VtZW50ICsgJy1ib3R0b20nKTtcclxuICAgIH1cclxuICAgIGlmICgod2luZG93LmlubmVySGVpZ2h0IHx8IGh0bWwuY2xpZW50SGVpZ2h0KSAtIGhvc3RFbGVtQ2xpZW50UmVjdC50b3AgPj0gdGFyZ2V0RWxlbUNsaWVudFJlY3QuaGVpZ2h0KSB7XHJcbiAgICAgIGF2YWlsYWJsZVBsYWNlbWVudEFyci5zcGxpY2UoYXZhaWxhYmxlUGxhY2VtZW50QXJyLmxlbmd0aCwgMSwgcHJpbWFyeVBsYWNlbWVudCArICctdG9wJyk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBjaGVjayBpZiBzZWNvbmRhcnkgcGxhY2VtZW50IGZvciB0b3AgYW5kIGJvdHRvbSBhcmUgYXZhaWxhYmxlIGkuZS4gdG9wLWxlZnQsIHRvcC1yaWdodCwgYm90dG9tLWxlZnQsIGJvdHRvbS1yaWdodFxyXG4gICAqIHByaW1hcnlwbGFjZW1lbnQ6IHRvcHxib3R0b21cclxuICAgKiBhdmFpbGFibGVQbGFjZW1lbnRBcnI6IGFycmF5IGluIHdoaWNoIGF2YWlsYWJsZSBwbGFjZW1lbnRzIHRvIGJlIHNldFxyXG4gICAqL1xyXG4gIHByaXZhdGUgc2V0U2Vjb25kYXJ5UGxhY2VtZW50Rm9yVG9wQm90dG9tKFxyXG4gICAgICBob3N0RWxlbUNsaWVudFJlY3Q6IENsaWVudFJlY3QsIHRhcmdldEVsZW1DbGllbnRSZWN0OiBDbGllbnRSZWN0LCBwcmltYXJ5UGxhY2VtZW50OiBzdHJpbmcsXHJcbiAgICAgIGF2YWlsYWJsZVBsYWNlbWVudEFycjogQXJyYXk8c3RyaW5nPikge1xyXG4gICAgbGV0IGh0bWwgPSBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQ7XHJcbiAgICAvLyBjaGVjayBmb3IgbGVmdC1ib3R0b21cclxuICAgIGlmICgod2luZG93LmlubmVyV2lkdGggfHwgaHRtbC5jbGllbnRXaWR0aCkgLSBob3N0RWxlbUNsaWVudFJlY3QubGVmdCA+PSB0YXJnZXRFbGVtQ2xpZW50UmVjdC53aWR0aCkge1xyXG4gICAgICBhdmFpbGFibGVQbGFjZW1lbnRBcnIuc3BsaWNlKGF2YWlsYWJsZVBsYWNlbWVudEFyci5sZW5ndGgsIDEsIHByaW1hcnlQbGFjZW1lbnQgKyAnLWxlZnQnKTtcclxuICAgIH1cclxuICAgIGlmICh0YXJnZXRFbGVtQ2xpZW50UmVjdC53aWR0aCA8PSBob3N0RWxlbUNsaWVudFJlY3QucmlnaHQpIHtcclxuICAgICAgYXZhaWxhYmxlUGxhY2VtZW50QXJyLnNwbGljZShhdmFpbGFibGVQbGFjZW1lbnRBcnIubGVuZ3RoLCAxLCBwcmltYXJ5UGxhY2VtZW50ICsgJy1yaWdodCcpO1xyXG4gICAgfVxyXG4gIH1cclxufVxyXG5cclxuY29uc3QgcG9zaXRpb25TZXJ2aWNlID0gbmV3IFBvc2l0aW9uaW5nKCk7XHJcblxyXG4vKlxyXG4gKiBBY2NlcHQgdGhlIHBsYWNlbWVudCBhcnJheSBhbmQgYXBwbGllcyB0aGUgYXBwcm9wcmlhdGUgcGxhY2VtZW50IGRlcGVuZGVudCBvbiB0aGUgdmlld3BvcnQuXHJcbiAqIFJldHVybnMgdGhlIGFwcGxpZWQgcGxhY2VtZW50LlxyXG4gKiBJbiBjYXNlIG9mIGF1dG8gcGxhY2VtZW50LCBwbGFjZW1lbnRzIGFyZSBzZWxlY3RlZCBpbiBvcmRlclxyXG4gKiAgICd0b3AnLCAnYm90dG9tJywgJ2xlZnQnLCAncmlnaHQnLFxyXG4gKiAgICd0b3AtbGVmdCcsICd0b3AtcmlnaHQnLFxyXG4gKiAgICdib3R0b20tbGVmdCcsICdib3R0b20tcmlnaHQnLFxyXG4gKiAgICdsZWZ0LXRvcCcsICdsZWZ0LWJvdHRvbScsXHJcbiAqICAgJ3JpZ2h0LXRvcCcsICdyaWdodC1ib3R0b20nLlxyXG4gKiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gcG9zaXRpb25FbGVtZW50cyhcclxuICAgIGhvc3RFbGVtZW50OiBIVE1MRWxlbWVudCwgdGFyZ2V0RWxlbWVudDogSFRNTEVsZW1lbnQsIHBsYWNlbWVudDogc3RyaW5nIHwgUGxhY2VtZW50IHwgUGxhY2VtZW50QXJyYXksXHJcbiAgICBhcHBlbmRUb0JvZHk/OiBib29sZWFuKTogUGxhY2VtZW50IHtcclxuICBsZXQgcGxhY2VtZW50VmFsczogQXJyYXk8UGxhY2VtZW50PiA9IEFycmF5LmlzQXJyYXkocGxhY2VtZW50KSA/IHBsYWNlbWVudCA6IFtwbGFjZW1lbnQgYXMgUGxhY2VtZW50XTtcclxuXHJcbiAgLy8gcmVwbGFjZSBhdXRvIHBsYWNlbWVudCB3aXRoIG90aGVyIHBsYWNlbWVudHNcclxuICBsZXQgaGFzQXV0byA9IHBsYWNlbWVudFZhbHMuZmluZEluZGV4KHZhbCA9PiB2YWwgPT09ICdhdXRvJyk7XHJcbiAgaWYgKGhhc0F1dG8gPj0gMCkge1xyXG4gICAgWyd0b3AnLCAnYm90dG9tJywgJ2xlZnQnLCAncmlnaHQnLCAndG9wLWxlZnQnLCAndG9wLXJpZ2h0JywgJ2JvdHRvbS1sZWZ0JywgJ2JvdHRvbS1yaWdodCcsICdsZWZ0LXRvcCcsXHJcbiAgICAgJ2xlZnQtYm90dG9tJywgJ3JpZ2h0LXRvcCcsICdyaWdodC1ib3R0b20nLFxyXG4gICAgXS5mb3JFYWNoKGZ1bmN0aW9uKG9iaikge1xyXG4gICAgICBpZiAocGxhY2VtZW50VmFscy5maW5kKHZhbCA9PiB2YWwuc2VhcmNoKCdeJyArIG9iaikgIT09IC0xKSA9PSBudWxsKSB7XHJcbiAgICAgICAgcGxhY2VtZW50VmFscy5zcGxpY2UoaGFzQXV0bysrLCAxLCBvYmogYXMgUGxhY2VtZW50KTtcclxuICAgICAgfVxyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICAvLyBjb29yZGluYXRlcyB3aGVyZSB0byBwb3NpdGlvblxyXG4gIGxldCB0b3BWYWwgPSAwLCBsZWZ0VmFsID0gMDtcclxuICBsZXQgYXBwbGllZFBsYWNlbWVudDogUGxhY2VtZW50O1xyXG4gIC8vIGdldCBhdmFpbGFibGUgcGxhY2VtZW50c1xyXG4gIGxldCBhdmFpbGFibGVQbGFjZW1lbnRzID0gcG9zaXRpb25TZXJ2aWNlLmdldEF2YWlsYWJsZVBsYWNlbWVudHMoaG9zdEVsZW1lbnQsIHRhcmdldEVsZW1lbnQpO1xyXG4gIC8vIGl0ZXJhdGUgb3ZlciBhbGwgdGhlIHBhc3NlZCBwbGFjZW1lbnRzXHJcbiAgZm9yIChsZXQgeyBpdGVtLCBpbmRleCB9IG9mIHRvSXRlbUluZGV4ZXMocGxhY2VtZW50VmFscykpIHtcclxuICAgIC8vIGNoZWNrIGlmIHBhc3NlZCBwbGFjZW1lbnQgaXMgcHJlc2VudCBpbiB0aGUgYXZhaWxhYmxlIHBsYWNlbWVudCBvciBvdGhlcndpc2UgYXBwbHkgdGhlIGxhc3QgcGxhY2VtZW50IGluIHRoZVxyXG4gICAgLy8gcGFzc2VkIHBsYWNlbWVudCBsaXN0XHJcbiAgICBpZiAoKGF2YWlsYWJsZVBsYWNlbWVudHMuZmluZCh2YWwgPT4gdmFsID09PSBpdGVtKSAhPSBudWxsKSB8fCAocGxhY2VtZW50VmFscy5sZW5ndGggPT09IGluZGV4ICsgMSkpIHtcclxuICAgICAgYXBwbGllZFBsYWNlbWVudCA9IDxQbGFjZW1lbnQ+aXRlbTtcclxuICAgICAgY29uc3QgcG9zID0gcG9zaXRpb25TZXJ2aWNlLnBvc2l0aW9uRWxlbWVudHMoaG9zdEVsZW1lbnQsIHRhcmdldEVsZW1lbnQsIGl0ZW0sIGFwcGVuZFRvQm9keSk7XHJcbiAgICAgIHRvcFZhbCA9IHBvcy50b3A7XHJcbiAgICAgIGxlZnRWYWwgPSBwb3MubGVmdDtcclxuICAgICAgYnJlYWs7XHJcbiAgICB9XHJcbiAgfVxyXG4gIHRhcmdldEVsZW1lbnQuc3R5bGUudG9wID0gYCR7dG9wVmFsfXB4YDtcclxuICB0YXJnZXRFbGVtZW50LnN0eWxlLmxlZnQgPSBgJHtsZWZ0VmFsfXB4YDtcclxuICByZXR1cm4gYXBwbGllZFBsYWNlbWVudDtcclxufVxyXG5cclxuLy8gZnVuY3Rpb24gdG8gZ2V0IGluZGV4IGFuZCBpdGVtIG9mIGFuIGFycmF5XHJcbmZ1bmN0aW9uIHRvSXRlbUluZGV4ZXM8VD4oYTogVFtdKSB7XHJcbiAgcmV0dXJuIGEubWFwKChpdGVtLCBpbmRleCkgPT4gKHtpdGVtLCBpbmRleH0pKTtcclxufVxyXG5cclxuZXhwb3J0IHR5cGUgUGxhY2VtZW50ID0gJ2F1dG8nIHwgJ3RvcCcgfCAnYm90dG9tJyB8ICdsZWZ0JyB8ICdyaWdodCcgfCAndG9wLWxlZnQnIHwgJ3RvcC1yaWdodCcgfCAnYm90dG9tLWxlZnQnIHxcclxuICAgICdib3R0b20tcmlnaHQnIHwgJ2xlZnQtdG9wJyB8ICdsZWZ0LWJvdHRvbScgfCAncmlnaHQtdG9wJyB8ICdyaWdodC1ib3R0b20nO1xyXG5cclxuZXhwb3J0IHR5cGUgUGxhY2VtZW50QXJyYXkgPSBQbGFjZW1lbnQgfCBBcnJheTxQbGFjZW1lbnQ+O1xyXG4iLCJpbXBvcnQge2Zyb21FdmVudCwgT2JzZXJ2YWJsZX0gZnJvbSAncnhqcyc7XHJcbmltcG9ydCB7ZmlsdGVyLCBtYXAsIHRha2VVbnRpbCwgd2l0aExhdGVzdEZyb219IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcclxuaW1wb3J0IHtLZXl9IGZyb20gJy4uL3V0aWwva2V5JztcclxuXHJcbmNvbnN0IEZPQ1VTQUJMRV9FTEVNRU5UU19TRUxFQ1RPUiA9IFtcclxuICAnYVtocmVmXScsICdidXR0b246bm90KFtkaXNhYmxlZF0pJywgJ2lucHV0Om5vdChbZGlzYWJsZWRdKTpub3QoW3R5cGU9XCJoaWRkZW5cIl0pJywgJ3NlbGVjdDpub3QoW2Rpc2FibGVkXSknLFxyXG4gICd0ZXh0YXJlYTpub3QoW2Rpc2FibGVkXSknLCAnW2NvbnRlbnRlZGl0YWJsZV0nLCAnW3RhYmluZGV4XTpub3QoW3RhYmluZGV4PVwiLTFcIl0pJ1xyXG5dLmpvaW4oJywgJyk7XHJcblxyXG4vKipcclxuICogUmV0dXJucyBmaXJzdCBhbmQgbGFzdCBmb2N1c2FibGUgZWxlbWVudHMgaW5zaWRlIG9mIGEgZ2l2ZW4gZWxlbWVudCBiYXNlZCBvbiBzcGVjaWZpYyBDU1Mgc2VsZWN0b3JcclxuICovXHJcbmZ1bmN0aW9uIGdldEZvY3VzYWJsZUJvdW5kYXJ5RWxlbWVudHMoZWxlbWVudDogSFRNTEVsZW1lbnQpOiBIVE1MRWxlbWVudFtdIHtcclxuICBjb25zdCBsaXN0OiBOb2RlTGlzdE9mPEhUTUxFbGVtZW50PiA9IGVsZW1lbnQucXVlcnlTZWxlY3RvckFsbChGT0NVU0FCTEVfRUxFTUVOVFNfU0VMRUNUT1IpO1xyXG4gIHJldHVybiBbbGlzdFswXSwgbGlzdFtsaXN0Lmxlbmd0aCAtIDFdXTtcclxufVxyXG5cclxuLyoqXHJcbiAqIEZ1bmN0aW9uIHRoYXQgZW5mb3JjZXMgYnJvd3NlciBmb2N1cyB0byBiZSB0cmFwcGVkIGluc2lkZSBhIERPTSBlbGVtZW50LlxyXG4gKlxyXG4gKiBXb3JrcyBvbmx5IGZvciBjbGlja3MgaW5zaWRlIHRoZSBlbGVtZW50IGFuZCBuYXZpZ2F0aW9uIHdpdGggJ1RhYicsIGlnbm9yaW5nIGNsaWNrcyBvdXRzaWRlIG9mIHRoZSBlbGVtZW50XHJcbiAqXHJcbiAqIEBwYXJhbSBlbGVtZW50IFRoZSBlbGVtZW50IGFyb3VuZCB3aGljaCBmb2N1cyB3aWxsIGJlIHRyYXBwZWQgaW5zaWRlXHJcbiAqIEBwYXJhbSBzdG9wRm9jdXNUcmFwJCBUaGUgb2JzZXJ2YWJsZSBzdHJlYW0uIFdoZW4gY29tcGxldGVkIHRoZSBmb2N1cyB0cmFwIHdpbGwgY2xlYW4gdXAgbGlzdGVuZXJzXHJcbiAqIGFuZCBmcmVlIGludGVybmFsIHJlc291cmNlc1xyXG4gKi9cclxuZXhwb3J0IGNvbnN0IG5nYkZvY3VzVHJhcCA9IChlbGVtZW50OiBIVE1MRWxlbWVudCwgc3RvcEZvY3VzVHJhcCQ6IE9ic2VydmFibGU8YW55PikgPT4ge1xyXG4gIC8vIGxhc3QgZm9jdXNlZCBlbGVtZW50XHJcbiAgY29uc3QgbGFzdEZvY3VzZWRFbGVtZW50JCA9XHJcbiAgICAgIGZyb21FdmVudDxGb2N1c0V2ZW50PihlbGVtZW50LCAnZm9jdXNpbicpLnBpcGUodGFrZVVudGlsKHN0b3BGb2N1c1RyYXAkKSwgbWFwKGUgPT4gZS50YXJnZXQpKTtcclxuXHJcbiAgLy8gJ3RhYicgLyAnc2hpZnQrdGFiJyBzdHJlYW1cclxuICBmcm9tRXZlbnQ8S2V5Ym9hcmRFdmVudD4oZWxlbWVudCwgJ2tleWRvd24nKVxyXG4gICAgICAucGlwZSh0YWtlVW50aWwoc3RvcEZvY3VzVHJhcCQpLCBmaWx0ZXIoZSA9PiBlLndoaWNoID09PSBLZXkuVGFiKSwgd2l0aExhdGVzdEZyb20obGFzdEZvY3VzZWRFbGVtZW50JCkpXHJcbiAgICAgIC5zdWJzY3JpYmUoKFt0YWJFdmVudCwgZm9jdXNlZEVsZW1lbnRdKSA9PiB7XHJcbiAgICAgICAgY29uc3RbZmlyc3QsIGxhc3RdID0gZ2V0Rm9jdXNhYmxlQm91bmRhcnlFbGVtZW50cyhlbGVtZW50KTtcclxuXHJcbiAgICAgICAgaWYgKGZvY3VzZWRFbGVtZW50ID09PSBmaXJzdCAmJiB0YWJFdmVudC5zaGlmdEtleSkge1xyXG4gICAgICAgICAgbGFzdC5mb2N1cygpO1xyXG4gICAgICAgICAgdGFiRXZlbnQucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmIChmb2N1c2VkRWxlbWVudCA9PT0gbGFzdCAmJiAhdGFiRXZlbnQuc2hpZnRLZXkpIHtcclxuICAgICAgICAgIGZpcnN0LmZvY3VzKCk7XHJcbiAgICAgICAgICB0YWJFdmVudC5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAgIH1cclxuICAgICAgfSk7XHJcblxyXG4gIC8vIGluc2lkZSBjbGlja1xyXG4gIGZyb21FdmVudChlbGVtZW50LCAnY2xpY2snKVxyXG4gICAgICAucGlwZSh0YWtlVW50aWwoc3RvcEZvY3VzVHJhcCQpLCB3aXRoTGF0ZXN0RnJvbShsYXN0Rm9jdXNlZEVsZW1lbnQkKSwgbWFwKGFyciA9PiBhcnJbMV0gYXMgSFRNTEVsZW1lbnQpKVxyXG4gICAgICAuc3Vic2NyaWJlKGxhc3RGb2N1c2VkRWxlbWVudCA9PiBsYXN0Rm9jdXNlZEVsZW1lbnQuZm9jdXMoKSk7XHJcbn07XHJcbiIsImltcG9ydCB7XHJcbiAgRGlyZWN0aXZlLFxyXG4gIElucHV0LFxyXG4gIENvbXBvbmVudFJlZixcclxuICBFbGVtZW50UmVmLFxyXG4gIFZpZXdDb250YWluZXJSZWYsXHJcbiAgUmVuZGVyZXIyLFxyXG4gIENvbXBvbmVudEZhY3RvcnlSZXNvbHZlcixcclxuICBOZ1pvbmUsXHJcbiAgVGVtcGxhdGVSZWYsXHJcbiAgZm9yd2FyZFJlZixcclxuICBFdmVudEVtaXR0ZXIsXHJcbiAgT3V0cHV0LFxyXG4gIE9uQ2hhbmdlcyxcclxuICBPbkRlc3Ryb3ksXHJcbiAgU2ltcGxlQ2hhbmdlcyxcclxuICBJbmplY3RcclxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHtBYnN0cmFjdENvbnRyb2wsIENvbnRyb2xWYWx1ZUFjY2Vzc29yLCBWYWxpZGF0b3IsIE5HX1ZBTFVFX0FDQ0VTU09SLCBOR19WQUxJREFUT1JTfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XHJcbmltcG9ydCB7RE9DVU1FTlR9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XHJcblxyXG5pbXBvcnQge05nYkRhdGV9IGZyb20gJy4vbmdiLWRhdGUnO1xyXG5pbXBvcnQge05nYkRhdGVwaWNrZXIsIE5nYkRhdGVwaWNrZXJOYXZpZ2F0ZUV2ZW50fSBmcm9tICcuL2RhdGVwaWNrZXInO1xyXG5pbXBvcnQge0RheVRlbXBsYXRlQ29udGV4dH0gZnJvbSAnLi9kYXRlcGlja2VyLWRheS10ZW1wbGF0ZS1jb250ZXh0JztcclxuaW1wb3J0IHtOZ2JEYXRlUGFyc2VyRm9ybWF0dGVyfSBmcm9tICcuL25nYi1kYXRlLXBhcnNlci1mb3JtYXR0ZXInO1xyXG5cclxuaW1wb3J0IHtwb3NpdGlvbkVsZW1lbnRzLCBQbGFjZW1lbnRBcnJheX0gZnJvbSAnLi4vdXRpbC9wb3NpdGlvbmluZyc7XHJcbmltcG9ydCB7bmdiRm9jdXNUcmFwfSBmcm9tICcuLi91dGlsL2ZvY3VzLXRyYXAnO1xyXG5pbXBvcnQge0tleX0gZnJvbSAnLi4vdXRpbC9rZXknO1xyXG5pbXBvcnQge05nYkRhdGVTdHJ1Y3R9IGZyb20gJy4vbmdiLWRhdGUtc3RydWN0JztcclxuaW1wb3J0IHtOZ2JEYXRlQWRhcHRlcn0gZnJvbSAnLi9hZGFwdGVycy9uZ2ItZGF0ZS1hZGFwdGVyJztcclxuaW1wb3J0IHtOZ2JDYWxlbmRhcn0gZnJvbSAnLi9uZ2ItY2FsZW5kYXInO1xyXG5pbXBvcnQge05nYkRhdGVwaWNrZXJTZXJ2aWNlfSBmcm9tICcuL2RhdGVwaWNrZXItc2VydmljZSc7XHJcblxyXG5pbXBvcnQge1N1YmplY3QsIGZyb21FdmVudCwgcmFjZSwgTkVWRVJ9IGZyb20gJ3J4anMnO1xyXG5pbXBvcnQge2ZpbHRlciwgdGFrZVVudGlsfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XHJcblxyXG5jb25zdCBOR0JfREFURVBJQ0tFUl9WQUxVRV9BQ0NFU1NPUiA9IHtcclxuICBwcm92aWRlOiBOR19WQUxVRV9BQ0NFU1NPUixcclxuICB1c2VFeGlzdGluZzogZm9yd2FyZFJlZigoKSA9PiBOZ2JJbnB1dERhdGVwaWNrZXIpLFxyXG4gIG11bHRpOiB0cnVlXHJcbn07XHJcblxyXG5jb25zdCBOR0JfREFURVBJQ0tFUl9WQUxJREFUT1IgPSB7XHJcbiAgcHJvdmlkZTogTkdfVkFMSURBVE9SUyxcclxuICB1c2VFeGlzdGluZzogZm9yd2FyZFJlZigoKSA9PiBOZ2JJbnB1dERhdGVwaWNrZXIpLFxyXG4gIG11bHRpOiB0cnVlXHJcbn07XHJcblxyXG4vKipcclxuICogQSBkaXJlY3RpdmUgdGhhdCBtYWtlcyBpdCBwb3NzaWJsZSB0byBoYXZlIGRhdGVwaWNrZXJzIG9uIGlucHV0IGZpZWxkcy5cclxuICogTWFuYWdlcyBpbnRlZ3JhdGlvbiB3aXRoIHRoZSBpbnB1dCBmaWVsZCBpdHNlbGYgKGRhdGEgZW50cnkpIGFuZCBuZ01vZGVsICh2YWxpZGF0aW9uIGV0Yy4pLlxyXG4gKi9cclxuQERpcmVjdGl2ZSh7XHJcbiAgc2VsZWN0b3I6ICdpbnB1dFtuZ2JEYXRlcGlja2VyXScsXHJcbiAgZXhwb3J0QXM6ICduZ2JEYXRlcGlja2VyJyxcclxuICBob3N0OiB7XHJcbiAgICAnKGlucHV0KSc6ICdtYW51YWxEYXRlQ2hhbmdlKCRldmVudC50YXJnZXQudmFsdWUpJyxcclxuICAgICcoY2hhbmdlKSc6ICdtYW51YWxEYXRlQ2hhbmdlKCRldmVudC50YXJnZXQudmFsdWUsIHRydWUpJyxcclxuICAgICcoYmx1ciknOiAnb25CbHVyKCknLFxyXG4gICAgJ1tkaXNhYmxlZF0nOiAnZGlzYWJsZWQnXHJcbiAgfSxcclxuICBwcm92aWRlcnM6IFtOR0JfREFURVBJQ0tFUl9WQUxVRV9BQ0NFU1NPUiwgTkdCX0RBVEVQSUNLRVJfVkFMSURBVE9SLCBOZ2JEYXRlcGlja2VyU2VydmljZV1cclxufSlcclxuZXhwb3J0IGNsYXNzIE5nYklucHV0RGF0ZXBpY2tlciBpbXBsZW1lbnRzIE9uQ2hhbmdlcyxcclxuICAgIE9uRGVzdHJveSwgQ29udHJvbFZhbHVlQWNjZXNzb3IsIFZhbGlkYXRvciB7XHJcbiAgcHJpdmF0ZSBfY2xvc2VkJCA9IG5ldyBTdWJqZWN0KCk7XHJcbiAgcHJpdmF0ZSBfY1JlZjogQ29tcG9uZW50UmVmPE5nYkRhdGVwaWNrZXI+ID0gbnVsbDtcclxuICBwcml2YXRlIF9kaXNhYmxlZCA9IGZhbHNlO1xyXG4gIHByaXZhdGUgX21vZGVsOiBOZ2JEYXRlO1xyXG4gIHByaXZhdGUgX3pvbmVTdWJzY3JpcHRpb246IGFueTtcclxuXHJcbiAgLyoqXHJcbiAgICogSW5kaWNhdGVzIHdoZXRoZXIgdGhlIGRhdGVwaWNrZXIgcG9wdXAgc2hvdWxkIGJlIGNsb3NlZCBhdXRvbWF0aWNhbGx5IGFmdGVyIGRhdGUgc2VsZWN0aW9uIC8gb3V0c2lkZSBjbGljayBvciBub3QuXHJcbiAgICpcclxuICAgKiBCeSBkZWZhdWx0IHRoZSBwb3B1cCB3aWxsIGNsb3NlIG9uIGJvdGggZGF0ZSBzZWxlY3Rpb24gYW5kIG91dHNpZGUgY2xpY2suIElmIHRoZSB2YWx1ZSBpcyAnZmFsc2UnIHRoZSBwb3B1cCBoYXMgdG9cclxuICAgKiBiZSBjbG9zZWQgbWFudWFsbHkgdmlhICcuY2xvc2UoKScgb3IgJy50b2dnbGUoKScgbWV0aG9kcy4gSWYgdGhlIHZhbHVlIGlzIHNldCB0byAnaW5zaWRlJyB0aGUgcG9wdXAgd2lsbCBjbG9zZSBvblxyXG4gICAqIGRhdGUgc2VsZWN0aW9uIG9ubHkuIEZvciB0aGUgJ291dHNpZGUnIHRoZSBwb3B1cCB3aWxsIGNsb3NlIG9ubHkgb24gdGhlIG91dHNpZGUgY2xpY2suXHJcbiAgICpcclxuICAgKiBAc2luY2UgMy4wLjBcclxuICAgKi9cclxuICBASW5wdXQoKSBhdXRvQ2xvc2U6IGJvb2xlYW4gfCAnaW5zaWRlJyB8ICdvdXRzaWRlJyA9IHRydWU7XHJcblxyXG4gIC8qKlxyXG4gICAqIFJlZmVyZW5jZSBmb3IgdGhlIGN1c3RvbSB0ZW1wbGF0ZSBmb3IgdGhlIGRheSBkaXNwbGF5XHJcbiAgICovXHJcbiAgQElucHV0KCkgZGF5VGVtcGxhdGU6IFRlbXBsYXRlUmVmPERheVRlbXBsYXRlQ29udGV4dD47XHJcblxyXG4gIC8qKlxyXG4gICAqIE51bWJlciBvZiBtb250aHMgdG8gZGlzcGxheVxyXG4gICAqL1xyXG4gIEBJbnB1dCgpIGRpc3BsYXlNb250aHM6IG51bWJlcjtcclxuXHJcbiAgLyoqXHJcbiAgICogRmlyc3QgZGF5IG9mIHRoZSB3ZWVrLiBXaXRoIGRlZmF1bHQgY2FsZW5kYXIgd2UgdXNlIElTTyA4NjAxOiAxPU1vbiAuLi4gNz1TdW5cclxuICAgKi9cclxuICBASW5wdXQoKSBmaXJzdERheU9mV2VlazogbnVtYmVyO1xyXG5cclxuICAvKipcclxuICAgKiBDYWxsYmFjayB0byBtYXJrIGEgZ2l2ZW4gZGF0ZSBhcyBkaXNhYmxlZC5cclxuICAgKiAnQ3VycmVudCcgY29udGFpbnMgdGhlIG1vbnRoIHRoYXQgd2lsbCBiZSBkaXNwbGF5ZWQgaW4gdGhlIHZpZXdcclxuICAgKi9cclxuICBASW5wdXQoKSBtYXJrRGlzYWJsZWQ6IChkYXRlOiBOZ2JEYXRlLCBjdXJyZW50OiB7eWVhcjogbnVtYmVyLCBtb250aDogbnVtYmVyfSkgPT4gYm9vbGVhbjtcclxuXHJcbiAgLyoqXHJcbiAgICogTWluIGRhdGUgZm9yIHRoZSBuYXZpZ2F0aW9uLiBJZiBub3QgcHJvdmlkZWQgd2lsbCBiZSAxMCB5ZWFycyBiZWZvcmUgdG9kYXkgb3IgYHN0YXJ0RGF0ZWBcclxuICAgKi9cclxuICBASW5wdXQoKSBtaW5EYXRlOiBOZ2JEYXRlU3RydWN0O1xyXG5cclxuICAvKipcclxuICAgKiBNYXggZGF0ZSBmb3IgdGhlIG5hdmlnYXRpb24uIElmIG5vdCBwcm92aWRlZCB3aWxsIGJlIDEwIHllYXJzIGZyb20gdG9kYXkgb3IgYHN0YXJ0RGF0ZWBcclxuICAgKi9cclxuICBASW5wdXQoKSBtYXhEYXRlOiBOZ2JEYXRlU3RydWN0O1xyXG5cclxuICAvKipcclxuICAgKiBOYXZpZ2F0aW9uIHR5cGU6IGBzZWxlY3RgIChkZWZhdWx0IHdpdGggc2VsZWN0IGJveGVzIGZvciBtb250aCBhbmQgeWVhciksIGBhcnJvd3NgXHJcbiAgICogKHdpdGhvdXQgc2VsZWN0IGJveGVzLCBvbmx5IG5hdmlnYXRpb24gYXJyb3dzKSBvciBgbm9uZWAgKG5vIG5hdmlnYXRpb24gYXQgYWxsKVxyXG4gICAqL1xyXG4gIEBJbnB1dCgpIG5hdmlnYXRpb246ICdzZWxlY3QnIHwgJ2Fycm93cycgfCAnbm9uZSc7XHJcblxyXG4gIC8qKlxyXG4gICAqIFRoZSB3YXkgdG8gZGlzcGxheSBkYXlzIHRoYXQgZG9uJ3QgYmVsb25nIHRvIGN1cnJlbnQgbW9udGg6IGB2aXNpYmxlYCAoZGVmYXVsdCksXHJcbiAgICogYGhpZGRlbmAgKG5vdCBkaXNwbGF5ZWQpIG9yIGBjb2xsYXBzZWRgIChub3QgZGlzcGxheWVkIHdpdGggZW1wdHkgc3BhY2UgY29sbGFwc2VkKVxyXG4gICAqL1xyXG4gIEBJbnB1dCgpIG91dHNpZGVEYXlzOiAndmlzaWJsZScgfCAnY29sbGFwc2VkJyB8ICdoaWRkZW4nO1xyXG5cclxuICAvKipcclxuICAgKiBQbGFjZW1lbnQgb2YgYSBkYXRlcGlja2VyIHBvcHVwIGFjY2VwdHM6XHJcbiAgICogICAgXCJ0b3BcIiwgXCJ0b3AtbGVmdFwiLCBcInRvcC1yaWdodFwiLCBcImJvdHRvbVwiLCBcImJvdHRvbS1sZWZ0XCIsIFwiYm90dG9tLXJpZ2h0XCIsXHJcbiAgICogICAgXCJsZWZ0XCIsIFwibGVmdC10b3BcIiwgXCJsZWZ0LWJvdHRvbVwiLCBcInJpZ2h0XCIsIFwicmlnaHQtdG9wXCIsIFwicmlnaHQtYm90dG9tXCJcclxuICAgKiBhbmQgYXJyYXkgb2YgYWJvdmUgdmFsdWVzLlxyXG4gICAqL1xyXG4gIEBJbnB1dCgpIHBsYWNlbWVudDogUGxhY2VtZW50QXJyYXkgPSAnYm90dG9tLWxlZnQnO1xyXG5cclxuICAvKipcclxuICAgKiBXaGV0aGVyIHRvIGRpc3BsYXkgZGF5cyBvZiB0aGUgd2Vla1xyXG4gICAqL1xyXG4gIEBJbnB1dCgpIHNob3dXZWVrZGF5czogYm9vbGVhbjtcclxuXHJcbiAgLyoqXHJcbiAgICogV2hldGhlciB0byBkaXNwbGF5IHdlZWsgbnVtYmVyc1xyXG4gICAqL1xyXG4gIEBJbnB1dCgpIHNob3dXZWVrTnVtYmVyczogYm9vbGVhbjtcclxuXHJcbiAgLyoqXHJcbiAgICogRGF0ZSB0byBvcGVuIGNhbGVuZGFyIHdpdGguXHJcbiAgICogV2l0aCBkZWZhdWx0IGNhbGVuZGFyIHdlIHVzZSBJU08gODYwMTogJ21vbnRoJyBpcyAxPUphbiAuLi4gMTI9RGVjLlxyXG4gICAqIElmIG5vdGhpbmcgb3IgaW52YWxpZCBkYXRlIHByb3ZpZGVkLCBjYWxlbmRhciB3aWxsIG9wZW4gd2l0aCBjdXJyZW50IG1vbnRoLlxyXG4gICAqIFVzZSAnbmF2aWdhdGVUbyhkYXRlKScgYXMgYW4gYWx0ZXJuYXRpdmVcclxuICAgKi9cclxuICBASW5wdXQoKSBzdGFydERhdGU6IHt5ZWFyOiBudW1iZXIsIG1vbnRoOiBudW1iZXJ9O1xyXG5cclxuICAvKipcclxuICAgKiBBIHNlbGVjdG9yIHNwZWNpZnlpbmcgdGhlIGVsZW1lbnQgdGhlIGRhdGVwaWNrZXIgcG9wdXAgc2hvdWxkIGJlIGFwcGVuZGVkIHRvLlxyXG4gICAqIEN1cnJlbnRseSBvbmx5IHN1cHBvcnRzIFwiYm9keVwiLlxyXG4gICAqL1xyXG4gIEBJbnB1dCgpIGNvbnRhaW5lcjogc3RyaW5nO1xyXG5cclxuICAvKipcclxuICAgKiBBbiBldmVudCBmaXJlZCB3aGVuIHVzZXIgc2VsZWN0cyBhIGRhdGUgdXNpbmcga2V5Ym9hcmQgb3IgbW91c2UuXHJcbiAgICogVGhlIHBheWxvYWQgb2YgdGhlIGV2ZW50IGlzIGN1cnJlbnRseSBzZWxlY3RlZCBOZ2JEYXRlLlxyXG4gICAqXHJcbiAgICogQHNpbmNlIDEuMS4xXHJcbiAgICovXHJcbiAgQE91dHB1dCgpIGRhdGVTZWxlY3QgPSBuZXcgRXZlbnRFbWl0dGVyPE5nYkRhdGU+KCk7XHJcblxyXG4gIC8qKlxyXG4gICAqIEFuIGV2ZW50IGZpcmVkIHdoZW4gbmF2aWdhdGlvbiBoYXBwZW5zIGFuZCBjdXJyZW50bHkgZGlzcGxheWVkIG1vbnRoIGNoYW5nZXMuXHJcbiAgICogU2VlIE5nYkRhdGVwaWNrZXJOYXZpZ2F0ZUV2ZW50IGZvciB0aGUgcGF5bG9hZCBpbmZvLlxyXG4gICAqL1xyXG4gIEBPdXRwdXQoKSBuYXZpZ2F0ZSA9IG5ldyBFdmVudEVtaXR0ZXI8TmdiRGF0ZXBpY2tlck5hdmlnYXRlRXZlbnQ+KCk7XHJcblxyXG4gIEBJbnB1dCgpXHJcbiAgZ2V0IGRpc2FibGVkKCkge1xyXG4gICAgcmV0dXJuIHRoaXMuX2Rpc2FibGVkO1xyXG4gIH1cclxuICBzZXQgZGlzYWJsZWQodmFsdWU6IGFueSkge1xyXG4gICAgdGhpcy5fZGlzYWJsZWQgPSB2YWx1ZSA9PT0gJycgfHwgKHZhbHVlICYmIHZhbHVlICE9PSAnZmFsc2UnKTtcclxuXHJcbiAgICBpZiAodGhpcy5pc09wZW4oKSkge1xyXG4gICAgICB0aGlzLl9jUmVmLmluc3RhbmNlLnNldERpc2FibGVkU3RhdGUodGhpcy5fZGlzYWJsZWQpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBfb25DaGFuZ2UgPSAoXzogYW55KSA9PiB7fTtcclxuICBwcml2YXRlIF9vblRvdWNoZWQgPSAoKSA9PiB7fTtcclxuICBwcml2YXRlIF92YWxpZGF0b3JDaGFuZ2UgPSAoKSA9PiB7fTtcclxuXHJcblxyXG4gIGNvbnN0cnVjdG9yKFxyXG4gICAgICBwcml2YXRlIF9wYXJzZXJGb3JtYXR0ZXI6IE5nYkRhdGVQYXJzZXJGb3JtYXR0ZXIsIHByaXZhdGUgX2VsUmVmOiBFbGVtZW50UmVmPEhUTUxJbnB1dEVsZW1lbnQ+LFxyXG4gICAgICBwcml2YXRlIF92Y1JlZjogVmlld0NvbnRhaW5lclJlZiwgcHJpdmF0ZSBfcmVuZGVyZXI6IFJlbmRlcmVyMiwgcHJpdmF0ZSBfY2ZyOiBDb21wb25lbnRGYWN0b3J5UmVzb2x2ZXIsXHJcbiAgICAgIHByaXZhdGUgX25nWm9uZTogTmdab25lLCBwcml2YXRlIF9zZXJ2aWNlOiBOZ2JEYXRlcGlja2VyU2VydmljZSwgcHJpdmF0ZSBfY2FsZW5kYXI6IE5nYkNhbGVuZGFyLFxyXG4gICAgICBwcml2YXRlIF9kYXRlQWRhcHRlcjogTmdiRGF0ZUFkYXB0ZXI8YW55PiwgQEluamVjdChET0NVTUVOVCkgcHJpdmF0ZSBfZG9jdW1lbnQ6IGFueSkge1xyXG4gICAgdGhpcy5fem9uZVN1YnNjcmlwdGlvbiA9IF9uZ1pvbmUub25TdGFibGUuc3Vic2NyaWJlKCgpID0+IHtcclxuICAgICAgaWYgKHRoaXMuX2NSZWYpIHtcclxuICAgICAgICBwb3NpdGlvbkVsZW1lbnRzKFxyXG4gICAgICAgICAgICB0aGlzLl9lbFJlZi5uYXRpdmVFbGVtZW50LCB0aGlzLl9jUmVmLmxvY2F0aW9uLm5hdGl2ZUVsZW1lbnQsIHRoaXMucGxhY2VtZW50LCB0aGlzLmNvbnRhaW5lciA9PT0gJ2JvZHknKTtcclxuICAgICAgfVxyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICByZWdpc3Rlck9uQ2hhbmdlKGZuOiAodmFsdWU6IGFueSkgPT4gYW55KTogdm9pZCB7IHRoaXMuX29uQ2hhbmdlID0gZm47IH1cclxuXHJcbiAgcmVnaXN0ZXJPblRvdWNoZWQoZm46ICgpID0+IGFueSk6IHZvaWQgeyB0aGlzLl9vblRvdWNoZWQgPSBmbjsgfVxyXG5cclxuICByZWdpc3Rlck9uVmFsaWRhdG9yQ2hhbmdlKGZuOiAoKSA9PiB2b2lkKTogdm9pZCB7IHRoaXMuX3ZhbGlkYXRvckNoYW5nZSA9IGZuOyB9XHJcblxyXG4gIHNldERpc2FibGVkU3RhdGUoaXNEaXNhYmxlZDogYm9vbGVhbik6IHZvaWQgeyB0aGlzLmRpc2FibGVkID0gaXNEaXNhYmxlZDsgfVxyXG5cclxuICB2YWxpZGF0ZShjOiBBYnN0cmFjdENvbnRyb2wpOiB7W2tleTogc3RyaW5nXTogYW55fSB7XHJcbiAgICBjb25zdCB2YWx1ZSA9IGMudmFsdWU7XHJcblxyXG4gICAgaWYgKHZhbHVlID09PSBudWxsIHx8IHZhbHVlID09PSB1bmRlZmluZWQpIHtcclxuICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICB9XHJcblxyXG4gICAgY29uc3QgbmdiRGF0ZSA9IHRoaXMuX2Zyb21EYXRlU3RydWN0KHRoaXMuX2RhdGVBZGFwdGVyLmZyb21Nb2RlbCh2YWx1ZSkpO1xyXG5cclxuICAgIGlmICghdGhpcy5fY2FsZW5kYXIuaXNWYWxpZChuZ2JEYXRlKSkge1xyXG4gICAgICByZXR1cm4geyduZ2JEYXRlJzoge2ludmFsaWQ6IGMudmFsdWV9fTtcclxuICAgIH1cclxuXHJcbiAgICBpZiAodGhpcy5taW5EYXRlICYmIG5nYkRhdGUuYmVmb3JlKE5nYkRhdGUuZnJvbSh0aGlzLm1pbkRhdGUpKSkge1xyXG4gICAgICByZXR1cm4geyduZ2JEYXRlJzoge3JlcXVpcmVkQmVmb3JlOiB0aGlzLm1pbkRhdGV9fTtcclxuICAgIH1cclxuXHJcbiAgICBpZiAodGhpcy5tYXhEYXRlICYmIG5nYkRhdGUuYWZ0ZXIoTmdiRGF0ZS5mcm9tKHRoaXMubWF4RGF0ZSkpKSB7XHJcbiAgICAgIHJldHVybiB7J25nYkRhdGUnOiB7cmVxdWlyZWRBZnRlcjogdGhpcy5tYXhEYXRlfX07XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICB3cml0ZVZhbHVlKHZhbHVlKSB7XHJcbiAgICB0aGlzLl9tb2RlbCA9IHRoaXMuX2Zyb21EYXRlU3RydWN0KHRoaXMuX2RhdGVBZGFwdGVyLmZyb21Nb2RlbCh2YWx1ZSkpO1xyXG4gICAgdGhpcy5fd3JpdGVNb2RlbFZhbHVlKHRoaXMuX21vZGVsKTtcclxuICB9XHJcblxyXG4gIG1hbnVhbERhdGVDaGFuZ2UodmFsdWU6IHN0cmluZywgdXBkYXRlVmlldyA9IGZhbHNlKSB7XHJcbiAgICB0aGlzLl9tb2RlbCA9IHRoaXMuX2Zyb21EYXRlU3RydWN0KHRoaXMuX3BhcnNlckZvcm1hdHRlci5wYXJzZSh2YWx1ZSkpO1xyXG4gICAgdGhpcy5fb25DaGFuZ2UodGhpcy5fbW9kZWwgPyB0aGlzLl9kYXRlQWRhcHRlci50b01vZGVsKHRoaXMuX21vZGVsKSA6ICh2YWx1ZSA9PT0gJycgPyBudWxsIDogdmFsdWUpKTtcclxuICAgIGlmICh1cGRhdGVWaWV3ICYmIHRoaXMuX21vZGVsKSB7XHJcbiAgICAgIHRoaXMuX3dyaXRlTW9kZWxWYWx1ZSh0aGlzLl9tb2RlbCk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBpc09wZW4oKSB7IHJldHVybiAhIXRoaXMuX2NSZWY7IH1cclxuXHJcbiAgLyoqXHJcbiAgICogT3BlbnMgdGhlIGRhdGVwaWNrZXIgd2l0aCB0aGUgc2VsZWN0ZWQgZGF0ZSBpbmRpY2F0ZWQgYnkgdGhlIG5nTW9kZWwgdmFsdWUuXHJcbiAgICovXHJcbiAgb3BlbigpIHtcclxuICAgIGlmICghdGhpcy5pc09wZW4oKSkge1xyXG4gICAgICBjb25zdCBjZiA9IHRoaXMuX2Nmci5yZXNvbHZlQ29tcG9uZW50RmFjdG9yeShOZ2JEYXRlcGlja2VyKTtcclxuICAgICAgdGhpcy5fY1JlZiA9IHRoaXMuX3ZjUmVmLmNyZWF0ZUNvbXBvbmVudChjZik7XHJcblxyXG4gICAgICB0aGlzLl9hcHBseVBvcHVwU3R5bGluZyh0aGlzLl9jUmVmLmxvY2F0aW9uLm5hdGl2ZUVsZW1lbnQpO1xyXG4gICAgICB0aGlzLl9hcHBseURhdGVwaWNrZXJJbnB1dHModGhpcy5fY1JlZi5pbnN0YW5jZSk7XHJcbiAgICAgIHRoaXMuX3N1YnNjcmliZUZvckRhdGVwaWNrZXJPdXRwdXRzKHRoaXMuX2NSZWYuaW5zdGFuY2UpO1xyXG4gICAgICB0aGlzLl9jUmVmLmluc3RhbmNlLm5nT25Jbml0KCk7XHJcbiAgICAgIHRoaXMuX2NSZWYuaW5zdGFuY2Uud3JpdGVWYWx1ZSh0aGlzLl9kYXRlQWRhcHRlci50b01vZGVsKHRoaXMuX21vZGVsKSk7XHJcblxyXG4gICAgICAvLyBkYXRlIHNlbGVjdGlvbiBldmVudCBoYW5kbGluZ1xyXG4gICAgICB0aGlzLl9jUmVmLmluc3RhbmNlLnJlZ2lzdGVyT25DaGFuZ2UoKHNlbGVjdGVkRGF0ZSkgPT4ge1xyXG4gICAgICAgIHRoaXMud3JpdGVWYWx1ZShzZWxlY3RlZERhdGUpO1xyXG4gICAgICAgIHRoaXMuX29uQ2hhbmdlKHNlbGVjdGVkRGF0ZSk7XHJcbiAgICAgIH0pO1xyXG5cclxuICAgICAgdGhpcy5fY1JlZi5jaGFuZ2VEZXRlY3RvclJlZi5kZXRlY3RDaGFuZ2VzKCk7XHJcblxyXG4gICAgICB0aGlzLl9jUmVmLmluc3RhbmNlLnNldERpc2FibGVkU3RhdGUodGhpcy5kaXNhYmxlZCk7XHJcblxyXG4gICAgICBpZiAodGhpcy5jb250YWluZXIgPT09ICdib2R5Jykge1xyXG4gICAgICAgIHdpbmRvdy5kb2N1bWVudC5xdWVyeVNlbGVjdG9yKHRoaXMuY29udGFpbmVyKS5hcHBlbmRDaGlsZCh0aGlzLl9jUmVmLmxvY2F0aW9uLm5hdGl2ZUVsZW1lbnQpO1xyXG4gICAgICB9XHJcblxyXG4gICAgICAvLyBmb2N1cyBoYW5kbGluZ1xyXG4gICAgICBuZ2JGb2N1c1RyYXAodGhpcy5fY1JlZi5sb2NhdGlvbi5uYXRpdmVFbGVtZW50LCB0aGlzLl9jbG9zZWQkKTtcclxuXHJcbiAgICAgIHRoaXMuX2NSZWYuaW5zdGFuY2UuZm9jdXMoKTtcclxuXHJcbiAgICAgIC8vIGNsb3Npbmcgb24gRVNDIGFuZCBvdXRzaWRlIGNsaWNrc1xyXG4gICAgICB0aGlzLl9uZ1pvbmUucnVuT3V0c2lkZUFuZ3VsYXIoKCkgPT4ge1xyXG5cclxuICAgICAgICBjb25zdCBlc2NhcGVzJCA9IGZyb21FdmVudDxLZXlib2FyZEV2ZW50Pih0aGlzLl9kb2N1bWVudCwgJ2tleXVwJylcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAucGlwZSh0YWtlVW50aWwodGhpcy5fY2xvc2VkJCksIGZpbHRlcihlID0+IGUud2hpY2ggPT09IEtleS5Fc2NhcGUpKTtcclxuXHJcbiAgICAgICAgbGV0IG91dHNpZGVDbGlja3MkO1xyXG4gICAgICAgIGlmICh0aGlzLmF1dG9DbG9zZSA9PT0gdHJ1ZSB8fCB0aGlzLmF1dG9DbG9zZSA9PT0gJ291dHNpZGUnKSB7XHJcbiAgICAgICAgICAvLyB3ZSBkb24ndCBrbm93IGhvdyB0aGUgcG9wdXAgd2FzIG9wZW5lZCwgc28gaWYgaXQgd2FzIG9wZW5lZCB3aXRoIGEgY2xpY2ssXHJcbiAgICAgICAgICAvLyB3ZSBoYXZlIHRvIHNraXAgdGhlIGZpcnN0IG9uZSB0byBhdm9pZCBjbG9zaW5nIGl0IGltbWVkaWF0ZWx5XHJcbiAgICAgICAgICBsZXQgaXNPcGVuaW5nID0gdHJ1ZTtcclxuICAgICAgICAgIHJlcXVlc3RBbmltYXRpb25GcmFtZSgoKSA9PiBpc09wZW5pbmcgPSBmYWxzZSk7XHJcblxyXG4gICAgICAgICAgb3V0c2lkZUNsaWNrcyQgPVxyXG4gICAgICAgICAgICAgIGZyb21FdmVudDxNb3VzZUV2ZW50Pih0aGlzLl9kb2N1bWVudCwgJ2NsaWNrJylcclxuICAgICAgICAgICAgICAgICAgLnBpcGUoXHJcbiAgICAgICAgICAgICAgICAgICAgICB0YWtlVW50aWwodGhpcy5fY2xvc2VkJCksIGZpbHRlcihldmVudCA9PiAhaXNPcGVuaW5nICYmIHRoaXMuX3Nob3VsZENsb3NlT25PdXRzaWRlQ2xpY2soZXZlbnQpKSk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIG91dHNpZGVDbGlja3MkID0gTkVWRVI7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByYWNlPEV2ZW50PihbZXNjYXBlcyQsIG91dHNpZGVDbGlja3MkXSkuc3Vic2NyaWJlKCgpID0+IHRoaXMuX25nWm9uZS5ydW4oKCkgPT4gdGhpcy5jbG9zZSgpKSk7XHJcbiAgICAgIH0pO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogQ2xvc2VzIHRoZSBkYXRlcGlja2VyIHBvcHVwLlxyXG4gICAqL1xyXG4gIGNsb3NlKCkge1xyXG4gICAgaWYgKHRoaXMuaXNPcGVuKCkpIHtcclxuICAgICAgdGhpcy5fdmNSZWYucmVtb3ZlKHRoaXMuX3ZjUmVmLmluZGV4T2YodGhpcy5fY1JlZi5ob3N0VmlldykpO1xyXG4gICAgICB0aGlzLl9jUmVmID0gbnVsbDtcclxuICAgICAgdGhpcy5fY2xvc2VkJC5uZXh0KCk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBUb2dnbGVzIHRoZSBkYXRlcGlja2VyIHBvcHVwIChvcGVucyB3aGVuIGNsb3NlZCBhbmQgY2xvc2VzIHdoZW4gb3BlbmVkKS5cclxuICAgKi9cclxuICB0b2dnbGUoKSB7XHJcbiAgICBpZiAodGhpcy5pc09wZW4oKSkge1xyXG4gICAgICB0aGlzLmNsb3NlKCk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB0aGlzLm9wZW4oKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIE5hdmlnYXRlcyBjdXJyZW50IHZpZXcgdG8gcHJvdmlkZWQgZGF0ZS5cclxuICAgKiBXaXRoIGRlZmF1bHQgY2FsZW5kYXIgd2UgdXNlIElTTyA4NjAxOiAnbW9udGgnIGlzIDE9SmFuIC4uLiAxMj1EZWMuXHJcbiAgICogSWYgbm90aGluZyBvciBpbnZhbGlkIGRhdGUgcHJvdmlkZWQgY2FsZW5kYXIgd2lsbCBvcGVuIGN1cnJlbnQgbW9udGguXHJcbiAgICogVXNlICdzdGFydERhdGUnIGlucHV0IGFzIGFuIGFsdGVybmF0aXZlXHJcbiAgICovXHJcbiAgbmF2aWdhdGVUbyhkYXRlPzoge3llYXI6IG51bWJlciwgbW9udGg6IG51bWJlcn0pIHtcclxuICAgIGlmICh0aGlzLmlzT3BlbigpKSB7XHJcbiAgICAgIHRoaXMuX2NSZWYuaW5zdGFuY2UubmF2aWdhdGVUbyhkYXRlKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIG9uQmx1cigpIHsgdGhpcy5fb25Ub3VjaGVkKCk7IH1cclxuXHJcbiAgbmdPbkNoYW5nZXMoY2hhbmdlczogU2ltcGxlQ2hhbmdlcykge1xyXG4gICAgaWYgKGNoYW5nZXNbJ21pbkRhdGUnXSB8fCBjaGFuZ2VzWydtYXhEYXRlJ10pIHtcclxuICAgICAgdGhpcy5fdmFsaWRhdG9yQ2hhbmdlKCk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBuZ09uRGVzdHJveSgpIHtcclxuICAgIHRoaXMuY2xvc2UoKTtcclxuICAgIHRoaXMuX3pvbmVTdWJzY3JpcHRpb24udW5zdWJzY3JpYmUoKTtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgX2FwcGx5RGF0ZXBpY2tlcklucHV0cyhkYXRlcGlja2VySW5zdGFuY2U6IE5nYkRhdGVwaWNrZXIpOiB2b2lkIHtcclxuICAgIFsnZGF5VGVtcGxhdGUnLCAnZGlzcGxheU1vbnRocycsICdmaXJzdERheU9mV2VlaycsICdtYXJrRGlzYWJsZWQnLCAnbWluRGF0ZScsICdtYXhEYXRlJywgJ25hdmlnYXRpb24nLFxyXG4gICAgICdvdXRzaWRlRGF5cycsICdzaG93TmF2aWdhdGlvbicsICdzaG93V2Vla2RheXMnLCAnc2hvd1dlZWtOdW1iZXJzJ11cclxuICAgICAgICAuZm9yRWFjaCgob3B0aW9uTmFtZTogc3RyaW5nKSA9PiB7XHJcbiAgICAgICAgICBpZiAodGhpc1tvcHRpb25OYW1lXSAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgIGRhdGVwaWNrZXJJbnN0YW5jZVtvcHRpb25OYW1lXSA9IHRoaXNbb3B0aW9uTmFtZV07XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICBkYXRlcGlja2VySW5zdGFuY2Uuc3RhcnREYXRlID0gdGhpcy5zdGFydERhdGUgfHwgdGhpcy5fbW9kZWw7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIF9hcHBseVBvcHVwU3R5bGluZyhuYXRpdmVFbGVtZW50OiBhbnkpIHtcclxuICAgIHRoaXMuX3JlbmRlcmVyLmFkZENsYXNzKG5hdGl2ZUVsZW1lbnQsICdkcm9wZG93bi1tZW51Jyk7XHJcbiAgICB0aGlzLl9yZW5kZXJlci5zZXRTdHlsZShuYXRpdmVFbGVtZW50LCAncGFkZGluZycsICcwJyk7XHJcbiAgICB0aGlzLl9yZW5kZXJlci5hZGRDbGFzcyhuYXRpdmVFbGVtZW50LCAnc2hvdycpO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBfc2hvdWxkQ2xvc2VPbk91dHNpZGVDbGljayhldmVudDogTW91c2VFdmVudCkge1xyXG4gICAgcmV0dXJuICFbdGhpcy5fZWxSZWYubmF0aXZlRWxlbWVudCwgdGhpcy5fY1JlZi5sb2NhdGlvbi5uYXRpdmVFbGVtZW50XS5zb21lKGVsID0+IGVsLmNvbnRhaW5zKGV2ZW50LnRhcmdldCkpO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBfc3Vic2NyaWJlRm9yRGF0ZXBpY2tlck91dHB1dHMoZGF0ZXBpY2tlckluc3RhbmNlOiBOZ2JEYXRlcGlja2VyKSB7XHJcbiAgICBkYXRlcGlja2VySW5zdGFuY2UubmF2aWdhdGUuc3Vic2NyaWJlKGRhdGUgPT4gdGhpcy5uYXZpZ2F0ZS5lbWl0KGRhdGUpKTtcclxuICAgIGRhdGVwaWNrZXJJbnN0YW5jZS5zZWxlY3Quc3Vic2NyaWJlKGRhdGUgPT4ge1xyXG4gICAgICB0aGlzLmRhdGVTZWxlY3QuZW1pdChkYXRlKTtcclxuICAgICAgaWYgKHRoaXMuYXV0b0Nsb3NlID09PSB0cnVlIHx8IHRoaXMuYXV0b0Nsb3NlID09PSAnaW5zaWRlJykge1xyXG4gICAgICAgIHRoaXMuY2xvc2UoKTtcclxuICAgICAgfVxyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIF93cml0ZU1vZGVsVmFsdWUobW9kZWw6IE5nYkRhdGUpIHtcclxuICAgIHRoaXMuX3JlbmRlcmVyLnNldFByb3BlcnR5KHRoaXMuX2VsUmVmLm5hdGl2ZUVsZW1lbnQsICd2YWx1ZScsIHRoaXMuX3BhcnNlckZvcm1hdHRlci5mb3JtYXQobW9kZWwpKTtcclxuICAgIGlmICh0aGlzLmlzT3BlbigpKSB7XHJcbiAgICAgIHRoaXMuX2NSZWYuaW5zdGFuY2Uud3JpdGVWYWx1ZSh0aGlzLl9kYXRlQWRhcHRlci50b01vZGVsKG1vZGVsKSk7XHJcbiAgICAgIHRoaXMuX29uVG91Y2hlZCgpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBfZnJvbURhdGVTdHJ1Y3QoZGF0ZTogTmdiRGF0ZVN0cnVjdCk6IE5nYkRhdGUge1xyXG4gICAgY29uc3QgbmdiRGF0ZSA9IGRhdGUgPyBuZXcgTmdiRGF0ZShkYXRlLnllYXIsIGRhdGUubW9udGgsIGRhdGUuZGF5KSA6IG51bGw7XHJcbiAgICByZXR1cm4gdGhpcy5fY2FsZW5kYXIuaXNWYWxpZChuZ2JEYXRlKSA/IG5nYkRhdGUgOiBudWxsO1xyXG4gIH1cclxufVxyXG4iLCJpbXBvcnQge0NoYW5nZURldGVjdGlvblN0cmF0ZWd5LCBDb21wb25lbnQsIElucHV0fSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHtOZ2JEYXRlfSBmcm9tICcuL25nYi1kYXRlJztcclxuaW1wb3J0IHtOZ2JEYXRlcGlja2VySTE4bn0gZnJvbSAnLi9kYXRlcGlja2VyLWkxOG4nO1xyXG5cclxuQENvbXBvbmVudCh7XHJcbiAgc2VsZWN0b3I6ICdbbmdiRGF0ZXBpY2tlckRheVZpZXddJyxcclxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaCxcclxuICBzdHlsZXM6IFtgXHJcbiAgICA6aG9zdCB7XHJcbiAgICAgIHRleHQtYWxpZ246IGNlbnRlcjtcclxuICAgICAgd2lkdGg6IDJyZW07XHJcbiAgICAgIGhlaWdodDogMnJlbTtcclxuICAgICAgbGluZS1oZWlnaHQ6IDJyZW07XHJcbiAgICAgIGJvcmRlci1yYWRpdXM6IDAuMjVyZW07XHJcbiAgICAgIGJhY2tncm91bmQ6IHRyYW5zcGFyZW50O1xyXG4gICAgfVxyXG4gICAgOmhvc3Qub3V0c2lkZSB7XHJcbiAgICAgIG9wYWNpdHk6IDAuNTtcclxuICAgIH1cclxuICBgXSxcclxuICBob3N0OiB7XHJcbiAgICAnY2xhc3MnOiAnYnRuLWxpZ2h0JyxcclxuICAgICdbY2xhc3MuYmctcHJpbWFyeV0nOiAnc2VsZWN0ZWQnLFxyXG4gICAgJ1tjbGFzcy50ZXh0LXdoaXRlXSc6ICdzZWxlY3RlZCcsXHJcbiAgICAnW2NsYXNzLnRleHQtbXV0ZWRdJzogJ2lzTXV0ZWQoKScsXHJcbiAgICAnW2NsYXNzLm91dHNpZGVdJzogJ2lzTXV0ZWQoKScsXHJcbiAgICAnW2NsYXNzLmFjdGl2ZV0nOiAnZm9jdXNlZCdcclxuICB9LFxyXG4gIHRlbXBsYXRlOiBge3sgaTE4bi5nZXREYXlOdW1lcmFscyhkYXRlKSB9fWBcclxufSlcclxuZXhwb3J0IGNsYXNzIE5nYkRhdGVwaWNrZXJEYXlWaWV3IHtcclxuICBASW5wdXQoKSBjdXJyZW50TW9udGg6IG51bWJlcjtcclxuICBASW5wdXQoKSBkYXRlOiBOZ2JEYXRlO1xyXG4gIEBJbnB1dCgpIGRpc2FibGVkOiBib29sZWFuO1xyXG4gIEBJbnB1dCgpIGZvY3VzZWQ6IGJvb2xlYW47XHJcbiAgQElucHV0KCkgc2VsZWN0ZWQ6IGJvb2xlYW47XHJcblxyXG4gIGNvbnN0cnVjdG9yKHB1YmxpYyBpMThuOiBOZ2JEYXRlcGlja2VySTE4bikge31cclxuXHJcbiAgaXNNdXRlZCgpIHsgcmV0dXJuICF0aGlzLnNlbGVjdGVkICYmICh0aGlzLmRhdGUubW9udGggIT09IHRoaXMuY3VycmVudE1vbnRoIHx8IHRoaXMuZGlzYWJsZWQpOyB9XHJcbn1cclxuIiwiaW1wb3J0IHtDb21wb25lbnQsIElucHV0LCBPdXRwdXQsIEV2ZW50RW1pdHRlciwgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3l9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQge05nYkRhdGV9IGZyb20gJy4vbmdiLWRhdGUnO1xyXG5pbXBvcnQge3RvSW50ZWdlcn0gZnJvbSAnLi4vdXRpbC91dGlsJztcclxuaW1wb3J0IHtOZ2JEYXRlcGlja2VySTE4bn0gZnJvbSAnLi9kYXRlcGlja2VyLWkxOG4nO1xyXG5cclxuQENvbXBvbmVudCh7XHJcbiAgc2VsZWN0b3I6ICduZ2ItZGF0ZXBpY2tlci1uYXZpZ2F0aW9uLXNlbGVjdCcsXHJcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2gsXHJcbiAgc3R5bGVzOiBbYFxyXG4gICAgOmhvc3Q+c2VsZWN0IHtcclxuICAgICAgZGlzcGxheTogZmxleDtcclxuICAgICAgZGlzcGxheTogLW1zLWZsZXhib3g7XHJcbiAgICAgIC1tcy1mbGV4OiAxIDEgYXV0bztcclxuICAgICAgd2lkdGg6IDEwMCU7XHJcbiAgICAgIHBhZGRpbmc6IDAgMC41cmVtO1xyXG4gICAgICBmb250LXNpemU6IDAuODc1cmVtO1xyXG4gICAgICBoZWlnaHQ6IDEuODVyZW07XHJcbiAgICB9XHJcbiAgYF0sXHJcbiAgdGVtcGxhdGU6IGBcclxuICAgIDxzZWxlY3RcclxuICAgICAgW2Rpc2FibGVkXT1cImRpc2FibGVkXCJcclxuICAgICAgY2xhc3M9XCJjdXN0b20tc2VsZWN0XCJcclxuICAgICAgW3ZhbHVlXT1cImRhdGU/Lm1vbnRoXCJcclxuICAgICAgaTE4bi1hcmlhLWxhYmVsPVwiQEBuZ2IuZGF0ZXBpY2tlci5zZWxlY3QtbW9udGhcIiBhcmlhLWxhYmVsPVwiU2VsZWN0IG1vbnRoXCJcclxuICAgICAgaTE4bi10aXRsZT1cIkBAbmdiLmRhdGVwaWNrZXIuc2VsZWN0LW1vbnRoXCIgdGl0bGU9XCJTZWxlY3QgbW9udGhcIlxyXG4gICAgICAoY2hhbmdlKT1cImNoYW5nZU1vbnRoKCRldmVudC50YXJnZXQudmFsdWUpXCI+XHJcbiAgICAgICAgPG9wdGlvbiAqbmdGb3I9XCJsZXQgbSBvZiBtb250aHNcIiBbYXR0ci5hcmlhLWxhYmVsXT1cImkxOG4uZ2V0TW9udGhGdWxsTmFtZShtLCBkYXRlPy55ZWFyKVwiXHJcbiAgICAgICAgICAgICAgICBbdmFsdWVdPVwibVwiPnt7IGkxOG4uZ2V0TW9udGhTaG9ydE5hbWUobSwgZGF0ZT8ueWVhcikgfX08L29wdGlvbj5cclxuICAgIDwvc2VsZWN0PjxzZWxlY3RcclxuICAgICAgW2Rpc2FibGVkXT1cImRpc2FibGVkXCJcclxuICAgICAgY2xhc3M9XCJjdXN0b20tc2VsZWN0XCJcclxuICAgICAgW3ZhbHVlXT1cImRhdGU/LnllYXJcIlxyXG4gICAgICBpMThuLWFyaWEtbGFiZWw9XCJAQG5nYi5kYXRlcGlja2VyLnNlbGVjdC15ZWFyXCIgYXJpYS1sYWJlbD1cIlNlbGVjdCB5ZWFyXCJcclxuICAgICAgaTE4bi10aXRsZT1cIkBAbmdiLmRhdGVwaWNrZXIuc2VsZWN0LXllYXJcIiB0aXRsZT1cIlNlbGVjdCB5ZWFyXCJcclxuICAgICAgKGNoYW5nZSk9XCJjaGFuZ2VZZWFyKCRldmVudC50YXJnZXQudmFsdWUpXCI+XHJcbiAgICAgICAgPG9wdGlvbiAqbmdGb3I9XCJsZXQgeSBvZiB5ZWFyc1wiIFt2YWx1ZV09XCJ5XCI+e3sgaTE4bi5nZXRZZWFyTnVtZXJhbHMoeSkgfX08L29wdGlvbj5cclxuICAgIDwvc2VsZWN0PlxyXG4gIGBcclxufSlcclxuZXhwb3J0IGNsYXNzIE5nYkRhdGVwaWNrZXJOYXZpZ2F0aW9uU2VsZWN0IHtcclxuICBASW5wdXQoKSBkYXRlOiBOZ2JEYXRlO1xyXG4gIEBJbnB1dCgpIGRpc2FibGVkOiBib29sZWFuO1xyXG4gIEBJbnB1dCgpIG1vbnRoczogbnVtYmVyW107XHJcbiAgQElucHV0KCkgeWVhcnM6IG51bWJlcltdO1xyXG5cclxuICBAT3V0cHV0KCkgc2VsZWN0ID0gbmV3IEV2ZW50RW1pdHRlcjxOZ2JEYXRlPigpO1xyXG5cclxuICBjb25zdHJ1Y3RvcihwdWJsaWMgaTE4bjogTmdiRGF0ZXBpY2tlckkxOG4pIHt9XHJcblxyXG4gIGNoYW5nZU1vbnRoKG1vbnRoOiBzdHJpbmcpIHsgdGhpcy5zZWxlY3QuZW1pdChuZXcgTmdiRGF0ZSh0aGlzLmRhdGUueWVhciwgdG9JbnRlZ2VyKG1vbnRoKSwgMSkpOyB9XHJcblxyXG4gIGNoYW5nZVllYXIoeWVhcjogc3RyaW5nKSB7IHRoaXMuc2VsZWN0LmVtaXQobmV3IE5nYkRhdGUodG9JbnRlZ2VyKHllYXIpLCB0aGlzLmRhdGUubW9udGgsIDEpKTsgfVxyXG59XHJcbiIsImltcG9ydCB7TmdiRGF0ZX0gZnJvbSAnLi4vbmdiLWRhdGUnO1xyXG5pbXBvcnQge05nYlBlcmlvZCwgTmdiQ2FsZW5kYXJ9IGZyb20gJy4uL25nYi1jYWxlbmRhcic7XHJcbmltcG9ydCB7SW5qZWN0YWJsZX0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7aXNOdW1iZXJ9IGZyb20gJy4uLy4uL3V0aWwvdXRpbCc7XHJcblxyXG5ASW5qZWN0YWJsZSgpXHJcbmV4cG9ydCBhYnN0cmFjdCBjbGFzcyBOZ2JDYWxlbmRhckhpanJpIGV4dGVuZHMgTmdiQ2FsZW5kYXIge1xyXG4gIC8qKlxyXG4gICAqIFJldHVybnMgdGhlIG51bWJlciBvZiBkYXlzIGluIGEgc3BlY2lmaWMgSGlqcmkgbW9udGguXHJcbiAgICogYG1vbnRoYCBpcyAxIGZvciBNdWhhcnJhbSwgMiBmb3IgU2FmYXIsIGV0Yy5cclxuICAgKiBgeWVhcmAgaXMgYW55IEhpanJpIHllYXIuXHJcbiAgICovXHJcbiAgYWJzdHJhY3QgZ2V0RGF5c1Blck1vbnRoKG1vbnRoOiBudW1iZXIsIHllYXI6IG51bWJlcik6IG51bWJlcjtcclxuXHJcbiAgLyoqXHJcbiAgICogUmV0dXJucyB0aGUgZXF1aXZhbGVudCBIaWpyaSBkYXRlIHZhbHVlIGZvciBhIGdpdmUgaW5wdXQgR3JlZ29yaWFuIGRhdGUuXHJcbiAgICogYGdEYXRlYCBpcyBzIEpTIERhdGUgdG8gYmUgY29udmVydGVkIHRvIEhpanJpLlxyXG4gICAqL1xyXG4gIGFic3RyYWN0IGZyb21HcmVnb3JpYW4oZ0RhdGU6IERhdGUpOiBOZ2JEYXRlO1xyXG5cclxuICAvKipcclxuICAgKiBDb252ZXJ0cyB0aGUgY3VycmVudCBIaWpyaSBkYXRlIHRvIEdyZWdvcmlhbi5cclxuICAgKi9cclxuICBhYnN0cmFjdCB0b0dyZWdvcmlhbihoRGF0ZTogTmdiRGF0ZSk6IERhdGU7XHJcblxyXG4gIGdldERheXNQZXJXZWVrKCkgeyByZXR1cm4gNzsgfVxyXG5cclxuICBnZXRNb250aHMoKSB7IHJldHVybiBbMSwgMiwgMywgNCwgNSwgNiwgNywgOCwgOSwgMTAsIDExLCAxMl07IH1cclxuXHJcbiAgZ2V0V2Vla3NQZXJNb250aCgpIHsgcmV0dXJuIDY7IH1cclxuXHJcbiAgZ2V0TmV4dChkYXRlOiBOZ2JEYXRlLCBwZXJpb2Q6IE5nYlBlcmlvZCA9ICdkJywgbnVtYmVyID0gMSkge1xyXG4gICAgZGF0ZSA9IG5ldyBOZ2JEYXRlKGRhdGUueWVhciwgZGF0ZS5tb250aCwgZGF0ZS5kYXkpO1xyXG5cclxuICAgIHN3aXRjaCAocGVyaW9kKSB7XHJcbiAgICAgIGNhc2UgJ3knOlxyXG4gICAgICAgIGRhdGUgPSB0aGlzLl9zZXRZZWFyKGRhdGUsIGRhdGUueWVhciArIG51bWJlcik7XHJcbiAgICAgICAgZGF0ZS5tb250aCA9IDE7XHJcbiAgICAgICAgZGF0ZS5kYXkgPSAxO1xyXG4gICAgICAgIHJldHVybiBkYXRlO1xyXG4gICAgICBjYXNlICdtJzpcclxuICAgICAgICBkYXRlID0gdGhpcy5fc2V0TW9udGgoZGF0ZSwgZGF0ZS5tb250aCArIG51bWJlcik7XHJcbiAgICAgICAgZGF0ZS5kYXkgPSAxO1xyXG4gICAgICAgIHJldHVybiBkYXRlO1xyXG4gICAgICBjYXNlICdkJzpcclxuICAgICAgICByZXR1cm4gdGhpcy5fc2V0RGF5KGRhdGUsIGRhdGUuZGF5ICsgbnVtYmVyKTtcclxuICAgICAgZGVmYXVsdDpcclxuICAgICAgICByZXR1cm4gZGF0ZTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIGdldFByZXYoZGF0ZTogTmdiRGF0ZSwgcGVyaW9kOiBOZ2JQZXJpb2QgPSAnZCcsIG51bWJlciA9IDEpIHsgcmV0dXJuIHRoaXMuZ2V0TmV4dChkYXRlLCBwZXJpb2QsIC1udW1iZXIpOyB9XHJcblxyXG4gIGdldFdlZWtkYXkoZGF0ZTogTmdiRGF0ZSkge1xyXG4gICAgY29uc3QgZGF5ID0gdGhpcy50b0dyZWdvcmlhbihkYXRlKS5nZXREYXkoKTtcclxuICAgIC8vIGluIEpTIERhdGUgU3VuPTAsIGluIElTTyA4NjAxIFN1bj03XHJcbiAgICByZXR1cm4gZGF5ID09PSAwID8gNyA6IGRheTtcclxuICB9XHJcblxyXG4gIGdldFdlZWtOdW1iZXIod2VlazogTmdiRGF0ZVtdLCBmaXJzdERheU9mV2VlazogbnVtYmVyKSB7XHJcbiAgICAvLyBpbiBKUyBEYXRlIFN1bj0wLCBpbiBJU08gODYwMSBTdW49N1xyXG4gICAgaWYgKGZpcnN0RGF5T2ZXZWVrID09PSA3KSB7XHJcbiAgICAgIGZpcnN0RGF5T2ZXZWVrID0gMDtcclxuICAgIH1cclxuXHJcbiAgICBjb25zdCB0aHVyc2RheUluZGV4ID0gKDQgKyA3IC0gZmlyc3REYXlPZldlZWspICUgNztcclxuICAgIGNvbnN0IGRhdGUgPSB3ZWVrW3RodXJzZGF5SW5kZXhdO1xyXG5cclxuICAgIGNvbnN0IGpzRGF0ZSA9IHRoaXMudG9HcmVnb3JpYW4oZGF0ZSk7XHJcbiAgICBqc0RhdGUuc2V0RGF0ZShqc0RhdGUuZ2V0RGF0ZSgpICsgNCAtIChqc0RhdGUuZ2V0RGF5KCkgfHwgNykpOyAgLy8gVGh1cnNkYXlcclxuICAgIGNvbnN0IHRpbWUgPSBqc0RhdGUuZ2V0VGltZSgpO1xyXG4gICAgY29uc3QgTXVoRGF0ZSA9IHRoaXMudG9HcmVnb3JpYW4obmV3IE5nYkRhdGUoZGF0ZS55ZWFyLCAxLCAxKSk7ICAvLyBDb21wYXJlIHdpdGggTXVoYXJyYW0gMVxyXG4gICAgcmV0dXJuIE1hdGguZmxvb3IoTWF0aC5yb3VuZCgodGltZSAtIE11aERhdGUuZ2V0VGltZSgpKSAvIDg2NDAwMDAwKSAvIDcpICsgMTtcclxuICB9XHJcblxyXG4gIGdldFRvZGF5KCk6IE5nYkRhdGUgeyByZXR1cm4gdGhpcy5mcm9tR3JlZ29yaWFuKG5ldyBEYXRlKCkpOyB9XHJcblxyXG5cclxuICBpc1ZhbGlkKGRhdGU6IE5nYkRhdGUpOiBib29sZWFuIHtcclxuICAgIHJldHVybiBkYXRlICYmIGlzTnVtYmVyKGRhdGUueWVhcikgJiYgaXNOdW1iZXIoZGF0ZS5tb250aCkgJiYgaXNOdW1iZXIoZGF0ZS5kYXkpICYmXHJcbiAgICAgICAgIWlzTmFOKHRoaXMudG9HcmVnb3JpYW4oZGF0ZSkuZ2V0VGltZSgpKTtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgX3NldERheShkYXRlOiBOZ2JEYXRlLCBkYXk6IG51bWJlcik6IE5nYkRhdGUge1xyXG4gICAgZGF5ID0gK2RheTtcclxuICAgIGxldCBtRGF5cyA9IHRoaXMuZ2V0RGF5c1Blck1vbnRoKGRhdGUubW9udGgsIGRhdGUueWVhcik7XHJcbiAgICBpZiAoZGF5IDw9IDApIHtcclxuICAgICAgd2hpbGUgKGRheSA8PSAwKSB7XHJcbiAgICAgICAgZGF0ZSA9IHRoaXMuX3NldE1vbnRoKGRhdGUsIGRhdGUubW9udGggLSAxKTtcclxuICAgICAgICBtRGF5cyA9IHRoaXMuZ2V0RGF5c1Blck1vbnRoKGRhdGUubW9udGgsIGRhdGUueWVhcik7XHJcbiAgICAgICAgZGF5ICs9IG1EYXlzO1xyXG4gICAgICB9XHJcbiAgICB9IGVsc2UgaWYgKGRheSA+IG1EYXlzKSB7XHJcbiAgICAgIHdoaWxlIChkYXkgPiBtRGF5cykge1xyXG4gICAgICAgIGRheSAtPSBtRGF5cztcclxuICAgICAgICBkYXRlID0gdGhpcy5fc2V0TW9udGgoZGF0ZSwgZGF0ZS5tb250aCArIDEpO1xyXG4gICAgICAgIG1EYXlzID0gdGhpcy5nZXREYXlzUGVyTW9udGgoZGF0ZS5tb250aCwgZGF0ZS55ZWFyKTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gICAgZGF0ZS5kYXkgPSBkYXk7XHJcbiAgICByZXR1cm4gZGF0ZTtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgX3NldE1vbnRoKGRhdGU6IE5nYkRhdGUsIG1vbnRoOiBudW1iZXIpOiBOZ2JEYXRlIHtcclxuICAgIG1vbnRoID0gK21vbnRoO1xyXG4gICAgZGF0ZS55ZWFyID0gZGF0ZS55ZWFyICsgTWF0aC5mbG9vcigobW9udGggLSAxKSAvIDEyKTtcclxuICAgIGRhdGUubW9udGggPSBNYXRoLmZsb29yKCgobW9udGggLSAxKSAlIDEyICsgMTIpICUgMTIpICsgMTtcclxuICAgIHJldHVybiBkYXRlO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBfc2V0WWVhcihkYXRlOiBOZ2JEYXRlLCB5ZWFyOiBudW1iZXIpOiBOZ2JEYXRlIHtcclxuICAgIGRhdGUueWVhciA9ICt5ZWFyO1xyXG4gICAgcmV0dXJuIGRhdGU7XHJcbiAgfVxyXG59XHJcbiIsImltcG9ydCB7TmdiQ2FsZW5kYXJIaWpyaX0gZnJvbSAnLi9uZ2ItY2FsZW5kYXItaGlqcmknO1xyXG5pbXBvcnQge05nYkRhdGV9IGZyb20gJy4uL25nYi1kYXRlJztcclxuaW1wb3J0IHtJbmplY3RhYmxlfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuXHJcbi8qKlxyXG4gKiBDaGVja3MgaWYgaXNsYW1pYyB5ZWFyIGlzIGEgbGVhcCB5ZWFyXHJcbiAqL1xyXG5mdW5jdGlvbiBpc0lzbGFtaWNMZWFwWWVhcihoWWVhcjogbnVtYmVyKTogYm9vbGVhbiB7XHJcbiAgcmV0dXJuICgxNCArIDExICogaFllYXIpICUgMzAgPCAxMTtcclxufVxyXG5cclxuLyoqXHJcbiAqIENoZWNrcyBpZiBncmVnb3JpYW4geWVhcnMgaXMgYSBsZWFwIHllYXJcclxuICovXHJcbmZ1bmN0aW9uIGlzR3JlZ29yaWFuTGVhcFllYXIoZ0RhdGU6IERhdGUpOiBib29sZWFuIHtcclxuICBjb25zdCB5ZWFyID0gZ0RhdGUuZ2V0RnVsbFllYXIoKTtcclxuICByZXR1cm4geWVhciAlIDQgPT09IDAgJiYgeWVhciAlIDEwMCAhPT0gMCB8fCB5ZWFyICUgNDAwID09PSAwO1xyXG59XHJcblxyXG4vKipcclxuICogUmV0dXJucyB0aGUgc3RhcnQgb2YgSGlqcmkgTW9udGguXHJcbiAqIGBoTW9udGhgIGlzIDAgZm9yIE11aGFycmFtLCAxIGZvciBTYWZhciwgZXRjLlxyXG4gKiBgaFllYXJgIGlzIGFueSBIaWpyaSBoWWVhci5cclxuICovXHJcbmZ1bmN0aW9uIGdldElzbGFtaWNNb250aFN0YXJ0KGhZZWFyOiBudW1iZXIsIGhNb250aDogbnVtYmVyKTogbnVtYmVyIHtcclxuICByZXR1cm4gTWF0aC5jZWlsKDI5LjUgKiBoTW9udGgpICsgKGhZZWFyIC0gMSkgKiAzNTQgKyBNYXRoLmZsb29yKCgzICsgMTEgKiBoWWVhcikgLyAzMC4wKTtcclxufVxyXG5cclxuLyoqXHJcbiAqIFJldHVybnMgdGhlIHN0YXJ0IG9mIEhpanJpIHllYXIuXHJcbiAqIGB5ZWFyYCBpcyBhbnkgSGlqcmkgeWVhci5cclxuICovXHJcbmZ1bmN0aW9uIGdldElzbGFtaWNZZWFyU3RhcnQoeWVhcjogbnVtYmVyKTogbnVtYmVyIHtcclxuICByZXR1cm4gKHllYXIgLSAxKSAqIDM1NCArIE1hdGguZmxvb3IoKDMgKyAxMSAqIHllYXIpIC8gMzAuMCk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIG1vZChhOiBudW1iZXIsIGI6IG51bWJlcik6IG51bWJlciB7XHJcbiAgcmV0dXJuIGEgLSBiICogTWF0aC5mbG9vcihhIC8gYik7XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBUaGUgY2l2aWwgY2FsZW5kYXIgaXMgb25lIHR5cGUgb2YgSGlqcmkgY2FsZW5kYXJzIHVzZWQgaW4gaXNsYW1pYyBjb3VudHJpZXMuXHJcbiAqIFVzZXMgYSBmaXhlZCBjeWNsZSBvZiBhbHRlcm5hdGluZyAyOS0gYW5kIDMwLWRheSBtb250aHMsXHJcbiAqIHdpdGggYSBsZWFwIGRheSBhZGRlZCB0byB0aGUgbGFzdCBtb250aCBvZiAxMSBvdXQgb2YgZXZlcnkgMzAgeWVhcnMuXHJcbiAqIGh0dHA6Ly9jbGRyLnVuaWNvZGUub3JnL2RldmVsb3BtZW50L2RldmVsb3BtZW50LXByb2Nlc3MvZGVzaWduLXByb3Bvc2Fscy9pc2xhbWljLWNhbGVuZGFyLXR5cGVzXHJcbiAqIEFsbCB0aGUgY2FsY3VsYXRpb25zIGhlcmUgYXJlIGJhc2VkIG9uIHRoZSBlcXVhdGlvbnMgZnJvbSBcIkNhbGVuZHJpY2FsIENhbGN1bGF0aW9uc1wiIEJ5IEVkd2FyZCBNLiBSZWluZ29sZCwgTmFjaHVtXHJcbiAqIERlcnNob3dpdHouXHJcbiAqL1xyXG5cclxuY29uc3QgR1JFR09SSUFOX0VQT0NIID0gMTcyMTQyNS41O1xyXG5jb25zdCBJU0xBTUlDX0VQT0NIID0gMTk0ODQzOS41O1xyXG5cclxuQEluamVjdGFibGUoKVxyXG5leHBvcnQgY2xhc3MgTmdiQ2FsZW5kYXJJc2xhbWljQ2l2aWwgZXh0ZW5kcyBOZ2JDYWxlbmRhckhpanJpIHtcclxuICAvKipcclxuICAgKiBSZXR1cm5zIHRoZSBlcXVpdmFsZW50IGlzbGFtaWMoY2l2aWwpIGRhdGUgdmFsdWUgZm9yIGEgZ2l2ZSBpbnB1dCBHcmVnb3JpYW4gZGF0ZS5cclxuICAgKiBgZ0RhdGVgIGlzIGEgSlMgRGF0ZSB0byBiZSBjb252ZXJ0ZWQgdG8gSGlqcmkuXHJcbiAgICovXHJcbiAgZnJvbUdyZWdvcmlhbihnRGF0ZTogRGF0ZSk6IE5nYkRhdGUge1xyXG4gICAgY29uc3QgZ1llYXIgPSBnRGF0ZS5nZXRGdWxsWWVhcigpLCBnTW9udGggPSBnRGF0ZS5nZXRNb250aCgpLCBnRGF5ID0gZ0RhdGUuZ2V0RGF0ZSgpO1xyXG5cclxuICAgIGxldCBqdWxpYW5EYXkgPSBHUkVHT1JJQU5fRVBPQ0ggLSAxICsgMzY1ICogKGdZZWFyIC0gMSkgKyBNYXRoLmZsb29yKChnWWVhciAtIDEpIC8gNCkgK1xyXG4gICAgICAgIC1NYXRoLmZsb29yKChnWWVhciAtIDEpIC8gMTAwKSArIE1hdGguZmxvb3IoKGdZZWFyIC0gMSkgLyA0MDApICtcclxuICAgICAgICBNYXRoLmZsb29yKFxyXG4gICAgICAgICAgICAoMzY3ICogKGdNb250aCArIDEpIC0gMzYyKSAvIDEyICsgKGdNb250aCArIDEgPD0gMiA/IDAgOiBpc0dyZWdvcmlhbkxlYXBZZWFyKGdEYXRlKSA/IC0xIDogLTIpICsgZ0RheSk7XHJcbiAgICBqdWxpYW5EYXkgPSBNYXRoLmZsb29yKGp1bGlhbkRheSkgKyAwLjU7XHJcblxyXG4gICAgY29uc3QgZGF5cyA9IGp1bGlhbkRheSAtIElTTEFNSUNfRVBPQ0g7XHJcbiAgICBjb25zdCBoWWVhciA9IE1hdGguZmxvb3IoKDMwICogZGF5cyArIDEwNjQ2KSAvIDEwNjMxLjApO1xyXG4gICAgbGV0IGhNb250aCA9IE1hdGguY2VpbCgoZGF5cyAtIDI5IC0gZ2V0SXNsYW1pY1llYXJTdGFydChoWWVhcikpIC8gMjkuNSk7XHJcbiAgICBoTW9udGggPSBNYXRoLm1pbihoTW9udGgsIDExKTtcclxuICAgIGNvbnN0IGhEYXkgPSBNYXRoLmNlaWwoZGF5cyAtIGdldElzbGFtaWNNb250aFN0YXJ0KGhZZWFyLCBoTW9udGgpKSArIDE7XHJcbiAgICByZXR1cm4gbmV3IE5nYkRhdGUoaFllYXIsIGhNb250aCArIDEsIGhEYXkpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogUmV0dXJucyB0aGUgZXF1aXZhbGVudCBKUyBkYXRlIHZhbHVlIGZvciBhIGdpdmUgaW5wdXQgaXNsYW1pYyhjaXZpbCkgZGF0ZS5cclxuICAgKiBgaERhdGVgIGlzIGFuIGlzbGFtaWMoY2l2aWwpIGRhdGUgdG8gYmUgY29udmVydGVkIHRvIEdyZWdvcmlhbi5cclxuICAgKi9cclxuICB0b0dyZWdvcmlhbihoRGF0ZTogTmdiRGF0ZSk6IERhdGUge1xyXG4gICAgY29uc3QgaFllYXIgPSBoRGF0ZS55ZWFyO1xyXG4gICAgY29uc3QgaE1vbnRoID0gaERhdGUubW9udGggLSAxO1xyXG4gICAgY29uc3QgaERheSA9IGhEYXRlLmRheTtcclxuICAgIGNvbnN0IGp1bGlhbkRheSA9XHJcbiAgICAgICAgaERheSArIE1hdGguY2VpbCgyOS41ICogaE1vbnRoKSArIChoWWVhciAtIDEpICogMzU0ICsgTWF0aC5mbG9vcigoMyArIDExICogaFllYXIpIC8gMzApICsgSVNMQU1JQ19FUE9DSCAtIDE7XHJcblxyXG4gICAgY29uc3Qgd2pkID0gTWF0aC5mbG9vcihqdWxpYW5EYXkgLSAwLjUpICsgMC41LCBkZXBvY2ggPSB3amQgLSBHUkVHT1JJQU5fRVBPQ0gsXHJcbiAgICAgICAgICBxdWFkcmljZW50ID0gTWF0aC5mbG9vcihkZXBvY2ggLyAxNDYwOTcpLCBkcWMgPSBtb2QoZGVwb2NoLCAxNDYwOTcpLCBjZW50ID0gTWF0aC5mbG9vcihkcWMgLyAzNjUyNCksXHJcbiAgICAgICAgICBkY2VudCA9IG1vZChkcWMsIDM2NTI0KSwgcXVhZCA9IE1hdGguZmxvb3IoZGNlbnQgLyAxNDYxKSwgZHF1YWQgPSBtb2QoZGNlbnQsIDE0NjEpLFxyXG4gICAgICAgICAgeWluZGV4ID0gTWF0aC5mbG9vcihkcXVhZCAvIDM2NSk7XHJcbiAgICBsZXQgeWVhciA9IHF1YWRyaWNlbnQgKiA0MDAgKyBjZW50ICogMTAwICsgcXVhZCAqIDQgKyB5aW5kZXg7XHJcbiAgICBpZiAoIShjZW50ID09PSA0IHx8IHlpbmRleCA9PT0gNCkpIHtcclxuICAgICAgeWVhcisrO1xyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0IGdZZWFyU3RhcnQgPSBHUkVHT1JJQU5fRVBPQ0ggKyAzNjUgKiAoeWVhciAtIDEpICsgTWF0aC5mbG9vcigoeWVhciAtIDEpIC8gNCkgLSBNYXRoLmZsb29yKCh5ZWFyIC0gMSkgLyAxMDApICtcclxuICAgICAgICBNYXRoLmZsb29yKCh5ZWFyIC0gMSkgLyA0MDApO1xyXG5cclxuICAgIGNvbnN0IHllYXJkYXkgPSB3amQgLSBnWWVhclN0YXJ0O1xyXG5cclxuICAgIGNvbnN0IHRqZCA9IEdSRUdPUklBTl9FUE9DSCAtIDEgKyAzNjUgKiAoeWVhciAtIDEpICsgTWF0aC5mbG9vcigoeWVhciAtIDEpIC8gNCkgLSBNYXRoLmZsb29yKCh5ZWFyIC0gMSkgLyAxMDApICtcclxuICAgICAgICBNYXRoLmZsb29yKCh5ZWFyIC0gMSkgLyA0MDApICsgTWF0aC5mbG9vcig3MzkgLyAxMiArIChpc0dyZWdvcmlhbkxlYXBZZWFyKG5ldyBEYXRlKHllYXIsIDMsIDEpKSA/IC0xIDogLTIpICsgMSk7XHJcblxyXG4gICAgY29uc3QgbGVhcGFkaiA9IHdqZCA8IHRqZCA/IDAgOiBpc0dyZWdvcmlhbkxlYXBZZWFyKG5ldyBEYXRlKHllYXIsIDMsIDEpKSA/IDEgOiAyO1xyXG5cclxuICAgIGNvbnN0IG1vbnRoID0gTWF0aC5mbG9vcigoKHllYXJkYXkgKyBsZWFwYWRqKSAqIDEyICsgMzczKSAvIDM2Nyk7XHJcbiAgICBjb25zdCB0amQyID0gR1JFR09SSUFOX0VQT0NIIC0gMSArIDM2NSAqICh5ZWFyIC0gMSkgKyBNYXRoLmZsb29yKCh5ZWFyIC0gMSkgLyA0KSAtIE1hdGguZmxvb3IoKHllYXIgLSAxKSAvIDEwMCkgK1xyXG4gICAgICAgIE1hdGguZmxvb3IoKHllYXIgLSAxKSAvIDQwMCkgK1xyXG4gICAgICAgIE1hdGguZmxvb3IoXHJcbiAgICAgICAgICAgICgzNjcgKiBtb250aCAtIDM2MikgLyAxMiArIChtb250aCA8PSAyID8gMCA6IGlzR3JlZ29yaWFuTGVhcFllYXIobmV3IERhdGUoeWVhciwgbW9udGggLSAxLCAxKSkgPyAtMSA6IC0yKSArXHJcbiAgICAgICAgICAgIDEpO1xyXG5cclxuICAgIGNvbnN0IGRheSA9IHdqZCAtIHRqZDIgKyAxO1xyXG5cclxuICAgIHJldHVybiBuZXcgRGF0ZSh5ZWFyLCBtb250aCAtIDEsIGRheSk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBSZXR1cm5zIHRoZSBudW1iZXIgb2YgZGF5cyBpbiBhIHNwZWNpZmljIEhpanJpIG1vbnRoLlxyXG4gICAqIGBtb250aGAgaXMgMSBmb3IgTXVoYXJyYW0sIDIgZm9yIFNhZmFyLCBldGMuXHJcbiAgICogYHllYXJgIGlzIGFueSBIaWpyaSB5ZWFyLlxyXG4gICAqL1xyXG4gIGdldERheXNQZXJNb250aChtb250aDogbnVtYmVyLCB5ZWFyOiBudW1iZXIpOiBudW1iZXIge1xyXG4gICAgeWVhciA9IHllYXIgKyBNYXRoLmZsb29yKG1vbnRoIC8gMTMpO1xyXG4gICAgbW9udGggPSAoKG1vbnRoIC0gMSkgJSAxMikgKyAxO1xyXG4gICAgbGV0IGxlbmd0aCA9IDI5ICsgbW9udGggJSAyO1xyXG4gICAgaWYgKG1vbnRoID09PSAxMiAmJiBpc0lzbGFtaWNMZWFwWWVhcih5ZWFyKSkge1xyXG4gICAgICBsZW5ndGgrKztcclxuICAgIH1cclxuICAgIHJldHVybiBsZW5ndGg7XHJcbiAgfVxyXG59XHJcbiIsImltcG9ydCB7TmdiQ2FsZW5kYXJJc2xhbWljQ2l2aWx9IGZyb20gJy4vbmdiLWNhbGVuZGFyLWlzbGFtaWMtY2l2aWwnO1xyXG5pbXBvcnQge05nYkRhdGV9IGZyb20gJy4uL25nYi1kYXRlJztcclxuaW1wb3J0IHtJbmplY3RhYmxlfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuXHJcbi8qKlxyXG4gKiBVbWFscXVyYSBjYWxlbmRhciBpcyBvbmUgdHlwZSBvZiBIaWpyaSBjYWxlbmRhcnMgdXNlZCBpbiBpc2xhbWljIGNvdW50cmllcy5cclxuICogVGhpcyBDYWxlbmRhciBpcyB1c2VkIGJ5IFNhdWRpIEFyYWJpYSBmb3IgYWRtaW5pc3RyYXRpdmUgcHVycG9zZS5cclxuICogVW5saWtlIHRhYnVsYXIgY2FsZW5kYXJzLCB0aGUgYWxnb3JpdGhtIGludm9sdmVzIGFzdHJvbm9taWNhbCBjYWxjdWxhdGlvbiwgYnV0IGl0J3Mgc3RpbGwgZGV0ZXJtaW5pc3RpYy5cclxuICogaHR0cDovL2NsZHIudW5pY29kZS5vcmcvZGV2ZWxvcG1lbnQvZGV2ZWxvcG1lbnQtcHJvY2Vzcy9kZXNpZ24tcHJvcG9zYWxzL2lzbGFtaWMtY2FsZW5kYXItdHlwZXNcclxuICovXHJcblxyXG5jb25zdCBHUkVHT1JJQU5fRklSU1RfREFURSA9IG5ldyBEYXRlKDE4ODIsIDEwLCAxMik7XHJcbmNvbnN0IEdSRUdPUklBTl9MQVNUX0RBVEUgPSBuZXcgRGF0ZSgyMTc0LCAxMCwgMjUpO1xyXG5jb25zdCBISUpSSV9CRUdJTiA9IDEzMDA7XHJcbmNvbnN0IEhJSlJJX0VORCA9IDE2MDA7XHJcbmNvbnN0IE9ORV9EQVkgPSAxMDAwICogNjAgKiA2MCAqIDI0O1xyXG5cclxuY29uc3QgTU9OVEhfTEVOR1RIID0gW1xyXG4gIC8vIDEzMDAtMTMwNFxyXG4gICcxMDEwMTAxMDEwMTAnLCAnMTEwMTAxMDEwMTAwJywgJzExMTAxMTAwMTAwMScsICcwMTEwMTEwMTAxMDAnLCAnMDExMDExMTAxMDEwJyxcclxuICAvLyAxMzA1LTEzMDlcclxuICAnMDAxMTAxMTAxMTAwJywgJzEwMTAxMDEwMTEwMScsICcwMTAxMDEwMTAxMDEnLCAnMDExMDEwMTAxMDAxJywgJzAxMTExMDAxMDAxMCcsXHJcbiAgLy8gMTMxMC0xMzE0XHJcbiAgJzEwMTExMDEwMTAwMScsICcwMTAxMTEwMTAxMDAnLCAnMTAxMDExMDExMDEwJywgJzAxMDEwMTAxMTEwMCcsICcxMTAxMDAxMDExMDEnLFxyXG4gIC8vIDEzMTUtMTMxOVxyXG4gICcwMTEwMTAwMTAxMDEnLCAnMDExMTAxMDAxMDEwJywgJzEwMTEwMTAxMDEwMCcsICcxMDExMDExMDEwMTAnLCAnMDEwMTEwMTAxMTAxJyxcclxuICAvLyAxMzIwLTEzMjRcclxuICAnMDEwMDEwMTAxMTEwJywgJzEwMTAwMTAwMTExMScsICcwMTAxMDAwMTAxMTEnLCAnMDExMDEwMDAxMDExJywgJzAxMTAxMDEwMDEwMScsXHJcbiAgLy8gMTMyNS0xMzI5XHJcbiAgJzEwMTAxMTAxMDEwMScsICcwMDEwMTEwMTAxMTAnLCAnMTAwMTAxMDExMDExJywgJzAxMDAxMDAxMTEwMScsICcxMDEwMDEwMDExMDEnLFxyXG4gIC8vIDEzMzAtMTMzNFxyXG4gICcxMTAxMDAxMDAxMTAnLCAnMTEwMTEwMDEwMTAxJywgJzAxMDExMDEwMTEwMCcsICcxMDAxMTAxMTAxMTAnLCAnMDAxMDEwMTExMDEwJyxcclxuICAvLyAxMzM1LTEzMzlcclxuICAnMTAxMDAxMDExMDExJywgJzAxMDEwMDEwMTAxMScsICcxMDEwMTAwMTAxMDEnLCAnMDExMDExMDAxMDEwJywgJzEwMTAxMTEwMTAwMScsXHJcbiAgLy8gMTM0MC0xMzQ0XHJcbiAgJzAwMTAxMTExMDEwMCcsICcxMDAxMDExMTAxMTAnLCAnMDAxMDEwMTEwMTEwJywgJzEwMDEwMTAxMDExMCcsICcxMDEwMTEwMDEwMTAnLFxyXG4gIC8vIDEzNDUtMTM0OVxyXG4gICcxMDExMTAxMDAxMDAnLCAnMTAxMTExMDEwMDEwJywgJzAxMDExMTAxMTAwMScsICcwMDEwMTEwMTExMDAnLCAnMTAwMTAxMTAxMTAxJyxcclxuICAvLyAxMzUwLTEzNTRcclxuICAnMDEwMTAxMDAxMTAxJywgJzEwMTAxMDEwMDEwMScsICcxMDExMDEwMTAwMTAnLCAnMTAxMTEwMTAwMTAxJywgJzAxMDExMDExMDEwMCcsXHJcbiAgLy8gMTM1NS0xMzU5XHJcbiAgJzEwMDExMDExMDExMCcsICcwMTAxMDEwMTAxMTEnLCAnMDAxMDEwMDEwMTExJywgJzAxMDEwMTAwMTAxMScsICcwMTEwMTAxMDAwMTEnLFxyXG4gIC8vIDEzNjAtMTM2NFxyXG4gICcwMTExMDEwMTAwMTAnLCAnMTAxMTAxMTAwMTAxJywgJzAxMDEwMTEwMTAxMCcsICcxMDEwMTAxMDEwMTEnLCAnMDEwMTAwMTAxMDExJyxcclxuICAvLyAxMzY1LTEzNjlcclxuICAnMTEwMDEwMDEwMTAxJywgJzExMDEwMTAwMTAxMCcsICcxMTAxMTAxMDAxMDEnLCAnMDEwMTExMDAxMDEwJywgJzEwMTAxMTAxMDExMCcsXHJcbiAgLy8gMTM3MC0xMzc0XHJcbiAgJzEwMDEwMTAxMDExMScsICcwMTAwMTAxMDEwMTEnLCAnMTAwMTAxMDAxMDExJywgJzEwMTAxMDEwMDEwMScsICcxMDExMDEwMTAwMTAnLFxyXG4gIC8vIDEzNzUtMTM3OVxyXG4gICcxMDExMDExMDEwMTAnLCAnMDEwMTAxMTEwMTAxJywgJzAwMTAwMTExMDExMCcsICcxMDAwMTAxMTAxMTEnLCAnMDEwMDAxMDExMDExJyxcclxuICAvLyAxMzgwLTEzODRcclxuICAnMDEwMTAxMDEwMTAxJywgJzAxMDExMDEwMTAwMScsICcwMTAxMTAxMTAxMDAnLCAnMTAwMTExMDExMDEwJywgJzAxMDAxMTAxMTEwMScsXHJcbiAgLy8gMTM4NS0xMzg5XHJcbiAgJzAwMTAwMTEwMTExMCcsICcxMDAxMDAxMTAxMTAnLCAnMTAxMDEwMTAxMDEwJywgJzExMDEwMTAxMDEwMCcsICcxMTAxMTAxMTAwMTAnLFxyXG4gIC8vIDEzOTAtMTM5NFxyXG4gICcwMTAxMTEwMTAxMDEnLCAnMDAxMDExMDExMDEwJywgJzEwMDEwMTAxMTAxMScsICcwMTAwMTAxMDEwMTEnLCAnMTAxMDAxMDEwMTAxJyxcclxuICAvLyAxMzk1LTEzOTlcclxuICAnMTAxMTAxMDAxMDAxJywgJzEwMTEwMTEwMDEwMCcsICcxMDExMDExMTAwMDEnLCAnMDEwMTEwMTEwMTAwJywgJzEwMTAxMDExMDEwMScsXHJcbiAgLy8gMTQwMC0xNDA0XHJcbiAgJzEwMTAwMTAxMDEwMScsICcxMTAxMDAxMDAxMDEnLCAnMTExMDEwMDEwMDEwJywgJzExMTAxMTAwMTAwMScsICcwMTEwMTEwMTAxMDAnLFxyXG4gIC8vIDE0MDUtMTQwOVxyXG4gICcxMDEwMTExMDEwMDEnLCAnMTAwMTAxMTAxMDExJywgJzAxMDAxMDEwMTAxMScsICcxMDEwMTAwMTAwMTEnLCAnMTEwMTAxMDAxMDAxJyxcclxuICAvLyAxNDEwLTE0MTRcclxuICAnMTEwMTEwMTAwMTAwJywgJzExMDExMDExMDAxMCcsICcxMDEwMTAxMTEwMDEnLCAnMDEwMDEwMTExMDEwJywgJzEwMTAwMTAxMTAxMScsXHJcbiAgLy8gMTQxNS0xNDE5XHJcbiAgJzAxMDEwMDEwMTAxMScsICcxMDEwMTAwMTAxMDEnLCAnMTAxMTAwMTAxMDEwJywgJzEwMTEwMTAxMDEwMScsICcwMTAxMDEwMTExMDAnLFxyXG4gIC8vIDE0MjAtMTQyNFxyXG4gICcwMTAwMTAxMTExMDEnLCAnMDAxMDAwMTExMTAxJywgJzEwMDEwMDAxMTEwMScsICcxMDEwMTAwMTAxMDEnLCAnMTAxMTAxMDAxMDEwJyxcclxuICAvLyAxNDI1LTE0MjlcclxuICAnMTAxMTAxMDExMDEwJywgJzAxMDEwMTEwMTEwMScsICcwMDEwMTAxMTAxMTAnLCAnMTAwMTAwMTExMDExJywgJzAxMDAxMDAxMTAxMScsXHJcbiAgLy8gMTQzMC0xNDM0XHJcbiAgJzAxMTAwMTAxMDEwMScsICcwMTEwMTAxMDEwMDEnLCAnMDExMTAxMDEwMTAwJywgJzEwMTEwMTEwMTAxMCcsICcwMTAxMDExMDExMDAnLFxyXG4gIC8vIDE0MzUtMTQzOVxyXG4gICcxMDEwMTAxMDExMDEnLCAnMDEwMTAxMDEwMTAxJywgJzEwMTEwMDEwMTAwMScsICcxMDExMTAwMTAwMTAnLCAnMTAxMTEwMTAxMDAxJyxcclxuICAvLyAxNDQwLTE0NDRcclxuICAnMDEwMTExMDEwMTAwJywgJzEwMTAxMTAxMTAxMCcsICcwMTAxMDEwMTEwMTAnLCAnMTAxMDEwMTAxMDExJywgJzAxMDExMDAxMDEwMScsXHJcbiAgLy8gMTQ0NS0xNDQ5XHJcbiAgJzAxMTEwMTAwMTAwMScsICcwMTExMDExMDAxMDAnLCAnMTAxMTEwMTAxMDEwJywgJzAxMDExMDExMDEwMScsICcwMDEwMTAxMTAxMTAnLFxyXG4gIC8vIDE0NTAtMTQ1NFxyXG4gICcxMDEwMDEwMTAxMTAnLCAnMTExMDAxMDAxMTAxJywgJzEwMTEwMDEwMDEwMScsICcxMDExMDEwMTAwMTAnLCAnMTAxMTAxMTAxMDEwJyxcclxuICAvLyAxNDU1LTE0NTlcclxuICAnMDEwMTEwMTAxMTAxJywgJzAwMTAxMDEwMTExMCcsICcxMDAxMDAxMDExMTEnLCAnMDEwMDEwMDEwMTExJywgJzAxMTAwMTAwMTAxMScsXHJcbiAgLy8gMTQ2MC0xNDY0XHJcbiAgJzAxMTAxMDEwMDEwMScsICcwMTEwMTAxMDExMDAnLCAnMTAxMDExMDEwMTEwJywgJzAxMDEwMTAxMTEwMScsICcwMTAwMTAwMTExMDEnLFxyXG4gIC8vIDE0NjUtMTQ2OVxyXG4gICcxMDEwMDEwMDExMDEnLCAnMTEwMTAwMDEwMTEwJywgJzExMDExMDAxMDEwMScsICcwMTAxMTAxMDEwMTAnLCAnMDEwMTEwMTEwMTAxJyxcclxuICAvLyAxNDcwLTE0NzRcclxuICAnMDAxMDExMDExMDEwJywgJzEwMDEwMTAxMTAxMScsICcwMTAwMTAxMDExMDEnLCAnMDEwMTEwMDEwMTAxJywgJzAxMTAxMTAwMTAxMCcsXHJcbiAgLy8gMTQ3NS0xNDc5XHJcbiAgJzAxMTAxMTEwMDEwMCcsICcxMDEwMTExMDEwMTAnLCAnMDEwMDExMTEwMTAxJywgJzAwMTAxMDExMDExMCcsICcxMDAxMDEwMTAxMTAnLFxyXG4gIC8vIDE0ODAtMTQ4NFxyXG4gICcxMDEwMTAxMDEwMTAnLCAnMTAxMTAxMDEwMTAwJywgJzEwMTExMTAxMDAxMCcsICcwMTAxMTEwMTEwMDEnLCAnMDAxMDExMTAxMDEwJyxcclxuICAvLyAxNDg1LTE0ODlcclxuICAnMTAwMTAxMTAxMTAxJywgJzAxMDAxMDEwMTEwMScsICcxMDEwMTAwMTAxMDEnLCAnMTAxMTAxMDAxMDEwJywgJzEwMTExMDEwMDEwMScsXHJcbiAgLy8gMTQ5MC0xNDk0XHJcbiAgJzAxMDExMDExMDAxMCcsICcxMDAxMTAxMTAxMDEnLCAnMDEwMDExMDEwMTEwJywgJzEwMTAxMDAxMDExMScsICcwMTAxMDEwMDAxMTEnLFxyXG4gIC8vIDE0OTUtMTQ5OVxyXG4gICcwMTEwMTAwMTAwMTEnLCAnMDExMTAxMDAxMDAxJywgJzEwMTEwMTAxMDEwMScsICcwMTAxMDExMDEwMTAnLCAnMTAxMDAxMTAxMDExJyxcclxuICAvLyAxNTAwLTE1MDRcclxuICAnMDEwMTAwMTAxMDExJywgJzEwMTAxMDAwMTAxMScsICcxMTAxMDEwMDAxMTAnLCAnMTEwMTEwMTAwMDExJywgJzAxMDExMTAwMTAxMCcsXHJcbiAgLy8gMTUwNS0xNTA5XHJcbiAgJzEwMTAxMTAxMDExMCcsICcwMTAwMTEwMTEwMTEnLCAnMDAxMDAxMTAxMDExJywgJzEwMDEwMTAwMTAxMScsICcxMDEwMTAxMDAxMDEnLFxyXG4gIC8vIDE1MTAtMTUxNFxyXG4gICcxMDExMDEwMTAwMTAnLCAnMTAxMTAxMTAxMDAxJywgJzAxMDEwMTExMDEwMScsICcwMDAxMDExMTAxMTAnLCAnMTAwMDEwMTEwMTExJyxcclxuICAvLyAxNTE1LTE1MTlcclxuICAnMDAxMDAxMDExMDExJywgJzAxMDEwMDEwMTAxMScsICcwMTAxMDExMDAxMDEnLCAnMDEwMTEwMTEwMTAwJywgJzEwMDExMTAxMTAxMCcsXHJcbiAgLy8gMTUyMC0xNTI0XHJcbiAgJzAxMDAxMTEwMTEwMScsICcwMDAxMDExMDExMDEnLCAnMTAwMDEwMTEwMTEwJywgJzEwMTAxMDEwMDExMCcsICcxMTAxMDEwMTAwMTAnLFxyXG4gIC8vIDE1MjUtMTUyOVxyXG4gICcxMTAxMTAxMDEwMDEnLCAnMDEwMTExMDEwMTAwJywgJzEwMTAxMTAxMTAxMCcsICcxMDAxMDEwMTEwMTEnLCAnMDEwMDEwMTAxMDExJyxcclxuICAvLyAxNTMwLTE1MzRcclxuICAnMDExMDAxMDEwMDExJywgJzAxMTEwMDEwMTAwMScsICcwMTExMDExMDAwMTAnLCAnMTAxMTEwMTAxMDAxJywgJzAxMDExMDExMDAxMCcsXHJcbiAgLy8gMTUzNS0xNTM5XHJcbiAgJzEwMTAxMDExMDEwMScsICcwMTAxMDEwMTAxMDEnLCAnMTAxMTAwMTAwMTAxJywgJzExMDExMDAxMDAxMCcsICcxMTEwMTEwMDEwMDEnLFxyXG4gIC8vIDE1NDAtMTU0NFxyXG4gICcwMTEwMTEwMTAwMTAnLCAnMTAxMDExMTAxMDAxJywgJzAxMDEwMTEwMTAxMScsICcwMTAwMTAxMDEwMTEnLCAnMTAxMDAxMDEwMTAxJyxcclxuICAvLyAxNTQ1LTE1NDlcclxuICAnMTEwMTAwMTAxMDAxJywgJzExMDEwMTAxMDEwMCcsICcxMTAxMTAxMDEwMTAnLCAnMTAwMTEwMTEwMTAxJywgJzAxMDAxMDExMTAxMCcsXHJcbiAgLy8gMTU1MC0xNTU0XHJcbiAgJzEwMTAwMDExMTAxMScsICcwMTAwMTAwMTEwMTEnLCAnMTAxMDAxMDAxMTAxJywgJzEwMTAxMDEwMTAxMCcsICcxMDEwMTEwMTAxMDEnLFxyXG4gIC8vIDE1NTUtMTU1OVxyXG4gICcwMDEwMTEwMTEwMTAnLCAnMTAwMTAxMDExMTAxJywgJzAxMDAwMTAxMTExMCcsICcxMDEwMDAxMDExMTAnLCAnMTEwMDEwMDExMDEwJyxcclxuICAvLyAxNTYwLTE1NjRcclxuICAnMTEwMTAxMDEwMTAxJywgJzAxMTAxMDExMDAxMCcsICcwMTEwMTAxMTEwMDEnLCAnMDEwMDEwMTExMDEwJywgJzEwMTAwMTAxMTEwMScsXHJcbiAgLy8gMTU2NS0xNTY5XHJcbiAgJzAxMDEwMDEwMTEwMScsICcxMDEwMTAwMTAxMDEnLCAnMTAxMTAxMDEwMDEwJywgJzEwMTExMDEwMTAwMCcsICcxMDExMTAxMTAxMDAnLFxyXG4gIC8vIDE1NzAtMTU3NFxyXG4gICcwMTAxMTAxMTEwMDEnLCAnMDAxMDExMDExMDEwJywgJzEwMDEwMTAxMTAxMCcsICcxMDExMDEwMDEwMTAnLCAnMTEwMTEwMTAwMTAwJyxcclxuICAvLyAxNTc1LTE1NzlcclxuICAnMTExMDExMDEwMDAxJywgJzAxMTAxMTEwMTAwMCcsICcxMDExMDExMDEwMTAnLCAnMDEwMTAxMTAxMTAxJywgJzAxMDEwMDExMDEwMScsXHJcbiAgLy8gMTU4MC0xNTg0XHJcbiAgJzAxMTAxMDAxMDEwMScsICcxMTAxMDEwMDEwMTAnLCAnMTEwMTEwMTAxMDAwJywgJzExMDExMTAxMDEwMCcsICcwMTEwMTEwMTEwMTAnLFxyXG4gIC8vIDE1ODUtMTU4OVxyXG4gICcwMTAxMDEwMTEwMTEnLCAnMDAxMDEwMDExMTAxJywgJzAxMTAwMDEwMTAxMScsICcxMDExMDAwMTAxMDEnLCAnMTAxMTAxMDAxMDEwJyxcclxuICAvLyAxNTkwLTE1OTRcclxuICAnMTAxMTEwMDEwMTAxJywgJzAxMDExMDEwMTAxMCcsICcxMDEwMTAxMDExMTAnLCAnMTAwMTAwMTAxMTEwJywgJzExMDAxMDAwMTExMScsXHJcbiAgLy8gMTU5NS0xNTk5XHJcbiAgJzAxMDEwMDEwMDExMScsICcwMTEwMTAwMTAxMDEnLCAnMDExMDEwMTAxMDEwJywgJzEwMTAxMTAxMDExMCcsICcwMTAxMDEwMTExMDEnLFxyXG4gIC8vIDE2MDBcclxuICAnMDAxMDEwMDExMTAxJ1xyXG5dO1xyXG5cclxuZnVuY3Rpb24gZ2V0RGF5c0RpZmYoZGF0ZTE6IERhdGUsIGRhdGUyOiBEYXRlKTogbnVtYmVyIHtcclxuICBjb25zdCBkaWZmID0gTWF0aC5hYnMoZGF0ZTEuZ2V0VGltZSgpIC0gZGF0ZTIuZ2V0VGltZSgpKTtcclxuICByZXR1cm4gTWF0aC5yb3VuZChkaWZmIC8gT05FX0RBWSk7XHJcbn1cclxuXHJcbkBJbmplY3RhYmxlKClcclxuZXhwb3J0IGNsYXNzIE5nYkNhbGVuZGFySXNsYW1pY1VtYWxxdXJhIGV4dGVuZHMgTmdiQ2FsZW5kYXJJc2xhbWljQ2l2aWwge1xyXG4gIC8qKlxyXG4gICogUmV0dXJucyB0aGUgZXF1aXZhbGVudCBpc2xhbWljKFVtYWxxdXJhKSBkYXRlIHZhbHVlIGZvciBhIGdpdmUgaW5wdXQgR3JlZ29yaWFuIGRhdGUuXHJcbiAgKiBgZ2RhdGVgIGlzIHMgSlMgRGF0ZSB0byBiZSBjb252ZXJ0ZWQgdG8gSGlqcmkuXHJcbiAgKi9cclxuICBmcm9tR3JlZ29yaWFuKGdEYXRlOiBEYXRlKTogTmdiRGF0ZSB7XHJcbiAgICBsZXQgaERheSA9IDEsIGhNb250aCA9IDAsIGhZZWFyID0gMTMwMDtcclxuICAgIGxldCBkYXlzRGlmZiA9IGdldERheXNEaWZmKGdEYXRlLCBHUkVHT1JJQU5fRklSU1RfREFURSk7XHJcbiAgICBpZiAoZ0RhdGUuZ2V0VGltZSgpIC0gR1JFR09SSUFOX0ZJUlNUX0RBVEUuZ2V0VGltZSgpID49IDAgJiYgZ0RhdGUuZ2V0VGltZSgpIC0gR1JFR09SSUFOX0xBU1RfREFURS5nZXRUaW1lKCkgPD0gMCkge1xyXG4gICAgICBsZXQgeWVhciA9IDEzMDA7XHJcbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgTU9OVEhfTEVOR1RILmxlbmd0aDsgaSsrLCB5ZWFyKyspIHtcclxuICAgICAgICBmb3IgKGxldCBqID0gMDsgaiA8IDEyOyBqKyspIHtcclxuICAgICAgICAgIGxldCBudW1PZkRheXMgPSArTU9OVEhfTEVOR1RIW2ldW2pdICsgMjk7XHJcbiAgICAgICAgICBpZiAoZGF5c0RpZmYgPD0gbnVtT2ZEYXlzKSB7XHJcbiAgICAgICAgICAgIGhEYXkgPSBkYXlzRGlmZiArIDE7XHJcbiAgICAgICAgICAgIGlmIChoRGF5ID4gbnVtT2ZEYXlzKSB7XHJcbiAgICAgICAgICAgICAgaERheSA9IDE7XHJcbiAgICAgICAgICAgICAgaisrO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmIChqID4gMTEpIHtcclxuICAgICAgICAgICAgICBqID0gMDtcclxuICAgICAgICAgICAgICB5ZWFyKys7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaE1vbnRoID0gajtcclxuICAgICAgICAgICAgaFllYXIgPSB5ZWFyO1xyXG4gICAgICAgICAgICByZXR1cm4gbmV3IE5nYkRhdGUoaFllYXIsIGhNb250aCArIDEsIGhEYXkpO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgICAgZGF5c0RpZmYgPSBkYXlzRGlmZiAtIG51bU9mRGF5cztcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHJldHVybiBzdXBlci5mcm9tR3JlZ29yaWFuKGdEYXRlKTtcclxuICAgIH1cclxuICB9XHJcbiAgLyoqXHJcbiAgKiBDb252ZXJ0cyB0aGUgY3VycmVudCBIaWpyaSBkYXRlIHRvIEdyZWdvcmlhbi5cclxuICAqL1xyXG4gIHRvR3JlZ29yaWFuKGhEYXRlOiBOZ2JEYXRlKTogRGF0ZSB7XHJcbiAgICBjb25zdCBoWWVhciA9IGhEYXRlLnllYXI7XHJcbiAgICBjb25zdCBoTW9udGggPSBoRGF0ZS5tb250aCAtIDE7XHJcbiAgICBjb25zdCBoRGF5ID0gaERhdGUuZGF5O1xyXG4gICAgbGV0IGdEYXRlID0gbmV3IERhdGUoR1JFR09SSUFOX0ZJUlNUX0RBVEUpO1xyXG4gICAgbGV0IGRheURpZmYgPSBoRGF5IC0gMTtcclxuICAgIGlmIChoWWVhciA+PSBISUpSSV9CRUdJTiAmJiBoWWVhciA8PSBISUpSSV9FTkQpIHtcclxuICAgICAgZm9yIChsZXQgeSA9IDA7IHkgPCBoWWVhciAtIEhJSlJJX0JFR0lOOyB5KyspIHtcclxuICAgICAgICBmb3IgKGxldCBtID0gMDsgbSA8IDEyOyBtKyspIHtcclxuICAgICAgICAgIGRheURpZmYgKz0gK01PTlRIX0xFTkdUSFt5XVttXSArIDI5O1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgICBmb3IgKGxldCBtID0gMDsgbSA8IGhNb250aDsgbSsrKSB7XHJcbiAgICAgICAgZGF5RGlmZiArPSArTU9OVEhfTEVOR1RIW2hZZWFyIC0gSElKUklfQkVHSU5dW21dICsgMjk7XHJcbiAgICAgIH1cclxuICAgICAgZ0RhdGUuc2V0RGF0ZShHUkVHT1JJQU5fRklSU1RfREFURS5nZXREYXRlKCkgKyBkYXlEaWZmKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIGdEYXRlID0gc3VwZXIudG9HcmVnb3JpYW4oaERhdGUpO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIGdEYXRlO1xyXG4gIH1cclxuICAvKipcclxuICAqIFJldHVybnMgdGhlIG51bWJlciBvZiBkYXlzIGluIGEgc3BlY2lmaWMgSGlqcmkgaE1vbnRoLlxyXG4gICogYGhNb250aGAgaXMgMSBmb3IgTXVoYXJyYW0sIDIgZm9yIFNhZmFyLCBldGMuXHJcbiAgKiBgaFllYXJgIGlzIGFueSBIaWpyaSBoWWVhci5cclxuICAqL1xyXG4gIGdldERheXNQZXJNb250aChoTW9udGg6IG51bWJlciwgaFllYXI6IG51bWJlcik6IG51bWJlciB7XHJcbiAgICBpZiAoaFllYXIgPj0gSElKUklfQkVHSU4gJiYgaFllYXIgPD0gSElKUklfRU5EKSB7XHJcbiAgICAgIGNvbnN0IHBvcyA9IGhZZWFyIC0gSElKUklfQkVHSU47XHJcbiAgICAgIHJldHVybiArTU9OVEhfTEVOR1RIW3Bvc11baE1vbnRoIC0gMV0gKyAyOTtcclxuICAgIH1cclxuICAgIHJldHVybiBzdXBlci5nZXREYXlzUGVyTW9udGgoaE1vbnRoLCBoWWVhcik7XHJcbiAgfVxyXG59XHJcbiIsImltcG9ydCB7TmdiRGF0ZX0gZnJvbSAnLi4vbmdiLWRhdGUnO1xyXG5cclxuLyoqXHJcbiAqIFJldHVybnMgdGhlIGVxdWl2YWxlbnQgSlMgZGF0ZSB2YWx1ZSBmb3IgYSBnaXZlIGlucHV0IEphbGFsaSBkYXRlLlxyXG4gKiBgamFsYWxpRGF0ZWAgaXMgYW4gSmFsYWxpIGRhdGUgdG8gYmUgY29udmVydGVkIHRvIEdyZWdvcmlhbi5cclxuICovXHJcbmV4cG9ydCBmdW5jdGlvbiB0b0dyZWdvcmlhbihqYWxhbGlEYXRlOiBOZ2JEYXRlKTogRGF0ZSB7XHJcbiAgbGV0IGpkbiA9IGphbGFsaVRvSnVsaWFuKGphbGFsaURhdGUueWVhciwgamFsYWxpRGF0ZS5tb250aCwgamFsYWxpRGF0ZS5kYXkpO1xyXG4gIGxldCBkYXRlID0ganVsaWFuVG9HcmVnb3JpYW4oamRuKTtcclxuICBkYXRlLnNldEhvdXJzKDYsIDMwLCAzLCAyMDApO1xyXG4gIHJldHVybiBkYXRlO1xyXG59XHJcblxyXG4vKipcclxuICogUmV0dXJucyB0aGUgZXF1aXZhbGVudCBqYWxhbGkgZGF0ZSB2YWx1ZSBmb3IgYSBnaXZlIGlucHV0IEdyZWdvcmlhbiBkYXRlLlxyXG4gKiBgZ2RhdGVgIGlzIGEgSlMgRGF0ZSB0byBiZSBjb252ZXJ0ZWQgdG8gamFsYWxpLlxyXG4gKiB1dGMgdG8gbG9jYWxcclxuICovXHJcbmV4cG9ydCBmdW5jdGlvbiBmcm9tR3JlZ29yaWFuKGdkYXRlOiBEYXRlKTogTmdiRGF0ZSB7XHJcbiAgbGV0IGcyZCA9IGdyZWdvcmlhblRvSnVsaWFuKGdkYXRlLmdldEZ1bGxZZWFyKCksIGdkYXRlLmdldE1vbnRoKCkgKyAxLCBnZGF0ZS5nZXREYXRlKCkpO1xyXG4gIHJldHVybiBqdWxpYW5Ub0phbGFsaShnMmQpO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gc2V0SmFsYWxpWWVhcihkYXRlOiBOZ2JEYXRlLCB5ZWFyVmFsdWU6IG51bWJlcik6IE5nYkRhdGUge1xyXG4gIGRhdGUueWVhciA9ICt5ZWFyVmFsdWU7XHJcbiAgcmV0dXJuIGRhdGU7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBzZXRKYWxhbGlNb250aChkYXRlOiBOZ2JEYXRlLCBtb250aDogbnVtYmVyKTogTmdiRGF0ZSB7XHJcbiAgbW9udGggPSArbW9udGg7XHJcbiAgZGF0ZS55ZWFyID0gZGF0ZS55ZWFyICsgTWF0aC5mbG9vcigobW9udGggLSAxKSAvIDEyKTtcclxuICBkYXRlLm1vbnRoID0gTWF0aC5mbG9vcigoKG1vbnRoIC0gMSkgJSAxMiArIDEyKSAlIDEyKSArIDE7XHJcbiAgcmV0dXJuIGRhdGU7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBzZXRKYWxhbGlEYXkoZGF0ZTogTmdiRGF0ZSwgZGF5OiBudW1iZXIpOiBOZ2JEYXRlIHtcclxuICBsZXQgbURheXMgPSBnZXREYXlzUGVyTW9udGgoZGF0ZS5tb250aCwgZGF0ZS55ZWFyKTtcclxuICBpZiAoZGF5IDw9IDApIHtcclxuICAgIHdoaWxlIChkYXkgPD0gMCkge1xyXG4gICAgICBkYXRlID0gc2V0SmFsYWxpTW9udGgoZGF0ZSwgZGF0ZS5tb250aCAtIDEpO1xyXG4gICAgICBtRGF5cyA9IGdldERheXNQZXJNb250aChkYXRlLm1vbnRoLCBkYXRlLnllYXIpO1xyXG4gICAgICBkYXkgKz0gbURheXM7XHJcbiAgICB9XHJcbiAgfSBlbHNlIGlmIChkYXkgPiBtRGF5cykge1xyXG4gICAgd2hpbGUgKGRheSA+IG1EYXlzKSB7XHJcbiAgICAgIGRheSAtPSBtRGF5cztcclxuICAgICAgZGF0ZSA9IHNldEphbGFsaU1vbnRoKGRhdGUsIGRhdGUubW9udGggKyAxKTtcclxuICAgICAgbURheXMgPSBnZXREYXlzUGVyTW9udGgoZGF0ZS5tb250aCwgZGF0ZS55ZWFyKTtcclxuICAgIH1cclxuICB9XHJcbiAgZGF0ZS5kYXkgPSBkYXk7XHJcbiAgcmV0dXJuIGRhdGU7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIG1vZChhOiBudW1iZXIsIGI6IG51bWJlcik6IG51bWJlciB7XHJcbiAgcmV0dXJuIGEgLSBiICogTWF0aC5mbG9vcihhIC8gYik7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGRpdihhOiBudW1iZXIsIGI6IG51bWJlcikge1xyXG4gIHJldHVybiBNYXRoLnRydW5jKGEgLyBiKTtcclxufVxyXG5cclxuLypcclxuIFRoaXMgZnVuY3Rpb24gZGV0ZXJtaW5lcyBpZiB0aGUgSmFsYWxpIChQZXJzaWFuKSB5ZWFyIGlzXHJcbiBsZWFwICgzNjYtZGF5IGxvbmcpIG9yIGlzIHRoZSBjb21tb24geWVhciAoMzY1IGRheXMpLCBhbmRcclxuIGZpbmRzIHRoZSBkYXkgaW4gTWFyY2ggKEdyZWdvcmlhbiBjYWxlbmRhcikgb2YgdGhlIGZpcnN0XHJcbiBkYXkgb2YgdGhlIEphbGFsaSB5ZWFyIChqYWxhbGlZZWFyKS5cclxuIEBwYXJhbSBqYWxhbGlZZWFyIEphbGFsaSBjYWxlbmRhciB5ZWFyICgtNjEgdG8gMzE3NylcclxuIEByZXR1cm5cclxuIGxlYXA6IG51bWJlciBvZiB5ZWFycyBzaW5jZSB0aGUgbGFzdCBsZWFwIHllYXIgKDAgdG8gNClcclxuIGdZZWFyOiBHcmVnb3JpYW4geWVhciBvZiB0aGUgYmVnaW5uaW5nIG9mIEphbGFsaSB5ZWFyXHJcbiBtYXJjaDogdGhlIE1hcmNoIGRheSBvZiBGYXJ2YXJkaW4gdGhlIDFzdCAoMXN0IGRheSBvZiBqYWxhbGlZZWFyKVxyXG4gQHNlZTogaHR0cDovL3d3dy5hc3Ryby51bmkudG9ydW4ucGwvfmtiL1BhcGVycy9FTVAvUGVyc2lhbkMtRU1QLmh0bVxyXG4gQHNlZTogaHR0cDovL3d3dy5mb3VybWlsYWIuY2gvZG9jdW1lbnRzL2NhbGVuZGFyL1xyXG4gKi9cclxuZnVuY3Rpb24gamFsQ2FsKGphbGFsaVllYXI6IG51bWJlcikge1xyXG4gIC8vIEphbGFsaSB5ZWFycyBzdGFydGluZyB0aGUgMzMteWVhciBydWxlLlxyXG4gIGxldCBicmVha3MgPVxyXG4gICAgICBbLTYxLCA5LCAzOCwgMTk5LCA0MjYsIDY4NiwgNzU2LCA4MTgsIDExMTEsIDExODEsIDEyMTAsIDE2MzUsIDIwNjAsIDIwOTcsIDIxOTIsIDIyNjIsIDIzMjQsIDIzOTQsIDI0NTYsIDMxNzhdO1xyXG4gIGNvbnN0IGJyZWFrc0xlbmd0aCA9IGJyZWFrcy5sZW5ndGg7XHJcbiAgY29uc3QgZ1llYXIgPSBqYWxhbGlZZWFyICsgNjIxO1xyXG4gIGxldCBsZWFwSiA9IC0xNDtcclxuICBsZXQganAgPSBicmVha3NbMF07XHJcblxyXG4gIGlmIChqYWxhbGlZZWFyIDwganAgfHwgamFsYWxpWWVhciA+PSBicmVha3NbYnJlYWtzTGVuZ3RoIC0gMV0pIHtcclxuICAgIHRocm93IG5ldyBFcnJvcignSW52YWxpZCBKYWxhbGkgeWVhciAnICsgamFsYWxpWWVhcik7XHJcbiAgfVxyXG5cclxuICAvLyBGaW5kIHRoZSBsaW1pdGluZyB5ZWFycyBmb3IgdGhlIEphbGFsaSB5ZWFyIGphbGFsaVllYXIuXHJcbiAgbGV0IGp1bXA7XHJcbiAgZm9yIChsZXQgaSA9IDE7IGkgPCBicmVha3NMZW5ndGg7IGkgKz0gMSkge1xyXG4gICAgY29uc3Qgam0gPSBicmVha3NbaV07XHJcbiAgICBqdW1wID0gam0gLSBqcDtcclxuICAgIGlmIChqYWxhbGlZZWFyIDwgam0pIHtcclxuICAgICAgYnJlYWs7XHJcbiAgICB9XHJcbiAgICBsZWFwSiA9IGxlYXBKICsgZGl2KGp1bXAsIDMzKSAqIDggKyBkaXYobW9kKGp1bXAsIDMzKSwgNCk7XHJcbiAgICBqcCA9IGptO1xyXG4gIH1cclxuICBsZXQgbiA9IGphbGFsaVllYXIgLSBqcDtcclxuXHJcbiAgLy8gRmluZCB0aGUgbnVtYmVyIG9mIGxlYXAgeWVhcnMgZnJvbSBBRCA2MjEgdG8gdGhlIGJlZ2lubmluZ1xyXG4gIC8vIG9mIHRoZSBjdXJyZW50IEphbGFsaSB5ZWFyIGluIHRoZSBQZXJzaWFuIGNhbGVuZGFyLlxyXG4gIGxlYXBKID0gbGVhcEogKyBkaXYobiwgMzMpICogOCArIGRpdihtb2QobiwgMzMpICsgMywgNCk7XHJcbiAgaWYgKG1vZChqdW1wLCAzMykgPT09IDQgJiYganVtcCAtIG4gPT09IDQpIHtcclxuICAgIGxlYXBKICs9IDE7XHJcbiAgfVxyXG5cclxuICAvLyBBbmQgdGhlIHNhbWUgaW4gdGhlIEdyZWdvcmlhbiBjYWxlbmRhciAodW50aWwgdGhlIHllYXIgZ1llYXIpLlxyXG4gIGNvbnN0IGxlYXBHID0gZGl2KGdZZWFyLCA0KSAtIGRpdigoZGl2KGdZZWFyLCAxMDApICsgMSkgKiAzLCA0KSAtIDE1MDtcclxuXHJcbiAgLy8gRGV0ZXJtaW5lIHRoZSBHcmVnb3JpYW4gZGF0ZSBvZiBGYXJ2YXJkaW4gdGhlIDFzdC5cclxuICBjb25zdCBtYXJjaCA9IDIwICsgbGVhcEogLSBsZWFwRztcclxuXHJcbiAgLy8gRmluZCBob3cgbWFueSB5ZWFycyBoYXZlIHBhc3NlZCBzaW5jZSB0aGUgbGFzdCBsZWFwIHllYXIuXHJcbiAgaWYgKGp1bXAgLSBuIDwgNikge1xyXG4gICAgbiA9IG4gLSBqdW1wICsgZGl2KGp1bXAgKyA0LCAzMykgKiAzMztcclxuICB9XHJcbiAgbGV0IGxlYXAgPSBtb2QobW9kKG4gKyAxLCAzMykgLSAxLCA0KTtcclxuICBpZiAobGVhcCA9PT0gLTEpIHtcclxuICAgIGxlYXAgPSA0O1xyXG4gIH1cclxuXHJcbiAgcmV0dXJuIHtsZWFwOiBsZWFwLCBneTogZ1llYXIsIG1hcmNoOiBtYXJjaH07XHJcbn1cclxuXHJcbi8qXHJcbiBDYWxjdWxhdGVzIEdyZWdvcmlhbiBhbmQgSnVsaWFuIGNhbGVuZGFyIGRhdGVzIGZyb20gdGhlIEp1bGlhbiBEYXkgbnVtYmVyXHJcbiAoamRuKSBmb3IgdGhlIHBlcmlvZCBzaW5jZSBqZG49LTM0ODM5NjU1IChpLmUuIHRoZSB5ZWFyIC0xMDAxMDAgb2YgYm90aFxyXG4gY2FsZW5kYXJzKSB0byBzb21lIG1pbGxpb25zIHllYXJzIGFoZWFkIG9mIHRoZSBwcmVzZW50LlxyXG4gQHBhcmFtIGpkbiBKdWxpYW4gRGF5IG51bWJlclxyXG4gQHJldHVyblxyXG4gZ1llYXI6IENhbGVuZGFyIHllYXIgKHllYXJzIEJDIG51bWJlcmVkIDAsIC0xLCAtMiwgLi4uKVxyXG4gZ01vbnRoOiBDYWxlbmRhciBtb250aCAoMSB0byAxMilcclxuIGdEYXk6IENhbGVuZGFyIGRheSBvZiB0aGUgbW9udGggTSAoMSB0byAyOC8yOS8zMC8zMSlcclxuICovXHJcbmZ1bmN0aW9uIGp1bGlhblRvR3JlZ29yaWFuKGp1bGlhbkRheU51bWJlcjogbnVtYmVyKSB7XHJcbiAgbGV0IGogPSA0ICoganVsaWFuRGF5TnVtYmVyICsgMTM5MzYxNjMxO1xyXG4gIGogPSBqICsgZGl2KGRpdig0ICoganVsaWFuRGF5TnVtYmVyICsgMTgzMTg3NzIwLCAxNDYwOTcpICogMywgNCkgKiA0IC0gMzkwODtcclxuICBjb25zdCBpID0gZGl2KG1vZChqLCAxNDYxKSwgNCkgKiA1ICsgMzA4O1xyXG4gIGNvbnN0IGdEYXkgPSBkaXYobW9kKGksIDE1MyksIDUpICsgMTtcclxuICBjb25zdCBnTW9udGggPSBtb2QoZGl2KGksIDE1MyksIDEyKSArIDE7XHJcbiAgY29uc3QgZ1llYXIgPSBkaXYoaiwgMTQ2MSkgLSAxMDAxMDAgKyBkaXYoOCAtIGdNb250aCwgNik7XHJcblxyXG4gIHJldHVybiBuZXcgRGF0ZShnWWVhciwgZ01vbnRoIC0gMSwgZ0RheSk7XHJcbn1cclxuXHJcbi8qXHJcbiBDb252ZXJ0cyBhIGRhdGUgb2YgdGhlIEphbGFsaSBjYWxlbmRhciB0byB0aGUgSnVsaWFuIERheSBudW1iZXIuXHJcbiBAcGFyYW0gankgSmFsYWxpIHllYXIgKDEgdG8gMzEwMClcclxuIEBwYXJhbSBqbSBKYWxhbGkgbW9udGggKDEgdG8gMTIpXHJcbiBAcGFyYW0gamQgSmFsYWxpIGRheSAoMSB0byAyOS8zMSlcclxuIEByZXR1cm4gSnVsaWFuIERheSBudW1iZXJcclxuICovXHJcbmZ1bmN0aW9uIGdyZWdvcmlhblRvSnVsaWFuKGd5OiBudW1iZXIsIGdtOiBudW1iZXIsIGdkOiBudW1iZXIpIHtcclxuICBsZXQgZCA9IGRpdigoZ3kgKyBkaXYoZ20gLSA4LCA2KSArIDEwMDEwMCkgKiAxNDYxLCA0KSArIGRpdigxNTMgKiBtb2QoZ20gKyA5LCAxMikgKyAyLCA1KSArIGdkIC0gMzQ4NDA0MDg7XHJcbiAgZCA9IGQgLSBkaXYoZGl2KGd5ICsgMTAwMTAwICsgZGl2KGdtIC0gOCwgNiksIDEwMCkgKiAzLCA0KSArIDc1MjtcclxuICByZXR1cm4gZDtcclxufVxyXG5cclxuLypcclxuIENvbnZlcnRzIHRoZSBKdWxpYW4gRGF5IG51bWJlciB0byBhIGRhdGUgaW4gdGhlIEphbGFsaSBjYWxlbmRhci5cclxuIEBwYXJhbSBqdWxpYW5EYXlOdW1iZXIgSnVsaWFuIERheSBudW1iZXJcclxuIEByZXR1cm5cclxuIGphbGFsaVllYXI6IEphbGFsaSB5ZWFyICgxIHRvIDMxMDApXHJcbiBqYWxhbGlNb250aDogSmFsYWxpIG1vbnRoICgxIHRvIDEyKVxyXG4gamFsYWxpRGF5OiBKYWxhbGkgZGF5ICgxIHRvIDI5LzMxKVxyXG4gKi9cclxuZnVuY3Rpb24ganVsaWFuVG9KYWxhbGkoanVsaWFuRGF5TnVtYmVyOiBudW1iZXIpIHtcclxuICBsZXQgZ3kgPSBqdWxpYW5Ub0dyZWdvcmlhbihqdWxpYW5EYXlOdW1iZXIpLmdldEZ1bGxZZWFyKCkgIC8vIENhbGN1bGF0ZSBHcmVnb3JpYW4geWVhciAoZ3kpLlxyXG4gICAgICAsXHJcbiAgICAgIGphbGFsaVllYXIgPSBneSAtIDYyMSwgciA9IGphbENhbChqYWxhbGlZZWFyKSwgZ3JlZ29yaWFuRGF5ID0gZ3JlZ29yaWFuVG9KdWxpYW4oZ3ksIDMsIHIubWFyY2gpLCBqYWxhbGlEYXksXHJcbiAgICAgIGphbGFsaU1vbnRoLCBudW1iZXJPZkRheXM7XHJcblxyXG4gIC8vIEZpbmQgbnVtYmVyIG9mIGRheXMgdGhhdCBwYXNzZWQgc2luY2UgMSBGYXJ2YXJkaW4uXHJcbiAgbnVtYmVyT2ZEYXlzID0ganVsaWFuRGF5TnVtYmVyIC0gZ3JlZ29yaWFuRGF5O1xyXG4gIGlmIChudW1iZXJPZkRheXMgPj0gMCkge1xyXG4gICAgaWYgKG51bWJlck9mRGF5cyA8PSAxODUpIHtcclxuICAgICAgLy8gVGhlIGZpcnN0IDYgbW9udGhzLlxyXG4gICAgICBqYWxhbGlNb250aCA9IDEgKyBkaXYobnVtYmVyT2ZEYXlzLCAzMSk7XHJcbiAgICAgIGphbGFsaURheSA9IG1vZChudW1iZXJPZkRheXMsIDMxKSArIDE7XHJcbiAgICAgIHJldHVybiBuZXcgTmdiRGF0ZShqYWxhbGlZZWFyLCBqYWxhbGlNb250aCwgamFsYWxpRGF5KTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIC8vIFRoZSByZW1haW5pbmcgbW9udGhzLlxyXG4gICAgICBudW1iZXJPZkRheXMgLT0gMTg2O1xyXG4gICAgfVxyXG4gIH0gZWxzZSB7XHJcbiAgICAvLyBQcmV2aW91cyBKYWxhbGkgeWVhci5cclxuICAgIGphbGFsaVllYXIgLT0gMTtcclxuICAgIG51bWJlck9mRGF5cyArPSAxNzk7XHJcbiAgICBpZiAoci5sZWFwID09PSAxKSB7XHJcbiAgICAgIG51bWJlck9mRGF5cyArPSAxO1xyXG4gICAgfVxyXG4gIH1cclxuICBqYWxhbGlNb250aCA9IDcgKyBkaXYobnVtYmVyT2ZEYXlzLCAzMCk7XHJcbiAgamFsYWxpRGF5ID0gbW9kKG51bWJlck9mRGF5cywgMzApICsgMTtcclxuXHJcbiAgcmV0dXJuIG5ldyBOZ2JEYXRlKGphbGFsaVllYXIsIGphbGFsaU1vbnRoLCBqYWxhbGlEYXkpO1xyXG59XHJcblxyXG4vKlxyXG4gQ29udmVydHMgYSBkYXRlIG9mIHRoZSBKYWxhbGkgY2FsZW5kYXIgdG8gdGhlIEp1bGlhbiBEYXkgbnVtYmVyLlxyXG4gQHBhcmFtIGpZZWFyIEphbGFsaSB5ZWFyICgxIHRvIDMxMDApXHJcbiBAcGFyYW0gak1vbnRoIEphbGFsaSBtb250aCAoMSB0byAxMilcclxuIEBwYXJhbSBqRGF5IEphbGFsaSBkYXkgKDEgdG8gMjkvMzEpXHJcbiBAcmV0dXJuIEp1bGlhbiBEYXkgbnVtYmVyXHJcbiAqL1xyXG5mdW5jdGlvbiBqYWxhbGlUb0p1bGlhbihqWWVhcjogbnVtYmVyLCBqTW9udGg6IG51bWJlciwgakRheTogbnVtYmVyKSB7XHJcbiAgbGV0IHIgPSBqYWxDYWwoalllYXIpO1xyXG4gIHJldHVybiBncmVnb3JpYW5Ub0p1bGlhbihyLmd5LCAzLCByLm1hcmNoKSArIChqTW9udGggLSAxKSAqIDMxIC0gZGl2KGpNb250aCwgNykgKiAoak1vbnRoIC0gNykgKyBqRGF5IC0gMTtcclxufVxyXG5cclxuLyoqXHJcbiAqIFJldHVybnMgdGhlIG51bWJlciBvZiBkYXlzIGluIGEgc3BlY2lmaWMgamFsYWxpIG1vbnRoLlxyXG4gKi9cclxuZnVuY3Rpb24gZ2V0RGF5c1Blck1vbnRoKG1vbnRoOiBudW1iZXIsIHllYXI6IG51bWJlcik6IG51bWJlciB7XHJcbiAgaWYgKG1vbnRoIDw9IDYpIHtcclxuICAgIHJldHVybiAzMTtcclxuICB9XHJcbiAgaWYgKG1vbnRoIDw9IDExKSB7XHJcbiAgICByZXR1cm4gMzA7XHJcbiAgfVxyXG4gIGlmIChqYWxDYWwoeWVhcikubGVhcCA9PT0gMCkge1xyXG4gICAgcmV0dXJuIDMwO1xyXG4gIH1cclxuICByZXR1cm4gMjk7XHJcbn1cclxuIiwiaW1wb3J0IHtJbmplY3RhYmxlfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHtOZ2JEYXRlfSBmcm9tICcuLi9uZ2ItZGF0ZSc7XHJcbmltcG9ydCB7TmdiQ2FsZW5kYXIsIE5nYlBlcmlvZH0gZnJvbSAnLi4vbmdiLWNhbGVuZGFyJztcclxuaW1wb3J0IHtpc0ludGVnZXJ9IGZyb20gJy4uLy4uL3V0aWwvdXRpbCc7XHJcblxyXG5pbXBvcnQge2Zyb21HcmVnb3JpYW4sIHNldEphbGFsaURheSwgc2V0SmFsYWxpTW9udGgsIHNldEphbGFsaVllYXIsIHRvR3JlZ29yaWFufSBmcm9tICcuL2phbGFsaSc7XHJcblxyXG5ASW5qZWN0YWJsZSgpXHJcbmV4cG9ydCBjbGFzcyBOZ2JDYWxlbmRhclBlcnNpYW4gZXh0ZW5kcyBOZ2JDYWxlbmRhciB7XHJcbiAgZ2V0RGF5c1BlcldlZWsoKSB7IHJldHVybiA3OyB9XHJcblxyXG4gIGdldE1vbnRocygpIHsgcmV0dXJuIFsxLCAyLCAzLCA0LCA1LCA2LCA3LCA4LCA5LCAxMCwgMTEsIDEyXTsgfVxyXG5cclxuICBnZXRXZWVrc1Blck1vbnRoKCkgeyByZXR1cm4gNjsgfVxyXG5cclxuICBnZXROZXh0KGRhdGU6IE5nYkRhdGUsIHBlcmlvZDogTmdiUGVyaW9kID0gJ2QnLCBudW1iZXIgPSAxKSB7XHJcbiAgICBkYXRlID0gbmV3IE5nYkRhdGUoZGF0ZS55ZWFyLCBkYXRlLm1vbnRoLCBkYXRlLmRheSk7XHJcblxyXG4gICAgc3dpdGNoIChwZXJpb2QpIHtcclxuICAgICAgY2FzZSAneSc6XHJcbiAgICAgICAgZGF0ZSA9IHNldEphbGFsaVllYXIoZGF0ZSwgZGF0ZS55ZWFyICsgbnVtYmVyKTtcclxuICAgICAgICBkYXRlLm1vbnRoID0gMTtcclxuICAgICAgICBkYXRlLmRheSA9IDE7XHJcbiAgICAgICAgcmV0dXJuIGRhdGU7XHJcbiAgICAgIGNhc2UgJ20nOlxyXG4gICAgICAgIGRhdGUgPSBzZXRKYWxhbGlNb250aChkYXRlLCBkYXRlLm1vbnRoICsgbnVtYmVyKTtcclxuICAgICAgICBkYXRlLmRheSA9IDE7XHJcbiAgICAgICAgcmV0dXJuIGRhdGU7XHJcbiAgICAgIGNhc2UgJ2QnOlxyXG4gICAgICAgIHJldHVybiBzZXRKYWxhbGlEYXkoZGF0ZSwgZGF0ZS5kYXkgKyBudW1iZXIpO1xyXG4gICAgICBkZWZhdWx0OlxyXG4gICAgICAgIHJldHVybiBkYXRlO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgZ2V0UHJldihkYXRlOiBOZ2JEYXRlLCBwZXJpb2Q6IE5nYlBlcmlvZCA9ICdkJywgbnVtYmVyID0gMSkgeyByZXR1cm4gdGhpcy5nZXROZXh0KGRhdGUsIHBlcmlvZCwgLW51bWJlcik7IH1cclxuXHJcbiAgZ2V0V2Vla2RheShkYXRlOiBOZ2JEYXRlKSB7XHJcbiAgICBjb25zdCBkYXkgPSB0b0dyZWdvcmlhbihkYXRlKS5nZXREYXkoKTtcclxuICAgIC8vIGluIEpTIERhdGUgU3VuPTAsIGluIElTTyA4NjAxIFN1bj03XHJcbiAgICByZXR1cm4gZGF5ID09PSAwID8gNyA6IGRheTtcclxuICB9XHJcblxyXG4gIGdldFdlZWtOdW1iZXIod2VlazogTmdiRGF0ZVtdLCBmaXJzdERheU9mV2VlazogbnVtYmVyKSB7XHJcbiAgICAvLyBpbiBKUyBEYXRlIFN1bj0wLCBpbiBJU08gODYwMSBTdW49N1xyXG4gICAgaWYgKGZpcnN0RGF5T2ZXZWVrID09PSA3KSB7XHJcbiAgICAgIGZpcnN0RGF5T2ZXZWVrID0gMDtcclxuICAgIH1cclxuXHJcbiAgICBjb25zdCB0aHVyc2RheUluZGV4ID0gKDQgKyA3IC0gZmlyc3REYXlPZldlZWspICUgNztcclxuICAgIGNvbnN0IGRhdGUgPSB3ZWVrW3RodXJzZGF5SW5kZXhdO1xyXG5cclxuICAgIGNvbnN0IGpzRGF0ZSA9IHRvR3JlZ29yaWFuKGRhdGUpO1xyXG4gICAganNEYXRlLnNldERhdGUoanNEYXRlLmdldERhdGUoKSArIDQgLSAoanNEYXRlLmdldERheSgpIHx8IDcpKTsgIC8vIFRodXJzZGF5XHJcbiAgICBjb25zdCB0aW1lID0ganNEYXRlLmdldFRpbWUoKTtcclxuICAgIGNvbnN0IHN0YXJ0RGF0ZSA9IHRvR3JlZ29yaWFuKG5ldyBOZ2JEYXRlKGRhdGUueWVhciwgMSwgMSkpO1xyXG4gICAgcmV0dXJuIE1hdGguZmxvb3IoTWF0aC5yb3VuZCgodGltZSAtIHN0YXJ0RGF0ZS5nZXRUaW1lKCkpIC8gODY0MDAwMDApIC8gNykgKyAxO1xyXG4gIH1cclxuXHJcbiAgZ2V0VG9kYXkoKTogTmdiRGF0ZSB7IHJldHVybiBmcm9tR3JlZ29yaWFuKG5ldyBEYXRlKCkpOyB9XHJcblxyXG4gIGlzVmFsaWQoZGF0ZTogTmdiRGF0ZSk6IGJvb2xlYW4ge1xyXG4gICAgcmV0dXJuIGRhdGUgJiYgaXNJbnRlZ2VyKGRhdGUueWVhcikgJiYgaXNJbnRlZ2VyKGRhdGUubW9udGgpICYmIGlzSW50ZWdlcihkYXRlLmRheSkgJiZcclxuICAgICAgICAhaXNOYU4odG9HcmVnb3JpYW4oZGF0ZSkuZ2V0VGltZSgpKTtcclxuICB9XHJcbn1cclxuIiwiaW1wb3J0IHtOZ2JEYXRlfSBmcm9tICcuLi9uZ2ItZGF0ZSc7XHJcbmltcG9ydCB7TmdiRGF0ZVN0cnVjdH0gZnJvbSAnLi4vbmdiLWRhdGUtc3RydWN0JztcclxuXHJcbmNvbnN0IFBBUlRTX1BFUl9IT1VSID0gMTA4MDtcclxuY29uc3QgUEFSVFNfUEVSX0RBWSA9IDI0ICogUEFSVFNfUEVSX0hPVVI7XHJcbmNvbnN0IFBBUlRTX0ZSQUNUSU9OQUxfTU9OVEggPSAxMiAqIFBBUlRTX1BFUl9IT1VSICsgNzkzO1xyXG5jb25zdCBQQVJUU19QRVJfTU9OVEggPSAyOSAqIFBBUlRTX1BFUl9EQVkgKyBQQVJUU19GUkFDVElPTkFMX01PTlRIO1xyXG5jb25zdCBCQUhBUkFEID0gMTEgKiBQQVJUU19QRVJfSE9VUiArIDIwNDtcclxuY29uc3QgSEVCUkVXX0RBWV9PTl9KQU5fMV8xOTcwID0gMjA5MjU5MTtcclxuY29uc3QgR1JFR09SSUFOX0VQT0NIID0gMTcyMTQyNS41O1xyXG5cclxuZnVuY3Rpb24gaXNHcmVnb3JpYW5MZWFwWWVhcih5ZWFyOiBudW1iZXIpOiBib29sZWFuIHtcclxuICByZXR1cm4geWVhciAlIDQgPT09IDAgJiYgeWVhciAlIDEwMCAhPT0gMCB8fCB5ZWFyICUgNDAwID09PSAwO1xyXG59XHJcblxyXG5mdW5jdGlvbiBudW1iZXJPZkZpcnN0RGF5SW5ZZWFyKHllYXI6IG51bWJlcik6IG51bWJlciB7XHJcbiAgbGV0IG1vbnRoc0JlZm9yZVllYXIgPSBNYXRoLmZsb29yKCgyMzUgKiB5ZWFyIC0gMjM0KSAvIDE5KTtcclxuICBsZXQgZnJhY3Rpb25hbE1vbnRoc0JlZm9yZVllYXIgPSBtb250aHNCZWZvcmVZZWFyICogUEFSVFNfRlJBQ1RJT05BTF9NT05USCArIEJBSEFSQUQ7XHJcbiAgbGV0IGRheU51bWJlciA9IG1vbnRoc0JlZm9yZVllYXIgKiAyOSArIE1hdGguZmxvb3IoZnJhY3Rpb25hbE1vbnRoc0JlZm9yZVllYXIgLyBQQVJUU19QRVJfREFZKTtcclxuICBsZXQgdGltZU9mRGF5ID0gZnJhY3Rpb25hbE1vbnRoc0JlZm9yZVllYXIgJSBQQVJUU19QRVJfREFZO1xyXG5cclxuICBsZXQgZGF5T2ZXZWVrID0gZGF5TnVtYmVyICUgNzsgIC8vIDAgPT0gTW9uZGF5XHJcblxyXG4gIGlmIChkYXlPZldlZWsgPT09IDIgfHwgZGF5T2ZXZWVrID09PSA0IHx8IGRheU9mV2VlayA9PT0gNikge1xyXG4gICAgZGF5TnVtYmVyKys7XHJcbiAgICBkYXlPZldlZWsgPSBkYXlOdW1iZXIgJSA3O1xyXG4gIH1cclxuICBpZiAoZGF5T2ZXZWVrID09PSAxICYmIHRpbWVPZkRheSA+IDE1ICogUEFSVFNfUEVSX0hPVVIgKyAyMDQgJiYgIWlzSGVicmV3TGVhcFllYXIoeWVhcikpIHtcclxuICAgIGRheU51bWJlciArPSAyO1xyXG4gIH0gZWxzZSBpZiAoZGF5T2ZXZWVrID09PSAwICYmIHRpbWVPZkRheSA+IDIxICogUEFSVFNfUEVSX0hPVVIgKyA1ODkgJiYgaXNIZWJyZXdMZWFwWWVhcih5ZWFyIC0gMSkpIHtcclxuICAgIGRheU51bWJlcisrO1xyXG4gIH1cclxuICByZXR1cm4gZGF5TnVtYmVyO1xyXG59XHJcblxyXG5mdW5jdGlvbiBnZXREYXlzSW5HcmVnb3JpYW5Nb250aChtb250aDogbnVtYmVyLCB5ZWFyOiBudW1iZXIpOiBudW1iZXIge1xyXG4gIGxldCBkYXlzID0gWzMxLCAyOCwgMzEsIDMwLCAzMSwgMzAsIDMxLCAzMSwgMzAsIDMxLCAzMCwgMzFdO1xyXG4gIGlmIChpc0dyZWdvcmlhbkxlYXBZZWFyKHllYXIpKSB7XHJcbiAgICBkYXlzWzFdKys7XHJcbiAgfVxyXG4gIHJldHVybiBkYXlzW21vbnRoIC0gMV07XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGdldEhlYnJld01vbnRocyh5ZWFyOiBudW1iZXIpOiBudW1iZXIge1xyXG4gIHJldHVybiBpc0hlYnJld0xlYXBZZWFyKHllYXIpID8gMTMgOiAxMjtcclxufVxyXG5cclxuLyoqXHJcbiAqIFJldHVybnMgdGhlIG51bWJlciBvZiBkYXlzIGluIGEgc3BlY2lmaWMgSGVicmV3IHllYXIuXHJcbiAqIGB5ZWFyYCBpcyBhbnkgSGVicmV3IHllYXIuXHJcbiAqL1xyXG5mdW5jdGlvbiBnZXREYXlzSW5IZWJyZXdZZWFyKHllYXI6IG51bWJlcik6IG51bWJlciB7XHJcbiAgcmV0dXJuIG51bWJlck9mRmlyc3REYXlJblllYXIoeWVhciArIDEpIC0gbnVtYmVyT2ZGaXJzdERheUluWWVhcih5ZWFyKTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGlzSGVicmV3TGVhcFllYXIoeWVhcjogbnVtYmVyKTogYm9vbGVhbiB7XHJcbiAgbGV0IGIgPSAoeWVhciAqIDEyICsgMTcpICUgMTk7XHJcbiAgcmV0dXJuIGIgPj0gKChiIDwgMCkgPyAtNyA6IDEyKTtcclxufVxyXG5cclxuLyoqXHJcbiAqIFJldHVybnMgdGhlIG51bWJlciBvZiBkYXlzIGluIGEgc3BlY2lmaWMgSGVicmV3IG1vbnRoLlxyXG4gKiBgbW9udGhgIGlzIDEgZm9yIE5pc2FuLCAyIGZvciBJeWFyIGV0Yy4gTm90ZTogSGVicmV3IGxlYXAgeWVhciBjb250YWlucyAxMyBtb250aHMuXHJcbiAqIGB5ZWFyYCBpcyBhbnkgSGVicmV3IHllYXIuXHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gZ2V0RGF5c0luSGVicmV3TW9udGgobW9udGg6IG51bWJlciwgeWVhcjogbnVtYmVyKTogbnVtYmVyIHtcclxuICBsZXQgeWVhckxlbmd0aCA9IG51bWJlck9mRmlyc3REYXlJblllYXIoeWVhciArIDEpIC0gbnVtYmVyT2ZGaXJzdERheUluWWVhcih5ZWFyKTtcclxuICBsZXQgeWVhclR5cGUgPSAoeWVhckxlbmd0aCA8PSAzODAgPyB5ZWFyTGVuZ3RoIDogKHllYXJMZW5ndGggLSAzMCkpIC0gMzUzO1xyXG4gIGxldCBsZWFwWWVhciA9IGlzSGVicmV3TGVhcFllYXIoeWVhcik7XHJcbiAgbGV0IGRheXNJbk1vbnRoID0gbGVhcFllYXIgPyBbMzAsIDI5LCAyOSwgMjksIDMwLCAzMCwgMjksIDMwLCAyOSwgMzAsIDI5LCAzMCwgMjldIDpcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFszMCwgMjksIDI5LCAyOSwgMzAsIDI5LCAzMCwgMjksIDMwLCAyOSwgMzAsIDI5XTtcclxuICBpZiAoeWVhclR5cGUgPiAwKSB7XHJcbiAgICBkYXlzSW5Nb250aFsyXSsrOyAgLy8gS2lzbGV2IGdldHMgYW4gZXh0cmEgZGF5IGluIG5vcm1hbCBvciBjb21wbGV0ZSB5ZWFycy5cclxuICB9XHJcbiAgaWYgKHllYXJUeXBlID4gMSkge1xyXG4gICAgZGF5c0luTW9udGhbMV0rKzsgIC8vIEhlc2h2YW4gZ2V0cyBhbiBleHRyYSBkYXkgaW4gY29tcGxldGUgeWVhcnMgb25seS5cclxuICB9XHJcbiAgcmV0dXJuIGRheXNJbk1vbnRoW21vbnRoIC0gMV07XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBnZXREYXlOdW1iZXJJbkhlYnJld1llYXIoZGF0ZTogTmdiRGF0ZSk6IG51bWJlciB7XHJcbiAgbGV0IG51bWJlck9mRGF5ID0gMDtcclxuICBmb3IgKGxldCBpID0gMTsgaSA8IGRhdGUubW9udGg7IGkrKykge1xyXG4gICAgbnVtYmVyT2ZEYXkgKz0gZ2V0RGF5c0luSGVicmV3TW9udGgoaSwgZGF0ZS55ZWFyKTtcclxuICB9XHJcbiAgcmV0dXJuIG51bWJlck9mRGF5ICsgZGF0ZS5kYXk7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBzZXRIZWJyZXdNb250aChkYXRlOiBOZ2JEYXRlLCB2YWw6IG51bWJlcik6IE5nYkRhdGUge1xyXG4gIGxldCBhZnRlciA9IHZhbCA+PSAwO1xyXG4gIGlmICghYWZ0ZXIpIHtcclxuICAgIHZhbCA9IC12YWw7XHJcbiAgfVxyXG4gIHdoaWxlICh2YWwgPiAwKSB7XHJcbiAgICBpZiAoYWZ0ZXIpIHtcclxuICAgICAgaWYgKHZhbCA+IGdldEhlYnJld01vbnRocyhkYXRlLnllYXIpIC0gZGF0ZS5tb250aCkge1xyXG4gICAgICAgIHZhbCAtPSBnZXRIZWJyZXdNb250aHMoZGF0ZS55ZWFyKSAtIGRhdGUubW9udGggKyAxO1xyXG4gICAgICAgIGRhdGUueWVhcisrO1xyXG4gICAgICAgIGRhdGUubW9udGggPSAxO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIGRhdGUubW9udGggKz0gdmFsO1xyXG4gICAgICAgIHZhbCA9IDA7XHJcbiAgICAgIH1cclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIGlmICh2YWwgPj0gZGF0ZS5tb250aCkge1xyXG4gICAgICAgIGRhdGUueWVhci0tO1xyXG4gICAgICAgIHZhbCAtPSBkYXRlLm1vbnRoO1xyXG4gICAgICAgIGRhdGUubW9udGggPSBnZXRIZWJyZXdNb250aHMoZGF0ZS55ZWFyKTtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICBkYXRlLm1vbnRoIC09IHZhbDtcclxuICAgICAgICB2YWwgPSAwO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfVxyXG4gIHJldHVybiBkYXRlO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gc2V0SGVicmV3RGF5KGRhdGU6IE5nYkRhdGUsIHZhbDogbnVtYmVyKTogTmdiRGF0ZSB7XHJcbiAgbGV0IGFmdGVyID0gdmFsID49IDA7XHJcbiAgaWYgKCFhZnRlcikge1xyXG4gICAgdmFsID0gLXZhbDtcclxuICB9XHJcbiAgd2hpbGUgKHZhbCA+IDApIHtcclxuICAgIGlmIChhZnRlcikge1xyXG4gICAgICBpZiAodmFsID4gZ2V0RGF5c0luSGVicmV3WWVhcihkYXRlLnllYXIpIC0gZ2V0RGF5TnVtYmVySW5IZWJyZXdZZWFyKGRhdGUpKSB7XHJcbiAgICAgICAgdmFsIC09IGdldERheXNJbkhlYnJld1llYXIoZGF0ZS55ZWFyKSAtIGdldERheU51bWJlckluSGVicmV3WWVhcihkYXRlKSArIDE7XHJcbiAgICAgICAgZGF0ZS55ZWFyKys7XHJcbiAgICAgICAgZGF0ZS5tb250aCA9IDE7XHJcbiAgICAgICAgZGF0ZS5kYXkgPSAxO1xyXG4gICAgICB9IGVsc2UgaWYgKHZhbCA+IGdldERheXNJbkhlYnJld01vbnRoKGRhdGUubW9udGgsIGRhdGUueWVhcikgLSBkYXRlLmRheSkge1xyXG4gICAgICAgIHZhbCAtPSBnZXREYXlzSW5IZWJyZXdNb250aChkYXRlLm1vbnRoLCBkYXRlLnllYXIpIC0gZGF0ZS5kYXkgKyAxO1xyXG4gICAgICAgIGRhdGUubW9udGgrKztcclxuICAgICAgICBkYXRlLmRheSA9IDE7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgZGF0ZS5kYXkgKz0gdmFsO1xyXG4gICAgICAgIHZhbCA9IDA7XHJcbiAgICAgIH1cclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIGlmICh2YWwgPj0gZGF0ZS5kYXkpIHtcclxuICAgICAgICB2YWwgLT0gZGF0ZS5kYXk7XHJcbiAgICAgICAgZGF0ZS5tb250aC0tO1xyXG4gICAgICAgIGlmIChkYXRlLm1vbnRoID09PSAwKSB7XHJcbiAgICAgICAgICBkYXRlLnllYXItLTtcclxuICAgICAgICAgIGRhdGUubW9udGggPSBnZXRIZWJyZXdNb250aHMoZGF0ZS55ZWFyKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZGF0ZS5kYXkgPSBnZXREYXlzSW5IZWJyZXdNb250aChkYXRlLm1vbnRoLCBkYXRlLnllYXIpO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIGRhdGUuZGF5IC09IHZhbDtcclxuICAgICAgICB2YWwgPSAwO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfVxyXG4gIHJldHVybiBkYXRlO1xyXG59XHJcblxyXG4vKipcclxuICogUmV0dXJucyB0aGUgZXF1aXZhbGVudCBIZWJyZXcgZGF0ZSB2YWx1ZSBmb3IgYSBnaXZlIGlucHV0IEdyZWdvcmlhbiBkYXRlLlxyXG4gKiBgZ2RhdGVgIGlzIGEgSlMgRGF0ZSB0byBiZSBjb252ZXJ0ZWQgdG8gSGVicmV3IGRhdGUuXHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gZnJvbUdyZWdvcmlhbihnZGF0ZTogRGF0ZSk6IE5nYkRhdGUge1xyXG4gIGNvbnN0IGRhdGUgPSBuZXcgRGF0ZShnZGF0ZSk7XHJcbiAgY29uc3QgZ1llYXIgPSBkYXRlLmdldEZ1bGxZZWFyKCksIGdNb250aCA9IGRhdGUuZ2V0TW9udGgoKSwgZ0RheSA9IGRhdGUuZ2V0RGF0ZSgpO1xyXG4gIGxldCBqdWxpYW5EYXkgPSBHUkVHT1JJQU5fRVBPQ0ggLSAxICsgMzY1ICogKGdZZWFyIC0gMSkgKyBNYXRoLmZsb29yKChnWWVhciAtIDEpIC8gNCkgLVxyXG4gICAgICBNYXRoLmZsb29yKChnWWVhciAtIDEpIC8gMTAwKSArIE1hdGguZmxvb3IoKGdZZWFyIC0gMSkgLyA0MDApICtcclxuICAgICAgTWF0aC5mbG9vcigoMzY3ICogKGdNb250aCArIDEpIC0gMzYyKSAvIDEyICsgKGdNb250aCArIDEgPD0gMiA/IDAgOiBpc0dyZWdvcmlhbkxlYXBZZWFyKGdZZWFyKSA/IC0xIDogLTIpICsgZ0RheSk7XHJcbiAganVsaWFuRGF5ID0gTWF0aC5mbG9vcihqdWxpYW5EYXkgKyAwLjUpO1xyXG4gIGxldCBkYXlzU2luY2VIZWJFcG9jaCA9IGp1bGlhbkRheSAtIDM0Nzk5NztcclxuICBsZXQgbW9udGhzU2luY2VIZWJFcG9jaCA9IE1hdGguZmxvb3IoZGF5c1NpbmNlSGViRXBvY2ggKiBQQVJUU19QRVJfREFZIC8gUEFSVFNfUEVSX01PTlRIKTtcclxuICBsZXQgaFllYXIgPSBNYXRoLmZsb29yKChtb250aHNTaW5jZUhlYkVwb2NoICogMTkgKyAyMzQpIC8gMjM1KSArIDE7XHJcbiAgbGV0IGZpcnN0RGF5T2ZUaGlzWWVhciA9IG51bWJlck9mRmlyc3REYXlJblllYXIoaFllYXIpO1xyXG4gIGxldCBkYXlPZlllYXIgPSBkYXlzU2luY2VIZWJFcG9jaCAtIGZpcnN0RGF5T2ZUaGlzWWVhcjtcclxuICB3aGlsZSAoZGF5T2ZZZWFyIDwgMSkge1xyXG4gICAgaFllYXItLTtcclxuICAgIGZpcnN0RGF5T2ZUaGlzWWVhciA9IG51bWJlck9mRmlyc3REYXlJblllYXIoaFllYXIpO1xyXG4gICAgZGF5T2ZZZWFyID0gZGF5c1NpbmNlSGViRXBvY2ggLSBmaXJzdERheU9mVGhpc1llYXI7XHJcbiAgfVxyXG4gIGxldCBoTW9udGggPSAxO1xyXG4gIGxldCBoRGF5ID0gZGF5T2ZZZWFyO1xyXG4gIHdoaWxlIChoRGF5ID4gZ2V0RGF5c0luSGVicmV3TW9udGgoaE1vbnRoLCBoWWVhcikpIHtcclxuICAgIGhEYXkgLT0gZ2V0RGF5c0luSGVicmV3TW9udGgoaE1vbnRoLCBoWWVhcik7XHJcbiAgICBoTW9udGgrKztcclxuICB9XHJcbiAgcmV0dXJuIG5ldyBOZ2JEYXRlKGhZZWFyLCBoTW9udGgsIGhEYXkpO1xyXG59XHJcblxyXG4vKipcclxuICogUmV0dXJucyB0aGUgZXF1aXZhbGVudCBKUyBkYXRlIHZhbHVlIGZvciBhIGdpdmVuIEhlYnJldyBkYXRlLlxyXG4gKiBgaGVicmV3RGF0ZWAgaXMgYW4gSGVicmV3IGRhdGUgdG8gYmUgY29udmVydGVkIHRvIEdyZWdvcmlhbi5cclxuICovXHJcbmV4cG9ydCBmdW5jdGlvbiB0b0dyZWdvcmlhbihoZWJyZXdEYXRlOiBOZ2JEYXRlU3RydWN0IHwgTmdiRGF0ZSk6IERhdGUge1xyXG4gIGNvbnN0IGhZZWFyID0gaGVicmV3RGF0ZS55ZWFyO1xyXG4gIGNvbnN0IGhNb250aCA9IGhlYnJld0RhdGUubW9udGg7XHJcbiAgY29uc3QgaERheSA9IGhlYnJld0RhdGUuZGF5O1xyXG4gIGxldCBkYXlzID0gbnVtYmVyT2ZGaXJzdERheUluWWVhcihoWWVhcik7XHJcbiAgZm9yIChsZXQgaSA9IDE7IGkgPCBoTW9udGg7IGkrKykge1xyXG4gICAgZGF5cyArPSBnZXREYXlzSW5IZWJyZXdNb250aChpLCBoWWVhcik7XHJcbiAgfVxyXG4gIGRheXMgKz0gaERheTtcclxuICBsZXQgZGlmZkRheXMgPSBkYXlzIC0gSEVCUkVXX0RBWV9PTl9KQU5fMV8xOTcwO1xyXG4gIGxldCBhZnRlciA9IGRpZmZEYXlzID49IDA7XHJcbiAgaWYgKCFhZnRlcikge1xyXG4gICAgZGlmZkRheXMgPSAtZGlmZkRheXM7XHJcbiAgfVxyXG4gIGxldCBnWWVhciA9IDE5NzA7XHJcbiAgbGV0IGdNb250aCA9IDE7XHJcbiAgbGV0IGdEYXkgPSAxO1xyXG4gIHdoaWxlIChkaWZmRGF5cyA+IDApIHtcclxuICAgIGlmIChhZnRlcikge1xyXG4gICAgICBpZiAoZGlmZkRheXMgPj0gKGlzR3JlZ29yaWFuTGVhcFllYXIoZ1llYXIpID8gMzY2IDogMzY1KSkge1xyXG4gICAgICAgIGRpZmZEYXlzIC09IGlzR3JlZ29yaWFuTGVhcFllYXIoZ1llYXIpID8gMzY2IDogMzY1O1xyXG4gICAgICAgIGdZZWFyKys7XHJcbiAgICAgIH0gZWxzZSBpZiAoZGlmZkRheXMgPj0gZ2V0RGF5c0luR3JlZ29yaWFuTW9udGgoZ01vbnRoLCBnWWVhcikpIHtcclxuICAgICAgICBkaWZmRGF5cyAtPSBnZXREYXlzSW5HcmVnb3JpYW5Nb250aChnTW9udGgsIGdZZWFyKTtcclxuICAgICAgICBnTW9udGgrKztcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICBnRGF5ICs9IGRpZmZEYXlzO1xyXG4gICAgICAgIGRpZmZEYXlzID0gMDtcclxuICAgICAgfVxyXG4gICAgfSBlbHNlIHtcclxuICAgICAgaWYgKGRpZmZEYXlzID49IChpc0dyZWdvcmlhbkxlYXBZZWFyKGdZZWFyIC0gMSkgPyAzNjYgOiAzNjUpKSB7XHJcbiAgICAgICAgZGlmZkRheXMgLT0gaXNHcmVnb3JpYW5MZWFwWWVhcihnWWVhciAtIDEpID8gMzY2IDogMzY1O1xyXG4gICAgICAgIGdZZWFyLS07XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgaWYgKGdNb250aCA+IDEpIHtcclxuICAgICAgICAgIGdNb250aC0tO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICBnTW9udGggPSAxMjtcclxuICAgICAgICAgIGdZZWFyLS07XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChkaWZmRGF5cyA+PSBnZXREYXlzSW5HcmVnb3JpYW5Nb250aChnTW9udGgsIGdZZWFyKSkge1xyXG4gICAgICAgICAgZGlmZkRheXMgLT0gZ2V0RGF5c0luR3JlZ29yaWFuTW9udGgoZ01vbnRoLCBnWWVhcik7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIGdEYXkgPSBnZXREYXlzSW5HcmVnb3JpYW5Nb250aChnTW9udGgsIGdZZWFyKSAtIGRpZmZEYXlzICsgMTtcclxuICAgICAgICAgIGRpZmZEYXlzID0gMDtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9XHJcbiAgcmV0dXJuIG5ldyBEYXRlKGdZZWFyLCBnTW9udGggLSAxLCBnRGF5KTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGhlYnJld051bWVyYWxzKG51bWVyYWxzOiBudW1iZXIpOiBzdHJpbmcge1xyXG4gIGlmICghbnVtZXJhbHMpIHtcclxuICAgIHJldHVybiAnJztcclxuICB9XHJcbiAgY29uc3QgaEFycmF5MF85ID0gWycnLCAnw5fCkCcsICfDl8KRJywgJ8OXwpInLCAnw5fCkycsICfDl8KUJywgJ8OXwpUnLCAnw5fClicsICfDl8KXJywgJ8OXwpgnXTtcclxuICBjb25zdCBoQXJyYXkxMF8xOSA9XHJcbiAgICAgIFsnw5fCmScsICfDl8KZw5fCkMOiwoDCrCcsICfDl8KZw5fCkcOiwoDCrCcsICfDl8KZw5fCksOiwoDCrCcsICfDl8KZw5fCk8OiwoDCrCcsICfDl8KYw5fClScsICfDl8KYw5fClsOiwoDCrCcsICfDl8KZw5fClsOiwoDCrCcsICfDl8KZw5fCl8OiwoDCrCcsICfDl8KZw5fCmMOiwoDCrCddO1xyXG4gIGNvbnN0IGhBcnJheTIwXzkwID0gWycnLCAnJywgJ8OXwpsnLCAnw5fCnCcsICfDl8KeJywgJ8OXwqAnLCAnw5fCoScsICfDl8KiJywgJ8OXwqQnLCAnw5fCpiddO1xyXG4gIGNvbnN0IGhBcnJheTEwMF85MDAgPSBbJycsICfDl8KnJywgJ8OXwqgnLCAnw5fCqScsICfDl8KqJywgJ8OXwqrDl8KnJywgJ8OXwqrDl8KoJywgJ8OXwqrDl8KpJywgJ8OXwqrDl8KqJywgJ8OXwqrDl8Kqw5fCpyddO1xyXG4gIGNvbnN0IGhBcnJheTEwMDBfOTAwMCA9IFsnJywgJ8OXwpAnLCAnw5fCkScsICfDl8KQw5fCkScsICfDl8KRw5fCkScsICfDl8KUJywgJ8OXwpDDl8KUJywgJ8OXwpHDl8KUJywgJ8OXwpDDl8KRw5fClCcsICfDl8KRw5fCkcOXwpQnXTtcclxuICBjb25zdCBnZXJlc2ggPSAnw5fCsycsIGdlcnNoYWltID0gJ8OXwrQnO1xyXG4gIGxldCBtZW0gPSAwO1xyXG4gIGxldCByZXN1bHQgPSBbXTtcclxuICBsZXQgc3RlcCA9IDA7XHJcbiAgd2hpbGUgKG51bWVyYWxzID4gMCkge1xyXG4gICAgbGV0IG0gPSBudW1lcmFscyAlIDEwO1xyXG4gICAgaWYgKHN0ZXAgPT09IDApIHtcclxuICAgICAgbWVtID0gbTtcclxuICAgIH0gZWxzZSBpZiAoc3RlcCA9PT0gMSkge1xyXG4gICAgICBpZiAobSAhPT0gMSkge1xyXG4gICAgICAgIHJlc3VsdC51bnNoaWZ0KGhBcnJheTIwXzkwW21dLCBoQXJyYXkwXzlbbWVtXSk7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgcmVzdWx0LnVuc2hpZnQoaEFycmF5MTBfMTlbbWVtXSk7XHJcbiAgICAgIH1cclxuICAgIH0gZWxzZSBpZiAoc3RlcCA9PT0gMikge1xyXG4gICAgICByZXN1bHQudW5zaGlmdChoQXJyYXkxMDBfOTAwW21dKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIGlmIChtICE9PSA1KSB7XHJcbiAgICAgICAgcmVzdWx0LnVuc2hpZnQoaEFycmF5MTAwMF85MDAwW21dLCBnZXJlc2gsICcgJyk7XHJcbiAgICAgIH1cclxuICAgICAgYnJlYWs7XHJcbiAgICB9XHJcbiAgICBudW1lcmFscyA9IE1hdGguZmxvb3IobnVtZXJhbHMgLyAxMCk7XHJcbiAgICBpZiAoc3RlcCA9PT0gMCAmJiBudW1lcmFscyA9PT0gMCkge1xyXG4gICAgICByZXN1bHQudW5zaGlmdChoQXJyYXkwXzlbbV0pO1xyXG4gICAgfVxyXG4gICAgc3RlcCsrO1xyXG4gIH1cclxuICByZXN1bHQgPSByZXN1bHQuam9pbignJykuc3BsaXQoJycpO1xyXG4gIGlmIChyZXN1bHQubGVuZ3RoID09PSAxKSB7XHJcbiAgICByZXN1bHQucHVzaChnZXJlc2gpO1xyXG4gIH0gZWxzZSBpZiAocmVzdWx0Lmxlbmd0aCA+IDEpIHtcclxuICAgIHJlc3VsdC5zcGxpY2UocmVzdWx0Lmxlbmd0aCAtIDEsIDAsIGdlcnNoYWltKTtcclxuICB9XHJcbiAgcmV0dXJuIHJlc3VsdC5qb2luKCcnKTtcclxufVxyXG4iLCJpbXBvcnQge05nYkRhdGV9IGZyb20gJy4uL25nYi1kYXRlJztcclxuaW1wb3J0IHtOZ2JDYWxlbmRhciwgTmdiUGVyaW9kfSBmcm9tICcuLi9uZ2ItY2FsZW5kYXInO1xyXG5pbXBvcnQge0luamVjdGFibGV9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQge2lzTnVtYmVyfSBmcm9tICcuLi8uLi91dGlsL3V0aWwnO1xyXG5pbXBvcnQge1xyXG4gIGZyb21HcmVnb3JpYW4sXHJcbiAgZ2V0RGF5TnVtYmVySW5IZWJyZXdZZWFyLFxyXG4gIGdldERheXNJbkhlYnJld01vbnRoLFxyXG4gIGlzSGVicmV3TGVhcFllYXIsXHJcbiAgdG9HcmVnb3JpYW4sXHJcbiAgc2V0SGVicmV3RGF5LFxyXG4gIHNldEhlYnJld01vbnRoXHJcbn0gZnJvbSAnLi9oZWJyZXcnO1xyXG5cclxuLyoqXHJcbiAqIFRoZSBIZWJyZXcgb3IgSmV3aXNoIGNhbGVuZGFyIGlzIGEgbHVuaXNvbGFyIGNhbGVuZGFyLlxyXG4gKiBJbiBJc3JhZWwsIGl0IGlzIHVzZWQgZm9yIHJlbGlnaW91cyBwdXJwb3NlcyBhbmQgZnJlcXVlbnRseSAtIGFzIGFuIG9mZmljaWFsIGNhbGVuZGFyIGZvciBjaXZpbCBwdXJwb3Nlcy5cclxuICpcclxuICogQHNpbmNlIDMuMi4wXHJcbiAqL1xyXG5ASW5qZWN0YWJsZSgpXHJcbmV4cG9ydCBjbGFzcyBOZ2JDYWxlbmRhckhlYnJldyBleHRlbmRzIE5nYkNhbGVuZGFyIHtcclxuICBnZXREYXlzUGVyV2VlaygpIHsgcmV0dXJuIDc7IH1cclxuXHJcbiAgZ2V0TW9udGhzKHllYXI/OiBudW1iZXIpIHtcclxuICAgIGlmICh5ZWFyICYmIGlzSGVicmV3TGVhcFllYXIoeWVhcikpIHtcclxuICAgICAgcmV0dXJuIFsxLCAyLCAzLCA0LCA1LCA2LCA3LCA4LCA5LCAxMCwgMTEsIDEyLCAxM107XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICByZXR1cm4gWzEsIDIsIDMsIDQsIDUsIDYsIDcsIDgsIDksIDEwLCAxMSwgMTJdO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgZ2V0V2Vla3NQZXJNb250aCgpIHsgcmV0dXJuIDY7IH1cclxuXHJcbiAgaXNWYWxpZChkYXRlOiBOZ2JEYXRlKTogYm9vbGVhbiB7XHJcbiAgICBsZXQgYiA9IGRhdGUgJiYgaXNOdW1iZXIoZGF0ZS55ZWFyKSAmJiBpc051bWJlcihkYXRlLm1vbnRoKSAmJiBpc051bWJlcihkYXRlLmRheSk7XHJcbiAgICBiID0gYiAmJiBkYXRlLm1vbnRoID4gMCAmJiBkYXRlLm1vbnRoIDw9IChpc0hlYnJld0xlYXBZZWFyKGRhdGUueWVhcikgPyAxMyA6IDEyKTtcclxuICAgIGIgPSBiICYmIGRhdGUuZGF5ID4gMCAmJiBkYXRlLmRheSA8PSBnZXREYXlzSW5IZWJyZXdNb250aChkYXRlLm1vbnRoLCBkYXRlLnllYXIpO1xyXG4gICAgcmV0dXJuIGIgJiYgIWlzTmFOKHRvR3JlZ29yaWFuKGRhdGUpLmdldFRpbWUoKSk7XHJcbiAgfVxyXG5cclxuICBnZXROZXh0KGRhdGU6IE5nYkRhdGUsIHBlcmlvZDogTmdiUGVyaW9kID0gJ2QnLCBudW1iZXIgPSAxKSB7XHJcbiAgICBkYXRlID0gbmV3IE5nYkRhdGUoZGF0ZS55ZWFyLCBkYXRlLm1vbnRoLCBkYXRlLmRheSk7XHJcblxyXG4gICAgc3dpdGNoIChwZXJpb2QpIHtcclxuICAgICAgY2FzZSAneSc6XHJcbiAgICAgICAgZGF0ZS55ZWFyICs9IG51bWJlcjtcclxuICAgICAgICBkYXRlLm1vbnRoID0gMTtcclxuICAgICAgICBkYXRlLmRheSA9IDE7XHJcbiAgICAgICAgcmV0dXJuIGRhdGU7XHJcbiAgICAgIGNhc2UgJ20nOlxyXG4gICAgICAgIGRhdGUgPSBzZXRIZWJyZXdNb250aChkYXRlLCBudW1iZXIpO1xyXG4gICAgICAgIGRhdGUuZGF5ID0gMTtcclxuICAgICAgICByZXR1cm4gZGF0ZTtcclxuICAgICAgY2FzZSAnZCc6XHJcbiAgICAgICAgcmV0dXJuIHNldEhlYnJld0RheShkYXRlLCBudW1iZXIpO1xyXG4gICAgICBkZWZhdWx0OlxyXG4gICAgICAgIHJldHVybiBkYXRlO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgZ2V0UHJldihkYXRlOiBOZ2JEYXRlLCBwZXJpb2Q6IE5nYlBlcmlvZCA9ICdkJywgbnVtYmVyID0gMSkgeyByZXR1cm4gdGhpcy5nZXROZXh0KGRhdGUsIHBlcmlvZCwgLW51bWJlcik7IH1cclxuXHJcbiAgZ2V0V2Vla2RheShkYXRlOiBOZ2JEYXRlKSB7XHJcbiAgICBjb25zdCBkYXkgPSB0b0dyZWdvcmlhbihkYXRlKS5nZXREYXkoKTtcclxuICAgIC8vIGluIEpTIERhdGUgU3VuPTAsIGluIElTTyA4NjAxIFN1bj03XHJcbiAgICByZXR1cm4gZGF5ID09PSAwID8gNyA6IGRheTtcclxuICB9XHJcblxyXG4gIGdldFdlZWtOdW1iZXIod2VlazogTmdiRGF0ZVtdLCBmaXJzdERheU9mV2VlazogbnVtYmVyKSB7XHJcbiAgICBjb25zdCBkYXRlID0gd2Vla1t3ZWVrLmxlbmd0aCAtIDFdO1xyXG4gICAgcmV0dXJuIE1hdGguY2VpbChnZXREYXlOdW1iZXJJbkhlYnJld1llYXIoZGF0ZSkgLyA3KTtcclxuICB9XHJcblxyXG4gIGdldFRvZGF5KCk6IE5nYkRhdGUgeyByZXR1cm4gZnJvbUdyZWdvcmlhbihuZXcgRGF0ZSgpKTsgfVxyXG59XHJcbiIsImltcG9ydCB7TmdiRGF0ZXBpY2tlckkxOG59IGZyb20gJy4uL2RhdGVwaWNrZXItaTE4bic7XHJcbmltcG9ydCB7TmdiRGF0ZVN0cnVjdH0gZnJvbSAnLi4vLi4vaW5kZXgnO1xyXG5pbXBvcnQge2hlYnJld051bWVyYWxzLCBpc0hlYnJld0xlYXBZZWFyfSBmcm9tICcuL2hlYnJldyc7XHJcbmltcG9ydCB7SW5qZWN0YWJsZX0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcblxyXG5cclxuY29uc3QgV0VFS0RBWVMgPSBbJ8OXwpHDl8KzJywgJ8OXwpLDl8KzJywgJ8OXwpPDl8KzJywgJ8OXwpTDl8KzJywgJ8OXwpXDl8KzJywgJ8OXwqnDl8KzJywgJ8OXwpDDl8KzJ107XHJcbmNvbnN0IE1PTlRIUyA9IFsnw5fCqsOXwqnDl8Kow5fCmScsICfDl8KXw5fCqcOXwpXDl8KfJywgJ8OXwpvDl8Khw5fCnMOXwpUnLCAnw5fCmMOXwpHDl8KqJywgJ8OXwqnDl8KRw5fCmCcsICfDl8KQw5fCk8OXwqgnLCAnw5fCoMOXwpnDl8Khw5fCnycsICfDl8KQw5fCmcOXwpnDl8KoJywgJ8OXwqHDl8KZw5fClcOXwp8nLCAnw5fCqsOXwp7Dl8KVw5fClicsICfDl8KQw5fCkScsICfDl8KQw5fCnMOXwpXDl8KcJ107XHJcbmNvbnN0IE1PTlRIU19MRUFQID1cclxuICAgIFsnw5fCqsOXwqnDl8Kow5fCmScsICfDl8KXw5fCqcOXwpXDl8KfJywgJ8OXwpvDl8Khw5fCnMOXwpUnLCAnw5fCmMOXwpHDl8KqJywgJ8OXwqnDl8KRw5fCmCcsICfDl8KQw5fCk8OXwqggw5fCkMOXwrMnLCAnw5fCkMOXwpPDl8KoIMOXwpHDl8KzJywgJ8OXwqDDl8KZw5fCocOXwp8nLCAnw5fCkMOXwpnDl8KZw5fCqCcsICfDl8Khw5fCmcOXwpXDl8KfJywgJ8OXwqrDl8Kew5fClcOXwpYnLCAnw5fCkMOXwpEnLCAnw5fCkMOXwpzDl8KVw5fCnCddO1xyXG5cclxuLyoqXHJcbiAqIEBzaW5jZSAzLjIuMFxyXG4gKi9cclxuQEluamVjdGFibGUoKVxyXG5leHBvcnQgY2xhc3MgTmdiRGF0ZXBpY2tlckkxOG5IZWJyZXcgZXh0ZW5kcyBOZ2JEYXRlcGlja2VySTE4biB7XHJcbiAgZ2V0TW9udGhTaG9ydE5hbWUobW9udGg6IG51bWJlciwgeWVhcj86IG51bWJlcik6IHN0cmluZyB7IHJldHVybiB0aGlzLmdldE1vbnRoRnVsbE5hbWUobW9udGgsIHllYXIpOyB9XHJcblxyXG4gIGdldE1vbnRoRnVsbE5hbWUobW9udGg6IG51bWJlciwgeWVhcj86IG51bWJlcik6IHN0cmluZyB7XHJcbiAgICByZXR1cm4gaXNIZWJyZXdMZWFwWWVhcih5ZWFyKSA/IE1PTlRIU19MRUFQW21vbnRoIC0gMV0gOiBNT05USFNbbW9udGggLSAxXTtcclxuICB9XHJcblxyXG4gIGdldFdlZWtkYXlTaG9ydE5hbWUod2Vla2RheTogbnVtYmVyKTogc3RyaW5nIHsgcmV0dXJuIFdFRUtEQVlTW3dlZWtkYXkgLSAxXTsgfVxyXG5cclxuICBnZXREYXlBcmlhTGFiZWwoZGF0ZTogTmdiRGF0ZVN0cnVjdCk6IHN0cmluZyB7XHJcbiAgICByZXR1cm4gYCR7aGVicmV3TnVtZXJhbHMoZGF0ZS5kYXkpfSAke3RoaXMuZ2V0TW9udGhGdWxsTmFtZShkYXRlLm1vbnRoLCBkYXRlLnllYXIpfSAke2hlYnJld051bWVyYWxzKGRhdGUueWVhcil9YDtcclxuICB9XHJcblxyXG4gIGdldERheU51bWVyYWxzKGRhdGU6IE5nYkRhdGVTdHJ1Y3QpOiBzdHJpbmcgeyByZXR1cm4gaGVicmV3TnVtZXJhbHMoZGF0ZS5kYXkpOyB9XHJcblxyXG4gIGdldFdlZWtOdW1lcmFscyh3ZWVrTnVtYmVyOiBudW1iZXIpOiBzdHJpbmcgeyByZXR1cm4gaGVicmV3TnVtZXJhbHMod2Vla051bWJlcik7IH1cclxuXHJcbiAgZ2V0WWVhck51bWVyYWxzKHllYXI6IG51bWJlcik6IHN0cmluZyB7IHJldHVybiBoZWJyZXdOdW1lcmFscyh5ZWFyKTsgfVxyXG59XHJcbiIsImltcG9ydCB7SW5qZWN0YWJsZX0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7TmdiRGF0ZUFkYXB0ZXJ9IGZyb20gJy4vbmdiLWRhdGUtYWRhcHRlcic7XHJcbmltcG9ydCB7TmdiRGF0ZVN0cnVjdH0gZnJvbSAnLi4vbmdiLWRhdGUtc3RydWN0JztcclxuXHJcbkBJbmplY3RhYmxlKClcclxuZXhwb3J0IGNsYXNzIE5nYkRhdGVOYXRpdmVBZGFwdGVyIGV4dGVuZHMgTmdiRGF0ZUFkYXB0ZXI8RGF0ZT4ge1xyXG4gIGZyb21Nb2RlbChkYXRlOiBEYXRlKTogTmdiRGF0ZVN0cnVjdCB7XHJcbiAgICByZXR1cm4gKGRhdGUgaW5zdGFuY2VvZiBEYXRlKSA/IHt5ZWFyOiBkYXRlLmdldEZ1bGxZZWFyKCksIG1vbnRoOiBkYXRlLmdldE1vbnRoKCkgKyAxLCBkYXk6IGRhdGUuZ2V0RGF0ZSgpfSA6IG51bGw7XHJcbiAgfVxyXG5cclxuICB0b01vZGVsKGRhdGU6IE5nYkRhdGVTdHJ1Y3QpOiBEYXRlIHtcclxuICAgIHJldHVybiBkYXRlICYmIGRhdGUueWVhciAmJiBkYXRlLm1vbnRoID8gbmV3IERhdGUoZGF0ZS55ZWFyLCBkYXRlLm1vbnRoIC0gMSwgZGF0ZS5kYXksIDEyKSA6IG51bGw7XHJcbiAgfVxyXG59XHJcbiIsImltcG9ydCB7SW5qZWN0YWJsZX0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7TmdiRGF0ZUFkYXB0ZXJ9IGZyb20gJy4vbmdiLWRhdGUtYWRhcHRlcic7XHJcbmltcG9ydCB7TmdiRGF0ZVN0cnVjdH0gZnJvbSAnLi4vbmdiLWRhdGUtc3RydWN0JztcclxuXHJcbi8qKlxyXG4gKiBAc2luY2UgMy4yLjBcclxuICovXHJcbkBJbmplY3RhYmxlKClcclxuZXhwb3J0IGNsYXNzIE5nYkRhdGVOYXRpdmVVVENBZGFwdGVyIGV4dGVuZHMgTmdiRGF0ZUFkYXB0ZXI8RGF0ZT4ge1xyXG4gIGZyb21Nb2RlbChkYXRlOiBEYXRlKTogTmdiRGF0ZVN0cnVjdCB7XHJcbiAgICByZXR1cm4gKGRhdGUgaW5zdGFuY2VvZiBEYXRlKSA/XHJcbiAgICAgICAge3llYXI6IGRhdGUuZ2V0VVRDRnVsbFllYXIoKSwgbW9udGg6IGRhdGUuZ2V0VVRDTW9udGgoKSArIDEsIGRheTogZGF0ZS5nZXRVVENEYXRlKCl9IDpcclxuICAgICAgICBudWxsO1xyXG4gIH1cclxuXHJcbiAgdG9Nb2RlbChkYXRlOiBOZ2JEYXRlU3RydWN0KTogRGF0ZSB7XHJcbiAgICByZXR1cm4gZGF0ZSAmJiBkYXRlLnllYXIgJiYgZGF0ZS5tb250aCA/IG5ldyBEYXRlKERhdGUuVVRDKGRhdGUueWVhciwgZGF0ZS5tb250aCAtIDEsIGRhdGUuZGF5KSkgOiBudWxsO1xyXG4gIH1cclxufVxyXG4iLCJpbXBvcnQge05nTW9kdWxlLCBNb2R1bGVXaXRoUHJvdmlkZXJzfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHtDb21tb25Nb2R1bGV9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XHJcbmltcG9ydCB7Rm9ybXNNb2R1bGV9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcclxuaW1wb3J0IHtOZ2JEYXRlcGlja2VyfSBmcm9tICcuL2RhdGVwaWNrZXInO1xyXG5pbXBvcnQge05nYkRhdGVwaWNrZXJNb250aFZpZXd9IGZyb20gJy4vZGF0ZXBpY2tlci1tb250aC12aWV3JztcclxuaW1wb3J0IHtOZ2JEYXRlcGlja2VyTmF2aWdhdGlvbn0gZnJvbSAnLi9kYXRlcGlja2VyLW5hdmlnYXRpb24nO1xyXG5pbXBvcnQge05nYklucHV0RGF0ZXBpY2tlcn0gZnJvbSAnLi9kYXRlcGlja2VyLWlucHV0JztcclxuaW1wb3J0IHtOZ2JEYXRlcGlja2VyRGF5Vmlld30gZnJvbSAnLi9kYXRlcGlja2VyLWRheS12aWV3JztcclxuaW1wb3J0IHtOZ2JEYXRlcGlja2VyTmF2aWdhdGlvblNlbGVjdH0gZnJvbSAnLi9kYXRlcGlja2VyLW5hdmlnYXRpb24tc2VsZWN0JztcclxuXHJcbmV4cG9ydCB7TmdiRGF0ZXBpY2tlciwgTmdiRGF0ZXBpY2tlck5hdmlnYXRlRXZlbnR9IGZyb20gJy4vZGF0ZXBpY2tlcic7XHJcbmV4cG9ydCB7TmdiSW5wdXREYXRlcGlja2VyfSBmcm9tICcuL2RhdGVwaWNrZXItaW5wdXQnO1xyXG5leHBvcnQge05nYkNhbGVuZGFyLCBOZ2JQZXJpb2R9IGZyb20gJy4vbmdiLWNhbGVuZGFyJztcclxuZXhwb3J0IHtOZ2JDYWxlbmRhcklzbGFtaWNDaXZpbH0gZnJvbSAnLi9oaWpyaS9uZ2ItY2FsZW5kYXItaXNsYW1pYy1jaXZpbCc7XHJcbmV4cG9ydCB7TmdiQ2FsZW5kYXJJc2xhbWljVW1hbHF1cmF9IGZyb20gJy4vaGlqcmkvbmdiLWNhbGVuZGFyLWlzbGFtaWMtdW1hbHF1cmEnO1xyXG5leHBvcnQge05nYkNhbGVuZGFyUGVyc2lhbn0gZnJvbSAnLi9qYWxhbGkvbmdiLWNhbGVuZGFyLXBlcnNpYW4nO1xyXG5leHBvcnQge05nYkNhbGVuZGFySGVicmV3fSBmcm9tICcuL2hlYnJldy9uZ2ItY2FsZW5kYXItaGVicmV3JztcclxuZXhwb3J0IHtOZ2JEYXRlcGlja2VySTE4bkhlYnJld30gZnJvbSAnLi9oZWJyZXcvZGF0ZXBpY2tlci1pMThuLWhlYnJldyc7XHJcbmV4cG9ydCB7TmdiRGF0ZXBpY2tlck1vbnRoVmlld30gZnJvbSAnLi9kYXRlcGlja2VyLW1vbnRoLXZpZXcnO1xyXG5leHBvcnQge05nYkRhdGVwaWNrZXJEYXlWaWV3fSBmcm9tICcuL2RhdGVwaWNrZXItZGF5LXZpZXcnO1xyXG5leHBvcnQge05nYkRhdGVwaWNrZXJOYXZpZ2F0aW9ufSBmcm9tICcuL2RhdGVwaWNrZXItbmF2aWdhdGlvbic7XHJcbmV4cG9ydCB7TmdiRGF0ZXBpY2tlck5hdmlnYXRpb25TZWxlY3R9IGZyb20gJy4vZGF0ZXBpY2tlci1uYXZpZ2F0aW9uLXNlbGVjdCc7XHJcbmV4cG9ydCB7TmdiRGF0ZXBpY2tlckNvbmZpZ30gZnJvbSAnLi9kYXRlcGlja2VyLWNvbmZpZyc7XHJcbmV4cG9ydCB7TmdiRGF0ZXBpY2tlckkxOG59IGZyb20gJy4vZGF0ZXBpY2tlci1pMThuJztcclxuZXhwb3J0IHtOZ2JEYXRlU3RydWN0fSBmcm9tICcuL25nYi1kYXRlLXN0cnVjdCc7XHJcbmV4cG9ydCB7TmdiRGF0ZX0gZnJvbSAnLi9uZ2ItZGF0ZSc7XHJcbmV4cG9ydCB7TmdiRGF0ZUFkYXB0ZXJ9IGZyb20gJy4vYWRhcHRlcnMvbmdiLWRhdGUtYWRhcHRlcic7XHJcbmV4cG9ydCB7TmdiRGF0ZU5hdGl2ZUFkYXB0ZXJ9IGZyb20gJy4vYWRhcHRlcnMvbmdiLWRhdGUtbmF0aXZlLWFkYXB0ZXInO1xyXG5leHBvcnQge05nYkRhdGVOYXRpdmVVVENBZGFwdGVyfSBmcm9tICcuL2FkYXB0ZXJzL25nYi1kYXRlLW5hdGl2ZS11dGMtYWRhcHRlcic7XHJcbmV4cG9ydCB7TmdiRGF0ZVBhcnNlckZvcm1hdHRlcn0gZnJvbSAnLi9uZ2ItZGF0ZS1wYXJzZXItZm9ybWF0dGVyJztcclxuXHJcbkBOZ01vZHVsZSh7XHJcbiAgZGVjbGFyYXRpb25zOiBbXHJcbiAgICBOZ2JEYXRlcGlja2VyLCBOZ2JEYXRlcGlja2VyTW9udGhWaWV3LCBOZ2JEYXRlcGlja2VyTmF2aWdhdGlvbiwgTmdiRGF0ZXBpY2tlck5hdmlnYXRpb25TZWxlY3QsIE5nYkRhdGVwaWNrZXJEYXlWaWV3LFxyXG4gICAgTmdiSW5wdXREYXRlcGlja2VyXHJcbiAgXSxcclxuICBleHBvcnRzOiBbTmdiRGF0ZXBpY2tlciwgTmdiSW5wdXREYXRlcGlja2VyXSxcclxuICBpbXBvcnRzOiBbQ29tbW9uTW9kdWxlLCBGb3Jtc01vZHVsZV0sXHJcbiAgZW50cnlDb21wb25lbnRzOiBbTmdiRGF0ZXBpY2tlcl1cclxufSlcclxuZXhwb3J0IGNsYXNzIE5nYkRhdGVwaWNrZXJNb2R1bGUge1xyXG4gIC8qKlxyXG4gICAqIEltcG9ydGluZyB3aXRoICcuZm9yUm9vdCgpJyBpcyBubyBsb25nZXIgbmVjZXNzYXJ5LCB5b3UgY2FuIHNpbXBseSBpbXBvcnQgdGhlIG1vZHVsZS5cclxuICAgKiBXaWxsIGJlIHJlbW92ZWQgaW4gNC4wLjAuXHJcbiAgICpcclxuICAgKiBAZGVwcmVjYXRlZCAzLjAuMFxyXG4gICAqL1xyXG4gIHN0YXRpYyBmb3JSb290KCk6IE1vZHVsZVdpdGhQcm92aWRlcnMgeyByZXR1cm4ge25nTW9kdWxlOiBOZ2JEYXRlcGlja2VyTW9kdWxlfTsgfVxyXG59XHJcbiIsImltcG9ydCB7SW5qZWN0YWJsZX0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7UGxhY2VtZW50QXJyYXl9IGZyb20gJy4uL3V0aWwvcG9zaXRpb25pbmcnO1xyXG5cclxuLyoqXHJcbiAqIENvbmZpZ3VyYXRpb24gc2VydmljZSBmb3IgdGhlIE5nYkRyb3Bkb3duIGRpcmVjdGl2ZS5cclxuICogWW91IGNhbiBpbmplY3QgdGhpcyBzZXJ2aWNlLCB0eXBpY2FsbHkgaW4geW91ciByb290IGNvbXBvbmVudCwgYW5kIGN1c3RvbWl6ZSB0aGUgdmFsdWVzIG9mIGl0cyBwcm9wZXJ0aWVzIGluXHJcbiAqIG9yZGVyIHRvIHByb3ZpZGUgZGVmYXVsdCB2YWx1ZXMgZm9yIGFsbCB0aGUgZHJvcGRvd25zIHVzZWQgaW4gdGhlIGFwcGxpY2F0aW9uLlxyXG4gKi9cclxuQEluamVjdGFibGUoe3Byb3ZpZGVkSW46ICdyb290J30pXHJcbmV4cG9ydCBjbGFzcyBOZ2JEcm9wZG93bkNvbmZpZyB7XHJcbiAgYXV0b0Nsb3NlOiBib29sZWFuIHwgJ291dHNpZGUnIHwgJ2luc2lkZScgPSB0cnVlO1xyXG4gIHBsYWNlbWVudDogUGxhY2VtZW50QXJyYXkgPSAnYm90dG9tLWxlZnQnO1xyXG59XHJcbiIsImltcG9ydCB7XHJcbiAgZm9yd2FyZFJlZixcclxuICBJbmplY3QsXHJcbiAgRGlyZWN0aXZlLFxyXG4gIElucHV0LFxyXG4gIE91dHB1dCxcclxuICBFdmVudEVtaXR0ZXIsXHJcbiAgRWxlbWVudFJlZixcclxuICBDb250ZW50Q2hpbGQsXHJcbiAgTmdab25lLFxyXG4gIFJlbmRlcmVyMixcclxuICBPbkluaXQsXHJcbiAgT25EZXN0cm95LFxyXG4gIENoYW5nZURldGVjdG9yUmVmLFxyXG4gIENvbnRlbnRDaGlsZHJlbixcclxuICBBZnRlclZpZXdJbml0XHJcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7RE9DVU1FTlR9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XHJcbmltcG9ydCB7ZnJvbUV2ZW50LCByYWNlLCBTdWJqZWN0LCBTdWJzY3JpcHRpb24sIG1lcmdlfSBmcm9tICdyeGpzJztcclxuaW1wb3J0IHtmaWx0ZXIsIHRha2VVbnRpbH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xyXG5pbXBvcnQge05nYkRyb3Bkb3duQ29uZmlnfSBmcm9tICcuL2Ryb3Bkb3duLWNvbmZpZyc7XHJcbmltcG9ydCB7cG9zaXRpb25FbGVtZW50cywgUGxhY2VtZW50QXJyYXksIFBsYWNlbWVudH0gZnJvbSAnLi4vdXRpbC9wb3NpdGlvbmluZyc7XHJcbmltcG9ydCB7S2V5fSBmcm9tICcuLi91dGlsL2tleSc7XHJcblxyXG4vKipcclxuICovXHJcbkBEaXJlY3RpdmUoe3NlbGVjdG9yOiAnLmRyb3Bkb3duLWl0ZW06bm90KC5kaXNhYmxlZCknfSlcclxuZXhwb3J0IGNsYXNzIE5nYkRyb3Bkb3duSXRlbSB7XHJcbiAgZHJvcGRvd25JdGVtRWw6IEhUTUxFbGVtZW50O1xyXG5cclxuICBASW5wdXQoJ2Rpc2FibGVkJykgcHJpdmF0ZSBfZGlzYWJsZWQ7XHJcblxyXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgX2VsZW1lbnRSZWY6IEVsZW1lbnRSZWY8SFRNTEVsZW1lbnQ+KSB7IHRoaXMuZHJvcGRvd25JdGVtRWwgPSBfZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50OyB9XHJcblxyXG4gIGdldCBkaXNhYmxlZCgpOiBib29sZWFuIHsgcmV0dXJuIHRoaXMuX2Rpc2FibGVkICE9IG51bGw7IH1cclxufVxyXG5cclxuLyoqXHJcbiAqL1xyXG5ARGlyZWN0aXZlKHtcclxuICBzZWxlY3RvcjogJ1tuZ2JEcm9wZG93bk1lbnVdJyxcclxuICBob3N0OiB7J1tjbGFzcy5kcm9wZG93bi1tZW51XSc6ICd0cnVlJywgJ1tjbGFzcy5zaG93XSc6ICdkcm9wZG93bi5pc09wZW4oKScsICdbYXR0ci54LXBsYWNlbWVudF0nOiAncGxhY2VtZW50J31cclxufSlcclxuZXhwb3J0IGNsYXNzIE5nYkRyb3Bkb3duTWVudSB7XHJcbiAgcGxhY2VtZW50OiBQbGFjZW1lbnQgPSAnYm90dG9tJztcclxuICBpc09wZW4gPSBmYWxzZTtcclxuXHJcbiAgQENvbnRlbnRDaGlsZHJlbihOZ2JEcm9wZG93bkl0ZW0pIG1lbnVJdGVtczogTmdiRHJvcGRvd25JdGVtW107XHJcblxyXG4gIGNvbnN0cnVjdG9yKFxyXG4gICAgICBASW5qZWN0KGZvcndhcmRSZWYoKCkgPT4gTmdiRHJvcGRvd24pKSBwdWJsaWMgZHJvcGRvd24sIHByaXZhdGUgX2VsZW1lbnRSZWY6IEVsZW1lbnRSZWY8SFRNTEVsZW1lbnQ+LFxyXG4gICAgICBwcml2YXRlIF9yZW5kZXJlcjogUmVuZGVyZXIyKSB7fVxyXG5cclxuICBpc0V2ZW50RnJvbSgkZXZlbnQpIHsgcmV0dXJuIHRoaXMuX2VsZW1lbnRSZWYubmF0aXZlRWxlbWVudC5jb250YWlucygkZXZlbnQudGFyZ2V0KTsgfVxyXG5cclxuICBwb3NpdGlvbih0cmlnZ2VyRWwsIHBsYWNlbWVudCkge1xyXG4gICAgdGhpcy5hcHBseVBsYWNlbWVudChwb3NpdGlvbkVsZW1lbnRzKHRyaWdnZXJFbCwgdGhpcy5fZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50LCBwbGFjZW1lbnQpKTtcclxuICB9XHJcblxyXG4gIGFwcGx5UGxhY2VtZW50KF9wbGFjZW1lbnQ6IFBsYWNlbWVudCkge1xyXG4gICAgLy8gcmVtb3ZlIHRoZSBjdXJyZW50IHBsYWNlbWVudCBjbGFzc2VzXHJcbiAgICB0aGlzLl9yZW5kZXJlci5yZW1vdmVDbGFzcyh0aGlzLl9lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQucGFyZW50Tm9kZSwgJ2Ryb3B1cCcpO1xyXG4gICAgdGhpcy5fcmVuZGVyZXIucmVtb3ZlQ2xhc3ModGhpcy5fZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50LnBhcmVudE5vZGUsICdkcm9wZG93bicpO1xyXG4gICAgdGhpcy5wbGFjZW1lbnQgPSBfcGxhY2VtZW50O1xyXG4gICAgLyoqXHJcbiAgICAgKiBhcHBseSB0aGUgbmV3IHBsYWNlbWVudFxyXG4gICAgICogaW4gY2FzZSBvZiB0b3AgdXNlIHVwLWFycm93IG9yIGRvd24tYXJyb3cgb3RoZXJ3aXNlXHJcbiAgICAgKi9cclxuICAgIGlmIChfcGxhY2VtZW50LnNlYXJjaCgnXnRvcCcpICE9PSAtMSkge1xyXG4gICAgICB0aGlzLl9yZW5kZXJlci5hZGRDbGFzcyh0aGlzLl9lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQucGFyZW50Tm9kZSwgJ2Ryb3B1cCcpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdGhpcy5fcmVuZGVyZXIuYWRkQ2xhc3ModGhpcy5fZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50LnBhcmVudE5vZGUsICdkcm9wZG93bicpO1xyXG4gICAgfVxyXG4gIH1cclxufVxyXG5cclxuLyoqXHJcbiAqIE1hcmtzIGFuIGVsZW1lbnQgdG8gd2hpY2ggZHJvcGRvd24gbWVudSB3aWxsIGJlIGFuY2hvcmVkLiBUaGlzIGlzIGEgc2ltcGxlIHZlcnNpb25cclxuICogb2YgdGhlIE5nYkRyb3Bkb3duVG9nZ2xlIGRpcmVjdGl2ZS4gSXQgcGxheXMgdGhlIHNhbWUgcm9sZSBhcyBOZ2JEcm9wZG93blRvZ2dsZSBidXRcclxuICogZG9lc24ndCBsaXN0ZW4gdG8gY2xpY2sgZXZlbnRzIHRvIHRvZ2dsZSBkcm9wZG93biBtZW51IHRodXMgZW5hYmxpbmcgc3VwcG9ydCBmb3JcclxuICogZXZlbnRzIG90aGVyIHRoYW4gY2xpY2suXHJcbiAqXHJcbiAqIEBzaW5jZSAxLjEuMFxyXG4gKi9cclxuQERpcmVjdGl2ZSh7XHJcbiAgc2VsZWN0b3I6ICdbbmdiRHJvcGRvd25BbmNob3JdJyxcclxuICBob3N0OiB7J2NsYXNzJzogJ2Ryb3Bkb3duLXRvZ2dsZScsICdhcmlhLWhhc3BvcHVwJzogJ3RydWUnLCAnW2F0dHIuYXJpYS1leHBhbmRlZF0nOiAnZHJvcGRvd24uaXNPcGVuKCknfVxyXG59KVxyXG5leHBvcnQgY2xhc3MgTmdiRHJvcGRvd25BbmNob3Ige1xyXG4gIGFuY2hvckVsO1xyXG5cclxuICBjb25zdHJ1Y3RvcihASW5qZWN0KGZvcndhcmRSZWYoKCkgPT4gTmdiRHJvcGRvd24pKSBwdWJsaWMgZHJvcGRvd24sIHByaXZhdGUgX2VsZW1lbnRSZWY6IEVsZW1lbnRSZWY8SFRNTEVsZW1lbnQ+KSB7XHJcbiAgICB0aGlzLmFuY2hvckVsID0gX2VsZW1lbnRSZWYubmF0aXZlRWxlbWVudDtcclxuICB9XHJcblxyXG4gIGlzRXZlbnRGcm9tKCRldmVudCkgeyByZXR1cm4gdGhpcy5fZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50LmNvbnRhaW5zKCRldmVudC50YXJnZXQpOyB9XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBBbGxvd3MgdGhlIGRyb3Bkb3duIHRvIGJlIHRvZ2dsZWQgdmlhIGNsaWNrLiBUaGlzIGRpcmVjdGl2ZSBpcyBvcHRpb25hbDogeW91IGNhbiB1c2UgTmdiRHJvcGRvd25BbmNob3IgYXMgYW5cclxuICogYWx0ZXJuYXRpdmUuXHJcbiAqL1xyXG5ARGlyZWN0aXZlKHtcclxuICBzZWxlY3RvcjogJ1tuZ2JEcm9wZG93blRvZ2dsZV0nLFxyXG4gIGhvc3Q6IHtcclxuICAgICdjbGFzcyc6ICdkcm9wZG93bi10b2dnbGUnLFxyXG4gICAgJ2FyaWEtaGFzcG9wdXAnOiAndHJ1ZScsXHJcbiAgICAnW2F0dHIuYXJpYS1leHBhbmRlZF0nOiAnZHJvcGRvd24uaXNPcGVuKCknLFxyXG4gICAgJyhjbGljayknOiAndG9nZ2xlT3BlbigpJ1xyXG4gIH0sXHJcbiAgcHJvdmlkZXJzOiBbe3Byb3ZpZGU6IE5nYkRyb3Bkb3duQW5jaG9yLCB1c2VFeGlzdGluZzogZm9yd2FyZFJlZigoKSA9PiBOZ2JEcm9wZG93blRvZ2dsZSl9XVxyXG59KVxyXG5leHBvcnQgY2xhc3MgTmdiRHJvcGRvd25Ub2dnbGUgZXh0ZW5kcyBOZ2JEcm9wZG93bkFuY2hvciB7XHJcbiAgY29uc3RydWN0b3IoQEluamVjdChmb3J3YXJkUmVmKCgpID0+IE5nYkRyb3Bkb3duKSkgZHJvcGRvd24sIGVsZW1lbnRSZWY6IEVsZW1lbnRSZWY8SFRNTEVsZW1lbnQ+KSB7XHJcbiAgICBzdXBlcihkcm9wZG93biwgZWxlbWVudFJlZik7XHJcbiAgfVxyXG5cclxuICB0b2dnbGVPcGVuKCkgeyB0aGlzLmRyb3Bkb3duLnRvZ2dsZSgpOyB9XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBUcmFuc2Zvcm1zIGEgbm9kZSBpbnRvIGEgZHJvcGRvd24uXHJcbiAqL1xyXG5ARGlyZWN0aXZlKHtzZWxlY3RvcjogJ1tuZ2JEcm9wZG93bl0nLCBleHBvcnRBczogJ25nYkRyb3Bkb3duJywgaG9zdDogeydbY2xhc3Muc2hvd10nOiAnaXNPcGVuKCknfX0pXHJcbmV4cG9ydCBjbGFzcyBOZ2JEcm9wZG93biBpbXBsZW1lbnRzIEFmdGVyVmlld0luaXQsIE9uSW5pdCwgT25EZXN0cm95IHtcclxuICBwcml2YXRlIF9jbG9zZWQkID0gbmV3IFN1YmplY3Q8dm9pZD4oKTtcclxuICBwcml2YXRlIF96b25lU3Vic2NyaXB0aW9uOiBTdWJzY3JpcHRpb247XHJcblxyXG4gIEBDb250ZW50Q2hpbGQoTmdiRHJvcGRvd25NZW51KSBwcml2YXRlIF9tZW51OiBOZ2JEcm9wZG93bk1lbnU7XHJcblxyXG4gIEBDb250ZW50Q2hpbGQoTmdiRHJvcGRvd25NZW51LCB7cmVhZDogRWxlbWVudFJlZn0pIHByaXZhdGUgX21lbnVFbGVtZW50UmVmOiBFbGVtZW50UmVmPEhUTUxFbGVtZW50PjtcclxuXHJcbiAgQENvbnRlbnRDaGlsZChOZ2JEcm9wZG93bkFuY2hvcikgcHJpdmF0ZSBfYW5jaG9yOiBOZ2JEcm9wZG93bkFuY2hvcjtcclxuXHJcbiAgLyoqXHJcbiAgICogSW5kaWNhdGVzIHRoYXQgZHJvcGRvd24gc2hvdWxkIGJlIGNsb3NlZCB3aGVuIHNlbGVjdGluZyBvbmUgb2YgZHJvcGRvd24gaXRlbXMgKGNsaWNrKSBvciBwcmVzc2luZyBFU0MuXHJcbiAgICogV2hlbiBpdCBpcyB0cnVlIChkZWZhdWx0KSBkcm9wZG93bnMgYXJlIGF1dG9tYXRpY2FsbHkgY2xvc2VkIG9uIGJvdGggb3V0c2lkZSBhbmQgaW5zaWRlIChtZW51KSBjbGlja3MuXHJcbiAgICogV2hlbiBpdCBpcyBmYWxzZSBkcm9wZG93bnMgYXJlIG5ldmVyIGF1dG9tYXRpY2FsbHkgY2xvc2VkLlxyXG4gICAqIFdoZW4gaXQgaXMgJ291dHNpZGUnIGRyb3Bkb3ducyBhcmUgYXV0b21hdGljYWxseSBjbG9zZWQgb24gb3V0c2lkZSBjbGlja3MgYnV0IG5vdCBvbiBtZW51IGNsaWNrcy5cclxuICAgKiBXaGVuIGl0IGlzICdpbnNpZGUnIGRyb3Bkb3ducyBhcmUgYXV0b21hdGljYWxseSBvbiBtZW51IGNsaWNrcyBidXQgbm90IG9uIG91dHNpZGUgY2xpY2tzLlxyXG4gICAqL1xyXG4gIEBJbnB1dCgpIGF1dG9DbG9zZTogYm9vbGVhbiB8ICdvdXRzaWRlJyB8ICdpbnNpZGUnO1xyXG5cclxuICAvKipcclxuICAgKiAgRGVmaW5lcyB3aGV0aGVyIG9yIG5vdCB0aGUgZHJvcGRvd24tbWVudSBpcyBvcGVuIGluaXRpYWxseS5cclxuICAgKi9cclxuICBASW5wdXQoJ29wZW4nKSBfb3BlbiA9IGZhbHNlO1xyXG5cclxuICAvKipcclxuICAgKiBQbGFjZW1lbnQgb2YgYSBwb3BvdmVyIGFjY2VwdHM6XHJcbiAgICogICAgXCJ0b3BcIiwgXCJ0b3AtbGVmdFwiLCBcInRvcC1yaWdodFwiLCBcImJvdHRvbVwiLCBcImJvdHRvbS1sZWZ0XCIsIFwiYm90dG9tLXJpZ2h0XCIsXHJcbiAgICogICAgXCJsZWZ0XCIsIFwibGVmdC10b3BcIiwgXCJsZWZ0LWJvdHRvbVwiLCBcInJpZ2h0XCIsIFwicmlnaHQtdG9wXCIsIFwicmlnaHQtYm90dG9tXCJcclxuICAgKiBhbmQgYXJyYXkgb2YgYWJvdmUgdmFsdWVzLlxyXG4gICAqL1xyXG4gIEBJbnB1dCgpIHBsYWNlbWVudDogUGxhY2VtZW50QXJyYXk7XHJcblxyXG4gIC8qKlxyXG4gICAqICBBbiBldmVudCBmaXJlZCB3aGVuIHRoZSBkcm9wZG93biBpcyBvcGVuZWQgb3IgY2xvc2VkLlxyXG4gICAqICBFdmVudCdzIHBheWxvYWQgZXF1YWxzIHdoZXRoZXIgZHJvcGRvd24gaXMgb3Blbi5cclxuICAgKi9cclxuICBAT3V0cHV0KCkgb3BlbkNoYW5nZSA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcclxuXHJcbiAgY29uc3RydWN0b3IoXHJcbiAgICAgIHByaXZhdGUgX2NoYW5nZURldGVjdG9yOiBDaGFuZ2VEZXRlY3RvclJlZiwgY29uZmlnOiBOZ2JEcm9wZG93bkNvbmZpZywgQEluamVjdChET0NVTUVOVCkgcHJpdmF0ZSBfZG9jdW1lbnQ6IGFueSxcclxuICAgICAgcHJpdmF0ZSBfbmdab25lOiBOZ1pvbmUpIHtcclxuICAgIHRoaXMucGxhY2VtZW50ID0gY29uZmlnLnBsYWNlbWVudDtcclxuICAgIHRoaXMuYXV0b0Nsb3NlID0gY29uZmlnLmF1dG9DbG9zZTtcclxuICAgIHRoaXMuX3pvbmVTdWJzY3JpcHRpb24gPSBfbmdab25lLm9uU3RhYmxlLnN1YnNjcmliZSgoKSA9PiB7IHRoaXMuX3Bvc2l0aW9uTWVudSgpOyB9KTtcclxuICB9XHJcblxyXG4gIG5nT25Jbml0KCkge1xyXG4gICAgaWYgKHRoaXMuX21lbnUpIHtcclxuICAgICAgdGhpcy5fbWVudS5hcHBseVBsYWNlbWVudChBcnJheS5pc0FycmF5KHRoaXMucGxhY2VtZW50KSA/ICh0aGlzLnBsYWNlbWVudFswXSkgOiB0aGlzLnBsYWNlbWVudCBhcyBQbGFjZW1lbnQpO1xyXG4gICAgfVxyXG5cclxuICAgIGlmICh0aGlzLl9vcGVuKSB7XHJcbiAgICAgIHRoaXMuX3NldENsb3NlSGFuZGxlcnMoKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIG5nQWZ0ZXJWaWV3SW5pdCgpIHsgdGhpcy5fc2V0S2V5Ym9hcmRIYW5kbGVycygpOyB9XHJcblxyXG4gIC8qKlxyXG4gICAqIENoZWNrcyBpZiB0aGUgZHJvcGRvd24gbWVudSBpcyBvcGVuIG9yIG5vdC5cclxuICAgKi9cclxuICBpc09wZW4oKTogYm9vbGVhbiB7IHJldHVybiB0aGlzLl9vcGVuOyB9XHJcblxyXG4gIC8qKlxyXG4gICAqIE9wZW5zIHRoZSBkcm9wZG93biBtZW51IG9mIGEgZ2l2ZW4gbmF2YmFyIG9yIHRhYmJlZCBuYXZpZ2F0aW9uLlxyXG4gICAqL1xyXG4gIG9wZW4oKTogdm9pZCB7XHJcbiAgICBpZiAoIXRoaXMuX29wZW4pIHtcclxuICAgICAgdGhpcy5fb3BlbiA9IHRydWU7XHJcbiAgICAgIHRoaXMuX3Bvc2l0aW9uTWVudSgpO1xyXG4gICAgICB0aGlzLm9wZW5DaGFuZ2UuZW1pdCh0cnVlKTtcclxuICAgICAgdGhpcy5fc2V0Q2xvc2VIYW5kbGVycygpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBfc2V0Q2xvc2VIYW5kbGVycygpIHtcclxuICAgIGlmICh0aGlzLmF1dG9DbG9zZSkge1xyXG4gICAgICB0aGlzLl9uZ1pvbmUucnVuT3V0c2lkZUFuZ3VsYXIoKCkgPT4ge1xyXG4gICAgICAgIGNvbnN0IGVzY2FwZXMkID0gZnJvbUV2ZW50PEtleWJvYXJkRXZlbnQ+KHRoaXMuX2RvY3VtZW50LCAna2V5dXAnKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5waXBlKHRha2VVbnRpbCh0aGlzLl9jbG9zZWQkKSwgZmlsdGVyKGV2ZW50ID0+IGV2ZW50LndoaWNoID09PSBLZXkuRXNjYXBlKSk7XHJcblxyXG4gICAgICAgIGNvbnN0IGNsaWNrcyQgPSBmcm9tRXZlbnQ8TW91c2VFdmVudD4odGhpcy5fZG9jdW1lbnQsICdjbGljaycpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAucGlwZSh0YWtlVW50aWwodGhpcy5fY2xvc2VkJCksIGZpbHRlcihldmVudCA9PiB0aGlzLl9zaG91bGRDbG9zZUZyb21DbGljayhldmVudCkpKTtcclxuXHJcbiAgICAgICAgcmFjZTxFdmVudD4oW2VzY2FwZXMkLCBjbGlja3MkXSkucGlwZSh0YWtlVW50aWwodGhpcy5fY2xvc2VkJCkpLnN1YnNjcmliZSgoKSA9PiB0aGlzLl9uZ1pvbmUucnVuKCgpID0+IHtcclxuICAgICAgICAgIHRoaXMuY2xvc2UoKTtcclxuICAgICAgICAgIHRoaXMuX2NoYW5nZURldGVjdG9yLm1hcmtGb3JDaGVjaygpO1xyXG4gICAgICAgIH0pKTtcclxuICAgICAgfSk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBDbG9zZXMgdGhlIGRyb3Bkb3duIG1lbnUgb2YgYSBnaXZlbiBuYXZiYXIgb3IgdGFiYmVkIG5hdmlnYXRpb24uXHJcbiAgICovXHJcbiAgY2xvc2UoKTogdm9pZCB7XHJcbiAgICBpZiAodGhpcy5fb3Blbikge1xyXG4gICAgICB0aGlzLl9vcGVuID0gZmFsc2U7XHJcbiAgICAgIHRoaXMuX2Nsb3NlZCQubmV4dCgpO1xyXG4gICAgICB0aGlzLm9wZW5DaGFuZ2UuZW1pdChmYWxzZSk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBUb2dnbGVzIHRoZSBkcm9wZG93biBtZW51IG9mIGEgZ2l2ZW4gbmF2YmFyIG9yIHRhYmJlZCBuYXZpZ2F0aW9uLlxyXG4gICAqL1xyXG4gIHRvZ2dsZSgpOiB2b2lkIHtcclxuICAgIGlmICh0aGlzLmlzT3BlbigpKSB7XHJcbiAgICAgIHRoaXMuY2xvc2UoKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHRoaXMub3BlbigpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBfc2hvdWxkQ2xvc2VGcm9tQ2xpY2soZXZlbnQ6IE1vdXNlRXZlbnQpIHtcclxuICAgIGlmIChldmVudC5idXR0b24gIT09IDIgJiYgIXRoaXMuX2lzRXZlbnRGcm9tVG9nZ2xlKGV2ZW50KSkge1xyXG4gICAgICBpZiAodGhpcy5hdXRvQ2xvc2UgPT09IHRydWUpIHtcclxuICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgfSBlbHNlIGlmICh0aGlzLmF1dG9DbG9zZSA9PT0gJ2luc2lkZScgJiYgdGhpcy5faXNFdmVudEZyb21NZW51KGV2ZW50KSkge1xyXG4gICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICB9IGVsc2UgaWYgKHRoaXMuYXV0b0Nsb3NlID09PSAnb3V0c2lkZScgJiYgIXRoaXMuX2lzRXZlbnRGcm9tTWVudShldmVudCkpIHtcclxuICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gICAgcmV0dXJuIGZhbHNlO1xyXG4gIH1cclxuXHJcbiAgbmdPbkRlc3Ryb3koKSB7XHJcbiAgICB0aGlzLl9jbG9zZWQkLm5leHQoKTtcclxuICAgIHRoaXMuX3pvbmVTdWJzY3JpcHRpb24udW5zdWJzY3JpYmUoKTtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgX2lzRXZlbnRGcm9tVG9nZ2xlKCRldmVudCkgeyByZXR1cm4gdGhpcy5fYW5jaG9yLmlzRXZlbnRGcm9tKCRldmVudCk7IH1cclxuXHJcbiAgcHJpdmF0ZSBfaXNFdmVudEZyb21NZW51KCRldmVudCkgeyByZXR1cm4gdGhpcy5fbWVudSA/IHRoaXMuX21lbnUuaXNFdmVudEZyb20oJGV2ZW50KSA6IGZhbHNlOyB9XHJcblxyXG4gIHByaXZhdGUgX3Bvc2l0aW9uTWVudSgpIHtcclxuICAgIGlmICh0aGlzLmlzT3BlbigpICYmIHRoaXMuX21lbnUpIHtcclxuICAgICAgdGhpcy5fbWVudS5wb3NpdGlvbih0aGlzLl9hbmNob3IuYW5jaG9yRWwsIHRoaXMucGxhY2VtZW50KTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHByaXZhdGUgX3NldEtleWJvYXJkSGFuZGxlcnMoKSB7XHJcbiAgICBjb25zdCBsaXN0ZW5lcnMgPSBbXTtcclxuICAgIGlmICh0aGlzLl9hbmNob3IpIHtcclxuICAgICAgY29uc3QgYW5jaG9yJCA9IGZyb21FdmVudDxLZXlib2FyZEV2ZW50Pih0aGlzLl9hbmNob3IuYW5jaG9yRWwsICdrZXlkb3duJykucGlwZShmaWx0ZXIoZmlsdGVyS2V5Ym9hcmRFdmVudHMpKTtcclxuICAgICAgbGlzdGVuZXJzLnB1c2goYW5jaG9yJCk7XHJcbiAgICB9XHJcbiAgICBpZiAodGhpcy5fbWVudSkge1xyXG4gICAgICBjb25zdCBpdGVtcyQgPVxyXG4gICAgICAgICAgbWVyZ2UoLi4udGhpcy5fbWVudS5tZW51SXRlbXMubWFwKGl0ZW0gPT4gZnJvbUV2ZW50PEtleWJvYXJkRXZlbnQ+KGl0ZW0uZHJvcGRvd25JdGVtRWwsICdrZXlkb3duJykpKVxyXG4gICAgICAgICAgICAgIC5waXBlKGZpbHRlcihmaWx0ZXJLZXlib2FyZEV2ZW50cykpO1xyXG4gICAgICBsaXN0ZW5lcnMucHVzaChpdGVtcyQpO1xyXG4gICAgfVxyXG5cclxuICAgIG1lcmdlKC4uLmxpc3RlbmVycykuc3Vic2NyaWJlKHRoaXMub25LZXlEb3duLmJpbmQodGhpcykpO1xyXG4gIH1cclxuXHJcbiAgb25LZXlEb3duKGV2ZW50OiBLZXlib2FyZEV2ZW50KSB7XHJcbiAgICBpZiAoIXRoaXMuaXNPcGVuKCkpIHtcclxuICAgICAgdGhpcy5vcGVuKCk7XHJcbiAgICB9XHJcbiAgICBjb25zdCBsaXN0ID0gdGhpcy5fZ2V0TWVudUVsZW1lbnRzKCk7XHJcblxyXG4gICAgaWYgKGxpc3QubGVuZ3RoID09PSAwKSB7XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuXHJcbiAgICBsZXQgcG9zaXRpb24gPSBsaXN0LmZpbmRJbmRleChlbGVtZW50ID0+IGVsZW1lbnQgPT09IHRoaXMuX2RvY3VtZW50LmFjdGl2ZUVsZW1lbnQpO1xyXG4gICAgc3dpdGNoIChldmVudC53aGljaCkge1xyXG4gICAgICBjYXNlIEtleS5BcnJvd0Rvd246XHJcbiAgICAgICAgcG9zaXRpb24gPSBNYXRoLm1pbihwb3NpdGlvbiArIDEsIGxpc3QubGVuZ3RoIC0gMSk7XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICAgIGNhc2UgS2V5LkFycm93VXA6XHJcbiAgICAgICAgcG9zaXRpb24gPSBNYXRoLm1heChwb3NpdGlvbiAtIDEsIDApO1xyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgICBjYXNlIEtleS5Ib21lOlxyXG4gICAgICAgIHBvc2l0aW9uID0gMDtcclxuICAgICAgICBicmVhaztcclxuICAgICAgY2FzZSBLZXkuRW5kOlxyXG4gICAgICAgIHBvc2l0aW9uID0gbGlzdC5sZW5ndGggLSAxO1xyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgfVxyXG4gICAgY29uc3QgZWxtOiBIVE1MRWxlbWVudCA9IGxpc3RbcG9zaXRpb25dO1xyXG4gICAgZWxtLmZvY3VzKCk7XHJcblxyXG4gICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgX2dldE1lbnVFbGVtZW50cygpOiBIVE1MRWxlbWVudFtdIHtcclxuICAgIGlmICh0aGlzLl9tZW51ID09IG51bGwpIHtcclxuICAgICAgcmV0dXJuIFtdO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIHRoaXMuX21lbnUubWVudUl0ZW1zLmZpbHRlcihpdGVtID0+ICFpdGVtLmRpc2FibGVkKS5tYXAoaXRlbSA9PiBpdGVtLmRyb3Bkb3duSXRlbUVsKTtcclxuICB9XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGZpbHRlcktleWJvYXJkRXZlbnRzKGV2ZW50OiBLZXlib2FyZEV2ZW50KTogYm9vbGVhbiB7XHJcbiAgcmV0dXJuIGV2ZW50LndoaWNoID09PSBLZXkuQXJyb3dEb3duIHx8IGV2ZW50LndoaWNoID09PSBLZXkuQXJyb3dVcCB8fCBldmVudC53aGljaCA9PT0gS2V5LkhvbWUgfHxcclxuICAgICAgZXZlbnQud2hpY2ggPT09IEtleS5FbmQ7XHJcbn1cclxuIiwiaW1wb3J0IHtOZ01vZHVsZSwgTW9kdWxlV2l0aFByb3ZpZGVyc30gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7TmdiRHJvcGRvd24sIE5nYkRyb3Bkb3duQW5jaG9yLCBOZ2JEcm9wZG93blRvZ2dsZSwgTmdiRHJvcGRvd25NZW51LCBOZ2JEcm9wZG93bkl0ZW19IGZyb20gJy4vZHJvcGRvd24nO1xyXG5cclxuZXhwb3J0IHtOZ2JEcm9wZG93biwgTmdiRHJvcGRvd25Ub2dnbGUsIE5nYkRyb3Bkb3duTWVudX0gZnJvbSAnLi9kcm9wZG93bic7XHJcbmV4cG9ydCB7TmdiRHJvcGRvd25Db25maWd9IGZyb20gJy4vZHJvcGRvd24tY29uZmlnJztcclxuXHJcbmNvbnN0IE5HQl9EUk9QRE9XTl9ESVJFQ1RJVkVTID0gW05nYkRyb3Bkb3duLCBOZ2JEcm9wZG93bkFuY2hvciwgTmdiRHJvcGRvd25Ub2dnbGUsIE5nYkRyb3Bkb3duTWVudSwgTmdiRHJvcGRvd25JdGVtXTtcclxuXHJcbkBOZ01vZHVsZSh7ZGVjbGFyYXRpb25zOiBOR0JfRFJPUERPV05fRElSRUNUSVZFUywgZXhwb3J0czogTkdCX0RST1BET1dOX0RJUkVDVElWRVN9KVxyXG5leHBvcnQgY2xhc3MgTmdiRHJvcGRvd25Nb2R1bGUge1xyXG4gIC8qKlxyXG4gICAqIEltcG9ydGluZyB3aXRoICcuZm9yUm9vdCgpJyBpcyBubyBsb25nZXIgbmVjZXNzYXJ5LCB5b3UgY2FuIHNpbXBseSBpbXBvcnQgdGhlIG1vZHVsZS5cclxuICAgKiBXaWxsIGJlIHJlbW92ZWQgaW4gNC4wLjAuXHJcbiAgICpcclxuICAgKiBAZGVwcmVjYXRlZCAzLjAuMFxyXG4gICAqL1xyXG4gIHN0YXRpYyBmb3JSb290KCk6IE1vZHVsZVdpdGhQcm92aWRlcnMgeyByZXR1cm4ge25nTW9kdWxlOiBOZ2JEcm9wZG93bk1vZHVsZX07IH1cclxufVxyXG4iLCJpbXBvcnQge0NvbXBvbmVudCwgSW5wdXR9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5cclxuQENvbXBvbmVudCh7XHJcbiAgc2VsZWN0b3I6ICduZ2ItbW9kYWwtYmFja2Ryb3AnLFxyXG4gIHRlbXBsYXRlOiAnJyxcclxuICBob3N0OlxyXG4gICAgICB7J1tjbGFzc10nOiAnXCJtb2RhbC1iYWNrZHJvcCBmYWRlIHNob3dcIiArIChiYWNrZHJvcENsYXNzID8gXCIgXCIgKyBiYWNrZHJvcENsYXNzIDogXCJcIiknLCAnc3R5bGUnOiAnei1pbmRleDogMTA1MCd9XHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBOZ2JNb2RhbEJhY2tkcm9wIHtcclxuICBASW5wdXQoKSBiYWNrZHJvcENsYXNzOiBzdHJpbmc7XHJcbn1cclxuIiwiZXhwb3J0IGVudW0gTW9kYWxEaXNtaXNzUmVhc29ucyB7XHJcbiAgQkFDS0RST1BfQ0xJQ0ssXHJcbiAgRVNDXHJcbn1cclxuIiwiaW1wb3J0IHtET0NVTUVOVH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcclxuaW1wb3J0IHtcclxuICBDb21wb25lbnQsXHJcbiAgT3V0cHV0LFxyXG4gIEV2ZW50RW1pdHRlcixcclxuICBJbnB1dCxcclxuICBJbmplY3QsXHJcbiAgRWxlbWVudFJlZixcclxuICBPbkluaXQsXHJcbiAgQWZ0ZXJWaWV3SW5pdCxcclxuICBPbkRlc3Ryb3lcclxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuXHJcbmltcG9ydCB7TW9kYWxEaXNtaXNzUmVhc29uc30gZnJvbSAnLi9tb2RhbC1kaXNtaXNzLXJlYXNvbnMnO1xyXG5cclxuQENvbXBvbmVudCh7XHJcbiAgc2VsZWN0b3I6ICduZ2ItbW9kYWwtd2luZG93JyxcclxuICBob3N0OiB7XHJcbiAgICAnW2NsYXNzXSc6ICdcIm1vZGFsIGZhZGUgc2hvdyBkLWJsb2NrXCIgKyAod2luZG93Q2xhc3MgPyBcIiBcIiArIHdpbmRvd0NsYXNzIDogXCJcIiknLFxyXG4gICAgJ3JvbGUnOiAnZGlhbG9nJyxcclxuICAgICd0YWJpbmRleCc6ICctMScsXHJcbiAgICAnKGtleXVwLmVzYyknOiAnZXNjS2V5KCRldmVudCknLFxyXG4gICAgJyhjbGljayknOiAnYmFja2Ryb3BDbGljaygkZXZlbnQpJyxcclxuICAgICdbYXR0ci5hcmlhLWxhYmVsbGVkYnldJzogJ2FyaWFMYWJlbGxlZEJ5JyxcclxuICB9LFxyXG4gIHRlbXBsYXRlOiBgXHJcbiAgICA8ZGl2IFtjbGFzc109XCInbW9kYWwtZGlhbG9nJyArIChzaXplID8gJyBtb2RhbC0nICsgc2l6ZSA6ICcnKSArIChjZW50ZXJlZCA/ICcgbW9kYWwtZGlhbG9nLWNlbnRlcmVkJyA6ICcnKVwiIHJvbGU9XCJkb2N1bWVudFwiPlxyXG4gICAgICAgIDxkaXYgY2xhc3M9XCJtb2RhbC1jb250ZW50XCI+PG5nLWNvbnRlbnQ+PC9uZy1jb250ZW50PjwvZGl2PlxyXG4gICAgPC9kaXY+XHJcbiAgICBgXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBOZ2JNb2RhbFdpbmRvdyBpbXBsZW1lbnRzIE9uSW5pdCxcclxuICAgIEFmdGVyVmlld0luaXQsIE9uRGVzdHJveSB7XHJcbiAgcHJpdmF0ZSBfZWxXaXRoRm9jdXM6IEVsZW1lbnQ7ICAvLyBlbGVtZW50IHRoYXQgaXMgZm9jdXNlZCBwcmlvciB0byBtb2RhbCBvcGVuaW5nXHJcblxyXG4gIEBJbnB1dCgpIGFyaWFMYWJlbGxlZEJ5OiBzdHJpbmc7XHJcbiAgQElucHV0KCkgYmFja2Ryb3A6IGJvb2xlYW4gfCBzdHJpbmcgPSB0cnVlO1xyXG4gIEBJbnB1dCgpIGNlbnRlcmVkOiBzdHJpbmc7XHJcbiAgQElucHV0KCkga2V5Ym9hcmQgPSB0cnVlO1xyXG4gIEBJbnB1dCgpIHNpemU6IHN0cmluZztcclxuICBASW5wdXQoKSB3aW5kb3dDbGFzczogc3RyaW5nO1xyXG5cclxuICBAT3V0cHV0KCdkaXNtaXNzJykgZGlzbWlzc0V2ZW50ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xyXG5cclxuICBjb25zdHJ1Y3RvcihASW5qZWN0KERPQ1VNRU5UKSBwcml2YXRlIF9kb2N1bWVudDogYW55LCBwcml2YXRlIF9lbFJlZjogRWxlbWVudFJlZjxIVE1MRWxlbWVudD4pIHt9XHJcblxyXG4gIGJhY2tkcm9wQ2xpY2soJGV2ZW50KTogdm9pZCB7XHJcbiAgICBpZiAodGhpcy5iYWNrZHJvcCA9PT0gdHJ1ZSAmJiB0aGlzLl9lbFJlZi5uYXRpdmVFbGVtZW50ID09PSAkZXZlbnQudGFyZ2V0KSB7XHJcbiAgICAgIHRoaXMuZGlzbWlzcyhNb2RhbERpc21pc3NSZWFzb25zLkJBQ0tEUk9QX0NMSUNLKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIGVzY0tleSgkZXZlbnQpOiB2b2lkIHtcclxuICAgIGlmICh0aGlzLmtleWJvYXJkICYmICEkZXZlbnQuZGVmYXVsdFByZXZlbnRlZCkge1xyXG4gICAgICB0aGlzLmRpc21pc3MoTW9kYWxEaXNtaXNzUmVhc29ucy5FU0MpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgZGlzbWlzcyhyZWFzb24pOiB2b2lkIHsgdGhpcy5kaXNtaXNzRXZlbnQuZW1pdChyZWFzb24pOyB9XHJcblxyXG4gIG5nT25Jbml0KCkgeyB0aGlzLl9lbFdpdGhGb2N1cyA9IHRoaXMuX2RvY3VtZW50LmFjdGl2ZUVsZW1lbnQ7IH1cclxuXHJcbiAgbmdBZnRlclZpZXdJbml0KCkge1xyXG4gICAgaWYgKCF0aGlzLl9lbFJlZi5uYXRpdmVFbGVtZW50LmNvbnRhaW5zKGRvY3VtZW50LmFjdGl2ZUVsZW1lbnQpKSB7XHJcbiAgICAgIHRoaXMuX2VsUmVmLm5hdGl2ZUVsZW1lbnRbJ2ZvY3VzJ10uYXBwbHkodGhpcy5fZWxSZWYubmF0aXZlRWxlbWVudCwgW10pO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgbmdPbkRlc3Ryb3koKSB7XHJcbiAgICBjb25zdCBib2R5ID0gdGhpcy5fZG9jdW1lbnQuYm9keTtcclxuICAgIGNvbnN0IGVsV2l0aEZvY3VzID0gdGhpcy5fZWxXaXRoRm9jdXM7XHJcblxyXG4gICAgbGV0IGVsZW1lbnRUb0ZvY3VzO1xyXG4gICAgaWYgKGVsV2l0aEZvY3VzICYmIGVsV2l0aEZvY3VzWydmb2N1cyddICYmIGJvZHkuY29udGFpbnMoZWxXaXRoRm9jdXMpKSB7XHJcbiAgICAgIGVsZW1lbnRUb0ZvY3VzID0gZWxXaXRoRm9jdXM7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBlbGVtZW50VG9Gb2N1cyA9IGJvZHk7XHJcbiAgICB9XHJcbiAgICBlbGVtZW50VG9Gb2N1c1snZm9jdXMnXS5hcHBseShlbGVtZW50VG9Gb2N1cywgW10pO1xyXG5cclxuICAgIHRoaXMuX2VsV2l0aEZvY3VzID0gbnVsbDtcclxuICB9XHJcbn1cclxuIiwiaW1wb3J0IHtJbmplY3RhYmxlLCBJbmplY3Rvcn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcblxyXG4vKipcclxuICogUmVwcmVzZW50IG9wdGlvbnMgYXZhaWxhYmxlIHdoZW4gb3BlbmluZyBuZXcgbW9kYWwgd2luZG93cy5cclxuICovXHJcbmV4cG9ydCBpbnRlcmZhY2UgTmdiTW9kYWxPcHRpb25zIHtcclxuICAvKipcclxuICAgKiBTZXRzIHRoZSBhcmlhIGF0dHJpYnV0ZSBhcmlhLWxhYmVsbGVkYnkgdG8gYSBtb2RhbCB3aW5kb3cuXHJcbiAgICpcclxuICAgKiBAc2luY2UgMi4yLjBcclxuICAgKi9cclxuICBhcmlhTGFiZWxsZWRCeT86IHN0cmluZztcclxuXHJcbiAgLyoqXHJcbiAgICogV2hldGhlciBhIGJhY2tkcm9wIGVsZW1lbnQgc2hvdWxkIGJlIGNyZWF0ZWQgZm9yIGEgZ2l2ZW4gbW9kYWwgKHRydWUgYnkgZGVmYXVsdCkuXHJcbiAgICogQWx0ZXJuYXRpdmVseSwgc3BlY2lmeSAnc3RhdGljJyBmb3IgYSBiYWNrZHJvcCB3aGljaCBkb2Vzbid0IGNsb3NlIHRoZSBtb2RhbCBvbiBjbGljay5cclxuICAgKi9cclxuICBiYWNrZHJvcD86IGJvb2xlYW4gfCAnc3RhdGljJztcclxuXHJcbiAgLyoqXHJcbiAgICogRnVuY3Rpb24gY2FsbGVkIHdoZW4gYSBtb2RhbCB3aWxsIGJlIGRpc21pc3NlZC5cclxuICAgKiBJZiB0aGlzIGZ1bmN0aW9uIHJldHVybnMgZmFsc2UsIHRoZSBwcm9taXNlIGlzIHJlc29sdmVkIHdpdGggZmFsc2Ugb3IgdGhlIHByb21pc2UgaXMgcmVqZWN0ZWQsIHRoZSBtb2RhbCBpcyBub3RcclxuICAgKiBkaXNtaXNzZWQuXHJcbiAgICovXHJcbiAgYmVmb3JlRGlzbWlzcz86ICgpID0+IGJvb2xlYW4gfCBQcm9taXNlPGJvb2xlYW4+O1xyXG5cclxuICAvKipcclxuICAgKiBUbyBjZW50ZXIgdGhlIG1vZGFsIHZlcnRpY2FsbHkgKGZhbHNlIGJ5IGRlZmF1bHQpLlxyXG4gICAqXHJcbiAgICogQHNpbmNlIDEuMS4wXHJcbiAgICovXHJcbiAgY2VudGVyZWQ/OiBib29sZWFuO1xyXG5cclxuICAvKipcclxuICAgKiBBbiBlbGVtZW50IHRvIHdoaWNoIHRvIGF0dGFjaCBuZXdseSBvcGVuZWQgbW9kYWwgd2luZG93cy5cclxuICAgKi9cclxuICBjb250YWluZXI/OiBzdHJpbmc7XHJcblxyXG4gIC8qKlxyXG4gICAqIEluamVjdG9yIHRvIHVzZSBmb3IgbW9kYWwgY29udGVudC5cclxuICAgKi9cclxuICBpbmplY3Rvcj86IEluamVjdG9yO1xyXG5cclxuICAvKipcclxuICAgKiBXaGV0aGVyIHRvIGNsb3NlIHRoZSBtb2RhbCB3aGVuIGVzY2FwZSBrZXkgaXMgcHJlc3NlZCAodHJ1ZSBieSBkZWZhdWx0KS5cclxuICAgKi9cclxuICBrZXlib2FyZD86IGJvb2xlYW47XHJcblxyXG4gIC8qKlxyXG4gICAqIFNpemUgb2YgYSBuZXcgbW9kYWwgd2luZG93LlxyXG4gICAqL1xyXG4gIHNpemU/OiAnc20nIHwgJ2xnJztcclxuXHJcbiAgLyoqXHJcbiAgICogQ3VzdG9tIGNsYXNzIHRvIGFwcGVuZCB0byB0aGUgbW9kYWwgd2luZG93XHJcbiAgICovXHJcbiAgd2luZG93Q2xhc3M/OiBzdHJpbmc7XHJcblxyXG4gIC8qKlxyXG4gICAqIEN1c3RvbSBjbGFzcyB0byBhcHBlbmQgdG8gdGhlIG1vZGFsIGJhY2tkcm9wXHJcbiAgICpcclxuICAgKiBAc2luY2UgMS4xLjBcclxuICAgKi9cclxuICBiYWNrZHJvcENsYXNzPzogc3RyaW5nO1xyXG59XHJcblxyXG4vKipcclxuKiBDb25maWd1cmF0aW9uIG9iamVjdCB0b2tlbiBmb3IgdGhlIE5nYk1vZGFsIHNlcnZpY2UuXHJcbiogWW91IGNhbiBwcm92aWRlIHRoaXMgY29uZmlndXJhdGlvbiwgdHlwaWNhbGx5IGluIHlvdXIgcm9vdCBtb2R1bGUgaW4gb3JkZXIgdG8gcHJvdmlkZSBkZWZhdWx0IG9wdGlvbiB2YWx1ZXMgZm9yIGV2ZXJ5XHJcbiogbW9kYWwuXHJcbipcclxuKiBAc2luY2UgMy4xLjBcclxuKi9cclxuQEluamVjdGFibGUoe3Byb3ZpZGVkSW46ICdyb290J30pXHJcbmV4cG9ydCBjbGFzcyBOZ2JNb2RhbENvbmZpZyBpbXBsZW1lbnRzIE5nYk1vZGFsT3B0aW9ucyB7XHJcbiAgYmFja2Ryb3A6IGJvb2xlYW4gfCAnc3RhdGljJyA9IHRydWU7XHJcbiAga2V5Ym9hcmQgPSB0cnVlO1xyXG59XHJcbiIsImltcG9ydCB7XHJcbiAgSW5qZWN0b3IsXHJcbiAgVGVtcGxhdGVSZWYsXHJcbiAgVmlld1JlZixcclxuICBWaWV3Q29udGFpbmVyUmVmLFxyXG4gIFJlbmRlcmVyMixcclxuICBDb21wb25lbnRSZWYsXHJcbiAgQ29tcG9uZW50RmFjdG9yeVJlc29sdmVyXHJcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcblxyXG5leHBvcnQgY2xhc3MgQ29udGVudFJlZiB7XHJcbiAgY29uc3RydWN0b3IocHVibGljIG5vZGVzOiBhbnlbXSwgcHVibGljIHZpZXdSZWY/OiBWaWV3UmVmLCBwdWJsaWMgY29tcG9uZW50UmVmPzogQ29tcG9uZW50UmVmPGFueT4pIHt9XHJcbn1cclxuXHJcbmV4cG9ydCBjbGFzcyBQb3B1cFNlcnZpY2U8VD4ge1xyXG4gIHByaXZhdGUgX3dpbmRvd1JlZjogQ29tcG9uZW50UmVmPFQ+O1xyXG4gIHByaXZhdGUgX2NvbnRlbnRSZWY6IENvbnRlbnRSZWY7XHJcblxyXG4gIGNvbnN0cnVjdG9yKFxyXG4gICAgICBwcml2YXRlIF90eXBlOiBhbnksIHByaXZhdGUgX2luamVjdG9yOiBJbmplY3RvciwgcHJpdmF0ZSBfdmlld0NvbnRhaW5lclJlZjogVmlld0NvbnRhaW5lclJlZixcclxuICAgICAgcHJpdmF0ZSBfcmVuZGVyZXI6IFJlbmRlcmVyMiwgcHJpdmF0ZSBfY29tcG9uZW50RmFjdG9yeVJlc29sdmVyOiBDb21wb25lbnRGYWN0b3J5UmVzb2x2ZXIpIHt9XHJcblxyXG4gIG9wZW4oY29udGVudD86IHN0cmluZyB8IFRlbXBsYXRlUmVmPGFueT4sIGNvbnRleHQ/OiBhbnkpOiBDb21wb25lbnRSZWY8VD4ge1xyXG4gICAgaWYgKCF0aGlzLl93aW5kb3dSZWYpIHtcclxuICAgICAgdGhpcy5fY29udGVudFJlZiA9IHRoaXMuX2dldENvbnRlbnRSZWYoY29udGVudCwgY29udGV4dCk7XHJcbiAgICAgIHRoaXMuX3dpbmRvd1JlZiA9IHRoaXMuX3ZpZXdDb250YWluZXJSZWYuY3JlYXRlQ29tcG9uZW50KFxyXG4gICAgICAgICAgdGhpcy5fY29tcG9uZW50RmFjdG9yeVJlc29sdmVyLnJlc29sdmVDb21wb25lbnRGYWN0b3J5PFQ+KHRoaXMuX3R5cGUpLCAwLCB0aGlzLl9pbmplY3RvcixcclxuICAgICAgICAgIHRoaXMuX2NvbnRlbnRSZWYubm9kZXMpO1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiB0aGlzLl93aW5kb3dSZWY7XHJcbiAgfVxyXG5cclxuICBjbG9zZSgpIHtcclxuICAgIGlmICh0aGlzLl93aW5kb3dSZWYpIHtcclxuICAgICAgdGhpcy5fdmlld0NvbnRhaW5lclJlZi5yZW1vdmUodGhpcy5fdmlld0NvbnRhaW5lclJlZi5pbmRleE9mKHRoaXMuX3dpbmRvd1JlZi5ob3N0VmlldykpO1xyXG4gICAgICB0aGlzLl93aW5kb3dSZWYgPSBudWxsO1xyXG5cclxuICAgICAgaWYgKHRoaXMuX2NvbnRlbnRSZWYudmlld1JlZikge1xyXG4gICAgICAgIHRoaXMuX3ZpZXdDb250YWluZXJSZWYucmVtb3ZlKHRoaXMuX3ZpZXdDb250YWluZXJSZWYuaW5kZXhPZih0aGlzLl9jb250ZW50UmVmLnZpZXdSZWYpKTtcclxuICAgICAgICB0aGlzLl9jb250ZW50UmVmID0gbnVsbDtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBfZ2V0Q29udGVudFJlZihjb250ZW50OiBzdHJpbmcgfCBUZW1wbGF0ZVJlZjxhbnk+LCBjb250ZXh0PzogYW55KTogQ29udGVudFJlZiB7XHJcbiAgICBpZiAoIWNvbnRlbnQpIHtcclxuICAgICAgcmV0dXJuIG5ldyBDb250ZW50UmVmKFtdKTtcclxuICAgIH0gZWxzZSBpZiAoY29udGVudCBpbnN0YW5jZW9mIFRlbXBsYXRlUmVmKSB7XHJcbiAgICAgIGNvbnN0IHZpZXdSZWYgPSB0aGlzLl92aWV3Q29udGFpbmVyUmVmLmNyZWF0ZUVtYmVkZGVkVmlldyg8VGVtcGxhdGVSZWY8VD4+Y29udGVudCwgY29udGV4dCk7XHJcbiAgICAgIHJldHVybiBuZXcgQ29udGVudFJlZihbdmlld1JlZi5yb290Tm9kZXNdLCB2aWV3UmVmKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHJldHVybiBuZXcgQ29udGVudFJlZihbW3RoaXMuX3JlbmRlcmVyLmNyZWF0ZVRleHQoYCR7Y29udGVudH1gKV1dKTtcclxuICAgIH1cclxuICB9XHJcbn1cclxuIiwiaW1wb3J0IHtJbmplY3RhYmxlLCBJbmplY3R9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQge0RPQ1VNRU5UfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xyXG5cclxuXHJcbmNvbnN0IG5vb3AgPSAoKSA9PiB7fTtcclxuXHJcblxyXG5cclxuLyoqIFR5cGUgZm9yIHRoZSBjYWxsYmFjayB1c2VkIHRvIHJldmVydCB0aGUgc2Nyb2xsYmFyIGNvbXBlbnNhdGlvbi4gKi9cclxuZXhwb3J0IHR5cGUgQ29tcGVuc2F0aW9uUmV2ZXJ0ZXIgPSAoKSA9PiB2b2lkO1xyXG5cclxuXHJcblxyXG4vKipcclxuICogVXRpbGl0eSB0byBoYW5kbGUgdGhlIHNjcm9sbGJhci5cclxuICpcclxuICogSXQgYWxsb3dzIHRvIGNvbXBlbnNhdGUgdGhlIGxhY2sgb2YgYSB2ZXJ0aWNhbCBzY3JvbGxiYXIgYnkgYWRkaW5nIGFuXHJcbiAqIGVxdWl2YWxlbnQgcGFkZGluZyBvbiB0aGUgcmlnaHQgb2YgdGhlIGJvZHksIGFuZCB0byByZW1vdmUgdGhpcyBjb21wZW5zYXRpb24uXHJcbiAqL1xyXG5ASW5qZWN0YWJsZSh7cHJvdmlkZWRJbjogJ3Jvb3QnfSlcclxuZXhwb3J0IGNsYXNzIFNjcm9sbEJhciB7XHJcbiAgY29uc3RydWN0b3IoQEluamVjdChET0NVTUVOVCkgcHJpdmF0ZSBfZG9jdW1lbnQ6IGFueSkge31cclxuXHJcbiAgLyoqXHJcbiAgICogRGV0ZWN0cyBpZiBhIHNjcm9sbGJhciBpcyBwcmVzZW50IGFuZCBpZiB5ZXMsIGFscmVhZHkgY29tcGVuc2F0ZXMgZm9yIGl0c1xyXG4gICAqIHJlbW92YWwgYnkgYWRkaW5nIGFuIGVxdWl2YWxlbnQgcGFkZGluZyBvbiB0aGUgcmlnaHQgb2YgdGhlIGJvZHkuXHJcbiAgICpcclxuICAgKiBAcmV0dXJuIGEgY2FsbGJhY2sgdXNlZCB0byByZXZlcnQgdGhlIGNvbXBlbnNhdGlvbiAobm9vcCBpZiB0aGVyZSB3YXMgbm9uZSxcclxuICAgKiBvdGhlcndpc2UgYSBmdW5jdGlvbiByZW1vdmluZyB0aGUgcGFkZGluZylcclxuICAgKi9cclxuICBjb21wZW5zYXRlKCk6IENvbXBlbnNhdGlvblJldmVydGVyIHsgcmV0dXJuICF0aGlzLl9pc1ByZXNlbnQoKSA/IG5vb3AgOiB0aGlzLl9hZGp1c3RCb2R5KHRoaXMuX2dldFdpZHRoKCkpOyB9XHJcblxyXG4gIC8qKlxyXG4gICAqIEFkZHMgYSBwYWRkaW5nIG9mIHRoZSBnaXZlbiB3aWR0aCBvbiB0aGUgcmlnaHQgb2YgdGhlIGJvZHkuXHJcbiAgICpcclxuICAgKiBAcmV0dXJuIGEgY2FsbGJhY2sgdXNlZCB0byByZXZlcnQgdGhlIHBhZGRpbmcgdG8gaXRzIHByZXZpb3VzIHZhbHVlXHJcbiAgICovXHJcbiAgcHJpdmF0ZSBfYWRqdXN0Qm9keSh3aWR0aDogbnVtYmVyKTogQ29tcGVuc2F0aW9uUmV2ZXJ0ZXIge1xyXG4gICAgY29uc3QgYm9keSA9IHRoaXMuX2RvY3VtZW50LmJvZHk7XHJcbiAgICBjb25zdCB1c2VyU2V0UGFkZGluZyA9IGJvZHkuc3R5bGUucGFkZGluZ1JpZ2h0O1xyXG4gICAgY29uc3QgcGFkZGluZ0Ftb3VudCA9IHBhcnNlRmxvYXQod2luZG93LmdldENvbXB1dGVkU3R5bGUoYm9keSlbJ3BhZGRpbmctcmlnaHQnXSk7XHJcbiAgICBib2R5LnN0eWxlWydwYWRkaW5nLXJpZ2h0J10gPSBgJHtwYWRkaW5nQW1vdW50ICsgd2lkdGh9cHhgO1xyXG4gICAgcmV0dXJuICgpID0+IGJvZHkuc3R5bGVbJ3BhZGRpbmctcmlnaHQnXSA9IHVzZXJTZXRQYWRkaW5nO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogVGVsbHMgd2hldGhlciBhIHNjcm9sbGJhciBpcyBjdXJyZW50bHkgcHJlc2VudCBvbiB0aGUgYm9keS5cclxuICAgKlxyXG4gICAqIEByZXR1cm4gdHJ1ZSBpZiBzY3JvbGxiYXIgaXMgcHJlc2VudCwgZmFsc2Ugb3RoZXJ3aXNlXHJcbiAgICovXHJcbiAgcHJpdmF0ZSBfaXNQcmVzZW50KCk6IGJvb2xlYW4ge1xyXG4gICAgY29uc3QgcmVjdCA9IHRoaXMuX2RvY3VtZW50LmJvZHkuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XHJcbiAgICByZXR1cm4gcmVjdC5sZWZ0ICsgcmVjdC5yaWdodCA8IHdpbmRvdy5pbm5lcldpZHRoO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogQ2FsY3VsYXRlcyBhbmQgcmV0dXJucyB0aGUgd2lkdGggb2YgYSBzY3JvbGxiYXIuXHJcbiAgICpcclxuICAgKiBAcmV0dXJuIHRoZSB3aWR0aCBvZiBhIHNjcm9sbGJhciBvbiB0aGlzIHBhZ2VcclxuICAgKi9cclxuICBwcml2YXRlIF9nZXRXaWR0aCgpOiBudW1iZXIge1xyXG4gICAgY29uc3QgbWVhc3VyZXIgPSB0aGlzLl9kb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcclxuICAgIG1lYXN1cmVyLmNsYXNzTmFtZSA9ICdtb2RhbC1zY3JvbGxiYXItbWVhc3VyZSc7XHJcblxyXG4gICAgY29uc3QgYm9keSA9IHRoaXMuX2RvY3VtZW50LmJvZHk7XHJcbiAgICBib2R5LmFwcGVuZENoaWxkKG1lYXN1cmVyKTtcclxuICAgIGNvbnN0IHdpZHRoID0gbWVhc3VyZXIuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkud2lkdGggLSBtZWFzdXJlci5jbGllbnRXaWR0aDtcclxuICAgIGJvZHkucmVtb3ZlQ2hpbGQobWVhc3VyZXIpO1xyXG5cclxuICAgIHJldHVybiB3aWR0aDtcclxuICB9XHJcbn1cclxuIiwiaW1wb3J0IHtDb21wb25lbnRSZWZ9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5cclxuaW1wb3J0IHtOZ2JNb2RhbEJhY2tkcm9wfSBmcm9tICcuL21vZGFsLWJhY2tkcm9wJztcclxuaW1wb3J0IHtOZ2JNb2RhbFdpbmRvd30gZnJvbSAnLi9tb2RhbC13aW5kb3cnO1xyXG5cclxuaW1wb3J0IHtDb250ZW50UmVmfSBmcm9tICcuLi91dGlsL3BvcHVwJztcclxuXHJcbi8qKlxyXG4gKiBBIHJlZmVyZW5jZSB0byBhbiBhY3RpdmUgKGN1cnJlbnRseSBvcGVuZWQpIG1vZGFsLiBJbnN0YW5jZXMgb2YgdGhpcyBjbGFzc1xyXG4gKiBjYW4gYmUgaW5qZWN0ZWQgaW50byBjb21wb25lbnRzIHBhc3NlZCBhcyBtb2RhbCBjb250ZW50LlxyXG4gKi9cclxuZXhwb3J0IGNsYXNzIE5nYkFjdGl2ZU1vZGFsIHtcclxuICAvKipcclxuICAgKiBDYW4gYmUgdXNlZCB0byBjbG9zZSBhIG1vZGFsLCBwYXNzaW5nIGFuIG9wdGlvbmFsIHJlc3VsdC5cclxuICAgKi9cclxuICBjbG9zZShyZXN1bHQ/OiBhbnkpOiB2b2lkIHt9XHJcblxyXG4gIC8qKlxyXG4gICAqIENhbiBiZSB1c2VkIHRvIGRpc21pc3MgYSBtb2RhbCwgcGFzc2luZyBhbiBvcHRpb25hbCByZWFzb24uXHJcbiAgICovXHJcbiAgZGlzbWlzcyhyZWFzb24/OiBhbnkpOiB2b2lkIHt9XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBBIHJlZmVyZW5jZSB0byBhIG5ld2x5IG9wZW5lZCBtb2RhbC5cclxuICovXHJcbmV4cG9ydCBjbGFzcyBOZ2JNb2RhbFJlZiB7XHJcbiAgcHJpdmF0ZSBfcmVzb2x2ZTogKHJlc3VsdD86IGFueSkgPT4gdm9pZDtcclxuICBwcml2YXRlIF9yZWplY3Q6IChyZWFzb24/OiBhbnkpID0+IHZvaWQ7XHJcblxyXG4gIC8qKlxyXG4gICAqIFRoZSBpbnN0YW5jZSBvZiBjb21wb25lbnQgdXNlZCBhcyBtb2RhbCdzIGNvbnRlbnQuXHJcbiAgICogVW5kZWZpbmVkIHdoZW4gYSBUZW1wbGF0ZVJlZiBpcyB1c2VkIGFzIG1vZGFsJ3MgY29udGVudC5cclxuICAgKi9cclxuICBnZXQgY29tcG9uZW50SW5zdGFuY2UoKTogYW55IHtcclxuICAgIGlmICh0aGlzLl9jb250ZW50UmVmLmNvbXBvbmVudFJlZikge1xyXG4gICAgICByZXR1cm4gdGhpcy5fY29udGVudFJlZi5jb21wb25lbnRSZWYuaW5zdGFuY2U7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBBIHByb21pc2UgdGhhdCBpcyByZXNvbHZlZCB3aGVuIGEgbW9kYWwgaXMgY2xvc2VkIGFuZCByZWplY3RlZCB3aGVuIGEgbW9kYWwgaXMgZGlzbWlzc2VkLlxyXG4gICAqL1xyXG4gIHJlc3VsdDogUHJvbWlzZTxhbnk+O1xyXG5cclxuICBjb25zdHJ1Y3RvcihcclxuICAgICAgcHJpdmF0ZSBfd2luZG93Q21wdFJlZjogQ29tcG9uZW50UmVmPE5nYk1vZGFsV2luZG93PiwgcHJpdmF0ZSBfY29udGVudFJlZjogQ29udGVudFJlZixcclxuICAgICAgcHJpdmF0ZSBfYmFja2Ryb3BDbXB0UmVmPzogQ29tcG9uZW50UmVmPE5nYk1vZGFsQmFja2Ryb3A+LCBwcml2YXRlIF9iZWZvcmVEaXNtaXNzPzogRnVuY3Rpb24pIHtcclxuICAgIF93aW5kb3dDbXB0UmVmLmluc3RhbmNlLmRpc21pc3NFdmVudC5zdWJzY3JpYmUoKHJlYXNvbjogYW55KSA9PiB7IHRoaXMuZGlzbWlzcyhyZWFzb24pOyB9KTtcclxuXHJcbiAgICB0aGlzLnJlc3VsdCA9IG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcclxuICAgICAgdGhpcy5fcmVzb2x2ZSA9IHJlc29sdmU7XHJcbiAgICAgIHRoaXMuX3JlamVjdCA9IHJlamVjdDtcclxuICAgIH0pO1xyXG4gICAgdGhpcy5yZXN1bHQudGhlbihudWxsLCAoKSA9PiB7fSk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBDYW4gYmUgdXNlZCB0byBjbG9zZSBhIG1vZGFsLCBwYXNzaW5nIGFuIG9wdGlvbmFsIHJlc3VsdC5cclxuICAgKi9cclxuICBjbG9zZShyZXN1bHQ/OiBhbnkpOiB2b2lkIHtcclxuICAgIGlmICh0aGlzLl93aW5kb3dDbXB0UmVmKSB7XHJcbiAgICAgIHRoaXMuX3Jlc29sdmUocmVzdWx0KTtcclxuICAgICAgdGhpcy5fcmVtb3ZlTW9kYWxFbGVtZW50cygpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBfZGlzbWlzcyhyZWFzb24/OiBhbnkpIHtcclxuICAgIHRoaXMuX3JlamVjdChyZWFzb24pO1xyXG4gICAgdGhpcy5fcmVtb3ZlTW9kYWxFbGVtZW50cygpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogQ2FuIGJlIHVzZWQgdG8gZGlzbWlzcyBhIG1vZGFsLCBwYXNzaW5nIGFuIG9wdGlvbmFsIHJlYXNvbi5cclxuICAgKi9cclxuICBkaXNtaXNzKHJlYXNvbj86IGFueSk6IHZvaWQge1xyXG4gICAgaWYgKHRoaXMuX3dpbmRvd0NtcHRSZWYpIHtcclxuICAgICAgaWYgKCF0aGlzLl9iZWZvcmVEaXNtaXNzKSB7XHJcbiAgICAgICAgdGhpcy5fZGlzbWlzcyhyZWFzb24pO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIGNvbnN0IGRpc21pc3MgPSB0aGlzLl9iZWZvcmVEaXNtaXNzKCk7XHJcbiAgICAgICAgaWYgKGRpc21pc3MgJiYgZGlzbWlzcy50aGVuKSB7XHJcbiAgICAgICAgICBkaXNtaXNzLnRoZW4oXHJcbiAgICAgICAgICAgICAgcmVzdWx0ID0+IHtcclxuICAgICAgICAgICAgICAgIGlmIChyZXN1bHQgIT09IGZhbHNlKSB7XHJcbiAgICAgICAgICAgICAgICAgIHRoaXMuX2Rpc21pc3MocmVhc29uKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICgpID0+IHt9KTtcclxuICAgICAgICB9IGVsc2UgaWYgKGRpc21pc3MgIT09IGZhbHNlKSB7XHJcbiAgICAgICAgICB0aGlzLl9kaXNtaXNzKHJlYXNvbik7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIF9yZW1vdmVNb2RhbEVsZW1lbnRzKCkge1xyXG4gICAgY29uc3Qgd2luZG93TmF0aXZlRWwgPSB0aGlzLl93aW5kb3dDbXB0UmVmLmxvY2F0aW9uLm5hdGl2ZUVsZW1lbnQ7XHJcbiAgICB3aW5kb3dOYXRpdmVFbC5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKHdpbmRvd05hdGl2ZUVsKTtcclxuICAgIHRoaXMuX3dpbmRvd0NtcHRSZWYuZGVzdHJveSgpO1xyXG5cclxuICAgIGlmICh0aGlzLl9iYWNrZHJvcENtcHRSZWYpIHtcclxuICAgICAgY29uc3QgYmFja2Ryb3BOYXRpdmVFbCA9IHRoaXMuX2JhY2tkcm9wQ21wdFJlZi5sb2NhdGlvbi5uYXRpdmVFbGVtZW50O1xyXG4gICAgICBiYWNrZHJvcE5hdGl2ZUVsLnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQoYmFja2Ryb3BOYXRpdmVFbCk7XHJcbiAgICAgIHRoaXMuX2JhY2tkcm9wQ21wdFJlZi5kZXN0cm95KCk7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKHRoaXMuX2NvbnRlbnRSZWYgJiYgdGhpcy5fY29udGVudFJlZi52aWV3UmVmKSB7XHJcbiAgICAgIHRoaXMuX2NvbnRlbnRSZWYudmlld1JlZi5kZXN0cm95KCk7XHJcbiAgICB9XHJcblxyXG4gICAgdGhpcy5fd2luZG93Q21wdFJlZiA9IG51bGw7XHJcbiAgICB0aGlzLl9iYWNrZHJvcENtcHRSZWYgPSBudWxsO1xyXG4gICAgdGhpcy5fY29udGVudFJlZiA9IG51bGw7XHJcbiAgfVxyXG59XHJcbiIsImltcG9ydCB7RE9DVU1FTlR9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XHJcbmltcG9ydCB7XHJcbiAgQXBwbGljYXRpb25SZWYsXHJcbiAgQ29tcG9uZW50RmFjdG9yeVJlc29sdmVyLFxyXG4gIENvbXBvbmVudFJlZixcclxuICBJbmplY3QsXHJcbiAgSW5qZWN0YWJsZSxcclxuICBJbmplY3RvcixcclxuICBSZW5kZXJlckZhY3RvcnkyLFxyXG4gIFRlbXBsYXRlUmVmLFxyXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQge1N1YmplY3R9IGZyb20gJ3J4anMnO1xyXG5cclxuaW1wb3J0IHtuZ2JGb2N1c1RyYXB9IGZyb20gJy4uL3V0aWwvZm9jdXMtdHJhcCc7XHJcbmltcG9ydCB7Q29udGVudFJlZn0gZnJvbSAnLi4vdXRpbC9wb3B1cCc7XHJcbmltcG9ydCB7U2Nyb2xsQmFyfSBmcm9tICcuLi91dGlsL3Njcm9sbGJhcic7XHJcbmltcG9ydCB7aXNEZWZpbmVkLCBpc1N0cmluZ30gZnJvbSAnLi4vdXRpbC91dGlsJztcclxuaW1wb3J0IHtOZ2JNb2RhbEJhY2tkcm9wfSBmcm9tICcuL21vZGFsLWJhY2tkcm9wJztcclxuaW1wb3J0IHtOZ2JBY3RpdmVNb2RhbCwgTmdiTW9kYWxSZWZ9IGZyb20gJy4vbW9kYWwtcmVmJztcclxuaW1wb3J0IHtOZ2JNb2RhbFdpbmRvd30gZnJvbSAnLi9tb2RhbC13aW5kb3cnO1xyXG5cclxuQEluamVjdGFibGUoe3Byb3ZpZGVkSW46ICdyb290J30pXHJcbmV4cG9ydCBjbGFzcyBOZ2JNb2RhbFN0YWNrIHtcclxuICBwcml2YXRlIF93aW5kb3dBdHRyaWJ1dGVzID0gWydhcmlhTGFiZWxsZWRCeScsICdiYWNrZHJvcCcsICdjZW50ZXJlZCcsICdrZXlib2FyZCcsICdzaXplJywgJ3dpbmRvd0NsYXNzJ107XHJcbiAgcHJpdmF0ZSBfYmFja2Ryb3BBdHRyaWJ1dGVzID0gWydiYWNrZHJvcENsYXNzJ107XHJcbiAgcHJpdmF0ZSBfbW9kYWxSZWZzOiBOZ2JNb2RhbFJlZltdID0gW107XHJcbiAgcHJpdmF0ZSBfd2luZG93Q21wdHM6IENvbXBvbmVudFJlZjxOZ2JNb2RhbFdpbmRvdz5bXSA9IFtdO1xyXG4gIHByaXZhdGUgX2FjdGl2ZVdpbmRvd0NtcHRIYXNDaGFuZ2VkID0gbmV3IFN1YmplY3QoKTtcclxuXHJcbiAgY29uc3RydWN0b3IoXHJcbiAgICAgIHByaXZhdGUgX2FwcGxpY2F0aW9uUmVmOiBBcHBsaWNhdGlvblJlZiwgcHJpdmF0ZSBfaW5qZWN0b3I6IEluamVjdG9yLCBASW5qZWN0KERPQ1VNRU5UKSBwcml2YXRlIF9kb2N1bWVudDogYW55LFxyXG4gICAgICBwcml2YXRlIF9zY3JvbGxCYXI6IFNjcm9sbEJhciwgcHJpdmF0ZSBfcmVuZGVyZXJGYWN0b3J5OiBSZW5kZXJlckZhY3RvcnkyKSB7XHJcbiAgICAvLyBUcmFwIGZvY3VzIG9uIGFjdGl2ZSBXaW5kb3dDbXB0XHJcbiAgICB0aGlzLl9hY3RpdmVXaW5kb3dDbXB0SGFzQ2hhbmdlZC5zdWJzY3JpYmUoKCkgPT4ge1xyXG4gICAgICBpZiAodGhpcy5fd2luZG93Q21wdHMubGVuZ3RoKSB7XHJcbiAgICAgICAgY29uc3QgYWN0aXZlV2luZG93Q21wdCA9IHRoaXMuX3dpbmRvd0NtcHRzW3RoaXMuX3dpbmRvd0NtcHRzLmxlbmd0aCAtIDFdO1xyXG4gICAgICAgIG5nYkZvY3VzVHJhcChhY3RpdmVXaW5kb3dDbXB0LmxvY2F0aW9uLm5hdGl2ZUVsZW1lbnQsIHRoaXMuX2FjdGl2ZVdpbmRvd0NtcHRIYXNDaGFuZ2VkKTtcclxuICAgICAgfVxyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICBvcGVuKG1vZHVsZUNGUjogQ29tcG9uZW50RmFjdG9yeVJlc29sdmVyLCBjb250ZW50SW5qZWN0b3I6IEluamVjdG9yLCBjb250ZW50OiBhbnksIG9wdGlvbnMpOiBOZ2JNb2RhbFJlZiB7XHJcbiAgICBjb25zdCBjb250YWluZXJFbCA9XHJcbiAgICAgICAgaXNEZWZpbmVkKG9wdGlvbnMuY29udGFpbmVyKSA/IHRoaXMuX2RvY3VtZW50LnF1ZXJ5U2VsZWN0b3Iob3B0aW9ucy5jb250YWluZXIpIDogdGhpcy5fZG9jdW1lbnQuYm9keTtcclxuICAgIGNvbnN0IHJlbmRlcmVyID0gdGhpcy5fcmVuZGVyZXJGYWN0b3J5LmNyZWF0ZVJlbmRlcmVyKG51bGwsIG51bGwpO1xyXG5cclxuICAgIGNvbnN0IHJldmVydFBhZGRpbmdGb3JTY3JvbGxCYXIgPSB0aGlzLl9zY3JvbGxCYXIuY29tcGVuc2F0ZSgpO1xyXG4gICAgY29uc3QgcmVtb3ZlQm9keUNsYXNzID0gKCkgPT4ge1xyXG4gICAgICBpZiAoIXRoaXMuX21vZGFsUmVmcy5sZW5ndGgpIHtcclxuICAgICAgICByZW5kZXJlci5yZW1vdmVDbGFzcyh0aGlzLl9kb2N1bWVudC5ib2R5LCAnbW9kYWwtb3BlbicpO1xyXG4gICAgICB9XHJcbiAgICB9O1xyXG5cclxuICAgIGlmICghY29udGFpbmVyRWwpIHtcclxuICAgICAgdGhyb3cgbmV3IEVycm9yKGBUaGUgc3BlY2lmaWVkIG1vZGFsIGNvbnRhaW5lciBcIiR7b3B0aW9ucy5jb250YWluZXIgfHwgJ2JvZHknfVwiIHdhcyBub3QgZm91bmQgaW4gdGhlIERPTS5gKTtcclxuICAgIH1cclxuXHJcbiAgICBjb25zdCBhY3RpdmVNb2RhbCA9IG5ldyBOZ2JBY3RpdmVNb2RhbCgpO1xyXG4gICAgY29uc3QgY29udGVudFJlZiA9IHRoaXMuX2dldENvbnRlbnRSZWYobW9kdWxlQ0ZSLCBvcHRpb25zLmluamVjdG9yIHx8IGNvbnRlbnRJbmplY3RvciwgY29udGVudCwgYWN0aXZlTW9kYWwpO1xyXG5cclxuICAgIGxldCBiYWNrZHJvcENtcHRSZWY6IENvbXBvbmVudFJlZjxOZ2JNb2RhbEJhY2tkcm9wPiA9XHJcbiAgICAgICAgb3B0aW9ucy5iYWNrZHJvcCAhPT0gZmFsc2UgPyB0aGlzLl9hdHRhY2hCYWNrZHJvcChtb2R1bGVDRlIsIGNvbnRhaW5lckVsKSA6IG51bGw7XHJcbiAgICBsZXQgd2luZG93Q21wdFJlZjogQ29tcG9uZW50UmVmPE5nYk1vZGFsV2luZG93PiA9IHRoaXMuX2F0dGFjaFdpbmRvd0NvbXBvbmVudChtb2R1bGVDRlIsIGNvbnRhaW5lckVsLCBjb250ZW50UmVmKTtcclxuICAgIGxldCBuZ2JNb2RhbFJlZjogTmdiTW9kYWxSZWYgPSBuZXcgTmdiTW9kYWxSZWYod2luZG93Q21wdFJlZiwgY29udGVudFJlZiwgYmFja2Ryb3BDbXB0UmVmLCBvcHRpb25zLmJlZm9yZURpc21pc3MpO1xyXG5cclxuICAgIHRoaXMuX3JlZ2lzdGVyTW9kYWxSZWYobmdiTW9kYWxSZWYpO1xyXG4gICAgdGhpcy5fcmVnaXN0ZXJXaW5kb3dDbXB0KHdpbmRvd0NtcHRSZWYpO1xyXG4gICAgbmdiTW9kYWxSZWYucmVzdWx0LnRoZW4ocmV2ZXJ0UGFkZGluZ0ZvclNjcm9sbEJhciwgcmV2ZXJ0UGFkZGluZ0ZvclNjcm9sbEJhcik7XHJcbiAgICBuZ2JNb2RhbFJlZi5yZXN1bHQudGhlbihyZW1vdmVCb2R5Q2xhc3MsIHJlbW92ZUJvZHlDbGFzcyk7XHJcbiAgICBhY3RpdmVNb2RhbC5jbG9zZSA9IChyZXN1bHQ6IGFueSkgPT4geyBuZ2JNb2RhbFJlZi5jbG9zZShyZXN1bHQpOyB9O1xyXG4gICAgYWN0aXZlTW9kYWwuZGlzbWlzcyA9IChyZWFzb246IGFueSkgPT4geyBuZ2JNb2RhbFJlZi5kaXNtaXNzKHJlYXNvbik7IH07XHJcblxyXG4gICAgdGhpcy5fYXBwbHlXaW5kb3dPcHRpb25zKHdpbmRvd0NtcHRSZWYuaW5zdGFuY2UsIG9wdGlvbnMpO1xyXG4gICAgaWYgKHRoaXMuX21vZGFsUmVmcy5sZW5ndGggPT09IDEpIHtcclxuICAgICAgcmVuZGVyZXIuYWRkQ2xhc3ModGhpcy5fZG9jdW1lbnQuYm9keSwgJ21vZGFsLW9wZW4nKTtcclxuICAgIH1cclxuXHJcbiAgICBpZiAoYmFja2Ryb3BDbXB0UmVmICYmIGJhY2tkcm9wQ21wdFJlZi5pbnN0YW5jZSkge1xyXG4gICAgICB0aGlzLl9hcHBseUJhY2tkcm9wT3B0aW9ucyhiYWNrZHJvcENtcHRSZWYuaW5zdGFuY2UsIG9wdGlvbnMpO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIG5nYk1vZGFsUmVmO1xyXG4gIH1cclxuXHJcbiAgZGlzbWlzc0FsbChyZWFzb24/OiBhbnkpIHsgdGhpcy5fbW9kYWxSZWZzLmZvckVhY2gobmdiTW9kYWxSZWYgPT4gbmdiTW9kYWxSZWYuZGlzbWlzcyhyZWFzb24pKTsgfVxyXG5cclxuICBwcml2YXRlIF9hdHRhY2hCYWNrZHJvcChtb2R1bGVDRlI6IENvbXBvbmVudEZhY3RvcnlSZXNvbHZlciwgY29udGFpbmVyRWw6IGFueSk6IENvbXBvbmVudFJlZjxOZ2JNb2RhbEJhY2tkcm9wPiB7XHJcbiAgICBsZXQgYmFja2Ryb3BGYWN0b3J5ID0gbW9kdWxlQ0ZSLnJlc29sdmVDb21wb25lbnRGYWN0b3J5KE5nYk1vZGFsQmFja2Ryb3ApO1xyXG4gICAgbGV0IGJhY2tkcm9wQ21wdFJlZiA9IGJhY2tkcm9wRmFjdG9yeS5jcmVhdGUodGhpcy5faW5qZWN0b3IpO1xyXG4gICAgdGhpcy5fYXBwbGljYXRpb25SZWYuYXR0YWNoVmlldyhiYWNrZHJvcENtcHRSZWYuaG9zdFZpZXcpO1xyXG4gICAgY29udGFpbmVyRWwuYXBwZW5kQ2hpbGQoYmFja2Ryb3BDbXB0UmVmLmxvY2F0aW9uLm5hdGl2ZUVsZW1lbnQpO1xyXG4gICAgcmV0dXJuIGJhY2tkcm9wQ21wdFJlZjtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgX2F0dGFjaFdpbmRvd0NvbXBvbmVudChtb2R1bGVDRlI6IENvbXBvbmVudEZhY3RvcnlSZXNvbHZlciwgY29udGFpbmVyRWw6IGFueSwgY29udGVudFJlZjogYW55KTpcclxuICAgICAgQ29tcG9uZW50UmVmPE5nYk1vZGFsV2luZG93PiB7XHJcbiAgICBsZXQgd2luZG93RmFjdG9yeSA9IG1vZHVsZUNGUi5yZXNvbHZlQ29tcG9uZW50RmFjdG9yeShOZ2JNb2RhbFdpbmRvdyk7XHJcbiAgICBsZXQgd2luZG93Q21wdFJlZiA9IHdpbmRvd0ZhY3RvcnkuY3JlYXRlKHRoaXMuX2luamVjdG9yLCBjb250ZW50UmVmLm5vZGVzKTtcclxuICAgIHRoaXMuX2FwcGxpY2F0aW9uUmVmLmF0dGFjaFZpZXcod2luZG93Q21wdFJlZi5ob3N0Vmlldyk7XHJcbiAgICBjb250YWluZXJFbC5hcHBlbmRDaGlsZCh3aW5kb3dDbXB0UmVmLmxvY2F0aW9uLm5hdGl2ZUVsZW1lbnQpO1xyXG4gICAgcmV0dXJuIHdpbmRvd0NtcHRSZWY7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIF9hcHBseVdpbmRvd09wdGlvbnMod2luZG93SW5zdGFuY2U6IE5nYk1vZGFsV2luZG93LCBvcHRpb25zOiBPYmplY3QpOiB2b2lkIHtcclxuICAgIHRoaXMuX3dpbmRvd0F0dHJpYnV0ZXMuZm9yRWFjaCgob3B0aW9uTmFtZTogc3RyaW5nKSA9PiB7XHJcbiAgICAgIGlmIChpc0RlZmluZWQob3B0aW9uc1tvcHRpb25OYW1lXSkpIHtcclxuICAgICAgICB3aW5kb3dJbnN0YW5jZVtvcHRpb25OYW1lXSA9IG9wdGlvbnNbb3B0aW9uTmFtZV07XHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBfYXBwbHlCYWNrZHJvcE9wdGlvbnMoYmFja2Ryb3BJbnN0YW5jZTogTmdiTW9kYWxCYWNrZHJvcCwgb3B0aW9uczogT2JqZWN0KTogdm9pZCB7XHJcbiAgICB0aGlzLl9iYWNrZHJvcEF0dHJpYnV0ZXMuZm9yRWFjaCgob3B0aW9uTmFtZTogc3RyaW5nKSA9PiB7XHJcbiAgICAgIGlmIChpc0RlZmluZWQob3B0aW9uc1tvcHRpb25OYW1lXSkpIHtcclxuICAgICAgICBiYWNrZHJvcEluc3RhbmNlW29wdGlvbk5hbWVdID0gb3B0aW9uc1tvcHRpb25OYW1lXTtcclxuICAgICAgfVxyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIF9nZXRDb250ZW50UmVmKFxyXG4gICAgICBtb2R1bGVDRlI6IENvbXBvbmVudEZhY3RvcnlSZXNvbHZlciwgY29udGVudEluamVjdG9yOiBJbmplY3RvciwgY29udGVudDogYW55LFxyXG4gICAgICBhY3RpdmVNb2RhbDogTmdiQWN0aXZlTW9kYWwpOiBDb250ZW50UmVmIHtcclxuICAgIGlmICghY29udGVudCkge1xyXG4gICAgICByZXR1cm4gbmV3IENvbnRlbnRSZWYoW10pO1xyXG4gICAgfSBlbHNlIGlmIChjb250ZW50IGluc3RhbmNlb2YgVGVtcGxhdGVSZWYpIHtcclxuICAgICAgcmV0dXJuIHRoaXMuX2NyZWF0ZUZyb21UZW1wbGF0ZVJlZihjb250ZW50LCBhY3RpdmVNb2RhbCk7XHJcbiAgICB9IGVsc2UgaWYgKGlzU3RyaW5nKGNvbnRlbnQpKSB7XHJcbiAgICAgIHJldHVybiB0aGlzLl9jcmVhdGVGcm9tU3RyaW5nKGNvbnRlbnQpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgcmV0dXJuIHRoaXMuX2NyZWF0ZUZyb21Db21wb25lbnQobW9kdWxlQ0ZSLCBjb250ZW50SW5qZWN0b3IsIGNvbnRlbnQsIGFjdGl2ZU1vZGFsKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHByaXZhdGUgX2NyZWF0ZUZyb21UZW1wbGF0ZVJlZihjb250ZW50OiBUZW1wbGF0ZVJlZjxhbnk+LCBhY3RpdmVNb2RhbDogTmdiQWN0aXZlTW9kYWwpOiBDb250ZW50UmVmIHtcclxuICAgIGNvbnN0IGNvbnRleHQgPSB7XHJcbiAgICAgICRpbXBsaWNpdDogYWN0aXZlTW9kYWwsXHJcbiAgICAgIGNsb3NlKHJlc3VsdCkgeyBhY3RpdmVNb2RhbC5jbG9zZShyZXN1bHQpOyB9LFxyXG4gICAgICBkaXNtaXNzKHJlYXNvbikgeyBhY3RpdmVNb2RhbC5kaXNtaXNzKHJlYXNvbik7IH1cclxuICAgIH07XHJcbiAgICBjb25zdCB2aWV3UmVmID0gY29udGVudC5jcmVhdGVFbWJlZGRlZFZpZXcoY29udGV4dCk7XHJcbiAgICB0aGlzLl9hcHBsaWNhdGlvblJlZi5hdHRhY2hWaWV3KHZpZXdSZWYpO1xyXG4gICAgcmV0dXJuIG5ldyBDb250ZW50UmVmKFt2aWV3UmVmLnJvb3ROb2Rlc10sIHZpZXdSZWYpO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBfY3JlYXRlRnJvbVN0cmluZyhjb250ZW50OiBzdHJpbmcpOiBDb250ZW50UmVmIHtcclxuICAgIGNvbnN0IGNvbXBvbmVudCA9IHRoaXMuX2RvY3VtZW50LmNyZWF0ZVRleHROb2RlKGAke2NvbnRlbnR9YCk7XHJcbiAgICByZXR1cm4gbmV3IENvbnRlbnRSZWYoW1tjb21wb25lbnRdXSk7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIF9jcmVhdGVGcm9tQ29tcG9uZW50KFxyXG4gICAgICBtb2R1bGVDRlI6IENvbXBvbmVudEZhY3RvcnlSZXNvbHZlciwgY29udGVudEluamVjdG9yOiBJbmplY3RvciwgY29udGVudDogYW55LFxyXG4gICAgICBjb250ZXh0OiBOZ2JBY3RpdmVNb2RhbCk6IENvbnRlbnRSZWYge1xyXG4gICAgY29uc3QgY29udGVudENtcHRGYWN0b3J5ID0gbW9kdWxlQ0ZSLnJlc29sdmVDb21wb25lbnRGYWN0b3J5KGNvbnRlbnQpO1xyXG4gICAgY29uc3QgbW9kYWxDb250ZW50SW5qZWN0b3IgPVxyXG4gICAgICAgIEluamVjdG9yLmNyZWF0ZSh7cHJvdmlkZXJzOiBbe3Byb3ZpZGU6IE5nYkFjdGl2ZU1vZGFsLCB1c2VWYWx1ZTogY29udGV4dH1dLCBwYXJlbnQ6IGNvbnRlbnRJbmplY3Rvcn0pO1xyXG4gICAgY29uc3QgY29tcG9uZW50UmVmID0gY29udGVudENtcHRGYWN0b3J5LmNyZWF0ZShtb2RhbENvbnRlbnRJbmplY3Rvcik7XHJcbiAgICB0aGlzLl9hcHBsaWNhdGlvblJlZi5hdHRhY2hWaWV3KGNvbXBvbmVudFJlZi5ob3N0Vmlldyk7XHJcbiAgICByZXR1cm4gbmV3IENvbnRlbnRSZWYoW1tjb21wb25lbnRSZWYubG9jYXRpb24ubmF0aXZlRWxlbWVudF1dLCBjb21wb25lbnRSZWYuaG9zdFZpZXcsIGNvbXBvbmVudFJlZik7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIF9yZWdpc3Rlck1vZGFsUmVmKG5nYk1vZGFsUmVmOiBOZ2JNb2RhbFJlZikge1xyXG4gICAgY29uc3QgdW5yZWdpc3Rlck1vZGFsUmVmID0gKCkgPT4ge1xyXG4gICAgICBjb25zdCBpbmRleCA9IHRoaXMuX21vZGFsUmVmcy5pbmRleE9mKG5nYk1vZGFsUmVmKTtcclxuICAgICAgaWYgKGluZGV4ID4gLTEpIHtcclxuICAgICAgICB0aGlzLl9tb2RhbFJlZnMuc3BsaWNlKGluZGV4LCAxKTtcclxuICAgICAgfVxyXG4gICAgfTtcclxuICAgIHRoaXMuX21vZGFsUmVmcy5wdXNoKG5nYk1vZGFsUmVmKTtcclxuICAgIG5nYk1vZGFsUmVmLnJlc3VsdC50aGVuKHVucmVnaXN0ZXJNb2RhbFJlZiwgdW5yZWdpc3Rlck1vZGFsUmVmKTtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgX3JlZ2lzdGVyV2luZG93Q21wdChuZ2JXaW5kb3dDbXB0OiBDb21wb25lbnRSZWY8TmdiTW9kYWxXaW5kb3c+KSB7XHJcbiAgICB0aGlzLl93aW5kb3dDbXB0cy5wdXNoKG5nYldpbmRvd0NtcHQpO1xyXG4gICAgdGhpcy5fYWN0aXZlV2luZG93Q21wdEhhc0NoYW5nZWQubmV4dCgpO1xyXG5cclxuICAgIG5nYldpbmRvd0NtcHQub25EZXN0cm95KCgpID0+IHtcclxuICAgICAgY29uc3QgaW5kZXggPSB0aGlzLl93aW5kb3dDbXB0cy5pbmRleE9mKG5nYldpbmRvd0NtcHQpO1xyXG4gICAgICBpZiAoaW5kZXggPiAtMSkge1xyXG4gICAgICAgIHRoaXMuX3dpbmRvd0NtcHRzLnNwbGljZShpbmRleCwgMSk7XHJcbiAgICAgICAgdGhpcy5fYWN0aXZlV2luZG93Q21wdEhhc0NoYW5nZWQubmV4dCgpO1xyXG4gICAgICB9XHJcbiAgICB9KTtcclxuICB9XHJcbn1cclxuIiwiaW1wb3J0IHtJbmplY3RhYmxlLCBJbmplY3RvciwgQ29tcG9uZW50RmFjdG9yeVJlc29sdmVyfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuXHJcbmltcG9ydCB7TmdiTW9kYWxPcHRpb25zLCBOZ2JNb2RhbENvbmZpZ30gZnJvbSAnLi9tb2RhbC1jb25maWcnO1xyXG5pbXBvcnQge05nYk1vZGFsUmVmfSBmcm9tICcuL21vZGFsLXJlZic7XHJcbmltcG9ydCB7TmdiTW9kYWxTdGFja30gZnJvbSAnLi9tb2RhbC1zdGFjayc7XHJcblxyXG4vKipcclxuICogQSBzZXJ2aWNlIHRvIG9wZW4gbW9kYWwgd2luZG93cy4gQ3JlYXRpbmcgYSBtb2RhbCBpcyBzdHJhaWdodGZvcndhcmQ6IGNyZWF0ZSBhIHRlbXBsYXRlIGFuZCBwYXNzIGl0IGFzIGFuIGFyZ3VtZW50IHRvXHJcbiAqIHRoZSBcIm9wZW5cIiBtZXRob2QhXHJcbiAqL1xyXG5ASW5qZWN0YWJsZSh7cHJvdmlkZWRJbjogJ3Jvb3QnfSlcclxuZXhwb3J0IGNsYXNzIE5nYk1vZGFsIHtcclxuICBjb25zdHJ1Y3RvcihcclxuICAgICAgcHJpdmF0ZSBfbW9kdWxlQ0ZSOiBDb21wb25lbnRGYWN0b3J5UmVzb2x2ZXIsIHByaXZhdGUgX2luamVjdG9yOiBJbmplY3RvciwgcHJpdmF0ZSBfbW9kYWxTdGFjazogTmdiTW9kYWxTdGFjayxcclxuICAgICAgcHJpdmF0ZSBfY29uZmlnOiBOZ2JNb2RhbENvbmZpZykge31cclxuXHJcbiAgLyoqXHJcbiAgICogT3BlbnMgYSBuZXcgbW9kYWwgd2luZG93IHdpdGggdGhlIHNwZWNpZmllZCBjb250ZW50IGFuZCB1c2luZyBzdXBwbGllZCBvcHRpb25zLiBDb250ZW50IGNhbiBiZSBwcm92aWRlZFxyXG4gICAqIGFzIGEgVGVtcGxhdGVSZWYgb3IgYSBjb21wb25lbnQgdHlwZS4gSWYgeW91IHBhc3MgYSBjb21wb25lbnQgdHlwZSBhcyBjb250ZW50IHRoYW4gaW5zdGFuY2VzIG9mIHRob3NlXHJcbiAgICogY29tcG9uZW50cyBjYW4gYmUgaW5qZWN0ZWQgd2l0aCBhbiBpbnN0YW5jZSBvZiB0aGUgTmdiQWN0aXZlTW9kYWwgY2xhc3MuIFlvdSBjYW4gdXNlIG1ldGhvZHMgb24gdGhlXHJcbiAgICogTmdiQWN0aXZlTW9kYWwgY2xhc3MgdG8gY2xvc2UgLyBkaXNtaXNzIG1vZGFscyBmcm9tIFwiaW5zaWRlXCIgb2YgYSBjb21wb25lbnQuXHJcbiAgICovXHJcbiAgb3Blbihjb250ZW50OiBhbnksIG9wdGlvbnM6IE5nYk1vZGFsT3B0aW9ucyA9IHt9KTogTmdiTW9kYWxSZWYge1xyXG4gICAgY29uc3QgY29tYmluZWRPcHRpb25zID0gT2JqZWN0LmFzc2lnbih7fSwgdGhpcy5fY29uZmlnLCBvcHRpb25zKTtcclxuICAgIHJldHVybiB0aGlzLl9tb2RhbFN0YWNrLm9wZW4odGhpcy5fbW9kdWxlQ0ZSLCB0aGlzLl9pbmplY3RvciwgY29udGVudCwgY29tYmluZWRPcHRpb25zKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIERpc21pc3MgYWxsIGN1cnJlbnRseSBkaXNwbGF5ZWQgbW9kYWwgd2luZG93cyB3aXRoIHRoZSBzdXBwbGllZCByZWFzb24uXHJcbiAgICpcclxuICAgKiBAc2luY2UgMy4xLjBcclxuICAgKi9cclxuICBkaXNtaXNzQWxsKHJlYXNvbj86IGFueSkgeyB0aGlzLl9tb2RhbFN0YWNrLmRpc21pc3NBbGwocmVhc29uKTsgfVxyXG59XHJcbiIsImltcG9ydCB7TmdNb2R1bGUsIE1vZHVsZVdpdGhQcm92aWRlcnN9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5cclxuaW1wb3J0IHtOZ2JNb2RhbEJhY2tkcm9wfSBmcm9tICcuL21vZGFsLWJhY2tkcm9wJztcclxuaW1wb3J0IHtOZ2JNb2RhbFdpbmRvd30gZnJvbSAnLi9tb2RhbC13aW5kb3cnO1xyXG5pbXBvcnQge05nYk1vZGFsfSBmcm9tICcuL21vZGFsJztcclxuXHJcbmV4cG9ydCB7TmdiTW9kYWx9IGZyb20gJy4vbW9kYWwnO1xyXG5leHBvcnQge05nYk1vZGFsQ29uZmlnLCBOZ2JNb2RhbE9wdGlvbnN9IGZyb20gJy4vbW9kYWwtY29uZmlnJztcclxuZXhwb3J0IHtOZ2JNb2RhbFJlZiwgTmdiQWN0aXZlTW9kYWx9IGZyb20gJy4vbW9kYWwtcmVmJztcclxuZXhwb3J0IHtNb2RhbERpc21pc3NSZWFzb25zfSBmcm9tICcuL21vZGFsLWRpc21pc3MtcmVhc29ucyc7XHJcblxyXG5ATmdNb2R1bGUoe1xyXG4gIGRlY2xhcmF0aW9uczogW05nYk1vZGFsQmFja2Ryb3AsIE5nYk1vZGFsV2luZG93XSxcclxuICBlbnRyeUNvbXBvbmVudHM6IFtOZ2JNb2RhbEJhY2tkcm9wLCBOZ2JNb2RhbFdpbmRvd10sXHJcbiAgcHJvdmlkZXJzOiBbTmdiTW9kYWxdXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBOZ2JNb2RhbE1vZHVsZSB7XHJcbiAgLyoqXHJcbiAgICogSW1wb3J0aW5nIHdpdGggJy5mb3JSb290KCknIGlzIG5vIGxvbmdlciBuZWNlc3NhcnksIHlvdSBjYW4gc2ltcGx5IGltcG9ydCB0aGUgbW9kdWxlLlxyXG4gICAqIFdpbGwgYmUgcmVtb3ZlZCBpbiA0LjAuMC5cclxuICAgKlxyXG4gICAqIEBkZXByZWNhdGVkIDMuMC4wXHJcbiAgICovXHJcbiAgc3RhdGljIGZvclJvb3QoKTogTW9kdWxlV2l0aFByb3ZpZGVycyB7IHJldHVybiB7bmdNb2R1bGU6IE5nYk1vZGFsTW9kdWxlfTsgfVxyXG59XHJcbiIsImltcG9ydCB7SW5qZWN0YWJsZX0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcblxyXG4vKipcclxuICogQ29uZmlndXJhdGlvbiBzZXJ2aWNlIGZvciB0aGUgTmdiUGFnaW5hdGlvbiBjb21wb25lbnQuXHJcbiAqIFlvdSBjYW4gaW5qZWN0IHRoaXMgc2VydmljZSwgdHlwaWNhbGx5IGluIHlvdXIgcm9vdCBjb21wb25lbnQsIGFuZCBjdXN0b21pemUgdGhlIHZhbHVlcyBvZiBpdHMgcHJvcGVydGllcyBpblxyXG4gKiBvcmRlciB0byBwcm92aWRlIGRlZmF1bHQgdmFsdWVzIGZvciBhbGwgdGhlIHBhZ2luYXRpb25zIHVzZWQgaW4gdGhlIGFwcGxpY2F0aW9uLlxyXG4gKi9cclxuQEluamVjdGFibGUoe3Byb3ZpZGVkSW46ICdyb290J30pXHJcbmV4cG9ydCBjbGFzcyBOZ2JQYWdpbmF0aW9uQ29uZmlnIHtcclxuICBkaXNhYmxlZCA9IGZhbHNlO1xyXG4gIGJvdW5kYXJ5TGlua3MgPSBmYWxzZTtcclxuICBkaXJlY3Rpb25MaW5rcyA9IHRydWU7XHJcbiAgZWxsaXBzZXMgPSB0cnVlO1xyXG4gIG1heFNpemUgPSAwO1xyXG4gIHBhZ2VTaXplID0gMTA7XHJcbiAgcm90YXRlID0gZmFsc2U7XHJcbiAgc2l6ZTogJ3NtJyB8ICdsZyc7XHJcbn1cclxuIiwiaW1wb3J0IHtDb21wb25lbnQsIEV2ZW50RW1pdHRlciwgSW5wdXQsIE91dHB1dCwgT25DaGFuZ2VzLCBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSwgU2ltcGxlQ2hhbmdlc30gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7Z2V0VmFsdWVJblJhbmdlLCBpc051bWJlcn0gZnJvbSAnLi4vdXRpbC91dGlsJztcclxuaW1wb3J0IHtOZ2JQYWdpbmF0aW9uQ29uZmlnfSBmcm9tICcuL3BhZ2luYXRpb24tY29uZmlnJztcclxuXHJcbi8qKlxyXG4gKiBBIGRpcmVjdGl2ZSB0aGF0IHdpbGwgdGFrZSBjYXJlIG9mIHZpc3VhbGlzaW5nIGEgcGFnaW5hdGlvbiBiYXIgYW5kIGVuYWJsZSAvIGRpc2FibGUgYnV0dG9ucyBjb3JyZWN0bHkhXHJcbiAqL1xyXG5AQ29tcG9uZW50KHtcclxuICBzZWxlY3RvcjogJ25nYi1wYWdpbmF0aW9uJyxcclxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaCxcclxuICBob3N0OiB7J3JvbGUnOiAnbmF2aWdhdGlvbid9LFxyXG4gIHRlbXBsYXRlOiBgXHJcbiAgICA8dWwgW2NsYXNzXT1cIidwYWdpbmF0aW9uJyArIChzaXplID8gJyBwYWdpbmF0aW9uLScgKyBzaXplIDogJycpXCI+XHJcbiAgICAgIDxsaSAqbmdJZj1cImJvdW5kYXJ5TGlua3NcIiBjbGFzcz1cInBhZ2UtaXRlbVwiXHJcbiAgICAgICAgW2NsYXNzLmRpc2FibGVkXT1cIiFoYXNQcmV2aW91cygpIHx8IGRpc2FibGVkXCI+XHJcbiAgICAgICAgPGEgYXJpYS1sYWJlbD1cIkZpcnN0XCIgaTE4bi1hcmlhLWxhYmVsPVwiQEBuZ2IucGFnaW5hdGlvbi5maXJzdC1hcmlhXCIgY2xhc3M9XCJwYWdlLWxpbmtcIiBocmVmXHJcbiAgICAgICAgICAoY2xpY2spPVwiISFzZWxlY3RQYWdlKDEpXCIgW2F0dHIudGFiaW5kZXhdPVwiKGhhc1ByZXZpb3VzKCkgPyBudWxsIDogJy0xJylcIj5cclxuICAgICAgICAgIDxzcGFuIGFyaWEtaGlkZGVuPVwidHJ1ZVwiIGkxOG49XCJAQG5nYi5wYWdpbmF0aW9uLmZpcnN0XCI+JmxhcXVvOyZsYXF1bzs8L3NwYW4+XHJcbiAgICAgICAgPC9hPlxyXG4gICAgICA8L2xpPlxyXG5cclxuICAgICAgPGxpICpuZ0lmPVwiZGlyZWN0aW9uTGlua3NcIiBjbGFzcz1cInBhZ2UtaXRlbVwiXHJcbiAgICAgICAgW2NsYXNzLmRpc2FibGVkXT1cIiFoYXNQcmV2aW91cygpIHx8IGRpc2FibGVkXCI+XHJcbiAgICAgICAgPGEgYXJpYS1sYWJlbD1cIlByZXZpb3VzXCIgaTE4bi1hcmlhLWxhYmVsPVwiQEBuZ2IucGFnaW5hdGlvbi5wcmV2aW91cy1hcmlhXCIgY2xhc3M9XCJwYWdlLWxpbmtcIiBocmVmXHJcbiAgICAgICAgICAoY2xpY2spPVwiISFzZWxlY3RQYWdlKHBhZ2UtMSlcIiBbYXR0ci50YWJpbmRleF09XCIoaGFzUHJldmlvdXMoKSA/IG51bGwgOiAnLTEnKVwiPlxyXG4gICAgICAgICAgPHNwYW4gYXJpYS1oaWRkZW49XCJ0cnVlXCIgaTE4bj1cIkBAbmdiLnBhZ2luYXRpb24ucHJldmlvdXNcIj4mbGFxdW87PC9zcGFuPlxyXG4gICAgICAgIDwvYT5cclxuICAgICAgPC9saT5cclxuICAgICAgPGxpICpuZ0Zvcj1cImxldCBwYWdlTnVtYmVyIG9mIHBhZ2VzXCIgY2xhc3M9XCJwYWdlLWl0ZW1cIiBbY2xhc3MuYWN0aXZlXT1cInBhZ2VOdW1iZXIgPT09IHBhZ2VcIlxyXG4gICAgICAgIFtjbGFzcy5kaXNhYmxlZF09XCJpc0VsbGlwc2lzKHBhZ2VOdW1iZXIpIHx8IGRpc2FibGVkXCI+XHJcbiAgICAgICAgPGEgKm5nSWY9XCJpc0VsbGlwc2lzKHBhZ2VOdW1iZXIpXCIgY2xhc3M9XCJwYWdlLWxpbmtcIj4uLi48L2E+XHJcbiAgICAgICAgPGEgKm5nSWY9XCIhaXNFbGxpcHNpcyhwYWdlTnVtYmVyKVwiIGNsYXNzPVwicGFnZS1saW5rXCIgaHJlZiAoY2xpY2spPVwiISFzZWxlY3RQYWdlKHBhZ2VOdW1iZXIpXCI+XHJcbiAgICAgICAgICB7e3BhZ2VOdW1iZXJ9fVxyXG4gICAgICAgICAgPHNwYW4gKm5nSWY9XCJwYWdlTnVtYmVyID09PSBwYWdlXCIgY2xhc3M9XCJzci1vbmx5XCI+KGN1cnJlbnQpPC9zcGFuPlxyXG4gICAgICAgIDwvYT5cclxuICAgICAgPC9saT5cclxuICAgICAgPGxpICpuZ0lmPVwiZGlyZWN0aW9uTGlua3NcIiBjbGFzcz1cInBhZ2UtaXRlbVwiIFtjbGFzcy5kaXNhYmxlZF09XCIhaGFzTmV4dCgpIHx8IGRpc2FibGVkXCI+XHJcbiAgICAgICAgPGEgYXJpYS1sYWJlbD1cIk5leHRcIiBpMThuLWFyaWEtbGFiZWw9XCJAQG5nYi5wYWdpbmF0aW9uLm5leHQtYXJpYVwiIGNsYXNzPVwicGFnZS1saW5rXCIgaHJlZlxyXG4gICAgICAgICAgKGNsaWNrKT1cIiEhc2VsZWN0UGFnZShwYWdlKzEpXCIgW2F0dHIudGFiaW5kZXhdPVwiKGhhc05leHQoKSA/IG51bGwgOiAnLTEnKVwiPlxyXG4gICAgICAgICAgPHNwYW4gYXJpYS1oaWRkZW49XCJ0cnVlXCIgaTE4bj1cIkBAbmdiLnBhZ2luYXRpb24ubmV4dFwiPiZyYXF1bzs8L3NwYW4+XHJcbiAgICAgICAgPC9hPlxyXG4gICAgICA8L2xpPlxyXG5cclxuICAgICAgPGxpICpuZ0lmPVwiYm91bmRhcnlMaW5rc1wiIGNsYXNzPVwicGFnZS1pdGVtXCIgW2NsYXNzLmRpc2FibGVkXT1cIiFoYXNOZXh0KCkgfHwgZGlzYWJsZWRcIj5cclxuICAgICAgICA8YSBhcmlhLWxhYmVsPVwiTGFzdFwiIGkxOG4tYXJpYS1sYWJlbD1cIkBAbmdiLnBhZ2luYXRpb24ubGFzdC1hcmlhXCIgY2xhc3M9XCJwYWdlLWxpbmtcIiBocmVmXHJcbiAgICAgICAgICAoY2xpY2spPVwiISFzZWxlY3RQYWdlKHBhZ2VDb3VudClcIiBbYXR0ci50YWJpbmRleF09XCIoaGFzTmV4dCgpID8gbnVsbCA6ICctMScpXCI+XHJcbiAgICAgICAgICA8c3BhbiBhcmlhLWhpZGRlbj1cInRydWVcIiBpMThuPVwiQEBuZ2IucGFnaW5hdGlvbi5sYXN0XCI+JnJhcXVvOyZyYXF1bzs8L3NwYW4+XHJcbiAgICAgICAgPC9hPlxyXG4gICAgICA8L2xpPlxyXG4gICAgPC91bD5cclxuICBgXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBOZ2JQYWdpbmF0aW9uIGltcGxlbWVudHMgT25DaGFuZ2VzIHtcclxuICBwYWdlQ291bnQgPSAwO1xyXG4gIHBhZ2VzOiBudW1iZXJbXSA9IFtdO1xyXG5cclxuICAvKipcclxuICAgKiBXaGV0aGVyIHRvIGRpc2FibGUgYnV0dG9ucyBmcm9tIHVzZXIgaW5wdXRcclxuICAgKi9cclxuICBASW5wdXQoKSBkaXNhYmxlZDogYm9vbGVhbjtcclxuXHJcbiAgLyoqXHJcbiAgICogIFdoZXRoZXIgdG8gc2hvdyB0aGUgXCJGaXJzdFwiIGFuZCBcIkxhc3RcIiBwYWdlIGxpbmtzXHJcbiAgICovXHJcbiAgQElucHV0KCkgYm91bmRhcnlMaW5rczogYm9vbGVhbjtcclxuXHJcbiAgLyoqXHJcbiAgICogIFdoZXRoZXIgdG8gc2hvdyB0aGUgXCJOZXh0XCIgYW5kIFwiUHJldmlvdXNcIiBwYWdlIGxpbmtzXHJcbiAgICovXHJcbiAgQElucHV0KCkgZGlyZWN0aW9uTGlua3M6IGJvb2xlYW47XHJcblxyXG4gIC8qKlxyXG4gICAqICBXaGV0aGVyIHRvIHNob3cgZWxsaXBzaXMgc3ltYm9scyBhbmQgZmlyc3QvbGFzdCBwYWdlIG51bWJlcnMgd2hlbiBtYXhTaXplID4gbnVtYmVyIG9mIHBhZ2VzXHJcbiAgICovXHJcbiAgQElucHV0KCkgZWxsaXBzZXM6IGJvb2xlYW47XHJcblxyXG4gIC8qKlxyXG4gICAqICBXaGV0aGVyIHRvIHJvdGF0ZSBwYWdlcyB3aGVuIG1heFNpemUgPiBudW1iZXIgb2YgcGFnZXMuXHJcbiAgICogIEN1cnJlbnQgcGFnZSB3aWxsIGJlIGluIHRoZSBtaWRkbGVcclxuICAgKi9cclxuICBASW5wdXQoKSByb3RhdGU6IGJvb2xlYW47XHJcblxyXG4gIC8qKlxyXG4gICAqICBOdW1iZXIgb2YgaXRlbXMgaW4gY29sbGVjdGlvbi5cclxuICAgKi9cclxuICBASW5wdXQoKSBjb2xsZWN0aW9uU2l6ZTogbnVtYmVyO1xyXG5cclxuICAvKipcclxuICAgKiAgTWF4aW11bSBudW1iZXIgb2YgcGFnZXMgdG8gZGlzcGxheS5cclxuICAgKi9cclxuICBASW5wdXQoKSBtYXhTaXplOiBudW1iZXI7XHJcblxyXG4gIC8qKlxyXG4gICAqICBDdXJyZW50IHBhZ2UuIFBhZ2UgbnVtYmVycyBzdGFydCB3aXRoIDFcclxuICAgKi9cclxuICBASW5wdXQoKSBwYWdlID0gMTtcclxuXHJcbiAgLyoqXHJcbiAgICogIE51bWJlciBvZiBpdGVtcyBwZXIgcGFnZS5cclxuICAgKi9cclxuICBASW5wdXQoKSBwYWdlU2l6ZTogbnVtYmVyO1xyXG5cclxuICAvKipcclxuICAgKiAgQW4gZXZlbnQgZmlyZWQgd2hlbiB0aGUgcGFnZSBpcyBjaGFuZ2VkLlxyXG4gICAqICBFdmVudCdzIHBheWxvYWQgZXF1YWxzIHRvIHRoZSBuZXdseSBzZWxlY3RlZCBwYWdlLlxyXG4gICAqICBXaWxsIGZpcmUgb25seSBpZiBjb2xsZWN0aW9uIHNpemUgaXMgc2V0IGFuZCBhbGwgdmFsdWVzIGFyZSB2YWxpZC5cclxuICAgKiAgUGFnZSBudW1iZXJzIHN0YXJ0IHdpdGggMVxyXG4gICAqL1xyXG4gIEBPdXRwdXQoKSBwYWdlQ2hhbmdlID0gbmV3IEV2ZW50RW1pdHRlcjxudW1iZXI+KHRydWUpO1xyXG5cclxuICAvKipcclxuICAgKiBQYWdpbmF0aW9uIGRpc3BsYXkgc2l6ZTogc21hbGwgb3IgbGFyZ2VcclxuICAgKi9cclxuICBASW5wdXQoKSBzaXplOiAnc20nIHwgJ2xnJztcclxuXHJcbiAgY29uc3RydWN0b3IoY29uZmlnOiBOZ2JQYWdpbmF0aW9uQ29uZmlnKSB7XHJcbiAgICB0aGlzLmRpc2FibGVkID0gY29uZmlnLmRpc2FibGVkO1xyXG4gICAgdGhpcy5ib3VuZGFyeUxpbmtzID0gY29uZmlnLmJvdW5kYXJ5TGlua3M7XHJcbiAgICB0aGlzLmRpcmVjdGlvbkxpbmtzID0gY29uZmlnLmRpcmVjdGlvbkxpbmtzO1xyXG4gICAgdGhpcy5lbGxpcHNlcyA9IGNvbmZpZy5lbGxpcHNlcztcclxuICAgIHRoaXMubWF4U2l6ZSA9IGNvbmZpZy5tYXhTaXplO1xyXG4gICAgdGhpcy5wYWdlU2l6ZSA9IGNvbmZpZy5wYWdlU2l6ZTtcclxuICAgIHRoaXMucm90YXRlID0gY29uZmlnLnJvdGF0ZTtcclxuICAgIHRoaXMuc2l6ZSA9IGNvbmZpZy5zaXplO1xyXG4gIH1cclxuXHJcbiAgaGFzUHJldmlvdXMoKTogYm9vbGVhbiB7IHJldHVybiB0aGlzLnBhZ2UgPiAxOyB9XHJcblxyXG4gIGhhc05leHQoKTogYm9vbGVhbiB7IHJldHVybiB0aGlzLnBhZ2UgPCB0aGlzLnBhZ2VDb3VudDsgfVxyXG5cclxuICBzZWxlY3RQYWdlKHBhZ2VOdW1iZXI6IG51bWJlcik6IHZvaWQgeyB0aGlzLl91cGRhdGVQYWdlcyhwYWdlTnVtYmVyKTsgfVxyXG5cclxuICBuZ09uQ2hhbmdlcyhjaGFuZ2VzOiBTaW1wbGVDaGFuZ2VzKTogdm9pZCB7IHRoaXMuX3VwZGF0ZVBhZ2VzKHRoaXMucGFnZSk7IH1cclxuXHJcbiAgaXNFbGxpcHNpcyhwYWdlTnVtYmVyKTogYm9vbGVhbiB7IHJldHVybiBwYWdlTnVtYmVyID09PSAtMTsgfVxyXG5cclxuICAvKipcclxuICAgKiBBcHBlbmRzIGVsbGlwc2VzIGFuZCBmaXJzdC9sYXN0IHBhZ2UgbnVtYmVyIHRvIHRoZSBkaXNwbGF5ZWQgcGFnZXNcclxuICAgKi9cclxuICBwcml2YXRlIF9hcHBseUVsbGlwc2VzKHN0YXJ0OiBudW1iZXIsIGVuZDogbnVtYmVyKSB7XHJcbiAgICBpZiAodGhpcy5lbGxpcHNlcykge1xyXG4gICAgICBpZiAoc3RhcnQgPiAwKSB7XHJcbiAgICAgICAgaWYgKHN0YXJ0ID4gMSkge1xyXG4gICAgICAgICAgdGhpcy5wYWdlcy51bnNoaWZ0KC0xKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5wYWdlcy51bnNoaWZ0KDEpO1xyXG4gICAgICB9XHJcbiAgICAgIGlmIChlbmQgPCB0aGlzLnBhZ2VDb3VudCkge1xyXG4gICAgICAgIGlmIChlbmQgPCAodGhpcy5wYWdlQ291bnQgLSAxKSkge1xyXG4gICAgICAgICAgdGhpcy5wYWdlcy5wdXNoKC0xKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5wYWdlcy5wdXNoKHRoaXMucGFnZUNvdW50KTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogUm90YXRlcyBwYWdlIG51bWJlcnMgYmFzZWQgb24gbWF4U2l6ZSBpdGVtcyB2aXNpYmxlLlxyXG4gICAqIEN1cnJlbnRseSBzZWxlY3RlZCBwYWdlIHN0YXlzIGluIHRoZSBtaWRkbGU6XHJcbiAgICpcclxuICAgKiBFeC4gZm9yIHNlbGVjdGVkIHBhZ2UgPSA2OlxyXG4gICAqIFs1LCo2Kiw3XSBmb3IgbWF4U2l6ZSA9IDNcclxuICAgKiBbNCw1LCo2Kiw3XSBmb3IgbWF4U2l6ZSA9IDRcclxuICAgKi9cclxuICBwcml2YXRlIF9hcHBseVJvdGF0aW9uKCk6IFtudW1iZXIsIG51bWJlcl0ge1xyXG4gICAgbGV0IHN0YXJ0ID0gMDtcclxuICAgIGxldCBlbmQgPSB0aGlzLnBhZ2VDb3VudDtcclxuICAgIGxldCBsZWZ0T2Zmc2V0ID0gTWF0aC5mbG9vcih0aGlzLm1heFNpemUgLyAyKTtcclxuICAgIGxldCByaWdodE9mZnNldCA9IHRoaXMubWF4U2l6ZSAlIDIgPT09IDAgPyBsZWZ0T2Zmc2V0IC0gMSA6IGxlZnRPZmZzZXQ7XHJcblxyXG4gICAgaWYgKHRoaXMucGFnZSA8PSBsZWZ0T2Zmc2V0KSB7XHJcbiAgICAgIC8vIHZlcnkgYmVnaW5uaW5nLCBubyByb3RhdGlvbiAtPiBbMC4ubWF4U2l6ZV1cclxuICAgICAgZW5kID0gdGhpcy5tYXhTaXplO1xyXG4gICAgfSBlbHNlIGlmICh0aGlzLnBhZ2VDb3VudCAtIHRoaXMucGFnZSA8IGxlZnRPZmZzZXQpIHtcclxuICAgICAgLy8gdmVyeSBlbmQsIG5vIHJvdGF0aW9uIC0+IFtsZW4tbWF4U2l6ZS4ubGVuXVxyXG4gICAgICBzdGFydCA9IHRoaXMucGFnZUNvdW50IC0gdGhpcy5tYXhTaXplO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgLy8gcm90YXRlXHJcbiAgICAgIHN0YXJ0ID0gdGhpcy5wYWdlIC0gbGVmdE9mZnNldCAtIDE7XHJcbiAgICAgIGVuZCA9IHRoaXMucGFnZSArIHJpZ2h0T2Zmc2V0O1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiBbc3RhcnQsIGVuZF07XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBQYWdpbmF0ZXMgcGFnZSBudW1iZXJzIGJhc2VkIG9uIG1heFNpemUgaXRlbXMgcGVyIHBhZ2VcclxuICAgKi9cclxuICBwcml2YXRlIF9hcHBseVBhZ2luYXRpb24oKTogW251bWJlciwgbnVtYmVyXSB7XHJcbiAgICBsZXQgcGFnZSA9IE1hdGguY2VpbCh0aGlzLnBhZ2UgLyB0aGlzLm1heFNpemUpIC0gMTtcclxuICAgIGxldCBzdGFydCA9IHBhZ2UgKiB0aGlzLm1heFNpemU7XHJcbiAgICBsZXQgZW5kID0gc3RhcnQgKyB0aGlzLm1heFNpemU7XHJcblxyXG4gICAgcmV0dXJuIFtzdGFydCwgZW5kXTtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgX3NldFBhZ2VJblJhbmdlKG5ld1BhZ2VObykge1xyXG4gICAgY29uc3QgcHJldlBhZ2VObyA9IHRoaXMucGFnZTtcclxuICAgIHRoaXMucGFnZSA9IGdldFZhbHVlSW5SYW5nZShuZXdQYWdlTm8sIHRoaXMucGFnZUNvdW50LCAxKTtcclxuXHJcbiAgICBpZiAodGhpcy5wYWdlICE9PSBwcmV2UGFnZU5vICYmIGlzTnVtYmVyKHRoaXMuY29sbGVjdGlvblNpemUpKSB7XHJcbiAgICAgIHRoaXMucGFnZUNoYW5nZS5lbWl0KHRoaXMucGFnZSk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIF91cGRhdGVQYWdlcyhuZXdQYWdlOiBudW1iZXIpIHtcclxuICAgIHRoaXMucGFnZUNvdW50ID0gTWF0aC5jZWlsKHRoaXMuY29sbGVjdGlvblNpemUgLyB0aGlzLnBhZ2VTaXplKTtcclxuXHJcbiAgICBpZiAoIWlzTnVtYmVyKHRoaXMucGFnZUNvdW50KSkge1xyXG4gICAgICB0aGlzLnBhZ2VDb3VudCA9IDA7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gZmlsbC1pbiBtb2RlbCBuZWVkZWQgdG8gcmVuZGVyIHBhZ2VzXHJcbiAgICB0aGlzLnBhZ2VzLmxlbmd0aCA9IDA7XHJcbiAgICBmb3IgKGxldCBpID0gMTsgaSA8PSB0aGlzLnBhZ2VDb3VudDsgaSsrKSB7XHJcbiAgICAgIHRoaXMucGFnZXMucHVzaChpKTtcclxuICAgIH1cclxuXHJcbiAgICAvLyBzZXQgcGFnZSB3aXRoaW4gMS4ubWF4IHJhbmdlXHJcbiAgICB0aGlzLl9zZXRQYWdlSW5SYW5nZShuZXdQYWdlKTtcclxuXHJcbiAgICAvLyBhcHBseSBtYXhTaXplIGlmIG5lY2Vzc2FyeVxyXG4gICAgaWYgKHRoaXMubWF4U2l6ZSA+IDAgJiYgdGhpcy5wYWdlQ291bnQgPiB0aGlzLm1heFNpemUpIHtcclxuICAgICAgbGV0IHN0YXJ0ID0gMDtcclxuICAgICAgbGV0IGVuZCA9IHRoaXMucGFnZUNvdW50O1xyXG5cclxuICAgICAgLy8gZWl0aGVyIHBhZ2luYXRpbmcgb3Igcm90YXRpbmcgcGFnZSBudW1iZXJzXHJcbiAgICAgIGlmICh0aGlzLnJvdGF0ZSkge1xyXG4gICAgICAgIFtzdGFydCwgZW5kXSA9IHRoaXMuX2FwcGx5Um90YXRpb24oKTtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICBbc3RhcnQsIGVuZF0gPSB0aGlzLl9hcHBseVBhZ2luYXRpb24oKTtcclxuICAgICAgfVxyXG5cclxuICAgICAgdGhpcy5wYWdlcyA9IHRoaXMucGFnZXMuc2xpY2Uoc3RhcnQsIGVuZCk7XHJcblxyXG4gICAgICAvLyBhZGRpbmcgZWxsaXBzZXNcclxuICAgICAgdGhpcy5fYXBwbHlFbGxpcHNlcyhzdGFydCwgZW5kKTtcclxuICAgIH1cclxuICB9XHJcbn1cclxuIiwiaW1wb3J0IHtOZ01vZHVsZSwgTW9kdWxlV2l0aFByb3ZpZGVyc30gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7Q29tbW9uTW9kdWxlfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xyXG5cclxuaW1wb3J0IHtOZ2JQYWdpbmF0aW9ufSBmcm9tICcuL3BhZ2luYXRpb24nO1xyXG5cclxuZXhwb3J0IHtOZ2JQYWdpbmF0aW9ufSBmcm9tICcuL3BhZ2luYXRpb24nO1xyXG5leHBvcnQge05nYlBhZ2luYXRpb25Db25maWd9IGZyb20gJy4vcGFnaW5hdGlvbi1jb25maWcnO1xyXG5cclxuQE5nTW9kdWxlKHtkZWNsYXJhdGlvbnM6IFtOZ2JQYWdpbmF0aW9uXSwgZXhwb3J0czogW05nYlBhZ2luYXRpb25dLCBpbXBvcnRzOiBbQ29tbW9uTW9kdWxlXX0pXHJcbmV4cG9ydCBjbGFzcyBOZ2JQYWdpbmF0aW9uTW9kdWxlIHtcclxuICAvKipcclxuICAgKiBJbXBvcnRpbmcgd2l0aCAnLmZvclJvb3QoKScgaXMgbm8gbG9uZ2VyIG5lY2Vzc2FyeSwgeW91IGNhbiBzaW1wbHkgaW1wb3J0IHRoZSBtb2R1bGUuXHJcbiAgICogV2lsbCBiZSByZW1vdmVkIGluIDQuMC4wLlxyXG4gICAqXHJcbiAgICogQGRlcHJlY2F0ZWQgMy4wLjBcclxuICAgKi9cclxuICBzdGF0aWMgZm9yUm9vdCgpOiBNb2R1bGVXaXRoUHJvdmlkZXJzIHsgcmV0dXJuIHtuZ01vZHVsZTogTmdiUGFnaW5hdGlvbk1vZHVsZX07IH1cclxufVxyXG4iLCJleHBvcnQgY2xhc3MgVHJpZ2dlciB7XHJcbiAgY29uc3RydWN0b3IocHVibGljIG9wZW46IHN0cmluZywgcHVibGljIGNsb3NlPzogc3RyaW5nKSB7XHJcbiAgICBpZiAoIWNsb3NlKSB7XHJcbiAgICAgIHRoaXMuY2xvc2UgPSBvcGVuO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgaXNNYW51YWwoKSB7IHJldHVybiB0aGlzLm9wZW4gPT09ICdtYW51YWwnIHx8IHRoaXMuY2xvc2UgPT09ICdtYW51YWwnOyB9XHJcbn1cclxuXHJcbmNvbnN0IERFRkFVTFRfQUxJQVNFUyA9IHtcclxuICAnaG92ZXInOiBbJ21vdXNlZW50ZXInLCAnbW91c2VsZWF2ZSddXHJcbn07XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gcGFyc2VUcmlnZ2Vycyh0cmlnZ2Vyczogc3RyaW5nLCBhbGlhc2VzID0gREVGQVVMVF9BTElBU0VTKTogVHJpZ2dlcltdIHtcclxuICBjb25zdCB0cmltbWVkVHJpZ2dlcnMgPSAodHJpZ2dlcnMgfHwgJycpLnRyaW0oKTtcclxuXHJcbiAgaWYgKHRyaW1tZWRUcmlnZ2Vycy5sZW5ndGggPT09IDApIHtcclxuICAgIHJldHVybiBbXTtcclxuICB9XHJcblxyXG4gIGNvbnN0IHBhcnNlZFRyaWdnZXJzID0gdHJpbW1lZFRyaWdnZXJzLnNwbGl0KC9cXHMrLykubWFwKHRyaWdnZXIgPT4gdHJpZ2dlci5zcGxpdCgnOicpKS5tYXAoKHRyaWdnZXJQYWlyKSA9PiB7XHJcbiAgICBsZXQgYWxpYXMgPSBhbGlhc2VzW3RyaWdnZXJQYWlyWzBdXSB8fCB0cmlnZ2VyUGFpcjtcclxuICAgIHJldHVybiBuZXcgVHJpZ2dlcihhbGlhc1swXSwgYWxpYXNbMV0pO1xyXG4gIH0pO1xyXG5cclxuICBjb25zdCBtYW51YWxUcmlnZ2VycyA9IHBhcnNlZFRyaWdnZXJzLmZpbHRlcih0cmlnZ2VyUGFpciA9PiB0cmlnZ2VyUGFpci5pc01hbnVhbCgpKTtcclxuXHJcbiAgaWYgKG1hbnVhbFRyaWdnZXJzLmxlbmd0aCA+IDEpIHtcclxuICAgIHRocm93ICdUcmlnZ2VycyBwYXJzZSBlcnJvcjogb25seSBvbmUgbWFudWFsIHRyaWdnZXIgaXMgYWxsb3dlZCc7XHJcbiAgfVxyXG5cclxuICBpZiAobWFudWFsVHJpZ2dlcnMubGVuZ3RoID09PSAxICYmIHBhcnNlZFRyaWdnZXJzLmxlbmd0aCA+IDEpIHtcclxuICAgIHRocm93ICdUcmlnZ2VycyBwYXJzZSBlcnJvcjogbWFudWFsIHRyaWdnZXIgY2FuXFwndCBiZSBtaXhlZCB3aXRoIG90aGVyIHRyaWdnZXJzJztcclxuICB9XHJcblxyXG4gIHJldHVybiBwYXJzZWRUcmlnZ2VycztcclxufVxyXG5cclxuY29uc3Qgbm9vcEZuID0gKCkgPT4ge307XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gbGlzdGVuVG9UcmlnZ2VycyhyZW5kZXJlcjogYW55LCBuYXRpdmVFbGVtZW50OiBhbnksIHRyaWdnZXJzOiBzdHJpbmcsIG9wZW5GbiwgY2xvc2VGbiwgdG9nZ2xlRm4pIHtcclxuICBjb25zdCBwYXJzZWRUcmlnZ2VycyA9IHBhcnNlVHJpZ2dlcnModHJpZ2dlcnMpO1xyXG4gIGNvbnN0IGxpc3RlbmVycyA9IFtdO1xyXG5cclxuICBpZiAocGFyc2VkVHJpZ2dlcnMubGVuZ3RoID09PSAxICYmIHBhcnNlZFRyaWdnZXJzWzBdLmlzTWFudWFsKCkpIHtcclxuICAgIHJldHVybiBub29wRm47XHJcbiAgfVxyXG5cclxuICBwYXJzZWRUcmlnZ2Vycy5mb3JFYWNoKCh0cmlnZ2VyOiBUcmlnZ2VyKSA9PiB7XHJcbiAgICBpZiAodHJpZ2dlci5vcGVuID09PSB0cmlnZ2VyLmNsb3NlKSB7XHJcbiAgICAgIGxpc3RlbmVycy5wdXNoKHJlbmRlcmVyLmxpc3RlbihuYXRpdmVFbGVtZW50LCB0cmlnZ2VyLm9wZW4sIHRvZ2dsZUZuKSk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBsaXN0ZW5lcnMucHVzaChcclxuICAgICAgICAgIHJlbmRlcmVyLmxpc3RlbihuYXRpdmVFbGVtZW50LCB0cmlnZ2VyLm9wZW4sIG9wZW5GbiksIHJlbmRlcmVyLmxpc3RlbihuYXRpdmVFbGVtZW50LCB0cmlnZ2VyLmNsb3NlLCBjbG9zZUZuKSk7XHJcbiAgICB9XHJcbiAgfSk7XHJcblxyXG4gIHJldHVybiAoKSA9PiB7IGxpc3RlbmVycy5mb3JFYWNoKHVuc3Vic2NyaWJlRm4gPT4gdW5zdWJzY3JpYmVGbigpKTsgfTtcclxufVxyXG4iLCJpbXBvcnQge0luamVjdGFibGV9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQge1BsYWNlbWVudEFycmF5fSBmcm9tICcuLi91dGlsL3Bvc2l0aW9uaW5nJztcclxuXHJcbi8qKlxyXG4gKiBDb25maWd1cmF0aW9uIHNlcnZpY2UgZm9yIHRoZSBOZ2JQb3BvdmVyIGRpcmVjdGl2ZS5cclxuICogWW91IGNhbiBpbmplY3QgdGhpcyBzZXJ2aWNlLCB0eXBpY2FsbHkgaW4geW91ciByb290IGNvbXBvbmVudCwgYW5kIGN1c3RvbWl6ZSB0aGUgdmFsdWVzIG9mIGl0cyBwcm9wZXJ0aWVzIGluXHJcbiAqIG9yZGVyIHRvIHByb3ZpZGUgZGVmYXVsdCB2YWx1ZXMgZm9yIGFsbCB0aGUgcG9wb3ZlcnMgdXNlZCBpbiB0aGUgYXBwbGljYXRpb24uXHJcbiAqL1xyXG5ASW5qZWN0YWJsZSh7cHJvdmlkZWRJbjogJ3Jvb3QnfSlcclxuZXhwb3J0IGNsYXNzIE5nYlBvcG92ZXJDb25maWcge1xyXG4gIGF1dG9DbG9zZTogYm9vbGVhbiB8ICdpbnNpZGUnIHwgJ291dHNpZGUnID0gdHJ1ZTtcclxuICBwbGFjZW1lbnQ6IFBsYWNlbWVudEFycmF5ID0gJ3RvcCc7XHJcbiAgdHJpZ2dlcnMgPSAnY2xpY2snO1xyXG4gIGNvbnRhaW5lcjogc3RyaW5nO1xyXG4gIGRpc2FibGVQb3BvdmVyID0gZmFsc2U7XHJcbiAgcG9wb3ZlckNsYXNzOiBzdHJpbmc7XHJcbn1cclxuIiwiaW1wb3J0IHtcclxuICBDb21wb25lbnQsXHJcbiAgRGlyZWN0aXZlLFxyXG4gIElucHV0LFxyXG4gIE91dHB1dCxcclxuICBFdmVudEVtaXR0ZXIsXHJcbiAgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksXHJcbiAgT25Jbml0LFxyXG4gIE9uRGVzdHJveSxcclxuICBPbkNoYW5nZXMsXHJcbiAgSW5qZWN0LFxyXG4gIEluamVjdG9yLFxyXG4gIFJlbmRlcmVyMixcclxuICBDb21wb25lbnRSZWYsXHJcbiAgRWxlbWVudFJlZixcclxuICBUZW1wbGF0ZVJlZixcclxuICBWaWV3Q29udGFpbmVyUmVmLFxyXG4gIENvbXBvbmVudEZhY3RvcnlSZXNvbHZlcixcclxuICBOZ1pvbmUsXHJcbiAgU2ltcGxlQ2hhbmdlc1xyXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQge0RPQ1VNRU5UfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xyXG5pbXBvcnQge2Zyb21FdmVudCwgcmFjZX0gZnJvbSAncnhqcyc7XHJcbmltcG9ydCB7ZmlsdGVyLCB0YWtlVW50aWx9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcclxuXHJcbmltcG9ydCB7bGlzdGVuVG9UcmlnZ2Vyc30gZnJvbSAnLi4vdXRpbC90cmlnZ2Vycyc7XHJcbmltcG9ydCB7cG9zaXRpb25FbGVtZW50cywgUGxhY2VtZW50LCBQbGFjZW1lbnRBcnJheX0gZnJvbSAnLi4vdXRpbC9wb3NpdGlvbmluZyc7XHJcbmltcG9ydCB7UG9wdXBTZXJ2aWNlfSBmcm9tICcuLi91dGlsL3BvcHVwJztcclxuaW1wb3J0IHtLZXl9IGZyb20gJy4uL3V0aWwva2V5JztcclxuXHJcbmltcG9ydCB7TmdiUG9wb3ZlckNvbmZpZ30gZnJvbSAnLi9wb3BvdmVyLWNvbmZpZyc7XHJcblxyXG5sZXQgbmV4dElkID0gMDtcclxuXHJcbkBDb21wb25lbnQoe1xyXG4gIHNlbGVjdG9yOiAnbmdiLXBvcG92ZXItd2luZG93JyxcclxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaCxcclxuICBob3N0OiB7XHJcbiAgICAnW2NsYXNzXSc6XHJcbiAgICAgICAgJ1wicG9wb3ZlciBicy1wb3BvdmVyLVwiICsgcGxhY2VtZW50LnNwbGl0KFwiLVwiKVswXStcIiBicy1wb3BvdmVyLVwiICsgcGxhY2VtZW50ICsgKHBvcG92ZXJDbGFzcyA/IFwiIFwiICsgcG9wb3ZlckNsYXNzIDogXCJcIiknLFxyXG4gICAgJ3JvbGUnOiAndG9vbHRpcCcsXHJcbiAgICAnW2lkXSc6ICdpZCdcclxuICB9LFxyXG4gIHRlbXBsYXRlOiBgXHJcbiAgICA8ZGl2IGNsYXNzPVwiYXJyb3dcIj48L2Rpdj5cclxuICAgIDxoMyBjbGFzcz1cInBvcG92ZXItaGVhZGVyXCIgKm5nSWY9XCJ0aXRsZSAhPSBudWxsXCI+XHJcbiAgICAgIDxuZy10ZW1wbGF0ZSAjc2ltcGxlVGl0bGU+e3t0aXRsZX19PC9uZy10ZW1wbGF0ZT5cclxuICAgICAgPG5nLXRlbXBsYXRlIFtuZ1RlbXBsYXRlT3V0bGV0XT1cImlzVGl0bGVUZW1wbGF0ZSgpID8gdGl0bGUgOiBzaW1wbGVUaXRsZVwiIFtuZ1RlbXBsYXRlT3V0bGV0Q29udGV4dF09XCJjb250ZXh0XCI+PC9uZy10ZW1wbGF0ZT5cclxuICAgIDwvaDM+XHJcbiAgICA8ZGl2IGNsYXNzPVwicG9wb3Zlci1ib2R5XCI+PG5nLWNvbnRlbnQ+PC9uZy1jb250ZW50PjwvZGl2PmAsXHJcbiAgc3R5bGVzOiBbYFxyXG4gICAgOmhvc3QuYnMtcG9wb3Zlci10b3AgLmFycm93LCA6aG9zdC5icy1wb3BvdmVyLWJvdHRvbSAuYXJyb3cge1xyXG4gICAgICBsZWZ0OiA1MCU7XHJcbiAgICAgIG1hcmdpbi1sZWZ0OiAtNXB4O1xyXG4gICAgfVxyXG5cclxuICAgIDpob3N0LmJzLXBvcG92ZXItdG9wLWxlZnQgLmFycm93LCA6aG9zdC5icy1wb3BvdmVyLWJvdHRvbS1sZWZ0IC5hcnJvdyB7XHJcbiAgICAgIGxlZnQ6IDJlbTtcclxuICAgIH1cclxuXHJcbiAgICA6aG9zdC5icy1wb3BvdmVyLXRvcC1yaWdodCAuYXJyb3csIDpob3N0LmJzLXBvcG92ZXItYm90dG9tLXJpZ2h0IC5hcnJvdyB7XHJcbiAgICAgIGxlZnQ6IGF1dG87XHJcbiAgICAgIHJpZ2h0OiAyZW07XHJcbiAgICB9XHJcblxyXG4gICAgOmhvc3QuYnMtcG9wb3Zlci1sZWZ0IC5hcnJvdywgOmhvc3QuYnMtcG9wb3Zlci1yaWdodCAuYXJyb3cge1xyXG4gICAgICB0b3A6IDUwJTtcclxuICAgICAgbWFyZ2luLXRvcDogLTVweDtcclxuICAgIH1cclxuXHJcbiAgICA6aG9zdC5icy1wb3BvdmVyLWxlZnQtdG9wIC5hcnJvdywgOmhvc3QuYnMtcG9wb3Zlci1yaWdodC10b3AgLmFycm93IHtcclxuICAgICAgdG9wOiAwLjdlbTtcclxuICAgIH1cclxuXHJcbiAgICA6aG9zdC5icy1wb3BvdmVyLWxlZnQtYm90dG9tIC5hcnJvdywgOmhvc3QuYnMtcG9wb3Zlci1yaWdodC1ib3R0b20gLmFycm93IHtcclxuICAgICAgdG9wOiBhdXRvO1xyXG4gICAgICBib3R0b206IDAuN2VtO1xyXG4gICAgfVxyXG4gIGBdXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBOZ2JQb3BvdmVyV2luZG93IHtcclxuICBASW5wdXQoKSBwbGFjZW1lbnQ6IFBsYWNlbWVudCA9ICd0b3AnO1xyXG4gIEBJbnB1dCgpIHRpdGxlOiB1bmRlZmluZWQgfCBzdHJpbmcgfCBUZW1wbGF0ZVJlZjxhbnk+O1xyXG4gIEBJbnB1dCgpIGlkOiBzdHJpbmc7XHJcbiAgQElucHV0KCkgcG9wb3ZlckNsYXNzOiBzdHJpbmc7XHJcbiAgQElucHV0KCkgY29udGV4dDogYW55O1xyXG5cclxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIF9lbGVtZW50OiBFbGVtZW50UmVmPEhUTUxFbGVtZW50PiwgcHJpdmF0ZSBfcmVuZGVyZXI6IFJlbmRlcmVyMikge31cclxuXHJcbiAgaXNUaXRsZVRlbXBsYXRlKCkgeyByZXR1cm4gdGhpcy50aXRsZSBpbnN0YW5jZW9mIFRlbXBsYXRlUmVmOyB9XHJcblxyXG4gIGFwcGx5UGxhY2VtZW50KF9wbGFjZW1lbnQ6IFBsYWNlbWVudCkge1xyXG4gICAgLy8gcmVtb3ZlIHRoZSBjdXJyZW50IHBsYWNlbWVudCBjbGFzc2VzXHJcbiAgICB0aGlzLl9yZW5kZXJlci5yZW1vdmVDbGFzcyh0aGlzLl9lbGVtZW50Lm5hdGl2ZUVsZW1lbnQsICdicy1wb3BvdmVyLScgKyB0aGlzLnBsYWNlbWVudC50b1N0cmluZygpLnNwbGl0KCctJylbMF0pO1xyXG4gICAgdGhpcy5fcmVuZGVyZXIucmVtb3ZlQ2xhc3ModGhpcy5fZWxlbWVudC5uYXRpdmVFbGVtZW50LCAnYnMtcG9wb3Zlci0nICsgdGhpcy5wbGFjZW1lbnQudG9TdHJpbmcoKSk7XHJcblxyXG4gICAgLy8gc2V0IHRoZSBuZXcgcGxhY2VtZW50IGNsYXNzZXNcclxuICAgIHRoaXMucGxhY2VtZW50ID0gX3BsYWNlbWVudDtcclxuXHJcbiAgICAvLyBhcHBseSB0aGUgbmV3IHBsYWNlbWVudFxyXG4gICAgdGhpcy5fcmVuZGVyZXIuYWRkQ2xhc3ModGhpcy5fZWxlbWVudC5uYXRpdmVFbGVtZW50LCAnYnMtcG9wb3Zlci0nICsgdGhpcy5wbGFjZW1lbnQudG9TdHJpbmcoKS5zcGxpdCgnLScpWzBdKTtcclxuICAgIHRoaXMuX3JlbmRlcmVyLmFkZENsYXNzKHRoaXMuX2VsZW1lbnQubmF0aXZlRWxlbWVudCwgJ2JzLXBvcG92ZXItJyArIHRoaXMucGxhY2VtZW50LnRvU3RyaW5nKCkpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogVGVsbHMgd2hldGhlciB0aGUgZXZlbnQgaGFzIGJlZW4gdHJpZ2dlcmVkIGZyb20gdGhpcyBjb21wb25lbnQncyBzdWJ0cmVlIG9yIG5vdC5cclxuICAgKlxyXG4gICAqIEBwYXJhbSBldmVudCB0aGUgZXZlbnQgdG8gY2hlY2tcclxuICAgKlxyXG4gICAqIEByZXR1cm4gd2hldGhlciB0aGUgZXZlbnQgaGFzIGJlZW4gdHJpZ2dlcmVkIGZyb20gdGhpcyBjb21wb25lbnQncyBzdWJ0cmVlIG9yIG5vdC5cclxuICAgKi9cclxuICBpc0V2ZW50RnJvbShldmVudDogRXZlbnQpOiBib29sZWFuIHsgcmV0dXJuIHRoaXMuX2VsZW1lbnQubmF0aXZlRWxlbWVudC5jb250YWlucyhldmVudC50YXJnZXQgYXMgSFRNTEVsZW1lbnQpOyB9XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBBIGxpZ2h0d2VpZ2h0LCBleHRlbnNpYmxlIGRpcmVjdGl2ZSBmb3IgZmFuY3kgcG9wb3ZlciBjcmVhdGlvbi5cclxuICovXHJcbkBEaXJlY3RpdmUoe3NlbGVjdG9yOiAnW25nYlBvcG92ZXJdJywgZXhwb3J0QXM6ICduZ2JQb3BvdmVyJ30pXHJcbmV4cG9ydCBjbGFzcyBOZ2JQb3BvdmVyIGltcGxlbWVudHMgT25Jbml0LCBPbkRlc3Ryb3ksIE9uQ2hhbmdlcyB7XHJcbiAgLyoqXHJcbiAgICogSW5kaWNhdGVzIHdoZXRoZXIgdGhlIHBvcG92ZXIgc2hvdWxkIGJlIGNsb3NlZCBvbiBFc2NhcGUga2V5IGFuZCBpbnNpZGUvb3V0c2lkZSBjbGlja3MuXHJcbiAgICpcclxuICAgKiAtIHRydWUgKGRlZmF1bHQpOiBjbG9zZXMgb24gYm90aCBvdXRzaWRlIGFuZCBpbnNpZGUgY2xpY2tzIGFzIHdlbGwgYXMgRXNjYXBlIHByZXNzZXNcclxuICAgKiAtIGZhbHNlOiBkaXNhYmxlcyB0aGUgYXV0b0Nsb3NlIGZlYXR1cmUgKE5COiB0cmlnZ2VycyBzdGlsbCBhcHBseSlcclxuICAgKiAtICdpbnNpZGUnOiBjbG9zZXMgb24gaW5zaWRlIGNsaWNrcyBhcyB3ZWxsIGFzIEVzY2FwZSBwcmVzc2VzXHJcbiAgICogLSAnb3V0c2lkZSc6IGNsb3NlcyBvbiBvdXRzaWRlIGNsaWNrcyAoc29tZXRpbWVzIGFsc28gYWNoaWV2YWJsZSB0aHJvdWdoIHRyaWdnZXJzKVxyXG4gICAqIGFzIHdlbGwgYXMgRXNjYXBlIHByZXNzZXNcclxuICAgKlxyXG4gICAqIEBzaW5jZSAzLjAuMFxyXG4gICAqL1xyXG4gIEBJbnB1dCgpIGF1dG9DbG9zZTogYm9vbGVhbiB8ICdpbnNpZGUnIHwgJ291dHNpZGUnO1xyXG4gIC8qKlxyXG4gICAqIENvbnRlbnQgdG8gYmUgZGlzcGxheWVkIGFzIHBvcG92ZXIuIElmIHRpdGxlIGFuZCBjb250ZW50IGFyZSBlbXB0eSwgdGhlIHBvcG92ZXIgd29uJ3Qgb3Blbi5cclxuICAgKi9cclxuICBASW5wdXQoKSBuZ2JQb3BvdmVyOiBzdHJpbmcgfCBUZW1wbGF0ZVJlZjxhbnk+O1xyXG4gIC8qKlxyXG4gICAqIFRpdGxlIG9mIGEgcG9wb3Zlci4gSWYgdGl0bGUgYW5kIGNvbnRlbnQgYXJlIGVtcHR5LCB0aGUgcG9wb3ZlciB3b24ndCBvcGVuLlxyXG4gICAqL1xyXG4gIEBJbnB1dCgpIHBvcG92ZXJUaXRsZTogc3RyaW5nIHwgVGVtcGxhdGVSZWY8YW55PjtcclxuICAvKipcclxuICAgKiBQbGFjZW1lbnQgb2YgYSBwb3BvdmVyIGFjY2VwdHM6XHJcbiAgICogICAgXCJ0b3BcIiwgXCJ0b3AtbGVmdFwiLCBcInRvcC1yaWdodFwiLCBcImJvdHRvbVwiLCBcImJvdHRvbS1sZWZ0XCIsIFwiYm90dG9tLXJpZ2h0XCIsXHJcbiAgICogICAgXCJsZWZ0XCIsIFwibGVmdC10b3BcIiwgXCJsZWZ0LWJvdHRvbVwiLCBcInJpZ2h0XCIsIFwicmlnaHQtdG9wXCIsIFwicmlnaHQtYm90dG9tXCJcclxuICAgKiBhbmQgYXJyYXkgb2YgYWJvdmUgdmFsdWVzLlxyXG4gICAqL1xyXG4gIEBJbnB1dCgpIHBsYWNlbWVudDogUGxhY2VtZW50QXJyYXk7XHJcbiAgLyoqXHJcbiAgICogU3BlY2lmaWVzIGV2ZW50cyB0aGF0IHNob3VsZCB0cmlnZ2VyLiBTdXBwb3J0cyBhIHNwYWNlIHNlcGFyYXRlZCBsaXN0IG9mIGV2ZW50IG5hbWVzLlxyXG4gICAqL1xyXG4gIEBJbnB1dCgpIHRyaWdnZXJzOiBzdHJpbmc7XHJcbiAgLyoqXHJcbiAgICogQSBzZWxlY3RvciBzcGVjaWZ5aW5nIHRoZSBlbGVtZW50IHRoZSBwb3BvdmVyIHNob3VsZCBiZSBhcHBlbmRlZCB0by5cclxuICAgKiBDdXJyZW50bHkgb25seSBzdXBwb3J0cyBcImJvZHlcIi5cclxuICAgKi9cclxuICBASW5wdXQoKSBjb250YWluZXI6IHN0cmluZztcclxuICAvKipcclxuICAgKiBBIGZsYWcgaW5kaWNhdGluZyBpZiBhIGdpdmVuIHBvcG92ZXIgaXMgZGlzYWJsZWQgYW5kIHNob3VsZCBub3QgYmUgZGlzcGxheWVkLlxyXG4gICAqXHJcbiAgICogQHNpbmNlIDEuMS4wXHJcbiAgICovXHJcbiAgQElucHV0KCkgZGlzYWJsZVBvcG92ZXI6IGJvb2xlYW47XHJcbiAgLyoqXHJcbiAgICogQW4gb3B0aW9uYWwgY2xhc3MgYXBwbGllZCB0byBuZ2ItcG9wb3Zlci13aW5kb3dcclxuICAgKlxyXG4gICAqIEBzaW5jZSAyLjIuMFxyXG4gICAqL1xyXG4gIEBJbnB1dCgpIHBvcG92ZXJDbGFzczogc3RyaW5nO1xyXG4gIC8qKlxyXG4gICAqIEVtaXRzIGFuIGV2ZW50IHdoZW4gdGhlIHBvcG92ZXIgaXMgc2hvd25cclxuICAgKi9cclxuICBAT3V0cHV0KCkgc2hvd24gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XHJcbiAgLyoqXHJcbiAgICogRW1pdHMgYW4gZXZlbnQgd2hlbiB0aGUgcG9wb3ZlciBpcyBoaWRkZW5cclxuICAgKi9cclxuICBAT3V0cHV0KCkgaGlkZGVuID0gbmV3IEV2ZW50RW1pdHRlcigpO1xyXG5cclxuICBwcml2YXRlIF9uZ2JQb3BvdmVyV2luZG93SWQgPSBgbmdiLXBvcG92ZXItJHtuZXh0SWQrK31gO1xyXG4gIHByaXZhdGUgX3BvcHVwU2VydmljZTogUG9wdXBTZXJ2aWNlPE5nYlBvcG92ZXJXaW5kb3c+O1xyXG4gIHByaXZhdGUgX3dpbmRvd1JlZjogQ29tcG9uZW50UmVmPE5nYlBvcG92ZXJXaW5kb3c+O1xyXG4gIHByaXZhdGUgX3VucmVnaXN0ZXJMaXN0ZW5lcnNGbjtcclxuICBwcml2YXRlIF96b25lU3Vic2NyaXB0aW9uOiBhbnk7XHJcbiAgcHJpdmF0ZSBfaXNEaXNhYmxlZCgpOiBib29sZWFuIHtcclxuICAgIGlmICh0aGlzLmRpc2FibGVQb3BvdmVyKSB7XHJcbiAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgfVxyXG4gICAgaWYgKCF0aGlzLm5nYlBvcG92ZXIgJiYgIXRoaXMucG9wb3ZlclRpdGxlKSB7XHJcbiAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIGZhbHNlO1xyXG4gIH1cclxuXHJcbiAgY29uc3RydWN0b3IoXHJcbiAgICAgIHByaXZhdGUgX2VsZW1lbnRSZWY6IEVsZW1lbnRSZWY8SFRNTEVsZW1lbnQ+LCBwcml2YXRlIF9yZW5kZXJlcjogUmVuZGVyZXIyLCBpbmplY3RvcjogSW5qZWN0b3IsXHJcbiAgICAgIGNvbXBvbmVudEZhY3RvcnlSZXNvbHZlcjogQ29tcG9uZW50RmFjdG9yeVJlc29sdmVyLCB2aWV3Q29udGFpbmVyUmVmOiBWaWV3Q29udGFpbmVyUmVmLCBjb25maWc6IE5nYlBvcG92ZXJDb25maWcsXHJcbiAgICAgIHByaXZhdGUgX25nWm9uZTogTmdab25lLCBASW5qZWN0KERPQ1VNRU5UKSBwcml2YXRlIF9kb2N1bWVudDogYW55KSB7XHJcbiAgICB0aGlzLmF1dG9DbG9zZSA9IGNvbmZpZy5hdXRvQ2xvc2U7XHJcbiAgICB0aGlzLnBsYWNlbWVudCA9IGNvbmZpZy5wbGFjZW1lbnQ7XHJcbiAgICB0aGlzLnRyaWdnZXJzID0gY29uZmlnLnRyaWdnZXJzO1xyXG4gICAgdGhpcy5jb250YWluZXIgPSBjb25maWcuY29udGFpbmVyO1xyXG4gICAgdGhpcy5kaXNhYmxlUG9wb3ZlciA9IGNvbmZpZy5kaXNhYmxlUG9wb3ZlcjtcclxuICAgIHRoaXMucG9wb3ZlckNsYXNzID0gY29uZmlnLnBvcG92ZXJDbGFzcztcclxuICAgIHRoaXMuX3BvcHVwU2VydmljZSA9IG5ldyBQb3B1cFNlcnZpY2U8TmdiUG9wb3ZlcldpbmRvdz4oXHJcbiAgICAgICAgTmdiUG9wb3ZlcldpbmRvdywgaW5qZWN0b3IsIHZpZXdDb250YWluZXJSZWYsIF9yZW5kZXJlciwgY29tcG9uZW50RmFjdG9yeVJlc29sdmVyKTtcclxuXHJcbiAgICB0aGlzLl96b25lU3Vic2NyaXB0aW9uID0gX25nWm9uZS5vblN0YWJsZS5zdWJzY3JpYmUoKCkgPT4ge1xyXG4gICAgICBpZiAodGhpcy5fd2luZG93UmVmKSB7XHJcbiAgICAgICAgdGhpcy5fd2luZG93UmVmLmluc3RhbmNlLmFwcGx5UGxhY2VtZW50KFxyXG4gICAgICAgICAgICBwb3NpdGlvbkVsZW1lbnRzKFxyXG4gICAgICAgICAgICAgICAgdGhpcy5fZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50LCB0aGlzLl93aW5kb3dSZWYubG9jYXRpb24ubmF0aXZlRWxlbWVudCwgdGhpcy5wbGFjZW1lbnQsXHJcbiAgICAgICAgICAgICAgICB0aGlzLmNvbnRhaW5lciA9PT0gJ2JvZHknKSk7XHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogT3BlbnMgYW4gZWxlbWVudMOiwoDCmXMgcG9wb3Zlci4gVGhpcyBpcyBjb25zaWRlcmVkIGEgw6LCgMKcbWFudWFsw6LCgMKdIHRyaWdnZXJpbmcgb2YgdGhlIHBvcG92ZXIuXHJcbiAgICogVGhlIGNvbnRleHQgaXMgYW4gb3B0aW9uYWwgdmFsdWUgdG8gYmUgaW5qZWN0ZWQgaW50byB0aGUgcG9wb3ZlciB0ZW1wbGF0ZSB3aGVuIGl0IGlzIGNyZWF0ZWQuXHJcbiAgICovXHJcbiAgb3Blbihjb250ZXh0PzogYW55KSB7XHJcbiAgICBpZiAoIXRoaXMuX3dpbmRvd1JlZiAmJiAhdGhpcy5faXNEaXNhYmxlZCgpKSB7XHJcbiAgICAgIHRoaXMuX3dpbmRvd1JlZiA9IHRoaXMuX3BvcHVwU2VydmljZS5vcGVuKHRoaXMubmdiUG9wb3ZlciwgY29udGV4dCk7XHJcbiAgICAgIHRoaXMuX3dpbmRvd1JlZi5pbnN0YW5jZS50aXRsZSA9IHRoaXMucG9wb3ZlclRpdGxlO1xyXG4gICAgICB0aGlzLl93aW5kb3dSZWYuaW5zdGFuY2UuY29udGV4dCA9IGNvbnRleHQ7XHJcbiAgICAgIHRoaXMuX3dpbmRvd1JlZi5pbnN0YW5jZS5wb3BvdmVyQ2xhc3MgPSB0aGlzLnBvcG92ZXJDbGFzcztcclxuICAgICAgdGhpcy5fd2luZG93UmVmLmluc3RhbmNlLmlkID0gdGhpcy5fbmdiUG9wb3ZlcldpbmRvd0lkO1xyXG5cclxuICAgICAgdGhpcy5fcmVuZGVyZXIuc2V0QXR0cmlidXRlKHRoaXMuX2VsZW1lbnRSZWYubmF0aXZlRWxlbWVudCwgJ2FyaWEtZGVzY3JpYmVkYnknLCB0aGlzLl9uZ2JQb3BvdmVyV2luZG93SWQpO1xyXG5cclxuICAgICAgaWYgKHRoaXMuY29udGFpbmVyID09PSAnYm9keScpIHtcclxuICAgICAgICB0aGlzLl9kb2N1bWVudC5xdWVyeVNlbGVjdG9yKHRoaXMuY29udGFpbmVyKS5hcHBlbmRDaGlsZCh0aGlzLl93aW5kb3dSZWYubG9jYXRpb24ubmF0aXZlRWxlbWVudCk7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIC8vIGFwcGx5IHN0eWxpbmcgdG8gc2V0IGJhc2ljIGNzcy1jbGFzc2VzIG9uIHRhcmdldCBlbGVtZW50LCBiZWZvcmUgZ29pbmcgZm9yIHBvc2l0aW9uaW5nXHJcbiAgICAgIHRoaXMuX3dpbmRvd1JlZi5jaGFuZ2VEZXRlY3RvclJlZi5kZXRlY3RDaGFuZ2VzKCk7XHJcbiAgICAgIHRoaXMuX3dpbmRvd1JlZi5jaGFuZ2VEZXRlY3RvclJlZi5tYXJrRm9yQ2hlY2soKTtcclxuXHJcbiAgICAgIC8vIHBvc2l0aW9uIHBvcG92ZXIgYWxvbmcgdGhlIGVsZW1lbnRcclxuICAgICAgdGhpcy5fd2luZG93UmVmLmluc3RhbmNlLmFwcGx5UGxhY2VtZW50KFxyXG4gICAgICAgICAgcG9zaXRpb25FbGVtZW50cyhcclxuICAgICAgICAgICAgICB0aGlzLl9lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQsIHRoaXMuX3dpbmRvd1JlZi5sb2NhdGlvbi5uYXRpdmVFbGVtZW50LCB0aGlzLnBsYWNlbWVudCxcclxuICAgICAgICAgICAgICB0aGlzLmNvbnRhaW5lciA9PT0gJ2JvZHknKSk7XHJcblxyXG4gICAgICBpZiAodGhpcy5hdXRvQ2xvc2UpIHtcclxuICAgICAgICB0aGlzLl9uZ1pvbmUucnVuT3V0c2lkZUFuZ3VsYXIoKCkgPT4ge1xyXG4gICAgICAgICAgLy8gcHJldmVudHMgYXV0b21hdGljIGNsb3NpbmcgcmlnaHQgYWZ0ZXIgYW4gb3BlbmluZyBieSBwdXR0aW5nIGEgZ3VhcmQgZm9yIHRoZSB0aW1lIG9mIG9uZSBldmVudCBoYW5kbGluZ1xyXG4gICAgICAgICAgLy8gcGFzc1xyXG4gICAgICAgICAgLy8gdXNlIGNhc2U6IGNsaWNrIGV2ZW50IHdvdWxkIHJlYWNoIGFuIGVsZW1lbnQgb3BlbmluZyB0aGUgcG9wb3ZlciBmaXJzdCwgdGhlbiByZWFjaCB0aGUgYXV0b0Nsb3NlIGhhbmRsZXJcclxuICAgICAgICAgIC8vIHdoaWNoIHdvdWxkIGNsb3NlIGl0XHJcbiAgICAgICAgICBsZXQganVzdE9wZW5lZCA9IHRydWU7XHJcbiAgICAgICAgICByZXF1ZXN0QW5pbWF0aW9uRnJhbWUoKCkgPT4ganVzdE9wZW5lZCA9IGZhbHNlKTtcclxuXHJcbiAgICAgICAgICBjb25zdCBlc2NhcGVzJCA9IGZyb21FdmVudDxLZXlib2FyZEV2ZW50Pih0aGlzLl9kb2N1bWVudCwgJ2tleXVwJylcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5waXBlKHRha2VVbnRpbCh0aGlzLmhpZGRlbiksIGZpbHRlcihldmVudCA9PiBldmVudC53aGljaCA9PT0gS2V5LkVzY2FwZSkpO1xyXG5cclxuICAgICAgICAgIGNvbnN0IGNsaWNrcyQgPSBmcm9tRXZlbnQ8TW91c2VFdmVudD4odGhpcy5fZG9jdW1lbnQsICdjbGljaycpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5waXBlKFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGFrZVVudGlsKHRoaXMuaGlkZGVuKSwgZmlsdGVyKCgpID0+ICFqdXN0T3BlbmVkKSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZpbHRlcihldmVudCA9PiB0aGlzLl9zaG91bGRDbG9zZUZyb21DbGljayhldmVudCkpKTtcclxuXHJcbiAgICAgICAgICByYWNlPEV2ZW50PihbZXNjYXBlcyQsIGNsaWNrcyRdKS5zdWJzY3JpYmUoKCkgPT4gdGhpcy5fbmdab25lLnJ1bigoKSA9PiB0aGlzLmNsb3NlKCkpKTtcclxuICAgICAgICB9KTtcclxuICAgICAgfVxyXG5cclxuICAgICAgdGhpcy5zaG93bi5lbWl0KCk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBDbG9zZXMgYW4gZWxlbWVudMOiwoDCmXMgcG9wb3Zlci4gVGhpcyBpcyBjb25zaWRlcmVkIGEgw6LCgMKcbWFudWFsw6LCgMKdIHRyaWdnZXJpbmcgb2YgdGhlIHBvcG92ZXIuXHJcbiAgICovXHJcbiAgY2xvc2UoKTogdm9pZCB7XHJcbiAgICBpZiAodGhpcy5fd2luZG93UmVmKSB7XHJcbiAgICAgIHRoaXMuX3JlbmRlcmVyLnJlbW92ZUF0dHJpYnV0ZSh0aGlzLl9lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQsICdhcmlhLWRlc2NyaWJlZGJ5Jyk7XHJcbiAgICAgIHRoaXMuX3BvcHVwU2VydmljZS5jbG9zZSgpO1xyXG4gICAgICB0aGlzLl93aW5kb3dSZWYgPSBudWxsO1xyXG4gICAgICB0aGlzLmhpZGRlbi5lbWl0KCk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBUb2dnbGVzIGFuIGVsZW1lbnTDosKAwplzIHBvcG92ZXIuIFRoaXMgaXMgY29uc2lkZXJlZCBhIMOiwoDCnG1hbnVhbMOiwoDCnSB0cmlnZ2VyaW5nIG9mIHRoZSBwb3BvdmVyLlxyXG4gICAqL1xyXG4gIHRvZ2dsZSgpOiB2b2lkIHtcclxuICAgIGlmICh0aGlzLl93aW5kb3dSZWYpIHtcclxuICAgICAgdGhpcy5jbG9zZSgpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdGhpcy5vcGVuKCk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBSZXR1cm5zIHdoZXRoZXIgb3Igbm90IHRoZSBwb3BvdmVyIGlzIGN1cnJlbnRseSBiZWluZyBzaG93blxyXG4gICAqL1xyXG4gIGlzT3BlbigpOiBib29sZWFuIHsgcmV0dXJuIHRoaXMuX3dpbmRvd1JlZiAhPSBudWxsOyB9XHJcblxyXG4gIG5nT25Jbml0KCkge1xyXG4gICAgdGhpcy5fdW5yZWdpc3Rlckxpc3RlbmVyc0ZuID0gbGlzdGVuVG9UcmlnZ2VycyhcclxuICAgICAgICB0aGlzLl9yZW5kZXJlciwgdGhpcy5fZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50LCB0aGlzLnRyaWdnZXJzLCB0aGlzLm9wZW4uYmluZCh0aGlzKSwgdGhpcy5jbG9zZS5iaW5kKHRoaXMpLFxyXG4gICAgICAgIHRoaXMudG9nZ2xlLmJpbmQodGhpcykpO1xyXG4gIH1cclxuXHJcbiAgbmdPbkNoYW5nZXMoY2hhbmdlczogU2ltcGxlQ2hhbmdlcykge1xyXG4gICAgLy8gY2xvc2UgcG9wb3ZlciBpZiB0aXRsZSBhbmQgY29udGVudCBiZWNvbWUgZW1wdHksIG9yIGRpc2FibGVQb3BvdmVyIHNldCB0byB0cnVlXHJcbiAgICBpZiAoKGNoYW5nZXNbJ25nYlBvcG92ZXInXSB8fCBjaGFuZ2VzWydwb3BvdmVyVGl0bGUnXSB8fCBjaGFuZ2VzWydkaXNhYmxlUG9wb3ZlciddKSAmJiB0aGlzLl9pc0Rpc2FibGVkKCkpIHtcclxuICAgICAgdGhpcy5jbG9zZSgpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgbmdPbkRlc3Ryb3koKSB7XHJcbiAgICB0aGlzLmNsb3NlKCk7XHJcbiAgICB0aGlzLl91bnJlZ2lzdGVyTGlzdGVuZXJzRm4oKTtcclxuICAgIHRoaXMuX3pvbmVTdWJzY3JpcHRpb24udW5zdWJzY3JpYmUoKTtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgX3Nob3VsZENsb3NlRnJvbUNsaWNrKGV2ZW50OiBNb3VzZUV2ZW50KSB7XHJcbiAgICBpZiAoZXZlbnQuYnV0dG9uICE9PSAyKSB7XHJcbiAgICAgIGlmICh0aGlzLmF1dG9DbG9zZSA9PT0gdHJ1ZSkge1xyXG4gICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICB9IGVsc2UgaWYgKHRoaXMuYXV0b0Nsb3NlID09PSAnaW5zaWRlJyAmJiB0aGlzLl9pc0V2ZW50RnJvbVBvcG92ZXIoZXZlbnQpKSB7XHJcbiAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgIH0gZWxzZSBpZiAodGhpcy5hdXRvQ2xvc2UgPT09ICdvdXRzaWRlJyAmJiAhdGhpcy5faXNFdmVudEZyb21Qb3BvdmVyKGV2ZW50KSkge1xyXG4gICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgICByZXR1cm4gZmFsc2U7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIF9pc0V2ZW50RnJvbVBvcG92ZXIoZXZlbnQ6IE1vdXNlRXZlbnQpIHtcclxuICAgIGNvbnN0IHBvcHVwID0gdGhpcy5fd2luZG93UmVmLmluc3RhbmNlO1xyXG4gICAgcmV0dXJuIHBvcHVwID8gcG9wdXAuaXNFdmVudEZyb20oZXZlbnQpIDogZmFsc2U7XHJcbiAgfVxyXG59XHJcbiIsImltcG9ydCB7TmdNb2R1bGUsIE1vZHVsZVdpdGhQcm92aWRlcnN9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5cclxuaW1wb3J0IHtOZ2JQb3BvdmVyLCBOZ2JQb3BvdmVyV2luZG93fSBmcm9tICcuL3BvcG92ZXInO1xyXG5pbXBvcnQge0NvbW1vbk1vZHVsZX0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcclxuXHJcbmV4cG9ydCB7TmdiUG9wb3Zlcn0gZnJvbSAnLi9wb3BvdmVyJztcclxuZXhwb3J0IHtOZ2JQb3BvdmVyQ29uZmlnfSBmcm9tICcuL3BvcG92ZXItY29uZmlnJztcclxuZXhwb3J0IHtQbGFjZW1lbnR9IGZyb20gJy4uL3V0aWwvcG9zaXRpb25pbmcnO1xyXG5cclxuQE5nTW9kdWxlKHtcclxuICBkZWNsYXJhdGlvbnM6IFtOZ2JQb3BvdmVyLCBOZ2JQb3BvdmVyV2luZG93XSxcclxuICBleHBvcnRzOiBbTmdiUG9wb3Zlcl0sXHJcbiAgaW1wb3J0czogW0NvbW1vbk1vZHVsZV0sXHJcbiAgZW50cnlDb21wb25lbnRzOiBbTmdiUG9wb3ZlcldpbmRvd11cclxufSlcclxuZXhwb3J0IGNsYXNzIE5nYlBvcG92ZXJNb2R1bGUge1xyXG4gIC8qKlxyXG4gICAqIEltcG9ydGluZyB3aXRoICcuZm9yUm9vdCgpJyBpcyBubyBsb25nZXIgbmVjZXNzYXJ5LCB5b3UgY2FuIHNpbXBseSBpbXBvcnQgdGhlIG1vZHVsZS5cclxuICAgKiBXaWxsIGJlIHJlbW92ZWQgaW4gNC4wLjAuXHJcbiAgICpcclxuICAgKiBAZGVwcmVjYXRlZCAzLjAuMFxyXG4gICAqL1xyXG4gIHN0YXRpYyBmb3JSb290KCk6IE1vZHVsZVdpdGhQcm92aWRlcnMgeyByZXR1cm4ge25nTW9kdWxlOiBOZ2JQb3BvdmVyTW9kdWxlfTsgfVxyXG59XHJcbiIsImltcG9ydCB7SW5qZWN0YWJsZX0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcblxyXG4vKipcclxuICogQ29uZmlndXJhdGlvbiBzZXJ2aWNlIGZvciB0aGUgTmdiUHJvZ3Jlc3NiYXIgY29tcG9uZW50LlxyXG4gKiBZb3UgY2FuIGluamVjdCB0aGlzIHNlcnZpY2UsIHR5cGljYWxseSBpbiB5b3VyIHJvb3QgY29tcG9uZW50LCBhbmQgY3VzdG9taXplIHRoZSB2YWx1ZXMgb2YgaXRzIHByb3BlcnRpZXMgaW5cclxuICogb3JkZXIgdG8gcHJvdmlkZSBkZWZhdWx0IHZhbHVlcyBmb3IgYWxsIHRoZSBwcm9ncmVzcyBiYXJzIHVzZWQgaW4gdGhlIGFwcGxpY2F0aW9uLlxyXG4gKi9cclxuQEluamVjdGFibGUoe3Byb3ZpZGVkSW46ICdyb290J30pXHJcbmV4cG9ydCBjbGFzcyBOZ2JQcm9ncmVzc2JhckNvbmZpZyB7XHJcbiAgbWF4ID0gMTAwO1xyXG4gIGFuaW1hdGVkID0gZmFsc2U7XHJcbiAgc3RyaXBlZCA9IGZhbHNlO1xyXG4gIHR5cGU6IHN0cmluZztcclxuICBzaG93VmFsdWUgPSBmYWxzZTtcclxuICBoZWlnaHQ6IHN0cmluZztcclxufVxyXG4iLCJpbXBvcnQge0NvbXBvbmVudCwgSW5wdXQsIENoYW5nZURldGVjdGlvblN0cmF0ZWd5fSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHtnZXRWYWx1ZUluUmFuZ2V9IGZyb20gJy4uL3V0aWwvdXRpbCc7XHJcbmltcG9ydCB7TmdiUHJvZ3Jlc3NiYXJDb25maWd9IGZyb20gJy4vcHJvZ3Jlc3NiYXItY29uZmlnJztcclxuXHJcbi8qKlxyXG4gKiBEaXJlY3RpdmUgdGhhdCBjYW4gYmUgdXNlZCB0byBwcm92aWRlIGZlZWRiYWNrIG9uIHRoZSBwcm9ncmVzcyBvZiBhIHdvcmtmbG93IG9yIGFuIGFjdGlvbi5cclxuICovXHJcbkBDb21wb25lbnQoe1xyXG4gIHNlbGVjdG9yOiAnbmdiLXByb2dyZXNzYmFyJyxcclxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaCxcclxuICB0ZW1wbGF0ZTogYFxyXG4gICAgPGRpdiBjbGFzcz1cInByb2dyZXNzXCIgW3N0eWxlLmhlaWdodF09XCJoZWlnaHRcIj5cclxuICAgICAgPGRpdiBjbGFzcz1cInByb2dyZXNzLWJhcnt7dHlwZSA/ICcgYmctJyArIHR5cGUgOiAnJ319e3thbmltYXRlZCA/ICcgcHJvZ3Jlc3MtYmFyLWFuaW1hdGVkJyA6ICcnfX17e3N0cmlwZWQgP1xyXG4gICAgJyBwcm9ncmVzcy1iYXItc3RyaXBlZCcgOiAnJ319XCIgcm9sZT1cInByb2dyZXNzYmFyXCIgW3N0eWxlLndpZHRoLiVdPVwiZ2V0UGVyY2VudFZhbHVlKClcIlxyXG4gICAgW2F0dHIuYXJpYS12YWx1ZW5vd109XCJnZXRWYWx1ZSgpXCIgYXJpYS12YWx1ZW1pbj1cIjBcIiBbYXR0ci5hcmlhLXZhbHVlbWF4XT1cIm1heFwiPlxyXG4gICAgICAgIDxzcGFuICpuZ0lmPVwic2hvd1ZhbHVlXCIgaTE4bj1cIkBAbmdiLnByb2dyZXNzYmFyLnZhbHVlXCI+e3tnZXRQZXJjZW50VmFsdWUoKX19JTwvc3Bhbj48bmctY29udGVudD48L25nLWNvbnRlbnQ+XHJcbiAgICAgIDwvZGl2PlxyXG4gICAgPC9kaXY+XHJcbiAgYFxyXG59KVxyXG5leHBvcnQgY2xhc3MgTmdiUHJvZ3Jlc3NiYXIge1xyXG4gIC8qKlxyXG4gICAqIE1heGltYWwgdmFsdWUgdG8gYmUgZGlzcGxheWVkIGluIHRoZSBwcm9ncmVzc2Jhci5cclxuICAgKi9cclxuICBASW5wdXQoKSBtYXg6IG51bWJlcjtcclxuXHJcbiAgLyoqXHJcbiAgICogQSBmbGFnIGluZGljYXRpbmcgaWYgdGhlIHN0cmlwZXMgb2YgdGhlIHByb2dyZXNzIGJhciBzaG91bGQgYmUgYW5pbWF0ZWQuIFRha2VzIGVmZmVjdCBvbmx5IGZvciBicm93c2Vyc1xyXG4gICAqIHN1cHBvcnRpbmcgQ1NTMyBhbmltYXRpb25zLCBhbmQgaWYgc3RyaXBlZCBpcyB0cnVlLlxyXG4gICAqL1xyXG4gIEBJbnB1dCgpIGFuaW1hdGVkOiBib29sZWFuO1xyXG5cclxuICAvKipcclxuICAgKiBBIGZsYWcgaW5kaWNhdGluZyBpZiBhIHByb2dyZXNzIGJhciBzaG91bGQgYmUgZGlzcGxheWVkIGFzIHN0cmlwZWQuXHJcbiAgICovXHJcbiAgQElucHV0KCkgc3RyaXBlZDogYm9vbGVhbjtcclxuXHJcbiAgLyoqXHJcbiAgICogQSBmbGFnIGluZGljYXRpbmcgaWYgdGhlIGN1cnJlbnQgcGVyY2VudGFnZSB2YWx1ZSBzaG91bGQgYmUgc2hvd24uXHJcbiAgICovXHJcbiAgQElucHV0KCkgc2hvd1ZhbHVlOiBib29sZWFuO1xyXG5cclxuICAvKipcclxuICAgKiBUeXBlIG9mIHByb2dyZXNzIGJhciwgY2FuIGJlIG9uZSBvZiBcInN1Y2Nlc3NcIiwgXCJpbmZvXCIsIFwid2FybmluZ1wiIG9yIFwiZGFuZ2VyXCIuXHJcbiAgICovXHJcbiAgQElucHV0KCkgdHlwZTogc3RyaW5nO1xyXG5cclxuICAvKipcclxuICAgKiBDdXJyZW50IHZhbHVlIHRvIGJlIGRpc3BsYXllZCBpbiB0aGUgcHJvZ3Jlc3NiYXIuIFNob3VsZCBiZSBzbWFsbGVyIG9yIGVxdWFsIHRvIFwibWF4XCIgdmFsdWUuXHJcbiAgICovXHJcbiAgQElucHV0KCkgdmFsdWUgPSAwO1xyXG5cclxuICAvKipcclxuICAgKiBIZWlnaHQgb2YgdGhlIHByb2dyZXNzIGJhci4gQWNjZXB0cyBhbnkgdmFsaWQgQ1NTIGhlaWdodCB2YWx1ZXMsIGV4LiAnMnJlbSdcclxuICAgKi9cclxuICBASW5wdXQoKSBoZWlnaHQ6IHN0cmluZztcclxuXHJcbiAgY29uc3RydWN0b3IoY29uZmlnOiBOZ2JQcm9ncmVzc2JhckNvbmZpZykge1xyXG4gICAgdGhpcy5tYXggPSBjb25maWcubWF4O1xyXG4gICAgdGhpcy5hbmltYXRlZCA9IGNvbmZpZy5hbmltYXRlZDtcclxuICAgIHRoaXMuc3RyaXBlZCA9IGNvbmZpZy5zdHJpcGVkO1xyXG4gICAgdGhpcy50eXBlID0gY29uZmlnLnR5cGU7XHJcbiAgICB0aGlzLnNob3dWYWx1ZSA9IGNvbmZpZy5zaG93VmFsdWU7XHJcbiAgICB0aGlzLmhlaWdodCA9IGNvbmZpZy5oZWlnaHQ7XHJcbiAgfVxyXG5cclxuICBnZXRWYWx1ZSgpIHsgcmV0dXJuIGdldFZhbHVlSW5SYW5nZSh0aGlzLnZhbHVlLCB0aGlzLm1heCk7IH1cclxuXHJcbiAgZ2V0UGVyY2VudFZhbHVlKCkgeyByZXR1cm4gMTAwICogdGhpcy5nZXRWYWx1ZSgpIC8gdGhpcy5tYXg7IH1cclxufVxyXG4iLCJpbXBvcnQge05nTW9kdWxlLCBNb2R1bGVXaXRoUHJvdmlkZXJzfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHtDb21tb25Nb2R1bGV9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XHJcblxyXG5pbXBvcnQge05nYlByb2dyZXNzYmFyfSBmcm9tICcuL3Byb2dyZXNzYmFyJztcclxuXHJcbmV4cG9ydCB7TmdiUHJvZ3Jlc3NiYXJ9IGZyb20gJy4vcHJvZ3Jlc3NiYXInO1xyXG5leHBvcnQge05nYlByb2dyZXNzYmFyQ29uZmlnfSBmcm9tICcuL3Byb2dyZXNzYmFyLWNvbmZpZyc7XHJcblxyXG5ATmdNb2R1bGUoe2RlY2xhcmF0aW9uczogW05nYlByb2dyZXNzYmFyXSwgZXhwb3J0czogW05nYlByb2dyZXNzYmFyXSwgaW1wb3J0czogW0NvbW1vbk1vZHVsZV19KVxyXG5leHBvcnQgY2xhc3MgTmdiUHJvZ3Jlc3NiYXJNb2R1bGUge1xyXG4gIC8qKlxyXG4gICAqIEltcG9ydGluZyB3aXRoICcuZm9yUm9vdCgpJyBpcyBubyBsb25nZXIgbmVjZXNzYXJ5LCB5b3UgY2FuIHNpbXBseSBpbXBvcnQgdGhlIG1vZHVsZS5cclxuICAgKiBXaWxsIGJlIHJlbW92ZWQgaW4gNC4wLjAuXHJcbiAgICpcclxuICAgKiBAZGVwcmVjYXRlZCAzLjAuMFxyXG4gICAqL1xyXG4gIHN0YXRpYyBmb3JSb290KCk6IE1vZHVsZVdpdGhQcm92aWRlcnMgeyByZXR1cm4ge25nTW9kdWxlOiBOZ2JQcm9ncmVzc2Jhck1vZHVsZX07IH1cclxufVxyXG4iLCJpbXBvcnQge0luamVjdGFibGV9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5cclxuLyoqXHJcbiAqIENvbmZpZ3VyYXRpb24gc2VydmljZSBmb3IgdGhlIE5nYlJhdGluZyBjb21wb25lbnQuXHJcbiAqIFlvdSBjYW4gaW5qZWN0IHRoaXMgc2VydmljZSwgdHlwaWNhbGx5IGluIHlvdXIgcm9vdCBjb21wb25lbnQsIGFuZCBjdXN0b21pemUgdGhlIHZhbHVlcyBvZiBpdHMgcHJvcGVydGllcyBpblxyXG4gKiBvcmRlciB0byBwcm92aWRlIGRlZmF1bHQgdmFsdWVzIGZvciBhbGwgdGhlIHJhdGluZ3MgdXNlZCBpbiB0aGUgYXBwbGljYXRpb24uXHJcbiAqL1xyXG5ASW5qZWN0YWJsZSh7cHJvdmlkZWRJbjogJ3Jvb3QnfSlcclxuZXhwb3J0IGNsYXNzIE5nYlJhdGluZ0NvbmZpZyB7XHJcbiAgbWF4ID0gMTA7XHJcbiAgcmVhZG9ubHkgPSBmYWxzZTtcclxuICByZXNldHRhYmxlID0gZmFsc2U7XHJcbn1cclxuIiwiaW1wb3J0IHtcclxuICBDb21wb25lbnQsXHJcbiAgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksXHJcbiAgSW5wdXQsXHJcbiAgT3V0cHV0LFxyXG4gIEV2ZW50RW1pdHRlcixcclxuICBPbkluaXQsXHJcbiAgVGVtcGxhdGVSZWYsXHJcbiAgT25DaGFuZ2VzLFxyXG4gIFNpbXBsZUNoYW5nZXMsXHJcbiAgQ29udGVudENoaWxkLFxyXG4gIGZvcndhcmRSZWYsXHJcbiAgQ2hhbmdlRGV0ZWN0b3JSZWZcclxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHtOZ2JSYXRpbmdDb25maWd9IGZyb20gJy4vcmF0aW5nLWNvbmZpZyc7XHJcbmltcG9ydCB7dG9TdHJpbmcsIGdldFZhbHVlSW5SYW5nZX0gZnJvbSAnLi4vdXRpbC91dGlsJztcclxuaW1wb3J0IHtLZXl9IGZyb20gJy4uL3V0aWwva2V5JztcclxuaW1wb3J0IHtDb250cm9sVmFsdWVBY2Nlc3NvciwgTkdfVkFMVUVfQUNDRVNTT1J9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcclxuXHJcbi8qKlxyXG4gKiBDb250ZXh0IGZvciB0aGUgY3VzdG9tIHN0YXIgZGlzcGxheSB0ZW1wbGF0ZVxyXG4gKi9cclxuZXhwb3J0IGludGVyZmFjZSBTdGFyVGVtcGxhdGVDb250ZXh0IHtcclxuICAvKipcclxuICAgKiBTdGFyIGZpbGwgcGVyY2VudGFnZS4gQW4gaW50ZWdlciB2YWx1ZSBiZXR3ZWVuIDAgYW5kIDEwMFxyXG4gICAqL1xyXG4gIGZpbGw6IG51bWJlcjtcclxuXHJcbiAgLyoqXHJcbiAgICogSW5kZXggb2YgdGhlIHN0YXIuXHJcbiAgICovXHJcbiAgaW5kZXg6IG51bWJlcjtcclxufVxyXG5cclxuY29uc3QgTkdCX1JBVElOR19WQUxVRV9BQ0NFU1NPUiA9IHtcclxuICBwcm92aWRlOiBOR19WQUxVRV9BQ0NFU1NPUixcclxuICB1c2VFeGlzdGluZzogZm9yd2FyZFJlZigoKSA9PiBOZ2JSYXRpbmcpLFxyXG4gIG11bHRpOiB0cnVlXHJcbn07XHJcblxyXG4vKipcclxuICogUmF0aW5nIGRpcmVjdGl2ZSB0aGF0IHdpbGwgdGFrZSBjYXJlIG9mIHZpc3VhbGlzaW5nIGEgc3RhciByYXRpbmcgYmFyLlxyXG4gKi9cclxuQENvbXBvbmVudCh7XHJcbiAgc2VsZWN0b3I6ICduZ2ItcmF0aW5nJyxcclxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaCxcclxuICBob3N0OiB7XHJcbiAgICAnY2xhc3MnOiAnZC1pbmxpbmUtZmxleCcsXHJcbiAgICAndGFiaW5kZXgnOiAnMCcsXHJcbiAgICAncm9sZSc6ICdzbGlkZXInLFxyXG4gICAgJ2FyaWEtdmFsdWVtaW4nOiAnMCcsXHJcbiAgICAnW2F0dHIuYXJpYS12YWx1ZW1heF0nOiAnbWF4JyxcclxuICAgICdbYXR0ci5hcmlhLXZhbHVlbm93XSc6ICduZXh0UmF0ZScsXHJcbiAgICAnW2F0dHIuYXJpYS12YWx1ZXRleHRdJzogJ2FyaWFWYWx1ZVRleHQoKScsXHJcbiAgICAnW2F0dHIuYXJpYS1kaXNhYmxlZF0nOiAncmVhZG9ubHkgPyB0cnVlIDogbnVsbCcsXHJcbiAgICAnKGJsdXIpJzogJ2hhbmRsZUJsdXIoKScsXHJcbiAgICAnKGtleWRvd24pJzogJ2hhbmRsZUtleURvd24oJGV2ZW50KScsXHJcbiAgICAnKG1vdXNlbGVhdmUpJzogJ3Jlc2V0KCknXHJcbiAgfSxcclxuICB0ZW1wbGF0ZTogYFxyXG4gICAgPG5nLXRlbXBsYXRlICN0IGxldC1maWxsPVwiZmlsbFwiPnt7IGZpbGwgPT09IDEwMCA/ICcmIzk3MzM7JyA6ICcmIzk3MzQ7JyB9fTwvbmctdGVtcGxhdGU+XHJcbiAgICA8bmctdGVtcGxhdGUgbmdGb3IgW25nRm9yT2ZdPVwiY29udGV4dHNcIiBsZXQtaW5kZXg9XCJpbmRleFwiPlxyXG4gICAgICA8c3BhbiBjbGFzcz1cInNyLW9ubHlcIj4oe3sgaW5kZXggPCBuZXh0UmF0ZSA/ICcqJyA6ICcgJyB9fSk8L3NwYW4+XHJcbiAgICAgIDxzcGFuIChtb3VzZWVudGVyKT1cImVudGVyKGluZGV4ICsgMSlcIiAoY2xpY2spPVwiaGFuZGxlQ2xpY2soaW5kZXggKyAxKVwiIFtzdHlsZS5jdXJzb3JdPVwicmVhZG9ubHkgfHwgZGlzYWJsZWQgPyAnZGVmYXVsdCcgOiAncG9pbnRlcidcIj5cclxuICAgICAgICA8bmctdGVtcGxhdGUgW25nVGVtcGxhdGVPdXRsZXRdPVwic3RhclRlbXBsYXRlIHx8IHRcIiBbbmdUZW1wbGF0ZU91dGxldENvbnRleHRdPVwiY29udGV4dHNbaW5kZXhdXCI+PC9uZy10ZW1wbGF0ZT5cclxuICAgICAgPC9zcGFuPlxyXG4gICAgPC9uZy10ZW1wbGF0ZT5cclxuICBgLFxyXG4gIHByb3ZpZGVyczogW05HQl9SQVRJTkdfVkFMVUVfQUNDRVNTT1JdXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBOZ2JSYXRpbmcgaW1wbGVtZW50cyBDb250cm9sVmFsdWVBY2Nlc3NvcixcclxuICAgIE9uSW5pdCwgT25DaGFuZ2VzIHtcclxuICBjb250ZXh0czogU3RhclRlbXBsYXRlQ29udGV4dFtdID0gW107XHJcbiAgZGlzYWJsZWQgPSBmYWxzZTtcclxuICBuZXh0UmF0ZTogbnVtYmVyO1xyXG5cclxuXHJcbiAgLyoqXHJcbiAgICogTWF4aW1hbCByYXRpbmcgdGhhdCBjYW4gYmUgZ2l2ZW4gdXNpbmcgdGhpcyB3aWRnZXQuXHJcbiAgICovXHJcbiAgQElucHV0KCkgbWF4OiBudW1iZXI7XHJcblxyXG4gIC8qKlxyXG4gICAqIEN1cnJlbnQgcmF0aW5nLiBDYW4gYmUgYSBkZWNpbWFsIHZhbHVlIGxpa2UgMy43NVxyXG4gICAqL1xyXG4gIEBJbnB1dCgpIHJhdGU6IG51bWJlcjtcclxuXHJcbiAgLyoqXHJcbiAgICogQSBmbGFnIGluZGljYXRpbmcgaWYgcmF0aW5nIGNhbiBiZSB1cGRhdGVkLlxyXG4gICAqL1xyXG4gIEBJbnB1dCgpIHJlYWRvbmx5OiBib29sZWFuO1xyXG5cclxuICAvKipcclxuICAgKiBBIGZsYWcgaW5kaWNhdGluZyBpZiByYXRpbmcgY2FuIGJlIHJlc2V0IHRvIDAgb24gbW91c2UgY2xpY2tcclxuICAgKi9cclxuICBASW5wdXQoKSByZXNldHRhYmxlOiBib29sZWFuO1xyXG5cclxuICAvKipcclxuICAgKiBBIHRlbXBsYXRlIHRvIG92ZXJyaWRlIHN0YXIgZGlzcGxheS5cclxuICAgKiBBbHRlcm5hdGl2ZWx5IHB1dCBhIDxuZy10ZW1wbGF0ZT4gYXMgdGhlIG9ubHkgY2hpbGQgb2YgPG5nYi1yYXRpbmc+IGVsZW1lbnRcclxuICAgKi9cclxuICBASW5wdXQoKSBAQ29udGVudENoaWxkKFRlbXBsYXRlUmVmKSBzdGFyVGVtcGxhdGU6IFRlbXBsYXRlUmVmPFN0YXJUZW1wbGF0ZUNvbnRleHQ+O1xyXG5cclxuICAvKipcclxuICAgKiBBbiBldmVudCBmaXJlZCB3aGVuIGEgdXNlciBpcyBob3ZlcmluZyBvdmVyIGEgZ2l2ZW4gcmF0aW5nLlxyXG4gICAqIEV2ZW50J3MgcGF5bG9hZCBlcXVhbHMgdG8gdGhlIHJhdGluZyBiZWluZyBob3ZlcmVkIG92ZXIuXHJcbiAgICovXHJcbiAgQE91dHB1dCgpIGhvdmVyID0gbmV3IEV2ZW50RW1pdHRlcjxudW1iZXI+KCk7XHJcblxyXG4gIC8qKlxyXG4gICAqIEFuIGV2ZW50IGZpcmVkIHdoZW4gYSB1c2VyIHN0b3BzIGhvdmVyaW5nIG92ZXIgYSBnaXZlbiByYXRpbmcuXHJcbiAgICogRXZlbnQncyBwYXlsb2FkIGVxdWFscyB0byB0aGUgcmF0aW5nIG9mIHRoZSBsYXN0IGl0ZW0gYmVpbmcgaG92ZXJlZCBvdmVyLlxyXG4gICAqL1xyXG4gIEBPdXRwdXQoKSBsZWF2ZSA9IG5ldyBFdmVudEVtaXR0ZXI8bnVtYmVyPigpO1xyXG5cclxuICAvKipcclxuICAgKiBBbiBldmVudCBmaXJlZCB3aGVuIGEgdXNlciBzZWxlY3RzIGEgbmV3IHJhdGluZy5cclxuICAgKiBFdmVudCdzIHBheWxvYWQgZXF1YWxzIHRvIHRoZSBuZXdseSBzZWxlY3RlZCByYXRpbmcuXHJcbiAgICovXHJcbiAgQE91dHB1dCgpIHJhdGVDaGFuZ2UgPSBuZXcgRXZlbnRFbWl0dGVyPG51bWJlcj4odHJ1ZSk7XHJcblxyXG4gIG9uQ2hhbmdlID0gKF86IGFueSkgPT4ge307XHJcbiAgb25Ub3VjaGVkID0gKCkgPT4ge307XHJcblxyXG4gIGNvbnN0cnVjdG9yKGNvbmZpZzogTmdiUmF0aW5nQ29uZmlnLCBwcml2YXRlIF9jaGFuZ2VEZXRlY3RvclJlZjogQ2hhbmdlRGV0ZWN0b3JSZWYpIHtcclxuICAgIHRoaXMubWF4ID0gY29uZmlnLm1heDtcclxuICAgIHRoaXMucmVhZG9ubHkgPSBjb25maWcucmVhZG9ubHk7XHJcbiAgfVxyXG5cclxuICBhcmlhVmFsdWVUZXh0KCkgeyByZXR1cm4gYCR7dGhpcy5uZXh0UmF0ZX0gb3V0IG9mICR7dGhpcy5tYXh9YDsgfVxyXG5cclxuICBlbnRlcih2YWx1ZTogbnVtYmVyKTogdm9pZCB7XHJcbiAgICBpZiAoIXRoaXMucmVhZG9ubHkgJiYgIXRoaXMuZGlzYWJsZWQpIHtcclxuICAgICAgdGhpcy5fdXBkYXRlU3RhdGUodmFsdWUpO1xyXG4gICAgfVxyXG4gICAgdGhpcy5ob3Zlci5lbWl0KHZhbHVlKTtcclxuICB9XHJcblxyXG4gIGhhbmRsZUJsdXIoKSB7IHRoaXMub25Ub3VjaGVkKCk7IH1cclxuXHJcbiAgaGFuZGxlQ2xpY2sodmFsdWU6IG51bWJlcikgeyB0aGlzLnVwZGF0ZSh0aGlzLnJlc2V0dGFibGUgJiYgdGhpcy5yYXRlID09PSB2YWx1ZSA/IDAgOiB2YWx1ZSk7IH1cclxuXHJcbiAgaGFuZGxlS2V5RG93bihldmVudDogS2V5Ym9hcmRFdmVudCkge1xyXG4gICAgaWYgKEtleVt0b1N0cmluZyhldmVudC53aGljaCldKSB7XHJcbiAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XHJcblxyXG4gICAgICBzd2l0Y2ggKGV2ZW50LndoaWNoKSB7XHJcbiAgICAgICAgY2FzZSBLZXkuQXJyb3dEb3duOlxyXG4gICAgICAgIGNhc2UgS2V5LkFycm93TGVmdDpcclxuICAgICAgICAgIHRoaXMudXBkYXRlKHRoaXMucmF0ZSAtIDEpO1xyXG4gICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgY2FzZSBLZXkuQXJyb3dVcDpcclxuICAgICAgICBjYXNlIEtleS5BcnJvd1JpZ2h0OlxyXG4gICAgICAgICAgdGhpcy51cGRhdGUodGhpcy5yYXRlICsgMSk7XHJcbiAgICAgICAgICBicmVhaztcclxuICAgICAgICBjYXNlIEtleS5Ib21lOlxyXG4gICAgICAgICAgdGhpcy51cGRhdGUoMCk7XHJcbiAgICAgICAgICBicmVhaztcclxuICAgICAgICBjYXNlIEtleS5FbmQ6XHJcbiAgICAgICAgICB0aGlzLnVwZGF0ZSh0aGlzLm1heCk7XHJcbiAgICAgICAgICBicmVhaztcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgbmdPbkNoYW5nZXMoY2hhbmdlczogU2ltcGxlQ2hhbmdlcykge1xyXG4gICAgaWYgKGNoYW5nZXNbJ3JhdGUnXSkge1xyXG4gICAgICB0aGlzLnVwZGF0ZSh0aGlzLnJhdGUpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgbmdPbkluaXQoKTogdm9pZCB7XHJcbiAgICB0aGlzLmNvbnRleHRzID0gQXJyYXkuZnJvbSh7bGVuZ3RoOiB0aGlzLm1heH0sICh2LCBrKSA9PiAoe2ZpbGw6IDAsIGluZGV4OiBrfSkpO1xyXG4gICAgdGhpcy5fdXBkYXRlU3RhdGUodGhpcy5yYXRlKTtcclxuICB9XHJcblxyXG4gIHJlZ2lzdGVyT25DaGFuZ2UoZm46ICh2YWx1ZTogYW55KSA9PiBhbnkpOiB2b2lkIHsgdGhpcy5vbkNoYW5nZSA9IGZuOyB9XHJcblxyXG4gIHJlZ2lzdGVyT25Ub3VjaGVkKGZuOiAoKSA9PiBhbnkpOiB2b2lkIHsgdGhpcy5vblRvdWNoZWQgPSBmbjsgfVxyXG5cclxuICByZXNldCgpOiB2b2lkIHtcclxuICAgIHRoaXMubGVhdmUuZW1pdCh0aGlzLm5leHRSYXRlKTtcclxuICAgIHRoaXMuX3VwZGF0ZVN0YXRlKHRoaXMucmF0ZSk7XHJcbiAgfVxyXG5cclxuICBzZXREaXNhYmxlZFN0YXRlKGlzRGlzYWJsZWQ6IGJvb2xlYW4pIHsgdGhpcy5kaXNhYmxlZCA9IGlzRGlzYWJsZWQ7IH1cclxuXHJcbiAgdXBkYXRlKHZhbHVlOiBudW1iZXIsIGludGVybmFsQ2hhbmdlID0gdHJ1ZSk6IHZvaWQge1xyXG4gICAgY29uc3QgbmV3UmF0ZSA9IGdldFZhbHVlSW5SYW5nZSh2YWx1ZSwgdGhpcy5tYXgsIDApO1xyXG4gICAgaWYgKCF0aGlzLnJlYWRvbmx5ICYmICF0aGlzLmRpc2FibGVkICYmIHRoaXMucmF0ZSAhPT0gbmV3UmF0ZSkge1xyXG4gICAgICB0aGlzLnJhdGUgPSBuZXdSYXRlO1xyXG4gICAgICB0aGlzLnJhdGVDaGFuZ2UuZW1pdCh0aGlzLnJhdGUpO1xyXG4gICAgfVxyXG4gICAgaWYgKGludGVybmFsQ2hhbmdlKSB7XHJcbiAgICAgIHRoaXMub25DaGFuZ2UodGhpcy5yYXRlKTtcclxuICAgICAgdGhpcy5vblRvdWNoZWQoKTtcclxuICAgIH1cclxuICAgIHRoaXMuX3VwZGF0ZVN0YXRlKHRoaXMucmF0ZSk7XHJcbiAgfVxyXG5cclxuICB3cml0ZVZhbHVlKHZhbHVlKSB7XHJcbiAgICB0aGlzLnVwZGF0ZSh2YWx1ZSwgZmFsc2UpO1xyXG4gICAgdGhpcy5fY2hhbmdlRGV0ZWN0b3JSZWYubWFya0ZvckNoZWNrKCk7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIF9nZXRGaWxsVmFsdWUoaW5kZXg6IG51bWJlcik6IG51bWJlciB7XHJcbiAgICBjb25zdCBkaWZmID0gdGhpcy5uZXh0UmF0ZSAtIGluZGV4O1xyXG5cclxuICAgIGlmIChkaWZmID49IDEpIHtcclxuICAgICAgcmV0dXJuIDEwMDtcclxuICAgIH1cclxuICAgIGlmIChkaWZmIDwgMSAmJiBkaWZmID4gMCkge1xyXG4gICAgICByZXR1cm4gTnVtYmVyLnBhcnNlSW50KChkaWZmICogMTAwKS50b0ZpeGVkKDIpKTtcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gMDtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgX3VwZGF0ZVN0YXRlKG5leHRWYWx1ZTogbnVtYmVyKSB7XHJcbiAgICB0aGlzLm5leHRSYXRlID0gbmV4dFZhbHVlO1xyXG4gICAgdGhpcy5jb250ZXh0cy5mb3JFYWNoKChjb250ZXh0LCBpbmRleCkgPT4gY29udGV4dC5maWxsID0gdGhpcy5fZ2V0RmlsbFZhbHVlKGluZGV4KSk7XHJcbiAgfVxyXG59XHJcbiIsImltcG9ydCB7TmdNb2R1bGUsIE1vZHVsZVdpdGhQcm92aWRlcnN9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQge0NvbW1vbk1vZHVsZX0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcclxuXHJcbmltcG9ydCB7TmdiUmF0aW5nfSBmcm9tICcuL3JhdGluZyc7XHJcblxyXG5leHBvcnQge05nYlJhdGluZ30gZnJvbSAnLi9yYXRpbmcnO1xyXG5leHBvcnQge05nYlJhdGluZ0NvbmZpZ30gZnJvbSAnLi9yYXRpbmctY29uZmlnJztcclxuXHJcbkBOZ01vZHVsZSh7ZGVjbGFyYXRpb25zOiBbTmdiUmF0aW5nXSwgZXhwb3J0czogW05nYlJhdGluZ10sIGltcG9ydHM6IFtDb21tb25Nb2R1bGVdfSlcclxuZXhwb3J0IGNsYXNzIE5nYlJhdGluZ01vZHVsZSB7XHJcbiAgLyoqXHJcbiAgICogSW1wb3J0aW5nIHdpdGggJy5mb3JSb290KCknIGlzIG5vIGxvbmdlciBuZWNlc3NhcnksIHlvdSBjYW4gc2ltcGx5IGltcG9ydCB0aGUgbW9kdWxlLlxyXG4gICAqIFdpbGwgYmUgcmVtb3ZlZCBpbiA0LjAuMC5cclxuICAgKlxyXG4gICAqIEBkZXByZWNhdGVkIDMuMC4wXHJcbiAgICovXHJcbiAgc3RhdGljIGZvclJvb3QoKTogTW9kdWxlV2l0aFByb3ZpZGVycyB7IHJldHVybiB7bmdNb2R1bGU6IE5nYlJhdGluZ01vZHVsZX07IH1cclxufVxyXG4iLCJpbXBvcnQge0luamVjdGFibGV9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5cclxuLyoqXHJcbiAqIENvbmZpZ3VyYXRpb24gc2VydmljZSBmb3IgdGhlIE5nYlRhYnNldCBjb21wb25lbnQuXHJcbiAqIFlvdSBjYW4gaW5qZWN0IHRoaXMgc2VydmljZSwgdHlwaWNhbGx5IGluIHlvdXIgcm9vdCBjb21wb25lbnQsIGFuZCBjdXN0b21pemUgdGhlIHZhbHVlcyBvZiBpdHMgcHJvcGVydGllcyBpblxyXG4gKiBvcmRlciB0byBwcm92aWRlIGRlZmF1bHQgdmFsdWVzIGZvciBhbGwgdGhlIHRhYnNldHMgdXNlZCBpbiB0aGUgYXBwbGljYXRpb24uXHJcbiAqL1xyXG5ASW5qZWN0YWJsZSh7cHJvdmlkZWRJbjogJ3Jvb3QnfSlcclxuZXhwb3J0IGNsYXNzIE5nYlRhYnNldENvbmZpZyB7XHJcbiAganVzdGlmeTogJ3N0YXJ0JyB8ICdjZW50ZXInIHwgJ2VuZCcgfCAnZmlsbCcgfCAnanVzdGlmaWVkJyA9ICdzdGFydCc7XHJcbiAgb3JpZW50YXRpb246ICdob3Jpem9udGFsJyB8ICd2ZXJ0aWNhbCcgPSAnaG9yaXpvbnRhbCc7XHJcbiAgdHlwZTogJ3RhYnMnIHwgJ3BpbGxzJyA9ICd0YWJzJztcclxufVxyXG4iLCJpbXBvcnQge1xyXG4gIENvbXBvbmVudCxcclxuICBJbnB1dCxcclxuICBDb250ZW50Q2hpbGRyZW4sXHJcbiAgUXVlcnlMaXN0LFxyXG4gIERpcmVjdGl2ZSxcclxuICBUZW1wbGF0ZVJlZixcclxuICBDb250ZW50Q2hpbGQsXHJcbiAgQWZ0ZXJDb250ZW50Q2hlY2tlZCxcclxuICBPdXRwdXQsXHJcbiAgRXZlbnRFbWl0dGVyXHJcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7TmdiVGFic2V0Q29uZmlnfSBmcm9tICcuL3RhYnNldC1jb25maWcnO1xyXG5cclxubGV0IG5leHRJZCA9IDA7XHJcblxyXG4vKipcclxuICogVGhpcyBkaXJlY3RpdmUgc2hvdWxkIGJlIHVzZWQgdG8gd3JhcCB0YWIgdGl0bGVzIHRoYXQgbmVlZCB0byBjb250YWluIEhUTUwgbWFya3VwIG9yIG90aGVyIGRpcmVjdGl2ZXMuXHJcbiAqL1xyXG5ARGlyZWN0aXZlKHtzZWxlY3RvcjogJ25nLXRlbXBsYXRlW25nYlRhYlRpdGxlXSd9KVxyXG5leHBvcnQgY2xhc3MgTmdiVGFiVGl0bGUge1xyXG4gIGNvbnN0cnVjdG9yKHB1YmxpYyB0ZW1wbGF0ZVJlZjogVGVtcGxhdGVSZWY8YW55Pikge31cclxufVxyXG5cclxuLyoqXHJcbiAqIFRoaXMgZGlyZWN0aXZlIG11c3QgYmUgdXNlZCB0byB3cmFwIGNvbnRlbnQgdG8gYmUgZGlzcGxheWVkIGluIGEgdGFiLlxyXG4gKi9cclxuQERpcmVjdGl2ZSh7c2VsZWN0b3I6ICduZy10ZW1wbGF0ZVtuZ2JUYWJDb250ZW50XSd9KVxyXG5leHBvcnQgY2xhc3MgTmdiVGFiQ29udGVudCB7XHJcbiAgY29uc3RydWN0b3IocHVibGljIHRlbXBsYXRlUmVmOiBUZW1wbGF0ZVJlZjxhbnk+KSB7fVxyXG59XHJcblxyXG4vKipcclxuICogQSBkaXJlY3RpdmUgcmVwcmVzZW50aW5nIGFuIGluZGl2aWR1YWwgdGFiLlxyXG4gKi9cclxuQERpcmVjdGl2ZSh7c2VsZWN0b3I6ICduZ2ItdGFiJ30pXHJcbmV4cG9ydCBjbGFzcyBOZ2JUYWIge1xyXG4gIC8qKlxyXG4gICAqIFVuaXF1ZSB0YWIgaWRlbnRpZmllci4gTXVzdCBiZSB1bmlxdWUgZm9yIHRoZSBlbnRpcmUgZG9jdW1lbnQgZm9yIHByb3BlciBhY2Nlc3NpYmlsaXR5IHN1cHBvcnQuXHJcbiAgICovXHJcbiAgQElucHV0KCkgaWQgPSBgbmdiLXRhYi0ke25leHRJZCsrfWA7XHJcbiAgLyoqXHJcbiAgICogU2ltcGxlIChzdHJpbmcgb25seSkgdGl0bGUuIFVzZSB0aGUgXCJOZ2JUYWJUaXRsZVwiIGRpcmVjdGl2ZSBmb3IgbW9yZSBjb21wbGV4IHVzZS1jYXNlcy5cclxuICAgKi9cclxuICBASW5wdXQoKSB0aXRsZTogc3RyaW5nO1xyXG4gIC8qKlxyXG4gICAqIEFsbG93cyB0b2dnbGluZyBkaXNhYmxlZCBzdGF0ZSBvZiBhIGdpdmVuIHN0YXRlLiBEaXNhYmxlZCB0YWJzIGNhbid0IGJlIHNlbGVjdGVkLlxyXG4gICAqL1xyXG4gIEBJbnB1dCgpIGRpc2FibGVkID0gZmFsc2U7XHJcblxyXG4gIHRpdGxlVHBsOiBOZ2JUYWJUaXRsZSB8IG51bGw7XHJcbiAgY29udGVudFRwbDogTmdiVGFiQ29udGVudCB8IG51bGw7XHJcblxyXG4gIEBDb250ZW50Q2hpbGRyZW4oTmdiVGFiVGl0bGUsIHtkZXNjZW5kYW50czogZmFsc2V9KSB0aXRsZVRwbHM6IFF1ZXJ5TGlzdDxOZ2JUYWJUaXRsZT47XHJcbiAgQENvbnRlbnRDaGlsZHJlbihOZ2JUYWJDb250ZW50LCB7ZGVzY2VuZGFudHM6IGZhbHNlfSkgY29udGVudFRwbHM6IFF1ZXJ5TGlzdDxOZ2JUYWJDb250ZW50PjtcclxuXHJcbiAgbmdBZnRlckNvbnRlbnRDaGVja2VkKCkge1xyXG4gICAgLy8gV2UgYXJlIHVzaW5nIEBDb250ZW50Q2hpbGRyZW4gaW5zdGVhZCBvZiBAQ29udGVudENoaWxkIGFzIGluIHRoZSBBbmd1bGFyIHZlcnNpb24gYmVpbmcgdXNlZFxyXG4gICAgLy8gb25seSBAQ29udGVudENoaWxkcmVuIGFsbG93cyB1cyB0byBzcGVjaWZ5IHRoZSB7ZGVzY2VuZGFudHM6IGZhbHNlfSBvcHRpb24uXHJcbiAgICAvLyBXaXRob3V0IHtkZXNjZW5kYW50czogZmFsc2V9IHdlIGFyZSBoaXR0aW5nIGJ1Z3MgZGVzY3JpYmVkIGluOlxyXG4gICAgLy8gaHR0cHM6Ly9naXRodWIuY29tL25nLWJvb3RzdHJhcC9uZy1ib290c3RyYXAvaXNzdWVzLzIyNDBcclxuICAgIHRoaXMudGl0bGVUcGwgPSB0aGlzLnRpdGxlVHBscy5maXJzdDtcclxuICAgIHRoaXMuY29udGVudFRwbCA9IHRoaXMuY29udGVudFRwbHMuZmlyc3Q7XHJcbiAgfVxyXG59XHJcblxyXG4vKipcclxuICogVGhlIHBheWxvYWQgb2YgdGhlIGNoYW5nZSBldmVudCBmaXJlZCByaWdodCBiZWZvcmUgdGhlIHRhYiBjaGFuZ2VcclxuICovXHJcbmV4cG9ydCBpbnRlcmZhY2UgTmdiVGFiQ2hhbmdlRXZlbnQge1xyXG4gIC8qKlxyXG4gICAqIElkIG9mIHRoZSBjdXJyZW50bHkgYWN0aXZlIHRhYlxyXG4gICAqL1xyXG4gIGFjdGl2ZUlkOiBzdHJpbmc7XHJcblxyXG4gIC8qKlxyXG4gICAqIElkIG9mIHRoZSBuZXdseSBzZWxlY3RlZCB0YWJcclxuICAgKi9cclxuICBuZXh0SWQ6IHN0cmluZztcclxuXHJcbiAgLyoqXHJcbiAgICogRnVuY3Rpb24gdGhhdCB3aWxsIHByZXZlbnQgdGFiIHN3aXRjaCBpZiBjYWxsZWRcclxuICAgKi9cclxuICBwcmV2ZW50RGVmYXVsdDogKCkgPT4gdm9pZDtcclxufVxyXG5cclxuLyoqXHJcbiAqIEEgY29tcG9uZW50IHRoYXQgbWFrZXMgaXQgZWFzeSB0byBjcmVhdGUgdGFiYmVkIGludGVyZmFjZS5cclxuICovXHJcbkBDb21wb25lbnQoe1xyXG4gIHNlbGVjdG9yOiAnbmdiLXRhYnNldCcsXHJcbiAgZXhwb3J0QXM6ICduZ2JUYWJzZXQnLFxyXG4gIHRlbXBsYXRlOiBgXHJcbiAgICA8dWwgW2NsYXNzXT1cIiduYXYgbmF2LScgKyB0eXBlICsgKG9yaWVudGF0aW9uID09ICdob3Jpem9udGFsJz8gICcgJyArIGp1c3RpZnlDbGFzcyA6ICcgZmxleC1jb2x1bW4nKVwiIHJvbGU9XCJ0YWJsaXN0XCI+XHJcbiAgICAgIDxsaSBjbGFzcz1cIm5hdi1pdGVtXCIgKm5nRm9yPVwibGV0IHRhYiBvZiB0YWJzXCI+XHJcbiAgICAgICAgPGEgW2lkXT1cInRhYi5pZFwiIGNsYXNzPVwibmF2LWxpbmtcIiBbY2xhc3MuYWN0aXZlXT1cInRhYi5pZCA9PT0gYWN0aXZlSWRcIiBbY2xhc3MuZGlzYWJsZWRdPVwidGFiLmRpc2FibGVkXCJcclxuICAgICAgICAgIGhyZWYgKGNsaWNrKT1cIiEhc2VsZWN0KHRhYi5pZClcIiByb2xlPVwidGFiXCIgW2F0dHIudGFiaW5kZXhdPVwiKHRhYi5kaXNhYmxlZCA/ICctMSc6IHVuZGVmaW5lZClcIlxyXG4gICAgICAgICAgW2F0dHIuYXJpYS1jb250cm9sc109XCIoIWRlc3Ryb3lPbkhpZGUgfHwgdGFiLmlkID09PSBhY3RpdmVJZCA/IHRhYi5pZCArICctcGFuZWwnIDogbnVsbClcIlxyXG4gICAgICAgICAgW2F0dHIuYXJpYS1leHBhbmRlZF09XCJ0YWIuaWQgPT09IGFjdGl2ZUlkXCIgW2F0dHIuYXJpYS1kaXNhYmxlZF09XCJ0YWIuZGlzYWJsZWRcIj5cclxuICAgICAgICAgIHt7dGFiLnRpdGxlfX08bmctdGVtcGxhdGUgW25nVGVtcGxhdGVPdXRsZXRdPVwidGFiLnRpdGxlVHBsPy50ZW1wbGF0ZVJlZlwiPjwvbmctdGVtcGxhdGU+XHJcbiAgICAgICAgPC9hPlxyXG4gICAgICA8L2xpPlxyXG4gICAgPC91bD5cclxuICAgIDxkaXYgY2xhc3M9XCJ0YWItY29udGVudFwiPlxyXG4gICAgICA8bmctdGVtcGxhdGUgbmdGb3IgbGV0LXRhYiBbbmdGb3JPZl09XCJ0YWJzXCI+XHJcbiAgICAgICAgPGRpdlxyXG4gICAgICAgICAgY2xhc3M9XCJ0YWItcGFuZSB7e3RhYi5pZCA9PT0gYWN0aXZlSWQgPyAnYWN0aXZlJyA6IG51bGx9fVwiXHJcbiAgICAgICAgICAqbmdJZj1cIiFkZXN0cm95T25IaWRlIHx8IHRhYi5pZCA9PT0gYWN0aXZlSWRcIlxyXG4gICAgICAgICAgcm9sZT1cInRhYnBhbmVsXCJcclxuICAgICAgICAgIFthdHRyLmFyaWEtbGFiZWxsZWRieV09XCJ0YWIuaWRcIiBpZD1cInt7dGFiLmlkfX0tcGFuZWxcIlxyXG4gICAgICAgICAgW2F0dHIuYXJpYS1leHBhbmRlZF09XCJ0YWIuaWQgPT09IGFjdGl2ZUlkXCI+XHJcbiAgICAgICAgICA8bmctdGVtcGxhdGUgW25nVGVtcGxhdGVPdXRsZXRdPVwidGFiLmNvbnRlbnRUcGw/LnRlbXBsYXRlUmVmXCI+PC9uZy10ZW1wbGF0ZT5cclxuICAgICAgICA8L2Rpdj5cclxuICAgICAgPC9uZy10ZW1wbGF0ZT5cclxuICAgIDwvZGl2PlxyXG4gIGBcclxufSlcclxuZXhwb3J0IGNsYXNzIE5nYlRhYnNldCBpbXBsZW1lbnRzIEFmdGVyQ29udGVudENoZWNrZWQge1xyXG4gIGp1c3RpZnlDbGFzczogc3RyaW5nO1xyXG5cclxuICBAQ29udGVudENoaWxkcmVuKE5nYlRhYikgdGFiczogUXVlcnlMaXN0PE5nYlRhYj47XHJcblxyXG4gIC8qKlxyXG4gICAqIEFuIGlkZW50aWZpZXIgb2YgYW4gaW5pdGlhbGx5IHNlbGVjdGVkIChhY3RpdmUpIHRhYi4gVXNlIHRoZSBcInNlbGVjdFwiIG1ldGhvZCB0byBzd2l0Y2ggYSB0YWIgcHJvZ3JhbW1hdGljYWxseS5cclxuICAgKi9cclxuICBASW5wdXQoKSBhY3RpdmVJZDogc3RyaW5nO1xyXG5cclxuICAvKipcclxuICAgKiBXaGV0aGVyIHRoZSBjbG9zZWQgdGFicyBzaG91bGQgYmUgaGlkZGVuIHdpdGhvdXQgZGVzdHJveWluZyB0aGVtXHJcbiAgICovXHJcbiAgQElucHV0KCkgZGVzdHJveU9uSGlkZSA9IHRydWU7XHJcblxyXG4gIC8qKlxyXG4gICAqIFRoZSBob3Jpem9udGFsIGFsaWdubWVudCBvZiB0aGUgbmF2IHdpdGggZmxleGJveCB1dGlsaXRpZXMuIENhbiBiZSBvbmUgb2YgJ3N0YXJ0JywgJ2NlbnRlcicsICdlbmQnLCAnZmlsbCcgb3JcclxuICAgKiAnanVzdGlmaWVkJ1xyXG4gICAqIFRoZSBkZWZhdWx0IHZhbHVlIGlzICdzdGFydCcuXHJcbiAgICovXHJcbiAgQElucHV0KClcclxuICBzZXQganVzdGlmeShjbGFzc05hbWU6ICdzdGFydCcgfCAnY2VudGVyJyB8ICdlbmQnIHwgJ2ZpbGwnIHwgJ2p1c3RpZmllZCcpIHtcclxuICAgIGlmIChjbGFzc05hbWUgPT09ICdmaWxsJyB8fCBjbGFzc05hbWUgPT09ICdqdXN0aWZpZWQnKSB7XHJcbiAgICAgIHRoaXMuanVzdGlmeUNsYXNzID0gYG5hdi0ke2NsYXNzTmFtZX1gO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdGhpcy5qdXN0aWZ5Q2xhc3MgPSBganVzdGlmeS1jb250ZW50LSR7Y2xhc3NOYW1lfWA7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBUaGUgb3JpZW50YXRpb24gb2YgdGhlIG5hdiAoaG9yaXpvbnRhbCBvciB2ZXJ0aWNhbCkuXHJcbiAgICogVGhlIGRlZmF1bHQgdmFsdWUgaXMgJ2hvcml6b250YWwnLlxyXG4gICAqL1xyXG4gIEBJbnB1dCgpIG9yaWVudGF0aW9uOiAnaG9yaXpvbnRhbCcgfCAndmVydGljYWwnO1xyXG5cclxuICAvKipcclxuICAgKiBUeXBlIG9mIG5hdmlnYXRpb24gdG8gYmUgdXNlZCBmb3IgdGFicy4gQ2FuIGJlIG9uZSBvZiBCb290c3RyYXAgZGVmaW5lZCB0eXBlcyAoJ3RhYnMnIG9yICdwaWxscycpLlxyXG4gICAqIFNpbmNlIDMuMC4wIGNhbiBhbHNvIGJlIGFuIGFyYml0cmFyeSBzdHJpbmcgKGZvciBjdXN0b20gdGhlbWVzKS5cclxuICAgKi9cclxuICBASW5wdXQoKSB0eXBlOiAndGFicycgfCAncGlsbHMnIHwgc3RyaW5nO1xyXG5cclxuICAvKipcclxuICAgKiBBIHRhYiBjaGFuZ2UgZXZlbnQgZmlyZWQgcmlnaHQgYmVmb3JlIHRoZSB0YWIgc2VsZWN0aW9uIGhhcHBlbnMuIFNlZSBOZ2JUYWJDaGFuZ2VFdmVudCBmb3IgcGF5bG9hZCBkZXRhaWxzXHJcbiAgICovXHJcbiAgQE91dHB1dCgpIHRhYkNoYW5nZSA9IG5ldyBFdmVudEVtaXR0ZXI8TmdiVGFiQ2hhbmdlRXZlbnQ+KCk7XHJcblxyXG4gIGNvbnN0cnVjdG9yKGNvbmZpZzogTmdiVGFic2V0Q29uZmlnKSB7XHJcbiAgICB0aGlzLnR5cGUgPSBjb25maWcudHlwZTtcclxuICAgIHRoaXMuanVzdGlmeSA9IGNvbmZpZy5qdXN0aWZ5O1xyXG4gICAgdGhpcy5vcmllbnRhdGlvbiA9IGNvbmZpZy5vcmllbnRhdGlvbjtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFNlbGVjdHMgdGhlIHRhYiB3aXRoIHRoZSBnaXZlbiBpZCBhbmQgc2hvd3MgaXRzIGFzc29jaWF0ZWQgcGFuZS5cclxuICAgKiBBbnkgb3RoZXIgdGFiIHRoYXQgd2FzIHByZXZpb3VzbHkgc2VsZWN0ZWQgYmVjb21lcyB1bnNlbGVjdGVkIGFuZCBpdHMgYXNzb2NpYXRlZCBwYW5lIGlzIGhpZGRlbi5cclxuICAgKi9cclxuICBzZWxlY3QodGFiSWQ6IHN0cmluZykge1xyXG4gICAgbGV0IHNlbGVjdGVkVGFiID0gdGhpcy5fZ2V0VGFiQnlJZCh0YWJJZCk7XHJcbiAgICBpZiAoc2VsZWN0ZWRUYWIgJiYgIXNlbGVjdGVkVGFiLmRpc2FibGVkICYmIHRoaXMuYWN0aXZlSWQgIT09IHNlbGVjdGVkVGFiLmlkKSB7XHJcbiAgICAgIGxldCBkZWZhdWx0UHJldmVudGVkID0gZmFsc2U7XHJcblxyXG4gICAgICB0aGlzLnRhYkNoYW5nZS5lbWl0KFxyXG4gICAgICAgICAge2FjdGl2ZUlkOiB0aGlzLmFjdGl2ZUlkLCBuZXh0SWQ6IHNlbGVjdGVkVGFiLmlkLCBwcmV2ZW50RGVmYXVsdDogKCkgPT4geyBkZWZhdWx0UHJldmVudGVkID0gdHJ1ZTsgfX0pO1xyXG5cclxuICAgICAgaWYgKCFkZWZhdWx0UHJldmVudGVkKSB7XHJcbiAgICAgICAgdGhpcy5hY3RpdmVJZCA9IHNlbGVjdGVkVGFiLmlkO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBuZ0FmdGVyQ29udGVudENoZWNrZWQoKSB7XHJcbiAgICAvLyBhdXRvLWNvcnJlY3QgYWN0aXZlSWQgdGhhdCBtaWdodCBoYXZlIGJlZW4gc2V0IGluY29ycmVjdGx5IGFzIGlucHV0XHJcbiAgICBsZXQgYWN0aXZlVGFiID0gdGhpcy5fZ2V0VGFiQnlJZCh0aGlzLmFjdGl2ZUlkKTtcclxuICAgIHRoaXMuYWN0aXZlSWQgPSBhY3RpdmVUYWIgPyBhY3RpdmVUYWIuaWQgOiAodGhpcy50YWJzLmxlbmd0aCA/IHRoaXMudGFicy5maXJzdC5pZCA6IG51bGwpO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBfZ2V0VGFiQnlJZChpZDogc3RyaW5nKTogTmdiVGFiIHtcclxuICAgIGxldCB0YWJzV2l0aElkOiBOZ2JUYWJbXSA9IHRoaXMudGFicy5maWx0ZXIodGFiID0+IHRhYi5pZCA9PT0gaWQpO1xyXG4gICAgcmV0dXJuIHRhYnNXaXRoSWQubGVuZ3RoID8gdGFic1dpdGhJZFswXSA6IG51bGw7XHJcbiAgfVxyXG59XHJcbiIsImltcG9ydCB7TmdNb2R1bGUsIE1vZHVsZVdpdGhQcm92aWRlcnN9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQge0NvbW1vbk1vZHVsZX0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcclxuXHJcbmltcG9ydCB7TmdiVGFic2V0LCBOZ2JUYWIsIE5nYlRhYkNvbnRlbnQsIE5nYlRhYlRpdGxlfSBmcm9tICcuL3RhYnNldCc7XHJcblxyXG5leHBvcnQge05nYlRhYnNldCwgTmdiVGFiLCBOZ2JUYWJDb250ZW50LCBOZ2JUYWJUaXRsZSwgTmdiVGFiQ2hhbmdlRXZlbnR9IGZyb20gJy4vdGFic2V0JztcclxuZXhwb3J0IHtOZ2JUYWJzZXRDb25maWd9IGZyb20gJy4vdGFic2V0LWNvbmZpZyc7XHJcblxyXG5jb25zdCBOR0JfVEFCU0VUX0RJUkVDVElWRVMgPSBbTmdiVGFic2V0LCBOZ2JUYWIsIE5nYlRhYkNvbnRlbnQsIE5nYlRhYlRpdGxlXTtcclxuXHJcbkBOZ01vZHVsZSh7ZGVjbGFyYXRpb25zOiBOR0JfVEFCU0VUX0RJUkVDVElWRVMsIGV4cG9ydHM6IE5HQl9UQUJTRVRfRElSRUNUSVZFUywgaW1wb3J0czogW0NvbW1vbk1vZHVsZV19KVxyXG5leHBvcnQgY2xhc3MgTmdiVGFic2V0TW9kdWxlIHtcclxuICAvKipcclxuICAgKiBJbXBvcnRpbmcgd2l0aCAnLmZvclJvb3QoKScgaXMgbm8gbG9uZ2VyIG5lY2Vzc2FyeSwgeW91IGNhbiBzaW1wbHkgaW1wb3J0IHRoZSBtb2R1bGUuXHJcbiAgICogV2lsbCBiZSByZW1vdmVkIGluIDQuMC4wLlxyXG4gICAqXHJcbiAgICogQGRlcHJlY2F0ZWQgMy4wLjBcclxuICAgKi9cclxuICBzdGF0aWMgZm9yUm9vdCgpOiBNb2R1bGVXaXRoUHJvdmlkZXJzIHsgcmV0dXJuIHtuZ01vZHVsZTogTmdiVGFic2V0TW9kdWxlfTsgfVxyXG59XHJcbiIsImltcG9ydCB7aXNOdW1iZXIsIHRvSW50ZWdlcn0gZnJvbSAnLi4vdXRpbC91dGlsJztcclxuXHJcbmV4cG9ydCBjbGFzcyBOZ2JUaW1lIHtcclxuICBob3VyOiBudW1iZXI7XHJcbiAgbWludXRlOiBudW1iZXI7XHJcbiAgc2Vjb25kOiBudW1iZXI7XHJcblxyXG4gIGNvbnN0cnVjdG9yKGhvdXI/OiBudW1iZXIsIG1pbnV0ZT86IG51bWJlciwgc2Vjb25kPzogbnVtYmVyKSB7XHJcbiAgICB0aGlzLmhvdXIgPSB0b0ludGVnZXIoaG91cik7XHJcbiAgICB0aGlzLm1pbnV0ZSA9IHRvSW50ZWdlcihtaW51dGUpO1xyXG4gICAgdGhpcy5zZWNvbmQgPSB0b0ludGVnZXIoc2Vjb25kKTtcclxuICB9XHJcblxyXG4gIGNoYW5nZUhvdXIoc3RlcCA9IDEpIHsgdGhpcy51cGRhdGVIb3VyKChpc05hTih0aGlzLmhvdXIpID8gMCA6IHRoaXMuaG91cikgKyBzdGVwKTsgfVxyXG5cclxuICB1cGRhdGVIb3VyKGhvdXI6IG51bWJlcikge1xyXG4gICAgaWYgKGlzTnVtYmVyKGhvdXIpKSB7XHJcbiAgICAgIHRoaXMuaG91ciA9IChob3VyIDwgMCA/IDI0ICsgaG91ciA6IGhvdXIpICUgMjQ7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB0aGlzLmhvdXIgPSBOYU47XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBjaGFuZ2VNaW51dGUoc3RlcCA9IDEpIHsgdGhpcy51cGRhdGVNaW51dGUoKGlzTmFOKHRoaXMubWludXRlKSA/IDAgOiB0aGlzLm1pbnV0ZSkgKyBzdGVwKTsgfVxyXG5cclxuICB1cGRhdGVNaW51dGUobWludXRlOiBudW1iZXIpIHtcclxuICAgIGlmIChpc051bWJlcihtaW51dGUpKSB7XHJcbiAgICAgIHRoaXMubWludXRlID0gbWludXRlICUgNjAgPCAwID8gNjAgKyBtaW51dGUgJSA2MCA6IG1pbnV0ZSAlIDYwO1xyXG4gICAgICB0aGlzLmNoYW5nZUhvdXIoTWF0aC5mbG9vcihtaW51dGUgLyA2MCkpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdGhpcy5taW51dGUgPSBOYU47XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBjaGFuZ2VTZWNvbmQoc3RlcCA9IDEpIHsgdGhpcy51cGRhdGVTZWNvbmQoKGlzTmFOKHRoaXMuc2Vjb25kKSA/IDAgOiB0aGlzLnNlY29uZCkgKyBzdGVwKTsgfVxyXG5cclxuICB1cGRhdGVTZWNvbmQoc2Vjb25kOiBudW1iZXIpIHtcclxuICAgIGlmIChpc051bWJlcihzZWNvbmQpKSB7XHJcbiAgICAgIHRoaXMuc2Vjb25kID0gc2Vjb25kIDwgMCA/IDYwICsgc2Vjb25kICUgNjAgOiBzZWNvbmQgJSA2MDtcclxuICAgICAgdGhpcy5jaGFuZ2VNaW51dGUoTWF0aC5mbG9vcihzZWNvbmQgLyA2MCkpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdGhpcy5zZWNvbmQgPSBOYU47XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBpc1ZhbGlkKGNoZWNrU2VjcyA9IHRydWUpIHtcclxuICAgIHJldHVybiBpc051bWJlcih0aGlzLmhvdXIpICYmIGlzTnVtYmVyKHRoaXMubWludXRlKSAmJiAoY2hlY2tTZWNzID8gaXNOdW1iZXIodGhpcy5zZWNvbmQpIDogdHJ1ZSk7XHJcbiAgfVxyXG5cclxuICB0b1N0cmluZygpIHsgcmV0dXJuIGAke3RoaXMuaG91ciB8fCAwfToke3RoaXMubWludXRlIHx8IDB9OiR7dGhpcy5zZWNvbmQgfHwgMH1gOyB9XHJcbn1cclxuIiwiaW1wb3J0IHtJbmplY3RhYmxlfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuXHJcbi8qKlxyXG4gKiBDb25maWd1cmF0aW9uIHNlcnZpY2UgZm9yIHRoZSBOZ2JUaW1lcGlja2VyIGNvbXBvbmVudC5cclxuICogWW91IGNhbiBpbmplY3QgdGhpcyBzZXJ2aWNlLCB0eXBpY2FsbHkgaW4geW91ciByb290IGNvbXBvbmVudCwgYW5kIGN1c3RvbWl6ZSB0aGUgdmFsdWVzIG9mIGl0cyBwcm9wZXJ0aWVzIGluXHJcbiAqIG9yZGVyIHRvIHByb3ZpZGUgZGVmYXVsdCB2YWx1ZXMgZm9yIGFsbCB0aGUgdGltZXBpY2tlcnMgdXNlZCBpbiB0aGUgYXBwbGljYXRpb24uXHJcbiAqL1xyXG5ASW5qZWN0YWJsZSh7cHJvdmlkZWRJbjogJ3Jvb3QnfSlcclxuZXhwb3J0IGNsYXNzIE5nYlRpbWVwaWNrZXJDb25maWcge1xyXG4gIG1lcmlkaWFuID0gZmFsc2U7XHJcbiAgc3Bpbm5lcnMgPSB0cnVlO1xyXG4gIHNlY29uZHMgPSBmYWxzZTtcclxuICBob3VyU3RlcCA9IDE7XHJcbiAgbWludXRlU3RlcCA9IDE7XHJcbiAgc2Vjb25kU3RlcCA9IDE7XHJcbiAgZGlzYWJsZWQgPSBmYWxzZTtcclxuICByZWFkb25seUlucHV0cyA9IGZhbHNlO1xyXG4gIHNpemU6ICdzbWFsbCcgfCAnbWVkaXVtJyB8ICdsYXJnZScgPSAnbWVkaXVtJztcclxufVxyXG4iLCJpbXBvcnQge0luamVjdGFibGV9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQge05nYlRpbWVTdHJ1Y3R9IGZyb20gJy4vbmdiLXRpbWUtc3RydWN0JztcclxuaW1wb3J0IHtpc0ludGVnZXJ9IGZyb20gJy4uL3V0aWwvdXRpbCc7XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gTkdCX0RBVEVQSUNLRVJfVElNRV9BREFQVEVSX0ZBQ1RPUlkoKSB7XHJcbiAgcmV0dXJuIG5ldyBOZ2JUaW1lU3RydWN0QWRhcHRlcigpO1xyXG59XHJcblxyXG4vKipcclxuICogQWJzdHJhY3QgdHlwZSBzZXJ2aW5nIGFzIGEgREkgdG9rZW4gZm9yIHRoZSBzZXJ2aWNlIGNvbnZlcnRpbmcgZnJvbSB5b3VyIGFwcGxpY2F0aW9uIFRpbWUgbW9kZWwgdG8gaW50ZXJuYWxcclxuICogTmdiVGltZVN0cnVjdCBtb2RlbC5cclxuICogQSBkZWZhdWx0IGltcGxlbWVudGF0aW9uIGNvbnZlcnRpbmcgZnJvbSBhbmQgdG8gTmdiVGltZVN0cnVjdCBpcyBwcm92aWRlZCBmb3IgcmV0cm8tY29tcGF0aWJpbGl0eSxcclxuICogYnV0IHlvdSBjYW4gcHJvdmlkZSBhbm90aGVyIGltcGxlbWVudGF0aW9uIHRvIHVzZSBhbiBhbHRlcm5hdGl2ZSBmb3JtYXQsIGllIGZvciB1c2luZyB3aXRoIG5hdGl2ZSBEYXRlIE9iamVjdC5cclxuICpcclxuICogQHNpbmNlIDIuMi4wXHJcbiAqL1xyXG5ASW5qZWN0YWJsZSh7cHJvdmlkZWRJbjogJ3Jvb3QnLCB1c2VGYWN0b3J5OiBOR0JfREFURVBJQ0tFUl9USU1FX0FEQVBURVJfRkFDVE9SWX0pXHJcbmV4cG9ydCBhYnN0cmFjdCBjbGFzcyBOZ2JUaW1lQWRhcHRlcjxUPiB7XHJcbiAgLyoqXHJcbiAgICogQ29udmVydHMgdXNlci1tb2RlbCBkYXRlIGludG8gYW4gTmdiVGltZVN0cnVjdCBmb3IgaW50ZXJuYWwgdXNlIGluIHRoZSBsaWJyYXJ5XHJcbiAgICovXHJcbiAgYWJzdHJhY3QgZnJvbU1vZGVsKHZhbHVlOiBUKTogTmdiVGltZVN0cnVjdDtcclxuXHJcbiAgLyoqXHJcbiAgICogQ29udmVydHMgaW50ZXJuYWwgdGltZSB2YWx1ZSBOZ2JUaW1lU3RydWN0IHRvIHVzZXItbW9kZWwgZGF0ZVxyXG4gICAqIFRoZSByZXR1cm5lZCB0eXBlIGlzIHN1cHBvc2VkIHRvIGJlIG9mIHRoZSBzYW1lIHR5cGUgYXMgZnJvbU1vZGVsKCkgaW5wdXQtdmFsdWUgcGFyYW1cclxuICAgKi9cclxuICBhYnN0cmFjdCB0b01vZGVsKHRpbWU6IE5nYlRpbWVTdHJ1Y3QpOiBUO1xyXG59XHJcblxyXG5ASW5qZWN0YWJsZSgpXHJcbmV4cG9ydCBjbGFzcyBOZ2JUaW1lU3RydWN0QWRhcHRlciBleHRlbmRzIE5nYlRpbWVBZGFwdGVyPE5nYlRpbWVTdHJ1Y3Q+IHtcclxuICAvKipcclxuICAgKiBDb252ZXJ0cyBhIE5nYlRpbWVTdHJ1Y3QgdmFsdWUgaW50byBOZ2JUaW1lU3RydWN0IHZhbHVlXHJcbiAgICovXHJcbiAgZnJvbU1vZGVsKHRpbWU6IE5nYlRpbWVTdHJ1Y3QpOiBOZ2JUaW1lU3RydWN0IHtcclxuICAgIHJldHVybiAodGltZSAmJiBpc0ludGVnZXIodGltZS5ob3VyKSAmJiBpc0ludGVnZXIodGltZS5taW51dGUpKSA/XHJcbiAgICAgICAge2hvdXI6IHRpbWUuaG91ciwgbWludXRlOiB0aW1lLm1pbnV0ZSwgc2Vjb25kOiBpc0ludGVnZXIodGltZS5zZWNvbmQpID8gdGltZS5zZWNvbmQgOiBudWxsfSA6XHJcbiAgICAgICAgbnVsbDtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIENvbnZlcnRzIGEgTmdiVGltZVN0cnVjdCB2YWx1ZSBpbnRvIE5nYlRpbWVTdHJ1Y3QgdmFsdWVcclxuICAgKi9cclxuICB0b01vZGVsKHRpbWU6IE5nYlRpbWVTdHJ1Y3QpOiBOZ2JUaW1lU3RydWN0IHtcclxuICAgIHJldHVybiAodGltZSAmJiBpc0ludGVnZXIodGltZS5ob3VyKSAmJiBpc0ludGVnZXIodGltZS5taW51dGUpKSA/XHJcbiAgICAgICAge2hvdXI6IHRpbWUuaG91ciwgbWludXRlOiB0aW1lLm1pbnV0ZSwgc2Vjb25kOiBpc0ludGVnZXIodGltZS5zZWNvbmQpID8gdGltZS5zZWNvbmQgOiBudWxsfSA6XHJcbiAgICAgICAgbnVsbDtcclxuICB9XHJcbn1cclxuIiwiaW1wb3J0IHtDb21wb25lbnQsIGZvcndhcmRSZWYsIElucHV0LCBPbkNoYW5nZXMsIFNpbXBsZUNoYW5nZXN9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQge0NvbnRyb2xWYWx1ZUFjY2Vzc29yLCBOR19WQUxVRV9BQ0NFU1NPUn0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xyXG5cclxuaW1wb3J0IHtpc051bWJlciwgcGFkTnVtYmVyLCB0b0ludGVnZXJ9IGZyb20gJy4uL3V0aWwvdXRpbCc7XHJcbmltcG9ydCB7TmdiVGltZX0gZnJvbSAnLi9uZ2ItdGltZSc7XHJcbmltcG9ydCB7TmdiVGltZXBpY2tlckNvbmZpZ30gZnJvbSAnLi90aW1lcGlja2VyLWNvbmZpZyc7XHJcbmltcG9ydCB7TmdiVGltZUFkYXB0ZXJ9IGZyb20gJy4vbmdiLXRpbWUtYWRhcHRlcic7XHJcblxyXG5jb25zdCBOR0JfVElNRVBJQ0tFUl9WQUxVRV9BQ0NFU1NPUiA9IHtcclxuICBwcm92aWRlOiBOR19WQUxVRV9BQ0NFU1NPUixcclxuICB1c2VFeGlzdGluZzogZm9yd2FyZFJlZigoKSA9PiBOZ2JUaW1lcGlja2VyKSxcclxuICBtdWx0aTogdHJ1ZVxyXG59O1xyXG5cclxuLyoqXHJcbiAqIEEgbGlnaHR3ZWlnaHQgJiBjb25maWd1cmFibGUgdGltZXBpY2tlciBkaXJlY3RpdmUuXHJcbiAqL1xyXG5AQ29tcG9uZW50KHtcclxuICBzZWxlY3RvcjogJ25nYi10aW1lcGlja2VyJyxcclxuICBzdHlsZXM6IFtgXHJcblxyXG4gICAgOmhvc3Qge1xyXG4gICAgICBmb250LXNpemU6IDFyZW07XHJcbiAgICB9XHJcblxyXG4gICAgLm5nYi10cCB7XHJcbiAgICAgIGRpc3BsYXk6IC1tcy1mbGV4Ym94O1xyXG4gICAgICBkaXNwbGF5OiBmbGV4O1xyXG4gICAgICAtbXMtZmxleC1hbGlnbjogY2VudGVyO1xyXG4gICAgICBhbGlnbi1pdGVtczogY2VudGVyO1xyXG4gICAgfVxyXG5cclxuICAgIC5uZ2ItdHAtaW5wdXQtY29udGFpbmVyIHtcclxuICAgICAgd2lkdGg6IDRlbTtcclxuICAgIH1cclxuXHJcbiAgICAubmdiLXRwLWhvdXIsIC5uZ2ItdHAtbWludXRlLCAubmdiLXRwLXNlY29uZCwgLm5nYi10cC1tZXJpZGlhbiB7XHJcbiAgICAgIGRpc3BsYXk6IC1tcy1mbGV4Ym94O1xyXG4gICAgICBkaXNwbGF5OiBmbGV4O1xyXG4gICAgICAtbXMtZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcclxuICAgICAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcclxuICAgICAgLW1zLWZsZXgtYWxpZ246IGNlbnRlcjtcclxuICAgICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcclxuICAgICAgLW1zLWZsZXgtcGFjazogZGlzdHJpYnV0ZTtcclxuICAgICAganVzdGlmeS1jb250ZW50OiBzcGFjZS1hcm91bmQ7XHJcbiAgICB9XHJcblxyXG4gICAgLm5nYi10cC1zcGFjZXIge1xyXG4gICAgICB3aWR0aDogMWVtO1xyXG4gICAgICB0ZXh0LWFsaWduOiBjZW50ZXI7XHJcbiAgICB9XHJcblxyXG4gICAgLmNoZXZyb246OmJlZm9yZSB7XHJcbiAgICAgIGJvcmRlci1zdHlsZTogc29saWQ7XHJcbiAgICAgIGJvcmRlci13aWR0aDogMC4yOWVtIDAuMjllbSAwIDA7XHJcbiAgICAgIGNvbnRlbnQ6ICcnO1xyXG4gICAgICBkaXNwbGF5OiBpbmxpbmUtYmxvY2s7XHJcbiAgICAgIGhlaWdodDogMC42OWVtO1xyXG4gICAgICBsZWZ0OiAwLjA1ZW07XHJcbiAgICAgIHBvc2l0aW9uOiByZWxhdGl2ZTtcclxuICAgICAgdG9wOiAwLjE1ZW07XHJcbiAgICAgIHRyYW5zZm9ybTogcm90YXRlKC00NWRlZyk7XHJcbiAgICAgIC13ZWJraXQtdHJhbnNmb3JtOiByb3RhdGUoLTQ1ZGVnKTtcclxuICAgICAgLW1zLXRyYW5zZm9ybTogcm90YXRlKC00NWRlZyk7XHJcbiAgICAgIHZlcnRpY2FsLWFsaWduOiBtaWRkbGU7XHJcbiAgICAgIHdpZHRoOiAwLjcxZW07XHJcbiAgICB9XHJcblxyXG4gICAgLmNoZXZyb24uYm90dG9tOmJlZm9yZSB7XHJcbiAgICAgIHRvcDogLS4zZW07XHJcbiAgICAgIC13ZWJraXQtdHJhbnNmb3JtOiByb3RhdGUoMTM1ZGVnKTtcclxuICAgICAgLW1zLXRyYW5zZm9ybTogcm90YXRlKDEzNWRlZyk7XHJcbiAgICAgIHRyYW5zZm9ybTogcm90YXRlKDEzNWRlZyk7XHJcbiAgICB9XHJcblxyXG4gICAgaW5wdXQge1xyXG4gICAgICB0ZXh0LWFsaWduOiBjZW50ZXI7XHJcbiAgICB9XHJcbiAgYF0sXHJcbiAgdGVtcGxhdGU6IGBcclxuICAgIDxmaWVsZHNldCBbZGlzYWJsZWRdPVwiZGlzYWJsZWRcIiBbY2xhc3MuZGlzYWJsZWRdPVwiZGlzYWJsZWRcIj5cclxuICAgICAgPGRpdiBjbGFzcz1cIm5nYi10cFwiPlxyXG4gICAgICAgIDxkaXYgY2xhc3M9XCJuZ2ItdHAtaW5wdXQtY29udGFpbmVyIG5nYi10cC1ob3VyXCI+XHJcbiAgICAgICAgICA8YnV0dG9uICpuZ0lmPVwic3Bpbm5lcnNcIiB0eXBlPVwiYnV0dG9uXCIgKGNsaWNrKT1cImNoYW5nZUhvdXIoaG91clN0ZXApXCJcclxuICAgICAgICAgICAgY2xhc3M9XCJidG4gYnRuLWxpbmtcIiBbY2xhc3MuYnRuLXNtXT1cImlzU21hbGxTaXplXCIgW2NsYXNzLmJ0bi1sZ109XCJpc0xhcmdlU2l6ZVwiIFtjbGFzcy5kaXNhYmxlZF09XCJkaXNhYmxlZFwiXHJcbiAgICAgICAgICAgIFtkaXNhYmxlZF09XCJkaXNhYmxlZFwiPlxyXG4gICAgICAgICAgICA8c3BhbiBjbGFzcz1cImNoZXZyb25cIj48L3NwYW4+XHJcbiAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwic3Itb25seVwiIGkxOG49XCJAQG5nYi50aW1lcGlja2VyLmluY3JlbWVudC1ob3Vyc1wiPkluY3JlbWVudCBob3Vyczwvc3Bhbj5cclxuICAgICAgICAgIDwvYnV0dG9uPlxyXG4gICAgICAgICAgPGlucHV0IHR5cGU9XCJ0ZXh0XCIgY2xhc3M9XCJmb3JtLWNvbnRyb2xcIiBbY2xhc3MuZm9ybS1jb250cm9sLXNtXT1cImlzU21hbGxTaXplXCIgW2NsYXNzLmZvcm0tY29udHJvbC1sZ109XCJpc0xhcmdlU2l6ZVwiIG1heGxlbmd0aD1cIjJcIlxyXG4gICAgICAgICAgICBwbGFjZWhvbGRlcj1cIkhIXCIgaTE4bi1wbGFjZWhvbGRlcj1cIkBAbmdiLnRpbWVwaWNrZXIuSEhcIlxyXG4gICAgICAgICAgICBbdmFsdWVdPVwiZm9ybWF0SG91cihtb2RlbD8uaG91cilcIiAoY2hhbmdlKT1cInVwZGF0ZUhvdXIoJGV2ZW50LnRhcmdldC52YWx1ZSlcIlxyXG4gICAgICAgICAgICBbcmVhZG9ubHldPVwicmVhZG9ubHlJbnB1dHNcIiBbZGlzYWJsZWRdPVwiZGlzYWJsZWRcIiBhcmlhLWxhYmVsPVwiSG91cnNcIiBpMThuLWFyaWEtbGFiZWw9XCJAQG5nYi50aW1lcGlja2VyLmhvdXJzXCI+XHJcbiAgICAgICAgICA8YnV0dG9uICpuZ0lmPVwic3Bpbm5lcnNcIiB0eXBlPVwiYnV0dG9uXCIgKGNsaWNrKT1cImNoYW5nZUhvdXIoLWhvdXJTdGVwKVwiXHJcbiAgICAgICAgICAgIGNsYXNzPVwiYnRuIGJ0bi1saW5rXCIgW2NsYXNzLmJ0bi1zbV09XCJpc1NtYWxsU2l6ZVwiIFtjbGFzcy5idG4tbGddPVwiaXNMYXJnZVNpemVcIiBbY2xhc3MuZGlzYWJsZWRdPVwiZGlzYWJsZWRcIlxyXG4gICAgICAgICAgICBbZGlzYWJsZWRdPVwiZGlzYWJsZWRcIj5cclxuICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJjaGV2cm9uIGJvdHRvbVwiPjwvc3Bhbj5cclxuICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJzci1vbmx5XCIgaTE4bj1cIkBAbmdiLnRpbWVwaWNrZXIuZGVjcmVtZW50LWhvdXJzXCI+RGVjcmVtZW50IGhvdXJzPC9zcGFuPlxyXG4gICAgICAgICAgPC9idXR0b24+XHJcbiAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgPGRpdiBjbGFzcz1cIm5nYi10cC1zcGFjZXJcIj46PC9kaXY+XHJcbiAgICAgICAgPGRpdiBjbGFzcz1cIm5nYi10cC1pbnB1dC1jb250YWluZXIgbmdiLXRwLW1pbnV0ZVwiPlxyXG4gICAgICAgICAgPGJ1dHRvbiAqbmdJZj1cInNwaW5uZXJzXCIgdHlwZT1cImJ1dHRvblwiIChjbGljayk9XCJjaGFuZ2VNaW51dGUobWludXRlU3RlcClcIlxyXG4gICAgICAgICAgICBjbGFzcz1cImJ0biBidG4tbGlua1wiIFtjbGFzcy5idG4tc21dPVwiaXNTbWFsbFNpemVcIiBbY2xhc3MuYnRuLWxnXT1cImlzTGFyZ2VTaXplXCIgW2NsYXNzLmRpc2FibGVkXT1cImRpc2FibGVkXCJcclxuICAgICAgICAgICAgW2Rpc2FibGVkXT1cImRpc2FibGVkXCI+XHJcbiAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwiY2hldnJvblwiPjwvc3Bhbj5cclxuICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJzci1vbmx5XCIgaTE4bj1cIkBAbmdiLnRpbWVwaWNrZXIuaW5jcmVtZW50LW1pbnV0ZXNcIj5JbmNyZW1lbnQgbWludXRlczwvc3Bhbj5cclxuICAgICAgICAgIDwvYnV0dG9uPlxyXG4gICAgICAgICAgPGlucHV0IHR5cGU9XCJ0ZXh0XCIgY2xhc3M9XCJmb3JtLWNvbnRyb2xcIiBbY2xhc3MuZm9ybS1jb250cm9sLXNtXT1cImlzU21hbGxTaXplXCIgW2NsYXNzLmZvcm0tY29udHJvbC1sZ109XCJpc0xhcmdlU2l6ZVwiIG1heGxlbmd0aD1cIjJcIlxyXG4gICAgICAgICAgICBwbGFjZWhvbGRlcj1cIk1NXCIgaTE4bi1wbGFjZWhvbGRlcj1cIkBAbmdiLnRpbWVwaWNrZXIuTU1cIlxyXG4gICAgICAgICAgICBbdmFsdWVdPVwiZm9ybWF0TWluU2VjKG1vZGVsPy5taW51dGUpXCIgKGNoYW5nZSk9XCJ1cGRhdGVNaW51dGUoJGV2ZW50LnRhcmdldC52YWx1ZSlcIlxyXG4gICAgICAgICAgICBbcmVhZG9ubHldPVwicmVhZG9ubHlJbnB1dHNcIiBbZGlzYWJsZWRdPVwiZGlzYWJsZWRcIiBhcmlhLWxhYmVsPVwiTWludXRlc1wiIGkxOG4tYXJpYS1sYWJlbD1cIkBAbmdiLnRpbWVwaWNrZXIubWludXRlc1wiPlxyXG4gICAgICAgICAgPGJ1dHRvbiAqbmdJZj1cInNwaW5uZXJzXCIgdHlwZT1cImJ1dHRvblwiIChjbGljayk9XCJjaGFuZ2VNaW51dGUoLW1pbnV0ZVN0ZXApXCJcclxuICAgICAgICAgICAgY2xhc3M9XCJidG4gYnRuLWxpbmtcIiBbY2xhc3MuYnRuLXNtXT1cImlzU21hbGxTaXplXCIgW2NsYXNzLmJ0bi1sZ109XCJpc0xhcmdlU2l6ZVwiICBbY2xhc3MuZGlzYWJsZWRdPVwiZGlzYWJsZWRcIlxyXG4gICAgICAgICAgICBbZGlzYWJsZWRdPVwiZGlzYWJsZWRcIj5cclxuICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJjaGV2cm9uIGJvdHRvbVwiPjwvc3Bhbj5cclxuICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJzci1vbmx5XCIgIGkxOG49XCJAQG5nYi50aW1lcGlja2VyLmRlY3JlbWVudC1taW51dGVzXCI+RGVjcmVtZW50IG1pbnV0ZXM8L3NwYW4+XHJcbiAgICAgICAgICA8L2J1dHRvbj5cclxuICAgICAgICA8L2Rpdj5cclxuICAgICAgICA8ZGl2ICpuZ0lmPVwic2Vjb25kc1wiIGNsYXNzPVwibmdiLXRwLXNwYWNlclwiPjo8L2Rpdj5cclxuICAgICAgICA8ZGl2ICpuZ0lmPVwic2Vjb25kc1wiIGNsYXNzPVwibmdiLXRwLWlucHV0LWNvbnRhaW5lciBuZ2ItdHAtc2Vjb25kXCI+XHJcbiAgICAgICAgICA8YnV0dG9uICpuZ0lmPVwic3Bpbm5lcnNcIiB0eXBlPVwiYnV0dG9uXCIgKGNsaWNrKT1cImNoYW5nZVNlY29uZChzZWNvbmRTdGVwKVwiXHJcbiAgICAgICAgICAgIGNsYXNzPVwiYnRuIGJ0bi1saW5rXCIgW2NsYXNzLmJ0bi1zbV09XCJpc1NtYWxsU2l6ZVwiIFtjbGFzcy5idG4tbGddPVwiaXNMYXJnZVNpemVcIiBbY2xhc3MuZGlzYWJsZWRdPVwiZGlzYWJsZWRcIlxyXG4gICAgICAgICAgICBbZGlzYWJsZWRdPVwiZGlzYWJsZWRcIj5cclxuICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJjaGV2cm9uXCI+PC9zcGFuPlxyXG4gICAgICAgICAgICA8c3BhbiBjbGFzcz1cInNyLW9ubHlcIiBpMThuPVwiQEBuZ2IudGltZXBpY2tlci5pbmNyZW1lbnQtc2Vjb25kc1wiPkluY3JlbWVudCBzZWNvbmRzPC9zcGFuPlxyXG4gICAgICAgICAgPC9idXR0b24+XHJcbiAgICAgICAgICA8aW5wdXQgdHlwZT1cInRleHRcIiBjbGFzcz1cImZvcm0tY29udHJvbFwiIFtjbGFzcy5mb3JtLWNvbnRyb2wtc21dPVwiaXNTbWFsbFNpemVcIiBbY2xhc3MuZm9ybS1jb250cm9sLWxnXT1cImlzTGFyZ2VTaXplXCIgbWF4bGVuZ3RoPVwiMlwiXHJcbiAgICAgICAgICAgIHBsYWNlaG9sZGVyPVwiU1NcIiBpMThuLXBsYWNlaG9sZGVyPVwiQEBuZ2IudGltZXBpY2tlci5TU1wiXHJcbiAgICAgICAgICAgIFt2YWx1ZV09XCJmb3JtYXRNaW5TZWMobW9kZWw/LnNlY29uZClcIiAoY2hhbmdlKT1cInVwZGF0ZVNlY29uZCgkZXZlbnQudGFyZ2V0LnZhbHVlKVwiXHJcbiAgICAgICAgICAgIFtyZWFkb25seV09XCJyZWFkb25seUlucHV0c1wiIFtkaXNhYmxlZF09XCJkaXNhYmxlZFwiIGFyaWEtbGFiZWw9XCJTZWNvbmRzXCIgaTE4bi1hcmlhLWxhYmVsPVwiQEBuZ2IudGltZXBpY2tlci5zZWNvbmRzXCI+XHJcbiAgICAgICAgICA8YnV0dG9uICpuZ0lmPVwic3Bpbm5lcnNcIiB0eXBlPVwiYnV0dG9uXCIgKGNsaWNrKT1cImNoYW5nZVNlY29uZCgtc2Vjb25kU3RlcClcIlxyXG4gICAgICAgICAgICBjbGFzcz1cImJ0biBidG4tbGlua1wiIFtjbGFzcy5idG4tc21dPVwiaXNTbWFsbFNpemVcIiBbY2xhc3MuYnRuLWxnXT1cImlzTGFyZ2VTaXplXCIgIFtjbGFzcy5kaXNhYmxlZF09XCJkaXNhYmxlZFwiXHJcbiAgICAgICAgICAgIFtkaXNhYmxlZF09XCJkaXNhYmxlZFwiPlxyXG4gICAgICAgICAgICA8c3BhbiBjbGFzcz1cImNoZXZyb24gYm90dG9tXCI+PC9zcGFuPlxyXG4gICAgICAgICAgICA8c3BhbiBjbGFzcz1cInNyLW9ubHlcIiBpMThuPVwiQEBuZ2IudGltZXBpY2tlci5kZWNyZW1lbnQtc2Vjb25kc1wiPkRlY3JlbWVudCBzZWNvbmRzPC9zcGFuPlxyXG4gICAgICAgICAgPC9idXR0b24+XHJcbiAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgPGRpdiAqbmdJZj1cIm1lcmlkaWFuXCIgY2xhc3M9XCJuZ2ItdHAtc3BhY2VyXCI+PC9kaXY+XHJcbiAgICAgICAgPGRpdiAqbmdJZj1cIm1lcmlkaWFuXCIgY2xhc3M9XCJuZ2ItdHAtbWVyaWRpYW5cIj5cclxuICAgICAgICAgIDxidXR0b24gdHlwZT1cImJ1dHRvblwiIGNsYXNzPVwiYnRuIGJ0bi1vdXRsaW5lLXByaW1hcnlcIiBbY2xhc3MuYnRuLXNtXT1cImlzU21hbGxTaXplXCIgW2NsYXNzLmJ0bi1sZ109XCJpc0xhcmdlU2l6ZVwiXHJcbiAgICAgICAgICAgIFtkaXNhYmxlZF09XCJkaXNhYmxlZFwiIFtjbGFzcy5kaXNhYmxlZF09XCJkaXNhYmxlZFwiXHJcbiAgICAgICAgICAgICAgICAgIChjbGljayk9XCJ0b2dnbGVNZXJpZGlhbigpXCI+XHJcbiAgICAgICAgICAgIDxuZy1jb250YWluZXIgKm5nSWY9XCJtb2RlbD8uaG91ciA+PSAxMjsgZWxzZSBhbVwiIGkxOG49XCJAQG5nYi50aW1lcGlja2VyLlBNXCI+UE08L25nLWNvbnRhaW5lcj5cclxuICAgICAgICAgICAgPG5nLXRlbXBsYXRlICNhbSBpMThuPVwiQEBuZ2IudGltZXBpY2tlci5BTVwiPkFNPC9uZy10ZW1wbGF0ZT5cclxuICAgICAgICAgIDwvYnV0dG9uPlxyXG4gICAgICAgIDwvZGl2PlxyXG4gICAgICA8L2Rpdj5cclxuICAgIDwvZmllbGRzZXQ+XHJcbiAgYCxcclxuICBwcm92aWRlcnM6IFtOR0JfVElNRVBJQ0tFUl9WQUxVRV9BQ0NFU1NPUl1cclxufSlcclxuZXhwb3J0IGNsYXNzIE5nYlRpbWVwaWNrZXIgaW1wbGVtZW50cyBDb250cm9sVmFsdWVBY2Nlc3NvcixcclxuICAgIE9uQ2hhbmdlcyB7XHJcbiAgZGlzYWJsZWQ6IGJvb2xlYW47XHJcbiAgbW9kZWw6IE5nYlRpbWU7XHJcblxyXG4gIC8qKlxyXG4gICAqIFdoZXRoZXIgdG8gZGlzcGxheSAxMkggb3IgMjRIIG1vZGUuXHJcbiAgICovXHJcbiAgQElucHV0KCkgbWVyaWRpYW46IGJvb2xlYW47XHJcblxyXG4gIC8qKlxyXG4gICAqIFdoZXRoZXIgdG8gZGlzcGxheSB0aGUgc3Bpbm5lcnMgYWJvdmUgYW5kIGJlbG93IHRoZSBpbnB1dHMuXHJcbiAgICovXHJcbiAgQElucHV0KCkgc3Bpbm5lcnM6IGJvb2xlYW47XHJcblxyXG4gIC8qKlxyXG4gICAqIFdoZXRoZXIgdG8gZGlzcGxheSBzZWNvbmRzIGlucHV0LlxyXG4gICAqL1xyXG4gIEBJbnB1dCgpIHNlY29uZHM6IGJvb2xlYW47XHJcblxyXG4gIC8qKlxyXG4gICAqIE51bWJlciBvZiBob3VycyB0byBpbmNyZWFzZSBvciBkZWNyZWFzZSB3aGVuIHVzaW5nIGEgYnV0dG9uLlxyXG4gICAqL1xyXG4gIEBJbnB1dCgpIGhvdXJTdGVwOiBudW1iZXI7XHJcblxyXG4gIC8qKlxyXG4gICAqIE51bWJlciBvZiBtaW51dGVzIHRvIGluY3JlYXNlIG9yIGRlY3JlYXNlIHdoZW4gdXNpbmcgYSBidXR0b24uXHJcbiAgICovXHJcbiAgQElucHV0KCkgbWludXRlU3RlcDogbnVtYmVyO1xyXG5cclxuICAvKipcclxuICAgKiBOdW1iZXIgb2Ygc2Vjb25kcyB0byBpbmNyZWFzZSBvciBkZWNyZWFzZSB3aGVuIHVzaW5nIGEgYnV0dG9uLlxyXG4gICAqL1xyXG4gIEBJbnB1dCgpIHNlY29uZFN0ZXA6IG51bWJlcjtcclxuXHJcbiAgLyoqXHJcbiAgICogVG8gbWFrZSB0aW1lcGlja2VyIHJlYWRvbmx5XHJcbiAgICovXHJcbiAgQElucHV0KCkgcmVhZG9ubHlJbnB1dHM6IGJvb2xlYW47XHJcblxyXG4gIC8qKlxyXG4gICAqIFRvIHNldCB0aGUgc2l6ZSBvZiB0aGUgaW5wdXRzIGFuZCBidXR0b25cclxuICAgKi9cclxuICBASW5wdXQoKSBzaXplOiAnc21hbGwnIHwgJ21lZGl1bScgfCAnbGFyZ2UnO1xyXG5cclxuICBjb25zdHJ1Y3Rvcihjb25maWc6IE5nYlRpbWVwaWNrZXJDb25maWcsIHByaXZhdGUgX25nYlRpbWVBZGFwdGVyOiBOZ2JUaW1lQWRhcHRlcjxhbnk+KSB7XHJcbiAgICB0aGlzLm1lcmlkaWFuID0gY29uZmlnLm1lcmlkaWFuO1xyXG4gICAgdGhpcy5zcGlubmVycyA9IGNvbmZpZy5zcGlubmVycztcclxuICAgIHRoaXMuc2Vjb25kcyA9IGNvbmZpZy5zZWNvbmRzO1xyXG4gICAgdGhpcy5ob3VyU3RlcCA9IGNvbmZpZy5ob3VyU3RlcDtcclxuICAgIHRoaXMubWludXRlU3RlcCA9IGNvbmZpZy5taW51dGVTdGVwO1xyXG4gICAgdGhpcy5zZWNvbmRTdGVwID0gY29uZmlnLnNlY29uZFN0ZXA7XHJcbiAgICB0aGlzLmRpc2FibGVkID0gY29uZmlnLmRpc2FibGVkO1xyXG4gICAgdGhpcy5yZWFkb25seUlucHV0cyA9IGNvbmZpZy5yZWFkb25seUlucHV0cztcclxuICAgIHRoaXMuc2l6ZSA9IGNvbmZpZy5zaXplO1xyXG4gIH1cclxuXHJcbiAgb25DaGFuZ2UgPSAoXzogYW55KSA9PiB7fTtcclxuICBvblRvdWNoZWQgPSAoKSA9PiB7fTtcclxuXHJcbiAgd3JpdGVWYWx1ZSh2YWx1ZSkge1xyXG4gICAgY29uc3Qgc3RydWN0VmFsdWUgPSB0aGlzLl9uZ2JUaW1lQWRhcHRlci5mcm9tTW9kZWwodmFsdWUpO1xyXG4gICAgdGhpcy5tb2RlbCA9IHN0cnVjdFZhbHVlID8gbmV3IE5nYlRpbWUoc3RydWN0VmFsdWUuaG91ciwgc3RydWN0VmFsdWUubWludXRlLCBzdHJ1Y3RWYWx1ZS5zZWNvbmQpIDogbmV3IE5nYlRpbWUoKTtcclxuICAgIGlmICghdGhpcy5zZWNvbmRzICYmICghc3RydWN0VmFsdWUgfHwgIWlzTnVtYmVyKHN0cnVjdFZhbHVlLnNlY29uZCkpKSB7XHJcbiAgICAgIHRoaXMubW9kZWwuc2Vjb25kID0gMDtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHJlZ2lzdGVyT25DaGFuZ2UoZm46ICh2YWx1ZTogYW55KSA9PiBhbnkpOiB2b2lkIHsgdGhpcy5vbkNoYW5nZSA9IGZuOyB9XHJcblxyXG4gIHJlZ2lzdGVyT25Ub3VjaGVkKGZuOiAoKSA9PiBhbnkpOiB2b2lkIHsgdGhpcy5vblRvdWNoZWQgPSBmbjsgfVxyXG5cclxuICBzZXREaXNhYmxlZFN0YXRlKGlzRGlzYWJsZWQ6IGJvb2xlYW4pIHsgdGhpcy5kaXNhYmxlZCA9IGlzRGlzYWJsZWQ7IH1cclxuXHJcbiAgY2hhbmdlSG91cihzdGVwOiBudW1iZXIpIHtcclxuICAgIHRoaXMubW9kZWwuY2hhbmdlSG91cihzdGVwKTtcclxuICAgIHRoaXMucHJvcGFnYXRlTW9kZWxDaGFuZ2UoKTtcclxuICB9XHJcblxyXG4gIGNoYW5nZU1pbnV0ZShzdGVwOiBudW1iZXIpIHtcclxuICAgIHRoaXMubW9kZWwuY2hhbmdlTWludXRlKHN0ZXApO1xyXG4gICAgdGhpcy5wcm9wYWdhdGVNb2RlbENoYW5nZSgpO1xyXG4gIH1cclxuXHJcbiAgY2hhbmdlU2Vjb25kKHN0ZXA6IG51bWJlcikge1xyXG4gICAgdGhpcy5tb2RlbC5jaGFuZ2VTZWNvbmQoc3RlcCk7XHJcbiAgICB0aGlzLnByb3BhZ2F0ZU1vZGVsQ2hhbmdlKCk7XHJcbiAgfVxyXG5cclxuICB1cGRhdGVIb3VyKG5ld1ZhbDogc3RyaW5nKSB7XHJcbiAgICBjb25zdCBpc1BNID0gdGhpcy5tb2RlbC5ob3VyID49IDEyO1xyXG4gICAgY29uc3QgZW50ZXJlZEhvdXIgPSB0b0ludGVnZXIobmV3VmFsKTtcclxuICAgIGlmICh0aGlzLm1lcmlkaWFuICYmIChpc1BNICYmIGVudGVyZWRIb3VyIDwgMTIgfHwgIWlzUE0gJiYgZW50ZXJlZEhvdXIgPT09IDEyKSkge1xyXG4gICAgICB0aGlzLm1vZGVsLnVwZGF0ZUhvdXIoZW50ZXJlZEhvdXIgKyAxMik7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB0aGlzLm1vZGVsLnVwZGF0ZUhvdXIoZW50ZXJlZEhvdXIpO1xyXG4gICAgfVxyXG4gICAgdGhpcy5wcm9wYWdhdGVNb2RlbENoYW5nZSgpO1xyXG4gIH1cclxuXHJcbiAgdXBkYXRlTWludXRlKG5ld1ZhbDogc3RyaW5nKSB7XHJcbiAgICB0aGlzLm1vZGVsLnVwZGF0ZU1pbnV0ZSh0b0ludGVnZXIobmV3VmFsKSk7XHJcbiAgICB0aGlzLnByb3BhZ2F0ZU1vZGVsQ2hhbmdlKCk7XHJcbiAgfVxyXG5cclxuICB1cGRhdGVTZWNvbmQobmV3VmFsOiBzdHJpbmcpIHtcclxuICAgIHRoaXMubW9kZWwudXBkYXRlU2Vjb25kKHRvSW50ZWdlcihuZXdWYWwpKTtcclxuICAgIHRoaXMucHJvcGFnYXRlTW9kZWxDaGFuZ2UoKTtcclxuICB9XHJcblxyXG4gIHRvZ2dsZU1lcmlkaWFuKCkge1xyXG4gICAgaWYgKHRoaXMubWVyaWRpYW4pIHtcclxuICAgICAgdGhpcy5jaGFuZ2VIb3VyKDEyKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIGZvcm1hdEhvdXIodmFsdWU6IG51bWJlcikge1xyXG4gICAgaWYgKGlzTnVtYmVyKHZhbHVlKSkge1xyXG4gICAgICBpZiAodGhpcy5tZXJpZGlhbikge1xyXG4gICAgICAgIHJldHVybiBwYWROdW1iZXIodmFsdWUgJSAxMiA9PT0gMCA/IDEyIDogdmFsdWUgJSAxMik7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgcmV0dXJuIHBhZE51bWJlcih2YWx1ZSAlIDI0KTtcclxuICAgICAgfVxyXG4gICAgfSBlbHNlIHtcclxuICAgICAgcmV0dXJuIHBhZE51bWJlcihOYU4pO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgZm9ybWF0TWluU2VjKHZhbHVlOiBudW1iZXIpIHsgcmV0dXJuIHBhZE51bWJlcih2YWx1ZSk7IH1cclxuXHJcbiAgZ2V0IGlzU21hbGxTaXplKCk6IGJvb2xlYW4geyByZXR1cm4gdGhpcy5zaXplID09PSAnc21hbGwnOyB9XHJcblxyXG4gIGdldCBpc0xhcmdlU2l6ZSgpOiBib29sZWFuIHsgcmV0dXJuIHRoaXMuc2l6ZSA9PT0gJ2xhcmdlJzsgfVxyXG5cclxuICBuZ09uQ2hhbmdlcyhjaGFuZ2VzOiBTaW1wbGVDaGFuZ2VzKTogdm9pZCB7XHJcbiAgICBpZiAoY2hhbmdlc1snc2Vjb25kcyddICYmICF0aGlzLnNlY29uZHMgJiYgdGhpcy5tb2RlbCAmJiAhaXNOdW1iZXIodGhpcy5tb2RlbC5zZWNvbmQpKSB7XHJcbiAgICAgIHRoaXMubW9kZWwuc2Vjb25kID0gMDtcclxuICAgICAgdGhpcy5wcm9wYWdhdGVNb2RlbENoYW5nZShmYWxzZSk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIHByb3BhZ2F0ZU1vZGVsQ2hhbmdlKHRvdWNoZWQgPSB0cnVlKSB7XHJcbiAgICBpZiAodG91Y2hlZCkge1xyXG4gICAgICB0aGlzLm9uVG91Y2hlZCgpO1xyXG4gICAgfVxyXG4gICAgaWYgKHRoaXMubW9kZWwuaXNWYWxpZCh0aGlzLnNlY29uZHMpKSB7XHJcbiAgICAgIHRoaXMub25DaGFuZ2UoXHJcbiAgICAgICAgICB0aGlzLl9uZ2JUaW1lQWRhcHRlci50b01vZGVsKHtob3VyOiB0aGlzLm1vZGVsLmhvdXIsIG1pbnV0ZTogdGhpcy5tb2RlbC5taW51dGUsIHNlY29uZDogdGhpcy5tb2RlbC5zZWNvbmR9KSk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB0aGlzLm9uQ2hhbmdlKHRoaXMuX25nYlRpbWVBZGFwdGVyLnRvTW9kZWwobnVsbCkpO1xyXG4gICAgfVxyXG4gIH1cclxufVxyXG4iLCJpbXBvcnQge05nTW9kdWxlLCBNb2R1bGVXaXRoUHJvdmlkZXJzfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHtDb21tb25Nb2R1bGV9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XHJcblxyXG5pbXBvcnQge05nYlRpbWVwaWNrZXJ9IGZyb20gJy4vdGltZXBpY2tlcic7XHJcblxyXG5leHBvcnQge05nYlRpbWVwaWNrZXJ9IGZyb20gJy4vdGltZXBpY2tlcic7XHJcbmV4cG9ydCB7TmdiVGltZXBpY2tlckNvbmZpZ30gZnJvbSAnLi90aW1lcGlja2VyLWNvbmZpZyc7XHJcbmV4cG9ydCB7TmdiVGltZVN0cnVjdH0gZnJvbSAnLi9uZ2ItdGltZS1zdHJ1Y3QnO1xyXG5leHBvcnQge05nYlRpbWVBZGFwdGVyfSBmcm9tICcuL25nYi10aW1lLWFkYXB0ZXInO1xyXG5cclxuQE5nTW9kdWxlKHtkZWNsYXJhdGlvbnM6IFtOZ2JUaW1lcGlja2VyXSwgZXhwb3J0czogW05nYlRpbWVwaWNrZXJdLCBpbXBvcnRzOiBbQ29tbW9uTW9kdWxlXX0pXHJcbmV4cG9ydCBjbGFzcyBOZ2JUaW1lcGlja2VyTW9kdWxlIHtcclxuICAvKipcclxuICAgKiBJbXBvcnRpbmcgd2l0aCAnLmZvclJvb3QoKScgaXMgbm8gbG9uZ2VyIG5lY2Vzc2FyeSwgeW91IGNhbiBzaW1wbHkgaW1wb3J0IHRoZSBtb2R1bGUuXHJcbiAgICogV2lsbCBiZSByZW1vdmVkIGluIDQuMC4wLlxyXG4gICAqXHJcbiAgICogQGRlcHJlY2F0ZWQgMy4wLjBcclxuICAgKi9cclxuICBzdGF0aWMgZm9yUm9vdCgpOiBNb2R1bGVXaXRoUHJvdmlkZXJzIHsgcmV0dXJuIHtuZ01vZHVsZTogTmdiVGltZXBpY2tlck1vZHVsZX07IH1cclxufVxyXG4iLCJpbXBvcnQge0luamVjdGFibGV9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQge1BsYWNlbWVudEFycmF5fSBmcm9tICcuLi91dGlsL3Bvc2l0aW9uaW5nJztcclxuXHJcbi8qKlxyXG4gKiBDb25maWd1cmF0aW9uIHNlcnZpY2UgZm9yIHRoZSBOZ2JUb29sdGlwIGRpcmVjdGl2ZS5cclxuICogWW91IGNhbiBpbmplY3QgdGhpcyBzZXJ2aWNlLCB0eXBpY2FsbHkgaW4geW91ciByb290IGNvbXBvbmVudCwgYW5kIGN1c3RvbWl6ZSB0aGUgdmFsdWVzIG9mIGl0cyBwcm9wZXJ0aWVzIGluXHJcbiAqIG9yZGVyIHRvIHByb3ZpZGUgZGVmYXVsdCB2YWx1ZXMgZm9yIGFsbCB0aGUgdG9vbHRpcHMgdXNlZCBpbiB0aGUgYXBwbGljYXRpb24uXHJcbiAqL1xyXG5ASW5qZWN0YWJsZSh7cHJvdmlkZWRJbjogJ3Jvb3QnfSlcclxuZXhwb3J0IGNsYXNzIE5nYlRvb2x0aXBDb25maWcge1xyXG4gIGF1dG9DbG9zZTogYm9vbGVhbiB8ICdpbnNpZGUnIHwgJ291dHNpZGUnID0gdHJ1ZTtcclxuICBwbGFjZW1lbnQ6IFBsYWNlbWVudEFycmF5ID0gJ3RvcCc7XHJcbiAgdHJpZ2dlcnMgPSAnaG92ZXInO1xyXG4gIGNvbnRhaW5lcjogc3RyaW5nO1xyXG4gIGRpc2FibGVUb29sdGlwID0gZmFsc2U7XHJcbiAgdG9vbHRpcENsYXNzOiBzdHJpbmc7XHJcbn1cclxuIiwiaW1wb3J0IHtcclxuICBDb21wb25lbnQsXHJcbiAgRGlyZWN0aXZlLFxyXG4gIElucHV0LFxyXG4gIE91dHB1dCxcclxuICBFdmVudEVtaXR0ZXIsXHJcbiAgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksXHJcbiAgT25Jbml0LFxyXG4gIE9uRGVzdHJveSxcclxuICBJbmplY3QsXHJcbiAgSW5qZWN0b3IsXHJcbiAgUmVuZGVyZXIyLFxyXG4gIENvbXBvbmVudFJlZixcclxuICBFbGVtZW50UmVmLFxyXG4gIFRlbXBsYXRlUmVmLFxyXG4gIFZpZXdDb250YWluZXJSZWYsXHJcbiAgQ29tcG9uZW50RmFjdG9yeVJlc29sdmVyLFxyXG4gIE5nWm9uZVxyXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQge0RPQ1VNRU5UfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xyXG5cclxuaW1wb3J0IHtmcm9tRXZlbnQsIHJhY2V9IGZyb20gJ3J4anMnO1xyXG5pbXBvcnQge2ZpbHRlciwgdGFrZVVudGlsfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XHJcblxyXG5pbXBvcnQge2xpc3RlblRvVHJpZ2dlcnN9IGZyb20gJy4uL3V0aWwvdHJpZ2dlcnMnO1xyXG5pbXBvcnQge3Bvc2l0aW9uRWxlbWVudHMsIFBsYWNlbWVudCwgUGxhY2VtZW50QXJyYXl9IGZyb20gJy4uL3V0aWwvcG9zaXRpb25pbmcnO1xyXG5pbXBvcnQge1BvcHVwU2VydmljZX0gZnJvbSAnLi4vdXRpbC9wb3B1cCc7XHJcbmltcG9ydCB7S2V5fSBmcm9tICcuLi91dGlsL2tleSc7XHJcblxyXG5pbXBvcnQge05nYlRvb2x0aXBDb25maWd9IGZyb20gJy4vdG9vbHRpcC1jb25maWcnO1xyXG5cclxubGV0IG5leHRJZCA9IDA7XHJcblxyXG5AQ29tcG9uZW50KHtcclxuICBzZWxlY3RvcjogJ25nYi10b29sdGlwLXdpbmRvdycsXHJcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2gsXHJcbiAgaG9zdDoge1xyXG4gICAgJ1tjbGFzc10nOlxyXG4gICAgICAgICdcInRvb2x0aXAgc2hvdyBicy10b29sdGlwLVwiICsgcGxhY2VtZW50LnNwbGl0KFwiLVwiKVswXStcIiBicy10b29sdGlwLVwiICsgcGxhY2VtZW50ICsgKHRvb2x0aXBDbGFzcyA/IFwiIFwiICsgdG9vbHRpcENsYXNzIDogXCJcIiknLFxyXG4gICAgJ3JvbGUnOiAndG9vbHRpcCcsXHJcbiAgICAnW2lkXSc6ICdpZCdcclxuICB9LFxyXG4gIHRlbXBsYXRlOiBgPGRpdiBjbGFzcz1cImFycm93XCI+PC9kaXY+PGRpdiBjbGFzcz1cInRvb2x0aXAtaW5uZXJcIj48bmctY29udGVudD48L25nLWNvbnRlbnQ+PC9kaXY+YCxcclxuICBzdHlsZXM6IFtgXHJcbiAgICA6aG9zdC5icy10b29sdGlwLXRvcCAuYXJyb3csIDpob3N0LmJzLXRvb2x0aXAtYm90dG9tIC5hcnJvdyB7XHJcbiAgICAgIGxlZnQ6IGNhbGMoNTAlIC0gMC40cmVtKTtcclxuICAgIH1cclxuXHJcbiAgICA6aG9zdC5icy10b29sdGlwLXRvcC1sZWZ0IC5hcnJvdywgOmhvc3QuYnMtdG9vbHRpcC1ib3R0b20tbGVmdCAuYXJyb3cge1xyXG4gICAgICBsZWZ0OiAxZW07XHJcbiAgICB9XHJcblxyXG4gICAgOmhvc3QuYnMtdG9vbHRpcC10b3AtcmlnaHQgLmFycm93LCA6aG9zdC5icy10b29sdGlwLWJvdHRvbS1yaWdodCAuYXJyb3cge1xyXG4gICAgICBsZWZ0OiBhdXRvO1xyXG4gICAgICByaWdodDogMC44cmVtO1xyXG4gICAgfVxyXG5cclxuICAgIDpob3N0LmJzLXRvb2x0aXAtbGVmdCAuYXJyb3csIDpob3N0LmJzLXRvb2x0aXAtcmlnaHQgLmFycm93IHtcclxuICAgICAgdG9wOiBjYWxjKDUwJSAtIDAuNHJlbSk7XHJcbiAgICB9XHJcblxyXG4gICAgOmhvc3QuYnMtdG9vbHRpcC1sZWZ0LXRvcCAuYXJyb3csIDpob3N0LmJzLXRvb2x0aXAtcmlnaHQtdG9wIC5hcnJvdyB7XHJcbiAgICAgIHRvcDogMC40cmVtO1xyXG4gICAgfVxyXG5cclxuICAgIDpob3N0LmJzLXRvb2x0aXAtbGVmdC1ib3R0b20gLmFycm93LCA6aG9zdC5icy10b29sdGlwLXJpZ2h0LWJvdHRvbSAuYXJyb3cge1xyXG4gICAgICB0b3A6IGF1dG87XHJcbiAgICAgIGJvdHRvbTogMC40cmVtO1xyXG4gICAgfVxyXG4gIGBdXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBOZ2JUb29sdGlwV2luZG93IHtcclxuICBASW5wdXQoKSBwbGFjZW1lbnQ6IFBsYWNlbWVudCA9ICd0b3AnO1xyXG4gIEBJbnB1dCgpIGlkOiBzdHJpbmc7XHJcbiAgQElucHV0KCkgdG9vbHRpcENsYXNzOiBzdHJpbmc7XHJcblxyXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgX2VsZW1lbnQ6IEVsZW1lbnRSZWY8SFRNTEVsZW1lbnQ+LCBwcml2YXRlIF9yZW5kZXJlcjogUmVuZGVyZXIyKSB7fVxyXG5cclxuICBhcHBseVBsYWNlbWVudChfcGxhY2VtZW50OiBQbGFjZW1lbnQpIHtcclxuICAgIC8vIHJlbW92ZSB0aGUgY3VycmVudCBwbGFjZW1lbnQgY2xhc3Nlc1xyXG4gICAgdGhpcy5fcmVuZGVyZXIucmVtb3ZlQ2xhc3ModGhpcy5fZWxlbWVudC5uYXRpdmVFbGVtZW50LCAnYnMtdG9vbHRpcC0nICsgdGhpcy5wbGFjZW1lbnQudG9TdHJpbmcoKS5zcGxpdCgnLScpWzBdKTtcclxuICAgIHRoaXMuX3JlbmRlcmVyLnJlbW92ZUNsYXNzKHRoaXMuX2VsZW1lbnQubmF0aXZlRWxlbWVudCwgJ2JzLXRvb2x0aXAtJyArIHRoaXMucGxhY2VtZW50LnRvU3RyaW5nKCkpO1xyXG5cclxuICAgIC8vIHNldCB0aGUgbmV3IHBsYWNlbWVudCBjbGFzc2VzXHJcbiAgICB0aGlzLnBsYWNlbWVudCA9IF9wbGFjZW1lbnQ7XHJcblxyXG4gICAgLy8gYXBwbHkgdGhlIG5ldyBwbGFjZW1lbnRcclxuICAgIHRoaXMuX3JlbmRlcmVyLmFkZENsYXNzKHRoaXMuX2VsZW1lbnQubmF0aXZlRWxlbWVudCwgJ2JzLXRvb2x0aXAtJyArIHRoaXMucGxhY2VtZW50LnRvU3RyaW5nKCkuc3BsaXQoJy0nKVswXSk7XHJcbiAgICB0aGlzLl9yZW5kZXJlci5hZGRDbGFzcyh0aGlzLl9lbGVtZW50Lm5hdGl2ZUVsZW1lbnQsICdicy10b29sdGlwLScgKyB0aGlzLnBsYWNlbWVudC50b1N0cmluZygpKTtcclxuICB9XHJcbiAgLyoqXHJcbiAgICogVGVsbHMgd2hldGhlciB0aGUgZXZlbnQgaGFzIGJlZW4gdHJpZ2dlcmVkIGZyb20gdGhpcyBjb21wb25lbnQncyBzdWJ0cmVlIG9yIG5vdC5cclxuICAgKlxyXG4gICAqIEBwYXJhbSBldmVudCB0aGUgZXZlbnQgdG8gY2hlY2tcclxuICAgKlxyXG4gICAqIEByZXR1cm4gd2hldGhlciB0aGUgZXZlbnQgaGFzIGJlZW4gdHJpZ2dlcmVkIGZyb20gdGhpcyBjb21wb25lbnQncyBzdWJ0cmVlIG9yIG5vdC5cclxuICAgKi9cclxuICBpc0V2ZW50RnJvbShldmVudDogRXZlbnQpOiBib29sZWFuIHsgcmV0dXJuIHRoaXMuX2VsZW1lbnQubmF0aXZlRWxlbWVudC5jb250YWlucyhldmVudC50YXJnZXQgYXMgSFRNTEVsZW1lbnQpOyB9XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBBIGxpZ2h0d2VpZ2h0LCBleHRlbnNpYmxlIGRpcmVjdGl2ZSBmb3IgZmFuY3kgdG9vbHRpcCBjcmVhdGlvbi5cclxuICovXHJcbkBEaXJlY3RpdmUoe3NlbGVjdG9yOiAnW25nYlRvb2x0aXBdJywgZXhwb3J0QXM6ICduZ2JUb29sdGlwJ30pXHJcbmV4cG9ydCBjbGFzcyBOZ2JUb29sdGlwIGltcGxlbWVudHMgT25Jbml0LCBPbkRlc3Ryb3kge1xyXG4gIC8qKlxyXG4gICAqIEluZGljYXRlcyB3aGV0aGVyIHRoZSB0b29sdGlwIHNob3VsZCBiZSBjbG9zZWQgb24gRXNjYXBlIGtleSBhbmQgaW5zaWRlL291dHNpZGUgY2xpY2tzLlxyXG4gICAqXHJcbiAgICogLSB0cnVlIChkZWZhdWx0KTogY2xvc2VzIG9uIGJvdGggb3V0c2lkZSBhbmQgaW5zaWRlIGNsaWNrcyBhcyB3ZWxsIGFzIEVzY2FwZSBwcmVzc2VzXHJcbiAgICogLSBmYWxzZTogZGlzYWJsZXMgdGhlIGF1dG9DbG9zZSBmZWF0dXJlIChOQjogdHJpZ2dlcnMgc3RpbGwgYXBwbHkpXHJcbiAgICogLSAnaW5zaWRlJzogY2xvc2VzIG9uIGluc2lkZSBjbGlja3MgYXMgd2VsbCBhcyBFc2NhcGUgcHJlc3Nlc1xyXG4gICAqIC0gJ291dHNpZGUnOiBjbG9zZXMgb24gb3V0c2lkZSBjbGlja3MgKHNvbWV0aW1lcyBhbHNvIGFjaGlldmFibGUgdGhyb3VnaCB0cmlnZ2VycylcclxuICAgKiBhcyB3ZWxsIGFzIEVzY2FwZSBwcmVzc2VzXHJcbiAgICpcclxuICAgKiBAc2luY2UgMy4wLjBcclxuICAgKi9cclxuICBASW5wdXQoKSBhdXRvQ2xvc2U6IGJvb2xlYW4gfCAnaW5zaWRlJyB8ICdvdXRzaWRlJztcclxuICAvKipcclxuICAgICogUGxhY2VtZW50IG9mIGEgdG9vbHRpcCBhY2NlcHRzOlxyXG4gICAgKiAgICBcInRvcFwiLCBcInRvcC1sZWZ0XCIsIFwidG9wLXJpZ2h0XCIsIFwiYm90dG9tXCIsIFwiYm90dG9tLWxlZnRcIiwgXCJib3R0b20tcmlnaHRcIixcclxuICAgICogICAgXCJsZWZ0XCIsIFwibGVmdC10b3BcIiwgXCJsZWZ0LWJvdHRvbVwiLCBcInJpZ2h0XCIsIFwicmlnaHQtdG9wXCIsIFwicmlnaHQtYm90dG9tXCJcclxuICAgICogYW5kIGFycmF5IG9mIGFib3ZlIHZhbHVlcy5cclxuICAgICovXHJcbiAgQElucHV0KCkgcGxhY2VtZW50OiBQbGFjZW1lbnRBcnJheTtcclxuICAvKipcclxuICAgKiBTcGVjaWZpZXMgZXZlbnRzIHRoYXQgc2hvdWxkIHRyaWdnZXIuIFN1cHBvcnRzIGEgc3BhY2Ugc2VwYXJhdGVkIGxpc3Qgb2YgZXZlbnQgbmFtZXMuXHJcbiAgICovXHJcbiAgQElucHV0KCkgdHJpZ2dlcnM6IHN0cmluZztcclxuICAvKipcclxuICAgKiBBIHNlbGVjdG9yIHNwZWNpZnlpbmcgdGhlIGVsZW1lbnQgdGhlIHRvb2x0aXAgc2hvdWxkIGJlIGFwcGVuZGVkIHRvLlxyXG4gICAqIEN1cnJlbnRseSBvbmx5IHN1cHBvcnRzIFwiYm9keVwiLlxyXG4gICAqL1xyXG4gIEBJbnB1dCgpIGNvbnRhaW5lcjogc3RyaW5nO1xyXG4gIC8qKlxyXG4gICAqIEEgZmxhZyBpbmRpY2F0aW5nIGlmIGEgZ2l2ZW4gdG9vbHRpcCBpcyBkaXNhYmxlZCBhbmQgc2hvdWxkIG5vdCBiZSBkaXNwbGF5ZWQuXHJcbiAgICpcclxuICAgKiBAc2luY2UgMS4xLjBcclxuICAgKi9cclxuICBASW5wdXQoKSBkaXNhYmxlVG9vbHRpcDogYm9vbGVhbjtcclxuICAvKipcclxuICAgKiBBbiBvcHRpb25hbCBjbGFzcyBhcHBsaWVkIHRvIG5nYi10b29sdGlwLXdpbmRvd1xyXG4gICAqXHJcbiAgICogQHNpbmNlIDMuMi4wXHJcbiAgICovXHJcbiAgQElucHV0KCkgdG9vbHRpcENsYXNzOiBzdHJpbmc7XHJcbiAgLyoqXHJcbiAgICogRW1pdHMgYW4gZXZlbnQgd2hlbiB0aGUgdG9vbHRpcCBpcyBzaG93blxyXG4gICAqL1xyXG4gIEBPdXRwdXQoKSBzaG93biA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcclxuICAvKipcclxuICAgKiBFbWl0cyBhbiBldmVudCB3aGVuIHRoZSB0b29sdGlwIGlzIGhpZGRlblxyXG4gICAqL1xyXG4gIEBPdXRwdXQoKSBoaWRkZW4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XHJcblxyXG4gIHByaXZhdGUgX25nYlRvb2x0aXA6IHN0cmluZyB8IFRlbXBsYXRlUmVmPGFueT47XHJcbiAgcHJpdmF0ZSBfbmdiVG9vbHRpcFdpbmRvd0lkID0gYG5nYi10b29sdGlwLSR7bmV4dElkKyt9YDtcclxuICBwcml2YXRlIF9wb3B1cFNlcnZpY2U6IFBvcHVwU2VydmljZTxOZ2JUb29sdGlwV2luZG93PjtcclxuICBwcml2YXRlIF93aW5kb3dSZWY6IENvbXBvbmVudFJlZjxOZ2JUb29sdGlwV2luZG93PjtcclxuICBwcml2YXRlIF91bnJlZ2lzdGVyTGlzdGVuZXJzRm47XHJcbiAgcHJpdmF0ZSBfem9uZVN1YnNjcmlwdGlvbjogYW55O1xyXG5cclxuICBjb25zdHJ1Y3RvcihcclxuICAgICAgcHJpdmF0ZSBfZWxlbWVudFJlZjogRWxlbWVudFJlZjxIVE1MRWxlbWVudD4sIHByaXZhdGUgX3JlbmRlcmVyOiBSZW5kZXJlcjIsIGluamVjdG9yOiBJbmplY3RvcixcclxuICAgICAgY29tcG9uZW50RmFjdG9yeVJlc29sdmVyOiBDb21wb25lbnRGYWN0b3J5UmVzb2x2ZXIsIHZpZXdDb250YWluZXJSZWY6IFZpZXdDb250YWluZXJSZWYsIGNvbmZpZzogTmdiVG9vbHRpcENvbmZpZyxcclxuICAgICAgcHJpdmF0ZSBfbmdab25lOiBOZ1pvbmUsIEBJbmplY3QoRE9DVU1FTlQpIHByaXZhdGUgX2RvY3VtZW50OiBhbnkpIHtcclxuICAgIHRoaXMuYXV0b0Nsb3NlID0gY29uZmlnLmF1dG9DbG9zZTtcclxuICAgIHRoaXMucGxhY2VtZW50ID0gY29uZmlnLnBsYWNlbWVudDtcclxuICAgIHRoaXMudHJpZ2dlcnMgPSBjb25maWcudHJpZ2dlcnM7XHJcbiAgICB0aGlzLmNvbnRhaW5lciA9IGNvbmZpZy5jb250YWluZXI7XHJcbiAgICB0aGlzLmRpc2FibGVUb29sdGlwID0gY29uZmlnLmRpc2FibGVUb29sdGlwO1xyXG4gICAgdGhpcy50b29sdGlwQ2xhc3MgPSBjb25maWcudG9vbHRpcENsYXNzO1xyXG4gICAgdGhpcy5fcG9wdXBTZXJ2aWNlID0gbmV3IFBvcHVwU2VydmljZTxOZ2JUb29sdGlwV2luZG93PihcclxuICAgICAgICBOZ2JUb29sdGlwV2luZG93LCBpbmplY3Rvciwgdmlld0NvbnRhaW5lclJlZiwgX3JlbmRlcmVyLCBjb21wb25lbnRGYWN0b3J5UmVzb2x2ZXIpO1xyXG5cclxuICAgIHRoaXMuX3pvbmVTdWJzY3JpcHRpb24gPSBfbmdab25lLm9uU3RhYmxlLnN1YnNjcmliZSgoKSA9PiB7XHJcbiAgICAgIGlmICh0aGlzLl93aW5kb3dSZWYpIHtcclxuICAgICAgICB0aGlzLl93aW5kb3dSZWYuaW5zdGFuY2UuYXBwbHlQbGFjZW1lbnQoXHJcbiAgICAgICAgICAgIHBvc2l0aW9uRWxlbWVudHMoXHJcbiAgICAgICAgICAgICAgICB0aGlzLl9lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQsIHRoaXMuX3dpbmRvd1JlZi5sb2NhdGlvbi5uYXRpdmVFbGVtZW50LCB0aGlzLnBsYWNlbWVudCxcclxuICAgICAgICAgICAgICAgIHRoaXMuY29udGFpbmVyID09PSAnYm9keScpKTtcclxuICAgICAgfVxyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBDb250ZW50IHRvIGJlIGRpc3BsYXllZCBhcyB0b29sdGlwLiBJZiBmYWxzeSwgdGhlIHRvb2x0aXAgd29uJ3Qgb3Blbi5cclxuICAgKi9cclxuICBASW5wdXQoKVxyXG4gIHNldCBuZ2JUb29sdGlwKHZhbHVlOiBzdHJpbmcgfCBUZW1wbGF0ZVJlZjxhbnk+KSB7XHJcbiAgICB0aGlzLl9uZ2JUb29sdGlwID0gdmFsdWU7XHJcbiAgICBpZiAoIXZhbHVlICYmIHRoaXMuX3dpbmRvd1JlZikge1xyXG4gICAgICB0aGlzLmNsb3NlKCk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBnZXQgbmdiVG9vbHRpcCgpIHsgcmV0dXJuIHRoaXMuX25nYlRvb2x0aXA7IH1cclxuXHJcbiAgLyoqXHJcbiAgICogT3BlbnMgYW4gZWxlbWVudMOiwoDCmXMgdG9vbHRpcC4gVGhpcyBpcyBjb25zaWRlcmVkIGEgw6LCgMKcbWFudWFsw6LCgMKdIHRyaWdnZXJpbmcgb2YgdGhlIHRvb2x0aXAuXHJcbiAgICogVGhlIGNvbnRleHQgaXMgYW4gb3B0aW9uYWwgdmFsdWUgdG8gYmUgaW5qZWN0ZWQgaW50byB0aGUgdG9vbHRpcCB0ZW1wbGF0ZSB3aGVuIGl0IGlzIGNyZWF0ZWQuXHJcbiAgICovXHJcbiAgb3Blbihjb250ZXh0PzogYW55KSB7XHJcbiAgICBpZiAoIXRoaXMuX3dpbmRvd1JlZiAmJiB0aGlzLl9uZ2JUb29sdGlwICYmICF0aGlzLmRpc2FibGVUb29sdGlwKSB7XHJcbiAgICAgIHRoaXMuX3dpbmRvd1JlZiA9IHRoaXMuX3BvcHVwU2VydmljZS5vcGVuKHRoaXMuX25nYlRvb2x0aXAsIGNvbnRleHQpO1xyXG4gICAgICB0aGlzLl93aW5kb3dSZWYuaW5zdGFuY2UudG9vbHRpcENsYXNzID0gdGhpcy50b29sdGlwQ2xhc3M7XHJcbiAgICAgIHRoaXMuX3dpbmRvd1JlZi5pbnN0YW5jZS5pZCA9IHRoaXMuX25nYlRvb2x0aXBXaW5kb3dJZDtcclxuXHJcbiAgICAgIHRoaXMuX3JlbmRlcmVyLnNldEF0dHJpYnV0ZSh0aGlzLl9lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQsICdhcmlhLWRlc2NyaWJlZGJ5JywgdGhpcy5fbmdiVG9vbHRpcFdpbmRvd0lkKTtcclxuXHJcbiAgICAgIGlmICh0aGlzLmNvbnRhaW5lciA9PT0gJ2JvZHknKSB7XHJcbiAgICAgICAgdGhpcy5fZG9jdW1lbnQucXVlcnlTZWxlY3Rvcih0aGlzLmNvbnRhaW5lcikuYXBwZW5kQ2hpbGQodGhpcy5fd2luZG93UmVmLmxvY2F0aW9uLm5hdGl2ZUVsZW1lbnQpO1xyXG4gICAgICB9XHJcblxyXG4gICAgICB0aGlzLl93aW5kb3dSZWYuaW5zdGFuY2UucGxhY2VtZW50ID0gQXJyYXkuaXNBcnJheSh0aGlzLnBsYWNlbWVudCkgPyB0aGlzLnBsYWNlbWVudFswXSA6IHRoaXMucGxhY2VtZW50O1xyXG5cclxuICAgICAgLy8gYXBwbHkgc3R5bGluZyB0byBzZXQgYmFzaWMgY3NzLWNsYXNzZXMgb24gdGFyZ2V0IGVsZW1lbnQsIGJlZm9yZSBnb2luZyBmb3IgcG9zaXRpb25pbmdcclxuICAgICAgdGhpcy5fd2luZG93UmVmLmNoYW5nZURldGVjdG9yUmVmLmRldGVjdENoYW5nZXMoKTtcclxuICAgICAgdGhpcy5fd2luZG93UmVmLmNoYW5nZURldGVjdG9yUmVmLm1hcmtGb3JDaGVjaygpO1xyXG5cclxuICAgICAgLy8gcG9zaXRpb24gdG9vbHRpcCBhbG9uZyB0aGUgZWxlbWVudFxyXG4gICAgICB0aGlzLl93aW5kb3dSZWYuaW5zdGFuY2UuYXBwbHlQbGFjZW1lbnQoXHJcbiAgICAgICAgICBwb3NpdGlvbkVsZW1lbnRzKFxyXG4gICAgICAgICAgICAgIHRoaXMuX2VsZW1lbnRSZWYubmF0aXZlRWxlbWVudCwgdGhpcy5fd2luZG93UmVmLmxvY2F0aW9uLm5hdGl2ZUVsZW1lbnQsIHRoaXMucGxhY2VtZW50LFxyXG4gICAgICAgICAgICAgIHRoaXMuY29udGFpbmVyID09PSAnYm9keScpKTtcclxuXHJcbiAgICAgIGlmICh0aGlzLmF1dG9DbG9zZSkge1xyXG4gICAgICAgIHRoaXMuX25nWm9uZS5ydW5PdXRzaWRlQW5ndWxhcigoKSA9PiB7XHJcbiAgICAgICAgICAvLyBwcmV2ZW50cyBhdXRvbWF0aWMgY2xvc2luZyByaWdodCBhZnRlciBhbiBvcGVuaW5nIGJ5IHB1dHRpbmcgYSBndWFyZCBmb3IgdGhlIHRpbWUgb2Ygb25lIGV2ZW50IGhhbmRsaW5nXHJcbiAgICAgICAgICAvLyBwYXNzXHJcbiAgICAgICAgICAvLyB1c2UgY2FzZTogY2xpY2sgZXZlbnQgd291bGQgcmVhY2ggYW4gZWxlbWVudCBvcGVuaW5nIHRoZSB0b29sdGlwIGZpcnN0LCB0aGVuIHJlYWNoIHRoZSBhdXRvQ2xvc2UgaGFuZGxlclxyXG4gICAgICAgICAgLy8gd2hpY2ggd291bGQgY2xvc2UgaXRcclxuICAgICAgICAgIGxldCBqdXN0T3BlbmVkID0gdHJ1ZTtcclxuICAgICAgICAgIHJlcXVlc3RBbmltYXRpb25GcmFtZSgoKSA9PiBqdXN0T3BlbmVkID0gZmFsc2UpO1xyXG5cclxuICAgICAgICAgIGNvbnN0IGVzY2FwZXMkID0gZnJvbUV2ZW50PEtleWJvYXJkRXZlbnQ+KHRoaXMuX2RvY3VtZW50LCAna2V5dXAnKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLnBpcGUodGFrZVVudGlsKHRoaXMuaGlkZGVuKSwgZmlsdGVyKGV2ZW50ID0+IGV2ZW50LndoaWNoID09PSBLZXkuRXNjYXBlKSk7XHJcblxyXG4gICAgICAgICAgY29uc3QgY2xpY2tzJCA9IGZyb21FdmVudDxNb3VzZUV2ZW50Pih0aGlzLl9kb2N1bWVudCwgJ2NsaWNrJylcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLnBpcGUoXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0YWtlVW50aWwodGhpcy5oaWRkZW4pLCBmaWx0ZXIoKCkgPT4gIWp1c3RPcGVuZWQpLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZmlsdGVyKGV2ZW50ID0+IHRoaXMuX3Nob3VsZENsb3NlRnJvbUNsaWNrKGV2ZW50KSkpO1xyXG5cclxuICAgICAgICAgIHJhY2U8RXZlbnQ+KFtlc2NhcGVzJCwgY2xpY2tzJF0pLnN1YnNjcmliZSgoKSA9PiB0aGlzLl9uZ1pvbmUucnVuKCgpID0+IHRoaXMuY2xvc2UoKSkpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICB9XHJcblxyXG4gICAgICB0aGlzLnNob3duLmVtaXQoKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIENsb3NlcyBhbiBlbGVtZW50w6LCgMKZcyB0b29sdGlwLiBUaGlzIGlzIGNvbnNpZGVyZWQgYSDDosKAwpxtYW51YWzDosKAwp0gdHJpZ2dlcmluZyBvZiB0aGUgdG9vbHRpcC5cclxuICAgKi9cclxuICBjbG9zZSgpOiB2b2lkIHtcclxuICAgIGlmICh0aGlzLl93aW5kb3dSZWYgIT0gbnVsbCkge1xyXG4gICAgICB0aGlzLl9yZW5kZXJlci5yZW1vdmVBdHRyaWJ1dGUodGhpcy5fZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50LCAnYXJpYS1kZXNjcmliZWRieScpO1xyXG4gICAgICB0aGlzLl9wb3B1cFNlcnZpY2UuY2xvc2UoKTtcclxuICAgICAgdGhpcy5fd2luZG93UmVmID0gbnVsbDtcclxuICAgICAgdGhpcy5oaWRkZW4uZW1pdCgpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogVG9nZ2xlcyBhbiBlbGVtZW50w6LCgMKZcyB0b29sdGlwLiBUaGlzIGlzIGNvbnNpZGVyZWQgYSDDosKAwpxtYW51YWzDosKAwp0gdHJpZ2dlcmluZyBvZiB0aGUgdG9vbHRpcC5cclxuICAgKi9cclxuICB0b2dnbGUoKTogdm9pZCB7XHJcbiAgICBpZiAodGhpcy5fd2luZG93UmVmKSB7XHJcbiAgICAgIHRoaXMuY2xvc2UoKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHRoaXMub3BlbigpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogUmV0dXJucyB3aGV0aGVyIG9yIG5vdCB0aGUgdG9vbHRpcCBpcyBjdXJyZW50bHkgYmVpbmcgc2hvd25cclxuICAgKi9cclxuICBpc09wZW4oKTogYm9vbGVhbiB7IHJldHVybiB0aGlzLl93aW5kb3dSZWYgIT0gbnVsbDsgfVxyXG5cclxuICBuZ09uSW5pdCgpIHtcclxuICAgIHRoaXMuX3VucmVnaXN0ZXJMaXN0ZW5lcnNGbiA9IGxpc3RlblRvVHJpZ2dlcnMoXHJcbiAgICAgICAgdGhpcy5fcmVuZGVyZXIsIHRoaXMuX2VsZW1lbnRSZWYubmF0aXZlRWxlbWVudCwgdGhpcy50cmlnZ2VycywgdGhpcy5vcGVuLmJpbmQodGhpcyksIHRoaXMuY2xvc2UuYmluZCh0aGlzKSxcclxuICAgICAgICB0aGlzLnRvZ2dsZS5iaW5kKHRoaXMpKTtcclxuICB9XHJcblxyXG4gIG5nT25EZXN0cm95KCkge1xyXG4gICAgdGhpcy5jbG9zZSgpO1xyXG4gICAgLy8gVGhpcyBjaGVjayBpcyBuZWVkZWQgYXMgaXQgbWlnaHQgaGFwcGVuIHRoYXQgbmdPbkRlc3Ryb3kgaXMgY2FsbGVkIGJlZm9yZSBuZ09uSW5pdFxyXG4gICAgLy8gdW5kZXIgY2VydGFpbiBjb25kaXRpb25zLCBzZWU6IGh0dHBzOi8vZ2l0aHViLmNvbS9uZy1ib290c3RyYXAvbmctYm9vdHN0cmFwL2lzc3Vlcy8yMTk5XHJcbiAgICBpZiAodGhpcy5fdW5yZWdpc3Rlckxpc3RlbmVyc0ZuKSB7XHJcbiAgICAgIHRoaXMuX3VucmVnaXN0ZXJMaXN0ZW5lcnNGbigpO1xyXG4gICAgfVxyXG4gICAgdGhpcy5fem9uZVN1YnNjcmlwdGlvbi51bnN1YnNjcmliZSgpO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBfc2hvdWxkQ2xvc2VGcm9tQ2xpY2soZXZlbnQ6IE1vdXNlRXZlbnQpIHtcclxuICAgIGlmIChldmVudC5idXR0b24gIT09IDIpIHtcclxuICAgICAgaWYgKHRoaXMuYXV0b0Nsb3NlID09PSB0cnVlKSB7XHJcbiAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgIH0gZWxzZSBpZiAodGhpcy5hdXRvQ2xvc2UgPT09ICdpbnNpZGUnICYmIHRoaXMuX2lzRXZlbnRGcm9tVG9vbHRpcChldmVudCkpIHtcclxuICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgfSBlbHNlIGlmICh0aGlzLmF1dG9DbG9zZSA9PT0gJ291dHNpZGUnICYmICF0aGlzLl9pc0V2ZW50RnJvbVRvb2x0aXAoZXZlbnQpKSB7XHJcbiAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICAgIHJldHVybiBmYWxzZTtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgX2lzRXZlbnRGcm9tVG9vbHRpcChldmVudDogTW91c2VFdmVudCkge1xyXG4gICAgY29uc3QgcG9wdXAgPSB0aGlzLl93aW5kb3dSZWYuaW5zdGFuY2U7XHJcbiAgICByZXR1cm4gcG9wdXAgPyBwb3B1cC5pc0V2ZW50RnJvbShldmVudCkgOiBmYWxzZTtcclxuICB9XHJcbn1cclxuIiwiaW1wb3J0IHtOZ01vZHVsZSwgTW9kdWxlV2l0aFByb3ZpZGVyc30gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcblxyXG5pbXBvcnQge05nYlRvb2x0aXAsIE5nYlRvb2x0aXBXaW5kb3d9IGZyb20gJy4vdG9vbHRpcCc7XHJcblxyXG5leHBvcnQge05nYlRvb2x0aXBDb25maWd9IGZyb20gJy4vdG9vbHRpcC1jb25maWcnO1xyXG5leHBvcnQge05nYlRvb2x0aXB9IGZyb20gJy4vdG9vbHRpcCc7XHJcbmV4cG9ydCB7UGxhY2VtZW50fSBmcm9tICcuLi91dGlsL3Bvc2l0aW9uaW5nJztcclxuXHJcbkBOZ01vZHVsZSh7ZGVjbGFyYXRpb25zOiBbTmdiVG9vbHRpcCwgTmdiVG9vbHRpcFdpbmRvd10sIGV4cG9ydHM6IFtOZ2JUb29sdGlwXSwgZW50cnlDb21wb25lbnRzOiBbTmdiVG9vbHRpcFdpbmRvd119KVxyXG5leHBvcnQgY2xhc3MgTmdiVG9vbHRpcE1vZHVsZSB7XHJcbiAgLyoqXHJcbiAgICogTm8gbmVlZCBpbiBmb3JSb290IGFueW1vcmUgd2l0aCB0cmVlLXNoYWtlYWJsZSBzZXJ2aWNlc1xyXG4gICAqXHJcbiAgICogQGRlcHJlY2F0ZWQgMy4wLjBcclxuICAgKi9cclxuICBzdGF0aWMgZm9yUm9vdCgpOiBNb2R1bGVXaXRoUHJvdmlkZXJzIHsgcmV0dXJuIHtuZ01vZHVsZTogTmdiVG9vbHRpcE1vZHVsZX07IH1cclxufVxyXG4iLCJpbXBvcnQge0NvbXBvbmVudCwgSW5wdXQsIE9uQ2hhbmdlcywgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksIFNpbXBsZUNoYW5nZXN9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQge3JlZ0V4cEVzY2FwZSwgdG9TdHJpbmd9IGZyb20gJy4uL3V0aWwvdXRpbCc7XHJcblxyXG4vKipcclxuICogQSBjb21wb25lbnQgdGhhdCBjYW4gYmUgdXNlZCBpbnNpZGUgYSBjdXN0b20gcmVzdWx0IHRlbXBsYXRlIGluIG9yZGVyIHRvIGhpZ2hsaWdodCB0aGUgdGVybSBpbnNpZGUgdGhlIHRleHQgb2YgdGhlXHJcbiAqIHJlc3VsdFxyXG4gKi9cclxuQENvbXBvbmVudCh7XHJcbiAgc2VsZWN0b3I6ICduZ2ItaGlnaGxpZ2h0JyxcclxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaCxcclxuICB0ZW1wbGF0ZTogYDxuZy10ZW1wbGF0ZSBuZ0ZvciBbbmdGb3JPZl09XCJwYXJ0c1wiIGxldC1wYXJ0IGxldC1pc09kZD1cIm9kZFwiPmAgK1xyXG4gICAgICBgPHNwYW4gKm5nSWY9XCJpc09kZDsgZWxzZSBldmVuXCIgW2NsYXNzXT1cImhpZ2hsaWdodENsYXNzXCI+e3twYXJ0fX08L3NwYW4+PG5nLXRlbXBsYXRlICNldmVuPnt7cGFydH19PC9uZy10ZW1wbGF0ZT5gICtcclxuICAgICAgYDwvbmctdGVtcGxhdGU+YCwgIC8vIHRlbXBsYXRlIG5lZWRzIHRvIGJlIGZvcm1hdHRlZCBpbiBhIGNlcnRhaW4gd2F5IHNvIHdlIGRvbid0IGFkZCBlbXB0eSB0ZXh0IG5vZGVzXHJcbiAgc3R5bGVzOiBbYFxyXG4gICAgLm5nYi1oaWdobGlnaHQge1xyXG4gICAgICBmb250LXdlaWdodDogYm9sZDtcclxuICAgIH1cclxuICBgXVxyXG59KVxyXG5leHBvcnQgY2xhc3MgTmdiSGlnaGxpZ2h0IGltcGxlbWVudHMgT25DaGFuZ2VzIHtcclxuICBwYXJ0czogc3RyaW5nW107XHJcblxyXG4gIC8qKlxyXG4gICAqIFRoZSBDU1MgY2xhc3Mgb2YgdGhlIHNwYW4gZWxlbWVudHMgd3JhcHBpbmcgdGhlIHRlcm0gaW5zaWRlIHRoZSByZXN1bHRcclxuICAgKi9cclxuICBASW5wdXQoKSBoaWdobGlnaHRDbGFzcyA9ICduZ2ItaGlnaGxpZ2h0JztcclxuXHJcbiAgLyoqXHJcbiAgICogVGhlIHJlc3VsdCB0ZXh0IHRvIGRpc3BsYXkuIElmIHRoZSB0ZXJtIGlzIGZvdW5kIGluc2lkZSB0aGlzIHRleHQsIGl0J3MgaGlnaGxpZ2h0ZWRcclxuICAgKi9cclxuICBASW5wdXQoKSByZXN1bHQ6IHN0cmluZztcclxuXHJcbiAgLyoqXHJcbiAgICogVGhlIHNlYXJjaGVkIHRlcm1cclxuICAgKi9cclxuICBASW5wdXQoKSB0ZXJtOiBzdHJpbmc7XHJcblxyXG4gIG5nT25DaGFuZ2VzKGNoYW5nZXM6IFNpbXBsZUNoYW5nZXMpIHtcclxuICAgIGNvbnN0IHJlc3VsdFN0ciA9IHRvU3RyaW5nKHRoaXMucmVzdWx0KTtcclxuICAgIGNvbnN0IHJlc3VsdExDID0gcmVzdWx0U3RyLnRvTG93ZXJDYXNlKCk7XHJcbiAgICBjb25zdCB0ZXJtTEMgPSB0b1N0cmluZyh0aGlzLnRlcm0pLnRvTG93ZXJDYXNlKCk7XHJcbiAgICBsZXQgY3VycmVudElkeCA9IDA7XHJcblxyXG4gICAgaWYgKHRlcm1MQy5sZW5ndGggPiAwKSB7XHJcbiAgICAgIHRoaXMucGFydHMgPSByZXN1bHRMQy5zcGxpdChuZXcgUmVnRXhwKGAoJHtyZWdFeHBFc2NhcGUodGVybUxDKX0pYCkpLm1hcCgocGFydCkgPT4ge1xyXG4gICAgICAgIGNvbnN0IG9yaWdpbmFsUGFydCA9IHJlc3VsdFN0ci5zdWJzdHIoY3VycmVudElkeCwgcGFydC5sZW5ndGgpO1xyXG4gICAgICAgIGN1cnJlbnRJZHggKz0gcGFydC5sZW5ndGg7XHJcbiAgICAgICAgcmV0dXJuIG9yaWdpbmFsUGFydDtcclxuICAgICAgfSk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB0aGlzLnBhcnRzID0gW3Jlc3VsdFN0cl07XHJcbiAgICB9XHJcbiAgfVxyXG59XHJcbiIsImltcG9ydCB7Q29tcG9uZW50LCBJbnB1dCwgT3V0cHV0LCBFdmVudEVtaXR0ZXIsIFRlbXBsYXRlUmVmLCBPbkluaXR9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5cclxuaW1wb3J0IHt0b1N0cmluZ30gZnJvbSAnLi4vdXRpbC91dGlsJztcclxuXHJcbi8qKlxyXG4gKiBDb250ZXh0IGZvciB0aGUgdHlwZWFoZWFkIHJlc3VsdCB0ZW1wbGF0ZSBpbiBjYXNlIHlvdSB3YW50IHRvIG92ZXJyaWRlIHRoZSBkZWZhdWx0IG9uZVxyXG4gKi9cclxuZXhwb3J0IGludGVyZmFjZSBSZXN1bHRUZW1wbGF0ZUNvbnRleHQge1xyXG4gIC8qKlxyXG4gICAqIFlvdXIgdHlwZWFoZWFkIHJlc3VsdCBkYXRhIG1vZGVsXHJcbiAgICovXHJcbiAgcmVzdWx0OiBhbnk7XHJcblxyXG4gIC8qKlxyXG4gICAqIFNlYXJjaCB0ZXJtIGZyb20gdGhlIGlucHV0IHVzZWQgdG8gZ2V0IGN1cnJlbnQgcmVzdWx0XHJcbiAgICovXHJcbiAgdGVybTogc3RyaW5nO1xyXG59XHJcblxyXG5AQ29tcG9uZW50KHtcclxuICBzZWxlY3RvcjogJ25nYi10eXBlYWhlYWQtd2luZG93JyxcclxuICBleHBvcnRBczogJ25nYlR5cGVhaGVhZFdpbmRvdycsXHJcbiAgaG9zdDogeydjbGFzcyc6ICdkcm9wZG93bi1tZW51IHNob3cnLCAncm9sZSc6ICdsaXN0Ym94JywgJ1tpZF0nOiAnaWQnfSxcclxuICB0ZW1wbGF0ZTogYFxyXG4gICAgPG5nLXRlbXBsYXRlICNydCBsZXQtcmVzdWx0PVwicmVzdWx0XCIgbGV0LXRlcm09XCJ0ZXJtXCIgbGV0LWZvcm1hdHRlcj1cImZvcm1hdHRlclwiPlxyXG4gICAgICA8bmdiLWhpZ2hsaWdodCBbcmVzdWx0XT1cImZvcm1hdHRlcihyZXN1bHQpXCIgW3Rlcm1dPVwidGVybVwiPjwvbmdiLWhpZ2hsaWdodD5cclxuICAgIDwvbmctdGVtcGxhdGU+XHJcbiAgICA8bmctdGVtcGxhdGUgbmdGb3IgW25nRm9yT2ZdPVwicmVzdWx0c1wiIGxldC1yZXN1bHQgbGV0LWlkeD1cImluZGV4XCI+XHJcbiAgICAgIDxidXR0b24gdHlwZT1cImJ1dHRvblwiIGNsYXNzPVwiZHJvcGRvd24taXRlbVwiIHJvbGU9XCJvcHRpb25cIlxyXG4gICAgICAgIFtpZF09XCJpZCArICctJyArIGlkeFwiXHJcbiAgICAgICAgW2NsYXNzLmFjdGl2ZV09XCJpZHggPT09IGFjdGl2ZUlkeFwiXHJcbiAgICAgICAgKG1vdXNlZW50ZXIpPVwibWFya0FjdGl2ZShpZHgpXCJcclxuICAgICAgICAoY2xpY2spPVwic2VsZWN0KHJlc3VsdClcIj5cclxuICAgICAgICAgIDxuZy10ZW1wbGF0ZSBbbmdUZW1wbGF0ZU91dGxldF09XCJyZXN1bHRUZW1wbGF0ZSB8fCBydFwiXHJcbiAgICAgICAgICBbbmdUZW1wbGF0ZU91dGxldENvbnRleHRdPVwie3Jlc3VsdDogcmVzdWx0LCB0ZXJtOiB0ZXJtLCBmb3JtYXR0ZXI6IGZvcm1hdHRlcn1cIj48L25nLXRlbXBsYXRlPlxyXG4gICAgICA8L2J1dHRvbj5cclxuICAgIDwvbmctdGVtcGxhdGU+XHJcbiAgYFxyXG59KVxyXG5leHBvcnQgY2xhc3MgTmdiVHlwZWFoZWFkV2luZG93IGltcGxlbWVudHMgT25Jbml0IHtcclxuICBhY3RpdmVJZHggPSAwO1xyXG5cclxuICAvKipcclxuICAgKiAgVGhlIGlkIGZvciB0aGUgdHlwZWFoZWFkIHdpbmRvdy4gVGhlIGlkIHNob3VsZCBiZSB1bmlxdWUgYW5kIHRoZSBzYW1lXHJcbiAgICogIGFzIHRoZSBhc3NvY2lhdGVkIHR5cGVhaGVhZCdzIGlkLlxyXG4gICAqL1xyXG4gIEBJbnB1dCgpIGlkOiBzdHJpbmc7XHJcblxyXG4gIC8qKlxyXG4gICAqIEZsYWcgaW5kaWNhdGluZyBpZiB0aGUgZmlyc3Qgcm93IHNob3VsZCBiZSBhY3RpdmUgaW5pdGlhbGx5XHJcbiAgICovXHJcbiAgQElucHV0KCkgZm9jdXNGaXJzdCA9IHRydWU7XHJcblxyXG4gIC8qKlxyXG4gICAqIFR5cGVhaGVhZCBtYXRjaCByZXN1bHRzIHRvIGJlIGRpc3BsYXllZFxyXG4gICAqL1xyXG4gIEBJbnB1dCgpIHJlc3VsdHM7XHJcblxyXG4gIC8qKlxyXG4gICAqIFNlYXJjaCB0ZXJtIHVzZWQgdG8gZ2V0IGN1cnJlbnQgcmVzdWx0c1xyXG4gICAqL1xyXG4gIEBJbnB1dCgpIHRlcm06IHN0cmluZztcclxuXHJcbiAgLyoqXHJcbiAgICogQSBmdW5jdGlvbiB1c2VkIHRvIGZvcm1hdCBhIGdpdmVuIHJlc3VsdCBiZWZvcmUgZGlzcGxheS4gVGhpcyBmdW5jdGlvbiBzaG91bGQgcmV0dXJuIGEgZm9ybWF0dGVkIHN0cmluZyB3aXRob3V0IGFueVxyXG4gICAqIEhUTUwgbWFya3VwXHJcbiAgICovXHJcbiAgQElucHV0KCkgZm9ybWF0dGVyID0gdG9TdHJpbmc7XHJcblxyXG4gIC8qKlxyXG4gICAqIEEgdGVtcGxhdGUgdG8gb3ZlcnJpZGUgYSBtYXRjaGluZyByZXN1bHQgZGVmYXVsdCBkaXNwbGF5XHJcbiAgICovXHJcbiAgQElucHV0KCkgcmVzdWx0VGVtcGxhdGU6IFRlbXBsYXRlUmVmPFJlc3VsdFRlbXBsYXRlQ29udGV4dD47XHJcblxyXG4gIC8qKlxyXG4gICAqIEV2ZW50IHJhaXNlZCB3aGVuIHVzZXIgc2VsZWN0cyBhIHBhcnRpY3VsYXIgcmVzdWx0IHJvd1xyXG4gICAqL1xyXG4gIEBPdXRwdXQoJ3NlbGVjdCcpIHNlbGVjdEV2ZW50ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xyXG5cclxuICBAT3V0cHV0KCdhY3RpdmVDaGFuZ2UnKSBhY3RpdmVDaGFuZ2VFdmVudCA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcclxuXHJcbiAgaGFzQWN0aXZlKCkgeyByZXR1cm4gdGhpcy5hY3RpdmVJZHggPiAtMSAmJiB0aGlzLmFjdGl2ZUlkeCA8IHRoaXMucmVzdWx0cy5sZW5ndGg7IH1cclxuXHJcbiAgZ2V0QWN0aXZlKCkgeyByZXR1cm4gdGhpcy5yZXN1bHRzW3RoaXMuYWN0aXZlSWR4XTsgfVxyXG5cclxuICBtYXJrQWN0aXZlKGFjdGl2ZUlkeDogbnVtYmVyKSB7XHJcbiAgICB0aGlzLmFjdGl2ZUlkeCA9IGFjdGl2ZUlkeDtcclxuICAgIHRoaXMuX2FjdGl2ZUNoYW5nZWQoKTtcclxuICB9XHJcblxyXG4gIG5leHQoKSB7XHJcbiAgICBpZiAodGhpcy5hY3RpdmVJZHggPT09IHRoaXMucmVzdWx0cy5sZW5ndGggLSAxKSB7XHJcbiAgICAgIHRoaXMuYWN0aXZlSWR4ID0gdGhpcy5mb2N1c0ZpcnN0ID8gKHRoaXMuYWN0aXZlSWR4ICsgMSkgJSB0aGlzLnJlc3VsdHMubGVuZ3RoIDogLTE7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB0aGlzLmFjdGl2ZUlkeCsrO1xyXG4gICAgfVxyXG4gICAgdGhpcy5fYWN0aXZlQ2hhbmdlZCgpO1xyXG4gIH1cclxuXHJcbiAgcHJldigpIHtcclxuICAgIGlmICh0aGlzLmFjdGl2ZUlkeCA8IDApIHtcclxuICAgICAgdGhpcy5hY3RpdmVJZHggPSB0aGlzLnJlc3VsdHMubGVuZ3RoIC0gMTtcclxuICAgIH0gZWxzZSBpZiAodGhpcy5hY3RpdmVJZHggPT09IDApIHtcclxuICAgICAgdGhpcy5hY3RpdmVJZHggPSB0aGlzLmZvY3VzRmlyc3QgPyB0aGlzLnJlc3VsdHMubGVuZ3RoIC0gMSA6IC0xO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdGhpcy5hY3RpdmVJZHgtLTtcclxuICAgIH1cclxuICAgIHRoaXMuX2FjdGl2ZUNoYW5nZWQoKTtcclxuICB9XHJcblxyXG4gIHJlc2V0QWN0aXZlKCkge1xyXG4gICAgdGhpcy5hY3RpdmVJZHggPSB0aGlzLmZvY3VzRmlyc3QgPyAwIDogLTE7XHJcbiAgICB0aGlzLl9hY3RpdmVDaGFuZ2VkKCk7XHJcbiAgfVxyXG5cclxuICBzZWxlY3QoaXRlbSkgeyB0aGlzLnNlbGVjdEV2ZW50LmVtaXQoaXRlbSk7IH1cclxuXHJcbiAgbmdPbkluaXQoKSB7IHRoaXMucmVzZXRBY3RpdmUoKTsgfVxyXG5cclxuICBwcml2YXRlIF9hY3RpdmVDaGFuZ2VkKCkge1xyXG4gICAgdGhpcy5hY3RpdmVDaGFuZ2VFdmVudC5lbWl0KHRoaXMuYWN0aXZlSWR4ID49IDAgPyB0aGlzLmlkICsgJy0nICsgdGhpcy5hY3RpdmVJZHggOiB1bmRlZmluZWQpO1xyXG4gIH1cclxufVxyXG4iLCJpbXBvcnQge0luamVjdGFibGUsIEluamVjdCwgSW5qZWN0aW9uVG9rZW4sIE9uRGVzdHJveX0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7RE9DVU1FTlR9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XHJcblxyXG5cclxuXHJcbi8vIHVzZWZ1bG5lc3MgKGFuZCBkZWZhdWx0IHZhbHVlKSBvZiBkZWxheSBkb2N1bWVudGVkIGluIE1hdGVyaWFsJ3MgQ0RLXHJcbi8vIGh0dHBzOi8vZ2l0aHViLmNvbS9hbmd1bGFyL21hdGVyaWFsMi9ibG9iLzY0MDVkYTliOGU4NTMyYTdlNWM4NTRjOTIwZWUxODE1YzI3NWQ3MzQvc3JjL2Nkay9hMTF5L2xpdmUtYW5ub3VuY2VyL2xpdmUtYW5ub3VuY2VyLnRzI0w1MFxyXG5leHBvcnQgdHlwZSBBUklBX0xJVkVfREVMQVlfVFlQRSA9IG51bWJlciB8IG51bGw7XHJcbmV4cG9ydCBjb25zdCBBUklBX0xJVkVfREVMQVkgPSBuZXcgSW5qZWN0aW9uVG9rZW48QVJJQV9MSVZFX0RFTEFZX1RZUEU+KFxyXG4gICAgJ2xpdmUgYW5ub3VuY2VyIGRlbGF5Jywge3Byb3ZpZGVkSW46ICdyb290JywgZmFjdG9yeTogQVJJQV9MSVZFX0RFTEFZX0ZBQ1RPUll9KTtcclxuZXhwb3J0IGZ1bmN0aW9uIEFSSUFfTElWRV9ERUxBWV9GQUNUT1JZKCk6IG51bWJlciB7XHJcbiAgcmV0dXJuIDEwMDtcclxufVxyXG5cclxuXHJcbmZ1bmN0aW9uIGdldExpdmVFbGVtZW50KGRvY3VtZW50OiBhbnksIGxhenlDcmVhdGUgPSBmYWxzZSk6IEhUTUxFbGVtZW50IHwgbnVsbCB7XHJcbiAgbGV0IGVsZW1lbnQgPSBkb2N1bWVudC5ib2R5LnF1ZXJ5U2VsZWN0b3IoJyNuZ2ItbGl2ZScpIGFzIEhUTUxFbGVtZW50O1xyXG5cclxuICBpZiAoZWxlbWVudCA9PSBudWxsICYmIGxhenlDcmVhdGUpIHtcclxuICAgIGVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcclxuXHJcbiAgICBlbGVtZW50LnNldEF0dHJpYnV0ZSgnaWQnLCAnbmdiLWxpdmUnKTtcclxuICAgIGVsZW1lbnQuc2V0QXR0cmlidXRlKCdhcmlhLWxpdmUnLCAncG9saXRlJyk7XHJcbiAgICBlbGVtZW50LnNldEF0dHJpYnV0ZSgnYXJpYS1hdG9taWMnLCAndHJ1ZScpO1xyXG5cclxuICAgIGVsZW1lbnQuY2xhc3NMaXN0LmFkZCgnc3Itb25seScpO1xyXG5cclxuICAgIGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQoZWxlbWVudCk7XHJcbiAgfVxyXG5cclxuICByZXR1cm4gZWxlbWVudDtcclxufVxyXG5cclxuXHJcblxyXG5ASW5qZWN0YWJsZSh7cHJvdmlkZWRJbjogJ3Jvb3QnfSlcclxuZXhwb3J0IGNsYXNzIExpdmUgaW1wbGVtZW50cyBPbkRlc3Ryb3kge1xyXG4gIGNvbnN0cnVjdG9yKEBJbmplY3QoRE9DVU1FTlQpIHByaXZhdGUgX2RvY3VtZW50OiBhbnksIEBJbmplY3QoQVJJQV9MSVZFX0RFTEFZKSBwcml2YXRlIF9kZWxheTogYW55KSB7fVxyXG5cclxuICBuZ09uRGVzdHJveSgpIHtcclxuICAgIGNvbnN0IGVsZW1lbnQgPSBnZXRMaXZlRWxlbWVudCh0aGlzLl9kb2N1bWVudCk7XHJcbiAgICBpZiAoZWxlbWVudCkge1xyXG4gICAgICBlbGVtZW50LnBhcmVudEVsZW1lbnQucmVtb3ZlQ2hpbGQoZWxlbWVudCk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBzYXkobWVzc2FnZTogc3RyaW5nKSB7XHJcbiAgICBjb25zdCBlbGVtZW50ID0gZ2V0TGl2ZUVsZW1lbnQodGhpcy5fZG9jdW1lbnQsIHRydWUpO1xyXG4gICAgY29uc3QgZGVsYXkgPSB0aGlzLl9kZWxheTtcclxuXHJcbiAgICBlbGVtZW50LnRleHRDb250ZW50ID0gJyc7XHJcbiAgICBjb25zdCBzZXRUZXh0ID0gKCkgPT4gZWxlbWVudC50ZXh0Q29udGVudCA9IG1lc3NhZ2U7XHJcbiAgICBpZiAoZGVsYXkgPT09IG51bGwpIHtcclxuICAgICAgc2V0VGV4dCgpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgc2V0VGltZW91dChzZXRUZXh0LCBkZWxheSk7XHJcbiAgICB9XHJcbiAgfVxyXG59XHJcbiIsImltcG9ydCB7SW5qZWN0YWJsZX0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7UGxhY2VtZW50QXJyYXl9IGZyb20gJy4uL3V0aWwvcG9zaXRpb25pbmcnO1xyXG5cclxuLyoqXHJcbiAqIENvbmZpZ3VyYXRpb24gc2VydmljZSBmb3IgdGhlIE5nYlR5cGVhaGVhZCBjb21wb25lbnQuXHJcbiAqIFlvdSBjYW4gaW5qZWN0IHRoaXMgc2VydmljZSwgdHlwaWNhbGx5IGluIHlvdXIgcm9vdCBjb21wb25lbnQsIGFuZCBjdXN0b21pemUgdGhlIHZhbHVlcyBvZiBpdHMgcHJvcGVydGllcyBpblxyXG4gKiBvcmRlciB0byBwcm92aWRlIGRlZmF1bHQgdmFsdWVzIGZvciBhbGwgdGhlIHR5cGVhaGVhZHMgdXNlZCBpbiB0aGUgYXBwbGljYXRpb24uXHJcbiAqL1xyXG5ASW5qZWN0YWJsZSh7cHJvdmlkZWRJbjogJ3Jvb3QnfSlcclxuZXhwb3J0IGNsYXNzIE5nYlR5cGVhaGVhZENvbmZpZyB7XHJcbiAgY29udGFpbmVyO1xyXG4gIGVkaXRhYmxlID0gdHJ1ZTtcclxuICBmb2N1c0ZpcnN0ID0gdHJ1ZTtcclxuICBzaG93SGludCA9IGZhbHNlO1xyXG4gIHBsYWNlbWVudDogUGxhY2VtZW50QXJyYXkgPSAnYm90dG9tLWxlZnQnO1xyXG59XHJcbiIsImltcG9ydCB7XHJcbiAgQ29tcG9uZW50RmFjdG9yeVJlc29sdmVyLFxyXG4gIENvbXBvbmVudFJlZixcclxuICBEaXJlY3RpdmUsXHJcbiAgRWxlbWVudFJlZixcclxuICBFdmVudEVtaXR0ZXIsXHJcbiAgZm9yd2FyZFJlZixcclxuICBJbmplY3RvcixcclxuICBJbnB1dCxcclxuICBOZ1pvbmUsXHJcbiAgT25EZXN0cm95LFxyXG4gIE9uSW5pdCxcclxuICBPdXRwdXQsXHJcbiAgUmVuZGVyZXIyLFxyXG4gIFRlbXBsYXRlUmVmLFxyXG4gIFZpZXdDb250YWluZXJSZWZcclxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHtDb250cm9sVmFsdWVBY2Nlc3NvciwgTkdfVkFMVUVfQUNDRVNTT1J9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcclxuaW1wb3J0IHtPYnNlcnZhYmxlLCBCZWhhdmlvclN1YmplY3QsIFN1YnNjcmlwdGlvbiwgZnJvbUV2ZW50fSBmcm9tICdyeGpzJztcclxuaW1wb3J0IHtwb3NpdGlvbkVsZW1lbnRzLCBQbGFjZW1lbnRBcnJheX0gZnJvbSAnLi4vdXRpbC9wb3NpdGlvbmluZyc7XHJcbmltcG9ydCB7TmdiVHlwZWFoZWFkV2luZG93LCBSZXN1bHRUZW1wbGF0ZUNvbnRleHR9IGZyb20gJy4vdHlwZWFoZWFkLXdpbmRvdyc7XHJcbmltcG9ydCB7UG9wdXBTZXJ2aWNlfSBmcm9tICcuLi91dGlsL3BvcHVwJztcclxuaW1wb3J0IHt0b1N0cmluZywgaXNEZWZpbmVkfSBmcm9tICcuLi91dGlsL3V0aWwnO1xyXG5pbXBvcnQge0tleX0gZnJvbSAnLi4vdXRpbC9rZXknO1xyXG5pbXBvcnQge0xpdmV9IGZyb20gJy4uL3V0aWwvYWNjZXNzaWJpbGl0eS9saXZlJztcclxuaW1wb3J0IHtOZ2JUeXBlYWhlYWRDb25maWd9IGZyb20gJy4vdHlwZWFoZWFkLWNvbmZpZyc7XHJcbmltcG9ydCB7bWFwLCBzd2l0Y2hNYXAsIHRhcH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xyXG5cclxuY29uc3QgTkdCX1RZUEVBSEVBRF9WQUxVRV9BQ0NFU1NPUiA9IHtcclxuICBwcm92aWRlOiBOR19WQUxVRV9BQ0NFU1NPUixcclxuICB1c2VFeGlzdGluZzogZm9yd2FyZFJlZigoKSA9PiBOZ2JUeXBlYWhlYWQpLFxyXG4gIG11bHRpOiB0cnVlXHJcbn07XHJcblxyXG4vKipcclxuICogUGF5bG9hZCBvZiB0aGUgc2VsZWN0SXRlbSBldmVudC5cclxuICovXHJcbmV4cG9ydCBpbnRlcmZhY2UgTmdiVHlwZWFoZWFkU2VsZWN0SXRlbUV2ZW50IHtcclxuICAvKipcclxuICAgKiBBbiBpdGVtIGFib3V0IHRvIGJlIHNlbGVjdGVkXHJcbiAgICovXHJcbiAgaXRlbTogYW55O1xyXG5cclxuICAvKipcclxuICAgKiBGdW5jdGlvbiB0aGF0IHdpbGwgcHJldmVudCBpdGVtIHNlbGVjdGlvbiBpZiBjYWxsZWRcclxuICAgKi9cclxuICBwcmV2ZW50RGVmYXVsdDogKCkgPT4gdm9pZDtcclxufVxyXG5cclxubGV0IG5leHRXaW5kb3dJZCA9IDA7XHJcblxyXG4vKipcclxuICogTmdiVHlwZWFoZWFkIGRpcmVjdGl2ZSBwcm92aWRlcyBhIHNpbXBsZSB3YXkgb2YgY3JlYXRpbmcgcG93ZXJmdWwgdHlwZWFoZWFkcyBmcm9tIGFueSB0ZXh0IGlucHV0XHJcbiAqL1xyXG5ARGlyZWN0aXZlKHtcclxuICBzZWxlY3RvcjogJ2lucHV0W25nYlR5cGVhaGVhZF0nLFxyXG4gIGV4cG9ydEFzOiAnbmdiVHlwZWFoZWFkJyxcclxuICBob3N0OiB7XHJcbiAgICAnKGJsdXIpJzogJ2hhbmRsZUJsdXIoKScsXHJcbiAgICAnW2NsYXNzLm9wZW5dJzogJ2lzUG9wdXBPcGVuKCknLFxyXG4gICAgJyhkb2N1bWVudDpjbGljayknOiAnb25Eb2N1bWVudENsaWNrKCRldmVudCknLFxyXG4gICAgJyhrZXlkb3duKSc6ICdoYW5kbGVLZXlEb3duKCRldmVudCknLFxyXG4gICAgJ1thdXRvY29tcGxldGVdJzogJ2F1dG9jb21wbGV0ZScsXHJcbiAgICAnYXV0b2NhcGl0YWxpemUnOiAnb2ZmJyxcclxuICAgICdhdXRvY29ycmVjdCc6ICdvZmYnLFxyXG4gICAgJ3JvbGUnOiAnY29tYm9ib3gnLFxyXG4gICAgJ2FyaWEtbXVsdGlsaW5lJzogJ2ZhbHNlJyxcclxuICAgICdbYXR0ci5hcmlhLWF1dG9jb21wbGV0ZV0nOiAnc2hvd0hpbnQgPyBcImJvdGhcIiA6IFwibGlzdFwiJyxcclxuICAgICdbYXR0ci5hcmlhLWFjdGl2ZWRlc2NlbmRhbnRdJzogJ2FjdGl2ZURlc2NlbmRhbnQnLFxyXG4gICAgJ1thdHRyLmFyaWEtb3duc10nOiAnaXNQb3B1cE9wZW4oKSA/IHBvcHVwSWQgOiBudWxsJyxcclxuICAgICdbYXR0ci5hcmlhLWV4cGFuZGVkXSc6ICdpc1BvcHVwT3BlbigpJ1xyXG4gIH0sXHJcbiAgcHJvdmlkZXJzOiBbTkdCX1RZUEVBSEVBRF9WQUxVRV9BQ0NFU1NPUl1cclxufSlcclxuZXhwb3J0IGNsYXNzIE5nYlR5cGVhaGVhZCBpbXBsZW1lbnRzIENvbnRyb2xWYWx1ZUFjY2Vzc29yLFxyXG4gICAgT25Jbml0LCBPbkRlc3Ryb3kge1xyXG4gIHByaXZhdGUgX3BvcHVwU2VydmljZTogUG9wdXBTZXJ2aWNlPE5nYlR5cGVhaGVhZFdpbmRvdz47XHJcbiAgcHJpdmF0ZSBfc3Vic2NyaXB0aW9uOiBTdWJzY3JpcHRpb247XHJcbiAgcHJpdmF0ZSBfaW5wdXRWYWx1ZUJhY2t1cDogc3RyaW5nO1xyXG4gIHByaXZhdGUgX3ZhbHVlQ2hhbmdlczogT2JzZXJ2YWJsZTxzdHJpbmc+O1xyXG4gIHByaXZhdGUgX3Jlc3Vic2NyaWJlVHlwZWFoZWFkOiBCZWhhdmlvclN1YmplY3Q8YW55PjtcclxuICBwcml2YXRlIF93aW5kb3dSZWY6IENvbXBvbmVudFJlZjxOZ2JUeXBlYWhlYWRXaW5kb3c+O1xyXG4gIHByaXZhdGUgX3pvbmVTdWJzY3JpcHRpb246IGFueTtcclxuXHJcbiAgLyoqXHJcbiAgICogVmFsdWUgZm9yIHRoZSBjb25maWd1cmFibGUgYXV0b2NvbXBsZXRlIGF0dHJpYnV0ZS5cclxuICAgKiBEZWZhdWx0cyB0byAnb2ZmJyB0byBkaXNhYmxlIHRoZSBuYXRpdmUgYnJvd3NlciBhdXRvY29tcGxldGUsIGJ1dCB0aGlzIHN0YW5kYXJkIHZhbHVlIGRvZXMgbm90IHNlZW1cclxuICAgKiB0byBiZSBhbHdheXMgY29ycmVjdGx5IHRha2VuIGludG8gYWNjb3VudC5cclxuICAgKlxyXG4gICAqIEBzaW5jZSAyLjEuMFxyXG4gICAqL1xyXG4gIEBJbnB1dCgpIGF1dG9jb21wbGV0ZSA9ICdvZmYnO1xyXG5cclxuICAvKipcclxuICAgKiBBIHNlbGVjdG9yIHNwZWNpZnlpbmcgdGhlIGVsZW1lbnQgdGhlIHRvb2x0aXAgc2hvdWxkIGJlIGFwcGVuZGVkIHRvLlxyXG4gICAqIEN1cnJlbnRseSBvbmx5IHN1cHBvcnRzIFwiYm9keVwiLlxyXG4gICAqL1xyXG4gIEBJbnB1dCgpIGNvbnRhaW5lcjogc3RyaW5nO1xyXG5cclxuICAvKipcclxuICAgKiBBIGZsYWcgaW5kaWNhdGluZyBpZiBtb2RlbCB2YWx1ZXMgc2hvdWxkIGJlIHJlc3RyaWN0ZWQgdG8gdGhlIG9uZXMgc2VsZWN0ZWQgZnJvbSB0aGUgcG9wdXAgb25seS5cclxuICAgKi9cclxuICBASW5wdXQoKSBlZGl0YWJsZTogYm9vbGVhbjtcclxuXHJcbiAgLyoqXHJcbiAgICogQSBmbGFnIGluZGljYXRpbmcgaWYgdGhlIGZpcnN0IG1hdGNoIHNob3VsZCBhdXRvbWF0aWNhbGx5IGJlIGZvY3VzZWQgYXMgeW91IHR5cGUuXHJcbiAgICovXHJcbiAgQElucHV0KCkgZm9jdXNGaXJzdDogYm9vbGVhbjtcclxuXHJcbiAgLyoqXHJcbiAgICogQSBmdW5jdGlvbiB0byBjb252ZXJ0IGEgZ2l2ZW4gdmFsdWUgaW50byBzdHJpbmcgdG8gZGlzcGxheSBpbiB0aGUgaW5wdXQgZmllbGRcclxuICAgKi9cclxuICBASW5wdXQoKSBpbnB1dEZvcm1hdHRlcjogKHZhbHVlOiBhbnkpID0+IHN0cmluZztcclxuXHJcbiAgLyoqXHJcbiAgICogQSBmdW5jdGlvbiB0byB0cmFuc2Zvcm0gdGhlIHByb3ZpZGVkIG9ic2VydmFibGUgdGV4dCBpbnRvIHRoZSBhcnJheSBvZiByZXN1bHRzLiAgTm90ZSB0aGF0IHRoZSBcInRoaXNcIiBhcmd1bWVudFxyXG4gICAqIGlzIHVuZGVmaW5lZCBzbyB5b3UgbmVlZCB0byBleHBsaWNpdGx5IGJpbmQgaXQgdG8gYSBkZXNpcmVkIFwidGhpc1wiIHRhcmdldC5cclxuICAgKi9cclxuICBASW5wdXQoKSBuZ2JUeXBlYWhlYWQ6ICh0ZXh0OiBPYnNlcnZhYmxlPHN0cmluZz4pID0+IE9ic2VydmFibGU8YW55W10+O1xyXG5cclxuICAvKipcclxuICAgKiBBIGZ1bmN0aW9uIHRvIGZvcm1hdCBhIGdpdmVuIHJlc3VsdCBiZWZvcmUgZGlzcGxheS4gVGhpcyBmdW5jdGlvbiBzaG91bGQgcmV0dXJuIGEgZm9ybWF0dGVkIHN0cmluZyB3aXRob3V0IGFueVxyXG4gICAqIEhUTUwgbWFya3VwXHJcbiAgICovXHJcbiAgQElucHV0KCkgcmVzdWx0Rm9ybWF0dGVyOiAodmFsdWU6IGFueSkgPT4gc3RyaW5nO1xyXG5cclxuICAvKipcclxuICAgKiBBIHRlbXBsYXRlIHRvIG92ZXJyaWRlIGEgbWF0Y2hpbmcgcmVzdWx0IGRlZmF1bHQgZGlzcGxheVxyXG4gICAqL1xyXG4gIEBJbnB1dCgpIHJlc3VsdFRlbXBsYXRlOiBUZW1wbGF0ZVJlZjxSZXN1bHRUZW1wbGF0ZUNvbnRleHQ+O1xyXG5cclxuICAvKipcclxuICAgKiBTaG93IGhpbnQgd2hlbiBhbiBvcHRpb24gaW4gdGhlIHJlc3VsdCBsaXN0IG1hdGNoZXMuXHJcbiAgICovXHJcbiAgQElucHV0KCkgc2hvd0hpbnQ6IGJvb2xlYW47XHJcblxyXG4gIC8qKiBQbGFjZW1lbnQgb2YgYSB0eXBlYWhlYWQgYWNjZXB0czpcclxuICAgKiAgICBcInRvcFwiLCBcInRvcC1sZWZ0XCIsIFwidG9wLXJpZ2h0XCIsIFwiYm90dG9tXCIsIFwiYm90dG9tLWxlZnRcIiwgXCJib3R0b20tcmlnaHRcIixcclxuICAgKiAgICBcImxlZnRcIiwgXCJsZWZ0LXRvcFwiLCBcImxlZnQtYm90dG9tXCIsIFwicmlnaHRcIiwgXCJyaWdodC10b3BcIiwgXCJyaWdodC1ib3R0b21cIlxyXG4gICAqIGFuZCBhcnJheSBvZiBhYm92ZSB2YWx1ZXMuXHJcbiAgKi9cclxuICBASW5wdXQoKSBwbGFjZW1lbnQ6IFBsYWNlbWVudEFycmF5ID0gJ2JvdHRvbS1sZWZ0JztcclxuXHJcbiAgLyoqXHJcbiAgICogQW4gZXZlbnQgZW1pdHRlZCB3aGVuIGEgbWF0Y2ggaXMgc2VsZWN0ZWQuIEV2ZW50IHBheWxvYWQgaXMgb2YgdHlwZSBOZ2JUeXBlYWhlYWRTZWxlY3RJdGVtRXZlbnQuXHJcbiAgICovXHJcbiAgQE91dHB1dCgpIHNlbGVjdEl0ZW0gPSBuZXcgRXZlbnRFbWl0dGVyPE5nYlR5cGVhaGVhZFNlbGVjdEl0ZW1FdmVudD4oKTtcclxuXHJcbiAgYWN0aXZlRGVzY2VuZGFudDogc3RyaW5nO1xyXG4gIHBvcHVwSWQgPSBgbmdiLXR5cGVhaGVhZC0ke25leHRXaW5kb3dJZCsrfWA7XHJcblxyXG4gIHByaXZhdGUgX29uVG91Y2hlZCA9ICgpID0+IHt9O1xyXG4gIHByaXZhdGUgX29uQ2hhbmdlID0gKF86IGFueSkgPT4ge307XHJcblxyXG4gIGNvbnN0cnVjdG9yKFxyXG4gICAgICBwcml2YXRlIF9lbGVtZW50UmVmOiBFbGVtZW50UmVmPEhUTUxJbnB1dEVsZW1lbnQ+LCBwcml2YXRlIF92aWV3Q29udGFpbmVyUmVmOiBWaWV3Q29udGFpbmVyUmVmLFxyXG4gICAgICBwcml2YXRlIF9yZW5kZXJlcjogUmVuZGVyZXIyLCBwcml2YXRlIF9pbmplY3RvcjogSW5qZWN0b3IsIGNvbXBvbmVudEZhY3RvcnlSZXNvbHZlcjogQ29tcG9uZW50RmFjdG9yeVJlc29sdmVyLFxyXG4gICAgICBjb25maWc6IE5nYlR5cGVhaGVhZENvbmZpZywgbmdab25lOiBOZ1pvbmUsIHByaXZhdGUgX2xpdmU6IExpdmUpIHtcclxuICAgIHRoaXMuY29udGFpbmVyID0gY29uZmlnLmNvbnRhaW5lcjtcclxuICAgIHRoaXMuZWRpdGFibGUgPSBjb25maWcuZWRpdGFibGU7XHJcbiAgICB0aGlzLmZvY3VzRmlyc3QgPSBjb25maWcuZm9jdXNGaXJzdDtcclxuICAgIHRoaXMuc2hvd0hpbnQgPSBjb25maWcuc2hvd0hpbnQ7XHJcbiAgICB0aGlzLnBsYWNlbWVudCA9IGNvbmZpZy5wbGFjZW1lbnQ7XHJcblxyXG4gICAgdGhpcy5fdmFsdWVDaGFuZ2VzID0gZnJvbUV2ZW50PEV2ZW50PihfZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50LCAnaW5wdXQnKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5waXBlKG1hcCgkZXZlbnQgPT4gKCRldmVudC50YXJnZXQgYXMgSFRNTElucHV0RWxlbWVudCkudmFsdWUpKTtcclxuXHJcbiAgICB0aGlzLl9yZXN1YnNjcmliZVR5cGVhaGVhZCA9IG5ldyBCZWhhdmlvclN1YmplY3QobnVsbCk7XHJcblxyXG4gICAgdGhpcy5fcG9wdXBTZXJ2aWNlID0gbmV3IFBvcHVwU2VydmljZTxOZ2JUeXBlYWhlYWRXaW5kb3c+KFxyXG4gICAgICAgIE5nYlR5cGVhaGVhZFdpbmRvdywgX2luamVjdG9yLCBfdmlld0NvbnRhaW5lclJlZiwgX3JlbmRlcmVyLCBjb21wb25lbnRGYWN0b3J5UmVzb2x2ZXIpO1xyXG5cclxuICAgIHRoaXMuX3pvbmVTdWJzY3JpcHRpb24gPSBuZ1pvbmUub25TdGFibGUuc3Vic2NyaWJlKCgpID0+IHtcclxuICAgICAgaWYgKHRoaXMuaXNQb3B1cE9wZW4oKSkge1xyXG4gICAgICAgIHBvc2l0aW9uRWxlbWVudHMoXHJcbiAgICAgICAgICAgIHRoaXMuX2VsZW1lbnRSZWYubmF0aXZlRWxlbWVudCwgdGhpcy5fd2luZG93UmVmLmxvY2F0aW9uLm5hdGl2ZUVsZW1lbnQsIHRoaXMucGxhY2VtZW50LFxyXG4gICAgICAgICAgICB0aGlzLmNvbnRhaW5lciA9PT0gJ2JvZHknKTtcclxuICAgICAgfVxyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICBuZ09uSW5pdCgpOiB2b2lkIHtcclxuICAgIGNvbnN0IGlucHV0VmFsdWVzJCA9IHRoaXMuX3ZhbHVlQ2hhbmdlcy5waXBlKHRhcCh2YWx1ZSA9PiB7XHJcbiAgICAgIHRoaXMuX2lucHV0VmFsdWVCYWNrdXAgPSB2YWx1ZTtcclxuICAgICAgaWYgKHRoaXMuZWRpdGFibGUpIHtcclxuICAgICAgICB0aGlzLl9vbkNoYW5nZSh2YWx1ZSk7XHJcbiAgICAgIH1cclxuICAgIH0pKTtcclxuICAgIGNvbnN0IHJlc3VsdHMkID0gaW5wdXRWYWx1ZXMkLnBpcGUodGhpcy5uZ2JUeXBlYWhlYWQpO1xyXG4gICAgY29uc3QgcHJvY2Vzc2VkUmVzdWx0cyQgPSByZXN1bHRzJC5waXBlKHRhcCgoKSA9PiB7XHJcbiAgICAgIGlmICghdGhpcy5lZGl0YWJsZSkge1xyXG4gICAgICAgIHRoaXMuX29uQ2hhbmdlKHVuZGVmaW5lZCk7XHJcbiAgICAgIH1cclxuICAgIH0pKTtcclxuICAgIGNvbnN0IHVzZXJJbnB1dCQgPSB0aGlzLl9yZXN1YnNjcmliZVR5cGVhaGVhZC5waXBlKHN3aXRjaE1hcCgoKSA9PiBwcm9jZXNzZWRSZXN1bHRzJCkpO1xyXG4gICAgdGhpcy5fc3Vic2NyaXB0aW9uID0gdGhpcy5fc3Vic2NyaWJlVG9Vc2VySW5wdXQodXNlcklucHV0JCk7XHJcbiAgfVxyXG5cclxuICBuZ09uRGVzdHJveSgpOiB2b2lkIHtcclxuICAgIHRoaXMuX2Nsb3NlUG9wdXAoKTtcclxuICAgIHRoaXMuX3Vuc3Vic2NyaWJlRnJvbVVzZXJJbnB1dCgpO1xyXG4gICAgdGhpcy5fem9uZVN1YnNjcmlwdGlvbi51bnN1YnNjcmliZSgpO1xyXG4gIH1cclxuXHJcbiAgcmVnaXN0ZXJPbkNoYW5nZShmbjogKHZhbHVlOiBhbnkpID0+IGFueSk6IHZvaWQgeyB0aGlzLl9vbkNoYW5nZSA9IGZuOyB9XHJcblxyXG4gIHJlZ2lzdGVyT25Ub3VjaGVkKGZuOiAoKSA9PiBhbnkpOiB2b2lkIHsgdGhpcy5fb25Ub3VjaGVkID0gZm47IH1cclxuXHJcbiAgd3JpdGVWYWx1ZSh2YWx1ZSkgeyB0aGlzLl93cml0ZUlucHV0VmFsdWUodGhpcy5fZm9ybWF0SXRlbUZvcklucHV0KHZhbHVlKSk7IH1cclxuXHJcbiAgc2V0RGlzYWJsZWRTdGF0ZShpc0Rpc2FibGVkOiBib29sZWFuKTogdm9pZCB7XHJcbiAgICB0aGlzLl9yZW5kZXJlci5zZXRQcm9wZXJ0eSh0aGlzLl9lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQsICdkaXNhYmxlZCcsIGlzRGlzYWJsZWQpO1xyXG4gIH1cclxuXHJcbiAgb25Eb2N1bWVudENsaWNrKGV2ZW50KSB7XHJcbiAgICBpZiAoZXZlbnQudGFyZ2V0ICE9PSB0aGlzLl9lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQpIHtcclxuICAgICAgdGhpcy5kaXNtaXNzUG9wdXAoKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIERpc21pc3NlcyB0eXBlYWhlYWQgcG9wdXAgd2luZG93XHJcbiAgICovXHJcbiAgZGlzbWlzc1BvcHVwKCkge1xyXG4gICAgaWYgKHRoaXMuaXNQb3B1cE9wZW4oKSkge1xyXG4gICAgICB0aGlzLl9jbG9zZVBvcHVwKCk7XHJcbiAgICAgIHRoaXMuX3dyaXRlSW5wdXRWYWx1ZSh0aGlzLl9pbnB1dFZhbHVlQmFja3VwKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFJldHVybnMgdHJ1ZSBpZiB0aGUgdHlwZWFoZWFkIHBvcHVwIHdpbmRvdyBpcyBkaXNwbGF5ZWRcclxuICAgKi9cclxuICBpc1BvcHVwT3BlbigpIHsgcmV0dXJuIHRoaXMuX3dpbmRvd1JlZiAhPSBudWxsOyB9XHJcblxyXG4gIGhhbmRsZUJsdXIoKSB7XHJcbiAgICB0aGlzLl9yZXN1YnNjcmliZVR5cGVhaGVhZC5uZXh0KG51bGwpO1xyXG4gICAgdGhpcy5fb25Ub3VjaGVkKCk7XHJcbiAgfVxyXG5cclxuICBoYW5kbGVLZXlEb3duKGV2ZW50OiBLZXlib2FyZEV2ZW50KSB7XHJcbiAgICBpZiAoIXRoaXMuaXNQb3B1cE9wZW4oKSkge1xyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKEtleVt0b1N0cmluZyhldmVudC53aGljaCldKSB7XHJcbiAgICAgIHN3aXRjaCAoZXZlbnQud2hpY2gpIHtcclxuICAgICAgICBjYXNlIEtleS5BcnJvd0Rvd246XHJcbiAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAgICAgdGhpcy5fd2luZG93UmVmLmluc3RhbmNlLm5leHQoKTtcclxuICAgICAgICAgIHRoaXMuX3Nob3dIaW50KCk7XHJcbiAgICAgICAgICBicmVhaztcclxuICAgICAgICBjYXNlIEtleS5BcnJvd1VwOlxyXG4gICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICAgIHRoaXMuX3dpbmRvd1JlZi5pbnN0YW5jZS5wcmV2KCk7XHJcbiAgICAgICAgICB0aGlzLl9zaG93SGludCgpO1xyXG4gICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgY2FzZSBLZXkuRW50ZXI6XHJcbiAgICAgICAgY2FzZSBLZXkuVGFiOlxyXG4gICAgICAgICAgY29uc3QgcmVzdWx0ID0gdGhpcy5fd2luZG93UmVmLmluc3RhbmNlLmdldEFjdGl2ZSgpO1xyXG4gICAgICAgICAgaWYgKGlzRGVmaW5lZChyZXN1bHQpKSB7XHJcbiAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xyXG4gICAgICAgICAgICB0aGlzLl9zZWxlY3RSZXN1bHQocmVzdWx0KTtcclxuICAgICAgICAgIH1cclxuICAgICAgICAgIHRoaXMuX2Nsb3NlUG9wdXAoKTtcclxuICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIGNhc2UgS2V5LkVzY2FwZTpcclxuICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgICB0aGlzLl9yZXN1YnNjcmliZVR5cGVhaGVhZC5uZXh0KG51bGwpO1xyXG4gICAgICAgICAgdGhpcy5kaXNtaXNzUG9wdXAoKTtcclxuICAgICAgICAgIGJyZWFrO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIF9vcGVuUG9wdXAoKSB7XHJcbiAgICBpZiAoIXRoaXMuaXNQb3B1cE9wZW4oKSkge1xyXG4gICAgICB0aGlzLl9pbnB1dFZhbHVlQmFja3VwID0gdGhpcy5fZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50LnZhbHVlO1xyXG4gICAgICB0aGlzLl93aW5kb3dSZWYgPSB0aGlzLl9wb3B1cFNlcnZpY2Uub3BlbigpO1xyXG4gICAgICB0aGlzLl93aW5kb3dSZWYuaW5zdGFuY2UuaWQgPSB0aGlzLnBvcHVwSWQ7XHJcbiAgICAgIHRoaXMuX3dpbmRvd1JlZi5pbnN0YW5jZS5zZWxlY3RFdmVudC5zdWJzY3JpYmUoKHJlc3VsdDogYW55KSA9PiB0aGlzLl9zZWxlY3RSZXN1bHRDbG9zZVBvcHVwKHJlc3VsdCkpO1xyXG4gICAgICB0aGlzLl93aW5kb3dSZWYuaW5zdGFuY2UuYWN0aXZlQ2hhbmdlRXZlbnQuc3Vic2NyaWJlKChhY3RpdmVJZDogc3RyaW5nKSA9PiB0aGlzLmFjdGl2ZURlc2NlbmRhbnQgPSBhY3RpdmVJZCk7XHJcblxyXG4gICAgICBpZiAodGhpcy5jb250YWluZXIgPT09ICdib2R5Jykge1xyXG4gICAgICAgIHdpbmRvdy5kb2N1bWVudC5xdWVyeVNlbGVjdG9yKHRoaXMuY29udGFpbmVyKS5hcHBlbmRDaGlsZCh0aGlzLl93aW5kb3dSZWYubG9jYXRpb24ubmF0aXZlRWxlbWVudCk7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9XHJcblxyXG4gIHByaXZhdGUgX2Nsb3NlUG9wdXAoKSB7XHJcbiAgICB0aGlzLl9wb3B1cFNlcnZpY2UuY2xvc2UoKTtcclxuICAgIHRoaXMuX3dpbmRvd1JlZiA9IG51bGw7XHJcbiAgICB0aGlzLmFjdGl2ZURlc2NlbmRhbnQgPSB1bmRlZmluZWQ7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIF9zZWxlY3RSZXN1bHQocmVzdWx0OiBhbnkpIHtcclxuICAgIGxldCBkZWZhdWx0UHJldmVudGVkID0gZmFsc2U7XHJcbiAgICB0aGlzLnNlbGVjdEl0ZW0uZW1pdCh7aXRlbTogcmVzdWx0LCBwcmV2ZW50RGVmYXVsdDogKCkgPT4geyBkZWZhdWx0UHJldmVudGVkID0gdHJ1ZTsgfX0pO1xyXG4gICAgdGhpcy5fcmVzdWJzY3JpYmVUeXBlYWhlYWQubmV4dChudWxsKTtcclxuXHJcbiAgICBpZiAoIWRlZmF1bHRQcmV2ZW50ZWQpIHtcclxuICAgICAgdGhpcy53cml0ZVZhbHVlKHJlc3VsdCk7XHJcbiAgICAgIHRoaXMuX29uQ2hhbmdlKHJlc3VsdCk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIF9zZWxlY3RSZXN1bHRDbG9zZVBvcHVwKHJlc3VsdDogYW55KSB7XHJcbiAgICB0aGlzLl9zZWxlY3RSZXN1bHQocmVzdWx0KTtcclxuICAgIHRoaXMuX2Nsb3NlUG9wdXAoKTtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgX3Nob3dIaW50KCkge1xyXG4gICAgaWYgKHRoaXMuc2hvd0hpbnQgJiYgdGhpcy5fd2luZG93UmVmLmluc3RhbmNlLmhhc0FjdGl2ZSgpICYmIHRoaXMuX2lucHV0VmFsdWVCYWNrdXAgIT0gbnVsbCkge1xyXG4gICAgICBjb25zdCB1c2VySW5wdXRMb3dlckNhc2UgPSB0aGlzLl9pbnB1dFZhbHVlQmFja3VwLnRvTG93ZXJDYXNlKCk7XHJcbiAgICAgIGNvbnN0IGZvcm1hdHRlZFZhbCA9IHRoaXMuX2Zvcm1hdEl0ZW1Gb3JJbnB1dCh0aGlzLl93aW5kb3dSZWYuaW5zdGFuY2UuZ2V0QWN0aXZlKCkpO1xyXG5cclxuICAgICAgaWYgKHVzZXJJbnB1dExvd2VyQ2FzZSA9PT0gZm9ybWF0dGVkVmFsLnN1YnN0cigwLCB0aGlzLl9pbnB1dFZhbHVlQmFja3VwLmxlbmd0aCkudG9Mb3dlckNhc2UoKSkge1xyXG4gICAgICAgIHRoaXMuX3dyaXRlSW5wdXRWYWx1ZSh0aGlzLl9pbnB1dFZhbHVlQmFja3VwICsgZm9ybWF0dGVkVmFsLnN1YnN0cih0aGlzLl9pbnB1dFZhbHVlQmFja3VwLmxlbmd0aCkpO1xyXG4gICAgICAgIHRoaXMuX2VsZW1lbnRSZWYubmF0aXZlRWxlbWVudFsnc2V0U2VsZWN0aW9uUmFuZ2UnXS5hcHBseShcclxuICAgICAgICAgICAgdGhpcy5fZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50LCBbdGhpcy5faW5wdXRWYWx1ZUJhY2t1cC5sZW5ndGgsIGZvcm1hdHRlZFZhbC5sZW5ndGhdKTtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICB0aGlzLndyaXRlVmFsdWUodGhpcy5fd2luZG93UmVmLmluc3RhbmNlLmdldEFjdGl2ZSgpKTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBfZm9ybWF0SXRlbUZvcklucHV0KGl0ZW06IGFueSk6IHN0cmluZyB7XHJcbiAgICByZXR1cm4gaXRlbSAhPSBudWxsICYmIHRoaXMuaW5wdXRGb3JtYXR0ZXIgPyB0aGlzLmlucHV0Rm9ybWF0dGVyKGl0ZW0pIDogdG9TdHJpbmcoaXRlbSk7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIF93cml0ZUlucHV0VmFsdWUodmFsdWU6IHN0cmluZyk6IHZvaWQge1xyXG4gICAgdGhpcy5fcmVuZGVyZXIuc2V0UHJvcGVydHkodGhpcy5fZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50LCAndmFsdWUnLCB0b1N0cmluZyh2YWx1ZSkpO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBfc3Vic2NyaWJlVG9Vc2VySW5wdXQodXNlcklucHV0JDogT2JzZXJ2YWJsZTxhbnlbXT4pOiBTdWJzY3JpcHRpb24ge1xyXG4gICAgcmV0dXJuIHVzZXJJbnB1dCQuc3Vic2NyaWJlKChyZXN1bHRzKSA9PiB7XHJcbiAgICAgIGlmICghcmVzdWx0cyB8fCByZXN1bHRzLmxlbmd0aCA9PT0gMCkge1xyXG4gICAgICAgIHRoaXMuX2Nsb3NlUG9wdXAoKTtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICB0aGlzLl9vcGVuUG9wdXAoKTtcclxuICAgICAgICB0aGlzLl93aW5kb3dSZWYuaW5zdGFuY2UuZm9jdXNGaXJzdCA9IHRoaXMuZm9jdXNGaXJzdDtcclxuICAgICAgICB0aGlzLl93aW5kb3dSZWYuaW5zdGFuY2UucmVzdWx0cyA9IHJlc3VsdHM7XHJcbiAgICAgICAgdGhpcy5fd2luZG93UmVmLmluc3RhbmNlLnRlcm0gPSB0aGlzLl9lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQudmFsdWU7XHJcbiAgICAgICAgaWYgKHRoaXMucmVzdWx0Rm9ybWF0dGVyKSB7XHJcbiAgICAgICAgICB0aGlzLl93aW5kb3dSZWYuaW5zdGFuY2UuZm9ybWF0dGVyID0gdGhpcy5yZXN1bHRGb3JtYXR0ZXI7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICh0aGlzLnJlc3VsdFRlbXBsYXRlKSB7XHJcbiAgICAgICAgICB0aGlzLl93aW5kb3dSZWYuaW5zdGFuY2UucmVzdWx0VGVtcGxhdGUgPSB0aGlzLnJlc3VsdFRlbXBsYXRlO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLl93aW5kb3dSZWYuaW5zdGFuY2UucmVzZXRBY3RpdmUoKTtcclxuXHJcbiAgICAgICAgLy8gVGhlIG9ic2VydmFibGUgc3RyZWFtIHdlIGFyZSBzdWJzY3JpYmluZyB0byBtaWdodCBoYXZlIGFzeW5jIHN0ZXBzXHJcbiAgICAgICAgLy8gYW5kIGlmIGEgY29tcG9uZW50IGNvbnRhaW5pbmcgdHlwZWFoZWFkIGlzIHVzaW5nIHRoZSBPblB1c2ggc3RyYXRlZ3lcclxuICAgICAgICAvLyB0aGUgY2hhbmdlIGRldGVjdGlvbiB0dXJuIHdvdWxkbid0IGJlIGludm9rZWQgYXV0b21hdGljYWxseS5cclxuICAgICAgICB0aGlzLl93aW5kb3dSZWYuY2hhbmdlRGV0ZWN0b3JSZWYuZGV0ZWN0Q2hhbmdlcygpO1xyXG5cclxuICAgICAgICB0aGlzLl9zaG93SGludCgpO1xyXG4gICAgICB9XHJcblxyXG4gICAgICAvLyBsaXZlIGFubm91bmNlclxyXG4gICAgICBjb25zdCBjb3VudCA9IHJlc3VsdHMgPyByZXN1bHRzLmxlbmd0aCA6IDA7XHJcbiAgICAgIHRoaXMuX2xpdmUuc2F5KGNvdW50ID09PSAwID8gJ05vIHJlc3VsdHMgYXZhaWxhYmxlJyA6IGAke2NvdW50fSByZXN1bHQke2NvdW50ID09PSAxID8gJycgOiAncyd9IGF2YWlsYWJsZWApO1xyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIF91bnN1YnNjcmliZUZyb21Vc2VySW5wdXQoKSB7XHJcbiAgICBpZiAodGhpcy5fc3Vic2NyaXB0aW9uKSB7XHJcbiAgICAgIHRoaXMuX3N1YnNjcmlwdGlvbi51bnN1YnNjcmliZSgpO1xyXG4gICAgfVxyXG4gICAgdGhpcy5fc3Vic2NyaXB0aW9uID0gbnVsbDtcclxuICB9XHJcbn1cclxuIiwiaW1wb3J0IHtOZ01vZHVsZSwgTW9kdWxlV2l0aFByb3ZpZGVyc30gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7Q29tbW9uTW9kdWxlfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xyXG5cclxuaW1wb3J0IHtOZ2JIaWdobGlnaHR9IGZyb20gJy4vaGlnaGxpZ2h0JztcclxuaW1wb3J0IHtOZ2JUeXBlYWhlYWRXaW5kb3d9IGZyb20gJy4vdHlwZWFoZWFkLXdpbmRvdyc7XHJcbmltcG9ydCB7TmdiVHlwZWFoZWFkfSBmcm9tICcuL3R5cGVhaGVhZCc7XHJcblxyXG5leHBvcnQge05nYkhpZ2hsaWdodH0gZnJvbSAnLi9oaWdobGlnaHQnO1xyXG5leHBvcnQge05nYlR5cGVhaGVhZFdpbmRvd30gZnJvbSAnLi90eXBlYWhlYWQtd2luZG93JztcclxuZXhwb3J0IHtOZ2JUeXBlYWhlYWRDb25maWd9IGZyb20gJy4vdHlwZWFoZWFkLWNvbmZpZyc7XHJcbmV4cG9ydCB7TmdiVHlwZWFoZWFkLCBOZ2JUeXBlYWhlYWRTZWxlY3RJdGVtRXZlbnR9IGZyb20gJy4vdHlwZWFoZWFkJztcclxuXHJcbkBOZ01vZHVsZSh7XHJcbiAgZGVjbGFyYXRpb25zOiBbTmdiVHlwZWFoZWFkLCBOZ2JIaWdobGlnaHQsIE5nYlR5cGVhaGVhZFdpbmRvd10sXHJcbiAgZXhwb3J0czogW05nYlR5cGVhaGVhZCwgTmdiSGlnaGxpZ2h0XSxcclxuICBpbXBvcnRzOiBbQ29tbW9uTW9kdWxlXSxcclxuICBlbnRyeUNvbXBvbmVudHM6IFtOZ2JUeXBlYWhlYWRXaW5kb3ddXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBOZ2JUeXBlYWhlYWRNb2R1bGUge1xyXG4gIC8qKlxyXG4gICAqIEltcG9ydGluZyB3aXRoICcuZm9yUm9vdCgpJyBpcyBubyBsb25nZXIgbmVjZXNzYXJ5LCB5b3UgY2FuIHNpbXBseSBpbXBvcnQgdGhlIG1vZHVsZS5cclxuICAgKiBXaWxsIGJlIHJlbW92ZWQgaW4gNC4wLjAuXHJcbiAgICpcclxuICAgKiBAZGVwcmVjYXRlZCAzLjAuMFxyXG4gICAqL1xyXG4gIHN0YXRpYyBmb3JSb290KCk6IE1vZHVsZVdpdGhQcm92aWRlcnMgeyByZXR1cm4ge25nTW9kdWxlOiBOZ2JUeXBlYWhlYWRNb2R1bGV9OyB9XHJcbn1cclxuIiwiaW1wb3J0IHtOZ01vZHVsZSwgTW9kdWxlV2l0aFByb3ZpZGVyc30gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcblxyXG5pbXBvcnQge05nYkFjY29yZGlvbk1vZHVsZSwgTmdiUGFuZWxDaGFuZ2VFdmVudH0gZnJvbSAnLi9hY2NvcmRpb24vYWNjb3JkaW9uLm1vZHVsZSc7XHJcbmltcG9ydCB7TmdiQWxlcnRNb2R1bGV9IGZyb20gJy4vYWxlcnQvYWxlcnQubW9kdWxlJztcclxuaW1wb3J0IHtOZ2JCdXR0b25zTW9kdWxlfSBmcm9tICcuL2J1dHRvbnMvYnV0dG9ucy5tb2R1bGUnO1xyXG5pbXBvcnQge05nYkNhcm91c2VsTW9kdWxlfSBmcm9tICcuL2Nhcm91c2VsL2Nhcm91c2VsLm1vZHVsZSc7XHJcbmltcG9ydCB7TmdiQ29sbGFwc2VNb2R1bGV9IGZyb20gJy4vY29sbGFwc2UvY29sbGFwc2UubW9kdWxlJztcclxuaW1wb3J0IHtOZ2JEYXRlcGlja2VyTW9kdWxlfSBmcm9tICcuL2RhdGVwaWNrZXIvZGF0ZXBpY2tlci5tb2R1bGUnO1xyXG5pbXBvcnQge05nYkRyb3Bkb3duTW9kdWxlfSBmcm9tICcuL2Ryb3Bkb3duL2Ryb3Bkb3duLm1vZHVsZSc7XHJcbmltcG9ydCB7XHJcbiAgTmdiTW9kYWxNb2R1bGUsXHJcbiAgTmdiTW9kYWwsXHJcbiAgTmdiTW9kYWxDb25maWcsXHJcbiAgTmdiTW9kYWxPcHRpb25zLFxyXG4gIE5nYk1vZGFsUmVmLFxyXG4gIE1vZGFsRGlzbWlzc1JlYXNvbnNcclxufSBmcm9tICcuL21vZGFsL21vZGFsLm1vZHVsZSc7XHJcbmltcG9ydCB7TmdiUGFnaW5hdGlvbk1vZHVsZX0gZnJvbSAnLi9wYWdpbmF0aW9uL3BhZ2luYXRpb24ubW9kdWxlJztcclxuaW1wb3J0IHtOZ2JQb3BvdmVyTW9kdWxlfSBmcm9tICcuL3BvcG92ZXIvcG9wb3Zlci5tb2R1bGUnO1xyXG5pbXBvcnQge05nYlByb2dyZXNzYmFyTW9kdWxlfSBmcm9tICcuL3Byb2dyZXNzYmFyL3Byb2dyZXNzYmFyLm1vZHVsZSc7XHJcbmltcG9ydCB7TmdiUmF0aW5nTW9kdWxlfSBmcm9tICcuL3JhdGluZy9yYXRpbmcubW9kdWxlJztcclxuaW1wb3J0IHtOZ2JUYWJzZXRNb2R1bGUsIE5nYlRhYkNoYW5nZUV2ZW50fSBmcm9tICcuL3RhYnNldC90YWJzZXQubW9kdWxlJztcclxuaW1wb3J0IHtOZ2JUaW1lcGlja2VyTW9kdWxlfSBmcm9tICcuL3RpbWVwaWNrZXIvdGltZXBpY2tlci5tb2R1bGUnO1xyXG5pbXBvcnQge05nYlRvb2x0aXBNb2R1bGV9IGZyb20gJy4vdG9vbHRpcC90b29sdGlwLm1vZHVsZSc7XHJcbmltcG9ydCB7TmdiVHlwZWFoZWFkTW9kdWxlLCBOZ2JUeXBlYWhlYWRTZWxlY3RJdGVtRXZlbnR9IGZyb20gJy4vdHlwZWFoZWFkL3R5cGVhaGVhZC5tb2R1bGUnO1xyXG5cclxuZXhwb3J0IHtcclxuICBOZ2JBY2NvcmRpb25Nb2R1bGUsXHJcbiAgTmdiUGFuZWxDaGFuZ2VFdmVudCxcclxuICBOZ2JBY2NvcmRpb25Db25maWcsXHJcbiAgTmdiQWNjb3JkaW9uLFxyXG4gIE5nYlBhbmVsLFxyXG4gIE5nYlBhbmVsVGl0bGUsXHJcbiAgTmdiUGFuZWxDb250ZW50XHJcbn0gZnJvbSAnLi9hY2NvcmRpb24vYWNjb3JkaW9uLm1vZHVsZSc7XHJcbmV4cG9ydCB7TmdiQWxlcnRNb2R1bGUsIE5nYkFsZXJ0Q29uZmlnLCBOZ2JBbGVydH0gZnJvbSAnLi9hbGVydC9hbGVydC5tb2R1bGUnO1xyXG5leHBvcnQge05nYkJ1dHRvbnNNb2R1bGUsIE5nYkNoZWNrQm94LCBOZ2JSYWRpb0dyb3VwfSBmcm9tICcuL2J1dHRvbnMvYnV0dG9ucy5tb2R1bGUnO1xyXG5leHBvcnQge05nYkNhcm91c2VsTW9kdWxlLCBOZ2JDYXJvdXNlbENvbmZpZywgTmdiQ2Fyb3VzZWwsIE5nYlNsaWRlfSBmcm9tICcuL2Nhcm91c2VsL2Nhcm91c2VsLm1vZHVsZSc7XHJcbmV4cG9ydCB7TmdiQ29sbGFwc2VNb2R1bGUsIE5nYkNvbGxhcHNlfSBmcm9tICcuL2NvbGxhcHNlL2NvbGxhcHNlLm1vZHVsZSc7XHJcbmV4cG9ydCB7XHJcbiAgTmdiQ2FsZW5kYXIsXHJcbiAgTmdiUGVyaW9kLFxyXG4gIE5nYkNhbGVuZGFySXNsYW1pY0NpdmlsLFxyXG4gIE5nYkNhbGVuZGFySXNsYW1pY1VtYWxxdXJhLFxyXG4gIE5nYkNhbGVuZGFySGVicmV3LFxyXG4gIE5nYkNhbGVuZGFyUGVyc2lhbixcclxuICBOZ2JEYXRlcGlja2VyTW9kdWxlLFxyXG4gIE5nYkRhdGVwaWNrZXJJMThuLFxyXG4gIE5nYkRhdGVwaWNrZXJJMThuSGVicmV3LFxyXG4gIE5nYkRhdGVwaWNrZXJDb25maWcsXHJcbiAgTmdiRGF0ZVN0cnVjdCxcclxuICBOZ2JEYXRlLFxyXG4gIE5nYkRhdGVQYXJzZXJGb3JtYXR0ZXIsXHJcbiAgTmdiRGF0ZUFkYXB0ZXIsXHJcbiAgTmdiRGF0ZU5hdGl2ZUFkYXB0ZXIsXHJcbiAgTmdiRGF0ZU5hdGl2ZVVUQ0FkYXB0ZXIsXHJcbiAgTmdiRGF0ZXBpY2tlcixcclxuICBOZ2JJbnB1dERhdGVwaWNrZXJcclxufSBmcm9tICcuL2RhdGVwaWNrZXIvZGF0ZXBpY2tlci5tb2R1bGUnO1xyXG5leHBvcnQge05nYkRyb3Bkb3duTW9kdWxlLCBOZ2JEcm9wZG93bkNvbmZpZywgTmdiRHJvcGRvd259IGZyb20gJy4vZHJvcGRvd24vZHJvcGRvd24ubW9kdWxlJztcclxuZXhwb3J0IHtcclxuICBOZ2JNb2RhbE1vZHVsZSxcclxuICBOZ2JNb2RhbCxcclxuICBOZ2JNb2RhbENvbmZpZyxcclxuICBOZ2JNb2RhbE9wdGlvbnMsXHJcbiAgTmdiQWN0aXZlTW9kYWwsXHJcbiAgTmdiTW9kYWxSZWYsXHJcbiAgTW9kYWxEaXNtaXNzUmVhc29uc1xyXG59IGZyb20gJy4vbW9kYWwvbW9kYWwubW9kdWxlJztcclxuZXhwb3J0IHtOZ2JQYWdpbmF0aW9uTW9kdWxlLCBOZ2JQYWdpbmF0aW9uQ29uZmlnLCBOZ2JQYWdpbmF0aW9ufSBmcm9tICcuL3BhZ2luYXRpb24vcGFnaW5hdGlvbi5tb2R1bGUnO1xyXG5leHBvcnQge05nYlBvcG92ZXJNb2R1bGUsIE5nYlBvcG92ZXJDb25maWcsIE5nYlBvcG92ZXJ9IGZyb20gJy4vcG9wb3Zlci9wb3BvdmVyLm1vZHVsZSc7XHJcbmV4cG9ydCB7TmdiUHJvZ3Jlc3NiYXJNb2R1bGUsIE5nYlByb2dyZXNzYmFyQ29uZmlnLCBOZ2JQcm9ncmVzc2Jhcn0gZnJvbSAnLi9wcm9ncmVzc2Jhci9wcm9ncmVzc2Jhci5tb2R1bGUnO1xyXG5leHBvcnQge05nYlJhdGluZ01vZHVsZSwgTmdiUmF0aW5nQ29uZmlnLCBOZ2JSYXRpbmd9IGZyb20gJy4vcmF0aW5nL3JhdGluZy5tb2R1bGUnO1xyXG5leHBvcnQge1xyXG4gIE5nYlRhYnNldE1vZHVsZSxcclxuICBOZ2JUYWJDaGFuZ2VFdmVudCxcclxuICBOZ2JUYWJzZXRDb25maWcsXHJcbiAgTmdiVGFic2V0LFxyXG4gIE5nYlRhYixcclxuICBOZ2JUYWJDb250ZW50LFxyXG4gIE5nYlRhYlRpdGxlXHJcbn0gZnJvbSAnLi90YWJzZXQvdGFic2V0Lm1vZHVsZSc7XHJcbmV4cG9ydCB7XHJcbiAgTmdiVGltZXBpY2tlck1vZHVsZSxcclxuICBOZ2JUaW1lcGlja2VyQ29uZmlnLFxyXG4gIE5nYlRpbWVTdHJ1Y3QsXHJcbiAgTmdiVGltZXBpY2tlcixcclxuICBOZ2JUaW1lQWRhcHRlclxyXG59IGZyb20gJy4vdGltZXBpY2tlci90aW1lcGlja2VyLm1vZHVsZSc7XHJcbmV4cG9ydCB7TmdiVG9vbHRpcE1vZHVsZSwgTmdiVG9vbHRpcENvbmZpZywgTmdiVG9vbHRpcH0gZnJvbSAnLi90b29sdGlwL3Rvb2x0aXAubW9kdWxlJztcclxuZXhwb3J0IHtcclxuICBOZ2JIaWdobGlnaHQsXHJcbiAgTmdiVHlwZWFoZWFkTW9kdWxlLFxyXG4gIE5nYlR5cGVhaGVhZENvbmZpZyxcclxuICBOZ2JUeXBlYWhlYWRTZWxlY3RJdGVtRXZlbnQsXHJcbiAgTmdiVHlwZWFoZWFkXHJcbn0gZnJvbSAnLi90eXBlYWhlYWQvdHlwZWFoZWFkLm1vZHVsZSc7XHJcblxyXG5leHBvcnQge1BsYWNlbWVudH0gZnJvbSAnLi91dGlsL3Bvc2l0aW9uaW5nJztcclxuXHJcbmNvbnN0IE5HQl9NT0RVTEVTID0gW1xyXG4gIE5nYkFjY29yZGlvbk1vZHVsZSwgTmdiQWxlcnRNb2R1bGUsIE5nYkJ1dHRvbnNNb2R1bGUsIE5nYkNhcm91c2VsTW9kdWxlLCBOZ2JDb2xsYXBzZU1vZHVsZSwgTmdiRGF0ZXBpY2tlck1vZHVsZSxcclxuICBOZ2JEcm9wZG93bk1vZHVsZSwgTmdiTW9kYWxNb2R1bGUsIE5nYlBhZ2luYXRpb25Nb2R1bGUsIE5nYlBvcG92ZXJNb2R1bGUsIE5nYlByb2dyZXNzYmFyTW9kdWxlLCBOZ2JSYXRpbmdNb2R1bGUsXHJcbiAgTmdiVGFic2V0TW9kdWxlLCBOZ2JUaW1lcGlja2VyTW9kdWxlLCBOZ2JUb29sdGlwTW9kdWxlLCBOZ2JUeXBlYWhlYWRNb2R1bGVcclxuXTtcclxuXHJcbkBOZ01vZHVsZSh7aW1wb3J0czogTkdCX01PRFVMRVMsIGV4cG9ydHM6IE5HQl9NT0RVTEVTfSlcclxuZXhwb3J0IGNsYXNzIE5nYk1vZHVsZSB7XHJcbiAgLyoqXHJcbiAgICogSW1wb3J0aW5nIHdpdGggJy5mb3JSb290KCknIGlzIG5vIGxvbmdlciBuZWNlc3NhcnksIHlvdSBjYW4gc2ltcGx5IGltcG9ydCB0aGUgbW9kdWxlLlxyXG4gICAqIFdpbGwgYmUgcmVtb3ZlZCBpbiA0LjAuMC5cclxuICAgKlxyXG4gICAqIEBkZXByZWNhdGVkIDMuMC4wXHJcbiAgICovXHJcbiAgc3RhdGljIGZvclJvb3QoKTogTW9kdWxlV2l0aFByb3ZpZGVycyB7IHJldHVybiB7bmdNb2R1bGU6IE5nYk1vZHVsZX07IH1cclxufVxyXG4iXSwibmFtZXMiOlsibmV4dElkIiwiTkdCX0RBVEVQSUNLRVJfVkFMVUVfQUNDRVNTT1IiLCJtb2QiLCJHUkVHT1JJQU5fRVBPQ0giLCJpc0dyZWdvcmlhbkxlYXBZZWFyIiwidG9HcmVnb3JpYW4iLCJmcm9tR3JlZ29yaWFuIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7OztBQUFBLG1CQUEwQixLQUFVO0lBQ2xDLE9BQU8sUUFBUSxDQUFDLEdBQUcsS0FBSyxFQUFFLEVBQUUsRUFBRSxDQUFDLENBQUM7Q0FDakM7Ozs7O0FBRUQsa0JBQXlCLEtBQVU7SUFDakMsT0FBTyxDQUFDLEtBQUssS0FBSyxTQUFTLElBQUksS0FBSyxLQUFLLElBQUksSUFBSSxHQUFHLEtBQUssRUFBRSxHQUFHLEVBQUUsQ0FBQztDQUNsRTs7Ozs7OztBQUVELHlCQUFnQyxLQUFhLEVBQUUsR0FBVyxFQUFFLEdBQUcsR0FB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QUMsQ0FDakQ7O1FBSHZDLE1BR00sTUFBTSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxHQUFHLEdBQUcsQ0FBQyxDQUFDOztRQUN2QyxJQUFJLElBQUksR0FBRyxVQUFVLEdBQUcsR0FBRyxHQUFHLElBQUksR0FBRyxHQUFHLEdBQUcsSUFBSSxHQUFHLENBQUMsR0FBRyxNQUFNLENBQUM7UUFDN0QsSUFBSSxFQUFFLElBQUksS0FBSyxDQUFDLElBQUksTUFBTSxLQUFLLENBQUMsQ0FBQyxFQUFFO1lBQ2pDLElBQUksRUFBRSxDQUFDO1NBQ1I7O1FBRUQsTUFBTSxVQUFVLEdBQUcsZUFBZSxHQUFHLEdBQUcsSUFBSSxJQUFJLEdBQUcsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLElBQUksR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLElBQUksR0FBRyxDQUFDLElBQUksR0FBRyxDQUFDO1lBQzdHLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxJQUFJLEdBQUcsQ0FBQyxJQUFJLEdBQUcsQ0FBQyxDQUFDOztRQUVqQyxNQUFNLE9BQU8sR0FBRyxHQUFHLEdBQUcsVUFBVSxDQUFDOztRQUVqQyxNQUFNLEdBQUcsR0FBRyxlQUFlLEdBQUcsQ0FBQyxHQUFHLEdBQUcsSUFBSSxJQUFJLEdBQUcsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLElBQUksR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLElBQUksR0FBRyxDQUFDLElBQUksR0FBRyxDQUFDO1lBQzFHLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxJQUFJLEdBQUcsQ0FBQyxJQUFJLEdBQUcsQ0FBQyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsR0FBRyxHQUFHLEVBQUUsSUFBSSxtQkFBbUIsQ0FBQyxJQUFJLElBQUksQ0FBQyxJQUFJLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxD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LEVBQUUsY0FBYyxFQUFFLGNBQWMsRUFBRSxjQUFjO0lBRTlFLGNBQWMsRUFBRSxjQUFjLEVBQUUsY0FBYyxFQUFFLGNBQWMsRUFBRSxjQUFjO0lBRTlFLGNBQWMsRUFBRSxjQUFjLEVBQUUsY0FBYyxFQUFFLGNBQWMsRUFBRSxjQUFjO0lBRTlFLGNBQWMsRUFBRSxjQUFjLEVBQUUsY0FBYyxFQUFFLGNBQWMsRUFBRSxjQUFjO0lBRTlFLGNBQWMsRUFBRSxjQUFjLEVBQUUsY0FBYyxFQUFFLGNBQWMsRUFBRSxjQUFjO0lBRTlFLGNBQWMsRUFBRSxjQUFjLEVBQUUsY0FBYyxFQUFFLGNBQWMsRUFBRSxjQUFjO0lBRTlFLGNBQWMsRUFBRSxjQUFjLEVBQUUsY0FBYyxFQUFFLGNBQWMsRUFBRSxjQUFjO0lBRTlFLGNBQWMsRUFBRSxjQUFjLEVBQUUsY0FBYyxFQUFFLGNBQWMsRUFBRSxjQUFjO0lBRTlFLGNBQWMsRUFBRSxjQUFjLEVBQUUsY0FBYyxFQUFFLGNBQWMsRUFBRSxjQUFjO0lBRTlFLGNBQWMsRUFBRSxjQUFjLEVBQUUsY0FBYyxFQUFFLGNBQWMsRUFBRSxjQUFjO0lBRTlFLGNBQWMsRUFBRSxjQUFjLEVBQUUsY0FBYyxFQUFFLGNBQWMsRUFBRSxjQUFjO0lBRTlFLGNBQWMsRUFBRSxjQUFjLEVBQUUsY0FBYyxFQUFFLGNBQWMsRUFBRSxjQUFjO0lBRTlFLGNBQWMsRUFBRSxjQUFjLEVBQUUsY0FBYyxFQUFFLGNBQWMsRUFBRSxjQUFjO0lBRTlFLGNBQWMsRUFBRSxjQUFjLEVBQUUsY0FBYyxFQUFFLGNBQWMsRUFBRSxjQUFjO0lBRTlFLGNBQWMsRUFBRSxjQUFjLEVBQUUsY0FBYyxFQUFFLGNBQWMsRUFBRSxjQUFjO0lBRTlFLGNBQWMsRUFBRSxjQUFjLEVBQUUsY0FBYyxFQUFFLGNBQWMsRUFBRSxjQUFjO0lBRTlFLGNBQWMsRUFBRSxjQUFjLEVBQUUsY0FBYyxFQUFFLGNBQWMsRUFBRSxjQUFjO0lBRTlFLGNBQWMsRUFBRSxjQUFjLEVBQUUsY0FBYyxFQUFFLGNBQWMsRUFBRSxjQUFjO0lBRTlFLGNBQWMsRUFBRSxjQUFjLEVBQUUsY0FBYyxFQUFFLGNBQWMsRUFBRSxjQUFjO0lBRTlFLGNBQWMsRUFBRSxjQUFjLEVBQUUsY0FBYyxFQUFFLGNBQWMsRUFBRSxjQUFjO0lBRTlFLGNBQWMsRUFBRSxjQUFjLEVBQUUsY0FBYyxFQUFFLGNBQWMsRUFBRSxjQUFjO0lBRTlFLGNBQWMsRUFBRSxjQUFjLEVBQUUsY0FBYyxFQUFFLGNBQWMsRUFBRSxjQUFjO0lBRTlFLGNBQWMsRUFBRSxjQUFjLEVBQUUsY0FBYyxFQUFFLGNBQWMsRUFBRSxjQUFjO0lBRTlFLGNBQWMsRUFBRSxjQUFjLEVBQUUsY0FBYyxFQUFFLGNBQWMsRUFBRSxjQUFjO0lBRTlFLGNBQWMsRUFBRSxjQUFjLEVBQUUsY0FBYyxFQUFFLGNBQWMsRUFBRSxjQUFjO0lBRTlFLGNBQWMsRUFBRSxjQUFjLEVBQUUsY0FBYyxFQUFFLGNBQWMsRUFBRSxjQUFjO0lBRTlFLGNBQWMsRUFBRSxjQUFjLEVBQUUsY0FBYyxFQUFFLGNBQWMsRUFBRSxjQUFjO0lBRTlFLGNBQWMsRUFBRSxjQUFjLEVBQUUsY0FBYyxFQUFFLGNBQWMsRUFBRSxjQUFjO0lBRTlFLGNBQWMsRUFBRSxjQUFjLEVBQUUsY0FBYyxFQUFFLGNBQWMsRUFBRSxjQUFjO0lBRTlFLGNBQWMsRUFBRSxjQUFjLEVBQUUsY0FBYyxFQUFFLGNBQWMsRUFBRSxjQUFjO0lBRTlFLGNBQWMsRUFBRSxjQUFjLEVBQUUsY0FBYyxFQUFFLGNBQWMsRUFBRSxjQUFjO0lBRTlFLGNBQWMsRUFBRSxjQUFjLEVBQUUsY0FBYyxFQUFFLGNBQWMsRUFBRSxjQUFjO0lBRTlFLGNBQWMsRUFBRSxjQUFjLEVBQUUsY0FBYyxFQUFFLGNBQWMsRUFBRSxjQUFjO0lBRTlFLGNBQWMsRUFBRSxjQUFjLEVBQUUsY0FBYyxFQUFFLGNBQWMsRUFBRSxjQUFjO0lBRTlFLGNBQWMsRUFBRSxjQUFjLEVBQUUsY0FBYyxFQUFFLGNBQWMsRUFBRSxjQUFjO0lBRTlFLGNBQWMsRUFBRSxjQUFjLEVBQUUsY0FBYyxFQUFFLGNBQWMsRUFBRSxjQUFjO0lBRTlFLGNBQWMsRUFBRSxjQUFjLEVBQUUsY0FBYyxFQUFFLGNBQWMsRUFBRSxjQUFjO0lBRTlFLGNBQWMsRUFBRSxjQUFjLEVBQUUsY0FBYyxFQUFFLGNBQWMsRUFBRSxjQUFjO0lBRTlFLGNBQWMsRUFBRSxjQUFjLEVBQUUsY0FBYyxFQUFFLGNBQWMsRUFBRSxjQUFjO0lBRTlFLGNBQWMsRUFBRSxjQUFjLEVBQUUsY0FBYyxFQUFFLGNBQWMsRUFBRSxjQUFjO0lBRTlFLGNBQWMsRUFBRSxjQUFjLEVBQUUsY0FBYyxFQUFFLGNBQWMsRUFBRSxjQUFjO0lBRTlFLGNBQWMsRUFBRSxjQUFjLEVBQUUsY0FBYyxFQUFFLGNBQWMsRUFBRSxjQUFjO0lBRTlFLGNBQWMsRUFBRSxjQUFjLEVBQUUsY0FBYyxFQUFFLGNBQWMsRUFBRSxjQUFjO0lBRTlFLGNBQWMsRUFBRSxjQUFjLEVBQUUsY0FBYyxFQUFFLGNBQWMsRUFBRSxjQUFjO0lBRTlFLGNBQWMsRUFBRSxjQUFjLEVBQUUsY0FBYyxFQUFFLGNBQWMsRUFBRSxjQUFjO0lBRTlFLGNBQWMsRUFBRSxjQUFjLEVBQUUsY0FBYyxFQUFFLGNBQWMsRUFBRSxjQUFjO0lBRTlFLGNBQWMsRUFBRSxjQUFjLEVBQUUsY0FBYyxFQUFFLGNBQWMsRUFBRSxjQUFjO0lBRTlFLGNBQWMsRUFBRSxjQUFjLEVBQUUsY0FBYyxFQUFFLGNBQWMsRUFBRSxjQUFjO0lBRTlFLGNBQWMsRUFBRSxjQUFjLEVBQUUsY0FBYyxFQUFFLGNBQWMsRUFBRSxjQUFjO0lBRTlFLGNBQWMsRUFBRSxjQUFjLEVBQUUsY0FBYyxFQUFFLGNBQWMsRUFBRSxjQUFjO0lBRTlFLGNBQWMsRUFBRSxjQUFjLEVBQUUsY0FBYyxFQUFFLGNBQWMsRUFBRSxjQUFjO0lBRTlFLGNBQWMsRUFBRSxjQUFjLEVBQUUsY0FBYyxFQUFFLGNBQWMsRUFBRSxjQUFjO0lBRTlFLGNBQWMsRUFBRSxjQUFjLEVBQUUsY0FBYyxFQUFFLGNBQWMsRUFBRSxjQUFjO0lBRTlFLGNBQWMsRUFBRSxj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QUMsQ0FBQyxHQUFHLGVBQWUsR0FBRyxTQUFTLEVBQUUsTUFBTSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsQ0FBQyxHQUFHLENBQUMsR0FBRyxJQUFJLENBQUM7O0lBQzVFLE1BQU0sQ0FBQyxHQUFHLEdBQUcsQ0FBQ0EsS0FBRyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUMsR0FBRyxDQUFDLEdBQUcsR0FBRyxDQUFDOztJQUN6QyxNQUFNLElBQUksR0FBRyxHQUFHLENBQUNBLEtBQUcsQ0FBQyxDQUFDLEVBQUUsR0FBRyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDOztJQUNyQyxNQUFNLE1BQU0sR0FBR0EsS0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEVBQUUsR0FBRyxDQUFDLEVBQUUsRUFBRSxDQUFDLEdBQUcsQ0FBQyxDQUFDOztJQUN4QyxNQUFNLEtBQUssR0FBRyxHQUFHLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxHQUFHLE1BQU0sR0FBRyxHQUFHLENBQUMsQ0FBQyxHQUFHLE1BQU0sRUFBRSxDQUFDLENBQUMsQ0FBQztJQUV6RCxPQUFPLElBQUksSUFBSSxDQUFDLEtBQUssRUFBRSxNQUFNLEdBQUcsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDO0NBQzFDOzs7Ozs7O0FBU0QsMkJBQTJCLEVBQVUsRUFBRSxFQUFVLEVBQUUsRUFBVTs7SUFDM0QsSUFBSSxDQUFDLEdBQUcsR0FBRyxDQUFDLENBQUMsRUFBRSxHQUFHLEdBQUcsQ0FBQyxFQUFFLEdBQUcsQ0FBQyxFQUFFLENBQUMsQ0FBQyxHQUFHLE1BQU0sSUFBSSxJQUFJLEVBQUUsQ0FBQyxDQUFDLEdBQUcsR0FBRyxDQUFDLEdBQUcsR0FBR0EsS0FBRyxDQUFDLEVBQUUsR0FBRyxDQUFDLEVBQUUsRUFBRSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsQ0FBQyxHQUFHLEVBQUUsR0FBRyxRQUFRLENBQUM7SUFDMUcsQ0FBQyxHQUFHLENBQUMsR0FBRyxHQUFHLENBQUMsR0FBRyxDQUFDLEVB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