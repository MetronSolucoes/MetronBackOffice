import axios from 'axios';

export function getServices() {
	return axios.get('/services')
		.then(function (response) {
			// handle success
			return response.data;
		})
		.catch(function (error) {
			// handle error
		})
		.finally(function () {
			// always executed
	});
}

export function getServiceById(id) {
	return axios.get('/services/' + id)
		.then(function (response) {
			// handle success
			return response;
		})
		.catch(function (error) {
			// handle error
			console.log(error);
		})
		.finally(function () {
			// always executed
		});
}

export function createService(data) {
	return axios.post('/services', data)
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

export function updateService(data) {
	return axios.put('/services/' + data.id, data)
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

export function deleteService(id) {
	return axios.delete('/services/' + id)
		.then(function (response) {
			// handle success
			return response;
		})
		.catch(function (error) {
			// handle error
			console.log(error);
		})
		.finally(function () {
			// always executed
		});
}