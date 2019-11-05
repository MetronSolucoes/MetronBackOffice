<template>
    <div class="p-3">
        <form>
            <md-card>
                <md-card-header :data-background-color="'green'">
                    <h4 class="title">Serviço</h4>
                    <p class="category">Meu Serviço</p>
                </md-card-header>

                <md-card-content>
                    <div class="md-layout">
                        <div class="md-layout-item md-small-size-100 md-size-1000">
                            <md-field>
                                <label>Nome</label>
                                <md-input v-model="service.name" type="text"></md-input>
                                <div class="text-sm mt-2 text-red" v-if="$v.$error">
                                    <div v-if="!$v.service.name.required">Nome é obrigatório</div>
                                </div>
                            </md-field>
                        </div>
                        <div class="md-layout-item md-small-size-100 md-size-100">
                            <md-field>
                                <label>Descrição</label>
                                <md-input v-model="service.description" type="text"></md-input>
                            </md-field>
                        </div>
                        <div class="md-layout-item md-small-size-100 md-size-100">
                            <md-field>
                                <label>Duração (min)</label>
                                <md-input v-model="service.duration" min="1" step="1" type="number"></md-input>
                                <div class="text-sm mt-2 text-red" v-if="$v.$error">
                                    <div v-if="!$v.service.duration.required">Duração é obrigatório</div>
                                </div>
                            </md-field>
                        </div>
                        <div class="md-layout-item md-size-100 text-right">
                            <md-button v-on:click="saveService(service)" class="md-raised md-success">Salvar</md-button>
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
</style>

<script>
	import { required } from 'vuelidate/lib/validators';
	import {
		createService,
		updateService,
		getServiceById
	} from '@/controllers/services';

	export default {
		name: "edit-service-form",
		props: {
		},
		data() {
			return {
				disabled: null,
				service: {
					id: null,
					name: null,
					description: null,
					duration: null
                },
                errors: []
			};
		},
		validations: {
			service: {
				name: { required },
				duration: { required }
			}
		},
		methods: {
			saveService(data) {
				this.$v.service.$touch();
				if (!this.$v.$invalid) {
					this.errors = [];
					if (data.id) {
						updateService(data)
							.then((res) => {
								if (res && res.status === 200) {
									this.moveToService();
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
							})
					} else {
						console.log(data);
						createService(data)
							.then((res) => {
								if (res && res.status === 201) {
									this.moveToService();
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
			moveToService() {
				this.$router.push({name: 'Serviços'});
			}

		},
		mounted() {
			if (this.$route.params && this.$route.params.id) {
				getServiceById(this.$route.params.id)
					.then((res) => {
						if (res && res.status === 200) {
							this.service = res.data;
						} else {
							this.moveToService();
						}
					})
			}
		}
	};
</script>
<style></style>
