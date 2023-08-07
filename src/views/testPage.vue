<script>
import { VDataTable } from 'vuetify/labs/VDataTable'
import TextField from '../components/form/textField.vue'
import api from '../service/api'
import functions from '../service/functions'
export default {
  components: { VDataTable, TextField },
    data () {
        return {
            windowWidth: window.innerWidth,
            headers: [
              {title: 'no pjl', key:'no_penjualan'},
              {title: 'nobc inventori', key:'no_dokumen'},
              {title: 'nobc excel', key:'no_dokumen_excel'},
              {title: 'jumlah inv', key:'jumlah'},
              {title: 'jumlah exc', key:'jumlah_exc'},
            ],
            items: '',
            excel: [
            {no_dokumen_excel: "SPP", jumlah_exc:	108260},
            {no_dokumen_excel: "000502", jumlah_exc:	351000},
            {no_dokumen_excel: "002054", jumlah_exc:	322623},
            {no_dokumen_excel: "SPP", jumlah_exc:	28067},
            {no_dokumen_excel: "000506", jumlah_exc:	453654},
            {no_dokumen_excel: "000744", jumlah_exc:	384672},
            {no_dokumen_excel: "000968", jumlah_exc:	152749},
            {no_dokumen_excel: "001811", jumlah_exc:	22393},
            {no_dokumen_excel: "000861", jumlah_exc:	372344},
            {no_dokumen_excel: "SPP", jumlah_exc:	15514},
            {no_dokumen_excel: "SPP", jumlah_exc:	44170},
            {no_dokumen_excel: "001382", jumlah_exc:	103237},
            {no_dokumen_excel: "001682", jumlah_exc:	191434},
            {no_dokumen_excel: "001704", jumlah_exc:	9114},
            {no_dokumen_excel: "002057", jumlah_exc:	238426},
            {no_dokumen_excel: "SPP", jumlah_exc:	9934},
            {no_dokumen_excel: "002056", jumlah_exc:	294005},
            {no_dokumen_excel: "002570", jumlah_exc:	12250},
            {no_dokumen_excel: "SPP", jumlah_exc:	0},
            {no_dokumen_excel: "002058", jumlah_exc:	159725},
            {no_dokumen_excel: "SPP", jumlah_exc:	6655},
            {no_dokumen_excel: "SPP", jumlah_exc:	249767},
            {no_dokumen_excel: "002061", jumlah_exc:	182786},
            {no_dokumen_excel: "SPP", jumlah_exc:	7616},
            {no_dokumen_excel: "001721", jumlah_exc:	129364},
            {no_dokumen_excel: "001739", jumlah_exc:	5390},
            {no_dokumen_excel: "001905", jumlah_exc:	636624},
            {no_dokumen_excel: "001906", jumlah_exc:	26526},
            {no_dokumen_excel: "002060", jumlah_exc:	293589},
            {no_dokumen_excel: "SPP", jumlah_exc:	12233},
            {no_dokumen_excel: "SPP", jumlah_exc:	109262},
            {no_dokumen_excel: "001741", jumlah_exc:	309413},
            {no_dokumen_excel: "001810", jumlah_exc:	12892},
            {no_dokumen_excel: "SPP", jumlah_exc:	155670},
            {no_dokumen_excel: "SPP", jumlah_exc:	554372},
            {no_dokumen_excel: "002059", jumlah_exc:	53998},
            {no_dokumen_excel: "SPP", jumlah_exc:	292144},
            {no_dokumen_excel: "002005", jumlah_exc:	181760},
            {no_dokumen_excel: "SPP", jumlah_exc:	7573},
            {no_dokumen_excel: "002053", jumlah_exc:	187386},
            {no_dokumen_excel: "SPP", jumlah_exc:	7808},
            {no_dokumen_excel: "SPP", jumlah_exc:	417945},
            {no_dokumen_excel: "002793", jumlah_exc:	200976},
            {no_dokumen_excel: "002994", jumlah_exc:	173844},
            {no_dokumen_excel: "002850", jumlah_exc:	31056},
            {no_dokumen_excel: "002940", jumlah_exc:	61998},
            {no_dokumen_excel: "003363", jumlah_exc:	31057},
            {no_dokumen_excel: "002719", jumlah_exc:	52724},
            {no_dokumen_excel: "003179", jumlah_exc:	207400},
            {no_dokumen_excel: "003353", jumlah_exc:	133673},
            {no_dokumen_excel: "003492", jumlah_exc:	44558},
            {no_dokumen_excel: "003597", jumlah_exc:	88886},
            {no_dokumen_excel: "002720", jumlah_exc:	24257},
            {no_dokumen_excel: "003515", jumlah_exc:	163731},
            {no_dokumen_excel: "003849", jumlah_exc:	54577},
            {no_dokumen_excel: "002995", jumlah_exc:	114109},
            {no_dokumen_excel: "002995", jumlah_exc:	43836},
            {no_dokumen_excel: "003090", jumlah_exc:	336818},
            {no_dokumen_excel: "004634", jumlah_exc:	49476},
            {no_dokumen_excel: "002792", jumlah_exc:	285685},
            {no_dokumen_excel: "002792", jumlah_exc:	109286},
            {no_dokumen_excel: "002792", jumlah_exc:	73528},
            {no_dokumen_excel: "002792", jumlah_exc:	40481},
            {no_dokumen_excel: "002939", jumlah_exc:	108193},
            {no_dokumen_excel: "002939", jumlah_exc:	45540},
            {no_dokumen_excel: "002939", jumlah_exc:	22702},
            {no_dokumen_excel: "003234", jumlah_exc:	52270},
            {no_dokumen_excel: "003616", jumlah_exc:	185864},
            {no_dokumen_excel: "003690", jumlah_exc:	137247},
            {no_dokumen_excel: "004213", jumlah_exc:	35901},
            {no_dokumen_excel: "003361", jumlah_exc:	160888},
            {no_dokumen_excel: "002820", jumlah_exc:	97806},
            {no_dokumen_excel: "003826", jumlah_exc:	45154},
            {no_dokumen_excel: "003030", jumlah_exc:	268055},
            {no_dokumen_excel: "003493", jumlah_exc:	45495},
            {no_dokumen_excel: "003691", jumlah_exc:	45495},
            {no_dokumen_excel: "002872", jumlah_exc:	359196},
            {no_dokumen_excel: "003711", jumlah_exc:	247909},
            {no_dokumen_excel: "002853", jumlah_exc:	432420},
            {no_dokumen_excel: "003631", jumlah_exc:	403404},
            {no_dokumen_excel: "002908", jumlah_exc:	307732},
            {no_dokumen_excel: "003031", jumlah_exc:	776760},
            {no_dokumen_excel: "003249", jumlah_exc:	67745},
            {no_dokumen_excel: "003437", jumlah_exc:	45855},
            {no_dokumen_excel: "003461", jumlah_exc:	88391},
            {no_dokumen_excel: "003660", jumlah_exc:	29018},
            {no_dokumen_excel: "003827", jumlah_exc:	234225},
            {no_dokumen_excel: "003748", jumlah_exc:	360850},
            {no_dokumen_excel: "003818", jumlah_exc:	471945},
            {no_dokumen_excel: "003734", jumlah_exc:	31685},
            {no_dokumen_excel: "003752", jumlah_exc:	20904},
            {no_dokumen_excel: "003853", jumlah_exc:	33408},
            {no_dokumen_excel: "003896", jumlah_exc:	19218},
            {no_dokumen_excel: "003979", jumlah_exc:	25175},
            {no_dokumen_excel: "003962", jumlah_exc:	47836},
            {no_dokumen_excel: "004005", jumlah_exc:	48697},
            {no_dokumen_excel: "004075", jumlah_exc:	21238},
            {no_dokumen_excel: "004076", jumlah_exc:	95000},
            {no_dokumen_excel: "004096", jumlah_exc:	22566},
            {no_dokumen_excel: "003999", jumlah_exc:	46323},
            {no_dokumen_excel: "004031", jumlah_exc:	47472},
            {no_dokumen_excel: "004074", jumlah_exc:	95565},
            {no_dokumen_excel: "004110", jumlah_exc:	28380},
            {no_dokumen_excel: "004181", jumlah_exc:	66221},
            {no_dokumen_excel: "004211", jumlah_exc:	95280},
            {no_dokumen_excel: "004212", jumlah_exc:	27165},
            {no_dokumen_excel: "004340", jumlah_exc:	102300},
            {no_dokumen_excel: "004180", jumlah_exc:	38988},
            {no_dokumen_excel: "004179", jumlah_exc:	47855},
            {no_dokumen_excel: "004210", jumlah_exc:	92840},
            {no_dokumen_excel: "004341", jumlah_exc:	55386},
            {no_dokumen_excel: "003768", jumlah_exc:	105521},
            {no_dokumen_excel: "004109", jumlah_exc:	59453},
            {no_dokumen_excel: "004308", jumlah_exc:	46664},
            {no_dokumen_excel: "004275", jumlah_exc:	96752},
            {no_dokumen_excel: "004365", jumlah_exc:	79106},
            {no_dokumen_excel: "004396", jumlah_exc:	20810},
            {no_dokumen_excel: "004454", jumlah_exc:	20395},
            {no_dokumen_excel: "004455", jumlah_exc:	108436},
            {no_dokumen_excel: "004537", jumlah_exc:	41604},
            {no_dokumen_excel: "004538", jumlah_exc:	36809},
            {no_dokumen_excel: "004728", jumlah_exc:	176016},
            {no_dokumen_excel: "004342", jumlah_exc:	194099},
            {no_dokumen_excel: "004662", jumlah_exc:	109150},
            {no_dokumen_excel: "004484", jumlah_exc:	130802},
            {no_dokumen_excel: "004281", jumlah_exc:	112270},
            {no_dokumen_excel: "004324", jumlah_exc:	105303},
            {no_dokumen_excel: "005006", jumlah_exc:	29425},
            {no_dokumen_excel: "004366", jumlah_exc:	87257},
            {no_dokumen_excel: "004395", jumlah_exc:	165446},
            {no_dokumen_excel: "004471", jumlah_exc:	150321},
            {no_dokumen_excel: "004472", jumlah_exc:	104118},
            {no_dokumen_excel: "004629", jumlah_exc:	84198},
            {no_dokumen_excel: "004630", jumlah_exc:	59018},
            {no_dokumen_excel: "004659", jumlah_exc:	88848},
            {no_dokumen_excel: "004688", jumlah_exc:	159555},
            {no_dokumen_excel: "004759", jumlah_exc:	138463},
            {no_dokumen_excel: "004760", jumlah_exc:	128396},
            {no_dokumen_excel: "004825", jumlah_exc:	187511},
            {no_dokumen_excel: "004923", jumlah_exc:	61747},
            {no_dokumen_excel: "004922", jumlah_exc:	104244},
            {no_dokumen_excel: "004922", jumlah_exc:	22887},
            {no_dokumen_excel: "004980", jumlah_exc:	2837},
            {no_dokumen_excel: "004980", jumlah_exc:	28635},
            {no_dokumen_excel: "004980", jumlah_exc:	26100},
            {no_dokumen_excel: "004834", jumlah_exc:	585090},
            {no_dokumen_excel: "004934", jumlah_exc:	163652},
            {no_dokumen_excel: "004981", jumlah_exc:	148098},
            {no_dokumen_excel: "004958", jumlah_exc:	200135},
            {no_dokumen_excel: "005699", jumlah_exc:	12542},
            {no_dokumen_excel: "005700", jumlah_exc:	33773},
            {no_dokumen_excel: "010419", jumlah_exc:	8845},
            {no_dokumen_excel: "010313", jumlah_exc:	46680},
            {no_dokumen_excel: "010314", jumlah_exc:	45827},
            {no_dokumen_excel: "010418", jumlah_exc:	12850},
            {no_dokumen_excel: "010416", jumlah_exc:	8280},
            {no_dokumen_excel: "010417", jumlah_exc:	23720},
            {no_dokumen_excel: "010415", jumlah_exc:	7135},
            {no_dokumen_excel: "010414", jumlah_exc:	12875},
            {no_dokumen_excel: "010544", jumlah_exc:	38205},
            {no_dokumen_excel: "010543", jumlah_exc:	3775},
            {no_dokumen_excel: "010542", jumlah_exc:	45141},
            {no_dokumen_excel: "010540", jumlah_exc:	38070},
            {no_dokumen_excel: "010539", jumlah_exc:	11860},
            {no_dokumen_excel: "010537", jumlah_exc:	131065},
            {no_dokumen_excel: "010709", jumlah_exc:	36580},
            {no_dokumen_excel: "010685", jumlah_exc:	53808},
            {no_dokumen_excel: "009237", jumlah_exc:	42581},
            {no_dokumen_excel: "010749", jumlah_exc:	15415},
            {no_dokumen_excel: "009162", jumlah_exc:	50614},
            {no_dokumen_excel: "009227", jumlah_exc:	50071},
            {no_dokumen_excel: "010750", jumlah_exc:	45133},
            {no_dokumen_excel: "010751", jumlah_exc:	42366},
            {no_dokumen_excel: "011238", jumlah_exc:	3775},
            {no_dokumen_excel: "011243", jumlah_exc:	3020},
            {no_dokumen_excel: "011445", jumlah_exc:	36505},
            {no_dokumen_excel: "011462", jumlah_exc:	8288},
            {no_dokumen_excel: "011415", jumlah_exc:	49292},
            {no_dokumen_excel: "011452", jumlah_exc:	21775},
            {no_dokumen_excel: "012682", jumlah_exc:	46598},
            {no_dokumen_excel: "013010", jumlah_exc:	46263},
            {no_dokumen_excel: "012346", jumlah_exc:	34798},
            {no_dokumen_excel: "012443", jumlah_exc:	33470},
            {no_dokumen_excel: "012444", jumlah_exc:	33074},
            {no_dokumen_excel: "013068", jumlah_exc:	14866},
            {no_dokumen_excel: "013081", jumlah_exc:	18493},
            {no_dokumen_excel: "013082", jumlah_exc:	38547},
            {no_dokumen_excel: "012387", jumlah_exc:	9170},
            {no_dokumen_excel: "012347", jumlah_exc:	9170},
            {no_dokumen_excel: "013734", jumlah_exc:	41790},
            {no_dokumen_excel: "012086", jumlah_exc:	430},
            {no_dokumen_excel: "012512", jumlah_exc:	400},
            {no_dokumen_excel: "012560", jumlah_exc:	600},
            {no_dokumen_excel: "013147", jumlah_exc:	600},
            {no_dokumen_excel: "013599", jumlah_exc:	70},
            {no_dokumen_excel: "013922", jumlah_exc:	42798},
            {no_dokumen_excel: "014631", jumlah_exc:	61574},
            {no_dokumen_excel: "016076", jumlah_exc:	900},
            {no_dokumen_excel: "014719", jumlah_exc:	52385},
            {no_dokumen_excel: "12559", jumlah_exc:	2000},
            {no_dokumen_excel: "014401", jumlah_exc:	2514},
            {no_dokumen_excel: "013040", jumlah_exc:	1192},
            {no_dokumen_excel: "014712", jumlah_exc:	33359},
            {no_dokumen_excel: "015069", jumlah_exc:	6720},
            {no_dokumen_excel: "016584", jumlah_exc:	3836},
            {no_dokumen_excel: "015739", jumlah_exc:	48228},
            {no_dokumen_excel: "016622", jumlah_exc:	47731},
            {no_dokumen_excel: "014936", jumlah_exc:	13768},
            {no_dokumen_excel: "015176", jumlah_exc:	19051},
            {no_dokumen_excel: "014207", jumlah_exc:	4000},
            {no_dokumen_excel: "015837", jumlah_exc:	12803},
            {no_dokumen_excel: "016333", jumlah_exc:	3985},
            {no_dokumen_excel: "014690", jumlah_exc:	23964},
            {no_dokumen_excel: "016043", jumlah_exc:	48021},
            {no_dokumen_excel: "015086", jumlah_exc:	19866},
            {no_dokumen_excel: "016335", jumlah_exc:	16580},
            {no_dokumen_excel: "01469", jumlah_exc:	456},
            {no_dokumen_excel: "015173", jumlah_exc:	18426},
            {no_dokumen_excel: "014718", jumlah_exc:	2000},
            {no_dokumen_excel: "016208", jumlah_exc:	8155},
            {no_dokumen_excel: "014717", jumlah_exc:	3504},
            {no_dokumen_excel: "014717", jumlah_exc:	1824},
            {no_dokumen_excel: "014996", jumlah_exc:	1680},
            {no_dokumen_excel: "016046", jumlah_exc:	151142},
            {no_dokumen_excel: "015335", jumlah_exc:	5290},
            {no_dokumen_excel: "015743", jumlah_exc:	52074},
            {no_dokumen_excel: "015802", jumlah_exc:	43753},
            {no_dokumen_excel: "016169", jumlah_exc:	54610},
            {no_dokumen_excel: "016339", jumlah_exc:	495},
            {no_dokumen_excel: "015668", jumlah_exc:	4500},
            {no_dokumen_excel: "016174", jumlah_exc:	43058},
            {no_dokumen_excel: "016585", jumlah_exc:	52933},
            {no_dokumen_excel: "016704", jumlah_exc:	43875},
            {no_dokumen_excel: "015941", jumlah_exc:	1344},
            {no_dokumen_excel: "016782", jumlah_exc:	16056},
            {no_dokumen_excel: "016077", jumlah_exc:	3375},
            {no_dokumen_excel: "016338", jumlah_exc:	4072},
            {no_dokumen_excel: "016340", jumlah_exc:	54},
            {no_dokumen_excel: "017092", jumlah_exc:	654},
            {no_dokumen_excel: "016814", jumlah_exc:	896},
            {no_dokumen_excel: "016733", jumlah_exc:	20607},
            {no_dokumen_excel: "016730", jumlah_exc:	6820},
            {no_dokumen_excel: "016815", jumlah_exc:	2300},
            ],
            search: '',
            search2: '',
            penjualan_head: '',
            penjualan_detail: '',
            jmlexc: 0,
            jmlinv: 0,
            wrong: [],
            periode: ['2022-01-01', '2022-12-31']
        }
    },
    computed: {
      dataitem() {
        let a = []
        for (let i = 0; i < this.penjualan_detail.length; i++) {
          for (let j = 0; j < this.penjualan_head.length; j++) {
            if(this.penjualan_detail[i].no_penjualan == this.penjualan_head[j].no_penjualan) {
              a.push({
                no_penjualan: this.penjualan_detail[i].no_penjualan,
                no_dokumen: this.penjualan_head[j].no_dokumen,
                jumlah: this.penjualan_detail[i].jumlah,
              })
            }
          }
        }
        return a
      },
      alldata() {
        let a = []
        for (let i = 0; i < this.excel.length; i++) {
          for (let j = 0; j < this.dataitem.length; j++) {
            if(this.excel[i].no_dokumen_excel == this.dataitem[j].no_dokumen && this.excel[i].jumlah_exc == this.dataitem[j].jumlah) {
              a.push({
                no_penjualan: this.dataitem[j].no_penjualan,
                no_dokumen: this.dataitem[j].no_dokumen,
                jumlah: this.dataitem[j].jumlah,
                no_dokumen_excel: this.excel[i].no_dokumen_excel,
                jumlah_exc: this.excel[i].jumlah_exc,
              })
            }
          }
        } return a
      },
    },
    methods: {
      onResize() {
        this.windowWidth = window.innerWidth
      },
      async fetchData() {
        this.penjualan_head = await api.getPenjualanHead(this.periode)
        this.penjualan_detail = await api.getPenjualanDetail(this.periode)
      },
      lost() {
        for (let i = 0; i < this.alldata.length; i++) {
            if(this.alldata[i].no_dokumen_excel == '') {
              return {
                no_penjualan: this.dataitem[i].no_penjualan,
                no_dokumen: this.dataitem[i].no_dokumen,
                jumlah: this.dataitem[i].jumlah,
                no_dokumen_excel: this.excel[i].no_dokumen_excel,
                iumlah_exc: this.excel[j].jumlah_exc,
              }
          }
        }
      },
      dataexcel(nodok, jml, p){
        for (let i = 0; i < this.excel.length; i++) {
          if(this.excel[i].no_dokumen_excel == nodok && this.excel[i].jumlah_exc == jml) {
            if(p == 'bc') {
              return this.excel[i].no_dokumen_excel
            }
            if(p == 'jml') {
              return this.excel[i].jumlah_exc
            }
          } 
        }
      },
      datai(nodok, jml, p){
        for (let i = 0; i < this.dataitem.length; i++) {
          if(this.dataitem[i].no_dokumen == nodok && this.dataitem[i].jumlah == jml) {
            if(p == 'bc') {
              return this.dataitem[i].no_dokumen
            }
            if(p == 'jml') {
              return this.dataitem[i].jumlah
            }
          } 
        }
      },
      sumValue(value, p) {
        let sum = 0;
          for (let i = 0; i < value.length; i++ ) {
            if(p == 'inv') {
              sum += value[i].jumlah;
            }
            if(p == 'exc') {
              sum += value[i].jumlah_exc;
            }
          }
        
        return sum
      },
      minValue(v1, v2) {
        return functions.numb(v1- v2)
      }
    },

    mounted() {
      this.$nextTick(() => {
        window.addEventListener('resize', this.onResize)
      })
      this.fetchData()
    }
}
</script>

