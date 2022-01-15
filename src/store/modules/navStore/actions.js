import { db, doc, auth, collection, setDoc } from '@/firebase/firebaseConfig'

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
}
