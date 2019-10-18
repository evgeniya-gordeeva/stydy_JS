let num = 266219;

//Вывести в консоль произведение (умножение) цифр этого числа
let numTemp = eval(num.toString().split('').join('*'));
console.log(numTemp);

//Полученный результат возвести в степень 3, используя только 1 оператор
console.log(numTemp**3);

//Вывести на экран первые 2 цифры полученного числа
console.log((numTemp**3).toString().slice(0,2));


