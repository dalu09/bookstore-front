"use client";

import { useRouter } from "next/navigation";
import { useAuthors } from "@/src/context/AuthorsContext";

export default function FavoritosPage() {
  const { authors, loading, deleteAuthor, toggleFavorite } = useAuthors();
  const router = useRouter();

  const favoritos = authors.filter((a) => a.favorite);

  return (
    <div
      className="min-h-screen bg-gray-100 p-8"
      role="main"
      aria-labelledby="favoritos-title"
    >
      <div className="max-w-6xl mx-auto">
        <h1
          id="favoritos-title"
          className="text-3xl font-bold mb-6 text-black"
        >
          Favoritos
        </h1>

        {favoritos.length === 0 ? (
          <p className="text-gray-600">No tienes autores marcados como favoritos.</p>
        ) : (
          <ul className="space-y-6" aria-label="Lista de autores favoritos">
            {favoritos.map((fav) => (
              <li
                key={fav.id}
                className="flex justify-between bg-white p-6 rounded-lg shadow-lg"
                aria-label={`Autor favorito ${fav.name}`}
              >
                <div className="flex-1 pr-6">
                  <h2 className="text-xl font-bold text-black">{fav.name}</h2>
                  <p className="text-sm text-black mb-2">📅 {fav.birthDate}</p>
                  <p className="text-gray-700 mb-4">{fav.description}</p>

                  <div className="flex gap-3">
                    {/* Editar */}
                    <button
                      onClick={() => router.push(`/authors/${fav.id}/edit`)}
                      className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700"
                      aria-label={`Editar autor ${fav.name}`}
                    >
                      Editar
                    </button>

                    {/* Eliminar */}
                    <button
                      onClick={() => deleteAuthor(fav.id)}
                      className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                      aria-label={`Eliminar autor ${fav.name}`}
                    >
                      Eliminar
                    </button>

                    {/* Quitar de favoritos */}
                    <button
                      onClick={() => toggleFavorite(fav.id)}
                      className="px-4 py-2 rounded bg-yellow-400 text-black"
                      aria-pressed="true"
                      aria-label={`Quitar de favoritos a ${fav.name}`}
                    >
                      ★ Favorito
                    </button>
                  </div>
                </div>

                {fav.image && (
                  <img
                    src={fav.image}
                    alt={`Foto del autor ${fav.name}`}
                    className="w-40 h-40 object-cover rounded-lg shadow-md"
                  />
                )}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
