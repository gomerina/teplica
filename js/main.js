// Меняем положение кнопки в разметке на адаптиве. Главная страница первый экран
function setLink () {
	$('.main-block__text').find('.link-btn__box').appendTo('.main-block');
}
function res (){
	if (window.innerWidth < 1024) {
		setLink();
	}
	else {
		$('.main-block').find('.link-btn__box').appendTo('.main-block__text');
	}	
}
// Меняем положение кнопки Есть вопрос на 769px в шапке
function setBtn () {
	$('.header-inner').find('.menu__link.dealer').appendTo('.header__menu');
}
function resBtn (){
	if (window.innerWidth < 769) {
		setBtn();
	}
	else {
		$('.header__menu').find('.menu__link.dealer').appendTo('.header-inner');
	}	
}
resBtn();
res();
window.addEventListener("resize", function() {
	if (window.innerWidth < 1024) {
		setLink();
	}
	else {
		$('.main-block').find('.link-btn__box').appendTo('.main-block__text');
		$('.header__menu').removeClass('active');
		$('.header__burger').removeClass('active');
		$('html').css('overflow','hidden auto');
	}
	if (window.innerWidth <= 769) {
		resBtn();
	}
	else {
		$('.header__menu').find('.menu__link.dealer').appendTo('.header-inner');
	}
});
// Маска на телефон
var inputsTel = document.querySelectorAll('input[type="tel"]');
Inputmask({
	"mask": "+7 (999)999-99-99",
	showMaskOnHover: false
}).mask(inputsTel);

// Открыть адаптивное меню
$('.header__burger').click(function(){
	$('.header__menu').toggleClass('active');
	$('.header__burger').toggleClass('active');
	// Блокируем прокрутку страницы при открытии меню
	if ($('.header__menu').hasClass('active')) {
		$('html').css('overflow','hidden')
	} else {
		$('html').css('overflow','hidden auto')
	}
});
// Открыть навигационные элементы в каталоге
$('.aside__link.current').click(function(e){
	e.preventDefault();
	$('.aside__link').toggleClass('active');
	$('.aside-chevron').toggleClass('rotated');
});
// Открыть модальное окно с формой
$('#header-form__btn').click(function(e){
	e.preventDefault();
	$('.modal-form').addClass('open');
	$('.overlay').addClass('active');
});
$('#main-modal__btn').click(function(e){
	e.preventDefault();
	$('.modal-form').addClass('open');
	$('.overlay').addClass('active');
})
// Закрыть модальное окно с формой
$('.close-modal').click(function(){
	$('.modal-form').removeClass('open');
	$('.overlay').removeClass('active');
})
// Слайдеры на мобилках
// const sliders = document.getElementsByClassName('.products');
// var mobileSwiper;
// for (var i = 0; i < sliders.length; i++) {
// 	initSliders(sliders[i]);
// }
// // function initSliders(slider) {
// // 	if (window.innerWidth <= 769 && sliders.dataset.mobile == 'false'){
// // 		mobileSwiper = new Swiper(sliders, {
// // 			slidesPerGroup: 1,
// // 			loop: false,
// // 			spaceBetween: 20,
// // 			dragabble: false,
// // 			breakpoints: {
// // 				320: {
// // 					slidesPerView: 1,
// // 				},
// // 				375: {
// // 					slidesPerView: 2.5,
// // 				},
// // 			},
// // 		});
// // 		sliders.dataset.mobile = 'true';
// // 	}
// // 	if (window.innerWidth > 769) {
// // 		sliders.dataset.mobile = 'false';
// // 		if (sliders.classList.contains('swiper-container-initialized')){
// // 			mobileSwiper.destroy();
// // 		}
// // 	}
// // }	
// // initSliders();
// // window.addEventListener('resize', () => {
// // 	initSliders();
// // });


// -------------------------------------------
// Products lisener
$('.products').on('click', function (e) {
	var t = e.target;
	var p = $(t).parents('.product');
		// Длина
		if ($(t).hasClass('cl-i')) { 
			var c = $(t).text();
			$(t).parent().children('.cl-i').removeClass('active');
			$(t).addClass('active');
			prodCalc(p);
			btnReload();
			return;
		}
		// Изменить кнопку в дефолт
		function btnReload(){
			var btn = $(p).find('.add');
			if ( $(btn).hasClass('added') ) {
				$(btn).removeClass('added').text('В корзину'); 
			}
		}
		return;
	});

