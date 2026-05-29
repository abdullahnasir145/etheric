# 🪙 Etheric | Secure Crypto Mobile Wallet

Etheric is a next-generation decentralized finance application that prioritizes user sovereignty and bleeding-edge security by replacing traditional, vulnerable password storage with local cryptographic passkeys.

---

## 🚀 Key Features & Architectural Security

### 🔐 Zero-Server Cryptographic Security

Unlike legacy applications that transmit and store user credentials on central servers—vulnerable to breaches and phishing—Etheric uses **hardware-bound Passkeys (WebAuthn)**.

* **The Flow**: Registration generates a public-private key pair locally via the device's secure enclave (Biometrics/FaceID).
* **Encryption**: Your private key never leaves your physical device. The Supabase server only stores the public key to verify cryptographic challenges.
* **Result**: Zero passwords on servers means zero risk of credential leaks.

### 📱 Preview & Artifacts

* **Android Production Build**: [Download Etheric APK v1.0.0](https://www.google.com/search?q=https://github.com/your-username/etheric/releases)
* **Design Language**: Driven by native-speed, fluid interfaces optimized for high-frequency trading data.

---

## 🛠 Tech Stack

* **Framework**: [Expo](https://expo.dev/) (React Native) with File-based Routing (`expo-router`)
* **Styling**: [NativeWind](https://www.nativewind.dev/) (Tailwind CSS for React Native)
* **UI Components**: Inspired by [HeroUI](https://www.heroui.com/) concepts, adapted for fluid mobile experiences
* **Backend & Auth**: [Supabase](https://supabase.com/) (Database triggers, Row Level Security, and secure OAuth providers)

---

## ⚙️ Quick Start

### 1. Prerequisites & Environment Setup

Clone the repository and create an `.env` file in the root directory:

```bash
EXPO_PUBLIC_SUPABASE_URL=your_supabase_project_url
EXPO_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key

```

### 2. Installation

Install the native dependencies and project packages:

```bash
npm install

```

### 3. Development Execution

Launch the Expo development server to test on your device or an emulator:

```bash
npx expo start

```

* Press `a` for Android Emulator.
* Press `i` for iOS Simulator.
* Scan the QR code using the **Expo Go** app or a development build to run on physical hardware.
