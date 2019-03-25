var JSCCommon = {
	// часть вызов скриптов здесь, для использования при AJX
	LazyFunction: function () {
		// Для лэзи загрузки 

		document.addEventListener("DOMContentLoaded", function () {
			let lazyImages = [].slice.call(document.querySelectorAll("img.lazy"));
			let active = false;

			const lazyLoad = function () {
				if (active === false) {
					active = true;

					setTimeout(function () {
						lazyImages.forEach(function (lazyImage) {
							if (((lazyImage.getBoundingClientRect().top  - lazyImage.parentElement.clientHeight * 2)<= window.innerHeight && (lazyImage.getBoundingClientRect().bottom + lazyImage.parentElement.clientHeight * 2) >= 0) && getComputedStyle(lazyImage).display !== "none") {
								lazyImage.src = lazyImage.dataset.src;
								// lazyImage.srcset = lazyImage.dataset.srcset;
								lazyImage.classList.remove("lazy");

								lazyImages = lazyImages.filter(function (image) {
									return image !== lazyImage;
								});

								if (lazyImages.length === 0) {
									document.removeEventListener("scroll", lazyLoad);
									window.removeEventListener("resize", lazyLoad);
									window.removeEventListener("orientationchange", lazyLoad);
									window.addEventListener("DOMContentLoaded", lazyLoad);
								}
							}
						});

						active = false;
					}, 200);
				}
			};

			document.addEventListener("scroll", lazyLoad);
			window.addEventListener("resize", lazyLoad);
			window.addEventListener("orientationchange", lazyLoad);
			window.addEventListener("DOMContentLoaded", lazyLoad);
		});


		// лэзи 
		document.addEventListener("DOMContentLoaded", function () {
			let lazyImages = [].slice.call(document.querySelectorAll(".lazy-bg"));
			let active = false;

			const lazyLoad = function () {
				if (active === false) {
					active = true;

					setTimeout(function () {
						lazyImages.forEach(function (lazyImage) {
							if (((lazyImage.getBoundingClientRect().top - lazyImage.parentElement.clientHeight ) <= window.innerHeight && (lazyImage.getBoundingClientRect().bottom + lazyImage.parentElement.clientHeight) >= 0) && getComputedStyle(lazyImage).display !== "none") {
								lazyImage.parentElement.style.backgroundImage = 'url(' + lazyImage.dataset.src + ')';
								lazyImage.src = lazyImage.dataset.src;
								// lazyImage.srcset = lazyImage.dataset.srcset;
								lazyImage.classList.remove("lazy");

								lazyImages = lazyImages.filter(function (image) {
									return image !== lazyImage;
								});

								if (lazyImages.length === 0) {
									document.removeEventListener("scroll", lazyLoad);
									window.removeEventListener("resize", lazyLoad);
									window.removeEventListener("orientationchange", lazyLoad);
									window.addEventListener("DOMContentLoaded", lazyLoad);
								}
							}
						});

						active = false;
					}, 200);
				}
			};

			document.addEventListener("scroll", lazyLoad);
			window.addEventListener("resize", lazyLoad);
			window.addEventListener("orientationchange", lazyLoad);
			window.addEventListener("DOMContentLoaded", lazyLoad);
		});

	},



	magnificPopupCall: function () {
		$('.popup-with-move-anim').magnificPopup({
			type: 'inline',

			fixedContentPos: true,
			fixedBgPos: true,

			overflowY: 'auto',

			closeBtnInside: true,
			preloader: false,

			midClick: true,
			removalDelay: 300,
			mainClass: 'my-mfp-zoom-in',
			tClose: 'Закрыть (Esc)',
		});

		// / modal window

		// modal галерея
		$(".gal").each(function () {

			$(this).find("a").magnificPopup({
				type: 'image',
				closeOnContentClick: false,
				closeBtnInside: false,
				mainClass: 'mfp-with-zoom mfp-img-mobile',
				tClose: 'Закрыть (Esc)',
				image: {
					verticalFit: true,
					// titleSrc: function(item) {
					//   return item.el.attr('title') + ' &middot; <a class="image-source-link" href="'+item.el.attr('data-source')+'" target="_blank">image source</a>';
					// }
				},
				gallery: {
					enabled: true
				}
			});
		})
		// /modal галерея
	},

	mobileMenu: function () {
		// закрыть/открыть мобильное меню
		var toggMnu = $(".toggle-menu-mobile--js").click(function () {

			$(".toggle-menu-mobile--js").toggleClass("on");
			// $("body").toggleClass("fixed");
			$(".menu-mobile--js").toggleClass("active");
			$("body, html").toggleClass("fixed");
			return false;
		});
		$('.menu-mobile--js ul li a').on('click', function () {
			$(".menu-mobile--js .toggle-mnu").click();
		});
		$(document).mouseup(function (e) {
			var container = $(".menu-mobile--js.active");
			if (container.has(e.target).length === 0) {
				$(".toggle-menu-mobile--js").removeClass("on");
				// $("body").toggleClass("fixed");
				$(".menu-mobile--js").removeClass("active");
				$("body, html").removeClass("fixed");
			}
		});
		// закрыть меню при горизонтальном свайпе
		$('.menu-mobile--js.active').swipe({
			swipe: function (event, direction, distance, duration, fingerCount, fingerData) {
				if (direction == 'left') {
					$(".toggle-menu-mobile--js").removeClass("on");
					$(".menu-mobile--js.active").removeClass("active");
					$("body, html").removeClass("fixed");
				}
				if (direction == 'right') {
					$(".toggle-menu-mobile--js").removeClass("on");
					$(".menu-mobile--js.active").removeClass("active");
					$("body, html").removeClass("fixed");
				}
			},
			triggerOnTouchEnd: false,
		});
	},


	// табы  . 
	tabscostume: function (tab) {
		$('.' + tab + '__caption').on('click', '.' + tab + '__btn:not(.active)', function (e) {
			$(this)
				.addClass('active').siblings().removeClass('active')
				.closest('.' + tab).find('.' + tab + '__content').hide().removeClass('active')
				.eq($(this).index()).fadeIn().addClass('active');

		});
	},


	

	inlineSVG: function () {
		//Replace all SVG images with inline SVG
		$('img.img-svg').each(function () {
			var $img = $(this);
			var imgClass = $img.attr('class');
			var imgURL = $img.attr('src');

			$.get(imgURL, function (data) {
				// Get the SVG tag, ignore the rest
				var $svg = $(data).find('svg');

				// Add replaced image's classes to the new SVG
				if (typeof imgClass !== 'undefined') {
					$svg = $svg.attr('class', imgClass + ' replaced-svg');
				}

				// Remove any invalid XML tags as per http://validator.w3.org
				$svg = $svg.removeAttr('xmlns:a');

				// Check if the viewport is set, if the viewport is not set the SVG wont't scale.
				if (!$svg.attr('viewBox') && $svg.attr('height') && $svg.attr('width')) {
					$svg.attr('viewBox', '0 0 ' + $svg.attr('height') + ' ' + $svg.attr('width'))
				}


				// Replace image with new SVG
				$img.replaceWith($svg);

			}, 'xml');

		});
	},

	CustomInputFile: function CustomInputFile() {
		var file = $(".add-file input[type=file]");
		file.change(function () {
			var filename = $(this).val().replace(/.*\\/, "");
			var name = $(".add-file__filename  ");
			name.text(filename);

		});
	},

	CustomYoutubeBlock: function () {
		$(".pretty-embed__bg").each(function () {
			// загрузка фона видео
			$(this).css("background-image", 'url(http://img.youtube.com/vi/' + $(this).data("src") + '/0.jpg)')
			// включение видео при клике по блоку
			$(this).click(function () {
				$(this).removeClass("on").next()
					.attr("src", 'https://www.youtube.com/embed/' + $(this).data("src") + '?autoplay=1').addClass("on");
			})
		})

	},

	inputMask: function () {
		// mask for input
		$('input[type="tel"]').attr("pattern", "[+]7[(][0-9]{3}[)][0-9]{3}-[0-9]{2}-[0-9]{2}").inputmask("+7(999)999-99-99");
	}

};

