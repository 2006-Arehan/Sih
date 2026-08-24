import json
from sqlalchemy.orm import Session
from app.models.models import (
    District,
    Skill,
    NSQFQualificationPack,
    JobPosting,
    Course,
    ObsolescenceAssessment,
    EmployerFeedback,
    User
)

# ---------------------------------------------------------------------------
# All 36 Maharashtra districts. active_postings_count is set proportional to
# real industrial activity (metro hubs high, tribal/rural low).
# Source: Maharashtra_District_Industry_Mapping.csv
# ---------------------------------------------------------------------------
DISTRICTS_DATA = [
    ("Mumbai", "Konkan", ["BFSI", "IT-ITeS", "Media", "Pharma"], 2150),
    ("Mumbai Suburban", "Konkan", ["IT-ITeS", "BFSI", "Media", "Entertainment"], 1680),
    ("Pune", "Western Maharashtra", ["Automotive", "IT-ITeS", "Electronics", "Defence"], 1520),
    ("Thane", "Konkan", ["Chemicals", "Pharma", "Engineering", "IT-ITeS"], 900),
    ("Nagpur", "Vidarbha", ["Logistics", "Defence", "Power", "Agro-processing"], 720),
    ("Nashik", "North Maharashtra", ["Automotive", "Defence", "Engineering", "Wine"], 620),
    ("Chhatrapati Sambhajinagar", "Marathwada", ["Automotive", "Pharma", "Electronics", "Food Processing"], 560),
    ("Palghar", "Konkan", ["Chemicals", "Plastics", "Steel", "Fishing"], 430),
    ("Raigad", "Konkan", ["Chemicals", "Petrochemicals", "Pharma", "Ports"], 410),
    ("Kolhapur", "Western Maharashtra", ["Foundry", "Auto & Engineering", "Sugar", "Textile"], 380),
    ("Ahmednagar", "Western Maharashtra", ["Food Processing", "Defence", "Electronics", "Auto Components"], 340),
    ("Solapur", "Western Maharashtra", ["Textile", "Sugar", "Cement", "Beedi"], 320),
    ("Satara", "Western Maharashtra", ["Sugar", "Dairy", "Engineering", "Auto Components"], 300),
    ("Sangli", "Western Maharashtra", ["Turmeric", "Wine", "Engineering", "Foundry"], 290),
    ("Jalgaon", "North Maharashtra", ["Agro-processing", "Textile", "Oil", "Irrigation"], 280),
    ("Chandrapur", "Vidarbha", ["Coal Mining", "Power", "Cement", "Steel"], 270),
    ("Latur", "Marathwada", ["Pulses", "Sugar", "Horticulture", "Engineering"], 250),
    ("Jalna", "Marathwada", ["Seed Industry", "Steel", "Agro-processing"], 240),
    ("Nanded", "Marathwada", ["Agro-processing", "Textile", "Tourism"], 230),
    ("Dhule", "North Maharashtra", ["Agro-processing", "Textile", "Renewable"], 220),
    ("Amravati", "Vidarbha", ["Textile", "IT-ITeS", "Agro-processing"], 210),
    ("Ratnagiri", "Konkan", ["Petrochemicals", "Alphonso", "Ports", "Fishing"], 200),
    ("Akola", "Vidarbha", ["Cotton Textile", "Agro-processing", "Oil Seeds"], 190),
    ("Wardha", "Vidarbha", ["Cotton", "Agro-processing", "Solar"], 180),
    ("Yavatmal", "Vidarbha", ["Cotton", "Soyabean", "Agro-processing", "Mining"], 170),
    ("Beed", "Marathwada", ["Agro-processing", "Sugar", "Cooperative"], 160),
    ("Parbhani", "Marathwada", ["Agro-processing", "Cotton", "Sugar"], 150),
    ("Buldhana", "Vidarbha", ["Cotton", "Soyabean", "Agro-processing"], 150),
    ("Sindhudurg", "Konkan", ["Cashew", "Coconut", "Tourism", "Ports"], 140),
    ("Dharashiv", "Marathwada", ["Agro-processing", "Sugar", "Horticulture"], 130),
    ("Bhandara", "Vidarbha", ["Rice Milling", "Ordnance", "Paper"], 120),
    ("Gondia", "Vidarbha", ["Rice Milling", "Forest Produce", "Power"], 120),
    ("Washim", "Vidarbha", ["Cotton", "Agro-processing", "Soybean"], 110),
    ("Hingoli", "Marathwada", ["Agro-processing", "Sugar"], 100),
    ("Nandurbar", "North Maharashtra", ["Cotton", "Agro-processing", "Tribal Produce"], 100),
    ("Gadchiroli", "Vidarbha", ["Mining", "Forest Produce"], 100),
]

