# FMB Admin Web App - Development Todo List

## Project Setup and Infrastructure

- [x] **Environment Configuration**
  - [x] Set up environment variables for API base URLs
  - [x] Configure development, test, and production environments
  - [x] Add API configuration service

- [x] **Authentication System**
  - [x] Implement admin login/logout functionality
  - [x] Add authentication middleware
  - [x] Set up session management
  - [x] Add route guards for protected routes

- [x] **Core Infrastructure**
  - [x] Set up API service layer with axios
  - [x] Configure Pinia stores for state management
  - [x] Set up router with proper navigation
  - [x] Add error handling and loading states
  - [x] Implement toast notifications for user feedback

## Member Management Module

- [ ] **Member List Screen**
  - [ ] Create member list component with search/filter
  - [ ] Implement pagination for large member lists
  - [ ] Add delete member functionality with confirmation
  - [ ] Add mark inactive functionality
  - [ ] Display member roles and household information
  - [ ] Add export functionality for member data

- [ ] **Create Member Screen**
  - [ ] Build member creation form with validation
  - [ ] Implement ITS ID uniqueness check
  - [ ] Add input sanitization for security
  - [ ] Include role and title selection
  - [ ] Add household assignment option

- [ ] **Edit Member Screen**
  - [ ] Create member edit form
  - [ ] Pre-populate form with existing data
  - [ ] Implement update functionality
  - [ ] Add validation for all fields
  - [ ] Handle household reassignment

- [ ] **API Integration for Members**
  - [ ] Implement GET /v1/admin/mumineen endpoint
  - [ ] Create POST endpoint for member creation
  - [ ] Create PUT endpoint for member updates
  - [ ] Create DELETE endpoint for member deletion
  - [ ] Add validation for household head and zone admin restrictions

## Household Management Module

- [ ] **Household List Screen**
  - [ ] Create household list with search functionality
  - [ ] Display household members and head of household
  - [ ] Show zone information
  - [ ] Add household status indicators
  - [ ] Implement pagination

- [ ] **Household View Screen**
  - [ ] Display detailed household information
  - [ ] Show all household members with relationships
  - [ ] Display thaali preferences for each day
  - [ ] Show thaali history
  - [ ] Add edit button to navigate to edit screen

- [ ] **Create Household Screen**
  - [ ] Build household creation form
  - [ ] Implement head of household assignment
  - [ ] Add thaali preference selection for each day
  - [ ] Include address and contact information
  - [ ] Add member assignment during creation

- [ ] **Edit Household Screen**
  - [ ] Create comprehensive household edit form
  - [ ] Implement address and contact info editing
  - [ ] Add primary contact reassignment
  - [ ] Implement head of household reassignment
  - [ ] Add member management (add/remove from household)
  - [ ] Include thaali preference editing
  - [ ] Add zone assignment functionality

- [ ] **API Integration for Households**
  - [ ] Implement GET /v2/admin/households endpoint
  - [ ] Create POST endpoint for household creation
  - [ ] Create PUT endpoint for household updates
  - [ ] Add member assignment/removal endpoints
  - [ ] Implement thaali preference update endpoint

## Zone Management Module

- [ ] **Zone List Screen**
  - [ ] Display all zones with admin information
  - [ ] Show household count per zone
  - [ ] Add zone admin information
  - [ ] Implement zone filtering

- [ ] **Zone View Screen**
  - [ ] Display zone details and admin
  - [ ] Show list of households in zone
  - [ ] Add functionality to add households to zone
  - [ ] Implement zone admin editing
  - [ ] Show thaali numbers for households

- [ ] **Create Zone Screen**
  - [ ] Build zone creation form
  - [ ] Include zone name and admin assignment
  - [ ] Add validation for required fields
  - [ ] Implement zone admin selection

- [ ] **API Integration for Zones**
  - [ ] Create GET endpoint for zone list
  - [ ] Create POST endpoint for zone creation
  - [ ] Create PUT endpoint for zone updates
  - [ ] Add household zone assignment endpoint

