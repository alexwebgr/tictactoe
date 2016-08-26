var Board = {
  currentPlayer: null,
  players: {},
  moves: 0,
  maxAmountOfMoves: 9,
  cells: $('table .symbol'),
  possibleCombinations: [7, 56, 448, 73, 146, 292, 273, 84],

  initializeBoard: function () {
    this.moves = 0;
    this.currentPlayer = Strings.PLAYER_1;
    this.players[Strings.PLAYER_1] = {
      css: 'cross',
      score: 0
    };
    this.players[Strings.PLAYER_2] = {
      css: 'circle',
      score: 0
    };

    var indicator = 1;

    $.each(this.cells, function () {
      $(this).attr('data-number', indicator);

      indicator += indicator;
    });

    // clear board
    this.cells.attr('class', 'symbol');
    this.cells.attr('data-isFull', 'empty');

    this.updatePlayerLabel();
  },

  checkIfFull: function (isFull) {
    return isFull === 'full';
  },

  win: function (score) {
    for (var i = 0; i < this.possibleCombinations.length; i++) {
      if ((this.possibleCombinations[i] & score) === this.possibleCombinations[i]) {
        return true;
      }
    }
    return false;
  },

  checkWinner: function (number) {
    // add the score
    this.players[this.currentPlayer].score += parseInt(number);

    // increment the moves
    this.moves++;

    // check the score, do we have a winner ?
    // if we do alert the winner
    // else check if we have reached max amount of moves
    // else continue with the next player
    if (this.win(this.players[this.currentPlayer].score)) {
      alert(this.currentPlayer + Strings.PLAYER_WON_MSG);
      this.initializeBoard();
    } else if (this.moves >= this.maxAmountOfMoves) {
      alert(Strings.MAX_AMOUNT_OF_MOVES + this.moves);
      this.initializeBoard();
    } else {
      // switch player
      this.currentPlayer = this.currentPlayer === Strings.PLAYER_1 ? Strings.PLAYER_2 : Strings.PLAYER_1;
      this.updatePlayerLabel();
    }
  },

  updatePlayerLabel: function () {
    // set the now playing label
    $('.nowPlaying').text(this.currentPlayer);
    // set a primary label to the player's letter
    $('.player').removeClass('bg-primary');
    $('.player#' + this.players[this.currentPlayer].css).addClass('bg-primary');
  },

  updateCell: function (elem) {
    elem.attr('data-isFull', 'full');
    elem.addClass(this.players[this.currentPlayer].css);
  }
};
