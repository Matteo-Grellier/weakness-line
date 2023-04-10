import React, { useState } from 'react';
import './CreatePresentationForm.css'

export default function CreatePresentation () {
    const [markdownFilePath, setmarkdownFilePath] = useState(null);
    const [cssFilePath, setCssFilePath] = useState(null);
    const [assetsFolderPath, setAssetsFolderPath] = useState(null);
    const [submitClicked, setSubmitClicked] = useState(false);

    const handleSubmit = (event) => {
        event.preventDefault();
        setSubmitClicked(true);
        window.api.createPresentation(markdownFilePath, cssFilePath).then((result) => {
            console.log(result);
        });
        

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