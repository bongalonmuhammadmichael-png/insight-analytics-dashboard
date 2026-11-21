"use client";

import { useEffect, useState, type FormEvent } from "react";
import { useTheme } from "next-themes";
import {
  UserRound,
  Palette,
  Bell,
  Globe,
  ShieldCheck,
  Sun,
  Moon,
  Monitor,
  Check,
  Save,
  CheckCircle2,
  AlertCircle,
  Eye,
  EyeOff,
  LockKeyhole,
} from "lucide-react";

const settingsSections = [
  { id: "profile", label: "Profile", icon: UserRound },
  { id: "appearance", label: "Appearance", icon: Palette },
  { id: "notifications", label: "Notifications", icon: Bell },
  { id: "regional", label: "Regional Preferences", icon: Globe },
  { id: "security", label: "Security", icon: ShieldCheck },
];

type Profile = {
  fullName: string;
  email: string;
};

const defaultProfile: Profile = {
  fullName: "Mustafa",
  email: "mustafa@example.com",
};

const PROFILE_STORAGE_KEY = "insight-profile";

type NotificationPreferences = {
  emailNotifications: boolean;
  newOrderAlerts: boolean;
  customerRegistrationAlerts: boolean;
  lowStockAlerts: boolean;
  weeklyReports: boolean;
};

const defaultNotifications: NotificationPreferences = {
  emailNotifications: true,
  newOrderAlerts: true,
  customerRegistrationAlerts: true,
  lowStockAlerts: true,
  weeklyReports: false,
};

const NOTIFICATION_STORAGE_KEY = "insight-notifications";

type RegionalPreferences = {
  language: string;
  timezone: string;
  dateFormat: string;
};

const defaultRegionalPreferences: RegionalPreferences = {
  language: "en",
  timezone: "Asia/Manila",
  dateFormat: "DD/MM/YYYY",
};

const REGIONAL_STORAGE_KEY = "insight-regional-preferences";

