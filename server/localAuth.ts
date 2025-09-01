import session from "express-session";
import connectPg from "connect-pg-simple";
import { RequestHandler } from "express";
import { storage } from "./storage";

const pgSession = connectPg(session);

export function getSession() {
  const sessionTtl = 7 * 24 * 60 * 60 * 1000; // 1 week
  const sessionStore = new pgSession({
    conString: process.env.DATABASE_URL,
    createTableIfMissing: true,
    ttl: sessionTtl,
    tableName: "sessions",
  });

  return session({
    secret: process.env.SESSION_SECRET!,
    store: sessionStore,
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: sessionTtl,
    },
  });
}

// Funzione per verificare se è una email Google valida
function isValidGoogleEmail(email: string): boolean {
  const googleDomains = [
    'gmail.com',
    'googlemail.com',
    'google.com',
    'youtube.com',
    'yt.com'
  ];
  
  const domain = email.split('@')[1]?.toLowerCase();
  return googleDomains.includes(domain);
}

export function setupAuth(app: any) {
  app.use(getSession());

  // Login endpoint
  app.post("/api/login", async (req, res) => {
    try {
      const { email } = req.body;
      
      // Verifica che sia una email Google
      if (!isValidGoogleEmail(email)) {
        return res.status(400).json({ 
          message: "Per favore usa un account Google (Gmail, Google Mail, etc.)" 
        });
      }

      // Cerca o crea l'utente
      let user = await storage.getUserByEmail(email);
      
      if (!user) {
        // Crea un nuovo utente
        const username = email.split('@')[0];
        user = await storage.createUser({
          email,
          firstName: username.charAt(0).toUpperCase() + username.slice(1),
          lastName: "Google",
          username,
          profileImageUrl: `https://ui-avatars.com/api/?name=${username}&background=random&color=fff&size=128`,
        });
      }

      // Salva l'utente nella sessione
      req.session.userId = user.id;
      req.session.user = {
        id: user.id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        username: user.username,
        profileImageUrl: user.profileImageUrl,
      };

      res.json({ 
        success: true, 
        user: req.session.user,
        message: "Login effettuato con successo con Google!" 
      });
    } catch (error) {
      console.error("Login error:", error);
      res.status(500).json({ message: "Errore durante il login" });
    }
  });

  // Logout endpoint
  app.post("/api/logout", (req, res) => {
    req.session.destroy((err) => {
      if (err) {
        return res.status(500).json({ message: "Errore durante il logout" });
      }
      res.json({ success: true, message: "Logout effettuato con successo" });
    });
  });

  // Get current user
  app.get("/api/auth/user", async (req, res) => {
    try {
      if (!req.session.userId) {
        return res.status(401).json({ message: "Non autenticato" });
      }

      const user = await storage.getUser(req.session.userId);
      if (!user) {
        return res.status(404).json({ message: "Utente non trovato" });
      }

      res.json({
        id: user.id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        username: user.username,
        profileImageUrl: user.profileImageUrl,
        totalCredits: user.totalCredits,
      });
    } catch (error) {
      console.error("Error fetching user:", error);
      res.status(500).json({ message: "Errore nel recupero dell'utente" });
    }
  });
}

export const isAuthenticated: RequestHandler = (req, res, next) => {
  if (!req.session.userId) {
    return res.status(401).json({ message: "Non autenticato" });
  }
  next();
};
