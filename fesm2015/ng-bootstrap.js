import { Injectable, NgModule, Directive, ElementRef, forwardRef, Input, Renderer2, ChangeDetectionStrategy, ChangeDetectorRef, Component, ContentChildren, EventEmitter, Inject, NgZone, Output, PLATFORM_ID, TemplateRef, LOCALE_ID, ContentChild, Injector, ViewContainerRef, ComponentFactoryResolver, InjectionToken, defineInjectable, inject, ApplicationRef, RendererFactory2, INJECTOR } from '@angular/core';
import { CommonModule, isPlatformBrowser, FormStyle, getLocaleDayNames, getLocaleMonthNames, TranslationWidth, formatDate, DOCUMENT } from '@angular/common';
import { NG_VALUE_ACCESSOR, NG_VALIDATORS, FormsModule } from '@angular/forms';
import { Subject, timer, fromEvent, race, NEVER, BehaviorSubject } from 'rxjs';
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
     * @param {?} event
     * @return {?}
     */
    onKeyDown(event) {
        if (!this.isOpen()) {
            this.open();
        }
        /** @type {?} */
        const list = this.getMenuElements();
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
        return false;
    }
    /**
     * @return {?}
     */
    getMenuElements() {
        return Array.from(this._menuElementRef.nativeElement.querySelectorAll('.dropdown-item:not(.disabled):not(:disabled)'));
    }
}
NgbDropdown.decorators = [
    { type: Directive, args: [{
                selector: '[ngbDropdown]',
                exportAs: 'ngbDropdown',
                host: {
                    '[class.show]': 'isOpen()',
                    '(keydown.ArrowUp)': 'onKeyDown($event)',
                    '(keydown.ArrowDown)': 'onKeyDown($event)',
                    '(keydown.Home)': 'onKeyDown($event)',
                    '(keydown.End)': 'onKeyDown($event)'
                }
            },] },
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
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
/** @type {?} */
const NGB_DROPDOWN_DIRECTIVES = [NgbDropdown, NgbDropdownAnchor, NgbDropdownToggle, NgbDropdownMenu];
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

export { NgbAccordionModule, NgbAccordionConfig, NgbAccordion, NgbPanel, NgbPanelTitle, NgbPanelContent, NgbAlertModule, NgbAlertConfig, NgbAlert, NgbButtonsModule, NgbCheckBox, NgbRadioGroup, NgbCarouselModule, NgbCarouselConfig, NgbCarousel, NgbSlide, NgbCollapseModule, NgbCollapse, NgbCalendar, NgbCalendarIslamicCivil, NgbCalendarIslamicUmalqura, NgbCalendarHebrew, NgbCalendarPersian, NgbDatepickerModule, NgbDatepickerI18n, NgbDatepickerI18nHebrew, NgbDatepickerConfig, NgbDate, NgbDateParserFormatter, NgbDateAdapter, NgbDateNativeAdapter, NgbDateNativeUTCAdapter, NgbDatepicker, NgbInputDatepicker, NgbDropdownModule, NgbDropdownConfig, NgbDropdown, NgbModalModule, NgbModal, NgbModalConfig, NgbActiveModal, NgbModalRef, ModalDismissReasons, NgbPaginationModule, NgbPaginationConfig, NgbPagination, NgbPopoverModule, NgbPopoverConfig, NgbPopover, NgbProgressbarModule, NgbProgressbarConfig, NgbProgressbar, NgbRatingModule, NgbRatingConfig, NgbRating, NgbTabsetModule, NgbTabsetConfig, NgbTabset, NgbTab, NgbTabContent, NgbTabTitle, NgbTimepickerModule, NgbTimepickerConfig, NgbTimepicker, NgbTimeAdapter, NgbTooltipModule, NgbTooltipConfig, NgbTooltip, NgbHighlight, NgbTypeaheadModule, NgbTypeaheadConfig, NgbTypeahead, NgbModule, NgbButtonLabel as ɵa, NgbRadio as ɵb, NGB_CAROUSEL_DIRECTIVES as ɵc, NGB_DATEPICKER_DATE_ADAPTER_FACTORY as ɵl, NgbDateStructAdapter as ɵm, NgbDatepickerDayView as ɵg, NGB_DATEPICKER_18N_FACTORY as ɵj, NgbDatepickerI18nDefault as ɵk, NgbDatepickerKeyMapService as ɵy, NgbDatepickerMonthView as ɵf, NgbDatepickerNavigation as ɵh, NgbDatepickerNavigationSelect as ɵi, NgbDatepickerService as ɵx, NgbCalendarHijri as ɵbg, NGB_DATEPICKER_CALENDAR_FACTORY as ɵd, NgbCalendarGregorian as ɵe, NGB_DATEPICKER_PARSER_FORMATTER_FACTORY as ɵn, NgbDateISOParserFormatter as ɵo, NgbDropdownAnchor as ɵq, NgbDropdownMenu as ɵp, NgbDropdownToggle as ɵr, NgbModalBackdrop as ɵz, NgbModalStack as ɵbb, NgbModalWindow as ɵba, NgbPopoverWindow as ɵs, NGB_DATEPICKER_TIME_ADAPTER_FACTORY as ɵt, NgbTimeStructAdapter as ɵu, NgbTooltipWindow as ɵv, NgbTypeaheadWindow as ɵw, ARIA_LIVE_DELAY as ɵbd, ARIA_LIVE_DELAY_FACTORY as ɵbe, Live as ɵbf, ContentRef as ɵbh, ScrollBar as ɵbc };

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmctYm9vdHN0cmFwLmpzLm1hcCIsInNvdXJjZXMiOlsibmc6Ly9AbmctYm9vdHN0cmFwL25nLWJvb3RzdHJhcC91dGlsL3V0aWwudHMiLCJuZzovL0BuZy1ib290c3RyYXAvbmctYm9vdHN0cmFwL2FjY29yZGlvbi9hY2NvcmRpb24tY29uZmlnLnRzIiwibmc6Ly9AbmctYm9vdHN0cmFwL25nLWJvb3RzdHJhcC9hY2NvcmRpb24vYWNjb3JkaW9uLnRzIiwibmc6Ly9AbmctYm9vdHN0cmFwL25nLWJvb3RzdHJhcC9hY2NvcmRpb24vYWNjb3JkaW9uLm1vZHVsZS50cyIsIm5nOi8vQG5nLWJvb3RzdHJhcC9uZy1ib290c3RyYXAvYWxlcnQvYWxlcnQtY29uZmlnLnRzIiwibmc6Ly9AbmctYm9vdHN0cmFwL25nLWJvb3RzdHJhcC9hbGVydC9hbGVydC50cyIsIm5nOi8vQG5nLWJvb3RzdHJhcC9uZy1ib290c3RyYXAvYWxlcnQvYWxlcnQubW9kdWxlLnRzIiwibmc6Ly9AbmctYm9vdHN0cmFwL25nLWJvb3RzdHJhcC9idXR0b25zL2xhYmVsLnRzIiwibmc6Ly9AbmctYm9vdHN0cmFwL25nLWJvb3RzdHJhcC9idXR0b25zL2NoZWNrYm94LnRzIiwibmc6Ly9AbmctYm9vdHN0cmFwL25nLWJvb3RzdHJhcC9idXR0b25zL3JhZGlvLnRzIiwibmc6Ly9AbmctYm9vdHN0cmFwL25nLWJvb3RzdHJhcC9idXR0b25zL2J1dHRvbnMubW9kdWxlLnRzIiwibmc6Ly9AbmctYm9vdHN0cmFwL25nLWJvb3RzdHJhcC9jYXJvdXNlbC9jYXJvdXNlbC1jb25maWcudHMiLCJuZzovL0BuZy1ib290c3RyYXAvbmctYm9vdHN0cmFwL2Nhcm91c2VsL2Nhcm91c2VsLnRzIiwibmc6Ly9AbmctYm9vdHN0cmFwL25nLWJvb3RzdHJhcC9jYXJvdXNlbC9jYXJvdXNlbC5tb2R1bGUudHMiLCJuZzovL0BuZy1ib290c3RyYXAvbmctYm9vdHN0cmFwL2NvbGxhcHNlL2NvbGxhcHNlLnRzIiwibmc6Ly9AbmctYm9vdHN0cmFwL25nLWJvb3RzdHJhcC9jb2xsYXBzZS9jb2xsYXBzZS5tb2R1bGUudHMiLCJuZzovL0BuZy1ib290c3RyYXAvbmctYm9vdHN0cmFwL2RhdGVwaWNrZXIvbmdiLWRhdGUudHMiLCJuZzovL0BuZy1ib290c3RyYXAvbmctYm9vdHN0cmFwL2RhdGVwaWNrZXIvbmdiLWNhbGVuZGFyLnRzIiwibmc6Ly9AbmctYm9vdHN0cmFwL25nLWJvb3RzdHJhcC9kYXRlcGlja2VyL2RhdGVwaWNrZXItdG9vbHMudHMiLCJuZzovL0BuZy1ib290c3RyYXAvbmctYm9vdHN0cmFwL2RhdGVwaWNrZXIvZGF0ZXBpY2tlci1pMThuLnRzIiwibmc6Ly9AbmctYm9vdHN0cmFwL25nLWJvb3RzdHJhcC9kYXRlcGlja2VyL2RhdGVwaWNrZXItc2VydmljZS50cyIsIm5nOi8vQG5nLWJvb3RzdHJhcC9uZy1ib290c3RyYXAvdXRpbC9rZXkudHMiLCJuZzovL0BuZy1ib290c3RyYXAvbmctYm9vdHN0cmFwL2RhdGVwaWNrZXIvZGF0ZXBpY2tlci1rZXltYXAtc2VydmljZS50cyIsIm5nOi8vQG5nLWJvb3RzdHJhcC9uZy1ib290c3RyYXAvZGF0ZXBpY2tlci9kYXRlcGlja2VyLXZpZXctbW9kZWwudHMiLCJuZzovL0BuZy1ib290c3RyYXAvbmctYm9vdHN0cmFwL2RhdGVwaWNrZXIvZGF0ZXBpY2tlci1jb25maWcudHMiLCJuZzovL0BuZy1ib290c3RyYXAvbmctYm9vdHN0cmFwL2RhdGVwaWNrZXIvYWRhcHRlcnMvbmdiLWRhdGUtYWRhcHRlci50cyIsIm5nOi8vQG5nLWJvb3RzdHJhcC9uZy1ib290c3RyYXAvZGF0ZXBpY2tlci9kYXRlcGlja2VyLnRzIiwibmc6Ly9AbmctYm9vdHN0cmFwL25nLWJvb3RzdHJhcC9kYXRlcGlja2VyL2RhdGVwaWNrZXItbW9udGgtdmlldy50cyIsIm5nOi8vQG5nLWJvb3RzdHJhcC9uZy1ib290c3RyYXAvZGF0ZXBpY2tlci9kYXRlcGlja2VyLW5hdmlnYXRpb24udHMiLCJuZzovL0BuZy1ib290c3RyYXAvbmctYm9vdHN0cmFwL2RhdGVwaWNrZXIvbmdiLWRhdGUtcGFyc2VyLWZvcm1hdHRlci50cyIsIm5nOi8vQG5nLWJvb3RzdHJhcC9uZy1ib290c3RyYXAvdXRpbC9wb3NpdGlvbmluZy50cyIsIm5nOi8vQG5nLWJvb3RzdHJhcC9uZy1ib290c3RyYXAvdXRpbC9mb2N1cy10cmFwLnRzIiwibmc6Ly9AbmctYm9vdHN0cmFwL25nLWJvb3RzdHJhcC9kYXRlcGlja2VyL2RhdGVwaWNrZXItaW5wdXQudHMiLCJuZzovL0BuZy1ib290c3RyYXAvbmctYm9vdHN0cmFwL2RhdGVwaWNrZXIvZGF0ZXBpY2tlci1kYXktdmlldy50cyIsIm5nOi8vQG5nLWJvb3RzdHJhcC9uZy1ib290c3RyYXAvZGF0ZXBpY2tlci9kYXRlcGlja2VyLW5hdmlnYXRpb24tc2VsZWN0LnRzIiwibmc6Ly9AbmctYm9vdHN0cmFwL25nLWJvb3RzdHJhcC9kYXRlcGlja2VyL2hpanJpL25nYi1jYWxlbmRhci1oaWpyaS50cyIsIm5nOi8vQG5nLWJvb3RzdHJhcC9uZy1ib290c3RyYXAvZGF0ZXBpY2tlci9oaWpyaS9uZ2ItY2FsZW5kYXItaXNsYW1pYy1jaXZpbC50cyIsIm5nOi8vQG5nLWJvb3RzdHJhcC9uZy1ib290c3RyYXAvZGF0ZXBpY2tlci9oaWpyaS9uZ2ItY2FsZW5kYXItaXNsYW1pYy11bWFscXVyYS50cyIsIm5nOi8vQG5nLWJvb3RzdHJhcC9uZy1ib290c3RyYXAvZGF0ZXBpY2tlci9qYWxhbGkvamFsYWxpLnRzIiwibmc6Ly9AbmctYm9vdHN0cmFwL25nLWJvb3RzdHJhcC9kYXRlcGlja2VyL2phbGFsaS9uZ2ItY2FsZW5kYXItcGVyc2lhbi50cyIsIm5nOi8vQG5nLWJvb3RzdHJhcC9uZy1ib290c3RyYXAvZGF0ZXBpY2tlci9oZWJyZXcvaGVicmV3LnRzIiwibmc6Ly9AbmctYm9vdHN0cmFwL25nLWJvb3RzdHJhcC9kYXRlcGlja2VyL2hlYnJldy9uZ2ItY2FsZW5kYXItaGVicmV3LnRzIiwibmc6Ly9AbmctYm9vdHN0cmFwL25nLWJvb3RzdHJhcC9kYXRlcGlja2VyL2hlYnJldy9kYXRlcGlja2VyLWkxOG4taGVicmV3LnRzIiwibmc6Ly9AbmctYm9vdHN0cmFwL25nLWJvb3RzdHJhcC9kYXRlcGlja2VyL2FkYXB0ZXJzL25nYi1kYXRlLW5hdGl2ZS1hZGFwdGVyLnRzIiwibmc6Ly9AbmctYm9vdHN0cmFwL25nLWJvb3RzdHJhcC9kYXRlcGlja2VyL2FkYXB0ZXJzL25nYi1kYXRlLW5hdGl2ZS11dGMtYWRhcHRlci50cyIsIm5nOi8vQG5nLWJvb3RzdHJhcC9uZy1ib290c3RyYXAvZGF0ZXBpY2tlci9kYXRlcGlja2VyLm1vZHVsZS50cyIsIm5nOi8vQG5nLWJvb3RzdHJhcC9uZy1ib290c3RyYXAvZHJvcGRvd24vZHJvcGRvd24tY29uZmlnLnRzIiwibmc6Ly9AbmctYm9vdHN0cmFwL25nLWJvb3RzdHJhcC9kcm9wZG93bi9kcm9wZG93bi50cyIsIm5nOi8vQG5nLWJvb3RzdHJhcC9uZy1ib290c3RyYXAvZHJvcGRvd24vZHJvcGRvd24ubW9kdWxlLnRzIiwibmc6Ly9AbmctYm9vdHN0cmFwL25nLWJvb3RzdHJhcC9tb2RhbC9tb2RhbC1iYWNrZHJvcC50cyIsIm5nOi8vQG5nLWJvb3RzdHJhcC9uZy1ib290c3RyYXAvbW9kYWwvbW9kYWwtZGlzbWlzcy1yZWFzb25zLnRzIiwibmc6Ly9AbmctYm9vdHN0cmFwL25nLWJvb3RzdHJhcC9tb2RhbC9tb2RhbC13aW5kb3cudHMiLCJuZzovL0BuZy1ib290c3RyYXAvbmctYm9vdHN0cmFwL21vZGFsL21vZGFsLWNvbmZpZy50cyIsIm5nOi8vQG5nLWJvb3RzdHJhcC9uZy1ib290c3RyYXAvdXRpbC9wb3B1cC50cyIsIm5nOi8vQG5nLWJvb3RzdHJhcC9uZy1ib290c3RyYXAvdXRpbC9zY3JvbGxiYXIudHMiLCJuZzovL0BuZy1ib290c3RyYXAvbmctYm9vdHN0cmFwL21vZGFsL21vZGFsLXJlZi50cyIsIm5nOi8vQG5nLWJvb3RzdHJhcC9uZy1ib290c3RyYXAvbW9kYWwvbW9kYWwtc3RhY2sudHMiLCJuZzovL0BuZy1ib290c3RyYXAvbmctYm9vdHN0cmFwL21vZGFsL21vZGFsLnRzIiwibmc6Ly9AbmctYm9vdHN0cmFwL25nLWJvb3RzdHJhcC9tb2RhbC9tb2RhbC5tb2R1bGUudHMiLCJuZzovL0BuZy1ib290c3RyYXAvbmctYm9vdHN0cmFwL3BhZ2luYXRpb24vcGFnaW5hdGlvbi1jb25maWcudHMiLCJuZzovL0BuZy1ib290c3RyYXAvbmctYm9vdHN0cmFwL3BhZ2luYXRpb24vcGFnaW5hdGlvbi50cyIsIm5nOi8vQG5nLWJvb3RzdHJhcC9uZy1ib290c3RyYXAvcGFnaW5hdGlvbi9wYWdpbmF0aW9uLm1vZHVsZS50cyIsIm5nOi8vQG5nLWJvb3RzdHJhcC9uZy1ib290c3RyYXAvdXRpbC90cmlnZ2Vycy50cyIsIm5nOi8vQG5nLWJvb3RzdHJhcC9uZy1ib290c3RyYXAvcG9wb3Zlci9wb3BvdmVyLWNvbmZpZy50cyIsIm5nOi8vQG5nLWJvb3RzdHJhcC9uZy1ib290c3RyYXAvcG9wb3Zlci9wb3BvdmVyLnRzIiwibmc6Ly9AbmctYm9vdHN0cmFwL25nLWJvb3RzdHJhcC9wb3BvdmVyL3BvcG92ZXIubW9kdWxlLnRzIiwibmc6Ly9AbmctYm9vdHN0cmFwL25nLWJvb3RzdHJhcC9wcm9ncmVzc2Jhci9wcm9ncmVzc2Jhci1jb25maWcudHMiLCJuZzovL0BuZy1ib290c3RyYXAvbmctYm9vdHN0cmFwL3Byb2dyZXNzYmFyL3Byb2dyZXNzYmFyLnRzIiwibmc6Ly9AbmctYm9vdHN0cmFwL25nLWJvb3RzdHJhcC9wcm9ncmVzc2Jhci9wcm9ncmVzc2Jhci5tb2R1bGUudHMiLCJuZzovL0BuZy1ib290c3RyYXAvbmctYm9vdHN0cmFwL3JhdGluZy9yYXRpbmctY29uZmlnLnRzIiwibmc6Ly9AbmctYm9vdHN0cmFwL25nLWJvb3RzdHJhcC9yYXRpbmcvcmF0aW5nLnRzIiwibmc6Ly9AbmctYm9vdHN0cmFwL25nLWJvb3RzdHJhcC9yYXRpbmcvcmF0aW5nLm1vZHVsZS50cyIsIm5nOi8vQG5nLWJvb3RzdHJhcC9uZy1ib290c3RyYXAvdGFic2V0L3RhYnNldC1jb25maWcudHMiLCJuZzovL0BuZy1ib290c3RyYXAvbmctYm9vdHN0cmFwL3RhYnNldC90YWJzZXQudHMiLCJuZzovL0BuZy1ib290c3RyYXAvbmctYm9vdHN0cmFwL3RhYnNldC90YWJzZXQubW9kdWxlLnRzIiwibmc6Ly9AbmctYm9vdHN0cmFwL25nLWJvb3RzdHJhcC90aW1lcGlja2VyL25nYi10aW1lLnRzIiwibmc6Ly9AbmctYm9vdHN0cmFwL25nLWJvb3RzdHJhcC90aW1lcGlja2VyL3RpbWVwaWNrZXItY29uZmlnLnRzIiwibmc6Ly9AbmctYm9vdHN0cmFwL25nLWJvb3RzdHJhcC90aW1lcGlja2VyL25nYi10aW1lLWFkYXB0ZXIudHMiLCJuZzovL0BuZy1ib290c3RyYXAvbmctYm9vdHN0cmFwL3RpbWVwaWNrZXIvdGltZXBpY2tlci50cyIsIm5nOi8vQG5nLWJvb3RzdHJhcC9uZy1ib290c3RyYXAvdGltZXBpY2tlci90aW1lcGlja2VyLm1vZHVsZS50cyIsIm5nOi8vQG5nLWJvb3RzdHJhcC9uZy1ib290c3RyYXAvdG9vbHRpcC90b29sdGlwLWNvbmZpZy50cyIsIm5nOi8vQG5nLWJvb3RzdHJhcC9uZy1ib290c3RyYXAvdG9vbHRpcC90b29sdGlwLnRzIiwibmc6Ly9AbmctYm9vdHN0cmFwL25nLWJvb3RzdHJhcC90b29sdGlwL3Rvb2x0aXAubW9kdWxlLnRzIiwibmc6Ly9AbmctYm9vdHN0cmFwL25nLWJvb3RzdHJhcC90eXBlYWhlYWQvaGlnaGxpZ2h0LnRzIiwibmc6Ly9AbmctYm9vdHN0cmFwL25nLWJvb3RzdHJhcC90eXBlYWhlYWQvdHlwZWFoZWFkLXdpbmRvdy50cyIsIm5nOi8vQG5nLWJvb3RzdHJhcC9uZy1ib290c3RyYXAvdXRpbC9hY2Nlc3NpYmlsaXR5L2xpdmUudHMiLCJuZzovL0BuZy1ib290c3RyYXAvbmctYm9vdHN0cmFwL3R5cGVhaGVhZC90eXBlYWhlYWQtY29uZmlnLnRzIiwibmc6Ly9AbmctYm9vdHN0cmFwL25nLWJvb3RzdHJhcC90eXBlYWhlYWQvdHlwZWFoZWFkLnRzIiwibmc6Ly9AbmctYm9vdHN0cmFwL25nLWJvb3RzdHJhcC90eXBlYWhlYWQvdHlwZWFoZWFkLm1vZHVsZS50cyIsIm5nOi8vQG5nLWJvb3RzdHJhcC9uZy1ib290c3RyYXAvaW5kZXgudHMiXSwic291cmNlc0NvbnRlbnQiOlsiZXhwb3J0IGZ1bmN0aW9uIHRvSW50ZWdlcih2YWx1ZTogYW55KTogbnVtYmVyIHtcclxuICByZXR1cm4gcGFyc2VJbnQoYCR7dmFsdWV9YCwgMTApO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gdG9TdHJpbmcodmFsdWU6IGFueSk6IHN0cmluZyB7XHJcbiAgcmV0dXJuICh2YWx1ZSAhPT0gdW5kZWZpbmVkICYmIHZhbHVlICE9PSBudWxsKSA/IGAke3ZhbHVlfWAgOiAnJztcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGdldFZhbHVlSW5SYW5nZSh2YWx1ZTogbnVtYmVyLCBtYXg6IG51bWJlciwgbWluID0gMCk6IG51bWJlciB7XHJcbiAgcmV0dXJuIE1hdGgubWF4KE1hdGgubWluKHZhbHVlLCBtYXgpLCBtaW4pO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gaXNTdHJpbmcodmFsdWU6IGFueSk6IHZhbHVlIGlzIHN0cmluZyB7XHJcbiAgcmV0dXJuIHR5cGVvZiB2YWx1ZSA9PT0gJ3N0cmluZyc7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBpc051bWJlcih2YWx1ZTogYW55KTogdmFsdWUgaXMgbnVtYmVyIHtcclxuICByZXR1cm4gIWlzTmFOKHRvSW50ZWdlcih2YWx1ZSkpO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gaXNJbnRlZ2VyKHZhbHVlOiBhbnkpOiB2YWx1ZSBpcyBudW1iZXIge1xyXG4gIHJldHVybiB0eXBlb2YgdmFsdWUgPT09ICdudW1iZXInICYmIGlzRmluaXRlKHZhbHVlKSAmJiBNYXRoLmZsb29yKHZhbHVlKSA9PT0gdmFsdWU7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBpc0RlZmluZWQodmFsdWU6IGFueSk6IGJvb2xlYW4ge1xyXG4gIHJldHVybiB2YWx1ZSAhPT0gdW5kZWZpbmVkICYmIHZhbHVlICE9PSBudWxsO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gcGFkTnVtYmVyKHZhbHVlOiBudW1iZXIpIHtcclxuICBpZiAoaXNOdW1iZXIodmFsdWUpKSB7XHJcbiAgICByZXR1cm4gYDAke3ZhbHVlfWAuc2xpY2UoLTIpO1xyXG4gIH0gZWxzZSB7XHJcbiAgICByZXR1cm4gJyc7XHJcbiAgfVxyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gcmVnRXhwRXNjYXBlKHRleHQpIHtcclxuICByZXR1cm4gdGV4dC5yZXBsYWNlKC9bLVtcXF17fSgpKis/LixcXFxcXiR8I1xcc10vZywgJ1xcXFwkJicpO1xyXG59XHJcbiIsImltcG9ydCB7SW5qZWN0YWJsZX0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcblxyXG4vKipcclxuICogQ29uZmlndXJhdGlvbiBzZXJ2aWNlIGZvciB0aGUgTmdiQWNjb3JkaW9uIGNvbXBvbmVudC5cclxuICogWW91IGNhbiBpbmplY3QgdGhpcyBzZXJ2aWNlLCB0eXBpY2FsbHkgaW4geW91ciByb290IGNvbXBvbmVudCwgYW5kIGN1c3RvbWl6ZSB0aGUgdmFsdWVzIG9mIGl0cyBwcm9wZXJ0aWVzIGluXHJcbiAqIG9yZGVyIHRvIHByb3ZpZGUgZGVmYXVsdCB2YWx1ZXMgZm9yIGFsbCB0aGUgYWNjb3JkaW9ucyB1c2VkIGluIHRoZSBhcHBsaWNhdGlvbi5cclxuICovXHJcbkBJbmplY3RhYmxlKHtwcm92aWRlZEluOiAncm9vdCd9KVxyXG5leHBvcnQgY2xhc3MgTmdiQWNjb3JkaW9uQ29uZmlnIHtcclxuICBjbG9zZU90aGVycyA9IGZhbHNlO1xyXG4gIHR5cGU6IHN0cmluZztcclxufVxyXG4iLCJpbXBvcnQge1xyXG4gIEFmdGVyQ29udGVudENoZWNrZWQsXHJcbiAgQ29tcG9uZW50LFxyXG4gIENvbnRlbnRDaGlsZHJlbixcclxuICBEaXJlY3RpdmUsXHJcbiAgRXZlbnRFbWl0dGVyLFxyXG4gIElucHV0LFxyXG4gIE91dHB1dCxcclxuICBRdWVyeUxpc3QsXHJcbiAgVGVtcGxhdGVSZWZcclxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuXHJcbmltcG9ydCB7aXNTdHJpbmd9IGZyb20gJy4uL3V0aWwvdXRpbCc7XHJcblxyXG5pbXBvcnQge05nYkFjY29yZGlvbkNvbmZpZ30gZnJvbSAnLi9hY2NvcmRpb24tY29uZmlnJztcclxuXHJcbmxldCBuZXh0SWQgPSAwO1xyXG5cclxuLyoqXHJcbiAqIFRoaXMgZGlyZWN0aXZlIHNob3VsZCBiZSB1c2VkIHRvIHdyYXAgYWNjb3JkaW9uIHBhbmVsIHRpdGxlcyB0aGF0IG5lZWQgdG8gY29udGFpbiBIVE1MIG1hcmt1cCBvciBvdGhlciBkaXJlY3RpdmVzLlxyXG4gKi9cclxuQERpcmVjdGl2ZSh7c2VsZWN0b3I6ICduZy10ZW1wbGF0ZVtuZ2JQYW5lbFRpdGxlXSd9KVxyXG5leHBvcnQgY2xhc3MgTmdiUGFuZWxUaXRsZSB7XHJcbiAgY29uc3RydWN0b3IocHVibGljIHRlbXBsYXRlUmVmOiBUZW1wbGF0ZVJlZjxhbnk+KSB7fVxyXG59XHJcblxyXG4vKipcclxuICogVGhpcyBkaXJlY3RpdmUgbXVzdCBiZSB1c2VkIHRvIHdyYXAgYWNjb3JkaW9uIHBhbmVsIGNvbnRlbnQuXHJcbiAqL1xyXG5ARGlyZWN0aXZlKHtzZWxlY3RvcjogJ25nLXRlbXBsYXRlW25nYlBhbmVsQ29udGVudF0nfSlcclxuZXhwb3J0IGNsYXNzIE5nYlBhbmVsQ29udGVudCB7XHJcbiAgY29uc3RydWN0b3IocHVibGljIHRlbXBsYXRlUmVmOiBUZW1wbGF0ZVJlZjxhbnk+KSB7fVxyXG59XHJcblxyXG4vKipcclxuICogVGhlIE5nYlBhbmVsIGRpcmVjdGl2ZSByZXByZXNlbnRzIGFuIGluZGl2aWR1YWwgcGFuZWwgd2l0aCB0aGUgdGl0bGUgYW5kIGNvbGxhcHNpYmxlXHJcbiAqIGNvbnRlbnRcclxuICovXHJcbkBEaXJlY3RpdmUoe3NlbGVjdG9yOiAnbmdiLXBhbmVsJ30pXHJcbmV4cG9ydCBjbGFzcyBOZ2JQYW5lbCBpbXBsZW1lbnRzIEFmdGVyQ29udGVudENoZWNrZWQge1xyXG4gIC8qKlxyXG4gICAqICBBIGZsYWcgZGV0ZXJtaW5pbmcgd2hldGhlciB0aGUgcGFuZWwgaXMgZGlzYWJsZWQgb3Igbm90LlxyXG4gICAqICBXaGVuIGRpc2FibGVkLCB0aGUgcGFuZWwgY2Fubm90IGJlIHRvZ2dsZWQuXHJcbiAgICovXHJcbiAgQElucHV0KCkgZGlzYWJsZWQgPSBmYWxzZTtcclxuXHJcbiAgLyoqXHJcbiAgICogIEFuIG9wdGlvbmFsIGlkIGZvciB0aGUgcGFuZWwuIFRoZSBpZCBzaG91bGQgYmUgdW5pcXVlLlxyXG4gICAqICBJZiBub3QgcHJvdmlkZWQsIGl0IHdpbGwgYmUgYXV0by1nZW5lcmF0ZWQuXHJcbiAgICovXHJcbiAgQElucHV0KCkgaWQgPSBgbmdiLXBhbmVsLSR7bmV4dElkKyt9YDtcclxuXHJcbiAgLyoqXHJcbiAgICogQSBmbGFnIHRlbGxpbmcgaWYgdGhlIHBhbmVsIGlzIGN1cnJlbnRseSBvcGVuXHJcbiAgICovXHJcbiAgaXNPcGVuID0gZmFsc2U7XHJcblxyXG4gIC8qKlxyXG4gICAqICBUaGUgdGl0bGUgZm9yIHRoZSBwYW5lbC5cclxuICAgKi9cclxuICBASW5wdXQoKSB0aXRsZTogc3RyaW5nO1xyXG5cclxuICAvKipcclxuICAgKiAgQWNjb3JkaW9uJ3MgdHlwZXMgb2YgcGFuZWxzIHRvIGJlIGFwcGxpZWQgcGVyIHBhbmVsIGJhc2lzLlxyXG4gICAqICBCb290c3RyYXAgcmVjb2duaXplcyB0aGUgZm9sbG93aW5nIHR5cGVzOiBcInByaW1hcnlcIiwgXCJzZWNvbmRhcnlcIiwgXCJzdWNjZXNzXCIsIFwiZGFuZ2VyXCIsIFwid2FybmluZ1wiLCBcImluZm9cIiwgXCJsaWdodFwiXHJcbiAgICogYW5kIFwiZGFya1wiXHJcbiAgICovXHJcbiAgQElucHV0KCkgdHlwZTogc3RyaW5nO1xyXG5cclxuICB0aXRsZVRwbDogTmdiUGFuZWxUaXRsZSB8IG51bGw7XHJcbiAgY29udGVudFRwbDogTmdiUGFuZWxDb250ZW50IHwgbnVsbDtcclxuXHJcbiAgQENvbnRlbnRDaGlsZHJlbihOZ2JQYW5lbFRpdGxlLCB7ZGVzY2VuZGFudHM6IGZhbHNlfSkgdGl0bGVUcGxzOiBRdWVyeUxpc3Q8TmdiUGFuZWxUaXRsZT47XHJcbiAgQENvbnRlbnRDaGlsZHJlbihOZ2JQYW5lbENvbnRlbnQsIHtkZXNjZW5kYW50czogZmFsc2V9KSBjb250ZW50VHBsczogUXVlcnlMaXN0PE5nYlBhbmVsQ29udGVudD47XHJcblxyXG4gIG5nQWZ0ZXJDb250ZW50Q2hlY2tlZCgpIHtcclxuICAgIC8vIFdlIGFyZSB1c2luZyBAQ29udGVudENoaWxkcmVuIGluc3RlYWQgb2YgQENvbnRlbnRDaGlsZCBhcyBpbiB0aGUgQW5ndWxhciB2ZXJzaW9uIGJlaW5nIHVzZWRcclxuICAgIC8vIG9ubHkgQENvbnRlbnRDaGlsZHJlbiBhbGxvd3MgdXMgdG8gc3BlY2lmeSB0aGUge2Rlc2NlbmRhbnRzOiBmYWxzZX0gb3B0aW9uLlxyXG4gICAgLy8gV2l0aG91dCB7ZGVzY2VuZGFudHM6IGZhbHNlfSB3ZSBhcmUgaGl0dGluZyBidWdzIGRlc2NyaWJlZCBpbjpcclxuICAgIC8vIGh0dHBzOi8vZ2l0aHViLmNvbS9uZy1ib290c3RyYXAvbmctYm9vdHN0cmFwL2lzc3Vlcy8yMjQwXHJcbiAgICB0aGlzLnRpdGxlVHBsID0gdGhpcy50aXRsZVRwbHMuZmlyc3Q7XHJcbiAgICB0aGlzLmNvbnRlbnRUcGwgPSB0aGlzLmNvbnRlbnRUcGxzLmZpcnN0O1xyXG4gIH1cclxufVxyXG5cclxuLyoqXHJcbiAqIFRoZSBwYXlsb2FkIG9mIHRoZSBjaGFuZ2UgZXZlbnQgZmlyZWQgcmlnaHQgYmVmb3JlIHRvZ2dsaW5nIGFuIGFjY29yZGlvbiBwYW5lbFxyXG4gKi9cclxuZXhwb3J0IGludGVyZmFjZSBOZ2JQYW5lbENoYW5nZUV2ZW50IHtcclxuICAvKipcclxuICAgKiBJZCBvZiB0aGUgYWNjb3JkaW9uIHBhbmVsIHRoYXQgaXMgdG9nZ2xlZFxyXG4gICAqL1xyXG4gIHBhbmVsSWQ6IHN0cmluZztcclxuXHJcbiAgLyoqXHJcbiAgICogV2hldGhlciB0aGUgcGFuZWwgd2lsbCBiZSBvcGVuZWQgKHRydWUpIG9yIGNsb3NlZCAoZmFsc2UpXHJcbiAgICovXHJcbiAgbmV4dFN0YXRlOiBib29sZWFuO1xyXG5cclxuICAvKipcclxuICAgKiBGdW5jdGlvbiB0aGF0IHdpbGwgcHJldmVudCBwYW5lbCB0b2dnbGluZyBpZiBjYWxsZWRcclxuICAgKi9cclxuICBwcmV2ZW50RGVmYXVsdDogKCkgPT4gdm9pZDtcclxufVxyXG5cclxuLyoqXHJcbiAqIFRoZSBOZ2JBY2NvcmRpb24gZGlyZWN0aXZlIGlzIGEgY29sbGVjdGlvbiBvZiBwYW5lbHMuXHJcbiAqIEl0IGNhbiBhc3N1cmUgdGhhdCBvbmx5IG9uZSBwYW5lbCBjYW4gYmUgb3BlbmVkIGF0IGEgdGltZS5cclxuICovXHJcbkBDb21wb25lbnQoe1xyXG4gIHNlbGVjdG9yOiAnbmdiLWFjY29yZGlvbicsXHJcbiAgZXhwb3J0QXM6ICduZ2JBY2NvcmRpb24nLFxyXG4gIGhvc3Q6IHsnY2xhc3MnOiAnYWNjb3JkaW9uJywgJ3JvbGUnOiAndGFibGlzdCcsICdbYXR0ci5hcmlhLW11bHRpc2VsZWN0YWJsZV0nOiAnIWNsb3NlT3RoZXJQYW5lbHMnfSxcclxuICB0ZW1wbGF0ZTogYFxyXG4gICAgPG5nLXRlbXBsYXRlIG5nRm9yIGxldC1wYW5lbCBbbmdGb3JPZl09XCJwYW5lbHNcIj5cclxuICAgICAgPGRpdiBjbGFzcz1cImNhcmRcIj5cclxuICAgICAgICA8ZGl2IHJvbGU9XCJ0YWJcIiBpZD1cInt7cGFuZWwuaWR9fS1oZWFkZXJcIiBbY2xhc3NdPVwiJ2NhcmQtaGVhZGVyICcgKyAocGFuZWwudHlwZSA/ICdiZy0nK3BhbmVsLnR5cGU6IHR5cGUgPyAnYmctJyt0eXBlIDogJycpXCI+XHJcbiAgICAgICAgICA8aDUgY2xhc3M9XCJtYi0wXCI+XHJcbiAgICAgICAgICAgIDxidXR0b24gY2xhc3M9XCJidG4gYnRuLWxpbmtcIiAoY2xpY2spPVwiISF0b2dnbGUocGFuZWwuaWQpXCIgW2Rpc2FibGVkXT1cInBhbmVsLmRpc2FibGVkXCIgW2NsYXNzLmNvbGxhcHNlZF09XCIhcGFuZWwuaXNPcGVuXCJcclxuICAgICAgICAgICAgICBbYXR0ci5hcmlhLWV4cGFuZGVkXT1cInBhbmVsLmlzT3BlblwiIFthdHRyLmFyaWEtY29udHJvbHNdPVwicGFuZWwuaWRcIj5cclxuICAgICAgICAgICAgICB7e3BhbmVsLnRpdGxlfX08bmctdGVtcGxhdGUgW25nVGVtcGxhdGVPdXRsZXRdPVwicGFuZWwudGl0bGVUcGw/LnRlbXBsYXRlUmVmXCI+PC9uZy10ZW1wbGF0ZT5cclxuICAgICAgICAgICAgPC9idXR0b24+XHJcbiAgICAgICAgICA8L2g1PlxyXG4gICAgICAgIDwvZGl2PlxyXG4gICAgICAgIDxkaXYgaWQ9XCJ7e3BhbmVsLmlkfX1cIiByb2xlPVwidGFicGFuZWxcIiBbYXR0ci5hcmlhLWxhYmVsbGVkYnldPVwicGFuZWwuaWQgKyAnLWhlYWRlcidcIlxyXG4gICAgICAgICAgICAgY2xhc3M9XCJjb2xsYXBzZVwiIFtjbGFzcy5zaG93XT1cInBhbmVsLmlzT3BlblwiICpuZ0lmPVwiIWRlc3Ryb3lPbkhpZGUgfHwgcGFuZWwuaXNPcGVuXCI+XHJcbiAgICAgICAgICA8ZGl2IGNsYXNzPVwiY2FyZC1ib2R5XCI+XHJcbiAgICAgICAgICAgICAgIDxuZy10ZW1wbGF0ZSBbbmdUZW1wbGF0ZU91dGxldF09XCJwYW5lbC5jb250ZW50VHBsPy50ZW1wbGF0ZVJlZlwiPjwvbmctdGVtcGxhdGU+XHJcbiAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICA8L2Rpdj5cclxuICAgICAgPC9kaXY+XHJcbiAgICA8L25nLXRlbXBsYXRlPlxyXG4gIGBcclxufSlcclxuZXhwb3J0IGNsYXNzIE5nYkFjY29yZGlvbiBpbXBsZW1lbnRzIEFmdGVyQ29udGVudENoZWNrZWQge1xyXG4gIEBDb250ZW50Q2hpbGRyZW4oTmdiUGFuZWwpIHBhbmVsczogUXVlcnlMaXN0PE5nYlBhbmVsPjtcclxuXHJcbiAgLyoqXHJcbiAgICogQW4gYXJyYXkgb3IgY29tbWEgc2VwYXJhdGVkIHN0cmluZ3Mgb2YgcGFuZWwgaWRlbnRpZmllcnMgdGhhdCBzaG91bGQgYmUgb3BlbmVkXHJcbiAgICovXHJcbiAgQElucHV0KCkgYWN0aXZlSWRzOiBzdHJpbmcgfCBzdHJpbmdbXSA9IFtdO1xyXG5cclxuICAvKipcclxuICAgKiAgV2hldGhlciB0aGUgb3RoZXIgcGFuZWxzIHNob3VsZCBiZSBjbG9zZWQgd2hlbiBhIHBhbmVsIGlzIG9wZW5lZFxyXG4gICAqL1xyXG4gIEBJbnB1dCgnY2xvc2VPdGhlcnMnKSBjbG9zZU90aGVyUGFuZWxzOiBib29sZWFuO1xyXG5cclxuICAvKipcclxuICAgKiBXaGV0aGVyIHRoZSBjbG9zZWQgcGFuZWxzIHNob3VsZCBiZSBoaWRkZW4gd2l0aG91dCBkZXN0cm95aW5nIHRoZW1cclxuICAgKi9cclxuICBASW5wdXQoKSBkZXN0cm95T25IaWRlID0gdHJ1ZTtcclxuXHJcbiAgLyoqXHJcbiAgICogIEFjY29yZGlvbidzIHR5cGVzIG9mIHBhbmVscyB0byBiZSBhcHBsaWVkIGdsb2JhbGx5LlxyXG4gICAqICBCb290c3RyYXAgcmVjb2duaXplcyB0aGUgZm9sbG93aW5nIHR5cGVzOiBcInByaW1hcnlcIiwgXCJzZWNvbmRhcnlcIiwgXCJzdWNjZXNzXCIsIFwiZGFuZ2VyXCIsIFwid2FybmluZ1wiLCBcImluZm9cIiwgXCJsaWdodFwiXHJcbiAgICogYW5kIFwiZGFya1xyXG4gICAqL1xyXG4gIEBJbnB1dCgpIHR5cGU6IHN0cmluZztcclxuXHJcbiAgLyoqXHJcbiAgICogQSBwYW5lbCBjaGFuZ2UgZXZlbnQgZmlyZWQgcmlnaHQgYmVmb3JlIHRoZSBwYW5lbCB0b2dnbGUgaGFwcGVucy4gU2VlIE5nYlBhbmVsQ2hhbmdlRXZlbnQgZm9yIHBheWxvYWQgZGV0YWlsc1xyXG4gICAqL1xyXG4gIEBPdXRwdXQoKSBwYW5lbENoYW5nZSA9IG5ldyBFdmVudEVtaXR0ZXI8TmdiUGFuZWxDaGFuZ2VFdmVudD4oKTtcclxuXHJcbiAgY29uc3RydWN0b3IoY29uZmlnOiBOZ2JBY2NvcmRpb25Db25maWcpIHtcclxuICAgIHRoaXMudHlwZSA9IGNvbmZpZy50eXBlO1xyXG4gICAgdGhpcy5jbG9zZU90aGVyUGFuZWxzID0gY29uZmlnLmNsb3NlT3RoZXJzO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogQ2hlY2tzIGlmIGEgcGFuZWwgd2l0aCBhIGdpdmVuIGlkIGlzIGV4cGFuZGVkIG9yIG5vdC5cclxuICAgKi9cclxuICBpc0V4cGFuZGVkKHBhbmVsSWQ6IHN0cmluZyk6IGJvb2xlYW4geyByZXR1cm4gdGhpcy5hY3RpdmVJZHMuaW5kZXhPZihwYW5lbElkKSA+IC0xOyB9XHJcblxyXG4gIC8qKlxyXG4gICAqIEV4cGFuZHMgYSBwYW5lbCB3aXRoIGEgZ2l2ZW4gaWQuIEhhcyBubyBlZmZlY3QgaWYgdGhlIHBhbmVsIGlzIGFscmVhZHkgZXhwYW5kZWQgb3IgZGlzYWJsZWQuXHJcbiAgICovXHJcbiAgZXhwYW5kKHBhbmVsSWQ6IHN0cmluZyk6IHZvaWQgeyB0aGlzLl9jaGFuZ2VPcGVuU3RhdGUodGhpcy5fZmluZFBhbmVsQnlJZChwYW5lbElkKSwgdHJ1ZSk7IH1cclxuXHJcbiAgLyoqXHJcbiAgICogRXhwYW5kcyBhbGwgcGFuZWxzIGlmIFtjbG9zZU90aGVyc109XCJmYWxzZVwiLiBGb3IgdGhlIFtjbG9zZU90aGVyc109XCJ0cnVlXCIgY2FzZSB3aWxsIGhhdmUgbm8gZWZmZWN0IGlmIHRoZXJlIGlzIGFuXHJcbiAgICogb3BlbiBwYW5lbCwgb3RoZXJ3aXNlIHRoZSBmaXJzdCBwYW5lbCB3aWxsIGJlIGV4cGFuZGVkLlxyXG4gICAqL1xyXG4gIGV4cGFuZEFsbCgpOiB2b2lkIHtcclxuICAgIGlmICh0aGlzLmNsb3NlT3RoZXJQYW5lbHMpIHtcclxuICAgICAgaWYgKHRoaXMuYWN0aXZlSWRzLmxlbmd0aCA9PT0gMCAmJiB0aGlzLnBhbmVscy5sZW5ndGgpIHtcclxuICAgICAgICB0aGlzLl9jaGFuZ2VPcGVuU3RhdGUodGhpcy5wYW5lbHMuZmlyc3QsIHRydWUpO1xyXG4gICAgICB9XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB0aGlzLnBhbmVscy5mb3JFYWNoKHBhbmVsID0+IHRoaXMuX2NoYW5nZU9wZW5TdGF0ZShwYW5lbCwgdHJ1ZSkpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogQ29sbGFwc2VzIGEgcGFuZWwgd2l0aCBhIGdpdmVuIGlkLiBIYXMgbm8gZWZmZWN0IGlmIHRoZSBwYW5lbCBpcyBhbHJlYWR5IGNvbGxhcHNlZCBvciBkaXNhYmxlZC5cclxuICAgKi9cclxuICBjb2xsYXBzZShwYW5lbElkOiBzdHJpbmcpIHsgdGhpcy5fY2hhbmdlT3BlblN0YXRlKHRoaXMuX2ZpbmRQYW5lbEJ5SWQocGFuZWxJZCksIGZhbHNlKTsgfVxyXG5cclxuICAvKipcclxuICAgKiBDb2xsYXBzZXMgYWxsIG9wZW4gcGFuZWxzLlxyXG4gICAqL1xyXG4gIGNvbGxhcHNlQWxsKCkge1xyXG4gICAgdGhpcy5wYW5lbHMuZm9yRWFjaCgocGFuZWwpID0+IHsgdGhpcy5fY2hhbmdlT3BlblN0YXRlKHBhbmVsLCBmYWxzZSk7IH0pO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogUHJvZ3JhbW1hdGljYWxseSB0b2dnbGUgYSBwYW5lbCB3aXRoIGEgZ2l2ZW4gaWQuIEhhcyBubyBlZmZlY3QgaWYgdGhlIHBhbmVsIGlzIGRpc2FibGVkLlxyXG4gICAqL1xyXG4gIHRvZ2dsZShwYW5lbElkOiBzdHJpbmcpIHtcclxuICAgIGNvbnN0IHBhbmVsID0gdGhpcy5fZmluZFBhbmVsQnlJZChwYW5lbElkKTtcclxuICAgIGlmIChwYW5lbCkge1xyXG4gICAgICB0aGlzLl9jaGFuZ2VPcGVuU3RhdGUocGFuZWwsICFwYW5lbC5pc09wZW4pO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgbmdBZnRlckNvbnRlbnRDaGVja2VkKCkge1xyXG4gICAgLy8gYWN0aXZlIGlkIHVwZGF0ZXNcclxuICAgIGlmIChpc1N0cmluZyh0aGlzLmFjdGl2ZUlkcykpIHtcclxuICAgICAgdGhpcy5hY3RpdmVJZHMgPSB0aGlzLmFjdGl2ZUlkcy5zcGxpdCgvXFxzKixcXHMqLyk7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gdXBkYXRlIHBhbmVscyBvcGVuIHN0YXRlc1xyXG4gICAgdGhpcy5wYW5lbHMuZm9yRWFjaChwYW5lbCA9PiBwYW5lbC5pc09wZW4gPSAhcGFuZWwuZGlzYWJsZWQgJiYgdGhpcy5hY3RpdmVJZHMuaW5kZXhPZihwYW5lbC5pZCkgPiAtMSk7XHJcblxyXG4gICAgLy8gY2xvc2VPdGhlcnMgdXBkYXRlc1xyXG4gICAgaWYgKHRoaXMuYWN0aXZlSWRzLmxlbmd0aCA+IDEgJiYgdGhpcy5jbG9zZU90aGVyUGFuZWxzKSB7XHJcbiAgICAgIHRoaXMuX2Nsb3NlT3RoZXJzKHRoaXMuYWN0aXZlSWRzWzBdKTtcclxuICAgICAgdGhpcy5fdXBkYXRlQWN0aXZlSWRzKCk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIF9jaGFuZ2VPcGVuU3RhdGUocGFuZWw6IE5nYlBhbmVsLCBuZXh0U3RhdGU6IGJvb2xlYW4pIHtcclxuICAgIGlmIChwYW5lbCAmJiAhcGFuZWwuZGlzYWJsZWQgJiYgcGFuZWwuaXNPcGVuICE9PSBuZXh0U3RhdGUpIHtcclxuICAgICAgbGV0IGRlZmF1bHRQcmV2ZW50ZWQgPSBmYWxzZTtcclxuXHJcbiAgICAgIHRoaXMucGFuZWxDaGFuZ2UuZW1pdChcclxuICAgICAgICAgIHtwYW5lbElkOiBwYW5lbC5pZCwgbmV4dFN0YXRlOiBuZXh0U3RhdGUsIHByZXZlbnREZWZhdWx0OiAoKSA9PiB7IGRlZmF1bHRQcmV2ZW50ZWQgPSB0cnVlOyB9fSk7XHJcblxyXG4gICAgICBpZiAoIWRlZmF1bHRQcmV2ZW50ZWQpIHtcclxuICAgICAgICBwYW5lbC5pc09wZW4gPSBuZXh0U3RhdGU7XHJcblxyXG4gICAgICAgIGlmIChuZXh0U3RhdGUgJiYgdGhpcy5jbG9zZU90aGVyUGFuZWxzKSB7XHJcbiAgICAgICAgICB0aGlzLl9jbG9zZU90aGVycyhwYW5lbC5pZCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuX3VwZGF0ZUFjdGl2ZUlkcygpO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIF9jbG9zZU90aGVycyhwYW5lbElkOiBzdHJpbmcpIHtcclxuICAgIHRoaXMucGFuZWxzLmZvckVhY2gocGFuZWwgPT4ge1xyXG4gICAgICBpZiAocGFuZWwuaWQgIT09IHBhbmVsSWQpIHtcclxuICAgICAgICBwYW5lbC5pc09wZW4gPSBmYWxzZTtcclxuICAgICAgfVxyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIF9maW5kUGFuZWxCeUlkKHBhbmVsSWQ6IHN0cmluZyk6IE5nYlBhbmVsIHwgbnVsbCB7IHJldHVybiB0aGlzLnBhbmVscy5maW5kKHAgPT4gcC5pZCA9PT0gcGFuZWxJZCk7IH1cclxuXHJcbiAgcHJpdmF0ZSBfdXBkYXRlQWN0aXZlSWRzKCkge1xyXG4gICAgdGhpcy5hY3RpdmVJZHMgPSB0aGlzLnBhbmVscy5maWx0ZXIocGFuZWwgPT4gcGFuZWwuaXNPcGVuICYmICFwYW5lbC5kaXNhYmxlZCkubWFwKHBhbmVsID0+IHBhbmVsLmlkKTtcclxuICB9XHJcbn1cclxuIiwiaW1wb3J0IHtOZ01vZHVsZSwgTW9kdWxlV2l0aFByb3ZpZGVyc30gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7Q29tbW9uTW9kdWxlfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xyXG5cclxuaW1wb3J0IHtOZ2JBY2NvcmRpb24sIE5nYlBhbmVsLCBOZ2JQYW5lbFRpdGxlLCBOZ2JQYW5lbENvbnRlbnR9IGZyb20gJy4vYWNjb3JkaW9uJztcclxuXHJcbmV4cG9ydCB7TmdiQWNjb3JkaW9uLCBOZ2JQYW5lbCwgTmdiUGFuZWxUaXRsZSwgTmdiUGFuZWxDb250ZW50LCBOZ2JQYW5lbENoYW5nZUV2ZW50fSBmcm9tICcuL2FjY29yZGlvbic7XHJcbmV4cG9ydCB7TmdiQWNjb3JkaW9uQ29uZmlnfSBmcm9tICcuL2FjY29yZGlvbi1jb25maWcnO1xyXG5cclxuY29uc3QgTkdCX0FDQ09SRElPTl9ESVJFQ1RJVkVTID0gW05nYkFjY29yZGlvbiwgTmdiUGFuZWwsIE5nYlBhbmVsVGl0bGUsIE5nYlBhbmVsQ29udGVudF07XHJcblxyXG5ATmdNb2R1bGUoe2RlY2xhcmF0aW9uczogTkdCX0FDQ09SRElPTl9ESVJFQ1RJVkVTLCBleHBvcnRzOiBOR0JfQUNDT1JESU9OX0RJUkVDVElWRVMsIGltcG9ydHM6IFtDb21tb25Nb2R1bGVdfSlcclxuZXhwb3J0IGNsYXNzIE5nYkFjY29yZGlvbk1vZHVsZSB7XHJcbiAgLyoqXHJcbiAgICogSW1wb3J0aW5nIHdpdGggJy5mb3JSb290KCknIGlzIG5vIGxvbmdlciBuZWNlc3NhcnksIHlvdSBjYW4gc2ltcGx5IGltcG9ydCB0aGUgbW9kdWxlLlxyXG4gICAqIFdpbGwgYmUgcmVtb3ZlZCBpbiA0LjAuMC5cclxuICAgKlxyXG4gICAqIEBkZXByZWNhdGVkIDMuMC4wXHJcbiAgICovXHJcbiAgc3RhdGljIGZvclJvb3QoKTogTW9kdWxlV2l0aFByb3ZpZGVycyB7IHJldHVybiB7bmdNb2R1bGU6IE5nYkFjY29yZGlvbk1vZHVsZX07IH1cclxufVxyXG4iLCJpbXBvcnQge0luamVjdGFibGV9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5cclxuLyoqXHJcbiAqIENvbmZpZ3VyYXRpb24gc2VydmljZSBmb3IgdGhlIE5nYkFsZXJ0IGNvbXBvbmVudC5cclxuICogWW91IGNhbiBpbmplY3QgdGhpcyBzZXJ2aWNlLCB0eXBpY2FsbHkgaW4geW91ciByb290IGNvbXBvbmVudCwgYW5kIGN1c3RvbWl6ZSB0aGUgdmFsdWVzIG9mIGl0cyBwcm9wZXJ0aWVzIGluXHJcbiAqIG9yZGVyIHRvIHByb3ZpZGUgZGVmYXVsdCB2YWx1ZXMgZm9yIGFsbCB0aGUgYWxlcnRzIHVzZWQgaW4gdGhlIGFwcGxpY2F0aW9uLlxyXG4gKi9cclxuQEluamVjdGFibGUoe3Byb3ZpZGVkSW46ICdyb290J30pXHJcbmV4cG9ydCBjbGFzcyBOZ2JBbGVydENvbmZpZyB7XHJcbiAgZGlzbWlzc2libGUgPSB0cnVlO1xyXG4gIHR5cGUgPSAnd2FybmluZyc7XHJcbn1cclxuIiwiaW1wb3J0IHtcclxuICBDb21wb25lbnQsXHJcbiAgSW5wdXQsXHJcbiAgT3V0cHV0LFxyXG4gIEV2ZW50RW1pdHRlcixcclxuICBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSxcclxuICBSZW5kZXJlcjIsXHJcbiAgRWxlbWVudFJlZixcclxuICBPbkNoYW5nZXMsXHJcbiAgT25Jbml0LFxyXG4gIFNpbXBsZUNoYW5nZXNcclxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuXHJcbmltcG9ydCB7TmdiQWxlcnRDb25maWd9IGZyb20gJy4vYWxlcnQtY29uZmlnJztcclxuXHJcbi8qKlxyXG4gKiBBbGVydHMgY2FuIGJlIHVzZWQgdG8gcHJvdmlkZSBmZWVkYmFjayBtZXNzYWdlcy5cclxuICovXHJcbkBDb21wb25lbnQoe1xyXG4gIHNlbGVjdG9yOiAnbmdiLWFsZXJ0JyxcclxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaCxcclxuICBob3N0OiB7J3JvbGUnOiAnYWxlcnQnLCAnY2xhc3MnOiAnYWxlcnQnLCAnW2NsYXNzLmFsZXJ0LWRpc21pc3NpYmxlXSc6ICdkaXNtaXNzaWJsZSd9LFxyXG4gIHRlbXBsYXRlOiBgXHJcbiAgICA8YnV0dG9uICpuZ0lmPVwiZGlzbWlzc2libGVcIiB0eXBlPVwiYnV0dG9uXCIgY2xhc3M9XCJjbG9zZVwiIGFyaWEtbGFiZWw9XCJDbG9zZVwiIGkxOG4tYXJpYS1sYWJlbD1cIkBAbmdiLmFsZXJ0LmNsb3NlXCJcclxuICAgICAgKGNsaWNrKT1cImNsb3NlSGFuZGxlcigpXCI+XHJcbiAgICAgIDxzcGFuIGFyaWEtaGlkZGVuPVwidHJ1ZVwiPiZ0aW1lczs8L3NwYW4+XHJcbiAgICA8L2J1dHRvbj5cclxuICAgIDxuZy1jb250ZW50PjwvbmctY29udGVudD5cclxuICAgIGAsXHJcbiAgc3R5bGVzOiBbYFxyXG4gICAgOmhvc3Qge1xyXG4gICAgICBkaXNwbGF5OiBibG9jaztcclxuICAgIH1cclxuICBgXVxyXG59KVxyXG5leHBvcnQgY2xhc3MgTmdiQWxlcnQgaW1wbGVtZW50cyBPbkluaXQsXHJcbiAgICBPbkNoYW5nZXMge1xyXG4gIC8qKlxyXG4gICAqIEEgZmxhZyBpbmRpY2F0aW5nIGlmIGEgZ2l2ZW4gYWxlcnQgY2FuIGJlIGRpc21pc3NlZCAoY2xvc2VkKSBieSBhIHVzZXIuIElmIHRoaXMgZmxhZyBpcyBzZXQsIGEgY2xvc2UgYnV0dG9uIChpbiBhXHJcbiAgICogZm9ybSBvZiBhbiDDg8KXKSB3aWxsIGJlIGRpc3BsYXllZC5cclxuICAgKi9cclxuICBASW5wdXQoKSBkaXNtaXNzaWJsZTogYm9vbGVhbjtcclxuICAvKipcclxuICAgKiBBbGVydCB0eXBlIChDU1MgY2xhc3MpLiBCb290c3RyYXAgNCByZWNvZ25pemVzIHRoZSBmb2xsb3dpbmcgdHlwZXM6IFwic3VjY2Vzc1wiLCBcImluZm9cIiwgXCJ3YXJuaW5nXCIsIFwiZGFuZ2VyXCIsXHJcbiAgICogXCJwcmltYXJ5XCIsIFwic2Vjb25kYXJ5XCIsIFwibGlnaHRcIiwgXCJkYXJrXCIuXHJcbiAgICovXHJcbiAgQElucHV0KCkgdHlwZTogc3RyaW5nO1xyXG4gIC8qKlxyXG4gICAqIEFuIGV2ZW50IGVtaXR0ZWQgd2hlbiB0aGUgY2xvc2UgYnV0dG9uIGlzIGNsaWNrZWQuIFRoaXMgZXZlbnQgaGFzIG5vIHBheWxvYWQuIE9ubHkgcmVsZXZhbnQgZm9yIGRpc21pc3NpYmxlIGFsZXJ0cy5cclxuICAgKi9cclxuICBAT3V0cHV0KCkgY2xvc2UgPSBuZXcgRXZlbnRFbWl0dGVyPHZvaWQ+KCk7XHJcblxyXG4gIGNvbnN0cnVjdG9yKGNvbmZpZzogTmdiQWxlcnRDb25maWcsIHByaXZhdGUgX3JlbmRlcmVyOiBSZW5kZXJlcjIsIHByaXZhdGUgX2VsZW1lbnQ6IEVsZW1lbnRSZWYpIHtcclxuICAgIHRoaXMuZGlzbWlzc2libGUgPSBjb25maWcuZGlzbWlzc2libGU7XHJcbiAgICB0aGlzLnR5cGUgPSBjb25maWcudHlwZTtcclxuICB9XHJcblxyXG4gIGNsb3NlSGFuZGxlcigpIHsgdGhpcy5jbG9zZS5lbWl0KG51bGwpOyB9XHJcblxyXG4gIG5nT25DaGFuZ2VzKGNoYW5nZXM6IFNpbXBsZUNoYW5nZXMpIHtcclxuICAgIGNvbnN0IHR5cGVDaGFuZ2UgPSBjaGFuZ2VzWyd0eXBlJ107XHJcbiAgICBpZiAodHlwZUNoYW5nZSAmJiAhdHlwZUNoYW5nZS5maXJzdENoYW5nZSkge1xyXG4gICAgICB0aGlzLl9yZW5kZXJlci5yZW1vdmVDbGFzcyh0aGlzLl9lbGVtZW50Lm5hdGl2ZUVsZW1lbnQsIGBhbGVydC0ke3R5cGVDaGFuZ2UucHJldmlvdXNWYWx1ZX1gKTtcclxuICAgICAgdGhpcy5fcmVuZGVyZXIuYWRkQ2xhc3ModGhpcy5fZWxlbWVudC5uYXRpdmVFbGVtZW50LCBgYWxlcnQtJHt0eXBlQ2hhbmdlLmN1cnJlbnRWYWx1ZX1gKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIG5nT25Jbml0KCkgeyB0aGlzLl9yZW5kZXJlci5hZGRDbGFzcyh0aGlzLl9lbGVtZW50Lm5hdGl2ZUVsZW1lbnQsIGBhbGVydC0ke3RoaXMudHlwZX1gKTsgfVxyXG59XHJcbiIsImltcG9ydCB7TmdNb2R1bGUsIE1vZHVsZVdpdGhQcm92aWRlcnN9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQge0NvbW1vbk1vZHVsZX0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcclxuXHJcbmltcG9ydCB7TmdiQWxlcnR9IGZyb20gJy4vYWxlcnQnO1xyXG5cclxuZXhwb3J0IHtOZ2JBbGVydH0gZnJvbSAnLi9hbGVydCc7XHJcbmV4cG9ydCB7TmdiQWxlcnRDb25maWd9IGZyb20gJy4vYWxlcnQtY29uZmlnJztcclxuXHJcbkBOZ01vZHVsZSh7ZGVjbGFyYXRpb25zOiBbTmdiQWxlcnRdLCBleHBvcnRzOiBbTmdiQWxlcnRdLCBpbXBvcnRzOiBbQ29tbW9uTW9kdWxlXSwgZW50cnlDb21wb25lbnRzOiBbTmdiQWxlcnRdfSlcclxuZXhwb3J0IGNsYXNzIE5nYkFsZXJ0TW9kdWxlIHtcclxuICAvKipcclxuICAgKiBJbXBvcnRpbmcgd2l0aCAnLmZvclJvb3QoKScgaXMgbm8gbG9uZ2VyIG5lY2Vzc2FyeSwgeW91IGNhbiBzaW1wbHkgaW1wb3J0IHRoZSBtb2R1bGUuXHJcbiAgICogV2lsbCBiZSByZW1vdmVkIGluIDQuMC4wLlxyXG4gICAqXHJcbiAgICogQGRlcHJlY2F0ZWQgMy4wLjBcclxuICAgKi9cclxuICBzdGF0aWMgZm9yUm9vdCgpOiBNb2R1bGVXaXRoUHJvdmlkZXJzIHsgcmV0dXJuIHtuZ01vZHVsZTogTmdiQWxlcnRNb2R1bGV9OyB9XHJcbn1cclxuIiwiaW1wb3J0IHtEaXJlY3RpdmV9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5cclxuQERpcmVjdGl2ZSh7XHJcbiAgc2VsZWN0b3I6ICdbbmdiQnV0dG9uTGFiZWxdJyxcclxuICBob3N0OlxyXG4gICAgICB7J1tjbGFzcy5idG5dJzogJ3RydWUnLCAnW2NsYXNzLmFjdGl2ZV0nOiAnYWN0aXZlJywgJ1tjbGFzcy5kaXNhYmxlZF0nOiAnZGlzYWJsZWQnLCAnW2NsYXNzLmZvY3VzXSc6ICdmb2N1c2VkJ31cclxufSlcclxuZXhwb3J0IGNsYXNzIE5nYkJ1dHRvbkxhYmVsIHtcclxuICBhY3RpdmU6IGJvb2xlYW47XHJcbiAgZGlzYWJsZWQ6IGJvb2xlYW47XHJcbiAgZm9jdXNlZDogYm9vbGVhbjtcclxufVxyXG4iLCJpbXBvcnQge0RpcmVjdGl2ZSwgZm9yd2FyZFJlZiwgSW5wdXR9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQge0NvbnRyb2xWYWx1ZUFjY2Vzc29yLCBOR19WQUxVRV9BQ0NFU1NPUn0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xyXG5cclxuaW1wb3J0IHtOZ2JCdXR0b25MYWJlbH0gZnJvbSAnLi9sYWJlbCc7XHJcblxyXG5jb25zdCBOR0JfQ0hFQ0tCT1hfVkFMVUVfQUNDRVNTT1IgPSB7XHJcbiAgcHJvdmlkZTogTkdfVkFMVUVfQUNDRVNTT1IsXHJcbiAgdXNlRXhpc3Rpbmc6IGZvcndhcmRSZWYoKCkgPT4gTmdiQ2hlY2tCb3gpLFxyXG4gIG11bHRpOiB0cnVlXHJcbn07XHJcblxyXG5cclxuLyoqXHJcbiAqIEVhc2lseSBjcmVhdGUgQm9vdHN0cmFwLXN0eWxlIGNoZWNrYm94IGJ1dHRvbnMuIEEgdmFsdWUgb2YgYSBjaGVja2VkIGJ1dHRvbiBpcyBib3VuZCB0byBhIHZhcmlhYmxlXHJcbiAqIHNwZWNpZmllZCB2aWEgbmdNb2RlbC5cclxuICovXHJcbkBEaXJlY3RpdmUoe1xyXG4gIHNlbGVjdG9yOiAnW25nYkJ1dHRvbl1bdHlwZT1jaGVja2JveF0nLFxyXG4gIGhvc3Q6IHtcclxuICAgICdhdXRvY29tcGxldGUnOiAnb2ZmJyxcclxuICAgICdbY2hlY2tlZF0nOiAnY2hlY2tlZCcsXHJcbiAgICAnW2Rpc2FibGVkXSc6ICdkaXNhYmxlZCcsXHJcbiAgICAnKGNoYW5nZSknOiAnb25JbnB1dENoYW5nZSgkZXZlbnQpJyxcclxuICAgICcoZm9jdXMpJzogJ2ZvY3VzZWQgPSB0cnVlJyxcclxuICAgICcoYmx1ciknOiAnZm9jdXNlZCA9IGZhbHNlJ1xyXG4gIH0sXHJcbiAgcHJvdmlkZXJzOiBbTkdCX0NIRUNLQk9YX1ZBTFVFX0FDQ0VTU09SXVxyXG59KVxyXG5leHBvcnQgY2xhc3MgTmdiQ2hlY2tCb3ggaW1wbGVtZW50cyBDb250cm9sVmFsdWVBY2Nlc3NvciB7XHJcbiAgY2hlY2tlZDtcclxuXHJcbiAgLyoqXHJcbiAgICogQSBmbGFnIGluZGljYXRpbmcgaWYgYSBnaXZlbiBjaGVja2JveCBidXR0b24gaXMgZGlzYWJsZWQuXHJcbiAgICovXHJcbiAgQElucHV0KCkgZGlzYWJsZWQgPSBmYWxzZTtcclxuXHJcbiAgLyoqXHJcbiAgICogVmFsdWUgdG8gYmUgcHJvcGFnYXRlZCBhcyBtb2RlbCB3aGVuIHRoZSBjaGVja2JveCBpcyBjaGVja2VkLlxyXG4gICAqL1xyXG4gIEBJbnB1dCgpIHZhbHVlQ2hlY2tlZCA9IHRydWU7XHJcblxyXG4gIC8qKlxyXG4gICAqIFZhbHVlIHRvIGJlIHByb3BhZ2F0ZWQgYXMgbW9kZWwgd2hlbiB0aGUgY2hlY2tib3ggaXMgdW5jaGVja2VkLlxyXG4gICAqL1xyXG4gIEBJbnB1dCgpIHZhbHVlVW5DaGVja2VkID0gZmFsc2U7XHJcblxyXG4gIG9uQ2hhbmdlID0gKF86IGFueSkgPT4ge307XHJcbiAgb25Ub3VjaGVkID0gKCkgPT4ge307XHJcblxyXG4gIHNldCBmb2N1c2VkKGlzRm9jdXNlZDogYm9vbGVhbikge1xyXG4gICAgdGhpcy5fbGFiZWwuZm9jdXNlZCA9IGlzRm9jdXNlZDtcclxuICAgIGlmICghaXNGb2N1c2VkKSB7XHJcbiAgICAgIHRoaXMub25Ub3VjaGVkKCk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIF9sYWJlbDogTmdiQnV0dG9uTGFiZWwpIHt9XHJcblxyXG4gIG9uSW5wdXRDaGFuZ2UoJGV2ZW50KSB7XHJcbiAgICBjb25zdCBtb2RlbFRvUHJvcGFnYXRlID0gJGV2ZW50LnRhcmdldC5jaGVja2VkID8gdGhpcy52YWx1ZUNoZWNrZWQgOiB0aGlzLnZhbHVlVW5DaGVja2VkO1xyXG4gICAgdGhpcy5vbkNoYW5nZShtb2RlbFRvUHJvcGFnYXRlKTtcclxuICAgIHRoaXMub25Ub3VjaGVkKCk7XHJcbiAgICB0aGlzLndyaXRlVmFsdWUobW9kZWxUb1Byb3BhZ2F0ZSk7XHJcbiAgfVxyXG5cclxuICByZWdpc3Rlck9uQ2hhbmdlKGZuOiAodmFsdWU6IGFueSkgPT4gYW55KTogdm9pZCB7IHRoaXMub25DaGFuZ2UgPSBmbjsgfVxyXG5cclxuICByZWdpc3Rlck9uVG91Y2hlZChmbjogKCkgPT4gYW55KTogdm9pZCB7IHRoaXMub25Ub3VjaGVkID0gZm47IH1cclxuXHJcbiAgc2V0RGlzYWJsZWRTdGF0ZShpc0Rpc2FibGVkOiBib29sZWFuKTogdm9pZCB7XHJcbiAgICB0aGlzLmRpc2FibGVkID0gaXNEaXNhYmxlZDtcclxuICAgIHRoaXMuX2xhYmVsLmRpc2FibGVkID0gaXNEaXNhYmxlZDtcclxuICB9XHJcblxyXG4gIHdyaXRlVmFsdWUodmFsdWUpIHtcclxuICAgIHRoaXMuY2hlY2tlZCA9IHZhbHVlID09PSB0aGlzLnZhbHVlQ2hlY2tlZDtcclxuICAgIHRoaXMuX2xhYmVsLmFjdGl2ZSA9IHRoaXMuY2hlY2tlZDtcclxuICB9XHJcbn1cclxuIiwiaW1wb3J0IHtEaXJlY3RpdmUsIEVsZW1lbnRSZWYsIGZvcndhcmRSZWYsIElucHV0LCBPbkRlc3Ryb3ksIFJlbmRlcmVyMn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7Q29udHJvbFZhbHVlQWNjZXNzb3IsIE5HX1ZBTFVFX0FDQ0VTU09SfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XHJcblxyXG5pbXBvcnQge05nYkJ1dHRvbkxhYmVsfSBmcm9tICcuL2xhYmVsJztcclxuXHJcbmNvbnN0IE5HQl9SQURJT19WQUxVRV9BQ0NFU1NPUiA9IHtcclxuICBwcm92aWRlOiBOR19WQUxVRV9BQ0NFU1NPUixcclxuICB1c2VFeGlzdGluZzogZm9yd2FyZFJlZigoKSA9PiBOZ2JSYWRpb0dyb3VwKSxcclxuICBtdWx0aTogdHJ1ZVxyXG59O1xyXG5cclxubGV0IG5leHRJZCA9IDA7XHJcblxyXG4vKipcclxuICogRWFzaWx5IGNyZWF0ZSBCb290c3RyYXAtc3R5bGUgcmFkaW8gYnV0dG9ucy4gQSB2YWx1ZSBvZiBhIHNlbGVjdGVkIGJ1dHRvbiBpcyBib3VuZCB0byBhIHZhcmlhYmxlXHJcbiAqIHNwZWNpZmllZCB2aWEgbmdNb2RlbC5cclxuICovXHJcbkBEaXJlY3RpdmUoe3NlbGVjdG9yOiAnW25nYlJhZGlvR3JvdXBdJywgaG9zdDogeydyb2xlJzogJ2dyb3VwJ30sIHByb3ZpZGVyczogW05HQl9SQURJT19WQUxVRV9BQ0NFU1NPUl19KVxyXG5leHBvcnQgY2xhc3MgTmdiUmFkaW9Hcm91cCBpbXBsZW1lbnRzIENvbnRyb2xWYWx1ZUFjY2Vzc29yIHtcclxuICBwcml2YXRlIF9yYWRpb3M6IFNldDxOZ2JSYWRpbz4gPSBuZXcgU2V0PE5nYlJhZGlvPigpO1xyXG4gIHByaXZhdGUgX3ZhbHVlID0gbnVsbDtcclxuICBwcml2YXRlIF9kaXNhYmxlZDogYm9vbGVhbjtcclxuXHJcbiAgZ2V0IGRpc2FibGVkKCkgeyByZXR1cm4gdGhpcy5fZGlzYWJsZWQ7IH1cclxuICBzZXQgZGlzYWJsZWQoaXNEaXNhYmxlZDogYm9vbGVhbikgeyB0aGlzLnNldERpc2FibGVkU3RhdGUoaXNEaXNhYmxlZCk7IH1cclxuXHJcbiAgLyoqXHJcbiAgICogVGhlIG5hbWUgb2YgdGhlIGdyb3VwLiBVbmxlc3MgZW5jbG9zZWQgaW5wdXRzIHNwZWNpZnkgYSBuYW1lLCB0aGlzIG5hbWUgaXMgdXNlZCBhcyB0aGUgbmFtZSBvZiB0aGVcclxuICAgKiBlbmNsb3NlZCBpbnB1dHMuIElmIG5vdCBzcGVjaWZpZWQsIGEgbmFtZSBpcyBnZW5lcmF0ZWQgYXV0b21hdGljYWxseS5cclxuICAgKi9cclxuICBASW5wdXQoKSBuYW1lID0gYG5nYi1yYWRpby0ke25leHRJZCsrfWA7XHJcblxyXG4gIG9uQ2hhbmdlID0gKF86IGFueSkgPT4ge307XHJcbiAgb25Ub3VjaGVkID0gKCkgPT4ge307XHJcblxyXG4gIG9uUmFkaW9DaGFuZ2UocmFkaW86IE5nYlJhZGlvKSB7XHJcbiAgICB0aGlzLndyaXRlVmFsdWUocmFkaW8udmFsdWUpO1xyXG4gICAgdGhpcy5vbkNoYW5nZShyYWRpby52YWx1ZSk7XHJcbiAgfVxyXG5cclxuICBvblJhZGlvVmFsdWVVcGRhdGUoKSB7IHRoaXMuX3VwZGF0ZVJhZGlvc1ZhbHVlKCk7IH1cclxuXHJcbiAgcmVnaXN0ZXIocmFkaW86IE5nYlJhZGlvKSB7IHRoaXMuX3JhZGlvcy5hZGQocmFkaW8pOyB9XHJcblxyXG4gIHJlZ2lzdGVyT25DaGFuZ2UoZm46ICh2YWx1ZTogYW55KSA9PiBhbnkpOiB2b2lkIHsgdGhpcy5vbkNoYW5nZSA9IGZuOyB9XHJcblxyXG4gIHJlZ2lzdGVyT25Ub3VjaGVkKGZuOiAoKSA9PiBhbnkpOiB2b2lkIHsgdGhpcy5vblRvdWNoZWQgPSBmbjsgfVxyXG5cclxuICBzZXREaXNhYmxlZFN0YXRlKGlzRGlzYWJsZWQ6IGJvb2xlYW4pOiB2b2lkIHtcclxuICAgIHRoaXMuX2Rpc2FibGVkID0gaXNEaXNhYmxlZDtcclxuICAgIHRoaXMuX3VwZGF0ZVJhZGlvc0Rpc2FibGVkKCk7XHJcbiAgfVxyXG5cclxuICB1bnJlZ2lzdGVyKHJhZGlvOiBOZ2JSYWRpbykgeyB0aGlzLl9yYWRpb3MuZGVsZXRlKHJhZGlvKTsgfVxyXG5cclxuICB3cml0ZVZhbHVlKHZhbHVlKSB7XHJcbiAgICB0aGlzLl92YWx1ZSA9IHZhbHVlO1xyXG4gICAgdGhpcy5fdXBkYXRlUmFkaW9zVmFsdWUoKTtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgX3VwZGF0ZVJhZGlvc1ZhbHVlKCkgeyB0aGlzLl9yYWRpb3MuZm9yRWFjaCgocmFkaW8pID0+IHJhZGlvLnVwZGF0ZVZhbHVlKHRoaXMuX3ZhbHVlKSk7IH1cclxuICBwcml2YXRlIF91cGRhdGVSYWRpb3NEaXNhYmxlZCgpIHsgdGhpcy5fcmFkaW9zLmZvckVhY2goKHJhZGlvKSA9PiByYWRpby51cGRhdGVEaXNhYmxlZCgpKTsgfVxyXG59XHJcblxyXG5cclxuLyoqXHJcbiAqIE1hcmtzIGFuIGlucHV0IG9mIHR5cGUgXCJyYWRpb1wiIGFzIHBhcnQgb2YgdGhlIE5nYlJhZGlvR3JvdXAuXHJcbiAqL1xyXG5ARGlyZWN0aXZlKHtcclxuICBzZWxlY3RvcjogJ1tuZ2JCdXR0b25dW3R5cGU9cmFkaW9dJyxcclxuICBob3N0OiB7XHJcbiAgICAnW2NoZWNrZWRdJzogJ2NoZWNrZWQnLFxyXG4gICAgJ1tkaXNhYmxlZF0nOiAnZGlzYWJsZWQnLFxyXG4gICAgJ1tuYW1lXSc6ICduYW1lQXR0cicsXHJcbiAgICAnKGNoYW5nZSknOiAnb25DaGFuZ2UoKScsXHJcbiAgICAnKGZvY3VzKSc6ICdmb2N1c2VkID0gdHJ1ZScsXHJcbiAgICAnKGJsdXIpJzogJ2ZvY3VzZWQgPSBmYWxzZSdcclxuICB9XHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBOZ2JSYWRpbyBpbXBsZW1lbnRzIE9uRGVzdHJveSB7XHJcbiAgcHJpdmF0ZSBfY2hlY2tlZDogYm9vbGVhbjtcclxuICBwcml2YXRlIF9kaXNhYmxlZDogYm9vbGVhbjtcclxuICBwcml2YXRlIF92YWx1ZTogYW55ID0gbnVsbDtcclxuXHJcbiAgLyoqXHJcbiAgICogVGhlIG5hbWUgb2YgdGhlIGlucHV0LiBBbGwgaW5wdXRzIG9mIGEgZ3JvdXAgc2hvdWxkIGhhdmUgdGhlIHNhbWUgbmFtZS4gSWYgbm90IHNwZWNpZmllZCxcclxuICAgKiB0aGUgbmFtZSBvZiB0aGUgZW5jbG9zaW5nIGdyb3VwIGlzIHVzZWQuXHJcbiAgICovXHJcbiAgQElucHV0KCkgbmFtZTogc3RyaW5nO1xyXG5cclxuICAvKipcclxuICAgKiBZb3UgY2FuIHNwZWNpZnkgbW9kZWwgdmFsdWUgb2YgYSBnaXZlbiByYWRpbyBieSBiaW5kaW5nIHRvIHRoZSB2YWx1ZSBwcm9wZXJ0eS5cclxuICAgKi9cclxuICBASW5wdXQoJ3ZhbHVlJylcclxuICBzZXQgdmFsdWUodmFsdWU6IGFueSkge1xyXG4gICAgdGhpcy5fdmFsdWUgPSB2YWx1ZTtcclxuICAgIGNvbnN0IHN0cmluZ1ZhbHVlID0gdmFsdWUgPyB2YWx1ZS50b1N0cmluZygpIDogJyc7XHJcbiAgICB0aGlzLl9yZW5kZXJlci5zZXRQcm9wZXJ0eSh0aGlzLl9lbGVtZW50Lm5hdGl2ZUVsZW1lbnQsICd2YWx1ZScsIHN0cmluZ1ZhbHVlKTtcclxuICAgIHRoaXMuX2dyb3VwLm9uUmFkaW9WYWx1ZVVwZGF0ZSgpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogQSBmbGFnIGluZGljYXRpbmcgaWYgYSBnaXZlbiByYWRpbyBidXR0b24gaXMgZGlzYWJsZWQuXHJcbiAgICovXHJcbiAgQElucHV0KCdkaXNhYmxlZCcpXHJcbiAgc2V0IGRpc2FibGVkKGlzRGlzYWJsZWQ6IGJvb2xlYW4pIHtcclxuICAgIHRoaXMuX2Rpc2FibGVkID0gaXNEaXNhYmxlZCAhPT0gZmFsc2U7XHJcbiAgICB0aGlzLnVwZGF0ZURpc2FibGVkKCk7XHJcbiAgfVxyXG5cclxuICBzZXQgZm9jdXNlZChpc0ZvY3VzZWQ6IGJvb2xlYW4pIHtcclxuICAgIGlmICh0aGlzLl9sYWJlbCkge1xyXG4gICAgICB0aGlzLl9sYWJlbC5mb2N1c2VkID0gaXNGb2N1c2VkO1xyXG4gICAgfVxyXG4gICAgaWYgKCFpc0ZvY3VzZWQpIHtcclxuICAgICAgdGhpcy5fZ3JvdXAub25Ub3VjaGVkKCk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBnZXQgY2hlY2tlZCgpIHsgcmV0dXJuIHRoaXMuX2NoZWNrZWQ7IH1cclxuXHJcbiAgZ2V0IGRpc2FibGVkKCkgeyByZXR1cm4gdGhpcy5fZ3JvdXAuZGlzYWJsZWQgfHwgdGhpcy5fZGlzYWJsZWQ7IH1cclxuXHJcbiAgZ2V0IHZhbHVlKCkgeyByZXR1cm4gdGhpcy5fdmFsdWU7IH1cclxuXHJcbiAgZ2V0IG5hbWVBdHRyKCkgeyByZXR1cm4gdGhpcy5uYW1lIHx8IHRoaXMuX2dyb3VwLm5hbWU7IH1cclxuXHJcbiAgY29uc3RydWN0b3IoXHJcbiAgICAgIHByaXZhdGUgX2dyb3VwOiBOZ2JSYWRpb0dyb3VwLCBwcml2YXRlIF9sYWJlbDogTmdiQnV0dG9uTGFiZWwsIHByaXZhdGUgX3JlbmRlcmVyOiBSZW5kZXJlcjIsXHJcbiAgICAgIHByaXZhdGUgX2VsZW1lbnQ6IEVsZW1lbnRSZWY8SFRNTElucHV0RWxlbWVudD4pIHtcclxuICAgIHRoaXMuX2dyb3VwLnJlZ2lzdGVyKHRoaXMpO1xyXG4gICAgdGhpcy51cGRhdGVEaXNhYmxlZCgpO1xyXG4gIH1cclxuXHJcbiAgbmdPbkRlc3Ryb3koKSB7IHRoaXMuX2dyb3VwLnVucmVnaXN0ZXIodGhpcyk7IH1cclxuXHJcbiAgb25DaGFuZ2UoKSB7IHRoaXMuX2dyb3VwLm9uUmFkaW9DaGFuZ2UodGhpcyk7IH1cclxuXHJcbiAgdXBkYXRlVmFsdWUodmFsdWUpIHtcclxuICAgIHRoaXMuX2NoZWNrZWQgPSB0aGlzLnZhbHVlID09PSB2YWx1ZTtcclxuICAgIHRoaXMuX2xhYmVsLmFjdGl2ZSA9IHRoaXMuX2NoZWNrZWQ7XHJcbiAgfVxyXG5cclxuICB1cGRhdGVEaXNhYmxlZCgpIHsgdGhpcy5fbGFiZWwuZGlzYWJsZWQgPSB0aGlzLmRpc2FibGVkOyB9XHJcbn1cclxuIiwiaW1wb3J0IHtOZ01vZHVsZSwgTW9kdWxlV2l0aFByb3ZpZGVyc30gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7TmdiQnV0dG9uTGFiZWx9IGZyb20gJy4vbGFiZWwnO1xyXG5pbXBvcnQge05nYkNoZWNrQm94fSBmcm9tICcuL2NoZWNrYm94JztcclxuaW1wb3J0IHtOZ2JSYWRpbywgTmdiUmFkaW9Hcm91cH0gZnJvbSAnLi9yYWRpbyc7XHJcblxyXG5leHBvcnQge05nYkJ1dHRvbkxhYmVsfSBmcm9tICcuL2xhYmVsJztcclxuZXhwb3J0IHtOZ2JDaGVja0JveH0gZnJvbSAnLi9jaGVja2JveCc7XHJcbmV4cG9ydCB7TmdiUmFkaW8sIE5nYlJhZGlvR3JvdXB9IGZyb20gJy4vcmFkaW8nO1xyXG5cclxuXHJcbmNvbnN0IE5HQl9CVVRUT05fRElSRUNUSVZFUyA9IFtOZ2JCdXR0b25MYWJlbCwgTmdiQ2hlY2tCb3gsIE5nYlJhZGlvR3JvdXAsIE5nYlJhZGlvXTtcclxuXHJcbkBOZ01vZHVsZSh7ZGVjbGFyYXRpb25zOiBOR0JfQlVUVE9OX0RJUkVDVElWRVMsIGV4cG9ydHM6IE5HQl9CVVRUT05fRElSRUNUSVZFU30pXHJcbmV4cG9ydCBjbGFzcyBOZ2JCdXR0b25zTW9kdWxlIHtcclxuICAvKipcclxuICAgKiBJbXBvcnRpbmcgd2l0aCAnLmZvclJvb3QoKScgaXMgbm8gbG9uZ2VyIG5lY2Vzc2FyeSwgeW91IGNhbiBzaW1wbHkgaW1wb3J0IHRoZSBtb2R1bGUuXHJcbiAgICogV2lsbCBiZSByZW1vdmVkIGluIDQuMC4wLlxyXG4gICAqXHJcbiAgICogQGRlcHJlY2F0ZWQgMy4wLjBcclxuICAgKi9cclxuICBzdGF0aWMgZm9yUm9vdCgpOiBNb2R1bGVXaXRoUHJvdmlkZXJzIHsgcmV0dXJuIHtuZ01vZHVsZTogTmdiQnV0dG9uc01vZHVsZX07IH1cclxufVxyXG4iLCJpbXBvcnQge0luamVjdGFibGV9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5cclxuLyoqXHJcbiAqIENvbmZpZ3VyYXRpb24gc2VydmljZSBmb3IgdGhlIE5nYkNhcm91c2VsIGNvbXBvbmVudC5cclxuICogWW91IGNhbiBpbmplY3QgdGhpcyBzZXJ2aWNlLCB0eXBpY2FsbHkgaW4geW91ciByb290IGNvbXBvbmVudCwgYW5kIGN1c3RvbWl6ZSB0aGUgdmFsdWVzIG9mIGl0cyBwcm9wZXJ0aWVzIGluXHJcbiAqIG9yZGVyIHRvIHByb3ZpZGUgZGVmYXVsdCB2YWx1ZXMgZm9yIGFsbCB0aGUgY2Fyb3VzZWxzIHVzZWQgaW4gdGhlIGFwcGxpY2F0aW9uLlxyXG4gKi9cclxuQEluamVjdGFibGUoe3Byb3ZpZGVkSW46ICdyb290J30pXHJcbmV4cG9ydCBjbGFzcyBOZ2JDYXJvdXNlbENvbmZpZyB7XHJcbiAgaW50ZXJ2YWwgPSA1MDAwO1xyXG4gIHdyYXAgPSB0cnVlO1xyXG4gIGtleWJvYXJkID0gdHJ1ZTtcclxuICBwYXVzZU9uSG92ZXIgPSB0cnVlO1xyXG4gIHNob3dOYXZpZ2F0aW9uQXJyb3dzID0gdHJ1ZTtcclxuICBzaG93TmF2aWdhdGlvbkluZGljYXRvcnMgPSB0cnVlO1xyXG59XHJcbiIsImltcG9ydCB7XHJcbiAgQWZ0ZXJDb250ZW50Q2hlY2tlZCxcclxuICBBZnRlckNvbnRlbnRJbml0LFxyXG4gIENoYW5nZURldGVjdGlvblN0cmF0ZWd5LFxyXG4gIENoYW5nZURldGVjdG9yUmVmLFxyXG4gIENvbXBvbmVudCxcclxuICBDb250ZW50Q2hpbGRyZW4sXHJcbiAgRGlyZWN0aXZlLFxyXG4gIEV2ZW50RW1pdHRlcixcclxuICBJbmplY3QsXHJcbiAgSW5wdXQsXHJcbiAgTmdab25lLFxyXG4gIE9uQ2hhbmdlcyxcclxuICBPbkRlc3Ryb3ksXHJcbiAgT3V0cHV0LFxyXG4gIFBMQVRGT1JNX0lELFxyXG4gIFF1ZXJ5TGlzdCxcclxuICBUZW1wbGF0ZVJlZlxyXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQge2lzUGxhdGZvcm1Ccm93c2VyfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xyXG5cclxuaW1wb3J0IHtOZ2JDYXJvdXNlbENvbmZpZ30gZnJvbSAnLi9jYXJvdXNlbC1jb25maWcnO1xyXG5cclxuaW1wb3J0IHtTdWJqZWN0LCB0aW1lcn0gZnJvbSAncnhqcyc7XHJcbmltcG9ydCB7ZmlsdGVyLCBtYXAsIHN3aXRjaE1hcCwgdGFrZVVudGlsfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XHJcblxyXG5sZXQgbmV4dElkID0gMDtcclxuXHJcbi8qKlxyXG4gKiBSZXByZXNlbnRzIGFuIGluZGl2aWR1YWwgc2xpZGUgdG8gYmUgdXNlZCB3aXRoaW4gYSBjYXJvdXNlbC5cclxuICovXHJcbkBEaXJlY3RpdmUoe3NlbGVjdG9yOiAnbmctdGVtcGxhdGVbbmdiU2xpZGVdJ30pXHJcbmV4cG9ydCBjbGFzcyBOZ2JTbGlkZSB7XHJcbiAgLyoqXHJcbiAgICogVW5pcXVlIHNsaWRlIGlkZW50aWZpZXIuIE11c3QgYmUgdW5pcXVlIGZvciB0aGUgZW50aXJlIGRvY3VtZW50IGZvciBwcm9wZXIgYWNjZXNzaWJpbGl0eSBzdXBwb3J0LlxyXG4gICAqIFdpbGwgYmUgYXV0by1nZW5lcmF0ZWQgaWYgbm90IHByb3ZpZGVkLlxyXG4gICAqL1xyXG4gIEBJbnB1dCgpIGlkID0gYG5nYi1zbGlkZS0ke25leHRJZCsrfWA7XHJcbiAgY29uc3RydWN0b3IocHVibGljIHRwbFJlZjogVGVtcGxhdGVSZWY8YW55Pikge31cclxufVxyXG5cclxuLyoqXHJcbiAqIERpcmVjdGl2ZSB0byBlYXNpbHkgY3JlYXRlIGNhcm91c2VscyBiYXNlZCBvbiBCb290c3RyYXAncyBtYXJrdXAuXHJcbiAqL1xyXG5AQ29tcG9uZW50KHtcclxuICBzZWxlY3RvcjogJ25nYi1jYXJvdXNlbCcsXHJcbiAgZXhwb3J0QXM6ICduZ2JDYXJvdXNlbCcsXHJcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2gsXHJcbiAgaG9zdDoge1xyXG4gICAgJ2NsYXNzJzogJ2Nhcm91c2VsIHNsaWRlJyxcclxuICAgICdbc3R5bGUuZGlzcGxheV0nOiAnXCJibG9ja1wiJyxcclxuICAgICd0YWJJbmRleCc6ICcwJyxcclxuICAgICcobW91c2VlbnRlciknOiAncGF1c2VPbkhvdmVyICYmIHBhdXNlKCknLFxyXG4gICAgJyhtb3VzZWxlYXZlKSc6ICdwYXVzZU9uSG92ZXIgJiYgY3ljbGUoKScsXHJcbiAgICAnKGtleWRvd24uYXJyb3dMZWZ0KSc6ICdrZXlib2FyZCAmJiBwcmV2KCknLFxyXG4gICAgJyhrZXlkb3duLmFycm93UmlnaHQpJzogJ2tleWJvYXJkICYmIG5leHQoKSdcclxuICB9LFxyXG4gIHRlbXBsYXRlOiBgXHJcbiAgICA8b2wgY2xhc3M9XCJjYXJvdXNlbC1pbmRpY2F0b3JzXCIgKm5nSWY9XCJzaG93TmF2aWdhdGlvbkluZGljYXRvcnNcIj5cclxuICAgICAgPGxpICpuZ0Zvcj1cImxldCBzbGlkZSBvZiBzbGlkZXNcIiBbaWRdPVwic2xpZGUuaWRcIiBbY2xhc3MuYWN0aXZlXT1cInNsaWRlLmlkID09PSBhY3RpdmVJZFwiXHJcbiAgICAgICAgICAoY2xpY2spPVwic2VsZWN0KHNsaWRlLmlkKTsgcGF1c2VPbkhvdmVyICYmIHBhdXNlKClcIj48L2xpPlxyXG4gICAgPC9vbD5cclxuICAgIDxkaXYgY2xhc3M9XCJjYXJvdXNlbC1pbm5lclwiPlxyXG4gICAgICA8ZGl2ICpuZ0Zvcj1cImxldCBzbGlkZSBvZiBzbGlkZXNcIiBjbGFzcz1cImNhcm91c2VsLWl0ZW1cIiBbY2xhc3MuYWN0aXZlXT1cInNsaWRlLmlkID09PSBhY3RpdmVJZFwiPlxyXG4gICAgICAgIDxuZy10ZW1wbGF0ZSBbbmdUZW1wbGF0ZU91dGxldF09XCJzbGlkZS50cGxSZWZcIj48L25nLXRlbXBsYXRlPlxyXG4gICAgICA8L2Rpdj5cclxuICAgIDwvZGl2PlxyXG4gICAgPGEgY2xhc3M9XCJjYXJvdXNlbC1jb250cm9sLXByZXZcIiByb2xlPVwiYnV0dG9uXCIgKGNsaWNrKT1cInByZXYoKVwiICpuZ0lmPVwic2hvd05hdmlnYXRpb25BcnJvd3NcIj5cclxuICAgICAgPHNwYW4gY2xhc3M9XCJjYXJvdXNlbC1jb250cm9sLXByZXYtaWNvblwiIGFyaWEtaGlkZGVuPVwidHJ1ZVwiPjwvc3Bhbj5cclxuICAgICAgPHNwYW4gY2xhc3M9XCJzci1vbmx5XCIgaTE4bj1cIkBAbmdiLmNhcm91c2VsLnByZXZpb3VzXCI+UHJldmlvdXM8L3NwYW4+XHJcbiAgICA8L2E+XHJcbiAgICA8YSBjbGFzcz1cImNhcm91c2VsLWNvbnRyb2wtbmV4dFwiIHJvbGU9XCJidXR0b25cIiAoY2xpY2spPVwibmV4dCgpXCIgKm5nSWY9XCJzaG93TmF2aWdhdGlvbkFycm93c1wiPlxyXG4gICAgICA8c3BhbiBjbGFzcz1cImNhcm91c2VsLWNvbnRyb2wtbmV4dC1pY29uXCIgYXJpYS1oaWRkZW49XCJ0cnVlXCI+PC9zcGFuPlxyXG4gICAgICA8c3BhbiBjbGFzcz1cInNyLW9ubHlcIiBpMThuPVwiQEBuZ2IuY2Fyb3VzZWwubmV4dFwiPk5leHQ8L3NwYW4+XHJcbiAgICA8L2E+XHJcbiAgYFxyXG59KVxyXG5leHBvcnQgY2xhc3MgTmdiQ2Fyb3VzZWwgaW1wbGVtZW50cyBBZnRlckNvbnRlbnRDaGVja2VkLFxyXG4gICAgQWZ0ZXJDb250ZW50SW5pdCwgT25DaGFuZ2VzLCBPbkRlc3Ryb3kge1xyXG4gIEBDb250ZW50Q2hpbGRyZW4oTmdiU2xpZGUpIHNsaWRlczogUXVlcnlMaXN0PE5nYlNsaWRlPjtcclxuXHJcbiAgcHJpdmF0ZSBfc3RhcnQkID0gbmV3IFN1YmplY3Q8dm9pZD4oKTtcclxuICBwcml2YXRlIF9zdG9wJCA9IG5ldyBTdWJqZWN0PHZvaWQ+KCk7XHJcblxyXG4gIC8qKlxyXG4gICAqIFRoZSBhY3RpdmUgc2xpZGUgaWQuXHJcbiAgICovXHJcbiAgQElucHV0KCkgYWN0aXZlSWQ6IHN0cmluZztcclxuXHJcblxyXG4gIC8qKlxyXG4gICAqIEFtb3VudCBvZiB0aW1lIGluIG1pbGxpc2Vjb25kcyBiZWZvcmUgbmV4dCBzbGlkZSBpcyBzaG93bi5cclxuICAgKi9cclxuICBASW5wdXQoKSBpbnRlcnZhbDogbnVtYmVyO1xyXG5cclxuICAvKipcclxuICAgKiBXaGV0aGVyIGNhbiB3cmFwIGZyb20gdGhlIGxhc3QgdG8gdGhlIGZpcnN0IHNsaWRlLlxyXG4gICAqL1xyXG4gIEBJbnB1dCgpIHdyYXA6IGJvb2xlYW47XHJcblxyXG4gIC8qKlxyXG4gICAqIEEgZmxhZyBmb3IgYWxsb3dpbmcgbmF2aWdhdGlvbiB2aWEga2V5Ym9hcmRcclxuICAgKi9cclxuICBASW5wdXQoKSBrZXlib2FyZDogYm9vbGVhbjtcclxuXHJcbiAgLyoqXHJcbiAgICogQSBmbGFnIHRvIGVuYWJsZSBzbGlkZSBjeWNsaW5nIHBhdXNlL3Jlc3VtZSBvbiBtb3VzZW92ZXIuXHJcbiAgICogQHNpbmNlIDIuMi4wXHJcbiAgICovXHJcbiAgQElucHV0KCkgcGF1c2VPbkhvdmVyOiBib29sZWFuO1xyXG5cclxuICAvKipcclxuICAgKiBBIGZsYWcgdG8gc2hvdyAvIGhpZGUgbmF2aWdhdGlvbiBhcnJvd3MuXHJcbiAgICogQHNpbmNlIDIuMi4wXHJcbiAgICovXHJcbiAgQElucHV0KCkgc2hvd05hdmlnYXRpb25BcnJvd3M6IGJvb2xlYW47XHJcblxyXG4gIC8qKlxyXG4gICAqIEEgZmxhZyB0byBzaG93IC8gaGlkZSBuYXZpZ2F0aW9uIGluZGljYXRvcnMuXHJcbiAgICogQHNpbmNlIDIuMi4wXHJcbiAgICovXHJcbiAgQElucHV0KCkgc2hvd05hdmlnYXRpb25JbmRpY2F0b3JzOiBib29sZWFuO1xyXG5cclxuICAvKipcclxuICAgKiBBIGNhcm91c2VsIHNsaWRlIGV2ZW50IGZpcmVkIHdoZW4gdGhlIHNsaWRlIHRyYW5zaXRpb24gaXMgY29tcGxldGVkLlxyXG4gICAqIFNlZSBOZ2JTbGlkZUV2ZW50IGZvciBwYXlsb2FkIGRldGFpbHNcclxuICAgKi9cclxuICBAT3V0cHV0KCkgc2xpZGUgPSBuZXcgRXZlbnRFbWl0dGVyPE5nYlNsaWRlRXZlbnQ+KCk7XHJcblxyXG4gIGNvbnN0cnVjdG9yKFxyXG4gICAgICBjb25maWc6IE5nYkNhcm91c2VsQ29uZmlnLCBASW5qZWN0KFBMQVRGT1JNX0lEKSBwcml2YXRlIF9wbGF0Zm9ybUlkLCBwcml2YXRlIF9uZ1pvbmU6IE5nWm9uZSxcclxuICAgICAgcHJpdmF0ZSBfY2Q6IENoYW5nZURldGVjdG9yUmVmKSB7XHJcbiAgICB0aGlzLmludGVydmFsID0gY29uZmlnLmludGVydmFsO1xyXG4gICAgdGhpcy53cmFwID0gY29uZmlnLndyYXA7XHJcbiAgICB0aGlzLmtleWJvYXJkID0gY29uZmlnLmtleWJvYXJkO1xyXG4gICAgdGhpcy5wYXVzZU9uSG92ZXIgPSBjb25maWcucGF1c2VPbkhvdmVyO1xyXG4gICAgdGhpcy5zaG93TmF2aWdhdGlvbkFycm93cyA9IGNvbmZpZy5zaG93TmF2aWdhdGlvbkFycm93cztcclxuICAgIHRoaXMuc2hvd05hdmlnYXRpb25JbmRpY2F0b3JzID0gY29uZmlnLnNob3dOYXZpZ2F0aW9uSW5kaWNhdG9ycztcclxuICB9XHJcblxyXG4gIG5nQWZ0ZXJDb250ZW50SW5pdCgpIHtcclxuICAgIC8vIHNldEludGVydmFsKCkgZG9lc24ndCBwbGF5IHdlbGwgd2l0aCBTU1IgYW5kIHByb3RyYWN0b3IsXHJcbiAgICAvLyBzbyB3ZSBzaG91bGQgcnVuIGl0IGluIHRoZSBicm93c2VyIGFuZCBvdXRzaWRlIEFuZ3VsYXJcclxuICAgIGlmIChpc1BsYXRmb3JtQnJvd3Nlcih0aGlzLl9wbGF0Zm9ybUlkKSkge1xyXG4gICAgICB0aGlzLl9uZ1pvbmUucnVuT3V0c2lkZUFuZ3VsYXIoKCkgPT4ge1xyXG4gICAgICAgIHRoaXMuX3N0YXJ0JFxyXG4gICAgICAgICAgICAucGlwZShcclxuICAgICAgICAgICAgICAgIG1hcCgoKSA9PiB0aGlzLmludGVydmFsKSwgZmlsdGVyKGludGVydmFsID0+IGludGVydmFsID4gMCksXHJcbiAgICAgICAgICAgICAgICBzd2l0Y2hNYXAoaW50ZXJ2YWwgPT4gdGltZXIoaW50ZXJ2YWwpLnBpcGUodGFrZVVudGlsKHRoaXMuX3N0b3AkKSkpKVxyXG4gICAgICAgICAgICAuc3Vic2NyaWJlKCgpID0+IHRoaXMuX25nWm9uZS5ydW4oKCkgPT4ge1xyXG4gICAgICAgICAgICAgIHRoaXMubmV4dCgpO1xyXG4gICAgICAgICAgICAgIHRoaXMuX2NkLmRldGVjdENoYW5nZXMoKTtcclxuICAgICAgICAgICAgfSkpO1xyXG5cclxuICAgICAgICB0aGlzLl9zdGFydCQubmV4dCgpO1xyXG4gICAgICB9KTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIG5nQWZ0ZXJDb250ZW50Q2hlY2tlZCgpIHtcclxuICAgIGxldCBhY3RpdmVTbGlkZSA9IHRoaXMuX2dldFNsaWRlQnlJZCh0aGlzLmFjdGl2ZUlkKTtcclxuICAgIHRoaXMuYWN0aXZlSWQgPSBhY3RpdmVTbGlkZSA/IGFjdGl2ZVNsaWRlLmlkIDogKHRoaXMuc2xpZGVzLmxlbmd0aCA/IHRoaXMuc2xpZGVzLmZpcnN0LmlkIDogbnVsbCk7XHJcbiAgfVxyXG5cclxuICBuZ09uRGVzdHJveSgpIHsgdGhpcy5fc3RvcCQubmV4dCgpOyB9XHJcblxyXG4gIG5nT25DaGFuZ2VzKGNoYW5nZXMpIHtcclxuICAgIGlmICgnaW50ZXJ2YWwnIGluIGNoYW5nZXMgJiYgIWNoYW5nZXNbJ2ludGVydmFsJ10uaXNGaXJzdENoYW5nZSgpKSB7XHJcbiAgICAgIHRoaXMuX3N0YXJ0JC5uZXh0KCk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBOYXZpZ2F0ZSB0byBhIHNsaWRlIHdpdGggdGhlIHNwZWNpZmllZCBpZGVudGlmaWVyLlxyXG4gICAqL1xyXG4gIHNlbGVjdChzbGlkZUlkOiBzdHJpbmcpIHsgdGhpcy5fY3ljbGVUb1NlbGVjdGVkKHNsaWRlSWQsIHRoaXMuX2dldFNsaWRlRXZlbnREaXJlY3Rpb24odGhpcy5hY3RpdmVJZCwgc2xpZGVJZCkpOyB9XHJcblxyXG4gIC8qKlxyXG4gICAqIE5hdmlnYXRlIHRvIHRoZSBuZXh0IHNsaWRlLlxyXG4gICAqL1xyXG4gIHByZXYoKSB7IHRoaXMuX2N5Y2xlVG9TZWxlY3RlZCh0aGlzLl9nZXRQcmV2U2xpZGUodGhpcy5hY3RpdmVJZCksIE5nYlNsaWRlRXZlbnREaXJlY3Rpb24uUklHSFQpOyB9XHJcblxyXG4gIC8qKlxyXG4gICAqIE5hdmlnYXRlIHRvIHRoZSBuZXh0IHNsaWRlLlxyXG4gICAqL1xyXG4gIG5leHQoKSB7IHRoaXMuX2N5Y2xlVG9TZWxlY3RlZCh0aGlzLl9nZXROZXh0U2xpZGUodGhpcy5hY3RpdmVJZCksIE5nYlNsaWRlRXZlbnREaXJlY3Rpb24uTEVGVCk7IH1cclxuXHJcbiAgLyoqXHJcbiAgICogU3RvcHMgdGhlIGNhcm91c2VsIGZyb20gY3ljbGluZyB0aHJvdWdoIGl0ZW1zLlxyXG4gICAqL1xyXG4gIHBhdXNlKCkgeyB0aGlzLl9zdG9wJC5uZXh0KCk7IH1cclxuXHJcbiAgLyoqXHJcbiAgICogUmVzdGFydHMgY3ljbGluZyB0aHJvdWdoIHRoZSBjYXJvdXNlbCBzbGlkZXMgZnJvbSBsZWZ0IHRvIHJpZ2h0LlxyXG4gICAqL1xyXG4gIGN5Y2xlKCkgeyB0aGlzLl9zdGFydCQubmV4dCgpOyB9XHJcblxyXG4gIHByaXZhdGUgX2N5Y2xlVG9TZWxlY3RlZChzbGlkZUlkeDogc3RyaW5nLCBkaXJlY3Rpb246IE5nYlNsaWRlRXZlbnREaXJlY3Rpb24pIHtcclxuICAgIGxldCBzZWxlY3RlZFNsaWRlID0gdGhpcy5fZ2V0U2xpZGVCeUlkKHNsaWRlSWR4KTtcclxuICAgIGlmIChzZWxlY3RlZFNsaWRlICYmIHNlbGVjdGVkU2xpZGUuaWQgIT09IHRoaXMuYWN0aXZlSWQpIHtcclxuICAgICAgdGhpcy5zbGlkZS5lbWl0KHtwcmV2OiB0aGlzLmFjdGl2ZUlkLCBjdXJyZW50OiBzZWxlY3RlZFNsaWRlLmlkLCBkaXJlY3Rpb246IGRpcmVjdGlvbn0pO1xyXG4gICAgICB0aGlzLl9zdGFydCQubmV4dCgpO1xyXG4gICAgICB0aGlzLmFjdGl2ZUlkID0gc2VsZWN0ZWRTbGlkZS5pZDtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHByaXZhdGUgX2dldFNsaWRlRXZlbnREaXJlY3Rpb24oY3VycmVudEFjdGl2ZVNsaWRlSWQ6IHN0cmluZywgbmV4dEFjdGl2ZVNsaWRlSWQ6IHN0cmluZyk6IE5nYlNsaWRlRXZlbnREaXJlY3Rpb24ge1xyXG4gICAgY29uc3QgY3VycmVudEFjdGl2ZVNsaWRlSWR4ID0gdGhpcy5fZ2V0U2xpZGVJZHhCeUlkKGN1cnJlbnRBY3RpdmVTbGlkZUlkKTtcclxuICAgIGNvbnN0IG5leHRBY3RpdmVTbGlkZUlkeCA9IHRoaXMuX2dldFNsaWRlSWR4QnlJZChuZXh0QWN0aXZlU2xpZGVJZCk7XHJcblxyXG4gICAgcmV0dXJuIGN1cnJlbnRBY3RpdmVTbGlkZUlkeCA+IG5leHRBY3RpdmVTbGlkZUlkeCA/IE5nYlNsaWRlRXZlbnREaXJlY3Rpb24uUklHSFQgOiBOZ2JTbGlkZUV2ZW50RGlyZWN0aW9uLkxFRlQ7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIF9nZXRTbGlkZUJ5SWQoc2xpZGVJZDogc3RyaW5nKTogTmdiU2xpZGUgeyByZXR1cm4gdGhpcy5zbGlkZXMuZmluZChzbGlkZSA9PiBzbGlkZS5pZCA9PT0gc2xpZGVJZCk7IH1cclxuXHJcbiAgcHJpdmF0ZSBfZ2V0U2xpZGVJZHhCeUlkKHNsaWRlSWQ6IHN0cmluZyk6IG51bWJlciB7XHJcbiAgICByZXR1cm4gdGhpcy5zbGlkZXMudG9BcnJheSgpLmluZGV4T2YodGhpcy5fZ2V0U2xpZGVCeUlkKHNsaWRlSWQpKTtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgX2dldE5leHRTbGlkZShjdXJyZW50U2xpZGVJZDogc3RyaW5nKTogc3RyaW5nIHtcclxuICAgIGNvbnN0IHNsaWRlQXJyID0gdGhpcy5zbGlkZXMudG9BcnJheSgpO1xyXG4gICAgY29uc3QgY3VycmVudFNsaWRlSWR4ID0gdGhpcy5fZ2V0U2xpZGVJZHhCeUlkKGN1cnJlbnRTbGlkZUlkKTtcclxuICAgIGNvbnN0IGlzTGFzdFNsaWRlID0gY3VycmVudFNsaWRlSWR4ID09PSBzbGlkZUFyci5sZW5ndGggLSAxO1xyXG5cclxuICAgIHJldHVybiBpc0xhc3RTbGlkZSA/ICh0aGlzLndyYXAgPyBzbGlkZUFyclswXS5pZCA6IHNsaWRlQXJyW3NsaWRlQXJyLmxlbmd0aCAtIDFdLmlkKSA6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICBzbGlkZUFycltjdXJyZW50U2xpZGVJZHggKyAxXS5pZDtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgX2dldFByZXZTbGlkZShjdXJyZW50U2xpZGVJZDogc3RyaW5nKTogc3RyaW5nIHtcclxuICAgIGNvbnN0IHNsaWRlQXJyID0gdGhpcy5zbGlkZXMudG9BcnJheSgpO1xyXG4gICAgY29uc3QgY3VycmVudFNsaWRlSWR4ID0gdGhpcy5fZ2V0U2xpZGVJZHhCeUlkKGN1cnJlbnRTbGlkZUlkKTtcclxuICAgIGNvbnN0IGlzRmlyc3RTbGlkZSA9IGN1cnJlbnRTbGlkZUlkeCA9PT0gMDtcclxuXHJcbiAgICByZXR1cm4gaXNGaXJzdFNsaWRlID8gKHRoaXMud3JhcCA/IHNsaWRlQXJyW3NsaWRlQXJyLmxlbmd0aCAtIDFdLmlkIDogc2xpZGVBcnJbMF0uaWQpIDpcclxuICAgICAgICAgICAgICAgICAgICAgICAgICBzbGlkZUFycltjdXJyZW50U2xpZGVJZHggLSAxXS5pZDtcclxuICB9XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBUaGUgcGF5bG9hZCBvZiB0aGUgc2xpZGUgZXZlbnQgZmlyZWQgd2hlbiB0aGUgc2xpZGUgdHJhbnNpdGlvbiBpcyBjb21wbGV0ZWRcclxuICovXHJcbmV4cG9ydCBpbnRlcmZhY2UgTmdiU2xpZGVFdmVudCB7XHJcbiAgLyoqXHJcbiAgICogUHJldmlvdXMgc2xpZGUgaWRcclxuICAgKi9cclxuICBwcmV2OiBzdHJpbmc7XHJcblxyXG4gIC8qKlxyXG4gICAqIE5ldyBzbGlkZSBpZHNcclxuICAgKi9cclxuICBjdXJyZW50OiBzdHJpbmc7XHJcblxyXG4gIC8qKlxyXG4gICAqIFNsaWRlIGV2ZW50IGRpcmVjdGlvblxyXG4gICAqL1xyXG4gIGRpcmVjdGlvbjogTmdiU2xpZGVFdmVudERpcmVjdGlvbjtcclxufVxyXG5cclxuLyoqXHJcbiAqIEVudW0gdG8gZGVmaW5lIHRoZSBjYXJvdXNlbCBzbGlkZSBldmVudCBkaXJlY3Rpb25cclxuICovXHJcbmV4cG9ydCBlbnVtIE5nYlNsaWRlRXZlbnREaXJlY3Rpb24ge1xyXG4gIExFRlQgPSA8YW55PidsZWZ0JyxcclxuICBSSUdIVCA9IDxhbnk+J3JpZ2h0J1xyXG59XHJcblxyXG5leHBvcnQgY29uc3QgTkdCX0NBUk9VU0VMX0RJUkVDVElWRVMgPSBbTmdiQ2Fyb3VzZWwsIE5nYlNsaWRlXTtcclxuIiwiaW1wb3J0IHtOZ01vZHVsZSwgTW9kdWxlV2l0aFByb3ZpZGVyc30gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7Q29tbW9uTW9kdWxlfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xyXG5cclxuaW1wb3J0IHtOR0JfQ0FST1VTRUxfRElSRUNUSVZFU30gZnJvbSAnLi9jYXJvdXNlbCc7XHJcblxyXG5leHBvcnQge05nYkNhcm91c2VsLCBOZ2JTbGlkZSwgTmdiU2xpZGVFdmVudH0gZnJvbSAnLi9jYXJvdXNlbCc7XHJcbmV4cG9ydCB7TmdiQ2Fyb3VzZWxDb25maWd9IGZyb20gJy4vY2Fyb3VzZWwtY29uZmlnJztcclxuXHJcbkBOZ01vZHVsZSh7ZGVjbGFyYXRpb25zOiBOR0JfQ0FST1VTRUxfRElSRUNUSVZFUywgZXhwb3J0czogTkdCX0NBUk9VU0VMX0RJUkVDVElWRVMsIGltcG9ydHM6IFtDb21tb25Nb2R1bGVdfSlcclxuZXhwb3J0IGNsYXNzIE5nYkNhcm91c2VsTW9kdWxlIHtcclxuICAvKipcclxuICAgKiBJbXBvcnRpbmcgd2l0aCAnLmZvclJvb3QoKScgaXMgbm8gbG9uZ2VyIG5lY2Vzc2FyeSwgeW91IGNhbiBzaW1wbHkgaW1wb3J0IHRoZSBtb2R1bGUuXHJcbiAgICogV2lsbCBiZSByZW1vdmVkIGluIDQuMC4wLlxyXG4gICAqXHJcbiAgICogQGRlcHJlY2F0ZWQgMy4wLjBcclxuICAgKi9cclxuICBzdGF0aWMgZm9yUm9vdCgpOiBNb2R1bGVXaXRoUHJvdmlkZXJzIHsgcmV0dXJuIHtuZ01vZHVsZTogTmdiQ2Fyb3VzZWxNb2R1bGV9OyB9XHJcbn1cclxuIiwiaW1wb3J0IHtEaXJlY3RpdmUsIElucHV0fSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuXHJcbi8qKlxyXG4gKiBUaGUgTmdiQ29sbGFwc2UgZGlyZWN0aXZlIHByb3ZpZGVzIGEgc2ltcGxlIHdheSB0byBoaWRlIGFuZCBzaG93IGFuIGVsZW1lbnQgd2l0aCBhbmltYXRpb25zLlxyXG4gKi9cclxuQERpcmVjdGl2ZSh7XHJcbiAgc2VsZWN0b3I6ICdbbmdiQ29sbGFwc2VdJyxcclxuICBleHBvcnRBczogJ25nYkNvbGxhcHNlJyxcclxuICBob3N0OiB7J1tjbGFzcy5jb2xsYXBzZV0nOiAndHJ1ZScsICdbY2xhc3Muc2hvd10nOiAnIWNvbGxhcHNlZCd9XHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBOZ2JDb2xsYXBzZSB7XHJcbiAgLyoqXHJcbiAgICogQSBmbGFnIGluZGljYXRpbmcgY29sbGFwc2VkICh0cnVlKSBvciBvcGVuIChmYWxzZSkgc3RhdGUuXHJcbiAgICovXHJcbiAgQElucHV0KCduZ2JDb2xsYXBzZScpIGNvbGxhcHNlZCA9IGZhbHNlO1xyXG59XHJcbiIsImltcG9ydCB7TmdNb2R1bGUsIE1vZHVsZVdpdGhQcm92aWRlcnN9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQge05nYkNvbGxhcHNlfSBmcm9tICcuL2NvbGxhcHNlJztcclxuXHJcbmV4cG9ydCB7TmdiQ29sbGFwc2V9IGZyb20gJy4vY29sbGFwc2UnO1xyXG5cclxuQE5nTW9kdWxlKHtkZWNsYXJhdGlvbnM6IFtOZ2JDb2xsYXBzZV0sIGV4cG9ydHM6IFtOZ2JDb2xsYXBzZV19KVxyXG5leHBvcnQgY2xhc3MgTmdiQ29sbGFwc2VNb2R1bGUge1xyXG4gIC8qKlxyXG4gICAqIEltcG9ydGluZyB3aXRoICcuZm9yUm9vdCgpJyBpcyBubyBsb25nZXIgbmVjZXNzYXJ5LCB5b3UgY2FuIHNpbXBseSBpbXBvcnQgdGhlIG1vZHVsZS5cclxuICAgKiBXaWxsIGJlIHJlbW92ZWQgaW4gNC4wLjAuXHJcbiAgICpcclxuICAgKiBAZGVwcmVjYXRlZCAzLjAuMFxyXG4gICAqL1xyXG4gIHN0YXRpYyBmb3JSb290KCk6IE1vZHVsZVdpdGhQcm92aWRlcnMgeyByZXR1cm4ge25nTW9kdWxlOiBOZ2JDb2xsYXBzZU1vZHVsZX07IH1cclxufVxyXG4iLCJpbXBvcnQge05nYkRhdGVTdHJ1Y3R9IGZyb20gJy4vbmdiLWRhdGUtc3RydWN0JztcclxuaW1wb3J0IHtpc0ludGVnZXJ9IGZyb20gJy4uL3V0aWwvdXRpbCc7XHJcblxyXG4vKipcclxuICogU2ltcGxlIGNsYXNzIHVzZWQgZm9yIGEgZGF0ZSByZXByZXNlbnRhdGlvbiB0aGF0IGRhdGVwaWNrZXIgYWxzbyB1c2VzIGludGVybmFsbHlcclxuICpcclxuICogQHNpbmNlIDMuMC4wXHJcbiAqL1xyXG5leHBvcnQgY2xhc3MgTmdiRGF0ZSBpbXBsZW1lbnRzIE5nYkRhdGVTdHJ1Y3Qge1xyXG4gIC8qKlxyXG4gICAqIFRoZSB5ZWFyLCBmb3IgZXhhbXBsZSAyMDE2XHJcbiAgICovXHJcbiAgeWVhcjogbnVtYmVyO1xyXG5cclxuICAvKipcclxuICAgKiBUaGUgbW9udGgsIGZvciBleGFtcGxlIDE9SmFuIC4uLiAxMj1EZWMgYXMgaW4gSVNPIDg2MDFcclxuICAgKi9cclxuICBtb250aDogbnVtYmVyO1xyXG5cclxuICAvKipcclxuICAgKiBUaGUgZGF5IG9mIG1vbnRoLCBzdGFydGluZyB3aXRoIDFcclxuICAgKi9cclxuICBkYXk6IG51bWJlcjtcclxuXHJcbiAgLyoqXHJcbiAgICogU3RhdGljIG1ldGhvZC4gQ3JlYXRlcyBhIG5ldyBkYXRlIG9iamVjdCBmcm9tIHRoZSBOZ2JEYXRlU3RydWN0LCBleC4gTmdiRGF0ZS5mcm9tKHt5ZWFyOiAyMDAwLFxyXG4gICAqIG1vbnRoOiA1LCBkYXk6IDF9KS4gSWYgdGhlICdkYXRlJyBpcyBhbHJlYWR5IG9mIE5nYkRhdGUsIHRoZSBtZXRob2Qgd2lsbCByZXR1cm4gdGhlIHNhbWUgb2JqZWN0XHJcbiAgICovXHJcbiAgc3RhdGljIGZyb20oZGF0ZTogTmdiRGF0ZVN0cnVjdCk6IE5nYkRhdGUge1xyXG4gICAgaWYgKGRhdGUgaW5zdGFuY2VvZiBOZ2JEYXRlKSB7XHJcbiAgICAgIHJldHVybiBkYXRlO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIGRhdGUgPyBuZXcgTmdiRGF0ZShkYXRlLnllYXIsIGRhdGUubW9udGgsIGRhdGUuZGF5KSA6IG51bGw7XHJcbiAgfVxyXG5cclxuICBjb25zdHJ1Y3Rvcih5ZWFyOiBudW1iZXIsIG1vbnRoOiBudW1iZXIsIGRheTogbnVtYmVyKSB7XHJcbiAgICB0aGlzLnllYXIgPSBpc0ludGVnZXIoeWVhcikgPyB5ZWFyIDogbnVsbDtcclxuICAgIHRoaXMubW9udGggPSBpc0ludGVnZXIobW9udGgpID8gbW9udGggOiBudWxsO1xyXG4gICAgdGhpcy5kYXkgPSBpc0ludGVnZXIoZGF5KSA/IGRheSA6IG51bGw7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBDaGVja3MgaWYgY3VycmVudCBkYXRlIGlzIGVxdWFsIHRvIGFub3RoZXIgZGF0ZVxyXG4gICAqL1xyXG4gIGVxdWFscyhvdGhlcjogTmdiRGF0ZSk6IGJvb2xlYW4ge1xyXG4gICAgcmV0dXJuIG90aGVyICYmIHRoaXMueWVhciA9PT0gb3RoZXIueWVhciAmJiB0aGlzLm1vbnRoID09PSBvdGhlci5tb250aCAmJiB0aGlzLmRheSA9PT0gb3RoZXIuZGF5O1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogQ2hlY2tzIGlmIGN1cnJlbnQgZGF0ZSBpcyBiZWZvcmUgYW5vdGhlciBkYXRlXHJcbiAgICovXHJcbiAgYmVmb3JlKG90aGVyOiBOZ2JEYXRlKTogYm9vbGVhbiB7XHJcbiAgICBpZiAoIW90aGVyKSB7XHJcbiAgICAgIHJldHVybiBmYWxzZTtcclxuICAgIH1cclxuXHJcbiAgICBpZiAodGhpcy55ZWFyID09PSBvdGhlci55ZWFyKSB7XHJcbiAgICAgIGlmICh0aGlzLm1vbnRoID09PSBvdGhlci5tb250aCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmRheSA9PT0gb3RoZXIuZGF5ID8gZmFsc2UgOiB0aGlzLmRheSA8IG90aGVyLmRheTtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5tb250aCA8IG90aGVyLm1vbnRoO1xyXG4gICAgICB9XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICByZXR1cm4gdGhpcy55ZWFyIDwgb3RoZXIueWVhcjtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIENoZWNrcyBpZiBjdXJyZW50IGRhdGUgaXMgYWZ0ZXIgYW5vdGhlciBkYXRlXHJcbiAgICovXHJcbiAgYWZ0ZXIob3RoZXI6IE5nYkRhdGUpOiBib29sZWFuIHtcclxuICAgIGlmICghb3RoZXIpIHtcclxuICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgfVxyXG4gICAgaWYgKHRoaXMueWVhciA9PT0gb3RoZXIueWVhcikge1xyXG4gICAgICBpZiAodGhpcy5tb250aCA9PT0gb3RoZXIubW9udGgpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5kYXkgPT09IG90aGVyLmRheSA/IGZhbHNlIDogdGhpcy5kYXkgPiBvdGhlci5kYXk7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMubW9udGggPiBvdGhlci5tb250aDtcclxuICAgICAgfVxyXG4gICAgfSBlbHNlIHtcclxuICAgICAgcmV0dXJuIHRoaXMueWVhciA+IG90aGVyLnllYXI7XHJcbiAgICB9XHJcbiAgfVxyXG59XHJcbiIsImltcG9ydCB7TmdiRGF0ZX0gZnJvbSAnLi9uZ2ItZGF0ZSc7XHJcbmltcG9ydCB7SW5qZWN0YWJsZX0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7aXNJbnRlZ2VyfSBmcm9tICcuLi91dGlsL3V0aWwnO1xyXG5cclxuZnVuY3Rpb24gZnJvbUpTRGF0ZShqc0RhdGU6IERhdGUpIHtcclxuICByZXR1cm4gbmV3IE5nYkRhdGUoanNEYXRlLmdldEZ1bGxZZWFyKCksIGpzRGF0ZS5nZXRNb250aCgpICsgMSwganNEYXRlLmdldERhdGUoKSk7XHJcbn1cclxuZnVuY3Rpb24gdG9KU0RhdGUoZGF0ZTogTmdiRGF0ZSkge1xyXG4gIGNvbnN0IGpzRGF0ZSA9IG5ldyBEYXRlKGRhdGUueWVhciwgZGF0ZS5tb250aCAtIDEsIGRhdGUuZGF5LCAxMik7XHJcbiAgLy8gdGhpcyBpcyBkb25lIGF2b2lkIDMwIC0+IDE5MzAgY29udmVyc2lvblxyXG4gIGlmICghaXNOYU4oanNEYXRlLmdldFRpbWUoKSkpIHtcclxuICAgIGpzRGF0ZS5zZXRGdWxsWWVhcihkYXRlLnllYXIpO1xyXG4gIH1cclxuICByZXR1cm4ganNEYXRlO1xyXG59XHJcblxyXG5leHBvcnQgdHlwZSBOZ2JQZXJpb2QgPSAneScgfCAnbScgfCAnZCc7XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gTkdCX0RBVEVQSUNLRVJfQ0FMRU5EQVJfRkFDVE9SWSgpIHtcclxuICByZXR1cm4gbmV3IE5nYkNhbGVuZGFyR3JlZ29yaWFuKCk7XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBDYWxlbmRhciB1c2VkIGJ5IHRoZSBkYXRlcGlja2VyLlxyXG4gKiBEZWZhdWx0IGltcGxlbWVudGF0aW9uIHVzZXMgR3JlZ29yaWFuIGNhbGVuZGFyLlxyXG4gKi9cclxuQEluamVjdGFibGUoe3Byb3ZpZGVkSW46ICdyb290JywgdXNlRmFjdG9yeTogTkdCX0RBVEVQSUNLRVJfQ0FMRU5EQVJfRkFDVE9SWX0pXHJcbmV4cG9ydCBhYnN0cmFjdCBjbGFzcyBOZ2JDYWxlbmRhciB7XHJcbiAgLyoqXHJcbiAgICogUmV0dXJucyBudW1iZXIgb2YgZGF5cyBwZXIgd2Vlay5cclxuICAgKi9cclxuICBhYnN0cmFjdCBnZXREYXlzUGVyV2VlaygpOiBudW1iZXI7XHJcblxyXG4gIC8qKlxyXG4gICAqIFJldHVybnMgYW4gYXJyYXkgb2YgbW9udGhzIHBlciB5ZWFyLlxyXG4gICAqIFdpdGggZGVmYXVsdCBjYWxlbmRhciB3ZSB1c2UgSVNPIDg2MDEgYW5kIHJldHVybiBbMSwgMiwgLi4uLCAxMl07XHJcbiAgICovXHJcbiAgYWJzdHJhY3QgZ2V0TW9udGhzKHllYXI/OiBudW1iZXIpOiBudW1iZXJbXTtcclxuXHJcbiAgLyoqXHJcbiAgICogUmV0dXJucyBudW1iZXIgb2Ygd2Vla3MgcGVyIG1vbnRoLlxyXG4gICAqL1xyXG4gIGFic3RyYWN0IGdldFdlZWtzUGVyTW9udGgoKTogbnVtYmVyO1xyXG5cclxuICAvKipcclxuICAgKiBSZXR1cm5zIHdlZWtkYXkgbnVtYmVyIGZvciBhIGdpdmVuIGRheS5cclxuICAgKiBXaXRoIGRlZmF1bHQgY2FsZW5kYXIgd2UgdXNlIElTTyA4NjAxOiAnd2Vla2RheScgaXMgMT1Nb24gLi4uIDc9U3VuXHJcbiAgICovXHJcbiAgYWJzdHJhY3QgZ2V0V2Vla2RheShkYXRlOiBOZ2JEYXRlKTogbnVtYmVyO1xyXG5cclxuICAvKipcclxuICAgKiBBZGRzIGEgbnVtYmVyIG9mIHllYXJzLCBtb250aHMgb3IgZGF5cyB0byBhIGdpdmVuIGRhdGUuXHJcbiAgICogUGVyaW9kIGNhbiBiZSAneScsICdtJyBvciAnZCcgYW5kIGRlZmF1bHRzIHRvIGRheS5cclxuICAgKiBOdW1iZXIgZGVmYXVsdHMgdG8gMS5cclxuICAgKi9cclxuICBhYnN0cmFjdCBnZXROZXh0KGRhdGU6IE5nYkRhdGUsIHBlcmlvZD86IE5nYlBlcmlvZCwgbnVtYmVyPzogbnVtYmVyKTogTmdiRGF0ZTtcclxuXHJcbiAgLyoqXHJcbiAgICogU3VidHJhY3RzIGEgbnVtYmVyIG9mIHllYXJzLCBtb250aHMgb3IgZGF5cyBmcm9tIGEgZ2l2ZW4gZGF0ZS5cclxuICAgKiBQZXJpb2QgY2FuIGJlICd5JywgJ20nIG9yICdkJyBhbmQgZGVmYXVsdHMgdG8gZGF5LlxyXG4gICAqIE51bWJlciBkZWZhdWx0cyB0byAxLlxyXG4gICAqL1xyXG4gIGFic3RyYWN0IGdldFByZXYoZGF0ZTogTmdiRGF0ZSwgcGVyaW9kPzogTmdiUGVyaW9kLCBudW1iZXI/OiBudW1iZXIpOiBOZ2JEYXRlO1xyXG5cclxuICAvKipcclxuICAgKiBSZXR1cm5zIHdlZWsgbnVtYmVyIGZvciBhIGdpdmVuIHdlZWsuXHJcbiAgICovXHJcbiAgYWJzdHJhY3QgZ2V0V2Vla051bWJlcih3ZWVrOiBOZ2JEYXRlW10sIGZpcnN0RGF5T2ZXZWVrOiBudW1iZXIpOiBudW1iZXI7XHJcblxyXG4gIC8qKlxyXG4gICAqIFJldHVybnMgdG9kYXkncyBkYXRlLlxyXG4gICAqL1xyXG4gIGFic3RyYWN0IGdldFRvZGF5KCk6IE5nYkRhdGU7XHJcblxyXG4gIC8qKlxyXG4gICAqIENoZWNrcyBpZiBhIGRhdGUgaXMgdmFsaWQgZm9yIGEgY3VycmVudCBjYWxlbmRhci5cclxuICAgKi9cclxuICBhYnN0cmFjdCBpc1ZhbGlkKGRhdGU6IE5nYkRhdGUpOiBib29sZWFuO1xyXG59XHJcblxyXG5ASW5qZWN0YWJsZSgpXHJcbmV4cG9ydCBjbGFzcyBOZ2JDYWxlbmRhckdyZWdvcmlhbiBleHRlbmRzIE5nYkNhbGVuZGFyIHtcclxuICBnZXREYXlzUGVyV2VlaygpIHsgcmV0dXJuIDc7IH1cclxuXHJcbiAgZ2V0TW9udGhzKCkgeyByZXR1cm4gWzEsIDIsIDMsIDQsIDUsIDYsIDcsIDgsIDksIDEwLCAxMSwgMTJdOyB9XHJcblxyXG4gIGdldFdlZWtzUGVyTW9udGgoKSB7IHJldHVybiA2OyB9XHJcblxyXG4gIGdldE5leHQoZGF0ZTogTmdiRGF0ZSwgcGVyaW9kOiBOZ2JQZXJpb2QgPSAnZCcsIG51bWJlciA9IDEpIHtcclxuICAgIGxldCBqc0RhdGUgPSB0b0pTRGF0ZShkYXRlKTtcclxuXHJcbiAgICBzd2l0Y2ggKHBlcmlvZCkge1xyXG4gICAgICBjYXNlICd5JzpcclxuICAgICAgICByZXR1cm4gbmV3IE5nYkRhdGUoZGF0ZS55ZWFyICsgbnVtYmVyLCAxLCAxKTtcclxuICAgICAgY2FzZSAnbSc6XHJcbiAgICAgICAganNEYXRlID0gbmV3IERhdGUoZGF0ZS55ZWFyLCBkYXRlLm1vbnRoICsgbnVtYmVyIC0gMSwgMSwgMTIpO1xyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgICBjYXNlICdkJzpcclxuICAgICAgICBqc0RhdGUuc2V0RGF0ZShqc0RhdGUuZ2V0RGF0ZSgpICsgbnVtYmVyKTtcclxuICAgICAgICBicmVhaztcclxuICAgICAgZGVmYXVsdDpcclxuICAgICAgICByZXR1cm4gZGF0ZTtcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gZnJvbUpTRGF0ZShqc0RhdGUpO1xyXG4gIH1cclxuXHJcbiAgZ2V0UHJldihkYXRlOiBOZ2JEYXRlLCBwZXJpb2Q6IE5nYlBlcmlvZCA9ICdkJywgbnVtYmVyID0gMSkgeyByZXR1cm4gdGhpcy5nZXROZXh0KGRhdGUsIHBlcmlvZCwgLW51bWJlcik7IH1cclxuXHJcbiAgZ2V0V2Vla2RheShkYXRlOiBOZ2JEYXRlKSB7XHJcbiAgICBsZXQganNEYXRlID0gdG9KU0RhdGUoZGF0ZSk7XHJcbiAgICBsZXQgZGF5ID0ganNEYXRlLmdldERheSgpO1xyXG4gICAgLy8gaW4gSlMgRGF0ZSBTdW49MCwgaW4gSVNPIDg2MDEgU3VuPTdcclxuICAgIHJldHVybiBkYXkgPT09IDAgPyA3IDogZGF5O1xyXG4gIH1cclxuXHJcbiAgZ2V0V2Vla051bWJlcih3ZWVrOiBOZ2JEYXRlW10sIGZpcnN0RGF5T2ZXZWVrOiBudW1iZXIpIHtcclxuICAgIC8vIGluIEpTIERhdGUgU3VuPTAsIGluIElTTyA4NjAxIFN1bj03XHJcbiAgICBpZiAoZmlyc3REYXlPZldlZWsgPT09IDcpIHtcclxuICAgICAgZmlyc3REYXlPZldlZWsgPSAwO1xyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0IHRodXJzZGF5SW5kZXggPSAoNCArIDcgLSBmaXJzdERheU9mV2VlaykgJSA3O1xyXG4gICAgbGV0IGRhdGUgPSB3ZWVrW3RodXJzZGF5SW5kZXhdO1xyXG5cclxuICAgIGNvbnN0IGpzRGF0ZSA9IHRvSlNEYXRlKGRhdGUpO1xyXG4gICAganNEYXRlLnNldERhdGUoanNEYXRlLmdldERhdGUoKSArIDQgLSAoanNEYXRlLmdldERheSgpIHx8IDcpKTsgIC8vIFRodXJzZGF5XHJcbiAgICBjb25zdCB0aW1lID0ganNEYXRlLmdldFRpbWUoKTtcclxuICAgIGpzRGF0ZS5zZXRNb250aCgwKTsgIC8vIENvbXBhcmUgd2l0aCBKYW4gMVxyXG4gICAganNEYXRlLnNldERhdGUoMSk7XHJcbiAgICByZXR1cm4gTWF0aC5mbG9vcihNYXRoLnJvdW5kKCh0aW1lIC0ganNEYXRlLmdldFRpbWUoKSkgLyA4NjQwMDAwMCkgLyA3KSArIDE7XHJcbiAgfVxyXG5cclxuICBnZXRUb2RheSgpOiBOZ2JEYXRlIHsgcmV0dXJuIGZyb21KU0RhdGUobmV3IERhdGUoKSk7IH1cclxuXHJcbiAgaXNWYWxpZChkYXRlOiBOZ2JEYXRlKTogYm9vbGVhbiB7XHJcbiAgICBpZiAoIWRhdGUgfHwgIWlzSW50ZWdlcihkYXRlLnllYXIpIHx8ICFpc0ludGVnZXIoZGF0ZS5tb250aCkgfHwgIWlzSW50ZWdlcihkYXRlLmRheSkpIHtcclxuICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0IGpzRGF0ZSA9IHRvSlNEYXRlKGRhdGUpO1xyXG5cclxuICAgIHJldHVybiAhaXNOYU4oanNEYXRlLmdldFRpbWUoKSkgJiYganNEYXRlLmdldEZ1bGxZZWFyKCkgPT09IGRhdGUueWVhciAmJiBqc0RhdGUuZ2V0TW9udGgoKSArIDEgPT09IGRhdGUubW9udGggJiZcclxuICAgICAgICBqc0RhdGUuZ2V0RGF0ZSgpID09PSBkYXRlLmRheTtcclxuICB9XHJcbn1cclxuIiwiaW1wb3J0IHtOZ2JEYXRlfSBmcm9tICcuL25nYi1kYXRlJztcclxuaW1wb3J0IHtEYXRlcGlja2VyVmlld01vZGVsLCBEYXlWaWV3TW9kZWwsIE1vbnRoVmlld01vZGVsfSBmcm9tICcuL2RhdGVwaWNrZXItdmlldy1tb2RlbCc7XHJcbmltcG9ydCB7TmdiQ2FsZW5kYXJ9IGZyb20gJy4vbmdiLWNhbGVuZGFyJztcclxuaW1wb3J0IHtpc0RlZmluZWR9IGZyb20gJy4uL3V0aWwvdXRpbCc7XHJcbmltcG9ydCB7TmdiRGF0ZXBpY2tlckkxOG59IGZyb20gJy4vZGF0ZXBpY2tlci1pMThuJztcclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBpc0NoYW5nZWREYXRlKHByZXY6IE5nYkRhdGUsIG5leHQ6IE5nYkRhdGUpIHtcclxuICByZXR1cm4gIWRhdGVDb21wYXJhdG9yKHByZXYsIG5leHQpO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gZGF0ZUNvbXBhcmF0b3IocHJldjogTmdiRGF0ZSwgbmV4dDogTmdiRGF0ZSkge1xyXG4gIHJldHVybiAoIXByZXYgJiYgIW5leHQpIHx8ICghIXByZXYgJiYgISFuZXh0ICYmIHByZXYuZXF1YWxzKG5leHQpKTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGNoZWNrTWluQmVmb3JlTWF4KG1pbkRhdGU6IE5nYkRhdGUsIG1heERhdGU6IE5nYkRhdGUpIHtcclxuICBpZiAobWF4RGF0ZSAmJiBtaW5EYXRlICYmIG1heERhdGUuYmVmb3JlKG1pbkRhdGUpKSB7XHJcbiAgICB0aHJvdyBuZXcgRXJyb3IoYCdtYXhEYXRlJyAke21heERhdGV9IHNob3VsZCBiZSBncmVhdGVyIHRoYW4gJ21pbkRhdGUnICR7bWluRGF0ZX1gKTtcclxuICB9XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBjaGVja0RhdGVJblJhbmdlKGRhdGU6IE5nYkRhdGUsIG1pbkRhdGU6IE5nYkRhdGUsIG1heERhdGU6IE5nYkRhdGUpOiBOZ2JEYXRlIHtcclxuICBpZiAoZGF0ZSAmJiBtaW5EYXRlICYmIGRhdGUuYmVmb3JlKG1pbkRhdGUpKSB7XHJcbiAgICByZXR1cm4gbWluRGF0ZTtcclxuICB9XHJcbiAgaWYgKGRhdGUgJiYgbWF4RGF0ZSAmJiBkYXRlLmFmdGVyKG1heERhdGUpKSB7XHJcbiAgICByZXR1cm4gbWF4RGF0ZTtcclxuICB9XHJcblxyXG4gIHJldHVybiBkYXRlO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gaXNEYXRlU2VsZWN0YWJsZShkYXRlOiBOZ2JEYXRlLCBzdGF0ZTogRGF0ZXBpY2tlclZpZXdNb2RlbCkge1xyXG4gIGNvbnN0IHttaW5EYXRlLCBtYXhEYXRlLCBkaXNhYmxlZCwgbWFya0Rpc2FibGVkfSA9IHN0YXRlO1xyXG4gIC8vIGNsYW5nLWZvcm1hdCBvZmZcclxuICByZXR1cm4gIShcclxuICAgICFpc0RlZmluZWQoZGF0ZSkgfHxcclxuICAgIGRpc2FibGVkIHx8XHJcbiAgICAobWFya0Rpc2FibGVkICYmIG1hcmtEaXNhYmxlZChkYXRlLCB7eWVhcjogZGF0ZS55ZWFyLCBtb250aDogZGF0ZS5tb250aH0pKSB8fFxyXG4gICAgKG1pbkRhdGUgJiYgZGF0ZS5iZWZvcmUobWluRGF0ZSkpIHx8XHJcbiAgICAobWF4RGF0ZSAmJiBkYXRlLmFmdGVyKG1heERhdGUpKVxyXG4gICk7XHJcbiAgLy8gY2xhbmctZm9ybWF0IG9uXHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBnZW5lcmF0ZVNlbGVjdEJveE1vbnRocyhjYWxlbmRhcjogTmdiQ2FsZW5kYXIsIGRhdGU6IE5nYkRhdGUsIG1pbkRhdGU6IE5nYkRhdGUsIG1heERhdGU6IE5nYkRhdGUpIHtcclxuICBpZiAoIWRhdGUpIHtcclxuICAgIHJldHVybiBbXTtcclxuICB9XHJcblxyXG4gIGxldCBtb250aHMgPSBjYWxlbmRhci5nZXRNb250aHMoZGF0ZS55ZWFyKTtcclxuXHJcbiAgaWYgKG1pbkRhdGUgJiYgZGF0ZS55ZWFyID09PSBtaW5EYXRlLnllYXIpIHtcclxuICAgIGNvbnN0IGluZGV4ID0gbW9udGhzLmZpbmRJbmRleChtb250aCA9PiBtb250aCA9PT0gbWluRGF0ZS5tb250aCk7XHJcbiAgICBtb250aHMgPSBtb250aHMuc2xpY2UoaW5kZXgpO1xyXG4gIH1cclxuXHJcbiAgaWYgKG1heERhdGUgJiYgZGF0ZS55ZWFyID09PSBtYXhEYXRlLnllYXIpIHtcclxuICAgIGNvbnN0IGluZGV4ID0gbW9udGhzLmZpbmRJbmRleChtb250aCA9PiBtb250aCA9PT0gbWF4RGF0ZS5tb250aCk7XHJcbiAgICBtb250aHMgPSBtb250aHMuc2xpY2UoMCwgaW5kZXggKyAxKTtcclxuICB9XHJcblxyXG4gIHJldHVybiBtb250aHM7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBnZW5lcmF0ZVNlbGVjdEJveFllYXJzKGRhdGU6IE5nYkRhdGUsIG1pbkRhdGU6IE5nYkRhdGUsIG1heERhdGU6IE5nYkRhdGUpIHtcclxuICBpZiAoIWRhdGUpIHtcclxuICAgIHJldHVybiBbXTtcclxuICB9XHJcblxyXG4gIGNvbnN0IHN0YXJ0ID0gbWluRGF0ZSAmJiBtaW5EYXRlLnllYXIgfHwgZGF0ZS55ZWFyIC0gMTA7XHJcbiAgY29uc3QgZW5kID0gbWF4RGF0ZSAmJiBtYXhEYXRlLnllYXIgfHwgZGF0ZS55ZWFyICsgMTA7XHJcblxyXG4gIHJldHVybiBBcnJheS5mcm9tKHtsZW5ndGg6IGVuZCAtIHN0YXJ0ICsgMX0sIChlLCBpKSA9PiBzdGFydCArIGkpO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gbmV4dE1vbnRoRGlzYWJsZWQoY2FsZW5kYXI6IE5nYkNhbGVuZGFyLCBkYXRlOiBOZ2JEYXRlLCBtYXhEYXRlOiBOZ2JEYXRlKSB7XHJcbiAgcmV0dXJuIG1heERhdGUgJiYgY2FsZW5kYXIuZ2V0TmV4dChkYXRlLCAnbScpLmFmdGVyKG1heERhdGUpO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gcHJldk1vbnRoRGlzYWJsZWQoY2FsZW5kYXI6IE5nYkNhbGVuZGFyLCBkYXRlOiBOZ2JEYXRlLCBtaW5EYXRlOiBOZ2JEYXRlKSB7XHJcbiAgY29uc3QgcHJldkRhdGUgPSBjYWxlbmRhci5nZXRQcmV2KGRhdGUsICdtJyk7XHJcbiAgcmV0dXJuIG1pbkRhdGUgJiYgKHByZXZEYXRlLnllYXIgPT09IG1pbkRhdGUueWVhciAmJiBwcmV2RGF0ZS5tb250aCA8IG1pbkRhdGUubW9udGggfHxcclxuICAgICAgICAgICAgICAgICAgICAgcHJldkRhdGUueWVhciA8IG1pbkRhdGUueWVhciAmJiBtaW5EYXRlLm1vbnRoID09PSAxKTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGJ1aWxkTW9udGhzKFxyXG4gICAgY2FsZW5kYXI6IE5nYkNhbGVuZGFyLCBkYXRlOiBOZ2JEYXRlLCBzdGF0ZTogRGF0ZXBpY2tlclZpZXdNb2RlbCwgaTE4bjogTmdiRGF0ZXBpY2tlckkxOG4sXHJcbiAgICBmb3JjZTogYm9vbGVhbik6IE1vbnRoVmlld01vZGVsW10ge1xyXG4gIGNvbnN0IHtkaXNwbGF5TW9udGhzLCBtb250aHN9ID0gc3RhdGU7XHJcbiAgLy8gbW92ZSBvbGQgbW9udGhzIHRvIGEgdGVtcG9yYXJ5IGFycmF5XHJcbiAgY29uc3QgbW9udGhzVG9SZXVzZSA9IG1vbnRocy5zcGxpY2UoMCwgbW9udGhzLmxlbmd0aCk7XHJcblxyXG4gIC8vIGdlbmVyYXRlIG5ldyBmaXJzdCBkYXRlcywgbnVsbGlmeSBvciByZXVzZSBtb250aHNcclxuICBjb25zdCBmaXJzdERhdGVzID0gQXJyYXkuZnJvbSh7bGVuZ3RoOiBkaXNwbGF5TW9udGhzfSwgKF8sIGkpID0+IHtcclxuICAgIGNvbnN0IGZpcnN0RGF0ZSA9IGNhbGVuZGFyLmdldE5leHQoZGF0ZSwgJ20nLCBpKTtcclxuICAgIG1vbnRoc1tpXSA9IG51bGw7XHJcblxyXG4gICAgaWYgKCFmb3JjZSkge1xyXG4gICAgICBjb25zdCByZXVzZWRJbmRleCA9IG1vbnRoc1RvUmV1c2UuZmluZEluZGV4KG1vbnRoID0+IG1vbnRoLmZpcnN0RGF0ZS5lcXVhbHMoZmlyc3REYXRlKSk7XHJcbiAgICAgIC8vIG1vdmUgcmV1c2VkIG1vbnRoIGJhY2sgdG8gbW9udGhzXHJcbiAgICAgIGlmIChyZXVzZWRJbmRleCAhPT0gLTEpIHtcclxuICAgICAgICBtb250aHNbaV0gPSBtb250aHNUb1JldXNlLnNwbGljZShyZXVzZWRJbmRleCwgMSlbMF07XHJcbiAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gZmlyc3REYXRlO1xyXG4gIH0pO1xyXG5cclxuICAvLyByZWJ1aWxkIG51bGxpZmllZCBtb250aHNcclxuICBmaXJzdERhdGVzLmZvckVhY2goKGZpcnN0RGF0ZSwgaSkgPT4ge1xyXG4gICAgaWYgKG1vbnRoc1tpXSA9PT0gbnVsbCkge1xyXG4gICAgICBtb250aHNbaV0gPSBidWlsZE1vbnRoKGNhbGVuZGFyLCBmaXJzdERhdGUsIHN0YXRlLCBpMThuLCBtb250aHNUb1JldXNlLnNoaWZ0KCkgfHwge30gYXMgTW9udGhWaWV3TW9kZWwpO1xyXG4gICAgfVxyXG4gIH0pO1xyXG5cclxuICByZXR1cm4gbW9udGhzO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gYnVpbGRNb250aChcclxuICAgIGNhbGVuZGFyOiBOZ2JDYWxlbmRhciwgZGF0ZTogTmdiRGF0ZSwgc3RhdGU6IERhdGVwaWNrZXJWaWV3TW9kZWwsIGkxOG46IE5nYkRhdGVwaWNrZXJJMThuLFxyXG4gICAgbW9udGg6IE1vbnRoVmlld01vZGVsID0ge30gYXMgTW9udGhWaWV3TW9kZWwpOiBNb250aFZpZXdNb2RlbCB7XHJcbiAgY29uc3Qge21pbkRhdGUsIG1heERhdGUsIGZpcnN0RGF5T2ZXZWVrLCBtYXJrRGlzYWJsZWQsIG91dHNpZGVEYXlzfSA9IHN0YXRlO1xyXG5cclxuICBtb250aC5maXJzdERhdGUgPSBudWxsO1xyXG4gIG1vbnRoLmxhc3REYXRlID0gbnVsbDtcclxuICBtb250aC5udW1iZXIgPSBkYXRlLm1vbnRoO1xyXG4gIG1vbnRoLnllYXIgPSBkYXRlLnllYXI7XHJcbiAgbW9udGgud2Vla3MgPSBtb250aC53ZWVrcyB8fCBbXTtcclxuICBtb250aC53ZWVrZGF5cyA9IG1vbnRoLndlZWtkYXlzIHx8IFtdO1xyXG5cclxuICBkYXRlID0gZ2V0Rmlyc3RWaWV3RGF0ZShjYWxlbmRhciwgZGF0ZSwgZmlyc3REYXlPZldlZWspO1xyXG5cclxuICAvLyBtb250aCBoYXMgd2Vla3NcclxuICBmb3IgKGxldCB3ZWVrID0gMDsgd2VlayA8IGNhbGVuZGFyLmdldFdlZWtzUGVyTW9udGgoKTsgd2VlaysrKSB7XHJcbiAgICBsZXQgd2Vla09iamVjdCA9IG1vbnRoLndlZWtzW3dlZWtdO1xyXG4gICAgaWYgKCF3ZWVrT2JqZWN0KSB7XHJcbiAgICAgIHdlZWtPYmplY3QgPSBtb250aC53ZWVrc1t3ZWVrXSA9IHtudW1iZXI6IDAsIGRheXM6IFtdLCBjb2xsYXBzZWQ6IHRydWV9O1xyXG4gICAgfVxyXG4gICAgY29uc3QgZGF5cyA9IHdlZWtPYmplY3QuZGF5cztcclxuXHJcbiAgICAvLyB3ZWVrIGhhcyBkYXlzXHJcbiAgICBmb3IgKGxldCBkYXkgPSAwOyBkYXkgPCBjYWxlbmRhci5nZXREYXlzUGVyV2VlaygpOyBkYXkrKykge1xyXG4gICAgICBpZiAod2VlayA9PT0gMCkge1xyXG4gICAgICAgIG1vbnRoLndlZWtkYXlzW2RheV0gPSBjYWxlbmRhci5nZXRXZWVrZGF5KGRhdGUpO1xyXG4gICAgICB9XHJcblxyXG4gICAgICBjb25zdCBuZXdEYXRlID0gbmV3IE5nYkRhdGUoZGF0ZS55ZWFyLCBkYXRlLm1vbnRoLCBkYXRlLmRheSk7XHJcbiAgICAgIGNvbnN0IG5leHREYXRlID0gY2FsZW5kYXIuZ2V0TmV4dChuZXdEYXRlKTtcclxuXHJcbiAgICAgIGNvbnN0IGFyaWFMYWJlbCA9IGkxOG4uZ2V0RGF5QXJpYUxhYmVsKG5ld0RhdGUpO1xyXG5cclxuICAgICAgLy8gbWFya2luZyBkYXRlIGFzIGRpc2FibGVkXHJcbiAgICAgIGxldCBkaXNhYmxlZCA9ICEhKChtaW5EYXRlICYmIG5ld0RhdGUuYmVmb3JlKG1pbkRhdGUpKSB8fCAobWF4RGF0ZSAmJiBuZXdEYXRlLmFmdGVyKG1heERhdGUpKSk7XHJcbiAgICAgIGlmICghZGlzYWJsZWQgJiYgbWFya0Rpc2FibGVkKSB7XHJcbiAgICAgICAgZGlzYWJsZWQgPSBtYXJrRGlzYWJsZWQobmV3RGF0ZSwge21vbnRoOiBtb250aC5udW1iZXIsIHllYXI6IG1vbnRoLnllYXJ9KTtcclxuICAgICAgfVxyXG5cclxuICAgICAgLy8gc2F2aW5nIGZpcnN0IGRhdGUgb2YgdGhlIG1vbnRoXHJcbiAgICAgIGlmIChtb250aC5maXJzdERhdGUgPT09IG51bGwgJiYgbmV3RGF0ZS5tb250aCA9PT0gbW9udGgubnVtYmVyKSB7XHJcbiAgICAgICAgbW9udGguZmlyc3REYXRlID0gbmV3RGF0ZTtcclxuICAgICAgfVxyXG5cclxuICAgICAgLy8gc2F2aW5nIGxhc3QgZGF0ZSBvZiB0aGUgbW9udGhcclxuICAgICAgaWYgKG5ld0RhdGUubW9udGggPT09IG1vbnRoLm51bWJlciAmJiBuZXh0RGF0ZS5tb250aCAhPT0gbW9udGgubnVtYmVyKSB7XHJcbiAgICAgICAgbW9udGgubGFzdERhdGUgPSBuZXdEYXRlO1xyXG4gICAgICB9XHJcblxyXG4gICAgICBsZXQgZGF5T2JqZWN0ID0gZGF5c1tkYXldO1xyXG4gICAgICBpZiAoIWRheU9iamVjdCkge1xyXG4gICAgICAgIGRheU9iamVjdCA9IGRheXNbZGF5XSA9IHt9IGFzIERheVZpZXdNb2RlbDtcclxuICAgICAgfVxyXG4gICAgICBkYXlPYmplY3QuZGF0ZSA9IG5ld0RhdGU7XHJcbiAgICAgIGRheU9iamVjdC5jb250ZXh0ID0gT2JqZWN0LmFzc2lnbihcclxuICAgICAgICAgIGRheU9iamVjdC5jb250ZXh0IHx8IHt9LFxyXG4gICAgICAgICAge2RhdGU6IG5ld0RhdGUsIGN1cnJlbnRNb250aDogbW9udGgubnVtYmVyLCBkaXNhYmxlZCwgZm9jdXNlZDogZmFsc2UsIHNlbGVjdGVkOiBmYWxzZX0pO1xyXG4gICAgICBkYXlPYmplY3QudGFiaW5kZXggPSAtMTtcclxuICAgICAgZGF5T2JqZWN0LmFyaWFMYWJlbCA9IGFyaWFMYWJlbDtcclxuICAgICAgZGF5T2JqZWN0LmhpZGRlbiA9IGZhbHNlO1xyXG5cclxuICAgICAgZGF0ZSA9IG5leHREYXRlO1xyXG4gICAgfVxyXG5cclxuICAgIHdlZWtPYmplY3QubnVtYmVyID0gY2FsZW5kYXIuZ2V0V2Vla051bWJlcihkYXlzLm1hcChkYXkgPT4gZGF5LmRhdGUpLCBmaXJzdERheU9mV2Vlayk7XHJcblxyXG4gICAgLy8gbWFya2luZyB3ZWVrIGFzIGNvbGxhcHNlZFxyXG4gICAgd2Vla09iamVjdC5jb2xsYXBzZWQgPSBvdXRzaWRlRGF5cyA9PT0gJ2NvbGxhcHNlZCcgJiYgZGF5c1swXS5kYXRlLm1vbnRoICE9PSBtb250aC5udW1iZXIgJiZcclxuICAgICAgICBkYXlzW2RheXMubGVuZ3RoIC0gMV0uZGF0ZS5tb250aCAhPT0gbW9udGgubnVtYmVyO1xyXG4gIH1cclxuXHJcbiAgcmV0dXJuIG1vbnRoO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gZ2V0Rmlyc3RWaWV3RGF0ZShjYWxlbmRhcjogTmdiQ2FsZW5kYXIsIGRhdGU6IE5nYkRhdGUsIGZpcnN0RGF5T2ZXZWVrOiBudW1iZXIpOiBOZ2JEYXRlIHtcclxuICBjb25zdCBkYXlzUGVyV2VlayA9IGNhbGVuZGFyLmdldERheXNQZXJXZWVrKCk7XHJcbiAgY29uc3QgZmlyc3RNb250aERhdGUgPSBuZXcgTmdiRGF0ZShkYXRlLnllYXIsIGRhdGUubW9udGgsIDEpO1xyXG4gIGNvbnN0IGRheU9mV2VlayA9IGNhbGVuZGFyLmdldFdlZWtkYXkoZmlyc3RNb250aERhdGUpICUgZGF5c1BlcldlZWs7XHJcbiAgcmV0dXJuIGNhbGVuZGFyLmdldFByZXYoZmlyc3RNb250aERhdGUsICdkJywgKGRheXNQZXJXZWVrICsgZGF5T2ZXZWVrIC0gZmlyc3REYXlPZldlZWspICUgZGF5c1BlcldlZWspO1xyXG59XHJcbiIsImltcG9ydCB7SW5qZWN0LCBJbmplY3RhYmxlLCBMT0NBTEVfSUR9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQge0Zvcm1TdHlsZSwgZ2V0TG9jYWxlRGF5TmFtZXMsIGdldExvY2FsZU1vbnRoTmFtZXMsIFRyYW5zbGF0aW9uV2lkdGgsIGZvcm1hdERhdGV9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XHJcbmltcG9ydCB7TmdiRGF0ZVN0cnVjdH0gZnJvbSAnLi9uZ2ItZGF0ZS1zdHJ1Y3QnO1xyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIE5HQl9EQVRFUElDS0VSXzE4Tl9GQUNUT1JZKGxvY2FsZSkge1xyXG4gIHJldHVybiBuZXcgTmdiRGF0ZXBpY2tlckkxOG5EZWZhdWx0KGxvY2FsZSk7XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBUeXBlIG9mIHRoZSBzZXJ2aWNlIHN1cHBseWluZyBtb250aCBhbmQgd2Vla2RheSBuYW1lcyB0byB0byBOZ2JEYXRlcGlja2VyIGNvbXBvbmVudC5cclxuICogVGhlIGRlZmF1bHQgaW1wbGVtZW50YXRpb24gb2YgdGhpcyBzZXJ2aWNlIGhvbm9ycyB0aGUgQW5ndWxhciBsb2NhbGUsIGFuZCB1c2VzIHRoZSByZWdpc3RlcmVkIGxvY2FsZSBkYXRhLFxyXG4gKiBhcyBleHBsYWluZWQgaW4gdGhlIEFuZ3VsYXIgaTE4biBndWlkZS5cclxuICogU2VlIHRoZSBpMThuIGRlbW8gZm9yIGhvdyB0byBleHRlbmQgdGhpcyBjbGFzcyBhbmQgZGVmaW5lIGEgY3VzdG9tIHByb3ZpZGVyIGZvciBpMThuLlxyXG4gKi9cclxuQEluamVjdGFibGUoe3Byb3ZpZGVkSW46ICdyb290JywgdXNlRmFjdG9yeTogTkdCX0RBVEVQSUNLRVJfMThOX0ZBQ1RPUlksIGRlcHM6IFtMT0NBTEVfSURdfSlcclxuZXhwb3J0IGFic3RyYWN0IGNsYXNzIE5nYkRhdGVwaWNrZXJJMThuIHtcclxuICAvKipcclxuICAgKiBSZXR1cm5zIHRoZSBzaG9ydCB3ZWVrZGF5IG5hbWUgdG8gZGlzcGxheSBpbiB0aGUgaGVhZGluZyBvZiB0aGUgbW9udGggdmlldy5cclxuICAgKiBXaXRoIGRlZmF1bHQgY2FsZW5kYXIgd2UgdXNlIElTTyA4NjAxOiAnd2Vla2RheScgaXMgMT1Nb24gLi4uIDc9U3VuXHJcbiAgICovXHJcbiAgYWJzdHJhY3QgZ2V0V2Vla2RheVNob3J0TmFtZSh3ZWVrZGF5OiBudW1iZXIpOiBzdHJpbmc7XHJcblxyXG4gIC8qKlxyXG4gICAqIFJldHVybnMgdGhlIHNob3J0IG1vbnRoIG5hbWUgdG8gZGlzcGxheSBpbiB0aGUgZGF0ZSBwaWNrZXIgbmF2aWdhdGlvbi5cclxuICAgKiBXaXRoIGRlZmF1bHQgY2FsZW5kYXIgd2UgdXNlIElTTyA4NjAxOiAnbW9udGgnIGlzIDE9SmFuIC4uLiAxMj1EZWNcclxuICAgKi9cclxuICBhYnN0cmFjdCBnZXRNb250aFNob3J0TmFtZShtb250aDogbnVtYmVyLCB5ZWFyPzogbnVtYmVyKTogc3RyaW5nO1xyXG5cclxuICAvKipcclxuICAgKiBSZXR1cm5zIHRoZSBmdWxsIG1vbnRoIG5hbWUgdG8gZGlzcGxheSBpbiB0aGUgZGF0ZSBwaWNrZXIgbmF2aWdhdGlvbi5cclxuICAgKiBXaXRoIGRlZmF1bHQgY2FsZW5kYXIgd2UgdXNlIElTTyA4NjAxOiAnbW9udGgnIGlzIDE9SmFudWFyeSAuLi4gMTI9RGVjZW1iZXJcclxuICAgKi9cclxuICBhYnN0cmFjdCBnZXRNb250aEZ1bGxOYW1lKG1vbnRoOiBudW1iZXIsIHllYXI/OiBudW1iZXIpOiBzdHJpbmc7XHJcblxyXG4gIC8qKlxyXG4gICAqIFJldHVybnMgdGhlIHZhbHVlIG9mIHRoZSAnYXJpYS1sYWJlbCcgYXR0cmlidXRlIGZvciBhIHNwZWNpZmljIGRhdGVcclxuICAgKlxyXG4gICAqIEBzaW5jZSAyLjAuMFxyXG4gICAqL1xyXG4gIGFic3RyYWN0IGdldERheUFyaWFMYWJlbChkYXRlOiBOZ2JEYXRlU3RydWN0KTogc3RyaW5nO1xyXG5cclxuICAvKipcclxuICAgKiBSZXR1cm5zIHRoZSB0ZXh0dWFsIHJlcHJlc2VudGF0aW9uIG9mIGEgZGF5IHRoYXQgaXMgcmVuZGVyZWQgaW4gYSBkYXkgY2VsbFxyXG4gICAqXHJcbiAgICogQHNpbmNlIDMuMC4wXHJcbiAgICovXHJcbiAgZ2V0RGF5TnVtZXJhbHMoZGF0ZTogTmdiRGF0ZVN0cnVjdCk6IHN0cmluZyB7IHJldHVybiBgJHtkYXRlLmRheX1gOyB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFJldHVybnMgdGhlIHRleHR1YWwgcmVwcmVzZW50YXRpb24gb2YgYSB3ZWVrIG51bWJlciByZW5kZXJlZCBieSBkYXRlIHBpY2tlclxyXG4gICAqXHJcbiAgICogQHNpbmNlIDMuMC4wXHJcbiAgICovXHJcbiAgZ2V0V2Vla051bWVyYWxzKHdlZWtOdW1iZXI6IG51bWJlcik6IHN0cmluZyB7IHJldHVybiBgJHt3ZWVrTnVtYmVyfWA7IH1cclxuXHJcbiAgLyoqXHJcbiAgICogUmV0dXJucyB0aGUgdGV4dHVhbCByZXByZXNlbnRhdGlvbiBvZiBhIHllYXIgdGhhdCBpcyByZW5kZXJlZFxyXG4gICAqIGluIGRhdGUgcGlja2VyIHllYXIgc2VsZWN0IGJveFxyXG4gICAqXHJcbiAgICogQHNpbmNlIDMuMC4wXHJcbiAgICovXHJcbiAgZ2V0WWVhck51bWVyYWxzKHllYXI6IG51bWJlcik6IHN0cmluZyB7IHJldHVybiBgJHt5ZWFyfWA7IH1cclxufVxyXG5cclxuQEluamVjdGFibGUoKVxyXG5leHBvcnQgY2xhc3MgTmdiRGF0ZXBpY2tlckkxOG5EZWZhdWx0IGV4dGVuZHMgTmdiRGF0ZXBpY2tlckkxOG4ge1xyXG4gIHByaXZhdGUgX3dlZWtkYXlzU2hvcnQ6IEFycmF5PHN0cmluZz47XHJcbiAgcHJpdmF0ZSBfbW9udGhzU2hvcnQ6IEFycmF5PHN0cmluZz47XHJcbiAgcHJpdmF0ZSBfbW9udGhzRnVsbDogQXJyYXk8c3RyaW5nPjtcclxuXHJcbiAgY29uc3RydWN0b3IoQEluamVjdChMT0NBTEVfSUQpIHByaXZhdGUgX2xvY2FsZTogc3RyaW5nKSB7XHJcbiAgICBzdXBlcigpO1xyXG5cclxuICAgIGNvbnN0IHdlZWtkYXlzU3RhcnRpbmdPblN1bmRheSA9IGdldExvY2FsZURheU5hbWVzKF9sb2NhbGUsIEZvcm1TdHlsZS5TdGFuZGFsb25lLCBUcmFuc2xhdGlvbldpZHRoLlNob3J0KTtcclxuICAgIHRoaXMuX3dlZWtkYXlzU2hvcnQgPSB3ZWVrZGF5c1N0YXJ0aW5nT25TdW5kYXkubWFwKChkYXksIGluZGV4KSA9PiB3ZWVrZGF5c1N0YXJ0aW5nT25TdW5kYXlbKGluZGV4ICsgMSkgJSA3XSk7XHJcblxyXG4gICAgdGhpcy5fbW9udGhzU2hvcnQgPSBnZXRMb2NhbGVNb250aE5hbWVzKF9sb2NhbGUsIEZvcm1TdHlsZS5TdGFuZGFsb25lLCBUcmFuc2xhdGlvbldpZHRoLkFiYnJldmlhdGVkKTtcclxuICAgIHRoaXMuX21vbnRoc0Z1bGwgPSBnZXRMb2NhbGVNb250aE5hbWVzKF9sb2NhbGUsIEZvcm1TdHlsZS5TdGFuZGFsb25lLCBUcmFuc2xhdGlvbldpZHRoLldpZGUpO1xyXG4gIH1cclxuXHJcbiAgZ2V0V2Vla2RheVNob3J0TmFtZSh3ZWVrZGF5OiBudW1iZXIpOiBzdHJpbmcgeyByZXR1cm4gdGhpcy5fd2Vla2RheXNTaG9ydFt3ZWVrZGF5IC0gMV07IH1cclxuXHJcbiAgZ2V0TW9udGhTaG9ydE5hbWUobW9udGg6IG51bWJlcik6IHN0cmluZyB7IHJldHVybiB0aGlzLl9tb250aHNTaG9ydFttb250aCAtIDFdOyB9XHJcblxyXG4gIGdldE1vbnRoRnVsbE5hbWUobW9udGg6IG51bWJlcik6IHN0cmluZyB7IHJldHVybiB0aGlzLl9tb250aHNGdWxsW21vbnRoIC0gMV07IH1cclxuXHJcbiAgZ2V0RGF5QXJpYUxhYmVsKGRhdGU6IE5nYkRhdGVTdHJ1Y3QpOiBzdHJpbmcge1xyXG4gICAgY29uc3QganNEYXRlID0gbmV3IERhdGUoZGF0ZS55ZWFyLCBkYXRlLm1vbnRoIC0gMSwgZGF0ZS5kYXkpO1xyXG4gICAgcmV0dXJuIGZvcm1hdERhdGUoanNEYXRlLCAnZnVsbERhdGUnLCB0aGlzLl9sb2NhbGUpO1xyXG4gIH1cclxufVxyXG4iLCJpbXBvcnQge05nYkNhbGVuZGFyLCBOZ2JQZXJpb2R9IGZyb20gJy4vbmdiLWNhbGVuZGFyJztcclxuaW1wb3J0IHtOZ2JEYXRlfSBmcm9tICcuL25nYi1kYXRlJztcclxuaW1wb3J0IHtOZ2JEYXRlU3RydWN0fSBmcm9tICcuL25nYi1kYXRlLXN0cnVjdCc7XHJcbmltcG9ydCB7RGF0ZXBpY2tlclZpZXdNb2RlbCwgTmdiTWFya0Rpc2FibGVkfSBmcm9tICcuL2RhdGVwaWNrZXItdmlldy1tb2RlbCc7XHJcbmltcG9ydCB7SW5qZWN0YWJsZX0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7aXNJbnRlZ2VyLCB0b0ludGVnZXJ9IGZyb20gJy4uL3V0aWwvdXRpbCc7XHJcbmltcG9ydCB7T2JzZXJ2YWJsZSwgU3ViamVjdH0gZnJvbSAncnhqcyc7XHJcbmltcG9ydCB7XHJcbiAgYnVpbGRNb250aHMsXHJcbiAgY2hlY2tEYXRlSW5SYW5nZSxcclxuICBjaGVja01pbkJlZm9yZU1heCxcclxuICBpc0NoYW5nZWREYXRlLFxyXG4gIGlzRGF0ZVNlbGVjdGFibGUsXHJcbiAgZ2VuZXJhdGVTZWxlY3RCb3hZZWFycyxcclxuICBnZW5lcmF0ZVNlbGVjdEJveE1vbnRocyxcclxuICBwcmV2TW9udGhEaXNhYmxlZCxcclxuICBuZXh0TW9udGhEaXNhYmxlZFxyXG59IGZyb20gJy4vZGF0ZXBpY2tlci10b29scyc7XHJcblxyXG5pbXBvcnQge2ZpbHRlcn0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xyXG5pbXBvcnQge05nYkRhdGVwaWNrZXJJMThufSBmcm9tICcuL2RhdGVwaWNrZXItaTE4bic7XHJcblxyXG5ASW5qZWN0YWJsZSgpXHJcbmV4cG9ydCBjbGFzcyBOZ2JEYXRlcGlja2VyU2VydmljZSB7XHJcbiAgcHJpdmF0ZSBfbW9kZWwkID0gbmV3IFN1YmplY3Q8RGF0ZXBpY2tlclZpZXdNb2RlbD4oKTtcclxuXHJcbiAgcHJpdmF0ZSBfc2VsZWN0JCA9IG5ldyBTdWJqZWN0PE5nYkRhdGU+KCk7XHJcblxyXG4gIHByaXZhdGUgX3N0YXRlOiBEYXRlcGlja2VyVmlld01vZGVsID0ge1xyXG4gICAgZGlzYWJsZWQ6IGZhbHNlLFxyXG4gICAgZGlzcGxheU1vbnRoczogMSxcclxuICAgIGZpcnN0RGF5T2ZXZWVrOiAxLFxyXG4gICAgZm9jdXNWaXNpYmxlOiBmYWxzZSxcclxuICAgIG1vbnRoczogW10sXHJcbiAgICBuYXZpZ2F0aW9uOiAnc2VsZWN0JyxcclxuICAgIG91dHNpZGVEYXlzOiAndmlzaWJsZScsXHJcbiAgICBwcmV2RGlzYWJsZWQ6IGZhbHNlLFxyXG4gICAgbmV4dERpc2FibGVkOiBmYWxzZSxcclxuICAgIHNlbGVjdEJveGVzOiB7eWVhcnM6IFtdLCBtb250aHM6IFtdfSxcclxuICAgIHNlbGVjdGVkRGF0ZTogbnVsbFxyXG4gIH07XHJcblxyXG4gIGdldCBtb2RlbCQoKTogT2JzZXJ2YWJsZTxEYXRlcGlja2VyVmlld01vZGVsPiB7IHJldHVybiB0aGlzLl9tb2RlbCQucGlwZShmaWx0ZXIobW9kZWwgPT4gbW9kZWwubW9udGhzLmxlbmd0aCA+IDApKTsgfVxyXG5cclxuICBnZXQgc2VsZWN0JCgpOiBPYnNlcnZhYmxlPE5nYkRhdGU+IHsgcmV0dXJuIHRoaXMuX3NlbGVjdCQucGlwZShmaWx0ZXIoZGF0ZSA9PiBkYXRlICE9PSBudWxsKSk7IH1cclxuXHJcbiAgc2V0IGRpc2FibGVkKGRpc2FibGVkOiBib29sZWFuKSB7XHJcbiAgICBpZiAodGhpcy5fc3RhdGUuZGlzYWJsZWQgIT09IGRpc2FibGVkKSB7XHJcbiAgICAgIHRoaXMuX25leHRTdGF0ZSh7ZGlzYWJsZWR9KTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHNldCBkaXNwbGF5TW9udGhzKGRpc3BsYXlNb250aHM6IG51bWJlcikge1xyXG4gICAgZGlzcGxheU1vbnRocyA9IHRvSW50ZWdlcihkaXNwbGF5TW9udGhzKTtcclxuICAgIGlmIChpc0ludGVnZXIoZGlzcGxheU1vbnRocykgJiYgZGlzcGxheU1vbnRocyA+IDAgJiYgdGhpcy5fc3RhdGUuZGlzcGxheU1vbnRocyAhPT0gZGlzcGxheU1vbnRocykge1xyXG4gICAgICB0aGlzLl9uZXh0U3RhdGUoe2Rpc3BsYXlNb250aHN9KTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHNldCBmaXJzdERheU9mV2VlayhmaXJzdERheU9mV2VlazogbnVtYmVyKSB7XHJcbiAgICBmaXJzdERheU9mV2VlayA9IHRvSW50ZWdlcihmaXJzdERheU9mV2Vlayk7XHJcbiAgICBpZiAoaXNJbnRlZ2VyKGZpcnN0RGF5T2ZXZWVrKSAmJiBmaXJzdERheU9mV2VlayA+PSAwICYmIHRoaXMuX3N0YXRlLmZpcnN0RGF5T2ZXZWVrICE9PSBmaXJzdERheU9mV2Vlaykge1xyXG4gICAgICB0aGlzLl9uZXh0U3RhdGUoe2ZpcnN0RGF5T2ZXZWVrfSk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBzZXQgZm9jdXNWaXNpYmxlKGZvY3VzVmlzaWJsZTogYm9vbGVhbikge1xyXG4gICAgaWYgKHRoaXMuX3N0YXRlLmZvY3VzVmlzaWJsZSAhPT0gZm9jdXNWaXNpYmxlICYmICF0aGlzLl9zdGF0ZS5kaXNhYmxlZCkge1xyXG4gICAgICB0aGlzLl9uZXh0U3RhdGUoe2ZvY3VzVmlzaWJsZX0pO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgc2V0IG1heERhdGUoZGF0ZTogTmdiRGF0ZSkge1xyXG4gICAgY29uc3QgbWF4RGF0ZSA9IHRoaXMudG9WYWxpZERhdGUoZGF0ZSwgbnVsbCk7XHJcbiAgICBpZiAoaXNDaGFuZ2VkRGF0ZSh0aGlzLl9zdGF0ZS5tYXhEYXRlLCBtYXhEYXRlKSkge1xyXG4gICAgICB0aGlzLl9uZXh0U3RhdGUoe21heERhdGV9KTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHNldCBtYXJrRGlzYWJsZWQobWFya0Rpc2FibGVkOiBOZ2JNYXJrRGlzYWJsZWQpIHtcclxuICAgIGlmICh0aGlzLl9zdGF0ZS5tYXJrRGlzYWJsZWQgIT09IG1hcmtEaXNhYmxlZCkge1xyXG4gICAgICB0aGlzLl9uZXh0U3RhdGUoe21hcmtEaXNhYmxlZH0pO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgc2V0IG1pbkRhdGUoZGF0ZTogTmdiRGF0ZSkge1xyXG4gICAgY29uc3QgbWluRGF0ZSA9IHRoaXMudG9WYWxpZERhdGUoZGF0ZSwgbnVsbCk7XHJcbiAgICBpZiAoaXNDaGFuZ2VkRGF0ZSh0aGlzLl9zdGF0ZS5taW5EYXRlLCBtaW5EYXRlKSkge1xyXG4gICAgICB0aGlzLl9uZXh0U3RhdGUoe21pbkRhdGV9KTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHNldCBuYXZpZ2F0aW9uKG5hdmlnYXRpb246ICdzZWxlY3QnIHwgJ2Fycm93cycgfCAnbm9uZScpIHtcclxuICAgIGlmICh0aGlzLl9zdGF0ZS5uYXZpZ2F0aW9uICE9PSBuYXZpZ2F0aW9uKSB7XHJcbiAgICAgIHRoaXMuX25leHRTdGF0ZSh7bmF2aWdhdGlvbn0pO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgc2V0IG91dHNpZGVEYXlzKG91dHNpZGVEYXlzOiAndmlzaWJsZScgfCAnY29sbGFwc2VkJyB8ICdoaWRkZW4nKSB7XHJcbiAgICBpZiAodGhpcy5fc3RhdGUub3V0c2lkZURheXMgIT09IG91dHNpZGVEYXlzKSB7XHJcbiAgICAgIHRoaXMuX25leHRTdGF0ZSh7b3V0c2lkZURheXN9KTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgX2NhbGVuZGFyOiBOZ2JDYWxlbmRhciwgcHJpdmF0ZSBfaTE4bjogTmdiRGF0ZXBpY2tlckkxOG4pIHt9XHJcblxyXG4gIGZvY3VzKGRhdGU6IE5nYkRhdGUpIHtcclxuICAgIGlmICghdGhpcy5fc3RhdGUuZGlzYWJsZWQgJiYgdGhpcy5fY2FsZW5kYXIuaXNWYWxpZChkYXRlKSAmJiBpc0NoYW5nZWREYXRlKHRoaXMuX3N0YXRlLmZvY3VzRGF0ZSwgZGF0ZSkpIHtcclxuICAgICAgdGhpcy5fbmV4dFN0YXRlKHtmb2N1c0RhdGU6IGRhdGV9KTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIGZvY3VzTW92ZShwZXJpb2Q/OiBOZ2JQZXJpb2QsIG51bWJlcj86IG51bWJlcikge1xyXG4gICAgdGhpcy5mb2N1cyh0aGlzLl9jYWxlbmRhci5nZXROZXh0KHRoaXMuX3N0YXRlLmZvY3VzRGF0ZSwgcGVyaW9kLCBudW1iZXIpKTtcclxuICB9XHJcblxyXG4gIGZvY3VzU2VsZWN0KCkge1xyXG4gICAgaWYgKGlzRGF0ZVNlbGVjdGFibGUodGhpcy5fc3RhdGUuZm9jdXNEYXRlLCB0aGlzLl9zdGF0ZSkpIHtcclxuICAgICAgdGhpcy5zZWxlY3QodGhpcy5fc3RhdGUuZm9jdXNEYXRlLCB7ZW1pdEV2ZW50OiB0cnVlfSk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBvcGVuKGRhdGU6IE5nYkRhdGUpIHtcclxuICAgIGNvbnN0IGZpcnN0RGF0ZSA9IHRoaXMudG9WYWxpZERhdGUoZGF0ZSwgdGhpcy5fY2FsZW5kYXIuZ2V0VG9kYXkoKSk7XHJcbiAgICBpZiAoIXRoaXMuX3N0YXRlLmRpc2FibGVkKSB7XHJcbiAgICAgIHRoaXMuX25leHRTdGF0ZSh7Zmlyc3REYXRlfSk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBzZWxlY3QoZGF0ZTogTmdiRGF0ZSwgb3B0aW9uczoge2VtaXRFdmVudD86IGJvb2xlYW59ID0ge30pIHtcclxuICAgIGNvbnN0IHNlbGVjdGVkRGF0ZSA9IHRoaXMudG9WYWxpZERhdGUoZGF0ZSwgbnVsbCk7XHJcbiAgICBpZiAoIXRoaXMuX3N0YXRlLmRpc2FibGVkKSB7XHJcbiAgICAgIGlmIChpc0NoYW5nZWREYXRlKHRoaXMuX3N0YXRlLnNlbGVjdGVkRGF0ZSwgc2VsZWN0ZWREYXRlKSkge1xyXG4gICAgICAgIHRoaXMuX25leHRTdGF0ZSh7c2VsZWN0ZWREYXRlfSk7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGlmIChvcHRpb25zLmVtaXRFdmVudCAmJiBpc0RhdGVTZWxlY3RhYmxlKHNlbGVjdGVkRGF0ZSwgdGhpcy5fc3RhdGUpKSB7XHJcbiAgICAgICAgdGhpcy5fc2VsZWN0JC5uZXh0KHNlbGVjdGVkRGF0ZSk7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9XHJcblxyXG4gIHRvVmFsaWREYXRlKGRhdGU6IE5nYkRhdGVTdHJ1Y3QsIGRlZmF1bHRWYWx1ZT86IE5nYkRhdGUpOiBOZ2JEYXRlIHtcclxuICAgIGNvbnN0IG5nYkRhdGUgPSBOZ2JEYXRlLmZyb20oZGF0ZSk7XHJcbiAgICBpZiAoZGVmYXVsdFZhbHVlID09PSB1bmRlZmluZWQpIHtcclxuICAgICAgZGVmYXVsdFZhbHVlID0gdGhpcy5fY2FsZW5kYXIuZ2V0VG9kYXkoKTtcclxuICAgIH1cclxuICAgIHJldHVybiB0aGlzLl9jYWxlbmRhci5pc1ZhbGlkKG5nYkRhdGUpID8gbmdiRGF0ZSA6IGRlZmF1bHRWYWx1ZTtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgX25leHRTdGF0ZShwYXRjaDogUGFydGlhbDxEYXRlcGlja2VyVmlld01vZGVsPikge1xyXG4gICAgY29uc3QgbmV3U3RhdGUgPSB0aGlzLl91cGRhdGVTdGF0ZShwYXRjaCk7XHJcbiAgICB0aGlzLl9wYXRjaENvbnRleHRzKG5ld1N0YXRlKTtcclxuICAgIHRoaXMuX3N0YXRlID0gbmV3U3RhdGU7XHJcbiAgICB0aGlzLl9tb2RlbCQubmV4dCh0aGlzLl9zdGF0ZSk7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIF9wYXRjaENvbnRleHRzKHN0YXRlOiBEYXRlcGlja2VyVmlld01vZGVsKSB7XHJcbiAgICBjb25zdCB7bW9udGhzLCBkaXNwbGF5TW9udGhzLCBzZWxlY3RlZERhdGUsIGZvY3VzRGF0ZSwgZm9jdXNWaXNpYmxlLCBkaXNhYmxlZCwgb3V0c2lkZURheXN9ID0gc3RhdGU7XHJcbiAgICBzdGF0ZS5tb250aHMuZm9yRWFjaChtb250aCA9PiB7XHJcbiAgICAgIG1vbnRoLndlZWtzLmZvckVhY2god2VlayA9PiB7XHJcbiAgICAgICAgd2Vlay5kYXlzLmZvckVhY2goZGF5ID0+IHtcclxuXHJcbiAgICAgICAgICAvLyBwYXRjaCBmb2N1cyBmbGFnXHJcbiAgICAgICAgICBpZiAoZm9jdXNEYXRlKSB7XHJcbiAgICAgICAgICAgIGRheS5jb250ZXh0LmZvY3VzZWQgPSBmb2N1c0RhdGUuZXF1YWxzKGRheS5kYXRlKSAmJiBmb2N1c1Zpc2libGU7XHJcbiAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgLy8gY2FsY3VsYXRpbmcgdGFiaW5kZXhcclxuICAgICAgICAgIGRheS50YWJpbmRleCA9ICFkaXNhYmxlZCAmJiBkYXkuZGF0ZS5lcXVhbHMoZm9jdXNEYXRlKSAmJiBmb2N1c0RhdGUubW9udGggPT09IG1vbnRoLm51bWJlciA/IDAgOiAtMTtcclxuXHJcbiAgICAgICAgICAvLyBvdmVycmlkZSBjb250ZXh0IGRpc2FibGVkXHJcbiAgICAgICAgICBpZiAoZGlzYWJsZWQgPT09IHRydWUpIHtcclxuICAgICAgICAgICAgZGF5LmNvbnRleHQuZGlzYWJsZWQgPSB0cnVlO1xyXG4gICAgICAgICAgfVxyXG5cclxuICAgICAgICAgIC8vIHBhdGNoIHNlbGVjdGlvbiBmbGFnXHJcbiAgICAgICAgICBpZiAoc2VsZWN0ZWREYXRlICE9PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgZGF5LmNvbnRleHQuc2VsZWN0ZWQgPSBzZWxlY3RlZERhdGUgIT09IG51bGwgJiYgc2VsZWN0ZWREYXRlLmVxdWFscyhkYXkuZGF0ZSk7XHJcbiAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgLy8gdmlzaWJpbGl0eVxyXG4gICAgICAgICAgaWYgKG1vbnRoLm51bWJlciAhPT0gZGF5LmRhdGUubW9udGgpIHtcclxuICAgICAgICAgICAgZGF5LmhpZGRlbiA9IG91dHNpZGVEYXlzID09PSAnaGlkZGVuJyB8fCBvdXRzaWRlRGF5cyA9PT0gJ2NvbGxhcHNlZCcgfHxcclxuICAgICAgICAgICAgICAgIChkaXNwbGF5TW9udGhzID4gMSAmJiBkYXkuZGF0ZS5hZnRlcihtb250aHNbMF0uZmlyc3REYXRlKSAmJlxyXG4gICAgICAgICAgICAgICAgIGRheS5kYXRlLmJlZm9yZShtb250aHNbZGlzcGxheU1vbnRocyAtIDFdLmxhc3REYXRlKSk7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICAgIH0pO1xyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIF91cGRhdGVTdGF0ZShwYXRjaDogUGFydGlhbDxEYXRlcGlja2VyVmlld01vZGVsPik6IERhdGVwaWNrZXJWaWV3TW9kZWwge1xyXG4gICAgLy8gcGF0Y2hpbmcgZmllbGRzXHJcbiAgICBjb25zdCBzdGF0ZSA9IE9iamVjdC5hc3NpZ24oe30sIHRoaXMuX3N0YXRlLCBwYXRjaCk7XHJcblxyXG4gICAgbGV0IHN0YXJ0RGF0ZSA9IHN0YXRlLmZpcnN0RGF0ZTtcclxuXHJcbiAgICAvLyBtaW4vbWF4IGRhdGVzIGNoYW5nZWRcclxuICAgIGlmICgnbWluRGF0ZScgaW4gcGF0Y2ggfHwgJ21heERhdGUnIGluIHBhdGNoKSB7XHJcbiAgICAgIGNoZWNrTWluQmVmb3JlTWF4KHN0YXRlLm1pbkRhdGUsIHN0YXRlLm1heERhdGUpO1xyXG4gICAgICBzdGF0ZS5mb2N1c0RhdGUgPSBjaGVja0RhdGVJblJhbmdlKHN0YXRlLmZvY3VzRGF0ZSwgc3RhdGUubWluRGF0ZSwgc3RhdGUubWF4RGF0ZSk7XHJcbiAgICAgIHN0YXRlLmZpcnN0RGF0ZSA9IGNoZWNrRGF0ZUluUmFuZ2Uoc3RhdGUuZmlyc3REYXRlLCBzdGF0ZS5taW5EYXRlLCBzdGF0ZS5tYXhEYXRlKTtcclxuICAgICAgc3RhcnREYXRlID0gc3RhdGUuZm9jdXNEYXRlO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIGRpc2FibGVkXHJcbiAgICBpZiAoJ2Rpc2FibGVkJyBpbiBwYXRjaCkge1xyXG4gICAgICBzdGF0ZS5mb2N1c1Zpc2libGUgPSBmYWxzZTtcclxuICAgIH1cclxuXHJcbiAgICAvLyBpbml0aWFsIHJlYnVpbGQgdmlhICdzZWxlY3QoKSdcclxuICAgIGlmICgnc2VsZWN0ZWREYXRlJyBpbiBwYXRjaCAmJiB0aGlzLl9zdGF0ZS5tb250aHMubGVuZ3RoID09PSAwKSB7XHJcbiAgICAgIHN0YXJ0RGF0ZSA9IHN0YXRlLnNlbGVjdGVkRGF0ZTtcclxuICAgIH1cclxuXHJcbiAgICAvLyBmb2N1cyBkYXRlIGNoYW5nZWRcclxuICAgIGlmICgnZm9jdXNEYXRlJyBpbiBwYXRjaCkge1xyXG4gICAgICBzdGF0ZS5mb2N1c0RhdGUgPSBjaGVja0RhdGVJblJhbmdlKHN0YXRlLmZvY3VzRGF0ZSwgc3RhdGUubWluRGF0ZSwgc3RhdGUubWF4RGF0ZSk7XHJcbiAgICAgIHN0YXJ0RGF0ZSA9IHN0YXRlLmZvY3VzRGF0ZTtcclxuXHJcbiAgICAgIC8vIG5vdGhpbmcgdG8gcmVidWlsZCBpZiBvbmx5IGZvY3VzIGNoYW5nZWQgYW5kIGl0IGlzIHN0aWxsIHZpc2libGVcclxuICAgICAgaWYgKHN0YXRlLm1vbnRocy5sZW5ndGggIT09IDAgJiYgIXN0YXRlLmZvY3VzRGF0ZS5iZWZvcmUoc3RhdGUuZmlyc3REYXRlKSAmJlxyXG4gICAgICAgICAgIXN0YXRlLmZvY3VzRGF0ZS5hZnRlcihzdGF0ZS5sYXN0RGF0ZSkpIHtcclxuICAgICAgICByZXR1cm4gc3RhdGU7XHJcbiAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvLyBmaXJzdCBkYXRlIGNoYW5nZWRcclxuICAgIGlmICgnZmlyc3REYXRlJyBpbiBwYXRjaCkge1xyXG4gICAgICBzdGF0ZS5maXJzdERhdGUgPSBjaGVja0RhdGVJblJhbmdlKHN0YXRlLmZpcnN0RGF0ZSwgc3RhdGUubWluRGF0ZSwgc3RhdGUubWF4RGF0ZSk7XHJcbiAgICAgIHN0YXJ0RGF0ZSA9IHN0YXRlLmZpcnN0RGF0ZTtcclxuICAgIH1cclxuXHJcbiAgICAvLyByZWJ1aWxkaW5nIG1vbnRoc1xyXG4gICAgaWYgKHN0YXJ0RGF0ZSkge1xyXG4gICAgICBjb25zdCBmb3JjZVJlYnVpbGQgPSAnZmlyc3REYXlPZldlZWsnIGluIHBhdGNoIHx8ICdtYXJrRGlzYWJsZWQnIGluIHBhdGNoIHx8ICdtaW5EYXRlJyBpbiBwYXRjaCB8fFxyXG4gICAgICAgICAgJ21heERhdGUnIGluIHBhdGNoIHx8ICdkaXNhYmxlZCcgaW4gcGF0Y2ggfHwgJ291dHNpZGVEYXlzJyBpbiBwYXRjaDtcclxuXHJcbiAgICAgIGNvbnN0IG1vbnRocyA9IGJ1aWxkTW9udGhzKHRoaXMuX2NhbGVuZGFyLCBzdGFydERhdGUsIHN0YXRlLCB0aGlzLl9pMThuLCBmb3JjZVJlYnVpbGQpO1xyXG5cclxuICAgICAgLy8gdXBkYXRpbmcgbW9udGhzIGFuZCBib3VuZGFyeSBkYXRlc1xyXG4gICAgICBzdGF0ZS5tb250aHMgPSBtb250aHM7XHJcbiAgICAgIHN0YXRlLmZpcnN0RGF0ZSA9IG1vbnRocy5sZW5ndGggPiAwID8gbW9udGhzWzBdLmZpcnN0RGF0ZSA6IHVuZGVmaW5lZDtcclxuICAgICAgc3RhdGUubGFzdERhdGUgPSBtb250aHMubGVuZ3RoID4gMCA/IG1vbnRoc1ttb250aHMubGVuZ3RoIC0gMV0ubGFzdERhdGUgOiB1bmRlZmluZWQ7XHJcblxyXG4gICAgICAvLyByZXNldCBzZWxlY3RlZCBkYXRlIGlmICdtYXJrRGlzYWJsZWQnIHJldHVybnMgdHJ1ZVxyXG4gICAgICBpZiAoJ3NlbGVjdGVkRGF0ZScgaW4gcGF0Y2ggJiYgIWlzRGF0ZVNlbGVjdGFibGUoc3RhdGUuc2VsZWN0ZWREYXRlLCBzdGF0ZSkpIHtcclxuICAgICAgICBzdGF0ZS5zZWxlY3RlZERhdGUgPSBudWxsO1xyXG4gICAgICB9XHJcblxyXG4gICAgICAvLyBhZGp1c3RpbmcgZm9jdXMgYWZ0ZXIgbW9udGhzIHdlcmUgYnVpbHRcclxuICAgICAgaWYgKCdmaXJzdERhdGUnIGluIHBhdGNoKSB7XHJcbiAgICAgICAgaWYgKHN0YXRlLmZvY3VzRGF0ZSA9PT0gdW5kZWZpbmVkIHx8IHN0YXRlLmZvY3VzRGF0ZS5iZWZvcmUoc3RhdGUuZmlyc3REYXRlKSB8fFxyXG4gICAgICAgICAgICBzdGF0ZS5mb2N1c0RhdGUuYWZ0ZXIoc3RhdGUubGFzdERhdGUpKSB7XHJcbiAgICAgICAgICBzdGF0ZS5mb2N1c0RhdGUgPSBzdGFydERhdGU7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcblxyXG4gICAgICAvLyBhZGp1c3RpbmcgbW9udGhzL3llYXJzIGZvciB0aGUgc2VsZWN0IGJveCBuYXZpZ2F0aW9uXHJcbiAgICAgIGNvbnN0IHllYXJDaGFuZ2VkID0gIXRoaXMuX3N0YXRlLmZpcnN0RGF0ZSB8fCB0aGlzLl9zdGF0ZS5maXJzdERhdGUueWVhciAhPT0gc3RhdGUuZmlyc3REYXRlLnllYXI7XHJcbiAgICAgIGNvbnN0IG1vbnRoQ2hhbmdlZCA9ICF0aGlzLl9zdGF0ZS5maXJzdERhdGUgfHwgdGhpcy5fc3RhdGUuZmlyc3REYXRlLm1vbnRoICE9PSBzdGF0ZS5maXJzdERhdGUubW9udGg7XHJcbiAgICAgIGlmIChzdGF0ZS5uYXZpZ2F0aW9uID09PSAnc2VsZWN0Jykge1xyXG4gICAgICAgIC8vIHllYXJzIC0+ICBib3VuZGFyaWVzIChtaW4vbWF4IHdlcmUgY2hhbmdlZClcclxuICAgICAgICBpZiAoJ21pbkRhdGUnIGluIHBhdGNoIHx8ICdtYXhEYXRlJyBpbiBwYXRjaCB8fCBzdGF0ZS5zZWxlY3RCb3hlcy55ZWFycy5sZW5ndGggPT09IDAgfHwgeWVhckNoYW5nZWQpIHtcclxuICAgICAgICAgIHN0YXRlLnNlbGVjdEJveGVzLnllYXJzID0gZ2VuZXJhdGVTZWxlY3RCb3hZZWFycyhzdGF0ZS5maXJzdERhdGUsIHN0YXRlLm1pbkRhdGUsIHN0YXRlLm1heERhdGUpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8gbW9udGhzIC0+IHdoZW4gY3VycmVudCB5ZWFyIG9yIGJvdW5kYXJpZXMgY2hhbmdlXHJcbiAgICAgICAgaWYgKCdtaW5EYXRlJyBpbiBwYXRjaCB8fCAnbWF4RGF0ZScgaW4gcGF0Y2ggfHwgc3RhdGUuc2VsZWN0Qm94ZXMubW9udGhzLmxlbmd0aCA9PT0gMCB8fCB5ZWFyQ2hhbmdlZCkge1xyXG4gICAgICAgICAgc3RhdGUuc2VsZWN0Qm94ZXMubW9udGhzID1cclxuICAgICAgICAgICAgICBnZW5lcmF0ZVNlbGVjdEJveE1vbnRocyh0aGlzLl9jYWxlbmRhciwgc3RhdGUuZmlyc3REYXRlLCBzdGF0ZS5taW5EYXRlLCBzdGF0ZS5tYXhEYXRlKTtcclxuICAgICAgICB9XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgc3RhdGUuc2VsZWN0Qm94ZXMgPSB7eWVhcnM6IFtdLCBtb250aHM6IFtdfTtcclxuICAgICAgfVxyXG5cclxuICAgICAgLy8gdXBkYXRpbmcgbmF2aWdhdGlvbiBhcnJvd3MgLT4gYm91bmRhcmllcyBjaGFuZ2UgKG1pbi9tYXgpIG9yIG1vbnRoL3llYXIgY2hhbmdlc1xyXG4gICAgICBpZiAoKHN0YXRlLm5hdmlnYXRpb24gPT09ICdhcnJvd3MnIHx8IHN0YXRlLm5hdmlnYXRpb24gPT09ICdzZWxlY3QnKSAmJlxyXG4gICAgICAgICAgKG1vbnRoQ2hhbmdlZCB8fCB5ZWFyQ2hhbmdlZCB8fCAnbWluRGF0ZScgaW4gcGF0Y2ggfHwgJ21heERhdGUnIGluIHBhdGNoIHx8ICdkaXNhYmxlZCcgaW4gcGF0Y2gpKSB7XHJcbiAgICAgICAgc3RhdGUucHJldkRpc2FibGVkID0gc3RhdGUuZGlzYWJsZWQgfHwgcHJldk1vbnRoRGlzYWJsZWQodGhpcy5fY2FsZW5kYXIsIHN0YXRlLmZpcnN0RGF0ZSwgc3RhdGUubWluRGF0ZSk7XHJcbiAgICAgICAgc3RhdGUubmV4dERpc2FibGVkID0gc3RhdGUuZGlzYWJsZWQgfHwgbmV4dE1vbnRoRGlzYWJsZWQodGhpcy5fY2FsZW5kYXIsIHN0YXRlLmxhc3REYXRlLCBzdGF0ZS5tYXhEYXRlKTtcclxuICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiBzdGF0ZTtcclxuICB9XHJcbn1cclxuIiwiZXhwb3J0IGVudW0gS2V5IHtcclxuICBUYWIgPSA5LFxyXG4gIEVudGVyID0gMTMsXHJcbiAgRXNjYXBlID0gMjcsXHJcbiAgU3BhY2UgPSAzMixcclxuICBQYWdlVXAgPSAzMyxcclxuICBQYWdlRG93biA9IDM0LFxyXG4gIEVuZCA9IDM1LFxyXG4gIEhvbWUgPSAzNixcclxuICBBcnJvd0xlZnQgPSAzNyxcclxuICBBcnJvd1VwID0gMzgsXHJcbiAgQXJyb3dSaWdodCA9IDM5LFxyXG4gIEFycm93RG93biA9IDQwXHJcbn1cclxuIiwiaW1wb3J0IHtJbmplY3RhYmxlfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHtOZ2JEYXRlcGlja2VyU2VydmljZX0gZnJvbSAnLi9kYXRlcGlja2VyLXNlcnZpY2UnO1xyXG5pbXBvcnQge05nYkNhbGVuZGFyfSBmcm9tICcuL25nYi1jYWxlbmRhcic7XHJcbmltcG9ydCB7dG9TdHJpbmd9IGZyb20gJy4uL3V0aWwvdXRpbCc7XHJcbmltcG9ydCB7S2V5fSBmcm9tICcuLi91dGlsL2tleSc7XHJcbmltcG9ydCB7TmdiRGF0ZX0gZnJvbSAnLi9uZ2ItZGF0ZSc7XHJcblxyXG5ASW5qZWN0YWJsZSgpXHJcbmV4cG9ydCBjbGFzcyBOZ2JEYXRlcGlja2VyS2V5TWFwU2VydmljZSB7XHJcbiAgcHJpdmF0ZSBfbWluRGF0ZTogTmdiRGF0ZTtcclxuICBwcml2YXRlIF9tYXhEYXRlOiBOZ2JEYXRlO1xyXG4gIHByaXZhdGUgX2ZpcnN0Vmlld0RhdGU6IE5nYkRhdGU7XHJcbiAgcHJpdmF0ZSBfbGFzdFZpZXdEYXRlOiBOZ2JEYXRlO1xyXG5cclxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIF9zZXJ2aWNlOiBOZ2JEYXRlcGlja2VyU2VydmljZSwgcHJpdmF0ZSBfY2FsZW5kYXI6IE5nYkNhbGVuZGFyKSB7XHJcbiAgICBfc2VydmljZS5tb2RlbCQuc3Vic2NyaWJlKG1vZGVsID0+IHtcclxuICAgICAgdGhpcy5fbWluRGF0ZSA9IG1vZGVsLm1pbkRhdGU7XHJcbiAgICAgIHRoaXMuX21heERhdGUgPSBtb2RlbC5tYXhEYXRlO1xyXG4gICAgICB0aGlzLl9maXJzdFZpZXdEYXRlID0gbW9kZWwuZmlyc3REYXRlO1xyXG4gICAgICB0aGlzLl9sYXN0Vmlld0RhdGUgPSBtb2RlbC5sYXN0RGF0ZTtcclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgcHJvY2Vzc0tleShldmVudDogS2V5Ym9hcmRFdmVudCkge1xyXG4gICAgaWYgKEtleVt0b1N0cmluZyhldmVudC53aGljaCldKSB7XHJcbiAgICAgIHN3aXRjaCAoZXZlbnQud2hpY2gpIHtcclxuICAgICAgICBjYXNlIEtleS5QYWdlVXA6XHJcbiAgICAgICAgICB0aGlzLl9zZXJ2aWNlLmZvY3VzTW92ZShldmVudC5zaGlmdEtleSA/ICd5JyA6ICdtJywgLTEpO1xyXG4gICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgY2FzZSBLZXkuUGFnZURvd246XHJcbiAgICAgICAgICB0aGlzLl9zZXJ2aWNlLmZvY3VzTW92ZShldmVudC5zaGlmdEtleSA/ICd5JyA6ICdtJywgMSk7XHJcbiAgICAgICAgICBicmVhaztcclxuICAgICAgICBjYXNlIEtleS5FbmQ6XHJcbiAgICAgICAgICB0aGlzLl9zZXJ2aWNlLmZvY3VzKGV2ZW50LnNoaWZ0S2V5ID8gdGhpcy5fbWF4RGF0ZSA6IHRoaXMuX2xhc3RWaWV3RGF0ZSk7XHJcbiAgICAgICAgICBicmVhaztcclxuICAgICAgICBjYXNlIEtleS5Ib21lOlxyXG4gICAgICAgICAgdGhpcy5fc2VydmljZS5mb2N1cyhldmVudC5zaGlmdEtleSA/IHRoaXMuX21pbkRhdGUgOiB0aGlzLl9maXJzdFZpZXdEYXRlKTtcclxuICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIGNhc2UgS2V5LkFycm93TGVmdDpcclxuICAgICAgICAgIHRoaXMuX3NlcnZpY2UuZm9jdXNNb3ZlKCdkJywgLTEpO1xyXG4gICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgY2FzZSBLZXkuQXJyb3dVcDpcclxuICAgICAgICAgIHRoaXMuX3NlcnZpY2UuZm9jdXNNb3ZlKCdkJywgLXRoaXMuX2NhbGVuZGFyLmdldERheXNQZXJXZWVrKCkpO1xyXG4gICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgY2FzZSBLZXkuQXJyb3dSaWdodDpcclxuICAgICAgICAgIHRoaXMuX3NlcnZpY2UuZm9jdXNNb3ZlKCdkJywgMSk7XHJcbiAgICAgICAgICBicmVhaztcclxuICAgICAgICBjYXNlIEtleS5BcnJvd0Rvd246XHJcbiAgICAgICAgICB0aGlzLl9zZXJ2aWNlLmZvY3VzTW92ZSgnZCcsIHRoaXMuX2NhbGVuZGFyLmdldERheXNQZXJXZWVrKCkpO1xyXG4gICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgY2FzZSBLZXkuRW50ZXI6XHJcbiAgICAgICAgY2FzZSBLZXkuU3BhY2U6XHJcbiAgICAgICAgICB0aGlzLl9zZXJ2aWNlLmZvY3VzU2VsZWN0KCk7XHJcbiAgICAgICAgICBicmVhaztcclxuICAgICAgICBkZWZhdWx0OlxyXG4gICAgICAgICAgcmV0dXJuO1xyXG4gICAgICB9XHJcblxyXG4gICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcclxuICAgIH1cclxuICB9XHJcbn1cclxuIiwiaW1wb3J0IHtOZ2JEYXRlfSBmcm9tICcuL25nYi1kYXRlJztcclxuaW1wb3J0IHtOZ2JEYXRlU3RydWN0fSBmcm9tICcuL25nYi1kYXRlLXN0cnVjdCc7XHJcbmltcG9ydCB7RGF5VGVtcGxhdGVDb250ZXh0fSBmcm9tICcuL2RhdGVwaWNrZXItZGF5LXRlbXBsYXRlLWNvbnRleHQnO1xyXG5cclxuZXhwb3J0IHR5cGUgTmdiTWFya0Rpc2FibGVkID0gKGRhdGU6IE5nYkRhdGVTdHJ1Y3QsIGN1cnJlbnQ6IHt5ZWFyOiBudW1iZXIsIG1vbnRoOiBudW1iZXJ9KSA9PiBib29sZWFuO1xyXG5cclxuZXhwb3J0IHR5cGUgRGF5Vmlld01vZGVsID0ge1xyXG4gIGRhdGU6IE5nYkRhdGUsXHJcbiAgY29udGV4dDogRGF5VGVtcGxhdGVDb250ZXh0LFxyXG4gIHRhYmluZGV4OiBudW1iZXIsXHJcbiAgYXJpYUxhYmVsOiBzdHJpbmcsXHJcbiAgaGlkZGVuOiBib29sZWFuXHJcbn07XHJcblxyXG5leHBvcnQgdHlwZSBXZWVrVmlld01vZGVsID0ge1xyXG4gIG51bWJlcjogbnVtYmVyLFxyXG4gIGRheXM6IERheVZpZXdNb2RlbFtdLFxyXG4gIGNvbGxhcHNlZDogYm9vbGVhblxyXG59O1xyXG5cclxuZXhwb3J0IHR5cGUgTW9udGhWaWV3TW9kZWwgPSB7XHJcbiAgZmlyc3REYXRlOiBOZ2JEYXRlLFxyXG4gIGxhc3REYXRlOiBOZ2JEYXRlLFxyXG4gIG51bWJlcjogbnVtYmVyLFxyXG4gIHllYXI6IG51bWJlcixcclxuICB3ZWVrczogV2Vla1ZpZXdNb2RlbFtdLFxyXG4gIHdlZWtkYXlzOiBudW1iZXJbXVxyXG59O1xyXG5cclxuLy8gY2xhbmctZm9ybWF0IG9mZlxyXG5leHBvcnQgdHlwZSBEYXRlcGlja2VyVmlld01vZGVsID0ge1xyXG4gIGRpc2FibGVkOiBib29sZWFuLFxyXG4gIGRpc3BsYXlNb250aHM6IG51bWJlcixcclxuICBmaXJzdERhdGU/OiBOZ2JEYXRlLFxyXG4gIGZpcnN0RGF5T2ZXZWVrOiBudW1iZXIsXHJcbiAgZm9jdXNEYXRlPzogTmdiRGF0ZSxcclxuICBmb2N1c1Zpc2libGU6IGJvb2xlYW4sXHJcbiAgbGFzdERhdGU/OiBOZ2JEYXRlLFxyXG4gIG1hcmtEaXNhYmxlZD86IE5nYk1hcmtEaXNhYmxlZCxcclxuICBtYXhEYXRlPzogTmdiRGF0ZSxcclxuICBtaW5EYXRlPzogTmdiRGF0ZSxcclxuICBtb250aHM6IE1vbnRoVmlld01vZGVsW10sXHJcbiAgbmF2aWdhdGlvbjogJ3NlbGVjdCcgfCAnYXJyb3dzJyB8ICdub25lJyxcclxuICBvdXRzaWRlRGF5czogJ3Zpc2libGUnIHwgJ2NvbGxhcHNlZCcgfCAnaGlkZGVuJyxcclxuICBwcmV2RGlzYWJsZWQ6IGJvb2xlYW4sXHJcbiAgbmV4dERpc2FibGVkOiBib29sZWFuLFxyXG4gIHNlbGVjdEJveGVzOiB7XHJcbiAgICB5ZWFyczogbnVtYmVyW10sXHJcbiAgICBtb250aHM6IG51bWJlcltdXHJcbiAgfSxcclxuICBzZWxlY3RlZERhdGU6IE5nYkRhdGVcclxufTtcclxuLy8gY2xhbmctZm9ybWF0IG9uXHJcblxyXG5leHBvcnQgZW51bSBOYXZpZ2F0aW9uRXZlbnQge1xyXG4gIFBSRVYsXHJcbiAgTkVYVFxyXG59XHJcbiIsImltcG9ydCB7SW5qZWN0YWJsZSwgVGVtcGxhdGVSZWZ9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQge0RheVRlbXBsYXRlQ29udGV4dH0gZnJvbSAnLi9kYXRlcGlja2VyLWRheS10ZW1wbGF0ZS1jb250ZXh0JztcclxuaW1wb3J0IHtOZ2JEYXRlU3RydWN0fSBmcm9tICcuL25nYi1kYXRlLXN0cnVjdCc7XHJcblxyXG4vKipcclxuICogQ29uZmlndXJhdGlvbiBzZXJ2aWNlIGZvciB0aGUgTmdiRGF0ZXBpY2tlciBjb21wb25lbnQuXHJcbiAqIFlvdSBjYW4gaW5qZWN0IHRoaXMgc2VydmljZSwgdHlwaWNhbGx5IGluIHlvdXIgcm9vdCBjb21wb25lbnQsIGFuZCBjdXN0b21pemUgdGhlIHZhbHVlcyBvZiBpdHMgcHJvcGVydGllcyBpblxyXG4gKiBvcmRlciB0byBwcm92aWRlIGRlZmF1bHQgdmFsdWVzIGZvciBhbGwgdGhlIGRhdGVwaWNrZXJzIHVzZWQgaW4gdGhlIGFwcGxpY2F0aW9uLlxyXG4gKi9cclxuQEluamVjdGFibGUoe3Byb3ZpZGVkSW46ICdyb290J30pXHJcbmV4cG9ydCBjbGFzcyBOZ2JEYXRlcGlja2VyQ29uZmlnIHtcclxuICBkYXlUZW1wbGF0ZTogVGVtcGxhdGVSZWY8RGF5VGVtcGxhdGVDb250ZXh0PjtcclxuICBkaXNwbGF5TW9udGhzID0gMTtcclxuICBmaXJzdERheU9mV2VlayA9IDE7XHJcbiAgbWFya0Rpc2FibGVkOiAoZGF0ZTogTmdiRGF0ZVN0cnVjdCwgY3VycmVudDoge3llYXI6IG51bWJlciwgbW9udGg6IG51bWJlcn0pID0+IGJvb2xlYW47XHJcbiAgbWluRGF0ZTogTmdiRGF0ZVN0cnVjdDtcclxuICBtYXhEYXRlOiBOZ2JEYXRlU3RydWN0O1xyXG4gIG5hdmlnYXRpb246ICdzZWxlY3QnIHwgJ2Fycm93cycgfCAnbm9uZScgPSAnc2VsZWN0JztcclxuICBvdXRzaWRlRGF5czogJ3Zpc2libGUnIHwgJ2NvbGxhcHNlZCcgfCAnaGlkZGVuJyA9ICd2aXNpYmxlJztcclxuICBzaG93V2Vla2RheXMgPSB0cnVlO1xyXG4gIHNob3dXZWVrTnVtYmVycyA9IGZhbHNlO1xyXG4gIHN0YXJ0RGF0ZToge3llYXI6IG51bWJlciwgbW9udGg6IG51bWJlcn07XHJcbn1cclxuIiwiaW1wb3J0IHtJbmplY3RhYmxlfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHtOZ2JEYXRlU3RydWN0fSBmcm9tICcuLi9uZ2ItZGF0ZS1zdHJ1Y3QnO1xyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIE5HQl9EQVRFUElDS0VSX0RBVEVfQURBUFRFUl9GQUNUT1JZKCkge1xyXG4gIHJldHVybiBuZXcgTmdiRGF0ZVN0cnVjdEFkYXB0ZXIoKTtcclxufVxyXG5cclxuLyoqXHJcbiAqIEFic3RyYWN0IHR5cGUgc2VydmluZyBhcyBhIERJIHRva2VuIGZvciB0aGUgc2VydmljZSBjb252ZXJ0aW5nIGZyb20geW91ciBhcHBsaWNhdGlvbiBEYXRlIG1vZGVsIHRvIGludGVybmFsXHJcbiAqIE5nYkRhdGVTdHJ1Y3QgbW9kZWwuXHJcbiAqIEEgZGVmYXVsdCBpbXBsZW1lbnRhdGlvbiBjb252ZXJ0aW5nIGZyb20gYW5kIHRvIE5nYkRhdGVTdHJ1Y3QgaXMgcHJvdmlkZWQgZm9yIHJldHJvLWNvbXBhdGliaWxpdHksXHJcbiAqIGJ1dCB5b3UgY2FuIHByb3ZpZGUgYW5vdGhlciBpbXBsZW1lbnRhdGlvbiB0byB1c2UgYW4gYWx0ZXJuYXRpdmUgZm9ybWF0LCBpZSBmb3IgdXNpbmcgd2l0aCBuYXRpdmUgRGF0ZSBPYmplY3QuXHJcbiAqL1xyXG5ASW5qZWN0YWJsZSh7cHJvdmlkZWRJbjogJ3Jvb3QnLCB1c2VGYWN0b3J5OiBOR0JfREFURVBJQ0tFUl9EQVRFX0FEQVBURVJfRkFDVE9SWX0pXHJcbmV4cG9ydCBhYnN0cmFjdCBjbGFzcyBOZ2JEYXRlQWRhcHRlcjxEPiB7XHJcbiAgLyoqXHJcbiAgICogQ29udmVydHMgdXNlci1tb2RlbCBkYXRlIGludG8gYW4gTmdiRGF0ZVN0cnVjdCBmb3IgaW50ZXJuYWwgdXNlIGluIHRoZSBsaWJyYXJ5XHJcbiAgICovXHJcbiAgYWJzdHJhY3QgZnJvbU1vZGVsKHZhbHVlOiBEKTogTmdiRGF0ZVN0cnVjdDtcclxuXHJcbiAgLyoqXHJcbiAgICogQ29udmVydHMgaW50ZXJuYWwgZGF0ZSB2YWx1ZSBOZ2JEYXRlU3RydWN0IHRvIHVzZXItbW9kZWwgZGF0ZVxyXG4gICAqIFRoZSByZXR1cm5lZCB0eXBlIGlzIHN1cHBvc2VkIHRvIGJlIG9mIHRoZSBzYW1lIHR5cGUgYXMgZnJvbU1vZGVsKCkgaW5wdXQtdmFsdWUgcGFyYW1cclxuICAgKi9cclxuICBhYnN0cmFjdCB0b01vZGVsKGRhdGU6IE5nYkRhdGVTdHJ1Y3QpOiBEO1xyXG59XHJcblxyXG5ASW5qZWN0YWJsZSgpXHJcbmV4cG9ydCBjbGFzcyBOZ2JEYXRlU3RydWN0QWRhcHRlciBleHRlbmRzIE5nYkRhdGVBZGFwdGVyPE5nYkRhdGVTdHJ1Y3Q+IHtcclxuICAvKipcclxuICAgKiBDb252ZXJ0cyBhIE5nYkRhdGVTdHJ1Y3QgdmFsdWUgaW50byBOZ2JEYXRlU3RydWN0IHZhbHVlXHJcbiAgICovXHJcbiAgZnJvbU1vZGVsKGRhdGU6IE5nYkRhdGVTdHJ1Y3QpOiBOZ2JEYXRlU3RydWN0IHtcclxuICAgIHJldHVybiAoZGF0ZSAmJiBkYXRlLnllYXIgJiYgZGF0ZS5tb250aCAmJiBkYXRlLmRheSkgPyB7eWVhcjogZGF0ZS55ZWFyLCBtb250aDogZGF0ZS5tb250aCwgZGF5OiBkYXRlLmRheX0gOiBudWxsO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogQ29udmVydHMgYSBOZ2JEYXRlU3RydWN0IHZhbHVlIGludG8gTmdiRGF0ZVN0cnVjdCB2YWx1ZVxyXG4gICAqL1xyXG4gIHRvTW9kZWwoZGF0ZTogTmdiRGF0ZVN0cnVjdCk6IE5nYkRhdGVTdHJ1Y3Qge1xyXG4gICAgcmV0dXJuIChkYXRlICYmIGRhdGUueWVhciAmJiBkYXRlLm1vbnRoICYmIGRhdGUuZGF5KSA/IHt5ZWFyOiBkYXRlLnllYXIsIG1vbnRoOiBkYXRlLm1vbnRoLCBkYXk6IGRhdGUuZGF5fSA6IG51bGw7XHJcbiAgfVxyXG59XHJcbiIsImltcG9ydCB7U3Vic2NyaXB0aW9ufSBmcm9tICdyeGpzJztcclxuaW1wb3J0IHt0YWtlfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XHJcbmltcG9ydCB7XHJcbiAgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksXHJcbiAgQ2hhbmdlRGV0ZWN0b3JSZWYsXHJcbiAgQ29tcG9uZW50LFxyXG4gIElucHV0LFxyXG4gIE9uQ2hhbmdlcyxcclxuICBUZW1wbGF0ZVJlZixcclxuICBmb3J3YXJkUmVmLFxyXG4gIE9uSW5pdCxcclxuICBTaW1wbGVDaGFuZ2VzLFxyXG4gIEV2ZW50RW1pdHRlcixcclxuICBPdXRwdXQsXHJcbiAgT25EZXN0cm95LFxyXG4gIEVsZW1lbnRSZWYsXHJcbiAgTmdab25lXHJcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7TkdfVkFMVUVfQUNDRVNTT1IsIENvbnRyb2xWYWx1ZUFjY2Vzc29yfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XHJcbmltcG9ydCB7TmdiQ2FsZW5kYXJ9IGZyb20gJy4vbmdiLWNhbGVuZGFyJztcclxuaW1wb3J0IHtOZ2JEYXRlfSBmcm9tICcuL25nYi1kYXRlJztcclxuaW1wb3J0IHtOZ2JEYXRlcGlja2VyU2VydmljZX0gZnJvbSAnLi9kYXRlcGlja2VyLXNlcnZpY2UnO1xyXG5pbXBvcnQge05nYkRhdGVwaWNrZXJLZXlNYXBTZXJ2aWNlfSBmcm9tICcuL2RhdGVwaWNrZXIta2V5bWFwLXNlcnZpY2UnO1xyXG5pbXBvcnQge0RhdGVwaWNrZXJWaWV3TW9kZWwsIE5hdmlnYXRpb25FdmVudH0gZnJvbSAnLi9kYXRlcGlja2VyLXZpZXctbW9kZWwnO1xyXG5pbXBvcnQge0RheVRlbXBsYXRlQ29udGV4dH0gZnJvbSAnLi9kYXRlcGlja2VyLWRheS10ZW1wbGF0ZS1jb250ZXh0JztcclxuaW1wb3J0IHtOZ2JEYXRlcGlja2VyQ29uZmlnfSBmcm9tICcuL2RhdGVwaWNrZXItY29uZmlnJztcclxuaW1wb3J0IHtOZ2JEYXRlQWRhcHRlcn0gZnJvbSAnLi9hZGFwdGVycy9uZ2ItZGF0ZS1hZGFwdGVyJztcclxuaW1wb3J0IHtOZ2JEYXRlU3RydWN0fSBmcm9tICcuL25nYi1kYXRlLXN0cnVjdCc7XHJcbmltcG9ydCB7TmdiRGF0ZXBpY2tlckkxOG59IGZyb20gJy4vZGF0ZXBpY2tlci1pMThuJztcclxuaW1wb3J0IHtpc0NoYW5nZWREYXRlfSBmcm9tICcuL2RhdGVwaWNrZXItdG9vbHMnO1xyXG5cclxuY29uc3QgTkdCX0RBVEVQSUNLRVJfVkFMVUVfQUNDRVNTT1IgPSB7XHJcbiAgcHJvdmlkZTogTkdfVkFMVUVfQUNDRVNTT1IsXHJcbiAgdXNlRXhpc3Rpbmc6IGZvcndhcmRSZWYoKCkgPT4gTmdiRGF0ZXBpY2tlciksXHJcbiAgbXVsdGk6IHRydWVcclxufTtcclxuXHJcbi8qKlxyXG4gKiBUaGUgcGF5bG9hZCBvZiB0aGUgZGF0ZXBpY2tlciBuYXZpZ2F0aW9uIGV2ZW50XHJcbiAqL1xyXG5leHBvcnQgaW50ZXJmYWNlIE5nYkRhdGVwaWNrZXJOYXZpZ2F0ZUV2ZW50IHtcclxuICAvKipcclxuICAgKiBDdXJyZW50bHkgZGlzcGxheWVkIG1vbnRoXHJcbiAgICovXHJcbiAgY3VycmVudDoge3llYXI6IG51bWJlciwgbW9udGg6IG51bWJlcn07XHJcblxyXG4gIC8qKlxyXG4gICAqIE1vbnRoIHdlJ3JlIG5hdmlnYXRpbmcgdG9cclxuICAgKi9cclxuICBuZXh0OiB7eWVhcjogbnVtYmVyLCBtb250aDogbnVtYmVyfTtcclxufVxyXG5cclxuLyoqXHJcbiAqIEEgbGlnaHR3ZWlnaHQgYW5kIGhpZ2hseSBjb25maWd1cmFibGUgZGF0ZXBpY2tlciBkaXJlY3RpdmVcclxuICovXHJcbkBDb21wb25lbnQoe1xyXG4gIGV4cG9ydEFzOiAnbmdiRGF0ZXBpY2tlcicsXHJcbiAgc2VsZWN0b3I6ICduZ2ItZGF0ZXBpY2tlcicsXHJcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2gsXHJcbiAgc3R5bGVzOiBbYFxyXG4gICAgOmhvc3Qge1xyXG4gICAgICBib3JkZXI6IDFweCBzb2xpZCAjZGZkZmRmO1xyXG4gICAgICBib3JkZXItcmFkaXVzOiAwLjI1cmVtO1xyXG4gICAgICBkaXNwbGF5OiBpbmxpbmUtYmxvY2s7XHJcbiAgICB9XHJcbiAgICAubmdiLWRwLW1vbnRoIHtcclxuICAgICAgcG9pbnRlci1ldmVudHM6IG5vbmU7XHJcbiAgICB9XHJcbiAgICAubmdiLWRwLWhlYWRlciB7XHJcbiAgICAgIGJvcmRlci1ib3R0b206IDA7XHJcbiAgICAgIGJvcmRlci1yYWRpdXM6IDAuMjVyZW0gMC4yNXJlbSAwIDA7XHJcbiAgICAgIHBhZGRpbmctdG9wOiAwLjI1cmVtO1xyXG4gICAgfVxyXG4gICAgbmdiLWRhdGVwaWNrZXItbW9udGgtdmlldyB7XHJcbiAgICAgIHBvaW50ZXItZXZlbnRzOiBhdXRvO1xyXG4gICAgfVxyXG4gICAgLm5nYi1kcC1tb250aC1uYW1lIHtcclxuICAgICAgZm9udC1zaXplOiBsYXJnZXI7XHJcbiAgICAgIGhlaWdodDogMnJlbTtcclxuICAgICAgbGluZS1oZWlnaHQ6IDJyZW07XHJcbiAgICAgIHRleHQtYWxpZ246IGNlbnRlcjtcclxuICAgIH1cclxuICAgIC9kZWVwLyAubmdiLWRwLW1vbnRoICsgLm5nYi1kcC1tb250aCA+IG5nYi1kYXRlcGlja2VyLW1vbnRoLXZpZXcgPiAubmdiLWRwLXdlZWsge1xyXG4gICAgICBwYWRkaW5nLWxlZnQ6IDFyZW07XHJcbiAgICB9XHJcbiAgICAvZGVlcC8gLm5nYi1kcC1tb250aCArIC5uZ2ItZHAtbW9udGggPiAubmdiLWRwLW1vbnRoLW5hbWUge1xyXG4gICAgICBwYWRkaW5nLWxlZnQ6IDFyZW07XHJcbiAgICB9XHJcbiAgICAvZGVlcC8gLm5nYi1kcC1tb250aDpsYXN0LWNoaWxkIC5uZ2ItZHAtd2VlayB7XHJcbiAgICAgIHBhZGRpbmctcmlnaHQ6IC4yNXJlbTtcclxuICAgIH1cclxuICAgIC9kZWVwLyAubmdiLWRwLW1vbnRoOmZpcnN0LWNoaWxkIC5uZ2ItZHAtd2VlayB7XHJcbiAgICAgIHBhZGRpbmctbGVmdDogLjI1cmVtO1xyXG4gICAgfVxyXG4gICAgL2RlZXAvIC5uZ2ItZHAtbW9udGggPiBuZ2ItZGF0ZXBpY2tlci1tb250aC12aWV3ID4gLm5nYi1kcC13ZWVrOmxhc3QtY2hpbGQge1xyXG4gICAgICBwYWRkaW5nLWJvdHRvbTogLjI1cmVtO1xyXG4gICAgfVxyXG4gICAgLm5nYi1kcC1tb250aHMge1xyXG4gICAgICBkaXNwbGF5OiAtbXMtZmxleGJveDtcclxuICAgICAgZGlzcGxheTogZmxleDtcclxuICAgIH1cclxuICBgXSxcclxuICB0ZW1wbGF0ZTogYFxyXG4gICAgPG5nLXRlbXBsYXRlICNkdCBsZXQtZGF0ZT1cImRhdGVcIiBsZXQtY3VycmVudE1vbnRoPVwiY3VycmVudE1vbnRoXCIgbGV0LXNlbGVjdGVkPVwic2VsZWN0ZWRcIiBsZXQtZGlzYWJsZWQ9XCJkaXNhYmxlZFwiIGxldC1mb2N1c2VkPVwiZm9jdXNlZFwiPlxyXG4gICAgICA8ZGl2IG5nYkRhdGVwaWNrZXJEYXlWaWV3XHJcbiAgICAgICAgW2RhdGVdPVwiZGF0ZVwiXHJcbiAgICAgICAgW2N1cnJlbnRNb250aF09XCJjdXJyZW50TW9udGhcIlxyXG4gICAgICAgIFtzZWxlY3RlZF09XCJzZWxlY3RlZFwiXHJcbiAgICAgICAgW2Rpc2FibGVkXT1cImRpc2FibGVkXCJcclxuICAgICAgICBbZm9jdXNlZF09XCJmb2N1c2VkXCI+XHJcbiAgICAgIDwvZGl2PlxyXG4gICAgPC9uZy10ZW1wbGF0ZT5cclxuXHJcbiAgICA8ZGl2IGNsYXNzPVwibmdiLWRwLWhlYWRlciBiZy1saWdodFwiPlxyXG4gICAgICA8bmdiLWRhdGVwaWNrZXItbmF2aWdhdGlvbiAqbmdJZj1cIm5hdmlnYXRpb24gIT09ICdub25lJ1wiXHJcbiAgICAgICAgW2RhdGVdPVwibW9kZWwuZmlyc3REYXRlXCJcclxuICAgICAgICBbbW9udGhzXT1cIm1vZGVsLm1vbnRoc1wiXHJcbiAgICAgICAgW2Rpc2FibGVkXT1cIm1vZGVsLmRpc2FibGVkXCJcclxuICAgICAgICBbc2hvd1NlbGVjdF09XCJtb2RlbC5uYXZpZ2F0aW9uID09PSAnc2VsZWN0J1wiXHJcbiAgICAgICAgW3ByZXZEaXNhYmxlZF09XCJtb2RlbC5wcmV2RGlzYWJsZWRcIlxyXG4gICAgICAgIFtuZXh0RGlzYWJsZWRdPVwibW9kZWwubmV4dERpc2FibGVkXCJcclxuICAgICAgICBbc2VsZWN0Qm94ZXNdPVwibW9kZWwuc2VsZWN0Qm94ZXNcIlxyXG4gICAgICAgIChuYXZpZ2F0ZSk9XCJvbk5hdmlnYXRlRXZlbnQoJGV2ZW50KVwiXHJcbiAgICAgICAgKHNlbGVjdCk9XCJvbk5hdmlnYXRlRGF0ZVNlbGVjdCgkZXZlbnQpXCI+XHJcbiAgICAgIDwvbmdiLWRhdGVwaWNrZXItbmF2aWdhdGlvbj5cclxuICAgIDwvZGl2PlxyXG5cclxuICAgIDxkaXYgY2xhc3M9XCJuZ2ItZHAtbW9udGhzXCIgKGtleWRvd24pPVwib25LZXlEb3duKCRldmVudClcIiAoZm9jdXNpbik9XCJzaG93Rm9jdXModHJ1ZSlcIiAoZm9jdXNvdXQpPVwic2hvd0ZvY3VzKGZhbHNlKVwiPlxyXG4gICAgICA8bmctdGVtcGxhdGUgbmdGb3IgbGV0LW1vbnRoIFtuZ0Zvck9mXT1cIm1vZGVsLm1vbnRoc1wiIGxldC1pPVwiaW5kZXhcIj5cclxuICAgICAgICA8ZGl2IGNsYXNzPVwibmdiLWRwLW1vbnRoXCI+XHJcbiAgICAgICAgICA8ZGl2ICpuZ0lmPVwibmF2aWdhdGlvbiA9PT0gJ25vbmUnIHx8IChkaXNwbGF5TW9udGhzID4gMSAmJiBuYXZpZ2F0aW9uID09PSAnc2VsZWN0JylcIlxyXG4gICAgICAgICAgICAgICAgY2xhc3M9XCJuZ2ItZHAtbW9udGgtbmFtZSBiZy1saWdodFwiPlxyXG4gICAgICAgICAgICB7eyBpMThuLmdldE1vbnRoRnVsbE5hbWUobW9udGgubnVtYmVyLCBtb250aC55ZWFyKSB9fSB7eyBpMThuLmdldFllYXJOdW1lcmFscyhtb250aC55ZWFyKSB9fVxyXG4gICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICA8bmdiLWRhdGVwaWNrZXItbW9udGgtdmlld1xyXG4gICAgICAgICAgICBbbW9udGhdPVwibW9udGhcIlxyXG4gICAgICAgICAgICBbZGF5VGVtcGxhdGVdPVwiZGF5VGVtcGxhdGUgfHwgZHRcIlxyXG4gICAgICAgICAgICBbc2hvd1dlZWtkYXlzXT1cInNob3dXZWVrZGF5c1wiXHJcbiAgICAgICAgICAgIFtzaG93V2Vla051bWJlcnNdPVwic2hvd1dlZWtOdW1iZXJzXCJcclxuICAgICAgICAgICAgKHNlbGVjdCk9XCJvbkRhdGVTZWxlY3QoJGV2ZW50KVwiPlxyXG4gICAgICAgICAgPC9uZ2ItZGF0ZXBpY2tlci1tb250aC12aWV3PlxyXG4gICAgICAgIDwvZGl2PlxyXG4gICAgICA8L25nLXRlbXBsYXRlPlxyXG4gICAgPC9kaXY+XHJcbiAgYCxcclxuICBwcm92aWRlcnM6IFtOR0JfREFURVBJQ0tFUl9WQUxVRV9BQ0NFU1NPUiwgTmdiRGF0ZXBpY2tlclNlcnZpY2UsIE5nYkRhdGVwaWNrZXJLZXlNYXBTZXJ2aWNlXVxyXG59KVxyXG5leHBvcnQgY2xhc3MgTmdiRGF0ZXBpY2tlciBpbXBsZW1lbnRzIE9uRGVzdHJveSxcclxuICAgIE9uQ2hhbmdlcywgT25Jbml0LCBDb250cm9sVmFsdWVBY2Nlc3NvciB7XHJcbiAgbW9kZWw6IERhdGVwaWNrZXJWaWV3TW9kZWw7XHJcblxyXG4gIHByaXZhdGUgX3N1YnNjcmlwdGlvbjogU3Vic2NyaXB0aW9uO1xyXG4gIHByaXZhdGUgX3NlbGVjdFN1YnNjcmlwdGlvbjogU3Vic2NyaXB0aW9uO1xyXG4gIC8qKlxyXG4gICAqIFJlZmVyZW5jZSBmb3IgdGhlIGN1c3RvbSB0ZW1wbGF0ZSBmb3IgdGhlIGRheSBkaXNwbGF5XHJcbiAgICovXHJcbiAgQElucHV0KCkgZGF5VGVtcGxhdGU6IFRlbXBsYXRlUmVmPERheVRlbXBsYXRlQ29udGV4dD47XHJcblxyXG4gIC8qKlxyXG4gICAqIE51bWJlciBvZiBtb250aHMgdG8gZGlzcGxheVxyXG4gICAqL1xyXG4gIEBJbnB1dCgpIGRpc3BsYXlNb250aHM6IG51bWJlcjtcclxuXHJcbiAgLyoqXHJcbiAgICogRmlyc3QgZGF5IG9mIHRoZSB3ZWVrLiBXaXRoIGRlZmF1bHQgY2FsZW5kYXIgd2UgdXNlIElTTyA4NjAxOiAnd2Vla2RheScgaXMgMT1Nb24gLi4uIDc9U3VuXHJcbiAgICovXHJcbiAgQElucHV0KCkgZmlyc3REYXlPZldlZWs6IG51bWJlcjtcclxuXHJcbiAgLyoqXHJcbiAgICogQ2FsbGJhY2sgdG8gbWFyayBhIGdpdmVuIGRhdGUgYXMgZGlzYWJsZWQuXHJcbiAgICogJ0N1cnJlbnQnIGNvbnRhaW5zIHRoZSBtb250aCB0aGF0IHdpbGwgYmUgZGlzcGxheWVkIGluIHRoZSB2aWV3XHJcbiAgICovXHJcbiAgQElucHV0KCkgbWFya0Rpc2FibGVkOiAoZGF0ZTogTmdiRGF0ZSwgY3VycmVudDoge3llYXI6IG51bWJlciwgbW9udGg6IG51bWJlcn0pID0+IGJvb2xlYW47XHJcblxyXG4gIC8qKlxyXG4gICAqIE1heCBkYXRlIGZvciB0aGUgbmF2aWdhdGlvbi4gSWYgbm90IHByb3ZpZGVkLCAneWVhcicgc2VsZWN0IGJveCB3aWxsIGRpc3BsYXkgMTAgeWVhcnMgYWZ0ZXIgY3VycmVudCBtb250aFxyXG4gICAqL1xyXG4gIEBJbnB1dCgpIG1heERhdGU6IE5nYkRhdGVTdHJ1Y3Q7XHJcblxyXG4gIC8qKlxyXG4gICAqIE1pbiBkYXRlIGZvciB0aGUgbmF2aWdhdGlvbi4gSWYgbm90IHByb3ZpZGVkLCAneWVhcicgc2VsZWN0IGJveCB3aWxsIGRpc3BsYXkgMTAgeWVhcnMgYmVmb3JlIGN1cnJlbnQgbW9udGhcclxuICAgKi9cclxuICBASW5wdXQoKSBtaW5EYXRlOiBOZ2JEYXRlU3RydWN0O1xyXG5cclxuICAvKipcclxuICAgKiBOYXZpZ2F0aW9uIHR5cGU6IGBzZWxlY3RgIChkZWZhdWx0IHdpdGggc2VsZWN0IGJveGVzIGZvciBtb250aCBhbmQgeWVhciksIGBhcnJvd3NgXHJcbiAgICogKHdpdGhvdXQgc2VsZWN0IGJveGVzLCBvbmx5IG5hdmlnYXRpb24gYXJyb3dzKSBvciBgbm9uZWAgKG5vIG5hdmlnYXRpb24gYXQgYWxsKVxyXG4gICAqL1xyXG4gIEBJbnB1dCgpIG5hdmlnYXRpb246ICdzZWxlY3QnIHwgJ2Fycm93cycgfCAnbm9uZSc7XHJcblxyXG4gIC8qKlxyXG4gICAqIFRoZSB3YXkgdG8gZGlzcGxheSBkYXlzIHRoYXQgZG9uJ3QgYmVsb25nIHRvIGN1cnJlbnQgbW9udGg6IGB2aXNpYmxlYCAoZGVmYXVsdCksXHJcbiAgICogYGhpZGRlbmAgKG5vdCBkaXNwbGF5ZWQpIG9yIGBjb2xsYXBzZWRgIChub3QgZGlzcGxheWVkIHdpdGggZW1wdHkgc3BhY2UgY29sbGFwc2VkKVxyXG4gICAqL1xyXG4gIEBJbnB1dCgpIG91dHNpZGVEYXlzOiAndmlzaWJsZScgfCAnY29sbGFwc2VkJyB8ICdoaWRkZW4nO1xyXG5cclxuICAvKipcclxuICAgKiBXaGV0aGVyIHRvIGRpc3BsYXkgZGF5cyBvZiB0aGUgd2Vla1xyXG4gICAqL1xyXG4gIEBJbnB1dCgpIHNob3dXZWVrZGF5czogYm9vbGVhbjtcclxuXHJcbiAgLyoqXHJcbiAgICogV2hldGhlciB0byBkaXNwbGF5IHdlZWsgbnVtYmVyc1xyXG4gICAqL1xyXG4gIEBJbnB1dCgpIHNob3dXZWVrTnVtYmVyczogYm9vbGVhbjtcclxuXHJcbiAgLyoqXHJcbiAgICogRGF0ZSB0byBvcGVuIGNhbGVuZGFyIHdpdGguXHJcbiAgICogV2l0aCBkZWZhdWx0IGNhbGVuZGFyIHdlIHVzZSBJU08gODYwMTogJ21vbnRoJyBpcyAxPUphbiAuLi4gMTI9RGVjLlxyXG4gICAqIElmIG5vdGhpbmcgb3IgaW52YWxpZCBkYXRlIHByb3ZpZGVkLCBjYWxlbmRhciB3aWxsIG9wZW4gd2l0aCBjdXJyZW50IG1vbnRoLlxyXG4gICAqIFVzZSAnbmF2aWdhdGVUbyhkYXRlKScgYXMgYW4gYWx0ZXJuYXRpdmVcclxuICAgKi9cclxuICBASW5wdXQoKSBzdGFydERhdGU6IHt5ZWFyOiBudW1iZXIsIG1vbnRoOiBudW1iZXJ9O1xyXG5cclxuICAvKipcclxuICAgKiBBbiBldmVudCBmaXJlZCB3aGVuIG5hdmlnYXRpb24gaGFwcGVucyBhbmQgY3VycmVudGx5IGRpc3BsYXllZCBtb250aCBjaGFuZ2VzLlxyXG4gICAqIFNlZSBOZ2JEYXRlcGlja2VyTmF2aWdhdGVFdmVudCBmb3IgdGhlIHBheWxvYWQgaW5mby5cclxuICAgKi9cclxuICBAT3V0cHV0KCkgbmF2aWdhdGUgPSBuZXcgRXZlbnRFbWl0dGVyPE5nYkRhdGVwaWNrZXJOYXZpZ2F0ZUV2ZW50PigpO1xyXG5cclxuICAvKipcclxuICAgKiBBbiBldmVudCBmaXJlZCB3aGVuIHVzZXIgc2VsZWN0cyBhIGRhdGUgdXNpbmcga2V5Ym9hcmQgb3IgbW91c2UuXHJcbiAgICogVGhlIHBheWxvYWQgb2YgdGhlIGV2ZW50IGlzIGN1cnJlbnRseSBzZWxlY3RlZCBOZ2JEYXRlLlxyXG4gICAqL1xyXG4gIEBPdXRwdXQoKSBzZWxlY3QgPSBuZXcgRXZlbnRFbWl0dGVyPE5nYkRhdGU+KCk7XHJcblxyXG4gIG9uQ2hhbmdlID0gKF86IGFueSkgPT4ge307XHJcbiAgb25Ub3VjaGVkID0gKCkgPT4ge307XHJcblxyXG4gIGNvbnN0cnVjdG9yKFxyXG4gICAgICBwcml2YXRlIF9rZXlNYXBTZXJ2aWNlOiBOZ2JEYXRlcGlja2VyS2V5TWFwU2VydmljZSwgcHVibGljIF9zZXJ2aWNlOiBOZ2JEYXRlcGlja2VyU2VydmljZSxcclxuICAgICAgcHJpdmF0ZSBfY2FsZW5kYXI6IE5nYkNhbGVuZGFyLCBwdWJsaWMgaTE4bjogTmdiRGF0ZXBpY2tlckkxOG4sIGNvbmZpZzogTmdiRGF0ZXBpY2tlckNvbmZpZyxcclxuICAgICAgcHJpdmF0ZSBfY2Q6IENoYW5nZURldGVjdG9yUmVmLCBwcml2YXRlIF9lbGVtZW50UmVmOiBFbGVtZW50UmVmPEhUTUxFbGVtZW50PixcclxuICAgICAgcHJpdmF0ZSBfbmdiRGF0ZUFkYXB0ZXI6IE5nYkRhdGVBZGFwdGVyPGFueT4sIHByaXZhdGUgX25nWm9uZTogTmdab25lKSB7XHJcbiAgICBbJ2RheVRlbXBsYXRlJywgJ2Rpc3BsYXlNb250aHMnLCAnZmlyc3REYXlPZldlZWsnLCAnbWFya0Rpc2FibGVkJywgJ21pbkRhdGUnLCAnbWF4RGF0ZScsICduYXZpZ2F0aW9uJyxcclxuICAgICAnb3V0c2lkZURheXMnLCAnc2hvd1dlZWtkYXlzJywgJ3Nob3dXZWVrTnVtYmVycycsICdzdGFydERhdGUnXVxyXG4gICAgICAgIC5mb3JFYWNoKGlucHV0ID0+IHRoaXNbaW5wdXRdID0gY29uZmlnW2lucHV0XSk7XHJcblxyXG4gICAgdGhpcy5fc2VsZWN0U3Vic2NyaXB0aW9uID0gX3NlcnZpY2Uuc2VsZWN0JC5zdWJzY3JpYmUoZGF0ZSA9PiB7IHRoaXMuc2VsZWN0LmVtaXQoZGF0ZSk7IH0pO1xyXG5cclxuICAgIHRoaXMuX3N1YnNjcmlwdGlvbiA9IF9zZXJ2aWNlLm1vZGVsJC5zdWJzY3JpYmUobW9kZWwgPT4ge1xyXG4gICAgICBjb25zdCBuZXdEYXRlID0gbW9kZWwuZmlyc3REYXRlO1xyXG4gICAgICBjb25zdCBvbGREYXRlID0gdGhpcy5tb2RlbCA/IHRoaXMubW9kZWwuZmlyc3REYXRlIDogbnVsbDtcclxuICAgICAgY29uc3QgbmV3U2VsZWN0ZWREYXRlID0gbW9kZWwuc2VsZWN0ZWREYXRlO1xyXG4gICAgICBjb25zdCBvbGRTZWxlY3RlZERhdGUgPSB0aGlzLm1vZGVsID8gdGhpcy5tb2RlbC5zZWxlY3RlZERhdGUgOiBudWxsO1xyXG4gICAgICBjb25zdCBuZXdGb2N1c2VkRGF0ZSA9IG1vZGVsLmZvY3VzRGF0ZTtcclxuICAgICAgY29uc3Qgb2xkRm9jdXNlZERhdGUgPSB0aGlzLm1vZGVsID8gdGhpcy5tb2RlbC5mb2N1c0RhdGUgOiBudWxsO1xyXG5cclxuICAgICAgdGhpcy5tb2RlbCA9IG1vZGVsO1xyXG5cclxuICAgICAgLy8gaGFuZGxpbmcgc2VsZWN0aW9uIGNoYW5nZVxyXG4gICAgICBpZiAoaXNDaGFuZ2VkRGF0ZShuZXdTZWxlY3RlZERhdGUsIG9sZFNlbGVjdGVkRGF0ZSkpIHtcclxuICAgICAgICB0aGlzLm9uVG91Y2hlZCgpO1xyXG4gICAgICAgIHRoaXMub25DaGFuZ2UodGhpcy5fbmdiRGF0ZUFkYXB0ZXIudG9Nb2RlbChuZXdTZWxlY3RlZERhdGUpKTtcclxuICAgICAgfVxyXG5cclxuICAgICAgLy8gaGFuZGxpbmcgZm9jdXMgY2hhbmdlXHJcbiAgICAgIGlmIChpc0NoYW5nZWREYXRlKG5ld0ZvY3VzZWREYXRlLCBvbGRGb2N1c2VkRGF0ZSkgJiYgb2xkRm9jdXNlZERhdGUgJiYgbW9kZWwuZm9jdXNWaXNpYmxlKSB7XHJcbiAgICAgICAgdGhpcy5mb2N1cygpO1xyXG4gICAgICB9XHJcblxyXG4gICAgICAvLyBlbWl0dGluZyBuYXZpZ2F0aW9uIGV2ZW50IGlmIHRoZSBmaXJzdCBtb250aCBjaGFuZ2VzXHJcbiAgICAgIGlmICghbmV3RGF0ZS5lcXVhbHMob2xkRGF0ZSkpIHtcclxuICAgICAgICB0aGlzLm5hdmlnYXRlLmVtaXQoe1xyXG4gICAgICAgICAgY3VycmVudDogb2xkRGF0ZSA/IHt5ZWFyOiBvbGREYXRlLnllYXIsIG1vbnRoOiBvbGREYXRlLm1vbnRofSA6IG51bGwsXHJcbiAgICAgICAgICBuZXh0OiB7eWVhcjogbmV3RGF0ZS55ZWFyLCBtb250aDogbmV3RGF0ZS5tb250aH1cclxuICAgICAgICB9KTtcclxuICAgICAgfVxyXG4gICAgICBfY2QubWFya0ZvckNoZWNrKCk7XHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIE1hbnVhbGx5IGZvY3VzIHRoZSBmb2N1c2FibGUgZGF5IGluIHRoZSBkYXRlcGlja2VyXHJcbiAgICovXHJcbiAgZm9jdXMoKSB7XHJcbiAgICB0aGlzLl9uZ1pvbmUub25TdGFibGUuYXNPYnNlcnZhYmxlKCkucGlwZSh0YWtlKDEpKS5zdWJzY3JpYmUoKCkgPT4ge1xyXG4gICAgICBjb25zdCBlbGVtZW50VG9Gb2N1cyA9XHJcbiAgICAgICAgICB0aGlzLl9lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQucXVlcnlTZWxlY3RvcjxIVE1MRGl2RWxlbWVudD4oJ2Rpdi5uZ2ItZHAtZGF5W3RhYmluZGV4PVwiMFwiXScpO1xyXG4gICAgICBpZiAoZWxlbWVudFRvRm9jdXMpIHtcclxuICAgICAgICBlbGVtZW50VG9Gb2N1cy5mb2N1cygpO1xyXG4gICAgICB9XHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIE5hdmlnYXRlcyBjdXJyZW50IHZpZXcgdG8gcHJvdmlkZWQgZGF0ZS5cclxuICAgKiBXaXRoIGRlZmF1bHQgY2FsZW5kYXIgd2UgdXNlIElTTyA4NjAxOiAnbW9udGgnIGlzIDE9SmFuIC4uLiAxMj1EZWMuXHJcbiAgICogSWYgbm90aGluZyBvciBpbnZhbGlkIGRhdGUgcHJvdmlkZWQgY2FsZW5kYXIgd2lsbCBvcGVuIGN1cnJlbnQgbW9udGguXHJcbiAgICogVXNlICdzdGFydERhdGUnIGlucHV0IGFzIGFuIGFsdGVybmF0aXZlXHJcbiAgICovXHJcbiAgbmF2aWdhdGVUbyhkYXRlPzoge3llYXI6IG51bWJlciwgbW9udGg6IG51bWJlcn0pIHtcclxuICAgIHRoaXMuX3NlcnZpY2Uub3BlbihOZ2JEYXRlLmZyb20oZGF0ZSA/IHsuLi5kYXRlLCBkYXk6IDF9IDogbnVsbCkpO1xyXG4gIH1cclxuXHJcbiAgbmdPbkRlc3Ryb3koKSB7XHJcbiAgICB0aGlzLl9zdWJzY3JpcHRpb24udW5zdWJzY3JpYmUoKTtcclxuICAgIHRoaXMuX3NlbGVjdFN1YnNjcmlwdGlvbi51bnN1YnNjcmliZSgpO1xyXG4gIH1cclxuXHJcbiAgbmdPbkluaXQoKSB7XHJcbiAgICBpZiAodGhpcy5tb2RlbCA9PT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgIFsnZGlzcGxheU1vbnRocycsICdtYXJrRGlzYWJsZWQnLCAnZmlyc3REYXlPZldlZWsnLCAnbmF2aWdhdGlvbicsICdtaW5EYXRlJywgJ21heERhdGUnLCAnb3V0c2lkZURheXMnXS5mb3JFYWNoKFxyXG4gICAgICAgICAgaW5wdXQgPT4gdGhpcy5fc2VydmljZVtpbnB1dF0gPSB0aGlzW2lucHV0XSk7XHJcbiAgICAgIHRoaXMubmF2aWdhdGVUbyh0aGlzLnN0YXJ0RGF0ZSk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBuZ09uQ2hhbmdlcyhjaGFuZ2VzOiBTaW1wbGVDaGFuZ2VzKSB7XHJcbiAgICBbJ2Rpc3BsYXlNb250aHMnLCAnbWFya0Rpc2FibGVkJywgJ2ZpcnN0RGF5T2ZXZWVrJywgJ25hdmlnYXRpb24nLCAnbWluRGF0ZScsICdtYXhEYXRlJywgJ291dHNpZGVEYXlzJ11cclxuICAgICAgICAuZmlsdGVyKGlucHV0ID0+IGlucHV0IGluIGNoYW5nZXMpXHJcbiAgICAgICAgLmZvckVhY2goaW5wdXQgPT4gdGhpcy5fc2VydmljZVtpbnB1dF0gPSB0aGlzW2lucHV0XSk7XHJcblxyXG4gICAgaWYgKCdzdGFydERhdGUnIGluIGNoYW5nZXMpIHtcclxuICAgICAgdGhpcy5uYXZpZ2F0ZVRvKHRoaXMuc3RhcnREYXRlKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIG9uRGF0ZVNlbGVjdChkYXRlOiBOZ2JEYXRlKSB7XHJcbiAgICB0aGlzLl9zZXJ2aWNlLmZvY3VzKGRhdGUpO1xyXG4gICAgdGhpcy5fc2VydmljZS5zZWxlY3QoZGF0ZSwge2VtaXRFdmVudDogdHJ1ZX0pO1xyXG4gIH1cclxuXHJcbiAgb25LZXlEb3duKGV2ZW50OiBLZXlib2FyZEV2ZW50KSB7IHRoaXMuX2tleU1hcFNlcnZpY2UucHJvY2Vzc0tleShldmVudCk7IH1cclxuXHJcbiAgb25OYXZpZ2F0ZURhdGVTZWxlY3QoZGF0ZTogTmdiRGF0ZSkgeyB0aGlzLl9zZXJ2aWNlLm9wZW4oZGF0ZSk7IH1cclxuXHJcbiAgb25OYXZpZ2F0ZUV2ZW50KGV2ZW50OiBOYXZpZ2F0aW9uRXZlbnQpIHtcclxuICAgIHN3aXRjaCAoZXZlbnQpIHtcclxuICAgICAgY2FzZSBOYXZpZ2F0aW9uRXZlbnQuUFJFVjpcclxuICAgICAgICB0aGlzLl9zZXJ2aWNlLm9wZW4odGhpcy5fY2FsZW5kYXIuZ2V0UHJldih0aGlzLm1vZGVsLmZpcnN0RGF0ZSwgJ20nLCAxKSk7XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICAgIGNhc2UgTmF2aWdhdGlvbkV2ZW50Lk5FWFQ6XHJcbiAgICAgICAgdGhpcy5fc2VydmljZS5vcGVuKHRoaXMuX2NhbGVuZGFyLmdldE5leHQodGhpcy5tb2RlbC5maXJzdERhdGUsICdtJywgMSkpO1xyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgcmVnaXN0ZXJPbkNoYW5nZShmbjogKHZhbHVlOiBhbnkpID0+IGFueSk6IHZvaWQgeyB0aGlzLm9uQ2hhbmdlID0gZm47IH1cclxuXHJcbiAgcmVnaXN0ZXJPblRvdWNoZWQoZm46ICgpID0+IGFueSk6IHZvaWQgeyB0aGlzLm9uVG91Y2hlZCA9IGZuOyB9XHJcblxyXG4gIHNldERpc2FibGVkU3RhdGUoaXNEaXNhYmxlZDogYm9vbGVhbikgeyB0aGlzLl9zZXJ2aWNlLmRpc2FibGVkID0gaXNEaXNhYmxlZDsgfVxyXG5cclxuICBzaG93Rm9jdXMoZm9jdXNWaXNpYmxlOiBib29sZWFuKSB7IHRoaXMuX3NlcnZpY2UuZm9jdXNWaXNpYmxlID0gZm9jdXNWaXNpYmxlOyB9XHJcblxyXG4gIHdyaXRlVmFsdWUodmFsdWUpIHsgdGhpcy5fc2VydmljZS5zZWxlY3QoTmdiRGF0ZS5mcm9tKHRoaXMuX25nYkRhdGVBZGFwdGVyLmZyb21Nb2RlbCh2YWx1ZSkpKTsgfVxyXG59XHJcbiIsImltcG9ydCB7Q29tcG9uZW50LCBJbnB1dCwgVGVtcGxhdGVSZWYsIE91dHB1dCwgRXZlbnRFbWl0dGVyfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHtNb250aFZpZXdNb2RlbCwgRGF5Vmlld01vZGVsfSBmcm9tICcuL2RhdGVwaWNrZXItdmlldy1tb2RlbCc7XHJcbmltcG9ydCB7TmdiRGF0ZX0gZnJvbSAnLi9uZ2ItZGF0ZSc7XHJcbmltcG9ydCB7TmdiRGF0ZXBpY2tlckkxOG59IGZyb20gJy4vZGF0ZXBpY2tlci1pMThuJztcclxuaW1wb3J0IHtEYXlUZW1wbGF0ZUNvbnRleHR9IGZyb20gJy4vZGF0ZXBpY2tlci1kYXktdGVtcGxhdGUtY29udGV4dCc7XHJcblxyXG5AQ29tcG9uZW50KHtcclxuICBzZWxlY3RvcjogJ25nYi1kYXRlcGlja2VyLW1vbnRoLXZpZXcnLFxyXG4gIGhvc3Q6IHsncm9sZSc6ICdncmlkJ30sXHJcbiAgc3R5bGVzOiBbYFxyXG4gICAgOmhvc3Qge1xyXG4gICAgICBkaXNwbGF5OiBibG9jaztcclxuICAgIH1cclxuICAgIC5uZ2ItZHAtd2Vla2RheSwgLm5nYi1kcC13ZWVrLW51bWJlciB7XHJcbiAgICAgIGxpbmUtaGVpZ2h0OiAycmVtO1xyXG4gICAgICB0ZXh0LWFsaWduOiBjZW50ZXI7XHJcbiAgICAgIGZvbnQtc3R5bGU6IGl0YWxpYztcclxuICAgIH1cclxuICAgIC5uZ2ItZHAtd2Vla2RheSB7XHJcbiAgICAgIGNvbG9yOiAjNWJjMGRlO1xyXG4gICAgICBjb2xvcjogdmFyKC0taW5mbyk7XHJcbiAgICB9XHJcbiAgICAubmdiLWRwLXdlZWsge1xyXG4gICAgICBib3JkZXItcmFkaXVzOiAwLjI1cmVtO1xyXG4gICAgICBkaXNwbGF5OiAtbXMtZmxleGJveDtcclxuICAgICAgZGlzcGxheTogZmxleDtcclxuICAgIH1cclxuICAgIC5uZ2ItZHAtd2Vla2RheXMge1xyXG4gICAgICBib3JkZXItYm90dG9tOiAxcHggc29saWQgcmdiYSgwLCAwLCAwLCAwLjEyNSk7XHJcbiAgICAgIGJvcmRlci1yYWRpdXM6IDA7XHJcbiAgICB9XHJcbiAgICAubmdiLWRwLWRheSwgLm5nYi1kcC13ZWVrZGF5LCAubmdiLWRwLXdlZWstbnVtYmVyIHtcclxuICAgICAgd2lkdGg6IDJyZW07XHJcbiAgICAgIGhlaWdodDogMnJlbTtcclxuICAgIH1cclxuICAgIC5uZ2ItZHAtZGF5IHtcclxuICAgICAgY3Vyc29yOiBwb2ludGVyO1xyXG4gICAgfVxyXG4gICAgLm5nYi1kcC1kYXkuZGlzYWJsZWQsIC5uZ2ItZHAtZGF5LmhpZGRlbiB7XHJcbiAgICAgIGN1cnNvcjogZGVmYXVsdDtcclxuICAgIH1cclxuICBgXSxcclxuICB0ZW1wbGF0ZTogYFxyXG4gICAgPGRpdiAqbmdJZj1cInNob3dXZWVrZGF5c1wiIGNsYXNzPVwibmdiLWRwLXdlZWsgbmdiLWRwLXdlZWtkYXlzIGJnLWxpZ2h0XCI+XHJcbiAgICAgIDxkaXYgKm5nSWY9XCJzaG93V2Vla051bWJlcnNcIiBjbGFzcz1cIm5nYi1kcC13ZWVrZGF5IG5nYi1kcC1zaG93d2Vla1wiPjwvZGl2PlxyXG4gICAgICA8ZGl2ICpuZ0Zvcj1cImxldCB3IG9mIG1vbnRoLndlZWtkYXlzXCIgY2xhc3M9XCJuZ2ItZHAtd2Vla2RheSBzbWFsbFwiPlxyXG4gICAgICAgIHt7IGkxOG4uZ2V0V2Vla2RheVNob3J0TmFtZSh3KSB9fVxyXG4gICAgICA8L2Rpdj5cclxuICAgIDwvZGl2PlxyXG4gICAgPG5nLXRlbXBsYXRlIG5nRm9yIGxldC13ZWVrIFtuZ0Zvck9mXT1cIm1vbnRoLndlZWtzXCI+XHJcbiAgICAgIDxkaXYgKm5nSWY9XCIhd2Vlay5jb2xsYXBzZWRcIiBjbGFzcz1cIm5nYi1kcC13ZWVrXCIgcm9sZT1cInJvd1wiPlxyXG4gICAgICAgIDxkaXYgKm5nSWY9XCJzaG93V2Vla051bWJlcnNcIiBjbGFzcz1cIm5nYi1kcC13ZWVrLW51bWJlciBzbWFsbCB0ZXh0LW11dGVkXCI+e3sgaTE4bi5nZXRXZWVrTnVtZXJhbHMod2Vlay5udW1iZXIpIH19PC9kaXY+XHJcbiAgICAgICAgPGRpdiAqbmdGb3I9XCJsZXQgZGF5IG9mIHdlZWsuZGF5c1wiIChjbGljayk9XCJkb1NlbGVjdChkYXkpXCIgY2xhc3M9XCJuZ2ItZHAtZGF5XCIgcm9sZT1cImdyaWRjZWxsXCJcclxuICAgICAgICAgIFtjbGFzcy5kaXNhYmxlZF09XCJkYXkuY29udGV4dC5kaXNhYmxlZFwiXHJcbiAgICAgICAgICBbdGFiaW5kZXhdPVwiZGF5LnRhYmluZGV4XCJcclxuICAgICAgICAgIFtjbGFzcy5oaWRkZW5dPVwiZGF5LmhpZGRlblwiXHJcbiAgICAgICAgICBbYXR0ci5hcmlhLWxhYmVsXT1cImRheS5hcmlhTGFiZWxcIj5cclxuICAgICAgICAgIDxuZy10ZW1wbGF0ZSBbbmdJZl09XCIhZGF5LmhpZGRlblwiPlxyXG4gICAgICAgICAgICA8bmctdGVtcGxhdGUgW25nVGVtcGxhdGVPdXRsZXRdPVwiZGF5VGVtcGxhdGVcIiBbbmdUZW1wbGF0ZU91dGxldENvbnRleHRdPVwiZGF5LmNvbnRleHRcIj48L25nLXRlbXBsYXRlPlxyXG4gICAgICAgICAgPC9uZy10ZW1wbGF0ZT5cclxuICAgICAgICA8L2Rpdj5cclxuICAgICAgPC9kaXY+XHJcbiAgICA8L25nLXRlbXBsYXRlPlxyXG4gIGBcclxufSlcclxuZXhwb3J0IGNsYXNzIE5nYkRhdGVwaWNrZXJNb250aFZpZXcge1xyXG4gIEBJbnB1dCgpIGRheVRlbXBsYXRlOiBUZW1wbGF0ZVJlZjxEYXlUZW1wbGF0ZUNvbnRleHQ+O1xyXG4gIEBJbnB1dCgpIG1vbnRoOiBNb250aFZpZXdNb2RlbDtcclxuICBASW5wdXQoKSBzaG93V2Vla2RheXM7XHJcbiAgQElucHV0KCkgc2hvd1dlZWtOdW1iZXJzO1xyXG5cclxuICBAT3V0cHV0KCkgc2VsZWN0ID0gbmV3IEV2ZW50RW1pdHRlcjxOZ2JEYXRlPigpO1xyXG5cclxuICBjb25zdHJ1Y3RvcihwdWJsaWMgaTE4bjogTmdiRGF0ZXBpY2tlckkxOG4pIHt9XHJcblxyXG4gIGRvU2VsZWN0KGRheTogRGF5Vmlld01vZGVsKSB7XHJcbiAgICBpZiAoIWRheS5jb250ZXh0LmRpc2FibGVkICYmICFkYXkuaGlkZGVuKSB7XHJcbiAgICAgIHRoaXMuc2VsZWN0LmVtaXQoZGF5LmRhdGUpO1xyXG4gICAgfVxyXG4gIH1cclxufVxyXG4iLCJpbXBvcnQge0NvbXBvbmVudCwgSW5wdXQsIE91dHB1dCwgRXZlbnRFbWl0dGVyLCBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneX0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7TmF2aWdhdGlvbkV2ZW50LCBNb250aFZpZXdNb2RlbH0gZnJvbSAnLi9kYXRlcGlja2VyLXZpZXctbW9kZWwnO1xyXG5pbXBvcnQge05nYkRhdGV9IGZyb20gJy4vbmdiLWRhdGUnO1xyXG5pbXBvcnQge05nYkRhdGVwaWNrZXJJMThufSBmcm9tICcuL2RhdGVwaWNrZXItaTE4bic7XHJcblxyXG4vLyBUaGUgLW1zLSBhbmQgLXdlYmtpdC0gZWxlbWVudCBmb3IgdGhlIENTUyBjYW4gYmUgcmVtb3ZlZCBpZiB3ZSBhcmUgZ2VuZXJhdGluZyB0aGUgQ1NTIHVzaW5nIFNBU1MuXHJcbkBDb21wb25lbnQoe1xyXG4gIHNlbGVjdG9yOiAnbmdiLWRhdGVwaWNrZXItbmF2aWdhdGlvbicsXHJcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2gsXHJcbiAgc3R5bGVzOiBbYFxyXG4gICAgOmhvc3Qge1xyXG4gICAgICBkaXNwbGF5OiAtbXMtZmxleGJveDtcclxuICAgICAgZGlzcGxheTogZmxleDtcclxuICAgICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcclxuICAgIH1cclxuICAgIC5uZ2ItZHAtbmF2aWdhdGlvbi1jaGV2cm9uIHtcclxuICAgICAgYm9yZGVyLXN0eWxlOiBzb2xpZDtcclxuICAgICAgYm9yZGVyLXdpZHRoOiAwLjJlbSAwLjJlbSAwIDA7XHJcbiAgICAgIGRpc3BsYXk6IGlubGluZS1ibG9jaztcclxuICAgICAgd2lkdGg6IDAuNzVlbTtcclxuICAgICAgaGVpZ2h0OiAwLjc1ZW07XHJcbiAgICAgIG1hcmdpbi1sZWZ0OiAwLjI1ZW07XHJcbiAgICAgIG1hcmdpbi1yaWdodDogMC4xNWVtO1xyXG4gICAgICB0cmFuc2Zvcm06IHJvdGF0ZSgtMTM1ZGVnKTtcclxuICAgICAgLW1zLXRyYW5zZm9ybTogcm90YXRlKC0xMzVkZWcpO1xyXG4gICAgfVxyXG4gICAgLnJpZ2h0IC5uZ2ItZHAtbmF2aWdhdGlvbi1jaGV2cm9uIHtcclxuICAgICAgLW1zLXRyYW5zZm9ybTogcm90YXRlKDQ1ZGVnKTtcclxuICAgICAgdHJhbnNmb3JtOiByb3RhdGUoNDVkZWcpO1xyXG4gICAgICBtYXJnaW4tbGVmdDogMC4xNWVtO1xyXG4gICAgICBtYXJnaW4tcmlnaHQ6IDAuMjVlbTtcclxuICAgIH1cclxuICAgIC5uZ2ItZHAtYXJyb3cge1xyXG4gICAgICBkaXNwbGF5OiAtbXMtZmxleGJveDtcclxuICAgICAgZGlzcGxheTogZmxleDtcclxuICAgICAgLW1zLWZsZXg6IDEgMSBhdXRvO1xyXG4gICAgICBmbGV4LWdyb3c6IDE7XHJcbiAgICAgIHBhZGRpbmctcmlnaHQ6IDA7XHJcbiAgICAgIHBhZGRpbmctbGVmdDogMDtcclxuICAgICAgbWFyZ2luOiAwO1xyXG4gICAgICB3aWR0aDogMnJlbTtcclxuICAgICAgaGVpZ2h0OiAycmVtO1xyXG4gICAgfVxyXG4gICAgLm5nYi1kcC1hcnJvdy5yaWdodCB7XHJcbiAgICAgIC1tcy1mbGV4LXBhY2s6IGVuZDtcclxuICAgICAganVzdGlmeS1jb250ZW50OiBmbGV4LWVuZDtcclxuICAgIH1cclxuICAgIC5uZ2ItZHAtYXJyb3ctYnRuIHtcclxuICAgICAgcGFkZGluZzogMCAwLjI1cmVtO1xyXG4gICAgICBtYXJnaW46IDAgMC41cmVtO1xyXG4gICAgICBib3JkZXI6IG5vbmU7XHJcbiAgICAgIGJhY2tncm91bmQtY29sb3I6IHRyYW5zcGFyZW50O1xyXG4gICAgICB6LWluZGV4OiAxO1xyXG4gICAgfVxyXG4gICAgLm5nYi1kcC1hcnJvdy1idG46Zm9jdXMge1xyXG4gICAgICBvdXRsaW5lOiBhdXRvIDFweDtcclxuICAgIH1cclxuICAgIC5uZ2ItZHAtbW9udGgtbmFtZSB7XHJcbiAgICAgIGZvbnQtc2l6ZTogbGFyZ2VyO1xyXG4gICAgICBoZWlnaHQ6IDJyZW07XHJcbiAgICAgIGxpbmUtaGVpZ2h0OiAycmVtO1xyXG4gICAgICB0ZXh0LWFsaWduOiBjZW50ZXI7XHJcbiAgICB9XHJcbiAgICAubmdiLWRwLW5hdmlnYXRpb24tc2VsZWN0IHtcclxuICAgICAgZGlzcGxheTogLW1zLWZsZXhib3g7XHJcbiAgICAgIGRpc3BsYXk6IGZsZXg7XHJcbiAgICAgIC1tcy1mbGV4OiAxIDEgOXJlbTtcclxuICAgICAgZmxleC1ncm93OiAxO1xyXG4gICAgICBmbGV4LWJhc2lzOiA5cmVtO1xyXG4gICAgfVxyXG4gIGBdLFxyXG4gIHRlbXBsYXRlOiBgXHJcbiAgICA8ZGl2IGNsYXNzPVwibmdiLWRwLWFycm93XCI+XHJcbiAgICAgIDxidXR0b24gdHlwZT1cImJ1dHRvblwiIGNsYXNzPVwiYnRuIGJ0bi1saW5rIG5nYi1kcC1hcnJvdy1idG5cIiAoY2xpY2spPVwiISFuYXZpZ2F0ZS5lbWl0KG5hdmlnYXRpb24uUFJFVilcIiBbZGlzYWJsZWRdPVwicHJldkRpc2FibGVkXCJcclxuICAgICAgICAgICAgICBpMThuLWFyaWEtbGFiZWw9XCJAQG5nYi5kYXRlcGlja2VyLnByZXZpb3VzLW1vbnRoXCIgYXJpYS1sYWJlbD1cIlByZXZpb3VzIG1vbnRoXCJcclxuICAgICAgICAgICAgICBpMThuLXRpdGxlPVwiQEBuZ2IuZGF0ZXBpY2tlci5wcmV2aW91cy1tb250aFwiIHRpdGxlPVwiUHJldmlvdXMgbW9udGhcIj5cclxuICAgICAgICA8c3BhbiBjbGFzcz1cIm5nYi1kcC1uYXZpZ2F0aW9uLWNoZXZyb25cIj48L3NwYW4+XHJcbiAgICAgIDwvYnV0dG9uPlxyXG4gICAgPC9kaXY+XHJcbiAgICA8bmdiLWRhdGVwaWNrZXItbmF2aWdhdGlvbi1zZWxlY3QgKm5nSWY9XCJzaG93U2VsZWN0XCIgY2xhc3M9XCJuZ2ItZHAtbmF2aWdhdGlvbi1zZWxlY3RcIlxyXG4gICAgICBbZGF0ZV09XCJkYXRlXCJcclxuICAgICAgW2Rpc2FibGVkXSA9IFwiZGlzYWJsZWRcIlxyXG4gICAgICBbbW9udGhzXT1cInNlbGVjdEJveGVzLm1vbnRoc1wiXHJcbiAgICAgIFt5ZWFyc109XCJzZWxlY3RCb3hlcy55ZWFyc1wiXHJcbiAgICAgIChzZWxlY3QpPVwic2VsZWN0LmVtaXQoJGV2ZW50KVwiPlxyXG4gICAgPC9uZ2ItZGF0ZXBpY2tlci1uYXZpZ2F0aW9uLXNlbGVjdD5cclxuXHJcbiAgICA8bmctdGVtcGxhdGUgKm5nSWY9XCIhc2hvd1NlbGVjdFwiIG5nRm9yIGxldC1tb250aCBbbmdGb3JPZl09XCJtb250aHNcIiBsZXQtaT1cImluZGV4XCI+XHJcbiAgICAgIDxkaXYgY2xhc3M9XCJuZ2ItZHAtYXJyb3dcIiAqbmdJZj1cImkgPiAwXCI+PC9kaXY+XHJcbiAgICAgIDxkaXYgY2xhc3M9XCJuZ2ItZHAtbW9udGgtbmFtZVwiPlxyXG4gICAgICAgIHt7IGkxOG4uZ2V0TW9udGhGdWxsTmFtZShtb250aC5udW1iZXIsIG1vbnRoLnllYXIpIH19IHt7IGkxOG4uZ2V0WWVhck51bWVyYWxzKG1vbnRoLnllYXIpIH19XHJcbiAgICAgIDwvZGl2PlxyXG4gICAgICA8ZGl2IGNsYXNzPVwibmdiLWRwLWFycm93XCIgKm5nSWY9XCJpICE9PSBtb250aHMubGVuZ3RoIC0gMVwiPjwvZGl2PlxyXG4gICAgPC9uZy10ZW1wbGF0ZT5cclxuICAgIDxkaXYgY2xhc3M9XCJuZ2ItZHAtYXJyb3cgcmlnaHRcIj5cclxuICAgICAgPGJ1dHRvbiB0eXBlPVwiYnV0dG9uXCIgY2xhc3M9XCJidG4gYnRuLWxpbmsgbmdiLWRwLWFycm93LWJ0blwiIChjbGljayk9XCIhIW5hdmlnYXRlLmVtaXQobmF2aWdhdGlvbi5ORVhUKVwiIFtkaXNhYmxlZF09XCJuZXh0RGlzYWJsZWRcIlxyXG4gICAgICAgICAgICAgIGkxOG4tYXJpYS1sYWJlbD1cIkBAbmdiLmRhdGVwaWNrZXIubmV4dC1tb250aFwiIGFyaWEtbGFiZWw9XCJOZXh0IG1vbnRoXCJcclxuICAgICAgICAgICAgICBpMThuLXRpdGxlPVwiQEBuZ2IuZGF0ZXBpY2tlci5uZXh0LW1vbnRoXCIgdGl0bGU9XCJOZXh0IG1vbnRoXCI+XHJcbiAgICAgICAgPHNwYW4gY2xhc3M9XCJuZ2ItZHAtbmF2aWdhdGlvbi1jaGV2cm9uXCI+PC9zcGFuPlxyXG4gICAgICA8L2J1dHRvbj5cclxuICAgIDwvZGl2PlxyXG4gICAgYFxyXG59KVxyXG5leHBvcnQgY2xhc3MgTmdiRGF0ZXBpY2tlck5hdmlnYXRpb24ge1xyXG4gIG5hdmlnYXRpb24gPSBOYXZpZ2F0aW9uRXZlbnQ7XHJcblxyXG4gIEBJbnB1dCgpIGRhdGU6IE5nYkRhdGU7XHJcbiAgQElucHV0KCkgZGlzYWJsZWQ6IGJvb2xlYW47XHJcbiAgQElucHV0KCkgbW9udGhzOiBNb250aFZpZXdNb2RlbFtdID0gW107XHJcbiAgQElucHV0KCkgc2hvd1NlbGVjdDogYm9vbGVhbjtcclxuICBASW5wdXQoKSBwcmV2RGlzYWJsZWQ6IGJvb2xlYW47XHJcbiAgQElucHV0KCkgbmV4dERpc2FibGVkOiBib29sZWFuO1xyXG4gIEBJbnB1dCgpIHNlbGVjdEJveGVzOiB7eWVhcnM6IG51bWJlcltdLCBtb250aHM6IG51bWJlcltdfTtcclxuXHJcbiAgQE91dHB1dCgpIG5hdmlnYXRlID0gbmV3IEV2ZW50RW1pdHRlcjxOYXZpZ2F0aW9uRXZlbnQ+KCk7XHJcbiAgQE91dHB1dCgpIHNlbGVjdCA9IG5ldyBFdmVudEVtaXR0ZXI8TmdiRGF0ZT4oKTtcclxuXHJcbiAgY29uc3RydWN0b3IocHVibGljIGkxOG46IE5nYkRhdGVwaWNrZXJJMThuKSB7fVxyXG59XHJcbiIsImltcG9ydCB7cGFkTnVtYmVyLCB0b0ludGVnZXIsIGlzTnVtYmVyfSBmcm9tICcuLi91dGlsL3V0aWwnO1xyXG5pbXBvcnQge05nYkRhdGVTdHJ1Y3R9IGZyb20gJy4vbmdiLWRhdGUtc3RydWN0JztcclxuaW1wb3J0IHtJbmplY3RhYmxlfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBOR0JfREFURVBJQ0tFUl9QQVJTRVJfRk9STUFUVEVSX0ZBQ1RPUlkoKSB7XHJcbiAgcmV0dXJuIG5ldyBOZ2JEYXRlSVNPUGFyc2VyRm9ybWF0dGVyKCk7XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBBYnN0cmFjdCB0eXBlIHNlcnZpbmcgYXMgYSBESSB0b2tlbiBmb3IgdGhlIHNlcnZpY2UgcGFyc2luZyBhbmQgZm9ybWF0dGluZyBkYXRlcyBmb3IgdGhlIE5nYklucHV0RGF0ZXBpY2tlclxyXG4gKiBkaXJlY3RpdmUuIEEgZGVmYXVsdCBpbXBsZW1lbnRhdGlvbiB1c2luZyB0aGUgSVNPIDg2MDEgZm9ybWF0IGlzIHByb3ZpZGVkLCBidXQgeW91IGNhbiBwcm92aWRlIGFub3RoZXIgaW1wbGVtZW50YXRpb25cclxuICogdG8gdXNlIGFuIGFsdGVybmF0aXZlIGZvcm1hdC5cclxuICovXHJcbkBJbmplY3RhYmxlKHtwcm92aWRlZEluOiAncm9vdCcsIHVzZUZhY3Rvcnk6IE5HQl9EQVRFUElDS0VSX1BBUlNFUl9GT1JNQVRURVJfRkFDVE9SWX0pXHJcbmV4cG9ydCBhYnN0cmFjdCBjbGFzcyBOZ2JEYXRlUGFyc2VyRm9ybWF0dGVyIHtcclxuICAvKipcclxuICAgKiBQYXJzZXMgdGhlIGdpdmVuIHZhbHVlIHRvIGFuIE5nYkRhdGVTdHJ1Y3QuIEltcGxlbWVudGF0aW9ucyBzaG91bGQgdHJ5IHRoZWlyIGJlc3QgdG8gcHJvdmlkZSBhIHJlc3VsdCwgZXZlblxyXG4gICAqIHBhcnRpYWwuIFRoZXkgbXVzdCByZXR1cm4gbnVsbCBpZiB0aGUgdmFsdWUgY2FuJ3QgYmUgcGFyc2VkLlxyXG4gICAqIEBwYXJhbSB2YWx1ZSB0aGUgdmFsdWUgdG8gcGFyc2VcclxuICAgKi9cclxuICBhYnN0cmFjdCBwYXJzZSh2YWx1ZTogc3RyaW5nKTogTmdiRGF0ZVN0cnVjdDtcclxuXHJcbiAgLyoqXHJcbiAgICogRm9ybWF0cyB0aGUgZ2l2ZW4gZGF0ZSB0byBhIHN0cmluZy4gSW1wbGVtZW50YXRpb25zIHNob3VsZCByZXR1cm4gYW4gZW1wdHkgc3RyaW5nIGlmIHRoZSBnaXZlbiBkYXRlIGlzIG51bGwsXHJcbiAgICogYW5kIHRyeSB0aGVpciBiZXN0IHRvIHByb3ZpZGUgYSBwYXJ0aWFsIHJlc3VsdCBpZiB0aGUgZ2l2ZW4gZGF0ZSBpcyBpbmNvbXBsZXRlIG9yIGludmFsaWQuXHJcbiAgICogQHBhcmFtIGRhdGUgdGhlIGRhdGUgdG8gZm9ybWF0IGFzIGEgc3RyaW5nXHJcbiAgICovXHJcbiAgYWJzdHJhY3QgZm9ybWF0KGRhdGU6IE5nYkRhdGVTdHJ1Y3QpOiBzdHJpbmc7XHJcbn1cclxuXHJcbkBJbmplY3RhYmxlKClcclxuZXhwb3J0IGNsYXNzIE5nYkRhdGVJU09QYXJzZXJGb3JtYXR0ZXIgZXh0ZW5kcyBOZ2JEYXRlUGFyc2VyRm9ybWF0dGVyIHtcclxuICBwYXJzZSh2YWx1ZTogc3RyaW5nKTogTmdiRGF0ZVN0cnVjdCB7XHJcbiAgICBpZiAodmFsdWUpIHtcclxuICAgICAgY29uc3QgZGF0ZVBhcnRzID0gdmFsdWUudHJpbSgpLnNwbGl0KCctJyk7XHJcbiAgICAgIGlmIChkYXRlUGFydHMubGVuZ3RoID09PSAxICYmIGlzTnVtYmVyKGRhdGVQYXJ0c1swXSkpIHtcclxuICAgICAgICByZXR1cm4ge3llYXI6IHRvSW50ZWdlcihkYXRlUGFydHNbMF0pLCBtb250aDogbnVsbCwgZGF5OiBudWxsfTtcclxuICAgICAgfSBlbHNlIGlmIChkYXRlUGFydHMubGVuZ3RoID09PSAyICYmIGlzTnVtYmVyKGRhdGVQYXJ0c1swXSkgJiYgaXNOdW1iZXIoZGF0ZVBhcnRzWzFdKSkge1xyXG4gICAgICAgIHJldHVybiB7eWVhcjogdG9JbnRlZ2VyKGRhdGVQYXJ0c1swXSksIG1vbnRoOiB0b0ludGVnZXIoZGF0ZVBhcnRzWzFdKSwgZGF5OiBudWxsfTtcclxuICAgICAgfSBlbHNlIGlmIChkYXRlUGFydHMubGVuZ3RoID09PSAzICYmIGlzTnVtYmVyKGRhdGVQYXJ0c1swXSkgJiYgaXNOdW1iZXIoZGF0ZVBhcnRzWzFdKSAmJiBpc051bWJlcihkYXRlUGFydHNbMl0pKSB7XHJcbiAgICAgICAgcmV0dXJuIHt5ZWFyOiB0b0ludGVnZXIoZGF0ZVBhcnRzWzBdKSwgbW9udGg6IHRvSW50ZWdlcihkYXRlUGFydHNbMV0pLCBkYXk6IHRvSW50ZWdlcihkYXRlUGFydHNbMl0pfTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gICAgcmV0dXJuIG51bGw7XHJcbiAgfVxyXG5cclxuICBmb3JtYXQoZGF0ZTogTmdiRGF0ZVN0cnVjdCk6IHN0cmluZyB7XHJcbiAgICByZXR1cm4gZGF0ZSA/XHJcbiAgICAgICAgYCR7ZGF0ZS55ZWFyfS0ke2lzTnVtYmVyKGRhdGUubW9udGgpID8gcGFkTnVtYmVyKGRhdGUubW9udGgpIDogJyd9LSR7aXNOdW1iZXIoZGF0ZS5kYXkpID8gcGFkTnVtYmVyKGRhdGUuZGF5KSA6ICcnfWAgOlxyXG4gICAgICAgICcnO1xyXG4gIH1cclxufVxyXG4iLCIvLyBwcmV2aW91cyB2ZXJzaW9uOlxyXG4vLyBodHRwczovL2dpdGh1Yi5jb20vYW5ndWxhci11aS9ib290c3RyYXAvYmxvYi8wN2MzMWQwNzMxZjdjYjA2OGExOTMyYjhlMDFkMjMxMmI3OTZiNGVjL3NyYy9wb3NpdGlvbi9wb3NpdGlvbi5qc1xyXG5leHBvcnQgY2xhc3MgUG9zaXRpb25pbmcge1xyXG4gIHByaXZhdGUgZ2V0QWxsU3R5bGVzKGVsZW1lbnQ6IEhUTUxFbGVtZW50KSB7IHJldHVybiB3aW5kb3cuZ2V0Q29tcHV0ZWRTdHlsZShlbGVtZW50KTsgfVxyXG5cclxuICBwcml2YXRlIGdldFN0eWxlKGVsZW1lbnQ6IEhUTUxFbGVtZW50LCBwcm9wOiBzdHJpbmcpOiBzdHJpbmcgeyByZXR1cm4gdGhpcy5nZXRBbGxTdHlsZXMoZWxlbWVudClbcHJvcF07IH1cclxuXHJcbiAgcHJpdmF0ZSBpc1N0YXRpY1Bvc2l0aW9uZWQoZWxlbWVudDogSFRNTEVsZW1lbnQpOiBib29sZWFuIHtcclxuICAgIHJldHVybiAodGhpcy5nZXRTdHlsZShlbGVtZW50LCAncG9zaXRpb24nKSB8fCAnc3RhdGljJykgPT09ICdzdGF0aWMnO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBvZmZzZXRQYXJlbnQoZWxlbWVudDogSFRNTEVsZW1lbnQpOiBIVE1MRWxlbWVudCB7XHJcbiAgICBsZXQgb2Zmc2V0UGFyZW50RWwgPSA8SFRNTEVsZW1lbnQ+ZWxlbWVudC5vZmZzZXRQYXJlbnQgfHwgZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50O1xyXG5cclxuICAgIHdoaWxlIChvZmZzZXRQYXJlbnRFbCAmJiBvZmZzZXRQYXJlbnRFbCAhPT0gZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50ICYmIHRoaXMuaXNTdGF0aWNQb3NpdGlvbmVkKG9mZnNldFBhcmVudEVsKSkge1xyXG4gICAgICBvZmZzZXRQYXJlbnRFbCA9IDxIVE1MRWxlbWVudD5vZmZzZXRQYXJlbnRFbC5vZmZzZXRQYXJlbnQ7XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIG9mZnNldFBhcmVudEVsIHx8IGRvY3VtZW50LmRvY3VtZW50RWxlbWVudDtcclxuICB9XHJcblxyXG4gIHBvc2l0aW9uKGVsZW1lbnQ6IEhUTUxFbGVtZW50LCByb3VuZCA9IHRydWUpOiBDbGllbnRSZWN0IHtcclxuICAgIGxldCBlbFBvc2l0aW9uOiBDbGllbnRSZWN0O1xyXG4gICAgbGV0IHBhcmVudE9mZnNldDogQ2xpZW50UmVjdCA9IHt3aWR0aDogMCwgaGVpZ2h0OiAwLCB0b3A6IDAsIGJvdHRvbTogMCwgbGVmdDogMCwgcmlnaHQ6IDB9O1xyXG5cclxuICAgIGlmICh0aGlzLmdldFN0eWxlKGVsZW1lbnQsICdwb3NpdGlvbicpID09PSAnZml4ZWQnKSB7XHJcbiAgICAgIGVsUG9zaXRpb24gPSBlbGVtZW50LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgY29uc3Qgb2Zmc2V0UGFyZW50RWwgPSB0aGlzLm9mZnNldFBhcmVudChlbGVtZW50KTtcclxuXHJcbiAgICAgIGVsUG9zaXRpb24gPSB0aGlzLm9mZnNldChlbGVtZW50LCBmYWxzZSk7XHJcblxyXG4gICAgICBpZiAob2Zmc2V0UGFyZW50RWwgIT09IGRvY3VtZW50LmRvY3VtZW50RWxlbWVudCkge1xyXG4gICAgICAgIHBhcmVudE9mZnNldCA9IHRoaXMub2Zmc2V0KG9mZnNldFBhcmVudEVsLCBmYWxzZSk7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIHBhcmVudE9mZnNldC50b3AgKz0gb2Zmc2V0UGFyZW50RWwuY2xpZW50VG9wO1xyXG4gICAgICBwYXJlbnRPZmZzZXQubGVmdCArPSBvZmZzZXRQYXJlbnRFbC5jbGllbnRMZWZ0O1xyXG4gICAgfVxyXG5cclxuICAgIGVsUG9zaXRpb24udG9wIC09IHBhcmVudE9mZnNldC50b3A7XHJcbiAgICBlbFBvc2l0aW9uLmJvdHRvbSAtPSBwYXJlbnRPZmZzZXQudG9wO1xyXG4gICAgZWxQb3NpdGlvbi5sZWZ0IC09IHBhcmVudE9mZnNldC5sZWZ0O1xyXG4gICAgZWxQb3NpdGlvbi5yaWdodCAtPSBwYXJlbnRPZmZzZXQubGVmdDtcclxuXHJcbiAgICBpZiAocm91bmQpIHtcclxuICAgICAgZWxQb3NpdGlvbi50b3AgPSBNYXRoLnJvdW5kKGVsUG9zaXRpb24udG9wKTtcclxuICAgICAgZWxQb3NpdGlvbi5ib3R0b20gPSBNYXRoLnJvdW5kKGVsUG9zaXRpb24uYm90dG9tKTtcclxuICAgICAgZWxQb3NpdGlvbi5sZWZ0ID0gTWF0aC5yb3VuZChlbFBvc2l0aW9uLmxlZnQpO1xyXG4gICAgICBlbFBvc2l0aW9uLnJpZ2h0ID0gTWF0aC5yb3VuZChlbFBvc2l0aW9uLnJpZ2h0KTtcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gZWxQb3NpdGlvbjtcclxuICB9XHJcblxyXG4gIG9mZnNldChlbGVtZW50OiBIVE1MRWxlbWVudCwgcm91bmQgPSB0cnVlKTogQ2xpZW50UmVjdCB7XHJcbiAgICBjb25zdCBlbEJjciA9IGVsZW1lbnQuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XHJcbiAgICBjb25zdCB2aWV3cG9ydE9mZnNldCA9IHtcclxuICAgICAgdG9wOiB3aW5kb3cucGFnZVlPZmZzZXQgLSBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuY2xpZW50VG9wLFxyXG4gICAgICBsZWZ0OiB3aW5kb3cucGFnZVhPZmZzZXQgLSBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuY2xpZW50TGVmdFxyXG4gICAgfTtcclxuXHJcbiAgICBsZXQgZWxPZmZzZXQgPSB7XHJcbiAgICAgIGhlaWdodDogZWxCY3IuaGVpZ2h0IHx8IGVsZW1lbnQub2Zmc2V0SGVpZ2h0LFxyXG4gICAgICB3aWR0aDogZWxCY3Iud2lkdGggfHwgZWxlbWVudC5vZmZzZXRXaWR0aCxcclxuICAgICAgdG9wOiBlbEJjci50b3AgKyB2aWV3cG9ydE9mZnNldC50b3AsXHJcbiAgICAgIGJvdHRvbTogZWxCY3IuYm90dG9tICsgdmlld3BvcnRPZmZzZXQudG9wLFxyXG4gICAgICBsZWZ0OiBlbEJjci5sZWZ0ICsgdmlld3BvcnRPZmZzZXQubGVmdCxcclxuICAgICAgcmlnaHQ6IGVsQmNyLnJpZ2h0ICsgdmlld3BvcnRPZmZzZXQubGVmdFxyXG4gICAgfTtcclxuXHJcbiAgICBpZiAocm91bmQpIHtcclxuICAgICAgZWxPZmZzZXQuaGVpZ2h0ID0gTWF0aC5yb3VuZChlbE9mZnNldC5oZWlnaHQpO1xyXG4gICAgICBlbE9mZnNldC53aWR0aCA9IE1hdGgucm91bmQoZWxPZmZzZXQud2lkdGgpO1xyXG4gICAgICBlbE9mZnNldC50b3AgPSBNYXRoLnJvdW5kKGVsT2Zmc2V0LnRvcCk7XHJcbiAgICAgIGVsT2Zmc2V0LmJvdHRvbSA9IE1hdGgucm91bmQoZWxPZmZzZXQuYm90dG9tKTtcclxuICAgICAgZWxPZmZzZXQubGVmdCA9IE1hdGgucm91bmQoZWxPZmZzZXQubGVmdCk7XHJcbiAgICAgIGVsT2Zmc2V0LnJpZ2h0ID0gTWF0aC5yb3VuZChlbE9mZnNldC5yaWdodCk7XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIGVsT2Zmc2V0O1xyXG4gIH1cclxuXHJcbiAgcG9zaXRpb25FbGVtZW50cyhob3N0RWxlbWVudDogSFRNTEVsZW1lbnQsIHRhcmdldEVsZW1lbnQ6IEhUTUxFbGVtZW50LCBwbGFjZW1lbnQ6IHN0cmluZywgYXBwZW5kVG9Cb2R5PzogYm9vbGVhbik6XHJcbiAgICAgIENsaWVudFJlY3Qge1xyXG4gICAgY29uc3QgaG9zdEVsUG9zaXRpb24gPSBhcHBlbmRUb0JvZHkgPyB0aGlzLm9mZnNldChob3N0RWxlbWVudCwgZmFsc2UpIDogdGhpcy5wb3NpdGlvbihob3N0RWxlbWVudCwgZmFsc2UpO1xyXG4gICAgY29uc3QgdGFyZ2V0RWxTdHlsZXMgPSB0aGlzLmdldEFsbFN0eWxlcyh0YXJnZXRFbGVtZW50KTtcclxuICAgIGNvbnN0IHRhcmdldEVsQkNSID0gdGFyZ2V0RWxlbWVudC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcclxuICAgIGNvbnN0IHBsYWNlbWVudFByaW1hcnkgPSBwbGFjZW1lbnQuc3BsaXQoJy0nKVswXSB8fCAndG9wJztcclxuICAgIGNvbnN0IHBsYWNlbWVudFNlY29uZGFyeSA9IHBsYWNlbWVudC5zcGxpdCgnLScpWzFdIHx8ICdjZW50ZXInO1xyXG5cclxuICAgIGxldCB0YXJnZXRFbFBvc2l0aW9uOiBDbGllbnRSZWN0ID0ge1xyXG4gICAgICAnaGVpZ2h0JzogdGFyZ2V0RWxCQ1IuaGVpZ2h0IHx8IHRhcmdldEVsZW1lbnQub2Zmc2V0SGVpZ2h0LFxyXG4gICAgICAnd2lkdGgnOiB0YXJnZXRFbEJDUi53aWR0aCB8fCB0YXJnZXRFbGVtZW50Lm9mZnNldFdpZHRoLFxyXG4gICAgICAndG9wJzogMCxcclxuICAgICAgJ2JvdHRvbSc6IHRhcmdldEVsQkNSLmhlaWdodCB8fCB0YXJnZXRFbGVtZW50Lm9mZnNldEhlaWdodCxcclxuICAgICAgJ2xlZnQnOiAwLFxyXG4gICAgICAncmlnaHQnOiB0YXJnZXRFbEJDUi53aWR0aCB8fCB0YXJnZXRFbGVtZW50Lm9mZnNldFdpZHRoXHJcbiAgICB9O1xyXG5cclxuICAgIHN3aXRjaCAocGxhY2VtZW50UHJpbWFyeSkge1xyXG4gICAgICBjYXNlICd0b3AnOlxyXG4gICAgICAgIHRhcmdldEVsUG9zaXRpb24udG9wID1cclxuICAgICAgICAgICAgaG9zdEVsUG9zaXRpb24udG9wIC0gKHRhcmdldEVsZW1lbnQub2Zmc2V0SGVpZ2h0ICsgcGFyc2VGbG9hdCh0YXJnZXRFbFN0eWxlcy5tYXJnaW5Cb3R0b20pKTtcclxuICAgICAgICBicmVhaztcclxuICAgICAgY2FzZSAnYm90dG9tJzpcclxuICAgICAgICB0YXJnZXRFbFBvc2l0aW9uLnRvcCA9IGhvc3RFbFBvc2l0aW9uLnRvcCArIGhvc3RFbFBvc2l0aW9uLmhlaWdodDtcclxuICAgICAgICBicmVhaztcclxuICAgICAgY2FzZSAnbGVmdCc6XHJcbiAgICAgICAgdGFyZ2V0RWxQb3NpdGlvbi5sZWZ0ID1cclxuICAgICAgICAgICAgaG9zdEVsUG9zaXRpb24ubGVmdCAtICh0YXJnZXRFbGVtZW50Lm9mZnNldFdpZHRoICsgcGFyc2VGbG9hdCh0YXJnZXRFbFN0eWxlcy5tYXJnaW5SaWdodCkpO1xyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgICBjYXNlICdyaWdodCc6XHJcbiAgICAgICAgdGFyZ2V0RWxQb3NpdGlvbi5sZWZ0ID0gaG9zdEVsUG9zaXRpb24ubGVmdCArIGhvc3RFbFBvc2l0aW9uLndpZHRoO1xyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgfVxyXG5cclxuICAgIHN3aXRjaCAocGxhY2VtZW50U2Vjb25kYXJ5KSB7XHJcbiAgICAgIGNhc2UgJ3RvcCc6XHJcbiAgICAgICAgdGFyZ2V0RWxQb3NpdGlvbi50b3AgPSBob3N0RWxQb3NpdGlvbi50b3A7XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICAgIGNhc2UgJ2JvdHRvbSc6XHJcbiAgICAgICAgdGFyZ2V0RWxQb3NpdGlvbi50b3AgPSBob3N0RWxQb3NpdGlvbi50b3AgKyBob3N0RWxQb3NpdGlvbi5oZWlnaHQgLSB0YXJnZXRFbGVtZW50Lm9mZnNldEhlaWdodDtcclxuICAgICAgICBicmVhaztcclxuICAgICAgY2FzZSAnbGVmdCc6XHJcbiAgICAgICAgdGFyZ2V0RWxQb3NpdGlvbi5sZWZ0ID0gaG9zdEVsUG9zaXRpb24ubGVmdDtcclxuICAgICAgICBicmVhaztcclxuICAgICAgY2FzZSAncmlnaHQnOlxyXG4gICAgICAgIHRhcmdldEVsUG9zaXRpb24ubGVmdCA9IGhvc3RFbFBvc2l0aW9uLmxlZnQgKyBob3N0RWxQb3NpdGlvbi53aWR0aCAtIHRhcmdldEVsZW1lbnQub2Zmc2V0V2lkdGg7XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICAgIGNhc2UgJ2NlbnRlcic6XHJcbiAgICAgICAgaWYgKHBsYWNlbWVudFByaW1hcnkgPT09ICd0b3AnIHx8IHBsYWNlbWVudFByaW1hcnkgPT09ICdib3R0b20nKSB7XHJcbiAgICAgICAgICB0YXJnZXRFbFBvc2l0aW9uLmxlZnQgPSBob3N0RWxQb3NpdGlvbi5sZWZ0ICsgaG9zdEVsUG9zaXRpb24ud2lkdGggLyAyIC0gdGFyZ2V0RWxlbWVudC5vZmZzZXRXaWR0aCAvIDI7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIHRhcmdldEVsUG9zaXRpb24udG9wID0gaG9zdEVsUG9zaXRpb24udG9wICsgaG9zdEVsUG9zaXRpb24uaGVpZ2h0IC8gMiAtIHRhcmdldEVsZW1lbnQub2Zmc2V0SGVpZ2h0IC8gMjtcclxuICAgICAgICB9XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICB9XHJcblxyXG4gICAgdGFyZ2V0RWxQb3NpdGlvbi50b3AgPSBNYXRoLnJvdW5kKHRhcmdldEVsUG9zaXRpb24udG9wKTtcclxuICAgIHRhcmdldEVsUG9zaXRpb24uYm90dG9tID0gTWF0aC5yb3VuZCh0YXJnZXRFbFBvc2l0aW9uLmJvdHRvbSk7XHJcbiAgICB0YXJnZXRFbFBvc2l0aW9uLmxlZnQgPSBNYXRoLnJvdW5kKHRhcmdldEVsUG9zaXRpb24ubGVmdCk7XHJcbiAgICB0YXJnZXRFbFBvc2l0aW9uLnJpZ2h0ID0gTWF0aC5yb3VuZCh0YXJnZXRFbFBvc2l0aW9uLnJpZ2h0KTtcclxuXHJcbiAgICByZXR1cm4gdGFyZ2V0RWxQb3NpdGlvbjtcclxuICB9XHJcblxyXG4gIC8vIGdldCB0aGUgYXZhaWxhYmxlIHBsYWNlbWVudHMgb2YgdGhlIHRhcmdldCBlbGVtZW50IGluIHRoZSB2aWV3cG9ydCBkZXBlbmRpbmcgb24gdGhlIGhvc3QgZWxlbWVudFxyXG4gIGdldEF2YWlsYWJsZVBsYWNlbWVudHMoaG9zdEVsZW1lbnQ6IEhUTUxFbGVtZW50LCB0YXJnZXRFbGVtZW50OiBIVE1MRWxlbWVudCk6IHN0cmluZ1tdIHtcclxuICAgIGxldCBhdmFpbGFibGVQbGFjZW1lbnRzOiBBcnJheTxzdHJpbmc+ID0gW107XHJcbiAgICBsZXQgaG9zdEVsZW1DbGllbnRSZWN0ID0gaG9zdEVsZW1lbnQuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XHJcbiAgICBsZXQgdGFyZ2V0RWxlbUNsaWVudFJlY3QgPSB0YXJnZXRFbGVtZW50LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xyXG4gICAgbGV0IGh0bWwgPSBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQ7XHJcbiAgICBsZXQgd2luZG93SGVpZ2h0ID0gd2luZG93LmlubmVySGVpZ2h0IHx8IGh0bWwuY2xpZW50SGVpZ2h0O1xyXG4gICAgbGV0IHdpbmRvd1dpZHRoID0gd2luZG93LmlubmVyV2lkdGggfHwgaHRtbC5jbGllbnRXaWR0aDtcclxuICAgIGxldCBob3N0RWxlbUNsaWVudFJlY3RIb3JDZW50ZXIgPSBob3N0RWxlbUNsaWVudFJlY3QubGVmdCArIGhvc3RFbGVtQ2xpZW50UmVjdC53aWR0aCAvIDI7XHJcbiAgICBsZXQgaG9zdEVsZW1DbGllbnRSZWN0VmVyQ2VudGVyID0gaG9zdEVsZW1DbGllbnRSZWN0LnRvcCArIGhvc3RFbGVtQ2xpZW50UmVjdC5oZWlnaHQgLyAyO1xyXG5cclxuICAgIC8vIGxlZnQ6IGNoZWNrIGlmIHRhcmdldCB3aWR0aCBjYW4gYmUgcGxhY2VkIGJldHdlZW4gaG9zdCBsZWZ0IGFuZCB2aWV3cG9ydCBzdGFydCBhbmQgYWxzbyBoZWlnaHQgb2YgdGFyZ2V0IGlzXHJcbiAgICAvLyBpbnNpZGUgdmlld3BvcnRcclxuICAgIGlmICh0YXJnZXRFbGVtQ2xpZW50UmVjdC53aWR0aCA8IGhvc3RFbGVtQ2xpZW50UmVjdC5sZWZ0KSB7XHJcbiAgICAgIC8vIGNoZWNrIGZvciBsZWZ0IG9ubHlcclxuICAgICAgaWYgKGhvc3RFbGVtQ2xpZW50UmVjdFZlckNlbnRlciA+IHRhcmdldEVsZW1DbGllbnRSZWN0LmhlaWdodCAvIDIgJiZcclxuICAgICAgICAgIHdpbmRvd0hlaWdodCAtIGhvc3RFbGVtQ2xpZW50UmVjdFZlckNlbnRlciA+IHRhcmdldEVsZW1DbGllbnRSZWN0LmhlaWdodCAvIDIpIHtcclxuICAgICAgICBhdmFpbGFibGVQbGFjZW1lbnRzLnNwbGljZShhdmFpbGFibGVQbGFjZW1lbnRzLmxlbmd0aCwgMSwgJ2xlZnQnKTtcclxuICAgICAgfVxyXG4gICAgICAvLyBjaGVjayBmb3IgbGVmdC10b3AgYW5kIGxlZnQtYm90dG9tXHJcbiAgICAgIHRoaXMuc2V0U2Vjb25kYXJ5UGxhY2VtZW50Rm9yTGVmdFJpZ2h0KGhvc3RFbGVtQ2xpZW50UmVjdCwgdGFyZ2V0RWxlbUNsaWVudFJlY3QsICdsZWZ0JywgYXZhaWxhYmxlUGxhY2VtZW50cyk7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gdG9wOiB0YXJnZXQgaGVpZ2h0IGlzIGxlc3MgdGhhbiBob3N0IHRvcFxyXG4gICAgaWYgKHRhcmdldEVsZW1DbGllbnRSZWN0LmhlaWdodCA8IGhvc3RFbGVtQ2xpZW50UmVjdC50b3ApIHtcclxuICAgICAgaWYgKGhvc3RFbGVtQ2xpZW50UmVjdEhvckNlbnRlciA+IHRhcmdldEVsZW1DbGllbnRSZWN0LndpZHRoIC8gMiAmJlxyXG4gICAgICAgICAgd2luZG93V2lkdGggLSBob3N0RWxlbUNsaWVudFJlY3RIb3JDZW50ZXIgPiB0YXJnZXRFbGVtQ2xpZW50UmVjdC53aWR0aCAvIDIpIHtcclxuICAgICAgICBhdmFpbGFibGVQbGFjZW1lbnRzLnNwbGljZShhdmFpbGFibGVQbGFjZW1lbnRzLmxlbmd0aCwgMSwgJ3RvcCcpO1xyXG4gICAgICB9XHJcbiAgICAgIHRoaXMuc2V0U2Vjb25kYXJ5UGxhY2VtZW50Rm9yVG9wQm90dG9tKGhvc3RFbGVtQ2xpZW50UmVjdCwgdGFyZ2V0RWxlbUNsaWVudFJlY3QsICd0b3AnLCBhdmFpbGFibGVQbGFjZW1lbnRzKTtcclxuICAgIH1cclxuXHJcbiAgICAvLyByaWdodDogY2hlY2sgaWYgdGFyZ2V0IHdpZHRoIGNhbiBiZSBwbGFjZWQgYmV0d2VlbiBob3N0IHJpZ2h0IGFuZCB2aWV3cG9ydCBlbmQgYW5kIGFsc28gaGVpZ2h0IG9mIHRhcmdldCBpc1xyXG4gICAgLy8gaW5zaWRlIHZpZXdwb3J0XHJcbiAgICBpZiAod2luZG93V2lkdGggLSBob3N0RWxlbUNsaWVudFJlY3QucmlnaHQgPiB0YXJnZXRFbGVtQ2xpZW50UmVjdC53aWR0aCkge1xyXG4gICAgICAvLyBjaGVjayBmb3IgcmlnaHQgb25seVxyXG4gICAgICBpZiAoaG9zdEVsZW1DbGllbnRSZWN0VmVyQ2VudGVyID4gdGFyZ2V0RWxlbUNsaWVudFJlY3QuaGVpZ2h0IC8gMiAmJlxyXG4gICAgICAgICAgd2luZG93SGVpZ2h0IC0gaG9zdEVsZW1DbGllbnRSZWN0VmVyQ2VudGVyID4gdGFyZ2V0RWxlbUNsaWVudFJlY3QuaGVpZ2h0IC8gMikge1xyXG4gICAgICAgIGF2YWlsYWJsZVBsYWNlbWVudHMuc3BsaWNlKGF2YWlsYWJsZVBsYWNlbWVudHMubGVuZ3RoLCAxLCAncmlnaHQnKTtcclxuICAgICAgfVxyXG4gICAgICAvLyBjaGVjayBmb3IgcmlnaHQtdG9wIGFuZCByaWdodC1ib3R0b21cclxuICAgICAgdGhpcy5zZXRTZWNvbmRhcnlQbGFjZW1lbnRGb3JMZWZ0UmlnaHQoaG9zdEVsZW1DbGllbnRSZWN0LCB0YXJnZXRFbGVtQ2xpZW50UmVjdCwgJ3JpZ2h0JywgYXZhaWxhYmxlUGxhY2VtZW50cyk7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gYm90dG9tOiBjaGVjayBpZiB0aGVyZSBpcyBlbm91Z2ggc3BhY2UgYmV0d2VlbiBob3N0IGJvdHRvbSBhbmQgdmlld3BvcnQgZW5kIGZvciB0YXJnZXQgaGVpZ2h0XHJcbiAgICBpZiAod2luZG93SGVpZ2h0IC0gaG9zdEVsZW1DbGllbnRSZWN0LmJvdHRvbSA+IHRhcmdldEVsZW1DbGllbnRSZWN0LmhlaWdodCkge1xyXG4gICAgICBpZiAoaG9zdEVsZW1DbGllbnRSZWN0SG9yQ2VudGVyID4gdGFyZ2V0RWxlbUNsaWVudFJlY3Qud2lkdGggLyAyICYmXHJcbiAgICAgICAgICB3aW5kb3dXaWR0aCAtIGhvc3RFbGVtQ2xpZW50UmVjdEhvckNlbnRlciA+IHRhcmdldEVsZW1DbGllbnRSZWN0LndpZHRoIC8gMikge1xyXG4gICAgICAgIGF2YWlsYWJsZVBsYWNlbWVudHMuc3BsaWNlKGF2YWlsYWJsZVBsYWNlbWVudHMubGVuZ3RoLCAxLCAnYm90dG9tJyk7XHJcbiAgICAgIH1cclxuICAgICAgdGhpcy5zZXRTZWNvbmRhcnlQbGFjZW1lbnRGb3JUb3BCb3R0b20oaG9zdEVsZW1DbGllbnRSZWN0LCB0YXJnZXRFbGVtQ2xpZW50UmVjdCwgJ2JvdHRvbScsIGF2YWlsYWJsZVBsYWNlbWVudHMpO1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiBhdmFpbGFibGVQbGFjZW1lbnRzO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogY2hlY2sgaWYgc2Vjb25kYXJ5IHBsYWNlbWVudCBmb3IgbGVmdCBhbmQgcmlnaHQgYXJlIGF2YWlsYWJsZSBpLmUuIGxlZnQtdG9wLCBsZWZ0LWJvdHRvbSwgcmlnaHQtdG9wLCByaWdodC1ib3R0b21cclxuICAgKiBwcmltYXJ5cGxhY2VtZW50OiBsZWZ0fHJpZ2h0XHJcbiAgICogYXZhaWxhYmxlUGxhY2VtZW50QXJyOiBhcnJheSBpbiB3aGljaCBhdmFpbGFibGUgcGxhY2VtZW50cyB0byBiZSBzZXRcclxuICAgKi9cclxuICBwcml2YXRlIHNldFNlY29uZGFyeVBsYWNlbWVudEZvckxlZnRSaWdodChcclxuICAgICAgaG9zdEVsZW1DbGllbnRSZWN0OiBDbGllbnRSZWN0LCB0YXJnZXRFbGVtQ2xpZW50UmVjdDogQ2xpZW50UmVjdCwgcHJpbWFyeVBsYWNlbWVudDogc3RyaW5nLFxyXG4gICAgICBhdmFpbGFibGVQbGFjZW1lbnRBcnI6IEFycmF5PHN0cmluZz4pIHtcclxuICAgIGxldCBodG1sID0gZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50O1xyXG4gICAgLy8gY2hlY2sgZm9yIGxlZnQtYm90dG9tXHJcbiAgICBpZiAodGFyZ2V0RWxlbUNsaWVudFJlY3QuaGVpZ2h0IDw9IGhvc3RFbGVtQ2xpZW50UmVjdC5ib3R0b20pIHtcclxuICAgICAgYXZhaWxhYmxlUGxhY2VtZW50QXJyLnNwbGljZShhdmFpbGFibGVQbGFjZW1lbnRBcnIubGVuZ3RoLCAxLCBwcmltYXJ5UGxhY2VtZW50ICsgJy1ib3R0b20nKTtcclxuICAgIH1cclxuICAgIGlmICgod2luZG93LmlubmVySGVpZ2h0IHx8IGh0bWwuY2xpZW50SGVpZ2h0KSAtIGhvc3RFbGVtQ2xpZW50UmVjdC50b3AgPj0gdGFyZ2V0RWxlbUNsaWVudFJlY3QuaGVpZ2h0KSB7XHJcbiAgICAgIGF2YWlsYWJsZVBsYWNlbWVudEFyci5zcGxpY2UoYXZhaWxhYmxlUGxhY2VtZW50QXJyLmxlbmd0aCwgMSwgcHJpbWFyeVBsYWNlbWVudCArICctdG9wJyk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBjaGVjayBpZiBzZWNvbmRhcnkgcGxhY2VtZW50IGZvciB0b3AgYW5kIGJvdHRvbSBhcmUgYXZhaWxhYmxlIGkuZS4gdG9wLWxlZnQsIHRvcC1yaWdodCwgYm90dG9tLWxlZnQsIGJvdHRvbS1yaWdodFxyXG4gICAqIHByaW1hcnlwbGFjZW1lbnQ6IHRvcHxib3R0b21cclxuICAgKiBhdmFpbGFibGVQbGFjZW1lbnRBcnI6IGFycmF5IGluIHdoaWNoIGF2YWlsYWJsZSBwbGFjZW1lbnRzIHRvIGJlIHNldFxyXG4gICAqL1xyXG4gIHByaXZhdGUgc2V0U2Vjb25kYXJ5UGxhY2VtZW50Rm9yVG9wQm90dG9tKFxyXG4gICAgICBob3N0RWxlbUNsaWVudFJlY3Q6IENsaWVudFJlY3QsIHRhcmdldEVsZW1DbGllbnRSZWN0OiBDbGllbnRSZWN0LCBwcmltYXJ5UGxhY2VtZW50OiBzdHJpbmcsXHJcbiAgICAgIGF2YWlsYWJsZVBsYWNlbWVudEFycjogQXJyYXk8c3RyaW5nPikge1xyXG4gICAgbGV0IGh0bWwgPSBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQ7XHJcbiAgICAvLyBjaGVjayBmb3IgbGVmdC1ib3R0b21cclxuICAgIGlmICgod2luZG93LmlubmVyV2lkdGggfHwgaHRtbC5jbGllbnRXaWR0aCkgLSBob3N0RWxlbUNsaWVudFJlY3QubGVmdCA+PSB0YXJnZXRFbGVtQ2xpZW50UmVjdC53aWR0aCkge1xyXG4gICAgICBhdmFpbGFibGVQbGFjZW1lbnRBcnIuc3BsaWNlKGF2YWlsYWJsZVBsYWNlbWVudEFyci5sZW5ndGgsIDEsIHByaW1hcnlQbGFjZW1lbnQgKyAnLWxlZnQnKTtcclxuICAgIH1cclxuICAgIGlmICh0YXJnZXRFbGVtQ2xpZW50UmVjdC53aWR0aCA8PSBob3N0RWxlbUNsaWVudFJlY3QucmlnaHQpIHtcclxuICAgICAgYXZhaWxhYmxlUGxhY2VtZW50QXJyLnNwbGljZShhdmFpbGFibGVQbGFjZW1lbnRBcnIubGVuZ3RoLCAxLCBwcmltYXJ5UGxhY2VtZW50ICsgJy1yaWdodCcpO1xyXG4gICAgfVxyXG4gIH1cclxufVxyXG5cclxuY29uc3QgcG9zaXRpb25TZXJ2aWNlID0gbmV3IFBvc2l0aW9uaW5nKCk7XHJcblxyXG4vKlxyXG4gKiBBY2NlcHQgdGhlIHBsYWNlbWVudCBhcnJheSBhbmQgYXBwbGllcyB0aGUgYXBwcm9wcmlhdGUgcGxhY2VtZW50IGRlcGVuZGVudCBvbiB0aGUgdmlld3BvcnQuXHJcbiAqIFJldHVybnMgdGhlIGFwcGxpZWQgcGxhY2VtZW50LlxyXG4gKiBJbiBjYXNlIG9mIGF1dG8gcGxhY2VtZW50LCBwbGFjZW1lbnRzIGFyZSBzZWxlY3RlZCBpbiBvcmRlclxyXG4gKiAgICd0b3AnLCAnYm90dG9tJywgJ2xlZnQnLCAncmlnaHQnLFxyXG4gKiAgICd0b3AtbGVmdCcsICd0b3AtcmlnaHQnLFxyXG4gKiAgICdib3R0b20tbGVmdCcsICdib3R0b20tcmlnaHQnLFxyXG4gKiAgICdsZWZ0LXRvcCcsICdsZWZ0LWJvdHRvbScsXHJcbiAqICAgJ3JpZ2h0LXRvcCcsICdyaWdodC1ib3R0b20nLlxyXG4gKiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gcG9zaXRpb25FbGVtZW50cyhcclxuICAgIGhvc3RFbGVtZW50OiBIVE1MRWxlbWVudCwgdGFyZ2V0RWxlbWVudDogSFRNTEVsZW1lbnQsIHBsYWNlbWVudDogc3RyaW5nIHwgUGxhY2VtZW50IHwgUGxhY2VtZW50QXJyYXksXHJcbiAgICBhcHBlbmRUb0JvZHk/OiBib29sZWFuKTogUGxhY2VtZW50IHtcclxuICBsZXQgcGxhY2VtZW50VmFsczogQXJyYXk8UGxhY2VtZW50PiA9IEFycmF5LmlzQXJyYXkocGxhY2VtZW50KSA/IHBsYWNlbWVudCA6IFtwbGFjZW1lbnQgYXMgUGxhY2VtZW50XTtcclxuXHJcbiAgLy8gcmVwbGFjZSBhdXRvIHBsYWNlbWVudCB3aXRoIG90aGVyIHBsYWNlbWVudHNcclxuICBsZXQgaGFzQXV0byA9IHBsYWNlbWVudFZhbHMuZmluZEluZGV4KHZhbCA9PiB2YWwgPT09ICdhdXRvJyk7XHJcbiAgaWYgKGhhc0F1dG8gPj0gMCkge1xyXG4gICAgWyd0b3AnLCAnYm90dG9tJywgJ2xlZnQnLCAncmlnaHQnLCAndG9wLWxlZnQnLCAndG9wLXJpZ2h0JywgJ2JvdHRvbS1sZWZ0JywgJ2JvdHRvbS1yaWdodCcsICdsZWZ0LXRvcCcsXHJcbiAgICAgJ2xlZnQtYm90dG9tJywgJ3JpZ2h0LXRvcCcsICdyaWdodC1ib3R0b20nLFxyXG4gICAgXS5mb3JFYWNoKGZ1bmN0aW9uKG9iaikge1xyXG4gICAgICBpZiAocGxhY2VtZW50VmFscy5maW5kKHZhbCA9PiB2YWwuc2VhcmNoKCdeJyArIG9iaikgIT09IC0xKSA9PSBudWxsKSB7XHJcbiAgICAgICAgcGxhY2VtZW50VmFscy5zcGxpY2UoaGFzQXV0bysrLCAxLCBvYmogYXMgUGxhY2VtZW50KTtcclxuICAgICAgfVxyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICAvLyBjb29yZGluYXRlcyB3aGVyZSB0byBwb3NpdGlvblxyXG4gIGxldCB0b3BWYWwgPSAwLCBsZWZ0VmFsID0gMDtcclxuICBsZXQgYXBwbGllZFBsYWNlbWVudDogUGxhY2VtZW50O1xyXG4gIC8vIGdldCBhdmFpbGFibGUgcGxhY2VtZW50c1xyXG4gIGxldCBhdmFpbGFibGVQbGFjZW1lbnRzID0gcG9zaXRpb25TZXJ2aWNlLmdldEF2YWlsYWJsZVBsYWNlbWVudHMoaG9zdEVsZW1lbnQsIHRhcmdldEVsZW1lbnQpO1xyXG4gIC8vIGl0ZXJhdGUgb3ZlciBhbGwgdGhlIHBhc3NlZCBwbGFjZW1lbnRzXHJcbiAgZm9yIChsZXQgeyBpdGVtLCBpbmRleCB9IG9mIHRvSXRlbUluZGV4ZXMocGxhY2VtZW50VmFscykpIHtcclxuICAgIC8vIGNoZWNrIGlmIHBhc3NlZCBwbGFjZW1lbnQgaXMgcHJlc2VudCBpbiB0aGUgYXZhaWxhYmxlIHBsYWNlbWVudCBvciBvdGhlcndpc2UgYXBwbHkgdGhlIGxhc3QgcGxhY2VtZW50IGluIHRoZVxyXG4gICAgLy8gcGFzc2VkIHBsYWNlbWVudCBsaXN0XHJcbiAgICBpZiAoKGF2YWlsYWJsZVBsYWNlbWVudHMuZmluZCh2YWwgPT4gdmFsID09PSBpdGVtKSAhPSBudWxsKSB8fCAocGxhY2VtZW50VmFscy5sZW5ndGggPT09IGluZGV4ICsgMSkpIHtcclxuICAgICAgYXBwbGllZFBsYWNlbWVudCA9IDxQbGFjZW1lbnQ+aXRlbTtcclxuICAgICAgY29uc3QgcG9zID0gcG9zaXRpb25TZXJ2aWNlLnBvc2l0aW9uRWxlbWVudHMoaG9zdEVsZW1lbnQsIHRhcmdldEVsZW1lbnQsIGl0ZW0sIGFwcGVuZFRvQm9keSk7XHJcbiAgICAgIHRvcFZhbCA9IHBvcy50b3A7XHJcbiAgICAgIGxlZnRWYWwgPSBwb3MubGVmdDtcclxuICAgICAgYnJlYWs7XHJcbiAgICB9XHJcbiAgfVxyXG4gIHRhcmdldEVsZW1lbnQuc3R5bGUudG9wID0gYCR7dG9wVmFsfXB4YDtcclxuICB0YXJnZXRFbGVtZW50LnN0eWxlLmxlZnQgPSBgJHtsZWZ0VmFsfXB4YDtcclxuICByZXR1cm4gYXBwbGllZFBsYWNlbWVudDtcclxufVxyXG5cclxuLy8gZnVuY3Rpb24gdG8gZ2V0IGluZGV4IGFuZCBpdGVtIG9mIGFuIGFycmF5XHJcbmZ1bmN0aW9uIHRvSXRlbUluZGV4ZXM8VD4oYTogVFtdKSB7XHJcbiAgcmV0dXJuIGEubWFwKChpdGVtLCBpbmRleCkgPT4gKHtpdGVtLCBpbmRleH0pKTtcclxufVxyXG5cclxuZXhwb3J0IHR5cGUgUGxhY2VtZW50ID0gJ2F1dG8nIHwgJ3RvcCcgfCAnYm90dG9tJyB8ICdsZWZ0JyB8ICdyaWdodCcgfCAndG9wLWxlZnQnIHwgJ3RvcC1yaWdodCcgfCAnYm90dG9tLWxlZnQnIHxcclxuICAgICdib3R0b20tcmlnaHQnIHwgJ2xlZnQtdG9wJyB8ICdsZWZ0LWJvdHRvbScgfCAncmlnaHQtdG9wJyB8ICdyaWdodC1ib3R0b20nO1xyXG5cclxuZXhwb3J0IHR5cGUgUGxhY2VtZW50QXJyYXkgPSBQbGFjZW1lbnQgfCBBcnJheTxQbGFjZW1lbnQ+O1xyXG4iLCJpbXBvcnQge2Zyb21FdmVudCwgT2JzZXJ2YWJsZX0gZnJvbSAncnhqcyc7XHJcbmltcG9ydCB7ZmlsdGVyLCBtYXAsIHRha2VVbnRpbCwgd2l0aExhdGVzdEZyb219IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcclxuaW1wb3J0IHtLZXl9IGZyb20gJy4uL3V0aWwva2V5JztcclxuXHJcbmNvbnN0IEZPQ1VTQUJMRV9FTEVNRU5UU19TRUxFQ1RPUiA9IFtcclxuICAnYVtocmVmXScsICdidXR0b246bm90KFtkaXNhYmxlZF0pJywgJ2lucHV0Om5vdChbZGlzYWJsZWRdKTpub3QoW3R5cGU9XCJoaWRkZW5cIl0pJywgJ3NlbGVjdDpub3QoW2Rpc2FibGVkXSknLFxyXG4gICd0ZXh0YXJlYTpub3QoW2Rpc2FibGVkXSknLCAnW2NvbnRlbnRlZGl0YWJsZV0nLCAnW3RhYmluZGV4XTpub3QoW3RhYmluZGV4PVwiLTFcIl0pJ1xyXG5dLmpvaW4oJywgJyk7XHJcblxyXG4vKipcclxuICogUmV0dXJucyBmaXJzdCBhbmQgbGFzdCBmb2N1c2FibGUgZWxlbWVudHMgaW5zaWRlIG9mIGEgZ2l2ZW4gZWxlbWVudCBiYXNlZCBvbiBzcGVjaWZpYyBDU1Mgc2VsZWN0b3JcclxuICovXHJcbmZ1bmN0aW9uIGdldEZvY3VzYWJsZUJvdW5kYXJ5RWxlbWVudHMoZWxlbWVudDogSFRNTEVsZW1lbnQpOiBIVE1MRWxlbWVudFtdIHtcclxuICBjb25zdCBsaXN0OiBOb2RlTGlzdE9mPEhUTUxFbGVtZW50PiA9IGVsZW1lbnQucXVlcnlTZWxlY3RvckFsbChGT0NVU0FCTEVfRUxFTUVOVFNfU0VMRUNUT1IpO1xyXG4gIHJldHVybiBbbGlzdFswXSwgbGlzdFtsaXN0Lmxlbmd0aCAtIDFdXTtcclxufVxyXG5cclxuLyoqXHJcbiAqIEZ1bmN0aW9uIHRoYXQgZW5mb3JjZXMgYnJvd3NlciBmb2N1cyB0byBiZSB0cmFwcGVkIGluc2lkZSBhIERPTSBlbGVtZW50LlxyXG4gKlxyXG4gKiBXb3JrcyBvbmx5IGZvciBjbGlja3MgaW5zaWRlIHRoZSBlbGVtZW50IGFuZCBuYXZpZ2F0aW9uIHdpdGggJ1RhYicsIGlnbm9yaW5nIGNsaWNrcyBvdXRzaWRlIG9mIHRoZSBlbGVtZW50XHJcbiAqXHJcbiAqIEBwYXJhbSBlbGVtZW50IFRoZSBlbGVtZW50IGFyb3VuZCB3aGljaCBmb2N1cyB3aWxsIGJlIHRyYXBwZWQgaW5zaWRlXHJcbiAqIEBwYXJhbSBzdG9wRm9jdXNUcmFwJCBUaGUgb2JzZXJ2YWJsZSBzdHJlYW0uIFdoZW4gY29tcGxldGVkIHRoZSBmb2N1cyB0cmFwIHdpbGwgY2xlYW4gdXAgbGlzdGVuZXJzXHJcbiAqIGFuZCBmcmVlIGludGVybmFsIHJlc291cmNlc1xyXG4gKi9cclxuZXhwb3J0IGNvbnN0IG5nYkZvY3VzVHJhcCA9IChlbGVtZW50OiBIVE1MRWxlbWVudCwgc3RvcEZvY3VzVHJhcCQ6IE9ic2VydmFibGU8YW55PikgPT4ge1xyXG4gIC8vIGxhc3QgZm9jdXNlZCBlbGVtZW50XHJcbiAgY29uc3QgbGFzdEZvY3VzZWRFbGVtZW50JCA9XHJcbiAgICAgIGZyb21FdmVudDxGb2N1c0V2ZW50PihlbGVtZW50LCAnZm9jdXNpbicpLnBpcGUodGFrZVVudGlsKHN0b3BGb2N1c1RyYXAkKSwgbWFwKGUgPT4gZS50YXJnZXQpKTtcclxuXHJcbiAgLy8gJ3RhYicgLyAnc2hpZnQrdGFiJyBzdHJlYW1cclxuICBmcm9tRXZlbnQ8S2V5Ym9hcmRFdmVudD4oZWxlbWVudCwgJ2tleWRvd24nKVxyXG4gICAgICAucGlwZSh0YWtlVW50aWwoc3RvcEZvY3VzVHJhcCQpLCBmaWx0ZXIoZSA9PiBlLndoaWNoID09PSBLZXkuVGFiKSwgd2l0aExhdGVzdEZyb20obGFzdEZvY3VzZWRFbGVtZW50JCkpXHJcbiAgICAgIC5zdWJzY3JpYmUoKFt0YWJFdmVudCwgZm9jdXNlZEVsZW1lbnRdKSA9PiB7XHJcbiAgICAgICAgY29uc3RbZmlyc3QsIGxhc3RdID0gZ2V0Rm9jdXNhYmxlQm91bmRhcnlFbGVtZW50cyhlbGVtZW50KTtcclxuXHJcbiAgICAgICAgaWYgKGZvY3VzZWRFbGVtZW50ID09PSBmaXJzdCAmJiB0YWJFdmVudC5zaGlmdEtleSkge1xyXG4gICAgICAgICAgbGFzdC5mb2N1cygpO1xyXG4gICAgICAgICAgdGFiRXZlbnQucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmIChmb2N1c2VkRWxlbWVudCA9PT0gbGFzdCAmJiAhdGFiRXZlbnQuc2hpZnRLZXkpIHtcclxuICAgICAgICAgIGZpcnN0LmZvY3VzKCk7XHJcbiAgICAgICAgICB0YWJFdmVudC5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAgIH1cclxuICAgICAgfSk7XHJcblxyXG4gIC8vIGluc2lkZSBjbGlja1xyXG4gIGZyb21FdmVudChlbGVtZW50LCAnY2xpY2snKVxyXG4gICAgICAucGlwZSh0YWtlVW50aWwoc3RvcEZvY3VzVHJhcCQpLCB3aXRoTGF0ZXN0RnJvbShsYXN0Rm9jdXNlZEVsZW1lbnQkKSwgbWFwKGFyciA9PiBhcnJbMV0gYXMgSFRNTEVsZW1lbnQpKVxyXG4gICAgICAuc3Vic2NyaWJlKGxhc3RGb2N1c2VkRWxlbWVudCA9PiBsYXN0Rm9jdXNlZEVsZW1lbnQuZm9jdXMoKSk7XHJcbn07XHJcbiIsImltcG9ydCB7XHJcbiAgRGlyZWN0aXZlLFxyXG4gIElucHV0LFxyXG4gIENvbXBvbmVudFJlZixcclxuICBFbGVtZW50UmVmLFxyXG4gIFZpZXdDb250YWluZXJSZWYsXHJcbiAgUmVuZGVyZXIyLFxyXG4gIENvbXBvbmVudEZhY3RvcnlSZXNvbHZlcixcclxuICBOZ1pvbmUsXHJcbiAgVGVtcGxhdGVSZWYsXHJcbiAgZm9yd2FyZFJlZixcclxuICBFdmVudEVtaXR0ZXIsXHJcbiAgT3V0cHV0LFxyXG4gIE9uQ2hhbmdlcyxcclxuICBPbkRlc3Ryb3ksXHJcbiAgU2ltcGxlQ2hhbmdlcyxcclxuICBJbmplY3RcclxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHtBYnN0cmFjdENvbnRyb2wsIENvbnRyb2xWYWx1ZUFjY2Vzc29yLCBWYWxpZGF0b3IsIE5HX1ZBTFVFX0FDQ0VTU09SLCBOR19WQUxJREFUT1JTfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XHJcbmltcG9ydCB7RE9DVU1FTlR9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XHJcblxyXG5pbXBvcnQge05nYkRhdGV9IGZyb20gJy4vbmdiLWRhdGUnO1xyXG5pbXBvcnQge05nYkRhdGVwaWNrZXIsIE5nYkRhdGVwaWNrZXJOYXZpZ2F0ZUV2ZW50fSBmcm9tICcuL2RhdGVwaWNrZXInO1xyXG5pbXBvcnQge0RheVRlbXBsYXRlQ29udGV4dH0gZnJvbSAnLi9kYXRlcGlja2VyLWRheS10ZW1wbGF0ZS1jb250ZXh0JztcclxuaW1wb3J0IHtOZ2JEYXRlUGFyc2VyRm9ybWF0dGVyfSBmcm9tICcuL25nYi1kYXRlLXBhcnNlci1mb3JtYXR0ZXInO1xyXG5cclxuaW1wb3J0IHtwb3NpdGlvbkVsZW1lbnRzLCBQbGFjZW1lbnRBcnJheX0gZnJvbSAnLi4vdXRpbC9wb3NpdGlvbmluZyc7XHJcbmltcG9ydCB7bmdiRm9jdXNUcmFwfSBmcm9tICcuLi91dGlsL2ZvY3VzLXRyYXAnO1xyXG5pbXBvcnQge0tleX0gZnJvbSAnLi4vdXRpbC9rZXknO1xyXG5pbXBvcnQge05nYkRhdGVTdHJ1Y3R9IGZyb20gJy4vbmdiLWRhdGUtc3RydWN0JztcclxuaW1wb3J0IHtOZ2JEYXRlQWRhcHRlcn0gZnJvbSAnLi9hZGFwdGVycy9uZ2ItZGF0ZS1hZGFwdGVyJztcclxuaW1wb3J0IHtOZ2JDYWxlbmRhcn0gZnJvbSAnLi9uZ2ItY2FsZW5kYXInO1xyXG5pbXBvcnQge05nYkRhdGVwaWNrZXJTZXJ2aWNlfSBmcm9tICcuL2RhdGVwaWNrZXItc2VydmljZSc7XHJcblxyXG5pbXBvcnQge1N1YmplY3QsIGZyb21FdmVudCwgcmFjZSwgTkVWRVJ9IGZyb20gJ3J4anMnO1xyXG5pbXBvcnQge2ZpbHRlciwgdGFrZVVudGlsfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XHJcblxyXG5jb25zdCBOR0JfREFURVBJQ0tFUl9WQUxVRV9BQ0NFU1NPUiA9IHtcclxuICBwcm92aWRlOiBOR19WQUxVRV9BQ0NFU1NPUixcclxuICB1c2VFeGlzdGluZzogZm9yd2FyZFJlZigoKSA9PiBOZ2JJbnB1dERhdGVwaWNrZXIpLFxyXG4gIG11bHRpOiB0cnVlXHJcbn07XHJcblxyXG5jb25zdCBOR0JfREFURVBJQ0tFUl9WQUxJREFUT1IgPSB7XHJcbiAgcHJvdmlkZTogTkdfVkFMSURBVE9SUyxcclxuICB1c2VFeGlzdGluZzogZm9yd2FyZFJlZigoKSA9PiBOZ2JJbnB1dERhdGVwaWNrZXIpLFxyXG4gIG11bHRpOiB0cnVlXHJcbn07XHJcblxyXG4vKipcclxuICogQSBkaXJlY3RpdmUgdGhhdCBtYWtlcyBpdCBwb3NzaWJsZSB0byBoYXZlIGRhdGVwaWNrZXJzIG9uIGlucHV0IGZpZWxkcy5cclxuICogTWFuYWdlcyBpbnRlZ3JhdGlvbiB3aXRoIHRoZSBpbnB1dCBmaWVsZCBpdHNlbGYgKGRhdGEgZW50cnkpIGFuZCBuZ01vZGVsICh2YWxpZGF0aW9uIGV0Yy4pLlxyXG4gKi9cclxuQERpcmVjdGl2ZSh7XHJcbiAgc2VsZWN0b3I6ICdpbnB1dFtuZ2JEYXRlcGlja2VyXScsXHJcbiAgZXhwb3J0QXM6ICduZ2JEYXRlcGlja2VyJyxcclxuICBob3N0OiB7XHJcbiAgICAnKGlucHV0KSc6ICdtYW51YWxEYXRlQ2hhbmdlKCRldmVudC50YXJnZXQudmFsdWUpJyxcclxuICAgICcoY2hhbmdlKSc6ICdtYW51YWxEYXRlQ2hhbmdlKCRldmVudC50YXJnZXQudmFsdWUsIHRydWUpJyxcclxuICAgICcoYmx1ciknOiAnb25CbHVyKCknLFxyXG4gICAgJ1tkaXNhYmxlZF0nOiAnZGlzYWJsZWQnXHJcbiAgfSxcclxuICBwcm92aWRlcnM6IFtOR0JfREFURVBJQ0tFUl9WQUxVRV9BQ0NFU1NPUiwgTkdCX0RBVEVQSUNLRVJfVkFMSURBVE9SLCBOZ2JEYXRlcGlja2VyU2VydmljZV1cclxufSlcclxuZXhwb3J0IGNsYXNzIE5nYklucHV0RGF0ZXBpY2tlciBpbXBsZW1lbnRzIE9uQ2hhbmdlcyxcclxuICAgIE9uRGVzdHJveSwgQ29udHJvbFZhbHVlQWNjZXNzb3IsIFZhbGlkYXRvciB7XHJcbiAgcHJpdmF0ZSBfY2xvc2VkJCA9IG5ldyBTdWJqZWN0KCk7XHJcbiAgcHJpdmF0ZSBfY1JlZjogQ29tcG9uZW50UmVmPE5nYkRhdGVwaWNrZXI+ID0gbnVsbDtcclxuICBwcml2YXRlIF9kaXNhYmxlZCA9IGZhbHNlO1xyXG4gIHByaXZhdGUgX21vZGVsOiBOZ2JEYXRlO1xyXG4gIHByaXZhdGUgX3pvbmVTdWJzY3JpcHRpb246IGFueTtcclxuXHJcbiAgLyoqXHJcbiAgICogSW5kaWNhdGVzIHdoZXRoZXIgdGhlIGRhdGVwaWNrZXIgcG9wdXAgc2hvdWxkIGJlIGNsb3NlZCBhdXRvbWF0aWNhbGx5IGFmdGVyIGRhdGUgc2VsZWN0aW9uIC8gb3V0c2lkZSBjbGljayBvciBub3QuXHJcbiAgICpcclxuICAgKiBCeSBkZWZhdWx0IHRoZSBwb3B1cCB3aWxsIGNsb3NlIG9uIGJvdGggZGF0ZSBzZWxlY3Rpb24gYW5kIG91dHNpZGUgY2xpY2suIElmIHRoZSB2YWx1ZSBpcyAnZmFsc2UnIHRoZSBwb3B1cCBoYXMgdG9cclxuICAgKiBiZSBjbG9zZWQgbWFudWFsbHkgdmlhICcuY2xvc2UoKScgb3IgJy50b2dnbGUoKScgbWV0aG9kcy4gSWYgdGhlIHZhbHVlIGlzIHNldCB0byAnaW5zaWRlJyB0aGUgcG9wdXAgd2lsbCBjbG9zZSBvblxyXG4gICAqIGRhdGUgc2VsZWN0aW9uIG9ubHkuIEZvciB0aGUgJ291dHNpZGUnIHRoZSBwb3B1cCB3aWxsIGNsb3NlIG9ubHkgb24gdGhlIG91dHNpZGUgY2xpY2suXHJcbiAgICpcclxuICAgKiBAc2luY2UgMy4wLjBcclxuICAgKi9cclxuICBASW5wdXQoKSBhdXRvQ2xvc2U6IGJvb2xlYW4gfCAnaW5zaWRlJyB8ICdvdXRzaWRlJyA9IHRydWU7XHJcblxyXG4gIC8qKlxyXG4gICAqIFJlZmVyZW5jZSBmb3IgdGhlIGN1c3RvbSB0ZW1wbGF0ZSBmb3IgdGhlIGRheSBkaXNwbGF5XHJcbiAgICovXHJcbiAgQElucHV0KCkgZGF5VGVtcGxhdGU6IFRlbXBsYXRlUmVmPERheVRlbXBsYXRlQ29udGV4dD47XHJcblxyXG4gIC8qKlxyXG4gICAqIE51bWJlciBvZiBtb250aHMgdG8gZGlzcGxheVxyXG4gICAqL1xyXG4gIEBJbnB1dCgpIGRpc3BsYXlNb250aHM6IG51bWJlcjtcclxuXHJcbiAgLyoqXHJcbiAgICogRmlyc3QgZGF5IG9mIHRoZSB3ZWVrLiBXaXRoIGRlZmF1bHQgY2FsZW5kYXIgd2UgdXNlIElTTyA4NjAxOiAxPU1vbiAuLi4gNz1TdW5cclxuICAgKi9cclxuICBASW5wdXQoKSBmaXJzdERheU9mV2VlazogbnVtYmVyO1xyXG5cclxuICAvKipcclxuICAgKiBDYWxsYmFjayB0byBtYXJrIGEgZ2l2ZW4gZGF0ZSBhcyBkaXNhYmxlZC5cclxuICAgKiAnQ3VycmVudCcgY29udGFpbnMgdGhlIG1vbnRoIHRoYXQgd2lsbCBiZSBkaXNwbGF5ZWQgaW4gdGhlIHZpZXdcclxuICAgKi9cclxuICBASW5wdXQoKSBtYXJrRGlzYWJsZWQ6IChkYXRlOiBOZ2JEYXRlLCBjdXJyZW50OiB7eWVhcjogbnVtYmVyLCBtb250aDogbnVtYmVyfSkgPT4gYm9vbGVhbjtcclxuXHJcbiAgLyoqXHJcbiAgICogTWluIGRhdGUgZm9yIHRoZSBuYXZpZ2F0aW9uLiBJZiBub3QgcHJvdmlkZWQgd2lsbCBiZSAxMCB5ZWFycyBiZWZvcmUgdG9kYXkgb3IgYHN0YXJ0RGF0ZWBcclxuICAgKi9cclxuICBASW5wdXQoKSBtaW5EYXRlOiBOZ2JEYXRlU3RydWN0O1xyXG5cclxuICAvKipcclxuICAgKiBNYXggZGF0ZSBmb3IgdGhlIG5hdmlnYXRpb24uIElmIG5vdCBwcm92aWRlZCB3aWxsIGJlIDEwIHllYXJzIGZyb20gdG9kYXkgb3IgYHN0YXJ0RGF0ZWBcclxuICAgKi9cclxuICBASW5wdXQoKSBtYXhEYXRlOiBOZ2JEYXRlU3RydWN0O1xyXG5cclxuICAvKipcclxuICAgKiBOYXZpZ2F0aW9uIHR5cGU6IGBzZWxlY3RgIChkZWZhdWx0IHdpdGggc2VsZWN0IGJveGVzIGZvciBtb250aCBhbmQgeWVhciksIGBhcnJvd3NgXHJcbiAgICogKHdpdGhvdXQgc2VsZWN0IGJveGVzLCBvbmx5IG5hdmlnYXRpb24gYXJyb3dzKSBvciBgbm9uZWAgKG5vIG5hdmlnYXRpb24gYXQgYWxsKVxyXG4gICAqL1xyXG4gIEBJbnB1dCgpIG5hdmlnYXRpb246ICdzZWxlY3QnIHwgJ2Fycm93cycgfCAnbm9uZSc7XHJcblxyXG4gIC8qKlxyXG4gICAqIFRoZSB3YXkgdG8gZGlzcGxheSBkYXlzIHRoYXQgZG9uJ3QgYmVsb25nIHRvIGN1cnJlbnQgbW9udGg6IGB2aXNpYmxlYCAoZGVmYXVsdCksXHJcbiAgICogYGhpZGRlbmAgKG5vdCBkaXNwbGF5ZWQpIG9yIGBjb2xsYXBzZWRgIChub3QgZGlzcGxheWVkIHdpdGggZW1wdHkgc3BhY2UgY29sbGFwc2VkKVxyXG4gICAqL1xyXG4gIEBJbnB1dCgpIG91dHNpZGVEYXlzOiAndmlzaWJsZScgfCAnY29sbGFwc2VkJyB8ICdoaWRkZW4nO1xyXG5cclxuICAvKipcclxuICAgKiBQbGFjZW1lbnQgb2YgYSBkYXRlcGlja2VyIHBvcHVwIGFjY2VwdHM6XHJcbiAgICogICAgXCJ0b3BcIiwgXCJ0b3AtbGVmdFwiLCBcInRvcC1yaWdodFwiLCBcImJvdHRvbVwiLCBcImJvdHRvbS1sZWZ0XCIsIFwiYm90dG9tLXJpZ2h0XCIsXHJcbiAgICogICAgXCJsZWZ0XCIsIFwibGVmdC10b3BcIiwgXCJsZWZ0LWJvdHRvbVwiLCBcInJpZ2h0XCIsIFwicmlnaHQtdG9wXCIsIFwicmlnaHQtYm90dG9tXCJcclxuICAgKiBhbmQgYXJyYXkgb2YgYWJvdmUgdmFsdWVzLlxyXG4gICAqL1xyXG4gIEBJbnB1dCgpIHBsYWNlbWVudDogUGxhY2VtZW50QXJyYXkgPSAnYm90dG9tLWxlZnQnO1xyXG5cclxuICAvKipcclxuICAgKiBXaGV0aGVyIHRvIGRpc3BsYXkgZGF5cyBvZiB0aGUgd2Vla1xyXG4gICAqL1xyXG4gIEBJbnB1dCgpIHNob3dXZWVrZGF5czogYm9vbGVhbjtcclxuXHJcbiAgLyoqXHJcbiAgICogV2hldGhlciB0byBkaXNwbGF5IHdlZWsgbnVtYmVyc1xyXG4gICAqL1xyXG4gIEBJbnB1dCgpIHNob3dXZWVrTnVtYmVyczogYm9vbGVhbjtcclxuXHJcbiAgLyoqXHJcbiAgICogRGF0ZSB0byBvcGVuIGNhbGVuZGFyIHdpdGguXHJcbiAgICogV2l0aCBkZWZhdWx0IGNhbGVuZGFyIHdlIHVzZSBJU08gODYwMTogJ21vbnRoJyBpcyAxPUphbiAuLi4gMTI9RGVjLlxyXG4gICAqIElmIG5vdGhpbmcgb3IgaW52YWxpZCBkYXRlIHByb3ZpZGVkLCBjYWxlbmRhciB3aWxsIG9wZW4gd2l0aCBjdXJyZW50IG1vbnRoLlxyXG4gICAqIFVzZSAnbmF2aWdhdGVUbyhkYXRlKScgYXMgYW4gYWx0ZXJuYXRpdmVcclxuICAgKi9cclxuICBASW5wdXQoKSBzdGFydERhdGU6IHt5ZWFyOiBudW1iZXIsIG1vbnRoOiBudW1iZXJ9O1xyXG5cclxuICAvKipcclxuICAgKiBBIHNlbGVjdG9yIHNwZWNpZnlpbmcgdGhlIGVsZW1lbnQgdGhlIGRhdGVwaWNrZXIgcG9wdXAgc2hvdWxkIGJlIGFwcGVuZGVkIHRvLlxyXG4gICAqIEN1cnJlbnRseSBvbmx5IHN1cHBvcnRzIFwiYm9keVwiLlxyXG4gICAqL1xyXG4gIEBJbnB1dCgpIGNvbnRhaW5lcjogc3RyaW5nO1xyXG5cclxuICAvKipcclxuICAgKiBBbiBldmVudCBmaXJlZCB3aGVuIHVzZXIgc2VsZWN0cyBhIGRhdGUgdXNpbmcga2V5Ym9hcmQgb3IgbW91c2UuXHJcbiAgICogVGhlIHBheWxvYWQgb2YgdGhlIGV2ZW50IGlzIGN1cnJlbnRseSBzZWxlY3RlZCBOZ2JEYXRlLlxyXG4gICAqXHJcbiAgICogQHNpbmNlIDEuMS4xXHJcbiAgICovXHJcbiAgQE91dHB1dCgpIGRhdGVTZWxlY3QgPSBuZXcgRXZlbnRFbWl0dGVyPE5nYkRhdGU+KCk7XHJcblxyXG4gIC8qKlxyXG4gICAqIEFuIGV2ZW50IGZpcmVkIHdoZW4gbmF2aWdhdGlvbiBoYXBwZW5zIGFuZCBjdXJyZW50bHkgZGlzcGxheWVkIG1vbnRoIGNoYW5nZXMuXHJcbiAgICogU2VlIE5nYkRhdGVwaWNrZXJOYXZpZ2F0ZUV2ZW50IGZvciB0aGUgcGF5bG9hZCBpbmZvLlxyXG4gICAqL1xyXG4gIEBPdXRwdXQoKSBuYXZpZ2F0ZSA9IG5ldyBFdmVudEVtaXR0ZXI8TmdiRGF0ZXBpY2tlck5hdmlnYXRlRXZlbnQ+KCk7XHJcblxyXG4gIEBJbnB1dCgpXHJcbiAgZ2V0IGRpc2FibGVkKCkge1xyXG4gICAgcmV0dXJuIHRoaXMuX2Rpc2FibGVkO1xyXG4gIH1cclxuICBzZXQgZGlzYWJsZWQodmFsdWU6IGFueSkge1xyXG4gICAgdGhpcy5fZGlzYWJsZWQgPSB2YWx1ZSA9PT0gJycgfHwgKHZhbHVlICYmIHZhbHVlICE9PSAnZmFsc2UnKTtcclxuXHJcbiAgICBpZiAodGhpcy5pc09wZW4oKSkge1xyXG4gICAgICB0aGlzLl9jUmVmLmluc3RhbmNlLnNldERpc2FibGVkU3RhdGUodGhpcy5fZGlzYWJsZWQpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBfb25DaGFuZ2UgPSAoXzogYW55KSA9PiB7fTtcclxuICBwcml2YXRlIF9vblRvdWNoZWQgPSAoKSA9PiB7fTtcclxuICBwcml2YXRlIF92YWxpZGF0b3JDaGFuZ2UgPSAoKSA9PiB7fTtcclxuXHJcblxyXG4gIGNvbnN0cnVjdG9yKFxyXG4gICAgICBwcml2YXRlIF9wYXJzZXJGb3JtYXR0ZXI6IE5nYkRhdGVQYXJzZXJGb3JtYXR0ZXIsIHByaXZhdGUgX2VsUmVmOiBFbGVtZW50UmVmPEhUTUxJbnB1dEVsZW1lbnQ+LFxyXG4gICAgICBwcml2YXRlIF92Y1JlZjogVmlld0NvbnRhaW5lclJlZiwgcHJpdmF0ZSBfcmVuZGVyZXI6IFJlbmRlcmVyMiwgcHJpdmF0ZSBfY2ZyOiBDb21wb25lbnRGYWN0b3J5UmVzb2x2ZXIsXHJcbiAgICAgIHByaXZhdGUgX25nWm9uZTogTmdab25lLCBwcml2YXRlIF9zZXJ2aWNlOiBOZ2JEYXRlcGlja2VyU2VydmljZSwgcHJpdmF0ZSBfY2FsZW5kYXI6IE5nYkNhbGVuZGFyLFxyXG4gICAgICBwcml2YXRlIF9kYXRlQWRhcHRlcjogTmdiRGF0ZUFkYXB0ZXI8YW55PiwgQEluamVjdChET0NVTUVOVCkgcHJpdmF0ZSBfZG9jdW1lbnQ6IGFueSkge1xyXG4gICAgdGhpcy5fem9uZVN1YnNjcmlwdGlvbiA9IF9uZ1pvbmUub25TdGFibGUuc3Vic2NyaWJlKCgpID0+IHtcclxuICAgICAgaWYgKHRoaXMuX2NSZWYpIHtcclxuICAgICAgICBwb3NpdGlvbkVsZW1lbnRzKFxyXG4gICAgICAgICAgICB0aGlzLl9lbFJlZi5uYXRpdmVFbGVtZW50LCB0aGlzLl9jUmVmLmxvY2F0aW9uLm5hdGl2ZUVsZW1lbnQsIHRoaXMucGxhY2VtZW50LCB0aGlzLmNvbnRhaW5lciA9PT0gJ2JvZHknKTtcclxuICAgICAgfVxyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICByZWdpc3Rlck9uQ2hhbmdlKGZuOiAodmFsdWU6IGFueSkgPT4gYW55KTogdm9pZCB7IHRoaXMuX29uQ2hhbmdlID0gZm47IH1cclxuXHJcbiAgcmVnaXN0ZXJPblRvdWNoZWQoZm46ICgpID0+IGFueSk6IHZvaWQgeyB0aGlzLl9vblRvdWNoZWQgPSBmbjsgfVxyXG5cclxuICByZWdpc3Rlck9uVmFsaWRhdG9yQ2hhbmdlKGZuOiAoKSA9PiB2b2lkKTogdm9pZCB7IHRoaXMuX3ZhbGlkYXRvckNoYW5nZSA9IGZuOyB9XHJcblxyXG4gIHNldERpc2FibGVkU3RhdGUoaXNEaXNhYmxlZDogYm9vbGVhbik6IHZvaWQgeyB0aGlzLmRpc2FibGVkID0gaXNEaXNhYmxlZDsgfVxyXG5cclxuICB2YWxpZGF0ZShjOiBBYnN0cmFjdENvbnRyb2wpOiB7W2tleTogc3RyaW5nXTogYW55fSB7XHJcbiAgICBjb25zdCB2YWx1ZSA9IGMudmFsdWU7XHJcblxyXG4gICAgaWYgKHZhbHVlID09PSBudWxsIHx8IHZhbHVlID09PSB1bmRlZmluZWQpIHtcclxuICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICB9XHJcblxyXG4gICAgY29uc3QgbmdiRGF0ZSA9IHRoaXMuX2Zyb21EYXRlU3RydWN0KHRoaXMuX2RhdGVBZGFwdGVyLmZyb21Nb2RlbCh2YWx1ZSkpO1xyXG5cclxuICAgIGlmICghdGhpcy5fY2FsZW5kYXIuaXNWYWxpZChuZ2JEYXRlKSkge1xyXG4gICAgICByZXR1cm4geyduZ2JEYXRlJzoge2ludmFsaWQ6IGMudmFsdWV9fTtcclxuICAgIH1cclxuXHJcbiAgICBpZiAodGhpcy5taW5EYXRlICYmIG5nYkRhdGUuYmVmb3JlKE5nYkRhdGUuZnJvbSh0aGlzLm1pbkRhdGUpKSkge1xyXG4gICAgICByZXR1cm4geyduZ2JEYXRlJzoge3JlcXVpcmVkQmVmb3JlOiB0aGlzLm1pbkRhdGV9fTtcclxuICAgIH1cclxuXHJcbiAgICBpZiAodGhpcy5tYXhEYXRlICYmIG5nYkRhdGUuYWZ0ZXIoTmdiRGF0ZS5mcm9tKHRoaXMubWF4RGF0ZSkpKSB7XHJcbiAgICAgIHJldHVybiB7J25nYkRhdGUnOiB7cmVxdWlyZWRBZnRlcjogdGhpcy5tYXhEYXRlfX07XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICB3cml0ZVZhbHVlKHZhbHVlKSB7XHJcbiAgICB0aGlzLl9tb2RlbCA9IHRoaXMuX2Zyb21EYXRlU3RydWN0KHRoaXMuX2RhdGVBZGFwdGVyLmZyb21Nb2RlbCh2YWx1ZSkpO1xyXG4gICAgdGhpcy5fd3JpdGVNb2RlbFZhbHVlKHRoaXMuX21vZGVsKTtcclxuICB9XHJcblxyXG4gIG1hbnVhbERhdGVDaGFuZ2UodmFsdWU6IHN0cmluZywgdXBkYXRlVmlldyA9IGZhbHNlKSB7XHJcbiAgICB0aGlzLl9tb2RlbCA9IHRoaXMuX2Zyb21EYXRlU3RydWN0KHRoaXMuX3BhcnNlckZvcm1hdHRlci5wYXJzZSh2YWx1ZSkpO1xyXG4gICAgdGhpcy5fb25DaGFuZ2UodGhpcy5fbW9kZWwgPyB0aGlzLl9kYXRlQWRhcHRlci50b01vZGVsKHRoaXMuX21vZGVsKSA6ICh2YWx1ZSA9PT0gJycgPyBudWxsIDogdmFsdWUpKTtcclxuICAgIGlmICh1cGRhdGVWaWV3ICYmIHRoaXMuX21vZGVsKSB7XHJcbiAgICAgIHRoaXMuX3dyaXRlTW9kZWxWYWx1ZSh0aGlzLl9tb2RlbCk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBpc09wZW4oKSB7IHJldHVybiAhIXRoaXMuX2NSZWY7IH1cclxuXHJcbiAgLyoqXHJcbiAgICogT3BlbnMgdGhlIGRhdGVwaWNrZXIgd2l0aCB0aGUgc2VsZWN0ZWQgZGF0ZSBpbmRpY2F0ZWQgYnkgdGhlIG5nTW9kZWwgdmFsdWUuXHJcbiAgICovXHJcbiAgb3BlbigpIHtcclxuICAgIGlmICghdGhpcy5pc09wZW4oKSkge1xyXG4gICAgICBjb25zdCBjZiA9IHRoaXMuX2Nmci5yZXNvbHZlQ29tcG9uZW50RmFjdG9yeShOZ2JEYXRlcGlja2VyKTtcclxuICAgICAgdGhpcy5fY1JlZiA9IHRoaXMuX3ZjUmVmLmNyZWF0ZUNvbXBvbmVudChjZik7XHJcblxyXG4gICAgICB0aGlzLl9hcHBseVBvcHVwU3R5bGluZyh0aGlzLl9jUmVmLmxvY2F0aW9uLm5hdGl2ZUVsZW1lbnQpO1xyXG4gICAgICB0aGlzLl9hcHBseURhdGVwaWNrZXJJbnB1dHModGhpcy5fY1JlZi5pbnN0YW5jZSk7XHJcbiAgICAgIHRoaXMuX3N1YnNjcmliZUZvckRhdGVwaWNrZXJPdXRwdXRzKHRoaXMuX2NSZWYuaW5zdGFuY2UpO1xyXG4gICAgICB0aGlzLl9jUmVmLmluc3RhbmNlLm5nT25Jbml0KCk7XHJcbiAgICAgIHRoaXMuX2NSZWYuaW5zdGFuY2Uud3JpdGVWYWx1ZSh0aGlzLl9kYXRlQWRhcHRlci50b01vZGVsKHRoaXMuX21vZGVsKSk7XHJcblxyXG4gICAgICAvLyBkYXRlIHNlbGVjdGlvbiBldmVudCBoYW5kbGluZ1xyXG4gICAgICB0aGlzLl9jUmVmLmluc3RhbmNlLnJlZ2lzdGVyT25DaGFuZ2UoKHNlbGVjdGVkRGF0ZSkgPT4ge1xyXG4gICAgICAgIHRoaXMud3JpdGVWYWx1ZShzZWxlY3RlZERhdGUpO1xyXG4gICAgICAgIHRoaXMuX29uQ2hhbmdlKHNlbGVjdGVkRGF0ZSk7XHJcbiAgICAgIH0pO1xyXG5cclxuICAgICAgdGhpcy5fY1JlZi5jaGFuZ2VEZXRlY3RvclJlZi5kZXRlY3RDaGFuZ2VzKCk7XHJcblxyXG4gICAgICB0aGlzLl9jUmVmLmluc3RhbmNlLnNldERpc2FibGVkU3RhdGUodGhpcy5kaXNhYmxlZCk7XHJcblxyXG4gICAgICBpZiAodGhpcy5jb250YWluZXIgPT09ICdib2R5Jykge1xyXG4gICAgICAgIHdpbmRvdy5kb2N1bWVudC5xdWVyeVNlbGVjdG9yKHRoaXMuY29udGFpbmVyKS5hcHBlbmRDaGlsZCh0aGlzLl9jUmVmLmxvY2F0aW9uLm5hdGl2ZUVsZW1lbnQpO1xyXG4gICAgICB9XHJcblxyXG4gICAgICAvLyBmb2N1cyBoYW5kbGluZ1xyXG4gICAgICBuZ2JGb2N1c1RyYXAodGhpcy5fY1JlZi5sb2NhdGlvbi5uYXRpdmVFbGVtZW50LCB0aGlzLl9jbG9zZWQkKTtcclxuXHJcbiAgICAgIHRoaXMuX2NSZWYuaW5zdGFuY2UuZm9jdXMoKTtcclxuXHJcbiAgICAgIC8vIGNsb3Npbmcgb24gRVNDIGFuZCBvdXRzaWRlIGNsaWNrc1xyXG4gICAgICB0aGlzLl9uZ1pvbmUucnVuT3V0c2lkZUFuZ3VsYXIoKCkgPT4ge1xyXG5cclxuICAgICAgICBjb25zdCBlc2NhcGVzJCA9IGZyb21FdmVudDxLZXlib2FyZEV2ZW50Pih0aGlzLl9kb2N1bWVudCwgJ2tleXVwJylcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAucGlwZSh0YWtlVW50aWwodGhpcy5fY2xvc2VkJCksIGZpbHRlcihlID0+IGUud2hpY2ggPT09IEtleS5Fc2NhcGUpKTtcclxuXHJcbiAgICAgICAgbGV0IG91dHNpZGVDbGlja3MkO1xyXG4gICAgICAgIGlmICh0aGlzLmF1dG9DbG9zZSA9PT0gdHJ1ZSB8fCB0aGlzLmF1dG9DbG9zZSA9PT0gJ291dHNpZGUnKSB7XHJcbiAgICAgICAgICAvLyB3ZSBkb24ndCBrbm93IGhvdyB0aGUgcG9wdXAgd2FzIG9wZW5lZCwgc28gaWYgaXQgd2FzIG9wZW5lZCB3aXRoIGEgY2xpY2ssXHJcbiAgICAgICAgICAvLyB3ZSBoYXZlIHRvIHNraXAgdGhlIGZpcnN0IG9uZSB0byBhdm9pZCBjbG9zaW5nIGl0IGltbWVkaWF0ZWx5XHJcbiAgICAgICAgICBsZXQgaXNPcGVuaW5nID0gdHJ1ZTtcclxuICAgICAgICAgIHJlcXVlc3RBbmltYXRpb25GcmFtZSgoKSA9PiBpc09wZW5pbmcgPSBmYWxzZSk7XHJcblxyXG4gICAgICAgICAgb3V0c2lkZUNsaWNrcyQgPVxyXG4gICAgICAgICAgICAgIGZyb21FdmVudDxNb3VzZUV2ZW50Pih0aGlzLl9kb2N1bWVudCwgJ2NsaWNrJylcclxuICAgICAgICAgICAgICAgICAgLnBpcGUoXHJcbiAgICAgICAgICAgICAgICAgICAgICB0YWtlVW50aWwodGhpcy5fY2xvc2VkJCksIGZpbHRlcihldmVudCA9PiAhaXNPcGVuaW5nICYmIHRoaXMuX3Nob3VsZENsb3NlT25PdXRzaWRlQ2xpY2soZXZlbnQpKSk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIG91dHNpZGVDbGlja3MkID0gTkVWRVI7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByYWNlPEV2ZW50PihbZXNjYXBlcyQsIG91dHNpZGVDbGlja3MkXSkuc3Vic2NyaWJlKCgpID0+IHRoaXMuX25nWm9uZS5ydW4oKCkgPT4gdGhpcy5jbG9zZSgpKSk7XHJcbiAgICAgIH0pO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogQ2xvc2VzIHRoZSBkYXRlcGlja2VyIHBvcHVwLlxyXG4gICAqL1xyXG4gIGNsb3NlKCkge1xyXG4gICAgaWYgKHRoaXMuaXNPcGVuKCkpIHtcclxuICAgICAgdGhpcy5fdmNSZWYucmVtb3ZlKHRoaXMuX3ZjUmVmLmluZGV4T2YodGhpcy5fY1JlZi5ob3N0VmlldykpO1xyXG4gICAgICB0aGlzLl9jUmVmID0gbnVsbDtcclxuICAgICAgdGhpcy5fY2xvc2VkJC5uZXh0KCk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBUb2dnbGVzIHRoZSBkYXRlcGlja2VyIHBvcHVwIChvcGVucyB3aGVuIGNsb3NlZCBhbmQgY2xvc2VzIHdoZW4gb3BlbmVkKS5cclxuICAgKi9cclxuICB0b2dnbGUoKSB7XHJcbiAgICBpZiAodGhpcy5pc09wZW4oKSkge1xyXG4gICAgICB0aGlzLmNsb3NlKCk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB0aGlzLm9wZW4oKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIE5hdmlnYXRlcyBjdXJyZW50IHZpZXcgdG8gcHJvdmlkZWQgZGF0ZS5cclxuICAgKiBXaXRoIGRlZmF1bHQgY2FsZW5kYXIgd2UgdXNlIElTTyA4NjAxOiAnbW9udGgnIGlzIDE9SmFuIC4uLiAxMj1EZWMuXHJcbiAgICogSWYgbm90aGluZyBvciBpbnZhbGlkIGRhdGUgcHJvdmlkZWQgY2FsZW5kYXIgd2lsbCBvcGVuIGN1cnJlbnQgbW9udGguXHJcbiAgICogVXNlICdzdGFydERhdGUnIGlucHV0IGFzIGFuIGFsdGVybmF0aXZlXHJcbiAgICovXHJcbiAgbmF2aWdhdGVUbyhkYXRlPzoge3llYXI6IG51bWJlciwgbW9udGg6IG51bWJlcn0pIHtcclxuICAgIGlmICh0aGlzLmlzT3BlbigpKSB7XHJcbiAgICAgIHRoaXMuX2NSZWYuaW5zdGFuY2UubmF2aWdhdGVUbyhkYXRlKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIG9uQmx1cigpIHsgdGhpcy5fb25Ub3VjaGVkKCk7IH1cclxuXHJcbiAgbmdPbkNoYW5nZXMoY2hhbmdlczogU2ltcGxlQ2hhbmdlcykge1xyXG4gICAgaWYgKGNoYW5nZXNbJ21pbkRhdGUnXSB8fCBjaGFuZ2VzWydtYXhEYXRlJ10pIHtcclxuICAgICAgdGhpcy5fdmFsaWRhdG9yQ2hhbmdlKCk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBuZ09uRGVzdHJveSgpIHtcclxuICAgIHRoaXMuY2xvc2UoKTtcclxuICAgIHRoaXMuX3pvbmVTdWJzY3JpcHRpb24udW5zdWJzY3JpYmUoKTtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgX2FwcGx5RGF0ZXBpY2tlcklucHV0cyhkYXRlcGlja2VySW5zdGFuY2U6IE5nYkRhdGVwaWNrZXIpOiB2b2lkIHtcclxuICAgIFsnZGF5VGVtcGxhdGUnLCAnZGlzcGxheU1vbnRocycsICdmaXJzdERheU9mV2VlaycsICdtYXJrRGlzYWJsZWQnLCAnbWluRGF0ZScsICdtYXhEYXRlJywgJ25hdmlnYXRpb24nLFxyXG4gICAgICdvdXRzaWRlRGF5cycsICdzaG93TmF2aWdhdGlvbicsICdzaG93V2Vla2RheXMnLCAnc2hvd1dlZWtOdW1iZXJzJ11cclxuICAgICAgICAuZm9yRWFjaCgob3B0aW9uTmFtZTogc3RyaW5nKSA9PiB7XHJcbiAgICAgICAgICBpZiAodGhpc1tvcHRpb25OYW1lXSAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgIGRhdGVwaWNrZXJJbnN0YW5jZVtvcHRpb25OYW1lXSA9IHRoaXNbb3B0aW9uTmFtZV07XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICBkYXRlcGlja2VySW5zdGFuY2Uuc3RhcnREYXRlID0gdGhpcy5zdGFydERhdGUgfHwgdGhpcy5fbW9kZWw7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIF9hcHBseVBvcHVwU3R5bGluZyhuYXRpdmVFbGVtZW50OiBhbnkpIHtcclxuICAgIHRoaXMuX3JlbmRlcmVyLmFkZENsYXNzKG5hdGl2ZUVsZW1lbnQsICdkcm9wZG93bi1tZW51Jyk7XHJcbiAgICB0aGlzLl9yZW5kZXJlci5zZXRTdHlsZShuYXRpdmVFbGVtZW50LCAncGFkZGluZycsICcwJyk7XHJcbiAgICB0aGlzLl9yZW5kZXJlci5hZGRDbGFzcyhuYXRpdmVFbGVtZW50LCAnc2hvdycpO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBfc2hvdWxkQ2xvc2VPbk91dHNpZGVDbGljayhldmVudDogTW91c2VFdmVudCkge1xyXG4gICAgcmV0dXJuICFbdGhpcy5fZWxSZWYubmF0aXZlRWxlbWVudCwgdGhpcy5fY1JlZi5sb2NhdGlvbi5uYXRpdmVFbGVtZW50XS5zb21lKGVsID0+IGVsLmNvbnRhaW5zKGV2ZW50LnRhcmdldCkpO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBfc3Vic2NyaWJlRm9yRGF0ZXBpY2tlck91dHB1dHMoZGF0ZXBpY2tlckluc3RhbmNlOiBOZ2JEYXRlcGlja2VyKSB7XHJcbiAgICBkYXRlcGlja2VySW5zdGFuY2UubmF2aWdhdGUuc3Vic2NyaWJlKGRhdGUgPT4gdGhpcy5uYXZpZ2F0ZS5lbWl0KGRhdGUpKTtcclxuICAgIGRhdGVwaWNrZXJJbnN0YW5jZS5zZWxlY3Quc3Vic2NyaWJlKGRhdGUgPT4ge1xyXG4gICAgICB0aGlzLmRhdGVTZWxlY3QuZW1pdChkYXRlKTtcclxuICAgICAgaWYgKHRoaXMuYXV0b0Nsb3NlID09PSB0cnVlIHx8IHRoaXMuYXV0b0Nsb3NlID09PSAnaW5zaWRlJykge1xyXG4gICAgICAgIHRoaXMuY2xvc2UoKTtcclxuICAgICAgfVxyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIF93cml0ZU1vZGVsVmFsdWUobW9kZWw6IE5nYkRhdGUpIHtcclxuICAgIHRoaXMuX3JlbmRlcmVyLnNldFByb3BlcnR5KHRoaXMuX2VsUmVmLm5hdGl2ZUVsZW1lbnQsICd2YWx1ZScsIHRoaXMuX3BhcnNlckZvcm1hdHRlci5mb3JtYXQobW9kZWwpKTtcclxuICAgIGlmICh0aGlzLmlzT3BlbigpKSB7XHJcbiAgICAgIHRoaXMuX2NSZWYuaW5zdGFuY2Uud3JpdGVWYWx1ZSh0aGlzLl9kYXRlQWRhcHRlci50b01vZGVsKG1vZGVsKSk7XHJcbiAgICAgIHRoaXMuX29uVG91Y2hlZCgpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBfZnJvbURhdGVTdHJ1Y3QoZGF0ZTogTmdiRGF0ZVN0cnVjdCk6IE5nYkRhdGUge1xyXG4gICAgY29uc3QgbmdiRGF0ZSA9IGRhdGUgPyBuZXcgTmdiRGF0ZShkYXRlLnllYXIsIGRhdGUubW9udGgsIGRhdGUuZGF5KSA6IG51bGw7XHJcbiAgICByZXR1cm4gdGhpcy5fY2FsZW5kYXIuaXNWYWxpZChuZ2JEYXRlKSA/IG5nYkRhdGUgOiBudWxsO1xyXG4gIH1cclxufVxyXG4iLCJpbXBvcnQge0NoYW5nZURldGVjdGlvblN0cmF0ZWd5LCBDb21wb25lbnQsIElucHV0fSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHtOZ2JEYXRlfSBmcm9tICcuL25nYi1kYXRlJztcclxuaW1wb3J0IHtOZ2JEYXRlcGlja2VySTE4bn0gZnJvbSAnLi9kYXRlcGlja2VyLWkxOG4nO1xyXG5cclxuQENvbXBvbmVudCh7XHJcbiAgc2VsZWN0b3I6ICdbbmdiRGF0ZXBpY2tlckRheVZpZXddJyxcclxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaCxcclxuICBzdHlsZXM6IFtgXHJcbiAgICA6aG9zdCB7XHJcbiAgICAgIHRleHQtYWxpZ246IGNlbnRlcjtcclxuICAgICAgd2lkdGg6IDJyZW07XHJcbiAgICAgIGhlaWdodDogMnJlbTtcclxuICAgICAgbGluZS1oZWlnaHQ6IDJyZW07XHJcbiAgICAgIGJvcmRlci1yYWRpdXM6IDAuMjVyZW07XHJcbiAgICAgIGJhY2tncm91bmQ6IHRyYW5zcGFyZW50O1xyXG4gICAgfVxyXG4gICAgOmhvc3Qub3V0c2lkZSB7XHJcbiAgICAgIG9wYWNpdHk6IDAuNTtcclxuICAgIH1cclxuICBgXSxcclxuICBob3N0OiB7XHJcbiAgICAnY2xhc3MnOiAnYnRuLWxpZ2h0JyxcclxuICAgICdbY2xhc3MuYmctcHJpbWFyeV0nOiAnc2VsZWN0ZWQnLFxyXG4gICAgJ1tjbGFzcy50ZXh0LXdoaXRlXSc6ICdzZWxlY3RlZCcsXHJcbiAgICAnW2NsYXNzLnRleHQtbXV0ZWRdJzogJ2lzTXV0ZWQoKScsXHJcbiAgICAnW2NsYXNzLm91dHNpZGVdJzogJ2lzTXV0ZWQoKScsXHJcbiAgICAnW2NsYXNzLmFjdGl2ZV0nOiAnZm9jdXNlZCdcclxuICB9LFxyXG4gIHRlbXBsYXRlOiBge3sgaTE4bi5nZXREYXlOdW1lcmFscyhkYXRlKSB9fWBcclxufSlcclxuZXhwb3J0IGNsYXNzIE5nYkRhdGVwaWNrZXJEYXlWaWV3IHtcclxuICBASW5wdXQoKSBjdXJyZW50TW9udGg6IG51bWJlcjtcclxuICBASW5wdXQoKSBkYXRlOiBOZ2JEYXRlO1xyXG4gIEBJbnB1dCgpIGRpc2FibGVkOiBib29sZWFuO1xyXG4gIEBJbnB1dCgpIGZvY3VzZWQ6IGJvb2xlYW47XHJcbiAgQElucHV0KCkgc2VsZWN0ZWQ6IGJvb2xlYW47XHJcblxyXG4gIGNvbnN0cnVjdG9yKHB1YmxpYyBpMThuOiBOZ2JEYXRlcGlja2VySTE4bikge31cclxuXHJcbiAgaXNNdXRlZCgpIHsgcmV0dXJuICF0aGlzLnNlbGVjdGVkICYmICh0aGlzLmRhdGUubW9udGggIT09IHRoaXMuY3VycmVudE1vbnRoIHx8IHRoaXMuZGlzYWJsZWQpOyB9XHJcbn1cclxuIiwiaW1wb3J0IHtDb21wb25lbnQsIElucHV0LCBPdXRwdXQsIEV2ZW50RW1pdHRlciwgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3l9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQge05nYkRhdGV9IGZyb20gJy4vbmdiLWRhdGUnO1xyXG5pbXBvcnQge3RvSW50ZWdlcn0gZnJvbSAnLi4vdXRpbC91dGlsJztcclxuaW1wb3J0IHtOZ2JEYXRlcGlja2VySTE4bn0gZnJvbSAnLi9kYXRlcGlja2VyLWkxOG4nO1xyXG5cclxuQENvbXBvbmVudCh7XHJcbiAgc2VsZWN0b3I6ICduZ2ItZGF0ZXBpY2tlci1uYXZpZ2F0aW9uLXNlbGVjdCcsXHJcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2gsXHJcbiAgc3R5bGVzOiBbYFxyXG4gICAgOmhvc3Q+c2VsZWN0IHtcclxuICAgICAgZGlzcGxheTogZmxleDtcclxuICAgICAgZGlzcGxheTogLW1zLWZsZXhib3g7XHJcbiAgICAgIC1tcy1mbGV4OiAxIDEgYXV0bztcclxuICAgICAgd2lkdGg6IDEwMCU7XHJcbiAgICAgIHBhZGRpbmc6IDAgMC41cmVtO1xyXG4gICAgICBmb250LXNpemU6IDAuODc1cmVtO1xyXG4gICAgICBoZWlnaHQ6IDEuODVyZW07XHJcbiAgICB9XHJcbiAgYF0sXHJcbiAgdGVtcGxhdGU6IGBcclxuICAgIDxzZWxlY3RcclxuICAgICAgW2Rpc2FibGVkXT1cImRpc2FibGVkXCJcclxuICAgICAgY2xhc3M9XCJjdXN0b20tc2VsZWN0XCJcclxuICAgICAgW3ZhbHVlXT1cImRhdGU/Lm1vbnRoXCJcclxuICAgICAgaTE4bi1hcmlhLWxhYmVsPVwiQEBuZ2IuZGF0ZXBpY2tlci5zZWxlY3QtbW9udGhcIiBhcmlhLWxhYmVsPVwiU2VsZWN0IG1vbnRoXCJcclxuICAgICAgaTE4bi10aXRsZT1cIkBAbmdiLmRhdGVwaWNrZXIuc2VsZWN0LW1vbnRoXCIgdGl0bGU9XCJTZWxlY3QgbW9udGhcIlxyXG4gICAgICAoY2hhbmdlKT1cImNoYW5nZU1vbnRoKCRldmVudC50YXJnZXQudmFsdWUpXCI+XHJcbiAgICAgICAgPG9wdGlvbiAqbmdGb3I9XCJsZXQgbSBvZiBtb250aHNcIiBbYXR0ci5hcmlhLWxhYmVsXT1cImkxOG4uZ2V0TW9udGhGdWxsTmFtZShtLCBkYXRlPy55ZWFyKVwiXHJcbiAgICAgICAgICAgICAgICBbdmFsdWVdPVwibVwiPnt7IGkxOG4uZ2V0TW9udGhTaG9ydE5hbWUobSwgZGF0ZT8ueWVhcikgfX08L29wdGlvbj5cclxuICAgIDwvc2VsZWN0PjxzZWxlY3RcclxuICAgICAgW2Rpc2FibGVkXT1cImRpc2FibGVkXCJcclxuICAgICAgY2xhc3M9XCJjdXN0b20tc2VsZWN0XCJcclxuICAgICAgW3ZhbHVlXT1cImRhdGU/LnllYXJcIlxyXG4gICAgICBpMThuLWFyaWEtbGFiZWw9XCJAQG5nYi5kYXRlcGlja2VyLnNlbGVjdC15ZWFyXCIgYXJpYS1sYWJlbD1cIlNlbGVjdCB5ZWFyXCJcclxuICAgICAgaTE4bi10aXRsZT1cIkBAbmdiLmRhdGVwaWNrZXIuc2VsZWN0LXllYXJcIiB0aXRsZT1cIlNlbGVjdCB5ZWFyXCJcclxuICAgICAgKGNoYW5nZSk9XCJjaGFuZ2VZZWFyKCRldmVudC50YXJnZXQudmFsdWUpXCI+XHJcbiAgICAgICAgPG9wdGlvbiAqbmdGb3I9XCJsZXQgeSBvZiB5ZWFyc1wiIFt2YWx1ZV09XCJ5XCI+e3sgaTE4bi5nZXRZZWFyTnVtZXJhbHMoeSkgfX08L29wdGlvbj5cclxuICAgIDwvc2VsZWN0PlxyXG4gIGBcclxufSlcclxuZXhwb3J0IGNsYXNzIE5nYkRhdGVwaWNrZXJOYXZpZ2F0aW9uU2VsZWN0IHtcclxuICBASW5wdXQoKSBkYXRlOiBOZ2JEYXRlO1xyXG4gIEBJbnB1dCgpIGRpc2FibGVkOiBib29sZWFuO1xyXG4gIEBJbnB1dCgpIG1vbnRoczogbnVtYmVyW107XHJcbiAgQElucHV0KCkgeWVhcnM6IG51bWJlcltdO1xyXG5cclxuICBAT3V0cHV0KCkgc2VsZWN0ID0gbmV3IEV2ZW50RW1pdHRlcjxOZ2JEYXRlPigpO1xyXG5cclxuICBjb25zdHJ1Y3RvcihwdWJsaWMgaTE4bjogTmdiRGF0ZXBpY2tlckkxOG4pIHt9XHJcblxyXG4gIGNoYW5nZU1vbnRoKG1vbnRoOiBzdHJpbmcpIHsgdGhpcy5zZWxlY3QuZW1pdChuZXcgTmdiRGF0ZSh0aGlzLmRhdGUueWVhciwgdG9JbnRlZ2VyKG1vbnRoKSwgMSkpOyB9XHJcblxyXG4gIGNoYW5nZVllYXIoeWVhcjogc3RyaW5nKSB7IHRoaXMuc2VsZWN0LmVtaXQobmV3IE5nYkRhdGUodG9JbnRlZ2VyKHllYXIpLCB0aGlzLmRhdGUubW9udGgsIDEpKTsgfVxyXG59XHJcbiIsImltcG9ydCB7TmdiRGF0ZX0gZnJvbSAnLi4vbmdiLWRhdGUnO1xyXG5pbXBvcnQge05nYlBlcmlvZCwgTmdiQ2FsZW5kYXJ9IGZyb20gJy4uL25nYi1jYWxlbmRhcic7XHJcbmltcG9ydCB7SW5qZWN0YWJsZX0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7aXNOdW1iZXJ9IGZyb20gJy4uLy4uL3V0aWwvdXRpbCc7XHJcblxyXG5ASW5qZWN0YWJsZSgpXHJcbmV4cG9ydCBhYnN0cmFjdCBjbGFzcyBOZ2JDYWxlbmRhckhpanJpIGV4dGVuZHMgTmdiQ2FsZW5kYXIge1xyXG4gIC8qKlxyXG4gICAqIFJldHVybnMgdGhlIG51bWJlciBvZiBkYXlzIGluIGEgc3BlY2lmaWMgSGlqcmkgbW9udGguXHJcbiAgICogYG1vbnRoYCBpcyAxIGZvciBNdWhhcnJhbSwgMiBmb3IgU2FmYXIsIGV0Yy5cclxuICAgKiBgeWVhcmAgaXMgYW55IEhpanJpIHllYXIuXHJcbiAgICovXHJcbiAgYWJzdHJhY3QgZ2V0RGF5c1Blck1vbnRoKG1vbnRoOiBudW1iZXIsIHllYXI6IG51bWJlcik6IG51bWJlcjtcclxuXHJcbiAgLyoqXHJcbiAgICogUmV0dXJucyB0aGUgZXF1aXZhbGVudCBIaWpyaSBkYXRlIHZhbHVlIGZvciBhIGdpdmUgaW5wdXQgR3JlZ29yaWFuIGRhdGUuXHJcbiAgICogYGdEYXRlYCBpcyBzIEpTIERhdGUgdG8gYmUgY29udmVydGVkIHRvIEhpanJpLlxyXG4gICAqL1xyXG4gIGFic3RyYWN0IGZyb21HcmVnb3JpYW4oZ0RhdGU6IERhdGUpOiBOZ2JEYXRlO1xyXG5cclxuICAvKipcclxuICAgKiBDb252ZXJ0cyB0aGUgY3VycmVudCBIaWpyaSBkYXRlIHRvIEdyZWdvcmlhbi5cclxuICAgKi9cclxuICBhYnN0cmFjdCB0b0dyZWdvcmlhbihoRGF0ZTogTmdiRGF0ZSk6IERhdGU7XHJcblxyXG4gIGdldERheXNQZXJXZWVrKCkgeyByZXR1cm4gNzsgfVxyXG5cclxuICBnZXRNb250aHMoKSB7IHJldHVybiBbMSwgMiwgMywgNCwgNSwgNiwgNywgOCwgOSwgMTAsIDExLCAxMl07IH1cclxuXHJcbiAgZ2V0V2Vla3NQZXJNb250aCgpIHsgcmV0dXJuIDY7IH1cclxuXHJcbiAgZ2V0TmV4dChkYXRlOiBOZ2JEYXRlLCBwZXJpb2Q6IE5nYlBlcmlvZCA9ICdkJywgbnVtYmVyID0gMSkge1xyXG4gICAgZGF0ZSA9IG5ldyBOZ2JEYXRlKGRhdGUueWVhciwgZGF0ZS5tb250aCwgZGF0ZS5kYXkpO1xyXG5cclxuICAgIHN3aXRjaCAocGVyaW9kKSB7XHJcbiAgICAgIGNhc2UgJ3knOlxyXG4gICAgICAgIGRhdGUgPSB0aGlzLl9zZXRZZWFyKGRhdGUsIGRhdGUueWVhciArIG51bWJlcik7XHJcbiAgICAgICAgZGF0ZS5tb250aCA9IDE7XHJcbiAgICAgICAgZGF0ZS5kYXkgPSAxO1xyXG4gICAgICAgIHJldHVybiBkYXRlO1xyXG4gICAgICBjYXNlICdtJzpcclxuICAgICAgICBkYXRlID0gdGhpcy5fc2V0TW9udGgoZGF0ZSwgZGF0ZS5tb250aCArIG51bWJlcik7XHJcbiAgICAgICAgZGF0ZS5kYXkgPSAxO1xyXG4gICAgICAgIHJldHVybiBkYXRlO1xyXG4gICAgICBjYXNlICdkJzpcclxuICAgICAgICByZXR1cm4gdGhpcy5fc2V0RGF5KGRhdGUsIGRhdGUuZGF5ICsgbnVtYmVyKTtcclxuICAgICAgZGVmYXVsdDpcclxuICAgICAgICByZXR1cm4gZGF0ZTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIGdldFByZXYoZGF0ZTogTmdiRGF0ZSwgcGVyaW9kOiBOZ2JQZXJpb2QgPSAnZCcsIG51bWJlciA9IDEpIHsgcmV0dXJuIHRoaXMuZ2V0TmV4dChkYXRlLCBwZXJpb2QsIC1udW1iZXIpOyB9XHJcblxyXG4gIGdldFdlZWtkYXkoZGF0ZTogTmdiRGF0ZSkge1xyXG4gICAgY29uc3QgZGF5ID0gdGhpcy50b0dyZWdvcmlhbihkYXRlKS5nZXREYXkoKTtcclxuICAgIC8vIGluIEpTIERhdGUgU3VuPTAsIGluIElTTyA4NjAxIFN1bj03XHJcbiAgICByZXR1cm4gZGF5ID09PSAwID8gNyA6IGRheTtcclxuICB9XHJcblxyXG4gIGdldFdlZWtOdW1iZXIod2VlazogTmdiRGF0ZVtdLCBmaXJzdERheU9mV2VlazogbnVtYmVyKSB7XHJcbiAgICAvLyBpbiBKUyBEYXRlIFN1bj0wLCBpbiBJU08gODYwMSBTdW49N1xyXG4gICAgaWYgKGZpcnN0RGF5T2ZXZWVrID09PSA3KSB7XHJcbiAgICAgIGZpcnN0RGF5T2ZXZWVrID0gMDtcclxuICAgIH1cclxuXHJcbiAgICBjb25zdCB0aHVyc2RheUluZGV4ID0gKDQgKyA3IC0gZmlyc3REYXlPZldlZWspICUgNztcclxuICAgIGNvbnN0IGRhdGUgPSB3ZWVrW3RodXJzZGF5SW5kZXhdO1xyXG5cclxuICAgIGNvbnN0IGpzRGF0ZSA9IHRoaXMudG9HcmVnb3JpYW4oZGF0ZSk7XHJcbiAgICBqc0RhdGUuc2V0RGF0ZShqc0RhdGUuZ2V0RGF0ZSgpICsgNCAtIChqc0RhdGUuZ2V0RGF5KCkgfHwgNykpOyAgLy8gVGh1cnNkYXlcclxuICAgIGNvbnN0IHRpbWUgPSBqc0RhdGUuZ2V0VGltZSgpO1xyXG4gICAgY29uc3QgTXVoRGF0ZSA9IHRoaXMudG9HcmVnb3JpYW4obmV3IE5nYkRhdGUoZGF0ZS55ZWFyLCAxLCAxKSk7ICAvLyBDb21wYXJlIHdpdGggTXVoYXJyYW0gMVxyXG4gICAgcmV0dXJuIE1hdGguZmxvb3IoTWF0aC5yb3VuZCgodGltZSAtIE11aERhdGUuZ2V0VGltZSgpKSAvIDg2NDAwMDAwKSAvIDcpICsgMTtcclxuICB9XHJcblxyXG4gIGdldFRvZGF5KCk6IE5nYkRhdGUgeyByZXR1cm4gdGhpcy5mcm9tR3JlZ29yaWFuKG5ldyBEYXRlKCkpOyB9XHJcblxyXG5cclxuICBpc1ZhbGlkKGRhdGU6IE5nYkRhdGUpOiBib29sZWFuIHtcclxuICAgIHJldHVybiBkYXRlICYmIGlzTnVtYmVyKGRhdGUueWVhcikgJiYgaXNOdW1iZXIoZGF0ZS5tb250aCkgJiYgaXNOdW1iZXIoZGF0ZS5kYXkpICYmXHJcbiAgICAgICAgIWlzTmFOKHRoaXMudG9HcmVnb3JpYW4oZGF0ZSkuZ2V0VGltZSgpKTtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgX3NldERheShkYXRlOiBOZ2JEYXRlLCBkYXk6IG51bWJlcik6IE5nYkRhdGUge1xyXG4gICAgZGF5ID0gK2RheTtcclxuICAgIGxldCBtRGF5cyA9IHRoaXMuZ2V0RGF5c1Blck1vbnRoKGRhdGUubW9udGgsIGRhdGUueWVhcik7XHJcbiAgICBpZiAoZGF5IDw9IDApIHtcclxuICAgICAgd2hpbGUgKGRheSA8PSAwKSB7XHJcbiAgICAgICAgZGF0ZSA9IHRoaXMuX3NldE1vbnRoKGRhdGUsIGRhdGUubW9udGggLSAxKTtcclxuICAgICAgICBtRGF5cyA9IHRoaXMuZ2V0RGF5c1Blck1vbnRoKGRhdGUubW9udGgsIGRhdGUueWVhcik7XHJcbiAgICAgICAgZGF5ICs9IG1EYXlzO1xyXG4gICAgICB9XHJcbiAgICB9IGVsc2UgaWYgKGRheSA+IG1EYXlzKSB7XHJcbiAgICAgIHdoaWxlIChkYXkgPiBtRGF5cykge1xyXG4gICAgICAgIGRheSAtPSBtRGF5cztcclxuICAgICAgICBkYXRlID0gdGhpcy5fc2V0TW9udGgoZGF0ZSwgZGF0ZS5tb250aCArIDEpO1xyXG4gICAgICAgIG1EYXlzID0gdGhpcy5nZXREYXlzUGVyTW9udGgoZGF0ZS5tb250aCwgZGF0ZS55ZWFyKTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gICAgZGF0ZS5kYXkgPSBkYXk7XHJcbiAgICByZXR1cm4gZGF0ZTtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgX3NldE1vbnRoKGRhdGU6IE5nYkRhdGUsIG1vbnRoOiBudW1iZXIpOiBOZ2JEYXRlIHtcclxuICAgIG1vbnRoID0gK21vbnRoO1xyXG4gICAgZGF0ZS55ZWFyID0gZGF0ZS55ZWFyICsgTWF0aC5mbG9vcigobW9udGggLSAxKSAvIDEyKTtcclxuICAgIGRhdGUubW9udGggPSBNYXRoLmZsb29yKCgobW9udGggLSAxKSAlIDEyICsgMTIpICUgMTIpICsgMTtcclxuICAgIHJldHVybiBkYXRlO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBfc2V0WWVhcihkYXRlOiBOZ2JEYXRlLCB5ZWFyOiBudW1iZXIpOiBOZ2JEYXRlIHtcclxuICAgIGRhdGUueWVhciA9ICt5ZWFyO1xyXG4gICAgcmV0dXJuIGRhdGU7XHJcbiAgfVxyXG59XHJcbiIsImltcG9ydCB7TmdiQ2FsZW5kYXJIaWpyaX0gZnJvbSAnLi9uZ2ItY2FsZW5kYXItaGlqcmknO1xyXG5pbXBvcnQge05nYkRhdGV9IGZyb20gJy4uL25nYi1kYXRlJztcclxuaW1wb3J0IHtJbmplY3RhYmxlfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuXHJcbi8qKlxyXG4gKiBDaGVja3MgaWYgaXNsYW1pYyB5ZWFyIGlzIGEgbGVhcCB5ZWFyXHJcbiAqL1xyXG5mdW5jdGlvbiBpc0lzbGFtaWNMZWFwWWVhcihoWWVhcjogbnVtYmVyKTogYm9vbGVhbiB7XHJcbiAgcmV0dXJuICgxNCArIDExICogaFllYXIpICUgMzAgPCAxMTtcclxufVxyXG5cclxuLyoqXHJcbiAqIENoZWNrcyBpZiBncmVnb3JpYW4geWVhcnMgaXMgYSBsZWFwIHllYXJcclxuICovXHJcbmZ1bmN0aW9uIGlzR3JlZ29yaWFuTGVhcFllYXIoZ0RhdGU6IERhdGUpOiBib29sZWFuIHtcclxuICBjb25zdCB5ZWFyID0gZ0RhdGUuZ2V0RnVsbFllYXIoKTtcclxuICByZXR1cm4geWVhciAlIDQgPT09IDAgJiYgeWVhciAlIDEwMCAhPT0gMCB8fCB5ZWFyICUgNDAwID09PSAwO1xyXG59XHJcblxyXG4vKipcclxuICogUmV0dXJucyB0aGUgc3RhcnQgb2YgSGlqcmkgTW9udGguXHJcbiAqIGBoTW9udGhgIGlzIDAgZm9yIE11aGFycmFtLCAxIGZvciBTYWZhciwgZXRjLlxyXG4gKiBgaFllYXJgIGlzIGFueSBIaWpyaSBoWWVhci5cclxuICovXHJcbmZ1bmN0aW9uIGdldElzbGFtaWNNb250aFN0YXJ0KGhZZWFyOiBudW1iZXIsIGhNb250aDogbnVtYmVyKTogbnVtYmVyIHtcclxuICByZXR1cm4gTWF0aC5jZWlsKDI5LjUgKiBoTW9udGgpICsgKGhZZWFyIC0gMSkgKiAzNTQgKyBNYXRoLmZsb29yKCgzICsgMTEgKiBoWWVhcikgLyAzMC4wKTtcclxufVxyXG5cclxuLyoqXHJcbiAqIFJldHVybnMgdGhlIHN0YXJ0IG9mIEhpanJpIHllYXIuXHJcbiAqIGB5ZWFyYCBpcyBhbnkgSGlqcmkgeWVhci5cclxuICovXHJcbmZ1bmN0aW9uIGdldElzbGFtaWNZZWFyU3RhcnQoeWVhcjogbnVtYmVyKTogbnVtYmVyIHtcclxuICByZXR1cm4gKHllYXIgLSAxKSAqIDM1NCArIE1hdGguZmxvb3IoKDMgKyAxMSAqIHllYXIpIC8gMzAuMCk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIG1vZChhOiBudW1iZXIsIGI6IG51bWJlcik6IG51bWJlciB7XHJcbiAgcmV0dXJuIGEgLSBiICogTWF0aC5mbG9vcihhIC8gYik7XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBUaGUgY2l2aWwgY2FsZW5kYXIgaXMgb25lIHR5cGUgb2YgSGlqcmkgY2FsZW5kYXJzIHVzZWQgaW4gaXNsYW1pYyBjb3VudHJpZXMuXHJcbiAqIFVzZXMgYSBmaXhlZCBjeWNsZSBvZiBhbHRlcm5hdGluZyAyOS0gYW5kIDMwLWRheSBtb250aHMsXHJcbiAqIHdpdGggYSBsZWFwIGRheSBhZGRlZCB0byB0aGUgbGFzdCBtb250aCBvZiAxMSBvdXQgb2YgZXZlcnkgMzAgeWVhcnMuXHJcbiAqIGh0dHA6Ly9jbGRyLnVuaWNvZGUub3JnL2RldmVsb3BtZW50L2RldmVsb3BtZW50LXByb2Nlc3MvZGVzaWduLXByb3Bvc2Fscy9pc2xhbWljLWNhbGVuZGFyLXR5cGVzXHJcbiAqIEFsbCB0aGUgY2FsY3VsYXRpb25zIGhlcmUgYXJlIGJhc2VkIG9uIHRoZSBlcXVhdGlvbnMgZnJvbSBcIkNhbGVuZHJpY2FsIENhbGN1bGF0aW9uc1wiIEJ5IEVkd2FyZCBNLiBSZWluZ29sZCwgTmFjaHVtXHJcbiAqIERlcnNob3dpdHouXHJcbiAqL1xyXG5cclxuY29uc3QgR1JFR09SSUFOX0VQT0NIID0gMTcyMTQyNS41O1xyXG5jb25zdCBJU0xBTUlDX0VQT0NIID0gMTk0ODQzOS41O1xyXG5cclxuQEluamVjdGFibGUoKVxyXG5leHBvcnQgY2xhc3MgTmdiQ2FsZW5kYXJJc2xhbWljQ2l2aWwgZXh0ZW5kcyBOZ2JDYWxlbmRhckhpanJpIHtcclxuICAvKipcclxuICAgKiBSZXR1cm5zIHRoZSBlcXVpdmFsZW50IGlzbGFtaWMoY2l2aWwpIGRhdGUgdmFsdWUgZm9yIGEgZ2l2ZSBpbnB1dCBHcmVnb3JpYW4gZGF0ZS5cclxuICAgKiBgZ0RhdGVgIGlzIGEgSlMgRGF0ZSB0byBiZSBjb252ZXJ0ZWQgdG8gSGlqcmkuXHJcbiAgICovXHJcbiAgZnJvbUdyZWdvcmlhbihnRGF0ZTogRGF0ZSk6IE5nYkRhdGUge1xyXG4gICAgY29uc3QgZ1llYXIgPSBnRGF0ZS5nZXRGdWxsWWVhcigpLCBnTW9udGggPSBnRGF0ZS5nZXRNb250aCgpLCBnRGF5ID0gZ0RhdGUuZ2V0RGF0ZSgpO1xyXG5cclxuICAgIGxldCBqdWxpYW5EYXkgPSBHUkVHT1JJQU5fRVBPQ0ggLSAxICsgMzY1ICogKGdZZWFyIC0gMSkgKyBNYXRoLmZsb29yKChnWWVhciAtIDEpIC8gNCkgK1xyXG4gICAgICAgIC1NYXRoLmZsb29yKChnWWVhciAtIDEpIC8gMTAwKSArIE1hdGguZmxvb3IoKGdZZWFyIC0gMSkgLyA0MDApICtcclxuICAgICAgICBNYXRoLmZsb29yKFxyXG4gICAgICAgICAgICAoMzY3ICogKGdNb250aCArIDEpIC0gMzYyKSAvIDEyICsgKGdNb250aCArIDEgPD0gMiA/IDAgOiBpc0dyZWdvcmlhbkxlYXBZZWFyKGdEYXRlKSA/IC0xIDogLTIpICsgZ0RheSk7XHJcbiAgICBqdWxpYW5EYXkgPSBNYXRoLmZsb29yKGp1bGlhbkRheSkgKyAwLjU7XHJcblxyXG4gICAgY29uc3QgZGF5cyA9IGp1bGlhbkRheSAtIElTTEFNSUNfRVBPQ0g7XHJcbiAgICBjb25zdCBoWWVhciA9IE1hdGguZmxvb3IoKDMwICogZGF5cyArIDEwNjQ2KSAvIDEwNjMxLjApO1xyXG4gICAgbGV0IGhNb250aCA9IE1hdGguY2VpbCgoZGF5cyAtIDI5IC0gZ2V0SXNsYW1pY1llYXJTdGFydChoWWVhcikpIC8gMjkuNSk7XHJcbiAgICBoTW9udGggPSBNYXRoLm1pbihoTW9udGgsIDExKTtcclxuICAgIGNvbnN0IGhEYXkgPSBNYXRoLmNlaWwoZGF5cyAtIGdldElzbGFtaWNNb250aFN0YXJ0KGhZZWFyLCBoTW9udGgpKSArIDE7XHJcbiAgICByZXR1cm4gbmV3IE5nYkRhdGUoaFllYXIsIGhNb250aCArIDEsIGhEYXkpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogUmV0dXJucyB0aGUgZXF1aXZhbGVudCBKUyBkYXRlIHZhbHVlIGZvciBhIGdpdmUgaW5wdXQgaXNsYW1pYyhjaXZpbCkgZGF0ZS5cclxuICAgKiBgaERhdGVgIGlzIGFuIGlzbGFtaWMoY2l2aWwpIGRhdGUgdG8gYmUgY29udmVydGVkIHRvIEdyZWdvcmlhbi5cclxuICAgKi9cclxuICB0b0dyZWdvcmlhbihoRGF0ZTogTmdiRGF0ZSk6IERhdGUge1xyXG4gICAgY29uc3QgaFllYXIgPSBoRGF0ZS55ZWFyO1xyXG4gICAgY29uc3QgaE1vbnRoID0gaERhdGUubW9udGggLSAxO1xyXG4gICAgY29uc3QgaERheSA9IGhEYXRlLmRheTtcclxuICAgIGNvbnN0IGp1bGlhbkRheSA9XHJcbiAgICAgICAgaERheSArIE1hdGguY2VpbCgyOS41ICogaE1vbnRoKSArIChoWWVhciAtIDEpICogMzU0ICsgTWF0aC5mbG9vcigoMyArIDExICogaFllYXIpIC8gMzApICsgSVNMQU1JQ19FUE9DSCAtIDE7XHJcblxyXG4gICAgY29uc3Qgd2pkID0gTWF0aC5mbG9vcihqdWxpYW5EYXkgLSAwLjUpICsgMC41LCBkZXBvY2ggPSB3amQgLSBHUkVHT1JJQU5fRVBPQ0gsXHJcbiAgICAgICAgICBxdWFkcmljZW50ID0gTWF0aC5mbG9vcihkZXBvY2ggLyAxNDYwOTcpLCBkcWMgPSBtb2QoZGVwb2NoLCAxNDYwOTcpLCBjZW50ID0gTWF0aC5mbG9vcihkcWMgLyAzNjUyNCksXHJcbiAgICAgICAgICBkY2VudCA9IG1vZChkcWMsIDM2NTI0KSwgcXVhZCA9IE1hdGguZmxvb3IoZGNlbnQgLyAxNDYxKSwgZHF1YWQgPSBtb2QoZGNlbnQsIDE0NjEpLFxyXG4gICAgICAgICAgeWluZGV4ID0gTWF0aC5mbG9vcihkcXVhZCAvIDM2NSk7XHJcbiAgICBsZXQgeWVhciA9IHF1YWRyaWNlbnQgKiA0MDAgKyBjZW50ICogMTAwICsgcXVhZCAqIDQgKyB5aW5kZXg7XHJcbiAgICBpZiAoIShjZW50ID09PSA0IHx8IHlpbmRleCA9PT0gNCkpIHtcclxuICAgICAgeWVhcisrO1xyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0IGdZZWFyU3RhcnQgPSBHUkVHT1JJQU5fRVBPQ0ggKyAzNjUgKiAoeWVhciAtIDEpICsgTWF0aC5mbG9vcigoeWVhciAtIDEpIC8gNCkgLSBNYXRoLmZsb29yKCh5ZWFyIC0gMSkgLyAxMDApICtcclxuICAgICAgICBNYXRoLmZsb29yKCh5ZWFyIC0gMSkgLyA0MDApO1xyXG5cclxuICAgIGNvbnN0IHllYXJkYXkgPSB3amQgLSBnWWVhclN0YXJ0O1xyXG5cclxuICAgIGNvbnN0IHRqZCA9IEdSRUdPUklBTl9FUE9DSCAtIDEgKyAzNjUgKiAoeWVhciAtIDEpICsgTWF0aC5mbG9vcigoeWVhciAtIDEpIC8gNCkgLSBNYXRoLmZsb29yKCh5ZWFyIC0gMSkgLyAxMDApICtcclxuICAgICAgICBNYXRoLmZsb29yKCh5ZWFyIC0gMSkgLyA0MDApICsgTWF0aC5mbG9vcig3MzkgLyAxMiArIChpc0dyZWdvcmlhbkxlYXBZZWFyKG5ldyBEYXRlKHllYXIsIDMsIDEpKSA/IC0xIDogLTIpICsgMSk7XHJcblxyXG4gICAgY29uc3QgbGVhcGFkaiA9IHdqZCA8IHRqZCA/IDAgOiBpc0dyZWdvcmlhbkxlYXBZZWFyKG5ldyBEYXRlKHllYXIsIDMsIDEpKSA/IDEgOiAyO1xyXG5cclxuICAgIGNvbnN0IG1vbnRoID0gTWF0aC5mbG9vcigoKHllYXJkYXkgKyBsZWFwYWRqKSAqIDEyICsgMzczKSAvIDM2Nyk7XHJcbiAgICBjb25zdCB0amQyID0gR1JFR09SSUFOX0VQT0NIIC0gMSArIDM2NSAqICh5ZWFyIC0gMSkgKyBNYXRoLmZsb29yKCh5ZWFyIC0gMSkgLyA0KSAtIE1hdGguZmxvb3IoKHllYXIgLSAxKSAvIDEwMCkgK1xyXG4gICAgICAgIE1hdGguZmxvb3IoKHllYXIgLSAxKSAvIDQwMCkgK1xyXG4gICAgICAgIE1hdGguZmxvb3IoXHJcbiAgICAgICAgICAgICgzNjcgKiBtb250aCAtIDM2MikgLyAxMiArIChtb250aCA8PSAyID8gMCA6IGlzR3JlZ29yaWFuTGVhcFllYXIobmV3IERhdGUoeWVhciwgbW9udGggLSAxLCAxKSkgPyAtMSA6IC0yKSArXHJcbiAgICAgICAgICAgIDEpO1xyXG5cclxuICAgIGNvbnN0IGRheSA9IHdqZCAtIHRqZDIgKyAxO1xyXG5cclxuICAgIHJldHVybiBuZXcgRGF0ZSh5ZWFyLCBtb250aCAtIDEsIGRheSk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBSZXR1cm5zIHRoZSBudW1iZXIgb2YgZGF5cyBpbiBhIHNwZWNpZmljIEhpanJpIG1vbnRoLlxyXG4gICAqIGBtb250aGAgaXMgMSBmb3IgTXVoYXJyYW0sIDIgZm9yIFNhZmFyLCBldGMuXHJcbiAgICogYHllYXJgIGlzIGFueSBIaWpyaSB5ZWFyLlxyXG4gICAqL1xyXG4gIGdldERheXNQZXJNb250aChtb250aDogbnVtYmVyLCB5ZWFyOiBudW1iZXIpOiBudW1iZXIge1xyXG4gICAgeWVhciA9IHllYXIgKyBNYXRoLmZsb29yKG1vbnRoIC8gMTMpO1xyXG4gICAgbW9udGggPSAoKG1vbnRoIC0gMSkgJSAxMikgKyAxO1xyXG4gICAgbGV0IGxlbmd0aCA9IDI5ICsgbW9udGggJSAyO1xyXG4gICAgaWYgKG1vbnRoID09PSAxMiAmJiBpc0lzbGFtaWNMZWFwWWVhcih5ZWFyKSkge1xyXG4gICAgICBsZW5ndGgrKztcclxuICAgIH1cclxuICAgIHJldHVybiBsZW5ndGg7XHJcbiAgfVxyXG59XHJcbiIsImltcG9ydCB7TmdiQ2FsZW5kYXJJc2xhbWljQ2l2aWx9IGZyb20gJy4vbmdiLWNhbGVuZGFyLWlzbGFtaWMtY2l2aWwnO1xyXG5pbXBvcnQge05nYkRhdGV9IGZyb20gJy4uL25nYi1kYXRlJztcclxuaW1wb3J0IHtJbmplY3RhYmxlfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuXHJcbi8qKlxyXG4gKiBVbWFscXVyYSBjYWxlbmRhciBpcyBvbmUgdHlwZSBvZiBIaWpyaSBjYWxlbmRhcnMgdXNlZCBpbiBpc2xhbWljIGNvdW50cmllcy5cclxuICogVGhpcyBDYWxlbmRhciBpcyB1c2VkIGJ5IFNhdWRpIEFyYWJpYSBmb3IgYWRtaW5pc3RyYXRpdmUgcHVycG9zZS5cclxuICogVW5saWtlIHRhYnVsYXIgY2FsZW5kYXJzLCB0aGUgYWxnb3JpdGhtIGludm9sdmVzIGFzdHJvbm9taWNhbCBjYWxjdWxhdGlvbiwgYnV0IGl0J3Mgc3RpbGwgZGV0ZXJtaW5pc3RpYy5cclxuICogaHR0cDovL2NsZHIudW5pY29kZS5vcmcvZGV2ZWxvcG1lbnQvZGV2ZWxvcG1lbnQtcHJvY2Vzcy9kZXNpZ24tcHJvcG9zYWxzL2lzbGFtaWMtY2FsZW5kYXItdHlwZXNcclxuICovXHJcblxyXG5jb25zdCBHUkVHT1JJQU5fRklSU1RfREFURSA9IG5ldyBEYXRlKDE4ODIsIDEwLCAxMik7XHJcbmNvbnN0IEdSRUdPUklBTl9MQVNUX0RBVEUgPSBuZXcgRGF0ZSgyMTc0LCAxMCwgMjUpO1xyXG5jb25zdCBISUpSSV9CRUdJTiA9IDEzMDA7XHJcbmNvbnN0IEhJSlJJX0VORCA9IDE2MDA7XHJcbmNvbnN0IE9ORV9EQVkgPSAxMDAwICogNjAgKiA2MCAqIDI0O1xyXG5cclxuY29uc3QgTU9OVEhfTEVOR1RIID0gW1xyXG4gIC8vIDEzMDAtMTMwNFxyXG4gICcxMDEwMTAxMDEwMTAnLCAnMTEwMTAxMDEwMTAwJywgJzExMTAxMTAwMTAwMScsICcwMTEwMTEwMTAxMDAnLCAnMDExMDExMTAxMDEwJyxcclxuICAvLyAxMzA1LTEzMDlcclxuICAnMDAxMTAxMTAxMTAwJywgJzEwMTAxMDEwMTEwMScsICcwMTAxMDEwMTAxMDEnLCAnMDExMDEwMTAxMDAxJywgJzAxMTExMDAxMDAxMCcsXHJcbiAgLy8gMTMxMC0xMzE0XHJcbiAgJzEwMTExMDEwMTAwMScsICcwMTAxMTEwMTAxMDAnLCAnMTAxMDExMDExMDEwJywgJzAxMDEwMTAxMTEwMCcsICcxMTAxMDAxMDExMDEnLFxyXG4gIC8vIDEzMTUtMTMxOVxyXG4gICcwMTEwMTAwMTAxMDEnLCAnMDExMTAxMDAxMDEwJywgJzEwMTEwMTAxMDEwMCcsICcxMDExMDExMDEwMTAnLCAnMDEwMTEwMTAxMTAxJyxcclxuICAvLyAxMzIwLTEzMjRcclxuICAnMDEwMDEwMTAxMTEwJywgJzEwMTAwMTAwMTExMScsICcwMTAxMDAwMTAxMTEnLCAnMDExMDEwMDAxMDExJywgJzAxMTAxMDEwMDEwMScsXHJcbiAgLy8gMTMyNS0xMzI5XHJcbiAgJzEwMTAxMTAxMDEwMScsICcwMDEwMTEwMTAxMTAnLCAnMTAwMTAxMDExMDExJywgJzAxMDAxMDAxMTEwMScsICcxMDEwMDEwMDExMDEnLFxyXG4gIC8vIDEzMzAtMTMzNFxyXG4gICcxMTAxMDAxMDAxMTAnLCAnMTEwMTEwMDEwMTAxJywgJzAxMDExMDEwMTEwMCcsICcxMDAxMTAxMTAxMTAnLCAnMDAxMDEwMTExMDEwJyxcclxuICAvLyAxMzM1LTEzMzlcclxuICAnMTAxMDAxMDExMDExJywgJzAxMDEwMDEwMTAxMScsICcxMDEwMTAwMTAxMDEnLCAnMDExMDExMDAxMDEwJywgJzEwMTAxMTEwMTAwMScsXHJcbiAgLy8gMTM0MC0xMzQ0XHJcbiAgJzAwMTAxMTExMDEwMCcsICcxMDAxMDExMTAxMTAnLCAnMDAxMDEwMTEwMTEwJywgJzEwMDEwMTAxMDExMCcsICcxMDEwMTEwMDEwMTAnLFxyXG4gIC8vIDEzNDUtMTM0OVxyXG4gICcxMDExMTAxMDAxMDAnLCAnMTAxMTExMDEwMDEwJywgJzAxMDExMTAxMTAwMScsICcwMDEwMTEwMTExMDAnLCAnMTAwMTAxMTAxMTAxJyxcclxuICAvLyAxMzUwLTEzNTRcclxuICAnMDEwMTAxMDAxMTAxJywgJzEwMTAxMDEwMDEwMScsICcxMDExMDEwMTAwMTAnLCAnMTAxMTEwMTAwMTAxJywgJzAxMDExMDExMDEwMCcsXHJcbiAgLy8gMTM1NS0xMzU5XHJcbiAgJzEwMDExMDExMDExMCcsICcwMTAxMDEwMTAxMTEnLCAnMDAxMDEwMDEwMTExJywgJzAxMDEwMTAwMTAxMScsICcwMTEwMTAxMDAwMTEnLFxyXG4gIC8vIDEzNjAtMTM2NFxyXG4gICcwMTExMDEwMTAwMTAnLCAnMTAxMTAxMTAwMTAxJywgJzAxMDEwMTEwMTAxMCcsICcxMDEwMTAxMDEwMTEnLCAnMDEwMTAwMTAxMDExJyxcclxuICAvLyAxMzY1LTEzNjlcclxuICAnMTEwMDEwMDEwMTAxJywgJzExMDEwMTAwMTAxMCcsICcxMTAxMTAxMDAxMDEnLCAnMDEwMTExMDAxMDEwJywgJzEwMTAxMTAxMDExMCcsXHJcbiAgLy8gMTM3MC0xMzc0XHJcbiAgJzEwMDEwMTAxMDExMScsICcwMTAwMTAxMDEwMTEnLCAnMTAwMTAxMDAxMDExJywgJzEwMTAxMDEwMDEwMScsICcxMDExMDEwMTAwMTAnLFxyXG4gIC8vIDEzNzUtMTM3OVxyXG4gICcxMDExMDExMDEwMTAnLCAnMDEwMTAxMTEwMTAxJywgJzAwMTAwMTExMDExMCcsICcxMDAwMTAxMTAxMTEnLCAnMDEwMDAxMDExMDExJyxcclxuICAvLyAxMzgwLTEzODRcclxuICAnMDEwMTAxMDEwMTAxJywgJzAxMDExMDEwMTAwMScsICcwMTAxMTAxMTAxMDAnLCAnMTAwMTExMDExMDEwJywgJzAxMDAxMTAxMTEwMScsXHJcbiAgLy8gMTM4NS0xMzg5XHJcbiAgJzAwMTAwMTEwMTExMCcsICcxMDAxMDAxMTAxMTAnLCAnMTAxMDEwMTAxMDEwJywgJzExMDEwMTAxMDEwMCcsICcxMTAxMTAxMTAwMTAnLFxyXG4gIC8vIDEzOTAtMTM5NFxyXG4gICcwMTAxMTEwMTAxMDEnLCAnMDAxMDExMDExMDEwJywgJzEwMDEwMTAxMTAxMScsICcwMTAwMTAxMDEwMTEnLCAnMTAxMDAxMDEwMTAxJyxcclxuICAvLyAxMzk1LTEzOTlcclxuICAnMTAxMTAxMDAxMDAxJywgJzEwMTEwMTEwMDEwMCcsICcxMDExMDExMTAwMDEnLCAnMDEwMTEwMTEwMTAwJywgJzEwMTAxMDExMDEwMScsXHJcbiAgLy8gMTQwMC0xNDA0XHJcbiAgJzEwMTAwMTAxMDEwMScsICcxMTAxMDAxMDAxMDEnLCAnMTExMDEwMDEwMDEwJywgJzExMTAxMTAwMTAwMScsICcwMTEwMTEwMTAxMDAnLFxyXG4gIC8vIDE0MDUtMTQwOVxyXG4gICcxMDEwMTExMDEwMDEnLCAnMTAwMTAxMTAxMDExJywgJzAxMDAxMDEwMTAxMScsICcxMDEwMTAwMTAwMTEnLCAnMTEwMTAxMDAxMDAxJyxcclxuICAvLyAxNDEwLTE0MTRcclxuICAnMTEwMTEwMTAwMTAwJywgJzExMDExMDExMDAxMCcsICcxMDEwMTAxMTEwMDEnLCAnMDEwMDEwMTExMDEwJywgJzEwMTAwMTAxMTAxMScsXHJcbiAgLy8gMTQxNS0xNDE5XHJcbiAgJzAxMDEwMDEwMTAxMScsICcxMDEwMTAwMTAxMDEnLCAnMTAxMTAwMTAxMDEwJywgJzEwMTEwMTAxMDEwMScsICcwMTAxMDEwMTExMDAnLFxyXG4gIC8vIDE0MjAtMTQyNFxyXG4gICcwMTAwMTAxMTExMDEnLCAnMDAxMDAwMTExMTAxJywgJzEwMDEwMDAxMTEwMScsICcxMDEwMTAwMTAxMDEnLCAnMTAxMTAxMDAxMDEwJyxcclxuICAvLyAxNDI1LTE0MjlcclxuICAnMTAxMTAxMDExMDEwJywgJzAxMDEwMTEwMTEwMScsICcwMDEwMTAxMTAxMTAnLCAnMTAwMTAwMTExMDExJywgJzAxMDAxMDAxMTAxMScsXHJcbiAgLy8gMTQzMC0xNDM0XHJcbiAgJzAxMTAwMTAxMDEwMScsICcwMTEwMTAxMDEwMDEnLCAnMDExMTAxMDEwMTAwJywgJzEwMTEwMTEwMTAxMCcsICcwMTAxMDExMDExMDAnLFxyXG4gIC8vIDE0MzUtMTQzOVxyXG4gICcxMDEwMTAxMDExMDEnLCAnMDEwMTAxMDEwMTAxJywgJzEwMTEwMDEwMTAwMScsICcxMDExMTAwMTAwMTAnLCAnMTAxMTEwMTAxMDAxJyxcclxuICAvLyAxNDQwLTE0NDRcclxuICAnMDEwMTExMDEwMTAwJywgJzEwMTAxMTAxMTAxMCcsICcwMTAxMDEwMTEwMTAnLCAnMTAxMDEwMTAxMDExJywgJzAxMDExMDAxMDEwMScsXHJcbiAgLy8gMTQ0NS0xNDQ5XHJcbiAgJzAxMTEwMTAwMTAwMScsICcwMTExMDExMDAxMDAnLCAnMTAxMTEwMTAxMDEwJywgJzAxMDExMDExMDEwMScsICcwMDEwMTAxMTAxMTAnLFxyXG4gIC8vIDE0NTAtMTQ1NFxyXG4gICcxMDEwMDEwMTAxMTAnLCAnMTExMDAxMDAxMTAxJywgJzEwMTEwMDEwMDEwMScsICcxMDExMDEwMTAwMTAnLCAnMTAxMTAxMTAxMDEwJyxcclxuICAvLyAxNDU1LTE0NTlcclxuICAnMDEwMTEwMTAxMTAxJywgJzAwMTAxMDEwMTExMCcsICcxMDAxMDAxMDExMTEnLCAnMDEwMDEwMDEwMTExJywgJzAxMTAwMTAwMTAxMScsXHJcbiAgLy8gMTQ2MC0xNDY0XHJcbiAgJzAxMTAxMDEwMDEwMScsICcwMTEwMTAxMDExMDAnLCAnMTAxMDExMDEwMTEwJywgJzAxMDEwMTAxMTEwMScsICcwMTAwMTAwMTExMDEnLFxyXG4gIC8vIDE0NjUtMTQ2OVxyXG4gICcxMDEwMDEwMDExMDEnLCAnMTEwMTAwMDEwMTEwJywgJzExMDExMDAxMDEwMScsICcwMTAxMTAxMDEwMTAnLCAnMDEwMTEwMTEwMTAxJyxcclxuICAvLyAxNDcwLTE0NzRcclxuICAnMDAxMDExMDExMDEwJywgJzEwMDEwMTAxMTAxMScsICcwMTAwMTAxMDExMDEnLCAnMDEwMTEwMDEwMTAxJywgJzAxMTAxMTAwMTAxMCcsXHJcbiAgLy8gMTQ3NS0xNDc5XHJcbiAgJzAxMTAxMTEwMDEwMCcsICcxMDEwMTExMDEwMTAnLCAnMDEwMDExMTEwMTAxJywgJzAwMTAxMDExMDExMCcsICcxMDAxMDEwMTAxMTAnLFxyXG4gIC8vIDE0ODAtMTQ4NFxyXG4gICcxMDEwMTAxMDEwMTAnLCAnMTAxMTAxMDEwMTAwJywgJzEwMTExMTAxMDAxMCcsICcwMTAxMTEwMTEwMDEnLCAnMDAxMDExMTAxMDEwJyxcclxuICAvLyAxNDg1LTE0ODlcclxuICAnMTAwMTAxMTAxMTAxJywgJzAxMDAxMDEwMTEwMScsICcxMDEwMTAwMTAxMDEnLCAnMTAxMTAxMDAxMDEwJywgJzEwMTExMDEwMDEwMScsXHJcbiAgLy8gMTQ5MC0xNDk0XHJcbiAgJzAxMDExMDExMDAxMCcsICcxMDAxMTAxMTAxMDEnLCAnMDEwMDExMDEwMTEwJywgJzEwMTAxMDAxMDExMScsICcwMTAxMDEwMDAxMTEnLFxyXG4gIC8vIDE0OTUtMTQ5OVxyXG4gICcwMTEwMTAwMTAwMTEnLCAnMDExMTAxMDAxMDAxJywgJzEwMTEwMTAxMDEwMScsICcwMTAxMDExMDEwMTAnLCAnMTAxMDAxMTAxMDExJyxcclxuICAvLyAxNTAwLTE1MDRcclxuICAnMDEwMTAwMTAxMDExJywgJzEwMTAxMDAwMTAxMScsICcxMTAxMDEwMDAxMTAnLCAnMTEwMTEwMTAwMDExJywgJzAxMDExMTAwMTAxMCcsXHJcbiAgLy8gMTUwNS0xNTA5XHJcbiAgJzEwMTAxMTAxMDExMCcsICcwMTAwMTEwMTEwMTEnLCAnMDAxMDAxMTAxMDExJywgJzEwMDEwMTAwMTAxMScsICcxMDEwMTAxMDAxMDEnLFxyXG4gIC8vIDE1MTAtMTUxNFxyXG4gICcxMDExMDEwMTAwMTAnLCAnMTAxMTAxMTAxMDAxJywgJzAxMDEwMTExMDEwMScsICcwMDAxMDExMTAxMTAnLCAnMTAwMDEwMTEwMTExJyxcclxuICAvLyAxNTE1LTE1MTlcclxuICAnMDAxMDAxMDExMDExJywgJzAxMDEwMDEwMTAxMScsICcwMTAxMDExMDAxMDEnLCAnMDEwMTEwMTEwMTAwJywgJzEwMDExMTAxMTAxMCcsXHJcbiAgLy8gMTUyMC0xNTI0XHJcbiAgJzAxMDAxMTEwMTEwMScsICcwMDAxMDExMDExMDEnLCAnMTAwMDEwMTEwMTEwJywgJzEwMTAxMDEwMDExMCcsICcxMTAxMDEwMTAwMTAnLFxyXG4gIC8vIDE1MjUtMTUyOVxyXG4gICcxMTAxMTAxMDEwMDEnLCAnMDEwMTExMDEwMTAwJywgJzEwMTAxMTAxMTAxMCcsICcxMDAxMDEwMTEwMTEnLCAnMDEwMDEwMTAxMDExJyxcclxuICAvLyAxNTMwLTE1MzRcclxuICAnMDExMDAxMDEwMDExJywgJzAxMTEwMDEwMTAwMScsICcwMTExMDExMDAwMTAnLCAnMTAxMTEwMTAxMDAxJywgJzAxMDExMDExMDAxMCcsXHJcbiAgLy8gMTUzNS0xNTM5XHJcbiAgJzEwMTAxMDExMDEwMScsICcwMTAxMDEwMTAxMDEnLCAnMTAxMTAwMTAwMTAxJywgJzExMDExMDAxMDAxMCcsICcxMTEwMTEwMDEwMDEnLFxyXG4gIC8vIDE1NDAtMTU0NFxyXG4gICcwMTEwMTEwMTAwMTAnLCAnMTAxMDExMTAxMDAxJywgJzAxMDEwMTEwMTAxMScsICcwMTAwMTAxMDEwMTEnLCAnMTAxMDAxMDEwMTAxJyxcclxuICAvLyAxNTQ1LTE1NDlcclxuICAnMTEwMTAwMTAxMDAxJywgJzExMDEwMTAxMDEwMCcsICcxMTAxMTAxMDEwMTAnLCAnMTAwMTEwMTEwMTAxJywgJzAxMDAxMDExMTAxMCcsXHJcbiAgLy8gMTU1MC0xNTU0XHJcbiAgJzEwMTAwMDExMTAxMScsICcwMTAwMTAwMTEwMTEnLCAnMTAxMDAxMDAxMTAxJywgJzEwMTAxMDEwMTAxMCcsICcxMDEwMTEwMTAxMDEnLFxyXG4gIC8vIDE1NTUtMTU1OVxyXG4gICcwMDEwMTEwMTEwMTAnLCAnMTAwMTAxMDExMTAxJywgJzAxMDAwMTAxMTExMCcsICcxMDEwMDAxMDExMTAnLCAnMTEwMDEwMDExMDEwJyxcclxuICAvLyAxNTYwLTE1NjRcclxuICAnMTEwMTAxMDEwMTAxJywgJzAxMTAxMDExMDAxMCcsICcwMTEwMTAxMTEwMDEnLCAnMDEwMDEwMTExMDEwJywgJzEwMTAwMTAxMTEwMScsXHJcbiAgLy8gMTU2NS0xNTY5XHJcbiAgJzAxMDEwMDEwMTEwMScsICcxMDEwMTAwMTAxMDEnLCAnMTAxMTAxMDEwMDEwJywgJzEwMTExMDEwMTAwMCcsICcxMDExMTAxMTAxMDAnLFxyXG4gIC8vIDE1NzAtMTU3NFxyXG4gICcwMTAxMTAxMTEwMDEnLCAnMDAxMDExMDExMDEwJywgJzEwMDEwMTAxMTAxMCcsICcxMDExMDEwMDEwMTAnLCAnMTEwMTEwMTAwMTAwJyxcclxuICAvLyAxNTc1LTE1NzlcclxuICAnMTExMDExMDEwMDAxJywgJzAxMTAxMTEwMTAwMCcsICcxMDExMDExMDEwMTAnLCAnMDEwMTAxMTAxMTAxJywgJzAxMDEwMDExMDEwMScsXHJcbiAgLy8gMTU4MC0xNTg0XHJcbiAgJzAxMTAxMDAxMDEwMScsICcxMTAxMDEwMDEwMTAnLCAnMTEwMTEwMTAxMDAwJywgJzExMDExMTAxMDEwMCcsICcwMTEwMTEwMTEwMTAnLFxyXG4gIC8vIDE1ODUtMTU4OVxyXG4gICcwMTAxMDEwMTEwMTEnLCAnMDAxMDEwMDExMTAxJywgJzAxMTAwMDEwMTAxMScsICcxMDExMDAwMTAxMDEnLCAnMTAxMTAxMDAxMDEwJyxcclxuICAvLyAxNTkwLTE1OTRcclxuICAnMTAxMTEwMDEwMTAxJywgJzAxMDExMDEwMTAxMCcsICcxMDEwMTAxMDExMTAnLCAnMTAwMTAwMTAxMTEwJywgJzExMDAxMDAwMTExMScsXHJcbiAgLy8gMTU5NS0xNTk5XHJcbiAgJzAxMDEwMDEwMDExMScsICcwMTEwMTAwMTAxMDEnLCAnMDExMDEwMTAxMDEwJywgJzEwMTAxMTAxMDExMCcsICcwMTAxMDEwMTExMDEnLFxyXG4gIC8vIDE2MDBcclxuICAnMDAxMDEwMDExMTAxJ1xyXG5dO1xyXG5cclxuZnVuY3Rpb24gZ2V0RGF5c0RpZmYoZGF0ZTE6IERhdGUsIGRhdGUyOiBEYXRlKTogbnVtYmVyIHtcclxuICBjb25zdCBkaWZmID0gTWF0aC5hYnMoZGF0ZTEuZ2V0VGltZSgpIC0gZGF0ZTIuZ2V0VGltZSgpKTtcclxuICByZXR1cm4gTWF0aC5yb3VuZChkaWZmIC8gT05FX0RBWSk7XHJcbn1cclxuXHJcbkBJbmplY3RhYmxlKClcclxuZXhwb3J0IGNsYXNzIE5nYkNhbGVuZGFySXNsYW1pY1VtYWxxdXJhIGV4dGVuZHMgTmdiQ2FsZW5kYXJJc2xhbWljQ2l2aWwge1xyXG4gIC8qKlxyXG4gICogUmV0dXJucyB0aGUgZXF1aXZhbGVudCBpc2xhbWljKFVtYWxxdXJhKSBkYXRlIHZhbHVlIGZvciBhIGdpdmUgaW5wdXQgR3JlZ29yaWFuIGRhdGUuXHJcbiAgKiBgZ2RhdGVgIGlzIHMgSlMgRGF0ZSB0byBiZSBjb252ZXJ0ZWQgdG8gSGlqcmkuXHJcbiAgKi9cclxuICBmcm9tR3JlZ29yaWFuKGdEYXRlOiBEYXRlKTogTmdiRGF0ZSB7XHJcbiAgICBsZXQgaERheSA9IDEsIGhNb250aCA9IDAsIGhZZWFyID0gMTMwMDtcclxuICAgIGxldCBkYXlzRGlmZiA9IGdldERheXNEaWZmKGdEYXRlLCBHUkVHT1JJQU5fRklSU1RfREFURSk7XHJcbiAgICBpZiAoZ0RhdGUuZ2V0VGltZSgpIC0gR1JFR09SSUFOX0ZJUlNUX0RBVEUuZ2V0VGltZSgpID49IDAgJiYgZ0RhdGUuZ2V0VGltZSgpIC0gR1JFR09SSUFOX0xBU1RfREFURS5nZXRUaW1lKCkgPD0gMCkge1xyXG4gICAgICBsZXQgeWVhciA9IDEzMDA7XHJcbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgTU9OVEhfTEVOR1RILmxlbmd0aDsgaSsrLCB5ZWFyKyspIHtcclxuICAgICAgICBmb3IgKGxldCBqID0gMDsgaiA8IDEyOyBqKyspIHtcclxuICAgICAgICAgIGxldCBudW1PZkRheXMgPSArTU9OVEhfTEVOR1RIW2ldW2pdICsgMjk7XHJcbiAgICAgICAgICBpZiAoZGF5c0RpZmYgPD0gbnVtT2ZEYXlzKSB7XHJcbiAgICAgICAgICAgIGhEYXkgPSBkYXlzRGlmZiArIDE7XHJcbiAgICAgICAgICAgIGlmIChoRGF5ID4gbnVtT2ZEYXlzKSB7XHJcbiAgICAgICAgICAgICAgaERheSA9IDE7XHJcbiAgICAgICAgICAgICAgaisrO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmIChqID4gMTEpIHtcclxuICAgICAgICAgICAgICBqID0gMDtcclxuICAgICAgICAgICAgICB5ZWFyKys7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaE1vbnRoID0gajtcclxuICAgICAgICAgICAgaFllYXIgPSB5ZWFyO1xyXG4gICAgICAgICAgICByZXR1cm4gbmV3IE5nYkRhdGUoaFllYXIsIGhNb250aCArIDEsIGhEYXkpO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgICAgZGF5c0RpZmYgPSBkYXlzRGlmZiAtIG51bU9mRGF5cztcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHJldHVybiBzdXBlci5mcm9tR3JlZ29yaWFuKGdEYXRlKTtcclxuICAgIH1cclxuICB9XHJcbiAgLyoqXHJcbiAgKiBDb252ZXJ0cyB0aGUgY3VycmVudCBIaWpyaSBkYXRlIHRvIEdyZWdvcmlhbi5cclxuICAqL1xyXG4gIHRvR3JlZ29yaWFuKGhEYXRlOiBOZ2JEYXRlKTogRGF0ZSB7XHJcbiAgICBjb25zdCBoWWVhciA9IGhEYXRlLnllYXI7XHJcbiAgICBjb25zdCBoTW9udGggPSBoRGF0ZS5tb250aCAtIDE7XHJcbiAgICBjb25zdCBoRGF5ID0gaERhdGUuZGF5O1xyXG4gICAgbGV0IGdEYXRlID0gbmV3IERhdGUoR1JFR09SSUFOX0ZJUlNUX0RBVEUpO1xyXG4gICAgbGV0IGRheURpZmYgPSBoRGF5IC0gMTtcclxuICAgIGlmIChoWWVhciA+PSBISUpSSV9CRUdJTiAmJiBoWWVhciA8PSBISUpSSV9FTkQpIHtcclxuICAgICAgZm9yIChsZXQgeSA9IDA7IHkgPCBoWWVhciAtIEhJSlJJX0JFR0lOOyB5KyspIHtcclxuICAgICAgICBmb3IgKGxldCBtID0gMDsgbSA8IDEyOyBtKyspIHtcclxuICAgICAgICAgIGRheURpZmYgKz0gK01PTlRIX0xFTkdUSFt5XVttXSArIDI5O1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgICBmb3IgKGxldCBtID0gMDsgbSA8IGhNb250aDsgbSsrKSB7XHJcbiAgICAgICAgZGF5RGlmZiArPSArTU9OVEhfTEVOR1RIW2hZZWFyIC0gSElKUklfQkVHSU5dW21dICsgMjk7XHJcbiAgICAgIH1cclxuICAgICAgZ0RhdGUuc2V0RGF0ZShHUkVHT1JJQU5fRklSU1RfREFURS5nZXREYXRlKCkgKyBkYXlEaWZmKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIGdEYXRlID0gc3VwZXIudG9HcmVnb3JpYW4oaERhdGUpO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIGdEYXRlO1xyXG4gIH1cclxuICAvKipcclxuICAqIFJldHVybnMgdGhlIG51bWJlciBvZiBkYXlzIGluIGEgc3BlY2lmaWMgSGlqcmkgaE1vbnRoLlxyXG4gICogYGhNb250aGAgaXMgMSBmb3IgTXVoYXJyYW0sIDIgZm9yIFNhZmFyLCBldGMuXHJcbiAgKiBgaFllYXJgIGlzIGFueSBIaWpyaSBoWWVhci5cclxuICAqL1xyXG4gIGdldERheXNQZXJNb250aChoTW9udGg6IG51bWJlciwgaFllYXI6IG51bWJlcik6IG51bWJlciB7XHJcbiAgICBpZiAoaFllYXIgPj0gSElKUklfQkVHSU4gJiYgaFllYXIgPD0gSElKUklfRU5EKSB7XHJcbiAgICAgIGNvbnN0IHBvcyA9IGhZZWFyIC0gSElKUklfQkVHSU47XHJcbiAgICAgIHJldHVybiArTU9OVEhfTEVOR1RIW3Bvc11baE1vbnRoIC0gMV0gKyAyOTtcclxuICAgIH1cclxuICAgIHJldHVybiBzdXBlci5nZXREYXlzUGVyTW9udGgoaE1vbnRoLCBoWWVhcik7XHJcbiAgfVxyXG59XHJcbiIsImltcG9ydCB7TmdiRGF0ZX0gZnJvbSAnLi4vbmdiLWRhdGUnO1xyXG5cclxuLyoqXHJcbiAqIFJldHVybnMgdGhlIGVxdWl2YWxlbnQgSlMgZGF0ZSB2YWx1ZSBmb3IgYSBnaXZlIGlucHV0IEphbGFsaSBkYXRlLlxyXG4gKiBgamFsYWxpRGF0ZWAgaXMgYW4gSmFsYWxpIGRhdGUgdG8gYmUgY29udmVydGVkIHRvIEdyZWdvcmlhbi5cclxuICovXHJcbmV4cG9ydCBmdW5jdGlvbiB0b0dyZWdvcmlhbihqYWxhbGlEYXRlOiBOZ2JEYXRlKTogRGF0ZSB7XHJcbiAgbGV0IGpkbiA9IGphbGFsaVRvSnVsaWFuKGphbGFsaURhdGUueWVhciwgamFsYWxpRGF0ZS5tb250aCwgamFsYWxpRGF0ZS5kYXkpO1xyXG4gIGxldCBkYXRlID0ganVsaWFuVG9HcmVnb3JpYW4oamRuKTtcclxuICBkYXRlLnNldEhvdXJzKDYsIDMwLCAzLCAyMDApO1xyXG4gIHJldHVybiBkYXRlO1xyXG59XHJcblxyXG4vKipcclxuICogUmV0dXJucyB0aGUgZXF1aXZhbGVudCBqYWxhbGkgZGF0ZSB2YWx1ZSBmb3IgYSBnaXZlIGlucHV0IEdyZWdvcmlhbiBkYXRlLlxyXG4gKiBgZ2RhdGVgIGlzIGEgSlMgRGF0ZSB0byBiZSBjb252ZXJ0ZWQgdG8gamFsYWxpLlxyXG4gKiB1dGMgdG8gbG9jYWxcclxuICovXHJcbmV4cG9ydCBmdW5jdGlvbiBmcm9tR3JlZ29yaWFuKGdkYXRlOiBEYXRlKTogTmdiRGF0ZSB7XHJcbiAgbGV0IGcyZCA9IGdyZWdvcmlhblRvSnVsaWFuKGdkYXRlLmdldEZ1bGxZZWFyKCksIGdkYXRlLmdldE1vbnRoKCkgKyAxLCBnZGF0ZS5nZXREYXRlKCkpO1xyXG4gIHJldHVybiBqdWxpYW5Ub0phbGFsaShnMmQpO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gc2V0SmFsYWxpWWVhcihkYXRlOiBOZ2JEYXRlLCB5ZWFyVmFsdWU6IG51bWJlcik6IE5nYkRhdGUge1xyXG4gIGRhdGUueWVhciA9ICt5ZWFyVmFsdWU7XHJcbiAgcmV0dXJuIGRhdGU7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBzZXRKYWxhbGlNb250aChkYXRlOiBOZ2JEYXRlLCBtb250aDogbnVtYmVyKTogTmdiRGF0ZSB7XHJcbiAgbW9udGggPSArbW9udGg7XHJcbiAgZGF0ZS55ZWFyID0gZGF0ZS55ZWFyICsgTWF0aC5mbG9vcigobW9udGggLSAxKSAvIDEyKTtcclxuICBkYXRlLm1vbnRoID0gTWF0aC5mbG9vcigoKG1vbnRoIC0gMSkgJSAxMiArIDEyKSAlIDEyKSArIDE7XHJcbiAgcmV0dXJuIGRhdGU7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBzZXRKYWxhbGlEYXkoZGF0ZTogTmdiRGF0ZSwgZGF5OiBudW1iZXIpOiBOZ2JEYXRlIHtcclxuICBsZXQgbURheXMgPSBnZXREYXlzUGVyTW9udGgoZGF0ZS5tb250aCwgZGF0ZS55ZWFyKTtcclxuICBpZiAoZGF5IDw9IDApIHtcclxuICAgIHdoaWxlIChkYXkgPD0gMCkge1xyXG4gICAgICBkYXRlID0gc2V0SmFsYWxpTW9udGgoZGF0ZSwgZGF0ZS5tb250aCAtIDEpO1xyXG4gICAgICBtRGF5cyA9IGdldERheXNQZXJNb250aChkYXRlLm1vbnRoLCBkYXRlLnllYXIpO1xyXG4gICAgICBkYXkgKz0gbURheXM7XHJcbiAgICB9XHJcbiAgfSBlbHNlIGlmIChkYXkgPiBtRGF5cykge1xyXG4gICAgd2hpbGUgKGRheSA+IG1EYXlzKSB7XHJcbiAgICAgIGRheSAtPSBtRGF5cztcclxuICAgICAgZGF0ZSA9IHNldEphbGFsaU1vbnRoKGRhdGUsIGRhdGUubW9udGggKyAxKTtcclxuICAgICAgbURheXMgPSBnZXREYXlzUGVyTW9udGgoZGF0ZS5tb250aCwgZGF0ZS55ZWFyKTtcclxuICAgIH1cclxuICB9XHJcbiAgZGF0ZS5kYXkgPSBkYXk7XHJcbiAgcmV0dXJuIGRhdGU7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIG1vZChhOiBudW1iZXIsIGI6IG51bWJlcik6IG51bWJlciB7XHJcbiAgcmV0dXJuIGEgLSBiICogTWF0aC5mbG9vcihhIC8gYik7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGRpdihhOiBudW1iZXIsIGI6IG51bWJlcikge1xyXG4gIHJldHVybiBNYXRoLnRydW5jKGEgLyBiKTtcclxufVxyXG5cclxuLypcclxuIFRoaXMgZnVuY3Rpb24gZGV0ZXJtaW5lcyBpZiB0aGUgSmFsYWxpIChQZXJzaWFuKSB5ZWFyIGlzXHJcbiBsZWFwICgzNjYtZGF5IGxvbmcpIG9yIGlzIHRoZSBjb21tb24geWVhciAoMzY1IGRheXMpLCBhbmRcclxuIGZpbmRzIHRoZSBkYXkgaW4gTWFyY2ggKEdyZWdvcmlhbiBjYWxlbmRhcikgb2YgdGhlIGZpcnN0XHJcbiBkYXkgb2YgdGhlIEphbGFsaSB5ZWFyIChqYWxhbGlZZWFyKS5cclxuIEBwYXJhbSBqYWxhbGlZZWFyIEphbGFsaSBjYWxlbmRhciB5ZWFyICgtNjEgdG8gMzE3NylcclxuIEByZXR1cm5cclxuIGxlYXA6IG51bWJlciBvZiB5ZWFycyBzaW5jZSB0aGUgbGFzdCBsZWFwIHllYXIgKDAgdG8gNClcclxuIGdZZWFyOiBHcmVnb3JpYW4geWVhciBvZiB0aGUgYmVnaW5uaW5nIG9mIEphbGFsaSB5ZWFyXHJcbiBtYXJjaDogdGhlIE1hcmNoIGRheSBvZiBGYXJ2YXJkaW4gdGhlIDFzdCAoMXN0IGRheSBvZiBqYWxhbGlZZWFyKVxyXG4gQHNlZTogaHR0cDovL3d3dy5hc3Ryby51bmkudG9ydW4ucGwvfmtiL1BhcGVycy9FTVAvUGVyc2lhbkMtRU1QLmh0bVxyXG4gQHNlZTogaHR0cDovL3d3dy5mb3VybWlsYWIuY2gvZG9jdW1lbnRzL2NhbGVuZGFyL1xyXG4gKi9cclxuZnVuY3Rpb24gamFsQ2FsKGphbGFsaVllYXI6IG51bWJlcikge1xyXG4gIC8vIEphbGFsaSB5ZWFycyBzdGFydGluZyB0aGUgMzMteWVhciBydWxlLlxyXG4gIGxldCBicmVha3MgPVxyXG4gICAgICBbLTYxLCA5LCAzOCwgMTk5LCA0MjYsIDY4NiwgNzU2LCA4MTgsIDExMTEsIDExODEsIDEyMTAsIDE2MzUsIDIwNjAsIDIwOTcsIDIxOTIsIDIyNjIsIDIzMjQsIDIzOTQsIDI0NTYsIDMxNzhdO1xyXG4gIGNvbnN0IGJyZWFrc0xlbmd0aCA9IGJyZWFrcy5sZW5ndGg7XHJcbiAgY29uc3QgZ1llYXIgPSBqYWxhbGlZZWFyICsgNjIxO1xyXG4gIGxldCBsZWFwSiA9IC0xNDtcclxuICBsZXQganAgPSBicmVha3NbMF07XHJcblxyXG4gIGlmIChqYWxhbGlZZWFyIDwganAgfHwgamFsYWxpWWVhciA+PSBicmVha3NbYnJlYWtzTGVuZ3RoIC0gMV0pIHtcclxuICAgIHRocm93IG5ldyBFcnJvcignSW52YWxpZCBKYWxhbGkgeWVhciAnICsgamFsYWxpWWVhcik7XHJcbiAgfVxyXG5cclxuICAvLyBGaW5kIHRoZSBsaW1pdGluZyB5ZWFycyBmb3IgdGhlIEphbGFsaSB5ZWFyIGphbGFsaVllYXIuXHJcbiAgbGV0IGp1bXA7XHJcbiAgZm9yIChsZXQgaSA9IDE7IGkgPCBicmVha3NMZW5ndGg7IGkgKz0gMSkge1xyXG4gICAgY29uc3Qgam0gPSBicmVha3NbaV07XHJcbiAgICBqdW1wID0gam0gLSBqcDtcclxuICAgIGlmIChqYWxhbGlZZWFyIDwgam0pIHtcclxuICAgICAgYnJlYWs7XHJcbiAgICB9XHJcbiAgICBsZWFwSiA9IGxlYXBKICsgZGl2KGp1bXAsIDMzKSAqIDggKyBkaXYobW9kKGp1bXAsIDMzKSwgNCk7XHJcbiAgICBqcCA9IGptO1xyXG4gIH1cclxuICBsZXQgbiA9IGphbGFsaVllYXIgLSBqcDtcclxuXHJcbiAgLy8gRmluZCB0aGUgbnVtYmVyIG9mIGxlYXAgeWVhcnMgZnJvbSBBRCA2MjEgdG8gdGhlIGJlZ2lubmluZ1xyXG4gIC8vIG9mIHRoZSBjdXJyZW50IEphbGFsaSB5ZWFyIGluIHRoZSBQZXJzaWFuIGNhbGVuZGFyLlxyXG4gIGxlYXBKID0gbGVhcEogKyBkaXYobiwgMzMpICogOCArIGRpdihtb2QobiwgMzMpICsgMywgNCk7XHJcbiAgaWYgKG1vZChqdW1wLCAzMykgPT09IDQgJiYganVtcCAtIG4gPT09IDQpIHtcclxuICAgIGxlYXBKICs9IDE7XHJcbiAgfVxyXG5cclxuICAvLyBBbmQgdGhlIHNhbWUgaW4gdGhlIEdyZWdvcmlhbiBjYWxlbmRhciAodW50aWwgdGhlIHllYXIgZ1llYXIpLlxyXG4gIGNvbnN0IGxlYXBHID0gZGl2KGdZZWFyLCA0KSAtIGRpdigoZGl2KGdZZWFyLCAxMDApICsgMSkgKiAzLCA0KSAtIDE1MDtcclxuXHJcbiAgLy8gRGV0ZXJtaW5lIHRoZSBHcmVnb3JpYW4gZGF0ZSBvZiBGYXJ2YXJkaW4gdGhlIDFzdC5cclxuICBjb25zdCBtYXJjaCA9IDIwICsgbGVhcEogLSBsZWFwRztcclxuXHJcbiAgLy8gRmluZCBob3cgbWFueSB5ZWFycyBoYXZlIHBhc3NlZCBzaW5jZSB0aGUgbGFzdCBsZWFwIHllYXIuXHJcbiAgaWYgKGp1bXAgLSBuIDwgNikge1xyXG4gICAgbiA9IG4gLSBqdW1wICsgZGl2KGp1bXAgKyA0LCAzMykgKiAzMztcclxuICB9XHJcbiAgbGV0IGxlYXAgPSBtb2QobW9kKG4gKyAxLCAzMykgLSAxLCA0KTtcclxuICBpZiAobGVhcCA9PT0gLTEpIHtcclxuICAgIGxlYXAgPSA0O1xyXG4gIH1cclxuXHJcbiAgcmV0dXJuIHtsZWFwOiBsZWFwLCBneTogZ1llYXIsIG1hcmNoOiBtYXJjaH07XHJcbn1cclxuXHJcbi8qXHJcbiBDYWxjdWxhdGVzIEdyZWdvcmlhbiBhbmQgSnVsaWFuIGNhbGVuZGFyIGRhdGVzIGZyb20gdGhlIEp1bGlhbiBEYXkgbnVtYmVyXHJcbiAoamRuKSBmb3IgdGhlIHBlcmlvZCBzaW5jZSBqZG49LTM0ODM5NjU1IChpLmUuIHRoZSB5ZWFyIC0xMDAxMDAgb2YgYm90aFxyXG4gY2FsZW5kYXJzKSB0byBzb21lIG1pbGxpb25zIHllYXJzIGFoZWFkIG9mIHRoZSBwcmVzZW50LlxyXG4gQHBhcmFtIGpkbiBKdWxpYW4gRGF5IG51bWJlclxyXG4gQHJldHVyblxyXG4gZ1llYXI6IENhbGVuZGFyIHllYXIgKHllYXJzIEJDIG51bWJlcmVkIDAsIC0xLCAtMiwgLi4uKVxyXG4gZ01vbnRoOiBDYWxlbmRhciBtb250aCAoMSB0byAxMilcclxuIGdEYXk6IENhbGVuZGFyIGRheSBvZiB0aGUgbW9udGggTSAoMSB0byAyOC8yOS8zMC8zMSlcclxuICovXHJcbmZ1bmN0aW9uIGp1bGlhblRvR3JlZ29yaWFuKGp1bGlhbkRheU51bWJlcjogbnVtYmVyKSB7XHJcbiAgbGV0IGogPSA0ICoganVsaWFuRGF5TnVtYmVyICsgMTM5MzYxNjMxO1xyXG4gIGogPSBqICsgZGl2KGRpdig0ICoganVsaWFuRGF5TnVtYmVyICsgMTgzMTg3NzIwLCAxNDYwOTcpICogMywgNCkgKiA0IC0gMzkwODtcclxuICBjb25zdCBpID0gZGl2KG1vZChqLCAxNDYxKSwgNCkgKiA1ICsgMzA4O1xyXG4gIGNvbnN0IGdEYXkgPSBkaXYobW9kKGksIDE1MyksIDUpICsgMTtcclxuICBjb25zdCBnTW9udGggPSBtb2QoZGl2KGksIDE1MyksIDEyKSArIDE7XHJcbiAgY29uc3QgZ1llYXIgPSBkaXYoaiwgMTQ2MSkgLSAxMDAxMDAgKyBkaXYoOCAtIGdNb250aCwgNik7XHJcblxyXG4gIHJldHVybiBuZXcgRGF0ZShnWWVhciwgZ01vbnRoIC0gMSwgZ0RheSk7XHJcbn1cclxuXHJcbi8qXHJcbiBDb252ZXJ0cyBhIGRhdGUgb2YgdGhlIEphbGFsaSBjYWxlbmRhciB0byB0aGUgSnVsaWFuIERheSBudW1iZXIuXHJcbiBAcGFyYW0gankgSmFsYWxpIHllYXIgKDEgdG8gMzEwMClcclxuIEBwYXJhbSBqbSBKYWxhbGkgbW9udGggKDEgdG8gMTIpXHJcbiBAcGFyYW0gamQgSmFsYWxpIGRheSAoMSB0byAyOS8zMSlcclxuIEByZXR1cm4gSnVsaWFuIERheSBudW1iZXJcclxuICovXHJcbmZ1bmN0aW9uIGdyZWdvcmlhblRvSnVsaWFuKGd5OiBudW1iZXIsIGdtOiBudW1iZXIsIGdkOiBudW1iZXIpIHtcclxuICBsZXQgZCA9IGRpdigoZ3kgKyBkaXYoZ20gLSA4LCA2KSArIDEwMDEwMCkgKiAxNDYxLCA0KSArIGRpdigxNTMgKiBtb2QoZ20gKyA5LCAxMikgKyAyLCA1KSArIGdkIC0gMzQ4NDA0MDg7XHJcbiAgZCA9IGQgLSBkaXYoZGl2KGd5ICsgMTAwMTAwICsgZGl2KGdtIC0gOCwgNiksIDEwMCkgKiAzLCA0KSArIDc1MjtcclxuICByZXR1cm4gZDtcclxufVxyXG5cclxuLypcclxuIENvbnZlcnRzIHRoZSBKdWxpYW4gRGF5IG51bWJlciB0byBhIGRhdGUgaW4gdGhlIEphbGFsaSBjYWxlbmRhci5cclxuIEBwYXJhbSBqdWxpYW5EYXlOdW1iZXIgSnVsaWFuIERheSBudW1iZXJcclxuIEByZXR1cm5cclxuIGphbGFsaVllYXI6IEphbGFsaSB5ZWFyICgxIHRvIDMxMDApXHJcbiBqYWxhbGlNb250aDogSmFsYWxpIG1vbnRoICgxIHRvIDEyKVxyXG4gamFsYWxpRGF5OiBKYWxhbGkgZGF5ICgxIHRvIDI5LzMxKVxyXG4gKi9cclxuZnVuY3Rpb24ganVsaWFuVG9KYWxhbGkoanVsaWFuRGF5TnVtYmVyOiBudW1iZXIpIHtcclxuICBsZXQgZ3kgPSBqdWxpYW5Ub0dyZWdvcmlhbihqdWxpYW5EYXlOdW1iZXIpLmdldEZ1bGxZZWFyKCkgIC8vIENhbGN1bGF0ZSBHcmVnb3JpYW4geWVhciAoZ3kpLlxyXG4gICAgICAsXHJcbiAgICAgIGphbGFsaVllYXIgPSBneSAtIDYyMSwgciA9IGphbENhbChqYWxhbGlZZWFyKSwgZ3JlZ29yaWFuRGF5ID0gZ3JlZ29yaWFuVG9KdWxpYW4oZ3ksIDMsIHIubWFyY2gpLCBqYWxhbGlEYXksXHJcbiAgICAgIGphbGFsaU1vbnRoLCBudW1iZXJPZkRheXM7XHJcblxyXG4gIC8vIEZpbmQgbnVtYmVyIG9mIGRheXMgdGhhdCBwYXNzZWQgc2luY2UgMSBGYXJ2YXJkaW4uXHJcbiAgbnVtYmVyT2ZEYXlzID0ganVsaWFuRGF5TnVtYmVyIC0gZ3JlZ29yaWFuRGF5O1xyXG4gIGlmIChudW1iZXJPZkRheXMgPj0gMCkge1xyXG4gICAgaWYgKG51bWJlck9mRGF5cyA8PSAxODUpIHtcclxuICAgICAgLy8gVGhlIGZpcnN0IDYgbW9udGhzLlxyXG4gICAgICBqYWxhbGlNb250aCA9IDEgKyBkaXYobnVtYmVyT2ZEYXlzLCAzMSk7XHJcbiAgICAgIGphbGFsaURheSA9IG1vZChudW1iZXJPZkRheXMsIDMxKSArIDE7XHJcbiAgICAgIHJldHVybiBuZXcgTmdiRGF0ZShqYWxhbGlZZWFyLCBqYWxhbGlNb250aCwgamFsYWxpRGF5KTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIC8vIFRoZSByZW1haW5pbmcgbW9udGhzLlxyXG4gICAgICBudW1iZXJPZkRheXMgLT0gMTg2O1xyXG4gICAgfVxyXG4gIH0gZWxzZSB7XHJcbiAgICAvLyBQcmV2aW91cyBKYWxhbGkgeWVhci5cclxuICAgIGphbGFsaVllYXIgLT0gMTtcclxuICAgIG51bWJlck9mRGF5cyArPSAxNzk7XHJcbiAgICBpZiAoci5sZWFwID09PSAxKSB7XHJcbiAgICAgIG51bWJlck9mRGF5cyArPSAxO1xyXG4gICAgfVxyXG4gIH1cclxuICBqYWxhbGlNb250aCA9IDcgKyBkaXYobnVtYmVyT2ZEYXlzLCAzMCk7XHJcbiAgamFsYWxpRGF5ID0gbW9kKG51bWJlck9mRGF5cywgMzApICsgMTtcclxuXHJcbiAgcmV0dXJuIG5ldyBOZ2JEYXRlKGphbGFsaVllYXIsIGphbGFsaU1vbnRoLCBqYWxhbGlEYXkpO1xyXG59XHJcblxyXG4vKlxyXG4gQ29udmVydHMgYSBkYXRlIG9mIHRoZSBKYWxhbGkgY2FsZW5kYXIgdG8gdGhlIEp1bGlhbiBEYXkgbnVtYmVyLlxyXG4gQHBhcmFtIGpZZWFyIEphbGFsaSB5ZWFyICgxIHRvIDMxMDApXHJcbiBAcGFyYW0gak1vbnRoIEphbGFsaSBtb250aCAoMSB0byAxMilcclxuIEBwYXJhbSBqRGF5IEphbGFsaSBkYXkgKDEgdG8gMjkvMzEpXHJcbiBAcmV0dXJuIEp1bGlhbiBEYXkgbnVtYmVyXHJcbiAqL1xyXG5mdW5jdGlvbiBqYWxhbGlUb0p1bGlhbihqWWVhcjogbnVtYmVyLCBqTW9udGg6IG51bWJlciwgakRheTogbnVtYmVyKSB7XHJcbiAgbGV0IHIgPSBqYWxDYWwoalllYXIpO1xyXG4gIHJldHVybiBncmVnb3JpYW5Ub0p1bGlhbihyLmd5LCAzLCByLm1hcmNoKSArIChqTW9udGggLSAxKSAqIDMxIC0gZGl2KGpNb250aCwgNykgKiAoak1vbnRoIC0gNykgKyBqRGF5IC0gMTtcclxufVxyXG5cclxuLyoqXHJcbiAqIFJldHVybnMgdGhlIG51bWJlciBvZiBkYXlzIGluIGEgc3BlY2lmaWMgamFsYWxpIG1vbnRoLlxyXG4gKi9cclxuZnVuY3Rpb24gZ2V0RGF5c1Blck1vbnRoKG1vbnRoOiBudW1iZXIsIHllYXI6IG51bWJlcik6IG51bWJlciB7XHJcbiAgaWYgKG1vbnRoIDw9IDYpIHtcclxuICAgIHJldHVybiAzMTtcclxuICB9XHJcbiAgaWYgKG1vbnRoIDw9IDExKSB7XHJcbiAgICByZXR1cm4gMzA7XHJcbiAgfVxyXG4gIGlmIChqYWxDYWwoeWVhcikubGVhcCA9PT0gMCkge1xyXG4gICAgcmV0dXJuIDMwO1xyXG4gIH1cclxuICByZXR1cm4gMjk7XHJcbn1cclxuIiwiaW1wb3J0IHtJbmplY3RhYmxlfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHtOZ2JEYXRlfSBmcm9tICcuLi9uZ2ItZGF0ZSc7XHJcbmltcG9ydCB7TmdiQ2FsZW5kYXIsIE5nYlBlcmlvZH0gZnJvbSAnLi4vbmdiLWNhbGVuZGFyJztcclxuaW1wb3J0IHtpc0ludGVnZXJ9IGZyb20gJy4uLy4uL3V0aWwvdXRpbCc7XHJcblxyXG5pbXBvcnQge2Zyb21HcmVnb3JpYW4sIHNldEphbGFsaURheSwgc2V0SmFsYWxpTW9udGgsIHNldEphbGFsaVllYXIsIHRvR3JlZ29yaWFufSBmcm9tICcuL2phbGFsaSc7XHJcblxyXG5ASW5qZWN0YWJsZSgpXHJcbmV4cG9ydCBjbGFzcyBOZ2JDYWxlbmRhclBlcnNpYW4gZXh0ZW5kcyBOZ2JDYWxlbmRhciB7XHJcbiAgZ2V0RGF5c1BlcldlZWsoKSB7IHJldHVybiA3OyB9XHJcblxyXG4gIGdldE1vbnRocygpIHsgcmV0dXJuIFsxLCAyLCAzLCA0LCA1LCA2LCA3LCA4LCA5LCAxMCwgMTEsIDEyXTsgfVxyXG5cclxuICBnZXRXZWVrc1Blck1vbnRoKCkgeyByZXR1cm4gNjsgfVxyXG5cclxuICBnZXROZXh0KGRhdGU6IE5nYkRhdGUsIHBlcmlvZDogTmdiUGVyaW9kID0gJ2QnLCBudW1iZXIgPSAxKSB7XHJcbiAgICBkYXRlID0gbmV3IE5nYkRhdGUoZGF0ZS55ZWFyLCBkYXRlLm1vbnRoLCBkYXRlLmRheSk7XHJcblxyXG4gICAgc3dpdGNoIChwZXJpb2QpIHtcclxuICAgICAgY2FzZSAneSc6XHJcbiAgICAgICAgZGF0ZSA9IHNldEphbGFsaVllYXIoZGF0ZSwgZGF0ZS55ZWFyICsgbnVtYmVyKTtcclxuICAgICAgICBkYXRlLm1vbnRoID0gMTtcclxuICAgICAgICBkYXRlLmRheSA9IDE7XHJcbiAgICAgICAgcmV0dXJuIGRhdGU7XHJcbiAgICAgIGNhc2UgJ20nOlxyXG4gICAgICAgIGRhdGUgPSBzZXRKYWxhbGlNb250aChkYXRlLCBkYXRlLm1vbnRoICsgbnVtYmVyKTtcclxuICAgICAgICBkYXRlLmRheSA9IDE7XHJcbiAgICAgICAgcmV0dXJuIGRhdGU7XHJcbiAgICAgIGNhc2UgJ2QnOlxyXG4gICAgICAgIHJldHVybiBzZXRKYWxhbGlEYXkoZGF0ZSwgZGF0ZS5kYXkgKyBudW1iZXIpO1xyXG4gICAgICBkZWZhdWx0OlxyXG4gICAgICAgIHJldHVybiBkYXRlO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgZ2V0UHJldihkYXRlOiBOZ2JEYXRlLCBwZXJpb2Q6IE5nYlBlcmlvZCA9ICdkJywgbnVtYmVyID0gMSkgeyByZXR1cm4gdGhpcy5nZXROZXh0KGRhdGUsIHBlcmlvZCwgLW51bWJlcik7IH1cclxuXHJcbiAgZ2V0V2Vla2RheShkYXRlOiBOZ2JEYXRlKSB7XHJcbiAgICBjb25zdCBkYXkgPSB0b0dyZWdvcmlhbihkYXRlKS5nZXREYXkoKTtcclxuICAgIC8vIGluIEpTIERhdGUgU3VuPTAsIGluIElTTyA4NjAxIFN1bj03XHJcbiAgICByZXR1cm4gZGF5ID09PSAwID8gNyA6IGRheTtcclxuICB9XHJcblxyXG4gIGdldFdlZWtOdW1iZXIod2VlazogTmdiRGF0ZVtdLCBmaXJzdERheU9mV2VlazogbnVtYmVyKSB7XHJcbiAgICAvLyBpbiBKUyBEYXRlIFN1bj0wLCBpbiBJU08gODYwMSBTdW49N1xyXG4gICAgaWYgKGZpcnN0RGF5T2ZXZWVrID09PSA3KSB7XHJcbiAgICAgIGZpcnN0RGF5T2ZXZWVrID0gMDtcclxuICAgIH1cclxuXHJcbiAgICBjb25zdCB0aHVyc2RheUluZGV4ID0gKDQgKyA3IC0gZmlyc3REYXlPZldlZWspICUgNztcclxuICAgIGNvbnN0IGRhdGUgPSB3ZWVrW3RodXJzZGF5SW5kZXhdO1xyXG5cclxuICAgIGNvbnN0IGpzRGF0ZSA9IHRvR3JlZ29yaWFuKGRhdGUpO1xyXG4gICAganNEYXRlLnNldERhdGUoanNEYXRlLmdldERhdGUoKSArIDQgLSAoanNEYXRlLmdldERheSgpIHx8IDcpKTsgIC8vIFRodXJzZGF5XHJcbiAgICBjb25zdCB0aW1lID0ganNEYXRlLmdldFRpbWUoKTtcclxuICAgIGNvbnN0IHN0YXJ0RGF0ZSA9IHRvR3JlZ29yaWFuKG5ldyBOZ2JEYXRlKGRhdGUueWVhciwgMSwgMSkpO1xyXG4gICAgcmV0dXJuIE1hdGguZmxvb3IoTWF0aC5yb3VuZCgodGltZSAtIHN0YXJ0RGF0ZS5nZXRUaW1lKCkpIC8gODY0MDAwMDApIC8gNykgKyAxO1xyXG4gIH1cclxuXHJcbiAgZ2V0VG9kYXkoKTogTmdiRGF0ZSB7IHJldHVybiBmcm9tR3JlZ29yaWFuKG5ldyBEYXRlKCkpOyB9XHJcblxyXG4gIGlzVmFsaWQoZGF0ZTogTmdiRGF0ZSk6IGJvb2xlYW4ge1xyXG4gICAgcmV0dXJuIGRhdGUgJiYgaXNJbnRlZ2VyKGRhdGUueWVhcikgJiYgaXNJbnRlZ2VyKGRhdGUubW9udGgpICYmIGlzSW50ZWdlcihkYXRlLmRheSkgJiZcclxuICAgICAgICAhaXNOYU4odG9HcmVnb3JpYW4oZGF0ZSkuZ2V0VGltZSgpKTtcclxuICB9XHJcbn1cclxuIiwiaW1wb3J0IHtOZ2JEYXRlfSBmcm9tICcuLi9uZ2ItZGF0ZSc7XHJcbmltcG9ydCB7TmdiRGF0ZVN0cnVjdH0gZnJvbSAnLi4vbmdiLWRhdGUtc3RydWN0JztcclxuXHJcbmNvbnN0IFBBUlRTX1BFUl9IT1VSID0gMTA4MDtcclxuY29uc3QgUEFSVFNfUEVSX0RBWSA9IDI0ICogUEFSVFNfUEVSX0hPVVI7XHJcbmNvbnN0IFBBUlRTX0ZSQUNUSU9OQUxfTU9OVEggPSAxMiAqIFBBUlRTX1BFUl9IT1VSICsgNzkzO1xyXG5jb25zdCBQQVJUU19QRVJfTU9OVEggPSAyOSAqIFBBUlRTX1BFUl9EQVkgKyBQQVJUU19GUkFDVElPTkFMX01PTlRIO1xyXG5jb25zdCBCQUhBUkFEID0gMTEgKiBQQVJUU19QRVJfSE9VUiArIDIwNDtcclxuY29uc3QgSEVCUkVXX0RBWV9PTl9KQU5fMV8xOTcwID0gMjA5MjU5MTtcclxuY29uc3QgR1JFR09SSUFOX0VQT0NIID0gMTcyMTQyNS41O1xyXG5cclxuZnVuY3Rpb24gaXNHcmVnb3JpYW5MZWFwWWVhcih5ZWFyOiBudW1iZXIpOiBib29sZWFuIHtcclxuICByZXR1cm4geWVhciAlIDQgPT09IDAgJiYgeWVhciAlIDEwMCAhPT0gMCB8fCB5ZWFyICUgNDAwID09PSAwO1xyXG59XHJcblxyXG5mdW5jdGlvbiBudW1iZXJPZkZpcnN0RGF5SW5ZZWFyKHllYXI6IG51bWJlcik6IG51bWJlciB7XHJcbiAgbGV0IG1vbnRoc0JlZm9yZVllYXIgPSBNYXRoLmZsb29yKCgyMzUgKiB5ZWFyIC0gMjM0KSAvIDE5KTtcclxuICBsZXQgZnJhY3Rpb25hbE1vbnRoc0JlZm9yZVllYXIgPSBtb250aHNCZWZvcmVZZWFyICogUEFSVFNfRlJBQ1RJT05BTF9NT05USCArIEJBSEFSQUQ7XHJcbiAgbGV0IGRheU51bWJlciA9IG1vbnRoc0JlZm9yZVllYXIgKiAyOSArIE1hdGguZmxvb3IoZnJhY3Rpb25hbE1vbnRoc0JlZm9yZVllYXIgLyBQQVJUU19QRVJfREFZKTtcclxuICBsZXQgdGltZU9mRGF5ID0gZnJhY3Rpb25hbE1vbnRoc0JlZm9yZVllYXIgJSBQQVJUU19QRVJfREFZO1xyXG5cclxuICBsZXQgZGF5T2ZXZWVrID0gZGF5TnVtYmVyICUgNzsgIC8vIDAgPT0gTW9uZGF5XHJcblxyXG4gIGlmIChkYXlPZldlZWsgPT09IDIgfHwgZGF5T2ZXZWVrID09PSA0IHx8IGRheU9mV2VlayA9PT0gNikge1xyXG4gICAgZGF5TnVtYmVyKys7XHJcbiAgICBkYXlPZldlZWsgPSBkYXlOdW1iZXIgJSA3O1xyXG4gIH1cclxuICBpZiAoZGF5T2ZXZWVrID09PSAxICYmIHRpbWVPZkRheSA+IDE1ICogUEFSVFNfUEVSX0hPVVIgKyAyMDQgJiYgIWlzSGVicmV3TGVhcFllYXIoeWVhcikpIHtcclxuICAgIGRheU51bWJlciArPSAyO1xyXG4gIH0gZWxzZSBpZiAoZGF5T2ZXZWVrID09PSAwICYmIHRpbWVPZkRheSA+IDIxICogUEFSVFNfUEVSX0hPVVIgKyA1ODkgJiYgaXNIZWJyZXdMZWFwWWVhcih5ZWFyIC0gMSkpIHtcclxuICAgIGRheU51bWJlcisrO1xyXG4gIH1cclxuICByZXR1cm4gZGF5TnVtYmVyO1xyXG59XHJcblxyXG5mdW5jdGlvbiBnZXREYXlzSW5HcmVnb3JpYW5Nb250aChtb250aDogbnVtYmVyLCB5ZWFyOiBudW1iZXIpOiBudW1iZXIge1xyXG4gIGxldCBkYXlzID0gWzMxLCAyOCwgMzEsIDMwLCAzMSwgMzAsIDMxLCAzMSwgMzAsIDMxLCAzMCwgMzFdO1xyXG4gIGlmIChpc0dyZWdvcmlhbkxlYXBZZWFyKHllYXIpKSB7XHJcbiAgICBkYXlzWzFdKys7XHJcbiAgfVxyXG4gIHJldHVybiBkYXlzW21vbnRoIC0gMV07XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGdldEhlYnJld01vbnRocyh5ZWFyOiBudW1iZXIpOiBudW1iZXIge1xyXG4gIHJldHVybiBpc0hlYnJld0xlYXBZZWFyKHllYXIpID8gMTMgOiAxMjtcclxufVxyXG5cclxuLyoqXHJcbiAqIFJldHVybnMgdGhlIG51bWJlciBvZiBkYXlzIGluIGEgc3BlY2lmaWMgSGVicmV3IHllYXIuXHJcbiAqIGB5ZWFyYCBpcyBhbnkgSGVicmV3IHllYXIuXHJcbiAqL1xyXG5mdW5jdGlvbiBnZXREYXlzSW5IZWJyZXdZZWFyKHllYXI6IG51bWJlcik6IG51bWJlciB7XHJcbiAgcmV0dXJuIG51bWJlck9mRmlyc3REYXlJblllYXIoeWVhciArIDEpIC0gbnVtYmVyT2ZGaXJzdERheUluWWVhcih5ZWFyKTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGlzSGVicmV3TGVhcFllYXIoeWVhcjogbnVtYmVyKTogYm9vbGVhbiB7XHJcbiAgbGV0IGIgPSAoeWVhciAqIDEyICsgMTcpICUgMTk7XHJcbiAgcmV0dXJuIGIgPj0gKChiIDwgMCkgPyAtNyA6IDEyKTtcclxufVxyXG5cclxuLyoqXHJcbiAqIFJldHVybnMgdGhlIG51bWJlciBvZiBkYXlzIGluIGEgc3BlY2lmaWMgSGVicmV3IG1vbnRoLlxyXG4gKiBgbW9udGhgIGlzIDEgZm9yIE5pc2FuLCAyIGZvciBJeWFyIGV0Yy4gTm90ZTogSGVicmV3IGxlYXAgeWVhciBjb250YWlucyAxMyBtb250aHMuXHJcbiAqIGB5ZWFyYCBpcyBhbnkgSGVicmV3IHllYXIuXHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gZ2V0RGF5c0luSGVicmV3TW9udGgobW9udGg6IG51bWJlciwgeWVhcjogbnVtYmVyKTogbnVtYmVyIHtcclxuICBsZXQgeWVhckxlbmd0aCA9IG51bWJlck9mRmlyc3REYXlJblllYXIoeWVhciArIDEpIC0gbnVtYmVyT2ZGaXJzdERheUluWWVhcih5ZWFyKTtcclxuICBsZXQgeWVhclR5cGUgPSAoeWVhckxlbmd0aCA8PSAzODAgPyB5ZWFyTGVuZ3RoIDogKHllYXJMZW5ndGggLSAzMCkpIC0gMzUzO1xyXG4gIGxldCBsZWFwWWVhciA9IGlzSGVicmV3TGVhcFllYXIoeWVhcik7XHJcbiAgbGV0IGRheXNJbk1vbnRoID0gbGVhcFllYXIgPyBbMzAsIDI5LCAyOSwgMjksIDMwLCAzMCwgMjksIDMwLCAyOSwgMzAsIDI5LCAzMCwgMjldIDpcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFszMCwgMjksIDI5LCAyOSwgMzAsIDI5LCAzMCwgMjksIDMwLCAyOSwgMzAsIDI5XTtcclxuICBpZiAoeWVhclR5cGUgPiAwKSB7XHJcbiAgICBkYXlzSW5Nb250aFsyXSsrOyAgLy8gS2lzbGV2IGdldHMgYW4gZXh0cmEgZGF5IGluIG5vcm1hbCBvciBjb21wbGV0ZSB5ZWFycy5cclxuICB9XHJcbiAgaWYgKHllYXJUeXBlID4gMSkge1xyXG4gICAgZGF5c0luTW9udGhbMV0rKzsgIC8vIEhlc2h2YW4gZ2V0cyBhbiBleHRyYSBkYXkgaW4gY29tcGxldGUgeWVhcnMgb25seS5cclxuICB9XHJcbiAgcmV0dXJuIGRheXNJbk1vbnRoW21vbnRoIC0gMV07XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBnZXREYXlOdW1iZXJJbkhlYnJld1llYXIoZGF0ZTogTmdiRGF0ZSk6IG51bWJlciB7XHJcbiAgbGV0IG51bWJlck9mRGF5ID0gMDtcclxuICBmb3IgKGxldCBpID0gMTsgaSA8IGRhdGUubW9udGg7IGkrKykge1xyXG4gICAgbnVtYmVyT2ZEYXkgKz0gZ2V0RGF5c0luSGVicmV3TW9udGgoaSwgZGF0ZS55ZWFyKTtcclxuICB9XHJcbiAgcmV0dXJuIG51bWJlck9mRGF5ICsgZGF0ZS5kYXk7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBzZXRIZWJyZXdNb250aChkYXRlOiBOZ2JEYXRlLCB2YWw6IG51bWJlcik6IE5nYkRhdGUge1xyXG4gIGxldCBhZnRlciA9IHZhbCA+PSAwO1xyXG4gIGlmICghYWZ0ZXIpIHtcclxuICAgIHZhbCA9IC12YWw7XHJcbiAgfVxyXG4gIHdoaWxlICh2YWwgPiAwKSB7XHJcbiAgICBpZiAoYWZ0ZXIpIHtcclxuICAgICAgaWYgKHZhbCA+IGdldEhlYnJld01vbnRocyhkYXRlLnllYXIpIC0gZGF0ZS5tb250aCkge1xyXG4gICAgICAgIHZhbCAtPSBnZXRIZWJyZXdNb250aHMoZGF0ZS55ZWFyKSAtIGRhdGUubW9udGggKyAxO1xyXG4gICAgICAgIGRhdGUueWVhcisrO1xyXG4gICAgICAgIGRhdGUubW9udGggPSAxO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIGRhdGUubW9udGggKz0gdmFsO1xyXG4gICAgICAgIHZhbCA9IDA7XHJcbiAgICAgIH1cclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIGlmICh2YWwgPj0gZGF0ZS5tb250aCkge1xyXG4gICAgICAgIGRhdGUueWVhci0tO1xyXG4gICAgICAgIHZhbCAtPSBkYXRlLm1vbnRoO1xyXG4gICAgICAgIGRhdGUubW9udGggPSBnZXRIZWJyZXdNb250aHMoZGF0ZS55ZWFyKTtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICBkYXRlLm1vbnRoIC09IHZhbDtcclxuICAgICAgICB2YWwgPSAwO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfVxyXG4gIHJldHVybiBkYXRlO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gc2V0SGVicmV3RGF5KGRhdGU6IE5nYkRhdGUsIHZhbDogbnVtYmVyKTogTmdiRGF0ZSB7XHJcbiAgbGV0IGFmdGVyID0gdmFsID49IDA7XHJcbiAgaWYgKCFhZnRlcikge1xyXG4gICAgdmFsID0gLXZhbDtcclxuICB9XHJcbiAgd2hpbGUgKHZhbCA+IDApIHtcclxuICAgIGlmIChhZnRlcikge1xyXG4gICAgICBpZiAodmFsID4gZ2V0RGF5c0luSGVicmV3WWVhcihkYXRlLnllYXIpIC0gZ2V0RGF5TnVtYmVySW5IZWJyZXdZZWFyKGRhdGUpKSB7XHJcbiAgICAgICAgdmFsIC09IGdldERheXNJbkhlYnJld1llYXIoZGF0ZS55ZWFyKSAtIGdldERheU51bWJlckluSGVicmV3WWVhcihkYXRlKSArIDE7XHJcbiAgICAgICAgZGF0ZS55ZWFyKys7XHJcbiAgICAgICAgZGF0ZS5tb250aCA9IDE7XHJcbiAgICAgICAgZGF0ZS5kYXkgPSAxO1xyXG4gICAgICB9IGVsc2UgaWYgKHZhbCA+IGdldERheXNJbkhlYnJld01vbnRoKGRhdGUubW9udGgsIGRhdGUueWVhcikgLSBkYXRlLmRheSkge1xyXG4gICAgICAgIHZhbCAtPSBnZXREYXlzSW5IZWJyZXdNb250aChkYXRlLm1vbnRoLCBkYXRlLnllYXIpIC0gZGF0ZS5kYXkgKyAxO1xyXG4gICAgICAgIGRhdGUubW9udGgrKztcclxuICAgICAgICBkYXRlLmRheSA9IDE7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgZGF0ZS5kYXkgKz0gdmFsO1xyXG4gICAgICAgIHZhbCA9IDA7XHJcbiAgICAgIH1cclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIGlmICh2YWwgPj0gZGF0ZS5kYXkpIHtcclxuICAgICAgICB2YWwgLT0gZGF0ZS5kYXk7XHJcbiAgICAgICAgZGF0ZS5tb250aC0tO1xyXG4gICAgICAgIGlmIChkYXRlLm1vbnRoID09PSAwKSB7XHJcbiAgICAgICAgICBkYXRlLnllYXItLTtcclxuICAgICAgICAgIGRhdGUubW9udGggPSBnZXRIZWJyZXdNb250aHMoZGF0ZS55ZWFyKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZGF0ZS5kYXkgPSBnZXREYXlzSW5IZWJyZXdNb250aChkYXRlLm1vbnRoLCBkYXRlLnllYXIpO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIGRhdGUuZGF5IC09IHZhbDtcclxuICAgICAgICB2YWwgPSAwO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfVxyXG4gIHJldHVybiBkYXRlO1xyXG59XHJcblxyXG4vKipcclxuICogUmV0dXJucyB0aGUgZXF1aXZhbGVudCBIZWJyZXcgZGF0ZSB2YWx1ZSBmb3IgYSBnaXZlIGlucHV0IEdyZWdvcmlhbiBkYXRlLlxyXG4gKiBgZ2RhdGVgIGlzIGEgSlMgRGF0ZSB0byBiZSBjb252ZXJ0ZWQgdG8gSGVicmV3IGRhdGUuXHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gZnJvbUdyZWdvcmlhbihnZGF0ZTogRGF0ZSk6IE5nYkRhdGUge1xyXG4gIGNvbnN0IGRhdGUgPSBuZXcgRGF0ZShnZGF0ZSk7XHJcbiAgY29uc3QgZ1llYXIgPSBkYXRlLmdldEZ1bGxZZWFyKCksIGdNb250aCA9IGRhdGUuZ2V0TW9udGgoKSwgZ0RheSA9IGRhdGUuZ2V0RGF0ZSgpO1xyXG4gIGxldCBqdWxpYW5EYXkgPSBHUkVHT1JJQU5fRVBPQ0ggLSAxICsgMzY1ICogKGdZZWFyIC0gMSkgKyBNYXRoLmZsb29yKChnWWVhciAtIDEpIC8gNCkgLVxyXG4gICAgICBNYXRoLmZsb29yKChnWWVhciAtIDEpIC8gMTAwKSArIE1hdGguZmxvb3IoKGdZZWFyIC0gMSkgLyA0MDApICtcclxuICAgICAgTWF0aC5mbG9vcigoMzY3ICogKGdNb250aCArIDEpIC0gMzYyKSAvIDEyICsgKGdNb250aCArIDEgPD0gMiA/IDAgOiBpc0dyZWdvcmlhbkxlYXBZZWFyKGdZZWFyKSA/IC0xIDogLTIpICsgZ0RheSk7XHJcbiAganVsaWFuRGF5ID0gTWF0aC5mbG9vcihqdWxpYW5EYXkgKyAwLjUpO1xyXG4gIGxldCBkYXlzU2luY2VIZWJFcG9jaCA9IGp1bGlhbkRheSAtIDM0Nzk5NztcclxuICBsZXQgbW9udGhzU2luY2VIZWJFcG9jaCA9IE1hdGguZmxvb3IoZGF5c1NpbmNlSGViRXBvY2ggKiBQQVJUU19QRVJfREFZIC8gUEFSVFNfUEVSX01PTlRIKTtcclxuICBsZXQgaFllYXIgPSBNYXRoLmZsb29yKChtb250aHNTaW5jZUhlYkVwb2NoICogMTkgKyAyMzQpIC8gMjM1KSArIDE7XHJcbiAgbGV0IGZpcnN0RGF5T2ZUaGlzWWVhciA9IG51bWJlck9mRmlyc3REYXlJblllYXIoaFllYXIpO1xyXG4gIGxldCBkYXlPZlllYXIgPSBkYXlzU2luY2VIZWJFcG9jaCAtIGZpcnN0RGF5T2ZUaGlzWWVhcjtcclxuICB3aGlsZSAoZGF5T2ZZZWFyIDwgMSkge1xyXG4gICAgaFllYXItLTtcclxuICAgIGZpcnN0RGF5T2ZUaGlzWWVhciA9IG51bWJlck9mRmlyc3REYXlJblllYXIoaFllYXIpO1xyXG4gICAgZGF5T2ZZZWFyID0gZGF5c1NpbmNlSGViRXBvY2ggLSBmaXJzdERheU9mVGhpc1llYXI7XHJcbiAgfVxyXG4gIGxldCBoTW9udGggPSAxO1xyXG4gIGxldCBoRGF5ID0gZGF5T2ZZZWFyO1xyXG4gIHdoaWxlIChoRGF5ID4gZ2V0RGF5c0luSGVicmV3TW9udGgoaE1vbnRoLCBoWWVhcikpIHtcclxuICAgIGhEYXkgLT0gZ2V0RGF5c0luSGVicmV3TW9udGgoaE1vbnRoLCBoWWVhcik7XHJcbiAgICBoTW9udGgrKztcclxuICB9XHJcbiAgcmV0dXJuIG5ldyBOZ2JEYXRlKGhZZWFyLCBoTW9udGgsIGhEYXkpO1xyXG59XHJcblxyXG4vKipcclxuICogUmV0dXJucyB0aGUgZXF1aXZhbGVudCBKUyBkYXRlIHZhbHVlIGZvciBhIGdpdmVuIEhlYnJldyBkYXRlLlxyXG4gKiBgaGVicmV3RGF0ZWAgaXMgYW4gSGVicmV3IGRhdGUgdG8gYmUgY29udmVydGVkIHRvIEdyZWdvcmlhbi5cclxuICovXHJcbmV4cG9ydCBmdW5jdGlvbiB0b0dyZWdvcmlhbihoZWJyZXdEYXRlOiBOZ2JEYXRlU3RydWN0IHwgTmdiRGF0ZSk6IERhdGUge1xyXG4gIGNvbnN0IGhZZWFyID0gaGVicmV3RGF0ZS55ZWFyO1xyXG4gIGNvbnN0IGhNb250aCA9IGhlYnJld0RhdGUubW9udGg7XHJcbiAgY29uc3QgaERheSA9IGhlYnJld0RhdGUuZGF5O1xyXG4gIGxldCBkYXlzID0gbnVtYmVyT2ZGaXJzdERheUluWWVhcihoWWVhcik7XHJcbiAgZm9yIChsZXQgaSA9IDE7IGkgPCBoTW9udGg7IGkrKykge1xyXG4gICAgZGF5cyArPSBnZXREYXlzSW5IZWJyZXdNb250aChpLCBoWWVhcik7XHJcbiAgfVxyXG4gIGRheXMgKz0gaERheTtcclxuICBsZXQgZGlmZkRheXMgPSBkYXlzIC0gSEVCUkVXX0RBWV9PTl9KQU5fMV8xOTcwO1xyXG4gIGxldCBhZnRlciA9IGRpZmZEYXlzID49IDA7XHJcbiAgaWYgKCFhZnRlcikge1xyXG4gICAgZGlmZkRheXMgPSAtZGlmZkRheXM7XHJcbiAgfVxyXG4gIGxldCBnWWVhciA9IDE5NzA7XHJcbiAgbGV0IGdNb250aCA9IDE7XHJcbiAgbGV0IGdEYXkgPSAxO1xyXG4gIHdoaWxlIChkaWZmRGF5cyA+IDApIHtcclxuICAgIGlmIChhZnRlcikge1xyXG4gICAgICBpZiAoZGlmZkRheXMgPj0gKGlzR3JlZ29yaWFuTGVhcFllYXIoZ1llYXIpID8gMzY2IDogMzY1KSkge1xyXG4gICAgICAgIGRpZmZEYXlzIC09IGlzR3JlZ29yaWFuTGVhcFllYXIoZ1llYXIpID8gMzY2IDogMzY1O1xyXG4gICAgICAgIGdZZWFyKys7XHJcbiAgICAgIH0gZWxzZSBpZiAoZGlmZkRheXMgPj0gZ2V0RGF5c0luR3JlZ29yaWFuTW9udGgoZ01vbnRoLCBnWWVhcikpIHtcclxuICAgICAgICBkaWZmRGF5cyAtPSBnZXREYXlzSW5HcmVnb3JpYW5Nb250aChnTW9udGgsIGdZZWFyKTtcclxuICAgICAgICBnTW9udGgrKztcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICBnRGF5ICs9IGRpZmZEYXlzO1xyXG4gICAgICAgIGRpZmZEYXlzID0gMDtcclxuICAgICAgfVxyXG4gICAgfSBlbHNlIHtcclxuICAgICAgaWYgKGRpZmZEYXlzID49IChpc0dyZWdvcmlhbkxlYXBZZWFyKGdZZWFyIC0gMSkgPyAzNjYgOiAzNjUpKSB7XHJcbiAgICAgICAgZGlmZkRheXMgLT0gaXNHcmVnb3JpYW5MZWFwWWVhcihnWWVhciAtIDEpID8gMzY2IDogMzY1O1xyXG4gICAgICAgIGdZZWFyLS07XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgaWYgKGdNb250aCA+IDEpIHtcclxuICAgICAgICAgIGdNb250aC0tO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICBnTW9udGggPSAxMjtcclxuICAgICAgICAgIGdZZWFyLS07XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChkaWZmRGF5cyA+PSBnZXREYXlzSW5HcmVnb3JpYW5Nb250aChnTW9udGgsIGdZZWFyKSkge1xyXG4gICAgICAgICAgZGlmZkRheXMgLT0gZ2V0RGF5c0luR3JlZ29yaWFuTW9udGgoZ01vbnRoLCBnWWVhcik7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIGdEYXkgPSBnZXREYXlzSW5HcmVnb3JpYW5Nb250aChnTW9udGgsIGdZZWFyKSAtIGRpZmZEYXlzICsgMTtcclxuICAgICAgICAgIGRpZmZEYXlzID0gMDtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9XHJcbiAgcmV0dXJuIG5ldyBEYXRlKGdZZWFyLCBnTW9udGggLSAxLCBnRGF5KTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGhlYnJld051bWVyYWxzKG51bWVyYWxzOiBudW1iZXIpOiBzdHJpbmcge1xyXG4gIGlmICghbnVtZXJhbHMpIHtcclxuICAgIHJldHVybiAnJztcclxuICB9XHJcbiAgY29uc3QgaEFycmF5MF85ID0gWycnLCAnw5fCkCcsICfDl8KRJywgJ8OXwpInLCAnw5fCkycsICfDl8KUJywgJ8OXwpUnLCAnw5fClicsICfDl8KXJywgJ8OXwpgnXTtcclxuICBjb25zdCBoQXJyYXkxMF8xOSA9XHJcbiAgICAgIFsnw5fCmScsICfDl8KZw5fCkMOiwoDCrCcsICfDl8KZw5fCkcOiwoDCrCcsICfDl8KZw5fCksOiwoDCrCcsICfDl8KZw5fCk8OiwoDCrCcsICfDl8KYw5fClScsICfDl8KYw5fClsOiwoDCrCcsICfDl8KZw5fClsOiwoDCrCcsICfDl8KZw5fCl8OiwoDCrCcsICfDl8KZw5fCmMOiwoDCrCddO1xyXG4gIGNvbnN0IGhBcnJheTIwXzkwID0gWycnLCAnJywgJ8OXwpsnLCAnw5fCnCcsICfDl8KeJywgJ8OXwqAnLCAnw5fCoScsICfDl8KiJywgJ8OXwqQnLCAnw5fCpiddO1xyXG4gIGNvbnN0IGhBcnJheTEwMF85MDAgPSBbJycsICfDl8KnJywgJ8OXwqgnLCAnw5fCqScsICfDl8KqJywgJ8OXwqrDl8KnJywgJ8OXwqrDl8KoJywgJ8OXwqrDl8KpJywgJ8OXwqrDl8KqJywgJ8OXwqrDl8Kqw5fCpyddO1xyXG4gIGNvbnN0IGhBcnJheTEwMDBfOTAwMCA9IFsnJywgJ8OXwpAnLCAnw5fCkScsICfDl8KQw5fCkScsICfDl8KRw5fCkScsICfDl8KUJywgJ8OXwpDDl8KUJywgJ8OXwpHDl8KUJywgJ8OXwpDDl8KRw5fClCcsICfDl8KRw5fCkcOXwpQnXTtcclxuICBjb25zdCBnZXJlc2ggPSAnw5fCsycsIGdlcnNoYWltID0gJ8OXwrQnO1xyXG4gIGxldCBtZW0gPSAwO1xyXG4gIGxldCByZXN1bHQgPSBbXTtcclxuICBsZXQgc3RlcCA9IDA7XHJcbiAgd2hpbGUgKG51bWVyYWxzID4gMCkge1xyXG4gICAgbGV0IG0gPSBudW1lcmFscyAlIDEwO1xyXG4gICAgaWYgKHN0ZXAgPT09IDApIHtcclxuICAgICAgbWVtID0gbTtcclxuICAgIH0gZWxzZSBpZiAoc3RlcCA9PT0gMSkge1xyXG4gICAgICBpZiAobSAhPT0gMSkge1xyXG4gICAgICAgIHJlc3VsdC51bnNoaWZ0KGhBcnJheTIwXzkwW21dLCBoQXJyYXkwXzlbbWVtXSk7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgcmVzdWx0LnVuc2hpZnQoaEFycmF5MTBfMTlbbWVtXSk7XHJcbiAgICAgIH1cclxuICAgIH0gZWxzZSBpZiAoc3RlcCA9PT0gMikge1xyXG4gICAgICByZXN1bHQudW5zaGlmdChoQXJyYXkxMDBfOTAwW21dKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIGlmIChtICE9PSA1KSB7XHJcbiAgICAgICAgcmVzdWx0LnVuc2hpZnQoaEFycmF5MTAwMF85MDAwW21dLCBnZXJlc2gsICcgJyk7XHJcbiAgICAgIH1cclxuICAgICAgYnJlYWs7XHJcbiAgICB9XHJcbiAgICBudW1lcmFscyA9IE1hdGguZmxvb3IobnVtZXJhbHMgLyAxMCk7XHJcbiAgICBpZiAoc3RlcCA9PT0gMCAmJiBudW1lcmFscyA9PT0gMCkge1xyXG4gICAgICByZXN1bHQudW5zaGlmdChoQXJyYXkwXzlbbV0pO1xyXG4gICAgfVxyXG4gICAgc3RlcCsrO1xyXG4gIH1cclxuICByZXN1bHQgPSByZXN1bHQuam9pbignJykuc3BsaXQoJycpO1xyXG4gIGlmIChyZXN1bHQubGVuZ3RoID09PSAxKSB7XHJcbiAgICByZXN1bHQucHVzaChnZXJlc2gpO1xyXG4gIH0gZWxzZSBpZiAocmVzdWx0Lmxlbmd0aCA+IDEpIHtcclxuICAgIHJlc3VsdC5zcGxpY2UocmVzdWx0Lmxlbmd0aCAtIDEsIDAsIGdlcnNoYWltKTtcclxuICB9XHJcbiAgcmV0dXJuIHJlc3VsdC5qb2luKCcnKTtcclxufVxyXG4iLCJpbXBvcnQge05nYkRhdGV9IGZyb20gJy4uL25nYi1kYXRlJztcclxuaW1wb3J0IHtOZ2JDYWxlbmRhciwgTmdiUGVyaW9kfSBmcm9tICcuLi9uZ2ItY2FsZW5kYXInO1xyXG5pbXBvcnQge0luamVjdGFibGV9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQge2lzTnVtYmVyfSBmcm9tICcuLi8uLi91dGlsL3V0aWwnO1xyXG5pbXBvcnQge1xyXG4gIGZyb21HcmVnb3JpYW4sXHJcbiAgZ2V0RGF5TnVtYmVySW5IZWJyZXdZZWFyLFxyXG4gIGdldERheXNJbkhlYnJld01vbnRoLFxyXG4gIGlzSGVicmV3TGVhcFllYXIsXHJcbiAgdG9HcmVnb3JpYW4sXHJcbiAgc2V0SGVicmV3RGF5LFxyXG4gIHNldEhlYnJld01vbnRoXHJcbn0gZnJvbSAnLi9oZWJyZXcnO1xyXG5cclxuLyoqXHJcbiAqIFRoZSBIZWJyZXcgb3IgSmV3aXNoIGNhbGVuZGFyIGlzIGEgbHVuaXNvbGFyIGNhbGVuZGFyLlxyXG4gKiBJbiBJc3JhZWwsIGl0IGlzIHVzZWQgZm9yIHJlbGlnaW91cyBwdXJwb3NlcyBhbmQgZnJlcXVlbnRseSAtIGFzIGFuIG9mZmljaWFsIGNhbGVuZGFyIGZvciBjaXZpbCBwdXJwb3Nlcy5cclxuICpcclxuICogQHNpbmNlIDMuMi4wXHJcbiAqL1xyXG5ASW5qZWN0YWJsZSgpXHJcbmV4cG9ydCBjbGFzcyBOZ2JDYWxlbmRhckhlYnJldyBleHRlbmRzIE5nYkNhbGVuZGFyIHtcclxuICBnZXREYXlzUGVyV2VlaygpIHsgcmV0dXJuIDc7IH1cclxuXHJcbiAgZ2V0TW9udGhzKHllYXI/OiBudW1iZXIpIHtcclxuICAgIGlmICh5ZWFyICYmIGlzSGVicmV3TGVhcFllYXIoeWVhcikpIHtcclxuICAgICAgcmV0dXJuIFsxLCAyLCAzLCA0LCA1LCA2LCA3LCA4LCA5LCAxMCwgMTEsIDEyLCAxM107XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICByZXR1cm4gWzEsIDIsIDMsIDQsIDUsIDYsIDcsIDgsIDksIDEwLCAxMSwgMTJdO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgZ2V0V2Vla3NQZXJNb250aCgpIHsgcmV0dXJuIDY7IH1cclxuXHJcbiAgaXNWYWxpZChkYXRlOiBOZ2JEYXRlKTogYm9vbGVhbiB7XHJcbiAgICBsZXQgYiA9IGRhdGUgJiYgaXNOdW1iZXIoZGF0ZS55ZWFyKSAmJiBpc051bWJlcihkYXRlLm1vbnRoKSAmJiBpc051bWJlcihkYXRlLmRheSk7XHJcbiAgICBiID0gYiAmJiBkYXRlLm1vbnRoID4gMCAmJiBkYXRlLm1vbnRoIDw9IChpc0hlYnJld0xlYXBZZWFyKGRhdGUueWVhcikgPyAxMyA6IDEyKTtcclxuICAgIGIgPSBiICYmIGRhdGUuZGF5ID4gMCAmJiBkYXRlLmRheSA8PSBnZXREYXlzSW5IZWJyZXdNb250aChkYXRlLm1vbnRoLCBkYXRlLnllYXIpO1xyXG4gICAgcmV0dXJuIGIgJiYgIWlzTmFOKHRvR3JlZ29yaWFuKGRhdGUpLmdldFRpbWUoKSk7XHJcbiAgfVxyXG5cclxuICBnZXROZXh0KGRhdGU6IE5nYkRhdGUsIHBlcmlvZDogTmdiUGVyaW9kID0gJ2QnLCBudW1iZXIgPSAxKSB7XHJcbiAgICBkYXRlID0gbmV3IE5nYkRhdGUoZGF0ZS55ZWFyLCBkYXRlLm1vbnRoLCBkYXRlLmRheSk7XHJcblxyXG4gICAgc3dpdGNoIChwZXJpb2QpIHtcclxuICAgICAgY2FzZSAneSc6XHJcbiAgICAgICAgZGF0ZS55ZWFyICs9IG51bWJlcjtcclxuICAgICAgICBkYXRlLm1vbnRoID0gMTtcclxuICAgICAgICBkYXRlLmRheSA9IDE7XHJcbiAgICAgICAgcmV0dXJuIGRhdGU7XHJcbiAgICAgIGNhc2UgJ20nOlxyXG4gICAgICAgIGRhdGUgPSBzZXRIZWJyZXdNb250aChkYXRlLCBudW1iZXIpO1xyXG4gICAgICAgIGRhdGUuZGF5ID0gMTtcclxuICAgICAgICByZXR1cm4gZGF0ZTtcclxuICAgICAgY2FzZSAnZCc6XHJcbiAgICAgICAgcmV0dXJuIHNldEhlYnJld0RheShkYXRlLCBudW1iZXIpO1xyXG4gICAgICBkZWZhdWx0OlxyXG4gICAgICAgIHJldHVybiBkYXRlO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgZ2V0UHJldihkYXRlOiBOZ2JEYXRlLCBwZXJpb2Q6IE5nYlBlcmlvZCA9ICdkJywgbnVtYmVyID0gMSkgeyByZXR1cm4gdGhpcy5nZXROZXh0KGRhdGUsIHBlcmlvZCwgLW51bWJlcik7IH1cclxuXHJcbiAgZ2V0V2Vla2RheShkYXRlOiBOZ2JEYXRlKSB7XHJcbiAgICBjb25zdCBkYXkgPSB0b0dyZWdvcmlhbihkYXRlKS5nZXREYXkoKTtcclxuICAgIC8vIGluIEpTIERhdGUgU3VuPTAsIGluIElTTyA4NjAxIFN1bj03XHJcbiAgICByZXR1cm4gZGF5ID09PSAwID8gNyA6IGRheTtcclxuICB9XHJcblxyXG4gIGdldFdlZWtOdW1iZXIod2VlazogTmdiRGF0ZVtdLCBmaXJzdERheU9mV2VlazogbnVtYmVyKSB7XHJcbiAgICBjb25zdCBkYXRlID0gd2Vla1t3ZWVrLmxlbmd0aCAtIDFdO1xyXG4gICAgcmV0dXJuIE1hdGguY2VpbChnZXREYXlOdW1iZXJJbkhlYnJld1llYXIoZGF0ZSkgLyA3KTtcclxuICB9XHJcblxyXG4gIGdldFRvZGF5KCk6IE5nYkRhdGUgeyByZXR1cm4gZnJvbUdyZWdvcmlhbihuZXcgRGF0ZSgpKTsgfVxyXG59XHJcbiIsImltcG9ydCB7TmdiRGF0ZXBpY2tlckkxOG59IGZyb20gJy4uL2RhdGVwaWNrZXItaTE4bic7XHJcbmltcG9ydCB7TmdiRGF0ZVN0cnVjdH0gZnJvbSAnLi4vLi4vaW5kZXgnO1xyXG5pbXBvcnQge2hlYnJld051bWVyYWxzLCBpc0hlYnJld0xlYXBZZWFyfSBmcm9tICcuL2hlYnJldyc7XHJcbmltcG9ydCB7SW5qZWN0YWJsZX0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcblxyXG5cclxuY29uc3QgV0VFS0RBWVMgPSBbJ8OXwpHDl8KzJywgJ8OXwpLDl8KzJywgJ8OXwpPDl8KzJywgJ8OXwpTDl8KzJywgJ8OXwpXDl8KzJywgJ8OXwqnDl8KzJywgJ8OXwpDDl8KzJ107XHJcbmNvbnN0IE1PTlRIUyA9IFsnw5fCqsOXwqnDl8Kow5fCmScsICfDl8KXw5fCqcOXwpXDl8KfJywgJ8OXwpvDl8Khw5fCnMOXwpUnLCAnw5fCmMOXwpHDl8KqJywgJ8OXwqnDl8KRw5fCmCcsICfDl8KQw5fCk8OXwqgnLCAnw5fCoMOXwpnDl8Khw5fCnycsICfDl8KQw5fCmcOXwpnDl8KoJywgJ8OXwqHDl8KZw5fClcOXwp8nLCAnw5fCqsOXwp7Dl8KVw5fClicsICfDl8KQw5fCkScsICfDl8KQw5fCnMOXwpXDl8KcJ107XHJcbmNvbnN0IE1PTlRIU19MRUFQID1cclxuICAgIFsnw5fCqsOXwqnDl8Kow5fCmScsICfDl8KXw5fCqcOXwpXDl8KfJywgJ8OXwpvDl8Khw5fCnMOXwpUnLCAnw5fCmMOXwpHDl8KqJywgJ8OXwqnDl8KRw5fCmCcsICfDl8KQw5fCk8OXwqggw5fCkMOXwrMnLCAnw5fCkMOXwpPDl8KoIMOXwpHDl8KzJywgJ8OXwqDDl8KZw5fCocOXwp8nLCAnw5fCkMOXwpnDl8KZw5fCqCcsICfDl8Khw5fCmcOXwpXDl8KfJywgJ8OXwqrDl8Kew5fClcOXwpYnLCAnw5fCkMOXwpEnLCAnw5fCkMOXwpzDl8KVw5fCnCddO1xyXG5cclxuLyoqXHJcbiAqIEBzaW5jZSAzLjIuMFxyXG4gKi9cclxuQEluamVjdGFibGUoKVxyXG5leHBvcnQgY2xhc3MgTmdiRGF0ZXBpY2tlckkxOG5IZWJyZXcgZXh0ZW5kcyBOZ2JEYXRlcGlja2VySTE4biB7XHJcbiAgZ2V0TW9udGhTaG9ydE5hbWUobW9udGg6IG51bWJlciwgeWVhcj86IG51bWJlcik6IHN0cmluZyB7IHJldHVybiB0aGlzLmdldE1vbnRoRnVsbE5hbWUobW9udGgsIHllYXIpOyB9XHJcblxyXG4gIGdldE1vbnRoRnVsbE5hbWUobW9udGg6IG51bWJlciwgeWVhcj86IG51bWJlcik6IHN0cmluZyB7XHJcbiAgICByZXR1cm4gaXNIZWJyZXdMZWFwWWVhcih5ZWFyKSA/IE1PTlRIU19MRUFQW21vbnRoIC0gMV0gOiBNT05USFNbbW9udGggLSAxXTtcclxuICB9XHJcblxyXG4gIGdldFdlZWtkYXlTaG9ydE5hbWUod2Vla2RheTogbnVtYmVyKTogc3RyaW5nIHsgcmV0dXJuIFdFRUtEQVlTW3dlZWtkYXkgLSAxXTsgfVxyXG5cclxuICBnZXREYXlBcmlhTGFiZWwoZGF0ZTogTmdiRGF0ZVN0cnVjdCk6IHN0cmluZyB7XHJcbiAgICByZXR1cm4gYCR7aGVicmV3TnVtZXJhbHMoZGF0ZS5kYXkpfSAke3RoaXMuZ2V0TW9udGhGdWxsTmFtZShkYXRlLm1vbnRoLCBkYXRlLnllYXIpfSAke2hlYnJld051bWVyYWxzKGRhdGUueWVhcil9YDtcclxuICB9XHJcblxyXG4gIGdldERheU51bWVyYWxzKGRhdGU6IE5nYkRhdGVTdHJ1Y3QpOiBzdHJpbmcgeyByZXR1cm4gaGVicmV3TnVtZXJhbHMoZGF0ZS5kYXkpOyB9XHJcblxyXG4gIGdldFdlZWtOdW1lcmFscyh3ZWVrTnVtYmVyOiBudW1iZXIpOiBzdHJpbmcgeyByZXR1cm4gaGVicmV3TnVtZXJhbHMod2Vla051bWJlcik7IH1cclxuXHJcbiAgZ2V0WWVhck51bWVyYWxzKHllYXI6IG51bWJlcik6IHN0cmluZyB7IHJldHVybiBoZWJyZXdOdW1lcmFscyh5ZWFyKTsgfVxyXG59XHJcbiIsImltcG9ydCB7SW5qZWN0YWJsZX0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7TmdiRGF0ZUFkYXB0ZXJ9IGZyb20gJy4vbmdiLWRhdGUtYWRhcHRlcic7XHJcbmltcG9ydCB7TmdiRGF0ZVN0cnVjdH0gZnJvbSAnLi4vbmdiLWRhdGUtc3RydWN0JztcclxuXHJcbkBJbmplY3RhYmxlKClcclxuZXhwb3J0IGNsYXNzIE5nYkRhdGVOYXRpdmVBZGFwdGVyIGV4dGVuZHMgTmdiRGF0ZUFkYXB0ZXI8RGF0ZT4ge1xyXG4gIGZyb21Nb2RlbChkYXRlOiBEYXRlKTogTmdiRGF0ZVN0cnVjdCB7XHJcbiAgICByZXR1cm4gKGRhdGUgaW5zdGFuY2VvZiBEYXRlKSA/IHt5ZWFyOiBkYXRlLmdldEZ1bGxZZWFyKCksIG1vbnRoOiBkYXRlLmdldE1vbnRoKCkgKyAxLCBkYXk6IGRhdGUuZ2V0RGF0ZSgpfSA6IG51bGw7XHJcbiAgfVxyXG5cclxuICB0b01vZGVsKGRhdGU6IE5nYkRhdGVTdHJ1Y3QpOiBEYXRlIHtcclxuICAgIHJldHVybiBkYXRlICYmIGRhdGUueWVhciAmJiBkYXRlLm1vbnRoID8gbmV3IERhdGUoZGF0ZS55ZWFyLCBkYXRlLm1vbnRoIC0gMSwgZGF0ZS5kYXksIDEyKSA6IG51bGw7XHJcbiAgfVxyXG59XHJcbiIsImltcG9ydCB7SW5qZWN0YWJsZX0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7TmdiRGF0ZUFkYXB0ZXJ9IGZyb20gJy4vbmdiLWRhdGUtYWRhcHRlcic7XHJcbmltcG9ydCB7TmdiRGF0ZVN0cnVjdH0gZnJvbSAnLi4vbmdiLWRhdGUtc3RydWN0JztcclxuXHJcbi8qKlxyXG4gKiBAc2luY2UgMy4yLjBcclxuICovXHJcbkBJbmplY3RhYmxlKClcclxuZXhwb3J0IGNsYXNzIE5nYkRhdGVOYXRpdmVVVENBZGFwdGVyIGV4dGVuZHMgTmdiRGF0ZUFkYXB0ZXI8RGF0ZT4ge1xyXG4gIGZyb21Nb2RlbChkYXRlOiBEYXRlKTogTmdiRGF0ZVN0cnVjdCB7XHJcbiAgICByZXR1cm4gKGRhdGUgaW5zdGFuY2VvZiBEYXRlKSA/XHJcbiAgICAgICAge3llYXI6IGRhdGUuZ2V0VVRDRnVsbFllYXIoKSwgbW9udGg6IGRhdGUuZ2V0VVRDTW9udGgoKSArIDEsIGRheTogZGF0ZS5nZXRVVENEYXRlKCl9IDpcclxuICAgICAgICBudWxsO1xyXG4gIH1cclxuXHJcbiAgdG9Nb2RlbChkYXRlOiBOZ2JEYXRlU3RydWN0KTogRGF0ZSB7XHJcbiAgICByZXR1cm4gZGF0ZSAmJiBkYXRlLnllYXIgJiYgZGF0ZS5tb250aCA/IG5ldyBEYXRlKERhdGUuVVRDKGRhdGUueWVhciwgZGF0ZS5tb250aCAtIDEsIGRhdGUuZGF5KSkgOiBudWxsO1xyXG4gIH1cclxufVxyXG4iLCJpbXBvcnQge05nTW9kdWxlLCBNb2R1bGVXaXRoUHJvdmlkZXJzfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHtDb21tb25Nb2R1bGV9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XHJcbmltcG9ydCB7Rm9ybXNNb2R1bGV9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcclxuaW1wb3J0IHtOZ2JEYXRlcGlja2VyfSBmcm9tICcuL2RhdGVwaWNrZXInO1xyXG5pbXBvcnQge05nYkRhdGVwaWNrZXJNb250aFZpZXd9IGZyb20gJy4vZGF0ZXBpY2tlci1tb250aC12aWV3JztcclxuaW1wb3J0IHtOZ2JEYXRlcGlja2VyTmF2aWdhdGlvbn0gZnJvbSAnLi9kYXRlcGlja2VyLW5hdmlnYXRpb24nO1xyXG5pbXBvcnQge05nYklucHV0RGF0ZXBpY2tlcn0gZnJvbSAnLi9kYXRlcGlja2VyLWlucHV0JztcclxuaW1wb3J0IHtOZ2JEYXRlcGlja2VyRGF5Vmlld30gZnJvbSAnLi9kYXRlcGlja2VyLWRheS12aWV3JztcclxuaW1wb3J0IHtOZ2JEYXRlcGlja2VyTmF2aWdhdGlvblNlbGVjdH0gZnJvbSAnLi9kYXRlcGlja2VyLW5hdmlnYXRpb24tc2VsZWN0JztcclxuXHJcbmV4cG9ydCB7TmdiRGF0ZXBpY2tlciwgTmdiRGF0ZXBpY2tlck5hdmlnYXRlRXZlbnR9IGZyb20gJy4vZGF0ZXBpY2tlcic7XHJcbmV4cG9ydCB7TmdiSW5wdXREYXRlcGlja2VyfSBmcm9tICcuL2RhdGVwaWNrZXItaW5wdXQnO1xyXG5leHBvcnQge05nYkNhbGVuZGFyLCBOZ2JQZXJpb2R9IGZyb20gJy4vbmdiLWNhbGVuZGFyJztcclxuZXhwb3J0IHtOZ2JDYWxlbmRhcklzbGFtaWNDaXZpbH0gZnJvbSAnLi9oaWpyaS9uZ2ItY2FsZW5kYXItaXNsYW1pYy1jaXZpbCc7XHJcbmV4cG9ydCB7TmdiQ2FsZW5kYXJJc2xhbWljVW1hbHF1cmF9IGZyb20gJy4vaGlqcmkvbmdiLWNhbGVuZGFyLWlzbGFtaWMtdW1hbHF1cmEnO1xyXG5leHBvcnQge05nYkNhbGVuZGFyUGVyc2lhbn0gZnJvbSAnLi9qYWxhbGkvbmdiLWNhbGVuZGFyLXBlcnNpYW4nO1xyXG5leHBvcnQge05nYkNhbGVuZGFySGVicmV3fSBmcm9tICcuL2hlYnJldy9uZ2ItY2FsZW5kYXItaGVicmV3JztcclxuZXhwb3J0IHtOZ2JEYXRlcGlja2VySTE4bkhlYnJld30gZnJvbSAnLi9oZWJyZXcvZGF0ZXBpY2tlci1pMThuLWhlYnJldyc7XHJcbmV4cG9ydCB7TmdiRGF0ZXBpY2tlck1vbnRoVmlld30gZnJvbSAnLi9kYXRlcGlja2VyLW1vbnRoLXZpZXcnO1xyXG5leHBvcnQge05nYkRhdGVwaWNrZXJEYXlWaWV3fSBmcm9tICcuL2RhdGVwaWNrZXItZGF5LXZpZXcnO1xyXG5leHBvcnQge05nYkRhdGVwaWNrZXJOYXZpZ2F0aW9ufSBmcm9tICcuL2RhdGVwaWNrZXItbmF2aWdhdGlvbic7XHJcbmV4cG9ydCB7TmdiRGF0ZXBpY2tlck5hdmlnYXRpb25TZWxlY3R9IGZyb20gJy4vZGF0ZXBpY2tlci1uYXZpZ2F0aW9uLXNlbGVjdCc7XHJcbmV4cG9ydCB7TmdiRGF0ZXBpY2tlckNvbmZpZ30gZnJvbSAnLi9kYXRlcGlja2VyLWNvbmZpZyc7XHJcbmV4cG9ydCB7TmdiRGF0ZXBpY2tlckkxOG59IGZyb20gJy4vZGF0ZXBpY2tlci1pMThuJztcclxuZXhwb3J0IHtOZ2JEYXRlU3RydWN0fSBmcm9tICcuL25nYi1kYXRlLXN0cnVjdCc7XHJcbmV4cG9ydCB7TmdiRGF0ZX0gZnJvbSAnLi9uZ2ItZGF0ZSc7XHJcbmV4cG9ydCB7TmdiRGF0ZUFkYXB0ZXJ9IGZyb20gJy4vYWRhcHRlcnMvbmdiLWRhdGUtYWRhcHRlcic7XHJcbmV4cG9ydCB7TmdiRGF0ZU5hdGl2ZUFkYXB0ZXJ9IGZyb20gJy4vYWRhcHRlcnMvbmdiLWRhdGUtbmF0aXZlLWFkYXB0ZXInO1xyXG5leHBvcnQge05nYkRhdGVOYXRpdmVVVENBZGFwdGVyfSBmcm9tICcuL2FkYXB0ZXJzL25nYi1kYXRlLW5hdGl2ZS11dGMtYWRhcHRlcic7XHJcbmV4cG9ydCB7TmdiRGF0ZVBhcnNlckZvcm1hdHRlcn0gZnJvbSAnLi9uZ2ItZGF0ZS1wYXJzZXItZm9ybWF0dGVyJztcclxuXHJcbkBOZ01vZHVsZSh7XHJcbiAgZGVjbGFyYXRpb25zOiBbXHJcbiAgICBOZ2JEYXRlcGlja2VyLCBOZ2JEYXRlcGlja2VyTW9udGhWaWV3LCBOZ2JEYXRlcGlja2VyTmF2aWdhdGlvbiwgTmdiRGF0ZXBpY2tlck5hdmlnYXRpb25TZWxlY3QsIE5nYkRhdGVwaWNrZXJEYXlWaWV3LFxyXG4gICAgTmdiSW5wdXREYXRlcGlja2VyXHJcbiAgXSxcclxuICBleHBvcnRzOiBbTmdiRGF0ZXBpY2tlciwgTmdiSW5wdXREYXRlcGlja2VyXSxcclxuICBpbXBvcnRzOiBbQ29tbW9uTW9kdWxlLCBGb3Jtc01vZHVsZV0sXHJcbiAgZW50cnlDb21wb25lbnRzOiBbTmdiRGF0ZXBpY2tlcl1cclxufSlcclxuZXhwb3J0IGNsYXNzIE5nYkRhdGVwaWNrZXJNb2R1bGUge1xyXG4gIC8qKlxyXG4gICAqIEltcG9ydGluZyB3aXRoICcuZm9yUm9vdCgpJyBpcyBubyBsb25nZXIgbmVjZXNzYXJ5LCB5b3UgY2FuIHNpbXBseSBpbXBvcnQgdGhlIG1vZHVsZS5cclxuICAgKiBXaWxsIGJlIHJlbW92ZWQgaW4gNC4wLjAuXHJcbiAgICpcclxuICAgKiBAZGVwcmVjYXRlZCAzLjAuMFxyXG4gICAqL1xyXG4gIHN0YXRpYyBmb3JSb290KCk6IE1vZHVsZVdpdGhQcm92aWRlcnMgeyByZXR1cm4ge25nTW9kdWxlOiBOZ2JEYXRlcGlja2VyTW9kdWxlfTsgfVxyXG59XHJcbiIsImltcG9ydCB7SW5qZWN0YWJsZX0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7UGxhY2VtZW50QXJyYXl9IGZyb20gJy4uL3V0aWwvcG9zaXRpb25pbmcnO1xyXG5cclxuLyoqXHJcbiAqIENvbmZpZ3VyYXRpb24gc2VydmljZSBmb3IgdGhlIE5nYkRyb3Bkb3duIGRpcmVjdGl2ZS5cclxuICogWW91IGNhbiBpbmplY3QgdGhpcyBzZXJ2aWNlLCB0eXBpY2FsbHkgaW4geW91ciByb290IGNvbXBvbmVudCwgYW5kIGN1c3RvbWl6ZSB0aGUgdmFsdWVzIG9mIGl0cyBwcm9wZXJ0aWVzIGluXHJcbiAqIG9yZGVyIHRvIHByb3ZpZGUgZGVmYXVsdCB2YWx1ZXMgZm9yIGFsbCB0aGUgZHJvcGRvd25zIHVzZWQgaW4gdGhlIGFwcGxpY2F0aW9uLlxyXG4gKi9cclxuQEluamVjdGFibGUoe3Byb3ZpZGVkSW46ICdyb290J30pXHJcbmV4cG9ydCBjbGFzcyBOZ2JEcm9wZG93bkNvbmZpZyB7XHJcbiAgYXV0b0Nsb3NlOiBib29sZWFuIHwgJ291dHNpZGUnIHwgJ2luc2lkZScgPSB0cnVlO1xyXG4gIHBsYWNlbWVudDogUGxhY2VtZW50QXJyYXkgPSAnYm90dG9tLWxlZnQnO1xyXG59XHJcbiIsImltcG9ydCB7XHJcbiAgZm9yd2FyZFJlZixcclxuICBJbmplY3QsXHJcbiAgRGlyZWN0aXZlLFxyXG4gIElucHV0LFxyXG4gIE91dHB1dCxcclxuICBFdmVudEVtaXR0ZXIsXHJcbiAgRWxlbWVudFJlZixcclxuICBDb250ZW50Q2hpbGQsXHJcbiAgTmdab25lLFxyXG4gIFJlbmRlcmVyMixcclxuICBPbkluaXQsXHJcbiAgT25EZXN0cm95LFxyXG4gIENoYW5nZURldGVjdG9yUmVmXHJcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7RE9DVU1FTlR9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XHJcbmltcG9ydCB7ZnJvbUV2ZW50LCByYWNlLCBTdWJqZWN0LCBTdWJzY3JpcHRpb259IGZyb20gJ3J4anMnO1xyXG5pbXBvcnQge2ZpbHRlciwgdGFrZVVudGlsfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XHJcbmltcG9ydCB7TmdiRHJvcGRvd25Db25maWd9IGZyb20gJy4vZHJvcGRvd24tY29uZmlnJztcclxuaW1wb3J0IHtwb3NpdGlvbkVsZW1lbnRzLCBQbGFjZW1lbnRBcnJheSwgUGxhY2VtZW50fSBmcm9tICcuLi91dGlsL3Bvc2l0aW9uaW5nJztcclxuaW1wb3J0IHtLZXl9IGZyb20gJy4uL3V0aWwva2V5JztcclxuXHJcbi8qKlxyXG4gKi9cclxuQERpcmVjdGl2ZSh7XHJcbiAgc2VsZWN0b3I6ICdbbmdiRHJvcGRvd25NZW51XScsXHJcbiAgaG9zdDogeydbY2xhc3MuZHJvcGRvd24tbWVudV0nOiAndHJ1ZScsICdbY2xhc3Muc2hvd10nOiAnZHJvcGRvd24uaXNPcGVuKCknLCAnW2F0dHIueC1wbGFjZW1lbnRdJzogJ3BsYWNlbWVudCd9XHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBOZ2JEcm9wZG93bk1lbnUge1xyXG4gIHBsYWNlbWVudDogUGxhY2VtZW50ID0gJ2JvdHRvbSc7XHJcbiAgaXNPcGVuID0gZmFsc2U7XHJcblxyXG4gIGNvbnN0cnVjdG9yKFxyXG4gICAgICBASW5qZWN0KGZvcndhcmRSZWYoKCkgPT4gTmdiRHJvcGRvd24pKSBwdWJsaWMgZHJvcGRvd24sIHByaXZhdGUgX2VsZW1lbnRSZWY6IEVsZW1lbnRSZWY8SFRNTEVsZW1lbnQ+LFxyXG4gICAgICBwcml2YXRlIF9yZW5kZXJlcjogUmVuZGVyZXIyKSB7fVxyXG5cclxuICBpc0V2ZW50RnJvbSgkZXZlbnQpIHsgcmV0dXJuIHRoaXMuX2VsZW1lbnRSZWYubmF0aXZlRWxlbWVudC5jb250YWlucygkZXZlbnQudGFyZ2V0KTsgfVxyXG5cclxuICBwb3NpdGlvbih0cmlnZ2VyRWwsIHBsYWNlbWVudCkge1xyXG4gICAgdGhpcy5hcHBseVBsYWNlbWVudChwb3NpdGlvbkVsZW1lbnRzKHRyaWdnZXJFbCwgdGhpcy5fZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50LCBwbGFjZW1lbnQpKTtcclxuICB9XHJcblxyXG4gIGFwcGx5UGxhY2VtZW50KF9wbGFjZW1lbnQ6IFBsYWNlbWVudCkge1xyXG4gICAgLy8gcmVtb3ZlIHRoZSBjdXJyZW50IHBsYWNlbWVudCBjbGFzc2VzXHJcbiAgICB0aGlzLl9yZW5kZXJlci5yZW1vdmVDbGFzcyh0aGlzLl9lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQucGFyZW50Tm9kZSwgJ2Ryb3B1cCcpO1xyXG4gICAgdGhpcy5fcmVuZGVyZXIucmVtb3ZlQ2xhc3ModGhpcy5fZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50LnBhcmVudE5vZGUsICdkcm9wZG93bicpO1xyXG4gICAgdGhpcy5wbGFjZW1lbnQgPSBfcGxhY2VtZW50O1xyXG4gICAgLyoqXHJcbiAgICAgKiBhcHBseSB0aGUgbmV3IHBsYWNlbWVudFxyXG4gICAgICogaW4gY2FzZSBvZiB0b3AgdXNlIHVwLWFycm93IG9yIGRvd24tYXJyb3cgb3RoZXJ3aXNlXHJcbiAgICAgKi9cclxuICAgIGlmIChfcGxhY2VtZW50LnNlYXJjaCgnXnRvcCcpICE9PSAtMSkge1xyXG4gICAgICB0aGlzLl9yZW5kZXJlci5hZGRDbGFzcyh0aGlzLl9lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQucGFyZW50Tm9kZSwgJ2Ryb3B1cCcpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdGhpcy5fcmVuZGVyZXIuYWRkQ2xhc3ModGhpcy5fZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50LnBhcmVudE5vZGUsICdkcm9wZG93bicpO1xyXG4gICAgfVxyXG4gIH1cclxufVxyXG5cclxuLyoqXHJcbiAqIE1hcmtzIGFuIGVsZW1lbnQgdG8gd2hpY2ggZHJvcGRvd24gbWVudSB3aWxsIGJlIGFuY2hvcmVkLiBUaGlzIGlzIGEgc2ltcGxlIHZlcnNpb25cclxuICogb2YgdGhlIE5nYkRyb3Bkb3duVG9nZ2xlIGRpcmVjdGl2ZS4gSXQgcGxheXMgdGhlIHNhbWUgcm9sZSBhcyBOZ2JEcm9wZG93blRvZ2dsZSBidXRcclxuICogZG9lc24ndCBsaXN0ZW4gdG8gY2xpY2sgZXZlbnRzIHRvIHRvZ2dsZSBkcm9wZG93biBtZW51IHRodXMgZW5hYmxpbmcgc3VwcG9ydCBmb3JcclxuICogZXZlbnRzIG90aGVyIHRoYW4gY2xpY2suXHJcbiAqXHJcbiAqIEBzaW5jZSAxLjEuMFxyXG4gKi9cclxuQERpcmVjdGl2ZSh7XHJcbiAgc2VsZWN0b3I6ICdbbmdiRHJvcGRvd25BbmNob3JdJyxcclxuICBob3N0OiB7J2NsYXNzJzogJ2Ryb3Bkb3duLXRvZ2dsZScsICdhcmlhLWhhc3BvcHVwJzogJ3RydWUnLCAnW2F0dHIuYXJpYS1leHBhbmRlZF0nOiAnZHJvcGRvd24uaXNPcGVuKCknfVxyXG59KVxyXG5leHBvcnQgY2xhc3MgTmdiRHJvcGRvd25BbmNob3Ige1xyXG4gIGFuY2hvckVsO1xyXG5cclxuICBjb25zdHJ1Y3RvcihASW5qZWN0KGZvcndhcmRSZWYoKCkgPT4gTmdiRHJvcGRvd24pKSBwdWJsaWMgZHJvcGRvd24sIHByaXZhdGUgX2VsZW1lbnRSZWY6IEVsZW1lbnRSZWY8SFRNTEVsZW1lbnQ+KSB7XHJcbiAgICB0aGlzLmFuY2hvckVsID0gX2VsZW1lbnRSZWYubmF0aXZlRWxlbWVudDtcclxuICB9XHJcblxyXG4gIGlzRXZlbnRGcm9tKCRldmVudCkgeyByZXR1cm4gdGhpcy5fZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50LmNvbnRhaW5zKCRldmVudC50YXJnZXQpOyB9XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBBbGxvd3MgdGhlIGRyb3Bkb3duIHRvIGJlIHRvZ2dsZWQgdmlhIGNsaWNrLiBUaGlzIGRpcmVjdGl2ZSBpcyBvcHRpb25hbDogeW91IGNhbiB1c2UgTmdiRHJvcGRvd25BbmNob3IgYXMgYW5cclxuICogYWx0ZXJuYXRpdmUuXHJcbiAqL1xyXG5ARGlyZWN0aXZlKHtcclxuICBzZWxlY3RvcjogJ1tuZ2JEcm9wZG93blRvZ2dsZV0nLFxyXG4gIGhvc3Q6IHtcclxuICAgICdjbGFzcyc6ICdkcm9wZG93bi10b2dnbGUnLFxyXG4gICAgJ2FyaWEtaGFzcG9wdXAnOiAndHJ1ZScsXHJcbiAgICAnW2F0dHIuYXJpYS1leHBhbmRlZF0nOiAnZHJvcGRvd24uaXNPcGVuKCknLFxyXG4gICAgJyhjbGljayknOiAndG9nZ2xlT3BlbigpJ1xyXG4gIH0sXHJcbiAgcHJvdmlkZXJzOiBbe3Byb3ZpZGU6IE5nYkRyb3Bkb3duQW5jaG9yLCB1c2VFeGlzdGluZzogZm9yd2FyZFJlZigoKSA9PiBOZ2JEcm9wZG93blRvZ2dsZSl9XVxyXG59KVxyXG5leHBvcnQgY2xhc3MgTmdiRHJvcGRvd25Ub2dnbGUgZXh0ZW5kcyBOZ2JEcm9wZG93bkFuY2hvciB7XHJcbiAgY29uc3RydWN0b3IoQEluamVjdChmb3J3YXJkUmVmKCgpID0+IE5nYkRyb3Bkb3duKSkgZHJvcGRvd24sIGVsZW1lbnRSZWY6IEVsZW1lbnRSZWY8SFRNTEVsZW1lbnQ+KSB7XHJcbiAgICBzdXBlcihkcm9wZG93biwgZWxlbWVudFJlZik7XHJcbiAgfVxyXG5cclxuICB0b2dnbGVPcGVuKCkgeyB0aGlzLmRyb3Bkb3duLnRvZ2dsZSgpOyB9XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBUcmFuc2Zvcm1zIGEgbm9kZSBpbnRvIGEgZHJvcGRvd24uXHJcbiAqL1xyXG5ARGlyZWN0aXZlKHtcclxuICBzZWxlY3RvcjogJ1tuZ2JEcm9wZG93bl0nLFxyXG4gIGV4cG9ydEFzOiAnbmdiRHJvcGRvd24nLFxyXG4gIGhvc3Q6IHtcclxuICAgICdbY2xhc3Muc2hvd10nOiAnaXNPcGVuKCknLFxyXG4gICAgJyhrZXlkb3duLkFycm93VXApJzogJ29uS2V5RG93bigkZXZlbnQpJyxcclxuICAgICcoa2V5ZG93bi5BcnJvd0Rvd24pJzogJ29uS2V5RG93bigkZXZlbnQpJyxcclxuICAgICcoa2V5ZG93bi5Ib21lKSc6ICdvbktleURvd24oJGV2ZW50KScsXHJcbiAgICAnKGtleWRvd24uRW5kKSc6ICdvbktleURvd24oJGV2ZW50KSdcclxuICB9XHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBOZ2JEcm9wZG93biBpbXBsZW1lbnRzIE9uSW5pdCxcclxuICAgIE9uRGVzdHJveSB7XHJcbiAgcHJpdmF0ZSBfY2xvc2VkJCA9IG5ldyBTdWJqZWN0PHZvaWQ+KCk7XHJcbiAgcHJpdmF0ZSBfem9uZVN1YnNjcmlwdGlvbjogU3Vic2NyaXB0aW9uO1xyXG5cclxuICBAQ29udGVudENoaWxkKE5nYkRyb3Bkb3duTWVudSkgcHJpdmF0ZSBfbWVudTogTmdiRHJvcGRvd25NZW51O1xyXG5cclxuICBAQ29udGVudENoaWxkKE5nYkRyb3Bkb3duTWVudSwge3JlYWQ6IEVsZW1lbnRSZWZ9KSBwcml2YXRlIF9tZW51RWxlbWVudFJlZjogRWxlbWVudFJlZjxIVE1MRWxlbWVudD47XHJcblxyXG4gIEBDb250ZW50Q2hpbGQoTmdiRHJvcGRvd25BbmNob3IpIHByaXZhdGUgX2FuY2hvcjogTmdiRHJvcGRvd25BbmNob3I7XHJcblxyXG4gIC8qKlxyXG4gICAqIEluZGljYXRlcyB0aGF0IGRyb3Bkb3duIHNob3VsZCBiZSBjbG9zZWQgd2hlbiBzZWxlY3Rpbmcgb25lIG9mIGRyb3Bkb3duIGl0ZW1zIChjbGljaykgb3IgcHJlc3NpbmcgRVNDLlxyXG4gICAqIFdoZW4gaXQgaXMgdHJ1ZSAoZGVmYXVsdCkgZHJvcGRvd25zIGFyZSBhdXRvbWF0aWNhbGx5IGNsb3NlZCBvbiBib3RoIG91dHNpZGUgYW5kIGluc2lkZSAobWVudSkgY2xpY2tzLlxyXG4gICAqIFdoZW4gaXQgaXMgZmFsc2UgZHJvcGRvd25zIGFyZSBuZXZlciBhdXRvbWF0aWNhbGx5IGNsb3NlZC5cclxuICAgKiBXaGVuIGl0IGlzICdvdXRzaWRlJyBkcm9wZG93bnMgYXJlIGF1dG9tYXRpY2FsbHkgY2xvc2VkIG9uIG91dHNpZGUgY2xpY2tzIGJ1dCBub3Qgb24gbWVudSBjbGlja3MuXHJcbiAgICogV2hlbiBpdCBpcyAnaW5zaWRlJyBkcm9wZG93bnMgYXJlIGF1dG9tYXRpY2FsbHkgb24gbWVudSBjbGlja3MgYnV0IG5vdCBvbiBvdXRzaWRlIGNsaWNrcy5cclxuICAgKi9cclxuICBASW5wdXQoKSBhdXRvQ2xvc2U6IGJvb2xlYW4gfCAnb3V0c2lkZScgfCAnaW5zaWRlJztcclxuXHJcbiAgLyoqXHJcbiAgICogIERlZmluZXMgd2hldGhlciBvciBub3QgdGhlIGRyb3Bkb3duLW1lbnUgaXMgb3BlbiBpbml0aWFsbHkuXHJcbiAgICovXHJcbiAgQElucHV0KCdvcGVuJykgX29wZW4gPSBmYWxzZTtcclxuXHJcbiAgLyoqXHJcbiAgICogUGxhY2VtZW50IG9mIGEgcG9wb3ZlciBhY2NlcHRzOlxyXG4gICAqICAgIFwidG9wXCIsIFwidG9wLWxlZnRcIiwgXCJ0b3AtcmlnaHRcIiwgXCJib3R0b21cIiwgXCJib3R0b20tbGVmdFwiLCBcImJvdHRvbS1yaWdodFwiLFxyXG4gICAqICAgIFwibGVmdFwiLCBcImxlZnQtdG9wXCIsIFwibGVmdC1ib3R0b21cIiwgXCJyaWdodFwiLCBcInJpZ2h0LXRvcFwiLCBcInJpZ2h0LWJvdHRvbVwiXHJcbiAgICogYW5kIGFycmF5IG9mIGFib3ZlIHZhbHVlcy5cclxuICAgKi9cclxuICBASW5wdXQoKSBwbGFjZW1lbnQ6IFBsYWNlbWVudEFycmF5O1xyXG5cclxuICAvKipcclxuICAgKiAgQW4gZXZlbnQgZmlyZWQgd2hlbiB0aGUgZHJvcGRvd24gaXMgb3BlbmVkIG9yIGNsb3NlZC5cclxuICAgKiAgRXZlbnQncyBwYXlsb2FkIGVxdWFscyB3aGV0aGVyIGRyb3Bkb3duIGlzIG9wZW4uXHJcbiAgICovXHJcbiAgQE91dHB1dCgpIG9wZW5DaGFuZ2UgPSBuZXcgRXZlbnRFbWl0dGVyKCk7XHJcblxyXG4gIGNvbnN0cnVjdG9yKFxyXG4gICAgICBwcml2YXRlIF9jaGFuZ2VEZXRlY3RvcjogQ2hhbmdlRGV0ZWN0b3JSZWYsIGNvbmZpZzogTmdiRHJvcGRvd25Db25maWcsIEBJbmplY3QoRE9DVU1FTlQpIHByaXZhdGUgX2RvY3VtZW50OiBhbnksXHJcbiAgICAgIHByaXZhdGUgX25nWm9uZTogTmdab25lKSB7XHJcbiAgICB0aGlzLnBsYWNlbWVudCA9IGNvbmZpZy5wbGFjZW1lbnQ7XHJcbiAgICB0aGlzLmF1dG9DbG9zZSA9IGNvbmZpZy5hdXRvQ2xvc2U7XHJcbiAgICB0aGlzLl96b25lU3Vic2NyaXB0aW9uID0gX25nWm9uZS5vblN0YWJsZS5zdWJzY3JpYmUoKCkgPT4geyB0aGlzLl9wb3NpdGlvbk1lbnUoKTsgfSk7XHJcbiAgfVxyXG5cclxuICBuZ09uSW5pdCgpIHtcclxuICAgIGlmICh0aGlzLl9tZW51KSB7XHJcbiAgICAgIHRoaXMuX21lbnUuYXBwbHlQbGFjZW1lbnQoQXJyYXkuaXNBcnJheSh0aGlzLnBsYWNlbWVudCkgPyAodGhpcy5wbGFjZW1lbnRbMF0pIDogdGhpcy5wbGFjZW1lbnQgYXMgUGxhY2VtZW50KTtcclxuICAgIH1cclxuXHJcbiAgICBpZiAodGhpcy5fb3Blbikge1xyXG4gICAgICB0aGlzLl9zZXRDbG9zZUhhbmRsZXJzKCk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBDaGVja3MgaWYgdGhlIGRyb3Bkb3duIG1lbnUgaXMgb3BlbiBvciBub3QuXHJcbiAgICovXHJcbiAgaXNPcGVuKCk6IGJvb2xlYW4geyByZXR1cm4gdGhpcy5fb3BlbjsgfVxyXG5cclxuICAvKipcclxuICAgKiBPcGVucyB0aGUgZHJvcGRvd24gbWVudSBvZiBhIGdpdmVuIG5hdmJhciBvciB0YWJiZWQgbmF2aWdhdGlvbi5cclxuICAgKi9cclxuICBvcGVuKCk6IHZvaWQge1xyXG4gICAgaWYgKCF0aGlzLl9vcGVuKSB7XHJcbiAgICAgIHRoaXMuX29wZW4gPSB0cnVlO1xyXG4gICAgICB0aGlzLl9wb3NpdGlvbk1lbnUoKTtcclxuICAgICAgdGhpcy5vcGVuQ2hhbmdlLmVtaXQodHJ1ZSk7XHJcbiAgICAgIHRoaXMuX3NldENsb3NlSGFuZGxlcnMoKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHByaXZhdGUgX3NldENsb3NlSGFuZGxlcnMoKSB7XHJcbiAgICBpZiAodGhpcy5hdXRvQ2xvc2UpIHtcclxuICAgICAgdGhpcy5fbmdab25lLnJ1bk91dHNpZGVBbmd1bGFyKCgpID0+IHtcclxuICAgICAgICBjb25zdCBlc2NhcGVzJCA9IGZyb21FdmVudDxLZXlib2FyZEV2ZW50Pih0aGlzLl9kb2N1bWVudCwgJ2tleXVwJylcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAucGlwZSh0YWtlVW50aWwodGhpcy5fY2xvc2VkJCksIGZpbHRlcihldmVudCA9PiBldmVudC53aGljaCA9PT0gS2V5LkVzY2FwZSkpO1xyXG5cclxuICAgICAgICBjb25zdCBjbGlja3MkID0gZnJvbUV2ZW50PE1vdXNlRXZlbnQ+KHRoaXMuX2RvY3VtZW50LCAnY2xpY2snKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLnBpcGUodGFrZVVudGlsKHRoaXMuX2Nsb3NlZCQpLCBmaWx0ZXIoZXZlbnQgPT4gdGhpcy5fc2hvdWxkQ2xvc2VGcm9tQ2xpY2soZXZlbnQpKSk7XHJcblxyXG4gICAgICAgIHJhY2U8RXZlbnQ+KFtlc2NhcGVzJCwgY2xpY2tzJF0pLnBpcGUodGFrZVVudGlsKHRoaXMuX2Nsb3NlZCQpKS5zdWJzY3JpYmUoKCkgPT4gdGhpcy5fbmdab25lLnJ1bigoKSA9PiB7XHJcbiAgICAgICAgICB0aGlzLmNsb3NlKCk7XHJcbiAgICAgICAgICB0aGlzLl9jaGFuZ2VEZXRlY3Rvci5tYXJrRm9yQ2hlY2soKTtcclxuICAgICAgICB9KSk7XHJcbiAgICAgIH0pO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogQ2xvc2VzIHRoZSBkcm9wZG93biBtZW51IG9mIGEgZ2l2ZW4gbmF2YmFyIG9yIHRhYmJlZCBuYXZpZ2F0aW9uLlxyXG4gICAqL1xyXG4gIGNsb3NlKCk6IHZvaWQge1xyXG4gICAgaWYgKHRoaXMuX29wZW4pIHtcclxuICAgICAgdGhpcy5fb3BlbiA9IGZhbHNlO1xyXG4gICAgICB0aGlzLl9jbG9zZWQkLm5leHQoKTtcclxuICAgICAgdGhpcy5vcGVuQ2hhbmdlLmVtaXQoZmFsc2UpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogVG9nZ2xlcyB0aGUgZHJvcGRvd24gbWVudSBvZiBhIGdpdmVuIG5hdmJhciBvciB0YWJiZWQgbmF2aWdhdGlvbi5cclxuICAgKi9cclxuICB0b2dnbGUoKTogdm9pZCB7XHJcbiAgICBpZiAodGhpcy5pc09wZW4oKSkge1xyXG4gICAgICB0aGlzLmNsb3NlKCk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB0aGlzLm9wZW4oKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHByaXZhdGUgX3Nob3VsZENsb3NlRnJvbUNsaWNrKGV2ZW50OiBNb3VzZUV2ZW50KSB7XHJcbiAgICBpZiAoZXZlbnQuYnV0dG9uICE9PSAyICYmICF0aGlzLl9pc0V2ZW50RnJvbVRvZ2dsZShldmVudCkpIHtcclxuICAgICAgaWYgKHRoaXMuYXV0b0Nsb3NlID09PSB0cnVlKSB7XHJcbiAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgIH0gZWxzZSBpZiAodGhpcy5hdXRvQ2xvc2UgPT09ICdpbnNpZGUnICYmIHRoaXMuX2lzRXZlbnRGcm9tTWVudShldmVudCkpIHtcclxuICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgfSBlbHNlIGlmICh0aGlzLmF1dG9DbG9zZSA9PT0gJ291dHNpZGUnICYmICF0aGlzLl9pc0V2ZW50RnJvbU1lbnUoZXZlbnQpKSB7XHJcbiAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICAgIHJldHVybiBmYWxzZTtcclxuICB9XHJcblxyXG4gIG5nT25EZXN0cm95KCkge1xyXG4gICAgdGhpcy5fY2xvc2VkJC5uZXh0KCk7XHJcbiAgICB0aGlzLl96b25lU3Vic2NyaXB0aW9uLnVuc3Vic2NyaWJlKCk7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIF9pc0V2ZW50RnJvbVRvZ2dsZSgkZXZlbnQpIHsgcmV0dXJuIHRoaXMuX2FuY2hvci5pc0V2ZW50RnJvbSgkZXZlbnQpOyB9XHJcblxyXG4gIHByaXZhdGUgX2lzRXZlbnRGcm9tTWVudSgkZXZlbnQpIHsgcmV0dXJuIHRoaXMuX21lbnUgPyB0aGlzLl9tZW51LmlzRXZlbnRGcm9tKCRldmVudCkgOiBmYWxzZTsgfVxyXG5cclxuICBwcml2YXRlIF9wb3NpdGlvbk1lbnUoKSB7XHJcbiAgICBpZiAodGhpcy5pc09wZW4oKSAmJiB0aGlzLl9tZW51KSB7XHJcbiAgICAgIHRoaXMuX21lbnUucG9zaXRpb24odGhpcy5fYW5jaG9yLmFuY2hvckVsLCB0aGlzLnBsYWNlbWVudCk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBvbktleURvd24oZXZlbnQ6IEtleWJvYXJkRXZlbnQpOiBib29sZWFuIHtcclxuICAgIGlmICghdGhpcy5pc09wZW4oKSkge1xyXG4gICAgICB0aGlzLm9wZW4oKTtcclxuICAgIH1cclxuICAgIGNvbnN0IGxpc3QgPSB0aGlzLmdldE1lbnVFbGVtZW50cygpO1xyXG4gICAgbGV0IHBvc2l0aW9uID0gbGlzdC5maW5kSW5kZXgoZWxlbWVudCA9PiBlbGVtZW50ID09PSB0aGlzLl9kb2N1bWVudC5hY3RpdmVFbGVtZW50KTtcclxuICAgIHN3aXRjaCAoZXZlbnQud2hpY2gpIHtcclxuICAgICAgY2FzZSBLZXkuQXJyb3dEb3duOlxyXG4gICAgICAgIHBvc2l0aW9uID0gTWF0aC5taW4ocG9zaXRpb24gKyAxLCBsaXN0Lmxlbmd0aCAtIDEpO1xyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgICBjYXNlIEtleS5BcnJvd1VwOlxyXG4gICAgICAgIHBvc2l0aW9uID0gTWF0aC5tYXgocG9zaXRpb24gLSAxLCAwKTtcclxuICAgICAgICBicmVhaztcclxuICAgICAgY2FzZSBLZXkuSG9tZTpcclxuICAgICAgICBwb3NpdGlvbiA9IDA7XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICAgIGNhc2UgS2V5LkVuZDpcclxuICAgICAgICBwb3NpdGlvbiA9IGxpc3QubGVuZ3RoIC0gMTtcclxuICAgICAgICBicmVhaztcclxuICAgIH1cclxuICAgIGNvbnN0IGVsbTogSFRNTEVsZW1lbnQgPSBsaXN0W3Bvc2l0aW9uXTtcclxuICAgIGVsbS5mb2N1cygpO1xyXG5cclxuICAgIHJldHVybiBmYWxzZTtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgZ2V0TWVudUVsZW1lbnRzKCk6IEhUTUxFbGVtZW50W10ge1xyXG4gICAgcmV0dXJuIEFycmF5LmZyb20oXHJcbiAgICAgICAgdGhpcy5fbWVudUVsZW1lbnRSZWYubmF0aXZlRWxlbWVudC5xdWVyeVNlbGVjdG9yQWxsKCcuZHJvcGRvd24taXRlbTpub3QoLmRpc2FibGVkKTpub3QoOmRpc2FibGVkKScpKTtcclxuICB9XHJcbn1cclxuIiwiaW1wb3J0IHtOZ01vZHVsZSwgTW9kdWxlV2l0aFByb3ZpZGVyc30gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7TmdiRHJvcGRvd24sIE5nYkRyb3Bkb3duQW5jaG9yLCBOZ2JEcm9wZG93blRvZ2dsZSwgTmdiRHJvcGRvd25NZW51fSBmcm9tICcuL2Ryb3Bkb3duJztcclxuXHJcbmV4cG9ydCB7TmdiRHJvcGRvd24sIE5nYkRyb3Bkb3duVG9nZ2xlLCBOZ2JEcm9wZG93bk1lbnV9IGZyb20gJy4vZHJvcGRvd24nO1xyXG5leHBvcnQge05nYkRyb3Bkb3duQ29uZmlnfSBmcm9tICcuL2Ryb3Bkb3duLWNvbmZpZyc7XHJcblxyXG5jb25zdCBOR0JfRFJPUERPV05fRElSRUNUSVZFUyA9IFtOZ2JEcm9wZG93biwgTmdiRHJvcGRvd25BbmNob3IsIE5nYkRyb3Bkb3duVG9nZ2xlLCBOZ2JEcm9wZG93bk1lbnVdO1xyXG5cclxuQE5nTW9kdWxlKHtkZWNsYXJhdGlvbnM6IE5HQl9EUk9QRE9XTl9ESVJFQ1RJVkVTLCBleHBvcnRzOiBOR0JfRFJPUERPV05fRElSRUNUSVZFU30pXHJcbmV4cG9ydCBjbGFzcyBOZ2JEcm9wZG93bk1vZHVsZSB7XHJcbiAgLyoqXHJcbiAgICogSW1wb3J0aW5nIHdpdGggJy5mb3JSb290KCknIGlzIG5vIGxvbmdlciBuZWNlc3NhcnksIHlvdSBjYW4gc2ltcGx5IGltcG9ydCB0aGUgbW9kdWxlLlxyXG4gICAqIFdpbGwgYmUgcmVtb3ZlZCBpbiA0LjAuMC5cclxuICAgKlxyXG4gICAqIEBkZXByZWNhdGVkIDMuMC4wXHJcbiAgICovXHJcbiAgc3RhdGljIGZvclJvb3QoKTogTW9kdWxlV2l0aFByb3ZpZGVycyB7IHJldHVybiB7bmdNb2R1bGU6IE5nYkRyb3Bkb3duTW9kdWxlfTsgfVxyXG59XHJcbiIsImltcG9ydCB7Q29tcG9uZW50LCBJbnB1dH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcblxyXG5AQ29tcG9uZW50KHtcclxuICBzZWxlY3RvcjogJ25nYi1tb2RhbC1iYWNrZHJvcCcsXHJcbiAgdGVtcGxhdGU6ICcnLFxyXG4gIGhvc3Q6XHJcbiAgICAgIHsnW2NsYXNzXSc6ICdcIm1vZGFsLWJhY2tkcm9wIGZhZGUgc2hvd1wiICsgKGJhY2tkcm9wQ2xhc3MgPyBcIiBcIiArIGJhY2tkcm9wQ2xhc3MgOiBcIlwiKScsICdzdHlsZSc6ICd6LWluZGV4OiAxMDUwJ31cclxufSlcclxuZXhwb3J0IGNsYXNzIE5nYk1vZGFsQmFja2Ryb3Age1xyXG4gIEBJbnB1dCgpIGJhY2tkcm9wQ2xhc3M6IHN0cmluZztcclxufVxyXG4iLCJleHBvcnQgZW51bSBNb2RhbERpc21pc3NSZWFzb25zIHtcclxuICBCQUNLRFJPUF9DTElDSyxcclxuICBFU0NcclxufVxyXG4iLCJpbXBvcnQge0RPQ1VNRU5UfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xyXG5pbXBvcnQge1xyXG4gIENvbXBvbmVudCxcclxuICBPdXRwdXQsXHJcbiAgRXZlbnRFbWl0dGVyLFxyXG4gIElucHV0LFxyXG4gIEluamVjdCxcclxuICBFbGVtZW50UmVmLFxyXG4gIE9uSW5pdCxcclxuICBBZnRlclZpZXdJbml0LFxyXG4gIE9uRGVzdHJveVxyXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5cclxuaW1wb3J0IHtNb2RhbERpc21pc3NSZWFzb25zfSBmcm9tICcuL21vZGFsLWRpc21pc3MtcmVhc29ucyc7XHJcblxyXG5AQ29tcG9uZW50KHtcclxuICBzZWxlY3RvcjogJ25nYi1tb2RhbC13aW5kb3cnLFxyXG4gIGhvc3Q6IHtcclxuICAgICdbY2xhc3NdJzogJ1wibW9kYWwgZmFkZSBzaG93IGQtYmxvY2tcIiArICh3aW5kb3dDbGFzcyA/IFwiIFwiICsgd2luZG93Q2xhc3MgOiBcIlwiKScsXHJcbiAgICAncm9sZSc6ICdkaWFsb2cnLFxyXG4gICAgJ3RhYmluZGV4JzogJy0xJyxcclxuICAgICcoa2V5dXAuZXNjKSc6ICdlc2NLZXkoJGV2ZW50KScsXHJcbiAgICAnKGNsaWNrKSc6ICdiYWNrZHJvcENsaWNrKCRldmVudCknLFxyXG4gICAgJ1thdHRyLmFyaWEtbGFiZWxsZWRieV0nOiAnYXJpYUxhYmVsbGVkQnknLFxyXG4gIH0sXHJcbiAgdGVtcGxhdGU6IGBcclxuICAgIDxkaXYgW2NsYXNzXT1cIidtb2RhbC1kaWFsb2cnICsgKHNpemUgPyAnIG1vZGFsLScgKyBzaXplIDogJycpICsgKGNlbnRlcmVkID8gJyBtb2RhbC1kaWFsb2ctY2VudGVyZWQnIDogJycpXCIgcm9sZT1cImRvY3VtZW50XCI+XHJcbiAgICAgICAgPGRpdiBjbGFzcz1cIm1vZGFsLWNvbnRlbnRcIj48bmctY29udGVudD48L25nLWNvbnRlbnQ+PC9kaXY+XHJcbiAgICA8L2Rpdj5cclxuICAgIGBcclxufSlcclxuZXhwb3J0IGNsYXNzIE5nYk1vZGFsV2luZG93IGltcGxlbWVudHMgT25Jbml0LFxyXG4gICAgQWZ0ZXJWaWV3SW5pdCwgT25EZXN0cm95IHtcclxuICBwcml2YXRlIF9lbFdpdGhGb2N1czogRWxlbWVudDsgIC8vIGVsZW1lbnQgdGhhdCBpcyBmb2N1c2VkIHByaW9yIHRvIG1vZGFsIG9wZW5pbmdcclxuXHJcbiAgQElucHV0KCkgYXJpYUxhYmVsbGVkQnk6IHN0cmluZztcclxuICBASW5wdXQoKSBiYWNrZHJvcDogYm9vbGVhbiB8IHN0cmluZyA9IHRydWU7XHJcbiAgQElucHV0KCkgY2VudGVyZWQ6IHN0cmluZztcclxuICBASW5wdXQoKSBrZXlib2FyZCA9IHRydWU7XHJcbiAgQElucHV0KCkgc2l6ZTogc3RyaW5nO1xyXG4gIEBJbnB1dCgpIHdpbmRvd0NsYXNzOiBzdHJpbmc7XHJcblxyXG4gIEBPdXRwdXQoJ2Rpc21pc3MnKSBkaXNtaXNzRXZlbnQgPSBuZXcgRXZlbnRFbWl0dGVyKCk7XHJcblxyXG4gIGNvbnN0cnVjdG9yKEBJbmplY3QoRE9DVU1FTlQpIHByaXZhdGUgX2RvY3VtZW50OiBhbnksIHByaXZhdGUgX2VsUmVmOiBFbGVtZW50UmVmPEhUTUxFbGVtZW50Pikge31cclxuXHJcbiAgYmFja2Ryb3BDbGljaygkZXZlbnQpOiB2b2lkIHtcclxuICAgIGlmICh0aGlzLmJhY2tkcm9wID09PSB0cnVlICYmIHRoaXMuX2VsUmVmLm5hdGl2ZUVsZW1lbnQgPT09ICRldmVudC50YXJnZXQpIHtcclxuICAgICAgdGhpcy5kaXNtaXNzKE1vZGFsRGlzbWlzc1JlYXNvbnMuQkFDS0RST1BfQ0xJQ0spO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgZXNjS2V5KCRldmVudCk6IHZvaWQge1xyXG4gICAgaWYgKHRoaXMua2V5Ym9hcmQgJiYgISRldmVudC5kZWZhdWx0UHJldmVudGVkKSB7XHJcbiAgICAgIHRoaXMuZGlzbWlzcyhNb2RhbERpc21pc3NSZWFzb25zLkVTQyk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBkaXNtaXNzKHJlYXNvbik6IHZvaWQgeyB0aGlzLmRpc21pc3NFdmVudC5lbWl0KHJlYXNvbik7IH1cclxuXHJcbiAgbmdPbkluaXQoKSB7IHRoaXMuX2VsV2l0aEZvY3VzID0gdGhpcy5fZG9jdW1lbnQuYWN0aXZlRWxlbWVudDsgfVxyXG5cclxuICBuZ0FmdGVyVmlld0luaXQoKSB7XHJcbiAgICBpZiAoIXRoaXMuX2VsUmVmLm5hdGl2ZUVsZW1lbnQuY29udGFpbnMoZG9jdW1lbnQuYWN0aXZlRWxlbWVudCkpIHtcclxuICAgICAgdGhpcy5fZWxSZWYubmF0aXZlRWxlbWVudFsnZm9jdXMnXS5hcHBseSh0aGlzLl9lbFJlZi5uYXRpdmVFbGVtZW50LCBbXSk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBuZ09uRGVzdHJveSgpIHtcclxuICAgIGNvbnN0IGJvZHkgPSB0aGlzLl9kb2N1bWVudC5ib2R5O1xyXG4gICAgY29uc3QgZWxXaXRoRm9jdXMgPSB0aGlzLl9lbFdpdGhGb2N1cztcclxuXHJcbiAgICBsZXQgZWxlbWVudFRvRm9jdXM7XHJcbiAgICBpZiAoZWxXaXRoRm9jdXMgJiYgZWxXaXRoRm9jdXNbJ2ZvY3VzJ10gJiYgYm9keS5jb250YWlucyhlbFdpdGhGb2N1cykpIHtcclxuICAgICAgZWxlbWVudFRvRm9jdXMgPSBlbFdpdGhGb2N1cztcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIGVsZW1lbnRUb0ZvY3VzID0gYm9keTtcclxuICAgIH1cclxuICAgIGVsZW1lbnRUb0ZvY3VzWydmb2N1cyddLmFwcGx5KGVsZW1lbnRUb0ZvY3VzLCBbXSk7XHJcblxyXG4gICAgdGhpcy5fZWxXaXRoRm9jdXMgPSBudWxsO1xyXG4gIH1cclxufVxyXG4iLCJpbXBvcnQge0luamVjdGFibGUsIEluamVjdG9yfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuXHJcbi8qKlxyXG4gKiBSZXByZXNlbnQgb3B0aW9ucyBhdmFpbGFibGUgd2hlbiBvcGVuaW5nIG5ldyBtb2RhbCB3aW5kb3dzLlxyXG4gKi9cclxuZXhwb3J0IGludGVyZmFjZSBOZ2JNb2RhbE9wdGlvbnMge1xyXG4gIC8qKlxyXG4gICAqIFNldHMgdGhlIGFyaWEgYXR0cmlidXRlIGFyaWEtbGFiZWxsZWRieSB0byBhIG1vZGFsIHdpbmRvdy5cclxuICAgKlxyXG4gICAqIEBzaW5jZSAyLjIuMFxyXG4gICAqL1xyXG4gIGFyaWFMYWJlbGxlZEJ5Pzogc3RyaW5nO1xyXG5cclxuICAvKipcclxuICAgKiBXaGV0aGVyIGEgYmFja2Ryb3AgZWxlbWVudCBzaG91bGQgYmUgY3JlYXRlZCBmb3IgYSBnaXZlbiBtb2RhbCAodHJ1ZSBieSBkZWZhdWx0KS5cclxuICAgKiBBbHRlcm5hdGl2ZWx5LCBzcGVjaWZ5ICdzdGF0aWMnIGZvciBhIGJhY2tkcm9wIHdoaWNoIGRvZXNuJ3QgY2xvc2UgdGhlIG1vZGFsIG9uIGNsaWNrLlxyXG4gICAqL1xyXG4gIGJhY2tkcm9wPzogYm9vbGVhbiB8ICdzdGF0aWMnO1xyXG5cclxuICAvKipcclxuICAgKiBGdW5jdGlvbiBjYWxsZWQgd2hlbiBhIG1vZGFsIHdpbGwgYmUgZGlzbWlzc2VkLlxyXG4gICAqIElmIHRoaXMgZnVuY3Rpb24gcmV0dXJucyBmYWxzZSwgdGhlIHByb21pc2UgaXMgcmVzb2x2ZWQgd2l0aCBmYWxzZSBvciB0aGUgcHJvbWlzZSBpcyByZWplY3RlZCwgdGhlIG1vZGFsIGlzIG5vdFxyXG4gICAqIGRpc21pc3NlZC5cclxuICAgKi9cclxuICBiZWZvcmVEaXNtaXNzPzogKCkgPT4gYm9vbGVhbiB8IFByb21pc2U8Ym9vbGVhbj47XHJcblxyXG4gIC8qKlxyXG4gICAqIFRvIGNlbnRlciB0aGUgbW9kYWwgdmVydGljYWxseSAoZmFsc2UgYnkgZGVmYXVsdCkuXHJcbiAgICpcclxuICAgKiBAc2luY2UgMS4xLjBcclxuICAgKi9cclxuICBjZW50ZXJlZD86IGJvb2xlYW47XHJcblxyXG4gIC8qKlxyXG4gICAqIEFuIGVsZW1lbnQgdG8gd2hpY2ggdG8gYXR0YWNoIG5ld2x5IG9wZW5lZCBtb2RhbCB3aW5kb3dzLlxyXG4gICAqL1xyXG4gIGNvbnRhaW5lcj86IHN0cmluZztcclxuXHJcbiAgLyoqXHJcbiAgICogSW5qZWN0b3IgdG8gdXNlIGZvciBtb2RhbCBjb250ZW50LlxyXG4gICAqL1xyXG4gIGluamVjdG9yPzogSW5qZWN0b3I7XHJcblxyXG4gIC8qKlxyXG4gICAqIFdoZXRoZXIgdG8gY2xvc2UgdGhlIG1vZGFsIHdoZW4gZXNjYXBlIGtleSBpcyBwcmVzc2VkICh0cnVlIGJ5IGRlZmF1bHQpLlxyXG4gICAqL1xyXG4gIGtleWJvYXJkPzogYm9vbGVhbjtcclxuXHJcbiAgLyoqXHJcbiAgICogU2l6ZSBvZiBhIG5ldyBtb2RhbCB3aW5kb3cuXHJcbiAgICovXHJcbiAgc2l6ZT86ICdzbScgfCAnbGcnO1xyXG5cclxuICAvKipcclxuICAgKiBDdXN0b20gY2xhc3MgdG8gYXBwZW5kIHRvIHRoZSBtb2RhbCB3aW5kb3dcclxuICAgKi9cclxuICB3aW5kb3dDbGFzcz86IHN0cmluZztcclxuXHJcbiAgLyoqXHJcbiAgICogQ3VzdG9tIGNsYXNzIHRvIGFwcGVuZCB0byB0aGUgbW9kYWwgYmFja2Ryb3BcclxuICAgKlxyXG4gICAqIEBzaW5jZSAxLjEuMFxyXG4gICAqL1xyXG4gIGJhY2tkcm9wQ2xhc3M/OiBzdHJpbmc7XHJcbn1cclxuXHJcbi8qKlxyXG4qIENvbmZpZ3VyYXRpb24gb2JqZWN0IHRva2VuIGZvciB0aGUgTmdiTW9kYWwgc2VydmljZS5cclxuKiBZb3UgY2FuIHByb3ZpZGUgdGhpcyBjb25maWd1cmF0aW9uLCB0eXBpY2FsbHkgaW4geW91ciByb290IG1vZHVsZSBpbiBvcmRlciB0byBwcm92aWRlIGRlZmF1bHQgb3B0aW9uIHZhbHVlcyBmb3IgZXZlcnlcclxuKiBtb2RhbC5cclxuKlxyXG4qIEBzaW5jZSAzLjEuMFxyXG4qL1xyXG5ASW5qZWN0YWJsZSh7cHJvdmlkZWRJbjogJ3Jvb3QnfSlcclxuZXhwb3J0IGNsYXNzIE5nYk1vZGFsQ29uZmlnIGltcGxlbWVudHMgTmdiTW9kYWxPcHRpb25zIHtcclxuICBiYWNrZHJvcDogYm9vbGVhbiB8ICdzdGF0aWMnID0gdHJ1ZTtcclxuICBrZXlib2FyZCA9IHRydWU7XHJcbn1cclxuIiwiaW1wb3J0IHtcclxuICBJbmplY3RvcixcclxuICBUZW1wbGF0ZVJlZixcclxuICBWaWV3UmVmLFxyXG4gIFZpZXdDb250YWluZXJSZWYsXHJcbiAgUmVuZGVyZXIyLFxyXG4gIENvbXBvbmVudFJlZixcclxuICBDb21wb25lbnRGYWN0b3J5UmVzb2x2ZXJcclxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuXHJcbmV4cG9ydCBjbGFzcyBDb250ZW50UmVmIHtcclxuICBjb25zdHJ1Y3RvcihwdWJsaWMgbm9kZXM6IGFueVtdLCBwdWJsaWMgdmlld1JlZj86IFZpZXdSZWYsIHB1YmxpYyBjb21wb25lbnRSZWY/OiBDb21wb25lbnRSZWY8YW55Pikge31cclxufVxyXG5cclxuZXhwb3J0IGNsYXNzIFBvcHVwU2VydmljZTxUPiB7XHJcbiAgcHJpdmF0ZSBfd2luZG93UmVmOiBDb21wb25lbnRSZWY8VD47XHJcbiAgcHJpdmF0ZSBfY29udGVudFJlZjogQ29udGVudFJlZjtcclxuXHJcbiAgY29uc3RydWN0b3IoXHJcbiAgICAgIHByaXZhdGUgX3R5cGU6IGFueSwgcHJpdmF0ZSBfaW5qZWN0b3I6IEluamVjdG9yLCBwcml2YXRlIF92aWV3Q29udGFpbmVyUmVmOiBWaWV3Q29udGFpbmVyUmVmLFxyXG4gICAgICBwcml2YXRlIF9yZW5kZXJlcjogUmVuZGVyZXIyLCBwcml2YXRlIF9jb21wb25lbnRGYWN0b3J5UmVzb2x2ZXI6IENvbXBvbmVudEZhY3RvcnlSZXNvbHZlcikge31cclxuXHJcbiAgb3Blbihjb250ZW50Pzogc3RyaW5nIHwgVGVtcGxhdGVSZWY8YW55PiwgY29udGV4dD86IGFueSk6IENvbXBvbmVudFJlZjxUPiB7XHJcbiAgICBpZiAoIXRoaXMuX3dpbmRvd1JlZikge1xyXG4gICAgICB0aGlzLl9jb250ZW50UmVmID0gdGhpcy5fZ2V0Q29udGVudFJlZihjb250ZW50LCBjb250ZXh0KTtcclxuICAgICAgdGhpcy5fd2luZG93UmVmID0gdGhpcy5fdmlld0NvbnRhaW5lclJlZi5jcmVhdGVDb21wb25lbnQoXHJcbiAgICAgICAgICB0aGlzLl9jb21wb25lbnRGYWN0b3J5UmVzb2x2ZXIucmVzb2x2ZUNvbXBvbmVudEZhY3Rvcnk8VD4odGhpcy5fdHlwZSksIDAsIHRoaXMuX2luamVjdG9yLFxyXG4gICAgICAgICAgdGhpcy5fY29udGVudFJlZi5ub2Rlcyk7XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIHRoaXMuX3dpbmRvd1JlZjtcclxuICB9XHJcblxyXG4gIGNsb3NlKCkge1xyXG4gICAgaWYgKHRoaXMuX3dpbmRvd1JlZikge1xyXG4gICAgICB0aGlzLl92aWV3Q29udGFpbmVyUmVmLnJlbW92ZSh0aGlzLl92aWV3Q29udGFpbmVyUmVmLmluZGV4T2YodGhpcy5fd2luZG93UmVmLmhvc3RWaWV3KSk7XHJcbiAgICAgIHRoaXMuX3dpbmRvd1JlZiA9IG51bGw7XHJcblxyXG4gICAgICBpZiAodGhpcy5fY29udGVudFJlZi52aWV3UmVmKSB7XHJcbiAgICAgICAgdGhpcy5fdmlld0NvbnRhaW5lclJlZi5yZW1vdmUodGhpcy5fdmlld0NvbnRhaW5lclJlZi5pbmRleE9mKHRoaXMuX2NvbnRlbnRSZWYudmlld1JlZikpO1xyXG4gICAgICAgIHRoaXMuX2NvbnRlbnRSZWYgPSBudWxsO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIF9nZXRDb250ZW50UmVmKGNvbnRlbnQ6IHN0cmluZyB8IFRlbXBsYXRlUmVmPGFueT4sIGNvbnRleHQ/OiBhbnkpOiBDb250ZW50UmVmIHtcclxuICAgIGlmICghY29udGVudCkge1xyXG4gICAgICByZXR1cm4gbmV3IENvbnRlbnRSZWYoW10pO1xyXG4gICAgfSBlbHNlIGlmIChjb250ZW50IGluc3RhbmNlb2YgVGVtcGxhdGVSZWYpIHtcclxuICAgICAgY29uc3Qgdmlld1JlZiA9IHRoaXMuX3ZpZXdDb250YWluZXJSZWYuY3JlYXRlRW1iZWRkZWRWaWV3KDxUZW1wbGF0ZVJlZjxUPj5jb250ZW50LCBjb250ZXh0KTtcclxuICAgICAgcmV0dXJuIG5ldyBDb250ZW50UmVmKFt2aWV3UmVmLnJvb3ROb2Rlc10sIHZpZXdSZWYpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgcmV0dXJuIG5ldyBDb250ZW50UmVmKFtbdGhpcy5fcmVuZGVyZXIuY3JlYXRlVGV4dChgJHtjb250ZW50fWApXV0pO1xyXG4gICAgfVxyXG4gIH1cclxufVxyXG4iLCJpbXBvcnQge0luamVjdGFibGUsIEluamVjdH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7RE9DVU1FTlR9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XHJcblxyXG5cclxuY29uc3Qgbm9vcCA9ICgpID0+IHt9O1xyXG5cclxuXHJcblxyXG4vKiogVHlwZSBmb3IgdGhlIGNhbGxiYWNrIHVzZWQgdG8gcmV2ZXJ0IHRoZSBzY3JvbGxiYXIgY29tcGVuc2F0aW9uLiAqL1xyXG5leHBvcnQgdHlwZSBDb21wZW5zYXRpb25SZXZlcnRlciA9ICgpID0+IHZvaWQ7XHJcblxyXG5cclxuXHJcbi8qKlxyXG4gKiBVdGlsaXR5IHRvIGhhbmRsZSB0aGUgc2Nyb2xsYmFyLlxyXG4gKlxyXG4gKiBJdCBhbGxvd3MgdG8gY29tcGVuc2F0ZSB0aGUgbGFjayBvZiBhIHZlcnRpY2FsIHNjcm9sbGJhciBieSBhZGRpbmcgYW5cclxuICogZXF1aXZhbGVudCBwYWRkaW5nIG9uIHRoZSByaWdodCBvZiB0aGUgYm9keSwgYW5kIHRvIHJlbW92ZSB0aGlzIGNvbXBlbnNhdGlvbi5cclxuICovXHJcbkBJbmplY3RhYmxlKHtwcm92aWRlZEluOiAncm9vdCd9KVxyXG5leHBvcnQgY2xhc3MgU2Nyb2xsQmFyIHtcclxuICBjb25zdHJ1Y3RvcihASW5qZWN0KERPQ1VNRU5UKSBwcml2YXRlIF9kb2N1bWVudDogYW55KSB7fVxyXG5cclxuICAvKipcclxuICAgKiBEZXRlY3RzIGlmIGEgc2Nyb2xsYmFyIGlzIHByZXNlbnQgYW5kIGlmIHllcywgYWxyZWFkeSBjb21wZW5zYXRlcyBmb3IgaXRzXHJcbiAgICogcmVtb3ZhbCBieSBhZGRpbmcgYW4gZXF1aXZhbGVudCBwYWRkaW5nIG9uIHRoZSByaWdodCBvZiB0aGUgYm9keS5cclxuICAgKlxyXG4gICAqIEByZXR1cm4gYSBjYWxsYmFjayB1c2VkIHRvIHJldmVydCB0aGUgY29tcGVuc2F0aW9uIChub29wIGlmIHRoZXJlIHdhcyBub25lLFxyXG4gICAqIG90aGVyd2lzZSBhIGZ1bmN0aW9uIHJlbW92aW5nIHRoZSBwYWRkaW5nKVxyXG4gICAqL1xyXG4gIGNvbXBlbnNhdGUoKTogQ29tcGVuc2F0aW9uUmV2ZXJ0ZXIgeyByZXR1cm4gIXRoaXMuX2lzUHJlc2VudCgpID8gbm9vcCA6IHRoaXMuX2FkanVzdEJvZHkodGhpcy5fZ2V0V2lkdGgoKSk7IH1cclxuXHJcbiAgLyoqXHJcbiAgICogQWRkcyBhIHBhZGRpbmcgb2YgdGhlIGdpdmVuIHdpZHRoIG9uIHRoZSByaWdodCBvZiB0aGUgYm9keS5cclxuICAgKlxyXG4gICAqIEByZXR1cm4gYSBjYWxsYmFjayB1c2VkIHRvIHJldmVydCB0aGUgcGFkZGluZyB0byBpdHMgcHJldmlvdXMgdmFsdWVcclxuICAgKi9cclxuICBwcml2YXRlIF9hZGp1c3RCb2R5KHdpZHRoOiBudW1iZXIpOiBDb21wZW5zYXRpb25SZXZlcnRlciB7XHJcbiAgICBjb25zdCBib2R5ID0gdGhpcy5fZG9jdW1lbnQuYm9keTtcclxuICAgIGNvbnN0IHVzZXJTZXRQYWRkaW5nID0gYm9keS5zdHlsZS5wYWRkaW5nUmlnaHQ7XHJcbiAgICBjb25zdCBwYWRkaW5nQW1vdW50ID0gcGFyc2VGbG9hdCh3aW5kb3cuZ2V0Q29tcHV0ZWRTdHlsZShib2R5KVsncGFkZGluZy1yaWdodCddKTtcclxuICAgIGJvZHkuc3R5bGVbJ3BhZGRpbmctcmlnaHQnXSA9IGAke3BhZGRpbmdBbW91bnQgKyB3aWR0aH1weGA7XHJcbiAgICByZXR1cm4gKCkgPT4gYm9keS5zdHlsZVsncGFkZGluZy1yaWdodCddID0gdXNlclNldFBhZGRpbmc7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBUZWxscyB3aGV0aGVyIGEgc2Nyb2xsYmFyIGlzIGN1cnJlbnRseSBwcmVzZW50IG9uIHRoZSBib2R5LlxyXG4gICAqXHJcbiAgICogQHJldHVybiB0cnVlIGlmIHNjcm9sbGJhciBpcyBwcmVzZW50LCBmYWxzZSBvdGhlcndpc2VcclxuICAgKi9cclxuICBwcml2YXRlIF9pc1ByZXNlbnQoKTogYm9vbGVhbiB7XHJcbiAgICBjb25zdCByZWN0ID0gdGhpcy5fZG9jdW1lbnQuYm9keS5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcclxuICAgIHJldHVybiByZWN0LmxlZnQgKyByZWN0LnJpZ2h0IDwgd2luZG93LmlubmVyV2lkdGg7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBDYWxjdWxhdGVzIGFuZCByZXR1cm5zIHRoZSB3aWR0aCBvZiBhIHNjcm9sbGJhci5cclxuICAgKlxyXG4gICAqIEByZXR1cm4gdGhlIHdpZHRoIG9mIGEgc2Nyb2xsYmFyIG9uIHRoaXMgcGFnZVxyXG4gICAqL1xyXG4gIHByaXZhdGUgX2dldFdpZHRoKCk6IG51bWJlciB7XHJcbiAgICBjb25zdCBtZWFzdXJlciA9IHRoaXMuX2RvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xyXG4gICAgbWVhc3VyZXIuY2xhc3NOYW1lID0gJ21vZGFsLXNjcm9sbGJhci1tZWFzdXJlJztcclxuXHJcbiAgICBjb25zdCBib2R5ID0gdGhpcy5fZG9jdW1lbnQuYm9keTtcclxuICAgIGJvZHkuYXBwZW5kQ2hpbGQobWVhc3VyZXIpO1xyXG4gICAgY29uc3Qgd2lkdGggPSBtZWFzdXJlci5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKS53aWR0aCAtIG1lYXN1cmVyLmNsaWVudFdpZHRoO1xyXG4gICAgYm9keS5yZW1vdmVDaGlsZChtZWFzdXJlcik7XHJcblxyXG4gICAgcmV0dXJuIHdpZHRoO1xyXG4gIH1cclxufVxyXG4iLCJpbXBvcnQge0NvbXBvbmVudFJlZn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcblxyXG5pbXBvcnQge05nYk1vZGFsQmFja2Ryb3B9IGZyb20gJy4vbW9kYWwtYmFja2Ryb3AnO1xyXG5pbXBvcnQge05nYk1vZGFsV2luZG93fSBmcm9tICcuL21vZGFsLXdpbmRvdyc7XHJcblxyXG5pbXBvcnQge0NvbnRlbnRSZWZ9IGZyb20gJy4uL3V0aWwvcG9wdXAnO1xyXG5cclxuLyoqXHJcbiAqIEEgcmVmZXJlbmNlIHRvIGFuIGFjdGl2ZSAoY3VycmVudGx5IG9wZW5lZCkgbW9kYWwuIEluc3RhbmNlcyBvZiB0aGlzIGNsYXNzXHJcbiAqIGNhbiBiZSBpbmplY3RlZCBpbnRvIGNvbXBvbmVudHMgcGFzc2VkIGFzIG1vZGFsIGNvbnRlbnQuXHJcbiAqL1xyXG5leHBvcnQgY2xhc3MgTmdiQWN0aXZlTW9kYWwge1xyXG4gIC8qKlxyXG4gICAqIENhbiBiZSB1c2VkIHRvIGNsb3NlIGEgbW9kYWwsIHBhc3NpbmcgYW4gb3B0aW9uYWwgcmVzdWx0LlxyXG4gICAqL1xyXG4gIGNsb3NlKHJlc3VsdD86IGFueSk6IHZvaWQge31cclxuXHJcbiAgLyoqXHJcbiAgICogQ2FuIGJlIHVzZWQgdG8gZGlzbWlzcyBhIG1vZGFsLCBwYXNzaW5nIGFuIG9wdGlvbmFsIHJlYXNvbi5cclxuICAgKi9cclxuICBkaXNtaXNzKHJlYXNvbj86IGFueSk6IHZvaWQge31cclxufVxyXG5cclxuLyoqXHJcbiAqIEEgcmVmZXJlbmNlIHRvIGEgbmV3bHkgb3BlbmVkIG1vZGFsLlxyXG4gKi9cclxuZXhwb3J0IGNsYXNzIE5nYk1vZGFsUmVmIHtcclxuICBwcml2YXRlIF9yZXNvbHZlOiAocmVzdWx0PzogYW55KSA9PiB2b2lkO1xyXG4gIHByaXZhdGUgX3JlamVjdDogKHJlYXNvbj86IGFueSkgPT4gdm9pZDtcclxuXHJcbiAgLyoqXHJcbiAgICogVGhlIGluc3RhbmNlIG9mIGNvbXBvbmVudCB1c2VkIGFzIG1vZGFsJ3MgY29udGVudC5cclxuICAgKiBVbmRlZmluZWQgd2hlbiBhIFRlbXBsYXRlUmVmIGlzIHVzZWQgYXMgbW9kYWwncyBjb250ZW50LlxyXG4gICAqL1xyXG4gIGdldCBjb21wb25lbnRJbnN0YW5jZSgpOiBhbnkge1xyXG4gICAgaWYgKHRoaXMuX2NvbnRlbnRSZWYuY29tcG9uZW50UmVmKSB7XHJcbiAgICAgIHJldHVybiB0aGlzLl9jb250ZW50UmVmLmNvbXBvbmVudFJlZi5pbnN0YW5jZTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIEEgcHJvbWlzZSB0aGF0IGlzIHJlc29sdmVkIHdoZW4gYSBtb2RhbCBpcyBjbG9zZWQgYW5kIHJlamVjdGVkIHdoZW4gYSBtb2RhbCBpcyBkaXNtaXNzZWQuXHJcbiAgICovXHJcbiAgcmVzdWx0OiBQcm9taXNlPGFueT47XHJcblxyXG4gIGNvbnN0cnVjdG9yKFxyXG4gICAgICBwcml2YXRlIF93aW5kb3dDbXB0UmVmOiBDb21wb25lbnRSZWY8TmdiTW9kYWxXaW5kb3c+LCBwcml2YXRlIF9jb250ZW50UmVmOiBDb250ZW50UmVmLFxyXG4gICAgICBwcml2YXRlIF9iYWNrZHJvcENtcHRSZWY/OiBDb21wb25lbnRSZWY8TmdiTW9kYWxCYWNrZHJvcD4sIHByaXZhdGUgX2JlZm9yZURpc21pc3M/OiBGdW5jdGlvbikge1xyXG4gICAgX3dpbmRvd0NtcHRSZWYuaW5zdGFuY2UuZGlzbWlzc0V2ZW50LnN1YnNjcmliZSgocmVhc29uOiBhbnkpID0+IHsgdGhpcy5kaXNtaXNzKHJlYXNvbik7IH0pO1xyXG5cclxuICAgIHRoaXMucmVzdWx0ID0gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xyXG4gICAgICB0aGlzLl9yZXNvbHZlID0gcmVzb2x2ZTtcclxuICAgICAgdGhpcy5fcmVqZWN0ID0gcmVqZWN0O1xyXG4gICAgfSk7XHJcbiAgICB0aGlzLnJlc3VsdC50aGVuKG51bGwsICgpID0+IHt9KTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIENhbiBiZSB1c2VkIHRvIGNsb3NlIGEgbW9kYWwsIHBhc3NpbmcgYW4gb3B0aW9uYWwgcmVzdWx0LlxyXG4gICAqL1xyXG4gIGNsb3NlKHJlc3VsdD86IGFueSk6IHZvaWQge1xyXG4gICAgaWYgKHRoaXMuX3dpbmRvd0NtcHRSZWYpIHtcclxuICAgICAgdGhpcy5fcmVzb2x2ZShyZXN1bHQpO1xyXG4gICAgICB0aGlzLl9yZW1vdmVNb2RhbEVsZW1lbnRzKCk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIF9kaXNtaXNzKHJlYXNvbj86IGFueSkge1xyXG4gICAgdGhpcy5fcmVqZWN0KHJlYXNvbik7XHJcbiAgICB0aGlzLl9yZW1vdmVNb2RhbEVsZW1lbnRzKCk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBDYW4gYmUgdXNlZCB0byBkaXNtaXNzIGEgbW9kYWwsIHBhc3NpbmcgYW4gb3B0aW9uYWwgcmVhc29uLlxyXG4gICAqL1xyXG4gIGRpc21pc3MocmVhc29uPzogYW55KTogdm9pZCB7XHJcbiAgICBpZiAodGhpcy5fd2luZG93Q21wdFJlZikge1xyXG4gICAgICBpZiAoIXRoaXMuX2JlZm9yZURpc21pc3MpIHtcclxuICAgICAgICB0aGlzLl9kaXNtaXNzKHJlYXNvbik7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgY29uc3QgZGlzbWlzcyA9IHRoaXMuX2JlZm9yZURpc21pc3MoKTtcclxuICAgICAgICBpZiAoZGlzbWlzcyAmJiBkaXNtaXNzLnRoZW4pIHtcclxuICAgICAgICAgIGRpc21pc3MudGhlbihcclxuICAgICAgICAgICAgICByZXN1bHQgPT4ge1xyXG4gICAgICAgICAgICAgICAgaWYgKHJlc3VsdCAhPT0gZmFsc2UpIHtcclxuICAgICAgICAgICAgICAgICAgdGhpcy5fZGlzbWlzcyhyZWFzb24pO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgKCkgPT4ge30pO1xyXG4gICAgICAgIH0gZWxzZSBpZiAoZGlzbWlzcyAhPT0gZmFsc2UpIHtcclxuICAgICAgICAgIHRoaXMuX2Rpc21pc3MocmVhc29uKTtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9XHJcblxyXG4gIHByaXZhdGUgX3JlbW92ZU1vZGFsRWxlbWVudHMoKSB7XHJcbiAgICBjb25zdCB3aW5kb3dOYXRpdmVFbCA9IHRoaXMuX3dpbmRvd0NtcHRSZWYubG9jYXRpb24ubmF0aXZlRWxlbWVudDtcclxuICAgIHdpbmRvd05hdGl2ZUVsLnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQod2luZG93TmF0aXZlRWwpO1xyXG4gICAgdGhpcy5fd2luZG93Q21wdFJlZi5kZXN0cm95KCk7XHJcblxyXG4gICAgaWYgKHRoaXMuX2JhY2tkcm9wQ21wdFJlZikge1xyXG4gICAgICBjb25zdCBiYWNrZHJvcE5hdGl2ZUVsID0gdGhpcy5fYmFja2Ryb3BDbXB0UmVmLmxvY2F0aW9uLm5hdGl2ZUVsZW1lbnQ7XHJcbiAgICAgIGJhY2tkcm9wTmF0aXZlRWwucGFyZW50Tm9kZS5yZW1vdmVDaGlsZChiYWNrZHJvcE5hdGl2ZUVsKTtcclxuICAgICAgdGhpcy5fYmFja2Ryb3BDbXB0UmVmLmRlc3Ryb3koKTtcclxuICAgIH1cclxuXHJcbiAgICBpZiAodGhpcy5fY29udGVudFJlZiAmJiB0aGlzLl9jb250ZW50UmVmLnZpZXdSZWYpIHtcclxuICAgICAgdGhpcy5fY29udGVudFJlZi52aWV3UmVmLmRlc3Ryb3koKTtcclxuICAgIH1cclxuXHJcbiAgICB0aGlzLl93aW5kb3dDbXB0UmVmID0gbnVsbDtcclxuICAgIHRoaXMuX2JhY2tkcm9wQ21wdFJlZiA9IG51bGw7XHJcbiAgICB0aGlzLl9jb250ZW50UmVmID0gbnVsbDtcclxuICB9XHJcbn1cclxuIiwiaW1wb3J0IHtET0NVTUVOVH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcclxuaW1wb3J0IHtcclxuICBBcHBsaWNhdGlvblJlZixcclxuICBDb21wb25lbnRGYWN0b3J5UmVzb2x2ZXIsXHJcbiAgQ29tcG9uZW50UmVmLFxyXG4gIEluamVjdCxcclxuICBJbmplY3RhYmxlLFxyXG4gIEluamVjdG9yLFxyXG4gIFJlbmRlcmVyRmFjdG9yeTIsXHJcbiAgVGVtcGxhdGVSZWYsXHJcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7U3ViamVjdH0gZnJvbSAncnhqcyc7XHJcblxyXG5pbXBvcnQge25nYkZvY3VzVHJhcH0gZnJvbSAnLi4vdXRpbC9mb2N1cy10cmFwJztcclxuaW1wb3J0IHtDb250ZW50UmVmfSBmcm9tICcuLi91dGlsL3BvcHVwJztcclxuaW1wb3J0IHtTY3JvbGxCYXJ9IGZyb20gJy4uL3V0aWwvc2Nyb2xsYmFyJztcclxuaW1wb3J0IHtpc0RlZmluZWQsIGlzU3RyaW5nfSBmcm9tICcuLi91dGlsL3V0aWwnO1xyXG5pbXBvcnQge05nYk1vZGFsQmFja2Ryb3B9IGZyb20gJy4vbW9kYWwtYmFja2Ryb3AnO1xyXG5pbXBvcnQge05nYkFjdGl2ZU1vZGFsLCBOZ2JNb2RhbFJlZn0gZnJvbSAnLi9tb2RhbC1yZWYnO1xyXG5pbXBvcnQge05nYk1vZGFsV2luZG93fSBmcm9tICcuL21vZGFsLXdpbmRvdyc7XHJcblxyXG5ASW5qZWN0YWJsZSh7cHJvdmlkZWRJbjogJ3Jvb3QnfSlcclxuZXhwb3J0IGNsYXNzIE5nYk1vZGFsU3RhY2sge1xyXG4gIHByaXZhdGUgX3dpbmRvd0F0dHJpYnV0ZXMgPSBbJ2FyaWFMYWJlbGxlZEJ5JywgJ2JhY2tkcm9wJywgJ2NlbnRlcmVkJywgJ2tleWJvYXJkJywgJ3NpemUnLCAnd2luZG93Q2xhc3MnXTtcclxuICBwcml2YXRlIF9iYWNrZHJvcEF0dHJpYnV0ZXMgPSBbJ2JhY2tkcm9wQ2xhc3MnXTtcclxuICBwcml2YXRlIF9tb2RhbFJlZnM6IE5nYk1vZGFsUmVmW10gPSBbXTtcclxuICBwcml2YXRlIF93aW5kb3dDbXB0czogQ29tcG9uZW50UmVmPE5nYk1vZGFsV2luZG93PltdID0gW107XHJcbiAgcHJpdmF0ZSBfYWN0aXZlV2luZG93Q21wdEhhc0NoYW5nZWQgPSBuZXcgU3ViamVjdCgpO1xyXG5cclxuICBjb25zdHJ1Y3RvcihcclxuICAgICAgcHJpdmF0ZSBfYXBwbGljYXRpb25SZWY6IEFwcGxpY2F0aW9uUmVmLCBwcml2YXRlIF9pbmplY3RvcjogSW5qZWN0b3IsIEBJbmplY3QoRE9DVU1FTlQpIHByaXZhdGUgX2RvY3VtZW50OiBhbnksXHJcbiAgICAgIHByaXZhdGUgX3Njcm9sbEJhcjogU2Nyb2xsQmFyLCBwcml2YXRlIF9yZW5kZXJlckZhY3Rvcnk6IFJlbmRlcmVyRmFjdG9yeTIpIHtcclxuICAgIC8vIFRyYXAgZm9jdXMgb24gYWN0aXZlIFdpbmRvd0NtcHRcclxuICAgIHRoaXMuX2FjdGl2ZVdpbmRvd0NtcHRIYXNDaGFuZ2VkLnN1YnNjcmliZSgoKSA9PiB7XHJcbiAgICAgIGlmICh0aGlzLl93aW5kb3dDbXB0cy5sZW5ndGgpIHtcclxuICAgICAgICBjb25zdCBhY3RpdmVXaW5kb3dDbXB0ID0gdGhpcy5fd2luZG93Q21wdHNbdGhpcy5fd2luZG93Q21wdHMubGVuZ3RoIC0gMV07XHJcbiAgICAgICAgbmdiRm9jdXNUcmFwKGFjdGl2ZVdpbmRvd0NtcHQubG9jYXRpb24ubmF0aXZlRWxlbWVudCwgdGhpcy5fYWN0aXZlV2luZG93Q21wdEhhc0NoYW5nZWQpO1xyXG4gICAgICB9XHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIG9wZW4obW9kdWxlQ0ZSOiBDb21wb25lbnRGYWN0b3J5UmVzb2x2ZXIsIGNvbnRlbnRJbmplY3RvcjogSW5qZWN0b3IsIGNvbnRlbnQ6IGFueSwgb3B0aW9ucyk6IE5nYk1vZGFsUmVmIHtcclxuICAgIGNvbnN0IGNvbnRhaW5lckVsID1cclxuICAgICAgICBpc0RlZmluZWQob3B0aW9ucy5jb250YWluZXIpID8gdGhpcy5fZG9jdW1lbnQucXVlcnlTZWxlY3RvcihvcHRpb25zLmNvbnRhaW5lcikgOiB0aGlzLl9kb2N1bWVudC5ib2R5O1xyXG4gICAgY29uc3QgcmVuZGVyZXIgPSB0aGlzLl9yZW5kZXJlckZhY3RvcnkuY3JlYXRlUmVuZGVyZXIobnVsbCwgbnVsbCk7XHJcblxyXG4gICAgY29uc3QgcmV2ZXJ0UGFkZGluZ0ZvclNjcm9sbEJhciA9IHRoaXMuX3Njcm9sbEJhci5jb21wZW5zYXRlKCk7XHJcbiAgICBjb25zdCByZW1vdmVCb2R5Q2xhc3MgPSAoKSA9PiB7XHJcbiAgICAgIGlmICghdGhpcy5fbW9kYWxSZWZzLmxlbmd0aCkge1xyXG4gICAgICAgIHJlbmRlcmVyLnJlbW92ZUNsYXNzKHRoaXMuX2RvY3VtZW50LmJvZHksICdtb2RhbC1vcGVuJyk7XHJcbiAgICAgIH1cclxuICAgIH07XHJcblxyXG4gICAgaWYgKCFjb250YWluZXJFbCkge1xyXG4gICAgICB0aHJvdyBuZXcgRXJyb3IoYFRoZSBzcGVjaWZpZWQgbW9kYWwgY29udGFpbmVyIFwiJHtvcHRpb25zLmNvbnRhaW5lciB8fCAnYm9keSd9XCIgd2FzIG5vdCBmb3VuZCBpbiB0aGUgRE9NLmApO1xyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0IGFjdGl2ZU1vZGFsID0gbmV3IE5nYkFjdGl2ZU1vZGFsKCk7XHJcbiAgICBjb25zdCBjb250ZW50UmVmID0gdGhpcy5fZ2V0Q29udGVudFJlZihtb2R1bGVDRlIsIG9wdGlvbnMuaW5qZWN0b3IgfHwgY29udGVudEluamVjdG9yLCBjb250ZW50LCBhY3RpdmVNb2RhbCk7XHJcblxyXG4gICAgbGV0IGJhY2tkcm9wQ21wdFJlZjogQ29tcG9uZW50UmVmPE5nYk1vZGFsQmFja2Ryb3A+ID1cclxuICAgICAgICBvcHRpb25zLmJhY2tkcm9wICE9PSBmYWxzZSA/IHRoaXMuX2F0dGFjaEJhY2tkcm9wKG1vZHVsZUNGUiwgY29udGFpbmVyRWwpIDogbnVsbDtcclxuICAgIGxldCB3aW5kb3dDbXB0UmVmOiBDb21wb25lbnRSZWY8TmdiTW9kYWxXaW5kb3c+ID0gdGhpcy5fYXR0YWNoV2luZG93Q29tcG9uZW50KG1vZHVsZUNGUiwgY29udGFpbmVyRWwsIGNvbnRlbnRSZWYpO1xyXG4gICAgbGV0IG5nYk1vZGFsUmVmOiBOZ2JNb2RhbFJlZiA9IG5ldyBOZ2JNb2RhbFJlZih3aW5kb3dDbXB0UmVmLCBjb250ZW50UmVmLCBiYWNrZHJvcENtcHRSZWYsIG9wdGlvbnMuYmVmb3JlRGlzbWlzcyk7XHJcblxyXG4gICAgdGhpcy5fcmVnaXN0ZXJNb2RhbFJlZihuZ2JNb2RhbFJlZik7XHJcbiAgICB0aGlzLl9yZWdpc3RlcldpbmRvd0NtcHQod2luZG93Q21wdFJlZik7XHJcbiAgICBuZ2JNb2RhbFJlZi5yZXN1bHQudGhlbihyZXZlcnRQYWRkaW5nRm9yU2Nyb2xsQmFyLCByZXZlcnRQYWRkaW5nRm9yU2Nyb2xsQmFyKTtcclxuICAgIG5nYk1vZGFsUmVmLnJlc3VsdC50aGVuKHJlbW92ZUJvZHlDbGFzcywgcmVtb3ZlQm9keUNsYXNzKTtcclxuICAgIGFjdGl2ZU1vZGFsLmNsb3NlID0gKHJlc3VsdDogYW55KSA9PiB7IG5nYk1vZGFsUmVmLmNsb3NlKHJlc3VsdCk7IH07XHJcbiAgICBhY3RpdmVNb2RhbC5kaXNtaXNzID0gKHJlYXNvbjogYW55KSA9PiB7IG5nYk1vZGFsUmVmLmRpc21pc3MocmVhc29uKTsgfTtcclxuXHJcbiAgICB0aGlzLl9hcHBseVdpbmRvd09wdGlvbnMod2luZG93Q21wdFJlZi5pbnN0YW5jZSwgb3B0aW9ucyk7XHJcbiAgICBpZiAodGhpcy5fbW9kYWxSZWZzLmxlbmd0aCA9PT0gMSkge1xyXG4gICAgICByZW5kZXJlci5hZGRDbGFzcyh0aGlzLl9kb2N1bWVudC5ib2R5LCAnbW9kYWwtb3BlbicpO1xyXG4gICAgfVxyXG5cclxuICAgIGlmIChiYWNrZHJvcENtcHRSZWYgJiYgYmFja2Ryb3BDbXB0UmVmLmluc3RhbmNlKSB7XHJcbiAgICAgIHRoaXMuX2FwcGx5QmFja2Ryb3BPcHRpb25zKGJhY2tkcm9wQ21wdFJlZi5pbnN0YW5jZSwgb3B0aW9ucyk7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gbmdiTW9kYWxSZWY7XHJcbiAgfVxyXG5cclxuICBkaXNtaXNzQWxsKHJlYXNvbj86IGFueSkgeyB0aGlzLl9tb2RhbFJlZnMuZm9yRWFjaChuZ2JNb2RhbFJlZiA9PiBuZ2JNb2RhbFJlZi5kaXNtaXNzKHJlYXNvbikpOyB9XHJcblxyXG4gIHByaXZhdGUgX2F0dGFjaEJhY2tkcm9wKG1vZHVsZUNGUjogQ29tcG9uZW50RmFjdG9yeVJlc29sdmVyLCBjb250YWluZXJFbDogYW55KTogQ29tcG9uZW50UmVmPE5nYk1vZGFsQmFja2Ryb3A+IHtcclxuICAgIGxldCBiYWNrZHJvcEZhY3RvcnkgPSBtb2R1bGVDRlIucmVzb2x2ZUNvbXBvbmVudEZhY3RvcnkoTmdiTW9kYWxCYWNrZHJvcCk7XHJcbiAgICBsZXQgYmFja2Ryb3BDbXB0UmVmID0gYmFja2Ryb3BGYWN0b3J5LmNyZWF0ZSh0aGlzLl9pbmplY3Rvcik7XHJcbiAgICB0aGlzLl9hcHBsaWNhdGlvblJlZi5hdHRhY2hWaWV3KGJhY2tkcm9wQ21wdFJlZi5ob3N0Vmlldyk7XHJcbiAgICBjb250YWluZXJFbC5hcHBlbmRDaGlsZChiYWNrZHJvcENtcHRSZWYubG9jYXRpb24ubmF0aXZlRWxlbWVudCk7XHJcbiAgICByZXR1cm4gYmFja2Ryb3BDbXB0UmVmO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBfYXR0YWNoV2luZG93Q29tcG9uZW50KG1vZHVsZUNGUjogQ29tcG9uZW50RmFjdG9yeVJlc29sdmVyLCBjb250YWluZXJFbDogYW55LCBjb250ZW50UmVmOiBhbnkpOlxyXG4gICAgICBDb21wb25lbnRSZWY8TmdiTW9kYWxXaW5kb3c+IHtcclxuICAgIGxldCB3aW5kb3dGYWN0b3J5ID0gbW9kdWxlQ0ZSLnJlc29sdmVDb21wb25lbnRGYWN0b3J5KE5nYk1vZGFsV2luZG93KTtcclxuICAgIGxldCB3aW5kb3dDbXB0UmVmID0gd2luZG93RmFjdG9yeS5jcmVhdGUodGhpcy5faW5qZWN0b3IsIGNvbnRlbnRSZWYubm9kZXMpO1xyXG4gICAgdGhpcy5fYXBwbGljYXRpb25SZWYuYXR0YWNoVmlldyh3aW5kb3dDbXB0UmVmLmhvc3RWaWV3KTtcclxuICAgIGNvbnRhaW5lckVsLmFwcGVuZENoaWxkKHdpbmRvd0NtcHRSZWYubG9jYXRpb24ubmF0aXZlRWxlbWVudCk7XHJcbiAgICByZXR1cm4gd2luZG93Q21wdFJlZjtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgX2FwcGx5V2luZG93T3B0aW9ucyh3aW5kb3dJbnN0YW5jZTogTmdiTW9kYWxXaW5kb3csIG9wdGlvbnM6IE9iamVjdCk6IHZvaWQge1xyXG4gICAgdGhpcy5fd2luZG93QXR0cmlidXRlcy5mb3JFYWNoKChvcHRpb25OYW1lOiBzdHJpbmcpID0+IHtcclxuICAgICAgaWYgKGlzRGVmaW5lZChvcHRpb25zW29wdGlvbk5hbWVdKSkge1xyXG4gICAgICAgIHdpbmRvd0luc3RhbmNlW29wdGlvbk5hbWVdID0gb3B0aW9uc1tvcHRpb25OYW1lXTtcclxuICAgICAgfVxyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIF9hcHBseUJhY2tkcm9wT3B0aW9ucyhiYWNrZHJvcEluc3RhbmNlOiBOZ2JNb2RhbEJhY2tkcm9wLCBvcHRpb25zOiBPYmplY3QpOiB2b2lkIHtcclxuICAgIHRoaXMuX2JhY2tkcm9wQXR0cmlidXRlcy5mb3JFYWNoKChvcHRpb25OYW1lOiBzdHJpbmcpID0+IHtcclxuICAgICAgaWYgKGlzRGVmaW5lZChvcHRpb25zW29wdGlvbk5hbWVdKSkge1xyXG4gICAgICAgIGJhY2tkcm9wSW5zdGFuY2Vbb3B0aW9uTmFtZV0gPSBvcHRpb25zW29wdGlvbk5hbWVdO1xyXG4gICAgICB9XHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgX2dldENvbnRlbnRSZWYoXHJcbiAgICAgIG1vZHVsZUNGUjogQ29tcG9uZW50RmFjdG9yeVJlc29sdmVyLCBjb250ZW50SW5qZWN0b3I6IEluamVjdG9yLCBjb250ZW50OiBhbnksXHJcbiAgICAgIGFjdGl2ZU1vZGFsOiBOZ2JBY3RpdmVNb2RhbCk6IENvbnRlbnRSZWYge1xyXG4gICAgaWYgKCFjb250ZW50KSB7XHJcbiAgICAgIHJldHVybiBuZXcgQ29udGVudFJlZihbXSk7XHJcbiAgICB9IGVsc2UgaWYgKGNvbnRlbnQgaW5zdGFuY2VvZiBUZW1wbGF0ZVJlZikge1xyXG4gICAgICByZXR1cm4gdGhpcy5fY3JlYXRlRnJvbVRlbXBsYXRlUmVmKGNvbnRlbnQsIGFjdGl2ZU1vZGFsKTtcclxuICAgIH0gZWxzZSBpZiAoaXNTdHJpbmcoY29udGVudCkpIHtcclxuICAgICAgcmV0dXJuIHRoaXMuX2NyZWF0ZUZyb21TdHJpbmcoY29udGVudCk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICByZXR1cm4gdGhpcy5fY3JlYXRlRnJvbUNvbXBvbmVudChtb2R1bGVDRlIsIGNvbnRlbnRJbmplY3RvciwgY29udGVudCwgYWN0aXZlTW9kYWwpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBfY3JlYXRlRnJvbVRlbXBsYXRlUmVmKGNvbnRlbnQ6IFRlbXBsYXRlUmVmPGFueT4sIGFjdGl2ZU1vZGFsOiBOZ2JBY3RpdmVNb2RhbCk6IENvbnRlbnRSZWYge1xyXG4gICAgY29uc3QgY29udGV4dCA9IHtcclxuICAgICAgJGltcGxpY2l0OiBhY3RpdmVNb2RhbCxcclxuICAgICAgY2xvc2UocmVzdWx0KSB7IGFjdGl2ZU1vZGFsLmNsb3NlKHJlc3VsdCk7IH0sXHJcbiAgICAgIGRpc21pc3MocmVhc29uKSB7IGFjdGl2ZU1vZGFsLmRpc21pc3MocmVhc29uKTsgfVxyXG4gICAgfTtcclxuICAgIGNvbnN0IHZpZXdSZWYgPSBjb250ZW50LmNyZWF0ZUVtYmVkZGVkVmlldyhjb250ZXh0KTtcclxuICAgIHRoaXMuX2FwcGxpY2F0aW9uUmVmLmF0dGFjaFZpZXcodmlld1JlZik7XHJcbiAgICByZXR1cm4gbmV3IENvbnRlbnRSZWYoW3ZpZXdSZWYucm9vdE5vZGVzXSwgdmlld1JlZik7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIF9jcmVhdGVGcm9tU3RyaW5nKGNvbnRlbnQ6IHN0cmluZyk6IENvbnRlbnRSZWYge1xyXG4gICAgY29uc3QgY29tcG9uZW50ID0gdGhpcy5fZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUoYCR7Y29udGVudH1gKTtcclxuICAgIHJldHVybiBuZXcgQ29udGVudFJlZihbW2NvbXBvbmVudF1dKTtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgX2NyZWF0ZUZyb21Db21wb25lbnQoXHJcbiAgICAgIG1vZHVsZUNGUjogQ29tcG9uZW50RmFjdG9yeVJlc29sdmVyLCBjb250ZW50SW5qZWN0b3I6IEluamVjdG9yLCBjb250ZW50OiBhbnksXHJcbiAgICAgIGNvbnRleHQ6IE5nYkFjdGl2ZU1vZGFsKTogQ29udGVudFJlZiB7XHJcbiAgICBjb25zdCBjb250ZW50Q21wdEZhY3RvcnkgPSBtb2R1bGVDRlIucmVzb2x2ZUNvbXBvbmVudEZhY3RvcnkoY29udGVudCk7XHJcbiAgICBjb25zdCBtb2RhbENvbnRlbnRJbmplY3RvciA9XHJcbiAgICAgICAgSW5qZWN0b3IuY3JlYXRlKHtwcm92aWRlcnM6IFt7cHJvdmlkZTogTmdiQWN0aXZlTW9kYWwsIHVzZVZhbHVlOiBjb250ZXh0fV0sIHBhcmVudDogY29udGVudEluamVjdG9yfSk7XHJcbiAgICBjb25zdCBjb21wb25lbnRSZWYgPSBjb250ZW50Q21wdEZhY3RvcnkuY3JlYXRlKG1vZGFsQ29udGVudEluamVjdG9yKTtcclxuICAgIHRoaXMuX2FwcGxpY2F0aW9uUmVmLmF0dGFjaFZpZXcoY29tcG9uZW50UmVmLmhvc3RWaWV3KTtcclxuICAgIHJldHVybiBuZXcgQ29udGVudFJlZihbW2NvbXBvbmVudFJlZi5sb2NhdGlvbi5uYXRpdmVFbGVtZW50XV0sIGNvbXBvbmVudFJlZi5ob3N0VmlldywgY29tcG9uZW50UmVmKTtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgX3JlZ2lzdGVyTW9kYWxSZWYobmdiTW9kYWxSZWY6IE5nYk1vZGFsUmVmKSB7XHJcbiAgICBjb25zdCB1bnJlZ2lzdGVyTW9kYWxSZWYgPSAoKSA9PiB7XHJcbiAgICAgIGNvbnN0IGluZGV4ID0gdGhpcy5fbW9kYWxSZWZzLmluZGV4T2YobmdiTW9kYWxSZWYpO1xyXG4gICAgICBpZiAoaW5kZXggPiAtMSkge1xyXG4gICAgICAgIHRoaXMuX21vZGFsUmVmcy5zcGxpY2UoaW5kZXgsIDEpO1xyXG4gICAgICB9XHJcbiAgICB9O1xyXG4gICAgdGhpcy5fbW9kYWxSZWZzLnB1c2gobmdiTW9kYWxSZWYpO1xyXG4gICAgbmdiTW9kYWxSZWYucmVzdWx0LnRoZW4odW5yZWdpc3Rlck1vZGFsUmVmLCB1bnJlZ2lzdGVyTW9kYWxSZWYpO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBfcmVnaXN0ZXJXaW5kb3dDbXB0KG5nYldpbmRvd0NtcHQ6IENvbXBvbmVudFJlZjxOZ2JNb2RhbFdpbmRvdz4pIHtcclxuICAgIHRoaXMuX3dpbmRvd0NtcHRzLnB1c2gobmdiV2luZG93Q21wdCk7XHJcbiAgICB0aGlzLl9hY3RpdmVXaW5kb3dDbXB0SGFzQ2hhbmdlZC5uZXh0KCk7XHJcblxyXG4gICAgbmdiV2luZG93Q21wdC5vbkRlc3Ryb3koKCkgPT4ge1xyXG4gICAgICBjb25zdCBpbmRleCA9IHRoaXMuX3dpbmRvd0NtcHRzLmluZGV4T2YobmdiV2luZG93Q21wdCk7XHJcbiAgICAgIGlmIChpbmRleCA+IC0xKSB7XHJcbiAgICAgICAgdGhpcy5fd2luZG93Q21wdHMuc3BsaWNlKGluZGV4LCAxKTtcclxuICAgICAgICB0aGlzLl9hY3RpdmVXaW5kb3dDbXB0SGFzQ2hhbmdlZC5uZXh0KCk7XHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG4gIH1cclxufVxyXG4iLCJpbXBvcnQge0luamVjdGFibGUsIEluamVjdG9yLCBDb21wb25lbnRGYWN0b3J5UmVzb2x2ZXJ9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5cclxuaW1wb3J0IHtOZ2JNb2RhbE9wdGlvbnMsIE5nYk1vZGFsQ29uZmlnfSBmcm9tICcuL21vZGFsLWNvbmZpZyc7XHJcbmltcG9ydCB7TmdiTW9kYWxSZWZ9IGZyb20gJy4vbW9kYWwtcmVmJztcclxuaW1wb3J0IHtOZ2JNb2RhbFN0YWNrfSBmcm9tICcuL21vZGFsLXN0YWNrJztcclxuXHJcbi8qKlxyXG4gKiBBIHNlcnZpY2UgdG8gb3BlbiBtb2RhbCB3aW5kb3dzLiBDcmVhdGluZyBhIG1vZGFsIGlzIHN0cmFpZ2h0Zm9yd2FyZDogY3JlYXRlIGEgdGVtcGxhdGUgYW5kIHBhc3MgaXQgYXMgYW4gYXJndW1lbnQgdG9cclxuICogdGhlIFwib3BlblwiIG1ldGhvZCFcclxuICovXHJcbkBJbmplY3RhYmxlKHtwcm92aWRlZEluOiAncm9vdCd9KVxyXG5leHBvcnQgY2xhc3MgTmdiTW9kYWwge1xyXG4gIGNvbnN0cnVjdG9yKFxyXG4gICAgICBwcml2YXRlIF9tb2R1bGVDRlI6IENvbXBvbmVudEZhY3RvcnlSZXNvbHZlciwgcHJpdmF0ZSBfaW5qZWN0b3I6IEluamVjdG9yLCBwcml2YXRlIF9tb2RhbFN0YWNrOiBOZ2JNb2RhbFN0YWNrLFxyXG4gICAgICBwcml2YXRlIF9jb25maWc6IE5nYk1vZGFsQ29uZmlnKSB7fVxyXG5cclxuICAvKipcclxuICAgKiBPcGVucyBhIG5ldyBtb2RhbCB3aW5kb3cgd2l0aCB0aGUgc3BlY2lmaWVkIGNvbnRlbnQgYW5kIHVzaW5nIHN1cHBsaWVkIG9wdGlvbnMuIENvbnRlbnQgY2FuIGJlIHByb3ZpZGVkXHJcbiAgICogYXMgYSBUZW1wbGF0ZVJlZiBvciBhIGNvbXBvbmVudCB0eXBlLiBJZiB5b3UgcGFzcyBhIGNvbXBvbmVudCB0eXBlIGFzIGNvbnRlbnQgdGhhbiBpbnN0YW5jZXMgb2YgdGhvc2VcclxuICAgKiBjb21wb25lbnRzIGNhbiBiZSBpbmplY3RlZCB3aXRoIGFuIGluc3RhbmNlIG9mIHRoZSBOZ2JBY3RpdmVNb2RhbCBjbGFzcy4gWW91IGNhbiB1c2UgbWV0aG9kcyBvbiB0aGVcclxuICAgKiBOZ2JBY3RpdmVNb2RhbCBjbGFzcyB0byBjbG9zZSAvIGRpc21pc3MgbW9kYWxzIGZyb20gXCJpbnNpZGVcIiBvZiBhIGNvbXBvbmVudC5cclxuICAgKi9cclxuICBvcGVuKGNvbnRlbnQ6IGFueSwgb3B0aW9uczogTmdiTW9kYWxPcHRpb25zID0ge30pOiBOZ2JNb2RhbFJlZiB7XHJcbiAgICBjb25zdCBjb21iaW5lZE9wdGlvbnMgPSBPYmplY3QuYXNzaWduKHt9LCB0aGlzLl9jb25maWcsIG9wdGlvbnMpO1xyXG4gICAgcmV0dXJuIHRoaXMuX21vZGFsU3RhY2sub3Blbih0aGlzLl9tb2R1bGVDRlIsIHRoaXMuX2luamVjdG9yLCBjb250ZW50LCBjb21iaW5lZE9wdGlvbnMpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogRGlzbWlzcyBhbGwgY3VycmVudGx5IGRpc3BsYXllZCBtb2RhbCB3aW5kb3dzIHdpdGggdGhlIHN1cHBsaWVkIHJlYXNvbi5cclxuICAgKlxyXG4gICAqIEBzaW5jZSAzLjEuMFxyXG4gICAqL1xyXG4gIGRpc21pc3NBbGwocmVhc29uPzogYW55KSB7IHRoaXMuX21vZGFsU3RhY2suZGlzbWlzc0FsbChyZWFzb24pOyB9XHJcbn1cclxuIiwiaW1wb3J0IHtOZ01vZHVsZSwgTW9kdWxlV2l0aFByb3ZpZGVyc30gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcblxyXG5pbXBvcnQge05nYk1vZGFsQmFja2Ryb3B9IGZyb20gJy4vbW9kYWwtYmFja2Ryb3AnO1xyXG5pbXBvcnQge05nYk1vZGFsV2luZG93fSBmcm9tICcuL21vZGFsLXdpbmRvdyc7XHJcbmltcG9ydCB7TmdiTW9kYWx9IGZyb20gJy4vbW9kYWwnO1xyXG5cclxuZXhwb3J0IHtOZ2JNb2RhbH0gZnJvbSAnLi9tb2RhbCc7XHJcbmV4cG9ydCB7TmdiTW9kYWxDb25maWcsIE5nYk1vZGFsT3B0aW9uc30gZnJvbSAnLi9tb2RhbC1jb25maWcnO1xyXG5leHBvcnQge05nYk1vZGFsUmVmLCBOZ2JBY3RpdmVNb2RhbH0gZnJvbSAnLi9tb2RhbC1yZWYnO1xyXG5leHBvcnQge01vZGFsRGlzbWlzc1JlYXNvbnN9IGZyb20gJy4vbW9kYWwtZGlzbWlzcy1yZWFzb25zJztcclxuXHJcbkBOZ01vZHVsZSh7XHJcbiAgZGVjbGFyYXRpb25zOiBbTmdiTW9kYWxCYWNrZHJvcCwgTmdiTW9kYWxXaW5kb3ddLFxyXG4gIGVudHJ5Q29tcG9uZW50czogW05nYk1vZGFsQmFja2Ryb3AsIE5nYk1vZGFsV2luZG93XSxcclxuICBwcm92aWRlcnM6IFtOZ2JNb2RhbF1cclxufSlcclxuZXhwb3J0IGNsYXNzIE5nYk1vZGFsTW9kdWxlIHtcclxuICAvKipcclxuICAgKiBJbXBvcnRpbmcgd2l0aCAnLmZvclJvb3QoKScgaXMgbm8gbG9uZ2VyIG5lY2Vzc2FyeSwgeW91IGNhbiBzaW1wbHkgaW1wb3J0IHRoZSBtb2R1bGUuXHJcbiAgICogV2lsbCBiZSByZW1vdmVkIGluIDQuMC4wLlxyXG4gICAqXHJcbiAgICogQGRlcHJlY2F0ZWQgMy4wLjBcclxuICAgKi9cclxuICBzdGF0aWMgZm9yUm9vdCgpOiBNb2R1bGVXaXRoUHJvdmlkZXJzIHsgcmV0dXJuIHtuZ01vZHVsZTogTmdiTW9kYWxNb2R1bGV9OyB9XHJcbn1cclxuIiwiaW1wb3J0IHtJbmplY3RhYmxlfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuXHJcbi8qKlxyXG4gKiBDb25maWd1cmF0aW9uIHNlcnZpY2UgZm9yIHRoZSBOZ2JQYWdpbmF0aW9uIGNvbXBvbmVudC5cclxuICogWW91IGNhbiBpbmplY3QgdGhpcyBzZXJ2aWNlLCB0eXBpY2FsbHkgaW4geW91ciByb290IGNvbXBvbmVudCwgYW5kIGN1c3RvbWl6ZSB0aGUgdmFsdWVzIG9mIGl0cyBwcm9wZXJ0aWVzIGluXHJcbiAqIG9yZGVyIHRvIHByb3ZpZGUgZGVmYXVsdCB2YWx1ZXMgZm9yIGFsbCB0aGUgcGFnaW5hdGlvbnMgdXNlZCBpbiB0aGUgYXBwbGljYXRpb24uXHJcbiAqL1xyXG5ASW5qZWN0YWJsZSh7cHJvdmlkZWRJbjogJ3Jvb3QnfSlcclxuZXhwb3J0IGNsYXNzIE5nYlBhZ2luYXRpb25Db25maWcge1xyXG4gIGRpc2FibGVkID0gZmFsc2U7XHJcbiAgYm91bmRhcnlMaW5rcyA9IGZhbHNlO1xyXG4gIGRpcmVjdGlvbkxpbmtzID0gdHJ1ZTtcclxuICBlbGxpcHNlcyA9IHRydWU7XHJcbiAgbWF4U2l6ZSA9IDA7XHJcbiAgcGFnZVNpemUgPSAxMDtcclxuICByb3RhdGUgPSBmYWxzZTtcclxuICBzaXplOiAnc20nIHwgJ2xnJztcclxufVxyXG4iLCJpbXBvcnQge0NvbXBvbmVudCwgRXZlbnRFbWl0dGVyLCBJbnB1dCwgT3V0cHV0LCBPbkNoYW5nZXMsIENoYW5nZURldGVjdGlvblN0cmF0ZWd5LCBTaW1wbGVDaGFuZ2VzfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHtnZXRWYWx1ZUluUmFuZ2UsIGlzTnVtYmVyfSBmcm9tICcuLi91dGlsL3V0aWwnO1xyXG5pbXBvcnQge05nYlBhZ2luYXRpb25Db25maWd9IGZyb20gJy4vcGFnaW5hdGlvbi1jb25maWcnO1xyXG5cclxuLyoqXHJcbiAqIEEgZGlyZWN0aXZlIHRoYXQgd2lsbCB0YWtlIGNhcmUgb2YgdmlzdWFsaXNpbmcgYSBwYWdpbmF0aW9uIGJhciBhbmQgZW5hYmxlIC8gZGlzYWJsZSBidXR0b25zIGNvcnJlY3RseSFcclxuICovXHJcbkBDb21wb25lbnQoe1xyXG4gIHNlbGVjdG9yOiAnbmdiLXBhZ2luYXRpb24nLFxyXG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoLFxyXG4gIGhvc3Q6IHsncm9sZSc6ICduYXZpZ2F0aW9uJ30sXHJcbiAgdGVtcGxhdGU6IGBcclxuICAgIDx1bCBbY2xhc3NdPVwiJ3BhZ2luYXRpb24nICsgKHNpemUgPyAnIHBhZ2luYXRpb24tJyArIHNpemUgOiAnJylcIj5cclxuICAgICAgPGxpICpuZ0lmPVwiYm91bmRhcnlMaW5rc1wiIGNsYXNzPVwicGFnZS1pdGVtXCJcclxuICAgICAgICBbY2xhc3MuZGlzYWJsZWRdPVwiIWhhc1ByZXZpb3VzKCkgfHwgZGlzYWJsZWRcIj5cclxuICAgICAgICA8YSBhcmlhLWxhYmVsPVwiRmlyc3RcIiBpMThuLWFyaWEtbGFiZWw9XCJAQG5nYi5wYWdpbmF0aW9uLmZpcnN0LWFyaWFcIiBjbGFzcz1cInBhZ2UtbGlua1wiIGhyZWZcclxuICAgICAgICAgIChjbGljayk9XCIhIXNlbGVjdFBhZ2UoMSlcIiBbYXR0ci50YWJpbmRleF09XCIoaGFzUHJldmlvdXMoKSA/IG51bGwgOiAnLTEnKVwiPlxyXG4gICAgICAgICAgPHNwYW4gYXJpYS1oaWRkZW49XCJ0cnVlXCIgaTE4bj1cIkBAbmdiLnBhZ2luYXRpb24uZmlyc3RcIj4mbGFxdW87JmxhcXVvOzwvc3Bhbj5cclxuICAgICAgICA8L2E+XHJcbiAgICAgIDwvbGk+XHJcblxyXG4gICAgICA8bGkgKm5nSWY9XCJkaXJlY3Rpb25MaW5rc1wiIGNsYXNzPVwicGFnZS1pdGVtXCJcclxuICAgICAgICBbY2xhc3MuZGlzYWJsZWRdPVwiIWhhc1ByZXZpb3VzKCkgfHwgZGlzYWJsZWRcIj5cclxuICAgICAgICA8YSBhcmlhLWxhYmVsPVwiUHJldmlvdXNcIiBpMThuLWFyaWEtbGFiZWw9XCJAQG5nYi5wYWdpbmF0aW9uLnByZXZpb3VzLWFyaWFcIiBjbGFzcz1cInBhZ2UtbGlua1wiIGhyZWZcclxuICAgICAgICAgIChjbGljayk9XCIhIXNlbGVjdFBhZ2UocGFnZS0xKVwiIFthdHRyLnRhYmluZGV4XT1cIihoYXNQcmV2aW91cygpID8gbnVsbCA6ICctMScpXCI+XHJcbiAgICAgICAgICA8c3BhbiBhcmlhLWhpZGRlbj1cInRydWVcIiBpMThuPVwiQEBuZ2IucGFnaW5hdGlvbi5wcmV2aW91c1wiPiZsYXF1bzs8L3NwYW4+XHJcbiAgICAgICAgPC9hPlxyXG4gICAgICA8L2xpPlxyXG4gICAgICA8bGkgKm5nRm9yPVwibGV0IHBhZ2VOdW1iZXIgb2YgcGFnZXNcIiBjbGFzcz1cInBhZ2UtaXRlbVwiIFtjbGFzcy5hY3RpdmVdPVwicGFnZU51bWJlciA9PT0gcGFnZVwiXHJcbiAgICAgICAgW2NsYXNzLmRpc2FibGVkXT1cImlzRWxsaXBzaXMocGFnZU51bWJlcikgfHwgZGlzYWJsZWRcIj5cclxuICAgICAgICA8YSAqbmdJZj1cImlzRWxsaXBzaXMocGFnZU51bWJlcilcIiBjbGFzcz1cInBhZ2UtbGlua1wiPi4uLjwvYT5cclxuICAgICAgICA8YSAqbmdJZj1cIiFpc0VsbGlwc2lzKHBhZ2VOdW1iZXIpXCIgY2xhc3M9XCJwYWdlLWxpbmtcIiBocmVmIChjbGljayk9XCIhIXNlbGVjdFBhZ2UocGFnZU51bWJlcilcIj5cclxuICAgICAgICAgIHt7cGFnZU51bWJlcn19XHJcbiAgICAgICAgICA8c3BhbiAqbmdJZj1cInBhZ2VOdW1iZXIgPT09IHBhZ2VcIiBjbGFzcz1cInNyLW9ubHlcIj4oY3VycmVudCk8L3NwYW4+XHJcbiAgICAgICAgPC9hPlxyXG4gICAgICA8L2xpPlxyXG4gICAgICA8bGkgKm5nSWY9XCJkaXJlY3Rpb25MaW5rc1wiIGNsYXNzPVwicGFnZS1pdGVtXCIgW2NsYXNzLmRpc2FibGVkXT1cIiFoYXNOZXh0KCkgfHwgZGlzYWJsZWRcIj5cclxuICAgICAgICA8YSBhcmlhLWxhYmVsPVwiTmV4dFwiIGkxOG4tYXJpYS1sYWJlbD1cIkBAbmdiLnBhZ2luYXRpb24ubmV4dC1hcmlhXCIgY2xhc3M9XCJwYWdlLWxpbmtcIiBocmVmXHJcbiAgICAgICAgICAoY2xpY2spPVwiISFzZWxlY3RQYWdlKHBhZ2UrMSlcIiBbYXR0ci50YWJpbmRleF09XCIoaGFzTmV4dCgpID8gbnVsbCA6ICctMScpXCI+XHJcbiAgICAgICAgICA8c3BhbiBhcmlhLWhpZGRlbj1cInRydWVcIiBpMThuPVwiQEBuZ2IucGFnaW5hdGlvbi5uZXh0XCI+JnJhcXVvOzwvc3Bhbj5cclxuICAgICAgICA8L2E+XHJcbiAgICAgIDwvbGk+XHJcblxyXG4gICAgICA8bGkgKm5nSWY9XCJib3VuZGFyeUxpbmtzXCIgY2xhc3M9XCJwYWdlLWl0ZW1cIiBbY2xhc3MuZGlzYWJsZWRdPVwiIWhhc05leHQoKSB8fCBkaXNhYmxlZFwiPlxyXG4gICAgICAgIDxhIGFyaWEtbGFiZWw9XCJMYXN0XCIgaTE4bi1hcmlhLWxhYmVsPVwiQEBuZ2IucGFnaW5hdGlvbi5sYXN0LWFyaWFcIiBjbGFzcz1cInBhZ2UtbGlua1wiIGhyZWZcclxuICAgICAgICAgIChjbGljayk9XCIhIXNlbGVjdFBhZ2UocGFnZUNvdW50KVwiIFthdHRyLnRhYmluZGV4XT1cIihoYXNOZXh0KCkgPyBudWxsIDogJy0xJylcIj5cclxuICAgICAgICAgIDxzcGFuIGFyaWEtaGlkZGVuPVwidHJ1ZVwiIGkxOG49XCJAQG5nYi5wYWdpbmF0aW9uLmxhc3RcIj4mcmFxdW87JnJhcXVvOzwvc3Bhbj5cclxuICAgICAgICA8L2E+XHJcbiAgICAgIDwvbGk+XHJcbiAgICA8L3VsPlxyXG4gIGBcclxufSlcclxuZXhwb3J0IGNsYXNzIE5nYlBhZ2luYXRpb24gaW1wbGVtZW50cyBPbkNoYW5nZXMge1xyXG4gIHBhZ2VDb3VudCA9IDA7XHJcbiAgcGFnZXM6IG51bWJlcltdID0gW107XHJcblxyXG4gIC8qKlxyXG4gICAqIFdoZXRoZXIgdG8gZGlzYWJsZSBidXR0b25zIGZyb20gdXNlciBpbnB1dFxyXG4gICAqL1xyXG4gIEBJbnB1dCgpIGRpc2FibGVkOiBib29sZWFuO1xyXG5cclxuICAvKipcclxuICAgKiAgV2hldGhlciB0byBzaG93IHRoZSBcIkZpcnN0XCIgYW5kIFwiTGFzdFwiIHBhZ2UgbGlua3NcclxuICAgKi9cclxuICBASW5wdXQoKSBib3VuZGFyeUxpbmtzOiBib29sZWFuO1xyXG5cclxuICAvKipcclxuICAgKiAgV2hldGhlciB0byBzaG93IHRoZSBcIk5leHRcIiBhbmQgXCJQcmV2aW91c1wiIHBhZ2UgbGlua3NcclxuICAgKi9cclxuICBASW5wdXQoKSBkaXJlY3Rpb25MaW5rczogYm9vbGVhbjtcclxuXHJcbiAgLyoqXHJcbiAgICogIFdoZXRoZXIgdG8gc2hvdyBlbGxpcHNpcyBzeW1ib2xzIGFuZCBmaXJzdC9sYXN0IHBhZ2UgbnVtYmVycyB3aGVuIG1heFNpemUgPiBudW1iZXIgb2YgcGFnZXNcclxuICAgKi9cclxuICBASW5wdXQoKSBlbGxpcHNlczogYm9vbGVhbjtcclxuXHJcbiAgLyoqXHJcbiAgICogIFdoZXRoZXIgdG8gcm90YXRlIHBhZ2VzIHdoZW4gbWF4U2l6ZSA+IG51bWJlciBvZiBwYWdlcy5cclxuICAgKiAgQ3VycmVudCBwYWdlIHdpbGwgYmUgaW4gdGhlIG1pZGRsZVxyXG4gICAqL1xyXG4gIEBJbnB1dCgpIHJvdGF0ZTogYm9vbGVhbjtcclxuXHJcbiAgLyoqXHJcbiAgICogIE51bWJlciBvZiBpdGVtcyBpbiBjb2xsZWN0aW9uLlxyXG4gICAqL1xyXG4gIEBJbnB1dCgpIGNvbGxlY3Rpb25TaXplOiBudW1iZXI7XHJcblxyXG4gIC8qKlxyXG4gICAqICBNYXhpbXVtIG51bWJlciBvZiBwYWdlcyB0byBkaXNwbGF5LlxyXG4gICAqL1xyXG4gIEBJbnB1dCgpIG1heFNpemU6IG51bWJlcjtcclxuXHJcbiAgLyoqXHJcbiAgICogIEN1cnJlbnQgcGFnZS4gUGFnZSBudW1iZXJzIHN0YXJ0IHdpdGggMVxyXG4gICAqL1xyXG4gIEBJbnB1dCgpIHBhZ2UgPSAxO1xyXG5cclxuICAvKipcclxuICAgKiAgTnVtYmVyIG9mIGl0ZW1zIHBlciBwYWdlLlxyXG4gICAqL1xyXG4gIEBJbnB1dCgpIHBhZ2VTaXplOiBudW1iZXI7XHJcblxyXG4gIC8qKlxyXG4gICAqICBBbiBldmVudCBmaXJlZCB3aGVuIHRoZSBwYWdlIGlzIGNoYW5nZWQuXHJcbiAgICogIEV2ZW50J3MgcGF5bG9hZCBlcXVhbHMgdG8gdGhlIG5ld2x5IHNlbGVjdGVkIHBhZ2UuXHJcbiAgICogIFdpbGwgZmlyZSBvbmx5IGlmIGNvbGxlY3Rpb24gc2l6ZSBpcyBzZXQgYW5kIGFsbCB2YWx1ZXMgYXJlIHZhbGlkLlxyXG4gICAqICBQYWdlIG51bWJlcnMgc3RhcnQgd2l0aCAxXHJcbiAgICovXHJcbiAgQE91dHB1dCgpIHBhZ2VDaGFuZ2UgPSBuZXcgRXZlbnRFbWl0dGVyPG51bWJlcj4odHJ1ZSk7XHJcblxyXG4gIC8qKlxyXG4gICAqIFBhZ2luYXRpb24gZGlzcGxheSBzaXplOiBzbWFsbCBvciBsYXJnZVxyXG4gICAqL1xyXG4gIEBJbnB1dCgpIHNpemU6ICdzbScgfCAnbGcnO1xyXG5cclxuICBjb25zdHJ1Y3Rvcihjb25maWc6IE5nYlBhZ2luYXRpb25Db25maWcpIHtcclxuICAgIHRoaXMuZGlzYWJsZWQgPSBjb25maWcuZGlzYWJsZWQ7XHJcbiAgICB0aGlzLmJvdW5kYXJ5TGlua3MgPSBjb25maWcuYm91bmRhcnlMaW5rcztcclxuICAgIHRoaXMuZGlyZWN0aW9uTGlua3MgPSBjb25maWcuZGlyZWN0aW9uTGlua3M7XHJcbiAgICB0aGlzLmVsbGlwc2VzID0gY29uZmlnLmVsbGlwc2VzO1xyXG4gICAgdGhpcy5tYXhTaXplID0gY29uZmlnLm1heFNpemU7XHJcbiAgICB0aGlzLnBhZ2VTaXplID0gY29uZmlnLnBhZ2VTaXplO1xyXG4gICAgdGhpcy5yb3RhdGUgPSBjb25maWcucm90YXRlO1xyXG4gICAgdGhpcy5zaXplID0gY29uZmlnLnNpemU7XHJcbiAgfVxyXG5cclxuICBoYXNQcmV2aW91cygpOiBib29sZWFuIHsgcmV0dXJuIHRoaXMucGFnZSA+IDE7IH1cclxuXHJcbiAgaGFzTmV4dCgpOiBib29sZWFuIHsgcmV0dXJuIHRoaXMucGFnZSA8IHRoaXMucGFnZUNvdW50OyB9XHJcblxyXG4gIHNlbGVjdFBhZ2UocGFnZU51bWJlcjogbnVtYmVyKTogdm9pZCB7IHRoaXMuX3VwZGF0ZVBhZ2VzKHBhZ2VOdW1iZXIpOyB9XHJcblxyXG4gIG5nT25DaGFuZ2VzKGNoYW5nZXM6IFNpbXBsZUNoYW5nZXMpOiB2b2lkIHsgdGhpcy5fdXBkYXRlUGFnZXModGhpcy5wYWdlKTsgfVxyXG5cclxuICBpc0VsbGlwc2lzKHBhZ2VOdW1iZXIpOiBib29sZWFuIHsgcmV0dXJuIHBhZ2VOdW1iZXIgPT09IC0xOyB9XHJcblxyXG4gIC8qKlxyXG4gICAqIEFwcGVuZHMgZWxsaXBzZXMgYW5kIGZpcnN0L2xhc3QgcGFnZSBudW1iZXIgdG8gdGhlIGRpc3BsYXllZCBwYWdlc1xyXG4gICAqL1xyXG4gIHByaXZhdGUgX2FwcGx5RWxsaXBzZXMoc3RhcnQ6IG51bWJlciwgZW5kOiBudW1iZXIpIHtcclxuICAgIGlmICh0aGlzLmVsbGlwc2VzKSB7XHJcbiAgICAgIGlmIChzdGFydCA+IDApIHtcclxuICAgICAgICBpZiAoc3RhcnQgPiAxKSB7XHJcbiAgICAgICAgICB0aGlzLnBhZ2VzLnVuc2hpZnQoLTEpO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLnBhZ2VzLnVuc2hpZnQoMSk7XHJcbiAgICAgIH1cclxuICAgICAgaWYgKGVuZCA8IHRoaXMucGFnZUNvdW50KSB7XHJcbiAgICAgICAgaWYgKGVuZCA8ICh0aGlzLnBhZ2VDb3VudCAtIDEpKSB7XHJcbiAgICAgICAgICB0aGlzLnBhZ2VzLnB1c2goLTEpO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLnBhZ2VzLnB1c2godGhpcy5wYWdlQ291bnQpO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBSb3RhdGVzIHBhZ2UgbnVtYmVycyBiYXNlZCBvbiBtYXhTaXplIGl0ZW1zIHZpc2libGUuXHJcbiAgICogQ3VycmVudGx5IHNlbGVjdGVkIHBhZ2Ugc3RheXMgaW4gdGhlIG1pZGRsZTpcclxuICAgKlxyXG4gICAqIEV4LiBmb3Igc2VsZWN0ZWQgcGFnZSA9IDY6XHJcbiAgICogWzUsKjYqLDddIGZvciBtYXhTaXplID0gM1xyXG4gICAqIFs0LDUsKjYqLDddIGZvciBtYXhTaXplID0gNFxyXG4gICAqL1xyXG4gIHByaXZhdGUgX2FwcGx5Um90YXRpb24oKTogW251bWJlciwgbnVtYmVyXSB7XHJcbiAgICBsZXQgc3RhcnQgPSAwO1xyXG4gICAgbGV0IGVuZCA9IHRoaXMucGFnZUNvdW50O1xyXG4gICAgbGV0IGxlZnRPZmZzZXQgPSBNYXRoLmZsb29yKHRoaXMubWF4U2l6ZSAvIDIpO1xyXG4gICAgbGV0IHJpZ2h0T2Zmc2V0ID0gdGhpcy5tYXhTaXplICUgMiA9PT0gMCA/IGxlZnRPZmZzZXQgLSAxIDogbGVmdE9mZnNldDtcclxuXHJcbiAgICBpZiAodGhpcy5wYWdlIDw9IGxlZnRPZmZzZXQpIHtcclxuICAgICAgLy8gdmVyeSBiZWdpbm5pbmcsIG5vIHJvdGF0aW9uIC0+IFswLi5tYXhTaXplXVxyXG4gICAgICBlbmQgPSB0aGlzLm1heFNpemU7XHJcbiAgICB9IGVsc2UgaWYgKHRoaXMucGFnZUNvdW50IC0gdGhpcy5wYWdlIDwgbGVmdE9mZnNldCkge1xyXG4gICAgICAvLyB2ZXJ5IGVuZCwgbm8gcm90YXRpb24gLT4gW2xlbi1tYXhTaXplLi5sZW5dXHJcbiAgICAgIHN0YXJ0ID0gdGhpcy5wYWdlQ291bnQgLSB0aGlzLm1heFNpemU7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICAvLyByb3RhdGVcclxuICAgICAgc3RhcnQgPSB0aGlzLnBhZ2UgLSBsZWZ0T2Zmc2V0IC0gMTtcclxuICAgICAgZW5kID0gdGhpcy5wYWdlICsgcmlnaHRPZmZzZXQ7XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIFtzdGFydCwgZW5kXTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFBhZ2luYXRlcyBwYWdlIG51bWJlcnMgYmFzZWQgb24gbWF4U2l6ZSBpdGVtcyBwZXIgcGFnZVxyXG4gICAqL1xyXG4gIHByaXZhdGUgX2FwcGx5UGFnaW5hdGlvbigpOiBbbnVtYmVyLCBudW1iZXJdIHtcclxuICAgIGxldCBwYWdlID0gTWF0aC5jZWlsKHRoaXMucGFnZSAvIHRoaXMubWF4U2l6ZSkgLSAxO1xyXG4gICAgbGV0IHN0YXJ0ID0gcGFnZSAqIHRoaXMubWF4U2l6ZTtcclxuICAgIGxldCBlbmQgPSBzdGFydCArIHRoaXMubWF4U2l6ZTtcclxuXHJcbiAgICByZXR1cm4gW3N0YXJ0LCBlbmRdO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBfc2V0UGFnZUluUmFuZ2UobmV3UGFnZU5vKSB7XHJcbiAgICBjb25zdCBwcmV2UGFnZU5vID0gdGhpcy5wYWdlO1xyXG4gICAgdGhpcy5wYWdlID0gZ2V0VmFsdWVJblJhbmdlKG5ld1BhZ2VObywgdGhpcy5wYWdlQ291bnQsIDEpO1xyXG5cclxuICAgIGlmICh0aGlzLnBhZ2UgIT09IHByZXZQYWdlTm8gJiYgaXNOdW1iZXIodGhpcy5jb2xsZWN0aW9uU2l6ZSkpIHtcclxuICAgICAgdGhpcy5wYWdlQ2hhbmdlLmVtaXQodGhpcy5wYWdlKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHByaXZhdGUgX3VwZGF0ZVBhZ2VzKG5ld1BhZ2U6IG51bWJlcikge1xyXG4gICAgdGhpcy5wYWdlQ291bnQgPSBNYXRoLmNlaWwodGhpcy5jb2xsZWN0aW9uU2l6ZSAvIHRoaXMucGFnZVNpemUpO1xyXG5cclxuICAgIGlmICghaXNOdW1iZXIodGhpcy5wYWdlQ291bnQpKSB7XHJcbiAgICAgIHRoaXMucGFnZUNvdW50ID0gMDtcclxuICAgIH1cclxuXHJcbiAgICAvLyBmaWxsLWluIG1vZGVsIG5lZWRlZCB0byByZW5kZXIgcGFnZXNcclxuICAgIHRoaXMucGFnZXMubGVuZ3RoID0gMDtcclxuICAgIGZvciAobGV0IGkgPSAxOyBpIDw9IHRoaXMucGFnZUNvdW50OyBpKyspIHtcclxuICAgICAgdGhpcy5wYWdlcy5wdXNoKGkpO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIHNldCBwYWdlIHdpdGhpbiAxLi5tYXggcmFuZ2VcclxuICAgIHRoaXMuX3NldFBhZ2VJblJhbmdlKG5ld1BhZ2UpO1xyXG5cclxuICAgIC8vIGFwcGx5IG1heFNpemUgaWYgbmVjZXNzYXJ5XHJcbiAgICBpZiAodGhpcy5tYXhTaXplID4gMCAmJiB0aGlzLnBhZ2VDb3VudCA+IHRoaXMubWF4U2l6ZSkge1xyXG4gICAgICBsZXQgc3RhcnQgPSAwO1xyXG4gICAgICBsZXQgZW5kID0gdGhpcy5wYWdlQ291bnQ7XHJcblxyXG4gICAgICAvLyBlaXRoZXIgcGFnaW5hdGluZyBvciByb3RhdGluZyBwYWdlIG51bWJlcnNcclxuICAgICAgaWYgKHRoaXMucm90YXRlKSB7XHJcbiAgICAgICAgW3N0YXJ0LCBlbmRdID0gdGhpcy5fYXBwbHlSb3RhdGlvbigpO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIFtzdGFydCwgZW5kXSA9IHRoaXMuX2FwcGx5UGFnaW5hdGlvbigpO1xyXG4gICAgICB9XHJcblxyXG4gICAgICB0aGlzLnBhZ2VzID0gdGhpcy5wYWdlcy5zbGljZShzdGFydCwgZW5kKTtcclxuXHJcbiAgICAgIC8vIGFkZGluZyBlbGxpcHNlc1xyXG4gICAgICB0aGlzLl9hcHBseUVsbGlwc2VzKHN0YXJ0LCBlbmQpO1xyXG4gICAgfVxyXG4gIH1cclxufVxyXG4iLCJpbXBvcnQge05nTW9kdWxlLCBNb2R1bGVXaXRoUHJvdmlkZXJzfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHtDb21tb25Nb2R1bGV9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XHJcblxyXG5pbXBvcnQge05nYlBhZ2luYXRpb259IGZyb20gJy4vcGFnaW5hdGlvbic7XHJcblxyXG5leHBvcnQge05nYlBhZ2luYXRpb259IGZyb20gJy4vcGFnaW5hdGlvbic7XHJcbmV4cG9ydCB7TmdiUGFnaW5hdGlvbkNvbmZpZ30gZnJvbSAnLi9wYWdpbmF0aW9uLWNvbmZpZyc7XHJcblxyXG5ATmdNb2R1bGUoe2RlY2xhcmF0aW9uczogW05nYlBhZ2luYXRpb25dLCBleHBvcnRzOiBbTmdiUGFnaW5hdGlvbl0sIGltcG9ydHM6IFtDb21tb25Nb2R1bGVdfSlcclxuZXhwb3J0IGNsYXNzIE5nYlBhZ2luYXRpb25Nb2R1bGUge1xyXG4gIC8qKlxyXG4gICAqIEltcG9ydGluZyB3aXRoICcuZm9yUm9vdCgpJyBpcyBubyBsb25nZXIgbmVjZXNzYXJ5LCB5b3UgY2FuIHNpbXBseSBpbXBvcnQgdGhlIG1vZHVsZS5cclxuICAgKiBXaWxsIGJlIHJlbW92ZWQgaW4gNC4wLjAuXHJcbiAgICpcclxuICAgKiBAZGVwcmVjYXRlZCAzLjAuMFxyXG4gICAqL1xyXG4gIHN0YXRpYyBmb3JSb290KCk6IE1vZHVsZVdpdGhQcm92aWRlcnMgeyByZXR1cm4ge25nTW9kdWxlOiBOZ2JQYWdpbmF0aW9uTW9kdWxlfTsgfVxyXG59XHJcbiIsImV4cG9ydCBjbGFzcyBUcmlnZ2VyIHtcclxuICBjb25zdHJ1Y3RvcihwdWJsaWMgb3Blbjogc3RyaW5nLCBwdWJsaWMgY2xvc2U/OiBzdHJpbmcpIHtcclxuICAgIGlmICghY2xvc2UpIHtcclxuICAgICAgdGhpcy5jbG9zZSA9IG9wZW47XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBpc01hbnVhbCgpIHsgcmV0dXJuIHRoaXMub3BlbiA9PT0gJ21hbnVhbCcgfHwgdGhpcy5jbG9zZSA9PT0gJ21hbnVhbCc7IH1cclxufVxyXG5cclxuY29uc3QgREVGQVVMVF9BTElBU0VTID0ge1xyXG4gICdob3Zlcic6IFsnbW91c2VlbnRlcicsICdtb3VzZWxlYXZlJ11cclxufTtcclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBwYXJzZVRyaWdnZXJzKHRyaWdnZXJzOiBzdHJpbmcsIGFsaWFzZXMgPSBERUZBVUxUX0FMSUFTRVMpOiBUcmlnZ2VyW10ge1xyXG4gIGNvbnN0IHRyaW1tZWRUcmlnZ2VycyA9ICh0cmlnZ2VycyB8fCAnJykudHJpbSgpO1xyXG5cclxuICBpZiAodHJpbW1lZFRyaWdnZXJzLmxlbmd0aCA9PT0gMCkge1xyXG4gICAgcmV0dXJuIFtdO1xyXG4gIH1cclxuXHJcbiAgY29uc3QgcGFyc2VkVHJpZ2dlcnMgPSB0cmltbWVkVHJpZ2dlcnMuc3BsaXQoL1xccysvKS5tYXAodHJpZ2dlciA9PiB0cmlnZ2VyLnNwbGl0KCc6JykpLm1hcCgodHJpZ2dlclBhaXIpID0+IHtcclxuICAgIGxldCBhbGlhcyA9IGFsaWFzZXNbdHJpZ2dlclBhaXJbMF1dIHx8IHRyaWdnZXJQYWlyO1xyXG4gICAgcmV0dXJuIG5ldyBUcmlnZ2VyKGFsaWFzWzBdLCBhbGlhc1sxXSk7XHJcbiAgfSk7XHJcblxyXG4gIGNvbnN0IG1hbnVhbFRyaWdnZXJzID0gcGFyc2VkVHJpZ2dlcnMuZmlsdGVyKHRyaWdnZXJQYWlyID0+IHRyaWdnZXJQYWlyLmlzTWFudWFsKCkpO1xyXG5cclxuICBpZiAobWFudWFsVHJpZ2dlcnMubGVuZ3RoID4gMSkge1xyXG4gICAgdGhyb3cgJ1RyaWdnZXJzIHBhcnNlIGVycm9yOiBvbmx5IG9uZSBtYW51YWwgdHJpZ2dlciBpcyBhbGxvd2VkJztcclxuICB9XHJcblxyXG4gIGlmIChtYW51YWxUcmlnZ2Vycy5sZW5ndGggPT09IDEgJiYgcGFyc2VkVHJpZ2dlcnMubGVuZ3RoID4gMSkge1xyXG4gICAgdGhyb3cgJ1RyaWdnZXJzIHBhcnNlIGVycm9yOiBtYW51YWwgdHJpZ2dlciBjYW5cXCd0IGJlIG1peGVkIHdpdGggb3RoZXIgdHJpZ2dlcnMnO1xyXG4gIH1cclxuXHJcbiAgcmV0dXJuIHBhcnNlZFRyaWdnZXJzO1xyXG59XHJcblxyXG5jb25zdCBub29wRm4gPSAoKSA9PiB7fTtcclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBsaXN0ZW5Ub1RyaWdnZXJzKHJlbmRlcmVyOiBhbnksIG5hdGl2ZUVsZW1lbnQ6IGFueSwgdHJpZ2dlcnM6IHN0cmluZywgb3BlbkZuLCBjbG9zZUZuLCB0b2dnbGVGbikge1xyXG4gIGNvbnN0IHBhcnNlZFRyaWdnZXJzID0gcGFyc2VUcmlnZ2Vycyh0cmlnZ2Vycyk7XHJcbiAgY29uc3QgbGlzdGVuZXJzID0gW107XHJcblxyXG4gIGlmIChwYXJzZWRUcmlnZ2Vycy5sZW5ndGggPT09IDEgJiYgcGFyc2VkVHJpZ2dlcnNbMF0uaXNNYW51YWwoKSkge1xyXG4gICAgcmV0dXJuIG5vb3BGbjtcclxuICB9XHJcblxyXG4gIHBhcnNlZFRyaWdnZXJzLmZvckVhY2goKHRyaWdnZXI6IFRyaWdnZXIpID0+IHtcclxuICAgIGlmICh0cmlnZ2VyLm9wZW4gPT09IHRyaWdnZXIuY2xvc2UpIHtcclxuICAgICAgbGlzdGVuZXJzLnB1c2gocmVuZGVyZXIubGlzdGVuKG5hdGl2ZUVsZW1lbnQsIHRyaWdnZXIub3BlbiwgdG9nZ2xlRm4pKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIGxpc3RlbmVycy5wdXNoKFxyXG4gICAgICAgICAgcmVuZGVyZXIubGlzdGVuKG5hdGl2ZUVsZW1lbnQsIHRyaWdnZXIub3Blbiwgb3BlbkZuKSwgcmVuZGVyZXIubGlzdGVuKG5hdGl2ZUVsZW1lbnQsIHRyaWdnZXIuY2xvc2UsIGNsb3NlRm4pKTtcclxuICAgIH1cclxuICB9KTtcclxuXHJcbiAgcmV0dXJuICgpID0+IHsgbGlzdGVuZXJzLmZvckVhY2godW5zdWJzY3JpYmVGbiA9PiB1bnN1YnNjcmliZUZuKCkpOyB9O1xyXG59XHJcbiIsImltcG9ydCB7SW5qZWN0YWJsZX0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7UGxhY2VtZW50QXJyYXl9IGZyb20gJy4uL3V0aWwvcG9zaXRpb25pbmcnO1xyXG5cclxuLyoqXHJcbiAqIENvbmZpZ3VyYXRpb24gc2VydmljZSBmb3IgdGhlIE5nYlBvcG92ZXIgZGlyZWN0aXZlLlxyXG4gKiBZb3UgY2FuIGluamVjdCB0aGlzIHNlcnZpY2UsIHR5cGljYWxseSBpbiB5b3VyIHJvb3QgY29tcG9uZW50LCBhbmQgY3VzdG9taXplIHRoZSB2YWx1ZXMgb2YgaXRzIHByb3BlcnRpZXMgaW5cclxuICogb3JkZXIgdG8gcHJvdmlkZSBkZWZhdWx0IHZhbHVlcyBmb3IgYWxsIHRoZSBwb3BvdmVycyB1c2VkIGluIHRoZSBhcHBsaWNhdGlvbi5cclxuICovXHJcbkBJbmplY3RhYmxlKHtwcm92aWRlZEluOiAncm9vdCd9KVxyXG5leHBvcnQgY2xhc3MgTmdiUG9wb3ZlckNvbmZpZyB7XHJcbiAgYXV0b0Nsb3NlOiBib29sZWFuIHwgJ2luc2lkZScgfCAnb3V0c2lkZScgPSB0cnVlO1xyXG4gIHBsYWNlbWVudDogUGxhY2VtZW50QXJyYXkgPSAndG9wJztcclxuICB0cmlnZ2VycyA9ICdjbGljayc7XHJcbiAgY29udGFpbmVyOiBzdHJpbmc7XHJcbiAgZGlzYWJsZVBvcG92ZXIgPSBmYWxzZTtcclxuICBwb3BvdmVyQ2xhc3M6IHN0cmluZztcclxufVxyXG4iLCJpbXBvcnQge1xyXG4gIENvbXBvbmVudCxcclxuICBEaXJlY3RpdmUsXHJcbiAgSW5wdXQsXHJcbiAgT3V0cHV0LFxyXG4gIEV2ZW50RW1pdHRlcixcclxuICBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSxcclxuICBPbkluaXQsXHJcbiAgT25EZXN0cm95LFxyXG4gIE9uQ2hhbmdlcyxcclxuICBJbmplY3QsXHJcbiAgSW5qZWN0b3IsXHJcbiAgUmVuZGVyZXIyLFxyXG4gIENvbXBvbmVudFJlZixcclxuICBFbGVtZW50UmVmLFxyXG4gIFRlbXBsYXRlUmVmLFxyXG4gIFZpZXdDb250YWluZXJSZWYsXHJcbiAgQ29tcG9uZW50RmFjdG9yeVJlc29sdmVyLFxyXG4gIE5nWm9uZSxcclxuICBTaW1wbGVDaGFuZ2VzXHJcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7RE9DVU1FTlR9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XHJcbmltcG9ydCB7ZnJvbUV2ZW50LCByYWNlfSBmcm9tICdyeGpzJztcclxuaW1wb3J0IHtmaWx0ZXIsIHRha2VVbnRpbH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xyXG5cclxuaW1wb3J0IHtsaXN0ZW5Ub1RyaWdnZXJzfSBmcm9tICcuLi91dGlsL3RyaWdnZXJzJztcclxuaW1wb3J0IHtwb3NpdGlvbkVsZW1lbnRzLCBQbGFjZW1lbnQsIFBsYWNlbWVudEFycmF5fSBmcm9tICcuLi91dGlsL3Bvc2l0aW9uaW5nJztcclxuaW1wb3J0IHtQb3B1cFNlcnZpY2V9IGZyb20gJy4uL3V0aWwvcG9wdXAnO1xyXG5pbXBvcnQge0tleX0gZnJvbSAnLi4vdXRpbC9rZXknO1xyXG5cclxuaW1wb3J0IHtOZ2JQb3BvdmVyQ29uZmlnfSBmcm9tICcuL3BvcG92ZXItY29uZmlnJztcclxuXHJcbmxldCBuZXh0SWQgPSAwO1xyXG5cclxuQENvbXBvbmVudCh7XHJcbiAgc2VsZWN0b3I6ICduZ2ItcG9wb3Zlci13aW5kb3cnLFxyXG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoLFxyXG4gIGhvc3Q6IHtcclxuICAgICdbY2xhc3NdJzpcclxuICAgICAgICAnXCJwb3BvdmVyIGJzLXBvcG92ZXItXCIgKyBwbGFjZW1lbnQuc3BsaXQoXCItXCIpWzBdK1wiIGJzLXBvcG92ZXItXCIgKyBwbGFjZW1lbnQgKyAocG9wb3ZlckNsYXNzID8gXCIgXCIgKyBwb3BvdmVyQ2xhc3MgOiBcIlwiKScsXHJcbiAgICAncm9sZSc6ICd0b29sdGlwJyxcclxuICAgICdbaWRdJzogJ2lkJ1xyXG4gIH0sXHJcbiAgdGVtcGxhdGU6IGBcclxuICAgIDxkaXYgY2xhc3M9XCJhcnJvd1wiPjwvZGl2PlxyXG4gICAgPGgzIGNsYXNzPVwicG9wb3Zlci1oZWFkZXJcIiAqbmdJZj1cInRpdGxlICE9IG51bGxcIj5cclxuICAgICAgPG5nLXRlbXBsYXRlICNzaW1wbGVUaXRsZT57e3RpdGxlfX08L25nLXRlbXBsYXRlPlxyXG4gICAgICA8bmctdGVtcGxhdGUgW25nVGVtcGxhdGVPdXRsZXRdPVwiaXNUaXRsZVRlbXBsYXRlKCkgPyB0aXRsZSA6IHNpbXBsZVRpdGxlXCIgW25nVGVtcGxhdGVPdXRsZXRDb250ZXh0XT1cImNvbnRleHRcIj48L25nLXRlbXBsYXRlPlxyXG4gICAgPC9oMz5cclxuICAgIDxkaXYgY2xhc3M9XCJwb3BvdmVyLWJvZHlcIj48bmctY29udGVudD48L25nLWNvbnRlbnQ+PC9kaXY+YCxcclxuICBzdHlsZXM6IFtgXHJcbiAgICA6aG9zdC5icy1wb3BvdmVyLXRvcCAuYXJyb3csIDpob3N0LmJzLXBvcG92ZXItYm90dG9tIC5hcnJvdyB7XHJcbiAgICAgIGxlZnQ6IDUwJTtcclxuICAgICAgbWFyZ2luLWxlZnQ6IC01cHg7XHJcbiAgICB9XHJcblxyXG4gICAgOmhvc3QuYnMtcG9wb3Zlci10b3AtbGVmdCAuYXJyb3csIDpob3N0LmJzLXBvcG92ZXItYm90dG9tLWxlZnQgLmFycm93IHtcclxuICAgICAgbGVmdDogMmVtO1xyXG4gICAgfVxyXG5cclxuICAgIDpob3N0LmJzLXBvcG92ZXItdG9wLXJpZ2h0IC5hcnJvdywgOmhvc3QuYnMtcG9wb3Zlci1ib3R0b20tcmlnaHQgLmFycm93IHtcclxuICAgICAgbGVmdDogYXV0bztcclxuICAgICAgcmlnaHQ6IDJlbTtcclxuICAgIH1cclxuXHJcbiAgICA6aG9zdC5icy1wb3BvdmVyLWxlZnQgLmFycm93LCA6aG9zdC5icy1wb3BvdmVyLXJpZ2h0IC5hcnJvdyB7XHJcbiAgICAgIHRvcDogNTAlO1xyXG4gICAgICBtYXJnaW4tdG9wOiAtNXB4O1xyXG4gICAgfVxyXG5cclxuICAgIDpob3N0LmJzLXBvcG92ZXItbGVmdC10b3AgLmFycm93LCA6aG9zdC5icy1wb3BvdmVyLXJpZ2h0LXRvcCAuYXJyb3cge1xyXG4gICAgICB0b3A6IDAuN2VtO1xyXG4gICAgfVxyXG5cclxuICAgIDpob3N0LmJzLXBvcG92ZXItbGVmdC1ib3R0b20gLmFycm93LCA6aG9zdC5icy1wb3BvdmVyLXJpZ2h0LWJvdHRvbSAuYXJyb3cge1xyXG4gICAgICB0b3A6IGF1dG87XHJcbiAgICAgIGJvdHRvbTogMC43ZW07XHJcbiAgICB9XHJcbiAgYF1cclxufSlcclxuZXhwb3J0IGNsYXNzIE5nYlBvcG92ZXJXaW5kb3cge1xyXG4gIEBJbnB1dCgpIHBsYWNlbWVudDogUGxhY2VtZW50ID0gJ3RvcCc7XHJcbiAgQElucHV0KCkgdGl0bGU6IHVuZGVmaW5lZCB8IHN0cmluZyB8IFRlbXBsYXRlUmVmPGFueT47XHJcbiAgQElucHV0KCkgaWQ6IHN0cmluZztcclxuICBASW5wdXQoKSBwb3BvdmVyQ2xhc3M6IHN0cmluZztcclxuICBASW5wdXQoKSBjb250ZXh0OiBhbnk7XHJcblxyXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgX2VsZW1lbnQ6IEVsZW1lbnRSZWY8SFRNTEVsZW1lbnQ+LCBwcml2YXRlIF9yZW5kZXJlcjogUmVuZGVyZXIyKSB7fVxyXG5cclxuICBpc1RpdGxlVGVtcGxhdGUoKSB7IHJldHVybiB0aGlzLnRpdGxlIGluc3RhbmNlb2YgVGVtcGxhdGVSZWY7IH1cclxuXHJcbiAgYXBwbHlQbGFjZW1lbnQoX3BsYWNlbWVudDogUGxhY2VtZW50KSB7XHJcbiAgICAvLyByZW1vdmUgdGhlIGN1cnJlbnQgcGxhY2VtZW50IGNsYXNzZXNcclxuICAgIHRoaXMuX3JlbmRlcmVyLnJlbW92ZUNsYXNzKHRoaXMuX2VsZW1lbnQubmF0aXZlRWxlbWVudCwgJ2JzLXBvcG92ZXItJyArIHRoaXMucGxhY2VtZW50LnRvU3RyaW5nKCkuc3BsaXQoJy0nKVswXSk7XHJcbiAgICB0aGlzLl9yZW5kZXJlci5yZW1vdmVDbGFzcyh0aGlzLl9lbGVtZW50Lm5hdGl2ZUVsZW1lbnQsICdicy1wb3BvdmVyLScgKyB0aGlzLnBsYWNlbWVudC50b1N0cmluZygpKTtcclxuXHJcbiAgICAvLyBzZXQgdGhlIG5ldyBwbGFjZW1lbnQgY2xhc3Nlc1xyXG4gICAgdGhpcy5wbGFjZW1lbnQgPSBfcGxhY2VtZW50O1xyXG5cclxuICAgIC8vIGFwcGx5IHRoZSBuZXcgcGxhY2VtZW50XHJcbiAgICB0aGlzLl9yZW5kZXJlci5hZGRDbGFzcyh0aGlzLl9lbGVtZW50Lm5hdGl2ZUVsZW1lbnQsICdicy1wb3BvdmVyLScgKyB0aGlzLnBsYWNlbWVudC50b1N0cmluZygpLnNwbGl0KCctJylbMF0pO1xyXG4gICAgdGhpcy5fcmVuZGVyZXIuYWRkQ2xhc3ModGhpcy5fZWxlbWVudC5uYXRpdmVFbGVtZW50LCAnYnMtcG9wb3Zlci0nICsgdGhpcy5wbGFjZW1lbnQudG9TdHJpbmcoKSk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBUZWxscyB3aGV0aGVyIHRoZSBldmVudCBoYXMgYmVlbiB0cmlnZ2VyZWQgZnJvbSB0aGlzIGNvbXBvbmVudCdzIHN1YnRyZWUgb3Igbm90LlxyXG4gICAqXHJcbiAgICogQHBhcmFtIGV2ZW50IHRoZSBldmVudCB0byBjaGVja1xyXG4gICAqXHJcbiAgICogQHJldHVybiB3aGV0aGVyIHRoZSBldmVudCBoYXMgYmVlbiB0cmlnZ2VyZWQgZnJvbSB0aGlzIGNvbXBvbmVudCdzIHN1YnRyZWUgb3Igbm90LlxyXG4gICAqL1xyXG4gIGlzRXZlbnRGcm9tKGV2ZW50OiBFdmVudCk6IGJvb2xlYW4geyByZXR1cm4gdGhpcy5fZWxlbWVudC5uYXRpdmVFbGVtZW50LmNvbnRhaW5zKGV2ZW50LnRhcmdldCBhcyBIVE1MRWxlbWVudCk7IH1cclxufVxyXG5cclxuLyoqXHJcbiAqIEEgbGlnaHR3ZWlnaHQsIGV4dGVuc2libGUgZGlyZWN0aXZlIGZvciBmYW5jeSBwb3BvdmVyIGNyZWF0aW9uLlxyXG4gKi9cclxuQERpcmVjdGl2ZSh7c2VsZWN0b3I6ICdbbmdiUG9wb3Zlcl0nLCBleHBvcnRBczogJ25nYlBvcG92ZXInfSlcclxuZXhwb3J0IGNsYXNzIE5nYlBvcG92ZXIgaW1wbGVtZW50cyBPbkluaXQsIE9uRGVzdHJveSwgT25DaGFuZ2VzIHtcclxuICAvKipcclxuICAgKiBJbmRpY2F0ZXMgd2hldGhlciB0aGUgcG9wb3ZlciBzaG91bGQgYmUgY2xvc2VkIG9uIEVzY2FwZSBrZXkgYW5kIGluc2lkZS9vdXRzaWRlIGNsaWNrcy5cclxuICAgKlxyXG4gICAqIC0gdHJ1ZSAoZGVmYXVsdCk6IGNsb3NlcyBvbiBib3RoIG91dHNpZGUgYW5kIGluc2lkZSBjbGlja3MgYXMgd2VsbCBhcyBFc2NhcGUgcHJlc3Nlc1xyXG4gICAqIC0gZmFsc2U6IGRpc2FibGVzIHRoZSBhdXRvQ2xvc2UgZmVhdHVyZSAoTkI6IHRyaWdnZXJzIHN0aWxsIGFwcGx5KVxyXG4gICAqIC0gJ2luc2lkZSc6IGNsb3NlcyBvbiBpbnNpZGUgY2xpY2tzIGFzIHdlbGwgYXMgRXNjYXBlIHByZXNzZXNcclxuICAgKiAtICdvdXRzaWRlJzogY2xvc2VzIG9uIG91dHNpZGUgY2xpY2tzIChzb21ldGltZXMgYWxzbyBhY2hpZXZhYmxlIHRocm91Z2ggdHJpZ2dlcnMpXHJcbiAgICogYXMgd2VsbCBhcyBFc2NhcGUgcHJlc3Nlc1xyXG4gICAqXHJcbiAgICogQHNpbmNlIDMuMC4wXHJcbiAgICovXHJcbiAgQElucHV0KCkgYXV0b0Nsb3NlOiBib29sZWFuIHwgJ2luc2lkZScgfCAnb3V0c2lkZSc7XHJcbiAgLyoqXHJcbiAgICogQ29udGVudCB0byBiZSBkaXNwbGF5ZWQgYXMgcG9wb3Zlci4gSWYgdGl0bGUgYW5kIGNvbnRlbnQgYXJlIGVtcHR5LCB0aGUgcG9wb3ZlciB3b24ndCBvcGVuLlxyXG4gICAqL1xyXG4gIEBJbnB1dCgpIG5nYlBvcG92ZXI6IHN0cmluZyB8IFRlbXBsYXRlUmVmPGFueT47XHJcbiAgLyoqXHJcbiAgICogVGl0bGUgb2YgYSBwb3BvdmVyLiBJZiB0aXRsZSBhbmQgY29udGVudCBhcmUgZW1wdHksIHRoZSBwb3BvdmVyIHdvbid0IG9wZW4uXHJcbiAgICovXHJcbiAgQElucHV0KCkgcG9wb3ZlclRpdGxlOiBzdHJpbmcgfCBUZW1wbGF0ZVJlZjxhbnk+O1xyXG4gIC8qKlxyXG4gICAqIFBsYWNlbWVudCBvZiBhIHBvcG92ZXIgYWNjZXB0czpcclxuICAgKiAgICBcInRvcFwiLCBcInRvcC1sZWZ0XCIsIFwidG9wLXJpZ2h0XCIsIFwiYm90dG9tXCIsIFwiYm90dG9tLWxlZnRcIiwgXCJib3R0b20tcmlnaHRcIixcclxuICAgKiAgICBcImxlZnRcIiwgXCJsZWZ0LXRvcFwiLCBcImxlZnQtYm90dG9tXCIsIFwicmlnaHRcIiwgXCJyaWdodC10b3BcIiwgXCJyaWdodC1ib3R0b21cIlxyXG4gICAqIGFuZCBhcnJheSBvZiBhYm92ZSB2YWx1ZXMuXHJcbiAgICovXHJcbiAgQElucHV0KCkgcGxhY2VtZW50OiBQbGFjZW1lbnRBcnJheTtcclxuICAvKipcclxuICAgKiBTcGVjaWZpZXMgZXZlbnRzIHRoYXQgc2hvdWxkIHRyaWdnZXIuIFN1cHBvcnRzIGEgc3BhY2Ugc2VwYXJhdGVkIGxpc3Qgb2YgZXZlbnQgbmFtZXMuXHJcbiAgICovXHJcbiAgQElucHV0KCkgdHJpZ2dlcnM6IHN0cmluZztcclxuICAvKipcclxuICAgKiBBIHNlbGVjdG9yIHNwZWNpZnlpbmcgdGhlIGVsZW1lbnQgdGhlIHBvcG92ZXIgc2hvdWxkIGJlIGFwcGVuZGVkIHRvLlxyXG4gICAqIEN1cnJlbnRseSBvbmx5IHN1cHBvcnRzIFwiYm9keVwiLlxyXG4gICAqL1xyXG4gIEBJbnB1dCgpIGNvbnRhaW5lcjogc3RyaW5nO1xyXG4gIC8qKlxyXG4gICAqIEEgZmxhZyBpbmRpY2F0aW5nIGlmIGEgZ2l2ZW4gcG9wb3ZlciBpcyBkaXNhYmxlZCBhbmQgc2hvdWxkIG5vdCBiZSBkaXNwbGF5ZWQuXHJcbiAgICpcclxuICAgKiBAc2luY2UgMS4xLjBcclxuICAgKi9cclxuICBASW5wdXQoKSBkaXNhYmxlUG9wb3ZlcjogYm9vbGVhbjtcclxuICAvKipcclxuICAgKiBBbiBvcHRpb25hbCBjbGFzcyBhcHBsaWVkIHRvIG5nYi1wb3BvdmVyLXdpbmRvd1xyXG4gICAqXHJcbiAgICogQHNpbmNlIDIuMi4wXHJcbiAgICovXHJcbiAgQElucHV0KCkgcG9wb3ZlckNsYXNzOiBzdHJpbmc7XHJcbiAgLyoqXHJcbiAgICogRW1pdHMgYW4gZXZlbnQgd2hlbiB0aGUgcG9wb3ZlciBpcyBzaG93blxyXG4gICAqL1xyXG4gIEBPdXRwdXQoKSBzaG93biA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcclxuICAvKipcclxuICAgKiBFbWl0cyBhbiBldmVudCB3aGVuIHRoZSBwb3BvdmVyIGlzIGhpZGRlblxyXG4gICAqL1xyXG4gIEBPdXRwdXQoKSBoaWRkZW4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XHJcblxyXG4gIHByaXZhdGUgX25nYlBvcG92ZXJXaW5kb3dJZCA9IGBuZ2ItcG9wb3Zlci0ke25leHRJZCsrfWA7XHJcbiAgcHJpdmF0ZSBfcG9wdXBTZXJ2aWNlOiBQb3B1cFNlcnZpY2U8TmdiUG9wb3ZlcldpbmRvdz47XHJcbiAgcHJpdmF0ZSBfd2luZG93UmVmOiBDb21wb25lbnRSZWY8TmdiUG9wb3ZlcldpbmRvdz47XHJcbiAgcHJpdmF0ZSBfdW5yZWdpc3Rlckxpc3RlbmVyc0ZuO1xyXG4gIHByaXZhdGUgX3pvbmVTdWJzY3JpcHRpb246IGFueTtcclxuICBwcml2YXRlIF9pc0Rpc2FibGVkKCk6IGJvb2xlYW4ge1xyXG4gICAgaWYgKHRoaXMuZGlzYWJsZVBvcG92ZXIpIHtcclxuICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICB9XHJcbiAgICBpZiAoIXRoaXMubmdiUG9wb3ZlciAmJiAhdGhpcy5wb3BvdmVyVGl0bGUpIHtcclxuICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gZmFsc2U7XHJcbiAgfVxyXG5cclxuICBjb25zdHJ1Y3RvcihcclxuICAgICAgcHJpdmF0ZSBfZWxlbWVudFJlZjogRWxlbWVudFJlZjxIVE1MRWxlbWVudD4sIHByaXZhdGUgX3JlbmRlcmVyOiBSZW5kZXJlcjIsIGluamVjdG9yOiBJbmplY3RvcixcclxuICAgICAgY29tcG9uZW50RmFjdG9yeVJlc29sdmVyOiBDb21wb25lbnRGYWN0b3J5UmVzb2x2ZXIsIHZpZXdDb250YWluZXJSZWY6IFZpZXdDb250YWluZXJSZWYsIGNvbmZpZzogTmdiUG9wb3ZlckNvbmZpZyxcclxuICAgICAgcHJpdmF0ZSBfbmdab25lOiBOZ1pvbmUsIEBJbmplY3QoRE9DVU1FTlQpIHByaXZhdGUgX2RvY3VtZW50OiBhbnkpIHtcclxuICAgIHRoaXMuYXV0b0Nsb3NlID0gY29uZmlnLmF1dG9DbG9zZTtcclxuICAgIHRoaXMucGxhY2VtZW50ID0gY29uZmlnLnBsYWNlbWVudDtcclxuICAgIHRoaXMudHJpZ2dlcnMgPSBjb25maWcudHJpZ2dlcnM7XHJcbiAgICB0aGlzLmNvbnRhaW5lciA9IGNvbmZpZy5jb250YWluZXI7XHJcbiAgICB0aGlzLmRpc2FibGVQb3BvdmVyID0gY29uZmlnLmRpc2FibGVQb3BvdmVyO1xyXG4gICAgdGhpcy5wb3BvdmVyQ2xhc3MgPSBjb25maWcucG9wb3ZlckNsYXNzO1xyXG4gICAgdGhpcy5fcG9wdXBTZXJ2aWNlID0gbmV3IFBvcHVwU2VydmljZTxOZ2JQb3BvdmVyV2luZG93PihcclxuICAgICAgICBOZ2JQb3BvdmVyV2luZG93LCBpbmplY3Rvciwgdmlld0NvbnRhaW5lclJlZiwgX3JlbmRlcmVyLCBjb21wb25lbnRGYWN0b3J5UmVzb2x2ZXIpO1xyXG5cclxuICAgIHRoaXMuX3pvbmVTdWJzY3JpcHRpb24gPSBfbmdab25lLm9uU3RhYmxlLnN1YnNjcmliZSgoKSA9PiB7XHJcbiAgICAgIGlmICh0aGlzLl93aW5kb3dSZWYpIHtcclxuICAgICAgICB0aGlzLl93aW5kb3dSZWYuaW5zdGFuY2UuYXBwbHlQbGFjZW1lbnQoXHJcbiAgICAgICAgICAgIHBvc2l0aW9uRWxlbWVudHMoXHJcbiAgICAgICAgICAgICAgICB0aGlzLl9lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQsIHRoaXMuX3dpbmRvd1JlZi5sb2NhdGlvbi5uYXRpdmVFbGVtZW50LCB0aGlzLnBsYWNlbWVudCxcclxuICAgICAgICAgICAgICAgIHRoaXMuY29udGFpbmVyID09PSAnYm9keScpKTtcclxuICAgICAgfVxyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBPcGVucyBhbiBlbGVtZW50w6LCgMKZcyBwb3BvdmVyLiBUaGlzIGlzIGNvbnNpZGVyZWQgYSDDosKAwpxtYW51YWzDosKAwp0gdHJpZ2dlcmluZyBvZiB0aGUgcG9wb3Zlci5cclxuICAgKiBUaGUgY29udGV4dCBpcyBhbiBvcHRpb25hbCB2YWx1ZSB0byBiZSBpbmplY3RlZCBpbnRvIHRoZSBwb3BvdmVyIHRlbXBsYXRlIHdoZW4gaXQgaXMgY3JlYXRlZC5cclxuICAgKi9cclxuICBvcGVuKGNvbnRleHQ/OiBhbnkpIHtcclxuICAgIGlmICghdGhpcy5fd2luZG93UmVmICYmICF0aGlzLl9pc0Rpc2FibGVkKCkpIHtcclxuICAgICAgdGhpcy5fd2luZG93UmVmID0gdGhpcy5fcG9wdXBTZXJ2aWNlLm9wZW4odGhpcy5uZ2JQb3BvdmVyLCBjb250ZXh0KTtcclxuICAgICAgdGhpcy5fd2luZG93UmVmLmluc3RhbmNlLnRpdGxlID0gdGhpcy5wb3BvdmVyVGl0bGU7XHJcbiAgICAgIHRoaXMuX3dpbmRvd1JlZi5pbnN0YW5jZS5jb250ZXh0ID0gY29udGV4dDtcclxuICAgICAgdGhpcy5fd2luZG93UmVmLmluc3RhbmNlLnBvcG92ZXJDbGFzcyA9IHRoaXMucG9wb3ZlckNsYXNzO1xyXG4gICAgICB0aGlzLl93aW5kb3dSZWYuaW5zdGFuY2UuaWQgPSB0aGlzLl9uZ2JQb3BvdmVyV2luZG93SWQ7XHJcblxyXG4gICAgICB0aGlzLl9yZW5kZXJlci5zZXRBdHRyaWJ1dGUodGhpcy5fZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50LCAnYXJpYS1kZXNjcmliZWRieScsIHRoaXMuX25nYlBvcG92ZXJXaW5kb3dJZCk7XHJcblxyXG4gICAgICBpZiAodGhpcy5jb250YWluZXIgPT09ICdib2R5Jykge1xyXG4gICAgICAgIHRoaXMuX2RvY3VtZW50LnF1ZXJ5U2VsZWN0b3IodGhpcy5jb250YWluZXIpLmFwcGVuZENoaWxkKHRoaXMuX3dpbmRvd1JlZi5sb2NhdGlvbi5uYXRpdmVFbGVtZW50KTtcclxuICAgICAgfVxyXG5cclxuICAgICAgLy8gYXBwbHkgc3R5bGluZyB0byBzZXQgYmFzaWMgY3NzLWNsYXNzZXMgb24gdGFyZ2V0IGVsZW1lbnQsIGJlZm9yZSBnb2luZyBmb3IgcG9zaXRpb25pbmdcclxuICAgICAgdGhpcy5fd2luZG93UmVmLmNoYW5nZURldGVjdG9yUmVmLmRldGVjdENoYW5nZXMoKTtcclxuICAgICAgdGhpcy5fd2luZG93UmVmLmNoYW5nZURldGVjdG9yUmVmLm1hcmtGb3JDaGVjaygpO1xyXG5cclxuICAgICAgLy8gcG9zaXRpb24gcG9wb3ZlciBhbG9uZyB0aGUgZWxlbWVudFxyXG4gICAgICB0aGlzLl93aW5kb3dSZWYuaW5zdGFuY2UuYXBwbHlQbGFjZW1lbnQoXHJcbiAgICAgICAgICBwb3NpdGlvbkVsZW1lbnRzKFxyXG4gICAgICAgICAgICAgIHRoaXMuX2VsZW1lbnRSZWYubmF0aXZlRWxlbWVudCwgdGhpcy5fd2luZG93UmVmLmxvY2F0aW9uLm5hdGl2ZUVsZW1lbnQsIHRoaXMucGxhY2VtZW50LFxyXG4gICAgICAgICAgICAgIHRoaXMuY29udGFpbmVyID09PSAnYm9keScpKTtcclxuXHJcbiAgICAgIGlmICh0aGlzLmF1dG9DbG9zZSkge1xyXG4gICAgICAgIHRoaXMuX25nWm9uZS5ydW5PdXRzaWRlQW5ndWxhcigoKSA9PiB7XHJcbiAgICAgICAgICAvLyBwcmV2ZW50cyBhdXRvbWF0aWMgY2xvc2luZyByaWdodCBhZnRlciBhbiBvcGVuaW5nIGJ5IHB1dHRpbmcgYSBndWFyZCBmb3IgdGhlIHRpbWUgb2Ygb25lIGV2ZW50IGhhbmRsaW5nXHJcbiAgICAgICAgICAvLyBwYXNzXHJcbiAgICAgICAgICAvLyB1c2UgY2FzZTogY2xpY2sgZXZlbnQgd291bGQgcmVhY2ggYW4gZWxlbWVudCBvcGVuaW5nIHRoZSBwb3BvdmVyIGZpcnN0LCB0aGVuIHJlYWNoIHRoZSBhdXRvQ2xvc2UgaGFuZGxlclxyXG4gICAgICAgICAgLy8gd2hpY2ggd291bGQgY2xvc2UgaXRcclxuICAgICAgICAgIGxldCBqdXN0T3BlbmVkID0gdHJ1ZTtcclxuICAgICAgICAgIHJlcXVlc3RBbmltYXRpb25GcmFtZSgoKSA9PiBqdXN0T3BlbmVkID0gZmFsc2UpO1xyXG5cclxuICAgICAgICAgIGNvbnN0IGVzY2FwZXMkID0gZnJvbUV2ZW50PEtleWJvYXJkRXZlbnQ+KHRoaXMuX2RvY3VtZW50LCAna2V5dXAnKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLnBpcGUodGFrZVVudGlsKHRoaXMuaGlkZGVuKSwgZmlsdGVyKGV2ZW50ID0+IGV2ZW50LndoaWNoID09PSBLZXkuRXNjYXBlKSk7XHJcblxyXG4gICAgICAgICAgY29uc3QgY2xpY2tzJCA9IGZyb21FdmVudDxNb3VzZUV2ZW50Pih0aGlzLl9kb2N1bWVudCwgJ2NsaWNrJylcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLnBpcGUoXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0YWtlVW50aWwodGhpcy5oaWRkZW4pLCBmaWx0ZXIoKCkgPT4gIWp1c3RPcGVuZWQpLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZmlsdGVyKGV2ZW50ID0+IHRoaXMuX3Nob3VsZENsb3NlRnJvbUNsaWNrKGV2ZW50KSkpO1xyXG5cclxuICAgICAgICAgIHJhY2U8RXZlbnQ+KFtlc2NhcGVzJCwgY2xpY2tzJF0pLnN1YnNjcmliZSgoKSA9PiB0aGlzLl9uZ1pvbmUucnVuKCgpID0+IHRoaXMuY2xvc2UoKSkpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICB9XHJcblxyXG4gICAgICB0aGlzLnNob3duLmVtaXQoKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIENsb3NlcyBhbiBlbGVtZW50w6LCgMKZcyBwb3BvdmVyLiBUaGlzIGlzIGNvbnNpZGVyZWQgYSDDosKAwpxtYW51YWzDosKAwp0gdHJpZ2dlcmluZyBvZiB0aGUgcG9wb3Zlci5cclxuICAgKi9cclxuICBjbG9zZSgpOiB2b2lkIHtcclxuICAgIGlmICh0aGlzLl93aW5kb3dSZWYpIHtcclxuICAgICAgdGhpcy5fcmVuZGVyZXIucmVtb3ZlQXR0cmlidXRlKHRoaXMuX2VsZW1lbnRSZWYubmF0aXZlRWxlbWVudCwgJ2FyaWEtZGVzY3JpYmVkYnknKTtcclxuICAgICAgdGhpcy5fcG9wdXBTZXJ2aWNlLmNsb3NlKCk7XHJcbiAgICAgIHRoaXMuX3dpbmRvd1JlZiA9IG51bGw7XHJcbiAgICAgIHRoaXMuaGlkZGVuLmVtaXQoKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFRvZ2dsZXMgYW4gZWxlbWVudMOiwoDCmXMgcG9wb3Zlci4gVGhpcyBpcyBjb25zaWRlcmVkIGEgw6LCgMKcbWFudWFsw6LCgMKdIHRyaWdnZXJpbmcgb2YgdGhlIHBvcG92ZXIuXHJcbiAgICovXHJcbiAgdG9nZ2xlKCk6IHZvaWQge1xyXG4gICAgaWYgKHRoaXMuX3dpbmRvd1JlZikge1xyXG4gICAgICB0aGlzLmNsb3NlKCk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB0aGlzLm9wZW4oKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFJldHVybnMgd2hldGhlciBvciBub3QgdGhlIHBvcG92ZXIgaXMgY3VycmVudGx5IGJlaW5nIHNob3duXHJcbiAgICovXHJcbiAgaXNPcGVuKCk6IGJvb2xlYW4geyByZXR1cm4gdGhpcy5fd2luZG93UmVmICE9IG51bGw7IH1cclxuXHJcbiAgbmdPbkluaXQoKSB7XHJcbiAgICB0aGlzLl91bnJlZ2lzdGVyTGlzdGVuZXJzRm4gPSBsaXN0ZW5Ub1RyaWdnZXJzKFxyXG4gICAgICAgIHRoaXMuX3JlbmRlcmVyLCB0aGlzLl9lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQsIHRoaXMudHJpZ2dlcnMsIHRoaXMub3Blbi5iaW5kKHRoaXMpLCB0aGlzLmNsb3NlLmJpbmQodGhpcyksXHJcbiAgICAgICAgdGhpcy50b2dnbGUuYmluZCh0aGlzKSk7XHJcbiAgfVxyXG5cclxuICBuZ09uQ2hhbmdlcyhjaGFuZ2VzOiBTaW1wbGVDaGFuZ2VzKSB7XHJcbiAgICAvLyBjbG9zZSBwb3BvdmVyIGlmIHRpdGxlIGFuZCBjb250ZW50IGJlY29tZSBlbXB0eSwgb3IgZGlzYWJsZVBvcG92ZXIgc2V0IHRvIHRydWVcclxuICAgIGlmICgoY2hhbmdlc1snbmdiUG9wb3ZlciddIHx8IGNoYW5nZXNbJ3BvcG92ZXJUaXRsZSddIHx8IGNoYW5nZXNbJ2Rpc2FibGVQb3BvdmVyJ10pICYmIHRoaXMuX2lzRGlzYWJsZWQoKSkge1xyXG4gICAgICB0aGlzLmNsb3NlKCk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBuZ09uRGVzdHJveSgpIHtcclxuICAgIHRoaXMuY2xvc2UoKTtcclxuICAgIHRoaXMuX3VucmVnaXN0ZXJMaXN0ZW5lcnNGbigpO1xyXG4gICAgdGhpcy5fem9uZVN1YnNjcmlwdGlvbi51bnN1YnNjcmliZSgpO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBfc2hvdWxkQ2xvc2VGcm9tQ2xpY2soZXZlbnQ6IE1vdXNlRXZlbnQpIHtcclxuICAgIGlmIChldmVudC5idXR0b24gIT09IDIpIHtcclxuICAgICAgaWYgKHRoaXMuYXV0b0Nsb3NlID09PSB0cnVlKSB7XHJcbiAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgIH0gZWxzZSBpZiAodGhpcy5hdXRvQ2xvc2UgPT09ICdpbnNpZGUnICYmIHRoaXMuX2lzRXZlbnRGcm9tUG9wb3ZlcihldmVudCkpIHtcclxuICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgfSBlbHNlIGlmICh0aGlzLmF1dG9DbG9zZSA9PT0gJ291dHNpZGUnICYmICF0aGlzLl9pc0V2ZW50RnJvbVBvcG92ZXIoZXZlbnQpKSB7XHJcbiAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICAgIHJldHVybiBmYWxzZTtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgX2lzRXZlbnRGcm9tUG9wb3ZlcihldmVudDogTW91c2VFdmVudCkge1xyXG4gICAgY29uc3QgcG9wdXAgPSB0aGlzLl93aW5kb3dSZWYuaW5zdGFuY2U7XHJcbiAgICByZXR1cm4gcG9wdXAgPyBwb3B1cC5pc0V2ZW50RnJvbShldmVudCkgOiBmYWxzZTtcclxuICB9XHJcbn1cclxuIiwiaW1wb3J0IHtOZ01vZHVsZSwgTW9kdWxlV2l0aFByb3ZpZGVyc30gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcblxyXG5pbXBvcnQge05nYlBvcG92ZXIsIE5nYlBvcG92ZXJXaW5kb3d9IGZyb20gJy4vcG9wb3Zlcic7XHJcbmltcG9ydCB7Q29tbW9uTW9kdWxlfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xyXG5cclxuZXhwb3J0IHtOZ2JQb3BvdmVyfSBmcm9tICcuL3BvcG92ZXInO1xyXG5leHBvcnQge05nYlBvcG92ZXJDb25maWd9IGZyb20gJy4vcG9wb3Zlci1jb25maWcnO1xyXG5leHBvcnQge1BsYWNlbWVudH0gZnJvbSAnLi4vdXRpbC9wb3NpdGlvbmluZyc7XHJcblxyXG5ATmdNb2R1bGUoe1xyXG4gIGRlY2xhcmF0aW9uczogW05nYlBvcG92ZXIsIE5nYlBvcG92ZXJXaW5kb3ddLFxyXG4gIGV4cG9ydHM6IFtOZ2JQb3BvdmVyXSxcclxuICBpbXBvcnRzOiBbQ29tbW9uTW9kdWxlXSxcclxuICBlbnRyeUNvbXBvbmVudHM6IFtOZ2JQb3BvdmVyV2luZG93XVxyXG59KVxyXG5leHBvcnQgY2xhc3MgTmdiUG9wb3Zlck1vZHVsZSB7XHJcbiAgLyoqXHJcbiAgICogSW1wb3J0aW5nIHdpdGggJy5mb3JSb290KCknIGlzIG5vIGxvbmdlciBuZWNlc3NhcnksIHlvdSBjYW4gc2ltcGx5IGltcG9ydCB0aGUgbW9kdWxlLlxyXG4gICAqIFdpbGwgYmUgcmVtb3ZlZCBpbiA0LjAuMC5cclxuICAgKlxyXG4gICAqIEBkZXByZWNhdGVkIDMuMC4wXHJcbiAgICovXHJcbiAgc3RhdGljIGZvclJvb3QoKTogTW9kdWxlV2l0aFByb3ZpZGVycyB7IHJldHVybiB7bmdNb2R1bGU6IE5nYlBvcG92ZXJNb2R1bGV9OyB9XHJcbn1cclxuIiwiaW1wb3J0IHtJbmplY3RhYmxlfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuXHJcbi8qKlxyXG4gKiBDb25maWd1cmF0aW9uIHNlcnZpY2UgZm9yIHRoZSBOZ2JQcm9ncmVzc2JhciBjb21wb25lbnQuXHJcbiAqIFlvdSBjYW4gaW5qZWN0IHRoaXMgc2VydmljZSwgdHlwaWNhbGx5IGluIHlvdXIgcm9vdCBjb21wb25lbnQsIGFuZCBjdXN0b21pemUgdGhlIHZhbHVlcyBvZiBpdHMgcHJvcGVydGllcyBpblxyXG4gKiBvcmRlciB0byBwcm92aWRlIGRlZmF1bHQgdmFsdWVzIGZvciBhbGwgdGhlIHByb2dyZXNzIGJhcnMgdXNlZCBpbiB0aGUgYXBwbGljYXRpb24uXHJcbiAqL1xyXG5ASW5qZWN0YWJsZSh7cHJvdmlkZWRJbjogJ3Jvb3QnfSlcclxuZXhwb3J0IGNsYXNzIE5nYlByb2dyZXNzYmFyQ29uZmlnIHtcclxuICBtYXggPSAxMDA7XHJcbiAgYW5pbWF0ZWQgPSBmYWxzZTtcclxuICBzdHJpcGVkID0gZmFsc2U7XHJcbiAgdHlwZTogc3RyaW5nO1xyXG4gIHNob3dWYWx1ZSA9IGZhbHNlO1xyXG4gIGhlaWdodDogc3RyaW5nO1xyXG59XHJcbiIsImltcG9ydCB7Q29tcG9uZW50LCBJbnB1dCwgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3l9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQge2dldFZhbHVlSW5SYW5nZX0gZnJvbSAnLi4vdXRpbC91dGlsJztcclxuaW1wb3J0IHtOZ2JQcm9ncmVzc2JhckNvbmZpZ30gZnJvbSAnLi9wcm9ncmVzc2Jhci1jb25maWcnO1xyXG5cclxuLyoqXHJcbiAqIERpcmVjdGl2ZSB0aGF0IGNhbiBiZSB1c2VkIHRvIHByb3ZpZGUgZmVlZGJhY2sgb24gdGhlIHByb2dyZXNzIG9mIGEgd29ya2Zsb3cgb3IgYW4gYWN0aW9uLlxyXG4gKi9cclxuQENvbXBvbmVudCh7XHJcbiAgc2VsZWN0b3I6ICduZ2ItcHJvZ3Jlc3NiYXInLFxyXG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoLFxyXG4gIHRlbXBsYXRlOiBgXHJcbiAgICA8ZGl2IGNsYXNzPVwicHJvZ3Jlc3NcIiBbc3R5bGUuaGVpZ2h0XT1cImhlaWdodFwiPlxyXG4gICAgICA8ZGl2IGNsYXNzPVwicHJvZ3Jlc3MtYmFye3t0eXBlID8gJyBiZy0nICsgdHlwZSA6ICcnfX17e2FuaW1hdGVkID8gJyBwcm9ncmVzcy1iYXItYW5pbWF0ZWQnIDogJyd9fXt7c3RyaXBlZCA/XHJcbiAgICAnIHByb2dyZXNzLWJhci1zdHJpcGVkJyA6ICcnfX1cIiByb2xlPVwicHJvZ3Jlc3NiYXJcIiBbc3R5bGUud2lkdGguJV09XCJnZXRQZXJjZW50VmFsdWUoKVwiXHJcbiAgICBbYXR0ci5hcmlhLXZhbHVlbm93XT1cImdldFZhbHVlKClcIiBhcmlhLXZhbHVlbWluPVwiMFwiIFthdHRyLmFyaWEtdmFsdWVtYXhdPVwibWF4XCI+XHJcbiAgICAgICAgPHNwYW4gKm5nSWY9XCJzaG93VmFsdWVcIiBpMThuPVwiQEBuZ2IucHJvZ3Jlc3NiYXIudmFsdWVcIj57e2dldFBlcmNlbnRWYWx1ZSgpfX0lPC9zcGFuPjxuZy1jb250ZW50PjwvbmctY29udGVudD5cclxuICAgICAgPC9kaXY+XHJcbiAgICA8L2Rpdj5cclxuICBgXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBOZ2JQcm9ncmVzc2JhciB7XHJcbiAgLyoqXHJcbiAgICogTWF4aW1hbCB2YWx1ZSB0byBiZSBkaXNwbGF5ZWQgaW4gdGhlIHByb2dyZXNzYmFyLlxyXG4gICAqL1xyXG4gIEBJbnB1dCgpIG1heDogbnVtYmVyO1xyXG5cclxuICAvKipcclxuICAgKiBBIGZsYWcgaW5kaWNhdGluZyBpZiB0aGUgc3RyaXBlcyBvZiB0aGUgcHJvZ3Jlc3MgYmFyIHNob3VsZCBiZSBhbmltYXRlZC4gVGFrZXMgZWZmZWN0IG9ubHkgZm9yIGJyb3dzZXJzXHJcbiAgICogc3VwcG9ydGluZyBDU1MzIGFuaW1hdGlvbnMsIGFuZCBpZiBzdHJpcGVkIGlzIHRydWUuXHJcbiAgICovXHJcbiAgQElucHV0KCkgYW5pbWF0ZWQ6IGJvb2xlYW47XHJcblxyXG4gIC8qKlxyXG4gICAqIEEgZmxhZyBpbmRpY2F0aW5nIGlmIGEgcHJvZ3Jlc3MgYmFyIHNob3VsZCBiZSBkaXNwbGF5ZWQgYXMgc3RyaXBlZC5cclxuICAgKi9cclxuICBASW5wdXQoKSBzdHJpcGVkOiBib29sZWFuO1xyXG5cclxuICAvKipcclxuICAgKiBBIGZsYWcgaW5kaWNhdGluZyBpZiB0aGUgY3VycmVudCBwZXJjZW50YWdlIHZhbHVlIHNob3VsZCBiZSBzaG93bi5cclxuICAgKi9cclxuICBASW5wdXQoKSBzaG93VmFsdWU6IGJvb2xlYW47XHJcblxyXG4gIC8qKlxyXG4gICAqIFR5cGUgb2YgcHJvZ3Jlc3MgYmFyLCBjYW4gYmUgb25lIG9mIFwic3VjY2Vzc1wiLCBcImluZm9cIiwgXCJ3YXJuaW5nXCIgb3IgXCJkYW5nZXJcIi5cclxuICAgKi9cclxuICBASW5wdXQoKSB0eXBlOiBzdHJpbmc7XHJcblxyXG4gIC8qKlxyXG4gICAqIEN1cnJlbnQgdmFsdWUgdG8gYmUgZGlzcGxheWVkIGluIHRoZSBwcm9ncmVzc2Jhci4gU2hvdWxkIGJlIHNtYWxsZXIgb3IgZXF1YWwgdG8gXCJtYXhcIiB2YWx1ZS5cclxuICAgKi9cclxuICBASW5wdXQoKSB2YWx1ZSA9IDA7XHJcblxyXG4gIC8qKlxyXG4gICAqIEhlaWdodCBvZiB0aGUgcHJvZ3Jlc3MgYmFyLiBBY2NlcHRzIGFueSB2YWxpZCBDU1MgaGVpZ2h0IHZhbHVlcywgZXguICcycmVtJ1xyXG4gICAqL1xyXG4gIEBJbnB1dCgpIGhlaWdodDogc3RyaW5nO1xyXG5cclxuICBjb25zdHJ1Y3Rvcihjb25maWc6IE5nYlByb2dyZXNzYmFyQ29uZmlnKSB7XHJcbiAgICB0aGlzLm1heCA9IGNvbmZpZy5tYXg7XHJcbiAgICB0aGlzLmFuaW1hdGVkID0gY29uZmlnLmFuaW1hdGVkO1xyXG4gICAgdGhpcy5zdHJpcGVkID0gY29uZmlnLnN0cmlwZWQ7XHJcbiAgICB0aGlzLnR5cGUgPSBjb25maWcudHlwZTtcclxuICAgIHRoaXMuc2hvd1ZhbHVlID0gY29uZmlnLnNob3dWYWx1ZTtcclxuICAgIHRoaXMuaGVpZ2h0ID0gY29uZmlnLmhlaWdodDtcclxuICB9XHJcblxyXG4gIGdldFZhbHVlKCkgeyByZXR1cm4gZ2V0VmFsdWVJblJhbmdlKHRoaXMudmFsdWUsIHRoaXMubWF4KTsgfVxyXG5cclxuICBnZXRQZXJjZW50VmFsdWUoKSB7IHJldHVybiAxMDAgKiB0aGlzLmdldFZhbHVlKCkgLyB0aGlzLm1heDsgfVxyXG59XHJcbiIsImltcG9ydCB7TmdNb2R1bGUsIE1vZHVsZVdpdGhQcm92aWRlcnN9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQge0NvbW1vbk1vZHVsZX0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcclxuXHJcbmltcG9ydCB7TmdiUHJvZ3Jlc3NiYXJ9IGZyb20gJy4vcHJvZ3Jlc3NiYXInO1xyXG5cclxuZXhwb3J0IHtOZ2JQcm9ncmVzc2Jhcn0gZnJvbSAnLi9wcm9ncmVzc2Jhcic7XHJcbmV4cG9ydCB7TmdiUHJvZ3Jlc3NiYXJDb25maWd9IGZyb20gJy4vcHJvZ3Jlc3NiYXItY29uZmlnJztcclxuXHJcbkBOZ01vZHVsZSh7ZGVjbGFyYXRpb25zOiBbTmdiUHJvZ3Jlc3NiYXJdLCBleHBvcnRzOiBbTmdiUHJvZ3Jlc3NiYXJdLCBpbXBvcnRzOiBbQ29tbW9uTW9kdWxlXX0pXHJcbmV4cG9ydCBjbGFzcyBOZ2JQcm9ncmVzc2Jhck1vZHVsZSB7XHJcbiAgLyoqXHJcbiAgICogSW1wb3J0aW5nIHdpdGggJy5mb3JSb290KCknIGlzIG5vIGxvbmdlciBuZWNlc3NhcnksIHlvdSBjYW4gc2ltcGx5IGltcG9ydCB0aGUgbW9kdWxlLlxyXG4gICAqIFdpbGwgYmUgcmVtb3ZlZCBpbiA0LjAuMC5cclxuICAgKlxyXG4gICAqIEBkZXByZWNhdGVkIDMuMC4wXHJcbiAgICovXHJcbiAgc3RhdGljIGZvclJvb3QoKTogTW9kdWxlV2l0aFByb3ZpZGVycyB7IHJldHVybiB7bmdNb2R1bGU6IE5nYlByb2dyZXNzYmFyTW9kdWxlfTsgfVxyXG59XHJcbiIsImltcG9ydCB7SW5qZWN0YWJsZX0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcblxyXG4vKipcclxuICogQ29uZmlndXJhdGlvbiBzZXJ2aWNlIGZvciB0aGUgTmdiUmF0aW5nIGNvbXBvbmVudC5cclxuICogWW91IGNhbiBpbmplY3QgdGhpcyBzZXJ2aWNlLCB0eXBpY2FsbHkgaW4geW91ciByb290IGNvbXBvbmVudCwgYW5kIGN1c3RvbWl6ZSB0aGUgdmFsdWVzIG9mIGl0cyBwcm9wZXJ0aWVzIGluXHJcbiAqIG9yZGVyIHRvIHByb3ZpZGUgZGVmYXVsdCB2YWx1ZXMgZm9yIGFsbCB0aGUgcmF0aW5ncyB1c2VkIGluIHRoZSBhcHBsaWNhdGlvbi5cclxuICovXHJcbkBJbmplY3RhYmxlKHtwcm92aWRlZEluOiAncm9vdCd9KVxyXG5leHBvcnQgY2xhc3MgTmdiUmF0aW5nQ29uZmlnIHtcclxuICBtYXggPSAxMDtcclxuICByZWFkb25seSA9IGZhbHNlO1xyXG4gIHJlc2V0dGFibGUgPSBmYWxzZTtcclxufVxyXG4iLCJpbXBvcnQge1xyXG4gIENvbXBvbmVudCxcclxuICBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSxcclxuICBJbnB1dCxcclxuICBPdXRwdXQsXHJcbiAgRXZlbnRFbWl0dGVyLFxyXG4gIE9uSW5pdCxcclxuICBUZW1wbGF0ZVJlZixcclxuICBPbkNoYW5nZXMsXHJcbiAgU2ltcGxlQ2hhbmdlcyxcclxuICBDb250ZW50Q2hpbGQsXHJcbiAgZm9yd2FyZFJlZixcclxuICBDaGFuZ2VEZXRlY3RvclJlZlxyXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQge05nYlJhdGluZ0NvbmZpZ30gZnJvbSAnLi9yYXRpbmctY29uZmlnJztcclxuaW1wb3J0IHt0b1N0cmluZywgZ2V0VmFsdWVJblJhbmdlfSBmcm9tICcuLi91dGlsL3V0aWwnO1xyXG5pbXBvcnQge0tleX0gZnJvbSAnLi4vdXRpbC9rZXknO1xyXG5pbXBvcnQge0NvbnRyb2xWYWx1ZUFjY2Vzc29yLCBOR19WQUxVRV9BQ0NFU1NPUn0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xyXG5cclxuLyoqXHJcbiAqIENvbnRleHQgZm9yIHRoZSBjdXN0b20gc3RhciBkaXNwbGF5IHRlbXBsYXRlXHJcbiAqL1xyXG5leHBvcnQgaW50ZXJmYWNlIFN0YXJUZW1wbGF0ZUNvbnRleHQge1xyXG4gIC8qKlxyXG4gICAqIFN0YXIgZmlsbCBwZXJjZW50YWdlLiBBbiBpbnRlZ2VyIHZhbHVlIGJldHdlZW4gMCBhbmQgMTAwXHJcbiAgICovXHJcbiAgZmlsbDogbnVtYmVyO1xyXG5cclxuICAvKipcclxuICAgKiBJbmRleCBvZiB0aGUgc3Rhci5cclxuICAgKi9cclxuICBpbmRleDogbnVtYmVyO1xyXG59XHJcblxyXG5jb25zdCBOR0JfUkFUSU5HX1ZBTFVFX0FDQ0VTU09SID0ge1xyXG4gIHByb3ZpZGU6IE5HX1ZBTFVFX0FDQ0VTU09SLFxyXG4gIHVzZUV4aXN0aW5nOiBmb3J3YXJkUmVmKCgpID0+IE5nYlJhdGluZyksXHJcbiAgbXVsdGk6IHRydWVcclxufTtcclxuXHJcbi8qKlxyXG4gKiBSYXRpbmcgZGlyZWN0aXZlIHRoYXQgd2lsbCB0YWtlIGNhcmUgb2YgdmlzdWFsaXNpbmcgYSBzdGFyIHJhdGluZyBiYXIuXHJcbiAqL1xyXG5AQ29tcG9uZW50KHtcclxuICBzZWxlY3RvcjogJ25nYi1yYXRpbmcnLFxyXG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoLFxyXG4gIGhvc3Q6IHtcclxuICAgICdjbGFzcyc6ICdkLWlubGluZS1mbGV4JyxcclxuICAgICd0YWJpbmRleCc6ICcwJyxcclxuICAgICdyb2xlJzogJ3NsaWRlcicsXHJcbiAgICAnYXJpYS12YWx1ZW1pbic6ICcwJyxcclxuICAgICdbYXR0ci5hcmlhLXZhbHVlbWF4XSc6ICdtYXgnLFxyXG4gICAgJ1thdHRyLmFyaWEtdmFsdWVub3ddJzogJ25leHRSYXRlJyxcclxuICAgICdbYXR0ci5hcmlhLXZhbHVldGV4dF0nOiAnYXJpYVZhbHVlVGV4dCgpJyxcclxuICAgICdbYXR0ci5hcmlhLWRpc2FibGVkXSc6ICdyZWFkb25seSA/IHRydWUgOiBudWxsJyxcclxuICAgICcoYmx1ciknOiAnaGFuZGxlQmx1cigpJyxcclxuICAgICcoa2V5ZG93biknOiAnaGFuZGxlS2V5RG93bigkZXZlbnQpJyxcclxuICAgICcobW91c2VsZWF2ZSknOiAncmVzZXQoKSdcclxuICB9LFxyXG4gIHRlbXBsYXRlOiBgXHJcbiAgICA8bmctdGVtcGxhdGUgI3QgbGV0LWZpbGw9XCJmaWxsXCI+e3sgZmlsbCA9PT0gMTAwID8gJyYjOTczMzsnIDogJyYjOTczNDsnIH19PC9uZy10ZW1wbGF0ZT5cclxuICAgIDxuZy10ZW1wbGF0ZSBuZ0ZvciBbbmdGb3JPZl09XCJjb250ZXh0c1wiIGxldC1pbmRleD1cImluZGV4XCI+XHJcbiAgICAgIDxzcGFuIGNsYXNzPVwic3Itb25seVwiPih7eyBpbmRleCA8IG5leHRSYXRlID8gJyonIDogJyAnIH19KTwvc3Bhbj5cclxuICAgICAgPHNwYW4gKG1vdXNlZW50ZXIpPVwiZW50ZXIoaW5kZXggKyAxKVwiIChjbGljayk9XCJoYW5kbGVDbGljayhpbmRleCArIDEpXCIgW3N0eWxlLmN1cnNvcl09XCJyZWFkb25seSB8fCBkaXNhYmxlZCA/ICdkZWZhdWx0JyA6ICdwb2ludGVyJ1wiPlxyXG4gICAgICAgIDxuZy10ZW1wbGF0ZSBbbmdUZW1wbGF0ZU91dGxldF09XCJzdGFyVGVtcGxhdGUgfHwgdFwiIFtuZ1RlbXBsYXRlT3V0bGV0Q29udGV4dF09XCJjb250ZXh0c1tpbmRleF1cIj48L25nLXRlbXBsYXRlPlxyXG4gICAgICA8L3NwYW4+XHJcbiAgICA8L25nLXRlbXBsYXRlPlxyXG4gIGAsXHJcbiAgcHJvdmlkZXJzOiBbTkdCX1JBVElOR19WQUxVRV9BQ0NFU1NPUl1cclxufSlcclxuZXhwb3J0IGNsYXNzIE5nYlJhdGluZyBpbXBsZW1lbnRzIENvbnRyb2xWYWx1ZUFjY2Vzc29yLFxyXG4gICAgT25Jbml0LCBPbkNoYW5nZXMge1xyXG4gIGNvbnRleHRzOiBTdGFyVGVtcGxhdGVDb250ZXh0W10gPSBbXTtcclxuICBkaXNhYmxlZCA9IGZhbHNlO1xyXG4gIG5leHRSYXRlOiBudW1iZXI7XHJcblxyXG5cclxuICAvKipcclxuICAgKiBNYXhpbWFsIHJhdGluZyB0aGF0IGNhbiBiZSBnaXZlbiB1c2luZyB0aGlzIHdpZGdldC5cclxuICAgKi9cclxuICBASW5wdXQoKSBtYXg6IG51bWJlcjtcclxuXHJcbiAgLyoqXHJcbiAgICogQ3VycmVudCByYXRpbmcuIENhbiBiZSBhIGRlY2ltYWwgdmFsdWUgbGlrZSAzLjc1XHJcbiAgICovXHJcbiAgQElucHV0KCkgcmF0ZTogbnVtYmVyO1xyXG5cclxuICAvKipcclxuICAgKiBBIGZsYWcgaW5kaWNhdGluZyBpZiByYXRpbmcgY2FuIGJlIHVwZGF0ZWQuXHJcbiAgICovXHJcbiAgQElucHV0KCkgcmVhZG9ubHk6IGJvb2xlYW47XHJcblxyXG4gIC8qKlxyXG4gICAqIEEgZmxhZyBpbmRpY2F0aW5nIGlmIHJhdGluZyBjYW4gYmUgcmVzZXQgdG8gMCBvbiBtb3VzZSBjbGlja1xyXG4gICAqL1xyXG4gIEBJbnB1dCgpIHJlc2V0dGFibGU6IGJvb2xlYW47XHJcblxyXG4gIC8qKlxyXG4gICAqIEEgdGVtcGxhdGUgdG8gb3ZlcnJpZGUgc3RhciBkaXNwbGF5LlxyXG4gICAqIEFsdGVybmF0aXZlbHkgcHV0IGEgPG5nLXRlbXBsYXRlPiBhcyB0aGUgb25seSBjaGlsZCBvZiA8bmdiLXJhdGluZz4gZWxlbWVudFxyXG4gICAqL1xyXG4gIEBJbnB1dCgpIEBDb250ZW50Q2hpbGQoVGVtcGxhdGVSZWYpIHN0YXJUZW1wbGF0ZTogVGVtcGxhdGVSZWY8U3RhclRlbXBsYXRlQ29udGV4dD47XHJcblxyXG4gIC8qKlxyXG4gICAqIEFuIGV2ZW50IGZpcmVkIHdoZW4gYSB1c2VyIGlzIGhvdmVyaW5nIG92ZXIgYSBnaXZlbiByYXRpbmcuXHJcbiAgICogRXZlbnQncyBwYXlsb2FkIGVxdWFscyB0byB0aGUgcmF0aW5nIGJlaW5nIGhvdmVyZWQgb3Zlci5cclxuICAgKi9cclxuICBAT3V0cHV0KCkgaG92ZXIgPSBuZXcgRXZlbnRFbWl0dGVyPG51bWJlcj4oKTtcclxuXHJcbiAgLyoqXHJcbiAgICogQW4gZXZlbnQgZmlyZWQgd2hlbiBhIHVzZXIgc3RvcHMgaG92ZXJpbmcgb3ZlciBhIGdpdmVuIHJhdGluZy5cclxuICAgKiBFdmVudCdzIHBheWxvYWQgZXF1YWxzIHRvIHRoZSByYXRpbmcgb2YgdGhlIGxhc3QgaXRlbSBiZWluZyBob3ZlcmVkIG92ZXIuXHJcbiAgICovXHJcbiAgQE91dHB1dCgpIGxlYXZlID0gbmV3IEV2ZW50RW1pdHRlcjxudW1iZXI+KCk7XHJcblxyXG4gIC8qKlxyXG4gICAqIEFuIGV2ZW50IGZpcmVkIHdoZW4gYSB1c2VyIHNlbGVjdHMgYSBuZXcgcmF0aW5nLlxyXG4gICAqIEV2ZW50J3MgcGF5bG9hZCBlcXVhbHMgdG8gdGhlIG5ld2x5IHNlbGVjdGVkIHJhdGluZy5cclxuICAgKi9cclxuICBAT3V0cHV0KCkgcmF0ZUNoYW5nZSA9IG5ldyBFdmVudEVtaXR0ZXI8bnVtYmVyPih0cnVlKTtcclxuXHJcbiAgb25DaGFuZ2UgPSAoXzogYW55KSA9PiB7fTtcclxuICBvblRvdWNoZWQgPSAoKSA9PiB7fTtcclxuXHJcbiAgY29uc3RydWN0b3IoY29uZmlnOiBOZ2JSYXRpbmdDb25maWcsIHByaXZhdGUgX2NoYW5nZURldGVjdG9yUmVmOiBDaGFuZ2VEZXRlY3RvclJlZikge1xyXG4gICAgdGhpcy5tYXggPSBjb25maWcubWF4O1xyXG4gICAgdGhpcy5yZWFkb25seSA9IGNvbmZpZy5yZWFkb25seTtcclxuICB9XHJcblxyXG4gIGFyaWFWYWx1ZVRleHQoKSB7IHJldHVybiBgJHt0aGlzLm5leHRSYXRlfSBvdXQgb2YgJHt0aGlzLm1heH1gOyB9XHJcblxyXG4gIGVudGVyKHZhbHVlOiBudW1iZXIpOiB2b2lkIHtcclxuICAgIGlmICghdGhpcy5yZWFkb25seSAmJiAhdGhpcy5kaXNhYmxlZCkge1xyXG4gICAgICB0aGlzLl91cGRhdGVTdGF0ZSh2YWx1ZSk7XHJcbiAgICB9XHJcbiAgICB0aGlzLmhvdmVyLmVtaXQodmFsdWUpO1xyXG4gIH1cclxuXHJcbiAgaGFuZGxlQmx1cigpIHsgdGhpcy5vblRvdWNoZWQoKTsgfVxyXG5cclxuICBoYW5kbGVDbGljayh2YWx1ZTogbnVtYmVyKSB7IHRoaXMudXBkYXRlKHRoaXMucmVzZXR0YWJsZSAmJiB0aGlzLnJhdGUgPT09IHZhbHVlID8gMCA6IHZhbHVlKTsgfVxyXG5cclxuICBoYW5kbGVLZXlEb3duKGV2ZW50OiBLZXlib2FyZEV2ZW50KSB7XHJcbiAgICBpZiAoS2V5W3RvU3RyaW5nKGV2ZW50LndoaWNoKV0pIHtcclxuICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcclxuXHJcbiAgICAgIHN3aXRjaCAoZXZlbnQud2hpY2gpIHtcclxuICAgICAgICBjYXNlIEtleS5BcnJvd0Rvd246XHJcbiAgICAgICAgY2FzZSBLZXkuQXJyb3dMZWZ0OlxyXG4gICAgICAgICAgdGhpcy51cGRhdGUodGhpcy5yYXRlIC0gMSk7XHJcbiAgICAgICAgICBicmVhaztcclxuICAgICAgICBjYXNlIEtleS5BcnJvd1VwOlxyXG4gICAgICAgIGNhc2UgS2V5LkFycm93UmlnaHQ6XHJcbiAgICAgICAgICB0aGlzLnVwZGF0ZSh0aGlzLnJhdGUgKyAxKTtcclxuICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIGNhc2UgS2V5LkhvbWU6XHJcbiAgICAgICAgICB0aGlzLnVwZGF0ZSgwKTtcclxuICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIGNhc2UgS2V5LkVuZDpcclxuICAgICAgICAgIHRoaXMudXBkYXRlKHRoaXMubWF4KTtcclxuICAgICAgICAgIGJyZWFrO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBuZ09uQ2hhbmdlcyhjaGFuZ2VzOiBTaW1wbGVDaGFuZ2VzKSB7XHJcbiAgICBpZiAoY2hhbmdlc1sncmF0ZSddKSB7XHJcbiAgICAgIHRoaXMudXBkYXRlKHRoaXMucmF0ZSk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBuZ09uSW5pdCgpOiB2b2lkIHtcclxuICAgIHRoaXMuY29udGV4dHMgPSBBcnJheS5mcm9tKHtsZW5ndGg6IHRoaXMubWF4fSwgKHYsIGspID0+ICh7ZmlsbDogMCwgaW5kZXg6IGt9KSk7XHJcbiAgICB0aGlzLl91cGRhdGVTdGF0ZSh0aGlzLnJhdGUpO1xyXG4gIH1cclxuXHJcbiAgcmVnaXN0ZXJPbkNoYW5nZShmbjogKHZhbHVlOiBhbnkpID0+IGFueSk6IHZvaWQgeyB0aGlzLm9uQ2hhbmdlID0gZm47IH1cclxuXHJcbiAgcmVnaXN0ZXJPblRvdWNoZWQoZm46ICgpID0+IGFueSk6IHZvaWQgeyB0aGlzLm9uVG91Y2hlZCA9IGZuOyB9XHJcblxyXG4gIHJlc2V0KCk6IHZvaWQge1xyXG4gICAgdGhpcy5sZWF2ZS5lbWl0KHRoaXMubmV4dFJhdGUpO1xyXG4gICAgdGhpcy5fdXBkYXRlU3RhdGUodGhpcy5yYXRlKTtcclxuICB9XHJcblxyXG4gIHNldERpc2FibGVkU3RhdGUoaXNEaXNhYmxlZDogYm9vbGVhbikgeyB0aGlzLmRpc2FibGVkID0gaXNEaXNhYmxlZDsgfVxyXG5cclxuICB1cGRhdGUodmFsdWU6IG51bWJlciwgaW50ZXJuYWxDaGFuZ2UgPSB0cnVlKTogdm9pZCB7XHJcbiAgICBjb25zdCBuZXdSYXRlID0gZ2V0VmFsdWVJblJhbmdlKHZhbHVlLCB0aGlzLm1heCwgMCk7XHJcbiAgICBpZiAoIXRoaXMucmVhZG9ubHkgJiYgIXRoaXMuZGlzYWJsZWQgJiYgdGhpcy5yYXRlICE9PSBuZXdSYXRlKSB7XHJcbiAgICAgIHRoaXMucmF0ZSA9IG5ld1JhdGU7XHJcbiAgICAgIHRoaXMucmF0ZUNoYW5nZS5lbWl0KHRoaXMucmF0ZSk7XHJcbiAgICB9XHJcbiAgICBpZiAoaW50ZXJuYWxDaGFuZ2UpIHtcclxuICAgICAgdGhpcy5vbkNoYW5nZSh0aGlzLnJhdGUpO1xyXG4gICAgICB0aGlzLm9uVG91Y2hlZCgpO1xyXG4gICAgfVxyXG4gICAgdGhpcy5fdXBkYXRlU3RhdGUodGhpcy5yYXRlKTtcclxuICB9XHJcblxyXG4gIHdyaXRlVmFsdWUodmFsdWUpIHtcclxuICAgIHRoaXMudXBkYXRlKHZhbHVlLCBmYWxzZSk7XHJcbiAgICB0aGlzLl9jaGFuZ2VEZXRlY3RvclJlZi5tYXJrRm9yQ2hlY2soKTtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgX2dldEZpbGxWYWx1ZShpbmRleDogbnVtYmVyKTogbnVtYmVyIHtcclxuICAgIGNvbnN0IGRpZmYgPSB0aGlzLm5leHRSYXRlIC0gaW5kZXg7XHJcblxyXG4gICAgaWYgKGRpZmYgPj0gMSkge1xyXG4gICAgICByZXR1cm4gMTAwO1xyXG4gICAgfVxyXG4gICAgaWYgKGRpZmYgPCAxICYmIGRpZmYgPiAwKSB7XHJcbiAgICAgIHJldHVybiBOdW1iZXIucGFyc2VJbnQoKGRpZmYgKiAxMDApLnRvRml4ZWQoMikpO1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiAwO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBfdXBkYXRlU3RhdGUobmV4dFZhbHVlOiBudW1iZXIpIHtcclxuICAgIHRoaXMubmV4dFJhdGUgPSBuZXh0VmFsdWU7XHJcbiAgICB0aGlzLmNvbnRleHRzLmZvckVhY2goKGNvbnRleHQsIGluZGV4KSA9PiBjb250ZXh0LmZpbGwgPSB0aGlzLl9nZXRGaWxsVmFsdWUoaW5kZXgpKTtcclxuICB9XHJcbn1cclxuIiwiaW1wb3J0IHtOZ01vZHVsZSwgTW9kdWxlV2l0aFByb3ZpZGVyc30gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7Q29tbW9uTW9kdWxlfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xyXG5cclxuaW1wb3J0IHtOZ2JSYXRpbmd9IGZyb20gJy4vcmF0aW5nJztcclxuXHJcbmV4cG9ydCB7TmdiUmF0aW5nfSBmcm9tICcuL3JhdGluZyc7XHJcbmV4cG9ydCB7TmdiUmF0aW5nQ29uZmlnfSBmcm9tICcuL3JhdGluZy1jb25maWcnO1xyXG5cclxuQE5nTW9kdWxlKHtkZWNsYXJhdGlvbnM6IFtOZ2JSYXRpbmddLCBleHBvcnRzOiBbTmdiUmF0aW5nXSwgaW1wb3J0czogW0NvbW1vbk1vZHVsZV19KVxyXG5leHBvcnQgY2xhc3MgTmdiUmF0aW5nTW9kdWxlIHtcclxuICAvKipcclxuICAgKiBJbXBvcnRpbmcgd2l0aCAnLmZvclJvb3QoKScgaXMgbm8gbG9uZ2VyIG5lY2Vzc2FyeSwgeW91IGNhbiBzaW1wbHkgaW1wb3J0IHRoZSBtb2R1bGUuXHJcbiAgICogV2lsbCBiZSByZW1vdmVkIGluIDQuMC4wLlxyXG4gICAqXHJcbiAgICogQGRlcHJlY2F0ZWQgMy4wLjBcclxuICAgKi9cclxuICBzdGF0aWMgZm9yUm9vdCgpOiBNb2R1bGVXaXRoUHJvdmlkZXJzIHsgcmV0dXJuIHtuZ01vZHVsZTogTmdiUmF0aW5nTW9kdWxlfTsgfVxyXG59XHJcbiIsImltcG9ydCB7SW5qZWN0YWJsZX0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcblxyXG4vKipcclxuICogQ29uZmlndXJhdGlvbiBzZXJ2aWNlIGZvciB0aGUgTmdiVGFic2V0IGNvbXBvbmVudC5cclxuICogWW91IGNhbiBpbmplY3QgdGhpcyBzZXJ2aWNlLCB0eXBpY2FsbHkgaW4geW91ciByb290IGNvbXBvbmVudCwgYW5kIGN1c3RvbWl6ZSB0aGUgdmFsdWVzIG9mIGl0cyBwcm9wZXJ0aWVzIGluXHJcbiAqIG9yZGVyIHRvIHByb3ZpZGUgZGVmYXVsdCB2YWx1ZXMgZm9yIGFsbCB0aGUgdGFic2V0cyB1c2VkIGluIHRoZSBhcHBsaWNhdGlvbi5cclxuICovXHJcbkBJbmplY3RhYmxlKHtwcm92aWRlZEluOiAncm9vdCd9KVxyXG5leHBvcnQgY2xhc3MgTmdiVGFic2V0Q29uZmlnIHtcclxuICBqdXN0aWZ5OiAnc3RhcnQnIHwgJ2NlbnRlcicgfCAnZW5kJyB8ICdmaWxsJyB8ICdqdXN0aWZpZWQnID0gJ3N0YXJ0JztcclxuICBvcmllbnRhdGlvbjogJ2hvcml6b250YWwnIHwgJ3ZlcnRpY2FsJyA9ICdob3Jpem9udGFsJztcclxuICB0eXBlOiAndGFicycgfCAncGlsbHMnID0gJ3RhYnMnO1xyXG59XHJcbiIsImltcG9ydCB7XHJcbiAgQ29tcG9uZW50LFxyXG4gIElucHV0LFxyXG4gIENvbnRlbnRDaGlsZHJlbixcclxuICBRdWVyeUxpc3QsXHJcbiAgRGlyZWN0aXZlLFxyXG4gIFRlbXBsYXRlUmVmLFxyXG4gIENvbnRlbnRDaGlsZCxcclxuICBBZnRlckNvbnRlbnRDaGVja2VkLFxyXG4gIE91dHB1dCxcclxuICBFdmVudEVtaXR0ZXJcclxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHtOZ2JUYWJzZXRDb25maWd9IGZyb20gJy4vdGFic2V0LWNvbmZpZyc7XHJcblxyXG5sZXQgbmV4dElkID0gMDtcclxuXHJcbi8qKlxyXG4gKiBUaGlzIGRpcmVjdGl2ZSBzaG91bGQgYmUgdXNlZCB0byB3cmFwIHRhYiB0aXRsZXMgdGhhdCBuZWVkIHRvIGNvbnRhaW4gSFRNTCBtYXJrdXAgb3Igb3RoZXIgZGlyZWN0aXZlcy5cclxuICovXHJcbkBEaXJlY3RpdmUoe3NlbGVjdG9yOiAnbmctdGVtcGxhdGVbbmdiVGFiVGl0bGVdJ30pXHJcbmV4cG9ydCBjbGFzcyBOZ2JUYWJUaXRsZSB7XHJcbiAgY29uc3RydWN0b3IocHVibGljIHRlbXBsYXRlUmVmOiBUZW1wbGF0ZVJlZjxhbnk+KSB7fVxyXG59XHJcblxyXG4vKipcclxuICogVGhpcyBkaXJlY3RpdmUgbXVzdCBiZSB1c2VkIHRvIHdyYXAgY29udGVudCB0byBiZSBkaXNwbGF5ZWQgaW4gYSB0YWIuXHJcbiAqL1xyXG5ARGlyZWN0aXZlKHtzZWxlY3RvcjogJ25nLXRlbXBsYXRlW25nYlRhYkNvbnRlbnRdJ30pXHJcbmV4cG9ydCBjbGFzcyBOZ2JUYWJDb250ZW50IHtcclxuICBjb25zdHJ1Y3RvcihwdWJsaWMgdGVtcGxhdGVSZWY6IFRlbXBsYXRlUmVmPGFueT4pIHt9XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBBIGRpcmVjdGl2ZSByZXByZXNlbnRpbmcgYW4gaW5kaXZpZHVhbCB0YWIuXHJcbiAqL1xyXG5ARGlyZWN0aXZlKHtzZWxlY3RvcjogJ25nYi10YWInfSlcclxuZXhwb3J0IGNsYXNzIE5nYlRhYiB7XHJcbiAgLyoqXHJcbiAgICogVW5pcXVlIHRhYiBpZGVudGlmaWVyLiBNdXN0IGJlIHVuaXF1ZSBmb3IgdGhlIGVudGlyZSBkb2N1bWVudCBmb3IgcHJvcGVyIGFjY2Vzc2liaWxpdHkgc3VwcG9ydC5cclxuICAgKi9cclxuICBASW5wdXQoKSBpZCA9IGBuZ2ItdGFiLSR7bmV4dElkKyt9YDtcclxuICAvKipcclxuICAgKiBTaW1wbGUgKHN0cmluZyBvbmx5KSB0aXRsZS4gVXNlIHRoZSBcIk5nYlRhYlRpdGxlXCIgZGlyZWN0aXZlIGZvciBtb3JlIGNvbXBsZXggdXNlLWNhc2VzLlxyXG4gICAqL1xyXG4gIEBJbnB1dCgpIHRpdGxlOiBzdHJpbmc7XHJcbiAgLyoqXHJcbiAgICogQWxsb3dzIHRvZ2dsaW5nIGRpc2FibGVkIHN0YXRlIG9mIGEgZ2l2ZW4gc3RhdGUuIERpc2FibGVkIHRhYnMgY2FuJ3QgYmUgc2VsZWN0ZWQuXHJcbiAgICovXHJcbiAgQElucHV0KCkgZGlzYWJsZWQgPSBmYWxzZTtcclxuXHJcbiAgdGl0bGVUcGw6IE5nYlRhYlRpdGxlIHwgbnVsbDtcclxuICBjb250ZW50VHBsOiBOZ2JUYWJDb250ZW50IHwgbnVsbDtcclxuXHJcbiAgQENvbnRlbnRDaGlsZHJlbihOZ2JUYWJUaXRsZSwge2Rlc2NlbmRhbnRzOiBmYWxzZX0pIHRpdGxlVHBsczogUXVlcnlMaXN0PE5nYlRhYlRpdGxlPjtcclxuICBAQ29udGVudENoaWxkcmVuKE5nYlRhYkNvbnRlbnQsIHtkZXNjZW5kYW50czogZmFsc2V9KSBjb250ZW50VHBsczogUXVlcnlMaXN0PE5nYlRhYkNvbnRlbnQ+O1xyXG5cclxuICBuZ0FmdGVyQ29udGVudENoZWNrZWQoKSB7XHJcbiAgICAvLyBXZSBhcmUgdXNpbmcgQENvbnRlbnRDaGlsZHJlbiBpbnN0ZWFkIG9mIEBDb250ZW50Q2hpbGQgYXMgaW4gdGhlIEFuZ3VsYXIgdmVyc2lvbiBiZWluZyB1c2VkXHJcbiAgICAvLyBvbmx5IEBDb250ZW50Q2hpbGRyZW4gYWxsb3dzIHVzIHRvIHNwZWNpZnkgdGhlIHtkZXNjZW5kYW50czogZmFsc2V9IG9wdGlvbi5cclxuICAgIC8vIFdpdGhvdXQge2Rlc2NlbmRhbnRzOiBmYWxzZX0gd2UgYXJlIGhpdHRpbmcgYnVncyBkZXNjcmliZWQgaW46XHJcbiAgICAvLyBodHRwczovL2dpdGh1Yi5jb20vbmctYm9vdHN0cmFwL25nLWJvb3RzdHJhcC9pc3N1ZXMvMjI0MFxyXG4gICAgdGhpcy50aXRsZVRwbCA9IHRoaXMudGl0bGVUcGxzLmZpcnN0O1xyXG4gICAgdGhpcy5jb250ZW50VHBsID0gdGhpcy5jb250ZW50VHBscy5maXJzdDtcclxuICB9XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBUaGUgcGF5bG9hZCBvZiB0aGUgY2hhbmdlIGV2ZW50IGZpcmVkIHJpZ2h0IGJlZm9yZSB0aGUgdGFiIGNoYW5nZVxyXG4gKi9cclxuZXhwb3J0IGludGVyZmFjZSBOZ2JUYWJDaGFuZ2VFdmVudCB7XHJcbiAgLyoqXHJcbiAgICogSWQgb2YgdGhlIGN1cnJlbnRseSBhY3RpdmUgdGFiXHJcbiAgICovXHJcbiAgYWN0aXZlSWQ6IHN0cmluZztcclxuXHJcbiAgLyoqXHJcbiAgICogSWQgb2YgdGhlIG5ld2x5IHNlbGVjdGVkIHRhYlxyXG4gICAqL1xyXG4gIG5leHRJZDogc3RyaW5nO1xyXG5cclxuICAvKipcclxuICAgKiBGdW5jdGlvbiB0aGF0IHdpbGwgcHJldmVudCB0YWIgc3dpdGNoIGlmIGNhbGxlZFxyXG4gICAqL1xyXG4gIHByZXZlbnREZWZhdWx0OiAoKSA9PiB2b2lkO1xyXG59XHJcblxyXG4vKipcclxuICogQSBjb21wb25lbnQgdGhhdCBtYWtlcyBpdCBlYXN5IHRvIGNyZWF0ZSB0YWJiZWQgaW50ZXJmYWNlLlxyXG4gKi9cclxuQENvbXBvbmVudCh7XHJcbiAgc2VsZWN0b3I6ICduZ2ItdGFic2V0JyxcclxuICBleHBvcnRBczogJ25nYlRhYnNldCcsXHJcbiAgdGVtcGxhdGU6IGBcclxuICAgIDx1bCBbY2xhc3NdPVwiJ25hdiBuYXYtJyArIHR5cGUgKyAob3JpZW50YXRpb24gPT0gJ2hvcml6b250YWwnPyAgJyAnICsganVzdGlmeUNsYXNzIDogJyBmbGV4LWNvbHVtbicpXCIgcm9sZT1cInRhYmxpc3RcIj5cclxuICAgICAgPGxpIGNsYXNzPVwibmF2LWl0ZW1cIiAqbmdGb3I9XCJsZXQgdGFiIG9mIHRhYnNcIj5cclxuICAgICAgICA8YSBbaWRdPVwidGFiLmlkXCIgY2xhc3M9XCJuYXYtbGlua1wiIFtjbGFzcy5hY3RpdmVdPVwidGFiLmlkID09PSBhY3RpdmVJZFwiIFtjbGFzcy5kaXNhYmxlZF09XCJ0YWIuZGlzYWJsZWRcIlxyXG4gICAgICAgICAgaHJlZiAoY2xpY2spPVwiISFzZWxlY3QodGFiLmlkKVwiIHJvbGU9XCJ0YWJcIiBbYXR0ci50YWJpbmRleF09XCIodGFiLmRpc2FibGVkID8gJy0xJzogdW5kZWZpbmVkKVwiXHJcbiAgICAgICAgICBbYXR0ci5hcmlhLWNvbnRyb2xzXT1cIighZGVzdHJveU9uSGlkZSB8fCB0YWIuaWQgPT09IGFjdGl2ZUlkID8gdGFiLmlkICsgJy1wYW5lbCcgOiBudWxsKVwiXHJcbiAgICAgICAgICBbYXR0ci5hcmlhLWV4cGFuZGVkXT1cInRhYi5pZCA9PT0gYWN0aXZlSWRcIiBbYXR0ci5hcmlhLWRpc2FibGVkXT1cInRhYi5kaXNhYmxlZFwiPlxyXG4gICAgICAgICAge3t0YWIudGl0bGV9fTxuZy10ZW1wbGF0ZSBbbmdUZW1wbGF0ZU91dGxldF09XCJ0YWIudGl0bGVUcGw/LnRlbXBsYXRlUmVmXCI+PC9uZy10ZW1wbGF0ZT5cclxuICAgICAgICA8L2E+XHJcbiAgICAgIDwvbGk+XHJcbiAgICA8L3VsPlxyXG4gICAgPGRpdiBjbGFzcz1cInRhYi1jb250ZW50XCI+XHJcbiAgICAgIDxuZy10ZW1wbGF0ZSBuZ0ZvciBsZXQtdGFiIFtuZ0Zvck9mXT1cInRhYnNcIj5cclxuICAgICAgICA8ZGl2XHJcbiAgICAgICAgICBjbGFzcz1cInRhYi1wYW5lIHt7dGFiLmlkID09PSBhY3RpdmVJZCA/ICdhY3RpdmUnIDogbnVsbH19XCJcclxuICAgICAgICAgICpuZ0lmPVwiIWRlc3Ryb3lPbkhpZGUgfHwgdGFiLmlkID09PSBhY3RpdmVJZFwiXHJcbiAgICAgICAgICByb2xlPVwidGFicGFuZWxcIlxyXG4gICAgICAgICAgW2F0dHIuYXJpYS1sYWJlbGxlZGJ5XT1cInRhYi5pZFwiIGlkPVwie3t0YWIuaWR9fS1wYW5lbFwiXHJcbiAgICAgICAgICBbYXR0ci5hcmlhLWV4cGFuZGVkXT1cInRhYi5pZCA9PT0gYWN0aXZlSWRcIj5cclxuICAgICAgICAgIDxuZy10ZW1wbGF0ZSBbbmdUZW1wbGF0ZU91dGxldF09XCJ0YWIuY29udGVudFRwbD8udGVtcGxhdGVSZWZcIj48L25nLXRlbXBsYXRlPlxyXG4gICAgICAgIDwvZGl2PlxyXG4gICAgICA8L25nLXRlbXBsYXRlPlxyXG4gICAgPC9kaXY+XHJcbiAgYFxyXG59KVxyXG5leHBvcnQgY2xhc3MgTmdiVGFic2V0IGltcGxlbWVudHMgQWZ0ZXJDb250ZW50Q2hlY2tlZCB7XHJcbiAganVzdGlmeUNsYXNzOiBzdHJpbmc7XHJcblxyXG4gIEBDb250ZW50Q2hpbGRyZW4oTmdiVGFiKSB0YWJzOiBRdWVyeUxpc3Q8TmdiVGFiPjtcclxuXHJcbiAgLyoqXHJcbiAgICogQW4gaWRlbnRpZmllciBvZiBhbiBpbml0aWFsbHkgc2VsZWN0ZWQgKGFjdGl2ZSkgdGFiLiBVc2UgdGhlIFwic2VsZWN0XCIgbWV0aG9kIHRvIHN3aXRjaCBhIHRhYiBwcm9ncmFtbWF0aWNhbGx5LlxyXG4gICAqL1xyXG4gIEBJbnB1dCgpIGFjdGl2ZUlkOiBzdHJpbmc7XHJcblxyXG4gIC8qKlxyXG4gICAqIFdoZXRoZXIgdGhlIGNsb3NlZCB0YWJzIHNob3VsZCBiZSBoaWRkZW4gd2l0aG91dCBkZXN0cm95aW5nIHRoZW1cclxuICAgKi9cclxuICBASW5wdXQoKSBkZXN0cm95T25IaWRlID0gdHJ1ZTtcclxuXHJcbiAgLyoqXHJcbiAgICogVGhlIGhvcml6b250YWwgYWxpZ25tZW50IG9mIHRoZSBuYXYgd2l0aCBmbGV4Ym94IHV0aWxpdGllcy4gQ2FuIGJlIG9uZSBvZiAnc3RhcnQnLCAnY2VudGVyJywgJ2VuZCcsICdmaWxsJyBvclxyXG4gICAqICdqdXN0aWZpZWQnXHJcbiAgICogVGhlIGRlZmF1bHQgdmFsdWUgaXMgJ3N0YXJ0Jy5cclxuICAgKi9cclxuICBASW5wdXQoKVxyXG4gIHNldCBqdXN0aWZ5KGNsYXNzTmFtZTogJ3N0YXJ0JyB8ICdjZW50ZXInIHwgJ2VuZCcgfCAnZmlsbCcgfCAnanVzdGlmaWVkJykge1xyXG4gICAgaWYgKGNsYXNzTmFtZSA9PT0gJ2ZpbGwnIHx8IGNsYXNzTmFtZSA9PT0gJ2p1c3RpZmllZCcpIHtcclxuICAgICAgdGhpcy5qdXN0aWZ5Q2xhc3MgPSBgbmF2LSR7Y2xhc3NOYW1lfWA7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB0aGlzLmp1c3RpZnlDbGFzcyA9IGBqdXN0aWZ5LWNvbnRlbnQtJHtjbGFzc05hbWV9YDtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFRoZSBvcmllbnRhdGlvbiBvZiB0aGUgbmF2IChob3Jpem9udGFsIG9yIHZlcnRpY2FsKS5cclxuICAgKiBUaGUgZGVmYXVsdCB2YWx1ZSBpcyAnaG9yaXpvbnRhbCcuXHJcbiAgICovXHJcbiAgQElucHV0KCkgb3JpZW50YXRpb246ICdob3Jpem9udGFsJyB8ICd2ZXJ0aWNhbCc7XHJcblxyXG4gIC8qKlxyXG4gICAqIFR5cGUgb2YgbmF2aWdhdGlvbiB0byBiZSB1c2VkIGZvciB0YWJzLiBDYW4gYmUgb25lIG9mIEJvb3RzdHJhcCBkZWZpbmVkIHR5cGVzICgndGFicycgb3IgJ3BpbGxzJykuXHJcbiAgICogU2luY2UgMy4wLjAgY2FuIGFsc28gYmUgYW4gYXJiaXRyYXJ5IHN0cmluZyAoZm9yIGN1c3RvbSB0aGVtZXMpLlxyXG4gICAqL1xyXG4gIEBJbnB1dCgpIHR5cGU6ICd0YWJzJyB8ICdwaWxscycgfCBzdHJpbmc7XHJcblxyXG4gIC8qKlxyXG4gICAqIEEgdGFiIGNoYW5nZSBldmVudCBmaXJlZCByaWdodCBiZWZvcmUgdGhlIHRhYiBzZWxlY3Rpb24gaGFwcGVucy4gU2VlIE5nYlRhYkNoYW5nZUV2ZW50IGZvciBwYXlsb2FkIGRldGFpbHNcclxuICAgKi9cclxuICBAT3V0cHV0KCkgdGFiQ2hhbmdlID0gbmV3IEV2ZW50RW1pdHRlcjxOZ2JUYWJDaGFuZ2VFdmVudD4oKTtcclxuXHJcbiAgY29uc3RydWN0b3IoY29uZmlnOiBOZ2JUYWJzZXRDb25maWcpIHtcclxuICAgIHRoaXMudHlwZSA9IGNvbmZpZy50eXBlO1xyXG4gICAgdGhpcy5qdXN0aWZ5ID0gY29uZmlnLmp1c3RpZnk7XHJcbiAgICB0aGlzLm9yaWVudGF0aW9uID0gY29uZmlnLm9yaWVudGF0aW9uO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogU2VsZWN0cyB0aGUgdGFiIHdpdGggdGhlIGdpdmVuIGlkIGFuZCBzaG93cyBpdHMgYXNzb2NpYXRlZCBwYW5lLlxyXG4gICAqIEFueSBvdGhlciB0YWIgdGhhdCB3YXMgcHJldmlvdXNseSBzZWxlY3RlZCBiZWNvbWVzIHVuc2VsZWN0ZWQgYW5kIGl0cyBhc3NvY2lhdGVkIHBhbmUgaXMgaGlkZGVuLlxyXG4gICAqL1xyXG4gIHNlbGVjdCh0YWJJZDogc3RyaW5nKSB7XHJcbiAgICBsZXQgc2VsZWN0ZWRUYWIgPSB0aGlzLl9nZXRUYWJCeUlkKHRhYklkKTtcclxuICAgIGlmIChzZWxlY3RlZFRhYiAmJiAhc2VsZWN0ZWRUYWIuZGlzYWJsZWQgJiYgdGhpcy5hY3RpdmVJZCAhPT0gc2VsZWN0ZWRUYWIuaWQpIHtcclxuICAgICAgbGV0IGRlZmF1bHRQcmV2ZW50ZWQgPSBmYWxzZTtcclxuXHJcbiAgICAgIHRoaXMudGFiQ2hhbmdlLmVtaXQoXHJcbiAgICAgICAgICB7YWN0aXZlSWQ6IHRoaXMuYWN0aXZlSWQsIG5leHRJZDogc2VsZWN0ZWRUYWIuaWQsIHByZXZlbnREZWZhdWx0OiAoKSA9PiB7IGRlZmF1bHRQcmV2ZW50ZWQgPSB0cnVlOyB9fSk7XHJcblxyXG4gICAgICBpZiAoIWRlZmF1bHRQcmV2ZW50ZWQpIHtcclxuICAgICAgICB0aGlzLmFjdGl2ZUlkID0gc2VsZWN0ZWRUYWIuaWQ7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9XHJcblxyXG4gIG5nQWZ0ZXJDb250ZW50Q2hlY2tlZCgpIHtcclxuICAgIC8vIGF1dG8tY29ycmVjdCBhY3RpdmVJZCB0aGF0IG1pZ2h0IGhhdmUgYmVlbiBzZXQgaW5jb3JyZWN0bHkgYXMgaW5wdXRcclxuICAgIGxldCBhY3RpdmVUYWIgPSB0aGlzLl9nZXRUYWJCeUlkKHRoaXMuYWN0aXZlSWQpO1xyXG4gICAgdGhpcy5hY3RpdmVJZCA9IGFjdGl2ZVRhYiA/IGFjdGl2ZVRhYi5pZCA6ICh0aGlzLnRhYnMubGVuZ3RoID8gdGhpcy50YWJzLmZpcnN0LmlkIDogbnVsbCk7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIF9nZXRUYWJCeUlkKGlkOiBzdHJpbmcpOiBOZ2JUYWIge1xyXG4gICAgbGV0IHRhYnNXaXRoSWQ6IE5nYlRhYltdID0gdGhpcy50YWJzLmZpbHRlcih0YWIgPT4gdGFiLmlkID09PSBpZCk7XHJcbiAgICByZXR1cm4gdGFic1dpdGhJZC5sZW5ndGggPyB0YWJzV2l0aElkWzBdIDogbnVsbDtcclxuICB9XHJcbn1cclxuIiwiaW1wb3J0IHtOZ01vZHVsZSwgTW9kdWxlV2l0aFByb3ZpZGVyc30gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7Q29tbW9uTW9kdWxlfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xyXG5cclxuaW1wb3J0IHtOZ2JUYWJzZXQsIE5nYlRhYiwgTmdiVGFiQ29udGVudCwgTmdiVGFiVGl0bGV9IGZyb20gJy4vdGFic2V0JztcclxuXHJcbmV4cG9ydCB7TmdiVGFic2V0LCBOZ2JUYWIsIE5nYlRhYkNvbnRlbnQsIE5nYlRhYlRpdGxlLCBOZ2JUYWJDaGFuZ2VFdmVudH0gZnJvbSAnLi90YWJzZXQnO1xyXG5leHBvcnQge05nYlRhYnNldENvbmZpZ30gZnJvbSAnLi90YWJzZXQtY29uZmlnJztcclxuXHJcbmNvbnN0IE5HQl9UQUJTRVRfRElSRUNUSVZFUyA9IFtOZ2JUYWJzZXQsIE5nYlRhYiwgTmdiVGFiQ29udGVudCwgTmdiVGFiVGl0bGVdO1xyXG5cclxuQE5nTW9kdWxlKHtkZWNsYXJhdGlvbnM6IE5HQl9UQUJTRVRfRElSRUNUSVZFUywgZXhwb3J0czogTkdCX1RBQlNFVF9ESVJFQ1RJVkVTLCBpbXBvcnRzOiBbQ29tbW9uTW9kdWxlXX0pXHJcbmV4cG9ydCBjbGFzcyBOZ2JUYWJzZXRNb2R1bGUge1xyXG4gIC8qKlxyXG4gICAqIEltcG9ydGluZyB3aXRoICcuZm9yUm9vdCgpJyBpcyBubyBsb25nZXIgbmVjZXNzYXJ5LCB5b3UgY2FuIHNpbXBseSBpbXBvcnQgdGhlIG1vZHVsZS5cclxuICAgKiBXaWxsIGJlIHJlbW92ZWQgaW4gNC4wLjAuXHJcbiAgICpcclxuICAgKiBAZGVwcmVjYXRlZCAzLjAuMFxyXG4gICAqL1xyXG4gIHN0YXRpYyBmb3JSb290KCk6IE1vZHVsZVdpdGhQcm92aWRlcnMgeyByZXR1cm4ge25nTW9kdWxlOiBOZ2JUYWJzZXRNb2R1bGV9OyB9XHJcbn1cclxuIiwiaW1wb3J0IHtpc051bWJlciwgdG9JbnRlZ2VyfSBmcm9tICcuLi91dGlsL3V0aWwnO1xyXG5cclxuZXhwb3J0IGNsYXNzIE5nYlRpbWUge1xyXG4gIGhvdXI6IG51bWJlcjtcclxuICBtaW51dGU6IG51bWJlcjtcclxuICBzZWNvbmQ6IG51bWJlcjtcclxuXHJcbiAgY29uc3RydWN0b3IoaG91cj86IG51bWJlciwgbWludXRlPzogbnVtYmVyLCBzZWNvbmQ/OiBudW1iZXIpIHtcclxuICAgIHRoaXMuaG91ciA9IHRvSW50ZWdlcihob3VyKTtcclxuICAgIHRoaXMubWludXRlID0gdG9JbnRlZ2VyKG1pbnV0ZSk7XHJcbiAgICB0aGlzLnNlY29uZCA9IHRvSW50ZWdlcihzZWNvbmQpO1xyXG4gIH1cclxuXHJcbiAgY2hhbmdlSG91cihzdGVwID0gMSkgeyB0aGlzLnVwZGF0ZUhvdXIoKGlzTmFOKHRoaXMuaG91cikgPyAwIDogdGhpcy5ob3VyKSArIHN0ZXApOyB9XHJcblxyXG4gIHVwZGF0ZUhvdXIoaG91cjogbnVtYmVyKSB7XHJcbiAgICBpZiAoaXNOdW1iZXIoaG91cikpIHtcclxuICAgICAgdGhpcy5ob3VyID0gKGhvdXIgPCAwID8gMjQgKyBob3VyIDogaG91cikgJSAyNDtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHRoaXMuaG91ciA9IE5hTjtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIGNoYW5nZU1pbnV0ZShzdGVwID0gMSkgeyB0aGlzLnVwZGF0ZU1pbnV0ZSgoaXNOYU4odGhpcy5taW51dGUpID8gMCA6IHRoaXMubWludXRlKSArIHN0ZXApOyB9XHJcblxyXG4gIHVwZGF0ZU1pbnV0ZShtaW51dGU6IG51bWJlcikge1xyXG4gICAgaWYgKGlzTnVtYmVyKG1pbnV0ZSkpIHtcclxuICAgICAgdGhpcy5taW51dGUgPSBtaW51dGUgJSA2MCA8IDAgPyA2MCArIG1pbnV0ZSAlIDYwIDogbWludXRlICUgNjA7XHJcbiAgICAgIHRoaXMuY2hhbmdlSG91cihNYXRoLmZsb29yKG1pbnV0ZSAvIDYwKSk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB0aGlzLm1pbnV0ZSA9IE5hTjtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIGNoYW5nZVNlY29uZChzdGVwID0gMSkgeyB0aGlzLnVwZGF0ZVNlY29uZCgoaXNOYU4odGhpcy5zZWNvbmQpID8gMCA6IHRoaXMuc2Vjb25kKSArIHN0ZXApOyB9XHJcblxyXG4gIHVwZGF0ZVNlY29uZChzZWNvbmQ6IG51bWJlcikge1xyXG4gICAgaWYgKGlzTnVtYmVyKHNlY29uZCkpIHtcclxuICAgICAgdGhpcy5zZWNvbmQgPSBzZWNvbmQgPCAwID8gNjAgKyBzZWNvbmQgJSA2MCA6IHNlY29uZCAlIDYwO1xyXG4gICAgICB0aGlzLmNoYW5nZU1pbnV0ZShNYXRoLmZsb29yKHNlY29uZCAvIDYwKSk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB0aGlzLnNlY29uZCA9IE5hTjtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIGlzVmFsaWQoY2hlY2tTZWNzID0gdHJ1ZSkge1xyXG4gICAgcmV0dXJuIGlzTnVtYmVyKHRoaXMuaG91cikgJiYgaXNOdW1iZXIodGhpcy5taW51dGUpICYmIChjaGVja1NlY3MgPyBpc051bWJlcih0aGlzLnNlY29uZCkgOiB0cnVlKTtcclxuICB9XHJcblxyXG4gIHRvU3RyaW5nKCkgeyByZXR1cm4gYCR7dGhpcy5ob3VyIHx8IDB9OiR7dGhpcy5taW51dGUgfHwgMH06JHt0aGlzLnNlY29uZCB8fCAwfWA7IH1cclxufVxyXG4iLCJpbXBvcnQge0luamVjdGFibGV9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5cclxuLyoqXHJcbiAqIENvbmZpZ3VyYXRpb24gc2VydmljZSBmb3IgdGhlIE5nYlRpbWVwaWNrZXIgY29tcG9uZW50LlxyXG4gKiBZb3UgY2FuIGluamVjdCB0aGlzIHNlcnZpY2UsIHR5cGljYWxseSBpbiB5b3VyIHJvb3QgY29tcG9uZW50LCBhbmQgY3VzdG9taXplIHRoZSB2YWx1ZXMgb2YgaXRzIHByb3BlcnRpZXMgaW5cclxuICogb3JkZXIgdG8gcHJvdmlkZSBkZWZhdWx0IHZhbHVlcyBmb3IgYWxsIHRoZSB0aW1lcGlja2VycyB1c2VkIGluIHRoZSBhcHBsaWNhdGlvbi5cclxuICovXHJcbkBJbmplY3RhYmxlKHtwcm92aWRlZEluOiAncm9vdCd9KVxyXG5leHBvcnQgY2xhc3MgTmdiVGltZXBpY2tlckNvbmZpZyB7XHJcbiAgbWVyaWRpYW4gPSBmYWxzZTtcclxuICBzcGlubmVycyA9IHRydWU7XHJcbiAgc2Vjb25kcyA9IGZhbHNlO1xyXG4gIGhvdXJTdGVwID0gMTtcclxuICBtaW51dGVTdGVwID0gMTtcclxuICBzZWNvbmRTdGVwID0gMTtcclxuICBkaXNhYmxlZCA9IGZhbHNlO1xyXG4gIHJlYWRvbmx5SW5wdXRzID0gZmFsc2U7XHJcbiAgc2l6ZTogJ3NtYWxsJyB8ICdtZWRpdW0nIHwgJ2xhcmdlJyA9ICdtZWRpdW0nO1xyXG59XHJcbiIsImltcG9ydCB7SW5qZWN0YWJsZX0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7TmdiVGltZVN0cnVjdH0gZnJvbSAnLi9uZ2ItdGltZS1zdHJ1Y3QnO1xyXG5pbXBvcnQge2lzSW50ZWdlcn0gZnJvbSAnLi4vdXRpbC91dGlsJztcclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBOR0JfREFURVBJQ0tFUl9USU1FX0FEQVBURVJfRkFDVE9SWSgpIHtcclxuICByZXR1cm4gbmV3IE5nYlRpbWVTdHJ1Y3RBZGFwdGVyKCk7XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBBYnN0cmFjdCB0eXBlIHNlcnZpbmcgYXMgYSBESSB0b2tlbiBmb3IgdGhlIHNlcnZpY2UgY29udmVydGluZyBmcm9tIHlvdXIgYXBwbGljYXRpb24gVGltZSBtb2RlbCB0byBpbnRlcm5hbFxyXG4gKiBOZ2JUaW1lU3RydWN0IG1vZGVsLlxyXG4gKiBBIGRlZmF1bHQgaW1wbGVtZW50YXRpb24gY29udmVydGluZyBmcm9tIGFuZCB0byBOZ2JUaW1lU3RydWN0IGlzIHByb3ZpZGVkIGZvciByZXRyby1jb21wYXRpYmlsaXR5LFxyXG4gKiBidXQgeW91IGNhbiBwcm92aWRlIGFub3RoZXIgaW1wbGVtZW50YXRpb24gdG8gdXNlIGFuIGFsdGVybmF0aXZlIGZvcm1hdCwgaWUgZm9yIHVzaW5nIHdpdGggbmF0aXZlIERhdGUgT2JqZWN0LlxyXG4gKlxyXG4gKiBAc2luY2UgMi4yLjBcclxuICovXHJcbkBJbmplY3RhYmxlKHtwcm92aWRlZEluOiAncm9vdCcsIHVzZUZhY3Rvcnk6IE5HQl9EQVRFUElDS0VSX1RJTUVfQURBUFRFUl9GQUNUT1JZfSlcclxuZXhwb3J0IGFic3RyYWN0IGNsYXNzIE5nYlRpbWVBZGFwdGVyPFQ+IHtcclxuICAvKipcclxuICAgKiBDb252ZXJ0cyB1c2VyLW1vZGVsIGRhdGUgaW50byBhbiBOZ2JUaW1lU3RydWN0IGZvciBpbnRlcm5hbCB1c2UgaW4gdGhlIGxpYnJhcnlcclxuICAgKi9cclxuICBhYnN0cmFjdCBmcm9tTW9kZWwodmFsdWU6IFQpOiBOZ2JUaW1lU3RydWN0O1xyXG5cclxuICAvKipcclxuICAgKiBDb252ZXJ0cyBpbnRlcm5hbCB0aW1lIHZhbHVlIE5nYlRpbWVTdHJ1Y3QgdG8gdXNlci1tb2RlbCBkYXRlXHJcbiAgICogVGhlIHJldHVybmVkIHR5cGUgaXMgc3VwcG9zZWQgdG8gYmUgb2YgdGhlIHNhbWUgdHlwZSBhcyBmcm9tTW9kZWwoKSBpbnB1dC12YWx1ZSBwYXJhbVxyXG4gICAqL1xyXG4gIGFic3RyYWN0IHRvTW9kZWwodGltZTogTmdiVGltZVN0cnVjdCk6IFQ7XHJcbn1cclxuXHJcbkBJbmplY3RhYmxlKClcclxuZXhwb3J0IGNsYXNzIE5nYlRpbWVTdHJ1Y3RBZGFwdGVyIGV4dGVuZHMgTmdiVGltZUFkYXB0ZXI8TmdiVGltZVN0cnVjdD4ge1xyXG4gIC8qKlxyXG4gICAqIENvbnZlcnRzIGEgTmdiVGltZVN0cnVjdCB2YWx1ZSBpbnRvIE5nYlRpbWVTdHJ1Y3QgdmFsdWVcclxuICAgKi9cclxuICBmcm9tTW9kZWwodGltZTogTmdiVGltZVN0cnVjdCk6IE5nYlRpbWVTdHJ1Y3Qge1xyXG4gICAgcmV0dXJuICh0aW1lICYmIGlzSW50ZWdlcih0aW1lLmhvdXIpICYmIGlzSW50ZWdlcih0aW1lLm1pbnV0ZSkpID9cclxuICAgICAgICB7aG91cjogdGltZS5ob3VyLCBtaW51dGU6IHRpbWUubWludXRlLCBzZWNvbmQ6IGlzSW50ZWdlcih0aW1lLnNlY29uZCkgPyB0aW1lLnNlY29uZCA6IG51bGx9IDpcclxuICAgICAgICBudWxsO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogQ29udmVydHMgYSBOZ2JUaW1lU3RydWN0IHZhbHVlIGludG8gTmdiVGltZVN0cnVjdCB2YWx1ZVxyXG4gICAqL1xyXG4gIHRvTW9kZWwodGltZTogTmdiVGltZVN0cnVjdCk6IE5nYlRpbWVTdHJ1Y3Qge1xyXG4gICAgcmV0dXJuICh0aW1lICYmIGlzSW50ZWdlcih0aW1lLmhvdXIpICYmIGlzSW50ZWdlcih0aW1lLm1pbnV0ZSkpID9cclxuICAgICAgICB7aG91cjogdGltZS5ob3VyLCBtaW51dGU6IHRpbWUubWludXRlLCBzZWNvbmQ6IGlzSW50ZWdlcih0aW1lLnNlY29uZCkgPyB0aW1lLnNlY29uZCA6IG51bGx9IDpcclxuICAgICAgICBudWxsO1xyXG4gIH1cclxufVxyXG4iLCJpbXBvcnQge0NvbXBvbmVudCwgZm9yd2FyZFJlZiwgSW5wdXQsIE9uQ2hhbmdlcywgU2ltcGxlQ2hhbmdlc30gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7Q29udHJvbFZhbHVlQWNjZXNzb3IsIE5HX1ZBTFVFX0FDQ0VTU09SfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XHJcblxyXG5pbXBvcnQge2lzTnVtYmVyLCBwYWROdW1iZXIsIHRvSW50ZWdlcn0gZnJvbSAnLi4vdXRpbC91dGlsJztcclxuaW1wb3J0IHtOZ2JUaW1lfSBmcm9tICcuL25nYi10aW1lJztcclxuaW1wb3J0IHtOZ2JUaW1lcGlja2VyQ29uZmlnfSBmcm9tICcuL3RpbWVwaWNrZXItY29uZmlnJztcclxuaW1wb3J0IHtOZ2JUaW1lQWRhcHRlcn0gZnJvbSAnLi9uZ2ItdGltZS1hZGFwdGVyJztcclxuXHJcbmNvbnN0IE5HQl9USU1FUElDS0VSX1ZBTFVFX0FDQ0VTU09SID0ge1xyXG4gIHByb3ZpZGU6IE5HX1ZBTFVFX0FDQ0VTU09SLFxyXG4gIHVzZUV4aXN0aW5nOiBmb3J3YXJkUmVmKCgpID0+IE5nYlRpbWVwaWNrZXIpLFxyXG4gIG11bHRpOiB0cnVlXHJcbn07XHJcblxyXG4vKipcclxuICogQSBsaWdodHdlaWdodCAmIGNvbmZpZ3VyYWJsZSB0aW1lcGlja2VyIGRpcmVjdGl2ZS5cclxuICovXHJcbkBDb21wb25lbnQoe1xyXG4gIHNlbGVjdG9yOiAnbmdiLXRpbWVwaWNrZXInLFxyXG4gIHN0eWxlczogW2BcclxuXHJcbiAgICA6aG9zdCB7XHJcbiAgICAgIGZvbnQtc2l6ZTogMXJlbTtcclxuICAgIH1cclxuXHJcbiAgICAubmdiLXRwIHtcclxuICAgICAgZGlzcGxheTogLW1zLWZsZXhib3g7XHJcbiAgICAgIGRpc3BsYXk6IGZsZXg7XHJcbiAgICAgIC1tcy1mbGV4LWFsaWduOiBjZW50ZXI7XHJcbiAgICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XHJcbiAgICB9XHJcblxyXG4gICAgLm5nYi10cC1pbnB1dC1jb250YWluZXIge1xyXG4gICAgICB3aWR0aDogNGVtO1xyXG4gICAgfVxyXG5cclxuICAgIC5uZ2ItdHAtaG91ciwgLm5nYi10cC1taW51dGUsIC5uZ2ItdHAtc2Vjb25kLCAubmdiLXRwLW1lcmlkaWFuIHtcclxuICAgICAgZGlzcGxheTogLW1zLWZsZXhib3g7XHJcbiAgICAgIGRpc3BsYXk6IGZsZXg7XHJcbiAgICAgIC1tcy1mbGV4LWRpcmVjdGlvbjogY29sdW1uO1xyXG4gICAgICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xyXG4gICAgICAtbXMtZmxleC1hbGlnbjogY2VudGVyO1xyXG4gICAgICBhbGlnbi1pdGVtczogY2VudGVyO1xyXG4gICAgICAtbXMtZmxleC1wYWNrOiBkaXN0cmlidXRlO1xyXG4gICAgICBqdXN0aWZ5LWNvbnRlbnQ6IHNwYWNlLWFyb3VuZDtcclxuICAgIH1cclxuXHJcbiAgICAubmdiLXRwLXNwYWNlciB7XHJcbiAgICAgIHdpZHRoOiAxZW07XHJcbiAgICAgIHRleHQtYWxpZ246IGNlbnRlcjtcclxuICAgIH1cclxuXHJcbiAgICAuY2hldnJvbjo6YmVmb3JlIHtcclxuICAgICAgYm9yZGVyLXN0eWxlOiBzb2xpZDtcclxuICAgICAgYm9yZGVyLXdpZHRoOiAwLjI5ZW0gMC4yOWVtIDAgMDtcclxuICAgICAgY29udGVudDogJyc7XHJcbiAgICAgIGRpc3BsYXk6IGlubGluZS1ibG9jaztcclxuICAgICAgaGVpZ2h0OiAwLjY5ZW07XHJcbiAgICAgIGxlZnQ6IDAuMDVlbTtcclxuICAgICAgcG9zaXRpb246IHJlbGF0aXZlO1xyXG4gICAgICB0b3A6IDAuMTVlbTtcclxuICAgICAgdHJhbnNmb3JtOiByb3RhdGUoLTQ1ZGVnKTtcclxuICAgICAgLXdlYmtpdC10cmFuc2Zvcm06IHJvdGF0ZSgtNDVkZWcpO1xyXG4gICAgICAtbXMtdHJhbnNmb3JtOiByb3RhdGUoLTQ1ZGVnKTtcclxuICAgICAgdmVydGljYWwtYWxpZ246IG1pZGRsZTtcclxuICAgICAgd2lkdGg6IDAuNzFlbTtcclxuICAgIH1cclxuXHJcbiAgICAuY2hldnJvbi5ib3R0b206YmVmb3JlIHtcclxuICAgICAgdG9wOiAtLjNlbTtcclxuICAgICAgLXdlYmtpdC10cmFuc2Zvcm06IHJvdGF0ZSgxMzVkZWcpO1xyXG4gICAgICAtbXMtdHJhbnNmb3JtOiByb3RhdGUoMTM1ZGVnKTtcclxuICAgICAgdHJhbnNmb3JtOiByb3RhdGUoMTM1ZGVnKTtcclxuICAgIH1cclxuXHJcbiAgICBpbnB1dCB7XHJcbiAgICAgIHRleHQtYWxpZ246IGNlbnRlcjtcclxuICAgIH1cclxuICBgXSxcclxuICB0ZW1wbGF0ZTogYFxyXG4gICAgPGZpZWxkc2V0IFtkaXNhYmxlZF09XCJkaXNhYmxlZFwiIFtjbGFzcy5kaXNhYmxlZF09XCJkaXNhYmxlZFwiPlxyXG4gICAgICA8ZGl2IGNsYXNzPVwibmdiLXRwXCI+XHJcbiAgICAgICAgPGRpdiBjbGFzcz1cIm5nYi10cC1pbnB1dC1jb250YWluZXIgbmdiLXRwLWhvdXJcIj5cclxuICAgICAgICAgIDxidXR0b24gKm5nSWY9XCJzcGlubmVyc1wiIHR5cGU9XCJidXR0b25cIiAoY2xpY2spPVwiY2hhbmdlSG91cihob3VyU3RlcClcIlxyXG4gICAgICAgICAgICBjbGFzcz1cImJ0biBidG4tbGlua1wiIFtjbGFzcy5idG4tc21dPVwiaXNTbWFsbFNpemVcIiBbY2xhc3MuYnRuLWxnXT1cImlzTGFyZ2VTaXplXCIgW2NsYXNzLmRpc2FibGVkXT1cImRpc2FibGVkXCJcclxuICAgICAgICAgICAgW2Rpc2FibGVkXT1cImRpc2FibGVkXCI+XHJcbiAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwiY2hldnJvblwiPjwvc3Bhbj5cclxuICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJzci1vbmx5XCIgaTE4bj1cIkBAbmdiLnRpbWVwaWNrZXIuaW5jcmVtZW50LWhvdXJzXCI+SW5jcmVtZW50IGhvdXJzPC9zcGFuPlxyXG4gICAgICAgICAgPC9idXR0b24+XHJcbiAgICAgICAgICA8aW5wdXQgdHlwZT1cInRleHRcIiBjbGFzcz1cImZvcm0tY29udHJvbFwiIFtjbGFzcy5mb3JtLWNvbnRyb2wtc21dPVwiaXNTbWFsbFNpemVcIiBbY2xhc3MuZm9ybS1jb250cm9sLWxnXT1cImlzTGFyZ2VTaXplXCIgbWF4bGVuZ3RoPVwiMlwiXHJcbiAgICAgICAgICAgIHBsYWNlaG9sZGVyPVwiSEhcIiBpMThuLXBsYWNlaG9sZGVyPVwiQEBuZ2IudGltZXBpY2tlci5ISFwiXHJcbiAgICAgICAgICAgIFt2YWx1ZV09XCJmb3JtYXRIb3VyKG1vZGVsPy5ob3VyKVwiIChjaGFuZ2UpPVwidXBkYXRlSG91cigkZXZlbnQudGFyZ2V0LnZhbHVlKVwiXHJcbiAgICAgICAgICAgIFtyZWFkb25seV09XCJyZWFkb25seUlucHV0c1wiIFtkaXNhYmxlZF09XCJkaXNhYmxlZFwiIGFyaWEtbGFiZWw9XCJIb3Vyc1wiIGkxOG4tYXJpYS1sYWJlbD1cIkBAbmdiLnRpbWVwaWNrZXIuaG91cnNcIj5cclxuICAgICAgICAgIDxidXR0b24gKm5nSWY9XCJzcGlubmVyc1wiIHR5cGU9XCJidXR0b25cIiAoY2xpY2spPVwiY2hhbmdlSG91cigtaG91clN0ZXApXCJcclxuICAgICAgICAgICAgY2xhc3M9XCJidG4gYnRuLWxpbmtcIiBbY2xhc3MuYnRuLXNtXT1cImlzU21hbGxTaXplXCIgW2NsYXNzLmJ0bi1sZ109XCJpc0xhcmdlU2l6ZVwiIFtjbGFzcy5kaXNhYmxlZF09XCJkaXNhYmxlZFwiXHJcbiAgICAgICAgICAgIFtkaXNhYmxlZF09XCJkaXNhYmxlZFwiPlxyXG4gICAgICAgICAgICA8c3BhbiBjbGFzcz1cImNoZXZyb24gYm90dG9tXCI+PC9zcGFuPlxyXG4gICAgICAgICAgICA8c3BhbiBjbGFzcz1cInNyLW9ubHlcIiBpMThuPVwiQEBuZ2IudGltZXBpY2tlci5kZWNyZW1lbnQtaG91cnNcIj5EZWNyZW1lbnQgaG91cnM8L3NwYW4+XHJcbiAgICAgICAgICA8L2J1dHRvbj5cclxuICAgICAgICA8L2Rpdj5cclxuICAgICAgICA8ZGl2IGNsYXNzPVwibmdiLXRwLXNwYWNlclwiPjo8L2Rpdj5cclxuICAgICAgICA8ZGl2IGNsYXNzPVwibmdiLXRwLWlucHV0LWNvbnRhaW5lciBuZ2ItdHAtbWludXRlXCI+XHJcbiAgICAgICAgICA8YnV0dG9uICpuZ0lmPVwic3Bpbm5lcnNcIiB0eXBlPVwiYnV0dG9uXCIgKGNsaWNrKT1cImNoYW5nZU1pbnV0ZShtaW51dGVTdGVwKVwiXHJcbiAgICAgICAgICAgIGNsYXNzPVwiYnRuIGJ0bi1saW5rXCIgW2NsYXNzLmJ0bi1zbV09XCJpc1NtYWxsU2l6ZVwiIFtjbGFzcy5idG4tbGddPVwiaXNMYXJnZVNpemVcIiBbY2xhc3MuZGlzYWJsZWRdPVwiZGlzYWJsZWRcIlxyXG4gICAgICAgICAgICBbZGlzYWJsZWRdPVwiZGlzYWJsZWRcIj5cclxuICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJjaGV2cm9uXCI+PC9zcGFuPlxyXG4gICAgICAgICAgICA8c3BhbiBjbGFzcz1cInNyLW9ubHlcIiBpMThuPVwiQEBuZ2IudGltZXBpY2tlci5pbmNyZW1lbnQtbWludXRlc1wiPkluY3JlbWVudCBtaW51dGVzPC9zcGFuPlxyXG4gICAgICAgICAgPC9idXR0b24+XHJcbiAgICAgICAgICA8aW5wdXQgdHlwZT1cInRleHRcIiBjbGFzcz1cImZvcm0tY29udHJvbFwiIFtjbGFzcy5mb3JtLWNvbnRyb2wtc21dPVwiaXNTbWFsbFNpemVcIiBbY2xhc3MuZm9ybS1jb250cm9sLWxnXT1cImlzTGFyZ2VTaXplXCIgbWF4bGVuZ3RoPVwiMlwiXHJcbiAgICAgICAgICAgIHBsYWNlaG9sZGVyPVwiTU1cIiBpMThuLXBsYWNlaG9sZGVyPVwiQEBuZ2IudGltZXBpY2tlci5NTVwiXHJcbiAgICAgICAgICAgIFt2YWx1ZV09XCJmb3JtYXRNaW5TZWMobW9kZWw/Lm1pbnV0ZSlcIiAoY2hhbmdlKT1cInVwZGF0ZU1pbnV0ZSgkZXZlbnQudGFyZ2V0LnZhbHVlKVwiXHJcbiAgICAgICAgICAgIFtyZWFkb25seV09XCJyZWFkb25seUlucHV0c1wiIFtkaXNhYmxlZF09XCJkaXNhYmxlZFwiIGFyaWEtbGFiZWw9XCJNaW51dGVzXCIgaTE4bi1hcmlhLWxhYmVsPVwiQEBuZ2IudGltZXBpY2tlci5taW51dGVzXCI+XHJcbiAgICAgICAgICA8YnV0dG9uICpuZ0lmPVwic3Bpbm5lcnNcIiB0eXBlPVwiYnV0dG9uXCIgKGNsaWNrKT1cImNoYW5nZU1pbnV0ZSgtbWludXRlU3RlcClcIlxyXG4gICAgICAgICAgICBjbGFzcz1cImJ0biBidG4tbGlua1wiIFtjbGFzcy5idG4tc21dPVwiaXNTbWFsbFNpemVcIiBbY2xhc3MuYnRuLWxnXT1cImlzTGFyZ2VTaXplXCIgIFtjbGFzcy5kaXNhYmxlZF09XCJkaXNhYmxlZFwiXHJcbiAgICAgICAgICAgIFtkaXNhYmxlZF09XCJkaXNhYmxlZFwiPlxyXG4gICAgICAgICAgICA8c3BhbiBjbGFzcz1cImNoZXZyb24gYm90dG9tXCI+PC9zcGFuPlxyXG4gICAgICAgICAgICA8c3BhbiBjbGFzcz1cInNyLW9ubHlcIiAgaTE4bj1cIkBAbmdiLnRpbWVwaWNrZXIuZGVjcmVtZW50LW1pbnV0ZXNcIj5EZWNyZW1lbnQgbWludXRlczwvc3Bhbj5cclxuICAgICAgICAgIDwvYnV0dG9uPlxyXG4gICAgICAgIDwvZGl2PlxyXG4gICAgICAgIDxkaXYgKm5nSWY9XCJzZWNvbmRzXCIgY2xhc3M9XCJuZ2ItdHAtc3BhY2VyXCI+OjwvZGl2PlxyXG4gICAgICAgIDxkaXYgKm5nSWY9XCJzZWNvbmRzXCIgY2xhc3M9XCJuZ2ItdHAtaW5wdXQtY29udGFpbmVyIG5nYi10cC1zZWNvbmRcIj5cclxuICAgICAgICAgIDxidXR0b24gKm5nSWY9XCJzcGlubmVyc1wiIHR5cGU9XCJidXR0b25cIiAoY2xpY2spPVwiY2hhbmdlU2Vjb25kKHNlY29uZFN0ZXApXCJcclxuICAgICAgICAgICAgY2xhc3M9XCJidG4gYnRuLWxpbmtcIiBbY2xhc3MuYnRuLXNtXT1cImlzU21hbGxTaXplXCIgW2NsYXNzLmJ0bi1sZ109XCJpc0xhcmdlU2l6ZVwiIFtjbGFzcy5kaXNhYmxlZF09XCJkaXNhYmxlZFwiXHJcbiAgICAgICAgICAgIFtkaXNhYmxlZF09XCJkaXNhYmxlZFwiPlxyXG4gICAgICAgICAgICA8c3BhbiBjbGFzcz1cImNoZXZyb25cIj48L3NwYW4+XHJcbiAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwic3Itb25seVwiIGkxOG49XCJAQG5nYi50aW1lcGlja2VyLmluY3JlbWVudC1zZWNvbmRzXCI+SW5jcmVtZW50IHNlY29uZHM8L3NwYW4+XHJcbiAgICAgICAgICA8L2J1dHRvbj5cclxuICAgICAgICAgIDxpbnB1dCB0eXBlPVwidGV4dFwiIGNsYXNzPVwiZm9ybS1jb250cm9sXCIgW2NsYXNzLmZvcm0tY29udHJvbC1zbV09XCJpc1NtYWxsU2l6ZVwiIFtjbGFzcy5mb3JtLWNvbnRyb2wtbGddPVwiaXNMYXJnZVNpemVcIiBtYXhsZW5ndGg9XCIyXCJcclxuICAgICAgICAgICAgcGxhY2Vob2xkZXI9XCJTU1wiIGkxOG4tcGxhY2Vob2xkZXI9XCJAQG5nYi50aW1lcGlja2VyLlNTXCJcclxuICAgICAgICAgICAgW3ZhbHVlXT1cImZvcm1hdE1pblNlYyhtb2RlbD8uc2Vjb25kKVwiIChjaGFuZ2UpPVwidXBkYXRlU2Vjb25kKCRldmVudC50YXJnZXQudmFsdWUpXCJcclxuICAgICAgICAgICAgW3JlYWRvbmx5XT1cInJlYWRvbmx5SW5wdXRzXCIgW2Rpc2FibGVkXT1cImRpc2FibGVkXCIgYXJpYS1sYWJlbD1cIlNlY29uZHNcIiBpMThuLWFyaWEtbGFiZWw9XCJAQG5nYi50aW1lcGlja2VyLnNlY29uZHNcIj5cclxuICAgICAgICAgIDxidXR0b24gKm5nSWY9XCJzcGlubmVyc1wiIHR5cGU9XCJidXR0b25cIiAoY2xpY2spPVwiY2hhbmdlU2Vjb25kKC1zZWNvbmRTdGVwKVwiXHJcbiAgICAgICAgICAgIGNsYXNzPVwiYnRuIGJ0bi1saW5rXCIgW2NsYXNzLmJ0bi1zbV09XCJpc1NtYWxsU2l6ZVwiIFtjbGFzcy5idG4tbGddPVwiaXNMYXJnZVNpemVcIiAgW2NsYXNzLmRpc2FibGVkXT1cImRpc2FibGVkXCJcclxuICAgICAgICAgICAgW2Rpc2FibGVkXT1cImRpc2FibGVkXCI+XHJcbiAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwiY2hldnJvbiBib3R0b21cIj48L3NwYW4+XHJcbiAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwic3Itb25seVwiIGkxOG49XCJAQG5nYi50aW1lcGlja2VyLmRlY3JlbWVudC1zZWNvbmRzXCI+RGVjcmVtZW50IHNlY29uZHM8L3NwYW4+XHJcbiAgICAgICAgICA8L2J1dHRvbj5cclxuICAgICAgICA8L2Rpdj5cclxuICAgICAgICA8ZGl2ICpuZ0lmPVwibWVyaWRpYW5cIiBjbGFzcz1cIm5nYi10cC1zcGFjZXJcIj48L2Rpdj5cclxuICAgICAgICA8ZGl2ICpuZ0lmPVwibWVyaWRpYW5cIiBjbGFzcz1cIm5nYi10cC1tZXJpZGlhblwiPlxyXG4gICAgICAgICAgPGJ1dHRvbiB0eXBlPVwiYnV0dG9uXCIgY2xhc3M9XCJidG4gYnRuLW91dGxpbmUtcHJpbWFyeVwiIFtjbGFzcy5idG4tc21dPVwiaXNTbWFsbFNpemVcIiBbY2xhc3MuYnRuLWxnXT1cImlzTGFyZ2VTaXplXCJcclxuICAgICAgICAgICAgW2Rpc2FibGVkXT1cImRpc2FibGVkXCIgW2NsYXNzLmRpc2FibGVkXT1cImRpc2FibGVkXCJcclxuICAgICAgICAgICAgICAgICAgKGNsaWNrKT1cInRvZ2dsZU1lcmlkaWFuKClcIj5cclxuICAgICAgICAgICAgPG5nLWNvbnRhaW5lciAqbmdJZj1cIm1vZGVsPy5ob3VyID49IDEyOyBlbHNlIGFtXCIgaTE4bj1cIkBAbmdiLnRpbWVwaWNrZXIuUE1cIj5QTTwvbmctY29udGFpbmVyPlxyXG4gICAgICAgICAgICA8bmctdGVtcGxhdGUgI2FtIGkxOG49XCJAQG5nYi50aW1lcGlja2VyLkFNXCI+QU08L25nLXRlbXBsYXRlPlxyXG4gICAgICAgICAgPC9idXR0b24+XHJcbiAgICAgICAgPC9kaXY+XHJcbiAgICAgIDwvZGl2PlxyXG4gICAgPC9maWVsZHNldD5cclxuICBgLFxyXG4gIHByb3ZpZGVyczogW05HQl9USU1FUElDS0VSX1ZBTFVFX0FDQ0VTU09SXVxyXG59KVxyXG5leHBvcnQgY2xhc3MgTmdiVGltZXBpY2tlciBpbXBsZW1lbnRzIENvbnRyb2xWYWx1ZUFjY2Vzc29yLFxyXG4gICAgT25DaGFuZ2VzIHtcclxuICBkaXNhYmxlZDogYm9vbGVhbjtcclxuICBtb2RlbDogTmdiVGltZTtcclxuXHJcbiAgLyoqXHJcbiAgICogV2hldGhlciB0byBkaXNwbGF5IDEySCBvciAyNEggbW9kZS5cclxuICAgKi9cclxuICBASW5wdXQoKSBtZXJpZGlhbjogYm9vbGVhbjtcclxuXHJcbiAgLyoqXHJcbiAgICogV2hldGhlciB0byBkaXNwbGF5IHRoZSBzcGlubmVycyBhYm92ZSBhbmQgYmVsb3cgdGhlIGlucHV0cy5cclxuICAgKi9cclxuICBASW5wdXQoKSBzcGlubmVyczogYm9vbGVhbjtcclxuXHJcbiAgLyoqXHJcbiAgICogV2hldGhlciB0byBkaXNwbGF5IHNlY29uZHMgaW5wdXQuXHJcbiAgICovXHJcbiAgQElucHV0KCkgc2Vjb25kczogYm9vbGVhbjtcclxuXHJcbiAgLyoqXHJcbiAgICogTnVtYmVyIG9mIGhvdXJzIHRvIGluY3JlYXNlIG9yIGRlY3JlYXNlIHdoZW4gdXNpbmcgYSBidXR0b24uXHJcbiAgICovXHJcbiAgQElucHV0KCkgaG91clN0ZXA6IG51bWJlcjtcclxuXHJcbiAgLyoqXHJcbiAgICogTnVtYmVyIG9mIG1pbnV0ZXMgdG8gaW5jcmVhc2Ugb3IgZGVjcmVhc2Ugd2hlbiB1c2luZyBhIGJ1dHRvbi5cclxuICAgKi9cclxuICBASW5wdXQoKSBtaW51dGVTdGVwOiBudW1iZXI7XHJcblxyXG4gIC8qKlxyXG4gICAqIE51bWJlciBvZiBzZWNvbmRzIHRvIGluY3JlYXNlIG9yIGRlY3JlYXNlIHdoZW4gdXNpbmcgYSBidXR0b24uXHJcbiAgICovXHJcbiAgQElucHV0KCkgc2Vjb25kU3RlcDogbnVtYmVyO1xyXG5cclxuICAvKipcclxuICAgKiBUbyBtYWtlIHRpbWVwaWNrZXIgcmVhZG9ubHlcclxuICAgKi9cclxuICBASW5wdXQoKSByZWFkb25seUlucHV0czogYm9vbGVhbjtcclxuXHJcbiAgLyoqXHJcbiAgICogVG8gc2V0IHRoZSBzaXplIG9mIHRoZSBpbnB1dHMgYW5kIGJ1dHRvblxyXG4gICAqL1xyXG4gIEBJbnB1dCgpIHNpemU6ICdzbWFsbCcgfCAnbWVkaXVtJyB8ICdsYXJnZSc7XHJcblxyXG4gIGNvbnN0cnVjdG9yKGNvbmZpZzogTmdiVGltZXBpY2tlckNvbmZpZywgcHJpdmF0ZSBfbmdiVGltZUFkYXB0ZXI6IE5nYlRpbWVBZGFwdGVyPGFueT4pIHtcclxuICAgIHRoaXMubWVyaWRpYW4gPSBjb25maWcubWVyaWRpYW47XHJcbiAgICB0aGlzLnNwaW5uZXJzID0gY29uZmlnLnNwaW5uZXJzO1xyXG4gICAgdGhpcy5zZWNvbmRzID0gY29uZmlnLnNlY29uZHM7XHJcbiAgICB0aGlzLmhvdXJTdGVwID0gY29uZmlnLmhvdXJTdGVwO1xyXG4gICAgdGhpcy5taW51dGVTdGVwID0gY29uZmlnLm1pbnV0ZVN0ZXA7XHJcbiAgICB0aGlzLnNlY29uZFN0ZXAgPSBjb25maWcuc2Vjb25kU3RlcDtcclxuICAgIHRoaXMuZGlzYWJsZWQgPSBjb25maWcuZGlzYWJsZWQ7XHJcbiAgICB0aGlzLnJlYWRvbmx5SW5wdXRzID0gY29uZmlnLnJlYWRvbmx5SW5wdXRzO1xyXG4gICAgdGhpcy5zaXplID0gY29uZmlnLnNpemU7XHJcbiAgfVxyXG5cclxuICBvbkNoYW5nZSA9IChfOiBhbnkpID0+IHt9O1xyXG4gIG9uVG91Y2hlZCA9ICgpID0+IHt9O1xyXG5cclxuICB3cml0ZVZhbHVlKHZhbHVlKSB7XHJcbiAgICBjb25zdCBzdHJ1Y3RWYWx1ZSA9IHRoaXMuX25nYlRpbWVBZGFwdGVyLmZyb21Nb2RlbCh2YWx1ZSk7XHJcbiAgICB0aGlzLm1vZGVsID0gc3RydWN0VmFsdWUgPyBuZXcgTmdiVGltZShzdHJ1Y3RWYWx1ZS5ob3VyLCBzdHJ1Y3RWYWx1ZS5taW51dGUsIHN0cnVjdFZhbHVlLnNlY29uZCkgOiBuZXcgTmdiVGltZSgpO1xyXG4gICAgaWYgKCF0aGlzLnNlY29uZHMgJiYgKCFzdHJ1Y3RWYWx1ZSB8fCAhaXNOdW1iZXIoc3RydWN0VmFsdWUuc2Vjb25kKSkpIHtcclxuICAgICAgdGhpcy5tb2RlbC5zZWNvbmQgPSAwO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgcmVnaXN0ZXJPbkNoYW5nZShmbjogKHZhbHVlOiBhbnkpID0+IGFueSk6IHZvaWQgeyB0aGlzLm9uQ2hhbmdlID0gZm47IH1cclxuXHJcbiAgcmVnaXN0ZXJPblRvdWNoZWQoZm46ICgpID0+IGFueSk6IHZvaWQgeyB0aGlzLm9uVG91Y2hlZCA9IGZuOyB9XHJcblxyXG4gIHNldERpc2FibGVkU3RhdGUoaXNEaXNhYmxlZDogYm9vbGVhbikgeyB0aGlzLmRpc2FibGVkID0gaXNEaXNhYmxlZDsgfVxyXG5cclxuICBjaGFuZ2VIb3VyKHN0ZXA6IG51bWJlcikge1xyXG4gICAgdGhpcy5tb2RlbC5jaGFuZ2VIb3VyKHN0ZXApO1xyXG4gICAgdGhpcy5wcm9wYWdhdGVNb2RlbENoYW5nZSgpO1xyXG4gIH1cclxuXHJcbiAgY2hhbmdlTWludXRlKHN0ZXA6IG51bWJlcikge1xyXG4gICAgdGhpcy5tb2RlbC5jaGFuZ2VNaW51dGUoc3RlcCk7XHJcbiAgICB0aGlzLnByb3BhZ2F0ZU1vZGVsQ2hhbmdlKCk7XHJcbiAgfVxyXG5cclxuICBjaGFuZ2VTZWNvbmQoc3RlcDogbnVtYmVyKSB7XHJcbiAgICB0aGlzLm1vZGVsLmNoYW5nZVNlY29uZChzdGVwKTtcclxuICAgIHRoaXMucHJvcGFnYXRlTW9kZWxDaGFuZ2UoKTtcclxuICB9XHJcblxyXG4gIHVwZGF0ZUhvdXIobmV3VmFsOiBzdHJpbmcpIHtcclxuICAgIGNvbnN0IGlzUE0gPSB0aGlzLm1vZGVsLmhvdXIgPj0gMTI7XHJcbiAgICBjb25zdCBlbnRlcmVkSG91ciA9IHRvSW50ZWdlcihuZXdWYWwpO1xyXG4gICAgaWYgKHRoaXMubWVyaWRpYW4gJiYgKGlzUE0gJiYgZW50ZXJlZEhvdXIgPCAxMiB8fCAhaXNQTSAmJiBlbnRlcmVkSG91ciA9PT0gMTIpKSB7XHJcbiAgICAgIHRoaXMubW9kZWwudXBkYXRlSG91cihlbnRlcmVkSG91ciArIDEyKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHRoaXMubW9kZWwudXBkYXRlSG91cihlbnRlcmVkSG91cik7XHJcbiAgICB9XHJcbiAgICB0aGlzLnByb3BhZ2F0ZU1vZGVsQ2hhbmdlKCk7XHJcbiAgfVxyXG5cclxuICB1cGRhdGVNaW51dGUobmV3VmFsOiBzdHJpbmcpIHtcclxuICAgIHRoaXMubW9kZWwudXBkYXRlTWludXRlKHRvSW50ZWdlcihuZXdWYWwpKTtcclxuICAgIHRoaXMucHJvcGFnYXRlTW9kZWxDaGFuZ2UoKTtcclxuICB9XHJcblxyXG4gIHVwZGF0ZVNlY29uZChuZXdWYWw6IHN0cmluZykge1xyXG4gICAgdGhpcy5tb2RlbC51cGRhdGVTZWNvbmQodG9JbnRlZ2VyKG5ld1ZhbCkpO1xyXG4gICAgdGhpcy5wcm9wYWdhdGVNb2RlbENoYW5nZSgpO1xyXG4gIH1cclxuXHJcbiAgdG9nZ2xlTWVyaWRpYW4oKSB7XHJcbiAgICBpZiAodGhpcy5tZXJpZGlhbikge1xyXG4gICAgICB0aGlzLmNoYW5nZUhvdXIoMTIpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgZm9ybWF0SG91cih2YWx1ZTogbnVtYmVyKSB7XHJcbiAgICBpZiAoaXNOdW1iZXIodmFsdWUpKSB7XHJcbiAgICAgIGlmICh0aGlzLm1lcmlkaWFuKSB7XHJcbiAgICAgICAgcmV0dXJuIHBhZE51bWJlcih2YWx1ZSAlIDEyID09PSAwID8gMTIgOiB2YWx1ZSAlIDEyKTtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICByZXR1cm4gcGFkTnVtYmVyKHZhbHVlICUgMjQpO1xyXG4gICAgICB9XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICByZXR1cm4gcGFkTnVtYmVyKE5hTik7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBmb3JtYXRNaW5TZWModmFsdWU6IG51bWJlcikgeyByZXR1cm4gcGFkTnVtYmVyKHZhbHVlKTsgfVxyXG5cclxuICBnZXQgaXNTbWFsbFNpemUoKTogYm9vbGVhbiB7IHJldHVybiB0aGlzLnNpemUgPT09ICdzbWFsbCc7IH1cclxuXHJcbiAgZ2V0IGlzTGFyZ2VTaXplKCk6IGJvb2xlYW4geyByZXR1cm4gdGhpcy5zaXplID09PSAnbGFyZ2UnOyB9XHJcblxyXG4gIG5nT25DaGFuZ2VzKGNoYW5nZXM6IFNpbXBsZUNoYW5nZXMpOiB2b2lkIHtcclxuICAgIGlmIChjaGFuZ2VzWydzZWNvbmRzJ10gJiYgIXRoaXMuc2Vjb25kcyAmJiB0aGlzLm1vZGVsICYmICFpc051bWJlcih0aGlzLm1vZGVsLnNlY29uZCkpIHtcclxuICAgICAgdGhpcy5tb2RlbC5zZWNvbmQgPSAwO1xyXG4gICAgICB0aGlzLnByb3BhZ2F0ZU1vZGVsQ2hhbmdlKGZhbHNlKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHByaXZhdGUgcHJvcGFnYXRlTW9kZWxDaGFuZ2UodG91Y2hlZCA9IHRydWUpIHtcclxuICAgIGlmICh0b3VjaGVkKSB7XHJcbiAgICAgIHRoaXMub25Ub3VjaGVkKCk7XHJcbiAgICB9XHJcbiAgICBpZiAodGhpcy5tb2RlbC5pc1ZhbGlkKHRoaXMuc2Vjb25kcykpIHtcclxuICAgICAgdGhpcy5vbkNoYW5nZShcclxuICAgICAgICAgIHRoaXMuX25nYlRpbWVBZGFwdGVyLnRvTW9kZWwoe2hvdXI6IHRoaXMubW9kZWwuaG91ciwgbWludXRlOiB0aGlzLm1vZGVsLm1pbnV0ZSwgc2Vjb25kOiB0aGlzLm1vZGVsLnNlY29uZH0pKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHRoaXMub25DaGFuZ2UodGhpcy5fbmdiVGltZUFkYXB0ZXIudG9Nb2RlbChudWxsKSk7XHJcbiAgICB9XHJcbiAgfVxyXG59XHJcbiIsImltcG9ydCB7TmdNb2R1bGUsIE1vZHVsZVdpdGhQcm92aWRlcnN9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQge0NvbW1vbk1vZHVsZX0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcclxuXHJcbmltcG9ydCB7TmdiVGltZXBpY2tlcn0gZnJvbSAnLi90aW1lcGlja2VyJztcclxuXHJcbmV4cG9ydCB7TmdiVGltZXBpY2tlcn0gZnJvbSAnLi90aW1lcGlja2VyJztcclxuZXhwb3J0IHtOZ2JUaW1lcGlja2VyQ29uZmlnfSBmcm9tICcuL3RpbWVwaWNrZXItY29uZmlnJztcclxuZXhwb3J0IHtOZ2JUaW1lU3RydWN0fSBmcm9tICcuL25nYi10aW1lLXN0cnVjdCc7XHJcbmV4cG9ydCB7TmdiVGltZUFkYXB0ZXJ9IGZyb20gJy4vbmdiLXRpbWUtYWRhcHRlcic7XHJcblxyXG5ATmdNb2R1bGUoe2RlY2xhcmF0aW9uczogW05nYlRpbWVwaWNrZXJdLCBleHBvcnRzOiBbTmdiVGltZXBpY2tlcl0sIGltcG9ydHM6IFtDb21tb25Nb2R1bGVdfSlcclxuZXhwb3J0IGNsYXNzIE5nYlRpbWVwaWNrZXJNb2R1bGUge1xyXG4gIC8qKlxyXG4gICAqIEltcG9ydGluZyB3aXRoICcuZm9yUm9vdCgpJyBpcyBubyBsb25nZXIgbmVjZXNzYXJ5LCB5b3UgY2FuIHNpbXBseSBpbXBvcnQgdGhlIG1vZHVsZS5cclxuICAgKiBXaWxsIGJlIHJlbW92ZWQgaW4gNC4wLjAuXHJcbiAgICpcclxuICAgKiBAZGVwcmVjYXRlZCAzLjAuMFxyXG4gICAqL1xyXG4gIHN0YXRpYyBmb3JSb290KCk6IE1vZHVsZVdpdGhQcm92aWRlcnMgeyByZXR1cm4ge25nTW9kdWxlOiBOZ2JUaW1lcGlja2VyTW9kdWxlfTsgfVxyXG59XHJcbiIsImltcG9ydCB7SW5qZWN0YWJsZX0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7UGxhY2VtZW50QXJyYXl9IGZyb20gJy4uL3V0aWwvcG9zaXRpb25pbmcnO1xyXG5cclxuLyoqXHJcbiAqIENvbmZpZ3VyYXRpb24gc2VydmljZSBmb3IgdGhlIE5nYlRvb2x0aXAgZGlyZWN0aXZlLlxyXG4gKiBZb3UgY2FuIGluamVjdCB0aGlzIHNlcnZpY2UsIHR5cGljYWxseSBpbiB5b3VyIHJvb3QgY29tcG9uZW50LCBhbmQgY3VzdG9taXplIHRoZSB2YWx1ZXMgb2YgaXRzIHByb3BlcnRpZXMgaW5cclxuICogb3JkZXIgdG8gcHJvdmlkZSBkZWZhdWx0IHZhbHVlcyBmb3IgYWxsIHRoZSB0b29sdGlwcyB1c2VkIGluIHRoZSBhcHBsaWNhdGlvbi5cclxuICovXHJcbkBJbmplY3RhYmxlKHtwcm92aWRlZEluOiAncm9vdCd9KVxyXG5leHBvcnQgY2xhc3MgTmdiVG9vbHRpcENvbmZpZyB7XHJcbiAgYXV0b0Nsb3NlOiBib29sZWFuIHwgJ2luc2lkZScgfCAnb3V0c2lkZScgPSB0cnVlO1xyXG4gIHBsYWNlbWVudDogUGxhY2VtZW50QXJyYXkgPSAndG9wJztcclxuICB0cmlnZ2VycyA9ICdob3Zlcic7XHJcbiAgY29udGFpbmVyOiBzdHJpbmc7XHJcbiAgZGlzYWJsZVRvb2x0aXAgPSBmYWxzZTtcclxuICB0b29sdGlwQ2xhc3M6IHN0cmluZztcclxufVxyXG4iLCJpbXBvcnQge1xyXG4gIENvbXBvbmVudCxcclxuICBEaXJlY3RpdmUsXHJcbiAgSW5wdXQsXHJcbiAgT3V0cHV0LFxyXG4gIEV2ZW50RW1pdHRlcixcclxuICBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSxcclxuICBPbkluaXQsXHJcbiAgT25EZXN0cm95LFxyXG4gIEluamVjdCxcclxuICBJbmplY3RvcixcclxuICBSZW5kZXJlcjIsXHJcbiAgQ29tcG9uZW50UmVmLFxyXG4gIEVsZW1lbnRSZWYsXHJcbiAgVGVtcGxhdGVSZWYsXHJcbiAgVmlld0NvbnRhaW5lclJlZixcclxuICBDb21wb25lbnRGYWN0b3J5UmVzb2x2ZXIsXHJcbiAgTmdab25lXHJcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7RE9DVU1FTlR9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XHJcblxyXG5pbXBvcnQge2Zyb21FdmVudCwgcmFjZX0gZnJvbSAncnhqcyc7XHJcbmltcG9ydCB7ZmlsdGVyLCB0YWtlVW50aWx9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcclxuXHJcbmltcG9ydCB7bGlzdGVuVG9UcmlnZ2Vyc30gZnJvbSAnLi4vdXRpbC90cmlnZ2Vycyc7XHJcbmltcG9ydCB7cG9zaXRpb25FbGVtZW50cywgUGxhY2VtZW50LCBQbGFjZW1lbnRBcnJheX0gZnJvbSAnLi4vdXRpbC9wb3NpdGlvbmluZyc7XHJcbmltcG9ydCB7UG9wdXBTZXJ2aWNlfSBmcm9tICcuLi91dGlsL3BvcHVwJztcclxuaW1wb3J0IHtLZXl9IGZyb20gJy4uL3V0aWwva2V5JztcclxuXHJcbmltcG9ydCB7TmdiVG9vbHRpcENvbmZpZ30gZnJvbSAnLi90b29sdGlwLWNvbmZpZyc7XHJcblxyXG5sZXQgbmV4dElkID0gMDtcclxuXHJcbkBDb21wb25lbnQoe1xyXG4gIHNlbGVjdG9yOiAnbmdiLXRvb2x0aXAtd2luZG93JyxcclxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaCxcclxuICBob3N0OiB7XHJcbiAgICAnW2NsYXNzXSc6XHJcbiAgICAgICAgJ1widG9vbHRpcCBzaG93IGJzLXRvb2x0aXAtXCIgKyBwbGFjZW1lbnQuc3BsaXQoXCItXCIpWzBdK1wiIGJzLXRvb2x0aXAtXCIgKyBwbGFjZW1lbnQgKyAodG9vbHRpcENsYXNzID8gXCIgXCIgKyB0b29sdGlwQ2xhc3MgOiBcIlwiKScsXHJcbiAgICAncm9sZSc6ICd0b29sdGlwJyxcclxuICAgICdbaWRdJzogJ2lkJ1xyXG4gIH0sXHJcbiAgdGVtcGxhdGU6IGA8ZGl2IGNsYXNzPVwiYXJyb3dcIj48L2Rpdj48ZGl2IGNsYXNzPVwidG9vbHRpcC1pbm5lclwiPjxuZy1jb250ZW50PjwvbmctY29udGVudD48L2Rpdj5gLFxyXG4gIHN0eWxlczogW2BcclxuICAgIDpob3N0LmJzLXRvb2x0aXAtdG9wIC5hcnJvdywgOmhvc3QuYnMtdG9vbHRpcC1ib3R0b20gLmFycm93IHtcclxuICAgICAgbGVmdDogY2FsYyg1MCUgLSAwLjRyZW0pO1xyXG4gICAgfVxyXG5cclxuICAgIDpob3N0LmJzLXRvb2x0aXAtdG9wLWxlZnQgLmFycm93LCA6aG9zdC5icy10b29sdGlwLWJvdHRvbS1sZWZ0IC5hcnJvdyB7XHJcbiAgICAgIGxlZnQ6IDFlbTtcclxuICAgIH1cclxuXHJcbiAgICA6aG9zdC5icy10b29sdGlwLXRvcC1yaWdodCAuYXJyb3csIDpob3N0LmJzLXRvb2x0aXAtYm90dG9tLXJpZ2h0IC5hcnJvdyB7XHJcbiAgICAgIGxlZnQ6IGF1dG87XHJcbiAgICAgIHJpZ2h0OiAwLjhyZW07XHJcbiAgICB9XHJcblxyXG4gICAgOmhvc3QuYnMtdG9vbHRpcC1sZWZ0IC5hcnJvdywgOmhvc3QuYnMtdG9vbHRpcC1yaWdodCAuYXJyb3cge1xyXG4gICAgICB0b3A6IGNhbGMoNTAlIC0gMC40cmVtKTtcclxuICAgIH1cclxuXHJcbiAgICA6aG9zdC5icy10b29sdGlwLWxlZnQtdG9wIC5hcnJvdywgOmhvc3QuYnMtdG9vbHRpcC1yaWdodC10b3AgLmFycm93IHtcclxuICAgICAgdG9wOiAwLjRyZW07XHJcbiAgICB9XHJcblxyXG4gICAgOmhvc3QuYnMtdG9vbHRpcC1sZWZ0LWJvdHRvbSAuYXJyb3csIDpob3N0LmJzLXRvb2x0aXAtcmlnaHQtYm90dG9tIC5hcnJvdyB7XHJcbiAgICAgIHRvcDogYXV0bztcclxuICAgICAgYm90dG9tOiAwLjRyZW07XHJcbiAgICB9XHJcbiAgYF1cclxufSlcclxuZXhwb3J0IGNsYXNzIE5nYlRvb2x0aXBXaW5kb3cge1xyXG4gIEBJbnB1dCgpIHBsYWNlbWVudDogUGxhY2VtZW50ID0gJ3RvcCc7XHJcbiAgQElucHV0KCkgaWQ6IHN0cmluZztcclxuICBASW5wdXQoKSB0b29sdGlwQ2xhc3M6IHN0cmluZztcclxuXHJcbiAgY29uc3RydWN0b3IocHJpdmF0ZSBfZWxlbWVudDogRWxlbWVudFJlZjxIVE1MRWxlbWVudD4sIHByaXZhdGUgX3JlbmRlcmVyOiBSZW5kZXJlcjIpIHt9XHJcblxyXG4gIGFwcGx5UGxhY2VtZW50KF9wbGFjZW1lbnQ6IFBsYWNlbWVudCkge1xyXG4gICAgLy8gcmVtb3ZlIHRoZSBjdXJyZW50IHBsYWNlbWVudCBjbGFzc2VzXHJcbiAgICB0aGlzLl9yZW5kZXJlci5yZW1vdmVDbGFzcyh0aGlzLl9lbGVtZW50Lm5hdGl2ZUVsZW1lbnQsICdicy10b29sdGlwLScgKyB0aGlzLnBsYWNlbWVudC50b1N0cmluZygpLnNwbGl0KCctJylbMF0pO1xyXG4gICAgdGhpcy5fcmVuZGVyZXIucmVtb3ZlQ2xhc3ModGhpcy5fZWxlbWVudC5uYXRpdmVFbGVtZW50LCAnYnMtdG9vbHRpcC0nICsgdGhpcy5wbGFjZW1lbnQudG9TdHJpbmcoKSk7XHJcblxyXG4gICAgLy8gc2V0IHRoZSBuZXcgcGxhY2VtZW50IGNsYXNzZXNcclxuICAgIHRoaXMucGxhY2VtZW50ID0gX3BsYWNlbWVudDtcclxuXHJcbiAgICAvLyBhcHBseSB0aGUgbmV3IHBsYWNlbWVudFxyXG4gICAgdGhpcy5fcmVuZGVyZXIuYWRkQ2xhc3ModGhpcy5fZWxlbWVudC5uYXRpdmVFbGVtZW50LCAnYnMtdG9vbHRpcC0nICsgdGhpcy5wbGFjZW1lbnQudG9TdHJpbmcoKS5zcGxpdCgnLScpWzBdKTtcclxuICAgIHRoaXMuX3JlbmRlcmVyLmFkZENsYXNzKHRoaXMuX2VsZW1lbnQubmF0aXZlRWxlbWVudCwgJ2JzLXRvb2x0aXAtJyArIHRoaXMucGxhY2VtZW50LnRvU3RyaW5nKCkpO1xyXG4gIH1cclxuICAvKipcclxuICAgKiBUZWxscyB3aGV0aGVyIHRoZSBldmVudCBoYXMgYmVlbiB0cmlnZ2VyZWQgZnJvbSB0aGlzIGNvbXBvbmVudCdzIHN1YnRyZWUgb3Igbm90LlxyXG4gICAqXHJcbiAgICogQHBhcmFtIGV2ZW50IHRoZSBldmVudCB0byBjaGVja1xyXG4gICAqXHJcbiAgICogQHJldHVybiB3aGV0aGVyIHRoZSBldmVudCBoYXMgYmVlbiB0cmlnZ2VyZWQgZnJvbSB0aGlzIGNvbXBvbmVudCdzIHN1YnRyZWUgb3Igbm90LlxyXG4gICAqL1xyXG4gIGlzRXZlbnRGcm9tKGV2ZW50OiBFdmVudCk6IGJvb2xlYW4geyByZXR1cm4gdGhpcy5fZWxlbWVudC5uYXRpdmVFbGVtZW50LmNvbnRhaW5zKGV2ZW50LnRhcmdldCBhcyBIVE1MRWxlbWVudCk7IH1cclxufVxyXG5cclxuLyoqXHJcbiAqIEEgbGlnaHR3ZWlnaHQsIGV4dGVuc2libGUgZGlyZWN0aXZlIGZvciBmYW5jeSB0b29sdGlwIGNyZWF0aW9uLlxyXG4gKi9cclxuQERpcmVjdGl2ZSh7c2VsZWN0b3I6ICdbbmdiVG9vbHRpcF0nLCBleHBvcnRBczogJ25nYlRvb2x0aXAnfSlcclxuZXhwb3J0IGNsYXNzIE5nYlRvb2x0aXAgaW1wbGVtZW50cyBPbkluaXQsIE9uRGVzdHJveSB7XHJcbiAgLyoqXHJcbiAgICogSW5kaWNhdGVzIHdoZXRoZXIgdGhlIHRvb2x0aXAgc2hvdWxkIGJlIGNsb3NlZCBvbiBFc2NhcGUga2V5IGFuZCBpbnNpZGUvb3V0c2lkZSBjbGlja3MuXHJcbiAgICpcclxuICAgKiAtIHRydWUgKGRlZmF1bHQpOiBjbG9zZXMgb24gYm90aCBvdXRzaWRlIGFuZCBpbnNpZGUgY2xpY2tzIGFzIHdlbGwgYXMgRXNjYXBlIHByZXNzZXNcclxuICAgKiAtIGZhbHNlOiBkaXNhYmxlcyB0aGUgYXV0b0Nsb3NlIGZlYXR1cmUgKE5COiB0cmlnZ2VycyBzdGlsbCBhcHBseSlcclxuICAgKiAtICdpbnNpZGUnOiBjbG9zZXMgb24gaW5zaWRlIGNsaWNrcyBhcyB3ZWxsIGFzIEVzY2FwZSBwcmVzc2VzXHJcbiAgICogLSAnb3V0c2lkZSc6IGNsb3NlcyBvbiBvdXRzaWRlIGNsaWNrcyAoc29tZXRpbWVzIGFsc28gYWNoaWV2YWJsZSB0aHJvdWdoIHRyaWdnZXJzKVxyXG4gICAqIGFzIHdlbGwgYXMgRXNjYXBlIHByZXNzZXNcclxuICAgKlxyXG4gICAqIEBzaW5jZSAzLjAuMFxyXG4gICAqL1xyXG4gIEBJbnB1dCgpIGF1dG9DbG9zZTogYm9vbGVhbiB8ICdpbnNpZGUnIHwgJ291dHNpZGUnO1xyXG4gIC8qKlxyXG4gICAgKiBQbGFjZW1lbnQgb2YgYSB0b29sdGlwIGFjY2VwdHM6XHJcbiAgICAqICAgIFwidG9wXCIsIFwidG9wLWxlZnRcIiwgXCJ0b3AtcmlnaHRcIiwgXCJib3R0b21cIiwgXCJib3R0b20tbGVmdFwiLCBcImJvdHRvbS1yaWdodFwiLFxyXG4gICAgKiAgICBcImxlZnRcIiwgXCJsZWZ0LXRvcFwiLCBcImxlZnQtYm90dG9tXCIsIFwicmlnaHRcIiwgXCJyaWdodC10b3BcIiwgXCJyaWdodC1ib3R0b21cIlxyXG4gICAgKiBhbmQgYXJyYXkgb2YgYWJvdmUgdmFsdWVzLlxyXG4gICAgKi9cclxuICBASW5wdXQoKSBwbGFjZW1lbnQ6IFBsYWNlbWVudEFycmF5O1xyXG4gIC8qKlxyXG4gICAqIFNwZWNpZmllcyBldmVudHMgdGhhdCBzaG91bGQgdHJpZ2dlci4gU3VwcG9ydHMgYSBzcGFjZSBzZXBhcmF0ZWQgbGlzdCBvZiBldmVudCBuYW1lcy5cclxuICAgKi9cclxuICBASW5wdXQoKSB0cmlnZ2Vyczogc3RyaW5nO1xyXG4gIC8qKlxyXG4gICAqIEEgc2VsZWN0b3Igc3BlY2lmeWluZyB0aGUgZWxlbWVudCB0aGUgdG9vbHRpcCBzaG91bGQgYmUgYXBwZW5kZWQgdG8uXHJcbiAgICogQ3VycmVudGx5IG9ubHkgc3VwcG9ydHMgXCJib2R5XCIuXHJcbiAgICovXHJcbiAgQElucHV0KCkgY29udGFpbmVyOiBzdHJpbmc7XHJcbiAgLyoqXHJcbiAgICogQSBmbGFnIGluZGljYXRpbmcgaWYgYSBnaXZlbiB0b29sdGlwIGlzIGRpc2FibGVkIGFuZCBzaG91bGQgbm90IGJlIGRpc3BsYXllZC5cclxuICAgKlxyXG4gICAqIEBzaW5jZSAxLjEuMFxyXG4gICAqL1xyXG4gIEBJbnB1dCgpIGRpc2FibGVUb29sdGlwOiBib29sZWFuO1xyXG4gIC8qKlxyXG4gICAqIEFuIG9wdGlvbmFsIGNsYXNzIGFwcGxpZWQgdG8gbmdiLXRvb2x0aXAtd2luZG93XHJcbiAgICpcclxuICAgKiBAc2luY2UgMy4yLjBcclxuICAgKi9cclxuICBASW5wdXQoKSB0b29sdGlwQ2xhc3M6IHN0cmluZztcclxuICAvKipcclxuICAgKiBFbWl0cyBhbiBldmVudCB3aGVuIHRoZSB0b29sdGlwIGlzIHNob3duXHJcbiAgICovXHJcbiAgQE91dHB1dCgpIHNob3duID0gbmV3IEV2ZW50RW1pdHRlcigpO1xyXG4gIC8qKlxyXG4gICAqIEVtaXRzIGFuIGV2ZW50IHdoZW4gdGhlIHRvb2x0aXAgaXMgaGlkZGVuXHJcbiAgICovXHJcbiAgQE91dHB1dCgpIGhpZGRlbiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcclxuXHJcbiAgcHJpdmF0ZSBfbmdiVG9vbHRpcDogc3RyaW5nIHwgVGVtcGxhdGVSZWY8YW55PjtcclxuICBwcml2YXRlIF9uZ2JUb29sdGlwV2luZG93SWQgPSBgbmdiLXRvb2x0aXAtJHtuZXh0SWQrK31gO1xyXG4gIHByaXZhdGUgX3BvcHVwU2VydmljZTogUG9wdXBTZXJ2aWNlPE5nYlRvb2x0aXBXaW5kb3c+O1xyXG4gIHByaXZhdGUgX3dpbmRvd1JlZjogQ29tcG9uZW50UmVmPE5nYlRvb2x0aXBXaW5kb3c+O1xyXG4gIHByaXZhdGUgX3VucmVnaXN0ZXJMaXN0ZW5lcnNGbjtcclxuICBwcml2YXRlIF96b25lU3Vic2NyaXB0aW9uOiBhbnk7XHJcblxyXG4gIGNvbnN0cnVjdG9yKFxyXG4gICAgICBwcml2YXRlIF9lbGVtZW50UmVmOiBFbGVtZW50UmVmPEhUTUxFbGVtZW50PiwgcHJpdmF0ZSBfcmVuZGVyZXI6IFJlbmRlcmVyMiwgaW5qZWN0b3I6IEluamVjdG9yLFxyXG4gICAgICBjb21wb25lbnRGYWN0b3J5UmVzb2x2ZXI6IENvbXBvbmVudEZhY3RvcnlSZXNvbHZlciwgdmlld0NvbnRhaW5lclJlZjogVmlld0NvbnRhaW5lclJlZiwgY29uZmlnOiBOZ2JUb29sdGlwQ29uZmlnLFxyXG4gICAgICBwcml2YXRlIF9uZ1pvbmU6IE5nWm9uZSwgQEluamVjdChET0NVTUVOVCkgcHJpdmF0ZSBfZG9jdW1lbnQ6IGFueSkge1xyXG4gICAgdGhpcy5hdXRvQ2xvc2UgPSBjb25maWcuYXV0b0Nsb3NlO1xyXG4gICAgdGhpcy5wbGFjZW1lbnQgPSBjb25maWcucGxhY2VtZW50O1xyXG4gICAgdGhpcy50cmlnZ2VycyA9IGNvbmZpZy50cmlnZ2VycztcclxuICAgIHRoaXMuY29udGFpbmVyID0gY29uZmlnLmNvbnRhaW5lcjtcclxuICAgIHRoaXMuZGlzYWJsZVRvb2x0aXAgPSBjb25maWcuZGlzYWJsZVRvb2x0aXA7XHJcbiAgICB0aGlzLnRvb2x0aXBDbGFzcyA9IGNvbmZpZy50b29sdGlwQ2xhc3M7XHJcbiAgICB0aGlzLl9wb3B1cFNlcnZpY2UgPSBuZXcgUG9wdXBTZXJ2aWNlPE5nYlRvb2x0aXBXaW5kb3c+KFxyXG4gICAgICAgIE5nYlRvb2x0aXBXaW5kb3csIGluamVjdG9yLCB2aWV3Q29udGFpbmVyUmVmLCBfcmVuZGVyZXIsIGNvbXBvbmVudEZhY3RvcnlSZXNvbHZlcik7XHJcblxyXG4gICAgdGhpcy5fem9uZVN1YnNjcmlwdGlvbiA9IF9uZ1pvbmUub25TdGFibGUuc3Vic2NyaWJlKCgpID0+IHtcclxuICAgICAgaWYgKHRoaXMuX3dpbmRvd1JlZikge1xyXG4gICAgICAgIHRoaXMuX3dpbmRvd1JlZi5pbnN0YW5jZS5hcHBseVBsYWNlbWVudChcclxuICAgICAgICAgICAgcG9zaXRpb25FbGVtZW50cyhcclxuICAgICAgICAgICAgICAgIHRoaXMuX2VsZW1lbnRSZWYubmF0aXZlRWxlbWVudCwgdGhpcy5fd2luZG93UmVmLmxvY2F0aW9uLm5hdGl2ZUVsZW1lbnQsIHRoaXMucGxhY2VtZW50LFxyXG4gICAgICAgICAgICAgICAgdGhpcy5jb250YWluZXIgPT09ICdib2R5JykpO1xyXG4gICAgICB9XHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIENvbnRlbnQgdG8gYmUgZGlzcGxheWVkIGFzIHRvb2x0aXAuIElmIGZhbHN5LCB0aGUgdG9vbHRpcCB3b24ndCBvcGVuLlxyXG4gICAqL1xyXG4gIEBJbnB1dCgpXHJcbiAgc2V0IG5nYlRvb2x0aXAodmFsdWU6IHN0cmluZyB8IFRlbXBsYXRlUmVmPGFueT4pIHtcclxuICAgIHRoaXMuX25nYlRvb2x0aXAgPSB2YWx1ZTtcclxuICAgIGlmICghdmFsdWUgJiYgdGhpcy5fd2luZG93UmVmKSB7XHJcbiAgICAgIHRoaXMuY2xvc2UoKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIGdldCBuZ2JUb29sdGlwKCkgeyByZXR1cm4gdGhpcy5fbmdiVG9vbHRpcDsgfVxyXG5cclxuICAvKipcclxuICAgKiBPcGVucyBhbiBlbGVtZW50w6LCgMKZcyB0b29sdGlwLiBUaGlzIGlzIGNvbnNpZGVyZWQgYSDDosKAwpxtYW51YWzDosKAwp0gdHJpZ2dlcmluZyBvZiB0aGUgdG9vbHRpcC5cclxuICAgKiBUaGUgY29udGV4dCBpcyBhbiBvcHRpb25hbCB2YWx1ZSB0byBiZSBpbmplY3RlZCBpbnRvIHRoZSB0b29sdGlwIHRlbXBsYXRlIHdoZW4gaXQgaXMgY3JlYXRlZC5cclxuICAgKi9cclxuICBvcGVuKGNvbnRleHQ/OiBhbnkpIHtcclxuICAgIGlmICghdGhpcy5fd2luZG93UmVmICYmIHRoaXMuX25nYlRvb2x0aXAgJiYgIXRoaXMuZGlzYWJsZVRvb2x0aXApIHtcclxuICAgICAgdGhpcy5fd2luZG93UmVmID0gdGhpcy5fcG9wdXBTZXJ2aWNlLm9wZW4odGhpcy5fbmdiVG9vbHRpcCwgY29udGV4dCk7XHJcbiAgICAgIHRoaXMuX3dpbmRvd1JlZi5pbnN0YW5jZS50b29sdGlwQ2xhc3MgPSB0aGlzLnRvb2x0aXBDbGFzcztcclxuICAgICAgdGhpcy5fd2luZG93UmVmLmluc3RhbmNlLmlkID0gdGhpcy5fbmdiVG9vbHRpcFdpbmRvd0lkO1xyXG5cclxuICAgICAgdGhpcy5fcmVuZGVyZXIuc2V0QXR0cmlidXRlKHRoaXMuX2VsZW1lbnRSZWYubmF0aXZlRWxlbWVudCwgJ2FyaWEtZGVzY3JpYmVkYnknLCB0aGlzLl9uZ2JUb29sdGlwV2luZG93SWQpO1xyXG5cclxuICAgICAgaWYgKHRoaXMuY29udGFpbmVyID09PSAnYm9keScpIHtcclxuICAgICAgICB0aGlzLl9kb2N1bWVudC5xdWVyeVNlbGVjdG9yKHRoaXMuY29udGFpbmVyKS5hcHBlbmRDaGlsZCh0aGlzLl93aW5kb3dSZWYubG9jYXRpb24ubmF0aXZlRWxlbWVudCk7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIHRoaXMuX3dpbmRvd1JlZi5pbnN0YW5jZS5wbGFjZW1lbnQgPSBBcnJheS5pc0FycmF5KHRoaXMucGxhY2VtZW50KSA/IHRoaXMucGxhY2VtZW50WzBdIDogdGhpcy5wbGFjZW1lbnQ7XHJcblxyXG4gICAgICAvLyBhcHBseSBzdHlsaW5nIHRvIHNldCBiYXNpYyBjc3MtY2xhc3NlcyBvbiB0YXJnZXQgZWxlbWVudCwgYmVmb3JlIGdvaW5nIGZvciBwb3NpdGlvbmluZ1xyXG4gICAgICB0aGlzLl93aW5kb3dSZWYuY2hhbmdlRGV0ZWN0b3JSZWYuZGV0ZWN0Q2hhbmdlcygpO1xyXG4gICAgICB0aGlzLl93aW5kb3dSZWYuY2hhbmdlRGV0ZWN0b3JSZWYubWFya0ZvckNoZWNrKCk7XHJcblxyXG4gICAgICAvLyBwb3NpdGlvbiB0b29sdGlwIGFsb25nIHRoZSBlbGVtZW50XHJcbiAgICAgIHRoaXMuX3dpbmRvd1JlZi5pbnN0YW5jZS5hcHBseVBsYWNlbWVudChcclxuICAgICAgICAgIHBvc2l0aW9uRWxlbWVudHMoXHJcbiAgICAgICAgICAgICAgdGhpcy5fZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50LCB0aGlzLl93aW5kb3dSZWYubG9jYXRpb24ubmF0aXZlRWxlbWVudCwgdGhpcy5wbGFjZW1lbnQsXHJcbiAgICAgICAgICAgICAgdGhpcy5jb250YWluZXIgPT09ICdib2R5JykpO1xyXG5cclxuICAgICAgaWYgKHRoaXMuYXV0b0Nsb3NlKSB7XHJcbiAgICAgICAgdGhpcy5fbmdab25lLnJ1bk91dHNpZGVBbmd1bGFyKCgpID0+IHtcclxuICAgICAgICAgIC8vIHByZXZlbnRzIGF1dG9tYXRpYyBjbG9zaW5nIHJpZ2h0IGFmdGVyIGFuIG9wZW5pbmcgYnkgcHV0dGluZyBhIGd1YXJkIGZvciB0aGUgdGltZSBvZiBvbmUgZXZlbnQgaGFuZGxpbmdcclxuICAgICAgICAgIC8vIHBhc3NcclxuICAgICAgICAgIC8vIHVzZSBjYXNlOiBjbGljayBldmVudCB3b3VsZCByZWFjaCBhbiBlbGVtZW50IG9wZW5pbmcgdGhlIHRvb2x0aXAgZmlyc3QsIHRoZW4gcmVhY2ggdGhlIGF1dG9DbG9zZSBoYW5kbGVyXHJcbiAgICAgICAgICAvLyB3aGljaCB3b3VsZCBjbG9zZSBpdFxyXG4gICAgICAgICAgbGV0IGp1c3RPcGVuZWQgPSB0cnVlO1xyXG4gICAgICAgICAgcmVxdWVzdEFuaW1hdGlvbkZyYW1lKCgpID0+IGp1c3RPcGVuZWQgPSBmYWxzZSk7XHJcblxyXG4gICAgICAgICAgY29uc3QgZXNjYXBlcyQgPSBmcm9tRXZlbnQ8S2V5Ym9hcmRFdmVudD4odGhpcy5fZG9jdW1lbnQsICdrZXl1cCcpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAucGlwZSh0YWtlVW50aWwodGhpcy5oaWRkZW4pLCBmaWx0ZXIoZXZlbnQgPT4gZXZlbnQud2hpY2ggPT09IEtleS5Fc2NhcGUpKTtcclxuXHJcbiAgICAgICAgICBjb25zdCBjbGlja3MkID0gZnJvbUV2ZW50PE1vdXNlRXZlbnQ+KHRoaXMuX2RvY3VtZW50LCAnY2xpY2snKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAucGlwZShcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRha2VVbnRpbCh0aGlzLmhpZGRlbiksIGZpbHRlcigoKSA9PiAhanVzdE9wZW5lZCksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmaWx0ZXIoZXZlbnQgPT4gdGhpcy5fc2hvdWxkQ2xvc2VGcm9tQ2xpY2soZXZlbnQpKSk7XHJcblxyXG4gICAgICAgICAgcmFjZTxFdmVudD4oW2VzY2FwZXMkLCBjbGlja3MkXSkuc3Vic2NyaWJlKCgpID0+IHRoaXMuX25nWm9uZS5ydW4oKCkgPT4gdGhpcy5jbG9zZSgpKSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIHRoaXMuc2hvd24uZW1pdCgpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogQ2xvc2VzIGFuIGVsZW1lbnTDosKAwplzIHRvb2x0aXAuIFRoaXMgaXMgY29uc2lkZXJlZCBhIMOiwoDCnG1hbnVhbMOiwoDCnSB0cmlnZ2VyaW5nIG9mIHRoZSB0b29sdGlwLlxyXG4gICAqL1xyXG4gIGNsb3NlKCk6IHZvaWQge1xyXG4gICAgaWYgKHRoaXMuX3dpbmRvd1JlZiAhPSBudWxsKSB7XHJcbiAgICAgIHRoaXMuX3JlbmRlcmVyLnJlbW92ZUF0dHJpYnV0ZSh0aGlzLl9lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQsICdhcmlhLWRlc2NyaWJlZGJ5Jyk7XHJcbiAgICAgIHRoaXMuX3BvcHVwU2VydmljZS5jbG9zZSgpO1xyXG4gICAgICB0aGlzLl93aW5kb3dSZWYgPSBudWxsO1xyXG4gICAgICB0aGlzLmhpZGRlbi5lbWl0KCk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBUb2dnbGVzIGFuIGVsZW1lbnTDosKAwplzIHRvb2x0aXAuIFRoaXMgaXMgY29uc2lkZXJlZCBhIMOiwoDCnG1hbnVhbMOiwoDCnSB0cmlnZ2VyaW5nIG9mIHRoZSB0b29sdGlwLlxyXG4gICAqL1xyXG4gIHRvZ2dsZSgpOiB2b2lkIHtcclxuICAgIGlmICh0aGlzLl93aW5kb3dSZWYpIHtcclxuICAgICAgdGhpcy5jbG9zZSgpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdGhpcy5vcGVuKCk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBSZXR1cm5zIHdoZXRoZXIgb3Igbm90IHRoZSB0b29sdGlwIGlzIGN1cnJlbnRseSBiZWluZyBzaG93blxyXG4gICAqL1xyXG4gIGlzT3BlbigpOiBib29sZWFuIHsgcmV0dXJuIHRoaXMuX3dpbmRvd1JlZiAhPSBudWxsOyB9XHJcblxyXG4gIG5nT25Jbml0KCkge1xyXG4gICAgdGhpcy5fdW5yZWdpc3Rlckxpc3RlbmVyc0ZuID0gbGlzdGVuVG9UcmlnZ2VycyhcclxuICAgICAgICB0aGlzLl9yZW5kZXJlciwgdGhpcy5fZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50LCB0aGlzLnRyaWdnZXJzLCB0aGlzLm9wZW4uYmluZCh0aGlzKSwgdGhpcy5jbG9zZS5iaW5kKHRoaXMpLFxyXG4gICAgICAgIHRoaXMudG9nZ2xlLmJpbmQodGhpcykpO1xyXG4gIH1cclxuXHJcbiAgbmdPbkRlc3Ryb3koKSB7XHJcbiAgICB0aGlzLmNsb3NlKCk7XHJcbiAgICAvLyBUaGlzIGNoZWNrIGlzIG5lZWRlZCBhcyBpdCBtaWdodCBoYXBwZW4gdGhhdCBuZ09uRGVzdHJveSBpcyBjYWxsZWQgYmVmb3JlIG5nT25Jbml0XHJcbiAgICAvLyB1bmRlciBjZXJ0YWluIGNvbmRpdGlvbnMsIHNlZTogaHR0cHM6Ly9naXRodWIuY29tL25nLWJvb3RzdHJhcC9uZy1ib290c3RyYXAvaXNzdWVzLzIxOTlcclxuICAgIGlmICh0aGlzLl91bnJlZ2lzdGVyTGlzdGVuZXJzRm4pIHtcclxuICAgICAgdGhpcy5fdW5yZWdpc3Rlckxpc3RlbmVyc0ZuKCk7XHJcbiAgICB9XHJcbiAgICB0aGlzLl96b25lU3Vic2NyaXB0aW9uLnVuc3Vic2NyaWJlKCk7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIF9zaG91bGRDbG9zZUZyb21DbGljayhldmVudDogTW91c2VFdmVudCkge1xyXG4gICAgaWYgKGV2ZW50LmJ1dHRvbiAhPT0gMikge1xyXG4gICAgICBpZiAodGhpcy5hdXRvQ2xvc2UgPT09IHRydWUpIHtcclxuICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgfSBlbHNlIGlmICh0aGlzLmF1dG9DbG9zZSA9PT0gJ2luc2lkZScgJiYgdGhpcy5faXNFdmVudEZyb21Ub29sdGlwKGV2ZW50KSkge1xyXG4gICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICB9IGVsc2UgaWYgKHRoaXMuYXV0b0Nsb3NlID09PSAnb3V0c2lkZScgJiYgIXRoaXMuX2lzRXZlbnRGcm9tVG9vbHRpcChldmVudCkpIHtcclxuICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gICAgcmV0dXJuIGZhbHNlO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBfaXNFdmVudEZyb21Ub29sdGlwKGV2ZW50OiBNb3VzZUV2ZW50KSB7XHJcbiAgICBjb25zdCBwb3B1cCA9IHRoaXMuX3dpbmRvd1JlZi5pbnN0YW5jZTtcclxuICAgIHJldHVybiBwb3B1cCA/IHBvcHVwLmlzRXZlbnRGcm9tKGV2ZW50KSA6IGZhbHNlO1xyXG4gIH1cclxufVxyXG4iLCJpbXBvcnQge05nTW9kdWxlLCBNb2R1bGVXaXRoUHJvdmlkZXJzfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuXHJcbmltcG9ydCB7TmdiVG9vbHRpcCwgTmdiVG9vbHRpcFdpbmRvd30gZnJvbSAnLi90b29sdGlwJztcclxuXHJcbmV4cG9ydCB7TmdiVG9vbHRpcENvbmZpZ30gZnJvbSAnLi90b29sdGlwLWNvbmZpZyc7XHJcbmV4cG9ydCB7TmdiVG9vbHRpcH0gZnJvbSAnLi90b29sdGlwJztcclxuZXhwb3J0IHtQbGFjZW1lbnR9IGZyb20gJy4uL3V0aWwvcG9zaXRpb25pbmcnO1xyXG5cclxuQE5nTW9kdWxlKHtkZWNsYXJhdGlvbnM6IFtOZ2JUb29sdGlwLCBOZ2JUb29sdGlwV2luZG93XSwgZXhwb3J0czogW05nYlRvb2x0aXBdLCBlbnRyeUNvbXBvbmVudHM6IFtOZ2JUb29sdGlwV2luZG93XX0pXHJcbmV4cG9ydCBjbGFzcyBOZ2JUb29sdGlwTW9kdWxlIHtcclxuICAvKipcclxuICAgKiBObyBuZWVkIGluIGZvclJvb3QgYW55bW9yZSB3aXRoIHRyZWUtc2hha2VhYmxlIHNlcnZpY2VzXHJcbiAgICpcclxuICAgKiBAZGVwcmVjYXRlZCAzLjAuMFxyXG4gICAqL1xyXG4gIHN0YXRpYyBmb3JSb290KCk6IE1vZHVsZVdpdGhQcm92aWRlcnMgeyByZXR1cm4ge25nTW9kdWxlOiBOZ2JUb29sdGlwTW9kdWxlfTsgfVxyXG59XHJcbiIsImltcG9ydCB7Q29tcG9uZW50LCBJbnB1dCwgT25DaGFuZ2VzLCBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSwgU2ltcGxlQ2hhbmdlc30gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7cmVnRXhwRXNjYXBlLCB0b1N0cmluZ30gZnJvbSAnLi4vdXRpbC91dGlsJztcclxuXHJcbi8qKlxyXG4gKiBBIGNvbXBvbmVudCB0aGF0IGNhbiBiZSB1c2VkIGluc2lkZSBhIGN1c3RvbSByZXN1bHQgdGVtcGxhdGUgaW4gb3JkZXIgdG8gaGlnaGxpZ2h0IHRoZSB0ZXJtIGluc2lkZSB0aGUgdGV4dCBvZiB0aGVcclxuICogcmVzdWx0XHJcbiAqL1xyXG5AQ29tcG9uZW50KHtcclxuICBzZWxlY3RvcjogJ25nYi1oaWdobGlnaHQnLFxyXG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoLFxyXG4gIHRlbXBsYXRlOiBgPG5nLXRlbXBsYXRlIG5nRm9yIFtuZ0Zvck9mXT1cInBhcnRzXCIgbGV0LXBhcnQgbGV0LWlzT2RkPVwib2RkXCI+YCArXHJcbiAgICAgIGA8c3BhbiAqbmdJZj1cImlzT2RkOyBlbHNlIGV2ZW5cIiBbY2xhc3NdPVwiaGlnaGxpZ2h0Q2xhc3NcIj57e3BhcnR9fTwvc3Bhbj48bmctdGVtcGxhdGUgI2V2ZW4+e3twYXJ0fX08L25nLXRlbXBsYXRlPmAgK1xyXG4gICAgICBgPC9uZy10ZW1wbGF0ZT5gLCAgLy8gdGVtcGxhdGUgbmVlZHMgdG8gYmUgZm9ybWF0dGVkIGluIGEgY2VydGFpbiB3YXkgc28gd2UgZG9uJ3QgYWRkIGVtcHR5IHRleHQgbm9kZXNcclxuICBzdHlsZXM6IFtgXHJcbiAgICAubmdiLWhpZ2hsaWdodCB7XHJcbiAgICAgIGZvbnQtd2VpZ2h0OiBib2xkO1xyXG4gICAgfVxyXG4gIGBdXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBOZ2JIaWdobGlnaHQgaW1wbGVtZW50cyBPbkNoYW5nZXMge1xyXG4gIHBhcnRzOiBzdHJpbmdbXTtcclxuXHJcbiAgLyoqXHJcbiAgICogVGhlIENTUyBjbGFzcyBvZiB0aGUgc3BhbiBlbGVtZW50cyB3cmFwcGluZyB0aGUgdGVybSBpbnNpZGUgdGhlIHJlc3VsdFxyXG4gICAqL1xyXG4gIEBJbnB1dCgpIGhpZ2hsaWdodENsYXNzID0gJ25nYi1oaWdobGlnaHQnO1xyXG5cclxuICAvKipcclxuICAgKiBUaGUgcmVzdWx0IHRleHQgdG8gZGlzcGxheS4gSWYgdGhlIHRlcm0gaXMgZm91bmQgaW5zaWRlIHRoaXMgdGV4dCwgaXQncyBoaWdobGlnaHRlZFxyXG4gICAqL1xyXG4gIEBJbnB1dCgpIHJlc3VsdDogc3RyaW5nO1xyXG5cclxuICAvKipcclxuICAgKiBUaGUgc2VhcmNoZWQgdGVybVxyXG4gICAqL1xyXG4gIEBJbnB1dCgpIHRlcm06IHN0cmluZztcclxuXHJcbiAgbmdPbkNoYW5nZXMoY2hhbmdlczogU2ltcGxlQ2hhbmdlcykge1xyXG4gICAgY29uc3QgcmVzdWx0U3RyID0gdG9TdHJpbmcodGhpcy5yZXN1bHQpO1xyXG4gICAgY29uc3QgcmVzdWx0TEMgPSByZXN1bHRTdHIudG9Mb3dlckNhc2UoKTtcclxuICAgIGNvbnN0IHRlcm1MQyA9IHRvU3RyaW5nKHRoaXMudGVybSkudG9Mb3dlckNhc2UoKTtcclxuICAgIGxldCBjdXJyZW50SWR4ID0gMDtcclxuXHJcbiAgICBpZiAodGVybUxDLmxlbmd0aCA+IDApIHtcclxuICAgICAgdGhpcy5wYXJ0cyA9IHJlc3VsdExDLnNwbGl0KG5ldyBSZWdFeHAoYCgke3JlZ0V4cEVzY2FwZSh0ZXJtTEMpfSlgKSkubWFwKChwYXJ0KSA9PiB7XHJcbiAgICAgICAgY29uc3Qgb3JpZ2luYWxQYXJ0ID0gcmVzdWx0U3RyLnN1YnN0cihjdXJyZW50SWR4LCBwYXJ0Lmxlbmd0aCk7XHJcbiAgICAgICAgY3VycmVudElkeCArPSBwYXJ0Lmxlbmd0aDtcclxuICAgICAgICByZXR1cm4gb3JpZ2luYWxQYXJ0O1xyXG4gICAgICB9KTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHRoaXMucGFydHMgPSBbcmVzdWx0U3RyXTtcclxuICAgIH1cclxuICB9XHJcbn1cclxuIiwiaW1wb3J0IHtDb21wb25lbnQsIElucHV0LCBPdXRwdXQsIEV2ZW50RW1pdHRlciwgVGVtcGxhdGVSZWYsIE9uSW5pdH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcblxyXG5pbXBvcnQge3RvU3RyaW5nfSBmcm9tICcuLi91dGlsL3V0aWwnO1xyXG5cclxuLyoqXHJcbiAqIENvbnRleHQgZm9yIHRoZSB0eXBlYWhlYWQgcmVzdWx0IHRlbXBsYXRlIGluIGNhc2UgeW91IHdhbnQgdG8gb3ZlcnJpZGUgdGhlIGRlZmF1bHQgb25lXHJcbiAqL1xyXG5leHBvcnQgaW50ZXJmYWNlIFJlc3VsdFRlbXBsYXRlQ29udGV4dCB7XHJcbiAgLyoqXHJcbiAgICogWW91ciB0eXBlYWhlYWQgcmVzdWx0IGRhdGEgbW9kZWxcclxuICAgKi9cclxuICByZXN1bHQ6IGFueTtcclxuXHJcbiAgLyoqXHJcbiAgICogU2VhcmNoIHRlcm0gZnJvbSB0aGUgaW5wdXQgdXNlZCB0byBnZXQgY3VycmVudCByZXN1bHRcclxuICAgKi9cclxuICB0ZXJtOiBzdHJpbmc7XHJcbn1cclxuXHJcbkBDb21wb25lbnQoe1xyXG4gIHNlbGVjdG9yOiAnbmdiLXR5cGVhaGVhZC13aW5kb3cnLFxyXG4gIGV4cG9ydEFzOiAnbmdiVHlwZWFoZWFkV2luZG93JyxcclxuICBob3N0OiB7J2NsYXNzJzogJ2Ryb3Bkb3duLW1lbnUgc2hvdycsICdyb2xlJzogJ2xpc3Rib3gnLCAnW2lkXSc6ICdpZCd9LFxyXG4gIHRlbXBsYXRlOiBgXHJcbiAgICA8bmctdGVtcGxhdGUgI3J0IGxldC1yZXN1bHQ9XCJyZXN1bHRcIiBsZXQtdGVybT1cInRlcm1cIiBsZXQtZm9ybWF0dGVyPVwiZm9ybWF0dGVyXCI+XHJcbiAgICAgIDxuZ2ItaGlnaGxpZ2h0IFtyZXN1bHRdPVwiZm9ybWF0dGVyKHJlc3VsdClcIiBbdGVybV09XCJ0ZXJtXCI+PC9uZ2ItaGlnaGxpZ2h0PlxyXG4gICAgPC9uZy10ZW1wbGF0ZT5cclxuICAgIDxuZy10ZW1wbGF0ZSBuZ0ZvciBbbmdGb3JPZl09XCJyZXN1bHRzXCIgbGV0LXJlc3VsdCBsZXQtaWR4PVwiaW5kZXhcIj5cclxuICAgICAgPGJ1dHRvbiB0eXBlPVwiYnV0dG9uXCIgY2xhc3M9XCJkcm9wZG93bi1pdGVtXCIgcm9sZT1cIm9wdGlvblwiXHJcbiAgICAgICAgW2lkXT1cImlkICsgJy0nICsgaWR4XCJcclxuICAgICAgICBbY2xhc3MuYWN0aXZlXT1cImlkeCA9PT0gYWN0aXZlSWR4XCJcclxuICAgICAgICAobW91c2VlbnRlcik9XCJtYXJrQWN0aXZlKGlkeClcIlxyXG4gICAgICAgIChjbGljayk9XCJzZWxlY3QocmVzdWx0KVwiPlxyXG4gICAgICAgICAgPG5nLXRlbXBsYXRlIFtuZ1RlbXBsYXRlT3V0bGV0XT1cInJlc3VsdFRlbXBsYXRlIHx8IHJ0XCJcclxuICAgICAgICAgIFtuZ1RlbXBsYXRlT3V0bGV0Q29udGV4dF09XCJ7cmVzdWx0OiByZXN1bHQsIHRlcm06IHRlcm0sIGZvcm1hdHRlcjogZm9ybWF0dGVyfVwiPjwvbmctdGVtcGxhdGU+XHJcbiAgICAgIDwvYnV0dG9uPlxyXG4gICAgPC9uZy10ZW1wbGF0ZT5cclxuICBgXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBOZ2JUeXBlYWhlYWRXaW5kb3cgaW1wbGVtZW50cyBPbkluaXQge1xyXG4gIGFjdGl2ZUlkeCA9IDA7XHJcblxyXG4gIC8qKlxyXG4gICAqICBUaGUgaWQgZm9yIHRoZSB0eXBlYWhlYWQgd2luZG93LiBUaGUgaWQgc2hvdWxkIGJlIHVuaXF1ZSBhbmQgdGhlIHNhbWVcclxuICAgKiAgYXMgdGhlIGFzc29jaWF0ZWQgdHlwZWFoZWFkJ3MgaWQuXHJcbiAgICovXHJcbiAgQElucHV0KCkgaWQ6IHN0cmluZztcclxuXHJcbiAgLyoqXHJcbiAgICogRmxhZyBpbmRpY2F0aW5nIGlmIHRoZSBmaXJzdCByb3cgc2hvdWxkIGJlIGFjdGl2ZSBpbml0aWFsbHlcclxuICAgKi9cclxuICBASW5wdXQoKSBmb2N1c0ZpcnN0ID0gdHJ1ZTtcclxuXHJcbiAgLyoqXHJcbiAgICogVHlwZWFoZWFkIG1hdGNoIHJlc3VsdHMgdG8gYmUgZGlzcGxheWVkXHJcbiAgICovXHJcbiAgQElucHV0KCkgcmVzdWx0cztcclxuXHJcbiAgLyoqXHJcbiAgICogU2VhcmNoIHRlcm0gdXNlZCB0byBnZXQgY3VycmVudCByZXN1bHRzXHJcbiAgICovXHJcbiAgQElucHV0KCkgdGVybTogc3RyaW5nO1xyXG5cclxuICAvKipcclxuICAgKiBBIGZ1bmN0aW9uIHVzZWQgdG8gZm9ybWF0IGEgZ2l2ZW4gcmVzdWx0IGJlZm9yZSBkaXNwbGF5LiBUaGlzIGZ1bmN0aW9uIHNob3VsZCByZXR1cm4gYSBmb3JtYXR0ZWQgc3RyaW5nIHdpdGhvdXQgYW55XHJcbiAgICogSFRNTCBtYXJrdXBcclxuICAgKi9cclxuICBASW5wdXQoKSBmb3JtYXR0ZXIgPSB0b1N0cmluZztcclxuXHJcbiAgLyoqXHJcbiAgICogQSB0ZW1wbGF0ZSB0byBvdmVycmlkZSBhIG1hdGNoaW5nIHJlc3VsdCBkZWZhdWx0IGRpc3BsYXlcclxuICAgKi9cclxuICBASW5wdXQoKSByZXN1bHRUZW1wbGF0ZTogVGVtcGxhdGVSZWY8UmVzdWx0VGVtcGxhdGVDb250ZXh0PjtcclxuXHJcbiAgLyoqXHJcbiAgICogRXZlbnQgcmFpc2VkIHdoZW4gdXNlciBzZWxlY3RzIGEgcGFydGljdWxhciByZXN1bHQgcm93XHJcbiAgICovXHJcbiAgQE91dHB1dCgnc2VsZWN0Jykgc2VsZWN0RXZlbnQgPSBuZXcgRXZlbnRFbWl0dGVyKCk7XHJcblxyXG4gIEBPdXRwdXQoJ2FjdGl2ZUNoYW5nZScpIGFjdGl2ZUNoYW5nZUV2ZW50ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xyXG5cclxuICBoYXNBY3RpdmUoKSB7IHJldHVybiB0aGlzLmFjdGl2ZUlkeCA+IC0xICYmIHRoaXMuYWN0aXZlSWR4IDwgdGhpcy5yZXN1bHRzLmxlbmd0aDsgfVxyXG5cclxuICBnZXRBY3RpdmUoKSB7IHJldHVybiB0aGlzLnJlc3VsdHNbdGhpcy5hY3RpdmVJZHhdOyB9XHJcblxyXG4gIG1hcmtBY3RpdmUoYWN0aXZlSWR4OiBudW1iZXIpIHtcclxuICAgIHRoaXMuYWN0aXZlSWR4ID0gYWN0aXZlSWR4O1xyXG4gICAgdGhpcy5fYWN0aXZlQ2hhbmdlZCgpO1xyXG4gIH1cclxuXHJcbiAgbmV4dCgpIHtcclxuICAgIGlmICh0aGlzLmFjdGl2ZUlkeCA9PT0gdGhpcy5yZXN1bHRzLmxlbmd0aCAtIDEpIHtcclxuICAgICAgdGhpcy5hY3RpdmVJZHggPSB0aGlzLmZvY3VzRmlyc3QgPyAodGhpcy5hY3RpdmVJZHggKyAxKSAlIHRoaXMucmVzdWx0cy5sZW5ndGggOiAtMTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHRoaXMuYWN0aXZlSWR4Kys7XHJcbiAgICB9XHJcbiAgICB0aGlzLl9hY3RpdmVDaGFuZ2VkKCk7XHJcbiAgfVxyXG5cclxuICBwcmV2KCkge1xyXG4gICAgaWYgKHRoaXMuYWN0aXZlSWR4IDwgMCkge1xyXG4gICAgICB0aGlzLmFjdGl2ZUlkeCA9IHRoaXMucmVzdWx0cy5sZW5ndGggLSAxO1xyXG4gICAgfSBlbHNlIGlmICh0aGlzLmFjdGl2ZUlkeCA9PT0gMCkge1xyXG4gICAgICB0aGlzLmFjdGl2ZUlkeCA9IHRoaXMuZm9jdXNGaXJzdCA/IHRoaXMucmVzdWx0cy5sZW5ndGggLSAxIDogLTE7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB0aGlzLmFjdGl2ZUlkeC0tO1xyXG4gICAgfVxyXG4gICAgdGhpcy5fYWN0aXZlQ2hhbmdlZCgpO1xyXG4gIH1cclxuXHJcbiAgcmVzZXRBY3RpdmUoKSB7XHJcbiAgICB0aGlzLmFjdGl2ZUlkeCA9IHRoaXMuZm9jdXNGaXJzdCA/IDAgOiAtMTtcclxuICAgIHRoaXMuX2FjdGl2ZUNoYW5nZWQoKTtcclxuICB9XHJcblxyXG4gIHNlbGVjdChpdGVtKSB7IHRoaXMuc2VsZWN0RXZlbnQuZW1pdChpdGVtKTsgfVxyXG5cclxuICBuZ09uSW5pdCgpIHsgdGhpcy5yZXNldEFjdGl2ZSgpOyB9XHJcblxyXG4gIHByaXZhdGUgX2FjdGl2ZUNoYW5nZWQoKSB7XHJcbiAgICB0aGlzLmFjdGl2ZUNoYW5nZUV2ZW50LmVtaXQodGhpcy5hY3RpdmVJZHggPj0gMCA/IHRoaXMuaWQgKyAnLScgKyB0aGlzLmFjdGl2ZUlkeCA6IHVuZGVmaW5lZCk7XHJcbiAgfVxyXG59XHJcbiIsImltcG9ydCB7SW5qZWN0YWJsZSwgSW5qZWN0LCBJbmplY3Rpb25Ub2tlbiwgT25EZXN0cm95fSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHtET0NVTUVOVH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcclxuXHJcblxyXG5cclxuLy8gdXNlZnVsbmVzcyAoYW5kIGRlZmF1bHQgdmFsdWUpIG9mIGRlbGF5IGRvY3VtZW50ZWQgaW4gTWF0ZXJpYWwncyBDREtcclxuLy8gaHR0cHM6Ly9naXRodWIuY29tL2FuZ3VsYXIvbWF0ZXJpYWwyL2Jsb2IvNjQwNWRhOWI4ZTg1MzJhN2U1Yzg1NGM5MjBlZTE4MTVjMjc1ZDczNC9zcmMvY2RrL2ExMXkvbGl2ZS1hbm5vdW5jZXIvbGl2ZS1hbm5vdW5jZXIudHMjTDUwXHJcbmV4cG9ydCB0eXBlIEFSSUFfTElWRV9ERUxBWV9UWVBFID0gbnVtYmVyIHwgbnVsbDtcclxuZXhwb3J0IGNvbnN0IEFSSUFfTElWRV9ERUxBWSA9IG5ldyBJbmplY3Rpb25Ub2tlbjxBUklBX0xJVkVfREVMQVlfVFlQRT4oXHJcbiAgICAnbGl2ZSBhbm5vdW5jZXIgZGVsYXknLCB7cHJvdmlkZWRJbjogJ3Jvb3QnLCBmYWN0b3J5OiBBUklBX0xJVkVfREVMQVlfRkFDVE9SWX0pO1xyXG5leHBvcnQgZnVuY3Rpb24gQVJJQV9MSVZFX0RFTEFZX0ZBQ1RPUlkoKTogbnVtYmVyIHtcclxuICByZXR1cm4gMTAwO1xyXG59XHJcblxyXG5cclxuZnVuY3Rpb24gZ2V0TGl2ZUVsZW1lbnQoZG9jdW1lbnQ6IGFueSwgbGF6eUNyZWF0ZSA9IGZhbHNlKTogSFRNTEVsZW1lbnQgfCBudWxsIHtcclxuICBsZXQgZWxlbWVudCA9IGRvY3VtZW50LmJvZHkucXVlcnlTZWxlY3RvcignI25nYi1saXZlJykgYXMgSFRNTEVsZW1lbnQ7XHJcblxyXG4gIGlmIChlbGVtZW50ID09IG51bGwgJiYgbGF6eUNyZWF0ZSkge1xyXG4gICAgZWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xyXG5cclxuICAgIGVsZW1lbnQuc2V0QXR0cmlidXRlKCdpZCcsICduZ2ItbGl2ZScpO1xyXG4gICAgZWxlbWVudC5zZXRBdHRyaWJ1dGUoJ2FyaWEtbGl2ZScsICdwb2xpdGUnKTtcclxuICAgIGVsZW1lbnQuc2V0QXR0cmlidXRlKCdhcmlhLWF0b21pYycsICd0cnVlJyk7XHJcblxyXG4gICAgZWxlbWVudC5jbGFzc0xpc3QuYWRkKCdzci1vbmx5Jyk7XHJcblxyXG4gICAgZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZChlbGVtZW50KTtcclxuICB9XHJcblxyXG4gIHJldHVybiBlbGVtZW50O1xyXG59XHJcblxyXG5cclxuXHJcbkBJbmplY3RhYmxlKHtwcm92aWRlZEluOiAncm9vdCd9KVxyXG5leHBvcnQgY2xhc3MgTGl2ZSBpbXBsZW1lbnRzIE9uRGVzdHJveSB7XHJcbiAgY29uc3RydWN0b3IoQEluamVjdChET0NVTUVOVCkgcHJpdmF0ZSBfZG9jdW1lbnQ6IGFueSwgQEluamVjdChBUklBX0xJVkVfREVMQVkpIHByaXZhdGUgX2RlbGF5OiBhbnkpIHt9XHJcblxyXG4gIG5nT25EZXN0cm95KCkge1xyXG4gICAgY29uc3QgZWxlbWVudCA9IGdldExpdmVFbGVtZW50KHRoaXMuX2RvY3VtZW50KTtcclxuICAgIGlmIChlbGVtZW50KSB7XHJcbiAgICAgIGVsZW1lbnQucGFyZW50RWxlbWVudC5yZW1vdmVDaGlsZChlbGVtZW50KTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHNheShtZXNzYWdlOiBzdHJpbmcpIHtcclxuICAgIGNvbnN0IGVsZW1lbnQgPSBnZXRMaXZlRWxlbWVudCh0aGlzLl9kb2N1bWVudCwgdHJ1ZSk7XHJcbiAgICBjb25zdCBkZWxheSA9IHRoaXMuX2RlbGF5O1xyXG5cclxuICAgIGVsZW1lbnQudGV4dENvbnRlbnQgPSAnJztcclxuICAgIGNvbnN0IHNldFRleHQgPSAoKSA9PiBlbGVtZW50LnRleHRDb250ZW50ID0gbWVzc2FnZTtcclxuICAgIGlmIChkZWxheSA9PT0gbnVsbCkge1xyXG4gICAgICBzZXRUZXh0KCk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBzZXRUaW1lb3V0KHNldFRleHQsIGRlbGF5KTtcclxuICAgIH1cclxuICB9XHJcbn1cclxuIiwiaW1wb3J0IHtJbmplY3RhYmxlfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHtQbGFjZW1lbnRBcnJheX0gZnJvbSAnLi4vdXRpbC9wb3NpdGlvbmluZyc7XHJcblxyXG4vKipcclxuICogQ29uZmlndXJhdGlvbiBzZXJ2aWNlIGZvciB0aGUgTmdiVHlwZWFoZWFkIGNvbXBvbmVudC5cclxuICogWW91IGNhbiBpbmplY3QgdGhpcyBzZXJ2aWNlLCB0eXBpY2FsbHkgaW4geW91ciByb290IGNvbXBvbmVudCwgYW5kIGN1c3RvbWl6ZSB0aGUgdmFsdWVzIG9mIGl0cyBwcm9wZXJ0aWVzIGluXHJcbiAqIG9yZGVyIHRvIHByb3ZpZGUgZGVmYXVsdCB2YWx1ZXMgZm9yIGFsbCB0aGUgdHlwZWFoZWFkcyB1c2VkIGluIHRoZSBhcHBsaWNhdGlvbi5cclxuICovXHJcbkBJbmplY3RhYmxlKHtwcm92aWRlZEluOiAncm9vdCd9KVxyXG5leHBvcnQgY2xhc3MgTmdiVHlwZWFoZWFkQ29uZmlnIHtcclxuICBjb250YWluZXI7XHJcbiAgZWRpdGFibGUgPSB0cnVlO1xyXG4gIGZvY3VzRmlyc3QgPSB0cnVlO1xyXG4gIHNob3dIaW50ID0gZmFsc2U7XHJcbiAgcGxhY2VtZW50OiBQbGFjZW1lbnRBcnJheSA9ICdib3R0b20tbGVmdCc7XHJcbn1cclxuIiwiaW1wb3J0IHtcclxuICBDb21wb25lbnRGYWN0b3J5UmVzb2x2ZXIsXHJcbiAgQ29tcG9uZW50UmVmLFxyXG4gIERpcmVjdGl2ZSxcclxuICBFbGVtZW50UmVmLFxyXG4gIEV2ZW50RW1pdHRlcixcclxuICBmb3J3YXJkUmVmLFxyXG4gIEluamVjdG9yLFxyXG4gIElucHV0LFxyXG4gIE5nWm9uZSxcclxuICBPbkRlc3Ryb3ksXHJcbiAgT25Jbml0LFxyXG4gIE91dHB1dCxcclxuICBSZW5kZXJlcjIsXHJcbiAgVGVtcGxhdGVSZWYsXHJcbiAgVmlld0NvbnRhaW5lclJlZlxyXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQge0NvbnRyb2xWYWx1ZUFjY2Vzc29yLCBOR19WQUxVRV9BQ0NFU1NPUn0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xyXG5pbXBvcnQge09ic2VydmFibGUsIEJlaGF2aW9yU3ViamVjdCwgU3Vic2NyaXB0aW9uLCBmcm9tRXZlbnR9IGZyb20gJ3J4anMnO1xyXG5pbXBvcnQge3Bvc2l0aW9uRWxlbWVudHMsIFBsYWNlbWVudEFycmF5fSBmcm9tICcuLi91dGlsL3Bvc2l0aW9uaW5nJztcclxuaW1wb3J0IHtOZ2JUeXBlYWhlYWRXaW5kb3csIFJlc3VsdFRlbXBsYXRlQ29udGV4dH0gZnJvbSAnLi90eXBlYWhlYWQtd2luZG93JztcclxuaW1wb3J0IHtQb3B1cFNlcnZpY2V9IGZyb20gJy4uL3V0aWwvcG9wdXAnO1xyXG5pbXBvcnQge3RvU3RyaW5nLCBpc0RlZmluZWR9IGZyb20gJy4uL3V0aWwvdXRpbCc7XHJcbmltcG9ydCB7S2V5fSBmcm9tICcuLi91dGlsL2tleSc7XHJcbmltcG9ydCB7TGl2ZX0gZnJvbSAnLi4vdXRpbC9hY2Nlc3NpYmlsaXR5L2xpdmUnO1xyXG5pbXBvcnQge05nYlR5cGVhaGVhZENvbmZpZ30gZnJvbSAnLi90eXBlYWhlYWQtY29uZmlnJztcclxuaW1wb3J0IHttYXAsIHN3aXRjaE1hcCwgdGFwfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XHJcblxyXG5jb25zdCBOR0JfVFlQRUFIRUFEX1ZBTFVFX0FDQ0VTU09SID0ge1xyXG4gIHByb3ZpZGU6IE5HX1ZBTFVFX0FDQ0VTU09SLFxyXG4gIHVzZUV4aXN0aW5nOiBmb3J3YXJkUmVmKCgpID0+IE5nYlR5cGVhaGVhZCksXHJcbiAgbXVsdGk6IHRydWVcclxufTtcclxuXHJcbi8qKlxyXG4gKiBQYXlsb2FkIG9mIHRoZSBzZWxlY3RJdGVtIGV2ZW50LlxyXG4gKi9cclxuZXhwb3J0IGludGVyZmFjZSBOZ2JUeXBlYWhlYWRTZWxlY3RJdGVtRXZlbnQge1xyXG4gIC8qKlxyXG4gICAqIEFuIGl0ZW0gYWJvdXQgdG8gYmUgc2VsZWN0ZWRcclxuICAgKi9cclxuICBpdGVtOiBhbnk7XHJcblxyXG4gIC8qKlxyXG4gICAqIEZ1bmN0aW9uIHRoYXQgd2lsbCBwcmV2ZW50IGl0ZW0gc2VsZWN0aW9uIGlmIGNhbGxlZFxyXG4gICAqL1xyXG4gIHByZXZlbnREZWZhdWx0OiAoKSA9PiB2b2lkO1xyXG59XHJcblxyXG5sZXQgbmV4dFdpbmRvd0lkID0gMDtcclxuXHJcbi8qKlxyXG4gKiBOZ2JUeXBlYWhlYWQgZGlyZWN0aXZlIHByb3ZpZGVzIGEgc2ltcGxlIHdheSBvZiBjcmVhdGluZyBwb3dlcmZ1bCB0eXBlYWhlYWRzIGZyb20gYW55IHRleHQgaW5wdXRcclxuICovXHJcbkBEaXJlY3RpdmUoe1xyXG4gIHNlbGVjdG9yOiAnaW5wdXRbbmdiVHlwZWFoZWFkXScsXHJcbiAgZXhwb3J0QXM6ICduZ2JUeXBlYWhlYWQnLFxyXG4gIGhvc3Q6IHtcclxuICAgICcoYmx1ciknOiAnaGFuZGxlQmx1cigpJyxcclxuICAgICdbY2xhc3Mub3Blbl0nOiAnaXNQb3B1cE9wZW4oKScsXHJcbiAgICAnKGRvY3VtZW50OmNsaWNrKSc6ICdvbkRvY3VtZW50Q2xpY2soJGV2ZW50KScsXHJcbiAgICAnKGtleWRvd24pJzogJ2hhbmRsZUtleURvd24oJGV2ZW50KScsXHJcbiAgICAnW2F1dG9jb21wbGV0ZV0nOiAnYXV0b2NvbXBsZXRlJyxcclxuICAgICdhdXRvY2FwaXRhbGl6ZSc6ICdvZmYnLFxyXG4gICAgJ2F1dG9jb3JyZWN0JzogJ29mZicsXHJcbiAgICAncm9sZSc6ICdjb21ib2JveCcsXHJcbiAgICAnYXJpYS1tdWx0aWxpbmUnOiAnZmFsc2UnLFxyXG4gICAgJ1thdHRyLmFyaWEtYXV0b2NvbXBsZXRlXSc6ICdzaG93SGludCA/IFwiYm90aFwiIDogXCJsaXN0XCInLFxyXG4gICAgJ1thdHRyLmFyaWEtYWN0aXZlZGVzY2VuZGFudF0nOiAnYWN0aXZlRGVzY2VuZGFudCcsXHJcbiAgICAnW2F0dHIuYXJpYS1vd25zXSc6ICdpc1BvcHVwT3BlbigpID8gcG9wdXBJZCA6IG51bGwnLFxyXG4gICAgJ1thdHRyLmFyaWEtZXhwYW5kZWRdJzogJ2lzUG9wdXBPcGVuKCknXHJcbiAgfSxcclxuICBwcm92aWRlcnM6IFtOR0JfVFlQRUFIRUFEX1ZBTFVFX0FDQ0VTU09SXVxyXG59KVxyXG5leHBvcnQgY2xhc3MgTmdiVHlwZWFoZWFkIGltcGxlbWVudHMgQ29udHJvbFZhbHVlQWNjZXNzb3IsXHJcbiAgICBPbkluaXQsIE9uRGVzdHJveSB7XHJcbiAgcHJpdmF0ZSBfcG9wdXBTZXJ2aWNlOiBQb3B1cFNlcnZpY2U8TmdiVHlwZWFoZWFkV2luZG93PjtcclxuICBwcml2YXRlIF9zdWJzY3JpcHRpb246IFN1YnNjcmlwdGlvbjtcclxuICBwcml2YXRlIF9pbnB1dFZhbHVlQmFja3VwOiBzdHJpbmc7XHJcbiAgcHJpdmF0ZSBfdmFsdWVDaGFuZ2VzOiBPYnNlcnZhYmxlPHN0cmluZz47XHJcbiAgcHJpdmF0ZSBfcmVzdWJzY3JpYmVUeXBlYWhlYWQ6IEJlaGF2aW9yU3ViamVjdDxhbnk+O1xyXG4gIHByaXZhdGUgX3dpbmRvd1JlZjogQ29tcG9uZW50UmVmPE5nYlR5cGVhaGVhZFdpbmRvdz47XHJcbiAgcHJpdmF0ZSBfem9uZVN1YnNjcmlwdGlvbjogYW55O1xyXG5cclxuICAvKipcclxuICAgKiBWYWx1ZSBmb3IgdGhlIGNvbmZpZ3VyYWJsZSBhdXRvY29tcGxldGUgYXR0cmlidXRlLlxyXG4gICAqIERlZmF1bHRzIHRvICdvZmYnIHRvIGRpc2FibGUgdGhlIG5hdGl2ZSBicm93c2VyIGF1dG9jb21wbGV0ZSwgYnV0IHRoaXMgc3RhbmRhcmQgdmFsdWUgZG9lcyBub3Qgc2VlbVxyXG4gICAqIHRvIGJlIGFsd2F5cyBjb3JyZWN0bHkgdGFrZW4gaW50byBhY2NvdW50LlxyXG4gICAqXHJcbiAgICogQHNpbmNlIDIuMS4wXHJcbiAgICovXHJcbiAgQElucHV0KCkgYXV0b2NvbXBsZXRlID0gJ29mZic7XHJcblxyXG4gIC8qKlxyXG4gICAqIEEgc2VsZWN0b3Igc3BlY2lmeWluZyB0aGUgZWxlbWVudCB0aGUgdG9vbHRpcCBzaG91bGQgYmUgYXBwZW5kZWQgdG8uXHJcbiAgICogQ3VycmVudGx5IG9ubHkgc3VwcG9ydHMgXCJib2R5XCIuXHJcbiAgICovXHJcbiAgQElucHV0KCkgY29udGFpbmVyOiBzdHJpbmc7XHJcblxyXG4gIC8qKlxyXG4gICAqIEEgZmxhZyBpbmRpY2F0aW5nIGlmIG1vZGVsIHZhbHVlcyBzaG91bGQgYmUgcmVzdHJpY3RlZCB0byB0aGUgb25lcyBzZWxlY3RlZCBmcm9tIHRoZSBwb3B1cCBvbmx5LlxyXG4gICAqL1xyXG4gIEBJbnB1dCgpIGVkaXRhYmxlOiBib29sZWFuO1xyXG5cclxuICAvKipcclxuICAgKiBBIGZsYWcgaW5kaWNhdGluZyBpZiB0aGUgZmlyc3QgbWF0Y2ggc2hvdWxkIGF1dG9tYXRpY2FsbHkgYmUgZm9jdXNlZCBhcyB5b3UgdHlwZS5cclxuICAgKi9cclxuICBASW5wdXQoKSBmb2N1c0ZpcnN0OiBib29sZWFuO1xyXG5cclxuICAvKipcclxuICAgKiBBIGZ1bmN0aW9uIHRvIGNvbnZlcnQgYSBnaXZlbiB2YWx1ZSBpbnRvIHN0cmluZyB0byBkaXNwbGF5IGluIHRoZSBpbnB1dCBmaWVsZFxyXG4gICAqL1xyXG4gIEBJbnB1dCgpIGlucHV0Rm9ybWF0dGVyOiAodmFsdWU6IGFueSkgPT4gc3RyaW5nO1xyXG5cclxuICAvKipcclxuICAgKiBBIGZ1bmN0aW9uIHRvIHRyYW5zZm9ybSB0aGUgcHJvdmlkZWQgb2JzZXJ2YWJsZSB0ZXh0IGludG8gdGhlIGFycmF5IG9mIHJlc3VsdHMuICBOb3RlIHRoYXQgdGhlIFwidGhpc1wiIGFyZ3VtZW50XHJcbiAgICogaXMgdW5kZWZpbmVkIHNvIHlvdSBuZWVkIHRvIGV4cGxpY2l0bHkgYmluZCBpdCB0byBhIGRlc2lyZWQgXCJ0aGlzXCIgdGFyZ2V0LlxyXG4gICAqL1xyXG4gIEBJbnB1dCgpIG5nYlR5cGVhaGVhZDogKHRleHQ6IE9ic2VydmFibGU8c3RyaW5nPikgPT4gT2JzZXJ2YWJsZTxhbnlbXT47XHJcblxyXG4gIC8qKlxyXG4gICAqIEEgZnVuY3Rpb24gdG8gZm9ybWF0IGEgZ2l2ZW4gcmVzdWx0IGJlZm9yZSBkaXNwbGF5LiBUaGlzIGZ1bmN0aW9uIHNob3VsZCByZXR1cm4gYSBmb3JtYXR0ZWQgc3RyaW5nIHdpdGhvdXQgYW55XHJcbiAgICogSFRNTCBtYXJrdXBcclxuICAgKi9cclxuICBASW5wdXQoKSByZXN1bHRGb3JtYXR0ZXI6ICh2YWx1ZTogYW55KSA9PiBzdHJpbmc7XHJcblxyXG4gIC8qKlxyXG4gICAqIEEgdGVtcGxhdGUgdG8gb3ZlcnJpZGUgYSBtYXRjaGluZyByZXN1bHQgZGVmYXVsdCBkaXNwbGF5XHJcbiAgICovXHJcbiAgQElucHV0KCkgcmVzdWx0VGVtcGxhdGU6IFRlbXBsYXRlUmVmPFJlc3VsdFRlbXBsYXRlQ29udGV4dD47XHJcblxyXG4gIC8qKlxyXG4gICAqIFNob3cgaGludCB3aGVuIGFuIG9wdGlvbiBpbiB0aGUgcmVzdWx0IGxpc3QgbWF0Y2hlcy5cclxuICAgKi9cclxuICBASW5wdXQoKSBzaG93SGludDogYm9vbGVhbjtcclxuXHJcbiAgLyoqIFBsYWNlbWVudCBvZiBhIHR5cGVhaGVhZCBhY2NlcHRzOlxyXG4gICAqICAgIFwidG9wXCIsIFwidG9wLWxlZnRcIiwgXCJ0b3AtcmlnaHRcIiwgXCJib3R0b21cIiwgXCJib3R0b20tbGVmdFwiLCBcImJvdHRvbS1yaWdodFwiLFxyXG4gICAqICAgIFwibGVmdFwiLCBcImxlZnQtdG9wXCIsIFwibGVmdC1ib3R0b21cIiwgXCJyaWdodFwiLCBcInJpZ2h0LXRvcFwiLCBcInJpZ2h0LWJvdHRvbVwiXHJcbiAgICogYW5kIGFycmF5IG9mIGFib3ZlIHZhbHVlcy5cclxuICAqL1xyXG4gIEBJbnB1dCgpIHBsYWNlbWVudDogUGxhY2VtZW50QXJyYXkgPSAnYm90dG9tLWxlZnQnO1xyXG5cclxuICAvKipcclxuICAgKiBBbiBldmVudCBlbWl0dGVkIHdoZW4gYSBtYXRjaCBpcyBzZWxlY3RlZC4gRXZlbnQgcGF5bG9hZCBpcyBvZiB0eXBlIE5nYlR5cGVhaGVhZFNlbGVjdEl0ZW1FdmVudC5cclxuICAgKi9cclxuICBAT3V0cHV0KCkgc2VsZWN0SXRlbSA9IG5ldyBFdmVudEVtaXR0ZXI8TmdiVHlwZWFoZWFkU2VsZWN0SXRlbUV2ZW50PigpO1xyXG5cclxuICBhY3RpdmVEZXNjZW5kYW50OiBzdHJpbmc7XHJcbiAgcG9wdXBJZCA9IGBuZ2ItdHlwZWFoZWFkLSR7bmV4dFdpbmRvd0lkKyt9YDtcclxuXHJcbiAgcHJpdmF0ZSBfb25Ub3VjaGVkID0gKCkgPT4ge307XHJcbiAgcHJpdmF0ZSBfb25DaGFuZ2UgPSAoXzogYW55KSA9PiB7fTtcclxuXHJcbiAgY29uc3RydWN0b3IoXHJcbiAgICAgIHByaXZhdGUgX2VsZW1lbnRSZWY6IEVsZW1lbnRSZWY8SFRNTElucHV0RWxlbWVudD4sIHByaXZhdGUgX3ZpZXdDb250YWluZXJSZWY6IFZpZXdDb250YWluZXJSZWYsXHJcbiAgICAgIHByaXZhdGUgX3JlbmRlcmVyOiBSZW5kZXJlcjIsIHByaXZhdGUgX2luamVjdG9yOiBJbmplY3RvciwgY29tcG9uZW50RmFjdG9yeVJlc29sdmVyOiBDb21wb25lbnRGYWN0b3J5UmVzb2x2ZXIsXHJcbiAgICAgIGNvbmZpZzogTmdiVHlwZWFoZWFkQ29uZmlnLCBuZ1pvbmU6IE5nWm9uZSwgcHJpdmF0ZSBfbGl2ZTogTGl2ZSkge1xyXG4gICAgdGhpcy5jb250YWluZXIgPSBjb25maWcuY29udGFpbmVyO1xyXG4gICAgdGhpcy5lZGl0YWJsZSA9IGNvbmZpZy5lZGl0YWJsZTtcclxuICAgIHRoaXMuZm9jdXNGaXJzdCA9IGNvbmZpZy5mb2N1c0ZpcnN0O1xyXG4gICAgdGhpcy5zaG93SGludCA9IGNvbmZpZy5zaG93SGludDtcclxuICAgIHRoaXMucGxhY2VtZW50ID0gY29uZmlnLnBsYWNlbWVudDtcclxuXHJcbiAgICB0aGlzLl92YWx1ZUNoYW5nZXMgPSBmcm9tRXZlbnQ8RXZlbnQ+KF9lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQsICdpbnB1dCcpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLnBpcGUobWFwKCRldmVudCA9PiAoJGV2ZW50LnRhcmdldCBhcyBIVE1MSW5wdXRFbGVtZW50KS52YWx1ZSkpO1xyXG5cclxuICAgIHRoaXMuX3Jlc3Vic2NyaWJlVHlwZWFoZWFkID0gbmV3IEJlaGF2aW9yU3ViamVjdChudWxsKTtcclxuXHJcbiAgICB0aGlzLl9wb3B1cFNlcnZpY2UgPSBuZXcgUG9wdXBTZXJ2aWNlPE5nYlR5cGVhaGVhZFdpbmRvdz4oXHJcbiAgICAgICAgTmdiVHlwZWFoZWFkV2luZG93LCBfaW5qZWN0b3IsIF92aWV3Q29udGFpbmVyUmVmLCBfcmVuZGVyZXIsIGNvbXBvbmVudEZhY3RvcnlSZXNvbHZlcik7XHJcblxyXG4gICAgdGhpcy5fem9uZVN1YnNjcmlwdGlvbiA9IG5nWm9uZS5vblN0YWJsZS5zdWJzY3JpYmUoKCkgPT4ge1xyXG4gICAgICBpZiAodGhpcy5pc1BvcHVwT3BlbigpKSB7XHJcbiAgICAgICAgcG9zaXRpb25FbGVtZW50cyhcclxuICAgICAgICAgICAgdGhpcy5fZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50LCB0aGlzLl93aW5kb3dSZWYubG9jYXRpb24ubmF0aXZlRWxlbWVudCwgdGhpcy5wbGFjZW1lbnQsXHJcbiAgICAgICAgICAgIHRoaXMuY29udGFpbmVyID09PSAnYm9keScpO1xyXG4gICAgICB9XHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIG5nT25Jbml0KCk6IHZvaWQge1xyXG4gICAgY29uc3QgaW5wdXRWYWx1ZXMkID0gdGhpcy5fdmFsdWVDaGFuZ2VzLnBpcGUodGFwKHZhbHVlID0+IHtcclxuICAgICAgdGhpcy5faW5wdXRWYWx1ZUJhY2t1cCA9IHZhbHVlO1xyXG4gICAgICBpZiAodGhpcy5lZGl0YWJsZSkge1xyXG4gICAgICAgIHRoaXMuX29uQ2hhbmdlKHZhbHVlKTtcclxuICAgICAgfVxyXG4gICAgfSkpO1xyXG4gICAgY29uc3QgcmVzdWx0cyQgPSBpbnB1dFZhbHVlcyQucGlwZSh0aGlzLm5nYlR5cGVhaGVhZCk7XHJcbiAgICBjb25zdCBwcm9jZXNzZWRSZXN1bHRzJCA9IHJlc3VsdHMkLnBpcGUodGFwKCgpID0+IHtcclxuICAgICAgaWYgKCF0aGlzLmVkaXRhYmxlKSB7XHJcbiAgICAgICAgdGhpcy5fb25DaGFuZ2UodW5kZWZpbmVkKTtcclxuICAgICAgfVxyXG4gICAgfSkpO1xyXG4gICAgY29uc3QgdXNlcklucHV0JCA9IHRoaXMuX3Jlc3Vic2NyaWJlVHlwZWFoZWFkLnBpcGUoc3dpdGNoTWFwKCgpID0+IHByb2Nlc3NlZFJlc3VsdHMkKSk7XHJcbiAgICB0aGlzLl9zdWJzY3JpcHRpb24gPSB0aGlzLl9zdWJzY3JpYmVUb1VzZXJJbnB1dCh1c2VySW5wdXQkKTtcclxuICB9XHJcblxyXG4gIG5nT25EZXN0cm95KCk6IHZvaWQge1xyXG4gICAgdGhpcy5fY2xvc2VQb3B1cCgpO1xyXG4gICAgdGhpcy5fdW5zdWJzY3JpYmVGcm9tVXNlcklucHV0KCk7XHJcbiAgICB0aGlzLl96b25lU3Vic2NyaXB0aW9uLnVuc3Vic2NyaWJlKCk7XHJcbiAgfVxyXG5cclxuICByZWdpc3Rlck9uQ2hhbmdlKGZuOiAodmFsdWU6IGFueSkgPT4gYW55KTogdm9pZCB7IHRoaXMuX29uQ2hhbmdlID0gZm47IH1cclxuXHJcbiAgcmVnaXN0ZXJPblRvdWNoZWQoZm46ICgpID0+IGFueSk6IHZvaWQgeyB0aGlzLl9vblRvdWNoZWQgPSBmbjsgfVxyXG5cclxuICB3cml0ZVZhbHVlKHZhbHVlKSB7IHRoaXMuX3dyaXRlSW5wdXRWYWx1ZSh0aGlzLl9mb3JtYXRJdGVtRm9ySW5wdXQodmFsdWUpKTsgfVxyXG5cclxuICBzZXREaXNhYmxlZFN0YXRlKGlzRGlzYWJsZWQ6IGJvb2xlYW4pOiB2b2lkIHtcclxuICAgIHRoaXMuX3JlbmRlcmVyLnNldFByb3BlcnR5KHRoaXMuX2VsZW1lbnRSZWYubmF0aXZlRWxlbWVudCwgJ2Rpc2FibGVkJywgaXNEaXNhYmxlZCk7XHJcbiAgfVxyXG5cclxuICBvbkRvY3VtZW50Q2xpY2soZXZlbnQpIHtcclxuICAgIGlmIChldmVudC50YXJnZXQgIT09IHRoaXMuX2VsZW1lbnRSZWYubmF0aXZlRWxlbWVudCkge1xyXG4gICAgICB0aGlzLmRpc21pc3NQb3B1cCgpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogRGlzbWlzc2VzIHR5cGVhaGVhZCBwb3B1cCB3aW5kb3dcclxuICAgKi9cclxuICBkaXNtaXNzUG9wdXAoKSB7XHJcbiAgICBpZiAodGhpcy5pc1BvcHVwT3BlbigpKSB7XHJcbiAgICAgIHRoaXMuX2Nsb3NlUG9wdXAoKTtcclxuICAgICAgdGhpcy5fd3JpdGVJbnB1dFZhbHVlKHRoaXMuX2lucHV0VmFsdWVCYWNrdXApO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogUmV0dXJucyB0cnVlIGlmIHRoZSB0eXBlYWhlYWQgcG9wdXAgd2luZG93IGlzIGRpc3BsYXllZFxyXG4gICAqL1xyXG4gIGlzUG9wdXBPcGVuKCkgeyByZXR1cm4gdGhpcy5fd2luZG93UmVmICE9IG51bGw7IH1cclxuXHJcbiAgaGFuZGxlQmx1cigpIHtcclxuICAgIHRoaXMuX3Jlc3Vic2NyaWJlVHlwZWFoZWFkLm5leHQobnVsbCk7XHJcbiAgICB0aGlzLl9vblRvdWNoZWQoKTtcclxuICB9XHJcblxyXG4gIGhhbmRsZUtleURvd24oZXZlbnQ6IEtleWJvYXJkRXZlbnQpIHtcclxuICAgIGlmICghdGhpcy5pc1BvcHVwT3BlbigpKSB7XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuXHJcbiAgICBpZiAoS2V5W3RvU3RyaW5nKGV2ZW50LndoaWNoKV0pIHtcclxuICAgICAgc3dpdGNoIChldmVudC53aGljaCkge1xyXG4gICAgICAgIGNhc2UgS2V5LkFycm93RG93bjpcclxuICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgICB0aGlzLl93aW5kb3dSZWYuaW5zdGFuY2UubmV4dCgpO1xyXG4gICAgICAgICAgdGhpcy5fc2hvd0hpbnQoKTtcclxuICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIGNhc2UgS2V5LkFycm93VXA6XHJcbiAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAgICAgdGhpcy5fd2luZG93UmVmLmluc3RhbmNlLnByZXYoKTtcclxuICAgICAgICAgIHRoaXMuX3Nob3dIaW50KCk7XHJcbiAgICAgICAgICBicmVhaztcclxuICAgICAgICBjYXNlIEtleS5FbnRlcjpcclxuICAgICAgICBjYXNlIEtleS5UYWI6XHJcbiAgICAgICAgICBjb25zdCByZXN1bHQgPSB0aGlzLl93aW5kb3dSZWYuaW5zdGFuY2UuZ2V0QWN0aXZlKCk7XHJcbiAgICAgICAgICBpZiAoaXNEZWZpbmVkKHJlc3VsdCkpIHtcclxuICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICAgICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XHJcbiAgICAgICAgICAgIHRoaXMuX3NlbGVjdFJlc3VsdChyZXN1bHQpO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgICAgdGhpcy5fY2xvc2VQb3B1cCgpO1xyXG4gICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgY2FzZSBLZXkuRXNjYXBlOlxyXG4gICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICAgIHRoaXMuX3Jlc3Vic2NyaWJlVHlwZWFoZWFkLm5leHQobnVsbCk7XHJcbiAgICAgICAgICB0aGlzLmRpc21pc3NQb3B1cCgpO1xyXG4gICAgICAgICAgYnJlYWs7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9XHJcblxyXG4gIHByaXZhdGUgX29wZW5Qb3B1cCgpIHtcclxuICAgIGlmICghdGhpcy5pc1BvcHVwT3BlbigpKSB7XHJcbiAgICAgIHRoaXMuX2lucHV0VmFsdWVCYWNrdXAgPSB0aGlzLl9lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQudmFsdWU7XHJcbiAgICAgIHRoaXMuX3dpbmRvd1JlZiA9IHRoaXMuX3BvcHVwU2VydmljZS5vcGVuKCk7XHJcbiAgICAgIHRoaXMuX3dpbmRvd1JlZi5pbnN0YW5jZS5pZCA9IHRoaXMucG9wdXBJZDtcclxuICAgICAgdGhpcy5fd2luZG93UmVmLmluc3RhbmNlLnNlbGVjdEV2ZW50LnN1YnNjcmliZSgocmVzdWx0OiBhbnkpID0+IHRoaXMuX3NlbGVjdFJlc3VsdENsb3NlUG9wdXAocmVzdWx0KSk7XHJcbiAgICAgIHRoaXMuX3dpbmRvd1JlZi5pbnN0YW5jZS5hY3RpdmVDaGFuZ2VFdmVudC5zdWJzY3JpYmUoKGFjdGl2ZUlkOiBzdHJpbmcpID0+IHRoaXMuYWN0aXZlRGVzY2VuZGFudCA9IGFjdGl2ZUlkKTtcclxuXHJcbiAgICAgIGlmICh0aGlzLmNvbnRhaW5lciA9PT0gJ2JvZHknKSB7XHJcbiAgICAgICAgd2luZG93LmRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IodGhpcy5jb250YWluZXIpLmFwcGVuZENoaWxkKHRoaXMuX3dpbmRvd1JlZi5sb2NhdGlvbi5uYXRpdmVFbGVtZW50KTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBfY2xvc2VQb3B1cCgpIHtcclxuICAgIHRoaXMuX3BvcHVwU2VydmljZS5jbG9zZSgpO1xyXG4gICAgdGhpcy5fd2luZG93UmVmID0gbnVsbDtcclxuICAgIHRoaXMuYWN0aXZlRGVzY2VuZGFudCA9IHVuZGVmaW5lZDtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgX3NlbGVjdFJlc3VsdChyZXN1bHQ6IGFueSkge1xyXG4gICAgbGV0IGRlZmF1bHRQcmV2ZW50ZWQgPSBmYWxzZTtcclxuICAgIHRoaXMuc2VsZWN0SXRlbS5lbWl0KHtpdGVtOiByZXN1bHQsIHByZXZlbnREZWZhdWx0OiAoKSA9PiB7IGRlZmF1bHRQcmV2ZW50ZWQgPSB0cnVlOyB9fSk7XHJcbiAgICB0aGlzLl9yZXN1YnNjcmliZVR5cGVhaGVhZC5uZXh0KG51bGwpO1xyXG5cclxuICAgIGlmICghZGVmYXVsdFByZXZlbnRlZCkge1xyXG4gICAgICB0aGlzLndyaXRlVmFsdWUocmVzdWx0KTtcclxuICAgICAgdGhpcy5fb25DaGFuZ2UocmVzdWx0KTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHByaXZhdGUgX3NlbGVjdFJlc3VsdENsb3NlUG9wdXAocmVzdWx0OiBhbnkpIHtcclxuICAgIHRoaXMuX3NlbGVjdFJlc3VsdChyZXN1bHQpO1xyXG4gICAgdGhpcy5fY2xvc2VQb3B1cCgpO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBfc2hvd0hpbnQoKSB7XHJcbiAgICBpZiAodGhpcy5zaG93SGludCAmJiB0aGlzLl93aW5kb3dSZWYuaW5zdGFuY2UuaGFzQWN0aXZlKCkgJiYgdGhpcy5faW5wdXRWYWx1ZUJhY2t1cCAhPSBudWxsKSB7XHJcbiAgICAgIGNvbnN0IHVzZXJJbnB1dExvd2VyQ2FzZSA9IHRoaXMuX2lucHV0VmFsdWVCYWNrdXAudG9Mb3dlckNhc2UoKTtcclxuICAgICAgY29uc3QgZm9ybWF0dGVkVmFsID0gdGhpcy5fZm9ybWF0SXRlbUZvcklucHV0KHRoaXMuX3dpbmRvd1JlZi5pbnN0YW5jZS5nZXRBY3RpdmUoKSk7XHJcblxyXG4gICAgICBpZiAodXNlcklucHV0TG93ZXJDYXNlID09PSBmb3JtYXR0ZWRWYWwuc3Vic3RyKDAsIHRoaXMuX2lucHV0VmFsdWVCYWNrdXAubGVuZ3RoKS50b0xvd2VyQ2FzZSgpKSB7XHJcbiAgICAgICAgdGhpcy5fd3JpdGVJbnB1dFZhbHVlKHRoaXMuX2lucHV0VmFsdWVCYWNrdXAgKyBmb3JtYXR0ZWRWYWwuc3Vic3RyKHRoaXMuX2lucHV0VmFsdWVCYWNrdXAubGVuZ3RoKSk7XHJcbiAgICAgICAgdGhpcy5fZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50WydzZXRTZWxlY3Rpb25SYW5nZSddLmFwcGx5KFxyXG4gICAgICAgICAgICB0aGlzLl9lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQsIFt0aGlzLl9pbnB1dFZhbHVlQmFja3VwLmxlbmd0aCwgZm9ybWF0dGVkVmFsLmxlbmd0aF0pO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIHRoaXMud3JpdGVWYWx1ZSh0aGlzLl93aW5kb3dSZWYuaW5zdGFuY2UuZ2V0QWN0aXZlKCkpO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIF9mb3JtYXRJdGVtRm9ySW5wdXQoaXRlbTogYW55KTogc3RyaW5nIHtcclxuICAgIHJldHVybiBpdGVtICE9IG51bGwgJiYgdGhpcy5pbnB1dEZvcm1hdHRlciA/IHRoaXMuaW5wdXRGb3JtYXR0ZXIoaXRlbSkgOiB0b1N0cmluZyhpdGVtKTtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgX3dyaXRlSW5wdXRWYWx1ZSh2YWx1ZTogc3RyaW5nKTogdm9pZCB7XHJcbiAgICB0aGlzLl9yZW5kZXJlci5zZXRQcm9wZXJ0eSh0aGlzLl9lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQsICd2YWx1ZScsIHRvU3RyaW5nKHZhbHVlKSk7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIF9zdWJzY3JpYmVUb1VzZXJJbnB1dCh1c2VySW5wdXQkOiBPYnNlcnZhYmxlPGFueVtdPik6IFN1YnNjcmlwdGlvbiB7XHJcbiAgICByZXR1cm4gdXNlcklucHV0JC5zdWJzY3JpYmUoKHJlc3VsdHMpID0+IHtcclxuICAgICAgaWYgKCFyZXN1bHRzIHx8IHJlc3VsdHMubGVuZ3RoID09PSAwKSB7XHJcbiAgICAgICAgdGhpcy5fY2xvc2VQb3B1cCgpO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIHRoaXMuX29wZW5Qb3B1cCgpO1xyXG4gICAgICAgIHRoaXMuX3dpbmRvd1JlZi5pbnN0YW5jZS5mb2N1c0ZpcnN0ID0gdGhpcy5mb2N1c0ZpcnN0O1xyXG4gICAgICAgIHRoaXMuX3dpbmRvd1JlZi5pbnN0YW5jZS5yZXN1bHRzID0gcmVzdWx0cztcclxuICAgICAgICB0aGlzLl93aW5kb3dSZWYuaW5zdGFuY2UudGVybSA9IHRoaXMuX2VsZW1lbnRSZWYubmF0aXZlRWxlbWVudC52YWx1ZTtcclxuICAgICAgICBpZiAodGhpcy5yZXN1bHRGb3JtYXR0ZXIpIHtcclxuICAgICAgICAgIHRoaXMuX3dpbmRvd1JlZi5pbnN0YW5jZS5mb3JtYXR0ZXIgPSB0aGlzLnJlc3VsdEZvcm1hdHRlcjtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKHRoaXMucmVzdWx0VGVtcGxhdGUpIHtcclxuICAgICAgICAgIHRoaXMuX3dpbmRvd1JlZi5pbnN0YW5jZS5yZXN1bHRUZW1wbGF0ZSA9IHRoaXMucmVzdWx0VGVtcGxhdGU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuX3dpbmRvd1JlZi5pbnN0YW5jZS5yZXNldEFjdGl2ZSgpO1xyXG5cclxuICAgICAgICAvLyBUaGUgb2JzZXJ2YWJsZSBzdHJlYW0gd2UgYXJlIHN1YnNjcmliaW5nIHRvIG1pZ2h0IGhhdmUgYXN5bmMgc3RlcHNcclxuICAgICAgICAvLyBhbmQgaWYgYSBjb21wb25lbnQgY29udGFpbmluZyB0eXBlYWhlYWQgaXMgdXNpbmcgdGhlIE9uUHVzaCBzdHJhdGVneVxyXG4gICAgICAgIC8vIHRoZSBjaGFuZ2UgZGV0ZWN0aW9uIHR1cm4gd291bGRuJ3QgYmUgaW52b2tlZCBhdXRvbWF0aWNhbGx5LlxyXG4gICAgICAgIHRoaXMuX3dpbmRvd1JlZi5jaGFuZ2VEZXRlY3RvclJlZi5kZXRlY3RDaGFuZ2VzKCk7XHJcblxyXG4gICAgICAgIHRoaXMuX3Nob3dIaW50KCk7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIC8vIGxpdmUgYW5ub3VuY2VyXHJcbiAgICAgIGNvbnN0IGNvdW50ID0gcmVzdWx0cyA/IHJlc3VsdHMubGVuZ3RoIDogMDtcclxuICAgICAgdGhpcy5fbGl2ZS5zYXkoY291bnQgPT09IDAgPyAnTm8gcmVzdWx0cyBhdmFpbGFibGUnIDogYCR7Y291bnR9IHJlc3VsdCR7Y291bnQgPT09IDEgPyAnJyA6ICdzJ30gYXZhaWxhYmxlYCk7XHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgX3Vuc3Vic2NyaWJlRnJvbVVzZXJJbnB1dCgpIHtcclxuICAgIGlmICh0aGlzLl9zdWJzY3JpcHRpb24pIHtcclxuICAgICAgdGhpcy5fc3Vic2NyaXB0aW9uLnVuc3Vic2NyaWJlKCk7XHJcbiAgICB9XHJcbiAgICB0aGlzLl9zdWJzY3JpcHRpb24gPSBudWxsO1xyXG4gIH1cclxufVxyXG4iLCJpbXBvcnQge05nTW9kdWxlLCBNb2R1bGVXaXRoUHJvdmlkZXJzfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHtDb21tb25Nb2R1bGV9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XHJcblxyXG5pbXBvcnQge05nYkhpZ2hsaWdodH0gZnJvbSAnLi9oaWdobGlnaHQnO1xyXG5pbXBvcnQge05nYlR5cGVhaGVhZFdpbmRvd30gZnJvbSAnLi90eXBlYWhlYWQtd2luZG93JztcclxuaW1wb3J0IHtOZ2JUeXBlYWhlYWR9IGZyb20gJy4vdHlwZWFoZWFkJztcclxuXHJcbmV4cG9ydCB7TmdiSGlnaGxpZ2h0fSBmcm9tICcuL2hpZ2hsaWdodCc7XHJcbmV4cG9ydCB7TmdiVHlwZWFoZWFkV2luZG93fSBmcm9tICcuL3R5cGVhaGVhZC13aW5kb3cnO1xyXG5leHBvcnQge05nYlR5cGVhaGVhZENvbmZpZ30gZnJvbSAnLi90eXBlYWhlYWQtY29uZmlnJztcclxuZXhwb3J0IHtOZ2JUeXBlYWhlYWQsIE5nYlR5cGVhaGVhZFNlbGVjdEl0ZW1FdmVudH0gZnJvbSAnLi90eXBlYWhlYWQnO1xyXG5cclxuQE5nTW9kdWxlKHtcclxuICBkZWNsYXJhdGlvbnM6IFtOZ2JUeXBlYWhlYWQsIE5nYkhpZ2hsaWdodCwgTmdiVHlwZWFoZWFkV2luZG93XSxcclxuICBleHBvcnRzOiBbTmdiVHlwZWFoZWFkLCBOZ2JIaWdobGlnaHRdLFxyXG4gIGltcG9ydHM6IFtDb21tb25Nb2R1bGVdLFxyXG4gIGVudHJ5Q29tcG9uZW50czogW05nYlR5cGVhaGVhZFdpbmRvd11cclxufSlcclxuZXhwb3J0IGNsYXNzIE5nYlR5cGVhaGVhZE1vZHVsZSB7XHJcbiAgLyoqXHJcbiAgICogSW1wb3J0aW5nIHdpdGggJy5mb3JSb290KCknIGlzIG5vIGxvbmdlciBuZWNlc3NhcnksIHlvdSBjYW4gc2ltcGx5IGltcG9ydCB0aGUgbW9kdWxlLlxyXG4gICAqIFdpbGwgYmUgcmVtb3ZlZCBpbiA0LjAuMC5cclxuICAgKlxyXG4gICAqIEBkZXByZWNhdGVkIDMuMC4wXHJcbiAgICovXHJcbiAgc3RhdGljIGZvclJvb3QoKTogTW9kdWxlV2l0aFByb3ZpZGVycyB7IHJldHVybiB7bmdNb2R1bGU6IE5nYlR5cGVhaGVhZE1vZHVsZX07IH1cclxufVxyXG4iLCJpbXBvcnQge05nTW9kdWxlLCBNb2R1bGVXaXRoUHJvdmlkZXJzfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuXHJcbmltcG9ydCB7TmdiQWNjb3JkaW9uTW9kdWxlLCBOZ2JQYW5lbENoYW5nZUV2ZW50fSBmcm9tICcuL2FjY29yZGlvbi9hY2NvcmRpb24ubW9kdWxlJztcclxuaW1wb3J0IHtOZ2JBbGVydE1vZHVsZX0gZnJvbSAnLi9hbGVydC9hbGVydC5tb2R1bGUnO1xyXG5pbXBvcnQge05nYkJ1dHRvbnNNb2R1bGV9IGZyb20gJy4vYnV0dG9ucy9idXR0b25zLm1vZHVsZSc7XHJcbmltcG9ydCB7TmdiQ2Fyb3VzZWxNb2R1bGV9IGZyb20gJy4vY2Fyb3VzZWwvY2Fyb3VzZWwubW9kdWxlJztcclxuaW1wb3J0IHtOZ2JDb2xsYXBzZU1vZHVsZX0gZnJvbSAnLi9jb2xsYXBzZS9jb2xsYXBzZS5tb2R1bGUnO1xyXG5pbXBvcnQge05nYkRhdGVwaWNrZXJNb2R1bGV9IGZyb20gJy4vZGF0ZXBpY2tlci9kYXRlcGlja2VyLm1vZHVsZSc7XHJcbmltcG9ydCB7TmdiRHJvcGRvd25Nb2R1bGV9IGZyb20gJy4vZHJvcGRvd24vZHJvcGRvd24ubW9kdWxlJztcclxuaW1wb3J0IHtcclxuICBOZ2JNb2RhbE1vZHVsZSxcclxuICBOZ2JNb2RhbCxcclxuICBOZ2JNb2RhbENvbmZpZyxcclxuICBOZ2JNb2RhbE9wdGlvbnMsXHJcbiAgTmdiTW9kYWxSZWYsXHJcbiAgTW9kYWxEaXNtaXNzUmVhc29uc1xyXG59IGZyb20gJy4vbW9kYWwvbW9kYWwubW9kdWxlJztcclxuaW1wb3J0IHtOZ2JQYWdpbmF0aW9uTW9kdWxlfSBmcm9tICcuL3BhZ2luYXRpb24vcGFnaW5hdGlvbi5tb2R1bGUnO1xyXG5pbXBvcnQge05nYlBvcG92ZXJNb2R1bGV9IGZyb20gJy4vcG9wb3Zlci9wb3BvdmVyLm1vZHVsZSc7XHJcbmltcG9ydCB7TmdiUHJvZ3Jlc3NiYXJNb2R1bGV9IGZyb20gJy4vcHJvZ3Jlc3NiYXIvcHJvZ3Jlc3NiYXIubW9kdWxlJztcclxuaW1wb3J0IHtOZ2JSYXRpbmdNb2R1bGV9IGZyb20gJy4vcmF0aW5nL3JhdGluZy5tb2R1bGUnO1xyXG5pbXBvcnQge05nYlRhYnNldE1vZHVsZSwgTmdiVGFiQ2hhbmdlRXZlbnR9IGZyb20gJy4vdGFic2V0L3RhYnNldC5tb2R1bGUnO1xyXG5pbXBvcnQge05nYlRpbWVwaWNrZXJNb2R1bGV9IGZyb20gJy4vdGltZXBpY2tlci90aW1lcGlja2VyLm1vZHVsZSc7XHJcbmltcG9ydCB7TmdiVG9vbHRpcE1vZHVsZX0gZnJvbSAnLi90b29sdGlwL3Rvb2x0aXAubW9kdWxlJztcclxuaW1wb3J0IHtOZ2JUeXBlYWhlYWRNb2R1bGUsIE5nYlR5cGVhaGVhZFNlbGVjdEl0ZW1FdmVudH0gZnJvbSAnLi90eXBlYWhlYWQvdHlwZWFoZWFkLm1vZHVsZSc7XHJcblxyXG5leHBvcnQge1xyXG4gIE5nYkFjY29yZGlvbk1vZHVsZSxcclxuICBOZ2JQYW5lbENoYW5nZUV2ZW50LFxyXG4gIE5nYkFjY29yZGlvbkNvbmZpZyxcclxuICBOZ2JBY2NvcmRpb24sXHJcbiAgTmdiUGFuZWwsXHJcbiAgTmdiUGFuZWxUaXRsZSxcclxuICBOZ2JQYW5lbENvbnRlbnRcclxufSBmcm9tICcuL2FjY29yZGlvbi9hY2NvcmRpb24ubW9kdWxlJztcclxuZXhwb3J0IHtOZ2JBbGVydE1vZHVsZSwgTmdiQWxlcnRDb25maWcsIE5nYkFsZXJ0fSBmcm9tICcuL2FsZXJ0L2FsZXJ0Lm1vZHVsZSc7XHJcbmV4cG9ydCB7TmdiQnV0dG9uc01vZHVsZSwgTmdiQ2hlY2tCb3gsIE5nYlJhZGlvR3JvdXB9IGZyb20gJy4vYnV0dG9ucy9idXR0b25zLm1vZHVsZSc7XHJcbmV4cG9ydCB7TmdiQ2Fyb3VzZWxNb2R1bGUsIE5nYkNhcm91c2VsQ29uZmlnLCBOZ2JDYXJvdXNlbCwgTmdiU2xpZGV9IGZyb20gJy4vY2Fyb3VzZWwvY2Fyb3VzZWwubW9kdWxlJztcclxuZXhwb3J0IHtOZ2JDb2xsYXBzZU1vZHVsZSwgTmdiQ29sbGFwc2V9IGZyb20gJy4vY29sbGFwc2UvY29sbGFwc2UubW9kdWxlJztcclxuZXhwb3J0IHtcclxuICBOZ2JDYWxlbmRhcixcclxuICBOZ2JQZXJpb2QsXHJcbiAgTmdiQ2FsZW5kYXJJc2xhbWljQ2l2aWwsXHJcbiAgTmdiQ2FsZW5kYXJJc2xhbWljVW1hbHF1cmEsXHJcbiAgTmdiQ2FsZW5kYXJIZWJyZXcsXHJcbiAgTmdiQ2FsZW5kYXJQZXJzaWFuLFxyXG4gIE5nYkRhdGVwaWNrZXJNb2R1bGUsXHJcbiAgTmdiRGF0ZXBpY2tlckkxOG4sXHJcbiAgTmdiRGF0ZXBpY2tlckkxOG5IZWJyZXcsXHJcbiAgTmdiRGF0ZXBpY2tlckNvbmZpZyxcclxuICBOZ2JEYXRlU3RydWN0LFxyXG4gIE5nYkRhdGUsXHJcbiAgTmdiRGF0ZVBhcnNlckZvcm1hdHRlcixcclxuICBOZ2JEYXRlQWRhcHRlcixcclxuICBOZ2JEYXRlTmF0aXZlQWRhcHRlcixcclxuICBOZ2JEYXRlTmF0aXZlVVRDQWRhcHRlcixcclxuICBOZ2JEYXRlcGlja2VyLFxyXG4gIE5nYklucHV0RGF0ZXBpY2tlclxyXG59IGZyb20gJy4vZGF0ZXBpY2tlci9kYXRlcGlja2VyLm1vZHVsZSc7XHJcbmV4cG9ydCB7TmdiRHJvcGRvd25Nb2R1bGUsIE5nYkRyb3Bkb3duQ29uZmlnLCBOZ2JEcm9wZG93bn0gZnJvbSAnLi9kcm9wZG93bi9kcm9wZG93bi5tb2R1bGUnO1xyXG5leHBvcnQge1xyXG4gIE5nYk1vZGFsTW9kdWxlLFxyXG4gIE5nYk1vZGFsLFxyXG4gIE5nYk1vZGFsQ29uZmlnLFxyXG4gIE5nYk1vZGFsT3B0aW9ucyxcclxuICBOZ2JBY3RpdmVNb2RhbCxcclxuICBOZ2JNb2RhbFJlZixcclxuICBNb2RhbERpc21pc3NSZWFzb25zXHJcbn0gZnJvbSAnLi9tb2RhbC9tb2RhbC5tb2R1bGUnO1xyXG5leHBvcnQge05nYlBhZ2luYXRpb25Nb2R1bGUsIE5nYlBhZ2luYXRpb25Db25maWcsIE5nYlBhZ2luYXRpb259IGZyb20gJy4vcGFnaW5hdGlvbi9wYWdpbmF0aW9uLm1vZHVsZSc7XHJcbmV4cG9ydCB7TmdiUG9wb3Zlck1vZHVsZSwgTmdiUG9wb3ZlckNvbmZpZywgTmdiUG9wb3Zlcn0gZnJvbSAnLi9wb3BvdmVyL3BvcG92ZXIubW9kdWxlJztcclxuZXhwb3J0IHtOZ2JQcm9ncmVzc2Jhck1vZHVsZSwgTmdiUHJvZ3Jlc3NiYXJDb25maWcsIE5nYlByb2dyZXNzYmFyfSBmcm9tICcuL3Byb2dyZXNzYmFyL3Byb2dyZXNzYmFyLm1vZHVsZSc7XHJcbmV4cG9ydCB7TmdiUmF0aW5nTW9kdWxlLCBOZ2JSYXRpbmdDb25maWcsIE5nYlJhdGluZ30gZnJvbSAnLi9yYXRpbmcvcmF0aW5nLm1vZHVsZSc7XHJcbmV4cG9ydCB7XHJcbiAgTmdiVGFic2V0TW9kdWxlLFxyXG4gIE5nYlRhYkNoYW5nZUV2ZW50LFxyXG4gIE5nYlRhYnNldENvbmZpZyxcclxuICBOZ2JUYWJzZXQsXHJcbiAgTmdiVGFiLFxyXG4gIE5nYlRhYkNvbnRlbnQsXHJcbiAgTmdiVGFiVGl0bGVcclxufSBmcm9tICcuL3RhYnNldC90YWJzZXQubW9kdWxlJztcclxuZXhwb3J0IHtcclxuICBOZ2JUaW1lcGlja2VyTW9kdWxlLFxyXG4gIE5nYlRpbWVwaWNrZXJDb25maWcsXHJcbiAgTmdiVGltZVN0cnVjdCxcclxuICBOZ2JUaW1lcGlja2VyLFxyXG4gIE5nYlRpbWVBZGFwdGVyXHJcbn0gZnJvbSAnLi90aW1lcGlja2VyL3RpbWVwaWNrZXIubW9kdWxlJztcclxuZXhwb3J0IHtOZ2JUb29sdGlwTW9kdWxlLCBOZ2JUb29sdGlwQ29uZmlnLCBOZ2JUb29sdGlwfSBmcm9tICcuL3Rvb2x0aXAvdG9vbHRpcC5tb2R1bGUnO1xyXG5leHBvcnQge1xyXG4gIE5nYkhpZ2hsaWdodCxcclxuICBOZ2JUeXBlYWhlYWRNb2R1bGUsXHJcbiAgTmdiVHlwZWFoZWFkQ29uZmlnLFxyXG4gIE5nYlR5cGVhaGVhZFNlbGVjdEl0ZW1FdmVudCxcclxuICBOZ2JUeXBlYWhlYWRcclxufSBmcm9tICcuL3R5cGVhaGVhZC90eXBlYWhlYWQubW9kdWxlJztcclxuXHJcbmV4cG9ydCB7UGxhY2VtZW50fSBmcm9tICcuL3V0aWwvcG9zaXRpb25pbmcnO1xyXG5cclxuY29uc3QgTkdCX01PRFVMRVMgPSBbXHJcbiAgTmdiQWNjb3JkaW9uTW9kdWxlLCBOZ2JBbGVydE1vZHVsZSwgTmdiQnV0dG9uc01vZHVsZSwgTmdiQ2Fyb3VzZWxNb2R1bGUsIE5nYkNvbGxhcHNlTW9kdWxlLCBOZ2JEYXRlcGlja2VyTW9kdWxlLFxyXG4gIE5nYkRyb3Bkb3duTW9kdWxlLCBOZ2JNb2RhbE1vZHVsZSwgTmdiUGFnaW5hdGlvbk1vZHVsZSwgTmdiUG9wb3Zlck1vZHVsZSwgTmdiUHJvZ3Jlc3NiYXJNb2R1bGUsIE5nYlJhdGluZ01vZHVsZSxcclxuICBOZ2JUYWJzZXRNb2R1bGUsIE5nYlRpbWVwaWNrZXJNb2R1bGUsIE5nYlRvb2x0aXBNb2R1bGUsIE5nYlR5cGVhaGVhZE1vZHVsZVxyXG5dO1xyXG5cclxuQE5nTW9kdWxlKHtpbXBvcnRzOiBOR0JfTU9EVUxFUywgZXhwb3J0czogTkdCX01PRFVMRVN9KVxyXG5leHBvcnQgY2xhc3MgTmdiTW9kdWxlIHtcclxuICAvKipcclxuICAgKiBJbXBvcnRpbmcgd2l0aCAnLmZvclJvb3QoKScgaXMgbm8gbG9uZ2VyIG5lY2Vzc2FyeSwgeW91IGNhbiBzaW1wbHkgaW1wb3J0IHRoZSBtb2R1bGUuXHJcbiAgICogV2lsbCBiZSByZW1vdmVkIGluIDQuMC4wLlxyXG4gICAqXHJcbiAgICogQGRlcHJlY2F0ZWQgMy4wLjBcclxuICAgKi9cclxuICBzdGF0aWMgZm9yUm9vdCgpOiBNb2R1bGVXaXRoUHJvdmlkZXJzIHsgcmV0dXJuIHtuZ01vZHVsZTogTmdiTW9kdWxlfTsgfVxyXG59XHJcbiJdLCJuYW1lcyI6WyJuZXh0SWQiLCJOR0JfREFURVBJQ0tFUl9WQUxVRV9BQ0NFU1NPUiIsIm1vZCIsIkdSRUdPUklBTl9FUE9DSCIsImlzR3JlZ29yaWFuTGVhcFllYXIiLCJ0b0dyZWdvcmlhbiIsImZyb21HcmVnb3JpYW4iXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7O0FBQUEsbUJBQTBCLEtBQVU7SUFDbEMsT0FBTyxRQUFRLENBQUMsR0FBRyxLQUFLLEVBQUUsRUFBRSxFQUFFLENBQUMsQ0FBQztDQUNqQzs7Ozs7QUFFRCxrQkFBeUIsS0FBVTtJQUNqQyxPQUFPLENBQUMsS0FBSyxLQUFLLFNBQVMsSUFBSSxLQUFLLEtBQUssSUFBSSxJQUFJLEdBQUcsS0FBSyxFQUFFLEdBQUcsRUFBRSxDQUFDO0NBQ2xFOzs7Ozs7O0FBRUQseUJBQWdDLEtBQWEsRUFBRSxHQUFXLEVBQUUsR0FBRyxHQUFHLENBQUM7SUFDakUsT0FBTyxJQUFJLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsS0FBSyxFQUFFLEdBQUcsQ0FBQyxFQUFFLEdBQUcsQ0FBQyxDQUFDO0NBQzVDOzs7OztBQUVELGtCQUF5QixLQUFVO0lBQ2pDLE9BQU8sT0FBTyxLQUFLLEtBQUssUUFBUSxDQUFDO0NBQ2xDOzs7OztBQUVELGtCQUF5QixLQUFVO0lBQ2pDLE9BQU8sQ0FBQyxLQUFLLENBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7Q0FDakM7Ozs7O0FBRUQsbUJBQTBCLEtBQVU7SUFDbEMsT0FBTyxPQUFPLEtBQUssS0FBSyxRQUFRLElBQUksUUFBUSxDQUFDLEtBQUssQ0FBQyxJQUFJLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLEtBQUssS0FBSyxDQUFDO0NBQ3BGOzs7OztBQUVELG1CQUEwQixLQUFVO0lBQ2xDLE9BQU8sS0FBSyxLQUFLLFNBQVMsSUFBSSxLQUFLLEtBQUssSUFBSSxDQUFDO0NBQzlDOzs7OztBQUVELG1CQUEwQixLQUFhO0lBQ3JDLElBQUksUUFBUSxDQUFDLEtBQUssQ0FBQyxFQUFFO1FBQ25CLE9BQU8sSUFBSSxLQUFLLEVBQUUsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztLQUM5QjtTQUFNO1FBQ0wsT0FBTyxFQUFFLENBQUM7S0FDWDtDQUNGOzs7OztBQUVELHNCQUE2QixJQUFJO0lBQy9CLE9BQU8sSUFBSSxDQUFDLE9BQU8sQ0FBQywwQkFBMEIsRUFBRSxNQUFNLENBQUMsQ0FBQztDQUN6RDs7Ozs7O0FDdENEOzs7OztBQVFBOzsyQkFDZ0IsS0FBSzs7OztZQUZwQixVQUFVLFNBQUMsRUFBQyxVQUFVLEVBQUUsTUFBTSxFQUFDOzs7Ozs7OztBQ1BoQztBQWdCQSxJQUFJLE1BQU0sR0FBRyxDQUFDLENBQUM7Ozs7QUFNZjs7OztJQUNFLFlBQW1CLFdBQTZCO1FBQTdCLGdCQUFXLEdBQVgsV0FBVyxDQUFrQjtLQUFJOzs7WUFGckQsU0FBUyxTQUFDLEVBQUMsUUFBUSxFQUFFLDRCQUE0QixFQUFDOzs7O1lBWmpELFdBQVc7Ozs7O0FBcUJiOzs7O0lBQ0UsWUFBbUIsV0FBNkI7UUFBN0IsZ0JBQVcsR0FBWCxXQUFXLENBQWtCO0tBQUk7OztZQUZyRCxTQUFTLFNBQUMsRUFBQyxRQUFRLEVBQUUsOEJBQThCLEVBQUM7Ozs7WUFwQm5ELFdBQVc7Ozs7OztBQThCYjs7Ozs7O3dCQUtzQixLQUFLOzs7OztrQkFNWCxhQUFhLE1BQU0sRUFBRSxFQUFFOzs7O3NCQUs1QixLQUFLOzs7OztJQW9CZCxxQkFBcUI7Ozs7O1FBS25CLElBQUksQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUM7UUFDckMsSUFBSSxDQUFDLFVBQVUsR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDLEtBQUssQ0FBQztLQUMxQzs7O1lBNUNGLFNBQVMsU0FBQyxFQUFDLFFBQVEsRUFBRSxXQUFXLEVBQUM7Ozt1QkFNL0IsS0FBSztpQkFNTCxLQUFLO29CQVVMLEtBQUs7bUJBT0wsS0FBSzt3QkFLTCxlQUFlLFNBQUMsYUFBYSxFQUFFLEVBQUMsV0FBVyxFQUFFLEtBQUssRUFBQzswQkFDbkQsZUFBZSxTQUFDLGVBQWUsRUFBRSxFQUFDLFdBQVcsRUFBRSxLQUFLLEVBQUM7Ozs7OztBQTZEeEQ7Ozs7SUE4QkUsWUFBWSxNQUEwQjs7Ozt5QkF4QkUsRUFBRTs7Ozs2QkFVakIsSUFBSTs7OzsyQkFZTCxJQUFJLFlBQVksRUFBdUI7UUFHN0QsSUFBSSxDQUFDLElBQUksR0FBRyxNQUFNLENBQUMsSUFBSSxDQUFDO1FBQ3hCLElBQUksQ0FBQyxnQkFBZ0IsR0FBRyxNQUFNLENBQUMsV0FBVyxDQUFDO0tBQzVDOzs7Ozs7SUFLRCxVQUFVLENBQUMsT0FBZSxJQUFhLE9BQU8sSUFBSSxDQUFDLFNBQVMsQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsRUFBRTs7Ozs7O0lBS3JGLE1BQU0sQ0FBQyxPQUFlLElBQVUsSUFBSSxDQUFDLGdCQUFnQixDQUFDLElBQUksQ0FBQyxjQUFjLENBQUMsT0FBTyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsRUFBRTs7Ozs7O0lBTTVGLFNBQVM7UUFDUCxJQUFJLElBQUksQ0FBQyxnQkFBZ0IsRUFBRTtZQUN6QixJQUFJLElBQUksQ0FBQyxTQUFTLENBQUMsTUFBTSxLQUFLLENBQUMsSUFBSSxJQUFJLENBQUMsTUFBTSxDQUFDLE1BQU0sRUFBRTtnQkFDckQsSUFBSSxDQUFDLGdCQUFnQixDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsS0FBSyxFQUFFLElBQUksQ0FBQyxDQUFDO2FBQ2hEO1NBQ0Y7YUFBTTtZQUNMLElBQUksQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLEtBQUssSUFBSSxJQUFJLENBQUMsZ0JBQWdCLENBQUMsS0FBSyxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUM7U0FDbEU7S0FDRjs7Ozs7O0lBS0QsUUFBUSxDQUFDLE9BQWUsSUFBSSxJQUFJLENBQUMsZ0JBQWdCLENBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxPQUFPLENBQUMsRUFBRSxLQUFLLENBQUMsQ0FBQyxFQUFFOzs7OztJQUt6RixXQUFXO1FBQ1QsSUFBSSxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsQ0FBQyxLQUFLLE9BQU8sSUFBSSxDQUFDLGdCQUFnQixDQUFDLEtBQUssRUFBRSxLQUFLLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQztLQUMxRTs7Ozs7O0lBS0QsTUFBTSxDQUFDLE9BQWU7O1FBQ3BCLE1BQU0sS0FBSyxHQUFHLElBQUksQ0FBQyxjQUFjLENBQUMsT0FBTyxDQUFDLENBQUM7UUFDM0MsSUFBSSxLQUFLLEVBQUU7WUFDVCxJQUFJLENBQUMsZ0JBQWdCLENBQUMsS0FBSyxFQUFFLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxDQUFDO1NBQzdDO0tBQ0Y7Ozs7SUFFRCxxQkFBcUI7O1FBRW5CLElBQUksUUFBUSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsRUFBRTtZQUM1QixJQUFJLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDLFNBQVMsQ0FBQyxDQUFDO1NBQ2xEOztRQUdELElBQUksQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLEtBQUssSUFBSSxLQUFLLENBQUMsTUFBTSxHQUFHLENBQUMsS0FBSyxDQUFDLFFBQVEsSUFBSSxJQUFJLENBQUMsU0FBUyxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsRUFBRSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQzs7UUFHdEcsSUFBSSxJQUFJLENBQUMsU0FBUyxDQUFDLE1BQU0sR0FBRyxDQUFDLElBQUksSUFBSSxDQUFDLGdCQUFnQixFQUFFO1lBQ3RELElBQUksQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ3JDLElBQUksQ0FBQyxnQkFBZ0IsRUFBRSxDQUFDO1NBQ3pCO0tBQ0Y7Ozs7OztJQUVPLGdCQUFnQixDQUFDLEtBQWUsRUFBRSxTQUFrQjtRQUMxRCxJQUFJLEtBQUssSUFBSSxDQUFDLEtBQUssQ0FBQyxRQUFRLElBQUksS0FBSyxDQUFDLE1BQU0sS0FBSyxTQUFTLEVBQUU7O1lBQzFELElBQUksZ0JBQWdCLEdBQUcsS0FBSyxDQUFDO1lBRTdCLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUNqQixFQUFDLE9BQU8sRUFBRSxLQUFLLENBQUMsRUFBRSxFQUFFLFNBQVMsRUFBRSxTQUFTLEVBQUUsY0FBYyxFQUFFLFFBQVEsZ0JBQWdCLEdBQUcsSUFBSSxDQUFDLEVBQUUsRUFBQyxDQUFDLENBQUM7WUFFbkcsSUFBSSxDQUFDLGdCQUFnQixFQUFFO2dCQUNyQixLQUFLLENBQUMsTUFBTSxHQUFHLFNBQVMsQ0FBQztnQkFFekIsSUFBSSxTQUFTLElBQUksSUFBSSxDQUFDLGdCQUFnQixFQUFFO29CQUN0QyxJQUFJLENBQUMsWUFBWSxDQUFDLEtBQUssQ0FBQyxFQUFFLENBQUMsQ0FBQztpQkFDN0I7Z0JBQ0QsSUFBSSxDQUFDLGdCQUFnQixFQUFFLENBQUM7YUFDekI7U0FDRjs7Ozs7O0lBR0ssWUFBWSxDQUFDLE9BQWU7UUFDbEMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsS0FBSztZQUN2QixJQUFJLEtBQUssQ0FBQyxFQUFFLEtBQUssT0FBTyxFQUFFO2dCQUN4QixLQUFLLENBQUMsTUFBTSxHQUFHLEtBQUssQ0FBQzthQUN0QjtTQUNGLENBQUMsQ0FBQzs7Ozs7O0lBR0csY0FBYyxDQUFDLE9BQWUsSUFBcUIsT0FBTyxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLEVBQUUsS0FBSyxPQUFPLENBQUMsQ0FBQzs7OztJQUVsRyxnQkFBZ0I7UUFDdEIsSUFBSSxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxLQUFLLElBQUksS0FBSyxDQUFDLE1BQU0sSUFBSSxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsQ0FBQyxHQUFHLENBQUMsS0FBSyxJQUFJLEtBQUssQ0FBQyxFQUFFLENBQUMsQ0FBQzs7OztZQXZKeEcsU0FBUyxTQUFDO2dCQUNULFFBQVEsRUFBRSxlQUFlO2dCQUN6QixRQUFRLEVBQUUsY0FBYztnQkFDeEIsSUFBSSxFQUFFLEVBQUMsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLEVBQUUsU0FBUyxFQUFFLDZCQUE2QixFQUFFLG1CQUFtQixFQUFDO2dCQUNuRyxRQUFRLEVBQUU7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FtQlQ7YUFDRjs7OztZQXZITyxrQkFBa0I7OztxQkF5SHZCLGVBQWUsU0FBQyxRQUFRO3dCQUt4QixLQUFLOytCQUtMLEtBQUssU0FBQyxhQUFhOzRCQUtuQixLQUFLO21CQU9MLEtBQUs7MEJBS0wsTUFBTTs7Ozs7OztBQ2xLVDtBQVFBLE1BQU0sd0JBQXdCLEdBQUcsQ0FBQyxZQUFZLEVBQUUsUUFBUSxFQUFFLGFBQWEsRUFBRSxlQUFlLENBQUMsQ0FBQztBQUcxRjs7Ozs7Ozs7SUFPRSxPQUFPLE9BQU8sS0FBMEIsT0FBTyxFQUFDLFFBQVEsRUFBRSxrQkFBa0IsRUFBQyxDQUFDLEVBQUU7OztZQVJqRixRQUFRLFNBQUMsRUFBQyxZQUFZLEVBQUUsd0JBQXdCLEVBQUUsT0FBTyxFQUFFLHdCQUF3QixFQUFFLE9BQU8sRUFBRSxDQUFDLFlBQVksQ0FBQyxFQUFDOzs7Ozs7O0FDVjlHOzs7OztBQVFBOzsyQkFDZ0IsSUFBSTtvQkFDWCxTQUFTOzs7O1lBSGpCLFVBQVUsU0FBQyxFQUFDLFVBQVUsRUFBRSxNQUFNLEVBQUM7Ozs7Ozs7O0FDUGhDOzs7QUFtQ0E7Ozs7OztJQWlCRSxZQUFZLE1BQXNCLEVBQVUsU0FBb0IsRUFBVSxRQUFvQjtRQUFsRCxjQUFTLEdBQVQsU0FBUyxDQUFXO1FBQVUsYUFBUSxHQUFSLFFBQVEsQ0FBWTs7OztxQkFGNUUsSUFBSSxZQUFZLEVBQVE7UUFHeEMsSUFBSSxDQUFDLFdBQVcsR0FBRyxNQUFNLENBQUMsV0FBVyxDQUFDO1FBQ3RDLElBQUksQ0FBQyxJQUFJLEdBQUcsTUFBTSxDQUFDLElBQUksQ0FBQztLQUN6Qjs7OztJQUVELFlBQVksS0FBSyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxFQUFFOzs7OztJQUV6QyxXQUFXLENBQUMsT0FBc0I7O1FBQ2hDLE1BQU0sVUFBVSxHQUFHLE9BQU8sQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUNuQyxJQUFJLFVBQVUsSUFBSSxDQUFDLFVBQVUsQ0FBQyxXQUFXLEVBQUU7WUFDekMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxhQUFhLEVBQUUsU0FBUyxVQUFVLENBQUMsYUFBYSxFQUFFLENBQUMsQ0FBQztZQUM3RixJQUFJLENBQUMsU0FBUyxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLGFBQWEsRUFBRSxTQUFTLFVBQVUsQ0FBQyxZQUFZLEVBQUUsQ0FBQyxDQUFDO1NBQzFGO0tBQ0Y7Ozs7SUFFRCxRQUFRLEtBQUssSUFBSSxDQUFDLFNBQVMsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxhQUFhLEVBQUUsU0FBUyxJQUFJLENBQUMsSUFBSSxFQUFFLENBQUMsQ0FBQyxFQUFFOzs7WUFqRDNGLFNBQVMsU0FBQztnQkFDVCxRQUFRLEVBQUUsV0FBVztnQkFDckIsZUFBZSxFQUFFLHVCQUF1QixDQUFDLE1BQU07Z0JBQy9DLElBQUksRUFBRSxFQUFDLE1BQU0sRUFBRSxPQUFPLEVBQUUsT0FBTyxFQUFFLE9BQU8sRUFBRSwyQkFBMkIsRUFBRSxhQUFhLEVBQUM7Z0JBQ3JGLFFBQVEsRUFBRTs7Ozs7O0tBTVA7Z0JBQ0gsTUFBTSxFQUFFLENBQUM7Ozs7R0FJUixDQUFDO2FBQ0g7Ozs7WUFyQk8sY0FBYztZQVBwQixTQUFTO1lBQ1QsVUFBVTs7OzBCQWtDVCxLQUFLO21CQUtMLEtBQUs7b0JBSUwsTUFBTTs7Ozs7OztBQ2xEVDs7Ozs7Ozs7SUFnQkUsT0FBTyxPQUFPLEtBQTBCLE9BQU8sRUFBQyxRQUFRLEVBQUUsY0FBYyxFQUFDLENBQUMsRUFBRTs7O1lBUjdFLFFBQVEsU0FBQyxFQUFDLFlBQVksRUFBRSxDQUFDLFFBQVEsQ0FBQyxFQUFFLE9BQU8sRUFBRSxDQUFDLFFBQVEsQ0FBQyxFQUFFLE9BQU8sRUFBRSxDQUFDLFlBQVksQ0FBQyxFQUFFLGVBQWUsRUFBRSxDQUFDLFFBQVEsQ0FBQyxFQUFDOzs7Ozs7O0FDUi9HOzs7WUFFQyxTQUFTLFNBQUM7Z0JBQ1QsUUFBUSxFQUFFLGtCQUFrQjtnQkFDNUIsSUFBSSxFQUNBLEVBQUMsYUFBYSxFQUFFLE1BQU0sRUFBRSxnQkFBZ0IsRUFBRSxRQUFRLEVBQUUsa0JBQWtCLEVBQUUsVUFBVSxFQUFFLGVBQWUsRUFBRSxTQUFTLEVBQUM7YUFDcEg7Ozs7Ozs7QUNORDtBQUtBLE1BQU0sMkJBQTJCLEdBQUc7SUFDbEMsT0FBTyxFQUFFLGlCQUFpQjtJQUMxQixXQUFXLEVBQUUsVUFBVSxDQUFDLE1BQU0sV0FBVyxDQUFDO0lBQzFDLEtBQUssRUFBRSxJQUFJO0NBQ1osQ0FBQzs7Ozs7QUFtQkY7Ozs7SUE0QkUsWUFBb0IsTUFBc0I7UUFBdEIsV0FBTSxHQUFOLE1BQU0sQ0FBZ0I7Ozs7d0JBdEJ0QixLQUFLOzs7OzRCQUtELElBQUk7Ozs7OEJBS0YsS0FBSzt3QkFFcEIsQ0FBQyxDQUFNLFFBQU87eUJBQ2IsU0FBUTtLQVMwQjs7Ozs7SUFQOUMsSUFBSSxPQUFPLENBQUMsU0FBa0I7UUFDNUIsSUFBSSxDQUFDLE1BQU0sQ0FBQyxPQUFPLEdBQUcsU0FBUyxDQUFDO1FBQ2hDLElBQUksQ0FBQyxTQUFTLEVBQUU7WUFDZCxJQUFJLENBQUMsU0FBUyxFQUFFLENBQUM7U0FDbEI7S0FDRjs7Ozs7SUFJRCxhQUFhLENBQUMsTUFBTTs7UUFDbEIsTUFBTSxnQkFBZ0IsR0FBRyxNQUFNLENBQUMsTUFBTSxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUMsWUFBWSxHQUFHLElBQUksQ0FBQyxjQUFjLENBQUM7UUFDekYsSUFBSSxDQUFDLFFBQVEsQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDO1FBQ2hDLElBQUksQ0FBQyxTQUFTLEVBQUUsQ0FBQztRQUNqQixJQUFJLENBQUMsVUFBVSxDQUFDLGdCQUFnQixDQUFDLENBQUM7S0FDbkM7Ozs7O0lBRUQsZ0JBQWdCLENBQUMsRUFBdUIsSUFBVSxJQUFJLENBQUMsUUFBUSxHQUFHLEVBQUUsQ0FBQyxFQUFFOzs7OztJQUV2RSxpQkFBaUIsQ0FBQyxFQUFhLElBQVUsSUFBSSxDQUFDLFNBQVMsR0FBRyxFQUFFLENBQUMsRUFBRTs7Ozs7SUFFL0QsZ0JBQWdCLENBQUMsVUFBbUI7UUFDbEMsSUFBSSxDQUFDLFFBQVEsR0FBRyxVQUFVLENBQUM7UUFDM0IsSUFBSSxDQUFDLE1BQU0sQ0FBQyxRQUFRLEdBQUcsVUFBVSxDQUFDO0tBQ25DOzs7OztJQUVELFVBQVUsQ0FBQyxLQUFLO1FBQ2QsSUFBSSxDQUFDLE9BQU8sR0FBRyxLQUFLLEtBQUssSUFBSSxDQUFDLFlBQVksQ0FBQztRQUMzQyxJQUFJLENBQUMsTUFBTSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDO0tBQ25DOzs7WUE3REYsU0FBUyxTQUFDO2dCQUNULFFBQVEsRUFBRSw0QkFBNEI7Z0JBQ3RDLElBQUksRUFBRTtvQkFDSixjQUFjLEVBQUUsS0FBSztvQkFDckIsV0FBVyxFQUFFLFNBQVM7b0JBQ3RCLFlBQVksRUFBRSxVQUFVO29CQUN4QixVQUFVLEVBQUUsdUJBQXVCO29CQUNuQyxTQUFTLEVBQUUsZ0JBQWdCO29CQUMzQixRQUFRLEVBQUUsaUJBQWlCO2lCQUM1QjtnQkFDRCxTQUFTLEVBQUUsQ0FBQywyQkFBMkIsQ0FBQzthQUN6Qzs7OztZQXhCTyxjQUFjOzs7dUJBK0JuQixLQUFLOzJCQUtMLEtBQUs7NkJBS0wsS0FBSzs7Ozs7OztBQzVDUjtBQUtBLE1BQU0sd0JBQXdCLEdBQUc7SUFDL0IsT0FBTyxFQUFFLGlCQUFpQjtJQUMxQixXQUFXLEVBQUUsVUFBVSxDQUFDLE1BQU0sYUFBYSxDQUFDO0lBQzVDLEtBQUssRUFBRSxJQUFJO0NBQ1osQ0FBQzs7QUFFRixJQUFJQSxRQUFNLEdBQUcsQ0FBQyxDQUFDOzs7OztBQU9mOzt1QkFDbUMsSUFBSSxHQUFHLEVBQVk7c0JBQ25DLElBQUk7Ozs7O29CQVVMLGFBQWFBLFFBQU0sRUFBRSxFQUFFO3dCQUU1QixDQUFDLENBQU0sUUFBTzt5QkFDYixTQUFROzs7OztJQVZwQixJQUFJLFFBQVEsS0FBSyxPQUFPLElBQUksQ0FBQyxTQUFTLENBQUMsRUFBRTs7Ozs7SUFDekMsSUFBSSxRQUFRLENBQUMsVUFBbUIsSUFBSSxJQUFJLENBQUMsZ0JBQWdCLENBQUMsVUFBVSxDQUFDLENBQUMsRUFBRTs7Ozs7SUFXeEUsYUFBYSxDQUFDLEtBQWU7UUFDM0IsSUFBSSxDQUFDLFVBQVUsQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDN0IsSUFBSSxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUM7S0FDNUI7Ozs7SUFFRCxrQkFBa0IsS0FBSyxJQUFJLENBQUMsa0JBQWtCLEVBQUUsQ0FBQyxFQUFFOzs7OztJQUVuRCxRQUFRLENBQUMsS0FBZSxJQUFJLElBQUksQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUU7Ozs7O0lBRXRELGdCQUFnQixDQUFDLEVBQXVCLElBQVUsSUFBSSxDQUFDLFFBQVEsR0FBRyxFQUFFLENBQUMsRUFBRTs7Ozs7SUFFdkUsaUJBQWlCLENBQUMsRUFBYSxJQUFVLElBQUksQ0FBQyxTQUFTLEdBQUcsRUFBRSxDQUFDLEVBQUU7Ozs7O0lBRS9ELGdCQUFnQixDQUFDLFVBQW1CO1FBQ2xDLElBQUksQ0FBQyxTQUFTLEdBQUcsVUFBVSxDQUFDO1FBQzVCLElBQUksQ0FBQyxxQkFBcUIsRUFBRSxDQUFDO0tBQzlCOzs7OztJQUVELFVBQVUsQ0FBQyxLQUFlLElBQUksSUFBSSxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBRTs7Ozs7SUFFM0QsVUFBVSxDQUFDLEtBQUs7UUFDZCxJQUFJLENBQUMsTUFBTSxHQUFHLEtBQUssQ0FBQztRQUNwQixJQUFJLENBQUMsa0JBQWtCLEVBQUUsQ0FBQztLQUMzQjs7OztJQUVPLGtCQUFrQixLQUFLLElBQUksQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLENBQUMsS0FBSyxLQUFLLEtBQUssQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUM7Ozs7SUFDdkYscUJBQXFCLEtBQUssSUFBSSxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsQ0FBQyxLQUFLLEtBQUssS0FBSyxDQUFDLGNBQWMsRUFBRSxDQUFDLENBQUM7OztZQTVDM0YsU0FBUyxTQUFDLEVBQUMsUUFBUSxFQUFFLGlCQUFpQixFQUFFLElBQUksRUFBRSxFQUFDLE1BQU0sRUFBRSxPQUFPLEVBQUMsRUFBRSxTQUFTLEVBQUUsQ0FBQyx3QkFBd0IsQ0FBQyxFQUFDOzs7bUJBYXJHLEtBQUs7Ozs7O0FBaURSOzs7Ozs7O0lBZ0RFLFlBQ1ksUUFBK0IsTUFBc0IsRUFBVSxTQUFvQixFQUNuRjtRQURBLFdBQU0sR0FBTixNQUFNO1FBQXlCLFdBQU0sR0FBTixNQUFNLENBQWdCO1FBQVUsY0FBUyxHQUFULFNBQVMsQ0FBVztRQUNuRixhQUFRLEdBQVIsUUFBUTtzQkEvQ0UsSUFBSTtRQWdEeEIsSUFBSSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDM0IsSUFBSSxDQUFDLGNBQWMsRUFBRSxDQUFDO0tBQ3ZCOzs7Ozs7SUF2Q0QsSUFDSSxLQUFLLENBQUMsS0FBVTtRQUNsQixJQUFJLENBQUMsTUFBTSxHQUFHLEtBQUssQ0FBQzs7UUFDcEIsTUFBTSxXQUFXLEdBQUcsS0FBSyxHQUFHLEtBQUssQ0FBQyxRQUFRLEVBQUUsR0FBRyxFQUFFLENBQUM7UUFDbEQsSUFBSSxDQUFDLFNBQVMsQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxhQUFhLEVBQUUsT0FBTyxFQUFFLFdBQVcsQ0FBQyxDQUFDO1FBQzlFLElBQUksQ0FBQyxNQUFNLENBQUMsa0JBQWtCLEVBQUUsQ0FBQztLQUNsQzs7Ozs7O0lBS0QsSUFDSSxRQUFRLENBQUMsVUFBbUI7UUFDOUIsSUFBSSxDQUFDLFNBQVMsR0FBRyxVQUFVLEtBQUssS0FBSyxDQUFDO1FBQ3RDLElBQUksQ0FBQyxjQUFjLEVBQUUsQ0FBQztLQUN2Qjs7Ozs7SUFFRCxJQUFJLE9BQU8sQ0FBQyxTQUFrQjtRQUM1QixJQUFJLElBQUksQ0FBQyxNQUFNLEVBQUU7WUFDZixJQUFJLENBQUMsTUFBTSxDQUFDLE9BQU8sR0FBRyxTQUFTLENBQUM7U0FDakM7UUFDRCxJQUFJLENBQUMsU0FBUyxFQUFFO1lBQ2QsSUFBSSxDQUFDLE1BQU0sQ0FBQyxTQUFTLEVBQUUsQ0FBQztTQUN6QjtLQUNGOzs7O0lBRUQsSUFBSSxPQUFPLEtBQUssT0FBTyxJQUFJLENBQUMsUUFBUSxDQUFDLEVBQUU7Ozs7SUFFdkMsSUFBSSxRQUFRLEtBQUssT0FBTyxJQUFJLENBQUMsTUFBTSxDQUFDLFFBQVEsSUFBSSxJQUFJLENBQUMsU0FBUyxDQUFDLEVBQUU7Ozs7SUFFakUsSUFBSSxLQUFLLEtBQUssT0FBTyxJQUFJLENBQUMsTUFBTSxDQUFDLEVBQUU7Ozs7SUFFbkMsSUFBSSxRQUFRLEtBQUssT0FBTyxJQUFJLENBQUMsSUFBSSxJQUFJLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLEVBQUU7Ozs7SUFTeEQsV0FBVyxLQUFLLElBQUksQ0FBQyxNQUFNLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxDQUFDLEVBQUU7Ozs7SUFFL0MsUUFBUSxLQUFLLElBQUksQ0FBQyxNQUFNLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxDQUFDLEVBQUU7Ozs7O0lBRS9DLFdBQVcsQ0FBQyxLQUFLO1FBQ2YsSUFBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUMsS0FBSyxLQUFLLEtBQUssQ0FBQztRQUNyQyxJQUFJLENBQUMsTUFBTSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDO0tBQ3BDOzs7O0lBRUQsY0FBYyxLQUFLLElBQUksQ0FBQyxNQUFNLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsRUFBRTs7O1lBM0UzRCxTQUFTLFNBQUM7Z0JBQ1QsUUFBUSxFQUFFLHlCQUF5QjtnQkFDbkMsSUFBSSxFQUFFO29CQUNKLFdBQVcsRUFBRSxTQUFTO29CQUN0QixZQUFZLEVBQUUsVUFBVTtvQkFDeEIsUUFBUSxFQUFFLFVBQVU7b0JBQ3BCLFVBQVUsRUFBRSxZQUFZO29CQUN4QixTQUFTLEVBQUUsZ0JBQWdCO29CQUMzQixRQUFRLEVBQUUsaUJBQWlCO2lCQUM1QjthQUNGOzs7O1lBa0RxQixhQUFhO1lBN0gzQixjQUFjO1lBSHVDLFNBQVM7WUFBbkQsVUFBVTs7O21CQXdGMUIsS0FBSztvQkFLTCxLQUFLLFNBQUMsT0FBTzt1QkFXYixLQUFLLFNBQUMsVUFBVTs7Ozs7OztBQ3hHbkI7QUFVQSxNQUFNLHFCQUFxQixHQUFHLENBQUMsY0FBYyxFQUFFLFdBQVcsRUFBRSxhQUFhLEVBQUUsUUFBUSxDQUFDLENBQUM7QUFHckY7Ozs7Ozs7O0lBT0UsT0FBTyxPQUFPLEtBQTBCLE9BQU8sRUFBQyxRQUFRLEVBQUUsZ0JBQWdCLEVBQUMsQ0FBQyxFQUFFOzs7WUFSL0UsUUFBUSxTQUFDLEVBQUMsWUFBWSxFQUFFLHFCQUFxQixFQUFFLE9BQU8sRUFBRSxxQkFBcUIsRUFBQzs7Ozs7OztBQ1ovRTs7Ozs7QUFRQTs7d0JBQ2EsSUFBSTtvQkFDUixJQUFJO3dCQUNBLElBQUk7NEJBQ0EsSUFBSTtvQ0FDSSxJQUFJO3dDQUNBLElBQUk7Ozs7WUFQaEMsVUFBVSxTQUFDLEVBQUMsVUFBVSxFQUFFLE1BQU0sRUFBQzs7Ozs7Ozs7QUNQaEM7QUEwQkEsSUFBSUEsUUFBTSxHQUFHLENBQUMsQ0FBQzs7OztBQU1mOzs7O0lBTUUsWUFBbUIsTUFBd0I7UUFBeEIsV0FBTSxHQUFOLE1BQU0sQ0FBa0I7Ozs7O2tCQUQ3QixhQUFhQSxRQUFNLEVBQUUsRUFBRTtLQUNVOzs7WUFQaEQsU0FBUyxTQUFDLEVBQUMsUUFBUSxFQUFFLHVCQUF1QixFQUFDOzs7O1lBZDVDLFdBQVc7OztpQkFvQlYsS0FBSzs7Ozs7QUF3Q1I7Ozs7Ozs7SUFvREUsWUFDSSxNQUF5QixFQUErQixXQUFXLEVBQVUsT0FBZSxFQUNwRjtRQURnRCxnQkFBVyxHQUFYLFdBQVcsQ0FBQTtRQUFVLFlBQU8sR0FBUCxPQUFPLENBQVE7UUFDcEYsUUFBRyxHQUFILEdBQUc7dUJBbERHLElBQUksT0FBTyxFQUFRO3NCQUNwQixJQUFJLE9BQU8sRUFBUTs7Ozs7cUJBNkNsQixJQUFJLFlBQVksRUFBaUI7UUFLakQsSUFBSSxDQUFDLFFBQVEsR0FBRyxNQUFNLENBQUMsUUFBUSxDQUFDO1FBQ2hDLElBQUksQ0FBQyxJQUFJLEdBQUcsTUFBTSxDQUFDLElBQUksQ0FBQztRQUN4QixJQUFJLENBQUMsUUFBUSxHQUFHLE1BQU0sQ0FBQyxRQUFRLENBQUM7UUFDaEMsSUFBSSxDQUFDLFlBQVksR0FBRyxNQUFNLENBQUMsWUFBWSxDQUFDO1FBQ3hDLElBQUksQ0FBQyxvQkFBb0IsR0FBRyxNQUFNLENBQUMsb0JBQW9CLENBQUM7UUFDeEQsSUFBSSxDQUFDLHdCQUF3QixHQUFHLE1BQU0sQ0FBQyx3QkFBd0IsQ0FBQztLQUNqRTs7OztJQUVELGtCQUFrQjs7O1FBR2hCLElBQUksaUJBQWlCLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxFQUFFO1lBQ3ZDLElBQUksQ0FBQyxPQUFPLENBQUMsaUJBQWlCLENBQUM7Z0JBQzdCLElBQUksQ0FBQyxPQUFPO3FCQUNQLElBQUksQ0FDRCxHQUFHLENBQUMsTUFBTSxJQUFJLENBQUMsUUFBUSxDQUFDLEVBQUUsTUFBTSxDQUFDLFFBQVEsSUFBSSxRQUFRLEdBQUcsQ0FBQyxDQUFDLEVBQzFELFNBQVMsQ0FBQyxRQUFRLElBQUksS0FBSyxDQUFDLFFBQVEsQ0FBQyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQztxQkFDdkUsU0FBUyxDQUFDLE1BQU0sSUFBSSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUM7b0JBQ2hDLElBQUksQ0FBQyxJQUFJLEVBQUUsQ0FBQztvQkFDWixJQUFJLENBQUMsR0FBRyxDQUFDLGFBQWEsRUFBRSxDQUFDO2lCQUMxQixDQUFDLENBQUMsQ0FBQztnQkFFUixJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksRUFBRSxDQUFDO2FBQ3JCLENBQUMsQ0FBQztTQUNKO0tBQ0Y7Ozs7SUFFRCxxQkFBcUI7O1FBQ25CLElBQUksV0FBVyxHQUFHLElBQUksQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBQ3BELElBQUksQ0FBQyxRQUFRLEdBQUcsV0FBVyxHQUFHLFdBQVcsQ0FBQyxFQUFFLElBQUksSUFBSSxDQUFDLE1BQU0sQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsRUFBRSxHQUFHLElBQUksQ0FBQyxDQUFDO0tBQ25HOzs7O0lBRUQsV0FBVyxLQUFLLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxFQUFFLENBQUMsRUFBRTs7Ozs7SUFFckMsV0FBVyxDQUFDLE9BQU87UUFDakIsSUFBSSxVQUFVLElBQUksT0FBTyxJQUFJLENBQUMsT0FBTyxDQUFDLFVBQVUsQ0FBQyxDQUFDLGFBQWEsRUFBRSxFQUFFO1lBQ2pFLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxFQUFFLENBQUM7U0FDckI7S0FDRjs7Ozs7O0lBS0QsTUFBTSxDQUFDLE9BQWUsSUFBSSxJQUFJLENBQUMsZ0JBQWdCLENBQUMsT0FBTyxFQUFFLElBQUksQ0FBQyx1QkFBdUIsQ0FBQyxJQUFJLENBQUMsUUFBUSxFQUFFLE9BQU8sQ0FBQyxDQUFDLENBQUMsRUFBRTs7Ozs7SUFLakgsSUFBSSxLQUFLLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsRUFBRSxzQkFBc0IsQ0FBQyxLQUFLLENBQUMsQ0FBQyxFQUFFOzs7OztJQUtsRyxJQUFJLEtBQUssSUFBSSxDQUFDLGdCQUFnQixDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxFQUFFLHNCQUFzQixDQUFDLElBQUksQ0FBQyxDQUFDLEVBQUU7Ozs7O0lBS2pHLEtBQUssS0FBSyxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksRUFBRSxDQUFDLEVBQUU7Ozs7O0lBSy9CLEtBQUssS0FBSyxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksRUFBRSxDQUFDLEVBQUU7Ozs7OztJQUV4QixnQkFBZ0IsQ0FBQyxRQUFnQixFQUFFLFNBQWlDOztRQUMxRSxJQUFJLGFBQWEsR0FBRyxJQUFJLENBQUMsYUFBYSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBQ2pELElBQUksYUFBYSxJQUFJLGFBQWEsQ0FBQyxFQUFFLEtBQUssSUFBSSxDQUFDLFFBQVEsRUFBRTtZQUN2RCxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxFQUFDLElBQUksRUFBRSxJQUFJLENBQUMsUUFBUSxFQUFFLE9BQU8sRUFBRSxhQUFhLENBQUMsRUFBRSxFQUFFLFNBQVMsRUFBRSxTQUFTLEVBQUMsQ0FBQyxDQUFDO1lBQ3hGLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxFQUFFLENBQUM7WUFDcEIsSUFBSSxDQUFDLFFBQVEsR0FBRyxhQUFhLENBQUMsRUFBRSxDQUFDO1NBQ2xDOzs7Ozs7O0lBR0ssdUJBQXVCLENBQUMsb0JBQTRCLEVBQUUsaUJBQXlCOztRQUNyRixNQUFNLHFCQUFxQixHQUFHLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxvQkFBb0IsQ0FBQyxDQUFDOztRQUMxRSxNQUFNLGtCQUFrQixHQUFHLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDO1FBRXBFLE9BQU8scUJBQXFCLEdBQUcsa0JBQWtCLEdBQUcsc0JBQXNCLENBQUMsS0FBSyxHQUFHLHNCQUFzQixDQUFDLElBQUksQ0FBQzs7Ozs7O0lBR3pHLGFBQWEsQ0FBQyxPQUFlLElBQWMsT0FBTyxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxLQUFLLElBQUksS0FBSyxDQUFDLEVBQUUsS0FBSyxPQUFPLENBQUMsQ0FBQzs7Ozs7SUFFbEcsZ0JBQWdCLENBQUMsT0FBZTtRQUN0QyxPQUFPLElBQUksQ0FBQyxNQUFNLENBQUMsT0FBTyxFQUFFLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQzs7Ozs7O0lBRzVELGFBQWEsQ0FBQyxjQUFzQjs7UUFDMUMsTUFBTSxRQUFRLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxPQUFPLEVBQUUsQ0FBQzs7UUFDdkMsTUFBTSxlQUFlLEdBQUcsSUFBSSxDQUFDLGdCQUFnQixDQUFDLGNBQWMsQ0FBQyxDQUFDOztRQUM5RCxNQUFNLFdBQVcsR0FBRyxlQUFlLEtBQUssUUFBUSxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUM7UUFFNUQsT0FBTyxXQUFXLElBQUksSUFBSSxDQUFDLElBQUksR0FBRyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxHQUFHLFFBQVEsQ0FBQyxRQUFRLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQyxDQUFDLEVBQUU7WUFDOUQsUUFBUSxDQUFDLGVBQWUsR0FBRyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUM7Ozs7OztJQUdoRCxhQUFhLENBQUMsY0FBc0I7O1FBQzFDLE1BQU0sUUFBUSxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsT0FBTyxFQUFFLENBQUM7O1FBQ3ZDLE1BQU0sZUFBZSxHQUFHLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxjQUFjLENBQUMsQ0FBQzs7UUFDOUQsTUFBTSxZQUFZLEdBQUcsZUFBZSxLQUFLLENBQUMsQ0FBQztRQUUzQyxPQUFPLFlBQVksSUFBSSxJQUFJLENBQUMsSUFBSSxHQUFHLFFBQVEsQ0FBQyxRQUFRLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQyxDQUFDLEVBQUUsR0FBRyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRTtZQUM5RCxRQUFRLENBQUMsZUFBZSxHQUFHLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQzs7OztZQTlMMUQsU0FBUyxTQUFDO2dCQUNULFFBQVEsRUFBRSxjQUFjO2dCQUN4QixRQUFRLEVBQUUsYUFBYTtnQkFDdkIsZUFBZSxFQUFFLHVCQUF1QixDQUFDLE1BQU07Z0JBQy9DLElBQUksRUFBRTtvQkFDSixPQUFPLEVBQUUsZ0JBQWdCO29CQUN6QixpQkFBaUIsRUFBRSxTQUFTO29CQUM1QixVQUFVLEVBQUUsR0FBRztvQkFDZixjQUFjLEVBQUUseUJBQXlCO29CQUN6QyxjQUFjLEVBQUUseUJBQXlCO29CQUN6QyxxQkFBcUIsRUFBRSxvQkFBb0I7b0JBQzNDLHNCQUFzQixFQUFFLG9CQUFvQjtpQkFDN0M7Z0JBQ0QsUUFBUSxFQUFFOzs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FrQlQ7YUFDRjs7OztZQXZETyxpQkFBaUI7NENBNkdTLE1BQU0sU0FBQyxXQUFXO1lBdkhsRCxNQUFNO1lBUE4saUJBQWlCOzs7cUJBMkVoQixlQUFlLFNBQUMsUUFBUTt1QkFReEIsS0FBSzt1QkFNTCxLQUFLO21CQUtMLEtBQUs7dUJBS0wsS0FBSzsyQkFNTCxLQUFLO21DQU1MLEtBQUs7dUNBTUwsS0FBSztvQkFNTCxNQUFNOzs7O0lBdUlQLHdCQUFZLE1BQU0sQ0FBQTtJQUNsQix5QkFBYSxPQUFPLENBQUE7OztBQUd0QixNQUFhLHVCQUF1QixHQUFHLENBQUMsV0FBVyxFQUFFLFFBQVEsQ0FBQzs7Ozs7O0FDMVE5RDs7Ozs7Ozs7SUFnQkUsT0FBTyxPQUFPLEtBQTBCLE9BQU8sRUFBQyxRQUFRLEVBQUUsaUJBQWlCLEVBQUMsQ0FBQyxFQUFFOzs7WUFSaEYsUUFBUSxTQUFDLEVBQUMsWUFBWSxFQUFFLHVCQUF1QixFQUFFLE9BQU8sRUFBRSx1QkFBdUIsRUFBRSxPQUFPLEVBQUUsQ0FBQyxZQUFZLENBQUMsRUFBQzs7Ozs7OztBQ1I1Rzs7O0FBVUE7Ozs7O3lCQUlvQyxLQUFLOzs7O1lBVHhDLFNBQVMsU0FBQztnQkFDVCxRQUFRLEVBQUUsZUFBZTtnQkFDekIsUUFBUSxFQUFFLGFBQWE7Z0JBQ3ZCLElBQUksRUFBRSxFQUFDLGtCQUFrQixFQUFFLE1BQU0sRUFBRSxjQUFjLEVBQUUsWUFBWSxFQUFDO2FBQ2pFOzs7d0JBS0UsS0FBSyxTQUFDLGFBQWE7Ozs7Ozs7QUNkdEI7Ozs7Ozs7O0lBYUUsT0FBTyxPQUFPLEtBQTBCLE9BQU8sRUFBQyxRQUFRLEVBQUUsaUJBQWlCLEVBQUMsQ0FBQyxFQUFFOzs7WUFSaEYsUUFBUSxTQUFDLEVBQUMsWUFBWSxFQUFFLENBQUMsV0FBVyxDQUFDLEVBQUUsT0FBTyxFQUFFLENBQUMsV0FBVyxDQUFDLEVBQUM7Ozs7Ozs7QUNKL0Q7Ozs7O0FBT0E7Ozs7Ozs7SUFvQkUsT0FBTyxJQUFJLENBQUMsSUFBbUI7UUFDN0IsSUFBSSxJQUFJLFlBQVksT0FBTyxFQUFFO1lBQzNCLE9BQU8sSUFBSSxDQUFDO1NBQ2I7UUFDRCxPQUFPLElBQUksR0FBRyxJQUFJLE9BQU8sQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxLQUFLLEVBQUUsSUFBSSxDQUFDLEdBQUcsQ0FBQyxHQUFHLElBQUksQ0FBQztLQUNuRTs7Ozs7O0lBRUQsWUFBWSxJQUFZLEVBQUUsS0FBYSxFQUFFLEdBQVc7UUFDbEQsSUFBSSxDQUFDLElBQUksR0FBRyxTQUFTLENBQUMsSUFBSSxDQUFDLEdBQUcsSUFBSSxHQUFHLElBQUksQ0FBQztRQUMxQyxJQUFJLENBQUMsS0FBSyxHQUFHLFNBQVMsQ0FBQyxLQUFLLENBQUMsR0FBRyxLQUFLLEdBQUcsSUFBSSxDQUFDO1FBQzdDLElBQUksQ0FBQyxHQUFHLEdBQUcsU0FBUyxDQUFDLEdBQUcsQ0FBQyxHQUFHLEdBQUcsR0FBRyxJQUFJLENBQUM7S0FDeEM7Ozs7OztJQUtELE1BQU0sQ0FBQyxLQUFjO1FBQ25CLE9BQU8sS0FBSyxJQUFJLElBQUksQ0FBQyxJQUFJLEtBQUssS0FBSyxDQUFDLElBQUksSUFBSSxJQUFJLENBQUMsS0FBSyxLQUFLLEtBQUssQ0FBQyxLQUFLLElBQUksSUFBSSxDQUFDLEdBQUcsS0FBSyxLQUFLLENBQUMsR0FBRyxDQUFDO0tBQ2xHOzs7Ozs7SUFLRCxNQUFNLENBQUMsS0FBYztRQUNuQixJQUFJLENBQUMsS0FBSyxFQUFFO1lBQ1YsT0FBTyxLQUFLLENBQUM7U0FDZDtRQUVELElBQUksSUFBSSxDQUFDLElBQUksS0FBSyxLQUFLLENBQUMsSUFBSSxFQUFFO1lBQzVCLElBQUksSUFBSSxDQUFDLEtBQUssS0FBSyxLQUFLLENBQUMsS0FBSyxFQUFFO2dCQUM5QixPQUFPLElBQUksQ0FBQyxHQUFHLEtBQUssS0FBSyxDQUFDLEdBQUcsR0FBRyxLQUFLLEdBQUcsSUFBSSxDQUFDLEdBQUcsR0FBRyxLQUFLLENBQUMsR0FBRyxDQUFDO2FBQzlEO2lCQUFNO2dCQUNMLE9BQU8sSUFBSSxDQUFDLEtBQUssR0FBRyxLQUFLLENBQUMsS0FBSyxDQUFDO2FBQ2pDO1NBQ0Y7YUFBTTtZQUNMLE9BQU8sSUFBSSxDQUFDLElBQUksR0FBRyxLQUFLLENBQUMsSUFBSSxDQUFDO1NBQy9CO0tBQ0Y7Ozs7OztJQUtELEtBQUssQ0FBQyxLQUFjO1FBQ2xCLElBQUksQ0FBQyxLQUFLLEVBQUU7WUFDVixPQUFPLEtBQUssQ0FBQztTQUNkO1FBQ0QsSUFBSSxJQUFJLENBQUMsSUFBSSxLQUFLLEtBQUssQ0FBQyxJQUFJLEVBQUU7WUFDNUIsSUFBSSxJQUFJLENBQUMsS0FBSyxLQUFLLEtBQUssQ0FBQyxLQUFLLEVBQUU7Z0JBQzlCLE9BQU8sSUFBSSxDQUFDLEdBQUcsS0FBSyxLQUFLLENBQUMsR0FBRyxHQUFHLEtBQUssR0FBRyxJQUFJLENBQUMsR0FBRyxHQUFHLEtBQUssQ0FBQyxHQUFHLENBQUM7YUFDOUQ7aUJBQU07Z0JBQ0wsT0FBTyxJQUFJLENBQUMsS0FBSyxHQUFHLEtBQUssQ0FBQyxLQUFLLENBQUM7YUFDakM7U0FDRjthQUFNO1lBQ0wsT0FBTyxJQUFJLENBQUMsSUFBSSxHQUFHLEtBQUssQ0FBQyxJQUFJLENBQUM7U0FDL0I7S0FDRjtDQUNGOzs7Ozs7QUNwRkQ7Ozs7QUFJQSxvQkFBb0IsTUFBWTtJQUM5QixPQUFPLElBQUksT0FBTyxDQUFDLE1BQU0sQ0FBQyxXQUFXLEVBQUUsRUFBRSxNQUFNLENBQUMsUUFBUSxFQUFFLEdBQUcsQ0FBQyxFQUFFLE1BQU0sQ0FBQyxPQUFPLEVBQUUsQ0FBQyxDQUFDO0NBQ25GOzs7OztBQUNELGtCQUFrQixJQUFhOztJQUM3QixNQUFNLE1BQU0sR0FBRyxJQUFJLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxLQUFLLEdBQUcsQ0FBQyxFQUFFLElBQUksQ0FBQyxHQUFHLEVBQUUsRUFBRSxDQUFDLENBQUM7O0lBRWpFLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLE9BQU8sRUFBRSxDQUFDLEVBQUU7UUFDNUIsTUFBTSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7S0FDL0I7SUFDRCxPQUFPLE1BQU0sQ0FBQztDQUNmOzs7O0FBSUQ7SUFDRSxPQUFPLElBQUksb0JBQW9CLEVBQUUsQ0FBQztDQUNuQzs7Ozs7O0FBT0Q7OztZQURDLFVBQVUsU0FBQyxFQUFDLFVBQVUsRUFBRSxNQUFNLEVBQUUsVUFBVSxFQUFFLCtCQUErQixFQUFDOzs7MEJBdUQzQyxTQUFRLFdBQVc7Ozs7SUFDbkQsY0FBYyxLQUFLLE9BQU8sQ0FBQyxDQUFDLEVBQUU7Ozs7SUFFOUIsU0FBUyxLQUFLLE9BQU8sQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsQ0FBQyxDQUFDLEVBQUU7Ozs7SUFFL0QsZ0JBQWdCLEtBQUssT0FBTyxDQUFDLENBQUMsRUFBRTs7Ozs7OztJQUVoQyxPQUFPLENBQUMsSUFBYSxFQUFFLFNBQW9CLEdBQUcsRUFBRSxNQUFNLEdBQUcsQ0FBQzs7UUFDeEQsSUFBSSxNQUFNLEdBQUcsUUFBUSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBRTVCLFFBQVEsTUFBTTtZQUNaLEtBQUssR0FBRztnQkFDTixPQUFPLElBQUksT0FBTyxDQUFDLElBQUksQ0FBQyxJQUFJLEdBQUcsTUFBTSxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztZQUMvQyxLQUFLLEdBQUc7Z0JBQ04sTUFBTSxHQUFHLElBQUksSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLEtBQUssR0FBRyxNQUFNLEdBQUcsQ0FBQyxFQUFFLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQztnQkFDN0QsTUFBTTtZQUNSLEtBQUssR0FBRztnQkFDTixNQUFNLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxPQUFPLEVBQUUsR0FBRyxNQUFNLENBQUMsQ0FBQztnQkFDMUMsTUFBTTtZQUNSO2dCQUNFLE9BQU8sSUFBSSxDQUFDO1NBQ2Y7UUFFRCxPQUFPLFVBQVUsQ0FBQyxNQUFNLENBQUMsQ0FBQztLQUMzQjs7Ozs7OztJQUVELE9BQU8sQ0FBQyxJQUFhLEVBQUUsU0FBb0IsR0FBRyxFQUFFLE1BQU0sR0FBRyxDQUFDLElBQUksT0FBTyxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksRUFBRSxNQUFNLEVBQUUsQ0FBQyxNQUFNLENBQUMsQ0FBQyxFQUFFOzs7OztJQUUzRyxVQUFVLENBQUMsSUFBYTs7UUFDdEIsSUFBSSxNQUFNLEdBQUcsUUFBUSxDQUFDLElBQUksQ0FBQyxDQUFDOztRQUM1QixJQUFJLEdBQUcsR0FBRyxNQUFNLENBQUMsTUFBTSxFQUFFLENBQUM7O1FBRTFCLE9BQU8sR0FBRyxLQUFLLENBQUMsR0FBRyxDQUFDLEdBQUcsR0FBRyxDQUFDO0tBQzVCOzs7Ozs7SUFFRCxhQUFhLENBQUMsSUFBZSxFQUFFLGNBQXNCOztRQUVuRCxJQUFJLGNBQWMsS0FBSyxDQUFDLEVBQUU7WUFDeEIsY0FBYyxHQUFHLENBQUMsQ0FBQztTQUNwQjs7UUFFRCxNQUFNLGFBQWEsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDLEdBQUcsY0FBYyxJQUFJLENBQUMsQ0FBQzs7UUFDbkQsSUFBSSxJQUFJLEdBQUcsSUFBSSxDQUFDLGFBQWEsQ0FBQyxDQUFDOztRQUUvQixNQUFNLE1BQU0sR0FBRyxRQUFRLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDOUIsTUFBTSxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsT0FBTyxFQUFFLEdBQUcsQ0FBQyxJQUFJLE1BQU0sQ0FBQyxNQUFNLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDOztRQUM5RCxNQUFNLElBQUksR0FBRyxNQUFNLENBQUMsT0FBTyxFQUFFLENBQUM7UUFDOUIsTUFBTSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUNuQixNQUFNLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ2xCLE9BQU8sSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsSUFBSSxHQUFHLE1BQU0sQ0FBQyxPQUFPLEVBQUUsSUFBSSxRQUFRLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUM7S0FDN0U7Ozs7SUFFRCxRQUFRLEtBQWMsT0FBTyxVQUFVLENBQUMsSUFBSSxJQUFJLEVBQUUsQ0FBQyxDQUFDLEVBQUU7Ozs7O0lBRXRELE9BQU8sQ0FBQyxJQUFhO1FBQ25CLElBQUksQ0FBQyxJQUFJLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUU7WUFDcEYsT0FBTyxLQUFLLENBQUM7U0FDZDs7UUFFRCxNQUFNLE1BQU0sR0FBRyxRQUFRLENBQUMsSUFBSSxDQUFDLENBQUM7UUFFOUIsT0FBTyxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsT0FBTyxFQUFFLENBQUMsSUFBSSxNQUFNLENBQUMsV0FBVyxFQUFFLEtBQUssSUFBSSxDQUFDLElBQUksSUFBSSxNQUFNLENBQUMsUUFBUSxFQUFFLEdBQUcsQ0FBQyxLQUFLLElBQUksQ0FBQyxLQUFLO1lBQ3pHLE1BQU0sQ0FBQyxPQUFPLEVBQUUsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDO0tBQ25DOzs7WUFoRUYsVUFBVTs7Ozs7OztBQ2hGWDs7Ozs7QUFNQSx1QkFBOEIsSUFBYSxFQUFFLElBQWE7SUFDeEQsT0FBTyxDQUFDLGNBQWMsQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLENBQUM7Q0FDcEM7Ozs7OztBQUVELHdCQUErQixJQUFhLEVBQUUsSUFBYTtJQUN6RCxPQUFPLENBQUMsQ0FBQyxJQUFJLElBQUksQ0FBQyxJQUFJLE1BQU0sQ0FBQyxDQUFDLElBQUksSUFBSSxDQUFDLENBQUMsSUFBSSxJQUFJLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztDQUNwRTs7Ozs7O0FBRUQsMkJBQWtDLE9BQWdCLEVBQUUsT0FBZ0I7SUFDbEUsSUFBSSxPQUFPLElBQUksT0FBTyxJQUFJLE9BQU8sQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLEVBQUU7UUFDakQsTUFBTSxJQUFJLEtBQUssQ0FBQyxhQUFhLE9BQU8scUNBQXFDLE9BQU8sRUFBRSxDQUFDLENBQUM7S0FDckY7Q0FDRjs7Ozs7OztBQUVELDBCQUFpQyxJQUFhLEVBQUUsT0FBZ0IsRUFBRSxPQUFnQjtJQUNoRixJQUFJLElBQUksSUFBSSxPQUFPLElBQUksSUFBSSxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsRUFBRTtRQUMzQyxPQUFPLE9BQU8sQ0FBQztLQUNoQjtJQUNELElBQUksSUFBSSxJQUFJLE9BQU8sSUFBSSxJQUFJLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxFQUFFO1FBQzFDLE9BQU8sT0FBTyxDQUFDO0tBQ2hCO0lBRUQsT0FBTyxJQUFJLENBQUM7Q0FDYjs7Ozs7O0FBRUQsMEJBQWlDLElBQWEsRUFBRSxLQUEwQjtJQUN4RSxNQUFNLEVBQUMsT0FBTyxFQUFFLE9BQU8sRUFBRSxRQUFRLEVBQUUsWUFBWSxFQUFDLEdBQUcsS0FBSyxDQUFDOztJQUV6RCxPQUFPLEVBQ0wsQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDO1FBQ2hCLFFBQVE7U0FDUCxZQUFZLElBQUksWUFBWSxDQUFDLElBQUksRUFBRSxFQUFDLElBQUksRUFBRSxJQUFJLENBQUMsSUFBSSxFQUFFLEtBQUssRUFBRSxJQUFJLENBQUMsS0FBSyxFQUFDLENBQUMsQ0FBQztTQUN6RSxPQUFPLElBQUksSUFBSSxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsQ0FBQztTQUNoQyxPQUFPLElBQUksSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUNqQyxDQUFDOztDQUVIOzs7Ozs7OztBQUVELGlDQUF3QyxRQUFxQixFQUFFLElBQWEsRUFBRSxPQUFnQixFQUFFLE9BQWdCO0lBQzlHLElBQUksQ0FBQyxJQUFJLEVBQUU7UUFDVCxPQUFPLEVBQUUsQ0FBQztLQUNYOztJQUVELElBQUksTUFBTSxHQUFHLFFBQVEsQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO0lBRTNDLElBQUksT0FBTyxJQUFJLElBQUksQ0FBQyxJQUFJLEtBQUssT0FBTyxDQUFDLElBQUksRUFBRTs7UUFDekMsTUFBTSxLQUFLLEdBQUcsTUFBTSxDQUFDLFNBQVMsQ0FBQyxLQUFLLElBQUksS0FBSyxLQUFLLE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUNqRSxNQUFNLEdBQUcsTUFBTSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQztLQUM5QjtJQUVELElBQUksT0FBTyxJQUFJLElBQUksQ0FBQyxJQUFJLEtBQUssT0FBTyxDQUFDLElBQUksRUFBRTs7UUFDekMsTUFBTSxLQUFLLEdBQUcsTUFBTSxDQUFDLFNBQVMsQ0FBQyxLQUFLLElBQUksS0FBSyxLQUFLLE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUNqRSxNQUFNLEdBQUcsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUUsS0FBSyxHQUFHLENBQUMsQ0FBQyxDQUFDO0tBQ3JDO0lBRUQsT0FBTyxNQUFNLENBQUM7Q0FDZjs7Ozs7OztBQUVELGdDQUF1QyxJQUFhLEVBQUUsT0FBZ0IsRUFBRSxPQUFnQjtJQUN0RixJQUFJLENBQUMsSUFBSSxFQUFFO1FBQ1QsT0FBTyxFQUFFLENBQUM7S0FDWDs7SUFFRCxNQUFNLEtBQUssR0FBRyxPQUFPLElBQUksT0FBTyxDQUFDLElBQUksSUFBSSxJQUFJLENBQUMsSUFBSSxHQUFHLEVBQUUsQ0FBQzs7SUFDeEQsTUFBTSxHQUFHLEdBQUcsT0FBTyxJQUFJLE9BQU8sQ0FBQyxJQUFJLElBQUksSUFBSSxDQUFDLElBQUksR0FBRyxFQUFFLENBQUM7SUFFdEQsT0FBTyxLQUFLLENBQUMsSUFBSSxDQUFDLEVBQUMsTUFBTSxFQUFFLEdBQUcsR0FBRyxLQUFLLEdBQUcsQ0FBQyxFQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxLQUFLLEtBQUssR0FBRyxDQUFDLENBQUMsQ0FBQztDQUNuRTs7Ozs7OztBQUVELDJCQUFrQyxRQUFxQixFQUFFLElBQWEsRUFBRSxPQUFnQjtJQUN0RixPQUFPLE9BQU8sSUFBSSxRQUFRLENBQUMsT0FBTyxDQUFDLElBQUksRUFBRSxHQUFHLENBQUMsQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLENBQUM7Q0FDOUQ7Ozs7Ozs7QUFFRCwyQkFBa0MsUUFBcUIsRUFBRSxJQUFhLEVBQUUsT0FBZ0I7O0lBQ3RGLE1BQU0sUUFBUSxHQUFHLFFBQVEsQ0FBQyxPQUFPLENBQUMsSUFBSSxFQUFFLEdBQUcsQ0FBQyxDQUFDO0lBQzdDLE9BQU8sT0FBTyxLQUFLLFFBQVEsQ0FBQyxJQUFJLEtBQUssT0FBTyxDQUFDLElBQUksSUFBSSxRQUFRLENBQUMsS0FBSyxHQUFHLE9BQU8sQ0FBQyxLQUFLO1FBQ2hFLFFBQVEsQ0FBQyxJQUFJLEdBQUcsT0FBTyxDQUFDLElBQUksSUFBSSxPQUFPLENBQUMsS0FBSyxLQUFLLENBQUMsQ0FBQyxDQUFDO0NBQ3pFOzs7Ozs7Ozs7QUFFRCxxQkFDSSxRQUFxQixFQUFFLElBQWEsRUFBRSxLQUEwQixFQUFFLElBQXVCLEVBQ3pGLEtBQWM7SUFDaEIsTUFBTSxFQUFDLGFBQWEsRUFBRSxNQUFNLEVBQUMsR0FBRyxLQUFLLENBQUM7O0lBRXRDLE1BQU0sYUFBYSxHQUFHLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQyxFQUFFLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQzs7SUFHdEQsTUFBTSxVQUFVLEdBQUcsS0FBSyxDQUFDLElBQUksQ0FBQyxFQUFDLE1BQU0sRUFBRSxhQUFhLEVBQUMsRUFBRSxDQUFDLENBQUMsRUFBRSxDQUFDOztRQUMxRCxNQUFNLFNBQVMsR0FBRyxRQUFRLENBQUMsT0FBTyxDQUFDLElBQUksRUFBRSxHQUFHLEVBQUUsQ0FBQyxDQUFDLENBQUM7UUFDakQsTUFBTSxDQUFDLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQztRQUVqQixJQUFJLENBQUMsS0FBSyxFQUFFOztZQUNWLE1BQU0sV0FBVyxHQUFHLGFBQWEsQ0FBQyxTQUFTLENBQUMsS0FBSyxJQUFJLEtBQUssQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUM7O1lBRXhGLElBQUksV0FBVyxLQUFLLENBQUMsQ0FBQyxFQUFFO2dCQUN0QixNQUFNLENBQUMsQ0FBQyxDQUFDLEdBQUcsYUFBYSxDQUFDLE1BQU0sQ0FBQyxXQUFXLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7YUFDckQ7U0FDRjtRQUVELE9BQU8sU0FBUyxDQUFDO0tBQ2xCLENBQUMsQ0FBQzs7SUFHSCxVQUFVLENBQUMsT0FBTyxDQUFDLENBQUMsU0FBUyxFQUFFLENBQUM7UUFDOUIsSUFBSSxNQUFNLENBQUMsQ0FBQyxDQUFDLEtBQUssSUFBSSxFQUFFO1lBQ3RCLE1BQU0sQ0FBQyxDQUFDLENBQUMsR0FBRyxVQUFVLENBQUMsUUFBUSxFQUFFLFNBQVMsRUFBRSxLQUFLLEVBQUUsSUFBSSxFQUFFLGFBQWEsQ0FBQyxLQUFLLEVBQUUsc0JBQUksRUFBb0IsQ0FBQSxDQUFDLENBQUM7U0FDekc7S0FDRixDQUFDLENBQUM7SUFFSCxPQUFPLE1BQU0sQ0FBQztDQUNmOzs7Ozs7Ozs7QUFFRCxvQkFDSSxRQUFxQixFQUFFLElBQWEsRUFBRSxLQUEwQixFQUFFLElBQXVCLEVBQ3pGLDBCQUF3QixFQUFvQixDQUFBO0lBQzlDLE1BQU0sRUFBQyxPQUFPLEVBQUUsT0FBTyxFQUFFLGNBQWMsRUFBRSxZQUFZLEVBQUUsV0FBVyxFQUFDLEdBQUcsS0FBSyxDQUFDO0lBRTVFLEtBQUssQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDO0lBQ3ZCLEtBQUssQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDO0lBQ3RCLEtBQUssQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQztJQUMxQixLQUFLLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUM7SUFDdkIsS0FBSyxDQUFDLEtBQUssR0FBRyxLQUFLLENBQUMsS0FBSyxJQUFJLEVBQUUsQ0FBQztJQUNoQyxLQUFLLENBQUMsUUFBUSxHQUFHLEtBQUssQ0FBQyxRQUFRLElBQUksRUFBRSxDQUFDO0lBRXRDLElBQUksR0FBRyxnQkFBZ0IsQ0FBQyxRQUFRLEVBQUUsSUFBSSxFQUFFLGNBQWMsQ0FBQyxDQUFDOztJQUd4RCxLQUFLLElBQUksSUFBSSxHQUFHLENBQUMsRUFBRSxJQUFJLEdBQUcsUUFBUSxDQUFDLGdCQUFnQixFQUFFLEVBQUUsSUFBSSxFQUFFLEVBQUU7O1FBQzdELElBQUksVUFBVSxHQUFHLEtBQUssQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDbkMsSUFBSSxDQUFDLFVBQVUsRUFBRTtZQUNmLFVBQVUsR0FBRyxLQUFLLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxHQUFHLEVBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxJQUFJLEVBQUUsRUFBRSxFQUFFLFNBQVMsRUFBRSxJQUFJLEVBQUMsQ0FBQztTQUN6RTs7UUFDRCxNQUFNLElBQUksR0FBRyxVQUFVLENBQUMsSUFBSSxDQUFDOztRQUc3QixLQUFLLElBQUksR0FBRyxHQUFHLENBQUMsRUFBRSxHQUFHLEdBQUcsUUFBUSxDQUFDLGNBQWMsRUFBRSxFQUFFLEdBQUcsRUFBRSxFQUFFO1lBQ3hELElBQUksSUFBSSxLQUFLLENBQUMsRUFBRTtnQkFDZCxLQUFLLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxHQUFHLFFBQVEsQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLENBQUM7YUFDakQ7O1lBRUQsTUFBTSxPQUFPLEdBQUcsSUFBSSxPQUFPLENBQUMsSUFBSSxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsS0FBSyxFQUFFLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQzs7WUFDN0QsTUFBTSxRQUFRLEdBQUcsUUFBUSxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsQ0FBQzs7WUFFM0MsTUFBTSxTQUFTLEdBQUcsSUFBSSxDQUFDLGVBQWUsQ0FBQyxPQUFPLENBQUMsQ0FBQzs7WUFHaEQsSUFBSSxRQUFRLEdBQUcsQ0FBQyxFQUFFLENBQUMsT0FBTyxJQUFJLE9BQU8sQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLE1BQU0sT0FBTyxJQUFJLE9BQU8sQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQy9GLElBQUksQ0FBQyxRQUFRLElBQUksWUFBWSxFQUFFO2dCQUM3QixRQUFRLEdBQUcsWUFBWSxDQUFDLE9BQU8sRUFBRSxFQUFDLEtBQUssRUFBRSxLQUFLLENBQUMsTUFBTSxFQUFFLElBQUksRUFBRSxLQUFLLENBQUMsSUFBSSxFQUFDLENBQUMsQ0FBQzthQUMzRTs7WUFHRCxJQUFJLEtBQUssQ0FBQyxTQUFTLEtBQUssSUFBSSxJQUFJLE9BQU8sQ0FBQyxLQUFLLEtBQUssS0FBSyxDQUFDLE1BQU0sRUFBRTtnQkFDOUQsS0FBSyxDQUFDLFNBQVMsR0FBRyxPQUFPLENBQUM7YUFDM0I7O1lBR0QsSUFBSSxPQUFPLENBQUMsS0FBSyxLQUFLLEtBQUssQ0FBQyxNQUFNLElBQUksUUFBUSxDQUFDLEtBQUssS0FBSyxLQUFLLENBQUMsTUFBTSxFQUFFO2dCQUNyRSxLQUFLLENBQUMsUUFBUSxHQUFHLE9BQU8sQ0FBQzthQUMxQjs7WUFFRCxJQUFJLFNBQVMsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7WUFDMUIsSUFBSSxDQUFDLFNBQVMsRUFBRTtnQkFDZCxTQUFTLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxxQkFBRyxFQUFrQixDQUFBLENBQUM7YUFDNUM7WUFDRCxTQUFTLENBQUMsSUFBSSxHQUFHLE9BQU8sQ0FBQztZQUN6QixTQUFTLENBQUMsT0FBTyxHQUFHLE1BQU0sQ0FBQyxNQUFNLENBQzdCLFNBQVMsQ0FBQyxPQUFPLElBQUksRUFBRSxFQUN2QixFQUFDLElBQUksRUFBRSxPQUFPLEVBQUUsWUFBWSxFQUFFLEtBQUssQ0FBQyxNQUFNLEVBQUUsUUFBUSxFQUFFLE9BQU8sRUFBRSxLQUFLLEVBQUUsUUFBUSxFQUFFLEtBQUssRUFBQyxDQUFDLENBQUM7WUFDNUYsU0FBUyxDQUFDLFFBQVEsR0FBRyxDQUFDLENBQUMsQ0FBQztZQUN4QixTQUFTLENBQUMsU0FBUyxHQUFHLFNBQVMsQ0FBQztZQUNoQyxTQUFTLENBQUMsTUFBTSxHQUFHLEtBQUssQ0FBQztZQUV6QixJQUFJLEdBQUcsUUFBUSxDQUFDO1NBQ2pCO1FBRUQsVUFBVSxDQUFDLE1BQU0sR0FBRyxRQUFRLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsR0FBRyxJQUFJLEdBQUcsQ0FBQyxJQUFJLENBQUMsRUFBRSxjQUFjLENBQUMsQ0FBQzs7UUFHdEYsVUFBVSxDQUFDLFNBQVMsR0FBRyxXQUFXLEtBQUssV0FBVyxJQUFJLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsS0FBSyxLQUFLLEtBQUssQ0FBQyxNQUFNO1lBQ3JGLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxLQUFLLEtBQUssS0FBSyxDQUFDLE1BQU0sQ0FBQztLQUN2RDtJQUVELE9BQU8sS0FBSyxDQUFDO0NBQ2Q7Ozs7Ozs7QUFFRCwwQkFBaUMsUUFBcUIsRUFBRSxJQUFhLEVBQUUsY0FBc0I7O0lBQzNGLE1BQU0sV0FBVyxHQUFHLFFBQVEsQ0FBQyxjQUFjLEVBQUUsQ0FBQzs7SUFDOUMsTUFBTSxjQUFjLEdBQUcsSUFBSSxPQUFPLENBQUMsSUFBSSxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsS0FBSyxFQUFFLENBQUMsQ0FBQyxDQUFDOztJQUM3RCxNQUFNLFNBQVMsR0FBRyxRQUFRLENBQUMsVUFBVSxDQUFDLGNBQWMsQ0FBQyxHQUFHLFdBQVcsQ0FBQztJQUNwRSxPQUFPLFFBQVEsQ0FBQyxPQUFPLENBQUMsY0FBYyxFQUFFLEdBQUcsRUFBRSxDQUFDLFdBQVcsR0FBRyxTQUFTLEdBQUcsY0FBYyxJQUFJLFdBQVcsQ0FBQyxDQUFDO0NBQ3hHOzs7Ozs7QUNyTUQ7Ozs7QUFJQSxvQ0FBMkMsTUFBTTtJQUMvQyxPQUFPLElBQUksd0JBQXdCLENBQUMsTUFBTSxDQUFDLENBQUM7Q0FDN0M7Ozs7Ozs7O0FBU0Q7Ozs7Ozs7O0lBK0JFLGNBQWMsQ0FBQyxJQUFtQixJQUFZLE9BQU8sR0FBRyxJQUFJLENBQUMsR0FBRyxFQUFFLENBQUMsRUFBRTs7Ozs7Ozs7SUFPckUsZUFBZSxDQUFDLFVBQWtCLElBQVksT0FBTyxHQUFHLFVBQVUsRUFBRSxDQUFDLEVBQUU7Ozs7Ozs7OztJQVF2RSxlQUFlLENBQUMsSUFBWSxJQUFZLE9BQU8sR0FBRyxJQUFJLEVBQUUsQ0FBQyxFQUFFOzs7WUEvQzVELFVBQVUsU0FBQyxFQUFDLFVBQVUsRUFBRSxNQUFNLEVBQUUsVUFBVSxFQUFFLDBCQUEwQixFQUFFLElBQUksRUFBRSxDQUFDLFNBQVMsQ0FBQyxFQUFDOzs7OEJBbURyRCxTQUFRLGlCQUFpQjs7OztJQUs3RCxZQUF1QyxPQUFlO1FBQ3BELEtBQUssRUFBRSxDQUFDO1FBRDZCLFlBQU8sR0FBUCxPQUFPLENBQVE7O1FBR3BELE1BQU0sd0JBQXdCLEdBQUcsaUJBQWlCLENBQUMsT0FBTyxFQUFFLFNBQVMsQ0FBQyxVQUFVLEVBQUUsZ0JBQWdCLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDMUcsSUFBSSxDQUFDLGNBQWMsR0FBRyx3QkFBd0IsQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFHLEVBQUUsS0FBSyxLQUFLLHdCQUF3QixDQUFDLENBQUMsS0FBSyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBRTlHLElBQUksQ0FBQyxZQUFZLEdBQUcsbUJBQW1CLENBQUMsT0FBTyxFQUFFLFNBQVMsQ0FBQyxVQUFVLEVBQUUsZ0JBQWdCLENBQUMsV0FBVyxDQUFDLENBQUM7UUFDckcsSUFBSSxDQUFDLFdBQVcsR0FBRyxtQkFBbUIsQ0FBQyxPQUFPLEVBQUUsU0FBUyxDQUFDLFVBQVUsRUFBRSxnQkFBZ0IsQ0FBQyxJQUFJLENBQUMsQ0FBQztLQUM5Rjs7Ozs7SUFFRCxtQkFBbUIsQ0FBQyxPQUFlLElBQVksT0FBTyxJQUFJLENBQUMsY0FBYyxDQUFDLE9BQU8sR0FBRyxDQUFDLENBQUMsQ0FBQyxFQUFFOzs7OztJQUV6RixpQkFBaUIsQ0FBQyxLQUFhLElBQVksT0FBTyxJQUFJLENBQUMsWUFBWSxDQUFDLEtBQUssR0FBRyxDQUFDLENBQUMsQ0FBQyxFQUFFOzs7OztJQUVqRixnQkFBZ0IsQ0FBQyxLQUFhLElBQVksT0FBTyxJQUFJLENBQUMsV0FBVyxDQUFDLEtBQUssR0FBRyxDQUFDLENBQUMsQ0FBQyxFQUFFOzs7OztJQUUvRSxlQUFlLENBQUMsSUFBbUI7O1FBQ2pDLE1BQU0sTUFBTSxHQUFHLElBQUksSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLEtBQUssR0FBRyxDQUFDLEVBQUUsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQzdELE9BQU8sVUFBVSxDQUFDLE1BQU0sRUFBRSxVQUFVLEVBQUUsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDO0tBQ3JEOzs7WUF6QkYsVUFBVTs7Ozt5Q0FNSSxNQUFNLFNBQUMsU0FBUzs7Ozs7OztBQ3RFL0I7Ozs7O0lBd0dFLFlBQW9CLFNBQXNCLEVBQVUsS0FBd0I7UUFBeEQsY0FBUyxHQUFULFNBQVMsQ0FBYTtRQUFVLFVBQUssR0FBTCxLQUFLLENBQW1CO3VCQWhGMUQsSUFBSSxPQUFPLEVBQXVCO3dCQUVqQyxJQUFJLE9BQU8sRUFBVztzQkFFSDtZQUNwQyxRQUFRLEVBQUUsS0FBSztZQUNmLGFBQWEsRUFBRSxDQUFDO1lBQ2hCLGNBQWMsRUFBRSxDQUFDO1lBQ2pCLFlBQVksRUFBRSxLQUFLO1lBQ25CLE1BQU0sRUFBRSxFQUFFO1lBQ1YsVUFBVSxFQUFFLFFBQVE7WUFDcEIsV0FBVyxFQUFFLFNBQVM7WUFDdEIsWUFBWSxFQUFFLEtBQUs7WUFDbkIsWUFBWSxFQUFFLEtBQUs7WUFDbkIsV0FBVyxFQUFFLEVBQUMsS0FBSyxFQUFFLEVBQUUsRUFBRSxNQUFNLEVBQUUsRUFBRSxFQUFDO1lBQ3BDLFlBQVksRUFBRSxJQUFJO1NBQ25CO0tBZ0UrRTs7OztJQTlEaEYsSUFBSSxNQUFNLEtBQXNDLE9BQU8sSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLEtBQUssSUFBSSxLQUFLLENBQUMsTUFBTSxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUU7Ozs7SUFFckgsSUFBSSxPQUFPLEtBQTBCLE9BQU8sSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksSUFBSSxJQUFJLEtBQUssSUFBSSxDQUFDLENBQUMsQ0FBQyxFQUFFOzs7OztJQUVoRyxJQUFJLFFBQVEsQ0FBQyxRQUFpQjtRQUM1QixJQUFJLElBQUksQ0FBQyxNQUFNLENBQUMsUUFBUSxLQUFLLFFBQVEsRUFBRTtZQUNyQyxJQUFJLENBQUMsVUFBVSxDQUFDLEVBQUMsUUFBUSxFQUFDLENBQUMsQ0FBQztTQUM3QjtLQUNGOzs7OztJQUVELElBQUksYUFBYSxDQUFDLGFBQXFCO1FBQ3JDLGFBQWEsR0FBRyxTQUFTLENBQUMsYUFBYSxDQUFDLENBQUM7UUFDekMsSUFBSSxTQUFTLENBQUMsYUFBYSxDQUFDLElBQUksYUFBYSxHQUFHLENBQUMsSUFBSSxJQUFJLENBQUMsTUFBTSxDQUFDLGFBQWEsS0FBSyxhQUFhLEVBQUU7WUFDaEcsSUFBSSxDQUFDLFVBQVUsQ0FBQyxFQUFDLGFBQWEsRUFBQyxDQUFDLENBQUM7U0FDbEM7S0FDRjs7Ozs7SUFFRCxJQUFJLGNBQWMsQ0FBQyxjQUFzQjtRQUN2QyxjQUFjLEdBQUcsU0FBUyxDQUFDLGNBQWMsQ0FBQyxDQUFDO1FBQzNDLElBQUksU0FBUyxDQUFDLGNBQWMsQ0FBQyxJQUFJLGNBQWMsSUFBSSxDQUFDLElBQUksSUFBSSxDQUFDLE1BQU0sQ0FBQyxjQUFjLEtBQUssY0FBYyxFQUFFO1lBQ3JHLElBQUksQ0FBQyxVQUFVLENBQUMsRUFBQyxjQUFjLEVBQUMsQ0FBQyxDQUFDO1NBQ25DO0tBQ0Y7Ozs7O0lBRUQsSUFBSSxZQUFZLENBQUMsWUFBcUI7UUFDcEMsSUFBSSxJQUFJLENBQUMsTUFBTSxDQUFDLFlBQVksS0FBSyxZQUFZLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLFFBQVEsRUFBRTtZQUN0RSxJQUFJLENBQUMsVUFBVSxDQUFDLEVBQUMsWUFBWSxFQUFDLENBQUMsQ0FBQztTQUNqQztLQUNGOzs7OztJQUVELElBQUksT0FBTyxDQUFDLElBQWE7O1FBQ3ZCLE1BQU0sT0FBTyxHQUFHLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxDQUFDO1FBQzdDLElBQUksYUFBYSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsT0FBTyxFQUFFLE9BQU8sQ0FBQyxFQUFFO1lBQy9DLElBQUksQ0FBQyxVQUFVLENBQUMsRUFBQyxPQUFPLEVBQUMsQ0FBQyxDQUFDO1NBQzVCO0tBQ0Y7Ozs7O0lBRUQsSUFBSSxZQUFZLENBQUMsWUFBNkI7UUFDNUMsSUFBSSxJQUFJLENBQUMsTUFBTSxDQUFDLFlBQVksS0FBSyxZQUFZLEVBQUU7WUFDN0MsSUFBSSxDQUFDLFVBQVUsQ0FBQyxFQUFDLFlBQVksRUFBQyxDQUFDLENBQUM7U0FDakM7S0FDRjs7Ozs7SUFFRCxJQUFJLE9BQU8sQ0FBQyxJQUFhOztRQUN2QixNQUFNLE9BQU8sR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsQ0FBQztRQUM3QyxJQUFJLGFBQWEsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLE9BQU8sRUFBRSxPQUFPLENBQUMsRUFBRTtZQUMvQyxJQUFJLENBQUMsVUFBVSxDQUFDLEVBQUMsT0FBTyxFQUFDLENBQUMsQ0FBQztTQUM1QjtLQUNGOzs7OztJQUVELElBQUksVUFBVSxDQUFDLFVBQXdDO1FBQ3JELElBQUksSUFBSSxDQUFDLE1BQU0sQ0FBQyxVQUFVLEtBQUssVUFBVSxFQUFFO1lBQ3pDLElBQUksQ0FBQyxVQUFVLENBQUMsRUFBQyxVQUFVLEVBQUMsQ0FBQyxDQUFDO1NBQy9CO0tBQ0Y7Ozs7O0lBRUQsSUFBSSxXQUFXLENBQUMsV0FBK0M7UUFDN0QsSUFBSSxJQUFJLENBQUMsTUFBTSxDQUFDLFdBQVcsS0FBSyxXQUFXLEVBQUU7WUFDM0MsSUFBSSxDQUFDLFVBQVUsQ0FBQyxFQUFDLFdBQVcsRUFBQyxDQUFDLENBQUM7U0FDaEM7S0FDRjs7Ozs7SUFJRCxLQUFLLENBQUMsSUFBYTtRQUNqQixJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxRQUFRLElBQUksSUFBSSxDQUFDLFNBQVMsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLElBQUksYUFBYSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsU0FBUyxFQUFFLElBQUksQ0FBQyxFQUFFO1lBQ3ZHLElBQUksQ0FBQyxVQUFVLENBQUMsRUFBQyxTQUFTLEVBQUUsSUFBSSxFQUFDLENBQUMsQ0FBQztTQUNwQztLQUNGOzs7Ozs7SUFFRCxTQUFTLENBQUMsTUFBa0IsRUFBRSxNQUFlO1FBQzNDLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxTQUFTLEVBQUUsTUFBTSxFQUFFLE1BQU0sQ0FBQyxDQUFDLENBQUM7S0FDM0U7Ozs7SUFFRCxXQUFXO1FBQ1QsSUFBSSxnQkFBZ0IsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLFNBQVMsRUFBRSxJQUFJLENBQUMsTUFBTSxDQUFDLEVBQUU7WUFDeEQsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLFNBQVMsRUFBRSxFQUFDLFNBQVMsRUFBRSxJQUFJLEVBQUMsQ0FBQyxDQUFDO1NBQ3ZEO0tBQ0Y7Ozs7O0lBRUQsSUFBSSxDQUFDLElBQWE7O1FBQ2hCLE1BQU0sU0FBUyxHQUFHLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxTQUFTLENBQUMsUUFBUSxFQUFFLENBQUMsQ0FBQztRQUNwRSxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxRQUFRLEVBQUU7WUFDekIsSUFBSSxDQUFDLFVBQVUsQ0FBQyxFQUFDLFNBQVMsRUFBQyxDQUFDLENBQUM7U0FDOUI7S0FDRjs7Ozs7O0lBRUQsTUFBTSxDQUFDLElBQWEsRUFBRSxVQUFpQyxFQUFFOztRQUN2RCxNQUFNLFlBQVksR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsQ0FBQztRQUNsRCxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxRQUFRLEVBQUU7WUFDekIsSUFBSSxhQUFhLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxZQUFZLEVBQUUsWUFBWSxDQUFDLEVBQUU7Z0JBQ3pELElBQUksQ0FBQyxVQUFVLENBQUMsRUFBQyxZQUFZLEVBQUMsQ0FBQyxDQUFDO2FBQ2pDO1lBRUQsSUFBSSxPQUFPLENBQUMsU0FBUyxJQUFJLGdCQUFnQixDQUFDLFlBQVksRUFBRSxJQUFJLENBQUMsTUFBTSxDQUFDLEVBQUU7Z0JBQ3BFLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxDQUFDO2FBQ2xDO1NBQ0Y7S0FDRjs7Ozs7O0lBRUQsV0FBVyxDQUFDLElBQW1CLEVBQUUsWUFBc0I7O1FBQ3JELE1BQU0sT0FBTyxHQUFHLE9BQU8sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDbkMsSUFBSSxZQUFZLEtBQUssU0FBUyxFQUFFO1lBQzlCLFlBQVksR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLFFBQVEsRUFBRSxDQUFDO1NBQzFDO1FBQ0QsT0FBTyxJQUFJLENBQUMsU0FBUyxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsR0FBRyxPQUFPLEdBQUcsWUFBWSxDQUFDO0tBQ2pFOzs7OztJQUVPLFVBQVUsQ0FBQyxLQUFtQzs7UUFDcEQsTUFBTSxRQUFRLEdBQUcsSUFBSSxDQUFDLFlBQVksQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUMxQyxJQUFJLENBQUMsY0FBYyxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBQzlCLElBQUksQ0FBQyxNQUFNLEdBQUcsUUFBUSxDQUFDO1FBQ3ZCLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQzs7Ozs7O0lBR3pCLGNBQWMsQ0FBQyxLQUEwQjtRQUMvQyxNQUFNLEVBQUMsTUFBTSxFQUFFLGFBQWEsRUFBRSxZQUFZLEVBQUUsU0FBUyxFQUFFLFlBQVksRUFBRSxRQUFRLEVBQUUsV0FBVyxFQUFDLEdBQUcsS0FBSyxDQUFDO1FBQ3BHLEtBQUssQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLEtBQUs7WUFDeEIsS0FBSyxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsSUFBSTtnQkFDdEIsSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsR0FBRzs7b0JBR25CLElBQUksU0FBUyxFQUFFO3dCQUNiLEdBQUcsQ0FBQyxPQUFPLENBQUMsT0FBTyxHQUFHLFNBQVMsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxJQUFJLFlBQVksQ0FBQztxQkFDbEU7O29CQUdELEdBQUcsQ0FBQyxRQUFRLEdBQUcsQ0FBQyxRQUFRLElBQUksR0FBRyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsU0FBUyxDQUFDLElBQUksU0FBUyxDQUFDLEtBQUssS0FBSyxLQUFLLENBQUMsTUFBTSxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQzs7b0JBR3BHLElBQUksUUFBUSxLQUFLLElBQUksRUFBRTt3QkFDckIsR0FBRyxDQUFDLE9BQU8sQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDO3FCQUM3Qjs7b0JBR0QsSUFBSSxZQUFZLEtBQUssU0FBUyxFQUFFO3dCQUM5QixHQUFHLENBQUMsT0FBTyxDQUFDLFFBQVEsR0FBRyxZQUFZLEtBQUssSUFBSSxJQUFJLFlBQVksQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDO3FCQUMvRTs7b0JBR0QsSUFBSSxLQUFLLENBQUMsTUFBTSxLQUFLLEdBQUcsQ0FBQyxJQUFJLENBQUMsS0FBSyxFQUFFO3dCQUNuQyxHQUFHLENBQUMsTUFBTSxHQUFHLFdBQVcsS0FBSyxRQUFRLElBQUksV0FBVyxLQUFLLFdBQVc7NkJBQy9ELGFBQWEsR0FBRyxDQUFDLElBQUksR0FBRyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQztnQ0FDeEQsR0FBRyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLGFBQWEsR0FBRyxDQUFDLENBQUMsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDO3FCQUMzRDtpQkFDRixDQUFDLENBQUM7YUFDSixDQUFDLENBQUM7U0FDSixDQUFDLENBQUM7Ozs7OztJQUdHLFlBQVksQ0FBQyxLQUFtQzs7UUFFdEQsTUFBTSxLQUFLLEdBQUcsTUFBTSxDQUFDLE1BQU0sQ0FBQyxFQUFFLEVBQUUsSUFBSSxDQUFDLE1BQU0sRUFBRSxLQUFLLENBQUMsQ0FBQzs7UUFFcEQsSUFBSSxTQUFTLEdBQUcsS0FBSyxDQUFDLFNBQVMsQ0FBQzs7UUFHaEMsSUFBSSxTQUFTLElBQUksS0FBSyxJQUFJLFNBQVMsSUFBSSxLQUFLLEVBQUU7WUFDNUMsaUJBQWlCLENBQUMsS0FBSyxDQUFDLE9BQU8sRUFBRSxLQUFLLENBQUMsT0FBTyxDQUFDLENBQUM7WUFDaEQsS0FBSyxDQUFDLFNBQVMsR0FBRyxnQkFBZ0IsQ0FBQyxLQUFLLENBQUMsU0FBUyxFQUFFLEtBQUssQ0FBQyxPQUFPLEVBQUUsS0FBSyxDQUFDLE9BQU8sQ0FBQyxDQUFDO1lBQ2xGLEtBQUssQ0FBQyxTQUFTLEdBQUcsZ0JBQWdCLENBQUMsS0FBSyxDQUFDLFNBQVMsRUFBRSxLQUFLLENBQUMsT0FBTyxFQUFFLEtBQUssQ0FBQyxPQUFPLENBQUMsQ0FBQztZQUNsRixTQUFTLEdBQUcsS0FBSyxDQUFDLFNBQVMsQ0FBQztTQUM3Qjs7UUFHRCxJQUFJLFVBQVUsSUFBSSxLQUFLLEVBQUU7WUFDdkIsS0FBSyxDQUFDLFlBQVksR0FBRyxLQUFLLENBQUM7U0FDNUI7O1FBR0QsSUFBSSxjQUFjLElBQUksS0FBSyxJQUFJLElBQUksQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLE1BQU0sS0FBSyxDQUFDLEVBQUU7WUFDOUQsU0FBUyxHQUFHLEtBQUssQ0FBQyxZQUFZLENBQUM7U0FDaEM7O1FBR0QsSUFBSSxXQUFXLElBQUksS0FBSyxFQUFFO1lBQ3hCLEtBQUssQ0FBQyxTQUFTLEdBQUcsZ0JBQWdCLENBQUMsS0FBSyxDQUFDLFNBQVMsRUFBRSxLQUFLLENBQUMsT0FBTyxFQUFFLEtBQUssQ0FBQyxPQUFPLENBQUMsQ0FBQztZQUNsRixTQUFTLEdBQUcsS0FBSyxDQUFDLFNBQVMsQ0FBQzs7WUFHNUIsSUFBSSxLQUFLLENBQUMsTUFBTSxDQUFDLE1BQU0sS0FBSyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsU0FBUyxDQUFDO2dCQUNyRSxDQUFDLEtBQUssQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsRUFBRTtnQkFDMUMsT0FBTyxLQUFLLENBQUM7YUFDZDtTQUNGOztRQUdELElBQUksV0FBVyxJQUFJLEtBQUssRUFBRTtZQUN4QixLQUFLLENBQUMsU0FBUyxHQUFHLGdCQUFnQixDQUFDLEtBQUssQ0FBQyxTQUFTLEVBQUUsS0FBSyxDQUFDLE9BQU8sRUFBRSxLQUFLLENBQUMsT0FBTyxDQUFDLENBQUM7WUFDbEYsU0FBUyxHQUFHLEtBQUssQ0FBQyxTQUFTLENBQUM7U0FDN0I7O1FBR0QsSUFBSSxTQUFTLEVBQUU7O1lBQ2IsTUFBTSxZQUFZLEdBQUcsZ0JBQWdCLElBQUksS0FBSyxJQUFJLGNBQWMsSUFBSSxLQUFLLElBQUksU0FBUyxJQUFJLEtBQUs7Z0JBQzNGLFNBQVMsSUFBSSxLQUFLLElBQUksVUFBVSxJQUFJLEtBQUssSUFBSSxhQUFhLElBQUksS0FBSyxDQUFDOztZQUV4RSxNQUFNLE1BQU0sR0FBRyxXQUFXLENBQUMsSUFBSSxDQUFDLFNBQVMsRUFBRSxTQUFTLEVBQUUsS0FBSyxFQUFFLElBQUksQ0FBQyxLQUFLLEVBQUUsWUFBWSxDQUFDLENBQUM7O1lBR3ZGLEtBQUssQ0FBQyxNQUFNLEdBQUcsTUFBTSxDQUFDO1lBQ3RCLEtBQUssQ0FBQyxTQUFTLEdBQUcsTUFBTSxDQUFDLE1BQU0sR0FBRyxDQUFDLEdBQUcsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLFNBQVMsR0FBRyxTQUFTLENBQUM7WUFDdEUsS0FBSyxDQUFDLFFBQVEsR0FBRyxNQUFNLENBQUMsTUFBTSxHQUFHLENBQUMsR0FBRyxNQUFNLENBQUMsTUFBTSxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUMsQ0FBQyxRQUFRLEdBQUcsU0FBUyxDQUFDOztZQUdwRixJQUFJLGNBQWMsSUFBSSxLQUFLLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxLQUFLLENBQUMsWUFBWSxFQUFFLEtBQUssQ0FBQyxFQUFFO2dCQUMzRSxLQUFLLENBQUMsWUFBWSxHQUFHLElBQUksQ0FBQzthQUMzQjs7WUFHRCxJQUFJLFdBQVcsSUFBSSxLQUFLLEVBQUU7Z0JBQ3hCLElBQUksS0FBSyxDQUFDLFNBQVMsS0FBSyxTQUFTLElBQUksS0FBSyxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLFNBQVMsQ0FBQztvQkFDeEUsS0FBSyxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxFQUFFO29CQUN6QyxLQUFLLENBQUMsU0FBUyxHQUFHLFNBQVMsQ0FBQztpQkFDN0I7YUFDRjs7WUFHRCxNQUFNLFdBQVcsR0FBRyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsU0FBUyxJQUFJLElBQUksQ0FBQyxNQUFNLENBQUMsU0FBUyxDQUFDLElBQUksS0FBSyxLQUFLLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQzs7WUFDbEcsTUFBTSxZQUFZLEdBQUcsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLFNBQVMsSUFBSSxJQUFJLENBQUMsTUFBTSxDQUFDLFNBQVMsQ0FBQyxLQUFLLEtBQUssS0FBSyxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUM7WUFDckcsSUFBSSxLQUFLLENBQUMsVUFBVSxLQUFLLFFBQVEsRUFBRTs7Z0JBRWpDLElBQUksU0FBUyxJQUFJLEtBQUssSUFBSSxTQUFTLElBQUksS0FBSyxJQUFJLEtBQUssQ0FBQyxXQUFXLENBQUMsS0FBSyxDQUFDLE1BQU0sS0FBSyxDQUFDLElBQUksV0FBVyxFQUFFO29CQUNuRyxLQUFLLENBQUMsV0FBVyxDQUFDLEtBQUssR0FBRyxzQkFBc0IsQ0FBQyxLQUFLLENBQUMsU0FBUyxFQUFFLEtBQUssQ0FBQyxPQUFPLEVBQUUsS0FBSyxDQUFDLE9BQU8sQ0FBQyxDQUFDO2lCQUNqRzs7Z0JBR0QsSUFBSSxTQUFTLElBQUksS0FBSyxJQUFJLFNBQVMsSUFBSSxLQUFLLElBQUksS0FBSyxDQUFDLFdBQVcsQ0FBQyxNQUFNLENBQUMsTUFBTSxLQUFLLENBQUMsSUFBSSxXQUFXLEVBQUU7b0JBQ3BHLEtBQUssQ0FBQyxXQUFXLENBQUMsTUFBTTt3QkFDcEIsdUJBQXVCLENBQUMsSUFBSSxDQUFDLFNBQVMsRUFBRSxLQUFLLENBQUMsU0FBUyxFQUFFLEtBQUssQ0FBQyxPQUFPLEVBQUUsS0FBSyxDQUFDLE9BQU8sQ0FBQyxDQUFDO2lCQUM1RjthQUNGO2lCQUFNO2dCQUNMLEtBQUssQ0FBQyxXQUFXLEdBQUcsRUFBQyxLQUFLLEVBQUUsRUFBRSxFQUFFLE1BQU0sRUFBRSxFQUFFLEVBQUMsQ0FBQzthQUM3Qzs7WUFHRCxJQUFJLENBQUMsS0FBSyxDQUFDLFVBQVUsS0FBSyxRQUFRLElBQUksS0FBSyxDQUFDLFVBQVUsS0FBSyxRQUFRO2lCQUM5RCxZQUFZLElBQUksV0FBVyxJQUFJLFNBQVMsSUFBSSxLQUFLLElBQUksU0FBUyxJQUFJLEtBQUssSUFBSSxVQUFVLElBQUksS0FBSyxDQUFDLEVBQUU7Z0JBQ3BHLEtBQUssQ0FBQyxZQUFZLEdBQUcsS0FBSyxDQUFDLFFBQVEsSUFBSSxpQkFBaUIsQ0FBQyxJQUFJLENBQUMsU0FBUyxFQUFFLEtBQUssQ0FBQyxTQUFTLEVBQUUsS0FBSyxDQUFDLE9BQU8sQ0FBQyxDQUFDO2dCQUN6RyxLQUFLLENBQUMsWUFBWSxHQUFHLEtBQUssQ0FBQyxRQUFRLElBQUksaUJBQWlCLENBQUMsSUFBSSxDQUFDLFNBQVMsRUFBRSxLQUFLLENBQUMsUUFBUSxFQUFFLEtBQUssQ0FBQyxPQUFPLENBQUMsQ0FBQzthQUN6RztTQUNGO1FBRUQsT0FBTyxLQUFLLENBQUM7Ozs7WUF2UWhCLFVBQVU7Ozs7WUF0QkgsV0FBVztZQW9CWCxpQkFBaUI7Ozs7Ozs7OztJQ25CdkIsTUFBTztJQUNQLFNBQVU7SUFDVixVQUFXO0lBQ1gsU0FBVTtJQUNWLFVBQVc7SUFDWCxZQUFhO0lBQ2IsT0FBUTtJQUNSLFFBQVM7SUFDVCxhQUFjO0lBQ2QsV0FBWTtJQUNaLGNBQWU7SUFDZixhQUFjOztRQVhkLEdBQUc7UUFDSCxLQUFLO1FBQ0wsTUFBTTtRQUNOLEtBQUs7UUFDTCxNQUFNO1FBQ04sUUFBUTtRQUNSLEdBQUc7UUFDSCxJQUFJO1FBQ0osU0FBUztRQUNULE9BQU87UUFDUCxVQUFVO1FBQ1YsU0FBUzs7Ozs7O0FDWlg7Ozs7O0lBY0UsWUFBb0IsUUFBOEIsRUFBVSxTQUFzQjtRQUE5RCxhQUFRLEdBQVIsUUFBUSxDQUFzQjtRQUFVLGNBQVMsR0FBVCxTQUFTLENBQWE7UUFDaEYsUUFBUSxDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUMsS0FBSztZQUM3QixJQUFJLENBQUMsUUFBUSxHQUFHLEtBQUssQ0FBQyxPQUFPLENBQUM7WUFDOUIsSUFBSSxDQUFDLFFBQVEsR0FBRyxLQUFLLENBQUMsT0FBTyxDQUFDO1lBQzlCLElBQUksQ0FBQyxjQUFjLEdBQUcsS0FBSyxDQUFDLFNBQVMsQ0FBQztZQUN0QyxJQUFJLENBQUMsYUFBYSxHQUFHLEtBQUssQ0FBQyxRQUFRLENBQUM7U0FDckMsQ0FBQyxDQUFDO0tBQ0o7Ozs7O0lBRUQsVUFBVSxDQUFDLEtBQW9CO1FBQzdCLElBQUksR0FBRyxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBRTtZQUM5QixRQUFRLEtBQUssQ0FBQyxLQUFLO2dCQUNqQixLQUFLLEdBQUcsQ0FBQyxNQUFNO29CQUNiLElBQUksQ0FBQyxRQUFRLENBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQyxRQUFRLEdBQUcsR0FBRyxHQUFHLEdBQUcsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDO29CQUN4RCxNQUFNO2dCQUNSLEtBQUssR0FBRyxDQUFDLFFBQVE7b0JBQ2YsSUFBSSxDQUFDLFFBQVEsQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDLFFBQVEsR0FBRyxHQUFHLEdBQUcsR0FBRyxFQUFFLENBQUMsQ0FBQyxDQUFDO29CQUN2RCxNQUFNO2dCQUNSLEtBQUssR0FBRyxDQUFDLEdBQUc7b0JBQ1YsSUFBSSxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQyxhQUFhLENBQUMsQ0FBQztvQkFDekUsTUFBTTtnQkFDUixLQUFLLEdBQUcsQ0FBQyxJQUFJO29CQUNYLElBQUksQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUMsY0FBYyxDQUFDLENBQUM7b0JBQzFFLE1BQU07Z0JBQ1IsS0FBSyxHQUFHLENBQUMsU0FBUztvQkFDaEIsSUFBSSxDQUFDLFFBQVEsQ0FBQyxTQUFTLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUM7b0JBQ2pDLE1BQU07Z0JBQ1IsS0FBSyxHQUFHLENBQUMsT0FBTztvQkFDZCxJQUFJLENBQUMsUUFBUSxDQUFDLFNBQVMsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLGNBQWMsRUFBRSxDQUFDLENBQUM7b0JBQy9ELE1BQU07Z0JBQ1IsS0FBSyxHQUFHLENBQUMsVUFBVTtvQkFDakIsSUFBSSxDQUFDLFFBQVEsQ0FBQyxTQUFTLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQyxDQUFDO29CQUNoQyxNQUFNO2dCQUNSLEtBQUssR0FBRyxDQUFDLFNBQVM7b0JBQ2hCLElBQUksQ0FBQyxRQUFRLENBQUMsU0FBUyxDQUFDLEdBQUcsRUFBRSxJQUFJLENBQUMsU0FBUyxDQUFDLGNBQWMsRUFBRSxDQUFDLENBQUM7b0JBQzlELE1BQU07Z0JBQ1IsS0FBSyxHQUFHLENBQUMsS0FBSyxDQUFDO2dCQUNmLEtBQUssR0FBRyxDQUFDLEtBQUs7b0JBQ1osSUFBSSxDQUFDLFFBQVEsQ0FBQyxXQUFXLEVBQUUsQ0FBQztvQkFDNUIsTUFBTTtnQkFDUjtvQkFDRSxPQUFPO2FBQ1Y7WUFFRCxLQUFLLENBQUMsY0FBYyxFQUFFLENBQUM7WUFDdkIsS0FBSyxDQUFDLGVBQWUsRUFBRSxDQUFDO1NBQ3pCO0tBQ0Y7OztZQXRERixVQUFVOzs7O1lBTkgsb0JBQW9CO1lBQ3BCLFdBQVc7Ozs7Ozs7OztJQ3FEakIsT0FBSTtJQUNKLE9BQUk7O2dDQURKLElBQUk7Z0NBQ0osSUFBSTs7Ozs7O0FDeEROOzs7OztBQVVBOzs2QkFFa0IsQ0FBQzs4QkFDQSxDQUFDOzBCQUl5QixRQUFROzJCQUNELFNBQVM7NEJBQzVDLElBQUk7K0JBQ0QsS0FBSzs7OztZQVh4QixVQUFVLFNBQUMsRUFBQyxVQUFVLEVBQUUsTUFBTSxFQUFDOzs7Ozs7OztBQ1RoQzs7O0FBR0E7SUFDRSxPQUFPLElBQUksb0JBQW9CLEVBQUUsQ0FBQztDQUNuQzs7Ozs7Ozs7O0FBU0Q7OztZQURDLFVBQVUsU0FBQyxFQUFDLFVBQVUsRUFBRSxNQUFNLEVBQUUsVUFBVSxFQUFFLG1DQUFtQyxFQUFDOzs7MEJBZS9DLFNBQVEsY0FBNkI7Ozs7OztJQUlyRSxTQUFTLENBQUMsSUFBbUI7UUFDM0IsT0FBTyxDQUFDLElBQUksSUFBSSxJQUFJLENBQUMsSUFBSSxJQUFJLElBQUksQ0FBQyxLQUFLLElBQUksSUFBSSxDQUFDLEdBQUcsSUFBSSxFQUFDLElBQUksRUFBRSxJQUFJLENBQUMsSUFBSSxFQUFFLEtBQUssRUFBRSxJQUFJLENBQUMsS0FBSyxFQUFFLEdBQUcsRUFBRSxJQUFJLENBQUMsR0FBRyxFQUFDLEdBQUcsSUFBSSxDQUFDO0tBQ25IOzs7Ozs7SUFLRCxPQUFPLENBQUMsSUFBbUI7UUFDekIsT0FBTyxDQUFDLElBQUksSUFBSSxJQUFJLENBQUMsSUFBSSxJQUFJLElBQUksQ0FBQyxLQUFLLElBQUksSUFBSSxDQUFDLEdBQUcsSUFBSSxFQUFDLElBQUksRUFBRSxJQUFJLENBQUMsSUFBSSxFQUFFLEtBQUssRUFBRSxJQUFJLENBQUMsS0FBSyxFQUFFLEdBQUcsRUFBRSxJQUFJLENBQUMsR0FBRyxFQUFDLEdBQUcsSUFBSSxDQUFDO0tBQ25IOzs7WUFkRixVQUFVOzs7Ozs7O0FDMUJYO0FBOEJBLE1BQU0sNkJBQTZCLEdBQUc7SUFDcEMsT0FBTyxFQUFFLGlCQUFpQjtJQUMxQixXQUFXLEVBQUUsVUFBVSxDQUFDLE1BQU0sYUFBYSxDQUFDO0lBQzVDLEtBQUssRUFBRSxJQUFJO0NBQ1osQ0FBQzs7OztBQWdIRjs7Ozs7Ozs7Ozs7O0lBa0ZFLFlBQ1ksZ0JBQW1ELFFBQThCLEVBQ2pGLFdBQStCLElBQXVCLEVBQUUsTUFBMkIsRUFDbkYsS0FBZ0MsV0FBb0MsRUFDcEUsaUJBQThDLE9BQWU7UUFIN0QsbUJBQWMsR0FBZCxjQUFjO1FBQXFDLGFBQVEsR0FBUixRQUFRLENBQXNCO1FBQ2pGLGNBQVMsR0FBVCxTQUFTO1FBQXNCLFNBQUksR0FBSixJQUFJLENBQW1CO1FBQ3RELFFBQUcsR0FBSCxHQUFHO1FBQTZCLGdCQUFXLEdBQVgsV0FBVyxDQUF5QjtRQUNwRSxvQkFBZSxHQUFmLGVBQWU7UUFBK0IsWUFBTyxHQUFQLE9BQU8sQ0FBUTs7Ozs7d0JBZnBELElBQUksWUFBWSxFQUE4Qjs7Ozs7c0JBTWhELElBQUksWUFBWSxFQUFXO3dCQUVuQyxDQUFDLENBQU0sUUFBTzt5QkFDYixTQUFRO1FBT2xCLENBQUMsYUFBYSxFQUFFLGVBQWUsRUFBRSxnQkFBZ0IsRUFBRSxjQUFjLEVBQUUsU0FBUyxFQUFFLFNBQVMsRUFBRSxZQUFZO1lBQ3BHLGFBQWEsRUFBRSxjQUFjLEVBQUUsaUJBQWlCLEVBQUUsV0FBVyxDQUFDO2FBQzFELE9BQU8sQ0FBQyxLQUFLLElBQUksSUFBSSxDQUFDLEtBQUssQ0FBQyxHQUFHLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO1FBRW5ELElBQUksQ0FBQyxtQkFBbUIsR0FBRyxRQUFRLENBQUMsT0FBTyxDQUFDLFNBQVMsQ0FBQyxJQUFJLE1BQU0sSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUM7UUFFM0YsSUFBSSxDQUFDLGFBQWEsR0FBRyxRQUFRLENBQUMsTUFBTSxDQUFDLFNBQVMsQ0FBQyxLQUFLOztZQUNsRCxNQUFNLE9BQU8sR0FBRyxLQUFLLENBQUMsU0FBUyxDQUFDOztZQUNoQyxNQUFNLE9BQU8sR0FBRyxJQUFJLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQzs7WUFDekQsTUFBTSxlQUFlLEdBQUcsS0FBSyxDQUFDLFlBQVksQ0FBQzs7WUFDM0MsTUFBTSxlQUFlLEdBQUcsSUFBSSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLFlBQVksR0FBRyxJQUFJLENBQUM7O1lBQ3BFLE1BQU0sY0FBYyxHQUFHLEtBQUssQ0FBQyxTQUFTLENBQUM7O1lBQ3ZDLE1BQU0sY0FBYyxHQUFHLElBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDO1lBRWhFLElBQUksQ0FBQyxLQUFLLEdBQUcsS0FBSyxDQUFDOztZQUduQixJQUFJLGFBQWEsQ0FBQyxlQUFlLEVBQUUsZUFBZSxDQUFDLEVBQUU7Z0JBQ25ELElBQUksQ0FBQyxTQUFTLEVBQUUsQ0FBQztnQkFDakIsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsZUFBZSxDQUFDLE9BQU8sQ0FBQyxlQUFlLENBQUMsQ0FBQyxDQUFDO2FBQzlEOztZQUdELElBQUksYUFBYSxDQUFDLGNBQWMsRUFBRSxjQUFjLENBQUMsSUFBSSxjQUFjLElBQUksS0FBSyxDQUFDLFlBQVksRUFBRTtnQkFDekYsSUFBSSxDQUFDLEtBQUssRUFBRSxDQUFDO2FBQ2Q7O1lBR0QsSUFBSSxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLEVBQUU7Z0JBQzVCLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDO29CQUNqQixPQUFPLEVBQUUsT0FBTyxHQUFHLEVBQUMsSUFBSSxFQUFFLE9BQU8sQ0FBQyxJQUFJLEVBQUUsS0FBSyxFQUFFLE9BQU8sQ0FBQyxLQUFLLEVBQUMsR0FBRyxJQUFJO29CQUNwRSxJQUFJLEVBQUUsRUFBQyxJQUFJLEVBQUUsT0FBTyxDQUFDLElBQUksRUFBRSxLQUFLLEVBQUUsT0FBTyxDQUFDLEtBQUssRUFBQztpQkFDakQsQ0FBQyxDQUFDO2FBQ0o7WUFDRCxHQUFHLENBQUMsWUFBWSxFQUFFLENBQUM7U0FDcEIsQ0FBQyxDQUFDO0tBQ0o7Ozs7O0lBS0QsS0FBSztRQUNILElBQUksQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLFlBQVksRUFBRSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUM7O1lBQzNELE1BQU0sY0FBYyxHQUNoQixJQUFJLENBQUMsV0FBVyxDQUFDLGFBQWEsQ0FBQyxhQUFhLENBQWlCLDhCQUE4QixDQUFDLENBQUM7WUFDakcsSUFBSSxjQUFjLEVBQUU7Z0JBQ2xCLGNBQWMsQ0FBQyxLQUFLLEVBQUUsQ0FBQzthQUN4QjtTQUNGLENBQUMsQ0FBQztLQUNKOzs7Ozs7Ozs7SUFRRCxVQUFVLENBQUMsSUFBb0M7UUFDN0MsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxJQUFJLHFCQUFPLElBQUksSUFBRSxHQUFHLEVBQUUsQ0FBQyxNQUFJLElBQUksQ0FBQyxDQUFDLENBQUM7S0FDbkU7Ozs7SUFFRCxXQUFXO1FBQ1QsSUFBSSxDQUFDLGFBQWEsQ0FBQyxXQUFXLEVBQUUsQ0FBQztRQUNqQyxJQUFJLENBQUMsbUJBQW1CLENBQUMsV0FBVyxFQUFFLENBQUM7S0FDeEM7Ozs7SUFFRCxRQUFRO1FBQ04sSUFBSSxJQUFJLENBQUMsS0FBSyxLQUFLLFNBQVMsRUFBRTtZQUM1QixDQUFDLGVBQWUsRUFBRSxjQUFjLEVBQUUsZ0JBQWdCLEVBQUUsWUFBWSxFQUFFLFNBQVMsRUFBRSxTQUFTLEVBQUUsYUFBYSxDQUFDLENBQUMsT0FBTyxDQUMxRyxLQUFLLElBQUksSUFBSSxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQztZQUNqRCxJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQztTQUNqQztLQUNGOzs7OztJQUVELFdBQVcsQ0FBQyxPQUFzQjtRQUNoQyxDQUFDLGVBQWUsRUFBRSxjQUFjLEVBQUUsZ0JBQWdCLEVBQUUsWUFBWSxFQUFFLFNBQVMsRUFBRSxTQUFTLEVBQUUsYUFBYSxDQUFDO2FBQ2pHLE1BQU0sQ0FBQyxLQUFLLElBQUksS0FBSyxJQUFJLE9BQU8sQ0FBQzthQUNqQyxPQUFPLENBQUMsS0FBSyxJQUFJLElBQUksQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7UUFFMUQsSUFBSSxXQUFXLElBQUksT0FBTyxFQUFFO1lBQzFCLElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDO1NBQ2pDO0tBQ0Y7Ozs7O0lBRUQsWUFBWSxDQUFDLElBQWE7UUFDeEIsSUFBSSxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDMUIsSUFBSSxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsSUFBSSxFQUFFLEVBQUMsU0FBUyxFQUFFLElBQUksRUFBQyxDQUFDLENBQUM7S0FDL0M7Ozs7O0lBRUQsU0FBUyxDQUFDLEtBQW9CLElBQUksSUFBSSxDQUFDLGNBQWMsQ0FBQyxVQUFVLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBRTs7Ozs7SUFFMUUsb0JBQW9CLENBQUMsSUFBYSxJQUFJLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLEVBQUU7Ozs7O0lBRWpFLGVBQWUsQ0FBQyxLQUFzQjtRQUNwQyxRQUFRLEtBQUs7WUFDWCxLQUFLLGVBQWUsQ0FBQyxJQUFJO2dCQUN2QixJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLFNBQVMsRUFBRSxHQUFHLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDekUsTUFBTTtZQUNSLEtBQUssZUFBZSxDQUFDLElBQUk7Z0JBQ3ZCLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsU0FBUyxFQUFFLEdBQUcsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUN6RSxNQUFNO1NBQ1Q7S0FDRjs7Ozs7SUFFRCxnQkFBZ0IsQ0FBQyxFQUF1QixJQUFVLElBQUksQ0FBQyxRQUFRLEdBQUcsRUFBRSxDQUFDLEVBQUU7Ozs7O0lBRXZFLGlCQUFpQixDQUFDLEVBQWEsSUFBVSxJQUFJLENBQUMsU0FBUyxHQUFHLEVBQUUsQ0FBQyxFQUFFOzs7OztJQUUvRCxnQkFBZ0IsQ0FBQyxVQUFtQixJQUFJLElBQUksQ0FBQyxRQUFRLENBQUMsUUFBUSxHQUFHLFVBQVUsQ0FBQyxFQUFFOzs7OztJQUU5RSxTQUFTLENBQUMsWUFBcUIsSUFBSSxJQUFJLENBQUMsUUFBUSxDQUFDLFlBQVksR0FBRyxZQUFZLENBQUMsRUFBRTs7Ozs7SUFFL0UsVUFBVSxDQUFDLEtBQUssSUFBSSxJQUFJLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxlQUFlLENBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFOzs7WUFuU2pHLFNBQVMsU0FBQztnQkFDVCxRQUFRLEVBQUUsZUFBZTtnQkFDekIsUUFBUSxFQUFFLGdCQUFnQjtnQkFDMUIsZUFBZSxFQUFFLHVCQUF1QixDQUFDLE1BQU07Z0JBQy9DLE1BQU0sRUFBRSxDQUFDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0EwQ1IsQ0FBQztnQkFDRixRQUFRLEVBQUU7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQTBDVDtnQkFDRCxTQUFTLEVBQUUsQ0FBQyw2QkFBNkIsRUFBRSxvQkFBb0IsRUFBRSwwQkFBMEIsQ0FBQzthQUM3Rjs7OztZQTVITywwQkFBMEI7WUFEMUIsb0JBQW9CO1lBRnBCLFdBQVc7WUFTWCxpQkFBaUI7WUFIakIsbUJBQW1CO1lBckJ6QixpQkFBaUI7WUFXakIsVUFBVTtZQVdKLGNBQWM7WUFWcEIsTUFBTTs7OzBCQTRJTCxLQUFLOzRCQUtMLEtBQUs7NkJBS0wsS0FBSzsyQkFNTCxLQUFLO3NCQUtMLEtBQUs7c0JBS0wsS0FBSzt5QkFNTCxLQUFLOzBCQU1MLEtBQUs7MkJBS0wsS0FBSzs4QkFLTCxLQUFLO3dCQVFMLEtBQUs7dUJBTUwsTUFBTTtxQkFNTixNQUFNOzs7Ozs7O0FDaE9UOzs7O0lBeUVFLFlBQW1CLElBQXVCO1FBQXZCLFNBQUksR0FBSixJQUFJLENBQW1CO3NCQUZ2QixJQUFJLFlBQVksRUFBVztLQUVBOzs7OztJQUU5QyxRQUFRLENBQUMsR0FBaUI7UUFDeEIsSUFBSSxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsUUFBUSxJQUFJLENBQUMsR0FBRyxDQUFDLE1BQU0sRUFBRTtZQUN4QyxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUM7U0FDNUI7S0FDRjs7O1lBekVGLFNBQVMsU0FBQztnQkFDVCxRQUFRLEVBQUUsMkJBQTJCO2dCQUNyQyxJQUFJLEVBQUUsRUFBQyxNQUFNLEVBQUUsTUFBTSxFQUFDO2dCQUN0QixNQUFNLEVBQUUsQ0FBQzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FnQ1IsQ0FBQztnQkFDRixRQUFRLEVBQUU7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQXFCVDthQUNGOzs7O1lBN0RPLGlCQUFpQjs7OzBCQStEdEIsS0FBSztvQkFDTCxLQUFLOzJCQUNMLEtBQUs7OEJBQ0wsS0FBSztxQkFFTCxNQUFNOzs7Ozs7O0FDdkVUOzs7O0lBcUhFLFlBQW1CLElBQXVCO1FBQXZCLFNBQUksR0FBSixJQUFJLENBQW1COzBCQWI3QixlQUFlO3NCQUlRLEVBQUU7d0JBTWpCLElBQUksWUFBWSxFQUFtQjtzQkFDckMsSUFBSSxZQUFZLEVBQVc7S0FFQTs7O1lBL0cvQyxTQUFTLFNBQUM7Z0JBQ1QsUUFBUSxFQUFFLDJCQUEyQjtnQkFDckMsZUFBZSxFQUFFLHVCQUF1QixDQUFDLE1BQU07Z0JBQy9DLE1BQU0sRUFBRSxDQUFDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBNkRSLENBQUM7Z0JBQ0YsUUFBUSxFQUFFOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7S0E4QlA7YUFDSjs7OztZQW5HTyxpQkFBaUI7OzttQkF1R3RCLEtBQUs7dUJBQ0wsS0FBSztxQkFDTCxLQUFLO3lCQUNMLEtBQUs7MkJBQ0wsS0FBSzsyQkFDTCxLQUFLOzBCQUNMLEtBQUs7dUJBRUwsTUFBTTtxQkFDTixNQUFNOzs7Ozs7O0FDbkhUOzs7QUFJQTtJQUNFLE9BQU8sSUFBSSx5QkFBeUIsRUFBRSxDQUFDO0NBQ3hDOzs7Ozs7O0FBUUQ7OztZQURDLFVBQVUsU0FBQyxFQUFDLFVBQVUsRUFBRSxNQUFNLEVBQUUsVUFBVSxFQUFFLHVDQUF1QyxFQUFDOzs7K0JBa0I5QyxTQUFRLHNCQUFzQjs7Ozs7SUFDbkUsS0FBSyxDQUFDLEtBQWE7UUFDakIsSUFBSSxLQUFLLEVBQUU7O1lBQ1QsTUFBTSxTQUFTLEdBQUcsS0FBSyxDQUFDLElBQUksRUFBRSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQztZQUMxQyxJQUFJLFNBQVMsQ0FBQyxNQUFNLEtBQUssQ0FBQyxJQUFJLFFBQVEsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRTtnQkFDcEQsT0FBTyxFQUFDLElBQUksRUFBRSxTQUFTLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsS0FBSyxFQUFFLElBQUksRUFBRSxHQUFHLEVBQUUsSUFBSSxFQUFDLENBQUM7YUFDaEU7aUJBQU0sSUFBSSxTQUFTLENBQUMsTUFBTSxLQUFLLENBQUMsSUFBSSxRQUFRLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksUUFBUSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFO2dCQUNyRixPQUFPLEVBQUMsSUFBSSxFQUFFLFNBQVMsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxLQUFLLEVBQUUsU0FBUyxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLEdBQUcsRUFBRSxJQUFJLEVBQUMsQ0FBQzthQUNuRjtpQkFBTSxJQUFJLFNBQVMsQ0FBQyxNQUFNLEtBQUssQ0FBQyxJQUFJLFFBQVEsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxRQUFRLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksUUFBUSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFO2dCQUMvRyxPQUFPLEVBQUMsSUFBSSxFQUFFLFNBQVMsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxLQUFLLEVBQUUsU0FBUyxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLEdBQUcsRUFBRSxTQUFTLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUMsQ0FBQzthQUN0RztTQUNGO1FBQ0QsT0FBTyxJQUFJLENBQUM7S0FDYjs7Ozs7SUFFRCxNQUFNLENBQUMsSUFBbUI7UUFDeEIsT0FBTyxJQUFJO1lBQ1AsR0FBRyxJQUFJLENBQUMsSUFBSSxJQUFJLFFBQVEsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLEdBQUcsU0FBUyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsR0FBRyxFQUFFLElBQUksUUFBUSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsR0FBRyxTQUFTLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxHQUFHLEVBQUUsRUFBRTtZQUNwSCxFQUFFLENBQUM7S0FDUjs7O1lBcEJGLFVBQVU7Ozs7Ozs7QUM1Qlg7Ozs7O0lBQ1UsWUFBWSxDQUFDLE9BQW9CLElBQUksT0FBTyxNQUFNLENBQUMsZ0JBQWdCLENBQUMsT0FBTyxDQUFDLENBQUM7Ozs7OztJQUU3RSxRQUFRLENBQUMsT0FBb0IsRUFBRSxJQUFZLElBQVksT0FBTyxJQUFJLENBQUMsWUFBWSxDQUFDLE9BQU8sQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDOzs7OztJQUUvRixrQkFBa0IsQ0FBQyxPQUFvQjtRQUM3QyxPQUFPLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxPQUFPLEVBQUUsVUFBVSxDQUFDLElBQUksUUFBUSxNQUFNLFFBQVEsQ0FBQzs7Ozs7O0lBRy9ELFlBQVksQ0FBQyxPQUFvQjs7UUFDdkMsSUFBSSxjQUFjLHFCQUFnQixPQUFPLENBQUMsWUFBWSxLQUFJLFFBQVEsQ0FBQyxlQUFlLENBQUM7UUFFbkYsT0FBTyxjQUFjLElBQUksY0FBYyxLQUFLLFFBQVEsQ0FBQyxlQUFlLElBQUksSUFBSSxDQUFDLGtCQUFrQixDQUFDLGNBQWMsQ0FBQyxFQUFFO1lBQy9HLGNBQWMscUJBQWdCLGNBQWMsQ0FBQyxZQUFZLENBQUEsQ0FBQztTQUMzRDtRQUVELE9BQU8sY0FBYyxJQUFJLFFBQVEsQ0FBQyxlQUFlLENBQUM7Ozs7Ozs7SUFHcEQsUUFBUSxDQUFDLE9BQW9CLEVBQUUsS0FBSyxHQUFHLElBQUk7O1FBQ3pDLElBQUksVUFBVSxDQUFhOztRQUMzQixJQUFJLFlBQVksR0FBZSxFQUFDLEtBQUssRUFBRSxDQUFDLEVBQUUsTUFBTSxFQUFFLENBQUMsRUFBRSxHQUFHLEVBQUUsQ0FBQyxFQUFFLE1BQU0sRUFBRSxDQUFDLEVBQUUsSUFBSSxFQUFFLENBQUMsRUFBRSxLQUFLLEVBQUUsQ0FBQyxFQUFDLENBQUM7UUFFM0YsSUFBSSxJQUFJLENBQUMsUUFBUSxDQUFDLE9BQU8sRUFBRSxVQUFVLENBQUMsS0FBSyxPQUFPLEVBQUU7WUFDbEQsVUFBVSxHQUFHLE9BQU8sQ0FBQyxxQkFBcUIsRUFBRSxDQUFDO1NBQzlDO2FBQU07O1lBQ0wsTUFBTSxjQUFjLEdBQUcsSUFBSSxDQUFDLFlBQVksQ0FBQyxPQUFPLENBQUMsQ0FBQztZQUVsRCxVQUFVLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxPQUFPLEVBQUUsS0FBSyxDQUFDLENBQUM7WUFFekMsSUFBSSxjQUFjLEtBQUssUUFBUSxDQUFDLGVBQWUsRUFBRTtnQkFDL0MsWUFBWSxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsY0FBYyxFQUFFLEtBQUssQ0FBQyxDQUFDO2FBQ25EO1lBRUQsWUFBWSxDQUFDLEdBQUcsSUFBSSxjQUFjLENBQUMsU0FBUyxDQUFDO1lBQzdDLFlBQVksQ0FBQyxJQUFJLElBQUksY0FBYyxDQUFDLFVBQVUsQ0FBQztTQUNoRDtRQUVELFVBQVUsQ0FBQyxHQUFHLElBQUksWUFBWSxDQUFDLEdBQUcsQ0FBQztRQUNuQyxVQUFVLENBQUMsTUFBTSxJQUFJLFlBQVksQ0FBQyxHQUFHLENBQUM7UUFDdEMsVUFBVSxDQUFDLElBQUksSUFBSSxZQUFZLENBQUMsSUFBSSxDQUFDO1FBQ3JDLFVBQVUsQ0FBQyxLQUFLLElBQUksWUFBWSxDQUFDLElBQUksQ0FBQztRQUV0QyxJQUFJLEtBQUssRUFBRTtZQUNULFVBQVUsQ0FBQyxHQUFHLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxVQUFVLENBQUMsR0FBRyxDQUFDLENBQUM7WUFDNUMsVUFBVSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLFVBQVUsQ0FBQyxNQUFNLENBQUMsQ0FBQztZQUNsRCxVQUFVLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxDQUFDO1lBQzlDLFVBQVUsQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxVQUFVLENBQUMsS0FBSyxDQUFDLENBQUM7U0FDakQ7UUFFRCxPQUFPLFVBQVUsQ0FBQztLQUNuQjs7Ozs7O0lBRUQsTUFBTSxDQUFDLE9BQW9CLEVBQUUsS0FBSyxHQUFHLElBQUk7O1FBQ3ZDLE1BQU0sS0FBSyxHQUFHLE9BQU8sQ0FBQyxxQkFBcUIsRUFBRSxDQUFDOztRQUM5QyxNQUFNLGNBQWMsR0FBRztZQUNyQixHQUFHLEVBQUUsTUFBTSxDQUFDLFdBQVcsR0FBRyxRQUFRLENBQUMsZUFBZSxDQUFDLFNBQVM7WUFDNUQsSUFBSSxFQUFFLE1BQU0sQ0FBQyxXQUFXLEdBQUcsUUFBUSxDQUFDLGVBQWUsQ0FBQyxVQUFVO1NBQy9ELENBQUM7O1FBRUYsSUFBSSxRQUFRLEdBQUc7WUFDYixNQUFNLEVBQUUsS0FBSyxDQUFDLE1BQU0sSUFBSSxPQUFPLENBQUMsWUFBWTtZQUM1QyxLQUFLLEVBQUUsS0FBSyxDQUFDLEtBQUssSUFBSSxPQUFPLENBQUMsV0FBVztZQUN6QyxHQUFHLEVBQUUsS0FBSyxDQUFDLEdBQUcsR0FBRyxjQUFjLENBQUMsR0FBRztZQUNuQyxNQUFNLEVBQUUsS0FBSyxDQUFDLE1BQU0sR0FBRyxjQUFjLENBQUMsR0FBRztZQUN6QyxJQUFJLEVBQUUsS0FBSyxDQUFDLElBQUksR0FBRyxjQUFjLENBQUMsSUFBSTtZQUN0QyxLQUFLLEVBQUUsS0FBSyxDQUFDLEtBQUssR0FBRyxjQUFjLENBQUMsSUFBSTtTQUN6QyxDQUFDO1FBRUYsSUFBSSxLQUFLLEVBQUU7WUFDVCxRQUFRLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1lBQzlDLFFBQVEsQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLENBQUM7WUFDNUMsUUFBUSxDQUFDLEdBQUcsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsQ0FBQztZQUN4QyxRQUFRLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1lBQzlDLFFBQVEsQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLENBQUM7WUFDMUMsUUFBUSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsQ0FBQztTQUM3QztRQUVELE9BQU8sUUFBUSxDQUFDO0tBQ2pCOzs7Ozs7OztJQUVELGdCQUFnQixDQUFDLFdBQXdCLEVBQUUsYUFBMEIsRUFBRSxTQUFpQixFQUFFLFlBQXNCOztRQUU5RyxNQUFNLGNBQWMsR0FBRyxZQUFZLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxXQUFXLEVBQUUsS0FBSyxDQUFDLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxXQUFXLEVBQUUsS0FBSyxDQUFDLENBQUM7O1FBQzFHLE1BQU0sY0FBYyxHQUFHLElBQUksQ0FBQyxZQUFZLENBQUMsYUFBYSxDQUFDLENBQUM7O1FBQ3hELE1BQU0sV0FBVyxHQUFHLGFBQWEsQ0FBQyxxQkFBcUIsRUFBRSxDQUFDOztRQUMxRCxNQUFNLGdCQUFnQixHQUFHLFNBQVMsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksS0FBSyxDQUFDOztRQUMxRCxNQUFNLGtCQUFrQixHQUFHLFNBQVMsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksUUFBUSxDQUFDOztRQUUvRCxJQUFJLGdCQUFnQixHQUFlO1lBQ2pDLFFBQVEsRUFBRSxXQUFXLENBQUMsTUFBTSxJQUFJLGFBQWEsQ0FBQyxZQUFZO1lBQzFELE9BQU8sRUFBRSxXQUFXLENBQUMsS0FBSyxJQUFJLGFBQWEsQ0FBQyxXQUFXO1lBQ3ZELEtBQUssRUFBRSxDQUFDO1lBQ1IsUUFBUSxFQUFFLFdBQVcsQ0FBQyxNQUFNLElBQUksYUFBYSxDQUFDLFlBQVk7WUFDMUQsTUFBTSxFQUFFLENBQUM7WUFDVCxPQUFPLEVBQUUsV0FBVyxDQUFDLEtBQUssSUFBSSxhQUFhLENBQUMsV0FBVztTQUN4RCxDQUFDO1FBRUYsUUFBUSxnQkFBZ0I7WUFDdEIsS0FBSyxLQUFLO2dCQUNSLGdCQUFnQixDQUFDLEdBQUc7b0JBQ2hCLGNBQWMsQ0FBQyxHQUFHLElBQUksYUFBYSxDQUFDLFlBQVksR0FBRyxVQUFVLENBQUMsY0FBYyxDQUFDLFlBQVksQ0FBQyxDQUFDLENBQUM7Z0JBQ2hHLE1BQU07WUFDUixLQUFLLFFBQVE7Z0JBQ1gsZ0JBQWdCLENBQUMsR0FBRyxHQUFHLGNBQWMsQ0FBQyxHQUFHLEdBQUcsY0FBYyxDQUFDLE1BQU0sQ0FBQztnQkFDbEUsTUFBTTtZQUNSLEtBQUssTUFBTTtnQkFDVCxnQkFBZ0IsQ0FBQyxJQUFJO29CQUNqQixjQUFjLENBQUMsSUFBSSxJQUFJLGFBQWEsQ0FBQyxXQUFXLEdBQUcsVUFBVSxDQUFDLGNBQWMsQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDO2dCQUMvRixNQUFNO1lBQ1IsS0FBSyxPQUFPO2dCQUNWLGdCQUFnQixDQUFDLElBQUksR0FBRyxjQUFjLENBQUMsSUFBSSxHQUFHLGNBQWMsQ0FBQyxLQUFLLENBQUM7Z0JBQ25FLE1BQU07U0FDVDtRQUVELFFBQVEsa0JBQWtCO1lBQ3hCLEtBQUssS0FBSztnQkFDUixnQkFBZ0IsQ0FBQyxHQUFHLEdBQUcsY0FBYyxDQUFDLEdBQUcsQ0FBQztnQkFDMUMsTUFBTTtZQUNSLEtBQUssUUFBUTtnQkFDWCxnQkFBZ0IsQ0FBQyxHQUFHLEdBQUcsY0FBYyxDQUFDLEdBQUcsR0FBRyxjQUFjLENBQUMsTUFBTSxHQUFHLGFBQWEsQ0FBQyxZQUFZLENBQUM7Z0JBQy9GLE1BQU07WUFDUixLQUFLLE1BQU07Z0JBQ1QsZ0JBQWdCLENBQUMsSUFBSSxHQUFHLGNBQWMsQ0FBQyxJQUFJLENBQUM7Z0JBQzVDLE1BQU07WUFDUixLQUFLLE9BQU87Z0JBQ1YsZ0JBQWdCLENBQUMsSUFBSSxHQUFHLGNBQWMsQ0FBQyxJQUFJLEdBQUcsY0FBYyxDQUFDLEtBQUssR0FBRyxhQUFhLENBQUMsV0FBVyxDQUFDO2dCQUMvRixNQUFNO1lBQ1IsS0FBSyxRQUFRO2dCQUNYLElBQUksZ0JBQWdCLEtBQUssS0FBSyxJQUFJLGdCQUFnQixLQUFLLFFBQVEsRUFBRTtvQkFDL0QsZ0JBQWdCLENBQUMsSUFBSSxHQUFHLGNBQWMsQ0FBQyxJQUFJLEdBQUcsY0FBYyxDQUFDLEtBQUssR0FBRyxDQUFDLEdBQUcsYUFBYSxDQUFDLFdBQVcsR0FBRyxDQUFDLENBQUM7aUJBQ3hHO3FCQUFNO29CQUNMLGdCQUFnQixDQUFDLEdBQUcsR0FBRyxjQUFjLENBQUMsR0FBRyxHQUFHLGNBQWMsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxHQUFHLGFBQWEsQ0FBQyxZQUFZLEdBQUcsQ0FBQyxDQUFDO2lCQUN4RztnQkFDRCxNQUFNO1NBQ1Q7UUFFRCxnQkFBZ0IsQ0FBQyxHQUFHLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxnQkFBZ0IsQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUN4RCxnQkFBZ0IsQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxnQkFBZ0IsQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUM5RCxnQkFBZ0IsQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxnQkFBZ0IsQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUMxRCxnQkFBZ0IsQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxnQkFBZ0IsQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUU1RCxPQUFPLGdCQUFnQixDQUFDO0tBQ3pCOzs7Ozs7SUFHRCxzQkFBc0IsQ0FBQyxXQUF3QixFQUFFLGFBQTBCOztRQUN6RSxJQUFJLG1CQUFtQixHQUFrQixFQUFFLENBQUM7O1FBQzVDLElBQUksa0JBQWtCLEdBQUcsV0FBVyxDQUFDLHFCQUFxQixFQUFFLENBQUM7O1FBQzdELElBQUksb0JBQW9CLEdBQUcsYUFBYSxDQUFDLHFCQUFxQixFQUFFLENBQUM7O1FBQ2pFLElBQUksSUFBSSxHQUFHLFFBQVEsQ0FBQyxlQUFlLENBQUM7O1FBQ3BDLElBQUksWUFBWSxHQUFHLE1BQU0sQ0FBQyxXQUFXLElBQUksSUFBSSxDQUFDLFlBQVksQ0FBQzs7UUFDM0QsSUFBSSxXQUFXLEdBQUcsTUFBTSxDQUFDLFVBQVUsSUFBSSxJQUFJLENBQUMsV0FBVyxDQUFDOztRQUN4RCxJQUFJLDJCQUEyQixHQUFHLGtCQUFrQixDQUFDLElBQUksR0FBRyxrQkFBa0IsQ0FBQyxLQUFLLEdBQUcsQ0FBQyxDQUFDOztRQUN6RixJQUFJLDJCQUEyQixHQUFHLGtCQUFrQixDQUFDLEdBQUcsR0FBRyxrQkFBa0IsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDOzs7UUFJekYsSUFBSSxvQkFBb0IsQ0FBQyxLQUFLLEdBQUcsa0JBQWtCLENBQUMsSUFBSSxFQUFFOztZQUV4RCxJQUFJLDJCQUEyQixHQUFHLG9CQUFvQixDQUFDLE1BQU0sR0FBRyxDQUFDO2dCQUM3RCxZQUFZLEdBQUcsMkJBQTJCLEdBQUcsb0JBQW9CLENBQUMsTUFBTSxHQUFHLENBQUMsRUFBRTtnQkFDaEYsbUJBQW1CLENBQUMsTUFBTSxDQUFDLG1CQUFtQixDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsTUFBTSxDQUFDLENBQUM7YUFDbkU7O1lBRUQsSUFBSSxDQUFDLGlDQUFpQyxDQUFDLGtCQUFrQixFQUFFLG9CQUFvQixFQUFFLE1BQU0sRUFBRSxtQkFBbUIsQ0FBQyxDQUFDO1NBQy9HOztRQUdELElBQUksb0JBQW9CLENBQUMsTUFBTSxHQUFHLGtCQUFrQixDQUFDLEdBQUcsRUFBRTtZQUN4RCxJQUFJLDJCQUEyQixHQUFHLG9CQUFvQixDQUFDLEtBQUssR0FBRyxDQUFDO2dCQUM1RCxXQUFXLEdBQUcsMkJBQTJCLEdBQUcsb0JBQW9CLENBQUMsS0FBSyxHQUFHLENBQUMsRUFBRTtnQkFDOUUsbUJBQW1CLENBQUMsTUFBTSxDQUFDLG1CQUFtQixDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsS0FBSyxDQUFDLENBQUM7YUFDbEU7WUFDRCxJQUFJLENBQUMsaUNBQWlDLENBQUMsa0JBQWtCLEVBQUUsb0JBQW9CLEVBQUUsS0FBSyxFQUFFLG1CQUFtQixDQUFDLENBQUM7U0FDOUc7OztRQUlELElBQUksV0FBVyxHQUFHLGtCQUFrQixDQUFDLEtBQUssR0FBRyxvQkFBb0IsQ0FBQyxLQUFLLEVBQUU7O1lBRXZFLElBQUksMkJBQTJCLEdBQUcsb0JBQW9CLENBQUMsTUFBTSxHQUFHLENBQUM7Z0JBQzdELFlBQVksR0FBRywyQkFBMkIsR0FBRyxvQkFBb0IsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxFQUFFO2dCQUNoRixtQkFBbUIsQ0FBQyxNQUFNLENBQUMsbUJBQW1CLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxPQUFPLENBQUMsQ0FBQzthQUNwRTs7WUFFRCxJQUFJLENBQUMsaUNBQWlDLENBQUMsa0JBQWtCLEVBQUUsb0JBQW9CLEVBQUUsT0FBTyxFQUFFLG1CQUFtQixDQUFDLENBQUM7U0FDaEg7O1FBR0QsSUFBSSxZQUFZLEdBQUcsa0JBQWtCLENBQUMsTUFBTSxHQUFHLG9CQUFvQixDQUFDLE1BQU0sRUFBRTtZQUMxRSxJQUFJLDJCQUEyQixHQUFHLG9CQUFvQixDQUFDLEtBQUssR0FBRyxDQUFDO2dCQUM1RCxXQUFXLEdBQUcsMkJBQTJCLEdBQUcsb0JBQW9CLENBQUMsS0FBSyxHQUFHLENBQUMsRUFBRTtnQkFDOUUsbUJBQW1CLENBQUMsTUFBTSxDQUFDLG1CQUFtQixDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsUUFBUSxDQUFDLENBQUM7YUFDckU7WUFDRCxJQUFJLENBQUMsaUNBQWlDLENBQUMsa0JBQWtCLEVBQUUsb0JBQW9CLEVBQUUsUUFBUSxFQUFFLG1CQUFtQixDQUFDLENBQUM7U0FDakg7UUFFRCxPQUFPLG1CQUFtQixDQUFDO0tBQzVCOzs7Ozs7Ozs7OztJQU9PLGlDQUFpQyxDQUNyQyxrQkFBOEIsRUFBRSxvQkFBZ0MsRUFBRSxnQkFBd0IsRUFDMUYscUJBQW9DOztRQUN0QyxJQUFJLElBQUksR0FBRyxRQUFRLENBQUMsZUFBZSxDQUFDOztRQUVwQyxJQUFJLG9CQUFvQixDQUFDLE1BQU0sSUFBSSxrQkFBa0IsQ0FBQyxNQUFNLEVBQUU7WUFDNUQscUJBQXFCLENBQUMsTUFBTSxDQUFDLHFCQUFxQixDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsZ0JBQWdCLEdBQUcsU0FBUyxDQUFDLENBQUM7U0FDN0Y7UUFDRCxJQUFJLENBQUMsTUFBTSxDQUFDLFdBQVcsSUFBSSxJQUFJLENBQUMsWUFBWSxJQUFJLGtCQUFrQixDQUFDLEdBQUcsSUFBSSxvQkFBb0IsQ0FBQyxNQUFNLEVBQUU7WUFDckcscUJBQXFCLENBQUMsTUFBTSxDQUFDLHFCQUFxQixDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsZ0JBQWdCLEdBQUcsTUFBTSxDQUFDLENBQUM7U0FDMUY7Ozs7Ozs7Ozs7OztJQVFLLGlDQUFpQyxDQUNyQyxrQkFBOEIsRUFBRSxvQkFBZ0MsRUFBRSxnQkFBd0IsRUFDMUYscUJBQW9DOztRQUN0QyxJQUFJLElBQUksR0FBRyxRQUFRLENBQUMsZUFBZSxDQUFDOztRQUVwQyxJQUFJLENBQUMsTUFBTSxDQUFDLFVBQVUsSUFBSSxJQUFJLENBQUMsV0FBVyxJQUFJLGtCQUFrQixDQUFDLElBQUksSUFBSSxvQkFBb0IsQ0FBQyxLQUFLLEVBQUU7WUFDbkcscUJBQXFCLENBQUMsTUFBTSxDQUFDLHFCQUFxQixDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsZ0JBQWdCLEdBQUcsT0FBTyxDQUFDLENBQUM7U0FDM0Y7UUFDRCxJQUFJLG9CQUFvQixDQUFDLEtBQUssSUFBSSxrQkFBa0IsQ0FBQyxLQUFLLEVBQUU7WUFDMUQscUJBQXFCLENBQUMsTUFBTSxDQUFDLHFCQUFxQixDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsZ0JBQWdCLEdBQUcsUUFBUSxDQUFDLENBQUM7U0FDNUY7O0NBRUo7O0FBRUQsTUFBTSxlQUFlLEdBQUcsSUFBSSxXQUFXLEVBQUUsQ0FBQzs7Ozs7Ozs7QUFZMUMsMEJBQ0ksV0FBd0IsRUFBRSxhQUEwQixFQUFFLFNBQThDLEVBQ3BHLFlBQXNCOztJQUN4QixJQUFJLGFBQWEsR0FBcUIsS0FBSyxDQUFDLE9BQU8sQ0FBQyxTQUFTLENBQUMsR0FBRyxTQUFTLEdBQUcsbUJBQUMsU0FBc0IsRUFBQyxDQUFDOztJQUd0RyxJQUFJLE9BQU8sR0FBRyxhQUFhLENBQUMsU0FBUyxDQUFDLEdBQUcsSUFBSSxHQUFHLEtBQUssTUFBTSxDQUFDLENBQUM7SUFDN0QsSUFBSSxPQUFPLElBQUksQ0FBQyxFQUFFO1FBQ2hCLENBQUMsS0FBSyxFQUFFLFFBQVEsRUFBRSxNQUFNLEVBQUUsT0FBTyxFQUFFLFVBQVUsRUFBRSxXQUFXLEVBQUUsYUFBYSxFQUFFLGNBQWMsRUFBRSxVQUFVO1lBQ3BHLGFBQWEsRUFBRSxXQUFXLEVBQUUsY0FBYztTQUMxQyxDQUFDLE9BQU8sQ0FBQyxVQUFTLEdBQUc7WUFDcEIsSUFBSSxhQUFhLENBQUMsSUFBSSxDQUFDLEdBQUcsSUFBSSxHQUFHLENBQUMsTUFBTSxDQUFDLEdBQUcsR0FBRyxHQUFHLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxJQUFJLElBQUksRUFBRTtnQkFDbkUsYUFBYSxDQUFDLE1BQU0sQ0FBQyxPQUFPLEVBQUUsRUFBRSxDQUFDLG9CQUFFLEdBQWdCLEVBQUMsQ0FBQzthQUN0RDtTQUNGLENBQUMsQ0FBQztLQUNKOztJQUdELElBQUksTUFBTSxHQUFHLENBQUMsQ0FBYzs7SUFBNUIsSUFBZ0IsT0FBTyxHQUFHLENBQUMsQ0FBQzs7SUFDNUIsSUFBSSxnQkFBZ0IsQ0FBWTs7SUFFaEMsSUFBSSxtQkFBbUIsR0FBRyxlQUFlLENBQUMsc0JBQXNCLENBQUMsV0FBVyxFQUFFLGFBQWEsQ0FBQyxDQUFDOztJQUU3RixLQUFLLElBQUksRUFBRSxJQUFJLEVBQUUsS0FBSyxFQUFFLElBQUksYUFBYSxDQUFDLGFBQWEsQ0FBQyxFQUFFOzs7UUFHeEQsSUFBSSxDQUFDLG1CQUFtQixDQUFDLElBQUksQ0FBQyxHQUFHLElBQUksR0FBRyxLQUFLLElBQUksQ0FBQyxJQUFJLElBQUksTUFBTSxhQUFhLENBQUMsTUFBTSxLQUFLLEtBQUssR0FBRyxDQUFDLENBQUMsRUFBRTtZQUNuRyxnQkFBZ0IscUJBQWMsSUFBSSxDQUFBLENBQUM7O1lBQ25DLE1BQU0sR0FBRyxHQUFHLGVBQWUsQ0FBQyxnQkFBZ0IsQ0FBQyxXQUFXLEVBQUUsYUFBYSxFQUFFLElBQUksRUFBRSxZQUFZLENBQUMsQ0FBQztZQUM3RixNQUFNLEdBQUcsR0FBRyxDQUFDLEdBQUcsQ0FBQztZQUNqQixPQUFPLEdBQUcsR0FBRyxDQUFDLElBQUksQ0FBQztZQUNuQixNQUFNO1NBQ1A7S0FDRjtJQUNELGFBQWEsQ0FBQyxLQUFLLENBQUMsR0FBRyxHQUFHLEdBQUcsTUFBTSxJQUFJLENBQUM7SUFDeEMsYUFBYSxDQUFDLEtBQUssQ0FBQyxJQUFJLEdBQUcsR0FBRyxPQUFPLElBQUksQ0FBQztJQUMxQyxPQUFPLGdCQUFnQixDQUFDO0NBQ3pCOzs7Ozs7QUFHRCx1QkFBMEIsQ0FBTTtJQUM5QixPQUFPLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFJLEVBQUUsS0FBSyxNQUFNLEVBQUMsSUFBSSxFQUFFLEtBQUssRUFBQyxDQUFDLENBQUMsQ0FBQztDQUNoRDs7Ozs7O0FDdFNEO0FBSUEsTUFBTSwyQkFBMkIsR0FBRztJQUNsQyxTQUFTLEVBQUUsd0JBQXdCLEVBQUUsNENBQTRDLEVBQUUsd0JBQXdCO0lBQzNHLDBCQUEwQixFQUFFLG1CQUFtQixFQUFFLGlDQUFpQztDQUNuRixDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQzs7Ozs7O0FBS2Isc0NBQXNDLE9BQW9COztJQUN4RCxNQUFNLElBQUksR0FBNEIsT0FBTyxDQUFDLGdCQUFnQixDQUFDLDJCQUEyQixDQUFDLENBQUM7SUFDNUYsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO0NBQ3pDOzs7Ozs7Ozs7O0FBV0QsTUFBYSxZQUFZLEdBQUcsQ0FBQyxPQUFvQixFQUFFLGNBQStCOztJQUVoRixNQUFNLG1CQUFtQixHQUNyQixTQUFTLENBQWEsT0FBTyxFQUFFLFNBQVMsQ0FBQyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsY0FBYyxDQUFDLEVBQUUsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQzs7SUFHbEcsU0FBUyxDQUFnQixPQUFPLEVBQUUsU0FBUyxDQUFDO1NBQ3ZDLElBQUksQ0FBQyxTQUFTLENBQUMsY0FBYyxDQUFDLEVBQUUsTUFBTSxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsS0FBSyxLQUFLLEdBQUcsQ0FBQyxHQUFHLENBQUMsRUFBRSxjQUFjLENBQUMsbUJBQW1CLENBQUMsQ0FBQztTQUN0RyxTQUFTLENBQUMsQ0FBQyxDQUFDLFFBQVEsRUFBRSxjQUFjLENBQUM7UUFDcEMsTUFBSyxDQUFDLEtBQUssRUFBRSxJQUFJLENBQUMsR0FBRyw0QkFBNEIsQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUUzRCxJQUFJLGNBQWMsS0FBSyxLQUFLLElBQUksUUFBUSxDQUFDLFFBQVEsRUFBRTtZQUNqRCxJQUFJLENBQUMsS0FBSyxFQUFFLENBQUM7WUFDYixRQUFRLENBQUMsY0FBYyxFQUFFLENBQUM7U0FDM0I7UUFFRCxJQUFJLGNBQWMsS0FBSyxJQUFJLElBQUksQ0FBQyxRQUFRLENBQUMsUUFBUSxFQUFFO1lBQ2pELEtBQUssQ0FBQyxLQUFLLEVBQUUsQ0FBQztZQUNkLFFBQVEsQ0FBQyxjQUFjLEVBQUUsQ0FBQztTQUMzQjtLQUNGLENBQUMsQ0FBQzs7SUFHUCxTQUFTLENBQUMsT0FBTyxFQUFFLE9BQU8sQ0FBQztTQUN0QixJQUFJLENBQUMsU0FBUyxDQUFDLGNBQWMsQ0FBQyxFQUFFLGNBQWMsQ0FBQyxtQkFBbUIsQ0FBQyxFQUFFLEdBQUcsQ0FBQyxHQUFHLHNCQUFJLEdBQUcsQ0FBQyxDQUFDLENBQWdCLENBQUEsQ0FBQyxDQUFDO1NBQ3ZHLFNBQVMsQ0FBQyxrQkFBa0IsSUFBSSxrQkFBa0IsQ0FBQyxLQUFLLEVBQUUsQ0FBQyxDQUFDO0NBQ2xFLENBQUM7Ozs7OztBQ3BERjtBQXFDQSxNQUFNQywrQkFBNkIsR0FBRztJQUNwQyxPQUFPLEVBQUUsaUJBQWlCO0lBQzFCLFdBQVcsRUFBRSxVQUFVLENBQUMsTUFBTSxrQkFBa0IsQ0FBQztJQUNqRCxLQUFLLEVBQUUsSUFBSTtDQUNaLENBQUM7O0FBRUYsTUFBTSx3QkFBd0IsR0FBRztJQUMvQixPQUFPLEVBQUUsYUFBYTtJQUN0QixXQUFXLEVBQUUsVUFBVSxDQUFDLE1BQU0sa0JBQWtCLENBQUM7SUFDakQsS0FBSyxFQUFFLElBQUk7Q0FDWixDQUFDOzs7OztBQWlCRjs7Ozs7Ozs7Ozs7OztJQTZIRSxZQUNZLGtCQUFrRCxNQUFvQyxFQUN0RixRQUFrQyxTQUFvQixFQUFVLElBQThCLEVBQzlGLFNBQXlCLFFBQThCLEVBQVUsU0FBc0IsRUFDdkYsY0FBNkQsU0FBYztRQUgzRSxxQkFBZ0IsR0FBaEIsZ0JBQWdCO1FBQWtDLFdBQU0sR0FBTixNQUFNLENBQThCO1FBQ3RGLFdBQU0sR0FBTixNQUFNO1FBQTRCLGNBQVMsR0FBVCxTQUFTLENBQVc7UUFBVSxTQUFJLEdBQUosSUFBSSxDQUEwQjtRQUM5RixZQUFPLEdBQVAsT0FBTztRQUFrQixhQUFRLEdBQVIsUUFBUSxDQUFzQjtRQUFVLGNBQVMsR0FBVCxTQUFTLENBQWE7UUFDdkYsaUJBQVksR0FBWixZQUFZO1FBQWlELGNBQVMsR0FBVCxTQUFTLENBQUs7d0JBL0hwRSxJQUFJLE9BQU8sRUFBRTtxQkFDYSxJQUFJO3lCQUM3QixLQUFLOzs7Ozs7Ozs7O3lCQWE0QixJQUFJOzs7Ozs7O3lCQW1EcEIsYUFBYTs7Ozs7OzswQkFnQzNCLElBQUksWUFBWSxFQUFXOzs7Ozt3QkFNN0IsSUFBSSxZQUFZLEVBQThCO3lCQWMvQyxDQUFDLENBQU0sUUFBTzswQkFDYixTQUFRO2dDQUNGLFNBQVE7UUFRakMsSUFBSSxDQUFDLGlCQUFpQixHQUFHLE9BQU8sQ0FBQyxRQUFRLENBQUMsU0FBUyxDQUFDO1lBQ2xELElBQUksSUFBSSxDQUFDLEtBQUssRUFBRTtnQkFDZCxnQkFBZ0IsQ0FDWixJQUFJLENBQUMsTUFBTSxDQUFDLGFBQWEsRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxhQUFhLEVBQUUsSUFBSSxDQUFDLFNBQVMsRUFBRSxJQUFJLENBQUMsU0FBUyxLQUFLLE1BQU0sQ0FBQyxDQUFDO2FBQzlHO1NBQ0YsQ0FBQyxDQUFDO0tBQ0o7Ozs7SUE1QkQsSUFDSSxRQUFRO1FBQ1YsT0FBTyxJQUFJLENBQUMsU0FBUyxDQUFDO0tBQ3ZCOzs7OztJQUNELElBQUksUUFBUSxDQUFDLEtBQVU7UUFDckIsSUFBSSxDQUFDLFNBQVMsR0FBRyxLQUFLLEtBQUssRUFBRSxLQUFLLEtBQUssSUFBSSxLQUFLLEtBQUssT0FBTyxDQUFDLENBQUM7UUFFOUQsSUFBSSxJQUFJLENBQUMsTUFBTSxFQUFFLEVBQUU7WUFDakIsSUFBSSxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsZ0JBQWdCLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDO1NBQ3REO0tBQ0Y7Ozs7O0lBb0JELGdCQUFnQixDQUFDLEVBQXVCLElBQVUsSUFBSSxDQUFDLFNBQVMsR0FBRyxFQUFFLENBQUMsRUFBRTs7Ozs7SUFFeEUsaUJBQWlCLENBQUMsRUFBYSxJQUFVLElBQUksQ0FBQyxVQUFVLEdBQUcsRUFBRSxDQUFDLEVBQUU7Ozs7O0lBRWhFLHlCQUF5QixDQUFDLEVBQWMsSUFBVSxJQUFJLENBQUMsZ0JBQWdCLEdBQUcsRUFBRSxDQUFDLEVBQUU7Ozs7O0lBRS9FLGdCQUFnQixDQUFDLFVBQW1CLElBQVUsSUFBSSxDQUFDLFFBQVEsR0FBRyxVQUFVLENBQUMsRUFBRTs7Ozs7SUFFM0UsUUFBUSxDQUFDLENBQWtCOztRQUN6QixNQUFNLEtBQUssR0FBRyxDQUFDLENBQUMsS0FBSyxDQUFDO1FBRXRCLElBQUksS0FBSyxLQUFLLElBQUksSUFBSSxLQUFLLEtBQUssU0FBUyxFQUFFO1lBQ3pDLE9BQU8sSUFBSSxDQUFDO1NBQ2I7O1FBRUQsTUFBTSxPQUFPLEdBQUcsSUFBSSxDQUFDLGVBQWUsQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO1FBRXpFLElBQUksQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsRUFBRTtZQUNwQyxPQUFPLEVBQUMsU0FBUyxFQUFFLEVBQUMsT0FBTyxFQUFFLENBQUMsQ0FBQyxLQUFLLEVBQUMsRUFBQyxDQUFDO1NBQ3hDO1FBRUQsSUFBSSxJQUFJLENBQUMsT0FBTyxJQUFJLE9BQU8sQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsRUFBRTtZQUM5RCxPQUFPLEVBQUMsU0FBUyxFQUFFLEVBQUMsY0FBYyxFQUFFLElBQUksQ0FBQyxPQUFPLEVBQUMsRUFBQyxDQUFDO1NBQ3BEO1FBRUQsSUFBSSxJQUFJLENBQUMsT0FBTyxJQUFJLE9BQU8sQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsRUFBRTtZQUM3RCxPQUFPLEVBQUMsU0FBUyxFQUFFLEVBQUMsYUFBYSxFQUFFLElBQUksQ0FBQyxPQUFPLEVBQUMsRUFBQyxDQUFDO1NBQ25EO0tBQ0Y7Ozs7O0lBRUQsVUFBVSxDQUFDLEtBQUs7UUFDZCxJQUFJLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQyxlQUFlLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQztRQUN2RSxJQUFJLENBQUMsZ0JBQWdCLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO0tBQ3BDOzs7Ozs7SUFFRCxnQkFBZ0IsQ0FBQyxLQUFhLEVBQUUsVUFBVSxHQUFHLEtBQUs7UUFDaEQsSUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUMsZUFBZSxDQUFDLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQztRQUN2RSxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDLFlBQVksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLEtBQUssS0FBSyxFQUFFLEdBQUcsSUFBSSxHQUFHLEtBQUssQ0FBQyxDQUFDLENBQUM7UUFDckcsSUFBSSxVQUFVLElBQUksSUFBSSxDQUFDLE1BQU0sRUFBRTtZQUM3QixJQUFJLENBQUMsZ0JBQWdCLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1NBQ3BDO0tBQ0Y7Ozs7SUFFRCxNQUFNLEtBQUssT0FBTyxDQUFDLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxFQUFFOzs7OztJQUtqQyxJQUFJO1FBQ0YsSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUUsRUFBRTs7WUFDbEIsTUFBTSxFQUFFLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyx1QkFBdUIsQ0FBQyxhQUFhLENBQUMsQ0FBQztZQUM1RCxJQUFJLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsZUFBZSxDQUFDLEVBQUUsQ0FBQyxDQUFDO1lBRTdDLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxhQUFhLENBQUMsQ0FBQztZQUMzRCxJQUFJLENBQUMsc0JBQXNCLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsQ0FBQztZQUNqRCxJQUFJLENBQUMsOEJBQThCLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsQ0FBQztZQUN6RCxJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxRQUFRLEVBQUUsQ0FBQztZQUMvQixJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUM7O1lBR3ZFLElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLGdCQUFnQixDQUFDLENBQUMsWUFBWTtnQkFDaEQsSUFBSSxDQUFDLFVBQVUsQ0FBQyxZQUFZLENBQUMsQ0FBQztnQkFDOUIsSUFBSSxDQUFDLFNBQVMsQ0FBQyxZQUFZLENBQUMsQ0FBQzthQUM5QixDQUFDLENBQUM7WUFFSCxJQUFJLENBQUMsS0FBSyxDQUFDLGlCQUFpQixDQUFDLGFBQWEsRUFBRSxDQUFDO1lBRTdDLElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLGdCQUFnQixDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQztZQUVwRCxJQUFJLElBQUksQ0FBQyxTQUFTLEtBQUssTUFBTSxFQUFFO2dCQUM3QixNQUFNLENBQUMsUUFBUSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLGFBQWEsQ0FBQyxDQUFDO2FBQzlGOztZQUdELFlBQVksQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxhQUFhLEVBQUUsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1lBRS9ELElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLEtBQUssRUFBRSxDQUFDOztZQUc1QixJQUFJLENBQUMsT0FBTyxDQUFDLGlCQUFpQixDQUFDOztnQkFFN0IsTUFBTSxRQUFRLEdBQUcsU0FBUyxDQUFnQixJQUFJLENBQUMsU0FBUyxFQUFFLE9BQU8sQ0FBQztxQkFDNUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLEVBQUUsTUFBTSxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsS0FBSyxLQUFLLEdBQUcsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDOztnQkFFMUYsSUFBSSxjQUFjLENBQUM7Z0JBQ25CLElBQUksSUFBSSxDQUFDLFNBQVMsS0FBSyxJQUFJLElBQUksSUFBSSxDQUFDLFNBQVMsS0FBSyxTQUFTLEVBQUU7O29CQUczRCxJQUFJLFNBQVMsR0FBRyxJQUFJLENBQUM7b0JBQ3JCLHFCQUFxQixDQUFDLE1BQU0sU0FBUyxHQUFHLEtBQUssQ0FBQyxDQUFDO29CQUUvQyxjQUFjO3dCQUNWLFNBQVMsQ0FBYSxJQUFJLENBQUMsU0FBUyxFQUFFLE9BQU8sQ0FBQzs2QkFDekMsSUFBSSxDQUNELFNBQVMsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLEVBQUUsTUFBTSxDQUFDLEtBQUssSUFBSSxDQUFDLFNBQVMsSUFBSSxJQUFJLENBQUMsMEJBQTBCLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDO2lCQUM5RztxQkFBTTtvQkFDTCxjQUFjLEdBQUcsS0FBSyxDQUFDO2lCQUN4QjtnQkFFRCxJQUFJLENBQVEsQ0FBQyxRQUFRLEVBQUUsY0FBYyxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUMsTUFBTSxJQUFJLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxNQUFNLElBQUksQ0FBQyxLQUFLLEVBQUUsQ0FBQyxDQUFDLENBQUM7YUFDL0YsQ0FBQyxDQUFDO1NBQ0o7S0FDRjs7Ozs7SUFLRCxLQUFLO1FBQ0gsSUFBSSxJQUFJLENBQUMsTUFBTSxFQUFFLEVBQUU7WUFDakIsSUFBSSxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDO1lBQzdELElBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDO1lBQ2xCLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxFQUFFLENBQUM7U0FDdEI7S0FDRjs7Ozs7SUFLRCxNQUFNO1FBQ0osSUFBSSxJQUFJLENBQUMsTUFBTSxFQUFFLEVBQUU7WUFDakIsSUFBSSxDQUFDLEtBQUssRUFBRSxDQUFDO1NBQ2Q7YUFBTTtZQUNMLElBQUksQ0FBQyxJQUFJLEVBQUUsQ0FBQztTQUNiO0tBQ0Y7Ozs7Ozs7OztJQVFELFVBQVUsQ0FBQyxJQUFvQztRQUM3QyxJQUFJLElBQUksQ0FBQyxNQUFNLEVBQUUsRUFBRTtZQUNqQixJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLENBQUM7U0FDdEM7S0FDRjs7OztJQUVELE1BQU0sS0FBSyxJQUFJLENBQUMsVUFBVSxFQUFFLENBQUMsRUFBRTs7Ozs7SUFFL0IsV0FBVyxDQUFDLE9BQXNCO1FBQ2hDLElBQUksT0FBTyxDQUFDLFNBQVMsQ0FBQyxJQUFJLE9BQU8sQ0FBQyxTQUFTLENBQUMsRUFBRTtZQUM1QyxJQUFJLENBQUMsZ0JBQWdCLEVBQUUsQ0FBQztTQUN6QjtLQUNGOzs7O0lBRUQsV0FBVztRQUNULElBQUksQ0FBQyxLQUFLLEVBQUUsQ0FBQztRQUNiLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxXQUFXLEVBQUUsQ0FBQztLQUN0Qzs7Ozs7SUFFTyxzQkFBc0IsQ0FBQyxrQkFBaUM7UUFDOUQsQ0FBQyxhQUFhLEVBQUUsZUFBZSxFQUFFLGdCQUFnQixFQUFFLGNBQWMsRUFBRSxTQUFTLEVBQUUsU0FBUyxFQUFFLFlBQVk7WUFDcEcsYUFBYSxFQUFFLGdCQUFnQixFQUFFLGNBQWMsRUFBRSxpQkFBaUIsQ0FBQzthQUMvRCxPQUFPLENBQUMsQ0FBQyxVQUFrQjtZQUMxQixJQUFJLElBQUksQ0FBQyxVQUFVLENBQUMsS0FBSyxTQUFTLEVBQUU7Z0JBQ2xDLGtCQUFrQixDQUFDLFVBQVUsQ0FBQyxHQUFHLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQzthQUNuRDtTQUNGLENBQUMsQ0FBQztRQUNQLGtCQUFrQixDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUMsU0FBUyxJQUFJLElBQUksQ0FBQyxNQUFNLENBQUM7Ozs7OztJQUd2RCxrQkFBa0IsQ0FBQyxhQUFrQjtRQUMzQyxJQUFJLENBQUMsU0FBUyxDQUFDLFFBQVEsQ0FBQyxhQUFhLEVBQUUsZUFBZSxDQUFDLENBQUM7UUFDeEQsSUFBSSxDQUFDLFNBQVMsQ0FBQyxRQUFRLENBQUMsYUFBYSxFQUFFLFNBQVMsRUFBRSxHQUFHLENBQUMsQ0FBQztRQUN2RCxJQUFJLENBQUMsU0FBUyxDQUFDLFFBQVEsQ0FBQyxhQUFhLEVBQUUsTUFBTSxDQUFDLENBQUM7Ozs7OztJQUd6QywwQkFBMEIsQ0FBQyxLQUFpQjtRQUNsRCxPQUFPLENBQUMsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLGFBQWEsRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxhQUFhLENBQUMsQ0FBQyxJQUFJLENBQUMsRUFBRSxJQUFJLEVBQUUsQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUM7Ozs7OztJQUd2Ryw4QkFBOEIsQ0FBQyxrQkFBaUM7UUFDdEUsa0JBQWtCLENBQUMsUUFBUSxDQUFDLFNBQVMsQ0FBQyxJQUFJLElBQUksSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztRQUN4RSxrQkFBa0IsQ0FBQyxNQUFNLENBQUMsU0FBUyxDQUFDLElBQUk7WUFDdEMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7WUFDM0IsSUFBSSxJQUFJLENBQUMsU0FBUyxLQUFLLElBQUksSUFBSSxJQUFJLENBQUMsU0FBUyxLQUFLLFFBQVEsRUFBRTtnQkFDMUQsSUFBSSxDQUFDLEtBQUssRUFBRSxDQUFDO2FBQ2Q7U0FDRixDQUFDLENBQUM7Ozs7OztJQUdHLGdCQUFnQixDQUFDLEtBQWM7UUFDckMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxhQUFhLEVBQUUsT0FBTyxFQUFFLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQztRQUNwRyxJQUFJLElBQUksQ0FBQyxNQUFNLEVBQUUsRUFBRTtZQUNqQixJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQztZQUNqRSxJQUFJLENBQUMsVUFBVSxFQUFFLENBQUM7U0FDbkI7Ozs7OztJQUdLLGVBQWUsQ0FBQyxJQUFtQjs7UUFDekMsTUFBTSxPQUFPLEdBQUcsSUFBSSxHQUFHLElBQUksT0FBTyxDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLEtBQUssRUFBRSxJQUFJLENBQUMsR0FBRyxDQUFDLEdBQUcsSUFBSSxDQUFDO1FBQzNFLE9BQU8sSUFBSSxDQUFDLFNBQVMsQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLEdBQUcsT0FBTyxHQUFHLElBQUksQ0FBQzs7OztZQXJWM0QsU0FBUyxTQUFDO2dCQUNULFFBQVEsRUFBRSxzQkFBc0I7Z0JBQ2hDLFFBQVEsRUFBRSxlQUFlO2dCQUN6QixJQUFJLEVBQUU7b0JBQ0osU0FBUyxFQUFFLHVDQUF1QztvQkFDbEQsVUFBVSxFQUFFLDZDQUE2QztvQkFDekQsUUFBUSxFQUFFLFVBQVU7b0JBQ3BCLFlBQVksRUFBRSxVQUFVO2lCQUN6QjtnQkFDRCxTQUFTLEVBQUUsQ0FBQ0EsK0JBQTZCLEVBQUUsd0JBQXdCLEVBQUUsb0JBQW9CLENBQUM7YUFDM0Y7Ozs7WUF2Q08sc0JBQXNCO1lBcEI1QixVQUFVO1lBQ1YsZ0JBQWdCO1lBQ2hCLFNBQVM7WUFDVCx3QkFBd0I7WUFDeEIsTUFBTTtZQXdCQSxvQkFBb0I7WUFEcEIsV0FBVztZQURYLGNBQWM7NENBbUs0QixNQUFNLFNBQUMsUUFBUTs7O3dCQWhIOUQsS0FBSzswQkFLTCxLQUFLOzRCQUtMLEtBQUs7NkJBS0wsS0FBSzsyQkFNTCxLQUFLO3NCQUtMLEtBQUs7c0JBS0wsS0FBSzt5QkFNTCxLQUFLOzBCQU1MLEtBQUs7d0JBUUwsS0FBSzsyQkFLTCxLQUFLOzhCQUtMLEtBQUs7d0JBUUwsS0FBSzt3QkFNTCxLQUFLO3lCQVFMLE1BQU07dUJBTU4sTUFBTTt1QkFFTixLQUFLOzs7Ozs7O0FDNUtSOzs7O0lBcUNFLFlBQW1CLElBQXVCO1FBQXZCLFNBQUksR0FBSixJQUFJLENBQW1CO0tBQUk7Ozs7SUFFOUMsT0FBTyxLQUFLLE9BQU8sQ0FBQyxJQUFJLENBQUMsUUFBUSxLQUFLLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxLQUFLLElBQUksQ0FBQyxZQUFZLElBQUksSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLEVBQUU7OztZQW5DakcsU0FBUyxTQUFDO2dCQUNULFFBQVEsRUFBRSx3QkFBd0I7Z0JBQ2xDLGVBQWUsRUFBRSx1QkFBdUIsQ0FBQyxNQUFNO2dCQUMvQyxNQUFNLEVBQUUsQ0FBQzs7Ozs7Ozs7Ozs7O0dBWVIsQ0FBQztnQkFDRixJQUFJLEVBQUU7b0JBQ0osT0FBTyxFQUFFLFdBQVc7b0JBQ3BCLG9CQUFvQixFQUFFLFVBQVU7b0JBQ2hDLG9CQUFvQixFQUFFLFVBQVU7b0JBQ2hDLG9CQUFvQixFQUFFLFdBQVc7b0JBQ2pDLGlCQUFpQixFQUFFLFdBQVc7b0JBQzlCLGdCQUFnQixFQUFFLFNBQVM7aUJBQzVCO2dCQUNELFFBQVEsRUFBRSxpQ0FBaUM7YUFDNUM7Ozs7WUEzQk8saUJBQWlCOzs7MkJBNkJ0QixLQUFLO21CQUNMLEtBQUs7dUJBQ0wsS0FBSztzQkFDTCxLQUFLO3VCQUNMLEtBQUs7Ozs7Ozs7QUNuQ1I7Ozs7SUFnREUsWUFBbUIsSUFBdUI7UUFBdkIsU0FBSSxHQUFKLElBQUksQ0FBbUI7c0JBRnZCLElBQUksWUFBWSxFQUFXO0tBRUE7Ozs7O0lBRTlDLFdBQVcsQ0FBQyxLQUFhLElBQUksSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxPQUFPLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUUsU0FBUyxDQUFDLEtBQUssQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRTs7Ozs7SUFFbEcsVUFBVSxDQUFDLElBQVksSUFBSSxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLE9BQU8sQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLEVBQUUsSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFOzs7WUEvQ2pHLFNBQVMsU0FBQztnQkFDVCxRQUFRLEVBQUUsa0NBQWtDO2dCQUM1QyxlQUFlLEVBQUUsdUJBQXVCLENBQUMsTUFBTTtnQkFDL0MsTUFBTSxFQUFFLENBQUM7Ozs7Ozs7Ozs7R0FVUixDQUFDO2dCQUNGLFFBQVEsRUFBRTs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQW1CVDthQUNGOzs7O1lBcENPLGlCQUFpQjs7O21CQXNDdEIsS0FBSzt1QkFDTCxLQUFLO3FCQUNMLEtBQUs7b0JBQ0wsS0FBSztxQkFFTCxNQUFNOzs7Ozs7O0FDOUNUOzs7QUFNQSxzQkFBdUMsU0FBUSxXQUFXOzs7O0lBbUJ4RCxjQUFjLEtBQUssT0FBTyxDQUFDLENBQUMsRUFBRTs7OztJQUU5QixTQUFTLEtBQUssT0FBTyxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxDQUFDLENBQUMsRUFBRTs7OztJQUUvRCxnQkFBZ0IsS0FBSyxPQUFPLENBQUMsQ0FBQyxFQUFFOzs7Ozs7O0lBRWhDLE9BQU8sQ0FBQyxJQUFhLEVBQUUsU0FBb0IsR0FBRyxFQUFFLE1BQU0sR0FBRyxDQUFDO1FBQ3hELElBQUksR0FBRyxJQUFJLE9BQU8sQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxLQUFLLEVBQUUsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBRXBELFFBQVEsTUFBTTtZQUNaLEtBQUssR0FBRztnQkFDTixJQUFJLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLElBQUksR0FBRyxNQUFNLENBQUMsQ0FBQztnQkFDL0MsSUFBSSxDQUFDLEtBQUssR0FBRyxDQUFDLENBQUM7Z0JBQ2YsSUFBSSxDQUFDLEdBQUcsR0FBRyxDQUFDLENBQUM7Z0JBQ2IsT0FBTyxJQUFJLENBQUM7WUFDZCxLQUFLLEdBQUc7Z0JBQ04sSUFBSSxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxLQUFLLEdBQUcsTUFBTSxDQUFDLENBQUM7Z0JBQ2pELElBQUksQ0FBQyxHQUFHLEdBQUcsQ0FBQyxDQUFDO2dCQUNiLE9BQU8sSUFBSSxDQUFDO1lBQ2QsS0FBSyxHQUFHO2dCQUNOLE9BQU8sSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLEdBQUcsR0FBRyxNQUFNLENBQUMsQ0FBQztZQUMvQztnQkFDRSxPQUFPLElBQUksQ0FBQztTQUNmO0tBQ0Y7Ozs7Ozs7SUFFRCxPQUFPLENBQUMsSUFBYSxFQUFFLFNBQW9CLEdBQUcsRUFBRSxNQUFNLEdBQUcsQ0FBQyxJQUFJLE9BQU8sSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLEVBQUUsTUFBTSxFQUFFLENBQUMsTUFBTSxDQUFDLENBQUMsRUFBRTs7Ozs7SUFFM0csVUFBVSxDQUFDLElBQWE7O1FBQ3RCLE1BQU0sR0FBRyxHQUFHLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLENBQUMsTUFBTSxFQUFFLENBQUM7O1FBRTVDLE9BQU8sR0FBRyxLQUFLLENBQUMsR0FBRyxDQUFDLEdBQUcsR0FBRyxDQUFDO0tBQzVCOzs7Ozs7SUFFRCxhQUFhLENBQUMsSUFBZSxFQUFFLGNBQXNCOztRQUVuRCxJQUFJLGNBQWMsS0FBSyxDQUFDLEVBQUU7WUFDeEIsY0FBYyxHQUFHLENBQUMsQ0FBQztTQUNwQjs7UUFFRCxNQUFNLGFBQWEsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDLEdBQUcsY0FBYyxJQUFJLENBQUMsQ0FBQzs7UUFDbkQsTUFBTSxJQUFJLEdBQUcsSUFBSSxDQUFDLGFBQWEsQ0FBQyxDQUFDOztRQUVqQyxNQUFNLE1BQU0sR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ3RDLE1BQU0sQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLE9BQU8sRUFBRSxHQUFHLENBQUMsSUFBSSxNQUFNLENBQUMsTUFBTSxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQzs7UUFDOUQsTUFBTSxJQUFJLEdBQUcsTUFBTSxDQUFDLE9BQU8sRUFBRSxDQUFDOztRQUM5QixNQUFNLE9BQU8sR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksT0FBTyxDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDL0QsT0FBTyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxJQUFJLEdBQUcsT0FBTyxDQUFDLE9BQU8sRUFBRSxJQUFJLFFBQVEsQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQztLQUM5RTs7OztJQUVELFFBQVEsS0FBYyxPQUFPLElBQUksQ0FBQyxhQUFhLENBQUMsSUFBSSxJQUFJLEVBQUUsQ0FBQyxDQUFDLEVBQUU7Ozs7O0lBRzlELE9BQU8sQ0FBQyxJQUFhO1FBQ25CLE9BQU8sSUFBSSxJQUFJLFFBQVEsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksUUFBUSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxRQUFRLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQztZQUM1RSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxDQUFDLE9BQU8sRUFBRSxDQUFDLENBQUM7S0FDOUM7Ozs7OztJQUVPLE9BQU8sQ0FBQyxJQUFhLEVBQUUsR0FBVztRQUN4QyxHQUFHLEdBQUcsQ0FBQyxHQUFHLENBQUM7O1FBQ1gsSUFBSSxLQUFLLEdBQUcsSUFBSSxDQUFDLGVBQWUsQ0FBQyxJQUFJLENBQUMsS0FBSyxFQUFFLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUN4RCxJQUFJLEdBQUcsSUFBSSxDQUFDLEVBQUU7WUFDWixPQUFPLEdBQUcsSUFBSSxDQUFDLEVBQUU7Z0JBQ2YsSUFBSSxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxLQUFLLEdBQUcsQ0FBQyxDQUFDLENBQUM7Z0JBQzVDLEtBQUssR0FBRyxJQUFJLENBQUMsZUFBZSxDQUFDLElBQUksQ0FBQyxLQUFLLEVBQUUsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO2dCQUNwRCxHQUFHLElBQUksS0FBSyxDQUFDO2FBQ2Q7U0FDRjthQUFNLElBQUksR0FBRyxHQUFHLEtBQUssRUFBRTtZQUN0QixPQUFPLEdBQUcsR0FBRyxLQUFLLEVBQUU7Z0JBQ2xCLEdBQUcsSUFBSSxLQUFLLENBQUM7Z0JBQ2IsSUFBSSxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxLQUFLLEdBQUcsQ0FBQyxDQUFDLENBQUM7Z0JBQzVDLEtBQUssR0FBRyxJQUFJLENBQUMsZUFBZSxDQUFDLElBQUksQ0FBQyxLQUFLLEVBQUUsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO2FBQ3JEO1NBQ0Y7UUFDRCxJQUFJLENBQUMsR0FBRyxHQUFHLEdBQUcsQ0FBQztRQUNmLE9BQU8sSUFBSSxDQUFDOzs7Ozs7O0lBR04sU0FBUyxDQUFDLElBQWEsRUFBRSxLQUFhO1FBQzVDLEtBQUssR0FBRyxDQUFDLEtBQUssQ0FBQztRQUNmLElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsS0FBSyxHQUFHLENBQUMsSUFBSSxFQUFFLENBQUMsQ0FBQztRQUNyRCxJQUFJLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLEtBQUssR0FBRyxDQUFDLElBQUksRUFBRSxHQUFHLEVBQUUsSUFBSSxFQUFFLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDMUQsT0FBTyxJQUFJLENBQUM7Ozs7Ozs7SUFHTixRQUFRLENBQUMsSUFBYSxFQUFFLElBQVk7UUFDMUMsSUFBSSxDQUFDLElBQUksR0FBRyxDQUFDLElBQUksQ0FBQztRQUNsQixPQUFPLElBQUksQ0FBQzs7OztZQTNHZixVQUFVOzs7Ozs7O0FDTFg7Ozs7O0FBT0EsMkJBQTJCLEtBQWE7SUFDdEMsT0FBTyxDQUFDLEVBQUUsR0FBRyxFQUFFLEdBQUcsS0FBSyxJQUFJLEVBQUUsR0FBRyxFQUFFLENBQUM7Q0FDcEM7Ozs7OztBQUtELDZCQUE2QixLQUFXOztJQUN0QyxNQUFNLElBQUksR0FBRyxLQUFLLENBQUMsV0FBVyxFQUFFLENBQUM7SUFDakMsT0FBTyxJQUFJLEdBQUcsQ0FBQyxLQUFLLENBQUMsSUFBSSxJQUFJLEdBQUcsR0FBRyxLQUFLLENBQUMsSUFBSSxJQUFJLEdBQUcsR0FBRyxLQUFLLENBQUMsQ0FBQztDQUMvRDs7Ozs7Ozs7O0FBT0QsOEJBQThCLEtBQWEsRUFBRSxNQUFjO0lBQ3pELE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLEdBQUcsTUFBTSxDQUFDLEdBQUcsQ0FBQyxLQUFLLEdBQUcsQ0FBQyxJQUFJLEdBQUcsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxHQUFHLEVBQUUsR0FBRyxLQUFLLElBQUksSUFBSSxDQUFDLENBQUM7Q0FDM0Y7Ozs7Ozs7QUFNRCw2QkFBNkIsSUFBWTtJQUN2QyxPQUFPLENBQUMsSUFBSSxHQUFHLENBQUMsSUFBSSxHQUFHLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsR0FBRyxFQUFFLEdBQUcsSUFBSSxJQUFJLElBQUksQ0FBQyxDQUFDO0NBQzlEOzs7Ozs7QUFFRCxhQUFhLENBQVMsRUFBRSxDQUFTO0lBQy9CLE9BQU8sQ0FBQyxHQUFHLENBQUMsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztDQUNsQzs7Ozs7Ozs7O0FBV0QsTUFBTSxlQUFlLEdBQUcsU0FBUyxDQUFDOztBQUNsQyxNQUFNLGFBQWEsR0FBRyxTQUFTLENBQUM7QUFHaEMsNkJBQXFDLFNBQVEsZ0JBQWdCOzs7Ozs7O0lBSzNELGFBQWEsQ0FBQyxLQUFXOztRQUN2QixNQUFNLEtBQUssR0FBRyxLQUFLLENBQUMsV0FBVyxFQUFFLENBQW9EOztRQUFyRixNQUFtQyxNQUFNLEdBQUcsS0FBSyxDQUFDLFFBQVEsRUFBRSxDQUF5Qjs7UUFBckYsTUFBOEQsSUFBSSxHQUFHLEtBQUssQ0FBQyxPQUFPLEVBQUUsQ0FBQzs7UUFFckYsSUFBSSxTQUFTLEdBQUcsZUFBZSxHQUFHLENBQUMsR0FBRyxHQUFHLElBQUksS0FBSyxHQUFHLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxLQUFLLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUNqRixDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxLQUFLLEdBQUcsQ0FBQyxJQUFJLEdBQUcsQ0FBQyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxLQUFLLEdBQUcsQ0FBQyxJQUFJLEdBQUcsQ0FBQztZQUM5RCxJQUFJLENBQUMsS0FBSyxDQUNOLENBQUMsR0FBRyxJQUFJLE1BQU0sR0FBRyxDQUFDLENBQUMsR0FBRyxHQUFHLElBQUksRUFBRSxJQUFJLE1BQU0sR0FBRyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsR0FBRyxtQkFBbUIsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxDQUFDO1FBQy9HLFNBQVMsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLFNBQVMsQ0FBQyxHQUFHLEdBQUcsQ0FBQzs7UUFFeEMsTUFBTSxJQUFJLEdBQUcsU0FBUyxHQUFHLGFBQWEsQ0FBQzs7UUFDdkMsTUFBTSxLQUFLLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUUsR0FBRyxJQUFJLEdBQUcsS0FBSyxJQUFJLE9BQU8sQ0FBQyxDQUFDOztRQUN4RCxJQUFJLE1BQU0sR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsSUFBSSxHQUFHLEVBQUUsR0FBRyxtQkFBbUIsQ0FBQyxLQUFLLENBQUMsSUFBSSxJQUFJLENBQUMsQ0FBQztRQUN4RSxNQUFNLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxNQUFNLEVBQUUsRUFBRSxDQUFDLENBQUM7O1FBQzlCLE1BQU0sSUFBSSxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxHQUFHLG9CQUFvQixDQUFDLEtBQUssRUFBRSxNQUFNLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUN2RSxPQUFPLElBQUksT0FBTyxDQUFDLEtBQUssRUFBRSxNQUFNLEdBQUcsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDO0tBQzdDOzs7Ozs7O0lBTUQsV0FBVyxDQUFDLEtBQWM7O1FBQ3hCLE1BQU0sS0FBSyxHQUFHLEtBQUssQ0FBQyxJQUFJLENBQUM7O1FBQ3pCLE1BQU0sTUFBTSxHQUFHLEtBQUssQ0FBQyxLQUFLLEdBQUcsQ0FBQyxDQUFDOztRQUMvQixNQUFNLElBQUksR0FBRyxLQUFLLENBQUMsR0FBRyxDQUFDOztRQUN2QixNQUFNLFNBQVMsR0FDWCxJQUFJLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLEdBQUcsTUFBTSxDQUFDLEdBQUcsQ0FBQyxLQUFLLEdBQUcsQ0FBQyxJQUFJLEdBQUcsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxHQUFHLEVBQUUsR0FBRyxLQUFLLElBQUksRUFBRSxDQUFDLEdBQUcsYUFBYSxHQUFHLENBQUMsQ0FBQzs7UUFFaEgsTUFBTSxHQUFHLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxTQUFTLEdBQUcsR0FBRyxDQUFDLEdBQUcsR0FBRyxDQUdOOztRQUh2QyxNQUErQyxNQUFNLEdBQUcsR0FBRyxHQUFHLGVBQWUsQ0FHdEM7O1FBSHZDLE1BQ00sVUFBVSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxHQUFHLE1BQU0sQ0FBQyxDQUVQOztRQUh2QyxNQUNnRCxHQUFHLEdBQUcsR0FBRyxDQUFDLE1BQU0sRUFBRSxNQUFNLENBQUMsQ0FFbEM7O1FBSHZDLE1BQzJFLElBQUksR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLEdBQUcsR0FBRyxLQUFLLENBQUMsQ0FFbEU7O1FBSHZDLE1BRU0sS0FBSyxHQUFHLEdBQUcsQ0FBQyxHQUFHLEVBQUUsS0FBSyxDQUFDLENBQ1U7O1FBSHZDLE1BRStCLElBQUksR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUMsQ0FDdkI7O1FBSHZDLE1BRWdFLEtBQUssR0FBRyxHQUFHLENBQUMsS0FBSyxFQUFFLElBQUksQ0FBQyxDQUNqRDs7UUFIdkMsTUFHTSxNQUFNLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLEdBQUcsR0FBRyxDQUFDLENBQUM7O1FBQ3ZDLElBQUksSUFBSSxHQUFHLFVBQVUsR0FBRyxHQUFHLEdBQUcsSUFBSSxHQUFHLEdBQUcsR0FBRyxJQUFJLEdBQUcsQ0FBQyxHQUFHLE1BQU0sQ0FBQztRQUM3RCxJQUFJLEVBQUUsSUFBSSxLQUFLLENBQUMsSUFBSSxNQUFNLEtBQUssQ0FBQyxDQUFDLEVBQUU7WUFDakMsSUFBSSxFQUFFLENBQUM7U0FDUjs7UUFFRCxNQUFNLFVBQVUsR0FBRyxlQUFlLEdBQUcsR0FBRyxJQUFJLElBQUksR0FBRyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsSUFBSSxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsSUFBSSxHQUFHLENBQUMsSUFBSSxHQUFHLENBQUM7WUFDN0csSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLElBQUksR0FBRyxDQUFDLElBQUksR0FBRyxDQUFDLENBQUM7O1FBRWpDLE1BQU0sT0FBTyxHQUFHLEdBQUcsR0FBRyxVQUFVLENBQUM7O1FBRWpDLE1BQU0sR0FBRyxHQUFHLGVBQWUsR0FBRyxDQUFDLEdBQUcsR0FBRyxJQUFJLElBQUksR0FBRyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsSUFBSSxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsSUFBSSxHQUFHLENBQUMsSUFBSSxHQUFHLENBQUM7WUFDMUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLElBQUksR0FBRyxDQUFDLElBQUksR0FBRyxDQUFDLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxHQUFHLEdBQUcsRUFBRSxJQUFJLG1CQUFtQixDQUFDLElBQUksSUFBSSxDQUFDLElBQUksRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDOztRQUVwSCxNQUFNLE9BQU8sR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLENBQUMsR0FBRyxtQkFBbUIsQ0FBQyxJQUFJLElBQUksQ0FBQyxJQUFJLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQzs7UUFFbEYsTUFBTSxLQUFLLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsT0FBTyxHQUFHLE9BQU8sSUFBSSxFQUFFLEdBQUcsR0FBRyxJQUFJLEdBQUcsQ0FBQyxDQUFDOztRQUNqRSxNQUFNLElBQUksR0FBRyxlQUFlLEdBQUcsQ0FBQyxHQUFHLEdBQUcsSUFBSSxJQUFJLEdBQUcsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLElBQUksR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLElBQUksR0FBRyxDQUFDLElBQUksR0FBRyxDQUFDO1lBQzNHLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxJQUFJLEdBQUcsQ0FBQyxJQUFJLEdBQUcsQ0FBQztZQUM1QixJQUFJLENBQUMsS0FBSyxDQUNOLENBQUMsR0FBRyxHQUFHLEtBQUssR0FBRyxHQUFHLElBQUksRUFBRSxJQUFJLEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxHQUFHLG1CQUFtQixDQUFDLElBQUksSUFBSSxDQUFDLElBQUksRUFBRSxLQUFLLEdBQUcsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7Z0JBQ3pHLENBQUMsQ0FBQyxDQUFDOztRQUVYLE1BQU0sR0FBRyxHQUFHLEdBQUcsR0FBRyxJQUFJLEdBQUcsQ0FBQyxDQUFDO1FBRTNCLE9BQU8sSUFBSSxJQUFJLENBQUMsSUFBSSxFQUFFLEtBQUssR0FBRyxDQUFDLEVBQUUsR0FBRyxDQUFDLENBQUM7S0FDdkM7Ozs7Ozs7OztJQU9ELGVBQWUsQ0FBQyxLQUFhLEVBQUUsSUFBWTtRQUN6QyxJQUFJLEdBQUcsSUFBSSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxHQUFHLEVBQUUsQ0FBQyxDQUFDO1FBQ3JDLEtBQUssR0FBRyxDQUFDLENBQUMsS0FBSyxHQUFHLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxDQUFDOztRQUMvQixJQUFJLE1BQU0sR0FBRyxFQUFFLEdBQUcsS0FBSyxHQUFHLENBQUMsQ0FBQztRQUM1QixJQUFJLEtBQUssS0FBSyxFQUFFLElBQUksaUJBQWlCLENBQUMsSUFBSSxDQUFDLEVBQUU7WUFDM0MsTUFBTSxFQUFFLENBQUM7U0FDVjtRQUNELE9BQU8sTUFBTSxDQUFDO0tBQ2Y7OztZQTlFRixVQUFVOzs7Ozs7O0FDcERYOzs7Ozs7QUFXQSxNQUFNLG9CQUFvQixHQUFHLElBQUksSUFBSSxDQUFDLElBQUksRUFBRSxFQUFFLEVBQUUsRUFBRSxDQUFDLENBQUM7O0FBQ3BELE1BQU0sbUJBQW1CLEdBQUcsSUFBSSxJQUFJLENBQUMsSUFBSSxFQUFFLEVBQUUsRUFBRSxFQUFFLENBQUMsQ0FBQzs7QUFDbkQsTUFBTSxXQUFXLEdBQUcsSUFBSSxDQUFDOztBQUN6QixNQUFNLFNBQVMsR0FBRyxJQUFJLENBQUM7O0FBQ3ZCLE1BQU0sT0FBTyxHQUFHLElBQUksR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsQ0FBQzs7QUFFcEMsTUFBTSxZQUFZLEdBQUc7SUFFbkIsY0FBYyxFQUFFLGNBQWMsRUFBRSxjQUFjLEVBQUUsY0FBYyxFQUFFLGNBQWM7SUFFOUUsY0FBYyxFQUFFLGNBQWMsRUFBRSxjQUFjLEVBQUUsY0FBYyxFQUFFLGNBQWM7SUFFOUUsY0FBYyxFQUFFLGNBQWMsRUFBRSxjQUFjLEVBQUUsY0FBYyxFQUFFLGNBQWM7SUFFOUUsY0FBYyxFQUFFLGNBQWMsRUFBRSxjQUFjLEVBQUUsY0FBYyxFQUFFLGNBQWM7SUFFOUUsY0FBYyxFQUFFLGNBQWMsRUFBRSxjQUFjLEVBQUUsY0FBYyxFQUFFLGNBQWM7SUFFOUUsY0FBYyxFQUFFLGNBQWMsRUFBRSxjQUFjLEVBQUUsY0FBYyxFQUFFLGNBQWM7SUFFOUUsY0FBYyxFQUFFLGNBQWMsRUFBRSxjQUFjLEVBQUUsY0FBYyxFQUFFLGNBQWM7SUFFOUUsY0FBYyxFQUFFLGNBQWMsRUFBRSxjQUFjLEVBQUUsY0FBYyxFQUFFLGNBQWM7SUFFOUUsY0FBYyxFQUFFLGNBQWMsRUFBRSxjQUFjLEVBQUUsY0FBYyxFQUFFLGNBQWM7SUFFOUUsY0FBYyxFQUFFLGNBQWMsRUFBRSxjQUFjLEVBQUUsY0FBYyxFQUFFLGNBQWM7SUFFOUUsY0FBYyxFQUFFLGNBQWMsRUFBRSxjQUFjLEVBQUUsY0FBYyxFQUFFLGNBQWM7SUFFOUUsY0FBYyxFQUFFLGNBQWMsRUFBRSxjQUFjLEVBQUUsY0FBYyxFQUFFLGNBQWM7SUFFOUUsY0FBYyxFQUFFLGNBQWMsRUFBRSxjQUFjLEVBQUUsY0FBYyxFQUFFLGNBQWM7SUFFOUUsY0FBYyxFQUFFLGNBQWMsRUFBRSxjQUFjLEVBQUUsY0FBYyxFQUFFLGNBQWM7SUFFOUUsY0FBYyxFQUFFLGNBQWMsRUFBRSxjQUFjLEVBQUUsY0FBYyxFQUFFLGNBQWM7SUFFOUUsY0FBYyxFQUFFLGNBQWMsRUFBRSxjQUFjLEVBQUUsY0FBYyxFQUFFLGNBQWM7SUFFOUUsY0FBYyxFQUFFLGNBQWMsRUFBRSxjQUFjLEVBQUUsY0FBYyxFQUFFLGNBQWM7SUFFOUUsY0FBYyxFQUFFLGNBQWMsRUFBRSxjQUFjLEVBQUUsY0FBYyxFQUFFLGNBQWM7SUFFOUUsY0FBYyxFQUFFLGNBQWMsRUFBRSxjQUFjLEVBQUUsY0FBYyxFQUFFLGNBQWM7SUFFOUUsY0FBYyxFQUFFLGNBQWMsRUFBRSxjQUFjLEVBQUUsY0FBYyxFQUFFLGNBQWM7SUFFOUUsY0FBYyxFQUFFLGNBQWMsRUFBRSxjQUFjLEVBQUUsY0FBYyxFQUFFLGNBQWM7SUFFOUUsY0FBYyxFQUFFLGNBQWMsRUFBRSxjQUFjLEVBQUUsY0FBYyxFQUFFLGNBQWM7SUFFOUUsY0FBYyxFQUFFLGNBQWMsRUFBRSxjQUFjLEVBQUUsY0FBYyxFQUFFLGNBQWM7SUFFOUUsY0FBYyxFQUFFLGNBQWMsRUFBRSxjQUFjLEVBQUUsY0FBYyxFQUFFLGNBQWM7SUFFOUUsY0FBYyxFQUFFLGNBQWMsRUFBRSxjQUFjLEVBQUUsY0FBYyxFQUFFLGNBQWM7SUFFOUUsY0FBYyxFQUFFLGNBQWMsRUFBRSxjQUFjLEVBQUUsY0FBYyxFQUFFLGNBQWM7SUFFOUUsY0FBYyxFQUFFLGNBQWMsRUFBRSxjQUFjLEVBQUUsY0FBYyxFQUFFLGNBQWM7SUFFOUUsY0FBYyxFQUFFLGNBQWMsRUFBRSxjQUFjLEVBQUUsY0FBYyxFQUFFLGNBQWM7SUFFOUUsY0FBYyxFQUFFLGNBQWMsRUFBRSxjQUFjLEVBQUUsY0FBYyxFQUFFLGNBQWM7SUFFOUUsY0FBYyxFQUFFLGNBQWMsRUFBRSxjQUFjLEVBQUUsY0FBYyxFQUFFLGNBQWM7SUFFOUUsY0FBYyxFQUFFLGNBQWMsRUFBRSxjQUFjLEVBQUUsY0FBYyxFQUFFLGNBQWM7SUFFOUUsY0FBYyxFQUFFLGNBQWMsRUFBRSxjQUFjLEVBQUUsY0FBYyxFQUFFLGNBQWM7SUFFOUUsY0FBYyxFQUFFLGNBQWMsRUFBRSxjQUFjLEVBQUUsY0FBYyxFQUFFLGNBQWM7SUFFOUUsY0FBYyxFQUFFLGNBQWMsRUFBRSxjQUFjLEVBQUUsY0FBYyxFQUFFLGNBQWM7SUFFOUUsY0FBYyxFQUFFLGNBQWMsRUFBRSxjQUFjLEVBQUUsY0FBYyxFQUFFLGNBQWM7SUFFOUUsY0FBYyxFQUFFLGNBQWMsRUFBRSxjQUFjLEVBQUUsY0FBYyxFQUFFLGNBQWM7SUFFOUUsY0FBYyxFQUFFLGNBQWMsRUFBRSxjQUFjLEVBQUUsY0FBYyxFQUFFLGNBQWM7SUFFOUUsY0FBYyxFQUFFLGNBQWMsRUFBRSxjQUFjLEVBQUUsY0FBYyxFQUFFLGNBQWM7SUFFOUUsY0FBYyxFQUFFLGNBQWMsRUFBRSxjQUFjLEVBQUUsY0FBYyxFQUFFLGNBQWM7SUFFOUUsY0FBYyxFQUFFLGNBQWMsRUFBRSxjQUFjLEVBQUUsY0FBYyxFQUFFLGNBQWM7SUFFOUUsY0FBYyxFQUFFLGNBQWMsRUFBRSxjQUFjLEVBQUUsY0FBYyxFQUFFLGNBQWM7SUFFOUUsY0FBYyxFQUFFLGNBQWMsRUFBRSxjQUFjLEVBQUUsY0FBYyxFQUFFLGNBQWM7SUFFOUUsY0FBYyxFQUFFLGNBQWMsRUFBRSxjQUFjLEVBQUUsY0FBYyxFQUFFLGNBQWM7SUFFOUUsY0FBYyxFQUFFLGNBQWMsRUFBRSxjQUFjLEVBQUUsY0FBYyxFQUFFLGNBQWM7SUFFOUUsY0FBYyxFQUFFLGNBQWMsRUFBRSxjQUFjLEVBQUUsY0FBYyxFQUFFLGNBQWM7SUFFOUUsY0FBYyxFQUFFLGNBQWMsRUFBRSxjQUFjLEVBQUUsY0FBYyxFQUFFLGNBQWM7SUFFOUUsY0FBYyxFQUFFLGNBQWMsRUFBRSxjQUFjLEVBQUUsY0FBYyxFQUFFLGNBQWM7SUFFOUUsY0FBYyxF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