import { ModuleWithProviders, NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NbAuthModule, NbDummyAuthStrategy, NbPasswordAuthStrategy, NbAuthJWTToken } from '@nebular/auth';
import { NbSecurityModule, NbRoleProvider } from '@nebular/security';
import { of as observableOf } from 'rxjs';

import { throwIfAlreadyLoaded } from './module-import-guard';
import { DataModule } from './data/data.module';
import { AnalyticsService } from './utils/analytics.service';

const socialLinks = [
  // {
  //   url: 'https://github.com/akveo/nebular',
  //   target: '_blank',
  //   icon: 'socicon-github',
  // },
  // {
  //   url: 'https://www.facebook.com/akveo/',
  //   target: '_blank',
  //   icon: 'socicon-facebook',
  // },
  // {
  //   url: 'https://twitter.com/akveo_inc',
  //   target: '_blank',
  //   icon: 'socicon-twitter',
  // },
];

const formSetting: any = {
  redirectDelay: 0,
  socialLinks: socialLinks,
  showMessages: {
    success: true,
  },
};

export class NbSimpleRoleProvider extends NbRoleProvider {
  getRole() {
    // here you could provide any role based on any auth flow
    return observableOf('guest');
  }
}

export const NB_CORE_PROVIDERS = [
  ...DataModule.forRoot().providers,
  ...NbAuthModule.forRoot({

    strategies: [
      NbDummyAuthStrategy.setup({
        name: 'email',
        delay: 2000,
      }),
      // TODO: Enable normal password auth strategy
      // NbPasswordAuthStrategy.setup({
      //   name: 'email',
      //   baseEndpoint: 'http://example.com/app-api/v1',
      //   login: {
      //     endpoint: '/auth/sign-in',
      //     method: 'post',
      //   },
      //   register: {
      //     endpoint: '/auth/sign-up',
      //     method: 'post',
      //   },
      //   logout: {
      //     endpoint: '/auth/sign-out',
      //     method: 'post',
      //   },
      //   requestPass: {
      //     endpoint: '/auth/request-pass',
      //     method: 'post',
      //   },
      //   resetPass: {
      //     endpoint: '/auth/reset-pass',
      //     method: 'post',
      //   },
      //   token: {
      //     class: NbAuthJWTToken,
      //
      //     key: 'token', // this parameter tells where to look for the token
      //   }
      // }),
    ],
    forms: {
      login: formSetting,
      register: formSetting,
      requestPassword: formSetting,
      resetPassword: formSetting,
      logout: {
        redirectDelay: 0,
      },
    },
  }).providers,

  NbSecurityModule.forRoot({
    accessControl: {
      guest: {
        view: '*',
      },
      user: {
        parent: 'guest',
        create: '*',
        edit: '*',
        remove: '*',
      },
    },
  }).providers,

  {
    provide: NbRoleProvider, useClass: NbSimpleRoleProvider,
  },
  AnalyticsService,
];

@NgModule({
  imports: [
    CommonModule,
  ],
  exports: [
    NbAuthModule,
  ],
  declarations: [],
})
export class CoreModule {
  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    throwIfAlreadyLoaded(parentModule, 'CoreModule');
  }

  static forRoot(): ModuleWithProviders {
    return <ModuleWithProviders>{
      ngModule: CoreModule,
      providers: [
        ...NB_CORE_PROVIDERS,
      ],
    };
  }
}
