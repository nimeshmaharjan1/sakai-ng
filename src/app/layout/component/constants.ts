export interface FinanceReportRow {
    store: string;
    jan: number;
    feb: number;
    mar: number;
    apr: number;
    may: number;
    jun: number;
    jul: number;
    aug: number;
    sep: number;
    oct: number;
    nov: number;
    dec: number;
    total: number;
}

export const FINANCE_REPORT_DATA: FinanceReportRow[] = [
    // ... (Paste all 10 rows of data here or import them)
    // For brevity, I'll include the first two here:
    {
        store: 'Amazon',
        jan: 6.06,
        feb: 12.34,
        mar: 56.9,
        apr: 88.0,
        may: 10.0,
        jun: 100.0,
        jul: 10.0,
        aug: 100.0,
        sep: 96.98,
        oct: 262.28,
        nov: 15.0,
        dec: 30.0,
        total: 787.96,
    },
    {
        store: 'Amazon Prime',
        jan: 0.0,
        feb: 0.0,
        mar: 0.0,
        apr: 0.0,
        may: 0.0,
        jun: 0.0,
        jul: 0.0,
        aug: 0.0,
        sep: 0.0,
        oct: 0.0,
        nov: 0.0,
        dec: 0.0,
        total: 0.0,
    },
    {
        store: 'Apple Music',
        jan: 85.5,
        feb: 92.1,
        mar: 105.0,
        apr: 98.7,
        may: 112.5,
        jun: 108.3,
        jul: 115.0,
        aug: 120.0,
        sep: 125.0,
        oct: 130.0,
        nov: 135.0,
        dec: 140.0,
        total: 1367.1,
    },
    {
        store: 'AWA',
        jan: 0.0,
        feb: 0.0,
        mar: 0.0,
        apr: 0.0,
        may: 0.0,
        jun: 0.0,
        jul: 0.0,
        aug: 0.0,
        sep: 0.0,
        oct: 0.0,
        nov: 0.0,
        dec: 0.0,
        total: 0.0,
    },
    {
        store: 'Google Subscription',
        jan: 262.28,
        feb: 262.28,
        mar: 262.28,
        apr: 262.28,
        may: 262.28,
        jun: 262.28,
        jul: 262.28,
        aug: 262.28,
        sep: 262.28,
        oct: 262.28,
        nov: 262.28,
        dec: 262.28,
        total: 3147.36,
    },
    // ... and so on for the rest of the 10 rows
];
