export const API_BASE = process.env.NODE_ENV === "development" ? "http://localhost:8080/query" : import.meta.env.VITE_API_BASE;

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