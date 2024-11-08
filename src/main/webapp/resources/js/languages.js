var langSend = "";
try {
  var langSend = localStorage.getItem("languageIndexPage").toUpperCase();
} catch (err) {
  langSend = "RO";
}
//var langSend=sessionStorage.getItem("languageIndexPage").toUpperCase();
//alert(langSend);

if (langSend != null) {
  //alert("limba o fi: " +langSend.toUpperCase());
  $('#lang_id').attr("data-lang", langSend.toLowerCase())
  $('#lang_id').text(langSend.toUpperCase());
  changeLang(langSend, $('#lang_id'));
  localStorage.removeItem("languageIndexPage");
  //sessionStorage.removeItem("languageIndexPage");
}

function changeLang(lang, ctrl) {

  $('#lang_id').text($(ctrl).text());
  $('#lang_id').data('lang', $(ctrl).data('lang'));
  $.ajax({
    type: "GET",
    url: app.contextPath + "/main/getLanguageContent",
    data: {
      language: lang,
      pages: ""
    },
    success: function (responseLanguage) {

      $('.lang-change').each(function () {
//	        	
        switch ($(this).prop('nodeName').toLowerCase()) {
          case 'span':
          case 'div':
          case 'button':
            $(this).text(responseLanguage[$(this).data('lang-id')]);
            break;
          case 'input':
            var type = $(this).attr('type').toLowerCase();
            if (type == 'button' && type == 'submit' && type == 'reset') {
              $(this).val(responseLanguage[$(this).data('lang-id')]);
            } else {
              $(this).attr("placeholder", responseLanguage[$(this).data('lang-id')]);
            }
            break;
          default:
            $(this).text(responseLanguage[$(this).data('lang-id')]);
            break;
        }
      });

    }
  });
}

