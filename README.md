# ThinkSpace

A modern platform for meaningful discussions, community collaboration, and idea sharing — designed to bring thinkers, creators, and innovators together.

---

## 🚀 Overview

ThinkSpace is a community‑driven discussion platform inspired by Reddit‑style forums, but focused on depth, quality, and value‑based conversations. Users can create and join topic‑based spaces, start discussions, comment, upvote, and collaborate in real time.

Built with the **MERN stack** (MongoDB, Express, React, Node.js), ThinkSpace features modular backend architecture, an interactive frontend UI, and secure user authentication.

---



## ✨ Features

### 🔐 Authentication & Security

* Clerk‑based user authentication
* Secure session management
* Role‑based access control (User / Moderator / Admin)
* Protected routes and API endpoints

### 📝 Posts & Discussions

* Create posts (text, images, links)
* Nested threaded comments
* Markdown support
* Upvote/downvote system
* Interactive post grid with media support

### 🌍 Spaces / Communities

* Create and join topic‑based communities
* Public & private access options
* Customizable rules per Space
* Moderation tools

### ⚡ Real Time & Interactivity

* Live comments via WebSockets
* Real‑time notifications (planned)
* Dynamic profile updates

### 📊 Smart Feed & Search

* Filter by tags, keywords, categories
* Trending posts / personalized feed (upcoming)
* Advanced search functionality

### 🧰 User Features

* **Complete User Profiles** with editable information
* **Settings Page** for profile management
* **Offline Mode** with localStorage backup
* User contribution stats & activity tracking
* Achievement badges (planned)
* Private messaging (planned)

### ⚙️ Settings & Profile Management

* **Comprehensive Settings Page** (`/settings`)
* **Editable Profile Fields**:
  * Full name with real‑time updates
  * Bio with 500 character limit
  * Location with geographic display
  * Website with clickable links
  * Profile picture management
* **Smart Data Handling**:
  * Offline mode with localStorage fallback
  * Graceful server connectivity handling
  * Real‑time profile synchronization
* **Enhanced Profile Display**:
  * Dynamic content updates
  * Location and website integration
  * Edit Profile button for quick access

---

## 🧱 Tech Stack

| Category  | Technology                    |
| --------- | ----------------------------- |
| Frontend  | React, Next.js, TailwindCSS  |
| Backend   | Node.js, Express.js           |
| Database  | MongoDB, Mongoose             |
| Auth      | Clerk Authentication          |
| Real‑time | Socket.IO                     |
| Animation | Framer Motion                 |
| Storage   | localStorage (offline mode)   |

---

## 📁 Project Structure

```
ThinkSpace/
 ├── client/                    # Next.js Frontend
 │    ├── app/                  # App Router Pages
 │    │    ├── profile/         # User Profile Page
 │    │    ├── settings/        # Settings Page ⭐ NEW
 │    │    ├── community/       # Community Pages
 │    │    └── ...
 │    ├── components/           # Reusable Components
 │    │    ├── settings/        # Settings Components ⭐ NEW
 │    │    ├── profile/         # Profile Components
 │    │    ├── layout/          # Layout Components
 │    │    └── ui/              # UI Components
 │    ├── lib/                  # Utilities & API
 │    │    ├── api.js           # API Client with offline mode ⭐ ENHANCED
 │    │    └── utils.js
 │    └── ...
 ├── server/                    # Node.js Backend
 │    ├── src/
 │    │    ├── controllers/     # Route Controllers
 │    │    │    └── userProfileController.js ⭐ ENHANCED
 │    │    ├── models/          # Database Models
 │    │    │    └── User.js     # User Model
 │    │    ├── routes/          # API Routes
 │    │    │    └── userRoutes.js ⭐ ENHANCED
 │    │    ├── middleware/      # Auth & Other Middleware
 │    │    │    └── clerkAuth.js ⭐ NEW
 │    │    └── index.js         # Server Entry Point
 │    └── ...
 ├── package.json
 └── README.md
```

---

## 🛠️ Setup & Installation

### 1️⃣ Clone the repository

```bash
git clone https://github.com/Rudrxxx/ThinkSpace.git
cd ThinkSpace
```

### 2️⃣ Install dependencies

#### Install backend packages

```bash
cd server
npm install
```

