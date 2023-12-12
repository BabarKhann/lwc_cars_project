import { LightningElement, wire } from "lwc";

import getCars from "@salesforce/apex/CarController.getCars";

export default class CarList extends LightningElement {
  cars;
  error;

  filters = {};

  @wire(getCars, { filters: "$filters" })
  handleCars({ data, error }) {
    if (data) {
      this.cars = data;
    }
    if (error) {
      this.error = error;
    }
  }
}
