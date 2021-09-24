<template>
  <el-col :span="12">
    <div id="pie2">

    </div>
  </el-col>
</template>

<script>
  import * as echarts from 'echarts';
    export default {
      data() {
        return {
        }
      },
      mounted(){
        this.drawPieChartSex();
      },
      methods: {
        drawPieChartSex() {
          var PieChartSex = echarts.init(document.getElementById('pie2'));
          PieChartSex.setOption({
            title: {
                text: '销售额男女分布',
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
                    {value: 1048, name: '男'},
                    {value: 1524, name: '女'},
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
  #pie2{
    margin-right: 20px;
    height: 300px;
    background-color: #FFFFFF;
  }
</style>
