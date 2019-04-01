import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-purchase-page',
  templateUrl: './purchase-page.component.html',
  styleUrls: ['./purchase-page.component.css']
})
export class PurchasePageComponent implements OnInit {

  constructor(private router: Router, private activatedRoute: ActivatedRoute) {


  }
  onPurchaseButtonClick(): void {
    this.router.navigate(['/payment']);
  }
  ngOnInit() {
  }

}
