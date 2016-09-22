
import {Address} from './address';
import {MultilligualString} from './multilligual-string';
export class Contact{

    id : number;
    name: MultilligualString ;
    operatorId: number;
    email: string ;
    phone: string ;
    info: MultilligualString;
    openingHours: MultilligualString;
    address: Address;

    constructor(info: any){
        this.id = info.id;
        this.name = info.name;
        this.operatorId = info.operatorId;
        this.email = info.email;
        this.phone = info.phone;
        this.address = info.address;
        this.openingHours = info.openingHours;
        this.info = info.info;
    }
}