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
export class IonicImageLoader {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW9uaWMtaW1hZ2UtbG9hZGVyLm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL2lvbmljLWltYWdlLWxvYWRlci8iLCJzb3VyY2VzIjpbImxpYi9pb25pYy1pbWFnZS1sb2FkZXIubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDL0MsT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0sc0JBQXNCLENBQUM7QUFDeEQsT0FBTyxFQUF1QixRQUFRLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDOUQsT0FBTyxFQUFFLElBQUksRUFBRSxNQUFNLHdCQUF3QixDQUFDO0FBQzlDLE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUM3QyxPQUFPLEVBQUUseUJBQXlCLEVBQUUsTUFBTSxnQ0FBZ0MsQ0FBQztBQUUzRSxPQUFPLEVBQUUsd0JBQXdCLEVBQUUsTUFBTSx3Q0FBd0MsQ0FBQztBQUNsRixPQUFPLEVBQUUsa0JBQWtCLEVBQUUsTUFBTSxpQ0FBaUMsQ0FBQztBQVdyRSxNQUFNLE9BQU8sZ0JBQWdCOzs7O0lBQzNCLE1BQU0sQ0FBQyxPQUFPO1FBQ1osT0FBTztZQUNMLFFBQVEsRUFBRSxnQkFBZ0I7WUFDMUIsU0FBUyxFQUFFO2dCQUNULHdCQUF3QjtnQkFDeEIsa0JBQWtCO2dCQUNsQixJQUFJO2FBQ0w7U0FDRixDQUFDO0lBQ0osQ0FBQzs7O1lBbkJGLFFBQVEsU0FBQztnQkFDUixPQUFPLEVBQUU7b0JBQ1AsV0FBVztvQkFDWCxnQkFBZ0I7b0JBQ2hCLFlBQVk7aUJBQ2I7Z0JBQ0QsWUFBWSxFQUFFLENBQUMseUJBQXlCLENBQUM7Z0JBQ3pDLE9BQU8sRUFBRSxDQUFDLHlCQUF5QixDQUFDO2FBQ3JDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7IEh0dHBDbGllbnRNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24vaHR0cCc7XG5pbXBvcnQgeyBNb2R1bGVXaXRoUHJvdmlkZXJzLCBOZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgRmlsZSB9IGZyb20gJ0Bpb25pYy1uYXRpdmUvZmlsZS9uZ3gnO1xuaW1wb3J0IHsgSW9uaWNNb2R1bGUgfSBmcm9tICdAaW9uaWMvYW5ndWxhcic7XG5pbXBvcnQgeyBJb25pY0ltYWdlTG9hZGVyQ29tcG9uZW50IH0gZnJvbSAnLi9pb25pYy1pbWFnZS1sb2FkZXIuY29tcG9uZW50JztcblxuaW1wb3J0IHsgSW1hZ2VMb2FkZXJDb25maWdTZXJ2aWNlIH0gZnJvbSAnLi9zZXJ2aWNlcy9pbWFnZS1sb2FkZXItY29uZmlnLnNlcnZpY2UnO1xuaW1wb3J0IHsgSW1hZ2VMb2FkZXJTZXJ2aWNlIH0gZnJvbSAnLi9zZXJ2aWNlcy9pbWFnZS1sb2FkZXIuc2VydmljZSc7XG5cbkBOZ01vZHVsZSh7XG4gIGltcG9ydHM6IFtcbiAgICBJb25pY01vZHVsZSxcbiAgICBIdHRwQ2xpZW50TW9kdWxlLFxuICAgIENvbW1vbk1vZHVsZSxcbiAgXSxcbiAgZGVjbGFyYXRpb25zOiBbSW9uaWNJbWFnZUxvYWRlckNvbXBvbmVudF0sXG4gIGV4cG9ydHM6IFtJb25pY0ltYWdlTG9hZGVyQ29tcG9uZW50XSxcbn0pXG5leHBvcnQgY2xhc3MgSW9uaWNJbWFnZUxvYWRlciB7XG4gIHN0YXRpYyBmb3JSb290KCk6IE1vZHVsZVdpdGhQcm92aWRlcnMge1xuICAgIHJldHVybiB7XG4gICAgICBuZ01vZHVsZTogSW9uaWNJbWFnZUxvYWRlcixcbiAgICAgIHByb3ZpZGVyczogW1xuICAgICAgICBJbWFnZUxvYWRlckNvbmZpZ1NlcnZpY2UsXG4gICAgICAgIEltYWdlTG9hZGVyU2VydmljZSxcbiAgICAgICAgRmlsZSxcbiAgICAgIF0sXG4gICAgfTtcbiAgfVxufVxuIl19