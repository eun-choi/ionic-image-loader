import { __awaiter, __generator } from 'tslib';
import { WebView } from '@awesome-cordova-plugins/ionic-webview/ngx';
import { fromEvent, Subject } from 'rxjs';
import { filter, first, take } from 'rxjs/operators';
import { File as File$1 } from '@awesome-cordova-plugins/file/ngx/index';
import { WebView as WebView$1 } from '@awesome-cordova-plugins/ionic-webview/ngx/index';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Injectable, Component, ElementRef, EventEmitter, Input, Output, Renderer2, NgModule, defineInjectable, inject } from '@angular/core';
import { File } from '@awesome-cordova-plugins/file/ngx';
import { Platform, IonicModule } from '@ionic/angular';

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
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
    /** @nocollapse */ ImageLoaderConfigService.ngInjectableDef = defineInjectable({ factory: function ImageLoaderConfigService_Factory() { return new ImageLoaderConfigService(); }, token: ImageLoaderConfigService, providedIn: "root" });
    return ImageLoaderConfigService;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/** @type {?} */
var EXTENSIONS = ['jpg', 'png', 'jpeg', 'gif', 'svg', 'tiff'];
var ImageLoaderService = /** @class */ (function () {
    function ImageLoaderService(config, file, http, platform, webview) {
        var _this = this;
        this.config = config;
        this.file = file;
        this.http = http;
        this.platform = platform;
        this.webview = webview;
        /**
         * Indicates if the cache service is ready.
         * When the cache service isn't ready, images are loaded via browser instead.
         */
        this.isCacheReady = false;
        /**
         * Indicates if this service is initialized.
         * This service is initialized once all the setup is done.
         */
        this.isInit = false;
        this.initPromise = new Promise(function (resolve) { return _this.initPromiseResolve = resolve; });
        this.lockSubject = new Subject();
        this.lock$ = this.lockSubject.asObservable();
        /**
         * Number of concurrent requests allowed
         */
        this.concurrency = 5;
        /**
         * Queue items
         */
        this.queue = [];
        this.processing = 0;
        /**
         * Fast accessible Object for currently processing items
         */
        this.currentlyProcessing = {};
        this.cacheIndex = [];
        this.currentCacheSize = 0;
        this.indexed = false;
        this.lockedCallsQueue = [];
        if (!platform.is('cordova')) {
            // we are running on a browser, or using livereload
            // plugin will not function in this case
            this.isInit = true;
            this.throwWarning('You are running on a browser or using livereload, IonicImageLoader will not function, falling back to browser loading.');
            this.initPromiseResolve();
        }
        else {
            fromEvent(document, 'deviceready')
                .pipe(first())
                .subscribe(function (res) {
                if (_this.nativeAvailable) {
                    _this.initCache();
                }
                else {
                    // we are running on a browser, or using livereload
                    // plugin will not function in this case
                    _this.isInit = true;
                    _this.initPromiseResolve();
                    _this.throwWarning('You are running on a browser or using livereload, IonicImageLoader will not function, falling back to browser loading.');
                }
            });
        }
    }
    Object.defineProperty(ImageLoaderService.prototype, "nativeAvailable", {
        get: /**
         * @return {?}
         */
        function () {
            return File.installed();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ImageLoaderService.prototype, "isCacheSpaceExceeded", {
        get: /**
         * @private
         * @return {?}
         */
        function () {
            return (this.config.maxCacheSize > -1 &&
                this.currentCacheSize > this.config.maxCacheSize);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ImageLoaderService.prototype, "isWKWebView", {
        get: /**
         * @private
         * @return {?}
         */
        function () {
            return (this.platform.is('ios') &&
                ((/** @type {?} */ (window))).webkit &&
                ((/** @type {?} */ (window))).webkit.messageHandlers);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ImageLoaderService.prototype, "isIonicWKWebView", {
        get: /**
         * @private
         * @return {?}
         */
        function () {
            return (
            //  Important: isWKWebview && isIonicWKWebview must be mutually excluse.
            //  Otherwise the logic for copying to tmp under IOS will fail.
            (this.platform.is('android') && this.webview) ||
                (this.platform.is('android')) && (location.host === 'localhost:8080') ||
                ((/** @type {?} */ (window))).LiveReload);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ImageLoaderService.prototype, "isDevServer", {
        get: /**
         * @private
         * @return {?}
         */
        function () {
            return window['IonicDevServer'] !== undefined;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ImageLoaderService.prototype, "canProcess", {
        /**
         * Check if we can process more items in the queue
         */
        get: /**
         * Check if we can process more items in the queue
         * @private
         * @return {?}
         */
        function () {
            return this.queue.length > 0 && this.processing < this.concurrency;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @return {?}
     */
    ImageLoaderService.prototype.ready = /**
     * @return {?}
     */
    function () {
        return this.initPromise;
    };
    /**
     * Preload an image
     * @param imageUrl Image URL
     * @returns returns a promise that resolves with the cached image URL
     */
    /**
     * Preload an image
     * @param {?} imageUrl Image URL
     * @return {?} returns a promise that resolves with the cached image URL
     */
    ImageLoaderService.prototype.preload = /**
     * Preload an image
     * @param {?} imageUrl Image URL
     * @return {?} returns a promise that resolves with the cached image URL
     */
    function (imageUrl) {
        return this.getImagePath(imageUrl);
    };
    /**
     * @return {?}
     */
    ImageLoaderService.prototype.getFileCacheDirectory = /**
     * @return {?}
     */
    function () {
        if (this.config.cacheDirectoryType === 'data') {
            return this.file.dataDirectory;
        }
        else if (this.config.cacheDirectoryType === 'external') {
            return this.platform.is('android') ? this.file.externalDataDirectory : this.file.documentsDirectory;
        }
        return this.file.cacheDirectory;
    };
    /**
     * Clears cache of a single image
     * @param imageUrl Image URL
     */
    /**
     * Clears cache of a single image
     * @param {?} imageUrl Image URL
     * @return {?}
     */
    ImageLoaderService.prototype.clearImageCache = /**
     * Clears cache of a single image
     * @param {?} imageUrl Image URL
     * @return {?}
     */
    function (imageUrl) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!this.platform.is('cordova')) {
                            return [2 /*return*/];
                        }
                        return [4 /*yield*/, this.ready()];
                    case 1:
                        _a.sent();
                        this.runLocked(function () { return __awaiter(_this, void 0, void 0, function () {
                            var fileName, route, err_1;
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0:
                                        fileName = this.createFileName(imageUrl);
                                        route = this.getFileCacheDirectory() + this.config.cacheDirectoryName;
                                        // pause any operations
                                        this.isInit = false;
                                        _a.label = 1;
                                    case 1:
                                        _a.trys.push([1, 5, , 6]);
                                        return [4 /*yield*/, this.file.removeFile(route, fileName)];
                                    case 2:
                                        _a.sent();
                                        if (!(this.isWKWebView && !this.isIonicWKWebView)) return [3 /*break*/, 4];
                                        return [4 /*yield*/, this.file.removeFile(this.file.tempDirectory + this.config.cacheDirectoryName, fileName)];
                                    case 3:
                                        _a.sent();
                                        _a.label = 4;
                                    case 4: return [3 /*break*/, 6];
                                    case 5:
                                        err_1 = _a.sent();
                                        this.throwError(err_1);
                                        return [3 /*break*/, 6];
                                    case 6: return [2 /*return*/, this.initCache(true)];
                                }
                            });
                        }); });
                        return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Clears the cache
     */
    /**
     * Clears the cache
     * @return {?}
     */
    ImageLoaderService.prototype.clearCache = /**
     * Clears the cache
     * @return {?}
     */
    function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!this.platform.is('cordova')) {
                            return [2 /*return*/];
                        }
                        return [4 /*yield*/, this.ready()];
                    case 1:
                        _a.sent();
                        this.runLocked(function () { return __awaiter(_this, void 0, void 0, function () {
                            var err_2;
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0:
                                        _a.trys.push([0, 2, , 3]);
                                        return [4 /*yield*/, this.file.removeRecursively(this.getFileCacheDirectory(), this.config.cacheDirectoryName)];
                                    case 1:
                                        _a.sent();
                                        if (this.isWKWebView && !this.isIonicWKWebView) {
                                            // also clear the temp files
                                            try {
                                                this.file.removeRecursively(this.file.tempDirectory, this.config.cacheDirectoryName);
                                            }
                                            catch (err) {
                                                // Noop catch. Removing the tempDirectory might fail,
                                                // as it is not persistent.
                                            }
                                        }
                                        return [3 /*break*/, 3];
                                    case 2:
                                        err_2 = _a.sent();
                                        this.throwError(err_2);
                                        return [3 /*break*/, 3];
                                    case 3: return [2 /*return*/, this.initCache(true)];
                                }
                            });
                        }); });
                        return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Gets the filesystem path of an image.
     * This will return the remote path if anything goes wrong or if the cache service isn't ready yet.
     * @param imageUrl The remote URL of the image
     * @returns Returns a promise that will always resolve with an image URL
     */
    /**
     * Gets the filesystem path of an image.
     * This will return the remote path if anything goes wrong or if the cache service isn't ready yet.
     * @param {?} imageUrl The remote URL of the image
     * @return {?} Returns a promise that will always resolve with an image URL
     */
    ImageLoaderService.prototype.getImagePath = /**
     * Gets the filesystem path of an image.
     * This will return the remote path if anything goes wrong or if the cache service isn't ready yet.
     * @param {?} imageUrl The remote URL of the image
     * @return {?} Returns a promise that will always resolve with an image URL
     */
    function (imageUrl) {
        return __awaiter(this, void 0, void 0, function () {
            var err_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (typeof imageUrl !== 'string' || imageUrl.length <= 0) {
                            throw new Error('The image url provided was empty or invalid.');
                        }
                        return [4 /*yield*/, this.ready()];
                    case 1:
                        _a.sent();
                        if (!this.isCacheReady) {
                            this.throwWarning('The cache system is not running. Images will be loaded by your browser instead.');
                            return [2 /*return*/, imageUrl];
                        }
                        if (this.isImageUrlRelative(imageUrl)) {
                            return [2 /*return*/, imageUrl];
                        }
                        _a.label = 2;
                    case 2:
                        _a.trys.push([2, 4, , 5]);
                        return [4 /*yield*/, this.getCachedImagePath(imageUrl)];
                    case 3: return [2 /*return*/, _a.sent()];
                    case 4:
                        err_3 = _a.sent();
                        // image doesn't exist in cache, lets fetch it and save it
                        return [2 /*return*/, this.addItemToQueue(imageUrl)];
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * @private
     * @return {?}
     */
    ImageLoaderService.prototype.processLockedQueue = /**
     * @private
     * @return {?}
     */
    function () {
        return __awaiter(this, void 0, void 0, function () {
            var err_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.getLockedState()];
                    case 1:
                        if (_a.sent()) {
                            return [2 /*return*/];
                        }
                        if (!(this.lockedCallsQueue.length > 0)) return [3 /*break*/, 8];
                        return [4 /*yield*/, this.setLockedState(true)];
                    case 2:
                        _a.sent();
                        _a.label = 3;
                    case 3:
                        _a.trys.push([3, 5, , 6]);
                        return [4 /*yield*/, this.lockedCallsQueue.slice(0, 1)[0]()];
                    case 4:
                        _a.sent();
                        return [3 /*break*/, 6];
                    case 5:
                        err_4 = _a.sent();
                        console.log('Error running locked function: ', err_4);
                        return [3 /*break*/, 6];
                    case 6: return [4 /*yield*/, this.setLockedState(false)];
                    case 7:
                        _a.sent();
                        return [2 /*return*/, this.processLockedQueue()];
                    case 8: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * @private
     * @return {?}
     */
    ImageLoaderService.prototype.getLockedState = /**
     * @private
     * @return {?}
     */
    function () {
        return this.lock$
            .pipe(take(1))
            .toPromise();
    };
    /**
     * @private
     * @return {?}
     */
    ImageLoaderService.prototype.awaitUnlocked = /**
     * @private
     * @return {?}
     */
    function () {
        return this.lock$
            .pipe(filter(function (locked) { return !!locked; }), take(1))
            .toPromise();
    };
    /**
     * @private
     * @param {?} locked
     * @return {?}
     */
    ImageLoaderService.prototype.setLockedState = /**
     * @private
     * @param {?} locked
     * @return {?}
     */
    function (locked) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                this.lockSubject.next(locked);
                return [2 /*return*/];
            });
        });
    };
    /**
     * @private
     * @param {?} fn
     * @return {?}
     */
    ImageLoaderService.prototype.runLocked = /**
     * @private
     * @param {?} fn
     * @return {?}
     */
    function (fn) {
        this.lockedCallsQueue.push(fn);
        this.processLockedQueue();
    };
    /**
     * Returns if an imageUrl is an relative path
     * @param imageUrl
     */
    /**
     * Returns if an imageUrl is an relative path
     * @private
     * @param {?} imageUrl
     * @return {?}
     */
    ImageLoaderService.prototype.isImageUrlRelative = /**
     * Returns if an imageUrl is an relative path
     * @private
     * @param {?} imageUrl
     * @return {?}
     */
    function (imageUrl) {
        return !/^(https?|file):\/\/\/?/i.test(imageUrl);
    };
    /**
     * Add an item to the queue
     * @param imageUrl
     * @param resolve
     * @param reject
     */
    /**
     * Add an item to the queue
     * @private
     * @param {?} imageUrl
     * @param {?=} resolve
     * @param {?=} reject
     * @return {?}
     */
    ImageLoaderService.prototype.addItemToQueue = /**
     * Add an item to the queue
     * @private
     * @param {?} imageUrl
     * @param {?=} resolve
     * @param {?=} reject
     * @return {?}
     */
    function (imageUrl, resolve, reject) {
        /** @type {?} */
        var p;
        if (!resolve && !reject) {
            p = new Promise(function (res, rej) {
                resolve = res;
                reject = rej;
            });
        }
        else {
            resolve = resolve || (function () {
            });
            reject = reject || (function () {
            });
        }
        this.queue.push({
            imageUrl: imageUrl,
            resolve: resolve,
            reject: reject,
        });
        this.processQueue();
        return p;
    };
    /**
     * Processes one item from the queue
     */
    /**
     * Processes one item from the queue
     * @private
     * @return {?}
     */
    ImageLoaderService.prototype.processQueue = /**
     * Processes one item from the queue
     * @private
     * @return {?}
     */
    function () {
        return __awaiter(this, void 0, void 0, function () {
            var currentItem, done, error, localUrl, err_5;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        // make sure we can process items first
                        if (!this.canProcess) {
                            return [2 /*return*/];
                        }
                        // increase the processing number
                        this.processing++;
                        // take the first item from queue
                        currentItem = this.queue.splice(0, 1)[0];
                        // function to call when done processing this item
                        // this will reduce the processing number
                        // then will execute this function again to process any remaining items
                        done = function () {
                            _this.processing--;
                            _this.processQueue();
                            // only delete if it's the last/unique occurrence in the queue
                            if (_this.currentlyProcessing[currentItem.imageUrl] !== undefined && !_this.currentlyInQueue(currentItem.imageUrl)) {
                                delete _this.currentlyProcessing[currentItem.imageUrl];
                            }
                        };
                        error = function (e) {
                            currentItem.reject();
                            _this.throwError(e);
                            done();
                        };
                        if (!(this.currentlyProcessing[currentItem.imageUrl] !== undefined)) return [3 /*break*/, 6];
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 4, , 5]);
                        // Prevented same Image from loading at the same time
                        return [4 /*yield*/, this.currentlyProcessing[currentItem.imageUrl]];
                    case 2:
                        // Prevented same Image from loading at the same time
                        _a.sent();
                        return [4 /*yield*/, this.getCachedImagePath(currentItem.imageUrl)];
                    case 3:
                        localUrl = _a.sent();
                        currentItem.resolve(localUrl);
                        done();
                        return [3 /*break*/, 5];
                    case 4:
                        err_5 = _a.sent();
                        error(err_5);
                        return [3 /*break*/, 5];
                    case 5: return [2 /*return*/];
                    case 6:
                        this.currentlyProcessing[currentItem.imageUrl] = (function () { return __awaiter(_this, void 0, void 0, function () {
                            var localDir, fileName, data, file, localUrl, err_6;
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0:
                                        // process more items concurrently if we can
                                        if (this.canProcess) {
                                            this.processQueue();
                                        }
                                        localDir = this.getFileCacheDirectory() + this.config.cacheDirectoryName + '/';
                                        fileName = this.createFileName(currentItem.imageUrl);
                                        _a.label = 1;
                                    case 1:
                                        _a.trys.push([1, 6, , 7]);
                                        return [4 /*yield*/, this.http.get(currentItem.imageUrl, {
                                                responseType: 'blob',
                                                headers: this.config.httpHeaders,
                                            }).toPromise()];
                                    case 2:
                                        data = _a.sent();
                                        return [4 /*yield*/, this.file.writeFile(localDir, fileName, data, { replace: true })];
                                    case 3:
                                        file = (/** @type {?} */ (_a.sent()));
                                        if (this.isCacheSpaceExceeded) {
                                            this.maintainCacheSize();
                                        }
                                        return [4 /*yield*/, this.addFileToIndex(file)];
                                    case 4:
                                        _a.sent();
                                        return [4 /*yield*/, this.getCachedImagePath(currentItem.imageUrl)];
                                    case 5:
                                        localUrl = _a.sent();
                                        currentItem.resolve(localUrl);
                                        done();
                                        this.maintainCacheSize();
                                        return [3 /*break*/, 7];
                                    case 6:
                                        err_6 = _a.sent();
                                        error(err_6);
                                        throw err_6;
                                    case 7: return [2 /*return*/];
                                }
                            });
                        }); })();
                        return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Search if the url is currently in the queue
     * @param imageUrl Image url to search
     */
    /**
     * Search if the url is currently in the queue
     * @private
     * @param {?} imageUrl Image url to search
     * @return {?}
     */
    ImageLoaderService.prototype.currentlyInQueue = /**
     * Search if the url is currently in the queue
     * @private
     * @param {?} imageUrl Image url to search
     * @return {?}
     */
    function (imageUrl) {
        return this.queue.some(function (item) { return item.imageUrl === imageUrl; });
    };
    /**
     * Initialize the cache service
     * @param [replace] Whether to replace the cache directory if it already exists
     */
    /**
     * Initialize the cache service
     * @private
     * @param {?=} replace
     * @return {?}
     */
    ImageLoaderService.prototype.initCache = /**
     * Initialize the cache service
     * @private
     * @param {?=} replace
     * @return {?}
     */
    function (replace) {
        return __awaiter(this, void 0, void 0, function () {
            var err_7;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.concurrency = this.config.concurrency;
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 4, , 5]);
                        return [4 /*yield*/, this.createCacheDirectory(replace)];
                    case 2:
                        _a.sent();
                        return [4 /*yield*/, this.indexCache()];
                    case 3:
                        _a.sent();
                        this.isCacheReady = true;
                        return [3 /*break*/, 5];
                    case 4:
                        err_7 = _a.sent();
                        this.throwError(err_7);
                        return [3 /*break*/, 5];
                    case 5:
                        this.isInit = true;
                        this.initPromiseResolve();
                        return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Adds a file to index.
     * Also deletes any files if they are older than the set maximum cache age.
     * @param file FileEntry to index
     */
    /**
     * Adds a file to index.
     * Also deletes any files if they are older than the set maximum cache age.
     * @private
     * @param {?} file FileEntry to index
     * @return {?}
     */
    ImageLoaderService.prototype.addFileToIndex = /**
     * Adds a file to index.
     * Also deletes any files if they are older than the set maximum cache age.
     * @private
     * @param {?} file FileEntry to index
     * @return {?}
     */
    function (file) {
        return __awaiter(this, void 0, void 0, function () {
            var metadata;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, new Promise(function (resolve, reject) { return file.getMetadata(resolve, reject); })];
                    case 1:
                        metadata = _a.sent();
                        if (this.config.maxCacheAge > -1 &&
                            Date.now() - metadata.modificationTime.getTime() >
                                this.config.maxCacheAge) {
                            // file age exceeds maximum cache age
                            return [2 /*return*/, this.removeFile(file.name)];
                        }
                        else {
                            // file age doesn't exceed maximum cache age, or maximum cache age isn't set
                            this.currentCacheSize += metadata.size;
                            // add item to index
                            this.cacheIndex.push({
                                name: file.name,
                                modificationTime: metadata.modificationTime,
                                size: metadata.size,
                            });
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Indexes the cache if necessary
     */
    /**
     * Indexes the cache if necessary
     * @private
     * @return {?}
     */
    ImageLoaderService.prototype.indexCache = /**
     * Indexes the cache if necessary
     * @private
     * @return {?}
     */
    function () {
        return __awaiter(this, void 0, void 0, function () {
            var files, err_8;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.cacheIndex = [];
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 4, , 5]);
                        return [4 /*yield*/, this.file.listDir(this.getFileCacheDirectory(), this.config.cacheDirectoryName)];
                    case 2:
                        files = _a.sent();
                        return [4 /*yield*/, Promise.all(files.map(this.addFileToIndex.bind(this)))];
                    case 3:
                        _a.sent();
                        // Sort items by date. Most recent to oldest.
                        this.cacheIndex = this.cacheIndex.sort(function (a, b) { return (a > b ? -1 : a < b ? 1 : 0); });
                        this.indexed = true;
                        return [3 /*break*/, 5];
                    case 4:
                        err_8 = _a.sent();
                        this.throwError(err_8);
                        return [3 /*break*/, 5];
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * This method runs every time a new file is added.
     * It checks the cache size and ensures that it doesn't exceed the maximum cache size set in the config.
     * If the limit is reached, it will delete old images to create free space.
     */
    /**
     * This method runs every time a new file is added.
     * It checks the cache size and ensures that it doesn't exceed the maximum cache size set in the config.
     * If the limit is reached, it will delete old images to create free space.
     * @private
     * @return {?}
     */
    ImageLoaderService.prototype.maintainCacheSize = /**
     * This method runs every time a new file is added.
     * It checks the cache size and ensures that it doesn't exceed the maximum cache size set in the config.
     * If the limit is reached, it will delete old images to create free space.
     * @private
     * @return {?}
     */
    function () {
        return __awaiter(this, void 0, void 0, function () {
            var maintain_1;
            var _this = this;
            return __generator(this, function (_a) {
                if (this.config.maxCacheSize > -1 && this.indexed) {
                    maintain_1 = function () { return __awaiter(_this, void 0, void 0, function () {
                        var file, err_9;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    if (!(this.currentCacheSize > this.config.maxCacheSize)) return [3 /*break*/, 5];
                                    // grab the first item in index since it's the oldest one
                                    file = this.cacheIndex.splice(0, 1)[0];
                                    if (typeof file === 'undefined') {
                                        return [2 /*return*/, maintain_1()];
                                    }
                                    _a.label = 1;
                                case 1:
                                    _a.trys.push([1, 3, , 4]);
                                    return [4 /*yield*/, this.removeFile(file.name)];
                                case 2:
                                    _a.sent();
                                    return [3 /*break*/, 4];
                                case 3:
                                    err_9 = _a.sent();
                                    return [3 /*break*/, 4];
                                case 4:
                                    this.currentCacheSize -= file.size;
                                    return [2 /*return*/, maintain_1()];
                                case 5: return [2 /*return*/];
                            }
                        });
                    }); };
                    return [2 /*return*/, maintain_1()];
                }
                return [2 /*return*/];
            });
        });
    };
    /**
     * Remove a file
     * @param file The name of the file to remove
     */
    /**
     * Remove a file
     * @private
     * @param {?} file The name of the file to remove
     * @return {?}
     */
    ImageLoaderService.prototype.removeFile = /**
     * Remove a file
     * @private
     * @param {?} file The name of the file to remove
     * @return {?}
     */
    function (file) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.file.removeFile(this.getFileCacheDirectory() + this.config.cacheDirectoryName, file)];
                    case 1:
                        _a.sent();
                        if (this.isWKWebView && !this.isIonicWKWebView) {
                            try {
                                return [2 /*return*/, this.file.removeFile(this.file.tempDirectory + this.config.cacheDirectoryName, file)];
                            }
                            catch (err) {
                                // Noop catch. Removing the files from tempDirectory might fail, as it is not persistent.
                            }
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Get the local path of a previously cached image if exists
     * @param url The remote URL of the image
     * @returns Returns a promise that resolves with the local path if exists, or rejects if doesn't exist
     */
    /**
     * Get the local path of a previously cached image if exists
     * @private
     * @param {?} url The remote URL of the image
     * @return {?} Returns a promise that resolves with the local path if exists, or rejects if doesn't exist
     */
    ImageLoaderService.prototype.getCachedImagePath = /**
     * Get the local path of a previously cached image if exists
     * @private
     * @param {?} url The remote URL of the image
     * @return {?} Returns a promise that resolves with the local path if exists, or rejects if doesn't exist
     */
    function (url) {
        return __awaiter(this, void 0, void 0, function () {
            var fileName, dirPath, tempDirPath, fileEntry, base64, tempFileEntry, err_10, tempFileEntry, err_11;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.ready()];
                    case 1:
                        _a.sent();
                        if (!this.isCacheReady) {
                            throw new Error('Cache is not ready');
                        }
                        // if we're running with livereload, ignore cache and call the resource from it's URL
                        if (this.isDevServer) {
                            return [2 /*return*/, url];
                        }
                        // get file name
                        fileName = this.createFileName(url);
                        // get full path
                        dirPath = this.getFileCacheDirectory() + this.config.cacheDirectoryName;
                        tempDirPath = this.file.tempDirectory + this.config.cacheDirectoryName;
                        _a.label = 2;
                    case 2:
                        _a.trys.push([2, 12, , 13]);
                        // check if exists
                        return [4 /*yield*/, this.file.resolveLocalFilesystemUrl(dirPath + '/' + fileName)];
                    case 3:
                        fileEntry = (/** @type {?} */ (_a.sent()));
                        if (!(this.config.imageReturnType === 'base64')) return [3 /*break*/, 5];
                        // read the file as data url and return the base64 string.
                        // should always be successful as the existence of the file
                        // is already ensured
                        return [4 /*yield*/, this.file.readAsDataURL(dirPath, fileName)];
                    case 4:
                        base64 = _a.sent();
                        return [2 /*return*/, base64.replace('data:null', 'data:*/*')];
                    case 5:
                        if (this.config.imageReturnType !== 'uri') {
                            return [2 /*return*/];
                        }
                        _a.label = 6;
                    case 6:
                        // now check if iOS device & using WKWebView Engine.
                        // in this case only the tempDirectory is accessible,
                        // therefore the file needs to be copied into that directory first!
                        if (this.isIonicWKWebView) {
                            return [2 /*return*/, this.normalizeUrl(fileEntry)];
                        }
                        if (!this.isWKWebView) {
                            // return native path
                            return [2 /*return*/, fileEntry.nativeURL];
                        }
                        _a.label = 7;
                    case 7:
                        _a.trys.push([7, 9, , 11]);
                        return [4 /*yield*/, this.file.resolveLocalFilesystemUrl(tempDirPath + '/' + fileName)];
                    case 8:
                        tempFileEntry = (/** @type {?} */ (_a.sent()));
                        // file exists in temp directory
                        // return native path
                        return [2 /*return*/, this.normalizeUrl(tempFileEntry)];
                    case 9:
                        err_10 = _a.sent();
                        // file does not yet exist in the temp directory.
                        // copy it!
                        return [4 /*yield*/, this.file
                                .copyFile(dirPath, fileName, tempDirPath, fileName)];
                    case 10:
                        tempFileEntry = (/** @type {?} */ (_a.sent()));
                        // now the file exists in the temp directory
                        // return native path
                        return [2 /*return*/, this.normalizeUrl(tempFileEntry)];
                    case 11: return [3 /*break*/, 13];
                    case 12:
                        err_11 = _a.sent();
                        throw new Error('File does not exist');
                    case 13: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Normalizes the image uri to a version that can be loaded in the webview
     * @param fileEntry the FileEntry of the image file
     * @returns the normalized Url
     */
    /**
     * Normalizes the image uri to a version that can be loaded in the webview
     * @private
     * @param {?} fileEntry the FileEntry of the image file
     * @return {?} the normalized Url
     */
    ImageLoaderService.prototype.normalizeUrl = /**
     * Normalizes the image uri to a version that can be loaded in the webview
     * @private
     * @param {?} fileEntry the FileEntry of the image file
     * @return {?} the normalized Url
     */
    function (fileEntry) {
        // Use Ionic normalizeUrl to generate the right URL for Ionic WKWebView
        if (Ionic && typeof Ionic.normalizeURL === 'function') {
            return Ionic.normalizeURL(fileEntry.nativeURL);
        }
        // use new webview function to do the trick
        if (this.webview) {
            return this.webview.convertFileSrc(fileEntry.nativeURL);
        }
        return fileEntry.nativeURL;
    };
    /**
     * Throws a console error if debug mode is enabled
     * @param args Error message
     */
    /**
     * Throws a console error if debug mode is enabled
     * @private
     * @param {...?} args Error message
     * @return {?}
     */
    ImageLoaderService.prototype.throwError = /**
     * Throws a console error if debug mode is enabled
     * @private
     * @param {...?} args Error message
     * @return {?}
     */
    function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        if (this.config.debugMode) {
            args.unshift('ImageLoader Error: ');
            console.error.apply(console, args);
        }
    };
    /**
     * Throws a console warning if debug mode is enabled
     * @param args Error message
     */
    /**
     * Throws a console warning if debug mode is enabled
     * @private
     * @param {...?} args Error message
     * @return {?}
     */
    ImageLoaderService.prototype.throwWarning = /**
     * Throws a console warning if debug mode is enabled
     * @private
     * @param {...?} args Error message
     * @return {?}
     */
    function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        if (this.config.debugMode) {
            args.unshift('ImageLoader Warning: ');
            console.warn.apply(console, args);
        }
    };
    /**
     * Check if the cache directory exists
     * @param directory The directory to check. Either this.file.tempDirectory or this.getFileCacheDirectory()
     * @returns Returns a promise that resolves if exists, and rejects if it doesn't
     */
    /**
     * Check if the cache directory exists
     * @private
     * @param {?} directory The directory to check. Either this.file.tempDirectory or this.getFileCacheDirectory()
     * @return {?} Returns a promise that resolves if exists, and rejects if it doesn't
     */
    ImageLoaderService.prototype.cacheDirectoryExists = /**
     * Check if the cache directory exists
     * @private
     * @param {?} directory The directory to check. Either this.file.tempDirectory or this.getFileCacheDirectory()
     * @return {?} Returns a promise that resolves if exists, and rejects if it doesn't
     */
    function (directory) {
        return this.file.checkDir(directory, this.config.cacheDirectoryName);
    };
    /**
     * Create the cache directories
     * @param replace override directory if exists
     * @returns Returns a promise that resolves if the directories were created, and rejects on error
     */
    /**
     * Create the cache directories
     * @private
     * @param {?=} replace override directory if exists
     * @return {?} Returns a promise that resolves if the directories were created, and rejects on error
     */
    ImageLoaderService.prototype.createCacheDirectory = /**
     * Create the cache directories
     * @private
     * @param {?=} replace override directory if exists
     * @return {?} Returns a promise that resolves if the directories were created, and rejects on error
     */
    function (replace) {
        var _this = this;
        if (replace === void 0) { replace = false; }
        /** @type {?} */
        var cacheDirectoryPromise;
        /** @type {?} */
        var tempDirectoryPromise;
        if (replace) {
            // create or replace the cache directory
            cacheDirectoryPromise = this.file.createDir(this.getFileCacheDirectory(), this.config.cacheDirectoryName, replace);
        }
        else {
            // check if the cache directory exists.
            // if it does not exist create it!
            cacheDirectoryPromise = this.cacheDirectoryExists(this.getFileCacheDirectory())
                .catch(function () { return _this.file.createDir(_this.getFileCacheDirectory(), _this.config.cacheDirectoryName, false); });
        }
        if (this.isWKWebView && !this.isIonicWKWebView) {
            if (replace) {
                // create or replace the temp directory
                tempDirectoryPromise = this.file.createDir(this.file.tempDirectory, this.config.cacheDirectoryName, replace);
            }
            else {
                // check if the temp directory exists.
                // if it does not exist create it!
                tempDirectoryPromise = this.cacheDirectoryExists(this.file.tempDirectory).catch(function () {
                    return _this.file.createDir(_this.file.tempDirectory, _this.config.cacheDirectoryName, false);
                });
            }
        }
        else {
            tempDirectoryPromise = Promise.resolve();
        }
        return Promise.all([cacheDirectoryPromise, tempDirectoryPromise]);
    };
    /**
     * Creates a unique file name out of the URL
     * @param url URL of the file
     * @returns Unique file name
     */
    /**
     * Creates a unique file name out of the URL
     * @private
     * @param {?} url URL of the file
     * @return {?} Unique file name
     */
    ImageLoaderService.prototype.createFileName = /**
     * Creates a unique file name out of the URL
     * @private
     * @param {?} url URL of the file
     * @return {?} Unique file name
     */
    function (url) {
        // hash the url to get a unique file name
        return (this.hashString(url).toString() +
            (this.config.fileNameCachedWithExtension
                ? this.getExtensionFromUrl(url)
                : ''));
    };
    /**
     * Converts a string to a unique 32-bit int
     * @param string string to hash
     * @returns 32-bit int
     */
    /**
     * Converts a string to a unique 32-bit int
     * @private
     * @param {?} string string to hash
     * @return {?} 32-bit int
     */
    ImageLoaderService.prototype.hashString = /**
     * Converts a string to a unique 32-bit int
     * @private
     * @param {?} string string to hash
     * @return {?} 32-bit int
     */
    function (string) {
        /** @type {?} */
        var hash = 0;
        /** @type {?} */
        var char;
        if (string.length === 0) {
            return hash;
        }
        for (var i = 0; i < string.length; i++) {
            char = string.charCodeAt(i);
            // tslint:disable-next-line
            hash = (hash << 5) - hash + char;
            // tslint:disable-next-line
            hash = hash & hash;
        }
        return hash;
    };
    /**
     * Extract extension from filename or url
     *
     * @param url
     * @returns
     *
     * Not always will url's contain a valid image extention. We'll check if any valid extention is supplied.
     * If not, we will use the default.
     */
    /**
     * Extract extension from filename or url
     *
     * @private
     * @param {?} url
     * @return {?}
     *
     * Not always will url's contain a valid image extention. We'll check if any valid extention is supplied.
     * If not, we will use the default.
     */
    ImageLoaderService.prototype.getExtensionFromUrl = /**
     * Extract extension from filename or url
     *
     * @private
     * @param {?} url
     * @return {?}
     *
     * Not always will url's contain a valid image extention. We'll check if any valid extention is supplied.
     * If not, we will use the default.
     */
    function (url) {
        /** @type {?} */
        var urlWitoutParams = url.split(/\#|\?/)[0];
        /** @type {?} */
        var ext = (urlWitoutParams.substr((~-urlWitoutParams.lastIndexOf('.') >>> 0) + 1) || '').toLowerCase();
        return (EXTENSIONS.indexOf(ext) >= 0 ? ext : this.config.fallbackFileNameCachedExtension);
    };
    ImageLoaderService.decorators = [
        { type: Injectable, args: [{
                    providedIn: 'root',
                },] }
    ];
    /** @nocollapse */
    ImageLoaderService.ctorParameters = function () { return [
        { type: ImageLoaderConfigService },
        { type: File },
        { type: HttpClient },
        { type: Platform },
        { type: WebView }
    ]; };
    /** @nocollapse */ ImageLoaderService.ngInjectableDef = defineInjectable({ factory: function ImageLoaderService_Factory() { return new ImageLoaderService(inject(ImageLoaderConfigService), inject(File$1), inject(HttpClient), inject(Platform), inject(WebView$1)); }, token: ImageLoaderService, providedIn: "root" });
    return ImageLoaderService;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/** @type {?} */
var propMap = {
    display: 'display',
    height: 'height',
    width: 'width',
    backgroundSize: 'background-size',
    backgroundRepeat: 'background-repeat',
};
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

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var IonicImageLoader = /** @class */ (function () {
    function IonicImageLoader() {
    }
    /**
     * @return {?}
     */
    IonicImageLoader.forRoot = /**
     * @return {?}
     */
    function () {
        return {
            ngModule: IonicImageLoader,
            providers: [
                ImageLoaderConfigService,
                ImageLoaderService,
                File,
            ],
        };
    };
    IonicImageLoader.decorators = [
        { type: NgModule, args: [{
                    imports: [
                        IonicModule,
                        HttpClientModule,
                        CommonModule,
                    ],
                    declarations: [IonicImageLoaderComponent],
                    exports: [IonicImageLoaderComponent],
                },] }
    ];
    return IonicImageLoader;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

export { IonicImageLoaderComponent, IonicImageLoader, ImageLoaderService, ImageLoaderConfigService };

//# sourceMappingURL=ionic-image-loader.js.map