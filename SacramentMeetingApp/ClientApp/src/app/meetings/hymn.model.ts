export class Hymn {
    subscribe(arg0: (item: any) => void) {
      throw new Error('Method not implemented.');
    }

    public id : string;
    public name : string;
    public songNumber : string;

    constructor(id: string, 
                name: string, 
                songNumber: string) {
        this.id = id;
        this.name = name;
        this.songNumber = songNumber;
    }
}