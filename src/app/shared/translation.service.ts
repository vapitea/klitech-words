import {Injectable} from "@angular/core";
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";
import {map} from "rxjs/operators";

@Injectable({providedIn: 'root'})
export class TranslationService {


  constructor(private http: HttpClient) {
  }

  fetchSourceLanguages(): Observable<Language[]> {

    const url = 'https://microsoft-azure-microsoft-text-translation-3-0-v1.p.rapidapi.com/languages';
    const headers = new HttpHeaders().set('x-rapidapi-host', 'microsoft-azure-microsoft-text-translation-3-0-v1.p.rapidapi.com')
      .append('x-rapidapi-key', 'df10b95107mshbe3dd61be8b3267p147132jsnbe85e75b2f0e')
      .append('useQueryString', 'true')
      .append('accept', 'application/json');
    const params = new HttpParams().set('api-version', '3.0').append('scope', 'translation');

    return this.http.get(url, {headers: headers, params: params, observe: 'body'}).pipe(map(responseData => {
      const languages: Language[] = [];
      const translations = responseData['translation'];
      for (let key in translations) {
        if (translations.hasOwnProperty(key)) {
          languages.push(new Language(key, translations[key]['name'], translations[key]['nativeName']));
        }
      }
      return languages;

    }));

  }

  fetchThesaurus(input: string): Observable<string[]> {
    const url = 'https://wordsapiv1.p.rapidapi.com/words/';
    let headers = new HttpHeaders().set('x-rapidapi-host', 'wordsapiv1.p.rapidapi.com')
      .append('x-rapidapi-key', 'df10b95107mshbe3dd61be8b3267p147132jsnbe85e75b2f0e')
      .append('useQueryString', 'true');

    return this.http.get(url + input, {headers: headers}).pipe(map(responseData => {
      const definitions: string[] = [];
      for (let val in responseData['results']) {
        definitions.push(responseData['results'][val]['definition']);
      }
      return definitions;
    }));
  }

  translateText(source: string, target: string, text: string): Observable<string> {

    const url = 'https://microsoft-azure-microsoft-text-translation-3-0-v1.p.rapidapi.com/translate';
    const headers = new HttpHeaders().set('x-rapidapi-host', 'microsoft-azure-microsoft-text-translation-3-0-v1.p.rapidapi.com')
      .append('x-rapidapi-key', 'df10b95107mshbe3dd61be8b3267p147132jsnbe85e75b2f0e')
      .append('useQueryString', 'true')
      .append('accept', 'application/json')
      .append('content-type', 'application/json');

    const params = new HttpParams().set('api-version', '3.0').append('to', target).append('from', source);

    return this.http.post(url, [{Text: text}], {
      headers: headers,
      params: params,
      responseType: 'json'
    }).pipe(map(responseData => {
      return responseData[0]['translations'][0]['text'];
    }));

  }


  detectLanguage(inputText: string): Observable<string> {

    const url = 'https://microsoft-azure-microsoft-text-translation-3-0-v1.p.rapidapi.com/detect';
    const headers = new HttpHeaders().set('x-rapidapi-host', 'microsoft-azure-microsoft-text-translation-3-0-v1.p.rapidapi.com')
      .append('x-rapidapi-key', 'df10b95107mshbe3dd61be8b3267p147132jsnbe85e75b2f0e')
      .append('useQueryString', 'true')
      .append('accept', 'application/json')
      .append('content-type', 'application/json');

    const params = new HttpParams().set('api-version', '3.0');

    return this.http.post(url, [{Text: inputText}], {
      headers: headers,
      params: params,
      responseType: 'json'
    }).pipe(map(responseData => {
      return responseData[0]['language'];
    }));
  }
}

export class Language {
  id: string;
  name: string;
  nativeName: string;


  constructor(id: string, name: string, nativeName: string) {
    this.id = id;
    this.name = name;
    this.nativeName = nativeName;
  }
}
