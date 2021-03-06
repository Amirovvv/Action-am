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
					class="flex relative mr-6 items-center cursor-pointer filter"
				>
					<span class="mr-1 text-sm"
						>Filter by status
						<span v-if="activeFilter">:{{ activeFilter }}</span></span
					>
					<svg width="10" height="10">
						<use xlink:href="@/assets/icons.svg#arrow-down"></use>
					</svg>
					<ul
						v-show="filterMenu"
						class="w-full z-40 filter-menu absolute top-6 list-none text-xs bg-gray-800"
					>
						<li @click="activateFilter">Done</li>
						<li @click="activateFilter">Not Done</li>
						<li @click="activateFilter">Name</li>
						<li @click="activateFilter">Clear Filter</li>
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
						class="text-white font-semibold text-sm relative"
						v-for="task in filteredTasks"
						:key="task.id"
						@contextmenu.prevent="openMenu($event, task.id)"
						:class="activeMenu === task.id ? 'bg-sky-400/40' : ''"
					>
						<td class="border border-gray-700 p-2 border-l-0 text-center">
							<label class="inline-flex items-center">
								<input
									type="checkbox"
									v-model="task.checked"
									@change="handleCheck($event, task.id)"
								/>
							</label>
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

		<ul
			v-show="showMenu"
			:style="postitionMenu"
			class="absolute bg-gray-600 w-48 rounded py-2 text-white"
		>
			<li @click="deleteTask" class="hover:bg-gray-400/40">
				<div class="flex items-center px-2">
					<svg width="18" height="18">
						<use xlink:href="@/assets/icons.svg#trash"></use>
					</svg>
					<span class="pl-1">Delete</span>
				</div>
			</li>
		</ul>
	</div>
</template>

<script>
import { computed, ref } from '@vue/reactivity'
import { useStore } from 'vuex'
import { useRoute } from 'vue-router'
import { onMounted, watch } from '@vue/runtime-core'
import moment from 'moment'

export default {
	setup() {
		const store = useStore()
		const route = useRoute()
		const columns = ref(['Status', 'Name', 'Date'])
		const tasks = computed(() => store.getters.tasks)

		const activeFilter = ref()
		const activateFilter = (e) => {
			if (e.target.innerText === 'Clear Filter') {
				activeFilter.value = null
				return
			}
			activeFilter.value = e.target.innerText
		}

		const filterMenu = ref(false)
		const toggleFilterMenu = () => {
			filterMenu.value = !filterMenu.value
		}
		const filteredTasks = computed(() => {
			const tasksSort = tasks.value.map((item) => {
				return item
			})

			if (activeFilter.value === 'Done') {
				return tasksSort.filter((a) => a.checked === true)
			}
			if (activeFilter.value === 'Not Done') {
				return tasksSort.filter((a) => a.checked === false)
			}
			if (activeFilter.value === 'Name') {
				return tasksSort.sort((a, b) => a.name.localeCompare(b.name))
			}
			return tasksSort.sort(
				(a, b) => +moment(b.date, 'DD.MM.YY') - +moment(a.date, 'DD.MM.YY'),
			)
		})

		const showMenu = ref(false)
		const activeMenu = ref()
		const postitionMenu = ref({ left: 0, top: 0 })
		const openMenu = (e, task) => {
			showMenu.value = true
			activeMenu.value = task

			postitionMenu.value.top = `${e.pageY}px`
			postitionMenu.value.left = `${e.pageX}px`
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

		const handleCheck = (e, id) => {
			store.dispatch('checkedTask', {
				id: route.params.id,
				task: id,
				check: e.target.checked,
			})
		}

		const updateTaskName = (task, name) => {
			store.dispatch('updateTaskName', {
				id: route.params.id,
				task: task,
				name: name,
			})
		}

		const deleteTask = () => {
			store.dispatch('deleteTask', {
				id: route.params.id,
				task: activeMenu.value,
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

			document.addEventListener('click', (e) => {
				if (e) {
					e.target.closest('.filter') ? null : (filterMenu.value = false)
				}
				showMenu.value = false
				activeMenu.value = null
			})
		})

		return {
			filterMenu,
			columns,
			tasks,
			viewName,
			showMenu,
			postitionMenu,
			activeMenu,
			filteredTasks,
			activeFilter,
			toggleFilterMenu,
			newTask,
			updateTaskName,
			openMenu,
			deleteTask,
			handleCheck,
			activateFilter,
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
