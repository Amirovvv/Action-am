export default {
	GET_TASKS(state, payload) {
		state.tasks.push(payload)
	},
	CLEAR_TASKS(state) {
		state.tasks = []
	},
}
