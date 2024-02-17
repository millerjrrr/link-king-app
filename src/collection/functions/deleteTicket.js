import clientWithAuth from "../../api/clientWithAuth";

export const deleteTicket = async (
  ticketId,
  setBusy,
  setStatus,
) => {
  try {
    setBusy(true);
    const { data } = await clientWithAuth.post(
      "/api/v1/tickets/deleteOne",
      {
        ticketId,
      },
    );
    setStatus(data.status === "success");
  } catch (err) {
    console.log("Ticket fetching error: ", err);
    setBusy(false);
    setStatus(false);
  } finally {
    setBusy(false);
  }
};
