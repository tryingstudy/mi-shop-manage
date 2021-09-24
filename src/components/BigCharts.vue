<template>
  <el-row>
    <el-col :span="24">
      <div id="main"></div>
    </el-col>
  </el-row>
</template>

<script>
import * as echarts from 'echarts';
export default {
  data() {
    return {
    }
  },
  mounted() {
    this.drawLineChart();
  },
  methods: {
    drawLineChart() {
      var LineChart = echarts.init(document.getElementById('main'));
      LineChart.setOption({
         title:{
                 text: '近一周成交额'
             },
             tooltip: {
                 trigger: 'axis'
             },
             grid: {
                 left: '3%',
                 right: '4%',
                 bottom: '3%',
                 containLabel: true
             },
             toolbox: {
                 feature: {
                     saveAsImage: {}
                 }
             },
             xAxis: {
                 type: 'category',
                 boundaryGap: false,
                 data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
             },
             yAxis: {
                 type: 'value'
             },
             series: [
                 {
                     name: '近一周成交额',
                     type: 'line',
                     smooth: true,
                     stack: '总量',
                     data: [120, 132, 101, 250, 90, 230, 210]
                 },
             ]
         });
    }
  },
}
</script>

<style lang="scss" scoped>
  #main{
    height: 350px;
    background-color: rgb(255,255,255);
    margin: 0 20px 32px;
  }
</style>