JSCCommon.LazyFunction();
/***/


jQuery(document).ready(function ($) {

		// для свг
		svg4everybody({});
		// Custom JS
	
		// вызов magnificPopupCall
		JSCCommon.magnificPopupCall();
	
		JSCCommon.tabscostume('tabs');
	
		JSCCommon.mobileMenu();
	
		JSCCommon.inputMask();
	
		// JSCCommon.inlineSVG();
	 

	function heightses() {

		var w = $(window).width();

		// $(".main-wrapper").css("margin-bottom", $('footer').height())
		// $(".otz__item .text-wrap ").height('auto').equalHeights();
		//


		// скрывает моб меню

		var topH = $("header ").innerHeight();

		$(window).scroll(function () {
			if ($(this).scrollTop() > topH) {
				$('.top-nav  ').addClass('fixed');
			} else {
				$('.top-nav  ').removeClass('fixed');
			}
		});
		// конец добавил
	}

	if (window.matchMedia("(min-width: 992px)").matches) {

		$(".toggle-menu-mobile--js").removeClass("on");
		// $("body").removeClass("fixed");
		$(".menu-mobile--js").removeClass("active");
		$("body").removeClass("fixed");
	}


	$(window).resize(function () {
		heightses();

	});
	$(window).on("load", function () {
		heightses();

	})

	heightses();


	var icon = '<svg width="11" height="14" viewBox="0 0 11 14" fill="none" xmlns="http://www.w3.org/2000/svg"> <path d="M1 13.2007L9 7.10034L1 1" stroke="#008DD2" stroke-width="2"/> </svg>';

	var arrl2 = (' <div class="r">' + icon),
		arrr2 = (' <div class="l">' + icon);

	
	var icon2 = '<svg width="13" height="24" viewBox="0 0 13 24" fill="none" xmlns="http://www.w3.org/2000/svg">\
	<path d="M1 23L12 12L1 0.999999" stroke="black"/>\
	</svg>\
	';

	var arrl3 = (' <div class="r">' + icon2),
		arrr3 = (' <div class="l">' + icon2);

	
	// карусель

	$('.header-block__slider--js').slick({
		slidesToShow: 1,
		slidesToScroll: 1,
		dots: true,
		speed: 600,
		infinite: true,
		// loop: true,
		arrows: false,
		adaptiveHeight: true,
		autoplay: true,
		autoplaySpeed: 5000,
	});

	$('.s-patner__slider--js').slick({
		slidesToShow: 1,
		slidesToScroll: 1,
		dots: false,
		speed: 600,
		infinite: false,
		loop: true,
		arrows: true,
		mobileFirst: true,
		// centerMode: true,
		// focusOnSelect: true ,
		// variableWidth: true,
		prevArrow: arrr2,
		nextArrow: arrl2,
		// normal options...
		infinite: false,

		// the magic
		responsive: [{

			breakpoint: 992,
			settings: {
				slidesToShow: 4,
				slidesToShow: 4,
				slidesToShow: 4,
			}

		}, {

			breakpoint: 768,
			settings: {
				slidesToShow: 3,
				slidesToShow: 3,
				slidesToShow: 3,
			},


		}, {

			breakpoint: 480,
			settings: {
				slidesToShow: 2,
				slidesToShow: 2,
				slidesToShow: 2,
			},


		}]
	});

	$('.s-sert__slider--js').slick({
		slidesToShow: 2,
		slidesToScroll: 1,
		dots: false,
		speed: 600,
		infinite: false,
		loop: true,
		arrows: true,
		mobileFirst: true,
		// centerMode: true,
		// focusOnSelect: true ,
		// variableWidth: true,
		prevArrow: arrr2,
		nextArrow: arrl2,
		// normal options...
		infinite: false,

		// the magic
		responsive: [{

			breakpoint: 992,
			settings: {
				slidesToShow: 4, 
			}

		}, {

			breakpoint: 768,
			settings: {
				slidesToShow: 3, 
			},


		}]
	});

	// слайдеры в карточке
	$(' .s-card-head__slider-big').slick({
		slidesToShow: 1,
		slidesToScroll: 1,
		dots: false,
		speed: 450,
		asNavFor: '.s-card-head__slider-small',
		infinite: false,
		// loop: false,
		arrows: false,
		// prevArrow: arrl2,
		// nextArrow: arrr2,

	});
	$('.s-card-head__slider-small').slick({
		slidesToShow: 4,
		slidesToScroll: 1,
		dots: false,
		speed: 450,
		infinite: false,
		// loop: false,
		arrows: false,
		vertical: true,
		verticalSwiping: true,
		// centerMode: true,

		focusOnSelect: true,
		asNavFor: '.s-card-head__slider-big',

	});


	// /слайдеры в карточке


	// слайдер в модалке
	$(' .modal-object__slider-big').slick({
		slidesToShow: 1,
		slidesToScroll: 1,
		dots: false,
		speed: 450,
		asNavFor: '.modal-object__slider-small',
		infinite: true,
		// loop: false,
		arrows: false,
		// prevArrow: arrl2,
		// nextArrow: arrr2,

	});
	$('.modal-object__slider-small').slick({
		slidesToShow: 3,
		slidesToScroll: 1,
		dots: false,
		speed: 450,
		infinite: true,
		// loop: false,
		arrows: true, 
		focusOnSelect: true,
		asNavFor: '.modal-object__slider-big',
		prevArrow: arrr3,
		nextArrow: arrl3,
		focusOnSelect: true,
		mobileFirst: true,

		// the magic
		responsive: [
			{

			breakpoint: 1200,
			settings: {
				slidesToShow: 7, 
			}

		}, 
		
			{

			breakpoint: 992,
			settings: {
				slidesToShow: 6, 
			}

		}, 

		{

			breakpoint: 768,
			settings: {
				slidesToShow: 5, 
			},


		},
		
		{

			breakpoint: 576,
			settings: {
				slidesToShow: 4, 
			},


		},

	]

	});
	
	$( 	'.s-sert__slider--js,' +
			' .modal-object__slider-big , ' +
			' .modal-object__slider-small  ' )
			.on('lazyLoaded', function (event, slick, image, imageSource) {
			image.parent().css('background-image', 'url(' + image.attr('src') + ')');
		});
		
		// слайдер в модалке
		$('.s-objects__img-wrap').click(function () {
			$('.modal-object__slider-small, .modal-object__slider-big').slick('refresh');
			
		}) 

});