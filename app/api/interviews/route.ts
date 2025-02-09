import prisma from "@/lib/prisma"

export async function GET(){
    try{
        const interviews = await prisma.interview.findMany()
        return new Response(JSON.stringify(interviews), { status: 200 })
    }catch(error){
        return new Response(JSON.stringify({ error: "Error fetching interviews" }), { status: 500 })
    }
}



export async function POST(request:Request){
    try{
        const { candidateId, interviewerId, adminId, scheduledAt, status } = await request.json()
        const interview = await prisma.interview.create({
            data: { candidateId, interviewerId, adminId, scheduledAt, status },
        })
        return new Response(JSON.stringify(interview), { status: 201 })
    }catch(error){
        return new Response(JSON.stringify({ error: "Error creating interview" }), { status: 500 })
    }
}

export async function PUT(request:Request){
    const { interviewId, status } = await request.json()
    const interview = await prisma.interview.update({
        where: { id: interviewId },
        data: { status },
    })
    return new Response(JSON.stringify(interview), { status: 200 })
}

export async function DELETE(request:Request){
    const { interviewId } = await request.json()
    await prisma.interview.delete({ where: { id: interviewId } })
    return new Response(null, { status: 204 })
}