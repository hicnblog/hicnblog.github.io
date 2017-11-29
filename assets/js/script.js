(function($) {
    'use strict';
    var get_origin = window.location;
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
                    copyText: function(text) {
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

    function inject_widget_sholat(){
        
    }

    function switcher_display_website(){
        var elem    = document.querySelector('.hicnblog-js-switch');
        var hd_hd = localStorage.getItem("hicnblog_display");
        if(hd_hd !== null && hd_hd !== 'false'){
            elem.checked = true;
            var switchery = new Switchery(elem, { color: '#ffffff', secondaryColor: '#000000', jackColor: '#f7f7f7', jackSecondaryColor: '#424242' });
            $('head').append('<link rel="stylesheet" href="'+get_origin.origin+'/assets/css/light/main.css">');
        } else {
            var switchery = new Switchery(elem, { color: '#ffffff', secondaryColor: '#000000', jackColor: '#f7f7f7', jackSecondaryColor: '#424242' });
        }
        elem.onchange = function() {
          localStorage.setItem('hicnblog_display', elem.checked);
          setTimeout(function(){
            location.reload();
          }, 1000);
        };
    }

$(document).ready(function(){
    on_init_load();
    switcher_display_website();
});
})(jQuery);