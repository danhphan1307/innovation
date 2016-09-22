import { MultilligualString} from './multilligual-string';

export class Address{
    streetAddress: MultilligualString;
    postalCode : String;
    city: MultilligualString;

    constructor(info: any){
        this.streetAddress = info.streetAddress;
        this.postalCode = info.postalCode;
        this.city = info.city;
    }
}