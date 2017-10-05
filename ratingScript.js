//endpoint
var url = 'http://localhost:16157/rating';

var style;
var numberOfQuestions;
var count = 0;


///////////////
// Functions //
///////////////

/**
 * send json on ajax post request
 * @param {string} trackID 
 * @param {string} questionID 
 * @param {string} answerID 
 */


function ajaxPost(trackID, questionID, answerID) {
  $.post(url, {
    trackid: trackID,
    [questionID]: answerID,
  });
}

function allQuestionsAnswered(count, numberOfQuestions) {
  if (count === numberOfQuestions) {
    var allAnswerdCard = "<div class='row justify-content-center'><div class='col-xl-5 col-lg-5 col-md-8 col-sm-12 col-12 m-3'><div class='card' id=carderror><img class='img-fluid p-3' src='/Users/bene/myfiles/ratingStatic/thanks.gif' alt='Card image cap'><div class='card-body text-center'><div class='card-title'><h4>Danke</h4></div><p class='card-text'>Vielen Dank für ihre Bewertung</p></div></div></div></div></div>";
    $(".container").children().remove();
    $('.container').append(allAnswerdCard);
  }
}


function changeStarsForPreselectedAnswer(trackID, questionID, answerID) {
  $("#cardshop input[value='" + answerID + "']").attr("checked", true);
  $("#cardshop input[value='" + answerID + "'] ~span").removeClass('ion-ios-star-outline');
  $("#cardshop input[value='" + answerID + "'] ~span").addClass('ion-ios-star');
  ajaxPost(trackID, questionID, answerID);
}


///////////////
//   Main    //
///////////////

