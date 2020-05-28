import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {NgForm} from "@angular/forms";
import {TranslationService} from "../shared/translation.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-thesaurus',
  templateUrl: './thesaurus.component.html',
  styleUrls: ['./thesaurus.component.css']
})
export class ThesaurusComponent implements OnInit, OnDestroy {
  @ViewChild('f', {static: false}) form: NgForm;
  definitions: string[] = [];
  private subscription: Subscription;

  constructor(private translationService: TranslationService) {
  }

  ngOnInit(): void {
  }

  onSearch() {
    const input: string = this.form.form.value.inputTextarea;
    this.translationService.fetchThesaurus(input).subscribe(list => {
      this.definitions = list;
    })

  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }
}
