import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { setupAuth, isAuthenticated } from "./replitAuth";
import { insertUserTeamSchema, insertTransactionSchema } from "@shared/schema";

export async function registerRoutes(app: Express): Promise<Server> {
  // Auth middleware
  await setupAuth(app);

  // Auth routes
  app.get('/api/auth/user', isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const user = await storage.getUser(userId);
      res.json(user);
    } catch (error) {
      console.error("Error fetching user:", error);
      res.status(500).json({ message: "Failed to fetch user" });
    }
  });

  // Players routes
  app.get("/api/players", async (req, res) => {
    try {
      const { search, position, minPrice, maxPrice } = req.query;
      
      let players;
      if (search || position || minPrice || maxPrice) {
        players = await storage.searchPlayers(
          search as string,
          position as string,
          minPrice ? parseInt(minPrice as string) : undefined,
          maxPrice ? parseInt(maxPrice as string) : undefined
        );
      } else {
        players = await storage.getAllPlayers();
      }
      
      res.json(players);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch players" });
    }
  });

  app.get("/api/players/:id", async (req, res) => {
    try {
      const player = await storage.getPlayerById(req.params.id);
      if (!player) {
        return res.status(404).json({ message: "Player not found" });
      }
      res.json(player);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch player" });
    }
  });

  // Team routes - protected
  app.get("/api/team/:userId", isAuthenticated, async (req, res) => {
    try {
      const userTeam = await storage.getUserTeam(req.params.userId);
      
      // Populate with player data
      const teamWithPlayers = [];
      for (const ut of userTeam) {
        const player = await storage.getPlayerById(ut.playerId);
        if (player) {
          teamWithPlayers.push({ ...ut, player });
        }
      }
      
      res.json(teamWithPlayers);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch team" });
    }
  });

  app.get("/api/team/:userId/stats", isAuthenticated, async (req, res) => {
    try {
      const stats = await storage.getUserTeamStats(req.params.userId);
      res.json(stats);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch team stats" });
    }
  });

  app.post("/api/team/:userId/players", isAuthenticated, async (req, res) => {
    try {
      const result = insertUserTeamSchema.safeParse({
        userId: req.params.userId,
        ...req.body,
      });
      
      if (!result.success) {
        return res.status(400).json({ message: "Invalid request data" });
      }

      const userTeam = await storage.addPlayerToTeam(result.data);
      
      // Create buy transaction
      await storage.createTransaction({
        userId: req.params.userId,
        playerId: result.data.playerId,
        type: "BUY",
        amount: result.data.purchasePrice,
      });

      // Update user credits
      const user = await storage.getUser(req.params.userId);
      if (user) {
        await storage.updateUserCredits(req.params.userId, user.totalCredits - result.data.purchasePrice);
      }

      res.json(userTeam);
    } catch (error) {
      console.error("Error adding player to team:", error);
      res.status(500).json({ message: "Failed to add player to team" });
    }
  });

  app.delete("/api/team/:userId/players/:playerId", isAuthenticated, async (req, res) => {
    try {
      const { userId, playerId } = req.params;
      
      // Get player details for pricing
      const player = await storage.getPlayerById(playerId);
      if (!player) {
        return res.status(404).json({ message: "Player not found" });
      }

      // Calculate sale price (80% of current market value)
      const salePrice = Math.floor(player.price * 0.8);

      await storage.removePlayerFromTeam(userId, playerId);
      
      // Create sell transaction
      await storage.createTransaction({
        userId,
        playerId,
        type: "SELL",
        amount: salePrice,
      });

      // Update user credits
      const user = await storage.getUser(userId);
      if (user) {
        await storage.updateUserCredits(userId, user.totalCredits + salePrice);
      }

      res.json({ salePrice });
    } catch (error) {
      console.error("Error removing player from team:", error);
      res.status(500).json({ message: "Failed to remove player from team" });
    }
  });

  // Recommendations route - protected
  app.get("/api/recommendations/:userId", isAuthenticated, async (req, res) => {
    try {
      const recommendations = await storage.getPlayerRecommendations(req.params.userId);
      res.json(recommendations);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch recommendations" });
    }
  });

  // Market activity route
  app.get("/api/market/activity", async (req, res) => {
    try {
      const activity = await storage.getMarketActivity();
      res.json(activity);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch market activity" });
    }
  });

  // Transactions route - protected
  app.get("/api/transactions/:userId", isAuthenticated, async (req, res) => {
    try {
      const transactions = await storage.getUserTransactions(req.params.userId);
      res.json(transactions);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch transactions" });
    }
  });

  // Admin route to refresh player data
  app.post("/api/admin/refresh-players", async (req, res) => {
    try {
      await storage.refreshPlayersFromAPI();
      res.json({ message: "Player data refreshed successfully" });
    } catch (error) {
      res.status(500).json({ message: "Failed to refresh player data" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}