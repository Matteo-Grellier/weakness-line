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

  useEffect(() => {
    OpenFile();
  }, []);

  const OpenFile = async  () => {
    await window.api.getFileContent((array) => {
      const content = array[0];
      const tempFilePath = array[1];
      console.log(tempFilePath);
      
      var fixedPathContent = content.replaceAll('./assets/image.jpg', 'C:/Users/lewis/AppData/Local/Temp/weaknessLine/assets/image.jpg'); //'./assets/'  tempFilePath + '/assets/'
      console.log("fixedPathContent: ", fixedPathContent)
      setPageContent(fixedPathContent.split("---"));
      setDiapo(0);
    });
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
      <button className="yesman" onClick={OpenFile}>yesman</button>
      <div className="diapo">
        {parse(md.render(pageContent[diapo]))}
        <img src='./image.jpg'></img>
      </div>
      <button onClick={toHome} className="goback"> x </button>
      <div className="arrows">
        <button className='arrow' onClick={PreviousDiapo}>{"<"}</button>
        <button className='arrow' onClick={NextDiapo}>{">"}</button>
      </div>
      <div className="console">
        <textarea /*value={"blaa alalzd jagd gazgd gaz"*//>
      </div>
    </div>
  )
}