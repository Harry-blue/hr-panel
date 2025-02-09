import prisma from "@/lib/prisma";

export async function GET(){
    try{
        const notifications = await prisma.notification.findMany()
        return new Response(JSON.stringify(notifications), { status: 200 })
    }
    catch(error){
        return new Response(JSON.stringify({ error: "Error fetching notifications" }), { status: 500 })
    }
}



export async function POST(request:Request){
    try{
        const { userId, message, type } = await request.json()
        const notification = await prisma.notification.create({
            data: { userId, message, type },
        })
        return new Response(JSON.stringify(notification), { status: 201 })
    }
    catch(error){
        return new Response(JSON.stringify({ error: "Error creating notification" }), { status: 500 })
    }
}

export async function PUT(request:Request){
    const { notificationId, message } = await request.json()
    const notification = await prisma.notification.update({
        where: { id: notificationId },
        data: { message },
    })
    return new Response(JSON.stringify(notification), { status: 200 })
}

export async function DELETE(request:Request){
    const { notificationId } = await request.json()
    await prisma.notification.delete({ where: { id: notificationId } })
    return new Response(null, { status: 204 })
}
