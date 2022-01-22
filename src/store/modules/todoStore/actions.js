import {
	db,
	doc,
	auth,
	collection,
	setDoc,
	onSnapshot,
	updateDoc,
} from '@/firebase/firebaseConfig'

export default {
	async getTasks({ commit }, id) {
		try {
			await commit('CLEAR_TASKS')
			onSnapshot(
				collection(
					db,
					'users/' + auth.currentUser.uid + '/pages/' + id + '/tasks',
				),
				(sn) => {
					sn.docs.map((doc) => {
						commit('GET_TASKS', doc.data())
					})
				},
			)
		} catch (e) {
			console.log(e)
		}
	},

	async setTask({ commit }, id) {
		try {
			await commit('CLEAR_TASKS')
			const task = doc(
				collection(
					db,
					'users/' + auth.currentUser.uid + '/pages/' + id + '/tasks',
				),
			)
			setDoc(task, {
				name: '',
				id: task.id,
				date: new Date().toLocaleDateString(),
			})
		} catch (e) {
			console.log(e)
		}
	},

	async updateTaskName({ commit }, { id, task, name }) {
		try {
			await commit('CLEAR_TASKS')
			const updateView = doc(
				db,
				'users/' + auth.currentUser.uid + '/pages/' + id + '/tasks/' + task,
			)
			updateDoc(updateView, {
				name: name,
			})
		} catch (e) {
			console.log(e)
		}
	},
}
