import { defineComputeConfig } from "@prisma/compute-sdk/config";

export default defineComputeConfig({
  app: {
    name: "books",
    framework: "nextjs",
    env: ".env",
  },
});
