import { createStore } from 'vuex'
import authStore from './modules/authStore/auth'

const store = createStore({
	modules: {
		auth: authStore,
	},
})

export default store
