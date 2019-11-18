import DashboardLayout from "@/pages/Layout/DashboardLayout.vue";

import Dashboard from "@/pages/Dashboard.vue";
import UserProfile from "@/pages/UserProfile.vue";
import TableList from "@/pages/TableList.vue";
import Customers from "@/pages/Customers.vue";
import NewCustomer from "@/pages/Customer/newCustomer.vue";
import NewBooking from "@/pages/Booking/newBooking.vue";
import NewService from "@/pages/Service/newService.vue";
import Services from "@/pages/Services.vue";
import Typography from "@/pages/Typography.vue";
import Icons from "@/pages/Icons.vue";
import Notifications from "@/pages/Notifications.vue";

const routes = [
	{
		path: "/",
		component: DashboardLayout,
		redirect: "/booking",
		children: [
			{
				path: "booking",
				name: "Agendamentos",
				component: Dashboard
			},
			{
				path: "booking/new",
				name: "Novo Agendamento",
				component: NewBooking
			},
			{
				path: "store",
				name: "Empresa",
				component: UserProfile
			},
			// {
			// 	path: "booking-available",
			// 	name: "Horários Disponíveis",
			// 	component: TableList
			// },
			{
				path: "customers",
				name: "Clientes",
				component: Customers
			},
			{
				path: "customers/new",
				name: "Novo Cliente",
				component: NewCustomer
			},
			{
				path: "customers/:id",
				name: "Atualizar Cliente",
				component: NewCustomer
			},
			{
				path: "services",
				name: "Serviços",
				component: Services
			},
			{
				path: "services/new",
				name: "Novo Serviço",
				component: NewService
			},
			{
				path: "services/:id",
				name: "Atualizar Serviço",
				component: NewService
			},
			{
				path: "typography",
				name: "Typography",
				component: Typography
			},
			{
				path: "icons",
				name: "Icons",
				component: Icons
			},
			{
				path: "notifications",
				name: "Notifications",
				component: Notifications
			}
		]
	}
];

export default routes;
