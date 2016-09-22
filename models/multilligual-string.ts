
export class MultilligualString{

    fi: string;
    en: string;
    sv: string;

    constructor(userInfo: any){
        this.fi = userInfo.fi;
        this.en = userInfo.en;
        this.sv = userInfo.sv;
    }
}