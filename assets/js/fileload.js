
import { prepHSR } from './parse/hsrparse.js'
import { prepCSV } from './parse/csvparse.js'




let load = {
  csv: d3.csv,
  sql: '',
  hsr: d3.text
}

let prep = {
  csv: prepCSV,
  sql: '',
  hsr: prepHSR,
}


function prepData(file, type) {
  let data = prep[type](file)
  return data;
}



async function uploadFileDrop() {
  let dropped = d3.event.dataTransfer.files
  let files = dropped
  let array = handleUpload(files)
  return array
}


async function uploadFileInput() {
  let files = d3.select('.files_container').select('input').node().files
  let array = handleUpload(files)
  return array
}


const readUploadedFileAsText = (inputFile) => {
  const temporaryFileReader = new FileReader();
  return new Promise((resolve, reject) => {
    temporaryFileReader.onerror = () => {
      temporaryFileReader.abort();
      reject(new DOMException("Problem parsing input file."));
    };
    temporaryFileReader.onload = () => {
      resolve(temporaryFileReader.result);
    };
    temporaryFileReader.readAsText(inputFile);
  });
};


const handleUpload = async (files) => {
  let filedata = []
  for (let i = 0; i < files.length; i++) {
    let file = files[i]
    let type = file.name.split('.').pop()
    try {
      let fileContents = await readUploadedFileAsText(file)
      filedata.push({
        name: file.name.split('.')[0],
        data: fileContents,
        modified: file.lastModified,
        type: type,
      })
    } catch (e) {
      console.warn(e.message)
    }
  }

  // prep data (probably diff function)
  for (let i in Object.keys(filedata)) {
    let file = filedata[i]
    let data = prepData(file.data, file.type)
    file.data = addIdsToKey(data, file.name, 'Time')
  }
  let concat = concatFileData(filedata)
  return concat
}


function concatFileData(filedata) {

  
  // first, make each file into object with time as keys
  let farray = []
  let timeobj = {}
  for (let n = 0; n < filedata.length; n++) {
    let fdata = filedata[n].data
    let fname = filedata[n].name
    let timekey = 'Time'
    let fobj = arrayToObject(fdata, timekey)
    
    for (let i in fobj) {
      let row = fobj[i]
      if (i in timeobj) {
        timeobj[i] = Object.assign(timeobj[i], row)
      }
      else {
        timeobj[i] = row
      }
    }
    farray.push(fobj)
  }
  let timearray = Object.values(timeobj)
  
  return timearray

}






function addIdsToKey(data, key, exception) {
  let newdata = []
  for (let i in data) {
    let newrow = {}
    let row = data[i]
    for (let c in row) {
      let col = row[c]
      if (c != exception) {
        let newcol = key + " - " + c
        newrow[newcol] = col
      }
      else {
        let newcol = c
        newrow[newcol] = col
      }
    }
    newdata.push(newrow)
  }
  return newdata
}


function arrayToObject(array, keyField) {
  array.reduce((obj, item) => {
    obj[item[keyField]] = item
    return obj
  }, {})
  return array
}


export { load, prep, uploadFileDrop, uploadFileInput }







