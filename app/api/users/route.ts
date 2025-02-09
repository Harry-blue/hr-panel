import prisma from "@/lib/prisma";

export async function GET(){
    try{
        const users = await prisma.user.findMany()
        return new Response(JSON.stringify(users), { status: 200 })
    }
    catch(error){
        return new Response(JSON.stringify({ error: "Error fetching users" }), { status: 500 })
    }
}



export async function POST(request:Request){
    try{
        const { email, password, role, name } = await request.json()
        const user = await prisma.user.create({
            data: { email, password, role, name },
        })
        return new Response(JSON.stringify(user), { status: 201 })
    }
    catch(error){
        return new Response(JSON.stringify({ error: "Error creating user" }), { status: 500 })
    }
}

export async function PUT(request:Request){
    const { userId, role } = await request.json()
    const user = await prisma.user.update({
        where: { id: userId },
        data: { role },
    })
    return new Response(JSON.stringify(user), { status: 200 })
}

export async function DELETE(request:Request){
    const { userId } = await request.json()
    await prisma.user.delete({ where: { id: userId } })
    return new Response(null, { status: 204 })
}