/**
 * Centralized Real Photography Registry for SkillPulse Maharashtra
 * All images are high-resolution, licensed, authentic photographs reflecting the Indian workforce,
 * technical education, manufacturing, IT hubs, and diverse stakeholders.
 */

export interface ImageAsset {
  id: string;
  url: string;
  alt: string;
  category: 'hero' | 'students' | 'training' | 'industry' | 'employers' | 'government' | 'locations' | 'sectors' | 'emerging';
  caption?: string;
  aspectRatio?: string;
}

export const IMAGES = {
  // Hero & Overview
  hero: {
    main: {
      id: 'hero_main',
      url: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1200&q=80',
      alt: 'Diverse Indian engineering and technical students collaborating with industry mentors',
      category: 'hero',
      caption: 'Youth empowerment and vocational skill alignment in Maharashtra',
      aspectRatio: '16/9'
    },
    studentsLab: {
      id: 'hero_students_lab',
      url: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=1000&q=80',
      alt: 'Advanced robotics and electronics lab training for Maharashtra students',
      category: 'hero',
      caption: 'Practical hands-on training on industry-grade equipment',
      aspectRatio: '4/3'
    }
  },

  // Emerging Skills Background Visuals (Dark High-Tech Glass Cards)
  emergingSkills: {
    genAI: {
      id: 'emerging_genai',
      url: 'https://images.unsplash.com/photo-1677442136019-21780efad99a?auto=format&fit=crop&w=800&q=80',
      alt: 'Generative AI neural network and artificial intelligence brain',
      category: 'emerging'
    },
    evPowertrain: {
      id: 'emerging_ev',
      url: 'https://images.unsplash.com/photo-1593941707882-a5bba14938c7?auto=format&fit=crop&w=800&q=80',
      alt: 'Electric vehicle charging at modern high-voltage station',
      category: 'emerging'
    },
    solarGreen: {
      id: 'emerging_solar',
      url: 'https://images.unsplash.com/photo-1509391365360-2e959784a276?auto=format&fit=crop&w=800&q=80',
      alt: 'Photovoltaic solar panels and wind energy turbines at sunset',
      category: 'emerging'
    },
    cloudDevops: {
      id: 'emerging_cloud',
      url: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=800&q=80',
      alt: 'Cloud computing server racks datacenter and global network',
      category: 'emerging'
    },
    cybersecurity: {
      id: 'emerging_cyber',
      url: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=800&q=80',
      alt: 'Cybersecurity digital security lock shield and matrix data',
      category: 'emerging'
    },
    logistics: {
      id: 'emerging_logistics',
      url: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=800&q=80',
      alt: 'Automated warehouse conveyor and robotics logistics facility',
      category: 'emerging'
    },
    dataEngineering: {
      id: 'emerging_data',
      url: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80',
      alt: 'Data engineering analytics dashboard and telemetry control screen',
      category: 'emerging'
    },
    iotRobotics: {
      id: 'emerging_robotics',
      url: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&w=800&q=80',
      alt: 'Advanced industrial robotic arm in smart manufacturing plant',
      category: 'emerging'
    }
  },

  // Students & Youth
  students: {
    femaleCoder: {
      id: 'student_female_coder',
      url: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=800&q=80',
      alt: 'Young Indian woman software engineer analyzing data algorithms',
      category: 'students',
      caption: 'Women in STEM and technology workforce in Pune',
      aspectRatio: '1/1'
    },
    graduateSuccess: {
      id: 'student_graduate',
      url: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80',
      alt: 'Confident young professional skilled through government vocational program',
      category: 'students',
      caption: 'Industry-ready graduate from Maharashtra technical institute',
      aspectRatio: '1/1'
    },
    collaborativeLearning: {
      id: 'student_collab',
      url: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=800&q=80',
      alt: 'Group of Indian polytechnic students studying automotive blueprints',
      category: 'students',
      caption: 'Collaborative curriculum learning session',
      aspectRatio: '16/9'
    }
  },

  // Training & Classrooms
  training: {
    vocationalWorkshop: {
      id: 'training_workshop',
      url: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=800&q=80',
      alt: 'Modern ITI precision machining and CNC fabrication training facility in Nashik',
      category: 'training',
      caption: 'Advanced vocational tooling and precision engineering workshop',
      aspectRatio: '16/9'
    },
    computerLab: {
      id: 'training_computer_lab',
      url: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=800&q=80',
      alt: 'Indian students in modern computer laboratory attending cloud computing class',
      category: 'training',
      caption: 'Digital skill training hub in Chhatrapati Sambhajinagar',
      aspectRatio: '16/9'
    },
    weldingTechnician: {
      id: 'training_welding',
      url: 'https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?auto=format&fit=crop&w=800&q=80',
      alt: 'Certified welding technician in industrial safety gear undergoing skill assessment',
      category: 'training',
      caption: 'Certified industrial fabrication training',
      aspectRatio: '4/3'
    }
  },

  // Industry & Manufacturing
  industry: {
    autoManufacturing: {
      id: 'industry_auto',
      url: 'https://images.unsplash.com/photo-1617788138017-80ad40651399?auto=format&fit=crop&w=800&q=80',
      alt: 'Automated electric vehicle manufacturing line in Chakan industrial belt Pune',
      category: 'industry',
      caption: 'Automotive & EV manufacturing cluster in Pune-Chakan corridor',
      aspectRatio: '16/9'
    },
    pharmaLab: {
      id: 'industry_pharma',
      url: 'https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?auto=format&fit=crop&w=800&q=80',
      alt: 'Pharmaceutical research scientist conducting quality testing in Thane biotech hub',
      category: 'industry',
      caption: 'Pharmaceutical & healthcare manufacturing in MMR and Aurangabad',
      aspectRatio: '16/9'
    },
    solarRenewable: {
      id: 'industry_solar',
      url: 'https://images.unsplash.com/photo-1509391365360-2e959784a276?auto=format&fit=crop&w=800&q=80',
      alt: 'Technician installing high-efficiency solar photovoltaic panels in Marathwada',
      category: 'industry',
      caption: 'Green energy and renewable infrastructure installations',
      aspectRatio: '16/9'
    },
    smartLogistics: {
      id: 'industry_logistics',
      url: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=800&q=80',
      alt: 'Automated logistics warehouse and supply chain center near Nagpur Multi-modal hub',
      category: 'industry',
      caption: 'Logistics and supply chain hub at MIHAN Nagpur',
      aspectRatio: '16/9'
    },
    electronicsSemi: {
      id: 'industry_electronics',
      url: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=80',
      alt: 'Semiconductor PCB micro-soldering and IoT sensor circuit testing',
      category: 'industry',
      caption: 'Electronic system design and manufacturing cluster',
      aspectRatio: '16/9'
    }
  },

  // Employers & Workplace
  employers: {
    corporateReview: {
      id: 'employer_meeting',
      url: 'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?auto=format&fit=crop&w=800&q=80',
      alt: 'Indian hiring managers reviewing skill analytics and workforce demand in Mumbai BKC',
      category: 'employers',
      caption: 'Industry leadership talent demand review session',
      aspectRatio: '16/9'
    },
    teamCollab: {
      id: 'employer_team',
      url: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=80',
      alt: 'Agile development team working in modern cyber park in Hinjawadi Pune',
      category: 'employers',
      caption: 'Tech innovation center in Hinjawadi IT Park Pune',
      aspectRatio: '16/9'
    }
  },

  // Government & Policy
  government: {
    assemblyBuilding: {
      id: 'gov_mantralaya',
      url: 'https://images.unsplash.com/photo-1541888946425-d0fbb18086f6?auto=format&fit=crop&w=800&q=80',
      alt: 'Maharashtra State Government administrative and policy leadership center',
      category: 'government',
      caption: 'Skill, Employment, Entrepreneurship & Innovation Department, Gov. of Maharashtra',
      aspectRatio: '16/9'
    },
    policyMeeting: {
      id: 'gov_policy',
      url: 'https://images.unsplash.com/photo-1577962917302-cd874c4e31d2?auto=format&fit=crop&w=800&q=80',
      alt: 'Government officers and education stakeholders discussing district skill gap reports',
      category: 'government',
      caption: 'State Skill Development Mission Strategic Review',
      aspectRatio: '16/9'
    }
  },

  // Sectors for Sector Showcase
  sectors: {
    itTelecom: {
      id: 'sector_it',
      url: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=600&q=80',
      alt: 'Information Technology and Telecommunications in Pune & Mumbai',
      category: 'sectors'
    },
    manufacturing: {
      id: 'sector_mfg',
      url: 'https://images.unsplash.com/photo-1581092335397-9583fe92d232?auto=format&fit=crop&w=600&q=80',
      alt: 'Heavy Machinery & Precision Manufacturing in Pune & Nashik',
      category: 'sectors'
    },
    healthcare: {
      id: 'sector_health',
      url: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=600&q=80',
      alt: 'Healthcare & Biotech Diagnostic Equipment in MMR',
      category: 'sectors'
    },
    automotive: {
      id: 'sector_auto',
      url: 'https://images.unsplash.com/photo-1563720223185-11003d516935?auto=format&fit=crop&w=600&q=80',
      alt: 'Electric Vehicle & Auto Component Hub in Chakan & Aurangabad',
      category: 'sectors'
    },
    finance: {
      id: 'sector_finance',
      url: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=600&q=80',
      alt: 'Banking, Financial Services & FinTech in Mumbai Financial Capital',
      category: 'sectors'
    },
    renewableEnergy: {
      id: 'sector_renewable',
      url: 'https://images.unsplash.com/photo-1466611653911-95081537e5b7?auto=format&fit=crop&w=600&q=80',
      alt: 'Wind & Solar Renewable Energy in Satara and Dhule',
      category: 'sectors'
    },
    electronics: {
      id: 'sector_elec',
      url: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=600&q=80',
      alt: 'Electronics System Design & Embedded IoT in Navi Mumbai',
      category: 'sectors'
    },
    logistics: {
      id: 'sector_logistics',
      url: 'https://images.unsplash.com/photo-1553413077-190dd305871c?auto=format&fit=crop&w=600&q=80',
      alt: 'Multi-modal Logistics, Warehousing & JNPT Freight Corridors',
      category: 'sectors'
    },
    tourismHospitality: {
      id: 'sector_tourism',
      url: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=600&q=80',
      alt: 'Hospitality, Culinary & Heritage Tourism in Maharashtra',
      category: 'sectors'
    },
    education: {
      id: 'sector_edu',
      url: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&w=600&q=80',
      alt: 'Higher Education & Vocational Training Ecosystem',
      category: 'sectors'
    }
  },

  // 4 Stakeholder Portal Visuals
  portals: {
    government: {
      id: 'portal_gov',
      url: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=600&q=80',
      alt: 'State Administrative Building and Policy Makers',
      category: 'government'
    },
    institute: {
      id: 'portal_inst',
      url: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=600&q=80',
      alt: 'Classroom and Technical Laboratory at Maharashtra Engineering College',
      category: 'training'
    },
    employer: {
      id: 'portal_emp',
      url: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=600&q=80',
      alt: 'Corporate Office and Industry Hiring Team in Mumbai',
      category: 'employers'
    },
    student: {
      id: 'portal_stud',
      url: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=600&q=80',
      alt: 'Young Skilled Student Navigating Career Paths',
      category: 'students'
    }
  }
} as const;
