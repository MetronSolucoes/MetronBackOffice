import axios from 'axios';

export function getBookings(params) {

	return axios.get('/schedulings/index/not_canceleds', (params) ? {params: params} : '')
		.then(function (response) {
			// handle success
			if (response) {
				return response.data;
			}
		})
		.catch(function (error) {
			// handle error
			console.log(error);
		})
		.finally(function () {
			// always executed
		});
}

export function createBooking(data) {
	return axios.post('/schedulings', data)
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

export function cancelBooking(id) {
	return axios.put('/schedulings/cancel/' + id)
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

