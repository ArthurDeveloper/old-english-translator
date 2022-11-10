const lastText = localStorage.getItem('last-text');
const lastTranslation = localStorage.getItem('last-translation');

function escapeNewEnglishWords(text) {
	const regexp = /\{(.*?)\}/g;
	return text.replaceAll(regexp, '');
}

function showTranslatedText(text) {
	document.querySelector('#old-english-text').value = text;
}

const formElement = document.querySelector('#translation-form');

formElement.addEventListener('submit', (e) => {
	e.preventDefault();

	const modernEnglishText = document.querySelector('#modern-english-text');

	if (lastText !== modernEnglishText) {
		fetch(`https://api.funtranslations.com/translate/oldenglish.json?text=${modernEnglishText.value}`)
			.then((res) => res.json())
			.then((text) => {
				showTranslatedText(escapeNewEnglishWords(text.contents.translated));
				
				localStorage.setItem('last-text', modernEnglishText);
				localStorage.setItem('last-translation', text.contents.translated);
			});
	} else {
		showTranslatedText(escapeNewEnglishWords(lastTranslation));
	}
});
