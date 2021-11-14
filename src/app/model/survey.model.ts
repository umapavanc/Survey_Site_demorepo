export class Survey
{
  constructor(
   
    public _id?: number,
    public name?: string,
    public author?: string,
    public sumbissions?: number,
    public questions?: number,
   
  ){}

  public toString(): string
  {
    return `
    Survey
    -------------------------------
    Survey #        : ${this._id}
    Name            : ${this.name}
    Author          : ${this.author}
    Submissions     : ${this.sumbissions}
    # of Questions  : ${this.questions}
  
    -------------------------------
    `;
  }
}
