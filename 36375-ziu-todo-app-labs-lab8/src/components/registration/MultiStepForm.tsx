import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Step1 } from './Step1';
import { Step2 } from './Step2';
import { Step3 } from './Step3';
import { Step1Data, Step2Data, Step3Data } from './schemas';
import { useAuth } from '../../context/AuthContext';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { CircularProgress } from '@mui/material';

// Teksty do animacji "Wow" podczas tworzenia projektu
const BUILD_STEPS = [
  "Inicjalizowanie bezpiecznego środowiska...",
  "Generowanie kluczy szyfrujących...",
  "Konfiguracja modułów i powiadomień...",
  "Kompilowanie spersonalizowanego widoku...",
  "Wszystko gotowe! Przenoszenie..."
];

export default function MultiStepForm() {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<{ step1?: Step1Data; step2?: Step2Data }>({});
  const [serverError, setServerError] = useState<string | undefined>(undefined);
  const [globalError, setGlobalError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Stany do animacji końcowej
  const [isSuccessSequence, setIsSuccessSequence] = useState(false);
  const [buildStepIndex, setBuildStepIndex] = useState(0);

  const navigate = useNavigate();
  const { login } = useAuth();
  const headingRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    headingRef.current?.focus();
  }, [currentStep]);

  // Efekt symulujący budowanie projektu
  useEffect(() => {
    if (isSuccessSequence) {
      if (buildStepIndex < BUILD_STEPS.length - 1) {
        const timer = setTimeout(() => {
          setBuildStepIndex(prev => prev + 1);
        }, 1200); // Co 1.2 sekundy zmienia się napis
        return () => clearTimeout(timer);
      } else {
        // Zakończenie sekwencji -> Logujemy usera i przenosimy
        const timer = setTimeout(async () => {
           if (formData.step1?.email) {
               await login(
                 formData.step1.email,
                 formData.step1.firstName,
                 formData.step1.lastName
               );
           }
           navigate('/');
        }, 1500);
        return () => clearTimeout(timer);
      }
    }
  }, [isSuccessSequence, buildStepIndex, navigate, login, formData.step1?.email]);

  const handleStep1Complete = (data: Step1Data) => {
    setFormData(prev => ({ ...prev, step1: data }));
    setServerError(undefined);
    setCurrentStep(2);
  };

  const handleStep2Complete = (data: Step2Data) => {
    setFormData(prev => ({ ...prev, step2: data }));
    setCurrentStep(3);
  };

  const handleStep3Complete = async (_data: Step3Data) => {
    setGlobalError(null);
    setIsSubmitting(true);
    
    // Symulacja wysyłania do API
    try {
      await new Promise((resolve) => setTimeout(resolve, 800));
      // Jeśli wszystko ok, odpal animację sukcesu zamiast chamskiego przekierowania
      setIsSuccessSequence(true);
    } catch (err: any) {
      setGlobalError(err.message || 'Wystąpił nieoczekiwany błąd. Spróbuj ponownie.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleBack = () => setCurrentStep(prev => Math.max(1, prev - 1));

  // EFEKT WOW: Ekran ładowania projektu
  if (isSuccessSequence) {
      return (
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }} 
            animate={{ opacity: 1, scale: 1 }} 
            className="flex flex-col items-center justify-center py-16 text-center h-full min-h-[400px]"
          >
              <AnimatePresence mode="wait">
                  {buildStepIndex < BUILD_STEPS.length - 1 ? (
                      <motion.div 
                        key="loader"
                        initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}
                        className="flex flex-col items-center gap-6"
                      >
                          <CircularProgress size={60} thickness={4} sx={{ color: '#7C3AED' }} />
                          <h2 className="text-2xl font-bold text-white mt-4">Tworzenie Twojego projektu</h2>
                          <p className="text-gray-400 text-lg animate-pulse">{BUILD_STEPS[buildStepIndex]}</p>
                      </motion.div>
                  ) : (
                      <motion.div 
                        key="success"
                        initial={{ opacity: 0, scale: 0.5 }} animate={{ opacity: 1, scale: 1 }}
                        transition={{ type: "spring", stiffness: 200, damping: 15 }}
                        className="flex flex-col items-center gap-4"
                      >
                          <CheckCircleIcon sx={{ fontSize: 90, color: '#10B981' }} />
                          <h2 className="text-3xl font-bold text-white mt-2">Projekt gotowy!</h2>
                          <p className="text-green-400 text-lg">{BUILD_STEPS[buildStepIndex]}</p>
                      </motion.div>
                  )}
              </AnimatePresence>
          </motion.div>
      );
  }

  const stepTitles = ['Konto', 'Preferencje', 'Podsumowanie'];

  return (
    <div>
      <nav aria-label="Postęp formularza" className="flex justify-between items-center mb-10 relative">
        <div className="absolute left-0 top-1/2 -translate-y-1/2 w-full h-1 bg-slate-800 -z-10 rounded-full" />
        <div 
          className="absolute left-0 top-1/2 -translate-y-1/2 h-1 bg-blue-600 -z-10 rounded-full transition-all duration-500"
          style={{ width: `${((currentStep - 1) / 2) * 100}%` }}
        />
        {[1, 2, 3].map(step => (
          <div key={step} className="flex flex-col items-center gap-2">
            <span 
              className={`w-10 h-10 flex items-center justify-center rounded-full text-sm font-bold transition-colors ${currentStep >= step ? 'bg-blue-600 text-white shadow-[0_0_15px_rgba(37,99,235,0.5)]' : 'bg-slate-800 text-gray-500 border border-slate-700'}`}
            >
              {step}
            </span>
            <span className={`text-xs font-semibold hidden sm:block ${currentStep >= step ? 'text-gray-200' : 'text-gray-600'}`}>{stepTitles[step-1]}</span>
          </div>
        ))}
      </nav>

      <h2 tabIndex={-1} ref={headingRef} className="text-3xl font-bold text-white mb-2 outline-none">
        {currentStep === 1 && 'Zarejestruj się'}
        {currentStep === 2 && 'Opowiedz nam o sobie'}
        {currentStep === 3 && 'Prawie gotowe!'}
      </h2>
      <p className="text-gray-400 mb-8">
        {currentStep === 1 && 'Wypełnij poniższe dane, aby utworzyć konto w naszej aplikacji ToDo.'}
        {currentStep === 2 && 'Dostosuj aplikację do własnych potrzeb.'}
        {currentStep === 3 && 'Sprawdź swoje dane i zaakceptuj regulamin.'}
      </p>

      {globalError && (
        <div role="alert" className="bg-red-900/50 border border-red-500 text-red-200 p-4 rounded-lg mb-6">
          {globalError}
        </div>
      )}

      {currentStep === 1 && <Step1 defaultValues={formData.step1} onComplete={handleStep1Complete} serverError={serverError} />}
      {currentStep === 2 && <Step2 defaultValues={formData.step2} onComplete={handleStep2Complete} onBack={handleBack} />}
      {currentStep === 3 && <Step3 formData={formData} onComplete={handleStep3Complete} onBack={handleBack} isSubmittingForm={isSubmitting} />}
    </div>
  );
}