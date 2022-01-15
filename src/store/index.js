import { createStore } from 'vuex'
import authStore from './modules/authStore/auth'
import navStore from './modules/navStore/navigation'

const store = createStore({
	modules: {
		auth: authStore,
		navigation: navStore,
	},
})

export default store
