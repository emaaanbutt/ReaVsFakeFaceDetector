import { error } from "console";

$(function(){
    $("form").on("submit", function(e){
        e.preventDefault();

        const formData = new FormData(this);

        $.ajax({
            url: '/predict',
            method: 'POST',
            data: formData,
            contentType: false,
            processData: false,
            success: function(response){
                $("#prediction").remove();

                $("#prediction").text(response.prediction);
            },
            error: function(){
                $("#prediction").remove();
                 $("#prediction").text("Error fetching predictions.");
            }
        });
    });
});