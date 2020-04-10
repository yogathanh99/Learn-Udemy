function Animal(age) {
  this.age = age;
}

Animal.prototype.showAge = function() {
  console.log(this.age);
};

function Cat(color) {
  this.color = color;
}

Cat.prototype = new Animal();
Cat.prototype.showColor = function() {
  console.log(this.color);
};

const kitty = new Cat();
kitty.age = 4;
kitty.color = 'white';

kitty.showColor();
kitty.showAge();

(function hello() {
  console.log('Hello');
})();
