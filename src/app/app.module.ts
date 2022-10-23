import { CommonModule } from '@angular/common';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import {
    HttpClient,
    HttpClientModule,
    HTTP_INTERCEPTORS
} from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { NgxSpinnerModule } from 'ngx-spinner';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { environment } from 'src/environments/environment';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoadVocabularyComponent } from './components/load-vocabulary/load-vocabulary.component';
import { QueryComponent } from './components/query/query.component';
import { LandingComponent } from './components/landing/landing.component';
import { EmbeddingsComponent } from './components/embeddings/embeddings.component';
import { BaseUrlInterceptor } from './base-url.interceptor';
import { RoundScorePipe } from './pipes/round-score.pipe';

export function HttpLoaderFactory(http: HttpClient) {
    return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
    declarations: [
        AppComponent,
        LoadVocabularyComponent,
        QueryComponent,
        LandingComponent,
        EmbeddingsComponent,
        RoundScorePipe
    ],
    imports: [
        NgxSpinnerModule,
        BrowserAnimationsModule,
        ReactiveFormsModule,
        CommonModule,
        BrowserModule,
        AppRoutingModule,
        HttpClientModule,
        TranslateModule.forRoot({
            loader: {
                provide: TranslateLoader,
                useFactory: HttpLoaderFactory,
                deps: [HttpClient]
            }
        })
    ],
    providers: [
        { provide: 'BASE_API_URL', useValue: environment.apiUrl },
        {
            provide: HTTP_INTERCEPTORS,
            useClass: BaseUrlInterceptor,
            multi: true
        }
    ],
    bootstrap: [AppComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule {}
