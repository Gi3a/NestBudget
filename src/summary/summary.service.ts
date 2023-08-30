import { Injectable } from '@nestjs/common';
import { ReportType } from 'src/data';
import { ReportService } from 'src/report/report.service';

@Injectable()
export class SummaryService {

    // to use Service from different folder we have to inject it in summary.modules
    constructor(private readonly reportSerivce: ReportService) { }

    calculateSummary() {

        const totalExpenses = this.reportSerivce.getAllReports(ReportType.EXPENSE)
            // reduce will use (accumulator, currentValue) use func to each element
            .reduce((sum, report) => sum + report.amount, 0)
        const totalIncome = this.reportSerivce.getAllReports(ReportType.INCOME)
            .reduce((sum, report) => sum + report.amount, 0)

        return {
            totalIncome,
            totalExpenses,
            netIncome: totalIncome - totalExpenses
        }
    }
}

