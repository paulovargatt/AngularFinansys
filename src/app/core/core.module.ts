import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {BrowserModule} from '@angular/platform-browser';
import {HttpClientModule} from '@angular/common/http';
import {HttpClientInMemoryWebApiModule} from 'angular-in-memory-web-api';
import {ApiInMemory} from '../api-in-memory';


@NgModule({
    declarations: [],
    imports: [
        CommonModule,
        BrowserAnimationsModule,
        BrowserModule,
        HttpClientModule,
        HttpClientInMemoryWebApiModule.forRoot(ApiInMemory),

    ],
    exports: [
        BrowserModule,
        BrowserAnimationsModule,
        HttpClientModule
    ]
})
export class CoreModule {
}
