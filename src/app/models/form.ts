export class Form {
  id?: number;
  full_name: string;
  total_price: number;
  credit_card_number: string;

  constructor() {
    this.id = 0;
    this.full_name = '';
    this.total_price = 0;
    this.credit_card_number = '';
  }
}
