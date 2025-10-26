# HealthID Nexus - Design Guidelines

## Design Approach

**Selected System:** Material Design + Healthcare UX patterns with Web3 wallet integration
**Justification:** This critical healthcare application requires clarity, trustworthiness, and efficient data display. The information-dense nature (medical records, claims, audit logs) demands a robust design system. Material Design provides excellent patterns for data tables, forms, and hierarchical information while maintaining accessibility standards crucial for healthcare.

**Key Design Principles:**
1. **Trust & Security First:** Professional appearance with clear security indicators and encryption status badges
2. **Role-Based Clarity:** Each dashboard has distinct visual identity while maintaining system coherence
3. **Emergency-Ready:** Critical information (QR codes, blood type, allergies) uses high-contrast, instantly scannable design
4. **Mobile-First Healthcare:** Optimized for field use by emergency responders and rural clinics with varying connectivity

---

## Color Palette

**Primary Colors:**
- Medical Blue (Dark): 210 100% 35% - Main brand, headers, primary actions
- Medical Blue (Light): 210 95% 92% - Backgrounds, subtle accents (light mode)
- Trust Navy: 220 60% 20% - Dark mode primary background

**Semantic Colors:**
- Success Green: 142 76% 36% - Approved claims, verified status, access granted
- Alert Red: 0 84% 60% - Emergency badges, critical allergies, rejected claims
- Warning Amber: 38 92% 50% - Pending approvals, requires attention
- Info Cyan: 188 78% 41% - Blockchain status, audit trail markers

**Neutral Scale:**
- Background (Light): 0 0% 98%
- Background (Dark): 220 18% 12%
- Surface (Light): 0 0% 100%
- Surface (Dark): 220 16% 16%
- Text Primary: 220 20% 10% (light) / 0 0% 95% (dark)
- Text Secondary: 220 10% 46%

**Role-Specific Accent Colors:**
- Patient Dashboard: 210 100% 35% (Medical Blue)
- Doctor Dashboard: 142 76% 36% (Clinical Green)
- Hospital: 266 60% 50% (Professional Purple)
- Emergency Responder: 0 84% 60% (Urgent Red)
- Insurance: 188 78% 41% (Trust Cyan)
- Admin: 38 92% 50% (Authority Amber)

---

## Typography

**Font Families:**
- Primary: 'Inter' (Google Fonts) - Clean, highly legible for medical data
- Monospace: 'Roboto Mono' (Google Fonts) - For UIDs, wallet addresses, CIDs, hashes

**Type Scale:**
- Display (Role Dashboard Headers): 36px / 600 weight / -0.02em tracking
- H1 (Section Headers): 28px / 700 weight / -0.01em tracking
- H2 (Card Titles): 20px / 600 weight / normal tracking
- H3 (Subsections): 16px / 600 weight / normal tracking
- Body Large (Critical Info): 16px / 500 weight / normal tracking
- Body (Standard Text): 14px / 400 weight / normal tracking
- Caption (Metadata, Timestamps): 12px / 400 weight / 0.01em tracking
- Monospace (Technical): 13px / 400 weight / 0.02em tracking

---

## Layout System

**Spacing Primitives:** Tailwind units of 4, 8, 12, 16, 24, 32
- Component padding: p-4 to p-8
- Section spacing: py-12 to py-24
- Card gaps: gap-4 to gap-8
- Grid gutters: gap-6

**Container Strategy:**
- Dashboard max-width: max-w-7xl
- Form containers: max-w-2xl
- Emergency QR display: max-w-md centered
- Data tables: w-full with horizontal scroll on mobile

**Grid Patterns:**
- Patient Records: 1 column mobile / 2 columns tablet / 3 columns desktop (grid-cols-1 md:grid-cols-2 lg:grid-cols-3)
- Claim Cards: 1 column mobile / 2 columns desktop
- Audit Log: Full-width table
- Dashboard Widgets: 1-2-4 column responsive grid

---

## Component Library

### Navigation
- **Top App Bar:** Fixed header with wallet connection button (right), HealthID logo (left), role badge, notification bell
- **Side Navigation:** Collapsible drawer on mobile, persistent on desktop, icon + label format, role-specific menu items highlighted in accent color
- **Breadcrumbs:** For nested sections like Patient > Records > View

### Forms & Inputs
- **Text Fields:** Material-style outlined inputs with floating labels, encryption status icon (locked padlock) on encrypted fields
- **File Upload:** Drag-and-drop zone with IPFS upload progress indicator, file type icons
- **Date Pickers:** Calendar overlay for treatment dates
- **Signature Capture:** Canvas-based signature with EIP-712 signing indicator
- **Search:** Prominent search bar with UID/username autocomplete, barcode scanner icon button

