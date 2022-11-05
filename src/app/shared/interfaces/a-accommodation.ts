import { Staff } from './a-staff';

export interface AAccommodation {
    name: string;
    location: string;
}

export interface AFlat {
    name: string;
    fType: string;
}

export interface AApartment {
    aTag: string;
    name: string;
    ensuite: number;
}

export interface AccLarge {
    aAcc: AAccommodation;
    aFlat: AFlat;
    aAppt: AApartment;
    aStaff: Staff;
}

export interface AccLarge2 {
    aAcc: AAccommodation;
    aFlat: AFlat;
    aAppt: AApartment;
    aStaffCode: string;
    staffName: string;
    sDate: Date;
}

export interface AccSimple {
    accName: string;
    flatName: string;
    aptName: string;

}

export interface AccSimple2 {
    accName: string;
    flatName: string;
    aptName: string;
    aStaffCode: string;
    staffName: string;
}

export interface AccLarge3 {
    aAcc: AAccommodation;
    aDetail: any[];

}
