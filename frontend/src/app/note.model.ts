export interface Tag {
  id?: number;
  name: string;
}

export interface Note {
  id?: number;
  title: string;
  content: string;
  archived: boolean;
  tags?: Tag[];
}
