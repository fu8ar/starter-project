(function ($) {

    let test = "Hello";

    $("h2").text(`${test} World.....`); 

    var parts = ['shoulders', 'knees'];
    var lyrics = ['heads', ...parts, 'and', 'toes']; 
    console.log(lyrics);  

})(jQuery);
