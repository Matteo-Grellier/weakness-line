import React, { useState } from 'react';

const CreatePresentationForm = () => {
  const [markdownFile, setMarkdownFile] = useState(null);
  const [cssFile, setCssFile] = useState(null);
  const [assetsFolder, setAssetsFolder] = useState(null);

  const handleSubmit = (event) => {
    event.preventDefault();

    const data = {
        markdownFile,
        cssFile,
        assetsFolder,
    };
    window.api.createPresentation(data);

  }

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="markdown-file">Fichier Markdown :</label>
        <input type="file" id="markdown-file" onChange={(event) => setMarkdownFile(event.target.files[0])} />
      </div>
      <div>
        <label htmlFor="css-file">Fichier CSS :</label>
        <input type="file" id="css-file" onChange={(event) => setCssFile(event.target.files[0])} />
      </div>
      <div>
        <label htmlFor="assets-folder">Dossier des assets :</label>
        <input type="file" id="assets-folder" webkitdirectory="" onChange={(event) => setAssetsFolder(event.target.files[0])} />
      </div>
      <button type="submit">Créer la présentation</button>
    </form>
  );
}

export default CreatePresentationForm

