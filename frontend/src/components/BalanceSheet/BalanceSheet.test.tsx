import { render, screen } from "@testing-library/react";
import BalanceSheet from "./BalanceSheet";
import { fetchBalanceSheetData } from "services/BalanceSheetService";
import BalanceSheetReport from "interfaces/BalanceSheetReport";

jest.mock("services/BalanceSheetService");

const mockReportData: BalanceSheetReport = {
  Reports: [
    {
      ReportTitles: ["Balance Sheet Report"],
      Rows: [
        {
          RowType: "Section",
          Title: "Assets",
          Rows: [
            {
              RowType: "Summary",
              Cells: [{ Value: "Cash" }, { Value: "1000" }],
            },
          ],
          Cells: [],
        },
        {
          RowType: "Summary",
          Cells: [{ Value: "Liabilities" }, { Value: "500" }],
          Title: "Balance Sheet",
          Rows: [],
        },
      ],
      ReportID: "test",
      ReportName: "test",
      ReportType: "test",
      ReportDate: "23 Sep 2024",
      UpdatedDateUTC: "test",
      Fields: [],
    },
  ],
};

describe("BalanceSheet Component", () => {
  beforeAll(() => {
    jest.spyOn(console, "error").mockImplementation((message) => {
      if (!message.includes("act")) {
        console.error(message);
      }
    });
  });
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("renders loading state", async () => {
    (fetchBalanceSheetData as jest.Mock).mockResolvedValueOnce(mockReportData);

    render(<BalanceSheet />);

    expect(screen.getByText(/Loading.../i)).toBeInTheDocument();
  });

  test("renders data after fetch", async () => {
    (fetchBalanceSheetData as jest.Mock).mockResolvedValueOnce(mockReportData);

    render(<BalanceSheet />);

    await screen.findByText("Balance Sheet Report");
    expect(screen.getByText("Assets")).toBeInTheDocument();
    expect(screen.getByText("Cash")).toBeInTheDocument();
    expect(screen.getByText("1000")).toBeInTheDocument();
  });

  test("handles fetch error", async () => {
    (fetchBalanceSheetData as jest.Mock).mockRejectedValueOnce(
      new Error("Error fetching balance sheet data")
    );

    render(<BalanceSheet />);

    await screen.findByText(/Error fetching balance sheet data/i);
  });
});
