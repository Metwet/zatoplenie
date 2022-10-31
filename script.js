console.log(new Date());


// header

var header = document.querySelector('header');
var lastScroll = 0;
var defaultOffset = 200;
var scrollPosition = () => window.pageYOffset;
var containHide = () => header.classList.contains('hide');

addEventListener("scroll", function() {
	if (scrollPosition() < 900) {
	    header.style.position = 'absolute';
	    header.style.background = ('rgba(25, 38, 57, 0)');
	} else if (scrollPosition() > 900) {
		header.style.position = 'fixed';
	}
	if (scrollPosition() > lastScroll && !containHide() && scrollPosition() > defaultOffset){
 	   header.classList.add('hide');
	} else if (scrollPosition() < lastScroll && containHide()) {
	    header.style.background = ('rgba(25, 38, 57, 0.61)');
    	header.classList.remove('hide');
    }
    lastScroll = scrollPosition();
});

// slider old (yes, it is bad)

var offset = 0;
var sliderLine = document.querySelector('.cases-line');

document.querySelector('.right-arrow').addEventListener('click', function(){
	if (sliderLine.offsetWidth == 1340){
		offset += 340;
		if(offset >= 1360){
			offset = 0;
		}
	} else {
		offset += 595;
		if(offset >= 1785){
			offset = 0;
		}
	}
	sliderLine.style.left = -offset + 'px';
});

document.querySelector('.left-arrow').addEventListener('click', function(){
	if (sliderLine.offsetWidth == 1340){
		offset -= 340;
		if(offset < 0){
			offset = 1020;
		}
	} else {
		offset -= 595;
		if(offset < 0){
			offset = 1190;
		}
	}
	sliderLine.style.left = -offset + 'px';
});



// new clider

/*var offset = 0,
	sliderLine = document.querySelector('.cases-line'),
	caseTitle = document.querySelectorAll('.case-title'),
	casePerson = document.querySelectorAll('.case-person'),
	caseText = document.querySelectorAll('.case-text');
	numberOfCase = 0;

var moveRight = function(){
	offset += 595;
	if(offset >= 1785){
		//работает заебись
		createNewOldCase(numberOfCase);
		++numberOfCase;
		if (numberOfCase > 3) {
			numberOfCase = 0;
		}
		console.log(numberOfCase);
	}
	sliderLine.style.left = -offset + 'px';
}

var moveLeft = function(){
	offset -= 595;
	if(offset < 0){
		//нихуя не работает сучка
		createNewOldCase(numberOfCase);
	}
	sliderLine.style.left = -offset + 'px';
}

var createNewOldCase = function(numberOfCase){
	let newCase = document.createElement("div"),
		newCaseTitle = document.createElement("div"),
		newCasePerson = document.createElement("div"),
		newCaseText = document.createElement("div");
	
	newCase.classList.add('case');
	newCaseTitle.classList.add('case-title');
	newCasePerson.classList.add('case-person');
	newCaseText.classList.add('case-text');

	if(offset >= 1785) {
		sliderLine.appendChild(newCase);
	} else if (offset <= 0){
		console.log("in else");;
		sliderLine.insertBefore(newCase, sliderLine.children[0]);
	}
	
	newCaseTitle.innerHTML = caseTitle[numberOfCase].innerHTML;
	newCasePerson.innerHTML = casePerson[numberOfCase].innerHTML;
	newCaseText.innerHTML = caseText[numberOfCase].innerHTML;

	newCase.appendChild(newCaseTitle);
	newCase.appendChild(newCasePerson);
	newCase.appendChild(newCaseText);
}

document.querySelector('.right-arrow').addEventListener('click', moveRight);
document.querySelector('.left-arrow').addEventListener('click', moveLeft);
*/



// telephon-input & form handler

var onPhoneInput = function(e){
	let input = e.target,
		inputNumbersValue = getInputNumbersValue(input),
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
}

var onPhoneInputInForm = function(e){
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

var getInputNumbersValue = function(input){
	return input.value.replace(/\D/g, "");
}

var onPhoneKeyDown = function(e){
	let input = e.target;
	console.log(getInputNumbersValue(input).length);
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

var formAddError = function(input){
	//input.parentElement.classList.add("_error");
	input.classList.add("_error");
}

var formRemoveError = function(input){
	//input.parentElement.classList.remove("_error");
	input.classList.remove("_error");
}

function emailTest(input){
	return !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,8})+$/.test(input.value);
}


document.addEventListener("DOMContentLoaded", function(){
	var phoneInputs = document.querySelectorAll('input[data-tel-input]');
	for (var i = 0; i < phoneInputs.length; i++){
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
		console.log("in formSend");
		e.preventDefault();
		let error = formValidata(form);

		let formData = new FormData(form);
		if (error === 0) {
			//второй вариант
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
		    //первый вариант
			/*let response = await fetch('sendmail.php', {
				method: 'POST',
				body: formData
			});
			if(response.ok) {
				let result = await response.json();
				alert(result.message);
				form.reset();
				form.classList.remove('_sending');
			} else {
				alert("Error, blet");
				form.classList.remove('_sending');
			}*/
		} else {
			/*alert('Заполни форму как следует please');*/
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