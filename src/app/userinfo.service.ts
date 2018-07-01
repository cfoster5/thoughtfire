import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserinfoService {

  userInfo: Array<{ firstName: string, lastName: string, email: string }>;

  constructor() { }
}
