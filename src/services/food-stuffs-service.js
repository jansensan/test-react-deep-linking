import _ from 'lodash';

// constants
import FoodTypes from '../constants/food-types';
import FoodStuffs from '../constants/food-stuffs';


// public api
let foodStuffsService = {
  getAllFruits: getAllFruits,
  getAllVeggies: getAllVeggies,
  getFruitWithId: getFruitWithId,
  getVeggieWithId: getVeggieWithId,
  isCategoryValid: isCategoryValid,
  isFoodStuffValid: isFoodStuffValid,
};
export default foodStuffsService;


// methods definitions
function getAllFruits() {
  let fruits = '';
  _.forEach(
    FoodStuffs.fruits,
    (fruit) => {
      fruits += fruit.emoji;
    }
  );
  return fruits;
}

function getAllVeggies() {
  let veggies = '';
  _.forEach(
    FoodStuffs.veggies,
    (veggie) => {
      veggies += veggie.emoji;
    }
  );
  return veggies;
}

function getFruitWithId(id) {
  let fruit = _.filter(FoodStuffs.fruits, {id: id})[0];
  return fruit.emoji;
}

function getVeggieWithId(id) {
  let veggie = _.filter(FoodStuffs.veggies, {id: id})[0];
  return veggie.emoji;
}

function isCategoryValid(value) {
  let isValid = false;
  if (
    value === FoodTypes.FRUITS
    || value === FoodTypes.VEGGIES
  ) {
    isValid = true;
  }
  return isValid;
}

function isFoodStuffValid(value) {
  let validFoodStuffs = [];
  _.forEach(
    FoodStuffs.fruits,
    (fruit) => {
      validFoodStuffs.push(fruit.id);
    }
  );
  _.forEach(
    FoodStuffs.veggies,
    (veggie) => {
      validFoodStuffs.push(veggie.id);
    }
  );
  return validFoodStuffs.indexOf(value) > -1;
}
