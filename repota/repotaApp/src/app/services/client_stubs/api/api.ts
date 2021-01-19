export * from './account.service';
import { AccountService } from './account.service';
export * from './jobReport.service';
import { JobReportService } from './jobReport.service';
export const APIS = [AccountService, JobReportService];
