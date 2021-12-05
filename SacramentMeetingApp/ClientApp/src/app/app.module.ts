import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { MeetingsComponent } from './meetings/home.component';
import { FetchDataComponent } from './fetch-data/fetch-data.component';
import { DisplayComponent } from './meetings/display/display.component';
import { BishopricComponent } from './bishopric/bishopric.component';
import { BishopricDetailComponent } from './bishopric/bishopric-detail/bishopric-detail.component';
import { BishopricStartComponent } from './bishopric/bishopric-start/bishopric-start.component';
import { BishopricListComponent } from './bishopric/bishopric-list/bishopric-list.component';

@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    MeetingsComponent,
    FetchDataComponent,
    DisplayComponent,
    BishopricComponent,
    BishopricDetailComponent,
    BishopricStartComponent,
    BishopricListComponent
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
