  
  // Variables and const
  const hearts= document.querySelectorAll('.heart')
 let gradeSpan = document.getElementById('grade');
  const starsDisplay = document.querySelector('.stars');
  const overlays = document.querySelectorAll('.overlay');
  const cards = document.querySelectorAll('.card');
  let hasFlippedCard= false;
  let lockBoard=false;
  let firstCard, secondCard;
  // Number of moves
  let movesText = document.getElementById('flips');

  // When the player click a card start flipCard function
function flipCard() {

// To avoid 2 click the same card
     if (lockBoard) return;
      if (this === firstCard) return;
    // Rotate the card 180 deg
   this.classList.add('flip');
     if (!hasFlippedCard) {
    hasFlippedCard = true;
    firstCard = this;
  } else {
      hasFlippedCard= false;
      secondCard=this; 
      checkForMatch();
  }
}

// When two Cards are clicked checkForMatch function start

function checkForMatch () {
      moves++;
          movesText.innerText = moves;
       if(firstCard.dataset.framework=== secondCard.dataset.framework ) {
        disableCards();
      } else {

    // When two Cards are clicked but cards do not match

              unflipCards();
             }
              if(this.matchedCards.length === 8) {
            victory();
              }
   
      }

      // Remove Events and class when cards match

function disableCards() {
    updateGrade();
  firstCard.removeEventListener('click', flipCard);
  secondCard.removeEventListener('click', flipCard);
    this.matchedCards.push(firstCard);
        this.matchedCards.push(secondCard);
   resetBoard();
}

 // Remove Events and class when cards don't match

function unflipCards() {
    lockBoard=true;
    remove_life();
  setTimeout(() => {
    firstCard.classList.remove('flip');
    secondCard.classList.remove('flip');
     resetBoard();
  }, 1000);
}

// The firstCard and secondCard variables need to be reset 

function resetBoard() {
      [hasFlippedCard, lockBoard] = [false, false];
  [firstCard, secondCard] = [null, null];
}

// Randomize cards orders

function shuffle() {
  cards.forEach(card => {
    let randomPos = Math.floor(Math.random() * 8);
    card.style.order = randomPos;
  });
};


// When the game


function victory() {
             document.getElementById('victory-text').classList.add('visible');
             Array.from(cards).forEach(card => card.removeEventListener('click', flipCard)); 
}

function defeat() {
             document.getElementById('game-over-text').classList.add('visible');
             Array.from(cards).forEach(card => card.removeEventListener('click', flipCard)); ;
}

 overlays.forEach(overlay => {
        overlay.addEventListener('click', () => {
            overlay.classList.remove('visible');
             startGame();
           restargame();
    
        });
    });

     
// Lifes container //

function remove_life() {
    if(stars>1) {
		   stars--;
        starsDisplay.children[stars - 1].style.color = "#ff0000";
    }
   else {
       defeat();
   }
    }
    
 // UpdateGrade
 

    function updateGrade() {

    if (moves <=6) {
        if(grade!=="Perfect"){
            grade="Perfect";
            gradeSpan.innerHTML=grade;
        }
    }
    if(moves > 6) {

    // IF the grade is not Average
      if(grade !== "Great")  {
        grade = "Great";
        gradeSpan.innerHTML = grade;
      for( i= 0; i < 5; i++){
            if(i >3){
                hearts[4].classList.add('emptystar')
            }
        }
      }
    }
    if(moves >7 ) {

         // IF the grade is not Poor
      if(grade !== "Average") {
        grade = "Average";
        gradeSpan.innerHTML = grade;
         for( i= 0; i < 5; i++){
            if(i > 2){
                hearts[3].classList.add("emptystar");
            }
        }
      }
    }
  }

    // Restart game clean class and EventListener//
 function restargame() {
        clearInterval();
        for (var i = 0; i < hearts.length; i++) {
    hearts[i].classList.remove('emptystar');
  } 
   Array.from(starsDisplay.children).forEach(function(star) {
    star.style.color="black";
    Array.from(cards).forEach(card => {
            card.classList.remove('flip');
            card.classList.remove('matched');
            Array.from(cards).forEach(card => card.addEventListener('click', flipCard)); 
        });  
  });
 }

 // Clean inner text and restart variables
    function startGame() {
        stars=5;
       let movesText = document.getElementById('flips');
  this.moves = 0;
  movesText.innerHTML = moves;
         this.matchedCards = [];  
          this.matchedCards.length=0;
          shuffle();
     second = 0;
    minute = 0; 
    hour = 0;
    timer.innerHTML = "0 mins 0 secs";
    clearInterval(interval);
    startTimer();
     grade = '';
      gradeSpan.innerHTML = grade;
    }


    //timer 
  var second = 0, minute = 0; hour = 0;
var timer = document.querySelector("#time-remaining");
var interval;
function startTimer(){
    interval = setInterval(function(){
        timer.innerHTML = minute+"mins "+second+"secs";
        second++;
        if(second == 60){
            minute++;
            second=0;
        }
        if(minute == 60){
            hour++;
            minute = 0;
        }
    },1000);
}


   