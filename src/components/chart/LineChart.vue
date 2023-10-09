<script>
export default {
    props: {chart: Object, width: Number},
    computed: {
        options() {
            return {
                chart: {
                    id: 'vuechart-example',
                },
                dataLabels: this.chart.dataLabels,
                plotOptions: this.chart.plotOptions,
                stroke: this.chart.stroke,
                series: this.chart.series,
                xaxis: {categories: this.chart.xaxis}
            }
        }
    }
}
</script>
<template>
    <apexchart class="text-black" :width="width" :options="options" :series="options.series"></apexchart>
</template>