import { Injectable } from '@angular/core';
import { Subject, Observable, of } from 'rxjs';
import { getDateTimeInBelgradeFromString } from 'src/app/core/helper/dateFormatter';

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {
  private storageSub = new Subject<String>();

  constructor() {}

  watchStorage(): Observable<any> {
    return this.storageSub.asObservable();
  }

  roleChanged(role) {
    this.storageSub.next(role);
  }

  logout() {
    this.storageSub.next(null);
  }
}
