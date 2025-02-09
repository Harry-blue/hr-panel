
import NextAuth from "next-auth/next";
import { authOptions } from "@/lib/auth"; // Update the path accordingly

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
