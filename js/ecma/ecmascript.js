let name = 'debill';
let sur = 'big';
console.log(tag`Enter your ${name} quckly ${sur}`);

function tag(literals, ...values){
return (literals[1] + values[1].toUpperCase());
}
