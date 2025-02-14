import { Directive, ElementRef, inject } from '@angular/core';

@Directive({
  selector: '[appLog]',
  host : {
    '(click)' : 'onClick()', 
  }
})
export class LogDirective {

  constructor() { 

  }

  private elementRef = inject(ElementRef);
  onLog(){
    console.log('on log click');
    console.log(this.elementRef.nativeElement);
    
    
  }


}
