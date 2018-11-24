import {BaseResourceModel} from '../models/base-resource.model';
import {HttpClient} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {catchError, map} from 'rxjs/operators';
import {Injector} from '@angular/core';

export abstract class BaseResourceService<T extends BaseResourceModel> {

     protected http: HttpClient;

    constructor(protected apiPath: string, protected injector: Injector) {
        this.http = injector.get(HttpClient);
    }

    getAll(): Observable<T[]> {
        return this.http.get(this.apiPath).pipe(
            catchError(this.handleError),
            map(this.jsonDataToResources)
        );
    }

    getById(id: number): Observable<T> {
        const url = `${this.apiPath}/${id}`;
        return this.http.get(url).pipe(
            catchError(this.handleError),
            map(this.jsonDataToResource)
        );
    }

    create(resource: T): Observable<T> {
        return this.http.post(this.apiPath, resource).pipe(
            catchError(this.handleError),
            map(this.jsonDataToResource)
        );
    }

    update(resource: T): Observable<T> {
        const url = `${this.apiPath}/${resource.id}`;
        return this.http.put(url, resource).pipe(
            catchError(this.handleError),
            map(this.jsonDataToResource)
        );
    }

    delete(id): Observable<any> {
        const url = `${this.apiPath}/${id}`;
        return this.http.delete(url, id).pipe(
            catchError(this.handleError),
            map(() => null)
        );
    }

    protected jsonDataToResources(jsonData: any[]): T[] {
        const resources: T[] = [];
        jsonData.forEach(element => resources.push(element as T));
        return resources;
    }

    jsonDataToResource(jsonData: any): T {
        return jsonData as T;
    }

    protected handleError(error): Observable<any> {
        return throwError(error);
    }
}