// PHONE CHECKER

const phoneInput = document.querySelector('#phone_input');
const phoneButton = document.querySelector('#phone_button');
const phoneResult = document.querySelector('#phone_result');

const regExp = /^\+996 [5792]\d{2} \d{2}-\d{2}-\d{2}$/

phoneButton.onclick = () => {
    if (regExp.test(phoneInput.value)) {
        phoneResult.innerHTML = 'OK';
        phoneResult.style.color = 'green';
    } else {
        phoneResult.innerHTML = 'NOT OK';
        phoneResult.style.color = 'red';
    }
}

//TAB SLIDER
const tabsParent = document.querySelector('.tab_content_items');
const tabContentBlocks = document.querySelectorAll('.tab_content_block');
const tabs = tabsParent.querySelectorAll('.tab_content_item');

const hideTabContent = () => {
    tabContentBlocks.forEach(block => {
        block.style.display = 'none';
    })
    tabs.forEach(tab => {
        tab.classList.remove('tab_content_item_active');
    })
}

const showTabContent = (blockIndex = 0) => {
    tabContentBlocks[blockIndex].style.display = 'block';
    tabs[blockIndex].classList.add('tab_content_item_active');
}

let currentTab = 0

const switchTab = () => {
    hideTabContent()
    currentTab = (currentTab + 1) % tabs.length
    showTabContent(currentTab)
}

hideTabContent();
showTabContent();
setInterval(switchTab, 3000)

tabsParent.onclick = (e) => {
    if (e.target.classList.contains('tab_content_item')) {
        tabs.forEach((tab, index) => {
            if (e.target === tab) {
                hideTabContent();
                currentTab = index;
                showTabContent(index);
            }
        })
    }
}

// CONVERTER

const somInput = document.querySelector('#som');
const usdInput = document.querySelector('#usd');
const eurInput = document.querySelector('#eur');

const converter = (element, targetElement, targetElement2) => {
    element.oninput = () => {
        const xhr = new XMLHttpRequest();
        xhr.open('GET', '../data/converter.json');
        xhr.setRequestHeader('Content-type', 'application/json');
        xhr.send()

        xhr.onload = () => {
            const data = JSON.parse(xhr.response);
            if (element.id === 'som') {
                targetElement.value = (element.value / data.usd).toFixed(2);
                targetElement2.value = (element.value / data.eur).toFixed(2);
            }
            if (element.id === 'usd') {
                targetElement.value = (element.value * data.usd).toFixed(2);
                targetElement2.value = (element.value * data.usdEur).toFixed(2);
            }
            if (element.id === 'eur') {
                targetElement.value = (element.value * data.eur).toFixed(2);
                targetElement2.value = (element.value * data.eurUsd).toFixed(2);
            }
            if (element.value === '') {
                targetElement.value = '';
                targetElement2.value = '';
            }
        }
    }
}

converter(somInput, usdInput, eurInput)
converter(usdInput, somInput, eurInput)
converter(eurInput, somInput, usdInput)