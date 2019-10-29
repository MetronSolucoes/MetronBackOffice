<template>
    <div>
        <md-table v-model="users" :table-header-color="tableHeaderColor">
            <md-table-row slot="md-table-row" slot-scope="{ item }">
                <md-table-cell md-label="Nome">{{ item.customer.name }}</md-table-cell>
                <md-table-cell md-label="Contato">{{ item.customer.phone }}</md-table-cell>
                <md-table-cell md-label="Horário Inicial">{{item.dateIni | toDatetime}}</md-table-cell>
                <md-table-cell md-label="Horário Final">{{item.dateEnd | toDatetime}}</md-table-cell>
                <md-table-cell md-label="Status">{{ item.status | capitalize }}</md-table-cell>
            </md-table-row>
        </md-table>
    </div>
</template>

<script>
	import moment from 'moment';

	export default {
		name: "simple-table-service",
		props: {
			tableHeaderColor: {
				type: String,
				default: ""
			}
		},
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
		data() {
			return {
				selected: [],
				users: [
					{
						dateIni: '1571056200000',
						dateEnd: '1571058000000',
						status: 'marcado',
						customer: {
							name: 'Dakota Rice',
							phone: '99999-9999'
						}
					},
					{
						dateIni: '1571059800000',
						dateEnd: '1571061600000',
						status: 'marcado',
						customer: {
							name: 'Minerva Hooper',
							phone: '99999-9999'
						}
					},
					{
						dateIni: '1571063400000',
						dateEnd: '1571065200000',
						status: 'marcado',
						customer: {
							name: 'Sage Rodriguez',
							phone: '99999-9999'
						}
					},
					{
						dateIni: '1571058000000',
						dateEnd: '1571058000000',
						status: 'marcado',
						customer: {
							name: 'Philip Chaney',
							phone: '99999-9999'
						}
					},
					{
						dateIni: '1571068800000',
						dateEnd: '1571070600000',
						status: 'marcado',
						customer: {
							name: 'Doris Greene',
							phone: '99999-9999'
						}
					},
					{
						dateIni: '1571074200000',
						dateEnd: '1571076000000',
						status: 'marcado',
						customer: {
							name: 'Mason Porter',
							phone: '99999-9999'
						}
					}
				]
			};
		}
	};
</script>
