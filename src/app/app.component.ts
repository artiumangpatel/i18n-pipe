import { Component } from '@angular/core';
import { I18nService } from './services/i18n.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  name: string = '';
  constructor(public i18nService: I18nService) { }

  changeLng(lang: string) {
    this.i18nService.setLanguage(lang);
  }
}