export default function SettingsPage() {

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [securityMessage, setSecurityMessage] = useState("");
  const [securityError, setSecurityError] = useState("");

  const [regionalPreferences, setRegionalPreferences] =
    useState<RegionalPreferences>(defaultRegionalPreferences);

  const [savedRegionalPreferences, setSavedRegionalPreferences] =
    useState<RegionalPreferences>(defaultRegionalPreferences);

  const [regionalLoaded, setRegionalLoaded] = useState(false);
  const [regionalMessage, setRegionalMessage] = useState("");


  const [profile, setProfile] = useState<Profile>(defaultProfile);
  const [savedProfile, setSavedProfile] =
    useState<Profile>(defaultProfile);

  const [profileLoaded, setProfileLoaded] = useState(false);
  const [saveMessage, setSaveMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [activeSection, setActiveSection] = useState("profile");
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

    const [notifications, setNotifications] =
    useState<NotificationPreferences>(defaultNotifications);

    const [savedNotifications, setSavedNotifications] =
    useState<NotificationPreferences>(defaultNotifications);

    const [notificationsLoaded, setNotificationsLoaded] = useState(false);
    const [notificationMessage, setNotificationMessage] = useState("");


    useEffect(() => {
    try {
        const storedNotifications = localStorage.getItem(
        NOTIFICATION_STORAGE_KEY
        );

        if (storedNotifications) {
        const parsed = JSON.parse(storedNotifications);

        const validPreferences = {
            emailNotifications: parsed.emailNotifications === true,
            newOrderAlerts: parsed.newOrderAlerts === true,
            customerRegistrationAlerts:
            parsed.customerRegistrationAlerts === true,
            lowStockAlerts: parsed.lowStockAlerts === true,
            weeklyReports: parsed.weeklyReports === true,
        };

        setNotifications(validPreferences);
        setSavedNotifications(validPreferences);
        }
    } catch {
        console.error("Unable to load notification preferences.");
    } finally {
        setNotificationsLoaded(true);
    }
    }, []);


    function handleNotificationSave() {
        try {
            localStorage.setItem(
            NOTIFICATION_STORAGE_KEY,
            JSON.stringify(notifications)
            );

            setSavedNotifications(notifications);
            setNotificationMessage("Notification preferences saved successfully.");
        } catch {
            setNotificationMessage("Unable to save notification preferences.");
        }
    }

  useEffect(() => {
    setMounted(true);
  }, []);

  
    useEffect(() => {
        try {
        const storedProfile = localStorage.getItem(PROFILE_STORAGE_KEY);

        if (storedProfile) {
            const parsedProfile = JSON.parse(storedProfile);

            if (
            typeof parsedProfile.fullName === "string" &&
            typeof parsedProfile.email === "string"
            ) {
            setProfile(parsedProfile);
            setSavedProfile(parsedProfile);
            }
        }
        } catch {
        console.error("Unable to load saved profile.");
        } finally {
        setProfileLoaded(true);
        }
    }, []);
  
  useEffect(() => {
      try {
        const stored = localStorage.getItem(REGIONAL_STORAGE_KEY);

        if (stored) {
          const parsed = JSON.parse(stored);

          const validPreferences: RegionalPreferences = {
            language:
              ["en", "fil", "ar"].includes(parsed.language)
                ? parsed.language
                : defaultRegionalPreferences.language,

            timezone:
              typeof parsed.timezone === "string"
                ? parsed.timezone
                : defaultRegionalPreferences.timezone,

            dateFormat:
              ["DD/MM/YYYY", "MM/DD/YYYY", "YYYY-MM-DD"].includes(
                parsed.dateFormat
              )
                ? parsed.dateFormat
                : defaultRegionalPreferences.dateFormat,
          };

          setRegionalPreferences(validPreferences);
          setSavedRegionalPreferences(validPreferences);
        }
      } catch {
        console.error("Unable to load regional preferences.");
      } finally {
        setRegionalLoaded(true);
      }
  }, []);


  function handleRegionalSave() {
    try {
      localStorage.setItem(
        REGIONAL_STORAGE_KEY,
        JSON.stringify(regionalPreferences)
      );

      setSavedRegionalPreferences(regionalPreferences);
      setRegionalMessage("Regional preferences saved successfully.");
    } catch {
      setRegionalMessage("Unable to save regional preferences.");
    }
  }


function handlePasswordChange(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setSecurityMessage("");
    setSecurityError("");

    if (!currentPassword || !newPassword || !confirmPassword) {
      setSecurityError("Please complete all password fields.");
      return;
    }

    if (newPassword.length < 8) {
      setSecurityError("Your new password must contain at least 8 characters.");
      return;
    }

    if (!/[A-Z]/.test(newPassword)) {
      setSecurityError("Your password must contain at least one uppercase letter.");
      return;
    }

    if (!/[a-z]/.test(newPassword)) {
      setSecurityError("Your password must contain at least one lowercase letter.");
      return;
    }

    if (!/[0-9]/.test(newPassword)) {
      setSecurityError("Your password must contain at least one number.");
      return;
    }

    if (!/[^A-Za-z0-9]/.test(newPassword)) {
      setSecurityError("Your password must contain at least one special character.");
      return;
    }

    if (newPassword !== confirmPassword) {
      setSecurityError("Your new passwords do not match.");
      return;
    }

    setSecurityError(
      "Password changes are not connected to a backend yet. No password has been changed."
    );
  }


  function handleProfileSave(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const updatedProfile = {
      fullName: profile.fullName.trim(),
      email: profile.email.trim(),
    };



    if (!updatedProfile.fullName || !updatedProfile.email) {
      setErrorMessage("Please complete all profile fields.");
      setSaveMessage("");
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(updatedProfile.email)) {
      setErrorMessage("Please enter a valid email address.");
      setSaveMessage("");
      return;
    }

    try {
      localStorage.setItem(
        PROFILE_STORAGE_KEY,
        JSON.stringify(updatedProfile)
      );

      setProfile(updatedProfile);
      setSavedProfile(updatedProfile);
      setErrorMessage("");
      setSaveMessage("Your profile has been saved successfully.");
    } catch {
      setErrorMessage("Unable to save your profile. Please try again.");
      setSaveMessage("");
    }
  }


  const appearanceOptions = [
    {
      value: "light",
      label: "Light",
      description: "A bright interface for daytime use.",
      icon: Sun,
    },
    {
      value: "dark",
      label: "Dark",
      description: "A darker interface for low-light environments.",
      icon: Moon,
    },
    {
      value: "system",
      label: "System",
      description: "Automatically follow your device preference.",
      icon: Monitor,
    },
  ];

  return (
    <div className="mx-auto max-w-7xl space-y-8">
      {/* Page heading */}
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-foreground">
          Settings
        </h1>
        <p className="mt-2 text-sm text-muted">
          Manage your account, preferences, and application settings.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-4">
        {/* Settings navigation */}
        <aside className="h-fit rounded-2xl border border-border bg-card p-3">
          <p className="px-3 py-3 text-xs font-semibold uppercase tracking-wider text-muted">
            Preferences
          </p>

          <nav className="space-y-1">
            {settingsSections.map((section) => {
              const Icon = section.icon;
              const isActive = activeSection === section.id;

              return (
                <button
                  key={section.id}
                  type="button"
                  onClick={() => setActiveSection(section.id)}
                  className={`flex w-full items-center gap-3 rounded-xl px-3 py-3 text-left text-sm font-medium transition ${
                    isActive
                      ? "bg-primary text-white"
                      : "text-muted hover:bg-background hover:text-foreground"
                  }`}
                >
                  <Icon size={18} />
                  {section.label}
                </button>
              );
            })}
          </nav>
        </aside>

        {/* Settings content */}
        <div className="min-w-0 lg:col-span-3">
          {activeSection === "profile" && (
            <section className="rounded-2xl border border-border bg-card p-6">
              <h2 className="text-lg font-bold text-foreground">
                Profile Settings
              </h2>
              <p className="mt-1 text-sm text-muted">
                Manage your personal account information.
              </p>

              <div className="mt-8 flex items-center gap-4">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary text-xl font-bold text-white">
                {profile.fullName
                    .split(" ")
                    .filter(Boolean)
                    .slice(0, 2)
                    .map((part) => part[0].toUpperCase())
                    .join("") || "MB"}
                </div>
                <div>
                <p className="font-semibold text-foreground">
                    {profile.fullName}
                </p>
                  <p className="text-sm text-muted">Administrator</p>
                </div>
              </div>


                <form onSubmit={handleProfileSave} className="mt-8">
                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                    <div>
                    <label
                        htmlFor="fullName"
                        className="mb-2 block text-sm font-medium text-foreground"
                    >
                        Full Name
                    </label>

                    <input
                        id="fullName"
                        type="text"
                        value={profile.fullName}
                        onChange={(event) => {
                        setProfile({ ...profile, fullName: event.target.value });
                        setSaveMessage("");
                        setErrorMessage("");
                        }}
                        disabled={!profileLoaded}
                        required
                        maxLength={60}
                        className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm text-foreground outline-none transition focus:border-primary disabled:opacity-50"
                    />
                    </div>

                    <div>
                    <label
                        htmlFor="email"
                        className="mb-2 block text-sm font-medium text-foreground"
                    >
                        Email Address
                    </label>

                    <input
                        id="email"
                        type="email"
                        value={profile.email}
                        onChange={(event) => {
                        setProfile({ ...profile, email: event.target.value });
                        setSaveMessage("");
                        setErrorMessage("");
                        }}
                        disabled={!profileLoaded}
                        required
                        className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm text-foreground outline-none transition focus:border-primary disabled:opacity-50"
                    />
                    </div>

                    <div>
                    <label className="mb-2 block text-sm font-medium text-foreground">
                        Role
                    </label>

                    <input
                        type="text"
                        value="Administrator"
                        disabled
                        className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm text-muted"
                    />
                    </div>
                </div>

                {saveMessage && (
                    <div className="mt-5 flex items-center gap-2 rounded-xl bg-emerald-500/10 px-4 py-3 text-sm text-emerald-600">
                    <CheckCircle2 size={18} />
                    {saveMessage}
                    </div>
                )}

                {errorMessage && (
                    <div className="mt-5 flex items-center gap-2 rounded-xl bg-red-500/10 px-4 py-3 text-sm text-red-500">
                    <AlertCircle size={18} />
                    {errorMessage}
                    </div>
                )}

                <div className="mt-8 flex flex-wrap justify-end gap-3">
                    <button
                    type="button"
                    onClick={() => {
                        setProfile(savedProfile);
                        setSaveMessage("");
                        setErrorMessage("");
                    }}
                    disabled={
                        profile.fullName === savedProfile.fullName &&
                        profile.email === savedProfile.email
                    }
                    className="rounded-xl border border-border px-5 py-2.5 text-sm font-semibold text-foreground transition hover:bg-background disabled:cursor-not-allowed disabled:opacity-40"
                    >
                    Discard
                    </button>

                    <button
                    type="submit"
                    disabled={
                        !profileLoaded ||
                        (profile.fullName === savedProfile.fullName &&
                        profile.email === savedProfile.email)
                    }
                    className="inline-flex items-center gap-2 rounded-xl bg-primary px-5 py-2.5 text-sm font-semibold text-white transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-40"
                    >
                    <Save size={16} />
                    Save Changes
                    </button>
                </div>
                </form>
            </section>
          )}

          {activeSection === "appearance" && (
            <section className="rounded-2xl border border-border bg-card p-6">
              <h2 className="text-lg font-bold text-foreground">
                Appearance
              </h2>
              <p className="mt-1 text-sm text-muted">
                Customize how INSIGHT looks on your device.
              </p>

              <div className="mt-8 space-y-4">
                <div>
                  <h3 className="text-sm font-semibold text-foreground">
                    Interface Theme
                  </h3>
                  <p className="mt-1 text-sm text-muted">
                    Select your preferred application appearance.
                  </p>
                </div>

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                  {appearanceOptions.map((option) => {
                    const Icon = option.icon;
                    const isSelected = mounted && theme === option.value;

                    return (
                      <button
                        key={option.value}
                        type="button"
                        onClick={() => setTheme(option.value)}
                        className={`relative rounded-xl border p-5 text-left transition ${
                          isSelected
                            ? "border-primary bg-primary/5"
                            : "border-border hover:border-primary/50"
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <Icon size={22} className="text-primary" />
                          {isSelected && (
                            <Check size={18} className="text-primary" />
                          )}
                        </div>

                        <p className="mt-5 text-sm font-semibold text-foreground">
                          {option.label}
                        </p>
                        <p className="mt-1 text-xs leading-5 text-muted">
                          {option.description}
                        </p>
                      </button>
                    );
                  })}
                </div>
              </div>
            </section>
          )}

          
          {activeSection === "notifications" && (

              <section className="rounded-2xl border border-border bg-card p-6">
                    <h2 className="text-lg font-bold text-foreground">
                    Notifications
                    </h2>

                    <p className="mt-1 text-sm text-muted">
                    Choose which business updates you want to receive.
                    </p>

                    <div className="mt-8 space-y-6">
                    {[
                        {
                        key: "emailNotifications" as const,
                        title: "Email Notifications",
                        description: "Receive important updates through email.",
                        },
                        {
                        key: "newOrderAlerts" as const,
                        title: "New Order Alerts",
                        description: "Get notified whenever a new order is recorded.",
                        },
                        {
                        key: "customerRegistrationAlerts" as const,
                        title: "Customer Registrations",
                        description: "Receive alerts when a new customer registers.",
                        },
                        {
                        key: "lowStockAlerts" as const,
                        title: "Low Stock Alerts",
                        description: "Get notified when product inventory is running low.",
                        },
                        {
                        key: "weeklyReports" as const,
                        title: "Weekly Performance Reports",
                        description: "Receive a weekly summary of business performance.",
                        },
                    ].map((item, index, items) => (
                        <div
                        key={item.key}
                        className={`flex items-center justify-between gap-5 ${
                            index !== items.length - 1
                            ? "border-b border-border pb-6"
                            : ""
                        }`}
                        >
                        <div>
                            <h3 className="text-sm font-semibold text-foreground">
                            {item.title}
                            </h3>

                            <p className="mt-1 text-sm text-muted">
                            {item.description}
                            </p>
                        </div>

                        <button
                            type="button"
                            role="switch"
                            aria-checked={notifications[item.key]}
                            aria-label={item.title}
                            disabled={!notificationsLoaded}
                            onClick={() => {
                            setNotifications((current) => ({
                                ...current,
                                [item.key]: !current[item.key],
                            }));

                            setNotificationMessage("");
                            }}
                            className={`relative h-6 w-11 shrink-0 rounded-full transition-colors ${
                            notifications[item.key]
                                ? "bg-primary"
                                : "bg-border"
                            }`}
                        >
                            <span
                                className={`absolute left-1 top-1 h-4 w-4 rounded-full bg-white transition-transform duration-200 ${
                                  notifications[item.key]
                                    ? "translate-x-5"
                                    : "translate-x-0"
                                }`}
                            />
                        </button>
                        </div>
                    ))}
                    </div>

                    {notificationMessage && (
                    <p
                        role="status"
                        className="mt-6 text-sm text-emerald-600"
                    >
                        {notificationMessage}
                    </p>
                    )}

                    <div className="mt-8 flex justify-end gap-3">
                    <button
                        type="button"
                        disabled={
                        JSON.stringify(notifications) ===
                        JSON.stringify(savedNotifications)
                        }
                        onClick={() => {
                        setNotifications(savedNotifications);
                        setNotificationMessage("");
                        }}
                        className="rounded-xl border border-border px-5 py-2.5 text-sm font-semibold text-foreground transition hover:bg-background disabled:cursor-not-allowed disabled:opacity-40"
                    >
                        Discard
                    </button>

                    <button
                        type="button"
                        disabled={
                        !notificationsLoaded ||
                        JSON.stringify(notifications) ===
                            JSON.stringify(savedNotifications)
                        }
                        onClick={handleNotificationSave}
                        className="rounded-xl bg-primary px-5 py-2.5 text-sm font-semibold text-white transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-40"
                    >
                        Save Preferences
                    </button>
                    </div>
                </section>
          )}  

          {activeSection === "regional" && (
            <section className="rounded-2xl border border-border bg-card p-6">
              <h2 className="text-lg font-bold text-foreground">
                Regional Preferences
              </h2>

              <p className="mt-1 text-sm text-muted">
                Customize your language, timezone, and date format.
              </p>

              <div className="mt-8 space-y-6">
                {/* Language */}
                <div>
                  <label
                    htmlFor="language"
                    className="mb-2 block text-sm font-semibold text-foreground"
                  >
                    Language
                  </label>

                  <p className="mb-3 text-sm text-muted">
                    Choose your preferred display language.
                  </p>

                  <select
                    id="language"
                    value={regionalPreferences.language}
                    disabled={!regionalLoaded}
                    onChange={(event) => {
                      setRegionalPreferences({
                        ...regionalPreferences,
                        language: event.target.value,
                      });
                      setRegionalMessage("");
                    }}
                    className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm text-foreground outline-none focus:border-primary sm:max-w-md"
                  >
                    <option value="en">English</option>
                    <option value="fil">Filipino</option>
                    <option value="ar">Arabic</option>
                  </select>
                </div>

                <div className="border-t border-border" />

                {/* Timezone */}
                <div>
                  <label
                    htmlFor="timezone"
                    className="mb-2 block text-sm font-semibold text-foreground"
                  >
                    Timezone
                  </label>

                  <p className="mb-3 text-sm text-muted">
                    Select the timezone used for your regional preference.
                  </p>

                  <select
                    id="timezone"
                    value={regionalPreferences.timezone}
                    disabled={!regionalLoaded}
                    onChange={(event) => {
                      setRegionalPreferences({
                        ...regionalPreferences,
                        timezone: event.target.value,
                      });
                      setRegionalMessage("");
                    }}
                    className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm text-foreground outline-none focus:border-primary sm:max-w-md"
                  >
                    <option value="Asia/Manila">Manila (UTC+08:00)</option>
                    <option value="Asia/Dubai">Dubai (UTC+04:00)</option>
                    <option value="Asia/Singapore">Singapore (UTC+08:00)</option>
                    <option value="Asia/Tokyo">Tokyo (UTC+09:00)</option>
                    <option value="Europe/London">London</option>
                    <option value="Europe/Paris">Paris</option>
                    <option value="America/New_York">New York</option>
                    <option value="America/Los_Angeles">Los Angeles</option>
                    <option value="Australia/Sydney">Sydney</option>
                  </select>
                </div>

                <div className="border-t border-border" />

                {/* Date format */}
                <div>
                  <label
                    htmlFor="dateFormat"
                    className="mb-2 block text-sm font-semibold text-foreground"
                  >
                    Date Format
                  </label>

                  <p className="mb-3 text-sm text-muted">
                    Choose how dates should be displayed.
                  </p>

                  <select
                    id="dateFormat"
                    value={regionalPreferences.dateFormat}
                    disabled={!regionalLoaded}
                    onChange={(event) => {
                      setRegionalPreferences({
                        ...regionalPreferences,
                        dateFormat: event.target.value,
                      });
                      setRegionalMessage("");
                    }}
                    className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm text-foreground outline-none focus:border-primary sm:max-w-md"
                  >
                    <option value="DD/MM/YYYY">DD/MM/YYYY (21/11/2026)</option>
                    <option value="MM/DD/YYYY">MM/DD/YYYY (11/21/2026)</option>
                    <option value="YYYY-MM-DD">YYYY-MM-DD (2026-11-21)</option>
                  </select>
                </div>
              </div>

              {regionalMessage && (
                <p role="status" className="mt-6 text-sm text-emerald-600">
                  {regionalMessage}
                </p>
              )}

              <div className="mt-8 flex flex-wrap justify-end gap-3">
                <button
                  type="button"
                  disabled={
                    JSON.stringify(regionalPreferences) ===
                    JSON.stringify(savedRegionalPreferences)
                  }
                  onClick={() => {
                    setRegionalPreferences(savedRegionalPreferences);
                    setRegionalMessage("");
                  }}
                  className="rounded-xl border border-border px-5 py-2.5 text-sm font-semibold text-foreground transition hover:bg-background disabled:cursor-not-allowed disabled:opacity-40"
                >
                  Discard
                </button>

                <button
                  type="button"
                  disabled={
                    !regionalLoaded ||
                    JSON.stringify(regionalPreferences) ===
                      JSON.stringify(savedRegionalPreferences)
                  }
                  onClick={handleRegionalSave}
                  className="rounded-xl bg-primary px-5 py-2.5 text-sm font-semibold text-white transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-40"
                >
                  Save Preferences
                </button>
              </div>
            </section>
          )}


          {activeSection === "security" && (
            <section className="rounded-2xl border border-border bg-card p-6">
              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <LockKeyhole size={21} />
                </div>
                <div>
                  <h2 className="text-lg font-bold text-foreground">
                    Security
                  </h2>
                  <p className="mt-1 text-sm text-muted">
                    Manage your password and account security.
                  </p>
                </div>
              </div>

              <div className="mt-6 rounded-xl border border-border bg-background p-4">
                <div className="flex items-start gap-3">
                  <ShieldCheck size={20} className="mt-0.5 shrink-0 text-emerald-500" />
                  <div>
                    <p className="text-sm font-semibold text-foreground">
                      Password requirements
                    </p>
                    <p className="mt-1 text-sm text-muted">
                      Use at least 8 characters, including uppercase and
                      lowercase letters, a number, and a special character.
                    </p>
                  </div>
                </div>
              </div>

              <form onSubmit={handlePasswordChange} className="mt-8 space-y-6">
                {/* Current password */}
                <div>
                  <label
                    htmlFor="currentPassword"
                    className="mb-2 block text-sm font-semibold text-foreground"
                  >
                    Current Password
                  </label>
                  <div className="relative">
                    <input
                      id="currentPassword"
                      type={showCurrentPassword ? "text" : "password"}
                      value={currentPassword}
                      onChange={(event) => {
                        setCurrentPassword(event.target.value);
                        setSecurityError("");
                        setSecurityMessage("");
                      }}
                      placeholder="Enter your current password"
                      autoComplete="current-password"
                      className="w-full rounded-xl border border-border bg-background px-4 py-3 pr-12 text-sm text-foreground outline-none transition focus:border-primary"
                    />
                    <button
                      type="button"
                      onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                      aria-label={showCurrentPassword ? "Hide current password" : "Show current password"}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-muted transition hover:text-foreground"
                    >
                      {showCurrentPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                </div>

                {/* New password */}
                <div>
                  <label
                    htmlFor="newPassword"
                    className="mb-2 block text-sm font-semibold text-foreground"
                  >
                    New Password
                  </label>
                  <div className="relative">
                    <input
                      id="newPassword"
                      type={showNewPassword ? "text" : "password"}
                      value={newPassword}
                      onChange={(event) => {
                        setNewPassword(event.target.value);
                        setSecurityError("");
                        setSecurityMessage("");
                      }}
                      placeholder="Enter your new password"
                      autoComplete="new-password"
                      className="w-full rounded-xl border border-border bg-background px-4 py-3 pr-12 text-sm text-foreground outline-none transition focus:border-primary"
                    />
                    <button
                      type="button"
                      onClick={() => setShowNewPassword(!showNewPassword)}
                      aria-label={showNewPassword ? "Hide new password" : "Show new password"}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-muted transition hover:text-foreground"
                    >
                      {showNewPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>

                  <div className="mt-3 space-y-2">
                    {[
                      { label: "At least 8 characters", valid: newPassword.length >= 8 },
                      { label: "One uppercase letter", valid: /[A-Z]/.test(newPassword) },
                      { label: "One lowercase letter", valid: /[a-z]/.test(newPassword) },
                      { label: "One number", valid: /[0-9]/.test(newPassword) },
                      { label: "One special character", valid: /[^A-Za-z0-9]/.test(newPassword) },
                    ].map((requirement) => (
                      <div key={requirement.label} className="flex items-center gap-2 text-xs">
                        <CheckCircle2
                          size={14}
                          className={requirement.valid ? "text-emerald-500" : "text-muted"}
                        />
                        <span className={requirement.valid ? "text-emerald-600" : "text-muted"}>
                          {requirement.label}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Confirm password */}
                <div>
                  <label
                    htmlFor="confirmPassword"
                    className="mb-2 block text-sm font-semibold text-foreground"
                  >
                    Confirm New Password
                  </label>
                  <div className="relative">
                    <input
                      id="confirmPassword"
                      type={showConfirmPassword ? "text" : "password"}
                      value={confirmPassword}
                      onChange={(event) => {
                        setConfirmPassword(event.target.value);
                        setSecurityError("");
                        setSecurityMessage("");
                      }}
                      placeholder="Confirm your new password"
                      autoComplete="new-password"
                      className="w-full rounded-xl border border-border bg-background px-4 py-3 pr-12 text-sm text-foreground outline-none transition focus:border-primary"
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      aria-label={showConfirmPassword ? "Hide confirmation password" : "Show confirmation password"}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-muted transition hover:text-foreground"
                    >
                      {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>

                  {confirmPassword.length > 0 && (
                    <p className={`mt-2 text-xs ${
                      newPassword === confirmPassword ? "text-emerald-600" : "text-red-500"
                    }`}>
                      {newPassword === confirmPassword
                        ? "Passwords match."
                        : "Passwords do not match."}
                    </p>
                  )}
                </div>

                {securityError && (
                  <div role="alert" className="flex items-start gap-2 rounded-xl border border-red-500/20 bg-red-500/5 p-3 text-sm text-red-500">
                    <AlertCircle size={18} className="shrink-0" />
                    <p>{securityError}</p>
                  </div>
                )}

                {securityMessage && (
                  <div role="status" className="flex items-start gap-2 rounded-xl border border-amber-500/20 bg-amber-500/5 p-3 text-sm text-amber-600">
                    <AlertCircle size={18} className="shrink-0" />
                    <p>{securityMessage}</p>
                  </div>
                )}

                <div className="flex justify-end border-t border-border pt-6">
                  <button
                    type="submit"
                    className="rounded-xl bg-primary px-5 py-2.5 text-sm font-semibold text-white transition hover:opacity-90"
                  >
                    Update Password
                  </button>
                </div>
              </form>
            </section>
          )}

        </div>
      </div>
    </div>
  );
}
