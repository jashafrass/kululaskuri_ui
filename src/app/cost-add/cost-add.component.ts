import { Component, OnInit, Input, Inject } from '@angular/core';
import { Cost } from '../cost';
import { CostItem } from '../cost.item';
import { CostsService } from '../costs.service';

import {FormArray, FormControl, FormGroup, FormGroupName, FormBuilder} from '@angular/forms';

@Component({
  selector: 'app-cost-add',
  templateUrl: './cost-add.component.html',
  styleUrls: ['./cost-add.component.css']
})
export class CostAddComponent implements OnInit {
  form: FormGroup;
  fb : FormBuilder;

  constructor(private costsService: CostsService, @Inject(FormBuilder) fb: FormBuilder) {
    this.fb = fb;
    this.form = fb.group({
      Shop : '',
      Items : fb.array([

      ]);
    })
  }

  numericInput(value) {
    return parseFloat(value);
  }

  ngOnInit() {
  }

  get diagnostic(): string {
  	return JSON.stringify(this.form.value);
  }

  removeItem(index) {
    const Items = this.form.get('Items'); 
    Items.removeAt(index);
  }
 
  addItem() {
    this.form.get('Items').push(this.fb.group({
      Category : '',
      Amount : 0,
    }));
  }

  save() {
    this.form.value.Items.forEach(function(item) {
      item.Amount = parseFloat(item.Amount);
    });

    console.log(this.costsService);
    this.costsService.addCost(this.form.value);
  }

}
