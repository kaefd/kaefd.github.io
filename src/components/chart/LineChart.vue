<script>
export default {
    props: {charts: Object, width: Number},
    computed: {
        options() {
            return {
                chart: {
                    id: 'vuechart-example',
                },
                // dataLabels: this.chart.dataLabels,
                // plotOptions: this.chart.plotOptions,
                stroke: this.charts.stroke,
                series: this.charts.series,
                xaxis: {categories: this.charts.xaxis}
            }
        }
    }
}
</script>
<template>
    <apexchart class="text-black" :width="width" :options="options" :series="options.series"></apexchart>
</template>