import { collection, addDoc } from 'firebase/firestore'
import { db } from '/src/utils/firebase'

export default {
	async authUser({ commit }, payload) {
		const user = {
			name: payload.displayName,
			email: payload.email,
			photo: payload.photoURL,
			token: payload.accessToken,
		}
		try {
			await addDoc(collection(db, 'users'), user)
			commit('USER_INFO', user)
		} catch (e) {
			console.log(e)
		}
	},
}
