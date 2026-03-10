# Weather App

A modern weather application built to explore **frontend architecture patterns**, **headless UI design**, and **efficient API handling**.

This project focuses on building a responsive and accessible weather interface while maintaining clean data flow and preventing unnecessary API requests.

## Project Overview

This application allows users to search for locations and view weather information such as current conditions and forecasts.

Instead of focusing only on features, this project explores several engineering considerations such as:

- managing **derived data**
- building **headless UI components**
- handling **race conditions in API requests**
- implementing **client-side caching**

The goal was to keep the system **predictable, maintainable, and efficient**, even for a relatively small application.

## Live Demo

https://weather-app-red-one-17.vercel.app

## Tech Stack

### Core

- Nuxt
- Vue
- TypeScript

### Styling

- SCSS

### Architecture

- Headless UI pattern

### Data Fetching

- Fetch API

## Features

- Search weather by location
- Accessible combobox search
- Dynamic weather display
- Debounced API requests
- Client-side caching
- Responsive UI

## Challenges & Solutions

### Managing Derived Data

Weather API responses contain a lot of nested information, while the UI also has its own state such as selected units or selected location.

Mixing UI logic directly with API data quickly becomes hard to manage.

To solve this, the data flow was separated into two layers:

- **Source of Truth (SoT)** → stores raw API responses
- **View Model** → derived data structured specifically for the UI

This prevents mutation of the original API response and makes the UI logic easier to reason about.

### Headless UI with Accessibility

The UI components were designed using a **headless architecture**, separating logic from presentation.

However, accessibility features (ARIA attributes, roles, relationships between elements) require components to share contextual information.

To handle this cleanly, a **provide/inject wrapper** (similar to React's `useContext`) was implemented so that accessibility data can flow across components without excessive prop drilling.

### Preventing Race Conditions in Combobox Search

The location combobox triggers API requests based on user input. This introduces the possibility of **race conditions**, where older responses arrive after newer ones.

Two safeguards were implemented:

- **Debounced input** to reduce excessive API requests
- **Unique request IDs** to ensure that only the latest response updates the UI

Older responses are ignored if a newer request has already been made.

### Reducing Redundant API Requests

Weather data is **periodical**, meaning it does not change very frequently.

Repeated requests for the same query would be inefficient, so a **client-side caching strategy** was implemented:

- responses are cached based on query
- cache entries have a **TTL of 1 hour**

If the same query is requested again within that period, cached data is served instead of calling the API again.

## Key Technical Decisions

### Separating Source of Truth and View Model

Raw API responses are stored as the **Source of Truth**, while UI-specific transformations happen in a **View Model layer**.

This keeps the original data immutable and allows UI logic to evolve independently.

### Headless Component Architecture

Components are designed using a **headless pattern**, allowing UI and logic to remain loosely coupled.

This makes the components more reusable and easier to customize.

### Controlled API Request Flow

API requests are controlled using:

- **debouncing**
- **request identity tracking**

This ensures that only the latest request affects the UI state.

### Client-side Cache Strategy

A simple cache with **1-hour TTL** was implemented to reduce redundant API requests while keeping data reasonably fresh.

## Future Improvements

Possible improvements for the project:

- background data refresh
- offline support
- persistent caching
- unit testing for view model logic
