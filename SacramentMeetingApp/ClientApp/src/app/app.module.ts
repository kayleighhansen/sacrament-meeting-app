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
import { EditMeetingComponent } from './meetings/edit-meeting/edit-meeting.component';
import { BishopricItemComponent } from './bishopric/bishopric-list/bishopric-item/bishopric-item.component';
import { BishopricEditComponent } from './bishopric/bishopric-edit/bishopric-edit.component';

@NgModule({
  declarations: [
    AddMeetingComponent,
    AppComponent,
    BishopricComponent,
    BishopricDetailComponent,
    BishopricItemComponent,
    BishopricListComponent,
    BishopricStartComponent,
    BishopricEditComponent,
    DisplayComponent,
    EditMeetingComponent,
    FetchDataComponent,
    HomeComponent,
    MeetingComponent,
    NavMenuComponent,
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot([
      { path: '', component: HomeComponent, pathMatch: 'full' },
      {
        path: 'home', component: HomeComponent, children:
          [
            { path: ':id', component: DisplayComponent }
          ]
      },
      { path: ':id/edit', component: EditMeetingComponent },
      {
        path: 'bishopric', component: BishopricComponent, children: [
          { path: '', component: BishopricStartComponent },
          { path: 'new', component: BishopricEditComponent },
          { path: ':id', component: BishopricDetailComponent },
          { path: ':id/edit', component: BishopricEditComponent },
        ]
      },
      { path: 'add-meeting', component: AddMeetingComponent }
    ])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
