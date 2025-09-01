import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertUserSchema, insertUserTeamSchema, insertTransactionSchema } from "@shared/schema";
import { z } from "zod";

export async function registerRoutes(app: Express): Promise<Server> {
  // Authentication routes
  app.post("/api/auth/register", async (req, res) => {
    try {
      const userData = insertUserSchema.parse(req.body);
      
      // Check if user already exists
      const existingUser = await storage.getUserByEmail(userData.email);
      if (existingUser) {
        return res.status(400).json({ message: "User already exists" });
      }

      const user = await storage.createUser(userData);
      res.json({ user: { id: user.id, username: user.username, email: user.email, totalCredits: user.totalCredits } });
    } catch (error) {
      res.status(400).json({ message: "Invalid user data" });
    }
  });

  app.post("/api/auth/login", async (req, res) => {
    try {
      const { username, password } = req.body;
      
      const user = await storage.getUserByUsername(username);
      if (!user || user.password !== password) {
        return res.status(401).json({ message: "Invalid credentials" });
      }

      res.json({ user: { id: user.id, username: user.username, email: user.email, totalCredits: user.totalCredits } });
    } catch (error) {
      res.status(400).json({ message: "Login failed" });
    }
  });

  // Player routes
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

  app.get("/api/players/position/:position", async (req, res) => {
    try {
      const players = await storage.getPlayersByPosition(req.params.position);
      res.json(players);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch players by position" });
    }
  });

  // Team routes
  app.get("/api/team/:userId", async (req, res) => {
    try {
      const userTeam = await storage.getUserTeam(req.params.userId);
      
      // Get full player details
      const playersWithDetails = await Promise.all(
        userTeam.map(async (ut) => {
          const player = await storage.getPlayerById(ut.playerId);
          return {
            ...ut,
            player
          };
        })
      );

      res.json(playersWithDetails);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch team" });
    }
  });

  app.get("/api/team/:userId/stats", async (req, res) => {
    try {
      const stats = await storage.getUserTeamStats(req.params.userId);
      res.json(stats);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch team stats" });
    }
  });

  app.post("/api/team/add-player", async (req, res) => {
    try {
      const { userId, playerId, purchasePrice } = req.body;
      
      // Validate input
      const userTeamData = insertUserTeamSchema.parse({
        userId,
        playerId,
        purchasePrice
      });

      // Check if user has enough credits
      const stats = await storage.getUserTeamStats(userId);
      if (stats.remainingCredits < purchasePrice) {
        return res.status(400).json({ message: "Insufficient credits" });
      }

      // Check if player is already in team
      const userTeam = await storage.getUserTeam(userId);
      const alreadyOwned = userTeam.some(ut => ut.playerId === playerId);
      if (alreadyOwned) {
        return res.status(400).json({ message: "Player already in team" });
      }

      // Add player to team
      const teamEntry = await storage.addPlayerToTeam(userTeamData);
      
      // Create transaction record
      await storage.createTransaction({
        userId,
        playerId,
        type: "BUY",
        amount: purchasePrice
      });

      res.json(teamEntry);
    } catch (error) {
      res.status(400).json({ message: "Failed to add player to team" });
    }
  });

  app.delete("/api/team/remove-player", async (req, res) => {
    try {
      const { userId, playerId } = req.body;
      
      await storage.removePlayerFromTeam(userId, playerId);
      
      // Create transaction record
      const player = await storage.getPlayerById(playerId);
      if (player) {
        await storage.createTransaction({
          userId,
          playerId,
          type: "SELL",
          amount: Math.floor(player.price * 0.8) // Sell for 80% of market value
        });
      }

      res.json({ success: true });
    } catch (error) {
      res.status(400).json({ message: "Failed to remove player from team" });
    }
  });

  // Recommendations route
  app.get("/api/recommendations/:userId", async (req, res) => {
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

  // Transactions route
  app.get("/api/transactions/:userId", async (req, res) => {
    try {
      const transactions = await storage.getUserTransactions(req.params.userId);
      res.json(transactions);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch transactions" });
    }
  });

  // Admin route to refresh player data from API
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
