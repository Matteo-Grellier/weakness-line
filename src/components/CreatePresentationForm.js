import React, { useState } from 'react';
import './CreatePresentationForm.css'

export default function CreatePresentation () {
    const [markdownFilePath, setmarkdownFilePath] = useState(null);
    const [cssFilePath, setCssFilePath] = useState(null);
    const [assetsFolderPath, setAssetsFolderPath] = useState(null);
    const [submitClicked, setSubmitClicked] = useState(false);
    const [title, setTitle] = useState(null);
    const [authors, setAuthors] = useState([]);
    const [duration, setDuration] = useState(null);

    const handleSubmit = (event) => {
        event.preventDefault();
        setSubmitClicked(true);
        window.api.createPresentation(markdownFilePath, cssFilePath, title, authors, duration);
    }

    const handleAssetsFolderClick = () => {
        window.api.openAssetsFolder().then((assetsFolderPath) => {
            setAssetsFolderPath(assetsFolderPath);
        });

    }

  return (
    <form onSubmit={handleSubmit} className="createPresForm">
      <div className="markdownFileContainer">
        <label className='labelTitle' htmlFor="markdown-file">Fichier Markdown :</label>
        <input className='chooseButton' accept='.md' type="file" id="markdown-file" onChange={(event) => setmarkdownFilePath(event.target.files[0].path)} />
      </div>
      <div className="cssFileContainer">
        <label className='labelTitle' htmlFor="css-file">Fichier CSS :</label>
        <input className='chooseButton' accept='.css' type="file" id="css-file" onChange={(event) => setCssFilePath(event.target.files[0].path)} />
      </div>
      <div>
        <label className='labelTitle'>Titre</label>
        <input onChange={(event => setTitle(event.target.value))} className='chooseButton' type='text'></input>
      </div>
      <div>
        <label className='labelTitle'>Auteur</label>
        <textarea onChange={(event) => setAuthors(event.target.value.split('\n'))} className='chooseButton'></textarea>
      </div>
      <div>
        <label className='labelTitle'>Durée</label>
        <input onChange={(event => setDuration(event.target.value))} className='chooseButton' type='text'></input>
      </div>
      <div className="assetsFolderContainer">
        <label className='labelTitle' htmlFor="assets-folder">Dossier des assets :</label>
        <button type="button" id="assets-folder" onClick={handleAssetsFolderClick}>Choisir un dossier</button>
        <p>{assetsFolderPath}</p>
      </div>
      <button id="submit" type="submit">Créer la présentation</button>
      
      {submitClicked && <p>La présentation a été créée avec succès !</p>}
      
    </form>
  );
}