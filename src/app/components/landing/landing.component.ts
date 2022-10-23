import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { ApiHttpService } from 'src/app/services/api-http-service.service';

@Component({
    selector: 'app-landing',
    templateUrl: './landing.component.html',
    styleUrls: ['./landing.component.scss']
})
export class LandingComponent implements OnInit {
    constructor(private apiService: ApiHttpService) {}

    ngOnInit(): void {}

    onReset() {
        this.apiService.reset().subscribe((res) => {
            if (res.message.length > 0) {
                // it's success
                this.apiService.resetEvent.next(true);
            }
        });
    }
}
