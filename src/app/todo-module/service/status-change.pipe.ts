import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'statusChange'
})
export class StatusChangePipe implements PipeTransform {

  transform(value: any): any {

    let status = '';
    if (value === "open"){
      status = "closed"
    }
    else {
      status = "open"
    }
    return status;
  }
}
