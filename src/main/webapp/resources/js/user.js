function updateAsocSurveyZones() {
  let groups = $('#user_asoc_survey_zones').val();
  let id = $('#surveyZones').val();

  $.ajax({
    type: "POST",
    url: `api/surveyResponse/asocSurveyZones/${id}`,
    data: JSON.stringify(groups),
    contentType: "application/json; charset=utf-8",
    success: function (response) {
      swalGeneral("", "Modificările au fost salvate cu succes!", "success");
    },
    error: function () {
      swalGeneral("", "A apărut o problemă!", "error")
    }
  });
}

// function updateUserRoles(id) {
//   let roles = $('#user_roles').val();
//   $.ajax({
//     type: "POST",
//     url: `api/users/${id}/roles`,
//     data: roles,
//     dataType: "json",
//     cache: false,
//     success: function (response) {
//       swalGeneral("", "Drepturile au fost actualizate!", "success");
//     },
//     error: function () {
//       swalGeneral("", "A aparut o problemă!", "error")
//     }
//   });
// }

function creatOrUpdateUser() {
  const obj = {
    idsGroups: [],
    idsRoles: [],
    idType: 1
  };

  $('.new-user-data').each(function (i, e) {
    let $input = $(this);
    var checkType = $input.attr("type");
    switch (checkType) {
      case 'radio':
        obj[$(e).data('key')] = $(e).is(':checked') ? 1 : 0;
        break;
      default:
        obj[$(e).data('key')] = $(e).val();
        break;
    }
  })

  if (validateForm('add_user')) {

    $.ajax({
      type: "POST",
      url: "api/users",
      data: obj,
      contentType: "application/json; charset=utf-8",
      dataType: 'JSON',
      success: (response) => {
        //swalGeneral('', 'Salvarea a fost realizată cu succes!', 'success', '');
        toastGeneral('Salvarea a fost realizată cu succes!', 'success')
        closeModal('#modal_add_user');
        viewUser(false, response, false);
      },
      error: function (xhr, ajaxOptions, response) {
        // swalGeneral('Atenție',
        //     xhr.responseJSON.message || 'A apărut o problemă!',
        //     'warning',)

        toastGeneral(xhr.responseJSON.message || 'A apărut o problemă!', 'error')
        focusOnIncorrectField();
      }
    })
  }
}

$(document).on('input', '#pass2, #pass1', function () {
  let pass1 = $('#pass1').val();
  let pass2 = $(this).val();
  let pass2Label = $('.target-for-msg');
  const msg = '<span class="notification-pass">&nbsp;- Parola nu coincide</span>';

  if (pass1 === '' || pass2 === '') {
    pass2Label.find('.notification-pass').hide();
  } else if (pass1 !== pass2) {
    if (pass2Label.find('.notification-pass').length === 0) {
      pass2Label.append(msg);
    }
    pass2Label.find('.notification-pass').show();
  } else {
    pass2Label.find('.notification-pass').hide();
  }
})

function changePassword(id_user, email) {
  var pass0 = $("#pass0").val();
  var pass1 = $("#pass1").val();
  var pass2 = $("#pass2").val();
  var mail = email;
  // if (pass0 == '' || pass1 == '' || pass2 == '') {
  //   swalGeneral("Completați toate câmpurile!", "", "warning");
  // } else if (pass1 !== pass2) {
  //   swalGeneral("Parola nouă nu coincide!", "", "error");
  //   $('#pass1').val("");
  //   $('#pass2').val("");
  // } else {
  if (validateForm('changePassForm')) {
    $.ajax({
      type: "POST",
      url: `api/users/${id_user}/password`,
      contentType: "application/json; charset=utf-8",
      dataType: 'JSON',
      data: {
        oldPassword: pass0,
        newPassword: pass1
      },
      success: function (response1) {
        // swalGeneral("", "Parola schimbată cu succes!", "success")
        toastGeneral("Parolă modificată cu succes!", "success");
        $('#modalChangePass').modal('hide');
      },
      error: function (xhr, ajaxOptions, thrownError) {
        swalGeneral("", xhr.responseText, "error")
      }
    });
  }
  //}

}

function creatOrUpdateGroup() {
  const obj = {};

  $('.new-group-data').each(function (i, e) {
    let $input = $(this);
    var checkType = $input.attr("type");
    switch (checkType) {
      case 'radio':
        obj[$(e).data('key')] = $(e).is(':checked') ? 1 : 0;
        break;
      default:
        obj[$(e).data('key')] = $(e).val();
        break;
    }
  })

  if (validateForm('formContUpload')) {

    $.ajax({
      type: "POST",
      url: "api/groups",
      data: obj,
      contentType: "application/json; charset=utf-8",
      dataType: 'JSON',
      success: (response) => {
        let uats = $('#group_uats').val();
        $.ajax({
          type: "POST",
          url: `api/groups/${response}/uats`,
          data: JSON.stringify(uats),
          contentType: "application/json; charset=utf-8",
          success: (response) => {
            toastGeneral('Salvarea a fost realizată cu succes!', 'success');
            // swalGeneral('', 'Salvarea a fost realizată cu success', 'success', '');
            viewAllGroups();
          },
          error: () => {
            toastGeneral('Salvarea nu a putut fi realizată!', 'error');
            // swalGeneral('', 'Salvarea nu a putut fi realizată', 'error', '');
          }
        })
      }
    })
  }
}


function creatOrUpdateUAT() {
  const obj = {
    idRegion: app.defJud,
    active: 1
  };
  $('[data-key]').each(function (i, e) {
    let $input = $(this);
    var checkType = $input.attr("type");
    switch (checkType) {
      case 'radio':
        obj[$(e).data('key')] = $(e).is(':checked') ? 1 : 0;
        break;
      default:
        obj[$(e).data('key')] = $(e).val();
        break;
    }
  })

  $.ajax({
    type: "POST",
    url: "api/uats",
    data: obj,
    contentType: "application/json; charset=utf-8",
    dataType: 'JSON',
    success: (response) => {
      closeModal('#modal_add_uat');
      viewAllUats();
    }
  })
}
