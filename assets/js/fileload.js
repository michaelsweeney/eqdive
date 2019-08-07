import {units} from './doe2units.js'
console.log(units)


let load = {
  csv: d3.csv,
  sql: '',
  hsr: d3.text
}

let prep = {
  csv: prepCSV,
  sql: '',
  hsr: prepHSR,
}





function prepCSV(data) {
  for (let i = 0; i < data.length; i++) {
    let row = data[i]
    let cols = Object.keys(row)
    for (let n = 0; n < cols.length; n++) {
      if (cols[n] != 'Time') {
        data[i][cols[n]] = +data[i][cols[n]]
      }
      else {
        data[i][cols[n]] = new Date(data[i][cols[n]])
      }
    }
  }
  return data
}



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
            // console.log('units not found in \'doe2units.js\' file: ')
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

  // console.log(Object.values(data_array[0]))


  // test to see if units have been detected

  let unfound = []
  for (let i = 0; i < Object.keys(data_array[0]).length; i++) {
    let colname = Object.keys(data_array[0])[i]
    if (colname.split("(").length == 1) {
      unfound.push(colname)
    }
  }
  if (unfound.length > 0) {
    console.log('Units for the following units were not found: ')
    console.log(unfound)
  }
  return data_array

}

export { load, prep }









// function getSql(selections) {
//   added = []
//   selections.forEach((sel) => {
//     let seltype;
//     let selparse = getExt(sel)
//     if (selparse == 'sql') {seltype =  'file'} 
//     else {seltype = 'dir'}

//     if (seltype == 'file') {
//       added.push(sel)
//     }
//     else {
//       let sqls = findExtInDir(sel, 'sql')
//       sqls.forEach((sql) =>{
//         added.push(sql)
//       })
//     }
//   })
//   return added
// }



// function addFiles() {
//   let selection = dialog.showOpenDialog({
//     properties: ['openFile', 'openDirectory', 'multiSelections'],
//       filters: [
//         { name: 'sqls', extensions: ['sql'] }],
//   })
//   let added = getSql(selection)

//   addOptionsToSelect(added, 'loadselect');
//   updateAvailTimeSeries();
//   updateAvailTabularSeries();
// }




// function updateAvailTimeSeries() {

//   // DOM elements
//   let fileselect = document.getElementById('loadselect')
//   let fileoptions = fileselect.options
//   let timeseriesselect = document.getElementById('timeseriesavail')

//   //clear list
//   clearSelect(timeseriesselect)

//   //loop through files
//   for (i = 0; i < fileoptions.length; i++) {
//     let file = fileoptions[i].value
//     let db = new sqlite3.Database(file);
//     let query = "SELECT * FROM ReportDataDictionary WHERE ReportingFrequency = 'Hourly'";

//     db.all(query, [], (err, rows) => {
//       if (err) {
//         throw err;
//       }
//       db.close();

//       //loop through each row in matching file
//       for (i = 0; i < Object.keys(rows).length; i++) {
//         let row = rows[i]
//         row.FilePath = file
//         row.FileName = file.split(/[\\\/]/).slice(-1)[0].replace('.sql','')

//         let seriesname = row.FileName + ", "  + row.IndexGroup + ", " + row.KeyValue + ", " + row.Name + ", " + row.Units 
//         row.seriesname = seriesname // for subsequent lookup

//         // add DOM elements
//         let opt = document.createElement('option');
//         let metatag = row.FilePath + ", " + row.ReportDataDictionaryIndex
//         opt.setAttribute('data-tag', metatag)   
//         opt.appendChild(document.createTextNode(seriesname));
//         opt.value = seriesname;
//         timeseriesselect.appendChild(opt)
//       }
//   })
//   }
// }


// function updateAvailTabularSeries() {

//   // DOM elements
//   let fileselect = document.getElementById('loadselect')
//   let fileoptions = fileselect.options
//   let tabularselect = document.getElementById('tabularavail')

//   //clear list
//   clearSelect(tabularselect)

//   //loop through files
//   for (i = 0; i < fileoptions.length; i++) {
//     let file = fileoptions[i].value
//     let db = new sqlite3.Database(file);

//     let query = "SELECT DISTINCT reportn.Value As ReportName, fs.Value As ReportForString, tn.Value As TableName FROM TabularData As td INNER JOIN Strings As reportn ON reportn.StringIndex=td.ReportNameIndex INNER JOIN Strings As fs ON fs.StringIndex=td.ReportForStringIndex INNER JOIN Strings As tn ON tn.StringIndex=td.TableNameIndex WHERE tn.StringTypeIndex = 1 OR tn.StringTypeIndex = 2 OR tn.StringTypeIndex = 3 AND td.Value = ''"

//     db.all(query, [], (err, rows) => {
//       if (err) {
//         throw err;
//       }
//       db.close();

//       //loop through each row in matching file
//       for (i = 0; i < Object.keys(rows).length; i++) {
//         let row = rows[i]
//         row.FilePath = file
//         row.FileName = file.split(/[\\\/]/).slice(-1)[0].replace('.sql','')

//         let seriesname = row.FileName + ", "  + row.ReportName + ", " + row.ReportForString + ", " + row.TableName
//         row.seriesname = seriesname // for subsequent lookup

//         let metatag = row.FilePath + ", "  + row.ReportName + ", " + row.ReportForString + ", " + row.TableName

//         // add DOM elements
//         let opt = document.createElement('option');
//         opt.appendChild(document.createTextNode(seriesname));
//         opt.setAttribute('data-tag', metatag)
//         opt.value = seriesname;
//         tabularselect.appendChild(opt)
//       }
//   })
//   }
// }



























