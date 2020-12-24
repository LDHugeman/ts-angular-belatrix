function logProperty(target, key) {
  let _val = this[key];
  const getter = () => {
    console.log(`Get: ${key} =>${_val}`);
    return _val;
  };
  const setter = (newValue) => {
    console.log(`Set: ${key} =>${newValue}`);
    _val = newValue;
  };

  const objectProperty = {
    get: getter,
    set: setter,
  };
  Object.defineProperty(target, key, objectProperty);
}

class Persona {
  @logProperty
  public name: string;

  constructor(name: string) {
    this.name = name;
  }
}

const p = new Persona("Alan");
p.name = "Platzi"; // Set: ${key} => Platzi'
const nameFromClass = p.name; // Get: ${key} => Platzi'
