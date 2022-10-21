import { Injectable, ApplicationRef } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { delay, map, catchError } from 'rxjs/operators';
import { Observable } from "rxjs";

@Injectable()
export class I18nService {

    public data: Array<any> = [];
    public currentLanguage: any;
    public configs: any;

    constructor(
        private http: HttpClient,
        private ref: ApplicationRef) {
        this.setLanguage(localStorage.getItem('lang') || "en-US" || "bn-BD" || "fi-FI");
    }

    public setLanguage(language: string) {
        localStorage.setItem('lang', language);
        this.currentLanguage = language;
        this.fetch(language)
    }

    public getTranslation(phrase: string, variableData: any = null): string {
        if (this.data && this.data[<any>phrase]) {
            if (!variableData) {
                return this.data[<any>phrase];
            }
            let str = this.data[<any>phrase];
            Object.keys(variableData).forEach((value) => {
                let replacevaule = "{" + value + "}";
                str = str.replace(new RegExp(replacevaule, 'g'), variableData[value]);
            })
            return str;
        }
        else
            return phrase;
    }

    private fetch(locale: any) {
        let langFilePath = `assets/langs/${locale}.json`;
        this.fetchLangFile(langFilePath)
            .subscribe((data: any) => {
                this.data = data;
                this.ref.tick();
            })
    }

    private fetchLangFile(url: string): Observable<string> {
        let baseurl = location.protocol + '//' + location.hostname + (location.port ? ':' + location.port : '') + '/';
        return this.http.get(baseurl + url)
            .pipe(
                map((data: any) => (data.data || data))
            );
    }

}