<template>
  <v-div class="d-flex">
    <text-field v-model="search"></text-field>
    <text-field v-model="search2"></text-field>
  </v-div>
  <v-div class="d-flex w-100">
    <v-span class="w-50">Data Program</v-span>
    <v-span>Data Excel</v-span>
  </v-div>
  <v-sheet class="w-100 d-flex">
    <v-data-table
    items-per-page="10"
    :headers="headers"
    :items="dataitem"
    :search="search"
    :hover="true"
    :fixed-header="true"
    density="compact"
    class="text-caption border-sm h-100"
    height="80vh"
    >
    <!-- eslint-disable-next-line vue/valid-v-slot -->
    <template v-slot:item.no_dokumen_excel="{ item }">
      <td :class="dataexcel(item.raw.no_dokumen, item.raw.jumlah, 'bc') ? '' : 'bg-red'">{{ dataexcel(item.raw.no_dokumen, item.raw.jumlah, 'bc') ? dataexcel(item.raw.no_dokumen, item.raw.jumlah, 'bc') : 'null'}}</td>
    </template>
    <!-- eslint-disable-next-line vue/valid-v-slot -->
    <template v-slot:item.jumlah_exc="{ item }">
      <td :class="dataexcel(item.raw.no_dokumen, item.raw.jumlah, 'jml') ? '' : 'bg-red'">{{ dataexcel(item.raw.no_dokumen, item.raw.jumlah, 'jml') ? dataexcel(item.raw.no_dokumen, item.raw.jumlah, 'jml') : 'null'}}</td>
    </template>
    </v-data-table>
    <v-data-table
    items-per-page="10"
    :headers="headers.slice(1, headers.length)"
    :items="excel"
    :search="search2"
    :hover="true"
    :fixed-header="true"
    density="compact"
    class="text-caption border-sm h-100"
    height="80vh"
    >
    <!-- eslint-disable-next-line vue/valid-v-slot -->
    <template v-slot:item.no_dokumen="{ item }">
      <td :class="datai(item.raw.no_dokumen_excel, item.raw.jumlah_exc, 'bc') ? '' : 'bg-red'">{{ datai(item.raw.no_dokumen_excel, item.raw.jumlah_exc, 'bc') ? datai(item.raw.no_dokumen_excel, item.raw.jumlah_exc, 'bc') : 'null'}}</td>
    </template>
    <!-- eslint-disable-next-line vue/valid-v-slot -->
    <template v-slot:item.jumlah="{ item }">
      <td :class="datai(item.raw.no_dokumen_excel, item.raw.jumlah_exc, 'jml') ? '' : 'bg-red'">{{ datai(item.raw.no_dokumen_excel, item.raw.jumlah_exc, 'jml') ? datai(item.raw.no_dokumen_excel, item.raw.jumlah_exc, 'jml') : 'null'}}</td>
    </template>
    </v-data-table>
  </v-sheet>
  <v-container class="w-100">
      <v-span>total data (invetori) : {{ penjualan_detail.length }} data</v-span> <br />
      <v-span>total data (excel) : {{ excel.length }} data</v-span> <br />
      <br/>
      <v-span>jumlah (invetori) : {{ (sumValue(penjualan_detail, 'inv')) }}</v-span> <br />
      <v-span>jumlah (excel) : {{ sumValue(excel, 'exc') }}</v-span> <br />
      <br />
      <v-span>selisih : {{ minValue(sumValue(penjualan_detail, 'inv'), sumValue(excel, 'exc'))  }}</v-span> <br />
      <br />
      <v-container contenteditable></v-container>
    </v-container>
</template>
