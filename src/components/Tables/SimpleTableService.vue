<template>
    <div>
        <md-table v-model="services">
            <md-table-row slot="md-table-row" slot-scope="{ item }">
                <md-table-cell md-label="Nome">{{ item.name }}</md-table-cell>
                <md-table-cell md-label="Descrição">{{ item.description }}</md-table-cell>
                <md-table-cell md-label="Duração (min)">{{ item.duration }}</md-table-cell>
                <md-table-cell md-label="Ações">
                    <md-button v-on:click="editService(item.id)" class="md-icon-button md-info">
                        <md-icon>edit</md-icon>
                    </md-button>
                    <md-button v-on:click="removeService(item.id, $event)" class="md-icon-button md-accent">
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
    .md-field.md-theme-default:before {
        background-color: #2196f3 !important;
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
//		props: {
//			tableHeaderColor: {
//				type: String,
//				default: ""
//			}
//		},
		props: ['bus', 'q'],
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
			removeService(id, event) {
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
				getServices((this.q) ? {"q[name_cont]": this.q} : null)
					.then((data) => {
						this.services = data;
					});
			}
		},
		created: function() {
			this.bus.$on('filterService', this.loadServices);
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
