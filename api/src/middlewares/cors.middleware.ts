import cors, { CorsOptions } from "cors";

const corsOptions = (allowedOrigins: string[]) => {
  const corsOptions: CorsOptions = {
    origin: (origin, callback) => {
      if (allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    allowedHeaders: ["Content-Type", "Authorization", "x-api-key"],
    credentials: true,
  };

  return cors(corsOptions);
};

export default corsOptions;
