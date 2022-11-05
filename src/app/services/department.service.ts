import { Injectable } from '@angular/core';
import { AsyncSubject } from 'rxjs';
import { Department, Level, StaffPosition } from '../shared/interfaces/a-staff';


@Injectable({
  providedIn: 'root'
})
export class DepartmentService {

  constructor() { }

  getAllDepartments(): string[] {
    // this.angularS1.doConnect();
    const myDeptList = ['LAW', 'SOFTWARE ENGINEERING', 'BUSINESS ADMINISTRATION'] ;
    // const query = 'MATCH (n:Department) RETURN n.dName order by n.dName';
    // this.angularS1.angularS.run(query).then(res => {
    //   for (const r of res) {
    //     myDeptList.push(r[0]);
    //     // console.log(r[0]);
    //   }

    //   });
    // // this.angularS1.doDisConnect();
    return myDeptList;
  }








}

