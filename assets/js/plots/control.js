


function translate(x, y) {
  return "translate(" + x + "," + y + ")"
}

function numFormat(num) {
  if (Math.abs(num) >= 1e6) {
    return d3.format('.2s')(num)
  }
  if (Math.abs(num) < 1e6) {
    return d3.format(',.2r')(num)
  }
}

function timeFormat(time) {
  let format = d3.timeFormat("%b %e, %H:%M")
  return format(time)
}


function MaxMinMulti(data, array, low_thresh, high_thresh) {
  let min = 0;
  let max = 0;
  for (let row in data) {
    for (let idx in array) {
      let val = data[row][array[idx]]
      if (val < min) { min = val }
      if (val > max) { max = val }
    }
  }
  if (low_thresh && low_thresh.length > 0) {
    min = d3.max([min, low_thresh])
  }
  if (high_thresh && high_thresh.length > 0) {
    max = d3.min([max, high_thresh])
  }
  return { min: min, max: max }
}


function niceTicks(scale, axis) {
  if (scale.domain()[1] > 1000000) {
    axis.scale(scale).tickFormat(d3.formatPrefix(".1", 1e6))
  }
  else {
    axis.scale(scale).tickFormat(d3.format(",.2r"));
  }
}

function stripZero(int) {
  let str = int.toString()
  if (str[0] == '0') { return str[1] }
  else { return str }
}



export {
  MaxMinMulti,
  niceTicks,
  numFormat,
  stripZero,
  timeFormat,
  translate,
}