declare global {
  namespace Express {
    interface Request {
      userId?: string; // Define your custom field and its type
    }
  }
}