## Vendor Management Module

- [ ] **Vendor List Screen**
  - [ ] Display all vendors with contact information
  - [ ] Show menu item count per vendor
  - [ ] Add vendor status indicators
  - [ ] Implement search and filtering

- [ ] **Create Vendor Screen**
  - [ ] Build vendor creation form
  - [ ] Include name and contact information
  - [ ] Add validation for required fields
  - [ ] Implement contact info validation

- [ ] **Vendor View Screen**
  - [ ] Display vendor details and contact info
  - [ ] Show list of menu items by vendor
  - [ ] Add edit functionality
  - [ ] Include menu item management

- [ ] **Menu Item List Screen**
  - [ ] Display all menu items with vendor information
  - [ ] Show ingredients and allergen information
  - [ ] Add search and filtering
  - [ ] Implement pagination

- [ ] **Create Menu Item Screen**
  - [ ] Build menu item creation form
  - [ ] Include vendor selection
  - [ ] Add name, notes, ingredients, allergen fields
  - [ ] Implement duplicate name/vendor validation
  - [ ] Add form validation

- [ ] **Edit Menu Item Screen**
  - [ ] Create menu item edit form
  - [ ] Pre-populate with existing data
  - [ ] Implement update functionality
  - [ ] Add validation

- [ ] **API Integration for Vendors**
  - [ ] Implement existing vendor endpoints
  - [ ] Create menu item CRUD endpoints
  - [ ] Add duplicate validation logic
  - [ ] Implement vendor-menu item relationships

## Menu Management Module

- [ ] **Weekly Menu List Screen**
  - [ ] Display current and future weekly menus
  - [ ] Show menu dates and cutoff times
  - [ ] Add menu status indicators
  - [ ] Implement date-based filtering

- [ ] **Create Weekly Menu Screen**
  - [ ] Build complex weekly menu creation form
  - [ ] Implement 6-day menu structure (Mon-Sun, excluding Fri)
  - [ ] Add cutoff date and time selection
  - [ ] Include fill date management
  - [ ] Add menu item selection for each day
  - [ ] Implement "No Thaali" option
  - [ ] Add Friday filling day option with confirmation
  - [ ] Include visual indicators for merged fill dates

- [ ] **Edit Weekly Menu Screen**
  - [ ] Create comprehensive menu editing interface
  - [ ] Implement past date protection (cannot edit past days)
  - [ ] Add menu item management (add/edit/delete)
  - [ ] Include fill date modification
  - [ ] Add Friday filling day option
  - [ ] Implement menu movement between fill dates
  - [ ] Add validation for business rules

- [ ] **API Integration for Menus**
  - [ ] Create weekly menu CRUD endpoints
  - [ ] Implement daily menu management
  - [ ] Add menu item assignment endpoints
  - [ ] Create fill schedule management
  - [ ] Add validation for menu business rules

## Filling Management Module

- [ ] **Fill Reports List Screen**
  - [ ] Display all fill reports with dates
  - [ ] Show total thaali counts by size
  - [ ] Add regenerate button for each report
  - [ ] Implement date-based filtering
  - [ ] Add export functionality

- [ ] **Fill Report View Screen**
  - [ ] Display detailed fill report for specific date
  - [ ] Show individual thaali information
  - [ ] Implement status management (AVAILABLE, MISSING, FILLED, etc.)
  - [ ] Add status update functionality
  - [ ] Include thaali number and size information
  - [ ] Add search and filtering within report

- [ ] **Thaali Inventory Screen**
  - [ ] Display missing thaali report
  - [ ] Show household contact information
  - [ ] Add communication tools for missing thaalis
  - [ ] Implement status tracking
  - [ ] Add notes and comments functionality

