<template>
	<div>{{ page.name }}</div>
</template>

<script>
import { computed, watch } from '@vue/runtime-core'
import { useStore } from 'vuex'
import { useRoute } from 'vue-router'
import TodoView from '@/components/ViewsPage/TodoView.vue'
import ListView from '@/components/ViewsPage/ListView.vue'

export default {
	components: { TodoView, ListView },
	setup() {
		const store = useStore()
		const route = useRoute()

		const page = computed(() => store.getters.pageId)

		watch(
			() => route.params.id,
			() => store.dispatch('getPageId', route.params.id),
		)

		return {
			page,
		}
	},
}
</script>

<style></style>
