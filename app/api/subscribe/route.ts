import { shopifyFetch } from "lib/shopify";
import { NextRequest, NextResponse } from "next/server";

const customerCreateMutation = `
  mutation customerCreate($input: CustomerCreateInput!) {
    customerCreate(input: $input) {
      customer {
        id
        email
      }
      customerUserErrors {
        code
        field
        message
      }
    }
  }
`;

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json();

    if (!email || typeof email !== "string" || !email.includes("@")) {
      return NextResponse.json({ error: "Invalid email" }, { status: 400 });
    }

    const { body } = await shopifyFetch<{
      data: {
        customerCreate: {
          customer: { id: string; email: string } | null;
          customerUserErrors: { code: string; message: string }[];
        };
      };
      variables: { input: { email: string; acceptsMarketing: boolean } };
    }>({
      query: customerCreateMutation,
      variables: {
        input: {
          email: email.trim().toLowerCase(),
          acceptsMarketing: true,
        },
      },
    });

    const errors = body.data?.customerCreate?.customerUserErrors;

    if (errors?.length && errors[0]?.code !== "TAKEN") {
      return NextResponse.json({ error: errors[0]?.message }, { status: 400 });
    }

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Failed to subscribe" }, { status: 500 });
  }
}