# ---------------------------------------------------------------------------
# 36 canonical skills spanning legacy trades and emerging technologies, each
# with English / Marathi / Hindi aliases used by the multilingual extractor.
# ---------------------------------------------------------------------------
SKILLS_DATA = [
    ("Python Programming", "Software", ["python", "पाईथन", "पायथन"], "Growing"),
    ("Web Development", "Software", ["web dev", "वेब डेव्हलपमेंट", "वेब विकास"], "Growing"),
    ("React", "Software", ["react", "रिअॅक्ट", "रिएक्ट"], "Growing"),
    ("Data Science", "Software", ["data science", "डेटा सायन्स", "डेटा विज्ञान"], "Growing"),
    ("Data Analytics", "Software", ["data analytics", "डेटा अॅनालिटिक्स"], "Growing"),
    ("Machine Learning", "Software", ["machine learning", "मशीन लर्निंग"], "Growing"),
    ("Power BI", "Software", ["power bi", "पॉवर बीआय"], "Growing"),
    ("SQL & Database Management", "Software", ["sql", "एसक्यूएल", "डेटाबेस"], "Stable"),
    ("Cloud Computing", "Software", ["cloud computing", "क्लाउड कम्प्युटिंग"], "Growing"),
    ("Cyber Security", "Software", ["cybersecurity", "सायबर सुरक्षा"], "Growing"),
    ("Digital Marketing", "Business", ["digital marketing", "डिजिटल मार्केटिंग"], "Growing"),
    ("GST Accounting", "Business", ["gst", "जीएसटी"], "Stable"),
    ("CNC Machine Operation", "Manufacturing", ["cnc machine", "सीएनसी मशीन"], "Stable"),
    ("CNC Programming", "Manufacturing", ["cnc programming", "सीएनसी प्रोग्रामिंग"], "Growing"),
    ("AutoCAD & CAD/CAM Design", "Manufacturing", ["autocad", "ऑटोकॅड"], "Stable"),
    ("Arc & TIG Welding", "Manufacturing", ["welding", "वेल्डिंग"], "Stable"),
    ("Lathe Operation", "Manufacturing", ["lathe operation", "लेथ मशीन"], "Declining"),
    ("Quality Control & Inspection", "Manufacturing", ["quality control", "गुणवत्ता नियंत्रण"], "Stable"),
    ("3D Printing", "Manufacturing", ["3d printing", "थ्रीडी प्रिंटिंग"], "Growing"),
    ("Mechatronics", "Manufacturing", ["mechatronics", "मेकाट्रॉनिक्स"], "Growing"),
    ("Industrial Automation", "Electronics", ["industrial automation", "औद्योगिक ऑटोमेशन"], "Growing"),
    ("PLC & SCADA Automation", "Electronics", ["plc scada", "पीएलसी"], "Growing"),
    ("Embedded Systems", "Electronics", ["embedded systems", "एम्बेडेड सिस्टम्स"], "Growing"),
    ("PCB & Circuit Design", "Electronics", ["circuit design", "सर्किट डिझाइन"], "Stable"),
    ("IoT Sensors", "Electronics", ["iot", "आयओटी"], "Growing"),
    ("EV Maintenance & Battery Tech", "Automotive", ["electric vehicle", "इलेक्ट्रिक वाहन", "ईव्ही तंत्रज्ञान"], "Growing"),
    ("Solar Panel Installation", "Green Energy", ["solar panel", "सौर पॅनेल", "सोलर पैनल"], "Growing"),
    ("Solar Technician", "Green Energy", ["solar technician", "सौर तंत्रज्ञ"], "Growing"),
    ("Drone Operation", "Emerging Tech", ["drone", "ड्रोन"], "Growing"),
    ("Micro & Drip Irrigation Tech", "Agriculture", ["drip irrigation", "ठिबक सिंचन"], "Stable"),
    ("Food Processing & Quality", "Agriculture", ["food processing", "अन्न प्रक्रिया", "खाद्य प्रसंस्करण"], "Stable"),
    ("Nursing & Patient Care", "Healthcare", ["patient care", "रुग्ण सेवा", "मरीज़ देखभाल"], "Growing"),
    ("Warehouse Management", "Logistics", ["warehouse management", "वेअरहाऊस"], "Growing"),
    ("Logistics & Supply Chain", "Logistics", ["supply chain", "सप्लाय चेन", "लॉजिस्टिक्स"], "Growing"),
    ("Plumbing", "Construction", ["plumbing", "प्लंबिंग", "नळ जोडणी"], "Stable"),
    ("Manual Drafting", "Manufacturing", ["manual drafting", "हस्त रेखांकन"], "Declining"),
]

