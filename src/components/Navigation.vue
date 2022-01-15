<template>
	<div class="relative">
		<div class="w-40 shrink bg-gray-800 h-full shadow-lg">
			<div class="p-3">
				<div class="flex items-center">
					<img
						:src="user.photo"
						alt=""
						class="rounded-md h-8 w-8 flex items-center justify-center border-2 border-blue-500"
					/>
					<div class="ml-1">
						<p
							class="ml-1 text-sm font-medium tracking-wide truncate text-gray-100 font-sans"
						>
							{{ user.name }}
						</p>
					</div>
				</div>
				<div class="text-gray-300 text-sm mt-6">
					<button class="flex">
						<div class="w-8 flex justify-center">
							<svg width="20" height="20">
								<use xlink:href="/src/assets/icons.svg#notification"></use>
							</svg>
						</div>
						<div class="ml-2">notification</div>
					</button>
					<button class="flex mt-2">
						<div class="w-8 flex justify-center">
							<svg width="20" height="20">
								<use xlink:href="/src/assets/icons.svg#box"></use>
							</svg>
						</div>
						<div class="ml-2">e-mail</div>
					</button>
					<button class="flex mt-2">
						<div class="w-8 flex justify-center">
							<svg width="20" height="20">
								<use xlink:href="/src/assets/icons.svg#loupe"></use>
							</svg>
						</div>
						<div class="ml-2">find</div>
					</button>
					<div class="mt-12 flex">
						<button class="btn-page flex" @click="showAddPage">
							<div class="w-8 flex justify-center">
								<svg width="20" height="20">
									<use xlink:href="@/assets/icons.svg#add"></use>
								</svg>
							</div>
							<div class="ml-2">Add a page</div>
						</button>
						<div class="absolute right-0">
							<div
								class="list-page absolute ml-0.5 h-auto w-55 bg-gray-800 rounded py-1"
								v-if="AddPage"
							>
								<addPageItem
									v-for="(page, index) in pagesType"
									:key="index"
									:page="page"
								></addPageItem>
							</div>
						</div>
					</div>
				</div>
			</div>
			<ul class="mt-6">
				<li
					class="flex w-full justify-between text-gray-300 hover:bg-gray-500 cursor-pointer items-center py-1"
					v-for="(page, index) in pagesAll"
					:key="index"
				>
					<router-link :to="{ name: 'page', params: { id: page.id } }">
						<span class="text-sm text-center pl-4">{{
							page.name
						}}</span></router-link
					>
				</li>
			</ul>
		</div>
	</div>
</template>

<script>
import { ref } from 'vue'
import { useStore } from 'vuex'
import { computed, onMounted } from '@vue/runtime-core'
import { auth } from '@/firebase/firebaseConfig'
import addPageItem from '@/components/AddPageItem.vue'

export default {
	components: { addPageItem },

	setup() {
		const store = useStore()

		const user = ref({
			name: auth.currentUser.displayName,
			photo: auth.currentUser.photoURL,
		})

		const pagesType = [
			{
				name: 'Todo',
				desc: 'Создание задач',
				icon: 'todo',
				type: 'todo',
			},
			{
				name: 'List',
				desc: 'Создание списка',
				icon: 'list',
				type: 'list',
			},
		]

		const AddPage = ref(false)

		const showAddPage = () => {
			AddPage.value = !AddPage.value
		}

		const pagesAll = computed(() => store.getters.pagesData)

		onMounted(() => {
			store.dispatch('getPages')
		})

		return { user, AddPage, showAddPage, pagesType, pagesAll }
	},
}
</script>

<style></style>
