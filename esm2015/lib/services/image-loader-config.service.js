/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Injectable } from '@angular/core';
import * as i0 from "@angular/core";
export class ImageLoaderConfigService {
    constructor() {
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
    /**
     * @return {?}
     */
    get cacheDirectoryName() {
        return this._cacheDirectoryName;
    }
    /**
     * @param {?} name
     * @return {?}
     */
    set cacheDirectoryName(name) {
        name.replace(/\W/g, '');
        this._cacheDirectoryName = name;
    }
    /**
     * Enables debug mode to receive console logs, errors, warnings
     * @return {?}
     */
    enableDebugMode() {
        this.debugMode = true;
    }
    /**
     * Enable/Disable the spinner by default. Defaults to true.
     * @param {?} enable set to true to enable
     * @return {?}
     */
    enableSpinner(enable) {
        this.spinnerEnabled = enable;
    }
    /**
     * Enable/Disable the fallback image as placeholder instead of the spinner. Defaults to false.
     * @param {?} enable set to true to enable
     * @return {?}
     */
    enableFallbackAsPlaceholder(enable) {
        this.fallbackAsPlaceholder = enable;
    }
    /**
     * Sets the cache directory name. Defaults to 'image-loader-cache'
     * @param {?} name name of directory
     * @return {?}
     */
    setCacheDirectoryName(name) {
        this.cacheDirectoryName = name;
    }
    /**
     * Set default height for images that are not using <img> tag
     * @param {?} height height
     * @return {?}
     */
    setHeight(height) {
        this.height = height;
    }
    /**
     * Set default width for images that are not using <img> tag
     * @param {?} width Width
     * @return {?}
     */
    setWidth(width) {
        this.width = width;
    }
    /**
     * Enable display mode for images that are not using <img> tag
     * @param {?} display Display mode
     * @return {?}
     */
    setDisplay(display) {
        this.display = display;
    }
    /**
     * Use <img> tag by default
     * @param {?} use set to true to use <img> tag by default
     * @return {?}
     */
    useImageTag(use) {
        this.useImg = use;
    }
    /**
     * Set default background size for images that are not using <img> tag
     * @param {?} backgroundSize Background size
     * @return {?}
     */
    setBackgroundSize(backgroundSize) {
        this.backgroundSize = backgroundSize;
    }
    /**
     * Set background repeat for images that are not using <img> tag
     * @param {?} backgroundRepeat Background repeat
     * @return {?}
     */
    setBackgroundRepeat(backgroundRepeat) {
        this.backgroundRepeat = backgroundRepeat;
    }
    /**
     * Set fallback URL to use when image src is undefined or did not resolve.
     * This image will not be cached. This should ideally be a locally saved image.
     * @param {?} fallbackUrl The remote or local URL of the image
     * @return {?}
     */
    setFallbackUrl(fallbackUrl) {
        this.fallbackUrl = fallbackUrl;
    }
    /**
     * Set the maximum number of allowed connections at the same time.
     * @param {?} concurrency
     * @return {?}
     */
    setConcurrency(concurrency) {
        this.concurrency = concurrency;
    }
    /**
     * Sets the maximum allowed cache size
     * @param {?} cacheSize Cache size in bytes
     * @return {?}
     */
    setMaximumCacheSize(cacheSize) {
        this.maxCacheSize = cacheSize;
    }
    /**
     * Sets the maximum allowed cache age
     * @param {?} cacheAge Maximum cache age in milliseconds
     * @return {?}
     */
    setMaximumCacheAge(cacheAge) {
        this.maxCacheAge = cacheAge;
    }
    /**
     * Set the return type of cached images
     * @param {?} imageReturnType The return type; either 'base64' or 'uri'
     * @return {?}
     */
    setImageReturnType(imageReturnType) {
        this.imageReturnType = imageReturnType;
    }
    /**
     * Set the default spinner name
     * @param {?} name
     * @return {?}
     */
    setSpinnerName(name) {
        this.spinnerName = name;
    }
    /**
     * Set the default spinner color
     * @param {?} color
     * @return {?}
     */
    setSpinnerColor(color) {
        this.spinnerColor = color;
    }
    /**
     * Set headers options for the HttpClient transfers.
     * @param {?} headers
     * @return {?}
     */
    setHttpHeaders(headers) {
        this.httpHeaders = headers;
    }
    /**
     * Set options for the FileTransfer plugin
     * @deprecated FileTransfer plugin removed.
     * @param {?} options
     * @return {?}
     */
    setFileTransferOptions(options) {
        // do nothing, plugin deprecated.
    }
    /**
     * Enable/Disable the save filename of cached images with extension.  Defaults to false.
     * @param {?} enable set to true to enable
     * @return {?}
     */
    setFileNameCachedWithExtension(enable) {
        this.fileNameCachedWithExtension = enable;
    }
    /**
     * Set fallback extension filename of cached images.  Defaults to '.jpg'.
     * @param {?} extension fallback extension (e.x .jpg)
     * @return {?}
     */
    setFallbackFileNameCachedExtension(extension) {
        this.fallbackFileNameCachedExtension = extension;
    }
}
ImageLoaderConfigService.decorators = [
    { type: Injectable, args: [{
                providedIn: 'root',
            },] }
];
/** @nocollapse */ ImageLoaderConfigService.ngInjectableDef = i0.defineInjectable({ factory: function ImageLoaderConfigService_Factory() { return new ImageLoaderConfigService(); }, token: ImageLoaderConfigService, providedIn: "root" });
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW1hZ2UtbG9hZGVyLWNvbmZpZy5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vaW9uaWMtaW1hZ2UtbG9hZGVyLyIsInNvdXJjZXMiOlsibGliL3NlcnZpY2VzL2ltYWdlLWxvYWRlci1jb25maWcuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQ0EsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQzs7QUFLM0MsTUFBTSxPQUFPLHdCQUF3QjtJQUhyQztRQUlFLGNBQVMsR0FBRyxLQUFLLENBQUM7UUFFbEIsbUJBQWMsR0FBRyxJQUFJLENBQUM7UUFFdEIsMEJBQXFCLEdBQUcsS0FBSyxDQUFDO1FBRTlCLG1CQUFjLEdBQUcsU0FBUyxDQUFDO1FBRTNCLHFCQUFnQixHQUFHLFdBQVcsQ0FBQztRQUUvQixZQUFPLEdBQUcsT0FBTyxDQUFDO1FBRWxCLFVBQUssR0FBRyxNQUFNLENBQUM7UUFFZixXQUFNLEdBQUcsTUFBTSxDQUFDO1FBRWhCLFdBQU0sR0FBRyxLQUFLLENBQUM7UUFJZixnQkFBVyxHQUFHLENBQUMsQ0FBQztRQUVoQixpQkFBWSxHQUFHLENBQUMsQ0FBQyxDQUFDO1FBRWxCLGdCQUFXLEdBQUcsQ0FBQyxDQUFDLENBQUM7UUFFakIsb0JBQWUsR0FBcUIsS0FBSyxDQUFDOztRQVMxQyxnQ0FBMkIsR0FBRyxJQUFJLENBQUM7UUFFbkMsb0NBQStCLEdBQUcsTUFBTSxDQUFDO1FBRXpDLHVCQUFrQixHQUFrQyxPQUFPLENBQUM7UUFFcEQsd0JBQW1CLEdBQUcsb0JBQW9CLENBQUM7S0F1THBEOzs7O0lBcExDLElBQUksa0JBQWtCO1FBQ3BCLE9BQU8sSUFBSSxDQUFDLG1CQUFtQixDQUFDO0lBQ2xDLENBQUM7Ozs7O0lBRUQsSUFBSSxrQkFBa0IsQ0FBQyxJQUFJO1FBQ3pCLElBQUksQ0FBQyxPQUFPLENBQUMsS0FBSyxFQUFFLEVBQUUsQ0FBQyxDQUFDO1FBQ3hCLElBQUksQ0FBQyxtQkFBbUIsR0FB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Z0RBQWE7O0lBRWIsK0NBQXlCOztJQUd6QiwrREFBbUM7O0lBRW5DLG1FQUF5Qzs7SUFFekMsc0RBQTREOzs7OztJQUU1RCx1REFBbUQiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBIdHRwSGVhZGVycyB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbi9odHRwJztcbmltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuQEluamVjdGFibGUoe1xuICBwcm92aWRlZEluOiAncm9vdCcsXG59KVxuZXhwb3J0IGNsYXNzIEltYWdlTG9hZGVyQ29uZmlnU2VydmljZSB7XG4gIGRlYnVnTW9kZSA9IGZhbHNlO1xuXG4gIHNwaW5uZXJFbmFibGVkID0gdHJ1ZTtcblxuICBmYWxsYmFja0FzUGxhY2Vob2xkZXIgPSBmYWxzZTtcblxuICBiYWNrZ3JvdW5kU2l6ZSA9ICdjb250YWluJztcblxuICBiYWNrZ3JvdW5kUmVwZWF0ID0gJ25vLXJlcGVhdCc7XG5cbiAgZGlzcGxheSA9ICdibG9jayc7XG5cbiAgd2lkdGggPSAnMTAwJSc7XG5cbiAgaGVpZ2h0ID0gJzEwMCUnO1xuXG4gIHVzZUltZyA9IGZhbHNlO1xuXG4gIGZhbGxiYWNrVXJsO1xuXG4gIGNvbmN1cnJlbmN5ID0gNTtcblxuICBtYXhDYWNoZVNpemUgPSAtMTtcblxuICBtYXhDYWNoZUFnZSA9IC0xO1xuXG4gIGltYWdlUmV0dXJuVHlwZTogJ2Jhc2U2NCcgfCAndXJpJyA9ICd1cmknO1xuXG4gIHNwaW5uZXJOYW1lO1xuXG4gIHNwaW5uZXJDb2xvcjtcblxuICBodHRwSGVhZGVyczogSHR0cEhlYWRlcnM7XG5cbiAgLy8gTXVzdCBiZSBkZWZhdWx0ICd0cnVlJyBmb3IgdGhlIG5ldyBXZWJWaWV3IHRvIHNob3cgaW1hZ2VzXG4gIGZpbGVOYW1lQ2FjaGVkV2l0aEV4dGVuc2lvbiA9IHRydWU7XG5cbiAgZmFsbGJhY2tGaWxlTmFtZUNhY2hlZEV4dGVuc2lvbiA9ICcuanBnJztcblxuICBjYWNoZURpcmVjdG9yeVR5cGU6ICdjYWNoZScgfCAnZGF0YScgfCAnZXh0ZXJuYWwnID0gJ2NhY2hlJztcblxuICBwcml2YXRlIF9jYWNoZURpcmVjdG9yeU5hbWUgPSAnaW1hZ2UtbG9hZGVyLWNhY2hlJztcblxuXG4gIGdldCBjYWNoZURpcmVjdG9yeU5hbWUoKSB7XG4gICAgcmV0dXJuIHRoaXMuX2NhY2hlRGlyZWN0b3J5TmFtZTtcbiAgfVxuXG4gIHNldCBjYWNoZURpcmVjdG9yeU5hbWUobmFtZSkge1xuICAgIG5hbWUucmVwbGFjZSgvXFxXL2csICcnKTtcbiAgICB0aGlzLl9jYWNoZURpcmVjdG9yeU5hbWUgPSBuYW1lO1xuICB9XG5cbiAgLyoqXG4gICAqIEVuYWJsZXMgZGVidWcgbW9kZSB0byByZWNlaXZlIGNvbnNvbGUgbG9ncywgZXJyb3JzLCB3YXJuaW5nc1xuICAgKi9cbiAgZW5hYmxlRGVidWdNb2RlKCkge1xuICAgIHRoaXMuZGVidWdNb2RlID0gdHJ1ZTtcbiAgfVxuXG4gIC8qKlxuICAgKiBFbmFibGUvRGlzYWJsZSB0aGUgc3Bpbm5lciBieSBkZWZhdWx0LiBEZWZhdWx0cyB0byB0cnVlLlxuICAgKiBAcGFyYW0gZW5hYmxlIHNldCB0byB0cnVlIHRvIGVuYWJsZVxuICAgKi9cbiAgZW5hYmxlU3Bpbm5lcihlbmFibGU6IGJvb2xlYW4pIHtcbiAgICB0aGlzLnNwaW5uZXJFbmFibGVkID0gZW5hYmxlO1xuICB9XG5cbiAgLyoqXG4gICAqIEVuYWJsZS9EaXNhYmxlIHRoZSBmYWxsYmFjayBpbWFnZSBhcyBwbGFjZWhvbGRlciBpbnN0ZWFkIG9mIHRoZSBzcGlubmVyLiBEZWZhdWx0cyB0byBmYWxzZS5cbiAgICogQHBhcmFtIGVuYWJsZSBzZXQgdG8gdHJ1ZSB0byBlbmFibGVcbiAgICovXG4gIGVuYWJsZUZhbGxiYWNrQXNQbGFjZWhvbGRlcihlbmFibGU6IGJvb2xlYW4pIHtcbiAgICB0aGlzLmZhbGxiYWNrQXNQbGFjZWhvbGRlciA9IGVuYWJsZTtcbiAgfVxuXG4gIC8qKlxuICAgKiBTZXRzIHRoZSBjYWNoZSBkaXJlY3RvcnkgbmFtZS4gRGVmYXVsdHMgdG8gJ2ltYWdlLWxvYWRlci1jYWNoZSdcbiAgICogQHBhcmFtIG5hbWUgbmFtZSBvZiBkaXJlY3RvcnlcbiAgICovXG4gIHNldENhY2hlRGlyZWN0b3J5TmFtZShuYW1lOiBzdHJpbmcpIHtcbiAgICB0aGlzLmNhY2hlRGlyZWN0b3J5TmFtZSA9IG5hbWU7XG4gIH1cblxuICAvKipcbiAgICogU2V0IGRlZmF1bHQgaGVpZ2h0IGZvciBpbWFnZXMgdGhhdCBhcmUgbm90IHVzaW5nIDxpbWc+IHRhZ1xuICAgKiBAcGFyYW0gaGVpZ2h0IGhlaWdodFxuICAgKi9cbiAgc2V0SGVpZ2h0KGhlaWdodDogc3RyaW5nKSB7XG4gICAgdGhpcy5oZWlnaHQgPSBoZWlnaHQ7XG4gIH1cblxuICAvKipcbiAgICogU2V0IGRlZmF1bHQgd2lkdGggZm9yIGltYWdlcyB0aGF0IGFyZSBub3QgdXNpbmcgPGltZz4gdGFnXG4gICAqIEBwYXJhbSB3aWR0aCBXaWR0aFxuICAgKi9cbiAgc2V0V2lkdGgod2lkdGg6IHN0cmluZykge1xuICAgIHRoaXMud2lkdGggPSB3aWR0aDtcbiAgfVxuXG4gIC8qKlxuICAgKiBFbmFibGUgZGlzcGxheSBtb2RlIGZvciBpbWFnZXMgdGhhdCBhcmUgbm90IHVzaW5nIDxpbWc+IHRhZ1xuICAgKiBAcGFyYW0gZGlzcGxheSBEaXNwbGF5IG1vZGVcbiAgICovXG4gIHNldERpc3BsYXkoZGlzcGxheTogc3RyaW5nKSB7XG4gICAgdGhpcy5kaXNwbGF5ID0gZGlzcGxheTtcbiAgfVxuXG4gIC8qKlxuICAgKiBVc2UgPGltZz4gdGFnIGJ5IGRlZmF1bHRcbiAgICogQHBhcmFtIHVzZSBzZXQgdG8gdHJ1ZSB0byB1c2UgPGltZz4gdGFnIGJ5IGRlZmF1bHRcbiAgICovXG4gIHVzZUltYWdlVGFnKHVzZTogYm9vbGVhbikge1xuICAgIHRoaXMudXNlSW1nID0gdXNlO1xuICB9XG5cbiAgLyoqXG4gICAqIFNldCBkZWZhdWx0IGJhY2tncm91bmQgc2l6ZSBmb3IgaW1hZ2VzIHRoYXQgYXJlIG5vdCB1c2luZyA8aW1nPiB0YWdcbiAgICogQHBhcmFtIGJhY2tncm91bmRTaXplIEJhY2tncm91bmQgc2l6ZVxuICAgKi9cbiAgc2V0QmFja2dyb3VuZFNpemUoYmFja2dyb3VuZFNpemU6IHN0cmluZykge1xuICAgIHRoaXMuYmFja2dyb3VuZFNpemUgPSBiYWNrZ3JvdW5kU2l6ZTtcbiAgfVxuXG4gIC8qKlxuICAgKiBTZXQgYmFja2dyb3VuZCByZXBlYXQgZm9yIGltYWdlcyB0aGF0IGFyZSBub3QgdXNpbmcgPGltZz4gdGFnXG4gICAqIEBwYXJhbSBiYWNrZ3JvdW5kUmVwZWF0IEJhY2tncm91bmQgcmVwZWF0XG4gICAqL1xuICBzZXRCYWNrZ3JvdW5kUmVwZWF0KGJhY2tncm91bmRSZXBlYXQ6IHN0cmluZykge1xuICAgIHRoaXMuYmFja2dyb3VuZFJlcGVhdCA9IGJhY2tncm91bmRSZXBlYXQ7XG4gIH1cblxuICAvKipcbiAgICogU2V0IGZhbGxiYWNrIFVSTCB0byB1c2Ugd2hlbiBpbWFnZSBzcmMgaXMgdW5kZWZpbmVkIG9yIGRpZCBub3QgcmVzb2x2ZS5cbiAgICogVGhpcyBpbWFnZSB3aWxsIG5vdCBiZSBjYWNoZWQuIFRoaXMgc2hvdWxkIGlkZWFsbHkgYmUgYSBsb2NhbGx5IHNhdmVkIGltYWdlLlxuICAgKiBAcGFyYW0gZmFsbGJhY2tVcmwgVGhlIHJlbW90ZSBvciBsb2NhbCBVUkwgb2YgdGhlIGltYWdlXG4gICAqL1xuICBzZXRGYWxsYmFja1VybChmYWxsYmFja1VybDogc3RyaW5nKSB7XG4gICAgdGhpcy5mYWxsYmFja1VybCA9IGZhbGxiYWNrVXJsO1xuICB9XG5cbiAgLyoqXG4gICAqIFNldCB0aGUgbWF4aW11bSBudW1iZXIgb2YgYWxsb3dlZCBjb25uZWN0aW9ucyBhdCB0aGUgc2FtZSB0aW1lLlxuICAgKiBAcGFyYW0gY29uY3VycmVuY3lcbiAgICovXG4gIHNldENvbmN1cnJlbmN5KGNvbmN1cnJlbmN5OiBudW1iZXIpIHtcbiAgICB0aGlzLmNvbmN1cnJlbmN5ID0gY29uY3VycmVuY3k7XG4gIH1cblxuICAvKipcbiAgICogU2V0cyB0aGUgbWF4aW11bSBhbGxvd2VkIGNhY2hlIHNpemVcbiAgICogQHBhcmFtIGNhY2hlU2l6ZSBDYWNoZSBzaXplIGluIGJ5dGVzXG4gICAqL1xuICBzZXRNYXhpbXVtQ2FjaGVTaXplKGNhY2hlU2l6ZTogbnVtYmVyKSB7XG4gICAgdGhpcy5tYXhDYWNoZVNpemUgPSBjYWNoZVNpemU7XG4gIH1cblxuICAvKipcbiAgICogU2V0cyB0aGUgbWF4aW11bSBhbGxvd2VkIGNhY2hlIGFnZVxuICAgKiBAcGFyYW0gY2FjaGVBZ2UgTWF4aW11bSBjYWNoZSBhZ2UgaW4gbWlsbGlzZWNvbmRzXG4gICAqL1xuICBzZXRNYXhpbXVtQ2FjaGVBZ2UoY2FjaGVBZ2U6IG51bWJlcikge1xuICAgIHRoaXMubWF4Q2FjaGVBZ2UgPSBjYWNoZUFnZTtcbiAgfVxuXG4gIC8qKlxuICAgKiBTZXQgdGhlIHJldHVybiB0eXBlIG9mIGNhY2hlZCBpbWFnZXNcbiAgICogQHBhcmFtIGltYWdlUmV0dXJuVHlwZSBUaGUgcmV0dXJuIHR5cGU7IGVpdGhlciAnYmFzZTY0JyBvciAndXJpJ1xuICAgKi9cbiAgc2V0SW1hZ2VSZXR1cm5UeXBlKGltYWdlUmV0dXJuVHlwZTogJ2Jhc2U2NCcgfCAndXJpJykge1xuICAgIHRoaXMuaW1hZ2VSZXR1cm5UeXBlID0gaW1hZ2VSZXR1cm5UeXBlO1xuICB9XG5cbiAgLyoqXG4gICAqIFNldCB0aGUgZGVmYXVsdCBzcGlubmVyIG5hbWVcbiAgICogQHBhcmFtIG5hbWVcbiAgICovXG4gIHNldFNwaW5uZXJOYW1lKG5hbWU6IHN0cmluZykge1xuICAgIHRoaXMuc3Bpbm5lck5hbWUgPSBuYW1lO1xuICB9XG5cbiAgLyoqXG4gICAqIFNldCB0aGUgZGVmYXVsdCBzcGlubmVyIGNvbG9yXG4gICAqIEBwYXJhbSBjb2xvclxuICAgKi9cbiAgc2V0U3Bpbm5lckNvbG9yKGNvbG9yOiBzdHJpbmcpIHtcbiAgICB0aGlzLnNwaW5uZXJDb2xvciA9IGNvbG9yO1xuICB9XG5cbiAgLyoqXG4gICAqIFNldCBoZWFkZXJzIG9wdGlvbnMgZm9yIHRoZSBIdHRwQ2xpZW50IHRyYW5zZmVycy5cbiAgICogQHBhcmFtIGhlYWRlcnNcbiAgICovXG4gIHNldEh0dHBIZWFkZXJzKGhlYWRlcnM6IEh0dHBIZWFkZXJzKSB7XG4gICAgdGhpcy5odHRwSGVhZGVycyA9IGhlYWRlcnM7XG4gIH1cblxuICAvKipcbiAgICogU2V0IG9wdGlvbnMgZm9yIHRoZSBGaWxlVHJhbnNmZXIgcGx1Z2luXG4gICAqIEBwYXJhbSBvcHRpb25zXG4gICAqIEBkZXByZWNhdGVkIEZpbGVUcmFuc2ZlciBwbHVnaW4gcmVtb3ZlZC5cbiAgICovXG4gIHNldEZpbGVUcmFuc2Zlck9wdGlvbnMob3B0aW9uczoge1xuICAgIHRydXN0QWxsSG9zdHM6IGJvb2xlYW47XG4gICAgW2tleTogc3RyaW5nXTogYW55O1xuICB9KSB7XG4gICAgLy8gZG8gbm90aGluZywgcGx1Z2luIGRlcHJlY2F0ZWQuXG4gIH1cblxuICAvKipcbiAgICogRW5hYmxlL0Rpc2FibGUgdGhlIHNhdmUgZmlsZW5hbWUgb2YgY2FjaGVkIGltYWdlcyB3aXRoIGV4dGVuc2lvbi4gIERlZmF1bHRzIHRvIGZhbHNlLlxuICAgKiBAcGFyYW0gZW5hYmxlIHNldCB0byB0cnVlIHRvIGVuYWJsZVxuICAgKi9cbiAgc2V0RmlsZU5hbWVDYWNoZWRXaXRoRXh0ZW5zaW9uKGVuYWJsZTogYm9vbGVhbikge1xuICAgIHRoaXMuZmlsZU5hbWVDYWNoZWRXaXRoRXh0ZW5zaW9uID0gZW5hYmxlO1xuICB9XG5cbiAgLyoqXG4gICAqIFNldCBmYWxsYmFjayBleHRlbnNpb24gZmlsZW5hbWUgb2YgY2FjaGVkIGltYWdlcy4gIERlZmF1bHRzIHRvICcuanBnJy5cbiAgICogQHBhcmFtIGV4dGVuc2lvbiBmYWxsYmFjayBleHRlbnNpb24gKGUueCAuanBnKVxuICAgKi9cbiAgc2V0RmFsbGJhY2tGaWxlTmFtZUNhY2hlZEV4dGVuc2lvbihleHRlbnNpb246IHN0cmluZykge1xuICAgIHRoaXMuZmFsbGJhY2tGaWxlTmFtZUNhY2hlZEV4dGVuc2lvbiA9IGV4dGVuc2lvbjtcbiAgfVxufVxuIl19