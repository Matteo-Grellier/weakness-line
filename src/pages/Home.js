export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <img src="./logo.ico" alt="Logo" className="w-70 h-70" />
      <h1 className="text-3xl font-bold mt-10 mb-5">
        Bienvenue sur WeeknessLine !
      </h1>
      <div className="space-y-4">
        <button className="w-full px-10 py-4 rounded-md shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
          Créer une présentation
        </button>
        <button className="w-full px-10 py-4 rounded-md shadow-md focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2">
          Ouvrir une présentation
        </button>
      </div>
    </div>
  );
}
