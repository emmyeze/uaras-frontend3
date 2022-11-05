import { Injectable } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { KeyedCollection } from '../shared/interfaces/ikeyed-collection';

import * as XLSX from "xlsx";
import autoTable from 'jspdf-autotable';



import jsPDF from 'jspdf'
import { TISS_LOGO_IMAGE } from '../shared/utilities/sharedFile';
// import { start } from 'repl';
// import { KeyedCollection } from '../interfaces/ikeyed-collection';
// import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UtilityService {
  isMessageFromMiniSales: BehaviorSubject<string> = new BehaviorSubject('');
  isMessageFromMiniSalesRestaurant: BehaviorSubject<string> = new BehaviorSubject('');
  isMessageStatus: BehaviorSubject<number> = new BehaviorSubject(0);
  logoImage = TISS_LOGO_IMAGE;

  constructor(
    private snackBar: MatSnackBar

  ) { }

  openSnackBar(message, action): void {
    this.snackBar.open(message, action , {duration: 5000, });
  }


  // remove a String and replace
  prepareQuery(query:string, searchValue: string): string {
    const pieces = query.split(`"${searchValue}"`);
    return pieces.join(searchValue);
  }

  replaceText(query: string, searchValue: string, replaceValue: string): string {
    const pieces = query.split(`${searchValue}`);
    return pieces.join(replaceValue);
  }

  prepareNewID4(): string {
    const today = String(new Date());
    console.log('date string: ', today);
    return today;
  }

  // this ID generator return a random id with a date prefix ie 2021130XXXXXXXX
  prepareNewID3(expectedDigits: number): string {
    const today = new Date();
    const todaysYear = (Number(today.getFullYear()) % 100);
    const todaysMonth = (Number(today.getMonth()) + 1);
    const todaysDay = (Number(today.getDate()));

    const randomNo = String(Math.floor(Math.random() * Math.floor(expectedDigits - 6)));
    let tempRef = String(todaysYear)
    +
    ((String(todaysMonth)).length < 2 ?
    ('0' + (String(todaysMonth))) : String(todaysMonth))
    +
    ((String(todaysDay)).length < 2 ?
    ('0' + (String(todaysDay))) : String(todaysDay));

    const tempRef2 = tempRef;
    for (let i = 0; i < (expectedDigits - (tempRef2.length + randomNo.length)); i++)
          {
          tempRef = tempRef +  '0';
          }
    return(tempRef + randomNo);


  }
  prepareNewID(originalString: string, expectedDigits: number): string {
    let answer = '';
    const tempUserID = Number(originalString) + 1;
    console.log ('THIS IS TEMPUSERID: ', tempUserID);
    answer += tempUserID;
    while (answer.length < expectedDigits) {
      answer = '0' + answer;

    }
    return answer;
  }

  prepareNewID2(
    originalStringwith2digitYear: string,
    expectedDigits: number): string {

    const answer =  Number(originalStringwith2digitYear);
    console.log('@prepareNewID2', originalStringwith2digitYear );
    let answer3 = (Number(answer)) % (1 * Math.pow(10, expectedDigits - 2)); // reference number

    console.log('@prepareNewID2-answer3', answer3 );

    const answer2 = Math.floor(Number(answer) / (1 * Math.pow(10, expectedDigits - 2))); // reference year
    console.log('@prepareNewID2-answer2', answer2 );

    const today = new Date();
    const todaysYear = (Number(today.getFullYear()) % 100);

    if (answer2 !== todaysYear) { // not the same year reference
        answer3 = 0;
      }
    const NewNo = String(answer3 + 1); // do the increment in ref
    let tempRef = String(todaysYear);
    const tempRef2 = tempRef;
    for (let i = 0; i < (expectedDigits - (tempRef2.length + NewNo.length)); i++)
          {
          tempRef = tempRef +  '0';
          }
    console.log('@prepareNewID2-result', (tempRef + NewNo) );

    return(tempRef + NewNo);
  }

  prepareNewIDHR(
    originalStringwithTypeCode: string,
    expectedDigits: number): string {
      let prefixCode = '';
      let answer3 = 0;
      const splitID = originalStringwithTypeCode.split('');
      if (splitID[1] === 'E') {
        prefixCode = 'TEMP';
        answer3 = Number(originalStringwithTypeCode.split(prefixCode)[1])? Number(originalStringwithTypeCode.split(prefixCode)[1]) : 0; // reference number
      }
      else {
        if (splitID[0] === 'D') {
          prefixCode = 'DTS';
          answer3 = Number(originalStringwithTypeCode.split(prefixCode)[1])? Number(originalStringwithTypeCode.split(prefixCode)[1]) : 0; // reference number
        }
        else {
          prefixCode = 'TS'
          answer3 = Number(originalStringwithTypeCode.split(prefixCode)[1])? Number(originalStringwithTypeCode.split(prefixCode)[1]) : 0; // reference number
        }
      }



    console.log('@prepareNewID2-answer3- LAST NO', answer3 );

    const NewNo = String(answer3 + 1); // do the increment in ref
    let tempRef = prefixCode;
    const tempRef2 = tempRef;
    for (let i = 0; i < (expectedDigits - (tempRef2.length + NewNo.length)); i++)
          {
          tempRef = tempRef +  '0';
          }
    console.log('@prepareNewID2-result', (tempRef + NewNo) );

    return(tempRef + NewNo);
  }


  sliceTable(
    myIndex: number, paginator: MatPaginator, data: any[]): any[] {
      // console.log('INDEX: ', myIndex);
      // console.log('PAGE INDEX: ', paginator.pageIndex);
      // console.log('PAGE SIZE: ', paginator.pageSize);


      // console.log('INDEX: ', myIndex);

      const startIndex = paginator.pageIndex * paginator.pageSize;
      const myPosition = startIndex + myIndex;
      data.splice(myPosition,  1);
      // console.log('@SPLICE TABLE: ', startIndex, myPosition);

      return data; }

  getMyPositionOnTable(myIndex: number, paginator: MatPaginator): number {
    const startIndex = paginator.pageIndex * paginator.pageSize;
    const myPosition = startIndex + myIndex;
    return myPosition;
  }

  setSalesMarker(aPaymentType: string): void {
    this.isMessageFromMiniSales.next(aPaymentType);

  }

  setSalesMarkerRestaurant(aPaymentType: string): void {
    this.isMessageFromMiniSalesRestaurant.next(aPaymentType);

  }

  setMessageStatus(aStatus: number): void {
    this.isMessageStatus.next(aStatus);
  }

  translateAptInfo(apType: string) {


    let roomT = new KeyedCollection<string>();
    roomT.Add('1RS', 'Single Room');
    roomT.Add('1RSELF', 'Self Contained');
    roomT.Add('2B', '2 Bedroom');
    roomT.Add('3B', '3 Bedroom');

    return roomT.Item(apType);

  }


    // working pdf printer
