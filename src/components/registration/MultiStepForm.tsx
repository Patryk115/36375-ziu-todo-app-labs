import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Step1 } from './Step1';
import { Step2 } from './Step2';
import { Step3 } from './Step3';
import { Step1Data, Step2Data, Step3Data } from './schemas';

export default function MultiStepForm() {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<{ step1?: Step1Data; step2?: Step2Data }>({});
  const [serverError, setServerError] = useState<string | undefined>(undefined);
  const [globalError, setGlobalError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const navigate = useNavigate();
  const headingRef = useRef<HTMLHeadingElement>(null);

  // Wymóg WCAG: Przeniesienie focusu po zmianie kroku
  useEffect(() => {
    headingRef.current?.focus();
  }, [currentStep]);

  const handleStep1Complete = (data: Step1Data) => {
    setFormData(prev => ({ ...prev, step1: data }));
    setServerError(undefined); // Czyszczenie błędu 409
    setCurrentStep(2);
  };

  const handleStep2Complete = (data: Step2Data) => {
    setFormData(prev => ({ ...prev, step2: data }));
    setCurrentStep(3);
  };

  // Symulacja API z rzucaniem błędów (409 i 500)
  const finalSubmit = async (step3Data: Step3Data) => {
    setIsSubmitting(true);
    setGlobalError(null);
    
    try {
      const fullData = { ...formData, step3: step3Data };
      console.log('Wysyłanie danych:', fullData);

      await new Promise((resolve, reject) => {
        setTimeout(() => {
          if (formData.step1?.email === 'zajety@gmail.com') {
            reject({ status: 409 });
          } else if (formData.step1?.email === 'error@gmail.com') {
            reject({ status: 500 });
          } else {
            resolve({ status: 200 });
          }
        }, 1500);
      });

      // Sukces - Przekierowanie
      navigate('/'); 
    } catch (err: any) {
      if (err.status === 409) {
        setServerError('Ten adres e-mail jest już zarejestrowany');
        setCurrentStep(1); // Powrót do kroku 1 - wymóg
      } else {
        setGlobalError('Wystąpił błąd serwera. Spróbuj ponownie później.');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const stepTitles = ["Dane logowania", "Twoje preferencje", "Podsumowanie"];

  return (
    <main aria-label="Formularz rejestracji" className="max-w-2xl mx-auto w-full bg-[#1A1D27] p-8 rounded-2xl shadow-xl mt-12 border border-slate-800">
      
      {/* Breadcrumb kroków (Wymóg WCAG) */}
      <nav aria-label="Postęp rejestracji" className="flex justify-between mb-8 border-b border-slate-700 pb-4">
        {[1, 2, 3].map(step => (
          <div key={step} className={`flex flex-col items-center gap-2 flex-1 ${currentStep === step ? 'opacity-100' : 'opacity-40'}`}>
            <span 
              aria-current={currentStep === step ? 'step' : undefined} 
              className={`w-8 h-8 flex items-center justify-center rounded-full text-sm font-bold ${currentStep === step ? 'bg-blue-600 text-white' : 'bg-slate-700 text-gray-300'}`}
            >
              {step}
            </span>
            <span className="text-xs font-semibold text-gray-300 hidden sm:block">{stepTitles[step-1]}</span>
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
      {currentStep === 2 && <Step2 defaultValues={formData.step2} onComplete={handleStep2Complete} onBack={() => setCurrentStep(1)} />}
      {currentStep === 3 && <Step3 formData={formData} onComplete={finalSubmit} onBack={() => setCurrentStep(2)} isSubmittingForm={isSubmitting} />}
    </main>
  );
}