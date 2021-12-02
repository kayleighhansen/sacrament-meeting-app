import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { MeetingsComponent } from './meetings/home.component';
import { FetchDataComponent } from './fetch-data/fetch-data.component';
import { BishopricComponent } from './bishopric-list/bishopric-list.component';
import { BishopricEditComponent } from './bishopric-list/bishopric-edit/bishopric-edit.component';
import { DisplayComponent } from './meetings/display/display.component';

@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    MeetingsComponent,
    FetchDataComponent,
    BishopricComponent,
    BishopricEditComponent,
    DisplayComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot([
      { path: '', component: MeetingsComponent, pathMatch: 'full' },
      { path: 'bishopric', component: BishopricComponent }
    ])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
