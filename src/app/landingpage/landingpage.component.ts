import { Component, OnInit } from '@angular/core';
import {Subscription} from 'rxjs';
import {StewardService} from '../shared/steward.service';

@Component({
  selector: 'app-landingpage',
  templateUrl: './landingpage.component.html',
  styleUrls: ['./landingpage.component.css']
})
export class LandingpageComponent implements OnInit {

  subscription: Subscription;
  spaces = [];

  constructor(
    private service: StewardService<any, any>,
  ) {
    this.subscription = new Subscription();
  }

  ngOnInit(): any {
    this.fetchItems();
  }
  fetchItems(): void {
    this.subscription.add(
      this.service
        .get('spaces/storage_spaces')
        .subscribe((response) => {
          console.log('================>', response);
          if (response.data.storage_spaces.length > 0) {
            this.spaces = response.data.storage_spaces;
          } else {
            // this.openSnackBar('Sorry Something went wrong!', '');
          }
        })
    );
  }

}
