import { Component } from '@angular/core';
import { ThemeVariables, ThemeRef, lyl, StyleRenderer } from '@alyle/ui';
import { NetworkService } from './service/network.service';
import {TranslateService} from '@ngx-translate/core';

import { getMessaging } from "firebase/messaging";
const STYLES = (theme: ThemeVariables, ref: ThemeRef) => {
  const __ = ref.selectorsOf(STYLES);
  return {
    $global: lyl `{
      body {
        background-color: ${theme.background.default}
        color: ${theme.text.default}
        font-family: ${theme.typography.fontFamily}
        margin: 0
        direction: ${theme.direction}
      }
    }`,
    root: lyl `{
      display: block
    }`
  };
};

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [StyleRenderer]
})
export class AppComponent {
  readonly classes = this.sRenderer.renderSheet(STYLES, true);

  title = 'App';
  param = {value: 'world'};

  constructor(readonly sRenderer: StyleRenderer,public network: NetworkService,private translate: TranslateService) {
    getMessaging();
    translate.addLangs(['en', 'ar']);
    translate.setDefaultLang('en');
    translate.use('en');
  }

  switchLang(lang: string) {
    this.translate.use(lang);
  }


}
