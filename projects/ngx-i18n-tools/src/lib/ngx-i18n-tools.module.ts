import { NgModule } from '@angular/core';
import { NgxI18nToolsComponent } from './ngx-i18n-tools.component';
import { AppInitializerProvider, TranslationService } from './translation.service';
import { HttpClientModule } from '@angular/common/http';
import { TranslatePipe } from './translate.pipe';

@NgModule({
  declarations: [NgxI18nToolsComponent, TranslatePipe],
  imports: [HttpClientModule],
  exports: [NgxI18nToolsComponent, TranslatePipe],
  providers: [TranslationService, AppInitializerProvider],
})
export class NgxI18nToolsModule {}
