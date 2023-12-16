"use strict";
function generateBoard(size) {
    for (let line = 0; line < size; line++) {
        let lineSquares = [];
        for (let column = 0; column < size; column++) {
            const newSquare = window.document.createElement('div');
            newSquare.classList.add('defaultSquare');
            newSquare.addEventListener('click', (event) => {
                paintSquare(event.target);
            });
            gameboardElement === null || gameboardElement === void 0 ? void 0 : gameboardElement.appendChild(newSquare);
            lineSquares.push(newSquare);
        }
        gameboardSquares.push(lineSquares);
    }
}
function extractColors(answer) {
    let answerColors = [];
    for (let line of answer) {
        for (let squareColor of line) {
            if (squareColor) {
                if (!answerColors.includes(squareColor)) {
                    answerColors.push(squareColor);
                }
            }
        }
    }
    return answerColors;
}
function countAnswerSquares(answer) {
    let answerSquares = 0;
    for (let line of answer) {
        answerSquares += line.filter(value => value !== null).length;
    }
    return answerSquares;
}
function generateSelectors(colors) {
    for (let color of colors) {
        let selector = window.document.createElement('input');
        selector.type = 'radio';
        selector.name = 'selector';
        selector.style.backgroundColor = color;
        selector.setAttribute('value', color);
        selectorsElement === null || selectorsElement === void 0 ? void 0 : selectorsElement.appendChild(selector);
    }
}
function generateLabels(answer, boardSize) {
    for (let line of answer) {
        let last = null;
        let label = {};
        let labelCount = 0;
        for (let index = boardSize - 1; index >= 0; index--) {
            let square = line[index];
            if (square) {
                if (square === last) {
                    label[`${labelCount}${square}`] += 1;
                }
                else {
                    labelCount++;
                    label[`${labelCount}${square}`] = 1;
                    last = square;
                }
            }
            else {
                last = null;
            }
        }
        renderLabel(label, 'y');
    }
    for (let columnIndex = 0; columnIndex < boardSize; columnIndex++) {
        let last = null;
        let label = {};
        let labelCount = 0;
        for (let lineIndex = boardSize - 1; lineIndex >= 0; lineIndex--) {
            let square = answer[lineIndex][columnIndex];
            if (square) {
                if (square === last) {
                    label[`${labelCount}${square}`] += 1;
                }
                else {
                    labelCount++;
                    label[`${labelCount}${square}`] = 1;
                    last = square;
                }
            }
            else {
                last = null;
            }
        }
        renderLabel(label, 'x');
    }
}
function renderLabel(labelData, axe) {
    let newLabel = window.document.createElement('ul');
    newLabel.classList.add('label');
    let colorCodes = Object.keys(labelData);
    for (let index = colorCodes.length - 1; index >= 0; index--) {
        let colorCode = colorCodes[index];
        let number = labelData[colorCode];
        let newLabelInfo = window.document.createElement('li');
        newLabelInfo.classList.add('label_info');
        newLabelInfo.style.backgroundColor = colorCode.slice(1);
        newLabelInfo.innerHTML = `<p>${number}</p>`;
        newLabel.appendChild(newLabelInfo);
    }
    const labelContainer = window.document.getElementById(`${axe}_label_container`);
    labelContainer.appendChild(newLabel);
}
function renderHearts() {
    for (let index = 0; index < hearts; index++) {
        let newHeart = window.document.createElement('img');
        newHeart.setAttribute('src', './assets/full-heart.svg');
        heartsContainer === null || heartsContainer === void 0 ? void 0 : heartsContainer.appendChild(newHeart);
    }
}
function paintSquare(square) {
    if (!square.style.backgroundColor) {
        for (let line of gameboardSquares) {
            if (line.indexOf(square) !== -1) {
                let columnIndex = line.indexOf(square);
                let lineIndex = gameboardSquares.indexOf(line);
                if (answer[lineIndex][columnIndex] !== selected) {
                    wrongAttempt();
                }
                else {
                    square.style.backgroundColor = selected;
                    totalCorrectSquares++;
                    if (totalCorrectSquares === totalAnswerSquares) {
                        endGame({ message: 'Congrats!', button: 'Repeat game', showStars: true });
                    }
                }
            }
        }
    }
}
function wrongAttempt() {
    if (hearts > 0) {
        hearts--;
        heartsContainer === null || heartsContainer === void 0 ? void 0 : heartsContainer.children[hearts].setAttribute('src', './assets/empty-heart.svg');
    }
    if (hearts === 0) {
        endGame({ message: 'Game Over', button: 'Try again' });
    }
}
function endGame(content) {
    clearInterval(interval);
    let modal = window.document.getElementById('modal');
    modal.style.display = 'flex';
    let message = window.document.createElement('h3');
    message.innerText = content.message;
    modal === null || modal === void 0 ? void 0 : modal.appendChild(message);
    if (content.showStars) {
        let starsConatiner = window.document.createElement('ul');
        let time = timerValues.seconds + timerValues.minutes * 60;
        let stars = time < 30 ? 5 : time < 60 ? 4 : time < 120 ? 3 : time < 180 ? 2 : 1;
        stars = stars - (3 - hearts);
        for (let index = 0; index < stars; index++) {
            let newStar = window.document.createElement('img');
            newStar.setAttribute('src', './assets/full-star.svg');
            starsConatiner.appendChild(newStar);
        }
        for (let index = 0; index < 5 - stars; index++) {
            let newStar = window.document.createElement('img');
            newStar.setAttribute('src', './assets/empty-star.svg');
            starsConatiner.appendChild(newStar);
        }
        modal === null || modal === void 0 ? void 0 : modal.appendChild(starsConatiner);
        console.log('a');
    }
    let button = window.document.createElement('button');
    button.innerHTML = content.button;
    button.addEventListener('click', () => window.location.reload());
    modal === null || modal === void 0 ? void 0 : modal.appendChild(button);
}
function updateTimer() {
    timerValues.seconds++;
    if (timerValues.seconds == 60) {
        timerValues.seconds = 0;
        timerValues.minutes++;
        if (timerValues.minutes == 60) {
            endGame({ message: 'Timeout', button: 'Try again' });
        }
    }
    timerElement.innerText = `${timerValues.minutes}:${timerValues.seconds}`;
}
const answer = [['#3aa209', null, '#13acea', null, '#ea5713', null, null, null, null, null], ['#3aa209', null, '#13acea', null, '#ea5713', null, null, null, null, null], ['#3aa209', null, '#13acea', null, '#ea5713', null, null, null, null, null], ['#3aa209', null, '#13acea', null, '#ea5713', null, null, null, null, null], ['#3aa209', null, '#13acea', null, '#ea5713', null, null, null, null, null], ['#3aa209', null, '#13acea', null, '#ea5713', '#ea5713', '#ea5713', '#ea5713', '#ea5713', '#ea5713'], ['#3aa209', null, '#13acea', null, null, null, null, null, null, null], ['#3aa209', null, '#13acea', '#13acea', '#13acea', '#13acea', '#13acea', '#13acea', '#13acea', '#13acea'], ['#3aa209', null, null, null, null, null, null, null, null, null,], ['#3aa209', '#3aa209', '#3aa209', '#3aa209', '#3aa209', '#3aa209', '#3aa209', '#3aa209', '#3aa209', '#3aa209']];
const gameboardElement = window.document.getElementById('board');
let gameboardSquares = [];
let boardSize = answer[0].length;
generateBoard(boardSize);
var totalCorrectSquares = 0;
const totalAnswerSquares = countAnswerSquares(answer);
const selectorsElement = window.document.getElementById('selectors');
let colors = extractColors(answer);
generateSelectors(colors);
let selectors = window.document.getElementsByName('selector');
selectors[0].checked = true;
let selected = selectors[0].value;
for (let selector of selectors) {
    selector.addEventListener('click', (event) => {
        var _a;
        selected = (_a = event.target) === null || _a === void 0 ? void 0 : _a.value;
    });
}
generateLabels(answer, boardSize);
var hearts = 3;
const heartsContainer = window.document.getElementById('hearts_container');
renderHearts();
const timerValues = { seconds: 0, minutes: 0 };
const timerElement = window.document.createElement('h4');
timerElement.setAttribute('id', 'timer');
timerElement.innerText = `${timerValues.minutes}:${timerValues.seconds}`;
const header = window.document.querySelector('header');
header === null || header === void 0 ? void 0 : header.appendChild(timerElement);
let interval = setInterval(updateTimer, 1000);
