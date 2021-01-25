export interface HistoryMessage {
    chatDialogId: number;
    type: string;
    from: number;
    unread: boolean;
    time: Date;
    shortTime: string;
}