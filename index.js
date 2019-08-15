import * as plots from './assets/js/plots.js'
import * as fl from './assets/js/fileload.js'
import { initDrop, initNav, initFilesTab, setActiveTab } from './assets/js/ui.js'


initNav()
initDrop()
initFilesTab()

let body = d3.select('.body-container')
let scatter_container = body.select('.scatter_container')
let heatmap_container = body.select('.heatmap_container')
let line_container = body.select('.line_container')
let hist_container = body.select('.hist_container')


d3.select(".files_container").select('input').on('change', async () => {
  let data = await fl.uploadFileInput()
  plotInit(data)
  setActiveTab('line')
})

d3.select('.dropzone').on('drop', async () => {
  let data = await fl.uploadFileDrop()
  plotInit(data)
  setActiveTab('line')
})






function plotInit(data) {
  clearChildren(scatter_container)
  clearChildren(heatmap_container)
  clearChildren(line_container)
  clearChildren(hist_container)

  plots.scatter(scatter_container, data)
  plots.heatmap(heatmap_container, data)
  plots.line(line_container, data)
  plots.histogram(hist_container, data)
}

function clearChildren(container) {
  let node = container.nodes()[0]
  while (node.firstChild) {
    node.removeChild(node.firstChild);
  }
}





