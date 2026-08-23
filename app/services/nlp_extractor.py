import re
from typing import List, Dict, Tuple

# Comprehensive multilingual dictionary mapping English, Marathi, Hindi terms to canonical skills
SKILL_TAXONOMY_MAP: Dict[str, Tuple[str, str]] = {
    # Software & IT
    "python": ("Python Programming", "Software"),
    "पाईथन": ("Python Programming", "Software"),
    "पायथन": ("Python Programming", "Software"),
    "java": ("Java Development", "Software"),
    "जावा": ("Java Development", "Software"),
    "web development": ("Web Development", "Software"),
    "वेब डेव्हलपमेंट": ("Web Development", "Software"),
    "वेब विकास": ("Web Development", "Software"),
    "data science": ("Data Science", "Software"),
    "डेटा सायन्स": ("Data Science", "Software"),
    "डेटा विज्ञान": ("Data Science", "Software"),
    "machine learning": ("Machine Learning", "Software"),
    "मशीन लर्निंग": ("Machine Learning", "Software"),
    "sql": ("SQL & Database Management", "Software"),
    "एसक्यूएल": ("SQL & Database Management", "Software"),
    "डेटाबेस": ("SQL & Database Management", "Software"),
    "cloud computing": ("Cloud Computing", "Software"),
    "क्लाउड कम्प्युटिंग": ("Cloud Computing", "Software"),
    "cybersecurity": ("Cyber Security", "Software"),
    "सायबर सुरक्षा": ("Cyber Security", "Software"),

    # Manufacturing & Mechanical
    "cnc machine": ("CNC Machine Operation", "Manufacturing"),
    "सीएनसी मशीन": ("CNC Machine Operation", "Manufacturing"),
    "सीएनसी मशीन ऑपरेटिंग": ("CNC Machine Operation", "Manufacturing"),
    "autocad": ("AutoCAD & CAD/CAM Design", "Manufacturing"),
    "ऑटोकॅड": ("AutoCAD & CAD/CAM Design", "Manufacturing"),
    "welding": ("Arc & TIG Welding", "Manufacturing"),
    "वेल्डिंग": ("Arc & TIG Welding", "Manufacturing"),
    "lathe operation": ("Lathe Operation", "Manufacturing"),
    "लेथ मशीन": ("Lathe Operation", "Manufacturing"),
    "quality control": ("Quality Control & Inspection", "Manufacturing"),
    "क्वालिटी कंट्रोल": ("Quality Control & Inspection", "Manufacturing"),
    "गुणवत्ता नियंत्रण": ("Quality Control & Inspection", "Manufacturing"),

    # Electronics & Electrical
    "embedded systems": ("Embedded Systems", "Electronics"),
    "एम्बेडेड सिस्टम्स": ("Embedded Systems", "Electronics"),
    "plc scada": ("PLC & SCADA Automation", "Electronics"),
    "पीएलसी": ("PLC & SCADA Automation", "Electronics"),
    "circuit design": ("PCB & Circuit Design", "Electronics"),
    "सर्किट डिझाइन": ("PCB & Circuit Design", "Electronics"),
    "electric vehicle": ("EV Maintenance & Battery Tech", "Automotive"),
    "इलेक्ट्रिक वाहन": ("EV Maintenance & Battery Tech", "Automotive"),
    "ईव्ही तंत्रज्ञान": ("EV Maintenance & Battery Tech", "Automotive"),

    # Agriculture & Processing
    "drip irrigation": ("Micro & Drip Irrigation Tech", "Agriculture"),
    "ठिबक सिंचन": ("Micro & Drip Irrigation Tech", "Agriculture"),
    "food processing": ("Food Processing & Quality", "Agriculture"),
    "अन्न प्रक्रिया": ("Food Processing & Quality", "Agriculture"),
    "खाद्य प्रसंस्करण": ("Food Processing & Quality", "Agriculture"),

    # Healthcare & Logistics
    "patient care": ("Nursing & Patient Care", "Healthcare"),
    "रुग्ण सेवा": ("Nursing & Patient Care", "Healthcare"),
    "मरीज़ देखभाल": ("Nursing & Patient Care", "Healthcare"),
    "supply chain": ("Logistics & Supply Chain", "Logistics"),
    "सप्लाय चेन": ("Logistics & Supply Chain", "Logistics"),
    "लॉजिस्टिक्स": ("Logistics & Supply Chain", "Logistics"),

    # --- Expanded Emerging & Digital Skills (EN / MR / HI) ---
    "react": ("React", "Software"),
    "रिअॅक्ट": ("React", "Software"),
    "रिएक्ट": ("React", "Software"),
    "power bi": ("Power BI", "Software"),
    "पॉवर बीआय": ("Power BI", "Software"),
    "पावर बीआई": ("Power BI", "Software"),
    "data analytics": ("Data Analytics", "Software"),
    "डेटा अॅनालिटिक्स": ("Data Analytics", "Software"),
    "डेटा एनालिटिक्स": ("Data Analytics", "Software"),
    "digital marketing": ("Digital Marketing", "Business"),
    "डिजिटल मार्केटिंग": ("Digital Marketing", "Business"),
    "gst accounting": ("GST Accounting", "Business"),
    "gst": ("GST Accounting", "Business"),
    "जीएसटी": ("GST Accounting", "Business"),

    # --- Green Energy & Emerging Tech ---
    "drone": ("Drone Operation", "Emerging Tech"),
    "drone operation": ("Drone Operation", "Emerging Tech"),
    "ड्रोन": ("Drone Operation", "Emerging Tech"),
    "solar panel": ("Solar Panel Installation", "Green Energy"),
    "solar installation": ("Solar Panel Installation", "Green Energy"),
    "सौर पॅनेल": ("Solar Panel Installation", "Green Energy"),
    "सोलर पैनल": ("Solar Panel Installation", "Green Energy"),
    "solar technician": ("Solar Technician", "Green Energy"),
    "सौर तंत्रज्ञ": ("Solar Technician", "Green Energy"),
    "iot": ("IoT Sensors", "Electronics"),
    "iot sensors": ("IoT Sensors", "Electronics"),
    "internet of things": ("IoT Sensors", "Electronics"),
    "आयओटी": ("IoT Sensors", "Electronics"),
    "3d printing": ("3D Printing", "Manufacturing"),
    "additive manufacturing": ("3D Printing", "Manufacturing"),
    "थ्रीडी प्रिंटिंग": ("3D Printing", "Manufacturing"),

    # --- Advanced Manufacturing & Automation ---
    "mechatronics": ("Mechatronics", "Manufacturing"),
    "मेकाट्रॉनिक्स": ("Mechatronics", "Manufacturing"),
    "industrial automation": ("Industrial Automation", "Electronics"),
    "औद्योगिक ऑटोमेशन": ("Industrial Automation", "Electronics"),
    "cnc programming": ("CNC Programming", "Manufacturing"),
    "सीएनसी प्रोग्रामिंग": ("CNC Programming", "Manufacturing"),

    # --- Trades & Services ---
    "warehouse management": ("Warehouse Management", "Logistics"),
    "गोदाम व्यवस्थापन": ("Warehouse Management", "Logistics"),
    "वेअरहाऊस": ("Warehouse Management", "Logistics"),
    "plumbing": ("Plumbing", "Construction"),
    "plumber": ("Plumbing", "Construction"),
    "प्लंबिंग": ("Plumbing", "Construction"),
    "नळ जोडणी": ("Plumbing", "Construction"),
}

class MultilingualNLPExtractor:
    @staticmethod
    def detect_language(text: str) -> str:
        # Check for Devanagari Unicode script range (U+0900 to U+097F)
        devanagari_chars = len(re.findall(r'[\u0900-\u097F]', text))
        if devanagari_chars > 5:
            # Check for Marathi specific markers
            marathi_words = ["आहे", "करणे", "पाहिजे", "असावे", "कामाचा", "अनुभव", "शिक्षण", "पगार", "उमेदवार"]
            if any(word in text for word in marathi_words):
                return "MR"
            return "HI"
        return "EN"

    @classmethod
    def extract_skills(cls, text: str) -> Tuple[List[str], str, float]:
        detected_lang = cls.detect_language(text)
        text_lower = text.lower()
        extracted: List[str] = []

        for keyword, (canonical_skill, sector) in SKILL_TAXONOMY_MAP.items():
            if keyword in text_lower:
                if canonical_skill not in extracted:
                    extracted.append(canonical_skill)

        # Calculate confidence score based on matches found
        confidence = min(0.95, 0.5 + (len(extracted) * 0.15)) if extracted else 0.3
        return extracted, detected_lang, confidence
