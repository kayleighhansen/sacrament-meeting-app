import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { BishopricDetailComponent } from "./bishopric/bishopric-detail/bishopric-detail.component";
import { BishopricEditComponent } from "./bishopric/bishopric-edit/bishopric-edit.component";

import { BishopricStartComponent } from "./bishopric/bishopric-start/bishopric-start.component";
import { MeetingsComponent } from "./meetings/home.component";




const appRoutes: Routes = [
    { path: '', redirectTo: '/recipes', pathMatch: 'full' },
    {
        path: 'meetings', component: MeetingsComponent,
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
