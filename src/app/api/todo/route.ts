import {db} from "@/lib/db";
import {todos} from "@/db/schema";
import {NextResponse} from "next/server";
import {eq} from "drizzle-orm/sql/expressions/conditions";


export async function GET() {
    try {
        const db_response = await db.select().from(todos);
        return NextResponse.json(db_response);
    } catch (error) {
        console.log(error)
        return NextResponse.json({error: "Failed to Fetch "}, {status: 500})
    }

}


export async function POST(request: Request) {
    try {
        const {data} = await request.json();
        const insert = await db.insert(todos).values({
            name: data.name,
            description: data.description,
            importance: data.importance,
            due_date: data.due_date ? data.due_date : undefined,
        }).returning()

        return NextResponse.json(insert);
    } catch (e) {
        return NextResponse.json({error: "failed to insert"}, {status: 500})
    }

}

export async function PUT(request: Request) {
    try {
        const {data} = await request.json();
        const update = await db.update(todos).set({
            name: data.name,
            description: data.description,
            importance: data.importance,
            due_date: data.due_date
        }).where(eq(todos.id, data.id())).returning()
        return NextResponse.json(update)
    }
    catch (e){
        return  NextResponse.json({error: "Failed to Update", status: 500})
    }
}


export async function DELETE(request: Request){
    try {
        const { data } = await request.json();
        const deleting = await db.delete(todos).where(eq(todos.id , data.id))
        return NextResponse.json({status: 200})
    }
    catch (e) {
        return  NextResponse.json({error: "failed to delete", status: 500})
    }
}