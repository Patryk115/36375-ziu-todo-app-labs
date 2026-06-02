import Plausible from 'plausible-tracker';

export const plausible = Plausible({
  domain: 'localhost',
  trackLocalhost: true, // Pozwala śledzić zdarzenia podczas dewelopmentu
});
 
plausible.enableAutoPageviews();