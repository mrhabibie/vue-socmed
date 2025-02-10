# VueJS SocMed

This guide will walk you through the setup and deployment of a VueJS SocMed app that will consume an API from [this repository](https://github.com/mrhabibie/nodejs-socmed-api).

## ⚠️ Minimum Requirements

Ensure your environment meets these requirements:

| Component | Required Version | Installation Link                              |
| --------- | ---------------- | ---------------------------------------------- |
| NodeJS    | latest           | [Installation](https://nodejs.org/en/download) |

## 📝 Setup Environment

1. Clone VueJS SocMed project from [this repository](https://github.com/mrhabibie/vue-socmed) :
   - HTTPS
     ```console
     $ git clone https://github.com/mrhabibie/vue-socmed
     ```
   - SSH
     ```console
     $ git clone git@github.com:mrhabibie/vue-socmed.git
     ```
2. Move to project directory :
   ```console
   $ cd vue-socmed
   ```
3. Install all the required project dependencies :
   ```console
   $ npm install
   ```
4. Copy `.env.example` to `.env` :
   ```console
   $ cp .env.example .env
   ```
5. Set the `VITE_API_URL` with your NodeJS Social Media API URL.

## 🚀 Running the Application

1. Make sure [Setup Environment](#-setup-environment) are done.
2. To start the application locally :
   ```console
   $ npm run dev
   ```
   The application will be available at http://localhost:5173 (the port maybe different if another service already used that port, please see at console log).

## Developer Info

Having problem with this project?
[Contact me](https://wa.me/6282143603556).
