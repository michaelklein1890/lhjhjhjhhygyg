#!/bin/bash

# Navigate to the android directory
cd android

# Clean the project
./gradlew clean

# Build the release APK
./gradlew assembleRelease

echo "APK build completed!"
echo "Your APK file is located at: android/app/build/outputs/apk/release/app-release.apk"
