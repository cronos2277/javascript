import { Department } from './department';

export interface Product {
    name:string;
    _id?:string;
    stock:Number;
    price:Number;
    departments: Department[];
}
