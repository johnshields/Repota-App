import {Inject, Injectable, Optional} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams, HttpResponse, HttpEvent} from '@angular/common/http';
import {CustomHttpUrlEncodingCodec} from '../encoder';
import {Observable} from 'rxjs';
import {JobReport} from '../model/jobReport';
import {BASE_PATH} from '../variables';
import {Configuration} from '../configuration';

/**
 * @author John Shields
 * @title Job Report Service - OpenAPI spec version: 1.0.0
 * @desc Job Report API Service for Getting, Creating, Updating and Deleting Reports.
 *
 * Setup Generated by the swagger code generator program.
 * https://github.com/swagger-api/swagger-codegen.git
 * Refer to https://johnshields.github.io/horton.api.doc/ for more info.
 */

@Injectable()
export class JobReportService {

    //protected basePath = 'https://api.repota-service.com/api/v1'; // aws elastic beanstalk
    protected basePath = 'http://localhost:8080/api/v1'; // local
    public defaultHeaders = new HttpHeaders();
    public configuration = new Configuration();

    constructor(protected httpClient: HttpClient, @Optional() @Inject(BASE_PATH) basePath: string, @Optional() configuration: Configuration) {
        if (basePath) {
            this.basePath = basePath;
        }
        if (configuration) {
            this.configuration = configuration;
            this.basePath = basePath || configuration.basePath || this.basePath;
        }
    }

    /**
     * @param consumes string[] mime-types
     * @return true: consumes contains 'multipart/form-data', false: otherwise
     */
    private canConsumeForm(consumes: string[]): boolean {
        const form = 'multipart/form-data';
        for (const consume of consumes) {
            if (form === consume) {
                return true;
            }
        }
        return false;
    }


