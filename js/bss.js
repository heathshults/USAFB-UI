// include in pages
$(document).ready(function () {
  if ($('#headtags-01').length) {
    $('#headtags-01').load('./components/headtags.html');
  }
  if ($('#head-nav-01').length) {
    $('#head-nav-01').load('./components/header.html');
  }
  if ($('#footer-nav-01').length) {
    $('#footer-nav-01').load('./components/footer.html');
  }
});
