const yo = require('yo-yo')

const Question = require('./question')

module.exports = function App(state, emit) {

  return yo`
    <div class="row">
      ${state.questions.map(function (q) {
        return Question(q, emit)
      })}
    </div>
  `
}