# PLACEHOLDER_QPS
# ---------------------------------------------------------------------------
# 12 NSQF Qualification Packs across major Maharashtra sectors.
# ---------------------------------------------------------------------------
QPS_DATA = [
    ("SSC/Q0501", "Software Developer", "IT-ITeS", 5,
     ["Python Programming", "Web Development", "SQL & Database Management", "React"],
     ["NOS/N0501", "NOS/N0502"]),
    ("SSC/Q0503", "Data Analytics Associate", "IT-ITeS", 5,
     ["Data Analytics", "Power BI", "SQL & Database Management", "Data Science"],
     ["NOS/N0511", "NOS/N0512"]),
    ("CSC/Q0115", "CNC Operator Turning", "Capital Goods", 4,
     ["CNC Machine Operation", "CNC Programming", "AutoCAD & CAD/CAM Design", "Quality Control & Inspection"],
     ["NOS/N0115", "NOS/N0116"]),
    ("CSC/Q0204", "Manufacturing Automation Technician", "Capital Goods", 5,
     ["Industrial Automation", "PLC & SCADA Automation", "Mechatronics", "Quality Control & Inspection"],
     ["NOS/N0204", "NOS/N0205"]),
    ("ASC/Q1402", "EV Service Technician", "Automotive", 5,
     ["EV Maintenance & Battery Tech", "PCB & Circuit Design", "Embedded Systems", "Quality Control & Inspection"],
     ["NOS/N1402", "NOS/N1403"]),
    ("ELE/Q1401", "Embedded & IoT Systems Engineer", "Electronics", 6,
     ["Embedded Systems", "IoT Sensors", "PCB & Circuit Design", "Python Programming"],
     ["NOS/N1401", "NOS/N1405"]),
    ("AGR/Q1002", "Micro Irrigation Technician", "Agriculture", 4,
     ["Micro & Drip Irrigation Tech", "Food Processing & Quality"],
     ["NOS/N1002"]),
    ("HSS/Q5101", "General Duty Assistant (Healthcare)", "Healthcare", 4,
     ["Nursing & Patient Care", "Quality Control & Inspection"],
     ["NOS/N5101", "NOS/N5102"]),
    ("LSC/Q2101", "Warehouse Operations Associate", "Logistics", 4,
     ["Warehouse Management", "Logistics & Supply Chain"],
     ["NOS/N2101", "NOS/N2102"]),
    ("RAS/Q0104", "Retail & Digital Sales Associate", "Retail", 4,
     ["Digital Marketing", "GST Accounting"],
     ["NOS/N0104"]),
    ("SGJ/Q0101", "Solar PV Installer (Suryamitra)", "Green Jobs", 4,
     ["Solar Panel Installation", "Solar Technician", "PCB & Circuit Design"],
     ["NOS/N0101", "NOS/N0102"]),
    ("BSC/Q0801", "BFSI Accounts & Compliance Associate", "BFSI", 5,
     ["GST Accounting", "Data Analytics", "SQL & Database Management"],
     ["NOS/N0801"]),
    ("TEL/Q2201", "Drone & Aerial Survey Technician", "Telecom", 5,
     ["Drone Operation", "IoT Sensors", "Data Analytics"],
     ["NOS/N2201", "NOS/N2202"]),
    ("AMH/Q1947", "Apparel Production Operator", "Apparel", 3,
     ["Quality Control & Inspection"],
     ["NOS/N1947"]),
]

