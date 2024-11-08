function getAllLanguages() {
  $.ajax({
    type: "GET",
    url: app.contextPath + "/language/getAllLanguages",
    success: function (responseLanguages) {
      $.each(responseLanguages, function (k, v) {
        console.log("key: " + k + "; Value: " + v);
      });
    }
  });
}