import { Component, OnInit } from '@angular/core';
import { ApiHttpService } from 'src/app/services/api-http-service.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { Subject, takeUntil } from 'rxjs';

@Component({
    selector: 'app-embeddings',
    templateUrl: './embeddings.component.html',
    styleUrls: ['./embeddings.component.scss']
})
export class EmbeddingsComponent implements OnInit {
    embeddings: string | null;

    error: string | null;

    destroy$ = new Subject();

    constructor(
        private apiService: ApiHttpService,
        private spinnerService: NgxSpinnerService
    ) {
        this.apiService.resetEvent
            .pipe(takeUntil(this.destroy$))
            .subscribe((val) => {
                if (val) {
                    this.embeddings = null;
                    this.error = null;
                }
            });
    }

    ngOnInit(): void {}

    ngOnDestroy() {
        this.destroy$.next(true);
        this.destroy$.complete();
    }

    getEmbeddings() {
        this.error = null;
        this.spinnerService.show();
        this.apiService.getEmbeddings().subscribe((res) => {
            if (res.length === 0) {
                // it's error fallback
                this.error =
                    'Error happened. Are you sure to have uploaded your text ?';
            } else {
                this.embeddings = JSON.stringify(res);
            }
            this.spinnerService.hide();
        });
    }
}
