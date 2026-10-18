const API_BASE_URL = "https://app.ticketmaster.com/discovery/v2";

export async function fetchEvents({
  keyword = "",
  category = "",
  classificationName = "",
  page = 0,
  size = 12,
} = {}) {
  const apiKey = import.meta.env.VITE_TICKETMASTER_API_KEY;

  if (!apiKey) {
    throw new Error(
      "Ticketmaster API key is missing. Check your .env.local file and restart the development server.",
    );
  }

  const params = new URLSearchParams({
    apikey: apiKey,
    countryCode: "US",
    page: String(page),
    size: String(size),
    sort: "date,asc",
  });

  if (keyword.trim()) {
    params.set("keyword", keyword.trim());
  }

  if (category) {
    params.set("classificationId", category);
  } else if (classificationName) {
    params.set("classificationName", classificationName);
  }

  const response = await fetch(
    `${API_BASE_URL}/events.json?${params.toString()}`,
  );

  if (!response.ok) {
    throw new Error(
      `Ticketmaster request failed (${response.status}). Check your API key and try again.`,
    );
  }

  const data = await response.json();

  const events = (data._embedded?.events ?? []).map((event) => {
    const venue = event._embedded?.venues?.[0];

    const image =
      event.images?.find((item) => item.ratio === "16_9" && item.width >= 500)
        ?.url ??
      event.images?.[0]?.url ??
      "";

    return {
      id: event.id,
      name: event.name,
      category: event.classifications?.[0]?.segment?.name ?? "Event",
      date: event.dates?.start?.localDate ?? "Date to be announced",
      time: event.dates?.start?.localTime ?? "",
      venue: venue?.name ?? "Venue to be announced",
      location: [venue?.city?.name, venue?.country?.name]
        .filter(Boolean)
        .join(", "),
      image,
      url: event.url ?? "",
      info: event.info ?? event.pleaseNote ?? "",
    };
  });

  return {
    events,
    page: data.page?.number ?? 0,
    totalPages: data.page?.totalPages ?? 0,
    totalElements: data.page?.totalElements ?? 0,
  };
}
