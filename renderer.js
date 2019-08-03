const { dialog } = nodeRequire('electron').remote
const glob = nodeRequire('glob');
const { PythonShell } = nodeRequire('python-shell');
const Store = nodeRequire('electron-store');
const sqlite3 = nodeRequire('sqlite3')
const fs = nodeRequire('fs');
const store = new Store();
const ipcRenderer = nodeRequire('electron').ipcRenderer
const log = console.log






// handle event listeners and general window onloads
window.onload = () => {

  const addfilesbtn = document.getElementById('add-files-btn');
  addfilesbtn.addEventListener('click', addFiles)

  const removefilesbtn = document.getElementById('remove-files-btn');
  removefilesbtn.addEventListener('click', () => {removeSelectedOptions('loadselect'), updateAvailTimeSeries(), updateAvailTabularSeries();})

  const loadseriesbtn = document.getElementById('loadseriesbutton');
  loadseriesbtn.addEventListener('click', () => {loadTimeSeries('timeseriesavail')})

  const loadtabularbtn = document.getElementById('loadtabularbutton');
  loadtabularbtn.addEventListener('click', () => {loadTabular('tabularavail')})

  const tabularfilter = document.getElementById('tabularfilter');
  tabularfilter.addEventListener('keyup', () => {filterSelect('tabularfilter', 'tabularavail')})

  const seriesfilter = document.getElementById('seriesfilter');
  seriesfilter.addEventListener('keyup', () => {filterSelect('seriesfilter', 'timeseriesavail')})



  // dev: pre-populate info
  const devpopbtn = document.getElementById('dev-populate');
  devpopbtn.addEventListener('click', () => {
    
    
    // load a file
    let added = ['/Users/michaelsweeney/Documents/energyplus files/chop/Building1FoundryProp_eplusout.sql']
    addOptionsToSelect(added, 'loadselect');
    updateAvailTimeSeries();
    updateAvailTabularSeries();

    // make sample table
    let tag = "/Users/michaelsweeney/Documents/energyplus files/chop/Building1FoundryProp_eplusout.sql, AnnualBuildingUtilityPerformanceSummary, Entire Facility, End Uses"
    // getTable(tag)

    // load a series
    // let seriestag = '/Users/michaelsweeney/Documents/energyplus files/chop/Building1FoundryProp_eplusout.sql, 15'
    // getSeries(seriestag)
  })



  // do regardless onload

    // load a file
    let added = ['/Users/michaelsweeney/Documents/energyplus files/chop/Building1FoundryProp_eplusout.sql']
    // let added_pc = ['P:/_Projects/190000/197142-000/D-Design Mgmt/Calc/Energy/DesignBuilder/ProposedFoundryProp_eplusout.sql']
    // addOptionsToSelect(added, 'loadselect');
    // updateAvailTimeSeries();
    // updateAvailTabularSeries();

    // // make sample table
    // let tag = "/Users/michaelsweeney/Documents/energyplus files/chop/Building1FoundryProp_eplusout.sql, AnnualBuildingUtilityPerformanceSummary, Entire Facility, End Uses"
    // getTable(tag)

    // load a series - mac
    // let seriestag = '/Users/michaelsweeney/Documents/energyplus files/chop/Building1FoundryProp_eplusout.sql, 15'
    // getSeries(seriestag)
    // let prep = prepSeries(seriestag)



        // load a series - pc



    let added_pc = ['P:/_Projects/190000/197142-000/D-Design Mgmt/Calc/Energy/DesignBuilder/ProposedFoundryProp_eplusout.sql']
    addOptionsToSelect(added, 'loadselect');
    updateAvailTimeSeries();
    updateAvailTabularSeries();
    let pc_seriestag = 'P:/_Projects/190000/197142-000/D-Design Mgmt/Calc/Energy/DesignBuilder/ProposedFoundryProp_eplusout.sql, 15';
    
    createHeatMap('#heatmap-proto-div')
    createScatter('#scatter-proto-div')
    createHistogram('#histogram-proto-div')
    createMultiLine('#multiline-proto-div')


}










// get data-tag from select
function loadTimeSeries(select) {
  let selected = document.getElementById(select).selectedOptions
  console.log('loading time series button clicked. Selection:')
  for (let i = 0; i < selected.length; i++) {
    let tag = selected[i].getAttribute('data-tag')
    let series = getSeries(tag)
    console.log(series)
  }
}


function loadTabular(select) {
  let selected = document.getElementById(select).selectedOptions
  for (let i = 0; i < selected.length; i++) {
    let tag = selected[i].getAttribute('data-tag')
    let table = getTable(tag)
  }
}
