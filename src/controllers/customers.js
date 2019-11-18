import axios from 'axios';

export function getCustomers(params) {

	return axios.get('/customers', (params) ? {params: params} : '')
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

export function getCustomerById(id) {
	return axios.get('/customers/' + id)
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

export function createCustomer(data) {
	return axios.post('/customers', data)
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

export function updateCustomer(user) {
	return axios.put('/customers/' + user.id, user)
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

export function deleteCustomer(id) {
	return axios.delete('/customers/' + id)
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

