<template>
    <div id="chart">
      <apexchart type="line" height="350" :options="chartOptions" :series="series"></apexchart>
    </div>
</template>
<script setup>
import utils from '@/utils/utils'
import { store } from '@/utils/store'
</script>
<script>
export default {
    props: {series: {type: Array}},
    computed: {
      chartOptions() {
        return {
          chart: {
            type: 'line',
            height: 350,
            toolbar: {
              show: true,
              tools: {
                download: false,
                selection: true,
                zoom: true,
                zoomin: true,
                zoomout: true,
                pan: true,
                reset: true,
                customIcons: []
              },
            },
            dropShadow: {
                enabled: true,
                color: '#000',
                top: 15,
                left: 3,
                blur: 5,
                opacity: 0.09
            },
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
            labels: {
              colors: store().dark ? '#dfdfdf' : 'dark'
            },
            markers: {
              fillColors: ['#d4526e', '#ffa726','#5fa0cb', '#77D4A3'],
            }
          },
          stroke: {
            show: true,
            width: 3,
            colors: ['#5fa0cb'],
            curve: 'smooth'
          },
          xaxis: {
            categories: store().cpr,
            labels: {
              show: false,
              style: {
                  colors: store().dark ? ['#dfdfdf', '#dfdfdf', '#dfdfdf', '#dfdfdf'] : ['#212121', '#212121', '#212121', '#212121'],
              },
            }
          },
          yaxis: {
            decimalsInFloat: 2,
            title: {
              text: 'Jumlah (Ton)',
              style: {
                color: store().dark ? '#dfdfdf' : '#212121'
              }
            },
            labels: {
              show: true,
              style: {
                  colors: store().dark ? ['#dfdfdf'] : ['#212121'],
              },
            },
          },
          tooltip: {
            theme: store().dark ? 'dark' : 'light',
            y: {
              formatter: function (val) {
                return utils.numb(val) + " Ton"
              }
            }
          }
        }
      },
    },
}
</script>