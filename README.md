# FFX Monster Tracker

A modern React-based companion application for Final Fantasy X players to track Monster Arena progress, capture counts, and item sources. Built as the perfect second-screen experience while playing FFX.

![FFX Monster Tracker Screenshot](https://github.com/user-attachments/assets/6e1b3a30-dad3-4baa-aaf2-2fcf25116c9f)

## ✨ Features

### 🏝️ **Locations & Monsters**
- **13 Game Locations** - Complete coverage of all FFX Monster Arena locations
- **95 Monsters** - Track all capturable monsters with detailed information
- **Capture Counter** - Increment/decrement capture counts with localStorage persistence
- **Progress Tracking** - Visual progress bars showing completion percentage per location
- **Monster Details** - Complete monster information including HP, steal items, and drop items
- **Smart Icons** - Location and monster-specific emoji icons for easy recognition

### 💎 **Items Database**
- **66 Items** - Complete database of all obtainable items in FFX
- **Source Tracking** - See exactly which monsters drop or can be stolen from for each item
- **Location Organization** - Items sources grouped by game locations
- **Cross-Reference** - Click monster names to view their detailed information
- **Smart Categorization** - Items automatically categorized with appropriate icons

### 🎨 **User Experience**
- **Tab Navigation** - Clean switching between Locations and Items views
- **Responsive Design** - Optimized for desktop, tablet, and mobile devices
- **Modern UI** - Sleek design with smooth animations and transitions
- **Keyboard Navigation** - Escape key support for quick navigation
- **Dark Theme Ready** - CSS variables ready for theme switching

## 🚀 Technology Stack

- **React 18.3.1** - Modern React with hooks and functional components
- **Vite** - Lightning-fast build tool and development server
- **Vanilla CSS** - Custom CSS with CSS Grid and Flexbox for layouts
- **Local Storage** - Persistent capture count storage
- **ES6+ Modules** - Modern JavaScript with import/export syntax

## 📦 Installation

### Prerequisites
- Node.js (version 16 or higher)
- npm or yarn package manager

### Setup
```bash
# Clone the repository
git clone https://github.com/yourusername/FFXMonsterList.git

# Navigate to project directory
cd FFXMonsterList

# Install dependencies
npm install

# Start development server
npm run dev
```

The application will be available at `http://localhost:3000`

## 🛠️ Development

### Available Scripts

```bash
# Start development server with hot reload
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Start development (alias for dev)
npm start
```

### Project Structure

```
src/
├── components/           # React components
│   ├── Header.jsx           # App header with title
│   ├── TabNavigation.jsx    # Tab switching component
│   ├── LocationsTab.jsx     # Locations tab container
│   ├── LocationCard.jsx     # Individual location cards
│   ├── MonsterSection.jsx   # Monster list view
│   ├── MonsterCard.jsx      # Monster cards with capture controls
│   ├── ItemsTab.jsx         # Items tab container
│   ├── ItemCard.jsx         # Individual item cards
│   ├── ItemDetailsSection.jsx # Item source details
│   ├── MonsterModal.jsx     # Monster details modal
│   └── ErrorMessage.jsx     # Error display component
├── hooks/                # Custom React hooks
│   └── useMonsterData.js    # Data loading and management
├── utils/                # Utility functions
│   ├── storage.js           # localStorage management
│   └── icons.js             # Icon mapping functions
├── styles/               # CSS stylesheets
│   └── style.css            # Main application styles
├── data/                 # Static data files
│   └── ffx_monsters.json    # Monster and item database
├── App.jsx               # Main application component
└── main.jsx              # React application entry point
```

## 📱 Usage

### Monster Tracking
1. **Browse Locations** - Click on any location card to view its monsters
2. **Update Captures** - Use +/- buttons to track monster captures
3. **View Progress** - See completion percentages and progress bars
4. **Monster Details** - Click "View Details" for complete monster information

### Item Database
1. **Switch to Items Tab** - Click the 💎 Items tab
2. **Browse Items** - Scroll through the complete item database
3. **View Sources** - Click any item to see where it can be obtained
4. **Cross-Reference** - Click monster names to view their details

### Navigation
- **Escape Key** - Navigate back from any detailed view
- **Tab Switching** - Seamlessly switch between Locations and Items
- **Back Buttons** - Clear navigation with back button support

## 🎮 Game Integration

This app is designed as a **second-screen companion** for Final Fantasy X:

1. **Keep the app open** on your phone, tablet, or second monitor
2. **While playing FFX**, use the app to track your Monster Arena progress
3. **Mark captures** as you catch monsters in the Calm Lands
4. **Check item sources** when you need specific items for customization
5. **Track completion** to see which locations still need attention

## 🏗️ Architecture

### Component-Based Design
- **Modular Components** - Each UI element is a reusable React component
- **Props-Based Communication** - Clean data flow between components
- **Custom Hooks** - Centralized data management with `useMonsterData`
- **State Management** - React hooks for local state, localStorage for persistence

### Performance Optimizations
- **Virtual DOM** - Efficient re-rendering with React
- **Hot Module Replacement** - Instant updates during development
- **Build Optimization** - Tree shaking and minification with Vite
- **Responsive Images** - Optimized for different screen sizes

### Data Management
- **JSON Database** - All monster and item data in structured JSON
- **localStorage Integration** - Persistent capture count storage
- **Cross-Referencing** - Efficient lookup between monsters, items, and locations
- **Progress Calculations** - Real-time completion percentage calculations

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Development Guidelines
- **Component Structure** - Keep components small and focused
- **Props Documentation** - Document component props clearly
- **CSS Conventions** - Use existing CSS variable system
- **Responsive Design** - Test on multiple screen sizes
- **Data Integrity** - Preserve existing localStorage functionality

---

**Perfect for FFX completionists and Monster Arena enthusiasts!** 🎯

Built with ❤️ for the Final Fantasy X community.
