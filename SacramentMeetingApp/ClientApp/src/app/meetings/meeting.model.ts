import { Hymn } from "./hymn.model";
import { Speaker } from "./speaker.model";
// import { Prayer } from "./prayer.model";
import { Bishopric } from "../bishopric/bishopric.model";

export class Meeting {
    // subscribe(arg0: (item: any) => void) {
    //   throw new Error('Method not implemented.');
    // }

    public id : number;
    // public meetingId : number;
    public date : string;
    
    public presidingId : Bishopric;
    public conductorId : Bishopric;

    public openingPrayer : string;
    public closingPrayer : string;

    public openingHymnNumber : number;
    public sacramentHymnNumber : number;
    public intermediateHymnNumber : number;
    public closingHymnNumber : number;
    public dismissalHymnNumber : number;

    public speakers : Speaker[];

    public isFastSunday : boolean;
    public isSpecialMusicNumber : boolean;

    public specialMusicNumberMusician : string;
    public specialMusicNumberSong : string;


    constructor(id: number, 
                // meetingId : number,
                date: string, 
                presidingId: Bishopric,
                conductorId: Bishopric,
                openingPrayer: string,
                closingPrayer: string,
                openingHymnNumber: number,
                sacramentHymnNumber: number,
                intermediateHymnNumber: number,
                closingHymnNumber: number,
                dismissalHymnNumber: number,
                speakers: Speaker[],
                isFastSunday: boolean,
                isSpecialMusicNumber: boolean,
                specialMusicNumberMusician: string,
                specialMusicNumberSong: string,
                ) {

        this.id = id;
        // this.meetingId = meetingId
        this.date = date;
        this.presidingId = presidingId;
        this.conductorId = conductorId;
        this.openingPrayer = openingPrayer;
        this.closingPrayer = closingPrayer;
        this.openingHymnNumber = openingHymnNumber;
        this.sacramentHymnNumber = sacramentHymnNumber;
        this.intermediateHymnNumber = intermediateHymnNumber;
        this.closingHymnNumber = closingHymnNumber;
        this.dismissalHymnNumber = dismissalHymnNumber;
        this.speakers = speakers;
        this.isFastSunday = isFastSunday;
        this.isSpecialMusicNumber = isSpecialMusicNumber;
        this.specialMusicNumberMusician = specialMusicNumberMusician;
        this.specialMusicNumberSong = specialMusicNumberSong;
    }

}