// equipment calculation
function prodCalc(p) {
	var price 	= $(p).find('.pc-amount');						// Объект с ценой
	var meters	= $(p).find('.cl-i.active').text(); 			// Выбранный метраж							
	var pCost	= $(p).find('.p-cost'); 						// Блок с ценой							
	var base	= baseCalc(); 									// Стоимость базы
	//var light	= extracter('light',':checked');				// Стоимость базы
	var option	= extracter('option',':checked');				// Чекнутая опция
	var total	= totaler();									// Финальная стоимость
	var oldP 	= $(p).find('.old-o-cost');						// Старая цена
	var salePercent = $(p).attr('data-sale'); 					// Извлекаем процент
	// Извлечение варианта 
	function extracter(str,check) {
		var str = 'data-' + str;								// Формируем имя атрибута
		var obj = $(p).find('[' + str + ']' + check);			// Извлекаем строку со значениями
		if (obj.is(':empty') || obj.is('div') ) {				// Не пусто-лй объект или дивный
			obj = cutter( obj.attr(str) );						// Отправляем строку в нарезку
		} else {
			obj = 0;
		}
		function cutter(s) {
			s = s.split(meters + '=')[1]; 						// Отрезаем до условия
			s = s.split(' ')[0]; 								// Отрезаем после условия
			return s;
		}
		return +obj;
	}
	// Получаем стоимость базы
	function baseCalc() {
		var b	= $(p).attr('data-start'); 						// Базовая стоимость
		var m 	= extracter('base','');							// Получаем значение по длинне
		return 	+b + +m;										// Суммируем с базовой стоимостью и отдаем
		
	}
	// Финальная стоимость
	function totaler() {
		//var t = base 	- light;					// Вычитаем из базы процент облегченки
		var	t = base + option;					// Плюсуем процент за опцию
		return t;
	}
	// Привлечем внимание
	function priceAttentionP() {
		$(pCost).addClass('c-attention-p');							// Добавляем анимацию
		setTimeout(function () {
			$(pCost).removeClass('c-attention-p');	
		}, 100);
	}
	
	function priceAttentionM() {
		$(pCost).addClass('c-attention-m');							// Добавляем анимацию
		setTimeout(function () {
			$(pCost).removeClass('c-attention-m');	
		}, 100);
	}
	
	var cPrice	= $(price).text();								// Текущая цена
		cPrice 	= cPrice.replace(/\s+/g, '');					// Удалить пробел из строки
		cPrice	= +cPrice;
		
	var nPrice 	= Math.round(total);							// Новая цена

	if (cPrice !== nPrice ) {				// Больше ноля
		
		var step = 10;							// Количество шагов
		var speed = 30;
		// В зависимости от разницы новой / старой цены, убавляем количество шагов для последующего прибавления в анимации, дополнительно анимируем CSS
		var aPrice = null; // Переменная, которая участвует в анимации
		if ( cPrice > nPrice  ) {
			aPrice = nPrice + step - 1;
			priceAttentionM();
		} 
		if ( cPrice < nPrice  ) {
			aPrice = nPrice - step + 1;
			priceAttentionP();
		}
		// В каждой итерации увеличиваем на единицу, пока не достингем числа шагов.
		(function loop(i) {
			setTimeout(function () {
				if ( cPrice > nPrice ) {		// Разнице больше ноля
					$(price).text( number_format(aPrice, 0, '.', ' ') );
					aPrice = --aPrice;
				};
				
				if ( cPrice < nPrice ) {		// Разнице меньше ноля
					$(price).text( number_format(aPrice, 0, '.', ' ') );
					aPrice = ++aPrice;
				};

				if (--i) loop(i);
				
				speed = +speed + 15;
			}, +speed );
		})( step );
	}

	setTimeout(function () {
		substituter(oldP, salePercent);  // Считаем старую цену и подставляем
	}, 1000);

}


// Beautifulizer of numbers
function number_format(number, decimals, dec_point, thousands_sep) {
	number = (number + '').replace(/[^0-9+\-Ee.]/g, '');
	var n = !isFinite(+number) ? 0 : +number,
	prec = !isFinite(+decimals) ? 0 : Math.abs(decimals),
	sep = (typeof thousands_sep === 'undefined') ? ',' : thousands_sep,
	dec = (typeof dec_point === 'undefined') ? '.' : dec_point,
	s = '',
	toFixedFix = function(n, prec) {
		var k = Math.pow(10, prec);
		return '' + (Math.round(n * k) / k)
		.toFixed(prec);
	};
  // Fix for IE parseFloat(0.55).toFixed(0) = 0;
  s = (prec ? toFixedFix(n, prec) : '' + Math.round(n))
  .split('.');
  if (s[0].length > 3) {
  	s[0] = s[0].replace(/\B(?=(?:\d{3})+(?!\d))/g, sep);
  }
  if ((s[1] || '')
  	.length < prec) {
  	s[1] = s[1] || '';
  s[1] += new Array(prec - s[1].length + 1)
  .join('0');
}
return s.join(dec);
}

// Substituter old price
function substituter(element, percent) {
	var currentPrice = $(element).next('.p-cost').find('.pc-amount').text(); // выберем стоимость
	currentPrice = currentPrice.replace(/\s+/g, ''); // удалим пробелы

	var percent = (currentPrice / 100) * percent; // Найдем процент от суммы
	var oldPrice = +currentPrice + +percent; // Сумируем старую сумму и процент

	$(element).find('.old-pc-amount').text( number_format(oldPrice, 0, '.', ' ') ); // Делаем красиво и подставляем
}

// Substituter for all produts
(function(){
	$('.product[data-sale]').each(function(indx, element){
		var salePercent = $(element).attr('data-sale');  // Извлекаем процент
		var oldP 		= $(element).find('.old-o-cost');// Старая цена
		
		substituter(oldP, salePercent);
	});
})();