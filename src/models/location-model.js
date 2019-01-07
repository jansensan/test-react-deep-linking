import _ from 'lodash';
import signals from 'signals';

// services
import foodStuffsService from '../services/food-stuffs-service';


class LocationModel {
  constructor() {
    this.baseURL = '';
    this.category = ''; // hash level 1
    this.foodStuff = ''; // hash level 2

    this.updated = new signals.Signal();
  }

  init() {
    // get base url
    this.baseURL = document.location.origin + '/';

    this.parseHash();
  }

  hasCategory() {
    return this.category !== '';
  }

  hasFoodStuff() {
    return this.foodStuff !== '';
  }

  parseHash() {
    // split hash string
    let hash = document.location.hash.split('/');

    let newCategory = '';
    if (hash.length > 0) {
      newCategory = hash[1];
    }
    let newFoodStuff = '';
    if (hash.length > 1) {
      newFoodStuff = hash[2];
    }

    let didChange = false;

    // check category
    if (newCategory === '' || newCategory === undefined) {
      this.category = '';
      didChange = true;

    } else {
      if (foodStuffsService.isCategoryValid(newCategory)) {
        if (newCategory !== this.category) {
          this.category = newCategory;
          this.foodStuff = '';
          didChange = true;
        }
      }
    }

    // check food stuff
    if (newFoodStuff === '' || newFoodStuff === undefined) {
      this.foodStuff = '';
      didChange = true;
      
    } else {
      if (foodStuffsService.isFoodStuffValid(newFoodStuff)) {
        if (newFoodStuff !== this.foodStuff) {
          this.foodStuff = newFoodStuff;
          didChange = true;
        }
      }
    }

    if (didChange) {
      this.updated.dispatch();
    }
  }
}


// create and export singleton
let locationModel = new LocationModel();
export default locationModel;
