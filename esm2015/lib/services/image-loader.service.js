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
const EXTENSIONS = ['jpg', 'png', 'jpeg', 'gif', 'svg', 'tiff'];
export class ImageLoaderService {
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
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            if (!this.platform.is('cordova')) {
                return;
            }
            yield this.ready();
            this.runLocked(() => tslib_1.__awaiter(this, void 0, void 0, function* () {
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
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            if (!this.platform.is('cordova')) {
                return;
            }
            yield this.ready();
            this.runLocked(() => tslib_1.__awaiter(this, void 0, void 0, function* () {
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
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
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
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
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
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
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
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
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
            this.currentlyProcessing[currentItem.imageUrl] = (() => tslib_1.__awaiter(this, void 0, void 0, function* () {
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
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
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
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
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
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
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
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            if (this.config.maxCacheSize > -1 && this.indexed) {
                /** @type {?} */
                const maintain = () => tslib_1.__awaiter(this, void 0, void 0, function* () {
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
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
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
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
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
/** @nocollapse */ ImageLoaderService.ngInjectableDef = i0.defineInjectable({ factory: function ImageLoaderService_Factory() { return new ImageLoaderService(i0.inject(i1.ImageLoaderConfigService), i0.inject(i2.File), i0.inject(i3.HttpClient), i0.inject(i4.Platform), i0.inject(i5.WebView)); }, token: ImageLoaderService, providedIn: "root" });
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW1hZ2UtbG9hZGVyLnNlcnZpY2UuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9pb25pYy1pbWFnZS1sb2FkZXIvIiwic291cmNlcyI6WyJsaWIvc2VydmljZXMvaW1hZ2UtbG9hZGVyLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sc0JBQXNCLENBQUM7QUFDbEQsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUMzQyxPQUFPLEVBQUUsSUFBSSxFQUFhLE1BQU0sd0JBQXdCLENBQUM7QUFDekQsT0FBTyxFQUFFLE9BQU8sRUFBRSxNQUFNLGlDQUFpQyxDQUFDO0FBQzFELE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUMxQyxPQUFPLEVBQUUsU0FBUyxFQUFFLE9BQU8sRUFBRSxNQUFNLE1BQU0sQ0FBQztBQUMxQyxPQUFPLEVBQUUsTUFBTSxFQUFFLEtBQUssRUFBRSxJQUFJLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUNyRCxPQUFPLEVBQUUsd0JBQXdCLEVBQUUsTUFBTSwrQkFBK0IsQ0FBQzs7Ozs7Ozs7OztBQUV6RSx3QkFJQzs7O0lBSEMseUJBQWE7O0lBQ2IscUNBQXVCOztJQUN2Qix5QkFBYTs7Ozs7QUFHZix3QkFJQzs7O0lBSEMsNkJBQWlCOztJQUNqQiw0QkFBa0I7O0lBQ2xCLDJCQUFpQjs7O01BS2IsVUFBVSxHQUFHLENBQUMsS0FBSyxFQUFFLEtBQUssRUFBRSxNQUFNLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRSxNQUFNLENBQUM7QUFLL0QsTUFBTSxPQUFPLGtCQUFrQjs7Ozs7Ozs7SUFrQzdCLFlBQ1UsTUFBZ0MsRUFDaEMsSUFBVSxFQUNWLElBQWdCLEVBQ2hCLFFBQWtCLEVBQ2xCLE9BQWdCO1FBSmhCLFdBQU0sR0FBTixNQUFNLENBQTBCO1FBQ2hDLFNBQUksR0FBSixJQUFJLENBQU07UUFDVixTQUFJLEdBQUosSUFB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QUMsSUFBSSxDQUFDLE1BQU0sQ0FBQywrQkFBK0IsQ0FDakYsQ0FBQztJQUNKLENBQUM7OztZQTF0QkYsVUFBVSxTQUFDO2dCQUNWLFVBQVUsRUFBRSxNQUFNO2FBQ25COzs7O1lBcEJRLHdCQUF3QjtZQUx4QixJQUFJO1lBRkosVUFBVTtZQUlWLFFBQVE7WUFEUixPQUFPOzs7Ozs7Ozs7O0lBK0JkLDBDQUE2Qjs7Ozs7OztJQUs3QixvQ0FBdUI7Ozs7O0lBQ3ZCLGdEQUFxQzs7Ozs7SUFDckMseUNBQXNGOzs7OztJQUN0Rix5Q0FBNkM7Ozs7O0lBQzdDLG1DQUFnRDs7Ozs7O0lBSWhELHlDQUF3Qjs7Ozs7O0lBSXhCLG1DQUFnQzs7Ozs7SUFDaEMsd0NBQXVCOzs7Ozs7SUFJdkIsaURBQW9FOzs7OztJQUNwRSx3Q0FBcUM7Ozs7O0lBQ3JDLDhDQUE2Qjs7Ozs7SUFDN0IscUNBQXdCOzs7OztJQUN4Qiw4Q0FBMEM7Ozs7O0lBR3hDLG9DQUF3Qzs7Ozs7SUFDeEMsa0NBQWtCOzs7OztJQUNsQixrQ0FBd0I7Ozs7O0lBQ3hCLHNDQUEwQjs7Ozs7SUFDMUIscUNBQXdCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSHR0cENsaWVudCB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbi9odHRwJztcbmltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEZpbGUsIEZpbGVFbnRyeSB9IGZyb20gJ0Bpb25pYy1uYXRpdmUvZmlsZS9uZ3gnO1xuaW1wb3J0IHsgV2ViVmlldyB9IGZyb20gJ0Bpb25pYy1uYXRpdmUvaW9uaWMtd2Vidmlldy9uZ3gnO1xuaW1wb3J0IHsgUGxhdGZvcm0gfSBmcm9tICdAaW9uaWMvYW5ndWxhcic7XG5pbXBvcnQgeyBmcm9tRXZlbnQsIFN1YmplY3QgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IGZpbHRlciwgZmlyc3QsIHRha2UgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5pbXBvcnQgeyBJbWFnZUxvYWRlckNvbmZpZ1NlcnZpY2UgfSBmcm9tICcuL2ltYWdlLWxvYWRlci1jb25maWcuc2VydmljZSc7XG5cbmludGVyZmFjZSBJbmRleEl0ZW0ge1xuICBuYW1lOiBzdHJpbmc7XG4gIG1vZGlmaWNhdGlvblRpbWU6IERhdGU7XG4gIHNpemU6IG51bWJlcjtcbn1cblxuaW50ZXJmYWNlIFF1ZXVlSXRlbSB7XG4gIGltYWdlVXJsOiBzdHJpbmc7XG4gIHJlc29sdmU6IEZ1bmN0aW9uO1xuICByZWplY3Q6IEZ1bmN0aW9uO1xufVxuXG5kZWNsYXJlIGNvbnN0IElvbmljOiBhbnk7XG5cbmNvbnN0IEVYVEVOU0lPTlMgPSBbJ2pwZycsICdwbmcnLCAnanBlZycsICdnaWYnLCAnc3ZnJywgJ3RpZmYnXTtcblxuQEluamVjdGFibGUoe1xuICBwcm92aWRlZEluOiAncm9vdCcsXG59KVxuZXhwb3J0IGNsYXNzIEltYWdlTG9hZGVyU2VydmljZSB7XG5cbiAgLyoqXG4gICAqIEluZGljYXRlcyBpZiB0aGUgY2FjaGUgc2VydmljZSBpcyByZWFkeS5cbiAgICogV2hlbiB0aGUgY2FjaGUgc2VydmljZSBpc24ndCByZWFkeSwgaW1hZ2VzIGFyZSBsb2FkZWQgdmlhIGJyb3dzZXIgaW5zdGVhZC5cbiAgICovXG4gIHByaXZhdGUgaXNDYWNoZVJlYWR5ID0gZmFsc2U7XG4gIC8qKlxuICAgKiBJbmRpY2F0ZXMgaWYgdGhpcyBzZXJ2aWNlIGlzIGluaXRpYWxpemVkLlxuICAgKiBUaGlzIHNlcnZpY2UgaXMgaW5pdGlhbGl6ZWQgb25jZSBhbGwgdGhlIHNldHVwIGlzIGRvbmUuXG4gICAqL1xuICBwcml2YXRlIGlzSW5pdCA9IGZhbHNlO1xuICBwcml2YXRlIGluaXRQcm9taXNlUmVzb2x2ZTogRnVuY3Rpb247XG4gIHByaXZhdGUgaW5pdFByb21pc2UgPSBuZXcgUHJvbWlzZTx2b2lkPihyZXNvbHZlID0+IHRoaXMuaW5pdFByb21pc2VSZXNvbHZlID0gcmVzb2x2ZSk7XG4gIHByaXZhdGUgbG9ja1N1YmplY3QgPSBuZXcgU3ViamVjdDxib29sZWFuPigpO1xuICBwcml2YXRlIGxvY2skID0gdGhpcy5sb2NrU3ViamVjdC5hc09ic2VydmFibGUoKTtcbiAgLyoqXG4gICAqIE51bWJlciBvZiBjb25jdXJyZW50IHJlcXVlc3RzIGFsbG93ZWRcbiAgICovXG4gIHByaXZhdGUgY29uY3VycmVuY3kgPSA1O1xuICAvKipcbiAgICogUXVldWUgaXRlbXNcbiAgICovXG4gIHByaXZhdGUgcXVldWU6IFF1ZXVlSXRlbVtdID0gW107XG4gIHByaXZhdGUgcHJvY2Vzc2luZyA9IDA7XG4gIC8qKlxuICAgKiBGYXN0IGFjY2Vzc2libGUgT2JqZWN0IGZvciBjdXJyZW50bHkgcHJvY2Vzc2luZyBpdGVtc1xuICAgKi9cbiAgcHJpdmF0ZSBjdXJyZW50bHlQcm9jZXNzaW5nOiB7IFtpbmRleDogc3RyaW5nXTogUHJvbWlzZTxhbnk+IH0gPSB7fTtcbiAgcHJpdmF0ZSBjYWNoZUluZGV4OiBJbmRleEl0ZW1bXSA9IFtdO1xuICBwcml2YXRlIGN1cnJlbnRDYWNoZVNpemUgPSAwO1xuICBwcml2YXRlIGluZGV4ZWQgPSBmYWxzZTtcbiAgcHJpdmF0ZSBsb2NrZWRDYWxsc1F1ZXVlOiBGdW5jdGlvbltdID0gW107XG5cbiAgY29uc3RydWN0b3IoXG4gICAgcHJpdmF0ZSBjb25maWc6IEltYWdlTG9hZGVyQ29uZmlnU2VydmljZSxcbiAgICBwcml2YXRlIGZpbGU6IEZpbGUsXG4gICAgcHJpdmF0ZSBodHRwOiBIdHRwQ2xpZW50LFxuICAgIHByaXZhdGUgcGxhdGZvcm06IFBsYXRmb3JtLFxuICAgIHByaXZhdGUgd2VidmlldzogV2ViVmlldyxcbiAgKSB7XG4gICAgaWYgKCFwbGF0Zm9ybS5pcygnY29yZG92YScpKSB7XG4gICAgICAvLyB3ZSBhcmUgcnVubmluZyBvbiBhIGJyb3dzZXIsIG9yIHVzaW5nIGxpdmVyZWxvYWRcbiAgICAgIC8vIHBsdWdpbiB3aWxsIG5vdCBmdW5jdGlvbiBpbiB0aGlzIGNhc2VcbiAgICAgIHRoaXMuaXNJbml0ID0gdHJ1ZTtcbiAgICAgIHRoaXMudGhyb3dXYXJuaW5nKFxuICAgICAgICAnWW91IGFyZSBydW5uaW5nIG9uIGEgYnJvd3NlciBvciB1c2luZyBsaXZlcmVsb2FkLCBJb25pY0ltYWdlTG9hZGVyIHdpbGwgbm90IGZ1bmN0aW9uLCBmYWxsaW5nIGJhY2sgdG8gYnJvd3NlciBsb2FkaW5nLicsXG4gICAgICApO1xuICAgICAgdGhpcy5pbml0UHJvbWlzZVJlc29sdmUoKTtcbiAgICB9IGVsc2Uge1xuICAgICAgZnJvbUV2ZW50KGRvY3VtZW50LCAnZGV2aWNlcmVhZHknKVxuICAgICAgICAucGlwZShmaXJzdCgpKVxuICAgICAgICAuc3Vic2NyaWJlKHJlcyA9PiB7XG4gICAgICAgICAgaWYgKHRoaXMubmF0aXZlQXZhaWxhYmxlKSB7XG4gICAgICAgICAgICB0aGlzLmluaXRDYWNoZSgpO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAvLyB3ZSBhcmUgcnVubmluZyBvbiBhIGJyb3dzZXIsIG9yIHVzaW5nIGxpdmVyZWxvYWRcbiAgICAgICAgICAgIC8vIHBsdWdpbiB3aWxsIG5vdCBmdW5jdGlvbiBpbiB0aGlzIGNhc2VcbiAgICAgICAgICAgIHRoaXMuaXNJbml0ID0gdHJ1ZTtcbiAgICAgICAgICAgIHRoaXMuaW5pdFByb21pc2VSZXNvbHZlKCk7XG4gICAgICAgICAgICB0aGlzLnRocm93V2FybmluZyhcbiAgICAgICAgICAgICAgJ1lvdSBhcmUgcnVubmluZyBvbiBhIGJyb3dzZXIgb3IgdXNpbmcgbGl2ZXJlbG9hZCwgSW9uaWNJbWFnZUxvYWRlciB3aWxsIG5vdCBmdW5jdGlvbiwgZmFsbGluZyBiYWNrIHRvIGJyb3dzZXIgbG9hZGluZy4nLFxuICAgICAgICAgICAgKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cbiAgfVxuXG4gIGdldCBuYXRpdmVBdmFpbGFibGUoKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIEZpbGUuaW5zdGFsbGVkKCk7XG4gIH1cblxuICBwcml2YXRlIGdldCBpc0NhY2hlU3BhY2VFeGNlZWRlZCgpOiBib29sZWFuIHtcbiAgICByZXR1cm4gKFxuICAgICAgdGhpcy5jb25maWcubWF4Q2FjaGVTaXplID4gLTEgJiZcbiAgICAgIHRoaXMuY3VycmVudENhY2hlU2l6ZSA+IHRoaXMuY29uZmlnLm1heENhY2hlU2l6ZVxuICAgICk7XG4gIH1cblxuICBwcml2YXRlIGdldCBpc1dLV2ViVmlldygpOiBib29sZWFuIHtcbiAgICByZXR1cm4gKFxuICAgICAgdGhpcy5wbGF0Zm9ybS5pcygnaW9zJykgJiZcbiAgICAgICg8YW55PndpbmRvdykud2Via2l0ICYmXG4gICAgICAoPGFueT53aW5kb3cpLndlYmtpdC5tZXNzYWdlSGFuZGxlcnNcbiAgICApO1xuICB9XG5cbiAgcHJpdmF0ZSBnZXQgaXNJb25pY1dLV2ViVmlldygpOiBib29sZWFuIHtcbiAgICByZXR1cm4gKFxuICAgICAgLy8gIEltcG9ydGFudDogaXNXS1dlYnZpZXcgJiYgaXNJb25pY1dLV2VidmlldyBtdXN0IGJlIG11dHVhbGx5IGV4Y2x1c2UuXG4gICAgICAvLyAgT3RoZXJ3aXNlIHRoZSBsb2dpYyBmb3IgY29weWluZyB0byB0bXAgdW5kZXIgSU9TIHdpbGwgZmFpbC5cbiAgICAgICh0aGlzLnBsYXRmb3JtLmlzKCdhbmRyb2lkJykgJiYgdGhpcy53ZWJ2aWV3KSB8fFxuICAgICAgKHRoaXMucGxhdGZvcm0uaXMoJ2FuZHJvaWQnKSkgJiYgKGxvY2F0aW9uLmhvc3QgPT09ICdsb2NhbGhvc3Q6ODA4MCcpIHx8XG4gICAgICAoPGFueT53aW5kb3cpLkxpdmVSZWxvYWQpO1xuICB9XG5cbiAgcHJpdmF0ZSBnZXQgaXNEZXZTZXJ2ZXIoKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHdpbmRvd1snSW9uaWNEZXZTZXJ2ZXInXSAhPT0gdW5kZWZpbmVkO1xuICB9XG5cbiAgLyoqXG4gICAqIENoZWNrIGlmIHdlIGNhbiBwcm9jZXNzIG1vcmUgaXRlbXMgaW4gdGhlIHF1ZXVlXG4gICAqL1xuICBwcml2YXRlIGdldCBjYW5Qcm9jZXNzKCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0aGlzLnF1ZXVlLmxlbmd0aCA+IDAgJiYgdGhpcy5wcm9jZXNzaW5nIDwgdGhpcy5jb25jdXJyZW5jeTtcbiAgfVxuXG4gIHJlYWR5KCk6IFByb21pc2U8dm9pZD4ge1xuICAgIHJldHVybiB0aGlzLmluaXRQcm9taXNlO1xuICB9XG5cbiAgLyoqXG4gICAqIFByZWxvYWQgYW4gaW1hZ2VcbiAgICogQHBhcmFtIGltYWdlVXJsIEltYWdlIFVSTFxuICAgKiBAcmV0dXJucyByZXR1cm5zIGEgcHJvbWlzZSB0aGF0IHJlc29sdmVzIHdpdGggdGhlIGNhY2hlZCBpbWFnZSBVUkxcbiAgICovXG4gIHByZWxvYWQoaW1hZ2VVcmw6IHN0cmluZyk6IFByb21pc2U8c3RyaW5nPiB7XG4gICAgcmV0dXJuIHRoaXMuZ2V0SW1hZ2VQYXRoKGltYWdlVXJsKTtcbiAgfVxuXG4gIGdldEZpbGVDYWNoZURpcmVjdG9yeSgpIHtcbiAgICBpZiAodGhpcy5jb25maWcuY2FjaGVEaXJlY3RvcnlUeXBlID09PSAnZGF0YScpIHtcbiAgICAgIHJldHVybiB0aGlzLmZpbGUuZGF0YURpcmVjdG9yeTtcbiAgICB9IGVsc2UgaWYgKHRoaXMuY29uZmlnLmNhY2hlRGlyZWN0b3J5VHlwZSA9PT0gJ2V4dGVybmFsJykge1xuICAgICAgcmV0dXJuIHRoaXMucGxhdGZvcm0uaXMoJ2FuZHJvaWQnKSA/IHRoaXMuZmlsZS5leHRlcm5hbERhdGFEaXJlY3RvcnkgOiB0aGlzLmZpbGUuZG9jdW1lbnRzRGlyZWN0b3J5O1xuICAgIH1cbiAgICByZXR1cm4gdGhpcy5maWxlLmNhY2hlRGlyZWN0b3J5O1xuICB9XG5cbiAgLyoqXG4gICAqIENsZWFycyBjYWNoZSBvZiBhIHNpbmdsZSBpbWFnZVxuICAgKiBAcGFyYW0gaW1hZ2VVcmwgSW1hZ2UgVVJMXG4gICAqL1xuICBhc3luYyBjbGVhckltYWdlQ2FjaGUoaW1hZ2VVcmw6IHN0cmluZykge1xuICAgIGlmICghdGhpcy5wbGF0Zm9ybS5pcygnY29yZG92YScpKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgYXdhaXQgdGhpcy5yZWFkeSgpO1xuXG4gICAgdGhpcy5ydW5Mb2NrZWQoYXN5bmMgKCkgPT4ge1xuICAgICAgY29uc3QgZmlsZU5hbWUgPSB0aGlzLmNyZWF0ZUZpbGVOYW1lKGltYWdlVXJsKTtcbiAgICAgIGNvbnN0IHJvdXRlID0gdGhpcy5nZXRGaWxlQ2FjaGVEaXJlY3RvcnkoKSArIHRoaXMuY29uZmlnLmNhY2hlRGlyZWN0b3J5TmFtZTtcbiAgICAgIC8vIHBhdXNlIGFueSBvcGVyYXRpb25zXG4gICAgICB0aGlzLmlzSW5pdCA9IGZhbHNlO1xuXG4gICAgICB0cnkge1xuICAgICAgICBhd2FpdCB0aGlzLmZpbGUucmVtb3ZlRmlsZShyb3V0ZSwgZmlsZU5hbWUpO1xuXG4gICAgICAgIGlmICh0aGlzLmlzV0tXZWJWaWV3ICYmICF0aGlzLmlzSW9uaWNXS1dlYlZpZXcpIHtcbiAgICAgICAgICBhd2FpdCB0aGlzLmZpbGUucmVtb3ZlRmlsZSh0aGlzLmZpbGUudGVtcERpcmVjdG9yeSArIHRoaXMuY29uZmlnLmNhY2hlRGlyZWN0b3J5TmFtZSwgZmlsZU5hbWUpO1xuICAgICAgICB9XG4gICAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgICAgdGhpcy50aHJvd0Vycm9yKGVycik7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiB0aGlzLmluaXRDYWNoZSh0cnVlKTtcbiAgICB9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBDbGVhcnMgdGhlIGNhY2hlXG4gICAqL1xuICBhc3luYyBjbGVhckNhY2hlKCkge1xuICAgIGlmICghdGhpcy5wbGF0Zm9ybS5pcygnY29yZG92YScpKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgYXdhaXQgdGhpcy5yZWFkeSgpO1xuXG4gICAgdGhpcy5ydW5Mb2NrZWQoYXN5bmMgKCkgPT4ge1xuICAgICAgdHJ5IHtcbiAgICAgICAgYXdhaXQgdGhpcy5maWxlLnJlbW92ZVJlY3Vyc2l2ZWx5KHRoaXMuZ2V0RmlsZUNhY2hlRGlyZWN0b3J5KCksIHRoaXMuY29uZmlnLmNhY2hlRGlyZWN0b3J5TmFtZSk7XG5cbiAgICAgICAgaWYgKHRoaXMuaXNXS1dlYlZpZXcgJiYgIXRoaXMuaXNJb25pY1dLV2ViVmlldykge1xuICAgICAgICAgIC8vIGFsc28gY2xlYXIgdGhlIHRlbXAgZmlsZXNcbiAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgdGhpcy5maWxlLnJlbW92ZVJlY3Vyc2l2ZWx5KHRoaXMuZmlsZS50ZW1wRGlyZWN0b3J5LCB0aGlzLmNvbmZpZy5jYWNoZURpcmVjdG9yeU5hbWUpO1xuICAgICAgICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgICAgICAgLy8gTm9vcCBjYXRjaC4gUmVtb3ZpbmcgdGhlIHRlbXBEaXJlY3RvcnkgbWlnaHQgZmFpbCxcbiAgICAgICAgICAgIC8vIGFzIGl0IGlzIG5vdCBwZXJzaXN0ZW50LlxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICAgIHRoaXMudGhyb3dFcnJvcihlcnIpO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gdGhpcy5pbml0Q2FjaGUodHJ1ZSk7XG4gICAgfSk7XG4gIH1cblxuICAvKipcbiAgICogR2V0cyB0aGUgZmlsZXN5c3RlbSBwYXRoIG9mIGFuIGltYWdlLlxuICAgKiBUaGlzIHdpbGwgcmV0dXJuIHRoZSByZW1vdGUgcGF0aCBpZiBhbnl0aGluZyBnb2VzIHdyb25nIG9yIGlmIHRoZSBjYWNoZSBzZXJ2aWNlIGlzbid0IHJlYWR5IHlldC5cbiAgICogQHBhcmFtIGltYWdlVXJsIFRoZSByZW1vdGUgVVJMIG9mIHRoZSBpbWFnZVxuICAgKiBAcmV0dXJucyBSZXR1cm5zIGEgcHJvbWlzZSB0aGF0IHdpbGwgYWx3YXlzIHJlc29sdmUgd2l0aCBhbiBpbWFnZSBVUkxcbiAgICovXG4gIGFzeW5jIGdldEltYWdlUGF0aChpbWFnZVVybDogc3RyaW5nKTogUHJvbWlzZTxzdHJpbmc+IHtcbiAgICBpZiAodHlwZW9mIGltYWdlVXJsICE9PSAnc3RyaW5nJyB8fCBpbWFnZVVybC5sZW5ndGggPD0gMCkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdUaGUgaW1hZ2UgdXJsIHByb3ZpZGVkIHdhcyBlbXB0eSBvciBpbnZhbGlkLicpO1xuICAgIH1cblxuICAgIGF3YWl0IHRoaXMucmVhZHkoKTtcblxuICAgIGlmICghdGhpcy5pc0NhY2hlUmVhZHkpIHtcbiAgICAgIHRoaXMudGhyb3dXYXJuaW5nKCdUaGUgY2FjaGUgc3lzdGVtIGlzIG5vdCBydW5uaW5nLiBJbWFnZXMgd2lsbCBiZSBsb2FkZWQgYnkgeW91ciBicm93c2VyIGluc3RlYWQuJyk7XG4gICAgICByZXR1cm4gaW1hZ2VVcmw7XG4gICAgfVxuXG4gICAgaWYgKHRoaXMuaXNJbWFnZVVybFJlbGF0aXZlKGltYWdlVXJsKSkge1xuICAgICAgcmV0dXJuIGltYWdlVXJsO1xuICAgIH1cblxuICAgIHRyeSB7XG4gICAgICByZXR1cm4gYXdhaXQgdGhpcy5nZXRDYWNoZWRJbWFnZVBhdGgoaW1hZ2VVcmwpO1xuICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgLy8gaW1hZ2UgZG9lc24ndCBleGlzdCBpbiBjYWNoZSwgbGV0cyBmZXRjaCBpdCBhbmQgc2F2ZSBpdFxuICAgICAgcmV0dXJuIHRoaXMuYWRkSXRlbVRvUXVldWUoaW1hZ2VVcmwpO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgYXN5bmMgcHJvY2Vzc0xvY2tlZFF1ZXVlKCkge1xuICAgIGlmIChhd2FpdCB0aGlzLmdldExvY2tlZFN0YXRlKCkpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBpZiAodGhpcy5sb2NrZWRDYWxsc1F1ZXVlLmxlbmd0aCA+IDApIHtcbiAgICAgIGF3YWl0IHRoaXMuc2V0TG9ja2VkU3RhdGUodHJ1ZSk7XG5cbiAgICAgIHRyeSB7XG4gICAgICAgIGF3YWl0IHRoaXMubG9ja2VkQ2FsbHNRdWV1ZS5zbGljZSgwLCAxKVswXSgpO1xuICAgICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKCdFcnJvciBydW5uaW5nIGxvY2tlZCBmdW5jdGlvbjogJywgZXJyKTtcbiAgICAgIH1cblxuICAgICAgYXdhaXQgdGhpcy5zZXRMb2NrZWRTdGF0ZShmYWxzZSk7XG4gICAgICByZXR1cm4gdGhpcy5wcm9jZXNzTG9ja2VkUXVldWUoKTtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIGdldExvY2tlZFN0YXRlKCk6IFByb21pc2U8Ym9vbGVhbj4ge1xuICAgIHJldHVybiB0aGlzLmxvY2skXG4gICAgICAucGlwZSh0YWtlKDEpKVxuICAgICAgLnRvUHJvbWlzZSgpO1xuICB9XG5cbiAgcHJpdmF0ZSBhd2FpdFVubG9ja2VkKCk6IFByb21pc2U8Ym9vbGVhbj4ge1xuICAgIHJldHVybiB0aGlzLmxvY2skXG4gICAgICAucGlwZShcbiAgICAgICAgZmlsdGVyKGxvY2tlZCA9PiAhIWxvY2tlZCksXG4gICAgICAgIHRha2UoMSksXG4gICAgICApXG4gICAgICAudG9Qcm9taXNlKCk7XG4gIH1cblxuICBwcml2YXRlIGFzeW5jIHNldExvY2tlZFN0YXRlKGxvY2tlZDogYm9vbGVhbikge1xuICAgIHRoaXMubG9ja1N1YmplY3QubmV4dChsb2NrZWQpO1xuICB9XG5cbiAgcHJpdmF0ZSBydW5Mb2NrZWQoZm46IEZ1bmN0aW9uKSB7XG4gICAgdGhpcy5sb2NrZWRDYWxsc1F1ZXVlLnB1c2goZm4pO1xuICAgIHRoaXMucHJvY2Vzc0xvY2tlZFF1ZXVlKCk7XG4gIH1cblxuICAvKipcbiAgICogUmV0dXJucyBpZiBhbiBpbWFnZVVybCBpcyBhbiByZWxhdGl2ZSBwYXRoXG4gICAqIEBwYXJhbSBpbWFnZVVybFxuICAgKi9cbiAgcHJpdmF0ZSBpc0ltYWdlVXJsUmVsYXRpdmUoaW1hZ2VVcmw6IHN0cmluZykge1xuICAgIHJldHVybiAhL14oaHR0cHM/fGZpbGUpOlxcL1xcL1xcLz8vaS50ZXN0KGltYWdlVXJsKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBBZGQgYW4gaXRlbSB0byB0aGUgcXVldWVcbiAgICogQHBhcmFtIGltYWdlVXJsXG4gICAqIEBwYXJhbSByZXNvbHZlXG4gICAqIEBwYXJhbSByZWplY3RcbiAgICovXG4gIHByaXZhdGUgYWRkSXRlbVRvUXVldWUoaW1hZ2VVcmw6IHN0cmluZywgcmVzb2x2ZT8sIHJlamVjdD8pOiB2b2lkIHwgUHJvbWlzZTxhbnk+IHtcbiAgICBsZXQgcDogdm9pZCB8IFByb21pc2U8YW55PjtcblxuICAgIGlmICghcmVzb2x2ZSAmJiAhcmVqZWN0KSB7XG4gICAgICBwID0gbmV3IFByb21pc2U8YW55PigocmVzLCByZWopID0+IHtcbiAgICAgICAgcmVzb2x2ZSA9IHJlcztcbiAgICAgICAgcmVqZWN0ID0gcmVqO1xuICAgICAgfSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJlc29sdmUgPSByZXNvbHZlIHx8ICgoKSA9PiB7XG4gICAgICB9KTtcbiAgICAgIHJlamVjdCA9IHJlamVjdCB8fCAoKCkgPT4ge1xuICAgICAgfSk7XG4gICAgfVxuXG4gICAgdGhpcy5xdWV1ZS5wdXNoKHtcbiAgICAgIGltYWdlVXJsLFxuICAgICAgcmVzb2x2ZSxcbiAgICAgIHJlamVjdCxcbiAgICB9KTtcblxuICAgIHRoaXMucHJvY2Vzc1F1ZXVlKCk7XG5cbiAgICByZXR1cm4gcDtcbiAgfVxuXG4gIC8qKlxuICAgKiBQcm9jZXNzZXMgb25lIGl0ZW0gZnJvbSB0aGUgcXVldWVcbiAgICovXG4gIHByaXZhdGUgYXN5bmMgcHJvY2Vzc1F1ZXVlKCkge1xuICAgIC8vIG1ha2Ugc3VyZSB3ZSBjYW4gcHJvY2VzcyBpdGVtcyBmaXJzdFxuICAgIGlmICghdGhpcy5jYW5Qcm9jZXNzKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgLy8gaW5jcmVhc2UgdGhlIHByb2Nlc3NpbmcgbnVtYmVyXG4gICAgdGhpcy5wcm9jZXNzaW5nKys7XG5cbiAgICAvLyB0YWtlIHRoZSBmaXJzdCBpdGVtIGZyb20gcXVldWVcbiAgICBjb25zdCBjdXJyZW50SXRlbTogUXVldWVJdGVtID0gdGhpcy5xdWV1ZS5zcGxpY2UoMCwgMSlbMF07XG5cbiAgICAvLyBmdW5jdGlvbiB0byBjYWxsIHdoZW4gZG9uZSBwcm9jZXNzaW5nIHRoaXMgaXRlbVxuICAgIC8vIHRoaXMgd2lsbCByZWR1Y2UgdGhlIHByb2Nlc3NpbmcgbnVtYmVyXG4gICAgLy8gdGhlbiB3aWxsIGV4ZWN1dGUgdGhpcyBmdW5jdGlvbiBhZ2FpbiB0byBwcm9jZXNzIGFueSByZW1haW5pbmcgaXRlbXNcbiAgICBjb25zdCBkb25lID0gKCkgPT4ge1xuICAgICAgdGhpcy5wcm9jZXNzaW5nLS07XG4gICAgICB0aGlzLnByb2Nlc3NRdWV1ZSgpO1xuXG4gICAgICAvLyBvbmx5IGRlbGV0ZSBpZiBpdCdzIHRoZSBsYXN0L3VuaXF1ZSBvY2N1cnJlbmNlIGluIHRoZSBxdWV1ZVxuICAgICAgaWYgKHRoaXMuY3VycmVudGx5UHJvY2Vzc2luZ1tjdXJyZW50SXRlbS5pbWFnZVVybF0gIT09IHVuZGVmaW5lZCAmJiAhdGhpcy5jdXJyZW50bHlJblF1ZXVlKGN1cnJlbnRJdGVtLmltYWdlVXJsKSkge1xuICAgICAgICBkZWxldGUgdGhpcy5jdXJyZW50bHlQcm9jZXNzaW5nW2N1cnJlbnRJdGVtLmltYWdlVXJsXTtcbiAgICAgIH1cbiAgICB9O1xuXG4gICAgY29uc3QgZXJyb3IgPSAoZSkgPT4ge1xuICAgICAgY3VycmVudEl0ZW0ucmVqZWN0KCk7XG4gICAgICB0aGlzLnRocm93RXJyb3IoZSk7XG4gICAgICBkb25lKCk7XG4gICAgfTtcblxuICAgIGlmICh0aGlzLmN1cnJlbnRseVByb2Nlc3NpbmdbY3VycmVudEl0ZW0uaW1hZ2VVcmxdICE9PSB1bmRlZmluZWQpIHtcbiAgICAgIHRyeSB7XG4gICAgICAgIC8vIFByZXZlbnRlZCBzYW1lIEltYWdlIGZyb20gbG9hZGluZyBhdCB0aGUgc2FtZSB0aW1lXG4gICAgICAgIGF3YWl0IHRoaXMuY3VycmVudGx5UHJvY2Vzc2luZ1tjdXJyZW50SXRlbS5pbWFnZVVybF07XG4gICAgICAgIGNvbnN0IGxvY2FsVXJsID0gYXdhaXQgdGhpcy5nZXRDYWNoZWRJbWFnZVBhdGgoY3VycmVudEl0ZW0uaW1hZ2VVcmwpO1xuICAgICAgICBjdXJyZW50SXRlbS5yZXNvbHZlKGxvY2FsVXJsKTtcbiAgICAgICAgZG9uZSgpO1xuICAgICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICAgIGVycm9yKGVycik7XG4gICAgICB9XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgdGhpcy5jdXJyZW50bHlQcm9jZXNzaW5nW2N1cnJlbnRJdGVtLmltYWdlVXJsXSA9IChhc3luYyAoKSA9PiB7XG4gICAgICAvLyBwcm9jZXNzIG1vcmUgaXRlbXMgY29uY3VycmVudGx5IGlmIHdlIGNhblxuICAgICAgaWYgKHRoaXMuY2FuUHJvY2Vzcykge1xuICAgICAgICB0aGlzLnByb2Nlc3NRdWV1ZSgpO1xuICAgICAgfVxuXG4gICAgICBjb25zdCBsb2NhbERpciA9IHRoaXMuZ2V0RmlsZUNhY2hlRGlyZWN0b3J5KCkgKyB0aGlzLmNvbmZpZy5jYWNoZURpcmVjdG9yeU5hbWUgKyAnLyc7XG4gICAgICBjb25zdCBmaWxlTmFtZSA9IHRoaXMuY3JlYXRlRmlsZU5hbWUoY3VycmVudEl0ZW0uaW1hZ2VVcmwpO1xuXG4gICAgICB0cnkge1xuICAgICAgICBjb25zdCBkYXRhOiBCbG9iID0gYXdhaXQgdGhpcy5odHRwLmdldChjdXJyZW50SXRlbS5pbWFnZVVybCwge1xuICAgICAgICAgIHJlc3BvbnNlVHlwZTogJ2Jsb2InLFxuICAgICAgICAgIGhlYWRlcnM6IHRoaXMuY29uZmlnLmh0dHBIZWFkZXJzLFxuICAgICAgICB9KS50b1Byb21pc2UoKTtcblxuICAgICAgICBjb25zdCBmaWxlID0gYXdhaXQgdGhpcy5maWxlLndyaXRlRmlsZShsb2NhbERpciwgZmlsZU5hbWUsIGRhdGEsIHtyZXBsYWNlOiB0cnVlfSkgYXMgRmlsZUVudHJ5O1xuXG4gICAgICAgIGlmICh0aGlzLmlzQ2FjaGVTcGFjZUV4Y2VlZGVkKSB7XG4gICAgICAgICAgdGhpcy5tYWludGFpbkNhY2hlU2l6ZSgpO1xuICAgICAgICB9XG5cbiAgICAgICAgYXdhaXQgdGhpcy5hZGRGaWxlVG9JbmRleChmaWxlKTtcbiAgICAgICAgY29uc3QgbG9jYWxVcmwgPSBhd2FpdCB0aGlzLmdldENhY2hlZEltYWdlUGF0aChjdXJyZW50SXRlbS5pbWFnZVVybCk7XG4gICAgICAgIGN1cnJlbnRJdGVtLnJlc29sdmUobG9jYWxVcmwpO1xuICAgICAgICBkb25lKCk7XG4gICAgICAgIHRoaXMubWFpbnRhaW5DYWNoZVNpemUoKTtcbiAgICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgICBlcnJvcihlcnIpO1xuICAgICAgICB0aHJvdyBlcnI7XG4gICAgICB9XG4gICAgfSkoKTtcblxuICB9XG5cbiAgLyoqXG4gICAqIFNlYXJjaCBpZiB0aGUgdXJsIGlzIGN1cnJlbnRseSBpbiB0aGUgcXVldWVcbiAgICogQHBhcmFtIGltYWdlVXJsIEltYWdlIHVybCB0byBzZWFyY2hcbiAgICovXG4gIHByaXZhdGUgY3VycmVudGx5SW5RdWV1ZShpbWFnZVVybDogc3RyaW5nKSB7XG4gICAgcmV0dXJuIHRoaXMucXVldWUuc29tZShpdGVtID0+IGl0ZW0uaW1hZ2VVcmwgPT09IGltYWdlVXJsKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBJbml0aWFsaXplIHRoZSBjYWNoZSBzZXJ2aWNlXG4gICAqIEBwYXJhbSBbcmVwbGFjZV0gV2hldGhlciB0byByZXBsYWNlIHRoZSBjYWNoZSBkaXJlY3RvcnkgaWYgaXQgYWxyZWFkeSBleGlzdHNcbiAgICovXG4gIHByaXZhdGUgYXN5bmMgaW5pdENhY2hlKHJlcGxhY2U/OiBib29sZWFuKSB7XG4gICAgdGhpcy5jb25jdXJyZW5jeSA9IHRoaXMuY29uZmlnLmNvbmN1cnJlbmN5O1xuXG4gICAgLy8gY3JlYXRlIGNhY2hlIGRpcmVjdG9yaWVzIGlmIHRoZXkgZG8gbm90IGV4aXN0XG4gICAgdHJ5IHtcbiAgICAgIGF3YWl0IHRoaXMuY3JlYXRlQ2FjaGVEaXJlY3RvcnkocmVwbGFjZSk7XG4gICAgICBhd2FpdCB0aGlzLmluZGV4Q2FjaGUoKTtcbiAgICAgIHRoaXMuaXNDYWNoZVJlYWR5ID0gdHJ1ZTtcbiAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgIHRoaXMudGhyb3dFcnJvcihlcnIpO1xuICAgIH1cblxuICAgIHRoaXMuaXNJbml0ID0gdHJ1ZTtcbiAgICB0aGlzLmluaXRQcm9taXNlUmVzb2x2ZSgpO1xuICB9XG5cbiAgLyoqXG4gICAqIEFkZHMgYSBmaWxlIHRvIGluZGV4LlxuICAgKiBBbHNvIGRlbGV0ZXMgYW55IGZpbGVzIGlmIHRoZXkgYXJlIG9sZGVyIHRoYW4gdGhlIHNldCBtYXhpbXVtIGNhY2hlIGFnZS5cbiAgICogQHBhcmFtIGZpbGUgRmlsZUVudHJ5IHRvIGluZGV4XG4gICAqL1xuICBwcml2YXRlIGFzeW5jIGFkZEZpbGVUb0luZGV4KGZpbGU6IEZpbGVFbnRyeSk6IFByb21pc2U8YW55PiB7XG4gICAgY29uc3QgbWV0YWRhdGEgPSBhd2FpdCBuZXcgUHJvbWlzZTxhbnk+KChyZXNvbHZlLCByZWplY3QpID0+IGZpbGUuZ2V0TWV0YWRhdGEocmVzb2x2ZSwgcmVqZWN0KSk7XG5cbiAgICBpZiAoXG4gICAgICB0aGlzLmNvbmZpZy5tYXhDYWNoZUFnZSA+IC0xICYmXG4gICAgICBEYXRlLm5vdygpIC0gbWV0YWRhdGEubW9kaWZpY2F0aW9uVGltZS5nZXRUaW1lKCkgPlxuICAgICAgdGhpcy5jb25maWcubWF4Q2FjaGVBZ2VcbiAgICApIHtcbiAgICAgIC8vIGZpbGUgYWdlIGV4Y2VlZHMgbWF4aW11bSBjYWNoZSBhZ2VcbiAgICAgIHJldHVybiB0aGlzLnJlbW92ZUZpbGUoZmlsZS5uYW1lKTtcbiAgICB9IGVsc2Uge1xuICAgICAgLy8gZmlsZSBhZ2UgZG9lc24ndCBleGNlZWQgbWF4aW11bSBjYWNoZSBhZ2UsIG9yIG1heGltdW0gY2FjaGUgYWdlIGlzbid0IHNldFxuICAgICAgdGhpcy5jdXJyZW50Q2FjaGVTaXplICs9IG1ldGFkYXRhLnNpemU7XG5cbiAgICAgIC8vIGFkZCBpdGVtIHRvIGluZGV4XG4gICAgICB0aGlzLmNhY2hlSW5kZXgucHVzaCh7XG4gICAgICAgIG5hbWU6IGZpbGUubmFtZSxcbiAgICAgICAgbW9kaWZpY2F0aW9uVGltZTogbWV0YWRhdGEubW9kaWZpY2F0aW9uVGltZSxcbiAgICAgICAgc2l6ZTogbWV0YWRhdGEuc2l6ZSxcbiAgICAgIH0pO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBJbmRleGVzIHRoZSBjYWNoZSBpZiBuZWNlc3NhcnlcbiAgICovXG4gIHByaXZhdGUgYXN5bmMgaW5kZXhDYWNoZSgpOiBQcm9taXNlPHZvaWQ+IHtcbiAgICB0aGlzLmNhY2hlSW5kZXggPSBbXTtcblxuICAgIHRyeSB7XG4gICAgICBjb25zdCBmaWxlcyA9IGF3YWl0IHRoaXMuZmlsZS5saXN0RGlyKHRoaXMuZ2V0RmlsZUNhY2hlRGlyZWN0b3J5KCksIHRoaXMuY29uZmlnLmNhY2hlRGlyZWN0b3J5TmFtZSk7XG4gICAgICBhd2FpdCBQcm9taXNlLmFsbChmaWxlcy5tYXAodGhpcy5hZGRGaWxlVG9JbmRleC5iaW5kKHRoaXMpKSk7XG4gICAgICAvLyBTb3J0IGl0ZW1zIGJ5IGRhdGUuIE1vc3QgcmVjZW50IHRvIG9sZGVzdC5cbiAgICAgIHRoaXMuY2FjaGVJbmRleCA9IHRoaXMuY2FjaGVJbmRleC5zb3J0KFxuICAgICAgICAoYTogSW5kZXhJdGVtLCBiOiBJbmRleEl0ZW0pOiBudW1iZXIgPT4gKGEgPiBiID8gLTEgOiBhIDwgYiA/IDEgOiAwKSxcbiAgICAgICk7XG4gICAgICB0aGlzLmluZGV4ZWQgPSB0cnVlO1xuICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgdGhpcy50aHJvd0Vycm9yKGVycik7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIFRoaXMgbWV0aG9kIHJ1bnMgZXZlcnkgdGltZSBhIG5ldyBmaWxlIGlzIGFkZGVkLlxuICAgKiBJdCBjaGVja3MgdGhlIGNhY2hlIHNpemUgYW5kIGVuc3VyZXMgdGhhdCBpdCBkb2Vzbid0IGV4Y2VlZCB0aGUgbWF4aW11bSBjYWNoZSBzaXplIHNldCBpbiB0aGUgY29uZmlnLlxuICAgKiBJZiB0aGUgbGltaXQgaXMgcmVhY2hlZCwgaXQgd2lsbCBkZWxldGUgb2xkIGltYWdlcyB0byBjcmVhdGUgZnJlZSBzcGFjZS5cbiAgICovXG4gIHByaXZhdGUgYXN5bmMgbWFpbnRhaW5DYWNoZVNpemUoKSB7XG4gICAgaWYgKHRoaXMuY29uZmlnLm1heENhY2hlU2l6ZSA+IC0xICYmIHRoaXMuaW5kZXhlZCkge1xuICAgICAgY29uc3QgbWFpbnRhaW4gPSBhc3luYyAoKSA9PiB7XG4gICAgICAgIGlmICh0aGlzLmN1cnJlbnRDYWNoZVNpemUgPiB0aGlzLmNvbmZpZy5tYXhDYWNoZVNpemUpIHtcbiAgICAgICAgICAvLyBncmFiIHRoZSBmaXJzdCBpdGVtIGluIGluZGV4IHNpbmNlIGl0J3MgdGhlIG9sZGVzdCBvbmVcbiAgICAgICAgICBjb25zdCBmaWxlOiBJbmRleEl0ZW0gPSB0aGlzLmNhY2hlSW5kZXguc3BsaWNlKDAsIDEpWzBdO1xuXG4gICAgICAgICAgaWYgKHR5cGVvZiBmaWxlID09PSAndW5kZWZpbmVkJykge1xuICAgICAgICAgICAgcmV0dXJuIG1haW50YWluKCk7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgLy8gZGVsZXRlIHRoZSBmaWxlIHRoZW4gcHJvY2VzcyBuZXh0IGZpbGUgaWYgbmVjZXNzYXJ5XG4gICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIGF3YWl0IHRoaXMucmVtb3ZlRmlsZShmaWxlLm5hbWUpO1xuICAgICAgICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgICAgICAgLy8gaWdub3JlIGVycm9ycywgbm90aGluZyB3ZSBjYW4gZG8gYWJvdXQgaXRcbiAgICAgICAgICB9XG5cbiAgICAgICAgICB0aGlzLmN1cnJlbnRDYWNoZVNpemUgLT0gZmlsZS5zaXplO1xuICAgICAgICAgIHJldHVybiBtYWludGFpbigpO1xuICAgICAgICB9XG4gICAgICB9O1xuXG4gICAgICByZXR1cm4gbWFpbnRhaW4oKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogUmVtb3ZlIGEgZmlsZVxuICAgKiBAcGFyYW0gZmlsZSBUaGUgbmFtZSBvZiB0aGUgZmlsZSB0byByZW1vdmVcbiAgICovXG4gIHByaXZhdGUgYXN5bmMgcmVtb3ZlRmlsZShmaWxlOiBzdHJpbmcpOiBQcm9taXNlPGFueT4ge1xuICAgIGF3YWl0IHRoaXMuZmlsZS5yZW1vdmVGaWxlKHRoaXMuZ2V0RmlsZUNhY2hlRGlyZWN0b3J5KCkgKyB0aGlzLmNvbmZpZy5jYWNoZURpcmVjdG9yeU5hbWUsIGZpbGUpO1xuXG4gICAgaWYgKHRoaXMuaXNXS1dlYlZpZXcgJiYgIXRoaXMuaXNJb25pY1dLV2ViVmlldykge1xuICAgICAgdHJ5IHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZmlsZS5yZW1vdmVGaWxlKHRoaXMuZmlsZS50ZW1wRGlyZWN0b3J5ICsgdGhpcy5jb25maWcuY2FjaGVEaXJlY3RvcnlOYW1lLCBmaWxlKTtcbiAgICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgICAvLyBOb29wIGNhdGNoLiBSZW1vdmluZyB0aGUgZmlsZXMgZnJvbSB0ZW1wRGlyZWN0b3J5IG1pZ2h0IGZhaWwsIGFzIGl0IGlzIG5vdCBwZXJzaXN0ZW50LlxuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBHZXQgdGhlIGxvY2FsIHBhdGggb2YgYSBwcmV2aW91c2x5IGNhY2hlZCBpbWFnZSBpZiBleGlzdHNcbiAgICogQHBhcmFtIHVybCBUaGUgcmVtb3RlIFVSTCBvZiB0aGUgaW1hZ2VcbiAgICogQHJldHVybnMgUmV0dXJucyBhIHByb21pc2UgdGhhdCByZXNvbHZlcyB3aXRoIHRoZSBsb2NhbCBwYXRoIGlmIGV4aXN0cywgb3IgcmVqZWN0cyBpZiBkb2Vzbid0IGV4aXN0XG4gICAqL1xuICBwcml2YXRlIGFzeW5jIGdldENhY2hlZEltYWdlUGF0aCh1cmw6IHN0cmluZyk6IFByb21pc2U8c3RyaW5nPiB7XG4gICAgYXdhaXQgdGhpcy5yZWFkeSgpO1xuXG4gICAgaWYgKCF0aGlzLmlzQ2FjaGVSZWFkeSkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdDYWNoZSBpcyBub3QgcmVhZHknKTtcbiAgICB9XG5cbiAgICAvLyBpZiB3ZSdyZSBydW5uaW5nIHdpdGggbGl2ZXJlbG9hZCwgaWdub3JlIGNhY2hlIGFuZCBjYWxsIHRoZSByZXNvdXJjZSBmcm9tIGl0J3MgVVJMXG4gICAgaWYgKHRoaXMuaXNEZXZTZXJ2ZXIpIHtcbiAgICAgIHJldHVybiB1cmw7XG4gICAgfVxuXG4gICAgLy8gZ2V0IGZpbGUgbmFtZVxuICAgIGNvbnN0IGZpbGVOYW1lID0gdGhpcy5jcmVhdGVGaWxlTmFtZSh1cmwpO1xuXG4gICAgLy8gZ2V0IGZ1bGwgcGF0aFxuICAgIGNvbnN0IGRpclBhdGggPSB0aGlzLmdldEZpbGVDYWNoZURpcmVjdG9yeSgpICsgdGhpcy5jb25maWcuY2FjaGVEaXJlY3RvcnlOYW1lLFxuICAgICAgdGVtcERpclBhdGggPSB0aGlzLmZpbGUudGVtcERpcmVjdG9yeSArIHRoaXMuY29uZmlnLmNhY2hlRGlyZWN0b3J5TmFtZTtcblxuICAgIHRyeSB7XG4gICAgICAvLyBjaGVjayBpZiBleGlzdHNcbiAgICAgIGNvbnN0IGZpbGVFbnRyeSA9IGF3YWl0IHRoaXMuZmlsZS5yZXNvbHZlTG9jYWxGaWxlc3lzdGVtVXJsKGRpclBhdGggKyAnLycgKyBmaWxlTmFtZSkgYXMgRmlsZUVudHJ5O1xuXG4gICAgICAvLyBmaWxlIGV4aXN0cyBpbiBjYWNoZVxuICAgICAgaWYgKHRoaXMuY29uZmlnLmltYWdlUmV0dXJuVHlwZSA9PT0gJ2Jhc2U2NCcpIHtcbiAgICAgICAgLy8gcmVhZCB0aGUgZmlsZSBhcyBkYXRhIHVybCBhbmQgcmV0dXJuIHRoZSBiYXNlNjQgc3RyaW5nLlxuICAgICAgICAvLyBzaG91bGQgYWx3YXlzIGJlIHN1Y2Nlc3NmdWwgYXMgdGhlIGV4aXN0ZW5jZSBvZiB0aGUgZmlsZVxuICAgICAgICAvLyBpcyBhbHJlYWR5IGVuc3VyZWRcbiAgICAgICAgY29uc3QgYmFzZTY0OiBzdHJpbmcgPSBhd2FpdCB0aGlzLmZpbGUucmVhZEFzRGF0YVVSTChkaXJQYXRoLCBmaWxlTmFtZSk7XG4gICAgICAgIHJldHVybiBiYXNlNjQucmVwbGFjZSgnZGF0YTpudWxsJywgJ2RhdGE6Ki8qJyk7XG4gICAgICB9IGVsc2UgaWYgKHRoaXMuY29uZmlnLmltYWdlUmV0dXJuVHlwZSAhPT0gJ3VyaScpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICAvLyBub3cgY2hlY2sgaWYgaU9TIGRldmljZSAmIHVzaW5nIFdLV2ViVmlldyBFbmdpbmUuXG4gICAgICAvLyBpbiB0aGlzIGNhc2Ugb25seSB0aGUgdGVtcERpcmVjdG9yeSBpcyBhY2Nlc3NpYmxlLFxuICAgICAgLy8gdGhlcmVmb3JlIHRoZSBmaWxlIG5lZWRzIHRvIGJlIGNvcGllZCBpbnRvIHRoYXQgZGlyZWN0b3J5IGZpcnN0IVxuICAgICAgaWYgKHRoaXMuaXNJb25pY1dLV2ViVmlldykge1xuICAgICAgICByZXR1cm4gdGhpcy5ub3JtYWxpemVVcmwoZmlsZUVudHJ5KTtcbiAgICAgIH1cblxuICAgICAgaWYgKCF0aGlzLmlzV0tXZWJWaWV3KSB7XG4gICAgICAgIC8vIHJldHVybiBuYXRpdmUgcGF0aFxuICAgICAgICByZXR1cm4gZmlsZUVudHJ5Lm5hdGl2ZVVSTDtcbiAgICAgIH1cblxuICAgICAgLy8gY2hlY2sgaWYgZmlsZSBhbHJlYWR5IGV4aXN0cyBpbiB0ZW1wIGRpcmVjdG9yeVxuICAgICAgdHJ5IHtcbiAgICAgICAgY29uc3QgdGVtcEZpbGVFbnRyeSA9IGF3YWl0IHRoaXMuZmlsZS5yZXNvbHZlTG9jYWxGaWxlc3lzdGVtVXJsKHRlbXBEaXJQYXRoICsgJy8nICsgZmlsZU5hbWUpIGFzIEZpbGVFbnRyeTtcbiAgICAgICAgLy8gZmlsZSBleGlzdHMgaW4gdGVtcCBkaXJlY3RvcnlcbiAgICAgICAgLy8gcmV0dXJuIG5hdGl2ZSBwYXRoXG4gICAgICAgIHJldHVybiB0aGlzLm5vcm1hbGl6ZVVybCh0ZW1wRmlsZUVudHJ5KTtcbiAgICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgICAvLyBmaWxlIGRvZXMgbm90IHlldCBleGlzdCBpbiB0aGUgdGVtcCBkaXJlY3RvcnkuXG4gICAgICAgIC8vIGNvcHkgaXQhXG4gICAgICAgIGNvbnN0IHRlbXBGaWxlRW50cnkgPSBhd2FpdCB0aGlzLmZpbGVcbiAgICAgICAgICAuY29weUZpbGUoZGlyUGF0aCwgZmlsZU5hbWUsIHRlbXBEaXJQYXRoLCBmaWxlTmFtZSkgYXMgRmlsZUVudHJ5O1xuXG4gICAgICAgIC8vIG5vdyB0aGUgZmlsZSBleGlzdHMgaW4gdGhlIHRlbXAgZGlyZWN0b3J5XG4gICAgICAgIC8vIHJldHVybiBuYXRpdmUgcGF0aFxuICAgICAgICByZXR1cm4gdGhpcy5ub3JtYWxpemVVcmwodGVtcEZpbGVFbnRyeSk7XG4gICAgICB9XG4gICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ0ZpbGUgZG9lcyBub3QgZXhpc3QnKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogTm9ybWFsaXplcyB0aGUgaW1hZ2UgdXJpIHRvIGEgdmVyc2lvbiB0aGF0IGNhbiBiZSBsb2FkZWQgaW4gdGhlIHdlYnZpZXdcbiAgICogQHBhcmFtIGZpbGVFbnRyeSB0aGUgRmlsZUVudHJ5IG9mIHRoZSBpbWFnZSBmaWxlXG4gICAqIEByZXR1cm5zIHRoZSBub3JtYWxpemVkIFVybFxuICAgKi9cblxuICBwcml2YXRlIG5vcm1hbGl6ZVVybChmaWxlRW50cnk6IEZpbGVFbnRyeSk6IHN0cmluZyB7XG4gICAgLy8gVXNlIElvbmljIG5vcm1hbGl6ZVVybCB0byBnZW5lcmF0ZSB0aGUgcmlnaHQgVVJMIGZvciBJb25pYyBXS1dlYlZpZXdcbiAgICBpZiAoSW9uaWMgJiYgdHlwZW9mIElvbmljLm5vcm1hbGl6ZVVSTCA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgcmV0dXJuIElvbmljLm5vcm1hbGl6ZVVSTChmaWxlRW50cnkubmF0aXZlVVJMKTtcbiAgICB9XG4gICAgLy8gdXNlIG5ldyB3ZWJ2aWV3IGZ1bmN0aW9uIHRvIGRvIHRoZSB0cmlja1xuICAgIGlmICh0aGlzLndlYnZpZXcpIHtcbiAgICAgIHJldHVybiB0aGlzLndlYnZpZXcuY29udmVydEZpbGVTcmMoZmlsZUVudHJ5Lm5hdGl2ZVVSTCk7XG4gICAgfVxuICAgIHJldHVybiBmaWxlRW50cnkubmF0aXZlVVJMO1xuICB9XG5cbiAgLyoqXG4gICAqIFRocm93cyBhIGNvbnNvbGUgZXJyb3IgaWYgZGVidWcgbW9kZSBpcyBlbmFibGVkXG4gICAqIEBwYXJhbSBhcmdzIEVycm9yIG1lc3NhZ2VcbiAgICovXG4gIHByaXZhdGUgdGhyb3dFcnJvciguLi5hcmdzOiBhbnlbXSkge1xuICAgIGlmICh0aGlzLmNvbmZpZy5kZWJ1Z01vZGUpIHtcbiAgICAgIGFyZ3MudW5zaGlmdCgnSW1hZ2VMb2FkZXIgRXJyb3I6ICcpO1xuICAgICAgY29uc29sZS5lcnJvci5hcHBseShjb25zb2xlLCBhcmdzKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogVGhyb3dzIGEgY29uc29sZSB3YXJuaW5nIGlmIGRlYnVnIG1vZGUgaXMgZW5hYmxlZFxuICAgKiBAcGFyYW0gYXJncyBFcnJvciBtZXNzYWdlXG4gICAqL1xuICBwcml2YXRlIHRocm93V2FybmluZyguLi5hcmdzOiBhbnlbXSkge1xuICAgIGlmICh0aGlzLmNvbmZpZy5kZWJ1Z01vZGUpIHtcbiAgICAgIGFyZ3MudW5zaGlmdCgnSW1hZ2VMb2FkZXIgV2FybmluZzogJyk7XG4gICAgICBjb25zb2xlLndhcm4uYXBwbHkoY29uc29sZSwgYXJncyk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIENoZWNrIGlmIHRoZSBjYWNoZSBkaXJlY3RvcnkgZXhpc3RzXG4gICAqIEBwYXJhbSBkaXJlY3RvcnkgVGhlIGRpcmVjdG9yeSB0byBjaGVjay4gRWl0aGVyIHRoaXMuZmlsZS50ZW1wRGlyZWN0b3J5IG9yIHRoaXMuZ2V0RmlsZUNhY2hlRGlyZWN0b3J5KClcbiAgICogQHJldHVybnMgUmV0dXJucyBhIHByb21pc2UgdGhhdCByZXNvbHZlcyBpZiBleGlzdHMsIGFuZCByZWplY3RzIGlmIGl0IGRvZXNuJ3RcbiAgICovXG4gIHByaXZhdGUgY2FjaGVEaXJlY3RvcnlFeGlzdHMoZGlyZWN0b3J5OiBzdHJpbmcpOiBQcm9taXNlPGJvb2xlYW4+IHtcbiAgICByZXR1cm4gdGhpcy5maWxlLmNoZWNrRGlyKGRpcmVjdG9yeSwgdGhpcy5jb25maWcuY2FjaGVEaXJlY3RvcnlOYW1lKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBDcmVhdGUgdGhlIGNhY2hlIGRpcmVjdG9yaWVzXG4gICAqIEBwYXJhbSByZXBsYWNlIG92ZXJyaWRlIGRpcmVjdG9yeSBpZiBleGlzdHNcbiAgICogQHJldHVybnMgUmV0dXJucyBhIHByb21pc2UgdGhhdCByZXNvbHZlcyBpZiB0aGUgZGlyZWN0b3JpZXMgd2VyZSBjcmVhdGVkLCBhbmQgcmVqZWN0cyBvbiBlcnJvclxuICAgKi9cbiAgcHJpdmF0ZSBjcmVhdGVDYWNoZURpcmVjdG9yeShyZXBsYWNlOiBib29sZWFuID0gZmFsc2UpOiBQcm9taXNlPGFueT4ge1xuICAgIGxldCBjYWNoZURpcmVjdG9yeVByb21pc2U6IFByb21pc2U8YW55PiwgdGVtcERpcmVjdG9yeVByb21pc2U6IFByb21pc2U8YW55PjtcblxuICAgIGlmIChyZXBsYWNlKSB7XG4gICAgICAvLyBjcmVhdGUgb3IgcmVwbGFjZSB0aGUgY2FjaGUgZGlyZWN0b3J5XG4gICAgICBjYWNoZURpcmVjdG9yeVByb21pc2UgPSB0aGlzLmZpbGUuY3JlYXRlRGlyKHRoaXMuZ2V0RmlsZUNhY2hlRGlyZWN0b3J5KCksIHRoaXMuY29uZmlnLmNhY2hlRGlyZWN0b3J5TmFtZSwgcmVwbGFjZSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIC8vIGNoZWNrIGlmIHRoZSBjYWNoZSBkaXJlY3RvcnkgZXhpc3RzLlxuICAgICAgLy8gaWYgaXQgZG9lcyBub3QgZXhpc3QgY3JlYXRlIGl0IVxuICAgICAgY2FjaGVEaXJlY3RvcnlQcm9taXNlID0gdGhpcy5jYWNoZURpcmVjdG9yeUV4aXN0cyh0aGlzLmdldEZpbGVDYWNoZURpcmVjdG9yeSgpKVxuICAgICAgICAuY2F0Y2goKCkgPT4gdGhpcy5maWxlLmNyZWF0ZURpcih0aGlzLmdldEZpbGVDYWNoZURpcmVjdG9yeSgpLCB0aGlzLmNvbmZpZy5jYWNoZURpcmVjdG9yeU5hbWUsIGZhbHNlKSk7XG4gICAgfVxuXG4gICAgaWYgKHRoaXMuaXNXS1dlYlZpZXcgJiYgIXRoaXMuaXNJb25pY1dLV2ViVmlldykge1xuICAgICAgaWYgKHJlcGxhY2UpIHtcbiAgICAgICAgLy8gY3JlYXRlIG9yIHJlcGxhY2UgdGhlIHRlbXAgZGlyZWN0b3J5XG4gICAgICAgIHRlbXBEaXJlY3RvcnlQcm9taXNlID0gdGhpcy5maWxlLmNyZWF0ZURpcihcbiAgICAgICAgICB0aGlzLmZpbGUudGVtcERpcmVjdG9yeSxcbiAgICAgICAgICB0aGlzLmNvbmZpZy5jYWNoZURpcmVjdG9yeU5hbWUsXG4gICAgICAgICAgcmVwbGFjZSxcbiAgICAgICAgKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIC8vIGNoZWNrIGlmIHRoZSB0ZW1wIGRpcmVjdG9yeSBleGlzdHMuXG4gICAgICAgIC8vIGlmIGl0IGRvZXMgbm90IGV4aXN0IGNyZWF0ZSBpdCFcbiAgICAgICAgdGVtcERpcmVjdG9yeVByb21pc2UgPSB0aGlzLmNhY2hlRGlyZWN0b3J5RXhpc3RzKFxuICAgICAgICAgIHRoaXMuZmlsZS50ZW1wRGlyZWN0b3J5LFxuICAgICAgICApLmNhdGNoKCgpID0+XG4gICAgICAgICAgdGhpcy5maWxlLmNyZWF0ZURpcihcbiAgICAgICAgICAgIHRoaXMuZmlsZS50ZW1wRGlyZWN0b3J5LFxuICAgICAgICAgICAgdGhpcy5jb25maWcuY2FjaGVEaXJlY3RvcnlOYW1lLFxuICAgICAgICAgICAgZmFsc2UsXG4gICAgICAgICAgKSxcbiAgICAgICAgKTtcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgdGVtcERpcmVjdG9yeVByb21pc2UgPSBQcm9taXNlLnJlc29sdmUoKTtcbiAgICB9XG5cbiAgICByZXR1cm4gUHJvbWlzZS5hbGwoW2NhY2hlRGlyZWN0b3J5UHJvbWlzZSwgdGVtcERpcmVjdG9yeVByb21pc2VdKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBDcmVhdGVzIGEgdW5pcXVlIGZpbGUgbmFtZSBvdXQgb2YgdGhlIFVSTFxuICAgKiBAcGFyYW0gdXJsIFVSTCBvZiB0aGUgZmlsZVxuICAgKiBAcmV0dXJucyBVbmlxdWUgZmlsZSBuYW1lXG4gICAqL1xuICBwcml2YXRlIGNyZWF0ZUZpbGVOYW1lKHVybDogc3RyaW5nKTogc3RyaW5nIHtcbiAgICAvLyBoYXNoIHRoZSB1cmwgdG8gZ2V0IGEgdW5pcXVlIGZpbGUgbmFtZVxuICAgIHJldHVybiAoXG4gICAgICB0aGlzLmhhc2hTdHJpbmcodXJsKS50b1N0cmluZygpICtcbiAgICAgICh0aGlzLmNvbmZpZy5maWxlTmFtZUNhY2hlZFdpdGhFeHRlbnNpb25cbiAgICAgICAgPyB0aGlzLmdldEV4dGVuc2lvbkZyb21VcmwodXJsKVxuICAgICAgICA6ICcnKVxuICAgICk7XG4gIH1cblxuICAvKipcbiAgICogQ29udmVydHMgYSBzdHJpbmcgdG8gYSB1bmlxdWUgMzItYml0IGludFxuICAgKiBAcGFyYW0gc3RyaW5nIHN0cmluZyB0byBoYXNoXG4gICAqIEByZXR1cm5zIDMyLWJpdCBpbnRcbiAgICovXG4gIHByaXZhdGUgaGFzaFN0cmluZyhzdHJpbmc6IHN0cmluZyk6IG51bWJlciB7XG4gICAgbGV0IGhhc2ggPSAwLFxuICAgICAgY2hhcjtcbiAgICBpZiAoc3RyaW5nLmxlbmd0aCA9PT0gMCkge1xuICAgICAgcmV0dXJuIGhhc2g7XG4gICAgfVxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgc3RyaW5nLmxlbmd0aDsgaSsrKSB7XG4gICAgICBjaGFyID0gc3RyaW5nLmNoYXJDb2RlQXQoaSk7XG4gICAgICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmVcbiAgICAgIGhhc2ggPSAoaGFzaCA8PCA1KSAtIGhhc2ggKyBjaGFyO1xuICAgICAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lXG4gICAgICBoYXNoID0gaGFzaCAmIGhhc2g7XG4gICAgfVxuICAgIHJldHVybiBoYXNoO1xuICB9XG5cbiAgLyoqXG4gICAqIEV4dHJhY3QgZXh0ZW5zaW9uIGZyb20gZmlsZW5hbWUgb3IgdXJsXG4gICAqXG4gICAqIEBwYXJhbSB1cmxcbiAgICogQHJldHVybnNcbiAgICpcbiAgICogTm90IGFsd2F5cyB3aWxsIHVybCdzIGNvbnRhaW4gYSB2YWxpZCBpbWFnZSBleHRlbnRpb24uIFdlJ2xsIGNoZWNrIGlmIGFueSB2YWxpZCBleHRlbnRpb24gaXMgc3VwcGxpZWQuXG4gICAqIElmIG5vdCwgd2Ugd2lsbCB1c2UgdGhlIGRlZmF1bHQuXG4gICAqL1xuICBwcml2YXRlIGdldEV4dGVuc2lvbkZyb21VcmwodXJsOiBzdHJpbmcpOiBzdHJpbmcge1xuICAgIGNvbnN0IHVybFdpdG91dFBhcmFtcyA9IHVybC5zcGxpdCgvXFwjfFxcPy8pWzBdO1xuICAgIGNvbnN0IGV4dDogc3RyaW5nID0gKHVybFdpdG91dFBhcmFtcy5zdWJzdHIoKH4tdXJsV2l0b3V0UGFyYW1zLmxhc3RJbmRleE9mKCcuJykgPj4+IDApICsgMSkgfHwgJycpLnRvTG93ZXJDYXNlKCk7XG5cbiAgICByZXR1cm4gKFxuICAgICAgRVhURU5TSU9OUy5pbmRleE9mKGV4dCkgPj0gMCA/IGV4dCA6IHRoaXMuY29uZmlnLmZhbGxiYWNrRmlsZU5hbWVDYWNoZWRFeHRlbnNpb25cbiAgICApO1xuICB9XG59XG4iXX0=