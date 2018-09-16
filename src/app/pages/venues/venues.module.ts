import { NgModule } from '@angular/core';

import { ThemeModule } from '../../@theme/theme.module';
import { VenuesComponent } from './venues.component';

@NgModule({
  imports: [
    ThemeModule,
  ],
  declarations: [
    VenuesComponent,
  ],
})
export class VenuesModule { }
