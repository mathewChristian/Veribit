const config = {
  port: 3000,

  db: process.env.DATABASE_URI || "mongodb://localhost:27017/kyc-db",

  email: {
    domain: "sandbox47c7d4003306410e9f5c0dd335dfb142.mailgun.org",
    mailgun: {
      public: "insert you public key here",
      private: "b415068501a8afdbe310be5677f9f687-4167c382-2cc8d844"
    },
    masterEmail: "wiankoch@gmail.com",
    from: {
      general: "wiankoch@gmail.com"
    },
    template: {
      folder: "default"
    }
  },
  project: "NRL-KYC",

  API_KEY: "b415068501a8afdbe310be5677f9f687-4167c382-2cc8d844",
  frontendBaseUrl: "http://localhost:3006", // kyc-frontend url
  baseUrl: "http://localhost:3000", // kyc-backend url

  demoMode: true
};

module.exports = config;
