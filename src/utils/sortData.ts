import { TableData } from '../pages/Dashboard';

export default function sortData(data: TableData[]): TableData[] {
  return data.sort((a, b) => b.totalCases - a.totalCases);
}
