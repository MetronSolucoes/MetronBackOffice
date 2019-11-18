<template>
    <div>
        <md-table v-model="bookings" >
            <md-table-row slot="md-table-row" slot-scope="{ item }">
                <md-table-cell md-label="Nome">{{ item.customer_name + ' ' + item.customer_last_name}}</md-table-cell>
                <md-table-cell md-label="Serviço">{{ item.service_name }}</md-table-cell>
                <md-table-cell md-label="Status">{{ item.scheduling_scheduling_status_name }}</md-table-cell>
                <md-table-cell md-label="Início">{{ item.scheduling_start|toDatetime }}</md-table-cell>
                <md-table-cell md-label="Término">{{ item.scheduling_finish|toDatetime }}</md-table-cell>
                <md-table-cell md-label="Cancelar">
                    <md-button v-on:click="cancelBookings(item.id, $event)" class="md-icon-button md-accent">
                        <md-icon>block</md-icon>
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
		getBookings,
		cancelBooking
    } from '@/controllers/bookings';

	export default {
		name: "simple-table-booking",
//		props: {
//			tableHeaderColor: {
//				type: String,
//				default: ""
//			},
//			q: {
//				type: String,
//                default: ''
//            },
//            bus
//
//		},
        props: ['bus', 'q'],
		filters: {
			toDatetime: function (date) {
				return moment(date).utc(false).format('DD/MM/YYYY HH:mm');
			},
			capitalize: function (value) {
				if (!value) return '';
				value = value.toString();
				return value.charAt(0).toUpperCase() + value.slice(1)
			},
            formatPhoneNumber: function(phoneNumberString) {
                let cleaned = ('' + phoneNumberString).replace(/\D/g, '');
                let match = cleaned.match(/^(\d{2})(\d{5})(\d{4})$/);
                if (match) {
                    return '(' + match[1] + ') ' + match[2] + '-' + match[3]
                }
				let match2 = cleaned.match(/^(\d{2})(\d{4})(\d{4})$/);
				if (match2) {
					return '(' + match2[1] + ') ' + match2[2] + '-' + match2[3]
				}

                return phoneNumberString;
            },
			formatCpf: function(cpf) {
				let cleaned = ('' + cpf).replace(/\D/g, '');
				let match = cleaned.match(/^(\d{3})(\d{3})(\d{3})(\d{2})$/);
				if (match) {
					return match[1] + '.' + match[2] + '.' + match[3] + '-' + match[4]
				}

				return cpf;
			}
		},
        methods: {
			cancelBookings(id, event) {
				event.stopPropagation();

				this.$swal({
					title: 'Cancelar agendamento?',
					text: "Esta operação é irreverssível",
					type: 'warning',
					showCancelButton: true,
					confirmButtonColor: '#3085d6',
					cancelButtonColor: '#d33',
					confirmButtonText: 'Sim, cancelar!',
					cancelButtonText: 'Fechar'
				}).then((result) => {
					if (result.value) {
						cancelBooking(id)
							.then((res) => {
								if (res && res.status === 200) {
									this.loadBookings();
								}
							})
					}
				})
            },
			loadBookings() {
				getBookings((this.q) ? {"q[customer_name_cont]": this.q} : null)
					.then((data) => {
						this.bookings = data;
					});
            }
        },
		created: function() {
			this.bus.$on('filterCustomer', this.loadBookings);
		},
		data() {
			return {
				selected: [],
				bookings: []
			};
		},
		mounted () {
			this.loadBookings();
		}
	};
</script>
