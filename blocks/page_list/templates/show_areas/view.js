$(document).ready(function() {
  $('.obfuscated').mousedown(function(){alert("Copy disabled for this email to confuse spam-bots. Please type email address in by hand")});
  $(".ccm-page-list-header a").click(function(){ $("ul",$(this).parent().parent()).slideToggle(); var text=$(this).text(); 
  $(this).text(text == '+ ' ? '- ' : '+ '); });
});

