import { getDb } from "@/lib/mongodb";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const fullName = formData.get("fullName")?.toString() ?? "";
    const email = formData.get("email")?.toString() ?? "";
    const phone = formData.get("phone")?.toString() ?? "";
    const panNumber = formData.get("panNumber")?.toString() ?? "";
    const aadhaarNumber = formData.get("aadhaarNumber")?.toString() ?? "";
    const accountNo = formData.get("accountNo")?.toString() ?? "";
    const ifscCode = formData.get("ifscCode")?.toString() ?? "";
    const documentType = formData.get("documentType")?.toString() ?? "";

    const photo = formData.get("photo");
    const bankProof = formData.get("bankProof");
    const document = formData.get("document");

    if (!fullName || !email || !phone) {
      return NextResponse.json(
        { message: "Full name, email and phone are required" },
        { status: 400 },
      );
    }

    if (!accountNo || !ifscCode) {
      return NextResponse.json(
        { message: "Account details are required" },
        { status: 400 },
      );
    }

    const db = await getDb();
    const users = db.collection("users");

    const existing = await users.findOne({ email });
    if (existing) {
      return NextResponse.json(
        { message: "Email already registered" },
        { status: 400 },
      );
    }

    const documents: Record<
      string,
      { data: Buffer; contentType: string } | null
    > = {
      photo: null,
      signature: null,
      bankProof: null,
      document: null,
    };

    async function fileToDoc(
      fileEntry: FormDataEntryValue | null,
    ): Promise<{ data: Buffer; contentType: string } | null> {
      if (!fileEntry || !(fileEntry instanceof File)) return null;
      const arrayBuffer = await fileEntry.arrayBuffer();
      return {
        data: Buffer.from(arrayBuffer),
        contentType: fileEntry.type || "application/octet-stream",
      };
    }

    documents.photo = await fileToDoc(photo);
    const signatureFile = formData.get("signature");
    documents.signature = await fileToDoc(signatureFile);
    documents.bankProof = await fileToDoc(bankProof);
    documents.document = await fileToDoc(document);

    await users.insertOne({
      fullName,
      email,
      phone,
      panNumber: panNumber || null,
      aadhaarNumber: aadhaarNumber || null,
      bankDetails: {
        accountNo,
        ifscCode,
        documentType,
      },
      status: "pending",
      createdAt: new Date(),
      passwordHash: null,
      tradingBalance: 0,
      margin: 0,
      documents,
    });

    return NextResponse.json(
      {
        message: "Registration submitted successfully",
      },
      { status: 201 },
    );
  } catch (error) {
    console.error("Registration error:", error);
    return NextResponse.json(
      { message: "Something went wrong while registering" },
      { status: 500 },
    );
  }
}

