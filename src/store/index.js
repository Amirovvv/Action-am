import { createStore } from 'vuex'
import authStore from './modules/authStore/auth'
import navStore from './modules/navStore/navigation'
import todoStore from './modules/todoStore/todo'

const store = createStore({
	modules: {
		auth: authStore,
		navigation: navStore,
		todo: todoStore,
	},
})

export default store
