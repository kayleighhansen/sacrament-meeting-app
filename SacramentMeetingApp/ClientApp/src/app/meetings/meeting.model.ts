import { Hymn } from "./hymn.model";
import { Speaker } from "./speaker.model";
import { Prayer } from "./prayer.model";
import { Bishopric } from "../bishopric/bishopric.model";

export class Meeting {
    // subscribe(arg0: (item: any) => void) {
    //   throw new Error('Method not implemented.');
    // }

    public id : number;
    public date : string;
    
    public presidingId : Bishopric;
    public conductingId : Bishopric;

    public openingPrayer : string;
    public closingPrayer : string;

    public openingHymn : number;
    public sacramentHymn : number;
    public intermediateHymn : number;
    public closingHymn : number;
    public dismissalHymn : number;

    public speakers : Speaker[];

    public isFastSunday : boolean;
    public isSpecialMusic : boolean;

    public musician : string;
    public song : string;


    constructor(id: number, 
                date: string, 
                presidingId: Bishopric,
                conductingId: Bishopric,
                openingPrayer: string,
                closingPrayer: string,
                openingHymn: number,
                sacramentHymn: number,
                intermediateHymn: number,
                closingHymn: number,
                dismissalHymn: number,
                speakers: Speaker[],
                isFastSunday: boolean,
                isSpecialMusic: boolean,
                musician: string,
                song: string,
                ) {

        this.id = id;
        this.date = date;
        this.presidingId = presidingId;
        this.conductingId = conductingId;
        this.openingPrayer = openingPrayer;
        this.closingPrayer = closingPrayer;
        this.openingHymn = openingHymn;
        this.sacramentHymn = sacramentHymn;
        this.intermediateHymn = intermediateHymn;
        this.closingHymn = closingHymn;
        this.dismissalHymn = dismissalHymn;
        this.speakers = speakers;
        this.isFastSunday = isFastSunday;
        this.isSpecialMusic = isSpecialMusic;
        this.musician = musician;
        this.song = song;
    }

}