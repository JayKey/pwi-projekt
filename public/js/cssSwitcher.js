var light = true;

if(getCookie("css")) {
	var css = getCookie("css");
	document.getElementById('css').href="css/"+css+".css";
	setCookie("css", css);
	if(css == "light") {
		light = true;
	} else {
		light = false;
	}
} else {
	setCookie("css", "light");
	light = true;
}

function switchCSS() {
	console.log(light);
	if(light) {
		console.log("dark");
		document.getElementById('css').href="css/dark.css";
		setCookie("css", "dark");
		light = false;
	} else {
		console.log("light");
		document.getElementById('css').href="css/light.css";
		setCookie("css", "light");
		light = true;
	}
}