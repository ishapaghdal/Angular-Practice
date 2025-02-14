import { Directive, effect, input } from '@angular/core';

@Directive({
  selector: '[appAuth]'
})
export class AuthDirective {

  changeLogin = input.required();

  constructor() {
    effect(()=>{
      if(!this.changeLogin()) {
        console.log('Show element');

        
      }
      else{
        console.log('Do not show');
        
      }
    });
   }

}
