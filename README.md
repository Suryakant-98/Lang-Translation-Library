# NgxI18nTools

`ngx-i18n-tools` is an Internationalization (i18n) Library. It facilitates internationalization and localization in Angular applications, providing tools for translating and managing multilingual content.

## Installation
```
npm i ngx-i18n-tools
```

## Usage

Follow these steps to use this language translation library:  
1) Import this `NgxI18nToolsModule` into your app.module.ts file
```
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { NgxI18nToolsModule } from 'ngx-i18n-tools'; //Import this module

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    NgxI18nToolsModule //add-in imports also
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
```
2) Create the necessary JSON files under the assets folder like this 'assets/i18n/en.json'
3) Import `TranslationService` into your ts file
```
import { Component } from '@angular/core';
import { TranslationService } from 'ngx-i18n-tools'; //import this service

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'translation';

  constructor(private translationService: TranslationService) {
    this.translationService.loadTranslationsFromFile('en', 'assets/i18n/en.json');
    this.translationService.loadTranslationsFromFile('es', 'assets/i18n/es.json');
    this.translationService.setLanguage('en');
  }

  changeLanguage(language: string): void {
    this.translationService.setLanguage(language);
  }
}
```
4) Use the translate pipe in your HTML file and you can customize and use it accordingly
```
<div>
  <h1>{{ 'greeting' | translate}}</h1>
  <p>{{ 'fantastic' | translate }}</p>
 
</div>
<div>
  <button (click)="changeLanguage('en')">English</button>
  <button (click)="changeLanguage('es')">Spanish</button>
</div>
```
That's it, this is how you can use the library in your angular application.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).


## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.
