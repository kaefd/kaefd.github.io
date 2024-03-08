<template #dokumen>
	<div
		class="page bg-white text-black hover:shadow-2xl hover:border-0 p-5 flex flex-col items-center justify-between gap-y-5">
		<div class="w-full flex flex-col">
			<div class="w-full flex flex-col gap-y-7 items-center">
				<span class="font-semibold text-xl uppercase">Surat Delivery Order</span>
				<div class="w-full flex gap-x-3 text-[0.9rem]">
					<div class="flex gap-x-2">
						<div class="flex flex-col gap-y-0">
							<span class="capitalize">tgl pengiriman</span>
							<span class="capitalize">supir/np polisi</span>
							<span class="capitalize">tujuan kirim</span>
						</div>
					</div>
					<div class="flex gap-x-2">
						<div class="flex flex-col gap-y-0">
							<span class="capitalize"
								>: {{ utils.formatDate(head.tgl_pengiriman) }}</span
							>
							<span contenteditable="" class="capitalize">: </span>
							<span class="capitalize">: {{ head.pelanggan }}</span>
						</div>
					</div>
				</div>
			</div>
			<div class="w-full min-h-max mt-5">
				<table class="w-full">
					<thead class="border-b border-t border-black">
						<tr class="w-full capitalize">
							<th class="w-max whitespace-pre-wrap px-3 font-medium text-left">
								barang
							</th>
							<th class="w-max whitespace-pre-wrap px-3 font-medium text-left">
								qty
							</th>
							<th class="w-max whitespace-pre-wrap px-3 font-medium text-left">
								keterangan
							</th>
							<th class="w-max whitespace-pre-wrap px-3 font-medium text-left">
								catatan
							</th>
							<th class="w-max whitespace-pre-wrap px-3 font-medium text-left">
								berat total (kg)
							</th>
						</tr>
					</thead>
					<tbody class="w-full">
						<tr v-for="(item, i) in detail" class="w-full">
							<td class="w-max whitespace-pre-wrap px-3 text-left">
								{{ item.nama_konversi || item.nama_barang }}
							</td>
							<td
							
								class="w-max whitespace-pre-wrap px-3 text-left">
								{{ utils.numb(item.jumlah_konversi) }}
							</td>
							<td class="w-max whitespace-pre-wrap px-3 text-left">
								{{ item.keterangan }}
							</td>
							<td
							
								class="w-max whitespace-pre-wrap px-3 text-left"></td>
							<td class="w-max whitespace-pre-wrap px-3 text-left">
								{{ utils.numb(item.jumlah) }}
							</td>
						</tr>
						<tr :class="detail.length < 3 ? 'h-24' : ''"></tr>
						<tr class="border-t border-b border-black">
							<td></td>
							<td
							
								class="w-max whitespace-pre-wrap px-3 text-left font-semibold">
								{{ utils.numb(sum("konversi")) }}
							</td>
							<td></td>
							<td></td>
							<td
								class="w-max whitespace-pre-wrap px-3 text-left font-semibold">
								{{ utils.numb(sum("jumlah")) }}
							</td>
							<td></td>
						</tr>
					</tbody>
				</table>
			</div>
		</div>
		<div class="w-full flex justify-between items-end mb-[25vh] capitalize">
			<span>yang mengajukan</span>
			<span>mengetahui</span>
			<span>mengetahui</span>
			<span>ekspedisi</span>
		</div>
		<div class="relative bottom-[10vh] left-[30%]">
			<span class="onlyPrinted italic"
				>Print by: {{ `${user} / ${utils.formatDate(utils.today())} ${utils.TimeNow()}` }}</span
			>
		</div>
	</div>
</template>
<script setup>
	import { store } from "@/utils/store";
	import utils from "@/utils/utils";
    import pengiriman from '../pengiriman/pengiriman'
</script>
<script>
	export default {
    props: {
        head: {type: Object, required: true},
    },
    data() {
        return {
            user: JSON.parse(localStorage.getItem('session')).user,
            detail: ''
        }
    },
    methods: {
        async get() {
            this.detail = await pengiriman.getDetail(this.head)
        },
        sum(p) {
            if (p == 'konversi') {
                let j = []
                for (let i = 0; i < this.detail.length; i++) {
                    j.push(this.detail[i].jumlah_konversi)
                }
                let jumlah = j.reduce((accumulator, currentValue) => accumulator + currentValue, 0)
                return jumlah
            }
            if (p == 'jumlah') {
                let j = []
                for (let i = 0; i < this.detail.length; i++) {
                    j.push(this.detail[i].jumlah)
                }
                let jumlah = j.reduce((accumulator, currentValue) => accumulator + currentValue, 0)
                return jumlah
            }
        }
    },
    computed: {
        dataitem() {
				// let k = [];
				// let key = this.detail.map((item) => item.nama_barang);
				// // let head = Array.from(new Set(key.map((obj) => obj.nama_barang))).map(
				// // 	(nama_barang) => {
				// // 		return key.find((obj) => obj.nama_barang === nama_barang);
				// // 	}
				// // );
				// let head = [...new Set(key)]

				// for (let i = 0; i < head.length; i++) {
				// 	let kode = [];
				// 	let jumlah = [];
				// 	let konversi = [];
				// 	let nama = "";
				// 	for (let j = 0; j < this.detail.length; j++) {
				// 		if (this.detail[j].nama_barang == head[i]) {
				// 			nama = this.detail[j].nama_barang;
				// 			kode.push(
				// 				this.detail[j].no_dokumen +
				// 					"/" +
				// 					this.detail[j].kode_group.slice(2, 4) + ' '
				// 			);
				// 			jumlah.push(this.detail[j].jumlah);
				// 			konversi.push(this.detail[j].jumlah_konversi);
				// 		}
				// 	}
				// 	k.push({
				// 		nama_barang: nama,
				// 		jumlah_konversi: konversi.reduce(
				// 			(accumulator, currentValue) => accumulator + currentValue,
				// 			0
				// 		),
				// 		satuan: this.detail[i].satuan,
				// 		jumlah: jumlah.reduce(
				// 			(accumulator, currentValue) => accumulator + currentValue,
				// 			0
				// 		),
				// 		nopen: [...new Set(kode)].toString(),
				// 	});
				// }
				// return k;
		},
    },
    mounted() {
        this.get()
    }
}
</script>
<style scoped>
	.page {
		width: 20cm;
		height: 28cm;
	}
	.onlyPrinted {
		visibility: hidden;
	}
	@media print {
		body {
			visibility: hidden;
		}
		/* .hddn {
			padding: 0 !important;
			margin: 0 !important;
		}
		.bodyp {
			visibility: hidden;
		} */
		.onlyPrinted {
			visibility: visible;
		}
		.page {
			width: 21cm;
			height: 29cm;
			box-shadow: none !important;
			font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
            visibility: visible;
            color: black !important;
            text-rendering: optimizeLegibility;
            image-rendering: auto;
		}
	}
</style>
