import './Presentation.css'
import { useState, useEffect } from "react";
import ReactDOM from "react-dom/client";
import { useNavigate } from "react-router-dom";
const md = require('markdown-it')();
const parse = require('html-react-parser');


export default function Presentation() {

  let navigate = useNavigate(); 
  const toHome = () =>{ 
    let path = `/`; 
    navigate(path);
  }

  const [pageContent, setPageContent] = useState(['empty']);
  const [diapo, setDiapo] = useState(0);

  useEffect(async () => {
    OpenFile();
    console.log("HERE", getCodeFileCont("index.js"));
  }, []);

  const OpenFile = async  () => {
    await window.api.getFileContent( async (array) => {
      const content = array[0];
      const tempFilePath = array[1];
      // console.log("tempFilePath = " + tempFilePath);
      
      var fixedPathContent = content.replaceAll('./assets/', 'atom://' + tempFilePath + '/assets/'); 
      // fixedPathContent =  fixedPathContent.replaceAll([code])
      console.log("fixedPathContent: ", fixedPathContent);
      setPageContent(fixedPathContent.split("---"));
      fixedPathContent.split("---").forEach( async (item, index) => {
        if(item.includes("[Code]")) {
          item.split("\n").forEach((item1, index1) => {
            const myRe = new RegExp(/(?<=\()(.*?)(?=\))/, 'gmi');
            const path = item1.match(myRe);
            // const path = item1.match();
            if(path != null) {
              const fileName = path[0].replace('atom://' + tempFilePath + '/assets/', "").split(".")[1].split("#"); 
              console.log(fileName[0], fileName[1]);
              // console.log(getCodeFileCont(fileName));
            }
          })
        }
      });
      setDiapo(0);
    });
  }

  const getCodeFileCont = async (fileName) => {
    await window.api.getCodeFileContent( fileName, (data) => {
      return data;
    })
  }

  const NextDiapo = () => {
    console.log(diapo+1);
    console.log(pageContent.length);
    if(diapo+1 <= pageContent.length - 1) {
      setDiapo(diapo+1);
    } else {
      console.log("nop");
    }
  }

  const PreviousDiapo = () => {
    console.log(diapo-1);
    if(diapo-1 >= 0) {
      setDiapo(diapo-1);
    } else {
      console.log("nop");
    }
  }


  return(
    <div className="page">
      {/* <button className="yesman" onClick={OpenFile}>yesman</button> */}
      <div className="diapo">
        {parse(md.render(pageContent[diapo]))}
      </div>
      <button onClick={toHome} className="goback"> x </button>
      <div className="arrows">
        <button className='arrow' onClick={PreviousDiapo}>{"<"}</button>
        <button className='arrow' onClick={NextDiapo}>{">"}</button>
      </div>
      <div className="console">
        <textarea /*value={"blaa alalzd jagd gazgd gaz"}*//>
      </div>
    </div>
  )
}