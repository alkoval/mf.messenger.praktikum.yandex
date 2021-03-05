export interface ArhiveMessage {
  id: number;
  chat_id: number;
  user_id: number;
  content: string;
  type: string;
  time: Date;
}
