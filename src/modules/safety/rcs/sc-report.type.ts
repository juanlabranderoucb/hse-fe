
export interface ScReport {
  id: string;
  description: string;
  user: {
    userName: string;
    displayName: string;
  };
  elapsed: string;
  likes: number;
  replies: number;
}
