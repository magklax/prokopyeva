var btn = document.querySelector(".modal-btn");
			
var popup = document.querySelector(".modal");	
var close = popup.querySelector(".modal-close");

var form = popup.querySelector("form");
var username = popup.querySelector("[name=user-name]"); 
var email = popup.querySelector("[name=user-email]");
var letter = popup.querySelector("[name=user-letter]");

var storage_name = localStorage.getItem("user-name");
var storage_email = localStorage.getItem("user-email");
			
btn.addEventListener("click", function (evt) {
	evt.preventDefault();
	popup.classList.add("modal-show");
	if (storage_name) {
		username.value = storage_name;
		if (storage_email) {
			email.value = storage_email;
			letter.focus();
		} else {
			email.focus();
		}
	}	else {
		username.focus();
	}	
});	

close.addEventListener("click", function (evt) {
	evt.preventDefault();
	popup.classList.remove("modal-show");
	popup.classList.remove("modal-error");
});

form.addEventListener("submit", function (evt) {
	if (!username.value || !email.value || !letter.value) {
		evt.preventDefault();
		popup.classList.remove("modal-error");
		popup.offsetWidth = popup.offsetWidth;
		popup.classList.add("modal-error");
	} else {
		localStorage.setItem("user-name", username.value);
		localStorage.setItem("user-email", email.value);
	}
});

window.addEventListener("keydown", function(evt) {
	if (evt.keyCode === 27) {
		if (popup.classList.contains("modal-show")) {
			popup.classList.remove("modal-show");
			popup.classList.remove("modal-error");
		}
	}
});