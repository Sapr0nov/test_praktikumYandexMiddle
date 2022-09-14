import { User } from "./User";

export type ChatFields = {
  id: number;
  title: string;
  avatar: string | null;
  created_by: number;
  unread_count: number;
  last_message: string | null;
  reason: string;
};
export class Chat {
  public id: number | null = null;
  public title: string | null = null;
  public avatar: string | null = null;
  public created_by: number | null = null;
  public unreaded_count: number | null = null;
  public last_message: {
    user: User | null;
    id: number | string;
    content: string | null;
    time: string | null;
  } = { user: null, id: "", content: null, time: null };
}
