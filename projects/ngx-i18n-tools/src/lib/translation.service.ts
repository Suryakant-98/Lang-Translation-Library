import { Injectable, APP_INITIALIZER } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TranslationService {
  private translations: { [lang: string]: { [key: string]: string } } = {};
  private currentLanguageSubject = new BehaviorSubject<string>('en');
  
  // BehaviorSubject to indicate whether translations have been loaded or not
  private translationsLoadedSubject = new BehaviorSubject<boolean>(false);

  constructor(private http: HttpClient) {}

  // Asynchronous method to load translations from a file for a specific language
  async loadTranslationsFromFile(language: string, filePath: string): Promise<void> {
    try {
      const translations = await this.http.get<{ [key: string]: string }>(filePath).toPromise();
      // If translations for the language do not exist, initialize an empty object
      if (!this.translations[language]) {
        this.translations[language] = {};
      }
      // Merge the fetched translations into the existing translations for the language
      Object.assign(this.translations[language], translations);
      // Notify subscribers that translations have been loaded
      this.translationsLoadedSubject.next(true);
    } catch (error) {
      console.error(`Error loading translations for language: ${language}`, error);
    }
  }

  // Method to set the current language
  setLanguage(language: string): void {
    // If translations for the specified language exist, update the current language
    if (this.translations[language]) {
      this.currentLanguageSubject.next(language);
    } else {
      console.error(`Translations not available for language: ${language}`);
    }
  }

  // Getter method to retrieve the current selected language
  get currentLanguage(): string {
    return this.currentLanguageSubject.value;
  }

  // Method to check if translations have been loaded
  isTranslationsLoaded(): boolean {
    return this.translationsLoadedSubject.value;
  }

  // Method to translate a key into the current language, with optional parameters
  translate(key: string, params?: { [key: string]: string }): string {
    const language = this.currentLanguage;
    
    // Retrieve the translation for the key in the current language
    const translation = this.translations[language] && this.translations[language][key];

    // If a translation exists, interpolate any parameters into the translation
    if (translation) {
      return params ? this.interpolateParams(translation, params) : translation;
    } else {
      console.warn(`Translation not found for key: ${key} in language: ${language}`);
      return key;
    }
  }

  // interpolate parameters into a translation
  private interpolateParams(translation: string, params: { [key: string]: string }): string {
    // Use reduce to replace each parameter placeholder with its corresponding value
    return Object.keys(params).reduce(
      (interpolated, param) => interpolated.replace(`{{ ${param} }}`, params[param]),
      translation
    );
  }
}

// Factory function for the Angular APP_INITIALIZER token to load translations during application initialization
export function appInitializerFactory(translationService: TranslationService): () => Promise<void> {
  // Return a function that loads translations for the default language (e.g., 'en') from a specific file path
  return () => translationService.loadTranslationsFromFile('en', 'assets/i18n/en.json');
}


// Provider configuration for the Angular APP_INITIALIZER token
export const AppInitializerProvider = {
  provide: APP_INITIALIZER,
  useFactory: appInitializerFactory,
  deps: [TranslationService],
  multi: true,
};

