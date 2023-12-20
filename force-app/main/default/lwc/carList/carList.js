import { LightningElement, wire } from "lwc";

import getCars from "@salesforce/apex/CarController.getCars";

//LMS
import { subscribe, MessageContext } from "lightning/messageService";
import CarsFilterMessageChannel from "@salesforce/messageChannel/CarsFilters__c";

export default class CarList extends LightningElement {
  cars;
  error;

  filters = {};
  subscription;

  @wire(MessageContext)
  messageContext;

  @wire(getCars, { filters: "$filters" })
  handleCars({ data, error }) {
    if (data) {
      this.cars = data;
      console.log(JSON.stringify(data));
    }
    if (error) {
      this.error = error;
      console.log(error);
    }
  }

  subscribeHandler() {
    this.subscription = subscribe(
      this.messageContext,
      CarsFilterMessageChannel,
      (message) => {
        this.getFilters(message);
      }
    );
  }

  getFilters(message) {
    this.filters = { ...message.filters };
    console.log(JSON.stringify(this.filters), "⬇️⬇️⬇️");
  }

  connectedCallback() {
    this.subscribeHandler();
  }

  disconnectedCallback() {}
}
