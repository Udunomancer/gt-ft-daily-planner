$(document).ready(function() {
// ===DOM VARIABLES===
var currentDayEl = $("#currentDay");
var containEl = $(".container");

// ===JS VARIABLES===
var DateTime = luxon.DateTime;
var currentTime = DateTime.local();

var hours = ["9", "10", "11", "12", "13", "14", "15", "16", "17"];



// ===FUNCTION DEFINITIONS===
function init() {
    formatDateDisplay();

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
        rowEl.append(scheduleEl);

        var buttonEl = $("<button>");
        buttonEl.attr("class", 'col-1 saveBtn');
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

// function clock() {
//     var currentTime = DateTime.local();
// }
// ===FUNCTION CALLS===
init();

// ===EVENT LISTENERS===

});