# PLACEHOLDER_COURSES
# ---------------------------------------------------------------------------
# Courses. Entries 1-5 are the original showcase courses (IDs preserved for
# tests). The rest are real ITI/vocational trades: a mix of modern trades
# (high enrolment/placement) and outdated trades (low enrolment/placement)
# to drive the obsolescence engine.
# tuple = (code, title, type, district, sector, syllabus_skills, enrolment, placement)
# ---------------------------------------------------------------------------
COURSES_DATA = [
    # --- Original showcase courses (do not reorder: tests rely on IDs 2 & 4) ---
    ("CRS-PUNE-IT-01", "Diploma in Web & Software Engineering", "Polytechnic", "Pune", "IT-ITeS",
     ["Python Programming", "Web Development", "SQL & Database Management", "Java Development"], 180, 82.5),
    ("CRS-NASH-MECH-02", "Advanced CNC & Manufacturing Tech", "ITI", "Nashik", "Capital Goods",
     ["CNC Machine Operation", "AutoCAD & CAD/CAM Design", "Quality Control & Inspection"], 120, 78.0),
    ("CRS-PUNE-AUTO-03", "Certificate in Electric Vehicle Diagnostics", "Vocational", "Pune", "Automotive",
     ["EV Maintenance & Battery Tech", "Embedded Systems", "PCB & Circuit Design"], 95, 89.0),
    ("CRS-SAMBH-MECH-04", "Legacy Manual Drafting & Workshop Fitting", "ITI", "Chhatrapati Sambhajinagar", "Capital Goods",
     ["Manual Fitting", "Basic Blueprint Drawing", "Lathe Operation"], 35, 42.0),
    ("CRS-NAGP-ELEC-05", "Basic Conventional Electrical Repair", "ITI", "Nagpur", "Electronics",
     ["Conventional Rewinding", "Analogue Meters Repair"], 40, 48.0),

    # --- Modern ITI trades (high enrolment 80-200, placement 65-90%) ---
    ("ITI-PUNE-COPA-06", "Computer Operator & Programming Assistant (COPA)", "ITI", "Pune", "IT-ITeS",
     ["Python Programming", "Web Development", "SQL & Database Management"], 160, 78.0),
    ("ITI-MUM-COPA-07", "COPA with Data Analytics", "ITI", "Mumbai", "IT-ITeS",
     ["Python Programming", "Data Analytics", "SQL & Database Management"], 185, 83.0),
    ("ITI-PUNE-ELEM-08", "Electronics Mechanic", "ITI", "Pune", "Electronics",
     ["Embedded Systems", "PCB & Circuit Design", "Industrial Automation"], 120, 74.0),
    ("ITI-NASH-MMV-09", "Mechanic Motor Vehicle", "ITI", "Nashik", "Automotive",
     ["EV Maintenance & Battery Tech", "Quality Control & Inspection"], 140, 80.0),
    ("ITI-KOL-WELD-10", "Welder", "ITI", "Kolhapur", "Capital Goods",
     ["Arc & TIG Welding", "Quality Control & Inspection"], 110, 70.0),
    ("ITI-SAMBH-FIT-11", "Fitter", "ITI", "Chhatrapati Sambhajinagar", "Capital Goods",
     ["Arc & TIG Welding", "CNC Machine Operation", "Quality Control & Inspection"], 130, 68.0),
    ("ITI-NAGP-ELEC-12", "Electrician", "ITI", "Nagpur", "Electronics",
     ["PLC & SCADA Automation", "Industrial Automation", "Quality Control & Inspection"], 150, 72.0),
    ("ITI-THANE-RAC-13", "Refrigeration & Air Conditioner Technician", "ITI", "Thane", "Electronics",
     ["PCB & Circuit Design", "Quality Control & Inspection"], 90, 66.0),
    ("ITI-PUNE-TURN-14", "Turner", "ITI", "Pune", "Capital Goods",
     ["Lathe Operation", "CNC Machine Operation", "Quality Control & Inspection"], 85, 67.0),
    ("ITI-NAGP-DSL-15", "Mechanic Diesel", "ITI", "Nagpur", "Automotive",
     ["Quality Control & Inspection", "EV Maintenance & Battery Tech"], 95, 69.0),
    ("ITI-SOL-PLUMB-16", "Plumber", "ITI", "Solapur", "Construction",
     ["Plumbing"], 80, 65.0),
    ("ITI-JAL-FOOD-17", "Food Production (General)", "ITI", "Jalgaon", "Agriculture",
     ["Food Processing & Quality", "Quality Control & Inspection"], 100, 66.0),
    ("ITI-MUM-PHYSIO-18", "Physiotherapy Technician", "Vocational", "Mumbai", "Healthcare",
     ["Nursing & Patient Care"], 88, 70.0),

    # --- Outdated ITI trades (low enrolment 10-40, placement 20-45%) ---
    ("ITI-AMR-DRAUGHT-19", "Draughtsman Civil (Manual)", "ITI", "Amravati", "Construction",
     ["Manual Drafting", "Basic Blueprint Drawing"], 28, 38.0),
    ("ITI-NAGP-STENO-20", "Stenographer Secretarial Assistant (English)", "ITI", "Nagpur", "Secretarial",
     ["Shorthand Stenography", "Manual Typewriting"], 18, 30.0),
    ("ITI-SOL-DTP-21", "Desktop Publishing / Manual Composing", "ITI", "Solapur", "Media",
     ["Manual Page Composing", "Manual Drafting"], 22, 35.0),
    ("ITI-LAT-SURV-22", "Surveyor (Chain & Manual)", "ITI", "Latur", "Construction",
     ["Manual Drafting", "Chain Surveying"], 20, 40.0),
    ("ITI-KOL-FOUND-23", "Foundryman (Manual Moulding)", "ITI", "Kolhapur", "Capital Goods",
     ["Manual Moulding", "Lathe Operation"], 30, 42.0),
    ("ITI-JALNA-SHEET-24", "Blacksmith & Sheet Metal Worker", "ITI", "Jalna", "Capital Goods",
     ["Hand Forging", "Arc & TIG Welding"], 25, 44.0),
    ("ITI-SOL-DRESS-25", "Dress Making (Hand Stitch)", "ITI", "Solapur", "Apparel",
     ["Hand Stitching", "Manual Cutting"], 35, 40.0),
]

