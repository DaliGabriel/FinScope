import { mongo } from "../../../config/prisma";
import { createLog, getAllLogs } from "../logService";
import { CreateLogInput } from "../../../types/log";

// Mock the Prisma client
jest.mock("../../../config/prisma", () => ({
  mongo: {
    logEntry: {
      create: jest.fn(),
      findMany: jest.fn(),
    },
  },
}));

describe("Log Service", () => {
  const mockLogInput: CreateLogInput = {
    action: "TEST_ACTION",
    details: "Test log details",
    userId: "1",
  };

  const mockCreatedLog = {
    id: "1",
    ...mockLogInput,
    timestamp: new Date(),
  };

  const mockLogs = [mockCreatedLog];

  beforeEach(() => {
    // Clear all mocks before each test
    jest.clearAllMocks();
  });

  describe("createLog", () => {
    it("should create a log entry successfully", async () => {
      // Arrange
      (mongo.logEntry.create as jest.Mock).mockResolvedValue(mockCreatedLog);

      // Act
      const result = await createLog(mockLogInput);

      // Assert
      expect(mongo.logEntry.create).toHaveBeenCalledWith({
        data: {
          ...mockLogInput,
          timestamp: expect.any(Date),
        },
      });
      expect(result).toEqual(mockCreatedLog);
    });

    it("should throw an error if log creation fails", async () => {
      // Arrange
      const error = new Error("Database error");
      (mongo.logEntry.create as jest.Mock).mockRejectedValue(error);

      // Act & Assert
      await expect(createLog(mockLogInput)).rejects.toThrow("Database error");
    });
  });

  describe("getAllLogs", () => {
    it("should return all logs", async () => {
      // Arrange
      (mongo.logEntry.findMany as jest.Mock).mockResolvedValue(mockLogs);

      // Act
      const result = await getAllLogs();

      // Assert
      expect(mongo.logEntry.findMany).toHaveBeenCalled();
      expect(result).toEqual(mockLogs);
    });

    it("should return empty array if no logs exist", async () => {
      // Arrange
      (mongo.logEntry.findMany as jest.Mock).mockResolvedValue([]);

      // Act
      const result = await getAllLogs();

      // Assert
      expect(result).toEqual([]);
    });

    it("should throw an error if fetching logs fails", async () => {
      // Arrange
      const error = new Error("Database error");
      (mongo.logEntry.findMany as jest.Mock).mockRejectedValue(error);

      // Act & Assert
      await expect(getAllLogs()).rejects.toThrow("Database error");
    });
  });
});
