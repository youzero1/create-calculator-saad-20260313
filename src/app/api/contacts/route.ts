import { NextResponse } from "next/server";
import { getDataSource } from "@/lib/data-source";
import { Contact } from "@/entities/Contact";

export async function GET() {
  try {
    const dataSource = await getDataSource();
    const contactRepository = dataSource.getRepository(Contact);
    const contacts = await contactRepository.find({
      order: { createdAt: "DESC" },
    });
    return NextResponse.json({ contacts });
  } catch (error) {
    console.error("Contacts API error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
