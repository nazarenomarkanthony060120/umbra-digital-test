#!/usr/bin/env node

const { spawn } = require("child_process");
const fs = require("fs");
const path = require("path");

console.log("🎮 Tic-Tac-Toe Game Setup & Start Script");
console.log("=======================================\n");

// Check if .env file exists in backend
const envPath = path.join(__dirname, "backend", ".env");
const envExamplePath = path.join(__dirname, "backend", ".env.example");

if (!fs.existsSync(envPath)) {
  console.log(
    "⚠️  Backend .env file not found. Creating one with default values..."
  );

  const envContent = `PORT=5000
MONGODB_URI=mongodb://localhost:27017/tic-tac-toe
NODE_ENV=development
FRONTEND_URL=http://localhost:3000`;

  try {
    fs.writeFileSync(envPath, envContent);
    console.log("✅ Created backend/.env file with default values");
  } catch (error) {
    console.log("❌ Could not create .env file. Please create it manually:");
    console.log("   backend/.env");
    console.log("   Content:");
    console.log(envContent);
  }
}

console.log("\n📋 Prerequisites:");
console.log("• Node.js (v18 or higher) ✓");
console.log("• MongoDB running locally or MongoDB Atlas connection");
console.log("• All dependencies installed ✓\n");

console.log("🚀 Starting both servers...");
console.log("• Backend: http://localhost:5000");
console.log("• Frontend: http://localhost:3000");
console.log("• Press Ctrl+C to stop both servers\n");

// Start both servers concurrently
const child = spawn("npm", ["run", "dev"], {
  stdio: "inherit",
  shell: true,
  cwd: __dirname,
});

child.on("close", (code) => {
  console.log(`\n👋 Servers stopped with exit code ${code}`);
  process.exit(code);
});

// Handle Ctrl+C gracefully
process.on("SIGINT", () => {
  console.log("\n🛑 Stopping servers...");
  child.kill("SIGINT");
});
