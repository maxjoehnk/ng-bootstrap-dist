import { ApplicationRef, ComponentFactoryResolver, Injector, RendererFactory2 } from '@angular/core';
import { ScrollBar } from '../util/scrollbar';
import { NgbModalRef } from './modal-ref';
export declare class NgbModalStack {
    private _applicationRef;
    private _injector;
    private _document;
    private _scrollBar;
    private _rendererFactory;
    private _windowAttributes;
    private _backdropAttributes;
    private _modalRefs;
    private _windowCmpts;
    private _activeWindowCmptHasChanged;
    constructor(_applicationRef: ApplicationRef, _injector: Injector, _document: any, _scrollBar: ScrollBar, _rendererFactory: RendererFactory2);
    open(moduleCFR: ComponentFactoryResolver, contentInjector: Injector, content: any, options: any): NgbModalRef;
    dismissAll(reason?: any): void;
    private _attachBackdrop(moduleCFR, containerEl);
    private _attachWindowComponent(moduleCFR, containerEl, contentRef);
    private _applyWindowOptions(windowInstance, options);
    private _applyBackdropOptions(backdropInstance, options);
    private _getContentRef(moduleCFR, contentInjector, content, activeModal);
    private _createFromTemplateRef(content, activeModal);
    private _createFromString(content);
    private _createFromComponent(moduleCFR, contentInjector, content, context);
    private _registerModalRef(ngbModalRef);
    private _registerWindowCmpt(ngbWindowCmpt);
}
