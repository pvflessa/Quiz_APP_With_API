//AJAX REQUEST
function requestAJAX(url,callback){
  const xhr = new XMLHttpRequest()
  xhr.open('GET',url,true)
  xhr.onreadystatechange = function(){
    if(xhr.readyState ==4 & xhr.status ==200){
      callback(JSON.parse(xhr.responseText))
    }

  }
  xhr.send()
}


//UI ELEMENTS

const category = document.querySelector('#category')
//const amount = document.querySelector('#amount').value
const quizForm = document.querySelector('#quizForm')
const quizBody = document.querySelector('.quizBody')

//quizBody.innerHTML=''
//quizBody.style.display ="block"
quizForm.addEventListener('submit',getQuestions)




let answers = {
  'correct':0,
  'wrong':0

}


function getQuestions(e){
e.preventDefault(e)

quizForm.style.display = "none"
quizBody.style.display ="block"
  //Build the URl
  let url = 'https://opentdb.com/api.php?'
  // if(amount !== ''){
  //     url += `amount=${amount}&`;
  //
  // }
  if( category !== ''){
    url += `amount=10&category=${category.value}&type=multiple`


  }




  //const url = 'https://opentdb.com/api.php?amount=10&category=18&type=multiple'
  requestAJAX(url,function(data){
    const obj =  data.results[0]
    console.log(data)
    // questionArr = []
    // questionArr.push(obj.question)
    //
    // function getQuestionIndex(question){
    //   const a = questionArr.indexOf(question)
    //
    // }

    //console.log(questionArr[0])
    const question = document.querySelector('#question')
    question.innerHTML = obj.question
    questionBuilder(obj.correct_answer,obj.incorrect_answers)

  })
}

function questionBuilder(correct, incorrect){
  const answersArray = incorrect
  answersArray.push(correct)
  //Put answers random in the array
  answersArray.shuffle = function(){
    var input = this;

    for (var i = input.length-1; i >=0; i--) {

        var randomIndex = Math.floor(Math.random()*(i+1));
        var itemAtIndex = input[randomIndex];

        input[randomIndex] = input[i];
        input[i] = itemAtIndex;
    }
    return input;
  }
  answersArray.shuffle()
  console.log(answersArray)


  //Show answers into buttons
for(var i = 0; i < answersArray.length; i++){

 const buttons = document.querySelectorAll('.button')
for(var i = 0; i < buttons.length; i++ ){
buttons[i].innerHTML = answersArray[i]
const checker=answersArray[i] == correct?true :false
buttons[i].setAttribute('data-cor',checker)

 buttons[i].addEventListener('click',checkAnswer)
}



}



}

function checkAnswer(e){
//  console.log(e.target.getAttribute('data-cor'))

const myAnswer = e.target.getAttribute('data-cor')
  if(myAnswer=="true"){
    answers.correct ++
  }else{
      answers.wrong ++
const buttons = document.querySelectorAll('.button')
for(var i = 0; i < buttons.length; i++ ){

if(buttons[i].getAttribute('data-cor')=='true'){
  const quiz = document.getElementById('quiz')
//alert(`The correct Answer was ${buttons[i].innerText}`)
swal(`The correct Answer was ${buttons[i].innerText}`, {
  buttons: {

      value: "Restart"
    }


})
.then((value) => {
  location.reload()
});

//getQuestions(e)

}

}


  }
  const score = document.getElementById('score')

  score.innerHTML= `Correct ${answers.correct} , Wrong ${answers.wrong}`
  getQuestions(e)
}

//getQuestions()
