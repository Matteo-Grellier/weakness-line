import './Presentation.css'
import { useState, useEffect } from "react";
import ReactDOM from "react-dom/client";
import { useNavigate } from "react-router-dom";
const parse = require('html-react-parser');


export default function Presentation() {

  const navigate = useNavigate(); 
  const toHome = () =>{
    navigate("/");
  }

  const [pageContent, setPageContent] = useState(['']);
  const [diapo, setDiapo] = useState(0);
  const [pageCSS, setPageCSS] = useState('');

  useEffect(() => {
    OpenFile();
  }, []);

  const OpenFile = async  () => {
    await window.api.getFileContent( async (data) => {
      // console.log("md" + data.md);
      // console.log("css" + data.css);
      // console.log("config" + data.config);
      var mdContent = data.md;
      const firstDiapo = "<h1>" + data.config.title + "</h1> <p> Authors : " + data.config.authors.toString() + " </p>";
      mdContent.unshift(firstDiapo);
      setPageContent(mdContent);
      setPageCSS(data.css);
      setDiapo(0);
    });
  }

  const NextDiapo = () => {
    if(diapo+1 <= pageContent.length - 1) {
      setDiapo(diapo+1);
    }
  }

  const PreviousDiapo = () => {
    if(diapo-1 >= 0) {
      setDiapo(diapo-1);
    }
  }


  return(
    <div className="page">
      <section className="diapo">
        {parse(pageContent[diapo])}
      </section>
      <button onClick={toHome} className="goback"> x </button>
      <div className="arrows">
        <button className='arrow' onClick={PreviousDiapo}>{"<"}</button>
        <button className='arrow' onClick={NextDiapo}>{">"}</button>
      </div>
      <div className="console">
        <textarea /*value={"bonjour je suis du code"}*//>
      </div>
      <style>
        {pageCSS}
      </style>
    </div>
  )
}