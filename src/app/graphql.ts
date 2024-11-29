import { gql } from "@apollo/client";
import Cookies from "js-cookie";

export const GET_ITEMS = gql`
  query UserItems {
    userItems(user: "${Cookies.get("user") ? Cookies.get("user") : ""}") {
      id
      title
      image
      author {
        id
        name
      }
      tags {
        id
        name
      }
      date
      status
    }
  }
`;

export const GET_AUTHORS = gql`
	query Authors {
		authors {
			id
			name
			birth
		}
	}
`;

export const GET_TAGS = gql`
	query Tags {
		tags {
			id
			name
		}
	}
`;

export const GET_METAS = gql`
	query Items {
		tags {
			id
			name
		}
    authors {
      id
      name
    }
	}
`;


export const UPDATE_ITEM = gql`
mutation Item(
  $id: String!
  $comment: String!
  $score: Int!
  $reviewer: String!
  $item: String!
  $title: String!
  $image: String!
  $date: String!
  $status: String!
  $author: String!
  $tags: [String!]
) {
  updateItem(
    id: $id
    input: {
      title: $title
      image: $image
      date: $date
      status: $status
      author: $author
      tags: $tags
    }
  ) {
    id
  }
}
`;

export const ADD_ITEM = gql`
mutation Item(
  $id: String!
  $comment: String!
  $score: Int!
  $reviewer: String!
  $item: String!
  $title: String!
  $image: String!
  $date: String!
  $status: String!
  $author: String!
  $tags: [String!]
) {
  createItem(
    input: {
      title: $title
      image: $image
      date: $date
      status: $status
      author: $author
      tags: $tags
    }
  ) {
    id
  }
}
`;

export const ADD_TAG = gql`
mutation Tag(
  $name: String!
) {
  createTag(
    input: {
      name: $name
    }
  ) {
    id
  }
}
`;

export const ADD_AUTHOR = gql`
mutation Author(
  $name: String!
  $birth: Int!
) {
  createAuthor(
    input: {
      name: $name
      birth: $birth
  }
) {
  id
}
}
`;

export const getItemDetail = (id: string) => {
	return gql`
    query Item {
    item(id: "${id}") {
      id
        title
        image
        author {
          id
        }
        tags {
          id
        }
        date
        status
    }
  }
  `;
};

export const addDbItem = (item: ItemDataType) => {
	return gql`
    mutation Item {
      createItem(input: {
        title: "${item.title}";
        image: "${item.image}";
        date: "${item.date}";
        status: "${item.status}";
        author: "${item.author}";
        tags: item.tags;
      }) {
        id
      }
    }
  `;
};

export const updateDbItem = (item: ItemDataType) => {
	return gql`
  mutation Item {
    updateItem(id: "${item.id}", input: {
      title: "${item.title}";
      image: "${item.image}";
      date: "${item.date}";
      status: "${item.status}";
      author: "${item.author}";
      tags: item.tags;
    }) {
      id
    }
  }
`;
};
