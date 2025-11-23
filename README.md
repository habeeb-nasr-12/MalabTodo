
MalabToDo
A cross-platform mobile todo application built with React Native, TypeScript, and Firebase.

Prerequisites

Before you begin, ensure you have the following installed:

Node.js** (v20 or higher)
React Native CLI**: `npm install -g react-native-cli`
Xcode** (for iOS development on macOS)
Android Studio** (for Android development)
CocoaPods** (for iOS dependencies): `sudo gem install cocoapods`
Java Development Kit (JDK)** (for Android)


<!-- clone the repo -->

git clone https://github.com/your-username/MalabTodo.git](https://github.com/habeeb-nasr-12/MalabTodo.git
cd MalabTodo


Opening in vs code 

1. Open the project folder:
   - Launch Cursor
   - Go to `File > Open Folder...` (or `Cmd+O` on macOS, `Ctrl+O` on Windows/Linux)
   - Navigate to the `MalabTodo` directory and select it

2. Access the terminal:
   - Use `Ctrl+`` (backtick) or `View > Terminal` to open the integrated terminal
   - The terminal will automatically be in the project root directory


Installation

1. Install Node.js dependencies:
   ```bash
   npm install
   ```

2. Install iOS dependencies (macOS only):
   ```bash
   cd ios
   pod install
   cd ..
   ```

Running the App

#Start Metro Bundler

In a terminal (or Cursor's integrated terminal), run:

```bash
npm start
```

Keep this terminal running. The Metro bundler serves your JavaScript code to the app.

#iOS

Requirements:
- macOS with Xcode installed
- iOS Simulator or physical device

Steps:

1. Open a new terminal in Cursor (keep Metro running in another terminal)

2. Run the iOS app:
   npm run ios
   ```
   or 

   npm run ios -- --simulator="iPhone 17 Pro"
   ```

3. Alternative method (using Xcode):
   - Open `ios/MalabTodoNew.xcworkspace` in Xcode
   - Select a simulator or device
   - Press `Cmd+R` to build and run

#Android

Requirements:
- Android Studio installed
- Android SDK configured
- Android emulator running or physical device connected

Steps:

1. Start an Android emulator (if not using a physical device):
   - Open Android Studio
   - Go to `Tools > Device Manager`
   - Start an emulator

2. Verify device connection:
   ```bash
   adb devices
   ```

3. Run the Android app (in a new terminal):
   ```bash
   npm run android
   ```

Available Scripts

- `npm start` - Start Metro bundler
- `npm run ios` - Run on iOS simulator/device
- `npm run android` - Run on Android emulator/device
- `npm run android&ios` - Run on both platforms simultaneously
- `npm run lint` - Run ESLint
- `npm test` - Run tests


