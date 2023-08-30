import {
    IsNumber,
    IsPositive,
    IsString,
    IsNotEmpty,
    IsOptional
} from "class-validator"
import {
    Exclude,
    Expose
} from "class-transformer"
import { ReportType } from "src/data";

// in case of use it, we have to allow using global pipes in main.ts

export class CreateReportDto {
    @IsNumber()
    @IsPositive()
    amount: number;

    @IsString()
    @IsNotEmpty()
    source: string;
}

export class UpdateReportDto {
    @IsOptional()
    @IsNumber()
    @IsPositive()
    amount: number;

    @IsOptional()
    @IsString()
    @IsNotEmpty()
    source: string;
}


export class ReportResponseDto {
    id: string;
    source: string;
    amount: number;

    @Exclude()
    created_at: Date;

    @Exclude()
    updated_at: Date;

    type: ReportType;

    @Expose({ name: "createdAt" })
    transformCreatedAt() {
        return this.created_at
    }

    // it could get data and transform, data can be partial like to the Report
    constructor(partial: Partial<ReportResponseDto>) {
        Object.assign(this, partial);
    }
}