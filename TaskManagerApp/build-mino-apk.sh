#!/bin/bash

# Navigate to the android directory
cd TaskManagerApp/android

# Clean the project
./gradlew clean

# Build the release APK
./gradlew assembleRelease

# Check if the APK was built successfully
if [ -f "app/build/outputs/apk/release/app-release.apk" ]; then
  # Copy and rename the APK to mino.apk
  cp app/build/outputs/apk/release/app-release.apk ../../mino.apk
  echo "APK build completed!"
  echo "Your APK file has been created as: mino.apk"
else
  echo "Error: APK build failed. Could not find the output APK file."
  exit 1
fi
