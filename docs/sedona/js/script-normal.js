var button = document.querySelector(".hotel-search-btn");

var popup = document.querySelector(".hotel-search-form");

button.addEventListener("click", function (evt) {
	evt.preventDefault();
	popup.classList.add("popup-show");				
});

window.addEventListener("keydown",function(evt){
	if (evt.keyCode === 27) {
		if (popup.classList.contains("popup-show")) {
			popup.classList.remove("popup-show");
		}
	}
});