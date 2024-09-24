import ReportRow from "interfaces/ReportView";

interface BalanceSheetReport {
    Reports: Array<{
        ReportID:String,
        ReportName: String,
        ReportType:String,
        ReportTitles:Array<String>,
        ReportDate:String,
        UpdatedDateUTC:String,
        Fields: Array<String>
        Rows: Array<ReportRow>;
    }>;
}

export default BalanceSheetReport