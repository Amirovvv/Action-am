import { collection, addDoc } from 'firebase/firestore'
import { db, auth } from '@/firebase/firebaseConfig'

export default {
	async authUser() {
		const user = {
			name: auth.currentUser.displayName,
			email: auth.currentUser.email,
			photo: auth.currentUser.photoURL,
			uid: auth.currentUser.uid,
		}
		try {
			await addDoc(collection(db, 'users'), user)
		} catch (e) {
			console.log(e)
		}
	},
}
