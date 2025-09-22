"use client";

import { useRouter } from "next/navigation";
import { useAuthors } from "@/src/context/AuthorsContext";
import { useState } from "react";

export default function AuthorsPage() {
  const { authors, deleteAuthor, toggleFavorite } = useAuthors();
  const router = useRouter();

  const [search] = useState("");

  const filtered = authors.filter(
    (a) =>
      a.name.toLowerCase().includes(search.toLowerCase()) ||
      a.description.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div
      className="min-h-screen bg-gray-100 p-8"
      role="main"
      aria-labelledby="authors-title"
    >
      <div className="max-w-6xl mx-auto">
        <h1
          id="authors-title"
          className="text-3xl font-bold mb-6 text-black"
        >
          Authors
        </h1>


        <ul className="space-y-6" aria-live="polite">
          {filtered.map((author) => (
            <li
              key={author.id}
              className="flex justify-between bg-white p-6 rounded-lg shadow-lg"
              aria-label={`Autor ${author.name}`}
            >
              <div className="flex-1 pr-6">
                <h2 className="text-xl font-bold text-black">{author.name}</h2>
                <p className="text-sm text-black mb-2">
                  📅 {author.birthDate}
                </p>
                <p className="text-gray-700 mb-4">{author.description}</p>
                <div className="flex gap-3">
                  {/* Editar */}
                  <button
                    onClick={() => router.push(`/authors/${author.id}/edit`)}
                    className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700"
                    aria-label={`Editar autor ${author.name}`}
                  >
                    Editar
                  </button>

                  {/* Eliminar */}
                  <button
                    onClick={() => deleteAuthor(author.id)}
                    className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                    aria-label={`Eliminar autor ${author.name}`}
                  >
                    Eliminar
                  </button>

                  {/* Favorito */}
                  <button
                    onClick={() => toggleFavorite(author.id)}
                    className={`px-4 py-2 rounded ${
                      author.favorite ? "bg-yellow-400" : "bg-gray-300"
                    } text-black`}
                    aria-pressed={author.favorite}
                    aria-label={
                      author.favorite
                        ? `Quitar de favoritos a ${author.name}`
                        : `Marcar como favorito a ${author.name}`
                    }
                  >
                    {author.favorite ? "★ Favorito" : "☆ Marcar favorito"}
                  </button>
                </div>
              </div>

              {author.image && (
                <img
                  src={author.image}
                  alt={`Foto del autor ${author.name}`}
                  className="w-40 h-40 object-cover rounded-lg shadow-md"
                />
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
