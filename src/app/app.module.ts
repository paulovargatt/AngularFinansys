import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';

import {HttpClientInMemoryWebApiModule} from 'angular-in-memory-web-api';
import {ApiInMemory} from './api-in-memory';
import {HttpClientModule} from '@angular/common/http';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

@NgModule({
    declarations: [
        AppComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        HttpClientModule,
        BrowserAnimationsModule,
        HttpClientInMemoryWebApiModule.forRoot(ApiInMemory)
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {
}
