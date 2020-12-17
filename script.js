$(document).ready(function() {
// ===DOM VARIABLES===
var currentDayEl = $("#currentDay");
var containEl = $(".container");

// ===JS VARIABLES===
var DateTime = luxon.DateTime;
//var pageClock = setInterval(clock(), 1000);
// var dateFormat = Object.assign(DateTime.DATE_CUSTOM, {
//     weekday: 'long',
//     month: 'long',
//     day: 'numeric'
// })
var hours = ["9", "10", "11", "12", "13", "14", "15", "16", "17"];



// ===FUNCTION DEFINITIONS===
function init() {
    currentDayEl.text("Test");
    for (var i = 0; i < hours.length; i++) {
        var rowEl = $("<div>");
        rowEl.attr("class", "row time-block");
        containEl.append(rowEl);

        var timeEl = $("<div>");
        timeEl.attr("class", "col-1 hour");
        //timeEl.text();
        rowEl.append(timeEl);

        var scheduleEl = $("<textarea>");
        scheduleEl.attr("class", "col-10 description");
        rowEl.append(scheduleEl);

        var buttonEl = $("<button>");
        buttonEl.attr("class", 'col-1 saveBtn');
        rowEl.append(buttonEl);
    }
}

// function clock() {
//     var currentTime = DateTime.local();
// }
// ===FUNCTION CALLS===
init();

// ===EVENT LISTENERS===

});