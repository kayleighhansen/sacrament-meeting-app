export class Bishopric {
    // subscribe(arg0: (item: any) => void) {
    //   throw new Error('Method not implemented.');
    // }

    public id : number;
    public name : string;
    public calling : string;
    public status : string;
    

    constructor(id: number, 
                name: string, 
                calling: string,
                status: string) {
        this.id = id;
        this.name = name;
        this.calling = calling;
        this.status = status;

    }
}