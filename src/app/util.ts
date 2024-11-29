export const API_BASE = process.env.NODE_ENV === "development" ? "http://localhost:8080/query" : import.meta.env.API_BASE;

export const FIREBASE_CONFIG = {
  apiKey: import.meta.env.API_KEY,
  storageBucket: import.meta.env.STORAGE_BUCKET,
};

export const INIT_AUTHOR: AuthorDataType = {
  name: "",
  birth: 0
}

export const INIT_TAG: TagDataType = {
  name: ""
}

export const INIT_ITEM: ItemDataType = {
  id: "",
  title: "",
  image: "",
  date: "",
  author: "",
  status: "DRAFT",
  tags: []
}