# Break.io

Break.io is a modern lesson management app built with React Native and Expo. It helps students and teachers manage lessons, track completion, view statistics, and receive timely reminders. The app features a beautiful UI, dark/light themes, Ukrainian localization, and push notifications for lesson reminders.

## Features

- **Lesson Management (CRUD):**
  - Add, edit, and delete lessons with title, teacher, and time (HH:MM format).
  - Mark lessons as completed/uncompleted with a radio button.
  - Animated clear-all-lessons button.
  - FlatList display of all lessons with per-lesson delete (trash icon).
- **Statistics & Analytics:**
  - View total, completed, and uncompleted lessons.
  - Pie chart of lessons per teacher.
  - Handles invalid/corrupted data gracefully.
- **Themes:**
  - Light and dark mode support.
  - Auto theme based on system settings.
  - In-app theme switcher.
- **Localization:**
  - Full Ukrainian translation (except brand name).
- **Push Notifications:**
  - Expo Notifications integration.
  - Reminders 15 minutes before lesson start.
  - NotificationService for scheduling/cancelling notifications.
- **Modern UI:**
  - Tailwind CSS (via NativeWind) for styling.
  - Responsive, mobile-first design.

## Screenshots

> _Add screenshots here if available._

## Getting Started

### Prerequisites
- [Node.js](https://nodejs.org/) (v18+ recommended)
- [Expo CLI](https://docs.expo.dev/get-started/installation/)
- [Git](https://git-scm.com/)

### Installation

1. **Clone the repository:**
   ```bash
   git clone <your-repo-url>
   cd break.io
   ```
2. **Install dependencies:**
   ```bash
   npm install
   ```
3. **Start the Expo development server:**
   ```bash
   npm start
   ```
4. **Run on your device or emulator:**
   - For iOS: `npm run ios`
   - For Android: `npm run android`
   - For Web: `npm run web`

## Project Structure

```
break.io/
├── App.tsx                # App entry point
├── components/            # Reusable UI components
│   ├── LessonSheet/       # Add lesson form
│   ├── Lesson/            # Lesson display component
│   ├── Statistics/        # Statistics and charts
│   └── Theme/             # Theme context and switcher
├── navigation/            # Navigation stacks
├── pages/                 # Main screens (Home, Settings)
├── services/              # NotificationService
├── assets/                # Icons, splash, images
├── global.css             # Tailwind base
├── tailwind.config.js     # Tailwind/NativeWind config
├── app.json               # Expo app config
└── ...
```

## Technologies Used
- **React Native** (0.79+)
- **Expo** (53+)
- **TypeScript**
- **AsyncStorage** for local data
- **Expo Notifications** for reminders
- **NativeWind** (Tailwind CSS for React Native)
- **react-navigation** for navigation
- **react-native-svg-charts** for statistics
- **i18next** and **react-i18next** for localization

## Localization
- The app is fully localized in Ukrainian (except the brand name).
- All forms, buttons, messages, and navigation are translated.

## Theming
- Supports light and dark themes.
- Theme auto-switches based on system settings, but can be toggled in-app.

## Notifications
- The app requests notification permissions on first launch.
- Schedules reminders 15 minutes before each lesson.
- Uses Expo Notifications API (physical device required for push notifications).

## Statistics
- View lesson completion stats and a pie chart of lessons per teacher.
- Statistics update dynamically and handle invalid/corrupted data.

## Troubleshooting
- If you encounter data errors, clear AsyncStorage via the "Очистити уроки" button.
- For push notifications, ensure you are running on a physical device.

## Credits
- Developed by [Your Name/Team].
- Powered by Expo, React Native, NativeWind, and the open-source community.

---

_This project is for educational and practical use. Contributions and feedback are welcome!_ 