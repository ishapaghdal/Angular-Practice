import { Directive } from '@angular/core';
import { log } from 'console';
import { input } from '@angular/core';
import e from 'express';

@Directive({
  selector: '[appSafeLink]',
  standalone: true,
  host: {
    '(click)': 'onConfirmPage($event)',
  },
})
export class SafeLinkDirective {

    queryparams  = input('myapp') 
  constructor() {
    console.log('SafeLink');
  }

  onConfirmPage(event : MouseEvent){
    const leave = window.confirm("Are you sure that you wants to leave the ") ;

    if(leave){
        const address = (event.target as HTMLAnchorElement).href;
        (event.target as HTMLAnchorElement).href = address + '?from=' + this.queryparams();
        return;
    }

    event.preventDefault();

  }
}
