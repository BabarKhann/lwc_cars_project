public with sharing class CarController {
  @AuraEnabled(Cacheable=true)
  public static List<Car__c> getCars() {
    return [
      SELECT
        Id,
        Name,
        Picture_URL__c,
        Category__c,
        Make__c,
        MSRP__c,
        Fuel_Type__c,
        Number_of_Seats__c,
        Control__c
      FROM Car__c
    ];
  }
}
