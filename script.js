$(document).ready(function() {
// ===DOM VARIABLES===
var currentDayEl = $("#currentDay");
var containEl = $(".container");

// ===JS VARIABLES===
var DateTime = luxon.DateTime;
var currentTime = DateTime.local();
var agenda = {
    9: "",
    10: "",
    11: "",
    12: "",
    13: "",
    14: "",
    15: "",
    16: "",
    17: ""
};
var clock;
var hours = ["9", "10", "11", "12", "13", "14", "15", "16", "17"];

/*Local Storage Object: 
LSVariable currentTime.toISODate() = {
    9: "",
    10: "",
    11: "",
    12: "",
    13: "",
    14: "",
    15: "",
    16: "",
    17: ""
}
*/

//localStorage.setItem(currentTime.toISODate(), JSON.stringify(agenda));

// ===FUNCTION DEFINITIONS===
function init() {

    if (localStorage.getItem(currentTime.toISODate()) !== null) {
        agenda = JSON.parse(localStorage.getItem(currentTime.toISODate()));
    }
    
    formatDateDisplay();

    startClock();

    formatAgendaDisplay();

    setColorClass();

}

function formatAgendaDisplay() {
    for (var i = 0; i < hours.length; i++) {
        var rowEl = $("<div>");
        rowEl.attr("class", "row time-block");
        containEl.append(rowEl);

        var timeEl = $("<div>");
        timeEl.attr("class", "col-1 hour");
        timeEl.text(hours[i]);
        rowEl.append(timeEl);

        var scheduleEl = $("<textarea>");
        scheduleEl.attr("class", "col-10 description");
        scheduleEl.attr("data-value", hours[i]);
        rowEl.append(scheduleEl);

        var buttonEl = $("<button>");
        buttonEl.attr("class", 'col-1 fas fa-save saveBtn');
        buttonEl.attr("data-value", hours[i]);
        rowEl.append(buttonEl);
    }
}

function formatDateDisplay() {
    currentDayEl.text(currentTime.toFormat("cccc','  LLLL d") + getOrdinal());
}

function getOrdinal() {
    var day = currentTime.day;
    
    switch(day) {
        case 1:
        case 21:
        case 31:
            return "st";
        case 2:
        case 22:
            return "nd";
        case 3:
        case 23:
            return "rd";
        default: 
            return "th";
    }
}

function setColorClass() {
    $("textarea").attr("class", function () {
        var textAreaEl = $(this);
        var dataValue = textAreaEl.attr("data-value");
        if (dataValue < currentTime.hour) {
            textAreaEl.removeClass("present future").addClass("past");
        } else if (dataValue == currentTime.hour) {
            textAreaEl.removeClass("past future").addClass("present");
        } else {
            textAreaEl.removeClass("past present").addClass("future");
        }
    })
}

function startClock() {

    clock = setInterval(function() {
        currentTime = DateTime.local();
        formatDateDisplay();
        setColorClass();
    }, 60000);

}

function loadAgendaItem() {

}

function setLocalStorage() {
    //When I click a save button, the corresponding hour item is saved
    var savedValue = $(this).parent().find("textarea").val();
    console.log(savedValue);
    //localStorage.setItem(currentTime.toISODate(), JSON.stringify(agenda));
}

// ===FUNCTION CALLS===
init();

// ===EVENT LISTENERS===
containEl.on("click", ".saveBtn", setLocalStorage);
});