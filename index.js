import * as plots from './assets/js/plots.js'
import * as fload from './assets/js/fileload.js'




let body = d3.select('.body-container')
let header = d3.select('.header')

let btngroup = header.append('ul').attr('class', 'nav nav-tabs')

btngroup.append('li').attr('class', 'nav-item').append('a').text('File Mgmt').attr('class', 'nav-link').attr('id', 'summary').on('click', () => { setActiveTab('summary') })
btngroup.append('li').attr('class', 'nav-item').append('a').text('Line').attr('class', 'nav-link').attr('id', 'line').on('click', () => { setActiveTab('line') })
btngroup.append('li').attr('class', 'nav-item').append('a').text('Histogram').attr('class', 'nav-link').attr('id', 'hist').on('click', () => { setActiveTab('hist') })
btngroup.append('li').attr('class', 'nav-item').append('a').text('Scatter').attr('class', 'nav-link').attr('id', 'scatter').on('click', () => { setActiveTab('scatter') })
btngroup.append('li').attr('class', 'nav-item').append('a').text('Heatmap').attr('class', 'nav-link').attr('id', 'heatmap').on('click', () => { setActiveTab('heatmap') })

let scatter_container = body.append('div').attr('class', 'plot_container scatter_container').style('display', 'none')
let heatmap_container = body.append('div').attr('class', 'plot_container heatmap_container').style('display', 'none')
let line_container = body.append('div').attr('class', 'plot_container line_container').style('display', 'none')
let hist_container = body.append('div').attr('class', 'plot_container hist_container').style('display', 'none')



fetch

let file = './assets/sampledata/csv/data.csv'
let filetype = 'csv'


file = './assets/sampledata/hsr/City Point Base - Baseline Design.hsr'
filetype = 'hsr'
  



fload.load[filetype](file).then((data) => {
  data = fload.prep[filetype](data)
    plots.scatter(scatter_container, data)
    plots.heatmap(heatmap_container, data )
    plots.line(line_container, data)
    plots.histogram(hist_container, data)
    setActiveTab('heatmap')
  },
)




function setActiveTab(tab_id) {
  let body = d3.select('.main-container')
  body.selectAll('.nav-link').attr('class', 'nav-link')
  let active = body.select('#' + tab_id)
  active.attr('class', 'nav-link active')
  body.selectAll('.plot_container').style('display', 'none')
  body.select('.' + tab_id + "_container").style('display', 'inline-block')
}


































function importJS(jsname) {
  let th = document.getElementsByTagName('head')[0]
  var s = document.createElement('script');
  s.setAttribute('type', 'text/javascript');
  s.setAttribute('src', jsname);
  th.appendChild(s);
}
