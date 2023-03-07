import React, { useState } from 'react';

const CreatePresentationForm = () => {
  const [markdownFile, setMarkdownFile] = useState(null);
  const [cssFile, setCssFile] = useState(null);
  const [title, setTitle] = useState('');
  const [presenters, setPresenters] = useState('');
  const [duration, setDuration] = useState('');
  const [assetsFolder, setAssetsFolder] = useState(null);
  const [envFolder, setEnvFolder] = useState(null);

  const handleSubmit = (event) => {
    event.preventDefault();
    // créer l'archive .codeprez
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
        <label htmlFor="title">Titre :</label>
        <input type="text" id="title" value={title} onChange={(event) => setTitle(event.target.value)} />
      </div>
      <div>
        <label htmlFor="presenters">Présentateurs :</label>
        <input type="text" id="presenters" value={presenters} onChange={(event) => setPresenters(event.target.value)} />
      </div>
      <div>
        <label htmlFor="duration">Durée estimée :</label>
        <input type="text" id="duration" value={duration} onChange={(event) => setDuration(event.target.value)} />
      </div>
      <div>
        <label htmlFor="assets-folder">Dossier des assets :</label>
        <input type="file" id="assets-folder" webkitdirectory="" onChange={(event) => setAssetsFolder(event.target.files[0])} />
      </div>
      <div>
        <label htmlFor="env-folder">Dossier de l'environnement :</label>
        <input type="file" id="env-folder" webkitdirectory="" onChange={(event) => setEnvFolder(event.target.files[0])} />
      </div>
      <button type="submit">Créer la présentation</button>
    </form>
  );
}

export default CreatePresentationForm

