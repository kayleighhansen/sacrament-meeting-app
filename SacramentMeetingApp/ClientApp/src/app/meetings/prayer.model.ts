export class Prayer {
    subscribe(arg0: (item: any) => void) {
      throw new Error('Method not implemented.');
    }

    public id : string;
    public name : string;
    public type : string;

    constructor(id: string, 
                name: string, 
                type: string) {
                    
        this.id = id;
        this.name = name;
        this.type = type;
    }
}