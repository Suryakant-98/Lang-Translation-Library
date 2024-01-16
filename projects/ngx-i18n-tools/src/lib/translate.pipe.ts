import { Pipe, PipeTransform } from '@angular/core';
import { TranslationService } from './translation.service';

@Pipe({
    name: 'translate',
    pure: false, // Set pure to false to allow dynamic updates
  })
  export class TranslatePipe implements PipeTransform {
    constructor(private translationService: TranslationService) {}
  
    transform(key: string, params?: { [key: string]: string }): string {
      return this.translationService.translate(key, params);
    }
  }