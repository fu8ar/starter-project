
/*
    Explicitly setting properties on window object
    to solve the following errors:
    1. Property 'opera' does not exist on type 'Window'.
    2. Property 'MSStream' does not exist on type 'Window'
*/
interface Window { opera: any; MSStream: any; }
window.opera = window.opera || {}; 
window.MSStream = window.MSStream || {}; 


(function ($) {

    /*
        Get URL Parameter Values
    */
    function getParameterByName(name: string) {
        name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
        var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
        results = regex.exec(location.search);
        return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
    }


    /*
        Testing to see if user is on a touch device
    */
    function userIsUsingTouchDevice() {
        var userAgent = navigator.userAgent || navigator.vendor || window.opera;

        // Windows Phone must come first because its UA also contains "Android"
        if (/windows phone/i.test(userAgent)) { 
            return true; //"Windows Phone";
        }

        if (/android/i.test(userAgent)) {
            return true; //"Android";
        }

        // iOS detection from: http://stackoverflow.com/a/9039885/177710
        if (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream) {
            return true; //"iOS";
        }

        return false;//"unknown";
    }

    if (userIsUsingTouchDevice()) {
        $('html').addClass('touch-device');
    }
    else{
        $('html').addClass('none-touch-device');
    }


})(jQuery);
