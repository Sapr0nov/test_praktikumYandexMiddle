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
  public id: number | null;
  public title: string | null;
  public avatar: string | null;
  public created_by: number | null;
  public unreaded_count: number | null;
  public last_message: {
    user: User;
    id: number | string;
    content: string | null;
    time: string | null;
  };
}
