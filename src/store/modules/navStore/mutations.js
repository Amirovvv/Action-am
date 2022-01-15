export default {
	SET_PAGES_DATA(state, payload) {
		state.pagesData.push(payload)
	},
	CLEAR_PAGES_DATA(state) {
		state.pagesData = []
	},
}
