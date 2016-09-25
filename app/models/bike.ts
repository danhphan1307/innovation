

export class BikeStation{


    constructor(public id : number,
        //public name: string,
        public location: number,
        //public x: number,
        public y: number,
        public bikesAvailable: number,
        public spacesAvailable: number,
        public allowDropoff : boolean,
        public realTimeData: boolean
        ){}
}
