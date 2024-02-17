import clientWithAuth from "../../api/clientWithAuth";

export const fetchTickets = async (
  setTickets,
  setFilteredTickets,
  setBusy,
  setConnected,
  setSearchKeyword,
) => {
  setBusy(true);
  setConnected(true);
  setSearchKeyword("");
  try {
    const { data } = await clientWithAuth.get(
      "/api/v1/tickets/collection",
    );
    setTickets(data.data.tickets);
    setFilteredTickets(data.data.tickets);
  } catch (err) {
    setConnected(false);
    console.log("Ticket fetching error: ", err);
  } finally {
    setBusy(false);
  }
};
