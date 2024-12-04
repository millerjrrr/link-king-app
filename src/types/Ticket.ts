export default interface Ticket {
  id: string;
  target: string;
  solutions: string[];
  rating: number;
  level: number;
  dueDate?: number; // due date is not sent for tickets in console
}
