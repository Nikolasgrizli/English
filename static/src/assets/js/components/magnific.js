jQuery(function ($) {
	$(function () {
		$('.js-scalable').magnificPopup({
			type: 'image',
			mainClass: 'mfp-with-zoom',
			zoom: {
				enabled: true,
				duration: 300,
				easing: 'ease-in-out',
				opener: function (openerElement) {
					// openerElement is the element on which popup was initialized, in this case its <a> tag
					// you don't need to add "opener" option if this code matches your needs, it's defailt one.
					return openerElement.is('img') ? openerElement : openerElement.find('img');
				}
			}
		});
		$('.js-scalable').append('<div class="scalable-icon__wrapper"><svg class="scalable-icon"><use xlink:href="#zoom-in"></use></svg></div>')

	});

});
