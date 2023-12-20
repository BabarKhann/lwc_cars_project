import { LightningElement, wire } from "lwc";

import { getObjectInfo, getPicklistValues } from "lightning/uiObjectInfoApi";
import Car_Object from "@salesforce/schema/Car__c";
import CATEGORY from "@salesforce/schema/Car__c.Category__c";
import MAKE from "@salesforce/schema/Car__c.Make__c";

//LMS
import { publish, MessageContext } from "lightning/messageService";
// MessageChannel
import CarsFilterMessageChannel from "@salesforce/messageChannel/CarsFilters__c";

export default class CarFilter extends LightningElement {
  filters = {
    searchKey: "",
    price: 999999
  };

  timer;

  @wire(MessageContext)
  messageContext;

  @wire(getObjectInfo, { objectApiName: Car_Object })
  carObjectInfo;

  @wire(getPicklistValues, {
    recordTypeId: "$carObjectInfo.data.defaultRecordTypeId",
    fieldApiName: CATEGORY
  })
  categories;

  @wire(getPicklistValues, {
    recordTypeId: "$carObjectInfo.data.defaultRecordTypeId",
    fieldApiName: MAKE
  })
  maketype;

  handleSearchChange(e) {
    this.filters = { ...this.filters, searchKey: e.target.value };
    console.log(JSON.stringify(this.filters));
    this.sendDataToCarList();
  }

  handlePriceChange(e) {
    this.filters = { ...this.filters, price: e.target.value };
    console.log(JSON.stringify(this.filters));
    this.sendDataToCarList();
  }

  handleChange(e) {
    if (!this.filters.categories) {
      const categories = this.categories.data.values.map(
        (value) => value.value
      );
      const maketype = this.maketype.data.values.map((value) => value.value);

      this.filters = { ...this.filters, categories, maketype };
    }
    const { name, value } = e.target.dataset;
    console.log("name", name);
    console.log("value", value);
    if (e.target.checked) {
      if (!this.filters[name].includes(value)) {
        this.filters[name] = [...this.filters[name], value];
      }
    } else {
      this.filters[name] = this.filters[name].filter((item) => item !== value);
    }

    this.sendDataToCarList();
  }

  sendDataToCarList() {
    clearTimeout(this.timer);
    // eslint-disable-next-line @lwc/lwc/no-async-operation
    this.timer = setTimeout(() => {
      publish(this.messageContext, CarsFilterMessageChannel, {
        filters: this.filters
      });
    }, 400);
  }
}
