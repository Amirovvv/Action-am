<template>
	<div class="item relative flex items-center">
		<div class="mb-3">
			<div
				class="flex w-56 pl-3"
				@mouseover="activeHover = true"
				@mouseleave="activeHover = false"
				@click="addPage(page.type)"
			>
				<div class="pr-2">
					<svg width="20" height="20">
						<use :xlink:href="`/src/assets/icons.svg#${page.icon}`"></use>
					</svg>
				</div>
				<div>
					<div class="font-medium text-gray-200">{{ page.name }}</div>
					<div>{{ page.desc }}</div>
				</div>
			</div>
		</div>

		<div
			class="absolute right-0 text-black w-72 bg-gray-300 p-1"
			v-if="activeHover"
		>
			<div class="w-full h-36 bg-green-600">image</div>
			<div>
				{{ page.desc }}
			</div>
		</div>
	</div>
</template>

<script>
import { ref } from '@vue/reactivity'
import { useStore } from 'vuex'

export default {
	props: ['page'],

	setup() {
		const store = useStore()

		const activeHover = ref(false)

		function addPage(type) {
			store.dispatch('setPage', type)
		}

		return { activeHover, addPage }
	},
}
</script>

<style lang="scss" scoped>
.item {
	width: 512px;
}
</style>
