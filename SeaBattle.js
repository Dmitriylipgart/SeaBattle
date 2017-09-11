var view = {
    displayMessage: function (msg) {
        var messageArea = document.getElementById("messageArea");
        messageArea.innerHTML = msg;
    },
    displayHit: function(location) {
        var cell = document.getElementById(location);
        cell.setAttribute("class", "hit");
    },

    displayMiss: function (location) {
        var cell = document.getElementById(location);
        cell.setAttribute("class", "miss");
    },


    displayShips: function (location) {

        for (var i = 0; i < location.length; i++) {
            var cell = document.getElementById(location[i]);
            cell.setAttribute("class", "hit");
        }
    },
    hideShips: function (location) {
        for (var i = 0; i < location.length; i++) {
            var cell = document.getElementById(location[i]);
            cell.removeAttribute("class");
        }
    }

};






var model = {
    boardSize: 7,
    numShips: 3,
    shipLength: 3,
    shipSunk: 0,
    ships: [{locations: ["0", "0", "0"], hits: ["", "", ""]},
        {locations: ["0", "0", "0"], hits: ["", "", ""]},
        {locations: ["0", "0", "0"], hits: ["", "", ""]}],

    fire: function (guess) {
        for (var i = 0; i < this.numShips; i++){
            var ship = this.ships[i];
            var index = ship.locations.indexOf(guess);
            if (index >= 0) {
                ship.hits[index] = "hit";
                view.displayHit(guess);
                view.displayMessage('Попал!');
                controller.guesses++;
                if (this.isSunk(ship)){
                    this.shipSunk++;
                    view.displayMessage('Корабль потоплен!!!');
                    if (model.shipSunk === model.numShips) {
                        view.displayMessage( 'Все корабли потоплены!!!\nВам понадобилось ' + controller.guesses + ' ходов' );
                    }
                }
                return true;
            }
        }
        view.displayMiss(guess);
        view.displayMessage('Мимо!');
        controller.guesses++;
        return false;

    },
    isSunk: function (ship) {
        for (var i = 0; i < this.shipLength; i++) {
            if(ship.hits[i] !== "hit") {
                return false;
            }
        }
        return true;
    },
    generateShipLocations: function () {
        var locations;
        for ( var i = 0; i < this.numShips; i++) {
            do {
                locations = this.generateShip();
            } while (this.colision(locations));
                this.ships[i].locations = locations;
            }
        },


    generateShip: function () {
        var row;
        var col;
        var direction = Math.floor(Math.random() * 2);
        if (direction === 1) {
            row = Math.floor(Math.random() * this.boardSize);
            col = Math.floor(Math.random() * (this.boardSize - this.shipLength));

        } else {
            row = Math.floor(Math.random() * (this.boardSize - this.shipLength));
            col = Math.floor(Math.random() * this.boardSize);

        }
        var newShipLocations = [];
        for (var i = 0; i < this.shipLength; i++) {
            if (direction === 1) {
                newShipLocations.push(row + "" + (col + i));
                } else {
                newShipLocations.push((row + i) + "" + col);
            }
        }
        return newShipLocations;
    },


    colision: function (location) {
        for (var i = 0; i < this.numShips; i++) {
            var ship = this.ships[i].locations;
            for (var j = 0; j < ship.length; j++) {
                if (ship.indexOf(location[j]) >= 0){
                    return true;
                }
            }
        }
        return false;
    }

};

var controller = {
  guesses: 0

    /* processGuess: function (guess) {

      var location = parseGuess(guess);
      if (location) {
          this.guesses++;
          var hit = model.fire(location);
          }
      }

  }*/

};

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

window.onload = init;

function init() {
    document.getElementById("fireButton").onclick = handleFireButton;
    document.getElementById("guessInput").onkeypress = handleKeyPress;
    model.generateShipLocations();
    document.getElementById("showButton").onmousedown = showShips;
    document.getElementById("showButton").onmouseup = hideShips;
    var cell = document.getElementsByTagName("td");
    for ( var i = 0; i < cell.length; i++) {
        cell[i].onclick = handleMouseClick;
    }
}
function handleMouseClick() {
    var guess = this.id;
    model.fire(guess);

}

function handleFireButton() {
    var guess = document.getElementById("guessInput").value;
    controller.processGuess(guess);
    document.getElementById("guessInput").value = "";
}

function handleKeyPress(enter) {
    if (enter.keyCode === 13) {
        document.getElementById("fireButton").click();
        return false;
    }
}

function showShips() {
        var locations = [];
        for (var i = 0; i < model.numShips; i++) {
            var ship = model.ships[i];
            for (var j = 0; j < model.shipLength; j++) {
                if (ship.hits[j] !== "hit") {
                    locations.push(ship.locations[j]);

                }
            }
        }
        console.log(locations);
        view.displayShips(locations);
    }

function hideShips() {
    var locations = [];
    for (var i = 0; i < model.numShips; i++) {
        var ship = model.ships[i];
        for (var j = 0; j < model.shipLength; j++) {
            if (ship.hits[j] !== "hit") {
                locations.push(ship.locations[j]);
            }
        }
    }
    view.hideShips(locations);
}