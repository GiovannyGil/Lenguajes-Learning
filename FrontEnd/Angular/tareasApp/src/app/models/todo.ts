export interface todoModel
 {
  id: number;
  title: string;
  completed: boolean;
  editing?: boolean;
 }

 //  tipo para filtrar por tipo
 export type FilterType = 'all' | 'active' | 'completed';
