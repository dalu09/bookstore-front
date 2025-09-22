"use client";

import { useEffect, useState } from "react";
import { Author } from "@/types/Author";

const API_URL = "http://127.0.0.1:8080/api/authors";

export function useAuthors() {
  const [authors, setAuthors] = useState<Author[]>([]);
  const [loading, setLoading] = useState(true);

  const toggleFavorite = (id: number) => {
    setAuthors((prev) =>
      prev.map((a) =>
        a.id === id ? { ...a, favorite: !a.favorite } : a
      )
    );
  };

  useEffect(() => {
    fetchAuthors();
  }, []);

  const fetchAuthors = async () => {
    try {
      const res = await fetch(API_URL);
      const data = await res.json();
      setAuthors(data);
    } catch (error) {
      console.error("Error fetching authors:", error);
    } finally {
      setLoading(false);
    }
  };

  const createAuthor = async (author: Omit<Author, "id" | "books" | "prizes">) => {
    try {
      const res = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(author),
      });
      if (!res.ok) throw new Error("Error creating author");
      const newAuthor = await res.json();
      setAuthors((prev) => [...prev, newAuthor]);
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
      const updatedAuthor = await res.json();
      setAuthors((prev) =>
        prev.map((a) => (a.id === id ? updatedAuthor : a))
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

  return {
    authors,
    loading,
    fetchAuthors,
    createAuthor,
    updateAuthor,
    deleteAuthor,
    setAuthors 
  };
}
