import { auth } from "@/auth";
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const session = await auth();
  if (!session) {
    return NextResponse.json(
      { message: "No session found" },
      { status: 401 }, // Unauthorized
    );
  }

  try {
    const user = await prisma.account.findMany({
      where: { userId: session?.user?.id, provider: "google" },
    });

    if (!user || !user[0]?.access_token) {
      return NextResponse.json(
        { message: "No access token found" },
        { status: 403 }, // Forbidden
      );
    }

    const accessToken = user[0].access_token;

    // Make the request to Google People API
    const getRequest = await fetch(
      "https://people.googleapis.com/v1/people/me/connections?personFields=names,emailAddresses,phoneNumbers,photos&pageSize=1000",
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      },
    );

    if (!getRequest.ok) {
      throw new Error(`Error fetching data: ${getRequest.statusText}`);
    }

    const response = await getRequest.json();
    console.log("response", response.connections.length);

    return NextResponse.json({
      user: user,
      session: session,
      response,
    });
  } catch (error) {
    const err = error as Error;
    console.error("Error: ", error);
    return NextResponse.json(
      {
        session: session,
        message: "Something went wrong!",
        error: err?.message, // Return error message for better debugging
      },
      { status: 500 },
    );
  }
}
