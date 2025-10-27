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
let position = 0;

const moveBlock = () => {
    if (position < 448) {
        position++;
        childBlock.style.left = position + 'px';
        requestAnimationFrame(moveBlock);
    }
};

moveBlock();