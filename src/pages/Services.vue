<template>
    <div class="content">
        <div class="md-layout p-3">
            <div class="md-layout-item md-medium-size-66 md-xsmall-size-66 md-size-66">
                <md-field>
                    <label>Filtrar (nome)</label>
                    <md-input v-on:keyup.enter="filterVal" v-model="filter" type="text"></md-input>
                </md-field>
            </div>
            <div class="md-layout-item md-medium-size-33 md-xsmall-size-33 md-size-33 text-right">
                <md-button to="/services/new" class="ml-auto md-raised md-info">Novo +</md-button>
            </div>
        </div>
        <div class="md-layout">
            <div
                    class="md-layout-item md-medium-size-100 md-xsmall-size-100 md-size-100"
            >
                <md-card>
                    <md-card-header data-background-color="green">
                        <h4 class="title">Serviços</h4>
                        <p class="category">Serviços oferecidos</p>
                    </md-card-header>
                    <md-card-content>
                        <simple-table-service :bus="bus" :q="filter" table-header-color="green"></simple-table-service>
                    </md-card-content>
                </md-card>
            </div>

        </div>
    </div>
</template>

<script>
	import {SimpleTableService} from "@/components";
	import Vue from "vue";

	export default {
		components: {
			SimpleTableService
		},
		data() {
			return {
				bus: new Vue(),
				filter: ''
			}
		},
		methods: {
			filterVal: function() {
				this.bus.$emit('filterService', true);
			}
		}
	};
</script>
