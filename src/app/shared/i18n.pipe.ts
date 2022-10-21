import { Pipe, PipeTransform } from '@angular/core';
import { I18nService } from '../services/i18n.service';

@Pipe({
  name: 'i18n', pure: false
})
export class I18nPipe implements PipeTransform {
  constructor(public i18nService: I18nService) { }
  transform(phrase: string, args: any = null): any {
    return this.i18nService.getTranslation(phrase, args);
  }
}
