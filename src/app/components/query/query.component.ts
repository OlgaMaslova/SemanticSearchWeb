import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { Subject, takeUntil } from 'rxjs';
import { SemanticResult } from 'src/app/models/models';
import { ApiHttpService } from 'src/app/services/api-http-service.service';

@Component({
    selector: 'app-query',
    templateUrl: './query.component.html',
    styleUrls: ['./query.component.scss']
})
export class QueryComponent implements OnInit {
    form: FormGroup;

    semanticResult: SemanticResult | null;

    error: string | null;

    destroy$ = new Subject();

    constructor(
        private fb: FormBuilder,
        private apiService: ApiHttpService,
        private spinnerService: NgxSpinnerService
    ) {
        this.apiService.resetEvent
            .pipe(takeUntil(this.destroy$))
            .subscribe((val) => {
                if (val) {
                    this.semanticResult = null;
                    this.error = null;
                    this.form.reset();
                }
            });
    }

    ngOnInit(): void {
        this.initForm();
    }

    ngOnDestroy() {
        this.destroy$.next(true);
        this.destroy$.complete();
    }

    initForm() {
        this.form = this.fb.group({
            query: [
                'Brain networks are shown to have neuronal cliques',
                [Validators.required, Validators.minLength(1)]
            ]
        });
    }

    onSubmit() {
        if (!this.form.valid) {
            return;
        }
        this.error = null;
        this.semanticResult = null;
        const input = this.form.value.query;
        if (!this.apiService.vocabularyID) {
            this.error = 'query.error-no-vocab';
            return;
        }
        this.spinnerService.show();
        this.apiService.getSemanticResult(input).subscribe((res) => {
            if (res.top_answer !== '') {
                this.semanticResult = res;
            } else {
                this.error = 'query.error';
            }
            this.spinnerService.hide();
        });
    }
}
