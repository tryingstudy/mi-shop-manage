<template>
	<div style="background-color: #f0f2f5;position: relative;">
    <Cards></Cards>
    <BigCharts></BigCharts>
    <PieCharts></PieCharts>
	</div>
</template>

<script>
import Cards from '../components/cards.vue'
import BigCharts from '../components/BigCharts.vue'
import PieCharts from "../components/PieCharts.vue"
	export default {
    components: {
      Cards,
      BigCharts,
      PieCharts
     },
		data() {
			return {
				fullscreen: false,
			}
		},
	}
</script>

<style lang="scss" scoped>

</style>
