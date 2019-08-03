
import * as ctrl from './control.js'
import * as layout from './layout.js'


export function table(tag) {

  let tagsplit = tag.split(','),
    file = strip(tagsplit[0]),
    reportname = strip(tagsplit[1]),
    reportfor = strip(tagsplit[2]),
    tablename = strip(tagsplit[3])


  let table = new Object();
  table.file = file
  table.reportname = reportname
  table.tablename = tablename
  table.reportfor = reportfor
  table.array = []
  table.rownames = {}
  table.colnames = {}
  table.units = {}
  table.objnest = {}

  let query = "SELECT rptfrstr.Value as ReportForString, rptstr.Value as ReportName, tblstr.Value as TableName, unitstr.Value as Units, rowstr.Value as RowName, colstr.Value as ColName, td.RowID, td.ColumnId, td.Value as Value from TabularData as td INNER JOIN Strings as rptstr ON rptstr.StringIndex =  td.ReportNameIndex INNER JOIN Strings as rptfrstr ON rptfrstr.StringIndex = td.ReportForStringIndex INNER JOIN Strings as tblstr ON tblstr.StringIndex = td.TableNameIndex INNER JOIN Strings as unitstr ON unitstr.StringIndex = td.UnitsIndex INNER JOIN Strings as rowstr ON rowstr.StringIndex = td.RowNameIndex INNER JOIN Strings as colstr ON colstr.StringIndex = td.ColumnNameIndex WHERE ReportName = '" + reportname + "' AND ReportForString = '" + reportfor + "' AND TableName = '" + tablename + "'"

  let db = new sqlite3.Database(file);
  db.allAsync(query, [], (err, rows) => {
    if (err) {
      throw err;
    }
    db.close();
  }).then((rows) => {

    for (let i = 0; i < rows.length; i++) {
      let row = rows[i]
      rowobj = {
        'ColumnId': row.ColumnId,
        'RowId': row.RowId,
        'Value': strip(row.Value)
      }

      if (row.RowId in table.objnest) {
        table.objnest[row.RowId][row.ColumnId] = strip(row.Value)
      }
      else {
        table.objnest[row.RowId] = {}
        table.objnest[row.RowId][row.ColumnId] = strip(row.Value)
      }

      table.rownames[row.RowId] = row.RowName
      table.colnames[row.ColumnId] = row.ColName
      table.units[row.ColumnId] = row.Units
      table.array.push(rowobj)
    }

    // make actual table


    let html_reportfor = document.createElement('h6');
    let html_tablename = document.createElement('h6');
    let html_reportname = document.createElement('h6');

    html_reportfor.textContent = table.reportfor
    html_tablename.textContent = table.tablename
    html_reportname.textContent = table.reportname



    let htmltable = document.createElement('table');
    let header = document.createElement('tr');

    let nullhead = document.createElement('td');
    nullhead.textContent = ''
    header.appendChild(nullhead)

    for (let j = 0; j < Object.keys(table.colnames).length; j++) {
      let headcell = document.createElement('th')
      headcell.textContent = table.colnames[j];
      header.appendChild(headcell)
    }
    htmltable.appendChild(header)


    let units = document.createElement('tr');
    let nullunits = document.createElement('td');
    nullunits.textContent = ''
    units.appendChild(nullunits)

    for (let j = 0; j < Object.keys(table.units).length; j++) {
      let unitcell = document.createElement('th')
      unitcell.textContent = table.units[j];
      units.appendChild(unitcell)
    }
    htmltable.appendChild(units)

    for (let i = 0; i < Object.keys(table.objnest).length; i++) {
      let row = document.createElement('tr');
      let index = document.createElement('th')
      index.textContent = table.rownames[i]
      row.appendChild(index)

      for (let j = 0; j < Object.keys(table.objnest[i]).length; j++) {
        let cell = document.createElement('td');
        cell.textContent = table.objnest[i][j];
        row.appendChild(cell);
      }
      htmltable.appendChild(row);
    }


    let body = document.getElementsByTagName('body')[0]

    let tablediv = document.createElement('div')
    tablediv.setAttribute("class", "tablediv")


    tablediv.appendChild(html_reportname)
    tablediv.appendChild(html_tablename)
    tablediv.appendChild(html_reportfor)



    tablediv.appendChild(htmltable)
    body.appendChild(tablediv)
  })

  return table
}