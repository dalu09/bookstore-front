"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useAuthors } from "@/hooks/useAuthors";
import { Author } from "@/types/Author";

export default function EditAuthorPage() {
  const { id } = useParams();
  const router = useRouter();
  const { authors, updateAuthor } = useAuthors();

  const [author, setAuthor] = useState<Author | null>(null);

  useEffect(() => {
    if (authors.length > 0) {
      const found = authors.find((a) => a.id === Number(id));
      if (found) {
        setAuthor(found);
      }
    }
  }, [authors, id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!author) return;

    await updateAuthor(author.id, author);
    router.push("/authors");
  };

  if (!author) return <p className="text-center mt-10">Cargando autor...</p>;

  return (
    <div
      className="flex justify-center items-center min-h-screen bg-gray-100"
      role="main"
      aria-labelledby="edit-author-title"
    >
      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-lg">
        <h1
          id="edit-author-title"
          className="text-2xl font-bold mb-6 text-black"
        >
          Editar Autor
        </h1>
        <form
          onSubmit={handleSubmit}
          className="space-y-4"
          aria-describedby="edit-author-desc"
        >
          <p id="edit-author-desc" className="sr-only">
            Formulario para editar la información de un autor existente.
          </p>

          <div>
            <label
              htmlFor="author-name"
              className="block font-medium text-black"
            >
              Nombre
            </label>
            <input
              id="author-name"
              type="text"
              value={author.name}
              onChange={(e) => setAuthor({ ...author, name: e.target.value })}
              className="border p-2 w-full rounded text-black"
              required
              aria-required="true"
            />
          </div>

          <div>
            <label
              htmlFor="author-birthdate"
              className="block font-medium text-black"
            >
              Fecha de nacimiento
            </label>
            <input
              id="author-birthdate"
              type="date"
              value={author.birthDate}
              onChange={(e) =>
                setAuthor({ ...author, birthDate: e.target.value })
              }
              className="border p-2 w-full rounded text-black"
              required
              aria-required="true"
            />
          </div>

          <div>
            <label
              htmlFor="author-description"
              className="block font-medium text-black"
            >
              Descripción
            </label>
            <textarea
              id="author-description"
              value={author.description}
              onChange={(e) =>
                setAuthor({ ...author, description: e.target.value })
              }
              className="border p-2 w-full rounded text-black"
              rows={3}
              required
              aria-required="true"
            />
          </div>

          <div>
            <label
              htmlFor="author-image"
              className="block font-medium text-black"
            >
              URL de imagen
            </label>
            <input
              id="author-image"
              type="text"
              value={author.image}
              onChange={(e) =>
                setAuthor({ ...author, image: e.target.value })
              }
              className="border p-2 w-full rounded text-black"
              aria-describedby="author-image-desc"
            />
            <p id="author-image-desc" className="sr-only">
              Ingrese la URL de la imagen del autor (opcional).
            </p>
          </div>

          <button
            type="submit"
            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
            aria-label="Guardar cambios del autor"
          >
            Guardar cambios
          </button>
        </form>
      </div>
    </div>
  );
}
