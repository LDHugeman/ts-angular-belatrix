class Persona {
  private edad: number;
  private altura: number;
  private dni: string;

  constructor(edad: number, altura: number, dni: string) {
    this.edad = edad;
    this.altura = altura;
    this.dni = dni;
  }
}

class Alumno extends Persona {
  private matricula: string;
  constructor(edad: number, altura: number, dni: string, matricula: string) {
    super(edad, altura, dni);
    this.matricula = matricula;
  }
}

let persona: Persona = new Persona(27, 1.69, "36601731");
let alumno: Alumno = new Alumno(27, 1.69, "36601731", "123");

persona = alumno;
alumno = persona;
