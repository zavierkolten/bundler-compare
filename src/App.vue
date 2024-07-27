<script setup lang="ts">
import { ref } from "vue";
import HelloWorld from "./components/HelloWorld.vue";
import { ElTooltip, ElSelect, ElOption, ElTable, ElTableColumn } from 'element-plus'
import Foo from "./components/Foo";
import Bar from "./components/Bar.vue";

const title = ref<string>(`${__BUNDLER__} + Vue`);

const value1 = ref([])
const value2 = ref([])
const value3 = ref([])
const value4 = ref([])
const options = [
	{
		value: 'Option1',
		label: 'Option1',
	},
	{
		value: 'Option2',
		label: 'Option2',
	},
]

const tableData = [
  {
    date: '2016-05-03',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
  },
  {
    date: '2016-05-02',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
  },
  {
    date: '2016-05-04',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
  },
  {
    date: '2016-05-01',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
  },
]
</script>

<template>
	<HelloWorld :msg="title" />
	<Foo />
	<Bar />
	<ElTooltip />
	<div class="m-4">
		<p>default</p>
		<ElSelect v-model="value1" multiple placeholder="Select" style="width: 240px">
			<ElOption v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
		</ElSelect>
	</div>
	<div class="m-4">
		<p>use collapse-tags</p>
		<ElSelect v-model="value2" multiple collapse-tags placeholder="Select" style="width: 240px">
			<ElOption v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
		</ElSelect>
	</div>
	<div class="m-4">
		<p>use collapse-tags-tooltip</p>
		<ElSelect v-model="value3" multiple collapse-tags collapse-tags-tooltip placeholder="Select" style="width: 240px">
			<ElOption v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
		</ElSelect>
	</div>
	<div class="m-4">
		<p>use max-collapse-tags</p>
		<ElSelect v-model="value4" multiple collapse-tags collapse-tags-tooltip :max-collapse-tags="3" placeholder="Select"
			style="width: 240px">
			<ElOption v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
		</ElSelect>
	</div>

	<ElTable :data="tableData" style="width: 100%">
    <ElTableColumn prop="date" label="Date" width="180" />
    <ElTableColumn prop="name" label="Name" width="180" />
    <ElTableColumn prop="address" label="Address" />
  </ElTable>
</template>

<style scoped>
.logo {
	height: 6em;
	padding: 1.5em;
	will-change: filter;
	transition: filter 300ms;
}

.logo:hover {
	filter: drop-shadow(0 0 2em #646cffaa);
}

.logo.vue:hover {
	filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
