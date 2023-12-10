// header

const header = document.querySelector('header');
let lastScroll = 0;
const defaultOffset = 200;
const scrollPosition = () => window.pageYOffset;
const containHide = () => header.classList.contains('hide');

addEventListener("scroll", function() {
	if (scrollPosition() < 900) {
	    header.style.position = 'absolute';
	    header.style.background = ('rgba(25, 38, 57, 0)');
	} else if (scrollPosition() > 900) {
		header.style.position = 'fixed';
	}
	if (scrollPosition() > lastScroll && !containHide() && scrollPosition() > defaultOffset){
 	   header.classList.add('hide');
		closeMenu();
	} else if (scrollPosition() < lastScroll && containHide()) {
	    header.style.background = ('#0C202F');
    	header.classList.remove('hide');
    }
    lastScroll = scrollPosition();
});

//burger
const menuBurger = document.querySelector('.burger_menu');
const menuBurgerImg = document.querySelector('.burger img');
let statusMenu = true;
const menuLinkMini = document.querySelectorAll(".menu_link_mini");

function openMenu() {
	menuBurgerImg.src = "./img/krest.svg";
	menuBurger.style.display = "block";
	statusMenu = false;
}

function closeMenu(){
	menuBurgerImg.src = "./img/burger.svg";
	menuBurger.style.display = "none";
	statusMenu = true;
}

document.querySelector('.burger').addEventListener('click', function(){
	(statusMenu == true)?openMenu():closeMenu();
});

for (let i = 0; i < menuLinkMini.length; i++) {
	const linkMenu = menuLinkMini[i];
	linkMenu.addEventListener('click', function(){
		closeMenu();
	});
}


// slider old

let offset = 0;
const sliderLine = document.querySelector('.cases-line');
const moveValue = sliderLine.offsetWidth;

document.querySelector('.right-arrow').addEventListener('click', function(){
	if (moveValue == 2060 || moveValue == 1340){
		offset += (moveValue+20)/4;
		if(offset >= moveValue+20){
			offset = 0;
		}
	} else {
		offset += (moveValue+20)/4;
		if(offset >= (moveValue+20)*3/4){
			offset = 0;
		}
	}
	sliderLine.style.left = -offset + 'px';
});

document.querySelector('.left-arrow').addEventListener('click', function(){
	if (moveValue == 2060 || moveValue == 1340){
		offset -= (moveValue+20)/4;
		if(offset < 0){
			offset = (moveValue+20)*3/4;
		}
	} else {
		offset -= (moveValue+20)/4;
		if(offset < 0){
			offset = (moveValue+20)/2;
		}
	}
	sliderLine.style.left = -offset + 'px';
});

// telephon-input & form handler

const onPhoneInput = function(e){
	let input = e.target,
		inputNumbersValue = getInputNumbersValue(input),
		inForm = document.querySelectorAll('input[data-tel-input]'),
		formattedInputValue = "";
	if(!inputNumbersValue){
		return input.value = "";
	}
	if(["7", "8"].indexOf(inputNumbersValue[0]) > -1){
		formattedInputValue += "(" + inputNumbersValue.substring(1,4);
	} else {
		formattedInputValue += "(" + inputNumbersValue.substring(0,3);
	}
	if(inputNumbersValue.length >= 4){
		formattedInputValue += ") " + inputNumbersValue.substring(3,6);;
	}
	if(inputNumbersValue.length >= 7){
		formattedInputValue += " " + inputNumbersValue.substring(6,8);;
	}
	if(inputNumbersValue.length >= 9){
		formattedInputValue += "-" + inputNumbersValue.substring(8,10);;
	}
	input.value = formattedInputValue;
	if (input.value.length == 15) {
		inForm[2].value = "+7 " + formattedInputValue;
	}
}

