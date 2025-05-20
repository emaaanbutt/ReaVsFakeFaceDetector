$(function(){
    $("form").on("submit", function(e){
    e.preventDefault();

    const formData = new FormData(this);
    $("#prediction").text("Predicting...").show();

    $.ajax({
        url: '/predict',
        method: 'POST',
        data: formData,
        contentType: false,
        processData: false,
        success: function(response){
            $("#prediction").text(response.prediction).show();
        },
        error: function(){
            $("#prediction").text("Error fetching predictions.").show();
        }
    });
});

});

