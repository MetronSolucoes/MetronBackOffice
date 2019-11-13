import axios from 'axios';

export function getCompany() {
	return axios.get('/companies')
		.then(function (response) {
			// handle success
			return response;
		})
		.catch(function (error) {
			// handle error
		})
		.finally(function () {
			// always executed
	});
}

export function updateCompany(data) {
	return axios.put('/companies', data)
		.then(function (response) {
			// handle success
			return response;
		})
		.catch(function (error) {
			// handle error
			return Promise.reject(error.response.data);
		})
		.finally(function () {
			// always executed
		});
}
