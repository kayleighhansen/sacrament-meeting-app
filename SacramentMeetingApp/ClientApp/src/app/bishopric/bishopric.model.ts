export class Bishopric {
    public id: number;
    public name: string;
    public calling: string;
    public status: boolean;

    constructor(id: number, name: string, calling: string, status: boolean) {
        this.id = id;
        this.name = name;
        this.calling = calling;
        this.status = status;
    }
}