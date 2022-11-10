const lastText = localStorage.getItem('last-translation');

function escapeNewEnglishWords(text) {
	const regexp = /\{(.*?)\}/g;
	return text.replaceAll(regexp, '');
}

function showTranslatedText(text) {
	document.querySelector('#translated-text').textContent = text;
}

if (!lastText) {
	fetch('https://api.funtranslations.com/translate/oldenglish.json?text=\'Slipping through my fingers all the time\'')
		.then((res) => res.json())
		.then((text) => {
			showTranslatedText(escapeNewEnglishWords(text.contents.translated));
			localStorage.setItem('last-translation', text.contents.translated);
		});
} else {
	showTranslatedText(escapeNewEnglishWords(lastText));
}
