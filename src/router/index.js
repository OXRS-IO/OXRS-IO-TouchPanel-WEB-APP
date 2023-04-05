import { createRouter, createWebHistory } from 'vue-router'

const Template = () => import('../views/TemplateView.vue')

const router = createRouter({
	history: createWebHistory(import.meta.env.BASE_URL),
	routes: [
		{
			path: '/',
			name: 'Home',
			component: Template,
			props: {
				bodyView: 'home'
			}
		},
		{
			path: '/config',
			name: 'Config',
			component: Template,
			props: {
				bodyView: 'config'
			}
		},
		{
			path: '/screen/:id',
			name: 'Screen',
			component: Template,
			props: {
				bodyView: 'screen'
			}
		},
		{
			path: '/screen/:id/:tile/settings',
			name: 'Settings',
			component: Template,
			props: {
				bodyView: 'settings'
			}
		}
	]
})

export default router
