import "better-auth";

declare module "better-auth" {
   interface User {
      language?: string;
      theme?: string;
   }
}