<template>
    <div class="p-3">
        <form>
            <md-card>
                <md-card-header :data-background-color="'green'">
                    <h4 class="title">Editar Usuário</h4>
                    <p class="category">Meu Perfil</p>
                </md-card-header>

                <md-card-content>
                    <div class="md-layout">
                        <div class="md-layout-item md-small-size-100 md-size-50 position-relative">
                            <md-field>
                                <label>Nome</label>
                                <md-input v-model="customer.name" type="text"></md-input>
                                <div class="text-sm mt-2 text-red" v-if="$v.$error">
                                    <div v-if="!$v.customer.name.required">Nome é obrigatório</div>
                                </div>
                            </md-field>

                        </div>
                        <div class="md-layout-item md-small-size-100 md-size-50 position-relative">
                            <md-field>
                                <label>Sobrenome</label>
                                <md-input v-model="customer.last_name" type="text"></md-input>
                                <div class="text-sm mt-2 text-red" v-if="$v.$error">
                                    <div v-if="!$v.customer.last_name.required">Sobrenome é obrigatório</div>
                                </div>
                            </md-field>
                        </div>
                        <div class="md-layout-item md-small-size-100 md-size-100 position-relative">
                            <md-field>
                                <label>Email</label>
                                <md-input v-model="customer.email" type="text"></md-input>
                                <div class="text-sm mt-2 text-red" v-if="$v.$error">
                                    <div v-if="!$v.customer.email.required">Email é obrigatório</div>
                                    <div v-if="!$v.customer.email.email">Email é inválido</div>
                                </div>
                            </md-field>
                        </div>
                        <div class="md-layout-item md-small-size-100 md-size-50 position-relative">
                            <md-field>
                                <label>CPF</label>
                                <md-input v-mask="'###.###.###-##'" v-model="customer.cpf" type="text"></md-input>
                                <div class="text-sm mt-2 text-red" v-if="$v.$error">
                                    <div v-if="!$v.customer.cpf.required">CPF é obrigatório</div>
                                </div>
                            </md-field>
                        </div>
                        <div class="md-layout-item md-small-size-100 md-size-50 position-relative">
                            <md-field>
                                <label>Celular</label>
                                <md-input v-mask="'(##)#####-####'" v-model="customer.phone" type="phone"></md-input>
                                <div class="text-sm mt-2 text-red" v-if="$v.$error">
                                    <div v-if="!$v.customer.phone.required">Telefone é obrigatório</div>
                                    <div v-if="!$v.customer.phone.minLength">Telefone deve possuir pelo menos 8 dígitos</div>
                                </div>
                            </md-field>
                        </div>
                        <div class="md-layout-item md-size-100 text-right">
                            <md-button v-on:click="saveUser(customer)" class="md-raised md-success">Salvar</md-button>
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
		createCustomer,
		updateCustomer,
		getCustomerById
	} from '@/controllers/customers';
	import { required, minLength, email } from 'vuelidate/lib/validators';

	export default {
		name: "edit-customer-form",
		props: {
		},
		data() {
			return {
				disabled: null,
				customer: {
					id: null,
					name: null,
					cpf: null,
					phone: null,
					email: null,
					last_name: null
				},
				errors: []

			};
		},
		validations: {
			customer: {
				name: { required },
				cpf: { required },
				phone: { required, minLength: minLength(8) },
				email: { required, email },
				last_name: { required }
			}
		},
		methods: {
			saveUser(user) {
				this.$v.customer.$touch();
				if (!this.$v.$invalid) {
					this.errors = [];
					if (user.id) {
						updateCustomer(user)
							.then((res) => {
								if (res && res.status === 200) {
									this.moveToCustomer();
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
					} else {
						createCustomer(user)
							.then((res) => {
								if (res && res.status === 201) {
									this.moveToCustomer();
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
			moveToCustomer() {
				this.$router.push({name: 'Clientes'})
			}
		},
		mounted() {
			if (this.$route.params && this.$route.params.id) {
				getCustomerById(this.$route.params.id)
					.then((res) => {
						if (res && res.status === 200) {
							this.customer = res.data;
						} else {
							this.$router.push({name: 'Clientes'})
						}
					})
			}
		}
	};
</script>
<style></style>
