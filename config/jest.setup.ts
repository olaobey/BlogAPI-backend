import { PrismaClient } from '@prisma/client';

// Create a Jest mock for PrismaClient
jest.mock('@prisma/client', () => {
  return {
    PrismaClient: jest.fn(() => ({
      $connect: jest.fn(),
      $disconnect: jest.fn(),
    })),
  };
});

// Import PrismaClient from the mock
const mockPrisma = new PrismaClient();

export default mockPrisma;
