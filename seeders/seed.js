// seeders/seed.js
require('dotenv').config();
const bcrypt = require('bcryptjs');

const connectDb = require('../config/db');
const User = require('../models/User');
const Role = require('../models/Role');

async function seed() {
  try {
    // Connect to DB
    await connectDb();

    // Clear roles
    await Role.deleteMany({});

    // Insert roles
    const roles = await Role.insertMany([
      { name: 'super_admin' },
      { name: 'admin' },
      { name: 'staff' }
    ]);
    console.log('Roles seeded!');

    // Get super admin role
    const superAdminRole = roles.find(r => r.name === 'super_admin');

    // Clear users
    await User.deleteMany({});

    // Hash password
    const hashedPassword = await bcrypt.hash('123456', 10);

    // Create super admin
    await User.create({
      name: 'Super Admin',
      email: 'superadmin@test.com',
      password: hashedPassword,
      role: superAdminRole._id
    });

    console.log('Super admin created!');
    process.exit(0);

  } catch (error) {
    console.error(error);
    process.exit(1);
  }
}

// Run the seeder
seed();
