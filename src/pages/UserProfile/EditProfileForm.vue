<template>
    <form>
        <md-card>
            <md-card-header :data-background-color="dataBackgroundColor">
                <h4 class="title">Empresa</h4>
                <p class="category">Informações</p>
            </md-card-header>

            <md-card-content>
                <div class="md-layout">
                    <div class="md-layout-item md-small-size-100 md-size-50">
                        <md-field>
                            <label>Empresa</label>
                            <md-input v-model="company.name" ></md-input>
                            <div class="text-sm mt-2 text-red" v-if="$v.$error">
                                <div v-if="!$v.company.name.required">Nome da empresa é obrigatório</div>
                            </div>
                        </md-field>
                    </div>
                    <div class="md-layout-item md-small-size-100 md-size-50">
                        <md-field>
                            <label>Horário de Funcionamento</label>
                            <md-input v-model="company.opening_hours" type="text"></md-input>
                        </md-field>
                    </div>
                    <div class="md-layout-item md-small-size-100 md-size-50">
                        <md-field>
                            <label>Email</label>
                            <md-input v-model="company.email" type="email"></md-input>
                            <div class="text-sm mt-2 text-red" v-if="$v.$error">
                                <div v-if="!$v.company.email.required">Email é obrigatório</div>
                                <div v-if="!$v.company.email.email">Email é inválido</div>
                            </div>
                        </md-field>
                    </div>
                    <div class="md-layout-item md-small-size-100 md-size-50">
                        <md-field>
                            <label>Telefone</label>
                            <md-input v-mask="'(##)#####-####'" v-model="company.phone" type="text"></md-input>
                            <div class="text-sm mt-2 text-red" v-if="$v.$error">
                                <div v-if="!$v.company.phone.required">Telefone é obrigatório</div>
                                <div v-if="!$v.company.phone.minLength">Telefone deve possuir pelo menos 8 dígitos</div>
                            </div>
                        </md-field>
                    </div>
                    <div class="md-layout-item md-size-100 text-right">
                        <md-button v-on:click="saveCompany(company)" class="md-raised md-success">Atualizar</md-button>
                    </div>
                </div>
            </md-card-content>
        </md-card>
    </form>
</template>

<style>
    .text-red {
        position: absolute;
        bottom: -20px;
        color: red;
    }
</style>

<script>
	import {
		getCompany,
		updateCompany
	} from '@/controllers/company';
	import { required, minLength, email } from 'vuelidate/lib/validators';

	export default {
		name: "edit-profile-form",
		props: {
			dataBackgroundColor: {
				type: String,
				default: ""
			}
		},
		validations: {
			company: {
				name: { required },
				phone: { required, minLength: minLength(8) },
				email: { required, email }
			}
		},
		data() {
			return {
				company: {
					name: null,
					opening_hours: null,
					phone: null,
					email: null
                },
				errors: []
			};
		},
        methods:{
			saveCompany(company) {
				this.$v.company.$touch();
				if (!this.$v.$invalid) {
					this.errors = [];
					updateCompany(company)
						.then((res) => {
							if (res && res.status === 200) {
								this.$swal({
									title: '',
									type: 'success',
									text: 'Atualizado com sucesso.',
									showCloseButton: false,
									showCancelButton: false,
									focusConfirm: false,
									confirmButtonText: 'Ok'
								});
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

				if (!errors) {
					return 'Ocorreu um erro!';
                }

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
			}
        },
		mounted() {
			getCompany()
                .then((res) => {
                    if (res && res.status === 200) {
                        this.company = res.data;
                    } else {
                        this.$router.push({name: 'Agendamentos'})
                    }
                })
		}
	};
</script>
