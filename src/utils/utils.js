import { format } from 'date-fns';

export default {
	formatDate(value) {
		let options = {
			day: "2-digit",
			year: "numeric",
			month: "long",
		};
		// let getHour = new Date(value).toLocaleTimeString('id', {timeStyle:'short'})
		let date = new Date(value).toLocaleDateString("id", options);
		if (value != '-') {
			return date;
		} else return "-";
	},
	formatMonth(value) {
		let option = {
			year: "numeric",
			month: "long"
		}
		let date = new Date(value).toLocaleDateString("id", option);
		return date
	},
	today() {
        let currentDate = format(new Date(), 'yyyy-MM-dd')
		return currentDate
        // return currentDate.toLocaleDateString().slice(0, 10);
    },
	 last_month() {
      // set a month
      let d = new Date();
      let m = d.getMonth();
      d.setMonth(d.getMonth() - 1);
      
      if (d.getMonth() == m) d.setDate(0)

      // set a week
      // d.setDate(d.getDate() - 7)

      //tl_awal
      return format(d, 'yyyy-MM-dd')
    },
	numb(value) {
		let val = (value / 1).toFixed(2).replace(",", ",");
		if (
			val
				.toString()
				.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
				.slice(-2) == "00"
		) {
			let a = (value / 1).toFixed(0).replace(",", ",");
			return a.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
		} else {
			let b = (value / 1).toFixed(2).replace(",", ",");
			return b.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
		}
	},
	TimeNow() {
		const now = new Date();
        const formattedTime = now.toLocaleTimeString('ID')
        return formattedTime
	}
};