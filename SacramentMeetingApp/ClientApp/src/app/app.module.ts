import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { FetchDataComponent } from './fetch-data/fetch-data.component';
import { DisplayComponent } from './meetings/display/display.component';
import { BishopricComponent } from './bishopric/bishopric.component';
import { BishopricDetailComponent } from './bishopric/bishopric-detail/bishopric-detail.component';
import { BishopricStartComponent } from './bishopric/bishopric-start/bishopric-start.component';
import { BishopricListComponent } from './bishopric/bishopric-list/bishopric-list.component';
import { MeetingComponent } from './meetings/meeting/meeting.component';
import { HomeComponent } from './home/home.component';
import { AddMeetingComponent } from './meetings/add-meeting/add-meeting.component';

@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    FetchDataComponent,
    DisplayComponent,
    BishopricComponent,
    BishopricDetailComponent,
    BishopricStartComponent,
    BishopricListComponent,
    MeetingComponent,
    HomeComponent,
    AddMeetingComponent,
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot([
      { path: '', component: HomeComponent, pathMatch: 'full' },
      { path: 'bishopric', component: BishopricComponent },
      { path: 'add-meeting', component: AddMeetingComponent }
    ])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
