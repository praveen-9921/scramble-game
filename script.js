// collection of words
let easy_words = [
    { name: "tiger", hint: "It is an animal." },
    { name: "append", hint: "It means to add." },
    { name: "generate", hint: "To create or produce." },
    { name: "green", hint: "It is a color." },
    { name: "ground", hint: "It refers to the earth's surface." }
];

let normal_words = [
    { name: "river", hint: "A body of water." },
    { name: "happy", hint: "State of joy." },
    { name: "table", hint: "A piece of furniture." },
    { name: "flower", hint: "A type of plant." },
    { name: "window", hint: "An opening in a wall." }
];

let hard_words = [
    { name: "cautious", hint: "Being careful." },
    { name: "fragment", hint: "A small part broken off." },
    { name: "lantern", hint: "A portable light." },
    { name: "journey", hint: "An act of traveling." },
    { name: "texture", hint: "The feel or quality of a surface." }
];

let expert_words = [
    { name: "resilience", hint: "The ability to recover quickly." },
    { name: "innovation", hint: "The act of creating something new." },
    { name: "integrity", hint: "Quality of being honest." },
    { name: "perspective", hint: "A point of view." },
    { name: "commitment", hint: "The act of dedication." }
];





// elements from html
let hintButton = document.querySelector('.hint')
let nextButton = document.querySelector('.next')
let answerButton = document.querySelector('.answer')
let inputBox = document.querySelector('.input input')
let user_word = document.querySelector('.word h2');
let score = document.querySelector('#score')
let chance = document.querySelector('#chance')
let finalScore = document.querySelector('.score');
let showHint = document.querySelector('.showHint');
let showAnswer = document.querySelector('.showAnswer')
let message = document.querySelector('.message');


// user score
let scoreValue = 0;
let user_score = score.innerText = `Score: ${scoreValue}`;

// user chance
let chanceValue = 10;
let user_chance = chance.innerText = `Chance Left: ${chanceValue}`;

// count turn
let turn = 0;

// random
let random_number;
let random_word;

// store hint
let hint;


// user value
let user_value;


// done word
let done_word = [];



function generateRandomWord() {
    random_number = Math.floor(Math.random() * 5)
    if (turn < 5) {
        random_word = easy_words[random_number].name;
        hint = easy_words[random_number].hint;
    } else if (turn >= 5 && turn < 10) {
        random_word = normal_words[random_number].name;
        hint = normal_words[random_number].hint;
    } else if (turn >= 10 && turn < 15) {
        random_word = hard_words[random_number].name;
        hint = hard_words[random_number].hint;
    } else if (turn >= 15 && turn < 20) {
        random_word = expert_words[random_number].name;
        hint = expert_words[random_number].hint;
    } else {
        user_word.innerText = `GUESS WORD: `
        nextButton.style.display = "none";
        finalScore.style.display = "block";
        message.innerHTML = "you complete the test......."
    }


    if (done_word.includes(random_word)) {
        return generateRandomWord();
    }
    done_word.push(random_word);
    turn += 1;
    swapWord(random_word.toUpperCase());
}



// swap the words
function swapWord(word) {
    let word_array = word.split('');
    for (i = word_array.length - 1; i > 0; i--) {
        const randomIndex = Math.floor(Math.random() * (i + 1));
        [word_array[i], word_array[randomIndex]] = [word_array[randomIndex], word_array[i]];
    }
    showWord(word_array.join(' '));
}


// show the random word to the user
function showWord(word) {
    user_word.innerText = `GUESS WORD: ${word}`
}

nextButton.addEventListener('click', () => {
    user_value = inputBox.value;
    checkWin(user_value);
})


document.addEventListener('keydown', (event) => {
    if (event.key === "Enter") {
        nextButton.click(); // Simulate button click
    }
});

hintButton.addEventListener('click', () => {
    if (chanceValue > 1) {
        chanceValue -= 1;
        user_chance = chance.innerText = `Chance Left: ${chanceValue}`
        showHint.innerHTML = `HINT: ${hint}`
    } else {
        showHint.innerHTML = `You dont have suffecinet chance to get hint.`
    }
});

answerButton.addEventListener('click', () => {
    if (chanceValue > 2) {
        chanceValue -= 2;
        user_chance = chance.innerText = `Chance Left: ${chanceValue}`
        showAnswer.innerHTML = `ANSWER: ${random_word}`
    } else {
        showAnswer.innerHTML = `You have less than or equal to 2 chances.`
    }
});



function checkWin(user_value) {
    if (random_word == ((user_value).toLowerCase())) {
        scoreValue += 5;
        user_score = score.innerText = `Score: ${scoreValue}`
        showHint.innerHTML = `HINT: `
        showAnswer.innerHTML = `ANSWER: `
        inputBox.value = "";
        generateRandomWord();
    } else {
        loss();
    }
}


function loss() {
    chanceValue -= 1;
    user_chance = chance.innerText = `Chance Left: ${chanceValue}`
    if (chanceValue == 0) {
        chanceValue = 0;
        nextButton.style.display = "none";
        finalScore.style.display = "block";
        inputBox.disabled = true;
    }
    inputBox.value = "";
}


finalScore.addEventListener('click', () => {
    chanceValue = 10;
    user_chance = chance.innerText = `Chance Left: ${chanceValue}`
    scoreValue = 0;
    user_score = score.innerText = `Score: ${scoreValue}`
    inputBox.disabled = false;
    nextButton.style.display = "block";
    finalScore.style.display = "none";
    done_word = []
    turn = 0;
    message.innerHTML = ""
    generateRandomWord();
})
generateRandomWord();


// mistakes


// exist
// let exist = false;

// function existing(word){
//     done_word.forEach(element => {
//         if(element == word){
//             exist = true;
//         }
//     });
// }