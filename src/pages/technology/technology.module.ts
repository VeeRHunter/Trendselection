import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TechnologyPage } from './technology';

@NgModule({
  declarations: [
    TechnologyPage,
  ],
  imports: [
    IonicPageModule.forChild(TechnologyPage),
  ],
})
export class TechnologyPageModule {}
