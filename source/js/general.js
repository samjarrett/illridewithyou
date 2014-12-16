$(function() {
	$("a[href^='http']").on('click', function(e) {
		e.preventDefault();
		var url = $(this).attr('href');
		ga('send', 'event', 'Outbound Link', 'click', url, {
			'hitCallback': function () {
				document.location = url;
			}
		});
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

	window.fbAsyncInit = function () {
		FB.Event.subscribe('edge.create', function (targetUrl) {
			ga('send', 'social', 'facebook', 'like', targetUrl);
		});
		FB.Event.subscribe('edge.remove', function (targetUrl) {
			ga('send', 'social', 'facebook', 'unlike', targetUrl);
		});
		FB.Event.subscribe('message.send', function (targetUrl) {
			ga('send', 'social', 'facebook', 'send', targetUrl);
		});
	};

	function extractParamFromUri(uri, paramName) {
		if (!uri) {
			return;
		}
		var regex = new RegExp('[\\?&#]' + paramName + '=([^&#]*)');
		var params = regex.exec(uri);
		if (params != null) {
			return unescape(params[1]);
		}
		return;
	}

	twttr.ready(function (twttr) {
		twttr.events.bind('tweet', function (intent_event) {
			if (intent_event) {
				var opt_pagePath;
				if (intent_event.target && intent_event.target.nodeName == 'IFRAME') {
					opt_target = extractParamFromUri(intent_event.target.src, 'url');
				}
				ga('send', 'social', 'twitter', 'tweet', opt_pagePath);
			}
		});
	});
});
