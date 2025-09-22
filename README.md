#La arquitectura se organiza en:

src/context/AuthorsContext.tsx: proveedor global con CRUD + favoritos.

src/app/authors/page.tsx: listado de autores (buscar, marcar favorito, editar, eliminar).

src/app/crear/page.tsx: formulario para crear autores.

src/app/authors/[id]/edit/page.tsx: formulario para editar autores.

src/app/favoritos/page.tsx: lista de autores favoritos.

#La opción desarrollada fue Accesibilidad.
Se añadieron atributos ARIA (aria-label, aria-labelledby, aria-describedby, aria-live, aria-pressed) para mejorar la experiencia de usuarios con lectores de pantalla.
También se revisó la semántica HTML (ej. encabezados <h1>, <h2>, roles main, labels conectados con inputs).

#Instrucciones para correr la app

cd bookstore-front
npm install
npm run dev
La app correrá en:
👉 http://localhost:3000
