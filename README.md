# React Native Application to work with the Lyft api

This application was made as a boilerplate application to work with the Lyft API. Special thanks to [Nick Diaz](https://github.com/wuno) on the fork. It uses React Native and handles the **3 Leg Flow** for **Oauth2** authentication described in the Lyft API Documentation. You can find that documentation here

https://developer.lyft.com/v1/docs/authentication

Since this app uses the Lyft API 3 leg flow and React Native, configuring **Deep Linking**
is not only necessary but important to be mindful of going forward. Opening the application
once the app permissions are authorized only works if the correct links are made and each app
is configured correctly in it's respective settings area. React Native goes over these settings
here

https://facebook.github.io/react-native/docs/linking.html

# Configure Lyft Developers Page

![picture alt](https://github.com/wuno/lyft/blob/master/Screenshot.png "Lyft Developer App View")

# Configuring IOS

The docs explaining Linking in IOS are here

https://developer.apple.com/ios/universal-links/

**info.plist**

```
<key>CFBundleURLTypes</key>
<array>
  <dict>
    <key>CFBundleURLSchemes</key>
    <array>
      <string>lyft-app</string>
    </array>
  </dict>
</array>
```

**AppDelegate.m**

```
- (BOOL)application:(UIApplication *)application
            openURL:(NSURL *)url
            options:(NSDictionary<UIApplicationOpenURLOptionsKey,id> *)options
{
  return [RCTLinkingManager application:application openURL:url options:options];
}

- (BOOL)application:(UIApplication *)application continueUserActivity:(NSUserActivity *)userActivity
 restorationHandler:(void (^)(NSArray * _Nullable))restorationHandler
{
  return [RCTLinkingManager application:application
                   continueUserActivity:userActivity
                     restorationHandler:restorationHandler];
}
```

# Configuring Android

The docs explaining Linking in Android are here

https://developer.android.com/training/app-links/deep-linking.html

**AndroidManifest.xml**

The correct intent filter must be added

```  
<intent-filter android:label="lyft-app-authorize">
  <action android:name="android.intent.action.VIEW" />
  <category android:name="android.intent.category.DEFAULT" />
  <category android:name="android.intent.category.BROWSABLE" />
  <data android:scheme="http"
        android:host="lyft-app"
        android:pathPrefix="/authorize" />
</intent-filter>
<intent-filter android:label="lyft-app-authorize">
  <action android:name="android.intent.action.VIEW" />
  <category android:name="android.intent.category.DEFAULT" />
  <category android:name="android.intent.category.BROWSABLE" />
  <data android:scheme="lyft-app"
        android:host="authorize" />
 </intent-filter>
```

# Installing The Application

git clone https://github.com/CoderVets/lyft-auth.git

cd lyft

npm install

# Running The Application on IOS

npm start

react-native run-ios

# Running The Application on Android

Open Android Studio

Navigate to Tools/Android/AVD Manager in Android Studio

Click play to start an Android Simulator

Navigate to the project directory in terminal

run npm start and allow this window in the terminal to continue to run

Navigate to the project directory and run react-native run-android

That last command will install the Android APK to the simulator you already started in the AVD Manager a few steps ago from Android Studio

# Lyft Request Information

If the initial 3 leg flow receives an error from the Lyft API it will look like this,

```
{
  error: "invalid_scope",
  error_description: "Invalid+scopes%3A+public%2520profile%2520rides.read%2520rides.request%2520offline",
  state: "%7Btrue%7D"
}
```

When the 3 leg flow redirects back to the application the url will look like this,

```
{
  url: "lyft-app://authorize?code=Tpmwvkd-Kzz-2hbO&state=true"
}
```

We are abstracting the parameters from the URL so we can use them for further requests.
The data is saved to a Redux Store.

# Resources

https://developer.lyft.com/v1/docs/authentication

https://facebook.github.io/react-native/docs/linking.html

https://developer.apple.com/ios/universal-links/

https://developer.android.com/training/app-links/deep-linking.html
