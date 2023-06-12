import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Search } from 'src/app/interfaces/Search';

@Component({
  selector: 'app-filters',
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.css']
})
export class FiltersComponent implements OnInit{

  @Output() category  = new EventEmitter<string>()
  @Output() lowPrice  = new EventEmitter<string>()
  @Output() hightPrice  = new EventEmitter<string>()
  @Output() searchPrice = new EventEmitter<Search>()

  public categorySelected:  string =  'all'
  public lowSelected:  number =  0
  public hightSelected:  number =  0
  public formSearch!: FormGroup

  constructor( private fb: FormBuilder ){
    this.formSearch = this.fb.group({
      lowPrice: 0,
      hightPrice: 0
    })
  }

  ngOnInit(): void { 

  }

  onSelectCategory(categoryValue: string){
    this.categorySelected = categoryValue
    this.category.emit(this.categorySelected)
  }

  onSelectLowPrice(low: any){
    this.lowPrice.emit(low?.target?.value)
  }

  onSelectHightPrice(hight: any): void {
    this.hightPrice.emit(hight?.target?.value)
  }

  onSearchByPrice(){
    this.searchPrice.emit(this.formSearch.value)
  }

  onRestoreSearch(){
    this.formSearch.patchValue({
      lowPrice: 0,
      hightPrice: 0
    })
    this.searchPrice.emit(this.formSearch.value)
  }
}
