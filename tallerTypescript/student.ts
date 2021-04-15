export class Student {
  completeName: string;
  code: number;
  cardId: number;
  age: number;
  address: string;
  phone:number;
  constructor(completeName: string,code: number, cardId: number, age:number,address:string,phone:number) {
    this.completeName = completeName;
    this.code = code;
    this.cardId = cardId;
    this.age = age;
    this.address = address;
    this.phone = phone;
  }
}