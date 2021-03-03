import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private subject$ = new Subject<string>();
  private subject2$ = new Subject<string>();
  private subject3$ = new Subject<string>();
  private subject4$ = new Subject<string>();
  private subject5$ = new Subject<string>();
  private subject6$ = new Subject<string>();

  constructor() { }

  /**
   * Método para publicación del Observable
   * @param criterio
   */
  sendCriterio(criterio: string) {
    this.subject$.next(criterio);
  }

  /**
   * Método para subscribirnos al Observable
   */
  onListenCriterio(): Observable<string> {
    return this.subject$.asObservable();
  }

  /**
   * Método para publicación del Observable
   * @param criterio
   */
  sendCriterio2(criterio: string) {
    this.subject2$.next(criterio);
  }

  /**
   * Método para subscribirnos al Observable
   */
  onListenCriterio2(): Observable<string> {
    return this.subject2$.asObservable();
  }

    /**
   * Método para publicación del Observable
   * @param criterio
   */
  sendCriterio3(criterio: string) {
    this.subject3$.next(criterio);
  }

  /**
   * Método para subscribirnos al Observable
   */
  onListenCriterio3(): Observable<string> {
    return this.subject3$.asObservable();
  }

      /**
   * Método para publicación del Observable
   * @param criterio
   */
  sendCriterio4(criterio: string) {
    this.subject4$.next(criterio);
  }

  /**
   * Método para subscribirnos al Observable
   */
  onListenCriterio4(): Observable<string> {
    return this.subject4$.asObservable();
  }

       /**
   * Método para publicación del Observable
   * @param criterio
   */
  sendCriterio5(criterio: string) {
    this.subject5$.next(criterio);
  }

  /**
   * Método para subscribirnos al Observable
   */
  onListenCriterio5(): Observable<string> {
    return this.subject5$.asObservable();
  }
  /**
   * Método para publicación del Observable
   * @param criterio
   */
  sendCriterio6(criterio: string) {
    this.subject6$.next(criterio);
  }

  /**
   * Método para subscribirnos al Observable
   */
  onListenCriterio6(): Observable<string> {
    return this.subject6$.asObservable();
  }

}
