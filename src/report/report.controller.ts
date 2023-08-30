import {
    Controller,
    Get,
    Post,
    Put,
    Delete,
    Param,
    Body,
    HttpCode,
    ParseUUIDPipe,
    ParseEnumPipe
} from "@nestjs/common"
// Connecting the type
import { ReportType } from "src/data"
// For validation data in body
import { CreateReportDto, ReportResponseDto, UpdateReportDto } from "src/dtos/report.dto"
// Connecting the service
import { ReportService } from "./report.service"


// endpoint to site.com/report/income or report/expense
@Controller('report/:type')
export class ReportController {

    // integration of service
    constructor(
        private readonly reportService: ReportService
    ) { }

    // func(params): response {}
    // Here I use DTO for custom response
    @Get()
    getAllReports(
        @Param('type', new ParseEnumPipe(ReportType)) type: string
    ): ReportResponseDto[] {
        const reportType =
            type === "income" ? ReportType.INCOME : ReportType.EXPENSE;
        return this.reportService.getAllReports(reportType);
    }

    @Get(':id')
    getReportById(
        @Param('type', new ParseEnumPipe(ReportType)) type: string,
        @Param('id', ParseUUIDPipe) id: string
    ): ReportResponseDto {
        const reportType =
            type === "income" ? ReportType.INCOME : ReportType.EXPENSE;
        return this.reportService.getReportById(reportType, id);
    }

    @Post()
    createReport(
        @Body() { amount, source }: CreateReportDto,
        @Param('type', new ParseEnumPipe(ReportType)) type: string
        // without DTO
        // @Body() { amount, source }: {
        // 	amount: number;
        // 	source: string;
        // }
    ): ReportResponseDto {
        const reportType =
            type === "income" ? ReportType.INCOME : ReportType.EXPENSE;
        return this.reportService.createReport(reportType, { amount, source });

    }

    @Put(':id')
    updateReport(
        @Body() body: UpdateReportDto,
        @Param('id', ParseUUIDPipe) id: string,
        @Param('type', new ParseEnumPipe(ReportType)) type: string
    ): ReportResponseDto {
        const reportType =
            type === "income" ? ReportType.INCOME : ReportType.EXPENSE;
        return this.reportService.updateReport(reportType, id, body)

    }

    @HttpCode(204)
    @Delete(':id')
    deleteReport(
        @Param('id', ParseUUIDPipe) id: string
    ) {
        return this.reportService.deleteReport(id);
    }
}