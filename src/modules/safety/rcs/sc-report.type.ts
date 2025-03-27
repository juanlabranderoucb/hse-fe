export interface ScReportImpact {
  id: number;
  description: string;
}

interface ScReportSuggestedFix {
  id: number;
  description: string;
}

export interface ScReport {
  id: number;
  description: string;
  location: string;
  user: {
    userName: string;
    displayName: string;
  };
  elapsed: string;
  impacts: Array<ScReportImpact>
  suggestedFixes: Array<ScReportSuggestedFix>
  likes: number;
  replies: number;
}
