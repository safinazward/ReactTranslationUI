const translationAPIUrl = 'http://' + window.location.hostname + ':5002/api/Translation/';
const customTranslationAPIUrl = 'http://' + window.location.hostname + ':5002/api/CustomTranslation/';
const TranslationService = {
	getTranslations: locale => {
		return fetch(translationAPIUrl + locale)
			.then(response => {
				return response.json();
			})
	},
	addTranslation: (locale, translation) => {
		return fetch(translationAPIUrl,
			{
				headers: {
					'Accept': 'application/json',
					'Content-Type': 'application/json'
				},
				method: 'POST',
				body: JSON.stringify({ locale: locale, key: translation.key, text: translation.text })
			})
			.then(response => {
				return response.json();
			})
	},
	updateTranslation: (locale, translationKey, translationText) => {
		let urlEncodedKey = encodeURIComponent(translationKey).replace(/\./g, '%2E');
		return fetch(translationAPIUrl + locale + '/' + urlEncodedKey,
			{
				headers: {
					'Accept': 'application/json',
					'Content-Type': 'application/json'
				},
				method: 'PUT',
				body: JSON.stringify({ text: translationText })
			})
			.then(response => {
				return response.json();
			})
	},
	removeTranslation: (locale, translationKey) => {
		let urlEncodedKey = encodeURIComponent(translationKey).replace(/\./g, '%2E');
		return fetch(translationAPIUrl + locale + '/' + urlEncodedKey, { method: 'DELETE' });
	},
	addCustomTranslation: (locale, tanslationKey, translationText) => {
		return fetch(customTranslationAPIUrl,
			{
				headers: {
					'Accept': 'application/json',
					'Content-Type': 'application/json'
				},
				method: 'POST',
				body: JSON.stringify({ locale: locale, key: tanslationKey, text: translationText })
			})
			.then(response => {
				return response.json();
			})
	},
	updateCustomTranslation: (locale, tanslationKey, translationText) => {
		let urlEncodedKey = encodeURIComponent(tanslationKey).replace(/\./g, '%2E');
		return fetch(customTranslationAPIUrl + locale + '/' + urlEncodedKey,
			{
				headers: {
					'Accept': 'application/json',
					'Content-Type': 'application/json'
				},
				method: 'PUT',
				body: JSON.stringify({ text: translationText })
			})
			.then(response => {
				return response.json();
			})
	},
	removeCustomTranslation: (locale, translationKey) => {
		let urlEncodedKey = encodeURIComponent(translationKey).replace(/\./g, '%2E');
		return fetch(customTranslationAPIUrl + locale + '/' + urlEncodedKey, { method: 'DELETE' })
	}
}

export default TranslationService;