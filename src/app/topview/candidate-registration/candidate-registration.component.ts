import { Component, OnInit } from '@angular/core';
import { ApplicationService } from 'src/app/services/application.service';
import { Student } from 'src/app/shared/interfaces/students';
import {environment} from 'src/environments/environment'
import {NigeriaStates} from 'src/app/shared/interfaces/students';
import {utmeSubjectCode} from 'src/app/shared/interfaces/students';
import {utmeProgrammes} from 'src/app/shared/interfaces/students';

@Component({
  selector: 'app-candidate-registration',
  templateUrl: './candidate-registration.component.html',
  styleUrls: ['./candidate-registration.component.scss']
})
export class CandidateRegistrationComponent implements OnInit {
  selectedStudent: Partial <Student> = {};
  departmentList: string[] = [];
  Genders = [ 'M', 'F' ];
  candidateTypeList = ['UTME', 'DE']
  candidateType = 'UTME';
  searchDone = false;
  challengePassed = false;
  checkVariables = ['utme_aggregate', 'state', 'department'];
  checkAnswers = ['', '', ''];
  // StatesList = ['IMO', 'ANAMBRA', 'ENUGU', "EBONYI", "ABIA"];
  StatesList = NigeriaStates
  courseList = utmeSubjectCode
  programmeList = utmeProgrammes.sort()
  statusMessage: string[] = []
  showPassword: boolean = false;
  envTest = environment.sideNavOpen;
  constructor(
    private applicationService: ApplicationService,
  ) { }

  ngOnInit(): void {

    this.departmentList = this.applicationService.getProgrammes();

  }

  clearFilter(): void {
    this.selectedStudent = {};
    this.statusMessage = [];
    this.challengePassed = false;
  }

  public togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }

  checkCutoffMet(cutoffvalue: number): boolean {
    let answer = false;
    if (this.selectedStudent.utme_aggregate && this.selectedStudent.utme_aggregate >= cutoffvalue) {answer = true;}
    return answer;
  }

  takeChallenge(): boolean {
    let answer = true;
    return answer;
  }

  getStudentInformation(): void {
    const AselectedStudent = (this.applicationService.getStudentRecord(this.selectedStudent.reg_num as string, this.candidateType))
    AselectedStudent.subscribe(data => {
      this.statusMessage = [];
      // console.log({data})
      if (data && data[0].status === 200) {
        this.searchDone = true;
      //   console.log({data})
      // console.log('[0]', data[0])
      // console.log('std record',data[0].studentRecord[0])


        this.statusMessage.push("Examination data found!")
        // save temp student Information
        const tempStudentInfo = data[0].studentRecord[0]
        // set challenge
        this.challengePassed = false;
        this.challengePassed = this.takeChallenge()

        if (this.challengePassed) {this.selectedStudent = tempStudentInfo}
        else {}


      // check if student is registered
      // yes - Load registration status info

      // else -check if result meets department cutoff
      const isRegistered = data[0].studentRecord[0].email !== null && data[0].studentRecord[0].email !== undefined &&
      data[0].studentRecord[0].email !== '' ? true : false;
      console.log({isRegistered})
      if (isRegistered) {}
      else {
        const comboInfo = this.applicationService.suggestDepartment([this.selectedStudent.subject_1 as string,
          this.selectedStudent.subject_2 as string, this.selectedStudent.subject_3 as string, this.selectedStudent.department as string,
          (this.selectedStudent.utme_aggregate as number).toString()])

        const cutOffInfo = (this.applicationService.getCutoffInfo(this.selectedStudent.department as string))
        cutOffInfo.subscribe(cutoffdata => {
          console.log("cutoffData:::", cutoffdata)
          console.log("status:::", cutoffdata[0].status)
          console.log("length:::", cutoffdata[0].data.length)
          if (cutoffdata && cutoffdata[0].status === 200 && cutoffdata[0].data.length > 0) {
            console.log("INSIDE");
            if (this.checkCutoffMet(cutoffdata[0].data[0].utme_cutoff)){
              this.statusMessage.push("You have met department cutoff");
              this.statusMessage.push("\n")
              this.statusMessage.push("Instructions:")
              this.statusMessage.push("Please proceed with your registration")
              // this.statusMessage.push("Instructions:")




            }
            else {
              this.statusMessage.push("Sorry, you have not met the department cutoff");
              comboInfo.subscribe((suggestData) => {
                if (suggestData.combostatus === 202) {
                  if (suggestData.suggest.length > 0) {
                    this.statusMessage.push("Here are a few suggested courses you could do with UNIZIK");
                    suggestData.suggest.forEach((e : string) => {
                    this.statusMessage.push( `\n ${e} `)

                  })
                  this.statusMessage.push("\n")
                  this.statusMessage.push("Instructions:")
                  this.statusMessage.push(`Please go to the nearest JAMB CBT centre`);
                  this.statusMessage.push(`Change your first choice course to
                  any of the suggested and check back.`);

                  }
                  else {this.statusMessage.push("There are no suggested courses for you at this time.")}

                }
              })

            }
          }
        })
      }


      }
      else {

        if (data[0].status === 202) {
          this.statusMessage.push(`Examination data not found!`);
          this.statusMessage.push("\n")
          this.statusMessage.push("Instructions:")
          this.statusMessage.push(`Please go to the nearest JAMB CBT centre`);
          this.statusMessage.push(`Change your first choice institution to
          Nnamdi Azikiwe University, Awka.`);
          const temp = this.selectedStudent.reg_num
          this.selectedStudent = {};
          this.selectedStudent.reg_num = temp;

      }
      }

    });

    // console.log("STUDENT RECORD::",this.applicationService.getStudentRecord(this.selectedStudent.reg_num));

  }

  registerStudent(): void {
    console.log('AT REGISTER STUDENT:: student = ', this.selectedStudent as Student)
    this.applicationService.registerStudent(this.selectedStudent as Student)
  }

  suggestDepartment(): void {
    this.applicationService.suggestDepartment([this.selectedStudent.subject_1 as string,
      this.selectedStudent.subject_2 as string, this.selectedStudent.subject_3 as string, this.selectedStudent.department as string,
      (this.selectedStudent.utme_aggregate as number).toString()]).subscribe((suggestData) => {
        if (suggestData.combostatus === 202) {
          if (suggestData.suggest.length > 0) {
            this.statusMessage.push("Here are a few suggested courses you can do with UNIZIK");
            suggestData.suggest.forEach((e: string) => {
            this.statusMessage.push( `\n ${e} `)
          })
          }
          else {this.statusMessage.push("There are no suggested courses for you at this time.")}

        }
      })
  }

  calculateUTMEAgg(): number {
    this.selectedStudent.utme_aggregate =
    (this.selectedStudent.subject_1_score ? this.selectedStudent.subject_1_score : 0) +
    (this.selectedStudent.subject_2_score ? this.selectedStudent.subject_2_score : 0) +
    (this.selectedStudent.subject_3_score ? this.selectedStudent.subject_3_score : 0) +
    (this.selectedStudent.english_score ? this.selectedStudent.english_score : 0)
    // console.log('AGGREGR', this.selectedStudent.utme_aggregate)
    return this.selectedStudent.utme_aggregate
  }
  checkLoadedApplication(): boolean {
    // console.log('selected student::', this.selectedStudent)
    if ( !this.selectedStudent.reg_num ||  this.selectedStudent.reg_num === ''  ) {
      // console.log('selected student  EMPTY::', this.selectedStudent)
      return false;
    }
    else {
      // console.log('selected student not empty ::', this.selectedStudent)

      return true;}

  }

}
