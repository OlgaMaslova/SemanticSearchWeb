/* eslint-disable no-underscore-dangle */
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, Subject } from 'rxjs';
import {
    Embedding,
    Message,
    SemanticResult,
    Vocabulary
} from '../models/models';
import {
    HandleError,
    HttpErrorHandlerService
} from './http-error-handler.service';

const httpOptions = {
    headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
    }),
    params: {}
};
@Injectable({
    providedIn: 'root'
})
export class ApiHttpService {
    private _vocabularyID: string | null;

    public get vocabularyID(): string | null {
        return this._vocabularyID;
    }

    public set vocabularyID(value: string | null) {
        this._vocabularyID = value;
    }

    private handleError: HandleError;

    resetEvent = new Subject<boolean>();

    constructor(
        private http: HttpClient,
        httpErrorHandler: HttpErrorHandlerService
    ) {
        this.handleError = httpErrorHandler.createHandleError('ApiService');
    }

    /**
     * Send post request with the vocabulary text
     * @param vocabulary : Vocabulary
     * @returns Observable<{}>
     */
    postVocabulary(vocabulary: Vocabulary): Observable<{ id: string }> {
        return this.http
            .post<{ id: string }>(
                `upload-vocabulary`,
                JSON.stringify(vocabulary),
                httpOptions
            )
            .pipe(
                catchError(this.handleError('upload vocabulary', { id: '' }))
            );
    }

    /**
     * Sends post request with the query text to API to receive the top sentence
     * @param query string
     * @returns Observable<SemanticResult>
     */
    getSemanticResult(query: string): Observable<SemanticResult> {
        httpOptions.params = { query, vocabulary_id: this.vocabularyID };
        return this.http.post<SemanticResult>(`query`, {}, httpOptions).pipe(
            catchError(
                this.handleError('run semantic query', {
                    top_answer: '',
                    score: 0
                })
            )
        );
    }

    /**
     * Gets embeddings for the sentences of the previously uploaded text
     * @returns Observable<Embedding[]>
     */
    getEmbeddings(): Observable<Embedding[]> {
        httpOptions.params = { vocabulary_id: this.vocabularyID };
        return this.http
            .get<Embedding[]>(`embeddings`, httpOptions)
            .pipe(catchError(this.handleError('get embeddings', [])));
    }

    /**
     * Resets the API data (vocabulary, embeddings)
     * @returns Observable<Message>
     */
    reset(): Observable<Message> {
        httpOptions.params = { vocabulary_id: this.vocabularyID };
        return this.http
            .get<Message>(`reset`, httpOptions)
            .pipe(catchError(this.handleError('reset data', { message: '' })));
    }
}
