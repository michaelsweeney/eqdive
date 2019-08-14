import * as plots from './assets/js/plots.js'
import * as fl from './assets/js/fileload.js'
import { initDrop, initNav } from './assets/js/ui.js'


initNav()
initDrop()


let body = d3.select('.body-container')
let scatter_container = body.select('.scatter_container')
let heatmap_container = body.select('.heatmap_container')
let line_container = body.select('.line_container')
let hist_container = body.select('.hist_container')



// static dev - sampledata
const dev = false
if (dev) {
  let file = './assets/sampledata/csv/data.csv'
  let filetype = 'csv'
  fl.load[filetype](file).then((data) => {
    data = fl.prep[filetype](data)
    plots.scatter(scatter_container, data)
    plots.heatmap(heatmap_container, data)
    plots.line(line_container, data)
    plots.histogram(hist_container, data)
  },
  )
} 


// regular operation
else {
  let data;
  d3.select(".files_container").select('input').on('change', fl.uploadFileInput)
  d3.select('.dropzone').on('drop', async () => {
    let data = await fl.uploadFileDrop()
    data = data[0].data // only works for single hsr files
    console.log(data)


    clearChildren(scatter_container)
    clearChildren(heatmap_container)
    clearChildren(line_container)
    clearChildren(hist_container)

    plots.scatter(scatter_container, data)
    plots.heatmap(heatmap_container, data)
    plots.line(line_container, data)
    plots.histogram(hist_container, data)
    
  }
    )


}


function clearChildren(container) {
  console.log(container)
  let node = container.nodes()[0]
  while (node.firstChild) {
    node.removeChild(node.firstChild);
}
}

// on change (hsr / csv only), within function:
// get data array via uploadfileinput / uploadfiledrop
// remove all children elements in each container
// make new dataset



