import { Injectable } from '@angular/core';
import { KLoginService } from './klogin.service';

@Injectable({
  providedIn: 'root'
})
export class CompanyInfoService {

  constructor(public angularS1: KLoginService) {


  }

  getAllSubsidiaries(): string[] {
    this.angularS1.doConnect();
    const mySubsidiaryList = [] ;
    const query = 'MATCH (n:Subsidiary) RETURN n.sCode';
    this.angularS1.angularS.run(query).then(res => {
      for (const r of res) {
        mySubsidiaryList.push(r[0]);
        // console.log(r[0]);
      }

      });
    // this.angularS1.doDisConnect();
    return mySubsidiaryList;
  }
}