#### Install frontend packages

```bash
cd ../client
npm install
```

### 3️⃣ Environment Variables

#### Backend Environment (`server/.env`):
```
PORT=5001
MONGO_URI=your_mongo_connection_string
JWT_SECRET=your_secret_key
CLERK_SECRET_KEY=your_clerk_secret_key
```

#### Frontend Environment (`client/.env.local`):
```
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
CLERK_SECRET_KEY=your_clerk_secret_key
NEXT_PUBLIC_API_URL=http://localhost:5001/api
```

### 4️⃣ Run the application

#### Start backend

```bash
cd server
npm run dev
```

#### Start frontend

```bash
cd client
npm run dev
```

Now open: **[http://localhost:3000](http://localhost:3000)** 🔥

### 5️⃣ Quick Server Start

Alternatively, use the provided script:
```bash
./start-server.sh
```

---

## 🆕 Latest Features

### Settings & Profile Management
* **Complete Settings Page** at `/settings`
* **Real‑time Profile Editing** with instant updates
* **Offline Mode Support** using localStorage
* **Enhanced Profile Display** with dynamic content
* **Graceful Error Handling** for server connectivity
* **Mobile‑responsive Design** for all screen sizes

### Key Improvements
* **Clerk Authentication Integration** for secure user management
* **Improved API Error Handling** with fallback mechanisms
* **Enhanced User Experience** with loading states and feedback
* **Data Persistence** ensuring no data loss during offline usage

## 📦 Future Enhancements

* **Profile Picture Upload** functionality
* **Advanced Privacy Settings** for user profiles
* **Social Media Integration** for profile links
* **Account Management** features (delete account, export data)
* AI‑powered moderation & content summarization
* Advanced analytics dashboard
* Push notifications
* Collaborative live documents
* Mobile app (React Native)
* Redis caching & rate limiting

---

## 🚀 Usage Guide

### Profile Management
1. **Access Settings**: Click "Settings" in sidebar or "Edit Profile" on your profile
2. **Edit Information**: Update name, bio, location, website
3. **Save Changes**: Click "Save Changes" to persist updates
4. **View Updates**: Visit your profile to see changes immediately

### Offline Mode
* **Automatic Fallback**: App works offline with localStorage
* **Data Sync**: Changes sync when server becomes available
* **No Data Loss**: All edits are preserved locally

### Navigation
* **Sidebar Access**: Settings available in main navigation
* **Profile Integration**: Quick "Edit Profile" button on profile page
* **Responsive Design**: Works seamlessly on mobile and desktop

## 🤝 Contributing

Contributions are welcome! Follow these steps:

```
1. Fork the project
2. Create your feature branch (git checkout -b feature/my-feature)
3. Commit changes (git commit -m "Add new feature")
4. Push and open a Pull Request
```

### Recent Contributions
* **Settings Feature**: Complete profile management system
* **Offline Mode**: localStorage integration for data persistence
* **Enhanced UI**: Improved profile display and user experience
## 📊 Feature Status

| Feature | Status | Description |
|---------|--------|--------------|
| User Authentication | ✅ Complete | Clerk integration with secure sessions |
| Profile Management | ✅ Complete | Full CRUD operations for user profiles |
| Settings Page | ✅ Complete | Comprehensive profile editing interface |
| Offline Mode | ✅ Complete | localStorage fallback for offline usage |
| Posts & Comments | ✅ Complete | Create, view, and interact with posts |
| Communities | ✅ Complete | Join and manage topic‑based spaces |
| Real‑time Features | 🚧 In Progress | WebSocket integration for live updates |
| Mobile App | 📋 Planned | React Native implementation |

---

**Built with ❤️ for meaningful conversations and community collaboration**

## 🔧 Troubleshooting

### Common Issues

**Server Connection Error**:
* Ensure backend server is running on port 5001
* Check environment variables are properly set
* App will work offline with localStorage fallback

**Profile Not Updating**:
* Check browser console for errors
* Verify Clerk authentication is working
* Changes are saved locally even if server is down

**Settings Page Not Loading**:
* Ensure you're signed in with Clerk
* Check that `/settings` route is accessible
* Clear browser cache if needed

## 📜 License

This project is open‑source and available under the **MIT License**.

---


