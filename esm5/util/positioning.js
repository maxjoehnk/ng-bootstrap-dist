/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
var Positioning = /** @class */ (function () {
    function Positioning() {
    }
    /**
     * @param {?} element
     * @return {?}
     */
    Positioning.prototype.getAllStyles = /**
     * @param {?} element
     * @return {?}
     */
    function (element) { return window.getComputedStyle(element); };
    /**
     * @param {?} element
     * @param {?} prop
     * @return {?}
     */
    Positioning.prototype.getStyle = /**
     * @param {?} element
     * @param {?} prop
     * @return {?}
     */
    function (element, prop) { return this.getAllStyles(element)[prop]; };
    /**
     * @param {?} element
     * @return {?}
     */
    Positioning.prototype.isStaticPositioned = /**
     * @param {?} element
     * @return {?}
     */
    function (element) {
        return (this.getStyle(element, 'position') || 'static') === 'static';
    };
    /**
     * @param {?} element
     * @return {?}
     */
    Positioning.prototype.offsetParent = /**
     * @param {?} element
     * @return {?}
     */
    function (element) {
        /** @type {?} */
        var offsetParentEl = /** @type {?} */ (element.offsetParent) || document.documentElement;
        while (offsetParentEl && offsetParentEl !== document.documentElement && this.isStaticPositioned(offsetParentEl)) {
            offsetParentEl = /** @type {?} */ (offsetParentEl.offsetParent);
        }
        return offsetParentEl || document.documentElement;
    };
    /**
     * @param {?} element
     * @param {?=} round
     * @return {?}
     */
    Positioning.prototype.position = /**
     * @param {?} element
     * @param {?=} round
     * @return {?}
     */
    function (element, round) {
        if (round === void 0) { round = true; }
        /** @type {?} */
        var elPosition;
        /** @type {?} */
        var parentOffset = { width: 0, height: 0, top: 0, bottom: 0, left: 0, right: 0 };
        if (this.getStyle(element, 'position') === 'fixed') {
            elPosition = element.getBoundingClientRect();
        }
        else {
            /** @type {?} */
            var offsetParentEl = this.offsetParent(element);
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
    };
    /**
     * @param {?} element
     * @param {?=} round
     * @return {?}
     */
    Positioning.prototype.offset = /**
     * @param {?} element
     * @param {?=} round
     * @return {?}
     */
    function (element, round) {
        if (round === void 0) { round = true; }
        /** @type {?} */
        var elBcr = element.getBoundingClientRect();
        /** @type {?} */
        var viewportOffset = {
            top: window.pageYOffset - document.documentElement.clientTop,
            left: window.pageXOffset - document.documentElement.clientLeft
        };
        /** @type {?} */
        var elOffset = {
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
    };
    /**
     * @param {?} hostElement
     * @param {?} targetElement
     * @param {?} placement
     * @param {?=} appendToBody
     * @return {?}
     */
    Positioning.prototype.positionElements = /**
     * @param {?} hostElement
     * @param {?} targetElement
     * @param {?} placement
     * @param {?=} appendToBody
     * @return {?}
     */
    function (hostElement, targetElement, placement, appendToBody) {
        /** @type {?} */
        var hostElPosition = appendToBody ? this.offset(hostElement, false) : this.position(hostElement, false);
        /** @type {?} */
        var targetElStyles = this.getAllStyles(targetElement);
        /** @type {?} */
        var targetElBCR = targetElement.getBoundingClientRect();
        /** @type {?} */
        var placementPrimary = placement.split('-')[0] || 'top';
        /** @type {?} */
        var placementSecondary = placement.split('-')[1] || 'center';
        /** @type {?} */
        var targetElPosition = {
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
    };
    // get the available placements of the target element in the viewport depending on the host element
    /**
     * @param {?} hostElement
     * @param {?} targetElement
     * @return {?}
     */
    Positioning.prototype.getAvailablePlacements = /**
     * @param {?} hostElement
     * @param {?} targetElement
     * @return {?}
     */
    function (hostElement, targetElement) {
        /** @type {?} */
        var availablePlacements = [];
        /** @type {?} */
        var hostElemClientRect = hostElement.getBoundingClientRect();
        /** @type {?} */
        var targetElemClientRect = targetElement.getBoundingClientRect();
        /** @type {?} */
        var html = document.documentElement;
        /** @type {?} */
        var windowHeight = window.innerHeight || html.clientHeight;
        /** @type {?} */
        var windowWidth = window.innerWidth || html.clientWidth;
        /** @type {?} */
        var hostElemClientRectHorCenter = hostElemClientRect.left + hostElemClientRect.width / 2;
        /** @type {?} */
        var hostElemClientRectVerCenter = hostElemClientRect.top + hostElemClientRect.height / 2;
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
    };
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
    Positioning.prototype.setSecondaryPlacementForLeftRight = /**
     * check if secondary placement for left and right are available i.e. left-top, left-bottom, right-top, right-bottom
     * primaryplacement: left|right
     * availablePlacementArr: array in which available placements to be set
     * @param {?} hostElemClientRect
     * @param {?} targetElemClientRect
     * @param {?} primaryPlacement
     * @param {?} availablePlacementArr
     * @return {?}
     */
    function (hostElemClientRect, targetElemClientRect, primaryPlacement, availablePlacementArr) {
        /** @type {?} */
        var html = document.documentElement;
        // check for left-bottom
        if (targetElemClientRect.height <= hostElemClientRect.bottom) {
            availablePlacementArr.splice(availablePlacementArr.length, 1, primaryPlacement + '-bottom');
        }
        if ((window.innerHeight || html.clientHeight) - hostElemClientRect.top >= targetElemClientRect.height) {
            availablePlacementArr.splice(availablePlacementArr.length, 1, primaryPlacement + '-top');
        }
    };
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
    Positioning.prototype.setSecondaryPlacementForTopBottom = /**
     * check if secondary placement for top and bottom are available i.e. top-left, top-right, bottom-left, bottom-right
     * primaryplacement: top|bottom
     * availablePlacementArr: array in which available placements to be set
     * @param {?} hostElemClientRect
     * @param {?} targetElemClientRect
     * @param {?} primaryPlacement
     * @param {?} availablePlacementArr
     * @return {?}
     */
    function (hostElemClientRect, targetElemClientRect, primaryPlacement, availablePlacementArr) {
        /** @type {?} */
        var html = document.documentElement;
        // check for left-bottom
        if ((window.innerWidth || html.clientWidth) - hostElemClientRect.left >= targetElemClientRect.width) {
            availablePlacementArr.splice(availablePlacementArr.length, 1, primaryPlacement + '-left');
        }
        if (targetElemClientRect.width <= hostElemClientRect.right) {
            availablePlacementArr.splice(availablePlacementArr.length, 1, primaryPlacement + '-right');
        }
    };
    return Positioning;
}());
export { Positioning };
/** @type {?} */
var positionService = new Positioning();
/**
 * @param {?} hostElement
 * @param {?} targetElement
 * @param {?} placement
 * @param {?=} appendToBody
 * @return {?}
 */
export function positionElements(hostElement, targetElement, placement, appendToBody) {
    /** @type {?} */
    var placementVals = Array.isArray(placement) ? placement : [/** @type {?} */ (placement)];
    /** @type {?} */
    var hasAuto = placementVals.findIndex(function (val) { return val === 'auto'; });
    if (hasAuto >= 0) {
        ['top', 'bottom', 'left', 'right', 'top-left', 'top-right', 'bottom-left', 'bottom-right', 'left-top',
            'left-bottom', 'right-top', 'right-bottom',
        ].forEach(function (obj) {
            if (placementVals.find(function (val) { return val.search('^' + obj) !== -1; }) == null) {
                placementVals.splice(hasAuto++, 1, /** @type {?} */ (obj));
            }
        });
    }
    /** @type {?} */
    var topVal = 0;
    /** @type {?} */
    var leftVal = 0;
    /** @type {?} */
    var appliedPlacement;
    /** @type {?} */
    var availablePlacements = positionService.getAvailablePlacements(hostElement, targetElement);
    var _loop_1 = function (item, index) {
        // check if passed placement is present in the available placement or otherwise apply the last placement in the
        // passed placement list
        if ((availablePlacements.find(function (val) { return val === item; }) != null) || (placementVals.length === index + 1)) {
            appliedPlacement = /** @type {?} */ (item);
            /** @type {?} */
            var pos = positionService.positionElements(hostElement, targetElement, item, appendToBody);
            topVal = pos.top;
            leftVal = pos.left;
            return "break";
        }
    };
    try {
        // iterate over all the passed placements
        for (var _a = tslib_1.__values(toItemIndexes(placementVals)), _b = _a.next(); !_b.done; _b = _a.next()) {
            var _c = _b.value, item = _c.item, index = _c.index;
            var state_1 = _loop_1(item, index);
            if (state_1 === "break")
                break;
        }
    }
    catch (e_1_1) { e_1 = { error: e_1_1 }; }
    finally {
        try {
            if (_b && !_b.done && (_d = _a.return)) _d.call(_a);
        }
        finally { if (e_1) throw e_1.error; }
    }
    targetElement.style.top = topVal + "px";
    targetElement.style.left = leftVal + "px";
    return appliedPlacement;
    var e_1, _d;
}
/**
 * @template T
 * @param {?} a
 * @return {?}
 */
function toItemIndexes(a) {
    return a.map(function (item, index) { return ({ item: item, index: index }); });
}
/** @typedef {?} */
var Placement;
export { Placement };
/** @typedef {?} */
var PlacementArray;
export { PlacementArray };

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicG9zaXRpb25pbmcuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AbmctYm9vdHN0cmFwL25nLWJvb3RzdHJhcC8iLCJzb3VyY2VzIjpbInV0aWwvcG9zaXRpb25pbmcudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFFQSxJQUFBOzs7Ozs7O0lBQ1Usa0NBQVk7Ozs7Y0FBQyxPQUFvQixJQUFJLE1BQU0sQ0FBQyxNQUFNLENBQUMsZ0JBQWdCLENBQUMsT0FBTyxDQUFDLENBQUM7Ozs7OztJQUU3RSw4QkFBUTs7Ozs7Y0FBQyxPQUFvQixFQUFFLElBQVksSUFBWSxNQUFNLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxPQUFPLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQzs7Ozs7SUFFL0Ysd0NBQWtCOzs7O2NBQUMsT0FBb0I7UUFDN0MsTUFBTSxDQUFDLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxPQUFPLEVBQUUsVUFBVSxDQUFDLElBQUksUUFBUSxDQUFDLEtBQUssUUFBUSxDQUFDOzs7Ozs7SUFHL0Qsa0NBQVk7Ozs7Y0FBQyxPQUFvQjs7UUFDdkMsSUFBSSxjQUFjLHFCQUFnQixPQUFPLENBQUMsWUFBWSxLQUFJLFFBQVEsQ0FBQyxlQUFlLENBQUM7UUFFbkYsT0FBTyxjQUFjLElBQUksY0FBYyxLQUFLLFFBQVEsQ0FBQyxlQUFlLElBQUksSUFBSSxDQUFDLGtCQUFrQixDQUFDLGNBQWMsQ0FBQyxFQUFFLENBQUM7WUFDaEgsY0FBYyxxQkFBZ0IsY0FBYyxDQUFDLFlBQVksQ0FBQSxDQUFDO1NBQzNEO1FBRUQsTUFBTSxDQUFDLGNBQWMsSUFBSSxRQUFRLENBQUMsZUFBZSxDQUFDOzs7Ozs7O0lBR3BELDhCQUFROzs7OztJQUFSLFVBQVMsT0FBb0IsRUFBRSxLQUFZO1FBQVosc0JBQUEsRUFBQSxZQUFZOztRQUN6QyxJQUFJLFVBQVUsQ0FBYTs7UUFDM0IsSUFBSSxZQUFZLEdBQWUsRUFBQyxLQUFLLEVBQUUsQ0FBQyxFQUFFLE1BQU0sRUFBRSxD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R0FBRyxHQUFHLGVBQWUsQ0FBQyxnQkFBZ0IsQ0FBQyxXQUFXLEVBQUUsYUFBYSxFQUFFLElBQUksRUFBRSxZQUFZLENBQUMsQ0FBQztZQUM3RixNQUFNLEdBQUcsR0FBRyxDQUFDLEdBQUcsQ0FBQztZQUNqQixPQUFPLEdBQUcsR0FBRyxDQUFDLElBQUksQ0FBQzs7U0FFcEI7OztRQVZILHlDQUF5QztRQUN6QyxHQUFHLENBQUMsQ0FBd0IsSUFBQSxLQUFBLGlCQUFBLGFBQWEsQ0FBQyxhQUFhLENBQUMsQ0FBQSxnQkFBQTsrQkFBN0MsY0FBSSxFQUFFLGdCQUFLO2tDQUFYLElBQUksRUFBRSxLQUFLOzs7U0FVckI7Ozs7Ozs7OztJQUNELGFBQWEsQ0FBQyxLQUFLLENBQUMsR0FBRyxHQUFNLE1BQU0sT0FBSSxDQUFDO0lBQ3hDLGFBQWEsQ0FBQyxLQUFLLENBQUMsSUFBSSxHQUFNLE9BQU8sT0FBSSxDQUFDO0lBQzFDLE1BQU0sQ0FBQyxnQkFBZ0IsQ0FBQzs7Q0FDekI7Ozs7OztBQUdELHVCQUEwQixDQUFNO0lBQzlCLE1BQU0sQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLFVBQUMsSUFBSSxFQUFFLEtBQUssSUFBSyxPQUFBLENBQUMsRUFBQyxJQUFJLE1BQUEsRUFBRSxLQUFLLE9BQUEsRUFBQyxDQUFDLEVBQWYsQ0FBZSxDQUFDLENBQUM7Q0FDaEQiLCJzb3VyY2VzQ29udGVudCI6WyIvLyBwcmV2aW91cyB2ZXJzaW9uOlxyXG4vLyBodHRwczovL2dpdGh1Yi5jb20vYW5ndWxhci11aS9ib290c3RyYXAvYmxvYi8wN2MzMWQwNzMxZjdjYjA2OGExOTMyYjhlMDFkMjMxMmI3OTZiNGVjL3NyYy9wb3NpdGlvbi9wb3NpdGlvbi5qc1xyXG5leHBvcnQgY2xhc3MgUG9zaXRpb25pbmcge1xyXG4gIHByaXZhdGUgZ2V0QWxsU3R5bGVzKGVsZW1lbnQ6IEhUTUxFbGVtZW50KSB7IHJldHVybiB3aW5kb3cuZ2V0Q29tcHV0ZWRTdHlsZShlbGVtZW50KTsgfVxyXG5cclxuICBwcml2YXRlIGdldFN0eWxlKGVsZW1lbnQ6IEhUTUxFbGVtZW50LCBwcm9wOiBzdHJpbmcpOiBzdHJpbmcgeyByZXR1cm4gdGhpcy5nZXRBbGxTdHlsZXMoZWxlbWVudClbcHJvcF07IH1cclxuXHJcbiAgcHJpdmF0ZSBpc1N0YXRpY1Bvc2l0aW9uZWQoZWxlbWVudDogSFRNTEVsZW1lbnQpOiBib29sZWFuIHtcclxuICAgIHJldHVybiAodGhpcy5nZXRTdHlsZShlbGVtZW50LCAncG9zaXRpb24nKSB8fCAnc3RhdGljJykgPT09ICdzdGF0aWMnO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBvZmZzZXRQYXJlbnQoZWxlbWVudDogSFRNTEVsZW1lbnQpOiBIVE1MRWxlbWVudCB7XHJcbiAgICBsZXQgb2Zmc2V0UGFyZW50RWwgPSA8SFRNTEVsZW1lbnQ+ZWxlbWVudC5vZmZzZXRQYXJlbnQgfHwgZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50O1xyXG5cclxuICAgIHdoaWxlIChvZmZzZXRQYXJlbnRFbCAmJiBvZmZzZXRQYXJlbnRFbCAhPT0gZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50ICYmIHRoaXMuaXNTdGF0aWNQb3NpdGlvbmVkKG9mZnNldFBhcmVudEVsKSkge1xyXG4gICAgICBvZmZzZXRQYXJlbnRFbCA9IDxIVE1MRWxlbWVudD5vZmZzZXRQYXJlbnRFbC5vZmZzZXRQYXJlbnQ7XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIG9mZnNldFBhcmVudEVsIHx8IGRvY3VtZW50LmRvY3VtZW50RWxlbWVudDtcclxuICB9XHJcblxyXG4gIHBvc2l0aW9uKGVsZW1lbnQ6IEhUTUxFbGVtZW50LCByb3VuZCA9IHRydWUpOiBDbGllbnRSZWN0IHtcclxuICAgIGxldCBlbFBvc2l0aW9uOiBDbGllbnRSZWN0O1xyXG4gICAgbGV0IHBhcmVudE9mZnNldDogQ2xpZW50UmVjdCA9IHt3aWR0aDogMCwgaGVpZ2h0OiAwLCB0b3A6IDAsIGJvdHRvbTogMCwgbGVmdDogMCwgcmlnaHQ6IDB9O1xyXG5cclxuICAgIGlmICh0aGlzLmdldFN0eWxlKGVsZW1lbnQsICdwb3NpdGlvbicpID09PSAnZml4ZWQnKSB7XHJcbiAgICAgIGVsUG9zaXRpb24gPSBlbGVtZW50LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgY29uc3Qgb2Zmc2V0UGFyZW50RWwgPSB0aGlzLm9mZnNldFBhcmVudChlbGVtZW50KTtcclxuXHJcbiAgICAgIGVsUG9zaXRpb24gPSB0aGlzLm9mZnNldChlbGVtZW50LCBmYWxzZSk7XHJcblxyXG4gICAgICBpZiAob2Zmc2V0UGFyZW50RWwgIT09IGRvY3VtZW50LmRvY3VtZW50RWxlbWVudCkge1xyXG4gICAgICAgIHBhcmVudE9mZnNldCA9IHRoaXMub2Zmc2V0KG9mZnNldFBhcmVudEVsLCBmYWxzZSk7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIHBhcmVudE9mZnNldC50b3AgKz0gb2Zmc2V0UGFyZW50RWwuY2xpZW50VG9wO1xyXG4gICAgICBwYXJlbnRPZmZzZXQubGVmdCArPSBvZmZzZXRQYXJlbnRFbC5jbGllbnRMZWZ0O1xyXG4gICAgfVxyXG5cclxuICAgIGVsUG9zaXRpb24udG9wIC09IHBhcmVudE9mZnNldC50b3A7XHJcbiAgICBlbFBvc2l0aW9uLmJvdHRvbSAtPSBwYXJlbnRPZmZzZXQudG9wO1xyXG4gICAgZWxQb3NpdGlvbi5sZWZ0IC09IHBhcmVudE9mZnNldC5sZWZ0O1xyXG4gICAgZWxQb3NpdGlvbi5yaWdodCAtPSBwYXJlbnRPZmZzZXQubGVmdDtcclxuXHJcbiAgICBpZiAocm91bmQpIHtcclxuICAgICAgZWxQb3NpdGlvbi50b3AgPSBNYXRoLnJvdW5kKGVsUG9zaXRpb24udG9wKTtcclxuICAgICAgZWxQb3NpdGlvbi5ib3R0b20gPSBNYXRoLnJvdW5kKGVsUG9zaXRpb24uYm90dG9tKTtcclxuICAgICAgZWxQb3NpdGlvbi5sZWZ0ID0gTWF0aC5yb3VuZChlbFBvc2l0aW9uLmxlZnQpO1xyXG4gICAgICBlbFBvc2l0aW9uLnJpZ2h0ID0gTWF0aC5yb3VuZChlbFBvc2l0aW9uLnJpZ2h0KTtcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gZWxQb3NpdGlvbjtcclxuICB9XHJcblxyXG4gIG9mZnNldChlbGVtZW50OiBIVE1MRWxlbWVudCwgcm91bmQgPSB0cnVlKTogQ2xpZW50UmVjdCB7XHJcbiAgICBjb25zdCBlbEJjciA9IGVsZW1lbnQuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XHJcbiAgICBjb25zdCB2aWV3cG9ydE9mZnNldCA9IHtcclxuICAgICAgdG9wOiB3aW5kb3cucGFnZVlPZmZzZXQgLSBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuY2xpZW50VG9wLFxyXG4gICAgICBsZWZ0OiB3aW5kb3cucGFnZVhPZmZzZXQgLSBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuY2xpZW50TGVmdFxyXG4gICAgfTtcclxuXHJcbiAgICBsZXQgZWxPZmZzZXQgPSB7XHJcbiAgICAgIGhlaWdodDogZWxCY3IuaGVpZ2h0IHx8IGVsZW1lbnQub2Zmc2V0SGVpZ2h0LFxyXG4gICAgICB3aWR0aDogZWxCY3Iud2lkdGggfHwgZWxlbWVudC5vZmZzZXRXaWR0aCxcclxuICAgICAgdG9wOiBlbEJjci50b3AgKyB2aWV3cG9ydE9mZnNldC50b3AsXHJcbiAgICAgIGJvdHRvbTogZWxCY3IuYm90dG9tICsgdmlld3BvcnRPZmZzZXQudG9wLFxyXG4gICAgICBsZWZ0OiBlbEJjci5sZWZ0ICsgdmlld3BvcnRPZmZzZXQubGVmdCxcclxuICAgICAgcmlnaHQ6IGVsQmNyLnJpZ2h0ICsgdmlld3BvcnRPZmZzZXQubGVmdFxyXG4gICAgfTtcclxuXHJcbiAgICBpZiAocm91bmQpIHtcclxuICAgICAgZWxPZmZzZXQuaGVpZ2h0ID0gTWF0aC5yb3VuZChlbE9mZnNldC5oZWlnaHQpO1xyXG4gICAgICBlbE9mZnNldC53aWR0aCA9IE1hdGgucm91bmQoZWxPZmZzZXQud2lkdGgpO1xyXG4gICAgICBlbE9mZnNldC50b3AgPSBNYXRoLnJvdW5kKGVsT2Zmc2V0LnRvcCk7XHJcbiAgICAgIGVsT2Zmc2V0LmJvdHRvbSA9IE1hdGgucm91bmQoZWxPZmZzZXQuYm90dG9tKTtcclxuICAgICAgZWxPZmZzZXQubGVmdCA9IE1hdGgucm91bmQoZWxPZmZzZXQubGVmdCk7XHJcbiAgICAgIGVsT2Zmc2V0LnJpZ2h0ID0gTWF0aC5yb3VuZChlbE9mZnNldC5yaWdodCk7XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIGVsT2Zmc2V0O1xyXG4gIH1cclxuXHJcbiAgcG9zaXRpb25FbGVtZW50cyhob3N0RWxlbWVudDogSFRNTEVsZW1lbnQsIHRhcmdldEVsZW1lbnQ6IEhUTUxFbGVtZW50LCBwbGFjZW1lbnQ6IHN0cmluZywgYXBwZW5kVG9Cb2R5PzogYm9vbGVhbik6XHJcbiAgICAgIENsaWVudFJlY3Qge1xyXG4gICAgY29uc3QgaG9zdEVsUG9zaXRpb24gPSBhcHBlbmRUb0JvZHkgPyB0aGlzLm9mZnNldChob3N0RWxlbWVudCwgZmFsc2UpIDogdGhpcy5wb3NpdGlvbihob3N0RWxlbWVudCwgZmFsc2UpO1xyXG4gICAgY29uc3QgdGFyZ2V0RWxTdHlsZXMgPSB0aGlzLmdldEFsbFN0eWxlcyh0YXJnZXRFbGVtZW50KTtcclxuICAgIGNvbnN0IHRhcmdldEVsQkNSID0gdGFyZ2V0RWxlbWVudC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcclxuICAgIGNvbnN0IHBsYWNlbWVudFByaW1hcnkgPSBwbGFjZW1lbnQuc3BsaXQoJy0nKVswXSB8fCAndG9wJztcclxuICAgIGNvbnN0IHBsYWNlbWVudFNlY29uZGFyeSA9IHBsYWNlbWVudC5zcGxpdCgnLScpWzFdIHx8ICdjZW50ZXInO1xyXG5cclxuICAgIGxldCB0YXJnZXRFbFBvc2l0aW9uOiBDbGllbnRSZWN0ID0ge1xyXG4gICAgICAnaGVpZ2h0JzogdGFyZ2V0RWxCQ1IuaGVpZ2h0IHx8IHRhcmdldEVsZW1lbnQub2Zmc2V0SGVpZ2h0LFxyXG4gICAgICAnd2lkdGgnOiB0YXJnZXRFbEJDUi53aWR0aCB8fCB0YXJnZXRFbGVtZW50Lm9mZnNldFdpZHRoLFxyXG4gICAgICAndG9wJzogMCxcclxuICAgICAgJ2JvdHRvbSc6IHRhcmdldEVsQkNSLmhlaWdodCB8fCB0YXJnZXRFbGVtZW50Lm9mZnNldEhlaWdodCxcclxuICAgICAgJ2xlZnQnOiAwLFxyXG4gICAgICAncmlnaHQnOiB0YXJnZXRFbEJDUi53aWR0aCB8fCB0YXJnZXRFbGVtZW50Lm9mZnNldFdpZHRoXHJcbiAgICB9O1xyXG5cclxuICAgIHN3aXRjaCAocGxhY2VtZW50UHJpbWFyeSkge1xyXG4gICAgICBjYXNlICd0b3AnOlxyXG4gICAgICAgIHRhcmdldEVsUG9zaXRpb24udG9wID1cclxuICAgICAgICAgICAgaG9zdEVsUG9zaXRpb24udG9wIC0gKHRhcmdldEVsZW1lbnQub2Zmc2V0SGVpZ2h0ICsgcGFyc2VGbG9hdCh0YXJnZXRFbFN0eWxlcy5tYXJnaW5Cb3R0b20pKTtcclxuICAgICAgICBicmVhaztcclxuICAgICAgY2FzZSAnYm90dG9tJzpcclxuICAgICAgICB0YXJnZXRFbFBvc2l0aW9uLnRvcCA9IGhvc3RFbFBvc2l0aW9uLnRvcCArIGhvc3RFbFBvc2l0aW9uLmhlaWdodDtcclxuICAgICAgICBicmVhaztcclxuICAgICAgY2FzZSAnbGVmdCc6XHJcbiAgICAgICAgdGFyZ2V0RWxQb3NpdGlvbi5sZWZ0ID1cclxuICAgICAgICAgICAgaG9zdEVsUG9zaXRpb24ubGVmdCAtICh0YXJnZXRFbGVtZW50Lm9mZnNldFdpZHRoICsgcGFyc2VGbG9hdCh0YXJnZXRFbFN0eWxlcy5tYXJnaW5SaWdodCkpO1xyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgICBjYXNlICdyaWdodCc6XHJcbiAgICAgICAgdGFyZ2V0RWxQb3NpdGlvbi5sZWZ0ID0gaG9zdEVsUG9zaXRpb24ubGVmdCArIGhvc3RFbFBvc2l0aW9uLndpZHRoO1xyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgfVxyXG5cclxuICAgIHN3aXRjaCAocGxhY2VtZW50U2Vjb25kYXJ5KSB7XHJcbiAgICAgIGNhc2UgJ3RvcCc6XHJcbiAgICAgICAgdGFyZ2V0RWxQb3NpdGlvbi50b3AgPSBob3N0RWxQb3NpdGlvbi50b3A7XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICAgIGNhc2UgJ2JvdHRvbSc6XHJcbiAgICAgICAgdGFyZ2V0RWxQb3NpdGlvbi50b3AgPSBob3N0RWxQb3NpdGlvbi50b3AgKyBob3N0RWxQb3NpdGlvbi5oZWlnaHQgLSB0YXJnZXRFbGVtZW50Lm9mZnNldEhlaWdodDtcclxuICAgICAgICBicmVhaztcclxuICAgICAgY2FzZSAnbGVmdCc6XHJcbiAgICAgICAgdGFyZ2V0RWxQb3NpdGlvbi5sZWZ0ID0gaG9zdEVsUG9zaXRpb24ubGVmdDtcclxuICAgICAgICBicmVhaztcclxuICAgICAgY2FzZSAncmlnaHQnOlxyXG4gICAgICAgIHRhcmdldEVsUG9zaXRpb24ubGVmdCA9IGhvc3RFbFBvc2l0aW9uLmxlZnQgKyBob3N0RWxQb3NpdGlvbi53aWR0aCAtIHRhcmdldEVsZW1lbnQub2Zmc2V0V2lkdGg7XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICAgIGNhc2UgJ2NlbnRlcic6XHJcbiAgICAgICAgaWYgKHBsYWNlbWVudFByaW1hcnkgPT09ICd0b3AnIHx8IHBsYWNlbWVudFByaW1hcnkgPT09ICdib3R0b20nKSB7XHJcbiAgICAgICAgICB0YXJnZXRFbFBvc2l0aW9uLmxlZnQgPSBob3N0RWxQb3NpdGlvbi5sZWZ0ICsgaG9zdEVsUG9zaXRpb24ud2lkdGggLyAyIC0gdGFyZ2V0RWxlbWVudC5vZmZzZXRXaWR0aCAvIDI7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIHRhcmdldEVsUG9zaXRpb24udG9wID0gaG9zdEVsUG9zaXRpb24udG9wICsgaG9zdEVsUG9zaXRpb24uaGVpZ2h0IC8gMiAtIHRhcmdldEVsZW1lbnQub2Zmc2V0SGVpZ2h0IC8gMjtcclxuICAgICAgICB9XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICB9XHJcblxyXG4gICAgdGFyZ2V0RWxQb3NpdGlvbi50b3AgPSBNYXRoLnJvdW5kKHRhcmdldEVsUG9zaXRpb24udG9wKTtcclxuICAgIHRhcmdldEVsUG9zaXRpb24uYm90dG9tID0gTWF0aC5yb3VuZCh0YXJnZXRFbFBvc2l0aW9uLmJvdHRvbSk7XHJcbiAgICB0YXJnZXRFbFBvc2l0aW9uLmxlZnQgPSBNYXRoLnJvdW5kKHRhcmdldEVsUG9zaXRpb24ubGVmdCk7XHJcbiAgICB0YXJnZXRFbFBvc2l0aW9uLnJpZ2h0ID0gTWF0aC5yb3VuZCh0YXJnZXRFbFBvc2l0aW9uLnJpZ2h0KTtcclxuXHJcbiAgICByZXR1cm4gdGFyZ2V0RWxQb3NpdGlvbjtcclxuICB9XHJcblxyXG4gIC8vIGdldCB0aGUgYXZhaWxhYmxlIHBsYWNlbWVudHMgb2YgdGhlIHRhcmdldCBlbGVtZW50IGluIHRoZSB2aWV3cG9ydCBkZXBlbmRpbmcgb24gdGhlIGhvc3QgZWxlbWVudFxyXG4gIGdldEF2YWlsYWJsZVBsYWNlbWVudHMoaG9zdEVsZW1lbnQ6IEhUTUxFbGVtZW50LCB0YXJnZXRFbGVtZW50OiBIVE1MRWxlbWVudCk6IHN0cmluZ1tdIHtcclxuICAgIGxldCBhdmFpbGFibGVQbGFjZW1lbnRzOiBBcnJheTxzdHJpbmc+ID0gW107XHJcbiAgICBsZXQgaG9zdEVsZW1DbGllbnRSZWN0ID0gaG9zdEVsZW1lbnQuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XHJcbiAgICBsZXQgdGFyZ2V0RWxlbUNsaWVudFJlY3QgPSB0YXJnZXRFbGVtZW50LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xyXG4gICAgbGV0IGh0bWwgPSBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQ7XHJcbiAgICBsZXQgd2luZG93SGVpZ2h0ID0gd2luZG93LmlubmVySGVpZ2h0IHx8IGh0bWwuY2xpZW50SGVpZ2h0O1xyXG4gICAgbGV0IHdpbmRvd1dpZHRoID0gd2luZG93LmlubmVyV2lkdGggfHwgaHRtbC5jbGllbnRXaWR0aDtcclxuICAgIGxldCBob3N0RWxlbUNsaWVudFJlY3RIb3JDZW50ZXIgPSBob3N0RWxlbUNsaWVudFJlY3QubGVmdCArIGhvc3RFbGVtQ2xpZW50UmVjdC53aWR0aCAvIDI7XHJcbiAgICBsZXQgaG9zdEVsZW1DbGllbnRSZWN0VmVyQ2VudGVyID0gaG9zdEVsZW1DbGllbnRSZWN0LnRvcCArIGhvc3RFbGVtQ2xpZW50UmVjdC5oZWlnaHQgLyAyO1xyXG5cclxuICAgIC8vIGxlZnQ6IGNoZWNrIGlmIHRhcmdldCB3aWR0aCBjYW4gYmUgcGxhY2VkIGJldHdlZW4gaG9zdCBsZWZ0IGFuZCB2aWV3cG9ydCBzdGFydCBhbmQgYWxzbyBoZWlnaHQgb2YgdGFyZ2V0IGlzXHJcbiAgICAvLyBpbnNpZGUgdmlld3BvcnRcclxuICAgIGlmICh0YXJnZXRFbGVtQ2xpZW50UmVjdC53aWR0aCA8IGhvc3RFbGVtQ2xpZW50UmVjdC5sZWZ0KSB7XHJcbiAgICAgIC8vIGNoZWNrIGZvciBsZWZ0IG9ubHlcclxuICAgICAgaWYgKGhvc3RFbGVtQ2xpZW50UmVjdFZlckNlbnRlciA+IHRhcmdldEVsZW1DbGllbnRSZWN0LmhlaWdodCAvIDIgJiZcclxuICAgICAgICAgIHdpbmRvd0hlaWdodCAtIGhvc3RFbGVtQ2xpZW50UmVjdFZlckNlbnRlciA+IHRhcmdldEVsZW1DbGllbnRSZWN0LmhlaWdodCAvIDIpIHtcclxuICAgICAgICBhdmFpbGFibGVQbGFjZW1lbnRzLnNwbGljZShhdmFpbGFibGVQbGFjZW1lbnRzLmxlbmd0aCwgMSwgJ2xlZnQnKTtcclxuICAgICAgfVxyXG4gICAgICAvLyBjaGVjayBmb3IgbGVmdC10b3AgYW5kIGxlZnQtYm90dG9tXHJcbiAgICAgIHRoaXMuc2V0U2Vjb25kYXJ5UGxhY2VtZW50Rm9yTGVmdFJpZ2h0KGhvc3RFbGVtQ2xpZW50UmVjdCwgdGFyZ2V0RWxlbUNsaWVudFJlY3QsICdsZWZ0JywgYXZhaWxhYmxlUGxhY2VtZW50cyk7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gdG9wOiB0YXJnZXQgaGVpZ2h0IGlzIGxlc3MgdGhhbiBob3N0IHRvcFxyXG4gICAgaWYgKHRhcmdldEVsZW1DbGllbnRSZWN0LmhlaWdodCA8IGhvc3RFbGVtQ2xpZW50UmVjdC50b3ApIHtcclxuICAgICAgaWYgKGhvc3RFbGVtQ2xpZW50UmVjdEhvckNlbnRlciA+IHRhcmdldEVsZW1DbGllbnRSZWN0LndpZHRoIC8gMiAmJlxyXG4gICAgICAgICAgd2luZG93V2lkdGggLSBob3N0RWxlbUNsaWVudFJlY3RIb3JDZW50ZXIgPiB0YXJnZXRFbGVtQ2xpZW50UmVjdC53aWR0aCAvIDIpIHtcclxuICAgICAgICBhdmFpbGFibGVQbGFjZW1lbnRzLnNwbGljZShhdmFpbGFibGVQbGFjZW1lbnRzLmxlbmd0aCwgMSwgJ3RvcCcpO1xyXG4gICAgICB9XHJcbiAgICAgIHRoaXMuc2V0U2Vjb25kYXJ5UGxhY2VtZW50Rm9yVG9wQm90dG9tKGhvc3RFbGVtQ2xpZW50UmVjdCwgdGFyZ2V0RWxlbUNsaWVudFJlY3QsICd0b3AnLCBhdmFpbGFibGVQbGFjZW1lbnRzKTtcclxuICAgIH1cclxuXHJcbiAgICAvLyByaWdodDogY2hlY2sgaWYgdGFyZ2V0IHdpZHRoIGNhbiBiZSBwbGFjZWQgYmV0d2VlbiBob3N0IHJpZ2h0IGFuZCB2aWV3cG9ydCBlbmQgYW5kIGFsc28gaGVpZ2h0IG9mIHRhcmdldCBpc1xyXG4gICAgLy8gaW5zaWRlIHZpZXdwb3J0XHJcbiAgICBpZiAod2luZG93V2lkdGggLSBob3N0RWxlbUNsaWVudFJlY3QucmlnaHQgPiB0YXJnZXRFbGVtQ2xpZW50UmVjdC53aWR0aCkge1xyXG4gICAgICAvLyBjaGVjayBmb3IgcmlnaHQgb25seVxyXG4gICAgICBpZiAoaG9zdEVsZW1DbGllbnRSZWN0VmVyQ2VudGVyID4gdGFyZ2V0RWxlbUNsaWVudFJlY3QuaGVpZ2h0IC8gMiAmJlxyXG4gICAgICAgICAgd2luZG93SGVpZ2h0IC0gaG9zdEVsZW1DbGllbnRSZWN0VmVyQ2VudGVyID4gdGFyZ2V0RWxlbUNsaWVudFJlY3QuaGVpZ2h0IC8gMikge1xyXG4gICAgICAgIGF2YWlsYWJsZVBsYWNlbWVudHMuc3BsaWNlKGF2YWlsYWJsZVBsYWNlbWVudHMubGVuZ3RoLCAxLCAncmlnaHQnKTtcclxuICAgICAgfVxyXG4gICAgICAvLyBjaGVjayBmb3IgcmlnaHQtdG9wIGFuZCByaWdodC1ib3R0b21cclxuICAgICAgdGhpcy5zZXRTZWNvbmRhcnlQbGFjZW1lbnRGb3JMZWZ0UmlnaHQoaG9zdEVsZW1DbGllbnRSZWN0LCB0YXJnZXRFbGVtQ2xpZW50UmVjdCwgJ3JpZ2h0JywgYXZhaWxhYmxlUGxhY2VtZW50cyk7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gYm90dG9tOiBjaGVjayBpZiB0aGVyZSBpcyBlbm91Z2ggc3BhY2UgYmV0d2VlbiBob3N0IGJvdHRvbSBhbmQgdmlld3BvcnQgZW5kIGZvciB0YXJnZXQgaGVpZ2h0XHJcbiAgICBpZiAod2luZG93SGVpZ2h0IC0gaG9zdEVsZW1DbGllbnRSZWN0LmJvdHRvbSA+IHRhcmdldEVsZW1DbGllbnRSZWN0LmhlaWdodCkge1xyXG4gICAgICBpZiAoaG9zdEVsZW1DbGllbnRSZWN0SG9yQ2VudGVyID4gdGFyZ2V0RWxlbUNsaWVudFJlY3Qud2lkdGggLyAyICYmXHJcbiAgICAgICAgICB3aW5kb3dXaWR0aCAtIGhvc3RFbGVtQ2xpZW50UmVjdEhvckNlbnRlciA+IHRhcmdldEVsZW1DbGllbnRSZWN0LndpZHRoIC8gMikge1xyXG4gICAgICAgIGF2YWlsYWJsZVBsYWNlbWVudHMuc3BsaWNlKGF2YWlsYWJsZVBsYWNlbWVudHMubGVuZ3RoLCAxLCAnYm90dG9tJyk7XHJcbiAgICAgIH1cclxuICAgICAgdGhpcy5zZXRTZWNvbmRhcnlQbGFjZW1lbnRGb3JUb3BCb3R0b20oaG9zdEVsZW1DbGllbnRSZWN0LCB0YXJnZXRFbGVtQ2xpZW50UmVjdCwgJ2JvdHRvbScsIGF2YWlsYWJsZVBsYWNlbWVudHMpO1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiBhdmFpbGFibGVQbGFjZW1lbnRzO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogY2hlY2sgaWYgc2Vjb25kYXJ5IHBsYWNlbWVudCBmb3IgbGVmdCBhbmQgcmlnaHQgYXJlIGF2YWlsYWJsZSBpLmUuIGxlZnQtdG9wLCBsZWZ0LWJvdHRvbSwgcmlnaHQtdG9wLCByaWdodC1ib3R0b21cclxuICAgKiBwcmltYXJ5cGxhY2VtZW50OiBsZWZ0fHJpZ2h0XHJcbiAgICogYXZhaWxhYmxlUGxhY2VtZW50QXJyOiBhcnJheSBpbiB3aGljaCBhdmFpbGFibGUgcGxhY2VtZW50cyB0byBiZSBzZXRcclxuICAgKi9cclxuICBwcml2YXRlIHNldFNlY29uZGFyeVBsYWNlbWVudEZvckxlZnRSaWdodChcclxuICAgICAgaG9zdEVsZW1DbGllbnRSZWN0OiBDbGllbnRSZWN0LCB0YXJnZXRFbGVtQ2xpZW50UmVjdDogQ2xpZW50UmVjdCwgcHJpbWFyeVBsYWNlbWVudDogc3RyaW5nLFxyXG4gICAgICBhdmFpbGFibGVQbGFjZW1lbnRBcnI6IEFycmF5PHN0cmluZz4pIHtcclxuICAgIGxldCBodG1sID0gZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50O1xyXG4gICAgLy8gY2hlY2sgZm9yIGxlZnQtYm90dG9tXHJcbiAgICBpZiAodGFyZ2V0RWxlbUNsaWVudFJlY3QuaGVpZ2h0IDw9IGhvc3RFbGVtQ2xpZW50UmVjdC5ib3R0b20pIHtcclxuICAgICAgYXZhaWxhYmxlUGxhY2VtZW50QXJyLnNwbGljZShhdmFpbGFibGVQbGFjZW1lbnRBcnIubGVuZ3RoLCAxLCBwcmltYXJ5UGxhY2VtZW50ICsgJy1ib3R0b20nKTtcclxuICAgIH1cclxuICAgIGlmICgod2luZG93LmlubmVySGVpZ2h0IHx8IGh0bWwuY2xpZW50SGVpZ2h0KSAtIGhvc3RFbGVtQ2xpZW50UmVjdC50b3AgPj0gdGFyZ2V0RWxlbUNsaWVudFJlY3QuaGVpZ2h0KSB7XHJcbiAgICAgIGF2YWlsYWJsZVBsYWNlbWVudEFyci5zcGxpY2UoYXZhaWxhYmxlUGxhY2VtZW50QXJyLmxlbmd0aCwgMSwgcHJpbWFyeVBsYWNlbWVudCArICctdG9wJyk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBjaGVjayBpZiBzZWNvbmRhcnkgcGxhY2VtZW50IGZvciB0b3AgYW5kIGJvdHRvbSBhcmUgYXZhaWxhYmxlIGkuZS4gdG9wLWxlZnQsIHRvcC1yaWdodCwgYm90dG9tLWxlZnQsIGJvdHRvbS1yaWdodFxyXG4gICAqIHByaW1hcnlwbGFjZW1lbnQ6IHRvcHxib3R0b21cclxuICAgKiBhdmFpbGFibGVQbGFjZW1lbnRBcnI6IGFycmF5IGluIHdoaWNoIGF2YWlsYWJsZSBwbGFjZW1lbnRzIHRvIGJlIHNldFxyXG4gICAqL1xyXG4gIHByaXZhdGUgc2V0U2Vjb25kYXJ5UGxhY2VtZW50Rm9yVG9wQm90dG9tKFxyXG4gICAgICBob3N0RWxlbUNsaWVudFJlY3Q6IENsaWVudFJlY3QsIHRhcmdldEVsZW1DbGllbnRSZWN0OiBDbGllbnRSZWN0LCBwcmltYXJ5UGxhY2VtZW50OiBzdHJpbmcsXHJcbiAgICAgIGF2YWlsYWJsZVBsYWNlbWVudEFycjogQXJyYXk8c3RyaW5nPikge1xyXG4gICAgbGV0IGh0bWwgPSBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQ7XHJcbiAgICAvLyBjaGVjayBmb3IgbGVmdC1ib3R0b21cclxuICAgIGlmICgod2luZG93LmlubmVyV2lkdGggfHwgaHRtbC5jbGllbnRXaWR0aCkgLSBob3N0RWxlbUNsaWVudFJlY3QubGVmdCA+PSB0YXJnZXRFbGVtQ2xpZW50UmVjdC53aWR0aCkge1xyXG4gICAgICBhdmFpbGFibGVQbGFjZW1lbnRBcnIuc3BsaWNlKGF2YWlsYWJsZVBsYWNlbWVudEFyci5sZW5ndGgsIDEsIHByaW1hcnlQbGFjZW1lbnQgKyAnLWxlZnQnKTtcclxuICAgIH1cclxuICAgIGlmICh0YXJnZXRFbGVtQ2xpZW50UmVjdC53aWR0aCA8PSBob3N0RWxlbUNsaWVudFJlY3QucmlnaHQpIHtcclxuICAgICAgYXZhaWxhYmxlUGxhY2VtZW50QXJyLnNwbGljZShhdmFpbGFibGVQbGFjZW1lbnRBcnIubGVuZ3RoLCAxLCBwcmltYXJ5UGxhY2VtZW50ICsgJy1yaWdodCcpO1xyXG4gICAgfVxyXG4gIH1cclxufVxyXG5cclxuY29uc3QgcG9zaXRpb25TZXJ2aWNlID0gbmV3IFBvc2l0aW9uaW5nKCk7XHJcblxyXG4vKlxyXG4gKiBBY2NlcHQgdGhlIHBsYWNlbWVudCBhcnJheSBhbmQgYXBwbGllcyB0aGUgYXBwcm9wcmlhdGUgcGxhY2VtZW50IGRlcGVuZGVudCBvbiB0aGUgdmlld3BvcnQuXHJcbiAqIFJldHVybnMgdGhlIGFwcGxpZWQgcGxhY2VtZW50LlxyXG4gKiBJbiBjYXNlIG9mIGF1dG8gcGxhY2VtZW50LCBwbGFjZW1lbnRzIGFyZSBzZWxlY3RlZCBpbiBvcmRlclxyXG4gKiAgICd0b3AnLCAnYm90dG9tJywgJ2xlZnQnLCAncmlnaHQnLFxyXG4gKiAgICd0b3AtbGVmdCcsICd0b3AtcmlnaHQnLFxyXG4gKiAgICdib3R0b20tbGVmdCcsICdib3R0b20tcmlnaHQnLFxyXG4gKiAgICdsZWZ0LXRvcCcsICdsZWZ0LWJvdHRvbScsXHJcbiAqICAgJ3JpZ2h0LXRvcCcsICdyaWdodC1ib3R0b20nLlxyXG4gKiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gcG9zaXRpb25FbGVtZW50cyhcclxuICAgIGhvc3RFbGVtZW50OiBIVE1MRWxlbWVudCwgdGFyZ2V0RWxlbWVudDogSFRNTEVsZW1lbnQsIHBsYWNlbWVudDogc3RyaW5nIHwgUGxhY2VtZW50IHwgUGxhY2VtZW50QXJyYXksXHJcbiAgICBhcHBlbmRUb0JvZHk/OiBib29sZWFuKTogUGxhY2VtZW50IHtcclxuICBsZXQgcGxhY2VtZW50VmFsczogQXJyYXk8UGxhY2VtZW50PiA9IEFycmF5LmlzQXJyYXkocGxhY2VtZW50KSA/IHBsYWNlbWVudCA6IFtwbGFjZW1lbnQgYXMgUGxhY2VtZW50XTtcclxuXHJcbiAgLy8gcmVwbGFjZSBhdXRvIHBsYWNlbWVudCB3aXRoIG90aGVyIHBsYWNlbWVudHNcclxuICBsZXQgaGFzQXV0byA9IHBsYWNlbWVudFZhbHMuZmluZEluZGV4KHZhbCA9PiB2YWwgPT09ICdhdXRvJyk7XHJcbiAgaWYgKGhhc0F1dG8gPj0gMCkge1xyXG4gICAgWyd0b3AnLCAnYm90dG9tJywgJ2xlZnQnLCAncmlnaHQnLCAndG9wLWxlZnQnLCAndG9wLXJpZ2h0JywgJ2JvdHRvbS1sZWZ0JywgJ2JvdHRvbS1yaWdodCcsICdsZWZ0LXRvcCcsXHJcbiAgICAgJ2xlZnQtYm90dG9tJywgJ3JpZ2h0LXRvcCcsICdyaWdodC1ib3R0b20nLFxyXG4gICAgXS5mb3JFYWNoKGZ1bmN0aW9uKG9iaikge1xyXG4gICAgICBpZiAocGxhY2VtZW50VmFscy5maW5kKHZhbCA9PiB2YWwuc2VhcmNoKCdeJyArIG9iaikgIT09IC0xKSA9PSBudWxsKSB7XHJcbiAgICAgICAgcGxhY2VtZW50VmFscy5zcGxpY2UoaGFzQXV0bysrLCAxLCBvYmogYXMgUGxhY2VtZW50KTtcclxuICAgICAgfVxyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICAvLyBjb29yZGluYXRlcyB3aGVyZSB0byBwb3NpdGlvblxyXG4gIGxldCB0b3BWYWwgPSAwLCBsZWZ0VmFsID0gMDtcclxuICBsZXQgYXBwbGllZFBsYWNlbWVudDogUGxhY2VtZW50O1xyXG4gIC8vIGdldCBhdmFpbGFibGUgcGxhY2VtZW50c1xyXG4gIGxldCBhdmFpbGFibGVQbGFjZW1lbnRzID0gcG9zaXRpb25TZXJ2aWNlLmdldEF2YWlsYWJsZVBsYWNlbWVudHMoaG9zdEVsZW1lbnQsIHRhcmdldEVsZW1lbnQpO1xyXG4gIC8vIGl0ZXJhdGUgb3ZlciBhbGwgdGhlIHBhc3NlZCBwbGFjZW1lbnRzXHJcbiAgZm9yIChsZXQgeyBpdGVtLCBpbmRleCB9IG9mIHRvSXRlbUluZGV4ZXMocGxhY2VtZW50VmFscykpIHtcclxuICAgIC8vIGNoZWNrIGlmIHBhc3NlZCBwbGFjZW1lbnQgaXMgcHJlc2VudCBpbiB0aGUgYXZhaWxhYmxlIHBsYWNlbWVudCBvciBvdGhlcndpc2UgYXBwbHkgdGhlIGxhc3QgcGxhY2VtZW50IGluIHRoZVxyXG4gICAgLy8gcGFzc2VkIHBsYWNlbWVudCBsaXN0XHJcbiAgICBpZiAoKGF2YWlsYWJsZVBsYWNlbWVudHMuZmluZCh2YWwgPT4gdmFsID09PSBpdGVtKSAhPSBudWxsKSB8fCAocGxhY2VtZW50VmFscy5sZW5ndGggPT09IGluZGV4ICsgMSkpIHtcclxuICAgICAgYXBwbGllZFBsYWNlbWVudCA9IDxQbGFjZW1lbnQ+aXRlbTtcclxuICAgICAgY29uc3QgcG9zID0gcG9zaXRpb25TZXJ2aWNlLnBvc2l0aW9uRWxlbWVudHMoaG9zdEVsZW1lbnQsIHRhcmdldEVsZW1lbnQsIGl0ZW0sIGFwcGVuZFRvQm9keSk7XHJcbiAgICAgIHRvcFZhbCA9IHBvcy50b3A7XHJcbiAgICAgIGxlZnRWYWwgPSBwb3MubGVmdDtcclxuICAgICAgYnJlYWs7XHJcbiAgICB9XHJcbiAgfVxyXG4gIHRhcmdldEVsZW1lbnQuc3R5bGUudG9wID0gYCR7dG9wVmFsfXB4YDtcclxuICB0YXJnZXRFbGVtZW50LnN0eWxlLmxlZnQgPSBgJHtsZWZ0VmFsfXB4YDtcclxuICByZXR1cm4gYXBwbGllZFBsYWNlbWVudDtcclxufVxyXG5cclxuLy8gZnVuY3Rpb24gdG8gZ2V0IGluZGV4IGFuZCBpdGVtIG9mIGFuIGFycmF5XHJcbmZ1bmN0aW9uIHRvSXRlbUluZGV4ZXM8VD4oYTogVFtdKSB7XHJcbiAgcmV0dXJuIGEubWFwKChpdGVtLCBpbmRleCkgPT4gKHtpdGVtLCBpbmRleH0pKTtcclxufVxyXG5cclxuZXhwb3J0IHR5cGUgUGxhY2VtZW50ID0gJ2F1dG8nIHwgJ3RvcCcgfCAnYm90dG9tJyB8ICdsZWZ0JyB8ICdyaWdodCcgfCAndG9wLWxlZnQnIHwgJ3RvcC1yaWdodCcgfCAnYm90dG9tLWxlZnQnIHxcclxuICAgICdib3R0b20tcmlnaHQnIHwgJ2xlZnQtdG9wJyB8ICdsZWZ0LWJvdHRvbScgfCAncmlnaHQtdG9wJyB8ICdyaWdodC1ib3R0b20nO1xyXG5cclxuZXhwb3J0IHR5cGUgUGxhY2VtZW50QXJyYXkgPSBQbGFjZW1lbnQgfCBBcnJheTxQbGFjZW1lbnQ+O1xyXG4iXX0=