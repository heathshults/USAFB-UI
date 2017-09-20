// inject site components
$(document).ready(function () {
    $('#headtags-01').load('./components/headtags.html')
    $('#head-nav-01').load('./components/header.html')
    $('#footer-nav-01').load('./components/footer.html')
})
// ScrollReveal - snazy flashy stuff
window.sr = ScrollReveal();
sr.reveal('.foo');
sr.reveal('.bar');
