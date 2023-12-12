<template>
    <div id="chart">
      <apexchart type="bar" height="350" :options="chartOptions" :series="chart"></apexchart>
    </div>
</template>
<script setup lang="ts">
import utils from '@/utils/utils'
import {store} from '@/utils/store'
</script>
<script lang="ts">
export default {
    props: {chart: {type: Array}},
    computed: {
      chartOptions() {
        return {
          chart: {
            type: 'bar',
            height: 350
          },
          // colors: ['#d4526e', '#5fa0cb', '#ffa726', '#77D4A3'],
          fill: {
            colors: ['#d4526e', '#ffa726','#5fa0cb', '#77D4A3']
          },
          plotOptions: {
            bar: {
              borderRadius: 5,
              horizontal: false,
              columnWidth: '15px',
              endingShape: 'rounded'
            },
          },
          dataLabels: {
            enabled: false
          },
          legend: {
            markers: {
              fillColors: ['#d4526e', '#ffa726','#5fa0cb', '#77D4A3'],
            }
          },
          stroke: {
            show: true,
            width: 2,
            colors: ['transparent']
          },
          xaxis: {
            categories: ['minggu 1', 'minggu 2', 'minggu 3', 'minggu 4'],
            labels: {
              style: {
                  colors: store().theme == 'dark' ? ['#dfdfdf', '#dfdfdf', '#dfdfdf', '#dfdfdf'] : ['#212121', '#212121', '#212121', '#212121'],
              },
            }
          },
          yaxis: {
            decimalsInFloat: 2,
            title: {
              text: 'Jumlah (Ton)',
              style: {
                color: store().theme == 'dark' ? '#dfdfdf' : '#212121'
              }
            },
            labels: {
              show: true,
              style: {
                  colors: store().theme == 'dark' ? ['#dfdfdf'] : ['#212121'],
              },
            },
          },
          tooltip: {
            y: {
              formatter: function (val) {
                return utils.numb(val) + " Ton"
              }
            }
          }
        }
      },
    }
}
</script>