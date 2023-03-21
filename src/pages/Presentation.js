import './Presentation.css'
import { useState } from "react";
import ReactDOM from "react-dom/client";
// const { dialog } = require('electron')
var md = require('markdown-it')();
const parse = require('html-react-parser');

// var result = md.render('# markdown-it rulezz! \n --- \n bob ! \n ```cs  yay ```');

export default function Presentation() {
  const [color, setColor] = useState('empty');

  const OpenFile = async () => {
    window.api.getFileContent((content) => {
      // textarea.value = content;
      setColor(content);
      console.log(md.render(content));
    });
  }

  return(
    <div className="page">
      <button onClick={OpenFile}>yesman</button>
      <div className="diapo">
        {/* <h1>Pressentation zone</h1>
        <p>Pressentation zone</p>
        <p>Pressentation zone</p> */}
        {parse(md.render(color))}


      </div>
      <div className="arrows">
        <button className='arrow'>{"<"}</button>
        <button className='arrow'>{">"}</button>
      </div>
      <div className="console">
        <textarea /*value={"blaa alalzd jagd gazgd gaz"*//>
      </div>
    </div>
  )
}