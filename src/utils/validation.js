import alert from "./alert";

export default {
    validate(rules, input, data) {
        let fl = ''
        let res = []
        let mess = []
        if(rules || typeof rules != 'object') {
          fl = rules?.filter(item => item.rules != undefined)
          if(fl == '') {
            for (let i = 0; i < rules.length; i++) {
              let s_rules = rules[i].split(' ')
              let k_rules = s_rules[0]
              let target = s_rules[1]
              if (k_rules == 'required' && target) {
                if(data[target] != undefined) res.push(true)
                else {
                  res.push(false)
                  mess.push(target.split('_').join(' ') + ' belum diisi')
                }
              } else if (rules[0] == 'absolute') {
                this.detailDump = ''
                res.push(true)
              }
            }
          } else {
            for (let i = 0; i < fl.length; i++) {
              if(fl[i].rules) {
                for (let j = 0; j < fl[i].rules.length; j++) {
                  let s_rules = fl[i].rules[j].split(' ')
                  let k_rules = s_rules[0]
                  let target = s_rules[1]
                  if(fl[i].rules[j] == 'unique') {
                    let a = data ? data.find(item => item[fl[i].key] == input[fl[i].key]) : null
                    if(a == undefined || a == null) res.push(true)
                    else {
                      res.push(false)
                      mess.push(input[fl[i].key] + ' sudah diinput')
                    }
                  } else if(fl[i].rules[j] == 'required') {
                    if(input && input[fl[i].key] != undefined && input[fl[i].key] != '') res.push(true)
                    else {
                      res.push(false)
                      mess.push('\n'+fl[i].title + '\nbelum diisi')
                    }
                    res.push(true)
                  } else if(k_rules == 'min' && input[fl[i].key] != undefined && input[fl[i].key] != '') {
                    if(input[fl[i].key].length >= target) res.push(true)
                    else {
                      res.push(false)
                      mess.push(fl[i].key + ' tidak boleh kurang dari ' + target + ' karakter')
                    }
                  }
                }
              } else res.push(true)
            }
          }
        } else res.push(true)
        // false checker
        let f = res.filter(it => it = false)
        if(mess == '' && f == '') return true
        else alert.warning(null, mess)
    }
}