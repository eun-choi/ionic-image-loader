import { ElementRef, EventEmitter, OnInit, Renderer2 } from '@angular/core';
import { ImageLoaderConfigService } from './services/image-loader-config.service';
import { ImageLoaderService } from './services/image-loader.service';
export interface ImageAttribute {
    element: string;
    value: string;
}
export declare class IonicImageLoaderComponent implements OnInit {
    private _element;
    private renderer;
    private imageLoader;
    private config;
    /**
     * Fallback URL to load when the image url fails to load or does not exist.
     */
    fallbackUrl: string;
    /**
     * Whether to show a spinner while the image loads
     */
    spinner: boolean;
    /**
     * Whether to show the fallback image instead of a spinner while the image loads
     */
    fallbackAsPlaceholder: boolean;
    /**
     * Attributes to pass through to img tag if _useImg == true
     */
    imgAttributes: ImageAttribute[];
    /**
     * Enable/Disable caching
     */
    cache: boolean;
    /**
     * Width of the image. This will be ignored if using useImg.
     */
    width: string;
    /**
     * Height of the image. This will be ignored if using useImg.
     */
    height: string;
    /**
     * Display type of the image. This will be ignored if using useImg.
     */
    display: string;
    /**
     * Background size. This will be ignored if using useImg.
     */
    backgroundSize: string;
    /**
     * Background repeat. This will be ignored if using useImg.
     */
    backgroundRepeat: string;
    /**
     * Name of the spinner
     */
    spinnerName: string;
    /**
     * Color of the spinner
     */
    spinnerColor: string;
    /**
     * Notify on image load..
     */
    load: EventEmitter<IonicImageLoaderComponent>;
    /**
     * Indicates if the image is still loading
     */
    isLoading: boolean;
    element: HTMLElement;
    constructor(_element: ElementRef, renderer: Renderer2, imageLoader: ImageLoaderService, config: ImageLoaderConfigService);
    private _useImg;
    /**
     * Use <img> tag
     */
    useImg: boolean;
    /**
     * Convenience attribute to disable caching
     */
    noCache: boolean;
    private _src;
    /**
    * The URL of the image to load.
    */
    src: string;
    ngOnInit(): void;
    private updateImage;
    /**
     * Gets the image URL to be loaded and disables caching if necessary
     */
    private processImageUrl;
    /**
     * Set the image to be displayed
     * @param imageUrl image src
     * @param stopLoading set to true to mark the image as loaded
     */
    private setImage;
}
