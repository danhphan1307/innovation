
import {MultilligualString} from '../models/multilligual-string';
import {FacilityStatus, PricingMethod, Usage} from '../models/model-enum';
import {Location} from '../models/location';
export interface Facility{

    id : number;
    name: MultilligualString;
    location: Location;
    operatorId: number ;
    status: FacilityStatus ;
    statusDescription: MultilligualString;
    pricingMethod: PricingMethod;
    builtCapacity: number
    usages: Usage[];

}