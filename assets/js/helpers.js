function strip(str) { // helper
  return str.replace(/^\s+|\s+$/g, '');
}

function getExt(file) {
  return file.split('.').pop()
}



// find all 'ext' files within 'dir'
function findExtInDir(dir, ext) {
  filearray = []
  let files = fs.readdirSync(dir);
  files.forEach((file) => {
    if (getExt(file) == ext) {
      filearray.push(dir + '/' + file)
    }
  })
  return filearray
}







// sql / TS helpers
sqlite3.Database.prototype.allAsync = function (query) {
  let that = this;
  return new Promise((resolve, reject) => {
    that.all(query, (err, row) => {
      if (err)
        reject(err);
      else
        resolve(row);
    });
  });
};

function timePad(tstring) {
  if (tstring.length == 1) {
    return '0' + tstring
  }
  else { return tstring }
}


function prepSeries(tag) {
  let tagsplit = tag.split(',')
  let file = tagsplit[0]
  let idx = tagsplit[1]

  let query = "SELECT ReportData.Value, ReportDataDictionary.Units, ReportDataDictionary.TimestepType, ReportDataDictionary.KeyValue, ReportDataDictionary.Name, Time.Month, Time.Day, Time.Hour, Time.Minute from ReportData INNER JOIN ReportDataDictionary ON ReportData.ReportDataDictionaryIndex = ReportDataDictionary.ReportDataDictionaryIndex INNER JOIN Time ON ReportData.TimeIndex = Time.TimeIndex WHERE ReportData.ReportDataDictionaryIndex = " + idx

  return { 'query': query, 'dbfile': file }

}


function prepRow(row) {
  let d = row
  let timeparse = d3.timeParse("%d/%m/%y %H:%M")
  let hour = d.Hour.toString()
  let day = d.Day.toString()
  let month = d.Month.toString()
  let minute = d.Minute.toString()
  let year = "19"
  let time = timePad(day) + "/" + timePad(month) + "/" + year + " " + timePad(hour) + ":" + timePad(minute)
  d.time = timeparse(time)
  d.Value = +parseInt(d.Value)
  d.dayofyear = +d3.timeFormat("%j")(d.time)
  d.timeofday = +d3.timeFormat("%H")(d.time)

  delete d.hour
  delete d.day
  delete d.month
  delete d.minute
  delete d.year
}



function refreshSelect(selfrom, selto) { // refreshes select options in 'selfrom' into 'selto'. kinda janky way to get around async's but helpful w/ set-timeouts
  let options = d3.select(selfrom).selectAll('option')["_groups"][0]
  let select = d3.select(selto)
  select.selectAll('option')
    .data(options)
    .attr('value', (d) => {
      return d.getAttribute('data-tag')
    })
    .text((d) => { return d.text; })
    .enter()
    .append('option')
    .attr('value', (d) => {
      return d.getAttribute('data-tag')
    })
    .text((d) => { return d.text; })
    .exit().remove();
}


function dataToJSON(data) { // only need to retain original dataset (i.e. if bound data is modified post load)
  let dJSON = {}
  for (let i = 0; i < Object.keys(data).length; i++) {
    let obj = JSON.stringify(data[i])
    dJSON[i] = obj
  }
  return JSON.stringify(dJSON)
}

function dataFromJSON(data_array) {
  let data_obj_to_array = []
  let data = JSON.parse(data_array)
  for (let i = 0; i < Object.keys(data).length; i++) {
    data[i] = JSON.parse(data[i])
    data_obj_to_array.push(data[i])
  }
  return data_obj_to_array
}
