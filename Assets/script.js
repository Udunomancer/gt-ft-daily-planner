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

// ===FUNCTION DEFINITIONS===
function init() {
    //Function to run on page load.  Checks for local storage memory item and configures page
    //Input: none
    //Output: none

    if (localStorage.getItem(currentTime.toISODate()) !== null) {
        agenda = JSON.parse(localStorage.getItem(currentTime.toISODate()));
    }
    
    formatDateDisplay();

    startClock();

    formatAgendaDisplay();

    setColorClass();

}

function formatAgendaDisplay() {
    //Function to build time, text area and save button for each slot on the 9-5 agenda
    //Input: none
    //Output: none

    for (var i = 0; i < hours.length; i++) {
        var rowEl = $("<div>");
        rowEl.attr("class", "row time-block");
        containEl.append(rowEl);

        var timeEl = $("<div>");
        timeEl.attr("class", "col-1 hour");
        timeEl.text(convertTime(hours[i]));
        rowEl.append(timeEl);

        var scheduleEl = $("<textarea>");
        scheduleEl.attr("class", "col-10 description");
        scheduleEl.attr("data-value", hours[i]);
        scheduleEl.val(agenda[hours[i]]);
        rowEl.append(scheduleEl);

        var buttonEl = $("<button>");
        buttonEl.attr("class", 'col-1 fas fa-save saveBtn');
        buttonEl.attr("data-value", hours[i]);
        rowEl.append(buttonEl);
    }
}

function formatDateDisplay() {
    //Function to set date in page header
    //Input: none
    //Output: none

    currentDayEl.text(currentTime.toFormat("cccc','  LLLL d") + getOrdinal());
}

function getOrdinal() {
    //Function to set the day ordinal for the header date
    //Input: none
    //Output: (string) 2 character day ordinal

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

function convertTime(militaryTime) {
    //Function to change time from 24 hour clock to 12 hour clock for display
    //Input: (string) Time in 24 hour
    //Output: (string) Time in 12 hour
    
    if (parseInt(militaryTime) < 12) {
        return militaryTime + "am";
    } else if (parseInt(militaryTime) === 12) {
        return militaryTime + "pm";
    } else {
        return (militaryTime - 12) + "pm";
    }
}

function setColorClass() {
    //Function to set the time slot text area element colors by changing class based on current time
    //Input: none
    //Output: none

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
    //Function to start the interval for dynamic page changes
    //Input: none
    //Output: none

    clock = setInterval(function() {
        
        var oldTime = currentTime;
        currentTime = DateTime.local();

        //If statement to check if there was a day change, IF SO...
        if (oldTime.day !== currentTime.day) {
        
            //Reset the agenda items for a new day
            if (localStorage.getItem(currentTime.toISODate()) !== null) {
                agenda = JSON.parse(localStorage.getItem(currentTime.toISODate()));
            } else {
                agenda = {
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
            }
            
            //Empty the Time container of yesterday's items
            containEl.empty();

            //Reload with today's items
            formatAgendaDisplay();

            //Change header to reflect new date
            formatDateDisplay();
        }
        
        //Time based functions that should always occur
        //Dynamically set color coding
        setColorClass();

    }, 60000);

}

function setLocalStorage() {
    //Function to save textarea input into agenda then to local storage on Save Button click
    //Input: none
    //Output: none

    var timeSlot = $(this).attr("data-value");
    var savedValue = $(this).parent().find("textarea").val();
    agenda[timeSlot] = savedValue;
    localStorage.setItem(currentTime.toISODate(), JSON.stringify(agenda));
}

// ===FUNCTION CALLS===
init();

// ===EVENT LISTENERS===
containEl.on("click", ".saveBtn", setLocalStorage);
});