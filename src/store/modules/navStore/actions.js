import {
	db,
	doc,
	auth,
	collection,
	setDoc,
	onSnapshot,
} from '@/firebase/firebaseConfig'

export default {
	async setPage({ commit }, type) {
		commit('CLEAR_PAGES_DATA')
		try {
			const page = doc(
				collection(db, 'users/' + auth.currentUser.uid + '/pages'),
			)
			setDoc(page, { name: 'view', id: page.id, type: type })
		} catch (e) {
			console.log(e)
		}
	},

	async getPages({ commit }) {
		commit('CLEAR_PAGES_DATA')
		try {
			onSnapshot(
				collection(db, 'users/' + auth.currentUser.uid + '/pages'),
				(sn) => {
					sn.docs.map((doc) => {
						commit('SET_PAGES_DATA', doc.data())
					})
				},
			)
		} catch (e) {
			console.log(e)
		}
	},
}
