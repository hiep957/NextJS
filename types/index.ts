export interface Post {
    _id: number;
    title: string;
    content: string;
    createdAt: string;
    author: {
      name: string;
      avatar: string;
    };
    thumbnail: string;
    date: string;
    tag: string[];
  }