import { Component } from '@angular/core';

declare function calls(array: any[]):any;
declare function calculateFirstFollow(array: any[]):any;
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'cdconcepts';
  s:any=false;
  nont:any='';
  arr2:any=[];
  t:any = 0;
  arr:any=[];
  fun(){
    this.s=!this.s;
  }
  fun2(){
    for(var i=0;i<this.t;i++)
    this.arr.push([])
  }
  fun4(){
    calculateFirstFollow(this.arr)
    console.log(this.arr)
  }
}

