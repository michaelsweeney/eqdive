

function handleSQL() {
  


}

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









export {handleSQL}

















