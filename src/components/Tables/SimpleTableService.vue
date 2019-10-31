<template>
    <div>
        <md-table v-model="services" :table-header-color="tableHeaderColor">
            <md-table-row v-on:click="editService(item.id)" slot="md-table-row" slot-scope="{ item }">
                <md-table-cell md-label="Nome">{{ item.name }}</md-table-cell>
                <md-table-cell md-label="Descrição">{{ item.description }}</md-table-cell>
                <md-table-cell md-label="Duração (min)">{{ item.duration }}</md-table-cell>
                <md-table-cell md-label="Remover"><md-button v-on:click="removeUser(item.id, $event)" class="md-icon-button md-accent"><md-icon>close</md-icon></md-button></md-table-cell>
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
		getServices,
		deleteService
	} from '@/controllers/services';

	export default {
		name: "simple-table-service",
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
			editService(id) {
				this.$router.push({ name: 'Atualizar Serviço', params: { id: id }})
			},
			removeUser(id, event) {
				event.stopPropagation();

				this.$swal({
					title: 'Deletar serviço?',
					text: "Esta operação é irreverssível",
					type: 'warning',
					showCancelButton: true,
					confirmButtonColor: '#3085d6',
					cancelButtonColor: '#d33',
					confirmButtonText: 'Sim, deletar!',
					cancelButtonText: 'Cancelar'
				}).then((result) => {
					if (result.value) {
						deleteService(id)
							.then((res) => {
								if (res && res.status === 204) {
									this.loadServices();
								}
							})
					}
				})
			},
			loadServices() {
				getServices()
					.then((data) => {
						this.services = data;
					});
			}
		},
		data() {
			return {
				selected: [],
				services: [],
			};
		},
		mounted () {
			this.loadServices();
		}
	};
</script>
