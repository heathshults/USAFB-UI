(function ($) {
  const time500 = 500

  $('.click-to-fade').click(() => {
    $(this).fadeOut(time500)
  })

  // enable popovers
  $(() => {
    $('[data-toggle="popover"]').popover({
      container: 'body'
    })
  })

  if ($('#s-o').hasClass('search-overlay-shrink')) {
    return
  } else {
    $('div.bss.dropdown-menu').css('z-index', '2000') && $('.bss .nav-link').css('z-index', '2000')
  }

  }(jQuery))
