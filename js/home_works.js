// GMAIL CHECKER
const gmailInput = document.querySelector('#gmail_input');
const gmailButton = document.querySelector('#gmail_button');
const gmailResult = document.querySelector('#gmail_result');

const regExp = /^\D{4,}\w*@gmail.com$/g

gmailButton.onclick = () => {
    if (regExp.test(gmailInput.value)) {
        gmailResult.innerText = 'OK';
        gmailResult.style.color = 'green';
    } else {
        gmailResult.innerText = 'Oops!';
        gmailResult.style.color = 'red';
    }
}

//MOVE BLOCK
const childBlock = document.querySelector('.child_block');
const parentBlock = document.querySelector('.parent_block');
let positionX = 0;
let positionY = 0;

const width = parentBlock.clientWidth - childBlock.offsetWidth;
const height = parentBlock.clientHeight - childBlock.offsetHeight;

const moveBlock = () => {
    if (positionX < width && positionY === 0) positionX++;
    else if (positionX >= width && positionY < height) positionY++;
    else if (positionY >= height && positionX > 0) positionX--;
    else if (positionX <= 0 && positionY > 0) positionY--;

    childBlock.style.left = `${positionX}px`;
    childBlock.style.top = `${positionY}px`;
    requestAnimationFrame(moveBlock);
};

moveBlock();
// STOPWATCH
const seconds = document.querySelector('#seconds');
const start = document.querySelector('#start');
const stop = document.querySelector('#stop');
const reset = document.querySelector('#reset');

let interval;
let secs = 0;

start.onclick = () => {
    if (!interval) {
        interval = setInterval(() => {
            secs++;
            seconds.innerText = secs;
        }, 1000);
    }
};

stop.onclick = () => {
    clearInterval(interval);
    interval = null;
};

reset.onclick = () => {
    clearInterval(interval);
    interval = null;
    secs = 0;
    seconds.innerText = 0;
};

// CHARACTERS
const charactersBlock = document.querySelector('.characters-list');

window.onload = () => {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', '../data/characters.json');
    xhr.setRequestHeader('Content-type', 'application/json');
    xhr.send()

    xhr.onload = () => {
        const data = JSON.parse(xhr.response);
        data.forEach(character => {
            const characterDiv = document.createElement('div');
            const imgBlock = document.createElement('div');
            const img = document.createElement('img');
            const h3 = document.createElement('h3');
            const p = document.createElement('p');
            characterDiv.className = 'character';
            imgBlock.className = 'imgBlock';
            imgBlock.appendChild(img);
            characterDiv.append(imgBlock, h3, p)
            img.src = character.photo
            h3.innerHTML = `Name: ${character.name}`
            p.innerHTML = `Age: ${character.age}`
            charactersBlock.append(characterDiv);
        })
    }
}

// BIO
const bioBtn = document.querySelector('.bio');

bioBtn.onclick = () => {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', '../data/bio.json');
    xhr.setRequestHeader('Content-type', 'application/json');
    xhr.send()

    xhr.onload = () => {
        const data = JSON.parse(xhr.response);
        console.log(`
        Name: ${data.name}
        Age: ${data.age}
        Is study? - ${data.isStudy}
        Language: ${data.language}
        `)
    }
}