import { Component, OnInit, Input } from '@angular/core';

import { Category } from '../../_models/category';


@Component({
  selector: 'app-category-selector',
  templateUrl: './category-selector.component.html',
  styleUrls: ['./category-selector.component.css']
})

export class CategorySelectorComponent implements OnInit {
  category: string;
  @Input() categoriesIn: Array<Category>;

  constructor() { }

  ngOnInit(): void {
  }

  onCategorySelect(event: any) {
    this.category = event.target.value;
  }

  validateCategory(): boolean {
    if (this.category === undefined) {
      return false;
    } else if (this.category === '0') {
      return false;
    } else {
      return true;
    }
  }
}

