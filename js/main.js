(function ($) {

    let test = "Hello";

    $("h2").text(`You had me at ${test}`);

    var parts = ['shoulders', 'knees'];
    var lyrics = ['heads', ...parts, 'and', 'toes']; 
    console.log(lyrics);

})(jQuery);
