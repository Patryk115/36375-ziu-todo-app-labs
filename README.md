ToDo Task Manager

> Projekt zaliczeniowy — Zaawansowane Interfejsy Użytkownika  
> **Patryk Kindra 36375** | Rok akademicki 2025/2026

---

## 🚀 Demo

> **Link do demo:** https://patryk115.github.io/36375-ziu-todo-app-labs/#/login

---

## 📝 Opis projektu

Nowoczesna aplikacja webowa do zarządzania zadaniami (Task Manager / ToDo), zbudowana w React + TypeScript + Material UI. Pozwala użytkownikom organizować codzienne zadania w projekty, śledzić postępy i zwiększać produktywność.

### Główne funkcje:
- 🔐 Rejestracja i logowanie (wielokrokowy formularz z walidacją)
- 📁 Zarządzanie projektami (CRUD)
- ✅ Zarządzanie zadaniami (dodawanie, usuwanie, oznaczanie jako ukończone)
- 📊 Dashboard z statystykami i profilem użytkownika
- 🌙 Dark/Light Mode z persystencją
- 📱 Responsywny design (mobile, tablet, desktop)
- ♿ Dostępność WCAG 2.1 AA

---

## 🛠️ Użyte technologie

| Technologia | Wersja | Cel |
|---|---|---|
| **React** | 18.x | Biblioteka UI |
| **TypeScript** | 5.x | Typowanie statyczne |
| **Vite** | 5.x | Bundler / dev server |
| **MUI (Material UI)** | 7.x | Biblioteka komponentów |
| **React Router DOM** | 7.x | Routing SPA |
| **React Hook Form** | 7.x | Zarządzanie formularzami |
| **Zod** | 4.x | Walidacja schematów |
| **Framer Motion** | 11.x | Animacje i przejścia |
| **Tailwind CSS** | 3.x | Klasy utility (w formularzach rejestracji) |

### Mock API
Aplikacja korzysta z własnego mock API (`localStorage`) symulującego operacje sieciowe z opóźnieniem 600-800ms, co pozwala na testowanie stanów `loading`, `success` i `error`.

---

## 📦 Instrukcja uruchomienia

### Wymagania
- Node.js >= 18.x
- npm >= 9.x

### Kroki

```bash
# 1. Sklonuj repozytorium
git clone https://github.com/[twoj-nick]/produty-todo-app.git
cd produty-todo-app

# 2. Zainstaluj zależności
npm install

# 3. Uruchom serwer deweloperski
npm run dev

# 4. Otwórz przeglądarkę
# http://localhost:5173
```

## 🗂️ Struktura projektu

```
src/
├── api/                    # Mock API (localStorage)
│   ├── mockApi.ts          # CRUD dla zadań
│   └── projectApi.ts       # CRUD dla projektów
├── components/
│   ├── dashboard/          # AppHeader, DashboardLayout, StatsGrid...
│   ├── pages/              # ProjectsPage, ProjectDetailPage, ProfilePage
│   ├── registration/       # Wielokrokowy formularz rejestracji
│   └── ui/                 # PageTransition, GlobalSnackbar
├── context/                # AuthContext, TodoContext, ProjectContext, ThemeContext
├── reducers/               # todoReducer
├── theme/                  # createAppTheme (dark/light)
└── types/                  # todo.types, project.types
```

---

## 📱 Ekrany aplikacji

| Ścieżka | Opis |
|---|---|
| `/login` | Logowanie (RHF + Zod) |
| `/register` | Rejestracja 3-krokowa (RHF + Zod) |
| `/` | Dashboard — lista zadań + projekty |
| `/projects` | Lista projektów (CRUD) |
| `/projects/:id` | Zadania projektu |
| `/profile` | Profil użytkownika ze statystykami |
| `/settings` | Ustawienia konta (dark mode, powiadomienia) |

---

## ♿ Dostępność (WCAG 2.1 AA)

- ✅ Semantyczny HTML (header, main, footer, nav, section, article)
- ✅ Skip Link (pomiń nawigację) — widoczny przy fokusie
- ✅ aria-labels, aria-live, aria-describedby, aria-invalid na wszystkich polach formularzy
- ✅ role="alert" na komunikatach błędów
- ✅ Kontrast kolorów ≥ 4.5:1 (sprawdzony w Figmie i Chrome DevTools)
- ✅ Nawigacja klawiaturą + widoczny focus (outline: 2px solid #7C3AED)
- ✅ Responsywny design z dwoma breakpointami (mobile xs, desktop md)

---

## 🎨 Notatka UX — Design Decisions

### Grupa docelowa / Persona

**Persona: Student/Freelancer (22–30 lat)**
- Zarządza wieloma projektami jednocześnie (studia, praca, projekty poboczne)
- Używa komputera i telefonu
- Ceni estetykę i szybkość działania
- Lubi mieć poczucie kontroli nad zadaniami

### Kluczowe wybory UI/UX

#### 1. Dark Mode jako domyślny
Aplikacje do produktywności (Linear, Notion, Raycast) preferują ciemny motyw — redukuje zmęczenie wzroku podczas długich sesji pracy. Dodano przełącznik z persystencją w `localStorage`.

#### 2. Animacje Framer Motion
Zgodnie z heurystyką Nielsena **#1 (Widoczność statusu systemu)** — użytkownik zawsze wie, że akcja została wykonana. Animacje przejść między stronami (fade + slide) i listy zadań (AnimatePresence) zapewniają ciągłość kontekstu.

#### 3. Wielokrokowy formularz rejestracji
Zamiast długiego formularza, podział na 3 kroki zmniejsza "cognitive load" (obciążenie poznawcze) użytkownika. Pasek postępu wizualizuje stan procesu — heurystyka **#1** i **#7 (Elastyczność)**.

#### 4. Optimistic Updates + GlobalSnackbar
Zgodnie z heurystyką **#1** — feedback jest natychmiastowy (zadanie znika od razu z listy), a błąd sieciowy pojawia się jako Snackbar z możliwością odczytu. Zastąpiło to nieprzyjazny `alert()`.

#### 5. Karty projektów z paskiem postępu
Zamiast suchej listy — karty z kolorem projektu, ikoną i paskiem postępu dają szybki wgląd w stan projektu bez potrzeby wchodzenia w szczegóły. Heurystyka **#6 (Recognition over Recall)**.

#### 6. Kontrast i dostępność
Paleta kolorów: tekst `#F9FAFB` na tle `#0A0B10` = kontrast ~18:1 (AAA). Akcent fioletowy `#7C3AED` na ciemnym tle = kontrast ~7.5:1 (AA).

---
