// import { resolve } from "url";


let bndfile = 'P:/_Projects/S150000/S150047-000/Calculations/Mech/Energy Model/2019-05-17 LEED Resubmission/YaleCommonsBaselineYSCPROPBASE_eplusout.bnd'



function readBnd(bnd) {
    let bndobj = {}
    fs.readFile(bnd, 'utf8', function (err, contents) {
        if (err) throw err;
        let lines = contents.split('\n')

        for (i = 0; i < lines.length; i++) {
            let line = lines[i]
            let linesplit = line.split(",")
            if (linesplit[0] == " Node") {
                bndobj[linesplit[2]] = linesplit[3]
            }
        };
    })
    return bndobj
}




// let node = '0XLOWERLEVEL:CX2ZN0 EXHAUST FAN AIR INLET'
// let a = readBnd(bndfile)
// console.log(a)

// setTimeout( () => {console.log(a[node])}, 500)








// foreach version : works below


// function readBnd(bnd) { // foreach version

//     let bndobj = {}
//     fs.readFile(bnd, 'utf8', function(err, contents) {
//        if (err) throw err;
//        let lines = contents.split('\n')
//        lines.forEach((line) => {
//            let linesplit = line.split(",")
//            if (linesplit[0] == " Node") {
//                bndobj[linesplit[2]] = linesplit[3]
//            }})
//        });

//    return bndobj
// }




// let node = '0XLOWERLEVEL:CX2ZN0 EXHAUST FAN AIR INLET'

// let a = readBnd(bndfile)
// console.log(a)




