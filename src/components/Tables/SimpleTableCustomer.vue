<template>
    <div>
        <md-table v-model="customers" :table-header-color="tableHeaderColor">
            <md-table-row v-on:click="editUser(item.id)" slot="md-table-row" slot-scope="{ item }">
                <md-table-cell md-label="Nome">{{ item.name + ' ' + item.last_name}}</md-table-cell>
                <md-table-cell md-label="Contato">{{ item.phone }}</md-table-cell>
                <md-table-cell md-label="Email">{{ item.email }}</md-table-cell>
                <md-table-cell md-label="CPF">{{ item.cpf }}</md-table-cell>
                <md-table-cell md-label="Remover"></md-table-cell>
            </md-table-row>
        </md-table>
    </div>
</template>

<script>
	import moment from 'moment';
	import {
		getCustomers
    } from '@/controllers/customers';

	export default {
		name: "simple-table-customer",
		props: {
			tableHeaderColor: {
				type: String,
				default: ""
			}
		},
		filters: {
			toDatetime: function (date) {
				return moment(Number(date)).format('HH:mm');
			},
			capitalize: function (value) {
				if (!value) return '';
				value = value.toString();
				return value.charAt(0).toUpperCase() + value.slice(1)
			}
		},
        methods: {
			editUser(id) {
				this.$route.push({ name: 'Atualizar Cliente', params: { id: id }})
            }
        },
		data() {
			return {
				selected: [],
				customers: [],
			};
		},
		mounted () {
			getCustomers()
                .then((data) => {
                	this.customers = data;
                });
		}
	};
</script>
