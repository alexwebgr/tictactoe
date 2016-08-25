var currentPlayer = 'x';
var players = {
  x: {
    css: 'cross',
    score: 0
  },
  o: {
    css: 'circle',
    score: 0
  }
};
var maxAmountOfMoves = 9;
var cells = $('.symbol');
var possibleCombinations = [7, 56, 448, 73, 146, 292, 273, 84];
var moves = 0;

$(function ($) {
  cells.click(function () {
    if ($(this).attr('data-isFull') == 'full') {
      return false;
    }

    $(this).attr('data-isFull', 'full');
    $(this).addClass(players[currentPlayer].css);
    // estimate the value do we have a winner
    // if we do alert the winner
    // add the score
    players[currentPlayer].score += parseInt($(this).attr('data-number'));
    // increment the moves
    moves ++;

    if(win(players[currentPlayer].score)) {
      alert(currentPlayer + ' has won');
      setBoard();
    } else if (moves > maxAmountOfMoves) {
      alert('maximum amount of moves reached ' + moves);
      setBoard();
    } else {
      // switch user
      currentPlayer = currentPlayer === 'x' ? 'o' : 'x';
      // set the now playing
      $('.nowPlaying').text(currentPlayer);

      // set a primary label to the players' letter
      $('.player .label').removeClass('label-primary');
      $('.player.' + players[currentPlayer].css + ' .label').addClass('label-primary');
    }
  });

  setBoard();
});

function win(score) {
  for (var i = 0; i < possibleCombinations.length; i += 1) {
    if ((possibleCombinations[i] & score) === possibleCombinations[i]) {
      return true;
    }
  }
  return false;
}

function setBoard() {
  var indicator = 1;
  moves = 0;
  currentPlayer = 'x';
  players.x.score = 0;
  players.o.score = 0;

  $.each(cells, function () {
    $(this).attr('data-number', indicator);
    $(this).attr('data-isFull', 'empty');

    indicator += indicator;
  });

  cells.attr('class', 'symbol');

  $('.nowPlaying').text(currentPlayer);
  $('.player .label').removeClass('label-primary');
  $('.player.' + players[currentPlayer].css + ' .label').addClass('label-primary');
}

