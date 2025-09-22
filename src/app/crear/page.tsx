"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuthors } from "@/hooks/useAuthors";

export default function CrearAutorPage() {
  const router = useRouter();
  const { createAuthor } = useAuthors();

  const [name, setName] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await createAuthor({ name, birthDate, description, image });
    router.push("/authors");
  };

  return (
    <div
      className="flex justify-center items-center min-h-screen bg-gray-100"
      role="main"
      aria-labelledby="create-author-title"
    >
      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-lg">
        <h1
          id="create-author-title"
          className="text-2xl font-bold mb-6 text-black"
        >
          Crear Autor
        </h1>
        <form
          onSubmit={handleSubmit}
          className="space-y-4"
          aria-describedby="create-author-desc"
        >
          <p id="create-author-desc" className="sr-only">
            Formulario para registrar un nuevo autor en la plataforma.
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
              value={name}
              onChange={(e) => setName(e.target.value)}
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
              value={birthDate}
              onChange={(e) => setBirthDate(e.target.value)}
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
              value={description}
              onChange={(e) => setDescription(e.target.value)}
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
              value={image}
              onChange={(e) => setImage(e.target.value)}
              className="border p-2 w-full rounded text-black"
              aria-describedby="author-image-desc"
            />
            <p id="author-image-desc" className="sr-only">
              Ingrese la URL de la imagen del autor (opcional).
            </p>
          </div>

          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            aria-label="Crear nuevo autor"
          >
            Crear
          </button>
        </form>
      </div>
    </div>
  );
}
