export interface User {
  tsID: string;
  lName: string;
  fName: string;
  password: string;
  permission: string;
  isActive: boolean;
  staffID_in: string; // staff that created this user
  createStamp?: Date;


}
