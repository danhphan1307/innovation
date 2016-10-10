
import {MultilligualString} from './multilligual-string';
import {FacilityStatus, PricingMethod, Usage} from './model-enum';
export class Facility{

    id : number;
    name: MultilligualString;
    location: number;
    operatorId: number ;
    status: FacilityStatus ;
    statusDescription: MultilligualString;
    pricingMethod: PricingMethod;
    builtCapacity: number
    usages: Usage[];

    constructor(info: any){
        this.id = info.id;
        this.name = info.name;
        this.operatorId = info.operatorId;
        this.status = info.status;
        this.statusDescription = info.statusDescription;
        this.pricingMethod = info.pricingMethod;
        this.builtCapacity = info.builtCapacity;
        this.usages = info.usages;
    }

}