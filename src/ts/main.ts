(function ($) {

    let test = "Hello ";

    $("h1").text(`${test} Davey`);     

    var parts = ['shoulders', 'knees'];
    var lyrics = ['heads', ...parts, 'and', 'toes']; 
    console.log(lyrics);  

})(jQuery);
