import {units} from './doe2units.js'


function prepHSR(data) {

    let data_array = []
      let split = data.split("\n")
  
    let rows = split.slice(10)
    let cols = split.slice(4, 10)
  
    let col_obj = cols[3].replace(/, /g, "_").replace(/"/g, "").split(",")
    let col_rpt = cols[5].replace(/, /g, "_").replace(/"/g, "").split(",")
    let unit_type = cols[2].replace(/, /g, "_").replace(/"/g, "").split(",")
      
    let numcols = col_rpt.length
  
    let colparse = []
    let unit_type_parse = []
  
    let val = '-'
    let unitval = '-'
    for (let i = 0; i < numcols; i++) {
      let topcol = col_obj[i]
      let bottomcol = col_rpt[i]
      let unitcol = unit_type[i]
  
      if (topcol == '') {
        topcol = val
        unitcol = unitval
      }
      else {
        val = topcol
        unitval = unitcol
      }
      colparse.push(topcol + ', ' + bottomcol)
      unit_type_parse.push(unitcol)
    }
  
  
  
  
    // concatenate data
    for (let row in rows) {
      let cols = rows[row].split(',')
  
      if (cols.length > 1) {
  
        let month = cols[0]
        let day = cols[1]
        let hour = cols[2]
        let time = new Date(month + '/' + day + " " + hour + ":00")
  
        let colobj = {}
        for (let col in cols) {
  
          let colname;
          let unit, unit_type, col_lookup;
          unit_type = unit_type_parse[col]
  
          try {
            col_lookup = colparse[col].split(", ")[1].replace(/_/g, ", ")
            unit = units[unit_type][col_lookup]
            if (unit == undefined  || unit == "*") {
              colname = colparse[col].replace(/_/g, ", ")
            }
            else {
              colname = colparse[col].replace(/_/g, ", ") + " (" + unit + ")"
            }
          }
          catch {
            colname = colparse[col]
          }
          try {
            colobj[colname] = +cols[col]
          }
          catch {
            colobj[colname] = cols[col]
          }
        }
        colobj['Time'] = time
  
        delete colobj['-, Day']
        delete colobj['-, Hour']
        delete colobj['-, Month']
        delete colobj['-, Type']
  
        if ('undefined' in colobj) {
          delete colobj['undefined']
        }
        data_array.push(colobj)
      }
    }
  
    let unfound = []
    for (let i = 0; i < Object.keys(data_array[0]).length; i++) {
      let colname = Object.keys(data_array[0])[i]
      if (colname.split("(").length == 1) {
        unfound.push(colname)
      }
    }
    if (unfound.length > 0) {
      console.warn('Units for the following units were not found: ')
      console.warn(unfound)
    }
    return data_array
  
  }


  export {prepHSR}