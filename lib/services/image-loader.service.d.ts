import { HttpClient } from '@angular/common/http';
import { File } from '@awesome-cordova-plugins/file/ngx';
import { WebView } from '@awesome-cordova-plugins/ionic-webview/ngx';
import { Platform } from '@ionic/angular';
import { ImageLoaderConfigService } from './image-loader-config.service';
import * as ɵngcc0 from '@angular/core';
export declare class ImageLoaderService {
    private config;
    private file;
    private http;
    private platform;
    private webview;
    /**
     * Indicates if the cache service is ready.
     * When the cache service isn't ready, images are loaded via browser instead.
     */
    private isCacheReady;
    /**
     * Indicates if this service is initialized.
     * This service is initialized once all the setup is done.
     */
    private isInit;
    private initPromiseResolve;
    private initPromise;
    private lockSubject;
    private lock$;
    /**
     * Number of concurrent requests allowed
     */
    private concurrency;
    /**
     * Queue items
     */
    private queue;
    private processing;
    /**
     * Fast accessible Object for currently processing items
     */
    private currentlyProcessing;
    private cacheIndex;
    private currentCacheSize;
    private indexed;
    private lockedCallsQueue;
    constructor(config: ImageLoaderConfigService, file: File, http: HttpClient, platform: Platform, webview: WebView);
    readonly nativeAvailable: boolean;
    private readonly isCacheSpaceExceeded;
    private readonly isWKWebView;
    private readonly isIonicWKWebView;
    private readonly isDevServer;
    /**
     * Check if we can process more items in the queue
     */
    private readonly canProcess;
    ready(): Promise<void>;
    /**
     * Preload an image
     * @param imageUrl Image URL
     * @returns returns a promise that resolves with the cached image URL
     */
    preload(imageUrl: string): Promise<string>;
    getFileCacheDirectory(): string;
    /**
     * Clears cache of a single image
     * @param imageUrl Image URL
     */
    clearImageCache(imageUrl: string): Promise<void>;
    /**
     * Clears the cache
     */
    clearCache(): Promise<void>;
    /**
     * Gets the filesystem path of an image.
     * This will return the remote path if anything goes wrong or if the cache service isn't ready yet.
     * @param imageUrl The remote URL of the image
     * @returns Returns a promise that will always resolve with an image URL
     */
    getImagePath(imageUrl: string): Promise<string>;
    private processLockedQueue;
    private getLockedState;
    private awaitUnlocked;
    private setLockedState;
    private runLocked;
    /**
     * Returns if an imageUrl is an relative path
     * @param imageUrl
     */
    private isImageUrlRelative;
    /**
     * Add an item to the queue
     * @param imageUrl
     * @param resolve
     * @param reject
     */
    private addItemToQueue;
    /**
     * Processes one item from the queue
     */
    private processQueue;
    /**
     * Search if the url is currently in the queue
     * @param imageUrl Image url to search
     */
    private currentlyInQueue;
    /**
     * Initialize the cache service
     * @param [replace] Whether to replace the cache directory if it already exists
     */
    private initCache;
    /**
     * Adds a file to index.
     * Also deletes any files if they are older than the set maximum cache age.
     * @param file FileEntry to index
     */
    private addFileToIndex;
    /**
     * Indexes the cache if necessary
     */
    private indexCache;
    /**
     * This method runs every time a new file is added.
     * It checks the cache size and ensures that it doesn't exceed the maximum cache size set in the config.
     * If the limit is reached, it will delete old images to create free space.
     */
    private maintainCacheSize;
    /**
     * Remove a file
     * @param file The name of the file to remove
     */
    private removeFile;
    /**
     * Get the local path of a previously cached image if exists
     * @param url The remote URL of the image
     * @returns Returns a promise that resolves with the local path if exists, or rejects if doesn't exist
     */
    private getCachedImagePath;
    /**
     * Normalizes the image uri to a version that can be loaded in the webview
     * @param fileEntry the FileEntry of the image file
     * @returns the normalized Url
     */
    private normalizeUrl;
    /**
     * Throws a console error if debug mode is enabled
     * @param args Error message
     */
    private throwError;
    /**
     * Throws a console warning if debug mode is enabled
     * @param args Error message
     */
    private throwWarning;
    /**
     * Check if the cache directory exists
     * @param directory The directory to check. Either this.file.tempDirectory or this.getFileCacheDirectory()
     * @returns Returns a promise that resolves if exists, and rejects if it doesn't
     */
    private cacheDirectoryExists;
    /**
     * Create the cache directories
     * @param replace override directory if exists
     * @returns Returns a promise that resolves if the directories were created, and rejects on error
     */
    private createCacheDirectory;
    /**
     * Creates a unique file name out of the URL
     * @param url URL of the file
     * @returns Unique file name
     */
    private createFileName;
    /**
     * Converts a string to a unique 32-bit int
     * @param string string to hash
     * @returns 32-bit int
     */
    private hashString;
    /**
     * Extract extension from filename or url
     *
     * @param url
     * @returns
     *
     * Not always will url's contain a valid image extention. We'll check if any valid extention is supplied.
     * If not, we will use the default.
     */
    private getExtensionFromUrl;
    static ɵfac: ɵngcc0.ɵɵFactoryDeclaration<ImageLoaderService, never>;
    static ɵprov: ɵngcc0.ɵɵInjectableDeclaration<ImageLoaderService>;
}

//# sourceMappingURL=image-loader.service.d.ts.map