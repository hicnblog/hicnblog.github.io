(function($) {
    'use strict';
    var clone_display_diary = $("#display_diary").clone();
    var clone_content_empty = $('#form-container').clone();

    $('#display_diary').remove();
    // make guid
    function guid() {
        return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
            s4() + '-' + s4() + s4() + s4();
    }

    function s4() {
        return Math.floor((1 + Math.random()) * 0x10000)
            .toString(16)
            .substring(1);
    }

    var getUrlParameter = function getUrlParameter(sParam, url) {
        var sPageURL = decodeURIComponent(url),
            sURLVariables = sPageURL.split('?'),
            sHb = sURLVariables[1].split('&'),
            sParameterName,
            i;

        for (i = 0; i < sHb.length; i++) {
            sParameterName = sHb[i].split('=');

            if (sParameterName[0] === sParam) {
                return sParameterName[1] === undefined ? true : sParameterName[1];
            }
        }
    };

    var getUrlParameterOnUse = function getUrlParameterOnUse(sParam) {
        var sPageURL = decodeURIComponent(window.location.search.substring(1)),
            sURLVariables = sPageURL.split('&'),
            sParameterName,
            i;

        for (i = 0; i < sURLVariables.length; i++) {
            sParameterName = sURLVariables[i].split('=');

            if (sParameterName[0] === sParam) {
                return sParameterName[1] === undefined ? true : sParameterName[1];
            }
        }
    };

    // Configure date
    var loc_d = new Date();
    var opt = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    var opt_loc = { timeZone: 'Asia/Jakarta', timeZoneName: 'short', hour12: false, hour: '2-digit', minute: '2-digit' };
    opt.timeZone = 'Asia/Jakarta';
    var d_loc = loc_d.toLocaleDateString(['ban', 'id'],opt);
    var t_loc = loc_d.toLocaleTimeString(['ban', 'id'],opt_loc);


    function firebase_db() {
        var config = {
            apiKey: "AIzaSyBAjTnEfCIzhQUVxlm-gnCePCQGrlON6MY",
            authDomain: "hicnstuff.firebaseapp.com",
            databaseURL: "https://hicnstuff.firebaseio.com",
            projectId: "hicnstuff",
            storageBucket: "hicnstuff.appspot.com",
            messagingSenderId: "235934309697"
        };
        firebase.initializeApp(config);

        var ref = firebase.database().ref();
        var quill = new Quill('#editor', {
            modules: {
                toolbar: [
                    ['bold', 'italic', 'underline'],
                    ['link', 'blockquote', 'code-block', 'image'],
                    [{
                        list: 'ordered'
                    }, {
                        list: 'bullet'
                    }]
                ]
            },
            placeholder: 'Tulis ceritamu disini...',
            theme: 'bubble'
        });
        var guid_get = guid();

        $('#diary_ku').submit(function(event) {
            var lengthContentQuill = quill.getLength();
            if(lengthContentQuill > 4) {
            $('#on_button_submit').addClass("disabled");
            $.getJSON('//freegeoip.net/json/?callback=?', function(data) {
                ref.child("indo_telegraph").child(guid_get).set({
                    local_date: d_loc,
                    local_time: t_loc,
                    date: $.now(),
                    content: quill.getContents(),
                    ip: data.ip,
                    long: data.longitude,
                    lat: data.latitude,
                    kota: data.city
                });

            });
            localStorage.setItem("guid", guid_get);
            setTimeout(function() {
                $.ajax({
                    type: 'GET',
                    url: window.location.href,
                    data: {
                        'guid': localStorage.getItem("guid")
                    },
                    success: function(msg) {
                        $('#on_button_submit').addClass("disabled");
                    },
                    complete: function(event, xhr, settings) {
                        // display data
                        var u = this.url;
                        var get_guid = getUrlParameter('guid', u);
                        if (typeof get_guid != 'undefined') {
                            $('#form-container').remove();
                            ref.child("indo_telegraph").child(get_guid).on('value', function(snapshot) {
                                if (snapshot.val() !== null) {
                                    $('article#story_editor').append(clone_display_diary);
                                    var quill_display_diary = new Quill('#display_diary', {
                                        modules: {
                                            toolbar: false
                                        },
                                        readOnly: true,
                                        theme: 'bubble'
                                    });
                                    $('div.ql-container.ql-bubble').attr('style', 'border: none !important');
                                    $('div.ql-container.ql-bubble#display_diary .ql-editor').attr('style', 'padding-left:0;padding-right:0;');
                                    quill_display_diary.updateContents(snapshot.val().content);
                                    quill_display_diary.insertText(0, snapshot.val().local_date+' - '+snapshot.val().local_time+'\n\n', {
                                        'bold': true
                                    });
                                    window.history.replaceState(null, null, window.location.pathname + "?guid=" + get_guid);
                                } else {}
                            });
                        }
                        // eof display data
                    }

                });

                if ($.active !== 0) {
                    $('#form-container').hide();
                }

            }, 1500);

            
         } 
        if(lengthContentQuill <= 1) {
             Materialize.toast('loh kok masih kosongan -_-', 3000, 'rounded');
        }
        if(lengthContentQuill <= 4 && lengthContentQuill >= 2){
            Materialize.toast('Upss ceritamu terlalu pendek kawan ... ^-^', 3000, 'rounded');
        }//if length true
            event.preventDefault();
        }); // eof submit

        if ($.active === 0) {
            $('#form-container').show();
        }

        // display from hardcode url
        var get_guid_hard = getUrlParameterOnUse('guid');
        if (typeof get_guid_hard != 'undefined') {
            $('#form-container').remove();
            ref.child("indo_telegraph").child(get_guid_hard).on('value', function(snapshot) {
                if (snapshot.val() !== null) {
                    $('article#story_editor').append(clone_display_diary);
                    var quill_display_diary = new Quill('#display_diary', {
                        modules: {
                            toolbar: false
                        },
                        readOnly: true,
                        theme: 'bubble'
                    });
                    $('div.ql-container.ql-bubble').attr('style', 'border: none !important');
                    $('div.ql-container.ql-bubble#display_diary .ql-editor').attr('style', 'padding-left:0;padding-right:0;');
                    quill_display_diary.updateContents(snapshot.val().content);
                    quill_display_diary.insertText(0, snapshot.val().local_date+' - '+snapshot.val().local_time+'\n\n', {
                        'bold': true
                    });
                } else {}
            });
        }
        // eof display from hardcode url
    }

    $(document).ready(function() {
        Materialize.updateTextFields();
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

        if(check_diary_on !== 0){
            firebase_db();
        }
    });
})(jQuery);