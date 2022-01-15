export default {
	SET_PAGES_DATA(state, payload) {
		state.pagesData.push(payload)
	},
	CLEAR_PAGES_DATA(state) {
		state.pagesData = []
	},
	SET_PAGE_ID(state, payload) {
		state.pageId = payload
	},
}
