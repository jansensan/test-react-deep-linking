import _ from 'lodash';
import React, { Component } from 'react';

// constants
import FoodTypes from '../../constants/food-types';

// services
import foodStuffsService from '../../services/food-stuffs-service';

// models
import locationModel from '../../models/location-model';

// styles
require('./emoji-display.scss');


export default class EmojiDisplay extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isComponentMounted: false
    }
    locationModel.updated.add(this.onLocationUpdated, this);
  }

  // react methods definitions
  render() {
    return (
      <div className="emoji-display">
        <div className="display">{this.setDisplay()}</div>
      </div>
    );
  }

  componentDidMount() {
    this.setState({
      isComponentMounted: true
    });
  }


  // methods definitions
  setDisplay() {
    let display = '';

    if (!locationModel.hasCategory()) {
      display = foodStuffsService.getAllFruits()
        + foodStuffsService.getAllVeggies();

    } else if (!locationModel.hasFoodStuff()) {
      switch (locationModel.category) {
        case FoodTypes.VEGGIES:
          display = foodStuffsService.getAllVeggies();
          break;
        case FoodTypes.FRUITS:
          display = foodStuffsService.getAllFruits();
          break;
      }

    } else {
      switch (locationModel.category) {
        case FoodTypes.VEGGIES:
          display = foodStuffsService.getVeggieWithId(locationModel.foodStuff);
          break;
        case FoodTypes.FRUITS:
          display = foodStuffsService.getFruitWithId(locationModel.foodStuff);
          break;
      }
    }

    return display;
  }

  onLocationUpdated() {
    this.update();
  }

  update() {
    if (!this.state.isComponentMounted) {
      return;
    }

    this.forceUpdate();
  }

}