<template>
    <div class="relative text-sm">
        <button @click="active = !active" class="h-[40px] w-[40px] rounded hover:bg-primary-hover">
            <i class="ri-download-line text-primary text-base"></i>
        </button>
        <div class="rounded shadow-xl absolute z-[2] right-0 w-max  overflow-hidden duration-300" :class="!active ? 'h-0 py-0' : (store().dark ? 'dark h-max py-2' : 'bg-white h-max py-2')">
            <template v-for="data in dataExp">
                <div v-if="otoritas.check(data.title)" @click="exp(data)" class="flex gap-x-2 items-center hover:bg-primary-hover cursor-pointer duration-300" :class="active ? 'p-3' : 'p-0'">
                    <i :class="data.icon"></i>
                    <span>{{ data.title }}</span>
                </div>
            </template>
        </div>
    </div>
    <div v-if="active" @click="active = false" class="absolute h-[90vh] w-screen top-0 right-0 -me-8 md:-me-15 z-[1]"></div>
</template>
<script setup>
import { store } from '@/utils/store'
import jsPDF from 'jspdf'
import autoTable from 'jspdf-autotable'
import otoritas from '@/router/otoritas'
import utils from '@/utils/utils'
</script>
<script>
export default {
    props: {
        fields: {type: Object, required: true},
        items: {type: Object, required: true}
    },
    data() {
        return {
            active: false,
            dataExp: [
                {title: 'Export pdf', key: 'pdf', icon: 'ri-file-pdf-2-line'},
                {title: 'Export xlsx', key: 'xlsx', icon: 'ri-file-excel-2-line'},
            ]
        }
    },
    methods: {
        exp(value) {
            const title = this.$router.currentRoute.value.name
            const type = 'xlsx'
           if(value.key == 'xlsx') this.exportExcel(title, type)
           else if(value.key == 'pdf') this.exportPdf(title)
        },
        async exportExcel(title, type, fn, dl) {
            var elt = document.getElementById('table');
            var wb = XLSX.utils.table_to_book(elt, { sheet: "sheet1" });
            return dl ?
            // eslint-disable-next-line no-undef
            XLSX.write(wb, { bookType: type, bookSST: true, type: 'base64' }):
            // eslint-disable-next-line no-undef
            XLSX.writeFile(wb, fn || (title+'.' + (type)));
        },
        exportPdf(title) {
            const doc = new jsPDF ();
            const addFooter = function (doc) {
                // Set font size for the footer
                doc.setFontSize(9);

                // Add custom footer content
                const footerText = utils.today();
                const footerX = doc.internal.pageSize.width / 2;
                const footerY = doc.internal.pageSize.height - 10;
                doc.text(footerText, footerX, footerY);
            };
            autoTable(doc, {
                headStyles: { fillColor: [95,160,203], cellPadding: 3},
                margin: { top: 10 },
                body: this.items,
                columns: this.fields.filter(item => item.read.show == true),
                didDrawPage: function (data) {
                    addFooter(doc);
                }
            })
            doc.save(`${title}.pdf`);
        }
    }
}
</script>