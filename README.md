# React

A modern React-based project utilizing the latest frontend technologies and tools for building responsive web applications.

## 🚀 Features

- **React 18** - React version with improved rendering and concurrent features
- **Vite** - Lightning-fast build tool and development server
- **Redux Toolkit** - State management with simplified Redux setup
- **TailwindCSS** - Utility-first CSS framework with extensive customization
- **React Router v6** - Declarative routing for React applications
- **Data Visualization** - Integrated D3.js and Recharts for powerful data visualization
- **Form Management** - React Hook Form for efficient form handling
- **Animation** - Framer Motion for smooth UI animations
- **Testing** - Jest and React Testing Library setup

## 📋 Prerequisites

- Node.js (v14.x or higher)
- npm or yarn

## 🛠️ Installation

1. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```
   
2. Start the development server:
   ```bash
   npm start
   # or
   yarn start
   ```
   

**=> Database schema**
Injala Database Schema
This document outlines the database schema for the Injala product analytics system, designed to track AI model usage, costs, and performance metrics across multiple products.
Overview
The database consists of 5 main collections that work together to provide comprehensive analytics and billing tracking for AI-powered products:
•	products - Product metadata and ownership
•	models - AI model specifications and pricing
•	ai_call_logs - Individual API call records
•	metrics_daily - Aggregated daily metrics for dashboards
•	billing - External service billing and cost allocation
Collections
1️⃣ products
Stores metadata for all Injala products.
Document ID: product_id (e.g., wrapportal)
Field	Type	Required	Example	Description
product_id	string	✅	"wrapportal"	Unique product identifier
name	string	✅	"WrapPortal"	Display name of the product
description	string	❌	"Wrap management system"	Product description
team_owner	string	❌	"team_alpha"	Owning team identifier
created_at	timestamp	✅	2025-07-25T00:00:00Z	Product creation timestamp
Note: Add all 6 products to this collection during setup.
2️⃣ models
Stores metadata for AI models used across products.
Document ID: model_id (e.g., gpt-4o-mini)
Field	Type	Required	Example	Description
model_id	string	✅	"gpt-4o-mini"	Unique model identifier
name	string	✅	"GPT-4o Mini"	Display name of the model
provider	string	✅	"openai"	AI provider (openai, anthropic, etc.)
cost_per_1k_tokens	number	❌	0.01	Cost per 1000 tokens in USD
created_at	timestamp	✅	2025-07-25T00:00:00Z	Model record creation timestamp
3️⃣ ai_call_logs
Records every AI API call made across all products.
Document ID: Auto-generated
Field	Type	Required	Description
product_id	string	✅	Reference to products collection
model_id	string	✅	Reference to models collection
timestamp	timestamp	✅	When the API call was made
tokens_used	number	✅	Total tokens consumed
prompt_tokens	number	❌	Tokens in the input prompt
completion_tokens	number	❌	Tokens in the response
accuracy	number	❌	Quality metric (0.0-1.0)
response_time_ms	number	✅	API response time in milliseconds
status	string	✅	Call status: "success" or "error"
error_message	string	❌	Error details if status is "error"
api_cost_usd	number	✅	Cost of this specific call in USD
4️⃣ metrics_daily
Pre-aggregated daily metrics for fast dashboard rendering.
Document ID: {productId}_{date}_{modelId} (e.g., wrapportal_2025-07-25_gpt-4o-mini)
Field	Type	Required	Description
date	string	✅	Date in YYYY-MM-DD format
product_id	string	✅	Reference to products collection
model_id	string	✅	Reference to models collection
total_ai_calls	number	✅	Number of API calls made
total_tokens	number	✅	Sum of all tokens used
avg_accuracy	number	❌	Average accuracy score
avg_response_time_ms	number	❌	Average response time
success_count	number	✅	Number of successful calls
error_count	number	✅	Number of failed calls
api_cost_usd	number	✅	Total API costs for the day
5️⃣ billing
External service billing records mapped to products.
Document ID: Auto-generated
Field	Type	Required	Description
date	string	✅	Billing date in YYYY-MM-DD format
product_id	string	✅	Reference to products collection
provider	string	✅	Service provider: "openai", "aws", or "infra"
service	string	✅	Specific service name
usage_metric	string	❌	Unit of measurement (tokens, requests, GB, etc.)
usage_amount	number	❌	Quantity of usage
cost_usd	number	✅	Cost in USD
notes	string	❌	Additional billing notes
Data Flow
1.	Product Setup: Create entries in products and models collections
2.	Real-time Logging: Each AI API call creates a record in ai_call_logs
3.	Daily Aggregation: A batch process aggregates ai_call_logs data into metrics_daily
4.	Billing Integration: External billing data is imported into the billing collection
5.	Analytics: Dashboards query metrics_daily and billing for fast performance
Indexing Recommendations
For optimal query performance, consider creating indexes on:
•	ai_call_logs: product_id, model_id, timestamp
•	metrics_daily: product_id, date, model_id
•	billing: product_id, date, provider
Usage Examples
Query daily metrics for a product
// Get WrapPortal metrics for July 2025
db.metrics_daily.find({
  product_id: "wrapportal",
  date: { $regex: "^2025-07" }
})
Calculate monthly costs by provider
// Aggregate billing costs by provider for July 2025
db.billing.aggregate([
  { $match: { date: { $regex: "^2025-07" } } },
  { $group: { 
    _id: "$provider", 
    total_cost: { $sum: "$cost_usd" }
  }}
])
Monitor API call success rates
// Get success rate for a specific product and model
db.metrics_daily.find({
  product_id: "wrapportal",
  model_id: "gpt-4o-mini"
}, {
  date: 1,
  success_count: 1,
  error_count: 1,
  total_ai_calls: 1
})
Maintenance
•	Daily Aggregation: Run aggregation jobs to populate metrics_daily
•	Data Retention: Consider archiving old ai_call_logs records after aggregation
•	Cost Sync: Regularly sync external billing data to the billing collection
•	Monitoring: Set up alerts for unusual error rates or cost spikes




 **=> Dashboard Packages**
 Injala Analytics
A modern React-based analytics dashboard for tracking AI model usage, performance metrics, and billing across Injala products.
🚀 Features
•	Real-time Analytics - Monitor AI API calls, token usage, and performance metrics
•	Interactive Dashboards - Visualize data with charts and graphs using D3 and Recharts
•	Multi-product Support - Track metrics across all Injala products
•	Cost Management - Monitor API costs and billing across different providers
•	Responsive Design - Mobile-first design with Tailwind CSS
•	Modern Stack - Built with React 18, Redux Toolkit, and Vite
🛠️ Tech Stack
Frontend Framework
•	React 18 - Modern React with concurrent features
•	Redux Toolkit - State management with RTK Query
•	React Router v6 - Client-side routing
Styling & UI
•	Tailwind CSS - Utility-first CSS framework
•	Framer Motion - Smooth animations and transitions
•	Lucide React - Modern icon library
•	Radix UI - Accessible component primitives
Data Visualization
•	Recharts - React charting library
•	D3.js - Advanced data visualization
Development Tools
•	Vite - Fast build tool and dev server
•	TypeScript Paths - Clean import paths
•	PostCSS - CSS processing with Autoprefixer
📋 Prerequisites
•	Node.js 16.x or higher
•	npm or yarn package manager
🚀 Getting Started
Installation
1.	Clone the repository:
git clone <repository-url>
cd injalaone-analytics
2.	Install dependencies:
npm install
3.	Set up environment variables:
cp .env.example .env
Edit .env with your configuration:
VITE_API_BASE_URL=your_api_endpoint
VITE_APP_TITLE=Injala Analytics
Development
Start the development server:
npm start
The application will be available at http://localhost:5173
Build for Production
Create a production build:
npm run build
Preview Production Build
Preview the production build locally:
npm run serve
📁 Project Structure
injalaone-analytics/
├── src/
│   ├── components/        # Reusable UI components
│   ├── pages/            # Page components
│   ├── store/            # Redux store and slices
│   ├── hooks/            # Custom React hooks
│   ├── utils/            # Utility functions
│   ├── services/         # API services
│   └── styles/           # Global styles
├── public/               # Static assets
├── dist/                 # Production build output
└── package.json
🎨 UI Components
The project uses a combination of custom components and libraries:
•	Radix UI - For accessible, unstyled components
•	Tailwind CSS - For styling with utility classes
•	Lucide React - For consistent iconography
•	Framer Motion - For smooth animations
Key Features
•	Responsive Design - Mobile-first approach
•	Dark/Light Mode - Theme switching capability
•	Accessibility - WCAG compliant components
•	Performance - Optimized with React 18 features
📊 Data Visualization
Charts and Graphs
•	Line Charts - Time series data for metrics
•	Bar Charts - Comparative data visualization
•	Pie Charts - Distribution and proportion data
•	Custom D3 Visualizations - Advanced interactive charts
Key Metrics Displayed
•	AI API call volumes
•	Token usage patterns
•	Response time analytics
•	Error rate monitoring
•	Cost breakdowns by product/model
🔧 Configuration
Tailwind CSS Extensions
The project includes several Tailwind plugins:
•	@tailwindcss/forms - Form styling
•	@tailwindcss/typography - Rich text styling
•	@tailwindcss/aspect-ratio - Aspect ratio utilities
•	tailwindcss-animate - Animation utilities
•	tailwindcss-elevation - Material Design shadows
•	tailwindcss-fluid-type - Responsive typography
Build Configuration
•	Vite - Fast HMR and optimized builds
•	Source Maps - Enabled for production debugging
•	PostCSS - Automated CSS processing
🧪 Testing
The project is set up with testing utilities:
•	React Testing Library - Component testing
•	Jest DOM - Extended Jest matchers
•	User Event - User interaction testing
Run tests:
npm test  # Note: Test script needs to be added
🚨 Critical Dependencies
The following dependencies are marked as rocket critical and should not be modified:
Core Dependencies
•	@dhiwise/component-tagger
•	react & react-dom
•	@reduxjs/toolkit & redux
•	react-router-dom
Development Dependencies
•	@vitejs/plugin-react
•	vite & vite-tsconfig-paths
•	tailwindcss, autoprefixer, postcss
⚠️ Warning: Modifying these dependencies may break core functionality.
🌐 Browser Support
Production
•	Modern browsers with >0.2% market share
•	Excludes dead browsers and Opera Mini
Development
•	Latest Chrome, Firefox, and Safari versions
📈 Performance Optimization
•	Code Splitting - Automatic route-based splitting
•	Tree Shaking - Eliminates unused code
•	Asset Optimization - Optimized images and fonts
•	Caching - Efficient browser caching strategies
🤝 Contributing
1.	Fork the repository
2.	Create a feature branch: git checkout -b feature/new-feature
3.	Commit changes: git commit -am 'Add new feature'
4.	Push to branch: git push origin feature/new-feature
5.	Submit a pull request
📄 License
This project is private and proprietary. All rights reserved.
🆘 Support
For support and questions:
•	Create an issue in the repository
•	Contact the development team
•	Check the project documentation
🔄 Version History
•	v0.1.0 - Initial release with core analytics features
________________________________________
Built with ❤️ by the Injala team



