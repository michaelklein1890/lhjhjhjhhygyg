#!/bin/bash

# Navigate to the android directory
cd android

# Generate a keystore file for signing the APK
keytool -genkeypair -v -storetype PKCS12 -keystore app/my-upload-key.keystore -alias my-key-alias -keyalg RSA -keysize 2048 -validity 10000 -storepass password -keypass password -dname "CN=TaskManagerApp, OU=Mobile, O=YourCompany, L=YourCity, S=YourState, C=YourCountry"

echo "Keystore generated successfully!"
echo "Now you can build the release APK using: ./gradlew assembleRelease"
