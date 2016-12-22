"use strict";

(function ($) {

    var test = "Hello";

    $("h2").text("You had me at " + test + ".....");

    var parts = ['shoulders', 'knees'];
    var lyrics = ['heads'].concat(parts, ['and', 'toes']);
    console.log(lyrics);
})(jQuery);
//# sourceMappingURL=main.js.map
