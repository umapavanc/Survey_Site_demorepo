import { Injectable} from "@angular/core";
import { Survey } from "./survey.model";
import { StaticDataSource} from "./static.datasource";


@Injectable()
export class SurveyRepository
{
    private surveys: Survey[] = [];
    private authors: string[] = [];
    

    constructor(private dataSource: StaticDataSource)
    {
        dataSource.getSurvey().subscribe(data => {
            this.surveys = data;
            this.authors = data.map(s => s.author)
            .filter((a, index, array) => array.indexOf(a) === index).sort();
        });
    }

    //filter and return surveys by author
    getSurveys(author: string = null): Survey[]
    {
        return this.surveys.filter(s => author == null || author === s.author);
    }

    // return survey by id
    getSurvey(id: number): Survey{
        return this.surveys.find(s => s._id === id);
    }

    getAuthors(): string[]
    {
        return this.authors;
    }
}