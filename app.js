/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLOBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game
*/
/*Challanges
1 - A player loses his entire score if he rolls two 6 in a row. After that, is the next player turn.
2 - Add an input field to the HTML where players can set the winning score, so that they can change the predefined score of 100.
*/
var scores, roundScore, currentPlayer, gamePlaying, dicePreValue;
var inputElement = document.querySelector('.winning-score');
init();
//DOM manipulation - selecting  by Id (#) and changing the text content
/* 1st way: Only set text to the HMTL
document.querySelector('#current-' + currentPlayer).textContent = dice;*/
/*2nd way: innerHTML alows to use HMTL syntax on JavaScript (setter)
document.querySelector('#current-' + currentPlayer).innerHTML ='<em>' +dice+ '</em>';*/
/* getter example
var example = document.querySelector('#score-0').textContent;
console.log(example);
*/
//Button roll
//Event Listener (addEventListener(typeOfTheEvent, callBackFunction))
document.querySelector('.btn-roll').addEventListener('click', function(){
  if(gamePlaying){
    //1st setting a random number
    //Math.floor converts decimals to integers
    var dice1 = Math.floor((Math.random() * 6))+1;
    var dice2 = Math.floor((Math.random() * 6))+1;
    //2nd display the result
    document.getElementById('dice-1').style.display = 'block';
    document.getElementById('dice-2').style.display = 'block';
    document.getElementById('dice-1').src = 'dice-'+dice1+'.png';
    document.getElementById('dice-2').src = 'dice-'+dice2+'.png';
    if(dicePreValue === 6 && (dice1 === 6 || dice2===6)){
      scores[currentPlayer] = 0;
      document.getElementById('score-' + currentPlayer).textContent = '0';
      nextPlayer();
    } else if(dice1 !==1 && dice2 !== 1){
    dicePreValue = dice1 + dice2;
    roundScore += dice1 + dice2;
    document.getElementById('current-' + currentPlayer).textContent = roundScore;
    } else{
      //Next plyer
      nextPlayer();
    }
    dicePreValue = dice1 + dice2;
    }
});
//Button to store points
document.querySelector('.btn-hold').addEventListener('click', function(){
  if(gamePlaying){
    scores[currentPlayer] += roundScore;
    document.getElementById('score-' +currentPlayer).textContent = scores[currentPlayer];
    if(inputElement.value){
      if(scores[currentPlayer] >=inputElement.value){
        document.getElementById('name-' + currentPlayer).textContent = 'Winner!';
        document.getElementById('dice-1').style.display = 'none';
        document.getElementById('dice-2').style.display = 'none';
        document.querySelector('.player-' + currentPlayer + '-panel').classList.remove('active');
        document.querySelector('.player-' + currentPlayer + '-panel').classList.add('winner');
        gamePlaying = false;
      } else{
        nextPlayer();
      }
    } else{
      alert('Enter a Winning Score!');
      init();
    }
  }
});

//New game button
document.querySelector('.btn-new').addEventListener('click', init);

//Next player function
function nextPlayer(){
  roundScore = 0;
  document.getElementById('current-'+currentPlayer).textContent = roundScore;
  document.querySelector('.player-' + currentPlayer + '-panel').classList.remove('active');
  currentPlayer === 0 ? currentPlayer = 1 : currentPlayer = 0
  document.querySelector('.player-' + currentPlayer + '-panel').classList.add('active');
  document.getElementById('dice-1').style.display = 'none';
  document.getElementById('dice-2').style.display = 'none';
}

//Initializing function
function init(){
scores = [0,0];
roundScore = 0;
currentPlayer = 0;
gamePlaying = true;
//Manipulating CSS elements: Hiding the dice. To access classes use dot ('.class'), Ids use #id-name
document.getElementById('dice-1').style.display = 'none';
document.getElementById('dice-2').style.display = 'none';
//Only for Ids. Faster than querySelector
document.getElementById('score-0').textContent = '0';
document.getElementById('current-0').textContent = '0';
document.getElementById('score-1').textContent = '0';
document.getElementById('current-1').textContent = '0';
document.getElementById('name-0').textContent = 'Player 1';
document.getElementById('name-1').textContent = 'Player 2';
document.querySelector('.player-0-panel').classList.remove('winner');
document.querySelector('.player-1-panel').classList.remove('winner');
document.querySelector('.player-0-panel').classList.remove('active');
document.querySelector('.player-1-panel').classList.remove('active');
document.querySelector('.player-0-panel').classList.add('active');
}