## Table of Contents

- [Overview](#overview)
- [Setup](#setup)
- [Running](#running)

## Overview

This Nx monorepo contains a Node.js/Express.js backend and a React frontend, both using TypeScript.

**Key Technologies:**

- Backend: Express.js, TypeScript
- Frontend: React, TypeScript
- Monorepo: Nx
- Validation: Zod
- Testing: Jest, Supertest, Cypress

**Project Structure:**

- `apps/backend`: The Express.js backend server.
- `apps/frontend`: The React frontend application.
- `libs/*`: Shared libraries and logic for the apps.

## Setup

**Prerequisites:**

- Node.js (LTS version)
- npm or Yarn
- Optional: Nx CLI (`npm install -g nx`)

**Installation:**

1.  **Clone:**
    ```bash
    git clone https://github.com/micoh-18/test-fullstackapp
    cd test-app
    ```
2.  **Install Dependencies:**
    ```bash
    npm install
    ```

## Running

To run the applications in development mode:

- **Start the Backend Server:**
  ```bash
  nx serve backend
  ```
- **Start the Frontend Application:**
  ```bash
  nx serve frontend
  ```
