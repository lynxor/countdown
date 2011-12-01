$(function () {
    // Retrieve inital list of countdowns
    $.ajax({
        url: "/countdownlist",
        dataType: "json",
        success: function (o) {
            $("#countdownlist").html(""); // clear
            // iterate through countdowns
           _(o.countdowns).each(function (countdownInfo) {
               placeCountdown(countdownInfo);
            });           
        },
        error: function (o) {
            alert("error retrieving data");
        }
    });
});
/*
var ledColors = {
    lit: "rgba(0, 255, 0, 1.0)",
    unlit: "rgba(0, 255, 0, 0.1)",
    outline: "rgba(255, 255, 255, 1.0)"
};*/

var ledColors = {
    lit: "rgba(0, 112, 60, 1.0)",
    unlit: "rgba(0, 0, 0, 0.0)",
    outline: "rgba(0, 0, 0, 0.0)"
}

var placeCountdown = function (countdownInfo) {
    $.ajax({
        url: "/countdown/" + countdownInfo.url,
        dataType: "json",
        success: function (c) {
            var outside = $('<li></li>').appendTo("#countdownlist");
            $(outside).append("<h5>" + countdownInfo.label + "</h5>");
            $(outside).append("<div id=\"" + countdownInfo.url + "\"></div>");
            
            countdown($("#" + countdownInfo.url), c.eventDate, 24, 32, ledColors);
            
            $("#countdownlist").listview("refresh");
        },
        error: function (o) {
            $("#" + countdownInfo.url).html("Error retrieving countdown timer");
        }
    });
}