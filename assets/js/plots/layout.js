

function addSelect(container, classname, data, placeholder = 'placeholder') {
  let seldiv = container.append('div').attr('class', 'select-container ' + classname)

  seldiv.append('select')
  let select = seldiv.select('select')


  if (placeholder) { select.attr('title', placeholder) }

  select.attr('data-live-search', 'true')
  select.attr('class', 'selectpicker')



  $(document).ready(() => {
    $('.selectpicker').selectpicker();
  });

  let cols = Object.keys(data[0])

  // handle bug where 'title' and 'multiple=false' causes bs-select to ignore first option
  let opts = select.selectAll('option')
    .data(cols)
    .enter()
    .append('option')
    .text((d) => { return d })
    .exit().remove()
}

function addColorSelect(container, colors) {
  let seldiv = container.append('div').attr('class', 'select-container color-select')
  seldiv.append('select')
  let select = seldiv.select('select')

  select.attr('class', 'selectpicker')
  select.attr('title', 'Viridis')

  $(document).ready(() => {
    $('.selectpicker').selectpicker({ dropupAuto: false });
  });

  let cols = Object.keys(colors)
  cols.unshift('title')
  select.selectAll('option')
    .data(cols)
    .enter()
    .append('option')
    .text((d) => { return d })
    .attr('selected', (d) => {
      if (d == 'Viridis') { return 'true' }
    })
    .exit().remove();
}





function addMultiSelect(container, classname, data) {
  let seldiv = container.append('div').attr('class', 'multi-select-container select-container ' + classname)
  let selid = container.node().getAttribute('class') + '_multi_select'

  seldiv.append('select')
  let select = seldiv.select('select')
  select.attr('title', 'select variables')

  select.attr('data-live-search', 'true')
  select.attr('data-selected-text-format', "count")
  select.attr('multiple', 'true')
  select.attr('class', 'selectpicker')
  select.attr('id', selid)

  $(document).ready(() => {
    $('.selectpicker').selectpicker();
  });

  let cols = Object.keys(data[0])

  // handle bug where 'title' and 'multiple=false' causes bs-select to ignore first option

    cols.unshift('title')
  

  let opts = select.selectAll('option')
    .data(cols)
    .enter()
    .append('option')
    .text((d) => {
      return d
    })
    .exit().remove();
  seldiv.append('ul').attr('class', 'list-group')
}


export {
  addSelect,
  addColorSelect,
  addMultiSelect,
}