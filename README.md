<<<<<<< HEAD
# CODECLIMATE1
=======
# CodeClimate Dashboard Application

A full-stack responsive frontend application built with React, TypeScript, and Tailwind CSS, featuring three distinct role-based dashboards for different user types.

## 🚀 Features

### General Features
- **Clean, Modern UI**: Built with Tailwind CSS for a professional look
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile devices
- **Role-Based Access Control**: Three distinct user roles with appropriate permissions
- **Interactive Charts**: Dynamic data visualization using Recharts
- **Interactive Maps**: Location display using React-Leaflet with OpenStreetMap
- **Mock API Integration**: Complete mock API service for development and testing

### User Roles & Dashboards

#### 1. Visitor Dashboard (`/visitor-dashboard`)
- **Read-only access** to all charts, maps, and data
- **No submission capabilities** - shows "Login to access full features" messages
- **Features**:
  - Statistics cards showing total, approved, pending, and rejected submissions
  - Pie chart showing submissions by status
  - Bar chart showing submissions by date
  - Interactive map with all location markers
  - Call-to-action to switch to a registered account

#### 2. Registered User Dashboard (`/user-dashboard`)
- **Data submission capabilities** with form validation
- **Personal submission tracking** with status updates
- **Features**:
  - Location data input form (date, time, location with map selection)
  - Personal submissions table with status badges
  - Interactive map for location selection
  - Real-time data updates after submission
  - "Submit Data for Admin Approval" workflow

#### 3. Admin Dashboard (`/admin-dashboard`)
- **Full administrative control** over all submissions
- **Approval/Rejection workflow** for pending submissions
- **Features**:
  - Comprehensive statistics overview
  - Pending requests table with approve/reject actions
  - Approved data table for reference
  - Real-time status updates and notifications
  - Complete analytics and mapping capabilities

## 🛠️ Technical Stack

- **Frontend**: React 18 with TypeScript
- **Styling**: Tailwind CSS with custom components
- **Routing**: React Router v6 with protected routes
- **Charts**: Recharts for data visualization
- **Maps**: React-Leaflet with OpenStreetMap tiles
- **State Management**: React Context API for authentication
- **Build Tool**: Vite for fast development and building
- **Mock API**: Custom service with realistic data simulation

## 📁 Project Structure

```
src/
├── components/
│   ├── auth/
│   │   └── ProtectedRoute.tsx      # Route protection component
│   ├── charts/
│   │   └── ChartCard.tsx           # Reusable chart component
│   ├── layout/
│   │   ├── Header.tsx              # Top navigation header
│   │   ├── Sidebar.tsx             # Side navigation
│   │   └── ResponsiveLayout.tsx    # Mobile-responsive layout wrapper
│   ├── maps/
│   │   └── MapCard.tsx             # Interactive map component
│   └── ui/
│       ├── Card.tsx                # Reusable card component
│       └── StatusBadge.tsx         # Status indicator component
├── contexts/
│   └── AuthContext.tsx             # Authentication state management
├── pages/
│   ├── Login.tsx                   # Login page with role selection
│   ├── VisitorDashboard.tsx        # Visitor dashboard
│   ├── UserDashboard.tsx           # User dashboard
│   └── AdminDashboard.tsx          # Admin dashboard
├── services/
│   └── mockApi.ts                  # Mock API service
├── types/
│   └── index.ts                    # TypeScript type definitions
├── App.tsx                         # Main application component
├── main.tsx                        # Application entry point
└── style.css                       # Global styles and Tailwind imports
```

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd codeclimate-app
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:5173` (or the port shown in your terminal)

### Demo Credentials

The application uses mock authentication. You can log in with any username/password combination and select your desired role:

- **Visitor**: Read-only access to view data
- **User**: Can submit location data for approval
- **Admin**: Can approve/reject submissions and view all data

## 🎨 Design Features

### Responsive Design
- **Mobile-first approach** with Tailwind CSS
- **Collapsible sidebar** on mobile devices
- **Responsive grid layouts** that adapt to screen size
- **Touch-friendly interface** for mobile users

### UI Components
- **Custom button styles** with hover effects and disabled states
- **Status badges** with color-coded indicators
- **Loading states** with spinners and skeleton screens
- **Form validation** with user-friendly error messages
- **Interactive tooltips** and hover effects

### Color Scheme
- **Primary**: Blue tones for main actions and branding
- **Secondary**: Gray tones for neutral elements
- **Status Colors**: Green (approved), Yellow (pending), Red (rejected)
- **Light background** with accent colors for clarity

## 🔧 Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint (if configured)

### Mock API

The application includes a comprehensive mock API service (`src/services/mockApi.ts`) that simulates:
- User authentication
- Data submission and retrieval
- Status updates and approvals
- Chart data generation
- Map marker data

### Adding New Features

1. **New Components**: Add to appropriate folder in `src/components/`
2. **New Pages**: Add to `src/pages/` and update routing in `App.tsx`
3. **New Types**: Add to `src/types/index.ts`
4. **API Endpoints**: Extend `src/services/mockApi.ts`

## 🌟 Key Features Implemented

✅ **Role-based authentication and routing**  
✅ **Responsive design for all devices**  
✅ **Interactive charts with Recharts**  
✅ **Interactive maps with React-Leaflet**  
✅ **Form validation and submission**  
✅ **Real-time data updates**  
✅ **Status management and notifications**  
✅ **Clean, modern UI with Tailwind CSS**  
✅ **TypeScript for type safety**  
✅ **Mock API for development**  
✅ **Protected routes and access control**  

## 🔮 Future Enhancements

- **Backend Integration**: Replace mock API with real backend
- **Real-time Updates**: WebSocket integration for live data
- **Advanced Analytics**: More chart types and data insights
- **User Management**: User registration and profile management
- **File Uploads**: Support for image/document attachments
- **Notifications**: Toast notifications and email alerts
- **Search & Filtering**: Advanced data filtering capabilities
- **Export Features**: PDF/Excel export functionality

## 📱 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.
>>>>>>> 9777363 (Initial commit)