exportToPdf(anArray: any[], afileName: string, aList: string[], startDate?: Date, endDate?: Date) {
  let prepare: any[] = [];
  const aList2 = aList.filter(item => item != 'actions');
  anArray.forEach(
    e => {
    var tempObj = [];

    for (let i=0; i < aList2.length ; i++){
      const tempAnswer = (aList2[i])
      eval(`tempObj.push(e.${tempAnswer});`);
      (i+1) < aList2.length ? tempObj.push('') : '';
    }

    prepare.push(tempObj);
  });
  const doc = new jsPDF({
    orientation: "landscape"

  });

  const d = new Date();
  let date1 = '';
  let date2 = '';


  const ye = new Intl.DateTimeFormat('en-GB', { year: 'numeric' }).format(d);
  const mo = new Intl.DateTimeFormat('en-GB', { month: '2-digit' }).format(d);
  const da = new Intl.DateTimeFormat('en-GB', { day: '2-digit' }).format(d);
  const bb = d.toLocaleTimeString('en-GB');
  const myDate = (`Date Generated: ${da}/${mo}/${ye} ${bb} `);

  if (startDate) {
    const d1 = new Date(startDate);
    const ye1 = new Intl.DateTimeFormat('en-GB', { year: 'numeric' }).format(d1);
    const mo1 = new Intl.DateTimeFormat('en-GB', { month: '2-digit' }).format(d1);
    const da1 = new Intl.DateTimeFormat('en-GB', { day: '2-digit' }).format(d1);
    date1 = (`${da1}/${mo1}/${ye1}`);

  }


  if (endDate) {
    const d2 = new Date(endDate);
    const ye2 = new Intl.DateTimeFormat('en-GB', { year: 'numeric' }).format(d2);
    const mo2 = new Intl.DateTimeFormat('en-GB', { month: '2-digit' }).format(d2);
    const da2 = new Intl.DateTimeFormat('en-GB', { day: '2-digit' }).format(d2);
    date2 = (`${da2}/${mo2}/${ye2}`);

  }

  doc.text("TOPFAITH SCHOOLS", 50, 15);
  doc.text("AKWAIBOM STATE", 50, 25);
  doc.rect(200, 5, 90, 27);
  doc.text("Report Parameters", 202, 10);
  doc.setFontSize(10);
  doc.text(['Source: HR, Topfaith Schools', myDate], 202, 14);
  doc.addImage(this.logoImage, 'PNG', 10, 5, 30,30);
  // doc.addImage(imageData, format, x, y, width, height, alias, compression, rotation)
  doc.setFontSize(12);

  doc.text("RESIGNATION REPORT " + `${date1 && date2 ? `FROM ${date1} TO ${date2}` : ''}`, 50, 44);
  doc.setFontSize(8);

  const headColumn = [];
  aList2.forEach(e=> {
    headColumn.push(e.toUpperCase())

    headColumn.push('')
  })
  headColumn.pop()

  autoTable(doc,
    { head: [headColumn],
  body: prepare, startY: 48,
  bodyStyles: {cellPadding:0.5},
  columnStyles: {4: {halign: 'center'}, 6: {halign: 'center'}, 8: {halign: 'center'}, 10: {halign: 'center'}, 12: {halign: 'center'},

  14: { cellWidth: 'auto'}, 16: {halign: 'center', cellWidth:'auto'}, 18: {halign: 'center', cellWidth:'auto'},
  },

  headStyles: { halign: 'center', cellPadding:1}



})
  const filename = afileName + '.pdf';
  doc.save(filename);
}


}

