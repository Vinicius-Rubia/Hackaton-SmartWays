export interface ChatState {
  messages: ChatMessage[];
  status: boolean;
  context: string;
  searchMessage: string[] | undefined;
  search: boolean;
  statusMessage: boolean;
}

export interface ChatMessage {
  id?: string,
  author: string,
  message: string,
  createdAt?: string | Date;
}