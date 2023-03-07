import './Presentation.css'

export default function Presentation() {
  return(
    <div className="page">
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
        <textarea>blaa alalzd jagd gazgd gaz</textarea>
      </div>
    </div>
  )
}