# PLACEHOLDER_JOBS
# ---------------------------------------------------------------------------
# Job postings across 12+ districts, real Maharashtra employers, mixed
# EN/MR/HI. Several deliberately demand emerging skills (Drone, IoT, Solar,
# 3D Printing, React, Power BI, Digital Marketing) that NO course teaches, so
# the skill-gap and trend engines surface visible gaps.
# tuple = (title, company, district, sector, lang, desc, skills, qp_code)
# ---------------------------------------------------------------------------
JOBS_DATA = [
    # --- Original 4 postings ---
    ("Senior Python & Web Developer", "Tech Mahindra Systems", "Pune", "IT-ITeS", "EN",
     "Looking for experienced Python developer with Web Development, SQL, and Data Science skills.",
     ["Python Programming", "Web Development", "SQL & Database Management", "Data Science"], "SSC/Q0501"),
    ("सीएनसी मशीन ऑपरेटर (CNC Operator)", "Tata Motors Suppliers Ltd", "Pune", "Capital Goods", "MR",
     "पुणे चाकण एमआयडीसी मधील कारखान्यासाठी सीएनसी मशीन ऑपरेटिंग (CNC Machine Operation) आणि ऑटोकॅड (AutoCAD) माहिती असलेल्या उमेदवारांची गरज आहे.",
     ["CNC Machine Operation", "AutoCAD & CAD/CAM Design", "Quality Control & Inspection"], "CSC/Q0115"),
    ("ईव्ही देखभाल तंत्रज्ञ (EV Technician)", "Mahindra Electric Mobility", "Nashik", "Automotive", "MR",
     "नाशिक प्लांटसाठी इलेक्ट्रिक वाहन (EV Maintenance & Battery Tech) आणि एम्बेडेड सिस्टम्स तज्ज्ञ आवश्यक आहेत.",
     ["EV Maintenance & Battery Tech", "Embedded Systems", "PCB & Circuit Design"], "ASC/Q1402"),
    ("डाटा साइंस और पायथन डेवलपर", "Infosys Innovation Hub", "Mumbai", "IT-ITeS", "HI",
     "मुंबई ऑफिस के लिए पायथन (Python Programming), डेटा विज्ञान (Data Science) और मशीन लर्निंग की आवश्यकता है।",
     ["Python Programming", "Data Science", "Machine Learning"], "SSC/Q0501"),

    # --- Emerging-skill demand (no course covers these) ---
    ("Drone Survey & Mapping Technician", "L&T Construction", "Nagpur", "Telecom", "EN",
     "MIHAN project needs a Drone Operation specialist for aerial survey with IoT Sensors and Data Analytics.",
     ["Drone Operation", "IoT Sensors", "Data Analytics"], "TEL/Q2201"),
    ("सौर पॅनेल इंस्टॉलर (Solar Installer)", "Suzlon Energy", "Wardha", "Green Energy", "MR",
     "वर्धा सौर प्रकल्पासाठी सौर पॅनेल (Solar Panel Installation) बसवणारे व सौर तंत्रज्ञ (Solar Technician) आवश्यक.",
     ["Solar Panel Installation", "Solar Technician", "PCB & Circuit Design"], "SGJ/Q0101"),
    ("IoT Systems Engineer", "Bosch India", "Pune", "Electronics", "EN",
     "Chakan plant hiring IoT Sensors and Embedded Systems engineers for smart-factory Industrial Automation.",
     ["IoT Sensors", "Embedded Systems", "Industrial Automation"], "ELE/Q1401"),
    ("3D Printing / Additive Manufacturing Technician", "Bharat Forge", "Pune", "Capital Goods", "EN",
     "Rapid-prototyping cell requires 3D Printing operators skilled in AutoCAD and CNC Programming.",
     ["3D Printing", "AutoCAD & CAD/CAM Design", "CNC Programming"], "CSC/Q0115"),
    ("Agricultural Drone Operator", "Mahindra Agri Solutions", "Ahmednagar", "Agriculture", "EN",
     "Precision-farming programme needs Drone Operation pilots with IoT Sensors and Data Analytics for crop mapping.",
     ["Drone Operation", "IoT Sensors", "Data Analytics"], "TEL/Q2201"),
    ("3D Printing Design Engineer", "Godrej & Boyce", "Mumbai", "Capital Goods", "EN",
     "Product design studio hiring 3D Printing engineers with AutoCAD and CAD/CAM design expertise.",
     ["3D Printing", "AutoCAD & CAD/CAM Design"], "CSC/Q0115"),
    ("React Frontend Developer", "Persistent Systems", "Mumbai", "IT-ITeS", "EN",
     "Building customer portals with React and Web Development; SQL knowledge preferred.",
     ["React", "Web Development", "SQL & Database Management"], "SSC/Q0501"),
    ("Power BI Data Analyst", "Kotak Mahindra Bank", "Mumbai", "BFSI", "EN",
     "BFSI analytics team needs Power BI dashboards, Data Analytics and GST Accounting knowledge.",
     ["Power BI", "Data Analytics", "GST Accounting"], "BSC/Q0801"),
    ("डिजिटल मार्केटिंग एक्झिक्युटिव्ह", "Reliance Retail", "Pune", "Retail", "MR",
     "पुणे रिटेल विभागासाठी डिजिटल मार्केटिंग (Digital Marketing) व जीएसटी (GST) माहिती असलेले उमेदवार हवेत.",
     ["Digital Marketing", "GST Accounting"], "RAS/Q0104"),

    # --- Broad district / sector coverage ---
    ("PLC & SCADA Automation Engineer", "Kirloskar Brothers", "Kolhapur", "Electronics", "EN",
     "Foundry automation line requires PLC & SCADA Automation and Industrial Automation experience.",
     ["PLC & SCADA Automation", "Industrial Automation", "Quality Control & Inspection"], "CSC/Q0204"),
    ("वेल्डर (Welder - MIG/TIG)", "Bharat Forge", "Pune", "Capital Goods", "MR",
     "फोर्जिंग शॉपसाठी आर्क व टीआयजी वेल्डिंग (welding) आणि गुणवत्ता नियंत्रण येणारे वेल्डर हवेत.",
     ["Arc & TIG Welding", "Quality Control & Inspection"], "CSC/Q0115"),
    ("Machinist / CNC Programmer", "Cummins India", "Pune", "Capital Goods", "EN",
     "CNC Programming and CNC Machine Operation roles open at Phaltan facility.",
     ["CNC Programming", "CNC Machine Operation", "Quality Control & Inspection"], "CSC/Q0115"),
    ("Embedded Systems Engineer", "Tata Elxsi", "Pune", "Electronics", "EN",
     "Automotive embedded team hiring for Embedded Systems and PCB & Circuit Design.",
     ["Embedded Systems", "PCB & Circuit Design", "Python Programming"], "ELE/Q1401"),
    ("रुग्ण सेवा सहाय्यक (Patient Care Assistant)", "Cipla Healthcare", "Mumbai", "Healthcare", "MR",
     "रुग्णालयासाठी रुग्ण सेवा (patient care) करणारे प्रशिक्षित सहाय्यक आवश्यक आहेत.",
     ["Nursing & Patient Care", "Quality Control & Inspection"], "HSS/Q5101"),
    ("Warehouse Operations Executive", "Amazon India", "Nagpur", "Logistics", "EN",
     "MIHAN fulfilment centre needs Warehouse Management and Logistics & Supply Chain associates.",
     ["Warehouse Management", "Logistics & Supply Chain"], "LSC/Q2101"),
    ("अन्न प्रक्रिया पर्यवेक्षक (Food Processing Supervisor)", "Jain Irrigation Systems", "Jalgaon", "Agriculture", "MR",
     "अन्न प्रक्रिया (food processing) व ठिबक सिंचन (drip irrigation) तंत्रज्ञान माहिती असलेले पर्यवेक्षक हवेत.",
     ["Food Processing & Quality", "Micro & Drip Irrigation Tech", "Quality Control & Inspection"], "AGR/Q1002"),
    ("Automotive Assembly Technician", "Skoda Auto Volkswagen", "Chhatrapati Sambhajinagar", "Automotive", "EN",
     "Shendra plant hiring for EV Maintenance & Battery Tech and Quality Control & Inspection.",
     ["EV Maintenance & Battery Tech", "Quality Control & Inspection"], "ASC/Q1402"),
    ("Chemical Plant Instrument Technician", "Thermax Limited", "Thane", "Electronics", "EN",
     "Plant requires PLC & SCADA Automation, PCB & Circuit Design and Industrial Automation skills.",
     ["PLC & SCADA Automation", "PCB & Circuit Design", "Industrial Automation"], "CSC/Q0204"),
    ("पायथन डेव्हलपर (Python Developer)", "Wipro Digital", "Pune", "IT-ITeS", "MR",
     "पुणे हिंजवडीसाठी पायथन (Python), वेब डेव्हलपमेंट (Web Development) व एसक्यूएल येणारे डेव्हलपर हवेत.",
     ["Python Programming", "Web Development", "SQL & Database Management"], "SSC/Q0501"),
    ("Data Analytics Associate", "Fractal Analytics", "Mumbai", "IT-ITeS", "EN",
     "Analytics practice hiring for Data Analytics, Power BI and Data Science.",
     ["Data Analytics", "Power BI", "Data Science"], "SSC/Q0503"),
    ("मेकाट्रॉनिक्स तंत्रज्ञ (Mechatronics Technician)", "Bajaj Auto", "Chhatrapati Sambhajinagar", "Capital Goods", "MR",
     "औद्योगिक ऑटोमेशन (industrial automation) व मेकाट्रॉनिक्स (mechatronics) जाणणारे तंत्रज्ञ आवश्यक.",
     ["Mechatronics", "Industrial Automation", "PLC & SCADA Automation"], "CSC/Q0204"),
    ("Solar Rooftop Technician", "Tata Power Solar", "Ahmednagar", "Green Energy", "EN",
     "Rooftop division hiring Solar Panel Installation and Solar Technician staff.",
     ["Solar Panel Installation", "Solar Technician"], "SGJ/Q0101"),
    ("नर्सिंग स्टाफ (Nursing Staff)", "Aditya Birla Memorial Hospital", "Pune", "Healthcare", "MR",
     "रुग्ण सेवा (patient care) व रुग्णालय व्यवस्थापनासाठी नर्सिंग स्टाफ हवा आहे.",
     ["Nursing & Patient Care"], "HSS/Q5101"),
    ("GST लेखापाल (GST Accountant)", "HDFC Bank", "Nagpur", "BFSI", "MR",
     "जीएसटी (GST) व लेखा विश्लेषण (Data Analytics) येणारे लेखापाल हवेत.",
     ["GST Accounting", "Data Analytics"], "BSC/Q0801"),
    ("Plumbing & Pipefitting Technician", "L&T Construction", "Solapur", "Construction", "EN",
     "Infrastructure project needs certified Plumbing technicians.",
     ["Plumbing"], None),
    ("Retail Store & Digital Sales Associate", "DMart", "Thane", "Retail", "EN",
     "Store operations with Digital Marketing and GST Accounting exposure.",
     ["Digital Marketing", "GST Accounting"], "RAS/Q0104"),
    ("Textile Quality Inspector", "Raymond Limited", "Amravati", "Apparel", "EN",
     "PM MITRA park unit needs Quality Control & Inspection staff for apparel production.",
     ["Quality Control & Inspection"], "AMH/Q1947"),
]

