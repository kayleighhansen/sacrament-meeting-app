import { Hymn } from "./hymn.model";
import { Speaker } from "./speaker.model";
import { Prayer } from "./prayer.model";
import { Bishopric } from "../bishopric/bishopric.model";

export class Meeting {
    subscribe(arg0: (item: any) => void) {
      throw new Error('Method not implemented.');
    }

    public id : string;
    public date : string;
    
    public presidingId : string;
    public conductingId : string;

    public openingPrayer : string;
    public closingPrayer : string;

    public openingHymn : Hymn;
    public sacramentHymn : Hymn;
    public closingHymn : Hymn;
    public dismissalHymn : Hymn;

    public speakers : Speaker[];

    public isFastSunday : boolean;
    public isSpecialMusic : boolean;

    public musician : string;
    public song : string;


    constructor(id: string, 
                date: string, 
                presidingId: string,
                conductingId: string,
                openingPrayer: string,
                closingPrayer: string,
                openingHymn: Hymn,
                sacramentHymn: Hymn,
                closingHymn: Hymn,
                dismissalHymn: Hymn,
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
        this.closingHymn = closingHymn;
        this.dismissalHymn = dismissalHymn;
        this.speakers = speakers;
        this.isFastSunday = isFastSunday;
        this.isSpecialMusic = isSpecialMusic;
        this.musician = musician;
        this.song = song;
    }

}