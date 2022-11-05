export interface AStaff3 {

    name: string;
    surname: string;
    gender: string;
    region: string;
  }


  export interface AStaff2 {
    staffCode: string;
    title: string;
    name: string;
    surname: string;
    gender: string;
    position: string;
  }

  // export interface Department {
  //   dName: string;
  //   className: string;
  // }


  export interface Staff {

    staffCode: string;
    title: string;
    firstName: string;
    middleName: string;
    otherNames: string;
    lastName: string;
    dOB: Date; // consider making this a date format
    gender: string;
    position: string;
    level: number;
    step: number;
    bank: string;
    bAccNo: string;
    accountName: string;
    status: boolean; // true or false 1 or 0 is this person still a staff?
    sType: string;
    email: string;
    phone: string;

    phone2: string;
    spouseName: string;
    spouseNumber: string;
    classManager: boolean;
    classManaged: string; //name of the class
    homeAddress: string;

    hireDate: Date;
    terminationDate: Date;
    terminationNotes?: string;
    employmentStatus: string; // permanent, contract, temporary, IT, Corper
    tsID: string;
    maritalStatus: string;
    alias: string;
    maidenName: string;
    payGrade: string;
    department: string;
    creationStamp: Date;
    staffIn: string;
    creationApprovedStaffID?: string;
    nin?: number;
    noOfChildren: number;
    logs: string;

  }

  export interface LeaveRequest{
    creationStamp: string;
    tsID: string;
    lastName: String;
    firstName: String;
    middleName: string;
    department: string;
    gender: string;
    sType: string;
    leaveStart: Date;
    leaveEnd: Date;
    applyDate: Date;
    returnDate: Date;
    status: String; //  pending, approved, ongoing, completed, rejected
    approvedBy: String;
    category: String // maternity, annual, sick, casual, partenity
    logs: string;
  }

  export interface QueryRequest{
    creationStamp: string;
    tsID: string;
    lastName: String;
    firstName: String;
    middleName: string;
    department: string;
    gender: string;
    sType: string;
    queryDate: Date;
    resolutionDate: Date;
    status: String; //  pending, approved, ongoing, completed, rejected
    approvedBy: String;
    logs: string;
  }

  export interface QueryResolution {
    status: string;
    note: string;
    resolutionDate: Date;
    creationStamp: string;
    staffIn: string
    suspensionTerm?: string;
    weekOfSus?: number;
    effectiveDate?: Date; // date to start or effect action
    monthBooked?: number;
    weekBooked?: number;
    dayBooked?: number;
    salaryDeduction?: string;

  }

  export interface QueryInfoData{
    tsID: string;
    lastName: string;
    firstName: string;
    middleName: string;
    queryDate: Date;
    defaultDate: Date;
    note: string;
    position: string;
    department: string;

}

  export interface Notes{
    creationStamp: string;
    note: string;
    staffIn: string
  }

  export interface Offence{
    creationStamp: string;
    offenceNote: string;
    defaultDate: Date;
    staffIn: string
  }

  export interface Resolution{
    creationStamp: string;
    resolutionNote: string;
    resolutionDate: Date;
    staffIn: string
  }

  export interface aQualification{
    schoolAttended: string;
    certificateType: string;
    sDate: Date;
    eDate: Date;
    dateIssued: Date;
    creationStamp?: string;
    fieldOfStudy?: string;
    titleOfDegree?: string;
  }

  export interface QualiType{
    qName: string;
    creationStamp?: string;
  }

  export interface aNextKin {

    title: string;
    fullName: string;
    relationship: string;
    occupation: string;
    email?: string;
    phone: string;
    address: string;
    creationStamp: Date;



  }

  export interface aWorkHistory {
    department: string;
    location: string; // TLC, TISS, TMNPS
    staffPosition: string;
    classManager: boolean;
    classManaged: string; //
    level: number;
    step: number;
    sDate: Date; //effective date
    eDate?: Date; // end date
    promotionMarker: boolean;
    primaryDepartment: boolean;
    // currentDepartment: boolean;
    creationStamp: string;
    staffIn: string;
    logs: string;
  }

  export interface aBranch {
    longName: string;
    shortName: string;
  }

  export interface Department {
    dName: string;
    className: string;
    staffIn?: string;
    creationStamp?: string;
  }

  export interface StaffPosition {
    pName: string;
    staffIn?: string;
    creationStamp?: string;
  }
  export interface Level {
    name: string;
    scale: number;
    qualification: string;
    position: string;
    staffIn: string;
    creationStamp: string;
    baseAmount: number;
    stepIncrement: number;
    scaleList: number[];
    useScaleList: boolean;
  }
