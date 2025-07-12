import * as Notifications from 'expo-notifications';
import * as Device from 'expo-device';
import { Platform } from 'react-native';

// Configure notification behavior
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
    shouldShowBanner: true,
    shouldShowList: true,
  }),
});

export class NotificationService {
  // Request notification permissions
  static async requestPermissions() {
    if (Device.isDevice) {
      const { status: existingStatus } = await Notifications.getPermissionsAsync();
      let finalStatus = existingStatus;
      
      if (existingStatus !== 'granted') {
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
      }
      
      if (finalStatus !== 'granted') {
        console.log('Failed to get push token for push notification!');
        return false;
      }
      
      return true;
    } else {
      console.log('Must use physical device for Push Notifications');
      return false;
    }
  }

  // Schedule a lesson reminder notification
  static async scheduleLessonReminder(lesson: {
    id: string | number;
    title: string;
    teacher: string;
    start_time: string;
  }) {
    try {
      // Parse the start time (HH:MM format)
      const [hours, minutes] = lesson.start_time.split(':').map(Number);
      
      // Create a date for today with the lesson time
      const lessonTime = new Date();
      lessonTime.setHours(hours, minutes, 0, 0);
      
      // Set reminder 15 minutes before lesson
      const reminderTime = new Date(lessonTime.getTime() - 15 * 60 * 1000);
      
      // If the reminder time has already passed today, schedule for tomorrow
      if (reminderTime <= new Date()) {
        reminderTime.setDate(reminderTime.getDate() + 1);
      }
      
      // Schedule the notification
      const notificationId = await Notifications.scheduleNotificationAsync({
        content: {
          title: 'Lesson Reminder',
          body: `Your lesson "${lesson.title}" with ${lesson.teacher} starts in 15 minutes!`,
          data: { lessonId: lesson.id },
        },
        trigger: reminderTime as any,
      });
      
      console.log(`Scheduled reminder for lesson ${lesson.title} at ${reminderTime.toLocaleString()}`);
      return notificationId;
    } catch (error) {
      console.error('Error scheduling lesson reminder:', error);
      return null;
    }
  }

  // Cancel a specific notification
  static async cancelNotification(notificationId: string) {
    await Notifications.cancelScheduledNotificationAsync(notificationId);
  }

  // Cancel all scheduled notifications
  static async cancelAllNotifications() {
    await Notifications.cancelAllScheduledNotificationsAsync();
  }

  // Get all scheduled notifications
  static async getScheduledNotifications() {
    return await Notifications.getAllScheduledNotificationsAsync();
  }
}

export default NotificationService; 