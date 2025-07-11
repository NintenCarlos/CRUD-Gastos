export interface IExpenses {
    id: number
    category: string,
    description: string, 
    amount: number,
    date: string
}

export type RootStackParamList = {
    'Home': undefined;
    'Create-Expense': undefined;
    'Update-Expense': { expenseToUpdate: IExpenses };
    'Manu': undefined
  };