'use strict'
const startBtn = document.querySelector('.start')
const screens = document.querySelectorAll('.screen')
const timeList = document.querySelector('#time-list')
const timeElement = document.querySelector('#time')
const board = document.querySelector('#board')
const colors = ['red', 'yellow', 'cyan', 'orange', 'orchid', 'plum', 'blue', 'green', 'silver', 'brown']

let time = 0, score = 0


startBtn.addEventListener('click', event => {
    event.preventDefault()
    screens[0].classList.add('up')
})

timeList.addEventListener('click', event => {
    if (event.target.classList.contains('time-btn')) {
        time = parseInt(event.target.getAttribute('data-time'))
        screens[1].classList.add('up')
        startGame()
    }
})

board.addEventListener('click', event => {
    if (event.target.classList.contains('circle')) {
        score++
        document.querySelector('.circle').remove()
        createRandomCircle()
    }
})

function startGame() {
    const interval = setInterval(() => {
        let current = time === 0 ? 0 : time--
        timeElement.innerHTML = `00:${current < 10 ? '0'+current : current}`
        if (current === 0) {
            clearInterval(interval)
            finishGame()
        }
    }, 1000)
    createRandomCircle()
}

function finishGame() {
    const finishScreen = document.createElement('div')
    finishScreen.classList.add('screen')
    finishScreen.insertAdjacentHTML('afterbegin', `<h1>Счёт: <span class="primary">${score}</span></h1>`)

    document.body.append(finishScreen)
    screens[2].classList.add('up')
}

function createRandomCircle() {
    const circle = document.createElement('div')
    const getRandomNumber = function(min, max) {
        return Math.round(Math.random() * (max - min) + min)
    }
    const {width, height} = board.getBoundingClientRect()

    const size = getRandomNumber(5, 40)
    const x = getRandomNumber(0, width - size)
    const y = getRandomNumber(0, height - size)

    circle.classList.add('circle')
    circle.style.width = `${size}px`
    circle.style.height = `${size}px`

    circle.style.background = getRandomColor()
    circle.style.top = `${y}px`
    circle.style.left = `${x}px`

    board.append(circle)
}

function getRandomColor() {
    return colors[Math.floor(Math.random() * colors.length)]
}
