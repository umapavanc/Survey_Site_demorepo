import { NgModule} from "@angular/core";
import { BrowserModule} from "@angular/platform-browser";
import { FormsModule } from "@angular/forms";
import { ModelModule} from "../model/model.module";
import { EditSurveyComponent} from '../edit-survey/edit-survey.component';

@NgModule({
    imports: [ModelModule, BrowserModule, FormsModule],
    declarations: [EditSurveyComponent],
    exports: [EditSurveyComponent]
})
export class  EditSurveyModule {}