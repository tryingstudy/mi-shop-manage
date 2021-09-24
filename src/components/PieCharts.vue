<template>
  <el-row :gutter="40">
    <el-col :span="12">
      <div id="pie"></div>
    </el-col>
    <PieChartsSex></PieChartsSex>
  </el-row>
</template>

<script>
import PieChartsSex from './PieChartsSex.vue'
import * as echarts from 'echarts';
  export default {
    components: {
      PieChartsSex
    },
    data() {
      return {
      }
    },
    mounted(){
      this.drawPieChart();
    },
    methods: {
      drawPieChart() {
        var PieChart = echarts.init(document.getElementById('pie'));
        PieChart.setOption({
          title: {
              text: '产品分类表',
              left: 'center'
          },
          tooltip: {
              trigger: 'item'
          },
          legend: {
              orient: 'vertical',
              left: 'left',
          },
          series: [
            {
              type: 'pie',
              radius: '70%',
              data: [
                  {value: 1048, name: '搜索引擎'},
                  {value: 735, name: '直接访问'},
                  {value: 580, name: '邮件营销'},
                  {value: 484, name: '联盟广告'},
                  {value: 300, name: '视频广告'}
              ],
              emphasis: {
                  itemStyle: {
                      shadowBlur: 10,
                      shadowOffsetX: 0,
                      shadowColor: 'rgba(0, 0, 0, 0.5)'
                  }
              }
            }
          ]
        });
      }
    },
  }
</script>

<style lang="scss" scoped>
  #pie{
    margin: 0 20px;
    height: 300px;
    background-color: #FFFFFF;
  }
</style>
