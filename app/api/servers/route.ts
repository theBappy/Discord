import { getAuth } from "@clerk/nextjs/server";
import { db } from "@/lib/db";
import { MemberRole } from "@prisma/client";
import { NextResponse } from "next/server";
import { v4 as uuidv4 } from "uuid";

export async function POST(req: Request) {
  try {
    const authData = getAuth(req); // read from Authorization header
    const userId = authData.userId;

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const profile = await db.profile.findUnique({
      where: { userId },
    });

    if (!profile) {
      return new NextResponse("No Profile Found", { status: 401 });
    }

    const { name, imageUrl } = await req.json();

    const server = await db.server.create({
      data: {
        profileId: profile.id,
        name,
        imageUrl,
        inviteCode: uuidv4(),
        channels: {
          create: [
            {
              name: "general",
              profile: { connect: { id: profile.id } },
            },
          ],
        },
        members: {
          create: [
            {
              profile: { connect: { id: profile.id } },
              role: MemberRole.ADMIN,
            },
          ],
        },
      },
    });

    return NextResponse.json(server);
  } catch (error) {
    console.log("[SERVERS_POST]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
