// hello ruben

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
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
import { DropdownDirective } from './shared/dropdown.directive';
import { MeetingItemComponent } from './meetings/meeting-item/meeting-item.component';

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
    DropdownDirective,
    EditMeetingComponent,
    FetchDataComponent,
    HomeComponent,
    MeetingComponent,
    NavMenuComponent,
    MeetingItemComponent,
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot([
      { path: '', redirectTo: '/home', pathMatch: 'full' },
      {
        path: 'home', component: HomeComponent, children:[
            { path: ':id', component: DisplayComponent }]
      },
      { path: 'add', component: AddMeetingComponent },
      { path: 'home/:id/edit', component: EditMeetingComponent },

      {
        path: 'bishopric', component: BishopricComponent, children: [
          { path: '', component: BishopricStartComponent },
          { path: 'new', component: BishopricEditComponent },
          { path: ':id', component: BishopricDetailComponent },
          { path: ':id/edit', component: BishopricEditComponent },
        ]
      }
    ])
  ],
  providers: [],
  bootstrap: [AppComponent]
})




export class AppModule { }