$(document).ready(function () {
  var queryStrings = $(location);
  try {
    var trackID = queryStrings[0].search.match(/id=(\d\w{1,})/)[1];
    var questionID = queryStrings[0].search.match(/questionID=(\d|shop)/)[1];
    var answerID = queryStrings[0].search.match(/answerID=(\d)/)[1];
  } catch (error) {
    console.log(error);
  }

  $.ajax(url + queryStrings[0].search, {
    dataType: "json",
    error: function () {
      var errorCard = "<div class='row justify-content-center'><div class='col-xl-5 col-lg-5 col-md-8 col-sm-12 col-12 m-3'><div class='card' id=carderror><img class='img-fluid p-3' src='/Users/bene/myfiles/ratingStatic/error.jpg' alt='Card image cap'><div class='card-body text-center'><div class='card-title'><h4>Error</h4></div><p class='card-text'>Unfortunately there was an Error. Try again later</p></div></div></div></div></div>";
      $('.container').append(errorCard);
    },
    success: function (data) {
      numberOfQuestions = data.rating.length;
      barWidth = 0;
      style = data.ratingStyle;
      data.rating.forEach(function (element, index) {

        if (element.id === "shop") {
          var shopRatingElement = "<div class='row justify-content-center'><div class='col-xl-5 col-lg-5 col-md-8 col-sm-12 col-12 m-3'><div class='card' id=card" + element.id + "><img class='card-img-top img-fluid' src=" + element.imgSrc + " alt='Card image cap'><div class='card-body' ><div class='card-title'><h4>" + element.heading + "</h4></div><p class='card-text'>" + element.question + "</p><ul class='list-group list-group-flush '><li class='list-group-item'><span>Auf keinen Fall</span><input type='radio' name=" + element.id + " autocomplete='off' value='1' ><span class='ion-ios-star-outline float-right star'></span></li><li class='list-group-item'><span>Eher nicht</span><input type='radio' name=" + element.id + " autocomplete='off' value='2' ><span class='ion-ios-star-outline float-right star'></span><span class='ion-ios-star-outline float-right star'></span></li><li class='list-group-item'><span>Noch nicht entschieden</span><input type='radio' name=" + element.id + " autocomplete='off' value='3' ><span class='ion-ios-star-outline float-right star'></span><span class='ion-ios-star-outline float-right star'></span><span class='ion-ios-star-outline float-right star'></span></li><li class='list-group-item'><span>Eher ja</span><input type='radio' name=" + element.id + " autocomplete='off' value='4' ><span class='ion-ios-star-outline float-right star'></span><span class='ion-ios-star-outline float-right star'></span><span class='ion-ios-star-outline float-right star'></span><span class='ion-ios-star-outline float-right star'></span></li><li class='list-group-item '><span>Auf jeden Fall</span><input type='radio' name=" + element.id + " autocomplete='off' value='5' ><span class='ion-ios-star-outline float-right star'></span><span class='ion-ios-star-outline float-right star'></span><span class='ion-ios-star-outline float-right star'></span><span class='ion-ios-star-outline float-right star'></span><span class='ion-ios-star-outline float-right star'></span></li></ul></div></div></div></div>";
          $('.container').prepend(shopRatingElement);
        } else {
          var oneRatingElement = "<div class='row justify-content-center'><div class='col-xl-5 col-lg-5 col-md-8 col-sm-12 col-12 m-3''><div class='card' id=card" + element.id + "><img class='card-img-top img-fluid' src=" + element.imgSrc + " alt='Card image cap'><div class='card-body text-center'><div class='card-title'><h4>" + element.heading + "</h4></div><p class='card-text'>" + element.question + "</p><div class='btn-group w-75 pb-3' data-toggle='buttons'><label class='btn btn-primary bad w-50'><input type='radio' name=question" + element.id + " autocomplete='off' value='bad'> Nein</label><label class='btn btn-primary good w-50'><input type='radio' name=question" + element.id + " autocomplete='off' value='good'>Ja</label></div></div></div></div></div></div>";
          $('.container').append(oneRatingElement);
        }
        if (questionID === element.id) {
          if (questionID === "shop") {
            $("#cardshop input[value='" + answerID + "']").click();
          } else {
            if (answerID === "0") {
              $("#card" + element.id + " .bad").click();
              $("#card" + element.id + " .bad").addClass("active");
            }
            if (answerID === "1") {
              $("#card" + element.id + " .good").click();
              $("#card" + element.id + " .good").addClass("active");
            }
          }
        }
      });

      //change css 
      if (style) {
        $("body").css("background-color", style.primaryColor);
        $(".card").css("background-color", style.cardColor);
        $(".list-group-item").css("background-color", style.listColor);

        $(".list-group-item").hover(function () {
          $(this).css("background-color", style.listColorHover);
        }, function () {
          $(this).css("background-color", style.listColor);
        });

        $(".btn").css("background-color", style.buttonColor);
        $(".btn").css("border-color", style.buttonColor);
        $(".btn.active").css("background-color", style.buttonColorActive);
        $(".btn.active").css("border-color", style.buttonColorActive);

        $(".btn").hover(function () {
          $(this).css("background-color", style.buttonColorActive);
          $(this).css("border-color", style.buttonColorActive);
        }, function () {
          if (!$(this).hasClass("active")) {
            $(this).css("background-color", style.buttonColor);
            $(this).css("border-color", style.buttonColor);
          }
        });

        
      
      }
    }
  });




  //ajax for stars and change from full to empty stars on click

  $('.container').on('click', 'li', function () {
    if ($(this).children('input').attr('checked') !== 'checked') {
      var questionID = $(this).children('input').attr('name');
      var answerID = $(this).children('input').attr('value');
      ajaxPost(trackID, questionID, answerID);
      
    }

    if ($('.list-group input:checked').length === 0) {
      count++;
       $('.progress-bar').css('width', count / numberOfQuestions * 100 + "%");
        $('.progress-bar').text(count  + '/' + numberOfQuestions);
    }
   
    $('.list-group input').attr('checked', false);
    $('.star').removeClass('ion-ios-star');
    $('.star').addClass('ion-ios-star-outline');
    $(this).children('.star').removeClass('ion-ios-star-outline');
    $(this).children('.star').addClass('ion-ios-star');
    $(this).children('input').attr('checked', true);
    allQuestionsAnswered(count, numberOfQuestions);
    
  });


  //ajax for cards with buttons
  $(".container").on('click', '.btn', function () {
     
    if (!$(this).hasClass('active')) {
      $(this).css("background-color", style.buttonColorActive);
      $(this).css("border-color", style.buttonColorActive);
      $(this).siblings().css("background-color", style.buttonColor);
      $(this).siblings().css("border-color", style.buttonColor);
      
     
     
      var questionID = $(this).children().attr('name');
      var answerID = $(this).children().attr('value');
      // Send the data using post

      ajaxPost(trackID, questionID, answerID);
      if (!$(this).siblings().hasClass('active')) {
        count++;
      }
      $('.progress-bar').css('width', count / numberOfQuestions * 100 + "%");
              $('.progress-bar').text(count + '/' + numberOfQuestions);

     
    }
    allQuestionsAnswered(count, numberOfQuestions);
  });

});

