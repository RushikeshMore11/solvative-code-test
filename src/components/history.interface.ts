import { IHistory } from "./calculator.interface";

export interface IHistoryProps {
  toggleHistoryPanel: () => void;
  isVisible: boolean;
  history: IHistory[];
  clearHistory: () => void;
}
