import { pgTable, serial, text, varchar } from "drizzle-orm/pg-core";
import { InferModel } from "drizzle-orm";
import { db } from "..";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 256 }),
  email: text("email"),
  avatar: text("avatar"),
});

export type User = InferModel<typeof users>; // return type when queried
export type NewUser = InferModel<typeof users, "insert">; // insert type

type GetAllUsersFunction = () => Promise<User[]>;

export const getAllUsers: GetAllUsersFunction = async () =>
  await db.select().from(users);

export const insertUser = async (user: NewUser) => {
  return await db.insert(users).values(user).returning();
};
