import { round } from "lodash";
import mapboxgl from "mapbox-gl";
import { useEffect, useRef } from "react";
import { useTimelineSessions } from "./useTimelineSessions";

export function useTimelineLayer({
  map,
  mapLoaded,
  mapView,
}: {
  map: React.RefObject<mapboxgl.Map | null>;
  mapLoaded: boolean;
  mapView: string;
}) {
  const { activeSessions } = useTimelineSessions();
  const popupRef = useRef<mapboxgl.Popup | null>(null);

  useEffect(() => {
    if (!map.current || !mapLoaded) return;

    // Initialize popup once
    if (!popupRef.current) {
      popupRef.current = new mapboxgl.Popup({
        closeButton: false,
        closeOnClick: false,
        className: "globe-tooltip",
      });
    }

    const addTimelineLayer = () => {
      if (!map.current) return;

      // Create GeoJSON points from active sessions
      const geojsonData: GeoJSON.FeatureCollection<GeoJSON.Point> = {
        type: "FeatureCollection",
        features: activeSessions
          .filter(session => session.lat && session.lon) // Ensure lat/lon exist
          .map(session => {
            const roundedLat = round(session.lat, 4);
            const roundedLon = round(session.lon, 4);

            return {
              type: "Feature",
              geometry: {
                type: "Point",
                coordinates: [roundedLon, roundedLat],
              },
              properties: {
                session_id: session.session_id,
                city: session.city || "Unknown",
                country: session.country || "Unknown",
                browser: session.browser || "Unknown",
                device_type: session.device_type || "Unknown",
                pageviews: session.pageviews || 0,
              },
            };
          }),
      };

      // Add or update source
      if (map.current.getSource("timeline-sessions")) {
        (map.current.getSource("timeline-sessions") as mapboxgl.GeoJSONSource).setData(geojsonData);
      } else {
        map.current.addSource("timeline-sessions", {
          type: "geojson",
          data: geojsonData,
        });

        // Add session layer with individual dots
        map.current.addLayer({
          id: "timeline-sessions-layer",
          type: "circle",
          source: "timeline-sessions",
          paint: {
            "circle-radius": ["interpolate", ["exponential", 2], ["zoom"], 0, 5, 10, 10, 15, 15, 20, 20],
            "circle-color": "#fff4d6",
            "circle-opacity": 0.9,
            "circle-stroke-width": 1,
            "circle-stroke-color": "#fff4d6",
            "circle-stroke-opacity": 0.8,
          },
          layout: {
            visibility: mapView === "timeline" ? "visible" : "none",
          },
        });

        // Add mouse events for tooltip
        map.current.on("mouseenter", "timeline-sessions-layer", () => {
          if (!map.current) return;
          map.current.getCanvas().style.cursor = "pointer";
        });

        map.current.on("mousemove", "timeline-sessions-layer", e => {
          if (!map.current || !e.features || e.features.length === 0 || !popupRef.current) return;

          const feature = e.features[0];
          const city = feature.properties?.city || "Unknown";
          const country = feature.properties?.country || "Unknown";
          const browser = feature.properties?.browser || "Unknown";
          const device = feature.properties?.device_type || "Unknown";
          const pageviews = feature.properties?.pageviews || 0;

          const coordinates = e.lngLat;
          const html = `
            <div class="flex flex-col gap-1">
              <div class="flex items-center gap-1">
                <span class="text-sm font-medium">${city}, ${country}</span>
              </div>
              <div class="text-xs text-neutral-300">
                <div>${browser} · ${device}</div>
                <div><span class="font-bold text-accent-400">${pageviews}</span> pageviews</div>
              </div>
            </div>
          `;

          popupRef.current.setLngLat(coordinates).setHTML(html).addTo(map.current);
        });

        map.current.on("mouseleave", "timeline-sessions-layer", () => {
          if (!map.current || !popupRef.current) return;
          map.current.getCanvas().style.cursor = "";
          popupRef.current.remove();
        });
      }
    };

    addTimelineLayer();
  }, [activeSessions, mapLoaded, map, mapView]);
}
