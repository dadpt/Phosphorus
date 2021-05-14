class Position {
    lat: number;
    lon: number;
    alt: number;
    groundspeed: number;
    transponder:number;
    constructor (lat: number, lon: number, alt:number, gs:number, transponder: number){
        this.lat = lat;
        this.lon = lon;
        this.alt = alt;
        this.groundspeed = gs;
        this.transponder = transponder
    }
}

class FlightPlan {
    PlanType: string;
    ACType: string;
    TASCruise: string | undefined;
    DepAirport: string;
    ArrAirport: string;
    AltAirport: string;
    ETD: string | undefined;
    ATD: string | undefined;
    ETA: string | undefined;
    ATA: string | undefined;
    AltCruise: string;
    AltCleared: string | undefined;
    hrPlan: string | undefined;
    minPlan: string | undefined;
    hrFuel: string | undefined;
    minFuel: string | undefined;
    route: string | undefined;
    remark: string | undefined;
    constructor (PlanType: string, AircraftType: string, TASCruise: string, DepAirport: string, ArrAirport: string, AltAirport: string, ETD: any, ATD: any, ATA: string, ETA: any, AltCruise: string, AltCleared: string, hrPlan: string | undefined, minPlan: string | undefined, hrFuel: string | undefined, minFuel: string | undefined, route: string, remark: string | undefined ) {
        this.PlanType=PlanType;
        this.ACType=AircraftType;
        this.DepAirport=DepAirport;
        this.ArrAirport=ArrAirport;
        this.AltAirport=AltAirport;
        this.ETA=ETA;
        this.ETD=ETD;
        this.ATD=ATD;
        this.ETD=ETD;
        this.AltCruise=AltCruise;
        this.hrPlan=hrPlan;
        this.hrFuel=hrFuel;
        this.minPlan=minPlan;
        this.minFuel=minFuel;
        this.route=route;
        this.remark=remark
    }
}

class Pilot{
    public location: string | undefined;
    public cid: string;
    public type: string;
    public callsign: string;
    public protocol: number;
    public position: Position;
    public simtype: string;
    public realname: string;
    public starttime: number;
    public frequency: number;
    public facilitytype: number;
    public identflag: boolean;
    public sector: any;
    public rating: number;
    public visualrange: number;
    public plan: FlightPlan | undefined
    public constructor (position: Position, cid: string, location: string | undefined, type: string, callsign: string, st: string, real: string, time: number, rev: number, reqrating: number, visualrange: number){
        this.location=location;
        this.cid=cid.toString();
        this.type=type;
        this.callsign=callsign;
        this.protocol=rev;
        this.sector=undefined;
        this.identflag=false;
        this.facilitytype=0;
        this.rating=reqrating;
        this.visualrange=40;
        this.plan=undefined;
        this.position=position
        this.simtype=st;
        this.realname=real;
        this.starttime=time;
        this.frequency=0;
        this.visualrange=visualrange;
    }
    updatepilot(fsdpackage: any): void {
        let a,b,c;
        let x,y,z;
        fsdpackage;
    } 
}
export {
    Pilot as default,
    FlightPlan,
    Position
}
