<template>
    <div class="content">
        <div class="d-flex p-3">
            <md-button to="/customers/new" class="ml-auto md-raised md-info">Novo +</md-button>
        </div>
        <div class="md-layout">
            <div
                    class="md-layout-item md-medium-size-100 md-xsmall-size-100 md-size-100"
            >
                <md-card>
                    <md-card-header data-background-color="green">
                        <h4 class="title">Clientes</h4>
                        <p class="category">Metron</p>
                    </md-card-header>
                    <md-card-content>
                        <simple-table-customer table-header-color="green"></simple-table-customer>
                    </md-card-content>
                </md-card>
            </div>

        </div>
    </div>
</template>

<script>
	import {SimpleTableCustomer} from "@/components";

	export default {
		components: {
			SimpleTableCustomer
		}
	};
</script>
