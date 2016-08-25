$(function ($) {
  Board.cells.click(function () {
    if (Board.checkIfFull($(this).attr('data-isFull'))) {
      return false;
    }

    Board.updateCell($(this));

    Board.checkWinner($(this).attr('data-number'));
  });

  Board.initializeBoard();
});

