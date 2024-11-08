function addPvCollect() {
  var collect = {};
  // let new_data = moment($("#dataInserareCollect").val(), 'YYYY-MM-DD HH:mm:ss SSS').format('DD.MM.YYYY HH:mm');

  $('#pvForm [data-key]').each(function () {
    collect[$(this).data("key")] = $(this).data().value || $(this).val();
  })
  // collect.insertedAt = new_data;
  if (validateForm("pvForm")) {
    $.ajax({
      type: "POST",
      url: "api/collect/pv",
      data: JSON.stringify(collect),
      contentType: "application/json; charset=utf-8",
      success: function (response) {
        toastGeneral('Salvarea a fost realizată cu succes!', 'success');
        $("#modal_add_pv").modal('hide');
      }
    })
  }
}

$(document).on('show.bs.modal', '#modal_add_pv', function (e) {
  $('#modal_add_pv [data-key="idUat"]').val($('#uatSelect').val());
});
$(document).on('hidden.bs.modal', '#modal_add_pv', function (e) {
  $('#modal_add_pv [data-key]').val('');
});