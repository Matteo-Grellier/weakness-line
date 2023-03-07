import './Presentation.css'
// const { dialog } = require('electron')

const OpenFile = async () => {
  window.api.getFileContent((content) => {
    // textarea.value = content;
    console.log(content);
  });
}

export default function Presentation() {
  return(
    <div className="page">
      <button onClick={OpenFile}>yesman</button>
      <div className="diapo">
        <h1>Pressentation zone</h1>
        <p>Pressentation zone</p>
        <p>Pressentation zone</p>
        <p>Pressentation zone</p>
      </div>
      <div className="arrows">
        <button className='arrow'>{"<"}</button>
        <button className='arrow'>{">"}</button>
      </div>
      <div className="console">
        <textarea value={"blaa alalzd jagd gazgd gaz"}/>
      </div>
    </div>
  )
}