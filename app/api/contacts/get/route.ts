import { auth } from "@/auth";
import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import type { Contact } from "@/utils/types";

export async function GET() {
  console.log("request recieved from frontend");
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

    // Remove duplicates and sort contacts by names alphabetically
    const seenPhones = new Set();

    const uniqueContacts = response.connections
      .filter((contact: Contact) => contact.names && contact.phoneNumbers)
      .filter((contact: Contact) => {
        const phone = contact.phoneNumbers?.[0]?.value;

        if (phone && !seenPhones.has(phone)) {
          seenPhones.add(phone);
          return true;
        }
        return false; // Duplicate found
      })
      .sort((a: Contact, b: Contact) => {
        const nameA = a.names[0]?.displayName?.toLowerCase() || "";
        const nameB = b.names[0]?.displayName?.toLowerCase() || "";
        return nameA.localeCompare(nameB);
      });

    console.log("session--", session);

    return NextResponse.json({
      user: {
        name: session.user?.name,
        email: session.user?.email,
        image: session.user?.image,
      },
      response: { connections: uniqueContacts },
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
