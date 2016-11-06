import {MultilligualString} from '../models/multilligual-string';
import {Address} from '../models/address';

export interface Hub {
    id : number;
    name: string;
    //location: number;
    facilityIds: number[];
    address: Address;
}