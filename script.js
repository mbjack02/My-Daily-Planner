// Wrap all code that interacts with the DOM in a call to jQuery to ensure that
// the code isn't run until the browser has finished rendering all the elements
// in the html.

var $currentDateElement = $("#currentDay")
var $wrapperElement = $("#wrapper")



$(document).ready(function () {
   displayCalender()

  var saveBtns = Array.from($(".btn"))

  $(".btn").each(function () {
    $(this).on("click", handleClick)
  })


  function getCurrentDate() {

    var month = (parseInt(dayjs().month()) + 1)
    var dayOfWeek = dayjs().date()
    var year = dayjs().get('year')

    var day = `${month}/${dayOfWeek}/${year}`

    var hour = (parseInt(dayjs().hour()) - 12)

    var present = hour
    var past = (parseInt(hour) - 1)
    var future = (parseInt(hour) + 1)


    return { past, present, future, day }
  }


  function timeOfDay(time) {
    var timeOfDay

    if (parseInt(time + 12) < 12) {
      timeOfDay = 'AM'
    } else if(parseInt(time + 12) === 24) {
      timeOfDay = 'AM'
    } else {
      timeOfDay = 'PM'
    }
    console.log('this is timeofday', parseInt(dayjs().hour()))

    return timeOfDay
  }

  function handleClick(event) {

    var $textAreaValue = $(event.currentTarget.parentElement).find('.description').val()

    var storageValue

    if ((event.currentTarget.parentElement.classList.value).includes('past')) {
      storageValue = 'Past'
    } else if ((event.currentTarget.parentElement.classList.value).includes('present')) {
      storageValue = 'Present'
    } else if ((event.currentTarget.parentElement.classList.value).includes('future')) {
      storageValue = 'Future'
    }


    localStorage.setItem(storageValue, $textAreaValue)

    $textAreaValue = $(event.currentTarget.parentElement).find('.description').val("")

  }

  function displayCalender() {
    var { past, present, future, day } = getCurrentDate()

    $currentDateElement.text(day)

    var html = `
  <div id="hour-${past}" class="row time-block past">
    <div class="col-2 col-md-1 hour text-center py-3">${past}${timeOfDay(past)}</div>
    <textarea class="col-8 col-md-10 description" rows="3"> </textarea>
    <button type="button" class="btn saveBtn col-2 col-md-1" aria-label="save">
      <i class="fas fa-save" aria-hidden="true"></i>
    </button>
   </div>
    
   <div id="hour-${present}" class="row time-block present">
   <div class="col-2 col-md-1 hour text-center py-3">${present}${timeOfDay(present)}</div>
   <textarea class="col-8 col-md-10 description" rows="3"> </textarea>
   <button type="button" class="btn saveBtn col-2 col-md-1" aria-label="save">
     <i class="fas fa-save" aria-hidden="true"></i>
   </button>
  </div>
    
  <div id="hour-${future}" class="row time-block future">
        <div class="col-2 col-md-1 hour text-center py-3">${future}${timeOfDay(future)}</div>
        <textarea class="col-8 col-md-10 description" rows="3"> </textarea>
        <button type="button" class="btn saveBtn col-2 col-md-1" aria-label="save">
          <i class="fas fa-save" aria-hidden="true"></i>
        </button>
  </div>
    
    
    `



    $wrapperElement.append(html)

  }

});
