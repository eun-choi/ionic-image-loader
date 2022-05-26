/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Injectable } from '@angular/core';
import * as i0 from "@angular/core";
var ImageLoaderConfigService = /** @class */ (function () {
    function ImageLoaderConfigService() {
        this.debugMode = false;
        this.spinnerEnabled = true;
        this.fallbackAsPlaceholder = false;
        this.backgroundSize = 'contain';
        this.backgroundRepeat = 'no-repeat';
        this.display = 'block';
        this.width = '100%';
        this.height = '100%';
        this.useImg = false;
        this.concurrency = 5;
        this.maxCacheSize = -1;
        this.maxCacheAge = -1;
        this.imageReturnType = 'uri';
        // Must be default 'true' for the new WebView to show images
        this.fileNameCachedWithExtension = true;
        this.fallbackFileNameCachedExtension = '.jpg';
        this.cacheDirectoryType = 'cache';
        this._cacheDirectoryName = 'image-loader-cache';
    }
    Object.defineProperty(ImageLoaderConfigService.prototype, "cacheDirectoryName", {
        get: /**
         * @return {?}
         */
        function () {
            return this._cacheDirectoryName;
        },
        set: /**
         * @param {?} name
         * @return {?}
         */
        function (name) {
            name.replace(/\W/g, '');
            this._cacheDirectoryName = name;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Enables debug mode to receive console logs, errors, warnings
     */
    /**
     * Enables debug mode to receive console logs, errors, warnings
     * @return {?}
     */
    ImageLoaderConfigService.prototype.enableDebugMode = /**
     * Enables debug mode to receive console logs, errors, warnings
     * @return {?}
     */
    function () {
        this.debugMode = true;
    };
    /**
     * Enable/Disable the spinner by default. Defaults to true.
     * @param enable set to true to enable
     */
    /**
     * Enable/Disable the spinner by default. Defaults to true.
     * @param {?} enable set to true to enable
     * @return {?}
     */
    ImageLoaderConfigService.prototype.enableSpinner = /**
     * Enable/Disable the spinner by default. Defaults to true.
     * @param {?} enable set to true to enable
     * @return {?}
     */
    function (enable) {
        this.spinnerEnabled = enable;
    };
    /**
     * Enable/Disable the fallback image as placeholder instead of the spinner. Defaults to false.
     * @param enable set to true to enable
     */
    /**
     * Enable/Disable the fallback image as placeholder instead of the spinner. Defaults to false.
     * @param {?} enable set to true to enable
     * @return {?}
     */
    ImageLoaderConfigService.prototype.enableFallbackAsPlaceholder = /**
     * Enable/Disable the fallback image as placeholder instead of the spinner. Defaults to false.
     * @param {?} enable set to true to enable
     * @return {?}
     */
    function (enable) {
        this.fallbackAsPlaceholder = enable;
    };
    /**
     * Sets the cache directory name. Defaults to 'image-loader-cache'
     * @param name name of directory
     */
    /**
     * Sets the cache directory name. Defaults to 'image-loader-cache'
     * @param {?} name name of directory
     * @return {?}
     */
    ImageLoaderConfigService.prototype.setCacheDirectoryName = /**
     * Sets the cache directory name. Defaults to 'image-loader-cache'
     * @param {?} name name of directory
     * @return {?}
     */
    function (name) {
        this.cacheDirectoryName = name;
    };
    /**
     * Set default height for images that are not using <img> tag
     * @param height height
     */
    /**
     * Set default height for images that are not using <img> tag
     * @param {?} height height
     * @return {?}
     */
    ImageLoaderConfigService.prototype.setHeight = /**
     * Set default height for images that are not using <img> tag
     * @param {?} height height
     * @return {?}
     */
    function (height) {
        this.height = height;
    };
    /**
     * Set default width for images that are not using <img> tag
     * @param width Width
     */
    /**
     * Set default width for images that are not using <img> tag
     * @param {?} width Width
     * @return {?}
     */
    ImageLoaderConfigService.prototype.setWidth = /**
     * Set default width for images that are not using <img> tag
     * @param {?} width Width
     * @return {?}
     */
    function (width) {
        this.width = width;
    };
    /**
     * Enable display mode for images that are not using <img> tag
     * @param display Display mode
     */
    /**
     * Enable display mode for images that are not using <img> tag
     * @param {?} display Display mode
     * @return {?}
     */
    ImageLoaderConfigService.prototype.setDisplay = /**
     * Enable display mode for images that are not using <img> tag
     * @param {?} display Display mode
     * @return {?}
     */
    function (display) {
        this.display = display;
    };
    /**
     * Use <img> tag by default
     * @param use set to true to use <img> tag by default
     */
    /**
     * Use <img> tag by default
     * @param {?} use set to true to use <img> tag by default
     * @return {?}
     */
    ImageLoaderConfigService.prototype.useImageTag = /**
     * Use <img> tag by default
     * @param {?} use set to true to use <img> tag by default
     * @return {?}
     */
    function (use) {
        this.useImg = use;
    };
    /**
     * Set default background size for images that are not using <img> tag
     * @param backgroundSize Background size
     */
    /**
     * Set default background size for images that are not using <img> tag
     * @param {?} backgroundSize Background size
     * @return {?}
     */
    ImageLoaderConfigService.prototype.setBackgroundSize = /**
     * Set default background size for images that are not using <img> tag
     * @param {?} backgroundSize Background size
     * @return {?}
     */
    function (backgroundSize) {
        this.backgroundSize = backgroundSize;
    };
    /**
     * Set background repeat for images that are not using <img> tag
     * @param backgroundRepeat Background repeat
     */
    /**
     * Set background repeat for images that are not using <img> tag
     * @param {?} backgroundRepeat Background repeat
     * @return {?}
     */
    ImageLoaderConfigService.prototype.setBackgroundRepeat = /**
     * Set background repeat for images that are not using <img> tag
     * @param {?} backgroundRepeat Background repeat
     * @return {?}
     */
    function (backgroundRepeat) {
        this.backgroundRepeat = backgroundRepeat;
    };
    /**
     * Set fallback URL to use when image src is undefined or did not resolve.
     * This image will not be cached. This should ideally be a locally saved image.
     * @param fallbackUrl The remote or local URL of the image
     */
    /**
     * Set fallback URL to use when image src is undefined or did not resolve.
     * This image will not be cached. This should ideally be a locally saved image.
     * @param {?} fallbackUrl The remote or local URL of the image
     * @return {?}
     */
    ImageLoaderConfigService.prototype.setFallbackUrl = /**
     * Set fallback URL to use when image src is undefined or did not resolve.
     * This image will not be cached. This should ideally be a locally saved image.
     * @param {?} fallbackUrl The remote or local URL of the image
     * @return {?}
     */
    function (fallbackUrl) {
        this.fallbackUrl = fallbackUrl;
    };
    /**
     * Set the maximum number of allowed connections at the same time.
     * @param concurrency
     */
    /**
     * Set the maximum number of allowed connections at the same time.
     * @param {?} concurrency
     * @return {?}
     */
    ImageLoaderConfigService.prototype.setConcurrency = /**
     * Set the maximum number of allowed connections at the same time.
     * @param {?} concurrency
     * @return {?}
     */
    function (concurrency) {
        this.concurrency = concurrency;
    };
    /**
     * Sets the maximum allowed cache size
     * @param cacheSize Cache size in bytes
     */
    /**
     * Sets the maximum allowed cache size
     * @param {?} cacheSize Cache size in bytes
     * @return {?}
     */
    ImageLoaderConfigService.prototype.setMaximumCacheSize = /**
     * Sets the maximum allowed cache size
     * @param {?} cacheSize Cache size in bytes
     * @return {?}
     */
    function (cacheSize) {
        this.maxCacheSize = cacheSize;
    };
    /**
     * Sets the maximum allowed cache age
     * @param cacheAge Maximum cache age in milliseconds
     */
    /**
     * Sets the maximum allowed cache age
     * @param {?} cacheAge Maximum cache age in milliseconds
     * @return {?}
     */
    ImageLoaderConfigService.prototype.setMaximumCacheAge = /**
     * Sets the maximum allowed cache age
     * @param {?} cacheAge Maximum cache age in milliseconds
     * @return {?}
     */
    function (cacheAge) {
        this.maxCacheAge = cacheAge;
    };
    /**
     * Set the return type of cached images
     * @param imageReturnType The return type; either 'base64' or 'uri'
     */
    /**
     * Set the return type of cached images
     * @param {?} imageReturnType The return type; either 'base64' or 'uri'
     * @return {?}
     */
    ImageLoaderConfigService.prototype.setImageReturnType = /**
     * Set the return type of cached images
     * @param {?} imageReturnType The return type; either 'base64' or 'uri'
     * @return {?}
     */
    function (imageReturnType) {
        this.imageReturnType = imageReturnType;
    };
    /**
     * Set the default spinner name
     * @param name
     */
    /**
     * Set the default spinner name
     * @param {?} name
     * @return {?}
     */
    ImageLoaderConfigService.prototype.setSpinnerName = /**
     * Set the default spinner name
     * @param {?} name
     * @return {?}
     */
    function (name) {
        this.spinnerName = name;
    };
    /**
     * Set the default spinner color
     * @param color
     */
    /**
     * Set the default spinner color
     * @param {?} color
     * @return {?}
     */
    ImageLoaderConfigService.prototype.setSpinnerColor = /**
     * Set the default spinner color
     * @param {?} color
     * @return {?}
     */
    function (color) {
        this.spinnerColor = color;
    };
    /**
     * Set headers options for the HttpClient transfers.
     * @param headers
     */
    /**
     * Set headers options for the HttpClient transfers.
     * @param {?} headers
     * @return {?}
     */
    ImageLoaderConfigService.prototype.setHttpHeaders = /**
     * Set headers options for the HttpClient transfers.
     * @param {?} headers
     * @return {?}
     */
    function (headers) {
        this.httpHeaders = headers;
    };
    /**
     * Set options for the FileTransfer plugin
     * @param options
     * @deprecated FileTransfer plugin removed.
     */
    /**
     * Set options for the FileTransfer plugin
     * @deprecated FileTransfer plugin removed.
     * @param {?} options
     * @return {?}
     */
    ImageLoaderConfigService.prototype.setFileTransferOptions = /**
     * Set options for the FileTransfer plugin
     * @deprecated FileTransfer plugin removed.
     * @param {?} options
     * @return {?}
     */
    function (options) {
        // do nothing, plugin deprecated.
    };
    /**
     * Enable/Disable the save filename of cached images with extension.  Defaults to false.
     * @param enable set to true to enable
     */
    /**
     * Enable/Disable the save filename of cached images with extension.  Defaults to false.
     * @param {?} enable set to true to enable
     * @return {?}
     */
    ImageLoaderConfigService.prototype.setFileNameCachedWithExtension = /**
     * Enable/Disable the save filename of cached images with extension.  Defaults to false.
     * @param {?} enable set to true to enable
     * @return {?}
     */
    function (enable) {
        this.fileNameCachedWithExtension = enable;
    };
    /**
     * Set fallback extension filename of cached images.  Defaults to '.jpg'.
     * @param extension fallback extension (e.x .jpg)
     */
    /**
     * Set fallback extension filename of cached images.  Defaults to '.jpg'.
     * @param {?} extension fallback extension (e.x .jpg)
     * @return {?}
     */
    ImageLoaderConfigService.prototype.setFallbackFileNameCachedExtension = /**
     * Set fallback extension filename of cached images.  Defaults to '.jpg'.
     * @param {?} extension fallback extension (e.x .jpg)
     * @return {?}
     */
    function (extension) {
        this.fallbackFileNameCachedExtension = extension;
    };
    ImageLoaderConfigService.decorators = [
        { type: Injectable, args: [{
                    providedIn: 'root',
                },] }
    ];
    /** @nocollapse */ ImageLoaderConfigService.ngInjectableDef = i0.defineInjectable({ factory: function ImageLoaderConfigService_Factory() { return new ImageLoaderConfigService(); }, token: ImageLoaderConfigService, providedIn: "root" });
    return ImageLoaderConfigService;
}());
export { ImageLoaderConfigService };
if (false) {
    /** @type {?} */
    ImageLoaderConfigService.prototype.debugMode;
    /** @type {?} */
    ImageLoaderConfigService.prototype.spinnerEnabled;
    /** @type {?} */
    ImageLoaderConfigService.prototype.fallbackAsPlaceholder;
    /** @type {?} */
    ImageLoaderConfigService.prototype.backgroundSize;
    /** @type {?} */
    ImageLoaderConfigService.prototype.backgroundRepeat;
    /** @type {?} */
    ImageLoaderConfigService.prototype.display;
    /** @type {?} */
    ImageLoaderConfigService.prototype.width;
    /** @type {?} */
    ImageLoaderConfigService.prototype.height;
    /** @type {?} */
    ImageLoaderConfigService.prototype.useImg;
    /** @type {?} */
    ImageLoaderConfigService.prototype.fallbackUrl;
    /** @type {?} */
    ImageLoaderConfigService.prototype.concurrency;
    /** @type {?} */
    ImageLoaderConfigService.prototype.maxCacheSize;
    /** @type {?} */
    ImageLoaderConfigService.prototype.maxCacheAge;
    /** @type {?} */
    ImageLoaderConfigService.prototype.imageReturnType;
    /** @type {?} */
    ImageLoaderConfigService.prototype.spinnerName;
    /** @type {?} */
    ImageLoaderConfigService.prototype.spinnerColor;
    /** @type {?} */
    ImageLoaderConfigService.prototype.httpHeaders;
    /** @type {?} */
    ImageLoaderConfigService.prototype.fileNameCachedWithExtension;
    /** @type {?} */
    ImageLoaderConfigService.prototype.fallbackFileNameCachedExtension;
    /** @type {?} */
    ImageLoaderConfigService.prototype.cacheDirectoryType;
    /**
     * @type {?}
     * @private
     */
    ImageLoaderConfigService.prototype._cacheDirectoryName;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW1hZ2UtbG9hZGVyLWNvbmZpZy5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vaW9uaWMtaW1hZ2UtbG9hZGVyLyIsInNvdXJjZXMiOlsibGliL3NlcnZpY2VzL2ltYWdlLWxvYWRlci1jb25maWcuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQ0EsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQzs7QUFFM0M7SUFBQTtRQUlFLGNBQVMsR0FBRyxLQUFLLENBQUM7UUFFbEIsbUJBQWMsR0FBRyxJQUFJLENBQUM7UUFFdEIsMEJBQXFCLEdBQUcsS0FBSyxDQUFDO1FBRTlCLG1CQUFjLEdBQUcsU0FBUyxDQUFDO1FBRTNCLHFCQUFnQixHQUFHLFdBQVcsQ0FBQztRQUUvQixZQUFPLEdBQUcsT0FBTyxDQUFDO1FBRWxCLFVBQUssR0FBRyxNQUFNLENBQUM7UUFFZixXQUFNLEdBQUcsTUFBTSxDQUFDO1FBRWhCLFdBQU0sR0FBRyxLQUFLLENBQUM7UUFJZixnQkFBVyxHQUFHLENBQUMsQ0FBQztRQUVoQixpQkFBWSxHQUFHLENBQUMsQ0FBQyxDQUFDO1FBRWxCLGdCQUFXLEdBQUcsQ0FBQyxDQUFDLENBQUM7UUFFakIsb0JBQWUsR0FBcUIsS0FBSyxDQUFDOztRQVMxQyxnQ0FBMkIsR0FBRyxJQUFJLENBQUM7UUFFbkMsb0NBQStCLEdBQUcsTUFBTSxDQUFDO1FBRXpDLHVCQUFrQixHQUFrQyxPQUFPLENBQUM7UUFFcEQsd0JBQW1CLEdBQUcsb0JBQW9CLENBQUM7S0F1THBEO0lBcExDLHNCQUFJLHdEQUFrQjs7OztRQUF0QjtZQUNFLE9BQU8sSUFBSSxDQUFDLG1CQUFtQixDQUFDO1FBQ2xDLENBQUM7Ozs7O1FBRUQsVUFBdUIsSUFBSTtZQUN6QixJQUFJLENBQUMsT0FBTyxDQUFDLEtBQUssRUFBRSxFQUFFLENBQUMsQ0FBQztZQUN4QixJQUFJLENBQUMsbUJBQW1CLEdBQUcsSUFBSSxDQUFDO1FBQ2xDLENBQUM7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QUFDO0lBRUQ7OztPQUdHOzs7Ozs7SUFDSCxpRUFBOEI7Ozs7O0lBQTlCLFVBQStCLE1BQWU7UUFDNUMsSUFBSSxDQUFDLDJCQUEyQixHQUFHLE1BQU0sQ0FBQztJQUM1QyxDQUFDO0lBRUQ7OztPQUdHOzs7Ozs7SUFDSCxxRUFBa0M7Ozs7O0lBQWxDLFVBQW1DLFNBQWlCO1FBQ2xELElBQUksQ0FBQywrQkFBK0IsR0FBRyxTQUFTLENBQUM7SUFDbkQsQ0FBQzs7Z0JBbk9GLFVBQVUsU0FBQztvQkFDVixVQUFVLEVBQUUsTUFBTTtpQkFDbkI7OzttQ0FMRDtDQXVPQyxBQXBPRCxJQW9PQztTQWpPWSx3QkFBd0I7OztJQUNuQyw2Q0FBa0I7O0lBRWxCLGtEQUFzQjs7SUFFdEIseURBQThCOztJQUU5QixrREFBMkI7O0lBRTNCLG9EQUErQjs7SUFFL0IsMkNBQWtCOztJQUVsQix5Q0FBZTs7SUFFZiwwQ0FBZ0I7O0lBRWhCLDBDQUFlOztJQUVmLCtDQUFZOztJQUVaLCtDQUFnQjs7SUFFaEIsZ0RBQWtCOztJQUVsQiwrQ0FBaUI7O0lBRWpCLG1EQUEwQzs7SUFFMUMsK0NBQVk7O0lBRVosZ0RBQWE7O0lBRWIsK0NBQXlCOztJQUd6QiwrREFBbUM7O0lBRW5DLG1FQUF5Qzs7SUFFekMsc0RBQTREOzs7OztJQUU1RCx1REFBbUQiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBIdHRwSGVhZGVycyB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbi9odHRwJztcbmltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuQEluamVjdGFibGUoe1xuICBwcm92aWRlZEluOiAncm9vdCcsXG59KVxuZXhwb3J0IGNsYXNzIEltYWdlTG9hZGVyQ29uZmlnU2VydmljZSB7XG4gIGRlYnVnTW9kZSA9IGZhbHNlO1xuXG4gIHNwaW5uZXJFbmFibGVkID0gdHJ1ZTtcblxuICBmYWxsYmFja0FzUGxhY2Vob2xkZXIgPSBmYWxzZTtcblxuICBiYWNrZ3JvdW5kU2l6ZSA9ICdjb250YWluJztcblxuICBiYWNrZ3JvdW5kUmVwZWF0ID0gJ25vLXJlcGVhdCc7XG5cbiAgZGlzcGxheSA9ICdibG9jayc7XG5cbiAgd2lkdGggPSAnMTAwJSc7XG5cbiAgaGVpZ2h0ID0gJzEwMCUnO1xuXG4gIHVzZUltZyA9IGZhbHNlO1xuXG4gIGZhbGxiYWNrVXJsO1xuXG4gIGNvbmN1cnJlbmN5ID0gNTtcblxuICBtYXhDYWNoZVNpemUgPSAtMTtcblxuICBtYXhDYWNoZUFnZSA9IC0xO1xuXG4gIGltYWdlUmV0dXJuVHlwZTogJ2Jhc2U2NCcgfCAndXJpJyA9ICd1cmknO1xuXG4gIHNwaW5uZXJOYW1lO1xuXG4gIHNwaW5uZXJDb2xvcjtcblxuICBodHRwSGVhZGVyczogSHR0cEhlYWRlcnM7XG5cbiAgLy8gTXVzdCBiZSBkZWZhdWx0ICd0cnVlJyBmb3IgdGhlIG5ldyBXZWJWaWV3IHRvIHNob3cgaW1hZ2VzXG4gIGZpbGVOYW1lQ2FjaGVkV2l0aEV4dGVuc2lvbiA9IHRydWU7XG5cbiAgZmFsbGJhY2tGaWxlTmFtZUNhY2hlZEV4dGVuc2lvbiA9ICcuanBnJztcblxuICBjYWNoZURpcmVjdG9yeVR5cGU6ICdjYWNoZScgfCAnZGF0YScgfCAnZXh0ZXJuYWwnID0gJ2NhY2hlJztcblxuICBwcml2YXRlIF9jYWNoZURpcmVjdG9yeU5hbWUgPSAnaW1hZ2UtbG9hZGVyLWNhY2hlJztcblxuXG4gIGdldCBjYWNoZURpcmVjdG9yeU5hbWUoKSB7XG4gICAgcmV0dXJuIHRoaXMuX2NhY2hlRGlyZWN0b3J5TmFtZTtcbiAgfVxuXG4gIHNldCBjYWNoZURpcmVjdG9yeU5hbWUobmFtZSkge1xuICAgIG5hbWUucmVwbGFjZSgvXFxXL2csICcnKTtcbiAgICB0aGlzLl9jYWNoZURpcmVjdG9yeU5hbWUgPSBuYW1lO1xuICB9XG5cbiAgLyoqXG4gICAqIEVuYWJsZXMgZGVidWcgbW9kZSB0byByZWNlaXZlIGNvbnNvbGUgbG9ncywgZXJyb3JzLCB3YXJuaW5nc1xuICAgKi9cbiAgZW5hYmxlRGVidWdNb2RlKCkge1xuICAgIHRoaXMuZGVidWdNb2RlID0gdHJ1ZTtcbiAgfVxuXG4gIC8qKlxuICAgKiBFbmFibGUvRGlzYWJsZSB0aGUgc3Bpbm5lciBieSBkZWZhdWx0LiBEZWZhdWx0cyB0byB0cnVlLlxuICAgKiBAcGFyYW0gZW5hYmxlIHNldCB0byB0cnVlIHRvIGVuYWJsZVxuICAgKi9cbiAgZW5hYmxlU3Bpbm5lcihlbmFibGU6IGJvb2xlYW4pIHtcbiAgICB0aGlzLnNwaW5uZXJFbmFibGVkID0gZW5hYmxlO1xuICB9XG5cbiAgLyoqXG4gICAqIEVuYWJsZS9EaXNhYmxlIHRoZSBmYWxsYmFjayBpbWFnZSBhcyBwbGFjZWhvbGRlciBpbnN0ZWFkIG9mIHRoZSBzcGlubmVyLiBEZWZhdWx0cyB0byBmYWxzZS5cbiAgICogQHBhcmFtIGVuYWJsZSBzZXQgdG8gdHJ1ZSB0byBlbmFibGVcbiAgICovXG4gIGVuYWJsZUZhbGxiYWNrQXNQbGFjZWhvbGRlcihlbmFibGU6IGJvb2xlYW4pIHtcbiAgICB0aGlzLmZhbGxiYWNrQXNQbGFjZWhvbGRlciA9IGVuYWJsZTtcbiAgfVxuXG4gIC8qKlxuICAgKiBTZXRzIHRoZSBjYWNoZSBkaXJlY3RvcnkgbmFtZS4gRGVmYXVsdHMgdG8gJ2ltYWdlLWxvYWRlci1jYWNoZSdcbiAgICogQHBhcmFtIG5hbWUgbmFtZSBvZiBkaXJlY3RvcnlcbiAgICovXG4gIHNldENhY2hlRGlyZWN0b3J5TmFtZShuYW1lOiBzdHJpbmcpIHtcbiAgICB0aGlzLmNhY2hlRGlyZWN0b3J5TmFtZSA9IG5hbWU7XG4gIH1cblxuICAvKipcbiAgICogU2V0IGRlZmF1bHQgaGVpZ2h0IGZvciBpbWFnZXMgdGhhdCBhcmUgbm90IHVzaW5nIDxpbWc+IHRhZ1xuICAgKiBAcGFyYW0gaGVpZ2h0IGhlaWdodFxuICAgKi9cbiAgc2V0SGVpZ2h0KGhlaWdodDogc3RyaW5nKSB7XG4gICAgdGhpcy5oZWlnaHQgPSBoZWlnaHQ7XG4gIH1cblxuICAvKipcbiAgICogU2V0IGRlZmF1bHQgd2lkdGggZm9yIGltYWdlcyB0aGF0IGFyZSBub3QgdXNpbmcgPGltZz4gdGFnXG4gICAqIEBwYXJhbSB3aWR0aCBXaWR0aFxuICAgKi9cbiAgc2V0V2lkdGgod2lkdGg6IHN0cmluZykge1xuICAgIHRoaXMud2lkdGggPSB3aWR0aDtcbiAgfVxuXG4gIC8qKlxuICAgKiBFbmFibGUgZGlzcGxheSBtb2RlIGZvciBpbWFnZXMgdGhhdCBhcmUgbm90IHVzaW5nIDxpbWc+IHRhZ1xuICAgKiBAcGFyYW0gZGlzcGxheSBEaXNwbGF5IG1vZGVcbiAgICovXG4gIHNldERpc3BsYXkoZGlzcGxheTogc3RyaW5nKSB7XG4gICAgdGhpcy5kaXNwbGF5ID0gZGlzcGxheTtcbiAgfVxuXG4gIC8qKlxuICAgKiBVc2UgPGltZz4gdGFnIGJ5IGRlZmF1bHRcbiAgICogQHBhcmFtIHVzZSBzZXQgdG8gdHJ1ZSB0byB1c2UgPGltZz4gdGFnIGJ5IGRlZmF1bHRcbiAgICovXG4gIHVzZUltYWdlVGFnKHVzZTogYm9vbGVhbikge1xuICAgIHRoaXMudXNlSW1nID0gdXNlO1xuICB9XG5cbiAgLyoqXG4gICAqIFNldCBkZWZhdWx0IGJhY2tncm91bmQgc2l6ZSBmb3IgaW1hZ2VzIHRoYXQgYXJlIG5vdCB1c2luZyA8aW1nPiB0YWdcbiAgICogQHBhcmFtIGJhY2tncm91bmRTaXplIEJhY2tncm91bmQgc2l6ZVxuICAgKi9cbiAgc2V0QmFja2dyb3VuZFNpemUoYmFja2dyb3VuZFNpemU6IHN0cmluZykge1xuICAgIHRoaXMuYmFja2dyb3VuZFNpemUgPSBiYWNrZ3JvdW5kU2l6ZTtcbiAgfVxuXG4gIC8qKlxuICAgKiBTZXQgYmFja2dyb3VuZCByZXBlYXQgZm9yIGltYWdlcyB0aGF0IGFyZSBub3QgdXNpbmcgPGltZz4gdGFnXG4gICAqIEBwYXJhbSBiYWNrZ3JvdW5kUmVwZWF0IEJhY2tncm91bmQgcmVwZWF0XG4gICAqL1xuICBzZXRCYWNrZ3JvdW5kUmVwZWF0KGJhY2tncm91bmRSZXBlYXQ6IHN0cmluZykge1xuICAgIHRoaXMuYmFja2dyb3VuZFJlcGVhdCA9IGJhY2tncm91bmRSZXBlYXQ7XG4gIH1cblxuICAvKipcbiAgICogU2V0IGZhbGxiYWNrIFVSTCB0byB1c2Ugd2hlbiBpbWFnZSBzcmMgaXMgdW5kZWZpbmVkIG9yIGRpZCBub3QgcmVzb2x2ZS5cbiAgICogVGhpcyBpbWFnZSB3aWxsIG5vdCBiZSBjYWNoZWQuIFRoaXMgc2hvdWxkIGlkZWFsbHkgYmUgYSBsb2NhbGx5IHNhdmVkIGltYWdlLlxuICAgKiBAcGFyYW0gZmFsbGJhY2tVcmwgVGhlIHJlbW90ZSBvciBsb2NhbCBVUkwgb2YgdGhlIGltYWdlXG4gICAqL1xuICBzZXRGYWxsYmFja1VybChmYWxsYmFja1VybDogc3RyaW5nKSB7XG4gICAgdGhpcy5mYWxsYmFja1VybCA9IGZhbGxiYWNrVXJsO1xuICB9XG5cbiAgLyoqXG4gICAqIFNldCB0aGUgbWF4aW11bSBudW1iZXIgb2YgYWxsb3dlZCBjb25uZWN0aW9ucyBhdCB0aGUgc2FtZSB0aW1lLlxuICAgKiBAcGFyYW0gY29uY3VycmVuY3lcbiAgICovXG4gIHNldENvbmN1cnJlbmN5KGNvbmN1cnJlbmN5OiBudW1iZXIpIHtcbiAgICB0aGlzLmNvbmN1cnJlbmN5ID0gY29uY3VycmVuY3k7XG4gIH1cblxuICAvKipcbiAgICogU2V0cyB0aGUgbWF4aW11bSBhbGxvd2VkIGNhY2hlIHNpemVcbiAgICogQHBhcmFtIGNhY2hlU2l6ZSBDYWNoZSBzaXplIGluIGJ5dGVzXG4gICAqL1xuICBzZXRNYXhpbXVtQ2FjaGVTaXplKGNhY2hlU2l6ZTogbnVtYmVyKSB7XG4gICAgdGhpcy5tYXhDYWNoZVNpemUgPSBjYWNoZVNpemU7XG4gIH1cblxuICAvKipcbiAgICogU2V0cyB0aGUgbWF4aW11bSBhbGxvd2VkIGNhY2hlIGFnZVxuICAgKiBAcGFyYW0gY2FjaGVBZ2UgTWF4aW11bSBjYWNoZSBhZ2UgaW4gbWlsbGlzZWNvbmRzXG4gICAqL1xuICBzZXRNYXhpbXVtQ2FjaGVBZ2UoY2FjaGVBZ2U6IG51bWJlcikge1xuICAgIHRoaXMubWF4Q2FjaGVBZ2UgPSBjYWNoZUFnZTtcbiAgfVxuXG4gIC8qKlxuICAgKiBTZXQgdGhlIHJldHVybiB0eXBlIG9mIGNhY2hlZCBpbWFnZXNcbiAgICogQHBhcmFtIGltYWdlUmV0dXJuVHlwZSBUaGUgcmV0dXJuIHR5cGU7IGVpdGhlciAnYmFzZTY0JyBvciAndXJpJ1xuICAgKi9cbiAgc2V0SW1hZ2VSZXR1cm5UeXBlKGltYWdlUmV0dXJuVHlwZTogJ2Jhc2U2NCcgfCAndXJpJykge1xuICAgIHRoaXMuaW1hZ2VSZXR1cm5UeXBlID0gaW1hZ2VSZXR1cm5UeXBlO1xuICB9XG5cbiAgLyoqXG4gICAqIFNldCB0aGUgZGVmYXVsdCBzcGlubmVyIG5hbWVcbiAgICogQHBhcmFtIG5hbWVcbiAgICovXG4gIHNldFNwaW5uZXJOYW1lKG5hbWU6IHN0cmluZykge1xuICAgIHRoaXMuc3Bpbm5lck5hbWUgPSBuYW1lO1xuICB9XG5cbiAgLyoqXG4gICAqIFNldCB0aGUgZGVmYXVsdCBzcGlubmVyIGNvbG9yXG4gICAqIEBwYXJhbSBjb2xvclxuICAgKi9cbiAgc2V0U3Bpbm5lckNvbG9yKGNvbG9yOiBzdHJpbmcpIHtcbiAgICB0aGlzLnNwaW5uZXJDb2xvciA9IGNvbG9yO1xuICB9XG5cbiAgLyoqXG4gICAqIFNldCBoZWFkZXJzIG9wdGlvbnMgZm9yIHRoZSBIdHRwQ2xpZW50IHRyYW5zZmVycy5cbiAgICogQHBhcmFtIGhlYWRlcnNcbiAgICovXG4gIHNldEh0dHBIZWFkZXJzKGhlYWRlcnM6IEh0dHBIZWFkZXJzKSB7XG4gICAgdGhpcy5odHRwSGVhZGVycyA9IGhlYWRlcnM7XG4gIH1cblxuICAvKipcbiAgICogU2V0IG9wdGlvbnMgZm9yIHRoZSBGaWxlVHJhbnNmZXIgcGx1Z2luXG4gICAqIEBwYXJhbSBvcHRpb25zXG4gICAqIEBkZXByZWNhdGVkIEZpbGVUcmFuc2ZlciBwbHVnaW4gcmVtb3ZlZC5cbiAgICovXG4gIHNldEZpbGVUcmFuc2Zlck9wdGlvbnMob3B0aW9uczoge1xuICAgIHRydXN0QWxsSG9zdHM6IGJvb2xlYW47XG4gICAgW2tleTogc3RyaW5nXTogYW55O1xuICB9KSB7XG4gICAgLy8gZG8gbm90aGluZywgcGx1Z2luIGRlcHJlY2F0ZWQuXG4gIH1cblxuICAvKipcbiAgICogRW5hYmxlL0Rpc2FibGUgdGhlIHNhdmUgZmlsZW5hbWUgb2YgY2FjaGVkIGltYWdlcyB3aXRoIGV4dGVuc2lvbi4gIERlZmF1bHRzIHRvIGZhbHNlLlxuICAgKiBAcGFyYW0gZW5hYmxlIHNldCB0byB0cnVlIHRvIGVuYWJsZVxuICAgKi9cbiAgc2V0RmlsZU5hbWVDYWNoZWRXaXRoRXh0ZW5zaW9uKGVuYWJsZTogYm9vbGVhbikge1xuICAgIHRoaXMuZmlsZU5hbWVDYWNoZWRXaXRoRXh0ZW5zaW9uID0gZW5hYmxlO1xuICB9XG5cbiAgLyoqXG4gICAqIFNldCBmYWxsYmFjayBleHRlbnNpb24gZmlsZW5hbWUgb2YgY2FjaGVkIGltYWdlcy4gIERlZmF1bHRzIHRvICcuanBnJy5cbiAgICogQHBhcmFtIGV4dGVuc2lvbiBmYWxsYmFjayBleHRlbnNpb24gKGUueCAuanBnKVxuICAgKi9cbiAgc2V0RmFsbGJhY2tGaWxlTmFtZUNhY2hlZEV4dGVuc2lvbihleHRlbnNpb246IHN0cmluZykge1xuICAgIHRoaXMuZmFsbGJhY2tGaWxlTmFtZUNhY2hlZEV4dGVuc2lvbiA9IGV4dGVuc2lvbjtcbiAgfVxufVxuIl19