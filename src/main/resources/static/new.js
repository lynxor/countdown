$(document).bind("mobileinit", function () {
    $(function () {
    
        $("#newcountdownForm").bind("submit", function (e) {
            e.preventDefault();
             
            $.mobile.showPageLoadingMsg();
            
            var d = $("#countdownDate").text();
            var data = {
                name: $("#countdownName").val(),
                tags: $("#countdownTags").val(),
                eventDate:  (new Date(2011,12,15)).getTime()
            };
            
            $.ajax({
                url: "/countdown/new", 
                data: data,
                type: "POST",
                success: function (o) {
                        $.mobile.hidePageLoadingMsg();
                        
                        model.putCountdown(o, o);
                        
                        window.location = "#";
                    }, 
                error: function (e) {
                    $.mobile.hidePageLoadingMsg();
                    alert("an error occurred");
                }
            });
        });
    });
});