# PLACEHOLDER_FEEDBACK
# ---------------------------------------------------------------------------
# Employer feedback across districts / sectors / courses, ratings 2-5.
# tuple = (employer, company, sector, district, course_id, validated, missing, rating, comments)
# ---------------------------------------------------------------------------
FEEDBACK_DATA = [
    ("Kirloskar Oil Engines", "Kirloskar Group", "Capital Goods", "Pune", 2,
     ["CNC Machine Operation", "AutoCAD & CAD/CAM Design"],
     ["EV Maintenance & Battery Tech", "PLC & SCADA Automation"], 4,
     "Graduates are good in traditional CNC, but need exposure to modern automated PLC SCADA systems."),
    ("Marathwada Auto Ancillaries", "MAA Pvt Ltd", "Capital Goods", "Chhatrapati Sambhajinagar", 4,
     ["Lathe Operation"],
     ["CNC Machine Operation", "AutoCAD & CAD/CAM Design", "Quality Control & Inspection"], 2,
     "The Legacy Manual Drafting course is outdated. Everything is now CNC and CAD based."),
    ("Tech Mahindra Talent", "Tech Mahindra", "IT-ITeS", "Pune", 6,
     ["Python Programming", "SQL & Database Management"],
     ["React", "Data Analytics", "Cloud Computing"], 4,
     "COPA graduates are solid on fundamentals but need modern React and cloud skills."),
    ("Suzlon Wind & Solar", "Suzlon Energy", "Green Energy", "Wardha", None,
     [],
     ["Solar Panel Installation", "Solar Technician"], 3,
     "Strong demand for solar installers but no local ITI trade currently produces them."),
    ("Amazon Operations", "Amazon India", "Logistics", "Nagpur", None,
     ["Warehouse Management"],
     ["Logistics & Supply Chain", "Data Analytics"], 5,
     "Warehouse associates are job-ready; adding basic analytics would make them excellent."),
    ("Ozar HAL Cluster", "Hindustan Aeronautics", "Capital Goods", "Nashik", 2,
     ["CNC Machine Operation", "Quality Control & Inspection"],
     ["Mechatronics", "Industrial Automation"], 3,
     "Precision machining is good; mechatronics and automation exposure would help placements."),
]


