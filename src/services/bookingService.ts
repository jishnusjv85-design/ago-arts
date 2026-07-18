export interface BookingPayload {
  name: string;
  email: string;
  phone: string;
  style?: string;
  placement?: string;
  description?: string;
}

export async function submitBooking(payload: BookingPayload) {
  const response = await fetch("/api/bookings", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({ message: "Unable to submit request." }));
    throw new Error(error.message || "Unable to submit request.");
  }

  return response.json();
}
