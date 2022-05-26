/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Component, ElementRef, EventEmitter, Input, Output, Renderer2 } from '@angular/core';
import { ImageLoaderConfigService } from './services/image-loader-config.service';
import { ImageLoaderService } from './services/image-loader.service';
/** @type {?} */
var propMap = {
    display: 'display',
    height: 'height',
    width: 'width',
    backgroundSize: 'background-size',
    backgroundRepeat: 'background-repeat',
};
/**
 * @record
 */
export function ImageAttribute() { }
if (false) {
    /** @type {?} */
    ImageAttribute.prototype.element;
    /** @type {?} */
    ImageAttribute.prototype.value;
}
var IonicImageLoaderComponent = /** @class */ (function () {
    function IonicImageLoaderComponent(_element, renderer, imageLoader, config) {
        this._element = _element;
        this.renderer = renderer;
        this.imageLoader = imageLoader;
        this.config = config;
        /**
         * Fallback URL to load when the image url fails to load or does not exist.
         */
        this.fallbackUrl = this.config.fallbackUrl;
        /**
         * Whether to show a spinner while the image loads
         */
        this.spinner = this.config.spinnerEnabled;
        /**
         * Whether to show the fallback image instead of a spinner while the image loads
         */
        this.fallbackAsPlaceholder = this.config.fallbackAsPlaceholder;
        /**
         * Attributes to pass through to img tag if _useImg == true
         */
        this.imgAttributes = [];
        /**
         * Enable/Disable caching
         */
        this.cache = true;
        /**
         * Width of the image. This will be ignored if using useImg.
         */
        this.width = this.config.width;
        /**
         * Height of the image. This will be ignored if using useImg.
         */
        this.height = this.config.height;
        /**
         * Display type of the image. This will be ignored if using useImg.
         */
        this.display = this.config.display;
        /**
         * Background size. This will be ignored if using useImg.
         */
        this.backgroundSize = this.config.backgroundSize;
        /**
         * Background repeat. This will be ignored if using useImg.
         */
        this.backgroundRepeat = this.config.backgroundRepeat;
        /**
         * Name of the spinner
         */
        this.spinnerName = this.config.spinnerName;
        /**
         * Color of the spinner
         */
        this.spinnerColor = this.config.spinnerColor;
        /**
         * Notify on image load..
         */
        this.load = new EventEmitter();
        /**
         * Indicates if the image is still loading
         */
        this.isLoading = true;
        this._useImg = this.config.useImg;
    }
    Object.defineProperty(IonicImageLoaderComponent.prototype, "useImg", {
        /**
         * Use <img> tag
         */
        set: /**
         * Use <img> tag
         * @param {?} val
         * @return {?}
         */
        function (val) {
            this._useImg = val !== false;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(IonicImageLoaderComponent.prototype, "noCache", {
        /**
         * Convenience attribute to disable caching
         */
        set: /**
         * Convenience attribute to disable caching
         * @param {?} val
         * @return {?}
         */
        function (val) {
            this.cache = val !== false;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(IonicImageLoaderComponent.prototype, "src", {
        get: /**
         * @return {?}
         */
        function () {
            return this._src;
        },
        /**
         * The URL of the image to load.
         */
        set: /**
         * The URL of the image to load.
         * @param {?} imageUrl
         * @return {?}
         */
        function (imageUrl) {
            this._src = this.processImageUrl(imageUrl);
            this.updateImage(this._src);
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @return {?}
     */
    IonicImageLoaderComponent.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        if (this.fallbackAsPlaceholder && this.fallbackUrl) {
            this.setImage(this.fallbackUrl, false);
        }
        if (!this.src) {
            // image url was not passed
            // this can happen when [src] is set to a variable that turned out to be undefined
            // one example could be a list of users with their profile pictures
            // in this case, it would be useful to use the fallback image instead
            // if fallbackUrl was used as placeholder we do not need to set it again
            if (!this.fallbackAsPlaceholder && this.fallbackUrl) {
                // we're not going to cache the fallback image since it should be locally saved
                this.setImage(this.fallbackUrl);
            }
            else {
                this.isLoading = false;
            }
        }
    };
    /**
     * @private
     * @param {?} imageUrl
     * @return {?}
     */
    IonicImageLoaderComponent.prototype.updateImage = /**
     * @private
     * @param {?} imageUrl
     * @return {?}
     */
    function (imageUrl) {
        var _this = this;
        this.imageLoader
            .getImagePath(imageUrl)
            .then(function (url) { return _this.setImage(url); })
            .catch(function (error) { return _this.setImage(_this.fallbackUrl || imageUrl); });
    };
    /**
     * Gets the image URL to be loaded and disables caching if necessary
     */
    /**
     * Gets the image URL to be loaded and disables caching if necessary
     * @private
     * @param {?} imageUrl
     * @return {?}
     */
    IonicImageLoaderComponent.prototype.processImageUrl = /**
     * Gets the image URL to be loaded and disables caching if necessary
     * @private
     * @param {?} imageUrl
     * @return {?}
     */
    function (imageUrl) {
        if (this.cache === false) {
            // need to disable caching
            if (imageUrl.indexOf('?') < 0) {
                // add ? if doesn't exists
                imageUrl += '?';
            }
            else {
                imageUrl += '&';
            }
            // append timestamp at the end to make URL unique
            imageUrl += 'cache_buster=' + Date.now();
        }
        return imageUrl;
    };
    /**
     * Set the image to be displayed
     * @param imageUrl image src
     * @param stopLoading set to true to mark the image as loaded
     */
    /**
     * Set the image to be displayed
     * @private
     * @param {?} imageUrl image src
     * @param {?=} stopLoading set to true to mark the image as loaded
     * @return {?}
     */
    IonicImageLoaderComponent.prototype.setImage = /**
     * Set the image to be displayed
     * @private
     * @param {?} imageUrl image src
     * @param {?=} stopLoading set to true to mark the image as loaded
     * @return {?}
     */
    function (imageUrl, stopLoading) {
        var _this = this;
        if (stopLoading === void 0) { stopLoading = true; }
        this.isLoading = !stopLoading;
        if (this._useImg) {
            // Using <img> tag
            if (!this.element) {
                // create img element if we dont have one
                this.element = this.renderer.createElement('img');
                this.renderer.appendChild(this._element.nativeElement, this.element);
            }
            // set it's src
            this.renderer.setAttribute(this.element, 'src', imageUrl);
            // if imgAttributes are defined, add them to our img element
            this.imgAttributes.forEach(function (attribute) {
                _this.renderer.setAttribute(_this.element, attribute.element, attribute.value);
            });
            if (this.fallbackUrl && !this.imageLoader.nativeAvailable) {
                this.renderer.listen(this.element, 'error', function () {
                    return _this.renderer.setAttribute(_this.element, 'src', _this.fallbackUrl);
                });
            }
        }
        else {
            // Not using <img> tag
            this.element = this._element.nativeElement;
            for (var prop in propMap) {
                if (this[prop]) {
                    this.renderer.setStyle(this.element, propMap[prop], this[prop]);
                }
            }
            this.renderer.setStyle(this.element, 'background-image', "url(\"" + (imageUrl || this.fallbackUrl) + "\")");
        }
        if (stopLoading) {
            this.load.emit(this);
        }
    };
    IonicImageLoaderComponent.decorators = [
        { type: Component, args: [{
                    selector: 'img-loader',
                    template: "\n    <ion-spinner\n        *ngIf=\"spinner && isLoading && !fallbackAsPlaceholder\"\n        [name]=\"spinnerName\"\n        [color]=\"spinnerColor\"\n    ></ion-spinner>\n    <ng-content></ng-content>\n  ",
                    styles: ['ion-spinner { float: none; margin-left: auto; margin-right: auto; display: block; }']
                }] }
    ];
    /** @nocollapse */
    IonicImageLoaderComponent.ctorParameters = function () { return [
        { type: ElementRef },
        { type: Renderer2 },
        { type: ImageLoaderService },
        { type: ImageLoaderConfigService }
    ]; };
    IonicImageLoaderComponent.propDecorators = {
        fallbackUrl: [{ type: Input }],
        spinner: [{ type: Input }],
        fallbackAsPlaceholder: [{ type: Input }],
        imgAttributes: [{ type: Input }],
        cache: [{ type: Input }],
        width: [{ type: Input }],
        height: [{ type: Input }],
        display: [{ type: Input }],
        backgroundSize: [{ type: Input }],
        backgroundRepeat: [{ type: Input }],
        spinnerName: [{ type: Input }],
        spinnerColor: [{ type: Input }],
        load: [{ type: Output }],
        useImg: [{ type: Input }],
        noCache: [{ type: Input }],
        src: [{ type: Input }]
    };
    return IonicImageLoaderComponent;
}());
export { IonicImageLoaderComponent };
if (false) {
    /**
     * Fallback URL to load when the image url fails to load or does not exist.
     * @type {?}
     */
    IonicImageLoaderComponent.prototype.fallbackUrl;
    /**
     * Whether to show a spinner while the image loads
     * @type {?}
     */
    IonicImageLoaderComponent.prototype.spinner;
    /**
     * Whether to show the fallback image instead of a spinner while the image loads
     * @type {?}
     */
    IonicImageLoaderComponent.prototype.fallbackAsPlaceholder;
    /**
     * Attributes to pass through to img tag if _useImg == true
     * @type {?}
     */
    IonicImageLoaderComponent.prototype.imgAttributes;
    /**
     * Enable/Disable caching
     * @type {?}
     */
    IonicImageLoaderComponent.prototype.cache;
    /**
     * Width of the image. This will be ignored if using useImg.
     * @type {?}
     */
    IonicImageLoaderComponent.prototype.width;
    /**
     * Height of the image. This will be ignored if using useImg.
     * @type {?}
     */
    IonicImageLoaderComponent.prototype.height;
    /**
     * Display type of the image. This will be ignored if using useImg.
     * @type {?}
     */
    IonicImageLoaderComponent.prototype.display;
    /**
     * Background size. This will be ignored if using useImg.
     * @type {?}
     */
    IonicImageLoaderComponent.prototype.backgroundSize;
    /**
     * Background repeat. This will be ignored if using useImg.
     * @type {?}
     */
    IonicImageLoaderComponent.prototype.backgroundRepeat;
    /**
     * Name of the spinner
     * @type {?}
     */
    IonicImageLoaderComponent.prototype.spinnerName;
    /**
     * Color of the spinner
     * @type {?}
     */
    IonicImageLoaderComponent.prototype.spinnerColor;
    /**
     * Notify on image load..
     * @type {?}
     */
    IonicImageLoaderComponent.prototype.load;
    /**
     * Indicates if the image is still loading
     * @type {?}
     */
    IonicImageLoaderComponent.prototype.isLoading;
    /** @type {?} */
    IonicImageLoaderComponent.prototype.element;
    /**
     * @type {?}
     * @private
     */
    IonicImageLoaderComponent.prototype._useImg;
    /**
     * @type {?}
     * @private
     */
    IonicImageLoaderComponent.prototype._src;
    /**
     * @type {?}
     * @private
     */
    IonicImageLoaderComponent.prototype._element;
    /**
     * @type {?}
     * @private
     */
    IonicImageLoaderComponent.prototype.renderer;
    /**
     * @type {?}
     * @private
     */
    IonicImageLoaderComponent.prototype.imageLoader;
    /**
     * @type {?}
     * @private
     */
    IonicImageLoaderComponent.prototype.config;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW9uaWMtaW1hZ2UtbG9hZGVyLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL2lvbmljLWltYWdlLWxvYWRlci8iLCJzb3VyY2VzIjpbImxpYi9pb25pYy1pbWFnZS1sb2FkZXIuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFFLFVBQVUsRUFBRSxZQUFZLEVBQUUsS0FBSyxFQUFVLE1BQU0sRUFBRSxTQUFTLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDdEcsT0FBTyxFQUFFLHdCQUF3QixFQUFFLE1BQU0sd0NBQXdDLENBQUM7QUFDbEYsT0FBTyxFQUFFLGtCQUFrQixFQUFFLE1BQU0saUNBQWlDLENBQUM7O0lBRS9ELE9BQU8sR0FBUTtJQUNuQixPQUFPLEVBQUUsU0FBUztJQUNsQixNQUFNLEVBQUUsUUFBUTtJQUNoQixLQUFLLEVBQUUsT0FBTztJQUNkLGNBQWMsRUFBRSxpQkFBaUI7SUFDakMsZ0JBQWdCLEVBQUUsbUJBQW1CO0NBQ3RDOzs7O0FBRUQsb0NBR0M7OztJQUZDLGlDQUFnQjs7SUFDaEIsK0JBQWM7O0FBR2hCO0lBMkVFLG1DQUNVLFFBQW9CLEVBQ3BCLFFBQW1CLEVBQ25CLFdBQStCLEVBQy9CLE1BQWdDO1FBSGhDLGFBQVEsR0FBUixRQUFRLENBQVk7UUFDcEIsYUFBUSxHQUFSLFFBQVEsQ0FBVztRQUNuQixnQkFBVyxHQUFYLFdBQVcsQ0FBb0I7UUFDL0IsV0FBTSxHQUFOLE1BQU0sQ0FBMEI7Ozs7UUE3RGpDLGdCQUFXLEdBQVcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxXQUFXLENBQUM7Ozs7UUFJOUMsWUFBTyxHQUFZLElBQUksQ0FBQyxNQUFNLENBQUMsY0FBYyxDQUFDOzs7O1FBSzlDLDBCQUFxQixHQUFZLElBQUksQ0FBQyxNQUFNLENBQUMscUJBQXFCLENBQUM7Ozs7UUFJbkUsa0JBQWEsR0FBcUIsRUFBRSxDQUFDOzs7O1FBSXJDLFVBQUssR0FBRyxJQUFJ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SUwsS0FBSzt3QkFJTCxLQUFLO3dCQUlMLEtBQUs7eUJBSUwsS0FBSzswQkFJTCxLQUFLO2lDQUlMLEtBQUs7bUNBSUwsS0FBSzs4QkFJTCxLQUFLOytCQUlMLEtBQUs7dUJBSUwsTUFBTTt5QkFxQk4sS0FBSzswQkFRTCxLQUFLO3NCQWNMLEtBQUs7O0lBcUdSLGdDQUFDO0NBQUEsQUFuTkQsSUFtTkM7U0FyTVkseUJBQXlCOzs7Ozs7SUFJcEMsZ0RBQXVEOzs7OztJQUl2RCw0Q0FBdUQ7Ozs7O0lBS3ZELDBEQUE0RTs7Ozs7SUFJNUUsa0RBQThDOzs7OztJQUk5QywwQ0FBc0I7Ozs7O0lBSXRCLDBDQUEyQzs7Ozs7SUFJM0MsMkNBQTZDOzs7OztJQUk3Qyw0Q0FBK0M7Ozs7O0lBSS9DLG1EQUE2RDs7Ozs7SUFJN0QscURBQWlFOzs7OztJQUlqRSxnREFBdUQ7Ozs7O0lBSXZELGlEQUF5RDs7Ozs7SUFJekQseUNBQzhGOzs7OztJQUk5Riw4Q0FBaUI7O0lBQ2pCLDRDQUFxQjs7Ozs7SUFVckIsNENBQThDOzs7OztJQWtCOUMseUNBQXFCOzs7OztJQXpCbkIsNkNBQTRCOzs7OztJQUM1Qiw2Q0FBMkI7Ozs7O0lBQzNCLGdEQUF1Qzs7Ozs7SUFDdkMsMkNBQXdDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBFbGVtZW50UmVmLCBFdmVudEVtaXR0ZXIsIElucHV0LCBPbkluaXQsIE91dHB1dCwgUmVuZGVyZXIyIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBJbWFnZUxvYWRlckNvbmZpZ1NlcnZpY2UgfSBmcm9tICcuL3NlcnZpY2VzL2ltYWdlLWxvYWRlci1jb25maWcuc2VydmljZSc7XG5pbXBvcnQgeyBJbWFnZUxvYWRlclNlcnZpY2UgfSBmcm9tICcuL3NlcnZpY2VzL2ltYWdlLWxvYWRlci5zZXJ2aWNlJztcblxuY29uc3QgcHJvcE1hcDogYW55ID0ge1xuICBkaXNwbGF5OiAnZGlzcGxheScsXG4gIGhlaWdodDogJ2hlaWdodCcsXG4gIHdpZHRoOiAnd2lkdGgnLFxuICBiYWNrZ3JvdW5kU2l6ZTogJ2JhY2tncm91bmQtc2l6ZScsXG4gIGJhY2tncm91bmRSZXBlYXQ6ICdiYWNrZ3JvdW5kLXJlcGVhdCcsXG59O1xuXG5leHBvcnQgaW50ZXJmYWNlIEltYWdlQXR0cmlidXRlIHtcbiAgZWxlbWVudDogc3RyaW5nO1xuICB2YWx1ZTogc3RyaW5nO1xufVxuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdpbWctbG9hZGVyJyxcbiAgdGVtcGxhdGU6IGBcbiAgICA8aW9uLXNwaW5uZXJcbiAgICAgICAgKm5nSWY9XCJzcGlubmVyICYmIGlzTG9hZGluZyAmJiAhZmFsbGJhY2tBc1BsYWNlaG9sZGVyXCJcbiAgICAgICAgW25hbWVdPVwic3Bpbm5lck5hbWVcIlxuICAgICAgICBbY29sb3JdPVwic3Bpbm5lckNvbG9yXCJcbiAgICA+PC9pb24tc3Bpbm5lcj5cbiAgICA8bmctY29udGVudD48L25nLWNvbnRlbnQ+XG4gIGAsXG4gIHN0eWxlczogW1xuICAgICdpb24tc3Bpbm5lciB7IGZsb2F0OiBub25lOyBtYXJnaW4tbGVmdDogYXV0bzsgbWFyZ2luLXJpZ2h0OiBhdXRvOyBkaXNwbGF5OiBibG9jazsgfScsXG4gIF0sXG59KVxuZXhwb3J0IGNsYXNzIElvbmljSW1hZ2VMb2FkZXJDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xuICAvKipcbiAgICogRmFsbGJhY2sgVVJMIHRvIGxvYWQgd2hlbiB0aGUgaW1hZ2UgdXJsIGZhaWxzIHRvIGxvYWQgb3IgZG9lcyBub3QgZXhpc3QuXG4gICAqL1xuICBASW5wdXQoKSBmYWxsYmFja1VybDogc3RyaW5nID0gdGhpcy5jb25maWcuZmFsbGJhY2tVcmw7XG4gIC8qKlxuICAgKiBXaGV0aGVyIHRvIHNob3cgYSBzcGlubmVyIHdoaWxlIHRoZSBpbWFnZSBsb2Fkc1xuICAgKi9cbiAgQElucHV0KCkgc3Bpbm5lcjogYm9vbGVhbiA9IHRoaXMuY29uZmlnLnNwaW5uZXJFbmFibGVkO1xuICAvKipcbiAgICogV2hldGhlciB0byBzaG93IHRoZSBmYWxsYmFjayBpbWFnZSBpbnN0ZWFkIG9mIGEgc3Bpbm5lciB3aGlsZSB0aGUgaW1hZ2UgbG9hZHNcbiAgICovXG5cbiAgQElucHV0KCkgZmFsbGJhY2tBc1BsYWNlaG9sZGVyOiBib29sZWFuID0gdGhpcy5jb25maWcuZmFsbGJhY2tBc1BsYWNlaG9sZGVyO1xuICAvKipcbiAgICogQXR0cmlidXRlcyB0byBwYXNzIHRocm91Z2ggdG8gaW1nIHRhZyBpZiBfdXNlSW1nID09IHRydWVcbiAgICovXG4gIEBJbnB1dCgpIGltZ0F0dHJpYnV0ZXM6IEltYWdlQXR0cmlidXRlW10gPSBbXTtcbiAgLyoqXG4gICAqIEVuYWJsZS9EaXNhYmxlIGNhY2hpbmdcbiAgICovXG4gIEBJbnB1dCgpIGNhY2hlID0gdHJ1ZTtcbiAgLyoqXG4gICAqIFdpZHRoIG9mIHRoZSBpbWFnZS4gVGhpcyB3aWxsIGJlIGlnbm9yZWQgaWYgdXNpbmcgdXNlSW1nLlxuICAgKi9cbiAgQElucHV0KCkgd2lkdGg6IHN0cmluZyA9IHRoaXMuY29uZmlnLndpZHRoO1xuICAvKipcbiAgICogSGVpZ2h0IG9mIHRoZSBpbWFnZS4gVGhpcyB3aWxsIGJlIGlnbm9yZWQgaWYgdXNpbmcgdXNlSW1nLlxuICAgKi9cbiAgQElucHV0KCkgaGVpZ2h0OiBzdHJpbmcgPSB0aGlzLmNvbmZpZy5oZWlnaHQ7XG4gIC8qKlxuICAgKiBEaXNwbGF5IHR5cGUgb2YgdGhlIGltYWdlLiBUaGlzIHdpbGwgYmUgaWdub3JlZCBpZiB1c2luZyB1c2VJbWcuXG4gICAqL1xuICBASW5wdXQoKSBkaXNwbGF5OiBzdHJpbmcgPSB0aGlzLmNvbmZpZy5kaXNwbGF5O1xuICAvKipcbiAgICogQmFja2dyb3VuZCBzaXplLiBUaGlzIHdpbGwgYmUgaWdub3JlZCBpZiB1c2luZyB1c2VJbWcuXG4gICAqL1xuICBASW5wdXQoKSBiYWNrZ3JvdW5kU2l6ZTogc3RyaW5nID0gdGhpcy5jb25maWcuYmFja2dyb3VuZFNpemU7XG4gIC8qKlxuICAgKiBCYWNrZ3JvdW5kIHJlcGVhdC4gVGhpcyB3aWxsIGJlIGlnbm9yZWQgaWYgdXNpbmcgdXNlSW1nLlxuICAgKi9cbiAgQElucHV0KCkgYmFja2dyb3VuZFJlcGVhdDogc3RyaW5nID0gdGhpcy5jb25maWcuYmFja2dyb3VuZFJlcGVhdDtcbiAgLyoqXG4gICAqIE5hbWUgb2YgdGhlIHNwaW5uZXJcbiAgICovXG4gIEBJbnB1dCgpIHNwaW5uZXJOYW1lOiBzdHJpbmcgPSB0aGlzLmNvbmZpZy5zcGlubmVyTmFtZTtcbiAgLyoqXG4gICAqIENvbG9yIG9mIHRoZSBzcGlubmVyXG4gICAqL1xuICBASW5wdXQoKSBzcGlubmVyQ29sb3I6IHN0cmluZyA9IHRoaXMuY29uZmlnLnNwaW5uZXJDb2xvcjtcbiAgLyoqXG4gICAqIE5vdGlmeSBvbiBpbWFnZSBsb2FkLi5cbiAgICovXG4gIEBPdXRwdXQoKVxuICBsb2FkOiBFdmVudEVtaXR0ZXI8SW9uaWNJbWFnZUxvYWRlckNvbXBvbmVudD4gPSBuZXcgRXZlbnRFbWl0dGVyPElvbmljSW1hZ2VMb2FkZXJDb21wb25lbnQ+KCk7XG4gIC8qKlxuICAgKiBJbmRpY2F0ZXMgaWYgdGhlIGltYWdlIGlzIHN0aWxsIGxvYWRpbmdcbiAgICovXG4gIGlzTG9hZGluZyA9IHRydWU7XG4gIGVsZW1lbnQ6IEhUTUxFbGVtZW50O1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgIHByaXZhdGUgX2VsZW1lbnQ6IEVsZW1lbnRSZWYsXG4gICAgcHJpdmF0ZSByZW5kZXJlcjogUmVuZGVyZXIyLFxuICAgIHByaXZhdGUgaW1hZ2VMb2FkZXI6IEltYWdlTG9hZGVyU2VydmljZSxcbiAgICBwcml2YXRlIGNvbmZpZzogSW1hZ2VMb2FkZXJDb25maWdTZXJ2aWNlLFxuICApIHtcbiAgfVxuXG4gIHByaXZhdGUgX3VzZUltZzogYm9vbGVhbiA9IHRoaXMuY29uZmlnLnVzZUltZztcblxuICAvKipcbiAgICogVXNlIDxpbWc+IHRhZ1xuICAgKi9cbiAgQElucHV0KClcbiAgc2V0IHVzZUltZyh2YWw6IGJvb2xlYW4pIHtcbiAgICB0aGlzLl91c2VJbWcgPSB2YWwgIT09IGZhbHNlO1xuICB9XG5cbiAgLyoqXG4gICAqIENvbnZlbmllbmNlIGF0dHJpYnV0ZSB0byBkaXNhYmxlIGNhY2hpbmdcbiAgICovXG4gIEBJbnB1dCgpXG4gIHNldCBub0NhY2hlKHZhbDogYm9vbGVhbikge1xuICAgIHRoaXMuY2FjaGUgPSB2YWwgIT09IGZhbHNlO1xuICB9XG5cbiAgcHJpdmF0ZSBfc3JjOiBzdHJpbmc7XG5cbiAgZ2V0IHNyYygpOiBzdHJpbmcge1xuICAgIHJldHVybiB0aGlzLl9zcmM7XG4gIH1cblxuICAvKipcbiAgICogVGhlIFVSTCBvZiB0aGUgaW1hZ2UgdG8gbG9hZC5cbiAgICovXG4gIEBJbnB1dCgpXG4gIHNldCBzcmMoaW1hZ2VVcmw6IHN0cmluZykge1xuICAgIHRoaXMuX3NyYyA9IHRoaXMucHJvY2Vzc0ltYWdlVXJsKGltYWdlVXJsKTtcbiAgICB0aGlzLnVwZGF0ZUltYWdlKHRoaXMuX3NyYyk7XG4gIH1cblxuICBuZ09uSW5pdCgpOiB2b2lkIHtcbiAgICBpZiAodGhpcy5mYWxsYmFja0FzUGxhY2Vob2xkZXIgJiYgdGhpcy5mYWxsYmFja1VybCkge1xuICAgICAgdGhpcy5zZXRJbWFnZSh0aGlzLmZhbGxiYWNrVXJsLCBmYWxzZSk7XG4gICAgfVxuXG4gICAgaWYgKCF0aGlzLnNyYykge1xuICAgICAgLy8gaW1hZ2UgdXJsIHdhcyBub3QgcGFzc2VkXG4gICAgICAvLyB0aGlzIGNhbiBoYXBwZW4gd2hlbiBbc3JjXSBpcyBzZXQgdG8gYSB2YXJpYWJsZSB0aGF0IHR1cm5lZCBvdXQgdG8gYmUgdW5kZWZpbmVkXG4gICAgICAvLyBvbmUgZXhhbXBsZSBjb3VsZCBiZSBhIGxpc3Qgb2YgdXNlcnMgd2l0aCB0aGVpciBwcm9maWxlIHBpY3R1cmVzXG4gICAgICAvLyBpbiB0aGlzIGNhc2UsIGl0IHdvdWxkIGJlIHVzZWZ1bCB0byB1c2UgdGhlIGZhbGxiYWNrIGltYWdlIGluc3RlYWRcbiAgICAgIC8vIGlmIGZhbGxiYWNrVXJsIHdhcyB1c2VkIGFzIHBsYWNlaG9sZGVyIHdlIGRvIG5vdCBuZWVkIHRvIHNldCBpdCBhZ2FpblxuICAgICAgaWYgKCF0aGlzLmZhbGxiYWNrQXNQbGFjZWhvbGRlciAmJiB0aGlzLmZhbGxiYWNrVXJsKSB7XG4gICAgICAgIC8vIHdlJ3JlIG5vdCBnb2luZyB0byBjYWNoZSB0aGUgZmFsbGJhY2sgaW1hZ2Ugc2luY2UgaXQgc2hvdWxkIGJlIGxvY2FsbHkgc2F2ZWRcbiAgICAgICAgdGhpcy5zZXRJbWFnZSh0aGlzLmZhbGxiYWNrVXJsKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMuaXNMb2FkaW5nID0gZmFsc2U7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSB1cGRhdGVJbWFnZShpbWFnZVVybDogc3RyaW5nKSB7XG4gICAgdGhpcy5pbWFnZUxvYWRlclxuICAgICAgLmdldEltYWdlUGF0aChpbWFnZVVybClcbiAgICAgIC50aGVuKCh1cmw6IHN0cmluZykgPT4gdGhpcy5zZXRJbWFnZSh1cmwpKVxuICAgICAgLmNhdGNoKChlcnJvcjogYW55KSA9PiB0aGlzLnNldEltYWdlKHRoaXMuZmFsbGJhY2tVcmwgfHwgaW1hZ2VVcmwpKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBHZXRzIHRoZSBpbWFnZSBVUkwgdG8gYmUgbG9hZGVkIGFuZCBkaXNhYmxlcyBjYWNoaW5nIGlmIG5lY2Vzc2FyeVxuICAgKi9cbiAgcHJpdmF0ZSBwcm9jZXNzSW1hZ2VVcmwoaW1hZ2VVcmw6IHN0cmluZyk6IHN0cmluZyB7XG4gICAgaWYgKHRoaXMuY2FjaGUgPT09IGZhbHNlKSB7XG4gICAgICAvLyBuZWVkIHRvIGRpc2FibGUgY2FjaGluZ1xuXG4gICAgICBpZiAoaW1hZ2VVcmwuaW5kZXhPZignPycpIDwgMCkge1xuICAgICAgICAvLyBhZGQgPyBpZiBkb2Vzbid0IGV4aXN0c1xuICAgICAgICBpbWFnZVVybCArPSAnPyc7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBpbWFnZVVybCArPSAnJic7XG4gICAgICB9XG4gICAgICAvLyBhcHBlbmQgdGltZXN0YW1wIGF0IHRoZSBlbmQgdG8gbWFrZSBVUkwgdW5pcXVlXG4gICAgICBpbWFnZVVybCArPSAnY2FjaGVfYnVzdGVyPScgKyBEYXRlLm5vdygpO1xuICAgIH1cblxuICAgIHJldHVybiBpbWFnZVVybDtcbiAgfVxuXG4gIC8qKlxuICAgKiBTZXQgdGhlIGltYWdlIHRvIGJlIGRpc3BsYXllZFxuICAgKiBAcGFyYW0gaW1hZ2VVcmwgaW1hZ2Ugc3JjXG4gICAqIEBwYXJhbSBzdG9wTG9hZGluZyBzZXQgdG8gdHJ1ZSB0byBtYXJrIHRoZSBpbWFnZSBhcyBsb2FkZWRcbiAgICovXG4gIHByaXZhdGUgc2V0SW1hZ2UoaW1hZ2VVcmw6IHN0cmluZywgc3RvcExvYWRpbmc6IGJvb2xlYW4gPSB0cnVlKTogdm9pZCB7XG4gICAgdGhpcy5pc0xvYWRpbmcgPSAhc3RvcExvYWRpbmc7XG5cbiAgICBpZiAodGhpcy5fdXNlSW1nKSB7XG4gICAgICAvLyBVc2luZyA8aW1nPiB0YWdcbiAgICAgIGlmICghdGhpcy5lbGVtZW50KSB7XG4gICAgICAgIC8vIGNyZWF0ZSBpbWcgZWxlbWVudCBpZiB3ZSBkb250IGhhdmUgb25lXG4gICAgICAgIHRoaXMuZWxlbWVudCA9IHRoaXMucmVuZGVyZXIuY3JlYXRlRWxlbWVudCgnaW1nJyk7XG4gICAgICAgIHRoaXMucmVuZGVyZXIuYXBwZW5kQ2hpbGQodGhpcy5fZWxlbWVudC5uYXRpdmVFbGVtZW50LCB0aGlzLmVsZW1lbnQpO1xuICAgICAgfVxuXG4gICAgICAvLyBzZXQgaXQncyBzcmNcbiAgICAgIHRoaXMucmVuZGVyZXIuc2V0QXR0cmlidXRlKHRoaXMuZWxlbWVudCwgJ3NyYycsIGltYWdlVXJsKTtcblxuICAgICAgLy8gaWYgaW1nQXR0cmlidXRlcyBhcmUgZGVmaW5lZCwgYWRkIHRoZW0gdG8gb3VyIGltZyBlbGVtZW50XG4gICAgICB0aGlzLmltZ0F0dHJpYnV0ZXMuZm9yRWFjaCgoYXR0cmlidXRlKSA9PiB7XG4gICAgICAgIHRoaXMucmVuZGVyZXIuc2V0QXR0cmlidXRlKHRoaXMuZWxlbWVudCwgYXR0cmlidXRlLmVsZW1lbnQsIGF0dHJpYnV0ZS52YWx1ZSk7XG4gICAgICB9KTtcbiAgICAgIGlmICh0aGlzLmZhbGxiYWNrVXJsICYmICF0aGlzLmltYWdlTG9hZGVyLm5hdGl2ZUF2YWlsYWJsZSkge1xuICAgICAgICB0aGlzLnJlbmRlcmVyLmxpc3Rlbih0aGlzLmVsZW1lbnQsICdlcnJvcicsICgpID0+XG4gICAgICAgICAgdGhpcy5yZW5kZXJlci5zZXRBdHRyaWJ1dGUodGhpcy5lbGVtZW50LCAnc3JjJywgdGhpcy5mYWxsYmFja1VybCksXG4gICAgICAgICk7XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIC8vIE5vdCB1c2luZyA8aW1nPiB0YWdcblxuICAgICAgdGhpcy5lbGVtZW50ID0gdGhpcy5fZWxlbWVudC5uYXRpdmVFbGVtZW50O1xuXG4gICAgICBmb3IgKGNvbnN0IHByb3AgaW4gcHJvcE1hcCkge1xuICAgICAgICBpZiAodGhpc1twcm9wXSkge1xuICAgICAgICAgIHRoaXMucmVuZGVyZXIuc2V0U3R5bGUodGhpcy5lbGVtZW50LCBwcm9wTWFwW3Byb3BdLCB0aGlzW3Byb3BdKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgdGhpcy5yZW5kZXJlci5zZXRTdHlsZShcbiAgICAgICAgdGhpcy5lbGVtZW50LFxuICAgICAgICAnYmFja2dyb3VuZC1pbWFnZScsXG4gICAgICAgIGB1cmwoXCIke2ltYWdlVXJsIHx8IHRoaXMuZmFsbGJhY2tVcmx9XCIpYCxcbiAgICAgICk7XG4gICAgfVxuICAgIGlmIChzdG9wTG9hZGluZykge1xuICAgICAgdGhpcy5sb2FkLmVtaXQodGhpcyk7XG4gICAgfVxuICB9XG59XG4iXX0=