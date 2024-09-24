import BalanceSheetReport from "interfaces/BalanceSheetReport";
import api from './api';

export const fetchBalanceSheetData = async (): Promise<BalanceSheetReport> => {
    const response = await api.get("/balance-sheet");
    return response.data;
};
