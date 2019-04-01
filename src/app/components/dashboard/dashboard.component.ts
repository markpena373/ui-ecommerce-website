import { Component, OnInit } from '@angular/core';
import {ProductRetrieverService} from '../../services/product_retriever/product-retriever.service';
import {Product} from '../../models/Product';
import {Router} from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})

export class DashboardComponent implements OnInit {
  products: Product[];
  makes: string[];
  models: string[];
  makeCheckboxes: any[];
  modelCheckBoxes: any[];
  selectedMakes: string[];
  selectedModels: string[];
  filters: string[];
  searchText: string;
  noResults: boolean;
  searchYear: string;
  productsToDisplay: Product[];

  constructor(productService: ProductRetrieverService, private router: Router) {
    this.products = productService.getProducts();
    this.makes = productService.getMakeList();
    this.models = productService.getModelList();
    this.makeCheckboxes = [];
    this.modelCheckBoxes = [];
    this.selectedMakes = [];
    this.selectedModels = [];
    this.filters = [];
    this.searchText = '';
    this.searchYear = '';
    this.noResults = false;
    this.productsToDisplay = this.products;
    this.initializeCheckboxes();
  }

  ngOnInit() {
  }

  filterTable() {
    this.noResults = false;
    if (this.searchText.length === 0 && this.filters.length === 0 && this.searchYear.length === 0) {
      this.productsToDisplay = this.products;
      return;
    }
    this.productsToDisplay = [];
    if (this.searchText.length !== 0) {
      this.applySearchTermFilter();
      // this.noResults = this.productsToDisplay.length === 0;
      // if (this.filters.length !== 0) {
      //   this.applyCheckboxFiltersWithSearchTerm();
      // }
      this.noResults = this.productsToDisplay.length === 0;
      return;
    }
    if (this.productsToDisplay.length === 0) {
      this.productsToDisplay = this.products;
    }
    // if (this.searchYear.length !== 0) {
    //   this.applyYearFilter();
    // }
    if (this.productsToDisplay.length === 0) {
      this.productsToDisplay = this.products;
    }
    if (this.filters.length === 0) {
      return;
    }
    this.applyCheckboxFilters();
    this.noResults = this.productsToDisplay.length === 0;
  }

  private applyCheckboxFilters() {
    if (this.searchText.length === 0 && this.searchYear.length === 0) {
      this.productsToDisplay = this.products;
    }
    const newList: Product[] = [];
    for (const filter of this.filters) {
      for (const product of this.productsToDisplay) {
        if (product.make.toLowerCase().includes(filter) ||
            product.model.toLowerCase().includes(filter)) {
          newList.push(product);
        }
      }
    }
    this.productsToDisplay = newList;
  }

  // private applyCheckboxFilters() {
  //   for (const filter of this.filters) {
  //     for (const product of this.products) {
  //       if (product.year.toString().toLowerCase().includes(filter) ||
  //         product.make.toLowerCase().includes(filter) ||
  //         product.model.toLowerCase().includes(filter)) {
  //         this.productsToDisplay.push(product);
  //       }
  //     }
  //   }
  // }

  private applySearchTermFilter() {
    for (const product of this.products) {
      if (product.year.toString().includes(this.searchText.toLowerCase()) ||
        product.make.toLowerCase().includes(this.searchText.toLowerCase()) ||
        product.model.toLowerCase().includes(this.searchText.toLowerCase())) {
        console.log(product);
        this.productsToDisplay.push(product);
      }
    }
  }

  private applyCheckboxFiltersWithSearchTerm() {
    const productsSearchList = this.productsToDisplay;
    const newProductList: Product[] = [];
    for (const filter of this.filters) {
      for (const product of productsSearchList) {
          if (product.year.toString().toLowerCase().includes(filter) ||
              product.make.toLowerCase().includes(filter) ||
              product.model.toLowerCase().includes(filter)) {
            newProductList.push(product);
        }
      }
    }
    this.productsToDisplay = newProductList;
  }

  private applyYearFilter() {
    const newList: Product[] = [];
    for (const product of this.productsToDisplay) {
      if (product.year.toString().includes(this.searchYear)) {
        console.log('hi');
        newList.push(product);
      }
    }
    this.productsToDisplay = newList;
  }

  initializeCheckboxes() {
    for (const make of this.makes) {
      this.makeCheckboxes.push({'make': make, 'checked': false});
    }

    for (const model of this.models) {
      this.modelCheckBoxes.push({'model': model, 'checked': false});
    }
  }

  onMakeSelection(value: string, event: any) {
      if (event.target.checked === true) {
        this.addFilter(value);
      } else {
        this.removeFilter(value);
      }
      this.filterTable();
  }

  clearMakeCheckboxes(type: string) {
    if (type === 'make') {
      for (const checkbox of this.makeCheckboxes) {
        checkbox.checked = false;
      }
    }
    if (type === 'model') {
      for (const checkbox of this.modelCheckBoxes) {
        checkbox.checked = false;
      }
    }
  }

  addFilter(filterVal: string) {
    if (!this.filters.includes(filterVal)) {
      this.filters.push(filterVal);
    }
  }

  removeFilter(filterVal: string) {
    if (this.filters.includes(filterVal)) {
      const index = this.filters.indexOf(filterVal);
      this.filters.splice(index, 1);
    }
  }

  paymentPage() {
    this.router.navigate(['/purchase']);
  }
}
