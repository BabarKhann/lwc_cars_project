import { LightningElement, wire } from "lwc";

import { getObjectInfo, getPicklistValues } from "lightning/uiObjectInfoApi";
import Car_Object from "@salesforce/schema/Car__c";
import CATEGORY from "@salesforce/schema/Car__c.Category__c";
import MAKE from "@salesforce/schema/Car__c.Make__c";

export default class CarFilter extends LightningElement {
  filters = {
    searchKey: "",
    price: 999999
  };

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
  }

  handlePriceChange(e) {
    this.filters = { ...this.filters, price: e.target.value };

    console.log(JSON.stringify(this.filters));
  }

  handleChange(e) {
    const { name, value } = e.target.dataset;
    console.log("name", name);
    console.log("value", value);
  }
}
