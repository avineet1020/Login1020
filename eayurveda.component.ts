import { getLocaleDateFormat } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ApiService } from '../shared/api.service';
import { EayurvedaData } from './eyurveda.model';

@Component({
  selector: 'app-eayurveda',
  templateUrl: './eayurveda.component.html',
  styleUrls: ['./eayurveda.component.css']
})
export class EayurvedaComponent implements OnInit {

  formValue!: FormGroup
  EayurvedaModelObj : EayurvedaData = new EayurvedaData
  allEayurvedaData: any
  showAddBtn!:boolean
  showUpdateBtn!:boolean;

  constructor(private formBuilder: FormBuilder , private api:ApiService) { }

  ngOnInit(): void {
    this.formValue = this.formBuilder.group({
      name: [''],
      email: [''],
      mobile: [''],
      address: ['']
    })
    this.getAllData()
  }
  // Now subscribing our data
  addEayurveda(){
    this.EayurvedaModelObj.name = this.formValue.value.name;
    this.EayurvedaModelObj.email = this.formValue.value.email;
    this.EayurvedaModelObj.mobile = this.formValue.value.mobile;
    this.EayurvedaModelObj.address = this.formValue.value.address;
    

    this.api.postEayurveda(this.EayurvedaModelObj).subscribe(res=>{
      console.log(res);
      alert("Eayurveda Record Added Successfully");
      //CLEAR THE FORM 
      let ref = document.getElementById('clear');
        ref?.click();
        this.formValue.reset()
     this.getAllData();
    },
    err=>{
      console.log(err);
      alert("Something Went Wrong");
    }
    )

     }

     clickAddBtn(){
       this.formValue.reset();
       this.showAddBtn=true;
       this.showUpdateBtn=false;
     }
    //GET ALL DATA

    getAllData(){
      this.api.getEayurveda().subscribe(res=>{
        this.allEayurvedaData=res;
      })
  } 
  //WORKING OF DELETE BUTTON 

  deleteDoctor(data:any){
    this.api.deleteEayurveda(data.id).subscribe(res=>{
      alert("Record Deleted")
      this.getAllData();
    })
  }

  onEditDoctor(data:any){
    this.showAddBtn=false;
    this.showUpdateBtn=true;
    this.EayurvedaModelObj.id=data.id
    this.formValue.controls['name'].setValue(data.name);
    this.formValue.controls['email'].setValue(data.email);
    this.formValue.controls['mobile'].setValue(data.mobile);
    this.formValue.controls['address'].setValue(data.address);
  }

  onupdateDoctor(){
    this.EayurvedaModelObj.name = this.formValue.value.name;
    this.EayurvedaModelObj.email = this.formValue.value.email;
    this.EayurvedaModelObj.mobile = this.formValue.value.mobile;
    this.EayurvedaModelObj.address = this.formValue.value.address;
    this.api.updateEayurveda(this.EayurvedaModelObj,this.EayurvedaModelObj.id).subscribe(res=>{
      alert("Record Updated")   
      let ref = document.getElementById('clear');
      ref?.click();
      this.formValue.reset()
      this.getAllData();
    })
  }
}
