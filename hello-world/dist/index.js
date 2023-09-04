"use strict";
var _a;
let age = 20;
if (age < 50)
    age += 10;
console.log(age);
function typeRender(document) {
    console.log(document);
}
let numbers = [1, 2, 3];
let numArr = [1, 2, 3];
let user = [1, 'Connor'];
const small = 1;
const medium = 2;
const large = 3;
;
let mySize = 2;
console.log(mySize);
function calculateTax(income) {
    return 0;
}
function typedCalculateTax(income) {
    return 0;
}
function voidCaluclateTax(income) {
    console.log(income);
}
function optionalParam(income, taxYear) {
    console.log(income);
    if (taxYear)
        console.log(taxYear);
}
let employee = { id: 1 };
let betterEmployee = { id: 1 };
betterEmployee.name = 'Connor';
let sneakyEmployee = {
    id: 1,
    name: "Connor",
    retire: (date) => {
        console.log(date);
    }
};
let connor = {
    id: 1,
    name: "Connor",
    retire: (date) => {
        console.log(date);
    }
};
function kgToLbs(weight) {
    if (typeof weight === 'number') {
        return weight * 2.2;
    }
    else {
        return parseInt(weight) * 2.2;
    }
}
let textBox = {
    drag: () => { },
    resize: () => { }
};
let quantity;
let otherQuantity = 50;
function greet(name) {
    console.log(name.toUpperCase());
}
function greetStrOrNull(name) {
    if (name) {
        console.log(name.toUpperCase());
    }
    else {
        console.log("Hi there!");
    }
}
function getCustomer(id) {
    return id === 0 ? null : { birthday: new Date() };
}
let customer = getCustomer(0);
console.log((_a = customer === null || customer === void 0 ? void 0 : customer.birthday) === null || _a === void 0 ? void 0 : _a.getFullYear());
//# sourceMappingURL=index.js.map