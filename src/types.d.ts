type Month =
    | 'january'
    | 'february'
    | 'march'
    | 'april'
    | 'may'
    | 'june'
    | 'july'
    | 'august'
    | 'september'
    | 'october'
    | 'november'
    | 'december';

type Year = 2020 | 2021 | 2022;

type EventId = `${Month}${Year}`;

interface AppleEventsJson {
    events: { [id in EventId]: AppleEvent };
}

interface AppleEvent {
    title: string;
    date: string;
    accentColor: string;
    hashtag: string;
    backgroundFile: string;
}
