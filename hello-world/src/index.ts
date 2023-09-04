// PROGRAMMING WITH MOSH TYPESCRIPT TUTORIAL
let age: number = 20; // compiles to `var age = 20;`


// to create a typescript config file, enter tsc -init in the terminal
// now lines in the config file can be uncommented and changed

if (age < 50)
  age += 10;

console.log(age);

// function render(document) { // infers 'any' type
//     console.log(document);
// }

function typeRender(document: any) {
    console.log(document);
}

// Arrays
let numbers = [1,2,3] // tradidtional JS array
let numArr: number[] = [1,2,3];
// let wrongNumArr:number[] = [1,2,'3']; // throws an error


// Tuples
let user: [number, string] = [1, 'Connor'];
// let badUser: [number, string] = [1, 'Connor', 3.2];


// Enums
const small = 1;
const medium = 2;
const large = 3;

// or.....

const enum Size { Small=1, Medium=2, Large=3 }; // make sure to use const for performance
let mySize: Size = Size.Medium;
console.log(mySize);


// Functions

function calculateTax(income: number) {
    return 0; // infers that it returns a Number
}

function typedCalculateTax(income: number): number {
    return 0;
}

function voidCaluclateTax(income: number): void {
    console.log(income);
}

function optionalParam(income: number, taxYear?: number): void {
    console.log(income);
    if (taxYear) console.log(taxYear);
}


// Objects
let employee = { id: 1 }
// employee.name = 'Connor'; // Property 'name' does not exist on this type

let betterEmployee: {
    id: number,
    name?: String
} = { id: 1 }
betterEmployee.name = 'Connor'; // no error


let sneakyEmployee: {
    readonly id: number,
    name?: string,
    retire: (date: Date) => void 
} = {
    id: 1,
    name: "Connor",
    retire: (date: Date) => {
        console.log(date);
    }
}


// Type Aliases
type Employee = {
    readonly id: number,
    name?: string,
    retire: (date: Date) => void 
}

let connor: Employee = {
    id: 1,
    name: "Connor",
    retire: (date: Date) => {
        console.log(date);
    }
}



// Union Types
function kgToLbs(weight: number | string): number { // Using | indicates union type, allows either type
    // Narrowing
    if (typeof weight === 'number') {
        return weight * 2.2;
    } else {
        return parseInt(weight) * 2.2;
    }
}


// Intersection Types
type Draggable = {
    drag: () => void
}

type Resizable = {
    resize: () => void
}


type UIWidget = Draggable & Resizable;

let textBox: UIWidget = {
    drag: () => {},
    resize: () => {}
}



// Literal Types
let quantity: 50; // now quantity can only be set to 50

let otherQuantity: 50 | 100 = 50; // can be set to one or the other, basically enumerating on var itself


// Nullable Types
function greet(name: String) : void {
    console.log(name.toUpperCase())
}
// this won't work if you pass null
// "strictNullChecks" in tsconfig.json can allow this


function greetStrOrNull(name: String | null | undefined): void {
    if (name) {
        console.log(name.toUpperCase());
    } else {
        console.log("Hi there!")
    }
}


// Optional Chaining
type Customer = {
    birthday: Date
}

function getCustomer(id: number): Customer | null {
    return id === 0 ? null : { birthday: new Date() }; 
}

let customer = getCustomer(0);
console.log(customer?.birthday?.getFullYear());

// can use this on functions, too

// END OF TUTORIAL, ANYTHING AFTER IS FROM SOMETHING DIFFERENT