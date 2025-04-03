import { postgres } from "../../../config/prisma";
import {
  createTransaction,
  getTransactionsByUserId,
} from "../transactionService";
import { CreateTransactionInput } from "../../../types/transaction";

// Mock the Prisma client
jest.mock("../../../config/prisma", () => ({
  postgres: {
    transaction: {
      create: jest.fn(),
      findMany: jest.fn(),
    },
  },
}));

describe("Transaction Service", () => {
  const mockTransactionInput: CreateTransactionInput = {
    type: "INCOME",
    amount: 1000,
    category: "SALARY",
    date: "2024-03-20",
    userId: "1",
  };

  const mockCreatedTransaction = {
    id: "1",
    ...mockTransactionInput,
    date: new Date(mockTransactionInput.date),
  };

  const mockTransactions = [mockCreatedTransaction];

  beforeEach(() => {
    // Clear all mocks before each test
    jest.clearAllMocks();
  });

  describe("createTransaction", () => {
    it("should create a transaction successfully", async () => {
      // Arrange
      (postgres.transaction.create as jest.Mock).mockResolvedValue(
        mockCreatedTransaction
      );

      // Act
      const result = await createTransaction(mockTransactionInput);

      // Assert
      expect(postgres.transaction.create).toHaveBeenCalledWith({
        data: {
          ...mockTransactionInput,
          date: expect.any(Date),
          userId: mockTransactionInput.userId,
        },
      });
      expect(result).toEqual(mockCreatedTransaction);
    });

    it("should throw an error if transaction creation fails", async () => {
      // Arrange
      const error = new Error("Database error");
      (postgres.transaction.create as jest.Mock).mockRejectedValue(error);

      // Act & Assert
      await expect(createTransaction(mockTransactionInput)).rejects.toThrow(
        "Database error"
      );
    });
  });

  describe("getTransactionsByUserId", () => {
    it("should return transactions for a user", async () => {
      // Arrange
      (postgres.transaction.findMany as jest.Mock).mockResolvedValue(
        mockTransactions
      );

      // Act
      const result = await getTransactionsByUserId("1");

      // Assert
      expect(postgres.transaction.findMany).toHaveBeenCalledWith({
        where: {
          userId: "1",
        },
        orderBy: {
          date: "desc",
        },
      });
      expect(result).toEqual(mockTransactions);
    });

    it("should return empty array if no transactions exist", async () => {
      // Arrange
      (postgres.transaction.findMany as jest.Mock).mockResolvedValue([]);

      // Act
      const result = await getTransactionsByUserId("1");

      // Assert
      expect(result).toEqual([]);
    });

    it("should throw an error if fetching transactions fails", async () => {
      // Arrange
      const error = new Error("Database error");
      (postgres.transaction.findMany as jest.Mock).mockRejectedValue(error);

      // Act & Assert
      await expect(getTransactionsByUserId("1")).rejects.toThrow(
        "Database error"
      );
    });
  });
});
