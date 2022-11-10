const lastText = localStorage.getItem('last-translation');

function format(text) {
	function escapeNewEnglishWords(text) {
		const regexp = /\{(.*?)\}/g;
		return text.replaceAll(regexp, '');
	}

	function capitalize(text) {
		return text[0].toUpperCase() + text.slice(1);
	}

	text = capitalize(escapeNewEnglishWords(text));
	return text;
}

function showTranslatedText(text) {
	document.querySelector('#translated-text').textContent = text;
}

if (!lastText) {
	fetch('https://api.funtranslations.com/translate/oldenglish.json?text=\'Slipping through my fingers all the time\'')
		.then((res) => res.json())
		.then((text) => {
			showTranslatedText(format(text.contents.translated));
			localStorage.setItem('last-translation', text.contents.translated);
		});
} else {
	showTranslatedText(format(lastText));
}