def seed_database(db: Session):
    # Skip if already seeded
    if db.query(District).first():
        return

    # 1. Districts
    for name, region, industries, count in DISTRICTS_DATA:
        db.add(District(
            name=name,
            region=region,
            major_industries=json.dumps(industries),
            active_postings_count=count,
        ))

    # 2. Skills
    for name, cat, aliases, trend in SKILLS_DATA:
        db.add(Skill(
            canonical_name=name,
            category=cat,
            aliases_json=json.dumps(aliases),
            demand_trend=trend,
        ))

    # 3. NSQF Qualification Packs
    for qp_code, title, sector, level, skills, nos in QPS_DATA:
        db.add(NSQFQualificationPack(
            qp_code=qp_code,
            title=title,
            sector=sector,
            nsqf_level=level,
            covered_skills_json=json.dumps(skills),
            nos_units_json=json.dumps(nos),
        ))

    # 4. Courses
    for code, title, itype, district, sector, syllabus, enrol, placement in COURSES_DATA:
        db.add(Course(
            course_code=code,
            title=title,
            institution_type=itype,
            district_name=district,
            sector=sector,
            syllabus_skills_json=json.dumps(syllabus),
            enrolment_count=enrol,
            placement_rate=placement,
        ))

    # 5. Job Postings
    for title, company, district, sector, lang, desc, skills, qp in JOBS_DATA:
        db.add(JobPosting(
            title=title,
            company=company,
            district_name=district,
            sector=sector,
            language=lang,
            raw_description=desc,
            extracted_skills_json=json.dumps(skills),
            nsqf_qp_code=qp,
        ))

    # 6. Employer Feedback
    for employer, company, sector, district, course_id, validated, missing, rating, comments in FEEDBACK_DATA:
        db.add(EmployerFeedback(
            employer_name=employer,
            company=company,
            sector=sector,
            district_name=district,
            course_id=course_id,
            validated_skills_json=json.dumps(validated),
            missing_skills_json=json.dumps(missing),
            satisfaction_rating=rating,
            comments=comments,
        ))

    # 7. Demo Users for Instant Role Testing
    from app.api.v1.auth import hash_password
    demo_users = [
        ("commissioner.skill@maharashtra.gov.in", "Dr. Rajesh Deshmukh, IAS", "government", "Skill & Entrepreneurship Dept.", "Mumbai City"),
        ("principal@gppune.ac.in", "Prof. Anjali Kulkarni", "institute", "Government Polytechnic, Pune", "Pune"),
        ("vikram.joshi@tataautocomp.com", "Vikram Joshi", "employer", "Tata AutoComp Systems Ltd", "Pune"),
        ("pooja.patil2026@student.msbte.edu.in", "Pooja Patil", "student", "Government Polytechnic, Pune", "Pune")
    ]
    for email, name, role, org, dist in demo_users:
        if not db.query(User).filter(User.email.ilike(email)).first():
            db.add(User(
                email=email,
                hashed_password=hash_password("password123"),
                full_name=name,
                role=role,
                organization=org,
                district_name=dist,
                is_active=True
            ))

    db.commit()




