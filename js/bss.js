(function ($) {
  const var500 = 500

  $('.click-to-fade').click(() => {
    $(this).fadeOut(var500)
  })

  // enable popovers
  $(() => {
    $('[data-toggle="popover"]').popover()
  })

  }(jQuery))