    /**
     * Create a report
     * Creates a new instance of a Job Report.
     * @param body A new report to be created.
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public createReport(body: JobReport, observe?: 'body', reportProgress?: boolean): Observable<any>;
    public createReport(body: JobReport, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<any>>;
    public createReport(body: JobReport, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<any>>;
    public createReport(body: JobReport, observe: any = 'body', reportProgress: boolean = false): Observable<any> {

        if (body === null || body === undefined) {
            throw new Error('Required parameter body was null or undefined when calling createReport.');
        }

        let queryParameters = new HttpParams({encoder: new CustomHttpUrlEncodingCodec()});

        let headers = this.defaultHeaders;

        // authentication (LoginRequired) required
        if (this.configuration.apiKeys && this.configuration.apiKeys['session_id']) {
            queryParameters = queryParameters.set('session_id', this.configuration.apiKeys['session_id']);
        }

        // to determine the Accept header
        let httpHeaderAccepts: string[] = [
            'application/json'
        ];
        const httpHeaderAcceptSelected: string | undefined = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        if (httpHeaderAcceptSelected != undefined) {
            headers = headers.set('Accept', httpHeaderAcceptSelected);
        }

        // to determine the Content-Type header
        const consumes: string[] = [
            'application/json'
        ];
        const httpContentTypeSelected: string | undefined = this.configuration.selectHeaderContentType(consumes);
        if (httpContentTypeSelected != undefined) {
            headers = headers.set('Content-Type', httpContentTypeSelected);
        }

        return this.httpClient.request<any>('post', `${this.basePath}/jobReports`,
            {
                body: body,
                params: queryParameters,
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

    /**
     * Delete a Job Report
     * Deletes an existing report.
     * @param jobReportId A unique identifier for a Report.
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public deleteReport(jobReportId: number, observe?: 'body', reportProgress?: boolean): Observable<any>;
    public deleteReport(jobReportId: number, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<any>>;
    public deleteReport(jobReportId: number, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<any>>;
    public deleteReport(jobReportId: number, observe: any = 'body', reportProgress: boolean = false): Observable<any> {

        if (jobReportId === null || jobReportId === undefined) {
            throw new Error('Required parameter jobReportId was null or undefined when calling deleteReport.');
        }

        let queryParameters = new HttpParams({encoder: new CustomHttpUrlEncodingCodec()});

        let headers = this.defaultHeaders;

        // authentication (LoginRequired) required
        if (this.configuration.apiKeys && this.configuration.apiKeys['session_id']) {
            queryParameters = queryParameters.set('session_id', this.configuration.apiKeys['session_id']);
        }

        // to determine the Accept header
        let httpHeaderAccepts: string[] = [
            'application/json'
        ];
        const httpHeaderAcceptSelected: string | undefined = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        if (httpHeaderAcceptSelected != undefined) {
            headers = headers.set('Accept', httpHeaderAcceptSelected);
        }

        // to determine the Content-Type header
        const consumes: string[] = [];

        return this.httpClient.request<any>('delete', `${this.basePath}/jobReports/${encodeURIComponent(String(jobReportId))}`,
            {
                params: queryParameters,
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

    /**
     * Get a job report
     * Gets the details of a single instance of a report.
     * @param jobReportId A unique identifier for a report.
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public getReportById(jobReportId: number, observe?: 'body', reportProgress?: boolean): Observable<JobReport>;
    public getReportById(jobReportId: number, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<JobReport>>;
    public getReportById(jobReportId: number, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<JobReport>>;
    public getReportById(jobReportId: number, observe: any = 'body', reportProgress: boolean = false): Observable<any> {

        if (jobReportId === null || jobReportId === undefined) {
            throw new Error('Required parameter jobReportId was null or undefined when calling getReportById.');
        }

        let queryParameters = new HttpParams({encoder: new CustomHttpUrlEncodingCodec()});

        let headers = this.defaultHeaders;

        // authentication (LoginRequired) required
        if (this.configuration.apiKeys && this.configuration.apiKeys['session_id']) {
            queryParameters = queryParameters.set('session_id', this.configuration.apiKeys['session_id']);
        }

        // to determine the Accept header
        let httpHeaderAccepts: string[] = [
            'application/json'
        ];
        const httpHeaderAcceptSelected: string | undefined = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        if (httpHeaderAcceptSelected != undefined) {
            headers = headers.set('Accept', httpHeaderAcceptSelected);
        }

        // to determine the Content-Type header
        const consumes: string[] = [];

        return this.httpClient.request<JobReport>('get', `${this.basePath}/jobReports/${encodeURIComponent(String(jobReportId))}`,
            {
                params: queryParameters,
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

    /**
     * Get all reports for the worker logged in.
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public getReports(observe?: 'body', reportProgress?: boolean): Observable<Array<JobReport>>;
    public getReports(observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<Array<JobReport>>>;
    public getReports(observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<Array<JobReport>>>;
    public getReports(observe: any = 'body', reportProgress: boolean = false): Observable<any> {

        let queryParameters = new HttpParams({encoder: new CustomHttpUrlEncodingCodec()});

        let headers = this.defaultHeaders;

        // authentication (LoginRequired) required
        if (this.configuration.apiKeys && this.configuration.apiKeys['session_id']) {
            queryParameters = queryParameters.set('session_id', this.configuration.apiKeys['session_id']);
        }

        // to determine the Accept header
        let httpHeaderAccepts: string[] = [
            'application/json'
        ];
        const httpHeaderAcceptSelected: string | undefined = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        if (httpHeaderAcceptSelected != undefined) {
            headers = headers.set('Accept', httpHeaderAcceptSelected);
        }

        // to determine the Content-Type header
        const consumes: string[] = [];

        return this.httpClient.request<Array<JobReport>>('get', `${this.basePath}/jobReports`,
            {
                params: queryParameters,
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

    /**
     * Update a job report
     * Updates an existing job report.
     * @param body Updated report information.
     * @param jobReportId A unique identifier for a report.
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public updateReport(body: JobReport, jobReportId: number, observe?: 'body', reportProgress?: boolean): Observable<any>;
    public updateReport(body: JobReport, jobReportId: number, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<any>>;
    public updateReport(body: JobReport, jobReportId: number, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<any>>;
    public updateReport(body: JobReport, jobReportId: number, observe: any = 'body', reportProgress: boolean = false): Observable<any> {

        if (body === null || body === undefined) {
            throw new Error('Required parameter body was null or undefined when calling updateReport.');
        }

        if (jobReportId === null || jobReportId === undefined) {
            throw new Error('Required parameter jobReportId was null or undefined when calling updateReport.');
        }

        let queryParameters = new HttpParams({encoder: new CustomHttpUrlEncodingCodec()});

        let headers = this.defaultHeaders;

        // authentication (LoginRequired) required
        if (this.configuration.apiKeys && this.configuration.apiKeys['session_id']) {
            queryParameters = queryParameters.set('session_id', this.configuration.apiKeys['session_id']);
        }

        // to determine the Accept header
        let httpHeaderAccepts: string[] = [
            'application/json'
        ];
        const httpHeaderAcceptSelected: string | undefined = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        if (httpHeaderAcceptSelected != undefined) {
            headers = headers.set('Accept', httpHeaderAcceptSelected);
        }

        // to determine the Content-Type header
        const consumes: string[] = [
            'application/json'
        ];
        const httpContentTypeSelected: string | undefined = this.configuration.selectHeaderContentType(consumes);
        if (httpContentTypeSelected != undefined) {
            headers = headers.set('Content-Type', httpContentTypeSelected);
        }

        return this.httpClient.request<any>('put', `${this.basePath}/jobReports/${encodeURIComponent(String(jobReportId))}`,
            {
                body: body,
                params: queryParameters,
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

    /**
     * @tile GetCarApiData
     * @disc Get all Vehicle Data from API that retrieves it from a 3rd Party API.
     * 3rd Party API - https://www.back4app.com/database/back4app/car-make-model-dataset
     */
    getCarApiData(): Observable<any> {
        let queryParameters = new HttpParams({encoder: new CustomHttpUrlEncodingCodec()});

        let headers = this.defaultHeaders;

        // authentication (LoginRequired) required
        if (this.configuration.apiKeys && this.configuration.apiKeys['session_id']) {
            queryParameters = queryParameters.set('session_id', this.configuration.apiKeys['session_id']);
        }

        // to determine the Accept header
        let httpHeaderAccepts: string[] = [
            'application/json'
        ];
        const httpHeaderAcceptSelected: string | undefined = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        if (httpHeaderAcceptSelected != undefined) {
            headers = headers.set('Accept', httpHeaderAcceptSelected);
        }

        // to determine the Content-Type header
        const consumes: string[] = [];

        return this.httpClient.request('get', `${this.basePath}/carApiData`,
            {
                params: queryParameters,
                withCredentials: this.configuration.withCredentials,
                headers: headers,
            }
        );
    }
}
