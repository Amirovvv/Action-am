import { db, auth, collection, doc, setDoc } from '@/firebase/firebaseConfig'

export default {
	async authUser() {
		const user = {
			name: auth.currentUser.displayName,
			email: auth.currentUser.email,
			photo: auth.currentUser.photoURL,
			uid: auth.currentUser.uid,
		}
		try {
			const addUser = doc(collection(db, 'users'), auth.currentUser.uid)
			await setDoc(addUser, user)
		} catch (e) {
			console.log(e)
		}
	},
}
