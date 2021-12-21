import { Component } from '@angular/core';

declare function calls(array: any[]):any;
declare function calls2(array: any[]):any;
declare function calculateFirstFollow(array: any[]):any;
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  ans:any;
  lfs: any=true;
  fir:any=true;
  fol:any=true;
  status:any=true;
  lrs:any=true;
  nxt:any='\n';
  tans:any=[];
  unas:any=true;
  ffs: any=true;
  title = 'cdconcepts';
  s:any=false;
  nont:any='';
  temp:any="";
  arr2:any=[];
  t:any = 0;
  arr:any=[];
  change1(){
    this.lfs=true;
    this.lrs=true;
    this.fir=true;
    this.fol=true;
    this.unas=true;
    this.ffs=true;
    this.lrs=false;
    this.ans=calls(this.arr)
  }
  change2(){
    this.lfs=true;
    this.lrs=true;
    this.unas=true;
    this.fir=true;
    this.fol=true;
    this.ffs=true;
    this.lfs=false;
    this.ans=calls2(this.arr)
  }
  change3(){
    this.lfs=true;
    this.lrs=true;
    this.unas=true;
    this.ffs=true;
    this.fir=true;
    this.fol=true;
    this.fir=false;
    this.ffs=false;
    this.ans=calculateFirstFollow(this.arr)
    this.ans=this.ans[0]
    this.tans=[];
    for (let [key, value] of Object.entries(this.ans)) {
      this.tans.push(key+"="+value);
    }
    this.ans=this.temp;
    console.log(this.ans)
  }
  change4(){
    this.lfs=true;
    this.lrs=true;
    this.unas=true;
    this.fir=true;
    this.fol=true;
    this.ffs=true;
    this.ffs=false;
    this.fol=false;
    this.ans=calculateFirstFollow(this.arr)
    this.ans=this.ans[1]
    console.log(this.ans)
    this.tans=[]
    for (let [key, value] of Object.entries(this.ans)) {
      this.tans.push(key+"="+value);
    }
    console.log(this.tans)
    this.ans=this.temp;
  }
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

