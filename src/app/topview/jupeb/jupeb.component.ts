import { HttpClient, HttpEventType, HttpHeaders } from '@angular/common/http';
import { Component, ElementRef, ViewChild, OnInit } from '@angular/core';

import { FormBuilder } from '@angular/forms';
import { ThemePalette } from '@angular/material/core';
import { ProgressSpinnerMode } from '@angular/material/progress-spinner';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-jupeb',
  templateUrl: './jupeb.component.html',
  styleUrls: ['./jupeb.component.css']
})
export class JupebComponent implements OnInit {

  color: ThemePalette = 'primary';
  mode: ProgressSpinnerMode = 'determinate';
  spinnerValue = 0;
  title = 'api-nodejs2';
  // @ts-ignore
  @ViewChild('UploadFileInput', { static: false }) uploadFileInput: ElementRef;
  // @ts-ignore
  fileUploadForm: FormGroup;
  // @ts-ignore
  fileInputLabel: string;
  loaderForFileUpload = false;
  fileName = '';
  arrayBuffer:any;
  arr: any;
  bstr: any;
  uploadProgress = 0;
  // @ts-ignore

  uploadSub: Subscription;

  constructor(
    private http: HttpClient,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    this.fileUploadForm = this.formBuilder.group({
      myfile: ['']
    });

    // this.uploadForm = this.formBuilder.group({
    //   profile: ['']
    // });
  }
// @ts-ignore
  onFileSelect1(event) {
    let af = ['application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', 'application/vnd.ms-excel']
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      // console.log(file);
// @ts-ignore
      if (!_.includes(af, file.type)) {
        alert('Only EXCEL Docs Allowed!');
      } else {
        this.fileInputLabel = file.name;
        // @ts-ignore
        this.fileUploadForm.get('myfile').setValue(file);
      }
    }
  }

  onFileSelect2(event:any) {
    let af = ['application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', 'application/vnd.ms-excel']
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      // console.log(file);
// @ts-ignore
      if (!_.includes(af, file.type)) {
        alert('Only EXCEL Docs Allowed!');
      } else {
        this.fileInputLabel = file.name;
        // @ts-ignore
        this.fileUploadForm.get('myfile').setValue(file);
      }
    }
  }
  onFileSelect(event: any) {
    if (event.target.files.length > 0) {
      let fileReader = new FileReader();

      const file = event.target.files[0];
      fileReader.readAsArrayBuffer(file);
      // @ts-ignore

      this.fileUploadForm.get('myfile').setValue(file);

      // Upload() {
          fileReader.onload = (e) => {
            console.log('FILE READER ONLOAD RUN')
              this.arrayBuffer = fileReader.result;
              var data = new Uint8Array(this.arrayBuffer);
              this.arr = new Array();
              for(var i = 0; i != data.length; ++i) {
                this.arr[i] = String.fromCharCode(data[i]);

              }
              this.bstr = this.arr.join("");
            }
    }


    // if (file) {

    //     this.fileName = file.name;

    //     const formData = new FormData();
    //     // @ts-ignore
    //     formData.append("file", this.fileUploadForm.get('myfile').value);
    //     const testData = ['HELPSO'];


    //     this.http.post<any>("http://localhost:3000/api/uploadutme", formData).subscribe(
    //       (res) => {
    //         console.log("SUCCESS")
    //         console.log(res);
    //       },
    //       (err) => {
    //         console.log("ERROR")
    //         console.log(err);
    //       }
    //     );;

    // }
}

reset() {
  this.uploadProgress = 0;
  // @ts-ignore

  this.uploadSub = null;
}

  // @ts-ignore
  onFormSubmit() {
    // @ts-ignore
    // if (!this.fileUploadForm.get('myfile').value) {
    //   alert('Please fill valid details!');
    //   return false;
    // }
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',

    });
    const formData = new FormData();
    // @ts-ignore
    formData.append('file', this.fileUploadForm.get('myfile').value);
    // @ts-ignore

    console.log('FILE UPLOAD VALUE::',this.fileUploadForm.get('myfile').value)
    // console.log('THIS IS FORMDATA-bstr::',formData, this.bstr)
     // @ts-ignore
    // console.warn('formData::', formData['file'])
    // console.warn('formData2::', formData.get('file'))

    const upload$ = this.http.post("http://localhost:3000/api/uploadjupebcandidate", formData, {

    // const upload$ = this.http.post("http://localhost:3000/api/uploadutme", formData, {
      reportProgress: true,
      observe: 'events'
      })
      .pipe(
          finalize(() => {
            console.warn('formData3::', formData.get('file'))

            this.reset()
          })
      );

    this.uploadSub = upload$.subscribe(event => {

        if (event.type == HttpEventType.UploadProgress) {
          // @ts-ignore

          this.spinnerValue = Math.round(100 * (event.loaded / event.total));
        }
      })

  }

  public onFormSubmit1() {
    const inputEl: HTMLInputElement = this.uploadFileInput.nativeElement;
    // @ts-ignore
    const fileCount: number = inputEl.files.length;
    const formData = new FormData();
    const headers = new Headers();
    headers.set('Accept', 'application/json');
    headers.delete('Content-Type'); // mandate for accepting binary content
    if (fileCount > 0) {
        for (let i = 0; i < fileCount; i++) {
          // @ts-ignore
            formData.append('file', inputEl.files.item(i));
        }

        try {
            this.loaderForFileUpload = true;
            console.log('FORMDATA', formData);
            this.http
                .post('http://localhost:3000/api/uploaddecandidate', formData)
                 // @ts-ignore
                .subscribe(Response => {
                   // @ts-ignore
                    if (Response.status) {
                        console.log('File uploaded successfully', 'Success!', Response);
                    }
                     // @ts-ignore
                }, error => {
                  console.log('File contents mismatch', error.statusText);
                });
        } catch (e) {
            console.log('Error occured while posting uploaded file. See below message for details : \n');
            console.log(e);
        }
    }
}



}
