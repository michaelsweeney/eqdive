

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

  // basic csv parse
  let colparse = []
  for (let col in cols) {

    let colsplit = cols[col].split(",")
    let val = ''
    let colrow = []

    for (let col in colsplit) {
      if (colsplit[col] == '') {
        col = val
        colrow.push(col)
      }
      else {
        colrow.push(colsplit[col])
        val = colsplit[col]
      }
    }
    colparse.push(colrow)
  }

  // concatenate and format columns
  let col_array = []
  let height = colparse.length
  let width = colparse[0].length

  for (let w = 0; w < width; w++) {
    let thiscol = ''
    for (let h = 0; h < height; h++) {
      if (thiscol == '') {
        if (colparse[h][w] != '') {
          thiscol = thiscol + ', ' + colparse[h][w].replace(/"/g, "")
          thiscol = colparse[h][w].replace(/"/g, "")
        }
      }
      else {
        if (colparse[h][w] != '') {
          thiscol = thiscol + ', ' + colparse[h][w].replace(/"/g, "")
        }
      }
    }
    col_array.push(thiscol)
  }

  // concatenate data
  for (let row in rows) {
    let cols = rows[row].split(',')
    if (cols.length > 1) {
      data_array.push(cols)
    }
  }
  console.log(col_array)
  console.log(data_array)
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



























