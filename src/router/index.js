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
				bodyView: 'home',
			}
		},
		{
			path: '/config',
			name: 'Config',
			component: Template,
			props: {
				bodyView: 'config',
			}
		},
		{
			path: '/screen/:screen',
			name: 'Screen',
			component: Template,
			props: {
				bodyView: 'screen',
			}
		},
		{
			path: '/screen/:screen/tile/:tile',
			name: 'Controls',
			component: Template,
			props: {
				bodyView: 'controls',
			}
		}
	]
})

export default router
