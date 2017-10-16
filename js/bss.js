$('document').click(function() {
  $('body').css('display', 'none');
  $('body').fadeIn(500);
});

$('.click-to-fade').click(function fadeAway() {
  $('body').fadeOut(500);
});

$('.status-enabled').click(function() {
  $(this).removeClass('status-enabled');
  $(this).addClass('status-disabled');
});
$('.status-disabled').click(function() {
  $(this).removeClass('status-disabled');
  $(this).addClass('status-enabled');
});

// enable popovers
$(function() {
  $('[data-toggle="popover"]').popover();
});

