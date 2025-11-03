import { FastifyReply, FastifyRequest } from "fastify";
import { GetGSCDataRequest, GSCResponse } from "./types.js";
import { gscConnections } from "../../db/postgres/schema.js";
import { eq } from "drizzle-orm";
import { refreshGSCToken } from "./utils.js";
import { getUserHasAccessToSite } from "../../lib/auth-utils.js";
import { db } from "../../db/postgres/postgres.js";

/**
 * Fetches search query data from Google Search Console API
 */
export async function getGSCQueries(req: FastifyRequest<GetGSCDataRequest>, res: FastifyReply) {
  try {
    const { site } = req.params;
    const { startDate, endDate } = req.query;
    const siteId = Number(site);

    if (isNaN(siteId)) {
      return res.status(400).send({ error: "Invalid site ID" });
    }

    if (!startDate || !endDate) {
      return res.status(400).send({ error: "Missing startDate or endDate" });
    }

    // Check if user has access to this site
    const hasAccess = await getUserHasAccessToSite(req, siteId);
    if (!hasAccess) {
      return res.status(403).send({ error: "Access denied" });
    }

    // Get connection
    const [connection] = await db.select().from(gscConnections).where(eq(gscConnections.siteId, siteId));

    if (!connection) {
      return res.status(404).send({ error: "GSC not connected for this site" });
    }

    // Refresh token if needed
    const accessToken = await refreshGSCToken(siteId);
    if (!accessToken) {
      return res.status(500).send({ error: "Failed to refresh access token" });
    }

    // Query GSC API
    const gscResponse = await fetch(
      `https://www.googleapis.com/webmasters/v3/sites/${encodeURIComponent(connection.gscPropertyUrl)}/searchAnalytics/query`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          startDate,
          endDate,
          dimensions: ["query"],
          rowLimit: 100, // Top 100 queries
        }),
      }
    );

    if (!gscResponse.ok) {
      const errorText = await gscResponse.text();
      console.error("GSC API error:", errorText);
      return res.status(gscResponse.status).send({ error: "Failed to fetch GSC data", details: errorText });
    }

    const data: GSCResponse = await gscResponse.json();

    // Transform the response to a simpler format
    const queries = (data.rows || []).map(row => ({
      query: row.keys[0],
      clicks: row.clicks,
      impressions: row.impressions,
      ctr: row.ctr,
      position: row.position,
    }));

    return res.send({ data: queries });
  } catch (error) {
    console.error("Error fetching GSC queries:", error);
    return res.status(500).send({ error: "Failed to fetch GSC queries" });
  }
}
