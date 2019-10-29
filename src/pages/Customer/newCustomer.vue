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
                        <div class="md-layout-item md-small-size-100 md-size-50">
                            <md-field>
                                <label>Nome</label>
                                <md-input v-model="customer.name" type="text"></md-input>
                            </md-field>
                        </div>
                        <div class="md-layout-item md-small-size-100 md-size-50">
                            <md-field>
                                <label>Sobrenome</label>
                                <md-input v-model="customer.last_name" type="text"></md-input>
                            </md-field>
                        </div>
                        <div class="md-layout-item md-small-size-100 md-size-100">
                            <md-field>
                                <label>Email</label>
                                <md-input v-model="customer.email" type="text"></md-input>
                            </md-field>
                        </div>
                        <div class="md-layout-item md-small-size-100 md-size-50">
                            <md-field>
                                <label>CPF</label>
                                <md-input v-model="customer.cpf" type="number"></md-input>
                            </md-field>
                        </div>
                        <div class="md-layout-item md-small-size-100 md-size-50">
                            <md-field>
                                <label>Telefone</label>
                                <md-input v-model="customer.phone" type="phone"></md-input>
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
<script>
	import {
		createCustomer,
		updateCustomer,
	} from '@/controllers/customers';

	export default {
		name: "edit-customer-form",
		props: {
			dataBackgroundColor: "#3A7BF2",
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
                }

			};
		},
        methods: {
			saveUser(user) {

				if (user.id) {
					console.log('update');
                } else {
					console.log('create');
					createCustomer(user)
                        .then((res) => {
						    if (res && res.status === 201) {
								this.$router.push({ name: 'Clientes' })
							}
                        });
                    console.log(user);
                }
            }
        }
	};
</script>
<style></style>