export class TableUtil {
  static exportToExcel(tableId: string, name?: string) {
    let timeSpan = new Date().toISOString();
    let prefix = name || "ExportResult";
    let fileName = `${prefix}-${timeSpan}`;
    let targetTableElm = document.getElementById(tableId);
    let wb = XLSX.utils.table_to_book(targetTableElm, <XLSX.Table2SheetOpts>{ sheet: prefix });
    XLSX.writeFile(wb, `${fileName}.xlsx`);
}


}

export class RawUtil {
  static exportToExcel(dataID: any[], name?: string, header2?: string []) {
  let timeSpan = new Date().toISOString();
  let fileName = name || `ExportResult - ${timeSpan}`;
  // let fileName = `${prefix}-${timeSpan}`;
  const header = header2.filter(item => item != 'actions');

  //
  const prepare = [];
  const aDataNew = [];
  dataID.forEach(
    e => {
    var tempObj = [];
    for (let i=0; i < header.length ; i++){
      const tempAnswer = (header[i])
      eval(`tempObj.push(e.${tempAnswer ? tempAnswer : '' });`);

    }
    // console.log('tempOBJ::', tempObj);

    prepare.push(tempObj);
    //console.log("prepare::",prepare)
  });
  prepare.forEach(e => {
    // console.log('this is e::::', e, e.length)
    let evalString = "aDataNew.push({";
    for (let i = 0; i < e.length; i++) {
      evalString = evalString + header[i] + " : '" + (e[i] ? e[i] : "") ;
      if (i+1 === e.length) {
        evalString = evalString + "'  });"
      }
      else {evalString = evalString + "' , "}
    }
    eval(`${evalString}`);
  })

  //
  let workbook = XLSX.utils.book_new();
  let ws = XLSX.utils.json_to_sheet(aDataNew);

  XLSX.utils.book_append_sheet(workbook, ws)

  XLSX.writeFile(workbook, `${fileName}.xlsx`);
}
}

