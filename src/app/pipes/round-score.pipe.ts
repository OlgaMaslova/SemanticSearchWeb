import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'roundScore'
})
export class RoundScorePipe implements PipeTransform {
    transform(value: number): unknown {
        return Math.round(value * 100) / 100;
    }
}
