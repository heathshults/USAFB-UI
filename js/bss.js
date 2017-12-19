(function ($) {
  const time500 = 500

  $('.click-to-fade').click(() => {
    $(this).fadeOut(time500)
  })

  // enable popovers
  // $(() => {
  //   $('[data-toggle="popover"]').popover({
  //     container: 'body'
  //   })
  // })

  }(jQuery))
