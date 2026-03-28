import { getProducts } from "lib/shopify";
import { baseUrl } from "lib/utils";

function escapeXml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

export async function GET() {
  const products = await getProducts({});

  const items = products
    .filter((p) => p.availableForSale)
    .map((p) => {
      const price = p.priceRange.minVariantPrice;
      const image = p.featuredImage?.url ?? "";
      const link = `${baseUrl}/product/${p.handle}`;

      return `
    <item>
      <g:id>${escapeXml(p.id)}</g:id>
      <title>${escapeXml(p.title)}</title>
      <description>${escapeXml(p.description.substring(0, 5000))}</description>
      <link>${escapeXml(link)}</link>
      <g:image_link>${escapeXml(image)}</g:image_link>
      <g:availability>in_stock</g:availability>
      <g:price>${price.amount} ${price.currencyCode}</g:price>
      <g:brand>UMIACTIV</g:brand>
      <g:condition>new</g:condition>
      <g:google_product_category>5322</g:google_product_category>
    </item>`;
    })
    .join("\n");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss xmlns:g="http://base.google.com/ns/1.0" version="2.0">
  <channel>
    <title>UMIACTIV Products</title>
    <link>${baseUrl}</link>
    <description>UMIACTIV luxury activewear product feed</description>
${items}
  </channel>
</rss>`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/xml",
      "Cache-Control": "public, max-age=3600, s-maxage=3600",
    },
  });
}
