function initNav() {

  let body = d3.select('.body-container')
  let header = d3.select('.header')

  let btngroup = header.append('ul').attr('class', 'nav nav-tabs')
  
  btngroup.append('li').attr('class', 'nav-item').append('a').text('File Mgmt').attr('class', 'nav-link').attr('id', 'files').on('click', () => { setActiveTab('files') })
  btngroup.append('li').attr('class', 'nav-item').append('a').text('Line').attr('class', 'nav-link').attr('id', 'line').on('click', () => { setActiveTab('line') })
  btngroup.append('li').attr('class', 'nav-item').append('a').text('Histogram').attr('class', 'nav-link').attr('id', 'hist').on('click', () => { setActiveTab('hist') })
  btngroup.append('li').attr('class', 'nav-item').append('a').text('Scatter').attr('class', 'nav-link').attr('id', 'scatter').on('click', () => { setActiveTab('scatter') })
  btngroup.append('li').attr('class', 'nav-item').append('a').text('Heatmap').attr('class', 'nav-link').attr('id', 'heatmap').on('click', () => { setActiveTab('heatmap') })
  
  let scatter_container = body.append('div').attr('class', 'plot_container scatter_container').style('display', 'none')
  let heatmap_container = body.append('div').attr('class', 'plot_container heatmap_container').style('display', 'none')
  let line_container = body.append('div').attr('class', 'plot_container line_container').style('display', 'none')
  let hist_container = body.append('div').attr('class', 'plot_container hist_container').style('display', 'none')
  let files_container = body.append('div').attr('class', 'plot_container files_container').style('display', 'none')
  

  setActiveTab('files')


// playing around with files mgmt... put this in
  let filetab = d3.select(".files_container").style('padding', '50px')
  filetab.style('align-text', 'left')
  filetab.append('input').attr('type', 'file').attr('id', 'file').attr('multiple', true).attr('class', 'inputfile')
  filetab.append('label').attr('for', 'file').text('Upload Files (or drag anywhere)')
}





function initDrop() {
  d3.select('.body-container').append('div').attr('class', 'dropzone').style('visibility', 'hidden').style('opacity', 0)

  let lastTarget = null;
  window.addEventListener("dragenter", (e) => {
    lastTarget = e.target;
    document.querySelector(".dropzone").style.visibility = "";
    document.querySelector(".dropzone").style.opacity = 1;
  });
  
  window.addEventListener("dragleave", (e) => {
    if (e.target === lastTarget || e.target === document) {
      document.querySelector(".dropzone").style.visibility = "hidden";
      document.querySelector(".dropzone").style.opacity = 0;
    }
  });

  $('.dropzone').on("dragenter dragstart dragend dragleave dragover drag drop",  (e) => {
    e.preventDefault();
  });



  document.querySelector(".dropzone").addEventListener('drop', (e) => {
    e.preventDefault(); 
    document.querySelector(".dropzone").style.visibility = "hidden";
    document.querySelector(".dropzone").style.opacity = 0;
  })
}



function setActiveTab(tab_id) {
  let body = d3.select('.main-container')
  body.selectAll('.nav-link').attr('class', 'nav-link')
  let active = body.select('#' + tab_id)
  active.attr('class', 'nav-link active')
  body.selectAll('.plot_container').style('display', 'none')
  body.select('.' + tab_id + "_container").style('display', 'inline-block')
}



export { initDrop, initNav }