const onPhoneInputInForm = function(e){
	let input = e.target,
		inputNumbersValue = getInputNumbersValue(input),
		formattedInputValue = "";
	if(!inputNumbersValue){
		return input.value = "";
	}
	if(["7", "8", "9"].indexOf(inputNumbersValue[0]) > -1){
		if(inputNumbersValue[0]=="9"){
			inputNumbersValue = "7" + inputNumbersValue;
		}
		let firstSymbol = (inputNumbersValue[0] == "8") ? "8" : "+7";
		formattedInputValue =  firstSymbol + " ";
		if(inputNumbersValue > 1){
			formattedInputValue += "(" + inputNumbersValue.substring(1,4);
		}
		if(inputNumbersValue.length >= 5){
			formattedInputValue += ") " + inputNumbersValue.substring(4,7);;
		}
		if(inputNumbersValue.length >= 8){
			formattedInputValue += "-" + inputNumbersValue.substring(7,9);;
		}
		if(inputNumbersValue.length >= 10){
			formattedInputValue += "-" + inputNumbersValue.substring(9,11);;
		}
	} else {
		formattedInputValue = "+" + inputNumbersValue.substring(0, 16);
	}
	input.value = formattedInputValue;
}

const getInputNumbersValue = function(input){
	return input.value.replace(/\D/g, "");
}

const onPhoneKeyDown = function(e){
	let input = e.target;
	if(e.keyCode == 8 && getInputNumbersValue(input).length == 1){
		input.value = "";
	}
}


function formValidata(form){
	let error = 0;
	let formReq = document.querySelectorAll("._req");
	for (let index = 0; index < formReq.length; index++) {
		const input = formReq[index];
		formRemoveError(input);

		if(input.classList.contains('_email')){
			if(emailTest(input)){
				formAddError(input);
				error++;
			}
		} else if (input.getAttribute("type") === "checkbox" && input.checked === false) {
			formAddError(input);
			error++;
		} else{
			if (input.value === "") {
				formAddError(input);
				error++;
			}
		}
	}
	return error;
}

const formAddError = function(input){
	//input.parentElement.classList.add("_error");
	input.classList.add("_error");
}

const formRemoveError = function(input){
	//input.parentElement.classList.remove("_error");
	input.classList.remove("_error");
}

function emailTest(input){
	return !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,8})+$/.test(input.value);
}


document.addEventListener("DOMContentLoaded", function(){
	const phoneInputs = document.querySelectorAll('input[data-tel-input]');
	for (let i = 0; i < phoneInputs.length; i++){
		let input = phoneInputs[i];
		if(i>1){
			input.addEventListener("input", onPhoneInputInForm);
		} else {
			input.addEventListener("input", onPhoneInput);
		}
		input.addEventListener("keydown", onPhoneKeyDown);
	}

	// form handler
	const form = document.querySelector('.form');
	form.addEventListener("submit", formSend);

	async function formSend(e){
		e.preventDefault();
		let error = formValidata(form);

		let formData = new FormData(form);
		if (error === 0) {
			form.classList.add('_sending');
			let xhr = new XMLHttpRequest();

   			xhr.onreadystatechange = function () {
      			if (xhr.readyState === 4) {
        			if (xhr.status === 200) {
          				console.log('Отправлено');
          				swal("Данные успешно отправлены!", "Наш юрист свяжется с вами в ближайшее время", "success");
        			}
      			}
			}
			xhr.open('POST', 'sendmail.php', true);
			xhr.send(formData);

			form.reset();
		    form.classList.remove('_sending');
		} else {
			swal({
			  title: "Ошибка отправки!",
			  text: "Заполните обязательные поля и дайте согласие на обработку персональных данных для отправки данных",
			  icon: "error",
			  button: "Закрыть"
			})
		}
	}

});

//-------------team slider-----------------

