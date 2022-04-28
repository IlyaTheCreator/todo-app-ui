export interface IList {
  id: number;
  name: string;
}

// Todo entity type
export type ITodo = {
  id: number;
  name: string;
  isCompleted: boolean;
};

// Union for typing filter state (bar at the bottom of the list of todos)
export type filterNameType = 'all' | 'active' | 'completed';
