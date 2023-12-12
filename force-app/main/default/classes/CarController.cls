public with sharing class CarController {
  @AuraEnabled(Cacheable=true)
  public static List<Car__c> getCars(FiltersWrapper filters) {
    String key, whereClause = '';
    Decimal price;
    String[] categories, makeType, criteria = new List<String>();

    if (filters != null) {
      price = filters.price;
      categories = filters.categories;
      makeType = filters.maketype;

      if (!String.isEmpty(filters.searchKey)) {
        key = '%' + filters.searchKey + '%';
        criteria.add('Name LIKE: key');
      }

      if (filters.price >= 0) {
        criteria.add('MSRP__c <= :price');
      }

      if (filters.categories != null) {
        criteria.add('Category__c IN :categories');
      }

      if (filters.maketype != null) {
        criteria.add('Make__c IN :makeType');
      }

      if (criteria.size() > 0) {
        whereClause = 'WHERE ' + String.join(criteria, ' AND ');
      }
    }

    String query =
      'SELECT Id, Name, Picture_URL__c, Category__c, Make__c, MSRP__c, Fuel_Type__c, Number_of_Seats__c, Control__c FROM Car__c' +
      whereClause +
      ' WITH SECURITY_ENFORCED' +
      ' ORDER BY Name';

    return Database.query(query);
  }

  // wrapper class
  public class FiltersWrapper {
    @AuraEnabled
    public String searchKey { get; set; }
    @AuraEnabled
    public String price { get; set; }
    @AuraEnabled
    public String[] categories { get; set; }
    @AuraEnabled
    public String[] maketype { get; set; }
  }
}
