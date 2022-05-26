import { __awaiter } from 'tslib';
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
class ImageLoaderConfigService {
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
/** @nocollapse */ ImageLoaderConfigService.ngInjectableDef = defineInjectable({ factory: function ImageLoaderConfigService_Factory() { return new ImageLoaderConfigService(); }, token: ImageLoaderConfigService, providedIn: "root" });

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/** @type {?} */
const EXTENSIONS = ['jpg', 'png', 'jpeg', 'gif', 'svg', 'tiff'];
class ImageLoaderService {
    /**
     * @param {?} config
     * @param {?} file
     * @param {?} http
     * @param {?} platform
     * @param {?} webview
     */
    constructor(config, file, http, platform, webview) {
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
        this.initPromise = new Promise(resolve => this.initPromiseResolve = resolve);
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
                .subscribe(res => {
                if (this.nativeAvailable) {
                    this.initCache();
                }
                else {
                    // we are running on a browser, or using livereload
                    // plugin will not function in this case
                    this.isInit = true;
                    this.initPromiseResolve();
                    this.throwWarning('You are running on a browser or using livereload, IonicImageLoader will not function, falling back to browser loading.');
                }
            });
        }
    }
    /**
     * @return {?}
     */
    get nativeAvailable() {
        return File.installed();
    }
    /**
     * @private
     * @return {?}
     */
    get isCacheSpaceExceeded() {
        return (this.config.maxCacheSize > -1 &&
            this.currentCacheSize > this.config.maxCacheSize);
    }
    /**
     * @private
     * @return {?}
     */
    get isWKWebView() {
        return (this.platform.is('ios') &&
            ((/** @type {?} */ (window))).webkit &&
            ((/** @type {?} */ (window))).webkit.messageHandlers);
    }
    /**
     * @private
     * @return {?}
     */
    get isIonicWKWebView() {
        return (
        //  Important: isWKWebview && isIonicWKWebview must be mutually excluse.
        //  Otherwise the logic for copying to tmp under IOS will fail.
        (this.platform.is('android') && this.webview) ||
            (this.platform.is('android')) && (location.host === 'localhost:8080') ||
            ((/** @type {?} */ (window))).LiveReload);
    }
    /**
     * @private
     * @return {?}
     */
    get isDevServer() {
        return window['IonicDevServer'] !== undefined;
    }
    /**
     * Check if we can process more items in the queue
     * @private
     * @return {?}
     */
    get canProcess() {
        return this.queue.length > 0 && this.processing < this.concurrency;
    }
    /**
     * @return {?}
     */
    ready() {
        return this.initPromise;
    }
    /**
     * Preload an image
     * @param {?} imageUrl Image URL
     * @return {?} returns a promise that resolves with the cached image URL
     */
    preload(imageUrl) {
        return this.getImagePath(imageUrl);
    }
    /**
     * @return {?}
     */
    getFileCacheDirectory() {
        if (this.config.cacheDirectoryType === 'data') {
            return this.file.dataDirectory;
        }
        else if (this.config.cacheDirectoryType === 'external') {
            return this.platform.is('android') ? this.file.externalDataDirectory : this.file.documentsDirectory;
        }
        return this.file.cacheDirectory;
    }
    /**
     * Clears cache of a single image
     * @param {?} imageUrl Image URL
     * @return {?}
     */
    clearImageCache(imageUrl) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this.platform.is('cordova')) {
                return;
            }
            yield this.ready();
            this.runLocked(() => __awaiter(this, void 0, void 0, function* () {
                /** @type {?} */
                const fileName = this.createFileName(imageUrl);
                /** @type {?} */
                const route = this.getFileCacheDirectory() + this.config.cacheDirectoryName;
                // pause any operations
                this.isInit = false;
                try {
                    yield this.file.removeFile(route, fileName);
                    if (this.isWKWebView && !this.isIonicWKWebView) {
                        yield this.file.removeFile(this.file.tempDirectory + this.config.cacheDirectoryName, fileName);
                    }
                }
                catch (err) {
                    this.throwError(err);
                }
                return this.initCache(true);
            }));
        });
    }
    /**
     * Clears the cache
     * @return {?}
     */
    clearCache() {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this.platform.is('cordova')) {
                return;
            }
            yield this.ready();
            this.runLocked(() => __awaiter(this, void 0, void 0, function* () {
                try {
                    yield this.file.removeRecursively(this.getFileCacheDirectory(), this.config.cacheDirectoryName);
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
                }
                catch (err) {
                    this.throwError(err);
                }
                return this.initCache(true);
            }));
        });
    }
    /**
     * Gets the filesystem path of an image.
     * This will return the remote path if anything goes wrong or if the cache service isn't ready yet.
     * @param {?} imageUrl The remote URL of the image
     * @return {?} Returns a promise that will always resolve with an image URL
     */
    getImagePath(imageUrl) {
        return __awaiter(this, void 0, void 0, function* () {
            if (typeof imageUrl !== 'string' || imageUrl.length <= 0) {
                throw new Error('The image url provided was empty or invalid.');
            }
            yield this.ready();
            if (!this.isCacheReady) {
                this.throwWarning('The cache system is not running. Images will be loaded by your browser instead.');
                return imageUrl;
            }
            if (this.isImageUrlRelative(imageUrl)) {
                return imageUrl;
            }
            try {
                return yield this.getCachedImagePath(imageUrl);
            }
            catch (err) {
                // image doesn't exist in cache, lets fetch it and save it
                return this.addItemToQueue(imageUrl);
            }
        });
    }
    /**
     * @private
     * @return {?}
     */
    processLockedQueue() {
        return __awaiter(this, void 0, void 0, function* () {
            if (yield this.getLockedState()) {
                return;
            }
            if (this.lockedCallsQueue.length > 0) {
                yield this.setLockedState(true);
                try {
                    yield this.lockedCallsQueue.slice(0, 1)[0]();
                }
                catch (err) {
                    console.log('Error running locked function: ', err);
                }
                yield this.setLockedState(false);
                return this.processLockedQueue();
            }
        });
    }
    /**
     * @private
     * @return {?}
     */
    getLockedState() {
        return this.lock$
            .pipe(take(1))
            .toPromise();
    }
    /**
     * @private
     * @return {?}
     */
    awaitUnlocked() {
        return this.lock$
            .pipe(filter(locked => !!locked), take(1))
            .toPromise();
    }
    /**
     * @private
     * @param {?} locked
     * @return {?}
     */
    setLockedState(locked) {
        return __awaiter(this, void 0, void 0, function* () {
            this.lockSubject.next(locked);
        });
    }
    /**
     * @private
     * @param {?} fn
     * @return {?}
     */
    runLocked(fn) {
        this.lockedCallsQueue.push(fn);
        this.processLockedQueue();
    }
    /**
     * Returns if an imageUrl is an relative path
     * @private
     * @param {?} imageUrl
     * @return {?}
     */
    isImageUrlRelative(imageUrl) {
        return !/^(https?|file):\/\/\/?/i.test(imageUrl);
    }
    /**
     * Add an item to the queue
     * @private
     * @param {?} imageUrl
     * @param {?=} resolve
     * @param {?=} reject
     * @return {?}
     */
    addItemToQueue(imageUrl, resolve, reject) {
        /** @type {?} */
        let p;
        if (!resolve && !reject) {
            p = new Promise((res, rej) => {
                resolve = res;
                reject = rej;
            });
        }
        else {
            resolve = resolve || (() => {
            });
            reject = reject || (() => {
            });
        }
        this.queue.push({
            imageUrl,
            resolve,
            reject,
        });
        this.processQueue();
        return p;
    }
    /**
     * Processes one item from the queue
     * @private
     * @return {?}
     */
    processQueue() {
        return __awaiter(this, void 0, void 0, function* () {
            // make sure we can process items first
            if (!this.canProcess) {
                return;
            }
            // increase the processing number
            this.processing++;
            // take the first item from queue
            /** @type {?} */
            const currentItem = this.queue.splice(0, 1)[0];
            // function to call when done processing this item
            // this will reduce the processing number
            // then will execute this function again to process any remaining items
            /** @type {?} */
            const done = () => {
                this.processing--;
                this.processQueue();
                // only delete if it's the last/unique occurrence in the queue
                if (this.currentlyProcessing[currentItem.imageUrl] !== undefined && !this.currentlyInQueue(currentItem.imageUrl)) {
                    delete this.currentlyProcessing[currentItem.imageUrl];
                }
            };
            /** @type {?} */
            const error = (e) => {
                currentItem.reject();
                this.throwError(e);
                done();
            };
            if (this.currentlyProcessing[currentItem.imageUrl] !== undefined) {
                try {
                    // Prevented same Image from loading at the same time
                    yield this.currentlyProcessing[currentItem.imageUrl];
                    /** @type {?} */
                    const localUrl = yield this.getCachedImagePath(currentItem.imageUrl);
                    currentItem.resolve(localUrl);
                    done();
                }
                catch (err) {
                    error(err);
                }
                return;
            }
            this.currentlyProcessing[currentItem.imageUrl] = (() => __awaiter(this, void 0, void 0, function* () {
                // process more items concurrently if we can
                if (this.canProcess) {
                    this.processQueue();
                }
                /** @type {?} */
                const localDir = this.getFileCacheDirectory() + this.config.cacheDirectoryName + '/';
                /** @type {?} */
                const fileName = this.createFileName(currentItem.imageUrl);
                try {
                    /** @type {?} */
                    const data = yield this.http.get(currentItem.imageUrl, {
                        responseType: 'blob',
                        headers: this.config.httpHeaders,
                    }).toPromise();
                    /** @type {?} */
                    const file = (/** @type {?} */ (yield this.file.writeFile(localDir, fileName, data, { replace: true })));
                    if (this.isCacheSpaceExceeded) {
                        this.maintainCacheSize();
                    }
                    yield this.addFileToIndex(file);
                    /** @type {?} */
                    const localUrl = yield this.getCachedImagePath(currentItem.imageUrl);
                    currentItem.resolve(localUrl);
                    done();
                    this.maintainCacheSize();
                }
                catch (err) {
                    error(err);
                    throw err;
                }
            }))();
        });
    }
    /**
     * Search if the url is currently in the queue
     * @private
     * @param {?} imageUrl Image url to search
     * @return {?}
     */
    currentlyInQueue(imageUrl) {
        return this.queue.some(item => item.imageUrl === imageUrl);
    }
    /**
     * Initialize the cache service
     * @private
     * @param {?=} replace
     * @return {?}
     */
    initCache(replace) {
        return __awaiter(this, void 0, void 0, function* () {
            this.concurrency = this.config.concurrency;
            // create cache directories if they do not exist
            try {
                yield this.createCacheDirectory(replace);
                yield this.indexCache();
                this.isCacheReady = true;
            }
            catch (err) {
                this.throwError(err);
            }
            this.isInit = true;
            this.initPromiseResolve();
        });
    }
    /**
     * Adds a file to index.
     * Also deletes any files if they are older than the set maximum cache age.
     * @private
     * @param {?} file FileEntry to index
     * @return {?}
     */
    addFileToIndex(file) {
        return __awaiter(this, void 0, void 0, function* () {
            /** @type {?} */
            const metadata = yield new Promise((resolve, reject) => file.getMetadata(resolve, reject));
            if (this.config.maxCacheAge > -1 &&
                Date.now() - metadata.modificationTime.getTime() >
                    this.config.maxCacheAge) {
                // file age exceeds maximum cache age
                return this.removeFile(file.name);
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
        });
    }
    /**
     * Indexes the cache if necessary
     * @private
     * @return {?}
     */
    indexCache() {
        return __awaiter(this, void 0, void 0, function* () {
            this.cacheIndex = [];
            try {
                /** @type {?} */
                const files = yield this.file.listDir(this.getFileCacheDirectory(), this.config.cacheDirectoryName);
                yield Promise.all(files.map(this.addFileToIndex.bind(this)));
                // Sort items by date. Most recent to oldest.
                this.cacheIndex = this.cacheIndex.sort((a, b) => (a > b ? -1 : a < b ? 1 : 0));
                this.indexed = true;
            }
            catch (err) {
                this.throwError(err);
            }
        });
    }
    /**
     * This method runs every time a new file is added.
     * It checks the cache size and ensures that it doesn't exceed the maximum cache size set in the config.
     * If the limit is reached, it will delete old images to create free space.
     * @private
     * @return {?}
     */
    maintainCacheSize() {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.config.maxCacheSize > -1 && this.indexed) {
                /** @type {?} */
                const maintain = () => __awaiter(this, void 0, void 0, function* () {
                    if (this.currentCacheSize > this.config.maxCacheSize) {
                        // grab the first item in index since it's the oldest one
                        /** @type {?} */
                        const file = this.cacheIndex.splice(0, 1)[0];
                        if (typeof file === 'undefined') {
                            return maintain();
                        }
                        // delete the file then process next file if necessary
                        try {
                            yield this.removeFile(file.name);
                        }
                        catch (err) {
                            // ignore errors, nothing we can do about it
                        }
                        this.currentCacheSize -= file.size;
                        return maintain();
                    }
                });
                return maintain();
            }
        });
    }
    /**
     * Remove a file
     * @private
     * @param {?} file The name of the file to remove
     * @return {?}
     */
    removeFile(file) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.file.removeFile(this.getFileCacheDirectory() + this.config.cacheDirectoryName, file);
            if (this.isWKWebView && !this.isIonicWKWebView) {
                try {
                    return this.file.removeFile(this.file.tempDirectory + this.config.cacheDirectoryName, file);
                }
                catch (err) {
                    // Noop catch. Removing the files from tempDirectory might fail, as it is not persistent.
                }
            }
        });
    }
    /**
     * Get the local path of a previously cached image if exists
     * @private
     * @param {?} url The remote URL of the image
     * @return {?} Returns a promise that resolves with the local path if exists, or rejects if doesn't exist
     */
    getCachedImagePath(url) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.ready();
            if (!this.isCacheReady) {
                throw new Error('Cache is not ready');
            }
            // if we're running with livereload, ignore cache and call the resource from it's URL
            if (this.isDevServer) {
                return url;
            }
            // get file name
            /** @type {?} */
            const fileName = this.createFileName(url);
            // get full path
            /** @type {?} */
            const dirPath = this.getFileCacheDirectory() + this.config.cacheDirectoryName;
            /** @type {?} */
            const tempDirPath = this.file.tempDirectory + this.config.cacheDirectoryName;
            try {
                // check if exists
                /** @type {?} */
                const fileEntry = (/** @type {?} */ (yield this.file.resolveLocalFilesystemUrl(dirPath + '/' + fileName)));
                // file exists in cache
                if (this.config.imageReturnType === 'base64') {
                    // read the file as data url and return the base64 string.
                    // should always be successful as the existence of the file
                    // is already ensured
                    /** @type {?} */
                    const base64 = yield this.file.readAsDataURL(dirPath, fileName);
                    return base64.replace('data:null', 'data:*/*');
                }
                else if (this.config.imageReturnType !== 'uri') {
                    return;
                }
                // now check if iOS device & using WKWebView Engine.
                // in this case only the tempDirectory is accessible,
                // therefore the file needs to be copied into that directory first!
                if (this.isIonicWKWebView) {
                    return this.normalizeUrl(fileEntry);
                }
                if (!this.isWKWebView) {
                    // return native path
                    return fileEntry.nativeURL;
                }
                // check if file already exists in temp directory
                try {
                    /** @type {?} */
                    const tempFileEntry = (/** @type {?} */ (yield this.file.resolveLocalFilesystemUrl(tempDirPath + '/' + fileName)));
                    // file exists in temp directory
                    // return native path
                    return this.normalizeUrl(tempFileEntry);
                }
                catch (err) {
                    // file does not yet exist in the temp directory.
                    // copy it!
                    /** @type {?} */
                    const tempFileEntry = (/** @type {?} */ (yield this.file
                        .copyFile(dirPath, fileName, tempDirPath, fileName)));
                    // now the file exists in the temp directory
                    // return native path
                    return this.normalizeUrl(tempFileEntry);
                }
            }
            catch (err) {
                throw new Error('File does not exist');
            }
        });
    }
    /**
     * Normalizes the image uri to a version that can be loaded in the webview
     * @private
     * @param {?} fileEntry the FileEntry of the image file
     * @return {?} the normalized Url
     */
    normalizeUrl(fileEntry) {
        // Use Ionic normalizeUrl to generate the right URL for Ionic WKWebView
        if (Ionic && typeof Ionic.normalizeURL === 'function') {
            return Ionic.normalizeURL(fileEntry.nativeURL);
        }
        // use new webview function to do the trick
        if (this.webview) {
            return this.webview.convertFileSrc(fileEntry.nativeURL);
        }
        return fileEntry.nativeURL;
    }
    /**
     * Throws a console error if debug mode is enabled
     * @private
     * @param {...?} args Error message
     * @return {?}
     */
    throwError(...args) {
        if (this.config.debugMode) {
            args.unshift('ImageLoader Error: ');
            console.error.apply(console, args);
        }
    }
    /**
     * Throws a console warning if debug mode is enabled
     * @private
     * @param {...?} args Error message
     * @return {?}
     */
    throwWarning(...args) {
        if (this.config.debugMode) {
            args.unshift('ImageLoader Warning: ');
            console.warn.apply(console, args);
        }
    }
    /**
     * Check if the cache directory exists
     * @private
     * @param {?} directory The directory to check. Either this.file.tempDirectory or this.getFileCacheDirectory()
     * @return {?} Returns a promise that resolves if exists, and rejects if it doesn't
     */
    cacheDirectoryExists(directory) {
        return this.file.checkDir(directory, this.config.cacheDirectoryName);
    }
    /**
     * Create the cache directories
     * @private
     * @param {?=} replace override directory if exists
     * @return {?} Returns a promise that resolves if the directories were created, and rejects on error
     */
    createCacheDirectory(replace = false) {
        /** @type {?} */
        let cacheDirectoryPromise;
        /** @type {?} */
        let tempDirectoryPromise;
        if (replace) {
            // create or replace the cache directory
            cacheDirectoryPromise = this.file.createDir(this.getFileCacheDirectory(), this.config.cacheDirectoryName, replace);
        }
        else {
            // check if the cache directory exists.
            // if it does not exist create it!
            cacheDirectoryPromise = this.cacheDirectoryExists(this.getFileCacheDirectory())
                .catch(() => this.file.createDir(this.getFileCacheDirectory(), this.config.cacheDirectoryName, false));
        }
        if (this.isWKWebView && !this.isIonicWKWebView) {
            if (replace) {
                // create or replace the temp directory
                tempDirectoryPromise = this.file.createDir(this.file.tempDirectory, this.config.cacheDirectoryName, replace);
            }
            else {
                // check if the temp directory exists.
                // if it does not exist create it!
                tempDirectoryPromise = this.cacheDirectoryExists(this.file.tempDirectory).catch(() => this.file.createDir(this.file.tempDirectory, this.config.cacheDirectoryName, false));
            }
        }
        else {
            tempDirectoryPromise = Promise.resolve();
        }
        return Promise.all([cacheDirectoryPromise, tempDirectoryPromise]);
    }
    /**
     * Creates a unique file name out of the URL
     * @private
     * @param {?} url URL of the file
     * @return {?} Unique file name
     */
    createFileName(url) {
        // hash the url to get a unique file name
        return (this.hashString(url).toString() +
            (this.config.fileNameCachedWithExtension
                ? this.getExtensionFromUrl(url)
                : ''));
    }
    /**
     * Converts a string to a unique 32-bit int
     * @private
     * @param {?} string string to hash
     * @return {?} 32-bit int
     */
    hashString(string) {
        /** @type {?} */
        let hash = 0;
        /** @type {?} */
        let char;
        if (string.length === 0) {
            return hash;
        }
        for (let i = 0; i < string.length; i++) {
            char = string.charCodeAt(i);
            // tslint:disable-next-line
            hash = (hash << 5) - hash + char;
            // tslint:disable-next-line
            hash = hash & hash;
        }
        return hash;
    }
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
    getExtensionFromUrl(url) {
        /** @type {?} */
        const urlWitoutParams = url.split(/\#|\?/)[0];
        /** @type {?} */
        const ext = (urlWitoutParams.substr((~-urlWitoutParams.lastIndexOf('.') >>> 0) + 1) || '').toLowerCase();
        return (EXTENSIONS.indexOf(ext) >= 0 ? ext : this.config.fallbackFileNameCachedExtension);
    }
}
ImageLoaderService.decorators = [
    { type: Injectable, args: [{
                providedIn: 'root',
            },] }
];
/** @nocollapse */
ImageLoaderService.ctorParameters = () => [
    { type: ImageLoaderConfigService },
    { type: File },
    { type: HttpClient },
    { type: Platform },
    { type: WebView }
];
/** @nocollapse */ ImageLoaderService.ngInjectableDef = defineInjectable({ factory: function ImageLoaderService_Factory() { return new ImageLoaderService(inject(ImageLoaderConfigService), inject(File$1), inject(HttpClient), inject(Platform), inject(WebView$1)); }, token: ImageLoaderService, providedIn: "root" });

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/** @type {?} */
const propMap = {
    display: 'display',
    height: 'height',
    width: 'width',
    backgroundSize: 'background-size',
    backgroundRepeat: 'background-repeat',
};
class IonicImageLoaderComponent {
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

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class IonicImageLoader {
    /**
     * @return {?}
     */
    static forRoot() {
        return {
            ngModule: IonicImageLoader,
            providers: [
                ImageLoaderConfigService,
                ImageLoaderService,
                File,
            ],
        };
    }
}
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