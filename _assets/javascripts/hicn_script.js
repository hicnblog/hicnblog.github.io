(function($) {
    'use strict';
    function on_init_load(){
        var check_table_markdown = $('p#table_markdown_show').length;
        var check_diary_on = $('p#diary_on_show').length;

        if (check_table_markdown !== 0) {
            $("code").css('cursor', 'pointer');
            $("code").click(function() {
                var html_val = $(this).html();

                var ClipboardHelper = {
                    copyElement: function($element) {
                        this.copyText($element.text())
                    },
                    copyText: function(text) { // Linebreaks with \n
                        var $tempInput = $("<textarea>");
                        $("body").append($tempInput);
                        $tempInput.val(text).select();
                        document.execCommand("copy");
                        $tempInput.remove();
                        this.copyFinished('Copied!!!', 1500);
                    },
                    copyFinished: function(textCopied, timeout) {
                        Materialize.toast(textCopied, timeout);
                    }
                };

                ClipboardHelper.copyText(html_val);

            }); // on click

            $("code").tooltip({
                delay: 50,
                tooltip: "Klik untuk copy text emoji"
            });
            
        }
    }
window.sr = ScrollReveal({ reset: true });
// Initialize scrollreveal
sr.reveal('.reveal', {
    distance: '0',
    duration: 500,
    easing: 'ease-in-out',
    origin: 'top',
    scale: 1,
    reset: false,
    viewFactor: 0
});
$(document).ready(function(){
    on_init_load();
    // Initialize fluidbox
    $('.fluidbox-trigger').fluidbox();

    // Track page views on Turbolinks
    if (typeof ga === 'function') {
        ga('send', 'pageview', location.pathname);
    }
});
})(jQuery);