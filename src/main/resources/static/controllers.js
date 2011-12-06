var controllers = function (model) {
    
    return {
        newCountdown: function (e) {
            e.preventDefault();
             
            $.mobile.showPageLoadingMsg();
            
            var ed;
            try {
                ed = Date.parse($("#countdownDatetime").val());
            } catch (err) {
                alert("cannot parse date: " + err);
                return;
            }
            
            var data = {
                name: $("#countdownName").val(),
                tags: $("#countdownTags").val(),
                eventDate:  ed
            };
            
            $.ajax({
                url: "/countdown/new", 
                data: data,
                type: "POST",
                success: function (o) {
                    $.mobile.changePage($("#mainview"), "none");
                    var n = model.putCountdown(o, true);
                    $.mobile.hidePageLoadingMsg();
                    // the following could also be "position"
                    _.defer(function () { $.mobile.silentScroll($(n).offset().top); } );
                    
                }, 
                error: function (e) {
                    $.mobile.hidePageLoadingMsg();
                    alert("an error occurred");
                }
            });
        },
        
        random: function (e) {
            $.mobile.showPageLoadingMsg();
            
            $.ajax({
                url: "/countdown/random", 
                type: "GET",
                success: function (o) {
                    model.clear();
                    $.mobile.changePage($("#mainview"), "none");
                    model.putCountdown(o);
                    $.mobile.hidePageLoadingMsg();
                }, 
                error: function (e) {
                    $.mobile.hidePageLoadingMsg();
                    alert("an error occurred");
                }
            });
        },
        clear: function (e) {
            model.clear();
        }
    }
}
