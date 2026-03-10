# RunTrack Backend 🏃

Node.js + Express REST API for the RunTrack half marathon training app, connected to MongoDB.

> 🔗 **Frontend Repo:** [https://github.com/christianasa/Frontend-Capstone](https://github.com/christianasa/Frontend-Capstone)

---



## File Structure

```
Backend/
├── config/
│   └── db.js        # MongoDB connection
├── models/
│   ├── run.js       # Run schema
│   └── user.js      # User schema
├── routes/
│   ├── Auth.js      # Strava OAuth routes
│   └── Runs.js      # Run CRUD routes
├── .env             # Environment variables (not committed)
├── .gitignore
├── package.json
└── Server.js        # Entry point
```

---


### Runs
| Method | Route | Description |
|--------|-------|-------------|
| GET | `/runs` | Get all runs |
| GET | `/runs/:id` | Get a single run |
| POST | `/runs` | Create a new run |
| PUT | `/runs/:id` | Update a run |
| DELETE | `/runs/:id` | Delete a run |

### Auth
| Method | Route | Description |
|--------|-------|-------------|
| GET | `/auth/login` | Redirect to Strava login |
| GET | `/auth/callback` | Handle Strava OAuth callback |

---

## Tech Stack

- **Node.js** — runtime
- **Express.js** — web framework
- **MongoDB** — database
- **Mongoose** — ODM for MongoDB
- **Strava API** — third party running data
- **dotenv** — environment variables
- **cors** — cross origin resource sharing