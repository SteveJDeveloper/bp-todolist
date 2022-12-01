import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ValidacionService {

  constructor() { }

  validarTarea(description: string): boolean{
    if(description.trim() == ""){
      return false;
    }
    return true;
  }
}
