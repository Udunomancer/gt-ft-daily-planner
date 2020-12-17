$(document).ready(function() {
// ===DOM VARIABLES===
var containEl = $(".container");

// ===JS VARIABLES===
var hours = ["9", "10", "11", "12", "13", "14", "15", "16", "17"];

// ===FUNCTION DEFINITIONS===
function init() {
    for (var i = 0; i < hours.length; i++) {
        var rowEl = $("div");
        rowEl.attr("class", "row time-block");
        containEl.append(rowEl);

        
    }
}
// ===FUNCTION CALLS===
init();

// ===EVENT LISTENERS===

});