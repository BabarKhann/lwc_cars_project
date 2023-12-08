import { LightningElement, wire } from "lwc";

import getCars from "@salesforce/apex/CarController.getCars";

export default class CarList extends LightningElement {
  cars;
  error;

  @wire(getCars)
  handleCars({ data, error }) {
    if (data) {
      this.cars = data;
    }
    if (error) {
      this.error = error;
    }
  }
}
