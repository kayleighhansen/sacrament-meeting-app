import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { BishopricDetailComponent } from "./bishopric/bishopric-detail/bishopric-detail.component";
import { BishopricEditComponent } from "./bishopric/bishopric-edit/bishopric-edit.component";
import { BishopricListComponent } from "./bishopric/bishopric-list/bishopric-list.component";
import { BishopricStartComponent } from "./bishopric/bishopric-start/bishopric-start.component";
import { BishopricComponent } from "./bishopric/bishopric.component";
import { HomeComponent } from "./home/home.component";
import { AddMeetingComponent } from "./meetings/add-meeting/add-meeting.component";
import { DisplayComponent } from "./meetings/display/display.component";
import { EditMeetingComponent } from "./meetings/edit-meeting/edit-meeting.component";

const appRoutes: Routes = [
    { path: '', component: HomeComponent, pathMatch: 'full' },
    {
        path: 'home', component: HomeComponent, children:
            [
                { path: ':id', component: DisplayComponent }
            ]
    },
    { path: ':id/edit', component: EditMeetingComponent },
    { path: 'add-meeting', component: AddMeetingComponent },
    {
        path: 'bishopric', component: BishopricComponent,
        children: [
            { path: '', component: BishopricStartComponent },
            { path: 'new', component: BishopricEditComponent },
            { path: ':id', component: BishopricDetailComponent },
            { path: ':id/edit', component: BishopricEditComponent },

        ]
    },
]

@NgModule({
    imports: [RouterModule.forRoot(appRoutes)],
    exports: [RouterModule]
})
export class AppRoutingModule {

}
