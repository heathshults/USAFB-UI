(function ($) {

$('document').click(() => {
  $('body').css('display', 'none')
  $('body').fadeIn(500)
})

$('.click-to-fade').click(() => {
  $('body').fadeOut(500)
})

$('.status-enabled').click(function () {
  $(this).removeClass('status-enabled')
  $(this).addClass('status-disabled')
})
$('.status-disabled').click(function () {
  $(this).removeClass('status-disabled')
  $(this).addClass('status-enabled')
})

// enable popovers
$(() => {
  $('[data-toggle="popover"]').popover()
})


}(jQuery))
