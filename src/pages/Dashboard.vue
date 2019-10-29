<template>
    <div class="content">
        <span>EM BREVE</span>
        <!--<div class="md-layout">-->
            <!--<div-->
                    <!--class="md-layout-item md-medium-size-100 md-xsmall-size-100 md-size-100"-->
            <!--&gt;-->
                <!--<md-card>-->
                    <!--<md-card-header data-background-color="green">-->
                        <!--<h4 class="title">{{dateTime}}</h4>-->
                        <!--<p class="category"></p>-->
                    <!--</md-card-header>-->
                    <!--<md-card-content>-->
                        <!--<simple-table table-header-color="green"></simple-table>-->
                    <!--</md-card-content>-->
                <!--</md-card>-->
            <!--</div>-->
        <!--</div>-->
    </div>
</template>

<script>
	import {SimpleTable} from "@/components";
	import moment from 'moment';


	export default {
		components: {
			SimpleTable
		},
		props: {
			dateTime: {
				Type: String,
				default: moment().format('DD-MM-YYYY')
			}
		}
	};
</script>
