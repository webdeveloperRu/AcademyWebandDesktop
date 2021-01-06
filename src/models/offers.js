export default class Offers {
  constructor(products, title, description, price, end_on, currency,intern_title) {
    this.products = products;
    this.title = title;
    this.description = description;
    this.price = price;
    this.end_on = end_on;
    this.currency = currency;
    this.intern_title = intern_title;
  }
}