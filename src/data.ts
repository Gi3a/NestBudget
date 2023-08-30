export enum ReportType {
    INCOME = "income",
    EXPENSE = "expense"
}

interface Data {
    report: {
        id: string;
        source: string;
        amount: number;
        created_at: Date;
        updated_at: Date;
        type: ReportType;
    }[]
}

export const data: Data = {
    report: [
        {
            id: "192c773b-90ee-4d1e-b0c1-620b1930c13a",
            source: "Salary",
            amount: 5600,
            created_at: new Date(),
            updated_at: new Date(),
            type: ReportType.INCOME
        },
        {
            id: "192c773b-90ee-4d1e-b0c1-620b1930c13b",
            source: "YouTube",
            amount: 600,
            created_at: new Date(),
            updated_at: new Date(),
            type: ReportType.INCOME
        },
        {
            id: "192c773b-90ee-4d1e-b0c1-620b1930c13c",
            source: "Food",
            amount: 300,
            created_at: new Date(),
            updated_at: new Date(),
            type: ReportType.EXPENSE
        },
    ],
};
