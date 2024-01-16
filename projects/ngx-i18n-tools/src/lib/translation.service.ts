
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TranslationService {
  private translations: { [lang: string]: { [key: string]: string } } = {};
  private currentLanguageSubject = new BehaviorSubject<string>('en');

  constructor(private http: HttpClient) {}

  async loadTranslationsFromFile(language: string, filePath: string): Promise<void> {
    try {
      const translations = await this.http.get<{ [key: string]: string }>(filePath).toPromise();
      
      if (!this.translations[language]) {
        this.translations[language] = {}; // Ensure it's initialized
      }
  
      Object.assign(this.translations[language], translations);
  
      console.log(`Translations loaded for language: ${language}`);
    } catch (error) {
      console.error(`Error loading translations for language: ${language}`, error);
    }
  }
  

  setLanguage(language: string): void {
    if (this.translations[language]) {
      this.currentLanguageSubject.next(language);
    } else {
      console.error(`Translations not available for language: ${language}`);
    }
  }

  get currentLanguage(): string {
    return this.currentLanguageSubject.value;
  }

  translate(key: string, params?: { [key: string]: string }): string {
    const language = this.currentLanguage;
    const translation = this.translations[language] && this.translations[language][key];

    if (translation) {
      return params ? this.interpolateParams(translation, params) : translation;
    } else {
      console.warn(`Translation not found for key: ${key} in language: ${language}`);
      return key;
    }
  }

  private interpolateParams(translation: string, params: { [key: string]: string }): string {
    return Object.keys(params).reduce(
      (interpolated, param) => interpolated.replace(`{{ ${param} }}`, params[param]),
      translation
    );
  }
}

