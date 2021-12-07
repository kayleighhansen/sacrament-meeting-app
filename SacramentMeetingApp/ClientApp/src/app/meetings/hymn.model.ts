export class Hymn {
    subscribe(arg0: (item: any) => void) {
      throw new Error('Method not implemented.');
    }

    public id : number;
    public name : string;
    public songNumber : string;

    constructor(id: number, 
                name: string, 
                songNumber: string) {
        this.id = id;
        this.name = name;
        this.songNumber = songNumber;
    }
}