import { mongo } from "../../../config/prisma";
import { createUser, findUserByEmail, findUserById } from "../userService";
import { CreateUserInput } from "../../../types/auth";

// Mock the Prisma client
jest.mock("../../../config/prisma", () => ({
  mongo: {
    user: {
      create: jest.fn(),
      findUnique: jest.fn(),
    },
  },
}));

describe("User Service", () => {
  const mockUser: CreateUserInput = {
    email: "test@example.com",
    password: "hashedPassword",
    name: "Test User",
  };

  const mockCreatedUser = {
    id: "1",
    ...mockUser,
    role: "USER",
    createdAt: new Date(),
  };

  beforeEach(() => {
    // Clear all mocks before each test
    jest.clearAllMocks();
  });

  describe("createUser", () => {
    it("should create a user successfully", async () => {
      // Arrange
      (mongo.user.create as jest.Mock).mockResolvedValue(mockCreatedUser);

      // Act
      const result = await createUser(mockUser);

      // Assert
      expect(mongo.user.create).toHaveBeenCalledWith({
        data: mockUser,
      });
      expect(result).toEqual(mockCreatedUser);
    });

    it("should throw an error if user creation fails", async () => {
      // Arrange
      const error = new Error("Database error");
      (mongo.user.create as jest.Mock).mockRejectedValue(error);

      // Act & Assert
      await expect(createUser(mockUser)).rejects.toThrow("Database error");
    });
  });

  describe("findUserByEmail", () => {
    it("should find a user by email", async () => {
      // Arrange
      (mongo.user.findUnique as jest.Mock).mockResolvedValue(mockCreatedUser);

      // Act
      const result = await findUserByEmail(mockUser.email);

      // Assert
      expect(mongo.user.findUnique).toHaveBeenCalledWith({
        where: { email: mockUser.email },
      });
      expect(result).toEqual(mockCreatedUser);
    });

    it("should return null if user not found", async () => {
      // Arrange
      (mongo.user.findUnique as jest.Mock).mockResolvedValue(null);

      // Act
      const result = await findUserByEmail("nonexistent@example.com");

      // Assert
      expect(result).toBeNull();
    });
  });

  describe("findUserById", () => {
    it("should find a user by id", async () => {
      // Arrange
      (mongo.user.findUnique as jest.Mock).mockResolvedValue(mockCreatedUser);

      // Act
      const result = await findUserById("1");

      // Assert
      expect(mongo.user.findUnique).toHaveBeenCalledWith({
        where: { id: "1" },
      });
      expect(result).toEqual(mockCreatedUser);
    });

    it("should return null if user not found", async () => {
      // Arrange
      (mongo.user.findUnique as jest.Mock).mockResolvedValue(null);

      // Act
      const result = await findUserById("nonexistent-id");

      // Assert
      expect(result).toBeNull();
    });
  });
});
