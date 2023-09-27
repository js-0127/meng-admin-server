import { Injectable } from '@nestjs/common';
import { I18nContext, I18nService } from 'nestjs-i18n';
@Injectable()
export class AppService {
  constructor(private readonly i18n: I18nService){}
  getHello(): string {    
    console.log(I18nContext.current().lang);
    
    return this.i18n.t('test.animals',{ lang:   I18nContext.current().lang });
  }
}