let slider = document.querySelector('.slider'),
	sliderList = slider.querySelector('.slider-list'),
	sliderTrack = slider.querySelector('.slider-track'),
	slides = slider.querySelectorAll('.slide'),
	arrows = slider.querySelector('.slider-arrows'),
	prev = arrows.children[0],
	next = arrows.children[1],
	slideWidth = slides[0].offsetWidth,
	slideIndex = 0,
	posInit = 0,
	posX1 = 0,
	posX2 = 0,
	posY1 = 0,
	posY2 = 0,
	posFinal = 0,
	isSwipe = false,
	isScroll = false,
	allowSwipe = true,
	transition = true,
	nextTrf = 0,
	prevTrf = 0,
	lastTrf = --slides.length * slideWidth,
	posThreshold = slides[0].offsetWidth * 0.35,
	trfRegExp = /([-0-9.]+(?=px))/,
	getEvent = function() {
		return (event.type.search('touch') !== -1) ? event.touches[0] : event;
	},
	slide = function() {
		if (transition) {
			sliderTrack.style.transition = 'transform .5s';
		}
		sliderTrack.style.transform = `translate3d(-${slideIndex * slideWidth}px, 0px, 0px)`;

		prev.classList.toggle('disabled', slideIndex === 0);
		next.classList.toggle('disabled', slideIndex === --slides.length);
	},
	swipeStart = function() {
		let evt = getEvent();

		if (allowSwipe) {

			transition = true;

			nextTrf = (slideIndex + 1) * -slideWidth;
			prevTrf = (slideIndex - 1) * -slideWidth;

			posInit = posX1 = evt.clientX;
			posY1 = evt.clientY;

			sliderTrack.style.transition = '';

			document.addEventListener('touchmove', swipeAction);
			document.addEventListener('mousemove', swipeAction);
			document.addEventListener('touchend', swipeEnd);
			document.addEventListener('mouseup', swipeEnd);

			sliderList.classList.remove('grab');
			sliderList.classList.add('grabbing');
		}
	},
	swipeAction = function() {

		let evt = getEvent(),
			style = sliderTrack.style.transform,
			transform = +style.match(trfRegExp)[0];

		posX2 = posX1 - evt.clientX;
		posX1 = evt.clientX;

		posY2 = posY1 - evt.clientY;
		posY1 = evt.clientY;

		// определение действия свайп или скролл
		if (!isSwipe && !isScroll) {
			let posY = Math.abs(posY2);
			if (posY > 7 || posX2 === 0) {
				isScroll = true;
				allowSwipe = false;
			} else if (posY < 7) {
				isSwipe = true;
			}
		}

		if (isSwipe) {
			// запрет ухода влево на первом слайде
			if (slideIndex === 0) {
				if (posInit < posX1) {
					setTransform(transform, 0);
					return;
				} else {
					allowSwipe = true;
				}
			}

			// запрет ухода вправо на последнем слайде
			if (slideIndex === --slides.length) {
				if (posInit > posX1) {
					setTransform(transform, lastTrf);
					return;
				} else {
					allowSwipe = true;
				}
			}

			// запрет протаскивания дальше одного слайда
			if (posInit > posX1 && transform < nextTrf || posInit < posX1 && transform > prevTrf) {
				reachEdge();
				return;
			}

			// двигаем слайд
			sliderTrack.style.transform = `translate3d(${transform - posX2}px, 0px, 0px)`;
		}

	},
	swipeEnd = function() {
		posFinal = posInit - posX1;

		isScroll = false;
		isSwipe = false;

		document.removeEventListener('touchmove', swipeAction);
		document.removeEventListener('mousemove', swipeAction);
		document.removeEventListener('touchend', swipeEnd);
		document.removeEventListener('mouseup', swipeEnd);

		sliderList.classList.add('grab');
		sliderList.classList.remove('grabbing');

		if (allowSwipe) {
			if (Math.abs(posFinal) > posThreshold) {
				if (posInit < posX1) {
					slideIndex--;
				} else if (posInit > posX1) {
					slideIndex++;
				}
			}

			if (posInit !== posX1) {
				allowSwipe = false;
				slide();
			} else {
				allowSwipe = true;
			}

		} else {
			allowSwipe = true;
		}

	},
	setTransform = function(transform, comapreTransform) {
		if (transform >= comapreTransform) {
			if (transform > comapreTransform) {
				sliderTrack.style.transform = `translate3d(${comapreTransform}px, 0px, 0px)`;
			}
		}
		allowSwipe = false;
	},
	reachEdge = function() {
		transition = false;
		swipeEnd();
		allowSwipe = true;
	};

sliderTrack.style.transform = 'translate3d(0px, 0px, 0px)';
sliderList.classList.add('grab');

sliderTrack.addEventListener('transitionend', () => allowSwipe = true);
slider.addEventListener('touchstart', swipeStart);
slider.addEventListener('mousedown', swipeStart);

arrows.addEventListener('click', function() {
	let target = event.target;

	if (target.classList.contains('next')) {
		slideIndex++;
	} else if (target.classList.contains('prev')) {
		slideIndex--;
	} else {
		return;
	}

	slide();
});