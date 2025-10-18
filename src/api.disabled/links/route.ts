// API de Links - Comentado temporariamente (Firebase)
// TODO: Descomentar quando integrar com Firebase e NextAuth

/*
import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";
import { adminDb } from "@/lib/firebaseAdmin";
import { SECTIONS, type Section } from "@/lib/sections";

const COLLECTION = "sectionLinks";

export async function GET() {
  if (!adminDb) return NextResponse.json({ error: "Admin not configured" }, { status: 500 });
  const snapshot = await adminDb.collection(COLLECTION).get();
  const data = snapshot.docs.map((d) => d.data());
  return NextResponse.json(data);
}

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  if (!adminDb) return NextResponse.json({ error: "Admin not configured" }, { status: 500 });

  const body = (await req.json()) as { section: Section; urls: string[] };
  if (!SECTIONS.includes(body.section)) {
    return NextResponse.json({ error: "Invalid section" }, { status: 400 });
  }
  await adminDb.collection(COLLECTION).doc(body.section).set({ section: body.section, urls: body.urls });
  return NextResponse.json({ ok: true });
}

export async function PUT(req: NextRequest) {
  return POST(req);
}

export async function DELETE(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  if (!adminDb) return NextResponse.json({ error: "Admin not configured" }, { status: 500 });

  const { section } = (await req.json()) as { section: Section };
  if (!SECTIONS.includes(section)) {
    return NextResponse.json({ error: "Invalid section" }, { status: 400 });
  }
  await adminDb.collection(COLLECTION).doc(section).delete();
  return NextResponse.json({ ok: true });
}
*/

import { NextResponse } from "next/server";
import { mockLinks } from "@/lib/mockData";

// Mock API - retorna dados estáticos
export async function GET() {
  const data = Object.entries(mockLinks).map(([section, urls]) => ({
    section,
    urls,
  }));
  return NextResponse.json(data);
}


