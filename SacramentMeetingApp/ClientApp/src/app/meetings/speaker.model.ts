export class Speaker {
    subscribe(arg0: (item: any) => void) {
      throw new Error('Method not implemented.');
    }

    public id : string;
    public name : string;
    public topic : string;

    constructor(id: string, 
                name: string, 
                topic: string) {
                    
        this.id = id;
        this.name = name;
        this.topic = topic;
    }
}