import { createFileRoute } from "@tanstack/react-router";
import { Resend } from "resend";

export const Route = createFileRoute("/api/send-order")({
  server: {
    handlers: {
      POST: async ({ request }: { request: Request }) => {
        try {
          const apiKey = process.env.RESEND_API_KEY;
          // Updated: Valid email fallback using your verified domain
          const ownerEmail =
            process.env.OWNER_EMAIL || "emilsmorozs0@gmail.com";

          if (!apiKey) {
            return new Response(
              JSON.stringify({
                error:
                  "RESEND_API_KEY is missing. Add it in your Vercel Environment Variables.",
              }),
              {
                status: 500,
                headers: {
                  "Content-Type": "application/json",
                },
              }
            );
          }

          const resend = new Resend(apiKey);

          const {
            customer,
            items,
            subtotal,
            shipping,
            total,
          } = await request.json();

          if (!customer || !items || items.length === 0) {
            return new Response(
              JSON.stringify({
                error: "Invalid order data",
              }),
              {
                status: 400,
                headers: {
                  "Content-Type": "application/json",
                },
              }
            );
          }

          const itemsHtml = items
            .map(
              (item: any) => `
<tr>
<td style="padding:8px;border-bottom:1px solid #333;">
${item.name} (${item.size}ml)
</td>

<td style="padding:8px;border-bottom:1px solid #333;text-align:center;">
${item.qty}
</td>

<td style="padding:8px;border-bottom:1px solid #333;text-align:right;">
$${item.unitPrice}
</td>

<td style="padding:8px;border-bottom:1px solid #333;text-align:right;color:#c5a059;">
$${item.totalPrice}
</td>
</tr>
`
            )
            .join("");

          const emailHtml = `
<div style="font-family:Arial,sans-serif;background:#111;color:#eee;padding:30px;border-radius:8px;">

<h1 style="color:#c5a059;">
New Order
</h1>

<h2>Customer</h2>

<p><b>Name:</b> ${customer.firstName} ${customer.lastName}</p>
<p><b>Email:</b> ${customer.email}</p>
<p><b>Phone:</b> ${customer.phone}</p>

<p>
<b>Address:</b>
${customer.address},
${customer.city},
${customer.postalCode},
${customer.country}
</p>

<h2 style="margin-top:30px;">
Products
</h2>

<table
style="width:100%;border-collapse:collapse;">

<thead>

<tr>

<th align="left">
Item
</th>

<th align="center">
Qty
</th>

<th align="right">
Price
</th>

<th align="right">
Total
</th>

</tr>

</thead>

<tbody>

${itemsHtml}

</tbody>

</table>

<div style="margin-top:25px;text-align:right;">

<p>
Subtotal:
$${subtotal.toFixed(2)}
</p>

<p>
Shipping:
${shipping === 0 ? "Free" : `$${shipping}`}
</p>

<h2 style="color:#c5a059;">
Total:
$${total.toFixed(2)}
</h2>

</div>

</div>
`;

          // Updated: Using a sender address on your verified custom domain
          const result = await resend.emails.send({
            from: "Baltic Scents Orders <orders@balticscents.shop>",
            to: ownerEmail,
            subject: `New Order - ${customer.firstName} ${customer.lastName}`,
            html: emailHtml,
          });

          return new Response(
            JSON.stringify({
              success: true,
              result,
            }),
            {
              status: 200,
              headers: {
                "Content-Type": "application/json",
              },
            }
          );
        } catch (error: any) {
          console.error(error);

          return new Response(
            JSON.stringify({
              error: error.message,
            }),
            {
              status: 500,
              headers: {
                "Content-Type": "application/json",
              },
            }
          );
        }
      },
    },
  },
});