### Data Display
- **Medical Record Cards:** White/dark surface, record type icon (left), title, date, doctor name, encrypted badge (top-right), view/download actions
- **Claim Cards:** Status badge (pending/approved/rejected), amount, hospital name, submission date, expandable details
- **Audit Log Table:** Striped rows, timestamp column (left), action type with color-coded badge, requester wallet (truncated), reason, view details button
- **Emergency Info Panel:** High-contrast red border, blood type in large text, allergies list with alert icons, critical medications

### Interactive Elements
- **QR Code Display:** Large centered QR (300x300px), download button, print button, expiry countdown if applicable
- **Access Request Card:** Requester name/role, timestamp, reason text, approve (green) / reject (red) action buttons
- **Wallet Connection:** Prominent "Connect Wallet" button (top-right), shows truncated address when connected with identicon, disconnect in dropdown
- **Role Application:** Stepper component showing KYC stages, upload sections for credentials

### Status Indicators
- **Blockchain Sync:** Small spinning icon with "Syncing..." or checkmark "Synced" in header
- **Encryption Status:** Green padlock icon for encrypted, orange for pending encryption
- **Verification Badges:** Blue checkmark for verified doctors/hospitals, red shield for emergency responders
- **Claim Status:** Color-coded pills (gray=pending, green=approved, red=rejected, amber=under review)

### Modals & Overlays
- **Access Approval Modal:** Patient photo, doctor details, requested records list, reason, approve/reject buttons
- **Emergency QR Scanner:** Full-screen camera view with corner guides, success overlay showing emergency data
- **Claim Review Modal:** Split view - left: treatment records, right: invoice details, signature verification status

---

## Dashboard-Specific Features

### Patient Dashboard
- **Hero Section:** Large profile card with photo, UID (monospace), QR code thumbnail, wallet address, verification status
- **Quick Actions:** 4-column grid - Upload Records, Generate QR, Manage Access, View Claims
- **Recent Activity Feed:** Timeline-style audit log preview
- **Insurance Status Card:** Policy details, coverage limits, active claims count

### Doctor Dashboard
- **Patient Search Bar:** Prominent at top with recent searches below
- **Active Access Requests:** Count badge, list of pending approvals with patient thumbnails
- **Treatment Log Interface:** Rich text editor with prescription template, signature button, IPFS upload status

### Hospital Dashboard
- **Department Overview:** Multi-column stats - active patients, pending claims, revenue
- **Invoice Generator:** Form with line items, auto-calculation, hospital signature capture
- **Claim Submission Queue:** Draggable priority list

### Emergency Responder App
- **Scanner Landing:** Large "Scan QR Code" button, recent scans history
- **Emergency Data View:** Full-screen critical info display, geo-tag incident button, stabilization checklist

### Insurance Portal
- **Claims Pipeline:** Kanban-style board (Pending / Under Review / Approved / Rejected)
- **Policy Management:** Table with search, filter by coverage type
- **Analytics Dashboard:** Charts showing claim trends, approval rates, payout amounts

### Admin Console
- **KYC Queue:** Grid of pending applications with preview cards, bulk approve option
- **Role Management Table:** Filterable list with role badges, suspend/activate toggle
- **System Health Monitor:** Real-time blockchain sync status, IPFS connectivity, active users count

---

## Images

**Hero Image:** None - This is a utility-focused healthcare application. Dashboard heroes use large profile cards and data widgets instead of decorative imagery.

**Required Images:**
- Patient profile photos (circular avatars, 80px and 200px sizes)
- Doctor/Hospital verification photos (rectangular, 120x120px for cards)
- HealthID logo (SVG, 180x50px for header)
- Role icons (doctor, hospital, responder, insurance, admin) - use Heroicons Medical collection
- Emergency badge graphics (red cross, alert symbols)
- Encryption/security icons (padlock variants, shield, key)
- Blockchain status icons (block, chain link, sync)

**Placeholder Strategy:**
- User avatars: Colored initials on gradient background (deterministic from wallet address)
- Missing records: Empty state illustrations (simple line art of medical folder)
- QR codes: Generated dynamically, no placeholders needed

---

## Accessibility & Dark Mode

- **Contrast Ratios:** WCAG AAA compliance for all medical data text (7:1 minimum)
- **Dark Mode:** Full implementation across all dashboards, form inputs use dark surface colors (220 16% 16%), text inputs have visible borders
- **Keyboard Navigation:** Tab order follows visual hierarchy, focus indicators on all interactive elements (2px blue outline)
- **Screen Reader:** Aria labels for all icons, role descriptions for dashboard sections
- **Color Blindness:** Status indicators use icons + color (not color alone)