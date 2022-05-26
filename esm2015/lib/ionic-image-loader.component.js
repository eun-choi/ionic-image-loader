/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Component, ElementRef, EventEmitter, Input, Output, Renderer2 } from '@angular/core';
import { ImageLoaderConfigService } from './services/image-loader-config.service';
import { ImageLoaderService } from './services/image-loader.service';
/** @type {?} */
const propMap = {
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
export class IonicImageLoaderComponent {
    /**
     * @param {?} _element
     * @param {?} renderer
     * @param {?} imageLoader
     * @param {?} config
     */
    constructor(_element, renderer, imageLoader, config) {
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
    /**
     * Use <img> tag
     * @param {?} val
     * @return {?}
     */
    set useImg(val) {
        this._useImg = val !== false;
    }
    /**
     * Convenience attribute to disable caching
     * @param {?} val
     * @return {?}
     */
    set noCache(val) {
        this.cache = val !== false;
    }
    /**
     * @return {?}
     */
    get src() {
        return this._src;
    }
    /**
     * The URL of the image to load.
     * @param {?} imageUrl
     * @return {?}
     */
    set src(imageUrl) {
        this._src = this.processImageUrl(imageUrl);
        this.updateImage(this._src);
    }
    /**
     * @return {?}
     */
    ngOnInit() {
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
    }
    /**
     * @private
     * @param {?} imageUrl
     * @return {?}
     */
    updateImage(imageUrl) {
        this.imageLoader
            .getImagePath(imageUrl)
            .then((url) => this.setImage(url))
            .catch((error) => this.setImage(this.fallbackUrl || imageUrl));
    }
    /**
     * Gets the image URL to be loaded and disables caching if necessary
     * @private
     * @param {?} imageUrl
     * @return {?}
     */
    processImageUrl(imageUrl) {
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
    }
    /**
     * Set the image to be displayed
     * @private
     * @param {?} imageUrl image src
     * @param {?=} stopLoading set to true to mark the image as loaded
     * @return {?}
     */
    setImage(imageUrl, stopLoading = true) {
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
            this.imgAttributes.forEach((attribute) => {
                this.renderer.setAttribute(this.element, attribute.element, attribute.value);
            });
            if (this.fallbackUrl && !this.imageLoader.nativeAvailable) {
                this.renderer.listen(this.element, 'error', () => this.renderer.setAttribute(this.element, 'src', this.fallbackUrl));
            }
        }
        else {
            // Not using <img> tag
            this.element = this._element.nativeElement;
            for (const prop in propMap) {
                if (this[prop]) {
                    this.renderer.setStyle(this.element, propMap[prop], this[prop]);
                }
            }
            this.renderer.setStyle(this.element, 'background-image', `url("${imageUrl || this.fallbackUrl}")`);
        }
        if (stopLoading) {
            this.load.emit(this);
        }
    }
}
IonicImageLoaderComponent.decorators = [
    { type: Component, args: [{
                selector: 'img-loader',
                template: `
    <ion-spinner
        *ngIf="spinner && isLoading && !fallbackAsPlaceholder"
        [name]="spinnerName"
        [color]="spinnerColor"
    ></ion-spinner>
    <ng-content></ng-content>
  `,
                styles: ['ion-spinner { float: none; margin-left: auto; margin-right: auto; display: block; }']
            }] }
];
/** @nocollapse */
IonicImageLoaderComponent.ctorParameters = () => [
    { type: ElementRef },
    { type: Renderer2 },
    { type: ImageLoaderService },
    { type: ImageLoaderConfigService }
];
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW9uaWMtaW1hZ2UtbG9hZGVyLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL2lvbmljLWltYWdlLWxvYWRlci8iLCJzb3VyY2VzIjpbImxpYi9pb25pYy1pbWFnZS1sb2FkZXIuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFFLFVBQVUsRUFBRSxZQUFZLEVBQUUsS0FBSyxFQUFVLE1BQU0sRUFBRSxTQUFTLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDdEcsT0FBTyxFQUFFLHdCQUF3QixFQUFFLE1BQU0sd0NBQXdDLENBQUM7QUFDbEYsT0FBTyxFQUFFLGtCQUFrQixFQUFFLE1BQU0saUNBQWlDLENBQUM7O01BRS9ELE9BQU8sR0FBUTtJQUNuQixPQUFPLEVBQUUsU0FBUztJQUNsQixNQUFNLEVBQUUsUUFBUTtJQUNoQixLQUFLLEVBQUUsT0FBTztJQUNkLGNBQWMsRUFBRSxpQkFBaUI7SUFDakMsZ0JBQWdCLEVBQUUsbUJBQW1CO0NBQ3RDOzs7O0FBRUQsb0NBR0M7OztJQUZDLGlDQUFnQjs7SUFDaEIsK0JBQWM7O0FBaUJoQixNQUFNLE9BQU8seUJBQXlCOzs7Ozs7O0lBNkRwQyxZQUNVLFFBQW9CLEVBQ3BCLFFBQW1CLEVBQ25CLFdBQStCLEVBQy9CLE1BQWdDO1FBSGhDLGFBQVEsR0FBUixRQUFRLENBQVk7UUFDcEIsYUFBUSxHQUFSLFFBQVEsQ0FBVztRQUNuQixnQkFBVyxHQUFYLFdBQVcsQ0FBb0I7UUFDL0IsV0FBTSxHQUFOLE1BQU0sQ0FBMEI7Ozs7UUE3RGpDLGdCQUFXLEdBQVcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxXQUFXLENBQUM7Ozs7UUFJOUMsWUFBTyxHQUFZLElBQUksQ0FBQyxNQUFNLENBQUMsY0FBYyxDQUFDOzs7O1FBSzlDLDBCQUFxQixHQUFZLElBQUksQ0FBQyxNQUFNLENBQUMscUJBQXFCLENBQUM7Ozs7UUFJbkUsa0JBQWEsR0FBcUIsRUFBRSxDQUFD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LDRDQUF1RDs7Ozs7SUFLdkQsMERBQTRFOzs7OztJQUk1RSxrREFBOEM7Ozs7O0lBSTlDLDBDQUFzQjs7Ozs7SUFJdEIsMENBQTJDOzs7OztJQUkzQywyQ0FBNkM7Ozs7O0lBSTdDLDRDQUErQzs7Ozs7SUFJL0MsbURBQTZEOzs7OztJQUk3RCxxREFBaUU7Ozs7O0lBSWpFLGdEQUF1RDs7Ozs7SUFJdkQsaURBQXlEOzs7OztJQUl6RCx5Q0FDOEY7Ozs7O0lBSTlGLDhDQUFpQjs7SUFDakIsNENBQXFCOzs7OztJQVVyQiw0Q0FBOEM7Ozs7O0lBa0I5Qyx5Q0FBcUI7Ozs7O0lBekJuQiw2Q0FBNEI7Ozs7O0lBQzVCLDZDQUEyQjs7Ozs7SUFDM0IsZ0RBQXVDOzs7OztJQUN2QywyQ0FBd0MiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIEVsZW1lbnRSZWYsIEV2ZW50RW1pdHRlciwgSW5wdXQsIE9uSW5pdCwgT3V0cHV0LCBSZW5kZXJlcjIgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEltYWdlTG9hZGVyQ29uZmlnU2VydmljZSB9IGZyb20gJy4vc2VydmljZXMvaW1hZ2UtbG9hZGVyLWNvbmZpZy5zZXJ2aWNlJztcbmltcG9ydCB7IEltYWdlTG9hZGVyU2VydmljZSB9IGZyb20gJy4vc2VydmljZXMvaW1hZ2UtbG9hZGVyLnNlcnZpY2UnO1xuXG5jb25zdCBwcm9wTWFwOiBhbnkgPSB7XG4gIGRpc3BsYXk6ICdkaXNwbGF5JyxcbiAgaGVpZ2h0OiAnaGVpZ2h0JyxcbiAgd2lkdGg6ICd3aWR0aCcsXG4gIGJhY2tncm91bmRTaXplOiAnYmFja2dyb3VuZC1zaXplJyxcbiAgYmFja2dyb3VuZFJlcGVhdDogJ2JhY2tncm91bmQtcmVwZWF0Jyxcbn07XG5cbmV4cG9ydCBpbnRlcmZhY2UgSW1hZ2VBdHRyaWJ1dGUge1xuICBlbGVtZW50OiBzdHJpbmc7XG4gIHZhbHVlOiBzdHJpbmc7XG59XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2ltZy1sb2FkZXInLFxuICB0ZW1wbGF0ZTogYFxuICAgIDxpb24tc3Bpbm5lclxuICAgICAgICAqbmdJZj1cInNwaW5uZXIgJiYgaXNMb2FkaW5nICYmICFmYWxsYmFja0FzUGxhY2Vob2xkZXJcIlxuICAgICAgICBbbmFtZV09XCJzcGlubmVyTmFtZVwiXG4gICAgICAgIFtjb2xvcl09XCJzcGlubmVyQ29sb3JcIlxuICAgID48L2lvbi1zcGlubmVyPlxuICAgIDxuZy1jb250ZW50PjwvbmctY29udGVudD5cbiAgYCxcbiAgc3R5bGVzOiBbXG4gICAgJ2lvbi1zcGlubmVyIHsgZmxvYXQ6IG5vbmU7IG1hcmdpbi1sZWZ0OiBhdXRvOyBtYXJnaW4tcmlnaHQ6IGF1dG87IGRpc3BsYXk6IGJsb2NrOyB9JyxcbiAgXSxcbn0pXG5leHBvcnQgY2xhc3MgSW9uaWNJbWFnZUxvYWRlckNvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XG4gIC8qKlxuICAgKiBGYWxsYmFjayBVUkwgdG8gbG9hZCB3aGVuIHRoZSBpbWFnZSB1cmwgZmFpbHMgdG8gbG9hZCBvciBkb2VzIG5vdCBleGlzdC5cbiAgICovXG4gIEBJbnB1dCgpIGZhbGxiYWNrVXJsOiBzdHJpbmcgPSB0aGlzLmNvbmZpZy5mYWxsYmFja1VybDtcbiAgLyoqXG4gICAqIFdoZXRoZXIgdG8gc2hvdyBhIHNwaW5uZXIgd2hpbGUgdGhlIGltYWdlIGxvYWRzXG4gICAqL1xuICBASW5wdXQoKSBzcGlubmVyOiBib29sZWFuID0gdGhpcy5jb25maWcuc3Bpbm5lckVuYWJsZWQ7XG4gIC8qKlxuICAgKiBXaGV0aGVyIHRvIHNob3cgdGhlIGZhbGxiYWNrIGltYWdlIGluc3RlYWQgb2YgYSBzcGlubmVyIHdoaWxlIHRoZSBpbWFnZSBsb2Fkc1xuICAgKi9cblxuICBASW5wdXQoKSBmYWxsYmFja0FzUGxhY2Vob2xkZXI6IGJvb2xlYW4gPSB0aGlzLmNvbmZpZy5mYWxsYmFja0FzUGxhY2Vob2xkZXI7XG4gIC8qKlxuICAgKiBBdHRyaWJ1dGVzIHRvIHBhc3MgdGhyb3VnaCB0byBpbWcgdGFnIGlmIF91c2VJbWcgPT0gdHJ1ZVxuICAgKi9cbiAgQElucHV0KCkgaW1nQXR0cmlidXRlczogSW1hZ2VBdHRyaWJ1dGVbXSA9IFtdO1xuICAvKipcbiAgICogRW5hYmxlL0Rpc2FibGUgY2FjaGluZ1xuICAgKi9cbiAgQElucHV0KCkgY2FjaGUgPSB0cnVlO1xuICAvKipcbiAgICogV2lkdGggb2YgdGhlIGltYWdlLiBUaGlzIHdpbGwgYmUgaWdub3JlZCBpZiB1c2luZyB1c2VJbWcuXG4gICAqL1xuICBASW5wdXQoKSB3aWR0aDogc3RyaW5nID0gdGhpcy5jb25maWcud2lkdGg7XG4gIC8qKlxuICAgKiBIZWlnaHQgb2YgdGhlIGltYWdlLiBUaGlzIHdpbGwgYmUgaWdub3JlZCBpZiB1c2luZyB1c2VJbWcuXG4gICAqL1xuICBASW5wdXQoKSBoZWlnaHQ6IHN0cmluZyA9IHRoaXMuY29uZmlnLmhlaWdodDtcbiAgLyoqXG4gICAqIERpc3BsYXkgdHlwZSBvZiB0aGUgaW1hZ2UuIFRoaXMgd2lsbCBiZSBpZ25vcmVkIGlmIHVzaW5nIHVzZUltZy5cbiAgICovXG4gIEBJbnB1dCgpIGRpc3BsYXk6IHN0cmluZyA9IHRoaXMuY29uZmlnLmRpc3BsYXk7XG4gIC8qKlxuICAgKiBCYWNrZ3JvdW5kIHNpemUuIFRoaXMgd2lsbCBiZSBpZ25vcmVkIGlmIHVzaW5nIHVzZUltZy5cbiAgICovXG4gIEBJbnB1dCgpIGJhY2tncm91bmRTaXplOiBzdHJpbmcgPSB0aGlzLmNvbmZpZy5iYWNrZ3JvdW5kU2l6ZTtcbiAgLyoqXG4gICAqIEJhY2tncm91bmQgcmVwZWF0LiBUaGlzIHdpbGwgYmUgaWdub3JlZCBpZiB1c2luZyB1c2VJbWcuXG4gICAqL1xuICBASW5wdXQoKSBiYWNrZ3JvdW5kUmVwZWF0OiBzdHJpbmcgPSB0aGlzLmNvbmZpZy5iYWNrZ3JvdW5kUmVwZWF0O1xuICAvKipcbiAgICogTmFtZSBvZiB0aGUgc3Bpbm5lclxuICAgKi9cbiAgQElucHV0KCkgc3Bpbm5lck5hbWU6IHN0cmluZyA9IHRoaXMuY29uZmlnLnNwaW5uZXJOYW1lO1xuICAvKipcbiAgICogQ29sb3Igb2YgdGhlIHNwaW5uZXJcbiAgICovXG4gIEBJbnB1dCgpIHNwaW5uZXJDb2xvcjogc3RyaW5nID0gdGhpcy5jb25maWcuc3Bpbm5lckNvbG9yO1xuICAvKipcbiAgICogTm90aWZ5IG9uIGltYWdlIGxvYWQuLlxuICAgKi9cbiAgQE91dHB1dCgpXG4gIGxvYWQ6IEV2ZW50RW1pdHRlcjxJb25pY0ltYWdlTG9hZGVyQ29tcG9uZW50PiA9IG5ldyBFdmVudEVtaXR0ZXI8SW9uaWNJbWFnZUxvYWRlckNvbXBvbmVudD4oKTtcbiAgLyoqXG4gICAqIEluZGljYXRlcyBpZiB0aGUgaW1hZ2UgaXMgc3RpbGwgbG9hZGluZ1xuICAgKi9cbiAgaXNMb2FkaW5nID0gdHJ1ZTtcbiAgZWxlbWVudDogSFRNTEVsZW1lbnQ7XG5cbiAgY29uc3RydWN0b3IoXG4gICAgcHJpdmF0ZSBfZWxlbWVudDogRWxlbWVudFJlZixcbiAgICBwcml2YXRlIHJlbmRlcmVyOiBSZW5kZXJlcjIsXG4gICAgcHJpdmF0ZSBpbWFnZUxvYWRlcjogSW1hZ2VMb2FkZXJTZXJ2aWNlLFxuICAgIHByaXZhdGUgY29uZmlnOiBJbWFnZUxvYWRlckNvbmZpZ1NlcnZpY2UsXG4gICkge1xuICB9XG5cbiAgcHJpdmF0ZSBfdXNlSW1nOiBib29sZWFuID0gdGhpcy5jb25maWcudXNlSW1nO1xuXG4gIC8qKlxuICAgKiBVc2UgPGltZz4gdGFnXG4gICAqL1xuICBASW5wdXQoKVxuICBzZXQgdXNlSW1nKHZhbDogYm9vbGVhbikge1xuICAgIHRoaXMuX3VzZUltZyA9IHZhbCAhPT0gZmFsc2U7XG4gIH1cblxuICAvKipcbiAgICogQ29udmVuaWVuY2UgYXR0cmlidXRlIHRvIGRpc2FibGUgY2FjaGluZ1xuICAgKi9cbiAgQElucHV0KClcbiAgc2V0IG5vQ2FjaGUodmFsOiBib29sZWFuKSB7XG4gICAgdGhpcy5jYWNoZSA9IHZhbCAhPT0gZmFsc2U7XG4gIH1cblxuICBwcml2YXRlIF9zcmM6IHN0cmluZztcblxuICBnZXQgc3JjKCk6IHN0cmluZyB7XG4gICAgcmV0dXJuIHRoaXMuX3NyYztcbiAgfVxuXG4gIC8qKlxuICAgKiBUaGUgVVJMIG9mIHRoZSBpbWFnZSB0byBsb2FkLlxuICAgKi9cbiAgQElucHV0KClcbiAgc2V0IHNyYyhpbWFnZVVybDogc3RyaW5nKSB7XG4gICAgdGhpcy5fc3JjID0gdGhpcy5wcm9jZXNzSW1hZ2VVcmwoaW1hZ2VVcmwpO1xuICAgIHRoaXMudXBkYXRlSW1hZ2UodGhpcy5fc3JjKTtcbiAgfVxuXG4gIG5nT25Jbml0KCk6IHZvaWQge1xuICAgIGlmICh0aGlzLmZhbGxiYWNrQXNQbGFjZWhvbGRlciAmJiB0aGlzLmZhbGxiYWNrVXJsKSB7XG4gICAgICB0aGlzLnNldEltYWdlKHRoaXMuZmFsbGJhY2tVcmwsIGZhbHNlKTtcbiAgICB9XG5cbiAgICBpZiAoIXRoaXMuc3JjKSB7XG4gICAgICAvLyBpbWFnZSB1cmwgd2FzIG5vdCBwYXNzZWRcbiAgICAgIC8vIHRoaXMgY2FuIGhhcHBlbiB3aGVuIFtzcmNdIGlzIHNldCB0byBhIHZhcmlhYmxlIHRoYXQgdHVybmVkIG91dCB0byBiZSB1bmRlZmluZWRcbiAgICAgIC8vIG9uZSBleGFtcGxlIGNvdWxkIGJlIGEgbGlzdCBvZiB1c2VycyB3aXRoIHRoZWlyIHByb2ZpbGUgcGljdHVyZXNcbiAgICAgIC8vIGluIHRoaXMgY2FzZSwgaXQgd291bGQgYmUgdXNlZnVsIHRvIHVzZSB0aGUgZmFsbGJhY2sgaW1hZ2UgaW5zdGVhZFxuICAgICAgLy8gaWYgZmFsbGJhY2tVcmwgd2FzIHVzZWQgYXMgcGxhY2Vob2xkZXIgd2UgZG8gbm90IG5lZWQgdG8gc2V0IGl0IGFnYWluXG4gICAgICBpZiAoIXRoaXMuZmFsbGJhY2tBc1BsYWNlaG9sZGVyICYmIHRoaXMuZmFsbGJhY2tVcmwpIHtcbiAgICAgICAgLy8gd2UncmUgbm90IGdvaW5nIHRvIGNhY2hlIHRoZSBmYWxsYmFjayBpbWFnZSBzaW5jZSBpdCBzaG91bGQgYmUgbG9jYWxseSBzYXZlZFxuICAgICAgICB0aGlzLnNldEltYWdlKHRoaXMuZmFsbGJhY2tVcmwpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy5pc0xvYWRpbmcgPSBmYWxzZTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBwcml2YXRlIHVwZGF0ZUltYWdlKGltYWdlVXJsOiBzdHJpbmcpIHtcbiAgICB0aGlzLmltYWdlTG9hZGVyXG4gICAgICAuZ2V0SW1hZ2VQYXRoKGltYWdlVXJsKVxuICAgICAgLnRoZW4oKHVybDogc3RyaW5nKSA9PiB0aGlzLnNldEltYWdlKHVybCkpXG4gICAgICAuY2F0Y2goKGVycm9yOiBhbnkpID0+IHRoaXMuc2V0SW1hZ2UodGhpcy5mYWxsYmFja1VybCB8fCBpbWFnZVVybCkpO1xuICB9XG5cbiAgLyoqXG4gICAqIEdldHMgdGhlIGltYWdlIFVSTCB0byBiZSBsb2FkZWQgYW5kIGRpc2FibGVzIGNhY2hpbmcgaWYgbmVjZXNzYXJ5XG4gICAqL1xuICBwcml2YXRlIHByb2Nlc3NJbWFnZVVybChpbWFnZVVybDogc3RyaW5nKTogc3RyaW5nIHtcbiAgICBpZiAodGhpcy5jYWNoZSA9PT0gZmFsc2UpIHtcbiAgICAgIC8vIG5lZWQgdG8gZGlzYWJsZSBjYWNoaW5nXG5cbiAgICAgIGlmIChpbWFnZVVybC5pbmRleE9mKCc/JykgPCAwKSB7XG4gICAgICAgIC8vIGFkZCA/IGlmIGRvZXNuJ3QgZXhpc3RzXG4gICAgICAgIGltYWdlVXJsICs9ICc/JztcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGltYWdlVXJsICs9ICcmJztcbiAgICAgIH1cbiAgICAgIC8vIGFwcGVuZCB0aW1lc3RhbXAgYXQgdGhlIGVuZCB0byBtYWtlIFVSTCB1bmlxdWVcbiAgICAgIGltYWdlVXJsICs9ICdjYWNoZV9idXN0ZXI9JyArIERhdGUubm93KCk7XG4gICAgfVxuXG4gICAgcmV0dXJuIGltYWdlVXJsO1xuICB9XG5cbiAgLyoqXG4gICAqIFNldCB0aGUgaW1hZ2UgdG8gYmUgZGlzcGxheWVkXG4gICAqIEBwYXJhbSBpbWFnZVVybCBpbWFnZSBzcmNcbiAgICogQHBhcmFtIHN0b3BMb2FkaW5nIHNldCB0byB0cnVlIHRvIG1hcmsgdGhlIGltYWdlIGFzIGxvYWRlZFxuICAgKi9cbiAgcHJpdmF0ZSBzZXRJbWFnZShpbWFnZVVybDogc3RyaW5nLCBzdG9wTG9hZGluZzogYm9vbGVhbiA9IHRydWUpOiB2b2lkIHtcbiAgICB0aGlzLmlzTG9hZGluZyA9ICFzdG9wTG9hZGluZztcblxuICAgIGlmICh0aGlzLl91c2VJbWcpIHtcbiAgICAgIC8vIFVzaW5nIDxpbWc+IHRhZ1xuICAgICAgaWYgKCF0aGlzLmVsZW1lbnQpIHtcbiAgICAgICAgLy8gY3JlYXRlIGltZyBlbGVtZW50IGlmIHdlIGRvbnQgaGF2ZSBvbmVcbiAgICAgICAgdGhpcy5lbGVtZW50ID0gdGhpcy5yZW5kZXJlci5jcmVhdGVFbGVtZW50KCdpbWcnKTtcbiAgICAgICAgdGhpcy5yZW5kZXJlci5hcHBlbmRDaGlsZCh0aGlzLl9lbGVtZW50Lm5hdGl2ZUVsZW1lbnQsIHRoaXMuZWxlbWVudCk7XG4gICAgICB9XG5cbiAgICAgIC8vIHNldCBpdCdzIHNyY1xuICAgICAgdGhpcy5yZW5kZXJlci5zZXRBdHRyaWJ1dGUodGhpcy5lbGVtZW50LCAnc3JjJywgaW1hZ2VVcmwpO1xuXG4gICAgICAvLyBpZiBpbWdBdHRyaWJ1dGVzIGFyZSBkZWZpbmVkLCBhZGQgdGhlbSB0byBvdXIgaW1nIGVsZW1lbnRcbiAgICAgIHRoaXMuaW1nQXR0cmlidXRlcy5mb3JFYWNoKChhdHRyaWJ1dGUpID0+IHtcbiAgICAgICAgdGhpcy5yZW5kZXJlci5zZXRBdHRyaWJ1dGUodGhpcy5lbGVtZW50LCBhdHRyaWJ1dGUuZWxlbWVudCwgYXR0cmlidXRlLnZhbHVlKTtcbiAgICAgIH0pO1xuICAgICAgaWYgKHRoaXMuZmFsbGJhY2tVcmwgJiYgIXRoaXMuaW1hZ2VMb2FkZXIubmF0aXZlQXZhaWxhYmxlKSB7XG4gICAgICAgIHRoaXMucmVuZGVyZXIubGlzdGVuKHRoaXMuZWxlbWVudCwgJ2Vycm9yJywgKCkgPT5cbiAgICAgICAgICB0aGlzLnJlbmRlcmVyLnNldEF0dHJpYnV0ZSh0aGlzLmVsZW1lbnQsICdzcmMnLCB0aGlzLmZhbGxiYWNrVXJsKSxcbiAgICAgICAgKTtcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgLy8gTm90IHVzaW5nIDxpbWc+IHRhZ1xuXG4gICAgICB0aGlzLmVsZW1lbnQgPSB0aGlzLl9lbGVtZW50Lm5hdGl2ZUVsZW1lbnQ7XG5cbiAgICAgIGZvciAoY29uc3QgcHJvcCBpbiBwcm9wTWFwKSB7XG4gICAgICAgIGlmICh0aGlzW3Byb3BdKSB7XG4gICAgICAgICAgdGhpcy5yZW5kZXJlci5zZXRTdHlsZSh0aGlzLmVsZW1lbnQsIHByb3BNYXBbcHJvcF0sIHRoaXNbcHJvcF0pO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICB0aGlzLnJlbmRlcmVyLnNldFN0eWxlKFxuICAgICAgICB0aGlzLmVsZW1lbnQsXG4gICAgICAgICdiYWNrZ3JvdW5kLWltYWdlJyxcbiAgICAgICAgYHVybChcIiR7aW1hZ2VVcmwgfHwgdGhpcy5mYWxsYmFja1VybH1cIilgLFxuICAgICAgKTtcbiAgICB9XG4gICAgaWYgKHN0b3BMb2FkaW5nKSB7XG4gICAgICB0aGlzLmxvYWQuZW1pdCh0aGlzKTtcbiAgICB9XG4gIH1cbn1cbiJdfQ==