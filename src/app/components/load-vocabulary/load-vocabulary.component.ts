/* eslint-disable no-return-assign */
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subject, takeUntil } from 'rxjs';
import { Vocabulary } from 'src/app/models/models';
import { ApiHttpService } from 'src/app/services/api-http-service.service';

@Component({
    selector: 'app-load-vocabulary',
    templateUrl: './load-vocabulary.component.html',
    styleUrls: ['./load-vocabulary.component.scss']
})
export class LoadVocabularyComponent implements OnInit {
    form: FormGroup;

    success: boolean;

    destroy$ = new Subject();

    constructor(private fb: FormBuilder, private apiService: ApiHttpService) {
        this.apiService.resetEvent
            .pipe(takeUntil(this.destroy$))
            .subscribe((val) => {
                if (val) {
                    this.form.reset();
                    this.success = false;
                    this.apiService.vocabularyID = null;
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
            text: [
                'The lack of a formal link between neural network structure and its emergent function has hampered our understanding of how the brain processes information. We have now come closer to describing such a link by taking the direction of synaptic transmission into account, constructing graphs of a network that reflect the direction of information flow, and analyzing these directed graphs using algebraic topology. Applying this approach to a local network of neurons in the neocortex revealed a remarkably intricate and previously unseen topology of synaptic connectivity. The synaptic network contains an abundance of cliques of neurons bound into cavities that guide the emergence of correlated activity. In response to stimuli, correlated activity binds synaptically connected neurons into functional cliques and cavities that evolve in a stereotypical sequence toward peak complexity. We propose that the brain processes stimuli by forming increasingly complex functional cliques and cavities.',
                [Validators.required, Validators.minLength(1)]
            ]
        });
    }

    onSubmit() {
        if (!this.form.valid) {
            return;
        }
        const input = this.form.value.text;
        this.apiService
            .postVocabulary({ text: input } as Vocabulary)
            .subscribe((res) => {
                if (res.id.length !== 0) {
                    // set vocabulary id
                    this.apiService.vocabularyID = res.id;
                    this.success = true;
                }
            });
    }
}
