import prisma from "@/lib/prisma"

export async function GET() {
    try {
        const feedbacks = await prisma.feedback.findMany()
        return new Response(JSON.stringify(feedbacks), { status: 200 })
    } catch (error) {
        return new Response(JSON.stringify({ error: "Error fetching feedbacks" }), { status: 500 })
    }
}
 
 
export async function POST(request: Request) {
    try {
        const { interviewId, interviewerId, candidateId, rating, comments } = await request.json()
        const feedback = await prisma.feedback.create({
            data: { interviewId, interviewerId, candidateId, rating, comments },
        })
        return new Response(JSON.stringify(feedback), { status: 201 })
    } catch (error) {
        return new Response(JSON.stringify({ error: "Error creating feedback" }), { status: 500 })
    }
}
 
export async function PUT(request: Request) {
    const { feedbackId, rating, comments } = await request.json()
    const feedback = await prisma.feedback.update({
        where: { id: feedbackId },
        data: { rating, comments },
    })
    return new Response(JSON.stringify(feedback), { status: 200 })
}
 
export async function DELETE(request: Request) {
    const { feedbackId } = await request.json()
    await prisma.feedback.delete({ where: { id: feedbackId } })
    return new Response(null, { status: 204 })
}
 