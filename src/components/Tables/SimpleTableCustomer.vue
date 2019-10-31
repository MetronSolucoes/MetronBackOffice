<template>
    <div>
        <md-table v-model="customers" :table-header-color="tableHeaderColor">
            <md-table-row slot="md-table-row" slot-scope="{ item }">
                <md-table-cell md-label="Nome">{{ item.name + ' ' + item.last_name}}</md-table-cell>
                <md-table-cell md-label="Contato">{{ item.phone }}</md-table-cell>
                <md-table-cell md-label="Email">{{ item.email }}</md-table-cell>
                <md-table-cell md-label="CPF">{{ item.cpf }}</md-table-cell>
                <md-table-cell md-label="Ações">
                    <md-button v-on:click="editUser(item.id)" class="md-icon-button md-info">
                        <md-icon>edit</md-icon>
                    </md-button>
                    <md-button v-on:click="removeUser(item.id, $event)" class="md-icon-button md-accent">
                        <md-icon>close</md-icon>
                    </md-button>
                </md-table-cell>
            </md-table-row>
        </md-table>
    </div>
</template>

<style>
    .md-button.md-theme-default.md-accent {
        background: #ff5252 !important;
    }
</style>

<script>
	import moment from 'moment';
	import {
		getCustomers,
		deleteCustomer
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
				this.$router.push({ name: 'Atualizar Cliente', params: { id: id }})
            },
			removeUser(id, event) {
				event.stopPropagation();

				this.$swal({
					title: 'Deletar usuário?',
					text: "Esta operação é irreverssível",
					type: 'warning',
					showCancelButton: true,
					confirmButtonColor: '#3085d6',
					cancelButtonColor: '#d33',
					confirmButtonText: 'Sim, deletar!',
					cancelButtonText: 'Cancelar'
				}).then((result) => {
					if (result.value) {
						deleteCustomer(id)
							.then((res) => {
								if (res && res.status === 204) {
									this.loadCustomers();
								}
							})
					}
				})
            },
            loadCustomers() {
				getCustomers()
					.then((data) => {
						this.customers = data;
					});
            }
        },
		data() {
			return {
				selected: [],
				customers: [],
			};
		},
		mounted () {
			this.loadCustomers();
		}
	};
</script>
