export type SeatData = {
    title: string;
    date: string;
    row: string;
    seatNumber: number;
    costPlace: number;
    cost: number;
    quantity: number;
};

export type ReservedSeatsByDate = {
    [date: string]: string[];
};

export interface WineItem {
    id: number;
    wineName: string;
    cost: number;
    overview: string;
    quantity: number;
}

export interface FoodItem {
    id: number;
    imageFood: any;
    comment: string;
    cost: number;
    quantity: number;
}
export interface DrinkItem {
    id: number;
    drinkName: string;
    cost: number;
    overview: string;
    quantity: number;
    category: string;
}
export type taskType = {
    id: number
    drinkName: string
    cost: number
    overview: string
    quantity: number
}
