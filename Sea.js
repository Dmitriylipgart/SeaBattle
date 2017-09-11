/**
 * Created by МитькаКатька on 21.05.2017.
parseGuess = function (guess) {
    var alphabet = ["A", "B", "C", "D", "E", "F", "G"];

        var row = alphabet.indexOf(guess.charAt(0));
        var column = guess.charAt(1);
        if (isNaN(column) || column >= 7 || row < 0 || guess === null || guess.length != 2) {
            alert('Введите букву ряда и цифру колонки, соответствующие координатам выстрела');
            return false;
        }
        return row + column;


};

console.log(parseGuess('A0'));
console.log(parseGuess('B6'));
console.log(parseGuess('A8'));
console.log(parseGuess('K0'));
*/

alert ('You sank all ships!!! \nFor ' + ' 4' + 'turns' );