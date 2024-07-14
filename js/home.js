
function isSmartPhone() {
	if (navigator.userAgent.match(/iPhone|Android.+Mobile/)) {
		return true;
	} else {
		return false;
	}
}

function convertTextToHTML(text) {
	let html = '';
	let currentTag = '';
	let mobileFlag = false;
	
	const lines = text.split('\n');
	for (let line of lines) {
		if (line.trim() === '') {
			continue;
		}
		if (currentTag == "li") {
			if (!(line.startsWith("- "))) {
				html += '</ul>';
				currentTag = '';
			}
		} else if (currentTag == "table") {
			if (!(line.startsWith("| "))) {
				if (mobileFlag == false) {
					html += '</table>';
				} else {
					html += '</ul>';
				}
				currentTag = '';
			}
		}
		if (line.startsWith('# ')) {
			html += `<h1>${line.slice(2)}</h1>`;
			currentTag = "h1";
		} else if (line.startsWith('## ')) {
			html += `<h2>${line.slice(3)}</h2>`;
			currentTag = "h2";
		} else if (line.startsWith('### ')) {
			html += `<h3>${line.slice(4)}</h3>`;
			currentTag = "h3";
		} else if (line.startsWith("- ")) {
			if (currentTag == "li") {
				html += `<li>${line.slice(2)}</li>`;
			} else {
				html += `<ul><li>${line.slice(2)}</li>`;
			}
			currentTag = "li";
		} else if (line.startsWith("| ")) {
			if (mobileFlag == false) {
				if (currentTag == "table") {
					html += `<tr><td>${line.slice(2).split(", ")[0]}</td><td>${line.slice(2).split(", ")[1]}</td></tr>`;
				} else {
					html += `<table><tr><td>${line.slice(2).split(", ")[0]}</td><td>${line.slice(2).split(", ")[1]}</td></tr>`;
				}
			} else {
				if (currentTag == "table") {
					html += `<li>${line.slice(2).split(", ")[0]} ${line.slice(2).split(", ")[1]}</li>`;
				} else {
					html += `<ul><li>${line.slice(2).split(", ")[0]} ${line.slice(2).split(", ")[1]}</li>`;
				}
			}
			currentTag = "table";
		} else {
			html += '<div>' + line + '</div>';
		}
	}
	return html;
}