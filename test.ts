let a: string = "hola";
a = "Holas";
a = 2;

let b: number = 10;
b = a;
b = 20;
b = 10 + 10;
const num1 = 10;
const num2 = 20;
b = num1 + num2;

let anyValue: any = 10;
anyValue = "Hola";

function suma(num1: number, num2: number): number {
  return num1 + num2 + "hola";
}

suma(1, "2");
function sumaJavascriptVanilla(num1, num2) {
  return num1 + num2;
}

type dni = number;
let dniNumber: dni = 2123;
let dniNumber2: dni = 2123;
