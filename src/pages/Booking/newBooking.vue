<template>
    <div class="p-3">
        <form>
            <md-card>
                <md-card-header :data-background-color="'green'">
                    <h4 class="title">Criar Agendamento</h4>
                    <p class="category">Informações</p>
                </md-card-header>

                <md-card-content>
                    <div class="md-layout">
                        <div class="md-layout-item md-small-size-100 md-size-50 position-relative">
                            <md-field>
                                <md-select v-model="booking.customer_id"  placeholder="Cliente">
                                    <md-option v-for="item in customers" :key="item.id" :value="item.id">
                                        {{item.name}}  {{item.last_name}}
                                    </md-option>
                                </md-select>
                            </md-field>

                        </div>
                        <div class="md-layout-item md-small-size-100 md-size-50 position-relative">
                            <md-field>
                                <md-select v-model="booking.service_id"  placeholder="Serviço">
                                    <md-option v-for="service in services" :key="service.id" :value="service.id">
                                        {{service.name}}
                                    </md-option>
                                </md-select>
                            </md-field>
                        </div>
                        <div class="md-layout-item md-small-size-100 md-size-50 position-relative">
                            <md-field>
                                <label>Início (dd/mm/yyyy HH:mm)</label>
                                <md-input v-model="booking.start" type="text"></md-input>
                            </md-field>
                        </div>
                        <div class="md-layout-item md-small-size-100 md-size-50 position-relative">
                            <md-field>
                                <label>Término (dd/mm/yyyy HH:mm)</label>
                                <md-input v-model="booking.finish" type="text"></md-input>
                            </md-field>
                        </div>
                        <div class="md-layout-item md-size-100 text-right">
                            <md-button v-on:click="saveBooking(booking)" class="md-raised md-success">Salvar</md-button>
                        </div>
                    </div>
                </md-card-content>
            </md-card>
        </form>
    </div>
</template>

<style>
    .text-red {
        position: absolute;
        bottom: -20px;
        color: red;
    }
    .md-field.md-theme-default:before {
        background-color: #2196f3 !important;
    }
</style>

<script>
	import {
		getCustomers
	} from '@/controllers/customers';
	import {
		getServices
	} from '@/controllers/services';
	import {
		createBooking
	} from '@/controllers/bookings';
	import { required, minLength, email } from 'vuelidate/lib/validators';

	export default {
		name: "edit-booking-form",
		props: {
		},
		data() {
			return {
				disabled: null,
				booking: {
					id: null,
					customer_id: null,
					service_id: null,
					scheduling_status_id: 2,
					start: null,
					finish: null
				},
                customers: [],
				services: [],
				errors: []

			};
		},
		validations: {
			booking: {
				customer_id: { required },
				service_id: { required },
				start: { required },
				finish: { required }
			}
		},
		methods: {
			saveBooking(user) {
				this.$v.booking.$touch();
				if (!this.$v.$invalid) {
					this.errors = [];
					createBooking(user)
                        .then((res) => {
                            if (res && res.status === 201) {
                                this.moveToBookings();
                            }

                        }, (error) => {
                            this.errors = error.errors;
                            this.$swal({
                                title: '<strong>Ops!</strong>',
                                type: 'error',
                                html: this.parseErrors(error.errors),
                                showCloseButton: true,
                                showCancelButton: false,
                                focusConfirm: false,
                                confirmButtonText: 'Ok'
                            });
                        });
                }

			},
            parseErrors(errors) {
				let keys = Object.keys(errors);
				let content = '<div>';

				keys.forEach((e) => {
					if (errors && errors[e]) {
						errors[e].forEach((error) => {
							content += '<p>' + error + '</p>';
                        })
                    }
                });

				content += '</div>';
                return content;
            },
			moveToBookings() {
				this.$router.push({name: 'Agendamentos'})
			}
		},
		mounted() {getServices
			getCustomers(null)
                .then((res) => {
					if (res) {
						this.customers = res;
					}
                });
			getServices(null)
				.then((res) => {
					if (res) {
						this.services = res;
					}
				})
		}
	};
</script>
<style></style>
