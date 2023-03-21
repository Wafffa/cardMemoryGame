// Grab a couple of things we need
const section = document.querySelector('section');
const playerLivesCount = document.querySelector('span');
let playerLives = 6;

// link text
playerLivesCount.textContent = playerLives;

// generate the data
const getData = () => [
    { imgSrc: "./images/1.jpeg", name: "1"},
    { imgSrc: "./images/2.jpeg", name: "2"},
    { imgSrc: "./images/3.jpeg", name: "3"},
    { imgSrc: "./images/4.jpeg", name: "4"},
    { imgSrc: "./images/5.jpeg", name: "5"},
    { imgSrc: "./images/6.jpeg", name: "6"},
    { imgSrc: "./images/7.jpeg", name: "7"},
    { imgSrc: "./images/8.jpeg", name: "8"},
    { imgSrc: "./images/1.jpeg", name: "1"},
    { imgSrc: "./images/2.jpeg", name: "2"},
    { imgSrc: "./images/3.jpeg", name: "3"},
    { imgSrc: "./images/4.jpeg", name: "4"},
    { imgSrc: "./images/5.jpeg", name: "5"},
    { imgSrc: "./images/6.jpeg", name: "6"},
    { imgSrc: "./images/7.jpeg", name: "7"},
    { imgSrc: "./images/8.jpeg", name: "8"},
];
//Randomize 
const randomize = () => {
 const cardData = getData();
 cardData.sort(() => Math.random() - 0.5);
 return cardData;
};

// card generator function 
const cardGenerator = () => {
    const cardData = randomize();
    // Generate the html
    const cards = document.querySelectorAll('.card')
    cardData.forEach((item) => {
     const card = document.createElement("div");
    const face = document.createElement("img");
    const back = document.createElement("div");
    card.classList = 'card'
    face.classList = 'face'
    back.classList = 'back'   
    //Attach the info to the cards 
    face.src = item.imgSrc;
    card.setAttribute('name', item.name)
    //Attach the cards to the section
    section.appendChild(card)
    card.appendChild(face)
    card.appendChild(back)

    card.addEventListener('click', (e)=> {
        card.classList.toggle('toggleCard');
        checkCards(e);
    })
    })
};

//Check cards 
const checkCards = (e) => {
    const clickedCard = e.target;
    clickedCard.classList.add('flipped')
    const flippedCards = document.querySelectorAll('.flipped')
    const toggleCard = document.querySelectorAll(".toggleCard")
    // logic
    if (flippedCards.length === 2){
       if (flippedCards[0].getAttribute('name') === flippedCards[1].getAttribute('name')) {
        console.log("match")
        flippedCards.forEach(card => {
            card.classList.remove('flipped')
            card.style.pointerEvents = "none"
        })
       }
       else{
        console.log("wrong")
        flippedCards.forEach(card => {
            card.classList.remove("flipped")
            setTimeout(() => card.classList.remove("toggleCard"), 1000) 
        })
        playerLives--
        playerLivesCount.textContent = playerLives
        if(playerLives === 0){
            restart("Try Again")
        }
       }
    }
    //Run a check to see if we won the game 
    if (toggleCard.length === 16 ){
        restart("You Won")
    }
}

//Restart
const restart = (text) => {
   let cardData = randomize()
   let faces = document.querySelectorAll('.face')
   let cards = document.querySelectorAll('.card')
   section.style.pointerEvents = "none"
   cardData.forEach((item,index) => {
    cards[index].classList.remove('toggleCard')
    //Randomize 
    setTimeout(() => {
      cards[index].style.pointerEvents = 'all'
    faces[index].src = item.imgSrc
    cards[index].setAttribute('name', item.name) 
    section.style.pointerEvents = "all"
    },1000)
   })
   playerLives = 6;
   playerLivesCount.textContent = playerLives
   setTimeout(() => window.alert(text),1000)
    
}

cardGenerator();


