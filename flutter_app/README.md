# TAD Mega App - Flutter Wrapper

This is a Flutter wrapper for the TAD Mega App web application. It uses `webview_flutter` to provide a native app experience while leveraging the existing web logic and UI.

## Prerequisites

- [Flutter SDK](https://docs.flutter.dev/get-started/install) installed on your machine.
- An IDE (VS Code, Android Studio, or IntelliJ) with Flutter plugins.

## Setup Instructions

1. **Navigate to the flutter directory:**
   ```bash
   cd flutter_app
   ```

2. **Install dependencies:**
   ```bash
   flutter pub get
   ```

3. **Configure for Android:**
   - Ensure `minSdkVersion` is at least **20** in `android/app/build.gradle`.
   - Add Internet permission to `AndroidManifest.xml`:
     ```xml
     <uses-permission android:name="android.permission.INTERNET"/>
     ```

4. **Configure for iOS:**
   - Add `NSAppTransportSecurity` to `Info.plist` if needed for non-HTTPS connections (though the web app is HTTPS).
   - Ensure `io.flutter.embedded_views_preview` is set to `YES` in `Info.plist`.

5. **Run the app:**
   ```bash
   flutter run
   ```

## Customization

- **App Icon:** Replace the default Flutter icons in `android/app/src/main/res` and `ios/Runner/Assets.xcassets`.
- **Splash Screen:** Use the `flutter_native_splash` package for a professional entrance.
- **Deep Linking:** Configure intent filters (Android) and universal links (iOS) to handle redirects back to the app.

## Why WebView?

Using a WebView allows you to:
- Maintain a single codebase for Web, Android, and iOS.
- Push updates to the UI and logic instantly without requiring users to update the app from the store.
- Leverage the polished React/Tailwind UI already built.
