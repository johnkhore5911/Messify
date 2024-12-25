package com.messifyapp

import android.os.Bundle
import com.facebook.react.ReactActivity
import com.facebook.react.ReactActivityDelegate
import com.facebook.react.defaults.DefaultNewArchitectureEntryPoint.fabricEnabled
import com.facebook.react.defaults.DefaultReactActivityDelegate
import com.facebook.react.ReactActivityDelegate
import com.facebook.react.ReactInstanceManager
import com.facebook.react.ReactNativeHost
import com.facebook.react.modules.core.DefaultHardwareBackBtnHandler
import com.facebook.react.bridge.ReactApplicationContext
import com.reactnativepushnotification.ReactNativePushNotificationPackage
import com.facebook.react.ReactApplication
import com.facebook.react.modules.core.DeviceEventManagerModule

import com.reactnativepushnotification.PushNotification
import com.reactnativepushnotification.PushNotificationConfig

class MainActivity : ReactActivity() {

    /**
     * Returns the name of the main component registered from JavaScript. This is used to schedule
     * rendering of the component.
     */
    override fun getMainComponentName(): String = "MessifyApp"

    /**
     * Override the createReactActivityDelegate method to use the default delegate
     * We use [DefaultReactActivityDelegate] which allows you to enable New Architecture with a single boolean flags [fabricEnabled]
     */
    override fun createReactActivityDelegate(): ReactActivityDelegate =
        DefaultReactActivityDelegate(this, mainComponentName, fabricEnabled)

    /**
     * Called when the activity is created. This is where we can handle initialization of push notifications.
     */
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)

        // Initialize Push Notification library
        PushNotification.configure(applicationContext) // Configuring the push notification with the app context

        // Create the notification channel
        PushNotification.createChannel(
            "default-channel-id", // Channel ID
            "Default Channel", // Channel Name
            "A default channel for notifications", // Channel description
            PushNotification.Importance.HIGH, // Channel importance
            true // Play sound for notifications
        )
    }
}
