export interface ConvertRequest {
    amount: number;
    from: string;
    to: string;
    userId: string;
  }
  
export interface ConvertResponse {
    msg: string;
    from: string;
    to: string;
    amount: number;
    result: string;
    created_at: string;
  }