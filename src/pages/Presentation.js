import './Presentation.css'
import { useState } from "react";
import ReactDOM from "react-dom/client";
import { useNavigate } from "react-router-dom";

// const { dialog } = require('electron')
var md = require('markdown-it')();
const parse = require('html-react-parser');

// var result = md.render('# markdown-it rulezz! \n --- \n bob ! \n ```cs  yay ```');

export default function Presentation() {

  let navigate = useNavigate(); 
  const toHome = () =>{ 
    let path = `/`; 
    navigate(path);
  }

  const [pageContent, setPageContent] = useState(['empty']);
  const [diapo, setDiapo] = useState(0);

  const OpenFile = async  () => {
    await window.api.getFileContent((content) => {
      // textarea.value = content;
      setPageContent(content.split("---"));
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
        {/* <h1>Pressentation zone</h1>
        <p>Pressentation zone</p>
        <p>Pressentation zone</p> */}
        {parse(md.render(pageContent[diapo]))}
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