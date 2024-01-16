import { NgModule } from '@angular/core';
import { NgxI18nToolsComponent } from './ngx-i18n-tools.component';
import { TranslationService } from './translation.service';

@NgModule({
  declarations: [NgxI18nToolsComponent],
  imports: [],
  exports: [NgxI18nToolsComponent],
  providers: [TranslationService],
})
export class NgxI18nToolsModule {}
