import {MultilligualString} from './multilligual-string';
import {Address} from './address';
export class Hub{

    id : number;
    name: MultilligualString;
    location: number;
    facilityIds: [number];
    address: Address
    constructor(info: any){
        this.id = info.id;
        this.name = info.name;
        this.facilityIds = info.facilityIds;
        this.address = info.address;
    }
}
