import { Injectable } from '@angular/core';
import { Calculation } from './Calculation';

@Injectable({
  providedIn: 'root'
})
export class HistoryService {

  constructor() { }


  public saveCalculationToStorage(calculation:Calculation){
    if(localStorage.getItem("nextId")==null){
      localStorage.setItem("nextId",1+"");
    }

    let nextId:number=parseInt(localStorage.getItem("nextId"));
    calculation.id=nextId;
    localStorage.setItem(nextId+"",JSON.stringify(calculation));
    localStorage.setItem("nextId",(nextId+1)+"");

  }

  public getAllCalculations():Array<Calculation>{
    if(localStorage.getItem("nextId")==null){
      return new Array<Calculation>();
    }

    let calculations:Calculation[]=new Array(); 

    //the returned id is one after last id in storage 
    let lastId:number=parseInt(localStorage.getItem("nextId"));
    for(let id=lastId-1;id>0;id--){
      let calc:Calculation=JSON.parse(localStorage.getItem(id+""));
      calculations.push(calc);
      // console.log(calc);
    }

    return calculations;
  }

  public getCalculationsByOperation(op:string):Array<Calculation>{
    if(localStorage.getItem("nextId")==null){
      return new Array<Calculation>();
    }

    let calculations:Calculation[]=new Array(); 

    //the returned id is one after last id in storage 
    let lastId:number=parseInt(localStorage.getItem("nextId"));
    for(let id=lastId-1;id>0;id--){
      let calc:Calculation=JSON.parse(localStorage.getItem(id+""));
      if(op==calc.operation)
      calculations.push(calc);
    }

    return calculations;
  }

}