- [ ] **Thaali Lookup Screen**
  - [ ] Create search by name or thaali number
  - [ ] Display household with full thaali history
  - [ ] Show historical fill reports
  - [ ] Add detailed thaali information

- [ ] **API Integration for Filling**
  - [ ] Implement existing fill report endpoints
  - [ ] Create inventory update endpoints
  - [ ] Add status management endpoints
  - [ ] Implement missing thaali notification system
  - [ ] Create thaali lookup endpoints

## Survey/Menu Rating Module

- [ ] **Menu Rating Dashboard**
  - [ ] Display all menus with ratings over time
  - [ ] Show rating statistics and trends
  - [ ] Add date range filtering
  - [ ] Implement rating analysis tools

- [ ] **Survey Configuration Screen**
  - [ ] Create questionnaire configuration interface
  - [ ] Add rating scale management
  - [ ] Implement survey question management
  - [ ] Add response tracking

- [ ] **API Integration for Ratings**
  - [ ] Create rating dashboard endpoints
  - [ ] Implement survey configuration endpoints
  - [ ] Add rating analysis endpoints

## Navigation and Layout

- [x] **Main Layout**
  - [x] Create responsive admin layout
  - [x] Implement navigation sidebar
  - [x] Add breadcrumb navigation
  - [x] Include user profile/logout area
  - [x] Add loading indicators

- [x] **Navigation Structure**
  - [x] Set up route configuration
  - [x] Implement nested routes for modules
  - [x] Add route guards for authentication
  - [x] Create navigation menu items

## State Management

- [x] **Pinia Stores**
  - [x] Create auth store for authentication
  - [ ] Implement member store for member management
  - [ ] Add household store for household data
  - [ ] Create vendor store for vendor management
  - [ ] Implement menu store for menu management
  - [ ] Add filling store for fill reports

## Error Handling and Validation

- [ ] **Global Error Handling**
  - [ ] Implement API error handling
  - [ ] Add form validation
  - [ ] Create user-friendly error messages
  - [ ] Add loading states for all operations

- [ ] **Form Validation**
  - [ ] Implement client-side validation
  - [ ] Add server-side validation feedback
  - [ ] Create validation rules for all forms
  - [ ] Add real-time validation

## Testing

- [ ] **Unit Tests**
  - [ ] Write tests for all components
  - [ ] Test all Pinia stores
  - [ ] Add API service tests
  - [ ] Test form validation

- [ ] **Integration Tests**
  - [ ] Test complete user workflows
  - [ ] Add API integration tests
  - [ ] Test authentication flows

## Documentation

- [ ] **User Documentation**
  - [ ] Create admin user guide
  - [ ] Document all features and workflows
  - [ ] Add screenshots and examples

- [ ] **Developer Documentation**
  - [ ] Document component structure
  - [ ] Add API integration documentation
  - [ ] Create deployment guide

## Deployment

- [ ] **Build Configuration**
  - [ ] Configure production build
  - [ ] Set up environment-specific builds
  - [ ] Add build optimization

- [ ] **Deployment Setup**
  - [ ] Configure deployment pipeline
  - [ ] Set up hosting environment
  - [ ] Add monitoring and logging

## Priority Order

1. **Phase 1: Core Infrastructure** (Authentication, Navigation, Basic CRUD)
2. **Phase 2: Member Management** (Most critical for admin operations)
3. **Phase 3: Household Management** (Core business logic)
4. **Phase 4: Filling Management** (Operational workflows)
5. **Phase 5: Menu Management** (Complex business logic)
6. **Phase 6: Vendor Management** (Supporting functionality)
7. **Phase 7: Zone Management** (Organizational structure)
8. **Phase 8: Survey/Rating Module** (Analytics and feedback)

## Notes

- All forms should include proper validation and sanitization
- API endpoints need to be created for missing functionality
- Consider implementing real-time updates for critical data
- Add proper error handling and user feedback throughout
- Ensure responsive design for mobile admin access
- Implement proper security measures for admin access 