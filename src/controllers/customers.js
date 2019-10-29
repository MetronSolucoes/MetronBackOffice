import axios from 'axios';

export function getCustomers() {
	return axios.get('/customers')
		.then(function (response) {
			// handle success
			console.log(response);
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
			console.log(response);
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
			console.log(response);
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

export function updateCustomer(id, data) {
	return axios.put('/customers/' + id, data)
		.then(function (response) {
			// handle success
			console.log(response);
		})
		.catch(function (error) {
			// handle error
			console.log(error);
		})
		.finally(function () {
			// always executed
		});
}

export function deleteCustomer(id) {
	return axios.delete('/customers/' + id)
		.then(function (response) {
			// handle success
			console.log(response);
		})
		.catch(function (error) {
			// handle error
			console.log(error);
		})
		.finally(function () {
			// always executed
		});
}

