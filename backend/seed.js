// Database seed script
// Populates MongoDB with initial service data from services.seed.json

import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import Service from './src/models/Service.js';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

async function seedDatabase() {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/at-your-service', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log('✅ Connected to MongoDB');

    // Clear existing services
    await Service.deleteMany({});
    console.log('🧹 Cleared existing services');

    // Load seed data
    const seedDataPath = join(__dirname, 'src', 'seed', 'services.seed.json');
    const seedData = JSON.parse(readFileSync(seedDataPath, 'utf8'));

    // Insert services
    const result = await Service.insertMany(seedData);
    console.log(`✅ Inserted ${result.length} services`);

    // Display summary
    const categories = await Service.aggregate([
      { $group: { _id: '$category', count: { $sum: 1 } } },
      { $sort: { _id: 1 } }
    ]);

    console.log('\n📊 Services by category:');
    categories.forEach(cat => {
      console.log(`   ${cat._id}: ${cat.count}`);
    });

    const cities = await Service.aggregate([
      { $group: { _id: '$location.city', count: { $sum: 1 } } },
      { $sort: { _id: 1 } }
    ]);

    console.log('\n🏙️  Services by city:');
    cities.forEach(city => {
      console.log(`   ${city._id}: ${city.count}`);
    });

    console.log('\n🎉 Database seeded successfully!\n');

    process.exit(0);
  } catch (error) {
    console.error('❌ Seeding error:', error);
    process.exit(1);
  }
}

seedDatabase();
