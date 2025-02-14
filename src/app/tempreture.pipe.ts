import { Pipe, PipeTransform } from '@angular/core';
import { strict } from 'assert';
import { parse } from 'path';

@Pipe({
  name: 'temp',
  standalone : true,
  pure : false,
})
export class TempreturePipe implements PipeTransform {

  transform(value: any, ...args: any[]): any {

    let val = parseFloat(value);

    if(typeof(val) === 'string'){
      val = parseFloat(value);
    }
    else{
      val = value;
    }

    const outputTemp = val * (9/5) + 32; 
    return `${outputTemp} F`;
    
  }

}
