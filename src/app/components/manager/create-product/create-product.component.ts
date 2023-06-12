import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { ProductForm } from 'src/app/interfaces/Product';
import { StoreService } from 'src/app/services/store.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-create-product',
  templateUrl: './create-product.component.html',
  styleUrls: ['./create-product.component.css']
})
export class CreateProductComponent implements OnInit {

  public formProduct!: FormGroup

  constructor(private fb: FormBuilder, private storeService: StoreService, private toast: ToastrService)
  {
    this.formProduct = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      category: ['', Validators.required],
      price: [0, Validators.required],
      size: ['XS'],
      promotion: [0],
      quantity: [0],
      image: ['', Validators.required]
    })
  }

  ngOnInit(): void{
    
  }

  onSubmitProduct(){
    const productForm: ProductForm = this.formProduct.value
    this.storeService.postProduct(productForm).subscribe({
      next: _response => {
        this.toast.success('Product created successfuly', 'Ok', {timeOut: 1000, positionClass: 'toast-top-left'})
        this.formProduct = this.fb.group({
          name: ['', Validators.required],
          description: ['', Validators.required],
          category: ['', Validators.required],
          price: ['', Validators.required],
          size: ['XS'],
          promotion: [0],
          quantity: [0],
          image: ['', Validators.required]
        })
      },
      error: error => {
        console.log(error)
      }
    })
  }

}
