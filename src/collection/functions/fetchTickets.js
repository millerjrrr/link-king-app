import clientWithAuth from "../../api/clientWithAuth";

export const fetchTickets = async (
  setTickets,
  setFilteredTickets,
  setBusy,
) => {
  setBusy(true);
  try {
    const { data } = await clientWithAuth.get(
      "/api/v1/tickets/collection",
    );
    setTickets(data.data.tickets);
    setFilteredTickets(data.data.tickets);
  } catch (err) {
    console.log("Ticket fetching error: ", err);
  } finally {
    setBusy(false);
  }
};
