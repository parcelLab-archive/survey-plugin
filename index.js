const yo = require('yo-yo')
const Nanostore = require('nanostore')

const App = require('./components/App')
const store = new Nanostore({ questions: [] })

// API interaction

const _BASE = 'https://api.parcellab.com/survey'

store.on('fetchQuestions', (params) => {
  var xhr = new XMLHttpRequest();
  xhr.withCredentials = false;

  xhr.addEventListener('readystatechange', function () {
    if (this.readyState === 4) store.set({ questions: JSON.parse(this.responseText) })
  });

  xhr.open('GET', _BASE + '/questions/?courier=dhl-germany&tno=00340434157718087561');
  xhr.setRequestHeader("content-type", "application/json");

  xhr.send();
})

store.on('answer', (params) => {
  var xhr = new XMLHttpRequest();
  xhr.withCredentials = false;

  xhr.addEventListener('readystatechange', function () {
    if (this.readyState === 4) {
      console.log(this.responseText);
    }
  });

  xhr.open('POST', _BASE + '/answer?courier=dhl-germany&tno=00340434157718087561');
  xhr.setRequestHeader("content-type", "application/json");

  xhr.send(JSON.stringify(params));
})

// auto update app

let app = App(store.get(), store.emit)
store.subscribe(state => {
  console.log('State changed ~>')
  console.log(state)
  yo.update(app, App(state, store.emit))
})

// launch app

let root = document.getElementById('parcelLab-survey-container')
root.appendChild(app)

store.emit('fetchQuestions', '?courier=dhl-germany&tno=00340001503505968361')