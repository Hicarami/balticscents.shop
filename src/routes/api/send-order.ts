import { createFileRoute } from "@tanstack/react-router";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);
const OWNER_EMAIL = process.env.OWNER_EMAIL || "owner@moross.com";

export const Route = createFileRoute("/api/send-order")({
  server: {
    handlers: {
      POST: async ({ request }: { request: Request }) => {
        try {
          const { customer, items, subtotal, shipping, total } = await request.json();

          if (!customer || !items || items.length === 0) {
            return new Response(JSON.stringify({ error: "Invalid order data" }), {
              status: 400,
              headers: { "Content-Type": "application/json" },
            });
          }

          // Build HTML table for items
          const itemsHtml = items
            .map(
              (item: any) => `
              <tr>
                <td style="padding: 8px; border-bottom: 1px solid #333;">${item.name} (${item.size}ml)</td>
                <td style="padding: 8px; border-bottom: 1px solid #333; text-align: center;">${item.qty}</td>
                <td style="padding: 8px; border-bottom: 1px solid #333; text-align: right;">$${item.unitPrice}</td>
                <td style="padding: 8px; border-bottom: 1px solid #333; text-align: right; color: #c5a059;">$${item.totalPrice}</td>
              </tr>`
            )
            .join("");

          const emailHtml = `
            <div style="font-family: Arial, sans-serif; background-color: #111; color: #eee; padding: 30px; border-radius: 8px;">
              <h1 style="color: #c5a059; font-size: 24px; margin-bottom: 20px;">Jauna pasūtījuma pieprasījums</h1>
              
              <h2 style="font-size: 16px; border-bottom: 1px solid #444; padding-bottom: 8px;">Customer & Shipping</h2>
              <p style="margin: 4px 0;"><strong>Vārds:</strong> ${customer.firstName} ${customer.lastName}</p>
              <p style="margin: 4px 0;"><strong>E-Pasts:</strong> ${customer.email}</p>
              <p style="margin: 4px 0;"><strong>Telefons:</strong> ${customer.phone}</p>
              <p style="margin: 4px 0;"><strong>Adrese:</strong> ${customer.address}, ${customer.city}, ${customer.postalCode}, ${customer.country}</p>

              <h2 style="font-size: 16px; border-bottom: 1px solid #444; padding-bottom: 8px; margin-top: 24px;">Pasūtījuma kopsavilkums</h2>
              <table style="width: 100%; border-collapse: collapse; margin-top: 12px; text-align: left; font-size: 14px;">
                <thead>
                  <tr style="color: #aaa; font-size: 12px; text-transform: uppercase;">
                    <th style="padding: 8px;">Item</th>
                    <th style="padding: 8px; text-align: center;">Qty</th>
                    <th style="padding: 8px; text-align: right;">Price</th>
                    <th style="padding: 8px; text-align: right;">Total</th>
                  </tr>
                </thead>
                <tbody>
                  ${itemsHtml}
                </tbody>
              </table>

              <div style="margin-top: 20px; text-align: right; font-size: 14px; line-height: 1.6;">
                <p style="margin: 4px 0;">Subtotal: $${subtotal.toFixed(2)}</p>
                <p style="margin: 4px 0;">Shipping: ${shipping === 0 ? "Free" : `$${shipping}`}</p>
                <p style="margin: 8px 0; font-size: 18px; font-weight: bold; color: #c5a059;">Total: $${total.toFixed(2)}</p>
              </div>
            </div>
          `;

          await resend.emails.send({
            from: "Moross Orders <onboarding@resend.dev>",
            to: OWNER_EMAIL,
            subject: `New Order: ${customer.firstName} ${customer.lastName}`,
            html: emailHtml,
          });

          return new Response(JSON.stringify({ success: true }), {
            status: 200,
            headers: { "Content-Type": "application/json" },
          });
        } catch (error: any) {
          return new Response(JSON.stringify({ error: error.message }), {
            status: 500,
            headers: { "Content-Type": "application/json" },
          });
        }
      },
    },
  },
});