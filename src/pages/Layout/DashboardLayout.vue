<template>
    <div class="wrapper" :class="{ 'nav-open': $sidebar.showSidebar }">
        <notifications></notifications>

        <side-bar>
            <mobile-menu slot="content"></mobile-menu>
            <sidebar-link to="/booking">
                <md-icon>content_paste</md-icon>
                <p>Agendamentos</p>
            </sidebar-link>
            <sidebar-link to="/booking-available">
                <md-icon>dashboard</md-icon>
                <p>Horários Disponíveis</p>
            </sidebar-link>
            <sidebar-link to="/customers">
                <md-icon>supervisor_account</md-icon>
                <p>Clientes</p>
            </sidebar-link>
            <sidebar-link to="/services">
                <md-icon>work</md-icon>
                <p>Serviços</p>
            </sidebar-link>
            <sidebar-link to="/user">
                <md-icon>person</md-icon>
                <p>User Profile</p>
            </sidebar-link>
        </side-bar>

        <div class="main-panel">
            <top-navbar></top-navbar>

            <dashboard-content></dashboard-content>

        </div>
    </div>
</template>
<style lang="scss"></style>
<script>
	import TopNavbar from "./TopNavbar.vue";
	import DashboardContent from "./Content.vue";
	import MobileMenu from "@/pages/Layout/MobileMenu.vue";

	export default {
		components: {
			TopNavbar,
			DashboardContent,
			MobileMenu
		}
	};
</script>
