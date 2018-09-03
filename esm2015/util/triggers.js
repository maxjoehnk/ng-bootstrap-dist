/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
export class Trigger {
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
if (false) {
    /** @type {?} */
    Trigger.prototype.open;
    /** @type {?} */
    Trigger.prototype.close;
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
export function parseTriggers(triggers, aliases = DEFAULT_ALIASES) {
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
const ɵ0 = noopFn;
/**
 * @param {?} renderer
 * @param {?} nativeElement
 * @param {?} triggers
 * @param {?} openFn
 * @param {?} closeFn
 * @param {?} toggleFn
 * @return {?}
 */
export function listenToTriggers(renderer, nativeElement, triggers, openFn, closeFn, toggleFn) {
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
export { ɵ0 };

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHJpZ2dlcnMuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AbmctYm9vdHN0cmFwL25nLWJvb3RzdHJhcC8iLCJzb3VyY2VzIjpbInV0aWwvdHJpZ2dlcnMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE1BQU07Ozs7O0lBQ0osWUFBbUIsSUFBWSxFQUFTLEtBQWM7UUFBbkMsU0FBSSxHQUFKLElBQUksQ0FBUTtRQUFTLFVBQUssR0FBTCxLQUFLLENBQVM7UUFDcEQsRUFBRSxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO1lBQ1gsSUFBSSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUM7U0FDbkI7S0FDRjs7OztJQUVELFFBQVEsS0FBSyxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksS0FBSyxRQUFRLElBQUksSUFBSSxDQUFDLEtBQUssS0FBSyxRQUFRLENBQUMsRUFBRTtDQUN6RTs7Ozs7Ozs7QUFFRCxNQUFNLGVBQWUsR0FBRztJQUN0QixPQUFPLEVBQUUsQ0FBQyxZQUFZLEVBQUUsWUFBWSxDQUFDO0NBQ3RDLENBQUM7Ozs7OztBQUVGLE1BQU0sd0JBQXdCLFFBQWdCLEVBQUUsT0FBTyxHQUFHLGVBQWU7O0lBQ3ZFLE1BQU0sZUFBZSxHQUFHLENBQUMsUUFBUSxJQUFJLEVBQUUsQ0FBQyxDQUFDLElBQUksRUFBRSxDQUFDO0lBRWhELEVBQUUsQ0FBQyxDQUFDLGVBQWUsQ0FBQyxNQUFNLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUNqQyxNQUFNLENBQUMsRUFBRSxDQUFDO0tBQ1g7O0lBRUQsTUFBTSxjQUFjLEdBQUcsZUFBZSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLEVBQUUsQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsV0FBVyxFQUFFLEVBQUU7O1FBQ3pHLElBQUksS0FBSyxHQUFHLE9BQU8sQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxXQUFXLENBQUM7UUFDbkQsTUFBTSxDQUFDLElBQUksT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsRUFBRSxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztLQUN4QyxDQUFDLENBQUM7O0lBRUgsTUFBTSxjQUFjLEdBQUcsY0FBYyxDQUFDLE1BQU0sQ0FBQyxXQUFXLENBQUMsRUFBRSxDQUFDLFdBQVcsQ0FBQyxRQUFRLEVBQUUsQ0FBQyxDQUFDO0lBRXBGLEVBQUUsQ0FBQyxDQUFDLGNBQWMsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUM5QixNQUFNLDBEQUEwRCxDQUFDO0tBQ2xFO0lBRUQsRUFBRSxDQUFDLENBQUMsY0FBYyxDQUFDLE1BQU0sS0FBSyxDQUFDLElBQUksY0FBYyxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQzdELE1BQU0sMEVBQTBFLENBQUM7S0FDbEY7SUFFRCxNQUFNLENBQUMsY0FBYyxDQUFDO0NBQ3ZCOztBQUVELE1BQU0sTUFBTSxHQUFHLEdBQUcsRUFBRSxJQUFHLENBQUM7Ozs7Ozs7Ozs7O0FBRXhCLE1BQU0sMkJBQTJCLFFBQWEsRUFBRSxhQUFrQixFQUFFLFFBQWdCLEVBQUUsTUFBTSxFQUFFLE9BQU8sRUFBRSxRQUFROztJQUM3RyxNQUFNLGNBQWMsR0FBRyxhQUFhLENBQUMsUUFBUSxDQUFDLENBQUM7O0lBQy9DLE1BQU0sU0FBUyxHQUFHLEVBQUUsQ0FBQztJQUVyQixFQUFFLENBQUMsQ0FBQyxjQUFjLENBQUMsTUFBTSxLQUFLLENBQUMsSUFBSSxjQUFjLENBQUMsQ0FBQyxDQUFDLENBQUMsUUFBUSxFQUFFLENBQUMsQ0FBQyxDQUFDO1FBQ2hFLE1BQU0sQ0FBQyxNQUFNLENBQUM7S0FDZjtJQUVELGNBQWMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxPQUFnQixFQUFFLEVBQUU7UUFDMUMsRUFBRSxDQUFDLENBQUMsT0FBTyxDQUFDLElBQUksS0FBSyxPQUFPLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQztZQUNuQyxTQUFTLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsYUFBYSxFQUFFLE9BQU8sQ0FBQyxJQUFJLEVBQUUsUUFBUSxDQUFDLENBQUMsQ0FBQztTQUN4RTtRQUFDLElBQUksQ0FBQyxDQUFDO1lBQ04sU0FBUyxDQUFDLElBQUksQ0FDVixRQUFRLENBQUMsTUFBTSxDQUFDLGFBQWEsRUFBRSxPQUFPLENBQUMsSUFBSSxFQUFFLE1BQU0sQ0FBQyxFQUFFLFFBQVEsQ0FBQyxNQUFNLENBQUMsYUFBYSxFQUFFLE9BQU8sQ0FBQyxLQUFLLEVBQUUsT0FBTyxDQUFDLENBQUMsQ0FBQztTQUNuSDtLQUNGLENBQUMsQ0FBQztJQUVILE1BQU0sQ0FBQyxHQUFHLEVBQUUsR0FBRyxTQUFTLENBQUMsT0FBTyxDQUFDLGFBQWEsQ0FBQyxFQUFFLENBQUMsYUFBYSxFQUFFLENBQUMsQ0FBQyxFQUFFLENBQUM7Q0FDdkUiLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnQgY2xhc3MgVHJpZ2dlciB7XHJcbiAgY29uc3RydWN0b3IocHVibGljIG9wZW46IHN0cmluZywgcHVibGljIGNsb3NlPzogc3RyaW5nKSB7XHJcbiAgICBpZiAoIWNsb3NlKSB7XHJcbiAgICAgIHRoaXMuY2xvc2UgPSBvcGVuO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgaXNNYW51YWwoKSB7IHJldHVybiB0aGlzLm9wZW4gPT09ICdtYW51YWwnIHx8IHRoaXMuY2xvc2UgPT09ICdtYW51YWwnOyB9XHJcbn1cclxuXHJcbmNvbnN0IERFRkFVTFRfQUxJQVNFUyA9IHtcclxuICAnaG92ZXInOiBbJ21vdXNlZW50ZXInLCAnbW91c2VsZWF2ZSddXHJcbn07XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gcGFyc2VUcmlnZ2Vycyh0cmlnZ2Vyczogc3RyaW5nLCBhbGlhc2VzID0gREVGQVVMVF9BTElBU0VTKTogVHJpZ2dlcltdIHtcclxuICBjb25zdCB0cmltbWVkVHJpZ2dlcnMgPSAodHJpZ2dlcnMgfHwgJycpLnRyaW0oKTtcclxuXHJcbiAgaWYgKHRyaW1tZWRUcmlnZ2Vycy5sZW5ndGggPT09IDApIHtcclxuICAgIHJldHVybiBbXTtcclxuICB9XHJcblxyXG4gIGNvbnN0IHBhcnNlZFRyaWdnZXJzID0gdHJpbW1lZFRyaWdnZXJzLnNwbGl0KC9cXHMrLykubWFwKHRyaWdnZXIgPT4gdHJpZ2dlci5zcGxpdCgnOicpKS5tYXAoKHRyaWdnZXJQYWlyKSA9PiB7XHJcbiAgICBsZXQgYWxpYXMgPSBhbGlhc2VzW3RyaWdnZXJQYWlyWzBdXSB8fCB0cmlnZ2VyUGFpcjtcclxuICAgIHJldHVybiBuZXcgVHJpZ2dlcihhbGlhc1swXSwgYWxpYXNbMV0pO1xyXG4gIH0pO1xyXG5cclxuICBjb25zdCBtYW51YWxUcmlnZ2VycyA9IHBhcnNlZFRyaWdnZXJzLmZpbHRlcih0cmlnZ2VyUGFpciA9PiB0cmlnZ2VyUGFpci5pc01hbnVhbCgpKTtcclxuXHJcbiAgaWYgKG1hbnVhbFRyaWdnZXJzLmxlbmd0aCA+IDEpIHtcclxuICAgIHRocm93ICdUcmlnZ2VycyBwYXJzZSBlcnJvcjogb25seSBvbmUgbWFudWFsIHRyaWdnZXIgaXMgYWxsb3dlZCc7XHJcbiAgfVxyXG5cclxuICBpZiAobWFudWFsVHJpZ2dlcnMubGVuZ3RoID09PSAxICYmIHBhcnNlZFRyaWdnZXJzLmxlbmd0aCA+IDEpIHtcclxuICAgIHRocm93ICdUcmlnZ2VycyBwYXJzZSBlcnJvcjogbWFudWFsIHRyaWdnZXIgY2FuXFwndCBiZSBtaXhlZCB3aXRoIG90aGVyIHRyaWdnZXJzJztcclxuICB9XHJcblxyXG4gIHJldHVybiBwYXJzZWRUcmlnZ2VycztcclxufVxyXG5cclxuY29uc3Qgbm9vcEZuID0gKCkgPT4ge307XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gbGlzdGVuVG9UcmlnZ2VycyhyZW5kZXJlcjogYW55LCBuYXRpdmVFbGVtZW50OiBhbnksIHRyaWdnZXJzOiBzdHJpbmcsIG9wZW5GbiwgY2xvc2VGbiwgdG9nZ2xlRm4pIHtcclxuICBjb25zdCBwYXJzZWRUcmlnZ2VycyA9IHBhcnNlVHJpZ2dlcnModHJpZ2dlcnMpO1xyXG4gIGNvbnN0IGxpc3RlbmVycyA9IFtdO1xyXG5cclxuICBpZiAocGFyc2VkVHJpZ2dlcnMubGVuZ3RoID09PSAxICYmIHBhcnNlZFRyaWdnZXJzWzBdLmlzTWFudWFsKCkpIHtcclxuICAgIHJldHVybiBub29wRm47XHJcbiAgfVxyXG5cclxuICBwYXJzZWRUcmlnZ2Vycy5mb3JFYWNoKCh0cmlnZ2VyOiBUcmlnZ2VyKSA9PiB7XHJcbiAgICBpZiAodHJpZ2dlci5vcGVuID09PSB0cmlnZ2VyLmNsb3NlKSB7XHJcbiAgICAgIGxpc3RlbmVycy5wdXNoKHJlbmRlcmVyLmxpc3RlbihuYXRpdmVFbGVtZW50LCB0cmlnZ2VyLm9wZW4sIHRvZ2dsZUZuKSk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBsaXN0ZW5lcnMucHVzaChcclxuICAgICAgICAgIHJlbmRlcmVyLmxpc3RlbihuYXRpdmVFbGVtZW50LCB0cmlnZ2VyLm9wZW4sIG9wZW5GbiksIHJlbmRlcmVyLmxpc3RlbihuYXRpdmVFbGVtZW50LCB0cmlnZ2VyLmNsb3NlLCBjbG9zZUZuKSk7XHJcbiAgICB9XHJcbiAgfSk7XHJcblxyXG4gIHJldHVybiAoKSA9PiB7IGxpc3RlbmVycy5mb3JFYWNoKHVuc3Vic2NyaWJlRm4gPT4gdW5zdWJzY3JpYmVGbigpKTsgfTtcclxufVxyXG4iXX0=