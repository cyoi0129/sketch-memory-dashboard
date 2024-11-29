/// <reference types="vite/client" />
interface ImportMetaEnv {
  readonly API_KEY: string
  readonly STORAGE_BUCKET: string
  readonly API_BASE: string
}

type ImageType = {
  name: string;
  url: string;
}

type OverlayProps = {
  loader?: boolean;
}

type MenuProps = {
  show?: boolean;
}

type LoginProps = {
  action: (login: boolean) => void;
}

type TagType = {
  id: string;
  name: string;
};

type AuthorType = {
  id: string;
  name: string;
  birth: number;
};

type ItemType = {
  id: string;
  title: string;
  image: string;
  date: string;
  status: string;
  author: AuthorType;
  tags: Array<TagType>;
};

type ItemProps = {
  data: ItemType;
};

type ItemDetailProps = {
  id: string;
  tagList: Array<TagType>;
  authorList: Array<AuthorType>;
};

type ItemDataProps = {
  item: ItemDataType;
  tagList: Array<TagType>;
  authorList: Array<AuthorType>;
};

type TagDataType = {
  id?: string;
  name: string;
};

type AuthorDataType = {
  id?: string;
  name: string;
  birth: number;
};

type ItemDataType = {
  id?: string;
  title: string;
  image: string;
  date: string;
  status: string;
  author: string;
  tags: Array<string>;
};

type ItemListResponse = {
  data: {
    items: Array<ItemType>;
  };
};

type TagListResponse = {
  data: {
    tags: Array<TagType>;
  };
};

type AuthorListResponse = {
  data: {
    authors: Array<AuthorType>;
  };
};

type ModalProps = {
  type: "AUTHOR" | "TAG";
  action: () => void;
}

type ErrorProps = {
  message: string;
  action: () => void;
}

type TagStoreType = {
  error: boolean;
  loading: boolean;
  data: Array<TagType>;
};

type AuthorStoreType = {
  error: boolean;
  loading: boolean;
  data: Array<AuthorType>;
};

type ItemStoreType = {
  error: boolean;
  loading: boolean;
  data: Array<ItemType>;
};

type ItemQueryResponse = {
  userItems: Array<ItemType>
}