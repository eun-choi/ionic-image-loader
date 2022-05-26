/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { File } from '@awesome-cordova-plugins/file/ngx';
import { WebView } from '@awesome-cordova-plugins/ionic-webview/ngx';
import { Platform } from '@ionic/angular';
import { fromEvent, Subject } from 'rxjs';
import { filter, first, take } from 'rxjs/operators';
import { ImageLoaderConfigService } from './image-loader-config.service';
import * as i0 from "@angular/core";
import * as i1 from "./image-loader-config.service";
import * as i2 from "@awesome-cordova-plugins/file/ngx/index";
import * as i3 from "@angular/common/http";
import * as i4 from "@ionic/angular";
import * as i5 from "@awesome-cordova-plugins/ionic-webview/ngx/index";
/**
 * @record
 */
function IndexItem() { }
if (false) {
    /** @type {?} */
    IndexItem.prototype.name;
    /** @type {?} */
    IndexItem.prototype.modificationTime;
    /** @type {?} */
    IndexItem.prototype.size;
}
/**
 * @record
 */
function QueueItem() { }
if (false) {
    /** @type {?} */
    QueueItem.prototype.imageUrl;
    /** @type {?} */
    QueueItem.prototype.resolve;
    /** @type {?} */
    QueueItem.prototype.reject;
}
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
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var _this = this;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!this.platform.is('cordova')) {
                            return [2 /*return*/];
                        }
                        return [4 /*yield*/, this.ready()];
                    case 1:
                        _a.sent();
                        this.runLocked(function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
                            var fileName, route, err_1;
                            return tslib_1.__generator(this, function (_a) {
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
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var _this = this;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!this.platform.is('cordova')) {
                            return [2 /*return*/];
                        }
                        return [4 /*yield*/, this.ready()];
                    case 1:
                        _a.sent();
                        this.runLocked(function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
                            var err_2;
                            return tslib_1.__generator(this, function (_a) {
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
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var err_3;
            return tslib_1.__generator(this, function (_a) {
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
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var err_4;
            return tslib_1.__generator(this, function (_a) {
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
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
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
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var currentItem, done, error, localUrl, err_5;
            var _this = this;
            return tslib_1.__generator(this, function (_a) {
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
                        this.currentlyProcessing[currentItem.imageUrl] = (function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
                            var localDir, fileName, data, file, localUrl, err_6;
                            return tslib_1.__generator(this, function (_a) {
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
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var err_7;
            return tslib_1.__generator(this, function (_a) {
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
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var metadata;
            return tslib_1.__generator(this, function (_a) {
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
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var files, err_8;
            return tslib_1.__generator(this, function (_a) {
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
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var maintain_1;
            var _this = this;
            return tslib_1.__generator(this, function (_a) {
                if (this.config.maxCacheSize > -1 && this.indexed) {
                    maintain_1 = function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
                        var file, err_9;
                        return tslib_1.__generator(this, function (_a) {
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
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
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
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var fileName, dirPath, tempDirPath, fileEntry, base64, tempFileEntry, err_10, tempFileEntry, err_11;
            return tslib_1.__generator(this, function (_a) {
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
    /** @nocollapse */ ImageLoaderService.ngInjectableDef = i0.defineInjectable({ factory: function ImageLoaderService_Factory() { return new ImageLoaderService(i0.inject(i1.ImageLoaderConfigService), i0.inject(i2.File), i0.inject(i3.HttpClient), i0.inject(i4.Platform), i0.inject(i5.WebView)); }, token: ImageLoaderService, providedIn: "root" });
    return ImageLoaderService;
}());
export { ImageLoaderService };
if (false) {
    /**
     * Indicates if the cache service is ready.
     * When the cache service isn't ready, images are loaded via browser instead.
     * @type {?}
     * @private
     */
    ImageLoaderService.prototype.isCacheReady;
    /**
     * Indicates if this service is initialized.
     * This service is initialized once all the setup is done.
     * @type {?}
     * @private
     */
    ImageLoaderService.prototype.isInit;
    /**
     * @type {?}
     * @private
     */
    ImageLoaderService.prototype.initPromiseResolve;
    /**
     * @type {?}
     * @private
     */
    ImageLoaderService.prototype.initPromise;
    /**
     * @type {?}
     * @private
     */
    ImageLoaderService.prototype.lockSubject;
    /**
     * @type {?}
     * @private
     */
    ImageLoaderService.prototype.lock$;
    /**
     * Number of concurrent requests allowed
     * @type {?}
     * @private
     */
    ImageLoaderService.prototype.concurrency;
    /**
     * Queue items
     * @type {?}
     * @private
     */
    ImageLoaderService.prototype.queue;
    /**
     * @type {?}
     * @private
     */
    ImageLoaderService.prototype.processing;
    /**
     * Fast accessible Object for currently processing items
     * @type {?}
     * @private
     */
    ImageLoaderService.prototype.currentlyProcessing;
    /**
     * @type {?}
     * @private
     */
    ImageLoaderService.prototype.cacheIndex;
    /**
     * @type {?}
     * @private
     */
    ImageLoaderService.prototype.currentCacheSize;
    /**
     * @type {?}
     * @private
     */
    ImageLoaderService.prototype.indexed;
    /**
     * @type {?}
     * @private
     */
    ImageLoaderService.prototype.lockedCallsQueue;
    /**
     * @type {?}
     * @private
     */
    ImageLoaderService.prototype.config;
    /**
     * @type {?}
     * @private
     */
    ImageLoaderService.prototype.file;
    /**
     * @type {?}
     * @private
     */
    ImageLoaderService.prototype.http;
    /**
     * @type {?}
     * @private
     */
    ImageLoaderService.prototype.platform;
    /**
     * @type {?}
     * @private
     */
    ImageLoaderService.prototype.webview;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW1hZ2UtbG9hZGVyLnNlcnZpY2UuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9pb25pYy1pbWFnZS1sb2FkZXIvIiwic291cmNlcyI6WyJsaWIvc2VydmljZXMvaW1hZ2UtbG9hZGVyLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sc0JBQXNCLENBQUM7QUFDbEQsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUMzQyxPQUFPLEVBQUUsSUFBSSxFQUFhLE1BQU0sd0JBQXdCLENBQUM7QUFDekQsT0FBTyxFQUFFLE9BQU8sRUFBRSxNQUFNLGlDQUFpQyxDQUFDO0FBQzFELE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUMxQyxPQUFPLEVBQUUsU0FBUyxFQUFFLE9BQU8sRUFBRSxNQUFNLE1BQU0sQ0FBQztBQUMxQyxPQUFPLEVBQUUsTUFBTSxFQUFFLEtBQUssRUFBRSxJQUFJLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUNyRCxPQUFPLEVBQUUsd0JBQXdCLEVBQUUsTUFBTSwrQkFBK0IsQ0FBQzs7Ozs7Ozs7OztBQUV6RSx3QkFJQzs7O0lBSEMseUJBQWE7O0lBQ2IscUNBQXVCOztJQUN2Qix5QkFBYTs7Ozs7QUFHZix3QkFJQzs7O0lBSEMsNkJBQWlCOztJQUNqQiw0QkFBa0I7O0lBQ2xCLDJCQUFpQjs7O0lBS2IsVUFBVSxHQUFHLENBQUMsS0FBSyxFQUFFLEtBQUssRUFBRSxNQUFNLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRSxNQUFNLENBQUM7QUFFL0Q7SUFxQ0UsNEJBQ1UsTUFBZ0MsRUFDaEMsSUFBVSxFQUNWLElBQWdCLEVBQ2hCLFFBQWtCLEVBQ2xCLE9BQWdCO1FBTDFCLGlCQWdDQztRQS9CUyxXQUFNLEdBQU4sTUFBTSxDQUEwQjtRQUNoQyxTQUFJLEdBQUosSUFBSSxDQUFNO1FBQ1YsU0FBSSxHQUFKLElBQUksQ0FBWTtRQUNo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R0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsK0JBQStCLENBQ2pGLENBQUM7SUFDSixDQUFDOztnQkExdEJGLFVBQVUsU0FBQztvQkFDVixVQUFVLEVBQUUsTUFBTTtpQkFDbkI7Ozs7Z0JBcEJRLHdCQUF3QjtnQkFMeEIsSUFBSTtnQkFGSixVQUFVO2dCQUlWLFFBQVE7Z0JBRFIsT0FBTzs7OzZCQUhoQjtDQW92QkMsQUEzdEJELElBMnRCQztTQXh0Qlksa0JBQWtCOzs7Ozs7OztJQU03QiwwQ0FBNkI7Ozs7Ozs7SUFLN0Isb0NBQXVCOzs7OztJQUN2QixnREFBcUM7Ozs7O0lBQ3JDLHlDQUFzRjs7Ozs7SUFDdEYseUNBQTZDOzs7OztJQUM3QyxtQ0FBZ0Q7Ozs7OztJQUloRCx5Q0FBd0I7Ozs7OztJQUl4QixtQ0FBZ0M7Ozs7O0lBQ2hDLHdDQUF1Qjs7Ozs7O0lBSXZCLGlEQUFvRTs7Ozs7SUFDcEUsd0NBQXFDOzs7OztJQUNyQyw4Q0FBNkI7Ozs7O0lBQzdCLHFDQUF3Qjs7Ozs7SUFDeEIsOENBQTBDOzs7OztJQUd4QyxvQ0FBd0M7Ozs7O0lBQ3hDLGtDQUFrQjs7Ozs7SUFDbEIsa0NBQXdCOzs7OztJQUN4QixzQ0FBMEI7Ozs7O0lBQzFCLHFDQUF3QiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEh0dHBDbGllbnQgfSBmcm9tICdAYW5ndWxhci9jb21tb24vaHR0cCc7XG5pbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBGaWxlLCBGaWxlRW50cnkgfSBmcm9tICdAaW9uaWMtbmF0aXZlL2ZpbGUvbmd4JztcbmltcG9ydCB7IFdlYlZpZXcgfSBmcm9tICdAaW9uaWMtbmF0aXZlL2lvbmljLXdlYnZpZXcvbmd4JztcbmltcG9ydCB7IFBsYXRmb3JtIH0gZnJvbSAnQGlvbmljL2FuZ3VsYXInO1xuaW1wb3J0IHsgZnJvbUV2ZW50LCBTdWJqZWN0IH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBmaWx0ZXIsIGZpcnN0LCB0YWtlIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuaW1wb3J0IHsgSW1hZ2VMb2FkZXJDb25maWdTZXJ2aWNlIH0gZnJvbSAnLi9pbWFnZS1sb2FkZXItY29uZmlnLnNlcnZpY2UnO1xuXG5pbnRlcmZhY2UgSW5kZXhJdGVtIHtcbiAgbmFtZTogc3RyaW5nO1xuICBtb2RpZmljYXRpb25UaW1lOiBEYXRlO1xuICBzaXplOiBudW1iZXI7XG59XG5cbmludGVyZmFjZSBRdWV1ZUl0ZW0ge1xuICBpbWFnZVVybDogc3RyaW5nO1xuICByZXNvbHZlOiBGdW5jdGlvbjtcbiAgcmVqZWN0OiBGdW5jdGlvbjtcbn1cblxuZGVjbGFyZSBjb25zdCBJb25pYzogYW55O1xuXG5jb25zdCBFWFRFTlNJT05TID0gWydqcGcnLCAncG5nJywgJ2pwZWcnLCAnZ2lmJywgJ3N2ZycsICd0aWZmJ107XG5cbkBJbmplY3RhYmxlKHtcbiAgcHJvdmlkZWRJbjogJ3Jvb3QnLFxufSlcbmV4cG9ydCBjbGFzcyBJbWFnZUxvYWRlclNlcnZpY2Uge1xuXG4gIC8qKlxuICAgKiBJbmRpY2F0ZXMgaWYgdGhlIGNhY2hlIHNlcnZpY2UgaXMgcmVhZHkuXG4gICAqIFdoZW4gdGhlIGNhY2hlIHNlcnZpY2UgaXNuJ3QgcmVhZHksIGltYWdlcyBhcmUgbG9hZGVkIHZpYSBicm93c2VyIGluc3RlYWQuXG4gICAqL1xuICBwcml2YXRlIGlzQ2FjaGVSZWFkeSA9IGZhbHNlO1xuICAvKipcbiAgICogSW5kaWNhdGVzIGlmIHRoaXMgc2VydmljZSBpcyBpbml0aWFsaXplZC5cbiAgICogVGhpcyBzZXJ2aWNlIGlzIGluaXRpYWxpemVkIG9uY2UgYWxsIHRoZSBzZXR1cCBpcyBkb25lLlxuICAgKi9cbiAgcHJpdmF0ZSBpc0luaXQgPSBmYWxzZTtcbiAgcHJpdmF0ZSBpbml0UHJvbWlzZVJlc29sdmU6IEZ1bmN0aW9uO1xuICBwcml2YXRlIGluaXRQcm9taXNlID0gbmV3IFByb21pc2U8dm9pZD4ocmVzb2x2ZSA9PiB0aGlzLmluaXRQcm9taXNlUmVzb2x2ZSA9IHJlc29sdmUpO1xuICBwcml2YXRlIGxvY2tTdWJqZWN0ID0gbmV3IFN1YmplY3Q8Ym9vbGVhbj4oKTtcbiAgcHJpdmF0ZSBsb2NrJCA9IHRoaXMubG9ja1N1YmplY3QuYXNPYnNlcnZhYmxlKCk7XG4gIC8qKlxuICAgKiBOdW1iZXIgb2YgY29uY3VycmVudCByZXF1ZXN0cyBhbGxvd2VkXG4gICAqL1xuICBwcml2YXRlIGNvbmN1cnJlbmN5ID0gNTtcbiAgLyoqXG4gICAqIFF1ZXVlIGl0ZW1zXG4gICAqL1xuICBwcml2YXRlIHF1ZXVlOiBRdWV1ZUl0ZW1bXSA9IFtdO1xuICBwcml2YXRlIHByb2Nlc3NpbmcgPSAwO1xuICAvKipcbiAgICogRmFzdCBhY2Nlc3NpYmxlIE9iamVjdCBmb3IgY3VycmVudGx5IHByb2Nlc3NpbmcgaXRlbXNcbiAgICovXG4gIHByaXZhdGUgY3VycmVudGx5UHJvY2Vzc2luZzogeyBbaW5kZXg6IHN0cmluZ106IFByb21pc2U8YW55PiB9ID0ge307XG4gIHByaXZhdGUgY2FjaGVJbmRleDogSW5kZXhJdGVtW10gPSBbXTtcbiAgcHJpdmF0ZSBjdXJyZW50Q2FjaGVTaXplID0gMDtcbiAgcHJpdmF0ZSBpbmRleGVkID0gZmFsc2U7XG4gIHByaXZhdGUgbG9ja2VkQ2FsbHNRdWV1ZTogRnVuY3Rpb25bXSA9IFtdO1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgIHByaXZhdGUgY29uZmlnOiBJbWFnZUxvYWRlckNvbmZpZ1NlcnZpY2UsXG4gICAgcHJpdmF0ZSBmaWxlOiBGaWxlLFxuICAgIHByaXZhdGUgaHR0cDogSHR0cENsaWVudCxcbiAgICBwcml2YXRlIHBsYXRmb3JtOiBQbGF0Zm9ybSxcbiAgICBwcml2YXRlIHdlYnZpZXc6IFdlYlZpZXcsXG4gICkge1xuICAgIGlmICghcGxhdGZvcm0uaXMoJ2NvcmRvdmEnKSkge1xuICAgICAgLy8gd2UgYXJlIHJ1bm5pbmcgb24gYSBicm93c2VyLCBvciB1c2luZyBsaXZlcmVsb2FkXG4gICAgICAvLyBwbHVnaW4gd2lsbCBub3QgZnVuY3Rpb24gaW4gdGhpcyBjYXNlXG4gICAgICB0aGlzLmlzSW5pdCA9IHRydWU7XG4gICAgICB0aGlzLnRocm93V2FybmluZyhcbiAgICAgICAgJ1lvdSBhcmUgcnVubmluZyBvbiBhIGJyb3dzZXIgb3IgdXNpbmcgbGl2ZXJlbG9hZCwgSW9uaWNJbWFnZUxvYWRlciB3aWxsIG5vdCBmdW5jdGlvbiwgZmFsbGluZyBiYWNrIHRvIGJyb3dzZXIgbG9hZGluZy4nLFxuICAgICAgKTtcbiAgICAgIHRoaXMuaW5pdFByb21pc2VSZXNvbHZlKCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGZyb21FdmVudChkb2N1bWVudCwgJ2RldmljZXJlYWR5JylcbiAgICAgICAgLnBpcGUoZmlyc3QoKSlcbiAgICAgICAgLnN1YnNjcmliZShyZXMgPT4ge1xuICAgICAgICAgIGlmICh0aGlzLm5hdGl2ZUF2YWlsYWJsZSkge1xuICAgICAgICAgICAgdGhpcy5pbml0Q2FjaGUoKTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgLy8gd2UgYXJlIHJ1bm5pbmcgb24gYSBicm93c2VyLCBvciB1c2luZyBsaXZlcmVsb2FkXG4gICAgICAgICAgICAvLyBwbHVnaW4gd2lsbCBub3QgZnVuY3Rpb24gaW4gdGhpcyBjYXNlXG4gICAgICAgICAgICB0aGlzLmlzSW5pdCA9IHRydWU7XG4gICAgICAgICAgICB0aGlzLmluaXRQcm9taXNlUmVzb2x2ZSgpO1xuICAgICAgICAgICAgdGhpcy50aHJvd1dhcm5pbmcoXG4gICAgICAgICAgICAgICdZb3UgYXJlIHJ1bm5pbmcgb24gYSBicm93c2VyIG9yIHVzaW5nIGxpdmVyZWxvYWQsIElvbmljSW1hZ2VMb2FkZXIgd2lsbCBub3QgZnVuY3Rpb24sIGZhbGxpbmcgYmFjayB0byBicm93c2VyIGxvYWRpbmcuJyxcbiAgICAgICAgICAgICk7XG4gICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9XG4gIH1cblxuICBnZXQgbmF0aXZlQXZhaWxhYmxlKCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiBGaWxlLmluc3RhbGxlZCgpO1xuICB9XG5cbiAgcHJpdmF0ZSBnZXQgaXNDYWNoZVNwYWNlRXhjZWVkZWQoKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIChcbiAgICAgIHRoaXMuY29uZmlnLm1heENhY2hlU2l6ZSA+IC0xICYmXG4gICAgICB0aGlzLmN1cnJlbnRDYWNoZVNpemUgPiB0aGlzLmNvbmZpZy5tYXhDYWNoZVNpemVcbiAgICApO1xuICB9XG5cbiAgcHJpdmF0ZSBnZXQgaXNXS1dlYlZpZXcoKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIChcbiAgICAgIHRoaXMucGxhdGZvcm0uaXMoJ2lvcycpICYmXG4gICAgICAoPGFueT53aW5kb3cpLndlYmtpdCAmJlxuICAgICAgKDxhbnk+d2luZG93KS53ZWJraXQubWVzc2FnZUhhbmRsZXJzXG4gICAgKTtcbiAgfVxuXG4gIHByaXZhdGUgZ2V0IGlzSW9uaWNXS1dlYlZpZXcoKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIChcbiAgICAgIC8vICBJbXBvcnRhbnQ6IGlzV0tXZWJ2aWV3ICYmIGlzSW9uaWNXS1dlYnZpZXcgbXVzdCBiZSBtdXR1YWxseSBleGNsdXNlLlxuICAgICAgLy8gIE90aGVyd2lzZSB0aGUgbG9naWMgZm9yIGNvcHlpbmcgdG8gdG1wIHVuZGVyIElPUyB3aWxsIGZhaWwuXG4gICAgICAodGhpcy5wbGF0Zm9ybS5pcygnYW5kcm9pZCcpICYmIHRoaXMud2VidmlldykgfHxcbiAgICAgICh0aGlzLnBsYXRmb3JtLmlzKCdhbmRyb2lkJykpICYmIChsb2NhdGlvbi5ob3N0ID09PSAnbG9jYWxob3N0OjgwODAnKSB8fFxuICAgICAgKDxhbnk+d2luZG93KS5MaXZlUmVsb2FkKTtcbiAgfVxuXG4gIHByaXZhdGUgZ2V0IGlzRGV2U2VydmVyKCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB3aW5kb3dbJ0lvbmljRGV2U2VydmVyJ10gIT09IHVuZGVmaW5lZDtcbiAgfVxuXG4gIC8qKlxuICAgKiBDaGVjayBpZiB3ZSBjYW4gcHJvY2VzcyBtb3JlIGl0ZW1zIGluIHRoZSBxdWV1ZVxuICAgKi9cbiAgcHJpdmF0ZSBnZXQgY2FuUHJvY2VzcygpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy5xdWV1ZS5sZW5ndGggPiAwICYmIHRoaXMucHJvY2Vzc2luZyA8IHRoaXMuY29uY3VycmVuY3k7XG4gIH1cblxuICByZWFkeSgpOiBQcm9taXNlPHZvaWQ+IHtcbiAgICByZXR1cm4gdGhpcy5pbml0UHJvbWlzZTtcbiAgfVxuXG4gIC8qKlxuICAgKiBQcmVsb2FkIGFuIGltYWdlXG4gICAqIEBwYXJhbSBpbWFnZVVybCBJbWFnZSBVUkxcbiAgICogQHJldHVybnMgcmV0dXJucyBhIHByb21pc2UgdGhhdCByZXNvbHZlcyB3aXRoIHRoZSBjYWNoZWQgaW1hZ2UgVVJMXG4gICAqL1xuICBwcmVsb2FkKGltYWdlVXJsOiBzdHJpbmcpOiBQcm9taXNlPHN0cmluZz4ge1xuICAgIHJldHVybiB0aGlzLmdldEltYWdlUGF0aChpbWFnZVVybCk7XG4gIH1cblxuICBnZXRGaWxlQ2FjaGVEaXJlY3RvcnkoKSB7XG4gICAgaWYgKHRoaXMuY29uZmlnLmNhY2hlRGlyZWN0b3J5VHlwZSA9PT0gJ2RhdGEnKSB7XG4gICAgICByZXR1cm4gdGhpcy5maWxlLmRhdGFEaXJlY3Rvcnk7XG4gICAgfSBlbHNlIGlmICh0aGlzLmNvbmZpZy5jYWNoZURpcmVjdG9yeVR5cGUgPT09ICdleHRlcm5hbCcpIHtcbiAgICAgIHJldHVybiB0aGlzLnBsYXRmb3JtLmlzKCdhbmRyb2lkJykgPyB0aGlzLmZpbGUuZXh0ZXJuYWxEYXRhRGlyZWN0b3J5IDogdGhpcy5maWxlLmRvY3VtZW50c0RpcmVjdG9yeTtcbiAgICB9XG4gICAgcmV0dXJuIHRoaXMuZmlsZS5jYWNoZURpcmVjdG9yeTtcbiAgfVxuXG4gIC8qKlxuICAgKiBDbGVhcnMgY2FjaGUgb2YgYSBzaW5nbGUgaW1hZ2VcbiAgICogQHBhcmFtIGltYWdlVXJsIEltYWdlIFVSTFxuICAgKi9cbiAgYXN5bmMgY2xlYXJJbWFnZUNhY2hlKGltYWdlVXJsOiBzdHJpbmcpIHtcbiAgICBpZiAoIXRoaXMucGxhdGZvcm0uaXMoJ2NvcmRvdmEnKSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGF3YWl0IHRoaXMucmVhZHkoKTtcblxuICAgIHRoaXMucnVuTG9ja2VkKGFzeW5jICgpID0+IHtcbiAgICAgIGNvbnN0IGZpbGVOYW1lID0gdGhpcy5jcmVhdGVGaWxlTmFtZShpbWFnZVVybCk7XG4gICAgICBjb25zdCByb3V0ZSA9IHRoaXMuZ2V0RmlsZUNhY2hlRGlyZWN0b3J5KCkgKyB0aGlzLmNvbmZpZy5jYWNoZURpcmVjdG9yeU5hbWU7XG4gICAgICAvLyBwYXVzZSBhbnkgb3BlcmF0aW9uc1xuICAgICAgdGhpcy5pc0luaXQgPSBmYWxzZTtcblxuICAgICAgdHJ5IHtcbiAgICAgICAgYXdhaXQgdGhpcy5maWxlLnJlbW92ZUZpbGUocm91dGUsIGZpbGVOYW1lKTtcblxuICAgICAgICBpZiAodGhpcy5pc1dLV2ViVmlldyAmJiAhdGhpcy5pc0lvbmljV0tXZWJWaWV3KSB7XG4gICAgICAgICAgYXdhaXQgdGhpcy5maWxlLnJlbW92ZUZpbGUodGhpcy5maWxlLnRlbXBEaXJlY3RvcnkgKyB0aGlzLmNvbmZpZy5jYWNoZURpcmVjdG9yeU5hbWUsIGZpbGVOYW1lKTtcbiAgICAgICAgfVxuICAgICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICAgIHRoaXMudGhyb3dFcnJvcihlcnIpO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gdGhpcy5pbml0Q2FjaGUodHJ1ZSk7XG4gICAgfSk7XG4gIH1cblxuICAvKipcbiAgICogQ2xlYXJzIHRoZSBjYWNoZVxuICAgKi9cbiAgYXN5bmMgY2xlYXJDYWNoZSgpIHtcbiAgICBpZiAoIXRoaXMucGxhdGZvcm0uaXMoJ2NvcmRvdmEnKSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGF3YWl0IHRoaXMucmVhZHkoKTtcblxuICAgIHRoaXMucnVuTG9ja2VkKGFzeW5jICgpID0+IHtcbiAgICAgIHRyeSB7XG4gICAgICAgIGF3YWl0IHRoaXMuZmlsZS5yZW1vdmVSZWN1cnNpdmVseSh0aGlzLmdldEZpbGVDYWNoZURpcmVjdG9yeSgpLCB0aGlzLmNvbmZpZy5jYWNoZURpcmVjdG9yeU5hbWUpO1xuXG4gICAgICAgIGlmICh0aGlzLmlzV0tXZWJWaWV3ICYmICF0aGlzLmlzSW9uaWNXS1dlYlZpZXcpIHtcbiAgICAgICAgICAvLyBhbHNvIGNsZWFyIHRoZSB0ZW1wIGZpbGVzXG4gICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIHRoaXMuZmlsZS5yZW1vdmVSZWN1cnNpdmVseSh0aGlzLmZpbGUudGVtcERpcmVjdG9yeSwgdGhpcy5jb25maWcuY2FjaGVEaXJlY3RvcnlOYW1lKTtcbiAgICAgICAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgICAgICAgIC8vIE5vb3AgY2F0Y2guIFJlbW92aW5nIHRoZSB0ZW1wRGlyZWN0b3J5IG1pZ2h0IGZhaWwsXG4gICAgICAgICAgICAvLyBhcyBpdCBpcyBub3QgcGVyc2lzdGVudC5cbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgICB0aGlzLnRocm93RXJyb3IoZXJyKTtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIHRoaXMuaW5pdENhY2hlKHRydWUpO1xuICAgIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIEdldHMgdGhlIGZpbGVzeXN0ZW0gcGF0aCBvZiBhbiBpbWFnZS5cbiAgICogVGhpcyB3aWxsIHJldHVybiB0aGUgcmVtb3RlIHBhdGggaWYgYW55dGhpbmcgZ29lcyB3cm9uZyBvciBpZiB0aGUgY2FjaGUgc2VydmljZSBpc24ndCByZWFkeSB5ZXQuXG4gICAqIEBwYXJhbSBpbWFnZVVybCBUaGUgcmVtb3RlIFVSTCBvZiB0aGUgaW1hZ2VcbiAgICogQHJldHVybnMgUmV0dXJucyBhIHByb21pc2UgdGhhdCB3aWxsIGFsd2F5cyByZXNvbHZlIHdpdGggYW4gaW1hZ2UgVVJMXG4gICAqL1xuICBhc3luYyBnZXRJbWFnZVBhdGgoaW1hZ2VVcmw6IHN0cmluZyk6IFByb21pc2U8c3RyaW5nPiB7XG4gICAgaWYgKHR5cGVvZiBpbWFnZVVybCAhPT0gJ3N0cmluZycgfHwgaW1hZ2VVcmwubGVuZ3RoIDw9IDApIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignVGhlIGltYWdlIHVybCBwcm92aWRlZCB3YXMgZW1wdHkgb3IgaW52YWxpZC4nKTtcbiAgICB9XG5cbiAgICBhd2FpdCB0aGlzLnJlYWR5KCk7XG5cbiAgICBpZiAoIXRoaXMuaXNDYWNoZVJlYWR5KSB7XG4gICAgICB0aGlzLnRocm93V2FybmluZygnVGhlIGNhY2hlIHN5c3RlbSBpcyBub3QgcnVubmluZy4gSW1hZ2VzIHdpbGwgYmUgbG9hZGVkIGJ5IHlvdXIgYnJvd3NlciBpbnN0ZWFkLicpO1xuICAgICAgcmV0dXJuIGltYWdlVXJsO1xuICAgIH1cblxuICAgIGlmICh0aGlzLmlzSW1hZ2VVcmxSZWxhdGl2ZShpbWFnZVVybCkpIHtcbiAgICAgIHJldHVybiBpbWFnZVVybDtcbiAgICB9XG5cbiAgICB0cnkge1xuICAgICAgcmV0dXJuIGF3YWl0IHRoaXMuZ2V0Q2FjaGVkSW1hZ2VQYXRoKGltYWdlVXJsKTtcbiAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgIC8vIGltYWdlIGRvZXNuJ3QgZXhpc3QgaW4gY2FjaGUsIGxldHMgZmV0Y2ggaXQgYW5kIHNhdmUgaXRcbiAgICAgIHJldHVybiB0aGlzLmFkZEl0ZW1Ub1F1ZXVlKGltYWdlVXJsKTtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIGFzeW5jIHByb2Nlc3NMb2NrZWRRdWV1ZSgpIHtcbiAgICBpZiAoYXdhaXQgdGhpcy5nZXRMb2NrZWRTdGF0ZSgpKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgaWYgKHRoaXMubG9ja2VkQ2FsbHNRdWV1ZS5sZW5ndGggPiAwKSB7XG4gICAgICBhd2FpdCB0aGlzLnNldExvY2tlZFN0YXRlKHRydWUpO1xuXG4gICAgICB0cnkge1xuICAgICAgICBhd2FpdCB0aGlzLmxvY2tlZENhbGxzUXVldWUuc2xpY2UoMCwgMSlbMF0oKTtcbiAgICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgICBjb25zb2xlLmxvZygnRXJyb3IgcnVubmluZyBsb2NrZWQgZnVuY3Rpb246ICcsIGVycik7XG4gICAgICB9XG5cbiAgICAgIGF3YWl0IHRoaXMuc2V0TG9ja2VkU3RhdGUoZmFsc2UpO1xuICAgICAgcmV0dXJuIHRoaXMucHJvY2Vzc0xvY2tlZFF1ZXVlKCk7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBnZXRMb2NrZWRTdGF0ZSgpOiBQcm9taXNlPGJvb2xlYW4+IHtcbiAgICByZXR1cm4gdGhpcy5sb2NrJFxuICAgICAgLnBpcGUodGFrZSgxKSlcbiAgICAgIC50b1Byb21pc2UoKTtcbiAgfVxuXG4gIHByaXZhdGUgYXdhaXRVbmxvY2tlZCgpOiBQcm9taXNlPGJvb2xlYW4+IHtcbiAgICByZXR1cm4gdGhpcy5sb2NrJFxuICAgICAgLnBpcGUoXG4gICAgICAgIGZpbHRlcihsb2NrZWQgPT4gISFsb2NrZWQpLFxuICAgICAgICB0YWtlKDEpLFxuICAgICAgKVxuICAgICAgLnRvUHJvbWlzZSgpO1xuICB9XG5cbiAgcHJpdmF0ZSBhc3luYyBzZXRMb2NrZWRTdGF0ZShsb2NrZWQ6IGJvb2xlYW4pIHtcbiAgICB0aGlzLmxvY2tTdWJqZWN0Lm5leHQobG9ja2VkKTtcbiAgfVxuXG4gIHByaXZhdGUgcnVuTG9ja2VkKGZuOiBGdW5jdGlvbikge1xuICAgIHRoaXMubG9ja2VkQ2FsbHNRdWV1ZS5wdXNoKGZuKTtcbiAgICB0aGlzLnByb2Nlc3NMb2NrZWRRdWV1ZSgpO1xuICB9XG5cbiAgLyoqXG4gICAqIFJldHVybnMgaWYgYW4gaW1hZ2VVcmwgaXMgYW4gcmVsYXRpdmUgcGF0aFxuICAgKiBAcGFyYW0gaW1hZ2VVcmxcbiAgICovXG4gIHByaXZhdGUgaXNJbWFnZVVybFJlbGF0aXZlKGltYWdlVXJsOiBzdHJpbmcpIHtcbiAgICByZXR1cm4gIS9eKGh0dHBzP3xmaWxlKTpcXC9cXC9cXC8/L2kudGVzdChpbWFnZVVybCk7XG4gIH1cblxuICAvKipcbiAgICogQWRkIGFuIGl0ZW0gdG8gdGhlIHF1ZXVlXG4gICAqIEBwYXJhbSBpbWFnZVVybFxuICAgKiBAcGFyYW0gcmVzb2x2ZVxuICAgKiBAcGFyYW0gcmVqZWN0XG4gICAqL1xuICBwcml2YXRlIGFkZEl0ZW1Ub1F1ZXVlKGltYWdlVXJsOiBzdHJpbmcsIHJlc29sdmU/LCByZWplY3Q/KTogdm9pZCB8IFByb21pc2U8YW55PiB7XG4gICAgbGV0IHA6IHZvaWQgfCBQcm9taXNlPGFueT47XG5cbiAgICBpZiAoIXJlc29sdmUgJiYgIXJlamVjdCkge1xuICAgICAgcCA9IG5ldyBQcm9taXNlPGFueT4oKHJlcywgcmVqKSA9PiB7XG4gICAgICAgIHJlc29sdmUgPSByZXM7XG4gICAgICAgIHJlamVjdCA9IHJlajtcbiAgICAgIH0pO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXNvbHZlID0gcmVzb2x2ZSB8fCAoKCkgPT4ge1xuICAgICAgfSk7XG4gICAgICByZWplY3QgPSByZWplY3QgfHwgKCgpID0+IHtcbiAgICAgIH0pO1xuICAgIH1cblxuICAgIHRoaXMucXVldWUucHVzaCh7XG4gICAgICBpbWFnZVVybCxcbiAgICAgIHJlc29sdmUsXG4gICAgICByZWplY3QsXG4gICAgfSk7XG5cbiAgICB0aGlzLnByb2Nlc3NRdWV1ZSgpO1xuXG4gICAgcmV0dXJuIHA7XG4gIH1cblxuICAvKipcbiAgICogUHJvY2Vzc2VzIG9uZSBpdGVtIGZyb20gdGhlIHF1ZXVlXG4gICAqL1xuICBwcml2YXRlIGFzeW5jIHByb2Nlc3NRdWV1ZSgpIHtcbiAgICAvLyBtYWtlIHN1cmUgd2UgY2FuIHByb2Nlc3MgaXRlbXMgZmlyc3RcbiAgICBpZiAoIXRoaXMuY2FuUHJvY2Vzcykge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIC8vIGluY3JlYXNlIHRoZSBwcm9jZXNzaW5nIG51bWJlclxuICAgIHRoaXMucHJvY2Vzc2luZysrO1xuXG4gICAgLy8gdGFrZSB0aGUgZmlyc3QgaXRlbSBmcm9tIHF1ZXVlXG4gICAgY29uc3QgY3VycmVudEl0ZW06IFF1ZXVlSXRlbSA9IHRoaXMucXVldWUuc3BsaWNlKDAsIDEpWzBdO1xuXG4gICAgLy8gZnVuY3Rpb24gdG8gY2FsbCB3aGVuIGRvbmUgcHJvY2Vzc2luZyB0aGlzIGl0ZW1cbiAgICAvLyB0aGlzIHdpbGwgcmVkdWNlIHRoZSBwcm9jZXNzaW5nIG51bWJlclxuICAgIC8vIHRoZW4gd2lsbCBleGVjdXRlIHRoaXMgZnVuY3Rpb24gYWdhaW4gdG8gcHJvY2VzcyBhbnkgcmVtYWluaW5nIGl0ZW1zXG4gICAgY29uc3QgZG9uZSA9ICgpID0+IHtcbiAgICAgIHRoaXMucHJvY2Vzc2luZy0tO1xuICAgICAgdGhpcy5wcm9jZXNzUXVldWUoKTtcblxuICAgICAgLy8gb25seSBkZWxldGUgaWYgaXQncyB0aGUgbGFzdC91bmlxdWUgb2NjdXJyZW5jZSBpbiB0aGUgcXVldWVcbiAgICAgIGlmICh0aGlzLmN1cnJlbnRseVByb2Nlc3NpbmdbY3VycmVudEl0ZW0uaW1hZ2VVcmxdICE9PSB1bmRlZmluZWQgJiYgIXRoaXMuY3VycmVudGx5SW5RdWV1ZShjdXJyZW50SXRlbS5pbWFnZVVybCkpIHtcbiAgICAgICAgZGVsZXRlIHRoaXMuY3VycmVudGx5UHJvY2Vzc2luZ1tjdXJyZW50SXRlbS5pbWFnZVVybF07XG4gICAgICB9XG4gICAgfTtcblxuICAgIGNvbnN0IGVycm9yID0gKGUpID0+IHtcbiAgICAgIGN1cnJlbnRJdGVtLnJlamVjdCgpO1xuICAgICAgdGhpcy50aHJvd0Vycm9yKGUpO1xuICAgICAgZG9uZSgpO1xuICAgIH07XG5cbiAgICBpZiAodGhpcy5jdXJyZW50bHlQcm9jZXNzaW5nW2N1cnJlbnRJdGVtLmltYWdlVXJsXSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICB0cnkge1xuICAgICAgICAvLyBQcmV2ZW50ZWQgc2FtZSBJbWFnZSBmcm9tIGxvYWRpbmcgYXQgdGhlIHNhbWUgdGltZVxuICAgICAgICBhd2FpdCB0aGlzLmN1cnJlbnRseVByb2Nlc3NpbmdbY3VycmVudEl0ZW0uaW1hZ2VVcmxdO1xuICAgICAgICBjb25zdCBsb2NhbFVybCA9IGF3YWl0IHRoaXMuZ2V0Q2FjaGVkSW1hZ2VQYXRoKGN1cnJlbnRJdGVtLmltYWdlVXJsKTtcbiAgICAgICAgY3VycmVudEl0ZW0ucmVzb2x2ZShsb2NhbFVybCk7XG4gICAgICAgIGRvbmUoKTtcbiAgICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgICBlcnJvcihlcnIpO1xuICAgICAgfVxuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIHRoaXMuY3VycmVudGx5UHJvY2Vzc2luZ1tjdXJyZW50SXRlbS5pbWFnZVVybF0gPSAoYXN5bmMgKCkgPT4ge1xuICAgICAgLy8gcHJvY2VzcyBtb3JlIGl0ZW1zIGNvbmN1cnJlbnRseSBpZiB3ZSBjYW5cbiAgICAgIGlmICh0aGlzLmNhblByb2Nlc3MpIHtcbiAgICAgICAgdGhpcy5wcm9jZXNzUXVldWUoKTtcbiAgICAgIH1cblxuICAgICAgY29uc3QgbG9jYWxEaXIgPSB0aGlzLmdldEZpbGVDYWNoZURpcmVjdG9yeSgpICsgdGhpcy5jb25maWcuY2FjaGVEaXJlY3RvcnlOYW1lICsgJy8nO1xuICAgICAgY29uc3QgZmlsZU5hbWUgPSB0aGlzLmNyZWF0ZUZpbGVOYW1lKGN1cnJlbnRJdGVtLmltYWdlVXJsKTtcblxuICAgICAgdHJ5IHtcbiAgICAgICAgY29uc3QgZGF0YTogQmxvYiA9IGF3YWl0IHRoaXMuaHR0cC5nZXQoY3VycmVudEl0ZW0uaW1hZ2VVcmwsIHtcbiAgICAgICAgICByZXNwb25zZVR5cGU6ICdibG9iJyxcbiAgICAgICAgICBoZWFkZXJzOiB0aGlzLmNvbmZpZy5odHRwSGVhZGVycyxcbiAgICAgICAgfSkudG9Qcm9taXNlKCk7XG5cbiAgICAgICAgY29uc3QgZmlsZSA9IGF3YWl0IHRoaXMuZmlsZS53cml0ZUZpbGUobG9jYWxEaXIsIGZpbGVOYW1lLCBkYXRhLCB7cmVwbGFjZTogdHJ1ZX0pIGFzIEZpbGVFbnRyeTtcblxuICAgICAgICBpZiAodGhpcy5pc0NhY2hlU3BhY2VFeGNlZWRlZCkge1xuICAgICAgICAgIHRoaXMubWFpbnRhaW5DYWNoZVNpemUoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGF3YWl0IHRoaXMuYWRkRmlsZVRvSW5kZXgoZmlsZSk7XG4gICAgICAgIGNvbnN0IGxvY2FsVXJsID0gYXdhaXQgdGhpcy5nZXRDYWNoZWRJbWFnZVBhdGgoY3VycmVudEl0ZW0uaW1hZ2VVcmwpO1xuICAgICAgICBjdXJyZW50SXRlbS5yZXNvbHZlKGxvY2FsVXJsKTtcbiAgICAgICAgZG9uZSgpO1xuICAgICAgICB0aGlzLm1haW50YWluQ2FjaGVTaXplKCk7XG4gICAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgICAgZXJyb3IoZXJyKTtcbiAgICAgICAgdGhyb3cgZXJyO1xuICAgICAgfVxuICAgIH0pKCk7XG5cbiAgfVxuXG4gIC8qKlxuICAgKiBTZWFyY2ggaWYgdGhlIHVybCBpcyBjdXJyZW50bHkgaW4gdGhlIHF1ZXVlXG4gICAqIEBwYXJhbSBpbWFnZVVybCBJbWFnZSB1cmwgdG8gc2VhcmNoXG4gICAqL1xuICBwcml2YXRlIGN1cnJlbnRseUluUXVldWUoaW1hZ2VVcmw6IHN0cmluZykge1xuICAgIHJldHVybiB0aGlzLnF1ZXVlLnNvbWUoaXRlbSA9PiBpdGVtLmltYWdlVXJsID09PSBpbWFnZVVybCk7XG4gIH1cblxuICAvKipcbiAgICogSW5pdGlhbGl6ZSB0aGUgY2FjaGUgc2VydmljZVxuICAgKiBAcGFyYW0gW3JlcGxhY2VdIFdoZXRoZXIgdG8gcmVwbGFjZSB0aGUgY2FjaGUgZGlyZWN0b3J5IGlmIGl0IGFscmVhZHkgZXhpc3RzXG4gICAqL1xuICBwcml2YXRlIGFzeW5jIGluaXRDYWNoZShyZXBsYWNlPzogYm9vbGVhbikge1xuICAgIHRoaXMuY29uY3VycmVuY3kgPSB0aGlzLmNvbmZpZy5jb25jdXJyZW5jeTtcblxuICAgIC8vIGNyZWF0ZSBjYWNoZSBkaXJlY3RvcmllcyBpZiB0aGV5IGRvIG5vdCBleGlzdFxuICAgIHRyeSB7XG4gICAgICBhd2FpdCB0aGlzLmNyZWF0ZUNhY2hlRGlyZWN0b3J5KHJlcGxhY2UpO1xuICAgICAgYXdhaXQgdGhpcy5pbmRleENhY2hlKCk7XG4gICAgICB0aGlzLmlzQ2FjaGVSZWFkeSA9IHRydWU7XG4gICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICB0aGlzLnRocm93RXJyb3IoZXJyKTtcbiAgICB9XG5cbiAgICB0aGlzLmlzSW5pdCA9IHRydWU7XG4gICAgdGhpcy5pbml0UHJvbWlzZVJlc29sdmUoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBBZGRzIGEgZmlsZSB0byBpbmRleC5cbiAgICogQWxzbyBkZWxldGVzIGFueSBmaWxlcyBpZiB0aGV5IGFyZSBvbGRlciB0aGFuIHRoZSBzZXQgbWF4aW11bSBjYWNoZSBhZ2UuXG4gICAqIEBwYXJhbSBmaWxlIEZpbGVFbnRyeSB0byBpbmRleFxuICAgKi9cbiAgcHJpdmF0ZSBhc3luYyBhZGRGaWxlVG9JbmRleChmaWxlOiBGaWxlRW50cnkpOiBQcm9taXNlPGFueT4ge1xuICAgIGNvbnN0IG1ldGFkYXRhID0gYXdhaXQgbmV3IFByb21pc2U8YW55PigocmVzb2x2ZSwgcmVqZWN0KSA9PiBmaWxlLmdldE1ldGFkYXRhKHJlc29sdmUsIHJlamVjdCkpO1xuXG4gICAgaWYgKFxuICAgICAgdGhpcy5jb25maWcubWF4Q2FjaGVBZ2UgPiAtMSAmJlxuICAgICAgRGF0ZS5ub3coKSAtIG1ldGFkYXRhLm1vZGlmaWNhdGlvblRpbWUuZ2V0VGltZSgpID5cbiAgICAgIHRoaXMuY29uZmlnLm1heENhY2hlQWdlXG4gICAgKSB7XG4gICAgICAvLyBmaWxlIGFnZSBleGNlZWRzIG1heGltdW0gY2FjaGUgYWdlXG4gICAgICByZXR1cm4gdGhpcy5yZW1vdmVGaWxlKGZpbGUubmFtZSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIC8vIGZpbGUgYWdlIGRvZXNuJ3QgZXhjZWVkIG1heGltdW0gY2FjaGUgYWdlLCBvciBtYXhpbXVtIGNhY2hlIGFnZSBpc24ndCBzZXRcbiAgICAgIHRoaXMuY3VycmVudENhY2hlU2l6ZSArPSBtZXRhZGF0YS5zaXplO1xuXG4gICAgICAvLyBhZGQgaXRlbSB0byBpbmRleFxuICAgICAgdGhpcy5jYWNoZUluZGV4LnB1c2goe1xuICAgICAgICBuYW1lOiBmaWxlLm5hbWUsXG4gICAgICAgIG1vZGlmaWNhdGlvblRpbWU6IG1ldGFkYXRhLm1vZGlmaWNhdGlvblRpbWUsXG4gICAgICAgIHNpemU6IG1ldGFkYXRhLnNpemUsXG4gICAgICB9KTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogSW5kZXhlcyB0aGUgY2FjaGUgaWYgbmVjZXNzYXJ5XG4gICAqL1xuICBwcml2YXRlIGFzeW5jIGluZGV4Q2FjaGUoKTogUHJvbWlzZTx2b2lkPiB7XG4gICAgdGhpcy5jYWNoZUluZGV4ID0gW107XG5cbiAgICB0cnkge1xuICAgICAgY29uc3QgZmlsZXMgPSBhd2FpdCB0aGlzLmZpbGUubGlzdERpcih0aGlzLmdldEZpbGVDYWNoZURpcmVjdG9yeSgpLCB0aGlzLmNvbmZpZy5jYWNoZURpcmVjdG9yeU5hbWUpO1xuICAgICAgYXdhaXQgUHJvbWlzZS5hbGwoZmlsZXMubWFwKHRoaXMuYWRkRmlsZVRvSW5kZXguYmluZCh0aGlzKSkpO1xuICAgICAgLy8gU29ydCBpdGVtcyBieSBkYXRlLiBNb3N0IHJlY2VudCB0byBvbGRlc3QuXG4gICAgICB0aGlzLmNhY2hlSW5kZXggPSB0aGlzLmNhY2hlSW5kZXguc29ydChcbiAgICAgICAgKGE6IEluZGV4SXRlbSwgYjogSW5kZXhJdGVtKTogbnVtYmVyID0+IChhID4gYiA/IC0xIDogYSA8IGIgPyAxIDogMCksXG4gICAgICApO1xuICAgICAgdGhpcy5pbmRleGVkID0gdHJ1ZTtcbiAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgIHRoaXMudGhyb3dFcnJvcihlcnIpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBUaGlzIG1ldGhvZCBydW5zIGV2ZXJ5IHRpbWUgYSBuZXcgZmlsZSBpcyBhZGRlZC5cbiAgICogSXQgY2hlY2tzIHRoZSBjYWNoZSBzaXplIGFuZCBlbnN1cmVzIHRoYXQgaXQgZG9lc24ndCBleGNlZWQgdGhlIG1heGltdW0gY2FjaGUgc2l6ZSBzZXQgaW4gdGhlIGNvbmZpZy5cbiAgICogSWYgdGhlIGxpbWl0IGlzIHJlYWNoZWQsIGl0IHdpbGwgZGVsZXRlIG9sZCBpbWFnZXMgdG8gY3JlYXRlIGZyZWUgc3BhY2UuXG4gICAqL1xuICBwcml2YXRlIGFzeW5jIG1haW50YWluQ2FjaGVTaXplKCkge1xuICAgIGlmICh0aGlzLmNvbmZpZy5tYXhDYWNoZVNpemUgPiAtMSAmJiB0aGlzLmluZGV4ZWQpIHtcbiAgICAgIGNvbnN0IG1haW50YWluID0gYXN5bmMgKCkgPT4ge1xuICAgICAgICBpZiAodGhpcy5jdXJyZW50Q2FjaGVTaXplID4gdGhpcy5jb25maWcubWF4Q2FjaGVTaXplKSB7XG4gICAgICAgICAgLy8gZ3JhYiB0aGUgZmlyc3QgaXRlbSBpbiBpbmRleCBzaW5jZSBpdCdzIHRoZSBvbGRlc3Qgb25lXG4gICAgICAgICAgY29uc3QgZmlsZTogSW5kZXhJdGVtID0gdGhpcy5jYWNoZUluZGV4LnNwbGljZSgwLCAxKVswXTtcblxuICAgICAgICAgIGlmICh0eXBlb2YgZmlsZSA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgICAgIHJldHVybiBtYWludGFpbigpO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIC8vIGRlbGV0ZSB0aGUgZmlsZSB0aGVuIHByb2Nlc3MgbmV4dCBmaWxlIGlmIG5lY2Vzc2FyeVxuICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICBhd2FpdCB0aGlzLnJlbW92ZUZpbGUoZmlsZS5uYW1lKTtcbiAgICAgICAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgICAgICAgIC8vIGlnbm9yZSBlcnJvcnMsIG5vdGhpbmcgd2UgY2FuIGRvIGFib3V0IGl0XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgdGhpcy5jdXJyZW50Q2FjaGVTaXplIC09IGZpbGUuc2l6ZTtcbiAgICAgICAgICByZXR1cm4gbWFpbnRhaW4oKTtcbiAgICAgICAgfVxuICAgICAgfTtcblxuICAgICAgcmV0dXJuIG1haW50YWluKCk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIFJlbW92ZSBhIGZpbGVcbiAgICogQHBhcmFtIGZpbGUgVGhlIG5hbWUgb2YgdGhlIGZpbGUgdG8gcmVtb3ZlXG4gICAqL1xuICBwcml2YXRlIGFzeW5jIHJlbW92ZUZpbGUoZmlsZTogc3RyaW5nKTogUHJvbWlzZTxhbnk+IHtcbiAgICBhd2FpdCB0aGlzLmZpbGUucmVtb3ZlRmlsZSh0aGlzLmdldEZpbGVDYWNoZURpcmVjdG9yeSgpICsgdGhpcy5jb25maWcuY2FjaGVEaXJlY3RvcnlOYW1lLCBmaWxlKTtcblxuICAgIGlmICh0aGlzLmlzV0tXZWJWaWV3ICYmICF0aGlzLmlzSW9uaWNXS1dlYlZpZXcpIHtcbiAgICAgIHRyeSB7XG4gICAgICAgIHJldHVybiB0aGlzLmZpbGUucmVtb3ZlRmlsZSh0aGlzLmZpbGUudGVtcERpcmVjdG9yeSArIHRoaXMuY29uZmlnLmNhY2hlRGlyZWN0b3J5TmFtZSwgZmlsZSk7XG4gICAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgICAgLy8gTm9vcCBjYXRjaC4gUmVtb3ZpbmcgdGhlIGZpbGVzIGZyb20gdGVtcERpcmVjdG9yeSBtaWdodCBmYWlsLCBhcyBpdCBpcyBub3QgcGVyc2lzdGVudC5cbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogR2V0IHRoZSBsb2NhbCBwYXRoIG9mIGEgcHJldmlvdXNseSBjYWNoZWQgaW1hZ2UgaWYgZXhpc3RzXG4gICAqIEBwYXJhbSB1cmwgVGhlIHJlbW90ZSBVUkwgb2YgdGhlIGltYWdlXG4gICAqIEByZXR1cm5zIFJldHVybnMgYSBwcm9taXNlIHRoYXQgcmVzb2x2ZXMgd2l0aCB0aGUgbG9jYWwgcGF0aCBpZiBleGlzdHMsIG9yIHJlamVjdHMgaWYgZG9lc24ndCBleGlzdFxuICAgKi9cbiAgcHJpdmF0ZSBhc3luYyBnZXRDYWNoZWRJbWFnZVBhdGgodXJsOiBzdHJpbmcpOiBQcm9taXNlPHN0cmluZz4ge1xuICAgIGF3YWl0IHRoaXMucmVhZHkoKTtcblxuICAgIGlmICghdGhpcy5pc0NhY2hlUmVhZHkpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignQ2FjaGUgaXMgbm90IHJlYWR5Jyk7XG4gICAgfVxuXG4gICAgLy8gaWYgd2UncmUgcnVubmluZyB3aXRoIGxpdmVyZWxvYWQsIGlnbm9yZSBjYWNoZSBhbmQgY2FsbCB0aGUgcmVzb3VyY2UgZnJvbSBpdCdzIFVSTFxuICAgIGlmICh0aGlzLmlzRGV2U2VydmVyKSB7XG4gICAgICByZXR1cm4gdXJsO1xuICAgIH1cblxuICAgIC8vIGdldCBmaWxlIG5hbWVcbiAgICBjb25zdCBmaWxlTmFtZSA9IHRoaXMuY3JlYXRlRmlsZU5hbWUodXJsKTtcblxuICAgIC8vIGdldCBmdWxsIHBhdGhcbiAgICBjb25zdCBkaXJQYXRoID0gdGhpcy5nZXRGaWxlQ2FjaGVEaXJlY3RvcnkoKSArIHRoaXMuY29uZmlnLmNhY2hlRGlyZWN0b3J5TmFtZSxcbiAgICAgIHRlbXBEaXJQYXRoID0gdGhpcy5maWxlLnRlbXBEaXJlY3RvcnkgKyB0aGlzLmNvbmZpZy5jYWNoZURpcmVjdG9yeU5hbWU7XG5cbiAgICB0cnkge1xuICAgICAgLy8gY2hlY2sgaWYgZXhpc3RzXG4gICAgICBjb25zdCBmaWxlRW50cnkgPSBhd2FpdCB0aGlzLmZpbGUucmVzb2x2ZUxvY2FsRmlsZXN5c3RlbVVybChkaXJQYXRoICsgJy8nICsgZmlsZU5hbWUpIGFzIEZpbGVFbnRyeTtcblxuICAgICAgLy8gZmlsZSBleGlzdHMgaW4gY2FjaGVcbiAgICAgIGlmICh0aGlzLmNvbmZpZy5pbWFnZVJldHVyblR5cGUgPT09ICdiYXNlNjQnKSB7XG4gICAgICAgIC8vIHJlYWQgdGhlIGZpbGUgYXMgZGF0YSB1cmwgYW5kIHJldHVybiB0aGUgYmFzZTY0IHN0cmluZy5cbiAgICAgICAgLy8gc2hvdWxkIGFsd2F5cyBiZSBzdWNjZXNzZnVsIGFzIHRoZSBleGlzdGVuY2Ugb2YgdGhlIGZpbGVcbiAgICAgICAgLy8gaXMgYWxyZWFkeSBlbnN1cmVkXG4gICAgICAgIGNvbnN0IGJhc2U2NDogc3RyaW5nID0gYXdhaXQgdGhpcy5maWxlLnJlYWRBc0RhdGFVUkwoZGlyUGF0aCwgZmlsZU5hbWUpO1xuICAgICAgICByZXR1cm4gYmFzZTY0LnJlcGxhY2UoJ2RhdGE6bnVsbCcsICdkYXRhOiovKicpO1xuICAgICAgfSBlbHNlIGlmICh0aGlzLmNvbmZpZy5pbWFnZVJldHVyblR5cGUgIT09ICd1cmknKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgLy8gbm93IGNoZWNrIGlmIGlPUyBkZXZpY2UgJiB1c2luZyBXS1dlYlZpZXcgRW5naW5lLlxuICAgICAgLy8gaW4gdGhpcyBjYXNlIG9ubHkgdGhlIHRlbXBEaXJlY3RvcnkgaXMgYWNjZXNzaWJsZSxcbiAgICAgIC8vIHRoZXJlZm9yZSB0aGUgZmlsZSBuZWVkcyB0byBiZSBjb3BpZWQgaW50byB0aGF0IGRpcmVjdG9yeSBmaXJzdCFcbiAgICAgIGlmICh0aGlzLmlzSW9uaWNXS1dlYlZpZXcpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMubm9ybWFsaXplVXJsKGZpbGVFbnRyeSk7XG4gICAgICB9XG5cbiAgICAgIGlmICghdGhpcy5pc1dLV2ViVmlldykge1xuICAgICAgICAvLyByZXR1cm4gbmF0aXZlIHBhdGhcbiAgICAgICAgcmV0dXJuIGZpbGVFbnRyeS5uYXRpdmVVUkw7XG4gICAgICB9XG5cbiAgICAgIC8vIGNoZWNrIGlmIGZpbGUgYWxyZWFkeSBleGlzdHMgaW4gdGVtcCBkaXJlY3RvcnlcbiAgICAgIHRyeSB7XG4gICAgICAgIGNvbnN0IHRlbXBGaWxlRW50cnkgPSBhd2FpdCB0aGlzLmZpbGUucmVzb2x2ZUxvY2FsRmlsZXN5c3RlbVVybCh0ZW1wRGlyUGF0aCArICcvJyArIGZpbGVOYW1lKSBhcyBGaWxlRW50cnk7XG4gICAgICAgIC8vIGZpbGUgZXhpc3RzIGluIHRlbXAgZGlyZWN0b3J5XG4gICAgICAgIC8vIHJldHVybiBuYXRpdmUgcGF0aFxuICAgICAgICByZXR1cm4gdGhpcy5ub3JtYWxpemVVcmwodGVtcEZpbGVFbnRyeSk7XG4gICAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgICAgLy8gZmlsZSBkb2VzIG5vdCB5ZXQgZXhpc3QgaW4gdGhlIHRlbXAgZGlyZWN0b3J5LlxuICAgICAgICAvLyBjb3B5IGl0IVxuICAgICAgICBjb25zdCB0ZW1wRmlsZUVudHJ5ID0gYXdhaXQgdGhpcy5maWxlXG4gICAgICAgICAgLmNvcHlGaWxlKGRpclBhdGgsIGZpbGVOYW1lLCB0ZW1wRGlyUGF0aCwgZmlsZU5hbWUpIGFzIEZpbGVFbnRyeTtcblxuICAgICAgICAvLyBub3cgdGhlIGZpbGUgZXhpc3RzIGluIHRoZSB0ZW1wIGRpcmVjdG9yeVxuICAgICAgICAvLyByZXR1cm4gbmF0aXZlIHBhdGhcbiAgICAgICAgcmV0dXJuIHRoaXMubm9ybWFsaXplVXJsKHRlbXBGaWxlRW50cnkpO1xuICAgICAgfVxuICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdGaWxlIGRvZXMgbm90IGV4aXN0Jyk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIE5vcm1hbGl6ZXMgdGhlIGltYWdlIHVyaSB0byBhIHZlcnNpb24gdGhhdCBjYW4gYmUgbG9hZGVkIGluIHRoZSB3ZWJ2aWV3XG4gICAqIEBwYXJhbSBmaWxlRW50cnkgdGhlIEZpbGVFbnRyeSBvZiB0aGUgaW1hZ2UgZmlsZVxuICAgKiBAcmV0dXJucyB0aGUgbm9ybWFsaXplZCBVcmxcbiAgICovXG5cbiAgcHJpdmF0ZSBub3JtYWxpemVVcmwoZmlsZUVudHJ5OiBGaWxlRW50cnkpOiBzdHJpbmcge1xuICAgIC8vIFVzZSBJb25pYyBub3JtYWxpemVVcmwgdG8gZ2VuZXJhdGUgdGhlIHJpZ2h0IFVSTCBmb3IgSW9uaWMgV0tXZWJWaWV3XG4gICAgaWYgKElvbmljICYmIHR5cGVvZiBJb25pYy5ub3JtYWxpemVVUkwgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgIHJldHVybiBJb25pYy5ub3JtYWxpemVVUkwoZmlsZUVudHJ5Lm5hdGl2ZVVSTCk7XG4gICAgfVxuICAgIC8vIHVzZSBuZXcgd2VidmlldyBmdW5jdGlvbiB0byBkbyB0aGUgdHJpY2tcbiAgICBpZiAodGhpcy53ZWJ2aWV3KSB7XG4gICAgICByZXR1cm4gdGhpcy53ZWJ2aWV3LmNvbnZlcnRGaWxlU3JjKGZpbGVFbnRyeS5uYXRpdmVVUkwpO1xuICAgIH1cbiAgICByZXR1cm4gZmlsZUVudHJ5Lm5hdGl2ZVVSTDtcbiAgfVxuXG4gIC8qKlxuICAgKiBUaHJvd3MgYSBjb25zb2xlIGVycm9yIGlmIGRlYnVnIG1vZGUgaXMgZW5hYmxlZFxuICAgKiBAcGFyYW0gYXJncyBFcnJvciBtZXNzYWdlXG4gICAqL1xuICBwcml2YXRlIHRocm93RXJyb3IoLi4uYXJnczogYW55W10pIHtcbiAgICBpZiAodGhpcy5jb25maWcuZGVidWdNb2RlKSB7XG4gICAgICBhcmdzLnVuc2hpZnQoJ0ltYWdlTG9hZGVyIEVycm9yOiAnKTtcbiAgICAgIGNvbnNvbGUuZXJyb3IuYXBwbHkoY29uc29sZSwgYXJncyk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIFRocm93cyBhIGNvbnNvbGUgd2FybmluZyBpZiBkZWJ1ZyBtb2RlIGlzIGVuYWJsZWRcbiAgICogQHBhcmFtIGFyZ3MgRXJyb3IgbWVzc2FnZVxuICAgKi9cbiAgcHJpdmF0ZSB0aHJvd1dhcm5pbmcoLi4uYXJnczogYW55W10pIHtcbiAgICBpZiAodGhpcy5jb25maWcuZGVidWdNb2RlKSB7XG4gICAgICBhcmdzLnVuc2hpZnQoJ0ltYWdlTG9hZGVyIFdhcm5pbmc6ICcpO1xuICAgICAgY29uc29sZS53YXJuLmFwcGx5KGNvbnNvbGUsIGFyZ3MpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBDaGVjayBpZiB0aGUgY2FjaGUgZGlyZWN0b3J5IGV4aXN0c1xuICAgKiBAcGFyYW0gZGlyZWN0b3J5IFRoZSBkaXJlY3RvcnkgdG8gY2hlY2suIEVpdGhlciB0aGlzLmZpbGUudGVtcERpcmVjdG9yeSBvciB0aGlzLmdldEZpbGVDYWNoZURpcmVjdG9yeSgpXG4gICAqIEByZXR1cm5zIFJldHVybnMgYSBwcm9taXNlIHRoYXQgcmVzb2x2ZXMgaWYgZXhpc3RzLCBhbmQgcmVqZWN0cyBpZiBpdCBkb2Vzbid0XG4gICAqL1xuICBwcml2YXRlIGNhY2hlRGlyZWN0b3J5RXhpc3RzKGRpcmVjdG9yeTogc3RyaW5nKTogUHJvbWlzZTxib29sZWFuPiB7XG4gICAgcmV0dXJuIHRoaXMuZmlsZS5jaGVja0RpcihkaXJlY3RvcnksIHRoaXMuY29uZmlnLmNhY2hlRGlyZWN0b3J5TmFtZSk7XG4gIH1cblxuICAvKipcbiAgICogQ3JlYXRlIHRoZSBjYWNoZSBkaXJlY3Rvcmllc1xuICAgKiBAcGFyYW0gcmVwbGFjZSBvdmVycmlkZSBkaXJlY3RvcnkgaWYgZXhpc3RzXG4gICAqIEByZXR1cm5zIFJldHVybnMgYSBwcm9taXNlIHRoYXQgcmVzb2x2ZXMgaWYgdGhlIGRpcmVjdG9yaWVzIHdlcmUgY3JlYXRlZCwgYW5kIHJlamVjdHMgb24gZXJyb3JcbiAgICovXG4gIHByaXZhdGUgY3JlYXRlQ2FjaGVEaXJlY3RvcnkocmVwbGFjZTogYm9vbGVhbiA9IGZhbHNlKTogUHJvbWlzZTxhbnk+IHtcbiAgICBsZXQgY2FjaGVEaXJlY3RvcnlQcm9taXNlOiBQcm9taXNlPGFueT4sIHRlbXBEaXJlY3RvcnlQcm9taXNlOiBQcm9taXNlPGFueT47XG5cbiAgICBpZiAocmVwbGFjZSkge1xuICAgICAgLy8gY3JlYXRlIG9yIHJlcGxhY2UgdGhlIGNhY2hlIGRpcmVjdG9yeVxuICAgICAgY2FjaGVEaXJlY3RvcnlQcm9taXNlID0gdGhpcy5maWxlLmNyZWF0ZURpcih0aGlzLmdldEZpbGVDYWNoZURpcmVjdG9yeSgpLCB0aGlzLmNvbmZpZy5jYWNoZURpcmVjdG9yeU5hbWUsIHJlcGxhY2UpO1xuICAgIH0gZWxzZSB7XG4gICAgICAvLyBjaGVjayBpZiB0aGUgY2FjaGUgZGlyZWN0b3J5IGV4aXN0cy5cbiAgICAgIC8vIGlmIGl0IGRvZXMgbm90IGV4aXN0IGNyZWF0ZSBpdCFcbiAgICAgIGNhY2hlRGlyZWN0b3J5UHJvbWlzZSA9IHRoaXMuY2FjaGVEaXJlY3RvcnlFeGlzdHModGhpcy5nZXRGaWxlQ2FjaGVEaXJlY3RvcnkoKSlcbiAgICAgICAgLmNhdGNoKCgpID0+IHRoaXMuZmlsZS5jcmVhdGVEaXIodGhpcy5nZXRGaWxlQ2FjaGVEaXJlY3RvcnkoKSwgdGhpcy5jb25maWcuY2FjaGVEaXJlY3RvcnlOYW1lLCBmYWxzZSkpO1xuICAgIH1cblxuICAgIGlmICh0aGlzLmlzV0tXZWJWaWV3ICYmICF0aGlzLmlzSW9uaWNXS1dlYlZpZXcpIHtcbiAgICAgIGlmIChyZXBsYWNlKSB7XG4gICAgICAgIC8vIGNyZWF0ZSBvciByZXBsYWNlIHRoZSB0ZW1wIGRpcmVjdG9yeVxuICAgICAgICB0ZW1wRGlyZWN0b3J5UHJvbWlzZSA9IHRoaXMuZmlsZS5jcmVhdGVEaXIoXG4gICAgICAgICAgdGhpcy5maWxlLnRlbXBEaXJlY3RvcnksXG4gICAgICAgICAgdGhpcy5jb25maWcuY2FjaGVEaXJlY3RvcnlOYW1lLFxuICAgICAgICAgIHJlcGxhY2UsXG4gICAgICAgICk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICAvLyBjaGVjayBpZiB0aGUgdGVtcCBkaXJlY3RvcnkgZXhpc3RzLlxuICAgICAgICAvLyBpZiBpdCBkb2VzIG5vdCBleGlzdCBjcmVhdGUgaXQhXG4gICAgICAgIHRlbXBEaXJlY3RvcnlQcm9taXNlID0gdGhpcy5jYWNoZURpcmVjdG9yeUV4aXN0cyhcbiAgICAgICAgICB0aGlzLmZpbGUudGVtcERpcmVjdG9yeSxcbiAgICAgICAgKS5jYXRjaCgoKSA9PlxuICAgICAgICAgIHRoaXMuZmlsZS5jcmVhdGVEaXIoXG4gICAgICAgICAgICB0aGlzLmZpbGUudGVtcERpcmVjdG9yeSxcbiAgICAgICAgICAgIHRoaXMuY29uZmlnLmNhY2hlRGlyZWN0b3J5TmFtZSxcbiAgICAgICAgICAgIGZhbHNlLFxuICAgICAgICAgICksXG4gICAgICAgICk7XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIHRlbXBEaXJlY3RvcnlQcm9taXNlID0gUHJvbWlzZS5yZXNvbHZlKCk7XG4gICAgfVxuXG4gICAgcmV0dXJuIFByb21pc2UuYWxsKFtjYWNoZURpcmVjdG9yeVByb21pc2UsIHRlbXBEaXJlY3RvcnlQcm9taXNlXSk7XG4gIH1cblxuICAvKipcbiAgICogQ3JlYXRlcyBhIHVuaXF1ZSBmaWxlIG5hbWUgb3V0IG9mIHRoZSBVUkxcbiAgICogQHBhcmFtIHVybCBVUkwgb2YgdGhlIGZpbGVcbiAgICogQHJldHVybnMgVW5pcXVlIGZpbGUgbmFtZVxuICAgKi9cbiAgcHJpdmF0ZSBjcmVhdGVGaWxlTmFtZSh1cmw6IHN0cmluZyk6IHN0cmluZyB7XG4gICAgLy8gaGFzaCB0aGUgdXJsIHRvIGdldCBhIHVuaXF1ZSBmaWxlIG5hbWVcbiAgICByZXR1cm4gKFxuICAgICAgdGhpcy5oYXNoU3RyaW5nKHVybCkudG9TdHJpbmcoKSArXG4gICAgICAodGhpcy5jb25maWcuZmlsZU5hbWVDYWNoZWRXaXRoRXh0ZW5zaW9uXG4gICAgICAgID8gdGhpcy5nZXRFeHRlbnNpb25Gcm9tVXJsKHVybClcbiAgICAgICAgOiAnJylcbiAgICApO1xuICB9XG5cbiAgLyoqXG4gICAqIENvbnZlcnRzIGEgc3RyaW5nIHRvIGEgdW5pcXVlIDMyLWJpdCBpbnRcbiAgICogQHBhcmFtIHN0cmluZyBzdHJpbmcgdG8gaGFzaFxuICAgKiBAcmV0dXJucyAzMi1iaXQgaW50XG4gICAqL1xuICBwcml2YXRlIGhhc2hTdHJpbmcoc3RyaW5nOiBzdHJpbmcpOiBudW1iZXIge1xuICAgIGxldCBoYXNoID0gMCxcbiAgICAgIGNoYXI7XG4gICAgaWYgKHN0cmluZy5sZW5ndGggPT09IDApIHtcbiAgICAgIHJldHVybiBoYXNoO1xuICAgIH1cbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHN0cmluZy5sZW5ndGg7IGkrKykge1xuICAgICAgY2hhciA9IHN0cmluZy5jaGFyQ29kZUF0KGkpO1xuICAgICAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lXG4gICAgICBoYXNoID0gKGhhc2ggPDwgNSkgLSBoYXNoICsgY2hhcjtcbiAgICAgIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZVxuICAgICAgaGFzaCA9IGhhc2ggJiBoYXNoO1xuICAgIH1cbiAgICByZXR1cm4gaGFzaDtcbiAgfVxuXG4gIC8qKlxuICAgKiBFeHRyYWN0IGV4dGVuc2lvbiBmcm9tIGZpbGVuYW1lIG9yIHVybFxuICAgKlxuICAgKiBAcGFyYW0gdXJsXG4gICAqIEByZXR1cm5zXG4gICAqXG4gICAqIE5vdCBhbHdheXMgd2lsbCB1cmwncyBjb250YWluIGEgdmFsaWQgaW1hZ2UgZXh0ZW50aW9uLiBXZSdsbCBjaGVjayBpZiBhbnkgdmFsaWQgZXh0ZW50aW9uIGlzIHN1cHBsaWVkLlxuICAgKiBJZiBub3QsIHdlIHdpbGwgdXNlIHRoZSBkZWZhdWx0LlxuICAgKi9cbiAgcHJpdmF0ZSBnZXRFeHRlbnNpb25Gcm9tVXJsKHVybDogc3RyaW5nKTogc3RyaW5nIHtcbiAgICBjb25zdCB1cmxXaXRvdXRQYXJhbXMgPSB1cmwuc3BsaXQoL1xcI3xcXD8vKVswXTtcbiAgICBjb25zdCBleHQ6IHN0cmluZyA9ICh1cmxXaXRvdXRQYXJhbXMuc3Vic3RyKCh+LXVybFdpdG91dFBhcmFtcy5sYXN0SW5kZXhPZignLicpID4+PiAwKSArIDEpIHx8ICcnKS50b0xvd2VyQ2FzZSgpO1xuXG4gICAgcmV0dXJuIChcbiAgICAgIEVYVEVOU0lPTlMuaW5kZXhPZihleHQpID49IDAgPyBleHQgOiB0aGlzLmNvbmZpZy5mYWxsYmFja0ZpbGVOYW1lQ2FjaGVkRXh0ZW5zaW9uXG4gICAgKTtcbiAgfVxufVxuIl19