import { Injectable} from "@angular/core";
import { Survey } from "./survey.model";
import { StaticDataSource} from "./static.datasource";
import { analyzeAndValidateNgModules } from "@angular/compiler";


@Injectable()
export class SurveyRepository
{
    private surveys: Survey[] = [];
    private authors: string[] = [];
    

    constructor(private dataSource: StaticDataSource)
    {
        dataSource.getSurvey().subscribe((data: any[]) => {
            this.surveys = data;
            this.authors = data.map((s: { author: any; }) => s.author).filter((a: any, index: any, array: string | any[]) => array.indexOf(a) === index).sort();
        });
    }

    //filter and return surveys by author
    //getSurveys(author: string = null): Survey[]
  //  {
   //     return this.surveys.filter(s => author == null || author === s.author);
   // }

    // return survey by id
    getSurveys(id: number): Survey {
        return this.surveys.find((s: {id: any;})  => s._id === id);
    }

    getAuthors(): string[]
    {
        return this.authors;
    }
}