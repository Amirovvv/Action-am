<template>
	<div class="container todo">
		<div class="todo__header text-white flex items-center">
			<div class="flex-1">
				<div class="text-4xl font-semibold">
					<input type="text" class="bg-transparent" v-model="viewName" />
				</div>
				<span class="mt-1 text-sm">Total tasks {{ tasks.length }}</span>
			</div>
			<div class="flex-1 flex justify-end items-center">
				<div
					@click="toggleFilterMenu"
					class="flex relative mr-6 items-center cursor-pointer"
				>
					<span class="mr-1 text-sm">Filter by status</span>
					<svg width="10" height="10">
						<use xlink:href="@/assets/icons.svg#arrow-down"></use>
					</svg>
					<ul
						v-show="filterMenu"
						class="w-full filter-menu absolute top-6 list-none text-xs bg-gray-800"
					>
						<li @click="filteredInvoices">Draft</li>
						<li @click="filteredInvoices">Pending</li>
						<li @click="filteredInvoices">Paid</li>
						<li @click="filteredInvoices">Clear Filter</li>
					</ul>
				</div>

				<div
					class="w-32 h-12 bg-blue-500 rounded-full flex justify-center text-sm items-center cursor-pointer hover:scale-105 hover:bg-blue-600"
					@click="newTask"
				>
					<svg width="30" height="30">
						<use xlink:href="@/assets/icons.svg#add-task"></use>
					</svg>
					<div class="ml-2">New task</div>
				</div>
			</div>
		</div>

		<div class="todo__table">
			<table class="w-full mt-8">
				<thead>
					<tr>
						<th
							class="border border-gray-700 first:border-l-0 first:w-16 last:w-20 last:border-r-0 text-sm font-medium text-gray-400 py-1 px-2 text-left"
							v-for="(col, index) in columns"
							:key="index"
						>
							{{ col }}
						</th>
					</tr>
				</thead>
				<tbody>
					<tr
						class="text-white font-semibold text-sm"
						v-for="task in tasks"
						:key="task.id"
					>
						<td class="border border-gray-700 p-2 border-l-0 text-center">
							<!-- <label class="inline-flex items-center">
								<input type="checkbox" class="opacity-0 absolute" checked />
							</label> -->
						</td>
						<td class="border border-gray-700 p-2">
							<div>
								<input
									type="text"
									class="bg-transparent"
									@change="updateTaskName(task.id, task.name)"
									v-model="task.name"
								/>
							</div>
							<!-- {{ task.name }} -->
						</td>
						<td class="border border-gray-700 p-2 border-r-0">
							{{ task.date }}
						</td>
					</tr>
				</tbody>
			</table>
		</div>
	</div>
</template>

<script>
import { computed, ref } from '@vue/reactivity'
import { useStore } from 'vuex'
import { useRoute } from 'vue-router'
import { onMounted, watch } from '@vue/runtime-core'

export default {
	setup() {
		const store = useStore()
		const route = useRoute()
		const columns = ref(['Status', 'Name', 'Date'])
		const tasks = computed(() => store.getters.tasks)

		const filterMenu = ref(false)
		const toggleFilterMenu = () => {
			filterMenu.value = !filterMenu.value
		}

		const viewName = computed({
			get() {
				return store.getters.pageId.name
			},
			set(val) {
				store.dispatch('updatePageName', { id: route.params.id, name: val })
			},
		})

		const newTask = () => {
			store.dispatch('setTask', route.params.id)
		}

		const updateTaskName = (task, name) => {
			store.dispatch('updateTaskName', {
				id: route.params.id,
				task: task,
				name: name,
			})
		}

		watch(
			() => route.params.id,
			() => {
				store.dispatch('getTasks', route.params.id)
			},
		)

		onMounted(() => {
			store.dispatch('getTasks', route.params.id)
			console.log(tasks.value)
		})

		return {
			filterMenu,
			columns,
			tasks,
			viewName,
			toggleFilterMenu,
			newTask,
			updateTaskName,
		}
	},
}
</script>

<style lang="scss">
.container {
	width: 800px;
	margin: 86px auto;
}

.filter-menu li {
	padding: 10px 16px;

	&:hover {
		background: whitesmoke;
		color: black;
	}
}
</style>
