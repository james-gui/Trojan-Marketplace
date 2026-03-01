import React, { useState } from 'react';
import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router';
import { DSCard } from '../components/design-system/DSCard';
import { DSSwitch } from '../components/design-system/DSSwitch';
import { BottomNavigation } from '../components/BottomNavigation';

export default function NotificationSettings() {
  const navigate = useNavigate();
  
  const [settings, setSettings] = useState({
    taskUpdates: true,
    paymentAlerts: true,
    newMessages: true,
    taskReminders: false,
    marketingEmails: false,
    weeklyDigest: true,
    pushNotifications: true,
    emailNotifications: true,
    smsNotifications: false,
  });

  const updateSetting = (key: keyof typeof settings) => {
    setSettings({ ...settings, [key]: !settings[key] });
  };

  return (
    <div className="min-h-screen bg-white pb-24">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-40">
        <div className="max-w-md mx-auto px-4 h-14 flex items-center justify-between">
          <button 
            onClick={() => navigate('/profile')}
            className="p-2 hover:bg-slate-50 rounded transition-colors"
          >
            <ArrowLeft size={20} strokeWidth={1.5} />
          </button>
          
          <h1 className="text-base tracking-tight">NOTIFICATION SETTINGS</h1>
          
          <div className="w-10"></div>
        </div>
      </header>

      <main className="max-w-md mx-auto px-4 py-6 space-y-6">
        {/* Task Notifications */}
        <div>
          <h2 className="px-4 mb-4 text-sm text-slate-600 tracking-wider uppercase">Task Notifications</h2>
          <DSCard variant="bordered" className="divide-y divide-slate-200">
            <div className="flex items-center justify-between p-4">
              <div>
                <div className="text-base mb-1">Task Updates</div>
                <div className="text-xs text-slate-600">Get notified about task progress</div>
              </div>
              <DSSwitch
                checked={settings.taskUpdates}
                onChange={() => updateSetting('taskUpdates')}
              />
            </div>
            <div className="flex items-center justify-between p-4">
              <div>
                <div className="text-base mb-1">Payment Alerts</div>
                <div className="text-xs text-slate-600">Notifications for payments</div>
              </div>
              <DSSwitch
                checked={settings.paymentAlerts}
                onChange={() => updateSetting('paymentAlerts')}
              />
            </div>
            <div className="flex items-center justify-between p-4">
              <div>
                <div className="text-base mb-1">New Messages</div>
                <div className="text-xs text-slate-600">Chat messages from other users</div>
              </div>
              <DSSwitch
                checked={settings.newMessages}
                onChange={() => updateSetting('newMessages')}
              />
            </div>
            <div className="flex items-center justify-between p-4">
              <div>
                <div className="text-base mb-1">Task Reminders</div>
                <div className="text-xs text-slate-600">Reminders for upcoming tasks</div>
              </div>
              <DSSwitch
                checked={settings.taskReminders}
                onChange={() => updateSetting('taskReminders')}
              />
            </div>
          </DSCard>
        </div>

        {/* Marketing */}
        <div>
          <h2 className="px-4 mb-4 text-sm text-slate-600 tracking-wider uppercase">Marketing</h2>
          <DSCard variant="bordered" className="divide-y divide-slate-200">
            <div className="flex items-center justify-between p-4">
              <div>
                <div className="text-base mb-1">Marketing Emails</div>
                <div className="text-xs text-slate-600">News and promotions</div>
              </div>
              <DSSwitch
                checked={settings.marketingEmails}
                onChange={() => updateSetting('marketingEmails')}
              />
            </div>
            <div className="flex items-center justify-between p-4">
              <div>
                <div className="text-base mb-1">Weekly Digest</div>
                <div className="text-xs text-slate-600">Weekly summary of activity</div>
              </div>
              <DSSwitch
                checked={settings.weeklyDigest}
                onChange={() => updateSetting('weeklyDigest')}
              />
            </div>
          </DSCard>
        </div>

        {/* Delivery Methods */}
        <div>
          <h2 className="px-4 mb-4 text-sm text-slate-600 tracking-wider uppercase">Delivery Methods</h2>
          <DSCard variant="bordered" className="divide-y divide-slate-200">
            <div className="flex items-center justify-between p-4">
              <div>
                <div className="text-base mb-1">Push Notifications</div>
                <div className="text-xs text-slate-600">Mobile app notifications</div>
              </div>
              <DSSwitch
                checked={settings.pushNotifications}
                onChange={() => updateSetting('pushNotifications')}
              />
            </div>
            <div className="flex items-center justify-between p-4">
              <div>
                <div className="text-base mb-1">Email Notifications</div>
                <div className="text-xs text-slate-600">Receive updates via email</div>
              </div>
              <DSSwitch
                checked={settings.emailNotifications}
                onChange={() => updateSetting('emailNotifications')}
              />
            </div>
            <div className="flex items-center justify-between p-4">
              <div>
                <div className="text-base mb-1">SMS Notifications</div>
                <div className="text-xs text-slate-600">Text message alerts</div>
              </div>
              <DSSwitch
                checked={settings.smsNotifications}
                onChange={() => updateSetting('smsNotifications')}
              />
            </div>
          </DSCard>
        </div>

        {/* Information Box */}
        <DSCard variant="bordered" className="bg-slate-50">
          <h3 className="text-sm mb-2">Notification Tips</h3>
          <div className="space-y-1 text-xs text-slate-600">
            <p>• Keep payment alerts enabled for security</p>
            <p>• Task updates help you stay informed</p>
            <p>• You can change these settings anytime</p>
          </div>
        </DSCard>
      </main>

      {/* Bottom Navigation */}
      <BottomNavigation />
    </div>
  );
}
