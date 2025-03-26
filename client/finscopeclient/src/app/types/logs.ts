export interface Log {
  id: string;
  action: string;
  details: string;
  timestamp: string;
  userId: string;
}

export interface CreateLogVariables {
  action: string;
  details: string;
  userId: string;
}

export interface CreateLogResponse {
  createLog: Log;
}
