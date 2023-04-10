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

  const [pageContent, setPageContent] = useState(['empty']);
  const [diapo, setDiapo] = useState(0);

  useEffect(() => {
    OpenFile();
  }, []);

  const OpenFile = async  () => {
    await window.api.getFileContent( async (data) => {
      console.log(data);
      setPageContent(data);
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
      <div className="diapo">
        {parse(pageContent[diapo])}
      </div>
      <button onClick={toHome} className="goback"> x </button>
      <div className="arrows">
        <button className='arrow' onClick={PreviousDiapo}>{"<"}</button>
        <button className='arrow' onClick={NextDiapo}>{">"}</button>
      </div>
      <div className="console">
        <textarea /*value={"bonjour je suis du code"}*//>
      </div>
    </div>
  )
}