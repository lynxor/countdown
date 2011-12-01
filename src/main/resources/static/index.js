$(function () {
    // Retrieve inital list of countdowns
    $.ajax({
        url: "/countdownlist",
        dataType: "json",
        success: function (o) {
            $("#countdownlist").html(""); // clear
            // iterate through countdowns
           _(o.countdowns).each(function (countdownInfo) {
               model.getCountdown(countdownInfo);
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

var findByDate = function (countdownInfo) {
    for (var i  = 0; i < this.countdowns; i++) {
        if (countdownInfo[i].eventDate > countdownInfo.eventDate) {
            return countdownInfo[i].url;
        }
    }
    return undefined;
}

var model = {
    
    countdowns: [],
}

model.find = _.bind(findByDate, model);

model.putCountdown = function (countdownInfo, c) {
    
    var where = this.find(c);
    var outside;
    var where = this.find(c);
    
    if (where === undefined) {
        outside = $('<li></li>').appendTo("#countdownlist");
    } else {
        outside = $("<li></li>").insertAfter($("#" + where));
    }
    $(outside).append("<h5>" + countdownInfo.label + "</h5>");
    $(outside).append("<div id=\"" + countdownInfo.url + "\"></div>");
    
    countdown($("#" + countdownInfo.url), c.eventDate, 24, 32, ledColors);
    
    $("#countdownlist").listview("refresh");
}

model.getCountdown = function (countdownInfo) {
    $.ajax({
        url: "/countdown/" + countdownInfo.url,
        dataType: "json",
        success: _.bind(this.putCountdown, model, countdownInfo),
        error: function (o) {
            // TODO: handle the error
        }
    });
}

model.clear = function () {
    this.countdowns = [];
    $("#countdownlist").html(""); // clear
 }
 
 