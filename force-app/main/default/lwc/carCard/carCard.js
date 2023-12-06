import { LightningElement } from "lwc";

import NAME_FIELD from "@salesforce/schema/Car__c.Name";
import PICTURE_URL_FIELD from "@salesforce/schema/Car__c.Picture_URL__c";
import CATEGORY_FIELD from "@salesforce/schema/Car__c.Category__c";
import MAKE_FIELD from "@salesforce/schema/Car__c.Make__c";
import MSRP_FIELD from "@salesforce/schema/Car__c.MSRP__c";
import FUEL_TYPE_FIELD from "@salesforce/schema/Car__c.Fuel_Type__c";
import NUMBER_OF_SEATS_FIELD from "@salesforce/schema/Car__c.Number_of_Seats__c";
import CONTROL_FIELD from "@salesforce/schema/Car__c.Control__c";
import { getFieldValue } from "lightning/uiRecordApi";

export default class CarCard extends LightningElement {
  //   nameField = NAME_FIELD;
  //   pictureUrlField = PICTURE_URL_FIELD;
  categoryField = CATEGORY_FIELD;
  makeField = MAKE_FIELD;
  msrpField = MSRP_FIELD;
  fuelTypeField = FUEL_TYPE_FIELD;
  numberSeatsField = NUMBER_OF_SEATS_FIELD;
  controlField = CONTROL_FIELD;

  recordId = "";
  objectApiName = "Car__c";

  carName;
  carImageUrl;

  handleRecord(e) {
    const { records } = e.detail;
    const recordData = records[this.recordId];

    this.carName = getFieldValue(recordData, NAME_FIELD);
    this.carImageUrl = getFieldValue(recordData, PICTURE_URL_FIELD);
  }
}
