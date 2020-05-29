import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {Language, TranslationService} from "../shared/translation.service";
import {NgForm} from "@angular/forms";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-translate',
  templateUrl: './translate.component.html',
  styleUrls: ['./translate.component.css']
})
export class TranslateComponent implements OnInit, OnDestroy {
  languages: Language[] = [];

  @ViewChild('f', {static: false}) form: NgForm;
  loadingDetect = false;
  loadingTranslation = false;
  detectError = null;
  translationError = null;
  private subscription1: Subscription;
  private subscription2: Subscription;
  private subscription3: Subscription;

  constructor(private translationService: TranslationService) {
  }

  ngOnInit(): void {

    this.subscription1 = this.translationService.fetchSourceLanguages().subscribe(languages => {
      this.languages = languages;
    }, error => {
      console.log(error);
    })
  }

  ngOnDestroy(): void {
    this.subscription1?.unsubscribe();
    this.subscription2?.unsubscribe();
    this.subscription3?.unsubscribe();

  }

  onTranslate() {
    this.loadingTranslation = true;
    const sourceLanguage: string = this.form.form.value.sourceSelect;
    const targetLanguage: string = this.form.form.value.targetSelect;
    const inputText: string = this.form.form.value.inputTextarea;
    this.subscription2 = this.translationService.translateText(sourceLanguage, targetLanguage, inputText).subscribe(translation => {
      this.form.form.patchValue({outputTextarea: translation});
      this.loadingTranslation = false;
      this.translationError = null;
    }, error => {
      this.loadingTranslation = false;
      this.translationError = error.message;
      console.log(error.message);
    });


  }

  onDetectLanguage() {
    this.loadingDetect = true;
    const inputText: string = this.form.form.value.inputTextarea;
    this.subscription3 = this.translationService.detectLanguage(inputText).subscribe(language => {
      this.form.form.patchValue({sourceSelect: language});
      this.loadingDetect = false;
      this.detectError = null;
    }, error => {
      console.log(error.message);
      this.loadingDetect = false;
      this.detectError = error.message;
    });
  }
}
