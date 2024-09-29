# Introduction

This is a clone application of Meta's new-released [Threads](https://www.threads.net/).

# Environment Variables

Paste them on the `.env` file in the root folder and modify them as your preferences

```
# Prisma
DATABASE_URL="mysql://{user}:{password}@{host}:{port}/{database_name}"

# Google OAuth & Next-Auth
GOOGLE_CLIENT_ID="{GOOGLE_OAUTH_CLIENT_ID}"
GOOGLE_CLIENT_SECRET="{GOOGLE_OAUTH_CLIENT_SECRET}"
NEXTAUTH_SECRET="{random_string}"
NEXTAUTH_URL="https://localhost:3000/api/auth"

# Global Variable
NEXT_PUBLIC_SITE_URL="http://localhost:3000"
NEXT_PUBLIC_SITE_DOMAIN="localhost:3000"

# Cloudinary
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME="{CLOUDINARY_CLOUD_NAME}"
NEXT_PUBLIC_CLOUDINARY_API_KEY="{CLOUDINARY_API_KEY}"
CLOUDINARY_API_SECRET="{CLOUDINARY_API_SECRET}"
```
