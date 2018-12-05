const localeAPIUrl = 'http://' + window.location.hostname + ':5002/api/Locale/';
const LocaleService = {
	getLocales: () => {
		return fetch(localeAPIUrl)
			.then(response => {
				return response.json();
			})
	},
	saveLocale: locale => {
		return fetch(localeAPIUrl,
			{
				headers: {
					'Accept': 'application/json',
					'Content-Type': 'application/json'
				},
				method: 'POST',
				body: JSON.stringify(locale)
			})
			.then(response => {
				return response.json();
			})
	},
	removeLocale: locale => {
		return fetch(localeAPIUrl + locale,
			{
				headers: {
					'Accept': 'application/json',
					'Content-Type': 'application/json'
				},
				method: 'DELETE'
			});
	}
}

export default LocaleService;
