export interface IUser {
  id?: string,
  login?: string,
  name?: string,
  password?: string
};

export interface IColumn {
  title?: string,
   order?: number
};

export interface IBoard {
  id?: string,
  title?: string,
  columns?: Array<IColumn>
};

export interface ITask {
  id?: string,
  title?: string,
  order?: number,
  description?: string,
  userId?: string | null,
  boardId?: string | null,
  columnId?: string | null,
};