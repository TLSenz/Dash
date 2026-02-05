import { pgTable, integer, varchar, text, date } from "drizzle-orm/pg-core"
import { sql } from "drizzle-orm"



export const todos = pgTable("todos", {
	id: integer().primaryKey().generatedAlwaysAsIdentity({ name: "todos_id_seq", startWith: 1, increment: 1, minValue: 1, maxValue: 2147483647, cache: 1 }),
	name: varchar({ length: 255 }).notNull(),
	description: text().notNull(),
	importance: varchar({ length: 20 }).notNull(),
	dueDate: date("due_date"),
});
