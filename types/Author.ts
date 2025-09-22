export interface Editorial {
  id: number;
  name: string;
}

export interface Book {
  id: number;
  name: string;
  isbn: string;
  image: string;
  publishingDate: string;
  description: string;
  editorial: Editorial;
}

export interface Organization {
  id: number;
  name: string;
  tipo: string;
}

export interface Prize {
  id: number;
  premiationDate: string;
  name: string;
  description: string;
  organization: Organization;
}

export interface Author {
  id: number;
  birthDate: string;
  name: string;
  description: string;
  image: string;
  books: Book[];
  prizes: Prize[];

  // Favorito No implementado en backend
  favorite?: boolean;
}
