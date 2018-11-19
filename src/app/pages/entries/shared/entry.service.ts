import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {EntryModel} from './entry.model';
import {catchError, map} from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class EntryService {

    private apiPath = 'api/entries';

    constructor(
        private http: HttpClient
    ) {
    }

    getAll(): Observable<EntryModel[]> {
        return this.http.get(this.apiPath).pipe(
            catchError(this.handleError),
            map(this.jsonDataToEntries)
        );
    }

    getById(id: number): Observable<EntryModel> {
        const url = `${this.apiPath}/${id}`;
        return this.http.get(url).pipe(
            catchError(this.handleError),
            map(this.jsonDataToEntry)
        );
    }

    create(entry: EntryModel): Observable<EntryModel> {
        return this.http.post(this.apiPath, entry).pipe(
            catchError(this.handleError),
            map(this.jsonDataToEntry)
        );
    }

    update(entry: EntryModel): Observable<EntryModel> {
        const url = `${this.apiPath}/${entry.id}`;
        return this.http.put(url, entry).pipe(
            catchError(this.handleError),
            map(this.jsonDataToEntry)
        );
    }

    delete(id): Observable<any> {
        const url = `${this.apiPath}/${id}`;
        return this.http.delete(url, id).pipe(
            catchError(this.handleError),
            map(() => null)
        );
    }



    private jsonDataToEntries(jsonData: any[]): EntryModel[] {
        const entries: EntryModel[] = [];

        jsonData.forEach(element => {
            const entry = Object.assign(new EntryModel(), element);
            entries.push(entry);
        });
        return entries;
    }

    jsonDataToEntry(jsonData: any): EntryModel {
        return jsonData as EntryModel;
    }

    private handleError(error): Observable<any> {
        return throwError(error);
    }
}
