// Types for the device API data
export interface Level1Data {
    height: number // in cm
    weight: number // in kg
    bloodPressure: {
      systolic: number
      diastolic: number
    }
    temperature: number // in F
    bpm: number // heart rate
    spo2: number // oxygen saturation in %
    glucose: number // in mg/dL
    bmi: number
    ecg: string // URL to ECG data or report
    recordedAt: string // ISO date string
  }

  export interface Level2Data {
    pulmonary: {
      fev6: number
      fev1: number
      fev1_fvc: number
    }
    renal: {
      uricAcid: number
      creatinine: number
      urea: number
    }
    lipid: {
      tc: number // Total Cholesterol
      hdl: number // High-Density Lipoprotein
      tg: number // Triglycerides
      tc_hdl: number // TC/HDL ratio
      ldl: number // Low-Density Lipoprotein
    }
    recordedAt: string // ISO date string
  }

  export interface HistoryRecord {
    id: string
    date: string
    type: "Level 1" | "Level 2"
    summary: string
    details: string
  }

  export interface PatientData {
    id: string
    name: string
    email: string
    phone: string
    dateOfBirth: string
    age: number
    gender: string
    address: string
    bloodType: string
    allergies: string[]
    lastVisit: string
    status: string
    avatar: string
  }

  export interface Appointment {
    id: string
    date: string
    time: string
    doctor: string
    department: string
    status: "Scheduled" | "Completed" | "Cancelled"
  }
