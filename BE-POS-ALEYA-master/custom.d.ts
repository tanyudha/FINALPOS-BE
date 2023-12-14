export {};

declare global {
  namespace Express {
    interface Request {
      user: { [k: string]: any };
    }
  }
}
