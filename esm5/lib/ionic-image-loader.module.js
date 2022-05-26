/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { File } from '@awesome-cordova-plugins/file/ngx';
import { IonicModule } from '@ionic/angular';
import { IonicImageLoaderComponent } from './ionic-image-loader.component';
import { ImageLoaderConfigService } from './services/image-loader-config.service';
import { ImageLoaderService } from './services/image-loader.service';
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
export { IonicImageLoader };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW9uaWMtaW1hZ2UtbG9hZGVyLm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL2lvbmljLWltYWdlLWxvYWRlci8iLCJzb3VyY2VzIjpbImxpYi9pb25pYy1pbWFnZS1sb2FkZXIubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDL0MsT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0sc0JBQXNCLENBQUM7QUFDeEQsT0FBTyxFQUF1QixRQUFRLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDOUQsT0FBTyxFQUFFLElBQUksRUFBRSxNQUFNLHdCQUF3QixDQUFDO0FBQzlDLE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUM3QyxPQUFPLEVBQUUseUJBQXlCLEVBQUUsTUFBTSxnQ0FBZ0MsQ0FBQztBQUUzRSxPQUFPLEVBQUUsd0JBQXdCLEVBQUUsTUFBTSx3Q0FBd0MsQ0FBQztBQUNsRixPQUFPLEVBQUUsa0JBQWtCLEVBQUUsTUFBTSxpQ0FBaUMsQ0FBQztBQUVyRTtJQUFBO0lBb0JBLENBQUM7Ozs7SUFWUSx3QkFBTzs7O0lBQWQ7UUFDRSxPQUFPO1lBQ0wsUUFBUSxFQUFFLGdCQUFnQjtZQUMxQixTQUFTLEVBQUU7Z0JBQ1Qsd0JBQXdCO2dCQUN4QixrQkFBa0I7Z0JBQ2xCLElBQUk7YUFDTDtTQUNGLENBQUM7SUFDSixDQUFDOztnQkFuQkYsUUFBUSxTQUFDO29CQUNSLE9BQU8sRUFBRTt3QkFDUCxXQUFXO3dCQUNYLGdCQUFnQjt3QkFDaEIsWUFBWTtxQkFDYjtvQkFDRCxZQUFZLEVBQUUsQ0FBQyx5QkFBeUIsQ0FBQztvQkFDekMsT0FBTyxFQUFFLENBQUMseUJBQXlCLENBQUM7aUJBQ3JDOztJQVlELHVCQUFDO0NBQUEsQUFwQkQsSUFvQkM7U0FYWSxnQkFBZ0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHsgSHR0cENsaWVudE1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbi9odHRwJztcbmltcG9ydCB7IE1vZHVsZVdpdGhQcm92aWRlcnMsIE5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBGaWxlIH0gZnJvbSAnQGlvbmljLW5hdGl2ZS9maWxlL25neCc7XG5pbXBvcnQgeyBJb25pY01vZHVsZSB9IGZyb20gJ0Bpb25pYy9hbmd1bGFyJztcbmltcG9ydCB7IElvbmljSW1hZ2VMb2FkZXJDb21wb25lbnQgfSBmcm9tICcuL2lvbmljLWltYWdlLWxvYWRlci5jb21wb25lbnQnO1xuXG5pbXBvcnQgeyBJbWFnZUxvYWRlckNvbmZpZ1NlcnZpY2UgfSBmcm9tICcuL3NlcnZpY2VzL2ltYWdlLWxvYWRlci1jb25maWcuc2VydmljZSc7XG5pbXBvcnQgeyBJbWFnZUxvYWRlclNlcnZpY2UgfSBmcm9tICcuL3NlcnZpY2VzL2ltYWdlLWxvYWRlci5zZXJ2aWNlJztcblxuQE5nTW9kdWxlKHtcbiAgaW1wb3J0czogW1xuICAgIElvbmljTW9kdWxlLFxuICAgIEh0dHBDbGllbnRNb2R1bGUsXG4gICAgQ29tbW9uTW9kdWxlLFxuICBdLFxuICBkZWNsYXJhdGlvbnM6IFtJb25pY0ltYWdlTG9hZGVyQ29tcG9uZW50XSxcbiAgZXhwb3J0czogW0lvbmljSW1hZ2VMb2FkZXJDb21wb25lbnRdLFxufSlcbmV4cG9ydCBjbGFzcyBJb25pY0ltYWdlTG9hZGVyIHtcbiAgc3RhdGljIGZvclJvb3QoKTogTW9kdWxlV2l0aFByb3ZpZGVycyB7XG4gICAgcmV0dXJuIHtcbiAgICAgIG5nTW9kdWxlOiBJb25pY0ltYWdlTG9hZGVyLFxuICAgICAgcHJvdmlkZXJzOiBbXG4gICAgICAgIEltYWdlTG9hZGVyQ29uZmlnU2VydmljZSxcbiAgICAgICAgSW1hZ2VMb2FkZXJTZXJ2aWNlLFxuICAgICAgICBGaWxlLFxuICAgICAgXSxcbiAgICB9O1xuICB9XG59XG4iXX0=