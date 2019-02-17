/**
 * @string status ##enum who uses 4 status: offline, online, busy, away.
 *
 */
export type status = 'online' | 'offline' | 'away' | 'busy';

export interface User {
    nick: string;
    subnick?: string;
    age?: number;
    email: string;
    friend: boolean;
    uid: any;
    status: status;
    avatar?: string;
    friends?: any;
}
