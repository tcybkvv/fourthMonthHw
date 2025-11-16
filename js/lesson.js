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
    element.oninput = async () => {
        try{
            const response = await fetch(`../data/converter.json`);
            const data = await response.json();
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
        catch(e){
            console.log('Fetch error:', e);
        }
    }
}

converter(somInput, usdInput, eurInput)
converter(usdInput, somInput, eurInput)
converter(eurInput, somInput, usdInput)

//CARD SWITCHER

const card = document.querySelector('.card'),
    btnPrev = document.querySelector("#btn-prev"),
    btnNext = document.querySelector('#btn-next');

let count = 1;

async function loadData(count) {
    try{
        const response = await fetch(`https://jsonplaceholder.typicode.com/todos/${count}`);
        const data = await response.json();
        card.innerHTML = `
            <p>${data.title}</p>
            <p style="color: ${data.completed ? "green" : "red" }">${data.completed}</p>
            <span>${data.id}</span>
        `
    }
    catch(e){
        console.log('Fetch error:', e);
    }
}

function updateCount(operation) {
    if (operation === 'next') {
        count = count < 200 ? count + 1 : 1;
    } else if (operation === 'prev') {
        count = count > 1 ? count - 1 : 200;
    }
    loadData(count);
}

btnNext.onclick = () => updateCount('next');

btnPrev.onclick = () => updateCount('prev');

loadData(count);


async function asyncLoadPosts() {
    try{
        const response = await fetch('https://jsonplaceholder.typicode.com/posts')
        const data = await response.json()
        console.log(data);
    }
    catch(e){
        console.log('Fetch error:', error);
    }
}

asyncLoadPosts()


// WEATHER

const searchInput = document.querySelector('.cityName')
const searchBtn = document.querySelector('#search');
const cityName = document.querySelector('.city');
const cityTemp = document.querySelector('.temp');

const API_URL = 'http://api.openweathermap.org/data/2.5/weather';
const API_KEY = 'e417df62e04d3b1b111abeab19cea714'

searchBtn.onclick = async () => {
    try {
        if (searchInput.value !== '') {
            const responseWeather = await fetch(`${API_URL}?appid=${API_KEY}&q=${searchInput.value}&units=metric&lang=ru`)
            const dataWeather = await responseWeather.json();
            if (dataWeather.status === '404') {
                cityName.innerHTML = 'Введите корректное название';
                cityTemp.innerHTML = '';
            } else {
                cityName.innerHTML = dataWeather.name;
                cityTemp.innerHTML = Math.round(dataWeather.main.temp) + 'ºC';
            }
            searchInput.value = ''
        } else {
            cityName.innerHTML = 'Введите название города';
            cityTemp.innerHTML = '';
        }
    } catch (error) {
        console.log(error);
    }

}
