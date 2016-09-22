
import {MultilligualString} from './multilligual-string';
export class Operator{

    id : number;
    name: MultilligualString ;

    constructor(userInfo: any){
        this.id = userInfo.id;
        this.name = userInfo.name;

    }
}