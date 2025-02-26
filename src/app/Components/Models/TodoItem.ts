export interface TodoItem {
  id?: number;
  title?: string;
  isCompleted?: boolean;
  userId?: string | null | undefined;
  isDeleted?: boolean;
  isEditing?: boolean;
  sharedWith?: string[];
  isShared?: boolean; // Optional property if you want to add it manually
}


export interface Task {
  id: number;
  name: string;
  isComplete: boolean;
}