// express.d.ts
import "express";

// Extender la interfaz Response
declare module "express" {
  export interface Response {
    cookie(name: string, value: string, options?: object): this;
  }
}
