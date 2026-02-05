import {pgTable, text, varchar} from "drizzle-orm/pg-core"
import { sql } from "drizzle-orm"
import {integer} from "drizzle-orm/pg-core/columns/integer";
import {date} from "drizzle-orm/pg-core/columns/date";



export const todos = pgTable("todos", {
    id: integer().primaryKey().generatedAlwaysAsIdentity(),
    name: varchar({ length: 255 }).notNull(),
    description: text().notNull(),
    importance: varchar({ length: 20}).notNull(),
    due_date: date()
})



