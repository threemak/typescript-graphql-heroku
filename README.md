# TypeScript GraphQL API

This is a GraphQL API built with TypeScript that supports user authentication, image uploads, and text posting. The API is designed to be deployed on Heroku but can also run locally for development and testing.

## Features

- **User Authentication**: Secure user signup, login, and session management.
- **Post Creation**: Users can create posts with text and optional image uploads.
- **GraphQL API**: Flexible and efficient API structure using GraphQL.
- **TypeScript**: Built entirely with TypeScript for strong typing and easier debugging.
- **Heroku Deployment**: Ready for deployment on Heroku with environment variable configuration.

## Requirements

- Node.js (>= 14.x)
- Yarn or npm (package manager)
- PostgreSQL (for production, but can be swapped for SQLite or another database in development)

## Project Setup

### 1. Clone the Repository

```bash
git clone https://github.com/threemak/typescript-graphql-heroku.git
cd app
