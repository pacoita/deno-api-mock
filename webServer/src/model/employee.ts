export interface Employee {
    id: number;
    firstname: string;
    lastname: string;
    email?: string;
}

export const EmployeeData: Employee[] = [
    { id: 1, firstname: 'Larry', lastname: 'Potter', email: 'larry.potter@hotmail.com' },
    { id: 2, firstname: 'Mara', lastname: 'Croft', email: 'mara.croft@gmail.com' },
    { id: 3, firstname: 'Thomas', lastname: 'Müller', email: 'thomas123@gmail.com' },
    { id: 5, firstname: 'Karl', lastname: 'Fritz', email: 'Karl_great@microsoft.com' },
    { id: 6, firstname: 'Paolo', lastname: 'Rossi' }
];
