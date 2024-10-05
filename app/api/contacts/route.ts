import { google } from "googleapis";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  const session = await auth();
  console.log("completed session");

  const user = await prisma.account.findMany({
    where: { userId: session?.user?.id, provider: "google" },
  });
  const accessToken = user[0].access_token;

  console.log("completed user and accessToken");

  const getRequest = await fetch(
    "https://people.googleapis.com/v1/people/me/connections?personFields=names,emailAddresses,phoneNumbers&pageSize=1000",
    {
      headers: {
        Authorization: "Bearer " + `${accessToken}`,
      },
    },
  );

  const response = await getRequest.json();
  console.log("response", response);
  console.log("response", response.connections.length);

  // const getRequest2 = await fetch(
  //   "https://people.googleapis.com/v1/people/me/connections?personFields=names,emailAddresses",
  //   {
  //     headers: {
  //       Authorization: `Bearer ${session?.sessionToken}`,
  //     },
  //   },
  // );
  // const response2 = await getRequest2.json();
  // console.log("response2", response2);

  return NextResponse.json({
    user: user,
    session: session,
    response,
    // response2,
  });
}
