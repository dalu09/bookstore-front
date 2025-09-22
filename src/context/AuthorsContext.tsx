"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { Author } from "@/types/Author";

const API_URL = "http://127.0.0.1:8080/api/authors";

interface AuthorsContextType {
  authors: Author[];
  loading: boolean;
  createAuthor: (
    author: Omit<Author, "id" | "books" | "prizes" | "favorite">
  ) => Promise<void>;
  updateAuthor: (id: number, updated: Partial<Author>) => Promise<void>;
  deleteAuthor: (id: number) => Promise<void>;
  toggleFavorite: (id: number) => void;
}

const AuthorsContext = createContext<AuthorsContextType | undefined>(undefined);

export function AuthorsProvider({ children }: { children: React.ReactNode }) {
  const [authors, setAuthors] = useState<Author[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAuthors();
  }, []);

  const fetchAuthors = async () => {
    try {
      const res = await fetch(API_URL);
      const data = await res.json();
      setAuthors(
        (data as Author[]).map((a) => ({
          ...a,
          favorite: a.favorite ?? false,
        }))
      );
    } catch (error) {
      console.error("Error fetching authors:", error);
    } finally {
      setLoading(false);
    }
  };

  const createAuthor = async (
    author: Omit<Author, "id" | "books" | "prizes" | "favorite">
  ) => {
    try {
      const res = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(author),
      });
      if (!res.ok) throw new Error("Error creating author");
      const newAuthor: Author = await res.json();
      setAuthors((prev) => [...prev, { ...newAuthor, favorite: false }]);
    } catch (error) {
      console.error(error);
    }
  };

  const updateAuthor = async (id: number, updated: Partial<Author>) => {
    try {
      const res = await fetch(`${API_URL}/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updated),
      });
      if (!res.ok) throw new Error("Error updating author");
      const updatedAuthor: Author = await res.json();

      setAuthors((prev) =>
        prev.map((a) =>
          a.id === id
            ? { ...updatedAuthor, favorite: a.favorite ?? false }
            : a
        )
      );
    } catch (error) {
      console.error(error);
    }
  };

  const deleteAuthor = async (id: number) => {
    try {
      const res = await fetch(`${API_URL}/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Error deleting author");
      setAuthors((prev) => prev.filter((a) => a.id !== id));
    } catch (error) {
      console.error(error);
    }
  };

  const toggleFavorite = (id: number) => {
    setAuthors((prev) =>
      prev.map((a) =>
        a.id === id ? { ...a, favorite: !a.favorite } : a
      )
    );
  };

  return (
    <AuthorsContext.Provider
      value={{
        authors,
        loading,
        createAuthor,
        updateAuthor,
        deleteAuthor,
        toggleFavorite
      }}
    >
      {children}
    </AuthorsContext.Provider>
  );
}

export function useAuthors() {
  const ctx = useContext(AuthorsContext);
  if (!ctx) throw new Error("useAuthors debe usarse dentro de un AuthorsProvider");
  return ctx;
}
