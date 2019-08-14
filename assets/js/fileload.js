
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
  let array = await handleUpload(files)
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
        name: file.name, 
        data: fileContents, 
        modified: file.lastModified,
        type: type,
        // data: prepped,
      })
    } catch (e) {
      console.warn(e.message)
    }
  }

  // prep data (probably diff function)
  for (let i in Object.keys(filedata)) {
    let file = filedata[i]
    let data = prepData(file.data, file.type)
    file.data = data
  }
  return filedata
  }
  








export { load, prep, uploadFileDrop, uploadFileInput }







