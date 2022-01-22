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
	async setPage({ commit }, type) {
		await commit('CLEAR_PAGES_DATA')
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
		try {
			await commit('CLEAR_PAGES_DATA')
			onSnapshot(
				collection(db, 'users/' + auth.currentUser.uid + '/pages'),
				(sn) => {
					sn.docs.map((doc) => {
						commit('SET_PAGES_DATA', doc.data())
					})
				},
			)
			console.log('aaa')
		} catch (e) {
			console.log(e)
		}
	},

	async getPageId({ commit }, id) {
		try {
			onSnapshot(
				doc(db, 'users/' + auth.currentUser.uid + '/pages/' + id),
				(doc) => {
					commit('GET_PAGE_ID', doc.data())
				},
			)
		} catch (e) {
			console.log(e)
		}
	},
}
