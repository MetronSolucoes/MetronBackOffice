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
                <md-button to="/booking/new" class="ml-auto md-raised md-info">Novo +</md-button>
            </div>
        </div>
        <div class="md-layout">
            <div
                    class="md-layout-item md-medium-size-100 md-xsmall-size-100 md-size-100"
            >
                <md-card>
                    <md-card-header data-background-color="green">
                        <h4 class="title">Agendamentos</h4>
                        <p class="category">Metron</p>
                    </md-card-header>
                    <md-card-content>
                        <simple-table-booking :bus="bus" :q="filter" table-header-color="green"></simple-table-booking>
                    </md-card-content>
                </md-card>
            </div>

        </div>
    </div>
</template>

<script>
	import {SimpleTableBooking} from "@/components";
	import Vue from "vue";
	import moment from 'moment';


	export default {
		components: {
			SimpleTableBooking
		},
		data() {
			return {
				bus: new Vue(),
				filter: ''
			}
		},
		methods: {
			filterVal: function() {
				this.bus.$emit('filterCustomer', true);
			}
		}
	};
</script>
