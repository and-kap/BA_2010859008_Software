import {Injectable} from "@angular/core";
import {HttpClient, HttpParams} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {firstValueFrom} from "rxjs";
import {Pagination} from "../model/pagination.model";

@Injectable({
  providedIn: "root"
})
export class BaseApi<T> {
  public static readonly BASE_URL = environment.BASE_URL;

  constructor(private http: HttpClient) {
  }

  private getHttpParams(parameters?: { [key: string]: string }): HttpParams {
    let params = new HttpParams();

    for (let key in parameters) {
      params = params.set(key, parameters[key]);
    }

    return params;
  }

  public getAll(path: string, parameters?: { [key: string]: string }): Promise<Pagination<T> | T[]> {
    const params = this.getHttpParams(parameters);
    return firstValueFrom(this.http.get<Pagination<T> | T[]>(BaseApi.BASE_URL.concat(path), {params}));
  }

  public get(path: string, parameters?: { [key: string]: string }): Promise<T> {
    const params = this.getHttpParams(parameters);
    return firstValueFrom(this.http.get<T>(BaseApi.BASE_URL.concat(path), {params}));
  }

  public post(path: string, body: object, parameters?: { [key: string]: string }): Promise<T> {
    const params = this.getHttpParams(parameters);
    return firstValueFrom(this.http.post<T>(BaseApi.BASE_URL.concat(path), body, {params}));
  }

  public put(path: string, body: object, parameters?: { [key: string]: string }): Promise<any> {
    const params = this.getHttpParams(parameters);
    return firstValueFrom(this.http.put<T>(BaseApi.BASE_URL.concat(path), body, {params}));
  }

  public patch(path: string, body: object, parameters?: { [key: string]: string }): Promise<T> {
    const params = this.getHttpParams(parameters);
    return firstValueFrom(this.http.patch<T>(BaseApi.BASE_URL.concat(path), body, {params}));
  }

  public delete(path: string, parameters?: { [key: string]: string }): Promise<T> {
    const params = this.getHttpParams(parameters);
    return firstValueFrom(this.http.delete<T>(BaseApi.BASE_URL.concat(path), {params}));
  }

  log(data: any): Promise<any> {
    data.app = 'Angular';
    data.browser = navigator.userAgent.indexOf("Chrome") != -1 ? 'Chrome' : 'Firefox';
    return firstValueFrom(this.http.post<any>('http://localhost:8081', JSON.stringify(data)));
  }
}
