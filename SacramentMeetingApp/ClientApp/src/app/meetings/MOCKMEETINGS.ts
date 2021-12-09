import { Meeting } from "./meeting.model";

export const MOCKMEETINGS: Meeting[] = [
    {
        id: 0,
        date: '11-11-1111',

        presidingId :  {
            id: 0,
            name: "Lady Gaga",
            calling: "First Counselor",
            status: true
        },
        conductingId:  {
            id: 1,
            name: "John Cena",
            calling: "Bishop",
            status: true
        },
        openingPrayer: "Taylor Swift",
        closingPrayer: "Julius Cesaer",

        openingHymn: 1,
        sacramentHymn: 2,
        intermediateHymn: 3,
        closingHymn: 4,
        dismissalHymn: 5,

        speakers : [
            {
                id: 0,
                name: "Bruno Mars",
                topic: "The Atonement"
            },
            {
                id: 1,
                name: "Owl City",
                topic: "The Atonement"
            },
            {
                id: 3,
                name: "Beyonce",
                topic: "The Atonement"
            },
        ],

        isFastSunday: false,
        isSpecialMusic: false,

        musician: null,
        song: null
    },
    {
        id: 1,
        date: '12-07-2021',

        presidingId :  {
            id: 0,
            name: "Lady Gaga",
            calling: "First Counselor",
            status: true
        },
        conductingId:  {
            id: 1,
            name: "John Cena",
            calling: "Bishop",
            status: true
        },
        openingPrayer: "Taylor Swift",
        closingPrayer: "Julius Cesaer",

        openingHymn: 1,
        sacramentHymn: 2,
        intermediateHymn: 3,
        closingHymn: 4,
        dismissalHymn: 5,

        speakers : [],

        isFastSunday: true,
        isSpecialMusic: true,

        musician: "The Tabernacle Choir",
        song: "We Will Rock You"
    }

]