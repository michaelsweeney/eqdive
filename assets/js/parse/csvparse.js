
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



export {prepCSV}