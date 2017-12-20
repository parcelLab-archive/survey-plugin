const yo = require('yo-yo')

module.exports = function Question(q, emit) {

  // {
  //   "category": "product",
  //   "questionId": "product-sat",
  //   "questionType": "up-down-vote",
  //   "question": "Sind Sie mit der Qualität der bestellten Artikel zufrieden?"
  // }

  function answer(vote) {
    emit('answer', { question: q.questionId, answer: vote === 'up' ? 1 : -1 })
  }

  return yo`
    <div class="card" style="width: 20rem;">
      <img class="card-img-top" src="https://parcellab.com/wp-content/uploads/2016/11/parcelfashion-parcellab-customer-journey-customer-experience-1200x800.jpg" alt="Card image cap">
      <div class="card-body">
        <h4 class="card-title">${q.category}</h4>
        <p class="card-text">${q.question}</p>
        <a href="#" class="btn btn-primary" onclick=${answer('up')}>Go somewhere</a>
      </div>
    </div>
  `
}