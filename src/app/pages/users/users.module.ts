import { NgModule } from '@angular/core';

import { ThemeModule } from '../../@theme/theme.module';
import { UsersComponent } from './users.component';

@NgModule({
  imports: [
    ThemeModule,
  ],
  declarations: [
    UsersComponent,
  ],
})
export class UsersModule { }
