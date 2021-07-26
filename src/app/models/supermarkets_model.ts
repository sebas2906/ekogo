declare module namespace {

    export interface Supermarket {
        name: string;
        photo: string;
        rating: string;
    }

    export interface Results {
        _id: string;
        supermarkets: Supermarket[];
    }

    export interface Super {
        results: Results;
    }

}
