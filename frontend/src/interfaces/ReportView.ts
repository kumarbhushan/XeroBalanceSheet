interface ReportRow {
    RowType: String;
    Title: String;
    Cells: Array<{ Value: String }>;
    Rows:Array<{RowType: String, Cells:Array<{ Value: String }>}>;
}

export default ReportRow