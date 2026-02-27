import { NextResponse } from "next/server";
import { getUserFromSession } from "@/lib/auth";
import { getDb } from "@/lib/mongodb";
import { ObjectId } from "mongodb";

export async function POST(request: Request) {
  try {
    const user = await getUserFromSession();
    if (!user) {
      return NextResponse.json(
        { message: "Not authenticated" },
        { status: 401 },
      );
    }

    const body = await request.json();
    const { amount, method, reference, note, type } = body || {};

    const numericAmount = Number(amount);
    if (!numericAmount || numericAmount <= 0) {
      return NextResponse.json(
        { message: "Valid amount is required" },
        { status: 400 },
      );
    }

    const db = await getDb();
    const funds = db.collection("fund_requests");
    const users = db.collection("users");
    const requestType = type === "withdraw" ? "withdraw" : "add";

    if (requestType === "withdraw") {
      const currentUser = await users.findOne<{
        tradingBalance?: number;
      }>({ _id: new ObjectId((user as { _id: ObjectId })._id) });
      const currentBalance = Number(currentUser?.tradingBalance ?? 0);
      if (numericAmount > currentBalance) {
        return NextResponse.json(
          { message: "Withdrawal amount cannot exceed current trading balance" },
          { status: 400 },
        );
      }
    }

    await funds.insertOne({
      userId: new ObjectId((user as { _id: ObjectId })._id),
      type: requestType,
      amount: numericAmount,
      method: method || "upi",
      reference: reference || "",
      note: note || "",
      status: "pending",
      createdAt: new Date(),
    });

    return NextResponse.json({
      message:
        requestType === "withdraw"
          ? "Withdraw request submitted. Admin will verify and process your withdrawal."
          : "Fund request submitted. Admin will verify payment and update your balance.",
    });
  } catch (error) {
    console.error("Fund request error:", error);
    return NextResponse.json(
      { message: "Failed to submit fund request" },
      { status: 500 },
    );
  }
}
