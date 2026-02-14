# Smart Bookmark Application

A secure, real-time bookmark management application built with Next.js App Router, MongoDB, and JWT authentication.

Users can log in with Google, add private bookmarks, and see updates instantly across multiple tabs without page reload.

---

# Features

- Google Authentication (One Tap + Button)
- Secure JWT-based login (HTTP-only cookies)
- Private bookmarks per user
- Add / Delete bookmarks
- Real-time bookmark updates across tabs
- No page refresh required
- Clean UI with fallback avatar handling

#### Problem
- Google One Tap failed in:
  - Incognito mode
  - When users dismissed the popup
- Errors like:
  - `FedCM get() rejected`
  - `Third-party sign-in disabled`

#### Solution
- Treated One Tap as optional
- Added Google Sign-In button as fallback