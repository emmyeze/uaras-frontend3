import { Injectable } from '@angular/core';
import { PassMark, StatusMessage, Student } from '../shared/interfaces/students';
import { environment } from 'src/environments/environment';
import { AsyncSubject, BehaviorSubject } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApplicationService {
  apiUrl = environment.apiUrl;
  apiUrl2 = 'http://localhost:8000';
  passMarkList: BehaviorSubject<PassMark[]> = new BehaviorSubject <PassMark[]>([]);
  StatusMessageUTME: BehaviorSubject<any> = new BehaviorSubject <any>({});


  constructor(private http: HttpClient) { }

  getProgrammes(): string[] {
    // this.angularS1.doConnect();
    const myDeptList = ['LAW', 'SOFTWARE ENGINEERING', 'BUSINESS ADMINISTRATION'] ;

    return myDeptList;
  }

  getCutoffInfo(department: string): AsyncSubject<any[]> {
    const BS: AsyncSubject<any[]> = new AsyncSubject <any[]>();
    let queryParams = new HttpParams();
    queryParams = queryParams.append("department", department );
    let answer = []
    this.http.get<{data: any, status: number}>(`${this.apiUrl}/api/check-dept-cutoff`,{params:queryParams})
    .subscribe((data) => {
      answer = []
      console.log('Received data from API', data)
      answer.push(data)
      BS.next(answer);
      BS.complete();
    });

    return BS;
  }

  getPassmarkInfo(): void {
    // const BS: AsyncSubject<PassMark[]> = new AsyncSubject <PassMark[]>();
    let queryParams = new HttpParams();
    // queryParams = queryParams.append("department", department );
    // let answer = []
    this.http.get<{data: any, status: number}>(`${this.apiUrl}/api/get-passmark?option=1`)
    .subscribe((data) => {
      // answer = []
      console.log('Received data from API', data)
      // answer.push(data.data)
      this.passMarkList.next(data.data);
      // BS.complete();
    });

    // return BS;
  }

  setPassmarkInfo(aPassMarkInfo:PassMark): AsyncSubject<number> {
    const BS: AsyncSubject<number> = new AsyncSubject <number>();
    let queryParams = new HttpParams();
    let passmark = JSON.stringify(aPassMarkInfo)
    queryParams = queryParams.append("passmark", passmark );
    let answer = [passmark]
    this.http.post(`${this.apiUrl}/api/set-passmark`, answer)
    .subscribe((data) => {
      // answer = []
      console.log('Received data from API', data)
      // answer.push(data.data)
      BS.next(1);
      BS.complete();
    });

    return BS;
  }

  editPassmarkInfo(aPassMarkInfo:PassMark): AsyncSubject<number> {
    const BS: AsyncSubject<number> = new AsyncSubject <number>();
    let queryParams = new HttpParams();
    let passmark = JSON.stringify(aPassMarkInfo)
    console.log('to send data for API', passmark)

    queryParams = queryParams.append("passmark", passmark );
    let answer = [passmark, 1]
    // let answer = []
    // answer.push(passmark)
    this.http.post(`${this.apiUrl}/api/set-passmark`,answer)

    // this.http.post<{data: any, status: number}>(`${this.apiUrl}/api/set-passmark`,{params:queryParams})
    .subscribe((data) => {
      // answer = []
      console.log('Received data from API', data)
      // answer.push(data.data)
      BS.next(1);
      BS.complete();
    });

    return BS;
  }

  deletePassmarkInfo(aPassMarkInfo:PassMark): AsyncSubject<number> {
    const BS: AsyncSubject<number> = new AsyncSubject <number>();
    let queryParams = new HttpParams();
    let passmark = JSON.stringify(aPassMarkInfo)
    queryParams = queryParams.append("passmark", passmark );
    let answer = [passmark]
    this.http.post(`${this.apiUrl}/api/del-passmark`,answer)
    .subscribe((data) => {
      // answer = []
      console.log('Received data from API', data)
      // answer.push(data.data)
      BS.next(1);
      BS.complete();
    });

    return BS;
  }

  getStudentRecord(studentJAMBRegNo: string, type:string="UTME"): AsyncSubject<any[]> {
    const BS: AsyncSubject<any[]> = new AsyncSubject <any[]>();
    let queryParams = new HttpParams();
    queryParams = queryParams.append("regNo", studentJAMBRegNo );
    queryParams = queryParams.append("type", type );
    let answer = []
    this.http.get<{studentRecord: Student, status: number}>(`${this.apiUrl}/api/check-valid-regno`,{params:queryParams})
    .subscribe((data) => {
      answer = []
      console.log('Received data from API', data)
      answer.push(data)
      BS.next(answer);
      BS.complete();
    });

    return BS;
  }

  getStatus(type:string="UTME", lastOpStat?: string): void{
    // const BS: AsyncSubject<any[]> = new AsyncSubject <any[]>();
    let queryParams = new HttpParams();

    queryParams = queryParams.append("type", type );
    // ts-ignore
    queryParams = lastOpStat ? queryParams.append("lastOpStat", lastOpStat ) : queryParams;
    let answer = []
    this.http.get<{statusMessage: StatusMessage}>(`${this.apiUrl}/api/status`,{params:queryParams})
    .subscribe((data) => {
      // answer = []
      console.log('Received data from API', data)
      // answer.push(data)
      this.StatusMessageUTME.next(data.statusMessage);
      // BS.complete();
    });

    // return BS;
  }

  registerStudent(student: Student): AsyncSubject<any[]> {
    const BS: AsyncSubject<any[]> = new AsyncSubject <any[]>();
    let queryParams = new HttpParams();
    const json = JSON.stringify(student);
    queryParams = queryParams.append("student", json );
    console.log('sent data to API', json)

    let answer = []
    answer.push(json)
    this.http.post(`${this.apiUrl}/api/register-candidate`,answer)
    .subscribe((data) => {
      answer = []
      console.log('Received data from API', data)
      answer.push(data)
      BS.next(answer);
      BS.complete();
    });

    return BS;
  }

  suggestDepartment(subjectCombo: string[]): AsyncSubject<any> {
    const BS: AsyncSubject<any> = new AsyncSubject <any>();
    let queryParams = new HttpParams();
    const json = JSON.stringify({score: subjectCombo[4], department:subjectCombo[3], sub1: subjectCombo[0], sub2: subjectCombo[1], sub3: subjectCombo[2]});
    queryParams = queryParams.append("subs", json );
    let answer = []
    this.http.get<{combostatus: number, suggest: any[]}>(`${this.apiUrl2}/api/suggest-department`,{params:queryParams})

    // this.http.get<{combostatus: number, suggest: any[]}>(`${this.apiUrl}/api/suggest-department`,{params:queryParams})
    .subscribe((data) => {
      // answer = []
      console.log('Received data from API', data)
      // answer.push(data)
      BS.next(data);
      BS.complete();
    });

    return BS;
  }

  // getStudentDistribution(type: string): void {
  //   const query = `MATCH (n:Staff) where n.isDeleted = false and n.status = 1
  //   and not (n.gender is null)  RETURN distinct(n.sType),n.gender, count(n) order by n.sType`;
  //   const answer = [];
  //   this.angularS.angularS.run(query).then((res: any) => {
  //     for (const r of res) {
  //       answer.push(r)

  //     }
  //     console.log('this is res from getStaffDistr: ', answer);
  //     this.staffDistribution.next(answer);
  //   });

  //   const BS: AsyncSubject<any[]> = new AsyncSubject <any[]>();
  //   let queryParams = new HttpParams();
  //   queryParams = queryParams.append("regNo", studentJAMBRegNo );
  //   queryParams = queryParams.append("type", type );
  //   let answer = []
  //   this.http.get<{studentRecord: Student, status: number}>(`${this.apiUrl}/api/check-valid-regno`,{params:queryParams})
  //   .subscribe((data) => {
  //     answer = []
  //     console.log('Received data from API', data)
  //     answer.push(data)
  //     BS.next(answer);
  //     BS.complete();
  //   });

  //   return BS;

  // }

}
