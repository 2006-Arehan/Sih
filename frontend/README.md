# SkillPulse Maharashtra

> **"Aligning Skills with Maharashtra's Future"**
> An official-grade Labour Market Intelligence & Skill Alignment Platform prototype for the State of Maharashtra.

![SkillPulse Maharashtra Banner](https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1200&q=80)

---

## 🏛️ Project Overview

**Problem Statement:**
Challenges in aligning skill development programs and technical education curricula with fast-moving industry requirements and emerging job market demands.

**Solution:**
SkillPulse Maharashtra establishes an intelligent closed-loop labor telemetry platform that connects live employer hiring signals with MSBTE polytechnics, ITIs, engineering universities, and student career roadmaps across all 36 administrative districts.

---

## 🎨 Core Design Direction & Visual Identity

- **Government-Grade Dignity:** Built in harmony with India's digital governance aesthetics, inspired by the national tricolor:
  - **Deep Navy (`#000080` / `#071A3D`):** Primary structural frames, official headers, and core data architecture.
  - **Government Saffron (`#FF9933`):** Primary call-to-action highlights, active badges, and focus states.
  - **India Green (`#138808`):** Positive growth metrics, placement scores, and alignment health.
  - **Clean White (`#FFFFFF`) & Subtle Slate (`#F7F9FC`):** Accessible, modern card canvas.
- **Accessibility Toolbar:** Integrated text resizing (`A-`, `A`, `A+`), high-contrast viewing mode, and trilingual language switcher (`English`, `मराठी`, `हिंदी`).
- **Real Photography:** Centralized registry in `src/config/images.ts` using authentic, licensed Indian education, manufacturing, and tech workplace photography.

---

## 🚀 Key Modules & Stakeholder Portals

### 1. 🌐 Public Experience
- **Hero & Live Telemetry:** Animated counters (12,450+ Jobs, 3,240+ Skills, 36 Districts, 187 Emerging Skills).
- **Problem Statement Flow:** Visual journey illustrating the disconnect between fast industrial shifts and static 5-year syllabus cycles.
- **5-Stage Intelligence Engine:** `Industry Signals → NLP Skill Extraction → Gap Matrix → Predictive Forecast → Decisive Action`.
- **Maharashtra Spatial Map:** Interactive 36-district SVG heatmap with division filters and district drilldown.
- **Tri-Pillar Analytics:** Skill Deficit Matrix, 12-Month Demand Forecast, and Course Health Scorecards.
- **10 Industrial Sectors:** Automotive & EV, IT/Telecom, Manufacturing, Healthcare/Biotech, BFSI, CleanTech, Logistics, Electronics, Textiles, and Tourism.

### 2. 🏛️ Government Directorate Portal (`/government/*`)
- **Executive Overview Dashboard:** High-level KPIs, monthly demand trends, and sector distributions.
- **Interactive Maharashtra Map (`/government/map`):** Full spatial heat layer by division and demand intensity.
- **District Analysis (`/government/districts`):** Searchable 36-district table with individual drilldown modals.
- **Skill Gap Matrix (`/government/skill-gap`):** Demand vs supply deficit rankings and critical gap warnings.
- **Emerging Skills Radar (`/government/emerging-skills`):** Velocity tracking for GenAI (+72%), EV (+54%), and Solar (+44%).
- **Predictive Forecasting (`/government/forecast`):** 3-Month, 6-Month, and 12-Month policy projection modeling.
- **Course Health Audit (`/government/course-health`):** 84+ polytechnic courses graded by industry alignment score.
- **Curriculum Revamp Recommendations (`/government/curriculum`):** MSBTE syllabus modernization directives.
- **District Training Planner (`/government/training-planner`):** Interactive seat capacity allocator by priority level.
- **State Reports Hub (`/government/reports`):** Downloadable policy dossiers and whitepapers.

### 3. 🎓 Training Institute Portal (`/institute/*`)
- **Curriculum Analyzer Tool (`/institute/curriculum`):** Interactive syllabus auditor comparing course topics against employer needs with instant diff generation.
- **My Courses Catalog (`/institute/courses`):** Institutional course health and enrollment capacity.
- **Industry Alignment Matrix (`/institute/alignment`):** Department-level compliance scoring.
- **Missing Skills Directory (`/institute/missing-skills`):** High-demand missing competencies alert.
- **Placement Analytics (`/institute/placement`):** Batch placement rates and starting compensation by sector.
- **Employer Feedback Logger (`/institute/feedback`):** Direct graduate shopfloor ratings.

### 4. 💼 Industry Employer Portal (`/employer/*`)
- **5-Step Job Posting Wizard (`/employer/post-job`):** Multi-step form with live validation, skill tagger, compensation, district targeting, and preview.
- **My Vacancies & Matching Talent (`/employer/jobs`):** Active job postings with matched student pool counts.
- **Required Skills Index (`/employer/skills`):** High-demand skill catalog across Maharashtra clusters.
- **Hiring Demand Trends (`/employer/hiring-demand`):** Sector recruitment velocity tracking.
- **Candidate Evaluation (`/employer/feedback`):** Technical and shopfloor performance logger.
- **State Skill Survey (`/employer/training-survey`):** Annual headcount projection feed for state policy.

### 5. 🧑‍🎓 Student & Youth Portal (`/student/*`)
- **Career Readiness Dashboard (`/student/dashboard`):** 68% readiness score benchmarked against target dream roles.
- **Verified Skill Passport (`/student/profile`):** Authenticated badges linked to MSBTE practicals.
- **Interactive Skill Assessment (`/student/assessment`):** 5-question technical evaluation quiz with instant score calculation and readiness updates.
- **Personalized Skill Gap (`/student/skill-gap`):** Detailed mastered vs missing skills comparison.
- **Milestone Career Roadmap (`/student/career-path`):** Step-by-step learning journey from fundamentals to capstones.
- **Recommended Micro-Credentials (`/student/recommendations`):** 100% state-subsidized upskilling courses.
- **High-Match Job Board (`/student/jobs`):** District-filtered vacancies with simulated 1-click application.

---

## 🛠️ Technology Stack

- **Framework:** React 19 + TypeScript + Vite
- **Styling & Theme:** Tailwind CSS with custom Indian Government palette
- **Routing:** React Router v7 (35+ fully functional routes with zero dead links)
- **Data Visualization:** Recharts (Area, Bar, Line, Radar, and Donut charts)
- **Icons:** Lucide React
- **Animations:** Framer Motion & CSS keyframes
- **State & Auth:** Mock authentication with 1-click test role switcher

---

## 💻 Running the Application Locally

```bash
# 1. Navigate to the frontend directory
cd frontend

# 2. Install dependencies
npm install

# 3. Start development server
npm run dev

# 4. Build for production
npm run build
```

---

## 📜 Prototype Notice

*SkillPulse Maharashtra is a frontend-only prototype demonstrating government-grade labour market intelligence. All figures, district demand indices, and institutional rankings are simulated mock data designed for demonstration and stakeholder evaluation.*
