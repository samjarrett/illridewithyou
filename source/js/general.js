$(function() {
	$("a[href^='http']").attr('target', '_blank').on('click', function() {
		ga('send', 'event', 'Outbound Link', 'click', $(this).attr('href'));
	});
	$("a[href^='mailto:']").on('click', function() {
		ga('send', 'event', 'Mailto Link', 'click', $(this).attr('href'));
	});
	$("a[href^='tel:']").on('click', function() {
		ga('send', 'event', 'Tel Link', 'click', $(this).attr('href'));
	});

	$(window).on('resize', function() {
		var $container = $('.container'),
			windowHeight = $(window).height(),
			containerHeight = $container.height();

		if (windowHeight > containerHeight) {
			$container.css({'margin-top': ((windowHeight - containerHeight) / 2 - 20) + 'px'});
		} else {
			$container.css({'margin-top': '1.5em'});
		}
	}).trigger('resize');
});