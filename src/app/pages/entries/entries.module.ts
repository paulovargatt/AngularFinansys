import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {EntriesRoutingModule} from './entries-routing.module';
import {EntryListComponent} from './entry-list/entry-list.component';
import {EntryFormComponent} from './entry-form/entry-form.component';
import {ReactiveFormsModule} from '@angular/forms';
import {CalendarModule} from 'primeng/primeng';
import {IMaskModule} from 'angular-imask';

@NgModule({
    imports: [
        CommonModule,
        EntriesRoutingModule,
        ReactiveFormsModule,
        CalendarModule,
        IMaskModule
    ],
    declarations: [
        EntryListComponent, EntryFormComponent
    ]
})
export class EntriesModule {
}
