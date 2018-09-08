import { Component, OnInit } from '@angular/core';
import { Calculation } from './Calculation';
import { HistoryService } from './history.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{




   text:string="";
   op:string;

   calculation:Calculation;

   historyCalcs:Calculation[]=new Array();


   /// some attributes for validations
   invalidInput=false;
   justOpSet=false;
   justDotSet=false;


   constructor(private historyService:HistoryService){
    
   }

   ngOnInit(): void {
    this.historyCalcs=this.historyService.getAllCalculations();
   }
 

   setTextValue(num){
      this.text+=num;
      this.justOpSet=false;
      this.invalidInput=false;

   }

  setOpValue(op:string){
    if(this.justOpSet){
      this.text=this.text.substring(0,this.text.length-1)+op;
      return;
    }
    this.text+=op;
    this.op=op;
    this.justOpSet=true;
    this.invalidInput=false;

  }

  setDotValue(){
    if(this.justDotSet){
      return;
    }
    this.text+=".";
    this.justDotSet=true;
    this.invalidInput=false;

  }

   calcualte(){
     // if the text contain one number only
     // don't do any thing
     if((this.text=="") || (this.justOpSet||this.justOpSet) ){
       this.invalidInput=true;
       return;
     }
      // calculate result
      let result;
     try{
        result=eval(this.text);
     }catch(err){
        this.invalidInput=true;
        return;
     }
      // save it to local storage
      this.calculation=new Calculation(this.text+" = "+result,this.op);
      this.historyService.saveCalculationToStorage(this.calculation);

      this.historyCalcs=this.historyService.getAllCalculations();
      //set the value of textfield to result value
      this.text= result;

      this.invalidInput=false;
   }

   clear(){
     this.text="";
     this.justDotSet=false;
     this.justOpSet=false;
     this.invalidInput=false;

   }

   removeLastChar(){
     this.text=this.text.substr(0,this.text.length-1);
     this.invalidInput=false;

     if(this.justDotSet){
       this.justDotSet=false;
     }else if(this.justOpSet){
       this.justOpSet=false;
     }
   }


   getAllOperations(){
     this.historyCalcs=this.historyService.getAllCalculations();
   }

   filterByOperation(op:string){
     this.historyCalcs=this.historyService.getCalculationsByOperation(op);
   }


   // filter user input to just accept 
   onkeyDown($event){
     if (event.which < 42 || event.which > 57 || event.which==44)
     {
         event.preventDefault();
     }

   }

}
